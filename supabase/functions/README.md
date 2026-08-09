# Edge Functions — Academia Integral

## `send-enrollment-emails`

Drena `public.email_outbox` (filas `pending`) enviando con [Resend](https://resend.com).

### Setup

```bash
# En el proyecto Supabase (CLI)
supabase secrets set RESEND_API_KEY=re_xxxxxxxx
# Opcional: dominio verificado en Resend
supabase secrets set EMAIL_FROM="Academia Integral <hola@tudominio.cl>"

supabase functions deploy send-enrollment-emails --no-verify-jwt
```

### Invocar

La CLI de Supabase (verificado con v2.113.0) ya no tiene `functions invoke` — llamar directo al
endpoint HTTPS (funciona sin `Authorization` porque se desplegó con `--no-verify-jwt`):

```bash
curl -s -X POST "https://<project-ref>.supabase.co/functions/v1/send-enrollment-emails" \
  -H "Content-Type: application/json" -d '{}'
```

O programa un cron en Dashboard → Edge Functions → Schedules (cada 5 min). Si esa pestaña no está
disponible en tu plan (pasó en el proyecto real, 2026-08-09), alternativa con `pg_cron` + `pg_net`:

```sql
create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.schedule(
  'send-enrollment-emails-every-5-min',
  '*/5 * * * *',
  $$
  select net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/send-enrollment-emails',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := '{}'::jsonb
  );
  $$
);
```

### Flujo

1. Cupo alcanza `min_enrollments` → trigger confirma → inserta `notifications`.
2. Trigger `notifications_enqueue_email` → filas en `email_outbox`.
3. Esta function envía y marca `sent` / `failed`.

Sin `RESEND_API_KEY`, las notificaciones in-app siguen funcionando; el outbox queda `pending`.
