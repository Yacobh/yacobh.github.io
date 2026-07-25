-- Admin CRUD sobre public.questions vía is_admin()
-- Ejecutar en Supabase SQL Editor si aún no existe.

alter table public.questions enable row level security;

drop policy if exists "questions_select_admin" on public.questions;
create policy "questions_select_admin"
  on public.questions for select
  to authenticated
  using (public.is_admin());

drop policy if exists "questions_insert_admin" on public.questions;
create policy "questions_insert_admin"
  on public.questions for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "questions_update_admin" on public.questions;
create policy "questions_update_admin"
  on public.questions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "questions_delete_admin" on public.questions;
create policy "questions_delete_admin"
  on public.questions for delete
  to authenticated
  using (public.is_admin());
