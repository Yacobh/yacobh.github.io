# ADR-039: El tiempo esperado es una propiedad del ítem, no del largo de su enunciado

## Estado

**Aprobada** — decidida por el owner el 2026-09-17. **Sin implementar**: no hay
migración escrita ni código. Este ADR fija el diseño; la implementación es T-150.

## Fecha

2026-09-17

## Contexto

**ADR-019** agregó el segundo eje del perfil: la **fluidez (λ)**, que separa
*«sabe»* de *«sabe y automatizó»*. Su argumento, textual del libro del proyecto:
*«conocimiento alto y frecuencia baja indica comprensión sin automatización, y
requiere un tipo de práctica distinto»*. Esa persona no necesita más teoría,
necesita repetición — y recomendarle contenido nuevo es exactamente lo contrario
de lo que le sirve.

λ se mide con tiempo, y el tiempo crudo no sirve: un enunciado de 400 caracteres
tarda más que uno de 40 sin que eso diga nada del estudiante. `universo.irt.fluency`
lo resolvió normalizando por el **tiempo de lectura**:

```clojure
;; universo.irt.effort
(def chars-per-second 20.0)
(defn reading-seconds [texto] (/ (count (str/trim texto)) chars-per-second))

;; universo.irt.fluency
t_rel = segundos observados / reading-seconds(enunciado)
```

Con cortes `t_rel ≤ 3 → :fluida`, `≤ 6 → :media`, `> 6 → :laboriosa` (`041`,
configurables por banco). Y el mismo `reading-seconds` es la parte proporcional
del piso de esfuerzo de ADR-014: `min-response-seconds = max(piso, largo/20)`.

**La decisión fue razonable y hay que decir por qué:** el largo del enunciado es
el único dato del ítem que estaba disponible sin pedirle nada a nadie, es
adimensional, y se explica en una frase — *«tardó tres veces lo que toma leerlo»*.

### El problema, medido

El normalizador usa **cuánto se tarda en leer** como proxy de **cuánto se tarda en
resolver**, y esas dos cosas se despegan justo donde el producto se juega.
Medición sobre los 100 ítems de `contenido/items/numeros.json` (2026-09-17):

| tramo de `difficulty` | n | largo mediano | `reading-seconds` |
|---|---|---|---|
| [−3, −2) | 15 | 43 car. | **2,15 s** |
| [−2, −1) | 28 | 55 car. | **2,75 s** |
| [−1, 0) | 21 | 45 car. | **2,25 s** |
| [0, +1) | 17 | 52 car. | **2,60 s** |
| [+1, +2) | 12 | 98 car. | 4,90 s |
| [+2, +3) | 6 | 124 car. | 6,17 s |

Correlación global `difficulty ↔ largo`: **`r = +0,51`**. O sea que el proxy
**no es malo en promedio** — captura alrededor de un cuarto de la varianza. Pero
los **cuatro tramos de abajo son indistinguibles entre sí**: para **81 de los 100
ítems**, `reading-seconds` es una constante de ~2,4 s, y `t_rel` se vuelve un
tiempo absoluto disfrazado de razón.

El caso que lo muestra en una línea:

| ítem | largo | «lectura» | resolver, realista | `t_rel` | banda λ |
|---|---|---|---|---|---|
| `$\frac{3}{4} + \frac{2}{5}$` | ~20 car. | **1,0 s** | 25–40 s | **~30** | `:laboriosa` |
| Problema de contexto con una resta trivial | ~300 car. | **15 s** | ~5 s | **~0,3** | `:fluida` |

**El ítem simbólico corto —denominador común, dos productos, una suma— sale
`:laboriosa` por más automatizado que esté el estudiante. El problema largo con
aritmética trivial sale `:fluida` sin haber medido fluidez de nada.** La
clasificación no es ruidosa: está **invertida** en los dos extremos.

