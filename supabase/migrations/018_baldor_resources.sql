-- Recursos originales (capa 1) para los 6 módulos del track `aritmetica`, con la numeración
-- de la Aritmética de Baldor como índice de referencia -- NO como transcripción.
--
-- Por qué "originales y no transcritos": el Álgebra/Aritmética de Baldor sigue con derechos de
-- autor vigentes (Aurelio Baldor, f. 1978; la propia obra declara "queda prohibida la
-- reproducción total o parcial... sin autorización previa y escrita del editor"). Lo que no está
-- protegido es la numeración/estructura de apartados (un hecho, no una expresión creativa); cada
-- `body` de este archivo es redacción nueva, calibrada a PAES M1, usando esa numeración solo como
-- referencia bibliográfica en el título (mismo criterio que un "ver Baldor §N" en clase).
--
-- Ajuste de alcance en `aritmetica/enteros`: la Aritmética de Baldor (a diferencia del Álgebra)
-- solo cubre números enteros NO fraccionarios (positivos) -- "entero" en el sentido clásico de
-- "no quebrado", no de "con signo". El blurb sembrado en `002`/`004` prometía "deudas,
-- temperaturas y direcciones opuestas" (enteros con signo), que este volumen no respalda. Se
-- corrige aquí para no prometer contenido que no existe todavía; los negativos quedan pendientes
-- de un volumen de Álgebra o de redacción aparte (ver project-memory/BACKLOG).
--
-- Idempotente: los UPDATE son por slug, los INSERT usan `where not exists` por título.
-- Todo se siembra con `published = false` -- el profesor revisa y publica desde Admin → Recursos
-- (BL-01: la autoría de contenido es trabajo humano, no de código).

-- Corregir alcance de aritmetica/enteros
update public.modules
set historical_blurb =
  'En este bloque se trabajan las cuatro operaciones y los problemas clásicos con números '
  || 'enteros no fraccionarios (positivos): la aritmética elemental previa a los enteros con '
  || 'signo del álgebra. La divisibilidad y los números primos, herencia de Euclides, son la '
  || 'base para simplificar fracciones más adelante.'
where slug = 'aritmetica/enteros';

-- ============================================================
-- aritmetica/numeros
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética §52-56 -- Sistema decimal: valor posicional',
  E'Nuestro sistema es **decimal** (base 10) y **posicional**: el valor de una cifra depende del '
  || E'lugar que ocupa, no solo del dígito. En $2453$, el $4$ vale $4 \\times 100 = 400$ porque está '
  || E'en la posición de las centenas; el mismo $4$ en $245{,}3$ valdría $4 \\times 10$.\n\n'
  || E'**Regla práctica:** cada posición vale diez veces la que está a su derecha (unidades, '
  || E'decenas, centenas, unidades de mil...). Por eso "correr" un dígito una posición a la '
  || E'izquierda multiplica su valor por 10.\n\n'
  || E'**Ejemplo:** ¿cuánto vale la cifra 7 en el número $3.702$? Está en la posición de las '
  || E'centenas, así que vale $7 \\times 100 = 700$.',
  null,
  'El sistema posicional que usamos llegó a Europa vía los matemáticos árabes (de ahí "numerales arábigos"), pero su origen es indio, con el cero como pieza clave -- sin él, un sistema posicional puro no funciona.',
  4, false
from public.modules m
where m.slug = 'aritmetica/numeros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética §52-56 -- Sistema decimal: valor posicional');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética -- Lectura y escritura de números grandes',
  E'Para leer un número grande sin errores, se agrupa en bloques de tres cifras desde la derecha: '
  || E'unidades, miles, millones. $4.250.318$ se lee "cuatro millones doscientos cincuenta mil '
  || E'trescientos dieciocho".\n\n'
  || E'**Error típico:** confundir el orden al escribir un número dictado (por ejemplo, escribir '
  || E'"un millón doce mil" como $1.12.000$ en vez de $1.012.000$ -- cada bloque debe '
  || E'completar tres cifras, rellenando con ceros si hace falta).\n\n'
  || E'**Ejemplo:** escribe en cifras "dos millones cinco mil seis". Respuesta: $2.005.006$ '
  || E'(el bloque de los miles queda "005" porque no hay centenas de mil).',
  null,
  'Antes del siglo XIII, Europa hacía cuentas con números romanos, sin verdadero valor posicional. El matemático italiano Fibonacci introdujo los numerales indoarábigos al continente en su Liber Abaci (1202), aprendidos de comerciantes árabes en el norte de África -- la adopción fue lenta: Florencia llegó a prohibir estos numerales en documentos oficiales en 1299.',
  5, false
