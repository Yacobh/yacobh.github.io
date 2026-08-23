# ADR-031: El fondo de página es un plano de medida, y ninguna sección hereda su fondo

## Estado

Aprobada. **Extiende a [[ADR-023-panel-de-instrumento]]**, no la reemplaza: el panel sigue siendo la
cara del aparato, y esto define qué tiene impreso encima.

## Fecha

2026-08-23

## Contexto

El owner pidió un fondo «que represente la visión científica» y propuso símbolos matemáticos
flotantes. Eso choca de frente con dos decisiones ya tomadas: ADR-022 eliminó el degradado de fondo
con el argumento textual *«el degradado es decoración»*, y `feedback_modal.cljs:52` ya tiene escrito
el criterio de animación del proyecto —*«una animación que no termina no comunica nada, solo pide
atención»*—. Un fondo de ∑ y π flotando es exactamente lo que esas decisiones descartaron, y
comercialmente iguala el producto con cualquier preuniversitario.

El reencuadre que resolvió la discusión: **la única versión de esto que sobrevive al propio criterio
del proyecto es un fondo que sea un dato, no un adorno.** El producto mide habilidad con IRT; la
superficie puede declarar eso.

Se prototiparon seis retículas sobre el panel real y el owner eligió el **graticule de osciloscopio**
—divisiones amplias, dos ejes, ticks finos sobre los ejes— por sobre milimetrado, puntos y perforado
Braun. Es el único que se lee como aparato de medición y no como papel.

**Y al implementarlo aparecieron dos hechos medidos que cambiaron el diseño:**

**1. El origen no podía ir al centro.** El fondo vive en el contenedor `min-h-screen flex-col` de
`home.cljs`, que **crece con el contenido**. `background-position: center` no es el centro de la
pantalla sino el del **documento**: en una landing de 3000 px el cruce de ejes cae a 1500 px de
scroll y la banda de ticks aparece como una franja suelta a mitad de página.

**2. Las alfas tenían techo, y lo impone `.grabado`.** La retícula oscurece el panel bajo el texto
que va directo sobre la carcasa. Con las alfas del prototipo (0.10 claro / 0.085 oscuro) el peor caso
—un glifo de 11 px justo encima de una línea gruesa— caía a **4.47 en claro y 4.05 en oscuro**:
reprobaba AA.

**Por separado, y esto es lo más grave de la sesión:** al llevar el mismo criterio al CV
(`/profesor`) se midió el contraste real de sus 336 nodos de texto contra su fondo efectivo, y
salieron **52 fallos en claro y 12 en oscuro**. La causa no fue el remapeo de temas de ADR-012 sino
que **`experiencia`, `habilidades` y `reconocimientos` no tenían fondo propio**: eran transparentes
y caían sobre el panel gris. El CV se escribió asumiendo una hoja blanca. El peor caso daba **1.22**.

Ese defecto **es anterior a este ADR** —`bg-panel-300` ya estaba— y **ningún auditor lo detectó**:
`audit_contraste.py` verifica pares declarados a mano de la paleta, no lo que compone el navegador.

## Decisión

**1. El fondo de la página es un graticule, con el origen anclado abajo a la izquierda.** Una clase
`.fondo-graticule` en `src/css/app.css` (ADR-012: el color se centraliza), aplicada con una sola clase
en `home.cljs`. Anclado a `0% 100%` los dos ejes viven en bordes que siempre están donde uno espera,
y el plano se lee como primer cuadrante. **`center` queda prohibido** mientras el contenedor crezca
con el contenido.

**2. Las alfas están medidas contra `.grabado`, no elegidas a ojo.** Claro: gruesa 0.065, fina 0.038.
Oscuro: gruesa 0.042, fina 0.024. Peor caso resultante 4.80 y 4.65. El techo real es 0.086 y 0.0445.

**Consecuencia aceptada y explícita: en tema oscuro la retícula es notoriamente más tenue que en
claro.** No es un desbalance por descuido — es el techo que impone `.grabado` en `panel-400` sobre
`panel-800`. Subirla exige cambiar ese token, que es decisión de ADR-023.

**3. Sin números y sin rótulo.** Un graticule real no los lleva en el vidrio: van serigrafiados en la
carcasa. Se probó numerar cada división y el resultado quedaba medio tapado por las placas.

**4. Sin animación, por ahora.** El gancho existe (`[:ui :transitioning]`, `router.cljs:72`), pero
navegar entre secciones **no cambia ningún dato**, así que animar ahí sería decoración. Queda
diferido a cuando haya un Δθ real que comunicar → [[../project-memory/BACKLOG]] T-108.

**5. La regla general, que es lo que hay que recordar de este ADR:**

