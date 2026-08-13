# ADR-022: La identidad del producto es el lenguaje de diseño Braun / Dieter Rams

## Estado

Aprobada. **Reemplaza a [[ADR-020-identidad-visual-por-tokens]]** en la elección de paleta y forma;
conserva su mecanismo (tokens en `tailwind.config.js`, escala `indigo` redefinida).

## Fecha

2026-08-13

## Contexto

ADR-020 se aprobó por la mañana del 2026-08-13 con la paleta "tinta y pergamino". El owner la probó
en `localhost` la misma tarde y dio dos señales:

1. El pergamino le gustó, pero lo quería **menos claro** (se ajustó: `#FBF7F0` → `#F4EEE2`).
2. Pidió otro tema, mencionó primero el sistema de color de IBM y después fue más preciso:
   **"que el sitio parezca un diseño de Dieter Rams Braun, eso quiero"**.

Que ADR-020 durara un día no es un fracaso del proceso: es lo que pasa cuando alguien elige una
paleta viéndola en muestras de color y después la ve aplicada. El tokenizado hizo que corregir el
rumbo costara un archivo.

**Lo que obliga a un ADR nuevo en vez de un ajuste de valores:** Rams no es una paleta, es un
criterio, y contradice partes de ADR-020 en su propio terreno.

| ADR-020 decía | Rams exige |
|---|---|
| Serif del sistema para títulos, "aire de tratado" | Grotesca neutra (Akzidenz, Helvetica). Braun nunca usó serif |
| Ámbar como acento cálido, decorativo | Un solo color, y **solo donde hay función**. Si adorna, deja de significar |
| Fondo con degradado diagonal | Superficie plana. El degradado es decoración |
| Sombras teñidas, radios de 2–12px | Separación por línea; radio casi nulo |

Y había algo más grande que ninguna paleta arreglaba: **el tablero usaba emojis como iconografía**
(📝 ✅ 📈 🚀 📊). Es lo más lejano al referente que tenía el producto, y no se veía como problema de
color.

## Decisión

**1. El sistema tiene una escala neutra y un color.** `grafito` (neutro cálido, 50–950) para
superficies, texto, bordes y botones secundarios; `senal` (naranja Braun `#E85D0D`) para la acción
principal y las medallas de la línea del tiempo. Nada más.

**2. El color es señal, no decoración.** Hay **una sola** acción en naranja por pantalla. Los tres
botones de tres colores del tablero (índigo, blanco, verde) pasan a uno naranja y dos neutros: si
todo destaca, nada destaca.

**3. `indigo` se redefine como `grafito`.** Todo el vocabulario heredado (cientos de
`bg-indigo-600`, `text-indigo-700`) se vuelve neutro de un golpe. El naranja se pone **a mano y de a
uno**. Se conserva así el mecanismo de ADR-020, que era lo bueno de esa decisión.

**4. Texto oscuro sobre el naranja, nunca blanco.** El naranja Braun auténtico con blanco da **3.50**
y reprueba AA; con `grafito-900` da **4.83**. Es además lo que hacía Braun. La respuesta accesible y
la históricamente correcta resultaron la misma.

**5. Una sola familia tipográfica**, grotesca del sistema. La jerarquía se hace con tamaño y peso,
no cambiando de letra.

**6. Se va la decoración:** degradados (fondo, logotipo, CTA, halo difuminado de la landing, panel
de cierre), sombras difusas → línea de 1px, radios → 2px, y **todos los emojis** de la interfaz.
El nivel de θ deja de ser cuatro emojis de colores y pasa a ser lo que realmente es: **una escala
ordenada de cuatro pasos**.

**7. La identidad no es configurable.** El admin no elige paleta: elige qué **apariencia** ve un
visitante nuevo (`claro` / `oscuro` / `sistema`), en `site_settings` (migración `043`). Un producto
tiene una identidad; un selector de skins es lo contrario de "menos, pero mejor".

