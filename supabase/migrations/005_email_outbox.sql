-- Email cohort (Fase 5, primer paso): cola outbox + encolado al confirmar cupo.
-- El envío real lo hace la Edge Function `send-enrollment-emails` (Resend).
-- Sin RESEND_API_KEY la cola queda pending para reintento.

create table if not exists public.email_outbox (
  id uuid primary key default gen_random_uuid(),
  to_email text not null,
  subject text not null,
  body text not null,
  kind text not null default 'slot_confirmed',
  meta jsonb not null default '{}'::jsonb,
  status text not null default 'pending'
    check (status in ('pending', 'sent', 'failed')),
  attempts int not null default 0,
  last_error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists email_outbox_pending_idx
  on public.email_outbox (status, created_at)
  where status = 'pending';

alter table public.email_outbox enable row level security;

drop policy if exists "email_outbox_admin_all" on public.email_outbox;
create policy "email_outbox_admin_all"
  on public.email_outbox for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Encola mails cuando se inserta notificación de confirmación de cupo
create or replace function public.enqueue_email_from_notification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  dest text;
  slot_id uuid;
  starts text;
  subj text;
  body text;
begin
  if new.kind not in ('slot_confirmed', 'slot_confirmed_admin') then
    return new;
  end if;

  select p.email into dest
  from public.profiles p
  where p.id = new.user_id;

  if dest is null or dest = '' then
    return new;
  end if;

  slot_id := (new.meta->>'slot_id')::uuid;
  starts := coalesce(new.meta->>'starts_at', '');

  if new.kind = 'slot_confirmed_admin' then
    subj := 'Academia Integral — cupo confirmado (admin)';
    body := new.message || E'\n\nSlot: ' || coalesce(slot_id::text, '') ||
            E'\nInicio: ' || starts;
  else
    subj := 'Academia Integral — tu grupo fue confirmado';
    body := new.message || E'\n\nRevisa Cupos / Mis grupos en la plataforma.' ||
            E'\nInicio: ' || starts;
  end if;

  insert into public.email_outbox (to_email, subject, body, kind, meta)
  values (
    dest,
    subj,
    body,
    new.kind,
    coalesce(new.meta, '{}'::jsonb) || jsonb_build_object('notification_id', new.id)
  );

  return new;
end;
$$;

drop trigger if exists notifications_enqueue_email on public.notifications;
create trigger notifications_enqueue_email
  after insert on public.notifications
  for each row execute function public.enqueue_email_from_notification();
