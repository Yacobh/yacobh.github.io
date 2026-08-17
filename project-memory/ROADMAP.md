# ROADMAP

Última actualización: **2026-08-16** — **el roadmap cambia de naturaleza**. Las fases F0–F11
respondían a "MVP actual → en uso"; ese trabajo está esencialmente hecho y **el proyecto no está
detenido por código**. Con el pivote de negocio del 2026-08-16
([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]], [[TESIS_DE_CRECIMIENTO]]) se abren las
fases **F12–F16**, una por vector de valor, y **F10 (Medición) deja de ser "la que más importa"
para pasar a ser una precondición dura** (es G-5). Antes: 2026-08-12 (eje de fluidez λ).

> Las fases F0–F6 son **reconstruidas** desde el historial de commits y el estado del código: no
> existía un roadmap escrito. Las fases F8–F11 fueron propuestas y quedan **confirmadas y
> reordenadas** por el pivote (esto responde parcialmente [[OPEN_QUESTIONS]] Q-14). Las fases
> F12–F16 son **decididas** el 2026-08-16 y su contenido vive en [[TESIS_DE_CRECIMIENTO]].
> No hay fechas comprometidas: el proyecto lo lleva una sola persona y la estacionalidad de la PAES
> (rendición a fin de año) sigue siendo el plazo duro **del canal B2C** — el canal B2B tiene el
> suyo propio, **marzo**, con el año escolar.

---

## Vista general

```
F0 Base técnica          ████████████ 100%  ✅ cerrada
F1 Motor IRT             ████████████ 100%  ✅ cerrada
F2 Perfil y plan         ████████████ 100%  ✅ cerrada 2026-08-09 (T-01, R-10)
                                            + eje de fluidez λ 2026-08-12 (ADR-019)
F3 Cohortes              ████████████ 100%  ✅ cerrada 2026-08-09 (T-04)
F4 Panel admin           ████████████ 100%  ✅ cerrada
F5 Email de cohorte      ████████████ 100%  ✅ cerrada 2026-08-09
F6 Captación / SEO       ██████████░░  90%  🟡 sin analytics
F7 Project Memory (PMF)  ████████████ 100%  ✅ cerrada 2026-07-26
F8 Go-live real          ████████████ 100%  ✅ cerrada 2026-08-09 ⭐
─────────────────── fin del track "MVP en uso" ───────────────────
F9  Endurecimiento       ███░░░░░░░░░  25%  🔺 pasa a requisito CONTRACTUAL con el primer colegio
F10 Medición             ░░░░░░░░░░░░   0%  ▶ = G-5, precondición dura
F11 Escala pedagógica    ░░░░░░░░░░░░   0%  ⏸ POSTERGADA hasta que el primer mercado funcione
────────────── track de negocio, decidido 2026-08-16 ──────────────
F12 Calibración (G-2)    ░░░░░░░░░░░░   0%  ▶ precondición dura de F13
F13 Producto instituc.   ░░░░░░░░░░░░   0%  (G-1) rol profesor, curso, multi-tenant
F14 Progreso medido      ░░░░░░░░░░░░   0%  (G-4) histórico de θ, Δθ
F15 Desacople de horas   ░░░░░░░░░░░░   0%  (G-3) grabadas + red de profesores
F16 Capital              ░░░░░░░░░░░░   0%  (transversal) CORFO / semilla
                                        ← estamos aquí
```

**Orden decidido** ([[TESIS_DE_CRECIMIENTO]] §5): **F12 y F10 en paralelo primero** (no se vende
sin calibrar ni se afirma sin medir) → **F13** → **F14** → **F15**. **F9** se intercala como
bloqueante justo antes del primer contrato institucional.

---

## F0 — Base técnica ✅

**Objetivo:** una SPA con sesión real y un backend con autorización confiable.

| Entregable | Estado |
|-----------|--------|
| SPA ClojureScript + re-frame desplegada en GitHub Pages con dominio propio | ✅ |
| Supabase Auth (email/password) con rehidratación de sesión | ✅ |
| Google OAuth (`sign-in-with-google` en `universo.supabase`) | ⛔ definida pero sin botón en la UI |
| `profiles` + `is_admin()` + RLS base (`admin_rls.sql`) | ✅ |
| Secciones protegidas y redirección post-login | ✅ |

