# ADR-018: El motor IRT se reusa para un track experimental fuera del temario PAES

## Estado

Aprobada — implementada en `supabase/migrations/033`–`040` (rama `experimento-cuantica`).

## Fecha

2026-08-11

## Contexto

El autor del proyecto rinde un examen universitario de **Mecánica Cuántica** (Tema 3: momento
angular, con estructura declarada de 4 problemas de 2,5 puntos) y tiene como material de partida
unos apuntes propios en LaTeX que cubren solo una fracción del temario y quedan incompletos en
varias secciones.

Academia Integral tiene, ya construido y en producción, exactamente la máquina que ese problema
necesita:

- un **diagnóstico adaptativo IRT** que estima θ y para cuando el error estándar baja del umbral
  ([[ADR-013-config-parada-por-banco-y-prerequisitos]]);
- una **capa 0 de misconceptions** que nombra el error concreto detrás de cada distractor
  (`questions.error_a..d` + el catálogo de `027`);
- una **capa 1 de recursos** por módulo;
- una **cadena de prerequisitos** entre bancos, configurable por topic;
- un **filtro de esfuerzo por tiempo de respuesta**
  ([[ADR-014-tiempo-de-respuesta-como-eje-separado]]).

Nada de eso sabe qué es la PAES. El motor es agnóstico del temario: lo que lo ata a matemática
escolar es el **contenido** de `modules`, `questions` y `resources`, no el código. La pregunta que
fuerza la decisión es si se puede aprovechar eso sin contaminar el producto.

Hay dos hechos que la vuelven no trivial:

1. **No hay staging** ([[../project-memory/RISKS]] R-02). Todo lo que se aplique se aplica contra la
   base de producción, la misma que sirve a 80 usuarios reales.
2. **`questions` no tiene columna `published`.** A diferencia de `resources`, un ítem insertado está
   inmediatamente disponible para `next_question`, que además es `security definer` y por lo tanto
   ignora RLS ([[ADR-015-item-sin-respuesta-en-el-cliente]]).

## Decisión

**Se agrega un track `cuantica` de contenido experimental a la misma base de producción, como
migraciones versionadas, aislado del estudiante de PAES por `test_configs.active = false`.**

En concreto:

1. **Es 100 % datos: no se toca una sola línea de ClojureScript.** El bundle no se recompila y
   `clj -M:test` no cambia. La única alteración de esquema es ampliar el `check` de `modules.track`
   para admitir un cuarto valor.
2. **La barrera de aislamiento es `test_configs.active = false`** en los 15 bancos. La policy
   `test_configs_select` de `020` filtra `active = true or public.is_admin()`, así que el selector
   de evaluaciones de un estudiante no los ve. El admin — que es el autor, y el único destinatario —
   sí.
