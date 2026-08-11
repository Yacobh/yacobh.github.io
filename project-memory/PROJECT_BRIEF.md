# PROJECT_BRIEF

Última actualización: **2026-07-27** · Fuente: código, migraciones SQL, landing y `PROJECT_SUMMARY.md`

> Este archivo describe el **alcance del MVP tal como está implementado**. El fundador tiene además
> una visión de negocio de largo plazo más amplia (multi-materia, pago por clase, contenido
> narrativo-histórico) documentada en [[VISION_LIBRO_PROYECTO]] — **no implementada**, y en
> tensión directa con las exclusiones de §6. No asumir que ese documento ya rige el producto.

## 1. Nombre del proyecto

**Academia Integral** — plataforma de diagnóstico adaptativo y preparación PAES Matemática 1.

- Repositorio: `Yacobh/yacobh.github.io` (GitHub)
- Dominio de producción: <https://jacobocordova.com>
- Nombre interno del código / namespace raíz: `universo` (nombre histórico; ver [[TERMINOLOGY]])
- Versión declarada: `1.1.0-mvp`

## 2. Descripción

Aplicación web de página única (SPA) en ClojureScript que:

1. Aplica un **diagnóstico adaptativo** de matemática basado en **Teoría de Respuesta al Ítem**
   (modelo 1PL/Rasch con estimación MAP), seleccionando cada ítem según la habilidad estimada (θ)
   del estudiante y deteniéndose cuando la precisión es suficiente.
2. Construye un **perfil de aprendizaje**: θ, error estándar, banda de nivel, track dominante,
   **déficits por módulo** y **misconceptions** (la idea errónea detrás de cada alternativa
   incorrecta elegida).
3. Genera un **plan de estudio** en dos capas: capa 0 (explicación del error concreto, desde
   `questions.error_a..d`) y capa 1 (recursos por módulo: lectura, video, ejercicio).
4. Publica **cupos de clases** (online o presencial en Iquique) segmentados por banda de θ, con
   confirmación automática del grupo al alcanzar un **mínimo de inscritos**, notificación in-app
   y email.
5. Ofrece un **panel de administración** para gestionar usuarios/roles, banco de preguntas,
   recursos, cupos, listas de inscritos, tests y moderación del libro de visitas.

## 3. Objetivo general

Que un estudiante que se prepara para la PAES de Matemática 1 sepa, **en una sola sesión de ~20
minutos y sin costo**, cuál es su nivel real, qué errores concretos está cometiendo, qué estudiar
primero y con qué grupo hacerlo.

## 4. Problema que resuelve

| Problema | Cómo lo aborda |
|----------|----------------|
| El estudiante no sabe por dónde empezar y estudia lo que ya domina | El diagnóstico adaptativo concentra los ítems alrededor de su θ |
| Un puntaje o nota no dice **qué** corregir | Cada distractor está mapeado a una idea errónea nombrable (capa 0) |
| Los preuniversitarios cobran y agrupan por curso, no por nivel real | Iniciativa académica sin costo, agrupación por banda de θ |
| Un curso genérico deja atrás a unos y aburre a otros | Cupos por banda `inicial / basico / intermedio / avanzado` |
| Un grupo con 2 inscritos no es viable | `class_slots.min_enrollments` + confirmación automática por trigger |
| Producir contenido pedagógico completo es caro | El valor se concentra en el **banco de ítems**, no en un CMS |

## 5. Alcance (en el MVP actual)

**Incluido y operativo:**

- Registro/login con email + contraseña (Supabase Auth); rehidratación de sesión. `sign-in-with-google`
  existe en `universo.supabase` pero no está conectado a ningún botón de la UI (`components/login.cljs`
  solo ofrece email/contraseña) — es código muerto, no una opción real para el estudiante hoy.
- Protección de secciones privadas (`:dashboard :diagnostic-test :admin :plan :cupos`).
- Diagnóstico adaptativo IRT 1PL con selección de ítem por cercanía a θ, prefetch de la siguiente
  pregunta, feedback inmediato con explicación del error y regla de parada por precisión.
- Cálculo y materialización del perfil (`student_profiles`: θ, banda, `profile` JSONB).
- "Mi plan": déficits ordenados + explicación de errores + recursos publicados por módulo.
- "Cupos": listado filtrado por la banda del estudiante, inscripción, estado
  `open → confirmed`, faltantes para confirmar, notificación in-app.
- Cola de email (`email_outbox`) + Edge Function con Resend.
- Panel admin: resumen, usuarios y roles, tests, moderación tri-state del guestbook, editor de
  preguntas, recursos y cupos con roster.
- Landing pública orientada a conversión, con SEO (metadatos, Open Graph, JSON-LD, sitemap).
- Libro de visitas moderado (testimonios) y formulario de contacto.
- Página de perfil del profesor (`:jacobocordova`).

**Incluido pero incompleto** (ver [[CURRENT_STATUS]] y [[BACKLOG]]):

- Contenido: falta al menos un recurso publicado por cada módulo prioritario.
- Email de cohorte: migración `005` + Edge Function existen; falta verificar despliegue y secret
  en el proyecto Supabase real.

## 6. Exclusiones (fuera de alcance, decidido)

