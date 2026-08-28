# RISKS

Última actualización: **2026-08-23** (segunda pasada del día) — **R-37 nuevo** (las corridas de depuración del admin sobre el diagnóstico entran a `tests` sin distintivo y van a contaminar la calibración del banco, que es G-2) y **R-38 nuevo** (la parada por precisión del diagnóstico es aritméticamente inalcanzable: nunca se dispara). · Antes: **2026-08-23** — **R-36 nuevo** (una sección sin fondo propio hereda el de la página y ningún auditor lo detecta; costó 52 textos bajo AA en el CV). · Antes: **2026-08-19** — **R-35 nuevo** (la clave correcta está en la letra A en 293
de los 306 ítems; mitigado en el cliente por ADR-030, el dato sigue sesgado). ·
Antes: **2026-08-17** — **R-33 nuevo** (la pantalla de Google nombra a `supabase.co`
y no a la marca, visto en vivo al verificar T-92; toca la confianza justo en el registro) y **R-32
rebajado** tras leer el contrato de Cpech. ·
Antes: **2026-08-16** — **cuatro riesgos nuevos por el pivote de negocio**
([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]]): **R-30** (cuarta repetición del patrón
histórico — **pasa a ser el riesgo dominante**, subsume a R-19 y R-01), **R-27** (ciclo de venta
más largo que la caja), **R-28** (datos de menores a escala institucional) y **R-29** (vender sin
calibrar). Más tarde ese día: **R-31** (el funnel sirve a un canal que nunca produjo un usuario,
probabilidad *confirmada*) y **R-32** (propiedad intelectual y conflicto de interés con los
empleadores — impacto **muy alto**, precondición de los tres canales de distribución). Además R-01
y R-19 se **reencuadran**, no cambian de severidad. ·
Antes: 2026-08-13 (**R-26 nuevo y activo**: datos personales del owner en
`docs/tesis.md` y `docs/sistema_llovizna.md`, todavía sin commitear — ventana abierta para
redactarlos barato; R-25 nuevo, cambio visual sin verificar en vivo) ·
2026-08-12 (R-24 nuevo, umbrales de fluidez sin calibrar; R-23 agregado a
la tabla resumen, donde faltaba; R-23 nuevo el 2026-08-11 por el track experimental de cuántica;
nota de T-44/T-59 en R-17; R-11 activado y R-19 dominante tras cerrar T-04;
R-21 cerrado tras limpieza de ramas; R-13 refrescado; ver
también R-10/R-16 ya cerrados en pasadas previas)

> ⚠️ **Nota de vigencia:** esta pasada (2026-08-09) corrigió R-13 y R-21. El resto del cuerpo
> puede tener afirmaciones puntuales caducas de sesiones anteriores a la última edición de cada
> riesgo — cada entrada lleva su propia fecha de cierre/mitigación cuando aplica. Ver
> [[CURRENT_STATUS]] para el estado real del proyecto en cualquier momento.

Escala de **impacto** y **probabilidad**: Baja / Media / Alta.
**Severidad** = combinación (Alta si impacto Alto y probabilidad ≥ Media).
Estado: `activo` · `mitigado` · `aceptado` · `cerrado`.

> "Responsable sugerido" es una **sugerencia**, no una asignación: hoy el proyecto tiene un solo
> responsable real (ver R-01).

---

## Tabla resumen

| ID | Riesgo | Impacto | Prob. | Severidad | Estado |
|----|--------|---------|-------|-----------|--------|
| R-01 | Bus factor = 1 | Alto | Alta | **Alta** | activo |
| R-02 | Desarrollo contra la base de producción | Alto | Alta | **Alta** | activo |
| R-03 | Sin respaldo propio verificado | Alto | Media | **Alta** | activo |
| R-06 | Datos personales de menores sin aviso de privacidad | Alto | Media | **Alta** | activo |
| R-14 | Error de policy RLS expone datos de estudiantes | Alto | Media | **Alta** | activo |
| R-04 | Sin CI: se publica con tests rojos o sin recompilar | Medio | Alta | Media-alta | activo |
| R-10 | "Mi plan" vacío por falta de contenido publicado | Alto | Baja | Baja | ✅ **cerrado 2026-08-09** |
| R-13 | Bundle publicado desalineado del fuente | Medio | Media | Media | activo (mitigado por disciplina) |
| R-05 | Divergencia entre los tres lugares del copy/JSON-LD | Medio | Media | Media | activo |
| R-07 | Monolitos (`admin.cljs`, `crud.cljs`) | Medio | Media | Media | activo |
| R-08 | Reglas duplicadas cliente/DB se desincronizan | Medio | Media | Media | activo |
| R-09 | Contrato JSONB de `profile` sin esquema | Medio | Media | Media | activo |
| R-11 | Cupos que nunca alcanzan el mínimo | Medio | Alta | Media-alta | ⚠️ **activado 2026-08-09** |
| R-12 | Entregabilidad de email (spam / dominio no verificado) | Medio | Media | Media | mitigado |
| R-15 | Dependencia total de Supabase (free tier / cambio de términos) | Alto | Baja | Media | aceptado |
| R-16 | Banco de ítems descargable por cualquier cuenta | Alto | Baja | Baja | ✅ **cerrado 2026-08-09** (ADR-015) |
| R-17 | `difficulty` no calibrada ⇒ θ sesgada | Medio | Media | Media | activo |
| R-18 | Spam en guestbook / contacto (sin rate limit) | Bajo | Alta | Media | mitigado (moderación) |
| R-19 | Estacionalidad PAES: ventana de captación estrecha | Medio | Alta | **Alta** | 🔺 **dominante 2026-08-09** |
| R-20 | Grafo de conocimiento ciego a `.cljs` | Bajo | Alta | Media | activo |
| R-21 | Deuda de ramas: trabajo perdido u olvidado | Medio | Media | Media | ✅ **cerrado 2026-08-09** |
| R-22 | Bundle sin code splitting: crecimiento monótono | Bajo | Media | Baja | aceptado |
| R-23 | Contenido experimental de cuántica visible para un estudiante de PAES | Medio | Baja | Baja | aceptado y monitoreado |
| R-24 | El eje de fluidez etiqueta con umbrales autorales sin calibrar | Medio | Media | Media | activo (2026-08-12) |
| R-26 | Datos personales del owner (cédula, teléfono, fecha de nacimiento) en documentos históricos añadidos a un repo público | Alto | Alta si se commitea | Alta | ✅ **cerrado 2026-08-13** (redactados antes del primer commit) |
| R-25 | Cambio visual amplio sin verificación en vivo, sobre un sitio con tráfico | Medio | Baja | Baja | ✅ **mitigado 2026-08-13** (verificado por el owner, incl. teléfono) |
| **R-30** | **Cuarta repetición del patrón histórico: agregar producto sin resolver distribución** | Alto | Alta | **Alta** | 🔺 **abierto 2026-08-16** |
| **R-27** | **El ciclo de venta institucional es más largo que la caja disponible** | Alto | Alta | **Alta** | abierto 2026-08-16 |
| **R-28** | **Datos de menores a escala institucional bajo Ley 21.719** | Alto | Media | **Alta** | abierto 2026-08-16 |
| **R-29** | **Vender B2B con el banco sin calibrar y perder la credibilidad del método** | Alto | Media | **Alta** | abierto 2026-08-16 |
| **R-31** | **El funnel está diseñado para el canal que nunca produjo un usuario** | Alto | **Confirmada** | **Alta** | 🔺 **abierto 2026-08-16** |
| **R-32** | ~~Propiedad intelectual~~ **y conflicto de interés con los empleadores (Cpech, liceo)** | Medio | Media | Media | 🔻 **rebajado 2026-08-17** (T-93): **no hay cesión de PI** — la titularidad no está en discusión. Queda solo el conflicto de interés, y con una respuesta concreta: **el canal Cpech no es usable hasta el 2026-11-21** |
| **R-33** | **La pantalla de Google nombra a `supabase.co`, no a la marca** | Bajo | **Confirmada** | Media | abierto 2026-08-17 |
| **R-34** | **El escape («no sé») se usa como salida fácil y diluye la evidencia del banco** | Medio | Media | Media | abierto 2026-08-18 (D-57). Mitigado estructuralmente contra el estudiante —peso 0.0 no mueve θ—; **se reactiva con severidad alta si el escape pasa a tener peso positivo** |

---

## Detalle

