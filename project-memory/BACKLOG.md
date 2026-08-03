# BACKLOG

Última actualización: **2026-07-30**

Prioridad: **P0** bloquea go-live · **P1** necesario a corto plazo · **P2** deseable · **P3** idea.
Estado: `abierto` · `en curso` · `bloqueado` · `hecho` · `descartado`.

> Regla: una tarea sin **criterio de terminado** verificable no se toma. Si una tarea revela una
> decisión, se crea un ADR ([[DECISIONS]]).

---

## Épica E1 — Go-live real (F8)

### T-01 · Publicar contenido mínimo por módulo prioritario — **P0** · `bloqueado` (humano, revisión pendiente)

Publicar al menos un `resource` por cada módulo prioritario de `supabase/CONTENT.md`:
`aritmetica/enteros`, `aritmetica/fracciones`, `aritmetica/potencias`, `algebra/ecuaciones`,
`algebra/expresiones`, `geometria/basica`, `geometria/pitagoras`.

- **Dependencias:** `002`, `004` aplicadas (✅); Admin → Recursos (✅). Requiere autoría del profesor.
- **Terminado cuando:** para cada módulo prioritario existe ≥ 1 fila en `resources` con
  `published = true`, y "Mi plan" muestra al menos un recurso para el déficit principal de una
  cuenta de prueba en cada banda.
- **Relacionado:** [[ROADMAP]] F2/H2, [[RISKS]] R-10.

**2026-08-02:** el owner subió los volúmenes de Aritmética y Álgebra de Baldor (PDF, uso personal
en el scratchpad, no versionados). Se generaron `018_baldor_resources.sql` (20 recursos, track
`aritmetica`) y `019_baldor_algebra_resources.sql` (19 recursos, track `algebra`, + cierre del
hueco de enteros con signo) -- **39 recursos redactados desde cero**, usando la numeración de
Baldor solo como referencia bibliográfica en el título, nunca como transcripción (el libro sigue
con derechos de autor vigentes; ver cabecera de `018`). Cubre los 11 módulos de `aritmetica` +
`algebra`; quedan sin fuente los 7 de `geometria` (ningún volumen de Geometría subido todavía).
**No cierra T-01 todavía:** todo quedó sembrado con `published = false` -- falta que el owner
revise el contenido pedagógico, aplique ambas migraciones en el proyecto Supabase real, y publique
selectivamente desde Admin → Recursos. Ver `supabase/SCHEMA.md` para el detalle de alcance/hueco
por migración.

### T-02 · Cerrar el pipeline de email de cohorte — **P0** · `bloqueado` (acceso)

- Aplicar `005_email_outbox.sql` en el proyecto real.
- `supabase secrets set RESEND_API_KEY=…` (+ `EMAIL_FROM` con dominio verificado).
- `supabase functions deploy send-enrollment-emails`.
- Programar cron cada ~5 min (Dashboard → Edge Functions → Schedules).
- **Terminado cuando:** al confirmarse un cupo de prueba, la fila de `email_outbox` pasa a `sent`
  con `sent_at` poblado y el correo llega a una bandeja real (no spam).
- **Relacionado:** [[ROADMAP]] F5/H5, [[RISKS]] R-12, [[../adr/ADR-007-email-outbox-con-edge-function]].

### T-03 · Agregar control de capacidad en la inscripción — **P0** · `hecho` (2026-07-29)

**2026-07-29:** confirmado que **no existía** ningún check/trigger que impidiera que los
enrollments activos superaran `class_slots.capacity` — ver detalle en
[[OPEN_QUESTIONS]] Q-04 (respondida).

**Implementado y desplegado:**
- `supabase/migrations/011_enrollments_capacity_check.sql` — trigger
  `BEFORE INSERT OR UPDATE OF status` (`enforce_slot_capacity`) que cuenta enrollments
  `pending|confirmed` del cupo (excluyendo la propia fila) y rechaza con `raise exception 'Cupo
  lleno'` si ya alcanzó `capacity`.
- `universo.slots.logic/capacity-reached?` — espejo puro, con test en
  `test/universo/slots/logic_test.cljs` (4 assertions nuevas).
- `components/slots.cljs` refactorizado para usar `logic/capacity-reached?` en vez de calcular
  `full?` inline (regla del proyecto: lógica de negocio en namespace puro).
- `clj -M:test`: **34 tests / 133 assertions / 0 failures**.
- La UI ya comunicaba "Cupo lleno" (existía antes, solo era UI sin respaldo en DB); con la
  migración aplicada, un intento directo a la API que la sortee también falla, y
  `crud/enroll-in-slot!` ya propaga `error.message` → `:slots/enroll-fail` sin cambios adicionales.
