# Prompt: arranque de sesión (Project Memory First)

Prompt estándar para iniciar **cualquier** sesión de trabajo con Claude Code CLI en este repositorio.
Cópialo tal cual como primer mensaje.

---

```
Lee completamente:

- CLAUDE.md
- project-memory/HANDOFF.md
- project-memory/PROJECT_BRIEF.md
- project-memory/CURRENT_STATUS.md
- project-memory/ARCHITECTURE.md
- project-memory/DECISIONS.md
- project-memory/AGENT_INSTRUCTIONS.md
- project-memory/graph/GRAPH_REPORT.md, si existe

Construye un modelo mental del proyecto.

Después genera:

1. Resumen ejecutivo
2. Estado actual
3. Arquitectura entendida
4. Riesgos
5. Información faltante
6. Próximos pasos recomendados

No modifiques código todavía.
No hagas supuestos.
Si falta información, registra preguntas concretas.
```

---

## Notas para quien use este prompt

**Qué esperar de la respuesta.** Los seis puntos deben ser una **síntesis**, no un resumen de los
archivos. Si la respuesta parafrasea `HANDOFF.md` sin agregar entendimiento, el modelo leyó pero no
comprendió: pídele que priorice y que diga qué haría primero y por qué.

**Verificación mínima antes de trabajar** (el agente debería hacerla por su cuenta; si no, pídela):

```bash
git status                      # ¿el árbol está limpio?
git log --oneline -5            # ¿sobre qué estoy construyendo?
git log main..HEAD --oneline     # ¿qué falta por publicar?
clj -M:test                     # ¿parto de un estado verde?
```

**Advertencia sobre Graphify.** Los hooks del repositorio exigen ejecutar `graphify` antes de leer
archivos, pero **el grafo no indexa `.cljs`**: un "No matching nodes found" **no** significa que el
código no exista. Para lógica ClojureScript, el mapa es `project-memory/ARCHITECTURE.md` §2 y luego
lectura dirigida de `src/`. Ver `project-memory/GRAPHIFY_INTEGRATION_GUIDE.md` §6.

**Lectura adicional según la tarea:**

| Tarea | Añadir a la lectura |
|-------|---------------------|
| Diagnóstico / IRT | `adr/ADR-004-…`, `project-memory/TERMINOLOGY.md` §IRT, `src/universo/components/tetha.cljs`, `src/universo/irt/progress.cljs` |
| Base de datos / policies | `supabase/SCHEMA.md`, la migración relevante, `project-memory/RISKS.md` R-14, `LESSONS_LEARNED.md` L-09..L-14 |
| Cupos / cohortes | `adr/ADR-006-…`, `src/universo/slots/logic.cljs`, `RISKS.md` R-08 |
| Contenido pedagógico | `supabase/CONTENT.md`, `adr/ADR-005-…` |
| Despliegue | `adr/ADR-003-…`, `CLAUDE.md` §9 |
| Planificación | `ROADMAP.md`, `BACKLOG.md`, `RISKS.md` |

**Al terminar la sesión:** usa `prompts/session-close-memory-update.md`. No es opcional — actualizar la
memoria es parte de terminar el trabajo.