### R-01 · Bus factor = 1
**Descripción:** una sola persona (Jacobo Córdova) es owner, desarrollador, autor del contenido
pedagógico y operador de la infraestructura. No hay otra persona con acceso ni conocimiento.
**Impacto:** Alto — cualquier indisponibilidad detiene el proyecto por completo.
**Probabilidad:** Alta (es el estado permanente, no un evento).
**Mitigación:** (a) esta memoria de proyecto es precisamente la mitigación principal: cualquier
persona o agente puede retomar leyendo `project-memory/`; (b) documentar accesos y credenciales en
un gestor de contraseñas con un contacto de respaldo; (c) mantener [[HANDOFF]] al día.

> **Reencuadre 2026-08-16 (D-49 / G-3).** Las mitigaciones (a)-(c) son de **continuidad**: hacen que
> el proyecto sobreviva a la ausencia del fundador. Ninguna resuelve el problema real, que es de
> **capacidad**: el ingreso está atado a sus horas. Por primera vez hay un plan estructural en vez
> de una mitigación por disciplina:
>
> - **G-3** (clases grabadas por cuadrante + red de profesores con comisión) ataca el acoplamiento
>   ingreso ↔ horas. Métrica que lo mide: **M-15**.
> - **F16** compromete la primera contratación en cuanto haya ingreso recurrente. Hito **H18**.
>
> **Contrapartida honesta: el pivote agrava R-01 antes de aliviarlo** — la venta institucional es
> trabajo nuevo que hoy solo puede hacer el fundador. Ver [[RISKS]] R-27.
**Responsable sugerido:** owner. **Estado:** activo (parcialmente mitigado desde 2026-07-26).

### R-02 · Desarrollo contra la base de producción
**Descripción:** existe un solo proyecto Supabase. Migraciones y cambios de policy se prueban en
vivo, sobre los datos reales.
**Impacto:** Alto (pérdida o corrupción de datos, caída del acceso).
**Probabilidad:** Alta mientras no exista staging.
**Mitigación:** T-09 (proyecto de desarrollo); mientras no exista, toda migración debe ser
idempotente (`create ... if not exists`, `drop policy if exists`) — práctica que el repo ya sigue —
y aplicarse leyendo primero el efecto en las tablas afectadas.
**Responsable:** owner. **Estado:** activo.

### R-03 · Sin respaldo propio verificado
**Descripción:** se depende de los respaldos por defecto del plan de Supabase. No hay export propio
ni restauración probada.
**Impacto:** Alto — el banco de ítems y los perfiles de estudiantes son irreemplazables.
**Probabilidad:** Media.
**Mitigación:** T-07 — `pg_dump` periódico documentado y **una restauración de prueba**. Registrar
la fecha del último respaldo en [[CURRENT_STATUS]].
**Estado:** activo.

### R-04 · Sin CI
**Descripción:** no había `.github/workflows`. Nada impedía commitear con tests rojos ni publicar
sin recompilar el bundle.
**Impacto:** Medio. **Probabilidad:** Alta.
**Mitigación:** T-06 -- **implementado 2026-08-03**: `.github/workflows/test.yml` corre
`clj -M:test` en cada push/PR a cualquier rama. **No verificado en vivo** (no se pusheó ni se vio
correr en GitHub Actions real -- verificar el primer run antes de confiar en el badge). El check de
`src/**.cljs` cambiado sin `public/js/app.js` sigue sin implementar (queda como nota en T-06); regla
dura en [[../CLAUDE]] §8 de correr los tests antes de commitear sigue vigente como respaldo manual.
**Estado:** mitigado (parcialmente -- pendiente verificación en vivo).

### R-05 · Divergencia del copy y del JSON-LD
**Descripción:** los textos de FAQ y la oferta viven en `index.html`, `public/index.html` y
`landing.cljs`. Tres copias del mismo hecho.
**Impacto:** Medio (SEO incoherente, promesas contradictorias — sensible porque uno de los tres
textos es la nota histórica sobre UNAP, D-18, y una divergencia ahí podría sobrerrepresentar el
vínculo ya terminado).
**Probabilidad:** Media.
**Mitigación:** T-12 (una sola fuente del HTML); hasta entonces, regla: **si cambia un texto de la
FAQ o de la oferta, cambiarlo en los tres lugares en el mismo commit** ([[LESSONS_LEARNED]]).
**Estado:** activo.

