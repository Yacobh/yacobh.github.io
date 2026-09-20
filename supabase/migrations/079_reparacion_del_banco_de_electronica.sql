-- Reparación del banco de `electronica`: siete ítems corregidos tras la revisión.
--
-- ⚠ **`072`…`076` ya están aplicadas** y la migración de ítems inserta con
-- `where not exists` por (topic, enunciado): reaplicarla **no actualiza nada**
-- de un ítem que ya existe. Por eso las correcciones van acá, como hizo `058`
-- con el eje de probabilidad.
--
-- ── De dónde salieron ──────────────────────────────────────────────────────
-- De la revisión de los 80 ítems (T-166), que fue de dos clases:
--
-- **A. Redacción, que ahora vigila un auditor nuevo**
-- (`scripts/revisar_redaccion_items.py`, el octavo):
--   · el «Bonus» de la correcta decía «mal» — quien lo lee **acertó**, y el
--     Bonus de ADR-033 no habla de ningún error;
--   · tres alternativas correctas eran **la más larga por un margen grande**,
--     que es un atajo para acertar sin leer (familia de R-35). En los tres
--     casos la causa era la misma: la alternativa llevaba adentro la
--     explicación, que es lo que va en el Bonus.
--
-- **B. ⭐ El número del distractor no era el que produce el error que dice
-- diagnosticar.** Esto **ningún auditor lo ve** —ni el nuevo— y es la razón de
-- que la revisión humana siga siendo el cuello de botella:
--
--   · `electronica_potencia` 60/C decía `0,011 W` para «elevaste y dividiste
--     por R», que da `0,000011`; y 60/D decía `550 W` para «trabajaste con 50
--     amperes», que da `550 000`;
--   · `electronica_ohm` 70/D decía `0,1 ohm` para «dividiste la corriente por
--     la tensión», que da `0,01`; y 70/A explicaba una cuenta que no daba 40;
--   · `electronica_notacion` 160/C decía `2×10⁻²` para «restaste los
--     exponentes», que da `2×10⁻⁶`;
--   · `electronica_potencia` 50/C explicaba la **correcta** en vez del error.
--
-- Un distractor cuyo número no corresponde a su explicación **diagnostica una
-- idea errónea que el estudiante no tuvo**, que es exactamente lo contrario de
-- lo que el banco promete.
--
-- Es **puramente correctiva**: no agrega ni retira ítems, no toca `difficulty`
-- ni `module_id`, y no cambia ningún enunciado (la clave de idempotencia).
-- Idempotente por construcción: es un `update` por (topic, order_index).

-- electronica_notacion · order_index 90
update public.questions set
  option_a = $el$Aceptarlo: la cuenta $9/0,001$ da ese numero$el$,
  option_b = $el$Revisar: una pila no entrega miles de amperes$el$,
  option_c = $el$Aceptarlo, porque el resistor es de solo 1 kilohm$el$,
  option_d = $el$Cambiar la unidad a miliamperes y dejar el numero igual$el$,
  error_a  = $el$La cuenta esta mal armada: $1$ kilohm son $1000$ ohm, no $0,001$. Y aunque diera eso, el resultado avisa solo: ninguna pila entrega esa corriente.$el$,
  error_b  = $el$Correcto. Antes de dar un resultado por bueno conviene preguntarse si puede existir. Una pila de $9$ V con $1$ kilohm da $9$ mA, y entre eso y $9000$ A hay un factor de un millon: es el tamano exacto de aplicar un prefijo al reves. El orden de magnitud avisa antes que la cuenta.$el$,
  error_c  = $el$Un kilohm no es poca resistencia: son mil ohm. Y el orden de magnitud sigue sin cerrar, sea cual sea el resistor.$el$,
  error_d  = $el$Cambiar la unidad no arregla una cuenta equivocada: $9000$ mA tampoco es lo que da ese circuito. Hay que rehacer la division.$el$
 where topic = $el$electronica_notacion$el$ and order_index = 90;

