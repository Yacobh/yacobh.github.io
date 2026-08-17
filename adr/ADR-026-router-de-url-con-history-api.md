# ADR-026: Router de URL con History API y fallback `404.html`

## Estado

Aprobada

## Fecha

2026-08-16

## Contexto

Academia Integral es una SPA de ClojureScript/re-frame servida por GitHub Pages desde la raíz del
repositorio. Hasta hoy la navegación entre pantallas era **solo estado en `app-db`**: la clave
`[:ui :current-section]` decidía qué componente montaba `universo.home/main-content`, y la barra de
direcciones mostraba siempre `https://jacobocordova.com/`, sin importar en qué pantalla estuviera el
usuario.

Eso tenía tres consecuencias, anotadas como [[../project-memory/ARCHITECTURE]] **A-07** y como
[[../project-memory/BACKLOG]] **T-05**:

1. **No hay deep links.** No se puede mandar a nadie a una pantalla concreta. Para un producto que a
   partir de [[ADR-025-motor-de-valor-b2b-y-cinco-vectores]] se le presenta a un colegio, "entra
   acá" tiene que ser un enlace, no una instrucción de tres pasos.
2. **Recargar tira al inicio.** Cualquier F5 —o una reconexión de red, o volver a abrir la pestaña—
   devolvía al usuario a la landing, perdiendo la pantalla en la que estaba.
3. **No se puede medir por página.** T-20 (instrumentación del funnel, vector G-5) necesita
   distinguir "vio la landing" de "llegó al diagnóstico"; sin URLs distintas eso no existe para
   ninguna herramienta de analítica estándar.

La restricción dura del entorno es **GitHub Pages: no hay servidor propio ni reglas de reescritura**
([[../project-memory/ARCHITECTURE]], §infraestructura). Una petición a `/plan` no encuentra ningún
archivo con ese nombre y devuelve el 404 del hosting. Cualquier router de History API en este
proyecto tiene que resolver ese punto o no sobrevive al primer refresh, que es justamente el
criterio de cierre de T-05.

La segunda restricción es de seguridad: la autorización real vive en las policies RLS de Supabase
(CLAUDE.md §7), pero el cliente tiene guards de UX en `universo.events.auth/guard-section`
(`protected-sections`, más el chequeo de `role` para `/admin`). Un router mal hecho es la forma
clásica de saltárselos: si la URL decidiera la sección, escribir `/admin` en la barra montaría el
panel.

## Decisión

**Se adopta un router de History API con tabla de rutas explícita, y `404.html` como fallback de
GitHub Pages.**

Cuatro reglas concretas:

1. **`universo.router` es puro.** Tabla `sección ↔ path`, `normalize-path`, `path->section`,
   `section->path` y `entry`. No toca `js/window` ni `app-db`, así que se prueba con `clj -M:test`.
   Las rutas van **en español** porque son de cara al público: la URL es copy (L-20).

   | Sección | Ruta | | Sección | Ruta |
   |---|---|---|---|---|
   | `:main` | `/` | | `:cupos` | `/cupos` |
   | `:login` | `/ingresar` | | `:cuenta` | `/cuenta` |
   | `:diagnostic-test` | `/diagnostico` | | `:admin` | `/admin` |
   | `:dashboard` | `/tablero` | | `:guestbook` | `/libro-de-visitas` |
   | `:plan` | `/plan` | | `:jacobocordova` | `/profesor` |
   | | | | `:privacidad` | `/privacidad` |

2. **El flujo de información es asimétrico y esa asimetría es la salvaguarda.** De la sección a la
   URL: siempre, y en un único punto — `:complete-navigation`, que corre **después** del guard. De
   la URL a la sección: solo en `:router/init` (carga) y `:router/popstate` (botón atrás), y siempre
   volviendo a pasar por `:navigate-to`. **La URL nunca decide qué se monta**; solo propone.

3. **Un deep link a una ruta protegida no se resuelve al arrancar: queda pendiente.** La sesión de
   Supabase se rehidrata de forma asíncrona (`:auth/init`), así que decidir en el momento de
   `:router/init` mandaría al login a un usuario que sí tiene sesión. `:router/init` anota
   `[:router :pending]` y deja `:transitioning` en true (pantalla en blanco, no la landing);
   `:auth/session-established` y `:auth/session-cleared` lo consumen. Sin sesión, el destino
   sobrevive en `:redirect-after-login` y el usuario aterriza donde pidió después de entrar.

4. **`404.html` en la raíz del repo es el fallback.** GitHub Pages lo sirve para toda ruta que no
   exista como archivo, **sin redirigir y sin tocar la URL**: monta la misma aplicación y el router
   decide. Usa rutas absolutas (`/public/...`) porque se sirve desde cualquier profundidad de path,
   y lleva `noindex`. El equivalente en desarrollo es `:push-state/index` en el `:dev-http` de
   `shadow-cljs.edn`.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Hash routing** (`/#/plan`) | Resuelve el refresh sin tocar el hosting y era la opción barata. Se descartó porque el ticket pide History API y porque el fragmento **no se envía al servidor**: rompe la analítica por página de T-20 —la razón principal por la que se hace esto— y produce URLs peores para compartir con un colegio. El costo que evita (un archivo de 70 líneas) es menor que lo que cuesta. |
