-- Recursos originales (capa 1) para los 5 módulos del track `algebra`, con la numeración del
-- Álgebra de Baldor como índice de referencia -- mismo criterio que 018_baldor_resources.sql
-- (ver ese archivo para el razonamiento completo de derechos de autor: contenido redactado desde
-- cero, la numeración de Baldor se usa solo como cita bibliográfica en el título).
--
-- Cierre del hueco dejado en 018: la Aritmética de Baldor no cubre números con signo (ver el
-- UPDATE de esa migración). El Álgebra sí trae "Operaciones fundamentales con números relativos"
-- (suma/resta/multiplicación/división con signo) como capítulo introductorio -- se añade aquí
-- como recurso de `aritmetica/enteros` y se corrige el blurb para reflejarlo correctamente.
--
-- Alcance: se cubre lo relevante a PAES M1 (expresiones, ecuaciones de primer y segundo grado,
-- sistemas, factorización, funciones lineales/cuadráticas). Quedan **fuera a propósito**
-- radicales complejos, ecuaciones de grado superior y logaritmos -- contenido real del libro pero
-- fuera del temario de PAES M1; no se crean módulos nuevos para ellos.
--
-- Idempotente (UPDATE por slug, INSERT con `where not exists` por título). `published = false`
-- en todo -- revisión pedagógica del profesor antes de publicar (BL-01).

-- ============================================================
-- Cierre de hueco: números con signo en aritmetica/enteros
-- ============================================================

update public.modules
set historical_blurb =
  'Cubrimos dos bloques: primero las operaciones y problemas con enteros no fraccionarios '
  || '(positivos) de la Aritmética de Baldor, y luego -- ya con el Álgebra -- la suma, resta, '
  || 'multiplicación y división de números con signo (relativos), la base para trabajar con '
  || 'deudas, temperaturas y direcciones opuestas.'
where slug = 'aritmetica/enteros';

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Operaciones fundamentales con números con signo',
  E'Un número **relativo** (con signo) tiene un valor absoluto y un signo. Para sumarlos: si los '
  || E'signos son **iguales**, se suman los valores absolutos y se mantiene el signo; si son '
  || E'**distintos**, se restan los valores absolutos (mayor menos menor) y se usa el signo del '
  || E'de mayor valor absoluto.\n\n'
  || E'**Ejemplos:** $(+4)+(+2)=+6$ (mismo signo, se suma) -- $(+6)+(-2)=+4$ (signos distintos, '
  || E'se resta y queda el signo del mayor) -- $(-6)+(+2)=-4$.\n\n'
  || E'**Multiplicación y división:** signos iguales dan resultado positivo, signos distintos dan '
  || E'resultado negativo -- la famosa regla de los signos: $(-3)\\times(-5)=+15$, '
  || E'$(-20)\\div(+4)=-5$.\n\n'
  || E'**Ejemplo:** la temperatura baja de $-2°C$ a $-9°C$. ¿Cuánto descendió? '
  || E'$(-9)-(-2)=-9+2=-7$, descendió 7 grados.',
  null,
  'El matemático indio Brahmagupta fue el primero en dar reglas sistemáticas para sumar, restar y multiplicar con números negativos, en su Brahmasphutasiddhanta (628 d.C.) -- llamaba a los positivos fortuna y a los negativos deuda, el mismo lenguaje intuitivo que seguimos usando hoy.',
  6, false
from public.modules m
where m.slug = 'aritmetica/enteros'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Operaciones fundamentales con números con signo');

-- ============================================================
-- algebra/expresiones
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Axiomas fundamentales de la aritmética y el álgebra',
  E'Un **axioma** es una verdad que se acepta sin demostración porque es evidente por sí misma -- '
  || E'toda la construcción del álgebra se apoya en un puñado de ellos. Los más usados:\n\n'
  || E'- **Conmutatividad:** $a+b=b+a$ y $a \\times b = b \\times a$ (el orden no altera el '
  || E'resultado en suma y multiplicación -- **no** en resta ni división).\n'
  || E'- **Asociatividad:** $(a+b)+c=a+(b+c)$.\n'
  || E'- **Distributividad:** $a(b+c)=ab+ac$ -- el que más se usa para expandir expresiones.\n'
  || E'- **Elemento identidad:** $a+0=a$ y $a \\times 1=a$.\n\n'
  || E'**Ejemplo:** $3(x+5) = 3x+15$ es la propiedad distributiva aplicada; es el paso que '
  || E'debemos recordar al resolver ecuaciones con paréntesis.',
  null,
  'Partir de un puñado de verdades aceptadas sin demostración -- los axiomas -- para construir todo lo demás por lógica es el método que Euclides fijó en sus Elementos hace más de 2.300 años; los axiomas algebraicos modernos (conmutatividad, asociatividad...) son una versión del siglo XIX de esa misma idea, aplicada a números en vez de a figuras.',
  4, false
