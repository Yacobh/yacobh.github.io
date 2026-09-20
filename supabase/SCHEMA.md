# Schema Supabase — Academia Integral MVP

## Tablas existentes (previas al MVP)

| Tabla | Uso |
|-------|-----|
| `profiles` | `id`, `email`, `role` (`user`\|`admin`), `full_name`, `phone` (`010`) — ver `admin_rls.sql` |
| `questions` | Banco IRT: opciones, `error_*`, `difficulty`, `topic`, `order_index` |
| `tests` | Resultado JSON del diagnóstico (`test`, `email-user`, `user_id`) |
| `guestbook` | Firmas públicas + moderación tri-state |
| `visitor` | Tracking de visita |
| `contacto` | Formulario de contacto |

## Tablas MVP (`migrations/001_mvp_schema.sql`)

| Tabla | Rol |
|-------|-----|
| `modules` | Skills Baldor (`slug`, `track`, `historical_blurb`) |
| `questions.module_id` | FK opcional al módulo |
| `student_profiles` | Materialización: `theta`, `theta_band`, `profile` JSONB |
| `resources` | Contenido externo por módulo (`published`) |
| `class_slots` | Cupos por `theta_band` + modalidad + umbral |
| `enrollments` | Inscripción estudiante ↔ cupo |
| `notifications` | Banner in-app (confirmación de grupo); también solicitudes de eliminación de cuenta (`kind = 'account_deletion_request'`, ver `009`) |

### `profile` JSONB (forma esperada)

```json
{
  "theta": 0.42,
  "se": 0.31,
  "theta_band": "basico",
  "track": "aritmetica",
  "topic": "enteros",
  "deficits": [{"module-slug": "aritmetica/enteros", "errors": 3, "total": 4}],
  "misconceptions": [{"question-id": "...", "selected": "B", "explanation": "..."}]
}
```

### Bandas de θ (cupos)

| Banda | θ |
|-------|---|
| `inicial` | &lt; 0 |
| `basico` | 0 ≤ θ &lt; 1 |
| `intermedio` | 1 ≤ θ &lt; 2 |
| `avanzado` | θ ≥ 2 |

## Seed / contenido

| Archivo | Rol |
|---------|-----|
| `002_seed_modules.sql` | Módulos Baldor + lecturas |
| `003_demo_slots.sql` | Cupos demo |
| `004_enrich_baldor_resources.sql` | Blurbs + práctica guiada |
| `CONTENT.md` | Cómo enriquecer `error_*` |

## Email cohort (`005_email_outbox.sql`)

| Tabla / pieza | Rol |
|---------------|-----|
| `email_outbox` | Cola pending/sent/failed |
| Trigger en `notifications` | Encola mail al confirmar cupo |
| `functions/send-enrollment-emails` | Envía con Resend |

## Gestión de roles (`006_admin_role_management.sql`)

| Pieza | Rol |
|-------|-----|
| Policy `profiles_update_admin` | Permite que un admin cambie el rol de **otros** usuarios |
| Trigger `profiles_protect_last_admin` | Impide quedarse sin ningún administrador |
| Índices en `tests` / `guestbook` | Aceleran los contadores del resumen del panel |

Sin esta migración, el botón «Hacer admin» del panel falla: `profiles_update_own`
solo permite auto-actualizarse y sin cambiar de rol, así que el `UPDATE` afecta
0 filas. La UI muestra un aviso explícito en ese caso.

## Solicitudes de eliminación de cuenta (`009_account_deletion_requests.sql`)

No hay tabla nueva: la solicitud es una fila más en `notifications` con
`kind = 'account_deletion_request'`, insertada por el propio usuario (ya
permitido por `notifications_insert_admin`, que acepta `user_id = auth.uid()`)
y visible para el admin porque `notifications_select_own` ya incluye
`is_admin()`. Esta migración solo agrega `notifications_update_admin`, para que
el admin pueda marcarla como atendida (`read = true`) sin poder tocar las
notificaciones de otro usuario salvo esta.

**Importante:** marcar "atendida" no borra la cuenta. El borrado real de
`auth.users` requiere `service_role` (fuera del cliente) y hoy se hace a mano
en el dashboard de Supabase — ver [[../project-memory/BACKLOG]].

## Nombre y teléfono del perfil (`010_profile_name_phone.sql`)

Agrega `profiles.full_name` y `profiles.phone` (nullable). Editables por el propio usuario desde
"Configuración de cuenta" (`components/cuenta.cljs`) sin policy nueva: `profiles_update_own`
(`admin_rls.sql`) ya permite tocar cualquier columna de la propia fila salvo `role`.

## Control de capacidad en inscripciones (`011_enrollments_capacity_check.sql`)

`001` solo confirma el cupo al llegar a `min_enrollments` (trigger `AFTER INSERT/UPDATE`); no
había ningún control que impidiera superar `class_slots.capacity` — el único límite era de UI
(ver [[../project-memory/OPEN_QUESTIONS]] Q-04). Esta migración agrega un trigger
`BEFORE INSERT OR UPDATE OF status` (`enforce_slot_capacity`) que cuenta los enrollments
`pending|confirmed` del cupo (excluyendo la propia fila) y rechaza con `raise exception` si ya
alcanzó `capacity`. Espejo puro: `universo.slots.logic/capacity-reached?`
(`test/universo/slots/logic_test.cljs`).

## Notificar cancelación de cupo (`012_slot_cancellation_notification.sql`)

T-25/D-31: la cancelación de un cupo sin `min_enrollments` es **manual** (el admin usa el botón que
ya existía en `components/admin.cljs`, `:admin/set-slot-status` → `"cancelled"`) — lo único que
faltaba era el aviso. Esta migración agrega un trigger `AFTER UPDATE OF status` sobre
`class_slots` (`notify_slot_cancelled`) que, cuando el nuevo `status = 'cancelled'`, inserta una
`notification` para cada enrollment `pending`/`confirmed` de ese cupo. Mismo patrón que
`confirm_slot_if_threshold` de `001` (loop + `security definer`), sin mecanismo temporal nuevo.

## Canal de contacto preferido (`013_profile_contact_preference.sql`)

T-36/D-29/D-30: agrega `profiles.contact_preference` (`email`|`notification`|`whatsapp`, default
`email`). Editable por el propio usuario desde "Configuración de cuenta"
(`components/cuenta.cljs`, mismo patrón que `full_name`/`phone` de `010`, sin policy nueva). El
admin lo ve en el roster de cada cupo (`components/admin.cljs`, `roster-view`) junto a un enlace
`wa.me/<phone>` cuando el estudiante prefiere WhatsApp — **no** hay integración de API de WhatsApp,
es un enlace manual que el admin abre él mismo (decisión explícita de simplicidad, D-30).

## RPC para insertar visitantes (`014_visitor_track_rpc.sql`)

**Incidente 2026-07-30:** `visitor` (tabla previa al MVP, sin migración propia hasta ahora) dejó de
recibir filas desde 2026-07-19 07:24:12. Causa: `visitor` tiene policy `INSERT` para `anon`/
`authenticated` pero **ninguna policy `SELECT`**; el cliente (`db/insert-data-table!`, default
`returning? true`) hace `.insert(...).select("*").single()` en una sola sentencia
`INSERT ... RETURNING *`. Si la policy SELECT no permite leer la fila insertada, Postgres revierte
**la sentencia completa** (no solo el `RETURNING`) con `42501 — new row violates row-level security
policy` — el insert nunca llega a persistir. Confirmado en producción reproduciendo el mismo patrón
en el SQL Editor (`insert ... returning *` como rol `anon`).

**Por qué no se arregló agregando una policy SELECT:** `visitor` guarda IP/ciudad/país (dato
personal, ver `CLAUDE.md` §7.6, R-14/R-16 en `RISKS.md`); una policy SELECT abierta expondría todas
las filas vía API pública. Además `guestbook.visitor_id` necesita el **id entero real** de la fila
insertada como FK (`js/parseInt` en `components/guestbook.cljs`), así que tampoco alcanzaba con
dejar de pedir el retorno (`{:returning? false}`) — se perdía el id necesario.

**Fix:** función `security definer` `public.track_visitor(pais, ciudad, idioma, timezone) returns
bigint` que inserta y devuelve **solo el id**, sin exponer la fila completa. El cliente ahora llama
`db/crud.track-visitor!` (RPC) en vez de `insert-data-table!` para esta tabla. De paso se corrigió
`universo.visitor-tracker/visitor-saved?`, que siempre devolvía `nil` sin importar si ya había un
`visitor-id` en `localStorage` (dispatchaba `:set-visitor-id` pero el valor de retorno de la función
—el de `dispatch`— tapaba el `boolean` real), por lo que el tracker se disparaba en cada carga en
vez de una sola vez por visitante.

## De dónde vino la visita (`061_visitor_fuente.sql`)

`014` guarda país, ciudad, idioma y timezone, y **nada sobre el origen**. `061` agrega
`visitor.fuente`: la **etiqueta de campaña** que viaja en la query string (`/?de=tarjeta`), acotada
por el check `visitor_fuente_formato` a `^[a-z0-9._-]{1,40}$`.

**El RPC es una sobrecarga, no un reemplazo.** `track_visitor` existe ahora con 4 y con 5
argumentos, y la de `014` **queda intacta**. Eso es lo que permite el orden de despliegue que R-39
pide —migración primero, bundle después— sin una ventana en la que nada funcione. El cliente
(`db/crud.track-visitor!`) manda `p_fuente` **siempre**, incluso `nil`, porque PostgREST elige la
sobrecarga por el conjunto de claves del cuerpo; y **reintenta sin ella** si la base todavía no
tiene `061` (`universo.fuente/falta-el-argumento-de-fuente?`, mismo patrón que
`motor/falta-la-columna-de-version?`), porque con el orden invertido lo que se pierde no es la
etiqueta sino **la fila entera** —`404 PGRST202`, medido— y con ella el `visitor-id` que el
guestbook usa como FK.

**La etiqueta se normaliza de los dos lados y se valida de los dos lados.** La función baja a
minúsculas, recorta y, si no cumple el formato, **guarda `null` en vez de fallar**: un QR mal
impreso no puede romper el registro de la visita. El cliente aplica la misma regla en
`universo.fuente` antes de mandar. La autoridad es el check; el cliente es cortesía.

**Lo que este dato no es:** no es analítica ni seguimiento de personas, y no amplía la recolección
de datos personales (CLAUDE.md §7.6). Es una etiqueta que elegimos e imprimimos nosotros. **No se
guarda la query string cruda** a propósito — ahí es donde una etiqueta de campaña se convierte, sin
querer, en un campo libre con datos de quien visita.

**Límite de la atribución, que hay que decir antes de leer los números:**
`visitor-tracker/start-tracking!` inserta solo la **primera** vez que un navegador entra, así que
`fuente` responde *«de dónde llegó quien nunca había entrado»*, no *«de dónde llegó esta visita»*.
Un conocido que ya visitó la página y después escanea la tarjeta **no suma**.

La consulta de la campaña:

```sql
select coalesce(fuente, '(sin etiqueta)') as canal, count(*) as visitantes
  from public.visitor
 group by 1 order by 2 desc;
```

Las filas anteriores al despliegue quedan todas en `(sin etiqueta)`, así que la comparación útil es
**entre canales**, no contra el histórico.

## Contexto de visitante para el admin (`015_visitor_select_admin.sql`)

Mejora del flujo de comentarios (2026-07-31): el panel de moderación del guestbook
(`components/admin.cljs`, `guestbook-panel`) ahora muestra país/ciudad/idioma/timezone del
visitante junto a cada mensaje, resuelto vía `guestbook.id_visitor → visitor.id` (mismo patrón de
join del lado del cliente que `fetch-slot-roster`, sin FK declarada para embed automático de
PostgREST). Esto requería que el admin pudiera leer `visitor`, que hasta ahora no tenía **ninguna**
policy SELECT (ni para admin) — se agrega `visitor_select_admin`, restringida a `is_admin()`.
`visitor` sigue sin SELECT para nadie más: guarda datos personales (IP, ciudad, país).

## Vista de admin y contexto curado para contacto (`016_contacto_admin.sql`)

Arreglados dos hallazgos pendientes del flujo de comentarios (2026-07-31, pedido explícito del
owner): (1) `contacto.extra` guardaba el **app-db completo de re-frame** en cada envío —
`events/contacto.cljs` ahora guarda un contexto curado (`{:seccion ... :logueado? ... :url ...
:correo-cuenta ...}, solo si hay sesión`), y agrega `contacto.id_visitor` (columna nueva, mismo
patrón sin FK declarada que `guestbook.id_visitor`) para reusar el contexto de `visitor` (país/
ciudad/idioma/timezone) igual que en el guestbook. (2) No existía ninguna vista de admin para leer
`contacto` — se agrega la pestaña **Contacto** (`components/admin.cljs`, `contacto-panel`,
solo lectura) y la policy `contacto_select_admin` (`is_admin()`), ya que antes nadie podía leerla
tampoco. `fetch-admin-guestbook`/`fetch-admin-contacto` comparten ahora el helper
`db/crud.attach-visitor-context` en vez de duplicar el join.

## Alternativas de contacto (`017_contacto_alternativas.sql`)

Pedido del owner (2026-07-31): el formulario de contacto pasa de vivir solo en el footer a tener
también un botón flotante accesible durante toda la navegación (`components/contacto.cljs`,
`contacto-fab`/`contacto-panel`). Cuando el visitante no tiene sesión, el panel ofrece —además del
mensaje de siempre— dejar un teléfono o correo alternativo (opcional, no bloqueante) y, como opción
destacada, crear una cuenta gratis. Se agregan las columnas `telefono` y `correo` (nullable) a
`contacto`, como columnas explícitas —no mezcladas en `extra`, que sigue siendo metadata curada por
el sistema (ver `016`)—, mismo criterio que `guestbook` ya usa para sus columnas `email`/`phone`.
`fetch-admin-contacto` (`db/crud.cljs`) y `contacto-panel` en el admin (`components/admin.cljs`) se
amplían para mostrar los datos nuevos cuando existen.

## ¿Cómo verifico que la base es lo que dice este archivo?

Este documento es **prosa mantenida a mano**, y las migraciones se aplican a mano, sin `db push` y
sin staging (R-02): nada garantiza que la base sea lo que acá se afirma. Hay precedente concreto —
la auditoría de T-47 (2026-08-09) encontró **ocho policies creadas desde el dashboard** que el repo
no conocía, una de ellas dejaba el banco de ítems descargable por cualquier cuenta.

**`queries/verificacion_esquema.sql`** es el contraste automático, de solo lectura. Siete bloques:

| Bloque | Qué responde |
|--------|--------------|
| A | Inventario de tablas con RLS y tamaño (esperado: 16 tablas, todas con RLS) |
| B | **Semáforo de seguridad**: tablas sin RLS (expuestas) o con RLS y cero policies (rotas en silencio), más las policies `using (true)` |
| C | Si llegaron las columnas de cada migración — el check que faltó cuando se creyó dos días que `display_name` no existía |
| D | Funciones y triggers esperados: si falta uno, la invariante desaparece sin que nada falle |
| E | Huérfanos que las FK no atrapan |
| F | Invariantes de datos que esta memoria afirma, con el valor esperado al lado |
| G | **Volcado del DDL real** de las tablas no versionadas — es lo que falta para escribir `000_baseline.sql` y cerrar T-48 |

Correr después de cada tanda de migraciones. Los bloques B y F son los que conviene mirar siempre;
si B devuelve filas, hay un problema de seguridad o un producto roto en silencio.

## Orden de aplicación

1. `admin_rls.sql` (si aún no)
2. `guestbook_tri_state.sql` (si aún no)
3. `migrations/001_mvp_schema.sql`
4. `migrations/002_seed_modules.sql`
5. `migrations/003_demo_slots.sql` (opcional)
6. `migrations/004_enrich_baldor_resources.sql`
7. `migrations/005_email_outbox.sql`
8. `migrations/006_admin_role_management.sql`
9. `migrations/007_questions_admin_rls.sql`
10. `migrations/008_fix_profiles_created_at.sql`
11. `migrations/009_account_deletion_requests.sql`
12. `migrations/010_profile_name_phone.sql`
13. `migrations/011_enrollments_capacity_check.sql`
14. `migrations/012_slot_cancellation_notification.sql`
15. `migrations/013_profile_contact_preference.sql`
16. `migrations/014_visitor_track_rpc.sql`
17. `migrations/015_visitor_select_admin.sql`
18. `migrations/016_contacto_admin.sql`
19. `migrations/017_contacto_alternativas.sql`
20. `migrations/018_baldor_resources.sql`
21. `migrations/019_baldor_algebra_resources.sql`
22. `migrations/020_test_configs.sql`
23. `migrations/021_tests_topic_theta_rls.sql`
24. `migrations/022_test_config_display_name.sql` — ✅ aplicada (confirmado 2026-08-10)
25. `migrations/023_rls_limpieza.sql` — ✅ aplicada 2026-08-08
26. `migrations/024_questions_rpc.sql` — ✅ aplicada 2026-08-08
27. `migrations/026_score_answer_devuelve_correcta.sql` — ✅ aplicada 2026-08-09 (**antes de `025`**)
28. `migrations/025_questions_revoke_lectura_directa.sql` — ✅ aplicada 2026-08-09, **después** de
    publicar el bundle de T-47 y verificar el diagnóstico con cuenta de estudiante
29. `migrations/027_misconceptions.sql` — ✅ aplicada 2026-08-10 (tabla creada y vacía,
    confirmado por el owner)
30. `migrations/028_test_config_min_response_seconds.sql` — ✅ aplicada 2026-08-10
31. `migrations/029_topic_normalization.sql` — ✅ aplicada 2026-08-10, después de `028`
32. `migrations/030_backfill_module_id_restante.sql` — ✅ aplicada 2026-08-10
33. `migrations/031_modulos_inecuaciones_y_operaciones_fundamentales.sql` — ✅ aplicada 2026-08-10, después de `030`
34. `migrations/032_min_response_seconds_calibrado.sql` — ✅ aplicada 2026-08-10
35. `migrations/033_cuantica_track_y_modulos.sql` — ✅ aplicada 2026-08-11 · experimento, ver §Track `cuantica`
36. `migrations/034_cuantica_misconceptions.sql` — ✅ aplicada 2026-08-11
37. `migrations/035_cuantica_questions_fundamentos.sql` — ✅ aplicada 2026-08-11
38. `migrations/036_cuantica_questions_sistemas.sql` — ✅ aplicada 2026-08-11
39. `migrations/037_cuantica_questions_momento_angular.sql` — ✅ aplicada 2026-08-11
40. `migrations/038_cuantica_questions_aplicaciones.sql` — ✅ aplicada 2026-08-11
41. `migrations/039_cuantica_resources.sql` — ✅ aplicada 2026-08-11
42. `migrations/040_cuantica_test_configs.sql` — ✅ aplicada 2026-08-11
43. `migrations/041_test_config_fluency_thresholds.sql` — ✅ **aplicada 2026-08-13** por el owner ·
    umbrales del eje de fluidez por banco (ADR-019, T-65). **Columnas verificadas contra la base
    real** (ver abajo); el check y los valores quedan por confirmar con el bloque H de
    `queries/verificacion_esquema.sql`
44. `migrations/042_modules_historical_timeline.sql` — ✅ **aplicada 2026-08-13** por el owner, tras
    auditar los 35 años (ADR-016) · año, era y figura histórica por módulo, para la línea del tiempo
    del tablero (ADR-021, T-66). Control corrido en producción: **35 ubicados / 0 sin ubicar**, o
    sea que los 35 slugs del `update` coincidieron con la tabla y ninguno se perdió en silencio
45. `migrations/043_site_settings.sql` — ✅ **aplicada 2026-08-13** por el owner · configuración
    global del sitio en una sola fila (apariencia por defecto para visitantes nuevos), con sus dos
    policies en el mismo archivo: lectura pública a propósito, escritura solo admin (ADR-022).
    **Verificada en producción por su efecto:** la pestaña Apariencia del panel dejó de mostrar el
    error de carga, que era exactamente lo que fallaba mientras la tabla no existía
46. `migrations/044_geometria_resources.sql` — ✅ **aplicada 2026-08-17** por el owner · 18 recursos
    de capa 1 para los **5 módulos de `geometria` que no tenían ninguno** (`angulos`, `triangulos`,
    `circulo`, `areas`, `volumenes`). Criterio **L-2** de "listo para promocionar"
    ([[../project-memory/PROJECT_BRIEF]] §6) y cierre de [[../project-memory/BACKLOG]] T-56.
    Redactados desde cero: a diferencia de `018`/`019` **no hay volumen de Baldor de geometría**, así
    que no se cita fuente bibliográfica. Todo entra con `published = false` (ADR-016) y **la
    publicación es humana**. Auditoría numérica al generar: **72 comprobaciones, 0 fallas**.
    **Aplicarla NO cumple L-2 por sí sola:** los 18 entran con `published = false`, y un recurso sin
    publicar es **invisible para el estudiante** porque la policy `resources_select_published`
    filtra por `published = true`. Falta revisar y publicar desde Admin → Recursos, y comprobar que
    `geometria/basica` y `geometria/pitagoras` (recursos de `002`/`004`) tengan ≥1 publicado: el
    criterio es 18 módulos de 18. **Verificación versionada:**
    `queries/L-2_cobertura_de_recursos.sql` — su bloque A ataja el modo de fallo silencioso de esta
    migración (si un slug no coincide, el `insert … select` no inserta nada y **no da error**)
47. `migrations/045_module_prerequisites_y_resource_misconceptions.sql` — ✅ **aplicada 2026-08-18**
    por el owner
48. `migrations/046_bandas_de_conocimiento_y_theta_inicial.sql` — ✅ **aplicada 2026-08-19** por el
    owner. La primera corrida falló con `42703: column "track" does not exist`: el `check (track …)`
    de `001` que se copió pertenece a `class_slots`, no a `resources`. Corregida y verificada contra
    un PostgreSQL desechable antes de la segunda corrida
    · los dos puentes que le faltan al escape del estudiante (`universo.irt.escape`) para tener
    destino, y que además son el dato del mapa de prerrequisitos. Crea `module_prerequisites`
    (grafo entre los 20 módulos, aristas `duro`/`blando`), `resource_misconceptions` (de la idea
    errónea concreta al material concreto, que hoy solo se puede resolver por módulo y por eso la
    capa 1 de «Mi plan» es genérica) y `resources.entry_level` (cuál es el material de entrada de
    un módulo: un escape necesita el introductorio, no el recurso nº 7).
    **Aditiva e idempotente:** dos tablas vacías y una columna nullable con default; no mueve datos
    y nada la lee todavía. **Qué se rompe si no se aplica:** nada — el escape sigue registrándose y
    el resto del producto funciona igual; lo que no existe es el destino del escape.
    ⚠ **Sin seed a propósito**: el grafo de prerrequisitos es una decisión **pedagógica** del
    profesor y está registrada como pregunta abierta en [[../project-memory/OPEN_QUESTIONS]] Q-38;
    se siembra en una migración propia para que la decisión quede fechada aparte de la estructura.
    ⚠ **`resource_misconceptions` es admin-only en las cuatro operaciones**, mismo criterio
    deliberado que `027` (RISKS R-16: «abrir después es fácil, des-filtrar no»). Consecuencia: el
    camino «tu error → este recurso» necesita una función `security definer` como `next_question`
    (ADR-015), que **no** se crea acá para no dejar una RPC sin lector
