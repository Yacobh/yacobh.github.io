-- Configuración de parada IRT (min/max items, SE, tiempo) y cadena de
-- prerrequisitos por banco de preguntas (questions.topic).
--
-- Por qué keyed por `topic` y no por `modules`: el mapeo topic -> module-slug
-- (universo.profile/topic->module-slug) es parcial y está documentado como
-- incompleto (project-memory/OPEN_QUESTIONS Q-06); `topic` es hoy el único
-- identificador real y completo de un "banco" de preguntas (questions.topic,
-- sin tabla propia — ver supabase/SCHEMA.md).
--
-- Modelo de progresión: un test sin prerequisite_topic es un diagnóstico,
-- accesible siempre. Un test con prerequisite_topic (y opcionalmente
-- min_theta) solo se desbloquea si el usuario ya rindió ese topic y, si
-- aplica, alcanzó el theta mínimo exigido (ver 021_tests_topic_theta_rls.sql
-- y universo.access). No hay tabla de "accesos otorgados": el avance se
-- deriva de la propia tabla `tests`.

create table if not exists public.test_configs (
  topic text primary key,
  min_items int not null default 5
    check (min_items > 0),
  max_items int not null default 12
    check (max_items >= min_items),
  se_threshold double precision not null default 0.35
    check (se_threshold > 0),
  prerequisite_topic text
    references public.test_configs (topic) on delete restrict,
  min_theta double precision
    check (min_theta between -3 and 3),
  max_minutes double precision
    check (max_minutes is null or max_minutes > 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (prerequisite_topic is null or prerequisite_topic <> topic),
  check (min_theta is null or prerequisite_topic is not null)
);

create index if not exists test_configs_prerequisite_idx
  on public.test_configs (prerequisite_topic);

alter table public.test_configs enable row level security;

-- Catálogo: cualquier usuario logueado necesita leer los tests activos para
-- armar el selector y la regla de parada. Los borradores (active = false)
-- solo los ve un admin (mismo criterio que resources_select_published).
drop policy if exists "test_configs_select" on public.test_configs;
create policy "test_configs_select"
  on public.test_configs for select
  to authenticated
  using (active = true or public.is_admin());

drop policy if exists "test_configs_insert_admin" on public.test_configs;
create policy "test_configs_insert_admin"
  on public.test_configs for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "test_configs_update_admin" on public.test_configs;
create policy "test_configs_update_admin"
  on public.test_configs for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "test_configs_delete_admin" on public.test_configs;
create policy "test_configs_delete_admin"
  on public.test_configs for delete
  to authenticated
  using (public.is_admin());

-- Seed: un config por cada topic ya existente en questions, con los valores
-- globales actuales (universo.irt.progress/default-stop-config) y SIN
-- prerequisito. A propósito inofensivo: nadie pierde acceso a nada el día del
-- deploy (todo sigue "abierto" como hoy) hasta que un admin configure
-- explícitamente una cadena de prerequisito/theta desde el panel.
insert into public.test_configs (topic, min_items, max_items, se_threshold)
select distinct topic, 5, 12, 0.35
from public.questions
where topic is not null and trim(topic) <> ''
on conflict (topic) do nothing;
