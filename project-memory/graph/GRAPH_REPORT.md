# Graph Report - .  (2026-07-27)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 769 nodes · 997 edges · 58 communities (56 shown, 2 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `48bf5254`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- Schema Supabase — Academia Integral MVP
- app.js
- BACKLOG
- ClojureScript y shadow-cljs
- ARCHITECTURE
- Técnicas
- Avatar Profesor Matemáticas (página de descarga SVG)
- graphify-out Knowledge Graph Artifacts
- Detalle
- 1. Requerimientos funcionales
- Graph Report - .  (2026-07-26)
- SESSION-001
- SESSION-002
- SESSION-XXX
- ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión
- OBSIDIAN_WORKSPACE_GUIDE
- ROADMAP
- GRAPHIFY_INTEGRATION_GUIDE
- AGENT_INSTRUCTIONS
- HANDOFF
- ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos
- PROJECT_BRIEF
- DEPENDENCIES
- Notas
- Notas
- CURRENT_STATUS
- TECH_STACK
- Notas
- Notas
- ADR-001: ClojureScript + re-frame + shadow-cljs como stack de frontend
- ADR-002: Supabase como único backend y RLS como límite de seguridad
- ADR-003: GitHub Pages con el bundle compilado versionado en Git
- ADR-005: El contenido pedagógico vive en el banco de ítems (capa 0), no en un CMS
- ADR-007: Email de cohorte por tabla outbox + Edge Function con Resend
- ADR-008: Archivar MathAcademy y mantener un funnel único
- ADR-009: Las reglas de negocio viven en namespaces puros y testeados
- ADR-010: Adopción de Project Memory First (Markdown + Git como fuente de verdad)
- ADR-XXX: Título de la Decisión
- BUSINESS_CONTEXT
- INDEX — Project Memory (Academia Integral)
- prompts/README.md
- Notas
- Notas
- Notas
- ASSUMPTIONS
- RTK_INTEGRATION_GUIDE
- Notas
- project-memory/graph/
- TERMINOLOGY
- Notas para quien use este prompt
- docs/
- DECISIONS
- prompts/

## God Nodes (most connected - your core abstractions)
1. `Detalle` - 23 edges
2. `SESSION-001` - 18 edges
3. `SESSION-002` - 18 edges
4. `SESSION-XXX` - 18 edges
5. `Schema Supabase — Academia Integral MVP` - 16 edges
6. `ROADMAP` - 15 edges
7. `GRAPHIFY_INTEGRATION_GUIDE` - 14 edges
8. `AGENT_INSTRUCTIONS` - 13 edges
9. `HANDOFF` - 13 edges
10. `ARCHITECTURE` - 12 edges

## Surprising Connections (you probably didn't know these)
- `Icono PWA 192×192 — edificio clásico con columnas (logo Academia Integral)` --references--> `Academia Integral (EducationalOrganization)`  [INFERRED]
  public/android-chrome-192x192.png → index.html
- `Icono PWA / imagen Open Graph 512×512 — edificio clásico con columnas` --references--> `Academia Integral (EducationalOrganization)`  [INFERRED]
  public/android-chrome-512x512.png → index.html
- `index.html — Landing PAES Matemática 1` --references--> `Supabase Backend (PostgreSQL, auth, realtime)`  [INFERRED]
  index.html → PROJECT_SUMMARY.md
- `index.html — Landing PAES Matemática 1` --references--> `Icono PWA / imagen Open Graph 512×512 — edificio clásico con columnas`  [EXTRACTED]
  index.html → public/android-chrome-512x512.png
- `index.html — Landing PAES Matemática 1` --references--> `Apple touch icon 180×180 — edificio clásico con columnas`  [EXTRACTED]
  index.html → public/apple-touch-icon.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Funnel MVP: diagnóstico → perfil → plan → cupos → inscripción → notificación** — project_summary_funnel_mvp, supabase_schema_questions, supabase_schema_student_profiles, supabase_schema_resources, supabase_schema_class_slots, supabase_schema_enrollments, supabase_schema_notifications [EXTRACTED 0.90]