49. `migrations/047_arreglar_escapes_latex_dobles.sql` — ✅ **aplicada 2026-08-19** por el owner ·
    colapsa `\\` a `\` en los 76 ítems de los bancos activos que guardaban los comandos LaTeX con la
    barra duplicada (`\\frac`, `20\\%`), que KaTeX no interpreta y el estudiante veía en crudo
    ([[../project-memory/BACKLOG]] T-105). La regla solo colapsa cuando sigue una letra o `%`,
    porque un `\\` suelto es un salto de fila legítimo dentro de `\begin{cases}`; el único ítem con
    un entorno (#359) se excluye por id. **La primera corrida falló** con `42703: column
    "explanation" does not exist` — `questions` **no tiene** esa columna, y como preexiste al
    esquema versionado no hay ningún `create table` acá del cual leer sus columnas: la fuente es
    `question-select-cols` en `universo.db.crud` ([[../project-memory/LESSONS_LEARNED]] L-46).
    Corregida y re-verificada contra un PostgreSQL desechable con las columnas reales; **no toca los
    bancos de cuántica**, el `where` filtra por topic.

50. `migrations/048_version_del_motor_y_parametros_del_modelo.sql` — ✅ **aplicada 2026-08-28**
    por el owner, **antes** del push (verificada: 283 filas en v1, 0 sin versión) · agrega `tests.engine_version` (con backfill a 1: las filas viejas se rindieron
    con el motor v1, así que es escribir un dato que siempre fue verdad, no sobrescribir histórico)
    y `test_configs.prior_sd` / `guessing_c`, los dos parámetros del estimador que hasta ahora
    estaban fijos en el código ([[../adr/ADR-034-azar-fijo-prior-suelto-y-version-del-motor]]).
    Puramente aditiva. Se aplicó **antes** de desplegar el bundle, que era el orden que exigía
    R-39: sin la columna, PostgREST rechaza el `insert` entero y el diagnóstico completo del
    estudiante se pierde. El reintento del cliente sigue en pie como red para un entorno nuevo
    que se levante sin esta migración.

51. `migrations/049_bandas_explicitas_del_eje_de_numeros.sql` — ✅ **aplicada 2026-08-28**
    por el owner · escribe `band_min`/`band_max` explícitas en los seis módulos de aritmética,
    repartiéndolos a lo largo de todo `[-3, 3]`. **Precondición de `050`.** Sin ella, las bandas
    derivadas del orden curricular meten el eje entero en `[-2,85, -0,54]` y el diagnóstico se
    agota cuando el estudiante sube — que es lo que pasó el 2026-08-28 con `enteros`, parando en
    8 preguntas por `:exhausted` con θ = 1,29 ([[../project-memory/BACKLOG]] T-118,
    [[../adr/ADR-034-azar-fijo-prior-suelto-y-version-del-motor]]). Reversible: basta poner las
    dos columnas en `null` y vuelve la banda derivada.

52. `migrations/050_banco_del_eje_de_numeros.sql` — ✅ **aplicada 2026-08-28** por el owner,
    después de `049` ·
    **100 ítems** del eje de números repartidos en los seis módulos, más **47 ideas erróneas
    nuevas** al catálogo. **Aplicar después de `049`.** Generada por
    `scripts/generar_migracion_items.py` desde `contenido/items/numeros.json`, que es la fuente
    de verdad: para corregir un ítem se edita el JSON, se vuelve a verificar y se regenera.
    Verificada con `scripts/verificar_items.py` (clave repartida 26/25/25/24, una sola correcta,
    las cuatro explicaciones, LaTeX con escape simple, cobertura ≥6 ítems por tramo de 1,0
    logit) y **aplicada de prueba contra un PostgreSQL 14 desechable** con las columnas reales:
    0 ítems sin módulo, 0 ideas huérfanas, y los 100 dentro de la banda de su módulo.
    ⚠️ `difficulty` es **hipótesis autoral**, no medición (R-17).

53. `migrations/051_bandas_explicitas_del_eje_de_algebra.sql` — ✅ **aplicada 2026-08-28**
    por el owner · lo mismo que `049` hizo con números, para los cinco módulos de álgebra.
    **Precondición de `052`**: sin ella las bandas derivadas comprimen el eje entero en
    `[-1,16, +0,87]`. Reversible poniendo las dos columnas en `null`.

54. `migrations/052_banco_del_eje_de_algebra.sql` — ✅ **aplicada 2026-08-28** por el owner ·
    **100 ítems** del eje de álgebra en los cinco módulos, más **34 ideas erróneas nuevas**.
    **Aplicar después de `051`.** Generada desde `contenido/items/algebra.json`, verificada con
    `scripts/verificar_items.py` (claves 25/25/25/25, cobertura ≥6 por tramo) y **aplicada de
    prueba contra un PostgreSQL 14 desechable encadenando `049`→`050`→`051`→`052`**: 200 ítems,
    0 sin módulo, 0 ideas huérfanas, los 200 dentro de la banda de su módulo, y reaplicar no
    duplica. Las 15 identidades algebraicas se comprobaron numéricamente una por una.
    ⚠️ **No amplía el banco `polinomios` viejo: lo reemplaza** — pero **no lo borra**. Retirar
    esos 20 ítems de circulación es decisión de contenido del owner ([[../project-memory/BACKLOG]]
    T-122).

55. `migrations/053_bandas_explicitas_del_eje_de_geometria.sql` — ✅ **aplicada 2026-08-28**
    por el owner · lo mismo que `049` y `051`, para los siete módulos de geometría.
    **Precondición de `054`**: sin ella las bandas derivadas dejan el eje entero **por encima de
    θ = 0,26**, o sea el defecto de números pero por el otro extremo — un estudiante que todavía no
    llega ahí no encuentra ningún ítem lo bastante fácil. Reversible poniendo las dos columnas en
    `null`.

56. `migrations/054_banco_del_eje_de_geometria.sql` — ✅ **aplicada 2026-08-28** por el owner ·
    **100 ítems** del eje de geometría en los siete módulos, más **33 ideas erróneas nuevas**.
    **Aplicar después de `053`.** Es el primer eje que se escribe **sin banco previo**: geometría
    no tenía ningún `topic` identificable en `questions`, así que no reemplaza ni compite con nada.
    Generada desde `contenido/items/geometria.json`, verificada con `scripts/verificar_items.py`
    (claves 25/26/24/25, cobertura ≥6 por tramo de 1,0 logit) y **aplicada de prueba contra un
    PostgreSQL 14 desechable** con las columnas reales: 100 ítems, 0 sin módulo, 0 ideas huérfanas,
    los 100 dentro de la banda de su módulo, **los 100 con su texto idéntico al del JSON** (control
    del dollar-quoting con LaTeX) y **las 175 referencias a ideas erróneas resueltas una por una**
    contra el JSON — que es el modo de fallo de SESSION-019, donde el `left join` por slug puso
    `null` en silencio. Reaplicar no duplica y la reversión deja la base como estaba.
    ⚠️ `difficulty` es **hipótesis autoral**, no medición (R-17).

57. `migrations/055_modulos_del_eje_de_probabilidad.sql` — ✅ **aplicada 2026-08-28** por el owner,
    primero en su versión original y después en la actual (que crea `probabilidad/conteo` y corrige
    la banda de `probabilidad/posicion`) · **crea los seis módulos del cuarto eje** con su `track`, su
    `order_index` (310…360) y su banda explícita: `datos`, `tendencia-central`, `posicion`
    (que incluye el rango), `conteo`, `azar` y `reglas`. Cierra [[../project-memory/BACKLOG]] T-119:
    `046` había ampliado el check de `track` para admitir `probabilidad`, pero nadie había
    creado los módulos y el eje tenía **cero módulos y cero ítems**. La lista de contenidos
    la decidió el owner sobre el temario PAES M1, no se infirió del código.
    ⚠️ **`051` y `053` van antes que esta:** pasar de 18 a 24 módulos del producto cambia las
    bandas **derivadas** de todos los que no tengan explícita — medido, `geometria/pitagoras`
    caería de `[1,95, 2,85]` a `[0,70, 1,60]`. Con `051` y `053` aplicadas, los 18 anteriores
    tienen banda explícita y esta migración no mueve a nadie.

58. `migrations/056_banco_del_eje_de_probabilidad.sql` — ✅ **aplicada 2026-08-28** por el owner:
    primero la versión original (100 ítems) y después la actual, que sumó los 14 nuevos ·
    **102 ítems** del eje de probabilidad y estadística en los seis módulos, más **45 ideas
    erróneas nuevas** — el catálogo más grande de las cuatro tandas, porque es el eje donde
    más se confunden pares de conceptos (media/mediana/moda, excluyentes/independientes,
    percentil/porcentaje de logro). **Aplicar después de `055`**: sin los módulos, el
    `left join` dejaría los 102 ítems con `module_id` en null y en silencio.
    Dos decisiones de contenido del owner (2026-08-28) están incorporadas: los cuartiles se
    calculan con la **posición localizadora** $P = k \cdot n / 4$ —aproximando siempre al entero
    siguiente si $P$ es decimal, y promediando las posiciones $P$ y $P+1$ si es entero, que es la
    convención DEMRE para datos no agrupados—, y **varianza y desviación estándar quedaron fuera**
    porque no entran en el temario M1 de Admisión 2027.
    Generada desde `contenido/items/probabilidad.json`, verificada con
    `scripts/verificar_items.py` (claves 25/25/25/25, cobertura ≥6 por tramo) y **aplicada de
    prueba contra un PostgreSQL 14 desechable** encadenando `055`→`056`: 102 ítems, 0 sin
    módulo, 0 ideas huérfanas, los 102 dentro de la banda de su módulo, **los 102 con su texto
    idéntico al del JSON** y **las 198 referencias a ideas erróneas resueltas una por una**.
    Reaplicar no duplica y la reversión deja la base como estaba.
    ⚠️ `difficulty` es **hipótesis autoral**, no medición (R-17).

59. `migrations/057_questions_active_y_next_question.sql` — ✅ **aplicada 2026-08-28** por el owner · **crea `public.questions.active`** (`not null default true`) y hace que
    `next_question` la respete (`and coalesce(q.active, true)`).
    ⚠️ **Hallazgo:** la columna **no existía**. La memoria venía recomendando desde T-122
    «`active = false` en vez de `delete`» y la skill medía el banco con `where active`: las dos
    cosas eran falsas, y lo destapó la guarda de `058` al aplicarse contra la base real. Hasta acá
    **no había ninguna forma de retirar un ítem sin borrarlo**.
    Los dos pasos van en la misma migración a propósito: la columna nace en `true`, así que al
    aplicarla **no hay ningún ítem inactivo** y el filtro nuevo no cambia lo que recibe nadie.
    Separarlas dejaría una ventana en la que marcar un ítem inactivo no lo retira, que es el
    defecto que se está cerrando. **Precondición de `058`.** El bundle no cambia:
    `question-select-cols` no pide esa columna.

60. `migrations/058_reparacion_del_eje_de_probabilidad.sql` — ✅ **aplicada 2026-08-28** por el
    owner, y verificada con la consulta de control: **0 módulos `dispersion`, 102 activos, 12
    inactivos** · **el delta entre lo que el owner ya aplicó y lo que el temario exige.**
    `056` es idempotente por `(topic, question)`, así que reaplicarla inserta los 14 ítems nuevos
    pero **no toca** los 100 que ya entraron. `058` hace lo que falta: mueve los cinco ítems de
    rango a `probabilidad/posicion`, corrige las tres explicaciones de cuartiles y percentiles a
    la convención DEMRE, marca `active = false` los **12 ítems de varianza y desviación estándar**,
    los reasigna para no dejarlos sin módulo y borra el módulo `probabilidad/dispersion`, ya vacío.
    **Orden: `055` → `056` → `057` → `058`.** Sobre una base limpia es **inocua** (todos sus
    `update` quedan en 0 filas): verificado, igual que la cadena completa contra una réplica del
    estado real —`055`/`056` viejas aplicadas y **sin** columna `active`—, que deja 102 activos,
    12 inactivos, los 102 idénticos al JSON campo por campo y `next_question` sin servir ninguno
    de los 12, que sí caen en su ventana de dificultad.
    ⚠️ **No repermuta alternativas a propósito.** Al agregar dos ítems, la rotación de claves del
    JSON movió las letras de 50 ítems ya cargados; como `tests` guarda la respuesta **por letra**,
    se hizo al revés — el JSON se fijó al orden ya aplicado.

61. `migrations/059_test_configs_de_los_cuatro_ejes.sql` — ✅ **aplicada 2026-08-28** por el owner,
    después de que su guarda lo frenara una vez por intentar publicar con `058` sin aplicar ·
    **crea la fila de `test_configs` de los cuatro bancos nuevos**, que ninguna migración de banco
    creaba. Cierra [[../project-memory/BACKLOG]] T-125. Medido en producción el 2026-08-28:
    `numeros`, `algebra`, `geometria` y `probabilidad` tenían **0 filas** de config, o sea **414
    ítems aplicados que ningún estudiante podía rendir**.
    Decisiones del owner: los cuatro **publicados** (`active = true`) y **encadenados**
    (`numeros` como `prerequisite_topic` de los otros tres, sin `min_theta`). Los parámetros de
    parada son los de `020` —5/12/0,35— y no se tocan acá: cambiar la regla de parada es otra
    decisión, con su propia evidencia (T-111, T-117).
    ⚠️ **Va después de `057` y `058`**, y dos guardas lo hacen cumplir: se niega a correr sin
    `questions.active`, y se niega si queda algún ítem de varianza o desviación estándar activo en
    `probabilidad` — publicar el banco antes de `058` pondría esos 12 ítems delante de un
    estudiante. Las dos guardas verificadas contra la réplica.
    ⚠️ Consecuencias aceptadas por el owner: **convivirán bancos duplicados** en el selector
    (`numeros` con `numbers_v1`, `algebra` con `polinomios` y sus fragmentos → T-122, que ahora sí
    se puede ejecutar porque `057` creó la columna) y **los 414 ítems se publican sin revisión
    pedagógica** (T-120, T-121, T-123, T-124 abiertas).

62. `migrations/060_bandas_de_los_dos_modulos_sin_banda.sql` — ✅ **aplicada 2026-08-28** por el owner · le da banda explícita a los **dos módulos que quedaban sin ella**,
    `aritmetica/operaciones_fundamentales` y `algebra/inecuaciones` (los que creó `031`). Con esto
    los **26 módulos del producto** tienen banda explícita y ninguno depende del reparto derivado,
    que se recalcula —y los mueve— cada vez que se agrega un módulo. Los valores salen del mismo
    criterio que `049`/`051`/`053`/`055`: interpolar entre los dos vecinos de eje por
    `order_index`. Dos `update`, sin ítems de por medio. Verificada contra la réplica: 7/7, 6/6,
    7/7 y 6/6 con banda, y las bandas de cada eje quedan monótonas y solapadas.
    ⚠️ Sigue siendo hipótesis autoral (R-17); lo que cambia no es que sea más cierta, es que deja
    de moverse sola.

63. `migrations/061_visitor_fuente.sql` — ✅ **aplicada 2026-09-16** por el owner ·
    **T-135.** Agrega `visitor.fuente`, la **etiqueta de campaña** que llega por la query string
    (`?de=tarjeta`), más un índice parcial y una **sobrecarga de 5 argumentos** de `track_visitor`.
    **Para qué:** hoy una visita que llega por el QR de la tarjeta es indistinguible de una que
    llegó por Google, y sin eso no se puede responder qué canal trajo gente (G-5, R-31).
    ⚠️ **No es analítica ni dato personal.** `fuente` es una etiqueta que elegimos nosotros, acotada
    por el check `visitor_fuente_formato` a `^[a-z0-9._-]{1,40}$` porque **viene de un input que
    cualquiera puede escribir**. No se guarda la query string cruda: ahí es donde una etiqueta de
    campaña se convierte, sin querer, en un campo libre con datos de la persona (CLAUDE.md §7.6).
    ⚠️ **La versión de 4 argumentos de `014` se deja intacta a propósito** (R-39): mientras el
    bundle publicado siga llamando a la de 4, sigue funcionando igual.
    **Límite que hay que decir antes de leer los números:** `visitor-tracker/start-tracking!`
    inserta solo la **primera** visita de un navegador, así que `fuente` responde «de dónde llegó
    quien nunca había entrado», no «de dónde llegó esta visita».
    **Verificada (2026-09-16)** contra un PostgreSQL 14.18 desechable **y un PostgREST real**, con
    una réplica de `visitor` (sus siete columnas) y `014` cargados antes:
    - aplica limpia y es **idempotente** (la segunda corrida solo emite los `NOTICE` de
      `if not exists`);
    - las **dos sobrecargas conviven**, ambas con `execute` para `anon` y `authenticated`;
    - 13 etiquetas hostiles guardan `null` **sin romper la fila**: `<script>`, `' or 1=1--`,
      espacios, tildes, 41 caracteres y `tarjeta\nDROP TABLE visitor` (el `~` de Postgres **no** es
      multilínea, así que el salto de línea no parte la etiqueta);
    - el check **sí rechaza** un `insert` directo que se saltee el RPC;
    - por HTTP, PostgREST elige la sobrecarga **sin ambigüedad**: 4 claves → la de `014`, 5 claves
      → la de `061`, también con `p_fuente: null`;
    - **con el orden invertido** (bundle antes que migración) la respuesta es `404 PGRST202` y se
      pierde **la fila entera**, no solo la etiqueta — de ahí el reintento del cliente;
    - la **reversión escrita en el pie funciona** y deja la de 4 argumentos intacta.

64. `migrations/062_electrotecnia_track_y_modulos.sql` — ✅ **aplicada 2026-09-09** por el owner ·
    abre el **track `electrotecnia`**, el segundo fuera del temario PAES, con sus **12 módulos** y
    **banda explícita en todos** (`band_min`/`band_max`, de −3,0 a 2,6). Amplía los dos `check` de
    lista cerrada, `modules.track` y `class_slots.track` — el segundo es la lección de `046`: si no
    se amplía, no se puede publicar un cupo del track y el fallo aparece lejos.
    ⚠️ **La banda explícita es lo que evita recompilar el bundle.** `universo.bands` es el único
    namespace que nombra tracks; un track fuera de `product-tracks` no recibe banda derivada, y
    meterlo en el reparto movería las bandas de los 26 módulos del producto — el defecto que `060`
    acababa de cerrar. Ver [[../adr/ADR-035-track-electrotecnia-visible]].

65. `migrations/063_banco_de_electrotecnia.sql` — ✅ **aplicada 2026-09-09** por el owner ·
    **74 ítems** y **54 ideas erróneas nuevas** (prefijo `et/`), repartidos en los doce módulos y
    cubriendo θ ∈ [−3, 3] con al menos 6 ítems por tramo de 1,0 logit. Es el banco de **entrada**:
    un diagnóstico que recorre el curso completo. Generada desde
    `contenido/items/electrotecnia.json` con la skill `banco-de-items`; el JSON es la fuente de
    verdad y el `.sql` un artefacto — se corrige el JSON y se regenera.

66. `migrations/064_banco_de_electrotecnia_ca.sql` — ✅ **aplicada 2026-09-09** por el owner ·
    **42 ítems** y **6 ideas erróneas nuevas** sobre los seis módulos de corriente alterna, θ ∈
    [−1, 3]. Es el banco de **profundización**, con el temario de la prueba que motivó el track.
    ⚠️ **Va después de `063`, y no hay guarda que lo verifique.** Reutiliza 29 slugs de idea errónea
    que declara `063`; aplicada antes, el `left join` no falla: resuelve a null y los 42 ítems
    quedan sin ninguna idea errónea, en silencio (modo de fallo de T-119). La consulta que lo
    detecta está en el pie de `065`.

