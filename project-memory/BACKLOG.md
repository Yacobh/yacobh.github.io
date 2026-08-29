# BACKLOG

Última actualización: **2026-08-28** (7ª pasada: **el owner ya había aplicado `049`…`056`**, `055`/`056` en su versión original. **T-125 y T-126 cerradas**: los cuatro bancos no tenían fila en `test_configs` —414 ítems inalcanzables, medido— y `059` las crea. `055`…`059` **aplicadas y verificadas** el mismo día; no quedan migraciones pendientes (`next_question` nunca miró `questions.active`, así que retirar un ítem no lo retiraba). Antes, 6ª pasada: el eje de **probabilidad y estadística** existe — `055` crea sus seis módulos (**T-119 cerrada**) y `056` trae 102 ítems con 45 ideas erróneas nuevas. **T-124 nueva**: revisar esos 102 ítems. El owner respondió en la misma sesión las dos preguntas de contenido: la convención de cuartiles del DEMRE, y que **varianza y desviación estándar no entran en M1** — salieron 12 ítems y el módulo 340 pasó a ser `conteo`. ⚠️ `055` va **después** de `051` y `053`: crear módulos corre las bandas derivadas de los demás. Antes, 5ª pasada: el eje de **geometría** escrito — `053` bandas y `054` con 100 ítems y 33 ideas erróneas nuevas, el primer eje **sin banco previo**. **T-123 nueva**: revisar esos 100 ítems. Antes, 4ª pasada: **`049` y `050` aplicadas** por el owner, y el eje de **álgebra** escrito — `051` bandas y `052` con 100 ítems. **T-121 y T-122 nuevas**: revisar esos 100 ítems, y retirar de circulación el banco `polinomios` viejo y los once fragmentos del eje. Antes, 3ª pasada: **T-118 aprobada y escrita** en `049`, y **T-120 nueva**: revisar a mano los 100 ítems del eje de números que trae `050`, que es lo único que ningún script puede verificar. Antes, 2ª pasada: **T-118 nueva y P0** —las bandas derivadas meten el eje de números entero en [−2,85, −0,54] y con diagnósticos por eje eso agota el test, que es lo que ya pasó— y **T-119 nueva**: el eje de probabilidad no tiene módulos. Además, skill `banco-de-items` para redactar ítems y entregarlos como migración verificada). Antes: **2026-08-28** (**T-112 y T-114 cerradas** por ADR-034 —el motor modela el azar y suelta el prior—, **T-111 sigue abierta y con la aritmética peor** (la información por ítem bajó de 0,25 a ≈0,155), y **T-116 / T-117 nuevas**: recalibrar los cortes de fluidez contra el motor v2, y el 37 % de banda correcta que le queda al estudiante fuerte). Antes: **2026-08-24** (**T-115 nueva** y **T-100 ahora tiene número**: `scripts/audit_paleta.py` mide 92 usos de color de fábrica en el embudo, 87 en admin y 50 fuera del bundle, con línea base y trinquete — ADR-033). Antes: **2026-08-23** (**T-110…T-114 nuevas**, tras implementar el editor en vivo del diagnóstico —ADR-032— y evaluar el motor IRT contra ADR-004: distinguir las corridas de admin antes de calibrar (**T-110**, precondición de G-2), decidir qué se hace con la parada por precisión que hoy es inalcanzable (**T-111**), poner el ADR del estimador al día (**T-112**), el rol editor cuando exista una segunda persona (**T-113**) y evaluar 1PL con azar fijo (**T-114**)). Antes: **2026-08-17** (**T-92 cerrada**: login con Google conectado, desplegado y
verificado en producción, con D-21 respetado en las dos rutas — **ADR-028 / D-56**. Abre **T-95**
(persistir el consentimiento) y **R-33** (la pantalla de Google nombra a `supabase.co`)). Antes: **2026-08-16** (2ª pasada: **T-90 y T-91**, funnel de aula tras detectar R-31/L-36; 3ª: **T-92**, conectar login con Google — gratis, y posible puerta de entrada institucional vía Workspace, Q-37; 4ª: **T-93**, revisar el contrato de Cpech — P0 y bloqueante del canal, R-32) — **épica E8 nueva** (Motor de valor: los cinco vectores
G-1…G-5, tareas T-76…T-89), abierta por
[[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]]. Cierra P-11. Antes: 2026-08-10.

Prioridad: **P0** bloquea go-live · **P1** necesario a corto plazo · **P2** deseable · **P3** idea.
Estado: `abierto` · `en curso` · `bloqueado` · `hecho` · `descartado`.

> Regla: una tarea sin **criterio de terminado** verificable no se toma. Si una tarea revela una
> decisión, se crea un ADR ([[DECISIONS]]).

---

## Épica E1 — Go-live real (F8)

### T-01 · Publicar contenido mínimo por módulo prioritario — **P0** · `hecho` (2026-08-09)

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
**2026-08-09 (owner + agente, sesión conjunta con admin en vivo):** revisión y publicación
ejecutadas juntos, con sesión de admin real del owner. Se auditaron matemáticamente los 32 recursos
`published = false` uno por uno (comprobando cada cuenta de los ejemplos, no solo leyendo el
texto) -- **cero errores encontrados** en divisibilidad, factorización prima, fracciones,
productos notables, potencias, raíces, proporciones directas/inversas, sistemas de ecuaciones y
planteo de problemas. Se publicaron **29 de 32**; los 3 restantes son los "Video sugerido" de
`enteros`, `fracciones` y `ecuaciones_lineales` con `media_url = null` (placeholders con el texto
"Sustituye la URL... por tu lectura/grabación") -- publicarlos habría mostrado una tarjeta de video
vacía, así que quedan a propósito sin publicar hasta que el owner grabe o encuentre esos videos. El
de "Video sugerido: Teorema de Pitágoras" sí tenía URL real, verificada contra la API de YouTube
(título "PITÁGORAS CON BOLITAS", coincide con el tema) y se publicó.

**Resultado verificado en tres capas** (API, base de datos, panel real): `resources.published`
pasó de 29/61 a **58/61**. Los 7 módulos prioritarios del criterio de cierre tienen ahora ≥1
recurso publicado: `aritmetica/enteros` 7/8, `aritmetica/fracciones` 6/7, `aritmetica/potencias`
5/5, `algebra/ecuaciones` 5/6, `algebra/expresiones` 6/6, `geometria/basica` 2/2 (ya estaba cubierto
antes de esta sesión), `geometria/pitagoras` 3/3. El resumen de Admin → Recursos muestra
"Recursos publicados: 58 de 61" en pantalla, confirmado por captura.

**No verificado en esta sesión:** la segunda mitad del criterio de cierre ("Mi plan" muestra al
menos un recurso para el déficit principal de una cuenta de prueba en cada banda) -- se publicó el
contenido y se confirmó el conteo, pero no se probó "Mi plan" con una cuenta de estudiante real
navegando cada banda. Recomendado como verificación siguiente, no bloqueante.

**Hallazgo colateral relevante:** el resumen del panel muestra **80 usuarios y 252 diagnósticos
ya rendidos** -- casi todos con correo `@estudiantesunap.cl`, lo que sugiere que es el uso real del
piloto con la UNAP (D-18) y no tráfico de la landing pública actual. No investigado a fondo en esta
sesión, pero corrige la asunción de "cero estudiantes reales" que venía usándose en diagnósticos de
negocio recientes -- y es una fuente de datos real para T-29 (calibrar `difficulty`) si se decide
usarla.

### T-52 · Grabar o buscar los 3 videos placeholder de recursos — **P3** · `abierto`

Detectado al cerrar T-01 (2026-08-09): tres recursos `video_url` quedaron sin publicar porque
`media_url` es `null` -- son placeholders con el texto "Sustituye la URL en Admin → Recursos por
tu lectura/grabación del módulo". Afectan `aritmetica/enteros`, `aritmetica/fracciones` y
`algebra/ecuaciones`.

- **Trabajo:** grabar o encontrar un video apropiado para cada uno, pegar la URL en Admin →
  Recursos, y marcar "Publicado". El título y el módulo ya están cargados.
- **Terminado cuando:** los 3 tienen `media_url` real y `published = true`.
- **Relacionado:** [[BACKLOG]] T-01.

### T-02 · Cerrar el pipeline de email de cohorte — **P0** · `hecho` (2026-08-09)

- Aplicar `005_email_outbox.sql` en el proyecto real.
- `supabase secrets set RESEND_API_KEY=…` (+ `EMAIL_FROM` con dominio verificado).
- `supabase functions deploy send-enrollment-emails`.
- Programar cron cada ~5 min (Dashboard → Edge Functions → Schedules).
- **Terminado cuando:** al confirmarse un cupo de prueba, la fila de `email_outbox` pasa a `sent`
  con `sent_at` poblado y el correo llega a una bandeja real (no spam).
- **Relacionado:** [[ROADMAP]] F5/H5, [[RISKS]] R-12, [[../adr/ADR-007-email-outbox-con-edge-function]].

**2026-08-09 (cierre, verificado en vivo por el agente — no solo por reporte del owner, caso
excepcional en este proyecto):**
- CLI de Supabase instalada (D-34, mismo bloqueo de Xcode CLT que D-33) y vinculada al proyecto
  real (`jmnqklhxcdccvdhuuiji`).
- `005` ya estaba aplicada de antes (confirmado por el owner). Secrets seteados
  (`RESEND_API_KEY`, `EMAIL_FROM=hola@mail.jacobocordova.com`, tras corregir un primer intento con
  el dominio raíz sin verificar). Función desplegada con `--no-verify-jwt` (la CLI v2.113.0 ya no
  tiene `functions invoke`; se comprobó con `curl` directo al endpoint HTTPS).
- **Nivel 1 (función + Resend):** fila de prueba insertada a mano en `email_outbox`, invocada la
  función, `status → sent`, correo recibido en bandeja principal (no spam).
- **Nivel 2 (cadena completa, con datos reales de producción):** se creó un cupo desechable
  (`min_enrollments = 1`) y se inscribió una cuenta de prueba real vía `insert into enrollments`.
  Se verificó en vivo, leyendo las tablas reales: `class_slots.status → confirmed`, fila nueva en
  `notifications` (`slot_confirmed`), **dos** filas nuevas en `email_outbox` (una al estudiante,
  otra `slot_confirmed_admin` al owner — hallazgo: existe una notificación paralela al admin en
  cada confirmación de cupo, no documentada antes en `ARCHITECTURE.md`/`REQUIREMENTS.md`). Ambas
  pasaron a `sent` al invocar la función, y ambos correos llegaron a bandeja principal (confirmado
  por el owner para las dos direcciones). Datos de prueba borrados después (cupo, inscripción,
  notificación, filas de outbox).
- **Cron:** el dashboard de este proyecto no tiene la pestaña "Schedules" para Edge Functions (no
  disponible en este plan/versión) — se programó con `pg_cron` + `pg_net` en su lugar:
  `cron.schedule('send-enrollment-emails-every-5-min', '*/5 * * * *', ...net.http_post...)`.
  Confirmado registrado y `active = true` en `cron.job`. **No verificado que ya haya disparado una
  ejecución automática** (revisar `cron.job_run_details` pasados unos minutos si se quiere esa
  confirmación adicional; no bloquea el cierre porque la función y la cadena ya se probaron
  manualmente de punta a punta).
- **R-12 mitigado:** dominio `mail.jacobocordova.com` verificado en Resend, entrega confirmada a
  bandeja principal en ambas pruebas.
- **Hallazgo colateral:** la CLI de Supabase v2.113.0 eliminó el subcomando `functions invoke` que
  documentaba `supabase/functions/README.md` — el README quedó desactualizado, pendiente de
  corregir (ver [[BACKLOG]] — se puede sumar como tarea menor si se quiere, no crítico).

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

### T-04 · Publicar cupos reales y retirar los demo — **P0** · `hecho` (2026-08-09) ⭐ **último bloqueo de go-live**

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

**✅ Ejecutado por el owner el 2026-08-09.** Creó la sala de Jitsi y publicó un cupo real para el
**sábado 2026-08-15 a las 10:30**, con el enlace verdadero, y **borró todos los cupos demo**. Con
esto **cae el último bloqueo de go-live**: la plataforma queda operativa de punta a punta para un
estudiante externo (diagnóstico → perfil → plan → cupo real → confirmación automática → email).

- **Cumplido:** cupo real con fecha futura, enlace de Jitsi verdadero, demos de `003` eliminados.
- **⚠ Parcial respecto al criterio literal:** se publicó **un** cupo, no uno **por banda**. En la
  práctica eso significa que los estudiantes cuya banda no coincida con la de este cupo van a ver
  el estado vacío de T-24 en "Cupos". Es una decisión razonable para arrancar (una cohorte primero,
  ver si llega gente), pero conviene tenerlo presente al mirar métricas: una banda sin cupo no es
  falta de interés, es falta de oferta.
- **No verificado por el agente:** banda, `capacity` y `min_enrollments` del cupo publicado (sin
  credenciales de admin). Por D-27 deberían ser `capacity = 12` y `min_enrollments = 3`; vale la
  pena confirmarlo en el panel antes de difundir el enlace.
- **Ahora se activa [[RISKS]] R-11** (cupos que no alcanzan el mínimo): con `min_enrollments = 3`,
  si no llegan 3 inscritos el cupo no se confirma solo. La cancelación es manual (D-31) y el aviso
  al inscrito ya existe (T-25, migración `012`).
- **Relacionado:** [[OPEN_QUESTIONS]] Q-09, Q-24 (ambas respondidas), **T-58** (el bug que apareció
  justo mientras se ejecutaba esta tarea), [[RISKS]] R-11, R-19 (estacionalidad PAES).

### T-58 · Cambiar de pestaña borra lo que se está editando en el panel admin — **P0** · `hecho` (2026-08-09)

Reportado por el owner el 2026-08-09, **mientras ejecutaba T-04**: tenía la sala de Jitsi creada y
al volver de otra pestaña el formulario de cupo se había vaciado. Descrito como "la página se
recarga", pero **no hay ninguna recarga**: no existe `location.reload` ni handler de
`visibilitychange` en el repositorio. Es un ciclo de desmontaje/montaje.

**Cadena diagnosticada (por lectura de código, ver "Verificación" abajo):**

1. Al recuperar visibilidad la pestaña, el cliente de `@supabase/supabase-js` refresca la sesión y
   emite **`TOKEN_REFRESHED`**.
2. `events/auth.cljs:206` mete ese evento en el mismo `#{"SIGNED_IN" "TOKEN_REFRESHED"
   "USER_UPDATED"}` y despacha `:auth/session-established` — es decir, **trata un refresco de token
   como si fuera un login nuevo**.
3. `:auth/session-established` (`auth.cljs:83-84`) pone `:auth :admin? false` y `:auth :role nil`
   a propósito, con el comentario *"role/admin? se confirman al cargar profiles"*. Es correcto en
   un login real; es destructivo en un refresco donde la sesión no cambió.
4. `admin-panel` (`components/admin.cljs:1146`) tiene `(cond (nil? role) [:div "Verificando
   permisos…"] ...)`, así que con `role = nil` **renderiza el aviso en vez del panel**.
5. Eso desmonta el subárbol completo. El estado del formulario vive en un `r/atom` local de un
   componente form-2 (`slot-form`, `admin.cljs:790`), así que React lo destruye con el componente.
6. Al volver el perfil, el panel remonta y `(r/atom blank-slot)` se evalúa de nuevo → formulario en
   blanco.

**Segundo efecto encadenado:** `:auth/profile-loaded` (`auth.cljs:173`) tiene
`(and on-admin? admin?) (assoc :dispatch [:admin/enter])`, así que al reconfirmarse el rol **se
recargan todos los datos del panel**. No es lo que borra el formulario (eso lo hace el desmontaje
del paso 5), pero se suma al mismo evento y confirma cuál es el arreglo correcto: **cortar en el
origen**. Si `TOKEN_REFRESHED` deja de tratarse como sesión nueva, no se dispara
`session-established` → ni `load-profile` → ni `profile-loaded` → ni `:admin/enter`, y los dos
efectos desaparecen con un solo cambio.

**Alcance mayor que el síntoma reportado:** afecta a todos los formularios del panel con estado
local, no solo cupos — recursos (`admin.cljs:608`), preguntas y configuración de tests. Cualquier
edición larga se pierde al cambiar de pestaña.

**Arreglo propuesto (dos capas, ninguna implementada todavía):**
- **En el origen:** distinguir `TOKEN_REFRESHED` de `SIGNED_IN` en `:auth/listen`. Un refresco de
  token no es una sesión nueva y no debería reconstruir el estado de auth.
- **Defensa en profundidad:** en `:auth/session-established`, no limpiar `role`/`admin?` cuando el
  `user-id` entrante es el mismo que ya está en `db`. **Esto no relaja ninguna seguridad**: por
  [[../CLAUDE]] §7 regla 4 los checks de UI son UX, el control real es la policy RLS.
- Evaluar aparte si el estado de los formularios del panel debería vivir en `app-db` en vez de en
  ratoms locales — es más trabajo y **no** es la causa raíz, así que no se hace en este ticket.

**Implementado 2026-08-09** (rama `t-58-token-refresh-no-reconstruye-sesion`):

- **`universo.events.auth/session-refresh?`** — predicado puro nuevo: ¿este evento corresponde a una
  sesión ya establecida para el mismo usuario? Compara **id y email**, no solo id, para que un
  `USER_UPDATED` con correo nuevo sí reestablezca la sesión. Mismo patrón que `logged-in?`/`admin?`,
  que ya viven en ese namespace y ya se testean en `test/universo/events/auth_test.cljs`.
- **`:auth/session-event`** — handler nuevo, punto único de entrada de los eventos de sesión de
  Supabase. `:auth/listen` ya no despacha `:auth/session-established` directo: pasa por acá, que es
  donde —con acceso a `db`— se puede distinguir un refresco de un login. Si es refresco, no hace
  nada.
- **Se arregló en el origen, no en el síntoma.** Cortar acá desactiva de una vez los **dos** efectos
  del refresco: el desmontaje del panel y el `:admin/enter` que `:auth/profile-loaded` re-dispara.
- **No se agregó la "defensa en profundidad"** que proponía el ticket (no limpiar `role`/`admin?`
  para el mismo usuario en `session-established`): con el arreglo de origen ese handler ya solo se
  invoca en establecimientos reales, donde limpiar es lo correcto. Habría sido complejidad
  especulativa.
- `clj -M:test`: **46 tests / 186 assertions / 0 failures** (antes 45/178, +8 assertions del
  predicado nuevo). `clj-kondo` sobre los dos archivos tocados: **0 warnings**. `shadow-cljs release
  app`: 0 warnings.

- **Terminado cuando:** con el formulario de cupo a medio llenar, cambiar de pestaña y volver
  conserva lo escrito; y `clj -M:test` sigue verde. ✅ (lo segundo verificado; lo primero requiere
  navegador, ver abajo)
- **⚠ No verificado en vivo:** el arreglo es correcto por construcción y está cubierto por tests
  unitarios del predicado, pero **no se reprodujo el bug ni se confirmó su desaparición en el
  navegador** — el agente no tiene credenciales de admin. Al probarlo: la consola debe seguir
  mostrando `🔐 Auth state: TOKEN_REFRESHED` (`auth.cljs:204`, el log no se tocó), pero el panel ya
  **no** debe parpadear a "Verificando permisos…" ni vaciar el formulario.
- **Relacionado:** T-04 (el bug apareció mientras se ejecutaba), [[RISKS]] R-07 (monolito
  `admin.cljs`), [[../CLAUDE]] §7 regla 4 (los checks de UI son UX; el control real es RLS, así que
  conservar el rol entre refrescos no relaja ninguna seguridad).

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

### T-47 · Cerrar la lectura directa del banco de ítems (ADR-015) — **P0** · `hecho` (2026-08-09, verificado en producción)

La auditoría de `pg_policies` del 2026-08-08 respondió [[OPEN_QUESTIONS]] Q-12 y confirmó
[[RISKS]] R-16: la policy `"Enable read access for all users"` (creada desde el dashboard, ausente
del repo) hace que **cualquier cuenta autenticada pueda descargar `questions` completa**, con
`correct_option` y las cuatro `error_*`. No es solo robo del activo: permite falsear el diagnóstico
y, peor, contaminaría la calibración futura de `difficulty` (T-29, T-45).

- **SQL ya escrito:** `023_rls_limpieza.sql` (inocua, aplicable ya), `024_questions_rpc.sql`
  (aditiva, aplicable ya) y `025_questions_revoke_lectura_directa.sql` (**la que cierra el
  agujero**).
- **Trabajo de cliente pendiente:** `events/test.cljs` — `fetch-candidates` pasa a llamar
  `crud/next-question` (RPC); la evaluación `:correct? (= value (:correct-option question))` de
  `diagnostic_test.cljs` pasa a `crud/score-answer`; `normalize-question` deja de mapear
  `:correct-option` y `:errors`; el modal de feedback toma la explicación de la respuesta del RPC.
  El prefetch se mantiene.
- **⚠ Orden obligatorio:** 023 → 024 → **cliente compilado y publicado en `main`** → probar el
  diagnóstico con cuenta de **estudiante** → recién ahí 025. Aplicar 025 antes rompe el diagnóstico
  para todos los no-admin.
- **Terminado cuando:** con una cuenta de estudiante, `supabase.from('questions').select('*')`
  devuelve cero filas **y** el diagnóstico completo funciona de punta a punta, feedback incluido.

**✅ Cerrado 2026-08-09, verificado en producción tras aplicar las cuatro migraciones y publicar el
bundle (`main` @ `dc23f92`, hash confirmado contra el sitio):**

| Acceso a `questions` | Antes | Después |
|---|---|---|
| Anónimo | legible | `permission denied for table questions` |
| Estudiante (rol `user`) | **387 filas** con `correct_option` | **0 filas** |
| Estudiante vía `next_question` | — | ítem servido, sin `correct_option` ni `error_*` |
| Estudiante vía `score_answer` | — | `{correcto, correcta, explicacion}` |

El diagnóstico sigue funcionando de punta a punta con esa cuenta: ítem servido, corrección
server-side, comparación de respuestas completa y explicación del error conceptual.

**Refinamiento durante la implementación:** se agregó `026_score_answer_devuelve_correcta.sql`
porque el modal muestra "Comparación de respuestas" y sin la alternativa correcta esa sección
quedaba vacía — regresión pedagógica inaceptable en el producto cuyo diferencial es explicar el
error. Documentado como nota fechada dentro del ADR, no editando la decisión original.
- **Relacionado:** [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]], [[RISKS]] R-16,
  [[OPEN_QUESTIONS]] Q-12 y X-03, [[../adr/ADR-003-github-pages-artefacto-versionado]].

### T-48 · Versionar el DDL real del esquema (`000_baseline`) — **P1** · `abierto`

**2026-08-10:** el paso que faltaba para poder escribirla ya está hecho. El **bloque G** de
`supabase/queries/verificacion_esquema.sql` vuelca columnas, restricciones y cuerpo de funciones de
las tablas no versionadas (`questions`, `profiles`, `tests`, `guestbook`, `visitor`, `contacto`) más
`is_admin()`. Con esa salida se escribe `000_baseline.sql` directamente — el ticket pasa a ser
"pegar el resultado", no "averiguar qué hay".

Hallazgo de la misma auditoría: **`public.questions` no se crea en ninguna migración.**
`001_mvp_schema.sql` declara "Requiere: `public.questions`" y solo le agrega `module_id`. Lo mismo
pasaba con la tabla huérfana `dashboard` (eliminada en `023`). Es decir: **un entorno nuevo no se
puede reconstruir desde el repositorio**, y eso vuelve teórico tanto el staging (T-09) como la
restauración de un respaldo (T-07).

- **Trabajo:** volcar el esquema real (`pg_dump --schema-only`) y versionar como
  `000_baseline.sql` lo que no esté cubierto por las migraciones existentes — al menos `questions`
  y `is_admin()`. Documentar en `supabase/SCHEMA.md` que `000` es el punto de partida.
- **Terminado cuando:** aplicar `000` + `001`…`025` sobre una base vacía reproduce el esquema de
  producción, verificado al menos una vez.
- **Relacionado:** [[RISKS]] R-03, R-15, T-07, T-09, [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]].

### T-49 · La banda del estudiante no está protegida en la base — **P2** · `abierto`

Tercer hallazgo de la auditoría. La segregación por banda —el corazón de la propuesta de valor
([[../adr/ADR-006-cohortes-por-banda-con-minimo-de-inscritos]], B-04)— es **puramente cosmética**:

- `class_slots_select_open` deja ver **todos** los cupos abiertos, de cualquier banda.
- `enrollments_insert_own` solo valida `user_id = auth.uid()`; no mira el cupo.
- `enrollments_update_own` permite cambiar `slot_id` y `status` de la propia fila.
- `student_profiles_update_own` permite al estudiante **reescribir su propia `theta_band` y su
  `profile`**.

El filtro por banda vive solo en `slots.logic`, o sea en la UI. Un estudiante puede cambiarse la
banda y aparecer en cualquier cohorte; los perjudicados son los demás del grupo.

- **Causa de fondo:** θ se calcula **y se escribe** desde el cliente, así que **θ no es un registro
  confiable**. Arreglarlo de verdad implica decidir si el cálculo de θ se mueve al servidor →
  **ADR**. No se improvisa.
- **Hoy no es urgente** (θ no condiciona nada consecuente). Deja de no serlo si alguna vez θ
  determina precio, certificación o acceso pagado.
- **Terminado cuando:** o la inscripción valida la banda contra un θ que el estudiante no puede
  escribir, o está documentado por qué se acepta el riesgo.
- **Relacionado:** [[RISKS]] R-14, [[../adr/ADR-006-cohortes-por-banda-con-minimo-de-inscritos]].

### T-11 · Verificación automatizada de policies RLS — **P2** · `abierto`

Script SQL o suite que valide, con dos usuarios de prueba (`user` y `admin`), que:
estudiante no lee perfiles ajenos, no escribe `questions`, no ve cupos de otra banda; admin no
puede degradarse; nunca queda el sistema sin admin.

- **Terminado cuando:** el script corre contra staging y falla si alguna aserción se rompe.

### T-12 · Resolver la duplicación de `index.html` — **P1** · `hecho` (2026-08-17, rama `t-12-html-unico`)

`index.html` (raíz, servido por Pages) y `public/index.html` son casi idénticos, incluido el
JSON-LD. Riesgo de divergencia en SEO.

- **Opciones:** (a) dejar solo la raíz y ajustar `:dev-http {:root "public"}`; (b) generar la raíz
  desde `public/`; (c) documentar la duplicación y sincronizarla siempre.
- **Terminado cuando:** existe una sola fuente de verdad del HTML **o** una nota explícita en
  [[LESSONS_LEARNED]] con el procedimiento de sincronización. Si se elige (a) o (b) → **ADR**. ✅
  Se eligió **(a)**, con [[../adr/ADR-027-un-solo-index-html]] (D-55).

**Hallazgo al medirlo: el riesgo ya se había materializado.** Normalizando el prefijo de rutas, el
`<head>` completo (meta, Open Graph, JSON-LD entero, script de tema) era **idéntico byte a byte**;
pero el `<noscript>` de `public/index.html` se había quedado sin dos párrafos que sí estaban en el
de la raíz, incluido el que nombra a la UNEXPO (corrección de origen de D-53). **Y nadie lo notó
porque en desarrollo se servía la copia y nunca el archivo que se publica** — el mecanismo que
debería haberlo detectado, usar el producto, apuntaba al archivo equivocado.

**Implementado 2026-08-17:**

- **`public/index.html` eliminado.** Su único consumidor era el servidor de desarrollo; ningún
  script, build ni doc lo leía como artefacto (verificado con `grep`: las 20 menciones del repo son
  documentación *sobre* la duplicación).
- `shadow-cljs.edn`: `:dev-http {3000 {:root "." :push-state/index "index.html"}}` (era `"public"`)
  y `:asset-path "/public/js"` (era `"/js"`, va atado a la raíz del servidor).
- **`scripts/audit_html.py`** — cuarto audit versionado, para el par que **sí** debe sobrevivir
  (`index.html` / `404.html` difieren a propósito, ADR-026). Verifica script de tema, que
  bundle/CSS/manifest resuelvan al mismo archivo, versión de KaTeX, favicons, `noindex` en el
  fallback y que lo referenciado exista.