### R-06 · Datos personales de menores sin aviso de privacidad
**Descripción:** se recolectan email, IP, ciudad/país, idioma, navegador, SO, nivel de batería,
mensajes y resultados de diagnóstico de un público mayoritariamente menor de edad, sin política de
privacidad publicada ni consentimiento explícito. Ya no hay respaldo universitario que mostrar
(ver [[OPEN_QUESTIONS]] Q-01), así que ese factor de impacto reputacional/institucional baja, pero
el riesgo normativo sube: la **Ley 21.719** entra en plena vigencia el 1/12/2026 con reglas de
consentimiento por edad (ver [[OPEN_QUESTIONS]] Q-03), y hoy el signup no captura edad.
**Impacto:** Alto (normativo; reputacional si se filtra o denuncia una mala práctica con menores).
**Probabilidad:** **Alta desde el 2026-08-09** — la condición que este riesgo esperaba ("abrir a
estudiantes reales, F8") **ya ocurrió**: hay un cupo real publicado y el sitio queda a la espera de
estudiantes. Sube más cerca del 1/12/2026, fecha que ahora cae **dentro** de la ventana de
captación activa.
**Mitigación:** T-10 — **2026-07-28: aviso de privacidad publicado**, checkbox de aceptación +
declaración de edad en el registro, y flujo de solicitud de eliminación de cuenta (ver
[[OPEN_QUESTIONS]] Q-03). **Queda pendiente:** eliminar la recolección de batería en `visitor`
(sin uso justificado), aplicar la migración `009` en producción, y automatizar la retención a 12
meses (T-34, hoy es solo una promesa en el texto).
**Estado:** activo, mitigación en curso. **Nota 2026-08-09:** este riesgo decía "bloquea moralmente
F8 hasta que T-10 y T-34 cierren", y **F8 se cerró con T-34 todavía abierta**. No se reescribe la
frase para simular que siempre supimos lo correcto (regla de gobernanza): se deja constancia de que
el go-live ocurrió con una promesa pública —la retención automática a 12 meses del Aviso de
Privacidad— **sin el proceso que la ejecute**. Cerrar T-34 pasa de "importante" a **deuda con fecha
de vencimiento**: el 1/12/2026.

### R-07 · Monolitos
**Descripción:** `components/admin.cljs` (1060), `db/crud.cljs` (975), `events/admin.cljs` (738)
concentran la mayor parte del comportamiento sin tests.
**Impacto:** Medio (regresiones difíciles de detectar).
**Probabilidad:** Media.
**Mitigación:** T-15 — extraer lógica pura y separar por dominio, sin cambiar comportamiento.
**Estado:** activo.

### R-08 · Reglas duplicadas cliente/DB
**Descripción:** las bandas de θ y la regla de confirmación de cupo existen en ClojureScript y en
SQL. Si se cambia una sola, la UI miente o la DB rechaza.
**Impacto:** Medio. **Probabilidad:** Media.
**Mitigación:** documentado en [[ARCHITECTURE]] §2.3 y §3.3; regla: cambiar una implica cambiar la
otra en el **mismo commit** y actualizar el test espejo de `slots.logic`.
**Estado:** activo (mitigado por documentación y tests).

### R-09 · Contrato JSONB implícito
**Descripción:** `student_profiles.profile` se escribe con la salida de `universo.profile/build`
sin validación de esquema. Un cambio de forma rompe lectores antiguos en silencio.
**Impacto:** Medio. **Probabilidad:** Media.
**Mitigación:** documentar la forma esperada (ya está en `supabase/SCHEMA.md` y
[[ARCHITECTURE]] §3.2); tratar el cambio de forma como cambio de contrato → ADR; considerar
`clojure.spec`/malli o un check JSONB.
**Estado:** activo.

### R-10 · "Mi plan" vacío — ✅ **CERRADO 2026-08-09**
**Descripción:** el mecanismo del plan funciona, pero sin `resources` publicados el estudiante ve
una pantalla pobre justo en el momento de mayor expectativa (acaba de terminar el diagnóstico).
**Impacto:** Alto sobre la conversión y la credibilidad. **Probabilidad:** era Alta.
**Mitigación aplicada:** T-01 (58/61 recursos publicados, los 7 módulos prioritarios cubiertos) y
T-24 (estado vacío honesto que igual entrega capa 0, en producción desde el 2026-08-05).
**Residual:** falta verificar "Mi plan" con una cuenta de estudiante real en cada banda de θ; los
3 recursos de video sin grabar (T-52) no bloquean ningún módulo prioritario.
**Estado:** cerrado.

### R-11 · Cupos que nunca confirman — ⚠️ **ACTIVADO 2026-08-09**
**Descripción:** un cupo con `min_enrollments` que no se alcanza deja a los inscritos esperando sin
comunicación ni fecha límite.
**Impacto:** Medio (abandono, mala experiencia). **Probabilidad:** Alta al inicio, cuando el volumen
de estudiantes es bajo.
**Dejó de ser hipotético el 2026-08-09:** con T-04 hay un cupo real publicado (sábado 2026-08-15
10:30) y `min_enrollments = 3` por D-27. Si no se inscriben 3 personas, el cupo no se confirma solo.
**Mitigación ya implementada:** el estudiante ve "faltan N inscritos" (`slots.cljs`, vía
`logic/remaining-to-confirm`); el admin puede cancelar a mano con un día de anticipación (D-28,
D-31) y eso dispara un aviso automático a cada inscrito (T-25, migración `012`, aplicada).
**Lo que sigue sin mitigar:** nadie *decide* revisar el cupo — la cancelación es manual y no hay
recordatorio. Si el owner no lo mira antes del viernes 2026-08-14, los inscritos se enteran el mismo
sábado o no se enteran.
**Estado:** activo, mitigación parcial. **Acción concreta:** revisar el cupo el 2026-08-14.

### R-12 · Entregabilidad del email
**Descripción:** enviar desde `onboarding@resend.dev` (default sin `EMAIL_FROM`) o desde un dominio
no verificado lleva los correos a spam.
**Impacto:** Medio (la notificación de confirmación es el único canal fuera de la app).
**Probabilidad:** Media.
**Mitigación:** verificar dominio en Resend y setear `EMAIL_FROM`; probar entrega real (T-02);
mantener la notificación in-app como canal primario.
**Estado:** mitigado (2026-08-09). Dominio `mail.jacobocordova.com` verificado en Resend,
`EMAIL_FROM` seteado a ese dominio; entrega confirmada a bandeja principal (no spam) en dos
pruebas reales de T-02 (envío manual y cadena completa vía cupo confirmado). Ver [[BACKLOG]] T-02.

### R-13 · Bundle desalineado del fuente
**Descripción:** el deploy consiste en commitear `public/js/app.js`. Es posible publicar fuente sin
recompilar, o commitear un bundle que no corresponde a lo que hay en `src/`.
**Impacto:** Medio (producción se comporta distinto del código leído; depuración engañosa).
**Probabilidad:** Media — el riesgo estructural sigue ahí (no hay check automático, T-06 no cubre
esto), pero la disciplina de recompilar antes de cada publish se ha mantenido en la práctica en
todas las sesiones recientes (verificado por hash contra producción varias veces: T-19/T-35/T-38/
T-39/T-47). **Nota 2026-08-09:** verificado que el árbol estaba limpio salvo trabajo del owner sin
relación (`AVISO_PRIVACIDAD_BORRADOR.md`); no hay bundle sin commitear hoy.
**Mitigación:** T-08 (hecha); T-06 con un check automático que avise si `src/**.cljs` cambió sin
`public/js/app.js` sigue sin implementar. Regla dura: **nunca** editar el bundle a mano; siempre
`release app` antes de publicar.
**Estado:** activo (riesgo estructural sin check automático; sin incidente actual).

### R-14 · Error de policy RLS
**Descripción:** RLS es el **único** control de autorización. Una policy permisiva de más expone
perfiles, respuestas o el banco de ítems; una restrictiva de más rompe el producto en silencio.
**Impacto:** Alto. **Probabilidad:** Media (cada migración toca policies y se aplica a mano).
**Mitigación:** T-11 (verificación automatizada con dos usuarios de prueba); revisión obligatoria
del checklist de RLS antes de aplicar una migración; nunca confiar en checks de UI.
**Estado:** activo.

### R-15 · Dependencia total de Supabase
**Descripción:** auth, datos, autorización, funciones y email dependen de un proveedor y de su free
tier. Un cambio de términos o límites afecta todo.
**Impacto:** Alto. **Probabilidad:** Baja a corto plazo.
**Mitigación:** el estado vive en PostgreSQL estándar (portable con `pg_dump`); mantener el acceso
a datos centralizado en `db.crud` reduce el costo de un cambio de proveedor.
**Estado:** aceptado conscientemente ([[../adr/ADR-002-supabase-como-unico-backend]]).

### R-16 · Banco de ítems expuesto — ✅ **CERRADO 2026-08-09** (materializado el 2026-08-08)
**Descripción:** `questions` (con `correct_option` y `error_*`) es el activo principal. Si alguna
policy permite SELECT amplio a usuarios autenticados, el banco es descargable; y el flujo del
estudiante necesita leer preguntas, así que la policy exacta importa.

**Ya no es un riesgo hipotético.** La auditoría de `pg_policies` del 2026-08-08 encontró la policy
`"Enable read access for all users"` (SELECT, `authenticated`, `using true`), creada desde el
dashboard de Supabase y ausente de todo archivo versionado. Como las policies PERMISSIVE se
combinan con **OR**, la regla efectiva es `true` y `questions_select_admin` es **inerte**:
cualquier cuenta autenticada puede descargar el banco completo. Ver [[OPEN_QUESTIONS]] Q-12
(respondida).

**Impacto:** Alto, y por dos vías distintas: (a) pérdida del activo/diferencial; (b) el diagnóstico
se vuelve falseable, y esas respuestas falsas **contaminarían de forma permanente** la calibración
futura de `difficulty` ([[BACKLOG]] T-29, T-45).
**Probabilidad:** **Alta** — no hay barrera, solo hace falta una cuenta gratuita. Mitigada de facto
hoy únicamente porque el sitio no está promocionado y no hay estudiantes.
**Severidad:** **Alta** (era Media).
**Mitigación aplicada:** [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]] — el cliente dejó de
leer `questions`; el ítem viaja sin respuesta (`next_question`) y la corrección ocurre en el
servidor (`score_answer`). Migraciones `023`–`026` aplicadas y bundle publicado.

**✅ Cerrado 2026-08-09, verificado en producción:** anónimo → `permission denied`; estudiante →
**0 filas** (antes 387); los RPC sirven el ítem sin `correct_option` ni `error_*`; el diagnóstico
funciona igual. Ver [[BACKLOG]] T-47, [[OPEN_QUESTIONS]] Q-12 y X-03.

**Riesgo residual aceptado (no eliminado):** un usuario autenticado puede sondear `score_answer`
ítem por ítem y reconstruir la clave con `N` llamadas registrables. El objetivo era eliminar la
exfiltración masiva —una sola consulta devolvía todo—, no volver imposible el sondeo. La defensa
fuerte (aceptar respuestas solo para ítems servidos en un test activo) exige estado de test en el
servidor y quedó fuera de alcance.
**Estado:** **cerrado**, con el residual documentado arriba.

### R-17 · `difficulty` no calibrada
**Descripción:** el modelo 1PL depende enteramente del parámetro `b` (dificultad) de cada ítem. Si
está asignada a criterio y no estimada con datos, θ y por lo tanto la banda y el cupo pueden estar
sesgados.
**Impacto:** Medio (el producto entrega un diagnóstico plausible pero incorrecto).
**Probabilidad:** Media.
**Mitigación:** T-29 (calibración empírica); mientras no exista, comunicar θ como *estimación* — la
landing ya lo hace ("nivel estimado").
**Estado:** activo. **Nota 2026-08-09:** T-50 (cerrada) resolvió el caso agudo —escalas
incompatibles que dejaban topics enteros sin ítems alcanzables (`enteros` en 10–90 en vez de
logits)— reescalando a mano y por orden relativo, no con datos de respuesta real. Este riesgo
(calibración estadística ausente) sigue sin mitigar; T-29 sigue abierta.
**Nota 2026-08-10 (T-44):** el filtro de respuestas no esforzadas ataca una fuente **distinta** de
sesgo de θ —las respuestas al azar, que antes entraban al cálculo como evidencia— y la mitiga desde
el primer estudiante, sin necesidad de calibrar. No toca este riesgo, que es sobre el parámetro `b`.
Al medir el histórico para T-59 se descubrió además que **solo el 9 % de las respuestas guarda
tiempo real**: la calibración de T-29, que usaría los mismos datos, hereda ese problema — conviene
verificar la cobertura de datos antes de darla por viable.

### R-18 · Spam en guestbook y contacto
**Descripción:** inserción pública sin captcha ni rate limit.
**Impacto:** Bajo. **Probabilidad:** Alta.
**Mitigación:** ya existe moderación tri-state (`is_approved` empieza en `null`), así que nada
llega a la landing sin aprobación. Añadir rate limit si el volumen molesta.
**Estado:** mitigado.

