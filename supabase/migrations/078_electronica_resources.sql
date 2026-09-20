-- Recursos de capa 1 para los cinco módulos del track `electronica` (10 recursos),
-- **y las 60 filas de `resource_misconceptions` que los atan a los errores**.
--
-- ⚠ APLICAR DESPUÉS DE `071` (los módulos tienen que existir) y de `072`…`076`
-- (las ideas erróneas tienen que existir). No es precondición de nada: los
-- recursos son la capa 1 de «Mi plan» y no intervienen en el diagnóstico.
--
-- ── Qué es esto ────────────────────────────────────────────────────────────
-- Dos recursos por módulo, el mismo par que usaron `039` y `066`:
--   · una **guía** (`type = 'text'`) — la teoría mínima, escrita para leerse
--     **después de fallar un ítem**, no antes de estudiar el tema. Por eso
--     arranca por el error y no por la definición;
--   · una **práctica guiada** (`type = 'exercise'`) — dos o tres problemas con
--     el desarrollo escrito, no solo el resultado.
--
-- ── ⭐ ESTA ES LA PRIMERA MIGRACIÓN QUE LLENA `resource_misconceptions` ──────
-- `045` creó esa tabla y **quedó vacía**. El mapa de la unidad lo dice en su
-- lugar A8: sin ella, la capa 1 de «Mi plan» es genérica **por estructura**, no
-- por falta de contenido — un módulo agrupa muchos recursos y muchas ideas
-- erróneas, y no hay forma de ir del error concreto al material concreto.
--
-- Acá entran las **60 filas** que cubren las 30 ideas erróneas del track: cada
-- una con `rank = 1` al recurso que la ataca de frente, y `rank = 2` al otro
-- recurso del mismo módulo. Con eso **ninguna idea errónea del track queda sin
-- material**, que es la pregunta P4.3 de la skill `unidad-de-contenido`.
--
-- ⚠️ **Y hoy no cambia nada en pantalla, a propósito.** Ningún namespace lee
-- `resource_misconceptions` todavía (verificado con `grep` sobre `src/`): «Mi
-- plan» sigue cruzando recursos con déficits **por módulo**
-- (`plan/resources-for-deficits`). Esto es el dato listo para **T-54**, que es
-- quien va a leerlo. Se escribe ahora porque el costo de hacerlo junto con los
-- recursos es cero y el de reconstruirlo después, alto: quien escribió el
-- recurso es quien sabe qué error ataca.
--
-- ── `published = false` en los 10 ─────────────────────────────────────────
-- ADR-016 §1-2: contenido asistido por IA nace despublicado y se publica a mano
-- después de auditarlo **rehaciendo cada cuenta**, no solo leyéndolo.
--
-- ⚠️ **Consecuencia concreta: hasta que se publiquen, el estudiante no ve
-- ninguno.** La policy `resources_select_published` los esconde sin avisar, y
-- «Mi plan» le va a mostrar la capa 0 (su mapa de errores) sin material de
-- apoyo. Publicarlos es una línea:
--
--     update public.resources set published = true
--      where module_id in (select id from public.modules where track = 'electronica');
--
-- Vale acá con más fuerza que en `039`, porque el destinatario **no** es el
-- autor: es un alumno de 16 años que no tiene cómo detectar un error de signo.
-- Un recurso con un error enseña el error.
--
-- ── Derechos de autor: mismo criterio que `018`, `019`, `039` y `066` ──────
-- Todo el texto está **redactado desde cero**. Las referencias funcionan como un
-- «ver Boylestad, capítulo de circuitos de continua» dicho en clase: apuntan a
-- dónde ampliar, no reproducen contenido. Las citas van a nivel de **capítulo o
-- tema**, nunca de página ni de número de ecuación, porque la paginación cambia
-- entre ediciones y una referencia falsamente precisa es peor que una general.
--
-- ── Convenciones (`supabase/CONTENT.md`) ──────────────────────────────────
-- Decimal con coma, resultado siempre con unidad y prefijo del taller, sentido
-- de malla horario, y **«tensión»/«corriente»** — nunca «voltaje» ni
-- «intensidad».
--
-- Idempotente: `where not exists` por (módulo, título) y por la clave compuesta
-- de `resource_misconceptions`.

