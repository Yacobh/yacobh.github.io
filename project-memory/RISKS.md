# RISKS

Última actualización: **2026-08-13** (R-25 nuevo, cambio visual sin verificar en vivo) ·
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
| R-25 | Cambio visual amplio sin verificación en vivo, sobre un sitio con tráfico | Medio | Media | Media | activo (2026-08-13) |

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
**Riesgo derivado, y es el que más cuesta ver:** con la plataforma lista, la vía de fuga natural es
seguir mejorando el producto en vez de buscar estudiantes — trabajo que se siente productivo y no
mueve la aguja. Está desarrollado como causa #1 del pre-mortem conversado el 2026-08-09.
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
**Estado:** activo. Se cierra con T-67 (y de paso T-38, que arrastra la misma deuda desde ADR-012).

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