### R-19 · Estacionalidad PAES — 🔺 **AHORA ES EL RIESGO DOMINANTE (2026-08-09)**
**Descripción:** la demanda se concentra en los meses previos a la rendición (fin de año en Chile).
Un go-live tardío pierde la temporada completa.
**Impacto:** Medio-alto sobre los objetivos de captación. **Probabilidad:** Alta.
**Por qué sube de prioridad hoy:** cerrado T-04, **ya no hay ningún riesgo técnico que bloquee la
captación**. El proyecto está listo y la única variable que queda es el tiempo. Al 2026-08-09 restan
aproximadamente **12 semanas** de ventana útil antes de la rendición, y no hay una segunda
oportunidad en este ciclo: después viene el verano chileno (diciembre–febrero), sin demanda.
**Mitigación (T-01/T-02/T-04 ya cerradas):** lo que resta **no es trabajo de repositorio** — es
difundir. Aceptar deliberadamente deuda en F9 si el calendario aprieta, **excepto** en privacidad
(R-06, cuyo plazo legal del 1/12/2026 cae dentro de la ventana) y respaldo (R-03).

> **Reencuadre 2026-08-16 (D-51 / G-5).** La estacionalidad es una ventana estrecha **solo si se
> vende al estudiante en noviembre**. El canal institucional tiene su propio calendario: la compra
> de un colegio ocurre en **marzo**, con el año escolar y el presupuesto anual. Vendiendo ahí, R-19
> deja de ser un riesgo estructural y pasa a ser un **calendario comercial** — dos ventanas al año
> en vez de una, y la de marzo no compite con la temporada de clases del fundador.
>
> **Lo que no cambia:** la ventana B2C de 2026 sigue siendo la que es, y la excepción de F9 en
> privacidad y respaldo **se endurece** con el pivote (ver R-28: dejan de ser excepción y pasan a
> ser requisito contractual).
>
> **R-19 pasa a ser una manifestación de R-30**, que es el riesgo padre.
**Riesgo derivado, y es el que más cuesta ver:** con la plataforma lista, la vía de fuga natural es
seguir mejorando el producto en vez de buscar estudiantes — trabajo que se siente productivo y no
mueve la aguja. Está desarrollado como causa #1 del pre-mortem conversado el 2026-08-09.

**Precisión histórica (2026-08-13):** el proyecto lleva tres etapas —2010–2013 en Venezuela, 2025
convenio UNAP, 2026 MVP— y en ninguna llegó a estudiantes de forma sostenida
([[RAIZ_SISTEMA_LLOVIZNA]] §2.4). Hubo una difusión pública en 2011 con alcance aparente, pero **no
fue audiencia calificada**: la premisa de este riesgo se mantiene intacta.
**Advertencia que sí es accionable:** de aquella difusión salió la objeción de fondo al producto
—*"¿para qué medir, si el estudiante puede decir qué no entiende?"*—, ya respondida en el FAQ
([[BACKLOG]] T-75). Difundir sigue siendo lo que falta, pero difundir sin responder esa objeción es
difundir peor.
**Estado:** activo, **dominante**.

### R-20 · Grafo ciego a `.cljs`
**Descripción:** Graphify no indexa ClojureScript; el grafo cubre docs, SQL, JSON, HTML y el
`app.js` compilado. Un agente que confíe solo en el grafo concluirá que la lógica no existe.
**Impacto:** Bajo directo, Medio indirecto (decisiones mal informadas).
**Probabilidad:** Media (baja si el agente sigue [[../CLAUDE]] §13/[[AGENT_INSTRUCTIONS]] §2.5).
**Mitigación:** advertencia explícita en [[../CLAUDE]] §13, [[ARCHITECTURE]] §11 y
[[GRAPHIFY_INTEGRATION_GUIDE]] §6; T-32 (cerrada 2026-08-08) adoptó **`clj-kondo`** como sustituto
real para namespaces/vars/usos en CLJS — reduce el riesgo de "concluir que algo no existe" porque
ahora hay una herramienta que sí puede confirmar/descartar en CLJS, no solo la advertencia textual.
**Estado:** activo (mitigado con sustituto, no eliminado: sigue dependiendo de que el agente use
`clj-kondo` en vez de confiar solo en el grafo).

### R-21 · Deuda de ramas — ✅ **CERRADO 2026-08-09**
**Descripción:** la deuda había crecido de las 12 locales / 11 remotas originalmente medidas a
27 locales / 24 remotas, casi todas de tareas `t-NN-*` ya mergeadas y nunca borradas tras el PR.
**Impacto:** Medio (trabajo perdido, confusión sobre qué está en producción).
**Probabilidad:** Media.
**Mitigación aplicada:** T-19 (verificar qué hay en producción, hecha 2026-07-29) y T-18 (ordenar
ramas, hecha 2026-08-09) — se auditó cada rama con `git rev-list --count main..<rama>`, se
confirmó que solo dos tenían commits propios (ambas revisadas y descartadas por ser trabajo
superado, ver [[BACKLOG]] T-18), y se borraron todas (local y remoto) excepto `main`.
**Estado:** cerrado. Repositorio hoy: solo `main` en local y remoto.

### R-22 · Bundle sin code splitting
**Descripción:** un solo módulo (`:modules {:app …}`): el estudiante en móvil descarga también todo
el panel admin, y el artefacto versionado crece en cada commit inflando el repositorio.
**Impacto:** Bajo. **Probabilidad:** Media.
**Mitigación:** aceptado por ahora; revisar si el bundle o el peso del repo se vuelven un problema
medible.
**Estado:** aceptado.

### R-23 · Contenido experimental de cuántica visible para un estudiante de PAES
**Descripción:** las migraciones `033`–`040` ([[../adr/ADR-018-track-experimental-cuantica]]) cargan
15 bancos de Mecánica Cuántica en la **misma base de producción**. Lo único que impide que un
estudiante de PAES M1 los vea en su selector de evaluaciones es `test_configs.active = false`,
combinado con la policy `test_configs_select` de `020` (`active = true or is_admin()`). **No hay
segunda barrera:** `questions` no tiene columna `published`, y `next_question` es `security definer`,
así que sirve cualquier topic que se le pida.
**Impacto:** Medio — no hay fuga de datos personales ni de seguridad; el daño es de producto:
un estudiante que viene a preparar la PAES ve "Momento angular ★" en su lista y el sitio pierde
credibilidad justo donde la necesita.
**Probabilidad:** Baja — requiere que alguien ponga `active = true` a mano en el panel de admin o en
SQL. No hay ningún camino automático que lo haga.
**Mitigación:** aviso en bloque al principio de `040_cuantica_test_configs.sql` explicando la
consecuencia exacta; prefijo `mq_` reconocible a simple vista en el panel; procedimiento de
reversión completo escrito y probado en el mismo archivo. Consulta de control:
`select count(*) from public.test_configs where topic like 'mq\_%' and active;` debe dar **0**.
**Estado:** aceptado y monitoreado. Se cierra si el experimento se revierte después del examen.

### R-24 · El eje de fluidez etiqueta al estudiante con umbrales que nadie midió
**Descripción:** desde el 2026-08-12 «Mi plan» le dice al estudiante en qué cuadrante θ × λ está y
qué debería hacer al respecto ("práctica de fluidez, NO más teoría"). Los cortes que producen esa
etiqueta —`t_rel` ≤ 3 fluida, ≤ 6 media— **los eligió el autor, no los datos**
([[../adr/ADR-019-eje-de-fluidez-en-vez-de-estilos-de-aprendizaje]]). Es la misma situación exacta
de `min_response_seconds = 3` en `028`, que `032` tuvo que bajar a 2 al medir contra el histórico.
El primer dato real ya apunta en esa dirección: en un banco conceptual, una mediana de **2,19** cayó
del lado `:fluida` y probablemente no debería ([[BACKLOG]] T-65).
**Impacto:** Medio — no es un fallo técnico ni una fuga: es una recomendación equivocada presentada
con la autoridad de una medición. Decirle "ya lo tenés automatizado, subí la dificultad" a alguien
que en realidad está reconociendo alternativas es peor que no decirle nada.
**Probabilidad:** Media — depende del banco: los cortes se pensaron con ítems tipo PAES (cortos,
mecánicos) y se aplican también a bancos conceptuales.
**Mitigación:** (1) los umbrales son **configurables por banco** desde `041` —aplicada y verificada
contra la base el 2026-08-13, check incluido—, así que corregirlos no exige tocar código ni puede
dejar bandas invertidas; (2) `fluency/min-responses = 4` evita etiquetar con muestras diminutas —bajo ese
mínimo la tarjeta dice explícitamente que no alcanza, en vez de inventar una banda; (3)
`fluency/calibration-report` produce los deciles con los que reemplazar el 3/6 por cortes medidos;
(4) el eje **no toca θ**: si el número está mal, la etiqueta está mal, no el diagnóstico.
**Estado:** activo. Se cierra cuando T-65 reemplace los umbrales autorales por medidos.

