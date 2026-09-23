-- Rehace la dificultad (`difficulty`) de los 64 ítems del banco `diagnostico`.
--
-- ⚠ Es una **hipótesis autoral mejor informada**, no una calibración (R-17,
-- G-2). Calibrar pide ~30 respuestas por ítem con θ independiente del `b` que
-- se estima; acá hay de 12 a 56 respuestas y un θ que salió de las etiquetas
-- viejas.
--
-- ── Qué pasaba ─────────────────────────────────────────────────────────────
-- Medido el 2026-09-22 (curso de ese día, 28 estudiantes, y T-170/R-48):
--
--   · Las etiquetas **no eran juicios, eran un correlativo**: 22 ítems de
--     álgebra en 1,00 · 1,01 · … · 1,20, veinte de aritmética en −3,00 · −2,99
--     · …, y las fracciones de 0,06 en 0,06. «Resuelve 3x = 12» valía casi lo
--     mismo (1,00) que «Factoriza 2x² + 7x + 3» (1,14).
--   · Había un **hueco entre −1,2 y 1,0**: un solo ítem en dos logits.
--   · Y **«¿Cuánto es 3x4?» estaba en 2,9**, el ítem más difícil del banco.
--     Todo estudiante que llegaba arriba recibía una tabla de multiplicar y, al
--     acertarla, subía otro 0,4.
--
-- Consecuencia medida: de los 28 del curso, **10 terminaron entre 2,3 y 3,0**
-- con un intervalo del 95 % de ~[1,3, 4,9]. El banco no tenía con qué medir
-- arriba de 1,2 (3 ítems), así que θ caminaba 0,4 por acierto hasta el tope.
--
-- ── Cómo se eligieron los valores nuevos ───────────────────────────────────
-- 1. **Escala de diagnóstico mixto**, no por eje. `diagnostico` mezcla
--    aritmética y álgebra en una sola corrida, así que «difícil» significa «más
--    adelante en la progresión» (la lectura de `default-bands` que la skill
--    `banco-de-items` describe para un diagnóstico que recorre varios ejes):
--    operaciones en [−3,0, −2,35]; fracciones y enteros en [−2,4, −0,5];
--    ecuaciones y expresiones en [−2,0, 1,2]; factorización, cuadrática y
--    funciones en [1,3, 2,6].
-- 2. **Dentro de cada contenido, por los pasos que exige**, comparando con
--    ítems equivalentes de `contenido/items/algebra.json` y `numeros.json`.
-- 3. **Contrastado con las respuestas reales** (978 respuestas con
--    `origin = 'student'`). Se estimó un `b` por ítem **con el θ de cada
--    estudiante fijo** y azar c = 0,25, y se usó solo como alerta: donde el
--    dato y el juicio discrepaban mucho, se movió el valor hacia el dato
--    **sin adoptarlo** (sus errores estándar van de 0,5 a 1,5). Los casos que
--    más movió:
--      · 108 «Factoriza 2x² + 7x + 3»: 33 % de acierto, b̂ ≈ 4,2 ± 1,5 → 2,6
--      · 107 resta de polinomios: 36 %, b̂ ≈ 3,6 ± 1,3 → 1,8
--      · 102 «4(x + 3) − 2x = 18»: 43 %, b̂ ≈ 2,4 ± 1,1 → 1,0
--      · 34 «x + 5 = 9»: 93 %, b̂ ≈ −3,2 ± 0,6 → −2,0
--      · 72 y 65 (fracciones de lectura directa): b̂ ≈ −3,4 y −3,0 → −2,3 y −2,1
--      · 71 «2/3 + 1/3»: solo 52 % de acierto → −1,2
--
-- Reparto resultante, por tramo de 1 logit:
--   < −2: 26 · −2..−1: 10 · −1..0: 6 · 0..1: 8 · 1..2: 13 · ≥ 2: **1**
--
-- ⚠️ **Lo que esta migración no arregla: arriba de 2 hay un solo ítem.** Mover
-- etiquetas no crea preguntas difíciles: quien resuelve todo el álgebra va a
-- seguir llegando cerca de 3, ahora con ítems más informativos en el camino.
-- Ese hueco se llena con ítems nuevos (skill `banco-de-items`). Y los 26 ítems
-- bajo −2 —la mitad del tipo «1 + 1»— casi no aportan información sobre un
-- estudiante de enseñanza media.
--
-- ── Qué cambia para el θ ───────────────────────────────────────────────────
-- `universo.motor/version` **no sube**: ADR-034 la define por modelo, prior y
-- regla de parada, y ninguno cambia. Pero **el θ de `diagnostico` de antes y
-- de después de esta migración no es comparable**: se calculó contra otros
-- `b`. Un Δθ que cruce la fecha de aplicación mide en parte el cambio de
-- etiquetas (G-4). Queda anotado en R-48 / T-170.
--
-- También corrige el enunciado del ítem 33: «$3x4$» se leía como un producto
-- algebraico, no como 3 por 4.
--
-- No toca clave, alternativas, `module_id` ni ideas erróneas. Los intentos ya
-- guardados conservan la `difficulty` con que se calcularon (viaja en cada
-- respuesta). Idempotente: valores fijos, por id **y** topic.

