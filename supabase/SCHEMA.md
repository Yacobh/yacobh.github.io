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

## Seed

Ejecutar `migrations/002_seed_modules.sql` tras `001_mvp_schema.sql`.

## Orden de aplicación

1. `admin_rls.sql` (si aún no)
2. `guestbook_tri_state.sql` (si aún no)
3. `migrations/001_mvp_schema.sql`
4. `migrations/002_seed_modules.sql`
