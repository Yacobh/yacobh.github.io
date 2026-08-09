-- ⚠️ NO APLICAR HASTA QUE EL BUNDLE QUE USA LOS RPC DE 024 ESTÉ EN PRODUCCIÓN.
--
-- Esta es la migración que efectivamente cierra el agujero: elimina la policy
-- permisiva que hace legible el banco de ítems completo para cualquier cuenta.
-- Aplicarla antes de publicar el bundle nuevo deja el diagnóstico ROTO para
-- todo usuario que no sea admin, porque el cliente viejo lee `questions`
-- directamente (universo.events.test/fetch-candidates).
--
-- Precondiciones, en este orden:
--   1. 024_questions_rpc.sql aplicada.
--   2. Cliente adaptado a next_question/score_answer (BACKLOG T-47),
--      compilado con `npx shadow-cljs release app`, commiteado y mergeado a
--      main (ADR-003: el bundle versionado ES el deploy).
--   3. Diagnóstico probado de punta a punta con una cuenta de ESTUDIANTE real
--      —no admin, que sigue leyendo la tabla directo y no notaría la rotura—,
--      incluyendo feedback tras una alternativa incorrecta y cierre del test.
--
-- Ver adr/ADR-015-item-sin-respuesta-en-el-cliente.md §Secuencia de despliegue.

-- ---------------------------------------------------------------------------
-- La policy permisiva creada desde el dashboard de Supabase
-- ---------------------------------------------------------------------------
-- Estado antes de esta migración:
--   "Enable read access for all users" | SELECT | {authenticated} | using: true
--   questions_select_admin             | SELECT | {authenticated} | using: is_admin()
--
-- Las policies PERMISSIVE se combinan con OR, así que la regla efectiva era
-- `true OR is_admin()` = `true`, y questions_select_admin era INERTE.
-- Al borrar la permisiva, questions_select_admin pasa a ser la única regla de
-- lectura directa: los admins siguen leyendo todo (el panel no cambia) y los
-- estudiantes obtienen CERO filas, accediendo a los ítems solo por los RPC.

drop policy if exists "Enable read access for all users" on public.questions;

-- Defensa en profundidad: que nadie herede lectura por privilegios de tabla
-- si en el futuro se agrega otra policy permisiva por descuido.
revoke select on public.questions from anon;

-- ---------------------------------------------------------------------------
-- Verificación posterior obligatoria
-- ---------------------------------------------------------------------------
-- a) Solo deben quedar las cuatro policies de admin:
--      select policyname, cmd, qual from pg_policies
--      where tablename = 'questions';
--
-- b) Con una cuenta de ESTUDIANTE, desde la consola del navegador:
--      await supabase.from('questions').select('*')
--    debe devolver `data: []` (cero filas), no un error.
--
-- c) El diagnóstico debe seguir funcionando con esa misma cuenta.
--
-- Si (c) falla, revertir de inmediato recreando la policy permisiva:
--   create policy "Enable read access for all users"
--     on public.questions for select to authenticated using (true);
-- y volver a intentar cuando el bundle correcto esté publicado.
