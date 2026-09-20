# ADR-036: El intento en curso vive en su propia tabla, y `tests` sigue siendo la tabla de mediciones terminadas

## Estado

Aprobada — implementada en `supabase/migrations/070_intentos.sql`, `src/universo/rastro.cljs`,
`src/universo/db/crud.cljs` y `src/universo/events/test.cljs`.
**Verificada contra PostgreSQL 14.18 y 17.11 desechables y un PostgREST 12.0.3 real, y
✅ aplicada en producción el 2026-09-19 por el owner**, con verificación posterior contra la base
real (ver §Verificación). ⚠️ **La aplicó el owner y no el agente**: tres de sus sentencias exceden el
rol `claude_ddl` de ADR-040, medido.

⏳ **Falta publicar el bundle** para que empiece a haber filas.

## Fecha

2026-09-19

## Contexto

Hasta hoy, el diagnóstico escribía en la base **una sola vez**: el `insert` de `:save-test`,
disparado únicamente desde `:test/complete`. Un estudiante que respondía ocho ítems y cerraba la
pestaña no dejaba **nada** — ni una fila, ni una respuesta, ni el ítem en el que se fue.

Eso rompe dos cosas que el proyecto necesita por separado:

1. **«Cuáles no lo hicieron» no se puede responder.** Es la mitad del problema que abrió la épica
   E9, y es lo primero que pregunta un colegio cuando se le muestra el mapa de errores de un curso
   (**G-1**).
2. **Sesga la calibración.** Los ítems que hacen abandonar desaparecen de la muestra, que son justo
   los que más importan para estimar dificultad (**G-2**). Es el mismo modo de sesgo que
   [[ADR-034-azar-fijo-prior-suelto-y-version-del-motor]] y `067` cerraron por el otro lado:
   correlacionado con la variable de interés, invisible mirando promedios.

El código lo sabía y lo dejó escrito. `events/test.cljs`, en `:test/reintentar-ultimo`:

> *«Es seguro porque nada se persiste por ítem. […] Si algún día se guarda respuesta por respuesta,
> este evento deja de ser solo estado local y necesita su propia migración.»*

Y `irt/escape.cljs:9-10` nombra el hueco al revés: *«un abandono no deja rastro de por qué se
abandonó»*.

**Corrección de una premisa de la ficha de T-134.** La ficha decía que el abandono era totalmente
invisible. No lo es: el abandono **por el botón «Finalizar Test»** sí deja fila, con `stop_reason`
nulo — 2 de 17 en la sesión medida el 2026-09-13. Lo invisible es solo **cerrar la pestaña**, que
es el caso que ningún evento puede observar.

## Decisión

### 1. Una tabla nueva, `public.intentos`, y `tests` no cambia de significado

Una fila por **intento iniciado**: se crea al abrir el diagnóstico, se reescribe entera después de
cada respuesta, y se le sella `cerrado_en` al completar.

La ficha de T-134 proponía como opción (a) meter la fila en `tests` con una columna `estado`. **Se
descartó**, por dos razones que están en el repositorio y no en el gusto de nadie:

- **`tests` es append-only desde el cliente, y conviene que siga siéndolo.** Sus únicas policies son
  `tests_insert_own` y `tests_select_own` (`023`): hoy nadie puede reescribir un resultado ya
  rendido. La opción (a) obliga a abrir una policy de `UPDATE` sobre la tabla que guarda la
  medición, y a defenderla con un trigger. Es superficie nueva sobre el activo del proyecto, a
  cambio de comodidad de consulta.
- **Al menos seis lectores de `tests` asumen «fila = medición terminada», y los seis fallan en
  silencio.** `universo.access/best-theta-by-topic` —que toma el **máximo** θ del historial, así que
  un intento abandonado con un θ parcial inflado **desbloquearía un topic que el estudiante no
  ganó**—, el dashboard, `universo.profile`, los contadores del panel, la vista
  `tests_sin_identidad` y `queries/T-130_mapa_de_errores_de_un_curso.sql`. Es exactamente la clase
  de omisión que este proyecto ya pagó dos veces (L-22, L-46).

