-- Recursos de capa 1 para los 12 módulos del track `electrotecnia` (24 recursos).
--
-- ⚠ APLICAR DESPUÉS DE 062 (los módulos tienen que existir). No es precondición
-- de 063, 064 ni 065: los recursos son la capa 1 de «Mi plan» y no intervienen
-- en el diagnóstico.
--
-- ── Qué es esto ────────────────────────────────────────────────────────────
-- Dos recursos por módulo, con el mismo par que usó 039:
--   · una **guía** (`type = 'text'`) — la teoría mínima del módulo, escrita
--     para leerse después de fallar un ítem, no antes de estudiar el tema;
--   · una **práctica guiada** (`type = 'exercise'`) — dos o tres problemas con
--     el desarrollo escrito, no solo el resultado.
--
-- ── Derechos de autor: mismo criterio que 018, 019 y 039 ───────────────────
-- Todo el texto está **redactado desde cero**. Las referencias bibliográficas
-- funcionan como un «ver Boylestad, capítulo de circuitos de CA» dicho en clase:
-- apuntan a dónde ampliar, no reproducen contenido. Las citas van a nivel de
-- **capítulo o tema**, nunca de página ni de número de ecuación, porque la
-- paginación cambia entre ediciones y una referencia falsamente precisa es peor
-- que una general.
--
-- Los textos que se citan son los estándar del área, no una lista de archivos
-- que estén en este repositorio:
--   · Boylestad, *Introducción al análisis de circuitos*
--   · Irwin & Nelms, *Análisis básico de circuitos en ingeniería*
--   · Hayt, Kemmerly & Durbin, *Análisis de circuitos en ingeniería*
--   · Edminister (Schaum), *Circuitos eléctricos*
--   · Fitzgerald, Kingsley & Umans, *Máquinas eléctricas* (para trifásico)
--
-- ── `published = false` en los 24 ─────────────────────────────────────────
-- ADR-016 §1-2: contenido asistido por IA nace despublicado y se publica a mano
-- después de auditarlo **rehaciendo cada cuenta**, no solo leyéndolo. Vale acá
-- con más fuerza que en 039, porque el destinatario **no** es el autor: es un
-- alumno que no tiene cómo detectar un error de signo. Un recurso con un error
-- enseña el error.
--
-- Idempotente: `where not exists` por (módulo, título).

