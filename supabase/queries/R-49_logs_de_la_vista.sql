-- R-49 · ¿Alguien leyó `tests_sin_identidad` por la API mientras estuvo abierta?
-- ===========================================================================
-- Se pega en el **Logs Explorer** del dashboard de Supabase (no en el SQL
-- Editor: es el dialecto de logs, no PostgreSQL). Lo corre el owner: el agente
-- no tiene sesión en el dashboard y `claude_ro` no ve los logs.
--
-- Ventana: 2026-09-18 (se creó la vista) → 2026-09-25 (084 verificada).
-- ⚠️ La retención de logs depende del plan (en el plan gratuito es corta, del
-- orden de un día): si la consulta vuelve vacía para días viejos, no significa
-- «nadie leyó», significa «no queda registro». Anotar cuál de las dos fue.
--
-- Cómo leer el resultado:
--   · El agente lee la vista por **psql** (claude_ro), que NO pasa por la API:
--     no aparece acá.
--   · Sí aparecen las verificaciones del agente por la API, que son HEAD o GET
--     con `limit=0`: SESSION-050 (2026-09-23) y SESSION-051 (2026-09-25, → 401).
--   · Cualquier otra fila con status 200 es una lectura ajena.
-- ===========================================================================
select
  timestamp,
  request.method,
  request.path,
  request.search,
  response.status_code
from edge_logs
cross join unnest(metadata) as m
cross join unnest(m.request) as request
cross join unnest(m.response) as response
where request.path like '%tests_sin_identidad%'
order by timestamp desc
limit 200;
