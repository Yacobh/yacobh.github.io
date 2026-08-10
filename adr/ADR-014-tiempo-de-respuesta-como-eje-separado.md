# ADR-014: El tiempo de respuesta es un eje separado de θ, no un término dentro del modelo 1PL

## Estado

Aprobada

> **Alcance de esta aprobación:** se aprueban la **dirección** (tiempo como eje separado) y la
> **Fase 1** (filtro de respuestas no esforzadas), que es implementable de inmediato. Las Fases 2
> y 3 quedan aprobadas *como dirección* pero **no autorizadas para implementarse** hasta cumplir
> sus precondiciones de datos (§Decisión). La Fase 3 modifica el prior de
> [[ADR-004-irt-1pl-map-y-regla-de-parada]] y por lo tanto **exige un ADR propio que reemplace esa
> cláusula** — no se implementa bajo este ADR.

## Fecha

2026-08-08

## Contexto

### El problema que dispara esta decisión

La FAQ publicada en producción afirma, en los tres lugares donde vive el copy
(`src/universo/components/landing.cljs:57`, `index.html:141`, `public/index.html:141`):

> «No. El diagnóstico busca reflejar tus habilidades tal como las usarás en la PAES, así que no
> debes usar calculadora ni ayudas externas. **El tiempo de respuesta también se considera en la
> estimación.**»

Esto es **falso**. El modelo implementado en `universo.components.tetha` es un 1PL/Rasch puro: la
probabilidad de acierto depende solo de θ y de la dificultad `b` del ítem. El tiempo no aparece en
ninguna derivada, en ningún prior, en ninguna ponderación. La contradicción está registrada desde
la adopción de PMF como [[../project-memory/OPEN_QUESTIONS]] Q-17 y X-01, sin resolver.

Al plantearse el arreglo se abrieron dos caminos: **corregir el copy** (borrar la frase) o
**corregir el sistema** (que el tiempo efectivamente entre). El owner pidió explícitamente lo
segundo, conectándolo además con el eje de **frecuencia (λ)** que
[[../project-memory/VISION_LIBRO_PROYECTO]] §3.3 propone como segunda dimensión de clasificación, y
con el `max_minutes` por banco que ya existe desde [[ADR-013-config-parada-por-banco-y-prerequisitos]].

### Lo que ya existe y no hacía falta construir

Verificado en código al redactar este ADR:

- **El tiempo por respuesta ya se captura y se persiste.** `events/test.cljs:357` guarda
  `:time-ms` en cada entrada de `[:test :responses]`, y `:test/complete` (línea 496) serializa el
  mapa `:test` completo —respuestas incluidas— dentro de la columna JSONB `tests.test`. También
  viajan `:start-time` y `:end-time`.
- **No hay que instrumentar nada.** Desde el primer test que se rinda, el histórico de tiempos
  queda disponible para calibración retroactiva.
- `max_minutes` existe en `test_configs` (ADR-013) pero es una **regla de parada**
  (`irt.progress/stop-reason` → `:time-limit`), no un parámetro de medición.

### La restricción dura: no hay datos

> ⚠️ **Corrección 2026-08-10 — esta premisa era falsa al día siguiente de escribirse.** El
> 2026-08-09, auditando recursos para T-01, apareció que el panel muestra **80 usuarios y 252
> diagnósticos ya rendidos** (casi todos `@estudiantesunap.cl`, uso real del piloto UNAP). Además,
> `git log -S ":time-ms"` sitúa la instrumentación del cronómetro en **2025-09-09**, o sea
> **anterior** al piloto: esos 252 tests se rindieron con el tiempo midiéndose.
>
> No se borra el párrafo original —regla de gobernanza— pero **su conclusión no se sostiene**: la
> precondición de ≥ 30 tests de la Fase 2 probablemente está cumplida desde hace casi un año. Falta
> confirmar cuántas de esas filas traen `time-ms` utilizable
> ([[../project-memory/OPEN_QUESTIONS]] Q-26); las consultas están en
> `../supabase/queries/T-59_calibracion_tiempos.sql`.
>
> Esto lo levantó el owner al criticar la implementación de la Fase 1: si hay datos, fijar el
> umbral con constantes elegidas a mano es mantenimiento innecesario. Tiene razón, y de ahí sale
> [[../project-memory/BACKLOG]] **T-59**. La Fase 1 no se invalida —sigue siendo la capa de caso
> frío que hace falta para ítems sin datos, que siempre va a haber bajo ADR-016— pero **deja de ser
> el mecanismo definitivo y pasa a ser el piso**.

