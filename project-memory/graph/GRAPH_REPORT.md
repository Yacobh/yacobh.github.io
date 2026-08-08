# Graph Report - .  (2026-08-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 2065 nodes · 5855 edges · 125 communities (99 shown, 26 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 703 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ffd91e7d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- C
- t
- app.js
- Communities (113 total, 20 thin omitted)
- Épica E2 — Endurecimiento (F9)
- SESSION-004
- N
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
- CLAUDE.md — Academia Integral (repo `yacobh.github.io`)
- ROADMAP
- ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión
- OBSIDIAN_WORKSPACE_GUIDE
- GRAPHIFY_INTEGRATION_GUIDE
- AGENT_INSTRUCTIONS
- HANDOFF
- ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos
- Graph Report - .  (2026-08-05)
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
- ng
- be
- SESSION-008
- .push
- kf
- G
- Contenido pedagógico (capa 0 + Baldor)
- `send-enrollment-emails`
- ADR-013: Configuración de parada por banco de preguntas y prerequisitos de tests
- .V
- .then
- README.md
- sa
- pd
- oa
- ARCHIVE.md
- na
- v
- K
- Jo
- u
- mb
- t
- I
- Zb
- wc
- htmlBuilder
- lc
- A
- ae
- .M
- .indexOf
- rg
- SESSION-005
- Vc
- Md
- x
- yf
- public.test_configs
- 021_tests_topic_theta_rls.sql
- to
- D

## God Nodes (most connected - your core abstractions)
1. `v()` - 239 edges
2. `K()` - 132 edges
3. `H()` - 129 edges
4. `C()` - 123 edges
5. `B()` - 87 edges
6. `t()` - 80 edges
7. `Communities (113 total, 20 thin omitted)` - 76 edges
8. `tc()` - 74 edges
9. `y()` - 72 edges
10. `w()` - 71 edges

## Surprising Connections (you probably didn't know these)
- `K()` --indirect_call--> `B()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 97 → community 85_
- `K()` --indirect_call--> `Wi()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 97 → community 86_
- `K()` --indirect_call--> `z()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 97 → community 94_
- `G()` --indirect_call--> `p()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 81 → community 125_
- `G()` --indirect_call--> `y()`  [INFERRED]
  public/js/app.js → public/js/app.js  _Bridges community 81 → community 85_

## Import Cycles
- None detected.

## Communities (125 total, 26 thin omitted)

### Community 0 - "C"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 1 - "t"
Cohesion: 0.25
Nodes (7): Al terminar, Checklist de impacto (de `GRAPHIFY_INTEGRATION_GUIDE` §11), Notas, Prompt, Prompt: arquitectura, Restricciones estructurales que no se negocian sin ADR nuevo, Riesgos arquitectónicos ya conocidos

### Community 2 - "app.js"
Cohesion: 0.07
Nodes (39): bk(), cr(), Dm(), dn(), dr(), ea(), fL(), Gc() (+31 more)

### Community 3 - "Communities (113 total, 20 thin omitted)"
Cohesion: 0.03
Nodes (76): Communities (113 total, 20 thin omitted), Community 0 - "C", Community 100 - "mb", Community 101 - "t", Community 103 - "x", Community 106 - "lc", Community 108 - "J", Community 10 - "Proceso y agentes de IA" (+68 more)

### Community 4 - "Épica E2 — Endurecimiento (F9)"
Cohesion: 0.04
Nodes (48): BACKLOG, Resumen por prioridad, T-01 · Publicar contenido mínimo por módulo prioritario — **P0** · `bloqueado` (humano, revisión pendiente), T-02 · Cerrar el pipeline de email de cohorte — **P0** · `bloqueado` (acceso), T-03 · Agregar control de capacidad en la inscripción — **P0** · `hecho` (2026-07-29), T-04 · Publicar cupos reales y retirar los demo — **P0** · `abierto` (desbloqueada, falta ejecución del owner), T-05 · Router de URL con history API — **P1** · `abierto`, T-06 · CI mínima con GitHub Actions — **P1** · `hecho` (2026-08-03, sin verificar en vivo) (+40 more)

