# ADR-015: El cliente no lee `questions` directamente; el ítem viaja sin su respuesta y la corrección ocurre en el servidor

## Estado

Aprobada

## Fecha

2026-08-08

## Contexto

### El hallazgo que dispara esta decisión

[[../project-memory/OPEN_QUESTIONS]] Q-12 llevaba semanas abierta preguntando qué policy usaba el
estudiante para leer `questions`, porque `007_questions_admin_rls.sql` restringe el `SELECT` a
`is_admin()` y sin embargo el diagnóstico funcionaba para estudiantes. La auditoría de
`pg_policies` ejecutada el 2026-08-08 en el proyecto real dio la respuesta:

```
questions | Enable read access for all users | SELECT | {authenticated} | qual: true
questions | questions_select_admin           | SELECT | {authenticated} | qual: is_admin()
```

Las policies de RLS son **PERMISSIVE**, es decir se combinan con **OR**. La regla efectiva de
lectura sobre `questions` es por lo tanto `true OR is_admin()` = **`true`**:
`questions_select_admin` es **inerte**, no restringe nada.

**Cualquier usuario autenticado puede leer todas las filas y todas las columnas de
`questions`**, incluidas `correct_option` y las cuatro explicaciones `error_a..d`. Basta crear una
cuenta gratuita y ejecutar `supabase.from('questions').select('*')` desde la consola del navegador.

El nombre de la policy —*"Enable read access for all users"*— es el texto exacto de la plantilla
del dashboard de Supabase, lo que confirma que fue creada desde la UI y explica por qué no aparecía
en ningún archivo versionado del repositorio.

### Por qué esto es grave por dos razones distintas

1. **Exfiltración del activo.** El banco de ítems con sus misconceptions es, por
   [[ADR-005-banco-de-items-en-vez-de-cms]] y el objetivo B-06 de
   [[../project-memory/BUSINESS_CONTEXT]], *el* activo del proyecto. Hoy es descargable entero con
   una consulta.
2. **Invalidación del diagnóstico.** Quien lea `correct_option` puede responder perfecto y obtener
   el θ que quiera. Como θ determina banda → cupo → plan, se corrompe el producto completo. Peor:
   cuando se calibre `difficulty` con respuestas reales ([[../project-memory/BACKLOG]] T-29 y T-45
   de [[ADR-014-tiempo-de-respuesta-como-eje-separado]]), esas respuestas falsas envenenarían la
   calibración de forma permanente.

Es exactamente el riesgo [[../project-memory/RISKS]] R-16, que ya anticipaba que la mitigación
—*"evaluar entregar el ítem sin `correct_option` (validación en servidor)"*— sería un cambio
arquitectónico y requeriría ADR.

### Restricción: el estudiante necesita leer preguntas

No se puede simplemente borrar la policy permisiva. El diagnóstico requiere que un estudiante
obtenga ítems: `universo.events.test/fetch-candidates` consulta `questions` filtrando por `topic` y
por una ventana de dificultad alrededor de θ. Sin lectura, el producto deja de funcionar para todo
el que no sea admin.

### Lo que NO sirve como control

Cambiar el `select "*"` del cliente por una lista explícita de columnas **no es una medida de
seguridad**: RLS filtra filas, no columnas, y el usuario puede construir su propia consulta contra
PostgREST con su JWT. Es el mismo error de clase que confiar en un check de UI, que
[[../CLAUDE]] §7.4 ya prohíbe explícitamente.

Los privilegios de columna de Postgres (`revoke select` + `grant select (cols)`) sí filtran de
verdad, pero se conceden **por rol de Postgres**, y tanto estudiantes como admins son el mismo rol
`authenticated` (el rol de admin vive en `profiles.role`, no en Postgres). Aplicarlos dejaría al
panel de administración sin acceso a `correct_option`, rompiendo el editor de preguntas.

### Contexto adicional de la misma auditoría

- **`public.questions` no existe en ninguna migración del repositorio.** `001_mvp_schema.sql`
  declara "Requiere: `public.questions`" y solo le agrega `module_id`. El DDL de la tabla que
  contiene el activo principal del proyecto no está versionado en ninguna parte.
- Al menos ocho policies llevan nombres de plantilla del dashboard, es decir el repositorio **no es
  la fuente de verdad de RLS**. Esto ya causó un error documentado: la nota de T-39 en
  [[../project-memory/CURRENT_STATUS]] afirma que `tests` "no tenía ninguna policy de SELECT propia
  del usuario", cuando sí existía (`Enable users to view their own data only`), creada desde la UI.