from public.modules m
where m.slug = 'algebra/expresiones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Axiomas fundamentales de la aritmética y el álgebra');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Monomios y polinomios: suma y resta',
  E'Un **monomio** es una expresión algebraica de un solo término ($5x^2y$); un **polinomio** '
  || E'tiene dos o más términos. Solo se pueden sumar/restar **términos semejantes** (misma parte '
  || E'literal, incluidos los exponentes).\n\n'
  || E'**Ejemplo:** $5x^2 + 3x - 2x^2 + 7 = (5x^2-2x^2) + 3x + 7 = 3x^2+3x+7$. Los términos $5x^2$ '
  || E'y $-2x^2$ son semejantes; $3x$ no lo es de ninguno de los otros.\n\n'
  || E'**Error típico:** sumar $3x^2$ con $3x$ como si fueran semejantes (dan $3x^3$ o '
  || E'similar) -- el exponente de la variable debe coincidir exactamente.',
  null,
  'Usar letras para representar tanto cantidades conocidas como desconocidas -- en vez de escribir todo con palabras, como hacían griegos y árabes -- fue una innovación del francés François Viète en 1591, considerada el nacimiento del álgebra simbólica tal como la conocemos.',
  5, false
from public.modules m
where m.slug = 'algebra/expresiones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Monomios y polinomios: suma y resta');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Multiplicación y división de expresiones algebraicas',
  E'Para multiplicar potencias de igual base, se **suman** los exponentes: $x^3 \\times x^2 = '
  || E'x^5$. Para dividir, se **restan**: $x^5 \\div x^2 = x^3$.\n\n'
  || E'Al multiplicar un polinomio por un monomio, se aplica la propiedad distributiva a cada '
  || E'término: $2x(3x^2 - 4x + 1) = 6x^3 - 8x^2 + 2x$.\n\n'
  || E'**Ejemplo:** $(3x^2)(4x^3) = 12x^{2+3} = 12x^5$. El error más común es multiplicar los '
  || E'exponentes en vez de sumarlos ($12x^6$, incorrecto).',
  null,
  'A Newton se le atribuye, en una carta de 1676, la extensión de las leyes de los exponentes a valores negativos y fraccionarios -- antes de él, elevar a una potencia solo tenía sentido para exponentes enteros positivos.',
  6, false
from public.modules m
where m.slug = 'algebra/expresiones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Multiplicación y división de expresiones algebraicas');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Productos notables',
  E'Los **productos notables** son multiplicaciones que siguen un patrón fijo y conviene '
  || E'memorizar para no expandir término a término:\n\n'
  || E'- **Cuadrado de un binomio:** $(a+b)^2 = a^2+2ab+b^2$.\n'
  || E'- **Cuadrado de una diferencia:** $(a-b)^2 = a^2-2ab+b^2$.\n'
  || E'- **Suma por diferencia:** $(a+b)(a-b) = a^2-b^2$.\n\n'
  || E'**Error típico:** escribir $(a+b)^2 = a^2+b^2$ olvidando el término central $2ab$ -- '
  || E'es el error más frecuente en preguntas de álgebra.\n\n'
  || E'**Ejemplo:** $(x+3)^2 = x^2+6x+9$, **no** $x^2+9$.',
  null,
  'La identidad (a+b)² = a² + 2ab + b² no nació como álgebra simbólica: Euclides ya la demuestra geométricamente en el Libro II de los Elementos (circa 300 a.C.), recortando y reacomodando cuadrados y rectángulos -- mucho antes de que existiera la notación con letras para escribirla como ecuación.',
  7, false
from public.modules m
where m.slug = 'algebra/expresiones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Productos notables');