with nuevo (id, difficulty) as (
  values
    ( 31, -3.00),  -- 1 + 1
    ( 38, -3.00),  -- 2 + 1
    ( 43, -2.95),  -- 6 + 1
    ( 47, -2.95),  -- 7 + 1
    ( 40, -2.90),  -- 4 + 2
    ( 32, -2.85),  -- 5 − 2
    ( 39, -2.85),  -- 5 − 3
    ( 42, -2.80),  -- 10 − 7
    ( 44, -2.80),  -- 9 − 6
    ( 46, -2.80),  -- 8 − 5
    ( 45, -2.75),  -- 2 × 2
    ( 41, -2.70),  -- doble de 3
    ( 33, -2.70),  -- 3 × 4 (estaba en 2,9)
    ( 48, -2.55),  -- (2 + 3) − 4
    ( 50, -2.55),  -- (6 − 2) + 1
    ( 52, -2.50),  -- (7 − 4) + 2
    ( 49, -2.45),  -- 5 − (3 + 1)
    ( 51, -2.45),  -- 8 − (2 + 5)
    ( 53, -2.40),  -- 10 − (2 + 5)
    ( 54, -2.35),  -- (9 − 6) + (2 − 1)
    ( 58, -2.40),  -- la fracción que es la mitad
    ( 72, -2.30),  -- la fracción «dos tercios»
    ( 64, -2.20),  -- la fracción «tres de cuatro partes»
    ( 60, -2.20),  -- mayor: 1/2 o 1/4
    ( 62, -2.20),  -- cuartos en un entero
    ( 65, -2.10),  -- 3/5 + 1/5
    ( 34, -2.00),  -- x + 5 = 9
    ( 57, -1.90),  -- (−1) + (−3)
    ( 59, -1.80),  -- equivalente a 2/4 en mínima expresión
    ( 68, -1.80),  -- 5/6 − 2/6
    ( 55, -1.70),  -- (−3) + 5
    ( 63, -1.70),  -- simplificar 4/8
    ( 61, -1.60),  -- 1/4 + 1/4 y simplificar
    ( 56, -1.30),  -- (−4) − (−2)
    ( 66, -1.30),  -- equivalente a 3/6 en mínima expresión
    ( 71, -1.20),  -- 2/3 + 1/3
    ( 67, -1.00),  -- menor: 2/3 o 2/5
    ( 94, -1.00),  -- 3x + 7 = 22
    ( 35, -0.80),  -- 3x = 12
    ( 70, -0.80),  -- tercios en dos enteros
    ( 73, -0.60),  -- simplificar 10/15
    ( 69, -0.50),  -- simplificar 6/9
    ( 98,  0.00),  -- x/3 + 5 = 8
    (114,  0.00),  -- 2^x = 32
    (100,  0.30),  -- −2x + 5 = −7
    ( 99,  0.50),  -- (3x²)(4x³)
    ( 96,  0.60),  -- 2(x − 4) = 10
    ( 95,  0.70),  -- 5(2x − 3) + 4x
    (104,  0.80),  -- 6x³y² / 3x²y
    (106,  0.90),  -- 2y − 3(y − 4) = 8
    (101,  1.00),  -- (x + 4)(x − 2)
    (102,  1.00),  -- 4(x + 3) − 2x = 18
    (105,  1.10),  -- 3(x − 2) + 4 = 2x + 5
    (109,  1.20),  -- 5 − 2(3 − x) = 7
    (110,  1.20),  -- (x + 2)/3 = (x − 1)/2
    ( 97,  1.30),  -- factorizar x² − 9
    ( 37,  1.60),  -- f(−2) con f(x) = 2x² − 3x + 1
    (103,  1.60),  -- factorizar x² + 7x + 12
    (111,  1.60),  -- 3x(2x − 5) − 2x(x + 1)
    ( 36,  1.80),  -- x² − 5x + 6 = 0
    (107,  1.80),  -- (2x² − 3x + 1) − (x² + 2x − 5)
    (112,  1.80),  -- x² − 5x + 6 = 0 (el mismo que 36)
    (113,  1.90),  -- (x² − 4)/(x + 2)
    (108,  2.60)   -- factorizar 2x² + 7x + 3
)
update public.questions q
   set difficulty = n.difficulty
  from nuevo n
 where q.id = n.id
   and q.topic = 'diagnostico';