### Community 5 - "SESSION-004"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 6 - "N"
Cohesion: 0.11
Nodes (5): Ao(), Bo(), cc(), N(), qh()

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
Cohesion: 0.05
Nodes (42): ClojureScript y shadow-cljs, CSS y Tailwind, IRT y dominio, L-01 · El namespace debe coincidir con la ruta del archivo, L-02 · Un efecto de re-frame recibe **un solo** argumento, L-03 · Un `reg-event-*` en un namespace que nadie requiere **no existe**, L-04 · Warnings `:infer-warning` en `events/auth.cljs` son conocidos y benignos, L-05 · No editar `public/js/app.js` a mano (+34 more)

### Community 11 - "admin_rls.sql"
Cohesion: 0.60
Nodes (4): on_auth_user_created, public.handle_new_user(), public.is_admin(), public.profiles

### Community 12 - "ARCHITECTURE"
Cohesion: 0.07
Nodes (30): 10. Riesgos arquitectónicos, 11. Relación con Graphify, 1. Arquitectura general, 2.1 Núcleo de la aplicación, 2.2 Motor IRT (el corazón del producto), 2.3 Perfil, plan y cupos, 2.4 Panel de administración, 2.5 Acceso a datos (+22 more)

### Community 13 - "Universo - Plataforma de Evaluación Adaptativa"
Cohesion: 0.07
Nodes (29): 1. **Dashboard de Aprendizaje**, 2. **Sistema de Evaluaciones Adaptativas**, 3. **Seguimiento de Visitantes**, 4. **Formulario de Contacto**, 5. **Autenticación**, Archivos clave nuevos, Backend, Build & Development (+21 more)

### Community 14 - "Producto y negocio"
Cohesion: 0.06
Nodes (31): Contradicciones detectadas (regla de gobernanza 14), Dominio (IRT y contenido), OPEN_QUESTIONS, Preguntas respondidas, Proceso, Producto y negocio, ✅ Q-01 · ¿Cuál es el vínculo formal con la UNAP?, ✅ Q-02 · ¿Las clases de los cupos tienen costo? — Número fijado 2026-07-30 (+23 more)

### Community 15 - "001_mvp_schema.sql"
Cohesion: 0.40
Nodes (3): public.modules, public.questions, public.student_profiles

### Community 19 - "BACKLOG.md"
Cohesion: 0.05
Nodes (65): docs/, Nota sobre `PROJECT_SUMMARY.md`, Qué NO va aquí, Qué va aquí, ASSUMPTIONS, Los tres supuestos que más importan, Supuestos de dominio (IRT y contenido), Supuestos de negocio (+57 more)

### Community 20 - "Detalle"
Cohesion: 0.08
Nodes (26): Detalle, R-01 · Bus factor = 1, R-02 · Desarrollo contra la base de producción, R-03 · Sin respaldo propio verificado, R-04 · Sin CI, R-05 · Divergencia del copy y del JSON-LD, R-06 · Datos personales de menores sin aviso de privacidad, R-07 · Monolitos (+18 more)

### Community 21 - "1. Requerimientos funcionales"
Cohesion: 0.08
Nodes (25): 1. Requerimientos funcionales, 2. Requerimientos no funcionales, 3. Reglas de negocio, 4. Casos de uso, 5. Restricciones, 6. Criterios de aceptación (por área), 7. Información faltante, CU-01 — Estudiante nuevo obtiene su plan (+17 more)

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

### Community 39 - "CLAUDE.md — Academia Integral (repo `yacobh.github.io`)"
Cohesion: 0.12
Nodes (16): 10. Referencias a project-memory, 11. Reglas para actualizar la memoria del proyecto, 12. Orden recomendado de lectura para Claude Code CLI, 13. graphify, 14. rtk, 1. Resumen ejecutivo, 2. Objetivos del proyecto, 3. Stack tecnológico (+8 more)

### Community 40 - "ROADMAP"
Cohesion: 0.12
Nodes (16): F0 — Base técnica ✅, F10 — Medición, F11 — Escala pedagógica (propuesta, sin confirmar), F1 — Motor IRT ✅, F2 — Perfil y plan 🟡 95 %, F3 — Cohortes 🟡 95 %, F4 — Panel de administración ✅, F5 — Email de cohorte ⚠️ 60 % (+8 more)

