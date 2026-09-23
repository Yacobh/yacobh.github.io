-- 084 · La vista de lectura del agente solo la leen los roles del agente
-- ===========================================================================
-- ⚠️ SE APLICA ANTES DE CUALQUIER OTRA COSA. La aplica el owner en el SQL Editor:
--    `claude_ddl` no es dueño de la vista y no puede revocar sobre ella (ADR-040).
--
-- Qué pasa: `tests_sin_identidad` (supabase/acceso_correccion_tests_pii.sql,
-- 2026-09-18) se creó con los privilegios por defecto de Supabase, que le dan
-- a `anon` y `authenticated` todos los verbos sobre cualquier objeto nuevo de
-- `public` (T-163). Una vista sin `security_invoker` corre con los permisos de
-- su dueño, así que la RLS de `tests` no se aplica a quien la lee.
--
-- Por qué la corrección es revocar y no `security_invoker = true`: con el
-- invocador, `claude_ro` necesitaría leer `tests`, que es justo lo que D-71
-- le cerró. La vista es para los dos roles del agente y para nadie más.
--
-- No toca datos, ni `tests`, ni ninguna policy. Idempotente.
-- ===========================================================================

revoke all on public.tests_sin_identidad from public, anon, authenticated;

-- Los dos roles del agente conservan lo que ya tenían.
grant select on public.tests_sin_identidad to claude_ro;
grant select on public.tests_sin_identidad to claude_ddl;

-- ---------------------------------------------------------------------------
-- Verificación — después de aplicar
-- ---------------------------------------------------------------------------
--   (a) En el catálogo. Esperado: solo postgres, claude_ro y claude_ddl.
--       select unnest(relacl) from pg_class where relname = 'tests_sin_identidad';
--
--   (b) Desde afuera, con la anon key del bundle. Esperado: HTTP 401 o 403, no 200.
--       curl -s -o /dev/null -w '%{http_code}\n' \
--         "https://<proyecto>.supabase.co/rest/v1/tests_sin_identidad?select=id&limit=0" \
--         -H "apikey: <anon>" -H "Authorization: Bearer <anon>"
--
--   (c) El agente sigue leyendo: con SUPABASE_DB_URL_RO,
--       select count(*) from tests_sin_identidad;   -- > 0
--
-- Reversión (no debería hacer falta nunca):
--   grant select on public.tests_sin_identidad to anon, authenticated;