**Verificado:**

- El audit se probó **contra cuatro casos que deben fallar** antes de creerle (§10-bis): versión de
  KaTeX distinta, bundle renombrado, script de tema ausente, `noindex` quitado. Los cuatro se
  detectan; `404.html` quedó restaurado byte a byte después de cada prueba.
- `:asset-path` con un `watch` real, que era lo que no se podía dar por bueno: `/` sirve el
  `index.html` **de producción** (JSON-LD y "UNEXPO" presentes), los deep links `/plan`,
  `/registrarse` y `/no-existe` resuelven por push-state, y los módulos del build de desarrollo
  cargan desde `/public/js/cljs-runtime/`. Comprobado además en Chrome contra `localhost:3000`.
- `clj -M:test` **97 / 530 / 0** · `clj-kondo` 0/0 · los cuatro audits en verde.
- **No se recompiló el bundle:** en esta rama no cambió ninguna fuente ClojureScript
  (`git diff main -- src/ test/` vacío) y se verificó que `:asset-path` no queda embebido en el
  build de `release`. Un recompilado solo habría cambiado la asignación de símbolos del minificador
  — 1,2 MB de diff sin diferencia funcional.

**Efecto en L-22:** el copy de cara al público baja de **cinco lugares a cuatro** (`index.html`
JSON-LD, `index.html` `noscript`, `landing.cljs`, `home.cljs`).

**Desbloquea T-94**, que estaba anotada como "no hacer antes de T-12".

### T-13 · Alinear versiones de shadow-cljs y KaTeX — **P2** · `hecho` (2026-08-09)

`shadow-cljs`: 3.0.4 (`deps.edn`) vs `^2.19.2` (`package.json`). KaTeX: `^0.16.22` (npm) vs 0.16.9
(CSS por CDN).

**Implementado 2026-08-09:** `package.json` → `"shadow-cljs": "^3.0.4"` (antes `^2.19.2`),
`npm install` corrido para sincronizar `package-lock.json`. CDN de KaTeX en `index.html` y
`public/index.html` → `0.16.22` (antes `0.16.9`), igualado a la versión de npm. Verificado con
`npx shadow-cljs release app` real (no solo `clj -M:test`): build limpio, 223 archivos/151
compilados/0 warnings. `clj -M:test`: 42/162/0/0, sin cambios. Ver [[OPEN_QUESTIONS]] X-05/X-06.

- **Terminado cuando:** una sola versión de shadow-cljs en el repo, el CSS de KaTeX coincide con la
  versión del paquete, y `clj -M:test` + `release app` siguen en verde. ✅

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

### T-16 · Resolver `src/universo/user.cljs` — **P2** · `hecho` (2026-08-09)

Estaba en `.gitignore` **y** trackeado en Git (ignorar no destrackea). Nadie lo requiere.

**Resuelto 2026-08-09:** el contenido era código roto sin `ns` con requires (`go`, `<!`,
`get-table`, `re-frame/subscribe` usados sin importar nada), nunca compilado (0 referencias en
`public/js/app.js`) ni requerido desde ningún namespace real — no era un borrador de trabajo
recuperable, era ruido. Se borró el archivo (`git rm --cached` + borrado en disco) y se quitó la
entrada de `.gitignore` (ya no hace falta ignorar un archivo que no existe). Ver
[[OPEN_QUESTIONS]] X-04.

- **Terminado cuando:** se decide y ejecuta una de dos: `git rm --cached` (si es local/personal) o
  quitarlo del `.gitignore` (si es parte del proyecto). Registrar la razón. ✅

### T-17 · Limpiar archivos huérfanos — **P3** · `abierto`

`src/universo/components/math_render_2` (archivo **sin extensión**, no compilable),
`compile-test.clj`, `avatar.html`, `out/test.js` versionado.

- **Terminado cuando:** cada archivo está borrado, renombrado con extensión correcta, o
  documentado como intencional en `docs/`.

### T-18 · Ordenar las ramas — **P2** · `hecho` (2026-08-09)

Al momento de auditar (2026-08-09) la deuda había crecido a **27 locales / 24 remotas** (no 12/11
como decía la medición original) — la mayoría, ramas `t-NN-*` de tareas ya cerradas y mergeadas
que nunca se borraron tras el PR.

**Resuelto 2026-08-09 (pedido explícito del owner):** verificado uno por uno con
`git rev-list --count main..<rama>` que todas menos dos estaban en 0 commits por encima de `main`
(completamente mergeadas, sin trabajo único). Las dos excepciones se revisaron a mano antes de
borrar: `Dashboard-pro` (1 commit, "Update background", nov-2025, muy anterior al MVP actual) y
`visual-fixes` (1 commit local sin pushear, jul-2026, una validación de guestbook correo-o-teléfono
que quedó superada por la implementación real que sí llegó a `main`: correo obligatorio sin sesión,
ver `sessions/SESSION` de esa fecha). El owner confirmó borrar ambas igual. Borradas las 26 ramas
locales y 23 remotas restantes (`git branch -D` + `git push origin --delete`); solo queda `main` en
ambos lados. **No se documentó ninguna convención de ramas nueva** — con un solo desarrollador y
ramas `t-NN-slug` por tarea (patrón ya usado de facto en todas las sesiones recientes), no hizo
falta un documento aparte; si el equipo crece, retomar esa parte del criterio original.

- **Terminado cuando:** cada rama está mergeada, borrada o listada en `docs/` con su motivo de
  permanencia; y está escrita la convención de ramas en [[../CLAUDE]] §5. ✅ (mergeadas/borradas;
  convención no escrita, ver nota arriba)

### T-43 · Binding sin usar en `crud/fetch-modules-by-ids` — **P3** · `abierto`

Detectado 2026-08-08 al correr `clj-kondo` sobre los archivos tocados en T-40/T-42 (primer
hallazgo real desde que se adoptó la herramienta en D-33): `src/universo/db/crud.cljs` declara el
parámetro `module-ids` y no lo usa, así que la función probablemente trae **todos** los módulos y
no los que se le piden. No se tocó por estar fuera del alcance de T-40/T-42
([[AGENT_INSTRUCTIONS]] §1.3).

- **Terminado cuando:** o la función filtra realmente por `module-ids`, o el parámetro se elimina
  porque traer todo es lo correcto — con el motivo registrado en el código.
- **Relacionado:** [[DECISIONS]] D-33, [[GRAPHIFY_INTEGRATION_GUIDE]] §6.1.

### T-23 · Decidir el destino del código no alcanzable — **P3** · `abierto`

`mathacademy*`, `improved_math_academy`, `jardin`, `particulas`, `physics`, `voz`, `battery`,
`animations`, `test_subs`, `components/tailwind`, `components/supabase_test`.

- **Terminado cuando:** o se mueven a un directorio `lab/` fuera de `:source-paths`, o se borran,
  o se documenta explícitamente que se conservan como laboratorio (decisión → nota en ADR-008).

---

## Épica E4 — Producto y experiencia

### T-05 · Router de URL con history API — **P1** · `hecho` (2026-08-16, rama `t-05-router-url`, sin mergear)

Hoy la navegación es solo estado en `app-db`: no hay deep links, recargar vuelve a la landing y no
se puede medir por página.

- **Terminado cuando:** `/plan`, `/cupos`, `/diagnostico`, `/admin` son URLs reales que sobreviven
  a un refresh (con el fallback de GitHub Pages resuelto), y las rutas protegidas siguen exigiendo
  sesión. ✅
- **Nota:** decisión de diseño → **ADR**. ✅ [[../adr/ADR-026-router-de-url-con-history-api]] (D-54).
- **Relacionado:** [[ARCHITECTURE]] A-07, habilita T-20.

**Implementado 2026-08-16:**

- `src/universo/router.cljs` — namespace **puro** (ADR-009): tabla `sección ↔ path`,
  `normalize-path`, `path->section`, `section->path` y `entry`. Doce rutas en español
  (`/plan`, `/cupos`, `/diagnostico`, `/admin`, `/tablero`, `/ingresar`, `/registrarse`, `/cuenta`,
  `/profesor`, `/privacidad`, `/libro-de-visitas`, `/`).
- `src/universo/events/router.cljs` — único lugar que toca `window.history`
  (`:router/push`, `:router/replace`, `:router/listen`) más `:router/init` y `:router/popstate`.
  Agregado al `:require` de `core.cljs` (L-03) y despachado con `dispatch-sync` **antes** de
  `:auth/init`.
- `subs.cljs` — `:complete-navigation` acepta `opts` y es el **único** punto donde se escribe la
  URL, después del guard.
- `events/auth.cljs` — `guard-section`/`:navigate-to` propagan `opts`; dos funciones puras nuevas
  con test, `post-session-target` y `post-clear-target`, resuelven el destino cuando la sesión se
  establece o se limpia (un deep link a ruta protegida sobrevive como `:redirect-after-login`).
- `db.cljs` — clave `:router {:pending nil}`.
- `404.html` (raíz) — fallback de GitHub Pages, sin redirección y sin tocar la URL.
  `shadow-cljs.edn` gana `:push-state/index` para el equivalente en desarrollo.
- `home.cljs` — el logotipo pasa a `href "/"` (era `"#"`) y la rama 404 de `main-content`, ahora
  alcanzable de verdad, ofrece "Volver al inicio".
- `test/universo/router_test.cljs` — 14 tests nuevos. `clj -M:test`: **96 tests / 523 assertions /
  0 failures** (antes 83/454). `clj-kondo` 0/0, `release app` 0 warnings, las tres auditorías en
  verde.

**Verificado en vivo** (Chrome + servidor local que simula el fallback de GitHub Pages, devolviendo
`404.html` con status 404 para rutas inexistentes): deep link a `/plan`, `/cupos` y `/diagnostico`
sin sesión → `/ingresar` con el destino guardado en `:redirect-after-login`; `/privacidad`,
`/profesor` y `/libro-de-visitas` montan su sección directo; `/Libro-De-Visitas/` y `/index.html`
se normalizan con `replaceState`; `/no-existe` → 404 del SPA sin tocar la URL; navegación interna
apila una sola entrada por destino; atrás/adelante funcionan; y **`forward` hacia `/admin` sin
sesión aterriza en `/ingresar`** — el guard también cubre el botón atrás.

**No verificado (falta credencial):** el camino con sesión iniciada — deep link a `/plan`/`/admin`
con usuario logueado y el redirect posterior al login. Es el mismo límite de T-24/T-38: el agente
no tiene cuenta de prueba. La lógica está cubierta por `post-session-target` en los tests, pero
**no se ejerció contra Supabase real**.

**Consecuencia aceptada, en el ADR:** bajo el fallback de GitHub Pages todas las rutas salvo `/`
responden **HTTP 404**, así que las rutas públicas no son indexables y el `sitemap.xml` sigue
declarando solo `/`. Ver T-94.

**Segunda pasada, el mismo día (pregunta del owner: "¿ingresar y registrarse en el mismo deep link
está bien?").** No lo estaba: era la única pieza de navegación que había quedado fuera de T-05, y
justo el paso más caro del embudo. `:registro` → **`/registrarse`** es ahora ruta propia;
`login-form` sirve las dos y **deriva** el modo de `:current-section` en vez de un `r/atom` local,
así que el correo ya escrito sobrevive al cambio y el registro sobrevive a un refresh. Los enlaces
"Regístrate" / "Inicia sesión" pasan a ser `<a href>` reales. **Se eliminaron `:auth/login-mode`,
`:auth/set-login-mode` y la clave `[:auth :login-mode]`** — con la ruta como fuente del modo, el
intent sobraba. `:landing/start` y el CTA del panel de contacto apuntan a `/registrarse`.
`clj -M:test` **97 / 530 / 0**. Verificado en vivo: deep link a `/registrarse` monta "Crear cuenta"
**con la declaración de edad de D-21**, alternar conserva el correo, el botón atrás también, y el
CTA principal de la landing aterriza ahí. Detalle en el **Anexo** de ADR-026.

### T-94 · Entradas estáticas reales para las rutas públicas — **P3** · `abierto`

Consecuencia conocida y aceptada de [[../adr/ADR-026-router-de-url-con-history-api]]: bajo el
fallback de GitHub Pages, `/profesor`, `/privacidad` y `/libro-de-visitas` responden **HTTP 404**
aunque se vean bien. Son visitables y compartibles, pero **no indexables**, y por eso no están en
`sitemap.xml`.

- **Terminado cuando:** o esas rutas responden 200 (archivo estático real por ruta, o un hosting
  con reescrituras), o se decide y documenta que su SEO no importa y esta tarea se cierra.
- ~~**Antes de hacerla:** resolver T-12~~ ✅ **desbloqueada 2026-08-17**: T-12 cerrada
  ([[../adr/ADR-027-un-solo-index-html]]). Quedan dos HTML en producción, no tres, y su sincronía
  la verifica `scripts/audit_html.py` — cualquier archivo nuevo por ruta pública tendría que entrar
  también en ese audit.
- **Relacionado:** [[ARCHITECTURE]] A-09, T-05, T-12.

### T-95 · Persistir el consentimiento de D-21, no solo bloquear el botón — **P2** · `abierto`

Sale de [[../adr/ADR-028-toda-entrada-social-pasa-por-d-21]] como costo aceptado, no como defecto.

Hoy la declaración de edad es un **gate de UI**: el botón social está inhabilitado hasta marcarla y
el `<form>` de registro la exige con validación nativa. Funciona para impedir el alta, pero **no
deja rastro**: si alguien pregunta "¿este estudiante declaró tener 14 años?", la única evidencia es
el código de la UI en el commit vigente ese día. Sobre datos de menores bajo la Ley 21.719 eso es
débil, y se vuelve claramente insuficiente cuando haya un contrato institucional de por medio
([[RISKS]] R-28).

- **Qué haría falta:** columna `consent_at timestamptz` (y quizá `consent_version`) en `profiles`,
  escrita en el momento del alta. Ojo con el camino OAuth: ahí la fila la crea el trigger
  `handle_new_user()` en `auth.users`, así que el dato **no puede escribirse en el mismo INSERT**
  desde el cliente — hay que decidir entre pasarlo por metadata del signup o hacer un `update`
  posterior desde la sesión ya establecida. **Esa decisión es el grueso de la tarea, no la columna.**
- **Terminado cuando:** un alta por correo y un alta por Google dejan las dos su `consent_at`, y
  existe una consulta en `supabase/queries/` que responde "quién declaró y cuándo".
- **No es bloqueante de nada hoy:** el gate ya impide el alta sin declarar. Sube a P1 en cuanto se
  abra la conversación de un contrato institucional (F9, R-28).
- **Relacionado:** D-21, D-56, [[RISKS]] R-06/R-28, [[DECISIONS]] D-56, T-92.

### T-96 · Escape del estudiante en el diagnóstico («no sé») — **P0** · `hecho` (2026-08-18, rama `escape-no-se`, **sin mergear**)

Dos botones en el ítem: «No entiendo el enunciado» y «No sé cómo resolverlo». Ver
[[../adr/ADR-029-escape-como-tercera-categoria-de-respuesta]] (D-57).

**Implementado:**
- `src/universo/irt/escape.cljs` — namespace puro (ADR-009): normalización de la clase (acepta
  keyword y string, porque vuelve del JSONB como string), construcción de la respuesta con
  `:weight 0.0`, y los agregados `escape-rate` / `escape-counts` / `summary`.
- `events/test.cljs` — evento `:test/escape`, y se factorizó `register-response` para que la vía
  corregida por el servidor y la del escape **no puedan divergir** en la regla de parada.
- `components/diagnostic_test.cljs` — los dos botones, con peso visual secundario y **sin diálogo
  de confirmación** (poner fricción ahí castiga la honestidad).
- `components/feedback_modal.cljs` — variante de escape. Sin esto el modal decía «Incorrecto» en
  rojo y mostraba una comparación de alternativas **vacía**, porque con `selected` y `correct` los
  dos nil entraba por la rama del acierto.
- `profile.cljs` — `:escape` aditivo y **nil cuando no hubo ninguno**, para distinguir «no escapó»
  de «test anterior al escape».
- `test/universo/irt/escape_test.cljs` — 13 casos, incluida la propiedad central: agregar un escape
  deja θ **exactamente igual**, con el contraste de que una respuesta incorrecta sí lo mueve (o sea
  que la prueba no pasa por casualidad).
- **No requiere migración ni toca RLS:** `score_answer` rechaza por diseño lo que no sea A–D, y un
  escape no es una alternativa. Es cliente puro.

**🔧 Corregido el mismo día, tras revisión del owner.** La primera versión **no bajaba la dificultad
ni mostraba recursos** — registraba el problema y no hacía nada. El error fue dar por bueno que «con
`:correct? false` el motor ya sirve ítems más fáciles solo»: eso vale para la alternativa de peso
1.0, que se descartó; **con peso 0.0 θ no se mueve** y `next_question` seguía sirviendo la misma
banda. Se agregó:

- `escape/selection-theta` + `consecutive-escapes` — el ítem se busca con un θ **objetivo** que baja
  un escalón por escape seguido y **se reinicia solo** al responder de verdad. θ no se toca. Como
  `next_question` recibe el θ objetivo por parámetro, **tampoco hizo falta migración**; el escalón
  reusa `progress/selection-half-width` en vez de declarar una constante nueva. El ancla es
  `min(θ, dificultad del ítem escapado)`, porque con la ventana estrecha vacía el ítem servido puede
  ser más difícil que θ y retroceder desde θ dejaría al estudiante donde se atascó.
- `crud/fetch-published-resources-for-module` + la sección de material en el modal, con
  `plan/resource-card` (la misma tarjeta de «Mi plan», no una variante).
- ⚠️ **Es el módulo del ítem, no el prerrequisito** (Q-38 / T-98), y se dice en la UI. El estado
  vacío es honesto: con un tercio del banco sin `module_id` (T-60) va a ocurrir.

- `clj -M:test`: **121 tests / 619 assertions / 0 failures / 0 errors**. `shadow-cljs release app`:
  0 warnings. Las cuatro auditorías pasan (contraste **40/40**, con los dos pares nuevos declarados).
- **⚠ No verificado en vivo:** el diagnóstico es sección protegida y el agente no tiene credenciales
  de una cuenta de estudiante. **Antes de T-90 hay que probarlo de punta a punta con una cuenta que
  no sea admin**, comprobando que el modal muestre la variante de escape.
- **Relacionado:** T-90 (esta tarea existe para que esa sesión mida algo), [[RISKS]] R-34,
  [[OPEN_QUESTIONS]] Q-39.

### T-97 · Panel de recursos: guardado optimista, borrador que sobrevive y duplicar — **P1** · `hecho` (2026-08-18, rama `escape-no-se`, **sin mergear**)

Los cinco arreglos baratos del editor, que es el segundo flujo central del producto (D-58).

**Implementado:**
- `src/universo/resources.cljs` — namespace puro con `attach-module`, `upsert-row`, `remove-row`,
  `set-published` (que es **su propia inversa**, y por eso revertir un cambio optimista no exige
  recargar nada) y `duplicate-draft`. `test/universo/resources_test.cljs`: 8 casos.
- **Guardado sin recarga:** `upsert-resource!` ya hacía `.select("*").single()`, así que la fila
  volvía en la misma llamada y se estaba tirando para ir a buscarla de nuevo. El único dato que
  faltaba —el join `modules(slug,…)`— se repone desde los módulos que ya están en `app-db`.
- **Publicar/despublicar optimista y reversible**, en vez de una recarga completa por un booleano.
- **Las dos consultas de la sección van en paralelo** (antes `modules` y recién después
  `resources`, pagando dos veces la latencia).
- **Borrador en `app-db`** en vez de un `r/atom` del componente: cambiar de pestaña borraba veinte
  minutos de LaTeX escrito **sin aviso**.
- **⌘/Ctrl+Enter guarda, Esc descarta**, en el contenedor, así que funcionan también desde el
  textarea, que es donde se pasa el tiempo.
- **Duplicar**: sin `id`, sin publicar y con el título marcado. Es el atajo que más rinde porque los
  recursos de un módulo suelen ser variaciones del anterior.
- Se fusionó `:admin/cancel-edit-resource` con `:admin/discard-resource-draft`: hacían el mismo
  trabajo y tener dos eventos para una acción es cómo uno se queda sin limpiar la mitad del estado.
- **Lo que NO se hizo, y sigue abierto:** T-102.

### T-98 · Decidir y sembrar el grafo de prerrequisitos entre módulos — **P1** · `abierto`

La migración `045` crea `module_prerequisites` **vacía a propósito**. Falta el contenido, que es una
decisión **pedagógica** y por lo tanto del profesor: ver [[OPEN_QUESTIONS]] **Q-38**.

- **Por qué importa:** es lo que le da destino al escape `:resolucion` de T-96. Sin el grafo, un «no
  sé cómo resolverlo» se registra pero no lleva a ninguna parte.
- **Cómo NO hacerlo:** derivándolo del `order_index` de `modules` o del orden de Baldor. Se
  parecería a la respuesta correcta sin serlo, y el error quedaría invisible — el modo de fallo de
  T-51 con los topics.
- **No hace falta el grafo completo para empezar:** con las aristas duras de los módulos donde más
  se escape en T-90 ya se puede probar el camino entero.
- **Terminado cuando:** existe una migración `046` con las aristas y su `rationale`, aplicada, y un
  escape en un módulo con prerrequisito resuelve al módulo anterior.

### T-99 · Ítems sembrados: calibrar el banco dentro del test que ya corre — **P0** · `abierto`

Servir 1–2 ítems con `difficulty` no confiable que **no cuenten para θ**, solo para recoger datos.
Es la técnica estándar de calibración (*ítems sembrados* / *anchor items*).

- **La maquinaria ya existe:** es el peso 0.0 de `universo.irt.effort`, el mismo que usa el escape.
- **Por qué es P0 y no un lujo:** es **G-2 —calibrar el banco, la precondición dura de todo el plan
  de negocio ([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]])— ejecutándose gratis dentro
  de un flujo que ya corre**. De todo lo que salió de la sesión del 2026-08-18, es lo único que
  avanza directamente el vector que bloquea a los demás.
- **Lo que hay que decidir antes:** cómo se marca un ítem como piloto (columna en `questions` vs.
  `difficulty is null`), y cuántos por test sin alargarlo — el largo ya es el riesgo que T-90 mide.
- **Dependencia:** conviene decidirlo **después** de T-90, con el dato de cuántos terminan.
- **Relacionado:** T-29, T-45, T-76/T-77, Q-05.

### T-100 · Migrar el diagnóstico y «Mi plan» al lenguaje del panel — **P1** · `abierto`

> **Actualización 2026-08-24 (ADR-033).** Esta tarea dejó de ser difusa: `python3
> scripts/audit_paleta.py` la cuenta. Al cerrar esa sesión la deuda de color de fábrica era **92 usos
> en el embudo**, 87 en el panel de admin y 50 fuera del bundle, con línea base **por archivo** y
> trinquete — o sea que no puede crecer mientras esto siga abierto, y cada vez que baje el script pide
> actualizar el número.
>
> Lo que ya salió del embudo en esa pasada: el veredicto del diagnóstico (verde/rojo de fábrica →
> diodo de la paleta) y los avisos de error de `diagnostic_test` y `test_editor` (→ `alarma-700`). Lo
> que queda en `diagnostic_test.cljs` son 9 usos, **todos fuera del flujo del ítem**: la pantalla de
> selección, la de completado y la de resultados.
>
> **Ojo con el trinquete:** que el auditor esté en verde significa «no empeoró», no «está bien»
> ([[LESSONS_LEARNED]] L-50).


La identidad visual (ADR-022/023) existe, está pagada y **no llegó a las dos pantallas que más se
ven**. Medido con `grep` el 2026-08-18:

| Archivo | Primitivas del panel | Radios y sombras (que ADR-022 prohíbe) |
|---|---|---|
| `diagnostic_test.cljs` — el flujo n.º 1 | **0** | 15 `rounded-lg`, 2 `rounded-xl`, 2 `rounded-full`, 4 `shadow-*` |
| `plan.cljs` — el entregable | **0** | 8 `rounded-lg`, 6 `rounded-xl`, 8 `bg-white` |
| `feedback_modal.cljs` | 16 | — |
| `dashboard.cljs` | 11 | — |

- **Por qué se ve genérico y no *mal*:** `tailwind.config.js` redefine `indigo` como grafito, así que
  los cientos de `bg-indigo-600` heredados salen grises en vez de morados. La neutralización evitó
  que se viera mal y dejó exactamente gris sobre blanco con esquinas redondas y sombra suave.
- Hay además verdes y rojos crudos de Tailwind en `diagnostic_test.cljs`, fuera de la paleta de un
  solo color. (En `feedback_modal.cljs` el verde/rojo **se queda**: ahí el color informa
  acierto/fallo y está justificado en el propio archivo.)
- **No toca lógica** y se verifica con los tres `scripts/audit_*.py` que ya existen.
- **Terminado cuando:** las dos pantallas usan `.control`/`.placa`/`.visor`/`.alojamiento`/`.led`,
  cero `rounded-*`/`shadow-*`, y las cuatro auditorías siguen pasando.

### T-101 · Mapa de prerrequisitos visible y manipulable — **P2** · `abierto`

- **Depende de T-98** (sin aristas no hay nada que dibujar).
- **Sin librería nueva:** 20 nodos en 3 tracks es un layout por capas (profundidad = camino más
  largo desde las raíces, columna = track) de unas ochenta líneas de ClojureScript **puro y
  testeable**, que es lo que ADR-009 exige. d3 o cytoscape añadirían dependencia a registrar
  (CLAUDE.md §5), peso de bundle y una capa imperativa que reconciliar con re-frame. Pan y zoom son
  un `viewBox` y eventos de puntero.
- **Lo que lo hace valer no es el dibujo**, es pintarlo con los datos del propio estudiante:
  dominado / en curso / bloqueado / **hueco detectado por un escape**. Convierte θ de un número en
  un lugar donde se está parado, y es la pantalla que un profesor proyecta — casi literalmente el
  «mapa de errores del curso» de T-90.
- **Aviso:** va a hacer visible que **128 ítems (33 % del banco) no tienen `module_id`** (T-60).
  `universo.profile` ya los marca `unknown/…` a propósito. Es correcto que se vea.

### T-102 · Editor de recursos: edición en la fila y Markdown básico — **P2** · `abierto`

Lo que quedó fuera de T-97 por ser de mayor alcance:

- **Editar en la fila** (expansión inline o panel lateral) en vez de un único formulario global
  arriba con `window.scrollTo`. Hoy cada edición es: subir, editar, guardar, bajar y volver a buscar
  dónde ibas. **Conservando la vista previa viva**, que renderiza con `plan/resource-card` —la misma
  función que usa «Mi plan»— y es la mejor decisión de UX del panel entero.
- **Encabezados `##` y listas `-`**, que hoy **no se renderizan** (lo dice la propia ayuda del
  editor) y son las dos primeras cosas que cualquier profesor va a escribir. Más una barra mínima de
  inserción: fracción, potencia, raíz, `$$`.
- **Para el profesor** (cuando exista el rol, T-79) el arreglo no es un formulario mejor: son
  **menos campos obligatorios**. Hoy pide título, tipo, módulo, URL, orden y cuerpo; quien graba 90
  segundos sobre *un* error debería elegir una cosa y grabar.

### T-103 · Pestaña de catálogo de misconceptions en el panel — **P2** · `hecho` (2026-08-18, `a29396d`)

> **Cerrada el 2026-08-18.** La pestaña «Ideas erróneas» existe: alta, edición, búsqueda y baja, con
> el slug propuesto desde el nombre y validado contra el check de `027` antes de viajar, el veredicto
> de `health` arriba y visible, y **la asignación por distractor desde el editor de preguntas**, que
> era el punto. Verificado en vivo contra la base real (alta y baja de una entrada de prueba).
>
> **Lo que la sesión encontró al construirla y no estaba previsto:** el veredicto se calcula sobre un
> catálogo que hoy es **77 de 77 del experimento de cuántica**, así que decía «sano» sobre un
> producto con cero distractores catalogados. El banner lo declara explícitamente; la decisión de
> fondo sigue en **Q-40**.

**Es el consumidor que le falta al cableado del 2026-08-18.** `fetch-misconceptions`,
`upsert-misconception!` y `delete-misconception!` existen en `db.crud`, `universo.misconceptions`
tiene las funciones puras con test, y **no las llama nadie**: mientras no exista esta pestaña, `027`
sigue sin lector en la práctica y el paso 2 de T-57 no se puede ejecutar (D-59).

