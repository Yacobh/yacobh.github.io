# ADR-035: El track de Electrotecnia se publica visible para todos, porque no hay forma de mostrárselo a uno solo

## Estado

Aprobada — implementada en `supabase/migrations/062`–`066` (rama `track-electrotecnia`).
**No aplicada todavía en producción.**

## Fecha

2026-09-09

## Contexto

Un alumno de **Electrotecnia** —circuitos de continua y de alterna, nivel de escuela técnica o
primeros años de ingeniería— quiere usar la plataforma para prepararse. El material de partida es
una prueba real de la asignatura: reactancia, impedancia, leyes de Kirchhoff en circuitos de CA.

El precedente existe y está documentado. [[ADR-018-track-experimental-cuantica]] montó un track de
Mecánica Cuántica sobre el mismo motor IRT y demostró la afirmación de diseño que hasta entonces
nadie había verificado: **el motor es agnóstico del temario, y lo que lo ata a matemática escolar es
el contenido de `modules`, `questions` y `resources`, no el código.** Aquel experimento entró sin
tocar una línea de ClojureScript.

Pero hay una diferencia que cambia el problema entero, y es la única razón por la que hace falta un
ADR nuevo en vez de repetir el de 2026-08-11:

> **El destinatario de `cuantica` era el propio autor, que es admin. El destinatario de
> `electrotecnia` es un estudiante, que no lo es.**

`cuantica` se aisló con `test_configs.active = false`, apoyándose en la policy `test_configs_select`
de `020`:

```sql
using (active = true or public.is_admin())
```

Esa policy tiene exactamente dos estados: **visible para nadie salvo el admin**, o **visible para
todos los usuarios autenticados**. No hay un tercero. No existe hoy ninguna forma de mostrarle un
banco a un estudiante y no a los demás: no hay tabla de matrícula, ni grupo, ni columna de
visibilidad por usuario, ni cohorte que agrupe cuentas.

De modo que la pregunta que fuerza esta decisión no es «¿conviene tener un track de electrotecnia?»
—eso ya lo respondió ADR-018— sino **«¿qué se hace cuando el mecanismo de aislamiento que hizo
aceptable el experimento anterior es incompatible con el destinatario de este?»**.

Un tercer hecho relevante: desde `057` existe `questions.active`, y desde `059` los cuatro ejes PAES
están publicados. El selector de evaluaciones de un estudiante de PAES **ya** muestra bancos
duplicados (`numeros` junto a `numbers_v1`, `algebra` junto a `polinomios` y sus once fragmentos —
[[../project-memory/BACKLOG]] T-122). El selector ya es ruidoso; esta decisión lo empeora, y hay que
decirlo así y no suavizarlo.

## Decisión

**Se agrega un track `electrotecnia` de doce módulos y dos bancos a la misma base de producción,
como migraciones versionadas, y se publica con `active = true`, aceptando explícitamente que todo
estudiante de PAES M1 va a ver «Electrotecnia» en su selector de evaluaciones.**

En concreto:

1. **Es 100 % datos: no se toca una sola línea de ClojureScript.** `clj -M:test` cierra en las
   mismas 181 pruebas / 2677 aserciones / 0 fallas, el bundle no se recompila y los cinco auditores
   siguen en verde. La única alteración de esquema es ampliar dos `check` de lista cerrada
   (`modules.track` y `class_slots.track`) con un valor más.

2. **Cada módulo lleva banda explícita** (`band_min` / `band_max`), y eso es lo que evita tocar
   código. `universo.bands` es el único namespace que nombra tracks: un track desconocido queda
   fuera de `product-tracks` y **no recibe banda derivada**. Con banda explícita, `bands/band-for`
   la prefiere siempre, sea cual sea el track — y, más importante, **el reparto derivado de los 26
   módulos del producto no se mueve**, que es justo lo que `060` acaba de estabilizar.

3. **`active = true` es la decisión, y su reversión está escrita.** Un `update` de una línea apaga
   los dos bancos sin borrar nada. Está al principio de `065`, no al final.

4. **Son dos bancos, no doce.** `electrotecnia` (74 ítems, los doce módulos, θ ∈ [-3, 3]) es el
   punto de entrada: **un** diagnóstico que recorre el curso completo y devuelve un perfil en una
   sesión. `electrotecnia_ca` (42 ítems, los seis módulos de alterna, θ ∈ [-1, 3]) es la
   profundización en el temario de la prueba, con `electrotecnia` como prerrequisito y **sin
   `min_theta`**: exige haber rendido el general, no aprobarlo (ADR-013). Se descartó el modelo de
   `cuantica` —un topic por módulo, quince bancos— precisamente porque acá cada banco publicado es
   una línea más en el selector de todos.

