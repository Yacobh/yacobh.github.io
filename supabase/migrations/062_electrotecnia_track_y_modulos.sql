-- Track `electrotecnia`: 12 módulos de Electrotecnia (circuitos DC y CA).
--
-- ⚠ QUÉ ES ESTO Y EN QUÉ SE DIFERENCIA DEL TRACK `cuantica`
-- Es el **segundo** track fuera del temario PAES M1, y sigue el patrón que dejó
-- escrito ADR-018 (migraciones 033–040): contenido nuevo es 100 % datos, sin
-- tocar una línea de ClojureScript. Pero hay una diferencia que cambia el
-- riesgo y hay que decirla arriba de todo:
--
--   · `cuantica` nació con `test_configs.active = false`: existía solo para la
--     cuenta admin, que era el único destinatario.
--   · **`electrotecnia` nace `active = true`** (migración 067, decisión del
--     owner del 2026-09-09). El destinatario es un **alumno real** que va a
--     entrar con su cuenta normal, y hoy no existe ninguna forma de mostrarle
--     un banco a un solo estudiante: la policy `test_configs_select` de 020
--     filtra `active = true or public.is_admin()`, y eso es todo.
--
-- **Consecuencia aceptada explícitamente: todo estudiante de PAES M1 va a ver
-- los 12 bancos de Electrotecnia en su selector de evaluaciones.** No es un
-- descuido ni un efecto lateral: es el precio de que el alumno de electrotecnia
-- pueda rendir el diagnóstico sin código nuevo. Está registrado como riesgo en
-- project-memory/RISKS y como decisión en adr/ADR-035-track-electrotecnia.md.
--
-- ── Por qué este track NO necesita recompilar el bundle ─────────────────────
-- `universo.bands` es el único namespace que nombra tracks
-- (`track-order` y `product-tracks`), y un track desconocido queda **fuera** de
-- `product-modules`: no recibe banda derivada. Por eso los 12 módulos de abajo
-- llevan **banda explícita** (`band_min`/`band_max`), que `bands/band-for`
-- prefiere siempre sobre la derivada, sea cual sea el track. Con eso:
--
--   · el reparto de dificultad de los módulos del producto NO se mueve — que es
--     justo lo que 060 acaba de estabilizar;
--   · el panel muestra estas bandas con `:origen :explicita`, o sea «esto lo
--     decidió alguien», que es la verdad;
--   · `clj -M:test` no cambia y `public/js/app.js` no se recompila.
--
-- Igual que en 033: `universo.topics/track-for` devuelve `nil` para estos topics
-- y `universo.profile/dominant-track` cae a su segunda regla —el prefijo del
-- slug del módulo del primer déficit—, que devuelve `"electrotecnia"`
-- correctamente. Funciona por la segunda regla, no por la primera.
--
-- ── Las bandas de abajo son hipótesis autorales, no mediciones ──────────────
-- Vale palabra por palabra lo que dice 046: una banda es una hipótesis
-- editorial. Acá el criterio es el orden en que un curso de electrotecnia
-- construye las herramientas —no se calcula una impedancia sin saber qué es un
-- fasor, ni un fasor sin saber qué es un valor eficaz—, y las bandas **se
-- solapan a propósito**, porque dentro de un mismo contenido hay ítems fáciles
-- y difíciles. La validez psicométrica solo puede venir de calibrar con
-- respuestas reales (G-2, RISKS R-17, OPEN_QUESTIONS Q-05).
--
-- Idempotente: upsert por `slug`.

-- -----------------------------------------------------------------------------
-- 1. Los dos checks de `track` admiten un valor más
-- -----------------------------------------------------------------------------
-- Mismo procedimiento de 033 y 046: no se asume el nombre de la restricción, se
-- busca el check que menciona `track` y se reemplaza, para que la migración
-- sirva igual si alguna vez fue recreada desde el dashboard.
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
                   'cuantica', 'electrotecnia'));

