-- Permite que un admin marque como atendida una solicitud de eliminación de
-- cuenta. Reutiliza la tabla notifications (kind = 'account_deletion_request'):
-- el usuario inserta la fila sobre sí mismo (ya permitido por
-- notifications_insert_admin), el admin la ve por RLS (notifications_select_own
-- ya incluye is_admin()), pero notifications_update_own solo dejaba actualizar
-- al propio dueño de la fila. Esta policy agrega la marca de "atendida" por
-- parte del admin sin abrir escritura a otras columnas.

drop policy if exists "notifications_update_admin" on public.notifications;
create policy "notifications_update_admin"
  on public.notifications for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