3. **Los recursos nacen `published = false`**, igual que `018`/`019`, según
   [[ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] §1.
4. **Todo el contenido lleva prefijo reconocible**: `topic` con `mq_`, slugs de misconception con
   `mq/`, slugs de módulo con `cuantica/`, `track = 'cuantica'`. Un `like` separa los dos dominios
   para contarlos, exportarlos o borrarlos, sin agregar una columna de dominio que el producto no
   necesita.
5. **La reversión completa está escrita y probada**, no supuesta: cinco `delete` y la restauración
   del `check` original dejan la base exactamente como estaba.
6. **`mq_momento_angular` es punto de entrada libre**, sin prerequisito, aunque la progresión
   natural del curso lo pondría después de cuatro bancos. Es el tema del examen: obligar a recorrer
   el temario en orden convertiría una herramienta de estudio en una carrera de obstáculos.

Volumen entregado: 15 módulos, 77 misconceptions, **123 ítems** con 4 explicaciones cada uno, 32
recursos, 15 configuraciones de banco.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **Un proyecto Supabase aparte** | Es la opción técnicamente más limpia y la que más se consideró. Se descartó porque duplica esquema, policies, `is_admin()`, RPC y despliegue del bundle para un experimento de una persona: el costo de mantener dos copias del esquema sincronizadas es permanente, y el beneficio (aislamiento) se consigue con `active = false` a costo cero. Si el experimento crece o llega a tener usuarios, esta decisión hay que revisarla |
| **Una tabla `questions_experimental` paralela** | Obligaría a modificar `next_question` y `score_answer` para que sepan de dónde leer, o a duplicarlos. Eso sí es tocar el camino crítico del producto — exactamente lo que el experimento no debe hacer |
| **Restringir `modules_select_auth` para ocultar los módulos nuevos** | Tocar una policy del camino crítico del producto para proteger 15 títulos con un blurb histórico. El riesgo de romper "Mi plan" para un estudiante real supera con creces el de que alguien lea "Momento angular" en una tabla |
| **No hacer el experimento** | Deja sin usar una máquina ya construida y pagada que resuelve el problema, y desperdicia la única oportunidad de probar el motor IRT sobre un temario **completamente distinto** — que es información real sobre qué tan general es el diseño |
| **Agregar una columna `domain` a `questions`/`modules`** | Cambio de esquema en tablas de producción para lo que un prefijo en un campo de texto ya resuelve. Contradice el criterio de mínima intervención que gobierna todo el resto de esta decisión |
| **`active = true` con un aviso en la UI** | Depende de un check de UI, que [[../CLAUDE]] §7.4 prohíbe explícitamente como control de acceso. La policy es la barrera real |

## Consecuencias

**Buenas**

- El autor tiene una herramienta de estudio adaptativa sobre su propio temario, con diagnóstico de
  errores concretos, en vez de releer apuntes incompletos.
- **Es la primera prueba del motor sobre un temario ajeno.** Que 123 ítems de física cuántica entren
  sin tocar una línea de código es evidencia dura de que la separación motor/contenido funciona —
  algo que hasta ahora era una afirmación de diseño sin verificar.
- El banco ejercita partes del sistema que el contenido PAES nunca ejercitó: cadenas de
  prerequisitos con ramas, `se_threshold` distinto por banco, catálogo de misconceptions poblado
  (hasta ahora estaba **vacío**, `027` se sembró sin datos a propósito).
- Las migraciones quedan como ejemplo trabajado de carga de contenido en volumen, con un patrón
  (dollar-quoting, CTE + `left join` por slug, idempotencia por `where not exists`) reutilizable
  para el contenido PAES pendiente (T-27, T-56).

**Malas / costos aceptados**

- **La base de producción ahora tiene contenido que no es del producto.** Cualquiera que la
  inspeccione va a encontrar 123 preguntas de mecánica cuántica y necesita este ADR para entender
  por qué. Es el precio de no montar un segundo proyecto.
- El conteo de `questions` deja de ser un indicador limpio del banco PAES: pasa de 387 a 510. Toda
  consulta de métricas de contenido necesita `where topic not like 'mq\_%'` de aquí en adelante.
- Los 15 módulos **sí** son legibles por cualquier autenticado (`modules_select_auth` es
  `using true`). Aceptado a propósito: son títulos con un blurb, y solo aparecen en "Mi plan" si un
  déficit apunta a ellos, cosa que exige haber rendido un test que el estudiante no puede ver.
- `universo.topics/track-for` devuelve `nil` para estos topics, y
  `universo.profile/dominant-track` cae a su segunda regla (el prefijo del slug del módulo del
  primer déficit), que devuelve `"cuantica"` correctamente. Funciona, pero por la segunda regla y no
  por la primera: si alguien alguna vez cambia ese `or`, esto se rompe en silencio.
- El contenido es **asistido por IA y no auditado todavía**. Vale acá lo mismo que en
  [[ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]]: una explicación de error incorrecta
  enseña el error. La diferencia con el caso PAES es que el auditor y el destinatario son la misma
  persona, y la auditoría ocurre naturalmente al estudiar.

## Riesgos

| Riesgo | Mitigación |
|--------|-----------|
| Poner `active = true` por descuido expone los 15 bancos al selector de todo estudiante | Aviso en bloque al principio de `040`; registrado como [[../project-memory/RISKS]] R-23 |
| Aplicar las migraciones contra producción sin staging (R-02) | Verificadas contra un PostgreSQL 14 desechable con un fixture del esquema: aplicación limpia, idempotencia (segunda corrida = 0 diferencias), contenido PAES intacto, y reversión probada de punta a punta |
| Un error de física en un ítem enseña el error | El contenido nace sin auditar y se audita al usarlo. La `difficulty` es una apuesta inicial, no una medición: no debe usarse para calibrar nada hasta tener respuestas reales |
| El fixture de verificación no es el esquema real (T-48 sigue abierto) | La verificación cubre la lógica de las migraciones, no el estado real de la base. Antes de aplicar en producción conviene correr `supabase/queries/verificacion_esquema.sql` |

## Seguimiento

- Aplicar `033`–`040` en el SQL Editor, **en orden**, y correr la batería de control del final de
  `040`.
- Rendir `mq_momento_angular` antes del examen y anotar qué misconceptions aparecen: es el dato que
  esta herramienta existe para producir.
- Después del examen, decidir si el experimento se revierte (procedimiento en `040`) o se conserva.
- Si aparece un error de física al estudiar, corregirlo **en la migración** y no solo en el panel:
  el archivo es la fuente de verdad.

---

Relacionado: [[ADR-013-config-parada-por-banco-y-prerequisitos]] ·
[[ADR-015-item-sin-respuesta-en-el-cliente]] ·
[[ADR-016-ia-en-el-pipeline-de-autoria-no-en-runtime]] ·
[[../project-memory/RISKS]] R-02, R-23 · [[../supabase/SCHEMA]]