-- ============================================================
-- algebra/ecuaciones
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor §108-112 -- Qué es una ecuación: clases, grado y raíces',
  E'Una ecuación es una igualdad que se cumple solo para ciertos valores de la incógnita, '
  || E'llamados **raíces** o **soluciones**. El **grado** de una ecuación es el mayor exponente '
  || E'de la incógnita: $4x-6=3x-1$ es de primer grado (grado 1); $x^2-5x+6=0$ es de segundo '
  || E'grado.\n\n'
  || E'El **axioma fundamental de las ecuaciones**: si se hace la misma operación a ambos lados '
  || E'de una igualdad, la igualdad se mantiene -- es la base de todo despeje.\n\n'
  || E'**Comprobación:** en $5x-6=3x+8$, la raíz es $x=7$ porque $5(7)-6=3(7)+8 \\Rightarrow '
  || E'29=29$.',
  null,
  'La palabra álgebra viene del árabe al-jabr (restauración o completar), tomado del título del tratado de Al-Juarismi (circa 825 d.C.) sobre cómo resolver ecuaciones -- la misma idea de restaurar el equilibrio que hoy llamamos el axioma fundamental de las ecuaciones.',
  4, false
from public.modules m
where m.slug = 'algebra/ecuaciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor §108-112 -- Qué es una ecuación: clases, grado y raíces');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Resolución de ecuaciones de primer grado',
  E'Resolver una ecuación es despejar la incógnita usando el axioma fundamental: lo que se hace '
  || E'a un lado, se hace al otro.\n\n'
  || E'**Pasos típicos:** (1) eliminar paréntesis (distributividad), (2) agrupar términos con '
  || E'incógnita a un lado y números al otro, (3) reducir términos semejantes, (4) dividir por el '
  || E'coeficiente de la incógnita.\n\n'
  || E'**Ejemplo:** resolver $3(x+2)=2x+10$. Paso 1: $3x+6=2x+10$. Paso 2: $3x-2x=10-6$. '
  || E'Paso 3: $x=4$. **Comprobación:** $3(4+2)=18$ y $2(4)+10=18$ ✓.',
  null,
  'El matemático griego Diofanto de Alejandría (s. III d.C.) fue de los primeros en resolver ecuaciones usando abreviaturas en vez de palabras completas -- un estilo a medio camino entre la prosa y el símbolo que los historiadores llaman álgebra sincopada, y que influyó siglos después en el álgebra europea del Renacimiento.',
  5, false
from public.modules m
where m.slug = 'algebra/ecuaciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Resolución de ecuaciones de primer grado');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Problemas de planteo con ecuaciones de primer grado',
  E'El paso más difícil no es resolver la ecuación, es **traducir el enunciado a lenguaje '
  || E'algebraico**. Conviene nombrar la incógnita explícitamente antes de plantear.\n\n'
  || E'**Ejemplo:** "La edad de Ana es el triple de la de Beto, y entre ambas suman 48 años". '
  || E'Sea $x$ la edad de Beto: Ana tiene $3x$. Entonces $x+3x=48 \\Rightarrow 4x=48 \\Rightarrow '
  || E'x=12$. Beto tiene 12 años, Ana tiene 36.\n\n'
  || E'**Truco:** siempre comprobar la solución contra el enunciado original, no solo contra la '
  || E'ecuación planteada -- un error de traducción no se detecta solo revisando el álgebra.',
  null,
  'Antes de que existiera el álgebra simbólica, este tipo de problemas se resolvía por el método de la falsa posición: se probaba con un valor cualquiera, se veía cuánto fallaba, y se corregía proporcionalmente -- una técnica que ya aparece en el papiro egipcio de Rhind (circa 1650 a.C.) y que se siguió enseñando en Europa hasta bien entrado el Renacimiento.',
  6, false
from public.modules m
where m.slug = 'algebra/ecuaciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Problemas de planteo con ecuaciones de primer grado');

