# SESSION-043

## Fecha

2026-09-16

## Participantes

- Humano: Jacobo Córdova (owner)
- Agente / modelo: Claude Code CLI · Opus 5

## Objetivo de la sesión

**Cumplido: T-135 cerrada y verificada en producción.** Se venía a cerrar **T-135 completo**: verificar `061_visitor_fuente.sql` contra un PostgreSQL desechable y
escribir la otra mitad —que el cliente lea `?de=` y mande `p_fuente`—, que es lo que hace que el
panel de visitantes muestre el canal. El objetivo no cambió.

## Contexto de entrada

- Rama: `main`
- Commit inicial: `5f3e5ca` (*Agregar el panel de visitantes, que es el primer trozo de T-22*)
- Estado del árbol al empezar: **sucio** — `061_visitor_fuente.sql` sin commitear (T-135), que es
  justo el archivo de esta sesión.
- Documentos de la memoria leídos: `CLAUDE.md`, `BACKLOG` (T-135, T-136), `RISKS` (R-39, R-31),
  `DECISIONS` (D-65…D-67), `supabase/SCHEMA.md` (`014`, `015`, orden de migraciones),
  `sessions/SESSION-042.md` (receta del Postgres desechable).
- Bloqueos vigentes al empezar: `061` sin aplicar; las 100 tarjetas QR sin imprimir (ventana
  abierta).

## Actividades realizadas

1. **Orientación con el grafo** (`graphify query`) y lectura del estado real: `061` escrita y
   razonada, `crud/track-visitor!` llamando al RPC de 4 argumentos, y —hallazgo útil— el panel de
   admin **ya lee `fuente`** con reintento (`fetch-admin-visitors`). O sea que faltaba solo la
   mitad de escritura, y ya existía el patrón a imitar.
2. **PostgreSQL 14.18 desechable** (`initdb` + `pg_ctl` en el scratchpad) con una réplica de
   `visitor` —sus siete columnas, RLS, policy de insert para `anon`— y `014` cargado antes, para
   reproducir el estado *previo* a la migración.
   *(No funcionó al primer intento: el socket Unix del scratchpad excede los 103 bytes que permite
   Postgres. Se levantó por TCP en `127.0.0.1:54399`.)*
3. **Verificación de `061`**: aplicación limpia, reaplicación idempotente, convivencia de las dos
   sobrecargas con sus grants, check e índice parcial, y **13 etiquetas hostiles** (`<script>`,
   `' or 1=1--`, tildes, espacios, 41 caracteres, salto de línea) que guardan `null` **sin romper
   la fila**. También que el check **sí** rechaza un `insert` directo que se saltee el RPC.
4. **PostgREST real** (ya instalado por Homebrew) contra esa base, para probar lo único que el SQL
   solo no prueba: **la resolución de la sobrecarga**. 4 claves → la función de `014`; 5 claves →
   la de `061`; 5 claves con `p_fuente: null` → también la de `061`, sin ambigüedad.
5. **El orden invertido, medido**: con el bundle antes que la migración, PostgREST responde
   `404 PGRST202` y **la visita no se registra en absoluto**. Eso convirtió una nota de diseño en
   una decisión: el cliente necesita red propia.
6. **Mitad cliente**: `universo.fuente` (namespace puro), `crud/track-visitor!` mandando `p_fuente`
   con reintento, `visitor-tracker/start-tracking!` recibiendo la query string, y `core/init!`
   capturándola **antes** de `:router/init`.
7. **Verificación de punta a punta** con el **supabase-js real del proyecto** contra la base
   desechable (un proxy mínimo traduce `/rest/v1/…` a PostgREST): `?de=tarjeta` deja
   `visitor.fuente = 'tarjeta'`, sin `?de=` deja `null`, y la consulta de campaña agrupa por canal.
8. Tests, lint, `release app` y verificación de que `p_fuente` **está en el artefacto publicado**
   (la comprobación que T-135 usaba al revés: *«cero menciones de `fuente` en `public/js/app.js`»*).
