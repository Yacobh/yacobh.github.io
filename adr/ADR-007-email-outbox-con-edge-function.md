# ADR-007: Email de cohorte por tabla outbox + Edge Function con Resend

## Estado

Aprobada

## Fecha

2026-07-24 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde `supabase/migrations/005_email_outbox.sql`,
> `supabase/functions/send-enrollment-emails/index.ts`, `supabase/functions/README.md` y el commit
> `c5ee6bc`.

Cuando un cupo alcanza su mínimo de inscritos y se confirma (ADR-006), el estudiante debe enterarse.
La notificación in-app ya existe (tabla `notifications`, banner en la aplicación), pero **solo la ve
si vuelve a entrar**. Entre la inscripción y la confirmación pueden pasar días: el estudiante se
inscribió y se fue.

Restricciones:

- **No hay servidor propio** (ADR-002): no hay dónde correr un worker de envío.
- **El cliente no puede enviar emails**: requeriría una API key en el bundle, es decir, pública.
- La confirmación la produce un **trigger de PostgreSQL**, no una acción del cliente: en ese momento
  no hay nadie "conectado" a quien pedirle que envíe el correo.
- Presupuesto cero: el proveedor de email debe tener free tier.
- **El email no puede ser un punto único de fallo:** si el envío falla, la confirmación del grupo debe
  seguir siendo válida.

## Decisión

Se implementa el patrón **transactional outbox** en tres piezas desacopladas:

**1. Tabla `email_outbox`** (`005_email_outbox.sql`)

```
to_email · subject · body · kind (default 'slot_confirmed') · meta jsonb
status ('pending' | 'sent' | 'failed') · attempts · last_error
created_at · sent_at
```

Con **índice parcial** sobre `(status, created_at) where status = 'pending'`: la cola se consulta
siempre por pendientes.

**2. Trigger `notifications_enqueue_email`**

Al insertarse una `notifications` (que a su vez la crea el trigger de confirmación de cupo), se
encolan las filas correspondientes en `email_outbox` con `status = 'pending'`. La transacción de
negocio y el encolado ocurren juntos: no hay forma de confirmar un grupo sin encolar su aviso.

**3. Edge Function `send-enrollment-emails`** (Deno)

- Se ejecuta con `service_role` (no accesible desde el cliente).
- Toma hasta **25** filas `pending`, ordenadas por `created_at`.
- Envía cada una vía la **API REST de Resend** (`https://api.resend.com/emails`), sin SDK.
- Éxito ⇒ `status = 'sent'`, `sent_at`, `last_error = null`.
- Fallo ⇒ `status = 'failed'`, `attempts + 1`, `last_error` (truncado a 500 caracteres).
- **Sin `RESEND_API_KEY` responde 503 y no toca la cola**: las filas quedan `pending` para reintento.
- Se invoca a mano (`supabase functions invoke`) o por cron del dashboard (cada ~5 min).

Secretos: `RESEND_API_KEY` y `EMAIL_FROM` como **Supabase secrets**, nunca en el repositorio ni en el
bundle.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Enviar desde el cliente** | Exigiría la API key en el bundle, es decir pública. Además el cliente no está presente cuando el trigger confirma el cupo |
| **Enviar desde el trigger** (`pg_net`, extensión HTTP) | Acopla el envío a la transacción: un fallo de red del proveedor podría abortar o retrasar la confirmación del grupo. El outbox desacopla precisamente eso |
| **Solo notificación in-app** (sin email) | Es lo que ya existía y es el problema que se quiere resolver: el estudiante no vuelve solo |
| **Supabase Auth emails / SMTP directo** | Los emails de Auth sirven para verificación y recuperación, no para avisos de producto |
| **Servicio propio con cron** | Requiere infraestructura que ADR-002 descarta |
| **SendGrid / Mailgun / Postmark** | Equivalentes; Resend se eligió por su free tier y una API REST mínima que no necesita SDK |
| **SDK de Resend en la function** | `fetch` directo reduce dependencias y el riesgo de un breaking change en el SDK |
| **Envío inmediato sin cola** | Sin cola no hay reintentos ni trazabilidad de fallos (`attempts`, `last_error`) |

## Consecuencias

**Positivas**

