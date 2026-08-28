# ADR-034: El motor modela el azar, suelta el prior, y dice con qué versión calculó cada θ

## Estado

Aprobada. **Actualiza [[ADR-004-irt-1pl-map-y-regla-de-parada]]**, que sigue vigente en su
estructura (1PL, MAP, salto acotado) pero cuya §Estimación describía un estimador que el código no
corría (X-10). No la reemplaza: la corrige y la extiende.

## Fecha

2026-08-28

## Contexto

El owner pidió atacar el sesgo de θ con una frase que ordena la decisión: *«yo quiero poder
encontrar la falla del estudiante, sin eso todo lo demás es solo un producto cosmético muy bonito».*

Antes de escribir código se midió el motor tal como estaba, simulando su cadena real —MAP con
Newton-Raphson a convergencia, ventana `[θ−1, θ+1]`, `argmin |b − θ|`, tope de 0,4, arranque en
−1,0— sobre la **distribución real de `numbers_v1`** (178 ítems: 55 en [-3,-2], 95 en (-2,-1], 4 en
(-1,0], 11 en (0,1], 2 en (1,2] y 11 en (2,3]).

**Tres hipótesis se cayeron por el camino, y conviene que queden escritas porque cada una parecía
la explicación obvia:**

1. **El tope de paso de 0,4 no era el problema.** T-112 anotaba que arrancando en −1,0 hacen falta
   ≥7 ítems solo para *viajar* a θ = 1,5, de 12. La aritmética es correcta pero el tope **no llega a
   apretar**: quitarlo movía θ entre 0,00 y 0,06 logits, porque el MAP ya se movía despacio solo.
2. **Apuntar los ítems al corte de banda no ayudó.** Es lo que recomienda la teoría de tests de
   clasificación; medido, dio 78 % contra 79 %.
3. **El agujero del banco tampoco explicaba nada.** `numbers_v1` tiene 4 ítems entre −1 y 0, y aun
   así rinde igual que un banco uniforme y denso: con 12 preguntas te bastan ~12 ítems bien
   ubicados, y hay 11 sobre θ = 2.

**Lo que sí explicaba todo eran dos sesgos opuestos que se cancelaban por accidente.** El prior
N(0,1) encoge θ hacia 0; el azar de una prueba de cuatro alternativas infla los aciertos y el modelo
no lo sabía. Se anulaban cerca de θ ≈ 1 y se separaban en los extremos:

| θ real | sesgo del motor v1 | banda correcta |
|---|---|---|
| −1,5 | **+1,00** | 80 % |
| −0,5 | +0,61 | 42 % |
| 2,0 | −0,40 | 18 % |

**Un estudiante que está en −1,5 se reportaba cerca de −0,5: un logit completo de regalo, y
justamente a quien el producto existe para ayudar.**

Y la medición decisiva: **modelar el azar sin tocar el prior es una regresión.** Quita el sesgo
hacia arriba y destapa el del prior, que estaba tapado. En θ = 2,0 el sesgo empeora de −0,40 a −0,82
y la banda correcta cae de 20 % a 4 %.

## Decisión

**1. El modelo incorpora un piso de acierto por azar fijo: `P = c + (1 − c)·L(θ − b)` con c = 0,25.**

Es una **constante fijada por el formato del ítem** —cuatro alternativas—, no un parámetro estimado.
El `c` por ítem del 3PL exige del orden de 1.000 respuestas por ítem y hoy hay **0 ítems con 30**
(R-17, G-2): estimarlo sería ruido con apariencia de rigor. Con c = 0 las fórmulas se reducen
**exactamente** a las del 1PL anterior, y eso está testeado: el motor v2 contiene al v1.

**2. El prior se suelta de N(0,1) a N(0, 2²).**

Y va en el **mismo commit** que el azar, no en el siguiente. Son un solo cambio.

Se eligió σ = 2 y no 3 pese a que σ = 3 mide mejor en el extremo (44 % contra 36 % de banda correcta
en θ = 2,0): σ = 3 pone el 95 % de la masa en [−6, 6], más ancho que la escala misma, y deja de
regularizar un banco cuya `difficulty` es autoral. Con `b` sin medir, algo de encogimiento protege
contra un ítem mal etiquetado.

**3. Los dos parámetros son configurables por evaluación** (`test_configs.prior_sd`,
`test_configs.guessing_c`), como ya lo eran `max_items` e `initial_theta`. El número correcto
depende de la población real de cada banco, que nadie ha medido.

**4. Cada fila de `tests` guarda con qué motor se calculó su θ** (`tests.engine_version`, espejo de
`universo.motor/version`). Las filas anteriores quedan en 1 por backfill: no es sobrescribir
histórico, es escribir un dato que siempre fue verdad.

**5. El tope de paso de 0,4 se queda.** Medido como casi irrelevante con σ = 1 — pero con σ = 2 el
MAP se mueve más y el tope **vuelve a hacer trabajo real**: es lo que impide que dos aciertos manden
a un estudiante a la cota.

**6. El estimador itera hasta convergencia, y el ADR se corrige en vez del código.** ADR-004 decía
«una iteración de Newton-Raphson» y listaba «iterar hasta convergencia» entre las alternativas
**descartadas**; el código hace lo segundo desde antes de que nadie lo anotara. Converger al MAP es
lo correcto. **Cierra X-10.**

## Resultado medido

Motor v1 contra v2 sobre el banco real, 4.000 simulaciones por celda, con estudiantes que adivinan:

