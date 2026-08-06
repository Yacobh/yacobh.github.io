# ADR-012: Tema oscuro mediante mapeo global de CSS, no `dark:` por elemento

## Estado

Aprobada

## Fecha

2026-08-05

## Contexto

El owner pidió un botón para cambiar la app a un tema oscuro, sin especificar si en la barra de
navegación o en el footer, ni el alcance (una pantalla o toda la app). Preguntado explícitamente,
el owner eligió **toda la app**.

El problema: la app tiene ~15 componentes alcanzables desde `core.cljs`
(`home`, `landing`, `login`, `diagnostic-test`, `dashboard`, `plan`, `slots`, `cuenta`, `admin`,
`admin-questions`, `guestbook`, `resume`, `privacidad`, `contacto`, `ui`, `feedback-modal`,
`irt-chart`, `math-render`), con colores Tailwind escritos como literales directos en cada elemento
(`bg-white`, `text-gray-700`, `border-gray-200`, …), sin ningún sistema de theming previo. El
enfoque estándar de Tailwind para dark mode (`darkMode: 'class'` + anotar `dark:clase` en cada
elemento que necesita cambiar) habría exigido editar cientos de apariciones repartidas en esos ~15
archivos — incluido `admin.cljs`, el componente más grande del sistema (1172 líneas, [[RISKS]] R-07).

Se relevó con `grep` el vocabulario de color real usado en los componentes alcanzables: es muy
consistente — grises neutros (`gray-*`/`slate-*`/`white`) para superficies y texto, índigo/púrpura
como acento de marca, y rojo/verde/ámbar/azul para alertas y badges, siempre en el mismo patrón
(fondo claro + texto saturado + borde claro para estados semánticos). Esa consistencia es lo que
hace viable la alternativa descrita abajo.

## Decisión

1. **Botón de tema en la barra de navegación** (`universo.home/navigation`), no en el footer:
   la nav es fija (`position: fixed`) y siempre visible; el footer solo se ve al llegar al final de
   la página. El botón (ícono sol/luna) queda fuera del menú colapsable móvil, visible en todos los
   anchos de pantalla.

2. **Estado del tema en `universo.events.theme`** (nuevo namespace, agregado al `:require` de
   `core.cljs`): `:theme/init` (lee `localStorage` o `prefers-color-scheme` la primera vez),
   `:theme/toggle`, persistido en `localStorage`. Un script inline en `index.html` y
   `public/index.html` aplica la clase `dark` a `<html>` **antes** de cargar `app.js`, para que no
   haya flash de tema claro al recargar con oscuro guardado.

3. **En vez de anotar `dark:clase` en cada elemento de cada componente, se remapea en
   `src/css/app.css` el vocabulario de color ya existente**, con selectores
   `.dark .clase-existente { … }` (ej. `.dark .bg-white { background-color: theme('colors.slate.800'); }`).
   La especificidad de `.dark .clase` (0,2,0) gana sobre la `.clase` (0,1,0) que genera Tailwind, sin
   `!important` ni orden especial en la hoja de estilos. Esto cubre automáticamente los ~15
   componentes sin tocarlos, incluyendo `admin.cljs`.
   - **Excepciones que sí llevan `dark:` directo en el propio componente** (no caben en un mapeo por
     nombre de clase porque son casos únicos o gradientes con `--tw-gradient-*`):
     el fondo de página y la barra de nav en `home.cljs`, y el banner de pregunta en
     `feedback-modal.cljs`.
   - Los fondos/botones sólidos y saturados (`bg-indigo-600`, `bg-green-600`, gradientes de marca,
     el footer, el hero de `components/resume.cljs`) se dejan **sin cambio**: ya contrastan bien
     sobre fondo oscuro — el footer, de hecho, ya era permanentemente oscuro antes de esta feature.
   - Se agregó una regla aparte para `<input>`/`<textarea>`/`<select>` de texto: no tenían clase de
     fondo propia (dependían del blanco por defecto del navegador), así que el mapeo por nombre de
     clase no los alcanzaba.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| `dark:clase` de Tailwind en cada elemento de los ~15 componentes | Cientos de ediciones repartidas en archivos grandes (`admin.cljs` en particular); alto riesgo de romper sintaxis de hiccup y de dejar elementos sin cubrir por omisión humana |
