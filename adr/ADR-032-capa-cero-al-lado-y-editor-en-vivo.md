# ADR-032: La capa cero se muestra al lado, no encima, y el admin puede editar el ítem sin salir del test

## Estado

Aprobada. **La §1 (la cáscara `fixed` del panel) quedó reemplazada por
[[ADR-033-el-estado-se-dice-con-un-diodo]]** el 2026-08-24: anclado a la ventana, el panel se
montaba sobre el footer. El resto —el panel al costado, la pregunta que no se desmonta, el editor
en vivo y el «volver a servir»— sigue vigente tal cual.

## Fecha

2026-08-23

## Contexto

La **capa cero** —el veredicto, la explicación del distractor elegido y la curva de θ— se mostraba
en un modal: `fixed inset-0` con `bg-black/60 backdrop-blur-sm`
(`components/feedback-modal/modal-overlay`).

Al mirarlo de cerca aparecieron dos hechos, uno de forma y otro de fondo:

1. **El modal oscurecía una pantalla vacía.** `diagnostic-test` cambiaba de `:questions` a
   `:feedback` y en ese `case` la pregunta **se desmontaba**. Detrás del backdrop no había nada que
   atenuar. Por eso el propio modal tenía que volver a dibujar el enunciado adentro
   (`question-section`) y repetir las alternativas (`options-section`) para poder marcar cuál se
   eligió: repetía exactamente aquello que acababa de tapar. El costo era alto y de gratis —dos
   fuentes del mismo enunciado que se pueden desincronizar, un panel largo con scroll propio, y una
   pantalla que se apaga cada vez que alguien responde.

2. **El banco solo se podía corregir en frío.** `questions` es el activo defendible del proyecto
   (G-2 en [[../project-memory/TESIS_DE_CRECIMIENTO]]) y sus 306 ítems son de autoría propia. La
   forma real en que el autor detecta una explicación mala o una dificultad mal puesta es
   **rindiendo el diagnóstico**: es la única vista donde el ítem aparece en su contexto, con su
   dificultad servida y su explicación en el lugar donde se lee. Y justo ahí no había nada que
   tocar: había que anotar el problema, salir de la sección, buscar el ítem entre 306 en el panel de
   admin y volver a empezar el test para ver el efecto. Ese viaje se paga una vez por corrección, y
   es la razón por la que las correcciones no se hacen.

El único rol que existe hoy es `admin` (`profiles.role`, `public.is_admin()`), y desde la migración
`025` es también el único que puede leer `questions` directamente: el estudiante recibe el ítem por
`next_question`, sin respuesta ni explicaciones (ADR-015).

## Decisión

### 1. La capa cero es un panel al lado, no un modal encima

- `:questions` y `:feedback` renderizan **el mismo escenario** (`diagnostic-test/test-stage`). La
  pregunta ya no se desmonta: se **congela** —alternativas ya juzgadas, sin controles accionables— y
  el panel entra al costado.
- **Sin backdrop.** Nada se oscurece, porque no hay nada que atenuar: lo de atrás es la pregunta que
  se está explicando y tiene que leerse.
- El panel es `fixed`: columna a la derecha en `lg` (30rem, bajo la barra de `h-16`), hoja inferior
  debajo de `lg`. El escenario solo reserva su ancho con `padding`, que transiciona sin saltos —un
  cambio de columnas del grid no se puede animar de forma fiable.
- La entrada se anima con `translate` y respeta `motion-reduce`.
- **El panel ya no repite ni el enunciado ni las alternativas.** El enunciado está a la izquierda; el
  acierto y el error los marca la propia pregunta, con `option-classes` / `option-indicator` /
  `selected-badge`, que se quedan en `feedback-modal` y ahora usa `diagnostic-test`. El panel es
  veredicto + explicación + curva + Continuar.

### 2. El admin edita el ítem que está a la vista

Con el panel abierto, quien puede editar el banco ve dos pestañas: **Respuesta** y **Editar ítem**.
No hay estado de pestaña propio: la pestaña **es** si el editor está abierto.

Lo editable es un subconjunto deliberado (`editor/campos-en-vivo`):

