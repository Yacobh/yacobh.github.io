# SESSION-013

## Fecha

2026-08-09

## Participantes

- Humano: Jacobo Córdova
- Agente / modelo: Claude Code CLI (Sonnet 5)

## Objetivo de la sesión

Cerrar T-02 (pipeline de email de cohorte): aplicar la migración pendiente, desplegar la Edge
Function `send-enrollment-emails`, verificar un envío real de punta a punta, y programar el cron.
A diferencia de otras tareas de infraestructura recientes, esta se ejecutó en vivo junto con el
owner, con el agente ejecutando y verificando comandos directamente (no solo un reporte del owner
al final).

## Contexto de entrada

- Rama: `t-50-edicion-rapida-dificultad` al empezar (con su PR ya mergeado a `main` durante la
  sesión, PR #31); se creó `t-02-email-cohorte` desde `main` actualizado para este trabajo.
- Commit inicial: `f687965` (main, tras el merge de T-50).
- Estado del árbol al empezar: limpio salvo `project-memory/AVISO_PRIVACIDAD_BORRADOR.md`
  (trabajo propio del owner, no tocado, igual que en sesiones anteriores).
- Documentos leídos antes de actuar: `BACKLOG.md` T-02, `RISKS.md` R-12,
  `adr/ADR-007-email-outbox-con-edge-function.md`, `supabase/migrations/005_email_outbox.sql`,
  `supabase/functions/send-enrollment-emails/index.ts`, `supabase/SCHEMA.md`,
  `supabase/functions/README.md` (vía un agente Explore, para no gastar contexto propio en la
  lectura completa de archivos ya conocidos).
- Bloqueos vigentes al empezar: T-02 `bloqueado (acceso)` — sin cuenta de Resend, sin CLI de
  Supabase instalada, `005` de estado desconocido para el agente (luego confirmado por el owner
  como ya aplicada).

## Actividades realizadas

1. Se armó un plan en modo Plan (`vectorized-snacking-squid.md`) con el runbook completo de T-02,
   aclarando de entrada que es una tarea operativa (el código ya estaba escrito y correcto), no un
   cambio de código.
2. El owner creó la cuenta de Resend y verificó un dominio en GoDaddy.
3. **Intento fallido documentado:** `brew install supabase/tap/supabase` falló en la máquina del
   owner por Command Line Tools de Xcode desactualizadas (mismo bloqueo que D-33 con `clj-kondo`);
   `softwareupdate` y `xcode-select --install` no lo resolvieron.
4. Se instaló la CLI de Supabase descargando el binario oficial (`v2.113.0`, arm64) desde GitHub
   Releases directo a `~/bin` (ya en el `PATH` desde la instalación de `clj-kondo`), sin Homebrew.
   Registrado como D-34 en `DECISIONS.md`.
5. El owner corrió `supabase login` y `supabase secrets set` en su propia terminal (para no pasar
   la API key real por este chat); el agente corrió `supabase link --project-ref
   jmnqklhxcdccvdhuuiji` y el resto de los comandos desde el repo, confirmando el link por el
   contenido de `supabase/.temp/project-ref`. Se agregó `supabase/.temp/` y `supabase/.branches/`
   a `.gitignore` (no tenían entrada).
6. Se confirmó con el owner que `005_email_outbox.sql` ya estaba aplicada de una sesión anterior —
   se saltó ese paso del runbook.
7. `supabase secrets list` confirmó `RESEND_API_KEY` y `EMAIL_FROM` seteados (solo hashes, sin ver
   valores).
8. `supabase functions deploy send-enrollment-emails` — éxito. Al intentar verificar con
   `supabase functions invoke ... --no-verify-jwt` (como documenta el README), la CLI v2.113.0
   devolvió error: el subcomando `invoke` ya no existe (solo `list/delete/download/deploy/new/
   serve`). **Intento fallido documentado**, resuelto redesplegando con `--no-verify-jwt` (para
   que el gateway no exija JWT) y llamando al endpoint HTTPS directo con `curl`.
9. **Primer intento de envío real falló**: Resend devolvió `"The jacobocordova.com domain is not
   verified"` — el owner había verificado `mail.jacobocordova.com` (subdominio) en Resend, pero el
   secret `EMAIL_FROM` apuntaba al dominio raíz. El owner corrigió el secret a
   `hola@mail.jacobocordova.com` y volvió a disparar la verificación de dominio en Resend
   (que hasta ese momento decía "not started" — el owner nunca había cargado los registros DNS
   para el subdominio, solo para el dominio raíz).
10. **Nivel 1 de verificación:** fila de prueba insertada a mano en `email_outbox`
    (`kind = 'test'`), invocada la función vía `curl`, `status → sent`, correo recibido en bandeja
    principal de `jacobocordova@gmail.com` (confirmado por el owner).
11. **Nivel 2 de verificación (la real, contra el criterio de "terminado" de T-02):** se creó un
    cupo desechable (`class_slots`, `min_enrollments = 1`, título "PRUEBA T-02 (borrar después)")
    y se insertó un `enrollment` real para una cuenta de prueba (`fuegopoc@gmail.com`). Se leyó en
    vivo el resultado: `class_slots.status → confirmed`, una fila nueva en `notifications`
    (`slot_confirmed`), y **dos** filas nuevas en `email_outbox` — hallazgo no documentado antes:
    el mismo trigger de confirmación también inserta una notificación `slot_confirmed_admin` al
    owner (`001_mvp_schema.sql:302`). Se invocó la función, ambas pasaron a `sent`, y ambos
    correos llegaron a bandeja principal (estudiante y admin, confirmado por el owner).
12. Se limpiaron los datos de prueba (`email_outbox`, `notifications`, `enrollments`,
    `class_slots` del cupo desechable).
13. **Cron:** el dashboard de este proyecto no tiene la pestaña "Schedules" para Edge Functions
    (no disponible en este plan). Se programó con `pg_cron` + `pg_net`
    (`cron.schedule('send-enrollment-emails-every-5-min', '*/5 * * * *', ...)`), confirmado
    registrado y `active = true` en `cron.job`. No se esperó a confirmar una ejecución automática
    real (no bloqueante — la función ya se probó manualmente dos veces).
14. Se corrigió `supabase/functions/README.md` (comando `invoke` obsoleto → `curl` directo +
    alternativa `pg_cron`/`pg_net` para el cron).
15. Se actualizó `project-memory/ARCHITECTURE.md` §4.3 con el hallazgo de la notificación paralela
    al admin (`slot_confirmed_admin`).

## Archivos revisados

- `supabase/migrations/005_email_outbox.sql`
- `supabase/migrations/001_mvp_schema.sql` (trigger `confirm_slot_if_threshold`, línea 302)
- `supabase/functions/send-enrollment-emails/index.ts`
- `supabase/functions/README.md`
- `supabase/SCHEMA.md`
- `adr/ADR-007-email-outbox-con-edge-function.md`
- `project-memory/BACKLOG.md` T-02, `project-memory/RISKS.md` R-12, `project-memory/DEPENDENCIES.md`

## Archivos modificados

| Archivo | Qué cambió |
|---------|-----------|
| `.gitignore` | Agregado `supabase/.temp/` y `supabase/.branches/` |
| `project-memory/DECISIONS.md` | Nueva D-34 (instalación de la CLI de Supabase sin Homebrew) |
| `project-memory/BACKLOG.md` | T-02 → `hecho`, con el detalle completo de la verificación |
| `project-memory/CURRENT_STATUS.md` | Checklist de go-live, BL-02, F5, nota de sesión |
| `project-memory/RISKS.md` | R-12 → mitigado |
| `project-memory/ARCHITECTURE.md` | §4.3: notificación `slot_confirmed_admin` documentada |
| `supabase/functions/README.md` | Comando de invocación corregido (la CLI ya no tiene `invoke`) |

**No versionado (correcto):** `supabase/.temp/` (estado local de `supabase link`, sin secretos
pero tampoco fuente de verdad — ver `.gitignore`).

## Comandos ejecutados y resultados

```
supabase --version                          → 2.113.0 (instalado sin Homebrew, D-34)
supabase secrets list                       → RESEND_API_KEY, EMAIL_FROM confirmados (hashes)
supabase functions deploy send-enrollment-emails --no-verify-jwt → éxito
curl .../functions/v1/send-enrollment-emails (sanity check) → {"processed":0,"results":[]}
curl ... (tras insertar fila de prueba)      → falló: dominio no verificado (Resend)
curl ... (tras corregir EMAIL_FROM + verificar dominio) → {"processed":1,"results":[{"ok":true}]}
curl ... (tras inscripción real vía enrollments) → {"processed":2,"results":[{"ok":true},{"ok":true}]}
```
`clj -M:test` / `shadow-cljs release app` / `npm run build:css`: no se corrieron — no hubo cambios
de código de la app (`src/`), solo infraestructura y memoria.

## Decisiones tomadas

| Decisión | ¿ADR? | Dónde quedó registrada |
|----------|-------|------------------------|
| Instalar la CLI de Supabase vía binario oficial en `~/bin`, no Homebrew | No (mismo patrón que D-33) | `DECISIONS.md` D-34 |
| Desplegar la función con `--no-verify-jwt` (coherente con el diseño documentado en el README/ADR-007, ya que el cron no lleva JWT de usuario) | No | `supabase/functions/README.md`, este session log |
| Cron vía `pg_cron`/`pg_net` en vez de Dashboard → Schedules (no disponible en este plan) | No | `BACKLOG.md` T-02, `supabase/functions/README.md` |

## Riesgos identificados

Ninguno nuevo. [[RISKS]] R-12 pasa de `activo` a `mitigado`.

## Bloqueos

Ninguno al cierre. Bloqueos resueltos durante la sesión: falta de CLI (D-34), dominio no
verificado (corregido por el owner en Resend/GoDaddy), CLI sin `invoke` (resuelto con `curl`
directo), sin Schedules en el dashboard (resuelto con `pg_cron`).

## Preguntas abiertas nuevas

Ninguna formal. Nota para seguimiento (no urgente): no se ubicó ni se investigó a fondo si
`slot_confirmed_admin` tiene algún componente de UI que lo muestre distinto al resto de las
notificaciones in-app del admin, o si simplemente aparece igual que cualquier otra. No bloquea
nada, es solo un hallazgo colateral de esta sesión.

## Supuestos aplicados

Ninguno.

## Próximos pasos

1. El owner crea el PR de `t-02-email-cohorte` desde el link directo (`gh` sigue sin instalarse en
   esta máquina) y lo mergea.
2. Pasados unos minutos, revisar `select * from cron.job_run_details order by start_time desc
   limit 5;` para confirmar que el cron ya disparó al menos una vez con éxito (no bloqueante, solo
   tranquilidad adicional).
3. Retomar T-04 (cupos reales) — con T-01, T-02, T-03, T-47 y T-50 cerrados, es el último bloqueo
   de go-live que depende de acceso/ejecución del owner y no de código.

## Pendientes

- Confirmar la primera ejecución automática real del cron (ver "Próximos pasos").
- El hallazgo de `slot_confirmed_admin` está documentado pero no se revisó si el owner quiere
  cambiar algo de ese comportamiento (por ahora se documenta tal cual está, sin tocarlo).

## Actualizaciones requeridas en Project Memory

- [x] `project-memory/CURRENT_STATUS.md`
- [x] `project-memory/BACKLOG.md`
- [x] `project-memory/RISKS.md`
- [x] `project-memory/DECISIONS.md`
- [ ] `adr/ADR-0NN-….md` (nuevo) — no aplica, sin decisión de arquitectura nueva (T-02 ya tenía ADR-007)
- [x] `project-memory/ARCHITECTURE.md`
- [ ] `project-memory/ROADMAP.md` — no aplica
- [ ] `project-memory/REQUIREMENTS.md` — no aplica
- [ ] `project-memory/OPEN_QUESTIONS.md` — no aplica, sin pregunta nueva
- [ ] `project-memory/ASSUMPTIONS.md` — no aplica
- [ ] `project-memory/LESSONS_LEARNED.md` — evaluado; los dos tropiezos (CLI sin `invoke`, dominio/subdominio) se resolvieron en minutos, no llegan al umbral de 15 min que pide la regla
- [ ] `project-memory/TERMINOLOGY.md` — no aplica
- [ ] `project-memory/graph/` (snapshot de Graphify) — no aplica, sin cambios de código en `src/`

## Notas

Esta es la primera tarea de infraestructura de este proyecto cerrada con verificación en vivo
completa por el agente (no solo por reporte del owner) — precedente útil para T-04 y futuras
tareas de despliegue: cuando el agente tiene la CLI y puede invocar/leer resultados directamente,
vale la pena hacerlo en vez de conformarse con el reporte del owner.

---

Relacionado: [[../project-memory/CURRENT_STATUS]] · [[../project-memory/AGENT_INSTRUCTIONS]] ·
[[../project-memory/BACKLOG]] T-02 · `../prompts/session-close-memory-update.md`
