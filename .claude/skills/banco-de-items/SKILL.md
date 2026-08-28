---
name: banco-de-items
description: Redactar ítems PAES M1 para el banco (los cuatro ejes) y entregarlos como migración SQL verificada. Úsala cuando haya que crear preguntas nuevas, llenar huecos de dificultad de un banco, construir el banco de un eje que no existe, o catalogar ideas erróneas nuevas. Cubre números, álgebra, geometría y probabilidad/estadística.
---

# Banco de ítems

Redactar ítems para el banco de Academia Integral y entregarlos como migración
SQL **verificada**, no como texto suelto que alguien pega.

## Lo primero: qué NO es esto

**No calibra nada.** Calibrar es estimar `b` desde respuestas reales de
estudiantes; ningún modelo lo hace leyendo un ítem. Lo que esta skill produce es
una **hipótesis editorial de dificultad**, igual que el resto del banco (R-17,
G-2). Decirlo de otro modo en cualquier material sería exactamente el «ruido con
apariencia de rigor» que ADR-004 descartó.

**Escribir más ítems no acerca G-2, la aleja.** Calibrar pide ~30 respuestas por
ítem y hoy hay **0 ítems con 30**. Cada ítem nuevo es otro ítem esperando sus 30.
Se escriben ítems porque el test **se agota sin ellos**, no para engordar el banco.

**El cuello de botella es la revisión humana, no la redacción.** T-105 fueron 306
ítems revisados uno por uno, y ahí aparecieron tres sin ninguna alternativa
correcta y siete con dos. Una tanda que nadie va a alcanzar a revisar es una
tanda que no hay que escribir.

## Antes de escribir un solo ítem

1. **Lee `referencias/ejes-y-bandas.md`** — los cuatro ejes, sus módulos, y a qué
   `difficulty` apunta cada uno. **Ahí está resuelto el conflicto de bandas**: no
   improvises el reparto de dificultad.
2. **Lee `referencias/contrato-de-datos.md`** — las columnas, las reglas duras y
   la razón de cada una. Todas salen de un defecto real ya pagado.
3. **Mide el hueco antes de llenarlo.** Corre en el SQL Editor:

   ```sql
   select topic,
          count(*) filter (where difficulty <  -2) as bajo_menos2,
          count(*) filter (where difficulty >= -2 and difficulty < -1) as m2_m1,
          count(*) filter (where difficulty >= -1 and difficulty <  0) as m1_0,
          count(*) filter (where difficulty >=  0 and difficulty <  1) as c0_1,
          count(*) filter (where difficulty >=  1 and difficulty <  2) as c1_2,
          count(*) filter (where difficulty >=  2) as sobre_2,
          count(*) as total
     from questions
    where active and topic not like 'mq\_%'
    group by topic order by total desc;
   ```

   El objetivo sale de esa tabla, no de una intuición. Un tramo con menos de ~6
   ítems es donde el diagnóstico se va a agotar.

## El flujo

```
JSON de la tanda  →  verificar_items.py  →  generar_migracion_items.py  →  owner
   (trabajo real)      (trinquete)            (mecánico)                   (aplica)
```

**El JSON es la fuente de verdad, el SQL es un artefacto.** No se edita el `.sql`
generado: se corrige el JSON, se vuelve a verificar y se regenera. Un cambio
hecho en el SQL se pierde y deja de estar verificado.

### 1. Escribir el JSON

Vive en `contenido/items/<topic>.json`. Estructura en
`referencias/contrato-de-datos.md`; hay un ejemplo real y verificado en
`referencias/ejemplo-numeros.json`.

### 2. Verificar

```bash
python3 scripts/verificar_items.py contenido/items/numeros.json
```

Comprueba lo que este banco aprendió a golpes: clave repartida entre las cuatro
letras, una sola alternativa correcta, las cuatro explicaciones escritas, la
correcta sin idea errónea, slugs válidos, LaTeX con escape simple, enunciados sin
repetir y cobertura de dificultad sin huecos. **Sale con código 1 si algo falla.**

