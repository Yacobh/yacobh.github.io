# docs/

Documentación **complementaria** a la memoria del proyecto.

> `project-memory/` es la memoria oficial (fuente de verdad del conocimiento del proyecto).
> `docs/` es para material de apoyo que no es memoria: procedimientos operativos, diagramas,
> consultas guardadas, material histórico.

## Qué va aquí

| Contenido | Ejemplo | Estado |
|-----------|---------|--------|
| **Procedimientos operativos** | Cómo respaldar y restaurar la base de datos (T-07) | ⛔ pendiente |
| **Consultas guardadas** | Vistas y queries de métricas: distribución de θ, top de déficits, estado del outbox (T-21) | ⛔ pendiente |
| **Diagramas y Canvas** | `arquitectura.canvas`, `roadmap.canvas`, `funnel.canvas` (ver `../project-memory/OBSIDIAN_WORKSPACE_GUIDE.md` §5) | ⛔ pendiente |
| **Convención de ramas** | Qué ramas se conservan y por qué (T-18) | ⛔ pendiente |
| **Material histórico archivado** | Documentación superada que conviene conservar | ⛔ pendiente |
| **Notas de operación** | Cómo publicar cupos, cómo cargar contenido paso a paso | parcialmente en `../supabase/CONTENT.md` |

## Qué NO va aquí

- **Estado del proyecto** → `../project-memory/CURRENT_STATUS.md`
- **Decisiones** → `../adr/`
- **Riesgos, supuestos, preguntas** → `../project-memory/`
- **Requisitos y arquitectura** → `../project-memory/`
- **Esquema de base de datos** → `../supabase/SCHEMA.md` (ya existe y es bueno; no duplicarlo)
- **Guía de contenido pedagógico** → `../supabase/CONTENT.md`
- **Reglas para agentes** → `../project-memory/AGENT_INSTRUCTIONS.md` y `../CLAUDE.md`

Si dudas entre `docs/` y `project-memory/`, la pregunta es: *¿es conocimiento que una sesión nueva
necesita para continuar el proyecto?* Si sí, es memoria. Si es un procedimiento o un apoyo visual, es
`docs/`.

## Nota sobre `PROJECT_SUMMARY.md`

`../PROJECT_SUMMARY.md` es la documentación **anterior** a esta memoria. Se conserva en la raíz por
ahora, pero contiene información desactualizada: describe una estructura de módulos previa al MVP y
presenta como parte del producto namespaces que hoy no son alcanzables desde `core.cljs`
(`jardin`, `voz`, `physics`).

**Ante cualquier discrepancia, gana `project-memory/`.**

Está pendiente decidir si se archiva aquí, se reduce a un puntero corto o se mantiene
(`../project-memory/BACKLOG.md` T-33 · `OPEN_QUESTIONS.md` X-07 · `DECISIONS.md` P-10). No se modificó
al crear la memoria para no destruir información sin decisión explícita del owner.

---

Relacionado: [`../project-memory/INDEX.md`](../project-memory/INDEX.md) ·
[`../CLAUDE.md`](../CLAUDE.md)