| θ real | sesgo v1 | sesgo v2 | banda v1 | banda v2 |
|---|---|---|---|---|
| −1,5 | +1,00 | **+0,31** | 80 % | **95 %** |
| −0,5 | +0,61 | **+0,16** | 42 % | **71 %** |
| 0,0 | +0,42 | +0,08 | 66 % | 42 % |
| 1,0 | +0,05 | −0,07 | 51 % | 40 % |
| 2,0 | −0,40 | **−0,24** | 18 % | **37 %** |

⚠️ **Las filas de θ = 0,0 y 1,0 son exactamente los cortes de banda.** Un estudiante parado justo en
un corte es una moneda al aire por construcción; el sesgo de v1 «acertaba» ahí solo porque lo
empujaba siempre al mismo lado. No es una regresión: es el artefacto de medir sobre la frontera. El
sesgo, que sí se puede juzgar en el borde, baja en las cinco filas.

## Alternativas evaluadas

| Alternativa | Por qué se descartó |
|---|---|
| **3PL con `c` estimado por ítem** | ~1.000 respuestas por ítem para identificar `c`, y hoy hay 0 ítems con 30. Ruido con apariencia de rigor (R-17) |
| **Solo modelar el azar**, dejando σ = 1 | **Medido como regresión**: en θ = 2,0 el sesgo pasa de −0,40 a −0,82 y la banda correcta de 20 % a 4 % |
| **Solo soltar el prior**, sin azar | Empeora a los débiles: en θ = 0 el sesgo sube de +0,42 a +0,54, porque el azar sigue inflando aciertos |
| **σ = 3** | Mide mejor en θ = 2,0 (44 % contra 36 %) pero deja de regularizar: el 95 % de la masa queda fuera de la escala [−3, 3] |
| **Quitar el tope de paso** | Compra 0,00–0,06 logits y saca la salvaguarda justo cuando el prior suelto la vuelve necesaria |
| **Modelar el tiempo dentro de θ** (van der Linden 2007) | La estructura es la correcta y ADR-014 ya la eligió como eje separado, pero exige calibrar una intensidad temporal por ítem. Post-calibración |
| **Recalcular los θ históricos** con el motor nuevo | Sobrescribe evidencia. G-4 dice que el histórico no se toca: se versiona y se agrupa |
| **Cambiar la regla de parada en este commit** | Es T-111 y es una decisión aparte. Este commit cambia el estimador, no cuándo se detiene |

## Consecuencias

**Positivas**

- El sesgo del estudiante débil —el que el producto existe para ayudar— baja de +1,00 a +0,31, y su
  banda correcta sube de 80 % a 95 %.
- Un θ deja de ser un número sin procedencia: `engine_version` permite agrupar y hace posible el Δθ
  de G-4 sin mezclar escalas.
- El modelo con c = 0 **es** el modelo viejo, y hay tests que lo fijan: el cambio es auditable.
- El sesgo queda **medido por la suite**, con simulación determinista sobre el motor real
  (`motor_test/v2-corrige-el-sesgo-del-estudiante-debil`). Revertir el prior o el azar rompe tests.

**Negativas / costos aceptados**

- **Los θ de v1 y v2 no son comparables.** Cualquier consulta que compare θ entre fechas tiene que
  agrupar por `engine_version`. La columna lo hace posible, no automático.
- **La parada por precisión queda más lejos que antes.** Con azar, la información máxima por ítem
  cae de 0,25 a ≈0,155: 12 ítems no bajan el SE de ≈0,73 contra un umbral de 0,35. **R-38 y T-111
  siguen abiertos y empeoran**, con un test que lo deja escrito.
- **Sigue siendo malo en el extremo superior:** 37 % de banda correcta en θ = 2,0. Mejor que 18 %,
  lejos de bien. El techo real ahí son 12 ítems, no el estimador.
- El SE que usa la regla de parada sigue siendo el de verosimilitud, no el del posterior, aunque el
  estimador sea MAP. Se agregó `posterior-standard-error` para cuando G-4 publique el error, y la
  inconsistencia queda anotada en vez de resuelta a medias.

## Riesgos

- **R-39 (nuevo):** las migraciones se aplican a mano. Si el bundle llega a producción antes que
  `048`, PostgREST rechaza el insert entero y **el diagnóstico rendido se pierde**. Mitigado en el
  cliente: el guardado reintenta sin la columna y avisa por consola. La mitigación es una red, no un
  permiso para no aplicar la migración.
- **R-40 (nuevo):** los θ del histórico quedan en una escala que ya no se produce. Mientras nadie
  compare entre versiones no pasa nada; el día que G-4 entregue Δθ, hacerlo mal mide el motor en vez
  del estudiante.
- **R-17 sigue mandando.** Todo lo medido acá supone que `difficulty` es correcta. Es autoral: estos
  números son cotas optimistas y solo la calibración (G-2) los vuelve reales.

## Seguimiento

- **Aplicar `048`** antes de que el bundle llegue a producción, y verificar con la consulta que trae
  la migración al pie.
- **T-111 / R-38** — decidir qué se hace con la parada por precisión, ahora con la aritmética peor.
- **T-116 (nueva)** — separar la fluidez λ del sesgo corregido: los umbrales de λ se calibraron
  contra θ del motor v1 (R-24).
- **T-117 (nueva)** — la banda en θ = 2,0 sigue en 37 %. Evaluar test más largo o cortes distintos,
  que es la conversación de los cuatro ejes.
- Al calibrar (G-2), volver a discutir σ **con datos**, que es para lo que se dejó configurable.

---

Relacionado: [[ADR-004-irt-1pl-map-y-regla-de-parada]] · [[ADR-014-tiempo-de-respuesta-como-eje-separado]] ·
[[ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] · [[../project-memory/RISKS]] ·
[[../project-memory/BACKLOG]]