### R-26 · Datos personales del owner en documentos históricos de un repositorio público
**Descripción:** el 2026-08-13 se añadieron `docs/tesis.md` y `docs/sistema_llovizna.md` como fuentes
primarias del origen del proyecto ([[RAIZ_SISTEMA_LLOVIZNA]], [[../adr/ADR-024-raiz-en-la-tesis-2010]]).
Ambos contienen datos personales identificables del owner:

| Dato | Dónde |
|---|---|
| Cédula de identidad venezolana | `docs/sistema_llovizna.md:17` · `docs/tesis.md:21` y `:92` · **certificado del congreso 2013 (PDF), impresa en el cuerpo del documento** |
| Teléfono personal | `docs/sistema_llovizna.md:19` |
| Fecha de nacimiento | `docs/sistema_llovizna.md:23` |
| Estado civil | `docs/sistema_llovizna.md:25` |

Este repositorio es **público y así se decidió a conciencia** (D-42). El proyecto **ya tiene la regla
opuesta para datos personales**: en Q-01 se dejó explícitamente fuera el detalle del convenio UNAP
—folio, montos, datos personales— *"por ser un repositorio público"*. Añadir estos archivos sin
redactar contradice ese precedente. Nótese que en `sistema_llovizna.md` el propio owner **ya redactó**
dirección, parroquia y municipio (`xxxxx`) pero no la cédula, el teléfono ni la fecha de nacimiento.

**Impacto:** Alto. Cédula + fecha de nacimiento + teléfono es material suficiente para suplantación
de identidad, y una cédula venezolana no caduca ni se puede rotar como una contraseña.
**Probabilidad:** Alta **si se commitea**; hoy los dos archivos están **sin trackear** (`git status`
los muestra como `??`), así que la exposición todavía **no ocurrió**.
**Agravante estructural:** commitear y luego borrar **no basta** — quedaría en el historial, y este
repositorio ya tiene registrado que despublicar exige reescribir el historial (D-42, sobre los 51
commits que tocan `project-memory/`). La ventana para arreglarlo barato es **antes del primer commit**.
**Mitigación aplicada (2026-08-13, decisión del owner):** se **redactaron los seis campos con
`xxxxx`** —el mismo estilo que el owner ya había usado para dirección/parroquia/municipio— **antes
del primer commit**, en `docs/sistema_llovizna.md` (cédula, teléfono, fecha de nacimiento, estado
civil) y `docs/tesis.md` (cédula en portada y en el acta de aprobación). Se descartó no versionar los
originales: la trazabilidad a la fuente primaria es lo que ADR-024 buscaba, y el valor documental no
depende de la cédula. Verificado con un `grep` de los valores concretos sobre `docs/`, `project-memory/`, `adr/` y
`sessions/` → **0 coincidencias**. (Los valores no se transcriben aquí: escribir el número dentro del
comando de verificación lo reintroduce en el repositorio, que es justo lo que este riesgo evita.)
**Caso aparte, mismo día — el certificado del congreso de 2013:** lleva la cédula impresa a la vez en
la capa de texto y en la imagen del PDF, así que **no es redactable de forma limpia**. Se resolvió
**no versionarlo**: los datos que importan (evento, título de la ponencia, fecha, firmantes) están
en [[RAIZ_SISTEMA_LLOVIZNA]] §2.1 y el original queda con el owner. Es el mismo criterio de Q-01.
**Estado:** ✅ **cerrado 2026-08-13**. Como los archivos nunca se commitearon con los datos, **no
quedó nada en el historial** y no hace falta reescribirlo. **Regla que deja para el futuro:** todo
documento histórico que entre a `docs/` se revisa por datos personales **antes** del primer `git
add`, no después; y si no se puede redactar limpiamente, **se registra el dato en la memoria y no se
versiona el archivo**.
**Relacionado:** [[../adr/ADR-024-raiz-en-la-tesis-2010]], [[OPEN_QUESTIONS]] Q-01, D-42, R-06.

### R-25 · Un cambio visual amplio llegó a `main` sin que nadie lo viera
**Descripción:** el 2026-08-13 se cambió el color de marca de toda la app
([[../adr/ADR-020-identidad-visual-por-tokens]]) redefiniendo la escala `indigo`, más las superficies
del tema oscuro y el fondo de página. **Ninguna pantalla se revisó con ojos.** Lo verificado es real
pero indirecto: el bundle compila con 0 warnings, 83 tests pasan, los dos audits dan verde y el CSS
compilado tiene los valores esperados. Nada de eso ve un botón mal contrastado sobre un fondo que no
se previó, ni un texto que quedó encima de otro.

El agravante es de calendario: el sitio recibe tráfico y la ventana de captación de la PAES es
justo ahora (R-19). Una regresión visual en la landing cuesta más esta semana que en marzo.

**Impacto:** Medio — no hay pérdida de datos ni riesgo de seguridad; el daño es de producto y
reversible con un `git revert`, pero puede costar visitantes mientras dure.
**Probabilidad:** Media — el enfoque por tokens es global y consistente, que juega a favor; en
contra, cambió el color de **todo** de una vez.
**Mitigación:** (1) T-67 abierta con el recorrido concreto por las seis secciones en ambos temas;
(2) el cambio vive en una rama, no en `main`, hasta que el owner lo apruebe; (3) los valores están
en un solo archivo, así que corregir un tono es un commit de una línea; (4) `audit_contraste.py`
descarta al menos la clase de fallo más común, el contraste insuficiente.
**Estado:** ✅ **mitigado el 2026-08-13.** El owner verificó en local a lo largo de la sesión y en
su teléfono al cierre. La mitigación real no fue el recorrido sino el **uso**: cinco rondas de
reporte encontraron cinco fallas que los tres audits daban por buenas —incluida una que aprobaba
AA y aun así no se leía—. Queda como riesgo residual bajo, no cerrado del todo, porque `cupos`,
`cuenta` y la línea del tiempo con historial real siguen sin mirarse (ver T-67).

---

### R-30 · Cuarta repetición del patrón histórico — 🔺 **EL RIESGO DOMINANTE (2026-08-16)**

**Qué puede pasar.** Que el pivote a B2B ([[../adr/ADR-025-motor-de-valor-b2b-y-cinco-vectores]])
se convierta en más construcción de producto —panel docente, multi-tenant, clases grabadas— y que
al final del ciclo el proyecto tenga otra vez un producto mejor y **cero clientes**.

**Por qué es alto y por qué no es paranoia.** Está documentado en la propia memoria: van **tres
intentos** de llevar esta idea a escala (2012–13 Estado venezolano, 2012 equipo, 2025 convenio UNAP)
y los tres murieron en el mismo punto. *"Lo que nunca se logró, en ninguna etapa, es llegar a los
estudiantes de forma sostenida"* ([[BUSINESS_CONTEXT]] §1, [[RAIZ_SISTEMA_LLOVIZNA]]). El proyecto
nunca tuvo un problema de idea ni de capacidad técnica. Tuvo siempre el mismo: distribución.

**Es el riesgo padre de R-19 y R-01**, y los subsume: la estacionalidad y el bus factor son las dos
formas concretas en que se manifiesta.

**Mitigación decidida (D-51 / G-5).**

- **G-5 es precondición dura, no fase posterior.** F10 va en paralelo con F12, antes de F13.
- **Ninguna meta comercial es afirmable sin CAC y LTV medidos** (M-10, M-11).
- **Regla de gasto de tiempo:** por cada bloque de trabajo de producto del track F12–F15 debe haber
  trabajo equivalente de distribución. Si el `git log` de un mes muestra solo código, el riesgo se
  está materializando.
- **Señal de alarma explícita:** doce meses desde el primer piloto sin contrato pagado dispara la
  revisión de ADR-025 (§Seguimiento).

**Lo que NO lo mitiga:** mejorar el producto. Es exactamente lo que se hizo las tres veces
anteriores.

---

### R-27 · El ciclo de venta institucional es más largo que la caja

**Qué puede pasar.** Un colegio decide en meses, con más de un decisor (profesor → UTP →
sostenedor) y con presupuesto anual. Si los primeros ingresos llegan más tarde de lo que el
fundador puede sostener sin ingreso, el pivote se abandona a mitad de camino — con el costo
adicional de haber apagado el foco en la línea que sí generaba algo (las clases por hora).

