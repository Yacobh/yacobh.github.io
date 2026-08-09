-- El ítem viaja al cliente SIN su respuesta correcta; la corrección ocurre acá.
-- Diseño completo, alternativas descartadas y riesgo residual aceptado en
-- adr/ADR-015-item-sin-respuesta-en-el-cliente.md
--
-- Contexto corto: la auditoría de pg_policies del 2026-08-08 encontró que
-- `questions` tiene una policy permisiva "Enable read access for all users"
-- (SELECT, authenticated, using true) creada desde el dashboard. Como las
-- policies se combinan con OR, la regla efectiva es `true` y cualquier cuenta
-- puede descargar el banco completo con correct_option y error_a..d.
--
-- ESTA MIGRACIÓN ES ADITIVA: solo crea funciones. No revoca nada, así que el
-- bundle actualmente en producción sigue funcionando igual. La revocación va
-- en 025 y **solo se aplica después** de publicar el bundle que usa estos RPC.
--
-- Tipos tomados del esquema real (questions no está versionada, ver ADR-015):
--   id bigint · correct_option character · difficulty real · module_id uuid

-- ---------------------------------------------------------------------------
-- next_question: devuelve UN ítem, sin respuesta ni explicaciones
-- ---------------------------------------------------------------------------
-- Reemplaza a universo.events.test/fetch-candidates, que hoy descarga TODOS los
-- ítems de la ventana de dificultad y elige uno en el cliente. Acá la selección
-- por cercanía a θ ocurre en SQL y viaja un solo ítem: menos exposición y menos
-- tráfico.
--
-- El ensanchamiento de ventana (±narrow, y si no hay candidatos ±wide) se
-- resuelve en un solo query: se filtra por la ventana ancha y se ordena
-- prefiriendo los que caen dentro de la estrecha. Mismo resultado que las dos
-- llamadas encadenadas del cliente, en un round-trip.

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

-- ---------------------------------------------------------------------------
-- score_answer: corrige en el servidor y devuelve solo lo que la UI muestra
-- ---------------------------------------------------------------------------
-- Hoy el acierto se calcula en el cliente
-- (diagnostic_test.cljs: `:correct? (= value (:correct-option question))`)
-- y el modal de feedback muestra la explicación de la alternativa elegida.
-- Esta función entrega exactamente eso: el booleano y UNA explicación — nunca
-- la letra correcta ni las otras tres explicaciones.
--
-- Riesgo residual aceptado (ADR-015): un usuario decidido puede sondear las
-- cuatro alternativas de cada ítem y reconstruir la clave. El objetivo es
-- eliminar la exfiltración masiva (un select * = banco completo), no volver
-- imposible el sondeo, que pasa a costar 4×N llamadas autenticadas.

create or replace function public.score_answer(
  p_question_id bigint,
  p_selected    text
)
returns table (
  correcto    boolean,
  explicacion text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_correct  text;
  v_selected text;
  v_found    boolean := false;
begin
  if auth.uid() is null then
    raise exception 'Se requiere una sesión iniciada';
  end if;

  -- correct_option es `character` (bpchar): se normaliza a text sin padding
  -- antes de comparar, para que 'A' de char(1) y 'A' de text coincidan.
  v_selected := upper(btrim(coalesce(p_selected, '')));

  if v_selected not in ('A', 'B', 'C', 'D') then
    raise exception 'Alternativa inválida: %', p_selected;
  end if;

  select true,
         upper(btrim(q.correct_option::text)),
         case v_selected
           when 'A' then q.error_a
           when 'B' then q.error_b
           when 'C' then q.error_c
           when 'D' then q.error_d
         end
    into v_found, v_correct, explicacion
  from public.questions q
  where q.id = p_question_id;

  if not v_found then
    raise exception 'La pregunta % no existe', p_question_id;
  end if;

  correcto := (v_correct = v_selected);
  return next;
end;
$$;

revoke all on function public.score_answer(bigint, text) from public, anon;
grant execute on function public.score_answer(bigint, text) to authenticated;

-- ---------------------------------------------------------------------------
-- Después de aplicar esto
-- ---------------------------------------------------------------------------
-- 1. Adaptar el cliente (BACKLOG T-47): fetch-candidates -> next_question,
--    y la evaluación de :correct? -> score_answer. `normalize-question` deja
--    de mapear :correct-option y :errors.
-- 2. Compilar, commitear y publicar el bundle (ADR-003), y probar el
--    diagnóstico completo con una cuenta de ESTUDIANTE, no de admin.
-- 3. Recién entonces aplicar 025_questions_revoke_lectura_directa.sql.
