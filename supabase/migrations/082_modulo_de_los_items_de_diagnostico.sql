-- Asigna módulo a los 28 ítems del banco `diagnostico` que no tenían.
--
-- ── Qué pasaba ─────────────────────────────────────────────────────────────
-- `diagnostico` es el único banco que cubre **varios** módulos (fracciones,
-- operaciones, enteros, álgebra), así que la regla por topic de `029`/`030`
-- no puede asignarle uno: cada ítem necesita el suyo. 36 de los 64 lo tenían
-- (16 `aritmetica/fracciones`, 20 `aritmetica/operaciones_fundamentales`) y
-- **28 no**, entre ellos **todo el álgebra**.
--
-- Una respuesta sin módulo no entra al déficit por módulo
-- (`profile/deficits-from-responses`), no trae recursos y no mueve el plan.
-- Medido el 2026-09-22 sobre el curso de ese día (28 estudiantes): **485 de
-- las 781 respuestas** eran de ítems sin módulo, incluidas las tres de álgebra
-- más falladas (#95, #96, #97, con 43 %, 40 % y 39 % de acierto).
-- `/aula` las mostraba como un módulo vacío.
--
-- ── Criterio ───────────────────────────────────────────────────────────────
-- Se clasificó cada ítem por lo que pide, **siguiendo cómo el banco ya
-- clasifica ítems iguales**, no por una lectura nueva del temario:
--   · ecuación cuadrática por factorización → `algebra/ecuaciones`, como el
--     ítem de topic `ecuaciones cuadraticas` que asignó `030`;
--   · producto y cociente de monomios, reducir términos → `algebra/expresiones`,
--     como `multiplicacion_monomios` y `division_algebraica`;
--   · producto de binomios, factorizar y simplificar una fracción algebraica
--     → `algebra/polinomios`, como en `contenido/items/algebra.json`;
--   · evaluar $f(x)$ → `algebra/funciones`; $2^x = 32$ → `aritmetica/potencias`.
-- Los seis módulos ya existen y ya están en `universo.topics/module-slugs`: no
-- hace falta tocar el cliente ni recompilar.
--
-- **No cambia qué ítems ve un test**: `diagnostico` elige por topic, no por
-- módulo. Cambia qué módulo recibe la evidencia de cada respuesta **desde
-- ahora**. El histórico no se reescribe (G-4): los intentos ya guardados
-- conservan el `module-slug` vacío que tenían.
--
-- Aditiva e idempotente: solo toca filas de `diagnostico` con
-- `module_id is null`, así que no pisa una asignación hecha a mano después.

with mapeo (id, slug) as (
  values
    -- Enteros: suma y resta con signo
    (55,  'aritmetica/enteros'),     -- (−3) + 5
    (56,  'aritmetica/enteros'),     -- (−4) − (−2)
    (57,  'aritmetica/enteros'),     -- (−1) + (−3)
    -- Potencias
    (114, 'aritmetica/potencias'),   -- 2^x = 32
    -- Ecuaciones
    (34,  'algebra/ecuaciones'),     -- x + 5 = 9
    (35,  'algebra/ecuaciones'),     -- 3x = 12
    (36,  'algebra/ecuaciones'),     -- x² − 5x + 6 = 0
    (94,  'algebra/ecuaciones'),     -- 3x + 7 = 22
    (96,  'algebra/ecuaciones'),     -- 2(x − 4) = 10
    (98,  'algebra/ecuaciones'),     -- x/3 + 5 = 8
    (100, 'algebra/ecuaciones'),     -- −2x + 5 = −7
    (102, 'algebra/ecuaciones'),     -- 4(x + 3) − 2x = 18
    (105, 'algebra/ecuaciones'),     -- 3(x − 2) + 4 = 2x + 5
    (106, 'algebra/ecuaciones'),     -- 2y − 3(y − 4) = 8
    (109, 'algebra/ecuaciones'),     -- 5 − 2(3 − x) = 7
    (110, 'algebra/ecuaciones'),     -- (x + 2)/3 = (x − 1)/2
    (112, 'algebra/ecuaciones'),     -- x² − 5x + 6 = 0 (mismo que 36, ver pie)
    -- Expresiones
    (95,  'algebra/expresiones'),    -- 5(2x − 3) + 4x
    (99,  'algebra/expresiones'),    -- (3x²)(4x³)
    (104, 'algebra/expresiones'),    -- 6x³y² / 3x²y
    (107, 'algebra/expresiones'),    -- (2x² − 3x + 1) − (x² + 2x − 5)
    (111, 'algebra/expresiones'),    -- 3x(2x − 5) − 2x(x + 1)
    -- Polinomios
    (97,  'algebra/polinomios'),     -- factorizar x² − 9
    (101, 'algebra/polinomios'),     -- (x + 4)(x − 2)
    (103, 'algebra/polinomios'),     -- factorizar x² + 7x + 12
    (108, 'algebra/polinomios'),     -- factorizar 2x² + 7x + 3
    (113, 'algebra/polinomios'),     -- (x² − 4)/(x + 2)
    -- Funciones
    (37,  'algebra/funciones')       -- f(−2) con f(x) = 2x² − 3x + 1
)
update public.questions q
   set module_id = m.id
  from mapeo x
  join public.modules m on m.slug = x.slug
 where q.id = x.id
   and q.topic = 'diagnostico'
   and q.module_id is null;

-- -----------------------------------------------------------------------------
-- Reversión (deja exactamente las 28 filas como estaban)
-- -----------------------------------------------------------------------------
-- update public.questions set module_id = null
--  where topic = 'diagnostico'
--    and id in (34,35,36,37,55,56,57,94,95,96,97,98,99,100,101,102,103,104,
--               105,106,107,108,109,110,111,112,113,114);

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- -- (a) Esperado: 0. Ningún ítem activo de `diagnostico` sin módulo.
-- select count(*) from public.questions
--  where topic = 'diagnostico' and active and module_id is null;
--
-- -- (b) Esperado: enteros 3 · potencias 1 · fracciones 16 ·
-- --     operaciones_fundamentales 20 · ecuaciones 13 · expresiones 5 ·
-- --     polinomios 5 · funciones 1  (total 64)
-- select m.slug, count(*) from public.questions q
--   join public.modules m on m.id = q.module_id
--  where q.topic = 'diagnostico' group by 1 order by 1;

-- ⚠️ Anotado, no resuelto acá: **36 y 112 son el mismo ítem** ($x^2 - 5x + 6 = 0$,
-- con otras alternativas y dificultad 2 vs 1,18). Un test puede servirlos los
-- dos. Retirar uno (`active = false`, `057`) es una decisión de banco aparte.
