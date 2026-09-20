-- Track `electronica`: cinco módulos de circuitos de **corriente continua**,
-- desde cero y para corregir errores.
--
-- ── PARA QUIÉN, QUE ES LO QUE DECIDE TODO LO DEMÁS ─────────────────────────
-- No es un track especulativo. El destinatario es un curso real: **alumnos de
-- 16–17 años de la especialidad de técnico en electrónica**, a los que el owner
-- les hace clase, que **llegan con muchas fallas de base** y para quienes el
-- track `electrotecnia` (`062`–`066`, aplicado) **queda muy alto**.
--
-- De ahí salen cuatro restricciones, y ninguna es de gusto:
--
--   1. **Solo continua.** Nada de fasores, valor eficaz, reactancia, impedancia,
--      resonancia ni trifásico. Eso ya es `electrotecnia` y es exactamente lo
--      que les queda alto.
--   2. **Correctivo, no de cobertura.** El entregable no es «pasar la materia»:
--      es el **mapa de errores**. Los distractores no se inventan — salen de lo
--      que el profesor ve en el aula.
--   3. **Aritmética de cabeza.** Una magnitud por vez, un despeje por vez, dos
--      operaciones como máximo. Si un ítem pide calculadora, es de
--      `electrotecnia`.
--   4. **`C = Q/V` explícita**, antes de cualquier asociación de capacitores.
--
-- Plan completo, con las cuatro reglas de frontera F1–F4 que separan este track
-- de `electrotecnia`: `../project-memory/PLAN_TRACK_ELECTRONICA.md`.
--
-- ── QUÉ HACE ESTA MIGRACIÓN Y QUÉ NO ───────────────────────────────────────
-- Hace el **lugar**: el track, los cinco módulos con su banda explícita, su
-- historia y el grafo de prerrequisitos. **No trae un solo ítem** — eso es
-- `072`…`076`, y depende del catálogo de errores del curso, que es lo único que
-- no puede escribir ni un agente ni un libro.
--
-- Es **puramente aditiva**: amplía dos checks, inserta cinco filas en `modules`
-- y cuatro en `module_prerequisites`. No modifica ninguna fila existente y **no
-- mueve la banda de ningún módulo del producto** (ver abajo).
--
-- ── POR QUÉ NO RECOMPILA EL BUNDLE ─────────────────────────────────────────
-- `universo.bands` es el único namespace que nombra tracks (`track-order` y
-- `product-tracks`), y un track desconocido queda **fuera** de `product-modules`:
-- no recibe banda derivada. Por eso los cinco módulos llevan **banda explícita**
-- (`band_min`/`band_max`), que `bands/band-for` prefiere siempre sobre la
-- derivada. Con eso el reparto de los 26 módulos del producto **no se mueve**,
-- que es justo lo que `060` estabilizó.
--
-- ⚠️ Lo que **sí** necesita el bundle es otra cosa y va aparte (T-157): los
-- cinco slugs en `universo.topics/module-slugs` y sus cinco topics en
-- `explicit-topic->module-slug`. Sin eso el déficit sale `unknown/*` y **«Mi
-- plan» no se puede personalizar**, con todo en verde y ningún auditor
-- encendido — es lo que le pasó a 218 ítems hasta T-152.
--
-- ── LAS BANDAS SON HIPÓTESIS AUTORALES, NO MEDICIONES ──────────────────────
-- Vale palabra por palabra lo que dicen `046` y `062`. El criterio acá es el
-- orden en que se construyen las herramientas —no se despeja una ley sin saber
-- leer un prefijo, no se plantea una malla sin saber la ley de Ohm— y las bandas
-- **se solapan a propósito**, porque dentro de un contenido hay ítems fáciles y
-- difíciles. La validez psicométrica solo puede venir de calibrar con respuestas
-- reales (G-2, ../project-memory/RISKS R-17, OPEN_QUESTIONS Q-05).
--
-- **Bajan respecto de `electrotecnia`**, y ésa es la razón de existir del track:
-- `electrotecnia/magnitudes` abre en −3,0 mezclando Ohm **y** potencia; acá Ohm
-- solo abre en −2,8 y la notación científica, que es el piso real, en −3,0.
--
-- Idempotente: upsert por `slug`, y los prerrequisitos por su clave compuesta.

