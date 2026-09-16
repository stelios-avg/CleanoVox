import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17.7.0';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: cors });
}

function alreadyRefunded(message: string) {
  return /already been refunded|charge_already_refunded|has already been refunded/i.test(
    message
  );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  if (!supabaseUrl || !serviceKey || !anonKey) {
    return json({ error: 'Server is not configured.' }, 500);
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return json({ error: 'Not signed in.' }, 401);
  }

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user },
    error: userError,
  } = await userClient.auth.getUser();
  if (userError || !user) {
    return json({ error: 'Not signed in.' }, 401);
  }

  const admin = createClient(supabaseUrl, serviceKey);
  const { data: profile } = await admin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();
  if (profile?.role !== 'admin') {
    return json({ error: 'Not allowed.' }, 403);
  }

  const body = (await req.json().catch(() => ({}))) as { bookingId?: string };
  const bookingId = body.bookingId?.trim();
  if (!bookingId) {
    return json({ error: 'Missing booking.' }, 400);
  }

  const { data: booking, error: bookingError } = await admin
    .from('bookings')
    .select('id, status, amount_cents, payment_intent_id')
    .eq('id', bookingId)
    .maybeSingle();
  if (bookingError || !booking) {
    return json({ error: 'Booking not found.' }, 404);
  }

  if (booking.status === 'rejected') {
    return json({ ok: true, refunded: false, alreadyRejected: true });
  }
  if (booking.status === 'completed' || booking.status === 'cancelled') {
    return json({ error: 'This booking cannot be rejected.' }, 400);
  }

  const paymentIntentId = booking.payment_intent_id;
  const isStripePayment = typeof paymentIntentId === 'string' && paymentIntentId.startsWith('pi_');
  const shouldRefund = isStripePayment && (booking.amount_cents ?? 0) > 0;

  let refunded = false;
  if (shouldRefund) {
    const secret = Deno.env.get('STRIPE_SECRET_KEY');
    if (!secret) {
      return json({ error: 'Stripe is not configured.' }, 500);
    }
    try {
      const stripe = new Stripe(secret);
      await stripe.refunds.create(
        { payment_intent: paymentIntentId },
        { idempotencyKey: `reject-booking:${paymentIntentId}` }
      );
      refunded = true;
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Refund failed.';
      if (!alreadyRefunded(message)) {
        return json({ error: message }, 400);
      }
      refunded = true;
    }
  }

  const rejectQuery = admin
    .from('bookings')
    .update({ status: 'rejected' })
    .in('status', ['pending', 'paid', 'accepted']);

  const { error: updateError } = shouldRefund && paymentIntentId
    ? await rejectQuery.eq('payment_intent_id', paymentIntentId)
    : await rejectQuery.eq('id', bookingId);

  if (updateError) {
    return json({ error: updateError.message }, 400);
  }

  return json({ ok: true, refunded });
});
