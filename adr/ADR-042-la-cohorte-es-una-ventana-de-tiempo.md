# ADR-042: Un curso es una ventana de tiempo, no una tabla `cursos`

> **Nota de numeración:** se salta el **041**, que quedó reservado para T-153 (el producto es
> honesto y se siente genérico) en SESSION-046. No es un hueco por descuido.

## Estado

Aprobada

## Fecha

2026-09-21

## Contexto

El 2026-09-21 el owner aplicó el sistema a **dos cursos reales de electrónica** —un 3º y un 4º
medio— en su liceo, y además habló con colegas de matemática que quieren usarlo. De ahí salió el
pedido: que un profesor tenga cuenta propia y vea el panel de **sus** estudiantes, agrupados por
curso.

El problema es que **el proyecto no tiene modelo de curso**. No existe `establecimientos`, no existe
`cursos`, no existe pertenencia de un estudiante a ninguno de los dos. Modelarlo es
[[../project-memory/BACKLOG]] **T-81** (aislamiento multi-tenant), su forma exacta es
[[../project-memory/OPEN_QUESTIONS]] **Q-36** (¿columna en `profiles`? ¿tablas propias? ¿claim en el
JWT?), y esa pregunta lleva abierta desde el 2026-08-16 sin respuesta. **T-79** —el rol `profesor`—
dependía de T-81 por una razón correcta: *«el rol sin aislamiento es un agujero, no una función»*.

Es decir: el camino escrito en el backlog exigía resolver el modelo de datos institucional **antes**
de poder mostrarle nada a un profesor. Y el owner tiene dos cursos rendidos y colegas esperando
ahora.

**El dato que desatascó esto no es una opinión, es una medición.** Los 143 diagnósticos del
2026-09-21, agrupados por hora de Chile:

| Bloque | Diagnósticos | Personas | Primero → último |
|---|---|---|---|
| Mañana | 71 | 26 | 10:35 → 11:41 |
| Tarde | 72 | 21 | 14:08 → 15:17 |

**Cero personas aparecen en los dos bloques.** Un curso que rinde en la sala deja sus intentos
contiguos en el tiempo y disjuntos de los del otro curso, porque es eso literalmente lo que pasó:
son dos horas de clase distintas.

## Decisión

**Una cohorte es una ventana de tiempo con nombre**: `{desde, hasta, topic-prefijo}`. Un diagnóstico
pertenece a la cohorte si `created_at ∈ [desde, hasta)`, su `topic` calza con el prefijo y su
`origin` es `'student'`.

De ahí se siguen cuatro reglas:

1. **No se crea ninguna tabla `cursos` ni `establecimientos` para esto.** T-81 y Q-36 siguen
   abiertas y se resuelven cuando haya un colegio de verdad, no antes.
2. **La ventana es un instante con zona, nunca una fecha.** `desde` y `hasta` viajan como
   `timestamptz`/ISO. La clase es en la hora del reloj de la sala.
3. **El intervalo es cerrado por abajo y abierto por arriba**, `[desde, hasta)`, para que dos
   ventanas consecutivas que comparten el borde no cuenten el mismo intento dos veces.
4. **La regla vive en un solo lugar del cliente**, `universo.cohorte`, que es puro y testeable
   (ADR-009), y **no puede divergir de la consulta SQL**: los criterios de conteo se llaman desde
   `universo.intento`, que ya los define una vez
   (`cuenta-como-error?` es literalmente el criterio de la consulta 2 de
   `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql`).

**Y la consecuencia que hace que esto no sea un parche:** una ventana con dueño es suficiente para
escribir el aislamiento en RLS sin modelar nada institucional. Cuando llegue el rol `profesor`
(T-79), su policy de lectura sobre `tests` es *«existe una cohorte mía cuya ventana contiene esta
fila»* — real, verificable con policies y no con la UI ([[../CLAUDE]] §7), sin `establecimiento_id`
en ninguna parte. **T-81 deja de ser precondición dura de T-79.**

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Modelar `establecimientos` + `cursos` + pertenencia** (T-81 completo) | Es la respuesta correcta a largo plazo y la respuesta equivocada hoy: exige responder Q-36, mover datos de menores con el colegio como cargador (R-28) y decidir cómo entra un curso sin crear 30 cuentas (Q-37), todo **antes** de que exista un solo cliente institucional. Es exactamente R-30: convertir un pedido concreto en más construcción de producto |
| **Lista de correos pegada a mano** por el profesor | Funciona y es lo que T-133 admitía como alternativa, pero obliga a transcribir 26 correos por curso cada vez y falla en silencio con un correo mal escrito: el estudiante desaparece del mapa sin que nadie lo note. Y no da nada sobre lo que escribir una policy |
| **Un código de curso que el estudiante escribe al entrar** | Es lo mejor a futuro, pero es una pregunta abierta entera (Q-37) con cuatro opciones evaluadas y ninguna elegida, y además **no sirve retroactivamente**: los dos cursos de hoy ya rindieron y ningún código los alcanza |
| **Agrupar por `topic`** (un banco = un curso) | Falso en los datos: los dos cursos rindieron **los mismos bancos** de electrónica. El banco dice qué se midió, no a quién |