- Commit `0fd5f79` en rama `visual-fixes`, pusheado a `origin/visual-fixes`.
- **2026-07-29:** el owner (Jacobo Córdova) confirma haber aplicado `011` en el proyecto Supabase
  real. **Nota:** el agente no verificó en vivo la inscripción N+1 (sin acceso al proyecto real);
  el criterio de "terminado" se da por cumplido según el reporte del owner, no por verificación
  independiente del agente.
- **Pendiente separado, no bloquea T-03:** la rama `visual-fixes` (este commit + `520ff79`) no está
  mergeada a `main`, así que el código de UI (incluido el refactor de `slots.cljs`) todavía no está
  en producción — aunque el trigger de la DB ya está activo y protege igual, independientemente de
  qué build de frontend esté sirviendo GitHub Pages. Ver T-19.
- **Relacionado:** [[OPEN_QUESTIONS]] Q-04 (respondida), [[REQUIREMENTS]] RF-5.10,
  `supabase/SCHEMA.md` §Control de capacidad.

### T-04 · Publicar cupos reales y retirar los demo — **P0** · `abierto` (desbloqueada, falta ejecución del owner)

**2026-07-30:** Q-09 respondida (D-27) — criterio de negocio fijado: `min_enrollments = 3`,
`capacity = 12`, modalidad **virtual**, día **sábado o domingo**, enlace de **Jitsi** (Q-24/D-30 —
elegido sobre Google Meet por ser más simple de implementar: sala ad-hoc sin cuenta ni login). El
owner define y agenda las fechas concretas y pega el enlace de Jitsi al crear el cupo. Ya no falta
ninguna decisión de negocio para crear los primeros cupos reales desde el panel de administración —
solo falta ejecutarlo (elegir fechas concretas de sábado/domingo, generar las salas de Jitsi,
crear los cupos en Admin → Cupos).

- **Terminado cuando:** existe ≥ 1 cupo `open` por banda con fecha futura real, `location_or_link`
  con un enlace de Jitsi real (no `meet.example.com`), `capacity = 12` y `min_enrollments = 3`; y
  los cupos demo de `003` están `cancelled` o borrados.
- **Relacionado:** [[OPEN_QUESTIONS]] Q-09, Q-24 (ambas respondidas).

### T-08 · Limpiar el árbol y publicar el bundle correcto — **P0** · `hecho` (2026-07-29)

La preocupación original (`public/js/app.js` con +73/−24 sin commitear, sin certeza de que
correspondiera al fuente) ya no aplicaba desde `visual-fixes` (árbol limpio desde `520ff79`).
Cerrada del todo al mergear `visual-fixes` → `main` (T-35): `clj -M:test` en verde, bundle
recompilado con `shadow-cljs release app` + `build:css`, commit `db724f3` pusheado a `main`.

**Nota operativa descubierta esta sesión:** hay procesos `shadow-cljs watch app` y
`tailwindcss --watch` corriendo en background en la máquina de desarrollo. Cada vez que un
`git checkout`/`merge` cambia archivos `.cljs` o el CSS fuente, el watcher recompila un **build de
desarrollo sin minificar** (~8,5 MB) y sobreescribe `public/js/app.js`/`public/css/app.css` en el
árbol de trabajo, aunque no haya ningún cambio de fuente real pendiente de commitear. Antes de
cualquier commit que toque esos dos archivos, correr `git status` y, si aparecen sucios sin que
uno mismo haya tocado el fuente, `git restore public/css/app.css public/js/app.js` para volver al
build de release ya commiteado — nunca commitear el build de desarrollo.
- **Terminado cuando:** `git status` limpio, `main` contiene el bundle recompilado y la app en
  producción ejecuta el funnel completo. ✅
- **Relacionado:** [[RISKS]] R-13, [[../adr/ADR-003-github-pages-artefacto-versionado]], T-35.

### T-19 · Verificar qué hay realmente en producción — **P0** · `hecho` (2026-07-29), seguimiento en T-35

