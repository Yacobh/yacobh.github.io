# ADR-033: El estado se dice con un diodo, el riel vive en el flujo, y hay un auditor que lo recuerda

## Estado

Aprobada. **Reemplaza la §1 de [[ADR-032-capa-cero-al-lado-y-editor-en-vivo]]** (la cáscara `fixed`
del panel). El resto de ADR-032 sigue vigente.

## Fecha

2026-08-24

## Contexto

ADR-032 movió la capa cero del diagnóstico de un modal a un panel al costado. Al probarlo, el owner
levantó cuatro cosas. Ninguna era una preferencia: las cuatro eran defectos con causa identificable.

1. **El panel se montaba sobre el footer.** La cáscara era `fixed right-0 top-16 bottom-0`. Un
   elemento `fixed` está anclado a la **ventana** y no sabe que el documento tiene un final: al
   llegar al pie de página se le sentaba encima. Para que respetara el footer habría que escucharle
   el scroll y corregirle la altura a mano, que es mucha maquinaria para algo que el flujo normal ya
   resuelve.

2. **«El color verde del correcto no compagina con los colores del tema. ¿Está heredando algo o está
   tomando los suyos?»** Estaba tomando los suyos, y esa es la respuesta exacta: la capa cero pintaba
   `bg-green-50 border-green-600 text-green-900` y su gemelo en rojo — **verdes y rojos de fábrica de
   Tailwind**, la única familia de color del producto que no salía de `tailwind.config.js`. No era
   una impresión: eran literalmente dos sistemas de color en la misma pantalla.

   Y la pregunta que vino detrás es la que ordena media decisión: *«¿cómo escribimos algo que nos
   permita recordar que cuando introducimos un elemento tiene que mantener el estilo del sitio?»*.
   Los tres auditores existentes habían pasado por ese código **en verde**: `audit_contraste.py` mide
   los pares que alguien declaró, `audit_dark_theme.py` exige mapeo oscuro, `audit_movil.py` mide
   tamaños. Ninguno pregunta si el color **pertenece al sistema**.

3. **La explicación se presentaba igual cuando el estudiante acertaba.** `score_answer` devuelve la
   nota de la alternativa **elegida** (026): al fallar, esa nota explica el error; al acertar, es la
   nota de la correcta y no habla de ningún error suyo. Llamarla «Explicación» y ponerle encima un
   triángulo de advertencia le decía a quien acababa de acertar que había algo que corregir. El owner
   recordaba que en algún momento eso se presentaba como **bonus**, y tenía razón en querer volver.

4. **En el editor en vivo no se sabía cuál era la alternativa A, B o C.** Desde ADR-030 las
   alternativas se barajan en pantalla, así que la que se vio tercera puede ser la `B`. El editor
   listaba «Alternativa A / B / C / D» sin el texto de cada una: se corregía a ciegas, con riesgo real
   de escribirle la explicación equivocada al distractor equivocado.

## Decisión

### 1. El estado se dice con un diodo dentro de su alojamiento, nunca pintando la superficie

Es la regla que ADR-023 ya había escrito para el resto del panel y que la capa cero no estaba
siguiendo: *la carcasa de un aparato no cambia de color para decir algo; se enciende un piloto.*

- La superficie de las cuatro alternativas se queda en `panel-100`, **sea cual sea el resultado**.
- El estado lo dicen: el **diodo** (`.led--on` verde · `.led--alarma` rojo · apagado), la **regla
  lateral** (`led-800` / `alarma-700`, objeto gráfico, 3:1) y **las palabras** («¡Correcto!»,
  «Correcta», «Tu respuesta»).
- El titular deja de pintarse: un `text-green-700` sobre la palabra «¡Correcto!» es el color
  repitiendo lo que el texto ya afirma. Decoración, no señal.
- El badge «Tu respuesta» pasa a neutro: es un **hecho**, no un veredicto.

Para eso se agrega a la paleta la familia **`alarma`** —el LED rojo del instrumento— y un `led-800`
que no es un diodo sino el mismo verde llevado a un tono usable como regla sobre superficie clara
(`led-700` daba 2.33 sobre `panel-100` y no delimitaba). Cinco pares nuevos declarados en
`audit_contraste.py`.

`alarma-700` es además, desde acá, el color de «algo está mal» en texto: reemplaza a los `amber-700`
y `red-*` sueltos de los avisos del diagnóstico.

