# Las preguntas de alta

Lo que **no está en el repo** y que, si se inventa, produce el tipo de dato falso
que `project-memory/` prohíbe explícitamente.

**Regla:** una respuesta que no tenés se escribe como `Q-` en
`project-memory/OPEN_QUESTIONS.md` y se entrega la unidad diciendo qué quedó
pendiente. **No se deduce.** El proyecto pagó tres inferencias falsas sobre
personas en una sola sesión (T-145): se infirió el rol de alguien por su patrón
de uso y por su dominio de correo, y falló en los dos casos.

Las preguntas están ordenadas: **cada una solo tiene sentido si la anterior está
respondida.**

---

## Bloque 0 — ¿Hace falta esta unidad?

**P0.1 · ¿Qué hueco medido llena?**
La respuesta válida sale de la consulta de `metricas-de-la-unidad.md`, no de una
intuición. Formas válidas:
- «el tramo `[-1, 0]` de `geometria` tiene 3 ítems y el test se agota ahí»
- «un estudiante concreto la necesita» (nombralo, aunque sea por rol)

Forma **inválida**: «para completar el eje», «para tener más contenido».

> ⚠️ **R-30 es el riesgo dominante del proyecto:** convertir todo en más
> construcción de producto y terminar otra vez con un producto mejor y cero
> clientes. Y la skill `banco-de-items` ya lo dice en su primera página:
> **escribir más ítems no acerca G-2, la aleja** — calibrar pide ~30 respuestas
> por ítem y hoy hay **0 ítems con 30**. Cada ítem nuevo es otro ítem esperando
> sus 30.

**P0.2 · ¿Quién la va a revisar, y cuándo?**
**El cuello de botella es la revisión humana, no la redacción.** Hoy hay **402
ítems activos sin revisión pedagógica** delante de estudiantes (T-120, T-121,
T-123, T-124) más 116 de electrotecnia (T-128). Una tanda que nadie va a alcanzar
a revisar es una tanda que **no hay que escribir**.

Si la respuesta es «nadie por ahora», **decilo en la entrega**. No es un bloqueo
absoluto, es un hecho que el owner tiene que ver antes de aplicar.

---

## Bloque 1 — Identidad

**P1.1 · ¿Es una unidad nueva, o parte una existente en dos?**
Partir implica: `order_index` de los vecinos corrido, bandas re-repartidas, e
ítems existentes reasignados de `module_id`. **Los ítems no se reparten solos.**

**P1.2 · ¿Cuál es el `slug`?**
`track/nombre`, minúsculas, sin acentos, sin espacios. Es la clave que usa todo
lo demás. **No se cambia después**: `questions.module_id` ya apunta, y renombrar
es una migración aparte.

**P1.3 · ¿A qué `track` pertenece? ¿Ese track ya existe?**
Si es nuevo → **A2 del mapa** (dropear y recrear `modules_track_check`), y la
pregunta siguiente se vuelve obligatoria.

**P1.4 · Si el track es nuevo: ¿es del producto PAES o es un track aparte?**
Determina `bands/product-tracks` (B3) y, sobre todo, **quién lo ve**:

| | `cuantica` | `electrotecnia` |
|---|---|---|
| destinatario | el autor, que es admin | **un alumno** |
| `test_configs.active` | `false` | `true` |
| ADR | ADR-018 | ADR-035, D-66, **R-42** |

⚠️ `test_configs_select` de `020` **no admite un estado intermedio**: o lo ve
todo el mundo autenticado, o solo los admin. No hay «visible para este
estudiante». Eso es **T-129**, abierta, y es precondición de G-1.

⚠️ Y toda consulta de métricas del banco PAES tiene que excluir los tracks que no
son el producto:
`where topic not like 'mq\_%' and topic not like 'electrotecnia%'`

---

## Bloque 2 — Medición

**P2.1 · ¿Cuál es su banda `[band_min, band_max]`?**
**Siempre explícita, nunca derivada** (A3). Criterios:

- Con diagnósticos por eje, **cada eje reparte sus módulos a lo largo de todo
  `[-3, 3]`**. «Difícil» significa **difícil dentro de ese eje**.
- **Las bandas se solapan a propósito.** Dentro de un mismo contenido hay ítems
  fáciles y difíciles; bandas disjuntas afirmarían que el ítem más difícil de
  `enteros` es más fácil que el más trivial de `fracciones`, que es falso y
  desviaría al test adaptativo.
- Ancho típico del reparto vigente: **1,4 a 2,4 logits**.

**P2.2 · ¿Cuántos ítems necesita?**
**≥ 6 por cada tramo de 1,0 logit** dentro de la banda. Una banda de 1,4 logits
pide ~9; una de 2,4 pide ~15.

**P2.3 · ¿Es rendible por separado, o se rinde dentro del test de su eje?**
Hoy la unidad rendible es **el eje**: cuatro `test_configs` (`numeros` →
`algebra`/`geometria`/`probabilidad`). Si esta unidad va a tener `topic` propio,
entra A9 completo y hay que responder P2.4 y P2.5.

**P2.4 · Si es rendible: ¿cuál es su `prerequisite_topic`?**
`null` significa **diagnóstico abierto a todo el mundo**. No es el default
inocente que parece: `020` sembró ~14 filas así y por eso el selector muestra
bancos muertos como si fueran puertas de entrada (T-122, T-138). Medido el
2026-09-10: **16 de 40 tests cayeron ahí**.