**2026-07-29:** `git log main..cursor/mvp-operable-funnel` vacío (mergeada vía PR #14/#15).
Verificado por hash que `https://jacobocordova.com/public/js/app.js` es byte-a-byte idéntico a
`origin/main:public/js/app.js` (MD5 `da3cd5e1de8717d10bbc9bf602baf1c1`). Producción = `main` @
`4998785`, sin desfase.

- **Terminado cuando:** `git log main..cursor/mvp-operable-funnel --oneline` está vacío o su
  contenido está documentado en [[CURRENT_STATUS]], y se confirma qué versión sirve el dominio. ✅
- **Relacionado:** [[OPEN_QUESTIONS]] Q-13 (respondida). Sigue como T-35: mergear `visual-fixes`.

---

### T-35 · Mergear `visual-fixes` a `main` y republicar — **P1** · `hecho` (2026-07-29)

Detectado en T-19: producción servía exactamente `origin/main` @ `4998785`, pero `origin/visual-fixes`
tenía dos commits sin mergear — `520ff79` ("minor fixes": unificación de estilos en `admin.cljs`,
`admin_questions.cljs`, `contacto.cljs`, `cuenta.cljs`, `dashboard.cljs`, `diagnostic_test.cljs`,
`feedback_modal.cljs` y otros) y `0fd5f79` (T-03: control de capacidad, incluye migración `011` ya
aplicada en la DB real).

**Hecho:** `git merge --ff-only visual-fixes` sobre `main` (fast-forward, `4998785` → `db724f3`),
`clj -M:test` en verde antes de pushear, `git push origin main`. `git log main..visual-fixes` vacío
— ambas ramas apuntan al mismo commit. Ver [[LESSONS_LEARNED]] L-30 sobre el problema encontrado en
el camino (watchers de `shadow-cljs`/`tailwind` en background ensuciando el árbol durante el
checkout/merge, resuelto con `git restore` antes de cada commit).
- **Pendiente de verificación:** confirmar por hash (como en T-19) que GitHub Pages/CDN ya sirve el
  `app.js` nuevo — al momento de pushear todavía servía el hash anterior (`da3cd5e1...`), esperable
  por la propagación de la CDN (`cache-control: max-age=600` visto en el `index.html`).
- **Relacionado:** [[OPEN_QUESTIONS]] Q-13, T-19, T-03, [[LESSONS_LEARNED]] L-30.

## Épica E2 — Endurecimiento (F9)

### T-06 · CI mínima con GitHub Actions — **P1** · `hecho` (2026-08-03, sin verificar en vivo)

Workflow que en cada push/PR ejecute `clj -M:test` (JDK + Clojure CLI + cache de `~/.m2`).

**Implementado 2026-08-03:** `.github/workflows/test.yml` -- `actions/checkout` +
`actions/setup-java` (temurin 21, misma versión que el entorno local) + `actions/setup-node` (20,
con cache npm) + `DeLaGuardo/setup-clojure@13` (CLI `1.11.1.1435`, misma versión que el entorno
local) + cache de `~/.m2/repository`, `~/.gitlibs`, `~/.deps.clj`, `.cpcache` + `npm ci` +
`clj -M:test`. Corre en push y pull_request a cualquier rama (`branches: ["**"]`).
**Primer run real (2026-08-03): falló.** `DeLaGuardo/setup-clojure@13` resolvió bien la versión de
CLI -- el fallo fue `clj -M:test` en sí: `Please install rlwrap for command editing or use
"clojure" instead.` (mismo mensaje que [[LESSONS_LEARNED]] L-28, causa distinta: el runner de
GitHub nunca tuvo `rlwrap` instalado, no es que se lo hayan sacado). **Corregido:** el workflow usa
`clojure -M:test` en vez de `clj -M:test` -- verificado localmente que ambos dan el mismo resultado.

- **Terminado cuando:** un PR con un test roto queda marcado en rojo en GitHub y el badge/resultado
  es visible. **Falta verificar que el segundo run (con `clojure -M:test`) pase en verde.**
- **Nota, sigue sin implementar:** un check que avise si `src/**.cljs` cambió sin cambiar
  `public/js/app.js` (recordatorio de recompilar) -- se dejó fuera por el riesgo de falsos
  positivos (hay `.cljs` archivado/no alcanzable que no requiere recompilar) sin poder probarlo en
  vivo; se podría agregar como *check* informativo, no bloqueante, en una iteración futura.
- **Relacionado:** [[RISKS]] R-04.

### T-07 · Respaldo de la base de datos documentado y probado — **P1** · `abierto`

- **Terminado cuando:** existe un procedimiento escrito (en `docs/`) para exportar y restaurar la
  base, **ejecutado al menos una vez**, con la fecha del último respaldo registrada en
  [[CURRENT_STATUS]].
- **Relacionado:** [[RISKS]] R-03.

### T-09 · Proyecto Supabase de desarrollo (staging) — **P1** · `abierto`

- **Terminado cuando:** existe un segundo proyecto Supabase con las migraciones aplicadas en orden
  y una forma documentada de apuntar el cliente a él (hoy la URL está inline en
  `src/universo/supabase.cljs`, así que esto **requiere una decisión de configuración → ADR**).
- **Relacionado:** [[RISKS]] R-02, [[../adr/ADR-002-supabase-como-unico-backend]].

### T-10 · Publicar aviso de privacidad y revisar la recolección de datos — **P1** · `en curso`

- **2026-07-28:** publicado `universo.components.privacidad` (enlazado desde el footer), checkbox
  obligatorio de aceptación + declaración de edad (≥14 o autorización de representante) en el
  registro (`login.cljs`), y flujo de solicitud de eliminación de cuenta (notificación al admin →
  alerta en Admin/Usuarios, migración `009`). Texto revisado solo por el owner, sin abogado
  (decisión explícita, ver [[OPEN_QUESTIONS]] Q-03).
- **2026-07-28 (2):** la eliminación de cuenta se movió a una sección propia **Configuración de
  cuenta** (`:cuenta`, `components/cuenta.cljs`, enlazada desde la navegación, no una tarjeta
  dentro del tablero), que también permite editar `full_name`/`phone` en `profiles`
  (migración `010_profile_name_phone.sql`).
- **Falta para cerrar:** (a) aplicar `009_account_deletion_requests.sql` y
  `010_profile_name_phone.sql` en el proyecto Supabase real; (b) eliminar la recolección de nivel
  de batería en `visitor` (sin uso justificado); (c) T-34 (retención automática a los 12 meses) —
  hoy la política está en el texto público pero no se aplica sola.
- **Terminado cuando:** todo lo anterior está hecho y no queda ninguna recolección sin uso
  justificado documentado.
- **Relacionado:** [[RISKS]] R-06, [[OPEN_QUESTIONS]] Q-03/Q-08, T-34.

### T-34 · Automatizar retención de datos a los 12 meses de inactividad — **P2** · `abierto`

El Aviso de Privacidad (publicado en T-10) promete que, tras 12 meses de inactividad, se eliminan
los datos que identifican a la persona, conservando solo estadísticas ya anonimizadas
(no vinculables a un individuo) de las respuestas del diagnóstico. Hoy esto es solo texto: no hay
job ni proceso que lo ejecute.

- **Pendiente de diseño:** qué cuenta como "inactividad" (¿último login? ¿último test?), qué
  columnas se anonimizan vs. se borran, y cómo se ejecuta (pg_cron en Supabase, Edge Function
  programada, o proceso manual periódico mientras el volumen sea bajo).
- **Terminado cuando:** existe un proceso documentado y probado que, para una cuenta de prueba
  marcada como inactiva hace >12 meses, anonimiza sus respuestas y borra sus datos identificables.
- **Relacionado:** [[RISKS]] R-06, [[OPEN_QUESTIONS]] Q-03, T-10.

> Nota: ya existía un T-15 distinto ("Descomponer los monolitos"); este ticket se numeró T-34 para
> no chocar con él.

### T-11 · Verificación automatizada de policies RLS — **P2** · `abierto`

Script SQL o suite que valide, con dos usuarios de prueba (`user` y `admin`), que:
estudiante no lee perfiles ajenos, no escribe `questions`, no ve cupos de otra banda; admin no
puede degradarse; nunca queda el sistema sin admin.

- **Terminado cuando:** el script corre contra staging y falla si alguna aserción se rompe.

### T-12 · Resolver la duplicación de `index.html` — **P1** · `abierto`

`index.html` (raíz, servido por Pages) y `public/index.html` son casi idénticos, incluido el
JSON-LD. Riesgo de divergencia en SEO.

- **Opciones:** (a) dejar solo la raíz y ajustar `:dev-http {:root "public"}`; (b) generar la raíz
  desde `public/`; (c) documentar la duplicación y sincronizarla siempre.
- **Terminado cuando:** existe una sola fuente de verdad del HTML **o** una nota explícita en
  [[LESSONS_LEARNED]] con el procedimiento de sincronización. Si se elige (a) o (b) → **ADR**.

### T-13 · Alinear versiones de shadow-cljs y KaTeX — **P2** · `abierto`

`shadow-cljs`: 3.0.4 (`deps.edn`) vs `^2.19.2` (`package.json`). KaTeX: `^0.16.22` (npm) vs 0.16.9
(CSS por CDN).

- **Terminado cuando:** una sola versión de shadow-cljs en el repo, el CSS de KaTeX coincide con la
  versión del paquete, y `clj -M:test` + `release app` siguen en verde.

### T-14 · Arreglar `npm test` — **P3** · `hecho` (2026-08-03)

Antes `npm test` fallaba por diseño (`echo "Error: no test specified"`).

**Implementado y verificado 2026-08-03:** `package.json` `"test"` ahora es `"clj -M:test"`.
Corrido en vivo: `npm test` → 34 tests / 133 assertions / 0 failures, 0 errors -- idéntico a
`clj -M:test` directo.

- **Terminado cuando:** `npm test` delega en el comando real o el script se elimina para no
  inducir a error. ✅

---

## Épica E3 — Deuda técnica y limpieza

### T-15 · Descomponer los monolitos — **P2** · `abierto`

`components/admin.cljs` (1060), `db/crud.cljs` (975), `events/admin.cljs` (738).

- **Enfoque:** separar por dominio (usuarios / preguntas / recursos / cupos / guestbook) sin
  cambiar comportamiento, extrayendo antes la lógica pura a namespaces testeables.
- **Terminado cuando:** ningún archivo supera ~400 líneas, `clj -M:test` sigue verde y hay tests
  nuevos para la lógica extraída.
- **Relacionado:** [[RISKS]] R-07, [[../adr/ADR-009-logica-pura-testeable]].

### T-16 · Resolver `src/universo/user.cljs` — **P2** · `abierto`

Está en `.gitignore` **y** trackeado en Git (ignorar no destrackea). Nadie lo requiere.

- **Terminado cuando:** se decide y ejecuta una de dos: `git rm --cached` (si es local/personal) o
  quitarlo del `.gitignore` (si es parte del proyecto). Registrar la razón.

### T-17 · Limpiar archivos huérfanos — **P3** · `abierto`

`src/universo/components/math_render_2` (archivo **sin extensión**, no compilable),
`compile-test.clj`, `avatar.html`, `out/test.js` versionado.

- **Terminado cuando:** cada archivo está borrado, renombrado con extensión correcta, o
  documentado como intencional en `docs/`.

### T-18 · Ordenar las ramas — **P2** · `abierto`

12 locales / 11 remotas sin documentar: `01-re-flow`, `Dashboard-pro`, `clean`, `dashboard`,
`dashboard2`, `develop`, `develop-pbx-01`, `explanation`, `guestbook-admin`, `mvp`,
`test-selection`, `unifiying-re-frame`.

- **Terminado cuando:** cada rama está mergeada, borrada o listada en `docs/` con su motivo de
  permanencia; y está escrita la convención de ramas en [[../CLAUDE]] §5.

### T-23 · Decidir el destino del código no alcanzable — **P3** · `abierto`

`mathacademy*`, `improved_math_academy`, `jardin`, `particulas`, `physics`, `voz`, `battery`,
`animations`, `test_subs`, `components/tailwind`, `components/supabase_test`.

- **Terminado cuando:** o se mueven a un directorio `lab/` fuera de `:source-paths`, o se borran,
  o se documenta explícitamente que se conservan como laboratorio (decisión → nota en ADR-008).

---

## Épica E4 — Producto y experiencia

### T-05 · Router de URL con history API — **P1** · `abierto`

Hoy la navegación es solo estado en `app-db`: no hay deep links, recargar vuelve a la landing y no
se puede medir por página.

- **Terminado cuando:** `/plan`, `/cupos`, `/diagnostico`, `/admin` son URLs reales que sobreviven
  a un refresh (con el fallback de GitHub Pages resuelto), y las rutas protegidas siguen exigiendo
  sesión.
- **Nota:** decisión de diseño → **ADR**.
- **Relacionado:** [[ARCHITECTURE]] A-07, habilita T-20.

### T-24 · Estado vacío honesto en "Mi plan" y "Cupos" — **P1** · `hecho` (2026-08-03, sin verificar en vivo)

Mientras T-01 y T-04 no estén hechas, un estudiante real puede ver pantallas vacías.

**Implementado 2026-08-03** (rama `t-24-estado-vacio-honesto`):
- `components/plan.cljs`: capa 0 (explicaciones de errores) ya se mostraba siempre, independiente
  de si hay recursos publicados -- eso ya cumplía la mitad del criterio. Se pulió el mensaje de la
  sección de recursos ("Estamos preparando el material de estudio para tus módulos...") para que
  sea explícito sobre que el material está en preparación, no que falta algo roto.
- `components/slots.cljs`: el estado vacío de "Cupos" pasó de una sola línea genérica a explicar
  qué es un cupo y por qué se necesita un mínimo de inscritos, más un botón "Avisarme cuando haya
  cupo" que abre el panel de contacto ya existente (`:contacto/abrir-panel`, montado globalmente en
  `home.cljs`) -- sin tabla ni backend nuevo, usando el fallback "o al menos contacto" que el propio
  ticket permite.