**Qué falta, concretamente:** eventos en `events/admin.cljs` (cargar, guardar, borrar, con el
`:loading?`/`:error` propio de la sección que exige [[../CLAUDE]] §5), los subs, y la vista con las
primitivas del panel (`.control`, `.alojamiento`, `.placa`, `.visor` — ADR-023), no con utilidades
sueltas.

**Lo que ya está resuelto y no hay que rehacer:**
- **El slug se valida antes de guardar** con `misconceptions/slug-valid?` (espejo del check de
  `027`) y se propone con `suggest-slug`. Sin eso, el único aviso de un slug mal formado es un error
  de Postgres después de escribir nombre y descripción.
- **`health` es la pieza que justifica la pestaña**, no un adorno: es la única forma de ver si el
  catálogo está creciendo casi tan rápido como el banco, que es la manera de fracasar que `027`
  anticipó. Debería estar a la vista, no escondida.
- **`with-usage` deja las huérfanas visibles al final**, no ocultas: una idea errónea que no usa
  nadie es exactamente la que hay que revisar o borrar.

**Decisión pendiente antes de escribir la vista:** qué hacer con las **77 entradas `mq/`** del
experimento de cuántica (T-61), que hoy `fetch-misconceptions` devuelve junto con las del producto y
que distorsionan `health` — [[OPEN_QUESTIONS]] **Q-40**.

- **Terminado cuando:** un admin puede crear, editar y borrar una misconception desde el panel, ve
  el uso de cada una y ve el veredicto de `health` del banco.
- **Relacionado:** T-57 (paso 2), T-54, D-59, `sessions/SESSION-032.md`.

### T-105 · Ítems con la clave equivocada y feedback que valida el error — **P0** · `cerrada` 2026-08-19

**Encontrado catalogando, no revisando.** La vista de catalogación obliga a leer cada distractor al
lado de su explicación, y ahí saltó lo que ninguna revisión de código iba a ver.

**Tres ítems daban por incorrecta la respuesta correcta** (corregidos el 2026-08-19):

| Ítem | Enunciado | Resultado | Estaba marcada |
|---|---|---|---|
| #54 | `(9−6)+(2−1)` | **4** | 3 |
| #27 | `(−18)+25−10` | **−3** | 3 |
| #29 | `(−5)(4)−(−6)(3)` | **−2** | 2 |

El patrón no es aleatorio: **en los tres, la clave apuntaba a la versión con el signo equivocado o al
resultado incompleto.** En un banco de números enteros eso es el peor sesgo posible — castiga
exactamente a quien domina la regla de signos, que es lo que el ítem dice medir.

**Ocho distractores tenían la palabra «Correcta» como explicación** (#38, #48–#54): quien se
equivocaba recibía «Correcta» como retroalimentación. Artefacto de quien generó el banco, que usó el
campo `error_*` para anotar cuál era la buena. Reescritas las ocho.

**Cerrada el 2026-08-19: los cuatro bancos activos quedaron revisados ítem por ítem** —
`diagnostico` (64), `numbers_v1` (178), `paes_m1` (44) y `polinomios` (20), 306 en total. El método
fue doble: un evaluador de expresiones que resolvió los 81 ítems aritméticos y comparó con la
alternativa marcada, y lectura humana de los 225 restantes (conceptuales y de contexto), porque
ningún parser juzga «¿en qué paso está el error?».

**Cuatro claves más apuntaban a la alternativa equivocada** (corregidas y verificadas contra la base):

| Ítem | Banco | Enunciado | Resultado | Estaba marcada |
|---|---|---|---|---|
| #56 | diagnostico | `(−4) − (−2)` | **−2** (A) | C (2) |
| #109 | diagnostico | `5 − 2(3 − x) = 7` | **x = 4** (C) | A (3) |
| #394 | paes_m1 | dobleces de 40×20 cm hasta 2,5×20 | **4** (C) | A (6) |
| #407 | paes_m1 | ¿en qué paso está el error? | **Paso 4** (D) | A (Paso 3) |

#56 repite el patrón de #54/#27/#29: la clave apunta al resultado con el signo invertido.

**Tres ítems no tenían ninguna alternativa correcta** (arregladas):

| Ítem | Qué pasaba | Cómo quedó |
|---|---|---|
| #386 | 3.990/3 + 1.390/2 = **2.025**, la alternativa decía `2.023` | corregida a `2.025` |
| #387 | 3 × (1/2 + 1/3) = **2,5**, la alternativa decía «3 círculos y medio» | «**2** círculos completos y medio» |
| #411 | (a+b)² − (a²−b²) = **2ab + 2b²**, la alternativa decía `2ab + b²` | corregida a `2ab + 2b^2` |

**Siete ítems tenían dos alternativas correctas a la vez**, todos por lo mismo: la respuesta
simplificada y la sin simplificar convivían como opciones (#59, #61, #66, #226, #247, #273, #317).
Las explicaciones probaron que **no era descuido**: en #66 el distractor está anotado «También
equivalente pero no simplificada» y en #247 «No se simplificó la fracción». El autor tenía en mente
«en su mínima expresión» y no lo escribió. Por eso el arreglo fue **precisar el enunciado**, no
tocar los distractores: así las explicaciones y las misconceptions ya escritas siguen calzando.
En #61 fue al revés —la clave era `2/4` y la alternativa simplificada `1/2` figuraba como error—
así que ahí se movió la clave a `1/2` y se reescribió la explicación de `2/4`.

**Lo que se encontró y NO era una clave** (abierto en otras tareas):

- La clave está en **A en 293 de los 306 ítems** (`numbers_v1`, `paes_m1` y `polinomios` al 100 %;
  `diagnostico` al 80 %, con **cero** ítems en D) — [[RISKS]] **R-35**, mitigado en el cliente por
  [[../adr/ADR-030-barajar-las-alternativas]].
- **76 ítems escriben los comandos LaTeX con la barra duplicada** (`\\frac`, `20\\%`): KaTeX no los
  interpreta y el estudiante ve el comando crudo, el mismo daño que los delimitadores faltantes de
  T-103. Arreglo listo y verificado en `supabase/migrations/047_arreglar_escapes_latex_dobles.sql`,
  **pendiente de aplicar a mano** (CLAUDE.md §9).
- **16 enunciados están duplicados**, y en `paes_m1` es grave: 13 de sus 44 ítems son repeticiones de
  solo 3 enunciados (uno aparece 5 veces) — **T-106**.
- **#389 pregunta por un gráfico que la plataforma no puede mostrar**: es irrespondible tal como está.
- #361, #363 y #365 (logaritmos, ecuación con radical, cubo de binomio) **exceden el temario de
  M1**, como los 20 que ya se movieron a `fuera_de_temario_m1`.

- **Terminado cuando:** ~~los cuatro bancos activos están revisados ítem por ítem~~ ✅
- **Relacionado:** T-103 (la vista que lo destapó), T-106, R-35, ADR-030, `sessions/SESSION-035.md`.

### T-106 · `paes_m1` tiene 13 de sus 44 ítems duplicados — **P1** · `abierto`

Tres enunciados aparecen repetidos: «¿Cuál es el valor de $1-(-3)(-2-6)$?» (ids 375, 377, 379, 381,
383), «¿Cuál es el número cuya tercera parte es $0.09$?» (376, 378, 380, 382, 384) y el de la
escalera de 20 peldaños (416, 417, 418). Hay otros 13 duplicados en pares entre `numbers_v1` y
`polinomios` (ej. 119/182, 189/216).

**Por qué importa y no es cosmético:** el test es adaptativo y elige por dificultad, así que un
enunciado con cinco copias tiene **cinco veces la probabilidad** de salir que uno único. Un
estudiante puede recibir la misma pregunta varias veces en una misma sesión, y θ se estima con
información repetida — el ítem repetido no aporta información nueva sobre la habilidad, pero el
modelo la cuenta como si sí.

- **Terminado cuando:** no quedan enunciados repetidos en los bancos activos; de cada grupo se
  conserva uno y el resto se archiva a un topic inactivo (**no se borran**: pueden tener respuestas
  asociadas).
- **Ojo:** antes de archivar, revisar si las copias tienen `misconception_*_id` distintos — puede que
  una copia esté catalogada y las otras no.
- **Relacionado:** T-105, R-35.


### T-107 · Auditor de contraste sobre el DOM renderizado — **P1** · `abierto`

`scripts/audit_contraste.py` verifica los 40 pares de la paleta escritos a mano. **No inspecciona el
DOM y no sabe componer capas**, así que es ciego a lo que rompió el CV: un texto cuyo color está bien
declarado, sobre un fondo que **hereda** de un ancestro. Los 52 fallos de `/profesor` convivieron con
los cuatro auditores en verde.

**Qué hay que construir:** el auditor ad-hoc que se escribió en JS durante SESSION-036 ya funciona y
está descrito en ese log — recorre los nodos con texto propio, sube por los ancestros componiendo
`background-color` semitransparentes, resuelve el umbral por tamaño y peso (4.5 / 3.0) y reporta.
Falta: sacarlo del navegador a un script del repo (headless o Playwright), enseñarle a tratar los
degradados (hoy los marca «no medible» y hay que revisarlos a mano) y correrlo sobre las secciones
que aún no se midieron.

**Terminado cuando:** un comando del repo mide todas las rutas en ambos temas y falla con código 1 si
algún texto queda bajo su umbral.

**Relacionado:** R-36, ADR-031, L-47, `scripts/audit_contraste.py`, `sessions/SESSION-036.md`.

### T-108 · Animar el fondo solo cuando comunique un Δθ — **P3** · `abierto`

El gancho ya existe: `[:ui :transitioning]` lo prende `router.cljs:72` en cada navegación. **Y por eso
mismo no sirve tal cual**: navegar entre secciones no cambia ningún dato, así que animar ahí sería
decoración, que es lo que ADR-022 sacó.

Lo que sí significa algo es el modelo instrumento: **el graticule queda fijo en el vidrio y lo que se
mueve es un cursor** en la posición de θ, una sola vez, cuando θ cambia. Prototipado y visto por el
owner en el laboratorio del graticule (SESSION-036); queda diferido hasta que haya Δθ real (G-4).

**Obligatorio si se hace:** `prefers-reduced-motion`, que hoy **no aparece ni una vez en todo el
repo**. Y el cursor **no puede ser cian**: sobre el panel el LED da 1.04 de contraste y ADR-023 lo
prohíbe fuera de un alojamiento.

**Relacionado:** ADR-031 §Decisión 4, ADR-022, ADR-023, G-4 en [[TESIS_DE_CRECIMIENTO]].

### T-115 · Revisar el ancho del enunciado con los ítems más largos — **P2** · `abierto`

Desde ADR-033 el riel ocupa 26rem fijos en `lg`, así que la columna del enunciado queda en 712px con
`max-w-6xl` — más que el `max-w-2xl` (672) que la caja ya tenía, pero en una ventana de 1024px caen a
**552px** y ahí sí se nota.

**Cómo se comprueba, y no es a ojo:** tomar los enunciados más largos del banco (los que llevan
`$$…$$` en display, que es lo que no se puede envolver) y mirarlos a 1024px con el panel abierto. Si
la caja scrollea en horizontal, las salidas son bajar el riel a 24rem, subir el escenario a
`max-w-7xl`, o dejar que el riel se apile también en `lg` y reservar las dos columnas solo desde
`xl`.

**Terminado cuando:** hay una medición sobre los ítems reales, no una impresión.

### T-110 · Distinguir las corridas de admin en `tests` — **P0** · `abierto`

**Precondición dura de G-2.** Desde ADR-032, depurar un ítem significa rendir el diagnóstico y volver
a servir el mismo ítem varias veces. Cada corrida deja una fila en `tests` indistinguible de la de un
estudiante real, con el `user_id` del owner —que conoce la clave— y concentrada justo en los ítems
que más se depuraron. Calibrar `difficulty` con eso adentro no produce un banco calibrado: produce
uno sesgado hacia la facilidad **en correlación con la variable de interés**. Ver [[RISKS]] R-37.

**Alcance mínimo:** columna `tests.origin text not null default 'student'`, escrita como
`'admin_preview'` en `:test/complete` cuando `:auth/admin?`, y su índice si hace falta. La
alternativa barata —excluir por `user_id` al calibrar— sirve, pero solo si queda **escrita y
versionada**, no recordada.

**Terminado cuando:** una corrida de admin y una de estudiante se pueden separar con un `where`, y el
criterio está en `supabase/SCHEMA.md`.

### T-111 · Decidir qué se hace con la parada por precisión — **P1** · `abierto`

`:precision` no se dispara nunca: con `max_items = 12`, `SE(θ) ≥ 0.577`, y el umbral configurado es
`0.35` ([[RISKS]] R-38, [[OPEN_QUESTIONS]] Q-42). Hay copy y un argumento de venta apoyados en una
regla que no corre.

**Se decide con datos que ya existen** —`tests` guarda respuestas y θ desde el primer test—: cuántos
paran por `:max-items` vs `:exhausted`, qué SE final tienen, y a qué distancia del borde de banda cae
θ (A-11). Con eso, elegir entre subir el umbral, subir `max_items` o corregir lo que se promete.

**Terminado cuando:** el umbral es alcanzable **o** el copy dice lo que el test hace, y la decisión
está en un ADR.

**2026-08-28 — sigue abierta y la aritmética empeoró.** ADR-034 metió el azar al modelo, así que la
información máxima por ítem bajó de 0,25 a **≈0,155**: el piso del SE con 12 ítems pasó de 0,577 a
**≈0,73**, contra el mismo umbral de 0,35. Hay un test que lo deja clavado
(`progress_test/r38-la-parada-por-precision-sigue-sin-dispararse`), incluido que **ni 30 ítems**
alcanzan.

Se midió además la alternativa de fondo: **parar por certeza de banda** en vez de por SE da 83 % de
banda correcta contra 79 %, a cambio de 1,5 ítems más. Real pero modesto — y **apuntar los ítems al
corte de banda no ayudó** (78 % contra 79 %), que era la recomendación teórica obvia. El copy sigue
siendo el arreglo más barato y más honesto: `landing.cljs:40` dice «la estimación de tu nivel es
precisa con muchas menos preguntas».

### T-112 · Poner al día el ADR del estimador de θ — **P2** · `hecho` (2026-08-28)

ADR-004 describe una iteración de Newton-Raphson por respuesta y θ inicial 0.0. El código itera hasta
convergencia y arranca en `test_configs.initial_theta` (−1.0 por defecto). Ver [[OPEN_QUESTIONS]]
X-10.

Un ADR nuevo que reemplace a ADR-004 —sin editarlo: es un registro histórico— describiendo el
estimador real, y **escribiendo las dos consecuencias que hoy no están en ningún lado**: que con paso
0.4 y arranque en −1.0 hacen falta ≥7 ítems para llegar a θ = 1.5, y que el θ que se reporta es el
valor capado y no el MAP convergido, o sea sesgado hacia el θ de arranque.

**Vale la pena evaluar de paso:** reportar al cerrar el test el MAP sin capar (el capado se sigue
usando para elegir el ítem siguiente, que es para lo que existe el tope). Es barato y le pega directo
a la banda y a Δθ (G-4).

**Terminado cuando:** el ADR describe lo que corre, y el documento con el que se le explica el método
a un colegio es cierto.

**Cerrada 2026-08-28 por [[../adr/ADR-034-azar-fijo-prior-suelto-y-version-del-motor]]**, que
documenta el estimador real (converge, arranca en `initial_theta`, reporta el valor capado).

⚠️ **Una de las dos consecuencias que esta tarea daba por ciertas resultó falsa al medirla.** «Con
paso 0.4 y arranque en −1.0 hacen falta ≥7 ítems para llegar a θ = 1.5» es correcto sobre la
*capacidad* del tope, pero el tope **no llega a apretar**: quitarlo mueve θ entre 0,00 y 0,06
logits, porque el MAP se movía despacio por el prior, no por el tope. Por eso **no** se adoptó la
idea de reportar el MAP sin capar: el capado y el convergido casi no se distinguen, y el tope pasó a
ser una salvaguarda **más** necesaria al soltar el prior. El sesgo real venía de otro lado (D-65).

### T-113 · Rol `editor` / `profesor` para el banco — **P2** · `abierto`

Hoy `profiles.role ∈ {user, admin}` y **todas** las policies dicen `is_admin()`. ADR-032 dejó la
edición en vivo detrás de `:auth/admin?` a propósito: partir el rol obliga a revisar el esquema
entero para habilitar a nadie —bus factor = 1—.

**Cuando exista una segunda persona**, el camino barato es `public.can_edit_bank()`
(`role in ('admin','editor')`) usada **solo** en las policies de `questions`, `misconceptions` y
`resources`; el resto sigue en `is_admin()`. En el cliente, sustituir el `:auth/admin?` del editor en
vivo por una sub de capacidad.

**Relacionado:** T-79 (rol `profesor` para el panel docente de G-1), que es un rol distinto y con
otro alcance: mirar, no editar.

### T-114 · Evaluar 1PL con azar fijo (`c = 0.25`) — **P2** · `hecho` (2026-08-28)

Con cuatro alternativas, un estudiante muy por debajo del ítem acierta ~25 % de las veces, y bajo 1PL
puro ese acierto **empuja θ hacia arriba como si fuera evidencia plena**. El escape (ADR-029) reduce
el problema pero no lo elimina: sigue habiendo quien adivina.

**No es 3PL.** 3PL exige estimar `a`, `b` y `c` por ítem (~1.000 respuestas por ítem, y `c` casi no
identificable sin priors fuertes); con `difficulty` todavía autoral (R-17) sería ruido con apariencia
de rigor, que es lo que ADR-004 ya descartó. Acá `c` es **una constante**, no un parámetro estimado:

```
P = c + (1−c)·σ(θ−b)          c = 0.25 fijo
dP/dθ = (1−c)·σ(1−σ)
I(θ)  = [(1−c)·σ(1−σ)]² / [P(1−P)]
```

Son ~20 líneas en `components/tetha.cljs` + `irt/progress.cljs`, sin migración y con test.

**Ojo con el acoplamiento:** la información baja, así que el SE sube y empeora T-111. Las dos se
miran juntas o se rompe la experiencia sin que nadie lo note (ADR-004 §Seguimiento).

**Terminado cuando:** hay una medición sobre los tests ya rendidos que dice cuánto se mueve θ con y
sin `c`, y una decisión en un ADR.

**Cerrada 2026-08-28, implementada en D-65 / ADR-034.** La medición no se hizo sobre los tests ya
rendidos —son corridas del owner depurando, no estudiantes (R-37)— sino **simulando el motor real
sobre la distribución medida de `numbers_v1`**, que es más informativo y no espera a G-2.

**El hallazgo que cambió el alcance:** `c` solo **no se puede despachar**. Quita el sesgo hacia
arriba y destapa el del prior, que lo estaba tapando por accidente — en θ = 2,0 el sesgo empeora de
−0,40 a −0,82 y la banda correcta cae de 20 % a 4 %. Por eso ADR-034 mueve `c` **y** el prior en el
mismo commit. Resultado: en θ = −1,5 el sesgo baja de +1,00 a +0,31.

**El acoplamiento con T-111 se confirmó y es peor de lo anotado:** con `c = 0,25` la información
máxima por ítem cae de 0,25 a **≈0,155**, así que 12 ítems no bajan el SE de ≈0,73.

### T-116 · Recalibrar los cortes de fluidez contra el motor v2 — **P2** · `abierto`

Los umbrales de λ (`fluency_fluida_max`, `fluency_media_max`, migración `041`) se fijaron mirando
perfiles construidos con **θ del motor v1**, que sobreestimaba a los débiles en ~1 logit (D-65). El
cuadrante θ×λ de «Mi plan» cruza los dos ejes, así que un θ corregido mueve a gente de cuadrante sin
que λ haya cambiado.

No es urgente —los umbrales de λ ya estaban sin calibrar ([[RISKS]] R-24)— pero deja de ser cierto
que el único eje sin calibrar sea λ: ahora además el eje con el que se cruzó cambió de escala.

**Terminado cuando:** o se recalculan los cortes con θ de v2, o queda escrito en ADR-019 que el
cuadrante mezcla dos escalas y cuál es el error que eso introduce.

### T-117 · La banda del estudiante fuerte sigue en 37 % — **P1** · `abierto`

ADR-034 subió la banda correcta en θ = 2,0 de 18 % a 37 %. Es el doble y sigue siendo malo: **dos de
cada tres estudiantes avanzados quedan en la banda equivocada**, y la banda decide el cupo, o sea
con quién estudian.

El techo ahí no es el estimador sino **12 ítems**: medido, 20 ítems dan 70 % de banda correcta y 30
dan 79 %. Las tres salidas, que hay que elegir con el owner:

1. **Alargar el diagnóstico** (choca con el objetivo de los 20 minutos).
2. **Mover los cortes** de banda a donde la población sea delgada — ojo, medido: con 3 bandas mal
   puestas `intermedio` sube a 85 % pero `basico` cae a 41 %. **El lugar del corte pesa más que la
   cantidad.**
3. **Encadenar diagnósticos por eje** (la cadena números → álgebra/geometría/estadística que pidió
   el owner el 2026-08-28), donde cada eje aporta sus propios ítems.

**Relacionado:** T-111 (misma raíz: 12 ítems), y el diseño de la cadena de ejes.

### T-118 · Decidir el reparto de bandas con diagnósticos por eje — **P0** · `abierto`

**Es precondición de escribir un solo ítem nuevo**, y bloquea la primera tanda del eje de números.

`bands/default-bands` reparte los centros de los **18 módulos del producto** a lo largo de
`[-2.4, 2.4]` en orden curricular. Consecuencia medida: **el eje de números entero cabe en
[−2,85, −0,54]**. Eso es coherente con un diagnóstico único que recorra los cuatro ejes, y es
incorrecto con la cadena por eje que se adoptó — un estudiante que llega a θ = 1,3 rindiendo números
se queda sin ítems.

**No es hipotético: pasó el 2026-08-28.** El diagnóstico de `enteros` (banda derivada [−2,57, −1,67])
paró en 8 preguntas por `:exhausted` con θ = 1,29, o sea 1,83 logits sobre el techo de su banda.

**Propuesta:** declarar `modules.band_min`/`band_max` **explícitas** por módulo, de modo que **cada
eje reparta sus módulos a lo largo de todo `[-3, 3]`**. La maquinaria ya existe: `bands/band-for`
prefiere la explícita sobre la derivada y marca el origen. Reparto propuesto en
`.claude/skills/banco-de-items/referencias/ejes-y-bandas.md`.

**Lo que hay que aceptar si se aprueba:** el θ de números y el de geometría dejan de ser comparables
entre sí. No es pérdida real —la escala común entre ejes siempre fue hipótesis editorial, nunca
medición— y las cohortes se arman con el θ de un solo eje, que es consistente. Lo que deja de poder
decirse es «este estudiante está en nivel 2 en general».

**Terminado cuando:** las bandas explícitas están en una migración aplicada, o queda decidido por
escrito que la cadena por eje no se hace.

**2026-08-28 — aprobado por el owner y escrito en `049`.** Reparto adoptado: `numeros`
[−3,0, −1,6], `enteros` [−2,4, −1,0], `fracciones` [−1,8, −0,4], `potencias` [−1,0, +0,6],
`proporciones` [−0,2, +1,6], `porcentajes` [+0,6, +3,0], solapándose a propósito. **Queda por
aplicar la migración**; hasta entonces la tarea sigue abierta.

### T-120 · Revisar los 100 ítems del eje de números — **P1** · `abierto`

`050` trae 100 ítems y 47 ideas erróneas nuevas. Están verificados **mecánicamente**
(`verificar_items.py`: clave repartida, una sola correcta, las cuatro explicaciones, LaTeX,
cobertura) y **estructuralmente** (aplicados contra un PostgreSQL desechable). Los 25 ítems con
aritmética encima se comprobaron numéricamente uno por uno.

**Lo que ningún script puede verificar y solo el profesor puede:** que el distractor sea el error
que los estudiantes *de verdad* cometen, que el enunciado se entienda, que la explicación no rete
a quien acaba de equivocarse, y que la `difficulty` asignada tenga sentido pedagógico. T-105 son el
antecedente: 306 ítems revisados a mano, y ahí aparecieron los tres sin alternativa correcta.

**Sugerencia de orden:** revisar por módulo (la migración los agrupa así) y empezar por
`porcentajes`, que es donde están los ítems más difíciles y los razonamientos más finos (base
cambiante, porcentajes encadenados, puntos porcentuales).

**Terminado cuando:** los seis módulos están revisados y `050` aplicada.

### T-121 · Revisar los 100 ítems del eje de álgebra — **P1** · `abierto`

Igual que T-120 para números: `052` trae 100 ítems y 34 ideas erróneas nuevas, verificados
mecánicamente y con las 15 identidades algebraicas comprobadas numéricamente. **Lo que falta es la
revisión pedagógica**, que ningún script hace.

Los módulos con más riesgo son `polinomios` y `funciones`: ahí los distractores dependen de signos
y de productos notables, que es donde un error de redacción se disfraza mejor de alternativa
plausible.

**Terminado cuando:** los cinco módulos están revisados y `052` aplicada.

### T-122 · Retirar de circulación el banco `polinomios` viejo — **P2** · `abierto`

`polinomios` tiene **18 de sus 20 ítems dentro de 0,045 logits**: no es una escala de dificultad,
es una constante con ruido, y ningún test adaptativo puede discriminar dentro de él (medido en
SESSION-031). `052` construye el reemplazo bajo el topic `algebra`, pero **deja los 20 viejos
intactos a propósito**: borrarlos tocaría el historial de `tests` que los referencia.

Lo mismo aplica a los demás fragmentos del eje: `terminos_semejantes` (10), `factorizacion` (8),
`ecuaciones_simples` (5), `division_algebraica` (5), `variables_coeficientes` (4),
`operaciones_algebraicas` (3), `sistemas_ecuaciones` (3), `ecuaciones lineales` (3),
`inecuaciones` (2), `expresiones algebraicas` (1), `multiplicacion_monomios` (1),
`notacion_algebraica` (1). Ninguno sostiene un diagnóstico por sí solo.

**Camino sugerido:** `active = false` en vez de `delete`, y desactivar su `test_configs`. Es
reversible y no toca el histórico. **Desde `057` esto ya funciona de verdad** — antes la columna no
existía.

> ⚠️ **2026-08-28 — corrección: `questions.active` no existía.** Este «camino sugerido» se escribió
> suponiendo una columna que la tabla no tenía, y `next_question` tampoco filtraba por nada
> equivalente: un ítem «marcado inactivo» se seguía sirviendo, y en realidad ni siquiera se podía
> marcar. La crea `057`, junto con el filtro en la RPC. Desactivar el `test_configs` del banco sí
> funcionaba, porque saca el banco entero del selector; lo que no existía era retirar ítems sueltos.

⚠️ **Antes de desactivar, revisar si alguno de esos ítems vale la pena rescatar** hacia el banco
nuevo: son contenido que alguien escribió, y `052` no los reemplaza uno a uno.

**Terminado cuando:** el estudiante ve un solo banco de álgebra en su selector, y el histórico
sigue intacto.

### T-123 · Revisar los 100 ítems del eje de geometría — **P1** · `abierto`

Igual que T-120 y T-121: `054` trae 100 ítems y 33 ideas erróneas nuevas, verificados
mecánicamente, con **los 100 enunciados comprobados uno por uno contra su clave** y aplicados
contra un PostgreSQL desechable. **Lo que falta es la revisión pedagógica**, que ningún script hace.

Los módulos con más riesgo son `angulos` y `circulo`: en ángulos casi todos los distractores son el
mismo número calculado con la referencia equivocada ($90^\circ$ en vez de $180^\circ$, o $360^\circ$),
así que un descuido de redacción produce dos alternativas defendibles; en círculo, la mitad de los
ítems dejan el resultado en función de $\pi$ y hay que decidir si así se pregunta en la PAES.

**Ojo con la banda de `basica`:** son 15 ítems entre $-3{,}0$ y $-1{,}8$, y en ese piso la
`difficulty` es la hipótesis más frágil de las tres tandas — nadie ha visto todavía a un estudiante
fallar «¿cuánto mide un ángulo recto?».

**Terminado cuando:** los siete módulos están revisados y `054` aplicada.

### T-125 · Los cuatro bancos nuevos no llegaban a nadie — **P0** · `cerrado 2026-08-28`

**Ninguna migración de banco (`050`, `052`, `054`, `056`) crea su fila en `test_configs`.** Esa
tabla está keyed por `questions.topic` y es la que arma el selector de diagnósticos y la regla de
parada (`020`, [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]]). Se sembró en `020` con
los topics que existían **en ese momento**; los topics nuevos no aparecen solos.

✅ **Confirmado el 2026-08-28: los cuatro tenían 0 filas de config.** 414 ítems aplicados en
producción e inalcanzables. Lo cierra `059_test_configs_de_los_cuatro_ejes.sql`, que **todavía hay
que aplicar** (T-126). La consulta que lo midió:

```sql
select q.topic,
       count(*) as items,
       (select count(*) from public.test_configs c where c.topic = q.topic) as tiene_config,
       (select bool_or(c.active) from public.test_configs c where c.topic = q.topic) as activo
  from public.questions q
 where q.topic in ('numeros','algebra','geometria','probabilidad')
 group by q.topic order by q.topic;
```

**Decisiones del owner (2026-08-28), ya incorporadas a `059`:** los cuatro entran **publicados**
(`active = true`) y **encadenados** —`numeros` como `prerequisite_topic` de los otros tres, sin
`min_theta`—, con los parámetros de parada de `020` (5/12/0,35). Cambiar la regla de parada es otra
decisión y tiene su propia evidencia en T-111 y T-117.

**Dos consecuencias aceptadas:** el selector va a mostrar **bancos duplicados** hasta que se cierre
T-122, y los 414 ítems se publican **sin revisión pedagógica** (T-120, T-121, T-123, T-124), que
por eso pasan a ser lo más urgente del contenido: ahora sí llegan a un estudiante.

**Es P0 porque toca el riesgo dominante R-30:** cuatro tandas de contenido aplicadas que nadie
puede rendir son exactamente «más producto y cero uso».

**Terminado cuando:** ~~cada banco tiene su fila y un estudiante puede rendir los cuatro
diagnósticos~~ → ✅ hecho: `059` aplicada el 2026-08-28.

### T-126 · Aplicar `057`, `058` y `059` — **P0** · `cerrado 2026-08-28`

`055` y `056` se aplicaron el 2026-08-28 en su **versión original**, antes de que el owner precisara
que varianza y desviación estándar no entran en M1. **Orden: `055` → `056` → `057` → `058` → `059`.**
`055` y `056` nuevas ya están aplicadas (2026-08-28: `probabilidad` quedó con 114 ítems, o sea con
los 14 nuevos adentro); faltan las tres últimas, en la misma sesión.

- `055` y `056` nuevas: crean `probabilidad/conteo`, corrigen la banda de `probabilidad/posicion` e
  insertan los 14 ítems nuevos. Los 100 ya cargados no se tocan (idempotencia por `(topic, question)`).
- `058`: el delta sobre lo ya cargado — cinco ítems de rango que cambian de módulo, tres
  explicaciones de cuartiles a la convención DEMRE, los 12 ítems fuera de temario a `active = false`,
  y el módulo `probabilidad/dispersion` borrado.
- `057`: **crea `questions.active`** —que no existía— y hace que `next_question` la respete. Al
  aplicarse no hay ningún ítem inactivo, así que no cambia lo que recibe ningún estudiante.
- `058`: la reparación propiamente tal. **Se niega a correr sin `057`**, verificado.
- `059`: crea las cuatro filas de `test_configs` y publica los bancos (T-125). **Se niega a correr
  sin `057`, y también si queda algún ítem de varianza o desviación activo en `probabilidad`** —o
  sea, si `058` no está aplicada. Las dos guardas verificadas contra la réplica.

**Mientras `057` no esté aplicada no hay forma de retirar un ítem sin borrarlo**, y por eso las dos
van juntas.

✅ **Cerrada el 2026-08-28.** Las tres aplicadas por el owner y verificadas: **0 módulos
`probabilidad/dispersion`, 102 activos, 12 inactivos**. La guarda de `059` frenó una vez el intento
de publicar con `058` sin aplicar — hizo exactamente su trabajo. No quedan migraciones pendientes.

### T-124 · Revisar los 102 ítems del eje de probabilidad y estadística — **P1** · `abierto`

Igual que T-120, T-121 y T-123: `056` trae 102 ítems y 45 ideas erróneas nuevas, verificados
mecánicamente, revisados uno por uno contra su clave y aplicados contra un PostgreSQL desechable.
**Falta la revisión pedagógica**, que ningún script hace.

✅ **Las dos preguntas de contenido que bloqueaban esta tarea están respondidas** (owner,
2026-08-28) y ya están incorporadas al banco:

1. **Convención de cuartiles del DEMRE para datos no agrupados.** Se ubica la posición
   $P = \dfrac{k \cdot n}{4}$. Si $P$ es **decimal**, se aproxima **siempre al entero siguiente**
   y el cuartil es el dato de esa posición; si $P$ es **entero**, el cuartil es el promedio de los
   datos de las posiciones $P$ y $P+1$. $Q_2$ es siempre la mediana. La regla queda escrita en
   [[../.claude/skills/banco-de-items/referencias/ejes-y-bandas]] para las tandas siguientes.
2. **Varianza y desviación estándar NO entran en el temario M1 de Admisión 2027.** Salieron los 12
   ítems que las usaban; el módulo 340 pasó a ser `probabilidad/conteo` y los cinco ítems de rango
   se mudaron a `probabilidad/posicion`.

**Lo que sigue siendo criterio del profesor:** que el distractor sea el error que los estudiantes
de verdad cometen, que la explicación no rete a quien acaba de equivocarse y que la `difficulty`
tenga sentido pedagógico. Los módulos con más riesgo son `reglas` —donde casi todo depende de
distinguir excluyentes de independientes— y `datos`, donde varios ítems describen un gráfico con
palabras porque el banco todavía no soporta imágenes.

**Terminado cuando:** los seis módulos están revisados y `056` aplicada.

### T-119 · Crear los módulos de probabilidad y estadística — **P1** · `cerrado 2026-08-28`

✅ **Cerrada por `055`**, que crea los seis módulos del eje con su `track`, su `order_index`
(310…360) y su banda explícita. La lista la decidió el owner sobre el temario PAES M1. Queda
**sin aplicar**, como toda la cadena `051`…`056`.

La migración `046` amplió el check de `track` para admitir `probabilidad`, pero **nadie creó los
módulos**: el cuarto eje del temario DEMRE tiene **cero módulos y cero ítems**. Sin módulos,
`module_id` queda en null y el plan de estudio no puede recomendar nada para ese eje.

La lista de contenidos es **decisión del owner** —sale del temario DEMRE— y no se inventa
([[OPEN_QUESTIONS]], regla de §6 de `CLAUDE.md`).

**Terminado cuando:** existen los módulos del eje con su `track`, `order_index` y banda, y
`bands/product-modules` los toma.

### T-109 · Borrar `src/universo/animations.cljs` (código muerto) — **P3** · `abierto`

Contiene un `movable-box`, un `"WOW"` animado y un `fade-in-page` de ejemplo. **`grep` confirma que
ningún namespace lo requiere** (verificado 2026-08-23). Es además el fósil del enfoque canvas +
`requestAnimationFrame` que ADR-031 descartó para el fondo, así que dejarlo es una invitación a
repetirlo.

No se borró en SESSION-036 porque el owner no lo pidió y borrar código no solicitado no corresponde.

**Terminado cuando:** el archivo no existe y `clj -M:test` sigue en verde.

### T-104 · Panel de módulos en administración — **P2** · `abierto`

**Los 35 módulos solo existen por SQL.** No hay forma de crear, renombrar, reordenar ni cambiarle el
track a un módulo desde el panel: hay que escribir una migración y aplicarla a mano en el SQL Editor.

**Por qué importa más de lo que parece:** de `modules` cuelgan «Mi plan», los 112 recursos, el
`module_id` de cada ítem del banco, las misconceptions catalogadas y —desde `045`— el grafo de
prerrequisitos. Es la única entidad estructural del producto que **no** se puede tocar con la
herramienta con la que se produce todo lo demás.

**Alcance mínimo:** listar, crear, renombrar, cambiar `order_index` y `track`. **Borrar no**, o no
sin mirar antes qué cuelga: a diferencia de `misconceptions` (FK `on delete set null`), acá un
borrado arrastra contenido real.

**Precondición:** `crud` no tiene `upsert-module!` ni `delete-module!` — solo `fetch-modules`.

- **Terminado cuando:** un admin puede crear y reordenar módulos desde el panel sin escribir SQL.
- **Relacionado:** T-57, T-60, T-103, `045`, `sessions/SESSION-033.md`.

### T-24 · Estado vacío honesto en "Mi plan" y "Cupos" — **P1** · `hecho` (2026-08-03, mergeado a `main` 2026-08-05)

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
- **No verificado en vivo por el agente:** ambas pantallas son secciones protegidas (requieren
  login); el agente no tiene credenciales de una cuenta de prueba.
- **✅ Mergeado a `main` (2026-08-05):** el owner revisó y aprobó, PR #21 (commit de merge
  `787d337`). Verificado por hash que producción sirve el build nuevo (mismo patrón que T-19).

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

