-- T-167 / T-79 · El rol `profesor` y la tabla `cohortes`.
--
-- PARA QUÉ. El 2026-09-21 el owner aplicó el sistema a dos cursos reales de
-- electrónica y habló con colegas de matemática que quieren usarlo. `/aula` ya
-- existe y funciona (T-133), pero solo la ve `:admin`: darle acceso a un colega
-- hoy significaría darle la cuenta de administrador, que puede editar el banco,
-- cambiar roles y leer los datos de todos.
--
-- ── ⭐ POR QUÉ ESTO NO NECESITA MULTI-TENANT (ADR-042 / D-74) ───────────────
-- La ficha de T-79 decía, con razón, que **el rol sin aislamiento es un
-- agujero**, y por eso dependía de T-81 (modelar establecimiento y curso), que
-- a su vez depende de Q-36, abierta desde el 2026-08-16.
--
-- La cohorte como **ventana de tiempo con dueño** rompe esa dependencia: el
-- aislamiento se escribe sobre la ventana, no sobre una jerarquía
-- institucional. La policy de abajo dice literalmente *«existe una cohorte mía
-- cuya ventana contiene esta fila»*, y eso es aislamiento real, verificable con
-- policies y no con la UI ([[../../CLAUDE]] §7).
--
-- Q-36 y T-81 siguen abiertas, y hacen falta el día que haya **dos colegios**.
-- Hoy no los hay.
--
-- ── QUÉ NECESITA LEER UN PROFESOR, MEDIDO Y NO SUPUESTO ────────────────────
-- **Solo `tests`.** Se verificó recorriendo el código de la sección:
-- `events/aula.cljs` hace una única consulta (`crud/fetch-tests-en-ventana`), y
-- el enunciado y las cuatro alternativas del «ítem con más errores» salen de
-- `tests.test -> 'questions'` —el JSON que el propio intento guardó—, **no de
-- la tabla `questions`**. La explicación de cada distractor sale del
-- `selected-error` de la respuesta.
--
-- Consecuencia: **no hace falta abrirle el banco de ítems a nadie**, ni por
-- policy ni por RPC. La tarea T-168, que proponía un `security definer` para
-- eso, queda sin objeto. Y `profiles` tampoco se toca: el correo del estudiante
-- viaja en `tests."email-user"`.
--
-- ── LO QUE ESTA MIGRACIÓN NO DECIDE ────────────────────────────────────────
-- **Quién crea las cohortes.** Lo decide la policy: `insert` solo para
-- `is_admin()`. Es deliberado y está en ADR-042: quien define la ventana define
-- lo que ve, así que un profesor con autoservicio podría escribir una ventana
-- que cubra la clase de un colega. Cuando exista T-81 esto se puede relajar.
--
-- ⚠️ **QUIÉN LA APLICA: el owner, no el agente.** El paso 2 hace
-- `alter table public.profiles`, y `profiles` es una tabla con datos personales
-- sobre la que `claude_ddl` no tiene poderes (ADR-040).
--
-- ⚠️ **ORDEN DE DESPLIEGUE (R-39): migración primero, bundle después.** El
-- cliente trae red propia —si `cohortes` no existe, el aula sigue funcionando
-- con la ventana escrita a mano y lo dice— pero sin la migración no hay rol ni
-- aislamiento.
--
-- ⚠️ **Y una precondición que no es técnica:** dar una cuenta a un colega es
-- dar acceso a datos de **menores de edad** a otra persona. [[../../project-memory/RISKS]]
-- R-28 pide cerrar F9 antes —respaldo (T-07), staging (T-09) y verificación
-- automatizada de RLS (T-11)—. Esta migración se puede aplicar igual: crea la
-- capacidad, no las cuentas. **Promover a alguien es la decisión separada.**
--
-- Es **aditiva** salvo por el check de `profiles.role`, que se reemplaza por uno
-- más permisivo (ningún valor existente deja de ser válido).

