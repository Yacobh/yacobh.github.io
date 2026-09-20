-- Banco de electronica/ley_de_ohm: un despeje por vez
-- 16 ítems · topic `electronica_ohm` · 6 ideas erróneas nuevas
--
-- GENERADA por scripts/generar_migracion_items.py desde el JSON de la tanda.
-- No editar a mano: corregir el JSON, volver a verificar y regenerar. Un cambio
-- hecho acá se pierde en la siguiente regeneración y deja de estar verificado.
--
-- Verificada con scripts/verificar_items.py, que comprueba lo que este banco
-- aprendió a golpes: clave repartida entre las cuatro letras (R-35), una sola
-- alternativa correcta, las cuatro explicaciones escritas, la correcta sin idea
-- errónea, LaTeX con escape simple (047) y cobertura de dificultad sin huecos.
--
-- Tercer banco del track `electronica` (071). 16 items para `electronica/ley_de_ohm`, banda [-2,8 · -1,6], y 6 ideas erroneas nuevas.
--
-- UN DESPEJE POR VEZ. Es la regla F2 del plan aplicada al modulo: cada item pide una sola de las tres magnitudes y ninguno mezcla la ley de Ohm con la potencia. Esa mezcla es justo lo que hace `electrotecnia/magnitudes`, y es una de las razones por las que ese modulo queda alto para este curso.
--
-- NUMEROS DE CABEZA. Todas las cuentas salen sin calculadora, y los valores son de componentes reales (220 ohm, 1 kilohm, 4,7 kilohm, pilas de 4,5 y 9 V).
--
-- CONVENCIONES (supabase/CONTENT.md): decimal con coma, resultado siempre con unidad y prefijo del taller, y "tension"/"corriente".
--
-- NINGUN ITEM PIDE CONVERTIR PREFIJOS COMO DIFICULTAD PRINCIPAL. Donde aparece kilohm y el resultado es en mA, la conversion es parte del oficio y esta explicada en la alternativa correcta; el distractor que la ataca de frente vive en `electronica_notacion`, que es su prerrequisito.
--
-- ⚠️ EL CATALOGO DE ERRORES SE REVISO EN BLOQUE, no item por item (ver la cabecera de `072`).
--
-- `difficulty` es HIPOTESIS AUTORAL, no medicion (R-17, G-2).
--
-- ⚠️ DE 12 A 16 ITEMS (2026-09-20, T-164). Los primeros 12 se escribieron con la guarda de 065 adaptada; los cuatro ultimos existen por una razon distinta y medida: EL REINTENTO ES LA REMEDIACION DEL TRACK (D-73), y `next_question` excluye los items del test EN CURSO, no los de intentos anteriores. Con banco de 12 y max_items 8, dos intentos comparten al menos 8+8-12 = 4 items -- y el primero es siempre el mismo, porque arrancan en el mismo initial_theta. Con 16, `banco >= 2 x max_items` y un reintento PUEDE ser enteramente nuevo. Ver R-47.

-- -----------------------------------------------------------------------------
-- 1. Ideas erróneas nuevas
-- -----------------------------------------------------------------------------
-- Van ANTES de los ítems y en el mismo archivo: el `left join` de abajo
-- resuelve por slug, así que si no existen todavía los ítems entrarían con
-- `misconception_*_id` en null y en silencio.
--
-- `on conflict (slug) do nothing`: si una ya está catalogada, se respeta la
-- que hay. Reaplicar contenido no pisa una corrección hecha en el panel.

