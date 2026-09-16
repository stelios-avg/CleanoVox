-- Customer's preferred cleaner, chosen on the quote screen (optional).
-- Stores the stable cleaner id from src/constants/team.ts (e.g. 'eleni').
alter table public.bookings
  add column if not exists preferred_cleaner text;

comment on column public.bookings.preferred_cleaner is
  'Optional cleaner preference chosen by the customer at booking time.';