-- `class_slots.track` tiene su propio check restrictivo (001, ampliado en 046).
-- Si no se amplía también, no se puede publicar un cupo de electrotecnia y el
-- fallo aparece lejos de acá, al crear el cupo. Es la lección literal de 046.
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
                                    'probabilidad', 'cuantica', 'electrotecnia'));

-- -----------------------------------------------------------------------------
-- 2. Los 12 módulos del curso
-- -----------------------------------------------------------------------------
-- `order_index` arranca en 2010 y avanza de 10 en 10: deja los módulos PAES
-- (10–200) y los de cuántica (1010–1150) intactos al principio de cualquier
-- listado ordenado, y deja hueco entre módulos por si el curso crece.
--
-- El `historical_blurb` sigue el criterio de 002/004/033: historia real y
-- verificable (autor, obra, año), no anécdota decorativa.
--
-- Las bandas van de -3,0 (ley de Ohm: el piso de la escala) a 2,6 (trifásico:
-- lo último que se ve). Los tres módulos marcados ★ —reactancia, impedancia y
-- potencia en CA— son el centro del temario que motivó este track y por eso
-- concentran más ítems (ver 065 y 067), no una banda más ancha: el ancho de
-- banda describe la variación interna del contenido, no su importancia.

insert into public.modules (slug, title, track, order_index, band_min, band_max,
                            historical_blurb)
