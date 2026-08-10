# ADR-017: `questions.topic` se mantiene canónico por trigger, no por convención ni por check

## Estado

Aprobada — implementada en `supabase/migrations/029_topic_normalization.sql` (T-51).

## Fecha

2026-08-10

## Contexto

`topic` es el identificador real de un **banco de preguntas**: sobre él se define la configuración
de parada ([[ADR-013-config-parada-por-banco-y-prerequisitos]], `test_configs.topic` es su clave
primaria), la cadena de prerequisitos entre evaluaciones, el historial en `tests.topic` del que
`universo.access` deriva qué desbloqueó cada estudiante, y el conjunto de ítems entre los que
`next_question` elige el siguiente.

Pero `topic` es **texto libre sin tabla propia y sin restricción**. La medición del 2026-08-09
(T-51) encontró 26 topics distintos donde varios son el mismo banco escrito de dos formas:
`factorización`/`factorizacion`, `términos_semejantes`/`terminos_semejantes`,
`división_algebraica`/`division_algebraica`, `Polinomios`(1)/`polinomios`(19).

Lo que hace grave al defecto no es la duplicación en sí, es que **el sistema no avisa**. Dos
variantes producen dos bancos separados, cada uno con su configuración, su historial y sus ítems.
Un test podía "agotar el banco" con 6 preguntas mientras las otras 2 estaban a un acento de
distancia; un estudiante podía tener desbloqueado `polinomios` y no `Polinomios`. Nada falla, nada
se registra: simplemente el producto se comporta peor de lo que debería y nadie se entera.

Es el mismo modo de fallo que [[ADR-015-item-sin-respuesta-en-el-cliente]] encontró en las
policies — una condición silenciosa que solo aparece si alguien va a medirla a mano.

## Decisión

**La forma canónica de un topic se garantiza en la base de datos, con un trigger `before insert or
update` que normaliza, y su definición se duplica a propósito en un namespace puro de
ClojureScript.**

1. **La regla**: `public.normalize_topic(text)` — quitar acentos, bajar a minúsculas, recortar
   bordes. `immutable`. Deliberadamente **no** unifica `_` con `-` ni con espacios: el fallo medido
   fue de acento y mayúscula, y fusionar más que eso podría juntar dos bancos genuinamente
   distintos, cosa que no se deshace.

2. **La garantía**: triggers sobre `questions`, `tests` y `test_configs`. El de `test_configs`
   normaliza además `prerequisite_topic` y anula la auto-referencia que quedaría.

3. **El espejo**: `universo.topics/normalize` repite la misma regla en el cliente, con tests.
   La fuente de verdad es la base; el espejo existe para que la UI y el perfil no tengan que
   consultar la base para saber si dos topics son el mismo banco.

## Alternativas Evaluadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| **`check (topic = normalize_topic(topic))`** — rechazar en vez de corregir | Le devuelve al admin un error que no sabe arreglar: escribió "Álgebra" en el editor de preguntas y la base le responde con una violación de restricción. El trigger hace lo que el admin quería que pasara. El costo aceptado es que la base modifica el dato en silencio, lo que se compensa documentándolo acá y en `SCHEMA.md` |
| **Tabla `topics` con FK desde `questions`** | Es la solución correcta a largo plazo y la que el proyecto probablemente quiera cuando los topics dejen de ser una lista corta. Hoy exige migrar `questions`, `tests` y la PK de `test_configs` (con su auto-FK) en una sola migración contra producción **sin staging** ([[../project-memory/RISKS]] R-02). El trigger consigue la invariante que importa —que no existan dos escrituras del mismo banco— sin esa exposición. Queda como evolución posible, no descartada |
| **Solo normalizar en el cliente** | No cubre las filas cargadas desde el SQL Editor ni desde el panel de otro origen, que es exactamente de dónde vinieron los duplicados. Además [[ADR-002-supabase-como-unico-backend]] ya fija que el cliente no es un límite de nada |
| **Corregir los datos una vez y confiar en la convención** | Es lo que estaba pasando: no había convención escrita y el problema se reconstruyó solo. Una migración de limpieza sin regla que la sostenga es trabajo que hay que repetir |
| **Normalizar también `_`, `-` y espacios** | Más agresivo que el fallo medido. `terminos_semejantes` y `terminos-semejantes` *probablemente* sean lo mismo, pero probablemente no basta para fusionar bancos de forma irreversible. Si aparecen, se mide primero |