**Agravante propio de este proyecto:** el fundador es hoy la única persona que puede vender, y cada
hora de venta es una hora que no se dedica a calibrar ni a programar. **El pivote agrava R-01 antes
de aliviarlo.**

**Mitigación.**

- Escalera de ingresos por año con metas modestas al principio ([[TESIS_DE_CRECIMIENTO]] §3): el
  año 1 no busca facturar, busca **un piloto y un CAC medido**.
- **Las clases a $10.000/hora no se apagan** (D-32 sigue vigente como línea premium): son el puente
  de caja mientras el B2B madura.
- Piloto gratuito acotado como acelerador del ciclo: entrega el mapa de errores del curso en una
  hora de clase, que es el momento en que el colegio entiende qué compra.
- Capital externo (F16) explícitamente como puente, no como premio.

---

### R-28 · Datos de menores a escala institucional bajo Ley 21.719

**Qué puede pasar.** Hoy los estudiantes llegan voluntariamente y la recolección es mínima
(email, IP, ciudad, batería — ver R-06). **Un colegio que sube su matrícula cambia el régimen por
completo:** datos de menores en volumen, cargados por un tercero, bajo un contrato, con la Ley
21.719 en **plena vigencia desde el 2026-12-01**. Un incidente ahí no es un bug: es el fin del
canal B2B y probablemente del proyecto.

**Por qué sube ahora y no antes.** R-06 ya estaba activo, pero con usuarios individuales. El pivote
lo multiplica y le agrega responsabilidad contractual.

**Mitigación — [[ROADMAP]] F9 deja de ser opcional (decidido 2026-08-16).** Antes del primer
contrato institucional:

- **T-07** respaldo de base de datos documentado y probado.
- **T-09** proyecto Supabase de staging (deja de desarrollarse contra producción — R-02).
- **T-11** verificación automatizada de policies RLS.
- Aislamiento multi-tenant por establecimiento, verificado, **sobre policies** (no sobre UI).
- Revisión del aviso de privacidad para el caso institucional (hoy escrito para el estudiante
  individual, D-20), incluyendo quién es responsable y quién encargado del tratamiento.

**Nota honesta:** D-20 aceptó revisar el aviso de privacidad sin abogado "dado el tamaño del
proyecto". Ese argumento **caduca con el primer contrato institucional**.

---

### R-29 · Vender B2B con el banco sin calibrar

**Qué puede pasar.** Que la primera reunión con un jefe de UTP con formación en evaluación —o la
primera due diligence técnica de un fondo— pregunte *"¿cómo estimaron la dificultad de estos
ítems?"* y la respuesta honesta sea *"a ojo"*. Eso no destruye una venta: destruye **B-07**, la
credibilidad del método, que es el único activo que quedó después de D-18.

**Relación con R-17.** R-17 describe el problema técnico (θ sesgada por `difficulty` no calibrada).
R-29 describe su consecuencia comercial, que es mayor: el error de estimación se puede corregir; una
reputación de rigor perdida en el circuito escolar de una región, no.

**Mitigación.** G-2 (F12) es **precondición dura** de G-1 (F13): no se vende antes de tener el
reporte de calibración. Y cuando se venda, el reporte se entrega **con sus limitaciones
declaradas** — un banco calibrado con 252 diagnósticos es honesto llamándolo así, no "validado".

---

### R-31 · El funnel está diseñado para el canal que nunca produjo un usuario

**No es una probabilidad: ya ocurrió.** Por eso entra como *confirmada* y no como *alta*.

**Descripción.** Todo el aparato de captación —landing, SEO, JSON-LD, sitemap, registro con
email+contraseña, cupos con `min_enrollments`— sirve al **estudiante solitario que llega por
Google**. Ese estudiante no ha existido. Los únicos 252 diagnósticos reales del proyecto vinieron
de una **institución poniendo el producto frente a una audiencia cautiva** (piloto UNAP, oct–nov
2025). El canal que sí funcionó **no tiene funnel**.

**Impacto:** Alto. Significa que (a) la inversión de captación B2C hecha hasta hoy no produce
retorno esperable, y (b) **G-1 no tiene producto de entrada**: no existe el flujo por el cual un
curso completo entra al sistema en una hora de clase, que es exactamente lo que se le va a vender
a un colegio.

**Agravantes de diseño, medibles:**

- Se pide **crear cuenta antes de entregar cualquier valor** (y `sign-in-with-google` existe en el
  código pero no está conectado a ningún botón — [[PROJECT_BRIEF]] §5).
- **20 minutos sin calculadora** consumen una hora de clase completa, sin espacio para que el
  profesor use el resultado en la misma sesión.
- La **recompensa por el esfuerzo es un inventario de déficits** del propio estudiante, seguido a
  veces de una pantalla de cupos vacía.

**Mitigación decidida.** Rediseñar el funnel para el aula (**T-91**): entrada por código de curso
sin cuenta, diagnóstico de 8–10 min, pantalla del estudiante corta y no punitiva, y **la pantalla
de recompensa proyectada es la del profesor**, en vivo. Ese instante —el mapa de errores del curso
apareciendo frente al profesor— es el producto que se vende, y hoy no existe.

**Antes de construir nada: T-90.** Aplicarlo en un curso real y observar. Cuesta cero pesos y una
hora, y valida o refuta este riesgo entero con evidencia en vez de con argumento.

**Restricción técnica conocida:** la entrada sin cuenta choca con "RLS es el único límite de
autorización" ([[../CLAUDE]] §7). Es resoluble (sesión anónima o token de curso) pero es diseño
real, no un detalle de implementación. Ver [[OPEN_QUESTIONS]] Q-37.

**Relación con R-30:** R-31 es la forma concreta que toma R-30 en el producto. R-30 dice "construye
producto en vez de distribución"; R-31 nombra el producto exacto que se construyó de más y el que
falta.

---

### R-32 · Propiedad intelectual y conflicto de interés con los empleadores

**Contexto nuevo del 2026-08-16.** El owner reveló que tiene **tres canales de distribución
disponibles**, y dos de ellos son sus empleadores: es **profesor de electrónica en un liceo** (donde
una profesora de matemática ya le ofreció probar con su 4º medio) y **trabaja en una sede de
Cpech**, con relación con la dirección y habiéndoles ya mencionado que construye software.

**Es la mejor noticia del proyecto y su riesgo peor calibrado a la vez.**

**Qué puede pasar — Cpech (impacto muy alto):** muchos contratos de trabajo incluyen cláusulas de
cesión de propiedad intelectual o de invenciones. Si el owner demuestra el producto a la dirección
**como empleado**, y existe una cláusula así, se abre una discusión sobre quién es dueño de
**dieciséis años de trabajo**. Es el único riesgo del registro capaz de terminar con el proyecto en
una sola reunión.

**Agravante de asimetría:** Cpech es el preuniversitario más grande de Chile; el owner es una
persona sin sociedad constituida, sin contrato tipo y sin asesoría legal. Un "piloto" con un actor
de ese tamaño puede terminar en *"nos gustó la idea, gracias"* y una versión interna. **La única
protección real es el activo defendible — el banco calibrado (G-2) — que todavía no está
calibrado.** Es exactamente por qué G-2 es precondición dura de G-1.

**Qué puede pasar — liceo (impacto alto, reputacional):** aplicar software comercial propio a
**menores de edad en el lugar de trabajo**, con autorización de una colega y no de la institución.
Un apoderado que pregunte *"¿por qué el profesor de electrónica puso los datos de mi hijo en su
startup?"* cuesta el canal y puede complicar el empleo. La Ley 21.719 entra en plena vigencia el
**2026-12-01**, dentro de la ventana.

**Mitigación — barata, y hay que hacerla antes que nada:**

1. **Leer el contrato de Cpech antes de cualquier demo formal.** Media hora. Es **bloqueante** de
   T-93. La transparencia previa ayuda (ya les mencionó que construye software), pero mencionar no
   es exponer el producto en una reunión.
2. **Que la dirección o UTP del liceo sepa del piloto**, aunque sea informal. Convierte "el profe
   hizo algo por su cuenta" en "el liceo dejó probar una herramienta". Misma actividad, otro
   encuadre, y lo cubre.
3. **T-90 como observación, no como despliegue de datos.** El objetivo son tres observaciones, no
   acumular diagnósticos de menores de su propio liceo.
4. **Algo por escrito antes de cualquier piloto con Cpech**, aunque sea un correo de una página con
   alcance, propiedad y qué pasa después.

