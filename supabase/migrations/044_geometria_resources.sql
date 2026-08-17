-- Recursos originales (capa 1) para los 5 módulos del track `geometria` que no tenían ninguno.
--
-- CONTEXTO (T-56, criterio L-2 de "listo para promocionar", PROJECT_BRIEF §6)
-- --------------------------------------------------------------------------
-- Las migraciones 018/019 cubrieron `aritmetica` y `algebra` usando los volúmenes de Baldor como
-- índice bibliográfico. **Para geometría no hay volumen subido**, así que acá no se cita ninguna
-- fuente: el contenido está redactado desde cero contra el temario de PAES M1, y los títulos no
-- llevan referencia bibliográfica (a diferencia de 018/019).
--
-- Los otros dos módulos del track, `geometria/basica` y `geometria/pitagoras`, ya tenían recursos
-- de 002/004 y no se tocan acá. **Verificar que estén `published = true`** antes de dar L-2 por
-- cumplido: el criterio es ≥1 recurso publicado en los 18 módulos, no en 16.
--
-- ALCANCE: lo que PAES M1 evalúa en geometría -- ángulos y paralelas, triángulos (incluida
-- semejanza), circunferencia, áreas/perímetros y volúmenes. Quedan **fuera a propósito**
-- trigonometría, geometría analítica y transformaciones isométricas: o no son de M1, o pertenecen
-- a módulos que no existen y este archivo no crea módulos nuevos.
--
-- CONTENIDO: **18 recursos** -- 3 en `angulos`, 4 en `triangulos`, 3 en `circulo`, 4 en `areas`,
-- 4 en `volumenes`.
--
-- PIPELINE (ADR-016): `published = false` en todo. La IA redacta; **la publicación es humana y
-- exige rehacer cada cuenta**, no leer el texto. La auditoría numérica de este lote se hizo al
-- generarlo: **72 comprobaciones, 0 fallas** (todos los ejemplos numéricos de los 18 recursos, más
-- las cotas de Arquímedes del contexto histórico). Detalle en sessions/SESSION-029.md. La revisión
-- **pedagógica** y la publicación siguen siendo del profesor: esta auditoría dice que las cuentas
-- están bien, no que el texto enseñe bien.
--
-- Idempotente: INSERT con `where not exists` por (module_id, title). Re-ejecutable sin duplicar.

-- ============================================================
-- geometria/angulos -- Ángulos y paralelismo
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Ángulos: cómo se miden y los pares que siempre aparecen',
  E'Un **ángulo** mide la abertura entre dos rayos que salen de un mismo punto. En PAES casi todo '
  || E'sale de reconocer tres pares:\n\n'
  || E'- **Complementarios:** suman $90°$.\n'
  || E'- **Suplementarios:** suman $180°$.\n'
  || E'- **Opuestos por el vértice:** son **iguales** (se forman al cruzarse dos rectas).\n\n'
  || E'**Ejemplo:** un ángulo mide $35°$. Su complemento es $90°-35°=55°$ y su suplemento es '
  || E'$180°-35°=145°$.\n\n'
  || E'**Error típico:** usar $180°$ cuando el enunciado dice *complementario*. Truco para no '
  || E'confundirlos: **C** de complementario va antes que **S** de suplementario en el abecedario, '
  || E'igual que $90$ va antes que $180$.',
  null,
  'Que la circunferencia tenga 360 grados no viene de la geometría sino de la astronomía babilónica, que contaba en base 60 y dividía el año en 360 días: es una convención heredada hace unos 4.000 años, no una propiedad de las figuras.',
  1, false
