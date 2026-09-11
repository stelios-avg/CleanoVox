import { BASE_DURATION_HOURS, hourRateCents } from './booking';
import type { PlanBooking } from './plans';
import { monthlyPlanPriceCents } from './plans';
import type { BookingExtraId, BookingOption } from '../navigation/types';

/**
 * Stripe publishable key (test or live). Safe to ship in the client.
 * The secret key NEVER goes in the app — it lives in the Supabase Edge
 * Function `create-payment-intent`.
 */
export const STRIPE_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

/** Must match the merchantIdentifier in app.json and your Apple Developer account. */
export const APPLE_MERCHANT_ID = 'merchant.com.eagleclean.app';

export const MERCHANT_NAME = 'Cleanovox';
export const MERCHANT_COUNTRY_CODE = 'CY'; // ISO country of the business
export const CURRENCY_CODE = 'EUR';

export const IRONING_PACK_SIZE = 10;
/** First 10 pieces: €16. */
export const IRONING_FIRST_PACK_CENTS = 1600;
/** €2 off each extra pack of 10. */
export const IRONING_PACK_DISCOUNT_CENTS = 200;
export const IRONING_PIECE_CENTS = IRONING_FIRST_PACK_CENTS / IRONING_PACK_SIZE;

/**
 * 10 pcs → €16; each extra 10 pcs is €2 cheaper (€14).
 * Leftover pieces (via Άλλο) are €1.60 each.
 */
export function ironingPriceCents(pieces: number): number {
  const n = Number.isFinite(pieces) ? Math.max(0, Math.floor(pieces)) : 0;
  if (n <= 0) {
    return 0;
  }
  const packs = Math.floor(n / IRONING_PACK_SIZE);
  const remainder = n % IRONING_PACK_SIZE;
  let cents = 0;
  if (packs >= 1) {
    cents +=
      IRONING_FIRST_PACK_CENTS +
      (packs - 1) * (IRONING_FIRST_PACK_CENTS - IRONING_PACK_DISCOUNT_CENTS);
  }
  return cents + remainder * IRONING_PIECE_CENTS;
}

/** Base price = duration × hourly rate. Ironing from 10 pcs. */
export const SERVICE_PRICES: Record<BookingOption, number> = {
  Studio: BASE_DURATION_HOURS.Studio * hourRateCents('Studio'),
  '1 Bedroom': BASE_DURATION_HOURS['1 Bedroom'] * hourRateCents('1 Bedroom'),
  '2 Bedroom': BASE_DURATION_HOURS['2 Bedroom'] * hourRateCents('2 Bedroom'),
  '3 Bedroom': BASE_DURATION_HOURS['3 Bedroom'] * hourRateCents('3 Bedroom'),
  'Deep Cleaning': BASE_DURATION_HOURS['Deep Cleaning'] * hourRateCents('Deep Cleaning'),
  Events: BASE_DURATION_HOURS.Events * hourRateCents('Events'),
  Ironing: IRONING_FIRST_PACK_CENTS,
};

export function formatEuros(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

/** Flat service fee added to every booking and marketplace order. */
export const SERVICE_FEE_CENTS = 145;

/** Monthly membership card. */
export const MEMBERSHIP_PRICE_CENTS = 1499;

export function withServiceFee(cents: number): number {
  return cents + SERVICE_FEE_CENTS;
}

/** Indicative "from" price: hours × rate, or ironing pieces. Square meters do not change the price. */
export function indicativePriceCents(
  option: BookingOption,
  _squareMeters: number,
  _rooms?: number,
  pieces?: number
): number {
  if (option === 'Ironing') {
    const count = pieces != null && pieces > 0 ? pieces : 0;
    return count > 0 ? ironingPriceCents(count) : SERVICE_PRICES.Ironing;
  }
  return SERVICE_PRICES[option];
}

/** Indicative price plus the per-hour charge for extra hours. */
export function bookingTotalCents(
  option: BookingOption,
  extraHours: number,
  squareMeters: number,
  rooms?: number,
  pieces?: number
): number {
  const base =
    option === 'Ironing'
      ? ironingPriceCents(pieces ?? 0)
      : indicativePriceCents(option, squareMeters, rooms);
  return base + extraHours * hourRateCents(option);
}

export function suppliesTotalCents(
  supplies: { unitPriceCents: number; quantity: number }[]
): number {
  return supplies.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
}

export const BOOKING_EXTRAS: {
  id: BookingExtraId;
  priceCents: number;
  nameEl: string;
  nameEn: string;
}[] = [
  { id: 'ironing', priceCents: 1500, nameEl: 'Σιδέρωμα', nameEn: 'Ironing' },
  { id: 'hoover', priceCents: 300, nameEl: 'Hoover', nameEn: 'Hoover' },
  { id: 'oven', priceCents: 500, nameEl: 'Καθαρισμός φούρνου', nameEn: 'Oven cleaning' },
  { id: 'fireplace', priceCents: 500, nameEl: 'Τζάκι', nameEn: 'Fireplace' },
];

/** Deep keeps oven/fireplace extras; home, events, and ironing get ironing + hoover. */
export function extrasForOption(option: BookingOption) {
  const ids: BookingExtraId[] =
    option === 'Deep Cleaning'
      ? ['ironing', 'oven', 'fireplace']
      : option === 'Ironing'
        ? ['hoover']
        : ['ironing', 'hoover'];
  return BOOKING_EXTRAS.filter((item) => ids.includes(item.id));
}

export function extrasTotalCents(extras: BookingExtraId[] | undefined): number {
  if (!extras?.length) {
    return 0;
  }
  return extras.reduce((sum, id) => {
    const extra = BOOKING_EXTRAS.find((item) => item.id === id);
    return sum + (extra?.priceCents ?? 0);
  }, 0);
}

export function allowedExtras(
  option: BookingOption,
  extras: BookingExtraId[] | undefined
): BookingExtraId[] {
  const allowed = new Set(extrasForOption(option).map((item) => item.id));
  return (extras ?? []).filter((id) => allowed.has(id));
}

export function bookingGrandTotalCents(
  option: BookingOption,
  extraHours: number,
  squareMeters: number,
  rooms?: number,
  supplies: { unitPriceCents: number; quantity: number }[] = [],
  pieces?: number,
  extras?: BookingExtraId[],
  plan?: PlanBooking | null
): number {
  const cleaning = plan
    ? monthlyPlanPriceCents(plan.frequency, plan.visitHours)
    : bookingTotalCents(option, extraHours, squareMeters, rooms, pieces);
  return (
    cleaning +
    suppliesTotalCents(supplies) +
    extrasTotalCents(allowedExtras(option, extras)) +
    SERVICE_FEE_CENTS
  );
}