9. Desmontaje del cluster desechable.
10. **El owner aplicó `061` en producción** al cierre de la sesión, antes de commitear — el orden
    que pide R-39. Se actualizó la memoria que decía «sin aplicar» y se cerró **T-136**.
11. **Push y verificación del despliegue:** GitHub Pages republicó en ~30 s y el bundle servido es
    byte por byte el release local (1.476.022 bytes) con `p_fuente`. *(No se pudo confirmar desde
    acá el schema cache de PostgREST: Supabase devuelve **401** en el endpoint OpenAPI para `anon`,
    y la única alternativa era llamar al RPC, que habría insertado una fila en producción.)*
12. **El owner verificó en vivo:** `/?de=tarjeta` dejó la fila **1052** con `fuente = 'tarjeta'`.
    **T-135 cierra** y se abrió **T-148** para la decisión que queda.

**Lo que no funcionó / se descartó:**

- **Socket Unix en el scratchpad:** ruta demasiado larga (>103 bytes). Se usa TCP.
- **Mandar `p_fuente` solo cuando hay etiqueta:** descartado. PostgREST elige la sobrecarga por el
  conjunto de claves del cuerpo, así que eso partiría el camino en dos y el camino que fallaría
  sería justo el de la campaña — el único que importa medir.
- **Verificar en vivo contra producción:** descartado a propósito **durante la construcción**.
  `061` todavía no estaba aplicada allá, y probar habría insertado filas reales en `visitor`. El
  owner aplicó la migración al final de la sesión, así que ese paso queda para él, con el sitio ya
  publicado.

## Archivos revisados

- `supabase/migrations/061_visitor_fuente.sql`, `supabase/migrations/014_visitor_track_rpc.sql`
- `supabase/SCHEMA.md` (§`014`, §`015`, orden de migraciones)
- `src/universo/db/crud.cljs` (`track-visitor!`, `fetch-admin-visitors` — el patrón de reintento)
- `src/universo/visitor_tracker.cljs`, `src/universo/core.cljs`
- `src/universo/router.cljs`, `src/universo/events/router.cljs` — **acá estaba el defecto latente**
- `src/universo/motor.cljs` (`falta-la-columna-de-version?`, el precedente de R-39)
- `src/universo/visitantes.cljs`, `test/universo/visitantes_test.cljs`
- `project-memory/BACKLOG.md` (T-135, T-136), `project-memory/RISKS.md` (R-39, R-31)

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `src/universo/fuente.cljs` | **Nuevo.** Namespace puro: lee `?de=`, normaliza con la regla del check de `061`, y reconoce el error de PostgREST que dice que la migración falta |
| `src/universo/db/crud.cljs` | `track-visitor!` manda `p_fuente` siempre y **reintenta sin él** si `061` no está aplicada |
| `src/universo/visitor_tracker.cljs` | `start-tracking!` recibe la query string como argumento y resuelve la etiqueta **antes** del `go` |
| `src/universo/core.cljs` | `init!` captura `location.search` **antes** de `[:router/init]`, que la borraría |
| `test/universo/fuente_test.cljs` | **Nuevo.** 8 tests: etiquetas reales, corpus hostil (el mismo que corrió contra Postgres), el invariante de que nada que salga de `normalizar` puede violar el check, y el reintento — incluido el caso que **no** debe reintentarse |
| `public/js/app.js` | Recompilado (ADR-003): el artefacto publicado ya manda `p_fuente` |
| `supabase/SCHEMA.md` | Sección nueva de `061` + entrada 63 en el orden de migraciones (renumeradas las siguientes) |
| `CLAUDE.md` | `universo.fuente` en las dos listas de namespaces puros (§4 y §5) |
| `project-memory/ARCHITECTURE.md` | Fila de `universo.fuente`, la advertencia del orden en el arranque, y `fuente` en la tabla de datos personales (como **no** personal) |
| `project-memory/DECISIONS.md` | **D-68** |
| `project-memory/RISKS.md` | R-39: segunda instancia, con el modo de fallo medido |
| `project-memory/BACKLOG.md` | **T-135 y T-136 cerradas**; **T-148 nueva** (decidir las etiquetas del QR) |
| `project-memory/CURRENT_STATUS.md` | Bloque del 2026-09-16 y fecha de corte |
| `project-memory/LESSONS_LEARNED.md` | **L-62** |

