-- EXPERIMENTO · Catálogo de misconceptions de Mecánica Cuántica (77 entradas).
--
-- ⚠ APLICAR DESPUÉS DE 027 (crea `public.misconceptions`) y de 033 (crea los
-- módulos a los que estas entradas apuntan).
--
-- Contexto en adr/ADR-018-track-experimental-cuantica.md y en la cabecera de
-- 033. Recordatorio de lo que es este archivo: el catálogo de errores
-- *nombrables* del curso, no las explicaciones que ve quien responde. La
-- explicación contextual -- la que menciona los números y operadores del ítem
-- concreto -- sigue viviendo en `questions.error_a..d` (035). Acá vive la
-- IDENTIDAD del error, que es lo que permite contar "cuántas veces caí en
-- esto" a través de ítems distintos.
--
-- ── El tamaño del catálogo: la medición honesta ────────────────────────────
-- 027 dejó escrita la heurística: el catálogo debe crecer MUCHO más lento que
-- el banco, y **una misconception que aparece en un solo ítem es sospechosa**.
-- Medido sobre el banco completo (035-038, 123 ítems):
--
--   · 77 misconceptions, 218 de 369 distractores catalogados (59 %).
--   · **32 de las 77 aparecen en un solo ítem.** Razón banco/catálogo: 1,6.
--
-- Esa cifra NO cumple la heurística de 027 y hay que decirlo, no maquillarlo.
-- La causa está identificada y no es que sobren entradas: el banco cubre un
-- curso completo repartido en 15 topics con 6-15 ítems cada uno, mientras que
-- 027 escribió la heurística pensando en un banco PAES concentrado. Una
-- misconception legítimamente específica de un tema (`pozo/nodos-mal-contados`)
-- solo puede repetirse si ese tema tiene más ítems.
--
-- **El arreglo correcto es agregar ítems, no borrar misconceptions.** Fusionar
-- entradas pedagógicamente distintas para mejorar un cociente sería empeorar el
-- contenido para que la métrica quede linda. La consulta de control está al
-- final de este archivo: si al crecer el banco alguna sigue en un solo ítem,
-- **esa** es la sospechosa concreta, y recién ahí conviene revisarla.
--
-- Restricción que sí se respetó al escribir el banco: si un distractor pedía
-- una misconception nueva y única **y** el mismo error ya estaba nombrado con
-- otras palabras, se reusó la existente en vez de duplicarla. Las 77 son
-- distinguibles entre sí por su campo `description`, que es el criterio
-- editorial de cuándo usar cada una.
--
-- La alternativa CORRECTA no lleva misconception: sus cuatro `error_*` existen
-- igual (`score_answer` devuelve la explicación de la alternativa elegida, sea
-- o no la correcta), pero la de la correcta explica por qué está bien.
-- `misconception_X_id` queda `null` ahí a propósito. También queda `null` en
-- los distractores que son un error factual aislado y no un patrón de
-- razonamiento reutilizable (ver 035, punto 3 de su cabecera): son los 151
-- distractores sin catalogar, y son deuda deliberada, no un olvido.
--
-- ── Por qué el prefijo `mq/` ───────────────────────────────────────────────
-- El catálogo es una sola tabla compartida con el contenido PAES, que hoy está
-- vacía (027 se sembró vacía a propósito). El prefijo mantiene los dos
-- dominios separables con un `like 'mq/%'` -- para contarlos, exportarlos o
-- borrarlos -- sin agregar una columna de dominio que el producto no necesita.
--
-- El `slug` respeta el check de 027 (`^[a-z0-9]+([-/][a-z0-9]+)*$`): minúsculas,
-- dígitos, y `-` o `/` como únicos separadores. Sin acentos ni guion bajo.
--
-- Idempotente: upsert por `slug`.