> **Toda sección declara su propio fondo.** Una sección sin `bg-*` hereda lo que haya debajo, y lo
> que haya debajo puede cambiar sin que nadie toque esa sección.

Se aplica con `bg-white` y **no** con `bg-panel-*` porque `app.css` ya mapea `bg-white` a
`grafito-900` en oscuro: la superficie queda correcta en ambos temas **sin escribir un solo `dark:`**.

**6. El contraste se verifica sobre el DOM renderizado, no solo sobre la paleta.** Los 52 fallos
existían con los cuatro auditores en verde. Se abre [[../project-memory/BACKLOG]] T-107 para
automatizarlo; hasta entonces el chequeo es manual y está descrito en
[[../project-memory/LESSONS_LEARNED]] L-47.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Símbolos matemáticos flotantes (∑ ∫ π √) | Lo que hace todo preuniversitario. Iguala el producto con la competencia de la que G-2 quiere diferenciarse con un argumento psicométrico. Además sobre `panel-300` un glifo a baja opacidad se ve sucio, no tenue |
| Canvas 2D + `requestAnimationFrame` | Repinta siempre, castiga batería en móvil y no es testeable. `src/universo/animations.cljs` es el fósil muerto de ese enfoque |
| WebGL / three.js | Dependencia npm nueva sin ADR (CLAUDE.md §5) y peso de bundle, para un adorno |
| Milimetrado (V1) y milimetrado + eje (V5) | Leen como cuaderno de ingeniería, no como instrumento. En oscuro pesan |
| Puntos (V3) y perforado Braun (V4) | Válidos y más callados, pero no dicen nada: son textura. El graticule declara que la superficie **es un plano de medida** |
| Origen al centro o inferior-centro | Centro es inviable (§Contexto 1). Inferior-centro es el plano exacto de la ICC y era la recomendación técnica, pero el owner eligió inferior-izquierda |
| Dos pilares (∫ a escala de columna) en el CV | **Implementado y retirado en la misma sesión**: al owner le encerraron la página. Obligaban a un `max-w-5xl` que enmarcaba el CV, y sin los pilares ese ancho era un marco sin función |
| Subir el token de `.grabado` para poder oscurecer más la retícula | Cambiar un token medido de ADR-023 para acomodar un fondo es invertir la prioridad: el texto manda sobre el adorno |

## Consecuencias

**Positivas**

- La superficie del producto dice lo que el producto hace. En un pitch B2B *«el fondo es el plano de
  medida del modelo»* es una frase de venta; *«hay unos π flotando»* es gasto.
- Coste real cero: CSS puro, sin JS, sin bundle, sin dependencias.
- **El CV pasó de 52 fallos de contraste a 0 en claro y 0 en oscuro**, y la corrección es estructural
  (superficie propia) y no cosmética (subir un token acá y allá).
- Quedó documentado en el propio CSS *por qué* cada alfa es la que es, para que nadie «arregle» el
  balance del tema oscuro y rompa el contraste.

**Negativas / costos aceptados**

- La retícula oscura es tenue y puede parecer un olvido. Está explicado en el comentario del bloque.
- El graticule se ve en la home pero **no en el CV**: ahí cada sección es opaca y a ancho completo.
  Es coherente pero no uniforme.
- `audit_contraste.py` sigue siendo ciego a las capas compuestas. Hasta T-107, la garantía de que no
  hay otro `/profesor` escondido es **que nadie lo ha medido**, no que esté verificado → R-36.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Otra sección o página tiene el mismo defecto de fondo heredado y ningún auditor lo ve | T-107 automatiza la medición sobre el DOM; hasta entonces, chequeo manual al tocar cualquier superficie | [[../project-memory/RISKS]] R-36 |
| Alguien sube las alfas de la retícula «porque en oscuro no se ve» | El techo medido y el porqué están en la cabecera del bloque CSS, que es lo primero que se lee al tocarlo | §Decisión 2 |
| Vuelve `background-position: center` al crecer el contenedor | Prohibición explícita escrita en el comentario del bloque | §Decisión 1 |

## Seguimiento

- **T-107** — auditor de contraste sobre el DOM renderizado (la brecha que dejó pasar los 52).
- **T-108** — animar el fondo solo cuando comunique un dato (Δθ), no en la transición de sección.
- **R-36** — fondo heredado sin verificación automatizada.
- **L-47** / **L-48** — la lección del auditor ciego y la del glifo que no existe en la fuente.
- **Q-41** — la ciudad de las dos entradas nuevas de docencia; se escribió «Chile» (A-37).

---

Relacionado: [[ADR-022-lenguaje-braun-rams]] · [[ADR-023-panel-de-instrumento]] ·
[[ADR-012-tema-oscuro-mapeo-css-global]] · [[../project-memory/DECISIONS]] D-62 ·
`../sessions/SESSION-036.md`
