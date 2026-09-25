# ADR-043: Ítems generativos — una plantilla con parámetros, generada y corregida en el servidor

## Estado

**Propuesta** (2026-09-25). El owner pidió escribirla; la implementación del piloto (**T-176**)
espera su visto bueno explícito, porque es construir producto (R-30).

## Fecha

2026-09-25

## Contexto

### El problema que la dispara (Q-46)

Un ítem del banco es **una pregunta fija**: mismo enunciado, mismos números, misma respuesta. Eso
tiene tres costos que los datos del 2026-09 ya midieron:

1. **Repetir no mide.** Con 16 ítems por banco de electrónica y 8 por test, el segundo intento
   sirve casi los mismos ítems. En los 41 intentos de electrónica con menos de 5 s por ítem, **146
   de 281 respuestas eran ítems que ese estudiante ya había visto** (T-175). T-174 excluye los ya
   vistos, pero con 16 ítems eso alcanza para **exactamente dos intentos** sin repetir.
2. **La respuesta se comparte.** «La del condensador es 4,7 µF» pasa de un estudiante al siguiente
   en la misma sala. Barajar las alternativas (ADR-030) cambia la letra, no el valor.
3. **El banco se agota por arriba** (R-48): escribir, verificar y revisar un ítem estático cuesta
   horas del owner, que es el cuello de botella (R-41).

### La idea del owner

«Como una tabla de multiplicar por estudiante»: el ítem es una **plantilla** y los números se
sortean. `4,2 × 10³ · 3 × 10⁻⁵` para uno, `2,5 × 10⁴ · 6 × 10⁻²` para otro. La habilidad medida es
la misma; la respuesta no se puede memorizar ni pasar.

### Lo que la hace viable acá y no en otro producto

**Los distractores ya son reglas de error.** Cada alternativa incorrecta del banco está atada a una
idea errónea con nombre (`notacion/multiplica-exponentes-al-multiplicar`,
`notacion/mantisa-fuera-de-rango`, el «sumaste las mantisas» que domina en los dos cursos de
electrónica). En un ítem estático la regla la aplicó el autor, a mano, una vez. En una plantilla,
**la regla es código**: el distractor es `f_error(parámetros)`. Eso convierte el diferencial del
producto —el mapa de errores— en algo que escala.

Y resuelve de paso el punto ciego que CLAUDE.md §5 declara: **ninguno de los ocho auditores
comprueba que la cuenta esté bien**. En una plantilla la correcta **se calcula**, y un verificador
puede recorrer miles de instancias comprobando que la correcta es la cuenta, que cada distractor es
el número que produce su error y que las cuatro son distintas.

### Restricciones que la decisión tiene que respetar

- **ADR-015:** el cliente no recibe la respuesta ni corrige. Si el cliente generara la instancia,
  sabría la correcta.
- **ADR-016:** la IA escribe en el pipeline de autoría, nunca en runtime. **Una plantilla no es
  IA:** es una función determinista; no choca.
- **ADR-034:** un θ solo significa algo junto a las reglas que lo produjeron. Servir instancias
  cambia qué se mide y tiene que quedar trazable.
- **RLS es el único límite** (CLAUDE.md §7): toda tabla nueva con sus policies en la misma
  migración.

## Decisión

1. **Una plantilla es una fila de `questions`** con `kind = 'plantilla'` (columna nueva, default
   `'fijo'`). Así hereda sin cambios `topic`, `module_id`, `difficulty`, `active`, la banda y la
   exclusión por visto (T-174): para el motor adaptativo es **un ítem más**, con una sola
   dificultad para toda la familia.
2. **La generación y la corrección ocurren en el servidor**, en SQL, dentro de `next_question` y
   `score_answer` (ADR-015). Cada plantilla tiene una función `plantilla_<slug>(semilla)` que
   devuelve parámetros, enunciado, las cuatro alternativas y cuál es la correcta.
3. **Cada instancia servida se guarda** en `instancias_servidas` (`id`, `question_id`, `semilla`,
   `parametros jsonb`, `correcta`, `user_id`, `servida_en`), con RLS: el estudiante no la lee
   (la correcta está ahí), `score_answer` sí, como `security definer`. El cliente recibe el
   `instancia_id` y el texto, **nunca la correcta**. La respuesta guardada en `tests.test` lleva
   `question-id` **y** `instancia-id`, así la calibración y el panel pueden reconstruir qué vio.
4. **La fuente de verdad es un JSON en `contenido/plantillas/<slug>.json`**, igual que los ítems
   (skill `banco-de-items`): rangos de cada parámetro, fórmula de la correcta, una regla por
   distractor con su `misconception`, y el texto de cada explicación con marcadores. El `.sql` es un
   artefacto generado.
5. **Un verificador nuevo, `scripts/verificar_plantilla.py`**, enumera o muestrea ≥ 10.000
   instancias y falla si alguna tiene: la correcta distinta de la fórmula, un distractor que no es
   su regla, dos alternativas iguales (con el redondeo de pantalla), o números fuera de rango.
   Es el primer auditor del proyecto que **sí comprueba la cuenta**.