5. **Todo el contenido lleva prefijo reconocible:** `topic` con `electrotecnia`, slugs de idea
   errónea con `et/`, slugs de módulo con `electrotecnia/`, `track = 'electrotecnia'`. Un `like`
   separa los tres dominios sin agregar una columna que el producto no necesita.

6. **Los ítems entran por la skill `banco-de-items`**, no a mano. El JSON de cada tanda vive en
   `contenido/items/` y es la fuente de verdad; el `.sql` es un artefacto generado. Es la diferencia
   de proceso con `cuantica`, cuyas cuatro migraciones de ítems se escribieron a mano antes de que
   la skill existiera, y significa que estos 116 ítems pasaron por el sexto auditor: clave repartida
   entre las cuatro letras (R-35), una sola alternativa correcta, las cuatro `error_*` escritas, la
   correcta sin idea errónea, LaTeX con escape simple (`047`) y cobertura de dificultad sin huecos.

7. **`065` trae dos guardas y las dos están probadas**: se niega a correr si faltan los doce módulos
   y se niega si alguno de los dos bancos no llega a 20 ítems activos. Es T-125 al revés —allá
   hubo 414 ítems sin config, o sea inalcanzables; el defecto simétrico, una config sin banco, es
   peor: el estudiante entra al diagnóstico y se queda sin preguntas.

Volumen entregado: 12 módulos, 60 ideas erróneas, **116 ítems** con 4 explicaciones cada uno, 24
recursos, 2 configuraciones de banco.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **`active = false`, como `cuantica`** | Es la opción segura y la que no molesta a nadie, y por eso fue la primera que se planteó al owner. Se descartó porque **deja el track sin destinatario**: el alumno no es admin y no vería nada. Guardar 116 ítems que nadie puede rendir es R-30 en su forma más literal — más producto, cero uso — y es exactamente el defecto que `059` acababa de cerrar |
| **Darle cuenta de admin al alumno** | Le daría acceso al panel completo: banco de ítems, perfiles de estudiantes, cupos, gestión de roles. Es un agujero de privacidad sobre datos de terceros para resolver un problema de visibilidad de dos filas |
| **Construir visibilidad por usuario** (tabla de matrícula + policy nueva) | Es la solución correcta a largo plazo y probablemente haga falta para G-1 —un colegio va a querer ver solo lo suyo—. Se descartó **ahora** por dos razones: toca una policy del camino crítico del producto para un solo usuario, y **convertiría un pedido de contenido en un proyecto de esquema**, que es la forma en que R-30 se materializa. Queda anotado como T-127 |
| **Un proyecto Supabase aparte** | Mismo argumento que ADR-018: duplica esquema, policies, `is_admin()`, RPC y despliegue del bundle. Y acá es peor, porque el alumno tendría que crearse una cuenta en un sitio distinto |
| **Un topic por módulo** (modelo `cuantica`, 12 bancos) | Doce líneas nuevas en el selector de todo estudiante en vez de dos, y fragmenta el diagnóstico: el alumno tendría que saber qué tema elegir **antes** de tener un diagnóstico que se lo diga. Contradice el objetivo de producto n.º 1 — de «no sé por dónde partir» a un plan en una sesión |
| **Un solo banco en vez de dos** | Más barato, pero deja sin cubrir el tema concreto de la prueba: con `max_items = 12` sobre doce módulos, un diagnóstico general toca la alterna de refilón. El segundo banco existe para que haya dónde profundizar |
| **Agregar `electrotecnia` a `bands/track-order` y `product-tracks`** | Habría dado banda derivada sin escribir bandas a mano, pero exige recompilar el bundle y —peor— **metería el track en el reparto de dificultad de los módulos del producto**, moviendo las bandas de los 26 módulos PAES cada vez que se agregue un módulo de electrotecnia. Es el defecto que `060` cerró, reintroducido |

## Consecuencias

**Buenas**

- El alumno tiene un diagnóstico adaptativo sobre su propio temario, con el error concreto nombrado
  detrás de cada alternativa, y puede rendirlo con su cuenta normal.
- **Es la segunda prueba del motor sobre un temario ajeno, y la primera con un usuario que no es el
  autor.** ADR-018 demostró que el motor es agnóstico del contenido; esto empieza a probar si el
  *producto* lo es.
- Ejercita la cadena completa de la skill `banco-de-items` sobre un dominio nuevo, con sus scripts
  sin modificar. Que `verificar_items.py` y `generar_migracion_items.py` hayan servido tal cual para
  electrotecnia es evidencia de que ese tooling no estaba atado a PAES.
- La cadena entera se probó contra un PostgreSQL 14 desechable construido **aplicando las
  migraciones reales del repositorio** (no un fixture escrito a mano, salvo las tablas previas al
  MVP que ninguna migración crea): aplicación limpia, guardas que frenan, idempotencia verificada
  por hash, `next_question` sirviendo ítem en los dos bancos y en tres alturas de θ, doce ítems
  consecutivos sin agotar el banco, un ítem inactivo dejando de servirse, y reversión completa.

