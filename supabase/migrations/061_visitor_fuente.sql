-- De dónde vino la visita: la columna `fuente` y la sobrecarga del RPC.
--
-- PARA QUÉ. El 2026-08-29 el owner imprime 100 tarjetas con código QR y un
-- afiche para la universidad. Hoy `track_visitor` (`014`) guarda país, ciudad,
-- idioma y timezone, y **nada sobre el origen**: una visita que llega por el QR
-- de la tarjeta es indistinguible de una que llegó por Google. Sin eso no se
-- puede responder la única pregunta que justifica volver a imprimir —qué canal
-- trajo gente— y el gasto se convierte en fe.
--
-- Es [[../project-memory/TESIS_DE_CRECIMIENTO]] G-5 (distribución medida) en su
-- versión más chica y más barata, y ataca R-31: hoy el funnel no sabe distinguir
-- el canal que funciona del que no.
--
-- QUÉ **NO** ES ESTO. No es analítica ni seguimiento de personas. `fuente` es una
-- **etiqueta de campaña que elegimos nosotros** (`tarjeta`, `afiche`,
-- `instagram`), llega por la query string (`?de=tarjeta`) y se guarda junto a la
-- fila que ya existía. No se agrega ningún dato personal nuevo, que es lo que §7
-- de `CLAUDE.md` exige registrar antes de ampliar la recolección.
--
-- Y por eso mismo la columna está **acotada por check**: viene de la URL, o sea
-- de un input que cualquiera puede escribir. Máximo 40 caracteres, solo
-- minúsculas, dígitos, `.`, `_` y `-`. Nada de guardar la query string entera:
-- ahí es donde una etiqueta de campaña se convierte, sin querer, en un campo
-- libre con datos de la persona.
--
-- ⚠️ **ORDEN DE DESPLIEGUE (R-39): esta migración primero, el bundle después.**
-- Por eso el RPC nuevo es una **sobrecarga de 5 argumentos** y la versión de 4
-- de `014` **se deja intacta**: mientras el bundle publicado siga llamando a la
-- de 4, sigue funcionando igual. Cuando se despliegue el bundle que manda
-- `p_fuente`, empieza a usar la de 5 sin que nada se caiga en el medio.
--
-- ⚠️ **Límite conocido de la atribución.** `visitor-tracker/start-tracking!` solo
-- inserta **la primera vez** que un navegador visita el sitio (guarda del
-- `localStorage`). O sea que `fuente` responde «de dónde llegó quien **nunca**
-- había entrado», no «de dónde llegó esta visita». Para una campaña que busca
-- gente nueva es justo lo que se quiere, pero hay que decirlo antes de leer los
-- números: un conocido que ya visitó la página y escanea la tarjeta **no** suma.

-- -----------------------------------------------------------------------------
-- 1. La columna
-- -----------------------------------------------------------------------------
alter table public.visitor
  add column if not exists fuente text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'visitor_fuente_formato') then
    alter table public.visitor
      add constraint visitor_fuente_formato
      check (fuente is null or fuente ~ '^[a-z0-9._-]{1,40}$');
  end if;
end $$;

comment on column public.visitor.fuente is
  'Etiqueta de campaña de la URL (?de=tarjeta). NO es dato personal ni query string cruda: formato acotado por check. Migración 061.';

-- Las consultas del canal filtran por `fuente`; el índice parcial se salta las
-- filas históricas, que son casi todas.
create index if not exists visitor_fuente_idx
  on public.visitor (fuente) where fuente is not null;

-- -----------------------------------------------------------------------------
-- 2. `track_visitor` con fuente — sobrecarga, no reemplazo
-- -----------------------------------------------------------------------------
-- La etiqueta se normaliza y, si no cumple el formato, **se guarda null en vez
-- de fallar**: un QR mal impreso o una URL manipulada no puede romper el
-- registro de la visita. Perder la etiqueta es barato; perder la fila, no.

create or replace function public.track_visitor(
  p_pais     text,
  p_ciudad   text,
  p_idioma   text,
  p_timezone text,
  p_fuente   text
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id bigint;
  fuente_limpia text;
begin
  fuente_limpia := lower(btrim(coalesce(p_fuente, '')));

  if fuente_limpia !~ '^[a-z0-9._-]{1,40}$' then
    fuente_limpia := null;
  end if;

  insert into public.visitor (pais, ciudad, idioma, timezone, fuente)
  values (p_pais, p_ciudad, p_idioma, p_timezone, fuente_limpia)
  returning id into new_id;

  return new_id;
end;
$$;

grant execute on function public.track_visitor(text, text, text, text, text) to anon, authenticated;

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   -- Las dos versiones conviven (la de 4 la sigue usando el bundle publicado):
--   select p.oid::regprocedure
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public' and p.proname = 'track_visitor';
--   -- dos filas: (text,text,text,text) y (text,text,text,text,text)
--
--   -- Prueba de humo, incluida la etiqueta basura que debe guardarse como null:
--   select public.track_visitor('Chile','Iquique','es','America/Santiago','tarjeta');
--   select public.track_visitor('Chile','Iquique','es','America/Santiago','TARJETA  ');
--   select public.track_visitor('Chile','Iquique','es','America/Santiago','<script>x</script>');
--   select id, fuente from public.visitor order by id desc limit 3;
--   -- 'tarjeta' · 'tarjeta' · null
--   -- (borrar esas tres filas de prueba después)
--
--   -- LA CONSULTA DE LA CAMPAÑA — visitantes nuevos por canal:
--   select coalesce(fuente, '(sin etiqueta)') as canal, count(*) as visitantes
--     from public.visitor
--    group by 1 order by 2 desc;
--   -- Las filas anteriores al despliegue quedan en '(sin etiqueta)', así que la
--   -- comparación útil es entre canales, no contra el histórico. Si `visitor`
--   -- tiene columna de fecha, acotar por ella el período de la campaña.
--
-- Reversión:
--   drop function if exists public.track_visitor(text, text, text, text, text);
--   drop index if exists public.visitor_fuente_idx;
--   alter table public.visitor drop constraint if exists visitor_fuente_formato;
--   alter table public.visitor drop column if exists fuente;
--   (la versión de 4 argumentos de `014` queda intacta en todo momento)