- `clj -M:test`: 34/133/0/0. `shadow-cljs release app`: 0 warnings.
- **No verificado en vivo:** ambas pantallas son secciones protegidas (requieren login); el agente
  no tiene credenciales de una cuenta de prueba. Falta que el owner las revise en el navegador.

- **Terminado cuando:** sin recursos publicados, el plan muestra los errores explicados (capa 0) y
  un mensaje claro de que el material está en preparación; sin cupos en su banda, "Cupos" explica
  qué significa y ofrece avisar cuando haya (o al menos contacto). ✅ código listo, falta
  verificación visual del owner.

### T-25 · Comunicar el estado del cupo pendiente y cancelarlo si no alcanza el mínimo — **P1** · `hecho` (2026-07-30, sin verificar en vivo)

Un cupo que no alcanza el mínimo deja al estudiante esperando sin novedades (R-11).

**2026-07-30:** Q-16 respondida del todo (D-28, D-31) — política: un cupo `open` sin
`min_enrollments` se puede cancelar con **1 día de anticipación** a `starts_at`, **cancelación
manual** por el admin (no automática — sin cron/Edge Function nueva). Esto reduce mucho el alcance
real pendiente, porque dos de las tres partes **ya existen**:
- ✅ "cuántos faltan" ya se muestra al estudiante — `components/slots.cljs` línea ~51:
  `"Faltan " remaining " para confirmar · " active "/" cap " cupos"` (usa
  `logic/remaining-to-confirm`, ver T-03).