| Editable en vivo | Por qué |
|---|---|
| Las 4 explicaciones de error + su idea errónea del catálogo | Es la capa cero: lo que se acaba de ver y lo único que se puede juzgar con el caso delante |
| Enunciado | Los errores de redacción se detectan leyéndolo como estudiante, no en una lista |
| `difficulty` | Es el parámetro `b` del 1PL: decide qué ítem sirve `next_question` en la vuelta siguiente |
| `module_id` | Decide qué material recibe el «no sé» (ADR-029) y qué entra a «Mi plan» |

| **No** editable en vivo | Por qué |
|---|---|
| Las 4 alternativas y `correct_option` | Cambiarlas a mitad del test invalidaría la respuesta que el estudiante acaba de dar contra un ítem que ya no existe |
| `topic`, `order_index`, borrar el ítem | Son operaciones de catálogo, no de contenido; el panel de admin sigue siendo su lugar |

Reglas de guardado:

- **Patch parcial, nunca la fila entera.** `editor/campos-editados` manda solo lo que cambió, ya
  coercionado. Abrir el editor, mirar y cerrar **no escribe nada**.
- **En blanco es nulo.** El formulario convierte los `nil` en `""` para que React no suelte el
  `<textarea>`; al guardar vuelven a ser `nil`. Un `error_c` vacío y un `error_c` nulo no son lo
  mismo para quien lea la tabla después.
- La explicación que el estudiante tiene delante se refresca en el acto. **La respuesta ya
  registrada en `:responses` no se toca:** es el hecho de lo que se mostró en su momento.

### 3. «Guardar y volver a servir»: el test como programa que se depura

`universo.reintento/deshacer-ultima` quita la última respuesta y devuelve el test al instante
anterior: `:responses` y `:theta-history` se podan **juntos**, θ vuelve al valor previo —o a
`:theta-initial`, el θ de arranque del banco, si lo que se deshace es la primera respuesta—, la
parada se recalcula y el mismo ítem, ya parcheado con lo que se acaba de guardar, vuelve a la
pantalla.

La pregunta **no** sale de `:questions`: sacarla la devolvería al pozo de candidatas de
`next_question`, que podría entregar otra distinta.

Es seguro porque **nada se persiste por ítem**: la fila de `tests` se escribe entera en
`:test/complete`. Si algún día se guarda respuesta por respuesta, esto deja de ser estado local y
necesita su propia migración.

### 4. Sin rol nuevo

El gate es `:auth/admin?` en la UI y `questions_select_admin` (025) en la base. El rol `editor` /
`profesor` **no se crea acá**: partirlo obliga a revisar todas las policies del esquema y hoy no hay
una segunda persona a la que dárselo (bus factor = 1). Cuando la haya, el camino barato es
`public.can_edit_bank()` en las policies de `questions`, `misconceptions` y `resources`, dejando el
resto en `is_admin()` — ver [[../project-memory/BACKLOG]] T-79 y T-113.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|---|---|
| **Acordeón bajo la alternativa elegida** (una sola columna) | Es el cambio más pequeño y el más natural en móvil, pero no deja espacio para el editor: la edición seguiría siendo un panel aparte y el viaje de ida y vuelta no se cerraría |
| **Quitar solo el backdrop**, dejando el modal | Cura la sensación de invasión con dos palabras, pero deja intactos los dos problemas de fondo: el enunciado repetido y el ítem inaccesible |
| **Tres columnas** (pregunta · capa cero · editor) | A 1024px no entran tres columnas legibles, y el editor no necesita estar visible siempre: se abre cuando algo está mal |
| **Editar el ítem completo en vivo** (los 15 campos del panel) | Máxima potencia, pero incluye `correct_option` y las alternativas, que no se pueden cambiar a mitad de una medición; y el formulario deja de caber al lado sin scroll propio |
| **Guardar la fila entera** (`update-admin-question!`) | Ya existe, pero reescribe con lo que el formulario cree saber, y este conoce once columnas de veinte. Guardar una explicación descatalogaría distractores en silencio |
| **Rehacer el ítem pidiéndolo de nuevo al servidor** en vez de deshacer en el cliente | `next_question` elige por cercanía a θ: pedirlo de nuevo puede devolver **otro** ítem, que es justo lo que el botón no quiere |
| **Rol `editor` en esta sesión** | Toca todas las policies del esquema para habilitar a nadie: hoy no existe una segunda persona. Se decide cuando exista (T-79) |
| **Editar desde el panel de admin con el test abierto en otra pestaña** | Dos sesiones de la misma cuenta escribiendo el mismo ítem, y sin forma de volver a servirlo: es el viaje actual con más pasos |