from public.modules m
where m.slug = 'geometria/angulos'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Ángulos: cómo se miden y los pares que siempre aparecen');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Dos paralelas cortadas por una transversal',
  E'Cuando una recta (la **transversal**) corta a dos rectas **paralelas**, solo aparecen dos '
  || E'valores de ángulo, y todos los demás son uno de esos dos. La regla práctica:\n\n'
  || E'- **Correspondientes** (misma posición en cada cruce): **iguales**.\n'
  || E'- **Alternos internos** (entre las paralelas, en lados opuestos): **iguales**.\n'
  || E'- **Conjugados internos** (entre las paralelas, del mismo lado): **suplementarios**.\n\n'
  || E'**Ejemplo:** si uno de los ángulos mide $70°$, su correspondiente mide $70°$, su alterno '
  || E'interno mide $70°$, y el conjugado interno mide $180°-70°=110°$. En toda la figura solo '
  || E'existen $70°$ y $110°$.\n\n'
  || E'**Cómo verificarlo siempre:** los dos valores tienen que sumar $180°$. Si te dan tres '
  || E'valores distintos, o las rectas no son paralelas o hay un error.',
  null,
  'El comportamiento de las paralelas fue el quinto postulado de Euclides, y durante veinte siglos se intentó demostrarlo a partir de los otros cuatro. En el siglo XIX se probó que no se puede: negarlo produce geometrías distintas pero igualmente consistentes, las que hoy describen el espacio curvo de la relatividad general.',
  2, false
from public.modules m
where m.slug = 'geometria/angulos'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Dos paralelas cortadas por una transversal');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Ángulos interiores de un polígono',
  E'La suma de los ángulos **interiores** de un polígono de $n$ lados es:\n\n'
  || E'$$S = (n-2) \\times 180°$$\n\n'
  || E'La fórmula no se memoriza a ciegas: un polígono de $n$ lados se parte en $n-2$ triángulos '
  || E'trazando diagonales desde un mismo vértice, y cada triángulo aporta $180°$.\n\n'
  || E'**Ejemplo:** un pentágono ($n=5$) suma $(5-2)\\times 180° = 3 \\times 180° = 540°$. Si '
  || E'además es **regular** (todos sus ángulos iguales), cada ángulo interior mide '
  || E'$540° \\div 5 = 108°$.\n\n'
  || E'**Dato que ahorra tiempo:** la suma de los ángulos **exteriores** de cualquier polígono '
  || E'convexo es siempre $360°$, sin importar cuántos lados tenga. En un pentágono regular cada '
  || E'exterior mide $360° \\div 5 = 72°$, y en efecto $108° + 72° = 180°$.',
  null,
  'Que solo existan cinco poliedros regulares -- los sólidos platónicos -- se demuestra justamente contando ángulos: al intentar armar un vértice con polígonos regulares iguales, la suma debe quedar por debajo de 360 grados, y eso deja apenas cinco combinaciones posibles.',
  3, false
from public.modules m
where m.slug = 'geometria/angulos'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Ángulos interiores de un polígono');

-- ============================================================
-- geometria/triangulos -- Triángulos
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Los ángulos de un triángulo suman 180 grados',
  E'En **cualquier** triángulo, los tres ángulos interiores suman $180°$. De ahí sale casi todo '
  || E'ejercicio de ángulos en triángulos.\n\n'
  || E'**Ejemplo:** si dos ángulos miden $45°$ y $65°$, el tercero mide '
  || E'$180° - 45° - 65° = 70°$.\n\n'
  || E'**Consecuencias que conviene tener memorizadas:**\n\n'
  || E'- En un triángulo **equilátero** los tres ángulos miden $180° \\div 3 = 60°$.\n'
  || E'- En un **rectángulo** (uno de $90°$), los otros dos son complementarios: suman $90°$.\n'
  || E'- En un **isósceles**, los dos ángulos de la base son iguales. Si el ángulo distinto mide '
  || E'$40°$, cada uno de los otros mide $(180°-40°) \\div 2 = 70°$.\n'
  || E'- Un ángulo **exterior** vale la suma de los dos interiores no adyacentes: si los interiores '
  || E'son $45°$ y $65°$, el exterior del tercer vértice mide $110°$, que es $180°-70°$.',
  null,
  'Que los ángulos sumen exactamente 180 grados depende del quinto postulado de Euclides: sobre una esfera un triángulo puede tener tres ángulos rectos y sumar 270. Gauss llegó a medir un triángulo entre tres cumbres alemanas para comprobar si el espacio real era plano.',
  1, false
