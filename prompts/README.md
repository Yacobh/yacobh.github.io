# prompts/

Prompts reutilizables para trabajar en este proyecto con Claude Code CLI (o cualquier agente).

Todos asumen **Project Memory First**: leen la memoria antes de actuar y la actualizan al terminar.

## Ciclo de una sesión

| Momento | Prompt |
|---------|--------|
| **Al empezar** (siempre) | [`session-bootstrap.md`](session-bootstrap.md) |
| Durante | el prompt del tipo de tarea (tabla siguiente) |
| **Al cerrar** (siempre) | [`session-close-memory-update.md`](session-close-memory-update.md) |

Los dos obligatorios son el de arranque y el de cierre. Sin el primero, el agente trabaja a ciegas; sin
el segundo, el conocimiento de la sesión se pierde — que es exactamente el problema que PMF resuelve.

## Por tipo de tarea

| Prompt | Cuándo usarlo |
|--------|---------------|
| [`discovery.md`](discovery.md) | Entender un subsistema, un flujo o el proyecto completo antes de tocarlo |
| [`requirements.md`](requirements.md) | Definir, refinar o cuestionar un requisito |
| [`architecture.md`](architecture.md) | Cambio estructural: componente, tabla, integración, refactor, flujo |
| [`infrastructure.md`](infrastructure.md) | Migraciones SQL, policies RLS, triggers, Edge Functions, secretos |
| [`development.md`](development.md) | Implementar una tarea del backlog o corregir un comportamiento |
| [`testing.md`](testing.md) | Escribir tests, mejorar cobertura, diagnosticar un fallo de la suite |
| [`deployment.md`](deployment.md) | Publicar en producción |
| [`documentation.md`](documentation.md) | Escribir o actualizar documentación, ADRs o copy público |
| [`troubleshooting.md`](troubleshooting.md) | Diagnosticar un fallo o un comportamiento inesperado |

## Cómo usarlos

1. Copia el bloque de código del prompt tal cual.
2. Reemplaza los `<PLACEHOLDERS>`.
3. Las "Notas" que acompañan a cada prompt son para **ti**, no para el agente: contienen las trampas
   conocidas del repositorio, los comandos útiles y los criterios de calidad. Vale la pena leerlas
   antes de aceptar una respuesta.

## Advertencia común a todos

Los hooks de `.claude/settings.json` exigen usar `graphify` antes de leer archivos, pero **el grafo de
este repositorio no indexa `.cljs`**: un "No matching nodes found" **no** significa que el código no
exista. Para lógica ClojureScript, el mapa es `project-memory/ARCHITECTURE.md` §2 y luego lectura
dirigida de `src/`. Ver `project-memory/GRAPHIFY_INTEGRATION_GUIDE.md` §6.

---

Relacionado: [`../CLAUDE.md`](../CLAUDE.md) ·
[`../project-memory/AGENT_INSTRUCTIONS.md`](../project-memory/AGENT_INSTRUCTIONS.md) ·
[`../sessions/SESSION_TEMPLATE.md`](../sessions/SESSION_TEMPLATE.md)