-- -----------------------------------------------------------------------------
-- 1. Los diez recursos
-- -----------------------------------------------------------------------------
with recursos (module_slug, type, title, body, historical_context, order_index) as (
  values

  -- ==================== electronica/notacion_cientifica =====================
  ($en$electronica/notacion_cientifica$en$::text, $en$text$en$::text,
   $en$Guía — Los prefijos del taller, y por qué un número raro suele ser un prefijo mal puesto$en$::text,
   $en$**Si llegaste acá es porque un resultado te dio un número que no se parece a nada.** Casi siempre no es la fórmula: es el prefijo.

**La idea entera en una línea.** Un prefijo es un multiplicador, nada más. Cambiar de prefijo corre la coma; no cambia la magnitud.

- **kilo (k)** = mil. $4,7$ kΩ = $4700$ Ω. La coma va tres lugares a la **derecha**.
- **mega (M)** = un millón. $2,2$ MΩ = $2\,200\,000$ Ω. Seis lugares.
- **mili (m)** = una milésima. $25$ mA = $0,025$ A. Tres lugares a la **izquierda**.
- **micro (µ)** = una millonésima. $470$ µF = $0,000470$ F. Seis lugares.
- **nano (n)** = una milmillonésima. $10$ nF = $0,01$ µF. De nano a micro hay **mil**.
- **pico (p)** = una billonésima. Aparece en capacitores chicos de radiofrecuencia.

**Los tres errores que este módulo mide.**

**1. Mili por micro.** Entre mili y micro hay **mil**, no diez. Si pasaste $470$ µF a $0,47$ F, usaste mili. Son $0,000470$ F.

**2. El signo del exponente.** Un prefijo que agranda (k, M, G) lleva exponente **positivo**; uno que achica (m, µ, n, p), **negativo**. Un número menor que 1 escrito en notación científica **siempre** tiene exponente negativo. Si te dio $8 \times 10^{5}$ A en un circuito de pila, el signo se dio vuelta.

**3. Operar sin convertir.** $2,2$ kΩ $+ 470$ Ω **no es** $472,2$ de nada. Primero al mismo prefijo: $2200 + 470 = 2670$ Ω. **Regla:** antes de sumar o comparar, llevá todo a la misma unidad.

**Notación científica: la única regla de forma.** La mantisa queda entre 1 y 10. $0,5 \times 10^{-3}$ y $80 \times 10^{-6}$ valen lo mismo que $5 \times 10^{-4}$ y no están en notación científica.

**Al multiplicar y dividir potencias de diez:** las mantisas se multiplican o dividen, y los exponentes se **suman o restan**. Nunca se multiplican entre sí.

**El hábito que vale más que todo lo anterior.** Antes de dar un resultado por bueno, preguntate si puede existir. Una pila de $9$ V con $1$ kΩ da $9$ mA. Si te dio $9000$ A, no hace falta revisar la cuenta para saber que está mal: **ninguna pila entrega miles de amperes.**

Para ampliar: Boylestad, *Introducción al análisis de circuitos*, capítulo de introducción y notación.$en$::text,
   $en$Los prefijos vienen de la Comisión del Sistema Métrico de la Francia revolucionaria (1793), que fijó raíces griegas para los múltiplos y latinas para los submúltiplos para que ningún país pudiera reclamarlos como propios. "Micro", "mega", "nano" y "pico" se hicieron oficiales recién en 1960.$en$::text,
   10),

  ($en$electronica/notacion_cientifica$en$::text, $en$exercise$en$::text,
   $en$Práctica guiada — Convertir, comparar y estimar antes de calcular$en$::text,
   $en$**Problema 1.** Sumá $1,5$ kΩ $+ 820$ Ω $+ 0,33$ kΩ y decí cuál es el más chico.

*Desarrollo.* Todo a ohm: $1500$, $820$, $330$. Suma: $1500 + 820 + 330 = 2650$ Ω, o $2,65$ kΩ. El más chico es el de **$0,33$ kΩ = $330$ Ω**, que era el que tenía el número más chico escrito pero también el prefijo que agranda. Sin convertir, el $820$ parecía el mayor.

**Problema 2.** ¿Cuántos microfaradios son $10$ nF?

*Desarrollo.* De nano a micro hay un factor de **mil**, y vamos hacia la unidad más grande, así que el número se achica: $10 / 1000 = 0,01$ µF. Comprobación: $0,01$ µF $= 0,00000001$ F $= 10 \times 10^{-9}$ F. Cierra.

**Problema 3.** Un alumno divide $9$ V entre $1$ kΩ y anota $9000$ A. ¿Dónde se equivocó?

*Desarrollo.* Escribió $1$ kΩ como $0,001$ Ω en vez de $1000$ Ω: invirtió el signo del exponente. Con el valor correcto, $9 / 1000 = 0,009$ A $= 9$ mA. Pero antes de encontrar el error se podía saber que lo había: **$9000$ A en un circuito de pila es imposible**, y ese reflejo vale más que la corrección.

**Problema 4.** Escribí $0,000\,08$ A en notación científica.

*Desarrollo.* La coma se corre **cinco** lugares a la derecha para dejar la mantisa entre 1 y 10: $8 \times 10^{-5}$ A. Es lo mismo que $80$ µA, que es como se diría en el taller.$en$::text,
   null::text, 20),

  -- ======================= electronica/ley_de_ohm ============================
  ($en$electronica/ley_de_ohm$en$::text, $en$text$en$::text,
   $en$Guía — Un despeje por vez, y qué magnitud es cada número$en$::text,
   $en$**La ley entera es una sola relación:** $V = I \cdot R$. Todo lo demás son despejes.

- ¿Falta la tensión? $V = I \cdot R$ — se **multiplica**.
- ¿Falta la corriente? $I = V / R$ — la tensión va **arriba**.
- ¿Falta la resistencia? $R = V / I$ — la tensión va **arriba** otra vez.

**Regla que resuelve el despeje sin memorizar tres fórmulas:** la tensión está arriba en las dos divisiones. Si tu cuenta tiene la tensión abajo, está invertida.

**Qué es cada número.** El volt (V) mide tensión, el ampere (A) mide corriente, el ohm (Ω) mide resistencia. El orden en que el enunciado los presenta **no** cambia el despeje: si dice «circulan $3$ A y hay $6$ V», la resistencia sigue siendo $6/3 = 2$ Ω y no $3/6$.

**La unidad es parte del resultado.** Responder «6» no es responder. Y «6 V» cuando se pedía una resistencia es un error distinto del de la cuenta: es no saber qué magnitud estás calculando.

**Cómo se comporta.** Con el mismo resistor, **más tensión da más corriente** (proporción directa). Con la misma tensión, **más resistencia da menos corriente** (proporción inversa). La resistencia **frena**; no empuja.

**La fuente no es un resistor.** A una pila de $12$ V no se le aplica $V = I \cdot R$ para «encontrar su caída»: la pila **impone** su tensión, y el resistor decide cuánta corriente circula. Con un solo resistor, toda la tensión de la fuente cae sobre él.

**Atajo del taller que conviene tener automatizado:** **miliamperes × kilohm = volts**. $9$ mA por $1$ kΩ son $9$ V, sin convertir nada. Y al revés: volts dividido kilohm da miliamperes.

Para ampliar: Boylestad, capítulo de ley de Ohm, potencia y energía; Irwin & Nelms, capítulo de resistencia.$en$::text,
   $en$Georg Simon Ohm publicó su ley en 1827 y un colega lo acusó de "herejía contra la naturaleza": medir la electricidad con una fórmula parecía rebajarla. Renunció a su cátedra. La Royal Society le dio la medalla Copley catorce años después.$en$::text,
   10),

  ($en$electronica/ley_de_ohm$en$::text, $en$exercise$en$::text,
   $en$Práctica guiada — Los tres despejes, con los números del taller$en$::text,
   $en$**Problema 1.** Una pila de $4,5$ V alimenta un resistor de $220$ Ω. ¿Qué corriente circula, en miliamperes?

*Desarrollo.* Falta la corriente, así que la tensión va arriba: $I = V/R = 4,5 / 220 = 0,0205$ A. En miliamperes: **$20,5$ mA**, que se redondea a $20$ mA. Control de sentido común: un circuito de pila con un resistor de cientos de ohm da decenas de miliamperes. Cierra.

**Problema 2.** Un LED necesita $20$ mA y sobre el resistor en serie caen $2$ V. ¿Cuánto vale el resistor?

*Desarrollo.* Falta la resistencia: $R = V/I = 2 / 0,020 = 100$ Ω. Es la cuenta que se hace cada vez que se pone un LED: **la tensión que sobra, dividida por la corriente que se quiere**.

**Problema 3.** Por un resistor de $4,7$ kΩ circulan $2$ mA. ¿Qué tensión cae?

*Desarrollo.* Falta la tensión, se multiplica: $V = I \cdot R = 0,002 \times 4700 = 9,4$ V. Con el atajo sale directo: $2$ mA × $4,7$ kΩ = **$9,4$ V**.

**Problema 4.** Si se duplica la resistencia manteniendo la tensión, ¿qué pasa con la corriente?

*Desarrollo.* En $I = V/R$ la resistencia divide: al doble de resistencia, **la mitad de corriente**. No hace falta ningún número. Y al revés: duplicando la tensión con el mismo resistor, la corriente se duplica.$en$::text,
   null::text, 20),

  -- ======================== electronica/potencia =============================
  ($en$electronica/potencia$en$::text, $en$text$en$::text,
   $en$Guía — Las tres formas de la potencia y dónde vive el cuadrado$en$::text,
   $en$**La forma directa:** $P = V \cdot I$. Tensión por corriente, y da watts.

**Las otras dos salen de meter la ley de Ohm adentro**, y es ahí donde se pierde el exponente:

- Si conocés corriente y resistencia: $P = I^2 R$.
- Si conocés tensión y resistencia: $P = V^2 / R$.

**Por qué hay un cuadrado.** En $P = V \cdot I$, si reemplazás $V$ por $I \cdot R$ queda $P = (I \cdot R) \cdot I = I^2 R$. La corriente entra **dos veces**: una por sí misma y otra a través de la tensión que provoca. No es una regla que memorizar, es una sustitución.

**Qué se eleva y qué no.** En $I^2 R$ el cuadrado es de la **corriente**, y la resistencia multiplica de a uno. En $V^2/R$ el cuadrado es de la **tensión**, y la resistencia **divide**. Escribir $V^2 R$ o $I^2/R$ pone el cuadrado bien y la resistencia del lado equivocado.

**La consecuencia que se siente en el taller.** Como la corriente está al cuadrado, **al doble de corriente la potencia se cuadruplica**. Por eso un cable que aguanta $10$ A no aguanta $20$ «un poco menos bien»: disipa cuatro veces más calor. La resistencia, en cambio, entra de a uno: al doble de resistencia con la misma corriente, el doble de potencia.

**Potencia no es energía.** La potencia (W) es el **ritmo**; la energía (Wh o J) es el **total**, y necesita un tiempo. Una plancha de $1100$ W encendida $2$ horas consume $2200$ Wh. Si la pregunta no menciona tiempo, la respuesta no puede llevar horas.

**Mirá siempre la potencia nominal del resistor.** Un resistor de un cuarto de watt aguanta $0,25$ W. Si la cuenta te da $0,8$ W, ese resistor se quema. El criterio habitual es elegir uno de **el doble** de lo calculado.

Para ampliar: Boylestad, capítulo de potencia y energía; Edminister (Schaum), *Circuitos eléctricos*, problemas de potencia en continua.$en$::text,
   $en$James Prescott Joule midió en 1841, con un calorímetro casero, que el calor crece con el cuadrado de la corriente. Era cervecero, no académico, y la Royal Society le rechazó el trabajo.$en$::text,
   10),

  ($en$electronica/potencia$en$::text, $en$exercise$en$::text,
   $en$Práctica guiada — Elegir la forma correcta y dimensionar el resistor$en$::text,
   $en$**Problema 1.** Por un resistor de $220$ Ω circulan $50$ mA. ¿Qué potencia disipa y qué resistor hay que comprar?

*Desarrollo.* Tenemos corriente y resistencia, así que $P = I^2 R$. Primero el cuadrado: $0,05^2 = 0,0025$. Después: $0,0025 \times 220 = 0,55$ W. **Medio watt.** Un resistor de un cuarto de watt **no sirve**: hay que poner uno de $1$ W.

**Problema 2.** Un resistor de $1$ kΩ está conectado a $10$ V. ¿Qué potencia disipa?

*Desarrollo.* Tenemos tensión y resistencia: $P = V^2/R = 100 / 1000 = 0,1$ W. Son $100$ mW, y un resistor de un cuarto de watt lo aguanta cómodo. Comprobación por el camino largo: $I = 10/1000 = 10$ mA, y $P = V \cdot I = 10 \times 0,01 = 0,1$ W. Da lo mismo, como tiene que dar.

**Problema 3.** Un resistor de $50$ Ω disipa $8$ W. ¿Qué corriente circula?

*Desarrollo.* De $P = I^2 R$ se despeja $I^2 = P/R = 8/50 = 0,16$. Eso es el **cuadrado** de la corriente, así que falta la raíz: $I = \sqrt{0,16} = 0,4$ A. Quedarse en $0,16$ es el error más frecuente de este despeje.

**Problema 4.** Una resistencia calefactora de $50$ W funciona $2$ horas. ¿Qué energía consume?

*Desarrollo.* $E = P \cdot t = 50 \times 2 = 100$ Wh. Watts por horas da watt-hora, que es lo que factura la compañía eléctrica. Si la respuesta hubiera sido en watts, sería una potencia y no una energía.$en$::text,
   null::text, 20),

  -- ====================== electronica/capacitores ============================
  ($en$electronica/capacitores$en$::text, $en$text$en$::text,
   $en$Guía — C = Q/V, y por qué los capacitores se asocian al revés que los resistores$en$::text,
   $en$**La definición, que es de donde sale todo lo demás:** $C = Q/V$.

Leída en voz alta: **cuánta carga entra por cada volt**. Un capacitor de $2$ mF guarda $2$ mC por cada volt que se le aplique. Esa frase resuelve la mayoría de los errores del módulo.

**Tres cosas que la definición aclara de una vez.**

**1. La capacitancia no es la carga.** Un capacitor descargado **no** tiene $C = 0$: sigue teniendo su capacidad de guardar, solo que ahora no hay nada guardado. La capacitancia la fijan las placas y el dieléctrico.

**2. La capacitancia no depende de la tensión que le apliques.** Si duplicás la tensión, se duplica la **carga**, y el cociente $Q/V$ queda igual. Ver la $V$ abajo hace pensar que si $V$ sube, $C$ baja; no pasa, porque $Q$ sube en la misma proporción.

**3. Carga no es corriente.** El coulomb (C) mide carga; el ampere (A) mide corriente, que es carga por segundo. Responder «$1200$ µA» donde se pedía carga es tener el número bien y la magnitud mal.

**Los despejes.** $Q = C \cdot V$ y $V = Q/C$. Misma regla que en la ley de Ohm: la magnitud que da nombre al cociente —la carga— va arriba.

**La asociación, que es al revés que en los resistores.**

- **En paralelo se suman:** $C_{total} = C_1 + C_2$. Poner dos en paralelo es como agrandar las placas: cabe más carga por volt.
- **En serie se combinan por inversas:** $1/C_{total} = 1/C_1 + 1/C_2$. Con dos, el atajo es producto sobre suma. El resultado queda **siempre por debajo del más chico**.

**Por qué al revés.** En serie la tensión **se reparte** entre los dos, así que para meter la misma carga hace falta más tensión total — y menos carga por volt es menos capacitancia. Y en serie los dos guardan **la misma carga**, porque hay un solo camino.

**Comprobación que evita casi todos los errores de asociación:** en serie el resultado tiene que ser **menor** que el capacitor más chico; en paralelo, **mayor** que el más grande. Si no cumple, la fórmula se usó al revés.

**Y mirá el segundo número impreso.** Un capacitor marcado «$100$ µF  $25$ V» aguanta hasta $25$ V. En un circuito de $24$ V va justo; en uno de $35$ V se perfora.

Para ampliar: Boylestad, capítulo de capacitores; Irwin & Nelms, capítulo de elementos almacenadores de energía.$en$::text,
   $en$El primer capacitor fue accidental: Pieter van Musschenbroek recibió en 1746 la descarga de un frasco cargado en Leiden y escribió que no repetiría el experimento "ni por todo el reino de Francia". La unidad honra a Faraday, que llegó un siglo después con la idea de que lo que importa es la carga por cada volt.$en$::text,
   10),

  ($en$electronica/capacitores$en$::text, $en$exercise$en$::text,
   $en$Práctica guiada — De la definición a la asociación, con la comprobación siempre puesta$en$::text,
   $en$**Problema 1.** Un capacitor almacena $6$ mC con $3$ V aplicados. ¿Cuánto vale?

*Desarrollo.* $C = Q/V = 6/3 = 2$ mF. Leído: guarda $2$ mC por cada volt. Si hubieras multiplicado, $6 \times 3 = 18$, el resultado no significaría nada: la capacitancia es un cociente, no un producto.

**Problema 2.** Un capacitor de $100$ µF se conecta a $12$ V. ¿Qué carga almacena?

*Desarrollo.* $Q = C \cdot V = 100 \times 12 = 1200$ µC. Comprobación con la frase: guarda $100$ µC por volt, y hay 12 volts. Cierra.

**Problema 3.** $10$ µF y $15$ µF en serie. ¿Cuánto da?

*Desarrollo.* Producto sobre suma: $(10 \times 15)/(10 + 15) = 150/25 = 6$ µF. **Comprobación:** en serie tiene que quedar por debajo del más chico, que es $10$ µF. $6 < 10$: cierra. Si te hubiera dado $25$ µF, sumaste — y $25$ es mayor que los dos, así que la comprobación lo habría cazado sola.

**Problema 4.** Tres capacitores de $30$ µF en serie.

*Desarrollo.* Con capacitores iguales, la equivalente es uno dividido la cantidad: $30/3 = 10$ µF. Comprobación: $10 < 30$. Cierra.

**Problema 5.** Un capacitor de $0,47$ µF almacena $2,35$ µC. ¿A qué tensión está?

*Desarrollo.* $V = Q/C = 2,35 / 0,47 = 5$ V. Otra forma de verlo sin dividir: si guarda $0,47$ µC por volt, para juntar $2,35$ µC hacen falta 5 volts.$en$::text,
   null::text, 20),

  -- =================== electronica/leyes_de_kirchhoff ========================
  ($en$electronica/leyes_de_kirchhoff$en$::text, $en$text$en$::text,
   $en$Guía — Lo que entra sale, y lo que sube baja$en$::text,
   $en$**Son dos leyes y ninguna es nueva.** Una es conservación de la carga y la otra, conservación de la energía. Lo único que hay que aprender es cuál se usa dónde.

**Ley de nodos (un punto).** *Todo lo que entra a un nodo sale.* En un punto no se acumula ni desaparece corriente. Si entran $3$ A y por una rama salen $1$ A, por la otra salen $2$ A.

**Ley de mallas (un camino cerrado).** *Si volvés al punto de partida, subiste y bajaste lo mismo.* La fuente sube el potencial y los resistores lo bajan; la suma de las caídas iguala a la tensión de la fuente.

**Cuál se usa dónde.** En un **nodo** se trabaja con **corrientes**; en una **malla**, con **tensiones**. Sumar tensiones alrededor de un nodo, o corrientes a lo largo de una malla, es aplicar la ley equivocada.

**El par que hay que tener memorizado, porque todo lo demás se deduce de él:**

- **En serie se comparte la corriente** — hay un solo camino, así que pasa entera por todos. Lo que se **reparte** en serie es la tensión.
- **En paralelo se comparte la tensión** — todas las ramas están entre los mismos dos puntos. Lo que se **reparte** en paralelo es la corriente.

Está cruzado a propósito, y confundirlo es el error más común del módulo: no es que la corriente se divida entre dos resistores en serie, ni que la tensión se reparta entre dos ramas en paralelo.

**El signo, que es lo que más cuesta.** Acá recorremos **siempre en sentido horario**. Fijar el sentido es lo que hace que el signo signifique algo:

- Al entrar a un resistor por donde entra la corriente, se **baja** de potencial: la caída va **restando**.
- A una fuente, el signo depende de **por qué borne se entra**. Entrando por el **negativo** y saliendo por el positivo, se **sube**: suma. Al revés, **resta**.

**La fuente no es siempre positiva.** No depende de que sea una fuente: depende de cómo esté conectada. Dos pilas enfrentadas se **restan**; dos pilas en el mismo sentido se **suman**.

Para ampliar: Boylestad, capítulos de circuitos serie y paralelo y de métodos de análisis; Irwin & Nelms, capítulo de leyes de Kirchhoff.$en$::text,
   $en$Gustav Kirchhoff enunció sus dos leyes en 1845, con 21 años y sin haberse graduado todavía. Es más conocido hoy por otra cosa: con Bunsen fundó el análisis espectral, y de ahí salió la ley del cuerpo negro que en 1900 obligó a Planck a inventar el cuanto.$en$::text,
   10),

  ($en$electronica/leyes_de_kirchhoff$en$::text, $en$exercise$en$::text,
   $en$Práctica guiada — Un nodo, una malla, y el signo de la fuente$en$::text,
   $en$**Problema 1.** A un nodo entran $5$ A. Por una rama salen $2$ A y por otra $1$ A. ¿Qué pasa en la cuarta rama?

*Desarrollo.* Entran $5$ y ya salieron $3$: por la cuarta **salen $2$ A**. Planteo formal: $5 - 2 - 1 - x = 0$. Si te hubiera dado que entran, al nodo estarían llegando $7$ A y saliendo $3$: sobrarían $4$ A acumulándose en un punto, que es lo que la ley prohíbe.

**Problema 2.** Malla con una fuente de $10$ V y tres resistores. Sobre dos caen $2$ V y $3$ V. ¿Cuánto cae sobre el tercero?

*Desarrollo.* Recorriendo en horario: $10 - 2 - 3 - x = 0$, así que $x = 5$ V. **Comprobación:** las tres caídas suman $2 + 3 + 5 = 10$ V, exactamente lo que entrega la fuente. Si las caídas suman más que la fuente, hay un signo mal.

**Problema 3.** Dos pilas en oposición, de $12$ V y $4$ V, con un solo resistor. ¿Cuánto cae sobre el resistor?

*Desarrollo.* En oposición se restan: $12 - 4 = 8$ V. La pila chica trabaja **en contra** de la grande, y lo que queda para el resistor es la diferencia. Si las dos estuvieran en el mismo sentido, se sumarían: $16$ V.

**Problema 4.** Tres resistores iguales en serie con $12$ V. ¿Cuánto cae sobre cada uno? ¿Y si estuvieran en paralelo?

*Desarrollo.* **En serie** la tensión se reparte: $12/3 = 4$ V cada uno, y las tres caídas suman los $12$ V. **En paralelo** los tres verían los $12$ V completos, porque comparten los mismos dos nodos. Es el par cruzado: en serie se reparte la tensión, en paralelo se reparte la corriente.$en$::text,
   null::text, 20)
)
insert into public.resources (module_id, type, title, body, historical_context,
                              order_index, published)
