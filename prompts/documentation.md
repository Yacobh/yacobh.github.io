# Prompt: documentación

Para escribir o actualizar documentación del proyecto: memoria PMF, ADRs, `supabase/SCHEMA.md`,
`docs/` o el copy público.

---

## Prompt

```
Documentación a trabajar: <QUÉ Y POR QUÉ>

Antes de escribir:
1. Lee project-memory/AGENT_INSTRUCTIONS.md §4 (reglas de documentación) y §8 (ADRs).
2. Lee project-memory/INDEX.md para ubicar dónde corresponde el contenido.
3. Verifica si el hecho ya está documentado en otro archivo: un hecho, un archivo.
4. Revisa OPEN_QUESTIONS.md: puede que lo que vas a afirmar esté marcado como incierto.

Entrega:

1. En qué archivo va y por qué ese y no otro
2. El contenido, con evidencia (ruta de archivo, commit, tabla) para cada afirmación técnica
3. Qué enlaces [[…]] hay que agregar y desde dónde
4. Qué contenido existente queda obsoleto y cómo marcarlo (sin borrarlo)
5. Qué no pudiste evidenciar, marcado como supuesto o como pregunta abierta

No inventes datos.
No borres contexto histórico: márcalo.
Si detectas una contradicción con otro documento, regístrala en OPEN_QUESTIONS.md.
```

---

## Notas

### Dónde va cada cosa

| Contenido | Archivo |
|-----------|---------|
| Qué es el proyecto, alcance, exclusiones | `project-memory/PROJECT_BRIEF.md` |
| Negocio, stakeholders, métricas, copy oficial | `BUSINESS_CONTEXT.md` |
| Requisitos y criterios de aceptación | `REQUIREMENTS.md` |
| Cómo está construido, flujos, seguridad | `ARCHITECTURE.md` |
| Versiones, comandos, estructura de `src/` | `TECH_STACK.md` |
| Estado de **hoy**, bloqueos, próximo paso | `CURRENT_STATUS.md` |
| Fases y hitos | `ROADMAP.md` |
| Tareas con criterios de terminado | `BACKLOG.md` |
| Riesgos con impacto/probabilidad/mitigación | `RISKS.md` |
| Una decisión con consecuencias | **ADR** en `adr/` + fila en `DECISIONS.md` |
| Una decisión menor | `DECISIONS.md` §2 |
| Algo que no sabemos | `OPEN_QUESTIONS.md` |
| Algo que damos por cierto sin verificar | `ASSUMPTIONS.md` |
| Un término del dominio o del código | `TERMINOLOGY.md` |
| Una trampa ya pisada | `LESSONS_LEARNED.md` |
| Reglas para agentes | `AGENT_INSTRUCTIONS.md` |
| Esquema de base de datos y orden de migraciones | `supabase/SCHEMA.md` |
| Guía de contenido pedagógico | `supabase/CONTENT.md` |
| Procedimientos operativos, diagramas, consultas | `docs/` |
| Bitácora de una sesión | `sessions/SESSION-XXX.md` |

### Reglas de estilo de esta memoria

1. **Un hecho, un archivo.** Si estás copiando un párrafo, enlaza en su lugar.
2. **Evidencia siempre:** ruta de archivo, commit o tabla. Lo que no puedas evidenciar va marcado como
   supuesto o pregunta.
3. **Fechas absolutas** (`2026-07-26`), nunca relativas.
4. **Enlaces `[[ARCHIVO]]`**; para otras carpetas, `[[../adr/ADR-001-…]]`. Las rutas de código van en
   backticks (`src/universo/profile.cljs`), no como wikilink.
5. **No borres lo desactualizado: márcalo** (`✅ resuelto 2026-MM-DD`, `⛔ obsoleto`).
6. **Español**, nombres de archivo sin acentos ni espacios.
7. **Sé concreto.** "El diagnóstico para cuando `n ≥ 5` y `SE ≤ 0,35`" vale; "el diagnóstico para
   cuando hay suficiente precisión" no.
8. **Nada exclusivo de Obsidian** en el contenido (sin embeds de bloque, sin Dataview): un agente lee
   Markdown crudo.

### ADRs

Un ADR es **inmutable**. Se crea desde `adr/ADR-TEMPLATE.md`, se numera consecutivamente sin reutilizar
números, y si la decisión cambia se **reemplaza** con uno nuevo marcando el anterior como
`Reemplazada por ADR-0NN`. Nunca se edita para cambiar la decisión.

Si documentas una decisión **retroactiva**, dilo explícitamente y marca el contexto como reconstruido
(los nueve primeros ADRs de este repositorio lo hacen).

### Copy público: es documentación **y** requisito

La landing, la FAQ y el JSON-LD viven en **tres lugares** (`index.html`, `public/index.html`,
`src/universo/components/landing.cljs`). Si cambias un texto, cámbialo en los tres en el mismo commit
(L-22, R-05).

Y recuerda: **cada afirmación pública es un requisito verificable** (L-20). Hoy hay dos incumplidas
(X-01: el tiempo de respuesta no influye en la estimación; X-02: no hay histórico del diagnóstico). No
añadas una tercera; el respaldo institucional UNAP hace que las afirmaciones deban ser defendibles.

### Al terminar

Actualiza `INDEX.md` si creaste un documento nuevo, y verifica que los enlaces `[[…]]` apunten a
archivos que existen.