update public.questions
   set question = $el$¿Cuánto es $3 \times 4$?$el$
 where id = 33 and topic = 'diagnostico' and question = $el$¿Cuánto es $3x4$?$el$;

-- -----------------------------------------------------------------------------
-- Reversión (los valores exactos de antes, leídos de producción el 2026-09-22)
-- -----------------------------------------------------------------------------
-- update public.questions set question = $el$¿Cuánto es $3x4$?$el$
--  where id = 33 and topic = 'diagnostico';
-- with viejo (id, difficulty) as (values
--   (31, -3),
--   (32, -2.9),
--   (33, 2.9),
--   (34, 0),
--   (35, 1),
--   (36, 2),
--   (37, 2.8),
--   (38, -2.99),
--   (39, -2.98),
--   (40, -2.97),
--   (41, -2.96),
--   (42, -2.95),
--   (43, -2.94),
--   (44, -2.93),
--   (45, -2.92),
--   (46, -2.91),
--   (47, -2.9),
--   (48, -2.899),
--   (49, -2.898),
--   (50, -2.897),
--   (51, -2.896),
--   (52, -2.895),
--   (53, -2.894),
--   (54, -2.893),
--   (55, -2.892),
--   (56, -2.891),
--   (57, -2.89),
--   (58, -2.09),
--   (59, -2.03),
--   (60, -1.97),
--   (61, -1.91),
--   (62, -1.85),
--   (63, -1.79),
--   (64, -1.73),
--   (65, -1.67),
--   (66, -1.61),
--   (67, -1.55),
--   (68, -1.49),
--   (69, -1.43),
--   (70, -1.37),
--   (71, -1.31),
--   (72, -1.25),
--   (73, -1.19),
--   (94, 1),
--   (95, 1.01),
--   (96, 1.02),
--   (97, 1.03),
--   (98, 1.04),
--   (99, 1.05),
--   (100, 1.06),
--   (101, 1.07),
--   (102, 1.08),
--   (103, 1.09),
--   (104, 1.1),
--   (105, 1.11),
--   (106, 1.12),
--   (107, 1.13),
--   (108, 1.14),
--   (109, 1.15),
--   (110, 1.16),
--   (111, 1.17),
--   (112, 1.18),
--   (113, 1.19),
--   (114, 1.2)
-- )
-- update public.questions q set difficulty = v.difficulty
--   from viejo v where q.id = v.id and q.topic = 'diagnostico';

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- -- Esperado: < −2: 26 · −2..−1: 10 · −1..0: 6 · 0..1: 8 · 1..2: 13 · ≥ 2: 1
-- select count(*) filter (where difficulty <  -2)                     as bajo_m2,
--        count(*) filter (where difficulty >= -2 and difficulty < -1) as m2_m1,
--        count(*) filter (where difficulty >= -1 and difficulty <  0) as m1_0,
--        count(*) filter (where difficulty >=  0 and difficulty <  1) as c0_1,
--        count(*) filter (where difficulty >=  1 and difficulty <  2) as c1_2,
--        count(*) filter (where difficulty >=  2)                     as sobre_2
--   from public.questions where topic = 'diagnostico' and active;
