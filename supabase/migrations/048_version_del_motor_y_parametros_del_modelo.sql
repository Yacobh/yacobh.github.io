-- Versión del motor en cada test, y los dos parámetros del modelo que hasta hoy
-- estaban fijos en el código.
--
-- Pedido del owner (2026-08-28) tras medir el sesgo de θ. Es **puramente
-- aditiva**: tres columnas nullable, dos checks y un backfill de una columna
-- recién creada. El cliente funciona igual si esta migración no se aplica —
-- omite las columnas que no existen, como con `046`.
--
-- Contexto completo: ADR-034. Resumen de por qué existe:
--
-- El motor de θ cambió (azar fijo c = 0,25 y prior N(0, 2²) en vez de N(0,1)).
-- Un θ guardado no significa nada sin saber con qué reglas se calculó: dos
-- filas idénticas de versiones distintas **no son comparables**, y G-4 promete
-- entregarle al estudiante su Δθ. Sin esta columna, ese Δθ mediría el cambio
-- del motor en lugar del cambio del estudiante.

-- -----------------------------------------------------------------------------
-- 1. `tests.engine_version` — con qué reglas se calculó este θ
-- -----------------------------------------------------------------------------
alter table public.tests
  add column if not exists engine_version integer;

-- Backfill a 1. **No es sobrescribir histórico: es escribir un dato que siempre
-- fue verdad.** Todas las filas existentes se rindieron con el motor v1 (1PL sin
-- azar, prior N(0,1)), porque el v2 no existía hasta este despliegue. Dejarlas
-- en null obligaría a cada consulta futura a adivinar si el null significa
-- «motor viejo» o «alguien insertó sin la columna».
update public.tests
   set engine_version = 1
 where engine_version is null;

comment on column public.tests.engine_version is
  'Versión del motor de estimación de θ que produjo esta fila. 1 = 1PL sin azar '
  'con prior N(0,1) (hasta 2026-08-28). 2 = azar fijo c=0,25 con prior N(0,2²) '
  '(ADR-034). θ de versiones distintas no son comparables entre sí: cualquier '
  'cálculo de Δθ debe agrupar por esta columna. Espejo de universo.motor/version.';

-- El check se agrega **después** del backfill, para que no falle con las filas
-- viejas todavía en null.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'tests_engine_version_positiva'
  ) then
    alter table public.tests
      add constraint tests_engine_version_positiva
      check (engine_version is null or engine_version >= 1);
  end if;
end
$$;

-- -----------------------------------------------------------------------------
-- 2. `test_configs.prior_sd` — cuánto encoge el prior
-- -----------------------------------------------------------------------------
-- σ del prior N(0, σ²). Medido en simulación sobre la distribución real de
-- `numbers_v1`: con σ = 1 un estudiante en θ = 2,0 caía en su banda el 20 % de
-- las veces; con σ = 2, el 36 %; con σ = 3, el 44 %.
--
-- El default del cliente es 2 y no 3 a propósito: σ = 3 pone el 95 % de la masa
-- fuera de la escala [-3, 3] y deja de regularizar un banco cuya `difficulty`
-- todavía es autoral (R-17). Es configurable porque el número correcto depende
-- de la población real del banco, que nadie ha medido.
--
-- El techo de 5 no es psicométrico: es un tope de cordura. Con σ = 5 el prior ya
-- no aporta nada sobre [-3, 3] y el estimador queda a merced de patrones
-- extremos, que es justo lo que el prior existe para evitar (ADR-004).
--
-- `null` = usa el default del cliente (2.0).
alter table public.test_configs
  add column if not exists prior_sd numeric;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'test_configs_prior_sd_rango'
  ) then
    alter table public.test_configs
      add constraint test_configs_prior_sd_rango
      check (prior_sd is null or (prior_sd > 0 and prior_sd <= 5));
  end if;
end
$$;

comment on column public.test_configs.prior_sd is
  'σ del prior N(0, σ²) del estimador MAP. null = 2.0, el default del cliente '
  '(universo.motor/default-prior-sd). Más alto encoge menos y deja subir a los '
  'estudiantes fuertes; más bajo protege contra ítems mal etiquetados.';

-- -----------------------------------------------------------------------------
-- 3. `test_configs.guessing_c` — el piso de acierto por azar
-- -----------------------------------------------------------------------------
-- P(acierto) = c + (1 − c)·L(θ − b). Con cuatro alternativas, c = 0,25.
--
-- Es una **constante fijada por el formato del ítem**, no un parámetro
-- estimado: el `c` por ítem del 3PL exige del orden de 1.000 respuestas por
-- ítem y hoy hay 0 ítems con 30 (R-17, G-2). Se deja configurable por si un
-- banco usa otro número de alternativas, no para que nadie lo estime a ojo.
--
-- ⚠️ **No mover este valor sin mover `prior_sd`.** Medido: modelar el azar
-- dejando σ = 1 empeora el motor —el sesgo en θ = 2,0 pasa de −0,40 a −0,82, y
-- la banda correcta de 20 % a 4 %— porque el azar tapaba el encogimiento del
-- prior. Los dos sesgos eran opuestos y se cancelaban por accidente.
--
-- `null` = usa el default del cliente (0.25).
alter table public.test_configs
  add column if not exists guessing_c numeric;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'test_configs_guessing_c_rango'
  ) then
    alter table public.test_configs
      add constraint test_configs_guessing_c_rango
      check (guessing_c is null or (guessing_c >= 0 and guessing_c < 1));
  end if;
end
$$;

comment on column public.test_configs.guessing_c is
  'Piso de acierto por azar del modelo. null = 0.25, el default del cliente '
  '(cuatro alternativas). c = 0 recupera el 1PL puro del motor v1. No cambiarlo '
  'sin revisar prior_sd: ver ADR-034.';

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
-- select count(*) filter (where engine_version = 1) as v1,
--        count(*) filter (where engine_version = 2) as v2,
--        count(*) filter (where engine_version is null) as sin_version
--   from public.tests;
--
-- Después del despliegue, los tests nuevos deben entrar con engine_version = 2.
-- Si aparece alguno en null, el cliente no está mandando la columna.

-- -----------------------------------------------------------------------------
-- Rollback
-- -----------------------------------------------------------------------------
-- alter table public.tests drop constraint if exists tests_engine_version_positiva;
-- alter table public.tests drop column if exists engine_version;
-- alter table public.test_configs drop constraint if exists test_configs_prior_sd_rango;
-- alter table public.test_configs drop constraint if exists test_configs_guessing_c_rango;
-- alter table public.test_configs drop column if exists prior_sd, drop column if exists guessing_c;