-- -----------------------------------------------------------------------------
-- 1. Los dos checks de `track` admiten un valor más
-- -----------------------------------------------------------------------------
-- Mismo procedimiento de `033`, `046` y `062`: no se asume el nombre de la
-- restricción, se busca el check que menciona `track` y se reemplaza, para que
-- la migración sirva igual si alguna vez fue recreada desde el dashboard.
--
-- ⚠️ **Son dos tablas, no una.** `class_slots.track` tiene su propio check, y si
-- no se amplía también, el fallo aparece lejos de acá —al intentar publicar un
-- cupo de electrónica— y con un mensaje que no menciona esta migración. Es la
-- lección literal de `046`, que `062` ya tuvo que repetir.
do $$
declare
  c record;
begin
  for c in
    select con.conname
      from pg_constraint con
      join pg_class rel on rel.oid = con.conrelid
      join pg_namespace ns on ns.oid = rel.relnamespace
     where ns.nspname = 'public'
       and rel.relname = 'modules'
       and con.contype = 'c'
       and pg_get_constraintdef(con.oid) ilike '%track%'
  loop
    execute format('alter table public.modules drop constraint %I', c.conname);
  end loop;
end
$$;

alter table public.modules
  add constraint modules_track_check
  check (track in ('aritmetica', 'algebra', 'geometria', 'probabilidad',
                   'cuantica', 'electrotecnia', 'electronica'));

do $$
declare
  c record;
begin
  for c in
    select con.conname
      from pg_constraint con
      join pg_class rel on rel.oid = con.conrelid
      join pg_namespace ns on ns.oid = rel.relnamespace
     where ns.nspname = 'public'
       and rel.relname = 'class_slots'
       and con.contype = 'c'
       and pg_get_constraintdef(con.oid) ilike '%track%'
  loop
    execute format('alter table public.class_slots drop constraint %I', c.conname);
  end loop;
end
$$;

alter table public.class_slots
  add constraint class_slots_track_check
  check (track is null or track in ('aritmetica', 'algebra', 'geometria',
                                    'probabilidad', 'cuantica', 'electrotecnia',
                                    'electronica'));

-- -----------------------------------------------------------------------------
-- 2. Los cinco módulos
-- -----------------------------------------------------------------------------
-- `order_index` arranca en 3010 y avanza de 10 en 10: deja los del producto
-- (10–200), los de cuántica (1010–1150) y los de electrotecnia (2010–2120)
-- intactos al principio de cualquier listado ordenado, y deja hueco por si el
-- curso crece.
--
-- ⭐ **Las cuatro columnas históricas van completas, no solo el blurb.** `042` es
-- la única migración que escribe `historical_year`, y por eso **33 de los 53
-- módulos están fuera de la línea del tiempo** — entre ellos los 12 de
-- `electrotecnia`, que `062` dio de alta con `historical_blurb` y sin año
-- (T-154, y es el lugar A10 del mapa de la unidad, que hasta el 2026-09-18 ni
-- siquiera estaba en el mapa). Un módulo sin año **desaparece de la línea del
-- tiempo en silencio**: `timeline/milestones` lo descarta sin avisar. Acá no se
-- repite.
--
-- El criterio del blurb es el de `002`/`033`/`062`: historia real y verificable
-- —autor, obra, año—, no anécdota decorativa.
--
-- ⚠️ **`electronica/leyes_de_kirchhoff` y no `electronica/kirchhoff`**, que era
-- el nombre natural. `electrotecnia/kirchhoff` ya existe, y **el sufijo del slug
-- tiene que ser único en todo el sistema**: `universo.topics/suffix-match`
-- resuelve `enteros → aritmetica/enteros` buscando una coincidencia **única**, y
-- con dos candidatos devuelve `nil`. O sea que el choque no habría roto solo el
-- módulo nuevo: habría **dejado de resolver el de electrotecnia, que ya está
-- aplicado**, en silencio. Hay un test que lo vigila
-- (`topics_test.cljs`: «dos módulos con el mismo sufijo romperían la regla de
-- coincidencia») y acá se respeta antes de escribirlo.

