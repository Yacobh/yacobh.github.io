# T-175 · Person-fit en agregado — primera medición (2026-09-25)

> **Qué se preguntó (Q-46):** ¿los datos que ya tenemos muestran intentos cuyo patrón de respuestas
> no es creíble, en los cursos donde el owner sabe que hay estudiantes que resuelven con ChatGPT?
>
> **Respuesta corta:** **no con el person-fit.** En los tres cursos, la fracción de patrones
> improbables está **en o bajo** lo que produciría el puro azar entre estudiantes honestos. Eso
> **no dice que no haya trampa**: dice que la trampa que describe el owner **no deja esa huella**.
> La huella que sí aparece está en el **tiempo**.

## Cómo se midió

- **Código:** `src/universo/irt/person_fit.cljs` (puro, con tests) y
  `src/universo/irt/person_fit_cli.cljs`. **Corrida:** `scripts/medir_person_fit.sh <dir> 500`.
- **Datos:** `tests_sin_identidad` con `claude_ro`, `origin = 'student'`. Las cuentas de prueba
  marcadas `student` **entran** (T-145 sigue sin sus `user_id`).
- **Modelo:** el mismo que estimó θ (`tetha/probability`, con el `c` de cada intento). Se usa el
  θ **guardado** de cada intento.
- **Solo intentos con 6 o más respuestas evaluables** (con resultado y dificultad, sin escapes).
- **p-sim:** por cada intento, 500 estudiantes honestos simulados con el mismo θ y los mismos
  ítems; `p-sim` es la fracción que da un patrón tan improbable o más. **Si todos fueran honestos,
  ~5 % de los intentos caería bajo 0,05 por azar.** Semilla fija: la corrida es reproducible.

## Resultado

| Grupo | Intentos | p-sim < 0,05 | Esperado por azar | Guttman (mediana) | Seg/ítem (mediana) |
|---|---:|---:|---:|---:|---:|
| `diagnostico` (curso de matemática) | 83 | **1,2 %** | ~5 % | 0,33 | 18,2 |
| `electronica_*` (los dos cursos de electrónica) | 213 | **3,3 %** | ~5 % | **0,47** | 18,4 |
| — primer intento | 153 | 2,6 % | ~5 % | 0,47 | 22,2 |
| — intentos posteriores | 60 | 5,0 % | ~5 % | 0,50 | **6,8** |

`numeros` (18 intentos) y los bancos chicos no cambian la lectura.

## Lo que dicen los números

### 1. El person-fit no ve la trampa que describe el owner

Quien fotografía **todos** los ítems y los resuelve con ChatGPT produce el patrón de un estudiante
fuerte: acierta casi todo, fáciles y difíciles. Ese patrón **es coherente** con un θ alto, y el
person-fit mide coherencia. Los 15 intentos con el perfil «muchos aciertos, lento y parejo» (abajo)
tienen `p-sim` entre 0,38 y 1: **el modelo los encuentra perfectamente creíbles**.

El person-fit solo vería la trampa **parcial**: un estudiante que responde solo las fáciles y
consulta las difíciles. En los datos no hay más de eso de lo que produce el azar.

### 2. En electrónica, Guttman ≈ 0,5 mide el banco, no a los estudiantes

Una mediana de 0,47 a 0,50 quiere decir que, cuando un estudiante acierta un ítem y falla otro, el
acertado es el «más difícil» **la mitad de las veces**: la etiqueta de dificultad **no ordena**
los ítems. Es el mismo hallazgo de T-76 (15 de 16 movimientos de dificultad hacia arriba) medido
por otro camino, y es un argumento más para **T-172**. Mientras eso no se arregle, ninguna señal
que dependa del orden de dificultad sirve en electrónica.

### 3. La huella está en el tiempo, y hay dos perfiles

**Muy rápido y todo correcto.** 41 intentos de electrónica con **mediana bajo 5 s por ítem**; en
25 de ellos acertaron todo. 30 son del 2026-09-21. Dos datos los describen:

- **17 son primeros intentos**, así que no todo se explica por haber visto el ítem antes.
- De sus 281 respuestas, **146 son ítems que ese estudiante ya había visto** en un intento anterior,
  y **208 tienen peso 0** por el filtro de esfuerzo (ADR-014). Por eso su θ quedó en ~0: **el filtro
  ya los neutraliza**. T-174 (excluir los ya vistos) ataca la otra mitad.

**Lento, parejo y casi todo correcto.** 15 intentos (4 en `diagnostico`, 11 en electrónica),
**todos primeros intentos**, con mediana de 40 a 156 s por ítem, coeficiente de variación del tiempo
bajo 0,6 y 88 % a 100 % de aciertos. Es el perfil compatible con «foto → ChatGPT → copiar». **También
es el perfil de un estudiante cuidadoso.** Los datos no los distinguen: solo la hoja con los
cálculos, o volver a rendir en sala, los separa.

## Qué se concluye para Q-46

- **El person-fit entra como una variable más, no como detector.** Sirve para marcar intentos
  incoherentes (azar, ítems mal etiquetados, trampa parcial) y **no dice nada** de la trampa total.
- **Las variables que sí separan intentos hoy** son del tiempo y de la historia: fracción de
  respuestas con peso 0, mediana de segundos por ítem, variación del tiempo, ítems repetidos.
- **Para la trampa total no hay señal en los datos**: se previene con el diseño (no-nota, hoja en
  papel, ítems generativos que ChatGPT sí resuelve pero que no se pueden compartir entre
  compañeros) y no se detecta después.

## Limitaciones

- Tests de 6 a 20 ítems: poca potencia estadística por intento. Lo que vale es el agregado.
- θ y dificultades salen de un banco sin calibrar (R-17); en electrónica, además, con el orden
  roto (punto 2).
- Entran las cuentas de prueba marcadas `student` (T-145).
- Los cortes de «lento» (40 s) y «parejo» (CV < 0,6) se eligieron mirando la distribución; son
  descriptivos, no una regla.
