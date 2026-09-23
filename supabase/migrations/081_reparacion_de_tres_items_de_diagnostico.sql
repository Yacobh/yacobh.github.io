-- Reparación de tres ítems del banco `diagnostico` que le dicen «Correcta» a
-- quien se equivocó.
--
-- ── Qué pasaba ─────────────────────────────────────────────────────────────
-- En los ítems 55, 56 y 109 las `error_*` estaban **corridas de letra**: la
-- clave era correcta, pero el texto «Correcta» vivía en un distractor y la
-- alternativa correcta cargaba una idea errónea. `score_answer` (024) devuelve
-- la `error_*` de la alternativa **elegida**, así que quien marcó el distractor
-- leía «Correcta» después de equivocarse.
--
-- Medido el 2026-09-22 con `claude_ro` sobre `tests_sin_identidad`:
--   · el curso de ese día (28 estudiantes, 12:27–13:05): **10 respuestas de 7
--     estudiantes** recibieron «Correcta» como retroalimentación de un error;
--   · en todo el histórico de `origin = 'student'`: 13 respuestas, 10 personas;
--   · en `/aula`, «Correcta» salía como la **segunda idea errónea** del curso.
-- Barrido del banco activo completo: son **solo estos tres**. Los tres son del
-- banco viejo, anterior a la skill `banco-de-items`, y por eso ninguno de los
-- ocho auditores los mira (no tienen JSON en `contenido/items/`).
--
-- ── Qué cambia ─────────────────────────────────────────────────────────────
-- Las cuatro `error_*` de cada ítem, reescritas con el criterio de la skill: la
-- de la correcta es el Bonus (ADR-033) y no habla de ningún error; la de cada
-- distractor nombra el paso donde se torció.
--
-- ⚠️ **Y cinco alternativas.** Reubicar los textos no alcanzaba: en cinco
-- distractores **ningún error razonable produce ese número** (55/C = 1,
-- 55/D = 0, 56/D = 4, 109/B = 1, 109/D = −1). Escribirles una explicación
-- habría sido diagnosticar una idea errónea que el estudiante no tuvo — el
-- defecto B de `079`. Se reemplazan por el número que sí sale del error:
--
--   55  (−3)+5          C: 1 → −2   (resta bien, pone el signo del −3)
--                       D: 0 → −8   (suma los absolutos y deja el menos)
--   56  (−4)−(−2)       D: 4 → 6    (suma 4 + 2 sin mirar signos)
--   109 5−2(3−x)=7      B: 1 → −4   (−2·(−x) = −2x al distribuir)
--                       D: −1 → 2   (divide por 2 en vez de por −2)
--
-- **No cambia:** la clave (A, A, C), el enunciado, `difficulty`, `module_id` ni
-- las `misconception_*_id` (las tres filas las tienen todas en null y siguen
-- así: son errores de signo que el catálogo de `aritmetica/enteros` todavía no
-- enlaza a este banco).
--
-- **El histórico no se reescribe (G-4).** Cada intento guardó su propia copia
-- de las alternativas en `tests.test -> 'questions'` y el texto que vio en
-- `selected-error`, así que los intentos viejos siguen mostrando lo que el
-- estudiante vio ese día — incluido el «Correcta» del curso del 2026-09-22.
--
-- Idempotente: son `update` con valores fijos. El `where` exige id, topic **y**
-- enunciado, para que en una base donde el id no corresponda no toque nada.

-- 55 · Evalúa: $(-3) + 5$ · clave A
update public.questions set
  option_c = $el$-2$el$,
  option_d = $el$-8$el$,
  error_a  = $el$Correcto. Con signos distintos se restan los valores absolutos, $5 - 3 = 2$, y el resultado lleva el signo del de mayor valor absoluto, que es el $5$: positivo.$el$,
  error_b  = $el$Sumaste $3 + 5$ sin mirar el signo del $-3$. Con signos distintos los valores absolutos se restan: $5 - 3 = 2$.$el$,
  error_c  = $el$La resta $5 - 3$ está bien, pero le pusiste el signo del $-3$. El resultado lleva el signo del número de mayor valor absoluto, que es el $5$.$el$,
  error_d  = $el$Sumaste los valores absolutos y dejaste el signo menos, como si los dos números fueran negativos. Con signos distintos se restan: $5 - 3 = 2$.$el$
 where id = 55 and topic = 'diagnostico' and question = $el$Evalúa: $(-3) + 5$$el$;

