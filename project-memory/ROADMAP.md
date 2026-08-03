# ROADMAP

Última actualización: **2026-07-27**

> Las fases F0–F6 son **reconstruidas** desde el historial de commits y el estado del código: no
> existía un roadmap escrito. Las fases F8+ son propuestas y requieren confirmación del owner
> ([[OPEN_QUESTIONS]] Q-14). No hay fechas comprometidas: el proyecto lo lleva una sola persona y
> la estacionalidad de la PAES (rendición a fin de año en Chile) es el único plazo duro conocido.

---

## Vista general

```
F0 Base técnica          ████████████ 100%  ✅ cerrada
F1 Motor IRT             ████████████ 100%  ✅ cerrada
F2 Perfil y plan         ███████████░  95%  🟡 falta contenido
F3 Cohortes              ███████████░  95%  🟡 falta verificar capacidad
F4 Panel admin           ████████████ 100%  ✅ cerrada
F5 Email de cohorte      ███████░░░░░  60%  ⚠️ no verificado en producción
F6 Captación / SEO       ██████████░░  90%  🟡 sin analytics
F7 Project Memory (PMF)  ████████████ 100%  ✅ cerrada 2026-07-26
────────────────────────────────────── ← estamos aquí
F8 Go-live real          ░░░░░░░░░░░░   0%  ▶ siguiente
F9 Endurecimiento        █░░░░░░░░░░░   5%
F10 Medición             ░░░░░░░░░░░░   0%
F11 Escala pedagógica    ░░░░░░░░░░░░   0%  (propuesta)
```

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

## F2 — Perfil y plan 🟡 95 %

**Objetivo:** convertir el resultado del test en un mapa de errores accionable.

| Entregable | Estado |
|-----------|--------|
| `universo.profile/build` (θ, SE, banda, track, déficits, misconceptions, estabilidad) | ✅ |
| Materialización en `student_profiles` (`profile` JSONB) | ✅ |
| Capa 0: explicación por distractor (`questions.error_a..d`) | ✅ mecanismo · 🟡 contenido |
| Capa 1: `resources` publicados por módulo | ✅ mecanismo · ⛔ contenido |
| Módulos Baldor sembrados con contexto histórico | ✅ `002`, `004` |
| UI "Mi plan" con déficits priorizados | ✅ |

**Falta para cerrar:** al menos un recurso publicado por módulo prioritario ([[BACKLOG]] T-01).
**Hito H2:** un estudiante ve, para su déficit principal, la explicación del error **y** un
recurso para trabajarlo. ⛔ **bloqueado por contenido.**
**Riesgo de la fase:** el plan se ve vacío y el producto parece incompleto aunque el código esté
correcto (R-10).

---

## F3 — Cohortes 🟡 95 %

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

**Falta para cerrar:** verificar que la inscripción respete `capacity` (Q-04, T-03) y publicar
cupos reales (T-04).
**Hito H3:** un grupo real se confirma solo al alcanzar su mínimo. 🟡
**Riesgo:** cupos publicados que nunca alcanzan el mínimo → estudiantes en espera indefinida sin
comunicación (R-11).

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

## F5 — Email de cohorte ⚠️ 60 %

**Objetivo:** que el estudiante se enteré de la confirmación aunque no vuelva a la plataforma.

| Entregable | Estado |
|-----------|--------|
| Tabla `email_outbox` + índice parcial de pendientes | ✅ escrito (`005`) |
| Trigger `notifications_enqueue_email` | ✅ escrito |
| Edge Function `send-enrollment-emails` (Deno + Resend, 25 filas/invocación, `attempts`/`last_error`) | ✅ escrita |
| Degradación sin `RESEND_API_KEY` (503, cola intacta) | ✅ implementada |
| **Migración aplicada en el proyecto real** | ⚠️ no verificado |
| **Function desplegada + secret configurado** | ⚠️ no verificado |
| **Cron cada ~5 min** | ⛔ no configurado |
| Verificación end-to-end (fila `sent` con `sent_at`) | ⛔ |

**Hito H5:** un estudiante recibe el correo de confirmación de su grupo. ⚠️
**Dependencias externas:** cuenta Resend, dominio verificado para `EMAIL_FROM`.
**Riesgo:** entregabilidad (spam) si se envía desde `onboarding@resend.dev` en lugar de un dominio
verificado (R-12).

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

