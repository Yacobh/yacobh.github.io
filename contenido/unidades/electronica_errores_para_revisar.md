# T-155 — Catálogo de errores del curso de electrónica · **BORRADOR PARA CORREGIR**

> ## ⛔ Nada de acá es un dato todavía
>
> Son **31 hipótesis escritas por el agente**, no errores observados. La regla **F4** del plan dice
> que cada distractor tiene que nombrar un error que el profesor **vio en el aula**, y eso es
> exactamente lo que este archivo **no** puede afirmar.
>
> **Cómo se usa:** en la columna `¿lo ves?` poné `SÍ`, `NO`, o corregí la fila. **Solo los `SÍ`
> entran a `misconceptions`.** Los que queden sin marcar **no entran** — no marcado no es lo mismo
> que aprobado, y ésa es la diferencia entre un catálogo y una lista de cosas plausibles.
>
> Lo que falte, agregalo abajo de todo en «Los que me faltaron». Esa sección es la más valiosa del
> archivo: es la única parte que no puede salir de ningún libro.

**Convenciones aplicadas** (decididas el 2026-09-19): decimal **con coma** (`2,2 kΩ`), resultados
**siempre con unidad y prefijo** del taller (mA, kΩ, µF — no unidades base), y en Kirchhoff **sentido
de malla horario** fijo en todos los ítems.

⚠️ **Vocabulario: supuesto, no decidido.** Uso **«tensión»** y **«corriente»**. No marcaste esa
opción, así que puede estar mal. Si usás «voltaje» e «intensidad», decilo y es un reemplazo
mecánico en todo el banco — pero hay que decidirlo **antes** de escribir los ítems, porque un
distractor que falla por vocabulario y no por física hace que el mapa de errores mienta.

`slug` cumple el check de `027`: minúsculas, dígitos, y `-` o `/` como separadores.

---

## 1 · `electronica/notacion_cientifica` — banda [−3,0 · −1,8]

| # | slug | Nombre | Cuándo SÍ / cuándo NO | ¿lo ves? |
|---|---|---|---|---|
| 1.1 | `prefijos/mili-y-micro-intercambiados` | Confunde mili con micro | **SÍ:** convierte 2,2 mA a 0,0000022 A, o 470 µF a 0,47 F. **NO:** para errores de signo del exponente (ésa es 1.2) | |
| 1.2 | `prefijos/exponente-con-signo-invertido` | Invierte el signo del exponente | **SÍ:** escribe 4,7 kΩ como 4,7 × 10⁻³ Ω, o 10 nF como 10 × 10⁹ F. **NO:** cuando el prefijo elegido es el equivocado pero el signo es correcto | |
| 1.3 | `prefijos/no-convierte-antes-de-operar` | Suma magnitudes con prefijos distintos | **SÍ:** suma 2,2 kΩ + 470 Ω y responde 472,2 o 2670 sin unidad coherente. **NO:** si convirtió bien y se equivocó en la suma | |
| 1.4 | `notacion/mantisa-fuera-de-rango` | Deja la mantisa fuera de [1, 10) | **SÍ:** escribe 0,47 × 10³ o 47 × 10² y lo da por notación científica. **NO:** para notación de ingeniería deliberada (múltiplos de 3), si la enseñás así | |
| 1.5 | `notacion/multiplica-exponentes-al-multiplicar` | Multiplica los exponentes | **SÍ:** (2 × 10³)(3 × 10²) = 6 × 10⁶. **NO:** cuando el error está en la mantisa | |
| 1.6 | `prefijos/orden-de-magnitud-sin-sentido-fisico` | No detecta un resultado imposible | **SÍ:** da por buena una corriente de 2000 A en un circuito de pila, o un capacitor de 3 F. **NO:** si el número es implausible pero el procedimiento fue correcto y el enunciado lo permitía | |

> 💡 **1.6 es la que más me interesa que confirmes o descartes.** Es la única del módulo que no
> diagnostica un procedimiento sino un **hábito**: mirar si el número puede existir. En un curso de
> taller eso debería notarse mucho, o no notarse nada.

---

## 2 · `electronica/ley_de_ohm` — banda [−2,8 · −1,6]

