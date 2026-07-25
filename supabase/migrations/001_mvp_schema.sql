-- MVP Academia Integral: modules, student_profiles, resources, class_slots, enrollments
-- Ejecutar en Supabase SQL Editor (después de admin_rls.sql).
-- Requiere: public.is_admin(), public.questions, auth.users

-- ---------------------------------------------------------------------------
-- modules (Baldor-aligned atomic skills)
-- ---------------------------------------------------------------------------

create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  track text not null
    check (track in ('aritmetica', 'algebra', 'geometria')),
  order_index int not null default 0,
  historical_blurb text,
  created_at timestamptz not null default now()
);

create index if not exists modules_track_idx on public.modules (track);
create index if not exists modules_order_idx on public.modules (order_index);

alter table public.modules enable row level security;

drop policy if exists "modules_select_auth" on public.modules;
create policy "modules_select_auth"
  on public.modules for select
  to authenticated
  using (true);

drop policy if exists "modules_admin_all" on public.modules;
create policy "modules_admin_all"
  on public.modules for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- questions.module_id (nullable FK)
-- ---------------------------------------------------------------------------

alter table public.questions
  add column if not exists module_id uuid references public.modules (id) on delete set null;

create index if not exists questions_module_id_idx on public.questions (module_id);

-- ---------------------------------------------------------------------------
-- student_profiles (materialized from diagnostic tests)
-- ---------------------------------------------------------------------------

create table if not exists public.student_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  theta double precision,
  theta_band text
    check (theta_band is null or theta_band in ('inicial', 'basico', 'intermedio', 'avanzado')),
  updated_at timestamptz not null default now()
);

create index if not exists student_profiles_theta_band_idx
  on public.student_profiles (theta_band);

alter table public.student_profiles enable row level security;

drop policy if exists "student_profiles_select_own" on public.student_profiles;
create policy "student_profiles_select_own"
  on public.student_profiles for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "student_profiles_upsert_own" on public.student_profiles;
create policy "student_profiles_upsert_own"
  on public.student_profiles for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "student_profiles_update_own" on public.student_profiles;
create policy "student_profiles_update_own"
  on public.student_profiles for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- resources (layer-1 external content per module)
-- ---------------------------------------------------------------------------

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  module_id uuid references public.modules (id) on delete cascade,
  type text not null
    check (type in ('text', 'video_url', 'audio_url', 'pdf_url', 'exercise')),
  title text not null,
  body text,
  media_url text,
  historical_context text,
  order_index int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists resources_module_id_idx on public.resources (module_id);
create index if not exists resources_published_idx on public.resources (published);

alter table public.resources enable row level security;

drop policy if exists "resources_select_published" on public.resources;
create policy "resources_select_published"
  on public.resources for select
  to authenticated
  using (published = true or public.is_admin());

drop policy if exists "resources_admin_all" on public.resources;
create policy "resources_admin_all"
  on public.resources for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- class_slots (hybrid enrollment by theta_band)
-- ---------------------------------------------------------------------------

create table if not exists public.class_slots (
  id uuid primary key default gen_random_uuid(),
  theta_band text not null
    check (theta_band in ('inicial', 'basico', 'intermedio', 'avanzado')),
  track text
    check (track is null or track in ('aritmetica', 'algebra', 'geometria')),
  modality text not null
    check (modality in ('online', 'presencial')),
  starts_at timestamptz not null,
  location_or_link text,
  capacity int not null default 8 check (capacity > 0),
  min_enrollments int not null default 3 check (min_enrollments > 0),
  status text not null default 'open'
    check (status in ('open', 'confirmed', 'cancelled', 'completed')),
  title text,
  active_enrollments int not null default 0,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists class_slots_band_status_idx
  on public.class_slots (theta_band, status);
create index if not exists class_slots_starts_at_idx
  on public.class_slots (starts_at);

alter table public.class_slots enable row level security;

drop policy if exists "class_slots_select_open" on public.class_slots;
create policy "class_slots_select_open"
  on public.class_slots for select
  to authenticated
  using (status in ('open', 'confirmed') or public.is_admin());

drop policy if exists "class_slots_admin_all" on public.class_slots;
create policy "class_slots_admin_all"
  on public.class_slots for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- enrollments
-- ---------------------------------------------------------------------------

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references public.class_slots (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (slot_id, user_id)
);

create index if not exists enrollments_user_id_idx on public.enrollments (user_id);
create index if not exists enrollments_slot_id_idx on public.enrollments (slot_id);

alter table public.enrollments enable row level security;

drop policy if exists "enrollments_select_own" on public.enrollments;
create policy "enrollments_select_own"
  on public.enrollments for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "enrollments_insert_own" on public.enrollments;
create policy "enrollments_insert_own"
  on public.enrollments for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "enrollments_update_own" on public.enrollments;
create policy "enrollments_update_own"
  on public.enrollments for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- in-app notifications (banner; email can hook later)
-- ---------------------------------------------------------------------------

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null default 'info',
  message text not null,
  meta jsonb not null default '{}'::jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_unread_idx
  on public.notifications (user_id, read);

alter table public.notifications enable row level security;

drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own"
  on public.notifications for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own"
  on public.notifications for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "notifications_insert_admin" on public.notifications;
create policy "notifications_insert_admin"
  on public.notifications for insert
  to authenticated
  with check (public.is_admin() or user_id = auth.uid());

-- Allow trigger (security definer) to insert notifications for any user
-- ---------------------------------------------------------------------------
-- Threshold: confirm slot when min_enrollments reached
-- ---------------------------------------------------------------------------

create or replace function public.confirm_slot_if_threshold()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  slot record;
  active_count int;
  enrollee record;
  admin_row record;
  target_slot uuid;
begin
  target_slot := coalesce(new.slot_id, old.slot_id);

  select count(*)::int into active_count
  from public.enrollments
  where slot_id = target_slot
    and status in ('pending', 'confirmed');

  update public.class_slots
    set active_enrollments = active_count
    where id = target_slot;

  select * into slot from public.class_slots where id = target_slot;
  if slot is null or slot.status <> 'open' then
    return coalesce(new, old);
  end if;

  if active_count >= slot.min_enrollments then
    update public.class_slots
      set status = 'confirmed'
      where id = slot.id and status = 'open';

    update public.enrollments
      set status = 'confirmed'
      where slot_id = slot.id and status = 'pending';

    for enrollee in
      select user_id from public.enrollments
      where slot_id = slot.id and status = 'confirmed'
    loop
      insert into public.notifications (user_id, kind, message, meta)
      values (
        enrollee.user_id,
        'slot_confirmed',
        'Tu grupo de estudio fue confirmado. Revisa Cupos / Mis grupos.',
        jsonb_build_object('slot_id', slot.id, 'starts_at', slot.starts_at)
      );
    end loop;

    for admin_row in
      select id from public.profiles where role = 'admin'
    loop
      insert into public.notifications (user_id, kind, message, meta)
      values (
        admin_row.id,
        'slot_confirmed_admin',
        format('Cupo confirmado (%s inscritos): %s %s',
               active_count, coalesce(slot.title, slot.theta_band), slot.modality),
        jsonb_build_object('slot_id', slot.id, 'count', active_count)
      );
    end loop;
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists enrollments_confirm_threshold on public.enrollments;
create trigger enrollments_confirm_threshold
  after insert or update of status on public.enrollments
  for each row execute function public.confirm_slot_if_threshold();
