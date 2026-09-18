# ADR-040: El agente accede a la base con dos roles, y puede aplicar migraciones bajo autorización

## Estado

**Aprobada** — decidida por el owner el 2026-09-18. El SQL está escrito y
**verificado contra un PostgreSQL 14.18 desechable**; queda por aplicarlo en el
SQL Editor y poner las dos cadenas en `.env` (T-151).

## Fecha

2026-09-18

## Contexto

Hasta hoy **el agente no tenía ningún acceso a la base**. La consecuencia
práctica, visible en SESSION-044 entera: cada métrica se aproximó **leyendo los
JSON de `contenido/items/`** en vez de consultar `questions`. Eso funciona para
medir una tanda antes de aplicarla y **no sirve para nada de lo que importa**:

- las once métricas de completitud y las cinco de salud de
  `.claude/skills/unidad-de-contenido/referencias/metricas-de-la-unidad.md` son
  **todas SQL**, y ninguna se podía correr;
- **G-2** —calibrar el banco— se responde con `tests`, que el agente no podía
  leer. «¿Cuántas respuestas lleva cada ítem?» quedó escrito en la skill con el
  cuerpo vacío;
- **T-117** («¿la cadena por eje movió el 37 %?») lleva veinte días sin medirse
  y hay 40 tests reales esperando;
- **R-44** dejó tres causas posibles sin decidir y su propia mitigación dice
  *«medir la cobertura del banco en el extremo bajo»*.

El repo ya tiene `supabase/queries/` con consultas versionadas **que nadie
corre** salvo pegándolas a mano en el dashboard.

### La regla que esta decisión cambia

`CLAUDE.md` §9 decía: *«Las migraciones SQL se aplican **a mano** en el SQL
Editor de Supabase»*, y la skill `banco-de-items`: *«El agente **no aplica
migraciones**»*. Esa regla no salió de una decisión razonada: salió de que **no
había otra opción**, porque no existía credencial.

El owner la levanta explícitamente el 2026-09-18, con este argumento: el
andamiaje que el proyecto construyó —migraciones idempotentes con reversión
escrita, verificación contra un PostgreSQL desechable, seis auditores, dos
verificadores de contenido y `SCHEMA.md` como registro— es lo que hacía falta
para que aplicar deje de ser un acto de fe.

**Y hay evidencia de que ese andamiaje funciona, de esta misma sesión:** la
verificación contra la base desechable encontró en `068` **dos ítems que no
diagnosticaban nada** (las cuatro `misconception_*` en null, el modo de fallo de
`064`) y **dos falsos positivos** en la consulta de banda por comparar `real` con
`numeric`. Ninguno de los dos lo vio ningún script. Una migración así verificada
llega mejor probada que una pegada a mano en el dashboard.

## Decisión

**Dos roles de PostgreSQL, en `supabase/acceso_del_agente.sql`.** Uno para medir
y otro para aplicar, con credenciales distintas en variables distintas.

### `claude_ro` — el default, siempre disponible

`select` y nada más, sobre **ocho tablas enumeradas una por una**: `modules`,
`questions`, `misconceptions`, `resources`, `test_configs`,
`module_prerequisites`, `resource_misconceptions` y `tests`.

**No ve** `profiles`, `visitor`, `contacto`, `guestbook`, `enrollments`,
`notifications`, `email_outbox`, `student_profiles` ni `class_slots` — o sea
emails, IP, ciudad, user-agent e inscripciones. Puede decir *«el estudiante
3f2a… quedó en θ = −3,00»* y **no puede saber quién es**, porque `auth.users` le
está cerrada.

Dos detalles que no son adorno:

1. **El acceso se declara con policies, no con el grant.** Las policies
   existentes están escritas `to authenticated`, y `claude_ro` no lo es: con el
   grant solo, se conecta, consulta y **lee cero filas en silencio**. Es el mismo
   modo de fallo que un `module_id` en null. Por eso hay una `claude_ro_lectura`
   por tabla, y eso además es lo que pide `CLAUDE.md` §7.1 — RLS como el único
   límite de autorización.
2. **`grant usage on schema public` no alcanza.** Medido el 2026-09-18: con eso
   solo, el rol **podía crear tablas**, porque PostgreSQL ≤ 14 le regala `CREATE`
   en `public` al rol `PUBLIC` (`=UC/postgres` en el ACL). Un rol «de solo
   lectura» que crea tablas no lo es. Se corrige con
   `revoke create on schema public from public`.

### `claude_ddl` — aplicar migraciones **de contenido**, cuando el owner lo pide

