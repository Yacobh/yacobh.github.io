# SESSION-027

## Fecha

2026-08-16

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Implementar **[[../project-memory/BACKLOG]] T-05 — router de URL con history API**, con el fallback
de GitHub Pages resuelto y sin debilitar los guards de sesión. El objetivo no cambió.

## Contexto de entrada

- Rama: `main` → se creó `t-05-router-url`
- Commit inicial: `dda5cb4` ("Pivotar el modelo de negocio a licencia institucional y registrar la sesion")
- Estado del árbol al empezar: **limpio**
- Documentos de la memoria leídos: `CLAUDE.md`, `CURRENT_STATUS` (corte 2026-08-16 y las cinco
  pasadas de ese día), `AGENT_INSTRUCTIONS`, `BACKLOG` (T-05, T-20, T-24), `ARCHITECTURE` (§2.1 y
  §10 limitaciones), `DECISIONS` (§1 y §2), plantilla de ADR
- Bloqueos vigentes al empezar: ninguno para esta tarea. El agente **no tiene credenciales** de
  cuenta de prueba (limitación conocida desde T-24/T-38)

## Actividades realizadas

1. Orientación con `graphify query` + lectura dirigida de `src/` (el grafo no indexa `.cljs`,
   CLAUDE.md §13). Mapeado el mecanismo real de navegación: `:navigate-to` → `guard-section`
   (`events/auth.cljs`) → `dispatch-later` 240 ms → `:complete-navigation` (`subs.cljs`) →
   `[:ui :current-section]` → `case` en `home/main-content`.
2. Comprobado que las cinco secciones protegidas cargan sus datos **al montarse**
   (`:plan/enter`, `:slots/enter`, `dashboard` y `cuenta` con `r/with-let`, `:admin/enter` desde
   `:auth/profile-loaded`, `diagnostic-test` desde su propio `with-let`). Sin eso, un deep link
   habría montado pantallas vacías. No hizo falta tocar ninguna.
3. Baseline `clj -M:test`: **83 tests / 454 assertions / 0 failures**.
4. Escrito `universo.router` (puro) y `universo.events.router` (History API); modificados
   `subs.cljs`, `events/auth.cljs`, `db.cljs`, `core.cljs`, `home.cljs`; creados `404.html` y
   `test/universo/router_test.cljs`; `shadow-cljs.edn` gana `:push-state/index` para desarrollo.
5. Verificación en navegador con un simulador de GitHub Pages escrito para la ocasión (sirve la
   raíz del repo y devuelve `404.html` **con status 404** para rutas inexistentes, que es
   exactamente el comportamiento del que depende ADR-026). Vive en el scratchpad, no en el repo.
6. **Lo que no funcionó y costó ~1 hora:** las lecturas del DOM vía `javascript_tool`
   (`querySelector`, `innerText`) devolvían un snapshot desactualizado y describían la landing en
   una URL que ya era `/ingresar`. Se construyó sobre eso una teoría de bug en el orden de efectos
   de re-frame que era imposible por diseño. Se resolvió exportando temporalmente
   `universo.core/dbg` (lee `re-frame.db/app-db`), recompilando y mirando el estado real — que
   **era correcto desde el primer intento**. El export se quitó y se recompiló antes de terminar
   (verificado: `universo.core.dbg` es `undefined` en el bundle publicado). → L-40.
7. Documentación: ADR-026, D-54, y las filas de **ADR-025 y ADR-026** en el índice §1 de
   `DECISIONS` (ADR-025 nunca se había agregado a esa tabla — omisión de la sesión anterior,
   corregida acá).

## Archivos revisados