67. `migrations/065_test_configs_de_electrotecnia.sql` — ✅ **aplicada 2026-09-09** por el owner ·
    crea las **dos filas de `test_configs`** (`electrotecnia` y `electrotecnia_ca`, encadenadas sin
    `min_theta`) con los parámetros de `020`/`059`: 5/12/0,35 y `min_response_seconds = 3`.
    ⚠️ **Es la que publica, y lo hace con `active = true`.** No hay estado intermedio en
    `test_configs_select`: todo estudiante de PAES va a ver «Electrotecnia» en su selector. Decisión
    del owner (D-66, R-42), no efecto lateral; el apagado es un `update` de una línea escrito al
    principio del archivo. **Dos guardas probadas:** se niega sin los 12 módulos y se niega si algún
    banco no llega a 20 ítems activos — T-125 al revés, porque una config sin banco deja al
    estudiante sin preguntas a mitad del diagnóstico.

68. `migrations/066_electrotecnia_resources.sql` — ✅ **aplicada 2026-09-09** por el owner ·
    **24 recursos** de capa 1 (una guía y una práctica guiada por módulo), todos con
    `published = false` según ADR-016 §1. No es precondición de nada: los recursos no intervienen en
    el diagnóstico. Se publican **después** de auditarlos rehaciendo las cuentas (T-128).

69. `migrations/067_tests_origin.sql` — ⏳ **escrita y verificada, SIN aplicar** (2026-09-13) ·
    **T-110.** Agrega `tests.origin` (`'student'` | `'admin_preview'`), con backfill derivado del rol
    actual de quien rindió, check, `not null` e índice parcial. Lo escribe un **trigger
    `before insert`** a partir de `public.is_admin()` — **no el cliente**: `:auth/admin?` es estado de
    UI y falsificable (CLAUDE.md §7), y un trigger además no necesita que se despliegue el bundle
    para empezar a marcar.
    **Para qué:** desde ADR-032 el owner depura un ítem rindiéndolo, y cada corrida dejaba una fila
    indistinguible de la de un estudiante, concentrada justo en los ítems más depurados. Calibrar con
    eso adentro sesga el banco **en correlación con la variable de interés** (R-37). Es precondición
    dura de **G-2**.
    **Consecuencia aceptada:** si el owner rinde un diagnóstico en serio, esa fila igual queda como
    `admin_preview`. Se prefiere a hacer el trigger condicional y reabrir la falsificación.
    **Consulta:** toda métrica de estudiantes filtra `origin = 'student'`.

> ✅ **Aplicada en producción el 2026-09-13.** Resultado del backfill: **275 `student` y 70
> `admin_preview`** sobre 345 filas. O sea que **el 20 % de lo que iba a entrar a la calibración
> eran corridas de depuración** (R-37 medido, no estimado), concentradas en los períodos de edición
> intensa del banco (11–19 de agosto y 5 de septiembre).
>
> ⚠️ **El backfill falsificó un supuesto de esta misma migración.** Decía «hoy el único admin es el
> owner»; el resultado marcó también filas de **`bacourosp@gmail.com`**, o sea que existe **una
> segunda cuenta con rol `admin`** en `profiles`. No cambia la corrección del backfill —esas filas
> son de un admin y se excluyen igual— pero sí invalida la frase, y abre **Q-49**: quién es esa
> cuenta y si debe conservar el rol. Un admin lee **todos** los `tests` por RLS y puede editar el
> banco (`is_admin()`), así que no es una curiosidad de inventario.
>
> ⚠️ **Lo que `origin` NO separa, y hay que decirlo antes de calibrar:** una cuenta de prueba
> (`a@a.com`, 5 filas) y un **profesor explorando** quedan como `student`, porque no son admin. El
> origen distingue depuración de no-depuración, no «muestra válida» de «ruido». Filtrar por
> `origin = 'student'` es necesario y **no suficiente**.

73. `migrations/071_electronica_track_y_modulos.sql` — ✅ **aplicada 2026-09-20 por el owner** · **T-156, épica E10.** El track `electronica` y sus **cinco módulos** de circuitos
    de **corriente continua**: `notacion_cientifica`, `ley_de_ohm`, `potencia`, `capacitores` y
    `leyes_de_kirchhoff`, con banda explícita, las **cuatro** columnas históricas y cuatro aristas
    en `module_prerequisites`.
    **Para quién:** el curso de **técnico en electrónica** del owner, chicos de 16–17 años con
    fallas de base para quienes `electrotecnia` queda muy alto. Solo continua, correctivo, aritmética
    de cabeza, y `C = Q/V` explícita. Plan completo en
    [[../project-memory/PLAN_TRACK_ELECTRONICA]].
    **No trae un solo ítem**: eso es `072`…`076` y depende del catálogo de errores del curso.
    **No mueve ninguna banda del producto** (banda explícita, y `bands/product-tracks` no se toca).

    ⭐ **Dos cosas que esta migración hace y `062` no había hecho:**

    - **Las cuatro columnas históricas completas**, no solo el blurb. `042` es la única migración que
      escribe `historical_year`, y por eso 33 de 53 módulos están fuera de la línea del tiempo —
      entre ellos los 12 de `electrotecnia` (**T-154**). Un módulo sin año desaparece de la línea del
      tiempo **en silencio**.
    - **`module_prerequisites` poblada**, sabiendo que hoy no la lee ningún namespace (ADR-038): es
      el camino curricular documentado y el insumo de T-149. El mecanismo que sí funciona hoy es
      `test_configs.prerequisite_topic`, y va en `077`. Los dos tienen que decir lo mismo.

    ⚠️ **`leyes_de_kirchhoff` y no `kirchhoff`, y no es estética.** `electrotecnia/kirchhoff` ya
    existe, y `universo.topics/suffix-match` resuelve buscando una coincidencia **única**: con dos
    candidatos devuelve `nil`. El choque no habría roto solo el módulo nuevo — habría **dejado de
    resolver el de electrotecnia, que ya está aplicado**, en silencio. Lo detectó comprobar los
    sufijos contra el `def` real antes de escribir el SQL, que es para lo que existe la skill
    `unidad-de-contenido`.

    ⚠️ **Nota de reversión medida:** el último paso —volver a angostar `class_slots_track_check`—
    **falla si ya se publicó algún cupo de electrónica**, porque el check nuevo no puede validar
    filas que ya existen. Está escrito en el pie de la migración.

> **Verificación de `071` (2026-09-19).** Contra un **PostgreSQL 17.11** desechable —la versión mayor
> de producción, que es la lección que dejó `070`— con una réplica del estado previo: `modules` con
> sus checks de `001`/`042`/`046`/`062`, `class_slots` con el suyo, `module_prerequisites` de `045` y
> cuatro módulos del producto con su banda.
>
> Aplica limpia con `ON_ERROR_STOP=1`, **idempotente**, y la reversión funciona y deja volver a
> aplicarla. Los cinco módulos entran con su banda; **0 sin año, 0 sin era, 0 sin figura, 0 sin
> blurb**; las cuatro aristas quedan `duro` y con `capacitores` colgando de `notacion_cientifica`
> (**no** de `ley_de_ohm`: `C = Q/V` no usa la ley de Ohm, y así un alumno trabado en Ohm igual puede
> avanzar); **ningún sufijo repetido en todo el sistema**; un track desconocido y una era incoherente
> **sí** son rechazados por sus checks; y un cupo de `electronica` ya se puede publicar.
>
> ⭐ **Y el control que importa:** las bandas de los módulos del producto **son idénticas antes y
> después**. Crear módulos corre las bandas derivadas —es lo que movió `geometria/pitagoras` de
> `[1,95 · 2,85]` a `[0,70 · 1,60]` sin que nadie lo tocara— y la banda explícita es lo que lo
> impide.

74. `migrations/072`…`076` — ✅ **aplicadas 2026-09-20 por el agente** (ADR-040) · **T-158, épica
    E10.** Los **cinco bancos** del track `electronica`, uno por módulo: `072` capacitores, `073`
    notación científica, `074` ley de Ohm, `075` potencia, `076` leyes de Kirchhoff. **16 ítems
    cada uno = 80**, más **30 ideas erróneas nuevas**. Generadas por
    `scripts/generar_migracion_items.py` desde los cinco JSON de `contenido/items/`, que son la
    fuente de verdad: el `.sql` no se edita, se regenera.
    **Un `topic` por módulo** (`electronica_capacitores`, `electronica_ohm`, …), copiando `040`:
    con ADR-038 aprobado y sin implementar, `next_question` filtra solo por `topic`, así que un
    banco de eje no puede servir el test de un módulo — y este curso necesita saber **qué** repasar.
    ⭐ **16 y no 12, y el número no sale de la cobertura sino del reintento.** La cobertura pedía ~8
    (≥6 ítems por 1,0 logit sobre una banda de 1,2). **16 = `2 × max_items`**, que es el umbral a
    partir del cual un reintento **puede** no repetir ni un solo ítem: con 12 y `max_items = 8`, dos
    intentos comparten al menos `8 + 8 − 12 = 4` por pigeonhole. Como **el reintento es el mecanismo
    de remediación del track** (D-73), un banco por debajo de `2 × max_items` hace que el umbral de
    `min_theta` se abra por memoria y no por aprendizaje. Ver **R-47** y **T-164**.

75. `migrations/077_test_configs_de_electronica.sql` — ✅ **aplicada 2026-09-20 por el agente**
    (ADR-040) · **T-160.** Las cinco filas de `test_configs` que hacen **rendible** el track,
    encadenadas por `prerequisite_topic` y con **`initial_theta` explícito**.
    ⭐ **`initial_theta` es lo que `065` no hizo.** Aquellos dos bancos quedaron con el −1,0 por
    defecto de `048`; con `|Δθ| ≤ 0,4`, llegar a −2,8 cuesta **mínimo 5 ítems solo de viaje**, o sea
    más de la mitad de un test de 8, y lo paga el alumno más débil (causa (b) de **R-44**). Acá cada
    test arranca en el **centro de la banda de su módulo**, así los 8 ítems son medición.
    **Guarda doble, probada:** se niega si no hay 5 módulos (`071` sin aplicar) y se niega si algún
    banco no llega a **16** ítems activos (`072`…`076` sin aplicar).

> **Verificación de `071`…`077` (2026-09-20).** Las siete aplicadas **en orden** sobre un
> **PostgreSQL 17.11** desechable —la versión mayor de producción— con réplica del estado previo
> (`modules`, `class_slots`, `module_prerequisites`, `misconceptions`, `questions`, `test_configs`).
> Todas aplican limpias con `ON_ERROR_STOP=1` y **la segunda pasada completa deja 80 ítems, 5
> configs y 5 módulos — no 160, 10 y 10**.
>
> **Los nueve controles del banco, en verde:** 80 ítems · **0** sin `module_id` · **0** sin ninguna
> idea errónea (el modo de fallo de `064`) · **0** con idea errónea en la alternativa correcta ·
> **0** sin las cuatro explicaciones · **0** fuera de la banda de su módulo · **0** enunciados
> repetidos · **0** LaTeX con doble escape (`047`) · 30 ideas erróneas, **0 huérfanas**.
> Reparto de claves sobre los 80: **20 y 20 y 20 y 20 — 25 % exacto en las cuatro** (R-35 pide que
> ninguna pase de 40 % y que se usen las cuatro).
>
> ⭐ **Y el control que motivó subir a 16:** para los cinco bancos,
> `max(2 × max_items − banco, 0) = 0`, o sea que **un reintento puede no repetir ni un solo ítem**.
> Con 12 el mínimo forzado era 4. La guarda de `077` se probó disparando con un banco en 15.
>
> Los cinco `initial_theta` caen **dentro** de la banda de su módulo, y las dos guardas de `077` se
> probaron disparando: con un banco en 5 ítems activos y con los módulos borrados.
>
> ⚠️ **R-42 medido:** `test_configs` activos pasa de **14 a 19**. Son cinco bancos más en el selector
> de todo estudiante de PAES. `077` trae la alternativa (`active = false`) escrita en su cabecera.


76. `migrations/078_electronica_resources.sql` — ✅ **aplicada 2026-09-20 por el agente** (ADR-040) ·
    **T-161, épica E10.** **10 recursos** de capa 1 para los cinco módulos de `electronica`: una
    **guía** (`text`) y una **práctica guiada** (`exercise`) por módulo, todos con
    `published = false` (ADR-016 §1). Texto redactado desde cero; las referencias —Boylestad, Irwin &
    Nelms, Edminister— van a nivel de **capítulo**, nunca de página.
    Las guías están escritas para leerse **después de fallar un ítem**, así que arrancan por el error
    y no por la definición. Las prácticas traen el **desarrollo escrito**, y en capacitores y
    Kirchhoff la comprobación de sentido común va explícita.

    ⭐ **ES LA PRIMERA MIGRACIÓN QUE ESCRIBE EN `resource_misconceptions`.** `045` creó esa tabla y
    llevaba **un año sin una sola fila** — el lugar **A8** del mapa de la unidad, que dice que sin
    ella la capa 1 de «Mi plan» es genérica **por estructura** y no por falta de contenido. `078`
    escribe **60 filas** que cubren las **30 ideas erróneas del track**: `rank = 1` al recurso que
    ataca el error de frente, `rank = 2` al otro del mismo módulo. **Ninguna idea errónea queda sin
    material** (P4.3 de la skill).
    El reparto sigue un criterio: las ideas **conceptuales** las ataca la guía —lo que falta es la
    idea—; las **procedimentales**, la práctica —lo que falta es hacerlo—.

    ⚠️ **Y hoy no cambia nada en pantalla, a propósito.** Ningún namespace lee
    `resource_misconceptions` (verificado con `grep` sobre `src/`): «Mi plan» sigue cruzando por
    módulo en `plan/resources-for-deficits`. Es el dato listo para **T-54**, y se escribió ahora
    porque hacerlo junto con los recursos cuesta cero y reconstruirlo después es caro — **quien
    escribe el recurso es quien sabe qué error ataca**.

> **Verificación de `078` (2026-09-20).** Contra un **PostgreSQL 17.11** desechable con `071`…`076`
> aplicadas antes, y después **contra la base real**. Aplica limpia, **idempotente** (la segunda
> pasada deja 10 y 60, no 20 y 120), y los cinco controles del pie en verde:
>
> | Control | Producción |
> |---|---|
> | Recursos | **10** — 5 `text` + 5 `exercise` |
> | Publicados | **0** (es lo correcto hasta auditarlos) |
> | Filas de `resource_misconceptions` | **60** |
> | Ideas erróneas del track sin material | **0** de 30 |
> | Reparto por `rank` | 30 en `1` · 30 en `2` |
> | Filas de `resource_misconceptions` **en toda la base** | **60** — o sea que antes había **0** |
>
> ✅ **Publicados por el owner el 2026-09-20**, tras revisarlos. Verificado: los 10 con
> `published = true`. Hasta ese momento la policy `resources_select_published` los escondía sin
> avisar y «Mi plan» mostraba el mapa de errores sin material de apoyo.