> ⚠️ **La primera versión de este ADR estaba mal y el error mejoró el diseño.**
> Decía que `claude_ddl` sería miembro de `postgres`, y el SQL Editor lo rechazó:
>
> ```
> ERROR: 42501: permission denied to grant role "postgres"
> DETAIL: Only roles with the ADMIN option on role "postgres" may grant this role.
> ```
>
> En PostgreSQL 16+ otorgar un rol exige ADMIN OPTION sobre él, y el `postgres`
> de Supabase **no lo tiene sobre sí mismo**: el superusuario es `supabase_admin`,
> al que el SQL Editor no llega. O sea que **darle derechos de dueño a un rol no
> se puede desde el dashboard**.
>
> Eso obligó a un diseño con **un límite técnico de verdad**, en vez de la
> «separación de flujo de trabajo» que este ADR iba a tener que confesar que no
> contenía nada. El obstáculo dio el mejor diseño.

`claude_ddl` **no es dueño de nada**, y de ahí sale el corte:

| | |
|---|---|
| **PUEDE** | `insert` / `update` / `delete` sobre las siete tablas de contenido, y crear funciones y tablas nuevas. O sea **las migraciones de contenido**: ítems (`068`, `069`), ideas erróneas, módulos, recursos, filas de `test_configs` y las aristas de `module_prerequisites` |
| **NO PUEDE** | `alter table` ni `drop table` sobre lo que ya existe — exige ser dueño. **Las migraciones de esquema siguen siendo del owner**, y entre ellas están las de ADR-038 y ADR-039 |
| **NO PUEDE** | escribir en `tests`, que es solo lectura también para este rol |
| **NO VE** | ninguna tabla con datos personales |

**Ese corte no es una limitación que haya que tolerar: es el corte correcto.**
Separa **agregar contenido** —reversible con un `delete`, y algo que el banco
hace todas las semanas— de **cambiar la forma de la base**, que es donde un error
cuesta caro y donde conviene que haya una persona leyendo antes.

Y **`tests` queda solo lectura a propósito**: es la evidencia que G-4 promete y
el histórico que nunca se reescribe. Un rol que puede aplicar migraciones de
contenido no tiene ninguna razón para poder tocarlo.

Dos cosas más, las dos medidas el 2026-09-18:

1. **Sin policy, el grant no alcanza tampoco para escribir.** Con los grants
   puestos y sin `claude_ddl_escritura`, el `insert` falla con
   `new row violates row-level security policy`. Es el mismo hallazgo que en la
   parte 1 pero del otro lado, y es `CLAUDE.md` §7.1 en acción: **la policy es el
   límite real; el grant es solo la puerta.**
2. **Hace falta `grant usage on all sequences`**, o el `insert` en `questions`
   falla por el `bigserial` de su `id`.

**El interruptor sigue siendo una sentencia:** `alter role claude_ddl nologin`,
verificado, y no toca la lectura.

### El procedimiento, que es donde está la seguridad real

Cinco reglas, y son las que hay que hacer cumplir, no el rol:

1. **Toda migración se verifica primero contra un PostgreSQL desechable** con el
   esquema real y **una segunda pasada** para probar idempotencia. Es lo que se
   hizo con `061`, `062`–`066` y `068`/`069`.
2. **Migración antes que bundle, siempre.** R-39 se materializó **dos veces**, y
   la segunda quedó medida: con el orden invertido, PostgREST responde
   `404 PGRST202` y se pierde la fila entera.
3. **Reversión escrita antes de aplicar.** Ya es convención de todas las
   migraciones del repo.
4. **Nada destructivo sin confirmación explícita en el momento:** `drop`,
   `truncate`, `delete` sin `where`, cualquier cosa sobre las tablas con datos
   personales, y **un `update` masivo del banco cuenta como destructivo**.
5. **El histórico de `tests` no se reescribe.** Es evidencia, y es el producto
   que G-4 promete.

Y una regla de registro: **`SCHEMA.md` se actualiza en el mismo commit**, con
quién aplicó y cuándo. Una migración aplicada y no anotada es peor que una sin
aplicar, porque la siguiente sesión no puede saber en qué estado está la base.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|---|---|
| **Seguir sin acceso** | Es el estado que esta decisión corrige. Deja las 16 métricas de la skill sin poder correrse, G-2 sin forma de medirse y `supabase/queries/` como una carpeta de texto |
| **Un solo rol con la cadena de `postgres`** | Funciona y borra la distinción entre medir —que es constante— y aplicar —que es puntual y autorizado—. Además expone `profiles` y `visitor` en el uso diario sin ninguna necesidad |
| **Solo lectura, y las migraciones siguen a mano** | Era la propuesta inicial de esta sesión, y el owner la rechazó con argumento. Desbloquea la medición, que es la mitad; deja el cuello de botella del owner aplicando todo, que es bus factor 1 (R-01) |
| **El MCP oficial de Supabase con `--read-only`** | Razonable y más integrado, pero no cubre el caso de aplicar, y agrega una dependencia y un token personal más donde `psql` —ya instalado, 14.18— alcanza. Se puede sumar después sin deshacer nada |
| **`grant select on all tables in schema public`** | Una línea en vez de ocho, y expone `profiles` y `visitor` hoy, más **cualquier tabla que alguien cree mañana** sin pensar en esto. Las ocho van enumeradas para que sumar una sea una decisión escrita |