Con una tabla aparte, esos seis lectores **siguen siendo correctos sin tocar una línea**. El precio
es que «quiénes no terminaron» sale de una tabla distinta que «quiénes sí», y que T-133 hace un
join. Se paga con gusto.

`tests` gana una sola cosa: `intento_id uuid` nullable, para poder comparar el rastro con el
resultado. **No es la forma de saber si alguien terminó** — para eso está `intentos.cerrado_en`.

### 2. El abandono no se escribe: se deriva

    abandonado  ⇔  cerrado_en is null  y  hace más de 2 horas que no late

**Nadie puede avisar que cerró la pestaña.** Un estado `'abandonado'` que alguien tuviera que
escribir sería un estado que nunca se escribe, o un job programado que este proyecto no tiene ni
quiere. La regla vive en `public.intento_abandonado(cerrado_en, updated_at)` y su espejo con test
propio es `universo.rastro/abandonado?` — mismo criterio con que la confirmación de cupo se testea
en `universo.slots.logic` documentando que la fuente de verdad es el trigger (CLAUDE.md §8).

**Dos horas** porque el diagnóstico dura **5,8 minutos de mediana**, medido sobre corridas reales
(SESSION-046, que refutó el supuesto de los 20 minutos). Es ~20× esa mediana y más que cualquier
`max_minutes` de `test_configs`: no existe la sesión lenta pero real que la ventana pueda clasificar
mal. Es ancha a propósito — el error caro es decirle «abandonó» a quien está pensando.

### 3. El latido reescribe el rastro **entero**, no parchea

De ahí salen dos propiedades gratis:

- **`:test/reintentar-ultimo` sigue siendo seguro** (ADR-032). Deshacer una respuesta se refleja
  mandando el rastro como quedó, sin ninguna operación de borrado y sin nada que reconciliar. El
  evento pasa a `reg-event-fx` y late; si no lo hiciera, la respuesta deshecha se quedaría en la
  base hasta la siguiente.
- **Un latido perdido se recupera solo.** La respuesta siguiente reescribe todo, así que un corte de
  red no deja el rastro inconsistente, solo atrasado.

`parcial` es una **lista blanca** (`rastro/claves-del-rastro`), no una lista negra: el mapa `:test`
de `app-db` crece —ya le pasó con `:escape-resources`, `:editor` y `:stop-config`— y una lista negra
deja entrar en silencio lo que nadie agregó. Quedan afuera los enunciados (`:questions`), que se
reescribirían en cada una de las ~17 respuestas sin aportar nada que las respuestas no traigan.

### 4. Lo que decide el servidor, lo decide el servidor

`origin` (trigger, igual que `067`), `updated_at` y **`cerrado_en`**. El cliente manda la
*intención* de cerrar y la hora la pone `now()`.

Y `intentos_sellar` le saca `email` y `email-user` al jsonb **venga de donde venga**. `tests.test`
guardó 348 correos por esta misma vía y eso obligó a crear `tests_sin_identidad` el 2026-09-18
(**L-46**); acá se corta antes de que exista la primera fila. El recorte del cliente es UX; el
trigger es el límite (CLAUDE.md §7.4).

**A los roles del agente NO se les da lectura sobre `intentos`**, y es una decisión: sin policy no
hay acceso, que es el default seguro. `parcial` sale recortado, pero la lección de L-46 es que eso
se afirma *después* de mirar filas reales.

### 5. El intento del estudiante vale más que su rastro

Si el rastro no se puede escribir, **no interrumpe nada**: no hay error en pantalla, no hay
reintento por respuesta. Se apaga para el resto de la sesión y el diagnóstico sigue idéntico.

## Alternativas consideradas