## Comandos ejecutados y resultados

```
clj -M:test                 → 211 tests / 2817 assertions / 0 failures, 0 errors
npx shadow-cljs release app → Build completed (250 files, 18 compiled, 0 warnings)
                              `p_fuente` presente en public/js/app.js
npm run build:css           → no corrido (ningún cambio de clases Tailwind; no hay cambio de UI)
clj-kondo --lint src test   → 0 errors, 1 warning — ambos hallazgos son previos y en otros archivos
graphify update .           → 3799 nodos, 8960 aristas, 261 comunidades
graphify cluster-only --no-label + snapshot a project-memory/graph/ → 262 comunidades

initdb + pg_ctl + psql (PostgreSQL 14.18 desechable, fixture a mano) + PostgREST
  → 061 aplica limpia con ON_ERROR_STOP=1 e **idempotente** al reaplicar
  → las dos sobrecargas conviven, ambas con execute para anon y authenticated
  → 13 etiquetas hostiles → null, sin romper la fila; el check rechaza el insert directo
  → PostgREST: 4 claves → la de 014 · 5 claves (y 5 con null) → la de 061, sin ambigüedad
  → ORDEN INVERTIDO: 404 PGRST202 y **se pierde la fila entera**
  → reversión del pie: funciona, deja la de 4 argumentos intacta
  → supabase-js real del proyecto: `?de=tarjeta` → visitor.fuente = 'tarjeta'
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| La etiqueta se lee **solo** de la clave `de`, nunca la query string cruda; se valida con la misma regla de los dos lados; `p_fuente` viaja siempre, con reintento si `061` falta | No — sigue el patrón ya decidido en D-65/ADR-034, no lo cambia | [[../project-memory/DECISIONS]] **D-68** |

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| El bundle puede llegar a producción antes que su migración — **segunda instancia**, ahora con el modo de fallo medido (`404 PGRST202`, se pierde la fila entera, no la etiqueta) | Media, **mitigada en código** | RISKS R-39 |

Ninguno nuevo.

## Bloqueos

**Ninguno técnico.** Los dos que había durante la sesión se levantaron al final:

- `061` **estaba sin aplicar** mientras se construía —se aplica a mano en el SQL Editor, §9 de
  `CLAUDE.md`— y **el owner la aplicó el 2026-09-16**, antes de commitear. Ese orden es el que pide
  R-39.
- Probar `?de=tarjeta` contra producción **habría insertado filas reales** en `visitor`, así que
  durante la construcción no se hizo. Con la migración aplicada y el bundle publicado, la
  verificación en vivo ya es posible y queda para el owner.

Sigue pendiente **una decisión, no un bloqueo técnico**: **las etiquetas del QR no están decididas**
y no se inventaron. La migración nombra `tarjeta`, `afiche` e `instagram` como ejemplos.

## Preguntas abiertas nuevas

Ninguna. La única indecisión —qué etiquetas van impresas— es una decisión del owner con plazo
(antes de la imprenta), y quedó como paso 4 de T-135, no como pregunta de memoria.

## Supuestos aplicados

- La forma de `visitor` usada en el fixture se tomó de `crud/admin-visitors-columnas-base`, que
  declara haberla verificado contra `information_schema` el 2026-09-14. La tabla es **previa al
  MVP** y no tiene `create table` versionado, así que no hay otra fuente. Si la tabla real tiene
  columnas adicionales, no cambia nada de lo verificado: `061` solo agrega una columna nueva.
- Ninguno nuevo en `ASSUMPTIONS.md`.

## Próximos pasos

1. ✅ **Aplicar `061`** — hecho por el owner el 2026-09-16, anotado en `supabase/SCHEMA.md`
   (entrada 63).
2. ✅ **Commitear y publicar** — hecho el 2026-09-16, con la migración ya aplicada (R-39).
3. ✅ **Verificado en producción** el 2026-09-16: la fila **1052** (`15:56:40+00`) llegó con
   `fuente = 'tarjeta'` y las anteriores en `null`. **T-135 cierra.**
4. ⏳ **Decidir las etiquetas y mandar a imprimir** las 100 tarjetas y el afiche — **T-148**. Una vez
   impreso el QR, la etiqueta no se corrige.
5. Sin relación con esto: **T-131** (café con el colega, con el mapa de errores delante) sigue
   siendo el paso que mide el negocio.

## Pendientes

- **Las etiquetas del QR sin decidir** — **T-148**, lo único que queda de esta línea y lo único con
  plazo duro: después de la imprenta no se corrige. Y es más que un nombre: **cuántos canales se
  distinguen** (una etiqueta para todo lo impreso, una por pieza, una por lugar) es un corte que
  cuesta cero en software y que solo se puede tomar antes de imprimir.
- **Borrar o descontar la fila 1052**, que es la prueba del owner y ya cuenta como una llegada por
  tarjeta en la consulta de campaña. R-37 en miniatura; la propia migración lo anticipaba.
- ✅ **T-135 cerrada** (verificada en producción) y **T-136 cerrada** (`061` commiteada, `029` ya
  revertida): el árbol queda limpio.

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-0NN-….md` (nuevo) — **no aplica**: D-68 sigue un patrón ya decidido (ADR-034), no lo cambia
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — no aplica: ninguna fase ni hito cambió
- [ ] `project-memory/REQUIREMENTS.md` — no aplica
- [ ] `project-memory/OPEN_QUESTIONS.md` — no aplica: ninguna pregunta nueva ni respondida
- [ ] `project-memory/ASSUMPTIONS.md` — no aplica
- [x] `project-memory/LESSONS_LEARNED.md` — L-62
- [ ] `project-memory/TERMINOLOGY.md` — no aplica
- [x] `project-memory/graph/` (snapshot de Graphify)