with recursos (module_slug, type, title, body, historical_context, order_index) as (
  values

  -- ===================== electrotecnia/magnitudes ===========================
  ($et$electrotecnia/magnitudes$et$::text, $et$text$et$::text,
   $et$Guía — Las cuatro magnitudes y las tres formas de la potencia (ver Boylestad, caps. 2-4)$et$::text,
   $et$**Las cuatro magnitudes.**

| Magnitud | Símbolo | Unidad | Qué es |
|---|---|---|---|
| Carga | $Q$ | coulomb (C) | lo que se mueve |
| Corriente | $I$ | ampere (A) | carga por segundo, $I = Q/t$ |
| Tensión | $V$ | volt (V) | energía por unidad de carga, $V = W/Q$ |
| Resistencia | $R$ | ohm ($\Omega$) | oposición al paso de la corriente |

La distinción que más se equivoca: **la tensión se aplica, la corriente resulta**. Una fuente impone $V$; cuánta corriente circula lo decide el circuito.

**Ley de Ohm.** $V = IR$, y sus dos despejes: $I = V/R$ y $R = V/I$. Control que sirve siempre: si sube $R$ con $V$ fija, $I$ tiene que **bajar**. Si tu despeje dice lo contrario, está invertido.

**Potencia, en tres formas equivalentes.**

$$P = VI = I^{2}R = \frac{V^{2}}{R}$$

Las tres dan lo mismo, pero **no todas usan las variables que tienes**. La regla práctica: usa la forma cuyas dos variables sean del **mismo elemento**. Si conoces la corriente por un resistor, $I^{2}R$; si conoces la tensión sobre ese resistor, $V^{2}/R$. Usar la tensión de la fuente con la resistencia de un elemento que no la recibe entera es el error más frecuente del módulo.

**Potencia no es energía.** El watt mide el ritmo; el joule y el kilowatt-hora miden lo acumulado. La boleta cobra kWh.

**Prefijos.** $k = 10^{3}$, $m = 10^{-3}$, $\mu = 10^{-6}$, $n = 10^{-9}$. Conviértelos **antes** de operar, no después: si la fórmula eleva al cuadrado, un prefijo mal convertido se amplifica.$et$::text,
   $et$La ley de Ohm se publicó en 1827 y fue rechazada durante más de una década en Alemania: la filosofía natural dominante desconfiaba de reducir un fenómeno a una proporción medida. Ohm renunció a su cátedra en Colonia por el rechazo y recién en 1841, con la medalla Copley de la Royal Society, la comunidad continental empezó a aceptarla.$et$::text,
   10::int),

  ($et$electrotecnia/magnitudes$et$, $et$exercise$et$,
   $et$Práctica guiada — Ohm, potencia y prefijos$et$,
   $et$**Problema 1.** Un resistor de $4{,}7\,\text{k}\Omega$ se conecta a $9$ V. ¿Qué corriente circula y qué potencia disipa?

*Desarrollo.* Primero a unidades base: $4{,}7\,\text{k}\Omega = 4700\,\Omega$.
$$I = \frac{V}{R} = \frac{9}{4700} \approx 1{,}91\times10^{-3}\ \text{A} = 1{,}91\ \text{mA}$$
$$P = VI = 9 \times 1{,}91\times10^{-3} \approx 17{,}2\ \text{mW}$$
*Control.* Con $P = I^{2}R = (1{,}91\times10^{-3})^{2} \times 4700 \approx 17{,}1$ mW. Coincide salvo redondeo, que es lo que se busca al verificar por otro camino.

**Problema 2.** Una plancha de $1200$ W funciona en $220$ V. ¿Qué corriente toma y qué resistencia tiene?

*Desarrollo.*
$$I = \frac{P}{V} = \frac{1200}{220} \approx 5{,}45\ \text{A} \qquad R = \frac{V^{2}}{P} = \frac{48400}{1200} \approx 40{,}3\ \Omega$$
*Control.* $V/I = 220/5{,}45 \approx 40{,}4\,\Omega$. Igual.

**Problema 3.** Esa misma plancha funciona $45$ minutos por día. ¿Cuánta energía consume en un mes de $30$ días?

*Desarrollo.* $45$ min $= 0{,}75$ h.
$$E = P\,t = 1{,}2\ \text{kW} \times 0{,}75\ \text{h} \times 30 = 27\ \text{kWh}$$
*Trampa habitual.* Responder «$1{,}2$ kW» a una pregunta de energía. La potencia es la misma los treinta días; lo que se acumula es la energía.

**Para practicar solo.** (a) $12$ V sobre $220\,\Omega$: corriente y potencia. (b) Un LED que consume $20$ mA con $2$ V: potencia. (c) Un calefactor de $2000$ W encendido $3$ h diarias durante $30$ días: kWh.$et$,
   $et$El kilowatt-hora se impuso como unidad de facturación a fines del siglo XIX, cuando el problema comercial de las primeras compañías eléctricas era justamente medir lo que vendían: Edison patentó en 1881 un medidor electroquímico que pesaba el zinc depositado en una celda, y un empleado pasaba a pesarlo cada mes.$et$,
   20),

  -- ================= electrotecnia/dc_series_paralelo ========================
  ($et$electrotecnia/dc_series_paralelo$et$, $et$text$et$,
   $et$Guía — Serie, paralelo y los dos divisores (ver Irwin & Nelms, cap. 2)$et$,
   $et$**Serie: un solo camino.**
- La **corriente** es la misma en todos los elementos.
- Las **tensiones** se reparten y suman la de la fuente.
- $R_{eq} = R_1 + R_2 + \dots$, y siempre queda **mayor** que el mayor.

**Paralelo: varios caminos entre los mismos dos nodos.**
- La **tensión** es la misma en todas las ramas.
- Las **corrientes** se reparten y suman la total.
- $\dfrac{1}{R_{eq}} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots$, y siempre queda **menor** que el menor.

Los dos controles de la derecha valen la pena: si tu resultado de un paralelo es mayor que el menor de los resistores, está mal, sin necesidad de revisar la cuenta.

**Dos atajos legítimos.**
- Dos en paralelo: $R_{eq} = \dfrac{R_1R_2}{R_1+R_2}$.
- $n$ **iguales** en paralelo: $R_{eq} = R/n$. Solo si son iguales.

**El error que más cuesta.** Calcular $1/R_1 + 1/R_2$ y entregar ese número. Eso es la **conductancia** equivalente, en siemens. Falta invertirla.

**Divisor de tensión** (serie): $\;V_1 = V\dfrac{R_1}{R_1+R_2}$. La mayor caída va sobre la mayor resistencia.

**Divisor de corriente** (dos ramas en paralelo): $\;I_1 = I\dfrac{R_2}{R_1+R_2}$. Ojo: acá va la resistencia **de la otra rama** en el numerador. La mayor corriente va por la menor resistencia, que es lo contrario del divisor de tensión, y por eso se confunden.

**Método para un circuito mixto.** Reducir de adentro hacia afuera hasta un solo resistor, calcular la corriente total, y volver hacia adentro repartiendo con los divisores.$et$,
   $et$El puente de Wheatstone, que compara dos divisores de tensión para medir una resistencia desconocida, lo inventó Samuel Hunter Christie en 1833. Wheatstone lo publicó en 1843 atribuyéndoselo explícitamente a Christie, y aun así el nombre quedó asociado a quien lo divulgó. Sigue siendo el principio de casi todo sensor resistivo: la galga extensométrica de una balanza es un puente.$et$,
   10),

  ($et$electrotecnia/dc_series_paralelo$et$, $et$exercise$et$,
   $et$Práctica guiada — Reducir un circuito mixto$et$,
   $et$**Problema 1.** $R_1 = 6\,\Omega$ en serie con el paralelo de $R_2 = 12\,\Omega$ y $R_3 = 4\,\Omega$. La fuente es de $24$ V. Calcular $R_{eq}$, la corriente total y la corriente por $R_2$.

*Desarrollo.*
$$R_{23} = \frac{12 \times 4}{12+4} = \frac{48}{16} = 3\,\Omega \qquad R_{eq} = 6 + 3 = 9\,\Omega$$
$$I_{total} = \frac{24}{9} \approx 2{,}67\ \text{A}$$
La tensión sobre el bloque paralelo es $V_{23} = I_{total} \times 3 = 8$ V, y como en paralelo todos ven la misma tensión:
$$I_2 = \frac{8}{12} \approx 0{,}67\ \text{A} \qquad I_3 = \frac{8}{4} = 2\ \text{A}$$
*Control.* $0{,}67 + 2 = 2{,}67$ A, la corriente total. Cierra.

**Problema 2.** Con el divisor de corriente, verificar $I_2$ sin pasar por la tensión.
$$I_2 = I_{total}\frac{R_3}{R_2+R_3} = 2{,}67 \times \frac{4}{16} \approx 0{,}67\ \text{A}$$
*Fíjate.* En el numerador va $R_3$, la **otra** rama. Si pones $R_2$ obtienes $2$ A, que es la corriente de la rama equivocada — y el resultado parece plausible, que es lo peligroso.

**Problema 3.** Tres resistores de $100\,\Omega$: ¿qué valores de $R_{eq}$ se pueden armar?

*Desarrollo.* Los tres en serie: $300\,\Omega$. Los tres en paralelo: $100/3 \approx 33{,}3\,\Omega$. Dos en serie y eso en paralelo con el tercero: $\frac{200 \times 100}{300} \approx 66{,}7\,\Omega$. Dos en paralelo y eso en serie con el tercero: $50 + 100 = 150\,\Omega$.

**Para practicar solo.** (a) $R_{eq}$ de $10\,\Omega$ en paralelo con la serie de $6\,\Omega$ y $4\,\Omega$. (b) Un divisor que baje $12$ V a $5$ V con $R_1 = 700\,\Omega$: ¿cuánto vale $R_2$?$et$,
   $et$La regla de que los resistores en paralelo conducen mejor que cualquiera por separado es la misma que explica por qué las líneas de transmisión se construyen con haces de varios conductores por fase en vez de uno solo grueso: además de repartir la corriente, reducen el efecto corona.$et$,
   20),

  -- ====================== electrotecnia/kirchhoff ============================
  ($et$electrotecnia/kirchhoff$et$, $et$text$et$,
   $et$Guía — Las dos leyes y cómo no equivocarse con los signos (ver Hayt, cap. 4)$et$,
   $et$**Primera ley (nodos).** La suma algebraica de las corrientes que concurren a un nodo es cero: lo que entra iguala a lo que sale. Es conservación de la carga; el nodo no almacena nada.

$$\sum I_{entra} = \sum I_{sale}$$

**Segunda ley (mallas).** La suma algebraica de las tensiones a lo largo de un lazo cerrado es cero. Es conservación de la energía: dar la vuelta completa devuelve al mismo potencial.

$$\sum \varepsilon = \sum IR$$

**El único procedimiento que evita los errores de signo.**
1. Elegir y **dibujar** un sentido supuesto para cada corriente de rama. No importa si aciertas.
2. Elegir un sentido de recorrido para cada malla y mantenerlo.
3. Al atravesar un resistor **a favor** de la corriente supuesta, la tensión **cae**: entra con signo menos. En contra, con más.
4. Al atravesar una fuente de $-$ a $+$, entra con más; de $+$ a $-$, con menos.
5. Resolver. Si una corriente sale **negativa**, el módulo es correcto y el sentido real es el opuesto al supuesto. No es un error: es la respuesta.

**Cuántas ecuaciones.** Con $n$ nodos y $r$ ramas: $n-1$ ecuaciones de nodos independientes y $r-n+1$ de mallas. Suman $r$, que es la cantidad de corrientes incógnita. La ecuación del último nodo es combinación lineal de las otras y no aporta nada.

**Dos confusiones a nombrar.**
- La corriente **no se gasta** al atravesar un elemento: entra y sale la misma. Lo que se consume es energía, y se ve como caída de tensión.
- Las tensiones se suman en la **malla**, no en el nodo; las corrientes, en el **nodo**, no en la malla.$et$,
   $et$Kirchhoff enunció las dos leyes en 1845, con 21 años y todavía sin graduarse en Königsberg, en un trabajo escrito para un seminario. Años después, con Bunsen, fundó el análisis espectral y formuló la ley del cuerpo negro, que en 1900 obligó a Planck a introducir el cuanto: el mismo autor está en la base de la electrotecnia y en el origen de la mecánica cuántica.$et$,
   10),

  ($et$electrotecnia/kirchhoff$et$, $et$exercise$et$,
   $et$Práctica guiada — Dos mallas con dos fuentes$et$,
   $et$**Problema.** Dos fuentes, $E_1 = 12$ V y $E_2 = 6$ V, comparten una rama central con $R_3 = 4\,\Omega$. La rama de $E_1$ tiene $R_1 = 2\,\Omega$ y la de $E_2$ tiene $R_2 = 3\,\Omega$. Las dos fuentes empujan corriente **hacia** el nodo superior.

*Paso 1 — sentidos supuestos.* $I_1$ e $I_2$ entrando al nodo superior, $I_3$ saliendo por la rama central.

*Paso 2 — ley de nodos.*
$$I_1 + I_2 = I_3$$

*Paso 3 — dos mallas.*

Malla izquierda (fuente 1 y rama central):
$$12 = 2I_1 + 4I_3$$

Malla derecha (fuente 2 y rama central):
$$6 = 3I_2 + 4I_3$$

*Paso 4 — resolver.* Sustituyendo $I_3 = I_1 + I_2$:
$$12 = 6I_1 + 4I_2 \qquad 6 = 4I_1 + 7I_2$$
De la primera, $I_1 = (12-4I_2)/6 = 2 - 0{,}667I_2$. Reemplazando en la segunda:
$$6 = 8 - 2{,}67I_2 + 7I_2 \Rightarrow -2 = 4{,}33I_2 \Rightarrow I_2 \approx -0{,}46\ \text{A}$$
$$I_1 \approx 2 + 0{,}31 = 2{,}31\ \text{A} \qquad I_3 \approx 1{,}85\ \text{A}$$

*Cómo se lee el signo.* $I_2$ salió **negativa**: la fuente de $6$ V no está entregando corriente al nodo, la está recibiendo. La fuente mayor la está cargando. Ese resultado es información física real, y se pierde si uno «corrige» el signo a mano.

*Control.* $I_1 + I_2 = 2{,}31 - 0{,}46 = 1{,}85 = I_3$. La ley de nodos se cumple.

**Para practicar solo.** Rehacer el problema suponiendo $I_2$ **saliendo** del nodo, y comprobar que el resultado físico es el mismo con el signo intercambiado.$et$,
   $et$El método de mallas tal como se enseña hoy —con corrientes de malla en vez de corrientes de rama— lo sistematizó James Clerk Maxwell en su Treatise on Electricity and Magnetism (1873), y por eso a veces se lo llama método de las corrientes de Maxwell.$et$,
   20),

  -- ======================= electrotecnia/teoremas ============================
  ($et$electrotecnia/teoremas$et$, $et$text$et$,
   $et$Guía — Thévenin, Norton, superposición y máxima transferencia (ver Irwin & Nelms, cap. 5)$et$,
   $et$**Thévenin.** Todo circuito lineal visto desde dos terminales equivale a una fuente $V_{Th}$ en serie con una resistencia $R_{Th}$.

Procedimiento:
1. **Desconectar la carga.**
2. $V_{Th}$ = tensión entre los terminales **en circuito abierto**.
3. $R_{Th}$ = resistencia vista desde los terminales con **todas las fuentes independientes anuladas**.

**Anular una fuente es llevarla a cero:**
- fuente de **tensión** a $0$ V $\rightarrow$ **cortocircuito** (un cable);
- fuente de **corriente** a $0$ A $\rightarrow$ **circuito abierto**.

Es contraintuitivo y se invierte todo el tiempo. Las fuentes **dependientes** no se anulan.

**Norton.** El dual: $I_N$ en paralelo con $R_N$. Se pasa de uno al otro con
$$I_N = \frac{V_{Th}}{R_{Th}}, \qquad R_N = R_{Th}$$

**Superposición.** En un circuito lineal, la respuesta a varias fuentes es la suma de las respuestas a cada una por separado (anulando las demás). **Vale para tensiones y corrientes; no vale para potencias**, porque la potencia depende del cuadrado. Si necesitas potencia: superpón las corrientes primero, y calcula la potencia al final, con la corriente total.

**Máxima transferencia de potencia.** Se entrega el máximo a la carga cuando $R_L = R_{Th}$, y ahí vale
$$P_{max} = \frac{V_{Th}^{2}}{4R_{Th}}$$
Los dos extremos dan potencia **nula**: en cortocircuito la tensión es cero, en circuito abierto la corriente es cero. Y ojo: en el punto de máxima potencia el rendimiento es del $50\,\%$, así que en distribución de energía no se busca este punto, sino $R_L \gg R_{Th}$.

**Una advertencia sobre $V_{Th}$.** Es la tensión **sin carga**. Al conectar la carga circula corriente y parte cae sobre $R_{Th}$: la tensión sobre la carga es siempre menor.$et$,
   $et$Thévenin publicó su teorema en 1883 como ingeniero de telégrafos, sin saber que Helmholtz lo había demostrado en 1853. El dual corrió peor suerte todavía: en 1926 lo escribieron de forma independiente Edward Norton, en un informe interno de Bell Labs que nunca se publicó como artículo, y Hans Ferdinand Mayer en Alemania. En Europa se lo conoce como teorema de Mayer-Norton.$et$,
   10),

  ($et$electrotecnia/teoremas$et$, $et$exercise$et$,
   $et$Práctica guiada — Un Thévenin completo$et$,
   $et$**Problema.** Una fuente de $24$ V alimenta $R_1 = 6\,\Omega$ en serie con el nodo A; desde A, $R_2 = 12\,\Omega$ va a masa. La carga $R_L$ se conecta entre A y masa. Hallar el equivalente de Thévenin y la potencia máxima que puede entregar.

*Paso 1 — $V_{Th}$, con la carga desconectada.* Sin carga, $R_1$ y $R_2$ forman un divisor:
$$V_{Th} = 24 \times \frac{12}{6+12} = 16\ \text{V}$$

*Paso 2 — $R_{Th}$, con la fuente anulada.* La fuente de tensión pasa a ser un cortocircuito, así que $R_1$ queda **en paralelo** con $R_2$ vistos desde A:
$$R_{Th} = \frac{6 \times 12}{18} = 4\,\Omega$$
*Nota.* Con la fuente presente, $R_1$ y $R_2$ están en serie; anulada, quedan en paralelo. Es exactamente por eso que hay que anularla antes de mirar la topología.

*Paso 3 — comprobar con una carga.* Con $R_L = 12\,\Omega$:
$$I = \frac{16}{4+12} = 1\ \text{A}, \qquad V_L = 12\ \text{V}$$
Y resolviendo el circuito original con esa carga: $R_2 \parallel R_L = 6\,\Omega$, divisor con $R_1 = 6\,\Omega$, da $V_A = 12$ V. Coincide, que es la comprobación que vale la pena hacer al menos una vez.

*Paso 4 — máxima transferencia.* Con $R_L = R_{Th} = 4\,\Omega$:
$$P_{max} = \frac{V_{Th}^{2}}{4R_{Th}} = \frac{256}{16} = 16\ \text{W}$$
Y el rendimiento ahí es del $50\,\%$: otros $16$ W se disipan dentro de $R_{Th}$.

**Para practicar solo.** (a) El equivalente de Norton de este mismo circuito. (b) La potencia entregada con $R_L = 1\,\Omega$ y con $R_L = 16\,\Omega$, para ver que las dos son menores que $16$ W.$et$,
   $et$El teorema de máxima transferencia se usa a diario en radiofrecuencia —adaptar una antena a $50\,\Omega$ es exactamente esto— y jamás en distribución eléctrica, donde operar con rendimiento del 50 % significaría quemar en la red la mitad de toda la energía generada.$et$,
   20),

  -- ===================== electrotecnia/capacitancia ==========================
  ($et$electrotecnia/capacitancia$et$, $et$text$et$,
   $et$Guía — Capacitancia, asociación y el transitorio RC (ver Boylestad, cap. 10)$et$,
   $et$**Definición.** $C = Q/V$: cuánta carga admite el capacitor por cada volt. Se mide en farad, que es una unidad enorme — los valores usuales van del picofarad al milifarad.

$$Q = CV, \qquad E = \tfrac{1}{2}CV^{2}$$

**Asociación: al revés que los resistores.**
- **Paralelo:** $C_{eq} = C_1 + C_2 + \dots$ (equivale a agrandar el área de placas).
- **Serie:** $\dfrac{1}{C_{eq}} = \dfrac{1}{C_1} + \dfrac{1}{C_2} + \dots$ (equivale a alejar las placas).

Si te confundes, ancla en la física en vez de en la fórmula: dos capacitores lado a lado guardan más carga; uno detrás de otro, menos.

**En continua permanente, el capacitor es un circuito abierto.** La corriente es
$$i = C\frac{dv}{dt}$$
Si la tensión ya no cambia, la corriente es cero. Para analizar continua estabilizada, los capacitores se borran del circuito.

**Transitorio RC.** Con constante de tiempo $\tau = RC$ (en segundos si $R$ está en ohm y $C$ en farad):

$$v_C(t) = V_f\left(1 - e^{-t/\tau}\right) \quad \text{(carga)}, \qquad v_C(t) = V_0\,e^{-t/\tau} \quad \text{(descarga)}$$

| $t$ | cargado |
|---|---|
| $\tau$ | $63{,}2\,\%$ |
| $2\tau$ | $86{,}5\,\%$ |
| $3\tau$ | $95{,}0\,\%$ |
| $5\tau$ | $99{,}3\,\%$ |

Ese $63\,\%$ **define** a $\tau$; no es carga completa. La curva es asintótica: en la práctica se considera terminada a las $5\tau$. La semicarga se alcanza en $0{,}69\tau$, no en $\tau$.$et$,
   $et$El primer capacitor fue la botella de Leiden, y su descubrimiento en 1746 fue accidental y doloroso: Musschenbroek escribió que no repetiría la descarga «ni por todo el reino de Francia». Poco después, el abad Nollet la usó para hacer saltar simultáneamente a doscientos monjes cartujos tomados de la mano frente a la corte de Luis XV, en la primera demostración pública de que la electricidad se propaga casi instantáneamente.$et$,
   10),

  ($et$electrotecnia/capacitancia$et$, $et$exercise$et$,
   $et$Práctica guiada — Asociación y carga de un RC$et$,
   $et$**Problema 1.** $C_1 = 4\,\mu\text{F}$ y $C_2 = 12\,\mu\text{F}$. Calcular el equivalente en serie y en paralelo.

*Desarrollo.*
$$C_{paralelo} = 4 + 12 = 16\,\mu\text{F}$$
$$C_{serie} = \frac{4 \times 12}{16} = 3\,\mu\text{F}$$
*Control.* El de serie queda por debajo del menor ($4\,\mu\text{F}$) y el de paralelo por encima del mayor. Si te da al revés, aplicaste las reglas de los resistores.

**Problema 2.** Un capacitor de $470\,\mu\text{F}$ se carga a $25$ V. ¿Cuánta carga y cuánta energía almacena?

*Desarrollo.*
$$Q = CV = 470\times10^{-6} \times 25 = 11{,}75\times10^{-3}\ \text{C} = 11{,}75\ \text{mC}$$
$$E = \tfrac12 CV^{2} = 0{,}5 \times 470\times10^{-6} \times 625 \approx 0{,}147\ \text{J}$$

**Problema 3.** Ese capacitor se carga desde $0$ V hacia $25$ V a través de $R = 2{,}2\,\text{k}\Omega$. ¿Cuánto tarda en llegar a $20$ V?

*Desarrollo.* Primero $\tau$:
$$\tau = RC = 2200 \times 470\times10^{-6} \approx 1{,}03\ \text{s}$$
Despejando de $v = V_f(1-e^{-t/\tau})$:
$$\frac{20}{25} = 1 - e^{-t/\tau} \Rightarrow e^{-t/\tau} = 0{,}2 \Rightarrow t = \tau\ln 5 \approx 1{,}03 \times 1{,}61 \approx 1{,}66\ \text{s}$$
*Control.* $1{,}66$ s son $1{,}6\tau$, y la tabla dice que en $1\tau$ va en $63\,\%$ y en $2\tau$ en $86{,}5\,\%$. El $80\,\%$ pedido cae entre las dos, más cerca de $2\tau$. Coherente.

**Para practicar solo.** (a) Tres capacitores de $6\,\mu\text{F}$ en serie. (b) $\tau$ de $R = 10\,\text{k}\Omega$ con $C = 100$ nF. (c) ¿Cuánto tarda ese RC en descargarse hasta el $10\,\%$?$et$,
   $et$El flash de una cámara es el ejemplo más común de este transitorio: un capacitor se carga lentamente a través de una resistencia grande —el zumbido agudo que se oye— y se descarga en microsegundos a través del tubo de xenón. La misma energía, liberada en un tiempo cien mil veces menor, da una potencia instantánea cien mil veces mayor.$et$,
   20),

  -- ====================== electrotecnia/magnetismo ===========================
  ($et$electrotecnia/magnetismo$et$, $et$text$et$,
   $et$Guía — Campo, inductancia y la ley de Faraday-Lenz (ver Boylestad, cap. 11)$et$,
   $et$**Las magnetudes del campo.** Flujo $\Phi$ en weber (Wb); densidad de flujo $B = \Phi/A$ en tesla (T). Una corriente crea campo; un campo variable crea corriente. Esa reciprocidad es todo el módulo.

**Ley de Faraday.**
$$\varepsilon = -N\frac{d\Phi}{dt}$$
Lo que induce fem es la **variación** del flujo, no su valor. Un imán potente e inmóvil dentro de una bobina no induce nada. Los tres modos de hacer variar el flujo son los tres modos de generar electricidad: mover el imán, mover la bobina, o variar la corriente que produce el campo.

**Ley de Lenz: el signo menos.** La corriente inducida circula en el sentido que **se opone al cambio que la produjo**. Si reforzara el cambio, tendríamos energía saliendo de la nada. Consecuencia práctica: acercar un imán a una espira cerrada cuesta trabajo, y ese trabajo es la energía eléctrica que aparece.

**Inductancia.** $L$ en henry. La tensión sobre un inductor es
$$v = L\frac{di}{dt}, \qquad E = \tfrac{1}{2}LI^{2}$$

**En continua permanente, el inductor es un cortocircuito.** Con corriente constante, $di/dt = 0$ y la tensión es cero. Es exactamente el opuesto del capacitor, que en continua permanente es un circuito abierto. Vale la pena memorizar el par.

**Asociación: como los resistores.** Suman en serie, recíprocos en paralelo (sin acoplamiento magnético entre ellos). Los que se comportan al revés son los capacitores.

**Por qué salta chispa al abrir un interruptor con bobina.** Al cortar, $di/dt$ se dispara y $v = L\,di/dt$ puede llegar a cientos de volt con una fuente de pocos volt. Por eso todo relé lleva un diodo en antiparalelo con la bobina: le da a la corriente un camino por donde extinguirse.$et$,
   $et$Ørsted descubrió en 1820, en mitad de una clase, que la aguja de una brújula se desviaba al pasar corriente por un alambre cercano. Faraday cerró el círculo el 29 de agosto de 1831 con un anillo de hierro y dos bobinados, y anotó en su cuaderno que la aguja solo se movía al conectar y al desconectar: la observación exacta de que lo que importa es la variación, no el campo.$et$,
   10),

  ($et$electrotecnia/magnetismo$et$, $et$exercise$et$,
   $et$Práctica guiada — Fem inducida y energía en una bobina$et$,
   $et$**Problema 1.** Una bobina de $500$ espiras ve variar su flujo de $2$ mWb a $6$ mWb en $20$ ms, de manera uniforme. ¿Qué fem media se induce?

*Desarrollo.*
$$|\varepsilon| = N\frac{\Delta\Phi}{\Delta t} = 500 \times \frac{4\times10^{-3}}{20\times10^{-3}} = 500 \times 0{,}2 = 100\ \text{V}$$
*Fíjate.* Lo que entra es la **diferencia** de flujo, no su valor. Si el flujo fuera de $600$ mWb pero constante, la fem sería cero.

**Problema 2.** Por un inductor de $250$ mH circulan $4$ A. ¿Cuánta energía almacena? Si esa corriente se anula en $1$ ms, ¿qué tensión aparece?

*Desarrollo.*
$$E = \tfrac12 LI^{2} = 0{,}5 \times 0{,}25 \times 16 = 2\ \text{J}$$
$$|v| = L\frac{\Delta i}{\Delta t} = 0{,}25 \times \frac{4}{10^{-3}} = 1000\ \text{V}$$
*Lectura.* Mil volt a partir de un circuito que podría estar alimentado con $12$ V. Esa es la razón física de la chispa, y del diodo de rueda libre.

**Problema 3.** Dos inductores sin acoplamiento, de $40$ mH y $60$ mH. Serie y paralelo.

*Desarrollo.*
$$L_{serie} = 100\ \text{mH} \qquad L_{paralelo} = \frac{40 \times 60}{100} = 24\ \text{mH}$$
*Control.* Igual que los resistores: la serie por encima del mayor, el paralelo por debajo del menor.

**Para practicar solo.** (a) Fem en una bobina de $200$ espiras si el flujo pasa de $0$ a $5$ mWb en $0{,}1$ s. (b) Energía en una bobina de $1$ H con $0{,}5$ A. (c) ¿Qué le pasa a la energía almacenada si la corriente se duplica?$et$,
   $et$Los frenos de Foucault de un tren o de una atracción de parque son ley de Lenz pura: al mover un conductor por un campo se inducen corrientes que se oponen al movimiento. Frenan sin contacto y sin desgaste, pero no pueden detener del todo el vehículo — la fuerza es proporcional a la velocidad, así que se anula justo cuando el móvil se para.$et$,
   20),

  -- ====================== electrotecnia/ca_senales ===========================
  ($et$electrotecnia/ca_senales$et$, $et$text$et$,
   $et$Guía — Valores de una senoidal y notación fasorial (ver Boylestad, caps. 13-14)$et$,
   $et$**La señal.** $v(t) = V_m\operatorname{sen}(\omega t + \varphi)$, con
$$T = \frac{1}{f}, \qquad \omega = 2\pi f$$
Tres magnitudes distintas que se confunden entre sí: $T$ en segundos, $f$ en hertz, $\omega$ en rad/s. Los dos pares de red que conviene tener de memoria: $50$ Hz $\rightarrow$ $T = 20$ ms, $\omega = 314$ rad/s; $60$ Hz $\rightarrow$ $T = 16{,}7$ ms, $\omega = 377$ rad/s.

**Los valores de una senoidal.**

| Valor | Fórmula | Para qué sirve |
|---|---|---|
| Máximo $V_m$ | — | aislación, tensión de pico de los componentes |
| Pico a pico | $2V_m$ | lo que se lee en un osciloscopio |
| Medio (ciclo completo) | $0$ | por eso un multímetro en DC marca cero |
| Medio (media onda rectificada) | $2V_m/\pi = 0{,}637V_m$ | rectificación |
| **Eficaz (RMS)** | $V_m/\sqrt{2} = 0{,}707V_m$ | **potencia** |

El **eficaz** es el valor de continua que disiparía la misma potencia en el mismo resistor. Es el que se declara siempre: los $220$ V de la red son eficaces, y su amplitud es $311$ V.

**Fasores.** Con todas las señales a la misma frecuencia y en régimen permanente, cada senoidal queda descrita por dos números: módulo (el eficaz) y ángulo. Se escribe $V\angle\varphi$.

$$v(t) = 311\operatorname{sen}(314t - 30^\circ)\ \text{V} \;\longleftrightarrow\; \vec{V} = 220\angle{-30^\circ}\ \text{V}$$

**Por qué funciona.** Derivar respecto del tiempo equivale a multiplicar por $j\omega$, porque la derivada de un seno es el mismo seno adelantado $90^\circ$ y escalado por $\omega$ — y multiplicar por $j$ es exactamente rotar $90^\circ$. Con eso, las ecuaciones diferenciales del circuito se vuelven álgebra de números complejos.

**Los límites del método:** una sola frecuencia, régimen permanente, circuito lineal. Ni transitorios ni ondas no senoidales (esas hay que descomponerlas primero en armónicas).

**Ángulo no es tiempo.** Se convierten a través del período: $\Delta t = T\cdot(\varphi/360^\circ)$.$et$,
   $et$La «guerra de las corrientes» entre la continua de Edison y la alterna de Westinghouse y Tesla la decidieron dos obras y no los argumentos: la iluminación de la Exposición de Chicago en 1893 y la central de Niágara en 1895, ambas en alterna. La razón técnica de fondo es el transformador, que solo funciona con corriente variable, y que permite elevar la tensión para transportar y bajarla para consumir.$et$,
   10),

  ($et$electrotecnia/ca_senales$et$, $et$exercise$et$,
   $et$Práctica guiada — De la expresión instantánea al fasor y de vuelta$et$,
   $et$**Problema 1.** Dada $v(t) = 170\operatorname{sen}(377t + 45^\circ)$ V, hallar amplitud, eficaz, frecuencia, período y el fasor.

*Desarrollo.*
$$V_m = 170\ \text{V}, \qquad V_{ef} = \frac{170}{\sqrt2} \approx 120\ \text{V}$$
$$\omega = 377 \Rightarrow f = \frac{377}{2\pi} = 60\ \text{Hz} \Rightarrow T = 16{,}7\ \text{ms}$$
$$\vec{V} = 120\angle 45^\circ\ \text{V}$$
*Convención.* El módulo del fasor es el **eficaz**, no la amplitud. Hay textos que usan la amplitud; lo importante es no mezclar las dos convenciones dentro de un mismo problema.

**Problema 2.** Sumar $\vec{I_1} = 6\angle 0^\circ$ A e $\vec{I_2} = 8\angle 90^\circ$ A.

*Desarrollo.* A rectangular: $6 + j0$ y $0 + j8$. Suma: $6 + j8$.
$$|I| = \sqrt{36+64} = 10\ \text{A}, \qquad \theta = \arctan\frac{8}{6} = 53{,}1^\circ$$
$$\vec{I} = 10\angle 53{,}1^\circ\ \text{A}$$
*Error a evitar.* Sumar módulos ($14$ A) y promediar ángulos ($45^\circ$). Los fasores se suman en forma **rectangular**; la forma polar sirve para multiplicar y dividir.

**Problema 3.** ¿A cuánto tiempo equivale un desfase de $60^\circ$ en $50$ Hz?

*Desarrollo.* $T = 20$ ms.
$$\Delta t = 20\ \text{ms} \times \frac{60}{360} \approx 3{,}33\ \text{ms}$$

**Para practicar solo.** (a) El fasor de $i(t) = 14{,}1\operatorname{sen}(314t - 60^\circ)$ A. (b) La expresión instantánea de $\vec{V} = 380\angle 30^\circ$ V a $50$ Hz. (c) La suma de $5\angle 30^\circ$ y $5\angle{-30^\circ}$.$et$,
   $et$El valor eficaz se llama RMS —root mean square— porque literalmente se calcula así: se eleva la señal al cuadrado, se promedia sobre un ciclo y se saca la raíz. El orden importa: promediar primero da cero. La definición aparece en los trabajos de James Prescott Joule sobre calentamiento por corriente, que es exactamente el fenómeno que el valor eficaz describe.$et$,
   20),

  -- ====================== electrotecnia/reactancia ===========================
  ($et$electrotecnia/reactancia$et$, $et$text$et$,
   $et$Guía — Reactancia inductiva y capacitiva ★ (ver Boylestad, cap. 14; Irwin, cap. 8)$et$,
   $et$**Las dos fórmulas, y la única cosa que hay que no confundir.**

$$X_L = \omega L = 2\pi f L \qquad\qquad X_C = \frac{1}{\omega C} = \frac{1}{2\pi f C}$$

Las dos se miden en ohm, pero se comportan al revés:

| | Al **subir** la frecuencia | En continua ($f = 0$) |
|---|---|---|
| $X_L$ | **sube** (proporcional a $f$) | $0$: el inductor es un cable |
| $X_C$ | **baja** (inversa de $f$) | $\infty$: el capacitor es un circuito abierto |

El ancla física, que es más confiable que memorizar: el inductor se opone a los **cambios** de corriente, así que cuanto más rápido cambie, más se opone; el capacitor conduce mejor cuanto más rápido cambie la tensión.

**El error de cuenta más frecuente del módulo** es olvidar el $2\pi$. Usar $f$ donde va $\omega$ deja el resultado desviado en un factor $6{,}28$ — hacia arriba en $X_C$ y hacia abajo en $X_L$. Escribe siempre $\omega$ primero, como número, antes de reemplazar.

**El segundo error más frecuente** es entregar $\omega C$ como si fuera $X_C$. Ese número es la **susceptancia**, en siemens. La reactancia es su inverso.

**Desfase.** En un elemento reactivo ideal, tensión y corriente están a $90^\circ$:
- **Inductor:** la corriente **atrasa** $90^\circ$. $\;Z_L = +jX_L$.
- **Capacitor:** la corriente **adelanta** $90^\circ$. $\;Z_C = -jX_C$.

La mnemotecnia clásica es «ELI the ICE man»: en L (**E**LI) la tensión E va antes que la corriente I; en C (I**CE**) la corriente va antes.

**Una reactancia no disipa potencia.** Durante un cuarto de ciclo toma energía de la fuente y en el siguiente se la devuelve: la potencia media es cero, porque $\cos 90^\circ = 0$. Aplicar $P = I^{2}X$ es tratar una reactancia como si fuera una resistencia. Lo que ese producto da es la potencia **reactiva**, en var, que es otra magnitud.$et$,
   $et$Charles Proteus Steinmetz presentó en 1893, ante el AIEE en Chicago, el método de los números complejos para circuitos de alterna. Antes de eso, resolver un RLC en régimen permanente era un problema de ecuaciones diferenciales que solo unos pocos abordaban; después, una cuenta que podía hacer cualquier ingeniero. Steinmetz era un refugiado prusiano, jorobado y socialista, que General Electric contrató casi por casualidad.$et$,
   10),

  ($et$electrotecnia/reactancia$et$, $et$exercise$et$,
   $et$Práctica guiada — Calcular $X_L$ y $X_C$ sin perder el $2\pi$ ni los prefijos$et$,
   $et$**Problema 1.** $L = 150$ mH en una red de $50$ Hz.

*Desarrollo.* Primero $\omega$, siempre:
$$\omega = 2\pi \times 50 \approx 314\ \text{rad/s}$$
$$X_L = \omega L = 314 \times 0{,}15 \approx 47{,}1\,\Omega$$
*Errores que este ejercicio detecta.* Si te dio $7{,}5\,\Omega$, usaste $f$ en vez de $\omega$. Si te dio $0{,}47\,\Omega$, no convertiste los milihenry.

**Problema 2.** $C = 220\,\mu\text{F}$ en la misma red.

*Desarrollo.*
$$X_C = \frac{1}{\omega C} = \frac{1}{314 \times 220\times10^{-6}} = \frac{1}{0{,}0691} \approx 14{,}5\,\Omega$$
*Orden de las operaciones.* Primero el producto $\omega C$, después el recíproco. Entregar $0{,}0691$ es entregar la susceptancia.

**Problema 3.** El mismo capacitor a $500$ Hz. ¿Cuánto vale $X_C$ sin rehacer la cuenta entera?

*Desarrollo.* La frecuencia se multiplicó por $10$ y $X_C$ es inversamente proporcional:
$$X_C = \frac{14{,}5}{10} \approx 1{,}45\,\Omega$$
*Y el inductor del problema 1 a $500$ Hz:* $X_L = 47{,}1 \times 10 = 471\,\Omega$. Uno subió diez veces y el otro bajó diez veces: esa divergencia es todo el comportamiento en frecuencia de un circuito RLC.

**Problema 4.** ¿Qué inductancia da $X_L = 100\,\Omega$ en $60$ Hz?

*Desarrollo.*
$$L = \frac{X_L}{\omega} = \frac{100}{377} \approx 0{,}265\ \text{H} = 265\ \text{mH}$$

**Para practicar solo.** (a) $X_L$ de $10$ mH a $1$ kHz. (b) $X_C$ de $1\,\mu\text{F}$ a $60$ Hz. (c) ¿A qué frecuencia una bobina de $50$ mH y un capacitor de $50\,\mu\text{F}$ tienen la misma reactancia?$et$,
   $et$La respuesta al último ejercicio es la frecuencia de resonancia, y no es casualidad: la condición «las dos reactancias son iguales» es exactamente la definición de resonancia. Todo el módulo siguiente sale de preguntarse qué pasa en ese punto donde las dos curvas se cruzan.$et$,
   20),

  -- ====================== electrotecnia/impedancia ===========================
  ($et$electrotecnia/impedancia$et$, $et$text$et$,
   $et$Guía — Impedancia, admitancia y los dos triángulos ★ (ver Hayt, cap. 10; Edminister)$et$,
   $et$**Impedancia.** Es la oposición total en alterna, y es un número complejo:
$$\vec{Z} = R + jX, \qquad X = X_L - X_C$$
$$|Z| = \sqrt{R^{2}+X^{2}}, \qquad \theta = \arctan\frac{X}{R}$$

**Las dos operaciones que se confunden.**
- $R$ y $X$ son **perpendiculares**: se combinan con Pitágoras, nunca sumando.
- $X_L$ y $X_C$ son **opuestas** ($180^\circ$): se **restan** entre sí.

Casi todos los errores del módulo son uno de esos dos, aplicado al par equivocado.

**El signo del ángulo dice el carácter.**

| $\theta$ | Carácter | La corriente |
|---|---|---|
| $> 0$ ($X_L > X_C$) | inductivo | **atrasa** |
| $= 0$ | resistivo (resonancia) | en fase |
| $< 0$ ($X_C > X_L$) | capacitivo | **adelanta** |

**Ley de Ohm fasorial.** $\vec{V} = \vec{I}\vec{Z}$. En forma polar la división es cómoda: se dividen los módulos y se **restan** los ángulos.

**Serie y paralelo.**
- **Serie:** $\vec{Z}_T = \vec{Z}_1 + \vec{Z}_2 + \dots$ Se suma en forma **rectangular**, componente a componente y con su signo.
- **Paralelo:** conviene pasar a **admitancias**, que se suman:
$$\vec{Y} = \frac{1}{\vec{Z}} = G + jB, \qquad B = B_C - B_L = \omega C - \frac{1}{\omega L}$$

Al invertir un complejo, el módulo se invierte **y el ángulo cambia de signo**: $1/(r\angle\theta) = (1/r)\angle{-\theta}$. Invertir solo el módulo es un error clásico.

**Ojo con el carácter en paralelo.** En serie manda la reactancia de **mayor** módulo, porque las dos llevan la misma corriente. En paralelo manda la de **menor** módulo, porque es la que deja pasar más corriente. El criterio se invierte con la topología, y aplicar el de una a la otra es un error que además da un resultado plausible.

**En paralelo, lo que se suma son las corrientes de rama**, y se suman como fasores: la del capacitor y la del inductor están a $180^\circ$ y se cancelan parcialmente.$et$,
   $et$La palabra «impedancia» la acuñó Oliver Heaviside en 1886 en las páginas de The Electrician, y no fue la única: también son suyas «inductancia», «admitancia», «conductancia», «permeabilidad» y «reluctancia». Heaviside era un operador de telégrafo autodidacta, sordo y sin título universitario, que además reescribió las veinte ecuaciones de Maxwell en las cuatro que hoy se estudian.$et$,
   10),

  ($et$electrotecnia/impedancia$et$, $et$exercise$et$,
   $et$Práctica guiada — RLC serie y RLC paralelo, paso a paso$et$,
   $et$**Problema 1 — RLC serie.** $R = 20\,\Omega$, $L = 80$ mH, $C = 100\,\mu\text{F}$, red de $50$ Hz y $220$ V. Hallar $\vec{Z}$, la corriente y el carácter.

*Paso 1 — reactancias.* $\omega = 314$ rad/s.
$$X_L = 314 \times 0{,}08 \approx 25{,}1\,\Omega \qquad X_C = \frac{1}{314 \times 10^{-4}} \approx 31{,}8\,\Omega$$

*Paso 2 — reactancia neta.* Se **restan**:
$$X = 25{,}1 - 31{,}8 = -6{,}7\,\Omega \quad \text{(capacitiva)}$$

*Paso 3 — impedancia.*
$$|Z| = \sqrt{20^{2}+6{,}7^{2}} \approx 21{,}1\,\Omega, \qquad \theta = \arctan\frac{-6{,}7}{20} \approx -18{,}5^\circ$$

*Paso 4 — corriente.*
$$\vec{I} = \frac{220\angle 0^\circ}{21{,}1\angle{-18{,}5^\circ}} \approx 10{,}4\angle 18{,}5^\circ\ \text{A}$$
La corriente **adelanta**: el circuito es capacitivo, coherente con $X_C > X_L$.

**Problema 2 — RLC paralelo.** Los mismos tres elementos, ahora en paralelo, con los mismos $220$ V.

*Paso 1 — admitancias de rama.*
$$G = \frac{1}{20} = 0{,}05\ \text{S}, \qquad B_L = \frac{1}{25{,}1} \approx 0{,}0398\ \text{S}, \qquad B_C = \frac{1}{31{,}8} \approx 0{,}0314\ \text{S}$$

*Paso 2 — admitancia total.* En admitancia el capacitor aporta $+jB_C$ y el inductor $-jB_L$:
$$\vec{Y} = 0{,}05 + j(0{,}0314 - 0{,}0398) = 0{,}05 - j0{,}0084\ \text{S}$$
$$|Y| \approx 0{,}0507\ \text{S}, \qquad \theta_Y \approx -9{,}5^\circ \Rightarrow \theta_Z \approx +9{,}5^\circ$$

*Paso 3 — el carácter se invirtió.* Con los **mismos** componentes, en serie el circuito era capacitivo y en paralelo es **inductivo**. La razón: en paralelo manda la rama de menor reactancia, que acá es la del inductor. Vale la pena detenerse en esto: es el resultado que más sorprende del módulo.

*Paso 4 — corrientes.*
$$|I| = |Y|\,V \approx 0{,}0507 \times 220 \approx 11{,}2\ \text{A}, \qquad \operatorname{Re}(\vec{I}) = G\,V = 11\ \text{A}$$
La componente real de la corriente es exactamente la que circula por el resistor.

**Para practicar solo.** (a) Rehacer el problema 1 con $C = 50\,\mu\text{F}$ y ver que el carácter cambia. (b) Hallar $|Z|$ del paralelo del problema 2 invirtiendo $|Y|$. (c) Verificar que las corrientes de rama del paralelo suman fasorialmente la total.$et$,
   $et$Que un mismo juego de componentes cambie de carácter según se conecten en serie o en paralelo no es una rareza de examen: es lo que obliga a que un banco de corrección de factor de potencia se dimensione mirando la instalación completa y no elemento por elemento.$et$,
   20),

  -- ===================== electrotecnia/potencia_ca ===========================
  ($et$electrotecnia/potencia_ca$et$, $et$text$et$,
   $et$Guía — Triángulo de potencias y factor de potencia ★ (ver Irwin, cap. 9)$et$,
   $et$**Las tres potencias.**

| | Símbolo | Unidad | Qué es |
|---|---|---|---|
| Activa | $P = VI\cos\varphi$ | W | la que produce trabajo o calor |
| Reactiva | $Q = VI\operatorname{sen}\varphi$ | var | la que va y vuelve cada ciclo |
| Aparente | $S = VI$ | VA | la que la instalación debe poder entregar |

$$S = \sqrt{P^{2}+Q^{2}}, \qquad \cos\varphi = \frac{P}{S}$$

Es el **mismo triángulo** que el de impedancias, escalado por $I^{2}$: mismos ángulos, misma forma. $P$ y $Q$ son catetos perpendiculares; $S$ es la hipotenusa. Sumarlos aritméticamente es el error central del módulo.

**La reactiva no se consume.** Durante un cuarto de ciclo el elemento reactivo toma energía y en el siguiente la devuelve: su promedio es cero. Pero **circula de verdad**, y obliga a dimensionar conductores y transformadores para ella.

**Factor de potencia.** $\cos\varphi$, entre $0$ y $1$. **Nunca se informa solo:** hay que decir si es en **atraso** (carga inductiva, $Q>0$, lo habitual en la industria por los motores) o en **adelanto** (capacitiva). Dos cargas con el mismo $0{,}8$ pero de distinto carácter piden correcciones contrarias.

**Por qué importa el dinero.** Con la misma potencia activa, un factor de potencia menor exige más corriente:
$$I = \frac{S}{V} = \frac{P}{V\cos\varphi}$$
Bajar de $\cos\varphi = 1$ a $0{,}5$ **duplica** la corriente y **cuadruplica** las pérdidas $I^{2}R$ de la red. Por eso las tarifas industriales lo penalizan.

**Corrección.** Se hace con el elemento **opuesto** al que causa el desfase — capacitores para una carga inductiva —, conectado **en paralelo** para no alterar la tensión de la carga:
$$Q_C = P\left(\tan\varphi_1 - \tan\varphi_2\right)$$
La activa no cambia: los capacitores solo cancelan reactiva. Corregir con un resistor sí sube el $\cos\varphi$, pero quemando energía, que es empeorar el problema para mejorar el indicador.

**Sumar cargas.** Se suman las activas entre sí y las reactivas entre sí **con su signo** (inductiva positiva, capacitiva negativa), y recién al final se compone $S$ con Pitágoras.$et$,
   $et$La corriente que no entrega potencia se llamó durante décadas «corriente sin vatios», y el problema fue económico antes que teórico: la distribuidora debe dimensionar la red para la corriente total aunque solo cobre la parte activa. André Blondel demostró en 1893 el teorema que fija cuántos vatímetros hacen falta para medir un sistema polifásico: uno menos que la cantidad de conductores.$et$,
   10),

  ($et$electrotecnia/potencia_ca$et$, $et$exercise$et$,
   $et$Práctica guiada — Triángulo de potencias y corrección del factor$et$,
   $et$**Problema 1.** Un motor toma $25$ A de una red de $220$ V con $\cos\varphi = 0{,}75$ en atraso. Calcular $S$, $P$ y $Q$.

*Desarrollo.*
$$S = VI = 220 \times 25 = 5500\ \text{VA}$$
$$P = S\cos\varphi = 5500 \times 0{,}75 = 4125\ \text{W}$$
$$\operatorname{sen}\varphi = \sqrt{1-0{,}75^{2}} \approx 0{,}661 \Rightarrow Q = 5500 \times 0{,}661 \approx 3637\ \text{var}$$
*Control.* $\sqrt{4125^{2}+3637^{2}} \approx 5499$ VA. Cierra.

**Problema 2.** Llevar ese motor a $\cos\varphi = 0{,}95$ en atraso. ¿Qué potencia reactiva capacitiva hay que agregar?

*Desarrollo.*
$$\varphi_1 = \arccos 0{,}75 = 41{,}4^\circ \Rightarrow \tan\varphi_1 \approx 0{,}882$$
$$\varphi_2 = \arccos 0{,}95 = 18{,}2^\circ \Rightarrow \tan\varphi_2 \approx 0{,}329$$
$$Q_C = P(\tan\varphi_1 - \tan\varphi_2) = 4125 \times 0{,}553 \approx 2281\ \text{var}$$

*Qué cambió.* La activa sigue en $4125$ W. La reactiva bajó a $3637 - 2281 \approx 1356$ var, la aparente a $\sqrt{4125^{2}+1356^{2}} \approx 4342$ VA y la corriente a $4342/220 \approx 19{,}7$ A. **Cinco amperes menos por la misma potencia útil**, y las pérdidas en la línea bajan en un $38\,\%$.

*Trampa.* Responder $3637$ var, que es compensar **todo** y llevar el factor a $1$. La pregunta pide llegar a $0{,}95$, no a $1$; sobrecompensar deja la instalación capacitiva y trae sus propios problemas.

**Problema 3.** Dos cargas en paralelo: $P_1 = 8$ kW con $Q_1 = 6$ kvar inductivos, y $P_2 = 5$ kW puramente resistiva. ¿Cuál es el factor de potencia del conjunto?

*Desarrollo.*
$$P_T = 13\ \text{kW}, \qquad Q_T = 6\ \text{kvar}, \qquad S_T = \sqrt{169+36} \approx 14{,}3\ \text{kVA}$$
$$\cos\varphi = \frac{13}{14{,}3} \approx 0{,}91 \ \text{en atraso}$$
*Fíjate.* Agregar una carga resistiva **mejora** el factor de potencia del conjunto sin tocar la reactiva: sube $P$ y deja $Q$ igual.

**Para practicar solo.** (a) $P$, $Q$ y $S$ de una carga de $10$ A a $380$ V con $\cos\varphi = 0{,}6$. (b) Qué capacitancia, en $\mu$F, produce $2281$ var a $220$ V y $50$ Hz. (c) El factor de potencia resultante si a la carga (a) se le agrega una resistiva de $2$ kW.$et$,
   $et$El resultado del ejercicio (b) —una capacitancia del orden de los $150\,\mu$F para corregir un motor pequeño— explica por qué los bancos de condensadores industriales son gabinetes enteros: la reactiva a compensar en una planta se cuenta en cientos de kvar, y cada kvar pide su capacitancia.$et$,
   20),

  -- ====================== electrotecnia/resonancia ===========================
  ($et$electrotecnia/resonancia$et$, $et$text$et$,
   $et$Guía — Resonancia serie y paralelo, $Q$ y ancho de banda (ver Boylestad, cap. 20)$et$,
   $et$**La condición.** Resonancia es $X_L = X_C$. De ahí:
$$\omega_0 = \frac{1}{\sqrt{LC}}, \qquad f_0 = \frac{1}{2\pi\sqrt{LC}}$$
**$R$ no aparece.** La resistencia no mueve la resonancia: solo cambia qué tan agudo es el pico. Confundir esas dos cosas es el error conceptual central del módulo.

**Serie y paralelo son duales.**

| | RLC **serie** | RLC **paralelo** (tanque) |
|---|---|---|
| En $f_0$ la impedancia es | **mínima**, $= R$ | **máxima** |
| La corriente de la fuente es | **máxima** | **mínima** |
| Se usa como | pasa-banda / aceptor | rechaza-banda |

**Fuera de la resonancia.** Por **debajo** de $f_0$ domina $X_C$ (capacitivo, la corriente adelanta); por **encima** domina $X_L$ (inductivo, la corriente atrasa). En $f_0$, resistivo puro y $\cos\varphi = 1$.

**Factor de calidad y ancho de banda.**
$$Q = \frac{\omega_0 L}{R} = \frac{1}{R}\sqrt{\frac{L}{C}}, \qquad BW = \frac{f_0}{Q}$$
La relación es **inversa**: más $Q$ es más selectivo, o sea banda más **angosta**. Los extremos de la banda son los puntos de media potencia, donde la corriente cae a $1/\sqrt2$ del máximo.

**Sobretensión resonante.** En resonancia serie, sobre $L$ y sobre $C$ aparecen tensiones $Q$ veces mayores que la de la fuente:
$$V_L = V_C = Q\,V_{fuente}$$
Se cancelan **entre sí** —por eso la fuente solo ve $R$— pero cada una existe de verdad. Con $Q = 50$ y $10$ V de alimentación hay $500$ V sobre la bobina, y los componentes tienen que aguantarlos. Decir que «en resonancia las reactancias desaparecen» es exactamente lo que hace quemar un capacitor.$et$,
   $et$Hertz usó circuitos resonantes en 1887 para generar y detectar ondas electromagnéticas, y sin resonancia no habría podido: la señal era demasiado débil. Oliver Lodge patentó la sintonía en 1897 y Marconi obtuvo en 1900 la patente británica 7777 —la de los «cuatro sietes»— por un sistema de cuatro circuitos resonantes que permitía que dos estaciones se hablaran sin interferirse. Toda la radio del siglo XX salió de ahí.$et$,
   10),

  ($et$electrotecnia/resonancia$et$, $et$exercise$et$,
   $et$Práctica guiada — Un RLC serie completo en resonancia$et$,
   $et$**Problema.** $R = 5\,\Omega$, $L = 20$ mH, $C = 50$ nF, alimentado con $10$ V eficaces. Hallar $f_0$, $Q$, $BW$, la corriente en resonancia y la tensión sobre el inductor.

*Paso 1 — frecuencia de resonancia.*
$$LC = 0{,}02 \times 50\times10^{-9} = 10^{-9} \Rightarrow \sqrt{LC} = 3{,}16\times10^{-5}$$
$$\omega_0 = \frac{1}{3{,}16\times10^{-5}} \approx 31\,623\ \text{rad/s} \Rightarrow f_0 = \frac{31\,623}{2\pi} \approx 5033\ \text{Hz}$$
*Control de unidades.* Si el resultado te queda en el orden de los $10^{4}$, revisa si no entregaste $\omega_0$ en vez de $f_0$: es el error más común del tema.

*Paso 2 — factor de calidad.*
$$X_L(f_0) = \omega_0 L = 31\,623 \times 0{,}02 \approx 632\,\Omega \Rightarrow Q = \frac{632}{5} \approx 126$$
*Control.* $X_C(f_0) = 1/(31\,623 \times 50\times10^{-9}) \approx 632\,\Omega$. Iguales, como debe ser en resonancia.

*Paso 3 — ancho de banda.*
$$BW = \frac{f_0}{Q} = \frac{5033}{126} \approx 40\ \text{Hz}$$
Un circuito muy selectivo: deja pasar solo $40$ Hz alrededor de los $5033$.

*Paso 4 — corriente y sobretensión.* En resonancia $|Z| = R$:
$$I = \frac{10}{5} = 2\ \text{A}, \qquad V_L = I X_L = 2 \times 632 \approx 1264\ \text{V}$$
*O directo:* $V_L = Q\,V = 126 \times 10 = 1260$ V. **Mil doscientos volt sobre la bobina con una fuente de diez.** $V_C$ vale lo mismo y está en oposición: su suma fasorial es cero, y por eso la fuente solo ve los $5\,\Omega$.

*Paso 5 — potencia.* $P = I^{2}R = 4 \times 5 = 20$ W, y es máxima justo en resonancia, porque la corriente lo es.

**Para practicar solo.** (a) Recalcular $f_0$ si $C$ se cuadruplica. (b) ¿Qué $R$ haría falta para que $BW$ fuera de $200$ Hz? (c) ¿Es el circuito inductivo o capacitivo a $4000$ Hz?$et$,
   $et$La sobretensión resonante es también un modo de falla real en redes de distribución: la resonancia entre la capacitancia de un banco de corrección y la inductancia del transformador puede amplificar una armónica de la instalación hasta destruir el propio banco. Se llama resonancia paralela con la red, y es la razón por la que los bancos grandes llevan reactores de bloqueo.$et$,
   20),

  -- ======================= electrotecnia/trifasico ===========================
  ($et$electrotecnia/trifasico$et$, $et$text$et$,
   $et$Guía — Estrella, triángulo y potencia trifásica (ver Fitzgerald; Boylestad, cap. 23)$et$,
   $et$**Qué es.** Tres tensiones del mismo valor desfasadas $120^\circ$. En un sistema **equilibrado**, la suma fasorial de las tres es **cero**: por eso el neutro no lleva corriente y el trifásico transporta la misma potencia con menos cobre que tres circuitos monofásicos.

**Las dos conexiones, y dónde va el $\sqrt3$.**

| | **Estrella** (Y) | **Triángulo** ($\Delta$) |
|---|---|---|
| Tensiones | $V_L = \sqrt3\,V_F$ | $V_L = V_F$ |
| Corrientes | $I_L = I_F$ | $I_L = \sqrt3\,I_F$ |

**El factor está en un solo lado en cada conexión**, y en lados opuestos. Conviene memorizar la tabla entera, no una fila: la mitad de los errores del módulo es aplicar el $\sqrt3$ donde no va.

Y el factor es siempre $\sqrt3 \approx 1{,}732$, nunca $3$: viene de la geometría de dos fasores a $120^\circ$, no de que haya tres fases.

**El caso concreto de la red chilena:** $380$ V entre dos fases (línea) y $220$ V entre fase y neutro. $380/\sqrt3 = 220$.

**Potencia.** Con magnitudes de **línea**:
$$P = \sqrt3\,V_L I_L\cos\varphi, \qquad Q = \sqrt3\,V_L I_L\operatorname{sen}\varphi, \qquad S = \sqrt3\,V_L I_L$$
Con magnitudes de **fase**: $P = 3V_F I_F\cos\varphi$. Las dos formas dan lo mismo; lo que no se puede es mezclarlas.

**Estrella-triángulo con las mismas impedancias.** En triángulo cada impedancia ve $\sqrt3$ veces más tensión, y como $P \propto V^{2}$, el conjunto consume **tres veces** más. Esa es la base del arranque estrella-triángulo: se arranca en estrella para limitar la corriente a un tercio, y se conmuta a triángulo. El par también cae a un tercio, así que solo sirve para arrancar en vacío o con poca carga.

**Desequilibrado.** Todos los atajos de arriba suponen tres fases idénticas. Si las cargas difieren, la suma fasorial de las corrientes ya no es cero y por el neutro circula la diferencia. Ahí hay que resolver fase por fase.

**Medición.** Teorema de Blondel (1893): con $n$ conductores bastan $n-1$ vatímetros. En un sistema de tres conductores, dos — equilibrado o no.$et$,
   $et$Mikhail Dolivo-Dobrovolsky construyó en 1889 el primer motor de inducción trifásico y en 1891 transmitió energía desde Lauffen hasta la Exposición Electrotécnica de Frankfurt: 175 km a 15 kV, con un rendimiento del orden del 75 %. Las conexiones estrella y triángulo son suyas. El sistema trifásico es probablemente la infraestructura técnica más antigua que seguimos usando sin cambios de fondo.$et$,
   10),

  ($et$electrotecnia/trifasico$et$, $et$exercise$et$,
   $et$Práctica guiada — La misma carga en estrella y en triángulo$et$,
   $et$**Problema.** Tres impedancias iguales de $\vec{Z} = 12 + j9\,\Omega$ se conectan a una red trifásica de $380$ V. Resolver en estrella y en triángulo.

*Datos comunes.* $|Z| = \sqrt{144+81} = 15\,\Omega$, $\;\theta = \arctan(9/12) = 36{,}9^\circ$, $\;\cos\varphi = 0{,}8$ en atraso.

---

**En estrella.**

*Tensión de fase:*
$$V_F = \frac{380}{\sqrt3} \approx 219{,}4\ \text{V}$$
*Corriente de fase, que en estrella es también la de línea:*
$$I_F = I_L = \frac{219{,}4}{15} \approx 14{,}6\ \text{A}$$
*Potencia:*
$$P = \sqrt3 \times 380 \times 14{,}6 \times 0{,}8 \approx 7686\ \text{W}$$
*Control por fases:* $P = 3 \times 219{,}4 \times 14{,}6 \times 0{,}8 \approx 7687$ W. Coincide.

---

**En triángulo.**

*Tensión de fase, que ahora es la de línea:*
$$V_F = V_L = 380\ \text{V}$$
*Corriente de fase:*
$$I_F = \frac{380}{15} \approx 25{,}3\ \text{A}$$
*Corriente de línea:*
$$I_L = \sqrt3 \times 25{,}3 \approx 43{,}9\ \text{A}$$
*Potencia:*
$$P = \sqrt3 \times 380 \times 43{,}9 \times 0{,}8 \approx 23\,116\ \text{W}$$

---

**La comparación, que es el punto del ejercicio.**

$$\frac{P_\Delta}{P_Y} = \frac{23\,116}{7686} \approx 3 \qquad \frac{I_{L\Delta}}{I_{LY}} = \frac{43{,}9}{14{,}6} \approx 3$$

Con las **mismas** impedancias y la **misma** red, el triángulo consume tres veces más y toma tres veces más corriente de línea. Por eso el arranque estrella-triángulo funciona: arrancar en estrella limita la corriente a un tercio de la que tomaría en triángulo.

*Y la potencia reactiva:* $Q_Y = \sqrt3 \times 380 \times 14{,}6 \times 0{,}6 \approx 5765$ var; $Q_\Delta \approx 17\,337$ var. Misma razón de tres.

**Para practicar solo.** (a) La potencia aparente en los dos casos. (b) Qué corriente de línea tomaría la conexión en triángulo si la red fuera de $220$ V. (c) Cuánta reactiva capacitiva haría falta para llevar la conexión en estrella a $\cos\varphi = 0{,}95$.$et$,
   $et$La razón de tres entre triángulo y estrella es la misma que explica por qué muchos motores industriales traen la caja de bornes con seis terminales y tres puentes: el mismo motor se conecta en estrella para una tensión de red y en triángulo para otra $\sqrt3$ veces menor, y en los dos casos cada bobinado ve la tensión para la que fue diseñado.$et$,
   20)

)
insert into public.resources
  (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, r.type, r.title, r.body, null, r.historical_context, r.order_index, false
from recursos r
join public.modules m on m.slug = r.module_slug
where not exists (
  select 1 from public.resources x
   where x.module_id = m.id and x.title = r.title
);

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select m.slug, count(*) as recursos
--     from public.resources r join public.modules m on m.id = r.module_id
--    where m.track = 'electrotecnia' group by m.slug order by m.slug;
--   -- 12 filas, 2 recursos cada una (24 en total)
--
--   -- Ninguno publicado (ADR-016 §1):
--   select count(*) from public.resources r
--     join public.modules m on m.id = r.module_id
--    where m.track = 'electrotecnia' and r.published;
--   -- 0
--
--   -- Ningún recurso quedó sin módulo (el `join` los descartaría en silencio,
--   -- así que lo que hay que mirar es el total, no los nulls):
--   select count(*) from public.resources r
--     join public.modules m on m.id = r.module_id
--    where m.track = 'electrotecnia';
--   -- 24. Si sale menos, hay un `module_slug` mal escrito arriba.
--
-- Para publicarlos hay que auditarlos primero, **rehaciendo cada cuenta** y no
-- solo leyéndolos (ADR-016 §2). Uno por uno, desde Admin → Recursos, o bien:
--   update public.resources r set published = true
--    from public.modules m
--    where m.id = r.module_id and m.slug = '<slug del módulo auditado>';
--
-- Reversión: borrar los módulos del track (el `on delete cascade` de
-- resources.module_id se lleva estos recursos), o bien:
--   delete from public.resources r using public.modules m
--    where m.id = r.module_id and m.track = 'electrotecnia';