El proyecto tiene **cero estudiantes reales**. Cualquier modelo de tiempos serio requiere estimar,
por ítem, una **intensidad temporal** (cuánto tarda ese ítem en promedio) a partir de respuestas
acumuladas. Ese parámetro es tan dependiente de datos como la `difficulty`, que a su vez tampoco
está calibrada ([[../project-memory/RISKS]] R-17, [[../project-memory/OPEN_QUESTIONS]] Q-05).

Es decir: **el modelo correcto no es implementable hoy**, y cualquier decisión que lo ignore
produciría parámetros inventados alimentando estimaciones que se le muestran a un estudiante como
su nivel.

### El argumento que define el diseño

La tentación natural es meter el tiempo dentro del cálculo de θ: premiar rapidez, o agregar un
término `ln(t)` al logit. **Esto destruiría exactamente la información que se quiere capturar.**

El caso de uso que motiva el eje λ en el Libro del Proyecto es el estudiante que *«sabe, pero es
lento»*: comprensión sin automatización. Ese perfil es **θ alto con velocidad baja**. Si la
velocidad se funde dentro de θ, a ese estudiante le baja θ, cambia de banda, se le asigna otro cupo
y otro plan — y el perfil que se quería detectar **desaparece del sistema**. Es el problema clásico
de la compensación velocidad-precisión: un escalar no puede representar dos dimensiones
independientes sin perder una.

El marco estándar en psicometría para esto es el modelo jerárquico de van der Linden (2007), que
trata velocidad y habilidad como **dos rasgos latentes distintos**, cada uno con su propio modelo
de medición, correlacionados a nivel poblacional. El λ del Libro del Proyecto es la versión
intuitiva y cruda del parámetro de velocidad τ de ese marco; la intuición del fundador apuntaba en
la dirección correcta, y este ADR le pone la forma rigurosa.

## Decisión

**El tiempo de respuesta se modela como un eje separado de θ, nunca como un término dentro del
modelo 1PL de aciertos.** θ sigue significando exactamente lo que significa hoy: habilidad
estimada a partir de aciertos y dificultades, según [[ADR-004-irt-1pl-map-y-regla-de-parada]].

Se adopta una implementación en **tres fases, cada una con una precondición de datos explícita**.
Ninguna fase se implementa antes de cumplirla.

### Fase 1 — Filtro de respuestas no esforzadas · *aprobada, sin precondición*

Único punto donde el tiempo entra legítimamente en la estimación de θ: **descartar evidencia que no
es evidencia**. Una respuesta emitida en menos tiempo del que toma leer el enunciado no informa
sobre habilidad — es una moneda al aire — e incluirla **corrompe** θ. Es práctica operacional
estándar (Wise & Kong, *response time effort*).

Implementación:

- `universo.components.tetha` — `first-derivative` y `second-derivative` aceptan un **peso por
  respuesta**: `(+ sum (* w (- observed prob)))` y `(- sum (* w prob (- 1.0 prob)))`, con `w`
  por defecto `1.0`.
- `universo.irt.progress` — el mismo peso entra en la información de Fisher, para que
  `standard-error` refleje la información realmente disponible. **Sin esto el SE mentiría.**
- Una función pura nueva decide el peso a partir de `:time-ms` y del largo del enunciado.
  Umbral inicial conservador: `t_min = max(3 s, caracteres / 20)` — el texto matemático se lee más
  lento que la prosa. `w = 0` bajo el umbral, `1.0` sobre él.
- El umbral es **configurable por banco**, como columna nueva en `test_configs`, coherente con la
  configuración de parada de ADR-013.

**Propiedad emergente deseada:** al descartar respuestas baja la información acumulada, sube el
SE, y la regla de parada `SE ≤ 0,35` **automáticamente le hace más preguntas a quien responde al
azar**. El riesgo de test infinito ya está acotado por `max_items` y `max_minutes` (ADR-013).

Con esta fase, la frase de la FAQ pasa a ser **verdadera y defendible**: el tiempo de respuesta sí
se considera en la estimación, como criterio de validez de cada respuesta.

### Fase 2 — Velocidad (τ) como segundo eje reportado · *precondición: ≥ 30 tests completados*

