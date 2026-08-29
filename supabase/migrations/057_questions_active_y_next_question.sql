-- Retirar un ítem sin borrarlo: la columna `active` y la RPC que la respeta.
--
-- EL HALLAZGO (2026-08-28). La memoria del proyecto viene recomendando desde
-- T-122 «`active = false` en vez de `delete`, que es reversible y no toca el
-- histórico», y la skill `banco-de-items` mide el banco con
-- `... from questions where active`. **Las dos cosas eran falsas:**
--
--   · `public.questions` **no tiene** columna `active` — lo destapó la guarda de
--     `058` al intentar aplicarla contra la base real;
--   · y `next_question` (migración `024`) no filtra por nada parecido: sirve
--     todo ítem del topic que caiga en la ventana de dificultad.
--
-- O sea que hoy **no existe ninguna forma de retirar un ítem de circulación sin
-- borrarlo**. Esta migración la crea, en dos pasos que van juntos a propósito.
--
-- POR QUÉ LOS DOS EN LA MISMA MIGRACIÓN: la columna nace con `default true`, así
-- que en el instante en que se aplica **no hay ningún ítem inactivo** y el filtro
-- nuevo no cambia lo que recibe ningún estudiante. Separarlas abriría una ventana
-- en la que alguien marca un ítem inactivo y el diagnóstico lo sigue sirviendo,
-- que es justo el defecto que se está cerrando.
--
-- Nada en el cliente lee esta columna: `question-select-cols` (`crud.cljs`) no la
-- pide, así que el bundle publicado no necesita cambiar. El `:active` que sí lee
-- el admin es el de `test_configs`, que es otra tabla y otra cosa.
--
-- ⚠️ **Precondición de `058`**, que la usa para retirar los 12 ítems de varianza
-- y desviación estándar del eje de probabilidad.

-- -----------------------------------------------------------------------------
-- 1. La columna
-- -----------------------------------------------------------------------------
-- `not null default true`: un null no puede significar «retirado», y sin default
-- los 910 ítems existentes quedarían en un estado que nadie decidió.

alter table public.questions
  add column if not exists active boolean not null default true;

comment on column public.questions.active is
  'false retira el ítem de `next_question` sin borrarlo. El histórico de `tests` lo sigue referenciando. Ver migración 057.';

-- -----------------------------------------------------------------------------
-- 2. `next_question` la respeta
-- -----------------------------------------------------------------------------
-- Copia exacta de `024` con una sola línea agregada, marcada abajo. Firma, tipos,
-- `security definer` y permisos idénticos.

create or replace function public.next_question(
  p_topic       text,
  p_theta       double precision,
  p_narrow      double precision,
  p_wide        double precision,
  p_answered    bigint[] default '{}'::bigint[]
)
returns table (
  id           bigint,
  question     text,
  option_a     text,
  option_b     text,
  option_c     text,
  option_d     text,
  topic        text,
  difficulty   real,
  order_index  integer,
  module_id    uuid,
  module_slug  text,
  module_title text,
  module_track text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  -- security definer evade RLS, así que la sesión se exige explícitamente:
  -- sin esto, cualquiera con la anon key podría pedir ítems.
  if auth.uid() is null then
    raise exception 'Se requiere una sesión iniciada';
  end if;

  return query
  select q.id, q.question,
         q.option_a, q.option_b, q.option_c, q.option_d,
         q.topic, q.difficulty, q.order_index, q.module_id,
         m.slug, m.title, m.track
  from public.questions q
  left join public.modules m on m.id = q.module_id
  where q.topic = p_topic
    -- ← lo único que esta migración agrega sobre `024`.
    -- `coalesce` y no `q.active` a secas: defensivo, por si alguna fila queda en
    -- null pese al `not null` (por ejemplo si alguien recrea la tabla).
    and coalesce(q.active, true)
    and not (q.id = any (coalesce(p_answered, '{}'::bigint[])))
    and abs(coalesce(q.difficulty, 0)::double precision - p_theta)
        <= greatest(coalesce(p_wide, 0), coalesce(p_narrow, 0))
  order by
    -- Prefiere la ventana estrecha; si está vacía, cae a la ancha.
    (abs(coalesce(q.difficulty, 0)::double precision - p_theta)
       > coalesce(p_narrow, 0)),
    abs(coalesce(q.difficulty, 0)::double precision - p_theta)
  limit 1;
end;
$$;

revoke all on function public.next_question(text, double precision, double precision, double precision, bigint[]) from public, anon;
grant execute on function public.next_question(text, double precision, double precision, double precision, bigint[]) to authenticated;

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   -- La columna existe y NADIE quedó inactivo al aplicar:
--   select count(*) filter (where active) as activos,
--          count(*) filter (where not active) as inactivos
--     from public.questions;
--   -- inactivos = 0
--
--   -- Y el conteo por banco no se movió:
--   select topic, count(*) filter (where active) as servibles, count(*) as total
--     from public.questions group by topic order by 1;
--
-- Reversión:
--   reaplicar `024_questions_rpc.sql` (redefine la función sin el filtro) y
--   `alter table public.questions drop column active;`