from public.modules m
where m.slug = 'geometria/triangulos'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Los ángulos de un triángulo suman 180 grados');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Semejanza: misma forma, distinto tamaño',
  E'Dos triángulos son **semejantes** cuando tienen los mismos ángulos. Entonces sus lados '
  || E'correspondientes están todos en la misma proporción, llamada **razón de semejanza** $k$.\n\n'
  || E'**Basta con dos ángulos iguales** para asegurar la semejanza: el tercero queda determinado, '
  || E'porque los tres suman $180°$.\n\n'
  || E'**Ejemplo:** dos triángulos semejantes en razón $3:5$. Si un lado del pequeño mide $12$, su '
  || E'correspondiente en el grande mide $12 \\times \\frac{5}{3} = 20$.\n\n'
  || E'**Lo que casi siempre se pregunta, y casi siempre se falla:** las **áreas** no están en '
  || E'razón $k$, sino en razón $k^2$. Con $k = \\frac{3}{5}$, las áreas están en '
  || E'$\\left(\\frac{3}{5}\\right)^2 = \\frac{9}{25}$. Si el pequeño tiene área $18$, el grande '
  || E'tiene $18 \\times \\frac{25}{9} = 50$.\n\n'
  || E'**Y en volúmenes es $k^3$:** duplicar todas las medidas de un cuerpo multiplica su volumen '
  || E'por $8$, no por $2$.',
  null,
  'Tales de Mileto midió la altura de la pirámide de Keops sin subirse a ella: comparó su sombra con la de un bastón clavado en el suelo, usando que ambos triángulos son semejantes porque los rayos del sol llegan paralelos.',
  2, false
from public.modules m
where m.slug = 'geometria/triangulos'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Semejanza: misma forma, distinto tamaño');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Área del triángulo y cuál es la altura correcta',
  E'$$A = \\frac{b \\times h}{2}$$\n\n'
  || E'La trampa está en $h$: la **altura** es el segmento **perpendicular** desde el vértice '
  || E'opuesto hasta la base (o hasta su prolongación). **No es un lado**, salvo en el triángulo '
  || E'rectángulo, donde los dos catetos sí hacen de base y altura entre sí.\n\n'
  || E'**Ejemplo:** base $10$ y altura $6$ dan $A = \\frac{10 \\times 6}{2} = 30$.\n\n'
  || E'**Ejemplo con triángulo rectángulo:** catetos $8$ y $15$. Tomando uno como base y el otro '
  || E'como altura, $A = \\frac{8 \\times 15}{2} = 60$.\n\n'
  || E'**Error típico:** en un triángulo obtusángulo la altura cae **fuera** de la figura, y se '
  || E'usa un lado inclinado como si fuera la altura. El resultado siempre sale de más, porque '
  || E'cualquier lado inclinado es más largo que la perpendicular.',
  null,
  'La fórmula de Herón permite calcular el área de un triángulo conociendo solo sus tres lados, sin medir ninguna altura. Aparece en la Metrica de Herón de Alejandría, en el siglo I, y sigue siendo la herramienta de la topografía cuando no se puede acceder al interior del terreno.',
  3, false