- ✅ el botón de cancelar cupo **ya existe** en el panel admin —
  `components/admin.cljs`, `:admin/set-slot-status` → `"cancelled"`, con diálogo de confirmación.
- ❌ **Lo único que falta:** cuando el admin cancela un cupo, nadie se entera. No hay ningún
  trigger/notificación para "cupo cancelado" (solo existe para "cupo confirmado",
  `confirm_slot_if_threshold` en `001`). Hace falta un trigger espejo (`AFTER UPDATE OF status ON
  class_slots WHEN new.status = 'cancelled'`) que inserte una `notification` para cada estudiante
  con enrollment `pending`/`confirmed` en ese cupo — mismo patrón que el trigger existente, mucho
  más chico que lo que se pensaba originalmente (nada de scheduling).

**Implementado 2026-07-30:** `supabase/migrations/012_slot_cancellation_notification.sql` — trigger
`notify_slot_cancelled` (`AFTER UPDATE OF status`), mismo patrón `security definer` que
`confirm_slot_if_threshold`. No requirió cambios en ClojureScript: el mensaje se inserta con texto
listo y el banner de "novedades de grupos" en `dashboard.cljs` ya renderiza cualquier notificación
no leída sin ramificar por `kind`. `clj -M:test` sigue en 34/133, sin tests nuevos (no hay lógica
pura que probar, es un insert condicional puro de SQL). Falta aplicar la migración en el proyecto
Supabase real y probar el flujo completo (cancelar un cupo de prueba, verificar que llega la
notificación) — no verificado en vivo por el agente. **2026-07-30 (más tarde):** el owner confirmó
haber aplicado `012` en el proyecto Supabase real.