| Alternativa | Por qué no |
|---|---|
| **(a) Fila en `tests` al iniciar, con `estado`** | Abre `UPDATE` sobre la tabla de mediciones y obliga a auditar seis lectores que fallan en silencio. Ver §1 |
| **(b) Autosave periódico, sin fila al iniciar** | Un estudiante que abandona en el ítem 1 puede no dejar rastro — y ése es justo el caso de «cuáles no lo hicieron» |
| **Una vista `intentos_abandonados`** | Una vista corre con los permisos de **su dueño**: sobre una tabla con RLS por `auth.uid()` la saltea entera y cualquier usuario vería los intentos de todos. Desde PG15 existe `with (security_invoker = true)` y producción es PG 17.6, así que la herramienta está — pero es **opt-in y silenciosa**: la vista a la que se le olvida la cláusula no falla, no avisa y publica todo. Para respuestas de estudiantes menores, una regla de privacidad que depende de que nadie olvide una cláusula no es una regla |
| **`beforeunload` para avisar el cierre** | No se dispara de forma confiable, y menos en móvil. La fila al iniciar no necesita que nadie avise |
| **Un job que marque los abandonados** | Infraestructura que el proyecto no tiene. Derivar la regla cuesta una función `stable` |

## Consecuencias

### Positivas

- «Cuántos empezaron y cuántos terminaron» pasa a ser una consulta, por banco y por fecha (G-1).
- **El ítem en el que se van** se puede preguntar: `parcial->'responses'->-1` de los abandonados. Es
  lo que T-134 existe para poder mirar, y la verificación de `070` la trae escrita.
- La muestra de calibración deja de perder a quienes abandonaron (G-2).
- `origin` separa las corridas de depuración también acá, desde la primera fila (R-37).

### Negativas / aceptadas

- **Una escritura por respuesta** en vez de una por test: ~18 en vez de 1. Irrelevante en volumen
  (350 tests en la historia del proyecto), pero es tráfico nuevo en el camino caliente.
- **T-133 hace un join** de dos tablas en vez de leer una.
- **Un intento abandonado y reintentado deja dos filas.** Es la verdad, y es información.
- **Corregir a mano un intento cerrado** obliga a desactivar el trigger a propósito. Más caro que un
  `update`, y ésa es la idea.
- `:test/reintentar-ultimo` deja de ser estado puramente local. El comentario que lo declaraba se
  reescribió en el mismo commit.

## Verificación

PostgreSQL desechable (`initdb` + `pg_ctl`, TCP porque el socket Unix del scratchpad excede los 103
bytes) con una réplica del estado **previo**: `auth.users`, `auth.uid()`, `profiles`, `is_admin()`,
`tests` con sus dos policies y `tests_sin_identidad` en su forma anterior. Y **PostgREST 12.0.3
real** con JWT firmados, que es lo único que prueba que policies y privilegios se alinean con un
`PATCH`.

⚠️ **Se verificó primero contra 14.18 y eso estaba mal: producción es PostgreSQL 17.6.** El error se
descubrió al conectarse a la base para intentar aplicarla. Se repitió la batería completa contra un
**17.11** desechable y **el comportamiento es idéntico en los dos** —aplicación, idempotencia,
triggers, policies, privilegios, sellado del cierre con `now()`, reversión—, pero el resultado no se
sabía antes de medirlo. Queda como regla: **la verificación se hace contra la versión mayor de
producción**, no contra la que está instalada.

- `070` aplica limpia con `ON_ERROR_STOP=1`, es **idempotente**, y la reversión del pie funciona y
  deja volver a aplicarla.
- El trigger pisa `origin` aunque el cliente mande `admin_preview`; el admin queda marcado solo.
- El `email` y el `email-user` del jsonb **no entran**, ni por SQL ni por PostgREST.
- Lo inmutable no se mueve: dueño, topic, origen y fecha de inicio.
- Otro estudiante no ve ni escribe el intento ajeno; `anon` no ve la tabla; `DELETE` da
  `42501 permission denied` **por privilegio**, no solo por falta de policy.
