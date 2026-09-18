-- Los dos roles con que un agente accede a la base: uno para MEDIR, otro para
-- APLICAR. Autorizado por el owner el 2026-09-18 — ver ADR-040 y CLAUDE.md §9.
--
-- Se pega entero en el SQL Editor. Es idempotente salvo las dos contraseñas,
-- que hay que poner a mano (una por parte) y que van a `.env`, nunca a Git.
--
--   PARTE 1 · `claude_ro`   solo lectura. Es el default y se usa siempre.
--   PARTE 2 · `claude_ddl`  aplica migraciones, solo cuando el owner lo pide.
--
-- ── Por qué DOS roles y no uno con todo ──────────────────────────────────────
--
--  1. **El default tiene que ser no poder.** Medir el banco es lo que se hace
--     todo el tiempo; aplicar una migración es un acto puntual y autorizado.
--     Que compartan credencial borra esa diferencia.
--  2. `CLAUDE.md` §7.1: **RLS es el único límite de autorización.** Lo coherente
--     es que el acceso del agente se exprese como policies, igual que el de
--     cualquier otro. La parte 1 es esa expresión.
--  3. La base tiene **datos de estudiantes reales de un 4º medio**, más emails,
--     IP y ciudad. R-28 dice que con datos de menores eso deja de ser buena
--     práctica y pasa a ser requisito contractual. Medir el banco **no necesita
--     ver nada de eso**, así que `claude_ro` no lo ve — y como es el rol del día
--     a día, esas tablas quedan fuera del alcance por defecto.
--
-- ── Qué puede y qué no `claude_ro` ───────────────────────────────────────────
--
--   PUEDE  select sobre el contenido: modules, questions, misconceptions,
--          resources, test_configs, module_prerequisites, resource_misconceptions.
--   PUEDE  select sobre `tests`, que es donde vive la evidencia para calibrar
--          (G-2) — sin `profiles`, así que no puede poner nombre a ningún θ.
--   NO PUEDE  insert / update / delete / ddl en ninguna tabla.
--   NO VE     profiles · visitor · contacto · guestbook · enrollments ·
--             notifications · email_outbox · student_profiles · class_slots
--             (emails, IP, ciudad, user-agent, batería, inscripciones).
--
-- ── Reversión ────────────────────────────────────────────────────────────────
--   Al pie del archivo. Revocar el acceso es una sola sentencia.

-- =============================================================================
-- PARTE 1 · `claude_ro` — medir sin poder tocar
-- =============================================================================
-- -----------------------------------------------------------------------------
-- ⚠️ CAMBIÁ LA CONTRASEÑA antes de ejecutar, y guardala en `.env`, NUNCA en Git.
--    Generá una larga y al azar (por ejemplo: openssl rand -base64 32).

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'claude_ro') then
    create role claude_ro with login password 'PONE-UNA-CONTRASENA-LARGA-ACA' nocreatedb nocreaterole noinherit;
  end if;
end $$;

-- Sin privilegios heredados de nada: lo que pueda hacer está escrito abajo.
grant usage on schema public to claude_ro;

-- ⚠️ `grant usage` NO alcanza, y esto se descubrió probándolo (2026-09-18):
-- el rol podía **crear tablas** en `public`. No porque se le diera permiso, sino
-- porque PostgreSQL ≤ 14 le regala `CREATE` en el esquema `public` al rol
-- `PUBLIC`, y eso alcanza a todo rol nuevo. Se ve en el ACL del esquema como un
-- grantee vacío con `UC`:  `=UC/postgres`  (en PG 15+ ya viene como `=U/postgres`).
--
-- Un rol «de solo lectura» que crea tablas no es de solo lectura, así que se
-- quita. Es seguro en Supabase: `postgres`, `supabase_admin` y los roles del
-- servicio tienen su propio grant explícito y no dependen del de `PUBLIC`.
-- Si tu instancia es PG 15+, esta sentencia no cambia nada y es inofensiva.
revoke create on schema public from public;

-- -----------------------------------------------------------------------------
-- 1. SELECT, y solo select, sobre las tablas de contenido
-- -----------------------------------------------------------------------------
-- Enumeradas una por una a propósito. `grant select on all tables` incluiría
-- `profiles` y `visitor`, y además volvería a incluir cualquier tabla nueva que
-- alguien cree después sin pensar en esto.