**Estado:** abierto, y **es la precondición de los tres canales**. Ver [[OPEN_QUESTIONS]] Q-38,
[[BACKLOG]] T-93, [[LESSONS_LEARNED]] L-39.

---

## Riesgos cerrados o superados

| ID | Riesgo | Cómo se cerró |
|----|--------|---------------|
| — | Panel admin no podía promover usuarios (UPDATE afectaba 0 filas) | Migración `006_admin_role_management.sql` + aviso explícito en la UI |
| — | El sistema podía quedarse sin ningún admin | Trigger `profiles_protect_last_admin` (`006`) |
| — | Editor de preguntas roto en el panel | Restaurado en `48bf525` + policies de `007` |
| — | Lista de cupos vacía por filtro incorrecto | `slots.logic/filter-slots-for-band` + tests (`6cf0dc9`) |
| — | Doble producto (MathAcademy + funnel) confundía el foco | Archivado ([[../adr/ADR-008-archivar-mathacademy]]) |
| — | Runtime de shadow-cljs versionado inflaba el repo | `.gitignore` de `public/js/cljs-runtime/` (`3680cb4`) |
| — | Conocimiento del proyecto atado a chats de IA | Adopción de PMF (2026-07-26) |

---

Relacionado: [[CURRENT_STATUS]] · [[BACKLOG]] · [[ARCHITECTURE]] · [[OPEN_QUESTIONS]] ·
[[ASSUMPTIONS]] · [[LESSONS_LEARNED]]


---

### ✅ Actualización 2026-08-17 — T-93 ejecutada: el contrato de Cpech leído

**El escenario que hacía de R-32 el peor riesgo del registro no existe.** El contrato **no tiene
ninguna cláusula de cesión de propiedad intelectual ni de invenciones**: la única cláusula de PI
protege el material que la empresa entrega al docente, no lo que el docente crea. Tampoco hay
cláusula de exclusividad. Se suman dos refuerzos independientes: la función contratada es
**docente**, no desarrollo de software (relevante para el art. 8 de la Ley 17.336, que solo alcanza
al software hecho *en el desempeño de las funciones laborales*), y **el primer commit del repo es
diez meses anterior al inicio del contrato**, con fechas verificables por terceros en un historial
público. **La titularidad del proyecto no está en discusión.**

**Lo que sí apareció, y no estaba previsto: el canal Cpech está cerrado por contrato.** Hay
cláusulas explícitas de **no derivación de alumnos a servicios de preuniversitario ajenos**
—redactadas como causal justificada de despido y vigentes **dentro y fuera de la jornada**—, de
prohibición de **crear grupos de estudio con sistemas no autorizados** (que es literalmente la
función de cupos) y de **no usar material propio en clases**. Ninguna se resuelve con un deslinde
por escrito.

**Consecuencias operativas:**

- **El canal Cpech no se usa hasta que termine el contrato**, que es de plazo fijo y vence el
  **2026-11-21**. Después no hay restricción. → [[BACKLOG]] T-87 y T-93.
- **El canal del liceo sigue abierto:** las prohibiciones son sobre los alumnos de Cpech. Pero
  **el contrato del liceo es otro y no se ha leído** — esa parte de T-93 sigue pendiente.
- El agravante de asimetría descrito arriba (Cpech como actor grande frente a una persona sin
  sociedad) **no desaparece**: sigue siendo un argumento para no ir a Cpech antes de G-2, ahora
  reforzado por una razón contractual.

> **El detalle vive fuera del repositorio, a decisión del owner.** El contrato contiene datos
> personales suyos y de terceros y este repo es público (D-42, mismo criterio que R-26). Si una
> sesión futura necesita el texto, se lo pide al owner: **no está acá y no debe agregarse.**

---

### R-33 · La pantalla de Google nombra a `supabase.co`, no a la marca

**Abierto 2026-08-17, al verificar T-92 en producción.** Probabilidad **confirmada**: se vio en
vivo, no es una hipótesis.

Al pulsar "Continuar con Google", el selector de cuenta de Google dice:

> Selecciona una cuenta · **Ir a jmnqklhxcdccvdhuuiji.supabase.co**

No dice "Academia Integral". Google muestra el dominio del `redirect_uri`, que es el de Supabase
—`https://jmnqklhxcdccvdhuuiji.supabase.co/auth/v1/callback`— y no el del sitio. Es el
comportamiento normal de Supabase Auth sin dominio propio, no un error de configuración.

**Por qué no es cosmético.** El público es **estudiantes menores de edad y sus apoderados**, y la
acción que se les pide es entregar su cuenta de Google. Una cadena de 24 caracteres aleatorios
seguida de `.supabase.co` es exactamente la forma que tiene el phishing que a esos mismos
apoderados les enseñan a evitar. El costo no se paga en un error visible sino en **abandonos
silenciosos** en el peor punto del embudo: el registro (T-20). Toca **G-5**.

**Mitigación conocida, y es de negocio, no técnica:** Supabase ofrece **custom domain** (por
ejemplo `auth.jacobocordova.com`) como **add-on de pago**, del orden de **USD 10/mes** — cifra a
verificar antes de citarla, y por lo tanto un supuesto, no un hecho. Eso rompería el "costo de
infraestructura ≈ 0" que es objetivo de producto n.º 4 en `CLAUDE.md`, así que **no se contrata por
iniciativa de un agente**: la decide el owner.

**Criterio para decidirlo con datos en vez de con intuición:** no vale la pena pagarlo hasta que
T-91/G-5 midan el funnel. Si el registro por Google convierte sensiblemente peor que el registro
por correo, esto deja de ser estética y pasa a ser el cuello de botella medido; si no, se queda
como está. **No tocar antes de tener ese número.**

---

### R-34 · El escape se usa como salida fácil y degrada la medición del banco

**Abierto 2026-08-18** con [[../adr/ADR-029-escape-como-tercera-categoria-de-respuesta]] (D-57). El
diagnóstico ahora tiene dos botones de «no sé». Eso resuelve el problema de adivinar y **abre uno
nuevo**: un botón que evita pensar es, para algunos estudiantes, el camino de menor esfuerzo.

**Dos formas distintas de que salga mal, y no se mitigan igual:**

1. **Contra el estudiante — escape estratégico.** Cinco «no sé» seguidos podrían aterrizarlo en una
   banda por debajo de su nivel, y θ manda banda → cupo → plan. **Hoy esto está estructuralmente
   mitigado y no por vigilancia:** el escape entra con `:weight 0.0`, así que **no mueve θ**. El
   daño posible es quedarse sin diagnóstico útil, no bajar de banda. Si alguna vez se decide darle
   peso positivo al escape (la alternativa que ADR-029 dejó abierta para cuando haya datos), **este
   riesgo se reactiva con severidad alta** y necesita la guarda de confianza antes, no después.

2. **Contra el banco — dilución de la evidencia.** Un test con muchos escapes tiene poca información
   de Fisher, así que administra más ítems y termina por `:max-items` con un SE alto. Eso está
   correcto —el SE no miente— pero significa que si el escape se vuelve el comportamiento
   mayoritario, el diagnóstico produce perfiles con mucha incertidumbre y la calibración del banco
   (G-2, T-76/T-77) recibe menos respuestas útiles por test rendido. Toca directamente la
   precondición dura del plan de negocio.

**Mitigación en el diseño, ya aplicada:** jerarquía visual secundaria (el escape es texto, no un
control con relleno de señal) y **sin diálogo de confirmación** — poner fricción ahí castigaría la
honestidad, que es la conducta que se quiere premiar. `escape/escape-rate` y `escape/escape-counts`
quedan guardados en el perfil.

**Lo que falta y por qué no se hizo ahora:** la guarda de confianza —«si la tasa de escape pasa X,
no parar por SE y marcar el perfil como provisional»— necesita el valor de X, y **X sale de observar
un curso real (T-90), no del criterio del autor**. Fijarlo hoy sería repetir exactamente el error de
T-59 (`min_response_seconds` en 3 s, que los datos bajaron a 2 s) y el de T-65 (los cortes de
fluidez, todavía sin calibrar). Ver [[OPEN_QUESTIONS]] Q-39.

**Señal de que se está materializando:** en T-90, una tasa de escape del curso muy por encima de lo
esperable, o concentrada en `:enunciado` sobre ítems que el profesor considera claros —eso último
apuntaría a que el botón se está usando como «siguiente» y no como declaración.

**Lo que sí es gratis y conviene revisar:** que el nombre de la app en Google Cloud sea
`Academia Integral` (no `academia`) y que el logo esté cargado, porque la pantalla de
**consentimiento** —la siguiente, después de elegir cuenta— sí muestra el nombre de la app. Eso
recupera parte de la confianza sin costo. **Sin verificar todavía:** el agente se detuvo en el
selector de cuenta a propósito, sin completar un login real.

