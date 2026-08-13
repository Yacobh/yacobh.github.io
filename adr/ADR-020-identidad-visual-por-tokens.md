# ADR-020: La identidad visual se define con tokens de Tailwind, redefiniendo el vocabulario existente

## Estado

**Reemplazada por [[ADR-022-lenguaje-braun-rams]]** (2026-08-13, el mismo día).

> El owner probó "tinta y pergamino" en local y pidió otra dirección: el lenguaje Braun / Dieter
> Rams. **El mecanismo de este ADR sobrevive entero** —tokens en `tailwind.config.js`, escala
> `indigo` redefinida para no tocar los componentes, audits versionados—; lo que cambió son los
> valores y el criterio de forma. Que haya durado un día es justamente lo que el enfoque por tokens
> hacía barato. No se borra: registra por qué se probó esa dirección y qué se aprendió.

## Fecha

2026-08-13

## Contexto

El owner planteó dos problemas el 2026-08-13, en la misma conversación:

1. **El tema oscuro deja letras negras ilegibles** en partes del panel.
2. **La página se ve genérica**, igual que otras que ve promocionadas en Facebook, "en su paleta de
   colores". Ya lo había dicho el 2026-08-12 ([[../sessions/SESSION-021]]), donde además sospechaba
   que "la IA no comprende las ideas propias y le da el mismo código a todos".