grant select on public.modules                 to claude_ro;
grant select on public.questions               to claude_ro;
grant select on public.misconceptions          to claude_ro;
grant select on public.resources               to claude_ro;
grant select on public.test_configs            to claude_ro;
grant select on public.module_prerequisites    to claude_ro;
grant select on public.resource_misconceptions to claude_ro;
grant select on public.tests                   to claude_ro;

-- -----------------------------------------------------------------------------
-- 2. RLS: las policies que hacen que esos select devuelvan filas
-- -----------------------------------------------------------------------------
-- Sin esto el rol se conecta, tiene el grant, y **lee cero filas en silencio**:
-- las policies existentes están escritas `to authenticated`, y `claude_ro` no lo
-- es. Es el mismo modo de fallo de un `module_id` en null — nada falla, no hay
-- datos. Por eso el acceso se declara acá y no se deduce del grant.

drop policy if exists "claude_ro_lectura" on public.modules;
create policy "claude_ro_lectura" on public.modules
  for select to claude_ro using (true);

drop policy if exists "claude_ro_lectura" on public.questions;
create policy "claude_ro_lectura" on public.questions
  for select to claude_ro using (true);

drop policy if exists "claude_ro_lectura" on public.misconceptions;
create policy "claude_ro_lectura" on public.misconceptions
  for select to claude_ro using (true);

drop policy if exists "claude_ro_lectura" on public.resources;
create policy "claude_ro_lectura" on public.resources
  for select to claude_ro using (true);

drop policy if exists "claude_ro_lectura" on public.test_configs;
create policy "claude_ro_lectura" on public.test_configs
  for select to claude_ro using (true);

drop policy if exists "claude_ro_lectura" on public.module_prerequisites;
create policy "claude_ro_lectura" on public.module_prerequisites
  for select to claude_ro using (true);

drop policy if exists "claude_ro_lectura" on public.resource_misconceptions;
create policy "claude_ro_lectura" on public.resource_misconceptions
  for select to claude_ro using (true);

-- `tests` es el caso que hay que mirar con cuidado: es la evidencia que G-2
-- necesita y **no tiene email ni nombre** — solo `user_id`, que es un uuid de
-- `auth.users`, tabla a la que este rol no tiene ningún acceso. O sea que puede
-- decir «el estudiante 3f2a… quedó en θ = -3,00» y no puede saber quién es.
drop policy if exists "claude_ro_lectura" on public.tests;
create policy "claude_ro_lectura" on public.tests
  for select to claude_ro using (true);

-- -----------------------------------------------------------------------------
-- 3. Que una tabla nueva NO quede expuesta sola
-- -----------------------------------------------------------------------------
-- Lo contrario del default de `alter default privileges`: acá se quiere que una
-- tabla nueva nazca invisible para este rol, y que exponerla sea una decisión
-- escrita en este archivo. No hace falta ninguna sentencia — se consigue por
-- omisión, y se deja dicho para que nadie agregue un `grant ... on all tables`
-- «para no tener que volver acá». Volver acá es el punto.

-- -----------------------------------------------------------------------------
-- Verificación (correr después, con el rol ya creado)
-- -----------------------------------------------------------------------------
--   -- Qué puede tocar, y con qué privilegio. Esperado: 8 filas, todas SELECT.
--   select table_name, privilege_type
--     from information_schema.role_table_grants
--    where grantee = 'claude_ro'
--    order by table_name, privilege_type;
--
--   -- Que NO pueda ver lo que no debe. Esperado: 0 filas.
--   select table_name from information_schema.role_table_grants
--    where grantee = 'claude_ro'
--      and table_name in ('profiles','visitor','contacto','guestbook',
--                         'enrollments','notifications','email_outbox',
--                         'student_profiles','class_slots');
--
--   -- Y desde psql con la cadena del rol, que las policies funcionen:
--   --   select count(*) from questions;   -- debe devolver el banco entero
--   --   select count(*) from profiles;    -- debe fallar con «permission denied»
--   --   insert into questions (topic) values ('x');  -- debe fallar
--
-- -----------------------------------------------------------------------------
-- Reversión completa
-- -----------------------------------------------------------------------------
--   drop policy if exists "claude_ro_lectura" on public.modules;
--   drop policy if exists "claude_ro_lectura" on public.questions;
--   drop policy if exists "claude_ro_lectura" on public.misconceptions;
--   drop policy if exists "claude_ro_lectura" on public.resources;
--   drop policy if exists "claude_ro_lectura" on public.test_configs;
--   drop policy if exists "claude_ro_lectura" on public.module_prerequisites;
--   drop policy if exists "claude_ro_lectura" on public.resource_misconceptions;
--   drop policy if exists "claude_ro_lectura" on public.tests;
--   revoke all on all tables in schema public from claude_ro;
--   revoke usage on schema public from claude_ro;
--   drop role claude_ro;
--
-- Y si solo querés cortar el acceso sin borrar nada:
--   alter role claude_ro nologin;