**Dependencias:** cuenta Supabase, dominio, repositorio GitHub Pages.
**Hito H0:** un usuario autenticado ve contenido privado y ningún otro puede leerlo. ✅
**Riesgos de la fase:** RLS mal configurada (mitigado con verificación manual del checklist).

---

## F1 — Motor IRT ✅

**Objetivo:** un diagnóstico que estime θ con precisión suficiente en pocos ítems.

| Entregable | Estado |
|-----------|--------|
| Modelo 1PL/Rasch con estimación MAP (prior N(0,1)) | ✅ `components/tetha.cljs` |
| Newton-Raphson + clamp `[-3,3]` + `|Δθ| ≤ 0,4` | ✅ |
| Selección de ítem por cercanía a θ (ventana ±1, ampliada a ±2) | ✅ `irt/progress.cljs` |
| Información de Fisher y `SE(θ) = 1/√I` | ✅ |
| Regla de parada (min 5 / max 12 / SE ≤ 0,35) | ✅ |
| Prefetch de la siguiente pregunta | ✅ `events/test.cljs` |
| Gráfico de evolución de θ | ✅ `components/irt_chart.cljs` |
| Tests de la lógica IRT | ✅ |

**Hito H1:** el diagnóstico termina por precisión, no por número fijo de preguntas. ✅
**Riesgo remanente:** las `difficulty` del banco pueden no estar calibradas con datos reales
([[OPEN_QUESTIONS]] Q-05) — el motor es correcto, sus parámetros de entrada pueden no serlo.

---

## F2 — Perfil y plan ✅ 100 % (2026-08-09)

**Objetivo:** convertir el resultado del test en un mapa de errores accionable.

| Entregable | Estado |
|-----------|--------|
| `universo.profile/build` (θ, SE, banda, track, déficits, misconceptions, estabilidad) | ✅ |
| Materialización en `student_profiles` (`profile` JSONB) | ✅ |
| Capa 0: explicación por distractor (`questions.error_a..d`) | ✅ mecanismo y contenido |
| Capa 1: `resources` publicados por módulo | ✅ 58/61 publicados ([[BACKLOG]] T-01, 2026-08-09) |
| Módulos Baldor sembrados con contexto histórico | ✅ `002`, `004` |
| UI "Mi plan" con déficits priorizados | ✅ |
| Segundo eje del perfil: fluidez λ + tarjeta del cuadrante θ × λ | ✅ 2026-08-12 (ADR-019), **agregado después de cerrar la fase**; umbrales sin calibrar (T-65) |

**Cerrada 2026-08-09:** los 7 módulos prioritarios tienen ≥1 recurso publicado, auditado
matemáticamente uno por uno sin errores. **Residual, no bloqueante:** no se verificó "Mi plan" con
una cuenta de estudiante real en cada banda de θ (solo por API/panel); los 3 recursos de video
placeholder ([[BACKLOG]] T-52) no cubren módulos prioritarios.
**Hito H2:** un estudiante ve, para su déficit principal, la explicación del error **y** un
recurso para trabajarlo. ✅
**Riesgo de la fase:** R-10 ("Mi plan" vacío) — **cerrado 2026-08-09**.

---

## F3 — Cohortes ✅ 100 % (2026-08-09)

**Objetivo:** que el diagnóstico desemboque en un grupo de estudio viable.

| Entregable | Estado |
|-----------|--------|
| `class_slots` por `theta_band` + modalidad + `capacity` + `min_enrollments` | ✅ `001` |
| `enrollments` con RLS por estudiante | ✅ |
| Filtro puro por banda y estado (`slots.logic`) | ✅ + tests |
| "Faltan N inscritos" / confirmación automática por trigger | ✅ |
| `notifications` in-app al confirmar | ✅ |
| Admin: CRUD de cupos + roster | ✅ |
| Cupos demo en bandas distintas | ✅ `003` |

