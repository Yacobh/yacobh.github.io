-- EXPERIMENTO · Track `cuantica`: 15 módulos de Mecánica Cuántica.
--
-- ⚠ QUÉ ES ESTO Y QUÉ NO ES
-- Esto NO es contenido del producto. Academia Integral prepara PAES M1
-- (CLAUDE.md §1). Este track es un **experimento de estudio personal del
-- autor** para su propio examen de Mecánica Cuántica, montado sobre el mismo
-- motor IRT para no construir nada nuevo: el diagnóstico adaptativo, la capa 0
-- de misconceptions y la capa 1 de recursos son agnósticos del temario.
--
-- Decisión, alcance y salvaguardas en adr/ADR-018-track-experimental-cuantica.md.
--
-- ── Por qué el estudiante de PAES no ve nada de esto ────────────────────────
-- El selector de evaluaciones lee `test_configs` bajo la policy
-- `test_configs_select` (020), que para un no-admin filtra `active = true`.
-- Los 15 bancos de este experimento se siembran con **`active = false`**
-- (migración 037): existen solo para `public.is_admin()`. Los recursos nacen
-- con `published = false`, igual que 018/019 (BL-01, ADR-016 §1).
--
-- Los módulos SÍ son legibles por cualquier autenticado (`modules_select_auth`
-- es `using true`, 001). Es aceptado a propósito: un módulo es un rótulo con
-- un blurb histórico, no contenido, y solo aparece en "Mi plan" si un déficit
-- apunta a él — cosa que exige haber rendido un test que el estudiante no
-- puede ver. Restringir esa policy tocaría el camino crítico del producto para
-- proteger 15 títulos; no vale el riesgo.
--
-- ── Espejo en ClojureScript: NO se toca a propósito ─────────────────────────
-- `universo.topics/module-slugs` no lista estos módulos y el test
-- `topics_test.cljs` sigue afirmando `(= 20 (count module-slugs))`. Es correcto
-- así: ese set existe para verificar que ningún **mapeo explícito
-- topic→módulo** apunte a un slug inexistente, y este experimento no agrega
-- ningún mapeo — cada ítem trae su `module_id` escrito por esta migración, y
-- `universo.profile/module-slug-for` prefiere el `module_slug` que devuelve el
-- RPC `next_question` (024) por sobre cualquier inferencia del cliente.
-- Consecuencia asumida: `universo.topics/track-for` devuelve `nil` para estos
-- topics y `universo.profile/dominant-track` cae a su segunda regla (el prefijo
-- del slug del módulo del primer déficit), que devuelve `"cuantica"`. Correcto
-- sin recompilar el bundle: **este experimento es 100 % datos**.
--
-- Idempotente: upsert por `slug`.

-- -----------------------------------------------------------------------------
-- 1. El check de `track` deja de ser una lista cerrada de tres tracks PAES
-- -----------------------------------------------------------------------------
-- `001_mvp_schema.sql` creó `track text not null check (track in ('aritmetica',
-- 'algebra', 'geometria'))` con nombre automático. No se asume ese nombre: se
-- busca el check que menciona `track` y se reemplaza, para que la migración
-- sirva igual si la restricción fue recreada alguna vez desde el dashboard.
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
  check (track in ('aritmetica', 'algebra', 'geometria', 'cuantica'));

-- -----------------------------------------------------------------------------
-- 2. Los 15 módulos del curso
-- -----------------------------------------------------------------------------
-- `order_index` arranca en 1010 y avanza de 10 en 10: deja los módulos PAES
-- (10–200) intactos al principio de cualquier listado ordenado, y deja hueco
-- entre módulos por si el curso crece.
--
-- El `historical_blurb` sigue el criterio de 002/004: historia real y
-- verificable (autor, obra, año), no anécdota decorativa. Todas las
-- atribuciones de abajo son contrastables con la bibliografía de
-- `docs/libros mecanica cuantica/`.