-- -----------------------------------------------------------------------------
-- 1. La tabla `cohortes`
-- -----------------------------------------------------------------------------
-- Una fila es **un curso mirado en una ventana de tiempo**: «3º B electrónica,
-- 21 de septiembre, 10:30 a 12:00». No es una tabla de cursos ni de matrículas:
-- no hay lista de estudiantes, porque la pertenencia se deriva de haber rendido
-- dentro de la ventana (ADR-042).
create table if not exists public.cohortes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  -- A quién pertenece. Es la columna sobre la que se escribe todo el
  -- aislamiento, y por eso es `not null`.
  profesor_id uuid not null references auth.users (id) on delete cascade,
  -- La ventana. `timestamptz` y no `date`: la clase es a una hora del reloj de
  -- la sala, y el borde del día en UTC cae en otro lado (medido: un intento de
  -- las 21:34 de Chile pertenece al día siguiente en UTC).
  desde timestamptz not null,
  hasta timestamptz not null,
  -- Familia de bancos, opcional: 'electronica' deja fuera lo que el estudiante
  -- haya rendido de otro track en esa misma hora.
  topic_prefijo text,
  creado_por uuid not null references auth.users (id),
  created_at timestamptz not null default now(),
  constraint cohortes_rango_valido check (hasta > desde),
  constraint cohortes_nombre_no_vacio check (length(btrim(nombre)) > 0)
);

comment on table public.cohortes is
  'Un curso mirado en una ventana de tiempo (ADR-042). No es una tabla de '
  'cursos: no tiene lista de estudiantes, porque la pertenencia se deriva de '
  'haber rendido dentro de [desde, hasta). `profesor_id` es la columna sobre la '
  'que se escribe el aislamiento de `tests_select_profesor`.';

comment on column public.cohortes.topic_prefijo is
  'Familia de bancos (`topic like prefijo || ''%''`), o NULL por todos. No es el '
  'banco exacto: elegir un banco concreto es una decisión de lectura del panel, '
  'no una propiedad del curso.';

create index if not exists cohortes_profesor_idx
  on public.cohortes (profesor_id);
-- La policy de `tests` pregunta «¿hay una cohorte mía que contenga este
-- instante?»: el índice útil es el del dueño más el rango.
create index if not exists cohortes_profesor_ventana_idx
  on public.cohortes (profesor_id, desde, hasta);

alter table public.cohortes enable row level security;

-- Lectura: el dueño y el admin. Nadie más, ni siquiera para saber que existe.
drop policy if exists "cohortes_select_propia" on public.cohortes;
create policy "cohortes_select_propia"
  on public.cohortes for select
  to authenticated
  using (profesor_id = auth.uid() or public.is_admin());

-- Escritura: **solo admin**. Ver la cabecera: quien define la ventana define lo
-- que ve.
drop policy if exists "cohortes_insert_admin" on public.cohortes;
create policy "cohortes_insert_admin"
  on public.cohortes for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "cohortes_update_admin" on public.cohortes;
create policy "cohortes_update_admin"
  on public.cohortes for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "cohortes_delete_admin" on public.cohortes;
create policy "cohortes_delete_admin"
  on public.cohortes for delete
  to authenticated
  using (public.is_admin());

-- Privilegios de tabla acotados al verbo que la policy contempla (T-163): sin
-- esto `anon` hereda DELETE y TRUNCATE como las otras 18 tablas (R-46).
revoke all on public.cohortes from anon;
revoke all on public.cohortes from authenticated;
grant select, insert, update, delete on public.cohortes to authenticated;

-- -----------------------------------------------------------------------------
-- 2. El rol `profesor`
-- -----------------------------------------------------------------------------
-- El check vigente en producción es
--   profiles_role_check CHECK (role = ANY (ARRAY['user','admin']))
-- y se reemplaza por uno que además admite 'profesor'. Ningún valor existente
-- deja de ser válido, así que no puede fallar por datos.
--
-- Se hace por nombre y no con `add constraint if not exists` porque PostgreSQL
-- no tiene esa forma: hay que soltar el viejo primero.
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('user', 'admin', 'profesor'));