-- =============================================================================
-- PARTE 2 · `claude_ddl` — aplicar migraciones bajo autorización explícita
-- =============================================================================
-- Autorizado por el owner el 2026-09-18. Ver ADR-040 y CLAUDE.md §9, que se
-- corrigieron en el mismo commit: hasta esa fecha la regla escrita era «las
-- migraciones se aplican a mano» y no podía quedar un archivo diciendo una cosa
-- y otro la contraria.
--
-- ── Lo que este rol es, dicho con precisión ─────────────────────────────────
--
-- **No es una contención técnica, es una separación de flujo de trabajo.** Para
-- aplicar una migración hay que poder `alter` tablas que son de `postgres`, y
-- eso exige derechos de dueño: por eso `claude_ddl` es **miembro de `postgres`**
-- y puede, en la práctica, lo mismo que `postgres`.
--
-- Lo que sí consigue, y por eso existe separado de `claude_ro`:
--
--   · **el default es no poder.** La cadena que el agente usa siempre es la de
--     `claude_ro`. La de `claude_ddl` vive en otra variable de entorno y solo se
--     usa cuando el owner lo pide para una migración concreta.
--   · **deja rastro.** Lo que aplicó este rol es distinguible de lo que aplicó
--     una persona desde el SQL Editor — es el mismo argumento de `067`/`origin`,
--     que midió que el 20 % de la muestra era depuración del owner (R-37).
--   · **se apaga con una sentencia** (`alter role claude_ddl nologin`) sin tocar
--     el acceso de lectura ni el de nadie más.
--
-- ── La seguridad real no está acá, está en el procedimiento ─────────────────
--
--   1. **Toda migración se verifica primero contra un PostgreSQL desechable**
--      con el esquema real, incluida una segunda pasada para probar
--      idempotencia. Es lo que se hizo con `061`, `062`–`066` y `068`/`069`, y
--      lo que encontró dos defectos en `068` que ningún script vio.
--   2. **Migración antes que bundle, siempre** (R-39, materializado dos veces).
--   3. **Toda migración trae su reversión escrita** antes de aplicarse.
--   4. **Nada destructivo sin confirmación explícita en el momento**: `drop`,
--      `truncate`, `delete` sin `where`, o cualquier cosa sobre las tablas con
--      datos personales. Un `update` masivo del banco cuenta como destructivo.
--   5. **El histórico de `tests` no se reescribe.** Es evidencia y es el
--      producto que G-4 promete.

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'claude_ddl') then
    create role claude_ddl with login password 'OTRA-CONTRASENA-LARGA-Y-DISTINTA' nocreatedb nocreaterole;
  end if;
end $$;

-- Derechos de dueño, que es lo que `alter table` exige. `noinherit` no: acá se
-- quiere que los herede al conectarse, porque el objetivo es poder aplicar.
grant postgres to claude_ddl;

-- -----------------------------------------------------------------------------
-- Verificación de la parte 2
-- -----------------------------------------------------------------------------
--   -- Que exista y pueda entrar:
--   select rolname, rolcanlogin, rolsuper, rolcreaterole, rolcreatedb
--     from pg_roles where rolname in ('claude_ro','claude_ddl');
--   -- esperado: los dos con login; NINGUNO superuser, createrole ni createdb.
--
--   -- Quién es miembro de postgres (debe aparecer claude_ddl, y nadie más nuevo):
--   select r.rolname as miembro
--     from pg_auth_members m
--     join pg_roles r on r.oid = m.member
--     join pg_roles g on g.oid = m.roleid
--    where g.rolname = 'postgres';
--
-- Apagar SOLO la escritura, dejando la lectura intacta:
--   alter role claude_ddl nologin;
--
-- Reversión completa de la parte 2:
--   revoke postgres from claude_ddl;
--   drop role claude_ddl;
