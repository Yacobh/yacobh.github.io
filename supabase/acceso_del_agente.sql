-- Los dos roles con que un agente accede a la base: uno para MEDIR, otro para
-- APLICAR. Autorizado por el owner el 2026-09-18 — ver ADR-040 y CLAUDE.md §9.
--
-- Se pega entero en el SQL Editor. Es idempotente salvo las dos contraseñas,
-- que hay que poner a mano (una por parte) y que van a `.env`, nunca a Git.
--
--   PARTE 1 · `claude_ro`   solo lectura. Es el default y se usa siempre.
--   PARTE 2 · `claude_ddl`  aplica migraciones de CONTENIDO, cuando el owner lo pide.
--                           Las de ESQUEMA (alter table) siguen siendo del owner.
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
--    Generá una larga y al azar con `openssl rand -hex 32`. **No uses `-base64 32`**:
--    mete `/` y `=`, que después hay que percent-encodear en la URL de `.env` (2026-09-18).

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
-- PARTE 2 · `claude_ddl` — aplicar migraciones de CONTENIDO
-- =============================================================================
-- Autorizado por el owner el 2026-09-18. Ver ADR-040 y CLAUDE.md §9.
--
-- ⚠️ HISTORIAL, porque la primera versión de este archivo NO FUNCIONÓ y el error
--    vale más que el arreglo. Decía `grant postgres to claude_ddl`, y el SQL
--    Editor respondió:
--
--      ERROR: 42501: permission denied to grant role "postgres"
--      DETAIL: Only roles with the ADMIN option on role "postgres" may grant this role.
--
--    En PostgreSQL 16+ otorgar un rol exige ADMIN OPTION sobre él, y el
--    `postgres` de Supabase **no lo tiene sobre sí mismo** — el superusuario es
--    `supabase_admin`, al que el SQL Editor no llega. O sea que darle a un rol
--    los derechos de dueño **no se puede desde acá**, y eso resultó ser una
--    buena noticia: obligó a una versión con un límite técnico de verdad en vez
--    de una separación de flujo de trabajo.
--
-- ── Qué puede y qué no, medido ──────────────────────────────────────────────
--
--   PUEDE  insert/update/delete sobre las siete tablas de contenido, y crear
--          funciones y tablas nuevas. O sea **las migraciones de contenido**:
--          ítems (`068`, `069`), ideas erróneas, módulos, recursos, filas de
--          `test_configs` y las aristas de `module_prerequisites`.
--   NO PUEDE  `alter table` ni `drop table` sobre lo que ya existe: eso exige
--          ser dueño, y no lo es. **Las migraciones de ESQUEMA siguen siendo del
--          owner** — entre ellas las de ADR-038 y ADR-039, que agregan columnas.
--   NO VE  ninguna tabla con datos personales.
--
--   Ese corte no es arbitrario: separa **agregar contenido**, que es reversible
--   con un `delete` y que el banco hace todas las semanas, de **cambiar la forma
--   de la base**, que es donde un error cuesta caro y donde conviene que haya
--   una persona leyendo.
--
-- ── La seguridad real sigue estando en el procedimiento ─────────────────────
--
--   1. **Toda migración se verifica primero contra un PostgreSQL desechable**
--      con el esquema real, más una segunda pasada que prueba idempotencia.
--      Es lo que encontró en `068` dos ítems que no diagnosticaban nada y dos
--      falsos positivos por comparar `real` con `numeric`.
--   2. **Migración antes que bundle, siempre** (R-39, materializado dos veces).
--   3. **Reversión escrita** antes de aplicar.
--   4. **Nada destructivo sin confirmación en el momento**: `delete` sin
--      `where`, o un `update` masivo del banco, cuentan como destructivos
--      aunque este rol pueda hacerlos.
--   5. **El histórico de `tests` no se reescribe**: es evidencia, y es lo que
--      G-4 promete. Por eso acá `tests` es **solo lectura**.

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'claude_ddl') then
    create role claude_ddl with login password 'OTRA-CONTRASENA-LARGA-Y-DISTINTA' nocreatedb nocreaterole;
  end if;
end $$;

grant usage, create on schema public to claude_ddl;

-- Las siete tablas de contenido, enumeradas por la misma razón que en la parte 1.
grant select, insert, update, delete on
  public.modules, public.questions, public.misconceptions, public.resources,
  public.test_configs, public.module_prerequisites, public.resource_misconceptions
  to claude_ddl;

-- `questions.id` es `bigserial`: sin esto, el `insert` falla por la secuencia.
grant usage on all sequences in schema public to claude_ddl;

-- `tests` SOLO LECTURA, a propósito (regla 5).
grant select on public.tests to claude_ddl;

-- -----------------------------------------------------------------------------
-- RLS, otra vez: sin policy el grant no alcanza
-- -----------------------------------------------------------------------------
-- Medido el 2026-09-18: con los grants de arriba y sin policy, el insert falla
-- con `new row violates row-level security policy`. Es el mismo hallazgo que en
-- la parte 1 pero del lado de la escritura, y es `CLAUDE.md` §7.1 en acción:
-- **la policy es el límite real, el grant es solo la puerta.**

do $$
declare t text;
begin
  foreach t in array array['modules','questions','misconceptions','resources',
                           'test_configs','module_prerequisites','resource_misconceptions']
  loop
    execute format('drop policy if exists "claude_ddl_escritura" on public.%I', t);
    execute format('create policy "claude_ddl_escritura" on public.%I for all to claude_ddl using (true) with check (true)', t);
  end loop;
end $$;

-- `tests`: lectura y nada más.
drop policy if exists "claude_ddl_lectura" on public.tests;
create policy "claude_ddl_lectura" on public.tests
  for select to claude_ddl using (true);

-- -----------------------------------------------------------------------------
-- Verificación de la parte 2 (probada contra PostgreSQL 14.18 el 2026-09-18)
-- -----------------------------------------------------------------------------
--   select rolname, rolcanlogin, rolsuper, rolcreaterole, rolcreatedb
--     from pg_roles where rolname in ('claude_ro','claude_ddl');
--   -- los dos con login; NINGUNO superuser, createrole ni createdb.
--
--   Y desde psql con la cadena de claude_ddl:
--     insert into questions (topic, difficulty) values ('zz', 0);  -- debe PODER
--     alter table questions add column zz int;    -- debe fallar: «must be owner»
--     select count(*) from profiles;              -- debe fallar: «permission denied»
--     delete from questions where topic = 'zz';   -- limpiar la prueba
--
-- Apagar SOLO la escritura, dejando la lectura intacta:
--   alter role claude_ddl nologin;
--
-- Reversión completa de la parte 2:
--   do $$ declare t text; begin
--     foreach t in array array['modules','questions','misconceptions','resources',
--                              'test_configs','module_prerequisites','resource_misconceptions']
--     loop execute format('drop policy if exists "claude_ddl_escritura" on public.%I', t); end loop;
--   end $$;
--   drop policy if exists "claude_ddl_lectura" on public.tests;
--   revoke all on all tables in schema public from claude_ddl;
--   revoke all on all sequences in schema public from claude_ddl;
--   revoke all on schema public from claude_ddl;
--   drop role claude_ddl;