**Control de capacidad cerrado (Q-04, T-03, 2026-07-29):** trigger `011_enrollments_capacity_check.sql`
aplicado en producción. **Cupos reales publicados (T-04, 2026-08-09):** primer cupo real para el
sábado **2026-08-15 10:30** con enlace de Jitsi verdadero; cupos demo borrados. **Fase cerrada** —
con el matiz de que se publicó un cupo, no uno por banda (ver [[BACKLOG]] T-04).
**Hito H3:** un grupo real se confirma solo al alcanzar su mínimo. 🟡 **El mecanismo está completo y
verificado en producción** (T-02: trigger → notificación → outbox → correo entregado). Lo que falta
ya no es código: que se inscriban 3 estudiantes reales.
**Riesgo, ahora activo:** cupos publicados que nunca alcanzan el mínimo → estudiantes en espera sin
comunicación (R-11). Mitigación existente: cancelación manual (D-31) con aviso automático al
inscrito (T-25, migración `012`).

---

## F4 — Panel de administración ✅

**Objetivo:** operar el producto sin tocar SQL.

| Entregable | Estado |
|-----------|--------|
| Resumen con contadores + índices de apoyo (`006`) | ✅ |
| Usuarios: búsqueda, paginación, promover/degradar rol con salvaguardas | ✅ |
| Tests: listado, búsqueda, paginación | ✅ |
| Guestbook: moderación tri-state + borrado permanente | ✅ |
| Preguntas: CRUD con filtro por topic (`007`) | ✅ restaurado en `48bf525` |
| Recursos: CRUD + publicar/despublicar | ✅ |
| Cupos: CRUD + roster de inscritos | ✅ |

**Hito H4:** el owner puede cargar contenido y publicar cupos íntegramente desde la UI. ✅
**Riesgo:** `admin.cljs` (1060 líneas) y `events/admin.cljs` (738) concentran deuda (R-07).

---

## F5 — Email de cohorte ✅ 100 % (2026-08-09)

**Objetivo:** que el estudiante se enteré de la confirmación aunque no vuelva a la plataforma.

| Entregable | Estado |
|-----------|--------|
| Tabla `email_outbox` + índice parcial de pendientes | ✅ escrito y aplicado (`005`) |
| Trigger `notifications_enqueue_email` | ✅ escrito y verificado en producción |
| Edge Function `send-enrollment-emails` (Deno + Resend, 25 filas/invocación, `attempts`/`last_error`) | ✅ desplegada |
| Degradación sin `RESEND_API_KEY` (503, cola intacta) | ✅ implementada |
| **Migración aplicada en el proyecto real** | ✅ verificado |
| **Function desplegada + secret configurado** | ✅ verificado (`mail.jacobocordova.com` verificado en Resend) |
| **Cron cada ~5 min** | ✅ configurado (`pg_cron`/`pg_net` — el dashboard de este plan no ofrece Schedules de Edge Functions) |
| Verificación end-to-end (fila `sent` con `sent_at`) | ✅ verificado en vivo, dos veces (envío manual + cadena completa vía cupo confirmado real) |

**Hito H5:** un estudiante recibe el correo de confirmación de su grupo. ✅
**Riesgo:** R-12 (entregabilidad) mitigado — dominio verificado, entrega confirmada a bandeja
principal en ambas pruebas. Ver [[BACKLOG]] T-02, `sessions/SESSION-013.md`.

---

## F6 — Captación y SEO 🟡 90 %

| Entregable | Estado |
|-----------|--------|
| Landing de conversión (hero, 4 pasos, 4 pilares, FAQ, CTA único) | ✅ `38fbb96` |
| Testimonios reales desde guestbook aprobado | ✅ |
| Metadatos, Open Graph, Twitter Card | ✅ |
| JSON-LD (`EducationalOrganization`, `Course`, `FAQPage`) con gratuidad acotada | ✅ `b6ae903` |
| `sitemap.xml`, `robots.txt`, `canonical`, `noscript` | ✅ |
| **Analytics / medición del funnel** | ⛔ |
| Resolver duplicación `index.html` ↔ `public/index.html` | ⛔ (T-12) |

**Hito H6:** el sitio es indexable y comunica la oferta sin ambigüedad. ✅ (medición pendiente)

---

## F7 — Project Memory First ✅ (2026-07-26)

