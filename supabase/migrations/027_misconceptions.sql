-- Catálogo de misconceptions (ideas erróneas) con identidad propia, y vínculo
-- desde cada distractor de `questions`.
--
-- PASO 1 de project-memory/BACKLOG T-57. Es **puramente aditiva**: crea una
-- tabla vacía y cuatro columnas nullable. No modifica ni mueve ningún dato
-- existente, no cambia el comportamiento de la app, y `null` significa
-- simplemente "este distractor todavía no está catalogado". Se puede aplicar
-- en cualquier momento y revertir borrando lo que crea.
--
-- ── El problema que resuelve ────────────────────────────────────────────────
-- Hoy `questions.error_a..d` hace DOS trabajos a la vez:
--   1. la IDENTIDAD del error ("invierte el divisor al dividir fracciones"),
--      que es reusable entre ítems y debería poder contarse y agregarse;
--   2. la EXPLICACIÓN para ese ítem, que es necesariamente específica porque
--      menciona los números concretos del ejercicio.
-- Al estar fusionados en un `text`, la misconception no tiene identificador:
-- dos ítems que evalúan el mismo error tienen cadenas independientes y sin
-- relación entre sí. No se puede responder "¿cuántos estudiantes cometen el
-- error X?", ni enlazarle un recurso, ni comparar entre diagnósticos. Es un
-- artefacto de presentación, no una entidad del dominio.
--
-- ── Por qué NO se reemplaza el texto ────────────────────────────────────────
-- El texto se conserva tal cual. Cambiar `error_a` por un ID perdería lo mejor
-- que hay hoy: explicaciones contextuales que hablan de los números del propio
-- ejercicio. El distractor apunta a una misconception (identidad) Y conserva su
-- explicación (contexto). Las dos cosas.
--
-- ── Por qué tabla relacional y no JSONB ─────────────────────────────────────
-- Lo único que se busca acá es IDENTIDAD, y JSONB es precisamente lo que no
-- puede garantizarla. Precedente en este mismo repositorio: BACKLOG T-51
-- documenta 26 topics con duplicados por acento y mayúscula
-- (`factorización`/`factorizacion`, `Polinomios`/`polinomios`) que el sistema
-- trató como bancos distintos **sin avisar**, exactamente porque `topic` es
-- texto libre sin restricción. Un JSONB con slugs reproduce ese fallo con la
-- misma invisibilidad. Además project-memory/RISKS R-09 ya registra "contrato
-- JSONB sin esquema" como riesgo activo, y todo lo que se quiere hacer con esto
-- (contar, enlazar, comparar) son joins y agregaciones.
--
-- ── Por qué 4 columnas y no una tabla `question_distractors` normalizada ────
-- (a) El supuesto de exactamente 4 alternativas ya está grabado en el `check`
--     de `correct_option`, en la validación A..D de `score_answer` (024) y en el
--     editor del panel: no se agrega una restricción nueva.
-- (b) La versión normalizada obligaría a mover los 387×4 textos existentes en
--     una sola migración contra producción y sin staging (RISKS R-02). Esta no
--     mueve ningún dato. Normalizar después sigue siendo barato porque, desde
--     ADR-015, los únicos lectores de `error_*` son `next_question` y
--     `score_answer` — el cliente ya no lee `questions`.

create table if not exists public.misconceptions (
  id uuid primary key default gen_random_uuid(),

  -- Identificador estable y legible. La restricción de formato es la lección de
  -- T-51 hecha regla: solo minúsculas, dígitos, y `-` o `/` como separadores.
  -- Sin acentos, sin mayúsculas, sin espacios, sin separador al inicio/final ni
  -- duplicado. Ejemplos válidos: 'fracciones/invierte-divisor', 'signos/resta-de-negativos'.
  slug text not null unique
    check (slug ~ '^[a-z0-9]+([-/][a-z0-9]+)*$'),

  -- Nombre en prosa, para el profesor y para los reportes agregados. NO es lo
  -- que se le muestra al estudiante: eso sigue siendo el texto contextual de
  -- questions.error_*.
  name text not null
    check (btrim(name) <> ''),

  -- Criterio editorial: cuándo corresponde usar esta misconception y cuándo no.
  -- Es lo que evita que el catálogo se llene de duplicados con nombres distintos.
  description text,

  -- Opcional. Da una pista de módulo a ítems que no lo tienen (hoy el 51 % del
  -- banco tiene module_id nulo, ver T-51). No lo resuelve, pero le quita filo.
  module_id uuid references public.modules (id) on delete set null,

  created_at timestamptz not null default now()
);

create index if not exists misconceptions_module_id_idx
  on public.misconceptions (module_id);

alter table public.misconceptions enable row level security;

-- Acceso solo admin, en las cuatro operaciones. El estudiante NO necesita leer
-- esta tabla: desde ADR-015 el cliente no lee `questions`, y si algún día la
-- misconception llega al estudiante será a través de `score_answer`, que es
-- `security definer` y por lo tanto no pasa por estas policies.
-- Criterio deliberado (RISKS R-16): abrir después es fácil, des-filtrar no.
drop policy if exists "misconceptions_select_admin" on public.misconceptions;
create policy "misconceptions_select_admin"
  on public.misconceptions for select
  to authenticated
  using (public.is_admin());

drop policy if exists "misconceptions_insert_admin" on public.misconceptions;
create policy "misconceptions_insert_admin"
  on public.misconceptions for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "misconceptions_update_admin" on public.misconceptions;
create policy "misconceptions_update_admin"
  on public.misconceptions for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "misconceptions_delete_admin" on public.misconceptions;
create policy "misconceptions_delete_admin"
  on public.misconceptions for delete
  to authenticated
  using (public.is_admin());

-- Vínculo desde cada distractor. `on delete set null`: reorganizar el catálogo
-- (borrar una misconception mal planteada) no debe quedar bloqueado por los
-- ítems que la referencian; pierden el puntero y vuelven a "sin catalogar".
alter table public.questions
  add column if not exists misconception_a_id uuid
    references public.misconceptions (id) on delete set null,
  add column if not exists misconception_b_id uuid
    references public.misconceptions (id) on delete set null,
  add column if not exists misconception_c_id uuid
    references public.misconceptions (id) on delete set null,
  add column if not exists misconception_d_id uuid
    references public.misconceptions (id) on delete set null;

-- SIN SEED A PROPÓSITO. El catálogo nace vacío y se puebla catalogando un
-- módulo a la vez (paso 2 de T-57), priorizado por los topics más fallados
-- según los diagnósticos ya rendidos. Sembrar automáticamente una misconception
-- por cada `error_*` distinto reproduciría el problema que esta tabla existe
-- para resolver: un catálogo del tamaño del banco no es una taxonomía, es la
-- misma lista de strings con otra forma.
--
-- Heurística para vigilar el catálogo: debe crecer MUCHO más lento que el banco.
-- Con 387 ítems y ~300 misconceptions no se modeló nada; con ~40 hay taxonomía.
-- Corolario: una misconception que aparece en un solo ítem es sospechosa.