## Consecuencias

**Positivas**

- **Funciona sobre los datos que ya existen, hacia atrás.** Los dos cursos del 2026-09-21 se pueden
  mirar hoy sin que nadie vuelva a rendir nada.
- **T-79 se desbloquea** sin resolver Q-36 ni T-81.
- **Cero migraciones para la fase 1.** El panel lee lo que `tests` ya guarda.
- La regla de agrupación es **inspeccionable**: el profesor ve y edita la ventana, así que puede
  darse cuenta de que está mirando el curso equivocado. Una tabla de pertenencia oculta el criterio.

**Negativas / costos aceptados**

- **Dos cursos simultáneos en salas distintas se mezclan.** Hoy no pasa (son horas distintas), y el
  `topic-prefijo` acota algo, pero es una limitación real y no un detalle: en un colegio con dos
  secciones rindiendo a la misma hora, este modelo no distingue. Ahí llega T-81 y no antes.
- **Quien define la ventana define lo que ve.** Por eso, cuando llegue el rol, **las cohortes las
  crea el owner** y el profesor solo lee: un profesor con autoservicio podría escribir una ventana
  que cubra la clase de un colega. Es una decisión de la fase 2, anotada acá para que no se pierda.
- Un estudiante que rinde fuera del horario de clase (en su casa, esa misma tarde) **no entra** en la
  cohorte de su curso. Para el uso presencial que motivó esto es correcto; para tarea en casa, no.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| Dar cuenta a un profesor es dar acceso a datos de **menores de edad** a otra persona | La fase 1 **no crea ninguna cuenta**: el panel lo ve el owner con su cuenta admin. La fase 2 no se aplica antes de cerrar F9 (respaldo T-07, staging T-09, verificación de RLS T-11) | [[../project-memory/RISKS]] R-28 |
| El mapa del curso sale sesgado por las corridas de depuración del owner | `origin = 'student'` (`067`) es guarda obligatoria en `de-la-cohorte`. Medido: 8 de las filas del 2026-09-21 son `admin_preview`, de 08:29 a 08:45 | R-37 |
| Convertir el pivote en más construcción de producto | Esta decisión **evita** una tabla nueva y una migración. La fase 1 es una pantalla sobre datos existentes | R-30 |
| La ventana se escribe en UTC y se lleva la noche anterior | El intervalo se construye siempre desde hora local; hay test (`la-ventana-respeta-la-hora-local`). Medido: un intento de las 21:34 de Chile cae en el día siguiente en UTC | — |

## Seguimiento

Se reconsidera cuando pase **cualquiera** de estas tres cosas:

1. **Dos cursos rinden a la misma hora.** Ahí la ventana deja de separar y hace falta T-81.
2. **Entra un establecimiento de verdad** (G-1). El aislamiento entre colegios no es una ventana de
   tiempo: es Q-36, y hay que responderla.
3. **Se empieza a usar fuera de la hora de clase** (tarea en casa). La contigüidad temporal deja de
   ser cierta y el criterio pasa a ser otra cosa.

Verificación de que el criterio sigue siendo válido, para correr antes de confiar en un mapa:
la consulta `0.b` de `supabase/queries/T-130_mapa_de_errores_de_un_curso.sql` muestra qué se rindió y
cuándo; si dos bloques se solapan, esta decisión ya no aplica a esos datos.

---

Relacionado: [[../project-memory/ARCHITECTURE]] · [[../project-memory/DECISIONS]] ·
[[../project-memory/BACKLOG]] T-133, T-79, T-81, T-82 · [[../project-memory/OPEN_QUESTIONS]] Q-36,
Q-37, Q-46 · [[../adr/ADR-009-logica-pura-testeable]]