6. **Para Q-46, repetir la plantilla no es repetir el ítem.** Una instancia con otros números es
   una medición nueva de la misma habilidad. La exclusión por visto (T-174) opera por
   **instancia**, no por plantilla.
7. **Sube `universo.motor/version`** el día que se sirva la primera instancia: un θ que mezcla
   ítems fijos e instancias no es comparable con uno que no las tenía (ADR-034).
8. **Piloto de una sola plantilla (T-176):** producto de dos números en notación científica, en
   `electronica/notacion_cientifica`, con los tres distractores de los errores que más aparecen en
   los dos cursos. No se escribe una segunda plantilla hasta que el piloto tenga datos de una clase
   real.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Generar en el cliente con semilla y verificar en el servidor con la misma semilla | Dos implementaciones de la misma fórmula (CLJS y SQL) que pueden divergir en silencio, y el cliente conoce la correcta antes de responder: viola ADR-015. |
| Generar en una Edge Function (Deno) | Una sola implementación y un lenguaje más cómodo que plpgsql, pero agrega un salto de red por ítem, un despliegue más y un secreto más. Queda como plan B si una plantilla no cabe en SQL. |
| Pregenerar N instancias como filas de `questions` | Es lo que ya hay, multiplicado: agota igual, infla el banco y la calibración ve N ítems distintos donde hay una habilidad. |
| Que la IA genere el ítem en runtime | Viola ADR-016: nadie revisa lo que se sirve. |
| `order_index` como «segunda forma» del test (idea del owner) | Cambia el **orden**, no los ítems: el estudiante reconoce la pregunta igual. Útil contra copiar al de al lado, no contra repetir. |
| No hacer nada y confiar en T-174 | Con 16 ítems por banco, T-174 da dos intentos limpios. Es la mitigación de hoy, no la solución. |

## Consecuencias

**Positivas**
- Un banco que **no se agota** en las unidades de cálculo (notación, Ohm, potencia, Kirchhoff,
  capacitores): justo las de electrónica.
- La respuesta **no se memoriza ni se comparte**. No impide usar ChatGPT (T-175: eso no deja huella
  en los datos), pero sí que un estudiante le pase el resultado a otro.
- **La cuenta se verifica por máquina**, que es el hueco más caro del pipeline de contenido.
- Una plantilla junta respuestas de **todas** sus instancias: calibra con muchos menos
  estudiantes que 16 ítems separados (G-2).

**Negativas / costos aceptados**
- **Es construir producto** (R-30). Por eso una sola plantilla y un criterio de parada.
- La dificultad es **de la familia**, no de la instancia: `2 × 10³ · 3 × 10²` es más fácil que
  `7,5 × 10⁻³ · 8 × 10⁻⁴` (hay que normalizar). Los rangos de parámetros se eligen para que las
  instancias sean de dificultad parecida, y la calibración dirá si lo son.
- plpgsql es un lenguaje incómodo para escribir fórmulas. Aceptable para aritmética; si una
  plantilla necesita más, plan B (Edge Function).
- Una migración con tabla nueva, dos funciones modificadas y un cambio de `motor/version`: tiene que
  pasar por PostgreSQL desechable, y va **antes** que el bundle (R-39).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| El piloto se convierte en «un motor de plantillas» antes de tener datos | Una plantilla; la segunda solo con datos de una clase real | RISKS R-30 |
| Una instancia mal generada le dice «incorrecto» a quien acertó | El verificador recorre ≥ 10.000 instancias antes de aplicar | RISKS R-41 |
| La correcta se filtra al cliente | `instancias_servidas` sin policy de SELECT para el estudiante; prueba en `supabase/pruebas/rls.sql` | ADR-015, T-11 |
| Bundle antes que migración | Orden de R-39; el cliente degrada si `kind` no existe | RISKS R-39 |

## Seguimiento

- **Criterio del piloto:** en la primera clase real, (a) cero reportes de corrección equivocada;
  (b) la tasa de «sumaste las mantisas» en la plantilla es comparable a la de los ítems fijos del
  mismo módulo; (c) un estudiante que rinde dos veces ve números distintos.
- Si (a) falla, se retira la plantilla (`active = false`) y se revisa el verificador antes que la
  plantilla.
- Se reconsidera la ubicación (SQL → Edge Function) si la segunda plantilla no cabe en plpgsql.

---

Relacionado: [[../project-memory/OPEN_QUESTIONS]] Q-46 · [[ADR-015-item-sin-respuesta-en-el-cliente]] ·
[[ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] · [[ADR-030-barajar-las-alternativas]] ·
[[ADR-034-azar-fijo-prior-suelto-y-version-del-motor]] · [[../project-memory/BACKLOG]] T-174, T-175, T-176 ·
[[../project-memory/DECISIONS]] D-78