| # | slug | Nombre | Cuándo SÍ / cuándo NO | ¿lo ves? |
|---|---|---|---|---|
| 2.1 | `ohm/despeje-invertido` | Despeja al revés | **SÍ:** para hallar I hace R/V en vez de V/R. **NO:** para el error de no convertir prefijos antes de dividir (ésa es 1.3) | |
| 2.2 | `ohm/usa-la-formula-sin-despejar` | Reemplaza en la forma que recuerda | **SÍ:** le piden R, conoce V e I, y escribe V = I·R dejando R sin despejar, o responde el producto V·I. **NO:** si despejó bien y erró la cuenta | |
| 2.3 | `ohm/confunde-tension-con-corriente` | Cambia V por I en el enunciado | **SÍ:** toma «12 V» como corriente o «2 A» como tensión, típicamente cuando el enunciado no los da en ese orden. **NO:** para errores de unidad (ésa es 2.4) | |
| 2.4 | `ohm/pierde-la-unidad-en-el-resultado` | Da el número sin unidad, o con la equivocada | **SÍ:** responde «6» o «6 V» cuando se pedía una resistencia. **NO:** cuando la unidad es correcta y el prefijo no (ésa es 1.1) | |
| 2.5 | `ohm/proporcionalidad-invertida` | Cree que más resistencia da más corriente | **SÍ:** ante «si R aumenta al doble, I…» responde que aumenta. **NO:** cuando el cálculo numérico está bien y solo falla la pregunta cualitativa… salvo que sea justo eso lo que querés separar | |
| 2.6 | `ohm/aplica-la-ley-a-la-fuente` | Le aplica V = I·R a la fuente | **SÍ:** trata los 12 V de la pila como una caída en un resistor y los suma con las demás. **NO:** en ítems de Kirchhoff, donde el signo de la fuente es otra idea (ésa es 5.3) | |

---

## 3 · `electronica/potencia` — banda [−2,4 · −1,2]

| # | slug | Nombre | Cuándo SÍ / cuándo NO | ¿lo ves? |
|---|---|---|---|---|
| 3.1 | `potencia/olvida-el-cuadrado` | Usa I·R o V·R en vez del cuadrado | **SÍ:** calcula P = I·R o P = V²/R sin elevar donde corresponde. **NO:** cuando eligió la fórmula correcta y erró la aritmética | |
| 3.2 | `potencia/eleva-la-magnitud-equivocada` | Eleva al cuadrado la que no es | **SÍ:** escribe P = V²·R, o P = I²/R. **NO:** cuando no elevó nada (ésa es 3.1) | |
| 3.3 | `potencia/confunde-potencia-con-energia` | Responde en Wh cuando se pide W, o al revés | **SÍ:** «¿qué potencia disipa?» y responde una energía, o usa el tiempo cuando no hace falta. **NO:** para errores de prefijo entre W y kW | |
| 3.4 | `potencia/proporcionalidad-lineal-con-la-corriente` | Cree que al doble de corriente, doble de potencia | **SÍ:** ante «si I se duplica, P…» responde «se duplica» en vez de «se cuadruplica». **NO:** si el cálculo numérico estaba bien | |
| 3.5 | `potencia/elige-la-formula-por-los-datos-que-sobran` | Usa una fórmula que necesita un dato que no tiene | **SÍ:** tiene V y R, y busca I para usar P = V·I en vez de ir directo a P = V²/R. **NO:** si llegó bien por el camino largo — eso no es error, es camino largo | |
| 3.6 | `potencia/ignora-la-potencia-nominal-del-resistor` | No compara con lo que el componente aguanta | **SÍ:** calcula 0,8 W en un resistor de ¼ W y no dice nada. **NO:** si el ítem no daba la potencia nominal | |

> 💡 **3.5 y 3.6 son las dos que menos confianza me dan.** 3.5 puede ser más «ineficiencia» que
> «error» —y un ítem que penaliza el camino largo es un ítem injusto—; 3.6 depende de si ya viste
> potencia nominal en clase. Las dos son candidatas a borrar sin culpa.

---

## 4 · `electronica/capacitores` — banda [−2,2 · −1,0]

| # | slug | Nombre | Cuándo SÍ / cuándo NO | ¿lo ves? |
|---|---|---|---|---|
| 4.1 | `capacitores/serie-y-paralelo-como-resistores` | Asocia capacitores con la regla de los resistores | **SÍ:** suma capacitores en serie, o usa la inversa para el paralelo. **NO:** para errores de prefijo al sumar µF con nF (ésa es 1.3) | |
| 4.2 | `capacitancia/confunde-carga-con-capacitancia` | Cree que C es «cuánta carga tiene» | **SÍ:** dice que un capacitor descargado tiene C = 0, o que al subir Q sube C con V fijo. **NO:** cuando despeja mal C = Q/V pero entiende la definición (ésa es 4.3) | |
| 4.3 | `capacitancia/despeja-mal-c-igual-q-sobre-v` | Despeja al revés en C = Q/V | **SÍ:** para hallar Q hace C/V en vez de C·V. **NO:** para la confusión conceptual de 4.2 | |
| 4.4 | `capacitancia/confunde-carga-con-corriente` | Usa Q e I como si fueran lo mismo | **SÍ:** responde una corriente cuando se pide carga, o suma coulombs con amperes. **NO:** cuando la unidad es correcta y el prefijo no | |
| 4.5 | `capacitores/mas-capacitancia-en-serie` | Cree que asociar en serie aumenta C | **SÍ:** ante «dos capacitores iguales en serie», responde 2C en vez de C/2. **NO:** si calculó bien y erró la aritmética de fracciones | |
| 4.6 | `capacitores/ignora-la-tension-de-trabajo` | No mira los volts que aguanta el capacitor | **SÍ:** elige un capacitor de 16 V para un circuito de 24 V sin observarlo. **NO:** si el ítem no daba la tensión de trabajo | |
| 4.7 | `capacitancia/cree-que-c-depende-de-la-tension-aplicada` | Cree que C cambia al cambiar V | **SÍ:** dice que al duplicar la tensión, la capacitancia se duplica. **NO:** para la confusión con la carga (ésa es 4.2) | |