- Estimar por ítem su **intensidad temporal** `β_i` como el promedio de `ln(tiempo)` sobre los
  estudiantes que lo respondieron.
- Estimar por estudiante su **velocidad** `τ_j` a partir del residuo:
  `τ_j = − promedio_i( ln T_ij − β_i )`.
- Reportar τ **junto a** θ, nunca fundido con él, y traducirlo a una prescripción pedagógica por
  cuadrante:

| | Velocidad alta | Velocidad baja |
|---|---|---|
| **θ alto** | Automatizado → avanzar de topic | **Sabe pero lento** → práctica de fluidez cronometrada |
| **θ bajo** | Respuestas no esforzadas → problema de esfuerzo, no de contenido | Dificultad genuina → volver al prerequisito |

El cuadrante inferior derecho se conecta directamente con la cadena de prerequisitos de ADR-013; el
inferior izquierdo es lo que detecta la Fase 1.

Nota estructural: `ln T_ij = β_i − τ_j + ε` tiene **la misma forma aditiva persona−ítem** que
`logit P = θ_j − b_i`. El modelo de tiempos es un Rasch sobre log-tiempos, así que reutiliza el
mismo esqueleto conceptual y de estimación ya presente en el proyecto.

### Fase 3 — Prior de θ condicional a la velocidad · *precondición: ≥ 200 tests + ADR propio*

Recién con τ estimado y una correlación poblacional ρ entre θ y τ medible, el tiempo puede afinar
θ por la vía correcta: un prior normal bivariado convierte el prior marginal en condicional.

```
prior-mean      →  ρ · τ̂
prior-precision →  1 / (1 − ρ²)
```

En el código actual esas son dos constantes sueltas (`tetha.cljs:7-9`), así que el cambio es
mínimo — pero **modifica la cláusula «MAP con prior N(0,1)» de ADR-004**. Por la regla de
gobernanza de [[../project-memory/AGENT_INSTRUCTIONS]] §8.7, esta fase **requiere un ADR nuevo que
reemplace esa parte de ADR-004**. No se implementa bajo este ADR.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Borrar la frase de la FAQ** y no tocar el modelo | Era la opción recomendada inicialmente por costo, pero el owner la rechazó con razón: el tiempo ya se recolecta, el eje λ ya está en la visión de largo plazo, y la Fase 1 hace verdadera la frase con un cambio chico. Borrar el texto habría cerrado una contradicción tirando a la basura una capacidad ya construida. **Sigue siendo el plan de respaldo** si la Fase 1 se demora más de lo previsto: no se deja una afirmación falsa publicada esperando una implementación futura. |
| **Bonificar la rapidez** en el puntaje o en θ | Premia adivinar y castiga al estudiante cuidadoso; invierte el constructo que se dice medir. Además haría que dos estudiantes con el mismo patrón de aciertos obtengan distinta habilidad estimada, lo que no es defendible frente a un apoderado. |
| **Modelo de límite de tiempo tipo Roskam**: agregar `ln(t)` al logit (`logit P = θ + ln t − b`) | Hace que θ dependa del esfuerzo invertido: quien se demora diez minutos en un ítem aparece como más hábil. Bajo un límite de tiempo (`max_minutes`) el incentivo es directamente perverso. Es un modelo legítimo para otros contextos, no para un diagnóstico con parada temporal. |
| **Un único puntaje que mezcle habilidad y velocidad** | Destruye los cuatro cuadrantes y, con ellos, el caso «sabe pero lento» que motivaba todo el ejercicio. Ver §Contexto. |
| **Usar `max_minutes` como parámetro de medición** (normalizar θ por fracción de tiempo consumida) | `max_minutes` es una regla de parada por banco, no una propiedad del estudiante ni del ítem. Usarla para medir confunde configuración administrativa con dato psicométrico, y cambiaría retroactivamente el significado de θ cada vez que un admin edite el límite en el panel. |
| **Implementar van der Linden completo de una vez** | Requiere estimar `β_i` (y opcionalmente `α_i`) por ítem a partir de datos que no existen. Con cero estudiantes, los parámetros serían inventados y se le mostrarían a un usuario real como su nivel. Se difiere a la Fase 2 con precondición explícita. |

## Consecuencias

**Positivas**

