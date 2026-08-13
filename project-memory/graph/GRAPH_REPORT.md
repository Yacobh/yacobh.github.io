# Graph Report - yacobh.github.io  (2026-08-13)

## Corpus Check
- 157 files · ~780,263 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 2708 nodes · 6884 edges · 180 communities (154 shown, 26 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 817 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `280aa384`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- C
- t
- app.js
- Communities (142 total, 27 thin omitted)
- Épica E2 — Endurecimiento (F9)
- SESSION-004
- C
- package.json
- SESSION-006
- SESSION-007
- Proceso y agentes de IA
- admin_rls.sql
- ARCHITECTURE
- Universo - Plataforma de Evaluación Adaptativa
- Producto y negocio
- 001_mvp_schema.sql
- 005_email_outbox.sql
- guestbook_tri_state.sql
- BACKLOG.md
- Detalle
- 1. Requerimientos funcionales
- 007_questions_admin_rls.sql
- VISION_LIBRO_PROYECTO
- 010_profile_name_phone.sql
- 013_profile_contact_preference.sql
- 016_contacto_admin.sql
- 017_contacto_alternativas.sql
- SESSION-001
- SESSION-002
- SESSION-XXX
- ADR-012: Tema oscuro mediante mapeo global de CSS, no `dark:` por elemento
- ADR-014: El tiempo de respuesta es un eje separado de θ, no un término dentro del modelo 1PL
- CLAUDE.md — Academia Integral (repo `yacobh.github.io`)
- ROADMAP
- ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión
- OBSIDIAN_WORKSPACE_GUIDE
- GRAPHIFY_INTEGRATION_GUIDE
- AGENT_INSTRUCTIONS
- HANDOFF
- ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos
- Graph Report - .  (2026-08-09)
- PROJECT_BRIEF
- DEPENDENCIES
- Notas
- Notas
- BUSINESS_CONTEXT
- CURRENT_STATUS
- TECH_STACK
- Notas
- Notas
- Schema Supabase — Academia Integral MVP
- ADR-001: ClojureScript + re-frame + shadow-cljs como stack de frontend
- ADR-002: Supabase como único backend y RLS como límite de seguridad
- ADR-003: GitHub Pages con el bundle compilado versionado en Git
- ADR-005: El contenido pedagógico vive en el banco de ítems (capa 0), no en un CMS
- ADR-007: Email de cohorte por tabla outbox + Edge Function con Resend
- ADR-008: Archivar MathAcademy y mantener un funnel único
- ADR-009: Las reglas de negocio viven en namespaces puros y testeados
- ADR-010: Adopción de Project Memory First (Markdown + Git como fuente de verdad)
- ADR-XXX: Título de la Decisión
- INDEX — Project Memory (Academia Integral)
- Notas
- ADR-011: La visión del "Libro del Proyecto" es el norte estratégico; el MVP es una fase intermedia
- Notas
- SESSION-009
- ADR-015: El cliente no lee `questions` directamente; el ítem viaja sin su respuesta y la corrección ocurre en el servidor
- SESSION-008
- H
- ASSUMPTIONS
- t
- Contenido pedagógico (capa 0 + Baldor)
- `send-enrollment-emails`
- ADR-013: Configuración de parada por banco de preguntas y prerequisitos de tests
- kf
- v
- README.md
- Épica E4 — Producto y experiencia
- K
- u
- ARCHIVE.md
- N
- ae
- tailwind.config.js
- htmlBuilder
- .then
- I
- jc
- .M
- .S
- B
- w
- A
- SESSION-005
- Épica E1 — Go-live real (F8)
- Épica E3 — Deuda técnica y limpieza
- cc
- SESSION-011
- BACKLOG
- public.test_configs
- 021_tests_topic_theta_rls.sql
- Épica E5 — Contenido y calidad pedagógica
- Épica E7 — Memoria del proyecto (PMF)
- 022_test_config_display_name.sql
- K
- prompts/
- t
- ADR-016: La IA produce contenido en el pipeline de autoría, nunca en runtime
- m
- 027_misconceptions.sql
- u
- SESSION-010
- B
- yc
- I
- Me
- SESSION-020
- ADR-017: `questions.topic` se mantiene canónico por trigger, no por convención ni por check
- 029_topic_normalization.sql
- 028_test_config_min_response_seconds.sql
- E
- N
- kd
- A
- .setAttribute
- 032_min_response_seconds_calibrado.sql
- Ra
- SESSION-022
- Kg
- SESSION-023
- ba
- to
- ed
- ADR-020: La identidad visual se define con tokens de Tailwind, redefiniendo el vocabulario existente
- ADR-021: La línea del tiempo histórica es el eje del tablero, y las medallas se derivan de `tests`
- .contains
- audit_dark_theme.py
- handler
- audit_contraste.py
- rg
- ._getUrlForProvider
- 042_modules_historical_timeline.sql
- ADR-023: Panel de instrumento — la física está en los controles, no en la superficie
- mathmlBuilder
- ._leaveOpenTopic
- revisar
- 043_site_settings.sql
- 2. Lo que hay que sincerar sobre el alcance

## God Nodes (most connected - your core abstractions)
1. `v()` - 228 edges
2. `K()` - 135 edges
3. `H()` - 130 edges
4. `Communities (187 total, 30 thin omitted)` - 125 edges
5. `C()` - 124 edges
6. `w()` - 123 edges
7. `ge()` - 90 edges
8. `t()` - 77 edges
9. `m()` - 73 edges
10. `y()` - 72 edges

## Surprising Connections (you probably didn't know these)
- `K()` --indirect_call--> `Ka()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 102 → community 2_
- `K()` --indirect_call--> `ua()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 102 → community 107_
- `K()` --indirect_call--> `y()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 102 → community 93_
- `K()` --indirect_call--> `z()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 102 → community 104_
- `w()` --indirect_call--> `v()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 104 → community 93_

## Import Cycles
- None detected.

## Communities (180 total, 26 thin omitted)

### Community 0 - "C"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 1 - "t"
Cohesion: 0.25
Nodes (7): Al terminar, Checklist de impacto (de `GRAPHIFY_INTEGRATION_GUIDE` §11), Notas, Prompt, Prompt: arquitectura, Restricciones estructurales que no se negocian sin ADR nuevo, Riesgos arquitectónicos ya conocidos

### Community 2 - "app.js"
Cohesion: 0.09
Nodes (4): D(), ia(), Ka(), sa()

### Community 3 - "Communities (142 total, 27 thin omitted)"
Cohesion: 0.02
Nodes (125): Communities (187 total, 30 thin omitted), Community 0 - "C", Community 103 - "I", Community 104 - "jc", Community 105 - ".M", Community 106 - ".S", Community 107 - "B", Community 108 - "w" (+117 more)

### Community 4 - "Épica E2 — Endurecimiento (F9)"
Cohesion: 0.15
Nodes (13): T-06 · CI mínima con GitHub Actions — **P1** · `hecho` (2026-08-03, sin verificar en vivo), T-07 · Respaldo de la base de datos documentado y probado — **P1** · `abierto`, T-09 · Proyecto Supabase de desarrollo (staging) — **P1** · `abierto`, T-10 · Publicar aviso de privacidad y revisar la recolección de datos — **P1** · `en curso`, T-11 · Verificación automatizada de policies RLS — **P2** · `abierto`, T-12 · Resolver la duplicación de `index.html` — **P1** · `abierto`, T-13 · Alinear versiones de shadow-cljs y KaTeX — **P2** · `hecho` (2026-08-09), T-14 · Arreglar `npm test` — **P3** · `hecho` (2026-08-03) (+5 more)

### Community 5 - "SESSION-004"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 6 - "C"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 7 - "package.json"
Cohesion: 0.05
Nodes (37): autoprefixer, katex, author, bugs, url, dependencies, katex, react (+29 more)

### Community 8 - "SESSION-006"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 9 - "SESSION-007"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 10 - "Proceso y agentes de IA"
Cohesion: 0.04
Nodes (47): ClojureScript y shadow-cljs, CSS y Tailwind, IRT y dominio, L-01 · El namespace debe coincidir con la ruta del archivo, L-02 · Un efecto de re-frame recibe **un solo** argumento, L-03 · Un `reg-event-*` en un namespace que nadie requiere **no existe**, L-04 · Warnings `:infer-warning` en `events/auth.cljs` son conocidos y benignos, L-05 · No editar `public/js/app.js` a mano (+39 more)

### Community 11 - "admin_rls.sql"
Cohesion: 0.60
Nodes (4): on_auth_user_created, public.handle_new_user(), public.is_admin(), public.profiles

### Community 12 - "ARCHITECTURE"
Cohesion: 0.06
Nodes (31): 10-bis. Verificación versionada (`scripts/`), 10. Riesgos arquitectónicos, 11. Relación con Graphify, 1. Arquitectura general, 2.1 Núcleo de la aplicación, 2.2 Motor IRT (el corazón del producto), 2.3 Perfil, plan y cupos, 2.4 Panel de administración (+23 more)

### Community 13 - "Universo - Plataforma de Evaluación Adaptativa"
Cohesion: 0.07
Nodes (29): 1. **Dashboard de Aprendizaje**, 2. **Sistema de Evaluaciones Adaptativas**, 3. **Seguimiento de Visitantes**, 4. **Formulario de Contacto**, 5. **Autenticación**, Archivos clave nuevos, Backend, Build & Development (+21 more)

### Community 14 - "Producto y negocio"
Cohesion: 0.05
Nodes (37): Contradicciones detectadas (regla de gobernanza 14), Dominio (IRT y contenido), OPEN_QUESTIONS, Preguntas respondidas, Proceso, Producto y negocio, ✅ Q-01 · ¿Cuál es el vínculo formal con la UNAP?, ✅ Q-02 · ¿Las clases de los cupos tienen costo? — Número fijado 2026-07-30 (+29 more)

### Community 15 - "001_mvp_schema.sql"
Cohesion: 0.40
Nodes (3): public.modules, public.questions, public.student_profiles

### Community 19 - "BACKLOG.md"
Cohesion: 0.09
Nodes (31): docs/, Nota sobre `PROJECT_SUMMARY.md`, Qué NO va aquí, Qué va aquí, 1. Índice de ADRs, 2. Decisiones menores (sin ADR propio), 3. Decisiones pendientes, 4. Cómo registrar una decisión nueva (+23 more)

### Community 20 - "Detalle"
Cohesion: 0.07
Nodes (30): Detalle, R-01 · Bus factor = 1, R-02 · Desarrollo contra la base de producción, R-03 · Sin respaldo propio verificado, R-04 · Sin CI, R-05 · Divergencia del copy y del JSON-LD, R-06 · Datos personales de menores sin aviso de privacidad, R-07 · Monolitos (+22 more)

### Community 21 - "1. Requerimientos funcionales"
Cohesion: 0.08
Nodes (26): 1. Requerimientos funcionales, 2. Requerimientos no funcionales, 3. Reglas de negocio, 4. Casos de uso, 5. Restricciones, 6. Criterios de aceptación (por área), 7. Información faltante, CU-01 — Estudiante nuevo obtiene su plan (+18 more)

### Community 24 - "VISION_LIBRO_PROYECTO"
Cohesion: 0.10
Nodes (21): 10. Referencias citadas en el libro, 1. Qué es este documento fuente, 2. Problema y contexto de mercado, 3.1 Matemáticas como narrativa histórica, 3.2 Control retroalimentado aplicado a la pedagogía, 3.3 Modelo de clasificación de dos (y eventualmente tres) ejes, 3.4 Tres grupos de conocimiento (vs. cuatro bandas de θ), 3. Filosofía pedagógica (+13 more)

### Community 34 - "SESSION-001"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 35 - "SESSION-002"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 36 - "SESSION-XXX"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 37 - "ADR-012: Tema oscuro mediante mapeo global de CSS, no `dark:` por elemento"
Cohesion: 0.22
Nodes (9): ADR-012: Tema oscuro mediante mapeo global de CSS, no `dark:` por elemento, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 38 - "ADR-014: El tiempo de respuesta es un eje separado de θ, no un término dentro del modelo 1PL"
Cohesion: 0.12
Nodes (16): ADR-014: El tiempo de respuesta es un eje separado de θ, no un término dentro del modelo 1PL, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, El argumento que define el diseño, El problema que dispara esta decisión, Estado (+8 more)

### Community 39 - "CLAUDE.md — Academia Integral (repo `yacobh.github.io`)"
Cohesion: 0.12
Nodes (16): 10. Referencias a project-memory, 11. Reglas para actualizar la memoria del proyecto, 12. Orden recomendado de lectura para Claude Code CLI, 13. graphify, 14. rtk, 1. Resumen ejecutivo, 2. Objetivos del proyecto, 3. Stack tecnológico (+8 more)

### Community 40 - "ROADMAP"
Cohesion: 0.12
Nodes (16): F0 — Base técnica ✅, F10 — Medición, F11 — Escala pedagógica (propuesta, sin confirmar), F1 — Motor IRT ✅, F2 — Perfil y plan ✅ 100 % (2026-08-09), F3 — Cohortes ✅ 100 % (2026-08-09), F4 — Panel de administración ✅, F5 — Email de cohorte ✅ 100 % (2026-08-09) (+8 more)

### Community 42 - "ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión"
Cohesion: 0.13
Nodes (15): ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión, Alternativas Evaluadas, Bandas, Consecuencias, Contexto, Decisión, Estado, Estimación (+7 more)

### Community 43 - "OBSIDIAN_WORKSPACE_GUIDE"
Cohesion: 0.13
Nodes (15): 10. Cómo se relaciona esto con Graphify, 1. Qué aporta Obsidian aquí (y qué no), 2. Qué abrir como Vault, 3. Excluir el código del Vault, 4. Convenciones de enlaces, 5. Cómo trabajar día a día, 6. Plugins: uso moderado, 7. Reglas para evitar dependencia excesiva de Obsidian (+7 more)

### Community 44 - "GRAPHIFY_INTEGRATION_GUIDE"
Cohesion: 0.13
Nodes (15): 10. Graphify para onboarding técnico, 11. Graphify para revisión de impacto antes de modificar código, 12. Cómo evitar que Graphify reemplace la documentación oficial, 13. Mantenimiento, 1. Qué es y qué produce, 2. Dónde viven los artefactos, 3. Cuándo ejecutar Graphify, 4. Comandos útiles (+7 more)

### Community 46 - "AGENT_INSTRUCTIONS"
Cohesion: 0.15
Nodes (13): 0. Regla fundamental: Project Memory First, 10. Reglas específicas de este repositorio, 11. Checklist de cierre de sesión, 1. Reglas generales, 2. Antes de modificar código, 3. Antes de modificar infraestructura o base de datos, 4. Reglas de documentación, 5. Reglas de testing (+5 more)

### Community 47 - "HANDOFF"
Cohesion: 0.15
Nodes (13): Business Goals, Completed Work, Critical Decisions, Current State, Executive Summary, Functional Scope, HANDOFF, Immediate Next Steps (+5 more)

### Community 48 - "ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos"
Cohesion: 0.17
Nodes (12): ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos, Agrupación por banda de θ, Alternativas Evaluadas, Confirmación por mínimo de inscritos, Consecuencias, Contexto, Decisión, Estado (+4 more)

### Community 49 - "Graph Report - .  (2026-08-09)"
Cohesion: 0.18
Nodes (10): Community Hubs (Navigation), Corpus Check, God Nodes (most connected - your core abstractions), Graph Freshness, Graph Report - yacobh.github.io  (2026-08-13), Import Cycles, Knowledge Gaps, Suggested Questions (+2 more)

### Community 50 - "PROJECT_BRIEF"
Cohesion: 0.17
Nodes (12): 1. Nombre del proyecto, 2. Descripción, 3. Objetivo general, 4. Problema que resuelve, 5. Alcance (en el MVP actual), 6. Exclusiones (fuera de alcance, decidido), 7. Stakeholders, 8. Criterios de éxito (+4 more)

### Community 52 - "DEPENDENCIES"
Cohesion: 0.18
Nodes (11): 1. Dependencias externas (servicios), 2. Dependencias de librería, 3. Dependencias internas (acoplamientos), 4. Dependencias humanas y organizacionales, 5. Orden de arranque de un entorno nuevo, 6. Actualización de dependencias, Clojure / ClojureScript (`deps.edn`, `shadow-cljs.edn`), DEPENDENCIES (+3 more)

### Community 53 - "Notas"
Cohesion: 0.18
Nodes (10): Al terminar, Checklist previo, Estado actual a resolver antes de publicar, Notas, Procedimiento completo, Prompt, Prompt: despliegue, Reversión (+2 more)

### Community 54 - "Notas"
Cohesion: 0.18
Nodes (10): Al terminar, Casos borde que este dominio exige, Cómo funciona la suite, Idea pendiente, Notas, Prompt, Prompt: testing, Qué está cubierto hoy (+2 more)

### Community 55 - "BUSINESS_CONTEXT"
Cohesion: 0.20
Nodes (10): 1. Contexto, 2. Objetivos de negocio, 3. Propuesta de valor, 4. Recorrido del usuario (funnel), 5. Modelo económico, 6. Métricas propuestas (aún no instrumentadas), 7. Restricciones de negocio, 8. Comunicación oficial y mensajes clave (+2 more)

### Community 56 - "CURRENT_STATUS"
Cohesion: 0.20
Nodes (10): 1. Estado general, 2. Avance por fase, 3. Checklist de go-live, 4. Últimos cambios (historia reciente), 5. Últimas decisiones, 6. Bloqueos, 7. Riesgos activos (top 5), 8. Próximos pasos inmediatos (+2 more)

### Community 57 - "TECH_STACK"
Cohesion: 0.20
Nodes (10): 1. Resumen, 2. Builds (`shadow-cljs.edn`), 3. Comandos, 4. Estructura de `src/`, 5. Tests, 6. Base de datos (Supabase / PostgreSQL), 7. Artefactos y qué se versiona, 8. Configuración de agentes en el repo (+2 more)

### Community 58 - "Notas"
Cohesion: 0.20
Nodes (9): Al terminar, Archivos grandes: entrar con cuidado, Comandos, Estructura mental antes de escribir, Las cinco trampas de este repositorio, Notas, Prompt, Prompt: desarrollo (implementar un cambio de código) (+1 more)

### Community 59 - "Notas"
Cohesion: 0.20
Nodes (9): Al terminar, Antes de cualquier cambio destructivo, Edge Functions, Entornos, Notas, Prompt, Prompt: infraestructura y base de datos, Reglas obligatorias (+1 more)

### Community 61 - "Schema Supabase — Academia Integral MVP"
Cohesion: 0.06
Nodes (31): Alternativas de contacto (`017_contacto_alternativas.sql`), Auditoría de RLS y cierre del banco de ítems (`023`, `024`, `025`), Bandas de θ (cupos), Canal de contacto preferido (`013_profile_contact_preference.sql`), Catálogo de misconceptions (`027_misconceptions.sql`) — ✅ aplicada 2026-08-10, Configuración de parada por banco y prerequisitos (`020_test_configs.sql`), Contexto de visitante para el admin (`015_visitor_select_admin.sql`), Control de capacidad en inscripciones (`011_enrollments_capacity_check.sql`) (+23 more)

### Community 62 - "ADR-001: ClojureScript + re-frame + shadow-cljs como stack de frontend"
Cohesion: 0.22
Nodes (9): ADR-001: ClojureScript + re-frame + shadow-cljs como stack de frontend, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 63 - "ADR-002: Supabase como único backend y RLS como límite de seguridad"
Cohesion: 0.22
Nodes (9): ADR-002: Supabase como único backend y RLS como límite de seguridad, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 64 - "ADR-003: GitHub Pages con el bundle compilado versionado en Git"
Cohesion: 0.22
Nodes (9): ADR-003: GitHub Pages con el bundle compilado versionado en Git, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 65 - "ADR-005: El contenido pedagógico vive en el banco de ítems (capa 0), no en un CMS"
Cohesion: 0.22
Nodes (9): ADR-005: El contenido pedagógico vive en el banco de ítems (capa 0), no en un CMS, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 66 - "ADR-007: Email de cohorte por tabla outbox + Edge Function con Resend"
Cohesion: 0.22
Nodes (9): ADR-007: Email de cohorte por tabla outbox + Edge Function con Resend, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 67 - "ADR-008: Archivar MathAcademy y mantener un funnel único"
Cohesion: 0.22
Nodes (9): ADR-008: Archivar MathAcademy y mantener un funnel único, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 68 - "ADR-009: Las reglas de negocio viven en namespaces puros y testeados"
Cohesion: 0.22
Nodes (9): ADR-009: Las reglas de negocio viven en namespaces puros y testeados, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 69 - "ADR-010: Adopción de Project Memory First (Markdown + Git como fuente de verdad)"
Cohesion: 0.22
Nodes (9): ADR-010: Adopción de Project Memory First (Markdown + Git como fuente de verdad), Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 70 - "ADR-XXX: Título de la Decisión"
Cohesion: 0.22
Nodes (9): ADR-XXX: Título de la Decisión, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 71 - "INDEX — Project Memory (Academia Integral)"
Cohesion: 0.22
Nodes (9): Ejecución, Empezar aquí, Gobernanza y decisiones, Grafo de relaciones (para Graph View de Obsidian), INDEX — Project Memory (Academia Integral), Negocio y alcance, Para agentes de IA, Para humanos (+1 more)

### Community 72 - "Notas"
Cohesion: 0.22
Nodes (8): ADRs, Al terminar, Copy público: es documentación **y** requisito, Dónde va cada cosa, Notas, Prompt, Prompt: documentación, Reglas de estilo de esta memoria

### Community 73 - "ADR-011: La visión del "Libro del Proyecto" es el norte estratégico; el MVP es una fase intermedia"
Cohesion: 0.22
Nodes (9): ADR-011: La visión del "Libro del Proyecto" es el norte estratégico; el MVP es una fase intermedia, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 74 - "Notas"
Cohesion: 0.25
Nodes (7): Al terminar, Disciplina de diagnóstico, Herramientas de diagnóstico, Notas, Prompt, Prompt: troubleshooting, Tabla de diagnóstico rápido

### Community 76 - "SESSION-009"
Cohesion: 0.11
Nodes (19): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+11 more)

### Community 77 - "ADR-015: El cliente no lee `questions` directamente; el ítem viaja sin su respuesta y la corrección ocurre en el servidor"
Cohesion: 0.13
Nodes (15): ADR-015: El cliente no lee `questions` directamente; el ítem viaja sin su respuesta y la corrección ocurre en el servidor, Alternativas Evaluadas, Consecuencias, Contexto, Contexto adicional de la misma auditoría, Decisión, El hallazgo que dispara esta decisión, Estado (+7 more)

### Community 78 - "SESSION-008"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 79 - "H"
Cohesion: 0.11
Nodes (19): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+11 more)

### Community 80 - "ASSUMPTIONS"
Cohesion: 0.25
Nodes (8): ASSUMPTIONS, Los tres supuestos que más importan, Supuestos de dominio (IRT y contenido), Supuestos de negocio, Supuestos de proceso y memoria, Supuestos de UI, Supuestos técnicos, Supuestos validados o refutados

### Community 81 - "t"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 82 - "Contenido pedagógico (capa 0 + Baldor)"
Cohesion: 0.09
Nodes (8): Ca(), eo(), handler(), nf(), ng(), Oj(), xa(), ya()

### Community 83 - "`send-enrollment-emails`"
Cohesion: 0.33
Nodes (5): Edge Functions — Academia Integral, Flujo, Invocar, `send-enrollment-emails`, Setup

### Community 84 - "ADR-013: Configuración de parada por banco de preguntas y prerequisitos de tests"
Cohesion: 0.22
Nodes (9): ADR-013: Configuración de parada por banco de preguntas y prerequisitos de tests, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 85 - "kf"
Cohesion: 0.29
Nodes (7): 1. Qué es y qué no es, 2. Qué se instaló y dónde, 3. Cómo verificar que está activo, 4. El filtro propio de este proyecto: `clj-test`, 5. Mantenimiento, 6. Efecto colateral detectado y corregido en esta sesión, RTK_INTEGRATION_GUIDE

### Community 86 - "v"
Cohesion: 0.22
Nodes (9): ADR-018: El motor IRT se reusa para un track experimental fuera del temario PAES, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 87 - "README.md"
Cohesion: 0.40
Nodes (4): Building for production, Development mode, Notas del proyecto, to watch css

### Community 88 - "Épica E4 — Producto y experiencia"
Cohesion: 0.17
Nodes (12): T-05 · Router de URL con history API — **P1** · `abierto`, T-24 · Estado vacío honesto en "Mi plan" y "Cupos" — **P1** · `hecho` (2026-08-03, mergeado a `main` 2026-08-05), T-25 · Comunicar el estado del cupo pendiente y cancelarlo si no alcanza el mínimo — **P1** · `hecho` (2026-07-30, sin verificar en vivo), T-26 · Semántica del re-diagnóstico — **P2** · `bloqueado` (decisión Q-07), T-36 · Preferencia de canal de contacto (email / notificación / WhatsApp) — **P2** · `hecho` (2026-07-30, sin verificar en vivo), T-38 · Tema oscuro con toggle en la barra de navegación — **P2** · `hecho` (2026-08-05, mergeado a `main`), T-39 · Config de parada por banco y progresión por prerequisitos — **P1** · `hecho` (2026-08-08, mergeado a `main` vía PR #23), T-40 · Columna de cantidad de preguntas por test en el panel admin — **P2** · `hecho` (2026-08-08, sin verificar en vivo) (+4 more)

### Community 89 - "K"
Cohesion: 0.29
Nodes (7): Aviso de Privacidad — Academia Integral, AVISO DE PRIVACIDAD — historial de la decisión (PUBLICADO), Borrador de texto (para la página pública, cuando esté aprobado), Checklist — respuestas del owner (2026-07-28) y qué se hizo con cada una, Por qué existe este borrador, Qué datos se recolectan hoy (según el código, `ARCHITECTURE.md` §7.4 y `SCHEMA.md`), Qué queda pendiente (no de texto, de ejecución)

### Community 90 - "u"
Cohesion: 0.22
Nodes (9): Código y arquitectura, Dominio: educación chilena, Dominio: psicometría e IRT, Interfaz: el panel de instrumento, Metodología y herramientas, Producto, Raíz histórica (tesis UNEXPO 2010), TERMINOLOGY (+1 more)

### Community 93 - "N"
Cohesion: 0.05
Nodes (171): ac(), ad(), ag(), Ah(), aI(), aL(), AM(), an() (+163 more)

### Community 94 - "ae"
Cohesion: 0.29
Nodes (6): Al terminar, Criterios de aceptación: cómo se ven aquí, Notas, Prompt, Prompt: requisitos, Reglas de este proyecto al escribir requisitos

### Community 96 - "tailwind.config.js"
Cohesion: 0.25
Nodes (7): ADR-0020, ADR-0022, ADR-0023, grafito, led, panel, senal

### Community 97 - "htmlBuilder"
Cohesion: 0.29
Nodes (6): Checklist de cierre, Errores frecuentes al cerrar, Notas para quien use este prompt, Prompt: cierre de sesión y actualización de memoria, Qué debe pasar, en orden, Regla de fondo

### Community 103 - "I"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 104 - "jc"
Cohesion: 0.06
Nodes (3): mc(), w(), z()

### Community 105 - ".M"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 106 - ".S"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 107 - "B"
Cohesion: 0.08
Nodes (30): aa(), bf(), Dg(), Dh(), Fa(), Ff(), G(), He() (+22 more)

### Community 108 - "w"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 112 - "SESSION-005"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 113 - "Épica E1 — Go-live real (F8)"
Cohesion: 0.20
Nodes (10): T-01 · Publicar contenido mínimo por módulo prioritario — **P0** · `hecho` (2026-08-09), T-02 · Cerrar el pipeline de email de cohorte — **P0** · `hecho` (2026-08-09), T-03 · Agregar control de capacidad en la inscripción — **P0** · `hecho` (2026-07-29), T-04 · Publicar cupos reales y retirar los demo — **P0** · `hecho` (2026-08-09) ⭐ **último bloqueo de go-live**, T-08 · Limpiar el árbol y publicar el bundle correcto — **P0** · `hecho` (2026-07-29), T-19 · Verificar qué hay realmente en producción — **P0** · `hecho` (2026-07-29), seguimiento en T-35, T-35 · Mergear `visual-fixes` a `main` y republicar — **P1** · `hecho` (2026-07-29), T-52 · Grabar o buscar los 3 videos placeholder de recursos — **P3** · `abierto` (+2 more)

### Community 115 - "Épica E3 — Deuda técnica y limpieza"
Cohesion: 0.29
Nodes (7): T-15 · Descomponer los monolitos — **P2** · `abierto`, T-16 · Resolver `src/universo/user.cljs` — **P2** · `hecho` (2026-08-09), T-17 · Limpiar archivos huérfanos — **P3** · `abierto`, T-18 · Ordenar las ramas — **P2** · `hecho` (2026-08-09), T-23 · Decidir el destino del código no alcanzable — **P3** · `abierto`, T-43 · Binding sin usar en `crud/fetch-modules-by-ids` — **P3** · `abierto`, Épica E3 — Deuda técnica y limpieza

### Community 116 - "cc"
Cohesion: 0.07
Nodes (30): 10. Verificador de esquema (pedido del owner: "¿está claro el esquema?"), 11. El cronómetro sí registra: T-59 replanteado (cierre), 1. Panorama del proyecto (pedido inicial), 2. T-44 · Filtro de respuestas no esforzadas, 3. T-51 · Higiene de `topic` y `module_id`, 4. Verificación de `029` contra un PostgreSQL real, 5. Revisión del owner a T-44 → T-59 (después de entregar los dos tickets), 6. Cierre del backfill de T-51 con la medición real (`030`, `031`) (+22 more)

### Community 117 - "SESSION-011"
Cohesion: 0.11
Nodes (19): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+11 more)

### Community 118 - "BACKLOG"
Cohesion: 0.33
Nodes (6): BACKLOG, Resumen por prioridad, T-20 · Instrumentar el funnel — **P1** · `abierto`, T-21 · Vistas SQL de métricas — **P2** · `abierto`, T-22 · Panel interno de métricas — **P3** · `abierto`, Épica E6 — Medición (F10)

### Community 121 - "Épica E5 — Contenido y calidad pedagógica"
Cohesion: 0.12
Nodes (16): T-27 · Enriquecer `error_*` de los ítems más fallados — **P1** · `abierto`, T-28 · Completar el mapeo `topic → module-slug` — **P1** · `abierto`, T-29 · Calibrar `difficulty` con datos reales — **P3** · `abierto`, T-37 · Dato de origen/fecha en cada recurso, para una futura línea de tiempo de conceptos — **P3** · `idea` (sin diseño), T-44 · Filtro de respuestas no esforzadas (Fase 1 de ADR-014) — **P1** · `hecho` (2026-08-10, **en producción y verificado por hash**), T-45 · Velocidad (τ) como segundo eje del perfil (Fase 2 de ADR-014) — **P2** · `bloqueado` (datos: ≥ 30 tests — ⚠ la precondición puede estar cumplida hace un año, ver T-59), T-46 · Prior de θ condicional a la velocidad (Fase 3 de ADR-014) — **P3** · `bloqueado` (datos: ≥ 200 tests + ADR propio), T-50 · `difficulty` en escalas incompatibles rompe topics enteros — **P0** · `hecho` (2026-08-09) (+8 more)

### Community 126 - "Épica E7 — Memoria del proyecto (PMF)"
Cohesion: 0.11
Nodes (19): T-30 · Mantener la memoria al día — **P0** · `recurrente`, T-31 · Refrescar el snapshot de Graphify tras cambios de código — **P2** · `recurrente`, T-32 · Extender la cobertura del grafo a `.cljs` — **P3** · `hecho` (2026-08-08), T-33 · Reconciliar `PROJECT_SUMMARY.md` con `project-memory/` — **P2** · `abierto`, T-61 · Experimento: track de Mecánica Cuántica sobre el motor IRT — **P3** · `aplicado` (2026-08-11), T-62 · El cuerpo de `resources` no renderiza tablas de Markdown — **P3** · `abierto` (2026-08-11), T-63 · Eje de fluidez (λ) — **P2** · `hecho` (2026-08-12), T-65 · Calibrar el umbral de fluidez con ítems conceptuales — **P2** · `parcialmente hecho` (2026-08-12) (+11 more)

### Community 130 - "prompts/"
Cohesion: 0.09
Nodes (38): ae(), af(), be(), bk(), Ce(), Cf(), de(), Df() (+30 more)

### Community 132 - "ADR-016: La IA produce contenido en el pipeline de autoría, nunca en runtime"
Cohesion: 0.22
Nodes (9): ADR-016: La IA produce contenido en el pipeline de autoría, nunca en runtime, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 133 - "m"
Cohesion: 0.12
Nodes (32): Ab(), bb(), cb(), Cd(), dd(), fe(), gf(), hb() (+24 more)

### Community 136 - "SESSION-010"
Cohesion: 0.10
Nodes (20): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+12 more)

### Community 137 - "B"
Cohesion: 0.08
Nodes (21): ar(), B(), Bd(), dc(), dk(), Ec(), fc(), hc() (+13 more)

### Community 138 - "yc"
Cohesion: 0.11
Nodes (14): eb(), ee(), jd(), lf(), Me(), Rf(), Si(), Ui() (+6 more)

### Community 144 - "SESSION-020"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 145 - "ADR-017: `questions.topic` se mantiene canónico por trigger, no por convención ni por check"
Cohesion: 0.22
Nodes (9): ADR-017: `questions.topic` se mantiene canónico por trigger, no por convención ni por check, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 149 - "E"
Cohesion: 0.27
Nodes (13): bn(), Cm(), Em(), en(), pn(), qd(), qN(), sn() (+5 more)

### Community 150 - "N"
Cohesion: 0.12
Nodes (3): Bo(), N(), qh()

### Community 151 - "kd"
Cohesion: 0.23
Nodes (5): Gd(), kd(), pc(), vh(), Xo()

### Community 153 - ".setAttribute"
Cohesion: 0.07
Nodes (4): Bc(), cc(), fb(), tb()

### Community 155 - "Ra"
Cohesion: 0.50
Nodes (3): 1\. Identificación y domicilio, Datos del proponente responsable, Productos finales derivados de la propuesta.

### Community 156 - "SESSION-022"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 157 - "Kg"
Cohesion: 0.10
Nodes (20): Actividades realizadas, Actualizaciones requeridas en Project Memory, Addendum 2 — umbrales de fluidez por banco (mismo día), Addendum — verificación con datos reales (mismo día), Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados (+12 more)

### Community 158 - "SESSION-023"
Cohesion: 0.09
Nodes (23): Actividades realizadas, Actualizaciones requeridas en Project Memory, Addendum 2 — el panel de instrumento (mismo día), Addendum 3 — feedback del owner sobre el panel (mismo día), Addendum 4 — cierre: cinco rondas de corrección y el merge, Addendum — el owner probó la paleta y pidió Dieter Rams (mismo día), Archivos modificados, Archivos revisados (+15 more)

### Community 159 - "ba"
Cohesion: 0.23
Nodes (9): ba(), cn(), da(), Go(), Ho(), Io(), Jo(), Lo() (+1 more)

### Community 160 - "to"
Cohesion: 0.20
Nodes (10): ADR-019: El segundo eje del perfil mide fluidez, no estilo de aprendizaje, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Por qué no se implementa el eje de estilos de aprendizaje (+2 more)

### Community 161 - "ed"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 162 - "ADR-020: La identidad visual se define con tokens de Tailwind, redefiniendo el vocabulario existente"
Cohesion: 0.22
Nodes (9): ADR-020: La identidad visual se define con tokens de Tailwind, redefiniendo el vocabulario existente, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 163 - "ADR-021: La línea del tiempo histórica es el eje del tablero, y las medallas se derivan de `tests`"
Cohesion: 0.22
Nodes (9): ADR-021: La línea del tiempo histórica es el eje del tablero, y las medallas se derivan de `tests`, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 164 - ".contains"
Cohesion: 0.06
Nodes (42): aj(), Ao(), ci(), cr(), Dm(), dn(), dr(), Ep() (+34 more)

### Community 165 - "audit_dark_theme.py"
Cohesion: 0.47
Nodes (5): clases_mapeadas(), main(), Número de tono de una clase de color, o None si no lo tiene., Clases que `app.css` remapea bajo `.dark`.      Dos detalles del formato de Tail, tono()

### Community 166 - "handler"
Cohesion: 0.16
Nodes (14): ap(), di(), Gc(), hf(), If(), Jb(), kf(), la() (+6 more)

### Community 167 - "audit_contraste.py"
Cohesion: 0.70
Nodes (4): contraste(), _lineal(), luminancia(), main()

### Community 168 - "rg"
Cohesion: 0.22
Nodes (9): ADR-022: La identidad del producto es el lenguaje de diseño Braun / Dieter Rams, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 173 - "ADR-023: Panel de instrumento — la física está en los controles, no en la superficie"
Cohesion: 0.22
Nodes (9): ADR-023: Panel de instrumento — la física está en los controles, no en la superficie, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 174 - "mathmlBuilder"
Cohesion: 0.22
Nodes (8): ak(), db(), ic(), Id(), Ja(), Md(), tf(), uf()

### Community 175 - "._leaveOpenTopic"
Cohesion: 0.22
Nodes (9): ADR-024: La raíz del proyecto es la tesis de 2010, no el convenio UNAP de 2025, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 177 - "revisar"
Cohesion: 0.67
Nodes (3): main(), Devuelve la lista de problemas de un archivo., revisar()

### Community 180 - "2. Lo que hay que sincerar sobre el alcance"
Cohesion: 0.18
Nodes (11): 1. El origen real, en una línea, 2.1 El nombre y el léxico no son de esta etapa, 2.2 La ambición original era mucho mayor que el MVP, 2.3 Lo que sí se ejecutó, y es el diferencial, 2.4 Tres intentos, ninguno llegó a estudiantes de forma sostenida, 2.5 Kahoot y AhaSlides: el mercado validó el mecanismo, no este producto, 2.6 La objeción que el producto lleva quince años recibiendo, 2. Lo que hay que sincerar sobre el alcance (+3 more)

## Knowledge Gaps
- **1394 isolated node(s):** `autoprefixer`, `postcss`, `shadow-cljs`, `tailwindcss`, `@supabase/supabase-js` (+1389 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BACKLOG` connect `BACKLOG` to `Épica E2 — Endurecimiento (F9)`, `Épica E1 — Go-live real (F8)`, `Épica E3 — Deuda técnica y limpieza`, `BACKLOG.md`, `Épica E4 — Producto y experiencia`, `Épica E5 — Contenido y calidad pedagógica`, `Épica E7 — Memoria del proyecto (PMF)`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `K()` connect `.then` to `prompts/`, `app.js`, `m`, `u`, `B`, `yc`, `I`, `E`, `N`, `kd`, `A`, `.setAttribute`, `.contains`, `handler`, `._getUrlForProvider`, `mathmlBuilder`, `Contenido pedagógico (capa 0 + Baldor)`, `N`, `jc`, `B`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `SESSION-023` connect `SESSION-023` to `BACKLOG.md`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Are the 21 inferred relationships involving `v()` (e.g. with `.constructor()` and `.invoke()`) actually correct?**
  _`v()` has 21 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `K()` (e.g. with `Ka()` and `.V()`) actually correct?**
  _`K()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 18 inferred relationships involving `H()` (e.g. with `Bg()` and `dc()`) actually correct?**
  _`H()` has 18 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `C()` (e.g. with `cb()` and `.M()`) actually correct?**
  _`C()` has 5 INFERRED edges - model-reasoned connections that need verification._