# RISKS

Última actualización: **2026-07-28**

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
| R-10 | "Mi plan" vacío por falta de contenido publicado | Alto | Alta | **Alta** | activo |
| R-13 | Bundle publicado desalineado del fuente | Medio | Alta | Media-alta | activo |
| R-05 | Divergencia entre los tres lugares del copy/JSON-LD | Medio | Media | Media | activo |
| R-07 | Monolitos (`admin.cljs`, `crud.cljs`) | Medio | Media | Media | activo |
| R-08 | Reglas duplicadas cliente/DB se desincronizan | Medio | Media | Media | activo |
| R-09 | Contrato JSONB de `profile` sin esquema | Medio | Media | Media | activo |
| R-11 | Cupos que nunca alcanzan el mínimo | Medio | Alta | Media-alta | activo |
| R-12 | Entregabilidad de email (spam / dominio no verificado) | Medio | Media | Media | activo |
| R-15 | Dependencia total de Supabase (free tier / cambio de términos) | Alto | Baja | Media | aceptado |
| R-16 | Banco de ítems expuesto o enumerable | Alto | Baja | Media | activo |
| R-17 | `difficulty` no calibrada ⇒ θ sesgada | Medio | Media | Media | activo |
| R-18 | Spam en guestbook / contacto (sin rate limit) | Bajo | Alta | Media | mitigado (moderación) |
| R-19 | Estacionalidad PAES: ventana de captación estrecha | Medio | Alta | Media-alta | activo |
| R-20 | Grafo de conocimiento ciego a `.cljs` | Bajo | Alta | Media | activo |
| R-21 | Deuda de ramas: trabajo perdido u olvidado | Medio | Media | Media | activo |
| R-22 | Bundle sin code splitting: crecimiento monótono | Bajo | Media | Baja | aceptado |

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
**Probabilidad:** Media — **se convierte en Alta al abrir a estudiantes reales (F8)**, y sube más
cerca del 1/12/2026.
**Mitigación:** T-10 — **2026-07-28: aviso de privacidad publicado**, checkbox de aceptación +
declaración de edad en el registro, y flujo de solicitud de eliminación de cuenta (ver
[[OPEN_QUESTIONS]] Q-03). **Queda pendiente:** eliminar la recolección de batería en `visitor`
(sin uso justificado), aplicar la migración `009` en producción, y automatizar la retención a 12
meses (T-34, hoy es solo una promesa en el texto).
**Estado:** activo, mitigación en curso. **Bloquea moralmente F8** hasta que T-10 y T-34 cierren.

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

### R-10 · "Mi plan" vacío
**Descripción:** el mecanismo del plan funciona, pero sin `resources` publicados el estudiante ve
una pantalla pobre justo en el momento de mayor expectativa (acaba de terminar el diagnóstico).
**Impacto:** Alto sobre la conversión y la credibilidad. **Probabilidad:** Alta hoy.
**Mitigación:** T-01 (contenido) y T-24 (estado vacío honesto que igual entregue capa 0).
**Estado:** activo. **Es el riesgo de producto más urgente.**

### R-11 · Cupos que nunca confirman
**Descripción:** un cupo con `min_enrollments` que no se alcanza deja a los inscritos esperando sin
comunicación ni fecha límite.
**Impacto:** Medio (abandono, mala experiencia). **Probabilidad:** Alta al inicio, cuando el volumen
de estudiantes es bajo.
**Mitigación:** T-25 — mostrar faltantes y plazo; definir qué pasa si no se alcanza (cancelar y
avisar, o fusionar bandas contiguas). Considerar `min_enrollments` bajos al comienzo.
**Estado:** activo.

### R-12 · Entregabilidad del email
**Descripción:** enviar desde `onboarding@resend.dev` (default sin `EMAIL_FROM`) o desde un dominio
no verificado lleva los correos a spam.
**Impacto:** Medio (la notificación de confirmación es el único canal fuera de la app).
**Probabilidad:** Media.
**Mitigación:** verificar dominio en Resend y setear `EMAIL_FROM`; probar entrega real (T-02);
mantener la notificación in-app como canal primario.
**Estado:** activo.

