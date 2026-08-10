-- T-44 · Fase 1 de ADR-014: umbral de esfuerzo configurable por banco.
--
-- Qué hace: agrega `test_configs.min_response_seconds`, el piso en segundos
-- por debajo del cual una respuesta se considera NO esforzada y deja de
-- contar en la estimación de θ (peso 0 en la verosimilitud y en la
-- información de Fisher — ver universo.irt.effort).
--
-- El umbral real de cada ítem es `max(min_response_seconds, largo / 20)`: el
-- piso cubre los enunciados cortos y la parte proporcional los largos. Solo
-- el piso es configurable; la velocidad de lectura es una constante del
-- cliente, no una decisión administrativa por banco.
--
-- Por qué `not null default 3` y no nullable:
--   Descartar una respuesta emitida antes de poder leer el enunciado es
--   siempre correcto; lo que se configura es cuán estricto ser, no si el
--   filtro existe. Un `0` deja actuar solo la regla proporcional (largo / 20),
--   que es lo más cerca de "apagado" que tiene sentido ofrecer. Con default 3
--   el filtro queda activo en TODOS los bancos ya sembrados sin que un admin
--   tenga que tocar nada: si fuera nullable, la afirmación de la FAQ ("el
--   tiempo de respuesta también se considera en la estimación") seguiría
--   siendo falsa hasta que alguien configurara cada topic uno por uno.
--
-- Aditiva y sin backfill de datos: no toca `tests` ni recalcula θ de los
-- diagnósticos ya rendidos. Las respuestas anteriores no tienen `:weight` y
-- `universo.irt.effort/weight-of` las cuenta con peso 1.0 — este filtro no
-- reinterpreta retroactivamente lo que ya se midió y se le mostró a alguien.
--
-- Idempotente (R-02: se aplica contra producción, sin staging).

alter table public.test_configs
  add column if not exists min_response_seconds double precision not null default 3;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.test_configs'::regclass
      and conname = 'test_configs_min_response_seconds_range'
  ) then
    alter table public.test_configs
      add constraint test_configs_min_response_seconds_range
      check (min_response_seconds >= 0 and min_response_seconds <= 120);
  end if;
end $$;

comment on column public.test_configs.min_response_seconds is
  'Piso en segundos del umbral de esfuerzo (ADR-014 Fase 1). Umbral efectivo por ítem = max(este valor, largo_enunciado / 20). Bajo el umbral la respuesta no aporta a θ ni a la información de Fisher. 0 = solo aplica la regla proporcional.';

-- Las policies de 020 cubren la columna nueva (son a nivel de fila, no de
-- columna): no hay nada que agregar en RLS.
