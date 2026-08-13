# project-memory/graph/

**Snapshot versionado** del grafo de conocimiento del repositorio, generado con
[Graphify](../GRAPHIFY_INTEGRATION_GUIDE.md).

| Archivo | Qué es |
|---------|--------|
| `GRAPH_REPORT.md` | Reporte legible: resumen, god nodes, comunidades, hiperaristas, conexiones sorprendentes, huecos de conocimiento, preguntas sugeridas |
| `graph.json` | El grafo completo (insumo de `graphify query` / `path` / `explain`) |
| `graph.html` | Visualización interactiva (abrir en el navegador) |

## Snapshot actual

- **Commit:** `5207882a`
- **Fecha:** 2026-08-12
- **Tamaño:** 1 560 nodos · 1 898 aristas · 144 comunidades (141 archivos, ~1,1 M palabras)
- **Extracción:** 100 % `EXTRACTED` · 0 % `INFERRED`
- **Ciclos de importación:** ninguno

> **Historial de tamaños** (para no leer el crecimiento como crecimiento del proyecto): 105 nodos al
> 2026-07-26 (`48bf5254`) · 2 376 nodos al 2026-08-10, inflados por el `app.js` minificado, cuyos
> símbolos ofuscados (`v()`, `K()`…) coparon los god nodes · 1 560 nodos hoy, con la documentación
> como núcleo. Los god nodes actuales son los que corresponde: el esquema de Supabase y las sesiones.

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
