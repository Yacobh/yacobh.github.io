---
name: unidad-de-contenido
description: Dar de alta o completar una unidad de contenido medible (un módulo, ej. `aritmetica/enteros`) recorriendo TODOS los lugares donde hay que poner información — módulo, banda, prerrequisitos, ideas erróneas, ítems, recursos, test_config y los tres archivos del cliente que nadie recuerda. Úsala cuando haya que crear un contenido nuevo, partir uno existente en unidades más chicas, dar de alta un eje o un track, o auditar si una unidad ya publicada está completa. Es la capa de arriba de `banco-de-items`, que solo cubre los ítems.
---

# Unidad de contenido

Dar de alta una **unidad** en Academia Integral, completa y verificada.

Una unidad es **una fila de `modules`**: `aritmetica/enteros`,
`probabilidad/posicion`. Es la pieza más chica que el sistema sabe **medir**
(tiene banda de θ), **diagnosticar** (tiene ítems), **explicar** (tiene ideas
erróneas) y **remediar** (tiene recursos).

## En qué se diferencia de `banco-de-items`

**`banco-de-items` escribe preguntas. Ésta da de alta un contenido.** Una tanda de
ítems toca **una tabla**; una unidad toca **ocho**, y la diferencia no es de
tamaño: son preguntas distintas.

| | `banco-de-items` | `unidad-de-contenido` |
|---|---|---|
| **La pregunta** | *«¿cómo se escribe un buen ítem de este contenido?»* | *«¿qué hace falta para que este contenido exista, se pueda rendir, y produzca un plan?»* |
| **Tablas** | `questions` (+ `misconceptions` de los distractores) | `modules`, `module_prerequisites`, `misconceptions`, `questions`, `resources`, `resource_misconceptions`, `test_configs`, y la constraint del track |
| **Fuera de la base** | nada | `universo.topics`, `universo.bands`, el bundle, `SCHEMA.md`, `CONTENT.md`, `project-memory/` |
| **Entrada** | el módulo y la banda **ya existen** | no existen, o existen incompletos |
| **Verifica** | `verificar_items.py` | `verificar_unidad.py` (y llama al otro) |
| **Su defecto típico** | la clave siempre en A, LaTeX doble, dos alternativas correctas | el eje entero publicado **sin llegar a nadie** |

**La usás así:** `unidad-de-contenido` es la de afuera y **invoca** a
`banco-de-items` en su paso 5. Si el módulo, su banda y su `test_configs` ya
existen y solo hace falta tapar un hueco de dificultad, andá directo a
`banco-de-items` — esta skill sería ceremonia.

> ⚠️ **Escribir ítems no es lo caro.** Una unidad puede tener 18 ítems perfectos y
> **no funcionar**: sin `test_configs` los ítems no llegan a nadie (414 ítems
> inalcanzables, medido), sin banda explícita mueve las bandas de todas las demás,
> sin `misconceptions` no hay mapa de errores, y sin su slug en el cliente el plan
> no se puede personalizar (los 102 ítems de probabilidad, hoy). **Ésos son los
> defectos que esta skill existe para impedir, y ninguno lo ve `verificar_items.py`.**

## Antes de escribir: entendé qué estás afirmando

**Leé `referencias/las-tablas-y-su-sentido.md`.** Dice qué significa cada tabla
**hoy** (cuáles son portantes, cuáles están vacías, cuál tiene la semántica
corrida), cómo se relacionan, y **las tres juntas flojas** del esquema:

1. `test_configs` cuelga de `topic`; todo lo demás cuelga de `module_id`. **Son
   dos jerarquías independientes** y hoy no coinciden.
2. `module_id` es nullable: un slug mal escrito **no da error**, deja null.
3. La capa 2 (`resource_misconceptions`) está **diseñada y vacía**: todo el
   contenido que escribas va a llegar por la capa 1 genérica hasta que se llene.

Sin eso, dar de alta contenido es tachar casillas. Con eso, se entiende qué se
está afirmando y dónde se va a romper.

## Lo primero: por qué existe esta skill

**Porque el último eje que se dio de alta salió incompleto y nadie lo vio.**

`055` creó los seis módulos de `probabilidad/*` con su banda explícita, `056`
trajo sus 102 ítems, `059` le dio su `test_configs`. Todo verificado, todo
aplicado. Pero **nadie agregó los seis slugs a `universo.topics/module-slugs`**,
que es un `def` en el cliente. Consecuencia medida en el código:

```
question-select-cols (crud.cljs:597)  trae module_id, NO module_slug
   └── profile/module-slug-for (profile.cljs:36)  cae a topics/module-slug-for
        └── "probabilidad" no está en module-slugs ni en explicit-topic->module-slug
             └── nil  →  déficit = "unknown/probabilidad"
                  └── plan/resources-for-deficits no cruza → :general
```

**Los 102 ítems de probabilidad no pueden producir un plan personalizado.** La
migración estaba perfecta. El build estaba en verde. Los seis auditores en verde.
Lo que faltó fue **saber que ese lugar existía**.