Y la parte que más importa dado a qué se dedica el producto: **los ítems del piso
del banco son los más cortos** (43 caracteres en [−3, −2)), así que el sesgo cae
sobre el estudiante más débil — el mismo argumento con el que ADR-034 justificó
soltar el prior, y el mismo al que apunta **R-44**.

### Las dos preguntas abiertas que esto desbloquea

- **Q-47** (🟠): **29 de 195 respuestas tienen `weight = 0`, y ~14 son aciertos
  descartados por rápidos — el 13,5 % de todos los aciertos de la sesión**.
  ADR-014 dice que una respuesta muy rápida es sospechosa; ADR-019 dice que rápido
  y correcto **es la definición de fluidez**. El filtro corre primero y borra la
  evidencia. La ficha lo dice: *«no es un bug, es una decisión que nadie tomó»*.
  Con un umbral por ítem, «rápido» deja de ser una constante y las dos reglas
  dejan de contradecirse.
- **T-116** / **R-24**: los cortes de λ nunca se calibraron, y ahora además cruzan
  un θ que cambió de escala con el motor v2.

### Por qué esto sí es calibrable, y `order_index` no lo era

Esta decisión salió de preguntar si `order_index` podía servir de segunda
dimensión. **No podía**: es el rango de dificultad dentro del módulo con otro
nombre (2 inversiones en 476 pares consecutivos), así que no aporta información
que `difficulty` no tenga ya, en logits y mejor.

El tiempo esperado es distinto, y la diferencia es la que importa para **G-2**:
**el dato para corregirlo ya está guardado.** Cada fila de `tests` tiene el tiempo
de cada respuesta. `expected_seconds` nace como hipótesis autoral —igual que
`difficulty`— pero, a diferencia de `difficulty`, **no necesita un modelo para
calibrarse: le basta la mediana observada de los que acertaron.**

## Decisión

**`questions` gana una columna `expected_seconds`: los segundos que se espera que
tome resolver ese ítem a alguien que lo tiene automatizado.** Es una hipótesis
editorial al nacer y una cantidad medida después.

```sql
alter table public.questions
  add column if not exists expected_seconds double precision
    check (expected_seconds is null or (expected_seconds > 0 and expected_seconds <= 600));
```

**Nullable a propósito**, y ésa es la pieza que hace la decisión aplicable:

```clojure
;; universo.irt.effort
(defn expected-seconds
  "Segundos esperados de resolución. La columna si está; el largo del enunciado
   si no. El fallback NO es provisional: un ítem sin estimar tiene que seguir
   clasificándose, y `reading-seconds` es exactamente lo que se usaba antes."
  [item]
  (or (:expected_seconds item)
      (reading-seconds (:question item))))
```

`t_rel` pasa a ser `observados / expected-seconds(ítem)`, y
`min-response-seconds` pasa a ser `max(piso, expected-seconds(ítem) × k)`.
**Un banco sin una sola estimación se comporta exactamente como hoy.**

### Reglas que esta decisión fija

1. **`expected_seconds` es el tiempo de RESOLVER, no de leer.** Incluye leer,
   porque es el tiempo total esperado, pero lo que lo domina es el trabajo.
2. **Es una hipótesis autoral y se dice así**, con las mismas palabras que
   `difficulty`: *«apuesta editorial, no medición»* (R-17). **No se puede afirmar
   en ningún material de cara al cliente que λ esté calibrada** hasta que la
   columna se haya corregido con datos.
3. **Se estima con la escala del ítem automatizado**, no del estudiante promedio:
   *«¿cuánto tarda alguien que ya sabe hacer esto?»*. Es la única lectura que hace
   que `t_rel` alto signifique «le costó».
4. **Se calibra con la mediana observada de las respuestas correctas**, cuando el
   ítem tenga suficientes. Mismo umbral que G-2 usa para `difficulty` (~30), misma
   lista de exclusión (T-145), mismo `origin = 'student'`.
