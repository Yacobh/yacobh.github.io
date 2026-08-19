# project-memory/graph/

**Snapshot versionado** del grafo de conocimiento del repositorio, generado con
[Graphify](../GRAPHIFY_INTEGRATION_GUIDE.md).

| Archivo | Qué es |
|---------|--------|
| `GRAPH_REPORT.md` | Reporte legible: resumen, god nodes, comunidades, hiperaristas, conexiones sorprendentes, huecos de conocimiento, preguntas sugeridas |
| `graph.json` | El grafo completo (insumo de `graphify query` / `path` / `explain`) |
| `graph.html` | Visualización interactiva (abrir en el navegador) |

## Snapshot actual

- **Commit:** `a29396d` (rama `main`, **publicada**)
- **Fecha:** 2026-08-18
- **Tamaño:** 3119 nodos · 7635 aristas
- **Extracción:** ver el encabezado de `GRAPH_REPORT.md`
- **Ciclos de importación:** ninguno

> ℹ️ **Sobre el vaivén del tamaño.** El snapshot de la tarde del 2026-08-18 bajó a 2 093 nodos y el
> de la noche subió a 3 119: los dos salieron de `graphify update .` (AST, sin costo de API) y **sin**
> el paso `cluster-only` de la guía, a propósito, porque `--no-label` habría renombrado las
> comunidades a "Community N" y las actuales tienen nombres útiles. **El número sube y baja según qué
> entra al índice en esa corrida** —el historial de abajo lo documenta desde julio—, no según cuánto
> código hay. El grafo curado previo quedó respaldado por la propia herramienta en
> `graphify-out/2026-08-18/`, y las versiones anteriores siguen recuperables del historial de Git.

> **Historial de tamaños:** 105 nodos al 2026-07-26 (`48bf5254`) · 2 376 al 2026-08-10 · 1 560 al
> 2026-08-13 por la mañana · 2 583 el mismo día por la tarde · 2 644 al cierre del 2026-08-13 ·
> 2 866 al 2026-08-16 (T-05, router de URL) · 2 927 al 2026-08-17 (T-12, un solo `index.html`) ·
> **2 093 al 2026-08-18** (catálogo de misconceptions; rebuild AST-only, ver el aviso de arriba) ·
> **3119 al cierre del 2026-08-18** (panel de ideas erróneas y `universo.editor`).
>
> **El número sube y baja según si el `app.js` minificado entró al índice en esa corrida, no según
> cuánto crezca el proyecto.** Cuando entra, sus símbolos ofuscados (`v()`, `K()`, `C()`…) copan los
> god nodes y multiplican las aristas; cuando no, el núcleo vuelve a ser la documentación y el
> esquema. **Comparar dos snapshots por su tamaño no dice nada útil** — para eso está el commit del
> que se construyó cada uno.

## Por qué existe esta carpeta

`graphify-out/` (en la raíz) es el **directorio de trabajo** de la herramienta: se regenera, no se
versiona. Esta carpeta es la **copia citable**, atada a un commit concreto: permite decir "al commit
`5207882a` el grafo tenía esta forma" y comparar la evolución con `git diff`.

Decisión registrada en [`../DECISIONS.md`](../DECISIONS.md) D-14.

## ⚠️ Limitación crítica

**El grafo no indexa archivos `.cljs`.** Cubre Markdown, SQL, JSON, HTML, TS, PNG y el `app.js`
compilado — 141 archivos al 2026-08-12. Las ~10 290 líneas de ClojureScript que contienen el motor
IRT, el perfil, la lógica de cupos, los eventos y los componentes **no están representadas**. El
complemento para preguntas del tipo "¿quién llama a X?" en CLJS es `clj-kondo` con `:analysis true`
(ver [`../GRAPHIFY_INTEGRATION_GUIDE.md`](../GRAPHIFY_INTEGRATION_GUIDE.md) §6).

Consecuencia: un `graphify query` que devuelve "No matching nodes found" **no** significa que el código
no exista. Para lógica ClojureScript, el mapa es [`../ARCHITECTURE.md`](../ARCHITECTURE.md) §2 y luego
lectura dirigida de `src/`.

Además, la comunidad 2 del reporte (`evalFetch()`, `fetch()`, `loadPending()`, "FIXME: check status") es
el **runtime compilado de shadow-cljs**, no código del proyecto: ignórala. Las comunidades 0, 5 y 6 son
secciones de `package.json`.

Detalle completo: [`../GRAPHIFY_INTEGRATION_GUIDE.md`](../GRAPHIFY_INTEGRATION_GUIDE.md) §6.
Riesgo asociado: `../RISKS.md` R-20. Tarea: `../BACKLOG.md` T-32.

## Cómo refrescar el snapshot

```bash
graphify update .                    # re-extrae lo que cambió (AST, sin costo de API)
graphify cluster-only . --no-label   # re-agrupa y regenera reporte + visualización
cp graphify-out/{GRAPH_REPORT.md,graph.json,graph.html} project-memory/graph/
git rev-parse HEAD                   # debe coincidir con "Built from commit" del reporte
```

Si tras un refactor que **borra** código el update se niega a escribir (menos nodos que antes), usa
`graphify update . --force`.

## Verificar frescura antes de usarlo

```bash
git rev-parse HEAD
head -15 GRAPH_REPORT.md   # línea "Built from commit:"
```

Si no coinciden, el snapshot está viejo: refréscalo o adviértelo explícitamente antes de citarlo.

---

Relacionado: [`../GRAPHIFY_INTEGRATION_GUIDE.md`](../GRAPHIFY_INTEGRATION_GUIDE.md) ·
[`../ARCHITECTURE.md`](../ARCHITECTURE.md) §11