from public.modules m
where m.slug = 'aritmetica/numeros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética -- Lectura y escritura de números grandes');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética Cap. IV -- Numeración romana',
  E'El sistema romano no es posicional: usa símbolos ($I, V, X, L, C, D, M$) que se suman o se '
  || E'restan según su posición relativa. Si un símbolo menor va **antes** de uno mayor, se resta '
  || E'($IV = 5 - 1 = 4$); si va **después**, se suma ($VI = 5 + 1 = 6$).\n\n'
  || E'**Regla de la resta:** solo se resta un símbolo a la vez, y solo potencias de 10 ($I, X, C$) '
  || E'pueden restar al símbolo inmediatamente mayor o al siguiente ($IV, IX$, pero nunca $IL$ '
  || E'para 49 -- eso se escribe $XLIX$).\n\n'
  || E'**Ejemplo:** ¿qué número representa $MCMXCIV$? $M=1000$, $CM=900$, $XC=90$, $IV=4$ → '
  || E'$1000+900+90+4 = 1994$.',
  null,
  'La numeración romana sirvió al Imperio para contar y contabilizar durante siglos, pero es pésima para calcular -- no existe un algoritmo cómodo para multiplicar en números romanos, lo que hizo indispensable la adopción del sistema decimal posicional en el comercio medieval.',
  6, false
from public.modules m
where m.slug = 'aritmetica/numeros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética Cap. IV -- Numeración romana');

-- ============================================================
-- aritmetica/enteros (alcance ajustado: positivos, no fraccionarios)
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética Cap. VI-XIII -- Las cuatro operaciones fundamentales',
  E'Suma y multiplicación son **conmutativas** ($a+b=b+a$, $a \\times b = b \\times a$); resta y '
  || E'división no lo son. $9-5=4$, pero $5-9$ no tiene resultado aquí (no hay negativos todavía '
  || E'en estos enteros) -- justamente porque la resta no es conmutativa, cambiar el orden importa.\n\n'
  || E'**Error típico:** aplicar la propiedad conmutativa a la resta o a la división, o '
  || E'resolver una combinación de operaciones sin respetar la jerarquía (primero '
  || E'multiplicación/división, luego suma/resta, salvo paréntesis).\n\n'
  || E'**Ejemplo:** $20 - 3 \\times 4 = 20 - 12 = 8$, **no** $17 \\times 4 = 68$. La multiplicación '
  || E'se resuelve antes que la resta.',
  null,
  'Los símbolos que usamos son mucho más recientes que las operaciones mismas: + y - aparecen impresos por primera vez en 1489 (Johannes Widmann), el x lo populariza William Oughtred en 1631, el signo de dividir lo introduce Johann Rahn en 1659, y el signo = lo inventa el galés Robert Recorde en 1557 porque, según sus propias palabras, no hay dos cosas mas iguales que dos lineas paralelas.',
  4, false
from public.modules m
where m.slug = 'aritmetica/enteros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética Cap. VI-XIII -- Las cuatro operaciones fundamentales');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética Cap. XVI-XIX -- Múltiplos, divisores y criterios de divisibilidad',
  E'Un número **a** es divisor de **b** si la división es exacta (resto 0). Los criterios de '
  || E'divisibilidad permiten saberlo sin dividir:\n\n'
  || E'- **Por 2:** termina en cifra par.\n'
  || E'- **Por 3:** la suma de sus cifras es múltiplo de 3.\n'
  || E'- **Por 5:** termina en 0 o 5.\n'
  || E'- **Por 9:** la suma de sus cifras es múltiplo de 9.\n\n'
  || E'**Ejemplo:** ¿es $4.572$ divisible por 3? Suma de cifras: $4+5+7+2=18$, y $18$ es '
  || E'múltiplo de 3 → sí es divisible por 3. Estos criterios son clave más adelante para '
  || E'simplificar fracciones sin tanteo.',
  null,
  'El método para hallar el máximo común divisor que usamos hoy aparece ya en el Libro VII de los Elementos de Euclides (circa 300 a.C.) -- por eso se llama algoritmo de Euclides -- aunque hay evidencia de que la técnica ya se conocía antes de que él la sistematizara.',
  5, false