Esta skill es esa lista. No agrega esquema: **enumera lo que ya hay que tocar.**

> ⚠️ **La lista se re-verifica, no se cree.** Es la lección **L-22** del proyecto
> (la memoria dijo «tres lugares» cuando eran cinco). Antes de usar
> `referencias/mapa-de-la-unidad.md` como checklist, corré su comando de
> re-verificación, que está en la primera línea del archivo. Si el mapa y el
> código no coinciden, **gana el código y se corrige el mapa en el mismo commit**.

## Lo segundo: qué NO es esto

- **No calibra.** `difficulty` es hipótesis editorial, nunca medición (R-17, G-2).
- **No escribe los ítems.** Eso es `banco-de-items`, y esta skill la invoca.
- **No decide el temario.** Qué entra y qué no en M1 lo decide el owner. Si un
  contenido no está claramente dentro, se **pregunta** y se anota en
  `project-memory/OPEN_QUESTIONS.md`. No se infiere del currículo.
- **No es una excusa para producir contenido.** R-30 es el riesgo dominante del
  proyecto: convertir todo en más construcción de producto. Una unidad se da de
  alta porque **el test se agota sin ella** o porque **un estudiante concreto la
  necesita**, no para completar una tabla.

## Grano: qué tan chica puede ser una unidad

Tan chica como quieras. **No hace falta esquema nuevo**: «generalidades de los
números enteros» y «operaciones con enteros» son simplemente **dos filas de
`modules`** con bandas más angostas, en vez de una.

Lo que **sí** cambia al partir un módulo en dos:

1. **Crear módulos corre las bandas derivadas de todos los demás.**
   `bands/default-bands` reparte los centros entre **todos** los módulos del
   producto: al pasar de 18 a 24 el paso bajó de 0,28 a 0,21 logits y
   `geometria/pitagoras` se movió de `[1,95, 2,85]` a `[0,70, 1,60]` sin que
   nadie lo tocara. **Por eso toda unidad nueva lleva `band_min`/`band_max`
   explícitas desde el nacimiento**, sin excepción.
2. **Más módulos, menos ítems por módulo.** Con cobertura de 6 ítems por tramo de
   1,0 logit, una banda de 1,4 logits pide ~9 ítems mínimos. Partir en dos no
   reparte los que hay: **pide escribir más**.
3. **El `order_index` de los vecinos se corre.** Dejá huecos de 10 en 10.

## ⭐ El módulo es rendible (decidido 2026-09-17)

**Toda unidad nueva nace con su propio test.** El eje queda como **ubicador** —12
ítems que responden *«¿dónde estoy?»*— y debajo cada módulo tiene un test corto
dentro de su banda, encadenado por `module_prerequisites`.

```
numeros  (ubicador, 12 ítems, [-3, +3])
   │  θ ubica al estudiante en un módulo vía band_min/band_max
   ▼
aritmetica/numeros      [-3,0 · -1,6]   6-8 ítems
aritmetica/enteros      [-2,4 · -1,0]   ← prereq duro: numeros
aritmetica/fracciones   [-1,8 · -0,4]   ← prereq duro: enteros
```

⚠️ **Esto todavía no se puede implementar tal cual, y hay que decirlo antes de
prometerlo.** `next_question` filtra `where q.topic = p_topic` y **no filtra por
módulo**; los 100 ítems de `numeros` comparten `topic` y se distinguen solo por
`module_id`. Un `test_configs` de módulo, hoy, serviría los 100 ítems del eje.

Las dos salidas y su comparación están en **`referencias/las-tablas-y-su-sentido.md`
§5**. Recomendada: **B — `test_configs` gana `module_id` y `next_question` una
sobrecarga**, porque conserva el ubicador y no toca `questions.topic`, que el
histórico de `tests` referencia. **Pide un ADR: el próximo libre es ADR-038.**

**Mientras ese ADR no esté escrito y aplicado**, una unidad se da de alta con
`rendible: true` y su bloque `test_config` completo —que es la decisión ya
tomada—, y la migración de `test_configs` **se deja escrita y sin aplicar**,
anotada en `SCHEMA.md` como ⏳. Lo demás (módulo, banda, prerrequisitos, ideas
erróneas, ítems, recursos) entra igual y sirve desde el primer día.

## El flujo

```
0. Entender         referencias/las-tablas-y-su-sentido.md  ← qué afirma cada tabla
1. Preguntar        referencias/preguntas-de-alta.md   ← lo que no se infiere
2. Medir            referencias/metricas-de-la-unidad.md  ← el hueco real
3. Escribir el JSON plantilla-unidad.json
4. Verificar        python3 scripts/verificar_unidad.py contenido/unidades/<slug>.json
5. Ítems            skill banco-de-items (JSON propio + verificar_items.py)
6. Generar SQL      python3 scripts/generar_migracion_items.py  (para los ítems)
                    el resto del SQL se escribe a mano desde el mapa
7. Recorrer el mapa referencias/mapa-de-la-unidad.md ← TODOS los lugares
8. Aplicar          el owner, o el agente con `claude_ddl` si lo pide (ADR-040).
                    Migración ANTES que bundle (R-39), y SCHEMA.md en el mismo commit
9. Cerrar memoria   CLAUDE.md §11
```

