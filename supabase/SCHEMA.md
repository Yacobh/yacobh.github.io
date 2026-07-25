# Schema Supabase — Academia Integral MVP

## Tablas existentes (previas al MVP)

| Tabla | Uso |
|-------|-----|
| `profiles` | `id`, `email`, `role` (`user`\|`admin`) — ver `admin_rls.sql` |
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
| `notifications` | Banner in-app (confirmación de grupo) |

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

## Orden de aplicación

1. `admin_rls.sql` (si aún no)
2. `guestbook_tri_state.sql` (si aún no)
3. `migrations/001_mvp_schema.sql`
4. `migrations/002_seed_modules.sql`
5. `migrations/003_demo_slots.sql` (opcional)
6. `migrations/004_enrich_baldor_resources.sql`
7. `migrations/005_email_outbox.sql`
8. `migrations/006_admin_role_management.sql`
9. Deploy `functions/send-enrollment-emails` + secret `RESEND_API_KEY`
