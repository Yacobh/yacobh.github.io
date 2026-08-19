-- Los dos puentes que le faltan al escape del estudiante para tener destino, y
-- que de paso son el dato del mapa de prerrequisitos.
--
-- Contexto: `universo.irt.escape` registra que un estudiante declaró «no sé».
-- Hoy ese evento no puede resolverse a nada concreto, porque los dos caminos
-- que debería tomar están cortados:
--
--   1. «no sé RESOLVERLO» → hace falta saber qué módulo va ANTES del módulo del
--      ítem. Los prerrequisitos existen, pero entre *tests*
--      (`test_configs.prerequisite_topic`, una cadena lineal por topic que sirve
--      para desbloquear evaluaciones). No hay prerrequisitos entre MÓDULOS.
--   2. una alternativa incorrecta → hace falta ir de la idea errónea concreta al
--      material concreto. `resources` solo tiene `module_id`, y un módulo agrupa
--      muchos recursos y muchas misconceptions: por eso la capa 1 de «Mi plan»
--      es genérica, lo es estructuralmente.
--
-- ESTA MIGRACIÓN ES PURAMENTE ADITIVA E IDEMPOTENTE (L-12, R-02): crea dos
-- tablas vacías y una columna nullable. No mueve ningún dato, no cambia el
-- comportamiento de la app —nada la lee todavía— y se revierte borrando lo que
-- crea. Se puede aplicar en cualquier momento.
--
-- ⚠ SIN SEED, A PROPÓSITO. El grafo de prerrequisitos entre los 20 módulos es
-- una decisión PEDAGÓGICA del profesor, no una que pueda deducirse del código ni
-- inventarse desde fuera. Queda registrada como pregunta abierta en
-- project-memory/OPEN_QUESTIONS; sembrarla con un orden plausible pero no
-- decidido sería exactamente lo que AGENT_INSTRUCTIONS §0.2 prohíbe.

-- ---------------------------------------------------------------------------
-- module_prerequisites: el grafo entre módulos
-- ---------------------------------------------------------------------------
-- 20 módulos con slug `track/modulo`, así que el grafo es chico y cabe en la
-- cabeza. Es un DAG dirigido: `module_id` requiere `prerequisite_module_id`.

create table if not exists public.module_prerequisites (
  module_id uuid not null
    references public.modules (id) on delete cascade,
  prerequisite_module_id uuid not null
    references public.modules (id) on delete cascade,

  -- 'duro' = sin esto no se puede avanzar, y es a donde manda un escape.
  -- 'blando' = ayuda pero no bloquea; el mapa lo dibuja distinto (línea fina) y
  -- el retroceso del escape lo ignora. Sin esta distinción, un grafo completo se
  -- vuelve una maraña donde todo depende de todo y no sirve para decidir nada.
  strength text not null default 'duro'
    check (strength in ('duro', 'blando')),

  -- Por qué existe esta arista. Es para el profesor, no para el estudiante: es
  -- lo que evita que el grafo se llene de dependencias que nadie recuerda haber
  -- decidido (misma lección que el `description` de `misconceptions` en 027).
  rationale text,

  created_at timestamptz not null default now(),

  primary key (module_id, prerequisite_module_id),

  -- Un módulo no es prerrequisito de sí mismo. No impide un ciclo largo
  -- (A→B→A): eso no se puede expresar en un check y se valida en el cliente,
  -- en `universo.mapa` al calcular la profundidad por capas.
  constraint module_prerequisites_no_self
    check (module_id <> prerequisite_module_id)
);

create index if not exists module_prerequisites_module_idx
  on public.module_prerequisites (module_id);
create index if not exists module_prerequisites_prereq_idx
  on public.module_prerequisites (prerequisite_module_id);

alter table public.module_prerequisites enable row level security;

-- Lectura abierta a autenticados, **igual que `modules`** (001,
-- `modules_select_auth using (true)`): la estructura del currículo no es el
-- activo del proyecto —el activo es `questions.correct_option` y `error_*`, ver
-- ADR-005/ADR-015— y el estudiante necesita leerla para ver su propio mapa.
drop policy if exists "module_prerequisites_select_auth" on public.module_prerequisites;
create policy "module_prerequisites_select_auth"
  on public.module_prerequisites for select
  to authenticated
  using (true);

drop policy if exists "module_prerequisites_admin_all" on public.module_prerequisites;
create policy "module_prerequisites_admin_all"
  on public.module_prerequisites for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- resource_misconceptions: de la idea errónea al material
