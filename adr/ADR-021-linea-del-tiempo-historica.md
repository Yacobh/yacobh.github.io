# ADR-021: La línea del tiempo histórica es el eje del tablero, y las medallas se derivan de `tests`

## Estado

Aprobada

## Fecha

2026-08-13

## Contexto

El owner describió una idea que, en sus palabras, lo persigue: una **"regla del tiempo"** en el
borde inferior del tablero de aprendizaje, que ubicara "los acontecimientos y recursos en el
tiempo", y donde los recursos aparecieran como **medallas que se van descubriendo** a medida que el
estudiante rinde tests o revisa material.

La idea llega sobre un hecho ya registrado. [[../sessions/SESSION-021]] anotó el 2026-08-12:

> el proyecto tiene contenido histórico —20 módulos con `historical_blurb`, decenas de recursos con
> `historical_context`, incluidos los 15 que se escribieron para el track de cuántica— y un visitante
> no ve nada de eso. Es contenido pagado y guardado que no está trabajando. Es probablemente el
> cambio de mayor impacto por menor esfuerzo que tiene el proyecto hoy.

Ese contenido existe desde `002` (2026-07) y nunca tuvo una superficie donde mostrarse. La línea del
tiempo es esa superficie.

**Las dos restricciones que encontró la investigación, y que definieron el diseño:**

