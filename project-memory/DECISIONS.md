# DECISIONS

Última actualización: **2026-07-28**

Registro central de decisiones. Cada decisión con consecuencias arquitectónicas o de producto tiene
un **ADR** en `../adr/`. Este archivo es el índice y el lugar donde viven las decisiones **menores**
que no justifican un ADR completo.

**Regla:** si una decisión (a) cambia la arquitectura, (b) es difícil de revertir, (c) descarta
alternativas relevantes o (d) alguien podría cuestionar en seis meses → **ADR**. Si no, va a §2.

---

## 1. Índice de ADRs

| ADR | Título | Estado | Fecha | Área |
|-----|--------|--------|-------|------|
| [[../adr/ADR-001-clojurescript-re-frame-shadow-cljs]] | ClojureScript + re-frame + shadow-cljs como stack de frontend | Aprobada | 2025-05-03 (retro.) | Stack |
| [[../adr/ADR-002-supabase-como-unico-backend]] | Supabase como único backend; RLS como límite de seguridad | Aprobada | 2025-06-01 (retro.) | Arquitectura |
| [[../adr/ADR-003-github-pages-artefacto-versionado]] | GitHub Pages con `public/js/app.js` versionado en Git | Aprobada | 2025-09-16 (retro.) | Despliegue |
| [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]] | IRT 1PL/Rasch + MAP N(0,1) + Δθ ≤ 0,4 + parada por SE ≤ 0,35 | Aprobada | 2026-02-21 (retro.) | Dominio |
| [[../adr/ADR-005-banco-de-items-en-vez-de-cms]] | El contenido vive en el banco de ítems (capa 0), no en un CMS | Aprobada | 2026-07-24 (retro.) | Producto |
| [[../adr/ADR-006-cohortes-por-banda-con-minimo-de-inscritos]] | Cohortes por banda de θ con confirmación al mínimo de inscritos | Aprobada | 2026-07-24 (retro.) | Producto |
| [[../adr/ADR-007-email-outbox-con-edge-function]] | Email por tabla outbox + Edge Function (Resend) | Aprobada | 2026-07-24 (retro.) | Integración |
| [[../adr/ADR-008-archivar-mathacademy]] | Archivar MathAcademy y mantener un funnel único | Aprobada | 2026-07-24 (retro.) | Producto |
| [[../adr/ADR-009-logica-pura-testeable]] | Reglas de negocio en namespaces puros y testeados | Aprobada | 2026-07-25 (retro.) | Ingeniería |
| [[../adr/ADR-010-adopcion-project-memory-first]] | Adopción de Project Memory First (Markdown + Git + Claude Code + Obsidian + Graphify) | Aprobada | 2026-07-26 | Proceso |

> **(retro.)** = decisión tomada de facto en el código antes de existir este registro; el ADR la
> documenta retroactivamente con la fecha aproximada del commit que la materializó. El contexto está
> reconstruido: si el owner recuerda una motivación distinta, corregir el ADR (no borrarlo).

---

## 2. Decisiones menores (sin ADR propio)

| # | Fecha | Decisión | Motivo | Evidencia |
|---|-------|----------|--------|-----------|
| D-01 | 2026-07-24 | Acotar la gratuidad en el JSON-LD al **diagnóstico, perfil y plan**; los cupos se publican por separado | No prometer clases gratuitas sin decisión de negocio; coherencia entre lo que se indexa y lo que se ofrece | commit `b6ae903`, `index.html` |
| D-02 | 2026-07-24 | Guestbook con moderación **tri-state** (`null` pendiente / `true` aprobado / `false` papelera) en lugar de booleano | `false` significaba a la vez "pendiente" y "rechazado"; se necesitaba papelera antes del borrado | `guestbook_tri_state.sql` |
| D-03 | 2026-07-24 | Usar entradas **aprobadas del guestbook** como testimonios de la landing | Testimonios reales sin construir un módulo aparte | `events/landing.cljs` |
| D-04 | 2026-07-24 | Un admin **no puede** cambiar su propio rol (`id <> auth.uid()`) | Salvaguarda para no quedarse sin administradores; el traspaso se hace promoviendo primero al otro | `006_admin_role_management.sql` |
| D-05 | 2026-07-24 | Trigger que impide degradar al **último** admin | Misma razón, a nivel de datos | `006` |
| D-06 | 2026-07-24 | Migraciones **idempotentes** (`if not exists`, `drop policy if exists`, upsert por slug) | Se aplican a mano sobre producción; deben poder re-ejecutarse sin daño | todas las migraciones |
| D-07 | 2026-07-25 | Θ inicial = **0,0** (arranque neutro) en lugar de un valor heredado | Con prior N(0,1), 0 es la media; evita anclar el test a un valor arbitrario | `db.cljs`, `:test/start` |
| D-08 | 2026-07-25 | **Prefetch** de la siguiente pregunta mientras se muestra el feedback | Elimina la espera perceptible entre ítems sin cambiar el algoritmo | `events/test.cljs` |
| D-09 | 2026-07-24 | Selección de ítem con ventana **±1** logit alrededor de θ, ampliada a **±2** si no hay candidatos | Concentra información cerca de θ pero evita quedarse sin ítems en bancos pequeños | `irt/progress.cljs` |
| D-10 | 2026-07-24 | Estado de carga/error **por pestaña** del panel admin | Evita que el spinner o el error de una sección contamine a las demás y permite cachear | `db.cljs` `[:admin :status]` |
| D-11 | 2026-07-22 | No versionar `public/js/cljs-runtime/`, `manifest.edn` ni `*.js.map` | Artefactos de desarrollo que inflaban el repositorio | commit `3680cb4`, `.gitignore` |
| D-12 | 2026-07-24 | Mapear cada distractor a una **idea errónea nombrable**, no a "incorrecto" | Es el diferencial del producto: explicar *por qué* se equivocó | `supabase/CONTENT.md`, `questions.error_*` |
| D-13 | 2026-07-24 | Recursos con `video_url`/`audio_url` como **URL externa**, sin subir binarios | Evita costo y complejidad de storage hasta que sea necesario | `supabase/CONTENT.md` |
| D-14 | 2026-07-26 | El **snapshot** versionado del grafo vive en `project-memory/graph/`; `graphify-out/` queda como directorio de trabajo no versionado | Separar artefacto reproducible (herramienta) de memoria citable (Git) | [[GRAPHIFY_INTEGRATION_GUIDE]] |
| D-15 | 2026-07-26 | La documentación de la memoria se escribe **en español** | Es el idioma del proyecto, del producto y del owner | [[../CLAUDE]] §6 |
| D-16 | 2026-07-26 | Enlaces internos estilo `[[ARCHIVO]]` en toda la memoria | Compatibles con Obsidian y legibles como Markdown plano en GitHub | [[OBSIDIAN_WORKSPACE_GUIDE]] |
| D-17 | 2026-07-27 | Adoptar **rtk** (compresor de salida de comandos) con hook global de Claude Code + filtro propio `.rtk/filters.toml` para `clj -M:test` | Reducir tokens de contexto gastados en salida verbosa de comandos (tests, git, grep); extiende la adopción de tooling de [[../adr/ADR-010-adopcion-project-memory-first]] | [[RTK_INTEGRATION_GUIDE]] |
| D-18 | 2026-07-28 | Bajar la mención de UNAP de "iniciativa" (badge del hero, stat del hero, CTA banner) a **nota histórica** en el FAQ y el footer ("proyecto personal... que se originó en 2025 a partir de un convenio de desarrollo con la Universidad Arturo Prat") | El vínculo fue un convenio a honorarios de alcance acotado (oct–nov 2025, ya terminado), sin autorización de marca ni alianza institucional vigente; mantenerlo como bandera activa sobrerrepresentaba el vínculo actual (ver [[OPEN_QUESTIONS]] Q-01) | `index.html`, `public/index.html`, `src/universo/home.cljs`, `src/universo/components/landing.cljs` |