### Community 42 - "ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión"
Cohesion: 0.13
Nodes (15): ADR-004: Modelo IRT 1PL con estimación MAP, salto de θ acotado y parada por precisión, Alternativas Evaluadas, Bandas, Consecuencias, Contexto, Decisión, Estado, Estimación (+7 more)

### Community 43 - "OBSIDIAN_WORKSPACE_GUIDE"
Cohesion: 0.13
Nodes (15): 10. Cómo se relaciona esto con Graphify, 1. Qué aporta Obsidian aquí (y qué no), 2. Qué abrir como Vault, 3. Excluir el código del Vault, 4. Convenciones de enlaces, 5. Cómo trabajar día a día, 6. Plugins: uso moderado, 7. Reglas para evitar dependencia excesiva de Obsidian (+7 more)

### Community 44 - "GRAPHIFY_INTEGRATION_GUIDE"
Cohesion: 0.14
Nodes (14): 10. Graphify para onboarding técnico, 11. Graphify para revisión de impacto antes de modificar código, 12. Cómo evitar que Graphify reemplace la documentación oficial, 13. Mantenimiento, 1. Qué es y qué produce, 2. Dónde viven los artefactos, 3. Cuándo ejecutar Graphify, 4. Comandos útiles (+6 more)

### Community 46 - "AGENT_INSTRUCTIONS"
Cohesion: 0.15
Nodes (13): 0. Regla fundamental: Project Memory First, 10. Reglas específicas de este repositorio, 11. Checklist de cierre de sesión, 1. Reglas generales, 2. Antes de modificar código, 3. Antes de modificar infraestructura o base de datos, 4. Reglas de documentación, 5. Reglas de testing (+5 more)

### Community 47 - "HANDOFF"
Cohesion: 0.15
Nodes (13): Business Goals, Completed Work, Critical Decisions, Current State, Executive Summary, Functional Scope, HANDOFF, Immediate Next Steps (+5 more)

### Community 48 - "ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos"
Cohesion: 0.17
Nodes (12): ADR-006: Cohortes por banda de θ con confirmación al alcanzar un mínimo de inscritos, Agrupación por banda de θ, Alternativas Evaluadas, Confirmación por mínimo de inscritos, Consecuencias, Contexto, Decisión, Estado (+4 more)

### Community 49 - "Graph Report - .  (2026-08-05)"
Cohesion: 0.18
Nodes (10): Community Hubs (Navigation), Corpus Check, God Nodes (most connected - your core abstractions), Graph Freshness, Graph Report - .  (2026-08-05), Import Cycles, Knowledge Gaps, Suggested Questions (+2 more)

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
Cohesion: 0.09
Nodes (22): Alternativas de contacto (`017_contacto_alternativas.sql`), Bandas de θ (cupos), Canal de contacto preferido (`013_profile_contact_preference.sql`), Configuración de parada por banco y prerequisitos (`020_test_configs.sql`), Contexto de visitante para el admin (`015_visitor_select_admin.sql`), Control de capacidad en inscripciones (`011_enrollments_capacity_check.sql`), Email cohort (`005_email_outbox.sql`), Gestión de roles (`006_admin_role_management.sql`) (+14 more)

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

### Community 77 - "be"
Cohesion: 0.11
Nodes (11): Bb(), be(), cd(), id(), If(), jb(), kb(), Kg() (+3 more)

### Community 78 - "SESSION-008"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 79 - ".push"
Cohesion: 0.23
Nodes (8): eb(), handler(), nn(), Pm(), ta(), ua(), xa(), za()

### Community 82 - "Contenido pedagógico (capa 0 + Baldor)"
Cohesion: 0.33
Nodes (5): Contenido pedagógico (capa 0 + Baldor), Cómo mejorar `error_*` (prioridad), Migraciones de contenido, Principio, Recursos (Admin → Recursos)

### Community 83 - "`send-enrollment-emails`"
Cohesion: 0.33
Nodes (5): Edge Functions — Academia Integral, Flujo, Invocar, `send-enrollment-emails`, Setup

### Community 84 - "ADR-013: Configuración de parada por banco de preguntas y prerequisitos de tests"
Cohesion: 0.22
Nodes (9): ADR-013: Configuración de parada por banco de preguntas y prerequisitos de tests, Alternativas Evaluadas, Consecuencias, Contexto, Decisión, Estado, Fecha, Riesgos (+1 more)

