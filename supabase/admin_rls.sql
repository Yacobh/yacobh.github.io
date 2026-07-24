-- Admin panel MVP: profiles + is_admin() + RLS
-- Ejecutar en Supabase SQL Editor (una vez).
-- Luego marcar tu cuenta:
--   update public.profiles set role = 'admin' where email = 'TU_EMAIL';

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'user'
    check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_email_idx on public.profiles (email);

alter table public.profiles enable row level security;

-- ---------------------------------------------------------------------------
-- is_admin()
-- ---------------------------------------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- Trigger: crear profile al registrarse
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill perfiles de usuarios ya existentes
insert into public.profiles (id, email, role)
select u.id, u.email, 'user'
from auth.users u
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- RLS: profiles
-- ---------------------------------------------------------------------------

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (
    id = auth.uid()
    and role = (select p.role from public.profiles p where p.id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- RLS: tests — admin puede leer todos
-- ---------------------------------------------------------------------------

drop policy if exists "tests_select_admin" on public.tests;
create policy "tests_select_admin"
  on public.tests for select
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- RLS: guestbook — admin lee todo y actualiza is_approved
-- ---------------------------------------------------------------------------

drop policy if exists "guestbook_select_admin" on public.guestbook;
create policy "guestbook_select_admin"
  on public.guestbook for select
  to authenticated
  using (public.is_admin());

drop policy if exists "guestbook_update_admin" on public.guestbook;
create policy "guestbook_update_admin"
  on public.guestbook for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "guestbook_delete_admin" on public.guestbook;
create policy "guestbook_delete_admin"
  on public.guestbook for delete
  to authenticated
  using (public.is_admin());