---

## 3. Decisiones pendientes

Requieren decisión antes de poder avanzar en la tarea asociada. **No asumir la respuesta.**

| # | Decisión pendiente | Bloquea | Pregunta asociada |
|---|--------------------|---------|-------------------|
| P-01 | ¿Qué pasa cuando un estudiante **repite** el diagnóstico: sobrescribir el perfil, versionarlo o guardar histórico? | T-26 | [[OPEN_QUESTIONS]] Q-07 |
| P-02 | ¿Se controla la **capacidad** del cupo al inscribirse, y qué se muestra cuando está lleno? | T-03 | Q-04 |
| P-03 | ¿Las **clases** de los cupos son gratuitas o tienen costo? Define el copy y el JSON-LD. [[VISION_LIBRO_PROYECTO]] propone pago por clase/paquete — propuesta sin confirmar, no aplicada | T-04, copy | Q-02, Q-21 |
| P-04 | ¿Instrumentación del funnel con **solución propia en Postgres** o herramienta externa? (implica privacidad) | T-20 | Q-15 |
| P-05 | ¿Se introduce **router de URL** con history API? (deep links, medición, fallback de GitHub Pages) | T-05 | — |
| P-06 | ¿Cómo se configura la URL de Supabase si se crea **staging**? Hoy está inline en el código | T-09 | — |
| P-07 | ¿El flujo del estudiante debe recibir los ítems **sin** `correct_option` (validación en servidor)? | R-16 | Q-12 |
| P-08 | ¿Qué pasa con un cupo que **no alcanza** el mínimo: se cancela, se posterga o se fusionan bandas? | T-25 | Q-16 |
| P-09 | ¿Se conserva, mueve o borra el **código no alcanzable** (`mathacademy`, `jardin`, `physics`…)? | T-23 | — |
| P-10 | ¿`PROJECT_SUMMARY.md` se archiva, se reduce a un puntero o se mantiene? | T-33 | — |

Cuando una de estas se resuelva: crear el ADR correspondiente, moverla a §1 o §2, y quitarla de aquí.

---

## 4. Cómo registrar una decisión nueva

1. Copiar la plantilla de `../adr/ADR-TEMPLATE.md` a `../adr/ADR-0NN-slug-descriptivo.md`.
2. Numerar de forma consecutiva, sin reutilizar números (aunque un ADR quede rechazado).
3. Completar **Contexto** (por qué había que decidir), **Decisión** (en presente e imperativo),
   **Alternativas evaluadas** (con la razón del descarte), **Consecuencias** (buenas y malas),
   **Riesgos** y **Seguimiento**.
4. Agregar la fila en §1 de este archivo.
5. Si reemplaza a un ADR anterior: marcar el anterior como `Reemplazada por ADR-0NN` — **no
   borrarlo ni editarlo**; un ADR es un registro histórico.
6. Enlazar desde los documentos afectados ([[ARCHITECTURE]], [[REQUIREMENTS]], [[RISKS]]…).
7. Registrarlo en el `sessions/SESSION-XXX.md` de la sesión.

---

Relacionado: `../adr/` · [[ARCHITECTURE]] · [[OPEN_QUESTIONS]] · [[ASSUMPTIONS]] · [[AGENT_INSTRUCTIONS]]