from public.modules m
where m.slug = 'aritmetica/enteros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética Cap. XVI-XIX -- Múltiplos, divisores y criterios de divisibilidad');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética Cap. XX -- Números primos y descomposición en factores primos',
  E'Un número **primo** solo es divisible por 1 y por sí mismo ($2, 3, 5, 7, 11, 13...$). '
  || E'Descomponer un número en factores primos significa escribirlo como un producto de primos.\n\n'
  || E'**Método de las barras:** se divide el número por el primo más pequeño posible, y se repite '
  || E'con el cociente hasta llegar a 1.\n\n'
  || E'**Ejemplo:** $60 = 2 \\times 30 = 2 \\times 2 \\times 15 = 2 \\times 2 \\times 3 \\times 5$, es '
  || E'decir $60 = 2^2 \\times 3 \\times 5$. Esta descomposición es la base para calcular MCD y MCM, '
  || E'que a su vez se usan para simplificar y sumar fracciones.',
  null,
  'La criba de Eratóstenes (siglo III a.C.) fue el primer método sistemático conocido para encontrar números primos, y sigue siendo la forma más intuitiva de entenderlos hoy.',
  6, false
from public.modules m
where m.slug = 'aritmetica/enteros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética Cap. XX -- Números primos y descomposición en factores primos');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética §196 -- Problemas tipo con números enteros',
  E'Resolver un problema de enunciado tiene tres pasos: identificar la(s) **incógnita(s)**, '
  || E'traducir el enunciado a operaciones, y **comprobar** que el resultado cumple lo que dice '
  || E'el problema.\n\n'
  || E'**Ejemplo clásico:** la suma de dos números es 124 y su diferencia es 22. ¿Cuáles son?\n'
  || E'Sumando ambas condiciones: $(a+b) + (a-b) = 2a$, entonces $124+22=146=2a$, así '
  || E'$a=73$. Como $a+b=124$, $b=124-73=51$.\n\n'
  || E'**Comprobación:** $73+51=124$ ✓ y $73-51=22$ ✓.',
  null,
  'Problemas del tipo la suma de dos numeros es X y su diferencia es Y aparecen ya en tablillas babilonicas de hace casi 4.000 anos -- los escribas de Mesopotamia entrenaban a sus alumnos con exactamente este tipo de acertijos numericos mucho antes de que existiera el algebra simbolica.',
  7, false
from public.modules m
where m.slug = 'aritmetica/enteros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética §196 -- Problemas tipo con números enteros');

-- ============================================================
-- aritmetica/fracciones
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética §336 -- Qué es una fracción',
  E'Una fracción $\\frac{a}{b}$ representa **a** partes de un total dividido en **b** partes '
  || E'iguales. El de arriba (**numerador**) cuenta las partes tomadas; el de abajo '
  || E'(**denominador**) indica en cuántas partes se dividió el total.\n\n'
  || E'**Idea clave:** el denominador no puede ser 0 (dividir en "cero partes" no tiene sentido). '
  || E'Si numerador y denominador son iguales, la fracción vale 1 ($\\frac{5}{5}=1$).\n\n'
  || E'**Ejemplo:** si un examen tiene 40 preguntas y respondiste 28 correctamente, tu '
  || E'resultado es $\\frac{28}{40}$, que simplificado es $\\frac{7}{10}$.',
  null,
  'Los egipcios (papiro de Rhind, circa 1650 a.C.) casi solo usaban fracciones con numerador 1 (1/2, 1/3, 1/4...), combinandolas para expresar cualquier otra; los babilonios, en cambio, usaban un sistema de fracciones en base 60 -- dos soluciones distintas para el mismo problema, miles de anos antes de la notacion a/b que usamos hoy.',
  4, false
from public.modules m
where m.slug = 'aritmetica/fracciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética §336 -- Qué es una fracción');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética -- Simplificación y común denominador',
  E'**Simplificar** una fracción es dividir numerador y denominador por su máximo común divisor '
  || E'(MCD). $\\frac{18}{24}$: el MCD de 18 y 24 es 6, entonces $\\frac{18}{24}=\\frac{3}{4}$.\n\n'
  || E'Para **sumar o restar** fracciones con distinto denominador, primero hay que igualarlos '
  || E'(común denominador), usando el mínimo común múltiplo (MCM) de los denominadores.\n\n'
  || E'**Ejemplo:** $\\frac{1}{4} + \\frac{1}{6}$. El MCM de 4 y 6 es 12: '
  || E'$\\frac{3}{12}+\\frac{2}{12}=\\frac{5}{12}$. El error más común es sumar numeradores y '
  || E'denominadores directamente (**mal**: $\\frac{2}{10}$).',
  null,
  'Simplificar una fracción a su mínima expresión usa el mismo algoritmo de Euclides (circa 300 a.C.) que sirve para hallar el MCD de números enteros -- la misma herramienta antigua, aplicada aquí a fracciones en vez de a divisibilidad.',
  5, false
