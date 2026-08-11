-- Verificación del esquema real contra lo que afirma el repositorio.
--
-- ⚠ SOLO LECTURA. No crea, no modifica, no borra. Se pega en el SQL Editor de
-- Supabase y se corre de a un bloque.
--
-- PARA QUÉ: `supabase/SCHEMA.md` es prosa mantenida a mano y las migraciones se
-- aplican a mano, sin `db push` y sin staging (R-02). Nada garantiza que la
-- base sea lo que el repo dice. Hay precedente: la auditoría de T-47
-- (2026-08-09) encontró **ocho policies creadas desde el dashboard** que el
-- repo no conocía, y una de ellas —`"Enable read access for all users"` sobre
-- `questions`— dejaba 387 preguntas con su respuesta correcta legibles por
-- cualquier cuenta gratuita.
--
-- Correr esto después de cada tanda de migraciones, y ante cualquier duda.
-- El bloque H sirve además para cerrar T-48 (versionar el DDL real).

-- ===========================================================================
-- A. Inventario: qué tablas existen, con RLS y tamaño aproximado
-- ===========================================================================
-- Esperado al 2026-08-10: 16 tablas, TODAS con rls = true.
--   profiles · questions · tests · guestbook · visitor · contacto
--   modules · student_profiles · resources · misconceptions
--   class_slots · enrollments · notifications · email_outbox · test_configs
-- (`dashboard` fue eliminada en `023`; si reaparece, alguien la recreó.)
select c.relname                                as tabla,
       c.relrowsecurity                         as rls_activo,
       (select count(*) from pg_policies p
         where p.schemaname = 'public' and p.tablename = c.relname) as policies,
       coalesce(s.n_live_tup, 0)                as filas_aprox
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
left join pg_stat_user_tables s on s.relname = c.relname and s.schemaname = 'public'
where n.nspname = 'public' and c.relkind = 'r'
order by c.relname;

-- ===========================================================================
-- B. ⭐ SEMÁFORO DE SEGURIDAD — el bloque que más importa
-- ===========================================================================
-- RLS es el ÚNICO límite de autorización del proyecto (ADR-002, R-14), y falla
-- de dos formas opuestas, las dos silenciosas:
--   · sin RLS            → la tabla es pública vía la API. Incidente de datos.
--   · RLS sin policies   → nadie puede leerla ni escribirla. El producto se
--                          rompe "sin error": Postgres devuelve 0 filas.
-- Lo esperado es que esta consulta devuelva CERO filas.
select c.relname as tabla,
       case when not c.relrowsecurity then '🔴 SIN RLS — expuesta vía API'
            else '🟠 RLS activo pero SIN NINGUNA POLICY — nadie puede acceder'
       end as problema
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r'
  and (not c.relrowsecurity
       or not exists (select 1 from pg_policies p
                       where p.schemaname = 'public' and p.tablename = c.relname))
order by c.relrowsecurity, c.relname;

-- Policies permisivas de más: `using (true)` sin condición es lo que produjo
-- el incidente de T-47. Revisar una por una que sean intencionales (en
-- `resources` y `modules` puede ser legítimo: son catálogo público).
select tablename as tabla, policyname as policy, cmd as operacion, roles,
       qual as condicion_lectura, with_check as condicion_escritura
from pg_policies
where schemaname = 'public'
  and (qual in ('true', '(true)') or with_check in ('true', '(true)'))
order by tablename, policyname;

-- Inventario completo de policies, para comparar contra las migraciones.
-- Si aparece una que no está en ningún archivo de `supabase/migrations/`,
-- se creó desde el dashboard y hay que versionarla (regla fijada en `023`).
select tablename as tabla, policyname as policy, cmd as operacion, roles
from pg_policies
where schemaname = 'public'
order by tablename, cmd, policyname;