insert into public.modules (slug, title, track, order_index, band_min, band_max,
                            historical_year, historical_era, historical_figure,
                            historical_blurb)
values
  ('electronica/notacion_cientifica',
   'Notación científica y prefijos',
   'electronica', 3010, -3.0, -1.8,
   1793, 'moderna', 'Antoine Lavoisier y la Comisión del Sistema Métrico',
   $en$Los prefijos que hoy se escriben sin pensar —kilo, mili, micro— son una decisión política tanto como técnica: salieron de la Comisión del Sistema Métrico de la Francia revolucionaria, que en 1793 fijó las raíces griegas para los múltiplos y las latinas para los submúltiplos, precisamente para que nadie pudiera reclamarlos como propios de un país. "Micro" y "mega" recién se hicieron oficiales en 1960, y "nano" y "pico" en la misma tanda. La razón de que un capacitor se mida en microfaradios y no en faradios es que el faradio, definido a partir del culombio y el voltio, resultó ser una unidad monstruosa: un capacitor de 1 F no existía en los laboratorios donde se definió.$en$),

  ('electronica/ley_de_ohm',
   'Ley de Ohm',
   'electronica', 3020, -2.8, -1.6,
   1827, 'moderna', 'Georg Simon Ohm',
   $en$Georg Simon Ohm publicó "Die galvanische Kette, mathematisch bearbeitet" en 1827 y el recibimiento fue tan hostil que renunció a su cátedra en Colonia: un colega lo acusó de "herejía contra la naturaleza", porque medir la electricidad con una fórmula parecía rebajarla. La ley se aceptó desde afuera de Alemania y la Royal Society terminó dándole la medalla Copley en 1841, catorce años después. Las tres unidades del tema vienen de tres personas distintas: el volt de Alessandro Volta (pila, 1800), el ampere de André-Marie Ampère (1820) y el ohm de él mismo, puesto por otros.$en$),

  ('electronica/potencia',
   'Potencia y energía en continua',
   'electronica', 3030, -2.4, -1.2,
   1841, 'moderna', 'James Prescott Joule',
   $en$James Prescott Joule midió en 1841, con un calorímetro casero, que el calor que suelta un conductor crece con el **cuadrado** de la corriente y no con la corriente: es la ley que lleva su nombre y la razón de que un cable que aguanta 10 A se queme con 20. Joule era cervecero, no académico, y la Royal Society le rechazó el trabajo; lo publicó en una revista menor. La unidad de energía es suya y la de potencia es de James Watt, que ni siquiera trabajó en electricidad: definió el caballo de fuerza para venderle máquinas de vapor a gente que razonaba en caballos.$en$),

  ('electronica/capacitores',
   'Capacitancia y capacitores',
   'electronica', 3040, -2.2, -1.0,
   1746, 'moderna', 'Pieter van Musschenbroek y la botella de Leyden',
   $en$El primer capacitor fue accidental y doloroso. Pieter van Musschenbroek, en Leiden, recibió en 1746 la descarga de un frasco de agua cargado y escribió que no repetiría el experimento "ni por todo el reino de Francia"; Ewald von Kleist había hecho lo mismo unos meses antes en Pomerania sin que nadie le prestara atención. La unidad, en cambio, honra a Michael Faraday, que llegó casi un siglo después y aportó la idea que este módulo pone primero: lo que importa no es cuánta carga hay, sino **cuánta carga por cada volt** — que es exactamente lo que dice C = Q/V.$en$),

  ('electronica/leyes_de_kirchhoff',
   'Leyes de Kirchhoff en continua',
   'electronica', 3050, -1.8, -0.6,
   1845, 'moderna', 'Gustav Kirchhoff',
   $en$Gustav Kirchhoff enunció sus dos leyes en 1845, en "Ueber den Durchgang eines elektrischen Stromes durch eine Ebene", siendo todavía estudiante en Königsberg: tenía 21 años y aún no se había graduado. No son leyes nuevas y eso es lo que las hace fáciles de creer: la de nodos es conservación de la carga —lo que entra sale— y la de mallas es conservación de la energía —si volvés al punto de partida, subiste y bajaste lo mismo—. Kirchhoff es más conocido hoy por otra cosa: con Bunsen fundó el análisis espectral, y de ahí salió la ley del cuerpo negro que en 1900 obligó a Planck a inventar el cuanto.$en$)