### 3. Generar la migración

```bash
python3 scripts/generar_migracion_items.py contenido/items/numeros.json
```

### 4. Entregar

El agente **no aplica migraciones**: se aplican a mano en el SQL Editor. Al
entregar, decir explícitamente:

- cuántos ítems y en qué tramos de dificultad;
- cuántas ideas erróneas nuevas entran al catálogo;
- que `difficulty` es una **hipótesis autoral**, no una medición;
- las consultas de verificación (van al pie de la migración generada);
- que hay que anotarla en `supabase/SCHEMA.md` con su fecha de aplicación.

## Cómo se escribe un ítem que sirve

El valor del banco **no está en el enunciado, está en los distractores.** La
promesa del producto es nombrar el error concreto del estudiante; un distractor
que nadie elegiría no diagnostica nada.

1. **Cada distractor es un error de razonamiento nombrable**, no un número al
   azar ni «la correcta ±1». Antes de escribirlo, poder completar: *«quien marca
   esta cree que…»*. Si no se puede, el distractor sobra.
2. **El error tiene que ser el que de verdad se comete.** Signos al restar
   negativos, sumar denominadores, multiplicar el exponente en vez de sumarlo,
   confundir porcentaje con puntos porcentuales. No errores exóticos.
3. **Las cuatro `error_*` se escriben siempre.** `score_answer` devuelve la de la
   alternativa **elegida**: la de la correcta es el «Bonus» que ve quien acierta
   (ADR-033) y **no debe hablar de ningún error**, sino cerrar el razonamiento.
4. **La explicación del distractor no reta.** Nombra el paso donde se torció y
   muestra el correcto. El estudiante que la lee acaba de equivocarse.
5. **La alternativa correcta no puede ser la más larga ni la más precisa.** Un
   patrón de forma es un atajo para acertar sin leer, que es la familia de
   defectos de R-35.
6. **`misconception_*_id` nulo es una respuesta legítima**: significa «error
   factual aislado, no patrón reutilizable». Inventar una entrada de catálogo por
   cada distractor es lo que 027 dice explícitamente que no hay que hacer.

## Reglas duras (las verifica el script, no confíes en el ojo)

| Regla | De dónde salió |
|---|---|
| Ninguna letra concentra más del 40 % de las claves, y las cuatro se usan | R-35: la clave estaba en A en **293 de 306** ítems y en D en ninguno |
| Exactamente una alternativa correcta | T-105: 3 ítems sin ninguna, 7 con dos |
| Las cuatro `error_*` presentes | `score_answer` (024) devuelve la de la elegida |
| La correcta lleva `misconception` en null | No hay error que catalogar |
| LaTeX con `\` simple, `$` balanceados | Migración 047: 76 ítems con `\\frac` que KaTeX mostraba en crudo |
| Slug `^[a-z0-9]+([-/][a-z0-9]+)*$` | Check de 027, que es la lección de T-51 hecha regla |
| `topic` en forma canónica | El trigger de 029 lo normaliza igual; el archivo debe decir la verdad |
| Enunciados sin repetir | La migración es idempotente por `(topic, question)`: el segundo no entraría |
| Cobertura sin huecos por tramo | El diagnóstico de `enteros` se agotó en 8 preguntas con 10 ítems |

## Contenido: de dónde sale y de dónde no

**Se redacta desde cero.** El temario DEMRE y los textos de referencia se usan
como **referencia bibliográfica**, nunca se transcriben — es el mismo criterio
con que se hicieron los recursos de Baldor (migración `018`), y la razón es que
esos textos tienen derechos vigentes.

**No copiar ítems de PAES liberadas** aunque sean públicas: tienen su propia
licencia y el valor del banco está en los distractores diseñados desde el
catálogo de ideas erróneas, que un ítem copiado no trae.

## Al terminar

Si la tanda cambió estructura, decisiones o riesgos, corresponde actualizar la
memoria del proyecto según §11 de `CLAUDE.md`. Como mínimo, toda tanda aplicada
se anota en `supabase/SCHEMA.md`.