from public.modules m
where m.slug = 'aritmetica/fracciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética -- Simplificación y común denominador');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética -- Multiplicación y división de fracciones',
  E'**Multiplicar** fracciones es directo: numerador por numerador, denominador por denominador. '
  || E'$\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$.\n\n'
  || E'**Dividir** fracciones es multiplicar por el recíproco (invertir la segunda fracción): '
  || E'$\\frac{2}{3} \\div \\frac{4}{5} = \\frac{2}{3} \\times \\frac{5}{4} = \\frac{10}{12} = '
  || E'\\frac{5}{6}$.\n\n'
  || E'**Error típico:** aplicar la regla del común denominador (que es de suma/resta) a '
  || E'la multiplicación o división, donde no hace falta.',
  null,
  'Al-Juarismi, el mismo matemático que le dio su nombre al álgebra, escribió también hacia el 825 d.C. un tratado sobre cálculo con numerales indios que incluía las reglas para operar con fracciones -- casi cuatro siglos antes de que ese texto llegara traducido a Europa.',
  6, false
from public.modules m
where m.slug = 'aritmetica/fracciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética -- Multiplicación y división de fracciones');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética Cap. XXIX -- Fracciones decimales y conversión',
  E'Toda fracción común puede convertirse a decimal dividiendo numerador entre denominador: '
  || E'$\\frac{3}{4} = 0{,}75$. Si la división no termina, el decimal es **periódico** '
  || E'($\\frac{1}{3} = 0{,}333...$).\n\n'
  || E'Para convertir un decimal exacto a fracción, se escribe sobre una potencia de 10 según la '
  || E'cantidad de cifras decimales: $0{,}75 = \\frac{75}{100} = \\frac{3}{4}$.\n\n'
  || E'**Ejemplo:** ¿qué fracción es $0{,}125$? $\\frac{125}{1000}$, que simplificado es '
  || E'$\\frac{1}{8}$.',
  null,
  'Aunque fracciones decimales aisladas aparecen antes en la matemática islámica (al-Uqlidisi, siglo X), fue el flamenco Simon Stevin quien las popularizó en Europa con su folleto De Thiende (1585), demostrando que operar con decimales era tan fácil como con enteros -- el origen directo de la notación que usamos hoy.',
  7, false
from public.modules m
where m.slug = 'aritmetica/fracciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética Cap. XXIX -- Fracciones decimales y conversión');

-- ============================================================
-- aritmetica/potencias
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética §447 -- Potenciación: definición y leyes',
  E'$a^n$ significa multiplicar $a$ por sí mismo $n$ veces. La potenciación **no es conmutativa**: '
  || E'$2^3=8$ pero $3^2=9$.\n\n'
  || E'**Leyes clave:**\n'
  || E'- Producto de potencias de igual base: $a^m \\times a^n = a^{m+n}$.\n'
  || E'- Potencia de una potencia: $(a^m)^n = a^{m \\times n}$.\n'
  || E'- Todo número (salvo 0) elevado a 0 es 1: $a^0=1$.\n\n'
  || E'**Error típico:** confundir $2^3$ con $2 \\times 3$. $2^3 = 2 \\times 2 \\times 2 = 8$, '
  || E'no $6$.',
  null,
  'Descartes (1596-1650) fue quien popularizó la notación moderna $x^2, x^3, x^4$; antes de él, cada potencia se escribía con una palabra o símbolo distinto, lo que hacía el álgebra mucho más difícil de manipular.',
  4, false
