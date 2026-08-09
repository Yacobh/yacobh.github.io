-- Nombre de fantasía por evaluación (BACKLOG T-42).
--
-- Hasta ahora el nombre que veía el estudiante en el selector salía de un
-- diccionario estático hardcodeado en el cliente (universo.catalog/topic-labels,
-- antes en components/diagnostic_test.cljs): solo cubría un puñado de topics
-- conocidos y no se podía editar desde ningún panel. Un topic nuevo se mostraba
-- con su identificador técnico.
--
-- `display_name` es opcional a propósito: si está en null, el cliente sigue
-- cayendo al diccionario estático y, en último término, al propio topic con los
-- guiones bajos como espacios (ver universo.catalog/topic-label). Por eso esta
-- migración no necesita backfill: no cambia lo que ve nadie hasta que un admin
-- escriba un nombre.

alter table public.test_configs
  add column if not exists display_name text;

-- Un nombre en blanco no es un nombre: obligarlo a null mantiene una sola
-- representación de "sin nombre configurado" y evita que el fallback del
-- cliente se salte por culpa de un string vacío guardado por accidente.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.test_configs'::regclass
      and conname = 'test_configs_display_name_not_blank'
  ) then
    alter table public.test_configs
      add constraint test_configs_display_name_not_blank
      check (display_name is null or length(btrim(display_name)) > 0);
  end if;
end $$;

comment on column public.test_configs.display_name is
  'Nombre visible de la evaluación para el estudiante. Null = usar el fallback del cliente (universo.catalog/topic-label).';

-- RLS: sin cambios. `display_name` viaja dentro del mismo select del catálogo,
-- que ya está cubierto por test_configs_select (active = true or is_admin())
-- de 020_test_configs.sql, y solo un admin puede escribirlo
-- (test_configs_update_admin).
