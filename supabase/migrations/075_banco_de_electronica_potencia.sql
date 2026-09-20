-- Banco de electronica/potencia: el cuadrado es lo que se olvida
-- 16 ítems · topic `electronica_potencia` · 5 ideas erróneas nuevas
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
-- Cuarto banco del track `electronica` (071). 16 items para `electronica/potencia`, banda [-2,4 · -1,2], y 5 ideas erroneas nuevas.
--
-- EL EJE DEL MODULO ES EL CUADRADO. P = VI es facil de recordar; las dos formas derivadas -- P = I^2 R y P = V^2 / R -- salen de sustituir la ley de Ohm adentro, y es ahi donde se pierde el exponente. Por eso el modulo cuelga de `ley_de_ohm`: sin el despeje automatizado, las tres formulas son tres cosas sueltas que se memorizan y se confunden.
--
-- ⛔ UNA IDEA DEL CATALOGO NO SE USA COMO DISTRACTOR, A PROPOSITO. La 3.5 ("elige la formula por los datos que sobran") describe usar el camino largo teniendo uno corto. Eso NO es un error: es un camino largo, y un item que lo penalizara seria injusto -- el alumno llega al resultado correcto. Se deja fuera del banco y no se crea la idea erronea. Es la unica de las 31 del catalogo que se descarta, y queda dicho aca para que nadie la agregue despues creyendo que fue un olvido.
--
-- CONVENCIONES (supabase/CONTENT.md): decimal con coma, resultado siempre con unidad y prefijo del taller, y "tension"/"corriente".
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
    ($it$potencia/olvida-el-cuadrado$it$, $it$Usa I por R o V por R en vez de elevar al cuadrado$it$, $it$Usar cuando escribe P = IR o P = V/R, perdiendo el exponente de las formas derivadas. NO usar cuando elevo al cuadrado la magnitud equivocada, que tiene su propia entrada.$it$, $it$electronica/potencia$it$),
    ($it$potencia/eleva-la-magnitud-equivocada$it$, $it$Eleva al cuadrado la magnitud que no corresponde$it$, $it$Usar cuando escribe P = V^2 R o P = I^2 / R: el cuadrado esta, pero sobre la magnitud equivocada o con la resistencia del lado equivocado. NO usar cuando no elevo nada.$it$, $it$electronica/potencia$it$),
    ($it$potencia/confunde-potencia-con-energia$it$, $it$Confunde potencia con energia$it$, $it$Usar cuando responde una energia (Wh, J) donde se pide una potencia (W), o usa el tiempo en una cuenta que no lo necesita. NO usar para errores de prefijo entre W y kW.$it$, $it$electronica/potencia$it$),
    ($it$potencia/proporcionalidad-lineal-con-la-corriente$it$, $it$Cree que la potencia crece igual que la corriente$it$, $it$Usar en preguntas cualitativas donde responde que al duplicar la corriente la potencia se duplica, en vez de cuadruplicarse. NO usar cuando la cuenta numerica esta bien resuelta.$it$, $it$electronica/potencia$it$),
    ($it$potencia/ignora-la-potencia-nominal-del-resistor$it$, $it$No compara con la potencia que el componente aguanta$it$, $it$Usar cuando calcula bien la potencia disipada y no observa que supera la nominal del resistor, o elige un resistor con nominal insuficiente. NO usar si el item no daba la potencia nominal.$it$, $it$electronica/potencia$it$)
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
  -- electronica/potencia
  -- ===========================================================================
  ($it$electronica_potencia$it$::text, $it$electronica/potencia$it$::text,
   (-2.4)::double precision, 10::int,
   $it$Un resistor tiene $12$ V entre sus extremos y por el circulan $2$ A. ¿Que potencia disipa?$it$::text,
   $it$24 W$it$::text,
   $it$6 W$it$::text,
   $it$14 W$it$::text,
   $it$24 Wh$it$::text,
   $it$A$it$::text,
   $it$Correcto. $P = VI = 12 \times 2 = 24$ W. Es la forma directa: cuando tenes la tension y la corriente, la potencia sale del producto.$it$::text,
   $it$Dividiste la tension por la corriente. Ese cociente da la resistencia, no la potencia.$it$::text,
   $it$Sumaste los dos valores. La potencia sale de multiplicar, no de sumar.$it$::text,
   $it$El numero esta bien y la unidad no. El watt mide potencia; el watt-hora mide energia, que es potencia por tiempo.$it$::text,
   null::text, null::text, null::text, $it$potencia/confunde-potencia-con-energia$it$::text),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-2.3), 20,
   $it$Por un resistor de $100$ ohm circulan $0,2$ A. ¿Que potencia disipa?$it$,
   $it$20 W$it$,
   $it$4 W$it$,
   $it$500 W$it$,
   $it$0,4 W$it$,
   $it$B$it$,
   $it$Multiplicaste la corriente por la resistencia sin elevar al cuadrado. Esa cuenta da la tension, no la potencia.$it$,
   $it$Correcto. $P = I^2 R = 0,2^2 \times 100 = 0,04 \times 100 = 4$ W. El cuadrado aparece porque la corriente entra dos veces: una por si misma y otra a traves de la tension que provoca.$it$,
   $it$Dividiste la resistencia por la corriente. La resistencia multiplica, no divide, cuando se parte de la corriente.$it$,
   $it$Elevaste al cuadrado la resistencia y no la corriente, o perdiste un factor de diez en el camino.$it$,
   $it$potencia/olvida-el-cuadrado$it$, null, null, $it$potencia/eleva-la-magnitud-equivocada$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-2.2), 30,
   $it$Un resistor de $10$ ohm tiene $20$ V entre sus extremos. ¿Que potencia disipa?$it$,
   $it$2 W$it$,
   $it$200 W$it$,
   $it$40 W$it$,
   $it$4000 W$it$,
   $it$C$it$,
   $it$Dividiste la tension por la resistencia sin elevar al cuadrado. Esa cuenta da la corriente, que es $2$ A, no la potencia.$it$,
   $it$Multiplicaste la tension por la resistencia. La resistencia va dividiendo cuando se parte de la tension.$it$,
   $it$Correcto. $P = V^2/R = 400/10 = 40$ W. Tambien sale en dos pasos: la corriente es $2$ A y $P = VI = 20 \times 2 = 40$ W.$it$,
   $it$Elevaste la tension al cuadrado y multiplicaste por la resistencia en vez de dividir.$it$,
   $it$potencia/olvida-el-cuadrado$it$, $it$potencia/olvida-el-cuadrado$it$, null, $it$potencia/eleva-la-magnitud-equivocada$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-2.1), 40,
   $it$Si por un resistor se duplica la corriente, ¿que pasa con la potencia que disipa?$it$,
   $it$Se duplica$it$,
   $it$Se reduce a la mitad$it$,
   $it$No cambia, porque el resistor es el mismo$it$,
   $it$Se cuadruplica$it$,
   $it$D$it$,
   $it$La potencia no acompana a la corriente de a uno. En $P = I^2 R$ la corriente esta al cuadrado: al doble de corriente, cuatro veces la potencia.$it$,
   $it$Mas corriente por el mismo resistor siempre significa mas potencia disipada, nunca menos.$it$,
   $it$El resistor es el mismo, pero la potencia depende de cuanta corriente lo atraviese. Es justamente por eso que un resistor se calienta mas cuando se le exige mas.$it$,
   $it$Correcto. $P = I^2 R$: si la corriente se duplica, el cuadrado la multiplica por cuatro. Es la razon de que un cable que aguanta 10 A se queme con 20.$it$,
   $it$potencia/proporcionalidad-lineal-con-la-corriente$it$, $it$potencia/proporcionalidad-lineal-con-la-corriente$it$, null, null),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-2.0), 50,
   $it$Una lampara de $12$ V consume $0,5$ A. ¿Que potencia tiene?$it$,
   $it$24 W$it$,
   $it$6 W$it$,
   $it$3 W$it$,
   $it$6 J$it$,
   $it$B$it$,
   $it$Dividiste la tension por la corriente. Ese cociente da la resistencia de la lampara, que es $24$ ohm.$it$,
   $it$Correcto. $P = VI = 12 \times 0,5 = 6$ W. Es la potencia que la lampara toma mientras esta encendida.$it$,
   $it$Perdiste un factor de dos: $12$ por $0,5$ es la mitad de 12, o sea 6.$it$,
   $it$El numero esta bien y la unidad no. El joule mide energia; para saber cuanta energia consume habria que decir durante cuanto tiempo.$it$,
   null, null, null, $it$potencia/confunde-potencia-con-energia$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.9), 60,
   $it$Por un resistor de $220$ ohm circulan $50$ mA. ¿Que potencia disipa?$it$,
   $it$11 W$it$,
   $it$0,55 W$it$,
   $it$0,011 W$it$,
   $it$550 W$it$,
   $it$B$it$,
   $it$Multiplicaste la corriente por la resistencia sin elevar al cuadrado. Esa cuenta da la tension: $11$ V.$it$,
   $it$Correcto. $P = I^2 R = 0,05^2 \times 220 = 0,0025 \times 220 = 0,55$ W. Conviene retener el orden: medio watt es mucho para un resistor comun de un cuarto de watt.$it$,
   $it$Elevaste al cuadrado y despues dividiste por la resistencia en vez de multiplicar.$it$,
   $it$Trabajaste con 50 amperes en vez de 50 miliamperes. Medio kilowatt en un resistor de $220$ ohm no puede ser.$it$,
   $it$potencia/olvida-el-cuadrado$it$, null, $it$potencia/eleva-la-magnitud-equivocada$it$, null),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.75), 70,
   $it$Un resistor de un cuarto de watt se usa en un circuito donde disipa $0,8$ W. ¿Que conviene hacer?$it$,
   $it$Nada: la potencia nominal es solo una referencia$it$,
   $it$Nada, porque el resistor tiene el valor de resistencia correcto$it$,
   $it$Cambiarlo por uno de mayor potencia nominal, porque disipa mas de lo que aguanta$it$,
   $it$Bajar la tension a la mitad para que la potencia baje a la mitad$it$,
   $it$C$it$,
   $it$La potencia nominal es el limite real de lo que el componente puede disipar sin danarse. Pasarse lo calienta hasta que falla.$it$,
   $it$El valor de resistencia y la potencia nominal son dos cosas distintas, y hay que elegir las dos. Este resistor tiene bien una y mal la otra.$it$,
   $it$Correcto. Un cuarto de watt son $0,25$ W y el circuito le exige $0,8$ W: mas del triple. Hay que poner uno de $1$ W o mas.$it$,
   $it$Bajar la tension a la mitad baja la potencia a la cuarta parte, no a la mitad, porque la tension entra al cuadrado. Y ademas cambiaria el funcionamiento del circuito.$it$,
   $it$potencia/ignora-la-potencia-nominal-del-resistor$it$, $it$potencia/ignora-la-potencia-nominal-del-resistor$it$, null, $it$potencia/proporcionalidad-lineal-con-la-corriente$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.7), 80,
   $it$Un resistor de $1$ kilohm esta conectado a $10$ V. ¿Que potencia disipa?$it$,
   $it$0,1 W$it$,
   $it$10 W$it$,
   $it$100 W$it$,
   $it$0,01 W$it$,
   $it$A$it$,
   $it$Correcto. $P = V^2/R = 100/1000 = 0,1$ W. Son 100 milivatios: un resistor de un cuarto de watt lo aguanta con comodidad.$it$,
   $it$Dividiste la tension por la resistencia en kilohm, o te salteaste el cuadrado. La cuenta $10/1$ no corresponde a ninguna forma de la potencia.$it$,
   $it$Te quedaste con el cuadrado de la tension y no dividiste por la resistencia.$it$,
   $it$Dividiste de mas: $100$ entre $1000$ da $0,1$, no $0,01$.$it$,
   null, $it$potencia/olvida-el-cuadrado$it$, $it$potencia/olvida-el-cuadrado$it$, null),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.6), 90,
   $it$Una resistencia calefactora de $50$ W funciona durante $2$ horas. ¿Que energia consume?$it$,
   $it$25 Wh$it$,
   $it$50 Wh$it$,
   $it$100 W$it$,
   $it$100 Wh$it$,
   $it$D$it$,
   $it$Dividiste la potencia por el tiempo. La energia es potencia por tiempo, asi que hay que multiplicar.$it$,
   $it$Ese es el valor de la potencia, no de la energia. La potencia dice a que ritmo consume; la energia, cuanto consumio en total.$it$,
   $it$El numero esta bien y la unidad no: el watt mide potencia. Lo que se pide es energia, en watt-hora.$it$,
   $it$Correcto. $E = Pt = 50 \times 2 = 100$ Wh. Es lo que factura la companía electrica: energia, no potencia.$it$,
   $it$potencia/confunde-potencia-con-energia$it$, $it$potencia/confunde-potencia-con-energia$it$, $it$potencia/confunde-potencia-con-energia$it$, null),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.5), 100,
   $it$Dos resistores, uno de $10$ ohm y otro de $40$ ohm, llevan la misma corriente. ¿Cual disipa mas potencia?$it$,
   $it$El de $40$ ohm, cuatro veces mas$it$,
   $it$El de $10$ ohm, porque ofrece menos oposicion$it$,
   $it$Los dos igual, porque la corriente es la misma$it$,
   $it$El de $40$ ohm, el doble$it$,
   $it$A$it$,
   $it$Correcto. Con la misma corriente, $P = I^2 R$ crece con la resistencia: cuatro veces mas resistencia, cuatro veces mas potencia.$it$,
   $it$Menos oposicion con la misma corriente significa menos tension entre sus extremos, y por lo tanto menos potencia.$it$,
   $it$La corriente igual no alcanza: la potencia tambien depende de la resistencia, porque es ella la que fija cuanta tension cae.$it$,
   $it$La relacion con la resistencia es directa, no a la mitad del factor: si la resistencia es cuatro veces mayor, la potencia tambien.$it$,
   null, null, $it$potencia/olvida-el-cuadrado$it$, null),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.4), 110,
   $it$Un resistor disipa $2$ W cuando por el circulan $0,1$ A. ¿Cuanto vale su resistencia?$it$,
   $it$20 ohm$it$,
   $it$200 ohm$it$,
   $it$0,2 ohm$it$,
   $it$0,02 ohm$it$,
   $it$B$it$,
   $it$Dividiste la potencia por la corriente sin elevarla al cuadrado. Esa cuenta da la tension: $20$ V.$it$,
   $it$Correcto. De $P = I^2 R$ sale $R = P/I^2 = 2 / 0,01 = 200$ ohm. El cuadrado de $0,1$ es $0,01$, no $0,1$.$it$,
   $it$Multiplicaste en vez de dividir. La resistencia se despeja dividiendo la potencia por el cuadrado de la corriente.$it$,
   $it$Multiplicaste la potencia por el cuadrado de la corriente. El cuadrado va dividiendo.$it$,
   $it$potencia/olvida-el-cuadrado$it$, null, $it$potencia/eleva-la-magnitud-equivocada$it$, $it$potencia/eleva-la-magnitud-equivocada$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.3), 120,
   $it$Se quiere elegir un resistor de $470$ ohm para un circuito donde caen sobre el $15$ V. ¿Que potencia nominal conviene?$it$,
   $it$De un cuarto de watt alcanza, porque el circuito es de baja tension$it$,
   $it$De $10$ W, para tener bastante margen$it$,
   $it$De un octavo de watt, que es el mas chico disponible$it$,
   $it$De $1$ W, porque disipa alrededor de medio watt$it$,
   $it$D$it$,
   $it$La tension baja no garantiza potencia baja: hay que hacer la cuenta. $P = V^2/R = 225/470$, casi medio watt, que es el doble de un cuarto de watt.$it$,
   $it$Margen de veinte veces es desperdicio: el resistor seria mucho mas grande y caro sin ninguna ventaja. El criterio habitual es el doble de lo calculado.$it$,
   $it$Un octavo de watt son $0,125$ W, cuatro veces menos de lo que el circuito le exige. Se quemaria.$it$,
   $it$Correcto. $P = V^2/R = 225/470 = 0,48$ W, casi medio watt. Elegir uno de $1$ W deja el margen habitual de aproximadamente el doble.$it$,
   $it$potencia/ignora-la-potencia-nominal-del-resistor$it$, null, $it$potencia/ignora-la-potencia-nominal-del-resistor$it$, null),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-2.35), 130,
   $it$Una plancha conectada a $220$ V consume $5$ A. ¿Que potencia tiene?$it$,
   $it$1100 W$it$,
   $it$44 W$it$,
   $it$225 W$it$,
   $it$1100 Wh$it$,
   $it$A$it$,
   $it$Correcto. $P = VI = 220 \times 5 = 1100$ W. Es la forma directa de la potencia, y explica por que una plancha necesita un enchufe de buena seccion.$it$,
   $it$Dividiste la tension por la corriente. Ese cociente da la resistencia de la plancha, no su potencia.$it$,
   $it$Sumaste los dos valores. La potencia sale de multiplicar.$it$,
   $it$El numero esta bien y la unidad no. El watt-hora mide energia: para saber cuanta consume habria que decir cuanto tiempo estuvo encendida.$it$,
   null, null, null, $it$potencia/confunde-potencia-con-energia$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.95), 140,
   $it$Si se mantiene la misma corriente y se duplica la resistencia, ¿que pasa con la potencia disipada?$it$,
   $it$Se cuadruplica$it$,
   $it$No cambia$it$,
   $it$Se duplica$it$,
   $it$Se reduce a la mitad$it$,
   $it$C$it$,
   $it$El cuadrado esta sobre la corriente, no sobre la resistencia. En $P = I^2 R$ la resistencia entra de a uno: al doble de resistencia, el doble de potencia.$it$,
   $it$Con la misma corriente, mas resistencia significa mas tension entre los extremos y por lo tanto mas potencia.$it$,
   $it$Correcto. En $P = I^2 R$ la resistencia multiplica sin exponente: si se duplica, la potencia se duplica. Conviene compararlo con duplicar la corriente, que la cuadruplica.$it$,
   $it$Mas resistencia con la misma corriente nunca baja la potencia disipada.$it$,
   $it$potencia/eleva-la-magnitud-equivocada$it$, null, null, $it$potencia/proporcionalidad-lineal-con-la-corriente$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.65), 150,
   $it$Un LED consume $60$ mW y queda encendido durante $10$ horas. ¿Que energia consume?$it$,
   $it$6 Wh$it$,
   $it$600 Wh$it$,
   $it$0,6 Wh$it$,
   $it$0,06 Wh$it$,
   $it$C$it$,
   $it$Multiplicaste sin pasar los milivatios a vatios. $60$ mW son $0,06$ W, no $0,6$ W.$it$,
   $it$Trabajaste con 60 vatios en vez de 60 milivatios. Un LED que consumiera 60 W seria una lampara, no un LED indicador.$it$,
   $it$Correcto. $E = Pt = 0,06 \times 10 = 0,6$ Wh. Es poquisimo: por eso un indicador puede quedar encendido todo el dia sin que se note en la cuenta.$it$,
   $it$Ese es el valor de la potencia en vatios, no de la energia. Falta multiplicar por las horas.$it$,
   null, $it$potencia/confunde-potencia-con-energia$it$, null, $it$potencia/confunde-potencia-con-energia$it$),
  ($it$electronica_potencia$it$, $it$electronica/potencia$it$,
   (-1.35), 160,
   $it$Un resistor de $50$ ohm disipa $8$ W. ¿Que corriente circula por el?$it$,
   $it$0,16 A$it$,
   $it$400 A$it$,
   $it$0,4 mA$it$,
   $it$0,4 A$it$,
   $it$D$it$,
   $it$Te quedaste en $P/R = 8/50 = 0,16$, que es el **cuadrado** de la corriente. Falta la raiz cuadrada.$it$,
   $it$Multiplicaste la potencia por la resistencia. De $P = I^2 R$ se despeja dividiendo, no multiplicando.$it$,
   $it$El numero esta bien y el prefijo no: $0,4$ A son $400$ mA, no $0,4$ mA.$it$,
   $it$Correcto. De $P = I^2 R$ sale $I^2 = P/R = 8/50 = 0,16$, y la raiz de $0,16$ es $0,4$ A.$it$,
   $it$potencia/olvida-el-cuadrado$it$, $it$potencia/eleva-la-magnitud-equivocada$it$, null, null)

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
--   select count(*) from public.questions where topic = 'electronica_potencia';
--   -- esperado: 16 (más lo que ya hubiera)
--
--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.
--   select id from public.questions where topic = 'electronica_potencia' and module_id is null;
--   -- 0 filas
--
--   -- Ningún distractor perdió su idea errónea en el join.
--   select id, question from public.questions q
--    where topic = 'electronica_potencia'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null;
--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no
--
--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.
--   select correct_option, count(*) from public.questions
--    where topic = 'electronica_potencia' group by 1 order by 1;
--
-- Reversión: delete from public.questions where topic = 'electronica_potencia';
--            delete from public.misconceptions where slug in ('potencia/olvida-el-cuadrado', 'potencia/eleva-la-magnitud-equivocada', 'potencia/confunde-potencia-con-energia', …);
