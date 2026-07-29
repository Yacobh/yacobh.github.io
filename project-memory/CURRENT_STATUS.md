# CURRENT_STATUS

**Fecha de corte: 2026-07-26** · Commit `48bf525` · Rama `cursor/mvp-operable-funnel`

> ⚠️ **Nota 2026-07-29:** el cuerpo de este archivo (secciones 1–9) sigue describiendo el corte del
> 26-07. Desde entonces se mergeó a `main` (commit `4998785`, PR #15 "Configuracion") el trabajo de
> UNAP/privacidad/pricing y la sección "Configuración de cuenta" (nombre, teléfono, solicitud de
> eliminación — migraciones `009`/`010`), y hoy se hizo una pasada de pulido visual (ver abajo). No
> se reescribió todo el archivo para no inventar certeza sobre partes no re-verificadas en esta
> sesión (contenido pedagógico, email de cohorte, cupos reales) — verificar esos puntos antes de
> asumirlos vigentes.
>
> **Pulido visual y fluidez (2026-07-29, rama `main`, commit base `4998785`):** nuevo kit de UI
> compartido `universo.components.ui` + `universo.events.ui` (spinner unificado con `role="status"`,
> diálogo de confirmación global que reemplaza los 10 `js/confirm()` nativos del panel admin y de
> Configuración de cuenta); color de marca unificado a indigo (antes mezclaba blue/indigo en
> login, cuenta, guestbook y el diagnóstico); overlay real (backdrop) para el modal de feedback del
> diagnóstico, que antes se renderizaba sin fondo; estados de carga agregados donde faltaban
> (`cuenta.cljs`, `plan.cljs`, `slots.cljs`); guestbook distingue error de fetch vs. lista vacía;
> accesibilidad puntual (`role="alert"` en banners de login, label del textarea de contacto, focus
> rings en preguntas del admin); código muerto eliminado (`math_render.cljs` parser duplicado,
> tres borradores de `clojure-watermark` en `resume.cljs`). `clj -M:test` sigue en
> **34 tests / 129 assertions / 0 failures**. Ver [[DECISIONS]] D-24/D-25.

> Este archivo es el "dónde estamos" canónico. **Se actualiza en toda sesión con cambios.**
> Si contradice a cualquier otro documento, este gana para "estado"; [[ARCHITECTURE]] gana para
> "cómo está construido".

---

## 1. Estado general

**Fase: MVP operable, en cierre de go-live.**

El funnel completo funciona de punta a punta: un estudiante puede registrarse, hacer el
diagnóstico adaptativo, obtener su perfil (θ, banda, déficits, misconceptions), ver su plan e
inscribirse en un cupo de su banda, con confirmación automática del grupo y notificación in-app.
El panel de administración permite operar todo el ciclo (preguntas, recursos, cupos, roles,
moderación).

Lo que falta para declarar go-live no es código: es **contenido** (recursos publicados por módulo)
y **verificación de operación** (envío de email en el proyecto Supabase real).

| Dimensión | Estado |
|-----------|--------|
| Funcionalidad del funnel | ✅ operativa |
| Panel admin | ✅ operativo |
| Tests | ✅ `34 tests / 129 assertions / 0 failures` (`clj -M:test`) |
| Contenido pedagógico | 🟡 módulos y blurbs sembrados; faltan recursos publicados |
| Email de cohorte | ⚠️ código y migración listos; despliegue/secret no verificados |
| Documentación / memoria | ✅ PMF adoptado hoy (2026-07-26) |
| CI / staging / monitoreo | ⛔ inexistentes |
| Estado del árbol de trabajo | ⚠️ sucio: `public/js/app.js` modificado sin commit |

---

## 2. Avance por fase

| Fase | Objetivo | Avance | Notas |
|------|----------|--------|-------|
| **F0 — Base técnica** | SPA + Supabase + auth + RLS | **100 %** | `admin_rls.sql`, sesión rehidratada, rutas protegidas |
| **F1 — Motor IRT** | Diagnóstico adaptativo con parada por precisión | **100 %** | 1PL + MAP, Δθ acotado, SE ≤ 0,35, prefetch |
| **F2 — Perfil y plan** | θ → banda → déficits → plan en 2 capas | **95 %** | Falta contenido publicado (capa 1) |
| **F3 — Cohortes** | Cupos por banda, inscripción, confirmación | **95 %** | Falta verificar control de `capacity` (Q-04) |
| **F4 — Admin** | Operar contenido, cupos, usuarios, moderación | **100 %** | Editor de preguntas restaurado en `48bf525` |
| **F5 — Email de cohorte** | Aviso por correo al confirmar grupo | **60 %** | `005` + Edge Function escritos; despliegue no verificado |
| **F6 — Captación** | Landing + SEO | **90 %** | Landing rehecha (`38fbb96`), JSON-LD acotado (`b6ae903`); sin analytics |
| **F7 — Memoria del proyecto** | PMF operativo | **100 %** | Este framework, 2026-07-26 |
| **F8 — Endurecimiento** | CI, staging, backups, monitoreo | **5 %** | Solo tests manuales |

---

## 3. Checklist de go-live

Del `PROJECT_SUMMARY.md` histórico, verificado y actualizado:

- [x] Migraciones MVP aplicadas en Supabase (`admin_rls`, `001`–`004`)
- [x] Seed de módulos Baldor ejecutado (`002`)
- [x] Cuenta admin creada (`profiles.role = 'admin'`)
- [x] 2–3 cupos demo (online + presencial) en bandas distintas (`003`)
- [x] RLS verificado (estudiante solo ve su perfil / sus enrollments)
- [x] `006_admin_role_management.sql` aplicada (gestión de roles desde el panel)
- [x] `007_questions_admin_rls.sql` aplicada (CRUD admin de preguntas)
- [ ] **Al menos un recurso publicado por módulo prioritario** (`004` + Admin → Recursos)
- [ ] **`005_email_outbox.sql` aplicada + Edge Function desplegada con `RESEND_API_KEY`**
- [ ] Cupos reales (no demo) publicados con fecha, sala/enlace y mínimo definidos
- [ ] Recompilar (`shadow-cljs release app` + `build:css`) y publicar en `main`

> Los ítems `006` y `007` se marcan como aplicados porque el panel depende de ellos y está
> operativo; si un entorno nuevo falla al promover un admin o al editar preguntas, esa es la causa.

---

## 4. Últimos cambios (historia reciente)

| Commit | Qué hizo |
|--------|----------|
| `48bf525` | Restaurar el editor de preguntas en el panel de administración |
| `b6ae903` | Acotar la gratuidad en JSON-LD y sincronizar los datos estructurados |
| `c5ee6bc` | Encolar emails de cupo, enriquecer contenido Baldor y archivar MathAcademy |
| `6cf0dc9` | Filtrar cupos por banda con lógica pura (`slots.logic`) y corregir la lista vacía |
| `38fbb96` | Rehacer la portada para captación y mejorar el panel de administración |
| `b40e741` | Funnel MVP operable: perfil de diagnóstico, plan y cupos híbridos |

Trabajo de esta sesión (**2026-07-26**): adopción de **Project Memory First** — creación de
`project-memory/`, `adr/`, `sessions/`, `prompts/`, reescritura de `CLAUDE.md` y snapshot del grafo
de Graphify. Ver `sessions/SESSION-001.md`.

---

## 5. Últimas decisiones

Registradas hoy de forma retroactiva (las decisiones son previas; su documentación es nueva):

- **ADR-001** ClojureScript + re-frame + shadow-cljs
- **ADR-002** Supabase como único backend; RLS como límite de seguridad
- **ADR-003** GitHub Pages con `public/js/app.js` versionado
- **ADR-004** IRT 1PL + MAP N(0,1) + Δθ ≤ 0,4 + parada por SE ≤ 0,35
- **ADR-005** Banco de ítems (capa 0) en vez de CMS
- **ADR-006** Cohortes por banda de θ con mínimo de inscritos
- **ADR-007** Email por outbox + Edge Function (Resend)
- **ADR-008** Archivar MathAcademy; funnel único en home
- **ADR-009** Lógica de negocio en namespaces puros testeados
- **ADR-010** Adopción de Project Memory First *(decisión de hoy)*

Índice completo en [[DECISIONS]].

---

## 6. Bloqueos

| # | Bloqueo | Tipo | Quién desbloquea |
|---|---------|------|------------------|
| BL-01 | **Contenido pedagógico**: no hay recursos publicados por módulo prioritario ni `error_*` enriquecidos en todos los ítems. Es trabajo humano de autoría, no de código | Humano | Jacobo Córdova |
| BL-02 | **Verificación del envío de email**: requiere acceso al proyecto Supabase (aplicar `005`, `functions deploy`, `secrets set RESEND_API_KEY`) | Acceso/operación | Jacobo Córdova |
| BL-03 | **Cupos reales**: fechas, sala en Iquique y enlaces de videollamada no están definidos (los datos actuales son demo con `meet.example.com`) | Negocio | Jacobo Córdova / UNAP |
| BL-04 | **Árbol sucio**: `public/js/app.js` tiene 73 inserciones y 24 borrados sin commitear. No se sabe con certeza si corresponde al fuente actual | Técnico | Recompilar y commitear, o descartar |
| BL-05 | **Preguntas abiertas de producto** sin responder (capacidad, repetición de diagnóstico, privacidad) | Decisión | Ver [[OPEN_QUESTIONS]] |

---

## 7. Riesgos activos (top 5)

Detalle y lista completa en [[RISKS]].

| ID | Riesgo | Severidad |
|----|--------|-----------|
| R-01 | Un solo responsable técnico y de contenido (bus factor = 1) | **Alta** |
| R-02 | Se desarrolla contra la base de producción; sin staging | **Alta** |
| R-03 | Sin respaldo propio verificado de la base de datos | **Alta** |
| R-06 | Datos personales de menores sin política de privacidad publicada | **Alta** |
| R-04 | Sin CI: nada impide publicar con tests rojos o sin recompilar | Media-alta |

---

## 8. Próximos pasos inmediatos

En orden de ejecución recomendado:

1. **Resolver el árbol sucio** (BL-04): decidir si `public/js/app.js` se recompila y commitea o se
   descarta. Regla: recompilar desde el fuente actual y commitear, nunca editar el bundle a mano.
2. **Publicar contenido mínimo** (BL-01, [[BACKLOG]] T-01): al menos un recurso publicado por cada
   módulo prioritario de `supabase/CONTENT.md`.
3. **Cerrar el email de cohorte** (BL-02, T-02): aplicar `005`, desplegar la function, setear el
   secret, invocarla una vez y verificar `email_outbox.status = 'sent'`.
4. **Verificar el control de capacidad** en la inscripción (Q-04, T-03): leer el trigger de `001`
   y, si no existe el control, agregarlo con test espejo en `slots.logic`.
5. **Publicar cupos reales** (BL-03, T-04) y retirar/marcar los demo de `003`.
6. **Responder las preguntas abiertas de producto** ([[OPEN_QUESTIONS]] Q-02, Q-04, Q-07, Q-08).
7. **Endurecimiento mínimo** (T-06, T-07): un workflow de GitHub Actions que corra `clj -M:test`, y
   un respaldo manual documentado de la base.

> Regla PMF: antes de empezar cualquiera de estos pasos, leer [[AGENT_INSTRUCTIONS]]; al
> terminarlo, actualizar este archivo y crear/actualizar el `sessions/SESSION-XXX.md`.

---

## 9. Estado del repositorio

```
Rama actual : cursor/mvp-operable-funnel
Rama deploy : main  (GitHub Pages)
Sin commitear: public/js/app.js  (+73 / −24), .gitignore (+graphify-out/, +.obsidian/)
Sin trackear : .claude/  .cursor/  .rtk/  (+ project-memory/ adr/ sessions/ prompts/ docs/ desde el 26 y 27-07-2026)
```

**Tooling del agente (2026-07-27):** `graphify` (ya estaba) y **`rtk`** (nuevo, instalado hoy) como
compresores de contexto; **Obsidian** con vault pre-configurado (`.obsidian/`, gitignorado, no
versionado por diseño). Detalle: [[RTK_INTEGRATION_GUIDE]], [[GRAPHIFY_INTEGRATION_GUIDE]],
[[OBSIDIAN_WORKSPACE_GUIDE]], [[DECISIONS]] D-17.

**Deuda de ramas:** 12 ramas locales y 11 remotas (`01-re-flow`, `Dashboard-pro`, `clean`,
`dashboard`, `dashboard2`, `develop`, `develop-pbx-01`, `explanation`, `guestbook-admin`, `mvp`,
`test-selection`, `unifiying-re-frame`). Ninguna documentada. Ver [[BACKLOG]] T-18.

**Pendiente de decisión:** `cursor/mvp-operable-funnel` no está mergeada a `main`, así que el
trabajo del MVP operable **puede no estar publicado**. Verificar `git log main..HEAD` antes de
prometer que algo está en producción ([[OPEN_QUESTIONS]] Q-13).

---

Relacionado: [[HANDOFF]] · [[BACKLOG]] · [[RISKS]] · [[ROADMAP]] · [[OPEN_QUESTIONS]] ·
`../sessions/SESSION-001.md`