-- ============================================================
-- algebra/sistemas
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor §291-293 -- Qué es un sistema de ecuaciones',
  E'Un **sistema de ecuaciones** es la reunión de dos o más ecuaciones con las mismas '
  || E'incógnitas. La **solución** es el conjunto de valores que satisface **todas** las '
  || E'ecuaciones a la vez -- no basta con que satisfaga una sola.\n\n'
  || E'Un sistema es **compatible determinado** si tiene una única solución (el caso más común), '
  || E'**compatible indeterminado** si tiene infinitas, e **incompatible** si no tiene '
  || E'ninguna.\n\n'
  || E'**Ejemplo:** en $x+y=5$ y $x-y=1$, la solución es $x=3, y=2$ -- es el único par que '
  || E'cumple ambas ecuaciones simultáneamente.',
  null,
  'El capítulo octavo de Los Nueve Capítulos sobre el Arte Matemático, un texto chino compilado entre los siglos II a.C. y II d.C., resuelve sistemas de hasta nueve ecuaciones con un método -- el fangcheng -- esencialmente idéntico a lo que hoy llamamos eliminación gaussiana, unos 1.800 años antes de Gauss.',
  4, false
from public.modules m
where m.slug = 'algebra/sistemas'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor §291-293 -- Qué es un sistema de ecuaciones');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Métodos de resolución: sustitución y reducción',
  E'**Sustitución:** se despeja una incógnita en una ecuación y se reemplaza en la otra.\n\n'
  || E'**Reducción (suma/resta):** se multiplican las ecuaciones por números convenientes para que '
  || E'una incógnita tenga coeficientes opuestos, y se suman las ecuaciones para eliminarla.\n\n'
  || E'**Ejemplo (reducción):** $2x+3y=13$ y $4x-y=5$. Multiplicando la segunda por 3: '
  || E'$12x-3y=15$. Sumando con la primera: $14x=28 \\Rightarrow x=2$. Sustituyendo: '
  || E'$4(2)-y=5 \\Rightarrow y=3$.\n\n'
  || E'**Comprobación:** $2(2)+3(3)=13$ ✓.',
  null,
  'El método de reducción que usamos hoy lleva el nombre de Carl Friedrich Gauss, quien lo formalizó en el siglo XIX -- aunque, como se ve en el recurso anterior, los matemáticos chinos ya lo practicaban con total generalidad unos 1.800 años antes que él.',
  5, false
from public.modules m
where m.slug = 'algebra/sistemas'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Métodos de resolución: sustitución y reducción');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Interpretación gráfica de un sistema 2x2',
  E'Cada ecuación lineal con dos incógnitas representa una **recta**. Resolver el sistema '
  || E'gráficamente es encontrar el punto donde esas rectas se cruzan.\n\n'
  || E'- **Rectas que se cruzan en un punto:** sistema compatible determinado (una solución).\n'
  || E'- **Rectas paralelas (no se cruzan):** sistema incompatible (sin solución).\n'
  || E'- **Rectas coincidentes (la misma recta):** sistema compatible indeterminado (infinitas '
  || E'soluciones).\n\n'
  || E'**Ejemplo:** si dos ecuaciones tienen la misma pendiente pero distinto intercepto, el '
  || E'sistema no tiene solución -- se puede saber sin resolver, solo comparando pendientes.',
  null,
  'Poder representar una ecuación como una recta en un plano es posible gracias a Descartes, quien unió el álgebra con la geometría en La Géométrie (1637) -- antes de él, ecuación y figura geométrica pertenecían a mundos separados.',
  6, false
from public.modules m
where m.slug = 'algebra/sistemas'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Interpretación gráfica de un sistema 2x2');

-- ============================================================
-- algebra/polinomios
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor §134 -- Factor común',
  E'Factorizar es el proceso inverso de multiplicar: escribir una suma como un producto. El caso '
  || E'más simple es el **factor común**: se identifica qué se repite en todos los términos y se '
  || E'"saca" como coeficiente de un paréntesis.\n\n'
  || E'**Ejemplo:** $10b-30ab^2$. El factor común es $10b$ (mayor coeficiente común y menor '
  || E'exponente de la letra que se repite). Dividiendo cada término por $10b$: '
  || E'$10b-30ab^2 = 10b(1-3ab)$.\n\n'
  || E'**Comprobación:** siempre se puede verificar expandiendo de vuelta: $10b \\times 1 - 10b '
  || E'\\times 3ab = 10b - 30ab^2$ ✓.',
  null,
  'La palabra factor viene del latín facere (hacer): un factor es literalmente lo que hace o produce un número o expresión al multiplicarse por otro -- el mismo origen que comparten palabras como fábrica o fabricar.',
  4, false
