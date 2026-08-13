# ROADMAP

Última actualización: **2026-08-12** — el diagnóstico del 2026-08-09 sigue en pie: **F8 (Go-live)
cerrada con T-04**, F2/F3/F5 cerradas el mismo día, el proyecto ya no está limitado por código sino
por difusión, y **F10 (Medición) es la fase que más importa**. Novedad del 12-08: F2 recibió un
**segundo eje de perfil (fluidez λ, ADR-019)** después de cerrada — no reabre la fase, pero deja una
deuda de calibración que pertenece a F10/F11 (T-65). Ver `sessions/SESSION-016.md` y
`sessions/SESSION-021.md`.

> Las fases F0–F6 son **reconstruidas** desde el historial de commits y el estado del código: no
> existía un roadmap escrito. Las fases F8+ son propuestas y requieren confirmación del owner
> ([[OPEN_QUESTIONS]] Q-14). No hay fechas comprometidas: el proyecto lo lleva una sola persona y
> la estacionalidad de la PAES (rendición a fin de año en Chile) es el único plazo duro conocido.

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
────────────────────────────────────── ← estamos aquí
F9 Endurecimiento        ███░░░░░░░░░  25%  T-13 cerrada 2026-08-09
F10 Medición             ░░░░░░░░░░░░   0%  ▶ ahora es lo que más importa
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

## F9 — Endurecimiento 🟡 25 %

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
- Calibrar los **umbrales de fluidez** con los mismos datos (`fluency/calibration-report`): hoy el
  corte 3/6 es autoral, como lo fue `min_response_seconds = 3` antes de `032` (T-65, R-24).
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
| H2 | Plan con explicación + recurso para el déficit principal | ✅ (2026-08-09) |
| H3 | Cohorte real que se confirma sola | 🟡 mecanismo completo y verificado; falta que se inscriban 3 personas |
| H4 | Operación completa desde el panel | ✅ |
| H5 | Email de confirmación recibido | ⚠️ |
| H6 | Sitio indexable y claro | ✅ |
| H7 | Memoria del proyecto autosuficiente | ✅ |
| H8 | Primer estudiante externo inscrito en cupo confirmado | ▶ **plataforma lista desde 2026-08-09; ahora depende de difusión, no de código** |
| H9 | Tests en CI + respaldo probado | ⛔ |
| H10 | Funnel medido | ⛔ |

---

Relacionado: [[CURRENT_STATUS]] · [[BACKLOG]] · [[RISKS]] · [[PROJECT_BRIEF]] · [[OPEN_QUESTIONS]]