- RLS está **habilitado en las 15 tablas** de `public` (verificado con `relrowsecurity`), así que
  no hay ninguna tabla abierta por RLS apagado.

## Decisión

**El cliente deja de leer `public.questions` directamente. El ítem viaja al navegador sin su
respuesta correcta ni sus explicaciones, y la corrección ocurre en el servidor.**

Se implementa con el mismo patrón `security definer` ya probado en el repositorio
(`014_visitor_track_rpc.sql`):

1. **`public.next_question(...)`** — devuelve **un** ítem, con solo las columnas seguras
   (enunciado, alternativas, `topic`, `difficulty`, datos del módulo). Nunca `correct_option` ni
   `error_*`. La selección por cercanía a θ y el ensanchamiento de ventana se hacen **en SQL**, no
   en el cliente.
2. **`public.score_answer(...)`** — recibe el ítem y la alternativa elegida, y devuelve solo
   `{correcto?, explicación de la alternativa elegida}`. Nunca las cuatro explicaciones ni la letra
   correcta.

   > **Refinamiento 2026-08-09 (migración `026`), durante la implementación de T-47.** Se agrega la
   > **alternativa correcta** al retorno de `score_answer`. Motivo: el modal de feedback
   > (`feedback_modal.cljs`, `options-section`) muestra "Comparación de respuestas" —la elegida
   > junto a la correcta— cuando el estudiante falla, y sin ese dato el producto perdía justamente
   > la explicación del error que es su diferencial declarado (D-12, [[ADR-005-banco-de-items-en-vez-de-cms]]).
   > Es coherente con el objetivo de este ADR: el estudiante **ya comprometió** su respuesta para
   > ese ítem, y lo que se busca eliminar es la exfiltración masiva, no el sondeo ítem por ítem —
   > que ya figuraba como riesgo residual aceptado. El costo del sondeo baja de `4N` a `N` llamadas
   > autenticadas y registrables; sigue siendo O(N) contra **una sola** consulta.
   > `next_question` **no** cambia: sigue sin devolver la respuesta.
3. Se **elimina la policy permisiva** `"Enable read access for all users"` sobre `questions`. Queda
   `questions_select_admin` (`is_admin()`), que hasta ahora era inerte y pasa a ser la única regla
   de lectura directa: **el panel de administración no requiere ningún cambio.**

θ se sigue calculando en el cliente a partir de `{correcto?, difficulty}`. θ no es secreto y
moverlo al servidor sería un cambio mucho mayor (ver §Consecuencias, limitación conocida).

### Secuencia de despliegue — obligatoria en este orden

El artefacto compilado se publica manualmente ([[ADR-003-github-pages-artefacto-versionado]]), así
que aplicar la revocación antes de que el bundle nuevo esté en producción **rompería el diagnóstico
para todos los estudiantes**. Por eso el cambio se parte en tres migraciones:

| # | Migración | Qué hace | Cuándo aplicarla |
|---|-----------|----------|------------------|
| 023 | `rls_limpieza` | Limpieza sin relación con el agujero: elimina la tabla huérfana `dashboard`, consolida las policies redundantes de `tests`, versiona las creadas por UI | Ahora. Aditiva/inocua |
| 024 | `questions_rpc` | Crea `next_question` y `score_answer` | Ahora. **Aditiva: no rompe nada**, el cliente viejo sigue funcionando |
| 025 | `questions_revoke_lectura_directa` | Elimina la policy permisiva | **Solo después** de que el bundle que usa los RPC esté verificado en producción |

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Borrar la policy permisiva y nada más** | Rompe el diagnóstico para todo usuario no admin: el estudiante necesita leer ítems. |
| **Restringir columnas en el cliente** (`select` explícito en vez de `*`) | No es un control de seguridad. RLS filtra filas, no columnas; el usuario consulta PostgREST directamente con su JWT. Mismo error de clase que confiar en la UI ([[../CLAUDE]] §7.4). |
| **Privilegios de columna de Postgres** (`revoke select` + `grant select (cols)`) | Se conceden por rol de Postgres, y estudiantes y admins comparten el rol `authenticated` (el rol de admin vive en `profiles.role`). Dejaría al editor de preguntas del panel sin `correct_option`. Habría exigido mover *también* la lectura de admin a un RPC, más cambio por el mismo resultado. |
| **Vista `questions_public` con solo columnas seguras** | Funciona, pero depende de sutilezas de `security_invoker` y de que el dueño de la vista evada RLS de la tabla base — comportamiento correcto pero frágil de razonar y de auditar. El RPC `security definer` es explícito, ya está probado en el repo (`014`) y además permite mover la selección del ítem al servidor, que es una mejora aparte. |
| **Calcular θ también en el servidor** | Es lo correcto a largo plazo, pero implica mantener el estado del test en la base y reescribir el flujo completo de `events/test.cljs`. Desproporcionado para cerrar esta vulnerabilidad. Queda como limitación conocida y tarea aparte. |
| **Dejarlo así hasta después del go-live** | El daño no es solo robo del banco: son respuestas falsas contaminando la calibración futura de `difficulty`. El costo de arreglarlo crece con cada test rendido. |