| **`404.html` como copia byte a byte de `index.html`** | Es lo más común, pero este repo ya arrastra la duplicación `index.html` / `public/index.html` (A-09, T-12): una tercera copia con el JSON-LD, el Open Graph y el `<noscript>` de marketing multiplica por tres la posibilidad de que diverjan. El `404.html` que se escribió es un arranque mínimo: mismo CSS, mismo bundle, mismo script de tema, **sin** el SEO, que solo tiene sentido en `/`. |
| **`404.html` que guarda la ruta y redirige a `/`** (el truco `spa-github-pages`) | Evita duplicar el SEO igual que la opción elegida, pero cuesta dos cargas de página y un parpadeo visible en cada deep link — justo en el primer contacto con el producto, que es el momento en que menos conviene. Además deja `?/plan` en la barra por un instante. |
| **Archivos estáticos reales por ruta pública** (`/privacidad/index.html`, etc.) | Devolvería 200 en vez de 404 y haría indexables las rutas públicas. Se descartó **por ahora**: multiplica por cuatro la duplicación de `index.html` que A-09 ya señala como riesgo, y hoy no hay evidencia de que esas tres páginas necesiten SEO propio. Queda anotado como consecuencia negativa y como tarea. |
| **Una librería de routing** (`reitit`, `secretary`, `bidi`) | Una dependencia nueva (CLAUDE.md §5) para once rutas sin parámetros, sin anidamiento y sin coerción. La tabla completa cabe en veinte líneas y se testea entera. |
| **Que el router escriba `[:ui :current-section]` directamente** | Es lo natural y es exactamente el agujero: saltaría `guard-section` y `/admin` montaría el panel de administración para cualquiera. Por eso el router siempre despacha `:navigate-to`. |

## Consecuencias

**Positivas**

- `/plan`, `/cupos`, `/diagnostico` y `/admin` son URLs reales que sobreviven a un refresh, que es
  el criterio de cierre de T-05.
- Las rutas protegidas siguen exigiendo sesión, en la carga inicial **y** en el botón atrás
  (verificado: `forward` hacia `/admin` sin sesión aterriza en `/ingresar` y corrige la URL).
- Un deep link a una sección protegida sin sesión ya no se pierde: se convierte en el destino de
  vuelta después del login.
- T-20 (analítica por página, vector G-5) queda desbloqueada: cada pantalla tiene una URL propia.
- La rama 404 de `main-content`, que era un default defensivo inalcanzable, pasa a ser una pantalla
  real y por eso ahora ofrece una salida.

**Negativas / costos aceptados**

- **Todas las rutas salvo `/` responden HTTP 404.** Es como funciona el fallback de GitHub Pages.
  Para la aplicación es indistinguible —el navegador ejecuta el JS igual— pero significa que
  `/profesor`, `/privacidad` y `/libro-de-visitas` **no son indexables**. Por eso *no* se agregaron
  al `sitemap.xml`: declarar una URL que responde 404 es peor que no declararla.
- Un cuarto archivo HTML que mantener en sincronía con el resto (script de tema, ruta del bundle,
  ruta del CSS). Se suma a A-09 en vez de resolverlo.
- La URL cambia **al final** de la transición de 240 ms, no al hacer clic. Es coherente —la barra
  cambia cuando cambia la pantalla— pero significa que la URL va un cuarto de segundo por detrás
  del clic.
- El comentario que dice "esta tabla es espejo del `case` de `main-content`" es una convención, no
  una restricción del compilador. Se sostiene con un test que recorre las secciones.
- Si la aplicación se sirviera alguna vez desde un subdirectorio (un GitHub Pages de proyecto en vez
  de uno de usuario), la tabla de rutas queda mal: asume base `/`.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Que se agregue una sección a `main-content` sin ruta y quede una pantalla sin URL | Test `secciones-de-home-tienen-ruta` y `toda-seccion-protegida-es-enrutable` en `router_test.cljs` | [[../project-memory/BACKLOG]] T-05 |
| Que alguien crea que la URL autoriza algo | El router **nunca** escribe `current-section`; siempre despacha `:navigate-to`. La autorización real sigue siendo RLS | CLAUDE.md §7 |
| Que `404.html` se desincronice de `index.html` | Comentario en cabecera del propio archivo apuntando a L-22 (regla de "cambiar el copy en todos los lugares") | [[../project-memory/LESSONS_LEARNED]] L-22 |
| Que las rutas públicas queden fuera del índice de Google sin que nadie lo note | Anotado arriba y en el backlog; el `sitemap.xml` sigue declarando solo `/`, que responde 200 | [[../project-memory/RISKS]] |

## Seguimiento

- **Se reconsidera** si el proyecto deja GitHub Pages por un hosting con reescrituras (Netlify,
  Cloudflare Pages, Vercel): ahí `404.html` sobra y las rutas responden 200, lo que elimina de una
  vez la consecuencia negativa principal.
- **Se revisa** cuando alguna ruta pública necesite posicionamiento propio: la salida es un archivo
  estático real por ruta, que se decidió no hacer hoy.
- **Se amplía** cuando aparezcan rutas con parámetro (`/plan/:modulo`, `/cupos/:id`). La tabla
  actual es de rutas fijas a propósito; el día que haya parámetros hay que decidir si sigue siendo
  una tabla o pasa a ser una librería.

---

Relacionado: [[../project-memory/ARCHITECTURE]] A-07 · [[../project-memory/BACKLOG]] T-05/T-20 ·
[[../project-memory/DECISIONS]] D-54 · [[ADR-003-github-pages-artefacto-versionado]]