| Entregable | Estado |
|-----------|--------|
| `project-memory/` completo (brief, negocio, requisitos, arquitectura, estado, riesgos…) | ✅ |
| `adr/` con 10 ADRs, incluidas las decisiones retroactivas | ✅ |
| `sessions/` con plantilla y SESSION-001 | ✅ |
| `prompts/` por tipo de tarea + arranque y cierre de sesión | ✅ |
| `CLAUDE.md` como punto de entrada del agente | ✅ |
| Snapshot de Graphify en `project-memory/graph/` | ✅ |
| Guías de Obsidian y Graphify | ✅ |

**Hito H7:** una sesión nueva de IA puede continuar sin el chat original. ✅

---

## F8 — Go-live real ✅ 100 % (2026-08-09) ⭐

**Objetivo:** pasar de "MVP operable" a "MVP en uso por estudiantes reales".

| Entregable | Tarea |
|-----------|-------|
| Recurso publicado por módulo prioritario ✅ (2026-08-09) | T-01 |
| Email de cohorte verificado end-to-end ✅ (2026-08-09) | T-02 |
| Control de capacidad confirmado ✅ (2026-07-29) | T-03 |
| **Cupos reales publicados (fecha, sala/enlace, mínimo)** ✅ (2026-08-09, sábado 2026-08-15 10:30) | T-04 |
| Árbol limpio y bundle recompilado y publicado en `main` ✅ (2026-07-29, reverificado 2026-08-09) | T-08 |
| Banco de ítems ya no descargable, cerrado en producción ✅ (2026-08-09) | T-47 |
| `difficulty` reescalada — topics ya alcanzables (calibración estadística sigue pendiente, T-29) ✅ | T-50 |
| Preguntas de producto respondidas (Q-02 ✅, Q-04 ✅, Q-12 ✅; Q-07/Q-10/Q-14 siguen abiertas) | — |

**Fase cerrada el 2026-08-09.** Todos los entregables de construcción están completos: el funnel
funciona de punta a punta y hay un cupo real esperando inscritos.

**Hito H8:** el primer estudiante externo completa el funnel y queda inscrito en un cupo real que
se confirma. **Todavía no ocurre, y ya no depende de código** — depende de que alguien externo
llegue al sitio. Ese es el cambio de naturaleza del proyecto: cerrar F8 no significa tener
estudiantes, significa que ya no hay excusa técnica para no tenerlos.
**Dependencias ahora:** difusión y captación (sin ticket, porque no es trabajo de repositorio).
**Riesgos:** R-01 (bus factor), R-11 (cupos que no confirman), R-06 (privacidad con usuarios
reales menores de edad — **este es el riesgo que se activa al abrir a público**). R-10 y R-16 ya
cerrados.

---

## F9 — Endurecimiento 🟡 25 % — 🔺 **reclasificada 2026-08-16: requisito contractual**

> **Cambio de estatus (D-47).** Mientras el producto era B2C con estudiantes voluntarios, F9 era
> buena práctica postergable. **Con un colegio subiendo su matrícula, deja de serlo:** respaldo
> probado (T-07), staging (T-09) y verificación automatizada de policies RLS (T-11) pasan a ser
> **precondición del primer contrato institucional**, no deuda técnica. Un incidente de datos con
> menores de un establecimiento, bajo Ley 21.719 (plena vigencia 2026-12-01), no es un bug: es el
> fin del canal B2B. Ver [[RISKS]] R-06 y R-28.


| Entregable | Tarea |
|-----------|-------|
| CI mínima: `clj -M:test` en cada push/PR | T-06 ✅ (2026-08-03, sin verificar en vivo) |
| Respaldo de base de datos documentado y probado | T-07 ⛔ abierto |
| Proyecto Supabase de desarrollo (staging) | T-09 ⛔ abierto |
| Aviso de privacidad publicado | T-10 🟡 en curso — texto publicado, retención automática (T-34) pendiente |
| Verificación automatizada de policies RLS | T-11 ⛔ abierto |
| Resolver duplicación de `index.html` | T-12 ⛔ abierto |
| Alinear versiones (shadow-cljs, KaTeX) | T-13 ✅ (2026-08-09, `sessions/SESSION-014.md`) |

**Hito H9:** ningún cambio llega a producción sin tests verdes y existe un camino de vuelta ante
un error de datos.
**Riesgo de no hacerla:** el costo de un incidente (RLS o pérdida de datos) supera con holgura el
costo de esta fase.

