# ADR-027: Un solo `index.html`; desarrollo sirve la raíz del repositorio

## Estado

Aprobada

## Fecha

2026-08-17

## Contexto

Hasta hoy el repositorio tenía **dos** documentos HTML casi idénticos:

- **`index.html`** (raíz) — el que sirve GitHub Pages en producción. Referencia sus recursos con
  rutas relativas a la raíz: `./public/css/app.css`, `./public/js/app.js`.
- **`public/index.html`** — el que servía el servidor de desarrollo de shadow-cljs, configurado con
  `:dev-http {3000 {:root "public"}}`. Mismo contenido, pero con las rutas relativas a `public/`:
  `./css/app.css`, `./js/app.js`.

La duplicación estaba anotada desde el 2026-07-26 como [[../project-memory/ARCHITECTURE]] **A-09** y
como [[../project-memory/BACKLOG]] **T-12**, con el riesgo declarado en abstracto: *"raíz y `public/`
pueden divergir en SEO y JSON-LD"*.

**Ya habían divergido.** Al medirlo para escribir este ADR: el `<head>` completo —meta, Open Graph,
JSON-LD entero, script de tema— resultó **idéntico byte a byte** una vez normalizado el prefijo de
rutas; pero el `<body>` no. El `<noscript>` de `public/index.html` se quedó sin dos párrafos que sí
están en el de la raíz, incluido el que nombra a la UNEXPO (la corrección de origen de D-53). Nadie
lo notó.

**Y el porqué de que nadie lo notara es la parte que importa:** en desarrollo se servía la copia y
**nunca** el archivo que se publica. El original solo se veía en producción, es decir, después de
publicarlo. Una duplicación que nadie mira es peor que una duplicación que alguien mira, porque el
mecanismo que debería detectar la divergencia —usar el producto— está apuntando al archivo
equivocado.

A esto se sumó, el 2026-08-16, un tercer HTML: **`404.html`**, el fallback de GitHub Pages que hace
posible el router de [[ADR-026-router-de-url-con-history-api]]. Ese es un caso distinto y hay que
separarlo con cuidado: **no es una copia que divergió, es un documento que difiere a propósito** —
sin SEO, con `noindex` y con rutas absolutas, porque se entrega con status HTTP 404 desde cualquier
profundidad de path. El propio ADR-026 anotó como riesgo que se desincronizara.

Restricción del entorno: **GitHub Pages sirve la raíz del repositorio** y no admite reescrituras ni
servir desde `public/`. Es decir, la asimetría de rutas entre los dos documentos no era un descuido:
venía de que producción y desarrollo servían **raíces distintas**.

## Decisión

**Se elimina `public/index.html`. El servidor de desarrollo pasa a servir la raíz del repositorio,
igual que GitHub Pages.**

```clojure
;; shadow-cljs.edn
:asset-path "/public/js"                      ; era "/js"
:dev-http   {3000 {:root "."                  ; era "public"
                   :push-state/index "index.html"}}
```

De ahí salen tres consecuencias concretas:

1. **`index.html` es el único documento HTML con SEO del proyecto**, y desarrollo y producción
   sirven exactamente el mismo archivo. La divergencia deja de ser posible porque deja de haber dos
   cosas que sincronizar.
2. **`:asset-path` pasa a `/public/js`** porque va atado a la raíz del servidor: es el prefijo desde
   el que el navegador carga los módulos del build de **desarrollo**. En `release` es irrelevante —
   un solo módulo, referenciado directo desde el HTML— y se verificó que la cadena no queda embebida
   en el bundle, así que **este cambio no obliga a recompilar producción**.
3. **El par `index.html` / `404.html` sí sobrevive, y por eso se audita.** Como difieren a propósito,
   no se pueden fusionar ni generar uno del otro. Lo que se hace en su lugar es versionar la
   comprobación: **`scripts/audit_html.py`**, en la misma línea que los tres audits existentes
   ([[../project-memory/ARCHITECTURE]] §10-bis, *"un hallazgo que no se versiona se pierde"*).
   Verifica lo que **tiene** que coincidir —script de tema, que bundle/CSS/manifest resuelvan al
   mismo archivo, versión de KaTeX, juego de favicons, existencia de los archivos referenciados— y
   que `404.html` lleve `noindex`. Ignora a propósito el SEO, que solo debe estar en la raíz.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Generar `public/index.html` desde `index.html`** con un script (opción (b) del ticket) | Funciona y da una sola fuente de verdad, pero **deja los tres archivos en pie** y agrega un paso de build a un proyecto que no tiene pipeline (solo dos scripts npm y compilación manual, ADR-003). La opción elegida **elimina** un archivo en vez de agregar maquinaria para mantenerlo sincronizado. |
