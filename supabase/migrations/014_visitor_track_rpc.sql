-- Corrige el insert de visitantes anónimos, roto desde que insert-data-table!
-- empezó a pedir .select().single() tras el insert (commit 7d1d307,
-- 2026-07-19): `visitor` solo tenía policy de INSERT, sin policy de SELECT,
-- así que Postgres revierte el INSERT completo al no poder satisfacer el
-- RETURNING ("new row violates row-level security policy for table visitor").
--
-- En vez de agregar una policy SELECT abierta (visitor guarda IP/ciudad/país,
-- dato personal — ver CLAUDE.md §7.6, y R-14/R-16 en RISKS.md), se usa una
-- función security definer que inserta y devuelve solo el id (bigint), sin
-- exponer la fila completa vía SELECT. guestbook.visitor_id necesita ese id
-- real como FK, así que no alcanza con dejar de pedir el retorno.

create or replace function public.track_visitor(
  p_pais text,
  p_ciudad text,
  p_idioma text,
  p_timezone text
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id bigint;
begin
  insert into public.visitor (pais, ciudad, idioma, timezone)
  values (p_pais, p_ciudad, p_idioma, p_timezone)
  returning id into new_id;

  return new_id;
end;
$$;

grant execute on function public.track_visitor(text, text, text, text) to anon, authenticated;