- **Pipeline de email de cohorte (confirmación → outbox → Resend)** — supabase_functions_readme_confirmation_flow, supabase_schema_class_slots, supabase_schema_notifications, supabase_schema_email_outbox, supabase_functions_readme_send_enrollment_emails [EXTRACTED 0.90]
- **Set de iconos de marca referenciados por los landings** — public_android_chrome_192x192, public_android_chrome_512x512, public_apple_touch_icon, public_favicon_16x16, public_favicon_32x32, index, public_index [EXTRACTED 0.85]

## Communities (58 total, 2 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.05
Nodes (37): autoprefixer, katex, author, bugs, url, dependencies, katex, react (+29 more)

### Community 1 - "Schema Supabase — Academia Integral MVP"
Cohesion: 0.09
Nodes (45): index.html — Landing PAES Matemática 1, Academia Integral (EducationalOrganization), Curso: Preparación PAES Matemática 1, FAQ del Diagnóstico Adaptativo (costo, calculadora, repetición, cupos), JSON-LD Structured Data (@graph: Organization, Course, FAQPage), Universo Project Summary, Carga de Contenido por Admin (Recursos y Cupos), Funnel MVP Operable (Login → Diagnóstico → Perfil → Plan → Cupos → Inscripción) (+37 more)

### Community 2 - "app.js"
Cohesion: 0.19
Nodes (9): evalFetch(), fetch(), fetchInOwnScriptThenLoad(), load(), loadPending(), FIXME: need to handle relative paths, FIXME: not sure if fetch provides any benefit over xhr, FIXME: check status (+1 more)

### Community 3 - "BACKLOG"
Cohesion: 0.05
Nodes (42): BACKLOG, Resumen por prioridad, T-01 · Publicar contenido mínimo por módulo prioritario — **P0** · `bloqueado` (humano), T-02 · Cerrar el pipeline de email de cohorte — **P0** · `bloqueado` (acceso), T-03 · Verificar control de capacidad en la inscripción — **P0** · `abierto`, T-04 · Publicar cupos reales y retirar los demo — **P0** · `bloqueado` (negocio), T-05 · Router de URL con history API — **P1** · `abierto`, T-06 · CI mínima con GitHub Actions — **P1** · `abierto` (+34 more)

### Community 5 - "ClojureScript y shadow-cljs"
Cohesion: 0.06
Nodes (35): ClojureScript y shadow-cljs, IRT y dominio, L-01 · El namespace debe coincidir con la ruta del archivo, L-02 · Un efecto de re-frame recibe **un solo** argumento, L-03 · Un `reg-event-*` en un namespace que nadie requiere **no existe**, L-04 · Warnings `:infer-warning` en `events/auth.cljs` son conocidos y benignos, L-05 · No editar `public/js/app.js` a mano, L-06 · Una clase de Tailwind nueva no existe en producción sin rebuild de CSS (+27 more)

### Community 6 - "ARCHITECTURE"
Cohesion: 0.07
Nodes (30): 10. Riesgos arquitectónicos, 11. Relación con Graphify, 1. Arquitectura general, 2.1 Núcleo de la aplicación, 2.2 Motor IRT (el corazón del producto), 2.3 Perfil, plan y cupos, 2.4 Panel de administración, 2.5 Acceso a datos (+22 more)

### Community 7 - "Técnicas"
Cohesion: 0.08
Nodes (26): Contradicciones detectadas (regla de gobernanza 14), Dominio (IRT y contenido), OPEN_QUESTIONS, Preguntas respondidas, Proceso, Producto y negocio, 🟠 Q-01 · ¿Cuál es el vínculo formal con la UNAP?, 🔴 Q-02 · ¿Las clases de los cupos tienen costo? (+18 more)

### Community 13 - "Detalle"
Cohesion: 0.08
Nodes (26): Detalle, R-01 · Bus factor = 1, R-02 · Desarrollo contra la base de producción, R-03 · Sin respaldo propio verificado, R-04 · Sin CI, R-05 · Divergencia del copy y del JSON-LD, R-06 · Datos personales de menores sin aviso de privacidad, R-07 · Monolitos (+18 more)

### Community 14 - "1. Requerimientos funcionales"
Cohesion: 0.08
Nodes (25): 1. Requerimientos funcionales, 2. Requerimientos no funcionales, 3. Reglas de negocio, 4. Casos de uso, 5. Restricciones, 6. Criterios de aceptación (por área), 7. Información faltante, CU-01 — Estudiante nuevo obtiene su plan (+17 more)