Fuera de la lista del template, también se actualizaron `supabase/SCHEMA.md` (sección de `061` y
orden de migraciones) y `CLAUDE.md` (§4 y §5, `universo.fuente` en las listas de namespaces puros).

## Notas

**El defecto que no habría encontrado ningún test, y que ya estaba a punto de escribirse.**
`:router/init` corre con `dispatch-sync` **antes** de `tracker/start-tracking!` y normaliza la URL
con `replaceState`, así que `/?de=tarjeta` ya es `/` cuando el tracker arranca. Leer
`location.search` adentro de `start-tracking!` —que es lo natural y donde vive el resto de la
lógica— habría devuelto siempre la cadena vacía: **la campaña entera habría salido sin atribuir**,
con el build en verde, los tests en verde y la columna existiendo en la base. Se encontró leyendo
el orden de `core/init!`, no probando. Es el mismo género de defecto que L-58/L-59 describen desde
SESSION-042: el verde no significa que funcione.

**Dos cosas que ya estaban hechas y la memoria no decía.** El panel de admin ya leía `fuente` con
reintento (`fetch-admin-visitors`, del commit anterior), o sea que la mitad de lectura estaba
resuelta y solo faltaba la de escritura; y `motor/falta-la-columna-de-version?` ya era exactamente
el patrón de reintento que hacía falta, con su test del caso que **no** debe reintentarse. Buscar
el precedente antes de inventar la solución ahorró la mitad del diseño.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/BACKLOG]] (T-135) ·
[[../project-memory/DECISIONS]] (D-68) · [[../project-memory/RISKS]] (R-39) ·
`../supabase/migrations/061_visitor_fuente.sql`
