-- Vista de admin para los mensajes de contacto (hoy no existía ninguna) y
-- columna para enlazar el contexto del visitante, igual que guestbook.id_visitor.
-- `extra` deja de guardar el app-db completo de re-frame (ver LESSONS_LEARNED,
-- "extra db") y pasa a guardar un contexto curado (sección visitada, si había
-- sesión) desde el cliente — sin cambio de esquema para eso, es el mismo
-- campo jsonb con contenido más chico.

alter table public.contacto
  add column if not exists id_visitor bigint;

drop policy if exists "contacto_select_admin" on public.contacto;
create policy "contacto_select_admin"
  on public.contacto for select
  to authenticated
  using (public.is_admin());
