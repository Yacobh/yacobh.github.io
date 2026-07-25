# Edge Functions — Academia Integral

## `send-enrollment-emails`

Drena `public.email_outbox` (filas `pending`) enviando con [Resend](https://resend.com).

### Setup

```bash
# En el proyecto Supabase (CLI)
supabase secrets set RESEND_API_KEY=re_xxxxxxxx
# Opcional: dominio verificado en Resend
supabase secrets set EMAIL_FROM="Academia Integral <hola@tudominio.cl>"

supabase functions deploy send-enrollment-emails
```

### Invocar

```bash
supabase functions invoke send-enrollment-emails --no-verify-jwt
```

O programa un cron en Dashboard → Edge Functions → Schedules (cada 5 min).

### Flujo

1. Cupo alcanza `min_enrollments` → trigger confirma → inserta `notifications`.
2. Trigger `notifications_enqueue_email` → filas en `email_outbox`.
3. Esta function envía y marca `sent` / `failed`.

Sin `RESEND_API_KEY`, las notificaciones in-app siguen funcionando; el outbox queda `pending`.