**Malas / costos aceptados**

- **Todo estudiante de PAES M1 va a ver dos evaluaciones de Electrotecnia en su selector.** Es el
  costo central de esta decisión y no tiene mitigación dentro del esquema actual. Registrado como
  [[../project-memory/RISKS]] R-42.
- **La base de producción suma un segundo dominio ajeno al producto.** El conteo de `questions` deja
  de ser un indicador limpio del banco PAES: toda consulta de métricas de contenido necesita ahora
  `where topic not like 'mq\_%' and topic not like 'electrotecnia%'`. La skill `banco-de-items` ya
  trae `topic not like 'mq\_%'` en su consulta de medición y **queda desactualizada**.
- El contenido es **asistido por IA y no auditado todavía**, y acá pesa más que en ADR-018: allá el
  auditor y el destinatario eran la misma persona, y la revisión ocurría al estudiar. Acá el
  destinatario es un alumno que **no tiene cómo detectar un error de signo**. Los 24 recursos nacen
  `published = false` por eso; los 116 ítems **no tienen equivalente**, porque `questions` no
  distingue borrador de publicado — solo activo de retirado (`057`).
- `universo.topics/track-for` devuelve `nil` para estos topics y `universo.profile/dominant-track`
  cae a su segunda regla —el prefijo del slug del módulo del primer déficit—, que devuelve
  `"electrotecnia"` correctamente. Funciona, igual que con `cuantica`, **por la segunda regla y no
  por la primera**: si alguien cambia ese `or`, esto se rompe en silencio para los dos tracks.
- Los doce módulos son legibles por cualquier autenticado (`modules_select_auth` es `using true`),
  igual que los quince de cuántica. Aceptado por la misma razón.

## Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| El ruido en el selector confunde a un estudiante de PAES o le hace perder tiempo | El `display_name` empieza con «Electrotecnia · », que lo separa de los cuatro ejes. Si molesta, el apagado es un `update` de una línea, escrito al principio de `065`. R-42 |
| Un error de física o de cálculo en un ítem le enseña el error a un alumno que no puede detectarlo | Los 116 ítems pasaron `verificar_items.py`, que **no mira si la física es correcta**: verifica estructura. La revisión de contenido es T-127 y es la tarea que importa. Mientras tanto, `questions.active = false` retira un ítem sin borrarlo (`057`) |
| Aplicar las migraciones contra producción sin staging (R-02) | Verificadas contra un PostgreSQL 14 desechable, con guardas que fallan ruidosamente si el orden es el equivocado. La verificación cubre la lógica de las migraciones, **no el estado real de la base**: antes de aplicar conviene correr `supabase/queries/verificacion_esquema.sql` |
| Aplicar `064` antes que `063` deja los 42 ítems del banco de CA con las cuatro ideas erróneas en null, en silencio | Es el modo de fallo de T-119 y **no hay guarda que lo impida**: el `left join` no falla, resuelve a null. La consulta que lo detecta está en el bloque de verificación de `065`, con el número esperado medido |
| Que esto se convierta en más construcción de producto en vez de distribución (R-30) | Es contenido para un usuario concreto que lo pidió, no una funcionalidad especulativa. Pero **si el track crece a más módulos antes de que ese alumno rinda el primer diagnóstico, el riesgo se está materializando** |

## Seguimiento

- ⏳ **Aplicar `062`…`066` en producción, en ese orden**, y anotar la fecha en `supabase/SCHEMA.md`.
  El orden importa: `063` antes que `064`, y `065` al final.
- ⏳ Correr la batería de control del pie de `065` y contrastar con los valores esperados.
- ⏳ **Que el alumno rinda `electrotecnia` y anotar qué ideas erróneas aparecen.** Es el dato que
  este track existe para producir, y es lo único que convierte 116 ítems en información.
- ⏳ Revisar el contenido —rehaciendo las cuentas, no leyéndolo— y recién entonces publicar los 24
  recursos (T-127).
- ⏳ Actualizar la consulta de medición de la skill `banco-de-items`, que hoy excluye `mq\_%` pero no
  `electrotecnia%`.
- Si el track deja de tener destinatario, apagarlo con el `update` de `065` en vez de borrarlo: el
  histórico de `tests` referencia los ítems.

---

Relacionado: [[ADR-018-track-experimental-cuantica]] · [[ADR-013-config-parada-por-banco-y-prerequisitos]] ·
[[ADR-015-item-sin-respuesta-en-el-cliente]] · [[ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] ·
[[../project-memory/RISKS]] R-02, R-30, R-42 · [[../supabase/SCHEMA]]