- **Terminado cuando:** al cancelar un cupo desde el admin, cada estudiante inscrito recibe una
  notificación in-app de la cancelación. Migración aplicada; falta solo verificar el flujo en vivo
  contra datos reales (no bloquea T-01/go-live).
- **Relacionado:** [[OPEN_QUESTIONS]] Q-16 (respondida), [[DECISIONS]] D-28, D-31, R-11,
  `supabase/SCHEMA.md`.

### T-26 · Semántica del re-diagnóstico — **P2** · `bloqueado` (decisión Q-07)

Hoy `student_profiles` es una materialización única: repetir el test sobrescribe el perfil.

- **Terminado cuando:** está decidido (sobrescribir / versionar / histórico), implementado y el
  estudiante puede ver cómo se movió su θ entre diagnósticos.

### T-36 · Preferencia de canal de contacto (email / notificación / WhatsApp) — **P2** · `hecho` (2026-07-30, sin verificar en vivo)

Pedido del owner (2026-07-30, D-29): el estudiante debe poder elegir cómo se le contacta —
email, notificación in-app o WhatsApp — desde "Configuración de cuenta".

**Alcance fijado (2026-07-30, D-30/P-12):** WhatsApp es un enlace `wa.me/<phone>` que el admin abre
a mano usando el `phone` que ya existe en `profiles` (migración `010`) — **no** una integración de
API de WhatsApp Business. Sin infraestructura nueva.

- **Trabajo:** agregar columna `profiles.contact_preference`
  (`email`|`notification`|`whatsapp`, default `email`), selector en `components/cuenta.cljs`
  (mismo patrón que el editor de `full_name`/`phone` ya existente ahí), y mostrarla junto al
  `phone` en el panel de admin donde se gestionan cupos/notificaciones (para que el admin sepa por
  qué canal contactar). No requiere tocar `email_outbox` ni Edge Functions — el envío automático de
  email/notificación in-app al confirmar cupo sigue igual; `contact_preference` es solo
  informativo para el admin en esta primera versión (no ramifica el envío automático).