from public.modules m
where m.slug = 'aritmetica/potencias'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética §447 -- Potenciación: definición y leyes');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética -- Raíz cuadrada de números enteros',
  E'$\\sqrt{a}$ es el número que multiplicado por sí mismo da $a$. $\\sqrt{49}=7$ porque '
  || E'$7 \\times 7 = 49$.\n\n'
  || E'No todo número tiene raíz cuadrada exacta: $\\sqrt{50}$ no es un entero exacto (está entre '
  || E'$\\sqrt{49}=7$ y $\\sqrt{64}=8$), así que se aproxima o se deja indicada.\n\n'
  || E'**Ejemplo:** ¿entre qué dos enteros está $\\sqrt{85}$? Como $9^2=81$ y $10^2=100$, '
  || E'$\\sqrt{85}$ está entre 9 y 10.',
  null,
  'Una tablilla babilónica de hace unos 3.800 años (YBC 7289, hoy en Yale) muestra una aproximación de la raíz de 2 exacta hasta la sexta cifra decimal -- probablemente la tarea de un estudiante, y la aproximación numérica más precisa que se conserva del mundo antiguo.',
  5, false
from public.modules m
where m.slug = 'aritmetica/potencias'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética -- Raíz cuadrada de números enteros');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética -- Raíz cúbica y aplicaciones',
  E'$\\sqrt[3]{a}$ es el número que multiplicado tres veces por sí mismo da $a$. '
  || E'$\\sqrt[3]{27}=3$ porque $3 \\times 3 \\times 3 = 27$.\n\n'
  || E'A diferencia de la raíz cuadrada, la raíz cúbica de un número negativo sí existe dentro de '
  || E'los reales: $\\sqrt[3]{-8}=-2$.\n\n'
  || E'**Ejemplo:** el volumen de un cubo es $125 \\text{ cm}^3$. ¿Cuánto mide su arista? '
  || E'$\\sqrt[3]{125}=5$ cm.',
  null,
  'Los babilonios ya usaban tablas numéricas para aproximar raíces cúbicas hace unos 3.500 años, con el mismo tipo de método de aproximaciones sucesivas por tanteo que emplearon para la raíz cuadrada.',
  6, false
from public.modules m
where m.slug = 'aritmetica/potencias'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética -- Raíz cúbica y aplicaciones');

-- ============================================================
-- aritmetica/proporciones
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética §633 -- Razones aritméticas y geométricas',
  E'Una **razón** compara dos cantidades. La razón **aritmética** es una resta ($6-4=2$: "6 excede '
  || E'a 4 en 2"); la razón **geométrica** es un cociente ($6:4 = 1{,}5$: "6 es 1,5 veces 4").\n\n'
  || E'Casi siempre "razón" se refiere a la geométrica (cociente), y se escribe $a:b$ o '
  || E'$\\frac{a}{b}$.\n\n'
  || E'**Ejemplo:** en un curso de 30 estudiantes hay 18 mujeres. La razón mujeres:total es '
  || E'$18:30 = 3:5$.',
  null,
  'La teoría rigurosa de las razones y proporciones -- necesaria para comparar cantidades que no son múltiplos exactos una de la otra -- se atribuye al matemático griego Eudoxo de Cnido (s. IV a.C.) y quedó fijada en el Libro V de los Elementos de Euclides (circa 300 a.C.), considerado por muchos historiadores el logro más fino de toda la geometría griega.',
  4, false
from public.modules m
where m.slug = 'aritmetica/proporciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética §633 -- Razones aritméticas y geométricas');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética -- Proporciones y sus propiedades',
  E'Una **proporción** es la igualdad de dos razones: $\\frac{a}{b} = \\frac{c}{d}$. La propiedad '
  || E'fundamental dice que el producto de los medios es igual al producto de los extremos: '
  || E'$a \\times d = b \\times c$.\n\n'
  || E'Esta propiedad permite despejar un valor desconocido en una "regla de tres simple".\n\n'
  || E'**Ejemplo:** si $\\frac{x}{6} = \\frac{10}{15}$, entonces $15x = 60$, así $x=4$.',
  null,
  'La regla de tres que resuelve una proporción con un valor desconocido tiene raíces en India (siglo V en adelante) y llegó a Europa vía el mundo árabe; en el Renacimiento se la llamó literalmente la Regla de Oro porque, como decía un manual de 1702, así como el oro sobrepasa a los demás metales, esta regla sobrepasa a las demás en aritmética.',
  5, false