insert into public.misconceptions (slug, name, description, module_id)
select v.slug, v.name, v.description, m.id
  from (values
    ($it$ohm/despeje-invertido$it$, $it$Despeja al reves en la ley de Ohm$it$, $it$Usar cuando invierte el cociente: hace R/V para hallar la corriente, o I/V para hallar la resistencia. NO usar cuando multiplica donde habia que dividir sin invertir el orden, ni para errores de prefijo.$it$, $it$electronica/ley_de_ohm$it$),
    ($it$ohm/usa-la-formula-sin-despejar$it$, $it$Reemplaza en la forma que recuerda, sin despejar$it$, $it$Usar cuando le piden una magnitud y responde el resultado de la operacion que recuerda de memoria, tipicamente el producto V por I o I por R sin importar cual se pedia. NO usar cuando el despeje esta bien planteado e invertido (eso es despeje-invertido).$it$, $it$electronica/ley_de_ohm$it$),
    ($it$ohm/confunde-tension-con-corriente$it$, $it$Cambia tension por corriente al leer el enunciado$it$, $it$Usar cuando toma el valor en volts como si fuera la corriente, o el valor en amperes como si fuera la tension, tipicamente cuando el enunciado no los presenta en el orden habitual. NO usar para errores de unidad en el resultado.$it$, $it$electronica/ley_de_ohm$it$),
    ($it$ohm/pierde-la-unidad-en-el-resultado$it$, $it$Entrega el resultado sin unidad o con la unidad equivocada$it$, $it$Usar cuando el numero es correcto pero lo acompana una unidad de otra magnitud: responde volts cuando se pedia una resistencia, u ohm cuando se pedia una corriente. NO usar cuando la unidad es correcta y solo el prefijo esta mal.$it$, $it$electronica/ley_de_ohm$it$),
    ($it$ohm/proporcionalidad-invertida$it$, $it$Cree que mas resistencia da mas corriente$it$, $it$Usar en preguntas cualitativas donde responde que la corriente crece al crecer la resistencia, o que decrece al crecer la tension. NO usar cuando la cuenta numerica esta bien resuelta.$it$, $it$electronica/ley_de_ohm$it$),
    ($it$ohm/aplica-la-ley-a-la-fuente$it$, $it$Le aplica la ley de Ohm a la fuente$it$, $it$Usar cuando trata la tension de la pila como si fuera una caida en un resistor, o le busca una resistencia interna que el enunciado no da. NO usar en items de Kirchhoff, donde el signo de la fuente es una idea aparte.$it$, $it$electronica/ley_de_ohm$it$)
  ) as v(slug, name, description, module_slug)
  left join public.modules m on m.slug = v.module_slug
on conflict (slug) do nothing;

-- -----------------------------------------------------------------------------
-- 2. Ítems
-- -----------------------------------------------------------------------------