- **El email no puede romper el negocio.** El grupo se confirma y la notificación in-app funciona
  aunque no exista API key, aunque Resend esté caído o aunque la function no esté desplegada.
- **Degradación explícita y observable:** sin `RESEND_API_KEY` la function devuelve 503 con un `hint`
  (`supabase secrets set RESEND_API_KEY=re_...`) y la cola queda intacta.
- **Auditoría gratis:** `email_outbox` es el registro de qué se intentó enviar, cuándo, cuántas veces y
  con qué error. Se puede consultar el estado del sistema de email con un `select`.
- **Reintento trivial:** volver a invocar la function reprocesa lo pendiente. No hace falta nada más.
- **Cero infraestructura nueva:** todo dentro de Supabase.
- **Cambiar de proveedor de email** requiere tocar un solo archivo (la Edge Function); la cola y los
  triggers no cambian.
- El lote de 25 acota el tiempo de ejecución de cada invocación.

**Negativas / costos aceptados**

- **La entrega no es inmediata:** depende de la frecuencia del cron (~5 min de latencia esperada).
  Aceptable para un aviso de confirmación de grupo.
- **Sin cron configurado, la cola no se drena.** El sistema queda silenciosamente inoperante: las
  filas se acumulan en `pending` sin que nadie lo note. **Es el estado actual** (T-02).
- **`failed` es terminal:** la function marca `failed` y no reintenta automáticamente esa fila. Un
  fallo transitorio de red exige intervención manual (un `update` a `pending`).
- **Sin alertas:** nadie se enterará de que el outbox acumula fallos salvo que alguien lo consulte.
- **Entregabilidad:** el `EMAIL_FROM` por defecto es `onboarding@resend.dev`. Sin dominio verificado en
  Resend, los correos tienen alta probabilidad de terminar en spam (R-12).
- **Todo el pipeline está sin verificar en producción:** la migración, el despliegue y el secret no se
  han confirmado en el proyecto real (F5 al 60 %).
- **Versión distinta de `supabase-js`** en la function (2.49.1 vía esm.sh) que en el cliente (^2.49.8).
  Inofensivo hoy (procesos separados) pero es un desalineamiento a vigilar.
- **El cuerpo del email se compone en SQL** (en el trigger), no con plantillas: cambiar el texto
  implica una migración.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Cola nunca drenada por falta de cron | T-02 incluye programar el cron y **verificar** una fila `sent` de punta a punta | — |
| Correos en spam | Verificar dominio en Resend y setear `EMAIL_FROM`; mantener la notificación in-app como canal primario | R-12 |
| Fallos acumulados sin que nadie lo note | Consulta de `email_outbox` en el panel admin o en las vistas de métricas (T-21) | — |
| Filas `failed` que requieren intervención manual | Documentado; considerar reintento automático con límite de `attempts` | — |
| Se filtra `RESEND_API_KEY` | Solo vive como Supabase secret; nunca en el repositorio ni en el bundle | R-14 |

## Seguimiento

**Inmediato (T-02):** aplicar `005`, desplegar la function, setear el secret con dominio verificado,
programar el cron, y **verificar de punta a punta** que una confirmación produce una fila `sent` y un
correo en una bandeja real.

**Después, revisar:**

1. Tasa `sent` / `failed` en `email_outbox`. Si `failed` es significativa, revisar `last_error`.
2. Latencia real entre `created_at` y `sent_at`. Si molesta, aumentar la frecuencia del cron.
3. Si el volumen crece, subir el lote de 25 o hacer que la function procese hasta agotar la cola.
4. Añadir reintento automático para `failed` con límite de `attempts` (hoy es terminal).
5. Si aparecen más tipos de email (recordatorio de clase, cancelación de cupo, re-diagnóstico), el
   campo `kind` ya está previsto; considerar plantillas fuera del trigger.

---

Relacionado: [[../project-memory/ARCHITECTURE]] §4.3, §5 · [[../project-memory/REQUIREMENTS]] RF-6 ·
[[../project-memory/RISKS]] R-12 · [[../project-memory/BACKLOG]] T-02 ·
[[ADR-006-cohortes-por-banda-con-minimo-de-inscritos]] · `../supabase/functions/README.md`