**El JSON es la fuente de verdad, el `.sql` es un artefacto.** No se edita el SQL
generado: se corrige el JSON, se vuelve a verificar y se regenera.

## Paso 1 — Preguntar antes de escribir

Leé `referencias/preguntas-de-alta.md`. Son las preguntas cuya respuesta **no
está en el repo** y que, si se inventan, producen exactamente el tipo de dato
falso que `project-memory/` prohíbe.

Regla dura: **si una respuesta no la tenés, no la supongas.** Se escribe la
pregunta en `project-memory/OPEN_QUESTIONS.md` con su `Q-` y se entrega la unidad
señalando qué quedó pendiente. Una unidad incompleta y dicha es infinitamente
mejor que una completa e inventada — el proyecto ya pagó tres inferencias falsas
sobre personas en una sola sesión (T-145).

## Paso 2 — Medir el hueco antes de llenarlo

`referencias/metricas-de-la-unidad.md` trae las consultas. La que decide si la
unidad hace falta:

```sql
-- ¿Dónde se agota el test? Un tramo con menos de ~6 ítems es un hueco.
select topic,
       count(*) filter (where difficulty <  -2)                       as bajo_m2,
       count(*) filter (where difficulty >= -2 and difficulty < -1)   as m2_m1,
       count(*) filter (where difficulty >= -1 and difficulty <  0)   as m1_0,
       count(*) filter (where difficulty >=  0 and difficulty <  1)   as c0_1,
       count(*) filter (where difficulty >=  1 and difficulty <  2)   as c1_2,
       count(*) filter (where difficulty >=  2)                       as sobre_2,
       count(*)                                                       as total
  from questions
 where coalesce(active, true)
   and topic not like 'mq\_%' and topic not like 'electrotecnia%'
 group by topic order by total desc;
```

> ⚠️ El `where` excluye los **dos tracks que no son el producto** (`cuantica`,
> `electrotecnia`). El conteo crudo de `questions` dejó de significar «el banco
> del producto» — ver CLAUDE.md §4.

## Paso 3 — El JSON de la unidad

Copiá `plantilla-unidad.json`. Los campos y su razón de ser están comentados ahí
y detallados en `referencias/mapa-de-la-unidad.md`.

## Paso 4 — Verificar

```bash
python3 scripts/verificar_unidad.py contenido/unidades/<slug>.json
```

Es un **trinquete**, igual que los seis auditores del repo: sale con código 1 si
algo falla. Chequea lo que ningún ojo detecta leyendo — banda fuera de `[-3,3]`,
cobertura con huecos, prerrequisito que apunta a un módulo inexistente, ciclo en
el grafo, idea errónea sin recurso que la ataque, slug que no cumple el check de
`027`, y **los lugares del cliente que faltan**.

## Paso 7 — Recorrer el mapa

Este es el paso que existe por el defecto de probabilidad.
`referencias/mapa-de-la-unidad.md` tiene una fila por lugar, y cada fila dice
**qué pasa si no lo tocás** — porque todos fallan en silencio. Ninguno da error.

**No lo recorras de memoria. Abrí el archivo y tachá fila por fila.**

## Paso 8 — Aplicar, en este orden

1. **La migración primero, el bundle después.** Es **R-39**, y se materializó dos
   veces. Medido el 2026-09-16: con el bundle antes que la migración, PostgREST
   responde `404 PGRST202` y se pierde **la fila entera**, no solo el campo nuevo.
2. Si hay módulos nuevos **sin** banda explícita en alguna parte del sistema,
   aplicá primero las migraciones de banda de los ejes existentes: crear módulos
   corre las bandas derivadas. (Por eso `051` y `053` van antes que `055`.)
3. `npx shadow-cljs release app` + commit de `public/js/app.js` si tocaste
   `.cljs` — el artefacto está versionado (ADR-003) y un cambio no llega a
   producción hasta que se compile y se commitee.
4. `clj -M:test` en 0 failures.
5. `graphify update .`

## Paso 9 — Cerrar la memoria

CLAUDE.md §11. Como mínimo: `CURRENT_STATUS`, `sessions/SESSION-XXX.md`,
`supabase/SCHEMA.md` (la migración con su estado de aplicación), `BACKLOG`, y
`supabase/CONTENT.md` si cambió el contenido pedagógico.

## Relacionado

- Skill `banco-de-items` — los ítems, su contrato de datos y su verificador.
- `referencias/mapa-de-la-unidad.md` — **el entregable central de esta skill**.
- `project-memory/BACKLOG.md` — T-101 (mapa de prerrequisitos), T-118 (bandas),
  T-122/T-143 (bancos viejos), T-138 (selector), T-120…T-124 y T-128 (revisión
  pedagógica de 402 ítems que ya están delante de estudiantes).
- ADR-004 (motor), ADR-019 (fluidez), ADR-029 (el «no sé»), ADR-034 (versión del
  motor), ADR-035 (track visible).