## Consecuencias

**Positivas**

- La pantalla deja de apagarse cada vez que el estudiante responde, y el enunciado se puede releer
  mientras se lee la explicación — que es lo que uno hace cuando falla.
- El panel es **más corto**: se fue el enunciado y se fueron las alternativas repetidas.
- Una sola fuente del enunciado en pantalla en vez de dos.
- El ciclo «veo el error → lo corrijo → lo vuelvo a ver» pasa de minutos a segundos, sobre el activo
  que G-2 quiere calibrar y G-1 vender.
- `difficulty` se puede ajustar **con el flujo delante**, que es el único contexto donde se nota si
  un ítem está mal calibrado. No sustituye la calibración empírica (T-29): la prepara.
- Los campos del formulario quedaron en un solo lugar (`components/campos`), usados por el panel y
  por el editor en vivo.

**Negativas / costos aceptados**

- **En `lg` hay 30rem menos de ancho** para la pregunta mientras el panel está abierto. Con
  enunciados largos y LaTeX ancho, la columna izquierda scrollea horizontalmente dentro de su caja.
- En pantallas angostas la hoja inferior tapa buena parte de la pregunta: es el modal sin oscurecer.
  Es el mejor equivalente móvil de «al lado», no es lo mismo.
- **Las corridas de admin ensucian la calibración.** Depurar un ítem genera corridas de test que
  entran a `tests` sin nada que las distinga de las de un estudiante. Es un riesgo nuevo y anotado:
  [[../project-memory/RISKS]] R-37, tarea T-110.
- Editar un ítem mientras hay estudiantes rindiendo cambia el banco bajo sus pies. Con el volumen
  actual es teórico; con un colegio conectado (G-1) no lo será.
- `feedback-modal` conserva su nombre aunque ya no dibuje ningún modal: renombrarlo tocaría todos sus
  usos sin cambiar una línea de comportamiento.

## Riesgos

| Riesgo | Mitigación | Ref. |
|---|---|---|
| Las corridas de depuración del admin entran a la calibración del banco | Marcar el origen de la corrida (`tests.origin`) o excluir por `user_id` **antes** de calibrar | R-37, T-110 |
| Deshacer deja θ y el historial desalineados y la estimación miente sin avisar | La operación es una función pura (`universo.reintento`) con tests sobre esa invariante | ADR-009 |
| Editar el ítem que otro está respondiendo | Volumen actual ≈ 0; se vuelve real con G-1 | R-37 |
| El editor queda abierto apuntando a un ítem que ya no está en pantalla | `:test/show-feedback` y `:test/reintentar-ultimo` lo cierran; `:test/start` lo limpia | — |
| Se edita `correct_option` por otra vía y se invalida la respuesta en curso | No es editable en vivo, a propósito | — |

## Seguimiento

1. **T-110 antes de calibrar**: distinguir las corridas de admin en `tests`. Si G-2 arranca sin
   esto, el activo se calibra con datos que incluyen al autor depurando.
2. Medir si las correcciones al banco efectivamente suben. Si en un mes de uso el editor no produjo
   ediciones, el problema no era el viaje y hay que averiguar cuál era.
3. Cuando exista una segunda persona editando, decidir el rol (T-79 / T-113) — no antes.
4. Revisar el ancho de la columna izquierda con los enunciados más largos del banco.

---

Relacionado: [[ADR-015-item-sin-respuesta-en-el-cliente]] · [[ADR-023-panel-de-instrumento]] ·
[[ADR-029-escape-como-tercera-categoria-de-respuesta]] · [[ADR-004-irt-1pl-map-y-regla-de-parada]] ·
[[../project-memory/TESIS_DE_CRECIMIENTO]] G-2 · [[../project-memory/RISKS]] R-37 ·
[[../project-memory/BACKLOG]] T-110, T-113