### Community 15 - "Graph Report - .  (2026-07-26)"
Cohesion: 0.10
Nodes (20): Communities (13 total, 2 thin omitted), Community 0 - "Community 0", Community 1 - "Community 1", Community 2 - "Community 2", Community 3 - "Community 3", Community 4 - "Community 4", Community 5 - "Community 5", Community 6 - "Community 6" (+12 more)

### Community 16 - "SESSION-001"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 17 - "SESSION-002"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 18 - "SESSION-XXX"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 19 - "ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión"
Cohesion: 0.13
Nodes (15): ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión, Alternativas Evaluadas, Bandas, Consecuencias, Contexto, Decisión, Estado, Estimación (+7 more)

### Community 20 - "OBSIDIAN_WORKSPACE_GUIDE"
Cohesion: 0.13
Nodes (15): 10. Cómo se relaciona esto con Graphify, 1. Qué aporta Obsidian aquí (y qué no), 2. Qué abrir como Vault, 3. Excluir el código del Vault, 4. Convenciones de enlaces, 5. Cómo trabajar día a día, 6. Plugins: uso moderado, 7. Reglas para evitar dependencia excesiva de Obsidian (+7 more)

### Community 21 - "ROADMAP"
Cohesion: 0.13
Nodes (15): F0 — Base técnica ✅, F10 — Medición, F11 — Escala pedagógica (propuesta, sin confirmar), F1 — Motor IRT ✅, F2 — Perfil y plan 🟡 95 %, F3 — Cohortes 🟡 95 %, F4 — Panel de administración ✅, F5 — Email de cohorte ⚠️ 60 % (+7 more)

### Community 22 - "GRAPHIFY_INTEGRATION_GUIDE"
Cohesion: 0.14
Nodes (14): 10. Graphify para onboarding técnico, 11. Graphify para revisión de impacto antes de modificar código, 12. Cómo evitar que Graphify reemplace la documentación oficial, 13. Mantenimiento, 1. Qué es y qué produce, 2. Dónde viven los artefactos, 3. Cuándo ejecutar Graphify, 4. Comandos útiles (+6 more)

### Community 23 - "AGENT_INSTRUCTIONS"
Cohesion: 0.15
Nodes (13): 0. Regla fundamental: Project Memory First, 10. Reglas específicas de este repositorio, 11. Checklist de cierre de sesión, 1. Reglas generales, 2. Antes de modificar código, 3. Antes de modificar infraestructura o base de datos, 4. Reglas de documentación, 5. Reglas de testing (+5 more)

### Community 24 - "HANDOFF"
Cohesion: 0.15
Nodes (13): Business Goals, Completed Work, Critical Decisions, Current State, Executive Summary, Functional Scope, HANDOFF, Immediate Next Steps (+5 more)

### Community 25 - "ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos"
Cohesion: 0.17
Nodes (12): ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos, Agrupación por banda de θ, Alternativas Evaluadas, Confirmación por mínimo de inscritos, Consecuencias, Contexto, Decisión, Estado (+4 more)

### Community 26 - "PROJECT_BRIEF"
Cohesion: 0.17
Nodes (12): 1. Nombre del proyecto, 2. Descripción, 3. Objetivo general, 4. Problema que resuelve, 5. Alcance (en el MVP actual), 6. Exclusiones (fuera de alcance, decidido), 7. Stakeholders, 8. Criterios de éxito (+4 more)

### Community 27 - "DEPENDENCIES"
Cohesion: 0.18
Nodes (11): 1. Dependencias externas (servicios), 2. Dependencias de librería, 3. Dependencias internas (acoplamientos), 4. Dependencias humanas y organizacionales, 5. Orden de arranque de un entorno nuevo, 6. Actualización de dependencias, Clojure / ClojureScript (`deps.edn`, `shadow-cljs.edn`), DEPENDENCIES (+3 more)

### Community 28 - "Notas"
Cohesion: 0.18
Nodes (10): Al terminar, Checklist previo, Estado actual a resolver antes de publicar, Notas, Procedimiento completo, Prompt, Prompt: despliegue, Reversión (+2 more)

