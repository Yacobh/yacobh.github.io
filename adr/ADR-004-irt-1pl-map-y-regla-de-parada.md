# ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión

## Estado

Aprobada

## Fecha

2026-02-21 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde `src/universo/components/tetha.cljs`,
> `src/universo/irt/progress.cljs`, sus tests y los comentarios del propio código (que documentan las
> razones de cada salvaguarda).

El producto necesita estimar el nivel de habilidad de un estudiante en pocas preguntas y usar esa
estimación para (a) seleccionar la siguiente pregunta, (b) decidir cuándo parar y (c) asignar una
banda de nivel que determina en qué grupo de estudio puede inscribirse.

Restricciones del momento:

- **El banco de ítems es pequeño** y sus dificultades están asignadas por criterio del profesor, no
  calibradas con datos de respuestas reales.
- **No hay datos históricos** para estimar parámetros de discriminación ni de azar por ítem.
- El diagnóstico debe durar **~20 minutos** y no agotar al estudiante.
- Todo el cálculo ocurre **en el navegador** (no hay servidor donde correr una librería psicométrica).
- La experiencia importa tanto como la estadística: un test que salta de "trivial" a "imposible"
  frustra y produce datos peores.

Problemas concretos que aparecieron:

1. Con una o dos respuestas, la estimación por máxima verosimilitud **diverge**: si el estudiante
   acierta todo, θ → +∞; si falla todo, θ → −∞ (no existe máximo finito).
2. Una sola respuesta podía mover θ tanto que el siguiente ítem quedaba fuera de su alcance.
3. Con ventanas de selección estrechas y un banco pequeño, el test se quedaba sin ítems candidatos.

## Decisión

### Modelo

Se usa el **modelo IRT de un parámetro (1PL / Rasch)**:

```
P(correcto | θ, b) = 1 / (1 + e^-(θ − b))
```

donde `b` es `questions.difficulty`. No se modelan discriminación (2PL) ni azar (3PL).

### Estimación

Se estima θ por **MAP (Maximum A Posteriori)** con prior **N(0, 1)** (`prior-mean = 0.0`,
`prior-precision = 1.0`), usando **una iteración de Newton-Raphson por respuesta** sobre el posterior:

```
θ' = θ − f'(θ)/f''(θ)     con f' y f'' incluyendo el término del prior
```

θ inicial = **0,0** (la media del prior; arranque neutro).

### Salvaguardas

1. **`clamp-theta`**: θ acotado al rango estándar `[-3, 3]`.
2. **`limit-theta-step`**: `|Δθ| ≤ 0,4` logits entre ítems consecutivos.

### Selección de ítem

Entre las preguntas del topic **no respondidas** con dificultad en `[θ−1, θ+1]`, se elige la de
dificultad **más cercana a θ** (`argmin |b − θ|`). Si no hay candidatas, se amplía la ventana a
`[θ−2, θ+2]` antes de declarar el banco agotado.

### Regla de parada

Con `SE(θ) = 1/√I(θ)` y `I(θ) = −f''(θ)` (información de Fisher del modelo 1PL):

| Condición | Razón de parada |
|-----------|-----------------|
| `n ≥ 12` | `:max-items` |
| `n ≥ 5` **y** `SE ≤ 0,35` | `:precision` |
| No quedan ítems candidatos | `:exhausted` |

Configuración en `irt.progress/default-stop-config`.

### Bandas

θ se discretiza en cuatro bandas para agrupar cohortes: `inicial` (θ<0), `basico` (0≤θ<1),
`intermedio` (1≤θ<2), `avanzado` (θ≥2).

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **2PL / 3PL** (discriminación, azar) | Modelan mejor la realidad pero requieren **cientos de respuestas por ítem** para calibrar. Con el banco actual, los parámetros extra serían ruido con apariencia de rigor |
| **Máxima verosimilitud (MLE)** sin prior | Diverge con pocas respuestas (patrones de todo-correcto o todo-incorrecto no tienen máximo finito). Es exactamente el problema que motivó el MAP |
| **EAP** (esperanza a posteriori por cuadratura) | Más estable que Newton-Raphson y sin necesidad de límites de paso, pero más costoso y menos transparente de implementar y depurar en el navegador. Candidata natural si Newton-Raphson da problemas |
| **Newton-Raphson iterado hasta convergencia** por respuesta | Innecesario: una iteración por respuesta converge suavemente a lo largo del test y actúa como suavizado natural |
| **Número fijo de preguntas** (p. ej. siempre 15) | Simple, pero gasta el tiempo del estudiante cuando ya hay certeza y se queda corto cuando el patrón es ambiguo. La parada por precisión es el argumento de venta ("estimación precisa con menos preguntas") |
| **Prior más ancho** (p. ej. N(0, 2²)) | Encoge menos, pero permite estimaciones extremas tempranas. Con banco pequeño se prefiere el sesgo conservador |
| **θ continuo sin bandas** para asignar cupos | Un cupo necesita agrupar personas: hace falta discretizar. Cuatro bandas es un compromiso entre homogeneidad del grupo y viabilidad del mínimo de inscritos |
| **Librería psicométrica externa** (R `mirt`, Python `catsim`) | No hay servidor donde ejecutarla; y el subconjunto necesario es pequeño y auditable en ~80 líneas de ClojureScript |