-- ---------------------------------------------------------------------------
-- Muchos a muchos a propósito: un recurso puede atacar varias ideas erróneas
-- relacionadas, y una idea errónea puede tener más de un material (un texto y
-- un video, o dos explicaciones distintas para dos maneras de no entenderlo).

create table if not exists public.resource_misconceptions (
  resource_id uuid not null
    references public.resources (id) on delete cascade,
  misconception_id uuid not null
    references public.misconceptions (id) on delete cascade,

  -- Orden de preferencia para servir cuando hay varios candidatos. Es el lugar
  -- donde, más adelante, va a entrar el ranking por eficacia medida (¿el
  -- siguiente intento sobre esta misconception salió bien?) en vez de por
  -- criterio del autor. Hoy es criterio del autor, y está dicho.
  rank int not null default 0,

  created_at timestamptz not null default now(),

  primary key (resource_id, misconception_id)
);

create index if not exists resource_misconceptions_misconception_idx
  on public.resource_misconceptions (misconception_id, rank);

alter table public.resource_misconceptions enable row level security;

-- SOLO ADMIN, en las cuatro operaciones — el mismo criterio deliberado que 027
-- eligió para `misconceptions`: «abrir después es fácil, des-filtrar no»
-- (RISKS R-16).
--
-- Consecuencia que hay que saber: con esto el CLIENTE NO puede resolver «tu
-- error → este recurso» por su cuenta. Ese camino tiene que pasar por una
-- función `security definer`, igual que `next_question` y `score_answer`
-- (ADR-015), que devuelva el recurso ya elegido sin exponer el catálogo de
-- ideas erróneas ni qué material ataca cada una. Esa función NO se crea acá: se
-- crea cuando «Mi plan» la consuma, para no dejar una RPC sin lector.
drop policy if exists "resource_misconceptions_select_admin" on public.resource_misconceptions;
create policy "resource_misconceptions_select_admin"
  on public.resource_misconceptions for select
  to authenticated
  using (public.is_admin());

drop policy if exists "resource_misconceptions_admin_all" on public.resource_misconceptions;
create policy "resource_misconceptions_admin_all"
  on public.resource_misconceptions for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- resources.entry_level: cuál es el material de ENTRADA de un módulo
-- ---------------------------------------------------------------------------
-- Un escape tiene que recibir el material introductorio, no el recurso nº 7 de
-- la lista. Hoy la única guía es `order_index`, que es un entero que una persona
-- escribe a mano y que además se usa para ordenar la lista completa: no
-- distingue «esto es la puerta de entrada» de «esto va primero».
--
-- Es una columna y no una convención sobre `order_index` porque la pregunta
-- «¿por dónde empieza alguien que no sabe nada de este módulo?» tiene una
-- respuesta propia, y merece poder decirse en la base y verificarse.

alter table public.resources
  add column if not exists entry_level boolean not null default false;

-- Índice parcial: la consulta es siempre «el de entrada de este módulo», nunca
-- «todos los que no son de entrada». Mismo criterio que el índice parcial de
-- `email_outbox` en 005.
create index if not exists resources_entry_level_idx
  on public.resources (module_id)
  where entry_level = true;

-- ---------------------------------------------------------------------------
-- Después de aplicar esto
-- ---------------------------------------------------------------------------
-- 1. Decidir el grafo de prerrequisitos (pregunta abierta) y sembrarlo con una
--    migración propia, para que la decisión pedagógica quede versionada y
--    fechada por separado de esta estructura.
-- 2. Marcar `entry_level` en un recurso por módulo, desde el panel.
-- 3. Catalogar misconceptions (paso 2 de T-57) y enlazarlas acá. Vigilar la
--    heurística que 027 dejó escrita: el catálogo debe crecer MUCHO más lento
--    que el banco — con ~40 hay taxonomía, con ~300 no se modeló nada.
-- 4. Recién con datos, escribir la RPC `security definer` que le sirva el
--    recurso al estudiante.
--
-- Verificación mínima (bloque para el SQL Editor):
--   select count(*) from public.module_prerequisites;      -- 0 esperado
--   select count(*) from public.resource_misconceptions;   -- 0 esperado
--   select count(*) from public.resources where entry_level;  -- 0 esperado
--   select tablename, policyname, cmd from pg_policies
--    where tablename in ('module_prerequisites','resource_misconceptions')
--    order by tablename, policyname;   -- 2 y 2