from public.modules m
where m.slug = 'aritmetica/proporciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética -- Proporciones y sus propiedades');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética Cap. XLIV -- Magnitudes proporcionales',
  E'Dos magnitudes son **directamente proporcionales** cuando al aumentar una, la otra aumenta en '
  || E'la misma proporción (ej. horas trabajadas y pago). Son **inversamente proporcionales** '
  || E'cuando al aumentar una, la otra disminuye en la misma proporción (ej. velocidad y tiempo '
  || E'para recorrer una distancia fija).\n\n'
  || E'**Truco para distinguirlas:** si el producto de los pares de valores se mantiene '
  || E'constante, es inversa; si el cociente se mantiene constante, es directa.\n\n'
  || E'**Ejemplo:** 4 obreros hacen un trabajo en 6 días. ¿Cuánto tardarán 8 obreros? Es inversa: '
  || E'$4 \\times 6 = 8 \\times x \\Rightarrow x=3$ días.',
  null,
  'Distinguir proporcionalidad directa de inversa no es solo un ejercicio escolar: la ley de Boyle (1662), que describe cómo la presión y el volumen de un gas varían en proporción inversa, es uno de los ejemplos históricos más citados de proporcionalidad inversa en toda la ciencia.',
  6, false
from public.modules m
where m.slug = 'aritmetica/proporciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética Cap. XLIV -- Magnitudes proporcionales');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética Cap. XLVIII -- Reparto proporcional directo e inverso',
  E'Repartir una cantidad proporcionalmente significa dividirla en partes que respeten una razón '
  || E'dada, no partes iguales.\n\n'
  || E'**Reparto directo:** se reparten 300 en partes proporcionales a 2, 3 y 5 (total de partes: '
  || E'10). Cada "parte" vale $300/10=30$, así que las porciones son $60, 90$ y $150$.\n\n'
  || E'**Ejemplo:** tres socios invirtieron en proporción 2:3:5 y ganaron \\$1.000.000 en '
  || E'total. El socio con proporción 5 recibe $\\frac{5}{10} \\times 1{.}000{.}000 = 500{.}000$.',
  null,
  'Repartir una ganancia entre socios según lo que cada uno invirtió es un problema clásico de la aritmética comercial medieval -- los mismos manuales italianos de los siglos XIII-XIV que enseñaban la regla de tres a los mercaderes dedicaban capítulos enteros a estas reglas de compañía.',
  7, false
from public.modules m
where m.slug = 'aritmetica/proporciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética Cap. XLVIII -- Reparto proporcional directo e inverso');

-- ============================================================
-- aritmetica/porcentajes
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética §696 -- Qué es el tanto por ciento',
  E'El tanto por ciento (%) es una razón con denominador 100: $15\\% = \\frac{15}{100} = 0{,}15$.\n\n'
  || E'Para calcular el $p\\%$ de un número $N$: $\\frac{p}{100} \\times N$.\n\n'
  || E'**Ejemplo:** el $15\\%$ de 32 es $\\frac{15}{100} \\times 32 = 4{,}8$.\n\n'
  || E'**Error típico:** olvidar dividir por 100 y calcular directamente $15 \\times 32$.',
  null,
  'El símbolo % surgió como una corrupción de la abreviatura "cto." (por "ciento") usada en las operaciones mercantiles italianas del siglo XV; con el tiempo, esa abreviatura se estilizó hasta el signo que usamos hoy.',
  4, false
from public.modules m
where m.slug = 'aritmetica/porcentajes'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética §696 -- Qué es el tanto por ciento');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Baldor Aritmética -- Problemas de tanto por ciento (aumentos, descuentos, interés)',
  E'Un **descuento** del $p\\%$ deja pagar el $(100-p)\\%$ del precio original. Un **aumento** del '
  || E'$p\\%$ hace pagar el $(100+p)\\%$.\n\n'
  || E'**Ejemplo (descuento):** un producto de \\$8.000 tiene un $25\\%$ de descuento. Precio '
  || E'final: $8.000 \\times 0{,}75 = 6.000$.\n\n'
  || E'**Ejemplo (interés simple):** \\$100.000 al $2\\%$ mensual durante 3 meses genera '
  || E'$100.000 \\times 0{,}02 \\times 3 = 6.000$ de interés.\n\n'
  || E'**Error típico:** calcular el descuento y olvidarlo restar del precio original (o restar '
  || E'directamente el porcentaje sin convertirlo a valor monetario primero).',
  null,
  'El cálculo de intereses sobre préstamos es casi tan antiguo como la escritura misma: tablillas sumerias de hace unos 5.000 años ya registran tasas de interés sobre préstamos de grano y plata, y hacia el 2000 a.C. los escribas babilonios entrenaban a sus alumnos calculando cuánto tardaba una deuda en duplicarse a interés compuesto.',
  5, false
from public.modules m
where m.slug = 'aritmetica/porcentajes'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Baldor Aritmética -- Problemas de tanto por ciento (aumentos, descuentos, interés)');
