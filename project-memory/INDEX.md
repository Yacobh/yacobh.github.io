# INDEX — Project Memory (Academia Integral)

> Mapa de contenidos (MOC) de la memoria del proyecto. Punto de entrada para humanos en Obsidian
> y para agentes que necesiten navegar. **La fuente de verdad es este directorio, en Git.**

Última revisión: **2026-07-26**

## Empezar aquí

- [[HANDOFF]] — continuar el proyecto sin contexto previo (leer primero)
- [[PROJECT_BRIEF]] — qué es, para quién, alcance y exclusiones
- [[CURRENT_STATUS]] — dónde estamos hoy, bloqueos, próximo paso

## Negocio y alcance

- [[BUSINESS_CONTEXT]] — problema, propuesta de valor, stakeholders, métricas
- [[REQUIREMENTS]] — RF, RNF, reglas de negocio, casos de uso, criterios de aceptación
- [[TERMINOLOGY]] — glosario (θ, banda, capa 0, cupo, PAES, misconception…)

## Técnico

- [[TECH_STACK]] — lenguajes, librerías, versiones, comandos
- [[ARCHITECTURE]] — componentes, flujos de datos, infraestructura, seguridad
- [[DEPENDENCIES]] — dependencias técnicas, externas y humanas
- `graph/GRAPH_REPORT.md` — snapshot del grafo del repositorio (Graphify)
- [[GRAPHIFY_INTEGRATION_GUIDE]] — cómo usar Graphify dentro de PMF

## Gobernanza y decisiones

- [[DECISIONS]] — índice de decisiones → `../adr/`
- [[ASSUMPTIONS]] — supuestos vigentes y cómo validarlos
- [[OPEN_QUESTIONS]] — preguntas abiertas (no asumir: preguntar)
- [[RISKS]] — riesgos con impacto, probabilidad, severidad y mitigación
- [[LESSONS_LEARNED]] — trampas ya pisadas, no repetir

## Ejecución

- [[ROADMAP]] — fases, objetivos, entregables, hitos
- [[BACKLOG]] — épicas, features, tareas, prioridad, criterios de terminado
- `../sessions/` — bitácora por sesión (`SESSION_TEMPLATE.md`)
- `../prompts/` — prompts reutilizables por tipo de tarea

## Para agentes de IA

- [[AGENT_INSTRUCTIONS]] — reglas obligatorias antes de tocar código, infra o docs
- `../CLAUDE.md` — punto de entrada de Claude Code CLI
- `../prompts/session-bootstrap.md` — prompt de arranque de sesión
- `../prompts/session-close-memory-update.md` — prompt de cierre de sesión

## Para humanos

- [[OBSIDIAN_WORKSPACE_GUIDE]] — usar Obsidian como Knowledge Workspace sobre esta carpeta

---

## Grafo de relaciones (para Graph View de Obsidian)

```
PROJECT_BRIEF ── BUSINESS_CONTEXT ── REQUIREMENTS ── ARCHITECTURE ── DECISIONS ── ADRs
      │                │                   │              │             │
   ROADMAP ────────  BACKLOG  ──────── CURRENT_STATUS ── RISKS ── OPEN_QUESTIONS
      │                                    │                          │
   HANDOFF ─────────────────────────── sessions/ ─────────────── ASSUMPTIONS
```