select m.id, r.type, r.title, r.body, r.historical_context, r.order_index, false
  from recursos r
  join public.modules m on m.slug = r.module_slug
 where not exists (
   select 1 from public.resources x
    where x.module_id = m.id and x.title = r.title
 );

-- -----------------------------------------------------------------------------
-- 2. ⭐ `resource_misconceptions` — del error concreto al material concreto
-- -----------------------------------------------------------------------------
-- `rank = 1`: el recurso que ataca ese error **de frente**.
-- `rank = 2`: el otro recurso del mismo módulo, como segunda opción.
--
-- El reparto no es arbitrario: las ideas erróneas **conceptuales** —creer que la
-- capacitancia es la carga, que la fuente siempre suma, que más resistencia da
-- más corriente— las ataca la **guía**, porque lo que falta es la idea. Las
-- **procedimentales** —despejar al revés, olvidar el cuadrado, no convertir
-- antes de sumar— las ataca la **práctica**, porque lo que falta es hacerlo.
with pares (misc_slug, tipo_rank1) as (
  values
    -- notación científica: la guía explica los prefijos y el orden de magnitud;
    -- la práctica es donde se convierte y se opera.
    ($en$prefijos/mili-y-micro-intercambiados$en$::text,        $en$text$en$::text),
    ($en$prefijos/exponente-con-signo-invertido$en$,            $en$text$en$),
    ($en$notacion/mantisa-fuera-de-rango$en$,                   $en$text$en$),
    ($en$prefijos/orden-de-magnitud-sin-sentido-fisico$en$,     $en$text$en$),
    ($en$prefijos/no-convierte-antes-de-operar$en$,             $en$exercise$en$),
    ($en$notacion/multiplica-exponentes-al-multiplicar$en$,     $en$exercise$en$),

    -- ley de Ohm
    ($en$ohm/proporcionalidad-invertida$en$,                    $en$text$en$),
    ($en$ohm/aplica-la-ley-a-la-fuente$en$,                     $en$text$en$),
    ($en$ohm/confunde-tension-con-corriente$en$,                $en$text$en$),
    ($en$ohm/despeje-invertido$en$,                             $en$exercise$en$),
    ($en$ohm/usa-la-formula-sin-despejar$en$,                   $en$exercise$en$),
    ($en$ohm/pierde-la-unidad-en-el-resultado$en$,              $en$text$en$),

    -- potencia
    ($en$potencia/confunde-potencia-con-energia$en$,            $en$text$en$),
    ($en$potencia/proporcionalidad-lineal-con-la-corriente$en$, $en$text$en$),
    ($en$potencia/ignora-la-potencia-nominal-del-resistor$en$,  $en$exercise$en$),
    ($en$potencia/olvida-el-cuadrado$en$,                       $en$exercise$en$),
    ($en$potencia/eleva-la-magnitud-equivocada$en$,             $en$text$en$),

    -- capacitores
    ($en$capacitancia/confunde-carga-con-capacitancia$en$,      $en$text$en$),
    ($en$capacitancia/cree-que-c-depende-de-la-tension-aplicada$en$, $en$text$en$),
    ($en$capacitancia/confunde-carga-con-corriente$en$,         $en$text$en$),
    ($en$capacitores/ignora-la-tension-de-trabajo$en$,          $en$text$en$),
    ($en$capacitores/serie-y-paralelo-como-resistores$en$,      $en$exercise$en$),
    ($en$capacitores/mas-capacitancia-en-serie$en$,             $en$exercise$en$),
    ($en$capacitancia/despeja-mal-c-igual-q-sobre-v$en$,        $en$exercise$en$),

    -- Kirchhoff
    ($en$kirchhoff/corriente-se-reparte-en-serie$en$,           $en$text$en$),
    ($en$kirchhoff/tension-se-reparte-en-paralelo$en$,          $en$text$en$),
    ($en$kirchhoff/confunde-nodo-con-malla$en$,                 $en$text$en$),
    ($en$kirchhoff/fuente-siempre-positiva$en$,                 $en$text$en$),
    ($en$kirchhoff/signo-al-recorrer-la-malla$en$,              $en$exercise$en$),
    ($en$kirchhoff/nodo-sin-conservacion$en$,                   $en$exercise$en$)
)
insert into public.resource_misconceptions (resource_id, misconception_id, rank)
select r.id,
       mi.id,
       case when r.type = p.tipo_rank1 then 1 else 2 end
  from pares p
  join public.misconceptions mi on mi.slug = p.misc_slug
  join public.modules m         on m.id = mi.module_id
  join public.resources r       on r.module_id = m.id
 where m.track = 'electronica'
   and not exists (
     select 1 from public.resource_misconceptions x
      where x.resource_id = r.id and x.misconception_id = mi.id
   );

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano después de aplicar; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- -- (a) Diez recursos, dos por módulo, todos despublicados.
-- select m.slug, r.type, r.title, r.published
--   from public.resources r join public.modules m on m.id = r.module_id
--  where m.track = 'electronica' order by m.order_index, r.order_index;
--   → esperado: 10 filas · 5 'text' + 5 'exercise' · published = false en todas
--
-- -- (b) ⭐ Ninguna idea errónea del track queda sin material (P4.3 de la skill).
-- select count(*) as ideas,
--        count(*) filter (where rm.n is null or rm.n = 0) as sin_recurso
--   from public.misconceptions mi
--   join public.modules m on m.id = mi.module_id
--   left join lateral (
--     select count(*) as n from public.resource_misconceptions x
--      where x.misconception_id = mi.id
--   ) rm on true
--  where m.track = 'electronica';
--   → esperado: 30 | 0
--
-- -- (c) Cada idea errónea tiene exactamente un rank 1 y un rank 2.
-- select rank, count(*) from public.resource_misconceptions rm
--   join public.misconceptions mi on mi.id = rm.misconception_id
--   join public.modules m on m.id = mi.module_id
--  where m.track = 'electronica' group by 1 order by 1;
--   → esperado: 1 → 30 · 2 → 30  (60 filas en total)
--
-- -- (d) De un error concreto al material concreto — lo que T-54 va a leer.
-- select mi.slug as idea_erronea, r.type, r.title, rm.rank
--   from public.resource_misconceptions rm
--   join public.misconceptions mi on mi.id = rm.misconception_id
--   join public.resources r       on r.id = rm.resource_id
--  where mi.slug = 'capacitores/serie-y-paralelo-como-resistores'
--  order by rm.rank;
--
-- -- (e) ⚠️ Mientras estén despublicados, el estudiante no ve ninguno.
-- select count(*) from public.resources r
--   join public.modules m on m.id = r.module_id
--  where m.track = 'electronica' and r.published;
--   → esperado: 0 hasta que se auditen rehaciendo las cuentas (ADR-016)
--
-- -----------------------------------------------------------------------------
-- Publicarlos, después de auditarlos
-- -----------------------------------------------------------------------------
-- update public.resources set published = true
--  where module_id in (select id from public.modules where track = 'electronica');
--
-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
-- -- El `on delete cascade` de resource_misconceptions borra sus filas solo.
-- delete from public.resources
--  where module_id in (select id from public.modules where track = 'electronica');
