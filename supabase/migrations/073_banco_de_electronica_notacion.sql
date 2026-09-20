-- Banco de electronica/notacion_cientifica: los prefijos del taller
-- 16 ítems · topic `electronica_notacion` · 6 ideas erróneas nuevas
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
-- Segundo banco del track `electronica` (071). 16 items para `electronica/notacion_cientifica`, banda [-3,0 · -1,8], y 6 ideas erroneas nuevas.
--
-- ES LA RAIZ DE LA CADENA. Es el unico modulo del track sin prerrequisito, y de el cuelgan `ley_de_ohm` y `capacitores`. Tambien es el modulo mas bajo del track: su banda llega a -3,0, que es el piso de la escala.
--
-- POR QUE EXISTE. No es "matematica antes de electronica": es la herramienta con la que se escriben las otras cuatro. Un alumno que despeja bien la ley de Ohm y obtiene 0,0022 A descarta su propia respuesta porque "da un numero raro". Todos los items trabajan sobre magnitudes electricas reales -- resistores, corrientes, capacitores-- y no sobre potencias de diez abstractas.
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
    ($it$prefijos/mili-y-micro-intercambiados$it$, $it$Confunde mili con micro$it$, $it$Usar cuando el estudiante trata un prefijo por otro dentro de la misma familia: mili por micro, micro por nano, kilo por mega. NO usar cuando el prefijo es el correcto y el signo del exponente esta invertido.$it$, $it$electronica/notacion_cientifica$it$),
    ($it$prefijos/exponente-con-signo-invertido$it$, $it$Invierte el signo del exponente$it$, $it$Usar cuando el estudiante escribe un multiplo como submultiplo o al reves: kilo con exponente negativo, nano con exponente positivo. NO usar cuando el prefijo elegido es otro pero el signo es coherente.$it$, $it$electronica/notacion_cientifica$it$),
    ($it$prefijos/no-convierte-antes-de-operar$it$, $it$Opera con magnitudes de prefijos distintos sin convertir$it$, $it$Usar cuando suma o compara valores con prefijos distintos como si fueran el mismo numero. NO usar cuando convirtio bien y se equivoco en la aritmetica.$it$, $it$electronica/notacion_cientifica$it$),
    ($it$notacion/mantisa-fuera-de-rango$it$, $it$Deja la mantisa fuera del rango de 1 a 10$it$, $it$Usar cuando presenta como notacion cientifica algo con mantisa menor que 1 o mayor o igual que 10. NO usar para notacion de ingenieria (exponentes multiplos de 3), que es deliberada y correcta en su contexto.$it$, $it$electronica/notacion_cientifica$it$),
    ($it$notacion/multiplica-exponentes-al-multiplicar$it$, $it$Multiplica los exponentes en vez de sumarlos$it$, $it$Usar cuando al multiplicar potencias de diez multiplica los exponentes, o al dividir los divide. NO usar cuando el error esta en la mantisa y los exponentes estan bien.$it$, $it$electronica/notacion_cientifica$it$),
    ($it$prefijos/orden-de-magnitud-sin-sentido-fisico$it$, $it$No detecta un resultado fisicamente imposible$it$, $it$Usar cuando da por buena una magnitud que no puede existir en el circuito del enunciado: cientos de amperes en un circuito de pila, capacitores de varios faradios. NO usar si el procedimiento fue correcto y el enunciado permitia ese valor.$it$, $it$electronica/notacion_cientifica$it$)
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
  -- electronica/notacion_cientifica
  -- ===========================================================================
  ($it$electronica_notacion$it$::text, $it$electronica/notacion_cientifica$it$::text,
   (-3.0)::double precision, 10::int,
   $it$Un resistor mide $4,7$ kilohm. ¿Cuantos ohm son?$it$::text,
   $it$4700 ohm$it$::text,
   $it$470 ohm$it$::text,
   $it$0,0047 ohm$it$::text,
   $it$47 000 ohm$it$::text,
   $it$A$it$::text,
   $it$Correcto. Kilo significa mil, asi que $4,7$ kilohm $= 4700$ ohm. La coma se corre tres lugares hacia la derecha.$it$::text,
   $it$Multiplicaste por 100 en vez de por 1000. El prefijo kilo vale exactamente mil: $4,7$ kilohm son $4,7 \times 1000$.$it$::text,
   $it$Pusiste kilo como si achicara el numero. Kilo es un multiplo: agranda. El que achica mil veces es mili.$it$::text,
   $it$Corriste la coma cuatro lugares en vez de tres. Kilo son tres ceros, no cuatro.$it$::text,
   null::text, null::text, $it$prefijos/exponente-con-signo-invertido$it$::text, null::text),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.9), 20,
   $it$Por un circuito circula una corriente de $0,025$ A. ¿Como se expresa en miliamperes?$it$,
   $it$25 mA$it$,
   $it$0,000025 mA$it$,
   $it$2,5 mA$it$,
   $it$25 000 mA$it$,
   $it$A$it$,
   $it$Correcto. Un miliampere es la milesima parte de un ampere, asi que $0,025$ A $= 25$ mA. En el taller casi todas las corrientes se dicen asi.$it$,
   $it$Dividiste por mil en vez de multiplicar. Al pasar a una unidad mas chica el numero tiene que crecer, no achicarse.$it$,
   $it$Corriste la coma dos lugares en vez de tres. Mili son tres lugares, siempre.$it$,
   $it$Corriste la coma seis lugares: eso seria pasar a microamperes, no a miliamperes.$it$,
   null, $it$prefijos/exponente-con-signo-invertido$it$, null, $it$prefijos/mili-y-micro-intercambiados$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.8), 30,
   $it$Un capacitor esta marcado $470$ uF. ¿Cuanto vale en faradios?$it$,
   $it$0,47 F$it$,
   $it$470 000 F$it$,
   $it$0,000 470 F$it$,
   $it$4,70 F$it$,
   $it$C$it$,
   $it$Usaste mili en vez de micro: $470$ mF serian $0,47$ F. Micro es mil veces mas chico que mili.$it$,
   $it$Tomaste micro como si agrandara. Micro es un submultiplo: el valor en faradios tiene que ser mucho menor que 470.$it$,
   $it$Correcto. Micro es la millonesima parte, asi que $470$ uF $= 0,000470$ F. Por eso los capacitores se marcan en uF: en faradios los numeros serian incomodos.$it$,
   $it$Corriste la coma dos lugares. Micro son seis lugares, que es lo que hace que un capacitor comun sea una fraccion minuscula de faradio.$it$,
   $it$prefijos/mili-y-micro-intercambiados$it$, $it$prefijos/exponente-con-signo-invertido$it$, null, null),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.7), 40,
   $it$¿Cual de estas corrientes es la mas grande?$it$,
   $it$500 uA$it$,
   $it$2 mA$it$,
   $it$0,3 mA$it$,
   $it$900 uA$it$,
   $it$B$it$,
   $it$Comparaste los numeros sin mirar el prefijo. $500$ uA son $0,5$ mA, menos que la mitad de la mayor.$it$,
   $it$Correcto. Pasando todo a miliamperes: $0,5$ · $2$ · $0,3$ · $0,9$. Comparar exige primero llevar todo al mismo prefijo.$it$,
   $it$Es la mas chica de las cuatro. Puede parecer grande por estar en mA, pero $0,3$ mA son solo $300$ uA.$it$,
   $it$Es el numero mas alto de la lista y aun asi no es la corriente mas grande: $900$ uA son $0,9$ mA.$it$,
   $it$prefijos/no-convierte-antes-de-operar$it$, null, null, $it$prefijos/no-convierte-antes-de-operar$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.6), 50,
   $it$Se conectan en serie un resistor de $2,2$ kilohm y otro de $470$ ohm. ¿Cuanto suman?$it$,
   $it$472,2 ohm$it$,
   $it$2670 ohm$it$,
   $it$2,67 ohm$it$,
   $it$690 ohm$it$,
   $it$B$it$,
   $it$Sumaste $2,2$ con $470$ sin convertir. Antes de sumar hay que llevar los dos al mismo prefijo: $2,2$ kilohm son $2200$ ohm.$it$,
   $it$Correcto. $2200 + 470 = 2670$ ohm, o $2,67$ kilohm. La suma exige primero igualar los prefijos.$it$,
   $it$Sumaste bien en kilohm pero entregaste el resultado en ohm. El numero $2,67$ es correcto solo si la unidad es kilohm.$it$,
   $it$Sumaste $220$ con $470$: convertiste kilo como si fueran cien. Kilo son mil.$it$,
   $it$prefijos/no-convierte-antes-de-operar$it$, null, null, null),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.5), 60,
   $it$Una corriente de $0,000\,08$ A, ¿como se escribe en notacion cientifica?$it$,
   $it$$0,8 \times 10^{-4}$ A$it$,
   $it$$80 \times 10^{-6}$ A$it$,
   $it$$8 \times 10^{-5}$ A$it$,
   $it$$8 \times 10^{5}$ A$it$,
   $it$C$it$,
   $it$El numero vale lo mismo, pero no esta en notacion cientifica: la mantisa tiene que quedar entre 1 y 10, y $0,8$ es menor que 1.$it$,
   $it$Tambien vale lo mismo, y tambien queda fuera de la regla: $80$ es mayor que 10. Esa forma se usa en notacion de ingenieria, no en la cientifica.$it$,
   $it$Correcto. La coma se corre cinco lugares a la derecha, asi que el exponente es $-5$ y la mantisa queda en $8$, dentro del rango de 1 a 10.$it$,
   $it$El exponente quedo positivo. Un numero menor que 1 siempre lleva exponente negativo; asi escrito serian 800 mil amperes.$it$,
   $it$notacion/mantisa-fuera-de-rango$it$, $it$notacion/mantisa-fuera-de-rango$it$, null, $it$prefijos/exponente-con-signo-invertido$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.4), 70,
   $it$¿Cuanto vale $(2 \times 10^{3}) \times (3 \times 10^{2})$?$it$,
   $it$$6 \times 10^{6}$$it$,
   $it$$6 \times 10^{1}$$it$,
   $it$$5 \times 10^{5}$$it$,
   $it$$6 \times 10^{5}$$it$,
   $it$D$it$,
   $it$Multiplicaste los exponentes. Al multiplicar potencias de la misma base los exponentes se suman: $3 + 2 = 5$.$it$,
   $it$Restaste los exponentes. Eso corresponde a una division, no a una multiplicacion.$it$,
   $it$Sumaste las mantisas en vez de multiplicarlas. Con los exponentes se suma; con las mantisas, no.$it$,
   $it$Correcto. Las mantisas se multiplican ($2 \times 3 = 6$) y los exponentes se suman ($3 + 2 = 5$).$it$,
   $it$notacion/multiplica-exponentes-al-multiplicar$it$, $it$notacion/multiplica-exponentes-al-multiplicar$it$, null, null),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.3), 80,
   $it$Un capacitor de $10$ nF, ¿cuantos microfaradios son?$it$,
   $it$10 000 uF$it$,
   $it$0,1 uF$it$,
   $it$0,01 uF$it$,
   $it$10 uF$it$,
   $it$C$it$,
   $it$Tomaste nano como si fuera mas grande que micro. Es al reves: nano es mil veces mas chico, asi que el numero en uF tiene que ser menor.$it$,
   $it$Dividiste por cien. De nano a micro hay un factor de mil, no de cien.$it$,
   $it$Correcto. Mil nanofaradios hacen un microfaradio, asi que $10$ nF $= 0,01$ uF. Es el paso que hace falta para sumar un capacitor en nF con otro en uF.$it$,
   $it$Cambiaste la unidad y dejaste el numero igual. Cambiar de prefijo siempre cambia el numero.$it$,
   $it$prefijos/exponente-con-signo-invertido$it$, $it$prefijos/mili-y-micro-intercambiados$it$, null, $it$prefijos/mili-y-micro-intercambiados$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.2), 90,
   $it$Al resolver un circuito con una pila de $9$ V y un resistor de $1$ kilohm, un alumno obtiene una corriente de $9000$ A. ¿Que conviene hacer?$it$,
   $it$Aceptarlo: la cuenta $9/0,001$ da ese numero$it$,
   $it$Revisar: una pila no entrega miles de amperes; lo mas probable es que se haya multiplicado en vez de dividir por mil$it$,
   $it$Aceptarlo, porque el resistor es de solo 1 kilohm$it$,
   $it$Cambiar la unidad a miliamperes y dejar el numero igual$it$,
   $it$B$it$,
   $it$La cuenta esta mal armada: $1$ kilohm son $1000$ ohm, no $0,001$. Y aunque diera eso, el resultado avisa solo: ninguna pila entrega esa corriente.$it$,
   $it$Correcto. Antes de dar un resultado por bueno conviene preguntarse si puede existir. Una pila de $9$ V con $1$ kilohm da $9$ mA, y la diferencia con $9000$ A es justamente un prefijo mal aplicado.$it$,
   $it$Un kilohm no es poca resistencia: son mil ohm. Y el orden de magnitud sigue sin cerrar, sea cual sea el resistor.$it$,
   $it$Cambiar la unidad no arregla una cuenta equivocada: $9000$ mA tampoco es lo que da ese circuito. Hay que rehacer la division.$it$,
   $it$prefijos/orden-de-magnitud-sin-sentido-fisico$it$, null, $it$prefijos/orden-de-magnitud-sin-sentido-fisico$it$, $it$prefijos/mili-y-micro-intercambiados$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.1), 100,
   $it$¿Cuanto vale $\dfrac{6 \times 10^{-3}}{2 \times 10^{-6}}$?$it$,
   $it$$3 \times 10^{-9}$$it$,
   $it$$3 \times 10^{18}$$it$,
   $it$$4 \times 10^{3}$$it$,
   $it$$3 \times 10^{3}$$it$,
   $it$D$it$,
   $it$Sumaste los exponentes. Al dividir se restan: $-3 - (-6) = +3$.$it$,
   $it$Multiplicaste los exponentes. En una division los exponentes se restan, nunca se multiplican.$it$,
   $it$El exponente esta bien y la mantisa no: $6$ dividido $2$ da $3$, no $4$.$it$,
   $it$Correcto. Las mantisas se dividen ($6/2 = 3$) y los exponentes se restan ($-3 - (-6) = 3$). Es exactamente la cuenta de dividir $6$ mA por $2$ uA.$it$,
   $it$notacion/multiplica-exponentes-al-multiplicar$it$, $it$notacion/multiplica-exponentes-al-multiplicar$it$, null, null),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.0), 110,
   $it$Tres resistores miden $1,5$ kilohm, $820$ ohm y $0,33$ kilohm. ¿Cual es el mas chico?$it$,
   $it$El de $0,33$ kilohm$it$,
   $it$El de $820$ ohm$it$,
   $it$El de $1,5$ kilohm$it$,
   $it$Los tres miden practicamente lo mismo$it$,
   $it$A$it$,
   $it$Correcto. Pasando todo a ohm: $1500$, $820$ y $330$. El numero mas chico de la lista original no era el menor, y el mas chico de verdad venia escrito en kilohm.$it$,
   $it$Es el numero mas grande de los tres tal como estan escritos, y aun asi no es el mayor ni el menor. Hay que convertir antes de comparar.$it$,
   $it$Es el mas grande: $1500$ ohm. Aca el prefijo si acompana al numero, pero eso no se puede saber sin convertir.$it$,
   $it$Se diferencian bastante: entre $330$ y $1500$ ohm hay mas de cuatro veces.$it$,
   null, $it$prefijos/no-convierte-antes-de-operar$it$, null, $it$prefijos/no-convierte-antes-de-operar$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-1.9), 120,
   $it$Un resistor de $2\,200\,000$ ohm, ¿como se escribe con el prefijo que corresponde?$it$,
   $it$2,2 kilohm$it$,
   $it$22 megaohm$it$,
   $it$0,22 megaohm$it$,
   $it$2,2 megaohm$it$,
   $it$D$it$,
   $it$Kilo son mil, no un millon. $2,2$ kilohm serian $2200$ ohm, mil veces menos.$it$,
   $it$Corriste la coma cinco lugares en vez de seis. Mega son seis ceros exactos.$it$,
   $it$Corriste la coma siete lugares. Y ademas la mantisa quedo menor que 1, que es justo lo que el prefijo sirve para evitar.$it$,
   $it$Correcto. Mega es un millon, asi que $2\,200\,000$ ohm $= 2,2$ megaohm. Elegir el prefijo que deja la mantisa entre 1 y 1000 es lo que hace el valor legible de un vistazo.$it$,
   $it$prefijos/mili-y-micro-intercambiados$it$, null, $it$notacion/mantisa-fuera-de-rango$it$, null),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.95), 130,
   $it$¿Cuantos ohm son $0,47$ kilohm?$it$,
   $it$470 ohm$it$,
   $it$0,00047 ohm$it$,
   $it$4700 ohm$it$,
   $it$47 ohm$it$,
   $it$A$it$,
   $it$Correcto. Kilo son mil, asi que $0,47 \times 1000 = 470$ ohm. Que el numero empiece con coma no cambia la regla: la coma se corre tres lugares a la derecha.$it$,
   $it$Aplicaste kilo como si achicara. Kilo agranda mil veces; el que achica mil veces es mili.$it$,
   $it$Corriste la coma cuatro lugares en vez de tres. Kilo son tres ceros.$it$,
   $it$Corriste la coma dos lugares. Con tres queda $470$.$it$,
   null, $it$prefijos/exponente-con-signo-invertido$it$, null, $it$prefijos/mili-y-micro-intercambiados$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.55), 140,
   $it$¿Cual de estos valores NO puede corresponder a un capacitor de un circuito electronico comun?$it$,
   $it$100 nF$it$,
   $it$4,7 F$it$,
   $it$22 uF$it$,
   $it$10 pF$it$,
   $it$B$it$,
   $it$$100$ nF es un valor habitual: es el capacitor de desacople que se ve al lado de casi cualquier integrado.$it$,
   $it$Correcto. El faradio es una unidad enorme: los capacitores de un circuito comun andan entre los picofaradios y los milifaradios. Uno de $4,7$ F seria un supercapacitor, no un componente de placa.$it$,
   $it$$22$ uF es un electrolitico corriente, de los que se usan para filtrar una fuente.$it$,
   $it$$10$ pF es chico pero normal: aparece en osciladores y en circuitos de radiofrecuencia.$it$,
   $it$prefijos/orden-de-magnitud-sin-sentido-fisico$it$, null, $it$prefijos/orden-de-magnitud-sin-sentido-fisico$it$, $it$prefijos/orden-de-magnitud-sin-sentido-fisico$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-2.35), 150,
   $it$¿Cual de estas expresiones esta escrita correctamente en notacion cientifica?$it$,
   $it$$0,5 \times 10^{-3}$$it$,
   $it$$12 \times 10^{4}$$it$,
   $it$$3,3 \times 10^{-6}$$it$,
   $it$$47 \times 10^{-9}$$it$,
   $it$C$it$,
   $it$El valor es correcto, la forma no: la mantisa tiene que quedar entre 1 y 10, y $0,5$ es menor que 1. Se escribe $5 \times 10^{-4}$.$it$,
   $it$La mantisa quedo en 12, mayor que 10. Se escribe $1,2 \times 10^{5}$.$it$,
   $it$Correcto. La mantisa $3,3$ esta entre 1 y 10, que es la unica condicion de forma que pide la notacion cientifica.$it$,
   $it$$47$ es mayor que 10. Esa forma es valida en notacion de ingenieria, donde el exponente se deja multiplo de 3 para que coincida con los prefijos, pero no es notacion cientifica.$it$,
   $it$notacion/mantisa-fuera-de-rango$it$, $it$notacion/mantisa-fuera-de-rango$it$, null, $it$notacion/mantisa-fuera-de-rango$it$),
  ($it$electronica_notacion$it$, $it$electronica/notacion_cientifica$it$,
   (-1.95), 160,
   $it$¿Cuanto vale $(4 \times 10^{-3}) \times (5 \times 10^{4})$?$it$,
   $it$$2 \times 10^{-12}$$it$,
   $it$$9 \times 10^{1}$$it$,
   $it$$2 \times 10^{-2}$$it$,
   $it$$2 \times 10^{2}$$it$,
   $it$D$it$,
   $it$Multiplicaste los exponentes. Al multiplicar potencias de la misma base se suman: $-3 + 4 = 1$.$it$,
   $it$Sumaste las mantisas. Con los exponentes se suma; con las mantisas se multiplica.$it$,
   $it$Restaste los exponentes. Eso corresponde a una division.$it$,
   $it$Correcto. Mantisas: $4 \times 5 = 20$. Exponentes: $-3 + 4 = 1$. Queda $20 \times 10^{1}$, que en notacion cientifica se escribe $2 \times 10^{2}$.$it$,
   $it$notacion/multiplica-exponentes-al-multiplicar$it$, null, $it$notacion/multiplica-exponentes-al-multiplicar$it$, null)

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
--   select count(*) from public.questions where topic = 'electronica_notacion';
--   -- esperado: 16 (más lo que ya hubiera)
--
--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.
--   select id from public.questions where topic = 'electronica_notacion' and module_id is null;
--   -- 0 filas
--
--   -- Ningún distractor perdió su idea errónea en el join.
--   select id, question from public.questions q
--    where topic = 'electronica_notacion'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null;
--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no
--
--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.
--   select correct_option, count(*) from public.questions
--    where topic = 'electronica_notacion' group by 1 order by 1;
--
-- Reversión: delete from public.questions where topic = 'electronica_notacion';
--            delete from public.misconceptions where slug in ('prefijos/mili-y-micro-intercambiados', 'prefijos/exponente-con-signo-invertido', 'prefijos/no-convierte-antes-de-operar', …);
