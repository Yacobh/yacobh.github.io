-- 042 · Línea del tiempo: año, era y figura histórica por módulo
--
-- ⏳ NO APLICAR SIN AUDITAR EL CONTENIDO. Ver la sección "Autoría" abajo.
--
-- PARA QUÉ
-- --------
-- `modules.historical_blurb` existe desde `002` y `resources.historical_context`
-- desde `004`: hay 20 módulos PAES y 15 de cuántica con contexto histórico
-- escrito, más decenas de recursos, y **ningún usuario ve nada de eso**
-- (registrado en sessions/SESSION-021 como el mayor impacto por menor esfuerzo
-- disponible). Esta migración agrega lo único que falta para poder mostrarlo
-- como una línea del tiempo: **cuándo** pasó cada cosa.
--
-- El blurb narra ("Desde los sistemas egipcio y babilónico hasta la notación
-- posicional…") pero no ubica. Un texto no se puede ordenar en un eje; un
-- entero sí.
--
-- DISEÑO
-- ------
-- · `historical_year` es un entero con signo: negativo = a.C. Se eligió sobre
--   `date` porque ninguna de estas fechas tiene día ni mes, y varias son
--   aproximadas por siglo. Un `date` obligaría a inventar precisión que no
--   existe.
-- · **Nullable a propósito.** Un módulo sin año no aparece en la línea, que es
--   mejor que asignarle una fecha inventada para que "no falte". Es la misma
--   regla que `questions.misconception_*_id`: null significa "sin catalogar",
--   no "cero".
-- · `historical_era` es redundante con el año —se podría derivar— y aun así se
--   guarda: la línea agrupa por era y hacer ese cálculo en el cliente
--   significaría que el criterio de corte viva en el código en vez de en el
--   dato. El `check` fija el vocabulario.
-- · Sin cambios de RLS: `modules` ya es legible por cualquiera.

alter table public.modules
  add column if not exists historical_year integer,
  add column if not exists historical_era text,
  add column if not exists historical_figure text;

do $$
begin
  if not exists (select 1 from pg_constraint
                  where conname = 'modules_historical_era_valida') then
    alter table public.modules
      add constraint modules_historical_era_valida
      check (historical_era is null or historical_era in
             ('antiguedad', 'medieval', 'renacimiento', 'moderna', 'contemporanea'));
  end if;
end
$$;

-- Coherencia año ↔ era. Los cortes son convenciones, no verdades: se fijan acá
-- para que el dato no pueda contradecirse a sí mismo.
--   antiguedad     ..500      medieval    501..1400    renacimiento 1401..1650
--   moderna     1651..1899    contemporanea 1900..
-- El corte moderna/contemporánea en 1900 no es arbitrario: es el año en que
-- Planck introduce el cuanto, que es justo donde empieza el track de cuántica.
do $$
begin
  if not exists (select 1 from pg_constraint
                  where conname = 'modules_historical_era_coherente') then
    alter table public.modules
      add constraint modules_historical_era_coherente
      check (
        historical_year is null or historical_era is null or
        (historical_era = 'antiguedad'    and historical_year <= 500)  or
        (historical_era = 'medieval'      and historical_year between 501 and 1400) or
        (historical_era = 'renacimiento'  and historical_year between 1401 and 1650) or
        (historical_era = 'moderna'       and historical_year between 1651 and 1899) or
        (historical_era = 'contemporanea' and historical_year >= 1900)
      );
  end if;
end
$$;

comment on column public.modules.historical_year is
  'Año del hito que representa el módulo. Negativo = a.C. Null = sin ubicar, no aparece en la línea del tiempo. Ver ADR-021.';
comment on column public.modules.historical_era is
  'Época para agrupar en la línea del tiempo. Redundante con el año a propósito: el criterio de corte vive en el dato, no en el cliente.';
comment on column public.modules.historical_figure is
  'Persona u obra a la que se atribuye el hito, tal como se muestra al estudiante.';

-- -----------------------------------------------------------------------------
-- AUTORÍA — leer antes de aplicar
-- -----------------------------------------------------------------------------
-- Estos valores los propuso el agente, NO el profesor. Por ADR-016 la IA puede
-- producir contenido en el pipeline de autoría, pero la publicación es humana:
-- **auditar los 35 antes de correr esta migración.**
--
-- Criterio usado para elegir el año: el momento en que el contenido del módulo
-- aparece por primera vez en una forma reconocible para el estudiante de hoy,
-- no la primera vez que alguien lo intuyó. Por eso "Ecuaciones lineales" apunta
-- a Diofanto y no al papiro de Rhind, que también las resuelve.
--
-- Los puntos débiles conocidos, dichos en voz alta para que la auditoría se
-- concentre ahí:
--   · `geometria/pitagoras` → Pitágoras (−530) es la atribución tradicional,
--     pero la tablilla Plimpton 322 (~−1800) muestra que los babilonios ya
--     manejaban ternas. Se eligió la atribución tradicional porque el módulo
--     lleva ese nombre; es defendible cambiarla.
--   · `aritmetica/porcentajes` → Pacioli (1494) sistematiza el cálculo
--     mercantil, pero el porcentaje como práctica es anterior (impuestos
--     romanos). Es un hito de difusión, no de invención.
--   · `cuantica/armonicos_esfericos` → Laplace (1782) es correcto y puede
--     sorprender: los armónicos esféricos son anteriores a la cuántica y se
--     usaban en gravitación. Que aparezcan en la era "moderna", antes del
--     bloque cuántico, es intencional y pedagógicamente valioso.

update public.modules m set
  historical_year   = v.anio,
  historical_era    = v.era,
  historical_figure = v.figura
from (values
  -- ARITMÉTICA
  ('aritmetica/numeros',                  628, 'medieval',      'Brahmagupta'),
  ('aritmetica/enteros',                 -100, 'antiguedad',    'Nueve capítulos sobre el arte matemático'),
  ('aritmetica/fracciones',             -1650, 'antiguedad',    'Ahmes, papiro de Rhind'),
  ('aritmetica/potencias',               1010, 'medieval',      'Al-Karaji'),
  ('aritmetica/proporciones',            -370, 'antiguedad',    'Eudoxo de Cnido'),
  ('aritmetica/porcentajes',             1494, 'renacimiento',  'Luca Pacioli'),
  ('aritmetica/operaciones_fundamentales', 825, 'medieval',     'Al-Juarismi'),
  -- ÁLGEBRA
  ('algebra/expresiones',                1591, 'renacimiento',  'François Viète'),
  ('algebra/ecuaciones',                  250, 'antiguedad',    'Diofanto de Alejandría'),
  ('algebra/inecuaciones',               1631, 'renacimiento',  'Thomas Harriot'),
  ('algebra/sistemas',                   1750, 'moderna',       'Gabriel Cramer'),
  ('algebra/polinomios',                 1545, 'renacimiento',  'Gerolamo Cardano'),
  ('algebra/funciones',                  1748, 'moderna',       'Leonhard Euler'),
  -- GEOMETRÍA
  ('geometria/basica',                   -600, 'antiguedad',    'Tales de Mileto'),
  ('geometria/angulos',                  -300, 'antiguedad',    'Euclides'),
  ('geometria/triangulos',                 60, 'antiguedad',    'Herón de Alejandría'),
  ('geometria/circulo',                  -250, 'antiguedad',    'Arquímedes'),
  ('geometria/areas',                    1635, 'renacimiento',  'Bonaventura Cavalieri'),
  ('geometria/volumenes',               -1850, 'antiguedad',    'Papiro de Moscú'),
  ('geometria/pitagoras',                -530, 'antiguedad',    'Pitágoras de Samos'),
  -- CUÁNTICA (track experimental, ADR-018)
  ('cuantica/armonicos_esfericos',       1782, 'moderna',       'Pierre-Simon Laplace'),
  ('cuantica/suma_momentos',             1872, 'moderna',       'Clebsch y Gordan'),
  ('cuantica/perturbaciones',            1894, 'moderna',       'Lord Rayleigh'),
  ('cuantica/origenes',                  1900, 'contemporanea', 'Max Planck'),
  ('cuantica/hidrogeno',                 1913, 'contemporanea', 'Niels Bohr'),
  ('cuantica/momento_angular',           1922, 'contemporanea', 'Stern y Gerlach'),
  ('cuantica/identicas',                 1924, 'contemporanea', 'Bose y Einstein'),
  ('cuantica/espin',                     1925, 'contemporanea', 'Uhlenbeck y Goudsmit'),
  ('cuantica/schrodinger',               1926, 'contemporanea', 'Erwin Schrödinger'),
  ('cuantica/postulados',                1926, 'contemporanea', 'Max Born'),
  ('cuantica/incertidumbre',             1927, 'contemporanea', 'Werner Heisenberg'),
  ('cuantica/oscilador',                 1927, 'contemporanea', 'Paul Dirac'),
  ('cuantica/pozos',                     1928, 'contemporanea', 'George Gamow'),
  ('cuantica/formalismo',                1932, 'contemporanea', 'John von Neumann'),
  ('cuantica/interpretacion',            1964, 'contemporanea', 'John Bell')
) as v(slug, anio, era, figura)
where m.slug = v.slug;

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
-- 1. Cuántos módulos quedaron ubicados. Esperado: 35 (20 PAES + 15 cuántica),
--    y CERO sin año — si alguno queda en null, el slug del `values` no coincide
--    con el de la tabla y el `update` lo ignoró en silencio. Es el mismo modo
--    de fallo que el `left join` de `035` (ver LESSONS_LEARNED).
--
--   select count(*) filter (where historical_year is not null) as ubicados,
--          count(*) filter (where historical_year is null)     as sin_ubicar
--     from public.modules;
--
-- 2. Los que quedaron sin ubicar, si los hay:
--
--   select slug, title from public.modules where historical_year is null order by slug;
--
-- 3. La línea completa, como la verá el estudiante:
--
--   select historical_era, historical_year, historical_figure, title
--     from public.modules
--    where historical_year is not null
--    order by historical_year;
--
-- 4. El check de coherencia rechaza una era que no corresponde al año:
--   begin;
--     update public.modules set historical_era = 'antiguedad'
--      where slug = 'cuantica/origenes';   -- 1900 no es antigüedad
--   rollback;
--   -- ERROR: violates check constraint "modules_historical_era_coherente"
--
-- Reversión:
--   alter table public.modules
--     drop constraint if exists modules_historical_era_coherente,
--     drop constraint if exists modules_historical_era_valida,
--     drop column if exists historical_year,
--     drop column if exists historical_era,
--     drop column if exists historical_figure;