5. **`universo.motor/version` NO sube.** θ no cambia: el estimador no mira el
   tiempo. Lo que cambia es λ y el filtro de esfuerzo. Si hiciera falta versionar
   λ, sería una versión propia y no la del motor de θ (ADR-034).
6. **La skill `banco-de-items` pide `expected_seconds` en cada ítem nuevo**, y
   `verificar_items.py` avisa —no falla— si falta o si es incoherente con la
   dificultad.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|---|---|
| **Reutilizar `order_index`** como segunda dimensión | Medido: es el rango de dificultad dentro del módulo (2 inversiones en 476 pares). No aporta nada nuevo. Y repurposear una columna cuyo nombre significa otra cosa es la próxima entrada de `LESSONS_LEARNED`: ya pasó con `explanation`, que no existía y alguien supuso (L-46, `047` falló con `42703`), y con los topics con y sin acento tratados como bancos distintos (T-51). **Una columna nueva con el nombre correcto sale más barata que un nombre mentiroso** |
| **Solo umbrales por módulo** (ADR-038 §Fluidez) | Se hace igual, y es lo que se puede hacer **sin esquema nuevo**. Pero un módulo de 1,4 logits sigue mezclando `$\frac{3}{4}+\frac{2}{5}$` con un ítem de la misma banda y otra carga. Mitiga; no corrige la causa |
| **Afinar `chars-per-second`** (hoy 20) | Mueve la escala entera y no cambia nada relativo. El problema no es la constante, es que el largo del enunciado no predice el trabajo en el 81 % del banco |
| **Contar los pasos de resolución** en vez de segundos | Más fácil de escribir a mano y más objetivo. Pero **no se puede calibrar contra el dato que existe**: `tests` guarda segundos, no pasos. Se pierde la propiedad que hace valiosa a esta decisión. Se puede usar como método para *estimar* los segundos |
| **Estimar el tiempo con el modelo al escribir el ítem** (2 s por paso, etc.) | Es exactamente lo que va a pasar en la práctica y está bien — pero es un **método de autoría**, no un diseño de datos. Lo que se guarda son segundos |
| **Sacar el filtro de esfuerzo** para que λ vea las respuestas rápidas (Q-47) | Reintroduce por la ventana el ruido que ADR-014 sacó por la puerta: el click-through existe y está medido. La salida no es apagar el filtro, es que su umbral deje de ser una constante |

## Consecuencias

**Positivas**

- **λ deja de estar invertida en los extremos.** Es la razón de ser de la
  decisión, y el defecto está medido, no supuesto.
- **Q-47 gana una salida que no obliga a elegir entre ADR-014 y ADR-019.** Con un
  umbral por ítem, «sospechosamente rápido» y «fluido» dejan de ser el mismo
  número para todos los ítems del banco.
- **El segundo eje del perfil pasa a ser calibrable con datos que ya existen.**
  Hoy λ es autoral de punta a punta (R-24). Es la primera pieza del perfil que
  puede corregirse sin esperar los 30 responses por ítem que pide `difficulty`:
  para el tiempo, la mediana de unos pocos aciertos ya dice algo.
- **Aditiva y sin despliegue coordinado.** Columna nullable con fallback al
  comportamiento actual: la migración puede aplicarse con el bundle viejo en
  producción sin que nada cambie.
- **Le da a la revisión pedagógica pendiente algo concreto que producir.** Los
  402 ítems de T-120…T-124 se están revisando igual; estimar el tiempo es un
  campo más por ítem en una pasada que ya hay que hacer.

**Negativas / costos aceptados**

- **Es un número por ítem, a mano, para 402 ítems** (más 116 de electrotecnia).
  El fallback lo hace incremental —se puede empezar por un módulo— pero el
  trabajo total es real y **el cuello de botella sigue siendo la revisión
  humana**, no la redacción.
- **Otra hipótesis autoral en el perfil.** Mientras no esté calibrada, λ sigue sin
  poder afirmarse como medición. La decisión **no mejora eso por sí sola**: lo que
  mejora es que ahora hay un camino para corregirlo.