insert into public.misconceptions (slug, name, description, module_id)
select v.slug, v.name, v.description, m.id
from (values
  -- ── Orígenes ────────────────────────────────────────────────────────────
  ('mq/origenes/fotoelectrico-por-intensidad',
   'Cree que la energía de los fotoelectrones depende de la intensidad',
   'Aplica intuición ondulatoria clásica: más luz, electrones más rápidos. Usar cuando el error es asignarle a la intensidad un papel que en realidad tiene la frecuencia. La intensidad sí controla el NÚMERO de electrones; si el estudiante confunde solo eso, la misconception es correcta igual.',
   'cuantica/origenes'),
  ('mq/origenes/bohr-como-teoria-vigente',
   'Trata el modelo de Bohr como la teoría cuántica correcta',
   'Razona con órbitas definidas, radios y trayectorias del electrón. Usar cuando el error nace de atribuirle al electrón una trayectoria, no de un cálculo mal hecho dentro del modelo de Bohr (que como regla mnemotécnica del espectro sigue siendo válida).',
   'cuantica/origenes'),
  ('mq/origenes/cuantizacion-es-discretizar-todo',
   'Cree que en mecánica cuántica todo espectro es discreto',
   'Generaliza la cuantización a observables y situaciones donde el espectro es continuo (partícula libre, posición, estados de dispersión). Usar cuando el error es suponer discreto lo que el confinamiento no hace discreto.',
   'cuantica/origenes'),
  ('mq/origenes/planck-postulo-el-foton',
   'Le atribuye a Planck el cuanto de luz de Einstein',
   'Confunde cuantizar el intercambio de energía de los osciladores materiales (Planck, 1900) con cuantizar el campo de radiación (Einstein, 1905). Usar cuando el error es histórico-conceptual y borra la diferencia entre las dos cuantizaciones.',
   'cuantica/origenes'),
  ('mq/origenes/acumulacion-clasica-de-energia',
   'Cree que el electrón acumula energía de la onda hasta escapar',
   'Es la predicción ondulatoria clásica: con luz débil debería haber un retardo medible antes de la emisión. No se observa. Usar cuando el razonamiento supone acumulación gradual en vez de absorción de un cuanto entero.',
   'cuantica/origenes'),
  ('mq/origenes/umbral-como-propiedad-de-la-luz',
   'Cree que la frecuencia umbral depende de la iluminación y no del material',
   'La función trabajo W es del metal, y el umbral es W/h. Usar cuando propone cambiar el umbral cambiando la fuente de luz.',
   'cuantica/origenes'),
  ('mq/origenes/de-broglie-relacion-invertida',
   'Invierte la relación entre momentum y longitud de onda',
   'Razona como si más momentum diera más longitud de onda. En lambda = h/p la relación es inversa. Usar cuando el error es esa proporcionalidad y no la aplicabilidad de la relación.',
   'cuantica/origenes'),
  ('mq/origenes/cuantica-solo-para-lo-pequeno',
   'Cree que las leyes cuánticas no se aplican a objetos macroscópicos por principio',
   'Traza una frontera de principio donde solo hay una diferencia de escala: la relación de de Broglie vale para una pelota, solo que da un número inobservable. Usar cuando exime a un objeto de la teoría en vez de estimar el orden de magnitud.',
   'cuantica/origenes'),
  ('mq/interferencia/entre-particulas-distintas',
   'Cree que la interferencia se produce entre partículas distintas',
   'Busca la explicación en la interacción entre los miembros del haz, y no en que cada partícula interfiere consigo misma. Usar cuando concluye que bajar la intensidad hasta una partícula por vez destruiría el patrón.',
   'cuantica/origenes'),

  -- ── Formalismo ──────────────────────────────────────────────────────────
  ('mq/formalismo/bra-y-ket-intercambiables',
   'Trata el bra y el ket como el mismo objeto',
   'Omite la conjugación compleja al pasar de ket a bra, o escribe productos internos en el orden equivocado sin conjugar. Usar cuando aparece un coeficiente sin conjugar donde debía ir su conjugado.',
   'cuantica/formalismo'),
  ('mq/formalismo/operador-hermitico-vs-unitario',
   'Confunde operador hermítico con operador unitario',
   'Mezcla las dos condiciones (A = A-daga contra U-daga U = I) y por lo tanto mezcla sus papeles: observables contra evoluciones y cambios de base. Usar también cuando llama observable a un operador que solo preserva la norma.',
   'cuantica/formalismo'),
  ('mq/formalismo/autovalores-complejos-observable',
   'Admite autovalores complejos para un observable',
   'No usa la hermiticidad como criterio de descarte. Usar cuando elige un resultado de medición imaginario o complejo, o cuando afirma que un operador con autovalores complejos puede representar una magnitud física.',
   'cuantica/formalismo'),
  ('mq/formalismo/base-incompleta',
   'Usa una base sin verificar completitud u ortonormalidad',
   'Expande un estado en un conjunto que no es base, o da por sentada la relación de cierre. Usar cuando el error consiste en que las probabilidades no suman 1 y el estudiante no lo detecta.',
   'cuantica/formalismo'),
  ('mq/formalismo/producto-interno-sin-conjugar',
   'Calcula el producto interno sin conjugar el primer factor',
   'Trata el espacio complejo como si fuera real. Distinta de bra-y-ket-intercambiables: acá el error aparece en el cálculo numérico, no en la notación.',
   'cuantica/formalismo'),

  -- ── Postulados y medida ─────────────────────────────────────────────────
  ('mq/medida/probabilidad-sin-modulo-cuadrado',
   'Usa la amplitud en vez de su módulo al cuadrado como probabilidad',
   'Se salta la regla de Born. Usar cuando entrega como probabilidad un coeficiente, su parte real, o un número que puede ser negativo o complejo.',
   'cuantica/postulados'),
  ('mq/medida/valor-esperado-es-un-resultado',
   'Cree que el valor esperado es un resultado posible de una medición',
   'Confunde el promedio del ensemble con el espectro del operador. Usar cuando afirma que se puede obtener el valor esperado en una sola medición, o cuando lo elige como "resultado".',
   'cuantica/postulados'),
  ('mq/medida/colapso-reversible',
   'Trata la medición como una evolución unitaria más',
   'No distingue la evolución de Schrödinger (unitaria, determinista, reversible) de la proyección de la medida. Usar cuando supone que puede deshacer una medición o recuperar la superposición original.',
   'cuantica/postulados'),
  ('mq/medida/segunda-medida-vuelve-a-azar',
   'Cree que repetir de inmediato la misma medida vuelve a dar un resultado al azar',
   'No aplica el postulado de proyección: tras medir, el estado ES el autoestado. Usar cuando reasigna las probabilidades originales a la segunda medición.',
   'cuantica/postulados'),
  ('mq/estados/fase-global-observable',
   'Le atribuye efecto físico a la fase global',
   'No distingue fase global (irrelevante) de fase relativa (observable en interferencia). Usar en ambos sentidos: también cuando descarta una fase relativa por creerla global.',
   'cuantica/postulados'),
  ('mq/estados/superposicion-como-mezcla',
   'Interpreta una superposición como una mezcla estadística',
   'Lee "está en a y en b" como "está en una de las dos y no sabemos cuál". Es el error que borra los términos de interferencia. Usar cuando el cálculo pierde los términos cruzados.',
   'cuantica/postulados'),
  ('mq/estados/normalizacion-omitida',
   'Olvida normalizar el estado antes de calcular probabilidades',
   'Usa coeficientes sin dividir por la norma. Usar cuando el resultado excede 1 o cuando las probabilidades del conjunto no suman 1.',
   'cuantica/postulados'),

  -- ── Conmutadores e incertidumbre ────────────────────────────────────────
  ('mq/conmutadores/asume-conmutatividad',
   'Trata los operadores como números que conmutan',
   'Reordena factores libremente dentro de un producto de operadores. Es el error raíz de casi todo el álgebra de operadores mal hecha. Usar cuando el paso inválido es un intercambio de orden.',
   'cuantica/incertidumbre'),
  ('mq/conmutadores/signo-al-invertir',
   'Pierde el signo al invertir el orden dentro del conmutador',
   'Escribe [A,B] = [B,A] en vez de [A,B] = -[B,A]. Usar cuando el resultado es correcto en magnitud y equivocado en signo por esta causa.',
   'cuantica/incertidumbre'),
  ('mq/conmutadores/regla-del-producto-mal',
   'Aplica mal la regla del producto de conmutadores',
   'Escribe cosas como [AB,C] = [A,C][B,C], o pone los factores en el lado equivocado de cada conmutador. Usar cuando la expansión de un producto es el paso que falla, no el conmutador fundamental.',
   'cuantica/incertidumbre'),
  ('mq/conmutadores/canonico-sin-i',
   'Se equivoca en el conmutador canónico [x,p]',
   'Escribe ħ, iħδ con el signo cambiado, o lo iguala a cero. Usar cuando el error está en el ladrillo fundamental y no en cómo se lo usa.',
   'cuantica/incertidumbre'),
  ('mq/incertidumbre/es-limitacion-del-aparato',
   'Interpreta la relación de incertidumbre como error experimental',
   'Cree que con mejor instrumental se podría violar. Es la lectura del microscopio de Heisenberg de 1927, superada por la deducción de Robertson: la teoría no le asigna valores simultáneos, no es que no los podamos ver.',
   'cuantica/incertidumbre'),
  ('mq/incertidumbre/factor-numerico',
   'Se equivoca en el factor de la cota (ħ, 2ħ, ħ/2)',
   'Recuerda la desigualdad pero no su constante. Usar solo cuando la estructura está bien y falla el número.',
   'cuantica/incertidumbre'),
  ('mq/incertidumbre/compatibles-sin-conmutar',
   'Declara compatibles dos observables que no conmutan',
   'No usa el conmutador como criterio de existencia de base común de autovectores. Usar también en el caso inverso: negar compatibilidad a un par que sí conmuta.',
   'cuantica/incertidumbre'),

  -- ── Schrödinger y evolución ─────────────────────────────────────────────
  ('mq/schrodinger/estacionario-es-inmovil',
   'Cree que un estado estacionario no evoluciona en absoluto',
   'Ignora la fase exp(-iEt/ħ). Usar cuando afirma que el estado no cambia (en vez de que no cambia su DENSIDAD de probabilidad, que es lo cierto).',
   'cuantica/schrodinger'),
  ('mq/schrodinger/superposicion-con-energia-definida',
   'Le asigna energía definida a una superposición de energías distintas',
   'Promedia autovalores y presenta el promedio como "la energía del sistema". Usar cuando confunde el valor esperado de H con un autovalor de H.',
   'cuantica/schrodinger'),
  ('mq/schrodinger/evolucion-de-probabilidades-fijas',
   'Cree que las probabilidades de energía cambian con el tiempo',
   'No advierte que los módulos de los coeficientes en la base de H son constantes de movimiento. Usar cuando hace evolucionar lo que no evoluciona.',
   'cuantica/schrodinger'),
  ('mq/schrodinger/funcion-de-onda-es-la-particula',
   'Trata la función de onda como una densidad de materia',
   'Lee psi como "la partícula está desparramada" en vez de como amplitud de probabilidad. Usar cuando el error nace de esa imagen y no de un cálculo.',
   'cuantica/schrodinger'),

  -- ── Pozos, barreras y túnel ─────────────────────────────────────────────
  ('mq/pozo/energia-cero-permitida',
   'Admite energía cero (o n = 0) en un estado ligado',
   'Contradice la incertidumbre: confinar exige energía cinética mínima. Usar cuando propone n = 0, o energía fundamental nula en pozo u oscilador.',
   'cuantica/pozos'),
  ('mq/pozo/niveles-equiespaciados',
   'Cree que los niveles del pozo infinito están igualmente espaciados',
   'Traslada al pozo el espectro del oscilador. En el pozo infinito E crece como n², así que el espaciado aumenta con n. Usar también en el error inverso sobre el oscilador.',
   'cuantica/pozos'),
  ('mq/pozo/nodos-mal-contados',
   'Cuenta mal los nodos de un estado ligado',
   'Incluye los extremos o desplaza el índice: el n-ésimo estado del pozo infinito tiene n-1 nodos interiores. Usar cuando identifica mal un estado a partir de su dibujo.',
   'cuantica/pozos'),
  ('mq/tunel/particula-pierde-energia',
   'Cree que la partícula pierde energía al atravesar una barrera',
   'Imagina el túnel como perforar un muro. La energía de la partícula transmitida es la misma que la incidente; lo que cae es la PROBABILIDAD de transmisión.',
   'cuantica/pozos'),
  ('mq/tunel/dependencia-no-exponencial',
   'Supone que la transmisión decae linealmente con la barrera',
   'No reconoce el decaimiento exponencial en el ancho y en la raíz de (V-E). Usar cuando estima mal en cuánto cambia T al cambiar la barrera.',
   'cuantica/pozos'),
  ('mq/pozo/continuidad-ignorada',
   'Olvida las condiciones de empalme de psi y su derivada',
   'Resuelve cada región por separado sin pegar las soluciones, que es de donde salen los niveles y los coeficientes. Usar cuando el error es saltarse la condición de frontera.',
   'cuantica/pozos'),

  -- ── Oscilador armónico ──────────────────────────────────────────────────
  ('mq/oscilador/sin-energia-de-punto-cero',
   'Olvida la energía de punto cero',
   'Escribe E = nħω en vez de (n + 1/2)ħω. Emparentada con energia-cero-permitida, pero específica del oscilador y de su fórmula.',
   'cuantica/oscilador'),
  ('mq/oscilador/escalera-hermitica',
   'Trata a y a-daga como observables',
   'Les atribuye autovalores reales medibles, o los supone hermíticos. Ni a ni a-daga lo son: solo N = a-daga a lo es. Usar también para L+ y L- cuando el error es el mismo.',
   'cuantica/oscilador'),
  ('mq/oscilador/factor-raiz-omitido',
   'Olvida los factores raíz de n al aplicar los operadores escalera',
   'Escribe a|n> = |n-1> sin el raíz(n). Usar cuando el estado resultante queda sin normalizar por esta causa.',
   'cuantica/oscilador'),
  ('mq/oscilador/espectro-no-equiespaciado',
   'Cree que los niveles del oscilador no son equiespaciados',
   'Le traslada al oscilador el crecimiento cuadrático del pozo. Es la imagen especular de niveles-equiespaciados.',
   'cuantica/oscilador'),

  -- ── Momento angular ─────────────────────────────────────────────────────
  ('mq/indices/reusa-indice-libre-como-mudo',
   'Reutiliza un índice libre como índice mudo',
   'Al sustituir L_i = eps_ijk R_j P_k dentro de un conmutador que ya tiene j libre, repite la j y produce una expresión sin sentido. Es la primera trampa de todo cálculo con índices.',
   'cuantica/momento_angular'),
  ('mq/levi-civita/antisimetria-ignorada',
   'Ignora que permutar dos índices de epsilon cambia el signo',
   'Trata eps_ikj y eps_ijk como iguales. Usar cuando el resultado sale correcto salvo un signo global por esta causa.',
   'cuantica/momento_angular'),
  ('mq/levi-civita/contraccion-mal-aplicada',
   'Aplica mal la identidad de contracción de dos epsilon',
   'Se equivoca en el orden de las deltas de eps eps = delta delta - delta delta, o contrae por el índice equivocado. Usar cuando el error está en esa identidad y no en la antisimetría.',
   'cuantica/momento_angular'),
  ('mq/delta/no-colapsa-la-suma',
   'No usa la delta de Kronecker para colapsar la suma',
   'Deja la delta escrita en el resultado en vez de fijar los índices que iguala. Usar cuando el resultado final conserva una delta que debía haber desaparecido.',
   'cuantica/momento_angular'),
  ('mq/momento-angular/autovalor-de-l2',
   'Usa un autovalor equivocado para L²',
   'Escribe ħ²l², ħ²m², ħl(l+1) o similares en vez de ħ²l(l+1). Usar cuando el error es la fórmula del autovalor, no el conmutador.',
   'cuantica/momento_angular'),
  ('mq/momento-angular/escalera-cambia-l',
   'Cree que los operadores escalera cambian l',
   'No usa que [L², L±] = 0: L± mueve m y deja l intacto. Es el núcleo de la demostración de degeneración.',
   'cuantica/momento_angular'),
  ('mq/momento-angular/l2-no-conmuta-con-lz',
   'Se equivoca sobre qué conmuta con qué en el álgebra de L',
   'Cree que L² no conmuta con Lz, o -- el error simétrico -- que las tres componentes conmutan entre sí y son simultáneamente medibles.',
   'cuantica/momento_angular'),
  ('mq/momento-angular/degeneracion-2l',
   'Cuenta mal la multiplicidad de un nivel',
   'Escribe 2l o l+1 en vez de 2l+1 (y su análogo 2j+1). Usar cuando el error es el conteo de estados, no el rango de m.',
   'cuantica/momento_angular'),
  ('mq/momento-angular/norma-escalera-omitida',
   'Olvida el factor de normalización al aplicar los operadores escalera',
   'Escribe L+|l,m> = |l,m+1> sin el factor hbar*raiz(l(l+1)-m(m+1)). Es el análogo de mq/oscilador/factor-raiz-omitido para el momento angular, y se distingue porque acá el factor también es el que anula el estado tope.',
   'cuantica/momento_angular'),
  ('mq/momento-angular/semienteros-no-existen',
   'Cree que los momentos angulares semienteros no son físicos',
   'Generaliza al espín la restricción del momento angular ORBITAL, que solo admite l entero por la univaluación de la función de onda en el ángulo azimutal. El álgebra de conmutación por sí sola admite j semientero, y el espín 1/2 lo realiza.',
   'cuantica/momento_angular'),
  ('mq/momento-angular/lz-supera-el-modulo',
   'Permite proyecciones mayores que el módulo del momento angular',
   'Da por posible m > l, o razona como si el vector pudiera alinearse exactamente con z (lo que daría Lz² = L², imposible salvo l = 0).',
   'cuantica/momento_angular'),

  -- ── Armónicos esféricos ─────────────────────────────────────────────────
  ('mq/armonicos/integracion-sin-jacobiano',
   'Integra en la esfera sin el elemento de ángulo sólido',
   'Omite el sen(theta) al integrar, y con eso pierde la ortonormalidad. Usar cuando el error aparece al normalizar o al proyectar sobre un Y_lm.',
   'cuantica/armonicos_esfericos'),
  ('mq/armonicos/paridad-equivocada',
   'Se equivoca en la paridad de los armónicos esféricos',
   'No usa que bajo inversión Y_lm cambia por (-1)^l, con lo que da por no nula una integral que la paridad anula.',
   'cuantica/armonicos_esfericos'),
  ('mq/armonicos/probabilidad-por-coeficiente',
   'Lee la probabilidad angular directamente del coeficiente del desarrollo',
   'Caso particular de probabilidad-sin-modulo-cuadrado aplicado a un desarrollo en armónicos esféricos, donde además suele olvidarse la normalización del estado.',
   'cuantica/armonicos_esfericos'),

  -- ── Espín ───────────────────────────────────────────────────────────────
  ('mq/espin/rotacion-clasica',
   'Interpreta el espín como una rotación literal de la partícula',
   'Le atribuye estructura interna girando. Usar cuando el error nace de esa imagen: por ejemplo suponer que puede tomar cualquier valor continuo, o depender del tamaño de la partícula.',
   'cuantica/espin'),
  ('mq/espin/pauli-conmutan',
   'Trata las matrices de Pauli como si conmutaran',
   'Ignora que cumplen la misma álgebra de momento angular. Usar también cuando se equivoca en sigma² = I o en el anticonmutador.',
   'cuantica/espin'),
  ('mq/espin/rotacion-2pi-identidad',
   'Cree que rotar 2pi devuelve el espinor a su estado inicial',
   'No reconoce el signo menos del spin 1/2 bajo rotación de 2pi (hace falta 4pi). Usar cuando ignora esa fase.',
   'cuantica/espin'),
  ('mq/espin/stern-gerlach-secuencial',
   'Ignora que un aparato de Stern-Gerlach reprepara el estado',
   'Trata las medidas sucesivas en ejes distintos como filtros clásicos acumulativos, y no advierte que medir en x destruye la información en z.',
   'cuantica/espin'),

  -- ── Suma de momentos angulares ──────────────────────────────────────────
  ('mq/suma/j-solo-suma-directa',
   'Cree que el momento angular total solo puede ser la suma de los módulos',
   'Ignora el rango |j1-j2| <= j <= j1+j2. Usar cuando enumera mal los valores posibles de j.',
   'cuantica/suma_momentos'),
  ('mq/suma/cruzados-no-nulos',
   'Cree que operadores de subsistemas distintos no conmutan',
   'No usa que actúan sobre espacios de Hilbert distintos, que es la hipótesis que hace desaparecer los términos cruzados al sumar momentos angulares.',
   'cuantica/suma_momentos'),
  ('mq/suma/dimension-como-suma',
   'Suma dimensiones en vez de multiplicarlas al componer espacios',
   'Confunde suma directa con producto tensorial. Usar cuando el conteo de estados del sistema compuesto es el paso que falla.',
   'cuantica/suma_momentos'),
  ('mq/suma/base-acoplada-y-desacoplada-mezcladas',
   'Mezcla la base acoplada con la desacoplada',
   'Le pide a un estado |j m> valores definidos de m1 y m2, o al revés. Usar cuando atribuye a una base los números cuánticos buenos de la otra.',
   'cuantica/suma_momentos'),

  -- ── Hidrógeno ───────────────────────────────────────────────────────────
  ('mq/hidrogeno/energia-depende-de-l',
   'Cree que la energía del hidrógeno depende de l',
   'No reconoce la degeneración accidental del potencial de Coulomb puro: E depende solo de n. Usar cuando ordena niveles por l.',
   'cuantica/hidrogeno'),
  ('mq/hidrogeno/degeneracion-mal-contada',
   'Cuenta mal la degeneración de un nivel del hidrógeno',
   'Se queda en 2l+1 sin sumar sobre l, u olvida el factor 2 del espín. Usar cuando el error es aritmético-combinatorio y no conceptual.',
   'cuantica/hidrogeno'),
  ('mq/hidrogeno/rango-de-l-y-m',
   'Se equivoca en el rango permitido de los números cuánticos',
   'Propone l = n, o m fuera de [-l, l]. Usar cuando nombra un estado que no existe.',
   'cuantica/hidrogeno'),
  ('mq/central/potencial-centrifugo-omitido',
   'Olvida el término centrífugo en la ecuación radial',
   'Trata el problema radial como unidimensional sin el término l(l+1)ħ²/2mr². Usar cuando concluye que el problema radial no depende de l.',
   'cuantica/hidrogeno'),

  -- ── Perturbaciones ──────────────────────────────────────────────────────
  ('mq/perturbaciones/primer-orden-mal-identificado',
   'Confunde la corrección de energía con la del estado',
   'Usa la suma sobre estados intermedios donde va el simple valor esperado, o al revés. Usar cuando el error es qué fórmula corresponde a qué orden.',
   'cuantica/perturbaciones'),
  ('mq/perturbaciones/degenerada-sin-diagonalizar',
   'Aplica la fórmula no degenerada a un nivel degenerado',
   'Ignora el denominador que se anula y no diagonaliza la perturbación en el subespacio degenerado. Es el error clásico de examen en este tema.',
   'cuantica/perturbaciones'),
  ('mq/variacional/da-cota-inferior',
   'Cree que el método variacional acota la energía por abajo',
   'Invierte la desigualdad: el valor esperado de H en cualquier estado de prueba es siempre mayor o igual que la energía fundamental.',
   'cuantica/perturbaciones'),

  -- ── Partículas idénticas ────────────────────────────────────────────────
  ('mq/identicas/simetria-intercambiada',
   'Intercambia la simetría de bosones y fermiones',
   'Asigna función de onda simétrica a fermiones o antisimétrica a bosones. Usar cuando el error es esa asignación y no el conteo de estados.',
   'cuantica/identicas'),
  ('mq/identicas/pauli-solo-como-regla-de-orbitales',
   'Reduce el principio de exclusión a "no dos electrones en el mismo orbital"',
   'No lo reconoce como consecuencia de la antisimetría total, que incluye el espín. Usar cuando falla en un caso donde la regla escolar no alcanza.',
   'cuantica/identicas'),
  ('mq/identicas/particulas-distinguibles',
   'Etiqueta partículas idénticas como si fueran distinguibles',
   'Cuenta estados o calcula probabilidades tratando el intercambio como un estado nuevo. Usar cuando el conteo se infla por esa causa.',
   'cuantica/identicas'),

  -- ── Interpretación ──────────────────────────────────────────────────────
  ('mq/bell/variables-ocultas-locales-viables',
   'Cree que las variables ocultas locales siguen siendo una opción',
   'No reconoce lo que demuestra el teorema de Bell junto con el experimento: ninguna teoría local de variables ocultas reproduce las correlaciones medidas.',
   'cuantica/interpretacion'),
  ('mq/entrelazamiento/senal-superluminica',
   'Cree que el entrelazamiento permite transmitir información más rápido que la luz',
   'Confunde correlación con señal. Usar cuando propone comunicar eligiendo qué medir: las estadísticas locales del otro lado no cambian.',
   'cuantica/interpretacion'),
  ('mq/entrelazamiento/estado-producto',
   'Trata un estado entrelazado como producto de estados individuales',
   'Le atribuye estado propio a cada subsistema. Usar cuando el error es esa factorización indebida.',
   'cuantica/interpretacion')
) as v(slug, name, description, module_slug)
left join public.modules m on m.slug = v.module_slug
on conflict (slug) do update
  set name = excluded.name,
      description = excluded.description,
      module_id = excluded.module_id;

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select count(*) from public.misconceptions where slug like 'mq/%';
--   -- 77
--
--   -- Ninguna debe quedar sin módulo: si aparece alguna, el slug del módulo
--   -- está mal escrito en el VALUES de arriba y el left join lo dejó pasar.
--   select slug from public.misconceptions
--    where slug like 'mq/%' and module_id is null;
--   -- 0 filas
--
--   -- Distribución por módulo (ninguna concentración absurda):
--   select m.slug, count(*)
--     from public.misconceptions mc join public.modules m on m.id = mc.module_id
--    where mc.slug like 'mq/%' group by m.slug order by 2 desc;
--
--   -- LA CONSULTA QUE IMPORTA (después de aplicar 035): misconceptions usadas
--   -- en un solo distractor de todo el banco. Son las sospechosas de 027.
--   select mc.slug, count(*) as usos
--     from public.misconceptions mc
--     left join public.questions q
--       on mc.id in (q.misconception_a_id, q.misconception_b_id,
--                    q.misconception_c_id, q.misconception_d_id)
--    where mc.slug like 'mq/%'
--    group by mc.slug having count(q.id) <= 1 order by usos;
--
-- Reversión: delete from public.misconceptions where slug like 'mq/%';
-- (los ítems que las referencian vuelven a "sin catalogar" por el
--  `on delete set null` de 027, no se pierde ninguna pregunta)
