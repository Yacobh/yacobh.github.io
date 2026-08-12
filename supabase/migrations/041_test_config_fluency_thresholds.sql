-- Umbrales del eje de fluidez, configurables por banco.
--
-- ⚠ APLICAR DESPUÉS DE 020 (crea `test_configs`). Puramente aditiva: dos
-- columnas con default, ningún dato existente cambia de comportamiento.
--
-- ── Por qué por banco y no global ──────────────────────────────────────────
-- `universo.irt.fluency` (ADR-019) mide el tiempo de respuesta en **múltiplos
-- del tiempo de lectura del enunciado** y clasifica en tres bandas con dos
-- cortes, que hasta ahora eran constantes globales elegidas por el autor: 3 y 6.
--
-- El primer dato real los puso en duda (T-65, 2026-08-12): sobre el banco
-- `mq_momento_angular` —mecánica cuántica de nivel universitario— una mediana
-- de **2,19** cae dentro de `:fluida` con el corte de 3,0. Pero en un ítem que
-- exige una derivación, responder en 2,2 veces lo que toma leerlo se parece más
-- a **reconocer la alternativa** que a resolver con fluidez. El 3,0 se pensó
-- con ítems tipo PAES: más cortos, más mecánicos, donde reconocer y resolver
-- están mucho más cerca.
--
-- No hay un número que sirva para los dos casos, y no debería haberlo: "cuánto
-- es rápido" depende de qué se está preguntando. Es el mismo razonamiento que
-- llevó a que `min_response_seconds` fuera por banco en `028`.
--
-- ── Los defaults NO son una calibración ────────────────────────────────────
-- 3 y 6 son los mismos valores autorales de `universo.irt.fluency/default-thresholds`,
-- puestos acá como default para que ningún banco existente cambie de
-- comportamiento al aplicar esto. Siguen sin estar calibrados: la herramienta
-- para reemplazarlos con datos es `fluency/calibration-report`, y el
-- procedimiento es el de `032` (medir sobre el histórico, elegir el corte donde
-- están los estudiantes y no donde el autor supuso).
--
-- Espejo de `universo.irt.fluency/default-thresholds`: si cambia uno, cambia el
-- otro en el mismo commit.

alter table public.test_configs
  add column if not exists fluency_fluida_max double precision not null default 3,
  add column if not exists fluency_media_max  double precision not null default 6;

-- `not null` con default, igual que `min_response_seconds` (028) y por la misma
-- razón: lo que se configura es **dónde** están los cortes, no si el eje existe.
-- Un nullable obligaría a que cada consumidor decidiera qué hacer con el nil, y
-- ya sabemos cómo termina eso.
do $$
begin
  if not exists (select 1 from pg_constraint
                  where conname = 'test_configs_fluency_bands_ordenadas') then
    alter table public.test_configs
      add constraint test_configs_fluency_bands_ordenadas
      check (fluency_fluida_max > 0 and fluency_media_max > fluency_fluida_max);
  end if;
end
$$;

comment on column public.test_configs.fluency_fluida_max is
  'Tiempo relativo máximo (múltiplos del tiempo de lectura) para la banda :fluida. Ver ADR-019.';
comment on column public.test_configs.fluency_media_max is
  'Tiempo relativo máximo para la banda :media; por encima es :laboriosa. Ver ADR-019.';

-- -----------------------------------------------------------------------------
-- Sugerencia para el banco que motivó esto — NO se aplica sola
-- -----------------------------------------------------------------------------
-- Deliberadamente comentada. Bajar el corte de `mq_momento_angular` es una
-- decisión de contenido sobre un solo dato (una mediana de 2,19 en un único
-- test rendido por una persona), y aplicarla acá sería exactamente el error que
-- esta migración documenta: fijar un número por criterio y presentarlo como
-- medición. Se deja escrita para cuando haya evidencia, no antes.
--
--   update public.test_configs
--      set fluency_fluida_max = 2.0,
--          fluency_media_max  = 4.5,
--          updated_at = now()
--    where topic = 'mq_momento_angular';
--
-- Antes de correrla, mirar la distribución real:
--   (en el cliente) universo.irt.fluency/calibration-report sobre las respuestas
--   acumuladas del banco — devuelve mediana y deciles.

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select topic, fluency_fluida_max, fluency_media_max
--     from public.test_configs order by topic;
--   -- todas en 3 / 6 salvo las que se hayan configurado a mano
--
--   -- El check impide invertir las bandas:
--   -- update public.test_configs set fluency_media_max = 1 where topic = '...';
--   -- ERROR: new row violates check constraint "test_configs_fluency_bands_ordenadas"
--
-- Reversión:
--   alter table public.test_configs
--     drop constraint if exists test_configs_fluency_bands_ordenadas,
--     drop column if exists fluency_fluida_max,
--     drop column if exists fluency_media_max;
