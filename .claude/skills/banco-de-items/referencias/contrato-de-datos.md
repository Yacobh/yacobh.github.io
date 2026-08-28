# Contrato de datos: qué columnas hay y por qué cada regla

## `questions` — las columnas que se escriben

`questions` **preexiste al esquema versionado**: no hay ningún `create table` en
`supabase/migrations/` del cual leer sus columnas. La fuente de verdad es
`question-select-cols` en `src/universo/db/crud.cljs` (L-46 es la lección de
haber supuesto lo contrario: la migración `047` falló con
`42703: column "explanation" does not exist`).

| columna | qué es |
|---|---|
| `question` | Enunciado. LaTeX inline entre `$…$` (KaTeX) |
| `option_a` … `option_d` | Las cuatro alternativas |
| `correct_option` | `'A'`, `'B'`, `'C'` o `'D'` |
| `error_a` … `error_d` | Explicación de **cada** alternativa, incluida la correcta |
| `misconception_a_id` … `_d_id` | FK a `misconceptions`, nullable |
| `topic` | Banco al que pertenece. Canónico (trigger de `029`) |
| `difficulty` | `b` en logits, misma escala que θ, en [−3, 3] |
| `module_id` | FK a `modules`, resuelta por `slug` en la migración |
| `order_index` | Orden dentro del módulo |

**No hay columna `explanation`.** No la inventes.

## `misconceptions` (migración `027`)

| columna | regla |
|---|---|
| `slug` | `not null unique`, check `^[a-z0-9]+([-/][a-z0-9]+)*$` — minúsculas, dígitos, `-` o `/` |
| `name` | `not null`, no vacío. Prosa **para el profesor**, no para el estudiante |
| `description` | Criterio editorial: cuándo usarla y cuándo no. Es lo que evita duplicados |
| `module_id` | Opcional, pista de módulo |

Lo que ve el estudiante es `questions.error_*`, **nunca** el `name`.

## `modules` (migración `002`)

Se referencian por `slug` (`aritmetica/enteros`, `algebra/polinomios`…). El
`left join` de la migración resuelve el id. **Un slug mal escrito no da error:
deja `module_id` en null**, y por eso la migración generada trae la consulta que
lo detecta.

## El JSON de una tanda

```json
{
  "topic": "numeros",
  "migracion_archivo": "049_banco_numeros.sql",
  "migracion_titulo": "Banco consolidado del eje de números",
  "migracion_notas": "Texto libre que va como comentario a la cabecera.",

  "cobertura_objetivo": { "min": -3.0, "max": 3.0, "ancho_tramo": 1.0, "min_por_tramo": 6 },

  "misconceptions_preexistentes": ["fracciones/suma-denominadores"],

  "misconceptions": [
    {
      "slug": "numeros/resta-de-negativos-como-suma",
      "name": "Trata la resta de un negativo como si fuera una resta común",
      "description": "Usar cuando el estudiante calcula a − (−b) como a − b. NO usar para errores de signo en la multiplicación.",
      "module_slug": "aritmetica/enteros"
    }
  ],

  "items": [
    {
      "module_slug": "aritmetica/enteros",
      "difficulty": -1.8,
      "order_index": 10,
      "question": "¿Cuál es el resultado de $7 - (-3)$?",
      "options": { "A": "4", "B": "10", "C": "-10", "D": "-4" },
      "correct": "B",
      "errors": {
        "A": "Restaste 3 en vez de restar −3. Restar un número negativo equivale a sumarlo: $7-(-3) = 7+3$.",
        "B": "Correcto. Restar $-3$ es sumar $3$, porque el opuesto de $-3$ es $3$.",
        "C": "Llegaste al 10 pero con el signo cambiado...",
        "D": "Sumaste los valores con el signo del segundo..."
      },
      "misconceptions": {
        "A": "numeros/resta-de-negativos-como-suma",
        "B": null,
        "C": "numeros/signo-del-resultado-por-el-ultimo-termino",
        "D": null
      }
    }
  ]
}
```

### Campos

- **`migracion_archivo`** — nombre del `.sql`. El número sigue al último de
  `supabase/migrations/`.
- **`cobertura_objetivo`** — hace fallar la verificación si un tramo queda con
  menos ítems que `min_por_tramo`. Es lo que impide el agujero que agotó a
  `enteros`.
- **`misconceptions_preexistentes`** — slugs que **ya están** en la base. Sin
  declararlos, el verificador los marca como no declarados, porque desde el JSON
  no puede consultar Supabase y un slug mal escrito se convertiría en un null
  silencioso.
- **`misconceptions`** — las nuevas. Van en la misma migración, **antes** de los
  ítems, con `on conflict (slug) do nothing`.
- **`errors.<letra>` de la correcta** — es el «Bonus» (ADR-033). Confirma y cierra
  el razonamiento; **no habla de ningún error**, porque quien lo lee acertó.

## Por qué cada regla dura

| Regla | El defecto que la pagó |
|---|---|
| Clave repartida, ninguna letra > 40 % | **R-35**: la correcta estaba en A en 293 de 306 ítems y en D en ninguno. La UI rotaba las alternativas, así que la posición visible salía repartida (79/78/74/75) y nadie lo vio; pero una rotación cíclica sobre una clave constante deja la posición en `4 − (id mod 4)`: se podía acertar el banco entero sin leer un enunciado |
| Una sola correcta | **T-105**: 3 ítems no tenían ninguna alternativa correcta y 7 tenían dos (la fracción simplificada y la no simplificada como opciones distintas) |
| LaTeX con `\` simple | **Migración 047**: 76 ítems escribían `\\frac`; se guardaban sin error y KaTeX los mostraba en crudo |
| `$` balanceados | Una fórmula sin cerrar se traga el resto del enunciado |
| Slug con formato | Check de `027`, que es **T-51** hecha regla: 26 topics donde varios eran el mismo escrito con y sin acento, tratados como bancos separados sin avisar |
| `topic` canónico | El trigger de `029` lo normaliza igual; escribirlo canónico hace que el archivo diga la verdad |
| Enunciados sin repetir | La migración es idempotente por `(topic, question)`: el segundo nunca entraría, en silencio |
| Cobertura por tramo | El diagnóstico de `enteros` paró en 8 preguntas por `:exhausted`: 10 ítems, ninguno cerca de donde llegó el estudiante |

## Sobre `difficulty`

Va en logits, misma escala que θ. **Es una apuesta editorial, no una medición** —
la calibración solo puede salir de responder el banco (R-17, Q-05, G-2).

El motor sirve el ítem con `b` más cercano a θ dentro de `[θ−1, θ+1]`, y amplía a
`[θ−2, θ+2]` antes de declarar el banco agotado. De ahí la regla de cobertura: un
tramo vacío es un test que se corta cuando el estudiante llega ahí.

Desde ADR-034 el modelo incluye azar fijo `c = 0,25`, así que un acierto en un
ítem muy por encima del nivel ya no cuenta como evidencia plena. Eso **no** cambia
cómo se asigna `difficulty`: sigue siendo «qué tan difícil es este ítem», no «qué
tan probable es acertarlo adivinando».