- **Dos fuentes de verdad durante la transición.** Un banco con la mitad de sus
  ítems estimados clasifica con dos normalizadores distintos. Es aceptable porque
  λ usa la **mediana** del estudiante y no un ítem suelto, pero hay que mirarlo
  antes de comparar bandas de λ entre cohortes.
- **`expected_seconds` puede quedar desactualizada** si se edita el enunciado de un
  ítem sin revisar el tiempo — un riesgo que `reading-seconds` no tenía, porque se
  recalculaba solo.

## Riesgos

| Riesgo | Mitigación | Ref. |
|---|---|---|
| Se presenta λ como calibrada porque «ahora tiene su propio parámetro» | El parámetro nace autoral. Regla 2 de la decisión, y la misma frase que gobierna `difficulty`. **No entra en copy ni en el reporte de T-77 hasta tener datos** | R-17, R-24 |
| Un enunciado se edita y el tiempo esperado queda viejo | El editor en vivo (ADR-032) y el panel muestran los dos campos juntos; `verificar_items.py` avisa si `expected_seconds` es incoherente con `difficulty` | — |
| Se estima el tiempo del estudiante promedio en vez del automatizado, y `t_rel` deja de significar «le costó» | Regla 3, explícita en la skill y en el campo del panel | — |
| Otra pasada de 402 ítems que nadie alcanza a hacer, mientras el proyecto sigue sin clientes | El fallback permite empezar por **un módulo** —el que se vaya a usar con alguien real— en vez de por el banco. Y **T-131 no espera a esto** | R-30, R-41 |
| La mediana observada se calibra con corridas de depuración | `origin = 'student'` (`067`) más la lista de exclusión versionada en `supabase/queries/` | R-37, T-145 |

## Seguimiento

**Se reconsidera si**, con un módulo estimado y ~30 tests reales encima:

1. **La distribución de `t_rel` no se vuelve interpretable.** Si con
   `expected_seconds` los ítems cortos siguen cayendo en `:laboriosa`, el problema
   no era el normalizador y hay que mirar si `t_rel` es la medida correcta.
2. **Las estimaciones autorales se despegan mucho de la mediana observada.** Es el
   resultado más informativo posible y no invalida la decisión: **significa que la
   columna hay que calibrarla, que es exactamente para lo que se creó.** Se mide y
   se corrige, no se discute.
3. **Nadie estima el campo.** Si a los seis meses sigue en `null` para todo el
   banco, la decisión fue correcta en el diseño e irrelevante en la práctica, y lo
   honesto es decirlo y volver a los umbrales por módulo de ADR-038.

**Queda explícitamente fuera y se decide aparte:**
- el `k` del piso de esfuerzo sobre `expected_seconds` (hoy el piso es `max(3, …)`,
  bajado a 2 por T-59) — se fija al implementar, con los datos de Q-47 delante;
- si λ merece su propia versión estampada en `tests`, como `motor/version` hace
  con θ (ADR-034);
- **discriminación (`a`, modelo 2PL)**, que es la otra segunda dimensión clásica de
  un ítem: ADR-004 eligió 1PL a propósito y esta decisión **no lo reabre**.

---

Relacionado: [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] ·
[[ADR-014-tiempo-de-respuesta-como-eje-separado]] · [[ADR-004-irt-1pl-map-y-regla-de-parada]] ·
[[ADR-034-azar-fijo-prior-suelto-y-version-del-motor]] ·
[[ADR-038-el-modulo-es-rendible]] ·
[[../project-memory/OPEN_QUESTIONS]] Q-47 · [[../project-memory/RISKS]] R-24, R-17, R-44 ·
[[../project-memory/BACKLOG]] T-116, T-120…T-124, T-150 ·
`src/universo/irt/fluency.cljs`, `src/universo/irt/effort.cljs`