> ## 🔧 2026-09-20 — dos correcciones de contenido que encontró `verificar_unidad.py` (T-162)
>
> Los cinco JSON de unidad se escribieron **después** de aplicar las migraciones —generados desde la
> base, para que no pudieran mentir sobre lo aplicado— y el séptimo auditor pasó con **0 errores**.
> Aun así encontró dos cosas:
>
> **1. Una idea errónea sin criterio de exclusión.** `capacitores/mas-capacitancia-en-serie` no
> decía cuándo **NO** usarla, y es justo la que se solapa con
> `capacitores/serie-y-paralelo-como-resistores` — el duplicado que ese campo existe para impedir.
> Corregida en `contenido/items/electronica_capacitores.json` (la fuente), regenerada `072`, y
> **actualizada en producción con un `update`**: `072` inserta las ideas erróneas con
> `on conflict (slug) do nothing`, así que **reaplicar la migración no habría corregido nada**. Es
> una propiedad del generador que conviene tener presente: *las descripciones no se actualizan
> reaplicando*. Verificado: las **30** del track tienen ahora su «NO usar».
>
> **2. Cinco falsos positivos del propio auditor** (T-165), que avisaba que un `test_configs` de
> módulo «no se puede aplicar hasta ADR-038» cuando `077` llevaba un día aplicada y funcionando.
> Conocía una sola salida a la Junta 1. Corregidos el auditor —con las dos ramas probadas— y la
> referencia `las-tablas-y-su-sentido.md` §5.
>
> ✅ **Y el owner revisó y publicó los 10 recursos** el mismo día: los 10 con `published = true`,
> verificado contra la base. El estudiante ya ve material de apoyo en su plan.

> ## ✅ Aplicadas en producción el 2026-09-20 — el track `electronica` existe
>
> **`071` la aplicó el owner** (es estructural: dos `alter table ... constraint` sobre `modules` y
> `class_slots`, y `claude_ddl` no es dueño de ninguna de las dos). **`072`…`077` las aplicó el
> agente** con `claude_ddl`: son migraciones de **contenido** —`insert` sobre `misconceptions`,
> `questions` y `test_configs`— que es exactamente lo que ADR-040 le permite. La línea entre agregar
> contenido y cambiar la forma de la base funcionó sin discusión.
>
> **Verificación corrida después, contra la base real:**
>
> | Control | Resultado |
> |---|---|
> | Módulos | **5**, con banda, `historical_year`/`era`/`figure`/`blurb` completos y 4 prerrequisitos `duro` |
> | Ítems | **80** — 16 por banco |
> | Ideas erróneas | **30**, ninguna huérfana |
> | Sin `module_id` | **0** |
> | Sin diagnosticar (las 4 misconceptions en null) | **0** |
> | Idea errónea en la alternativa correcta | **0** |
> | Sin las cuatro explicaciones | **0** |
> | Fuera de la banda de su módulo | **0** |
> | Claves | **A 20 · B 20 · C 20 · D 20** — 25 % exacto |
> | `test_configs` | **5**, encadenadas, con `initial_theta` y `min_theta` explícitos |
> | Sufijos repetidos en los 58 módulos | **0** |
>
> ⚠️ **Corrección de un número que estas fichas daban mal.** Decían que el selector pasaba de **18 a
> 23** bancos activos. Ese número salía del **fixture de prueba**, no de producción. **Medido en la
> base real: de 14 a 19.** El riesgo R-42 no cambia de naturaleza —14 de los 19 bancos activos le son
> ajenos al estudiante de PAES— pero la cifra era inventada por el entorno de verificación, y eso es
> justo lo que este archivo existe para no dejar pasar.

> ## 🔎 2026-09-19 — lo que la verificación de `070` encontró del **resto** del esquema
>
> Al comparar los privilegios de `intentos` con los de `tests`, salió esto. **No es un defecto de
> `070`** —`070` es la única tabla que está bien— sino de todo lo demás:
>
> ```
> intentos  | authenticated=arw/postgres          ← acotada a propósito por 070
> tests     | anon=arwdDxt/postgres               ← TODO, incluidos delete (d) y truncate (D)
> tests     | authenticated=arwdDxt/postgres      ← ídem
> ```
>
> Medido sobre las **19 tablas** de `public`: **18 le dan a `anon` privilegio de TRUNCATE** y 18 le
> dan DELETE a `authenticated`. Son las *default privileges* que Supabase deja puestas sobre el
> esquema `public`, y ninguna migración de este repositorio escribió nunca un `grant` de tabla, así
> que nadie las miró. Las dos excepciones son **`intentos`** (acotada por `070`) y **`questions`**,
> que tiene `anon=awdDxt` — **sin `r`**: alguien le quitó el SELECT a `anon` y le dejó insert,
> update, delete y truncate.
>
> ### ⚠️ Qué tan grave es: **no es explotable hoy**, y conviene decir por qué exactamente
>
> 1. **`anon` y `authenticated` son `rolcanlogin = f`** (verificado): no se pueden conectar directo a
>    Postgres. Se asumen vía JWT a través de PostgREST.
> 2. **PostgREST no expone TRUNCATE.** No hay verbo HTTP que lo alcance. Y `TRUNCATE` es justamente
>    la operación que **RLS no filtra**, así que si alguna vez fuera alcanzable, la policy no
>    salvaría nada.
> 3. Para `select`/`insert`/`update`/`delete`, **RLS sí filtra**, y ninguna tabla tiene policy para
>    `anon` sobre datos de estudiantes.
>
> O sea: las puertas están abiertas y no hay picaporte del lado de afuera. Pero es **exactamente la
> lección que ADR-040 ya escribió al revés** —*«el grant es la puerta, la policy es el límite»*—:
> hoy todo el esquema descansa en que la RLS esté bien, **sin segunda línea**. `intentos` muestra lo
> que cuesta tenerla: dos líneas de SQL.
>
> Registrado como **[[../project-memory/RISKS]] R-46** y **[[../project-memory/BACKLOG]] T-163**.

> ## 🔒 2026-09-18 — `public.tests_sin_identidad` (vista), y el defecto que la motivó
>
> **No es una migración numerada**: vive en `supabase/acceso_correccion_tests_pii.sql`, junto al
> resto del acceso del agente. **Aplicada por el owner el 2026-09-18.**
>
> **El defecto:** `tests` tiene una columna **`email-user` poblada en las 350 filas** y el jsonb
> `test` una clave `email` en 348. ADR-040 había dado `select` sobre `tests` a los roles del agente
> afirmando que la tabla «no tiene email ni nombre». Durante ese rato el rol de lectura podía ver el
> correo de cada estudiante que rindió —incluidos menores del liceo, **R-28**—.
>
> **Por qué se escapó:** la lista de exclusiones se armó leyendo este archivo, donde `tests` figura
> como la tabla de resultados. La columna existe desde el MVP, con un guion en el nombre que ninguna
> búsqueda de «email» encuentra, en una tabla que **preexiste al esquema versionado** (mismo motivo
> que `questions`, L-46).
>
> **El arreglo:** se revoca `select on tests` a `claude_ro` y `claude_ddl`, se borran sus policies, y
> se crea `tests_sin_identidad` — `id`, `created_at`, `user_id`, `topic`, `theta`, `engine_version`,
> `origin` y `(test::jsonb) - 'email'`. Las columnas se listan **una por una a propósito**: si mañana
> alguien agrega otra con datos personales a `tests`, la vista no la arrastra sola.
>
> **Verificado después de aplicar:** `permission denied` para los dos roles sobre `tests` y sobre
> `email-user`; la vista devuelve **350 filas**, con **0** claves `email` y **0** arrobas en todo el
> jsonb, y conserva las **280** de `origin = 'student'` que G-2 necesita.

70. `migrations/068_banco_de_operaciones_fundamentales.sql` — ✅ **aplicada 2026-09-18 por el agente**
    (primera migración aplicada bajo ADR-040) · **SESSION-044.** 8 ítems bajo `topic = 'numeros'` para
    `aritmetica/operaciones_fundamentales`, más **8 ideas erróneas nuevas**. Generada por
    `scripts/generar_migracion_items.py` desde `contenido/items/numeros_operaciones_fundamentales.json`,
    que es la fuente de verdad: el `.sql` no se edita, se regenera.
    **Para qué:** ese módulo existe desde `031` y tiene banda explícita desde `060` (`[-2,7 · -1,3]`),
    y **tenía cero ítems, cero recursos y cero ideas erróneas**. La propia `031` lo anticipó en un
    comentario y nadie volvió. Medido con la métrica M3 de la skill `unidad-de-contenido`: era uno de
    los tres únicos módulos del producto con hueco real, y el único cuyo hueco era el banco entero.
    Es el módulo del estudiante que todavía no automatizó sumar, restar, multiplicar y dividir — el
    piso real del eje de números. Con **ADR-038** pasa a ser un test rendible, y sin ítems pararía en
    `:exhausted` en la primera pregunta.

71. `migrations/069_banco_de_inecuaciones.sql` — ✅ **aplicada 2026-09-18 por el agente** ·
    **SESSION-044.** 10 ítems bajo `topic = 'algebra'` para `algebra/inecuaciones`, más **6 ideas
    erróneas nuevas**. Mismo origen: `contenido/items/algebra_inecuaciones.json`.
    **Para qué:** el segundo de los dos módulos que `031` creó y nunca se llenaron. El eje de la tanda
    es una sola idea —multiplicar o dividir por un negativo da vuelta la desigualdad—, que es el único
    paso donde una inecuación deja de comportarse como una ecuación; cuatro de los diez ítems la
    atacan desde ángulos distintos.

> **Verificadas juntas (2026-09-17)** contra un **PostgreSQL 14.18 desechable**, con una réplica
> mínima de `modules`, `misconceptions` y `questions` tal como los dejaron `001`, `027`, `031` y `057`.
> Los nueve controles coinciden: **0** ítems sin `module_id` (el modo de fallo de T-119), **0** ítems
> sin ninguna idea errónea (el de `064`), **0** fuera de su banda, **0** ideas erróneas huérfanas,
> **0** con idea errónea en la alternativa correcta, **0** enunciados duplicados, **0** LaTeX con
> doble escape (`047`); **18 ítems** y **14 ideas erróneas** en total. **Idempotentes:** la segunda
> pasada completa deja los mismos 18 y 14, no 36 y 28.
>
> ⚠️ **Dos defectos que la base desechable encontró y que ningún script había visto.** (1) Dos ítems
> tenían **las cuatro** `misconception_*` en null: verificaban bien y **no diagnosticaban nada**, que
> es exactamente el modo de fallo de `064`. Se catalogaron dos ideas erróneas más y se corrigió el
> JSON. (2) La consulta de «fuera de banda» daba **dos falsos positivos**: `questions.difficulty` es
> `real` y `modules.band_min` es `numeric`, así que un ítem en `-2.7` dentro de una banda que empieza
> en `-2.7` sale fuera. **Toda comparación entre ambas lleva `::numeric(4,2)`** — corregido también en
> la skill, que traía la consulta mala.
>
> ⚠️ **Entran con verificación mecánica solamente**, por decisión explícita del owner el 2026-09-17:
> quedan bajo **R-41** junto a los otros 402. `difficulty` es **hipótesis autoral**, no medición
> (R-17, G-2).

> ## ✅ Aplicadas en producción el 2026-09-18, y son las primeras de ADR-040
>
> Las aplicó el **agente** con el rol `claude_ddl`, no el owner. Verificación corrida después,
> contra la base real: los **18 ítems** entraron con su `module_id` resuelto (**0** sin módulo),
> **0** fuera de la banda de su módulo, las **14 ideas erróneas** nuevas existen y **ninguna quedó
> huérfana**, **0** ítems sin diagnosticar y **0** con idea errónea en la alternativa correcta.
>
> ⚠️ **Lo que la base corrigió de estas fichas antes de aplicarlas.** Decían que los dos módulos
> tenían «cero ítems», y eso se había medido sobre los JSON del repo, no sobre producción. La
> consulta real mostró **21 ítems** colgando de `aritmetica/operaciones_fundamentales` y **2** de
> `algebra/inecuaciones`. Al mirarlos: los 21 son 20 del banco mezclado `diagnostico` —de −3,0 a
> +2,9, que no es una escala de ese módulo— más 1 con dificultad +1,80, fuera de su propia banda y
> en un topic `active = false`; y los 2 de `inecuaciones`, también inactivo. **Desde el diagnóstico
> del eje los dos módulos eran igual de inalcanzables**, así que la premisa se sostuvo y la
> redacción no: las notas de las dos migraciones se corrigieron y se regeneró el `.sql` antes de
> aplicar. Es la cuarta vez en dos días que la documentación dice una cosa y la base otra.


72. `migrations/070_intentos.sql` — ✅ **aplicada 2026-09-19 por el owner** ·
    **SESSION-047, T-134, [[../adr/ADR-036-el-intento-en-curso-vive-en-su-propia-tabla]].**
    Crea `public.intentos`: una fila por **intento de diagnóstico iniciado**, con su rastro parcial
    (`parcial` jsonb, `n_respuestas`), su origen y sus relojes. Más `public.intento_abandonado()`,
    dos triggers, tres policies, privilegios explícitos, dos índices, `tests.intento_id` (nullable,
    FK) y `tests_sin_identidad` recreada con esa columna al final.
    **Para qué:** hasta hoy el diagnóstico escribía **una sola vez**, en `:test/complete`. Quien
    respondía ocho ítems y cerraba la pestaña no dejaba nada, así que «cuáles no lo hicieron» no se
    podía responder (**G-1**) y los ítems que hacen abandonar desaparecían de la muestra de
    calibración (**G-2**).
    **Por qué tabla nueva y no una columna en `tests`:** `tests` es append-only desde el cliente
    (`023`) y **al menos seis lectores suyos asumen «fila = medición terminada»** — entre ellos
    `universo.access/best-theta-by-topic`, que toma el **máximo** θ, así que un θ parcial inflado
    desbloquearía un topic no ganado. Con tabla aparte los seis siguen correctos sin tocar una línea.
    **El abandono no se escribe, se deriva:** `cerrado_en is null` y sin latir hace más de 2 horas
    (≈20× la duración mediana medida de 5,8 min). Nadie puede avisar que cerró la pestaña, así que no
    hay estado que alguien tenga que poner ni job que lo ponga.
    **Lo que decide el servidor:** `origin` (trigger, como `067`), `updated_at` y **`cerrado_en`** —
    el cliente manda la intención de cerrar, no la hora. Y `intentos_sellar` le saca `email` y
    `email-user` al jsonb **venga de donde venga**: es L-46 cortado antes de que exista la primera
    fila.
    ⚠️ **A `claude_ro` y `claude_ddl` NO se les da lectura sobre `intentos`**, y es una decisión, no
    un olvido: sin policy no hay acceso, que es el default seguro. `parcial` sale recortado, pero L-46
    enseñó que eso se afirma después de mirar filas reales.
    **Consulta:** toda métrica de estudiantes filtra `origin = 'student'`, igual que en `tests`.