with items (topic, module_slug, difficulty, order_index,
            question, option_a, option_b, option_c, option_d, correct_option,
            error_a, error_b, error_c, error_d,
            mis_a, mis_b, mis_c, mis_d) as (
  values

  -- ===========================================================================
  -- electronica/ley_de_ohm
  -- ===========================================================================
  ($it$electronica_ohm$it$::text, $it$electronica/ley_de_ohm$it$::text,
   (-2.8)::double precision, 10::int,
   $it$Por un resistor de $200$ ohm circula una corriente de $0,05$ A. ¿Que tension hay entre sus extremos?$it$::text,
   $it$10 V$it$::text,
   $it$4000 V$it$::text,
   $it$0,00025 V$it$::text,
   $it$10 ohm$it$::text,
   $it$A$it$::text,
   $it$Correcto. $V = IR = 0,05 \times 200 = 10$ V. Cuando te dan corriente y resistencia, la tension sale multiplicando.$it$::text,
   $it$Dividiste la resistencia por la corriente. Para hallar la tension hay que multiplicar: $V = IR$.$it$::text,
   $it$Dividiste la corriente por la resistencia. Ese cociente no corresponde a ninguna de las tres magnitudes.$it$::text,
   $it$El numero esta bien y la unidad no. Lo que se pide es una tension, y la tension se mide en volts.$it$::text,
   null::text, $it$ohm/despeje-invertido$it$::text, $it$ohm/despeje-invertido$it$::text, $it$ohm/pierde-la-unidad-en-el-resultado$it$::text),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.7), 20,
   $it$Una pila de $9$ V alimenta un resistor de $3$ ohm. ¿Que corriente circula?$it$,
   $it$27 A$it$,
   $it$0,33 A$it$,
   $it$3 A$it$,
   $it$12 A$it$,
   $it$C$it$,
   $it$Multiplicaste la tension por la resistencia. Ese producto sirve para hallar la tension cuando ya conoces la corriente, no al reves.$it$,
   $it$Dividiste la resistencia por la tension. El despeje es $I = V/R$: la tension va arriba.$it$,
   $it$Correcto. $I = V/R = 9/3 = 3$ A. Mas tension empuja mas corriente; mas resistencia la frena.$it$,
   $it$Sumaste los dos valores. La ley de Ohm relaciona las tres magnitudes multiplicando y dividiendo, nunca sumando.$it$,
   $it$ohm/usa-la-formula-sin-despejar$it$, $it$ohm/despeje-invertido$it$, null, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.6), 30,
   $it$Un resistor tiene $12$ V entre sus extremos y por el circulan $2$ A. ¿Cuanto vale su resistencia?$it$,
   $it$24 ohm$it$,
   $it$0,17 ohm$it$,
   $it$6 V$it$,
   $it$6 ohm$it$,
   $it$D$it$,
   $it$Multiplicaste la tension por la corriente. Para hallar la resistencia hay que dividir: $R = V/I$.$it$,
   $it$Dividiste la corriente por la tension. Quedo el cociente al reves: la tension va arriba.$it$,
   $it$El numero esta bien y la unidad no. Lo que se pide es una resistencia, que se mide en ohm.$it$,
   $it$Correcto. $R = V/I = 12/2 = 6$ ohm. Leelo como "hacen falta 6 volts por cada ampere que quieras hacer circular".$it$,
   $it$ohm/usa-la-formula-sin-despejar$it$, $it$ohm/despeje-invertido$it$, $it$ohm/pierde-la-unidad-en-el-resultado$it$, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.5), 40,
   $it$Si en un circuito se mantiene la misma tension y se reemplaza el resistor por otro del doble de resistencia, ¿que pasa con la corriente?$it$,
   $it$Se duplica$it$,
   $it$Se reduce a la mitad$it$,
   $it$No cambia, porque la tension es la misma$it$,
   $it$Se reduce a la cuarta parte$it$,
   $it$B$it$,
   $it$La resistencia no empuja la corriente, la frena. Mas resistencia con la misma tension da menos corriente.$it$,
   $it$Correcto. En $I = V/R$ la resistencia esta dividiendo: si se duplica, la corriente cae a la mitad.$it$,
   $it$La tension sola no fija la corriente: hace falta saber contra que resistencia empuja. Cambiar el resistor cambia el resultado.$it$,
   $it$La relacion es directa, no al cuadrado: al doble de resistencia, la mitad de corriente. Los cuadrados aparecen en la potencia, no aca.$it$,
   $it$ohm/proporcionalidad-invertida$it$, null, $it$ohm/proporcionalidad-invertida$it$, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.4), 50,
   $it$Por un resistor de $1$ kilohm circulan $9$ mA. ¿Que tension hay entre sus extremos?$it$,
   $it$9 V$it$,
   $it$9000 V$it$,
   $it$0,009 V$it$,
   $it$111 V$it$,
   $it$A$it$,
   $it$Correcto. $V = IR$ con $1$ kilohm $= 1000$ ohm y $9$ mA $= 0,009$ A: $0,009 \times 1000 = 9$ V. Atajo util del taller: mA por kilohm da volts directo.$it$,
   $it$Multiplicaste 9 por 1000 sin pasar los miliamperes a amperes. Una de las dos conversiones quedo sin hacer.$it$,
   $it$Te quedaste con la corriente en amperes y no multiplicaste por la resistencia.$it$,
   $it$Dividiste en vez de multiplicar. Con corriente y resistencia conocidas, la tension sale del producto.$it$,
   null, null, null, $it$ohm/despeje-invertido$it$),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.3), 60,
   $it$Por un resistor circulan $3$ A y entre sus extremos hay $6$ V. ¿Cuanto vale la resistencia?$it$,
   $it$18 ohm$it$,
   $it$0,5 ohm$it$,
   $it$2 ohm$it$,
   $it$3 ohm$it$,
   $it$C$it$,
   $it$Multiplicaste los dos datos. Para la resistencia hay que dividir la tension por la corriente.$it$,
   $it$Dividiste la corriente por la tension. El enunciado da primero la corriente, pero en $R = V/I$ la tension va arriba igual.$it$,
   $it$Correcto. $R = V/I = 6/3 = 2$ ohm. El orden en que aparecen los datos en el enunciado no cambia el despeje.$it$,
   $it$Tomaste el valor de la corriente como si fuera la resistencia. Son magnitudes distintas: el ampere mide corriente y el ohm, resistencia.$it$,
   $it$ohm/usa-la-formula-sin-despejar$it$, $it$ohm/despeje-invertido$it$, null, $it$ohm/confunde-tension-con-corriente$it$),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.15), 70,
   $it$Un LED necesita que circulen $20$ mA y se alimenta desde una fuente con un resistor en serie sobre el que caen $2$ V. ¿Cuanto vale ese resistor?$it$,
   $it$40 ohm$it$,
   $it$100 ohm$it$,
   $it$10 ohm$it$,
   $it$0,1 ohm$it$,
   $it$B$it$,
   $it$Multiplicaste la tension por la corriente. Para la resistencia hay que dividir.$it$,
   $it$Correcto. $R = V/I = 2 / 0,020 = 100$ ohm. Es la cuenta que se hace cada vez que se pone un LED: se divide la tension que sobra por la corriente que se quiere.$it$,
   $it$Dividiste 2 por 0,2 en vez de por 0,020. Hay un lugar decimal de diferencia entre miliamperes y decimas de ampere.$it$,
   $it$Dividiste la corriente por la tension. El cociente quedo invertido.$it$,
   $it$ohm/usa-la-formula-sin-despejar$it$, null, null, $it$ohm/despeje-invertido$it$),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.1), 80,
   $it$Una pila de $4,5$ V se conecta a un resistor de $220$ ohm. ¿Que corriente circula, expresada en miliamperes?$it$,
   $it$49 mA$it$,
   $it$990 mA$it$,
   $it$0,02 mA$it$,
   $it$20 mA$it$,
   $it$D$it$,
   $it$Dividiste 220 por 4,5. El cociente quedo al reves: la tension va arriba.$it$,
   $it$Multiplicaste los dos valores. Ese producto no da una corriente.$it$,
   $it$La cuenta $4,5/220$ da $0,02$ en amperes, no en miliamperes. Faltaba el ultimo paso de la conversion.$it$,
   $it$Correcto. $I = V/R = 4,5/220 = 0,02$ A, o sea $20$ mA. Casi todas las corrientes de un circuito de pila caen en ese orden.$it$,
   $it$ohm/despeje-invertido$it$, $it$ohm/usa-la-formula-sin-despejar$it$, null, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.0), 90,
   $it$Se quiere que por un resistor circulen $3$ mA cuando se le aplican $6$ V. ¿Que resistencia hay que usar?$it$,
   $it$2 kilohm$it$,
   $it$18 kilohm$it$,
   $it$0,5 kilohm$it$,
   $it$2 ohm$it$,
   $it$A$it$,
   $it$Correcto. $R = V/I = 6 / 0,003 = 2000$ ohm, o sea $2$ kilohm. Volts divididos por miliamperes dan kilohm directo.$it$,
   $it$Multiplicaste la tension por la corriente en vez de dividir.$it$,
   $it$Invertiste el cociente, dividiendo los numeros como venian en el enunciado ($3$ entre $6$). La tension va arriba: $R = V/I$.$it$,
   $it$El numero de la cuenta en kilohm es 2, pero lo entregaste en ohm. $2$ ohm y $2$ kilohm se diferencian en mil veces.$it$,
   null, $it$ohm/usa-la-formula-sin-despejar$it$, $it$ohm/despeje-invertido$it$, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-1.9), 100,
   $it$En un circuito con una pila de $12$ V y un unico resistor, ¿que tension hay entre los bornes de la pila?$it$,
   $it$Depende del valor del resistor$it$,
   $it$12 V, la que entrega la fuente$it$,
   $it$Cero, porque la pila no tiene resistencia$it$,
   $it$La mitad, porque se reparte con el resistor$it$,
   $it$B$it$,
   $it$La fuente impone su tension; el resistor decide la corriente, no la tension de la pila. Aca se pide la de los bornes de la fuente.$it$,
   $it$Correcto. La pila fija la tension y el resistor determina cuanta corriente circula. Con un solo resistor, toda la tension de la fuente cae sobre el.$it$,
   $it$La ley de Ohm describe la caida en un resistor, no la tension de la fuente. Que la pila no tenga resistencia no anula su tension.$it$,
   $it$No hay con quien repartir: hay un solo resistor. La tension se reparte cuando hay dos o mas en serie.$it$,
   $it$ohm/aplica-la-ley-a-la-fuente$it$, null, $it$ohm/aplica-la-ley-a-la-fuente$it$, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-1.8), 110,
   $it$Por un resistor de $4,7$ kilohm circulan $2$ mA. ¿Que tension cae sobre el?$it$,
   $it$2,35 V$it$,
   $it$9400 V$it$,
   $it$9,4 V$it$,
   $it$0,0094 V$it$,
   $it$C$it$,
   $it$Dividiste la resistencia por la corriente en unidades mezcladas. Con corriente y resistencia se multiplica.$it$,
   $it$Multiplicaste $2$ por $4700$ sin pasar los miliamperes a amperes. Falto una de las dos conversiones.$it$,
   $it$Correcto. $V = IR = 0,002 \times 4700 = 9,4$ V. Con el atajo del taller sale directo: mA por kilohm da volts.$it$,
   $it$Dividiste por mil de mas. Conviene comprobar el orden de magnitud: unos milesimos de volt sobre un resistor de casi 5 kilohm no cierra.$it$,
   $it$ohm/despeje-invertido$it$, null, null, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-1.7), 120,
   $it$Un alumno mide $5$ V sobre un resistor y anota que circulan $250$ mA. Sin hacer la cuenta completa, ¿que resistencia es razonable esperar?$it$,
   $it$Alrededor de 1250 ohm, porque se multiplican los dos valores$it$,
   $it$Alrededor de 20 ohm, porque son 5 V divididos por un cuarto de ampere$it$,
   $it$Alrededor de 0,05 ohm, porque se divide la corriente por la tension$it$,
   $it$Alrededor de 250 ohm, la misma cifra que la corriente$it$,
   $it$B$it$,
   $it$El producto de tension por corriente no da una resistencia. Para hallar la resistencia se divide.$it$,
   $it$Correcto. $250$ mA son un cuarto de ampere, y $5$ dividido un cuarto da $20$ ohm. Pensar la corriente como fraccion de ampere permite estimar sin calculadora.$it$,
   $it$Invertiste el cociente. La tension va arriba: $R = V/I$.$it$,
   $it$Tomaste el valor de la corriente como si fuera la resistencia. Son magnitudes distintas, con unidades distintas.$it$,
   $it$ohm/usa-la-formula-sin-despejar$it$, null, $it$ohm/despeje-invertido$it$, $it$ohm/confunde-tension-con-corriente$it$),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.75), 130,
   $it$Si se mantiene el mismo resistor y se duplica la tension aplicada, ¿que pasa con la corriente?$it$,
   $it$Se duplica$it$,
   $it$Se reduce a la mitad$it$,
   $it$No cambia, porque el resistor es el mismo$it$,
   $it$Se cuadruplica$it$,
   $it$A$it$,
   $it$Correcto. En $I = V/R$ la tension esta multiplicando: si se duplica y la resistencia no cambia, la corriente se duplica.$it$,
   $it$Mas tension empuja mas corriente, no menos. La que frena es la resistencia.$it$,
   $it$El resistor es el mismo, pero la corriente depende tambien de cuanta tension se le aplique. Solo fijo el resistor no queda fija la corriente.$it$,
   $it$La relacion es directa, no al cuadrado: al doble de tension, el doble de corriente. Los cuadrados aparecen en la potencia.$it$,
   null, $it$ohm/proporcionalidad-invertida$it$, $it$ohm/proporcionalidad-invertida$it$, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.35), 140,
   $it$Por un resistor de $500$ ohm circulan $0,1$ A. ¿Que tension hay entre sus extremos?$it$,
   $it$50 ohm$it$,
   $it$5000 V$it$,
   $it$50 V$it$,
   $it$0,0002 V$it$,
   $it$C$it$,
   $it$El numero esta bien y la unidad no. Lo que se pide es una tension, que se mide en volts; el ohm mide resistencia.$it$,
   $it$Dividiste la resistencia por la corriente. Para hallar la tension hay que multiplicar: $V = IR$.$it$,
   $it$Correcto. $V = IR = 0,1 \times 500 = 50$ V.$it$,
   $it$Dividiste la corriente por la resistencia. Ese cociente no corresponde a ninguna de las tres magnitudes.$it$,
   $it$ohm/pierde-la-unidad-en-el-resultado$it$, $it$ohm/despeje-invertido$it$, null, $it$ohm/despeje-invertido$it$),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-2.05), 150,
   $it$En un circuito con una pila y un resistor, ¿de que depende la corriente que circula?$it$,
   $it$De la pila solamente, que es la que la entrega$it$,
   $it$Del resistor solamente, que es el que la limita$it$,
   $it$Del grosor del cable, que es por donde pasa$it$,
   $it$De la tension de la pila y de la resistencia juntas$it$,
   $it$D$it$,
   $it$La pila pone la tension, pero no decide sola cuanta corriente circula: eso depende tambien de contra que resistencia empuja.$it$,
   $it$El resistor limita, pero necesita que algo empuje. Con el mismo resistor y otra pila, la corriente es distinta.$it$,
   $it$En un circuito comun el cable aporta una resistencia despreciable. Lo que manda son la tension de la fuente y el resistor.$it$,
   $it$Correcto. Es exactamente lo que dice $I = V/R$: la tension empuja y la resistencia frena, y la corriente sale de las dos.$it$,
   $it$ohm/aplica-la-ley-a-la-fuente$it$, null, null, null),
  ($it$electronica_ohm$it$, $it$electronica/ley_de_ohm$it$,
   (-1.75), 160,
   $it$Un multimetro marca $2$ A circulando por un resistor de $6$ ohm. ¿Que tension hay sobre el resistor?$it$,
   $it$3 V$it$,
   $it$2 V$it$,
   $it$6 V$it$,
   $it$12 V$it$,
   $it$D$it$,
   $it$Dividiste la resistencia por la corriente. Teniendo corriente y resistencia, la tension sale multiplicando.$it$,
   $it$Ese es el valor de la corriente. El ampere mide corriente y el volt mide tension: no son la misma magnitud aunque el numero este a mano.$it$,
   $it$Ese es el valor de la resistencia, no de la tension.$it$,
   $it$Correcto. $V = IR = 2 \times 6 = 12$ V.$it$,
   $it$ohm/despeje-invertido$it$, $it$ohm/confunde-tension-con-corriente$it$, $it$ohm/confunde-tension-con-corriente$it$, null)

)
insert into public.questions
  (topic, module_id, difficulty, order_index,
   question, option_a, option_b, option_c, option_d, correct_option,
   error_a, error_b, error_c, error_d,
   misconception_a_id, misconception_b_id, misconception_c_id, misconception_d_id)