**Implementado 2026-07-30:**
- `supabase/migrations/013_profile_contact_preference.sql` — columna
  `profiles.contact_preference` (`check` constraint, default `email`).
- `components/cuenta.cljs` — selector agregado al formulario de "Tus datos", mismo patrón que
  `full_name`/`phone`; aviso si elige WhatsApp sin teléfono cargado.
- `db/crud.cljs` — `fetch-own-profile`/`update-own-profile!` incluyen `contact_preference`;
  `fetch-profiles-by-ids`/`fetch-slot-roster` incluyen `phone`/`contact_preference` para el admin.
- `components/admin.cljs` — `roster-view` muestra el canal preferido de cada inscrito y un enlace
  `wa.me/<phone>` cuando corresponde.
- `events/account.cljs` — `contact-preference` viaja de punta a punta en `:account/save-profile`.
- `clj -M:test`: 34/133 sin cambios (no hay lógica pura nueva que testear). Compilado en release
  (`shadow-cljs release app` + `build:css`), sin warnings nuevos.
- **No verificado en vivo por el agente:** requiere probar con una cuenta de prueba (guardar
  preferencia, verla reflejada en el roster del admin). **2026-07-30 (más tarde):** el owner
  confirmó haber aplicado `013` en el proyecto Supabase real.

- **Terminado cuando:** el estudiante puede elegir y guardar su canal preferido, y el admin lo ve
  al revisar un cupo/notificación (incluyendo el enlace `wa.me` listo para abrir si eligió
  WhatsApp). Migración aplicada; falta solo verificar el flujo en vivo (no bloquea T-01/go-live).
- **Relacionado:** [[OPEN_QUESTIONS]] Q-25 (respondida), [[DECISIONS]] D-29, D-30,
  `supabase/SCHEMA.md`.

---

## Épica E5 — Contenido y calidad pedagógica

### T-27 · Enriquecer `error_*` de los ítems más fallados — **P1** · `abierto`

Regla editorial de `supabase/CONTENT.md`: cada distractor con una idea errónea nombrable, 1–2
frases, KaTeX si hace falta, `module_id` correcto.

- **Terminado cuando:** los ítems de los 3 topics más fallados tienen los cuatro `error_*`
  completos y revisados.

### T-28 · Completar el mapeo `topic → module-slug` — **P1** · `abierto`

`universo.profile/topic->module-slug` cubre un subconjunto; lo demás cae en `unknown/*` y por lo
tanto **no genera déficit accionable ni recursos**.

- **Terminado cuando:** todo `topic` presente en `questions` tiene mapeo a un `modules.slug`
  existente, con test que lo verifique contra la lista de topics reales.
- **Relacionado:** [[OPEN_QUESTIONS]] Q-06.

### T-29 · Calibrar `difficulty` con datos reales — **P3** · `abierto`

- **Terminado cuando:** hay un procedimiento (query o script) que estime la dificultad empírica por
  ítem a partir de `tests`/respuestas acumuladas y se documenta cuándo re-calibrar.
- **Precondición:** volumen suficiente de diagnósticos (F10).
- **Relacionado:** [[OPEN_QUESTIONS]] Q-05, [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]].

### T-37 · Dato de origen/fecha en cada recurso, para una futura línea de tiempo de conceptos — **P3** · `idea` (sin diseño)

**2026-08-02 (pedido del owner):** aunque el Álgebra/Aritmética de Baldor no traiga contexto
histórico en todos sus apartados, cualquier recurso nuevo debería venir acompañado de un dato
curioso o una fecha de origen del concepto que se presenta -- incluso cuando hay que buscarlo
aparte del libro. La motivación declarada: esto se alinea con ubicar los conceptos matemáticos en
una **línea de tiempo**, funcionalidad que el owner quiere implementar más adelante.

- **Relación con lo ya documentado:** el campo `resources.historical_context` (`001_mvp_schema.sql`)
  ya existe y ya se usa para esto de forma libre (texto, sin fecha estructurada) -- ver `004` y los
  blurbs de `002`. La idea nueva aquí es más específica: una fecha/época **estructurada**, no solo
  prosa, pensada para ordenar y graficar una línea de tiempo -- no algo que `historical_context`
  (texto libre) resuelva por sí solo.
- **Se conecta con** [[VISION_LIBRO_PROYECTO]] §3.1 ("matemáticas como narrativa histórica"), que
  ya declara la ambición de superponer historia a los conceptos matemáticos, pero sin la dimensión
  de línea de tiempo/cronología explícita que pide este ítem -- son ideas complementarias, no la
  misma.