> 💡 **4.1 es la que el plan puso como centro del módulo, y `C = Q/V` va antes justamente para
> desarmarla.** Si en tu curso el error dominante es otro, el orden del módulo cambia.

---

## 5 · `electronica/leyes_de_kirchhoff` — banda [−1,8 · −0,6]

| # | slug | Nombre | Cuándo SÍ / cuándo NO | ¿lo ves? |
|---|---|---|---|---|
| 5.1 | `kirchhoff/signo-al-recorrer-la-malla` | Pierde el signo al recorrer | **SÍ:** suma todas las caídas con el mismo signo sin importar el sentido del recorrido. **NO:** para el signo de la fuente (ésa es 5.3) | |
| 5.2 | `kirchhoff/corriente-se-reparte-en-serie` | Cree que la corriente se divide en serie | **SÍ:** dice que por dos resistores en serie circulan corrientes distintas. **NO:** para el caso dual (ésa es 5.4) | |
| 5.3 | `kirchhoff/fuente-siempre-positiva` | Le da signo positivo a la fuente siempre | **SÍ:** no cambia el signo de la fuente según por dónde se entra a ella. **NO:** cuando el error está en las caídas (ésa es 5.1) | |
| 5.4 | `kirchhoff/tension-se-reparte-en-paralelo` | Cree que la tensión se divide en paralelo | **SÍ:** reparte los 12 V entre dos ramas paralelas. **NO:** para el dual en serie (ésa es 5.2) | |
| 5.5 | `kirchhoff/nodo-sin-conservacion` | La suma del nodo no cierra | **SÍ:** entran 3 A, sale una rama con 1 A, y responde algo distinto de 2 A. **NO:** si el error fue de signo al plantear (ésa es 5.1) | |
| 5.6 | `kirchhoff/confunde-nodo-con-malla` | Aplica la ley equivocada | **SÍ:** suma tensiones en un nodo o corrientes en una malla. **NO:** cuando eligió bien la ley y erró el signo | |

---

## Los que me faltaron

> **Esta sección es la que importa.** Todo lo de arriba lo puede escribir cualquiera que sepa
> electrónica; esto no. Agregá acá los errores que ves y que no están, aunque sean raros, aunque no
> sepas cómo nombrarlos, aunque sean «no entiende el enunciado» — eso también es diagnóstico
> (ADR-029 lo trata como categoría propia).

| slug propuesto | Nombre | Cuándo SÍ / cuándo NO | Módulo |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

---

## Dos preguntas que el borrador no puede responder

1. **¿Hay algún error que sea de *aritmética* y no de electrónica?** Si los chicos fallan en dividir
   12 entre 0,002 más que en entender la ley de Ohm, el módulo que falta no es de electrónica: es
   aritmética, y el producto ya lo tiene (`aritmetica/operaciones_fundamentales`, con banda
   [−2,7 · −1,3] y ocho ítems desde `068`). Conviene saberlo antes de escribir 60 ítems que midan
   otra cosa.

2. **¿Qué tan seguido el error es no saber leer el circuito?** Si no distinguen serie de paralelo
   *mirando el dibujo*, eso no es Kirchhoff ni Ohm: es un módulo que este plan no tiene, y sería el
   sexto. Hoy no está porque no aparece en tu lista de temas, pero es el hueco más plausible entre
   `ley_de_ohm` y `leyes_de_kirchhoff`.

---

## Qué pasa cuando lo devuelvas

1. Los `SÍ` se convierten en filas de `misconceptions` con su `module_id`, dentro de las
   migraciones `072`…`076` (las genera `scripts/generar_migracion_items.py` junto con los ítems).
2. Cada ítem se escribe **desde** un error del catálogo: se elige el error y después se busca el
   enunciado que lo hace aparecer, no al revés. Es lo que hace que las cuatro `error_*` digan algo.
3. Un módulo con menos de ~4 errores confirmados probablemente no necesita 12 ítems propios, y
   conviene decirlo antes de escribirlos.

**Relacionado:** [[../../project-memory/PLAN_TRACK_ELECTRONICA]] §2 (las reglas F1–F4) ·
[[../../project-memory/BACKLOG]] T-155, T-158 · `supabase/migrations/027_misconceptions.sql` (el
contrato de `slug`, `name` y `description`) · `.claude/skills/banco-de-items/`
