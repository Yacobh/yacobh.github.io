-- Limpieza de RLS tras la auditoría completa de pg_policies del 2026-08-08
-- (ver adr/ADR-015-item-sin-respuesta-en-el-cliente.md §Contexto).
--
-- Esta migración NO toca el agujero de `questions` — eso es 024 + 025. Acá solo
-- va lo inocuo: eliminar una tabla huérfana, consolidar policies redundantes y
-- versionar las que se habían creado desde el dashboard de Supabase (y que por
-- eso no existían en ningún archivo del repositorio).
--
-- Regla nueva que se deriva de esta auditoría: **ninguna policy se crea desde
-- el dashboard**. Si no está en una migración, no existe.
--
-- Es segura de aplicar en cualquier momento: no cambia ningún permiso efectivo.

-- ---------------------------------------------------------------------------
-- 1. Tabla huérfana `dashboard`
-- ---------------------------------------------------------------------------
-- Creada desde la UI en algún momento, con SELECT `true` e INSERT `true` para
-- cualquier usuario autenticado. Verificado el 2026-08-08 antes de borrarla:
--   - `select count(*) from public.dashboard` => 0 filas
--   - no la referencia ningún archivo de src/universo/ (ni events/dashboard.cljs
--     ni db/crud.cljs), ninguna migración, ni supabase/SCHEMA.md
-- Es decir: sin datos, sin lectores y sin escritores. Se elimina.
--
-- NOTA: `events/dashboard.cljs` existe y funciona, pero consulta `tests`, no
-- esta tabla. El nombre coincidente es lo único que las relaciona.

drop table if exists public.dashboard;

-- ---------------------------------------------------------------------------
-- 2. `tests`: cuatro policies donde bastan dos
-- ---------------------------------------------------------------------------
-- Estado encontrado:
--   "Enable insert for users based on user_id"  INSERT  auth.uid() = user_id
--   "Enable users to view their own data only"  SELECT  auth.uid() = user_id
--   tests_select_admin                          SELECT  is_admin()
--   tests_select_own                            SELECT  user_id = auth.uid() OR is_admin()
--
-- Las tres de SELECT se combinan con OR y dan exactamente lo que ya expresa
-- `tests_select_own` por sí sola. Las dos primeras vienen del dashboard.
--
-- CORRECCIÓN DE MEMORIA: la nota de T-39 en project-memory/CURRENT_STATUS.md
-- afirma que `tests` "no tenía ninguna policy de SELECT propia del usuario".
-- Era falso: existía "Enable users to view their own data only", solo que no
-- estaba versionada. La policy `tests_select_own` que agregó 021 era redundante
-- (inofensiva, pero redundante).

-- Se crea el reemplazo versionado del INSERT ANTES de borrar el original,
-- para no dejar ni un instante sin poder guardar tests.
drop policy if exists "tests_insert_own" on public.tests;
create policy "tests_insert_own"
  on public.tests for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Enable insert for users based on user_id" on public.tests;
drop policy if exists "Enable users to view their own data only" on public.tests;
-- Redundante con tests_select_own, que ya incluye `or is_admin()`.
drop policy if exists "tests_select_admin" on public.tests;

-- Se re-declara de forma idempotente la que queda como única regla de lectura.
drop policy if exists "tests_select_own" on public.tests;
create policy "tests_select_own"
  on public.tests for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- 3. `contacto`: policy de dashboard_user sin uso
-- ---------------------------------------------------------------------------
-- "Enable read access for all users" está concedida al rol `dashboard_user`,
-- que es interno de Supabase (SQL Editor) y no se expone vía PostgREST con un
-- JWT de cliente. No era una fuga, pero confunde cualquier auditoría futura:
-- una policy llamada "for all users" con qual `true` sobre una tabla que guarda
-- datos de contacto. La regla real es `contacto_select_admin` (016), que queda.

drop policy if exists "Enable read access for all users" on public.contacto;

-- ---------------------------------------------------------------------------
-- 4. `notifications`: policy cuyo nombre miente
-- ---------------------------------------------------------------------------
-- `notifications_insert_admin` permite en realidad
-- `is_admin() OR user_id = auth.uid()`, es decir el usuario puede crearse
-- notificaciones a sí mismo. El comportamiento es deliberado y correcto (los
-- triggers de cupo insertan como el propio usuario), pero el nombre hacía
-- pensar lo contrario al auditar. Se renombra sin cambiar la condición.

drop policy if exists "notifications_insert_own_or_admin" on public.notifications;
create policy "notifications_insert_own_or_admin"
  on public.notifications for insert
  to authenticated
  with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "notifications_insert_admin" on public.notifications;

-- ---------------------------------------------------------------------------
-- 5. `visitor`: versionar la policy de INSERT público
-- ---------------------------------------------------------------------------
-- "Allow public insert" viene del dashboard. El insert anónimo es deliberado
-- (el tracker corre antes de cualquier login) y pasa por la función
-- `track_visitor` de 014, que es la que evita exponer la fila de vuelta.
-- Solo se le da un nombre versionado y consistente con el resto.

drop policy if exists "visitor_insert_public" on public.visitor;
create policy "visitor_insert_public"
  on public.visitor for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow public insert" on public.visitor;

-- ---------------------------------------------------------------------------
-- Fuera de alcance a propósito
-- ---------------------------------------------------------------------------
-- - `questions`: el agujero real. Va en 024 (RPC) + 025 (revocación), en ese
--   orden y con el bundle nuevo publicado en medio. Ver ADR-015.
-- - Segregación por banda: hoy `class_slots_select_open` + `enrollments_insert_own`
--   + `student_profiles_update_own` permiten a un estudiante reescribir su
--   propia banda e inscribirse en cualquier cupo. Es integridad de producto,
--   no fuga de datos, y exige decidir si θ pasa a calcularse en el servidor.
--   Registrado como tarea aparte, no se improvisa acá.
-- - DDL de `public.questions`: no existe en ninguna migración (001 solo le
--   agrega module_id). Un entorno nuevo no se puede reconstruir desde el repo.
--   Requiere una migración baseline propia.
