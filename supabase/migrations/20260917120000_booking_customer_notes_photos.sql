-- Optional checkout notes and photos so the team can see fragile items,
-- access instructions, and the space before they arrive.

alter table public.bookings
  add column if not exists customer_notes text,
  add column if not exists customer_photos text[] not null default '{}'::text[];

alter table public.bookings
  drop constraint if exists bookings_customer_notes_len;

alter table public.bookings
  drop constraint if exists bookings_customer_photos_len;

alter table public.bookings
  add constraint bookings_customer_notes_len
    check (customer_notes is null or char_length(customer_notes) <= 1000);

alter table public.bookings
  add constraint bookings_customer_photos_len
    check (cardinality(customer_photos) <= 4);

comment on column public.bookings.customer_notes is
  'Optional instructions from the customer at checkout (fragile items, access, etc).';

comment on column public.bookings.customer_photos is
  'Storage object paths in the booking-photos bucket, uploaded at checkout.';

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'booking-photos',
  'booking-photos',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Customers can upload booking photos" on storage.objects;
drop policy if exists "Customers can read booking photos" on storage.objects;
drop policy if exists "Admins can delete booking photos" on storage.objects;

create policy "Customers can upload booking photos"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'booking-photos'
  and name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|heic|heif)$'
);

create policy "Customers can read booking photos"
on storage.objects
for select
to anon, authenticated
using (
  bucket_id = 'booking-photos'
  and (
    (select private.is_admin())
    or name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|heic|heif)$'
  )
);

create policy "Admins can delete booking photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'booking-photos'
  and (select private.is_admin())
);
