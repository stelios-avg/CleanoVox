-- Privacy / GDPR hardening:
-- 1. Trigger functions must not be callable as Data API RPCs.
-- 2. Pin search_path on touch_updated_at.
-- 3. Keep shop orders after the auth user is deleted (accounting), without the person.

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path to ''
as $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

revoke execute on function public.touch_updated_at() from public, anon, authenticated;
revoke execute on function public.bookings_guard_admin_fields() from public, anon, authenticated;

grant execute on function public.touch_updated_at() to postgres, service_role;
grant execute on function public.bookings_guard_admin_fields() to postgres, service_role;

alter table public.product_orders
  alter column user_id drop not null;

alter table public.product_orders
  drop constraint product_orders_user_id_fkey;

alter table public.product_orders
  add constraint product_orders_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete set null;
