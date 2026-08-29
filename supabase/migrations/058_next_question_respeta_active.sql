-- `next_question` deja de servir ítems marcados como inactivos.
--
-- EL DEFECTO. La columna `public.questions.active` existe y el proyecto la usa
-- como «el camino reversible para retirar contenido» ([[../project-memory/BACKLOG]]
-- T-122: «`active = false` en vez de `delete`, es reversible y no toca el
-- histórico»). Pero `next_question` (migración `024`) **nunca la mira**: filtra
-- por `topic`, por los ya respondidos y por la ventana de dificultad, y nada más.
--
-- O sea que hoy marcar un ítem como inactivo **no lo saca del diagnóstico**. Se
-- descubrió el 2026-08-28 al retirar los 12 ítems de varianza y desviación
-- estándar del eje de probabilidad (`057`), que quedaban igual de servibles.
--
-- Es el modo de fallo de ADR-017 otra vez: nada falla, nada se registra, el
-- contenido simplemente sigue circulando cuando alguien creyó haberlo retirado.
--
-- ⚠️ **PRE-CHEQUEO OBLIGATORIO ANTES DE APLICAR.** Esta migración cambia lo que
-- el estudiante recibe: todo ítem con `active = false` deja de servirse **de
-- golpe**. Correr primero:
--
--   select topic, count(*) as inactivos
--     from public.questions where active = false group by topic order by 2 desc;
--
--   · Si solo aparecen los 12 de `probabilidad` que retira `057`, aplicar.
--   · Si aparecen otros bancos, revisarlos uno por uno ANTES: puede que un banco
--     entero quede corto y su diagnóstico se agote (`:exhausted`), que es
--     exactamente el defecto que `049`…`056` vinieron a cerrar.
--
-- `coalesce(q.active, true)` y no `q.active`: si alguna fila tiene la columna en
-- null, el ítem se sigue sirviendo. Un null no puede significar «retirado».
--
-- Solo cambia la cláusula `where`; la firma, los tipos, el `security definer` y
-- los permisos son idénticos a `024`.

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
    -- Lo único que agrega esta migración sobre `024`.
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
--   -- Cuántos ítems por banco quedan servibles después del cambio:
--   select topic,
--          count(*) filter (where coalesce(active, true)) as servibles,
--          count(*) as total
--     from public.questions group by topic order by 1;
--
--   -- Y que ningún banco activo se quede sin ítems en algún tramo:
--   select topic,
--          count(*) filter (where difficulty < -2)                          as bajo_menos2,
--          count(*) filter (where difficulty >= -2 and difficulty < -1)     as m2_m1,
--          count(*) filter (where difficulty >= -1 and difficulty <  0)     as m1_0,
--          count(*) filter (where difficulty >=  0 and difficulty <  1)     as c0_1,
--          count(*) filter (where difficulty >=  1 and difficulty <  2)     as c1_2,
--          count(*) filter (where difficulty >=  2)                         as sobre_2
--     from public.questions
--    where coalesce(active, true) and topic not like 'mq\_%'
--    group by topic order by 1;
--
-- Reversión: reaplicar `024_questions_rpc.sql` tal cual, que redefine la función
-- sin el filtro.