-- ===========================================================================
-- C. ¿Llegaron realmente las columnas que agregó cada migración?
-- ===========================================================================
-- Es el check que faltó el 2026-08-08 y costó dos días de creer que
-- `test_configs.display_name` no existía cuando sí existía.
-- Devuelve solo lo que FALTA: lo esperado es cero filas.
with esperado (tabla, columna, migracion) as (values
  ('questions',        'module_id',              '001'),
  ('questions',        'topic',                  'preexistente'),
  ('questions',        'difficulty',             'preexistente'),
  ('questions',        'misconception_a_id',     '027'),
  ('questions',        'misconception_d_id',     '027'),
  ('profiles',         'role',                   'admin_rls'),
  ('profiles',         'full_name',              '010'),
  ('profiles',         'phone',                  '010'),
  ('profiles',         'contact_preference',     '013'),
  ('tests',            'topic',                  '021'),
  ('tests',            'theta',                  '021'),
  ('tests',            'test',                   'preexistente'),
  ('test_configs',     'min_items',              '020'),
  ('test_configs',     'max_minutes',            '020'),
  ('test_configs',     'prerequisite_topic',     '020'),
  ('test_configs',     'display_name',           '022'),
  ('test_configs',     'min_response_seconds',   '028'),
  ('misconceptions',   'slug',                   '027'),
  ('misconceptions',   'module_id',              '027'),
  ('modules',          'slug',                   '001'),
  ('modules',          'historical_blurb',       '001'),
  ('resources',        'published',              '001'),
  ('class_slots',      'capacity',               '001'),
  ('class_slots',      'min_enrollments',        '001'),
  ('class_slots',      'theta_band',             '001'),
  ('student_profiles', 'theta_band',             '001'),
  ('student_profiles', 'profile',                '001'),
  ('email_outbox',     'status',                 '005'),
  ('guestbook',        'id_visitor',             'preexistente'),
  ('contacto',         'id_visitor',             '017')
)
select e.tabla, e.columna, e.migracion as agregada_por, '❌ FALTA' as estado
from esperado e
left join information_schema.columns c
  on c.table_schema = 'public' and c.table_name = e.tabla and c.column_name = e.columna
where c.column_name is null
order by e.migracion, e.tabla, e.columna;

-- ===========================================================================
-- D. Funciones y triggers: las invariantes que impone la base
-- ===========================================================================
-- El cliente no puede garantizar ninguna de estas. Si falta un trigger, la
-- regla desaparece sin que nada falle: se descubre cuando ya pasó.
-- Devuelve solo lo que FALTA.
with esperado (nombre, tipo, que_garantiza) as (values
  ('is_admin',                    'función', 'Base de toda policy de admin'),
  ('normalize_topic',             'función', 'Topic canónico (ADR-017, 029)'),
  ('next_question',               'función', 'Sirve el ítem SIN respuesta (ADR-015, 024)'),
  ('score_answer',                'función', 'Corrige en el servidor (ADR-015, 024/026)'),
  ('track_visitor',               'función', 'Inserta visitante sin exponer la fila (014)'),
  ('questions_normalize_topic',   'trigger', 'Topic canónico al cargar ítems (029)'),
  ('tests_normalize_topic',       'trigger', 'Topic canónico en el historial (029)'),
  ('test_configs_normalize_topics','trigger','Topic y prerequisito canónicos (029)'),
  ('profiles_protect_last_admin', 'trigger', 'No quedarse sin ningún admin (006)')
)
select e.nombre, e.tipo, e.que_garantiza, '❌ FALTA' as estado
from esperado e
where (e.tipo = 'función' and not exists (
         select 1 from pg_proc p join pg_namespace n on n.oid = p.pronamespace
          where n.nspname = 'public' and p.proname = e.nombre))
   or (e.tipo = 'trigger' and not exists (
         select 1 from pg_trigger t where not t.tgisinternal and t.tgname = e.nombre));

-- Todos los triggers que existen, para ver también los que NO están en la
-- lista de arriba (los de confirmación de cupo y capacidad tienen nombres
-- propios que conviene revisar a ojo).
select c.relname as tabla, t.tgname as trigger, p.proname as funcion
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
join pg_namespace n on n.oid = c.relnamespace
join pg_proc p on p.oid = t.tgfoid
where not t.tgisinternal and n.nspname = 'public'
order by c.relname, t.tgname;

-- ===========================================================================
-- E. Integridad referencial: huérfanos que las FK no atrapan
-- ===========================================================================
-- Lo esperado es cero filas en todo el bloque.
select 'questions.module_id apunta a un módulo inexistente' as problema, count(*) as filas
from public.questions q
where q.module_id is not null
  and not exists (select 1 from public.modules m where m.id = q.module_id)