| **Documentar la duplicación y sincronizarla siempre** (opción (c) del ticket) | Es lo que ya estaba en vigor —CLAUDE.md §9 lo pedía explícitamente— y es justamente lo que falló. El `<noscript>` divergió con la regla escrita y vigente. Una convención que ya se incumplió no se arregla repitiéndola. |
| **Un `templates/base.html` + generador para los tres documentos** | Sobreingeniería para tres archivos, y rompe la simplicidad de ADR-003 (el artefacto versionado se puede leer y diffear tal cual). Además `404.html` comparte poco: sin SEO, sin `<noscript>` de marketing, con rutas absolutas. |
| **`404.html` como copia de `index.html`** | Ya evaluada y descartada en ADR-026: reintroduciría el JSON-LD y el `canonical` de `/` en todas las rutas del router, y las rutas relativas se romperían a profundidad > 1. |
| **Dejar `:root "public"` y symlink** | Los prefijos de ruta son distintos (`./public/js` vs `./js`): un symlink serviría el archivo equivocado. Es la asimetría de raíces, no la copia, lo que había que atacar. |

## Consecuencias

**Positivas**

- Un documento HTML menos, y con él una copia menos del JSON-LD y del script de tema.
- **Desarrollo prueba el archivo que se publica.** Es la ganancia mayor y no era el objetivo
  declarado del ticket: cierra el mecanismo que permitió que la divergencia pasara inadvertida.
- El copy de cara al público baja de **cinco lugares a cuatro** (L-22): `index.html` (JSON-LD y
  `noscript`), `landing.cljs` y `home.cljs`.
- La duplicación que queda —`index.html` / `404.html`— pasa de "acuérdate de sincronizar" a
  verificable con un comando.
- Desbloquea [[../project-memory/BACKLOG]] T-94, que estaba anotada como "no hacer antes de T-12".

**Negativas / costos aceptados**

- **El servidor de desarrollo expone toda la raíz del repositorio** en `localhost:3000`
  (`project-memory/`, `adr/`, `docs/`, `sessions/`). Se evaluó antes de decidir y se aceptó: el
  repositorio es **público por decisión** (D-42) y R-26 está cerrado —los datos personales de
  `docs/tesis.md` y `docs/sistema_llovizna.md` fueron redactados antes del primer commit—, así que
  no hay nada servido en local que no esté ya en GitHub. **Si alguna vez vuelve a haber material
  sensible sin commitear en el árbol, esta decisión hay que revisarla.**
- `:asset-path` queda acoplado a `:dev-http :root`. Si alguien cambia uno sin el otro, el build de
  desarrollo no carga sus módulos. Está comentado en `shadow-cljs.edn`, en los dos lugares.
- Sigue habiendo dos HTML en producción. Este ADR no elimina A-09: lo **reduce y lo hace
  verificable**.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Que `404.html` se desincronice de `index.html` | `scripts/audit_html.py`, probado contra cuatro casos que deben fallar antes de creerle | ARCHITECTURE §10-bis |
| Que el audit tenga un falso negativo y dé todo por bueno | Se probó rompiendo a propósito: versión de KaTeX distinta, bundle renombrado, script de tema ausente, `noindex` quitado. Los cuatro se detectan | §10-bis, L-29 |
| Que el dev server exponga material sensible sin commitear | Repo público (D-42) y R-26 cerrado. Revisar esta decisión si eso cambia | [[../project-memory/RISKS]] R-26 |

## Seguimiento

- **Se revisa** si alguna vez hay material sin commitear que no deba servirse en local: ahí conviene
  acotar el `:root` o atar el dev server a `localhost`.
- **Se reconsidera entera** si el proyecto deja GitHub Pages por un hosting con reescrituras: ahí
  `404.html` desaparece y queda **un** solo HTML, cerrando A-09 del todo.
- **Se amplía** `audit_html.py` si aparece un tercer documento en producción, cosa que hoy no está
  prevista.

---

Relacionado: [[../project-memory/ARCHITECTURE]] A-09 · [[../project-memory/BACKLOG]] T-12/T-94 ·
[[../project-memory/DECISIONS]] D-55 · [[ADR-026-router-de-url-con-history-api]] ·
[[ADR-003-github-pages-artefacto-versionado]] · [[../project-memory/LESSONS_LEARNED]] L-22