on conflict (slug) do update
  set title             = excluded.title,
      track             = excluded.track,
      order_index       = excluded.order_index,
      band_min          = excluded.band_min,
      band_max          = excluded.band_max,
      historical_year   = excluded.historical_year,
      historical_era    = excluded.historical_era,
      historical_figure = excluded.historical_figure,
      historical_blurb  = excluded.historical_blurb;

-- -----------------------------------------------------------------------------
-- 3. El camino: `module_prerequisites`
-- -----------------------------------------------------------------------------
-- ⚠️ **Hoy ningún namespace lee esta tabla** (ADR-038 lo dice explícitamente:
-- `045` la creó justo para esto y está vacía). Se puebla igual, por dos razones
-- concretas y no por prolijidad:
--
--   · es **el camino curricular documentado**, que es lo que `045` pide en su
--     campo `rationale`: una frase para el profesor, para que el grafo no se
--     llene de dependencias que nadie recuerda haber decidido;
--   · es **el insumo de T-149** cuando ADR-038 se implemente, y de ADR-029, que
--     manda un escape al prerrequisito **duro**.
--
-- El mecanismo que **sí** funciona hoy es `test_configs.prerequisite_topic`, y
-- va en `077`. Los dos tienen que decir lo mismo.
--
-- ⭐ **`capacitores` NO cuelga de `ley_de_ohm`, y es deliberado.** `C = Q/V` no
-- necesita la ley de Ohm para nada; lo que sí necesita —y mucho— es saber qué es
-- un µF y qué es un nF. Efecto práctico en un curso con fallas de base: **un
-- alumno trabado en Ohm igual puede avanzar en capacitores** en vez de quedarse
-- sin nada que rendir.
--
--     notacion_cientifica  (raíz)
--        ├── ley_de_ohm
--        │      ├── potencia
--        │      └── leyes_de_kirchhoff
--        └── capacitores
--
-- Las cuatro aristas son `duro`: en este track no hay atajos, y un escape
-- (ADR-029) tiene que tener a dónde mandar al estudiante.

insert into public.module_prerequisites (module_id, prerequisite_module_id,
                                         strength, rationale)
select m.id, p.id, v.strength, v.rationale
  from (values
    ('electronica/ley_de_ohm', 'electronica/notacion_cientifica', 'duro',
     'Un resultado de 0,0022 A no se puede ni leer ni comprobar sin prefijos: el alumno despeja bien y descarta su propia respuesta porque "da un número raro".'),
    ('electronica/potencia', 'electronica/ley_de_ohm', 'duro',
     'P = I²R y P = V²/R son la ley de Ohm sustituida adentro de P = V·I. Sin el despeje automatizado, son tres fórmulas sueltas que se memorizan y se confunden.'),
    ('electronica/leyes_de_kirchhoff', 'electronica/ley_de_ohm', 'duro',
     'Una malla se resuelve escribiendo la caída de cada resistor como I·R. Kirchhoff aporta el signo y el balance; la ley de Ohm aporta cada término.'),
    ('electronica/capacitores', 'electronica/notacion_cientifica', 'duro',
     'Los capacitores del taller se miden en µF, nF y pF, nunca en F. Sin prefijos no se puede ni comparar dos capacitores, y menos sumarlos. NO cuelga de la ley de Ohm: C = Q/V no la usa.')
  ) as v(module_slug, prereq_slug, strength, rationale)
  join public.modules m on m.slug = v.module_slug
  join public.modules p on p.slug = v.prereq_slug
