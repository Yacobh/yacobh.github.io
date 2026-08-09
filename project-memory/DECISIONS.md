# DECISIONS

Última actualización: **2026-08-08** (ADR-014)

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
| [[../adr/ADR-011-vision-libro-como-norte-estrategico]] | La visión de [[../project-memory/VISION_LIBRO_PROYECTO]] es el norte estratégico; el MVP es una fase intermedia hacia ella, no el destino | Aprobada | 2026-07-30 | Producto/Negocio |
| [[../adr/ADR-012-tema-oscuro-mapeo-css-global]] | Tema oscuro mediante mapeo global de CSS (`.dark .clase-existente` en `src/css/app.css`), no `dark:` por elemento | Aprobada | 2026-08-05 | Frontend/UI |
| [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]] | Config de parada IRT por banco (`test_configs`, incl. límite de tiempo) + progresión por prerequisitos y θ mínimo derivada del historial en `tests`, sin tabla de permisos aparte | Aprobada | 2026-08-08 | Dominio/Arquitectura |
| [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] | El tiempo de respuesta es un **eje separado de θ**, no un término del 1PL; en tres fases con precondición de datos (filtro de esfuerzo → velocidad τ como segundo eje → prior condicional). Fase 1 aprobada; Fase 3 exige ADR propio que reemplace el prior de ADR-004 | Aprobada | 2026-08-08 | Dominio |
| [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] | El cliente **no lee `questions`**: el ítem viaja sin `correct_option` ni `error_*` y la corrección ocurre en el servidor (`next_question`/`score_answer`, `security definer`). Cierra la policy permisiva que dejaba el banco descargable (Q-12, R-16) | Aprobada | 2026-08-08 | Seguridad/Arquitectura |

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
| D-19 | 2026-07-28 | Las clases de los cupos **tendrán costo**, salvo la **primera clase** tras el diagnóstico (gratis); el precio de las pagadas debe quedar significativamente bajo el mercado comparable | El diagnóstico/perfil/plan se mantienen gratis (D-01) como puerta de entrada, pero el negocio necesita monetizar las clases; la primera clase gratis reduce fricción de conversión. Número exacto aún no fijado — ver P-03 | [[OPEN_QUESTIONS]] Q-02 |
| D-20 | 2026-07-28 | Aviso de Privacidad revisado solo por el **owner**, sin abogado, dado el tamaño del proyecto; se contratará asesoría legal cuando el negocio crezca | Riesgo aceptado explícitamente en lugar de bloquear la publicación esperando revisión legal que hoy no es viable | [[OPEN_QUESTIONS]] Q-03, [[AVISO_PRIVACIDAD_BORRADOR]] |
| D-21 | 2026-07-28 | Edad mínima de cuenta: **declaración propia** al registrarse ("14 años o más, o autorización de mi representante"), sin campo de fecha de nacimiento ni bloqueo duro | Ley 21.719 (vigencia 1/12/2026) exige distinto tratamiento por edad; una declaración autoafirmada es proporcional al tamaño y riesgo actual del proyecto, frente a construir un flujo de verificación/consentimiento parental completo | [[OPEN_QUESTIONS]] Q-03, `login.cljs` |
| D-22 | 2026-07-28 | Eliminación de cuenta es **semi-manual**: el usuario solicita desde "Configuración de cuenta", el admin ve la alerta en Admin → Usuarios y borra la cuenta a mano en Supabase; no hay autoservicio ni automatización | El borrado real de `auth.users` requiere `service_role`, que por seguridad nunca vive en el cliente (regla §7 de CLAUDE.md); automatizarlo entero es desproporcionado al volumen actual | [[OPEN_QUESTIONS]] Q-03, `events/account.cljs`, migración `009` |
| D-23 | 2026-07-28 | "Configuración de cuenta" es una **sección propia** (`:cuenta`, protegida, enlazada desde la navegación), no una tarjeta dentro del tablero; incluye editar `full_name`/`phone` (nuevas columnas en `profiles`, migración `010`) además de la eliminación de cuenta | El owner pidió explícitamente un apartado aparte, y `full_name`/`phone` no tenían dónde vivir — se agregaron a `profiles` (no a `auth.users` directamente) porque ya es el perfil público que admin y el resto de la app leen, y `profiles_update_own` ya permite que el usuario edite su propia fila sin policy nueva | `components/cuenta.cljs`, migración `010` |
| D-24 | 2026-07-29 | Color de marca unificado a **indigo** en toda la app (antes `login.cljs`/`cuenta.cljs`/`guestbook.cljs`/`diagnostic_test.cljs` usaban `blue-*` por herencia de código más viejo) | Indigo ya era el color dominante (logo, CTA principal, landing/dashboard/plan/cupos/admin); la app se sentía como dos productos distintos según la página | `login.cljs`, `cuenta.cljs`, `guestbook.cljs`, `diagnostic_test.cljs`, `contacto.cljs` |
| D-25 | 2026-07-29 | Los `js/confirm()` nativos del navegador se reemplazaron por un **diálogo de confirmación propio** (`universo.components.ui/confirm-dialog` + `universo.events.ui`, eventos `:confirm/ask`/`:confirm/accept`/`:confirm/cancel`), montado una sola vez en `home.cljs` | 10 sitios (8 en `admin.cljs`, 1 en `admin_questions.cljs`, 1 en `cuenta.cljs`) usaban el diálogo nativo del navegador, que rompe visualmente con el resto de la app justo en las acciones más destructivas (eliminar, cancelar) | `components/ui.cljs`, `events/ui.cljs` |
| D-26 | 2026-07-30 | ~~Precio fijado: $6.000 CLP por hora de clase~~ **Revisado por D-32 (2026-08-02)** — tras la primera videollamada gratuita; se cobra **por hora**, no por paquete | Cierra el número que P-03 dejaba pendiente; queda bajo todo el rango de mercado relevado en Q-02 (mínimo ≈ $8.000/hora) | [[OPEN_QUESTIONS]] Q-02 |
| D-27 | 2026-07-30 | Cupos reales: `min_enrollments = 3`, `capacity = 12`, **100% virtuales** por ahora, agendados **sábado o domingo**, con enlace de Google Meet o Jitsi pegado a mano en `location_or_link` | El owner confirma que lo virtual no tiene fricción logística; simplifica los primeros cupos reales sin descartar presencial a futuro | [[OPEN_QUESTIONS]] Q-09 |
| D-28 | 2026-07-30 | Un cupo que no alcanzó `min_enrollments` se puede cancelar con **un día de anticipación** a `starts_at` | Evita dejar al estudiante esperando indefinidamente un grupo que no se va a formar | [[OPEN_QUESTIONS]] Q-16 |
| D-29 | 2026-07-30 | El estudiante podrá elegir su **canal de contacto preferido** (email, notificación in-app o WhatsApp) desde "Configuración de cuenta" | Pedido explícito del owner; hoy el aviso de cupo confirmado solo sale por email + in-app, sin opción de WhatsApp ni de que el estudiante elija | [[OPEN_QUESTIONS]] Q-25, [[BACKLOG]] T-36 |
| D-30 | 2026-07-30 | **Jitsi** como plataforma de videollamada por default (no Google Meet); WhatsApp se implementa como **enlace manual `wa.me`**, no como integración de API | Ambas elegidas por simplicidad de implementación: Jitsi evita cuentas/login y límites de participantes de Meet; `wa.me` no requiere proveedor ni secret nuevo — "la sencillez es clave" con pocos estudiantes todavía | [[OPEN_QUESTIONS]] Q-24, Q-25 |
| D-31 | 2026-07-30 | La cancelación de un cupo sin mínimo (D-28) es **manual**: el admin la ejecuta a mano desde el panel, no hay proceso automático (cron/Edge Function) que la dispare | Coherente con D-26/D-30: simplicidad primero, con pocos cupos activos el admin puede revisarlos a mano; evita construir infraestructura de scheduling nueva sin necesidad probada | [[OPEN_QUESTIONS]] Q-16, [[BACKLOG]] T-25 |
| D-32 | 2026-08-02 | Precio revisado: **$10.000 CLP por hora de clase** (antes $6.000, D-26), se sigue cobrando **por hora**, primera videollamada tras el diagnóstico sigue gratis | D-26 se ancló contra el piso de clases particulares 1:1 (~$8.000/hora); el comparable correcto es el preuniversitario **grupal** (~$80.000–$120.000 CLP/mes, equivalente a ~$7.000–$15.000/hora), contra el cual $6.000 quedaba barato incluso para el formato grupal. $10.000 mantiene el producto claramente bajo el precio de un tutor 1:1 y evita tener que subir el precio más adelante (más difícil que bajarlo) una vez que haya estudiantes pagando el precio anterior | [[DECISIONS]] D-26, [[OPEN_QUESTIONS]] Q-02 |
| D-33 | 2026-08-08 | Adoptar **`clj-kondo`** como sustituto de graphify para namespaces/vars/usos en `.cljs`/`.clj` (graphify no lo indexa, [[RISKS]] R-20, y no existe extra pip que lo resuelva); instalado vía instalador oficial (no Homebrew: CLT de Xcode desactualizadas), config compartida en `.clj-kondo/config.edn` (versionada, con `.gitignore` corregido para no ignorar todo `.clj-kondo/`) | Cierra [[BACKLOG]] T-32 por la vía "documentar el sustituto", que el propio backlog ya contemplaba como aceptable; verificado contra código real del repo antes de adoptarlo (no se asumió que funcionaría) | [[GRAPHIFY_INTEGRATION_GUIDE]] §6.1, [[BACKLOG]] T-32, [[RISKS]] R-20 |