## Consecuencias

**Positivas**

- Todo el motor son **funciones puras** (`universo.components.tetha`, `universo.irt.progress`):
  testeadas, sin dependencias, ejecutables en el navegador.
- El prior hace que el test funcione **desde el primer ítem**, sin casos especiales.
- El límite de paso produce una progresión de dificultad que se **siente** razonable, que es también lo
  que genera mejores datos (un estudiante frustrado responde peor).
- La parada por SE hace que el número de preguntas se adapte: un patrón consistente termina antes.
- El modelo es **explicable** al estudiante y a la institución: un parámetro, una fórmula, sin cajas
  negras.
- La ventana ampliable evita que un banco pequeño rompa el flujo.

**Negativas / costos aceptados**

- **Toda la calidad del diagnóstico depende de que `difficulty` sea correcta.** El 1PL no tiene otro
  parámetro que compense una dificultad mal asignada. Si las dificultades son aproximaciones, θ es una
  aproximación — con apariencia de precisión (R-17, Q-05, A-08). **Es la debilidad principal de esta
  decisión.**
- El prior N(0,1) **sesga θ hacia 0** con pocas respuestas: un estudiante genuinamente avanzado
  necesita más ítems para que se refleje.
- El límite `|Δθ| ≤ 0,4` implica que con 5 ítems θ **no puede** superar 2,0 desde 0,0: en un test corto,
  la banda `avanzado` es prácticamente inalcanzable. Consecuencia estructural que conviene verificar
  contra los datos reales.
- Con `SE ≤ 0,35`, un estudiante cuyo θ real esté cerca de un borde de banda (0, 1 o 2) puede quedar
  clasificado en la banda vecina: el intervalo de confianza cruza el borde (A-11).
- El **tiempo de respuesta se registra pero no entra en el modelo**, mientras la FAQ pública afirma que
  sí influye. Contradicción documentada en [[../project-memory/OPEN_QUESTIONS]] X-01/Q-17: hay que
  corregir el copy o extender el modelo.
- Una sola iteración de Newton-Raphson puede ser inestable en casos patológicos; los clamps lo
  contienen, pero el diagnóstico numérico es indirecto.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| `difficulty` no calibrada ⇒ θ y banda sesgadas | T-29 (calibración empírica cuando haya volumen); comunicar θ como *estimación*, que ya se hace | R-17 |
| Banco pequeño ⇒ paradas por `:exhausted` frecuentes | Ventana ampliable ±2; ampliar el banco (T-27) | — |
| Clasificación errónea en bordes de banda | Validar con datos cuántos casos caen cerca del borde con SE alto; considerar exigir más precisión o suavizar la asignación | A-11 |
| El copy promete algo que el modelo no hace (tiempo de respuesta) | Q-17: corregir texto o extender el modelo (requeriría ADR nuevo) | X-01 |
| Un cambio de parámetros rompe la experiencia sin que nadie lo note | Los parámetros están centralizados y con test; cualquier ajuste debe correr `clj -M:test` y revisarse en conjunto (cambiar el paso afecta la parada) | R-04 |

## Seguimiento

**Revisar cuando haya volumen de datos.** Concretamente:

1. **Calibrar `difficulty`** con las respuestas acumuladas (T-29). Es la acción de mayor impacto sobre
   la calidad del producto.
2. Con dificultades calibradas y suficientes respuestas por ítem, **evaluar 2PL** (discriminación).
   Sería un ADR nuevo que reemplace a este.
3. Verificar empíricamente la distribución de θ y compararla con el prior (A-10): si la población real
   se centra lejos de 0, ajustar `prior-mean`.
4. Medir cuántos diagnósticos paran por `:precision` vs `:max-items` vs `:exhausted`. Muchos
   `:max-items` sugieren un umbral de SE demasiado exigente o un banco poco informativo; muchos
   `:exhausted` significan que el banco es demasiado pequeño.
5. Resolver la contradicción del tiempo de respuesta (Q-17).

**No modificar** `prior-precision`, `max-theta-step` ni `default-stop-config` sin entender que están
acoplados: relajar el paso permite convergencia más rápida y por tanto tests más cortos; endurecer el
umbral de SE alarga los tests y aumenta las paradas por agotamiento.

---

Relacionado: [[../project-memory/TERMINOLOGY]] §IRT · [[../project-memory/REQUIREMENTS]] RF-2, RN-01..RN-05 ·
[[../project-memory/RISKS]] R-17 · [[../project-memory/ASSUMPTIONS]] A-08..A-12 ·
[[ADR-009-logica-pura-testeable]]