### Community 29 - "Notas"
Cohesion: 0.18
Nodes (10): Al terminar, Casos borde que este dominio exige, Cómo funciona la suite, Idea pendiente, Notas, Prompt, Prompt: testing, Qué está cubierto hoy (+2 more)

### Community 30 - "CURRENT_STATUS"
Cohesion: 0.20
Nodes (10): 1. Estado general, 2. Avance por fase, 3. Checklist de go-live, 4. Últimos cambios (historia reciente), 5. Últimas decisiones, 6. Bloqueos, 7. Riesgos activos (top 5), 8. Próximos pasos inmediatos (+2 more)

### Community 31 - "TECH_STACK"
Cohesion: 0.20
Nodes (10): 1. Resumen, 2. Builds (`shadow-cljs.edn`), 3. Comandos, 4. Estructura de `src/`, 5. Tests, 6. Base de datos (Supabase / PostgreSQL), 7. Artefactos y qué se versiona, 8. Configuración de agentes en el repo (+2 more)

### Community 32 - "Notas"
Cohesion: 0.20
Nodes (9): Al terminar, Archivos grandes: entrar con cuidado, Comandos, Estructura mental antes de escribir, Las cinco trampas de este repositorio, Notas, Prompt, Prompt: desarrollo (implementar un cambio de código) (+1 more)

### Community 33 - "Notas"
Cohesion: 0.20
Nodes (9): Al terminar, Antes de cualquier cambio destructivo, Edge Functions, Entornos, Notas, Prompt, Prompt: infraestructura y base de datos, Reglas obligatorias (+1 more)

### Community 34 - "ADR-001: ClojureScript + re-frame + shadow-cljs como stack de frontend"
Cohesion: 0.22
Nodes (9): ADR-001: ClojureScript + re-frame + shadow-cljs como stack de frontend, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 35 - "ADR-002: Supabase como único backend y RLS como límite de seguridad"
Cohesion: 0.22
Nodes (9): ADR-002: Supabase como único backend y RLS como límite de seguridad, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 36 - "ADR-003: GitHub Pages con el bundle compilado versionado en Git"
Cohesion: 0.22
Nodes (9): ADR-003: GitHub Pages con el bundle compilado versionado en Git, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 37 - "ADR-005: El contenido pedagógico vive en el banco de ítems (capa 0), no en un CMS"
Cohesion: 0.22
Nodes (9): ADR-005: El contenido pedagógico vive en el banco de ítems (capa 0), no en un CMS, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 38 - "ADR-007: Email de cohorte por tabla outbox + Edge Function con Resend"
Cohesion: 0.22
Nodes (9): ADR-007: Email de cohorte por tabla outbox + Edge Function con Resend, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 39 - "ADR-008: Archivar MathAcademy y mantener un funnel único"
Cohesion: 0.22
Nodes (9): ADR-008: Archivar MathAcademy y mantener un funnel único, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 40 - "ADR-009: Las reglas de negocio viven en namespaces puros y testeados"
Cohesion: 0.22
Nodes (9): ADR-009: Las reglas de negocio viven en namespaces puros y testeados, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 41 - "ADR-010: Adopción de Project Memory First (Markdown + Git como fuente de verdad)"
Cohesion: 0.22
Nodes (9): ADR-010: Adopción de Project Memory First (Markdown + Git como fuente de verdad), Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 42 - "ADR-XXX: Título de la Decisión"
Cohesion: 0.22
Nodes (9): ADR-XXX: Título de la Decisión, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 43 - "BUSINESS_CONTEXT"
Cohesion: 0.22
Nodes (9): 1. Contexto, 2. Objetivos de negocio, 3. Propuesta de valor, 4. Recorrido del usuario (funnel), 5. Modelo económico, 6. Métricas propuestas (aún no instrumentadas), 7. Restricciones de negocio, 8. Comunicación oficial y mensajes clave (+1 more)

### Community 44 - "INDEX — Project Memory (Academia Integral)"
Cohesion: 0.22
Nodes (9): Ejecución, Empezar aquí, Gobernanza y decisiones, Grafo de relaciones (para Graph View de Obsidian), INDEX — Project Memory (Academia Integral), Negocio y alcance, Para agentes de IA, Para humanos (+1 more)

