import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';
import Stripe from 'npm:stripe@17.7.0';

const DELETED_NAME = 'Deleted account';
const DELETED_PHONE = 'deleted';
const DELETED_ADDRESS = '—';
const DELETED_ORDER_EMAIL = 'deleted@invalid.local';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: cors });
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
    .select('role, stripe_subscription_id')
    .eq('id', user.id)
    .maybeSingle();

  if (profile?.role === 'admin') {
    return json({ error: 'Admin accounts cannot be deleted from the app.' }, 403);
  }

  const secret = Deno.env.get('STRIPE_SECRET_KEY');
  if (secret && profile?.stripe_subscription_id) {
    try {
      const stripe = new Stripe(secret);
      await stripe.subscriptions.cancel(profile.stripe_subscription_id);
    } catch {
      // Still erase the person — Stripe can be cleaned up from the dashboard.
    }
  }

  const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Nicosia' });

  const { error: cancelBookingsError } = await admin
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('user_id', user.id)
    .in('status', ['pending', 'paid', 'accepted'])
    .gte('service_date', today);
  if (cancelBookingsError) {
    return json({ error: cancelBookingsError.message }, 400);
  }

  const { error: bookingError } = await admin
    .from('bookings')
    .update({
      contact_name: DELETED_NAME,
      contact_email: null,
      contact_phone: DELETED_PHONE,
      contact_address: DELETED_ADDRESS,
      contact_lat: null,
      contact_lng: null,
      push_token: null,
      user_id: null,
    })
    .eq('user_id', user.id);
  if (bookingError) {
    return json({ error: bookingError.message }, 400);
  }

  const { error: cancelOrdersError } = await admin
    .from('product_orders')
    .update({ status: 'cancelled' })
    .eq('user_id', user.id)
    .eq('status', 'pending');
  if (cancelOrdersError) {
    return json({ error: cancelOrdersError.message }, 400);
  }

  const { error: orderError } = await admin
    .from('product_orders')
    .update({
      contact_email: DELETED_ORDER_EMAIL,
      contact_phone: DELETED_PHONE,
      contact_address: DELETED_ADDRESS,
      user_id: null,
    })
    .eq('user_id', user.id);
  if (orderError) {
    return json({ error: orderError.message }, 400);
  }

  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
  if (deleteError) {
    return json({ error: deleteError.message }, 400);
  }

  return json({ ok: true });
});