from public.modules m
where m.slug = 'geometria/triangulos'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Área del triángulo y cuál es la altura correcta');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Desigualdad triangular: cuándo tres medidas no forman un triángulo',
  E'Tres longitudes forman un triángulo **solo si** la suma de las dos menores es **mayor** que '
  || E'la mayor. Si son iguales, los tres puntos quedan alineados y no hay triángulo.\n\n'
  || E'**Ejemplo que sí funciona:** $3$, $4$ y $6$. Como $3+4=7 > 6$, el triángulo existe.\n\n'
  || E'**Ejemplo que no:** $3$, $4$ y $8$. Como $3+4=7 < 8$, los lados cortos no alcanzan a '
  || E'cerrarse sobre el largo.\n\n'
  || E'**Caso límite:** $3$, $4$ y $7$. Como $3+4=7$, queda un segmento, no un triángulo.\n\n'
  || E'**Uso frecuente en PAES:** preguntan entre qué valores puede estar el tercer lado. Con '
  || E'lados $5$ y $9$, el tercero $x$ debe cumplir $9-5 < x < 9+5$, es decir '
  || E'$4 < x < 14$: siempre está entre la **diferencia** y la **suma** de los otros dos.',
  null,
  'La desigualdad triangular deja de ser geometría y pasa a ser la definición misma de distancia en matemática moderna: cualquier función que quiera llamarse distancia debe cumplirla, sea entre puntos, entre funciones o entre secuencias de ADN.',
  4, false
from public.modules m
where m.slug = 'geometria/triangulos'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Desigualdad triangular: cuándo tres medidas no forman un triángulo');

-- ============================================================
-- geometria/circulo -- Circunferencia y círculo
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Perímetro y área del círculo: dónde va el radio',
  E'**Circunferencia** es la línea; **círculo** es la región que encierra.\n\n'
  || E'$$P = 2\\pi r \\qquad A = \\pi r^2$$\n\n'
  || E'**Ejemplo:** con radio $r=5$, el perímetro es $2\\pi \\times 5 = 10\\pi \\approx 31{,}4$ y '
  || E'el área es $\\pi \\times 5^2 = 25\\pi \\approx 78{,}5$.\n\n'
  || E'**El error más caro del módulo:** el enunciado da el **diámetro** y se usa como si fuera el '
  || E'radio. Si $d=10$, entonces $r=5$ y el área es $25\\pi$; usando $10$ por error sale '
  || E'$100\\pi$, **cuatro veces** el valor correcto -- porque el radio está elevado al cuadrado.\n\n'
  || E'**Regla de lectura:** subrayar en el enunciado si el número es radio o diámetro **antes** '
  || E'de escribir la fórmula.',
  null,
  'Arquímedes no calculó pi: lo acorraló. Encajó la circunferencia entre polígonos de 96 lados por dentro y por fuera, y demostró que su valor está entre 3+10/71 y 3+1/7, lo que da 3,1408 y 3,1429. Es la primera vez que alguien acota un número irracional con una cota de error explícita.',
  1, false
from public.modules m
where m.slug = 'geometria/circulo'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Perímetro y área del círculo: dónde va el radio');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Ángulo del centro y ángulo inscrito',
  E'Dos ángulos que abren sobre el **mismo arco** están siempre relacionados:\n\n'
  || E'- El **ángulo del centro** tiene su vértice en el centro y mide **lo mismo** que su arco.\n'
  || E'- El **ángulo inscrito** tiene su vértice en la circunferencia y mide **la mitad** del '
  || E'ángulo del centro que abarca el mismo arco.\n\n'
  || E'**Ejemplo:** si el ángulo del centro mide $80°$, cualquier ángulo inscrito sobre ese mismo '
  || E'arco mide $80° \\div 2 = 40°$.\n\n'
  || E'**El caso que más aparece:** si el arco es una **semicircunferencia**, el ángulo del centro '
  || E'mide $180°$ y el inscrito mide $90°$. Es decir: **todo triángulo inscrito que tenga el '
  || E'diámetro como lado es rectángulo**. Reconocer eso convierte muchos ejercicios de '
  || E'circunferencia en ejercicios de Pitágoras.\n\n'
  || E'**Consecuencia útil:** todos los ángulos inscritos que abren sobre el mismo arco son '
  || E'iguales entre sí, sin importar dónde esté el vértice.',
  null,
  'Que todo ángulo inscrito en una semicircunferencia sea recto se conoce como teorema de Tales, y la tradición cuenta que Tales sacrificó un buey al descubrirlo. Es uno de los primeros resultados de la historia que se enuncia como afirmación general demostrable, y no como receta de medición.',
  2, false