Ambos venían anunciados. [[../project-memory/BACKLOG]] **T-41** ("Revisar la paleta del tema
oscuro") estaba abierta desde el 2026-08-08 como `idea (sin especificar)`: el owner había dicho
"mejorar la paleta oscura de alguna forma" y, por la regla de no inventar lo que falta, quedó sin
detalle durante cinco días. [[ADR-012-tema-oscuro-mapeo-css-global]] había listado como riesgo
explícito que un componente quedara sin cobertura oscura **sin aviso**.

**Lo que la investigación encontró, que corrige la hipótesis inicial.** Se auditaron las 164 clases
de color usadas en los componentes contra las 91 mapeadas en `src/css/app.css`: la cobertura por
clase estaba bien. El agujero era otro y más de fondo:

- **El tema oscuro nunca definió un color de texto base.** Cualquier elemento sin clase `text-*`
  explícita heredaba el negro por defecto del navegador. Por eso fallaba en "algunas partes" y no en
  toda la app — el patrón que lo hacía imposible de encontrar revisando componentes.
- **Las `<option>` no heredan el color del `<select>`.** El mapeo cubría `select` pero no sus
  opciones, así que cada desplegable del panel abría una lista ilegible.
- **`tailwind.config.js` tenía `theme: { extend: {} }`: cero tokens propios.** El índigo, los
  grises, los radios y la tipografía eran los valores de fábrica de Tailwind.

Ese tercer punto es la respuesta técnica a "se parece a otras páginas", y contradice la explicación
que el owner sospechaba: no es que la IA reparta el mismo código, es que **nunca se definió una
identidad y quedó el default**. Cualquier proyecto que instale Tailwind y no configure nada llega
exactamente al mismo lugar.

El owner eligió la dirección de paleta entre cuatro opciones: **"tinta y pergamino"** — azul tinta
`#1B2A4A` como color principal, ámbar `#C9873A` como acento, superficie cálida `#FBF7F0`, y
`#0E1524` para el fondo oscuro. La eligió por lo que evoca: manuscrito y tratado matemático,
coherente con el contenido histórico del producto y con la línea del tiempo de
[[ADR-021-linea-del-tiempo-historica]].

## Decisión

**1. La identidad visual se define como tokens en `tailwind.config.js`, no reescribiendo
componentes.**

**2. La escala `colors.indigo` se redefine con los valores del azul tinta.** Los cientos de
`bg-indigo-600`, `text-indigo-700` y `border-indigo-200` ya escritos en los ~15 componentes pasan a
ser el color de marca **sin editar un solo `.cljs`**. Es el argumento de ADR-012 —remapear el
vocabulario que ya existe en vez de anotar clase por clase— aplicado al tema claro.

**3. Se agregan tokens con nombre honesto para el código nuevo:** `tinta` (alias de la misma
escala), `acento` (el ámbar), `pergamino` (superficies claras). El código nuevo usa estos; el viejo
sigue funcionando con `indigo`.

**4. La tipografía de títulos (`font-display`) es un stack serif del sistema, sin fuente web.**

**5. En modo oscuro las superficies son tinta, no el slate neutro anterior**, y el acento de marca
sube a los tonos claros de la escala (200/300): sobre fondo tinta, un acento tinta oscuro sería el
color contra sí mismo.

**6. El contraste se verifica con un número, no con una opinión.** `scripts/audit_contraste.py`
comprueba los 15 pares de la paleta contra sus umbrales WCAG y falla si alguno baja.

**7. El riesgo que ADR-012 dejó anotado se convierte en chequeo.**
`scripts/audit_dark_theme.py` reporta clases de texto sin mapear, y solo las de tono ≥ 600: exigir
mapeo de los tonos claros —que viven sobre fondos saturados que a propósito no cambian— sería ruido,
y un chequeo ruidoso se termina ignorando.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Solo arreglar el tema oscuro | Resolvía la legibilidad y dejaba intacto lo genérico, que era la mitad del pedido del owner |
| Rediseño completo, componente por componente | El mayor riesgo de regresión sobre un MVP en producción que ya recibe tráfico, justo en la ventana de captación de la PAES (R-19). La identidad por tokens consigue casi todo el efecto sin tocar el markup |
| Agregar tokens nuevos y migrar los componentes de `indigo-*` a `tinta-*` | Es lo "limpio": ~15 archivos, cientos de reemplazos, incluido `admin.cljs` (1239 líneas). Exactamente el costo que ADR-012 ya había decidido no pagar, y por las mismas razones |
| Fuente web (Google Fonts) para los títulos | Un origen externo nuevo (hoy solo se depende de jsDelivr para el CSS de KaTeX), un pedido bloqueante en cada carga y una decisión que registrar en [[../project-memory/DEPENDENCIES]]. El serif del sistema da el carácter buscado, gratis y sin latencia |
| Anotar `dark:` por elemento para los casos rotos | Contradice ADR-012 y dispersa el theming en 15 archivos otra vez |

## Consecuencias

**Positivas**

- El cambio de identidad cuesta un archivo de configuración. Verificado en el CSS compilado:
  `bg-indigo-600` pasó a `rgb(58 79 122)`.
- Las letras negras desaparecen por la raíz: una regla de color base cubre todo elemento sin clase
  explícita, presente y futuro.
- El contraste queda medido: los 15 pares cumplen su umbral, 12 llegan a AAA.
- **T-41 se puede cerrar.** Llevaba cinco días sin poder avanzar porque "se ve mejor" no es
  verificable; ahora tiene criterio numérico.
- Los audits son repetibles y viajan con el repo, como `supabase/queries/verificacion_esquema.sql`.

**Negativas / costos aceptados**

- **Un token llamado `indigo` que ya no es índigo.** Es deuda de nombre, asumida a conciencia y
  documentada en el propio `tailwind.config.js`. Quien lea `bg-indigo-600` en un componente y espere
  índigo se va a confundir hasta que abra la config.
- Dos vocabularios conviviendo (`indigo-*` heredado, `tinta-*` nuevo) hasta que alguien decida
  migrar. Puede no pasar nunca, y está bien.
- La paleta la eligió el owner sobre muestras de color en texto, **sin verla aplicada**. Puede querer
  ajustarla al verla; los tokens hacen que eso sea barato.
- El audit de tema oscuro no puede detectar el fallo por herencia (un elemento sin ninguna clase de
  color). Ese caso lo cubre la regla `.dark body`, y si alguien la borra el script sigue en verde.
  Por eso la regla lleva un comentario extenso explicando qué protege.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Regresión visual en pantallas no revisadas de un MVP en producción con tráfico | Los cambios son de token y de mapeo global, no de markup; la verificación visual del owner en las cinco secciones protegidas sigue pendiente | [[../project-memory/BACKLOG]] T-38 |
| Alguien borra `.dark body` y el audit no lo detecta | Comentario extenso en `app.css` explicando qué protege; el límite está documentado en el docstring del script | Este ADR |
| Un cambio futuro de paleta baja el contraste sin que nadie lo note | `scripts/audit_contraste.py`, con los pares como contrato explícito | — |
| Subir de major version de Tailwind cambia la forma de los tokens | Los tokens son un objeto plano en la config, la forma más estable de la API | ADR-012 |

## Seguimiento

- El owner tiene que **ver la paleta aplicada** y decir si la ajusta. Los valores están en un solo
  lugar (`tailwind.config.js`) y el espejo del audit de contraste; si cambia uno, cambia el otro.
- Si el vocabulario `tinta-*` termina cubriendo todo el código nuevo y el `indigo-*` heredado queda
  reducido a unos pocos lugares, conviene migrar y borrar el alias.
- Reconsiderar si aparece la necesidad de un segundo tema (alto contraste, impresión): el enfoque de
  tokens lo soporta, el de clases mapeadas no tanto.

---

Relacionado: [[ADR-012-tema-oscuro-mapeo-css-global]] · [[ADR-021-linea-del-tiempo-historica]] ·
[[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[../project-memory/BACKLOG]] T-41, T-38