> **Verificación de `070` (2026-09-19).** Contra **PostgreSQL 14.18 y 17.11 desechables** (TCP; el
> socket Unix del scratchpad excede los 103 bytes que permite Postgres) con una réplica del estado
> **previo** —`auth.users`, `auth.uid()`, `profiles`, `is_admin()`, `tests` con sus dos policies y
> `tests_sin_identidad` sin `intento_id`— **y un PostgREST 12.0.3 real** con JWT firmados, que es lo
> único que prueba que policies y privilegios se alinean con un `PATCH`.
>
> ⚠️ **Se verificó primero contra 14.18 y eso estaba mal: producción es PostgreSQL 17.6.** Se
> descubrió al conectarse a la base para intentar aplicarla. La batería completa se repitió contra un
> **17.11** y el comportamiento es **idéntico** en los dos — pero eso no se sabía antes de medirlo.
> **Regla que queda: la verificación se hace contra la versión mayor de producción**, no contra la
> que está instalada en la máquina.
>
> Aplica limpia con `ON_ERROR_STOP=1`, **idempotente**, y la reversión del pie funciona y deja volver
> a aplicarla. El trigger pisa `origin` aunque el cliente mande `admin_preview`; `email` y
> `email-user` no entran ni por SQL ni por HTTP; dueño, topic, origen y fecha de inicio no se mueven;
> otro estudiante no ve ni escribe el intento ajeno; `anon` no ve la tabla; `DELETE` da
> `42501 permission denied` **por privilegio**, no solo por falta de policy; un intento cerrado no se
> reescribe (por policy desde el cliente, por excepción desde el SQL Editor). Ciclo completo por HTTP:
> abrir `201`, latir `204`, cerrar `204`, guardar el test con su `intento_id` `201`.
>
> ⚠️ **Dos defectos que solo aparecieron contra PostgREST, no contra SQL.**
> (1) **`cerrado_en` venía del reloj del cliente.** Con un navegador atrasado el `update` de cierre
> falla entero por el check `intentos_cierre_posterior`, el intento queda abierto para siempre y
> **alguien que terminó su diagnóstico cuenta como abandono** — en la única métrica que esta migración
> existe para producir. Medido: con la hora del cliente en 1970, `PATCH 400`; con la intención y
> `now()` del servidor, `204` y `cerrado_en` correcto.
> (2) **Con la tabla ausente, PostgREST 12.0.3 responde `404` con el cuerpo vacío** — sin `PGRST205`,
> sin mensaje, sin nada que reconocer por texto. Reconocer el error por su mensaje habría dejado el
> rastro encendido reintentando contra una fila inexistente. La regla que no depende de la versión de
> PostgREST: **si la apertura falla, por lo que sea, se apaga**; un latido suelto que falla no apaga
> nada, porque el siguiente reescribe todo.
>
> ⛔ **La aplica el owner, no el agente.** Medido contra producción con el rol `claude_ddl` de
> ADR-040, tres sentencias fallan: `alter table public.tests add column intento_id` →
> *must be owner of table tests*; `references auth.users(id)` →
> *permission denied for schema auth*; `create or replace view tests_sin_identidad` →
> *must be owner of view*. `claude_ddl` **sí** podría crear `public.intentos` —tiene `create` sobre
> `public`—, y ahí hay un segundo motivo para que no lo haga: quedaría como **dueño de la tabla**, y
> el dueño está **exento de su propia RLS** salvo `force row level security`. No es un defecto del
> rol: es la línea que ADR-040 trazó entre agregar contenido y cambiar la forma de la base.
>
> **Comprobado contra producción en solo lectura** (los tres supuestos de la migración):
> `gen_random_uuid()` existe, `public.is_admin()` existe y es `security definer`, y
> `tests_origin_valido` admite exactamente `'student'` y `'admin_preview'` — los dos valores que
> `intentos.origin` copia.
>
> **Orden invertido medido (R-39, tercera instancia):** con el bundle antes que la migración, el
> `insert` de `tests` con `intento_id` devuelve `PGRST204` y **se perdería el diagnóstico recién
> rendido**. De ahí el reintento sin la columna, verificado: `400` → `201`. **Migración primero,
> bundle después.**

> ## ✅ Aplicada en producción el 2026-09-19 por el owner, y verificada contra la base real
>
> **La aplicó el owner desde el SQL Editor**, como corresponde: el agente lo intentó primero con
> `claude_ddl` y tres sentencias lo exceden (ver arriba). Verificación corrida después con
> `claude_ddl`, en solo lectura y contra el catálogo:
>
> | Control | Resultado |
> |---|---|
> | Tabla, dueño y RLS | `intentos`, dueño `postgres`, `rls = t` — **misma postura que `tests`** |
> | Columnas | Las 10, con sus defaults (`gen_random_uuid()`, `'student'`, `'{}'::jsonb`, `now()`) |
> | Constraints | Las 6, incluida `FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE` |
> | Triggers | `intentos_marcar_origen` (**solo INSERT**) · `intentos_sellar` (**INSERT OR UPDATE**) |
> | `security definer` | **Solo `intentos_marcar_origen`**, con `search_path = public`, igual que `is_admin()`. `intentos_sellar` e `intento_abandonado` **no** lo son, que es lo correcto |
> | Policies | Las 3, con el `using`/`with check` que corresponde a cada verbo |
> | Índices | `intentos_abiertos_idx` (parcial sobre `cerrado_en is null`) y `intentos_user_topic_idx` |
> | `intento_abandonado()` | `stable`, y devuelve `f / t / f` en los tres casos de la regla |
> | `tests.intento_id` + FK | `tests_intento_fk … REFERENCES intentos(id) ON DELETE SET NULL` |
> | `tests` intacta | **351 filas**, 280 de `origin = 'student'`, **0** con `intento_id` (todavía no hay bundle publicado) |
> | La vista | 9 columnas con `intento_id` al final; **0** claves `email`, **0** arrobas |
>
> ⭐ **El control que más vale, porque es el que `information_schema` esconde.** Con `claude_ddl`,
> `information_schema.role_table_grants` devuelve **0 filas** para `intentos` — precisamente porque el
> rol no tiene ningún privilegio sobre ella, que es la decisión de esta migración. Hubo que leer
> `pg_class.relacl`:
>
> ```
> intentos | authenticated=arw/postgres        ← select, insert, update. SIN delete, SIN truncate
> intentos | service_role=arwdDxt/postgres     ← el rol de servidor, como en toda la base
>                                                 (anon NO aparece: no tiene nada)
> ```
>
> Y comprobado de verdad, no por catálogo: `select count(*) from public.intentos` con **los dos**
> roles del agente devuelve `ERROR: permission denied for table intentos`.
>
> ⏳ **Lo que todavía no está verificado de punta a punta:** no hay ninguna fila. El bundle con el
> rastro **no está publicado**, así que `intentos` está vacía y `tests.intento_id` es nulo en las 351.
> La verificación de comportamiento en producción se completa cuando alguien rinda un diagnóstico.

> **Verificación de `067` (2026-09-13).** Contra un **PostgreSQL 14.18 desechable** con fixture a
> mano (`auth.uid()`, `profiles`, `tests`, `is_admin()`): aplica limpio con `ON_ERROR_STOP=1`; el
> backfill separa 2 corridas de admin de 3 de estudiante; un alumno que **envía**
> `origin = 'admin_preview'` igual queda `student`, y un admin que envía `'student'` igual queda
> `admin_preview` (no falsificable en ninguna de las dos direcciones); un insert sin sesión queda
> `student`; el check rechaza cualquier otro valor; **la segunda corrida no cambia nada** (idéntico
> hash de `(id, origin)`); y la reversión deja la tabla como estaba **sin perder filas**.

> **Verificación de `062`…`066` (2026-09-09).** Contra un PostgreSQL 14 desechable construido
> **aplicando las migraciones reales del repositorio** —fixture escrito a mano solo para las tablas
> previas al MVP, que ninguna migración crea—: las cinco aplican limpio en orden; las dos guardas de
> `065` frenan con el mensaje correcto; la segunda corrida no cambia **nada** (idempotencia
> verificada por hash de todo el contenido); `next_question` devuelve ítem en los dos bancos y en
> θ = −2, 0 y +2, con el módulo que corresponde a esa altura (`kirchhoff` → `magnetismo` →
> `resonancia`); doce ítems consecutivos sin agotar ninguno de los dos bancos; un ítem marcado
> `active = false` deja de servirse; y la reversión completa deja la base exactamente como estaba.
> ⚠️ Sigue siendo un fixture y no la base real (R-02, T-48): cubre la lógica de las migraciones, no
> el estado de producción. Antes de aplicar, correr `supabase/queries/verificacion_esquema.sql`.

68. Deploy `functions/send-enrollment-emails` + secret `RESEND_API_KEY`


> ✅ **`028` y `029` aplicadas por el owner el 2026-08-10** y verificadas con las tres consultas del
> final de `029`: **0 topics fuera de forma canónica** en las tres tablas, e ítems sin `module_id`
> de 199 → **156**.
>
> ✅ **`030`, `031` y `032` aplicadas por el owner el 2026-08-10.** Con eso **no queda ninguna
> migración pendiente**: el repositorio y la base quedan alineados por primera vez desde que se
> lleva este registro.
>
> Estado resultante: ítems sin `module_id` **156 → 128**; módulos **18 → 20**
>
> ✅ **`033`–`040` aplicadas por el owner el 2026-08-11.** Son el experimento de Mecánica Cuántica y
> **NO son parte del producto**; se aplicaron porque son opcionales e inertes para el estudiante
> (`active = false`). Ver la sección de más abajo y
> [[../adr/ADR-018-track-experimental-cuantica]]. De paso confirman que `027` **sí estaba aplicada**:
> `034` inserta en `public.misconceptions` y en las columnas `misconception_*_id`, así que no habría
> podido correr si esa tabla no existiera. Queda cerrada la contradicción anotada en
> [[../project-memory/BACKLOG]] T-57.
> (`algebra/inecuaciones` y `aritmetica/operaciones_fundamentales`, D-37); piso de esfuerzo por
> defecto **3 s → 2 s** (calibrado con datos, T-59).
>
> Los **128** que quedan sin módulo son `diagnostico` (84) y `paes_m1` (44): bancos mezclados que
> necesitan clasificación **por ítem** (contenido, ADR-016), no SQL. Ninguna migración los cierra —
> ver [[../project-memory/BACKLOG]] T-60.
>
> **Corrección 2026-08-10:** `022` figuraba sin marca de aplicada y se sospechó que estaba
> pendiente. **Lo estaba solo en la documentación**: el owner verificó con
> `select column_name from information_schema.columns where table_name = 'test_configs' and
> column_name = 'display_name'` y la columna existe. La marca faltaba desde el 2026-08-08, no la
> migración. Cierra [[../project-memory/BACKLOG]] T-42.

> **Nota de orden:** `026` va antes que `025` pese a la numeración. `025` es la revocación y su
> precondición es el bundle publicado, no el número. Ver ADR-015 §Secuencia de despliegue.

