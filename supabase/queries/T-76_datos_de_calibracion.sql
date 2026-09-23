-- T-76 · Datos para calibrar `difficulty` con respuestas reales
-- ===========================================================================
-- Arma los dos archivos que lee `scripts/calibrar_banco.sh`. Solo lectura:
-- corre con `claude_ro` (ADR-040) y **no lee `tests`** sino
-- `tests_sin_identidad`, que no trae correo ni la clave `email` del jsonb.
--
-- ── A QUIÉN SE EXCLUYE, Y POR QUÉ (T-145) ────────────────────────────────────
-- La lista vive **en este archivo** y no en la memoria de nadie (L-59).
--
-- 1. `origin <> 'student'`: las corridas desde el panel (`admin_preview`,
--    T-110). Al 2026-09-23 son 76 filas de 2 cuentas.
-- 2. Los tracks que no son producto **no se excluyen acá**: la calibración es
--    banco por banco, así que no contaminan a los demás. Se filtran al leer el
--    resultado si hace falta (CLAUDE.md §4).
-- 3. ⚠️ **Cuentas de prueba marcadas `student`** —al menos `a@a.com`, 5 filas
--    según T-145—. `claude_ro` **no ve correos**, así que no puede encontrar su
--    `user_id`, y T-145 prohíbe deducirlo mirando el patrón de uso. Hasta que
--    el owner lo complete en la lista `excluidos` de abajo, **esas filas
--    entran**. El reporte lo declara como limitación.
--
-- ── Qué NO filtra, a propósito ─────────────────────────────────────────────
-- Ni primeros intentos, ni escapes, ni esfuerzo: eso lo hace
-- `universo.irt.calibracion/observaciones`, con tests. Repetirlo en SQL
-- abriría dos criterios que pueden divergir.
-- ===========================================================================

-- Se corre con `psql -At -v respuestas=… -v etiquetas=… -f` (lo hace el
-- script): `\o` manda cada resultado a su archivo.

-- 1. Respuestas → respuestas.json
\o :respuestas
with excluidos(user_id) as (
    values (null::uuid)          -- ← el owner agrega acá los user_id de prueba
  )
  select coalesce(json_agg(json_build_object(
           'id', t.id,
           'user_id', t.user_id,
           'topic', t.topic,
           'created_at', to_char(t.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US'),
           'test', json_build_object('responses', t.test -> 'responses'))
         order by t.id), '[]'::json)
  from public.tests_sin_identidad t
  where t.origin = 'student'
    and t.user_id is not null
    and t.user_id not in (select user_id from excluidos where user_id is not null)
    and jsonb_typeof(t.test -> 'responses') = 'array';

-- 2. Etiquetas actuales → etiquetas.json. Se usa la `difficulty` de HOY, no la
--    que quedó guardada en cada respuesta: `083` rehízo `diagnostico` y la
--    comparación es contra la etiqueta vigente.
\o :etiquetas
select coalesce(json_agg(json_build_object('id', q.id, 'topic', q.topic,
                                           'difficulty', q.difficulty) order by q.id), '[]'::json)
from public.questions q;
\o