---

## 3. Decisiones pendientes

Requieren decisión antes de poder avanzar en la tarea asociada. **No asumir la respuesta.**

| # | Decisión pendiente | Bloquea | Pregunta asociada |
|---|--------------------|---------|-------------------|
| P-01 | ¿Qué pasa cuando un estudiante **repite** el diagnóstico: sobrescribir el perfil, versionarlo o guardar histórico? | T-26 | [[OPEN_QUESTIONS]] Q-07 |
| P-04 | ¿Instrumentación del funnel con **solución propia en Postgres** o herramienta externa? (implica privacidad) | T-20 | Q-15 |
| P-05 | ¿Se introduce **router de URL** con history API? (deep links, medición, fallback de GitHub Pages) | T-05 | — |
| P-06 | ¿Cómo se configura la URL de Supabase si se crea **staging**? Hoy está inline en el código | T-09 | — |
| P-07 | ¿El flujo del estudiante debe recibir los ítems **sin** `correct_option` (validación en servidor)? | R-16 | Q-12 |
| P-09 | ¿Se conserva, mueve o borra el **código no alcanzable** (`mathacademy`, `jardin`, `physics`…)? | T-23 | — |
| P-10 | ¿`PROJECT_SUMMARY.md` se archiva, se reduce a un puntero o se mantiene? | T-33 | — |
| P-11 | ¿Se abre una **épica de negocio nueva** en [[BACKLOG]] para roadmapear el camino hacia [[../project-memory/VISION_LIBRO_PROYECTO]] (ADR-011), o se sigue agregando fase por fase a F8+? | Planificación de mediano plazo | Q-21 |

**Resueltas esta ronda (2026-07-30):** P-02 (T-03, control de capacidad implementado y aplicado),
P-03 (precio fijado, D-26), P-08 (política de cancelación fijada, D-28), P-12 (WhatsApp = enlace
manual `wa.me`, D-30), P-13 (cancelación manual, no automática, D-31).

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