- `src/universo/home.cljs`, `src/universo/core.cljs`, `src/universo/db.cljs`, `src/universo/subs.cljs`
- `src/universo/events/auth.cljs`, `src/universo/events/landing.cljs`
- `src/universo/components/{plan,slots,dashboard,cuenta,diagnostic_test}.cljs` (solo el montaje)
- `test/universo/events/auth_test.cljs` (estilo de los tests)
- `index.html`, `public/index.html`, `sitemap.xml`, `robots.txt`, `shadow-cljs.edn`, `package.json`
- `adr/ADR-TEMPLATE.md`, `sessions/SESSION_TEMPLATE.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/router.cljs` | **Nuevo, puro.** Tabla `sección ↔ path`, `normalize-path`, `path->section`, `section->path`, `entry` |
| `src/universo/events/router.cljs` | **Nuevo.** Único ns que toca `window.history`: `:router/push`, `:router/replace`, `:router/listen`, `:router/init`, `:router/popstate` |
| `src/universo/subs.cljs` | `:complete-navigation` acepta `opts` (`:history` → `:push`/`:replace`/`:none`) y es el único punto que escribe la URL |
| `src/universo/events/auth.cljs` | `guard-section`/`:navigate-to` propagan `opts`; nuevas `post-session-target` y `post-clear-target` (puras, con test); `session-established`/`session-cleared` consumen `[:router :pending]`; nota sobre `:set-section` (sin llamadores, desincronizaría la URL) |
| `src/universo/db.cljs` | Clave `:router {:pending nil}` documentada |
| `src/universo/core.cljs` | `:require` de `universo.events.router` (L-03) y `dispatch-sync [:router/init]` **antes** de `:auth/init` |
| `src/universo/home.cljs` | Logotipo con `href "/"` (era `"#"`); la rama 404 de `main-content`, ahora alcanzable, ofrece "Volver al inicio" |
| `404.html` | **Nuevo.** Fallback de GitHub Pages: rutas absolutas, `noindex`, sin SEO duplicado, sin redirección |
| `shadow-cljs.edn` | `:push-state/index "index.html"` en `:dev-http` |
| `test/universo/router_test.cljs` | **Nuevo.** 14 tests |
| `adr/ADR-026-router-de-url-con-history-api.md` | **Nuevo** |
| `project-memory/{DECISIONS,BACKLOG,ARCHITECTURE,CURRENT_STATUS,LESSONS_LEARNED}.md` | Ver abajo |
| `public/js/app.js`, `public/css/app.css` | Recompilados (`app.css` sin cambios: no hubo clases nuevas) |

## Comandos ejecutados y resultados

```
clj -M:test (antes)          → 83 tests / 454 assertions / 0 failures / 0 errors
clj -M:test (después)        → 96 tests / 523 assertions / 0 failures / 0 errors
clj-kondo --lint src test    → 0 errores, 0 warnings
npx shadow-cljs release app  → Build completed, 0 warnings, app.js = 1,2 MB (L-30 comprobada)
npm run build:css            → Done in 424ms (app.css sin cambios: ninguna clase nueva)
scripts/audit_contraste.py   → ✓ los 38 pares cumplen su umbral WCAG
scripts/audit_dark_theme.py  → ✓ sin texto oscuro ni fondo claro sin mapear
scripts/audit_movil.py       → ✓ sin problemas en las pantallas del estudiante
graphify update .            → 2856 nodos / 7219 aristas / 197 comunidades (antes 2644/6795/179)
```

Los 5 warnings `:infer-warning` de `events/auth.cljs` siguen ahí y son los conocidos (L-04).

### Verificación en navegador (Chrome + simulador de GitHub Pages)

| Caso | Resultado |
|------|-----------|
| `/plan`, `/cupos`, `/diagnostico` sin sesión | → `/ingresar`, con el destino en `:redirect-after-login` ✅ |
| `/privacidad`, `/profesor`, `/libro-de-visitas` | Montan su sección directo, URL intacta ✅ |
| `/Libro-De-Visitas/`, `/index.html` | Normalizadas con `replaceState` a `/libro-de-visitas` y `/` ✅ |
| `/no-existe-esta-ruta` | 404 del SPA, URL intacta, botón "Volver al inicio" ✅ |
| Navegación interna (clic en "Iniciar sesión") | `pushState`, una sola entrada de historial ✅ |
| Atrás / adelante | Sección y URL coherentes, sin crecimiento del historial ✅ |
| **`forward` hacia `/admin` sin sesión** | **Aterriza en `/ingresar` y corrige la URL** ✅ |
| Deep link **con sesión iniciada** | ❌ **No verificado** — sin credenciales |

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Router de History API + `404.html` como fallback; la sección escribe la URL y nunca al revés | **Sí** | [[../adr/ADR-026-router-de-url-con-history-api]] |
| Rutas en español, fijas, sin librería; `sitemap.xml` no crece | No (menor) | [[../project-memory/DECISIONS]] D-54 |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Todas las rutas salvo `/` responden HTTP 404 → rutas públicas no indexables | Baja | [[../project-memory/ARCHITECTURE]] A-07', [[../project-memory/BACKLOG]] T-94 |
| Un cuarto HTML que mantener sincronizado (se suma a A-09/T-12) | Baja | [[../project-memory/ARCHITECTURE]] A-09, ADR-026 |
| Que se agregue una sección a `main-content` sin ruta | Baja (mitigado) | Tests `secciones-de-home-tienen-ruta` y `toda-seccion-protegida-es-enrutable` |

## Bloqueos

