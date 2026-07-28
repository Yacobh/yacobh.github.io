# ADR-002: Supabase como único backend y RLS como límite de seguridad

## Estado

Aprobada

## Fecha

2025-06-01 (documentada retroactivamente el 2026-07-26)

## Contexto

> **Contexto reconstruido** desde `src/universo/supabase.cljs`, `supabase/admin_rls.sql`, las
> migraciones y el historial de commits.

La plataforma necesita: autenticación real (el estudiante debe recuperar su perfil en otra sesión y
otro dispositivo), persistencia de resultados de diagnóstico, un banco de ítems administrable,
autorización por rol (estudiante vs administrador) y aislamiento estricto de datos entre estudiantes.

Restricciones:

- **Un solo desarrollador**, sin tiempo para construir y operar un backend propio (API, deploy,
  monitoreo, certificados, parches de seguridad).
- **Presupuesto cero:** debe funcionar en free tier.
- El frontend ya está definido como SPA estática en GitHub Pages (ADR-001, ADR-003): no hay servidor
  donde ejecutar lógica de servidor.
- Los datos son personales y de menores de edad: el aislamiento no es negociable.

## Decisión

Se usa **Supabase como único backend**. Concretamente:

1. **PostgreSQL** de Supabase es el único almacén de estado del sistema.
2. **Supabase Auth** provee identidad (email+contraseña y Google OAuth).
3. **Row Level Security (RLS) es el único mecanismo de autorización.** Toda tabla se crea con
   `enable row level security` y sus policies en la misma migración. La función `public.is_admin()`
   resuelve el rol desde `profiles`.
4. **El navegador habla directo con Supabase** vía `@supabase/supabase-js`, usando el JWT del usuario.
   No hay capa intermedia.
5. La **anon key y la URL del proyecto viven en el bundle** (`src/universo/supabase.cljs`) y son
   públicas **por diseño**: su poder está limitado por RLS.
6. Todo acceso a datos del cliente pasa por **`universo.db.crud`** como capa canónica.
7. La lógica que requiere privilegios (envío de emails con `service_role`) vive en **Edge Functions**,
   no en el cliente.

**Corolario obligatorio:** cualquier control de acceso implementado en el cliente
(`:auth/admin?`, `protected-sections`) es **experiencia de usuario, no seguridad**.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Backend propio (Clojure/Ring, Node, Python) con API REST | Es la opción más flexible y permitiría validar respuestas en servidor, pero implica construir y **operar** un servicio: deploy, monitoreo, secretos, actualizaciones. Insostenible para una persona con presupuesto cero |
| Firebase | Equivalente en propuesta, pero el modelo de datos NoSQL encaja mal con las consultas relacionales que el producto necesita (déficits por módulo, cupos por banda, rosters, agregaciones de admin). Postgres además hace los datos portables |
| Solo `localStorage` (sin backend) | Elimina auth y persistencia entre dispositivos, imposibilita el panel admin y los cupos. El producto entero depende de datos compartidos |
| Supabase **con** una API intermedia propia | Añade el punto de control que hoy falta (validar respuestas, ocultar `correct_option`) pero reintroduce el costo de operación que motivó la decisión. Queda como opción futura si el riesgo R-16 se materializa |
| Hasura / PostgREST autogestionado | Mismo problema de operación, sin la integración de auth |

## Consecuencias

**Positivas**

- Cero infraestructura que operar: no hay servidor que caiga, actualizar ni parchear.
- Costo real de $0 en el volumen actual.
- **Los datos son portables:** es PostgreSQL estándar, exportable con `pg_dump`. Si Supabase deja de
  servir, se pierde auth y PostgREST, no los datos.
- RLS pone la autorización **junto a los datos**, donde no se puede eludir: ni un bug de UI ni un
  cliente manipulado la saltan.
- Auth resuelto de fábrica, incluido OAuth, verificación de correo y refresco de tokens.
- Edge Functions cubren el caso "necesito privilegios" sin desplegar un servicio aparte.

**Negativas / costos aceptados**

- **La seguridad se juega entera en RLS.** No hay defensa en profundidad: una policy mal escrita es un
  incidente de datos. Y en Postgres, una policy demasiado restrictiva se manifiesta como "0 filas
  afectadas", no como error — un fallo silencioso (L-09).
- **Toda la lógica de negocio del cliente es pública** e inspeccionable: incluidas las reglas del
  diagnóstico. Nada secreto puede vivir en el bundle.
- **El banco de ítems se expone al cliente autenticado** en la medida que las policies lo permitan:
  `correct_option` y las explicaciones viajan al navegador. Es el activo del proyecto (R-16, Q-12).
- **No hay validación de respuestas en servidor:** un usuario técnico puede manipular su θ. Aceptable
  porque el diagnóstico no es calificado ni tiene consecuencias académicas — pero deja de serlo si
  algún día lo tuviera.
- **Configuración hardcodeada:** la URL y la key están inline en el código, así que apuntar a un
  proyecto de staging requiere una decisión de configuración (P-06, T-09).
- **Dependencia concentrada:** auth, datos, autorización, funciones y encolado de email dependen de un
  solo proveedor (R-15).
- **Migraciones manuales:** se aplican a mano en el SQL Editor, en orden, sobre producción (R-02).

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Error de policy expone o bloquea datos | Migraciones idempotentes con policies explícitas; verificación manual del checklist; tarea T-11 (verificación automatizada con dos usuarios de prueba) | R-14 |
| Banco de ítems descargable por un usuario autenticado | Auditar las policies reales de `questions` (Q-12); evaluar entregar el ítem sin `correct_option`, lo que exigiría un ADR nuevo | R-16 |
| Se desarrolla contra producción | T-09 (staging); toda migración idempotente | R-02 |
| Cambio de términos o límites del proveedor | Datos portables (`pg_dump`); I/O centralizado en `db.crud` reduce el costo de migrar | R-15 |
| Sin respaldo propio verificado | T-07 (respaldo documentado y restauración probada) | R-03 |
| La anon key pública amplifica cualquier fallo de RLS | Es la consecuencia aceptada del diseño: la mitigación **es** que RLS sea correcta | R-14 |

## Seguimiento

Reconsiderar (probablemente con un ADR que reemplace a este) si:

- Aparece la necesidad de **validar respuestas en servidor** (por ejemplo, si el diagnóstico pasa a
  tener consecuencias académicas o se detecta manipulación).
- El riesgo R-16 se materializa y hay que dejar de enviar `correct_option` al cliente.
- Se supera el free tier de forma que el costo deje de ser trivial.
- Se necesita lógica que RLS no puede expresar razonablemente.

En cada uno de esos casos, la alternativa natural no es abandonar Supabase, sino **añadir una capa
intermedia mínima** (Edge Functions con más responsabilidad, o un servicio pequeño) conservando
Postgres.

**Revisión obligatoria:** cada vez que se agregue una tabla, confirmar que tiene RLS habilitada y
policies escritas en la misma migración.

---

Relacionado: [[../project-memory/ARCHITECTURE]] §7 · [[../project-memory/RISKS]] R-14, R-15, R-16 ·
[[ADR-007-email-outbox-con-edge-function]] · `../supabase/SCHEMA.md`