## Consecuencias

**Positivas**

- **Las 16 métricas de la skill pasan de texto a ejecutables**, y con ellas la
  única forma de saber si una unidad está completa sin adivinarlo.
- **G-2 deja de estar bloqueado por falta de acceso.** «¿Cuántas respuestas lleva
  cada ítem?» se puede responder, y con eso el reporte de T-77 deja de depender
  de que alguien pegue consultas a mano.
- **T-117 se puede medir** con los 40 tests que ya existen, y R-44 puede
  contrastar sus tres causas posibles.
- **Se acorta el ciclo**: hoy una migración espera a que el owner tenga un rato.
- **Verificar deja de ser opcional en la práctica**, porque el agente que aplica
  es el mismo que corre la base desechable antes.

**Negativas / costos aceptados**

- **Las migraciones de esquema siguen necesitando al owner.** ADR-038 y ADR-039
  agregan columnas, así que las dos pasan por el SQL Editor. Es fricción real, y
  es la contrapartida de tener un límite técnico en vez de uno de buena fe.
- **Dos secretos más que cuidar**, en una base con datos de menores (R-28). Van a
  `.env`, que ya está en `.gitignore`, y `.env.example` documenta el formato sin
  valores.
- **Se pierde un control humano que existía de hecho.** El owner pegando la
  migración la leía antes. Eso deja de pasar por defecto, y por eso la regla 4
  (confirmación para lo destructivo) no es una formalidad.
- **La base de producción es la única que hay.** No hay staging: **T-09** sigue
  abierta y sube de importancia con esta decisión.

## Riesgos

| Riesgo | Mitigación | Ref. |
|---|---|---|
| Una migración mal aplicada en producción, sin staging donde probarla | Base desechable obligatoria + reversión escrita + idempotencia probada. **T-09 (staging) sube de prioridad** y deja de ser higiene | R-02, T-09 |
| Las credenciales terminan en Git o en un comentario | `.env` ya está en `.gitignore`; `.env.example` sin valores; `CLAUDE.md` §7.2 ya prohíbe secretos en el bundle | R-… ver Pendientes |
| El agente lee datos de estudiantes menores de edad | `claude_ro` **no tiene grant** sobre las tablas con datos personales, y es el rol del día a día. `tests` no trae identidad | R-28 |
| Se aplica algo y no queda anotado; la próxima sesión no sabe el estado real | `SCHEMA.md` en el mismo commit, con quién y cuándo. Es la regla que ya rige | — |
| Bus factor 1 al revés: el proyecto se acostumbra a que el agente aplique | El interruptor es una sentencia y está documentado. Y esta decisión **no cambia** que el owner decide qué se aplica | R-01 |

## Seguimiento

**Se revisa si:**

1. **Se aplica algo que había que revertir.** Una sola vez basta para volver a
   discutir el alcance; lo que se mide no es «si salió bien» sino si la
   verificación previa lo habría detectado.
2. **`SCHEMA.md` se desincroniza de la base.** Es la señal de que el registro no
   está aguantando el ritmo, y sin registro esto no se sostiene.
3. **Aparece un segundo destinatario institucional** (G-1): con datos de un
   colegio adentro, R-28 deja de ser buena práctica y pasa a ser contractual, y
   el acceso hay que volver a mirarlo con ese marco.

**Queda explícitamente fuera:**
- el MCP de Supabase, que se puede sumar después sin deshacer nada;
- staging (**T-09**) y respaldo (**T-07**), que esta decisión hace más urgentes
  pero no resuelve;
- cualquier acceso a `auth.users` o a las tablas con datos personales.

---

Relacionado: [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[../project-memory/RISKS]] R-28, R-39, R-37, R-02, R-01 ·
[[../project-memory/BACKLOG]] T-07, T-09, T-77, T-117, T-151 ·
`supabase/acceso_del_agente.sql` · `.env.example` ·
`.claude/skills/unidad-de-contenido/referencias/metricas-de-la-unidad.md`