---

## F10 — Medición ▶ = **G-5**, precondición dura

> **Reclasificada 2026-08-16 (D-51).** Deja de ser "la fase que más importa" y pasa a ser una de
> las **dos precondiciones duras** del track de negocio, junto con F12. No es que importe más: es
> que sin ella **ninguna afirmación de [[TESIS_DE_CRECIMIENTO]] §3 es verificable**, y por lo tanto
> no hay conversación posible con un colegio ni con un fondo. Razón de fondo: los tres intentos
> históricos de escalar murieron en distribución ([[RISKS]] R-19, R-30).

| Entregable | Tarea |
|-----------|-------|
| Instrumentar el funnel (landing → cuenta → diagnóstico → plan → inscripción) | T-20 |
| Vistas SQL de métricas (distribución de θ, top de déficits, cupos, outbox) | T-21 |
| Router de URL para poder medir por página y permitir deep links | T-05 |
| Panel interno con las métricas de [[BUSINESS_CONTEXT]] §6 | T-22 |
| **CAC y LTV por canal** (M-10, M-11) | E8 |
| **Pipeline B2B medido**: contactados → piloto → propuesta → contrato (M-16) | E8 |

**Hito H10:** se puede responder "¿dónde se caen los estudiantes?" con datos, no con intuición.
**Hito H12 (nuevo):** se puede responder "¿cuánto cuesta traer un cliente y cuánto deja?" con datos.

---

## F11 — Escala pedagógica ⏸ **postergada** (2026-08-16)

> **Reclasificada 2026-08-16.** Los candidatos de esta fase se repartieron: la **calibración** se
> promovió a fase propia (**F12**, porque es un vector de negocio, no una mejora pedagógica) y el
> **rol profesor** se promovió a **F13** (es el entregable que se vende). Lo que queda aquí —
> segunda materia, Matemática 2, ampliación del banco por eje PAES — queda **explícitamente
> postergado** hasta que el primer mercado funcione. Agregar producto sin resolver distribución es
> el patrón que ya falló tres veces ([[RISKS]] R-19, R-30).

Queda en esta fase, sin fecha:

- Ampliar el banco de ítems por eje PAES y completar el mapeo `topic → module-slug` (hoy parcial:
  lo no mapeado cae en `unknown/*`).
- Asistencia y seguimiento de cohortes *(reevaluar si un colegio lo pide como requisito de compra,
  [[OPEN_QUESTIONS]] Q-35)*.
- Segunda materia o Matemática 2 — **consecuencia natural de F12**: un banco calibrado hace
  portable el motor. Escalera propuesta: 2029 ([[TESIS_DE_CRECIMIENTO]] §3).

**Precondición dura, endurecida:** F9, F10 **y F12–F13 con al menos un contrato institucional
pagado**. Antes de eso, esta fase no se abre.

---

# Track de negocio (F12–F16) — decidido 2026-08-16

> Fuente única de contenido: [[TESIS_DE_CRECIMIENTO]]. Decisión:
> [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]], D-47…D-51. Tareas: épica **E8** de
> [[BACKLOG]]. Estas fases no son "más features": son las que convierten un producto terminado en
> un negocio.

## F12 — Calibración del banco (G-2) ▶ precondición dura

**Objetivo:** que la afirmación psicométrica del pitch esté respaldada por datos, no solo por el
motor.

| Entregable | Nota |
|-----------|------|
| Pipeline de calibración sobre respuestas reales: `difficulty` **estimada** en vez de asignada | 252 diagnósticos disponibles y creciendo |
| Calibración de los umbrales de fluidez (`fluency/calibration-report`) | T-65, cierra R-24 |
| Evaluación de salto a **2PL** (discriminación por ítem) | Solo cuando el volumen lo permita |
| **Reporte técnico de calibración publicable**, con metodología y limitaciones declaradas | Es el entregable de venta y de due diligence |

**Hito H13:** existe un documento que un jefe de UTP o un evaluador técnico puede leer y que
sostiene la afirmación "esto mide de verdad". **Cierra [[RISKS]] R-17** y responde Q-05.
**Riesgo de la fase:** que la calibración muestre que el banco no discrimina (ADR-025 §Seguimiento).