values
  ('electrotecnia/magnitudes',
   'Magnitudes eléctricas, ley de Ohm y potencia',
   'electrotecnia', 2010, -3.0, -1.7,
   $et$Georg Simon Ohm publicó "Die galvanische Kette, mathematisch bearbeitet" en 1827 y el recibimiento fue tan hostil que renunció a su cátedra en Colonia: un colega lo acusó de "herejía contra la naturaleza". La ley se aceptó desde afuera de Alemania, y la Royal Society terminó dándole la medalla Copley en 1841, catorce años después. Las tres unidades del tema vienen de tres personas distintas: el volt de Alessandro Volta (pila, 1800), el ampere de André-Marie Ampère (1820) y el watt de James Watt, que ni siquiera trabajó en electricidad.$et$),

  ('electrotecnia/dc_series_paralelo',
   'Serie, paralelo y divisores de tensión y corriente',
   'electrotecnia', 2020, -2.7, -1.3,
   $et$El puente que mide resistencias comparando dos divisores lo inventó Samuel Hunter Christie en 1833, pero se llama puente de Wheatstone porque Charles Wheatstone lo popularizó en 1843 en "An Account of Several New Instruments and Processes for Determining the Constants of a Voltaic Circuit" -- donde, dicho sea a su favor, atribuye explícitamente el invento a Christie. El principio del divisor sigue siendo la base de casi todo sensor resistivo: lo que se mide nunca es la resistencia, es una tensión.$et$),

  ('electrotecnia/kirchhoff',
   'Leyes de Kirchhoff, mallas y nodos',
   'electrotecnia', 2030, -2.3, -0.9,
   $et$Gustav Kirchhoff enunció sus dos leyes en 1845, en "Ueber den Durchgang eines elektrischen Stromes durch eine Ebene", siendo todavía estudiante en Königsberg: tenía 21 años y aún no se había graduado. La ley de nodos es conservación de la carga y la de mallas es conservación de la energía; no son leyes nuevas, son las de siempre escritas para circuitos. Kirchhoff es más conocido hoy por otra cosa: con Bunsen fundó el análisis espectral, y de ahí salió la ley del cuerpo negro que en 1900 obligó a Planck a inventar el cuanto.$et$),

  ('electrotecnia/teoremas',
   'Thévenin, Norton y superposición',
   'electrotecnia', 2040, -1.9, -0.5,
   $et$Léon Charles Thévenin, ingeniero de telégrafos francés, publicó su teorema en 1883 en los Comptes Rendus de la Académie des Sciences. No era nuevo: Hermann von Helmholtz lo había demostrado en 1853 y nadie lo había notado. El dual llegó en 1926 y también por duplicado, en el mismo año y sin contacto entre sus autores: Edward Lawry Norton lo escribió en un informe interno de Bell Labs y Hans Ferdinand Mayer lo publicó en Alemania, por lo que en la literatura europea aparece como teorema de Mayer-Norton.$et$),

  ('electrotecnia/capacitancia',
   'Capacitancia, asociación de capacitores y transitorio RC',
   'electrotecnia', 2050, -1.5, -0.1,
   $et$El primer capacitor fue accidental y doloroso. Pieter van Musschenbroek, en Leiden, recibió en 1746 la descarga de un frasco de agua cargado y escribió que no repetiría el experimento "ni por todo el reino de Francia"; Ewald von Kleist había hecho lo mismo unos meses antes en Pomerania sin que nadie le prestara atención. La unidad, en cambio, honra a Michael Faraday, que llegó al tema casi un siglo después y fue quien introdujo la idea de que lo que importa está en el dieléctrico y no en las placas.$et$),

  ('electrotecnia/magnetismo',
   'Campo magnético, inductancia y ley de Faraday-Lenz',
   'electrotecnia', 2060, -1.1, 0.3,
   $et$Hans Christian Ørsted descubrió en 1820, en medio de una clase, que una aguja imantada se desviaba al pasar corriente por un alambre cercano: el primer indicio de que electricidad y magnetismo son lo mismo. Faraday cerró el círculo el 29 de agosto de 1831 con el anillo de hierro y dos bobinados, y anotó que la aguja solo se movía al conectar y al desconectar. Heinrich Lenz agregó en 1834 la parte que más cuesta: el signo. La inducción se opone al cambio que la produce, porque si no lo hiciera tendríamos energía gratis.$et$),

  ('electrotecnia/ca_senales',
   'Corriente alterna: período, frecuencia, valor eficaz y fasores',
   'electrotecnia', 2070, -0.8, 0.6,
   $et$La "guerra de las corrientes" entre la continua de Edison y la alterna de Westinghouse y Tesla no se decidió con argumentos sino con dos obras: la iluminación de la Exposición Universal de Chicago en 1893 y la central de Niágara en 1895, ambas en alterna. La razón técnica es el transformador, que solo funciona con corriente variable. Y el valor eficaz aparece justo ahí: los 220 V de un tomacorriente no son la amplitud de la onda -- que llega a unos 311 V -- sino el valor de continua que disiparía la misma potencia.$et$),

  ('electrotecnia/reactancia',
   'Reactancia inductiva y capacitiva ★',
   'electrotecnia', 2080, -0.4, 1.0,
   $et$Charles Proteus Steinmetz presentó en 1893, ante el AIEE en Chicago, "Complex Quantities and Their Use in Electrical Engineering": el método que reemplaza las ecuaciones diferenciales de un circuito de alterna por álgebra de números complejos. Antes de eso, calcular un circuito RLC en régimen permanente era un problema de análisis; después, una cuenta. Steinmetz era un refugiado prusiano jorobado y socialista que General Electric contrató casi de casualidad, y terminó siendo el ingeniero que le enseñó a la industria a calcular en alterna.$et$),

  ('electrotecnia/impedancia',
   'Impedancia y admitancia: RLC en serie y en paralelo ★',
   'electrotecnia', 2090, 0.0, 1.4,
   $et$La palabra "impedancia" la acuñó Oliver Heaviside en 1886, en las páginas de The Electrician, y no fue la única: también son suyas "inductancia", "admitancia", "conductancia", "permeabilidad" y "reluctancia". Heaviside era un operador de telégrafo autodidacta, sordo y sin título, que además reescribió las veinte ecuaciones de Maxwell en las cuatro que hoy se estudian. El vocabulario entero de este módulo lo inventó alguien que nunca pisó una universidad.$et$),

  ('electrotecnia/potencia_ca',
   'Potencia activa, reactiva, aparente y factor de potencia ★',
   'electrotecnia', 2100, 0.4, 1.8,
   $et$La corriente que no entrega potencia se llamó durante años "corriente sin vatios" (wattless current), y era un problema económico antes que teórico: la distribuidora tiene que dimensionar conductores y transformadores para la corriente total, aunque solo cobre la parte activa. Por eso las tarifas industriales penalizan el factor de potencia bajo hasta hoy. André Blondel demostró en 1893 el teorema que dice cuántos vatímetros hacen falta para medir la potencia de un sistema polifásico: uno menos que la cantidad de conductores.$et$),

  ('electrotecnia/resonancia',
   'Resonancia serie y paralelo, factor de calidad y ancho de banda',
   'electrotecnia', 2110, 0.8, 2.2,
   $et$Heinrich Hertz usó circuitos resonantes en 1887 para generar y detectar ondas electromagnéticas: su receptor era una espira con un micrométrico entrehierro, sintonizada al emisor. Oliver Lodge patentó en 1897 la sintonía -- lo que él llamó "sintonización sintónica" -- y Marconi obtuvo en 1900 la patente británica 7777, la de los "cuatro sietes", por el sistema de cuatro circuitos resonantes que permitió que dos estaciones se hablaran sin interferirse. Toda la radio del siglo XX salió de que un RLC responde a una frecuencia y rechaza el resto.$et$),

  ('electrotecnia/trifasico',
   'Sistemas trifásicos: estrella, triángulo y potencia',
   'electrotecnia', 2120, 1.2, 2.6,
   $et$Mikhail Dolivo-Dobrovolsky, ingeniero de AEG, construyó en 1889 el primer motor de inducción trifásico y en 1891 transmitió energía desde Lauffen hasta la Exposición Electrotécnica de Frankfurt: 175 km a 15 kV, con un rendimiento del orden del 75 %, que era lo que había que demostrar para que la alterna ganara. Las conexiones estrella y triángulo, y el factor raíz de tres que las relaciona, son suyas. El sistema trifásico es probablemente la infraestructura técnica más antigua que todavía usamos sin modificaciones de fondo.$et$)