## Consecuencias

**Positivas**

- El defecto no se puede reconstruir cargando un ítem a mano, que es como se construyó.
- `test_configs`, `tests` y `questions` quedan garantizadamente alineados, así que
  `universo.access` deja de poder perder avances por una diferencia de escritura.
- El backfill de `module_id` se vuelve posible: con topics canónicos, una tabla de equivalencias
  chica más una regla de sufijo cubre casi todo el banco.
- `universo.topics/duplicate-groups` y `/unmapped` permiten volver a hacer la pregunta de T-51
  sobre cualquier lista de topics sin consultar la base.

**Negativas / costos aceptados**

- **La base modifica el dato en silencio.** Un admin que escriba "Álgebra" verá "algebra" guardado
  sin aviso. Es intencional, pero es sorpresa; está documentado en `SCHEMA.md` y en el panel no hay
  señal visual (mejora posible, no bloqueante).
- **Una regla duplicada en dos lenguajes.** SQL y ClojureScript pueden divergir. Se mitiga con el
  espejo explícito en ambos comentarios y con los tests de `universo.topics`, pero **nada verifica
  automáticamente que las dos implementaciones coincidan** — mismo tipo de deuda que ya existe
  entre `universo.slots.logic` y el trigger de confirmación de cupos.
- Un `insert` con una variante de un topic existente ahora falla con violación de clave primaria en
  `test_configs` en vez de crear una fila. Es la protección funcionando, pero el mensaje de error no
  lo explica.
- La normalización **no arregla** los 128 ítems de `diagnostico`/`PAES_M1` sin módulo: esos son
  bancos mezclados y necesitan clasificación por ítem.

## Riesgos

| Riesgo | Mitigación | Ref. |
|--------|-----------|------|
| La fusión de `test_configs` pierde una cadena de prerequisitos configurada | Gana la variante con más preguntas, con su prerequisito; verificado contra un Postgres desechable antes de entregar la migración | R-02 |
| `normalize_topic` en SQL y `universo.topics/normalize` divergen | Espejo declarado en ambos archivos; tests del lado CLJS; verificación manual del lado SQL en la prueba con fixture | R-08 |
| `lower()` sobre acentos depende de la collation de la base | Los acentos se quitan **antes** de bajar a minúsculas, así que el resultado no depende de la collation | — |
| La migración se aplica a medias contra producción | Idempotente y verificada dos corridas seguidas sin diferencias; consulta de verificación incluida al final del archivo | R-02 |

## Seguimiento

- **Al aplicar `029`:** correr las tres consultas de verificación del final de la migración. La
  segunda (`module_id is null` por topic) es el pendiente real de T-51: si aparece un topic con
  módulo evidente, se agrega **a la vez** al mapeo SQL y a
  `universo.topics/explicit-topic->module-slug`.
- **Si los topics dejan de ser una lista corta** o aparece la necesidad de metadatos por banco
  (nombre, orden, track), reconsiderar la tabla `topics` con FK: esta decisión es explícitamente el
  paso barato, no el destino.

---

Relacionado: [[ADR-013-config-parada-por-banco-y-prerequisitos]] ·
[[ADR-015-item-sin-respuesta-en-el-cliente]] · [[../project-memory/BACKLOG]] T-51, T-48 ·
[[../project-memory/OPEN_QUESTIONS]] Q-06 · [[../project-memory/RISKS]] R-02 ·
`../supabase/migrations/029_topic_normalization.sql` · `../src/universo/topics.cljs`
