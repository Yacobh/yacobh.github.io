# project-memory/graph/

**Snapshot versionado** del grafo de conocimiento del repositorio, generado con
[Graphify](../GRAPHIFY_INTEGRATION_GUIDE.md).

| Archivo | Qué es |
|---------|--------|
| `GRAPH_REPORT.md` | Reporte legible: resumen, god nodes, comunidades, hiperaristas, conexiones sorprendentes, huecos de conocimiento, preguntas sugeridas |
| `graph.json` | El grafo completo (insumo de `graphify query` / `path` / `explain`) |
| `graph.html` | Visualización interactiva (abrir en el navegador) |

## Snapshot actual

- **Commit:** `48bf5254`
- **Fecha:** 2026-07-26
- **Tamaño:** 105 nodos · 147 aristas · 13 comunidades
- **Extracción:** 92 % `EXTRACTED` · 8 % `INFERRED` (12 aristas, confianza media 0.74)
- **Ciclos de importación:** ninguno

## Por qué existe esta carpeta

`graphify-out/` (en la raíz) es el **directorio de trabajo** de la herramienta: se regenera, no se
versiona. Esta carpeta es la **copia citable**, atada a un commit concreto: permite decir "al commit
`48bf5254` el grafo tenía esta forma" y comparar la evolución con `git diff`.

Decisión registrada en [`../DECISIONS.md`](../DECISIONS.md) D-14.

## ⚠️ Limitación crítica

**El grafo no indexa archivos `.cljs`.** Cubre Markdown, SQL, JSON, HTML, TS, PNG y el `app.js`
compilado — 33 archivos en total. Las ~10 290 líneas de ClojureScript que contienen el motor IRT, el
perfil, la lógica de cupos, los eventos y los componentes **no están representadas**.

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