### 2. El riel es una columna del flujo, con `sticky`

Nada `fixed`. El escenario es un `flex` con dos columnas y **la derecha existe siempre**:

- El panel no puede montarse sobre el footer, porque el footer viene después de este bloque **en el
  documento**. Sale gratis, sin escuchar scroll.
- El enunciado no se mueve nunca al aparecer el panel, que era la propiedad que ADR-032 conseguía con
  `padding` compensatorio.
- `sticky top-20` con `max-h` y scroll propio: acompaña la lectura y se despega al llegar al pie. El
  `max-h` no es cosmético — un `sticky` más alto que la ventana deja su parte de abajo fuera de
  alcance, el mismo fallo que T-68 documentó para el modal con otro disfraz.
- Debajo de `lg` el riel se apila bajo la pregunta, y el panel **se trae solo a la vista** al montarse
  (`scrollIntoView`, `block: "nearest"`, respetando `prefers-reduced-motion`). Solo ahí: en `lg` está
  al lado y mover el scroll sería quitarle la página de debajo a alguien que no la pidió.

### 3. La gráfica es el visor del instrumento, y está siempre encendida

`irt-progress-chart` sale del cuerpo del panel y pasa a ser el contenido permanente del riel.

Es lo que hace que la columna derecha no se vea vacía antes de la primera respuesta —y el componente
**ya traía** su estado vacío («Responde para ver cómo evoluciona tu evaluación»), así que no hubo que
inventarle un relleno—. Y arregla algo que nadie había nombrado: la gráfica estaba dentro del modal,
o sea que **parpadeaba doce veces por diagnóstico**. Una medición que aparece y desaparece se lee
peor que una que está siempre en el mismo sitio.

### 4. Bonus cuando se acierta

El rótulo de la nota depende de si acertó: `Explicación` cuando falló, **`Bonus`** cuando acertó, con
una línea que dice qué es («Acertaste. Esto es lo que hay detrás de esa alternativa»). El triángulo
de advertencia se va en los dos casos: en esta pantalla no hay nada peligroso, y la regla naranja del
costado ya marca que esto es lo que hay que leer.

**Límite que se dice en voz alta:** el bonus es la nota de la alternativa correcta, **no** «el error
más común de este ítem». Mostrar eso exigiría que el servidor mandara una explicación además de la
elegida, que es exactamente lo que ADR-015 no hace.

### 5. El editor muestra el texto de cada alternativa

En solo lectura —cambiarlas a mitad de un test invalidaría la respuesta recién dada, ADR-032 §2— pero
con el texto, la marca de cuál es la correcta y cuál eligió el estudiante. Y en la columna de la
pregunta, la **letra original** de cada alternativa, solo para quien edita el banco: al estudiante no
se le muestra, porque sería devolverle el orden que barajar existe para ocultar (ADR-030).

### 6. `scripts/audit_paleta.py`: línea base con trinquete

La respuesta a «cómo nos acordamos» es: no nos acordamos, lo verifica un script.

Falla si aparece color de fábrica en un archivo que no lo tenía, o si un archivo supera su número.
Los 229 usos heredados quedan como **línea base por archivo**, visibles y sin molestar; la deuda
nueva no entra. Cuando un archivo mejora, el script lo dice y pide bajar la línea base, para que el
trinquete no se afloje sin querer. No cuenta `indigo-*` (está remapeado a grafito en el config) ni los
neutros (los cubre `audit_dark_theme.py`) ni las líneas de comentario.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|---|---|
| **Dejar el panel `fixed` y calcularle la altura** escuchando el scroll para que se detenga sobre el footer | Reimplementa a mano lo que `sticky` hace en el compositor, y hay que mantenerlo cada vez que cambie la altura del pie |
| **Desplazar el footer** (empujarlo con margen cuando hay panel) | Mueve una pieza que no tiene nada que ver con el diagnóstico para acomodar a otra. El problema no era el footer |
| **Riel que aparece solo al responder** | La pregunta se movería en cada ítem, y un visor que se despliega no es la cara de un aparato: es un cajón |
| **Grid con columnas arbitrarias** (`grid-cols-[minmax(0,1fr)_26rem]`) | Se genera, pero con el comillado `\2c` de la coma; verificar que existe se vuelve adivinar cómo quedó escrita. Un ancho fijo + `flex-1` se comprueba de un vistazo (ver L-51) |
| **Elegir un verde y un rojo «que combinen»** en vez de tocar la paleta | Es exactamente cómo entró el problema: un color decidido a ojo dentro de un sistema que tiene reglas. Y el siguiente entraría igual |
| **Dejar el verde/rojo pero como texto de la paleta** (sin diodo) | El vocabulario del panel para «estado» ya existe y estaba sin usar acá. Inventar un segundo sería tener dos maneras de decir lo mismo |
| **Auditor de paleta sin línea base**, fallando por los 229 usos heredados | Un auditor que sale en rojo desde el primer día es un auditor que nadie corre |
| **Repintar las 92 ocurrencias del embudo** en esta sesión | Es T-100 y es una pasada de identidad completa (pantalla de resultados, selección, tablero, cupos). Meterla acá habría convertido cuatro correcciones en un rediseño |
| **Devolver el bonus mostrando el error más frecuente** del ítem | El servidor tendría que mandar una explicación que el estudiante no eligió: es la superficie que ADR-015 cerró |