from public.modules m
where m.slug = 'geometria/circulo'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Ángulo del centro y ángulo inscrito');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Sector circular y longitud de arco',
  E'Un **sector** es la porción de círculo entre dos radios, como una tajada de pizza. Todo sale '
  || E'de una proporción: el sector es al círculo completo lo que su ángulo $\\alpha$ es a '
  || E'$360°$.\n\n'
  || E'$$A_{sector} = \\frac{\\alpha}{360°} \\times \\pi r^2 \\qquad '
  || E'L_{arco} = \\frac{\\alpha}{360°} \\times 2\\pi r$$\n\n'
  || E'**Ejemplo:** radio $6$ y ángulo $60°$. La fracción es '
  || E'$\\frac{60}{360} = \\frac{1}{6}$.\n\n'
  || E'- Área del sector: $\\frac{1}{6} \\times \\pi \\times 6^2 = \\frac{36\\pi}{6} = 6\\pi '
  || E'\\approx 18{,}8$.\n'
  || E'- Longitud del arco: $\\frac{1}{6} \\times 2\\pi \\times 6 = \\frac{12\\pi}{6} = 2\\pi '
  || E'\\approx 6{,}3$.\n\n'
  || E'**No memorices dos fórmulas:** calcula la fracción $\\frac{\\alpha}{360}$ una sola vez y '
  || E'multiplícala por el área o por el perímetro del círculo completo, según lo que pidan.',
  null,
  'Dividir el círculo en sectores para comparar cantidades -- el gráfico de torta -- lo introdujo William Playfair en 1801, el mismo escocés que inventó los gráficos de barras y de líneas. Antes de él, los datos se publicaban solo en tablas.',
  3, false
from public.modules m
where m.slug = 'geometria/circulo'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Sector circular y longitud de arco');

-- ============================================================
-- geometria/areas -- Áreas y perímetros
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Áreas de los cuadriláteros, todas en una sola idea',
  E'Casi todas salen de "base por altura", con la altura **perpendicular** a la base:\n\n'
  || E'- **Rectángulo y cuadrado:** $A = b \\times h$ (en el cuadrado, $A = l^2$).\n'
  || E'- **Paralelogramo:** $A = b \\times h$. La altura **no** es el lado inclinado.\n'
  || E'- **Trapecio:** $A = \\frac{(B+b)}{2} \\times h$, o sea el promedio de las dos bases por la '
  || E'altura.\n'
  || E'- **Rombo:** $A = \\frac{D \\times d}{2}$, con las dos **diagonales**.\n\n'
  || E'**Ejemplo (trapecio):** bases $10$ y $6$, altura $4$. '
  || E'$A = \\frac{10+6}{2} \\times 4 = 8 \\times 4 = 32$.\n\n'
  || E'**Ejemplo (rombo):** diagonales $12$ y $8$. '
  || E'$A = \\frac{12 \\times 8}{2} = \\frac{96}{2} = 48$.\n\n'
  || E'**Aviso:** el rombo también es un paralelogramo, así que $b \\times h$ funciona igual. Usa '
  || E'la fórmula de las diagonales solo cuando te den las diagonales.',
  null,
  'La palabra geometría significa literalmente medida de la tierra: nació como la técnica de los agrimensores egipcios para volver a trazar los límites de las parcelas después de cada crecida del Nilo, que borraba las marcas todos los años.',
  1, false