**8. La preferencia del visitante gana sobre el ajuste del admin.** Precedencia: elección explícita
en `localStorage` → default del sitio → `prefers-color-scheme`.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Sistema de color de IBM (Carbon), que el owner mencionó primero | Es un sistema para un catálogo enorme de productos: escala de grises extensa y familia de colores funcionales. Excelente y **más de lo que este producto necesita**; Rams lleva a la misma disciplina con menos piezas, y fue lo que el owner pidió al precisar |
| Braun y pergamino como temas conmutables | Lo eligió el owner: una identidad, no un selector de skins. También evita el refactor a variables CSS, que solo se justifica con dos paletas vivas |
| Solo color y tipografía, sin tocar forma | La forma es la mitad del lenguaje. Con degradados, sombras y emojis intactos, el resultado se lee como "otra paleta", no como Rams |
| Mantener los emojis por cercanía | Son la marca visual del template genérico que el owner quería dejar atrás. Y comunican mal: cuatro emojis distintos sugieren cuatro categorías inconexas donde hay una escala |
| Guardar la apariencia solo en `localStorage` | Entonces no es configuración del sitio: cambia el navegador del admin y nada más |

## Consecuencias

**Positivas**

- El sitio deja de parecerse a un template de Tailwind, que era el problema original.
- El naranja significa algo: donde aparece, hay una acción.
- Contraste verificado: **16/16 pares** cumplen su umbral WCAG, 7 llegan a AAA.
- La primera impresión pasa a ser una decisión del profesor y no del navegador del visitante.
- Menos superficie: sin degradados ni sombras hay menos que mantener y menos que romper.

**Negativas / costos aceptados**

- **ADR-020 duró un día.** Queda como registro de por qué se probó esa dirección; el trabajo de
  tokenizado se conserva entero.
- El token `indigo` ahora es gris: la deuda de nombre que ADR-020 asumió **empeora** (antes era azul
  tinta, al menos un color). Sigue siendo más barata que tocar 15 componentes.
- Un sitio así de sobrio puede leerse como "frío" para un público adolescente. Es una apuesta de
  producto: el owner prefiere que parezca serio a que parezca simpático.
- Las capturas y materiales de difusión hechos con la imagen anterior quedan desactualizados.
- El `senal-500` no alcanza 4.5 con blanco: cualquiera que escriba `bg-senal-500 text-white` en el
  futuro introduce un fallo de contraste. Está documentado en el audit como combinación prohibida.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Cambio visual mucho más grande que el de ADR-020, y tampoco verificado en vivo | T-67 sigue abierta y ahora cubre más superficie; la rama no está en `main` | [[../project-memory/RISKS]] R-25 |
| Alguien escribe `text-white` sobre el naranja | Combinación prohibida explícita en `scripts/audit_contraste.py`, con el número y la razón | Este ADR §4 |
| El admin pone "oscuro" y a un visitante le resulta ilegible | La preferencia local gana; el botón de la barra sigue disponible en todo momento | §8 |
| Un componente futuro vuelve a usar color decorativo | El criterio queda escrito acá y en la cabecera de `tailwind.config.js`, que es lo primero que se lee al tocar color | — |

## Seguimiento

- **Verificación visual pendiente** (T-67). Es la deuda más grande de esta decisión.
- Revisar la landing con ojos frescos: es la superficie que más cambió (7 degradados eliminados) y la
  que más pesa para la captación.
- Si el público objetivo reacciona mal a la sobriedad, el punto de ajuste es el uso del naranja
  —dónde y cuánto—, no volver a los degradados.
- Si algún día hay una segunda paleta real, ahí sí conviene el refactor a variables CSS; hoy sería
  maquinaria sin uso.

---

Relacionado: [[ADR-020-identidad-visual-por-tokens]] (reemplazada) ·
[[ADR-012-tema-oscuro-mapeo-css-global]] · [[ADR-021-linea-del-tiempo-historica]] ·
[[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[../project-memory/BACKLOG]] T-41, T-67