- **Sin diseño técnico todavía:** falta decidir si es una columna nueva (`origin_year`/`origin_era`
  en `resources` o en `modules`), un rango con incertidumbre (muchos orígenes matemáticos no tienen
  fecha exacta), y cómo se relaciona con la UI de línea de tiempo que el owner tiene en mente.
- **Terminado cuando:** existe al menos un ADR o nota de diseño que decida el modelo de datos antes
  de tocar `resources`/`modules`; no se implementa nada de esto sin esa decisión previa.
- **Relacionado:** `018_baldor_resources.sql`, `019_baldor_algebra_resources.sql` (primeros
  recursos que ya incluyen `historical_context` libre, precedente directo de este pedido).

---

## Épica E6 — Medición (F10)

### T-20 · Instrumentar el funnel — **P1** · `abierto`

Eventos: `landing_view`, `cta_click`, `signup`, `diagnostic_start`, `diagnostic_complete`,
`plan_view`, `slots_view`, `enroll`.

- **Terminado cuando:** los 8 eventos se registran (tabla propia en Supabase o herramienta
  externa) y se puede calcular la tasa de conversión entre etapas consecutivas.
- **Decisión previa:** ¿solución propia en Postgres o herramienta externa? → **ADR** (implica
  privacidad, ver T-10).

### T-21 · Vistas SQL de métricas — **P2** · `abierto`

Distribución de `theta_band`, top de `deficits` (desde `profile` JSONB), cupos publicados vs
confirmados, estado del `email_outbox`, tasa de finalización del diagnóstico.

- **Terminado cuando:** existen vistas o consultas guardadas y documentadas en `docs/`, ejecutables
  por el owner sin escribir SQL nuevo.

### T-22 · Panel interno de métricas — **P3** · `abierto`

Pestaña de admin que muestre las vistas de T-21.

- **Terminado cuando:** el owner ve las métricas de [[BUSINESS_CONTEXT]] §6 sin salir de la app.

---

## Épica E7 — Memoria del proyecto (PMF)

### T-30 · Mantener la memoria al día — **P0** · `recurrente`

En cada sesión con cambios: `CURRENT_STATUS`, `SESSION-XXX`, y lo que aplique de
`DECISIONS`/`ADR`, `BACKLOG`, `RISKS`, `ARCHITECTURE`, `ROADMAP`, `OPEN_QUESTIONS`.

- **Terminado cuando:** (nunca; es una regla permanente). Ver `prompts/session-close-memory-update.md`.

### T-31 · Refrescar el snapshot de Graphify tras cambios de código — **P2** · `recurrente`

`graphify update .` + `graphify cluster-only .` + copiar a `project-memory/graph/`.

- **Terminado cuando:** el commit indicado en `GRAPH_REPORT.md` coincide con `HEAD` en cada
  actualización de memoria relevante.

### T-32 · Extender la cobertura del grafo a `.cljs` — **P3** · `abierto`

Graphify no indexa ClojureScript hoy, por lo que el grafo no ve la lógica principal.

- **Terminado cuando:** el grafo incluye nodos de `src/**/*.cljs`, **o** está documentado en
  [[GRAPHIFY_INTEGRATION_GUIDE]] que no es posible y cuál es el sustituto (lectura dirigida de
  `src/` guiada por [[ARCHITECTURE]]).

### T-33 · Reconciliar `PROJECT_SUMMARY.md` con `project-memory/` — **P2** · `abierto`

`PROJECT_SUMMARY.md` es la doc histórica; hoy convive con la memoria nueva y contiene datos
desactualizados (lista de módulos previa al MVP).

- **Terminado cuando:** `PROJECT_SUMMARY.md` queda como puntero corto a `project-memory/INDEX.md`
  o se archiva en `docs/`, sin dejar dos versiones contradictorias del mismo hecho.

---

## Resumen por prioridad

| Prioridad | Tareas |
|-----------|--------|
| **P0** | T-01, T-02, T-03, T-04, T-08, T-19, T-30 |
| **P1** | T-05, T-06, T-07, T-09, T-10, T-12, T-20, T-24, T-25, T-27, T-28, T-35 |
| **P2** | T-11, T-13, T-15, T-16, T-18, T-21, T-26, T-31, T-33, T-34, T-36 |
| **P3** | T-14, T-17, T-22, T-23, T-29, T-32 |

---

Relacionado: [[CURRENT_STATUS]] · [[ROADMAP]] · [[RISKS]] · [[OPEN_QUESTIONS]] · [[REQUIREMENTS]]
