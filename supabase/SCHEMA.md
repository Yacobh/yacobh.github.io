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
44. Deploy `functions/send-enrollment-emails` + secret `RESEND_API_KEY`

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

**Lo que falta confirmar**, y solo se ve desde el SQL Editor: el `not null`, los defaults, el check
`test_configs_fluency_bands_ordenadas` y los valores por banco. Está todo en el **bloque H** de
[`queries/verificacion_esquema.sql`](queries/verificacion_esquema.sql).

**Verificada (2026-08-12)** contra un PostgreSQL 14 desechable: aplica limpia, defaults correctos,
el check rechaza bandas invertidas, e idempotente (segunda corrida solo emite los `NOTICE` de
`add column if not exists`).
