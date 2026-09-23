# T-76 · Primera corrida de calibración con respuestas reales

**Fecha:** 2026-09-23 · **Código:** `src/universo/irt/calibracion.cljs` (puro, con tests) ·
**Cómo se reproduce:** `scripts/calibrar_banco.sh <dir>` · **Datos:**
`supabase/queries/T-76_datos_de_calibracion.sql`, leídos con `claude_ro`.

> Este documento es **la comparación contra las etiquetas autorales** que pide el criterio de cierre
> de T-76. **No es el reporte técnico publicable** (T-77) y **no cambia ninguna `difficulty`**: mover
> etiquetas es una migración aparte y una decisión del owner.

---

## 1. Qué se estimó y cómo

- **Modelo:** el mismo del motor v2 (ADR-034): P = c + (1 − c)·L(θ − b), con c = 0,25.
- **Estimación conjunta penalizada** (JML con priors): θ ~ N(0, 2²) por persona y
  b ~ N(b_autoral, 1²) por ítem. La etiqueta es el punto de partida y el dato la mueve en
  proporción a la información que trae. Cada ítem trae `:peso-del-dato`, que es la fracción de la
  precisión de su `b` que viene de las respuestas y no del prior.
- **Persona = (estudiante, banco).** θ de bancos distintos no comparte escala (ADR-034).
- **Solo el primer intento** de cada estudiante en cada banco. Del segundo en adelante se repiten
  2 de cada 3 ítems con la explicación ya vista (R-47).
- **Solo respuestas que contaron para θ.** Quedan fuera los escapes (ADR-029) y las desestimadas por
  esfuerzo (ADR-014).
- **Etiqueta de comparación:** la `difficulty` **vigente**, buscada por id de ítem en todo el banco
  de preguntas. No se usa la que quedó guardada en cada respuesta: `083` rehízo `diagnostico`.

Por qué JML con prior y no θ fijo, que fue el ensayo de SESSION-049: con θ fijo, θ salía de las
mismas etiquetas que se querían corregir, así que el cálculo era circular.

## 2. Qué se validó antes de mirar el dato real

| Prueba | Resultado |
|---|---|
| Recuperación en simulación: 600 personas, 5 ítems con `b` conocidos, etiquetas deliberadamente malas (todas en 0) | Error < 0,35 en los cinco y orden correcto |
| Un ítem con una sola respuesta | `peso-del-dato` < 0,25: no finge medición |
| Puntaje perfecto (JML puro da +∞) | θ, `b` y `se` finitos |
| El caso real que no convergía (`electronica_notacion`) | Converge en 34 iteraciones; el test **falla sin el arreglo**, verificado |

**El defecto que la primera corrida destapó.** Con c > 0 la verosimilitud no es cóncava, y un paso
de Fisher completo puede pasarse del máximo. `electronica_notacion` quedaba en un ciclo y no
convergía ni en 3.000 iteraciones. Ahora cada paso se acepta solo si la log-posterior sube, y si no
se parte a la mitad. Hubo un primer test sintético con la misma forma que **no** reproducía el
ciclo: pasaba igual sin el arreglo. Por eso el test de regresión usa el dato real, anonimizado.

Un segundo defecto, del ejecutable y no del estimador: al principio las etiquetas se buscaban por
el topic del *test*. Las filas viejas de `numeros` sirvieron ítems que hoy viven en otros topics, y
esos ítems caían a 0,0 sin aviso. Se corrigió antes de leer ningún resultado.

## 3. Resultado por banco

**1.710 respuestas calibrables · 223 pares estudiante-banco.** «Se movió» = |Δ| ≥ 0,5 **y** |Δ|
mayor que su propio error estándar.

| Banco | Personas | Respuestas | Ítems vistos | Con n ≥ 10 | Con n ≥ 30 | Se movieron | Peso del dato (mediana) |
|---|---|---|---|---|---|---|---|
| `electronica_notacion` | 53 | 348 | 16 | 9 | 6 | **8 ↑** · 0 ↓ | 0,73 |
| `electronica_capacitores` | 40 | 233 | 16 | 8 | 1 | 3 ↑ · 0 ↓ | 0,61 |
| `electronica_ohm` | 35 | 201 | 16 | 8 | 0 | 3 ↑ · 0 ↓ | 0,56 |
| `electronica_kirchhoff` | 27 | 152 | 16 | 8 | 0 | 1 ↑ · 1 ↓ | 0,53 |
| `diagnostico` | 41 | 587 | 59 | 29 | 2 | 6 ↑ · 5 ↓ | 0,48 |
| `numeros` | 13 | 127 | 60 | 1 | 0 | 3 ↑ · 0 ↓ | 0,13 |
| Los otros 8 bancos | ≤ 4 c/u | ≤ 26 c/u | — | 0 | 0 | 0 | ≤ 0,16 |

**Lectura:** solo los cuatro bancos de `electronica` y `diagnostico` tienen datos que pesan más que
la etiqueta. En el resto, el `b` estimado es básicamente la etiqueta, y el `peso-del-dato` lo dice.

### 3.1 `electronica`: las etiquetas están comprimidas y **todas del lado fácil**

| Banco | Rango autoral | Rango estimado |
|---|---|---|
| `notacion` | −3,00 … −1,90 | −2,98 … **−0,56** |
| `capacitores` | −2,20 … −1,10 | −2,28 … **−0,02** |
| `ohm` | −2,80 … −1,70 | −2,80 … **−1,13** |
| `kirchhoff` | −1,80 … −0,65 | −2,06 … −0,37 |