- Un intento cerrado no se reescribe: por policy desde el cliente, y por excepción desde el
  SQL Editor.
- Ciclo completo por HTTP —abrir 201, latir 204, cerrar 204, guardar el test con su `intento_id`
  201— y la consulta de resumen devuelve lo esperado.

### ⭐ Dos defectos que solo aparecieron contra PostgREST, no contra SQL

1. **`cerrado_en` venía del reloj del cliente.** Con un navegador atrasado, el `update` de cierre
   falla entero por el check `intentos_cierre_posterior`, el intento queda abierto para siempre y
   **alguien que terminó su diagnóstico cuenta como abandono** — en la única métrica que esta
   migración existe para producir. Ahora el cliente manda una intención y el servidor pone la hora.
   Medido: con la hora del cliente en 1970, `PATCH 400`; con la intención, `204` y `cerrado_en`
   correcto.
2. **Con la tabla ausente, PostgREST 12.0.3 responde `404` con el cuerpo vacío.** No hay `PGRST205`,
   no hay mensaje, no hay nada que reconocer por texto. Reconocer el error por su mensaje habría
   dejado el rastro encendido reintentando contra una fila inexistente. La regla que no depende de
   la versión de PostgREST es más simple: **si la apertura falla, por lo que sea, se apaga**; un
   latido suelto que falla no apaga nada, porque el siguiente reescribe todo.

### Quién puede aplicarla: medido, no supuesto

Con el rol `claude_ddl` de ADR-040 contra producción, tres sentencias fallan:

```
alter table public.tests add column intento_id  → must be owner of table tests
references auth.users(id)                       → permission denied for schema auth
create or replace view tests_sin_identidad      → must be owner of view
```

`claude_ddl` **sí** puede crear `public.intentos` (tiene `create` sobre `public`), y ahí hay un
segundo motivo para que no lo haga: quedaría como **dueño de la tabla**, y el dueño de una tabla
**está exento de su propia RLS** salvo `force row level security`. El rastro de los estudiantes
tendría un rol de agente capaz de leerlo entero.

No es un defecto del rol: es exactamente la línea que ADR-040 trazó entre **agregar contenido** y
**cambiar la forma de la base**. Esta migración es de las segundas, y la aplica el owner.

Lo que sí se comprobó contra producción, en solo lectura, son los tres supuestos de la migración:
`gen_random_uuid()` existe (built-in desde PG13), `public.is_admin()` existe y es `security
definer`, y `tests_origin_valido` admite exactamente `'student'` y `'admin_preview'`, que son los
dos valores que `intentos.origin` copia.

También se midió el **orden invertido** (R-39, tercera instancia): con el bundle antes que la
migración, el `insert` de `tests` con `intento_id` devuelve `PGRST204` y **se perdería el
diagnóstico recién rendido**. De ahí el reintento sin la columna, verificado: `400` → `201`.

## Relacionado

- [[../project-memory/BACKLOG]] T-134, T-133, T-110 · épica E9
- [[../project-memory/RISKS]] R-39 (orden de despliegue), R-37 (corridas de admin), R-28 (datos de
  menores)
- [[../project-memory/LESSONS_LEARNED]] L-22, L-46
- [[ADR-032-capa-cero-al-lado-y-editor-en-vivo]] — el contrato que esta decisión reescribe
- [[ADR-029-escape-como-tercera-categoria-de-respuesta]] — declara el hueco que esto cierra
- [[ADR-034-azar-fijo-prior-suelto-y-version-del-motor]] — por qué el rastro guarda `engine_version`
- [[ADR-040-el-agente-accede-a-la-base]] — por qué `intentos` queda fuera del alcance del agente
- `supabase/migrations/067_tests_origin.sql` — el trigger de origen que esto replica
