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
19. Deploy `functions/send-enrollment-emails` + secret `RESEND_API_KEY`