---

## F13 — Producto institucional (G-1)

**Objetivo:** construir lo que un colegio efectivamente compra.

| Entregable | Nota |
|-----------|------|
| Rol **`profesor`** separado de `admin` | Deja de ser exclusión ([[PROJECT_BRIEF]] §6) |
| **Panel docente**: distribución de θ del curso, déficits ordenados, misconceptions agregadas | El entregable del piloto |
| Modelo de **curso / establecimiento** y aislamiento **multi-tenant** por policies RLS | Sin backend nuevo (ADR-002 sigue vigente) |
| Aplicación del diagnóstico a un nivel completo en una hora de clase | Flujo de aula, no individual |
| Pasarela de pago y facturación de licencia anual | T-04 |
| Material de venta: piloto acotado gratuito + propuesta | Ciclo de compra: **marzo** |

**Hito H14:** un profesor externo ve el mapa de errores de su curso y dice qué haría con él (S-13).
**Hito H15:** primer contrato institucional pagado (S-15).
**Precondición dura:** F12 cerrada y **F9 cerrada** (requisito contractual, no opcional).

---

## F14 — Progreso medido (G-4)

**Objetivo:** convertir θ en evidencia de mejora, que es lo que se renueva.

| Entregable | Nota |
|-----------|------|
| **Histórico versionado** de `student_profiles`: re-diagnosticar **nunca** sobrescribe | Resuelve Q-07 (D-50) |
| Δθ por estudiante, **siempre con su error asociado** (SE) | No se comunica sin banda de confianza |
| Δθ agregado por cohorte / curso | Argumento de renovación B2B |
| Vista del estudiante: su número moviéndose en el tiempo | Bucle de retención B2C, hoy inexistente |

**Hito H16:** un estudiante ve su Δθ entre dos diagnósticos (S-16); un colegio ve el de su cohorte.
**Precondición:** un colegio con dos diagnósticos separados en el tiempo. Antes no hay qué mostrar.

---

## F15 — Desacople de las horas del fundador (G-3)

**Objetivo:** que exista margen que no dependa del calendario de una persona.

| Entregable | Nota |
|-----------|------|
| Clases grabadas por **cuadrante θ × λ × misconception** | El perfil ya calcula el cuadrante (ADR-019) |
| Asignación automática de la grabada correspondiente en "Mi plan" | Reusa la capa 1 existente |
| **Red de profesores** con comisión: reciben grupos ya clasificados | Requiere contrato y rol nuevo |
| Métrica M-15: ingreso que no depende de horas del fundador / total | Mide si R-01 se resuelve |

**Hito H17:** existe al menos una línea de ingreso cuyo margen no depende de una hora de Jacobo
(S-17). **Precondición deliberada:** demanda que el fundador ya no dé abasto para atender.
Construir capacidad antes de que el mercado responda es inventar oferta.

---

## F16 — Capital (transversal)

**Objetivo:** financiar F12–F15 sin que dependan de las horas libres de una persona.

| Entregable | Nota |
|-----------|------|
| Tesis de inversión y uso de fondos | Ya escritos: [[TESIS_DE_CRECIMIENTO]] §4 |
| Validación de supuestos de mercado (precio, tamaño, fondos SEP/PIE) | T-80, A-14…A-18 |
| Identificar programas y ventanas vigentes 2026–2027 | Q-34 — montos **sin verificar** |
| Primera contratación al haber ingreso recurrente | Es la salida real de R-01 |

**Hito H18:** el proyecto deja de tener bus factor = 1.
**Antecedente que no se oculta en ninguna postulación:** dos intentos previos de financiamiento sin
éxito (2012–13 Venezuela, 2025 UNAP). La diferencia declarada esta vez es que hay producto en
producción y datos reales, no una propuesta en papel.

---

## Roadmap de negocio del fundador (documento fuente, no verificado en código)