insert into public.modules (slug, title, track, order_index, historical_blurb)
values
  ('cuantica/origenes',
   'Orígenes: la crisis de la física clásica',
   'cuantica', 1010,
   'Max Planck introdujo el cuanto de acción en diciembre de 1900 para ajustar la curva del cuerpo negro, y él mismo lo describió años después como "un acto de desesperación": no creía estar fundando una teoría nueva. Einstein (1905) tomó el cuanto en serio para explicar el efecto fotoeléctrico, Bohr (1913) lo usó para estabilizar el átomo y De Broglie (1924) le devolvió la simetría al proponer que también la materia es onda.'),

  ('cuantica/formalismo',
   'Formalismo: espacio de Hilbert y notación de Dirac',
   'cuantica', 1020,
   'La notación de bras y kets es de Paul Dirac, que la presentó en "A New Notation for Quantum Mechanics" (Proc. Cambridge Phil. Soc., 1939) partiendo el corchete inglés bracket en bra-c-ket. La estructura matemática que hay debajo -- el espacio de Hilbert y los operadores autoadjuntos -- la había fijado antes John von Neumann en Mathematische Grundlagen der Quantenmechanik (1932), el libro que demostró que la mecánica matricial de Heisenberg y la ondulatoria de Schrödinger eran la misma teoría.'),

  ('cuantica/postulados',
   'Postulados, medida y regla de Born',
   'cuantica', 1030,
   'La interpretación probabilística del cuadrado de la función de onda apareció en 1926, en una nota al pie agregada por Max Born a su artículo sobre colisiones "Zur Quantenmechanik der Stoßvorgänge": en el cuerpo del texto había escrito la amplitud, y en la corrección de pruebas añadió que lo que da la probabilidad es su módulo al cuadrado. Esa nota al pie le valió el Nobel en 1954.'),

  ('cuantica/incertidumbre',
   'Conmutadores, compatibilidad e incertidumbre',
   'cuantica', 1040,
   'Werner Heisenberg publicó el principio en 1927 ("Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik") con un argumento de microscopio: perturbar para observar. La desigualdad con la forma exacta que hoy se usa, con el ħ/2, se la debemos a Earle Kennard ese mismo año, y Howard Robertson la generalizó en 1929 a un par cualquiera de observables mediante su conmutador -- el paso de "no se puede medir bien" a "la teoría no les asigna valores simultáneos".'),

  ('cuantica/schrodinger',
   'Ecuación de Schrödinger y evolución temporal',
   'cuantica', 1050,
   'Erwin Schrödinger publicó en 1926 cuatro artículos con el mismo título, "Quantisierung als Eigenwertproblem" (la cuantización como problema de autovalores). El nombre lo dice todo: los números cuánticos dejaron de postularse, como en Bohr, y pasaron a salir solos de exigir soluciones aceptables a una ecuación diferencial, igual que los armónicos de una cuerda salen de fijar sus extremos.'),

  ('cuantica/pozos',
   'Potenciales unidimensionales: pozos, escalón y efecto túnel',
   'cuantica', 1060,
   'El efecto túnel dejó de ser una curiosidad matemática en 1928, cuando George Gamow -- y de forma independiente Ronald Gurney y Edward Condon -- explicó con él la desintegración alfa: la partícula no salta la barrera nuclear, la atraviesa. El modelo dio cuenta de vidas medias que varían en más de veinte órdenes de magnitud usando un solo mecanismo, y es el argumento histórico más fuerte de que el efecto es real y no un artefacto del formalismo.'),

  ('cuantica/oscilador',
   'Oscilador armónico y operadores escalera',
   'cuantica', 1070,
   'El oscilador anarmónico fue, literalmente, el primer problema de la mecánica cuántica: es el que Heisenberg calculó en la isla de Helgoland en 1925 y publicó en "Über quantentheoretische Umdeutung kinematischer und mechanischer Beziehungen", el artículo donde aparecen sin nombrarlas las matrices. El método algebraico con a y a-daga, que evita resolver la ecuación diferencial, es de Dirac.'),

  ('cuantica/momento_angular',
   'Momento angular: álgebra, L², Lz y operadores escalera',
   'cuantica', 1080,
   'Que los autovalores del momento angular se obtengan del puro álgebra de conmutadores, sin resolver ninguna ecuación diferencial, es el hallazgo de la Dreimännerarbeit -- el "trabajo de los tres hombres" de Born, Heisenberg y Jordan (1926). Wolfgang Pauli lo demostró en el caso más duro ese mismo año: resolvió el espectro del hidrógeno solo con relaciones de conmutación, antes de que existiera la ecuación de Schrödinger.'),

  ('cuantica/armonicos_esfericos',
   'Armónicos esféricos y el problema de potencial central',
   'cuantica', 1090,
   'Los armónicos esféricos son un siglo y medio más viejos que la mecánica cuántica: Laplace y Legendre los introdujeron en la década de 1780 para el problema de la atracción gravitatoria de un esferoide. La teoría cuántica no los inventó, los heredó: cualquier potencial que solo dependa de la distancia -- gravitatorio o de Coulomb -- separa igual sus variables angulares.'),

  ('cuantica/espin',
   'Espín 1/2, matrices de Pauli y Stern-Gerlach',
   'cuantica', 1100,
   'El experimento de Stern y Gerlach (1922) partió un haz de plata en dos tres años antes de que existiera el concepto de espín, y se leyó como confirmación de la cuantización espacial de Bohr-Sommerfeld: la interpretación correcta llegó después. El espín lo propusieron los estudiantes Uhlenbeck y Goudsmit en 1925 y Pauli, que al principio se opuso, le dio en 1927 la forma matricial de 2x2 que hoy lleva su nombre.'),

  ('cuantica/suma_momentos',
   'Suma de momentos angulares y coeficientes de Clebsch-Gordan',
   'cuantica', 1110,
   'Los coeficientes llevan el nombre de Alfred Clebsch y Paul Gordan, dos matemáticos del siglo XIX que trabajaban en teoría de invariantes y jamás oyeron hablar de un átomo. Eugene Wigner mostró en Gruppentheorie und ihre Anwendung auf die Quantenmechanik der Atomspektren (1931) que acoplar dos momentos angulares es descomponer un producto de representaciones del grupo de rotaciones -- exactamente el mismo problema algebraico.'),

  ('cuantica/hidrogeno',
   'Átomo de hidrógeno y potencial central',
   'cuantica', 1120,
   'El hidrógeno se resolvió dos veces en 1926 y por dos caminos incompatibles en apariencia: Pauli lo hizo en enero con álgebra de operadores, usando el vector de Runge-Lenz que venía de la mecánica celeste; Schrödinger, semanas después, como problema de autovalores de una ecuación diferencial. Que la energía no dependa de l -- la llamada degeneración accidental -- se entendió recién en 1935, cuando Vladimir Fock mostró que se debe a una simetría oculta más grande que la rotacional.'),

  ('cuantica/perturbaciones',
   'Teoría de perturbaciones y método variacional',
   'cuantica', 1130,
   'El método se llama de Rayleigh-Schrödinger porque Lord Rayleigh lo había usado en su Theory of Sound (1877) para corregir las frecuencias de una cuerda con densidad no uniforme; Schrödinger lo trasladó en 1926 a su ecuación. La idea es más vieja todavía: viene de la mecánica celeste, de calcular cuánto desvía Júpiter la órbita de un planeta que, sin él, sería una elipse exacta.'),

  ('cuantica/identicas',
   'Partículas idénticas y principio de exclusión',
   'cuantica', 1140,
   'Pauli formuló el principio de exclusión en 1925 como una regla empírica para salvar la tabla periódica, sin justificarla. Las dos estadísticas posibles llegaron enseguida -- Bose y Einstein (1924) para una, Fermi y Dirac (1926) para la otra -- y la conexión con el espín, el teorema espín-estadística, la demostró el propio Pauli recién en 1940, ya dentro de la teoría cuántica de campos relativista.'),

  ('cuantica/interpretacion',
   'Medida, EPR y desigualdades de Bell',
   'cuantica', 1150,
   'Einstein, Podolsky y Rosen publicaron en 1935 el argumento con el que pretendían mostrar que la mecánica cuántica es incompleta. Durante casi treinta años se lo consideró filosofía, hasta que John Bell demostró en 1964, en "On the Einstein Podolsky Rosen Paradox", que la disputa era experimental: cualquier teoría de variables ocultas locales obedece una desigualdad que la mecánica cuántica viola. Los experimentos que la midieron -- Clauser, Aspect, Zeilinger -- recibieron el Nobel de Física en 2022.')

on conflict (slug) do update
  set title = excluded.title,
      track = excluded.track,
      order_index = excluded.order_index,
      historical_blurb = excluded.historical_blurb;

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select slug, title, order_index
--     from public.modules where track = 'cuantica' order by order_index;
--   -- 15 filas
--
--   select track, count(*) from public.modules group by track order by track;
--   -- aritmetica 7 · algebra 6 · geometria 7 · cuantica 15
--
-- Reversión (borra también sus recursos por el `on delete cascade` de
-- `resources.module_id`, y deja los ítems en `module_id = null`):
--   delete from public.modules where track = 'cuantica';
--   alter table public.modules drop constraint modules_track_check;
--   alter table public.modules add constraint modules_track_check
--     check (track in ('aritmetica', 'algebra', 'geometria'));
