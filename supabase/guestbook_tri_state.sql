-- Guestbook tri-state + delete admin
-- null = pendiente, true = aprobado, false = papelera
-- Ejecutar en Supabase SQL Editor.

alter table public.guestbook
  alter column is_approved drop not null;

alter table public.guestbook
  alter column is_approved set default null;

-- Antes la app usaba false como "pendiente"; pasar esa cola a null.
update public.guestbook
set is_approved = null
where is_approved = false;

-- Admin puede eliminar (papelera → borrado permanente)
drop policy if exists "guestbook_delete_admin" on public.guestbook;
create policy "guestbook_delete_admin"
  on public.guestbook for delete
  to authenticated
  using (public.is_admin());
