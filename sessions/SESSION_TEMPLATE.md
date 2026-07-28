# SESSION-XXX

> Copia este archivo a `SESSION-XXX.md` con el siguiente número consecutivo.
> Se completa **al cerrar** la sesión. Si una sección no aplica, escribe "Ninguna" — no la borres.

## Fecha

YYYY-MM-DD

## Participantes

- Humano:
- Agente / modelo:

## Objetivo de la sesión

Qué se venía a hacer, en una o dos frases. Si el objetivo cambió durante la sesión, dilo y explica por
qué.

## Contexto de entrada

- Rama:
- Commit inicial:
- Estado del árbol al empezar (limpio / sucio, qué archivos):
- Documentos de la memoria leídos:
- Bloqueos vigentes al empezar:

## Actividades realizadas

1.
2.
3.

Incluye **lo que no funcionó**: un intento descartado documentado ahorra que la próxima sesión lo
repita.

## Archivos revisados

Los que hubo que leer para entender el problema (no solo los modificados). Le ahorra a la siguiente
sesión el trabajo de re-descubrir dónde está lo relevante.

-

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| | |

## Comandos ejecutados y resultados

```
clj -M:test        → 
npx shadow-cljs release app → 
npm run build:css  → 
graphify update .  → 
```

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| | | |

Si no hubo decisiones, escribe "Ninguna".

## Riesgos identificados

| Riesgo | Severidad | Registrado en |
|--------|-----------|---------------|
| | | RISKS R-NN |

## Bloqueos

Qué impidió avanzar, de qué tipo (técnico / acceso / decisión / humano) y quién puede desbloquearlo.

## Preguntas abiertas nuevas

| Pregunta | Registrada en |
|----------|---------------|
| | OPEN_QUESTIONS Q-NN |

## Supuestos aplicados

Si hubo que asumir algo para avanzar, dilo aquí y regístralo en `ASSUMPTIONS.md`.

## Próximos pasos

En orden de ejecución recomendado, con la tarea del backlog asociada.

1.
2.

## Pendientes

Lo que quedó a medias y qué falta exactamente para terminarlo. Sé específico: "falta correr los tests"
es útil; "falta terminar" no.

## Actualizaciones requeridas en Project Memory

Marca lo que **ya hiciste** en esta sesión; deja sin marcar lo que quedó pendiente y anótalo también en
"Pendientes".

- [ ] `project-memory/CURRENT_STATUS.md`
- [ ] `project-memory/BACKLOG.md`
- [ ] `project-memory/RISKS.md`
- [ ] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-0NN-….md` (nuevo)
- [ ] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md`
- [ ] `project-memory/REQUIREMENTS.md`
- [ ] `project-memory/OPEN_QUESTIONS.md`
- [ ] `project-memory/ASSUMPTIONS.md`
- [ ] `project-memory/LESSONS_LEARNED.md`
- [ ] `project-memory/TERMINOLOGY.md`
- [ ] `project-memory/graph/` (snapshot de Graphify)

## Notas

Cualquier cosa que la próxima sesión agradecería saber y que no encaja arriba.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
`../prompts/session-close-memory-update.md`