### Community 85 - ".V"
Cohesion: 0.06
Nodes (152): ad(), ag(), Ah(), aI(), aj(), aL(), ap(), ar() (+144 more)

### Community 86 - ".then"
Cohesion: 0.10
Nodes (34): Af(), Cf(), de(), df(), E(), ee(), eq(), fk() (+26 more)

### Community 87 - "README.md"
Cohesion: 0.40
Nodes (4): Building for production, Development mode, Notas del proyecto, to watch css

### Community 88 - "sa"
Cohesion: 0.22
Nodes (6): bj(), Dd(), Dh(), hk(), sa(), Sf()

### Community 89 - "pd"
Cohesion: 0.17
Nodes (11): AM(), Bm(), di(), gf(), Nd(), pd(), pf(), sc() (+3 more)

### Community 93 - "na"
Cohesion: 0.16
Nodes (22): an(), bn(), Cm(), Em(), en(), fd(), fn(), Jd() (+14 more)

### Community 94 - "v"
Cohesion: 0.08
Nodes (12): CJ(), eI(), Ep(), FM(), Ga(), ik(), jI(), Km() (+4 more)

### Community 98 - "Jo"
Cohesion: 0.36
Nodes (8): Go(), Ho(), Io(), Jo(), Ko(), Lo(), Mo(), No()

### Community 101 - "t"
Cohesion: 0.09
Nodes (5): Kd(), Oj(), Pc(), t(), w()

### Community 103 - "Zb"
Cohesion: 0.15
Nodes (12): ek(), fb(), Ie(), jc(), jg(), Of(), sd(), Si() (+4 more)

### Community 105 - "htmlBuilder"
Cohesion: 0.08
Nodes (7): da(), htmlBuilder(), Ja(), Qa(), tf(), Uf(), ya()

### Community 106 - "lc"
Cohesion: 0.32
Nodes (11): ac(), dc(), ec(), fc(), hc(), kc(), lc(), rd() (+3 more)

### Community 107 - "A"
Cohesion: 0.08
Nodes (4): A(), gd(), xc(), Xo()

### Community 108 - "ae"
Cohesion: 0.09
Nodes (15): ae(), dg(), Nc(), O(), oo(), ra(), S(), Va() (+7 more)

### Community 112 - "SESSION-005"
Cohesion: 0.11
Nodes (18): Actividades realizadas, Actualizaciones requeridas en Project Memory, Archivos modificados, Archivos revisados, Bloqueos, Comandos ejecutados y resultados, Contexto de entrada, Decisiones tomadas (+10 more)

### Community 116 - "x"
Cohesion: 0.08
Nodes (32): ab(), ak(), Bc(), Bd(), ca(), cb(), ce(), cn() (+24 more)

### Community 117 - "yf"
Cohesion: 0.22
Nodes (4): bf(), sm(), Vd(), yf()

## Knowledge Gaps
- **864 isolated node(s):** `autoprefixer`, `postcss`, `shadow-cljs`, `tailwindcss`, `@supabase/supabase-js` (+859 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `v()` connect `v` to `app.js`, `N`, `.decode`, `ng`, `be`, `.push`, `kf`, `G`, `.V`, `.then`, `sa`, `pd`, `na`, `K`, `t`, `Zb`, `htmlBuilder`, `A`, `ae`, `.M`, `.indexOf`, `rg`, `.match`, `x`, `yf`, `.compare`, `D`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `K()` connect `K` to `app.js`, `N`, `.decode`, `be`, `.push`, `kf`, `G`, `.V`, `.then`, `sa`, `pd`, `na`, `v`, `u`, `mb`, `t`, `I`, `Zb`, `htmlBuilder`, `lc`, `A`, `ae`, `.M`, `.indexOf`, `Vc`, `.match`, `x`, `D`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `LESSONS_LEARNED` connect `Proceso y agentes de IA` to `BACKLOG.md`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `v()` (e.g. with `.O()` and `B()`) actually correct?**
  _`v()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `K()` (e.g. with `B()` and `ka()`) actually correct?**
  _`K()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 20 inferred relationships involving `H()` (e.g. with `bg()` and `ff()`) actually correct?**
  _`H()` has 20 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `C()` (e.g. with `.O()` and `B()`) actually correct?**
  _`C()` has 10 INFERRED edges - model-reasoned connections that need verification._