-- 56 · Evalúa: $(-4) - (-2)$ · clave A
update public.questions set
  option_d = $el$6$el$,
  error_a  = $el$Correcto. Restar un número es sumar su opuesto: $-4 - (-2) = -4 + 2 = -2$.$el$,
  error_b  = $el$Restaste $2$ en vez de sumarlo: $-4 - 2 = -6$. Restar $-2$ es sumar su opuesto: $-4 + 2 = -2$.$el$,
  error_c  = $el$Hiciste $4 - 2$ sin el signo del $-4$. Restar $-2$ es sumar $2$, y $-4 + 2 = -2$ sigue siendo negativo porque el $4$ pesa más que el $2$.$el$,
  error_d  = $el$Sumaste $4 + 2$ sin mirar ningún signo. Primero, restar $-2$ es sumar $2$; después, $-4 + 2 = -2$.$el$
 where id = 56 and topic = 'diagnostico' and question = $el$Evalúa: $(-4) - (-2)$$el$;

-- 109 · Resuelve: $5 - 2(3 - x) = 7$ · clave C
update public.questions set
  option_b = $el$-4$el$,
  option_d = $el$2$el$,
  error_a  = $el$Distribuiste bien, $5 - 6 + 2x = 7$, pero al pasar el $-1$ al otro lado no le cambiaste el signo. Queda $2x = 7 + 1 = 8$, no $2x = 6$.$el$,
  error_b  = $el$El $-2$ multiplica también a la $-x$, y menos por menos da más: $-2(3 - x) = -6 + 2x$. Con $-2x$ la cuenta lleva a $x = -4$.$el$,
  error_c  = $el$Correcto. Al distribuir, $-2 \cdot 3 = -6$ y $-2 \cdot (-x) = +2x$, así que $5 - 6 + 2x = 7$. Queda $2x = 8$ y $x = 4$. Se comprueba reemplazando: $5 - 2(3 - 4) = 5 + 2 = 7$.$el$,
  error_d  = $el$Llegaste a $-2(3 - x) = 2$ y dividiste por $2$ en vez de por $-2$, así que se perdió el signo menos: $3 - x = 1$. Dividiendo por $-2$ queda $3 - x = -1$ y $x = 4$.$el$
 where id = 109 and topic = 'diagnostico' and question = $el$Resuelve: $5 - 2(3 - x) = 7$$el$;

-- -----------------------------------------------------------------------------
-- Reversión (los valores exactos de antes, leídos de producción el 2026-09-22)
-- -----------------------------------------------------------------------------
-- update public.questions set option_c = '1', option_d = '0',
--   error_a = 'Sumó signos mal', error_b = 'Correcta',
--   error_c = 'Ignoró el signo negativo', error_d = 'Error conceptual'
--  where id = 55;
-- update public.questions set option_d = '4',
--   error_a = 'Confusión de signos', error_b = 'Suma incorrecta',
--   error_c = 'Correcta', error_d = 'Olvidó el negativo'
--  where id = 56;
-- update public.questions set option_b = '1', option_d = '-1',
--   error_a = 'Correcta', error_b = 'Error en el signo al distribuir',
--   error_c = 'Error al despejar', error_d = 'Error en operaciones'
--  where id = 109;

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- -- (a) Esperado: 0 filas. Ningún distractor activo dice «Correcta».
-- with x as (select id, correct_option c, unnest(array['A','B','C','D']) l,
--                   unnest(array[error_a,error_b,error_c,error_d]) e
--              from public.questions where active)
-- select id, l, e from x where l <> c and e ilike 'correct%';
--
-- -- (b) Esperado: 3 filas, la correcta empieza con «Correcto.» y las cuatro
-- --     alternativas son distintas.
-- select id, correct_option, option_a, option_b, option_c, option_d,
--        left(case correct_option when 'A' then error_a when 'B' then error_b
--             when 'C' then error_c else error_d end, 12) as bonus
--   from public.questions where id in (55, 56, 109) order by id;