- La afirmación publicada en la FAQ pasa a ser cierta al cerrar la Fase 1, sin renunciar a la
  promesa ni a la capacidad ya construida.
- θ conserva su significado actual e interpretabilidad; ADR-004 sigue vigente sin cambios en
  Fases 1 y 2.
- El filtro de esfuerzo **mejora la calidad de θ desde el primer estudiante**, sin calibración
  previa: es el único componente de este diseño que no depende de datos.
- La regla de parada existente compensa sola: menos evidencia válida ⇒ más SE ⇒ más ítems.
- El eje λ del Libro del Proyecto deja de ser una aspiración sin diseño y pasa a tener una
  formulación concreta, una precondición medible y un uso pedagógico definido por cuadrante.
- El histórico de `time-ms` que ya se está guardando adquiere valor: cada test rendido desde hoy
  alimenta la calibración futura sin trabajo extra.

**Negativas / costos aceptados**

- El umbral de la Fase 1 es **heurístico** hasta tener datos. Un umbral mal puesto descarta
  respuestas legítimas de estudiantes genuinamente rápidos. Se mitiga arrancando conservador
  (solo lo absurdo) y calibrando con el histograma real.
- Las Fases 2 y 3 quedan **bloqueadas por volumen de usuarios**, que es precisamente el cuello de
  botella actual del proyecto. Este ADR no acelera el go-live; depende de él.
- Se agrega una columna de configuración más a `test_configs`, aumentando la superficie del panel
  de admin.
- El modelo de tiempos introduce vocabulario psicométrico nuevo (τ, intensidad temporal) que hay
  que reflejar en [[../project-memory/TERMINOLOGY]] y explicar al estudiante sin jerga.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Umbral de esfuerzo mal calibrado descarta respuestas válidas y sesga θ | Arrancar conservador (`max(3 s, caracteres/20)`), configurable por banco; revisar el histograma de tiempos al llegar a ~30 tests y mover el umbral al valle de la distribución bimodal | R-17 |
| Se implementa la Fase 2 o 3 con datos insuficientes y se publican parámetros inventados como "nivel" | Precondiciones de volumen escritas en este ADR; la Fase 3 además exige ADR propio que reemplace la cláusula del prior en ADR-004 | R-17, Q-05 |
| La frase de la FAQ sigue publicada y falsa mientras la Fase 1 no esté en producción | Plan de respaldo explícito: si la Fase 1 no se despliega pronto, se ajusta el copy en el intertanto. **Primero que sea verdad, después dejarla publicada** | X-01 |
| El peso se aplica en la verosimilitud pero se olvida en la información de Fisher | Está escrito como requisito explícito de la Fase 1; el test del namespace puro debe verificar que el SE sube al descartar una respuesta | R-08 |
| Medir velocidad de menores de edad se interpreta como perfilamiento conductual | τ se deriva de datos ya recolectados y declarados; no amplía la recolección. Si en algún momento se reporta al estudiante, debe explicarse en el Aviso de Privacidad como lo que es: una medida de fluidez, no de personalidad | R-06 |

## Seguimiento

- **Al cerrar la Fase 1:** verificar en vivo que una respuesta bajo el umbral no mueve θ y sí sube
  el SE. Recién entonces confirmar que el copy de la FAQ quedó cierto, y anotarlo en Q-17.
- **Al llegar a ~30 tests completados:** graficar la distribución de `ln(tiempo)` por ítem. Si no
  aparece la moda izquierda esperada (clickeo rápido), revisar el umbral — puede estar de más.
- **Al llegar a ~200 tests:** estimar ρ. **Si ρ resulta cercana a cero, la Fase 3 no se
  implementa**: significaría que en esta población velocidad y habilidad son independientes y el
  prior condicional no aportaría nada. Ese resultado negativo se documenta, no se fuerza el modelo.
- **Se reconsidera este ADR completo** si se cambia de modelo de respuestas (por ejemplo, un salto
  a 2PL al calibrar con datos reales), porque la estructura del prior conjunto cambiaría con él.

---

Relacionado: [[ADR-004-irt-1pl-map-y-regla-de-parada]] ·
[[ADR-013-config-parada-por-banco-y-prerequisitos]] ·
[[../project-memory/VISION_LIBRO_PROYECTO]] §3.3 · [[../project-memory/OPEN_QUESTIONS]] Q-17, Q-05 ·
[[../project-memory/RISKS]] R-17 · [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]]