## Consecuencias

**Positivas**

- El panel ya no pisa el footer, y no hay código escuchando scroll para conseguirlo.
- La pantalla del diagnóstico usa **un solo sistema de color**.
- La gráfica deja de parpadear una vez por ítem.
- Quien acierta ya no recibe un triángulo de advertencia.
- Editar la explicación de un distractor deja de ser a ciegas.
- El proyecto tiene, por primera vez, una verificación de **pertenencia al sistema** de color y no
  solo de contraste y de tema oscuro. La deuda vieja queda medida: 92 en el embudo, 87 en admin, 50
  fuera del bundle.

**Negativas / costos aceptados**

- **La columna del enunciado pierde 26rem en `lg`.** Con `max-w-6xl` quedan 712px, más que el
  `max-w-2xl` (672) que la caja ya tenía, así que hoy no aprieta; en una ventana de 1024px quedan
  552px y sí se nota.
- Debajo de `lg` el panel sigue naciendo fuera de la vista y hay que traerlo con `scrollIntoView`.
  Funciona, pero es la única parte de esta decisión que depende de un efecto y no del flujo.
- **El trinquete de `audit_paleta.py` congela la deuda, no la paga.** Si nadie toma T-100, dentro de
  un año habrá los mismos 92 usos en el embudo, ahora con un script que certifica que no crecieron.
- La paleta tiene una familia más. `alarma` es la primera desde ADR-022 y hay que sostener la regla de
  que solo significa «algo está mal» — si empieza a aparecer como decoración, vuelve el problema que
  esta decisión arregla.

## Riesgos

| Riesgo | Mitigación | Ref. |
|---|---|---|
| El diodo verde y el rojo no se distinguen (daltonismo) | El color nunca es el único portador: van con «¡Correcto!»/«Incorrecto», «Correcta» y «Tu respuesta» | — |
| La línea base se «actualiza» hacia arriba para hacer pasar el script | El script solo acepta bajarla; subirla es editar a mano una línea que dice de dónde salió el número | — |
| `alarma` se usa como decoración y deja de significar «algo está mal» | Está dicho en el config, en el ADR y en el mensaje de error del auditor | — |
| La columna del enunciado queda estrecha con LaTeX ancho en ventanas chicas | `lg:min-w-0` + `overflow-x-auto` en las cajas; revisar con los ítems más largos del banco | T-115 |

## Seguimiento

1. **Verificar en vivo con cuenta de admin** todo el flujo (sigue pendiente de ADR-032).
2. Revisar la columna del enunciado con los ítems más largos del banco en una ventana de 1024px.
3. **T-100** deja de ser una tarea difusa: ahora tiene número (92 usos en el embudo) y un script que
   dice cuándo bajó.
4. Si el editor en vivo empieza a usarse de verdad, evaluar mostrar también las alternativas de forma
   editable **con el test cerrado**, que es donde sí se puede.

---

Relacionado: [[ADR-032-capa-cero-al-lado-y-editor-en-vivo]] · [[ADR-022-lenguaje-braun-rams]] ·
[[ADR-023-panel-de-instrumento]] · [[ADR-030-barajar-las-alternativas]] ·
[[ADR-015-item-sin-respuesta-en-el-cliente]] · [[../project-memory/BACKLOG]] T-100