-- electronica_notacion · order_index 160
update public.questions set
  option_a = $el$$2 \times 10^{-12}$$el$,
  option_b = $el$$9 \times 10^{1}$$el$,
  option_c = $el$$2 \times 10^{-6}$$el$,
  option_d = $el$$2 \times 10^{2}$$el$,
  error_a  = $el$Multiplicaste los exponentes. Al multiplicar potencias de la misma base se suman: $-3 + 4 = 1$.$el$,
  error_b  = $el$Sumaste las mantisas. Con los exponentes se suma; con las mantisas se multiplica.$el$,
  error_c  = $el$Restaste los exponentes ($-3 - 4 = -7$) en vez de sumarlos. Restar corresponde a una division, no a una multiplicacion.$el$,
  error_d  = $el$Correcto. Mantisas: $4 \times 5 = 20$. Exponentes: $-3 + 4 = 1$. Queda $20 \times 10^{1}$, que en notacion cientifica se escribe $2 \times 10^{2}$.$el$
 where topic = $el$electronica_notacion$el$ and order_index = 160;

-- electronica_ohm · order_index 70
update public.questions set
  option_a = $el$40 ohm$el$,
  option_b = $el$100 ohm$el$,
  option_c = $el$10 ohm$el$,
  option_d = $el$0,01 ohm$el$,
  error_a  = $el$Multiplicaste la tension por la corriente en miliamperes ($2 \times 20$). Para hallar la resistencia hay que dividir, y ademas la corriente va en amperes.$el$,
  error_b  = $el$Correcto. $R = V/I = 2 / 0,020 = 100$ ohm. Es la cuenta que se hace cada vez que se pone un LED: se divide la tension que sobra por la corriente que se quiere.$el$,
  error_c  = $el$Dividiste 2 por 0,2 en vez de por 0,020. Hay un lugar decimal de diferencia entre miliamperes y decimas de ampere.$el$,
  error_d  = $el$Dividiste la corriente por la tension ($0,020 / 2$). El cociente quedo invertido: la tension va arriba.$el$
 where topic = $el$electronica_ohm$el$ and order_index = 70;

-- electronica_potencia · order_index 50
update public.questions set
  option_a = $el$24 W$el$,
  option_b = $el$6 W$el$,
  option_c = $el$3 W$el$,
  option_d = $el$6 J$el$,
  error_a  = $el$Dividiste la tension por la corriente. Ese cociente da la resistencia de la lampara, que es $24$ ohm.$el$,
  error_b  = $el$Correcto. $P = VI = 12 \times 0,5 = 6$ W. Es la potencia que la lampara toma mientras esta encendida.$el$,
  error_c  = $el$Dividiste dos veces por dos. Multiplicar por $0,5$ es tomar la mitad, y la mitad de $12$ es $6$, no $3$.$el$,
  error_d  = $el$El numero esta bien y la unidad no. El joule mide energia; para saber cuanta energia consume habria que decir durante cuanto tiempo.$el$
 where topic = $el$electronica_potencia$el$ and order_index = 50;

-- electronica_potencia · order_index 60
update public.questions set
  option_a = $el$11 W$el$,
  option_b = $el$0,55 W$el$,
  option_c = $el$0,000011 W$el$,
  option_d = $el$550 000 W$el$,
  error_a  = $el$Multiplicaste la corriente por la resistencia sin elevar al cuadrado. Esa cuenta da la tension: $11$ V.$el$,
  error_b  = $el$Correcto. $P = I^2 R = 0,05^2 \times 220 = 0,0025 \times 220 = 0,55$ W. Conviene retener el orden: medio watt es mucho para un resistor comun de un cuarto de watt.$el$,
  error_c  = $el$Elevaste al cuadrado y despues dividiste por la resistencia en vez de multiplicar: $0,0025 / 220$. La resistencia multiplica cuando se parte de la corriente.$el$,
  error_d  = $el$Trabajaste con 50 amperes en vez de 50 miliamperes: $50^2 \times 220$ da 550 mil watts. Medio megavatio en un resistor de $220$ ohm es imposible, y el orden de magnitud avisa antes que la cuenta.$el$
 where topic = $el$electronica_potencia$el$ and order_index = 60;