### Community 45 - "prompts/README.md"
Cohesion: 0.22
Nodes (5): Notas, Prompt, Prompt: discovery / entendimiento, Notas para quien use este prompt, Prompt: arranque de sesión (Project Memory First)

### Community 46 - "Notas"
Cohesion: 0.22
Nodes (8): ADRs, Al terminar, Copy público: es documentación **y** requisito, Dónde va cada cosa, Notas, Prompt, Prompt: documentación, Reglas de estilo de esta memoria

### Community 47 - "Notas"
Cohesion: 0.25
Nodes (7): Al terminar, Checklist de impacto (de `GRAPHIFY_INTEGRATION_GUIDE` §11), Notas, Prompt, Prompt: arquitectura, Restricciones estructurales que no se negocian sin ADR nuevo, Riesgos arquitectónicos ya conocidos

### Community 48 - "Notas"
Cohesion: 0.25
Nodes (7): Al terminar, Disciplina de diagnóstico, Herramientas de diagnóstico, Notas, Prompt, Prompt: troubleshooting, Tabla de diagnóstico rápido

### Community 49 - "ASSUMPTIONS"
Cohesion: 0.29
Nodes (7): ASSUMPTIONS, Los tres supuestos que más importan, Supuestos de dominio (IRT y contenido), Supuestos de negocio, Supuestos de proceso y memoria, Supuestos técnicos, Supuestos validados o refutados

### Community 50 - "RTK_INTEGRATION_GUIDE"
Cohesion: 0.29
Nodes (7): 1. Qué es y qué no es, 2. Qué se instaló y dónde, 3. Cómo verificar que está activo, 4. El filtro propio de este proyecto: `clj-test`, 5. Mantenimiento, 6. Efecto colateral detectado y corregido en esta sesión, RTK_INTEGRATION_GUIDE

### Community 51 - "Notas"
Cohesion: 0.29
Nodes (6): Al terminar, Criterios de aceptación: cómo se ven aquí, Notas, Prompt, Prompt: requisitos, Reglas de este proyecto al escribir requisitos

### Community 52 - "project-memory/graph/"
Cohesion: 0.33
Nodes (6): Cómo refrescar el snapshot, ⚠️ Limitación crítica, Por qué existe esta carpeta, project-memory/graph/, Snapshot actual, Verificar frescura antes de usarlo

### Community 53 - "TERMINOLOGY"
Cohesion: 0.33
Nodes (6): Código y arquitectura, Dominio: educación chilena, Dominio: psicometría e IRT, Metodología y herramientas, Producto, TERMINOLOGY

### Community 54 - "Notas para quien use este prompt"
Cohesion: 0.33
Nodes (6): Checklist de cierre, Errores frecuentes al cerrar, Notas para quien use este prompt, Prompt: cierre de sesión y actualización de memoria, Qué debe pasar, en orden, Regla de fondo

### Community 55 - "docs/"
Cohesion: 0.40
Nodes (4): docs/, Nota sobre `PROJECT_SUMMARY.md`, Qué NO va aquí, Qué va aquí

### Community 56 - "DECISIONS"
Cohesion: 0.40
Nodes (5): 1. Índice de ADRs, 2. Decisiones menores (sin ADR propio), 3. Decisiones pendientes, 4. Cómo registrar una decisión nueva, DECISIONS

### Community 57 - "prompts/"
Cohesion: 0.40
Nodes (5): Advertencia común a todos, Ciclo de una sesión, Cómo usarlos, Por tipo de tarea, prompts/

## Knowledge Gaps
- **552 isolated node(s):** `autoprefixer`, `postcss`, `shadow-cljs`, `tailwindcss`, `@supabase/supabase-js` (+547 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BACKLOG` connect `BACKLOG` to `ARCHITECTURE.md`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `LESSONS_LEARNED` connect `ClojureScript y shadow-cljs` to `ARCHITECTURE.md`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Why does `ARCHITECTURE` connect `ARCHITECTURE` to `ARCHITECTURE.md`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `autoprefixer`, `postcss`, `shadow-cljs` to the rest of the system?**
  _552 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Schema Supabase — Academia Integral MVP` be split into smaller, more focused modules?**
  _Cohesion score 0.08792270531400966 - nodes in this community are weakly interconnected._
- **Should `BACKLOG` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._