**Acceso.** El camino con sesión iniciada no se pudo verificar: el agente no tiene una cuenta de
prueba. Solo el owner puede desbloquearlo, y **debería hacerlo antes de mergear** (ver Pendientes).

Nota de entorno, **no relacionada con este cambio**: en la máquina de desarrollo `getSession()` de
Supabase tarda o no resuelve, y la nav se queda en `…` (`:auth/ready?` false) durante varios
segundos. Se comprobó que **el bundle anterior a esta rama hace exactamente lo mismo**, así que es
del entorno local, no de T-05.

## Preguntas abiertas nuevas

Ninguna.

## Supuestos aplicados

- Que el sitio se sigue sirviendo desde la **raíz** del dominio (`jacobocordova.com/`, GitHub Pages
  de usuario + `CNAME`). La tabla de rutas asume base `/`; un GitHub Pages *de proyecto* la
  rompería. Anotado en las consecuencias del ADR.

## Próximos pasos

1. **Owner:** probar con sesión iniciada en local — entrar, ir a `/plan` y `/tablero`, recargar,
   probar `/admin` con cuenta admin y con cuenta `user`, y el redirect después del login desde un
   deep link. (T-05)
2. **Owner:** revisar y mergear `t-05-router-url` a `main`; verificar por hash que producción sirve
   el bundle nuevo (mismo patrón que T-19/T-35/T-38) y comprobar **en producción** que un deep link
   a `/plan` funciona — es el único lugar donde el `404.html` real de GitHub Pages entra en juego.
3. **T-20** (instrumentar el funnel, vector G-5): ya no está bloqueada.
4. T-90 y T-93 siguen siendo P0 del negocio y no se tocaron en esta sesión.

## Pendientes

- **Snapshot versionado `project-memory/graph/`:** `graphify update .` sí se corrió, pero **no se
  copió el snapshot**. Esa carpeta es la copia *citable, atada a un commit concreto* (ver su
  `README.md`, D-14) y esta rama todavía no tiene commit ni está mergeada: copiarlo ahora ataría
  5,8 MB a un commit que puede no existir. **Hacerlo al mergear a `main`.**
- Verificación con sesión (punto 1 de Próximos pasos).
- **Nada está en `main`:** la rama `t-05-router-url` no se pusheó ni se mergeó (AGENT_INSTRUCTIONS
  §1.7).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md` (6ª pasada del 2026-08-16)
- [x] `project-memory/BACKLOG.md` (T-05 → `hecho`; T-94 nueva)
- [ ] `project-memory/RISKS.md` — sin riesgos nuevos que registrar (los tres de arriba viven en
      ARCHITECTURE y BACKLOG)
- [x] `project-memory/DECISIONS.md` (D-54 + filas de ADR-025 y ADR-026 en §1)
- [x] `adr/ADR-026-router-de-url-con-history-api.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md` (§2.1, nota de arquitectura, A-07/A-07'/A-09)
- [ ] `project-memory/ROADMAP.md` — no cambió ninguna fase ni hito
- [ ] `project-memory/REQUIREMENTS.md` — no cambió ningún requisito
- [ ] `project-memory/OPEN_QUESTIONS.md` — sin preguntas nuevas ni respondidas
- [ ] `project-memory/ASSUMPTIONS.md` — el supuesto de arriba es del ADR, no del proyecto
- [x] `project-memory/LESSONS_LEARNED.md` (L-40)
- [ ] `project-memory/TERMINOLOGY.md` — sin términos nuevos del dominio
- [ ] `project-memory/graph/` (snapshot de Graphify)

## Notas

- **Lo importante de la forma del router, para quien lo toque después:** la sección es el estado
  autoritativo y la URL su reflejo. Si alguien "simplifica" haciendo que `:router/popstate` o
  `:router/init` escriban `[:ui :current-section]` directo, `/admin` deja de pasar por
  `guard-section`. Está dicho en el docstring de los dos namespaces y en el ADR, en ese orden de
  probabilidad de ser leído.
- El caso difícil no fue el History API: fue que **la sesión de Supabase se rehidrata de forma
  asíncrona**. Por eso existe `[:router :pending]` — decidir en `:router/init` mandaría al login a
  un usuario que sí tiene sesión.
- El simulador de GitHub Pages (`gh_pages_sim.py`) quedó en el scratchpad de la sesión, no en el
  repo. Son 30 líneas y vale la pena rehacerlo si hay que volver a verificar rutas: `python3 -m
  http.server` **no** sirve, porque no hace el fallback a `404.html`.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../adr/ADR-026-router-de-url-con-history-api]] · `../prompts/session-close-memory-update.md`