### T-38 · Tema oscuro con toggle en la barra de navegación — **P2** · `hecho` (2026-08-05, mergeado a `main`)

Pedido explícito del owner: un botón para cambiar la app a tema oscuro. Preguntado por el alcance,
el owner eligió **toda la app**, no solo landing/nav/footer.

**Implementado 2026-08-05** (rama `t-24-estado-vacio-honesto`, commit `823e177`):
- Botón sol/luna en `universo.home/navigation`, siempre visible (escritorio y móvil, fuera del menú
  colapsable). Ver [[../adr/ADR-012-tema-oscuro-mapeo-css-global]] por qué en la nav y no en el
  footer.
- `universo.events.theme` (nuevo, agregado al `:require` de `core.cljs`): `:theme/init` (lee
  `localStorage` o `prefers-color-scheme`), `:theme/toggle`, persistencia en `localStorage`.
- Script inline en `index.html`/`public/index.html` que aplica la clase `dark` a `<html>` antes de
  cargar `app.js` (sin flash de tema claro al recargar con oscuro guardado).
- Cobertura de los ~15 componentes alcanzables vía mapeo global de clases en `src/css/app.css`
  (`.dark .clase-existente`), no `dark:` por elemento — decisión completa con alternativas
  evaluadas en [[../adr/ADR-012-tema-oscuro-mapeo-css-global]].
- `tailwind.config.js`: `darkMode: 'class'`.
- `clj -M:test`: 34/133/0/0 (sin cambios, no hay lógica pura nueva). `shadow-cljs release app`:
  0 warnings. `npm run build:css` ejecutado dos veces (segunda vez tras agregar la regla de
  `<input>`/`<textarea>`/`<select>`, encontrada al verificar en el navegador).
- **Verificado en vivo en el navegador** (Chrome vía `claude-in-chrome`, servidor estático local):
  landing completa (hero, pasos, modalidades, testimonios, FAQ, CTA), nav, footer, login, libro de
  visitas (con datos reales de Supabase), currículum del profesor, aviso de privacidad — en ambos
  temas, con persistencia tras recargar.
- **No verificado en vivo:** las secciones protegidas por sesión (`dashboard`, `plan`, `cupos`,
  `admin`, `cuenta`, `diagnóstico`) — el agente no tiene credenciales de prueba. Usan el mismo
  vocabulario de color que sí se verificó en las pantallas públicas, pero no hay confirmación visual
  directa de esas pantallas en oscuro.

- **✅ Mergeado a `main` (2026-08-05, PR #21, commit `787d337`)** y verificado por hash que
  producción sirve el build nuevo. Sigue pendiente, sin bloquear el cierre de este ticket, que el
  owner confirme visualmente las secciones protegidas no verificadas por el agente.
- **Terminado cuando:** existe un botón de tema que cambia toda la app entre claro y oscuro,
  persiste la elección, y se ve correctamente en cada sección. ✅
- **Relacionado:** [[../adr/ADR-012-tema-oscuro-mapeo-css-global]], [[LESSONS_LEARNED]] L-35,
  [[ASSUMPTIONS]] A-30.

### T-26 · Semántica del re-diagnóstico — **P2** · `a medias` (la mitad visible, hecha 2026-08-18)

Hoy `student_profiles` es una materialización única: repetir el test sobrescribe el perfil.

> **Estado al 2026-08-18.** Ya no está bloqueada: **Q-07 fue respondida por D-50** el 2026-08-16
> (el histórico se versiona, nunca se sobrescribe). Y **la mitad visible del criterio ya está
> entregada**: el tablero agrupa por evaluación y muestra **Δθ desde el primer intento**, calculado
> desde `tests`, que sí guarda una fila por intento (D-60, SESSION-034). Con eso **X-02 dejó de ser
> una afirmación falsa publicada**.
>
> **Lo que falta es la otra mitad:** versionar `student_profiles`, para que el histórico de
> *perfiles* —misconceptions, fluidez— también se conserve y no solo el θ. Eso es lo que D-50 manda
> y sigue sin implementarse.

- **Terminado cuando:** está decidido (✅ D-50: versionar), implementado (⏳ `student_profiles`
  sigue sobrescribiéndose) y el estudiante puede ver cómo se movió su θ entre diagnósticos
  (✅ 2026-08-18).

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

### T-39 · Config de parada por banco y progresión por prerequisitos — **P1** · `hecho` (2026-08-08, mergeado a `main` vía PR #23)

Pedido del owner: la regla de parada IRT (min/max ítems, SE) era un único valor global sin
importar el banco (`topic`), y no existía ningún concepto de progresión entre tests — cualquier
usuario veía y podía iniciar cualquier topic. Diseño completo y decisiones en
[[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]] (tres rondas de ajuste con el owner:
de una tabla de accesos otorgados, a desbloqueo por "topics con error", a la cadena de
prerequisitos + θ mínimo finalmente implementada).

- **Implementado (código, 2026-08-08):**
  - `supabase/migrations/020_test_configs.sql` — tabla `test_configs` (min/max items, SE, tiempo
    máximo, `prerequisite_topic` self-FK, `min_theta`, `active`), seed inofensivo (sin
    prerequisito para ningún topic existente).
  - `supabase/migrations/021_tests_topic_theta_rls.sql` — columnas `topic`/`theta` en `tests`,
    policy `tests_select_own` (no existía ninguna policy de SELECT propia del usuario) y
    `enable row level security` idempotente (no había evidencia versionada de que estuviera
    habilitado).
  - `universo.access` (namespace puro nuevo) — `best-theta-by-topic`/`unlocked-topics`, con tests.
  - `universo.irt.progress/stop-reason` — nueva 4.ª aridad con `elapsed-minutes` para el límite de
    tiempo (`:time-limit`), 2.ª/3.ª aridad sin cambios (compatibilidad con ADR-004).
  - `events/test.cljs` — topics filtrados por lo que el usuario ya desbloqueó, `stop-config` por
    topic, fix del bug donde `stop-reason` nunca recibía una config custom.
  - Admin → "Configuración de tests" (`admin_test_configs.cljs`) — CRUD de `test_configs`.
  - `clj -M:test`: 39 tests / 149 assertions / 0 failures. `shadow-cljs release app`: 0 warnings.
- **Cerrado (2026-08-08):** el owner aplicó `020`/`021` en el proyecto Supabase real y probó el
  flujo en local (funcionó; encontró 3 mejoras menores de UX, registradas como T-40/T-41/T-42).
  PR #23 (`t-24-estado-vacio-honesto` → `main`, merge `370ed64`) mergeado. **Verificado por hash**
  (mismo patrón que T-19/T-35/T-38): MD5 de `https://jacobocordova.com/public/js/app.js` =
  `5c14cadf35b54788c0872501ac89dc28`, idéntico al de `git show origin/main:public/js/app.js`.
  Producción sirve el build nuevo.
- **Terminado cuando:** migraciones aplicadas, flujo verificado en vivo con un usuario de prueba
  (prerequisito bloqueado → rendido con θ bajo → rendido de nuevo con θ suficiente → desbloqueado),
  y el bundle recompilado publicado en `main`. **Todo lo anterior cumplido.**
- **Relacionado:** [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]], [[OPEN_QUESTIONS]]
  Q-06 (evitado a propósito, no resuelto), Q-07 (el "mejor θ por topic" usa el historial de
  `tests`, pero no resuelve la semántica completa de re-diagnóstico de T-26).

### T-40 · Columna de cantidad de preguntas por test en el panel admin — **P2** · `hecho` (2026-08-08, sin verificar en vivo)

Feedback del owner tras probar T-39 en local (2026-08-08): en Admin → "Configuración de tests"
(`admin_test_configs.cljs`, `test-configs-list`) sería útil ver cuántas preguntas tiene cada topic
antes de exigirle una regla de parada (min/max ítems) que el banco no pueda cumplir — el problema
original que motivó T-39.

**Implementado 2026-08-08:**
- `universo.catalog/count-by-topic` (namespace puro nuevo) — filas de `questions` → `{topic →
  cantidad}`, descartando topics nulos/vacíos con el mismo criterio que `crud/get-distinct-topics`.
- `crud/fetch-question-counts-by-topic` — un solo request con `count: exact` además de las filas.
  **Hallazgo:** el patrón existente (`get-distinct-topics`) trae todas las filas y agrega en el
  cliente, así que una respuesta recortada por PostgREST (`db-max-rows`) daría un conteo más chico
  que el real **en silencio** — y ese es justo el número con el que el admin fija min/max ítems.
  Se agregó `catalog/counts-truncated?` (compara filas traídas vs. `count` exacto del servidor) y
  la columna muestra `≥ N` en vez de `N` cuando eso pasa.
- Columna "Preguntas" en `test-configs-list`, en ámbar con `⚠` y `title` explicativo cuando el
  banco tiene **menos preguntas que el `max_items` configurado** — el desajuste concreto que
  motivó el ticket queda a la vista, no solo el número crudo.
- El conteo es informativo: si su fetch falla, la tabla se muestra igual con `—` en vez de marcar
  la sección en error.
- **No verificado en vivo por el agente:** requiere login de admin real (sin credenciales en esta
  sesión). Solo revisión de código, `clj -M:test` 42/162 y compilación limpia.
- **Terminado cuando:** cada fila del panel muestra el número de preguntas del banco
  correspondiente, sin necesidad de ir a la pestaña Preguntas a contarlas a mano. ✅ código listo,
  falta verificación visual del owner.
- **Relacionado:** [[BACKLOG]] T-39, T-42, `src/universo/catalog.cljs`,
  `src/universo/components/admin_test_configs.cljs`.

### T-41 · Revisar la paleta del tema oscuro — **P2** · `hecho` (2026-08-13, falta verificación visual del owner)

Feedback del owner tras probar T-39 en local (2026-08-08): "mejorar la paleta oscura de alguna
forma", sin precisar qué concretamente (¿contraste, combinación de colores, algún componente en
particular?). Por regla de gobernanza de la memoria, no se inventó el detalle faltante, y la tarea
quedó cinco días parada esperándolo.

**El detalle llegó el 2026-08-13** y resultó ser dos cosas distintas:

1. **Un bug de legibilidad**: "el tema oscuro tiene en algunos casos del panel letras negras,
   imposible de leer".
2. **Un problema de identidad**: "se parece mucho a otras páginas, es algo genérica, en su paleta de
   colores".

**Lo que se encontró al investigar** (el audit está en `scripts/audit_dark_theme.py`): la cobertura
por clase de ADR-012 estaba bien — 164 clases usadas contra 91 mapeadas. El agujero era otro:

- **el tema oscuro nunca definió un color de texto base**, así que todo elemento sin clase `text-*`
  explícita heredaba el negro del navegador. Por eso fallaba en "algunos casos" y no en toda la app;
- **las `<option>` no heredan el color del `<select>`**, y el panel usa desplegables por todos lados;
- **`tailwind.config.js` tenía `theme: { extend: {} }`**: cero tokens propios. Esa es la razón
  técnica de lo genérico — no que "la IA le dé el mismo código a todos", sino que nunca se definió
  una identidad y quedó el default de fábrica.

**Hecho:** las tres correcciones, más la paleta "tinta y pergamino" que eligió el owner, aplicada
redefiniendo la escala `indigo` para no tocar los ~15 componentes
([[../adr/ADR-020-identidad-visual-por-tokens]]).

- **Terminado cuando:** ~~el owner especifique qué no le convence~~ ✅ especificado e implementado.
  Los 15 pares de la paleta cumplen su umbral WCAG (`scripts/audit_contraste.py`), 12 en AAA.
  ⏳ **Falta que el owner lo vea aplicado** y diga si ajusta algún valor — los tokens están en un
  solo archivo, así que ajustar es barato.
- **Relacionado:** [[../adr/ADR-012-tema-oscuro-mapeo-css-global]], T-38 (verificación visual de los
  paneles protegidos, sigue abierta).

### T-42 · Nombre de fantasía editable por test — **P2** · `hecho` (2026-08-10)

Feedback del owner tras probar T-39 en local (2026-08-08): quiere poder cambiar el nombre visible
de cada evaluación ("nombre de fantasía"), no solo su `topic` técnico. Hoy ese nombre sale de un
diccionario estático hardcodeado (`topic-labels`,
`src/universo/components/diagnostic_test.cljs:15-27`), que solo cubre un puñado de topics
conocidos y no es editable desde ningún panel.

**Implementado 2026-08-08:**
- `supabase/migrations/022_test_config_display_name.sql` — `test_configs.display_name text`
  nullable + check `test_configs_display_name_not_blank` (un nombre en blanco se guarda como
  `null`, para tener una sola representación de "sin nombre"). **Sin backfill a propósito:** nadie
  ve un cambio hasta que un admin escriba un nombre.
- `universo.catalog/topic-label` (namespace puro nuevo) — regla de precedencia con test:
  `display_name` del admin → diccionario estático → `topic` con guiones bajos como espacios. El
  diccionario `topic-labels` se movió aquí desde `diagnostic_test.cljs` para tener una sola fuente.
- Campo "Nombre visible" en el editor de `admin_test_configs.cljs` (con el nombre por defecto como
  `placeholder`, para que se vea qué pasa si se deja vacío); el listado muestra el nombre visible
  con el `topic` técnico como subtexto.
- `db/crud.cljs` — `display_name` en `test-config-payload` (blanco → `null`, espejo del check SQL);
  `fetch-test-configs` ya usaba `select *`, no necesitó cambios.
- `diagnostic_test.cljs/topic-label` pasa a leer `:test/configs` (suscripción agregada en esta
  misma sesión) y aplica el nombre configurado en las tres pantallas del flujo: selector, cabecera
  de cada pregunta y resultados.
- ~~**Falta para cerrar:** que el owner aplique `022` en el proyecto Supabase real.~~

**✅ Cerrado 2026-08-10.** `022` **ya estaba aplicada**; lo que faltaba era la marca en
`supabase/SCHEMA.md`, que quedó sin poner el 2026-08-08. Se detectó al revisar el estado de las
migraciones durante T-57 y el owner lo verificó en el proyecto real:

```sql
select column_name from information_schema.columns
where table_name = 'test_configs' and column_name = 'display_name';
-- → display_name
```

**Lección (no es un caso aislado):** durante dos días la memoria del proyecto afirmó implícitamente
que una migración estaba pendiente cuando no lo estaba, y eso llevó a documentar en dos lugares un
fallo (`"Nombre visible" no guarda`) que nunca ocurrió. La marca de aplicada en `SCHEMA.md` es el
único registro de qué hay realmente en la base — omitirla no es un detalle cosmético.

- **Terminado cuando:** un admin puede asignarle un nombre de fantasía a cualquier topic desde el
  panel, y ese nombre (no el `topic` técnico) es lo que ve el estudiante en el selector de
  evaluaciones. ✅ (código verificado por compilación y tests; **no verificado en vivo** por el
  agente — falta que el owner escriba un nombre en el panel y lo vea reflejado como estudiante)
- **Relacionado:** [[BACKLOG]] T-39, T-40, [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]],
  `supabase/SCHEMA.md`.

### T-53 · "Recursos recomendados" mostraba la biblioteca completa — **P1** · `hecho` (2026-08-09)

Detectado al auditar cómo se implementan los recursos de aprendizaje (pregunta del owner sobre
estrategia de contenido, 2026-08-09). El plan **no personalizaba los recursos**, y además lo
presentaba como si lo hiciera.

**Tres defectos encadenados, todos en la ruta `plan.cljs` → `events/plan.cljs` → `crud.cljs`:**

1. `:plan/load-resources` calculaba los slugs de los déficits y luego despachaba el efecto con
   **`nil` literal** (`:plan/fetch-resources! nil`) — los módulos nunca llegaban al fetch.
2. `crud/fetch-resources-for-modules` **ignoraba su parámetro `module-ids`** y delegaba en
   `fetch-published-resources` (misma clase de defecto que T-43). Era código muerto que aparentaba
   filtrar.
3. El filtro real ocurría en el cliente al guardar, con un fallback
   `(if (seq filtered) filtered rows)` que, al no encontrar coincidencias, **devolvía los 58
   recursos publicados** bajo el título "Recursos recomendados".

El fallback se disparaba casi siempre: por T-51, el 51 % de las preguntas no tiene `module_id` y
solo `numbers_V1`/`enteros` están en `topic->module-slug`, así que la mayoría de los déficits sale
como `unknown/<topic>` y no cruza con ningún recurso.

**Causa de fondo adicional (carrera):** `:plan/enter` carga perfil y recursos **en paralelo**, así
que filtrar dentro del handler hacía que el resultado dependiera de cuál respuesta llegara primero.
El fallback también estaba tapando eso.

**Implementado 2026-08-09:**
- **`universo.plan`** (namespace puro nuevo, ADR-009) — `resources-for-deficits` devuelve
  `{:kind :personalized|:general :resources [...]}`. Los recursos personalizados salen **en orden
  de severidad del déficit** (aprovechando que `deficits-from-responses` ya viene ordenado). El
  `:kind` es la pieza central: permite que la UI no llame recomendación a lo que no lo es.
- `:plan/resources` pasa de leer estado a **derivarlo en la suscripción**, lo que elimina la
  carrera: se recalcula sola cuando llega cualquiera de las dos cargas.
- `:plan/resources-loaded` guarda las filas crudas; ya no decide qué se muestra.
- `components/plan.cljs` — el título cambia a "Material de estudio disponible" y aparece un aviso
  ámbar explícito cuando no se pudo personalizar. **No se ocultó el material**: se dejó de mentir
  sobre él (mismo criterio de honestidad de T-24).
- Borrados `crud/fetch-resources-for-modules` (muerta) y `:plan :deficit-slugs` de `default-db`.
- `clj -M:test`: **45 tests / 178 assertions / 0 failures** (antes 42/162). `shadow-cljs release
  app`: 0 warnings. `clj-kondo`: sin hallazgos nuevos en los archivos tocados.

- **Terminado cuando:** un estudiante con déficits mapeados ve solo los recursos de sus módulos, y
  uno sin déficits mapeados ve material rotulado como general en vez de una recomendación falsa. ✅
- **⚠ Consecuencia visible, a propósito:** hasta que se cierre **T-51**, la mayoría de los
  estudiantes caerá en la rama `:general`. Eso no es una regresión del arreglo — es el estado real
  que el fallback ocultaba, ahora visible. **T-51 pasa a ser el bloqueo real de la capa 1.**
- **No verificado en vivo:** "Mi plan" es sección protegida y el agente no tiene credenciales de
  estudiante; solo revisión de código, tests, lint y compilación limpia.
- **Relacionado:** T-51 (mapeo de módulos, el bloqueo de fondo), T-43 (mismo patrón de parámetro
  ignorado), T-24 (estados vacíos honestos), [[../adr/ADR-005-banco-de-items-en-vez-de-cms]],
  [[RISKS]] R-10.

---

## Épica E5 — Contenido y calidad pedagógica

### T-27 · Enriquecer `error_*` de los ítems más fallados — **P1** · `abierto`

Regla editorial de `supabase/CONTENT.md`: cada distractor con una idea errónea nombrable, 1–2
frases, KaTeX si hace falta, `module_id` correcto.

- **Terminado cuando:** los ítems de los 3 topics más fallados tienen los cuatro `error_*`
  completos y revisados.