1. **Los 20 módulos PAES no tienen ningún año.** `historical_blurb` es prosa ("Desde los sistemas
   egipcio y babilónico hasta la notación posicional: contar fue el primer lenguaje matemático"). Los
   15 de cuántica sí traen años dentro del texto (1925, 1926, 1927…), pero como narración, no como
   dato. Un texto no se puede ordenar en un eje.
2. **No existe ninguna tabla que registre qué recursos abrió un estudiante.** No hay `resource_views`
   ni tabla de logros. Lo único que registra actividad es `tests`, con 252 diagnósticos rendidos.

El owner eligió entre alternativas: eje **cronológico real agrupado por épocas** (sobre ordinal o
dos carriles), medallas derivadas de **solo lo que ya se registra** (sobre agregar tracking de
lectura o curaduría manual), y ubicación **fija al pie, solo en el tablero**.

## Decisión

**1. El eje es tiempo histórico real, no orden curricular.** Un módulo no es "la unidad 4": es el
momento en que alguien resolvió por primera vez ese problema. La migración `042` agrega
`modules.historical_year` (entero con signo, negativo = a.C.), `historical_era` y
`historical_figure`.

**2. El año es nullable y un módulo sin año no aparece en la línea.** Inventarle una fecha a un
módulo para que "no falte" sería peor que omitirlo. Misma regla que
`questions.misconception_*_id`: null es "sin catalogar", no "cero".

**3. La era se guarda aunque sea derivable del año.** La línea agrupa por era, y calcular el corte
en el cliente pondría el criterio en el código en vez de en el dato. Dos `check` en la base fijan el
vocabulario y la coherencia año↔era, para que el dato no pueda contradecirse a sí mismo.

**4. El eje no es lineal: se agrupa por era y se reparte dentro de cada una.** Entre el papiro de
Moscú (−1850) y John Bell (1964) hay 3800 años, pero **14 de los 35 hitos caen entre 1900 y 1964**.
Un eje lineal los apilaría en un punto y dejaría el 80 % de la línea vacía.

**5. Las medallas se derivan del mejor θ por módulo, desde la tabla `tests`.** Oro con θ ≥ 2, plata
con θ ≥ 1, bronce por haber rendido. Sin tablas nuevas, sin RLS nueva, sin eventos de tracking.
Los cortes son **espejo de `universo.profile/theta-band`**: si divergieran, alguien vería "Avanzado"
en su perfil y plata en la línea, por el mismo test.

**6. Toda la lógica vive en `universo.timeline`, puro y testeado** (ADR-009), reutilizando
`universo.access/best-theta-by-topic` y `universo.topics/module-slug-for`, que ya existían. El
componente solo dibuja.

**7. Los años los propone el agente y los audita el profesor antes de aplicar la migración**
(ADR-016). La migración se entrega escrita y sin aplicar, y **declara sus tres puntos débiles** para
que la auditoría se concentre ahí.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Eje ordinal con `order_index` (ya existe, cero migración) | Es una barra de progreso curricular con forma de línea. No hay historia, y era la historia lo que había que poner a trabajar |
| Dos carriles paralelos (historia arriba, recorrido del estudiante abajo) | Más rico y bastante más caro; se puede agregar después sobre esta base sin rehacerla |
| Tabla `resource_views` para encender medallas al abrir un recurso | Migración + policy RLS + eventos de tracking, y **arranca vacía para todos**: ningún estudiante vería nada el primer día. La versión derivada de `tests` funciona hacia atrás con los 252 diagnósticos ya rendidos |
| Tabla de logros curada por el profesor | Control total, trabajo manual permanente, no escala |
| Fecha como `date` en vez de entero | Ninguna de estas fechas tiene día ni mes y varias son aproximadas por siglo. Obligaría a inventar precisión inexistente |
| Derivar la era del año en el cliente | Pondría el criterio de corte en una constante de ClojureScript, invisible desde la base |

## Consecuencias

**Positivas**

- El contenido histórico deja de estar muerto: el panel de detalle es el único lugar de la app donde
  `historical_blurb` llega a los ojos de alguien.
- **Las medallas funcionan retroactivamente.** Quien ya rindió ve su recorrido encendido la primera
  vez que abre el tablero, sin hacer nada.
- Cero esquema nuevo más allá de tres columnas en una tabla de catálogo; cero cambios de RLS.
- El tablero gana un elemento propio, difícil de confundir con otro producto —que era la mitad del
  reclamo del owner sobre lo genérico.

**Negativas / costos aceptados**

- **Un módulo = un hito.** La historia real es más densa; esto es una simplificación pedagógica
  deliberada.
- Los años son atribuciones discutibles por naturaleza. Se eligió el criterio "primera aparición en
  forma reconocible para el estudiante de hoy", y se dejó dicho dónde es más frágil.
- El track experimental de cuántica aparece en la misma línea que PAES. Hoy no molesta porque sus
  bancos están inactivos (ADR-018), pero si un estudiante de PAES llegara a verlos, los vería
  también acá.
- La barra `fixed` ocupa alto permanente en el tablero (`pb-40` compensa). En móvil es espacio caro.
- Si `042` no está aplicada, la línea no se dibuja. Es correcto para el estudiante y silencioso para
  quien despliega: queda documentado en el docstring del componente.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Un año equivocado en una línea del tiempo de matemática desarma la credibilidad del resto del producto | Auditoría humana obligatoria antes de aplicar; la migración declara sus puntos débiles; los valores son un `update` fácil de corregir | ADR-016 |
| Los cortes de medalla divergen de `theta-band` en un cambio futuro | Espejo documentado en ambos lados, como el de `fluency/default-thresholds` con `041` | [[ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]] |
| Un slug del `update` no coincide y el módulo queda sin año en silencio | Consulta de control en la migración: 35 ubicados / 0 sin ubicar. Es el modo de fallo del `left join` de `035` | [[../project-memory/LESSONS_LEARNED]] |
| La gamificación desplaza el foco del diagnóstico | Las medallas no otorgan nada ni cambian el plan: son una lectura del θ que ya existe | — |

## Seguimiento

- Cuando haya tracking de lectura de recursos (si alguna vez se decide), las medallas pueden ganar un
  segundo grado sin rehacer nada: `milestones` ya devuelve el hito completo.
- Si el track de cuántica se revierte después del examen, sus 15 hitos desaparecen solos de la línea
  al borrarse los módulos.
- Revisar si conviene el segundo carril (el recorrido temporal del propio estudiante) una vez que
  haya suficientes diagnósticos por persona para que la línea propia tenga más de un punto.
- El componente **no ha sido verificado visualmente**: requiere `042` aplicada y una cuenta con
  historial.

---

Relacionado: [[ADR-020-identidad-visual-por-tokens]] · [[ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] ·
[[ADR-009-logica-pura-testeable]] · [[../project-memory/ARCHITECTURE]] ·
[[../project-memory/DECISIONS]] · [[../sessions/SESSION-021]]
