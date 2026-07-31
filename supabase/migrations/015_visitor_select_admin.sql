-- Permite al admin leer `visitor` para mostrar contexto (país/ciudad/idioma/
-- timezone) junto a cada mensaje del guestbook en el panel de moderación.
-- `visitor` sigue sin SELECT para anon/authenticated no-admin: guarda datos
-- personales (IP, ciudad, país) y hoy no tenía ninguna policy SELECT (ver
-- 014_visitor_track_rpc.sql, LESSONS_LEARNED L-31).

drop policy if exists "visitor_select_admin" on public.visitor;
create policy "visitor_select_admin"
  on public.visitor for select
  to authenticated
  using (public.is_admin());