**Actualización 2026-08-09 (ADR-016):** esta tarea es el **primer lote** del pipeline de autoría
asistida por IA ([[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]]), y es la de mejor
relación valor/costo de toda la épica: las `error_*` son 1–2 frases, así que son baratas de generar
y —lo que realmente importa— **baratas de auditar**, a diferencia de un recurso largo. Escala: 387
preguntas × 4 distractores ≈ 1.548 explicaciones posibles, imposible a mano.

- **Criterio de priorización, ahora con datos:** ya existen **252 diagnósticos rendidos de 80
  usuarios** (hallazgo colateral de T-01), así que "los 3 topics más fallados" **se puede medir** en
  vez de estimarse. Medirlo es el primer paso de la tarea, no un detalle.
- **Forma de entrega obligatoria (ADR-016):** migración SQL con el lote, auditoría rehaciendo cada
  cuenta, publicación humana. No editar suelto en el panel ni en SQL directo.
- **Relacionado:** [[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]], T-51 (`module_id`
  correcto es parte del checklist editorial y hoy falta en el 51 % del banco), T-29.

### T-28 · Completar el mapeo `topic → module-slug` — **P1** · `abierto`

`universo.profile/topic->module-slug` cubre un subconjunto; lo demás cae en `unknown/*` y por lo
tanto **no genera déficit accionable ni recursos**.

- **Terminado cuando:** todo `topic` presente en `questions` tiene mapeo a un `modules.slug`
  existente, con test que lo verifique contra la lista de topics reales.
- **Relacionado:** [[OPEN_QUESTIONS]] Q-06.

### T-44 · Filtro de respuestas no esforzadas (Fase 1 de ADR-014) — **P1** · `hecho` (2026-08-10, **en producción y verificado por hash**)

Hace **verdadera** la afirmación ya publicada en la FAQ ("el tiempo de respuesta también se
considera en la estimación"), hoy falsa (contradicción X-01, [[OPEN_QUESTIONS]] Q-17). Es la única
parte del diseño de tiempos que **no depende de tener datos**, así que se puede hacer antes del
go-live. Diseño completo y alternativas descartadas en
[[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]].

- **Trabajo:**
  - `universo.components.tetha` — `first-derivative`/`second-derivative` aceptan peso por respuesta
    (`w` por defecto `1.0`): `(+ sum (* w (- observed prob)))` y `(- sum (* w prob (- 1.0 prob)))`.
  - `universo.irt.progress` — el mismo peso entra en la información de Fisher, para que
    `standard-error` no mienta. **Este es el punto que es fácil olvidar.**
  - Función pura nueva que decide el peso desde `:time-ms` y el largo del enunciado. Umbral inicial
    conservador `t_min = max(3 s, caracteres / 20)`; `w = 0` bajo el umbral.
  - Columna `min_response_seconds` en `test_configs` (migración nueva) + campo en el panel admin,
    para que el umbral sea configurable por banco como el resto de la config de parada (ADR-013).
- **Terminado cuando:** una respuesta bajo el umbral **no mueve θ** y **sí sube el SE**, verificado
  con test en el namespace puro; el umbral es editable desde Admin → Configuración de tests; y
  `clj -M:test` sigue verde.
- **Ojo:** no requiere migración de datos ni backfill. `:time-ms` ya se persiste dentro de
  `tests.test` (`events/test.cljs:357`, `:test/complete`), así que no hay nada que instrumentar.
- **Relacionado:** [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] §Fase 1,
  [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]], [[OPEN_QUESTIONS]] Q-17 y X-01, [[RISKS]] R-17.

**✅ Implementado 2026-08-10.** `universo.irt.effort` (namespace puro nuevo) decide el peso;
`tetha/first-derivative` y `second-derivative` lo aplican, y `progress/fisher-information` lo hereda
—así el SE sube al descartar evidencia en vez de mentir, que es el punto que el ADR marca como fácil
de olvidar—. El peso se calcula **una sola vez, al registrar la respuesta** (`:test/answer-scored`)
y viaja dentro de `tests.test` (D-36): recalibrar el umbral después no reescribe la historia,
porque `:time-ms` también sigue guardado. Migración `028_test_config_min_response_seconds.sql`
(`not null default 3`, check 0–120) + campo "Segundos mínimos por respuesta" y columna "Mín. resp."
en Admin → Configuración de tests.

Dos decisiones que el ticket no especificaba y conviene conocer:

- **`:time-ms = 0` NO descarta la respuesta.** La UI manda 0 cuando el cronómetro no llegó a
  arrancar (`diagnostic_test.cljs:153`), así que 0 es el centinela de "no medido", no de "respondió
  instantáneamente". Descartar por ese 0 sería tirar evidencia válida por un defecto de medición.
  Ante la duda se conserva.
- **Sin backfill.** Las respuestas ya rendidas no tienen `:weight` y cuentan con peso 1.0. Este
  filtro no reinterpreta hacia atrás lo que ya se midió y se le mostró a alguien.

`clj -M:test` **57 tests / 292 assertions / 0 failures** (antes 46/186, junto con T-51), incluida la
prueba exacta del criterio de cierre: la misma respuesta contada vs. descartada deja θ idéntico y
sube el SE al valor de no haberla respondido. `release app` 0 warnings, `clj-kondo` limpio.

**✅ Cerrada del todo el 2026-08-10.** `028` y `032` aplicadas (piso bajado de 3 s a 2 s con datos,
ver T-59 hallazgo 4), rama mergeada a `main` vía **PR #34** y bundle publicado. **Verificado por
hash** con el patrón de T-19/T-35/T-38: MD5 `ef97d814d66efd61d08d90711431aca9`, idéntico en
`origin/main` y en `https://jacobocordova.com/public/js/app.js` (`age: 0`, CDN ya propagado).
Confirmado además que la frase del FAQ **sigue publicada** — y ahora es cierta.
**[[OPEN_QUESTIONS]] X-01 resuelta**: no se borró la afirmación, se cambió el sistema para que fuera
verdad, que es exactamente lo que ADR-014 prescribía.

### T-59 · Tiempo típico por ítem aprendido de los datos, no fijado por el autor — **P1** · `bloqueado` (datos: hay que acumularlos desde hoy; el cronómetro **sí** registra)

> ## ⭐ Medición ejecutada el 2026-08-10 — cinco hallazgos, dos de ellos corrigen al agente
>
> **1. Los datos existen pero no sirven: solo el 9 % tiene tiempo real.** 255 tests, 209 con
> respuestas, **2178 respuestas**, todas con el campo `time-ms` presente… y solo **195 con valor
> > 0**. El resto son ceros. No es que falte el campo: **el cronómetro no estaba registrando**.
>
> **Corrección al agente:** al abrir este ticket se argumentó que, como `git log -S ":time-ms"` sitúa
> la instrumentación en 2025-09-09 (anterior al piloto UNAP), "los tiempos *deberían* estar ahí". Se
> marcó como pendiente de verificar y **la verificación dice que no**. Que el campo exista en el
> código desde 2025 no significa que estuviera midiendo: `diagnostic_test.cljs` manda `0` cuando el
> cronómetro no arrancó, y el flujo del diagnóstico se reparó recién en `9e622d9` (2026-07-18). Las
> 195 respuestas útiles son casi con seguridad de tests recientes, no de los 252 del piloto.
>
> **La premisa de ADR-014 se cae igual, pero por otra razón**: no es que no haya tests, es que no hay
> tiempos. Y eso es peor, porque no se arregla esperando.
>
> **2. No hay ningún ítem calibrable.** De 387 ítems del banco: **0 con ≥30 respuestas**, 2 con ≥10,
> 13 con ≥5, 84 con alguna. El parámetro por ítem que este ticket quiere aprender **no se puede
> estimar hoy** para prácticamente ningún ítem.
>
> **3. El promedio simple queda empíricamente refutado.** En los pocos ítems con datos, media y
> mediana se separan brutalmente: el ítem 361 tiene **media 78,7 s, mediana 4,8 s, media geométrica
> 10,3 s** (desviación 188 s). El ítem 178: media 14,0 vs mediana 4,8. Es exactamente el problema de
> contaminación por outliers que se anotó como objeción (1) al abrir el ticket, y ahora está medido
> en los datos del propio proyecto. **Cuando T-59 sea viable, tiene que usar mediana o media
> geométrica**; la media simple mentiría por un factor de 16 en el peor caso visto.
>
> **4. El piso autoral de 3 s estaba mal, y los datos dicen cuál es el bueno.** Barriendo el piso y
> mirando la tasa de acierto de las respuestas **descartadas** (con 4 alternativas, adivinar acierta
> 25 %): piso 0 → 18 %, piso 1 → 21 %, piso 2 → 27 %, **piso 3 → 34 %**, piso 4 → 42 %. Mientras las
> descartadas aciertan cerca de 25 % se tira ruido; cuando suben, se tira conocimiento. El 3 ya
> estaba del lado equivocado. **Corregido a 2 s** en `032_min_response_seconds_calibrado.sql` y en
> `universo.irt.effort`. Que la columna fuera configurable es lo que permitió que esto sea un
> `update` de una línea.
>
> **5. Segunda corrección al agente: el campo del panel NO sobra.** Al validar las consultas contra
> un fixture se conjeturó que, con enunciados de 40–200 caracteres, la regla proporcional
> (`largo/20`) dominaría al piso y por lo tanto el campo configurable de T-44 sería inútil. **Los
> enunciados reales son mucho más cortos**: largo mediano **50** caracteres (medio 62, mínimo 16,
> máximo 341), así que el piso manda en **234 de 387 ítems (60 %)**. La conjetura salió de largos
> inventados por el agente. El campo se queda.
>
> **6. La correlación θ↔tiempo no se puede calcular.** `n = 17` (solo los tests con columna `theta`
> poblada, que existe desde `021`, del 2026-08-08), y 12 de esas 17 respuestas caen en una sola
> banda. El ρ = 0,697 que devuelve la consulta **no significa nada** y no debe citarse. La Fase 3 de
> ADR-014 sigue sin poder evaluarse.
>
> **✅ Instrumentación verificada por el owner el 2026-08-10: el cronómetro SÍ registra hoy.** No
> hay bug vivo. Los ceros son históricos: tests anteriores al arreglo del flujo del diagnóstico
> (`9e622d9`, 2026-07-18). *(Cierre por reporte del owner, sin verificación del agente — mismo
> patrón que T-03/T-25/T-50.)*
>
> **Consecuencia buena:** cada diagnóstico que se rinda de ahora en adelante es dato utilizable, sin
> trabajo extra. Difundir el cupo no solo trae estudiantes: **construye el dataset que este ticket
> necesita**.
>
> **Consecuencia mala, irreversible:** las 2178 respuestas históricas no sirven para tiempos y nunca
> van a servir. El contador arranca prácticamente de cero, con las ~195 respuestas útiles como
> semilla.
>
> ### ⚠ Lo que hay que replantear antes de implementar: el objetivo "por ítem" está muy lejos
>
> Las 195 respuestas útiles se reparten en **84 ítems, a 2,3 respuestas por ítem**. Para que los 387
> ítems del banco lleguen a 30 respuestas cada uno harían falta ~11.600 respuestas ≈ **1.200–1.400
> diagnósticos completos**. A escala de este proyecto eso no es "en unos meses", es otro orden de
> magnitud de tráfico. La selección adaptativa concentra en los ítems cercanos a θ, así que unos
> pocos acumularán más rápido — pero el grueso del banco **no va a tener datos propios en mucho
> tiempo**, y encima el banco sigue creciendo bajo ADR-016.
>
> **Reformulación propuesta (a decidir con el owner):** en vez de saltar de "constante autoral" a
> "estimación por ítem", que es el extremo caro, usar la escalera que los datos sí permiten:
>
> | Nivel | Precondición | Estado |
> |---|---|---|
> | Constante autoral (`max(piso, largo/20)`) | ninguna | ✅ en producción (T-44), piso ya calibrado a 2 s con el global |
> | **Umbral desde la distribución global** (percentil bajo de `ln t`) | ~200 respuestas | ✅ **alcanzable ya**: hay 195 |
> | **Umbral por topic** (pooling de los ítems del mismo banco) | ~30 respuestas por topic | 🟡 alcanzable en el mediano plazo |
> | Estimación por ítem (β_i) | ~30 respuestas por ítem | 🔴 lejos, y solo para los ítems más servidos |
>
> Esto es exactamente la forma jerárquica que ADR-014 §Fase 2 ya insinúa: el ítem hereda del topic
> cuando no tiene datos propios, y el topic hereda del global. **La capa de caso frío de T-44 deja de
> ser un parche transitorio y pasa a ser el piso permanente de esa jerarquía.**
>
> Consulta de seguimiento (para repetir cuando haya más tráfico): bloque 6 de
> `supabase/queries/T-59_calibracion_tiempos.sql`.

Abierta el 2026-08-10 a partir de una crítica del owner a T-44, que **es correcta**: el umbral de
esfuerzo de T-44 depende de dos constantes elegidas a mano (piso de 3 s, 20 caracteres/segundo de
lectura), y sostener números inventados es trabajo de mantenimiento permanente. Su propuesta: que
cada ítem **aprenda cuánto tarda** a partir de los tests que se van rindiendo, y que el umbral se
derive de ahí.

**La premisa que se cayó, y que es lo que hace viable esta tarea hoy.**
[[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] (2026-08-08) difirió el modelo empírico con
la frase *"el proyecto tiene **cero estudiantes reales**"*, y puso como precondición ≥ 30 tests. Al
día siguiente, T-01 midió **80 usuarios y 252 diagnósticos ya rendidos** (piloto UNAP). Y
`git log -S ":time-ms"` muestra que la instrumentación del cronómetro existe desde **2025-09-09**,
o sea **anterior** al piloto. Es decir: **la precondición probablemente ya estaba cumplida desde
hace casi un año** y el ADR se escribió sobre una foto vieja del proyecto. Falta confirmarlo con
datos → [[OPEN_QUESTIONS]] Q-26.

- **Primer paso, sin escribir código:** correr `supabase/queries/T-59_calibracion_tiempos.sql`
  (solo lectura, ya validado contra un Postgres real). Responde cobertura de `time-ms`, forma de la
  distribución (¿existe la moda de clickeo rápido que ADR-014 predice?), tiempo típico por ítem con
  tres estimadores, cuántos ítems tienen ya datos suficientes, **qué fracción del histórico habría
  descartado el umbral autoral de T-44**, y la correlación θ↔tiempo.
- **Trabajo, si los datos acompañan:**
  - Columnas `response_count` y `mean_log_time` en `questions`, en escala **logarítmica** (el tiempo
    es multiplicativo, y es exactamente el `β_i` que ADR-014 Fase 2 ya define).
  - Actualización incremental. **Quién escribe:** no el cliente — ADR-015 le revocó hasta la lectura
    de `questions`. La costura ya existe: `score_answer` es `security definer` y corre en cada
    respuesta.
  - El umbral pasa a derivarse del dato para ítems con `response_count ≥ N`, y **cae al piso autoral
    de T-44 para los que no lo tienen**. El caso frío no es transitorio: el banco sigue creciendo
    bajo ADR-016, siempre habrá ítems nuevos sin datos.
  - Recalibrar retroactivamente con los tests que ya existen, no esperar a acumular nuevos.
- **Tres cosas que hay que resolver y no son obvias** (salieron al discutir la propuesta):
  1. **El promedio se contamina con lo que el filtro debe eliminar.** Los clicks al azar bajan la
     media, que baja el umbral, que admite más clicks al azar. Es realimentación positiva. El owner
     ya intuyó la salida ("el más rápido no debería afectar tan pronunciadamente al promedio"):
     estimador robusto (mediana o media recortada), no media simple. Se arranca con media simple
     igual, como él propuso, pero sabiendo que este defecto está ahí.
  2. **La constante no desaparece, se muda.** "Descartar si tarda menos que *X* respecto del típico
     del ítem" sigue teniendo un *X* autoral. La ganancia real es pasar de dos constantes en
     unidades arbitrarias a **una sola interpretable** ("menos del 15 % de lo típico de este ítem").
  3. **Ponderar por θ tiene una circularidad**: θ se estima *a partir de* las respuestas que el
     filtro debe validar. Se resuelve separando **calibración** (offline, por lotes, ahí sí se puede
     usar el θ final del test cerrado) de **filtrado** (en vivo, solo con lo ya calibrado). Y la
     variable natural a descontar no es la habilidad θ sino la **velocidad τ**
     (`ln T = β_ítem − τ_persona + ε`): que θ y τ correlacionen es empírico, es el ρ de la Fase 3.
- **Terminado cuando:** el umbral de un ítem con datos suficientes sale de `questions`, no de una
  constante; el piso autoral queda solo como caso frío; hay test en el namespace puro que verifique
  ambas ramas; y el resultado de la calibración sobre el histórico está registrado (incluido el
  resultado negativo, si la moda de clickeo rápido no aparece).
- **Ojo:** `time-ms` es el **delta** por pregunta, no un par de timestamps. No se puede reconstruir
  hacia atrás si el estudiante se levantó a la mitad. Si esa distinción importa para el modelo, hay
  que instrumentarla **ahora**, porque no es recuperable.
- **Relacionado:** T-44 (la capa de caso frío que esta tarea presupone), T-45 (es su Fase 2: si
  T-59 aterriza, T-45 deja de estar bloqueada), T-29 (calibrar `difficulty` tiene la misma forma y
  los mismos datos), [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]],
  [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] (define quién puede escribir),
  [[OPEN_QUESTIONS]] Q-26, [[RISKS]] R-17.

### T-45 · Velocidad (τ) como segundo eje del perfil (Fase 2 de ADR-014) — **P2** · `bloqueado` (datos: ≥ 30 tests — ⚠ la precondición puede estar cumplida hace un año, ver T-59)

Materializa el eje de **frecuencia (λ)** que [[VISION_LIBRO_PROYECTO]] §3.3 propone, en su forma
rigurosa (parámetro de velocidad τ del marco de van der Linden). **No se implementa antes de la
precondición de datos** — con menos tests, los parámetros por ítem serían inventados y se le
mostrarían a un estudiante como su nivel.

- **Trabajo:** estimar la intensidad temporal `β_i` por ítem (promedio de `ln(tiempo)`), derivar
  `τ_j` por estudiante desde el residuo `τ_j = −promedio_i(ln T_ij − β_i)`, y reportar τ **junto a**
  θ (nunca fundido) con la prescripción pedagógica por cuadrante de la tabla del ADR.
- **Terminado cuando:** el perfil del estudiante muestra su cuadrante (θ alto/bajo × velocidad
  alta/baja) con una recomendación distinta en cada uno, y la lógica vive en un namespace puro con
  tests.
- **Precondición:** ≥ 30 tests completados con `time-ms` poblado. Depende del go-live (T-01/T-04).
- **Relacionado:** [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] §Fase 2,
  [[VISION_LIBRO_PROYECTO]] §3.3, [[OPEN_QUESTIONS]] Q-22 (la taxonomía de bandas del libro sigue
  sin reconciliarse y toca este trabajo).

### T-46 · Prior de θ condicional a la velocidad (Fase 3 de ADR-014) — **P3** · `bloqueado` (datos: ≥ 200 tests + ADR propio)

Único punto donde el tiempo entra **formalmente** en la estimación de θ, vía la correlación
poblacional ρ entre θ y τ: el prior deja de ser marginal N(0,1) y pasa a ser condicional,
`prior-mean → ρ·τ̂`, `prior-precision → 1/(1−ρ²)`.

- **Bloqueo de gobernanza, no solo de datos:** esto **modifica la cláusula «MAP con prior N(0,1)»
  de [[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]]**, así que por [[AGENT_INSTRUCTIONS]] §8.7
  requiere un **ADR nuevo que reemplace esa parte de ADR-004**. No se implementa bajo ADR-014.
- **Resultado negativo aceptable:** si al estimar ρ resulta cercana a cero, **esta tarea se cierra
  sin implementar** y se documenta. Significaría que en esta población velocidad y habilidad son
  independientes; forzar el modelo igual sería falsear.
- **Terminado cuando:** o existe el ADR de reemplazo y el prior condicional está implementado y
  testeado, o está documentado con datos por qué no corresponde hacerlo.
- **Relacionado:** [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]] §Fase 3, T-29
  (calibración de `difficulty`, misma dependencia de volumen).

### T-50 · `difficulty` en escalas incompatibles rompe topics enteros — **P0** · `hecho` (2026-08-09)

Medido el 2026-08-09 sobre las 387 preguntas reales (consulta directa con cuenta de estudiante,
ver `sessions/SESSION-010.md`). El modelo 1PL asume `difficulty` en **logits, rango [-3, 3]**
(`tetha/clamp-theta`), pero el banco tiene al menos tres escalas conviviendo:

| Topic | Ítems | Rango de `difficulty` | Consecuencia |
|-------|-------|----------------------|--------------|
| `enteros` | 10 | **10 .. 90** | **Ningún ítem es alcanzable**: la selección busca en ±1 (y ±2) alrededor de θ ∈ [-3,3] |
| `Ecuaciones cuadráticas` | 1 | 50 | inalcanzable |
| `Polinomios` | 1 | 4 | inalcanzable |
| `Ecuaciones lineales` | 3 | 2 .. 5 | parcialmente alcanzable |
| `numbers_V1` | 178 | -3 .. 2.9 | ✅ correcto |

**Efecto real:** un estudiante que elija `enteros` recibe "no hay más preguntas" y el test termina
al instante (`:test/bank-exhausted`). No es un sesgo de estimación: es un topic muerto.

- **Terminado cuando:** todo `questions.difficulty` está dentro de `[-3, 3]`, con una migración que
  reescale o marque los ítems fuera de rango, y ningún topic activo queda sin ítems alcanzables.
- **Ojo:** reescalar cambia θ de tests ya rendidos. Decidir si se recalculan o se marcan como
  históricos → puede requerir ADR.
- **Relacionado:** [[RISKS]] R-17, [[OPEN_QUESTIONS]] Q-05 (respondida en parte por esta medición),
  T-29 (calibración empírica, que presupone una escala única).

**2026-08-09 (herramienta):** el editor completo de preguntas exigía abrir cada pregunta una por
una para tocar `difficulty`, lo que hacía la recalibración de un topic entero impracticable en la
práctica. Se agregó edición rápida en línea en Admin → Preguntas: la columna `b` de la tabla es un
input editable, y una barra "Guardar cambios / Descartar" aparece cuando hay ediciones pendientes
(se pueden editar varias filas y guardarlas juntas). Nuevo `crud/patch-admin-question!` actualiza
solo `difficulty` (no reemplaza la fila completa, a diferencia de `update-admin-question!`). Ver
`sessions/SESSION-012.md`.

**2026-08-09 (cierre, el owner):** con esa herramienta, el owner recalibró **todos** los topics
fuera de rango (no solo `enteros`), reorganizando los ítems por dificultad relativa y editando
directo en el panel admin. Probó el diagnóstico después del cambio: entrega preguntas
correctamente. **Terminado según el criterio de la tarea** (ningún topic activo queda sin ítems
alcanzables). **No verificado por el agente** (sin credenciales de admin ni acceso al proyecto
Supabase real; el cierre se da por el reporte del owner, mismo patrón que T-03/T-25/T-36).

**Ojo — esto no es T-29:** el owner reordenó/reescaló los valores para que sean alcanzables y
consistentes entre sí, no una calibración estadística a partir de respuestas reales. R-17
(`difficulty` no calibrada empíricamente) sigue activo; T-29 sigue abierta.

### T-51 · Higiene de `topic` y `module_id` en el banco — **P1** · `hecho` (2026-08-10, aplicado y verificado; la clasificación de los bancos mezclados se traslada a T-60)

Misma medición del 2026-08-09:

- **199 de 387 preguntas (51%) tienen `module_id = null`** → sin módulo no hay déficit accionable
  ni recursos asociados: la mitad del banco no puede alimentar "Mi plan". Los bloques grandes sin
  módulo son `diagnostico` (84) y `PAES_M1` (44).
- **26 topics distintos, con duplicados por acento/ortografía** que el sistema trata como bancos
  separados: `factorización`(6)/`factorizacion`(2), `términos_semejantes`(5)/`terminos_semejantes`(5),
  `división_algebraica`(3)/`division_algebraica`(2), `Polinomios`(1)/`polinomios`(19).
- Solo `numbers_V1` y `enteros` existen en `universo.profile/topic->module-slug`; el resto cae en
  `unknown/*`.

- **Terminado cuando:** los topics duplicados están unificados, todo ítem tiene `module_id`, y todo
  topic presente en `questions` tiene mapeo en `topic->module-slug` con test que lo verifique.
- **Ojo:** unificar topics toca `test_configs` (keyed por `topic`, con self-FK de prerequisitos) y
  la columna `tests.topic` del historial que alimenta `universo.access`. No es un simple UPDATE.
- **Relacionado:** T-28 (es la misma brecha, ahora con datos), [[OPEN_QUESTIONS]] Q-06,
  [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]],
  [[../adr/ADR-017-topic-canonico-por-trigger]].

**2026-08-10 — hecho lo que se puede hacer sin decidir contenido.**

`029_topic_normalization.sql` + `universo.topics` (namespace puro nuevo, espejo de la función SQL) +
[[../adr/ADR-017-topic-canonico-por-trigger]]. La normalización deja de ser una tabla de variantes
que crece con cada acento: `universo.topics/normalize` canoniza el topic antes de buscarlo, y
`profile.cljs` ya no lleva los dos diccionarios literales que tenía.

Lo que la migración hace, en orden obligado por la auto-FK de `test_configs`: crea la fila canónica
con la config de la variante **con más preguntas** (incluido su prerequisito), repunta los
prerequisitos, normaliza `questions.topic` y `tests.topic` —los dos juntos, o `universo.access`
perdería avances ya conseguidos— y borra las variantes. Después rellena `module_id` por
equivalencia explícita y por coincidencia única de sufijo (`triangulos` → `geometria/triangulos`).
Y deja triggers en las tres tablas para que el defecto no se reconstruya con el próximo ítem
cargado a mano.

**Verificada de verdad, no solo revisada:** se montó un PostgreSQL 14 desechable con un fixture que
reproduce el desorden medido (los cuatro pares duplicados, bancos mezclados, prerequisitos entre
variantes, un topic prerequisito de sí mismo tras normalizar). Resultado: 0 topics fuera de forma
canónica en las tres tablas, FK íntegra, **idempotente** (segunda corrida sin diferencias), triggers
normalizando altas nuevas. En el fixture, 38 de 44 preguntas quedaron con módulo.

**Encontrado y corregido durante esa prueba:** la primera versión hacía ganar a la fila que ya
estaba escrita en forma canónica, y eso **borraba un prerequisito configurado** (una variante exigía
otro topic con θ mínimo y se perdía al fusionar). No es cosmética: define quién puede rendir el
test. Sin la prueba contra un Postgres real no se habría visto.

**Lo que sigue abierto y por qué no lo cierra un agente:** los **128 ítems de `diagnostico` (84) y
`PAES_M1` (44)** son bancos **mezclados**, con preguntas de varios módulos. Asignarles un módulo por
su topic sería un dato falso con apariencia de dato bueno. Necesitan clasificación **por ítem**, que
es contenido (ADR-016), no SQL. La consulta (ii) del final de `029` los deja listados.

**2026-08-10, medición real tras aplicar `029`.** El owner aplicó `028` y `029` y corrió las tres
consultas: **0 topics fuera de forma canónica** en las tres tablas (la normalización funcionó), e
ítems sin `module_id` de 199 → **156**.

Pero la consulta (ii) mostró que **28 de los 156 sí eran mapeables** y habían fallado por dos
motivos, uno de ellos un error de criterio:

1. **El topic no se llama igual que el sufijo de su módulo** (`sistemas_ecuaciones` →
   `algebra/sistemas`, `potenciacion` → `aritmetica/potencias`, `numeros_relativos` →
   `aritmetica/enteros`). Faltaba la equivalencia explícita, nada más.
2. **Topics con espacios** (`ecuaciones lineales`, `expresiones algebraicas`,
   `suma de numeros enteros`), que no tenían equivalencia porque el mapeo solo contemplaba la
   variante con guion bajo.