-- electronica_potencia · order_index 70
update public.questions set
  option_a = $el$Nada: la potencia nominal es solo una referencia$el$,
  option_b = $el$Nada, porque el resistor tiene el valor de resistencia correcto$el$,
  option_c = $el$Cambiarlo por uno de mayor potencia nominal$el$,
  option_d = $el$Bajar la tension a la mitad para que la potencia baje a la mitad$el$,
  error_a  = $el$La potencia nominal es el limite real de lo que el componente puede disipar sin danarse. Pasarse lo calienta hasta que falla.$el$,
  error_b  = $el$El valor de resistencia y la potencia nominal son dos cosas distintas, y hay que elegir las dos. Este resistor tiene bien una y mal la otra.$el$,
  error_c  = $el$Correcto. Un cuarto de watt son $0,25$ W y el circuito le exige $0,8$ W: mas del triple de lo que aguanta. Hay que poner uno de $1$ W o mas, que es el criterio habitual de elegir con el doble de margen.$el$,
  error_d  = $el$Bajar la tension a la mitad baja la potencia a la cuarta parte, no a la mitad, porque la tension entra al cuadrado. Y ademas cambiaria el funcionamiento del circuito.$el$
 where topic = $el$electronica_potencia$el$ and order_index = 70;

-- electronica_kirchhoff · order_index 50
update public.questions set
  option_a = $el$Que la suma de las tensiones alrededor del nodo es cero$el$,
  option_b = $el$Que la corriente se reparte en partes iguales entre las ramas$el$,
  option_c = $el$Que lo que entra al nodo es igual a lo que sale$el$,
  option_d = $el$Que la suma de las tensiones a lo largo de la malla es cero$el$,
  error_a  = $el$Esa es la idea de la ley de mallas, y ademas un nodo no tiene tensiones que recorrer: es un punto. En un nodo se trabaja con corrientes.$el$,
  error_b  = $el$El reparto en partes iguales pasa solo si las ramas son identicas. Lo que siempre vale es que el total se conserva.$el$,
  error_c  = $el$Correcto. Es la ley de nodos, y es conservacion de la carga: en un punto no se acumula ni desaparece corriente.$el$,
  error_d  = $el$Esa es la ley de mallas, que se usa recorriendo un camino cerrado. Para un nodo corresponde la de corrientes.$el$
 where topic = $el$electronica_kirchhoff$el$ and order_index = 50;

-- -----------------------------------------------------------------------------
-- La única idea errónea que cambia de asignación
-- -----------------------------------------------------------------------------
-- `electronica_potencia` 60/D pasaba por `eleva-la-magnitud-equivocada`, y el
-- distractor corregido (550 000 W por usar amperes en vez de miliamperes) no es
-- ese error: es de prefijo, que vive en `electronica_notacion`. Sin idea errónea
-- es la respuesta honesta (regla 6 de la skill: un `misconception` nulo
-- significa «error factual aislado, no patrón reutilizable»).
update public.questions set misconception_d_id = null
 where topic = $el$electronica_potencia$el$ and order_index = 60;

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- select topic, order_index, correct_option,
--        left(case correct_option when 'A' then option_a when 'B' then option_b
--             when 'C' then option_c else option_d end, 40) as correcta
--   from public.questions
--  where (topic, order_index) in (
--    ('electronica_notacion', 90), ('electronica_notacion', 160),
--    ('electronica_ohm', 70), ('electronica_potencia', 50),
--    ('electronica_potencia', 60), ('electronica_potencia', 70),
--    ('electronica_kirchhoff', 50))
--  order by topic, order_index;
--
-- -- El Bonus de la correcta no habla de ningún error, en los 80:
-- select count(*) from public.questions q
--   join public.modules m on m.id = q.module_id
--  where m.track = 'electronica'
--    and case q.correct_option when 'A' then q.error_a when 'B' then q.error_b
--        when 'C' then q.error_c else q.error_d end !~* '^\s*correcto\b';
--   → esperado: 0
--
-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
-- No la tiene, y es a propósito: revertir sería volver a poner números que no
-- corresponden a su explicación. Si hiciera falta, el estado anterior está en el
-- git de `contenido/items/electronica_*.json`.