| Delegar la edición de cada componente a subagentes en paralelo | Alto riesgo de inconsistencia de paleta entre archivos (cada subagente elegiría tonos ligeramente distintos); no hay forma barata de revisar cientos de ediciones dispersas con la misma atención que un archivo central |
| Solo cubrir landing + nav + footer (alcance parcial) | Era una opción ofrecida al owner; la descartó explícitamente al pedir "toda la app" |
| CSS Custom Properties (variables de color redefinidas bajo `.dark`) en vez de mapear clases Tailwind por nombre | Habría requerido reemplazar cada clase Tailwind por una clase propia que consuma la variable, mismo costo de edición por archivo que la alternativa 1; el mapeo por nombre de clase reutiliza las clases que ya existen en el HTML generado |

## Consecuencias

**Positivas**
- Cobertura completa de los ~15 componentes alcanzables sin editar la mayoría de ellos.
- Un solo archivo (`src/css/app.css`) concentra toda la paleta oscura: agregar o ajustar un tono es
  un cambio en un lugar, no una búsqueda por el repo.
- Verificado visualmente en el navegador (landing completa, nav, login, libro de visitas con datos
  reales de Supabase, currículum del profesor, aviso de privacidad) en ambos temas, con persistencia
  tras recargar.

**Negativas / costos aceptados**
- **Rompe la convención habitual de Tailwind** (`dark:` por elemento): un agente o desarrollador
  futuro que busque `dark:` en un componente y no lo encuentre podría asumir, equivocadamente, que
  ese componente no tiene soporte de tema oscuro. Este ADR es la referencia para no llegar a esa
  conclusión.
- **Acopla el tema oscuro al nombre literal de la clase Tailwind usada en cada componente.** Si un
  componente nuevo usa un color que no está en la tabla de `app.css` (ej. `bg-teal-50`), ese
  elemento **no** tendrá variante oscura hasta que alguien lo note y agregue la regla — no hay
  ningún mecanismo que avise de la omisión (no hay lint para esto).
- Paneles no probados en vivo por el agente en esta sesión (requieren sesión de estudiante o admin
  real): `dashboard`, `plan`, `cupos`, `admin`, `cuenta`, `diagnóstico`. Se revisó el código y se
  confirmó que usan el mismo vocabulario de color que sí se verificó en pantallas públicas, pero no
  hay captura de pantalla real de esas secciones en oscuro.
- La paleta oscura exacta (qué tono de `slate`/`indigo` para cada nivel) fue elegida por el agente
  sin aprobación explícita del owner sobre los valores concretos — ver [[../project-memory/ASSUMPTIONS]]
  A-30.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Un componente nuevo usa una clase de color no mapeada y queda sin tema oscuro, sin aviso | Al crear UI nueva, revisar `src/css/app.css` y reutilizar una clase ya mapeada, o agregar la regla correspondiente en el mismo commit | Este ADR, sección "Consecuencias" |
| Paneles protegidos (`admin`, `dashboard`, `plan`, `cupos`, `cuenta`) no verificados en vivo en esta sesión | El owner los revisa con su propia sesión antes de considerar la feature 100% cerrada | [[../project-memory/BACKLOG]] T-38 |
| Cambios futuros a Tailwind (versión, purga de clases) podrían dejar de generar alguna de las clases base que `app.css` está sobrescribiendo | `.dark .clase` no depende de que Tailwind genere `.clase` con un valor específico, solo de que el elemento tenga esa clase en el HTML — bajo riesgo, pero revisar si se sube de major version de Tailwind | — |

## Seguimiento

- Si en una sesión futura se nota que un componente quedó sin cobertura oscura, agregar la regla en
  `src/css/app.css` (no anotar `dark:` suelto ahí — mantener el mapeo centralizado) y anotar el caso
  en este ADR o en [[../project-memory/LESSONS_LEARNED]].
- Reconsiderar este enfoque si la cantidad de excepciones "`dark:` directo en el componente" empieza
  a crecer mucho — sería señal de que el mapeo global ya no es la abstracción correcta.
- Pendiente: verificación visual del owner en `admin`, `dashboard`, `plan`, `cupos`, `cuenta`,
  `diagnóstico` (ver [[../project-memory/BACKLOG]] T-38).

---

Relacionado: [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[../project-memory/BACKLOG]] T-38 · [[../project-memory/LESSONS_LEARNED]] L-35