union all
select 'enrollments sin cupo', count(*)
from public.enrollments e
where not exists (select 1 from public.class_slots s where s.id = e.slot_id)
union all
select 'resources sin módulo', count(*)
from public.resources r
where r.module_id is not null
  and not exists (select 1 from public.modules m where m.id = r.module_id)
union all
select 'test_configs con prerequisito inexistente', count(*)
from public.test_configs tc
where tc.prerequisite_topic is not null
  and not exists (select 1 from public.test_configs x where x.topic = tc.prerequisite_topic);

-- ===========================================================================
-- F. Invariantes de datos que la memoria del proyecto afirma
-- ===========================================================================
-- Cada fila trae lo esperado al lado. Si no coincide, o cambió la realidad o
-- la memoria quedó desactualizada — y hay que corregir una de las dos.
select 'módulos'                        as dato,
       (select count(*) from public.modules)::text                        as valor,
       '20 (18 de 002 + 2 de 031)'                                        as esperado
union all
select 'preguntas en el banco',
       (select count(*) from public.questions)::text, '387'
union all
select 'preguntas sin module_id',
       (select count(*) from public.questions where module_id is null)::text,
       '128 (solo diagnostico y paes_m1 — T-60)'
union all
select 'topics fuera de forma canónica',
       (select count(*) from public.questions
         where public.normalize_topic(topic) is distinct from topic)::text, '0'
union all
select 'recursos publicados',
       (select count(*) filter (where published) || ' de ' || count(*)
          from public.resources), '58 de 61'
union all
select 'administradores',
       (select count(*) from public.profiles where role = 'admin')::text,
       '≥ 1 (si es 0, nadie puede administrar)'
union all
select 'misconceptions catalogadas',
       (select count(*) from public.misconceptions)::text,
       '0 por ahora (027 se creó vacía a propósito)'
union all
select 'piso de esfuerzo por defecto',
       (select distinct min_response_seconds::text from public.test_configs
         order by 1 limit 1), '2 (calibrado en 032)'
union all
select 'cupos que superan su capacidad',
       (select count(*) from public.class_slots s
         where (select count(*) from public.enrollments e
                 where e.slot_id = s.id and e.status in ('pending','confirmed'))
               > s.capacity)::text, '0 (lo impide el trigger de 011)';

-- ===========================================================================
-- G. ⭐ Para cerrar T-48: volcado del DDL real
-- ===========================================================================
-- `public.questions`, `public.profiles` y `public.is_admin()` PREEXISTEN a las
-- migraciones versionadas: aplicar 001…032 sobre una base vacía NO reproduce
-- producción, y hoy no hay forma de recrear el proyecto desde el repositorio.
--
-- El resultado de estas dos consultas es exactamente lo que falta para
-- escribir `000_baseline.sql`. Pegar la salida y se puede versionar.
select table_name    as tabla,
       ordinal_position as pos,
       column_name   as columna,
       data_type     as tipo,
       character_maximum_length as largo,
       is_nullable   as acepta_null,
       column_default as valor_por_defecto
from information_schema.columns
where table_schema = 'public'
  and table_name in ('questions', 'profiles', 'tests', 'guestbook', 'visitor', 'contacto')
order by table_name, ordinal_position;

-- Restricciones (PK, FK, unique, check) de esas mismas tablas.
select rel.relname as tabla,
       con.conname as restriccion,
       case con.contype when 'p' then 'PRIMARY KEY'
                        when 'f' then 'FOREIGN KEY'
                        when 'u' then 'UNIQUE'
                        when 'c' then 'CHECK'
                        else con.contype::text end as tipo,
       pg_get_constraintdef(con.oid) as definicion
from pg_constraint con
join pg_class rel on rel.oid = con.conrelid
join pg_namespace n on n.oid = rel.relnamespace
where n.nspname = 'public'
  and rel.relname in ('questions', 'profiles', 'tests', 'guestbook', 'visitor', 'contacto')
order by rel.relname, con.contype, con.conname;

-- Y el cuerpo de las funciones, que tampoco está versionado en el caso de
-- `is_admin()`.
select p.proname as funcion, pg_get_functiondef(p.oid) as definicion
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('is_admin', 'normalize_topic', 'next_question',
                    'score_answer', 'track_visitor')
order by p.proname;