- ~~Pagos / cobro de cualquier tipo~~ **Ya no excluido (D-19/D-26, 2026-07-28/30):** el
  diagnóstico, perfil y plan **siguen gratis**, pero las clases de los cupos **tendrán costo**:
  $10.000 CLP por hora, salvo la primera videollamada tras el diagnóstico, que es gratuita. Es una
  **decisión tomada**, no solo una intención -- lo que falta es implementarla (no hay pasarela de
  pago en el MVP todavía; ver [[BACKLOG]] T-04 y [[OPEN_QUESTIONS]] Q-02). Primer paso concreto
  hacia el modelo de pago por clase de [[VISION_LIBRO_PROYECTO]] §4.4.
- **Rol "profesor"** distinto de `admin`. Solo existen `user` y `admin`.
- **Asistencia, notas o certificación** de las clases.
- **Backend propio / API intermedia.** El cliente habla directo con Supabase
  (ver [[../adr/ADR-002-supabase-como-unico-backend]]).
- **App móvil nativa.** Es una web responsive; hay `site.webmanifest` pero no un PWA offline.
- **MathAcademy** (`src/universo/components/mathacademy*`, `improved_math_academy.cljs`):
  archivado, fuera del build. Ver `src/universo/components/mathacademy/ARCHIVE.md` y
  [[../adr/ADR-008-archivar-mathacademy]].
- **Módulos experimentales** no alcanzables desde `core.cljs`: `jardin`, `particulas`, `physics`,
  `voz`, `battery`, `geo`, `animations`, `test_subs`. Se conservan como laboratorio personal, no
  son parte del producto.
- **Otras materias PAES** (Lenguaje, Ciencias, Historia) y **Matemática 2**.
- **Internacionalización.** Producto en español de Chile (`es-CL`).

## 7. Stakeholders

| Rol | Quién | Interés / responsabilidad |
|-----|-------|---------------------------|
| Owner / desarrollador / profesor | **Jacobo Córdova** (`jacobocordova@gmail.com`) | Decide producto, escribe el código, dicta el contenido pedagógico. Único responsable técnico. |
| Origen histórico del proyecto | **Universidad Arturo Prat (UNAP)**, Iquique | Convenio de desarrollo a honorarios, oct–nov 2025, **ya terminado**; sin alianza institucional ni autorización de marca vigente. Se menciona solo como nota histórica de origen en footer/FAQ (D-18), no como patrocinio activo. |
| Estudiantes | Postulantes a la PAES M1, principalmente Iquique / región de Tarapacá y online en Chile | Usuarios finales: hacen el diagnóstico, siguen el plan, se inscriben en cupos. |
| Administradores de plataforma | Cuentas con `profiles.role = 'admin'` | Cargan preguntas y recursos, publican cupos, moderan testimonios, gestionan roles. |
| Proveedores | Supabase, GitHub Pages, Resend, jsDelivr (CDN KaTeX) | Servicios de los que depende la operación. Ver [[DEPENDENCIES]]. |
| Agentes de IA | Claude Code CLI y otros | Ejecutan cambios técnicos bajo [[AGENT_INSTRUCTIONS]]. |

> **Resuelto (D-18, 2026-07-28):** el vínculo con UNAP fue un convenio a honorarios de alcance
> acotado (oct–nov 2025), ya terminado, sin autorización de marca ni alianza institucional
> vigente. Ver [[OPEN_QUESTIONS]] Q-01 (respondida) y [[DECISIONS]] D-18.

## 8. Criterios de éxito

### Producto (MVP)

| # | Criterio | Estado 2026-07-26 |
|---|----------|-------------------|
| S-01 | Un estudiante completa login → diagnóstico → perfil → plan → inscripción a un cupo sin intervención manual | ✅ operativo |
| S-02 | El diagnóstico termina en ≤ 12 ítems y ≥ 5, con SE(θ) ≤ 0,35 cuando hay ítems suficientes | ✅ implementado (`irt.progress/default-stop-config`) |
| S-03 | Cada módulo prioritario tiene al menos un recurso publicado | ✅ 58/61 publicados, 2026-08-09 (T-01) |
| S-04 | Un cupo que alcanza `min_enrollments` pasa a `confirmed` y genera notificación in-app | ✅ trigger + UI |
| S-05 | El estudiante recibe email al confirmarse su grupo | ⚠️ código listo, despliegue no verificado |
| S-06 | Un estudiante nunca ve datos de otro (RLS) | ✅ verificado según checklist de go-live |

### Técnico

| # | Criterio | Estado |
|---|----------|--------|
| S-07 | `clj -M:test` en verde | ✅ 58 tests / 332 assertions / 0 failures (2026-08-10) |
| S-08 | Reglas de negocio críticas en namespaces puros con test | ✅ `profile`, `slots.logic`, `irt.progress`, `tetha` |
| S-09 | Costo de infraestructura ≈ 0 | ✅ GitHub Pages + Supabase free tier |
| S-10 | Cualquier sesión nueva puede continuar el proyecto leyendo `project-memory/` | ✅ desde este framework (2026-07-26) |

### Negocio (sin instrumentar)

No existen métricas de negocio medidas hoy (no hay analytics conectado). Las métricas propuestas
están en [[BUSINESS_CONTEXT]] §6 y su instrumentación es una tarea abierta ([[BACKLOG]] T-20).

---

Relacionado: [[BUSINESS_CONTEXT]] · [[REQUIREMENTS]] · [[ARCHITECTURE]] · [[CURRENT_STATUS]] ·
[[ROADMAP]] · [[HANDOFF]]
