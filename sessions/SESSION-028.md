# SESSION-028

## Fecha

2026-08-17

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI (Opus 5)

## Objetivo de la sesión

Resolver **[[../project-memory/BACKLOG]] T-12 — la duplicación de `index.html`**. El owner preguntó
cómo hacerlo, se le presentaron las opciones con la evidencia medida y eligió la (a) más un audit
versionado. El objetivo no cambió.

## Contexto de entrada

- Rama: `main` @ `b5a3138` → se creó `t-12-html-unico`
- Estado del árbol al empezar: **limpio**
- Documentos leídos: `BACKLOG` (T-12, T-94), `ARCHITECTURE` (§10-bis audits, §limitaciones A-09),
  `LESSONS_LEARNED` (L-22, L-29, L-30), `RISKS` (R-26), `CLAUDE.md` §9, `shadow-cljs.edn`,
  `scripts/audit_dark_theme.py` (para el estilo)
- Bloqueos vigentes al empezar: ninguno

## Actividades realizadas

1. **Medir antes de proponer.** Se compararon los dos HTML normalizando el prefijo de rutas: el
   `<head>` completo resultó **idéntico byte a byte**; el `<noscript>` de `public/index.html`, no —
   le faltaban dos párrafos, incluido el que nombra a la UNEXPO. **El riesgo que T-12 describía en
   abstracto ya se había materializado.**
2. Se verificó con `grep` que `public/index.html` tenía **un solo consumidor**, el servidor de
   desarrollo: las 20 menciones del repo son documentación *sobre* la duplicación, no uso.
3. Se identificó la causa estructural: producción sirve la **raíz** y desarrollo servía `public/`,
   de ahí la asimetría de rutas (`./public/js/app.js` vs `./js/app.js`).
4. **Se evaluó la única objeción seria a la opción (a)** —que el dev server pasaría a exponer todo
   el repo, incluidos `docs/tesis.md` y `docs/sistema_llovizna.md`— y se comprobó que **no aplica**:
   R-26 está cerrado (los datos personales figuran como `xxxxx` en los archivos commiteados,
   verificado sin imprimir valores) y el repo es público por decisión (D-42).
5. Implementación: `public/index.html` eliminado; `:dev-http :root "."` + `:asset-path "/public/js"`;
   `scripts/audit_html.py` nuevo.
6. **El audit se probó contra cuatro casos que deben fallar** antes de creerle (§10-bis): versión de
   KaTeX distinta, bundle renombrado, script de tema ausente, `noindex` quitado. Los cuatro se
   detectan. `404.html` quedó restaurado byte a byte tras cada prueba (verificado con `git status`).
7. **Corrección al audit tras la primera prueba:** la versión inicial buscaba literalmente `app.js`
   y `app.css`, así que un **renombre** se reportaba como *"404.html no referencia el bundle"* en
   vez de como discrepancia. Se cambió a buscar "el script con `src`" y "la hoja de estilos", y se
   volvió a probar.
8. **Verificación del `:asset-path` con un `watch` real**, que era lo que no se podía dar por bueno.

## Lo que no funcionó

- **`curl` sin `Accept: text/html` hizo creer que el dev server estaba roto.** Todas las rutas HTML
  devolvían 404 mientras los assets daban 200. La causa es que el push-state de shadow-cljs solo
  actúa sobre peticiones que aceptan HTML; con la cabecera puesta, `/`, `/plan`, `/registrarse` y
  `/no-existe` responden 200. **No era un fallo de configuración.** Si se vuelve a probar un
  servidor con push-state por línea de comandos, mandar la cabecera.
- Al recompilar `release` por costumbre, el bundle salió con hash distinto al de `main` pese a que
  **ninguna fuente cambió**. Se investigó el primer byte divergente: es reasignación de símbolos del
  minificador en un recompilado completo. Se verificó que `:asset-path` **no** queda embebido en el
  bundle y se **descartó** el recompilado (`git restore --source=main`) para no meter 1,2 MB de
  diff sin diferencia funcional.

