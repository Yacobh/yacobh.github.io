-- Normaliza topic/theta como columnas propias de public.tests (hoy solo
-- viven dentro del JSON de la columna `test`) y agrega la policy de lectura
-- propia que faltaba, necesarias para computar qué tests se desbloquean
-- (ver 020_test_configs.sql y universo.access).

alter table public.tests
  add column if not exists topic text,
  add column if not exists theta double precision;

-- Backfill best-effort del topic histórico (extracción de texto, sin riesgo
-- de cast numérico). Si `test` no es json/jsonb válido en alguna fila legacy,
-- ajustar el cast antes de correr esto en producción (ver project-memory).
update public.tests
   set topic = (test::jsonb) ->> 'topic'
 where topic is null;

-- No se hace backfill de `theta` histórico: un cast numérico masivo sobre
-- datos ya guardados es más riesgoso que el valor que aporta. Los tests ya
-- rendidos antes de este deploy simplemente no cuentan para gates de theta
-- hasta que el usuario vuelva a rendir ese topic.

create index if not exists tests_user_id_topic_idx
  on public.tests (user_id, topic);

-- No se encontró ningún `alter table ... enable row level security` sobre
-- `tests` en ningún archivo versionado (a diferencia de `profiles` en
-- admin_rls.sql). Si ya estaba habilitado manualmente en Supabase, esto es
-- un no-op seguro; si no lo estaba, `tests_select_admin` (admin_rls.sql) era
-- inerte hasta ahora y esta línea lo activa de verdad.
alter table public.tests enable row level security;

-- Hoy NO existe ninguna policy de SELECT propia del usuario sobre `tests`
-- (solo tests_select_admin en supabase/admin_rls.sql) — por diseño, el
-- insert usa {:returning? false} para evitar necesitarla. Este feature sí la
-- necesita: el cliente debe poder leer su propio historial de topics/theta.
drop policy if exists "tests_select_own" on public.tests;
create policy "tests_select_own"
  on public.tests for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());
