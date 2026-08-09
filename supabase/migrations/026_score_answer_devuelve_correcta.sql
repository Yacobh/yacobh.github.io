-- Refinamiento de `score_answer` (024) encontrado al implementar el cliente
-- (BACKLOG T-47). Ver la nota "Refinamiento 2026-08-09" en
-- adr/ADR-015-item-sin-respuesta-en-el-cliente.md
--
-- Motivo: el modal de feedback (components/feedback_modal.cljs,
-- `options-section`) muestra "Comparación de respuestas" — la alternativa
-- elegida junto a la correcta — cuando el estudiante falla. Con `score_answer`
-- devolviendo solo {correcto, explicacion}, esa comparación desaparecía: una
-- regresión pedagógica en el producto cuyo diferencial declarado es explicar
-- el error (D-12, ADR-005).
--
-- Por qué es aceptable devolver la correcta acá y no en `next_question`:
-- el estudiante YA comprometió su respuesta para ese ítem puntual. El objetivo
-- de ADR-015 es eliminar la exfiltración masiva (un `select *` = banco
-- completo), no volver imposible el sondeo ítem por ítem, que ya estaba
-- aceptado como riesgo residual. El costo del sondeo baja de 4N a N llamadas
-- autenticadas y registrables — sigue siendo O(N) contra una sola consulta.
--
-- `create or replace function` no puede cambiar el tipo de retorno de una
-- función `returns table`, así que hay que borrarla y recrearla.

drop function if exists public.score_answer(bigint, text);

create or replace function public.score_answer(
  p_question_id bigint,
  p_selected    text
)
returns table (
  correcto    boolean,
  correcta    text,   -- alternativa correcta, para el feedback post-respuesta
  explicacion text
)
language plpgsql
security definer
set search_path = public
as $$
declare
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
    into v_found, correcta, explicacion
  from public.questions q
  where q.id = p_question_id;

  if not v_found then
    raise exception 'La pregunta % no existe', p_question_id;
  end if;

  correcto := (correcta = v_selected);
  return next;
end;
$$;

revoke all on function public.score_answer(bigint, text) from public, anon;
grant execute on function public.score_answer(bigint, text) to authenticated;
