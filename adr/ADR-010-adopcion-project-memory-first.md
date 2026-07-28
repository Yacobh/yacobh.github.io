# ADR-010: Adopción de Project Memory First (Markdown + Git como fuente de verdad)

## Estado

Aprobada

## Fecha

2026-07-26

## Contexto

Este es el **único ADR no retroactivo**: documenta una decisión tomada hoy.

Situación previa a esta decisión:

- La documentación del proyecto era **`PROJECT_SUMMARY.md`** (un archivo) más `README.md` (cuatro
  comandos), `supabase/SCHEMA.md` y `supabase/CONTENT.md`. Los dos últimos son buenos, pero cubren solo
  la base de datos y el contenido.
- `PROJECT_SUMMARY.md` estaba **parcialmente desactualizado**: describe una estructura de módulos previa
  al MVP y presenta como parte del producto namespaces que hoy no son alcanzables desde `core.cljs`
  (`jardin`, `voz`, `physics`).
- **Cero registro de decisiones.** Diez decisiones estructurales estaban tomadas de facto en el código
  (el modelo IRT y sus salvaguardas, el bundle versionado, RLS como único control, cohortes por banda,
  el outbox de email…) sin ninguna explicación de por qué, qué se descartó ni qué costos se aceptaron.
- **Cero registro de riesgos, supuestos y preguntas abiertas.** Cosas que el owner sabía —que se
  desarrolla contra producción, que las dificultades quizá no están calibradas, que falta contenido—
  vivían solo en su cabeza o en conversaciones con asistentes de IA.
- **El conocimiento estaba atado a chats.** Cada sesión nueva de IA empezaba re-descubriendo el
  proyecto: leyendo código, ejecutando greps, reconstruyendo el modelo mental. Y las conclusiones de
  esa sesión se perdían al cerrarla.
- **Bus factor = 1** (R-01), lo que convierte la ausencia de memoria escrita en un riesgo existencial,
  no en una molestia.

El proyecto tiene además tres herramientas ya presentes que necesitaban una jerarquía clara:
`CLAUDE.md` (para agentes), Graphify (grafo del repositorio, con hooks que lo imponen) y la posibilidad
de usar Obsidian para navegar.

## Decisión

Se adopta **Project Memory First (PMF)** como metodología del proyecto, con esta jerarquía de
autoridad:

```
1. Markdown versionado en Git        ← ÚNICA fuente de verdad
2. Claude Code CLI                     agente de ejecución técnica
3. Obsidian                            interfaz humana de navegación
4. Graphify                            herramienta de análisis del repositorio
```

**Estructura creada:**

```
CLAUDE.md                    punto de entrada de agentes; apunta a la memoria
project-memory/
  INDEX  HANDOFF  PROJECT_BRIEF  BUSINESS_CONTEXT  REQUIREMENTS  TECH_STACK
  ARCHITECTURE  CURRENT_STATUS  ROADMAP  BACKLOG  RISKS  DECISIONS
  OPEN_QUESTIONS  ASSUMPTIONS  DEPENDENCIES  TERMINOLOGY  LESSONS_LEARNED
  AGENT_INSTRUCTIONS  OBSIDIAN_WORKSPACE_GUIDE  GRAPHIFY_INTEGRATION_GUIDE
  graph/                     snapshot versionado de Graphify
adr/                         decisiones con contexto, alternativas y consecuencias
sessions/                    bitácora por sesión (+ plantilla)
prompts/                     prompts reutilizables por tipo de tarea
docs/                        documentación complementaria y diagramas
```

**Reglas de gobernanza** (las 15 reglas están en [[../project-memory/AGENT_INSTRUCTIONS]]). Las cinco
que definen la metodología:

1. La fuente de verdad es Markdown en Git. Obsidian y Graphify son capas complementarias.
2. Toda decisión relevante se registra en `DECISIONS.md` o en un ADR.
3. Toda sesión relevante genera o actualiza un `SESSION-XXX.md` y actualiza `CURRENT_STATUS.md`.
4. **Si falta información, no se asume: se registra en `OPEN_QUESTIONS.md`.**
5. Un agente lee `CLAUDE.md`, `HANDOFF.md`, `CURRENT_STATUS.md`, `ARCHITECTURE.md` y `DECISIONS.md`
   antes de modificar código.

**Criterio de terminado ampliado:** una tarea no está terminada hasta que la memoria refleja su
efecto.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Seguir con `PROJECT_SUMMARY.md`** | Un solo archivo no distingue estado (cambia cada semana) de decisiones (inmutables) de riesgos (evolucionan). Se desactualiza como conjunto y deja de ser confiable, que es exactamente lo que pasó |
| **Wiki de GitHub** | No está en el repositorio: no se versiona con el código, no aparece en los diffs, no se puede editar offline y un agente de IA no la lee al clonar |
| **Notion / Confluence** | Buena experiencia de edición, pero fuera de Git: sin diffs, sin ramas, con vendor lock-in y sin acceso directo para agentes locales |
| **Obsidian como fuente de verdad** | Obsidian **son** archivos Markdown, así que sería PMF con otro nombre; el riesgo es depender de features exclusivas (Dataview, embeds de bloque) que hacen los archivos ilegibles fuera de la app. Se conserva Obsidian como **vista** (regla 2) |
| **Solo `CLAUDE.md` extenso** | Un archivo enorme se vuelve inmanejable, mezcla estado con decisiones y sirve solo al agente: un humano no navega ahí, y un ADR necesita ser inmutable mientras `CLAUDE.md` cambia |
| **Graphify / documentación autogenerada** | El grafo describe **qué** hay, nunca **por qué** se decidió ni qué se descartó. Además se regenera (borra el anterior) y en este repositorio **no indexa `.cljs`** (R-20). No puede ser memoria |
| **Docstrings y comentarios en el código** | Necesarios y presentes, pero no expresan estado del proyecto, riesgos, roadmap ni contexto de negocio. Un comentario no dice "esto está bloqueado por falta de contenido" |

