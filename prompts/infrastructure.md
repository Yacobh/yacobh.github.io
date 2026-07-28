# Prompt: infraestructura y base de datos

Para migraciones SQL, policies RLS, triggers, Edge Functions, secretos y configuración de entornos.

> ⚠️ **Área de mayor riesgo del proyecto.** Se trabaja sobre la base de **producción** (R-02), sin
> staging y sin respaldo propio verificado (R-03). Un error aquí puede exponer o perder datos de
> estudiantes.

---

## Prompt

```
Cambio de infraestructura propuesto: <DESCRIPCIÓN>

Antes de responder:
1. Lee supabase/SCHEMA.md COMPLETO, en especial el orden de aplicación.
2. Lee la migración existente que toca las mismas tablas o policies.
3. Lee project-memory/ARCHITECTURE.md §3 (datos), §6 (infra) y §7 (seguridad).
4. Lee project-memory/AGENT_INSTRUCTIONS.md §3 y §6.
5. Lee project-memory/RISKS.md R-02, R-03, R-14, R-16 y LESSONS_LEARNED.md L-09..L-14.

Entrega:

1. Qué se va a cambiar exactamente y por qué
2. La migración propuesta, IDEMPOTENTE, con RLS y policies en el mismo archivo
3. Precondiciones: qué migraciones deben estar aplicadas antes
4. Qué se rompe si NO se aplica (así lo documenta supabase/SCHEMA.md)
5. Verificación de seguridad: qué ve un usuario `user`, qué ve un `admin`, qué queda inaccesible
6. Plan de reversión: cómo deshacer si algo sale mal
7. Actualización requerida de supabase/SCHEMA.md
8. Riesgos y qué NO se puede verificar sin acceso al proyecto Supabase

No apliques nada a la base de datos: entrega el SQL para que el owner lo revise y ejecute.
```

---

## Notas

### Reglas obligatorias

1. **Idempotencia sin excepciones** (L-12): `create table if not exists`,
   `create index if not exists`, `drop policy if exists` antes de `create policy`, upsert por clave
   natural (los seeds usan `slug`). Se aplican a mano y puede ser necesario re-ejecutarlas.
2. **RLS en la misma migración que la tabla.** `alter table … enable row level security` + policies.
   Sin policy no hay acceso; con la policy equivocada hay fuga.
3. **Orden de aplicación documentado** en `supabase/SCHEMA.md`. `001` requiere `is_admin()` de
   `admin_rls.sql`; `005` requiere `notifications` de `001`; `006` y `007` requieren `is_admin()`.
4. **Comentar el *por qué*** en el SQL. Las migraciones existentes lo hacen y es lo que permitió
   reconstruir los ADRs — mantén ese estándar. Ejemplo real de `006`:
   *"La condición `id <> auth.uid()` es una salvaguarda deliberada: impide que un admin se quite el rol
   a sí mismo y deje la instalación sin administradores."*
5. **"0 filas afectadas" es síntoma de policy, no éxito** (L-09). Verifica conteos y haz que la UI los
   muestre.
6. **Secretos solo como Supabase secrets.** Jamás `service_role` ni `RESEND_API_KEY` en el cliente.
7. **Numeración consecutiva** `00N_descripcion.sql`. No reutilizar números.

### Verificación mínima de seguridad tras un cambio de policies

Con una cuenta `user` y una `admin`, comprobar:

| Caso | Esperado |
|------|----------|
| `user` consulta `profiles` de otro | 0 filas |
| `user` intenta insert/update en `questions` | rechazado |
| `user` consulta `student_profiles` de otro | 0 filas |
| `user` consulta `enrollments` de otro | 0 filas |
| `user` ve cupos de otra banda | no aparecen |
| `admin` intenta quitarse su propio rol | rechazado (`id <> auth.uid()`) |
| Degradar al último admin | rechazado (trigger `profiles_protect_last_admin`) |
| Tabla nueva sin policy | inaccesible (no "abierta") |

Consulta útil: `select * from pg_policies where tablename = '<tabla>';`

### Edge Functions

- Probar la **degradación** además del camino feliz: sin `RESEND_API_KEY` debe responder 503 y dejar la
  cola intacta (ADR-007).
- `supabase functions deploy <nombre>` + `supabase secrets set …`.
- Los logs están en el dashboard de Supabase; no hay observabilidad propia.

### Entornos

Hoy hay **uno solo**: producción. La URL y la anon key están **hardcodeadas** en
`src/universo/supabase.cljs`, así que crear staging (T-09) requiere una decisión de configuración
(P-06) y probablemente un ADR.

### Antes de cualquier cambio destructivo

No hay respaldo propio verificado (R-03). Si el cambio puede perder datos, **exporta primero**:

```bash
pg_dump "<CONNECTION_STRING>" > backup-$(date +%F).sql   # ejecútalo tú, no el agente
```

Y documenta el procedimiento en `docs/` (T-07).

### Al terminar

`supabase/SCHEMA.md` actualizado con qué hace la migración, qué requiere y qué se rompe sin ella;
`ARCHITECTURE.md` §3/§7 si cambió el modelo o la seguridad; `RISKS.md` si el cambio abre o cierra un
riesgo; y el session log con el SQL aplicado y su resultado.
