-- 085 · Cada rol tiene sobre cada tabla solo los verbos que su policy contempla (T-163)
-- ===========================================================================
-- La aplica el owner: `claude_ddl` no es dueño de ninguna tabla (ADR-040).
-- Requiere: nada. `084` va antes porque es la que cierra una lectura real;
-- esta es la segunda línea de defensa.
--
-- ── El problema ────────────────────────────────────────────────────────────
-- Ninguna migración de este repo escribió nunca un `grant` de tabla, así que
-- todas llevan los privilegios por defecto de Supabase: `anon` y
-- `authenticated` con `arwdDxt` (select, insert, update, delete, truncate,
-- references, trigger) en 18 de 21 relaciones de `public` (medido con
-- `pg_class.relacl` el 2026-09-23). Hoy la RLS filtra cada verbo que PostgREST
-- expone, y por eso no es explotable. Pero todo el esquema descansa en que
-- **toda** policy esté bien escrita, sin segunda línea: es ADR-040 al revés —
-- «el grant es la puerta, la policy es el límite».
--
-- La prueba de que no es teórico es `084`: un objeto nuevo sin RLS (una
-- vista) heredó esos mismos privilegios y quedó legible con la anon key.
--
-- ── El criterio, que es mecánico ───────────────────────────────────────────
-- A cada rol, exactamente los verbos para los que tiene alguna policy
-- (`pg_policies`, 2026-09-23). Una policy `ALL` son los cuatro verbos. Una
-- policy `to public` cubre también a `anon`.
--
-- Por qué no puede romper nada que hoy funcione: sin policy para un verbo, la
-- RLS **ya** lo bloquea, así que quitar el grant no cambia ningún resultado.
-- `truncate`, `references` y `trigger` no tienen policy posible y ningún
-- cliente los usa. Tres casos revisados a mano:
--   · `update`/`delete` exigen además `select` para leer el `where`: toda
--     tabla con esos verbos tiene policy de select, así que lo conserva.
--   · Los triggers que escriben en otra tabla (`notifications` → `email_outbox`,
--     `enrollments` → `class_slots`, `tests`/`intentos` → origen) son todos
--     `security definer`: no dependen de los privilegios de quien inserta.
--     Los tres que corren como invocador (`intentos_sellar`,
--     `normalize_topic_trigger`, `normalize_test_config_topics`) solo tocan `new`.
--   · `site_settings_update_admin` es `to public`, pero exige ser admin, que
--     `anon` nunca es: `anon` queda solo con `select`.
--
-- No toca ninguna policy, ningún dato ni los roles del agente. Idempotente:
-- `revoke` + `grant` dejan el mismo estado en la segunda pasada.
-- ===========================================================================

-- ── Tablas con datos personales primero (orden de T-163) ────────────────────

revoke all on public.tests from anon, authenticated;
grant select, insert on public.tests to authenticated;

revoke all on public.profiles from anon, authenticated;
grant select, update on public.profiles to authenticated;

revoke all on public.visitor from anon, authenticated;
grant insert on public.visitor to anon;
grant select, insert on public.visitor to authenticated;

revoke all on public.contacto from anon, authenticated;
grant insert on public.contacto to anon;
grant select, insert on public.contacto to authenticated;

revoke all on public.guestbook from anon, authenticated;
grant select, insert on public.guestbook to anon;
grant select, insert, update, delete on public.guestbook to authenticated;

revoke all on public.student_profiles from anon, authenticated;
grant select, insert, update on public.student_profiles to authenticated;

revoke all on public.enrollments from anon, authenticated;
grant select, insert, update on public.enrollments to authenticated;

revoke all on public.notifications from anon, authenticated;
grant select, insert, update on public.notifications to authenticated;

revoke all on public.email_outbox from anon, authenticated;
grant select, insert, update, delete on public.email_outbox to authenticated;

-- `questions`: hoy `anon=awdDxt` (sin select, con escritura), que no responde a
-- ninguna decisión escrita. Nadie sin sesión escribe el banco.
revoke all on public.questions from anon, authenticated;
grant select, insert, update, delete on public.questions to authenticated;

-- ── Contenido y configuración ───────────────────────────────────────────────

revoke all on public.modules from anon, authenticated;
grant select, insert, update, delete on public.modules to authenticated;

revoke all on public.module_prerequisites from anon, authenticated;
grant select, insert, update, delete on public.module_prerequisites to authenticated;

revoke all on public.misconceptions from anon, authenticated;
grant select, insert, update, delete on public.misconceptions to authenticated;

revoke all on public.resources from anon, authenticated;
grant select, insert, update, delete on public.resources to authenticated;

revoke all on public.resource_misconceptions from anon, authenticated;
grant select, insert, update, delete on public.resource_misconceptions to authenticated;

revoke all on public.test_configs from anon, authenticated;
grant select, insert, update, delete on public.test_configs to authenticated;

revoke all on public.class_slots from anon, authenticated;
grant select, insert, update, delete on public.class_slots to authenticated;

revoke all on public.site_settings from anon, authenticated;
grant select on public.site_settings to anon;
grant select, update on public.site_settings to authenticated;

-- `intentos` (070) y `cohortes` (080) ya nacieron con grants explícitos y
-- correctos (`arw` y `arwd`). Se repiten para que esta migración sea la única
-- fuente de la tabla completa, y no cambian nada.
revoke all on public.intentos from anon, authenticated;
grant select, insert, update on public.intentos to authenticated;

revoke all on public.cohortes from anon, authenticated;
grant select, insert, update, delete on public.cohortes to authenticated;

-- ── Lo que esta migración NO hace, y es decisión del owner ──────────────────
-- La causa de fondo son los privilegios por defecto del esquema. Cortarlos
-- obliga a que toda tabla nueva declare sus grants (falla cerrada en vez de
-- abierta), pero cambia cómo se escribe cada migración futura:
--
--   alter default privileges for role postgres in schema public
--     revoke all on tables from anon, authenticated;
--
-- No se incluye: es una regla de trabajo nueva, no una corrección.

-- ---------------------------------------------------------------------------
-- Verificación — después de aplicar
-- ---------------------------------------------------------------------------
-- ⚠️ Con `pg_class.relacl`, no con `information_schema`: la vista del esquema
-- de información solo muestra los grants del rol que consulta (T-163).
--
--   select c.relname,
--          (select string_agg(a::text, ' ') from unnest(c.relacl) a
--            where a::text ~ '^(anon|authenticated)=') as acl
--     from pg_class c join pg_namespace n on n.oid = c.relnamespace
--    where n.nspname = 'public' and c.relkind in ('r','v')
--    order by 1;
--
-- Esperado: ningún `D`, `x` ni `t`; `anon` solo en contacto (a), guestbook (ar),
-- site_settings (r) y visitor (a).
--
-- Y en vivo, el funnel entero una vez: visitar la landing (visitor), rendir un
-- diagnóstico (tests, intentos, student_profiles), abrir «Mi plan» (modules,
-- resources), inscribirse a un cupo (enrollments → notifications) y el panel
-- admin. Si algo falla con `permission denied for table X`, falta un verbo en X.
--
-- Reversión exacta al estado del 2026-09-23 (probada en PostgreSQL 17 desechable):
--   grant all on all tables in schema public to anon, authenticated;
--   revoke all on public.intentos, public.cohortes from anon, authenticated;
--   grant select, insert, update on public.intentos to authenticated;
--   grant select, insert, update, delete on public.cohortes to authenticated;
--   revoke select on public.questions from anon;
--   -- y volver a aplicar 084, que no debe revertirse.
