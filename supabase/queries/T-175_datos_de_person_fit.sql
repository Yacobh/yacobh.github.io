-- T-175 · Datos para medir person-fit en agregado (Q-46)
-- ===========================================================================
-- Solo lectura, con `claude_ro` (ADR-040), sobre `tests_sin_identidad`. Lo lee
-- `scripts/medir_person_fit.sh`. Mismas exclusiones que T-76 (origin
-- `student`, user_id no nulo); mismas limitaciones: las cuentas de prueba
-- marcadas `student` (T-145) entran hasta que el owner complete la lista.
--
-- `user_id` sale solo para numerar los intentos de cada estudiante dentro de
-- un topic (1º, 2º, …); el script no lo escribe en ningún reporte.
-- ===========================================================================
\o :salida
with excluidos(user_id) as (
    values (null::uuid)          -- ← el owner agrega acá los user_id de prueba
  )
  select coalesce(json_agg(json_build_object(
           'id', t.id,
           'user_id', t.user_id,
           'topic', t.topic,
           'theta', t.theta,
           'created_at', to_char(t.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US'),
           'c', t.test -> 'stop-config' -> 'guessing-c',
           'responses', t.test -> 'responses')
         order by t.created_at), '[]'::json)
  from public.tests_sin_identidad t
  where t.origin = 'student'
    and t.user_id is not null
    and t.user_id not in (select user_id from excluidos where user_id is not null)
    and jsonb_typeof(t.test -> 'responses') = 'array';
\o