from public.modules m
where m.slug = 'geometria/areas'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Áreas de los cuadriláteros, todas en una sola idea');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Figuras compuestas: sumar y restar en vez de buscar una fórmula',
  E'Cuando la figura no tiene nombre, **no existe la fórmula**: hay que descomponerla en figuras '
  || E'que sí lo tengan, y sumar o restar.\n\n'
  || E'**Ejemplo (restar):** una plancha rectangular de $10 \\times 6$ a la que se le recorta un '
  || E'rectángulo de $4 \\times 3$. '
  || E'$A = (10 \\times 6) - (4 \\times 3) = 60 - 12 = 48$.\n\n'
  || E'**Ejemplo (sumar):** una figura en forma de L formada por un rectángulo de $8 \\times 3$ y '
  || E'otro de $2 \\times 5$. $A = 24 + 10 = 34$.\n\n'
  || E'**Cuidado con el perímetro:** al recortar un trozo interior el área baja pero el perímetro '
  || E'**sube**, porque aparecen bordes nuevos. Área y perímetro no se mueven juntos, y ese es el '
  || E'punto de casi toda pregunta capciosa del módulo.\n\n'
  || E'**Chequeo rápido:** el resultado debe ser menor que el rectángulo que envuelve toda la '
  || E'figura. Si te da más, hay un error de signo o de descomposición.',
  null,
  'Descomponer una región en piezas conocidas para medirla es la semilla del cálculo integral: Arquímedes calculó el área bajo una parábola sumando infinitos triángulos cada vez más chicos, casi dos mil años antes de que Newton y Leibniz formalizaran el método.',
  2, false
from public.modules m
where m.slug = 'geometria/areas'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Figuras compuestas: sumar y restar en vez de buscar una fórmula');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Qué le pasa al área cuando cambian las medidas',
  E'Si todas las medidas de una figura se multiplican por $k$:\n\n'
  || E'- el **perímetro** se multiplica por $k$,\n'
  || E'- el **área** se multiplica por $k^2$,\n'
  || E'- el **volumen** se multiplica por $k^3$.\n\n'
  || E'**Ejemplo:** un cuadrado de lado $3$ tiene perímetro $12$ y área $9$. Duplicando el lado a '
  || E'$6$: perímetro $24$ (el doble) y área $36$ (**el cuádruple**, no el doble).\n\n'
  || E'**Por qué importa en PAES:** la pregunta suele venir con porcentajes. Si los lados aumentan '
  || E'un $10\\%$, el factor es $k=1{,}1$ y el área queda multiplicada por '
  || E'$1{,}1^2 = 1{,}21$, es decir **aumenta un $21\\%$**, no un $10\\%$ ni un $20\\%$.\n\n'
  || E'**Y al revés:** si el área se cuadruplica, los lados solo se duplicaron '
  || E'($k=\\sqrt{4}=2$).',
  null,
  'Galileo usó este mismo argumento en 1638 para explicar por qué no puede existir un insecto del tamaño de un elefante: al agrandar un cuerpo, su peso crece como el cubo de la escala pero la resistencia de sus huesos solo como el cuadrado, así que llega un tamaño en que la estructura no se sostiene.',
  3, false