comment on column public.profiles.role is
  '''user'' = estudiante · ''profesor'' = ve /aula, solo sus cohortes '
  '(T-79, ADR-042) · ''admin'' = todo. El rol NO es el control de acceso: lo son '
  'las policies. Ver CLAUDE.md §7.';

-- `public.es_profesor()`, hermana de `is_admin()` y con la misma receta:
-- `security definer` y `search_path` fijo, para que no dependa del search_path
-- de quien consulta ni de que pueda leer `profiles`.
create or replace function public.es_profesor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'profesor'
  );
$$;

revoke all on function public.es_profesor() from public;
grant execute on function public.es_profesor() to authenticated, anon;

-- -----------------------------------------------------------------------------
-- 3. Qué filas de `tests` ve un profesor
-- -----------------------------------------------------------------------------
-- ⭐ **Por qué una función y no un `exists` dentro de la policy.**
-- Un subconsulta a `cohortes` dentro de la policy se evalúa **con la RLS de
-- `cohortes` puesta**, así que la regla de `tests` pasaría a depender en
-- silencio de la policy de otra tabla: el día que alguien ajuste
-- `cohortes_select_propia`, esta regla se estrecha o se ensancha sin que nadie
-- toque `tests`. Con `security definer` la dependencia es explícita y vive en un
-- solo lugar.
--
-- Es el mismo criterio con el que `070` decidió no publicar una vista sobre
-- `intentos`, y la misma receta de `is_admin()`.
--
-- ⚠️ `origin = 'student'` va **dentro** de la regla, no en la consulta del
-- cliente: las corridas de depuración de un admin (`067`) no son de nadie, y un
-- profesor no tiene por qué verlas aunque caigan en su ventana.
create or replace function public.tests_en_mi_cohorte(
  p_created_at timestamptz,
  p_topic text,
  p_origin text
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select p_origin = 'student'
     and exists (
       select 1
         from public.cohortes c
        where c.profesor_id = auth.uid()
          and p_created_at >= c.desde
          and p_created_at <  c.hasta
          and (c.topic_prefijo is null
               or p_topic like c.topic_prefijo || '%')
     );
$$;

comment on function public.tests_en_mi_cohorte(timestamptz, text, text) is
  'true si la fila de `tests` cae dentro de alguna cohorte de quien consulta. '
  'El intervalo es [desde, hasta) — cerrado abajo y abierto arriba — para que '
  'dos clases consecutivas que comparten el borde no cuenten el mismo intento '
  'dos veces, igual que `universo.cohorte/en-ventana?` en el cliente.';

revoke all on function public.tests_en_mi_cohorte(timestamptz, text, text) from public;
grant execute on function public.tests_en_mi_cohorte(timestamptz, text, text)
  to authenticated;

-- Las policies permisivas se combinan con OR, así que ésta **se suma** a
-- `tests_select_own` (`023`) sin tocarla: el estudiante sigue viendo lo suyo y
-- el admin todo.
drop policy if exists "tests_select_profesor" on public.tests;
create policy "tests_select_profesor"
  on public.tests for select
  to authenticated
  using (public.tests_en_mi_cohorte(created_at, topic, origin));

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano después de aplicar; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- a) La tabla, su RLS y sus cuatro policies:
--      select relrowsecurity from pg_class where oid='public.cohortes'::regclass;
--        → esperado: t
--      select policyname, cmd from pg_policies where tablename='cohortes' order by 1;
--        → esperado: cohortes_delete_admin (DELETE), cohortes_insert_admin
--          (INSERT), cohortes_select_propia (SELECT), cohortes_update_admin (UPDATE)
--
-- b) `anon` no tiene nada sobre `cohortes` (R-46):
--      select grantee, privilege_type from information_schema.role_table_grants
--       where table_name='cohortes' order by 1,2;
--        → esperado: solo `authenticated` (y el rol de servidor), nunca `anon`
--
-- c) El rol nuevo se puede escribir y los viejos siguen valiendo:
--      select pg_get_constraintdef(oid) from pg_constraint
--       where conname='profiles_role_check';
--        → esperado: CHECK (role = ANY (ARRAY['user','admin','profesor']))
--
-- d) ⭐ El aislamiento, que es lo único que de verdad importa. Con una cuenta de
--    profesor de prueba y una cohorte suya que cubra una hora concreta:
--      select count(*) from public.tests;
--        → esperado: exactamente los de su ventana con origin='student'
--      select count(*) from public.tests
--       where created_at < (select desde from public.cohortes limit 1);
--        → esperado: 0
--      select count(*) from public.questions;   → esperado: 0 (no se le abrió)
--      select count(*) from public.profiles;    → esperado: 1 (solo el suyo)
--
-- e) Y que un profesor no pueda crearse cohortes:
--      insert into public.cohortes (nombre, profesor_id, desde, hasta, creado_por)
--      values ('trampa', auth.uid(), now() - interval '1 year', now(), auth.uid());
--        → esperado: new row violates row-level security policy
--
-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
-- drop policy if exists "tests_select_profesor" on public.tests;
-- drop function if exists public.tests_en_mi_cohorte(timestamptz, text, text);
-- drop function if exists public.es_profesor();
-- -- Antes de estrechar el check hay que sacar el rol de quien lo tenga:
-- update public.profiles set role = 'user' where role = 'profesor';
-- alter table public.profiles drop constraint if exists profiles_role_check;
-- alter table public.profiles add constraint profiles_role_check
--   check (role in ('user', 'admin'));
-- drop table if exists public.cohortes;