### R-13 · Bundle desalineado del fuente
**Descripción:** el deploy consiste en commitear `public/js/app.js`. Es posible publicar fuente sin
recompilar, o commitear un bundle que no corresponde. **Hoy mismo el archivo está modificado sin
commitear**, sin certeza de qué contiene.
**Impacto:** Medio (producción se comporta distinto del código leído; depuración engañosa).
**Probabilidad:** Alta.
**Mitigación:** T-08 ahora; T-06 con un check automático después. Regla dura: **nunca** editar el
bundle a mano; siempre `release app` antes de publicar.
**Estado:** activo.

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

### R-16 · Banco de ítems expuesto
**Descripción:** `questions` (con `correct_option` y `error_*`) es el activo principal. Si alguna
policy permite SELECT amplio a usuarios autenticados, el banco es descargable; y el flujo del
estudiante necesita leer preguntas, así que la policy exacta importa.
**Impacto:** Alto (pérdida del diferencial, y respuestas filtradas invalidan el diagnóstico).
**Probabilidad:** Baja-Media.
**Mitigación:** auditar qué policy usa el flujo del estudiante ([[OPEN_QUESTIONS]] Q-12); evaluar
entregar el ítem sin `correct_option` (validación en servidor) — eso sería un cambio arquitectónico
→ ADR.
**Estado:** activo.

### R-17 · `difficulty` no calibrada
**Descripción:** el modelo 1PL depende enteramente del parámetro `b` (dificultad) de cada ítem. Si
está asignada a criterio y no estimada con datos, θ y por lo tanto la banda y el cupo pueden estar
sesgados.
**Impacto:** Medio (el producto entrega un diagnóstico plausible pero incorrecto).
**Probabilidad:** Media.
**Mitigación:** T-29 (calibración empírica); mientras no exista, comunicar θ como *estimación* — la
landing ya lo hace ("nivel estimado").
**Estado:** activo.

### R-18 · Spam en guestbook y contacto
**Descripción:** inserción pública sin captcha ni rate limit.
**Impacto:** Bajo. **Probabilidad:** Alta.
**Mitigación:** ya existe moderación tri-state (`is_approved` empieza en `null`), así que nada
llega a la landing sin aprobación. Añadir rate limit si el volumen molesta.
**Estado:** mitigado.

### R-19 · Estacionalidad PAES
**Descripción:** la demanda se concentra en los meses previos a la rendición (fin de año en Chile).
Un go-live tardío pierde la temporada completa.
**Impacto:** Medio-alto sobre los objetivos de captación. **Probabilidad:** Alta.
**Mitigación:** priorizar T-01/T-02/T-04 (lo único que separa del go-live) por sobre deuda técnica;
aceptar deliberadamente deuda en F9 si el calendario aprieta, **excepto** en privacidad (R-06) y
respaldo (R-03).
**Estado:** activo.

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

### R-21 · Deuda de ramas
**Descripción:** 12 ramas locales y 11 remotas sin documentar; el trabajo del MVP operable está en
`cursor/mvp-operable-funnel`, posiblemente no mergeado a `main`.
**Impacto:** Medio (trabajo perdido, confusión sobre qué está en producción).
**Probabilidad:** Media.
**Mitigación:** T-19 (verificar qué hay en producción) y T-18 (ordenar ramas).
**Estado:** activo.

### R-22 · Bundle sin code splitting
**Descripción:** un solo módulo (`:modules {:app …}`): el estudiante en móvil descarga también todo
el panel admin, y el artefacto versionado crece en cada commit inflando el repositorio.
**Impacto:** Bajo. **Probabilidad:** Media.
**Mitigación:** aceptado por ahora; revisar si el bundle o el peso del repo se vuelven un problema
medible.
**Estado:** aceptado.

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