## F8 — Go-live real ▶ SIGUIENTE

**Objetivo:** pasar de "MVP operable" a "MVP en uso por estudiantes reales".

| Entregable | Tarea |
|-----------|-------|
| Recurso publicado por módulo prioritario | T-01 |
| Email de cohorte verificado end-to-end | T-02 |
| Control de capacidad confirmado | T-03 |
| Cupos reales publicados (fecha, sala/enlace, mínimo) | T-04 |
| Árbol limpio y bundle recompilado y publicado en `main` | T-08 |
| Preguntas de producto respondidas (Q-02 ✅, Q-04 ✅, Q-07 sigue abierta) | — |

**Hito H8:** el primer estudiante externo completa el funnel y queda inscrito en un cupo real que
se confirma.
**Dependencias:** contenido (humano), acceso a Supabase, definición de logística de clases.
**Riesgos:** R-01 (bus factor), R-10 (plan vacío), R-11 (cupos que no confirman), R-06 (privacidad
con usuarios reales menores de edad — **este es el riesgo que se activa al abrir a público**).

---

## F9 — Endurecimiento

| Entregable | Tarea |
|-----------|-------|
| CI mínima: `clj -M:test` en cada push/PR | T-06 |
| Respaldo de base de datos documentado y probado | T-07 |
| Proyecto Supabase de desarrollo (staging) | T-09 |
| Aviso de privacidad publicado | T-10 |
| Verificación automatizada de policies RLS | T-11 |
| Resolver duplicación de `index.html` | T-12 |
| Alinear versiones (shadow-cljs, KaTeX) | T-13 |

**Hito H9:** ningún cambio llega a producción sin tests verdes y existe un camino de vuelta ante
un error de datos.
**Riesgo de no hacerla:** el costo de un incidente (RLS o pérdida de datos) supera con holgura el
costo de esta fase.

---

## F10 — Medición

| Entregable | Tarea |
|-----------|-------|
| Instrumentar el funnel (landing → cuenta → diagnóstico → plan → inscripción) | T-20 |
| Vistas SQL de métricas (distribución de θ, top de déficits, cupos, outbox) | T-21 |
| Router de URL para poder medir por página y permitir deep links | T-05 |
| Panel interno con las métricas de [[BUSINESS_CONTEXT]] §6 | T-22 |

**Hito H10:** se puede responder "¿dónde se caen los estudiantes?" con datos, no con intuición.

---

## F11 — Escala pedagógica (propuesta, sin confirmar)

Candidatos, **no comprometidos** — requieren decisión del owner (Q-14):

- Calibrar `difficulty` con las respuestas reales acumuladas (pasar de dificultad asignada a
  dificultad estimada); posible salto a 2PL cuando haya volumen.
- Ampliar el banco de ítems por eje PAES y completar el mapeo `topic → module-slug` (hoy parcial:
  lo no mapeado cae en `unknown/*`).
- Re-diagnóstico con comparación de θ y actualización del plan (Q-07 define la semántica).
- Rol "profesor" separado de `admin` (hoy excluido).
- Asistencia y seguimiento de cohortes.
- Segunda materia o Matemática 2.

**Precondición dura:** F8, F9 y F10 cerradas. Escalar contenido sin medición ni respaldo amplifica
el riesgo en lugar del valor.

---

## Roadmap de negocio del fundador (documento fuente, no verificado en código)

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
| H2 | Plan con explicación + recurso para el déficit principal | ⛔ bloqueado por contenido |
| H3 | Cohorte real que se confirma sola | 🟡 |
| H4 | Operación completa desde el panel | ✅ |
| H5 | Email de confirmación recibido | ⚠️ |
| H6 | Sitio indexable y claro | ✅ |
| H7 | Memoria del proyecto autosuficiente | ✅ |
| H8 | Primer estudiante externo inscrito en cupo confirmado | ▶ siguiente |
| H9 | Tests en CI + respaldo probado | ⛔ |
| H10 | Funnel medido | ⛔ |

---

Relacionado: [[CURRENT_STATUS]] · [[BACKLOG]] · [[RISKS]] · [[PROJECT_BRIEF]] · [[OPEN_QUESTIONS]]