> **Corrección (mismo día, tras medirlo).** Al ver los espacios se escribió acá que el argumento de
> ADR-017 para no unificar espacios con guiones bajos "se había caído" y que había sido
> "conservadurismo sin datos". **Eso era falso y se midió:** la consulta que agrupa por
> `normalize_topic(replace(topic,' ','_'))` buscando grupos con más de una escritura **devolvió cero
> filas**. No hay ningún banco partido en dos por espacio vs. guion bajo — `ecuaciones lineales` es
> la única escritura de ese banco y la entrada `ecuaciones_lineales` del mapeo era, como estaba
> documentado, un no-op. **La decisión de ADR-017 se sostiene**: el problema era de *mapeo*, no de
> *normalización*, y `030` lo resuelve listando las variantes una por una sin tocar la regla. Se
> deja constancia en vez de borrar, por la regla de gobernanza.

**`030_backfill_module_id_restante.sql`** agrega las 11 equivalencias que faltaban (incluidas las
variantes con espacio, **listadas una por una**, sin cambiar la regla de normalización) y su espejo
en `universo.topics`. Verificada contra un Postgres desechable con la distribución real medida:
156 → **132**, idempotente, y quedan exactamente los esperados.

**Las 4 ambigüedades restantes las resolvió el profesor el mismo día**, y dos de ellas **creando
módulo** en vez de forzar el ítem dentro de uno que no le corresponde (`031`):

| Topic | Decisión | Cómo se resuelve |
|---|---|---|
| `inecuaciones` (2) | **módulo nuevo** `algebra/inecuaciones` (`order_index` 125) | Por regla de sufijo, sin entrada explícita |
| `operaciones_fundamentales` (1) | **módulo nuevo** `aritmetica/operaciones_fundamentales` (15) | Ídem |
| `ecuaciones cuadraticas` (1) | `algebra/ecuaciones` | Equivalencia explícita: una *ecuación* cuadrática no es una *función* cuadrática |

Los módulos pasan de **18 a 20**. Verificado con `030` + `031` sobre la distribución real:
156 → **128**, idempotente, y lo único que queda son los dos bancos mezclados.

**⚠ Consecuencia:** los dos módulos nuevos nacen **sin ningún recurso publicado**. Un estudiante
cuyo déficit principal caiga ahí verá el estado vacío de T-24 en "Mi plan" — preferible a mostrarle
material de otro tema rotulado como suyo (criterio de T-53), pero es contenido pendiente que se suma
a T-27/T-56 bajo ADR-016.

**Los 128 que quedan** son `diagnostico` (84) y `paes_m1` (44): bancos mezclados que necesitan
clasificación **por ítem**, contenido y no SQL. Ninguna migración los cierra.

**✅ Cerrada 2026-08-10.** El owner aplicó `029`, `030`, `031` y `032`. Estado final medido:
**0 topics fuera de forma canónica** en las tres tablas, e ítems sin `module_id` **199 → 128**.

**Nota sobre el criterio de cierre, para no dar por hecho lo que no lo está.** El criterio original
decía "todo ítem tiene `module_id`", y **128 no lo tienen**. Se cierra igual porque esos 128 son
`diagnostico` (84) y `paes_m1` (44), bancos **mezclados** cuya clasificación es trabajo de contenido
por ítem, de naturaleza distinta a la higiene de datos que este ticket cubría, y que ninguna
migración puede hacer. Esa mitad del criterio **se traslada explícitamente a T-60**, no se descarta.
Lo técnico —normalización, triggers, fusión de configuraciones, mapeo completo y su espejo puro con
tests— está hecho, aplicado y verificado.

### T-60 · Clasificar por ítem los dos bancos mezclados (`diagnostico`, `paes_m1`) — **P1** · `abierto`

> **Pista nueva 2026-08-18, sin medir.** `question-payload` le hacía `js/parseInt` a `:module_id`,
> que es **uuid** desde `001`: guardar cualquier ítem desde el editor del panel o abortaba contra la
> columna uuid o le dejaba el módulo en `null` sin aviso. Arreglado en `3e0ef20`. Es **candidato** a
> explicar parte de los 128 ítems sin `module_id`, pero **no está medido** y no se puede saber
> cuántos vinieron por acá y cuántos nunca lo tuvieron — el estado final es idéntico. Ver
> [[LESSONS_LEARNED]] L-44.

Hereda la mitad del criterio de cierre de T-51 que ninguna migración puede cumplir: **128 preguntas
sin `module_id`** repartidas en dos topics que no son temas sino contenedores —`diagnostico` (84) y
`paes_m1` (44)—, con ítems de varios módulos adentro.

- **Por qué importa:** sin `module_id` no hay déficit accionable ni recursos que ofrecer. Son el
  **33 % del banco** (128 de 387), y `diagnostico` es además el topic por el que probablemente entra
  la mayoría de los estudiantes nuevos. Mientras sigan sin módulo, esos estudiantes caen en la rama
  `:general` de "Mi plan" (T-53) por más contenido que se publique.
- **Por qué no lo cierra una migración:** asignar módulo por el topic sería un dato falso con
  apariencia de dato bueno. Hay que mirar cada pregunta.
- **Trabajo:** clasificar los 128 ítems contra los 20 módulos. Cae bajo
  [[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]]: la IA puede **proponer** la
  clasificación en una migración con la asignación explícita ítem por ítem, y el profesor la audita
  antes de aplicarla — igual que se hizo con los 39 recursos de `018`/`019` en T-01. La edición en
  línea del panel (Admin → Preguntas, hecha para T-50) sirve para correcciones puntuales, pero 128
  ítems uno por uno desde la UI es demasiado.
- **Decisión previa a tomar:** si además conviene **renombrar el topic** de esos ítems al del módulo
  que les corresponda, o dejar `topic = diagnostico` y usar solo `module_id`. No es cosmético:
  `topic` es la clave de `test_configs` y de la progresión por prerequisitos (ADR-013), así que
  moverlos cambia qué evaluaciones existen y qué ve el estudiante en el selector. **Requiere
  decisión del owner antes de escribir nada.**
- **Terminado cuando:** ningún ítem de `questions` tiene `module_id` nulo, o los que queden están
  documentados con su razón; y la consulta (ii) de `029` devuelve vacío o solo excepciones
  justificadas.
- **Relacionado:** T-51 (de donde viene), T-53 (el que dejó a la vista la consecuencia), T-27, T-56,
  [[OPEN_QUESTIONS]] Q-06, [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]].

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

### T-54 · Atar `resources` a misconceptions, no solo a módulos — **P1** · `abierto` (requiere **ADR**)

Brecha estructural detectada al auditar la capa 1 (2026-08-09, ver `sessions/SESSION-015.md`). Un
recurso cuelga de un `module_id` y nada más. Pero el diferencial declarado del producto
([[../adr/ADR-005-banco-de-items-en-vez-de-cms]]) es **nombrar el error concreto**, y hoy el plan
dice "te equivocaste en *esto*" y a continuación ofrece material de un módulo entero. **El eslabón
que convierte el diagnóstico en remedio no existe en el modelo de datos.**

- **Por qué ahora:** con 58 recursos, cambiar el modelo es barato; con 500, es una migración
  dolorosa. Es una decisión que conviene tomar **antes** de escalar el contenido con ADR-016.
- **Sin diseño todavía** — hay al menos tres formas y no se elige una sin ADR: (a) columna/tabla que
  relacione `resources` con la misconception (hoy las `error_*` son texto libre en `questions`, no
  entidades con identidad propia); (b) catalogar primero las misconceptions como tabla y que tanto
  `questions.error_*` como `resources` la referencien; (c) etiquetado libre por tags.
- **Ojo, precondición real:** hoy una misconception **no tiene identificador** — es una cadena
  dentro de `questions.error_a..d`. Cualquier opción exige decidir antes si se convierten en
  entidad, lo que toca contenido ya escrito. **Esa precondición es ahora T-57**, con modelo
  propuesto y camino de migración: esta tarea depende de aquella y no debería tomarse antes.
- **Terminado cuando:** existe un ADR que fija el modelo, y "Mi plan" puede mostrar material
  asociado al error específico que el estudiante cometió, no solo a su módulo.
- **Relacionado:** T-53 (el arreglo que dejó esta brecha a la vista), T-51 (bloqueo previo: sin
  `module_id` no hay ni siquiera el cruce por módulo), [[../adr/ADR-005-banco-de-items-en-vez-de-cms]].

### T-55 · Capa de práctica reutilizando el banco de ítems — **P2** · `abierto` (requiere **ADR**)

Detectado en la misma auditoría: de 61 recursos, **hay exactamente 1 de tipo `exercise`**. El plan
explica el error y ofrece prosa para leer, pero casi nada para *practicar* — y la práctica es donde
se aprende matemática. [[VISION_LIBRO_PROYECTO]] §3.1 pone la "práctica graduada" como paso 4 de
cada unidad.

**La observación que hace esta tarea barata:** el material de práctica **ya existe**. Son las 387
preguntas del banco. No hay que fabricarlo, hay que conectarlo.

- **Restricción dura, no negociable:** [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] cerró
  deliberadamente la lectura directa de `questions` para impedir la exfiltración del banco y que el
  diagnóstico sea falseable. Una práctica que devuelva respuestas **no puede** filtrar ítems que
  después aparezcan en un diagnóstico real, ni volver a abrir `questions` al cliente. Esto es
  justamente lo que exige un ADR y no una implementación directa.
- **Preguntas a resolver en ese ADR:** ¿se reservan ítems solo para práctica (partiendo el banco) o
  se acepta que un ítem practicado no vuelva a servir para diagnosticar? ¿la práctica pasa por RPC
  como `next_question`/`score_answer`? ¿las respuestas de práctica entran a `tests` y contaminan
  θ, o se guardan aparte?
- **Terminado cuando:** existe el ADR con esas respuestas y, si se aprueba, el estudiante puede
  practicar ítems de sus módulos deficitarios sin que el banco quede expuesto ni θ contaminada.
- **Relacionado:** [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]], T-54, T-29/T-45
  (contaminación de datos de calibración), [[RISKS]] R-16.

### T-56 · Contenido de geometría: 7 módulos sin ninguna fuente — **P0** · `en curso` (2026-08-17: migración escrita, auditada y **aplicada**; ⏳ falta publicar)

Los 39 recursos de `018`/`019` cubren `aritmetica` y `algebra` (11 de 18 módulos). Los **7 módulos
del track `geometria` no tienen ninguna fuente**: el owner subió los volúmenes de Aritmética y
Álgebra de Baldor, no el de Geometría. Dos de esos módulos (`geometria/basica`,
`geometria/pitagoras`) sí tienen recursos previos de `002`/`004`, pero el resto está vacío.

- **Trabajo:** conseguir o redactar fuente para los módulos de `geometria` y generar el lote bajo
  el pipeline de [[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] (migración con
  `published = false` → auditoría rehaciendo cada cuenta → publicación).
- ~~**Prioridad real:** subordinada a T-51 y T-54~~ — **revisado 2026-08-17:** esa nota se escribió
  cuando T-51 y T-53 estaban abiertas. **Las dos ya están hechas**, así que el plan sí sabe entregar
  recursos por módulo. T-54 (atar recursos a *misconceptions*) sigue abierta, pero es una mejora
  para los **18** módulos, no un impedimento para geometría: hoy un estudiante con déficit en
  geometría no recibe **nada**, y con esto recibe lo mismo que ya reciben los de aritmética y
  álgebra. El balde ya no está perforado.
- **Sube a P0:** es el criterio **L-2** de "listo para promocionar" ([[PROJECT_BRIEF]] §6).
- **Terminado cuando:** cada módulo de `geometria` tiene ≥1 recurso publicado y auditado.
- **Relacionado:** T-01, ADR-016, `supabase/CONTENT.md`, L-2.

> ⚠️ **2026-08-28 — el criterio L-2 ya no es 18/18: `055` está aplicada.** Esa migración creó los
> **seis módulos del eje de probabilidad y estadística**, así que el producto tiene hoy
> **26 módulos** (con los dos de `031`) y los seis nuevos **no tienen ningún recurso**. El diagnóstico de ese eje puede
> entregar un déficit para el que no hay nada que estudiar, que es exactamente el agujero que L-2
> describe. Es trabajo nuevo, no un olvido de esta tarea: se anota acá para que el conteo de
> [[PROJECT_BRIEF]] §6 se corrija, y para que nadie lea el eje nuevo como «completo»: tiene banco,
> no tiene recursos.

**2026-08-17 — migración escrita y auditada, pendiente de aplicar.**
`supabase/migrations/044_geometria_resources.sql`: **18 recursos** para los 5 módulos realmente
vacíos (`angulos` 3, `triangulos` 4, `circulo` 3, `areas` 4, `volumenes` 4). `basica` y `pitagoras`
ya tenían recursos de `002`/`004` y no se tocaron.

- **Sin fuente bibliográfica, a diferencia de `018`/`019`:** no hay volumen de Baldor de geometría,
  así que el contenido está redactado desde cero contra el temario de PAES M1. Los títulos no citan
  libro.
- **Fuera de alcance a propósito:** trigonometría, geometría analítica y transformaciones
  isométricas — o no son de M1, o exigirían crear módulos nuevos, y esta migración no crea módulos.
- **Auditoría numérica (ADR-016): 72 comprobaciones, 0 fallas.** Se recalculó cada ejemplo de los 18
  recursos, más las cotas de π de Arquímedes que aparecen en un contexto histórico. **Eso dice que
  las cuentas están bien, no que el texto enseñe bien:** la revisión pedagógica sigue siendo del
  profesor.
- **Verificado también que el formato renderiza:** `math_render` soporta `$…$`, `$$…$$` y
  `**negrita**`. Las listas con `-` **no** se convierten en `<ul>` (limitación conocida, D-40), pero
  se leen igual y es el mismo estilo del contenido ya publicado en `018`/`019`.

✅ **`044` aplicada por el owner el 2026-08-17.**

⏳ **Falta lo que cierra L-2, y no es un trámite:** los 18 recursos entraron con
`published = false`, y **un recurso sin publicar es invisible para el estudiante** — la policy
`resources_select_published` filtra por `published = true`. O sea que **aplicar la migración no
mueve L-2 ni un punto** hasta que se publiquen desde Admin → Recursos, que es una decisión
pedagógica y humana (ADR-016).

**Verificación versionada:** `supabase/queries/L-2_cobertura_de_recursos.sql` — cinco bloques de
solo lectura que responden, en orden: si `044` llegó completa (su modo de fallo es **silencioso**:
si un slug no coincide, el `insert … select` no inserta nada y **no da error**), el estado de L-2
módulo por módulo, el veredicto en una sola fila, la cola de revisión ordenada y un control de
duplicados. Los 18 títulos del bloque A se verificaron carácter a carácter contra la migración.

**Y comprobar que `geometria/basica` y `geometria/pitagoras` tengan ≥1 recurso publicado** — el
criterio L-2 es 18 módulos de 18, no 16. El bloque C lo responde solo.

### T-57 · Modelar la misconception como entidad, no como texto libre — **P2** · `en curso` (paso 1 hecho y aplicado; capa de datos del cliente hecha 2026-08-18; ⏳ falta catalogar)

> **Estado al 2026-08-18.** `027` está **aplicada** (confirmado el 2026-08-11, ver la nota de abajo)
> y desde hoy tiene **capa de datos en el cliente**: `universo.misconceptions` (puro, con test) y
> `fetch-misconceptions` / `upsert-misconception!` / `delete-misconception!` en `db.crud`. Con
> **D-59**, el paso 3 deja de ser obligatoriamente una migración de backfill: se cataloga desde el
> panel. Lo que falta ahora es, en orden: **T-103** (la pestaña que consuma esto) y el **paso 2**
> (elegir y catalogar un módulo), que sigue bloqueado por una consulta del owner al proyecto real.

> **Contradicción RESUELTA 2026-08-11:** el encabezado decía que faltaba aplicar `027` y
> [[../supabase/SCHEMA]] la daba por aplicada. Gana SCHEMA: el 2026-08-11 se aplicó `034`, que
> inserta en `public.misconceptions` y en las cuatro columnas `misconception_*_id`, y corrió sin
> error — cosa imposible si `027` no estuviera aplicada. **El paso 1 de T-57 está hecho y aplicado.**
> Lo que sigue abierto son los pasos 2-5 (catalogar módulos PAES, extender `score_answer`, agrupar
> en `universo.profile/build`, enlazar recursos), no la migración.
>
> Nota: el catálogo ya **no** está vacío, pero lo que tiene son las 77 entradas del experimento de
> cuántica (T-61), todas con prefijo `mq/`. Para el producto sigue vacío:
> `select count(*) from public.misconceptions where slug not like 'mq/%';` → 0.

Diseño conversado con el owner el 2026-08-09, a partir del análisis de arquitectura de la
retroalimentación. **Es prerequisito de T-54**: no se pueden enlazar recursos a misconceptions
mientras las misconceptions no existan como entidad.

**El diagnóstico del modelo actual:** `questions.error_a..d` hace **dos trabajos a la vez** y por eso
no sirve para ninguno del todo:

1. **La identidad del error** — *"invierte el divisor al dividir fracciones"*. Reusable entre ítems,
   contable, agregable.
2. **La explicación para ese ítem** — necesariamente específica, porque menciona los números
   concretos de esa pregunta.

Como está fusionado en un `text`, la misconception **no tiene identificador**: dos ítems que evalúan
el mismo error conceptual tienen dos strings independientes y sin relación. No se puede contar
cuántos estudiantes tienen un error dado, ni enlazarle un recurso, ni comparar entre diagnósticos.
Hoy la misconception es un **artefacto de presentación, no una entidad del dominio**.

**Consecuencia de diseño que ordena todo lo demás:** el texto **no se reemplaza** por un ID. Se
conserva la explicación contextual (que es la fortaleza actual: habla de los números del ejercicio)
y **además** el distractor apunta a una misconception. Las dos cosas.

**Forma propuesta (relacional, no JSONB):**

```sql
create table public.misconceptions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,          -- para el profesor y para agregar
  description text,            -- criterio editorial, no se le muestra al alumno
  module_id uuid references public.modules (id),
  created_at timestamptz not null default now(),
  -- La lección de T-51 hecha restricción: sin acentos ni mayúsculas, para que
  -- 'divisor-invertido' no conviva con 'Divisor_Invertido'
  constraint misconceptions_slug_normalizado
    check (slug ~ '^[a-z0-9]+(/[a-z0-9]+)*(-[a-z0-9]+)*$')
);

alter table public.questions
  add column if not exists misconception_a_id uuid references public.misconceptions (id),
  add column if not exists misconception_b_id uuid references public.misconceptions (id),
  add column if not exists misconception_c_id uuid references public.misconceptions (id),
  add column if not exists misconception_d_id uuid references public.misconceptions (id);
```

**Por qué relacional y no JSONB** (el owner propuso JSONB como alternativa): lo único que se busca
con este cambio es **identidad**, y JSONB es precisamente lo que no puede garantizarla. La evidencia
está en este mismo repo: **T-51** documenta 26 topics con duplicados por acento y mayúscula
(`factorización`/`factorizacion`, `Polinomios`/`polinomios`) que el sistema trató como bancos
distintos sin avisar, exactamente porque `topic` es texto libre. Un JSONB con slugs reproduce ese
fallo con la misma invisibilidad. Además **R-09** ya registra "contrato JSONB sin esquema" como
riesgo activo, y todo lo que se quiere hacer acá (contar, enlazar, comparar) son joins y
agregaciones.

**Por qué 4 columnas y no una tabla `question_distractors` normalizada:** (a) el supuesto de
exactamente 4 alternativas ya está grabado en el `check` de `correct_option`, en la validación
`A..D` de `score_answer` y en el editor del panel — no se agrega una restricción nueva; (b) la
versión normalizada obliga a mover los 387×4 textos en una sola migración contra producción sin
staging (R-02), mientras que la aditiva no mueve ningún dato y `null` significa "sin catalogar",
lo que además da una métrica de avance gratis. Normalizar después sigue siendo barato (ver abajo).

**Ventaja heredada de ADR-015:** tras esa decisión los **únicos** lectores de `error_*` son
`next_question` y `score_answer`. El cliente ya no lee `questions`. El radio de impacto de cambiar
este modelo son **dos funciones SQL** — la costura la creó, sin buscarlo, el arreglo de seguridad
de T-47.

**Disciplina editorial (el riesgo real no es técnico):** el catálogo debe crecer **mucho más lento**
que el banco. Con 387 ítems y ~300 misconceptions no se modeló nada, solo se renombraron strings;
con 387 ítems y ~40 hay taxonomía. Corolario operativo: **una misconception que aparece en un solo
ítem es sospechosa**.

**Qué desbloquea, más allá de poder contar:**
- **El nivel de granularidad intermedio se vuelve computable.** Hoy el sistema sabe "eres débil en
  fracciones" (módulo) y "en la pregunta 7 elegiste C" (ítem), pero no el escalón del medio, que es
  justo lo que promete la landing. Con identidad: *misma `misconception_id` fallada en ≥2 ítems del
  mismo test* → "inviertes sistemáticamente el divisor". Hoy es imposible de escribir.
- **Permite cerrar el lazo externo.** Para medir si el estudiante superó un error hace falta algo
  identificable entre un diagnóstico y el siguiente. Da contenido concreto a Q-07/T-26, hoy
  bloqueadas por no saber qué se compara entre intentos.
- **Le quita filo a T-51:** una misconception catalogada con `module_id` da una pista de módulo a
  ítems que no lo tienen.

**Camino de migración (los pasos 1–3 son reversibles y no rompen nada si se abandona a medias):**
1. ✅ **Hecho 2026-08-10 — `supabase/migrations/027_misconceptions.sql`.** Crea el catálogo vacío
   (`slug` único con check de formato, `name`, `description`, `module_id` opcional) + las 4 columnas
   `misconception_a_id`…`_d_id` en `questions`, nullable y con `on delete set null`. RLS habilitado
   con las cuatro policies de admin en la misma migración (regla de [[../CLAUDE]] §7.1). **Sin seed
   a propósito** y sin tocar `error_a..d`. Cero cambio de comportamiento: `null` = "sin catalogar".
   El check del slug (`^[a-z0-9]+([-/][a-z0-9]+)*$`) se validó contra 13 casos, incluidos los dos
   modos de fallo de T-51 (mayúsculas y acentos). Documentada en `supabase/SCHEMA.md`.
   **⏳ Pendiente: que el owner la aplique** en el SQL Editor — el agente no aplica migraciones
   (CLAUDE.md §9). Nada se rompe mientras no se aplique; simplemente no existe la tabla.
2. Catalogar **un solo módulo**, el más fallado — ahora medible con los 252 diagnósticos reales.
   Es trabajo de contenido, o sea cae bajo [[../adr/ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]].
   **Precondición práctica:** medir cuál es ese módulo requiere consultar `tests` en el proyecto
   real; el agente no tiene ese acceso, así que el paso 2 empieza con una consulta del owner.
3. Sembrar esas misconceptions y enlazar las FK **solo de ese módulo**. El resto del banco sigue en
   `null` y funciona idéntico. **Desde D-59 (2026-08-18) la vía normal es el panel**, no una
   migración: catalogar es trabajo editorial iterativo y una migración por corrección es la fricción
   que garantiza que no se haga. La migración queda como opción para un lote grande.
4. Extender `score_answer` para devolver también el slug (precedente: `026` ya lo extendió para
   devolver `correcta`), guardarlo junto a `:selected-error` en la respuesta, y agrupar por él en
   `universo.profile/build`.
5. Recién ahí, si demostró valor: T-54 (enlazar recursos) y evaluar la normalización.

- **Terminado cuando:** existe el ADR que fija el modelo, el catálogo está creado, y al menos un
  módulo tiene sus distractores catalogados con la detección de error sistemático funcionando sobre
  ellos.
- **⚠ Orden respecto al go-live:** este trabajo **no acerca el proyecto a tener estudiantes**. El
  paso 1 son ~20 minutos y puede quedar listo cuando sea; los pasos 2–4 van **después** de T-04.
- **Relacionado:** T-54 (depende de esta), T-51, T-27, Q-07/T-26 (lazo externo),
  [[../adr/ADR-005-banco-de-items-en-vez-de-cms]], [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]],
  [[RISKS]] R-09, `sessions/SESSION-015.md`.

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

### T-32 · Extender la cobertura del grafo a `.cljs` — **P3** · `hecho` (2026-08-08)

Graphify no indexa ClojureScript hoy, por lo que el grafo no ve la lógica principal.

- **Cerrado:** se confirmó que Graphify no puede indexar `.cljs`/`.clj` (ni de base ni por ningún
  extra pip existente — se revisaron todas las gramáticas tree-sitter y extras del paquete
  instalado, ninguno cubre Clojure/Lisp) y se adoptó **`clj-kondo`** como sustituto real para
  namespaces/vars/usos en CLJS (instalado, config compartida en `.clj-kondo/config.edn`, probado
  contra código real del repo). Detalle completo en
  [[GRAPHIFY_INTEGRATION_GUIDE]] §6.1.
- **Terminado cuando:** el grafo incluye nodos de `src/**/*.cljs`, **o** está documentado en
  [[GRAPHIFY_INTEGRATION_GUIDE]] que no es posible y cuál es el sustituto. **Cumplido** (segunda
  opción).

### T-33 · Reconciliar `PROJECT_SUMMARY.md` con `project-memory/` — **P2** · `abierto`

`PROJECT_SUMMARY.md` es la doc histórica; hoy convive con la memoria nueva y contiene datos
desactualizados (lista de módulos previa al MVP).

- **Terminado cuando:** `PROJECT_SUMMARY.md` queda como puntero corto a `project-memory/INDEX.md`
  o se archiva en `docs/`, sin dejar dos versiones contradictorias del mismo hecho.

---

---

### T-61 · Experimento: track de Mecánica Cuántica sobre el motor IRT — **P3** · `aplicado` (2026-08-11)

Contenido completo de un curso universitario de Mecánica Cuántica cargado sobre el mismo motor
IRT del producto, para uso personal del autor de cara a su examen. **No es contenido del producto**
y no compite con ninguna tarea PAES: entra como P3 porque el trabajo ya está hecho y lo único que
queda es aplicarlo y usarlo.

- **Entregado** (rama `experimento-cuantica`, migraciones `033`–`040`): 15 módulos, 77
  misconceptions, **123 ítems** con sus 4 explicaciones cada uno, 32 recursos, 15 configuraciones de
  banco con cadena de prerequisitos.
- **Decisión y alternativas descartadas:** [[../adr/ADR-018-track-experimental-cuantica]] (D-38).
- **Aislamiento:** `test_configs.active = false` en los 15 bancos + `published = false` en los 32
  recursos. Riesgo residual en [[RISKS]] R-23.
- **Verificado antes de entregar** contra un PostgreSQL 14 desechable: aplicación limpia,
  idempotencia (2ª corrida = 0 diferencias), contenido PAES intacto, reversión completa probada.
- ✅ **Aplicado en producción el 2026-08-11.** Que `034` corriera **resuelve la contradicción de
  T-57**: `027` sí estaba aplicada (si no, no existirían `misconceptions` ni las columnas
  `misconception_*_id` y la migración habría fallado).
- **Terminado cuando:** ~~las 8 migraciones estén aplicadas~~ (hecho), la batería de control del
  final de `040` dé los valores esperados (⏳ pendiente), y el autor haya rendido
  `mq_momento_angular` al menos una vez (⏳ pendiente).
- **Después del examen:** decidir si se revierte (procedimiento completo en `040`) o se conserva.
- **Lo que este experimento le devuelve al producto**, aunque se revierta: es la primera evidencia
  de que el motor funciona con un temario ajeno sin tocar una línea de ClojureScript, y deja un
  patrón de carga de contenido en volumen reutilizable para T-27, T-56 y T-60 (ver
  [[../supabase/CONTENT]]).

---

### T-62 · El cuerpo de `resources` no renderiza tablas de Markdown — **P3** · `abierto` (2026-08-11)

Hallazgo de la vista previa lateral (D-40): `plan/resource-card` renderiza `resources.body` con
`math/latex`, **no** con `math/parse-markdown-latex`. `math/latex` entiende `$…$`, `$$…$$`,
`**negrita**` y `*cursiva*`; no entiende encabezados `##`, listas `-` ni tablas.

**Alcance medido, que es menor de lo que suena:**

- Los recursos PAES (`004`, `018`, `019`) **no usan** nada de eso: fueron escritos contra este
  renderizador. **0 recursos afectados.**