on conflict (module_id, prerequisite_module_id) do update
  set strength  = excluded.strength,
      rationale = excluded.rationale;

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano después de aplicar; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- -- (a) Los cinco módulos, en orden, con su banda.
-- select slug, title, order_index, band_min, band_max
--   from public.modules where track = 'electronica' order by order_index;
--   → esperado: 5 filas, de [-3,0 · -1,8] a [-1,8 · -0,6]
--
-- -- (b) ⭐ Ninguno se cae de la línea del tiempo (A10, T-154).
-- select count(*) filter (where historical_year is null) as sin_anio,
--        count(*) filter (where historical_era is null)  as sin_era,
--        count(*) filter (where historical_blurb is null) as sin_blurb
--   from public.modules where track = 'electronica';
--   → esperado: 0 | 0 | 0
--
-- -- -- (c-bis) ⚠️ Ningún sufijo repetido en todo el sistema (ver la nota de §2).
-- select split_part(slug,'/',2) as sufijo, count(*), string_agg(slug,', ')
--   from public.modules group by 1 having count(*) > 1;
--   → esperado: 0 filas
--
-- -- (c) El grafo, legible.
-- select m.slug as modulo, p.slug as prerrequisito, mp.strength
--   from public.module_prerequisites mp
--   join public.modules m on m.id = mp.module_id
--   join public.modules p on p.id = mp.prerequisite_module_id
--  where m.track = 'electronica' order by m.order_index;
--   → esperado: 4 filas, todas 'duro', y `capacitores` colgando de
--     `notacion_cientifica` (NO de `ley_de_ohm`)
--
-- -- (d) ⚠️ Las bandas del producto NO se movieron. Correr ANTES y DESPUÉS y
-- --     comparar: tienen que dar exactamente lo mismo.
-- select slug, band_min, band_max from public.modules
--  where track in ('aritmetica','algebra','geometria','probabilidad')
--  order by track, order_index;
--
-- -- (e) Todavía no hay nada que rendir, y es correcto: los ítems son 072..076
-- --     y el test_configs es 077.
-- select count(*) from public.questions q
--   join public.modules m on m.id = q.module_id where m.track = 'electronica';
--   → esperado: 0
--
-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
-- -- El orden importa: primero las aristas, después los módulos.
-- delete from public.module_prerequisites
--  where module_id in (select id from public.modules where track = 'electronica')
--     or prerequisite_module_id in (select id from public.modules where track = 'electronica');
-- delete from public.modules where track = 'electronica';
-- alter table public.modules drop constraint if exists modules_track_check;
-- alter table public.modules add constraint modules_track_check
--   check (track in ('aritmetica','algebra','geometria','probabilidad',
--                    'cuantica','electrotecnia'));
-- alter table public.class_slots drop constraint if exists class_slots_track_check;
-- alter table public.class_slots add constraint class_slots_track_check
--   check (track is null or track in ('aritmetica','algebra','geometria',
--                                     'probabilidad','cuantica','electrotecnia'));
--
-- ⚠️ **Ese último paso falla si ya se publicó algún cupo de electrónica**, y es
-- correcto que falle: el check nuevo no puede validar filas que ya existen.
-- Medido al verificar la reversión. Si pasa, primero hay que decidir qué se hace
-- con esos cupos —no los borra esta reversión, porque tienen inscritos— y
-- recién después angostar el check.
