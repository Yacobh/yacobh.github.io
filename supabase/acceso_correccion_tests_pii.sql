-- CORRECCIÓN URGENTE de `supabase/acceso_del_agente.sql` — aplicar cuanto antes.
--
-- ── El defecto ───────────────────────────────────────────────────────────────
--
-- ADR-040 afirma que `claude_ro` «no ve emails» y que `tests` «no tiene email ni
-- nombre — solo `user_id`, que es un uuid». **Las dos cosas son falsas**, y se
-- descubrió al conectarse por primera vez a la base real (2026-09-18):
--
--     select count(*) filter (where "email-user" is not null),
--            count(*) filter (where test::jsonb ->> 'email' is not null),
--            count(*) from tests;
--     →  350 | 348 | 350
--
-- `tests` tiene una columna **`email-user`** poblada en **las 350 filas**, y el
-- jsonb `test` trae además una clave `email` en 348. O sea que el rol de solo
-- lectura podía leer el correo de cada estudiante que rindió — incluidos los del
-- 4º medio del liceo, que son **menores de edad** (R-28).
--
-- ── Por qué no lo vio nadie ──────────────────────────────────────────────────
--
-- Porque la lista de tablas a excluir se armó **leyendo `SCHEMA.md` y el
-- esquema**, y ahí `tests` figura como la tabla de resultados: θ, respuestas,
-- `origin`. La columna `email-user` está desde el MVP, con un nombre con guion
-- que ninguna búsqueda de «email» en las migraciones encuentra, porque la tabla
-- **preexiste al esquema versionado** — el mismo motivo por el que `questions`
-- no tiene `create table` y la fuente de verdad es `crud.cljs` (L-46).
--
-- **La lección es la de siempre y van tres en dos días: se verifica contra la
-- base, no contra la documentación.** La diferencia es que las dos anteriores
-- costaban una consulta mal contada y ésta cuesta datos personales de menores.
--
-- ── El arreglo ───────────────────────────────────────────────────────────────
--
-- Se le quita a `claude_ro` el acceso a `tests` y se le da **una vista sin
-- identidad**: mismas columnas útiles para calibrar (G-2), sin el email de la
-- columna ni el del jsonb. `user_id` se conserva —es un uuid y `auth.users` le
-- está cerrada— porque sin él no se puede agrupar por estudiante, que es la
-- mitad de lo que G-4 necesita.

-- -----------------------------------------------------------------------------
-- 1. Cortar el acceso directo a `tests`
-- -----------------------------------------------------------------------------
revoke select on public.tests from claude_ro;
revoke select on public.tests from claude_ddl;
drop policy if exists "claude_ro_lectura"  on public.tests;
drop policy if exists "claude_ddl_lectura" on public.tests;

-- -----------------------------------------------------------------------------
-- 2. La vista sin identidad
-- -----------------------------------------------------------------------------
-- `- 'email'` saca la clave del jsonb. Se listan las columnas una por una en vez
-- de `select *`: si mañana alguien agrega otra columna con datos personales a
-- `tests`, esta vista **no** la va a arrastrar sola.

create or replace view public.tests_sin_identidad as
select
  t.id,
  t.created_at,
  t.user_id,          -- uuid; `auth.users` le está cerrada a los dos roles
  t.topic,
  t.theta,
  t.engine_version,
  t.origin,
  (t.test::jsonb) - 'email' as test
from public.tests t;

comment on view public.tests_sin_identidad is
  'tests sin el email del estudiante (columna `email-user` ni la clave `email` del jsonb). Es la única forma en que claude_ro y claude_ddl ven el histórico. Ver supabase/acceso_correccion_tests_pii.sql y ADR-040.';

grant select on public.tests_sin_identidad to claude_ro;
grant select on public.tests_sin_identidad to claude_ddl;

-- -----------------------------------------------------------------------------
-- Verificación — correr entera después de aplicar
-- -----------------------------------------------------------------------------
--   -- (a) La vista no deja pasar ningún correo. Esperado: 0 | 0
--   select count(*) filter (where test ? 'email')            as jsonb_con_email,
--          count(*) filter (where test::text like '%@%')     as algo_con_arroba
--     from public.tests_sin_identidad;
--
--   -- (b) Y sigue sirviendo para lo que existe: θ, parada y origen.
--   select count(*) as filas, count(theta) as con_theta,
--          count(*) filter (where origin = 'student') as de_estudiantes
--     from public.tests_sin_identidad;
--
--   -- (c) Desde psql con la cadena de claude_ro, las dos deben FALLAR:
--   --     select "email-user" from tests limit 1;   → permission denied
--   --     select count(*) from tests;               → permission denied
--   --   y ésta debe funcionar:
--   --     select count(*) from tests_sin_identidad;
--
-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
--   drop view if exists public.tests_sin_identidad;
--   -- (y si se quisiera volver al acceso directo, que NO se recomienda:
--   --  grant select on public.tests to claude_ro;
--   --  create policy "claude_ro_lectura" on public.tests for select to claude_ro using (true);)