- Los 32 recursos del experimento de cuántica (`039`) usan `**Negrita.**` como encabezado de
  sección, que **sí** renderiza. Las 33 líneas de lista `- ` salen como texto pero el
  `whitespace-pre-wrap` del contenedor conserva los saltos, así que se leen como lista igual.
- **El daño real son 2 tablas de Markdown** (10 filas en total), en
  `cuantica/suma_momentos` (bases acoplada/desacoplada) y `cuantica/identicas` (conteo de estados).
  Salen como filas de texto con barras verticales.

**Opciones, en orden de costo:**

1. Reescribir esas 2 tablas como líneas de texto desde Admin → Recursos. 5 minutos, y es
   exactamente el flujo que la vista previa nueva habilita. Los recursos están en `published =
   false`, así que nadie los ve mientras tanto.
2. Migración `041` con `update` sobre esos dos `body`. Deja el cambio versionado, que es lo que
   ADR-016 prefiere para contenido.
3. Cambiar `plan/resource-card` a `math/parse-markdown-latex`. **La más tentadora y la más
   riesgosa:** afectaría a los 58 recursos PAES publicados, que nadie revisó contra ese
   renderizador. Requiere revisar los 58 antes, y por eso no se hace de pasada.

**No se resolvió en esta sesión a propósito:** las migraciones ya están aplicadas, así que tocar
`039` dejaría el archivo diciendo algo distinto de lo que hay en la base — peor que el problema.

---

### T-63 · Eje de fluidez (λ) — **P2** · `hecho` (2026-08-12)

Segundo eje de la huella cognitiva de VISION §3.3, construido como
`universo.irt.fluency`. Distingue «sabe pero le cuesta» de «sabe y automatizó», que
hoy eran el mismo estudiante para el sistema.

- **Decisión completa** en [[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]].
  Incluye por qué **no** se implementa el Eje 3 (estilos de aprendizaje).
- **Entregado:** namespace puro + 14 tests, integración en `universo.profile/build`
  (`:fluency`, `:fluency-profile`), y tarjeta en «Mi plan» con el 2×2 de θ × λ.
- **Cero cambios de esquema**: reusa `time-ms` y `:weight`, que ADR-014 ya guardaba.
- **Deuda conocida:** los umbrales (3 y 6 tiempos de lectura) son autorales. Ver T-59.
- **Terminado cuando:** ~~el eje exista y se vea~~ (hecho). Queda verificarlo con un
  diagnóstico real rendido de punta a punta.

---

### T-65 · Calibrar el umbral de fluidez con ítems conceptuales — **P2** · `parcialmente hecho` (2026-08-12)

**Falsa alarma descartada primero:** apareció una fila de `tests` de `mq_momento_angular`
con 15 respuestas contra `max_items = 12`, y se sospechó un fallo de la regla de
parada. **No lo era:** el owner había subido `max_items` desde Admin → Configuración
de tests. `universo.irt.progress/stop-reason` funciona bien.

**Lo que sí queda,** y es el primer dato real sobre los umbrales de ADR-019: sobre
8 respuestas usables de ese test, la mediana de tiempo relativo fue **2,19** — el
owner respondió en ~2,2 veces lo que toma leer el enunciado, en un banco de mecánica
cuántica de nivel universitario.

- Con `default-thresholds` (`:fluida` ≤ 3,0) eso cae en **`:fluida`**.
- **Es discutible.** En un ítem conceptual que exige una derivación, responder en
  2,2× el tiempo de lectura se parece más a **reconocer** la alternativa que a
  resolver con fluidez. El umbral de 3,0 se pensó con ítems tipo PAES, más cortos y
  más mecánicos.
- Es exactamente la situación de `028` antes de `032`: un número autoral razonable
  que los datos pueden mostrar del lado equivocado. La herramienta para decidirlo ya
  existe: `universo.irt.fluency/calibration-report`.
- ✅ **Hecho: el umbral es configurable por banco** (migración `041`, **aplicada en
  producción el 2026-08-13**, editable en Admin → Configuración de tests). Un banco
  de cuántica y uno de enteros ya no comparten qué cuenta como fluido. Columnas
  verificadas contra la base real; el check y los valores por banco se confirman
  con el bloque H de `supabase/queries/verificacion_esquema.sql`.
- ⏳ **Falta lo que importa: elegir los números con datos.** Que sea configurable no
  calibra nada; solo mueve la decisión a un lugar donde se puede corregir sin tocar
  código. Los defaults siguen siendo el 3/6 autoral.
- 📊 **Medido el 2026-08-13, tras aplicar `041`:** los **37 bancos** quedaron en 3/6,
  ninguno editado a mano (15 del track `mq_`, 22 de PAES). O sea que hoy el
  comportamiento es idéntico al de antes de la migración: ningún estudiante recibe
  una clasificación distinta. Los bancos `mq_` heredaron el corte pensado para ítems
  PAES —incluido `mq_momento_angular`, el que abrió la duda—, y el `update` a 2,0/4,5
  sigue comentado en la migración.

**Terminado cuando:** haya suficientes diagnósticos con tiempo real para correr
`calibration-report` y reemplazar el 3,0/6,0 autoral por cortes medidos.

**Aviso relacionado, si `max_items` quedó en 15:** el banco `mq_momento_angular`
tiene exactamente 15 ítems. Sin holgura, la selección adaptativa se queda sin
candidatos cerca del final —`next_question` filtra por cercanía a θ— y el test corta
por agotamiento en vez de por precisión. La consulta de control está al final de
`supabase/migrations/040_cuantica_test_configs.sql` (§4).

### T-66 · Línea del tiempo histórica en el tablero — **P2** · `hecho, sin publicar` (2026-08-13)

La idea es del owner: una "regla del tiempo" al pie del tablero donde los recursos aparezcan
como medallas que se van descubriendo. Se construyó sobre el hallazgo de
[[../sessions/SESSION-021]]: hay contenido histórico guardado desde `002` —20 módulos con
`historical_blurb`, 15 más de cuántica, decenas de recursos con `historical_context`— que **nadie
veía nunca**. La línea es la superficie que faltaba.

**Hecho:**
- `supabase/migrations/042_modules_historical_timeline.sql` — año, era y figura por módulo. Probada
  contra PostgreSQL 14 desechable: aplica limpia, idempotente, 35 ubicados / 0 sin ubicar.
- `universo.timeline` (puro, 10 tests) + `universo.components.timeline` + eventos y subs.
- Medallas derivadas del mejor θ en `tests`: **funcionan retroactivamente** con los 252 diagnósticos
  ya rendidos. Ver [[../adr/ADR-021-linea-del-tiempo-historica]].

**Terminado cuando:**
1. ✅ **el owner auditó los 35 años y aplicó `042` el 2026-08-13.** Control en producción:
   **35 ubicados / 0 sin ubicar**;
2. ⏳ se verifique la línea funcionando con una cuenta con historial (el owner ya tiene el sitio
   levantado en `localhost:3000`).

### T-67 · Verificar en vivo la identidad visual y la línea del tiempo — **P1** · `hecho en lo esencial` (2026-08-13)

Todo lo de T-41 y T-66 está compilado y con los audits en verde, pero **ninguna pantalla se miró con
ojos**. Es la misma deuda que T-38 arrastra desde ADR-012, ahora sobre un cambio visual mucho más
grande y con el sitio recibiendo tráfico (R-19).

**Cerrado por uso real, no por checklist.** El owner probó en local durante toda la sesión y de ahí
salieron **cinco rondas de corrección** (T-72a–d), que es una verificación más dura que un recorrido
guiado: cada reporte encontró algo que los audits daban por bueno. Lo efectivamente ejercitado:

- modal de feedback en **claro y oscuro**;
- gráfica IRT en oscuro, en el modal **y** en la pantalla de resultados;
- panel admin → Apariencia en oscuro (el rosa ilegible salió de ahí);
- **teléfono**, el 2026-08-13: "revisé en mi teléfono y se ve bien" — que valida la pasada de T-73.

**Lo que sigue sin mirarse**, dicho para no dar por verificado lo que no lo está: `cupos`, `cuenta`
y `plan` con una cuenta de estudiante, y **la línea del tiempo con historial real** (hace falta una
cuenta con diagnósticos rendidos para ver medallas encendidas). No bloquea nada: si algo estuviera
mal ahí, sería del mismo tipo que lo ya corregido.
- Cierra de paso T-38 (verificación visual pendiente desde ADR-012).

### T-68 · El modal de feedback: tres defectos distintos — **P1** · `hecho` (2026-08-13, falta verlo)

Reportado por el owner al probar el diagnóstico. Parecen un problema pero son tres, con causas
independientes y arreglos independientes:

**1. Se sale de la pantalla (bug de CSS, no de diseño).** `modal-overlay` combina
`flex items-center justify-center` con `overflow-y-auto` en el mismo elemento
(`components/feedback_modal.cljs:224`). Es un fallo clásico y conocido de flexbox: cuando el
contenido es **más alto que el viewport**, el centrado lo desborda por arriba **y** por abajo, y el
scroll no puede alcanzar la parte de arriba — queda contenido inaccesible. Se nota más en ítems
largos, que son justamente los que necesitan más explicación.
- **Arreglo:** el patrón habitual es `items-start` con `my-auto` en el hijo, o mover el scroll
  adentro del contenido (`max-h-[85vh] overflow-y-auto`) y dejar el overlay sin scroll.

**2. No heredó el lenguaje visual.** Es el componente que ADR-012 dejó como excepción con `dark:`
propio, y por eso quedó fuera de las tres pasadas de identidad: conserva el degradado
`from-blue-50 to-indigo-50` del enunciado, `border-stone-100`, `bg-slate-50` y `text-amber-600`.
El azul y el ámbar **no** pasan por los tokens, así que son los de fábrica de Tailwind: es la única
pantalla que sigue viéndose como el template viejo (ADR-022, ADR-023).

**3. Que sea un modal es una decisión de producto, no un defecto.** El owner observa que la
explicación "aparece como un modal sobre todo el texto". Tapar el enunciado justo cuando el
estudiante quiere comparar su error con la pregunta es discutible. Alternativa a evaluar: mostrar
la explicación **en línea, debajo del ítem**, con la pregunta todavía a la vista.
- ⚠️ **No decidir esto sin mirar el flujo completo:** el modal también muestra el gráfico de θ y el
  botón de continuar, así que no es solo "mover un texto".

**Resuelto el 2026-08-13:**

- ✅ **(1) El desbordamiento.** `items-start` + `m-auto` en el hijo. Los márgenes automáticos centran
  cuando sobra espacio y **no recortan** cuando falta, que es exactamente lo que `align-items:
  center` no sabe hacer.
- ✅ **(2) El lenguaje visual.** El enunciado pasó a un `alojamiento` —queda hundido en la placa, y
  de paso su texto claro sobre oscuro da 7.83 de contraste—; la explicación lleva la regla naranja al
  costado, que es lo único que la señal marca en esa pantalla, porque explicar el error es el
  diferencial del producto. Se fueron el degradado azul→índigo de fábrica, el `animate-pulse` que
  latía sin terminar y el escalado al pasar el mouse sobre opciones que **ya no son accionables**.
  **El verde y el rojo se conservan**: ahí el color sí informa.
- ✅ **(3) Decisión del owner: se mantiene el modal.** Se corrigen sus defectos y no se mueve la
  explicación a la página. Queda registrado para no reabrirlo por costumbre.
- 📐 Cuatro pares nuevos entraron al contrato de contraste; uno falló al medirlo (la regla naranja
  daba 2.75 y no llegaba ni a objeto gráfico) y se subió a `senal-600`. **31/31.**
- **Relacionado:** [[../adr/ADR-012-tema-oscuro-mapeo-css-global]] (la excepción que lo dejó afuera),
  [[../adr/ADR-023-panel-de-instrumento]].

### T-69 · La línea del tiempo como recta real, y los hitos como distribuciones — **P2** · `idea` (2026-08-13)

Idea del owner, para cuando haya más hitos cargados. Hoy la línea agrupa por era y reparte los
puntos dentro de cada bloque (ADR-021), que era lo necesario para que 14 de 35 hitos no se apilaran
en el siglo XX. La evolución propuesta va más lejos y es más honesta con el dato:

- **Que se parezca a la recta real.** Escala, marcas mayores y menores, y distancias que signifiquen
  algo — no bloques de ancho igual. Implica resolver la compresión de escala sin perder la lectura.
- **Manejabilidad:** desplazamiento y acercamiento sobre la recta, en vez de scroll horizontal
  simple; precisión para distinguir hitos cercanos.
- **Un hito no siempre es un punto.** Un acontecimiento que duró décadas —o un módulo cuya
  matemática se desarrolló a lo largo de un siglo— se representaría como una **campana** sobre la
  recta y no como un punto: el centro donde está el grueso, la anchura como duración o
  incertidumbre. El owner lo formuló como "una onda, algo parecido a la ecuación de onda", y en la
  práctica es una gaussiana por hito.
- **Por qué vale la pena:** es más científico y también más verdadero. La fecha exacta de un hito
  matemático casi siempre es una convención (ver los tres puntos débiles que declara la migración
  `042`); una campana **muestra esa incertidumbre en vez de esconderla detrás de un punto**.

- **Precondición:** más hitos y, sobre todo, decidir de dónde sale la anchura de cada campana —
  hoy `modules` solo guarda un año (`historical_year`). Haría falta algo como
  `historical_year_from`/`historical_year_to`, o una desviación explícita. **Eso es contenido, así
  que lo audita el profesor** (ADR-016).
- **Terminado cuando:** el owner defina el modelo de duración/incertidumbre y la recta lo dibuje sin
  perder legibilidad en móvil.
- **Relacionado:** [[../adr/ADR-021-linea-del-tiempo-historica]], T-67.

### T-70 · Agrupar el historial por evaluación, con «rendir de nuevo» y evolución — **P1** · `abierto` (2026-08-13)

Pedido del owner. Hoy el tablero lista los diagnósticos **uno por fila, en orden cronológico**
(`fila-historial`): quien rindió "números" cuatro veces ve cuatro filas sueltas y tiene que
reconstruir mentalmente si mejoró.

Tres partes:

1. **Agrupar por evaluación.** Una tarjeta por topic, con lo que ya se calcula: cuántas veces la
   rindió, el mejor θ, el último, la fecha más reciente.
2. **Botón «Rendir de nuevo»** en cada tarjeta, que arranca ese topic directamente en vez de pasar
   por el selector.
3. **Ver la evolución de ese topic**: cómo se movió θ entre intentos.

**Lo que ya existe y hay que reusar, no reescribir:**
- `universo.access/best-theta-by-topic` ya agrupa por topic y se queda con el mejor θ.
- `tests` guarda **un intento por fila**, así que la serie histórica ya está en la base — no hace
  falta esquema nuevo.
- `components/irt_chart.cljs` ya dibuja una progresión de θ; el eje cambia (intentos en vez de
  ítems), la pieza no.

⚠️ **Toca [[OPEN_QUESTIONS]] Q-07 / P-01**, que sigue sin decidir: qué significa repetir el
diagnóstico (¿se sobrescribe el perfil, se versiona, se guarda histórico?). Esta tarjeta **muestra**
el histórico que ya existe en `tests` sin cambiar `student_profiles`, así que puede hacerse sin
resolver Q-07 — pero conviene no cerrar Q-07 en contra de lo que esta pantalla muestre.

- **Terminado cuando:** el tablero agrupa por evaluación, cada tarjeta permite volver a rendir con
  un clic y ver la evolución de θ de ese topic entre intentos.
- **Relacionado:** T-26 (histórico del perfil), Q-07, `components/irt_chart.cljs`.

### T-71 · Quitar el botón flotante de contacto y agrandar la caja del footer — **P2** · `hecho` (2026-08-13)

Decisión del owner: el ícono flotante de llamada tapaba contenido y duplicaba una función que la
caja del footer ya cumple.

**Hecho:** se quitó `contacto-fab` de `home.cljs`. **El panel se conserva** porque *Cupos* lo abre
desde "Avisarme cuando haya cupo" (`:contacto/abrir-panel`, `slots.cljs:150`) — quitarlo habría roto
ese flujo en silencio. El formulario del footer salió de la columna estrecha (era 1 de 4) y pasó a
ser una placa de ancho completo con su propio encabezado, en el lenguaje de ADR-023.

- ✅ **Visto por el owner el 2026-08-13** (T-67), incluido en teléfono.

### T-72 · Tres fallas de contraste que el audit no veía — **P1** · `hecho` (2026-08-13, falta verlo)

Reportadas por el owner probando en local. Las tres son de fondo, no de texto, y por eso las tres se
escaparon:

1. **Panel admin → Apariencia, tema oscuro: rosa claro con letras blancas.** La opción seleccionada
   usaba `bg-senal-50` (un durazno muy claro) y **esa clase no estaba mapeada en oscuro**, así que
   se quedaba clara mientras el texto encima sí se mapeaba a casi blanco.
2. **La gráfica del modal, en oscuro, no se entendía.** `irt-chart` pinta el SVG con colores
   **literales** y no con clases — está documentado en su cabecera: `var(--x)` en atributos
   `fill`/`stroke` a menudo no resuelve y el relleno queda negro. Esa decisión es razonable, pero
   deja una gráfica de tinta oscura invisible sobre fondo oscuro.
3. **El modal en tema claro no separaba sus bloques.** Blanco, `panel-50` y `panel-100` son tres
   valores casi iguales: el modal quedaba como una mancha clara.

**Hecho:**
- Mapeados los tintes claros que faltaban (`bg-senal-50/100`, `bg-panel-50/100/200` y sus bordes).
- La gráfica pasa a un **`visor`**: superficie clara propia **en ambos temas**, igual que el visor de
  un instrumento. Resuelve la legibilidad **sin tocar el SVG** ni pelear con la decisión documentada
  de usar colores literales.
- Más separación de valor dentro del modal, con bordes funcionales (`panel-500`, 3.76 de contraste)
  en vez de tintes casi iguales.

**Lo que más importa de este ticket:** `scripts/audit_dark_theme.py` **solo miraba texto**, así que
el caso 1 le pasó por al lado — el texto estaba bien mapeado, el roto era el fondo. Ahora también
revisa **fondos claros (tono ≤ 200) sin mapear**, que es exactamente esa forma de fallar. Verificado
con control negativo: quitando la regla de `bg-senal-50`, el script lo reporta.

**Cuarta ronda (T-72d):** los textos de la gráfica —título, descripción, ejes, leyenda— no se leían
en oscuro **en la pantalla de resultados**. Dos causas:

1. **El visor lo había puesto en el sitio de llamada, no en el componente.** Lo agregué en el modal
   de feedback y `diagnostic_test` quedó sin él. Ese es el error de fondo: si la superficie la tiene
   que poner quien usa el componente, alguien se la olvida. **El visor pasó adentro de
   `irt-chart`**, que es su dueño natural, y el sitio de llamada dejó de envolverlo.
2. **Los colores literales de la gráfica nunca se habían medido.** Al hacerlo, dos reprobaban:
   los ejes y la leyenda daban **3.29** (rotulan texto: necesitan 4.5) y la serie de dificultad
   **2.36** (necesita 3.0), además de ser un naranja distinto del de la marca, compitiendo con él.
   Corregidos a 7.18 y 4.64, y **los cinco colores entraron al contrato** con los valores viejos
   anotados como prohibidos. 37/37.

**Tercera ronda (T-72c):** con el color corregido, el owner seguía sin leer "Pregunta" — "se ve
apenas el borde". El CSS estaba bien aplicado y el par daba **5.50, o sea AA aprobado**. El
problema era de diseño: en un aparato hay **dos** tipos de etiqueta y las traté como una sola. La
**grabada en la carcasa** es de bajo contraste a propósito; la que va **dentro de un visor está
iluminada**. A 11px, en versalitas espaciadas y con sombra, esta quedó grabada cuando debía estar
encendida. Se subió a 7.83, un punto más grande, menos espaciada y sin sombra.

> **La lección, que vale más que el arreglo:** el umbral de contraste es **necesario y no
> suficiente**. Un par puede aprobar AA y seguir sin leerse si el tamaño, el espaciado y la sombra
> juegan en contra. El audit dice cuándo algo está *mal*; no dice cuándo está *bien*.

**Segunda ronda (T-72b), tras volver a probar el owner:** la etiqueta "Pregunta" del modal seguía
sin leerse en tema claro. La causa era mía y tonta: **`.grabado` pinta `panel-700` y `.alojamiento`
tiene `panel-700` de fondo** — el mismo valor exacto, letras invisibles sobre su propio fondo.

Es una clase de error que **ninguno de los dos audits puede ver**: no es una utilidad de Tailwind
sin mapear ni un par de paleta declarado, es **una clase del sistema encima de otra**. Solo se
atrapa declarando el par, que es lo que se hizo (32/32).

De paso, revisando el mismo componente aparecieron dos fondos claros **fijos por estilo inline** en
`math-render`, que fallan igual en oscuro porque un estilo inline no se puede remapear: el bloque
de matemática desplegada (`#f8fafc`) y la cita (borde `#3b82f6`, texto `#64748b`). Los dos pasaron
a clases con tokens.

- ✅ **Visto por el owner el 2026-08-13** (T-67), incluido en teléfono.
- **Relacionado:** T-68, [[../adr/ADR-012-tema-oscuro-mapeo-css-global]], [[../adr/ADR-023-panel-de-instrumento]].

### T-73 · Revisión de adaptación a teléfonos antes del merge — **P1** · `hecho` (2026-08-13)

Pedido del owner antes de mergear: comprobar si el sitio quedó bien adaptado a teléfonos después de
tres pasadas de identidad visual. La respuesta corta es que **casi todo estaba bien y lo peor era
lo recién construido**.

**Lo que ya estaba bien:** `viewport` correcto en ambos `index.html`; ninguna tabla sin contenedor
scrollable; ningún ancho fijo en píxeles; la landing (43 cortes responsivos) y el modal (34) bien
cubiertos.

**Lo que estaba mal:**

1. **La línea del tiempo no tenía ni una clase responsiva.** El plan aprobado prometía "en móvil la
   barra colapsa a una tira compacta" y eso **nunca se implementó**. Además cada hito era un botón
   de ~34 px de alto alrededor de un punto de 10 px, con el año en 10 px: la interacción principal
   de la función más nueva era la peor adaptada al teléfono. Ahora los hitos miden 44 px
   (`min-h-11`), el punto creció y **el año se oculta por debajo de `sm`**, que es lo que vuelve
   compacta la tira. El dato no se pierde: está en el `aria-label` y en el panel de detalle.
2. **`p-8` fijo en cinco pantallas del embudo.** En 360 px se come 64 px de ancho útil. Pasó a
   `p-5 sm:p-8` en diagnóstico, tablero, plan, cupos y libro de visitas. Curiosamente la pantalla
   de resultados ya lo hacía bien: estaba resuelto en un lugar y no en los otros.
3. **Objetivos táctiles por debajo del mínimo** en el diagnóstico y en el formulario de contacto.
4. **La reserva de alto del tablero** (`pb-40` = 160 px) era casi un cuarto de una pantalla de
   667 px. Baja a `pb-28` en móvil.

**`scripts/audit_movil.py` (nuevo).** El proyecto tenía dos chequeos de color y **ninguno de
tamaño**. Revisa objetivos táctiles, padding fijo, texto diminuto, tablas sin scroll y anchos fijos,
separando el embudo (bloquea) del panel de administración (informativo: se usa desde escritorio).

> **Su primera versión tenía un falso negativo silencioso** y lo encontró el control de casos
> conocidos: al buscar el `:class` de un botón capturaba el primer literal de texto, que en
> `[:button {:type "button" :class …}]` es `"button"`. Daba **todas** las pantallas del panel por
> buenas. Un chequeo que no encuentra nada es indistinguible de uno que funciona — por eso ningún
> audit de este repo se da por bueno sin probarlo contra un caso que debería fallar.

- **Relacionado:** T-67 (verificación visual, sigue abierta), [[../adr/ADR-021-linea-del-tiempo-historica]].

### T-74 · Archivar el blog `jacobocordova.blogspot.com` antes de que desaparezca — **P2** · `abierta` (2026-08-13)

El blog **"Academia Integral"** (<https://jacobocordova.blogspot.com/>, 21 entradas, jul 2010 – feb
2012) es la única evidencia de la implementación de software del Sistema Llovizna y del origen del
nombre que el producto usa hoy. Ver [[RAIZ_SISTEMA_LLOVIZNA]] §1–2.

**Por qué es urgente aunque sea P2:** está alojado en Blogger, sin ningún compromiso de permanencia,
sobre una cuenta personal de hace 16 años. A diferencia de la tesis y la propuesta de 2012, el owner
**no tiene el documento fuente**: el contenido *es* la plataforma. Es el tipo de dependencia externa
que [[DEPENDENCIES]] registra.

**Qué hacer:**
1. Exportar el blog completo desde Blogger (Configuración → Administrar blog → Copia de seguridad
   del contenido) — genera un XML con entradas y comentarios.
2. Convertir a Markdown y versionar en `docs/blog-academia-integral/`, con el mismo criterio de
   R-26: **revisar datos personales antes del `git add`**.
3. Descargar las imágenes referenciadas (diagramas de arquitectura y capturas del sistema de
   2011–2012, que hoy solo existen en los servidores de Blogger).

**Criterio de terminado:** el contenido del blog es legible desde el repositorio sin conexión a
Blogger y sin datos personales. **Archivar no es publicar:** en la memoria solo entra lo que informe
una decisión del producto.

**Relacionado:** [[RAIZ_SISTEMA_LLOVIZNA]], [[../adr/ADR-024-raiz-en-la-tesis-2010]], [[RISKS]] R-26
(criterio de redacción), [[DEPENDENCIES]].

---

### T-75 · Responder en la landing la objeción "¿para qué medir, si puedo preguntar?" — **P1** · ✅ `hecha` (2026-08-13)

**Implementada el mismo día que se abrió.** Nueva entrada del FAQ, sincronizada en los **tres**
lugares (R-05) y colocada justo después de *"¿Qué necesito para empezar?"* — que es donde el lector
acaba de leer "toma alrededor de 20 minutos" y se hace exactamente esta pregunta:

> **¿Por qué no me preguntan directamente qué no entiendo?**
> Porque casi nadie puede responder eso con precisión, y no es culpa tuya: cuando arrastras un error
> conceptual sientes que estás aplicando bien la regla, así que el error es invisible desde adentro.
> A eso se suma que decir «no entendí» delante del curso cuesta, y que aunque pudieras nombrar todas
> tus dudas, seguirías sin saber cuál atacar primero. Por eso el diagnóstico no te pregunta qué te
> falta: lo mide, lo ordena por prioridad y te muestra el error concreto detrás de cada respuesta
> equivocada.

Las tres cláusulas son los tres argumentos de la tesis, en lenguaje de estudiante y sin jerga: el
déficit no es consciente · la presión social suprime la pregunta (Fies 2005) · preguntar no ordena.
La última frase describe capacidades **que el producto sí tiene** (`deficits` ordenados por tasa de
error + capa 0 desde `questions.error_a..d`), así que sigue siendo defendible.

**Verificado:** `src/universo/components/landing.cljs`, `index.html` y `public/index.html` con el
mismo texto; `clj -M:test` → **83 tests / 454 assertions / 0 failures**; `npx shadow-cljs release
app` → 0 warnings y la frase presente en `public/js/app.js`; `npm run build:css`;
`audit_contraste.py` y `audit_movil.py` en verde.

**Queda pendiente medir si sirve:** sin analítica (T-20) no se sabrá si mejora la conversión
landing → cuenta. Es una decisión de copy fundada en evidencia de 2011, no una hipótesis validada.

<details><summary>Planteamiento original de la tarea</summary>

**De dónde sale:** no de una hipótesis de marketing. Es la objeción que la propuesta viene recibiendo
desde que se expuso en público por primera vez, en 2011, planteada entonces por varias personas
distintas ([[OPEN_QUESTIONS]] Q-31): *¿para qué un diagnóstico de 20 minutos, si el estudiante puede
decir qué no entiende?*

**Por qué hay que responderla y no ignorarla:** es la primera pregunta que se hace una familia frente
a la propuesta, y **el copy publicado hoy no la toca**. La landing argumenta que el diagnóstico
personaliza y que agrupa por nivel; no argumenta por qué **medir** es distinto de **preguntar**.

**La respuesta ya existe y es del proyecto, no inventada** — viene de la tesis de 2010 (Fies 2005) y
de la distinción medición ≠ evaluación:

1. **El estudiante que no sabe qué le falta no puede decirlo.** El déficit no es consciente: quien
   arrastra un error conceptual cree que está aplicando bien la regla. Preguntar solo recoge lo que
   el estudiante ya sabe que ignora.
2. **La presión social suprime la pregunta.** Nadie levanta la mano delante de treinta compañeros
   para decir que no entendió — es literalmente el hallazgo de Fies (2005) que el owner ya citaba en
   2011.
3. **Preguntar no ordena.** Aunque el estudiante nombrara sus dudas, no puede priorizarlas ni
   ubicarlas en una progresión; θ y los déficits por módulo sí.

**Criterio de terminado:** la landing (o el FAQ) contiene una respuesta explícita a *"¿por qué no
simplemente me preguntan qué no entiendo?"*, en lenguaje de estudiante y sin jerga psicométrica.
Recordar que el copy vive en **tres lugares** ([[RISKS]] R-05) y que publicar exige
`npx shadow-cljs release app` + commit de `app.js` (ADR-003).

**Relacionado:** [[OPEN_QUESTIONS]] Q-31, [[RISKS]] R-19 (difundir sin responder esto es difundir
peor), [[BUSINESS_CONTEXT]] §3, T-20 (sin analítica, no se sabrá si mejora la conversión).

</details>

---

## Épica E8 — Motor de valor: los cinco vectores (F12–F16)

> **Abierta el 2026-08-16** por [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]] (D-47…D-51).
> Cierra la decisión pendiente P-11. Contenido y justificación: [[TESIS_DE_CRECIMIENTO]].
>
> **Esta épica es distinta de E1–E7 en una cosa importante:** aquellas convertían el MVP en un
> producto usable, y lo lograron. Esta convierte un producto en un negocio. **Buena parte de su
> trabajo no es de repositorio** — hablar con colegios, validar precios, postular a fondos. Que una
> tarea no produzca un commit no la hace menos tarea; ver [[RISKS]] R-30, que es exactamente el
> riesgo de tratarlas como si lo fueran.
>
> **Orden decidido:** T-76/T-77 (G-2) y T-78 (G-5) **primero y en paralelo**. Nada de lo demás
> arranca antes.

### T-76 · Pipeline de calibración de `difficulty` sobre respuestas reales — **P0** · `abierto`

Pasar de `difficulty` **asignada a criterio** a `difficulty` **estimada** con las respuestas ya
acumuladas (252 diagnósticos al 2026-08-09 y creciendo), en un namespace puro y testeable.

- **Dependencias:** ninguna nueva — los datos ya están en `tests`. Evaluar si el volumen alcanza
  para 2PL o si el 1PL calibrado es lo máximo defendible hoy (probablemente lo segundo).
- **Terminado cuando:** existe un procedimiento reproducible que produce una `difficulty` estimada
  por ítem con su error, está testeado, y la comparación contra la `difficulty` autoral actual está
  documentada (cuántos ítems se mueven y cuánto).
- **Vector:** G-2. **Relacionado:** [[ROADMAP]] F12, [[RISKS]] R-17/R-29, Q-05, T-29, T-50, T-65.

### T-77 · Reporte técnico de calibración publicable — **P0** · `abierto`

La salida de T-76 escrita como documento que un jefe de UTP o un evaluador técnico pueda leer:
metodología, tamaño de muestra, resultados y **limitaciones declaradas**.

- **Terminado cuando:** el documento existe, dice explícitamente qué **no** se puede afirmar con
  252 diagnósticos, y el owner lo daría a leer a un tercero sin incomodidad.
- **Criterio de calidad:** un banco calibrado con esta muestra se llama *calibrado con N=252*, no
  *validado*. Exagerar acá destruye exactamente lo que la tarea busca construir (B-07).
- **Vector:** G-2. **Relacionado:** S-11, H13, [[RISKS]] R-29.

### T-78 · Instrumentar CAC, LTV y el pipeline B2B — **P0** · `abierto`

Extiende T-20 (instrumentación del funnel) con las métricas de negocio M-10…M-16 de
[[BUSINESS_CONTEXT]] §6.1.

- **Dependencias:** T-20, T-21, T-22 y la decisión pendiente **P-04** (solución propia en Postgres
  vs. herramienta externa — implica privacidad, y con R-28 encima la respuesta propia gana peso).
- **Terminado cuando:** se puede responder con datos, no con intuición: *"¿cuánto cuesta traer un
  cliente por cada canal, y cuánto deja?"*, y el pipeline B2B (contactados → piloto → propuesta →
  contrato) es consultable.
- **Vector:** G-5. **Relacionado:** [[ROADMAP]] F10/H12, S-12, [[RISKS]] R-30, Q-15.

### T-79 · Rol `profesor` y panel docente por curso — **P0** · `abierto`

Crear el rol `profesor` (hoy inexistente: solo `user` y `admin`) y el panel que ve: distribución de
θ de **su** curso, déficits ordenados y misconceptions agregadas.

- **Dependencias:** T-81 (multi-tenant) — el rol sin aislamiento es un agujero, no una función.
- **Terminado cuando:** un profesor de prueba entra, ve solo sus cursos, y el panel muestra el
  agregado de T-82. Verificado **con policies**, no con la UI ([[../CLAUDE]] §7).
- **Vector:** G-1. **Relacionado:** [[ROADMAP]] F13/H14, S-13, [[PROJECT_BRIEF]] §6 (deja de ser
  exclusión), [[RISKS]] R-07 (no agrandar `admin.cljs`: el panel docente es módulo propio).

### T-80 · Validar precio y tamaño de mercado con compradores reales — **P0** · `abierto`

Hablar con **5–10 jefes de UTP o sostenedores** para responder Q-32: unidad de cobro, rango de
precio, encaje con SEP/PIE, quién decide y cuándo.

- **No es una tarea de análisis.** Ningún número de [[TESIS_DE_CRECIMIENTO]] §3 se valida leyendo
  más; se valida preguntando. También verifica contra fuentes MINEDUC el universo de
  establecimientos con enseñanza media (hoy "~3.300", supuesto A-32).
- **Terminado cuando:** Q-32 está respondida, P-14 decidida, y los supuestos A-31…A-35 de
  [[ASSUMPTIONS]] están confirmados o corregidos con su fuente.
- **Vector:** G-1. **Bloquea:** T-84, T-87 y cualquier cifra citada en una postulación a fondos.

### T-81 · Aislamiento multi-tenant por establecimiento (RLS) — **P0** · `abierto`

Modelar establecimiento y curso, y garantizar por **policy** que el colegio A no vea nada del
colegio B.

- **Restricción dura:** ADR-002 sigue vigente — se resuelve con RLS, **no** creando un backend.
- **Dependencias:** decisión pendiente **P-16** (Q-36: columna en `profiles`, tablas propias, o
  claim en el JWT).
- **Terminado cuando:** existe una verificación automatizada (T-11) que falla si un profesor puede
  leer datos de otro establecimiento, y la migración es idempotente (D-06).
- **Vector:** G-1. **Relacionado:** [[RISKS]] R-14/R-28, [[ROADMAP]] F13.

### T-82 · Agregación del mapa de errores por curso — **P0** · `abierto`

Convertir los perfiles individuales en el entregable que se le muestra al colegio: *"22 de 34
estudiantes de 4º B confunden el signo al despejar en inecuaciones"*.

- **Terminado cuando:** dado un curso, se produce el ranking de misconceptions con su conteo, y
  cada una enlaza al recurso publicado que la trabaja (capa 1 ya existente).
- **Criterio de diseño:** lógica pura y testeable ([[../adr/ADR-009-logica-pura-testeable]]), no
  dentro de un `reg-event-fx`.
- **Vector:** G-1. **Es el momento de la verdad del piloto:** si esta pantalla no impresiona, no
  hay venta.

### T-83 · Histórico versionado de perfiles y Δθ con su error — **P1** · `abierto`

Implementar D-50: `student_profiles` deja de ser materialización única y se versiona por intento;
Δθ por estudiante y agregado por cohorte, **siempre acompañado de su SE**.

- **A favor:** el histórico por intento **ya existe de facto en `tests`** (nota de Q-07/ADR-013), así
  que lo que falta es versionar el perfil, no capturar datos.
- **Terminado cuando:** un estudiante con dos diagnósticos ve ambos y su Δθ con banda de confianza;
  ningún diagnóstico nuevo borra el anterior; hay test de la lógica pura de Δθ.
- **Vector:** G-4. **Relacionado:** T-26, Q-07 ✅, P-01 ✅, [[ROADMAP]] F14/H16, S-16.

### T-84 · Pasarela de pago y facturación de licencia — **P1** · `abierto`

Sin cobro no hay ingreso, ni B2B ni premium. Cubre el pendiente que Q-02 dejó abierto desde
2026-07-28.

- **Dependencias:** T-80 (unidad y precio), P-14. Facturación institucional en Chile tiene
  requisitos propios (documento tributario) que hay que averiguar antes de elegir proveedor.
- **Terminado cuando:** un colegio puede pagar una licencia anual y un estudiante puede pagar una
  clase, con comprobante válido.
- **Vector:** G-1. **Relacionado:** Q-02, D-32, D-47.

### T-85 · Clases grabadas por cuadrante θ × λ × misconception — **P2** · `abierto`

Producir una vez, servir a todos los del cuadrante. El perfil ya calcula el cuadrante (ADR-019) y
"Mi plan" ya recomienda por módulo, así que la infraestructura de asignación existe.

- **Terminado cuando:** existe al menos una grabada por cada misconception del top de déficits
  reales, y "Mi plan" la asigna automáticamente.
- **Vector:** G-3. **Precondición deliberada:** demanda que el fundador ya no dé abasto para
  atender. Antes de eso es inventar oferta ([[ROADMAP]] F15).

### T-86 · Contrato y flujo de la red de profesores — **P2** · `abierto`

Definir cómo un profesor externo recibe un grupo ya diagnosticado y qué comisión cobra la
plataforma.

- **Incluye lo no técnico:** contrato, responsabilidad frente al estudiante, calidad y salida.
  [[VISION_LIBRO_PROYECTO]] §9 ya listaba "contrato para agentes educativos" como pregunta abierta
  del fundador.
- **Terminado cuando:** existe un profesor externo dictando un cupo y la comisión está cobrada.
- **Vector:** G-3. **Métrica que lo valida:** M-15 > 0.

### T-87 · Material de venta institucional y piloto acotado — **P1** · `abierto` · ⛔ **no en Cpech antes del 2026-11-21**

El guion, la propuesta y el formato del piloto gratuito: un nivel completo diagnosticado en una
hora de clase, con entrega del mapa de errores por curso.

- **Encuadre ya escrito:** *"Kahoot mide a la clase; esto mide a cada estudiante y le dice qué
  estudiar"* ([[RAIZ_SISTEMA_LLOVIZNA]] §2.5).
- **Terminado cuando:** un piloto está ejecutado en un colegio real (S-14), aunque sea gratuito.
- **Vector:** G-1, G-5. **Dependencias:** T-77 (no se vende sin el reporte), T-79, T-82.
- ⛔ **Restricción contractual descubierta el 2026-08-17 (T-93):** el piloto **no puede ejecutarse en
  Cpech** mientras el contrato del owner esté vigente (vence el **2026-11-21**) — hay prohibición
  expresa de derivar alumnos a servicios de preuniversitario ajenos y de crear grupos de estudio con
  sistemas no autorizados. El canal del **liceo** no está alcanzado por eso, pero su contrato sigue
  sin leerse. Ver [[RISKS]] R-32.

### T-88 · Aviso de privacidad y contrato de datos para el caso institucional — **P0** · `abierto`

El aviso actual está escrito para un estudiante individual que llega solo (D-20, revisado sin
abogado "dado el tamaño del proyecto"). **Ese argumento caduca con el primer contrato
institucional.**

- **Cubre:** quién es responsable y quién encargado del tratamiento, retención, y el caso de
  menores cargados por un tercero bajo Ley 21.719 (plena vigencia **2026-12-01**).
- **Terminado cuando:** existe texto revisado para el caso institucional **antes** de firmar el
  primer contrato, y T-07/T-09/T-11 están cerradas.
- **Vector:** G-1. **Relacionado:** [[RISKS]] R-06/R-28, D-20, D-21, T-10, T-34.

### T-89 · Verificar programas de financiamiento vigentes — **P1** · `abierto`

Responder Q-34: qué pide cada programa (CORFO Semilla Inicia/Expande, Start-Up Chile, SSAF,
innovación educativa), qué montos, qué ventanas, y **si el proyecto califica hoy** — en particular
si la constitución de sociedad, hoy inexistente, es bloqueante.

- **Terminado cuando:** existe una tabla con programa, monto, ventana, requisitos y veredicto de
  elegibilidad, con fuente y fecha de consulta.
- **Vector:** F16. **Contexto:** dos postulaciones previas sin éxito (2012–13, 2025). Antes de una
  tercera conviene saber por qué no calificaron.
- **Prohibido:** citar montos de [[TESIS_DE_CRECIMIENTO]] §4 antes de cerrar esta tarea.

### T-90 · Aplicar el diagnóstico en un curso real y observar — **P0** · `abierto`

**La tarea más barata y más informativa de todo el backlog.** Conseguir **un** curso (3º o 4º
medio, un profesor conocido), aplicarlo presencial en una hora de clase, con proyector, y observar.

- **No es una tarea de código.** Cuesta cero pesos y una hora.
- **🔺 2026-08-16: el curso ya existe.** Una profesora de matemática del liceo donde el owner es
  profesor de electrónica **ya ofreció su 4º medio**. Esta tarea dejó de ser una llamada en frío.
- **⚠️ Dos guardas antes de ejecutarla** ([[RISKS]] R-32): **(a)** que la dirección o UTP del liceo
  lo sepa, aunque sea informal — convierte "el profe hizo algo por su cuenta" en "el liceo dejó
  probar una herramienta", y cubre al owner frente a un apoderado; **(b)** hacerla como
  **observación, no como despliegue de datos**: el objetivo son las tres observaciones de abajo, no
  acumular diagnósticos de menores del propio establecimiento donde se trabaja.
- **Encuadre comercial desde el minuto uno** aunque sea gratis (L-39): decir en voz alta qué se
  mide, cuándo se revisa y qué pasa después si funciona. El piloto UNAP produjo 252 diagnósticos y
  cero clientes por no hacer esto.
- **Tres cosas que hay que medir, y son las tres respuestas que faltan:**
  1. **Cuántos de ~30 terminan los 20 minutos.** Responde si el largo es viable en una hora de clase.
  2. **Qué cara pone el profesor** cuando aparece el mapa de errores del curso proyectado. **Ese
     instante es el producto entero.** Si no le cambia la cara, no hay negocio B2B — y lo sabes en
     una hora en vez de en dos años.
  3. **Qué preguntan los estudiantes al terminar.**
- **Terminado cuando:** la sesión ocurrió, las tres observaciones están escritas en un
  `SESSION-XXX`, y R-31 queda confirmado o refutado con evidencia en vez de con argumento.
- **Vector:** G-1, G-5. **Bloquea de hecho a T-91** (no rediseñar el funnel antes de mirar uno real)
  y adelanta la mitad de **T-80**.
- **Relacionado:** [[RISKS]] R-30/R-31, [[LESSONS_LEARNED]] L-36.

### T-91 · Rediseñar el funnel para el aula (entrada sin cuenta) — **P0** · `abierto`

Construir la puerta de entrada que hoy no existe: la del curso completo, no la del estudiante
solitario.

```
Profesor crea un curso  →  código de 6 dígitos
        ↓
Estudiante entra a  /c/ABC123  desde su teléfono, en clase
        ↓          sin cuenta, sin correo, sin contraseña
Diagnóstico de 8–10 min  (no 20)
        ↓
Pantalla del estudiante:  UNA cosa que hace bien  +  UNA cosa concreta para trabajar
        ↓
Pantalla del PROFESOR, proyectada y en vivo:  el mapa de errores del curso
```

- **Cuatro cambios, ninguno es tecnología nueva** — es reordenar lo construido: se elimina la
  cuenta (la fuga mayor, e innecesaria en una sala); se acorta a la mitad (20 min consumen la hora
  completa y no dejan espacio para *usar* el resultado); la recompensa se muda al profesor (la
  pantalla del estudiante deja de ser una lista de fracasos); y el momento decisivo ocurre **en
  vivo, en la sala**.
- **Dependencias:** T-90 primero. T-79 (rol `profesor`), T-82 (agregación por curso), T-81
  (multi-tenant) y la decisión pendiente **P-17** (Q-37: cómo se entra sin cuenta sin romper RLS).
- **Terminado cuando:** un curso completo puede diagnosticarse en una hora sin que ningún estudiante
  cree una cuenta, y el profesor ve el agregado en vivo.
- **Vector:** G-1. **Cierra:** [[RISKS]] R-31.
- **Ojo con L-37:** rediseñar el funnel **no** es rehacer los cupos. Los cupos están construidos,
  funcionan y no molestan; el punto es qué se construye **después**, no qué se borra.

### T-92 · Conectar el login con Google (existe pero nadie lo llama) — **P1** · `hecho` (2026-08-17, commits `a7312ee` + `1fd5e4c`; **falta un login real de punta a punta**, ver abajo)

`sign-in-with-google` está definida en `src/universo/supabase.cljs:21` desde F0 y **ningún botón la
invoca**. Conectarla es de horas, no de días, y **cuesta $0** en las tres capas.

- **Lo que ya está resuelto y no hay que construir** (verificado 2026-08-16): `events/auth.cljs`
  tiene `getSession` + `onAuthStateChange` para rehidratar la sesión del callback; y el `profiles`
  lo crea el trigger `handle_new_user()` sobre `auth.users` (migración `008`, `security definer`),
  así que **un usuario que entre por Google obtiene su fila sin tocar nada**. Ese era el bug más
  probable y no existe.
- **Costo:** Google Cloud (proyecto, pantalla de consentimiento, credenciales OAuth 2.0) **$0**;
  Supabase Auth con proveedor Google **$0** (los proveedores sociales están en el tier gratuito, con
  tope por MAU muy por encima de lo necesario); infraestructura **$0** — corre en el navegador.
- **Trámite:** con scopes básicos (`email`, `profile`, `openid`) **no se requiere la evaluación de
  seguridad de Google**, pero **hay que publicar la app**: en modo "Testing" el tope son 100
  usuarios. *(Google cambia estos requisitos; verificar el estado vigente antes de darlo por hecho.)*

**⚠️ Guarda obligatoria — no romper D-21.** `components/login.cljs:141-157` tiene el checkbox de
declaración de edad (*"14 años o más, o autorización de mi representante"*), que es **D-21**, atado
a la Ley 21.719 y a [[RISKS]] R-06. Un botón de Google puesto junto al formulario **evita ese flujo
y deshace D-21 en silencio**, sobre un público mayoritariamente menor de edad. **La declaración va
antes del botón, no dentro del formulario de correo.** Si esto no se respeta, la tarea no está
terminada.

- ~~**Segundo detalle:** el `redirectTo` actual es `(.-href js/window.location)` — dinámico.~~
  *(Resuelto el 2026-08-17 — ver "Ejecutada" abajo: ahora es una sola URL fija. El párrafo se deja
  porque explica **por qué** había que cambiarlo.)* Hay que registrar el dominio en la allowlist de
  Redirect URLs de Supabase Auth o el login falla en silencio. La nota original decía "ayuda que
  casi todo viva en `/` mientras no exista router (T-05)" — el router **ya existe** (ADR-026), que
  es justamente lo que volvió peligroso el `href` dinámico: una URL distinta por cada ruta.
- **Terminado cuando:** un usuario entra con Google, obtiene su fila en `profiles`, la sesión
  rehidrata al recargar, y **la declaración de edad se registró antes del primer login**.
- **Vector:** G-5 (fricción del funnel B2C) y **G-1** — ver abajo.
- **Secuenciar después de T-90.** No es una tarea de UX menor: si en la sala real los estudiantes
  tienen cuenta de **Google Workspace del colegio**, esto deja de ser una mejora de conversión y
  pasa a ser **la puerta de entrada institucional** (identidad estable para Δθ + dominio como llave
  de multi-tenant). Es la cuarta opción de [[OPEN_QUESTIONS]] **Q-37** y toca **Q-36**. Una hora de
  clase decide cuál de los dos mundos es el de este proyecto.

**Ejecutada el 2026-08-17 (parte de código).** Lo que quedó en el repo:

- `components/login.cljs` — botón "Continuar con Google" en `/ingresar` y `/registrarse`,
  **inhabilitado hasta que la declaración de edad esté marcada**, con la razón escrita debajo para
  que un botón muerto no espante a nadie. La declaración se extrajo a `consent-block`, reutilizada
  en las dos rutas: en registro va **dentro** del `<form>` (validación nativa del navegador) y en
  login va **fuera**, pegada al botón de Google, que es el único camino de esa ruta capaz de crear
  una cuenta. Así **D-21 se cumple en los dos caminos** y no solo en el del correo.
- `supabase.cljs` — `redirectTo` pasó de `window.location.href` (dinámico, una URL distinta por
  cada ruta de origen) a **una sola URL fija**, `origin + /tablero`, tomada de la tabla de
  `universo.router` en vez de escrita a mano. La allowlist de Supabase queda con **una entrada**.
- **El aterrizaje del callback no necesitó código nuevo:** `/tablero` no es un archivo en GitHub
  Pages, así que lo sirve `404.html`, que arranca la misma aplicación (ADR-026/ADR-027);
  `:router/init` lo deja en `[:router :pending]` y `:auth/session-established` lo consume al
  resolver la sesión. Es el mecanismo de deep link de T-05 reutilizado. **Verificado en un servidor
  local que imita el fallback de Pages:** `/tablero` sin sesión arranca, queda pendiente y el guard
  desvía a `/ingresar`.
- Verificación: `clj -M:test` **97 tests / 530 assertions / 0 failures**; los cuatro
  `scripts/audit_*.py` en verde; `release app` + `build:css` corridos y `public/js/app.js`
  actualizado.

**Configuración hecha por el owner el mismo 2026-08-17** y desplegado en el commit `a7312ee`:
proyecto y credenciales OAuth 2.0 en Google Cloud (app `Academia Integral`, público Externo, scopes
`email`/`profile`), proveedor Google habilitado en Supabase y `https://jacobocordova.com/tablero`
en la allowlist de Redirect URLs.

**Verificado en producción:** el endpoint `/auth/v1/authorize` devuelve **302 a
`accounts.google.com`** con el `redirect_to` **intacto** —prueba de que la URL está en la allowlist,
porque si no lo estuviera Supabase la habría reemplazado en silencio por la Site URL— y el botón
lleva de verdad al selector de cuenta de Google desde `jacobocordova.com/ingresar`.

**Lo único sin verificar** (requiere un login real, que el agente no completa): el tramo Google →
callback → fila en `profiles` → rehidratación al recargar. Es un clic del owner.

**Pendiente cosmético, pero de confianza — ver [[RISKS]] R-33:** la pantalla de Google dice *"Ir a
jmnqklhxcdccvdhuuiji.supabase.co"*, no "Academia Integral", porque el destino del redirect es el
dominio de Supabase. Sobre un público de menores y apoderados, ese texto parece phishing. Se
arregla con el **custom domain de Supabase**, que es un add-on **de pago** (~USD 10/mes) — decisión
de negocio, no técnica.

### T-93 · Revisar el contrato de Cpech antes de cualquier demo formal — **P0** · `hecho a medias` (2026-08-17: Cpech leído; **falta el del liceo**)

**Bloqueante de todo uso del canal Cpech.** Cuesta media hora y protege dieciséis años de trabajo.

- **Qué se busca:** cláusulas de **cesión de propiedad intelectual o de invenciones**, de
  exclusividad, y de conflicto de interés. Aplica también, en menor grado, al contrato del liceo.
- **Por qué importa tanto:** si existe una cláusula de cesión y el owner demuestra el producto a la
  dirección **como empleado**, se abre una discusión sobre la titularidad del proyecto. Es el único
  riesgo del registro capaz de terminar con todo en una sola reunión ([[RISKS]] R-32).
- **Terminado cuando:** el owner sabe qué dicen sus contratos, la respuesta está en
  [[OPEN_QUESTIONS]] Q-38, y —si hay cláusula— existe un plan (deslinde por escrito, o no usar ese
  canal hasta constituir sociedad).
- **Después de esto, y no antes:** demo a Cpech con **encuadre comercial y algo por escrito**,
  aunque sea un correo de una página con alcance, propiedad y qué pasa si funciona (L-39).
- **Vector:** G-1, G-5.

**Ejecutada el 2026-08-17 (parte Cpech).** Resultado, en dos frases:

1. **No hay cláusula de cesión de propiedad intelectual ni de exclusividad.** La titularidad del
   proyecto **no está en discusión** — [[RISKS]] R-32 baja de "muy alto" a "medio". Refuerzos: la
   función contratada es *docente*, no desarrollo de software, y el primer commit del repo es diez
   meses anterior al inicio del contrato, con fechas verificables en un historial público.
2. **Pero el canal Cpech está cerrado por contrato hasta el 2026-11-21** (es de plazo fijo): hay
   prohibición explícita de derivar alumnos a servicios de preuniversitario ajenos —redactada como
   causal justificada de despido y vigente **fuera de jornada**—, de crear grupos de estudio con
   sistemas no autorizados (que es la función de cupos) y de usar material propio en clases.
   **T-87 no es viable en Cpech antes de esa fecha, y no se arregla con un deslinde por escrito.**

**Sigue abierto:** el **contrato del liceo**, que es otro documento y no se ha leído. Ese canal
*parece* abierto —las prohibiciones de Cpech son sobre sus propios alumnos— pero no está verificado.

> **El texto del contrato no está en el repositorio y no debe agregarse:** contiene datos personales
> del owner y de terceros, y el repo es público (mismo criterio que R-26). Si hace falta, pedírselo
> al owner.

---

## Resumen por prioridad

| Prioridad | Tareas |
|-----------|--------|
| **P0** | **T-118**, T-01, T-02, T-03, T-04, T-08, T-19, T-30, T-47, T-50, **T-76, T-77, T-78, T-79, T-80, T-81, T-82, T-88, T-90, T-91, T-93, T-110** |
| **P1** | T-05, T-06, T-07, T-09, T-10, T-12, T-20, T-24, T-25, T-27, T-28, T-35, T-39, T-44, T-48, T-51, T-59, T-60, T-67, T-68, T-70, T-72, T-73, T-75, **T-83, T-84, T-87, T-89, T-92, T-111, T-117, T-120, T-121, T-123, T-124** |
| **P2** | T-11, T-13, T-15, T-16, T-18, T-21, T-26, T-31, T-33, T-34, T-36, T-38, T-40, T-41, T-42, T-45, T-49, T-63, T-65, T-66, T-69, T-71, T-74, **T-85, T-86, T-95, T-113, T-115, T-116, T-122** |
| **P3** | T-14, T-17, T-22, T-23, T-29, T-32, T-37, T-43, T-46, T-52, T-61, T-62 |

> ⚠️ **Esta tabla está incompleta y se detectó el 2026-08-18** (comprobado por script, no a ojo):
> **quince tareas definidas más abajo no aparecen en ninguna fila** — T-53, T-54, T-55, T-56, T-57,
> T-58, T-94, T-96…T-103. No se completó en esa sesión porque asignarle prioridad a quince tareas de
> otras sesiones es una decisión de planificación, no un arreglo de formato, y hacerlo de memoria es
> exactamente cómo se inventa contexto. **Mientras tanto, la ficha de cada tarea manda sobre esta
> tabla**: la prioridad está en su encabezado.

> **Nota sobre las P0 nuevas (2026-08-16):** las P0 de E1 significaban "bloquea go-live" y están
> todas cerradas. Las P0 de E8 significan **"bloquea el primer peso de ingreso institucional"**. No
> son la misma escala y no compiten: E1 ya terminó. **T-07, T-09 y T-11 (P1/P2 de E2) suben de
> hecho a P0** en el momento en que se firme un contrato institucional — ver [[RISKS]] R-28.

---

Relacionado: [[TESIS_DE_CRECIMIENTO]] · [[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]] ·
[[CURRENT_STATUS]] · [[ROADMAP]] · [[RISKS]] · [[OPEN_QUESTIONS]] · [[REQUIREMENTS]]