> ⚠️ **El esquema no arranca en `001`.** `public.questions` y `public.is_admin()` **preexisten** a
> las migraciones versionadas (`001_mvp_schema.sql` declara "Requiere: `public.is_admin()`,
> `public.questions`" y solo le agrega `module_id`). Aplicar `001`…`025` sobre una base vacía
> **no** reproduce producción. Falta una migración `000_baseline` — ver
> [[../project-memory/BACKLOG]] T-48.

## Recursos originales con numeración Baldor como índice (`018_baldor_resources.sql`)

Contenido pedagógico (capa 1) para los 6 módulos del track `aritmetica`, redactado desde cero y
calibrado a PAES M1 -- **no** transcrito de la Aritmética de Baldor, que sigue con derechos de
autor vigentes (ver comentario de cabecera en la migración). La numeración de apartados de Baldor
se usa solo como referencia bibliográfica en el `title` de cada recurso (ej. `"Baldor Aritmética
§447 -- ..."`), igual que un "ver Baldor §N" en clase.

De paso corrige el `historical_blurb` de `aritmetica/enteros`: la Aritmética de Baldor (a
diferencia del Álgebra) solo cubre enteros no fraccionarios (positivos); el blurb sembrado en
`002`/`004` prometía enteros con signo (deudas, temperaturas) sin contenido que lo respalde. Los
negativos quedan pendientes de otra fuente.

Los 20 recursos se siembran con `published = false` -- requieren revisión pedagógica del profesor
en Admin → Recursos antes de publicarse (BL-01: la autoría de contenido es trabajo humano).

## Recursos originales del Álgebra de Baldor (`019_baldor_algebra_resources.sql`)

Mismo criterio que `018` (contenido redactado desde cero, numeración de Baldor solo como cita),
aplicado a los 5 módulos del track `algebra`. Alcance acotado a PAES M1: expresiones, ecuaciones
de primer y segundo grado, sistemas, factorización, funciones lineales/cuadráticas -- quedan fuera
a propósito radicales complejos, ecuaciones de grado superior y logaritmos (están en el libro, no
en el temario).

Cierra el hueco dejado por `018`: el Álgebra sí trae "operaciones fundamentales con números
relativos" (suma/resta/multiplicación/división con signo), así que se agrega un recurso a
`aritmetica/enteros` y se corrige de nuevo su `historical_blurb` para reflejar ambos bloques
(enteros no fraccionarios de la Aritmética + enteros con signo del Álgebra).

19 recursos nuevos, todos `published = false` -- misma revisión pendiente que `018`.

## Configuración de parada por banco y prerequisitos (`020_test_configs.sql`)

Nueva tabla `test_configs`, keyed por `topic` (no por `modules`: el mapeo `topic → module-slug` es
parcial, ver `OPEN_QUESTIONS` Q-06, y `topic` es hoy el único identificador real y completo de un
banco). Columnas: `min_items`, `max_items`, `se_threshold`, `max_minutes` (nullable = sin límite
de tiempo), `prerequisite_topic` (self-FK nullable, `on delete restrict`), `min_theta` (escala
interna -3..3, exige `prerequisite_topic` no nulo), `active` (para borradores). Seed: un row por
cada `topic` ya existente en `questions`, con los valores globales actuales
(`min_items=5, max_items=12, se_threshold=0.35`) y **sin prerequisito** -- el deploy no bloquea a
nadie hasta que un admin configure una cadena real desde Admin → Configuración de tests. Detalle
completo del diseño en [[../adr/ADR-013-config-parada-por-banco-y-prerequisitos]].

RLS: SELECT para `authenticated` solo ve `active = true` (o `is_admin()`); INSERT/UPDATE/DELETE
solo admin.

## Historial de topic/theta y RLS propia en tests (`021_tests_topic_theta_rls.sql`)

`tests` gana columnas propias `topic` y `theta` (antes solo vivían dentro del JSON de la columna
`test`) -- las necesita `universo.access/unlocked-topics` para calcular, por usuario, el mejor θ
alcanzado por topic sin tener que parsear JSON en cada consulta. Backfill best-effort de `topic`
histórico (`test::jsonb ->> 'topic'`; **verificar el tipo real de la columna `test` antes de
aplicar en producción**, ver ADR-013). El backfill de `theta` histórico se omite a propósito (cast
numérico masivo sobre datos ya guardados, más riesgoso que el valor que aporta).

Agrega también `tests_select_own` (`user_id = auth.uid() or is_admin()`) y, de forma idempotente,
`enable row level security` -- no había evidencia en ningún archivo versionado de que `tests`
tuviera RLS habilitado ni ninguna policy de SELECT propia del usuario (solo `tests_select_admin`
en `admin_rls.sql`).

## Nombre de fantasía por evaluación (`022_test_config_display_name.sql`)

`test_configs` gana `display_name text` (nullable) + check `test_configs_display_name_not_blank`
(un nombre en blanco debe guardarse como `null`, para que exista una sola representación de "sin
nombre configurado"). Es el nombre que ve el estudiante en el selector de evaluaciones; hasta
`021` ese nombre salía de un diccionario estático hardcodeado en el cliente que solo cubría un
puñado de topics conocidos (BACKLOG T-42).

**Sin backfill a propósito:** con `display_name = null` el cliente cae al diccionario estático y,
si el topic tampoco está ahí, al propio `topic` con guiones bajos como espacios (ver
`universo.catalog/topic-label`). Nadie ve un cambio hasta que un admin escriba un nombre.

RLS: sin cambios -- la columna viaja dentro del mismo `select` ya cubierto por `test_configs_select`
de `020`, y solo un admin puede escribirla (`test_configs_update_admin`).

## Auditoría de RLS y cierre del banco de ítems (`023`, `024`, `025`)

Auditoría completa de `pg_policies` + `relrowsecurity` ejecutada el 2026-08-08 sobre el proyecto
real. Diseño en [[../adr/ADR-015-item-sin-respuesta-en-el-cliente]]; resultados en
[[../project-memory/OPEN_QUESTIONS]] Q-12.

**Hallazgo principal:** `questions` tenía `"Enable read access for all users"` (SELECT,
`authenticated`, `using true`), creada desde el dashboard y ausente del repo. Como las policies
PERMISSIVE se combinan con OR, la regla efectiva era `true` y `questions_select_admin` estaba
**inerte**: el banco completo, con `correct_option` y `error_a..d`, era descargable por cualquier
cuenta.

- **`023_rls_limpieza.sql`** — inocua, aplicable en cualquier momento. Elimina la tabla huérfana
  `dashboard` (0 filas, sin referencias en código ni migraciones), consolida las cuatro policies de
  `tests` en dos, y versiona las creadas por UI (`visitor`, `notifications`, `contacto`).
- **`024_questions_rpc.sql`** — **aditiva**, no rompe el bundle actual. Crea `next_question`
  (devuelve un ítem sin respuesta ni explicaciones, con la selección por cercanía a θ resuelta en
  SQL) y `score_answer` (corrige en servidor, devuelve solo el booleano y la explicación de la
  alternativa elegida). Ambas `security definer` con guardia `auth.uid() is not null`, mismo patrón
  que `014`.
- **`025_questions_revoke_lectura_directa.sql`** — **⚠️ solo después** de que el bundle adaptado a
  los RPC esté publicado en `main` y probado con una cuenta de **estudiante**. Elimina la policy
  permisiva. Aplicarla antes deja el diagnóstico roto para todo no-admin. Trae su propio
  procedimiento de verificación y de reversión.

**Estado de RLS al momento de la auditoría:** habilitado en las 15 tablas de `public`
(`relrowsecurity = true`); `relforcerowsecurity = false` en todas, lo que es correcto (solo afecta
al rol dueño, y PostgREST nunca conecta como dueño).

**Corrección a la documentación de `021`:** la sección de arriba y la nota de T-39 afirmaban que
`tests` "no tenía ninguna policy de SELECT propia del usuario". Era falso — existía
`"Enable users to view their own data only"`, creada desde el dashboard. `tests_select_own` fue
redundante, no un arreglo. Consolidado en `023`.

---

## Umbral de esfuerzo por banco (`028` + `032`) — ✅ aplicadas 2026-08-10

Columna `test_configs.min_response_seconds` (`double precision not null default 2`, check
`0 ≤ x ≤ 120`). Es el **piso** del umbral bajo el cual una respuesta se considera no esforzada y
deja de contar en la estimación de θ. El umbral efectivo de cada ítem es
`max(min_response_seconds, largo_del_enunciado / 20)`: el piso cubre los enunciados cortos y la
parte proporcional los largos. Solo el piso es configurable — la velocidad de lectura es una
constante del cliente (`universo.irt.effort/chars-per-second`), no una decisión administrativa.

`not null default 2` y no nullable **a propósito** (`028` lo creó en 3; `032` lo bajó a 2 tras
calibrarlo contra el histórico — ver T-59): lo que se configura es cuán estricto ser, no si
el filtro existe. Con default, el filtro queda activo en todos los bancos ya sembrados sin que
nadie toque el panel; si fuera nullable, la afirmación publicada en la FAQ ("el tiempo de respuesta
también se considera en la estimación") seguiría siendo falsa hasta configurar cada topic uno por
uno. `0` deja actuar solo la regla proporcional.

No hay backfill de `tests`: las respuestas ya rendidas no tienen peso registrado y
`universo.irt.effort/weight-of` las cuenta con 1.0. Este filtro **no reinterpreta hacia atrás** lo
que ya se midió y se le mostró a alguien. Ver [[../adr/ADR-014-tiempo-de-respuesta-como-eje-separado]]
§Fase 1 y [[../project-memory/BACKLOG]] T-44.

**El 2 no lo eligió el autor, lo eligieron los datos (`032`).** `028` había puesto 3 s por criterio.
Al aplicar el umbral retroactivamente a las 195 respuestas del histórico que tienen tiempo real,
barriendo el piso, la tasa de acierto de las respuestas **descartadas** fue 18 % / 21 % / 27 % /
**34 %** / 42 % con piso 0/1/2/3/4 s. Con cuatro alternativas, adivinar acierta 25 %: mientras las
descartadas ronden ese 25 % se descarta ruido, y cuando lo superan se descarta conocimiento. El 3
estaba del lado equivocado. **No es una calibración sólida** —esas 195 respuestas son el 9 % del
histórico— sino un número inventado reemplazado por el mejor dato disponible. Ver T-59.

## Higiene de `topic` y backfill de `module_id` (`029` + `030` + `031`) — ✅ aplicadas 2026-08-10

**Es la única migración pendiente que modifica datos existentes.** Leer antes de aplicar.

| Objeto | Qué es |
|---|---|
| `public.normalize_topic(text)` | Forma canónica de un topic: sin acentos → minúsculas → sin bordes. `immutable`. **Espejo de `universo.topics/normalize`** — si cambia una, cambia la otra en el mismo commit |
| `questions_normalize_topic` | Trigger `before insert or update of topic` sobre `questions` |
| `tests_normalize_topic` | Ídem sobre `tests` (el historial que alimenta `universo.access`) |
| `test_configs_normalize_topics` | Ídem sobre `test_configs`, normalizando además `prerequisite_topic` y anulando la auto-referencia que quedaría |

**Qué corrige:** 26 topics donde varios son el mismo banco escrito de dos formas
(`factorización`/`factorizacion`, `Polinomios`/`polinomios`, …). Cada variante tenía su propia fila
en `test_configs`, su propio historial en `tests` y su propio conjunto de ítems para la selección
adaptativa — el sistema los trataba como bancos distintos **sin avisar**.

**Orden obligado** por la auto-FK `prerequisite_topic → topic`, que no tiene `on update cascade`:
crear la fila canónica → repuntar prerequisitos → normalizar `questions`/`tests` → borrar variantes
(previo `set prerequisite_topic = null`, porque el `on delete restrict` se evalúa fila por fila).

**Quién gana al fusionar:** la variante que respalda **más preguntas**, con su configuración y su
prerequisito. Dejar ganar a la que ya estaba bien escrita es arbitrario y puede tirar un
prerequisito configurado, que no es cosmética: define quién puede rendir el test.

**Backfill de `module_id`** en dos reglas: equivalencias explícitas (espejo de
`universo.topics/explicit-topic->module-slug`) y coincidencia única por sufijo del slug del módulo
(`triangulos` → `geometria/triangulos`). **No le asigna módulo a `diagnostico` (84 ítems) ni a
`PAES_M1` (44)**: son bancos mezclados y cualquier asignación por topic sería un dato falso con
apariencia de dato bueno. Esos ítems necesitan clasificación por ítem, que es contenido y no SQL.

**Verificado antes de entregarla** (2026-08-10) contra un PostgreSQL 14 desechable con un fixture
que reproduce el desorden medido: 0 topics fuera de forma canónica en las tres tablas, FK íntegra,
prerequisito configurado conservado, fusión correcta, triggers normalizando altas nuevas, y
**idempotente** (segunda corrida: 0 diferencias). El fixture no es el esquema real — T-48 sigue
abierto — así que la verificación cubre la lógica de la migración, no el estado real de la base.

## Catálogo de misconceptions (`027_misconceptions.sql`) — ✅ aplicada 2026-08-10

**Paso 1 de [[../project-memory/BACKLOG]] T-57.** Puramente aditiva: crea una tabla vacía y cuatro
columnas nullable. No mueve ningún dato, no cambia el comportamiento de la app, y se puede aplicar
en cualquier momento.

**Qué resuelve.** `questions.error_a..d` hoy fusiona dos cosas: la **identidad** del error
("invierte el divisor al dividir fracciones", reusable entre ítems) y la **explicación** para ese
ítem concreto (que menciona sus números). Al ser un solo `text`, la misconception no tiene
identificador: dos ítems que evalúan el mismo error tienen cadenas sin relación entre sí. No se
puede contar cuántos estudiantes cometen un error dado, ni enlazarle un recurso (T-54), ni comparar
entre diagnósticos (Q-07/T-26).

**El texto no se reemplaza.** El distractor apunta a una misconception **y** conserva su explicación
contextual. Sustituir `error_a` por un ID perdería lo mejor que hay hoy.

| Objeto | Qué es |
|---|---|
| `public.misconceptions` | Catálogo curado. `slug` único con check de formato, `name`, `description` (criterio editorial), `module_id` opcional, `created_at` |
| `questions.misconception_a_id` … `_d_id` | `uuid` nullable → `misconceptions(id)`, `on delete set null`. `null` = "sin catalogar" |

**El check del slug es la lección de T-51 hecha regla:** `^[a-z0-9]+([-/][a-z0-9]+)*$` — solo
minúsculas, dígitos y `-`/`/` como separadores. Rechaza mayúsculas, acentos, espacios, guion bajo y
separadores al inicio/final o duplicados. T-51 documentó 26 topics duplicados por acento y mayúscula
que el sistema trató como bancos distintos **sin avisar**; esta restricción existe para que eso no
se repita en el catálogo.

**RLS: solo admin en las cuatro operaciones.** El estudiante no necesita leer esta tabla — desde
ADR-015 el cliente no lee `questions`, y si la misconception llega al estudiante será vía
`score_answer`, que es `security definer` y no pasa por las policies. Criterio deliberado (R-16):
abrir después es fácil, des-filtrar no.

**Sin seed a propósito.** Sembrar una misconception por cada `error_*` distinto reproduciría el
problema que la tabla existe para resolver. El catálogo debe crecer **mucho más lento** que el
banco: con 387 ítems y ~300 misconceptions no se modeló nada; con ~40 hay taxonomía. Una
misconception presente en un solo ítem es sospechosa.

**Qué NO hace esta migración** (pasos 2–5 de T-57, cada uno con su propia decisión): catalogar
módulos, extender `score_answer` para devolver el slug, agrupar por misconception en
`universo.profile/build`, ni enlazar recursos (T-54).

---

## Track experimental `cuantica` (`033`–`040`) — ✅ aplicadas 2026-08-11

**No es contenido del producto.** Es un experimento de estudio personal del autor para su examen
universitario de Mecánica Cuántica, montado sobre el mismo motor IRT. Decisión completa, alternativas
descartadas y riesgo residual en [[../adr/ADR-018-track-experimental-cuantica]].

| Migración | Qué hace |
|---|---|
| `033_cuantica_track_y_modulos.sql` | Amplía el `check` de `modules.track` a un cuarto valor, `cuantica` (único cambio de esquema de todo el experimento), y siembra **15 módulos** con `historical_blurb` |
| `034_cuantica_misconceptions.sql` | **77 misconceptions** con prefijo `mq/`. Es el primer contenido que puebla la tabla creada vacía por `027` |
| `035`–`038` | **123 ítems** en 15 topics con prefijo `mq_`, cada uno con sus 4 `error_*` y sus `misconception_*_id` |
| `039_cuantica_resources.sql` | **32 recursos** de capa 1, todos `published = false` (ADR-016 §1) |
| `040_cuantica_test_configs.sql` | **15 configuraciones**, todas `active = false`, con cadena de prerequisitos. Trae la batería de control y el procedimiento de reversión |

**Qué lo mantiene separado del producto:**

- `test_configs.active = false` en los 15 bancos → la policy `test_configs_select` (`020`) los oculta
  a todo no-admin. **Es la única barrera** (`questions` no tiene `published`, y `next_question` es
  `security definer`): ver [[../project-memory/RISKS]] R-23.
- `resources.published = false` en los 32.
- Prefijos: `topic` → `mq_`, misconception `slug` → `mq/`, module `slug` → `cuantica/`,
  `track = 'cuantica'`. Cualquier consulta de métricas del banco PAES necesita
  `where topic not like 'mq\_%'` de aquí en adelante.

**Es 100 % datos.** No se toca ClojureScript, no se recompila `public/js/app.js`, `clj -M:test` no
cambia. `universo.topics/module-slugs` sigue con 20 módulos a propósito (ese set solo valida los
mapeos explícitos topic→módulo, y este experimento no agrega ninguno: cada ítem trae su `module_id`
escrito por la migración).

**Verificación previa (2026-08-11).** Aplicadas antes contra un PostgreSQL 14 desechable con un
fixture del esquema: aplicación limpia sobre base vacía y sobre base con contenido PAES,
**idempotencia** (segunda corrida → 0 diferencias), contenido PAES intacto (0 filas modificadas), y
**reversión completa probada**. El fixture no era el esquema real (T-48 sigue abierto), así que esa
verificación cubría la lógica de las migraciones, no el estado de la base.

**Aplicadas en producción el 2026-08-11** por el owner, sin incidentes reportados. Que `034`–`038`
hayan corrido confirma de paso dos cosas que el repo daba por supuestas y no estaban verificadas
contra la base real: que `027` estaba aplicada (existen `misconceptions` y las cuatro columnas
`misconception_*_id`), y que `questions.id` tiene default — las migraciones insertan sin `id`.

**Pendiente:** correr la batería de control del final de `040` y contrastar con los valores
esperados. Aplicar sin verificar deja el mismo hueco que T-48 describe para el resto del esquema.

---

## Track `electrotecnia` (`062`–`066`) — ✅ aplicadas 2026-09-09

Segundo track fuera del temario PAES M1, y **el primero cuyo destinatario no es el autor**. Decisión
completa en [[../adr/ADR-035-track-electrotecnia-visible]] (D-66).

| Migración | Qué hace |
|---|---|
| `062_electrotecnia_track_y_modulos.sql` | Amplía los `check` de `modules.track` **y de `class_slots.track`** a un sexto valor, y siembra **12 módulos** con `historical_blurb` y **banda explícita** (`band_min`/`band_max`) |
| `063_banco_de_electrotecnia.sql` | **74 ítems** y **54 ideas erróneas** nuevas (prefijo `et/`), topic `electrotecnia`, θ ∈ [−3, 3]. Banco de entrada |
| `064_banco_de_electrotecnia_ca.sql` | **42 ítems** y **6 ideas nuevas**, topic `electrotecnia_ca`, θ ∈ [−1, 3]. Profundización en corriente alterna. **Requiere `063` aplicada antes** |
| `065_test_configs_de_electrotecnia.sql` | Las **2 configuraciones**, encadenadas y con **`active = true`**. Dos guardas, batería de control y reversión |
| `066_electrotecnia_resources.sql` | **24 recursos** de capa 1 (guía + práctica por módulo), todos `published = false` (ADR-016 §1) |

**En qué se diferencia del track `cuantica`, y por qué importa:**

| | `cuantica` (`033`–`040`) | `electrotecnia` (`062`–`066`) |
|---|---|---|
| Destinatario | el autor, que es **admin** | un **alumno**, que no lo es |
| `test_configs.active` | `false` — invisible para el estudiante | **`true` — visible para todos** |
| Bancos | 15, uno por módulo | **2**: entrada + profundización |
| Bandas de los módulos | ninguna (derivadas, y no las recibe) | **explícitas en los 12** |
| Cómo entraron los ítems | migraciones escritas a mano | skill **`banco-de-items`**, JSON verificado |

La diferencia de `active` **no es un cambio de criterio**: es que la policy `test_configs_select` de
`020` (`active = true or public.is_admin()`) tiene dos estados y ninguno intermedio, y con
`active = false` el alumno no vería nada. El costo —ruido en el selector de todo estudiante de
PAES— está registrado como [[../project-memory/RISKS]] R-42, y lo cerraría T-129.

**Qué lo mantiene identificable:** prefijos `topic` → `electrotecnia`/`electrotecnia_ca`,
misconception `slug` → `et/`, module `slug` → `electrotecnia/`, `track = 'electrotecnia'`. Toda
consulta de métricas del banco PAES necesita ahora
`where topic not like 'mq\_%' and topic not like 'electrotecnia%'` — y la consulta de medición de la
skill `banco-de-items`, que solo excluye `mq\_%`, **queda desactualizada**.

**Es 100 % datos.** No se toca ClojureScript, no se recompila `public/js/app.js`, `clj -M:test`
cierra en las mismas **181 pruebas / 2677 aserciones / 0 fallas** y los cinco auditores siguen en
verde. Lo que lo hace posible es la **banda explícita**: un track fuera de `bands/product-tracks` no
recibe banda derivada, y agregarlo al reparto movería las bandas de los 26 módulos del producto —el
defecto que `060` cerró—, así que se escriben a mano y `bands/band-for` las prefiere.

**Verificación previa (2026-09-09).** Detallada más arriba, junto a las entradas 63–67 de la lista
de migraciones: aplicación limpia en orden, guardas que frenan, idempotencia por hash,
`next_question` en los dos bancos y en tres alturas de θ, un ítem inactivo dejando de servirse, y
reversión completa. Sobre un fixture, no sobre la base real (R-02, T-48).

**Aplicadas en producción el 2026-09-09** por el owner, sin incidentes reportados. Con eso el
track queda **publicado**: los dos bancos son visibles en el selector de todo estudiante (R-42).

✅ **Batería de control corrida el mismo día contra la base real**, y los nueve controles coinciden
con lo esperado:

| Control | Medido | Esperado |
|---|---|---|
| módulos del track | 12 | 12 |
| módulos sin banda explícita | 0 | 0 |
| ítems | 116 | 116 |
| **ítems sin módulo** | **0** | 0 |
| ideas erróneas `et/` | 60 | 60 |
| recursos | 24 | 24 |
| recursos publicados | 0 | 0 |
| **ítems de `electrotecnia_ca` sin ninguna idea errónea** | **0** | 0 |
| configuraciones activas | 2 | 2 |

Las dos filas en negrita son las que valía la pena mirar, porque son las únicas que **no fallan
solas**: un `module_slug` mal escrito deja el `module_id` en null en silencio (T-119), y `064`
aplicada antes que `063` habría dejado los 42 ítems del banco de alterna sin ninguna idea errónea,
también en silencio. Ninguna ocurrió. **T-127 cerrada**, y con ella el hueco que ADR-018 dejó
abierto con `040` desde 2026-08-11 — allá la batería nunca se corrió.

**Pendiente:** **revisar el contenido** (T-128) — 116 ítems asistidos por IA delante de un alumno
que no puede detectar un error de signo. Ningún script verifica eso.

---

## Umbrales del eje de fluidez por banco (`041`) — ✅ aplicada 2026-08-13

Dos columnas en `test_configs`, ambas `not null` con default y con un check que impide invertirlas:

| Columna | Qué es | Default |
|---|---|---|
| `fluency_fluida_max` | Tiempo relativo máximo (en múltiplos del tiempo de lectura del enunciado) para la banda `:fluida` | 3 |
| `fluency_media_max` | Ídem para `:media`; por encima es `:laboriosa`. El check exige que sea mayor que el anterior | 6 |

**Por qué por banco.** `universo.irt.fluency` (ADR-019) mide el tiempo en múltiplos del tiempo de
lectura. El primer dato real (T-65) puso en duda el corte global: una mediana de **2,19** en
`mq_momento_angular` cae en `:fluida` con el corte de 3, pero en un ítem que exige una derivación
eso se parece más a reconocer la alternativa que a resolver con fluidez. En un ítem mecánico de
PAES, no. No hay un número que sirva para los dos casos — mismo razonamiento que llevó
`min_response_seconds` a ser por banco en `028`.

**Los defaults 3 y 6 NO son una calibración**: son los mismos valores autorales de
`universo.irt.fluency/default-thresholds`, puestos como default para que ningún banco cambie de
comportamiento al aplicar la migración. Espejo mutuo: si cambia uno, cambia el otro.

La migración deja **comentado a propósito** un `update` sugerido para `mq_momento_angular` (2,0 /
4,5). No se aplica solo: bajar el corte por un único test rendido por una persona sería exactamente
el error que la migración documenta.

**Recorrido completo del valor:** `test_configs` → `crud/fetch-test-configs` →
`:test/start` lo mete en `:stop-config` → `profile/build` lo pasa a `fluency/classify` → el perfil
se guarda con la banda ya resuelta. Para perfiles viejos sin `:fluency`, `:plan/fetch-last-test!`
vuelve a leer la config del topic del último test. Editable en **Admin → Configuración de tests**.

### Verificación de que llegó (2026-08-13)

**Lo que está confirmado:** las dos columnas existen en la base real. Se comprobó desde fuera, con
la anon key pública y sin sesión, contra PostgREST — pidiendo las columnas y comparando el código de
respuesta contra dos controles:

| Consulta | Resultado | Qué prueba |
|---|---|---|
| `select=fluency_fluida_max,fluency_media_max` | `200` | Las columnas de `041` existen |
| `select=min_response_seconds` (columna conocida de `028`) | `200` | Control positivo: así responde una columna que sí está |
| `select=columna_que_no_existe` | `400` · `42703` | Control negativo: así responde una que no está |

Sin los dos controles el `200` no significaría nada; con ellos, sí. Las filas volvieron vacías
(`[]`) porque la policy `test_configs_select` no le muestra nada a un anónimo — eso es lo correcto,
y es la razón de que este método pruebe la **existencia** de la columna pero no sus valores.

**Valores por banco (bloque H.3, corrido por el owner el 2026-08-13):** **37 configuraciones, las
37 en 3 / 6**, ninguna invertida y ninguna editada a mano. De esas, **15 son del track `mq_`**
(ADR-018) y 22 del lado PAES.

> **Consecuencia que conviene no pasar por alto:** con todos los bancos en el mismo valor que ya
> tenía `universo.irt.fluency/default-thresholds`, **el comportamiento observable no cambió**. Ningún
> estudiante recibe hoy una clasificación distinta de la que recibía antes de `041`. Lo que cambió es
> la **capacidad** de corregir los cortes sin tocar código. La migración no calibra: habilita
> calibrar (T-65, R-24).
>
> En particular, los 15 bancos `mq_` heredaron el corte pensado para ítems tipo PAES, incluido
> `mq_momento_angular`, que es justamente el que motivó la duda. El `update` a 2,0 / 4,5 sigue
> comentado dentro de la migración, a propósito.

**Definición y check (bloques H.1 y H.2, 2026-08-13): confirmados.**

| Comprobación | Resultado |
|---|---|
| Tipo | `double precision` en ambas |
| Nulabilidad | `is_nullable = NO` en ambas |
| Defaults | `3` y `6` |
| Check | `CHECK ((fluency_fluida_max > 0) AND (fluency_media_max > fluency_fluida_max))` |

Con esto la verificación de `041` queda **cerrada**: columnas, tipos, `not null`, defaults, check y
valores por banco, todo contrastado contra la base real y no contra lo que dice el repo. La barrera
que importa —que nadie pueda dejar `fluency_media_max` por debajo de `fluency_fluida_max` editando
desde el panel— la impone la base, que es donde tiene que estar.

Repetible en cualquier momento con el **bloque H** de
[`queries/verificacion_esquema.sql`](queries/verificacion_esquema.sql).

**Verificada (2026-08-12)** contra un PostgreSQL 14 desechable: aplica limpia, defaults correctos,
el check rechaza bandas invertidas, e idempotente (segunda corrida solo emite los `NOTICE` de
`add column if not exists`).

---

## Bandas de conocimiento, θ inicial y el cuarto eje (`046`) — ⏳ pendiente de aplicar

Pedido del owner el 2026-08-18. **Puramente aditiva**: tres columnas nullable y dos checks
ampliados. El cliente funciona igual si no está aplicada — omite del payload las columnas que no
existen (mismo patrón que los `misconception_*_id` en `question-payload`).

| Objeto | Qué es |
|---|---|
| `modules.band_min` / `band_max` | La **banda de conocimiento**: el rango de dificultad IRT que le toca a ese contenido. `null` = usa la banda derivada del orden curricular (`universo.bands/default-bands`) |
| `test_configs.initial_theta` | Dónde **abre** la evaluación. Hasta ahora todo test arrancaba en θ = -1.0, un literal en `events/test.cljs`. `null` = ese mismo -1.0 |
| `modules.track` y `class_slots.track` | Checks ampliados con **`probabilidad`**, el cuarto eje de PAES M1 |

**Por qué la banda va en `modules` y no en `test_configs`:** una banda describe un *contenido*, no una
evaluación. El banco `diagnostico` cruza varios contenidos; si la banda viviera en el test, sus ítems
tendrían todos la misma dificultad y el test adaptativo no podría discriminar dentro de él.

⚠️ **Qué es y qué no es.** Una banda es una **hipótesis editorial, no una medición**. Sigue siendo
`difficulty` autoral: lo que gana el banco es *coherencia* —hoy `polinomios` tiene 18 de 20 ítems
dentro de 0,045 logits, o sea una constante con ruido—, no validez psicométrica. Eso solo puede venir
de calibrar con respuestas reales (G-2, [[../project-memory/RISKS]] R-17, Q-05). Cuando se calibre,
estas bandas son la hipótesis **contra la que se contrasta**.

**El cuarto eje no era un olvido de contenido, era imposible:** el check de `001` solo admitía
`aritmetica`, `algebra` y `geometria`, así que no se podía crear un módulo de probabilidad ni
publicar un cupo de ese eje. Por eso el banco no tiene un solo ítem de probabilidad.

**Historial de esta migración.** La primera versión falló en producción con
`ERROR: 42703: column "track" does not exist`: ampliaba el check de `resources.track`, y **`resources`
no tiene columna `track`** — hereda el eje de su módulo. El check que sí había que ampliar era el de
`class_slots.track`. Error de lectura del agente: en `001` ese `check (track ...)` está dentro del
bloque de `class_slots`, no del de `resources`.

**Verificada (2026-08-18)** contra un PostgreSQL 14 desechable, con una réplica mínima de `modules`,
`class_slots` y `test_configs` tal como los dejaron `001` y `033`:
- aplica limpia y agrega las tres columnas;
- los dos checks de `track` quedan con los cinco ejes;
- un módulo y un cupo de `probabilidad` se insertan sin error;
- los checks **rechazan** banda invertida (`min > max`), banda fuera de `[-3, 3]` y `initial_theta`
  fuera de rango;
- **idempotente**: la segunda corrida completa solo emite los `NOTICE` de `add column if not exists`
  y conserva los valores ya escritos.