from public.modules m
where m.slug = 'algebra/polinomios'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor §134 -- Factor común');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Factorización de trinomios y diferencia de cuadrados',
  E'La **diferencia de cuadrados** $a^2-b^2$ siempre factoriza como $(a+b)(a-b)$ -- es el '
  || E'producto notable "suma por diferencia" leído al revés.\n\n'
  || E'Un **trinomio cuadrado perfecto** ($a^2+2ab+b^2$) factoriza como $(a+b)^2$.\n\n'
  || E'**Ejemplo:** factorizar $x^2-16$. Como $16=4^2$, es una diferencia de cuadrados: '
  || E'$x^2-16=(x+4)(x-4)$.\n\n'
  || E'**Error típico:** intentar factorizar $x^2+16$ (suma de cuadrados) de la misma forma -- '
  || E'no se puede factorizar así, la diferencia de cuadrados solo aplica a la resta.',
  null,
  'La identidad a² - b² = (a+b)(a-b) también tiene una versión geométrica en el Libro II de los Elementos de Euclides -- otra prueba de que buena parte del álgebra que hoy escribimos con letras, los griegos ya la habían demostrado con áreas y figuras.',
  5, false
from public.modules m
where m.slug = 'algebra/polinomios'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Factorización de trinomios y diferencia de cuadrados');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Máximo común divisor de polinomios',
  E'El MCD de varios polinomios es el polinomio de mayor grado que divide exactamente a todos '
  || E'ellos -- el mismo concepto que el MCD de números, aplicado a expresiones algebraicas.\n\n'
  || E'**Procedimiento simple:** factorizar cada polinomio por completo, y tomar los factores '
  || E'comunes con el menor exponente en que aparecen.\n\n'
  || E'**Ejemplo:** MCD de $12x^2y$ y $18xy^2$. Factorizando: $12x^2y = 2^2\\cdot3\\cdot x^2 y$ y '
  || E'$18xy^2 = 2\\cdot3^2\\cdot x y^2$. El MCD es $2\\cdot3\\cdot x\\cdot y = 6xy$.',
  null,
  'El mismo algoritmo de Euclides (circa 300 a.C.) que sirve para hallar el MCD de dos números enteros se generaliza, casi sin cambios, para hallar el MCD de dos polinomios -- una de las razones por las que se lo considera uno de los algoritmos más duraderos de toda la matemática.',
  6, false
from public.modules m
where m.slug = 'algebra/polinomios'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Máximo común divisor de polinomios');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Fracciones algebraicas: simplificación',
  E'Una fracción algebraica se simplifica igual que una fracción numérica: se factoriza '
  || E'numerador y denominador, y se cancelan los factores comunes.\n\n'
  || E'**Ejemplo:** $\\frac{x^2-9}{x+3}$. El numerador es diferencia de cuadrados: '
  || E'$\\frac{(x+3)(x-3)}{x+3}$. Cancelando $(x+3)$: queda $x-3$ (válido para $x \\ne -3$, donde '
  || E'el denominador original no se anula).\n\n'
  || E'**Error típico:** cancelar términos que se suman/restan en vez de factores que se '
  || E'multiplican -- $\\frac{x+3}{x}$ **no** se simplifica a $1+3$.',
  null,
  'Simplificar una fracción algebraica cancelando factores comunes es exactamente la misma idea que simplificar 18/24 a 3/4 -- una idea con siglos de antigüedad (egipcios y babilonios ya operaban con fracciones) que el álgebra simbólica del Renacimiento simplemente extendió de números a expresiones con letras.',
  7, false
from public.modules m
where m.slug = 'algebra/polinomios'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Fracciones algebraicas: simplificación');

-- ============================================================
-- algebra/funciones
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor §254 -- Qué es una función: constantes y variables',
  E'Una **variable** toma distintos valores; una **constante** tiene un valor fijo. Una función '
  || E'describe cómo una variable **dependiente** cambia en respuesta a una variable '
  || E'**independiente**.\n\n'
  || E'**Ejemplo:** si un metro de tela cuesta \\$2 (constante), el costo total depende de los '
  || E'metros comprados: $costo = 2 \\times metros$. El costo es la variable dependiente; los '
  || E'metros, la independiente.\n\n'
  || E'**Ejemplo:** un taxi cobra \\$500 de bajada de bandera más \\$300 por km. La función '
  || E'es $costo(km) = 500 + 300 \\times km$ -- una función lineal.',
  null,
  'La palabra función la introdujo Leibniz en 1673 para describir cantidades geométricas asociadas a una curva; fue Euler quien, en 1748, la redefinió como la conocemos hoy y quien inventó la notación f(x) que usamos en cada clase de matemática.',
  4, false