### R-37 · Las corridas de depuración del admin ensucian la calibración del banco

**Abierto 2026-08-23**, al implementar el editor en vivo del diagnóstico
([[../adr/ADR-032-capa-cero-al-lado-y-editor-en-vivo]]). **Severidad: alta** — no por lo que rompe
hoy, sino por lo que rompe justo cuando importe.

**El hecho:** depurar un ítem ahora significa rendir el diagnóstico, corregir y **volver a servir el
mismo ítem** las veces que haga falta. Cada una de esas corridas termina en una fila de `tests`
idéntica en forma a la de un estudiante real: mismo `user_id` (el del owner), mismo `topic`, mismo
JSON de respuestas. No hay columna que diga «esto era el autor probando».

**Por qué importa:** G-2 —calibrar `difficulty` con respuestas reales y publicar el reporte técnico—
es la precondición de todo el plan de negocio ([[TESIS_DE_CRECIMIENTO]]). Un banco calibrado con
respuestas del propio autor, que **conoce la clave**, no está calibrado: está sesgado hacia la
facilidad, y peor, sesgado exactamente en los ítems que más se depuraron, que son los que más
atención necesitaban. Es contaminación correlacionada con la variable de interés, que es la peor
clase.

**Lo que hace falta antes de calibrar (T-110):** una columna `tests.origin`
(`'student' | 'admin_preview'`) escrita en `:test/complete`, o como mínimo una exclusión explícita
por `user_id` en el proceso de calibración, escrita y versionada — no recordada.

- **Severidad:** 🔴 alta a partir del día que G-2 arranque; ⚪ nula hasta entonces.
- **Relacionado:** T-110, ADR-032, G-2 en [[TESIS_DE_CRECIMIENTO]], R-17 (`difficulty` sin calibrar).

### R-38 · La parada por precisión del diagnóstico nunca se dispara

**Abierto 2026-08-23**, evaluando el motor IRT contra
[[../adr/ADR-004-irt-1pl-map-y-regla-de-parada]]. **Severidad: media.** No hay que medirlo con
datos: es aritmética.

**El hecho:** en 1PL la información de un ítem es máxima cuando `b = θ`, y ahí vale `0.25`. Con
`max_items = 12` (el valor de todos los bancos, migración `020` y `040`):

```
I(θ) ≤ 12 × 0.25 = 3.0   →   SE(θ) = 1/√I ≥ 0.577
```

El umbral configurado es `se_threshold = 0.35`, que exige `I ≈ 8.16`, es decir **~33 ítems**. Con
escapes (peso 0.0, ADR-029) y respuestas descartadas por esfuerzo (ADR-014), peor todavía. La rama
`:precision` de `progress/stop-reason` es, hoy, **código inalcanzable**: todo diagnóstico termina por
`:max-items` o por `:exhausted`.

**Las dos consecuencias, y la segunda es la cara:**

1. El test no es adaptativo *en longitud*. Es un test de 12 preguntas fijas con selección adaptativa
   —que es una cosa buena, pero no es lo que dice el ADR ni lo que se puede prometer.
2. **Hay copy y un argumento de venta apoyados en esto** («estimación precisa con menos preguntas»,
   ADR-004 §Consecuencias). Afirmar precisión con `SE ≥ 0.577` no es defendible ante un colegio que
   pregunte, y G-1 se vende a colegios.

**Salidas posibles, ninguna elegida todavía (T-111):** subir `se_threshold` a un valor alcanzable
(~0.55–0.60, donde sí distingue un patrón consistente de uno ambiguo); subir `max_items`, que
alarga el test; o dejar la regla como está y corregir lo que se promete. Son decisiones de producto,
no de código.

- **Severidad:** 🔶 media hoy, **alta** cuando la afirmación psicométrica entre a un pitch (G-1).
- **Relacionado:** T-111, X-10, ADR-004, R-17, G-2 en [[TESIS_DE_CRECIMIENTO]].

### R-36 · Una sección sin fondo propio hereda el de la página, y ningún auditor lo ve

**Abierto 2026-08-23**, midiendo el contraste real del CV (`/profesor`) nodo por nodo sobre el DOM
renderizado. **Severidad: media.**

**El hecho:** `experiencia`, `habilidades` y `reconocimientos` no declaraban `bg-*`. Eran
transparentes y caían sobre `bg-panel-300`, que no es la hoja blanca para la que se escribió ese
componente. Resultado medido: **52 textos por debajo de AA en tema claro y 12 en oscuro**, con el
peor caso en **1.22** (la fecha de cada puesto). Corregido en ADR-031 con superficie `bg-white`
explícita y cuatro tokens subidos a `-600`; el CV quedó en **0 y 0**.

**Por qué sigue siendo un riesgo abierto aunque el CV esté arreglado:** el defecto **es anterior** a
la retícula —`bg-panel-300` ya estaba ahí— y estuvo vivo sin que nadie lo notara, con los cuatro
auditores en verde. `audit_contraste.py` verifica **pares de la paleta declarados a mano**: no
inspecciona el DOM ni sabe componer capas. Su propia cabecera lo dice («Solo los pares de la paleta
de marca, escritos a mano abajo»). O sea:

> Hoy la garantía de que no hay otro `/profesor` escondido es **que nadie lo ha medido**, no que esté
> verificado.

**Mitigación**

| Qué | Estado |
|---|---|
| Regla escrita: toda sección declara su propio fondo | ✅ ADR-031 §Decisión 5 |
| CV corregido y medido en 0/0 | ✅ 2026-08-23 |
| Auditor automático sobre el DOM renderizado | ⬜ [[BACKLOG]] T-107 |
| Barrido manual del resto de las secciones | ⬜ incluido en T-107 |

**Relacionado:** [[../adr/ADR-031-fondo-como-plano-de-medida]], [[LESSONS_LEARNED]] L-47,
[[BACKLOG]] T-107, `scripts/audit_contraste.py`.

### R-35 · La respuesta correcta está en la letra A en 293 de los 306 ítems

**Abierto 2026-08-19**, revisando las claves de los cuatro bancos activos (T-105). No es una
sospecha: es un conteo.

| Banco | Ítems | Clave en A | En D |
|---|---|---|---|
| `numbers_v1` | 178 | **178 (100 %)** | 0 |
| `paes_m1` | 44 | **44 (100 %)** | 0 |
| `polinomios` | 20 | **20 (100 %)** | 0 |
| `diagnostico` | 64 | 51 (80 %) | **0** |
| **total** | **306** | **293 (96 %)** | **0** |

Los bancos se generaron escribiendo la alternativa correcta primero y nunca se barajaron.

**Por qué importa.** La UI ya rotaba las opciones con `shift = id mod 4`, así que la posición
*visible* estaba bien repartida (79/78/74/75 sobre los cuatro lugares) y a simple vista no se nota
nada. Pero una rotación cíclica sobre una clave constante no aleatoriza: la posición mostrada de la
correcta es exactamente `4 − (id mod 4)`, una fórmula pública. Quien la note acierta el 100 % **sin
leer un solo enunciado**, y θ deja de medir habilidad.

Esto no es un problema de UI: θ es el activo que G-2 quiere calibrar y G-1 quiere vender. Un banco
que se puede responder por posición produce datos de calibración envenenados.

**Mitigado en el cliente** (2026-08-19, [[../adr/ADR-030-barajar-las-alternativas]]): `universo.opciones`
reemplazó la rotación por una permutación Fisher-Yates sembrada por el id. Verificado sobre los 306
ítems reales: aparecen las 24 permutaciones y la correcta cae 72/80/81/73 en las cuatro posiciones.

**Lo que la mitigación NO arregla, y por eso el riesgo sigue abierto:** el dato en `questions` sigue
sesgado. El cliente es inspeccionable —semilla y algoritmo viajan en el bundle—, así que subir el
costo de explotarlo no es lo mismo que eliminarlo; y cualquier otro consumidor del banco (una
exportación, el panel docente de la licencia institucional, el propio proceso de calibración) lo ve
con el sesgo intacto. **La corrección de raíz es permutar las alternativas en la base**, moviendo
con ellas `error_*` y `misconception_*_id`, que es un cambio de datos sobre 293 filas y necesita
decisión del owner — no se hizo por eso.

- **Severidad:** 🔶 media hoy (mitigado en el único consumidor que existe), **alta** en cuanto el
  banco salga de la SPA hacia un tercero.
- **Relacionado:** T-105, T-106, ADR-030, G-2 en [[TESIS_DE_CRECIMIENTO]].