**P2.5 · Si tiene prerrequisito: ¿cuál es su `min_theta`?**
⚠️ **Hoy es `NULL` en los cuatro ejes**: basta *haber rendido* números, no haber
alcanzado nada. Rendir con θ = −2,9 abre los tres ejes igual. Si la respuesta es
«ninguno», **que sea una decisión dicha**, no el default heredado.

**P2.6 · ¿Qué parada? (`min_items`, `max_items`, `se_threshold`)**
Los cuatro ejes usan 5 / 12 / 0.35. ⚠️ **`se_threshold = 0.35` no se dispara
nunca**: con el motor v2 el piso del SE con 12 ítems es ≈0,73, y **0 de 17 tests
reales pararon por precisión** (T-111, R-38, Q-42). Copiar ese 0.35 es copiar una
regla que no corre. Si la unidad es corta, decidilo a conciencia.

> ⚠️ **Si tocás el estimador de θ, subí `universo.motor/version`** (ADR-034).
> Un θ guardado solo significa algo junto a las reglas que lo produjeron, y G-4
> promete entregar Δθ. Los parámetros (`c`, σ del prior) **no se hardcodean**:
> viven en `test_configs`.

---

## Bloque 3 — El camino

**P3.1 · ¿Qué unidad va ANTES? ¿`duro` o `blando`?**
`duro` = sin esto no se puede avanzar, y es **a donde manda un escape** (ADR-029).
`blando` = ayuda pero no bloquea.

Sin esta distinción el grafo se vuelve una maraña donde todo depende de todo y no
sirve para decidir nada.

**P3.2 · ¿Por qué? (`rationale`)**
Una frase, **para el profesor**. Es lo que evita un grafo lleno de dependencias
que nadie recuerda haber decidido.

**P3.3 · ¿Qué unidad va DESPUÉS?**
El alta de una unidad casi siempre agrega **dos** aristas, no una. Si solo
agregás la de entrada, la unidad es un callejón sin salida.

---

## Bloque 4 — El error

**P4.1 · ¿Cuáles son las ideas erróneas concretas de esta unidad?**
Una por cada forma **nombrable** de equivocarse. Es el producto: el mapa de
errores sustituye a la nota.

**P4.2 · Por cada una: ¿cuándo SÍ se usa y cuándo NO?**
Es el campo `description`, y es lo único que impide un catálogo de duplicados con
nombres distintos. Ejemplo real de `027`:

> *«Usar cuando el estudiante calcula a − (−b) como a − b. **NO usar** para
> errores de signo en la multiplicación.»*

**P4.3 · ¿Cada idea errónea tiene al menos un recurso que la ataque?**
Es A8 (`resource_misconceptions`). Hoy **la tabla está vacía**: si no lo
respondés, la capa 1 de «Mi plan» sigue siendo genérica **por estructura**.

**P4.4 · ¿Alguna ya existe en el catálogo?**
Declarala como preexistente. Desde el JSON no se puede consultar Supabase, y un
slug mal escrito se convierte en un `null` silencioso.

---

## Bloque 5 — Contenido

**P5.1 · ¿Hay una convención de notación o método que decide el owner?**
Precedente real y **no negociable por un agente** (decidido 2026-08-28): en
probabilidad, cuartiles con la **posición localizadora DEMRE** `P = k·n/4`, y
**varianza y desviación estándar NO entran en M1** de Admisión 2027.

Si un ítem contradice una regla así, **el ítem está mal**. Si no sabés si existe
una regla para esta unidad, **preguntá**.

**P5.2 · ¿Qué recursos tiene? ¿Van `published = true`?**
`published` es `false` por default y la policy `resources_select_published` lo
esconde sin avisar.

**P5.3 · ¿Esta unidad duplica un banco viejo que sigue en circulación?**
Es T-122 / T-143, y **es la única pérdida medida del proyecto en esta área**. Si
la unidad reemplaza algo, la migración tiene que apagar lo viejo:

```sql
update public.questions set active = false where topic = '<viejo>';
update public.test_configs set active = false where topic = '<viejo>';
```

`active = false`, **nunca `delete`**: es reversible y no toca el histórico de
`tests`, que es evidencia y que `universo.access` usa para desbloquear.

⚠️ Antes de apagar, **revisá si algún ítem vale la pena rescatar**: es contenido
que alguien escribió.

---

## Bloque 6 — Cierre

**P6.1 · ¿Qué se rompe de lo que ya existe?**
Casi siempre hay algo, y casi siempre es silencioso. Mínimo a chequear:
bandas derivadas de los demás módulos (A3), `order_index` de los vecinos,
`B1`/`B2` del cliente.

**P6.2 · ¿En qué orden se aplica?**
**Migración antes que bundle**, siempre. Es **R-39** y se materializó dos veces.
Medido el 2026-09-16: al revés, PostgREST responde `404 PGRST202` y se pierde
**la fila entera**, no solo el campo nuevo.

**P6.3 · ¿Qué queda sin responder?**
La lista de `Q-` que abriste. **Va en la entrega, no en un comentario del SQL.**
