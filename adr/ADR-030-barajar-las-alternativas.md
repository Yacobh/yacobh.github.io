# ADR-030: Las alternativas se barajan con una permutación sembrada, no con una rotación

## Estado

Aprobada

## Fecha

2026-08-19

## Contexto

### El hallazgo

Revisando las claves de los cuatro bancos activos (T-105) apareció un dato que no se veía usando la
aplicación: **la alternativa correcta está en la letra A en 242 de los 306 ítems**. `numbers_v1`
(178), `paes_m1` (44) y `polinomios` (20) están al 100 %; `diagnostico` al 80 %, y **ningún ítem de
ningún banco tiene la clave en D**. Los bancos se escribieron poniendo la respuesta buena primero y
nunca se barajaron.

### Por qué no saltaba a la vista

`question-component` ya rotaba las opciones antes de pintarlas:

```clojure
shift (mod (:id question) 4)
rotated-options (concat (drop shift opts) (take shift opts))
```

Y funcionaba, en el sentido estrecho de que la posición visible quedaba repartida: sobre los 306
ítems reales, la correcta caía 79/78/74/75 veces en cada uno de los cuatro lugares. Un vistazo a la
pantalla no delata nada.

El problema es que **una rotación cíclica no es una permutación aleatoria**. Preserva el orden
relativo (A→B→C→D siempre), de modo que con la clave constante en A la posición mostrada es

```
posición de la correcta = 4 − (id mod 4)
```

una función pública del id, que viaja en el payload del RPC. Quien la descubra responde bien el
100 % del banco **sin leer un solo enunciado**. Y el orden relativo fijo significa además que
rendir dos veces el mismo test muestra exactamente la misma disposición.

### Por qué es un problema del negocio y no de la interfaz

θ no es un número decorativo: manda banda → cupo → plan, es lo que G-2 quiere calibrar y lo que G-1
quiere vender a un colegio. Un banco que puede responderse por posición produce estimaciones de θ
infladas y, peor, **datos de calibración envenenados** — justo el activo que la tesis de crecimiento
declara defendible.

## Decisión

Se reemplaza la rotación por una **permutación Fisher-Yates sembrada con el id del ítem**, en un
namespace puro nuevo, `universo.opciones`, siguiendo la convención de sacar la regla del componente
(CLAUDE.md §5).

Tres propiedades que la implementación garantiza y los tests fijan:

1. **Es una permutación de verdad.** Las 24 disposiciones posibles aparecen sobre el banco real, y
   la correcta cae 72/80/81/73 en las cuatro posiciones. El orden relativo de los distractores
   cambia: solo 50 de 306 ítems quedan en una disposición que además es cíclica, cerca del 51 que
   predice el azar.
2. **Es determinista.** La misma semilla da siempre el mismo orden, así que recargar la página no
   reordena las alternativas debajo del estudiante que estaba leyéndolas.
3. **No toca el `:value`.** Barajar cambia posiciones, nunca la letra que viaja con cada
   alternativa. El servidor sigue corrigiendo con la letra original (ADR-015) y las explicaciones
   `error_a..error_d` se siguen buscando por esa misma letra. Sin esta propiedad, barajar habría
   roto la corrección entera.

`semilla` acepta id numérico o string, para que la función sobreviva si `questions.id` alguna vez
pasa a `uuid`.

## Alternativas consideradas

**Permutar las alternativas en la base, de una vez.** Es la corrección de raíz y sigue siendo lo
correcto a futuro: arregla el dato para *todos* los consumidores, no solo para esta SPA. No se hizo
acá porque es un cambio sobre 242 filas que debe mover con cada alternativa su `error_*` y su
`misconception_*_id`, y eso es contenido del owner, no una decisión de implementación. Queda
anotado en [[../project-memory/RISKS]] R-35.

**Barajar en el servidor, dentro de `next_question`.** Cierra el agujero de inspección de verdad,
porque el cliente nunca vería el orden canónico. Es la opción técnicamente superior y quedó
descartada solo por alcance: obliga a que `score_answer` sepa qué permutación se le mostró a ese
estudiante en ese intento, o sea a persistir la permutación por respuesta. Si el banco alguna vez se
expone fuera de la SPA, esta es la que hay que implementar.

**Dejar la rotación y aceptarla.** Descartada: reparte la posición visible pero no rompe la fórmula,
que es justamente lo explotable.

## Consecuencias

### Positivas

- La posición de la correcta deja de ser deducible observando cuatro ítems.
- La regla sale del componente y queda cubierta por tests (`test/universo/opciones_test.cljs`),
  incluido uno que reproduce el estado real del banco —clave siempre en A— y verifica que ninguna
  posición se concentre.
- El barajado protege también a los bancos que se carguen **después**, aunque vengan ordenados.

### Negativas y límites

- **Esto no es una defensa criptográfica.** La semilla y el algoritmo viajan en el bundle; sube el
  costo de explotar el sesgo, no lo elimina. Decirlo importa: creer que el problema quedó resuelto
  es peor que saber que está mitigado.
- **El dato sigue sesgado.** Cualquier consumidor que no pase por `question-component` —una
  exportación, el panel docente de la licencia institucional, la calibración— ve el banco con la
  clave en A.
- Como el orden depende del id, dos ítems con ids contiguos no tienen ninguna relación en su
  disposición, pero un mismo ítem se ve siempre igual: no hay reordenamiento entre intentos. Es
  deliberado (propiedad 2), y es la razón por la que un estudiante que repite el test reconoce la
  disposición.

## Relacionado

- [[../project-memory/RISKS]] R-35 · [[../project-memory/BACKLOG]] T-105, T-106
- [[ADR-015-item-sin-respuesta-en-el-cliente]] — la razón por la que preservar `:value` es obligatorio
- `src/universo/opciones.cljs` · `src/universo/components/diagnostic_test.cljs`