from public.modules m
where m.slug = 'geometria/areas'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Qué le pasa al área cuando cambian las medidas');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Unidades de área: el factor no es 100, es 10.000',
  E'Al convertir **áreas**, el factor de las longitudes va **al cuadrado**. Es el error de unidades '
  || E'más frecuente de todo el temario.\n\n'
  || E'- $1\\,m = 100\\,cm$, pero $1\\,m^2 = 100^2 = 10{.}000\\,cm^2$.\n'
  || E'- $1\\,km = 1000\\,m$, pero $1\\,km^2 = 1000^2 = 1{.}000{.}000\\,m^2$.\n\n'
  || E'**Ejemplo:** $2{,}5\\,m^2$ equivalen a $2{,}5 \\times 10{.}000 = 25{.}000\\,cm^2$.\n\n'
  || E'**Ejemplo al revés:** $45{.}000\\,cm^2$ son '
  || E'$45{.}000 \\div 10{.}000 = 4{,}5\\,m^2$.\n\n'
  || E'**Regla que evita el error:** nunca conviertas el área directamente. Convierte primero las '
  || E'**longitudes** a la unidad que quieres y recién ahí calcula el área -- así el exponente se '
  || E'aplica solo.\n\n'
  || E'**Aviso de enunciado:** si te dan el largo en metros y el ancho en centímetros, hay que '
  || E'igualar unidades **antes** de multiplicar.',
  null,
  'La hectárea, todavía la unidad estándar para medir terrenos en Chile, es un cuadrado de 100 metros de lado: exactamente 10.000 metros cuadrados. Viene del sistema métrico decimal creado durante la Revolución Francesa para reemplazar las medidas locales, que cambiaban de pueblo en pueblo.',
  4, false
from public.modules m
where m.slug = 'geometria/areas'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Unidades de área: el factor no es 100, es 10.000');

-- ============================================================
-- geometria/volumenes -- Volúmenes
-- ============================================================

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Prisma y cilindro: área basal por altura',
  E'Todo cuerpo que tiene la **misma sección en toda su altura** -- prismas y cilindros -- '
  || E'comparte una sola fórmula:\n\n'
  || E'$$V = A_{basal} \\times h$$\n\n'
  || E'Lo único que cambia es cómo se calcula la base.\n\n'
  || E'**Ejemplo (prisma rectangular):** base de $4 \\times 3$ y altura $10$. '
  || E'$V = 12 \\times 10 = 120$.\n\n'
  || E'**Ejemplo (cilindro):** radio $3$ y altura $10$. La base es un círculo de área '
  || E'$\\pi \\times 3^2 = 9\\pi$, así que $V = 9\\pi \\times 10 = 90\\pi \\approx 282{,}7$.\n\n'
  || E'**Error típico:** usar el **diámetro** en lugar del radio. Igual que en el círculo, el '
  || E'resultado sale **cuatro veces** más grande.\n\n'
  || E'**Chequeo de unidades:** si las medidas están en centímetros, el volumen queda en $cm^3$; '
  || E'no se puede mezclar una altura en metros con un radio en centímetros.',
  null,
  'El principio de Cavalieri, del siglo XVII, dice que dos cuerpos con la misma altura y con secciones de igual área a cada nivel tienen el mismo volumen -- por eso una pila de monedas inclinada ocupa lo mismo que una pila recta, y por eso la fórmula sirve también para prismas oblicuos.',
  1, false
from public.modules m
where m.slug = 'geometria/volumenes'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Prisma y cilindro: área basal por altura');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Pirámide y cono: exactamente un tercio',
  E'Un cuerpo que **termina en punta** ocupa un tercio del prisma o cilindro que tiene su misma '
  || E'base y su misma altura:\n\n'
  || E'$$V = \\frac{A_{basal} \\times h}{3}$$\n\n'
  || E'**Ejemplo (pirámide de base cuadrada):** lado $6$ y altura $10$. La base mide '
  || E'$6^2 = 36$, así que $V = \\frac{36 \\times 10}{3} = \\frac{360}{3} = 120$.\n\n'
  || E'**Ejemplo (cono):** radio $3$ y altura $10$. '
  || E'$V = \\frac{9\\pi \\times 10}{3} = 30\\pi \\approx 94{,}2$ -- justo un tercio del cilindro '
  || E'de $90\\pi$ del recurso anterior.\n\n'
  || E'**No confundir altura con generatriz:** en el cono, la **altura** es perpendicular a la '
  || E'base; la **generatriz** es el lado inclinado, y es más larga. La generatriz sirve para el '
  || E'área lateral, **nunca** para el volumen.',
  null,
  'Arquímedes pidió que grabaran en su tumba una esfera inscrita en un cilindro, porque consideraba su mejor resultado haber demostrado que sus volúmenes están en razón 2 a 3. Cicerón encontró esa tumba abandonada casi dos siglos después, reconociéndola justamente por la figura.',
  2, false
