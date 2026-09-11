import type { BookedRange } from '../constants/booking';
import { BOOKING_EXTRAS, SERVICE_FEE_CENTS, allowedExtras, bookingGrandTotalCents } from '../constants/payments';
import { supabase } from '../lib/supabase';
import type { BookingSelection, ContactDetails } from '../navigation/types';
import type { Booking, BookingReview, BookingStatus } from '../types/database';
import { cancelArrivalReminder, getCachedPushToken, registerPushNotifications } from './notifications';

export type CreateBookingInput = BookingSelection & {
  contact: ContactDetails;
  status?: BookingStatus;
  paymentIntentId?: string | null;
};

/** Persist a booking. Signed-in customers are linked; guests stay anonymous. */
export async function createBooking(input: CreateBookingInput): Promise<Booking | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }));

  const supplies = input.supplies ?? [];
  const extras = allowedExtras(input.option, input.extras);
  const pushToken = getCachedPushToken() ?? (await registerPushNotifications());
  const dates =
    input.dates && input.dates.length > 0
      ? [...input.dates].sort()
      : [input.date];
  const totalCents = bookingGrandTotalCents(
    input.option,
    input.extraHours,
    input.squareMeters,
    input.rooms,
    supplies,
    input.pieces,
    extras,
    input.plan
  );

  const supplyLines = [
    ...supplies.map((item) => ({
      product_id: item.productId,
      name_el: item.nameEl,
      name_en: item.nameEn,
      variant_label: item.variantLabel,
      unit_price_cents: item.unitPriceCents,
      quantity: item.quantity,
    })),
    ...extras.flatMap((id) => {
      const extra = BOOKING_EXTRAS.find((item) => item.id === id);
      if (!extra) {
        return [];
      }
      return [
        {
          product_id: `extra:${extra.id}`,
          name_el: extra.nameEl,
          name_en: extra.nameEn,
          variant_label: null as string | null,
          unit_price_cents: extra.priceCents,
          quantity: 1,
        },
      ];
    }),
    {
      product_id: 'fee:service',
      name_el: 'Service fee',
      name_en: 'Service fee',
      variant_label: null as string | null,
      unit_price_cents: SERVICE_FEE_CENTS,
      quantity: 1,
    },
  ];

  if (input.plan) {
    supplyLines.unshift({
      product_id: `plan:${input.plan.frequency}x${input.plan.visitHours}`,
      name_el: `Μηνιαίο πακέτο · ${input.plan.frequency}×/εβδ. · ${input.plan.visitHours}ω`,
      name_en: `Monthly plan · ${input.plan.frequency}×/week · ${input.plan.visitHours}h`,
      variant_label: null,
      unit_price_cents: 0,
      quantity: dates.length,
    });
  }

  const rows = dates.map((serviceDate, index) => ({
    user_id: user?.id ?? null,
    service_date: serviceDate,
    time_slot: input.timeSlot,
    category: input.category,
    option: input.option,
    contact_name: input.contact.name.trim(),
    contact_email: input.contact.email.trim() || null,
    contact_phone: input.contact.phone.trim(),
    contact_address: input.contact.address.trim(),
    contact_lat: input.contact.latitude ?? null,
    contact_lng: input.contact.longitude ?? null,
    square_meters: input.option === 'Ironing' ? input.pieces ?? null : input.squareMeters,
    extra_hours: input.extraHours,
    amount_cents: index === 0 ? totalCents : 0,
    supplies: index === 0 ? supplyLines : [],
    status: input.status ?? 'paid',
    payment_intent_id: input.paymentIntentId ?? null,
    push_token: pushToken,
  }));

  if (user) {
    const { data, error } = await supabase.from('bookings').insert(rows).select().limit(1);
    if (error) {
      throw new Error(error.message);
    }
    return data?.[0] ?? null;
  }

  const { error } = await supabase.from('bookings').insert(rows);
  if (error) {
    throw new Error(error.message);
  }
  return null;
}

export async function listMyBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getMyBooking(id: string): Promise<Booking | null> {
  const { data, error } = await supabase.from('bookings').select('*').eq('id', id).maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function listReviewedBookingIds(): Promise<Set<string>> {
  const { data, error } = await supabase.from('booking_reviews').select('booking_id');
  if (error) {
    return new Set();
  }
  return new Set((data ?? []).map((row) => row.booking_id));
}

export async function getBookingReview(bookingId: string): Promise<BookingReview | null> {
  const { data, error } = await supabase
    .from('booking_reviews')
    .select('*')
    .eq('booking_id', bookingId)
    .maybeSingle();
  if (error) {
    return null;
  }
  return data;
}

export async function submitBookingReview(input: {
  bookingId: string;
  rating: number;
  comment: string;
  wantSameCleaner: boolean;
  tipCents: number;
}): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('Not signed in');
  }

  const { error } = await supabase.from('booking_reviews').insert({
    booking_id: input.bookingId,
    user_id: user.id,
    rating: input.rating,
    comment: input.comment.trim() || null,
    want_same_cleaner: input.wantSameCleaner,
    tip_cents: input.tipCents,
  });

  if (error) {
    throw new Error(error.message);
  }
}

/** Customer-side cancellation; RLS only allows it while pending/paid. */
export async function cancelBooking(id: string): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  await cancelArrivalReminder(id);
}

/**
 * Windows the admin has closed for a day. Everyone can read them;
 * bookings no longer hide slots on their own.
 */
export async function getClosedSlots(date: string): Promise<BookedRange[]> {
  const { data, error } = await supabase
    .from('closed_slots')
    .select('start_hour, end_hour')
    .eq('service_date', date);

  if (error) {
    throw new Error(error.message);
  }

  return (data as BookedRange[] | null) ?? [];
}