## Consecuencias

**Positivas**

- El banco deja de ser descargable con una consulta. Recuperar la clave de respuestas pasa a exigir
  `4 × N` llamadas autenticadas y registrables, en vez de un `select *`.
- `questions_select_admin` deja de ser inerte y pasa a ser la regla real; el panel de admin
  funciona sin cambios.
- **Mejora colateral:** hoy `fetch-candidates` descarga *todos* los ítems de la ventana de
  dificultad para elegir uno en el cliente. Con `next_question` viaja **un solo ítem**: menos datos
  expuestos y menos tráfico.
- Las explicaciones de error dejan de viajar completas: el estudiante recibe solo la de la
  alternativa que eligió, que es lo único que la UI muestra.
- La corrección server-side es la precondición natural para cualquier registro confiable de
  respuestas (calibración, T-29/T-45).

**Negativas / costos aceptados**

- Un round-trip adicional por respuesta. Mitigable: el prefetch de la siguiente pregunta ya existe
  y se mantiene.
- Cambia `events/test.cljs`, `db/crud.cljs` y el flujo de feedback de `diagnostic_test.cljs` — es
  el corazón del producto y no tiene tests automatizados de UI. Exige prueba manual del diagnóstico
  completo antes de aplicar la migración 025.
- **Riesgo residual aceptado:** un usuario autenticado y decidido puede sondear `score_answer` con
  las cuatro alternativas de cada ítem y reconstruir la clave. El objetivo de este ADR es eliminar
  la exfiltración masiva, no hacer imposible el sondeo. La defensa fuerte (aceptar respuestas solo
  para ítems efectivamente servidos a ese usuario en un test activo) requiere estado de test en el
  servidor y queda fuera de alcance.
- **Limitación conocida, no resuelta aquí:** θ se calcula y se escribe desde el cliente
  (`student_profiles_update_own` permite al estudiante reescribir su propio `theta_band` y su
  `profile`). θ **no es un registro confiable** y no debe condicionar nada consecuente —precio,
  certificación— sin resolver esto antes.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Aplicar 025 antes de publicar el bundle nuevo deja el diagnóstico roto en producción | Secuencia obligatoria de tres migraciones documentada arriba; 025 lleva la condición escrita en su propia cabecera | R-13 |
| Sondeo de `score_answer` para reconstruir la clave | Aceptado como residual. Registrar volumen de llamadas por usuario si alguna vez importa | R-16 |
| El DDL de `questions` sigue sin estar versionado: un entorno nuevo no se puede reconstruir desde el repo | Tarea aparte para volcar el esquema real a una migración `000_baseline` | R-03, R-15 |
| Otras policies creadas por UI que nadie conoce vuelvan a aparecer | La migración 023 versiona las existentes; regla nueva: **ninguna policy se crea desde el dashboard** | R-14 |
| El estudiante reescribe su propio θ/banda y se inscribe en cohortes de otro nivel | Fuera de alcance de este ADR; documentado como limitación y tarea propia | R-14, ADR-006 |

## Seguimiento

- **Antes de aplicar 025:** probar el diagnóstico completo de punta a punta con una cuenta de
  estudiante real (no admin), incluyendo feedback por alternativa incorrecta y cierre del test.
- **Después de aplicar 025:** repetir `select * from pg_policies where tablename = 'questions';` y
  confirmar que solo quedan las cuatro policies de admin. Verificar además, con una cuenta de
  estudiante, que `supabase.from('questions').select('*')` devuelve **cero filas**.
- Se reconsidera este ADR si se decide mover θ al servidor: en ese caso `next_question` y
  `score_answer` se absorberían en un flujo de test con estado, y este diseño quedaría reemplazado.

---

Relacionado: [[ADR-002-supabase-como-unico-backend]] · [[ADR-005-banco-de-items-en-vez-de-cms]] ·
[[ADR-003-github-pages-artefacto-versionado]] · [[ADR-014-tiempo-de-respuesta-como-eje-separado]] ·
[[../project-memory/OPEN_QUESTIONS]] Q-12 · [[../project-memory/RISKS]] R-16, R-14 ·
[[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]]