from public.modules m
where m.slug = 'geometria/volumenes'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Pirámide y cono: exactamente un tercio');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Esfera: volumen y superficie',
  E'$$V = \\frac{4}{3}\\pi r^3 \\qquad A_{superficie} = 4\\pi r^2$$\n\n'
  || E'**Ejemplo:** con radio $3$, '
  || E'$V = \\frac{4}{3} \\times \\pi \\times 27 = 36\\pi \\approx 113{,}1$ y '
  || E'$A = 4 \\times \\pi \\times 9 = 36\\pi \\approx 113{,}1$.\n\n'
  || E'**Coincidencia solo aparente:** los dos dan $36\\pi$ **únicamente** porque $r=3$; son '
  || E'magnitudes distintas y con unidades distintas ($cm^3$ contra $cm^2$). Con $r=2$ el volumen '
  || E'es $\\frac{32\\pi}{3} \\approx 33{,}5$ y la superficie es $16\\pi \\approx 50{,}3$.\n\n'
  || E'**Lo que más se cobra:** el radio va **al cubo** en el volumen. Duplicar el radio multiplica '
  || E'el volumen por $2^3 = 8$, no por $2$.\n\n'
  || E'**Truco de memoria:** la superficie de la esfera, $4\\pi r^2$, es exactamente cuatro veces '
  || E'el área del círculo de su mismo radio.',
  null,
  'Que la superficie de una esfera sea exactamente cuatro veces el área de su círculo máximo lo demostró Arquímedes sin cálculo diferencial, por el método de exhaución. Es también la razón por la que un mapa plano de la Tierra siempre deforma algo: no existe forma de aplanar una esfera sin estirarla.',
  3, false
from public.modules m
where m.slug = 'geometria/volumenes'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Esfera: volumen y superficie');

insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text',
  'Volumen y capacidad: de centímetros cúbicos a litros',
  E'Volumen y capacidad miden lo mismo con nombres distintos. Las dos equivalencias que hay que '
  || E'saber de memoria:\n\n'
  || E'$$1\\,cm^3 = 1\\,mL \\qquad 1\\,m^3 = 1000\\,L$$\n\n'
  || E'De ahí sale todo lo demás: $1\\,L = 1000\\,mL = 1000\\,cm^3$.\n\n'
  || E'**Ejemplo:** un estanque de $2\\,m \\times 1\\,m \\times 0{,}5\\,m$ tiene '
  || E'$V = 1\\,m^3$, es decir **1000 litros**.\n\n'
  || E'**Ejemplo:** una caja de $20\\,cm \\times 10\\,cm \\times 5\\,cm$ tiene '
  || E'$V = 1000\\,cm^3 = 1\\,L$.\n\n'
  || E'**Y el factor que sorprende:** al convertir volúmenes, el factor de longitud va **al cubo**. '
  || E'$1\\,m^3 = 100^3 = 1{.}000{.}000\\,cm^3$ -- un millón, no cien ni diez mil.\n\n'
  || E'**Comprobación:** $1{.}000{.}000\\,cm^3 = 1{.}000{.}000\\,mL = 1000\\,L$. Las dos '
  || E'equivalencias de arriba son consistentes entre sí.',
  null,
  'Que un litro sea exactamente un decímetro cúbico no es casualidad: el sistema métrico se definió para que las unidades de longitud, volumen y masa encajaran entre sí, y por eso un litro de agua pura pesa aproximadamente un kilogramo.',
  4, false
from public.modules m
where m.slug = 'geometria/volumenes'
and not exists (select 1 from public.resources r where r.module_id = m.id and r.title = 'Volumen y capacidad: de centímetros cúbicos a litros');