> **Nota del 2026-08-16.** Esta sección se conserva sin editar como transcripción del "Libro del
> Proyecto". **Ya no es el único roadmap de negocio del proyecto:** F12–F16 arriba son el plan
> comercial vigente y decidido ([[TESIS_DE_CRECIMIENTO]]). Donde el libro y las fases F12–F16 se
> contradicen —principalmente en el orden (el libro pone contenido narrativo antes que medición y
> venta) y en el uso de fondos— **gana el track F12–F16**. Lo que el libro anticipó bien y esta
> tesis confirma: piloto institucional, equipo mínimo, búsqueda de CORFO/semilla, y expansión
> multi-materia como horizonte largo.


El "Libro del Proyecto" (borrador v0.1, 2026-07-27 — ver [[VISION_LIBRO_PROYECTO]] §6) declara su
propio roadmap, con fases y horizontes de tiempo **distintos** a las fases F0–F11 de arriba. Se deja
por separado en vez de fusionarlo porque tiene otra procedencia (intención del fundador, no
historial de commits) y otro grado de certeza:

- **Fases del libro:** 1 Prototipo, 2 Motor adaptativo, 3 Contenido narrativo histórico,
  4 Paneles y métricas, 5 Escalabilidad. Las fases 1 y 2 ya están superadas por el código actual
  (F0–F1); la 3, 4 y 5 no tienen trabajo iniciado.
- **Corto plazo (0–6 meses):** banco de 200+ preguntas de álgebra validadas, primeras 5 lecturas
  narrativas, 100 usuarios activos en piloto, primer dashboard de métricas.
- **Mediano plazo (6–18 meses):** geometría/funciones/estadística, modelo freemium →
  suscripción, primer piloto institucional, equipo mínimo (fundador + 1 dev + 1 redactor),
  búsqueda de inversión semilla o CORFO/Start-Up Chile.
- **Largo plazo (18+ meses):** otras asignaturas, internacionalización, IA generativa para
  personalización, certificaciones propias, tutores en vivo.

**Relación con F8–F11:** el roadmap del libro asume una expansión de negocio (multi-materia, pago,
inversión) que hoy no está decidida ni reflejada en ninguna tarea de [[BACKLOG]]. Si el owner
confirma esta dirección, corresponde crear una épica nueva y tareas T- propias en lugar de
forzarlas dentro de F8–F11 (que son estrictamente "MVP actual → en uso").

## Hitos, resumidos

| Hito | Descripción | Estado |
|------|-------------|--------|
| H0 | Autorización confiable | ✅ |
| H1 | Diagnóstico que para por precisión | ✅ |
| H2 | Plan con explicación + recurso para el déficit principal | ✅ (2026-08-09) |
| H3 | Cohorte real que se confirma sola | 🟡 mecanismo completo y verificado; falta que se inscriban 3 personas |
| H4 | Operación completa desde el panel | ✅ |
| H5 | Email de confirmación recibido | ⚠️ |
| H6 | Sitio indexable y claro | ✅ |
| H7 | Memoria del proyecto autosuficiente | ✅ |
| H8 | Primer estudiante externo inscrito en cupo confirmado | ▶ **plataforma lista desde 2026-08-09; ahora depende de difusión, no de código** |
| H9 | Tests en CI + respaldo probado | ⛔ **ahora requisito contractual de F13** |
| H10 | Funnel medido | ⛔ = G-5 |
| **H12** | **CAC y LTV medidos en al menos un canal** | ⛔ (F10 / G-5) |
| **H13** | **Reporte de calibración que sostiene la afirmación psicométrica** | ⛔ (F12 / G-2) |
| **H14** | **Un profesor externo usa el panel de su curso** | ⛔ (F13 / G-1) |
| **H15** | **Primer contrato institucional pagado** | ⛔ (F13 / G-1) |
| **H16** | **Un estudiante y un colegio ven su Δθ** | ⛔ (F14 / G-4) |
| **H17** | **Una línea de ingreso sin horas del fundador** | ⛔ (F15 / G-3) |
| **H18** | **Bus factor > 1** | ⛔ (F16) |

**El hito que define el año:** H15. Todo lo demás de este track es camino hacia él, o consecuencia
suya.

---

Relacionado: [[TESIS_DE_CRECIMIENTO]] · [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]] ·
[[CURRENT_STATUS]] · [[BACKLOG]] · [[RISKS]] · [[PROJECT_BRIEF]] · [[OPEN_QUESTIONS]]