select i.topic, m.id, i.difficulty, i.order_index,
       i.question, i.option_a, i.option_b, i.option_c, i.option_d, i.correct_option,
       i.error_a, i.error_b, i.error_c, i.error_d,
       xa.id, xb.id, xc.id, xd.id
from items i
left join public.modules m        on m.slug  = i.module_slug
left join public.misconceptions xa on xa.slug = i.mis_a
left join public.misconceptions xb on xb.slug = i.mis_b
left join public.misconceptions xc on xc.slug = i.mis_c
left join public.misconceptions xd on xd.slug = i.mis_d
-- Idempotente por (topic, question). Reaplicar NO actualiza un ítem ya
-- cargado: para corregirlo, editarlo en Admin → Preguntas o borrarlo primero.
where not exists (
  select 1 from public.questions q
   where q.topic = i.topic and q.question = i.question
);

-- -----------------------------------------------------------------------------
-- Verificación (correr después de aplicar)
-- -----------------------------------------------------------------------------
--   select count(*) from public.questions where topic = 'electronica_ohm';
--   -- esperado: 16 (más lo que ya hubiera)
--
--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.
--   select id from public.questions where topic = 'electronica_ohm' and module_id is null;
--   -- 0 filas
--
--   -- Ningún distractor perdió su idea errónea en el join.
--   select id, question from public.questions q
--    where topic = 'electronica_ohm'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null;
--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no
--
--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.
--   select correct_option, count(*) from public.questions
--    where topic = 'electronica_ohm' group by 1 order by 1;
--
-- Reversión: delete from public.questions where topic = 'electronica_ohm';
--            delete from public.misconceptions where slug in ('ohm/despeje-invertido', 'ohm/usa-la-formula-sin-despejar', 'ohm/confunde-tension-con-corriente', …);
