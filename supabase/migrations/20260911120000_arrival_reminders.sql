alter table public.bookings
  add column if not exists arrival_reminder_sent_at timestamptz;

comment on column public.bookings.arrival_reminder_sent_at is
  'When the 1-hour-before arrival push was sent. Null until the reminder job fires.';

create index if not exists bookings_arrival_reminder_due_idx
  on public.bookings (service_date, arrival_time)
  where status = 'accepted'
    and arrival_reminder_sent_at is null
    and arrival_time is not null;

create or replace function public.bookings_guard_admin_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not private.is_admin() then
    if tg_op = 'INSERT' then
      new.arrival_time := null;
      new.arrival_reminder_sent_at := null;
    elsif tg_op = 'UPDATE' then
      new.arrival_time := old.arrival_time;
      if current_setting('app.sending_arrival_reminders', true) is distinct from 'true' then
        new.arrival_reminder_sent_at := old.arrival_reminder_sent_at;
      end if;
    end if;
  end if;
  return new;
end;
$$;

create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;

grant usage on schema cron to postgres;
grant all privileges on all tables in schema cron to postgres;

create or replace function private.send_due_arrival_reminders()
returns integer
language plpgsql
security definer
set search_path = public, net, extensions, pg_temp
as $$
declare
  due_ids uuid[] := '{}'::uuid[];
  payload jsonb;
  due_count integer := 0;
begin
  select
    coalesce(jsonb_agg(msg), '[]'::jsonb),
    coalesce(array_agg(booking_id), '{}'::uuid[])
  into payload, due_ids
  from (
    select
      b.id as booking_id,
      jsonb_build_object(
        'to', coalesce(nullif(b.push_token, ''), p.push_token),
        'sound', 'default',
        'channelId', 'default',
        'title', 'Η καθαρίστρια έρχεται σε 1 ώρα',
        'body',
          'Άφιξη στις ' || b.arrival_time
          || case
            when coalesce(nullif(btrim(b.contact_address), ''), '') <> ''
              then '. Διεύθυνση: ' || btrim(b.contact_address)
            else ''
          end
          || '. Βεβαιώσου ότι βρίσκει το σπίτι και άνοιξέ της την πόρτα.',
        'data', jsonb_build_object(
          'bookingId', b.id::text,
          'type', 'booking_arrival_soon',
          'address', coalesce(b.contact_address, '')
        )
      ) as msg
    from public.bookings b
    left join public.profiles p on p.id = b.user_id
    where b.status = 'accepted'
      and b.arrival_time is not null
      and b.arrival_reminder_sent_at is null
      and coalesce(nullif(b.push_token, ''), p.push_token) is not null
      and ((b.service_date::text || ' ' || b.arrival_time)::timestamp at time zone 'Europe/Nicosia')
        - interval '1 hour' <= now()
      and ((b.service_date::text || ' ' || b.arrival_time)::timestamp at time zone 'Europe/Nicosia')
        > now()
  ) due;

  due_count := coalesce(cardinality(due_ids), 0);
  if due_count = 0 then
    return 0;
  end if;

  perform net.http_post(
    url := 'https://exp.host/--/api/v2/push/send',
    headers := jsonb_build_object(
      'Accept', 'application/json',
      'Accept-encoding', 'gzip, deflate',
      'Content-Type', 'application/json'
    ),
    body := payload,
    timeout_milliseconds := 8000
  );

  perform set_config('app.sending_arrival_reminders', 'true', true);

  update public.bookings
  set arrival_reminder_sent_at = now()
  where id = any (due_ids);

  return due_count;
end;
$$;

revoke all on function private.send_due_arrival_reminders() from public, anon, authenticated;
grant execute on function private.send_due_arrival_reminders() to postgres;

select cron.unschedule(jobid)
from cron.job
where jobname = 'send-arrival-reminders';

select cron.schedule(
  'send-arrival-reminders',
  '*/5 * * * *',
  $$select private.send_due_arrival_reminders()$$
);