on conflict (slug) do update
  set title            = excluded.title,
      track            = excluded.track,
      order_index      = excluded.order_index,
      band_min         = excluded.band_min,
      band_max         = excluded.band_max,
      historical_blurb = excluded.historical_blurb;

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select slug, title, order_index, band_min, band_max
--     from public.modules where track = 'electrotecnia' order by order_index;
--   -- 12 filas, order_index 2010..2120, ninguna banda nula
--
--   select track, count(*) from public.modules group by track order by track;
--   -- `electrotecnia` = 12. Los demás tracks deben traer EXACTAMENTE el mismo
--   -- número que antes de aplicar esto: correr esta consulta antes y después y
--   -- comparar, en vez de confiar en un número escrito acá (lección L-22).
--
--   -- Ninguna banda invertida ni fuera de escala (lo garantiza el check
--   -- `modules_band_coherente` de 046, pero conviene verlo):
--   select slug from public.modules
--    where track = 'electrotecnia'
--      and (band_min is null or band_max is null or band_min >= band_max);
--   -- 0 filas
--
--   -- Los módulos del producto NO se movieron: sus bandas explícitas siguen
--   -- siendo las de 049/051/053/055/060.
--   select count(*) from public.modules
--    where track in ('aritmetica','algebra','geometria','probabilidad')
--      and band_min is null;                                          -- 0
--
-- Reversión (borra también sus recursos por el `on delete cascade` de
-- `resources.module_id`, y deja los ítems en `module_id = null`):
--   delete from public.modules where track = 'electrotecnia';
--   alter table public.modules drop constraint modules_track_check;
--   alter table public.modules add constraint modules_track_check
--     check (track in ('aritmetica','algebra','geometria','probabilidad','cuantica'));
--   alter table public.class_slots drop constraint class_slots_track_check;
--   alter table public.class_slots add constraint class_slots_track_check
--     check (track is null or track in ('aritmetica','algebra','geometria',
--                                       'probabilidad','cuantica'));