## Consecuencias

**Positivas**

- **Una sesión nueva (humana o IA) puede continuar el proyecto sin el historial de chats.** Esa es la
  mitigación principal de R-01, el riesgo mayor del proyecto.
- **La memoria se versiona con el código:** un `git log` muestra la evolución del entendimiento junto a
  la del sistema; un `git blame` sobre `DECISIONS.md` dice cuándo se decidió algo.
- **Los ADRs preservan el *por qué*.** Sin ellos, un futuro mantenedor vería `max-theta-step = 0.4` como
  un número arbitrario y lo "optimizaría", rompiendo la experiencia del diagnóstico.
- **Lo que no se sabe queda explícito.** Al documentar aparecieron 20 preguntas abiertas y 7
  contradicciones reales (copy que promete lo que el código no hace, versiones desalineadas, un
  `.gitignore` que ignora un archivo trackeado). Eran problemas ya existentes, invisibles.
- **Los riesgos son gestionables porque están escritos**, con impacto, probabilidad y mitigación.
- **La jerarquía de herramientas evita el conflicto de fuentes**: nadie tiene que preguntarse si manda
  el grafo, la wiki o el código.
- **Costo cero:** son archivos de texto en un repositorio que ya existe.

**Negativas / costos aceptados**

- **Costo de mantenimiento continuo.** Cada sesión relevante debe actualizar la memoria. Si se
  abandona, la memoria se vuelve activamente **dañina**: documentación desactualizada es peor que no
  tener documentación, porque se cree.
- **~20 archivos nuevos** que revisar en cada cambio grande. Hay riesgo real de actualizar
  `CURRENT_STATUS` y olvidar `BACKLOG`.
- **Duplicación inevitable:** el estado de una tarea aparece en `BACKLOG` y en `CURRENT_STATUS`; un
  riesgo aparece en `RISKS` y en el ADR que lo genera. Mitigado con enlaces y con la regla "un hecho,
  un archivo", pero no eliminado.
- **Parte del contenido es reconstrucción, no testimonio.** Nueve de los diez ADRs documentan
  decisiones retroactivamente: el contexto está inferido del código y de los commits. Están marcados
  como tales, pero pueden atribuir razones que no fueron las reales (A-25, Q-14).
- **`PROJECT_SUMMARY.md` queda en conflicto** con la memoria nueva hasta que se resuelva (T-33, X-07).
- **Sobrecarga para cambios triviales:** arreglar un typo no necesita un session log. La regla dice
  "sesión relevante", y eso exige criterio.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| La memoria se abandona y se desactualiza | `prompts/session-close-memory-update.md` como rutina de cierre; checklist en `AGENT_INSTRUCTIONS` §11; regla recurrente T-30 | A-26 |
| Documentos contradictorios entre sí | Regla "un hecho, un archivo" + precedencia explícita (`AGENT_INSTRUCTIONS` §1.5) + `OPEN_QUESTIONS` §Contradicciones | — |
| Los ADRs retroactivos atribuyen razones equivocadas | Marcados explícitamente como reconstruidos; Q-14 pide validación del owner | A-25 |
| El agente no lee la memoria y trabaja a ciegas | `CLAUDE.md` §12 define el orden de lectura; `prompts/session-bootstrap.md` lo impone; el session log debe citar la memoria | A-26 |
| Sobrecarga que desincentive documentar | Plantillas y prompts listos; distinción entre sesión relevante y cambio trivial | — |

## Seguimiento

**Indicador de que PMF funciona:** una sesión nueva puede responder "¿qué hago ahora y por qué?" leyendo
solo `HANDOFF.md` y `CURRENT_STATUS.md`, sin explorar el código.

**Indicadores de que está fallando:**

- `CURRENT_STATUS.md` con fecha de más de un mes mientras hay commits nuevos.
- Un ADR que hubo que editar en lugar de reemplazar.
- Una decisión relevante tomada sin registro.
- Un `SESSION-XXX.md` que no cita ningún documento de la memoria.
- El snapshot de `graph/` apuntando a un commit muy anterior a `HEAD`.

**Revisiones pendientes:**

1. **Q-14:** el owner valida o corrige la reconstrucción histórica (fases y ADRs retroactivos).
2. **T-33:** resolver el conflicto con `PROJECT_SUMMARY.md`.
3. Al mes de uso: evaluar si algún documento no se está usando (candidato a fusionar) o si falta alguno.

**Cuándo reconsiderar:** si el proyecto incorpora un equipo con herramientas propias de gestión
(Jira, Linear), habrá que decidir qué vive ahí y qué en la memoria — probablemente el *trabajo* fuera y
el *conocimiento* dentro. Eso requeriría un ADR nuevo, no una edición de este.

---

Relacionado: [[../project-memory/INDEX]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../project-memory/OBSIDIAN_WORKSPACE_GUIDE]] · [[../project-memory/GRAPHIFY_INTEGRATION_GUIDE]] ·
[[../project-memory/RISKS]] R-01 · `../sessions/SESSION-001.md`