from public.modules m
where m.slug = 'algebra/funciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor §254 -- Qué es una función: constantes y variables');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- Representación gráfica de la función lineal',
  E'La función lineal $y=mx+b$ se grafica como una **recta**. $m$ es la **pendiente** (qué tanto '
  || E'sube o baja $y$ por cada unidad que avanza $x$) y $b$ es el **intercepto** (dónde cruza la '
  || E'recta al eje $y$, cuando $x=0$).\n\n'
  || E'Si $m>0$, la recta sube (de izquierda a derecha); si $m<0$, baja; si $m=0$, es horizontal.\n\n'
  || E'**Ejemplo:** en $y=3x-2$, la pendiente es 3 y el intercepto es $-2$. Para $x=0$, '
  || E'$y=-2$; para $x=1$, $y=1$ -- con dos puntos ya se puede trazar la recta completa.',
  null,
  'Casi tres siglos antes que Descartes, el filósofo francés Nicolás de Oresme (circa 1350) ya graficaba cómo variaba una cantidad -- la velocidad de un móvil, por ejemplo -- usando dos ejes perpendiculares, en lo que llamaba la latitud de las formas: un precursor medieval, poco conocido, del plano cartesiano.',
  5, false
from public.modules m
where m.slug = 'algebra/funciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- Representación gráfica de la función lineal');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor §426-428 -- Ecuaciones de segundo grado: fórmula general',
  E'Una ecuación de segundo grado completa tiene la forma $ax^2+bx+c=0$ (con $a \\ne 0$) y tiene '
  || E'**dos raíces**, dadas por la fórmula general:\n\n'
  || E'$$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$$\n\n'
  || E'Esta fórmula se deduce completando el cuadrado, y funciona siempre, sin importar si la '
  || E'ecuación factoriza fácilmente o no.\n\n'
  || E'**Ejemplo:** resolver $x^2-2x-3=0$. Aquí $a=1, b=-2, c=-3$: '
  || E'$x=\\frac{2 \\pm \\sqrt{4+12}}{2}=\\frac{2\\pm4}{2}$, entonces $x_1=3$ y $x_2=-1$.',
  null,
  'Resolver ecuaciones de segundo grado tiene una historia de casi 4.000 años: los babilonios ya completaban el cuadrado geométricamente hacia 1800 a.C., Brahmagupta dio en India (s. VII) una regla equivalente a parte de la fórmula que usamos hoy, y fue Al-Juarismi quien, hacia 825 d.C., sistematizó y demostró geométricamente cada caso -- la fórmula general que memorizamos es la culminación simbólica de ese recorrido de tres civilizaciones.',
  6, false
from public.modules m
where m.slug = 'algebra/funciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor §426-428 -- Ecuaciones de segundo grado: fórmula general');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Álgebra de Baldor -- La parábola: gráfico de la función cuadrática',
  E'La función cuadrática $y=ax^2+bx+c$ se grafica como una **parábola**. Si $a>0$, abre hacia '
  || E'arriba (tiene un mínimo); si $a<0$, abre hacia abajo (tiene un máximo).\n\n'
  || E'Las **raíces** de la ecuación $ax^2+bx+c=0$ son los puntos donde la parábola cruza el eje '
  || E'$x$ -- por eso una parábola puede cruzar el eje en 0, 1 o 2 puntos.\n\n'
  || E'**Ejemplo:** la parábola $y=x^2-2x-3$ cruza el eje $x$ en $x=3$ y $x=-1$ (las mismas '
  || E'raíces calculadas con la fórmula general) -- resolver la ecuación y encontrar dónde la '
  || E'gráfica corta el eje son la misma pregunta vista de dos formas.',
  null,
  'Los nombres parábola, elipse e hipérbola se los debemos al matemático griego Apolonio de Perge (s. III-II a.C.), quien en su tratado Cónicas estudió estas curvas como secciones de un cono mucho antes de que existiera el álgebra necesaria para escribirlas como y=ax²+bx+c.',
  7, false
from public.modules m
where m.slug = 'algebra/funciones'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Álgebra de Baldor -- La parábola: gráfico de la función cuadrática');