## Archivos revisados

- `index.html`, `public/index.html`, `404.html`, `shadow-cljs.edn`, `package.json`
- `scripts/audit_dark_theme.py`, `scripts/audit_movil.py` (estilo y convenciones de salida)
- `docs/tesis.md`, `docs/sistema_llovizna.md` (solo para confirmar el estado de redacción de R-26)
- `project-memory/{BACKLOG,ARCHITECTURE,LESSONS_LEARNED,RISKS,DECISIONS,AGENT_INSTRUCTIONS}.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `public/index.html` | **Eliminado.** Único consumidor: el dev server |
| `shadow-cljs.edn` | `:dev-http :root "public"` → `"."`; `:asset-path "/js"` → `"/public/js"`; ambos comentados con su porqué |
| `scripts/audit_html.py` | **Nuevo.** Cuarto audit versionado: invariantes entre `index.html` y `404.html` |
| `adr/ADR-027-un-solo-index-html.md` | **Nuevo** |
| `CLAUDE.md` | §5 comandos (+`audit_html.py`), §9 reescrita (dos HTML, ninguno copia); §1: dos avisos vencidos corregidos (copy de origen ya publicado por D-53, `docs/` ya redactados por R-26) |
| `project-memory/DECISIONS.md` | Fila de ADR-027 en §1, **D-55** en §2, cabecera |
| `project-memory/BACKLOG.md` | T-12 → `hecho`; T-94 desbloqueada |
| `project-memory/ARCHITECTURE.md` | A-09 reescrita; `audit_html.py` en la tabla de §10-bis ("los cuatro se probaron…") |
| `project-memory/LESSONS_LEARNED.md` | **L-41** nueva; **L-22 reescrita**: el número de lugares del copy no se recuerda, se mide (al aplicarle su propia regla resultó que no hay número único, depende de qué copy) |
| `project-memory/AGENT_INSTRUCTIONS.md` | §4.7: se reemplaza "los tres lugares" por el mapa medido por tipo de copy, con la instrucción de re-verificar con `grep` |
| `project-memory/CURRENT_STATUS.md` | Corte 2026-08-17 |

**No modificado a propósito:** `public/js/app.js` y `public/css/app.css`. Ninguna fuente cambió.

## Comandos ejecutados y resultados

```
python3 scripts/audit_html.py     → ✓ (y ✗ en los cuatro casos de prueba rotos)
python3 scripts/audit_contraste.py→ ✓ los 38 pares cumplen su umbral WCAG
python3 scripts/audit_dark_theme.py → ✓ sin texto oscuro ni fondo claro sin mapear
python3 scripts/audit_movil.py    → ✓ sin problemas en las pantallas del estudiante
clj -M:test                       → 97 tests / 530 assertions / 0 failures / 0 errors
clj-kondo --lint src test         → 0 errores, 0 warnings
clojure -M:shadow-cljs watch app  → Build completed, 0 warnings (verificación de :asset-path)
npx shadow-cljs release app       → 0 warnings, y **descartado** (ver "Lo que no funcionó")
```

### Verificación del dev server (`watch` real + Chrome)

| Caso | Resultado |
|------|-----------|
| `/` | 200, y es el **`index.html` de producción**: JSON-LD y "UNEXPO" presentes ✅ |
| `/plan`, `/registrarse`, `/no-existe` | 200 por push-state, misma SPA ✅ |
| `/public/js/app.js`, `/public/css/app.css`, favicons, manifest | 200 ✅ |
| `/public/js/cljs-runtime/goog.base.js` | 200 — **`:asset-path` correcto** ✅ |
| `localhost:3000/registrarse` en Chrome | Monta "Crear cuenta" con la declaración de edad ✅ |

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Un solo `index.html`; dev sirve la raíz del repo | **Sí** | [[../adr/ADR-027-un-solo-index-html]] |
| Aceptar que el dev server exponga el árbol completo en `localhost:3000` | No (menor) | [[../project-memory/DECISIONS]] D-55 |
| No recompilar el bundle: ninguna fuente cambió | No | Este archivo, "Lo que no funcionó" |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| Que `404.html` se desincronice de `index.html` | Baja (mitigado) | `scripts/audit_html.py`, ADR-027 |
| Que el dev server exponga material sensible sin commitear en el futuro | Baja | ADR-027 §Consecuencias y §Seguimiento; revisar si R-26 se reabre |

## Bloqueos

Ninguno.

## Preguntas abiertas nuevas

Ninguna.

## Supuestos aplicados

Ninguno: las dos cosas que podrían haberse asumido —que `:asset-path` funcionaría y que
`public/index.html` no tenía otros consumidores— se verificaron con un `watch` real y con `grep`.

## Próximos pasos

1. ✅ **Mergeada y pusheada a `main`.** No hizo falta recompilar ni republicar el bundle: el cambio
   no toca producción salvo por la ausencia de un archivo que Pages nunca servía. Se comprobó `/` y
   un deep link después del push igualmente.
2. **T-94** (entradas estáticas para rutas públicas) queda desbloqueada, P3.
3. **T-90** y **T-93** siguen siendo los P0 del negocio y llevan tres sesiones sin tocarse. **R-30**.

## Pendientes

Ninguno. ✅ El snapshot de `project-memory/graph/` se refrescó al mergear —**2927 nodos / 7189
aristas / 199 comunidades**, contra 2866/7112/194 del snapshot del 2026-08-16— y la rama se mergeó
y pusheó a `main` a pedido explícito del owner.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md` (T-12 cerrada, T-94 desbloqueada)
- [ ] `project-memory/RISKS.md` — sin riesgos nuevos ni cambios de severidad
- [x] `project-memory/DECISIONS.md` (ADR-027 en §1, D-55 en §2)
- [x] `adr/ADR-027-un-solo-index-html.md` (nuevo)
- [x] `project-memory/ARCHITECTURE.md` (A-09, §10-bis)
- [ ] `project-memory/ROADMAP.md` — no cambió fase ni hito
- [ ] `project-memory/REQUIREMENTS.md` — no cambió requisito
- [ ] `project-memory/OPEN_QUESTIONS.md` — sin preguntas nuevas
- [ ] `project-memory/ASSUMPTIONS.md` — sin supuestos nuevos
- [x] `project-memory/LESSONS_LEARNED.md` (L-41 nueva, L-22 actualizada)
- [ ] `project-memory/TERMINOLOGY.md` — sin términos nuevos
- [x] `project-memory/graph/` (refrescado al mergear)

## Notas

- **La lección de fondo (L-41) es más útil que el ticket.** La regla de sincronizar los dos HTML
  existía, estaba escrita en `CLAUDE.md` y falló igual. Lo que hizo posible el fallo no fue el
  olvido: fue que **quien miraba, miraba la copia**. Ante una duplicación forzada, la pregunta útil
  es "¿cuál de las dos mira alguien?" antes que "¿cómo me acuerdo de sincronizar?".
- `CLAUDE.md` §1 tenía **dos avisos vencidos** que ninguna sesión había limpiado: que el copy
  "todavía dice se originó en 2025" (cerrado por D-53 el 2026-08-16) y que hay que redactar `docs/`
  "antes de commitear" (cerrado con R-26 el 2026-08-13, y ya commiteados). Se corrigieron porque uno
  de los dos referenciaba el archivo que esta rama elimina, y porque el propio preámbulo de
  `CLAUDE.md` obliga a corregirlo en el mismo commit cuando contradice a `project-memory/`.
- Si alguien vuelve a probar el dev server con `curl`: **mandar `Accept: text/html`** o el
  push-state no actúa y todo parece un 404.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../adr/ADR-027-un-solo-index-html]] · [[SESSION-027]]