15 de los 16 movimientos significativos de `electronica` son **hacia arriba**. Es la otra mitad de
T-170: el banco no solo se acaba porque sus etiquetas están apretadas en un logit, sino que además
esas etiquetas **subestiman** la dificultad de sus ítems más duros.

Los que más suben:

| Ítem | Qué pregunta | n | Aciertos | b autoral | b estimado | ± se |
|---|---|---|---|---|---|---|
| 1118 | Cuál expresión está bien escrita en notación científica | 24 | 11 | −2,35 | −0,80 | 0,52 |
| 1108 | 6×10⁻³ / 2×10⁻⁶ | 42 | 26 | −2,10 | −0,70 | 0,43 |
| 1112 | (4×10⁻³)·(5×10⁴) | 46 | 25 | −1,95 | −0,56 | 0,43 |
| 1101 | Dos capacitores de 22 µF en paralelo | 25 | 14 | −1,40 | −0,02 | 0,53 |

⭐ **Comprobación cruzada independiente.** #1108 y #1112 son exactamente «el ítem con más errores»
que `/aula` mostró el 2026-09-21 en la mañana y en la tarde (SESSION-048). Aquello salió de contar
aciertos por curso; esto sale de un modelo. Coinciden.

El único movimiento grande hacia abajo es **#1161** (Kirchhoff, una malla con tres resistores):
**21 de 21 aciertos**, de −0,65 a −2,06. Con cero errores, el modelo solo sabe que es «fácil para
todos los que lo vieron»: el número exacto es sobre todo prior.

### 3.2 `diagnostico`: se mueve en las dos direcciones, y el error es grande

| Ítem | Qué pregunta | n | Aciertos | b autoral | b estimado | ± se |
|---|---|---|---|---|---|---|
| 60 | ¿Qué fracción es mayor, 1/2 o 1/4? | 10 | 2 | −2,20 | −0,72 | 0,73 |
| 55 | (−3) + 5 | 10 | 2 | −1,70 | −0,61 | 0,77 |
| 71 | 2/3 + 1/3 | 17 | 5 | −1,20 | −0,15 | 0,70 |
| 97 | Factorizar x² − 9 | 7 | 6 | 1,30 | 0,21 | 0,72 |
| 113 | (x² − 4)/(x + 2) | 17 | 14 | 1,90 | 0,90 | 0,58 |

Errores de 0,6 a 0,8 sobre movimientos de ~1: **la dirección es informativa y la magnitud no**. Solo
dos ítems (34 y 73) llegan a 30 respuestas.

⚠️ **55 es uno de los tres ítems que `081` reparó** (2026-09-22), y `081` cambió cinco
alternativas. Las respuestas anteriores son a otras alternativas: el `b` de 55, 56 y 109 mezcla dos
versiones del ítem.

## 4. ¿Depende del prior?

Se corrió de nuevo con σ_b = 2, que es un prior el doble de suelto:

| Banco | Mismo signo de Δ | Se movieron (σ=1 → σ=2) |
|---|---|---|
| `diagnostico` | 58 de 59 | 11 → 22 |
| `electronica_notacion` | 15 de 16 | 8 → 9 |
| `capacitores`, `ohm`, `kirchhoff` | 48 de 48 | 8 → 12 |

**La dirección es robusta; cuánto se mueve depende del prior.** En `diagnostico` el número de ítems
movidos se duplica con el prior suelto, que es la firma de un banco con poco dato por ítem.

## 5. Lo que **no** se puede afirmar con esto

1. **No es una calibración publicable.** El banco con más datos tiene 6 ítems sobre 30 respuestas.
   Con esta muestra, la palabra correcta es *«estimado con N = 1.710 respuestas, con estos errores»*,
   no *calibrado* ni *validado* (T-77, B-07).
2. **Quedan fuera 185 intentos sin `user_id`** (de 2025-10 a 2026-05). Sin usuario no se puede
   separar el primer intento del resto. Incluirlos como personas sueltas es posible, pero metería
   reintentos memorizados (R-47).
3. **La cuenta de prueba `a@a.com` probablemente está adentro.** `claude_ro` no ve correos y T-145
   prohíbe deducir quién es alguien por sus filas. La lista `excluidos` de la consulta queda vacía
   hasta que el owner la llene.
4. **El prior en la etiqueta no es neutral.** Un ítem con pocos datos queda cerca de lo que dijo el
   autor. Es la elección honesta con este volumen, porque declara cuánto pesa, pero no es evidencia
   de que la etiqueta esté bien.
5. **La escala de cada banco la fijan sus etiquetas.** El origen de θ sale de los priors, así que
   «−0,70» en `notacion` y «−0,70» en `diagnostico` no son la misma dificultad.

## 6. Qué sigue

- **Para `electronica`, la evidencia alcanza para una decisión de contenido.** Hay que abrir el
  rango de etiquetas (T-170) y escribir ítems más difíciles. Mover las `difficulty` a los valores
  estimados sería una migración con criterio, como `083` (D-75), **no** una copia de esta tabla. Es
  decisión del owner.
- **Para `diagnostico`**, esperar datos. La próxima corrida vale la pena cuando haya ≥ 30 respuestas
  en al menos la mitad de los ítems activos.
- **T-77** se escribe sobre la corrida que el owner considere presentable, con la sección 5 como
  esqueleto de limitaciones.
