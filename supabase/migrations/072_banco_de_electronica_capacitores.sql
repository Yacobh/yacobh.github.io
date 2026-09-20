-- Banco de electronica/capacitores: C = Q/V antes que la asociacion
-- 16 ítems · topic `electronica_capacitores` · 7 ideas erróneas nuevas
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
-- Primer banco del track `electronica` (071). 16 items para el modulo `electronica/capacitores`, banda [-2,2 · -1,0], y las 7 ideas erroneas de su catalogo.
--
-- PARA QUIEN. El curso de tecnico en electronica del owner: chicos de 16-17 anos con fallas de base, para quienes `electrotecnia` queda muy alto. Solo continua, correctivo, aritmetica de cabeza.
--
-- POR QUE `C = Q/V` PRIMERO. El error que el plan puso como centro del modulo es asociar capacitores con la regla de los resistores (sumar en serie). La definicion es lo que lo desarma: si C es carga POR VOLT, ponerlos en serie reparte la tension y la capacitancia baja. Por eso los seis items del tramo bajo trabajan la definicion y el despeje, y la asociacion aparece recien despues.
--
-- CONVENCIONES (supabase/CONTENT.md): decimal con coma, resultado siempre con unidad y prefijo del taller, y "tension"/"corriente" -- nunca "voltaje" ni "intensidad".
--
-- NINGUN ITEM PIDE CONVERTIR PREFIJOS. Es deliberado: un item de capacitores que falla por confundir uF con nF diagnostica el modulo equivocado. Los prefijos son `electronica/notacion_cientifica`, que es su prerrequisito y tiene su propio banco.
--
-- ⚠️ EL CATALOGO DE ERRORES SE REVISO EN BLOQUE, NO ITEM POR ITEM. El owner leyo `contenido/unidades/electronica_errores_para_revisar.md` el 2026-09-20 y no marco la columna `¿lo ves?` ni agrego ninguno propio. Las 7 ideas erroneas de este banco quedan por lo tanto como hipotesis revisadas, no como errores observados uno por uno. Es una diferencia que importa cuando alguien pregunte de donde salio cada distractor: la regla F4 del plan pide errores vistos en el aula, y lo que hay es una lista leida y no objetada.
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
    ($it$capacitores/serie-y-paralelo-como-resistores$it$, $it$Asocia capacitores con la regla de los resistores$it$, $it$Usar cuando el estudiante suma capacitores en serie, o usa la formula de inversas para el paralelo. NO usar para errores de prefijo al sumar uF con nF (eso es notacion cientifica) ni para el caso particular de dos iguales en serie, que tiene su propia entrada.$it$, $it$electronica/capacitores$it$),
    ($it$capacitancia/confunde-carga-con-capacitancia$it$, $it$Cree que la capacitancia es cuanta carga tiene el capacitor$it$, $it$Usar cuando el estudiante afirma que un capacitor descargado tiene C = 0, o responde el valor de la carga cuando se pide la capacitancia, o cree que dos capacitores a la misma tension almacenan la misma carga. NO usar cuando entiende la definicion y despeja mal.$it$, $it$electronica/capacitores$it$),
    ($it$capacitancia/despeja-mal-c-igual-q-sobre-v$it$, $it$Despeja al reves en C = Q/V$it$, $it$Usar cuando el estudiante invierte o multiplica donde corresponde lo contrario: hace V/Q para hallar C, C/V para hallar Q, o C/Q para hallar V. NO usar para la confusion conceptual de creer que C es la carga.$it$, $it$electronica/capacitores$it$),
    ($it$capacitancia/confunde-carga-con-corriente$it$, $it$Usa carga y corriente como si fueran lo mismo$it$, $it$Usar cuando el estudiante responde una corriente (A, mA) donde se pide una carga (C, uC), o al reves. NO usar cuando la unidad es correcta y solo el prefijo esta mal.$it$, $it$electronica/capacitores$it$),
    ($it$capacitores/mas-capacitancia-en-serie$it$, $it$Cree que asociar en serie aumenta la capacitancia$it$, $it$Usar cuando ante capacitores IGUALES en serie responde 2C (o nC) en vez de C/2 (o C/n). Se separa de serie-y-paralelo-como-resistores porque el estudiante que la comete suele hacer bien el paralelo: el error es solo con el caso de iguales en serie. NO usar cuando aplica la regla de los resistores en general, ni cuando los capacitores son distintos: eso es serie-y-paralelo-como-resistores.$it$, $it$electronica/capacitores$it$),
    ($it$capacitores/ignora-la-tension-de-trabajo$it$, $it$No mira la tension que el capacitor aguanta$it$, $it$Usar cuando elige un capacitor cuya tension de trabajo es menor que la del circuito, mirando solo la capacitancia. NO usar si el item no daba la tension de trabajo de las alternativas.$it$, $it$electronica/capacitores$it$),
    ($it$capacitancia/cree-que-c-depende-de-la-tension-aplicada$it$, $it$Cree que la capacitancia cambia al cambiar la tension aplicada$it$, $it$Usar cuando afirma que al duplicar la tension se duplica (o se reduce) la capacitancia. NO usar para la confusion entre carga y capacitancia: aca el estudiante distingue las dos magnitudes, pero cree que una determina a la otra.$it$, $it$electronica/capacitores$it$)
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
  -- electronica/capacitores
  -- ===========================================================================
  ($it$electronica_capacitores$it$::text, $it$electronica/capacitores$it$::text,
   (-2.2)::double precision, 10::int,
   $it$Un capacitor almacena una carga de $6$ mC cuando se le aplica una tension de $3$ V. ¿Cuanto vale su capacitancia?$it$::text,
   $it$0,5 mF$it$::text,
   $it$2 mF$it$::text,
   $it$6 mF$it$::text,
   $it$18 mF$it$::text,
   $it$B$it$::text,
   $it$Dividiste la tension por la carga. La definicion es $C = Q/V$: la carga va arriba, porque la capacitancia dice cuanta carga entra por cada volt.$it$::text,
   $it$Correcto. $C = Q/V = 6/3 = 2$ mF. Leelo como "este capacitor guarda 2 mC por cada volt que se le aplique": esa frase es toda la definicion.$it$::text,
   $it$Ese es el valor de la carga, no de la capacitancia. Son magnitudes distintas: la carga depende de cuanta tension le pongas, la capacitancia no.$it$::text,
   $it$Multiplicaste la carga por la tension. Esa cuenta sirve para hallar la carga cuando conoces C y V, no al reves.$it$::text,
   $it$capacitancia/despeja-mal-c-igual-q-sobre-v$it$::text, null::text, $it$capacitancia/confunde-carga-con-capacitancia$it$::text, $it$capacitancia/despeja-mal-c-igual-q-sobre-v$it$::text),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-2.1), 20,
   $it$Un capacitor de $100$ uF se conecta a una fuente de $12$ V. ¿Que carga almacena?$it$,
   $it$1200 uC$it$,
   $it$100 uC$it$,
   $it$8,3 uC$it$,
   $it$1200 uA$it$,
   $it$A$it$,
   $it$Correcto. De $C = Q/V$ sale $Q = CV = 100 \times 12 = 1200$ uC. Cada volt mete 100 uC, y hay 12 volts.$it$,
   $it$Ese es el valor de la capacitancia, no de la carga. La capacitancia es la misma con la fuente conectada o sin ella; la carga no.$it$,
   $it$Dividiste la capacitancia por la tension. Para hallar la carga hay que multiplicar: $Q = CV$.$it$,
   $it$El numero esta bien y la unidad no. El ampere mide corriente, que es carga por segundo; aca se pide carga, que se mide en coulomb.$it$,
   null, $it$capacitancia/confunde-carga-con-capacitancia$it$, $it$capacitancia/despeja-mal-c-igual-q-sobre-v$it$, $it$capacitancia/confunde-carga-con-corriente$it$),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-2.0), 30,
   $it$Dos capacitores de $10$ uF cada uno se conectan en paralelo. ¿Cuanto vale la capacitancia equivalente?$it$,
   $it$5 uF$it$,
   $it$10 uF$it$,
   $it$20 uF$it$,
   $it$Depende de la tension que se les aplique$it$,
   $it$C$it$,
   $it$Usaste la regla de la serie. En paralelo los capacitores se suman, porque poner dos en paralelo es como agrandar las placas: cabe mas carga por cada volt.$it$,
   $it$Asociar dos capacitores si cambia el resultado. En paralelo la capacitancia equivalente es mayor que cada uno por separado.$it$,
   $it$Correcto. En paralelo se suman: $10 + 10 = 20$ uF. Es al reves que los resistores, y el motivo es que un capacitor mas grande guarda mas carga por volt.$it$,
   $it$La capacitancia es una propiedad del capacitor: depende de su construccion, no de la tension que le apliques. Lo que cambia con la tension es la carga almacenada.$it$,
   $it$capacitores/serie-y-paralelo-como-resistores$it$, null, null, $it$capacitancia/cree-que-c-depende-de-la-tension-aplicada$it$),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.9), 40,
   $it$Dos capacitores de $10$ uF cada uno se conectan en serie. ¿Cuanto vale la capacitancia equivalente?$it$,
   $it$20 uF$it$,
   $it$10 uF$it$,
   $it$0,05 uF$it$,
   $it$5 uF$it$,
   $it$D$it$,
   $it$Los sumaste. Esa es la regla del paralelo; en serie la capacitancia equivalente es siempre menor que la mas chica de las dos.$it$,
   $it$Ponerlos en serie si cambia el resultado: la tension se reparte entre los dos, asi que a cada uno le toca la mitad y el conjunto guarda menos carga por volt.$it$,
   $it$Sumaste las capacitancias y recien despues invertiste. La formula es al reves: se suman las inversas, $1/C = 1/10 + 1/10$, y el resultado de esa suma se invierte.$it$,
   $it$Correcto. Con dos iguales en serie la equivalente es la mitad: $5$ uF. Se puede comprobar sin formula: la tension se reparte en partes iguales, asi que con la misma carga hace falta el doble de tension.$it$,
   $it$capacitores/mas-capacitancia-en-serie$it$, null, null, null),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.8), 50,
   $it$A un capacitor se le duplica la tension aplicada. ¿Que le pasa a su capacitancia?$it$,
   $it$Se duplica$it$,
   $it$Se reduce a la mitad$it$,
   $it$No cambia; lo que se duplica es la carga almacenada$it$,
   $it$No se puede saber sin conocer la carga inicial$it$,
   $it$C$it$,
   $it$La capacitancia no sigue a la tension. En $C = Q/V$ suben las dos juntas: al duplicar V tambien se duplica Q, y el cociente queda igual.$it$,
   $it$Ver la V abajo en $C = Q/V$ hace pensar que si V sube, C baja. No pasa, porque Q sube en la misma proporcion y el cociente no se mueve.$it$,
   $it$Correcto. La capacitancia la fijan las placas y el dielectrico, no la fuente. Al duplicar la tension entra el doble de carga y el cociente $Q/V$ sigue valiendo lo mismo.$it$,
   $it$No hace falta ningun dato: la respuesta es la misma para cualquier capacitor, porque la capacitancia no depende de como se lo use.$it$,
   $it$capacitancia/cree-que-c-depende-de-la-tension-aplicada$it$, $it$capacitancia/cree-que-c-depende-de-la-tension-aplicada$it$, null, null),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.7), 60,
   $it$Un capacitor cargado a $5$ V almacena $250$ uC. Se lo desconecta y se lo descarga por completo. ¿Cuanto vale ahora su capacitancia?$it$,
   $it$0 uF$it$,
   $it$50 uF$it$,
   $it$250 uF$it$,
   $it$1250 uF$it$,
   $it$B$it$,
   $it$Descargado no quiere decir sin capacitancia. La capacitancia es la capacidad de guardar carga, y sigue estando aunque en este momento no haya carga guardada.$it$,
   $it$Correcto. $C = Q/V = 250/5 = 50$ uF, y ese valor no cambia al descargarlo: es una propiedad del componente, no de su estado.$it$,
   $it$Ese es el valor de la carga que tenia, no de la capacitancia. Ademas la carga ya no esta: se descargo.$it$,
   $it$Multiplicaste la carga por la tension en vez de dividir. La capacitancia es carga por cada volt, asi que la tension va abajo.$it$,
   $it$capacitancia/confunde-carga-con-capacitancia$it$, null, $it$capacitancia/confunde-carga-con-capacitancia$it$, $it$capacitancia/despeja-mal-c-igual-q-sobre-v$it$),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.6), 70,
   $it$Un capacitor de $10$ uF y otro de $15$ uF se conectan en serie. ¿Cuanto vale la capacitancia equivalente?$it$,
   $it$25 uF$it$,
   $it$12,5 uF$it$,
   $it$150 uF$it$,
   $it$6 uF$it$,
   $it$D$it$,
   $it$Los sumaste, que es la regla del paralelo. Una senal para darse cuenta: en serie el resultado tiene que ser menor que $10$ uF, el mas chico de los dos.$it$,
   $it$Promediaste los dos valores. La asociacion en serie no es un promedio: el resultado queda por debajo del menor de los dos capacitores.$it$,
   $it$Multiplicaste los dos valores y te quedaste ahi. El producto es solo la mitad de la cuenta: falta dividirlo por la suma.$it$,
   $it$Correcto. $C = (10 \times 15)/(10 + 15) = 150/25 = 6$ uF. Y cumple la comprobacion rapida: en serie el resultado siempre queda por debajo del capacitor mas chico.$it$,
   $it$capacitores/serie-y-paralelo-como-resistores$it$, null, null, null),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.5), 80,
   $it$Un capacitor de $100$ nF y otro de $220$ nF se conectan en paralelo. ¿Cuanto vale la capacitancia equivalente?$it$,
   $it$320 nF$it$,
   $it$68,8 nF$it$,
   $it$120 nF$it$,
   $it$No se pueden asociar en paralelo porque tienen distinto valor$it$,
   $it$A$it$,
   $it$Correcto. En paralelo se suman: $100 + 220 = 320$ nF. El resultado siempre queda por encima del mayor de los dos.$it$,
   $it$Usaste la formula de la serie. En paralelo los capacitores se suman directamente, sin inversas.$it$,
   $it$Restaste en vez de sumar. Poner un segundo capacitor en paralelo agrega capacitancia, nunca la quita.$it$,
   $it$Se pueden asociar sin problema, tengan el valor que tengan. Lo que si hay que mirar al elegirlos es la tension de trabajo de cada uno.$it$,
   null, $it$capacitores/serie-y-paralelo-como-resistores$it$, null, null),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.4), 90,
   $it$Dos capacitores de $22$ uF se conectan en paralelo a una fuente de $12$ V. ¿Que carga total almacenan?$it$,
   $it$528 uC$it$,
   $it$264 uC$it$,
   $it$132 uC$it$,
   $it$528 uA$it$,
   $it$A$it$,
   $it$Correcto. En paralelo la capacitancia equivalente es $22 + 22 = 44$ uF, y $Q = CV = 44 \times 12 = 528$ uC. Tambien sale sumando la carga de cada uno: $264 + 264$.$it$,
   $it$Calculaste la carga de un solo capacitor. Son dos, y cada uno guarda su propia carga a la misma tension.$it$,
   $it$Asociaste en serie: $11$ uF por $12$ V. Estan en paralelo, asi que las capacitancias se suman en vez de reducirse.$it$,
   $it$El numero esta bien y la unidad no. Lo que se pide es carga, que se mide en coulomb; el ampere mide corriente.$it$,
   null, null, $it$capacitores/serie-y-paralelo-como-resistores$it$, $it$capacitancia/confunde-carga-con-corriente$it$),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.3), 100,
   $it$En un circuito que trabaja a $24$ V hace falta un capacitor de $100$ uF. ¿Cual de estos sirve?$it$,
   $it$$100$ uF / $16$ V$it$,
   $it$$100$ uF / $35$ V$it$,
   $it$$47$ uF / $50$ V$it$,
   $it$$220$ uF / $10$ V$it$,
   $it$B$it$,
   $it$La capacitancia es la que pedias, pero ese capacitor aguanta $16$ V y el circuito trabaja a $24$ V. Puesto ahi se perfora, y a veces con ruido.$it$,
   $it$Correcto. Es el unico que cumple las dos condiciones: la capacitancia que pedias y una tension de trabajo por encima de la del circuito. Siempre se elige con margen.$it$,
   $it$La tension le sobra, pero la capacitancia no es la que pedias: $47$ uF es menos de la mitad.$it$,
   $it$Miraste solo la capacitancia, y ademas te pasaste: $220$ uF no son $100$ uF, y $10$ V es mucho menos que los $24$ V del circuito.$it$,
   $it$capacitores/ignora-la-tension-de-trabajo$it$, null, null, $it$capacitores/ignora-la-tension-de-trabajo$it$),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.2), 110,
   $it$Un capacitor de $10$ uF y otro de $100$ uF se conectan por separado a la misma fuente de $9$ V. ¿Cual almacena mas carga?$it$,
   $it$El de $10$ uF$it$,
   $it$Depende del tiempo que esten conectados$it$,
   $it$El de $100$ uF, diez veces mas$it$,
   $it$Los dos la misma, porque la tension es la misma$it$,
   $it$C$it$,
   $it$Es al reves. Mas capacitancia significa mas carga por cada volt, asi que a igual tension el mas grande guarda mas.$it$,
   $it$Una vez cargados, la carga final no depende del tiempo: depende de la capacitancia y de la tension. El tiempo decide cuanto tardan en llegar, no adonde llegan.$it$,
   $it$Correcto. $Q = CV$ con la misma V: diez veces mas capacitancia, diez veces mas carga. $90$ uC contra $900$ uC.$it$,
   $it$La tension igual no obliga a que la carga sea igual. Justamente la capacitancia es lo que dice cuanta carga entra por cada volt, y aca es distinta.$it$,
   null, null, null, $it$capacitancia/confunde-carga-con-capacitancia$it$),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.1), 120,
   $it$Un capacitor de $0,47$ uF almacena una carga de $2,35$ uC. ¿A que tension esta conectado?$it$,
   $it$0,2 V$it$,
   $it$1,1 V$it$,
   $it$2,35 V$it$,
   $it$5 V$it$,
   $it$D$it$,
   $it$Dividiste la capacitancia por la carga. De $C = Q/V$ se despeja $V = Q/C$: la carga va arriba.$it$,
   $it$Multiplicaste la capacitancia por la carga. Esa cuenta no corresponde a ninguna de las tres magnitudes; para hallar la tension hay que dividir la carga por la capacitancia.$it$,
   $it$Tomaste el valor de la carga como si fuera la tension. Son magnitudes distintas: el coulomb mide carga y el volt mide tension.$it$,
   $it$Correcto. $V = Q/C = 2,35/0,47 = 5$ V. Otra forma de verlo: si guarda $0,47$ uC por cada volt, para juntar $2,35$ uC hacen falta 5 volts.$it$,
   $it$capacitancia/despeja-mal-c-igual-q-sobre-v$it$, $it$capacitancia/despeja-mal-c-igual-q-sobre-v$it$, $it$capacitancia/confunde-carga-con-capacitancia$it$, null),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-2.15), 130,
   $it$Tres capacitores de $30$ uF cada uno se conectan en serie. ¿Cuanto vale la capacitancia equivalente?$it$,
   $it$10 uF$it$,
   $it$90 uF$it$,
   $it$30 uF$it$,
   $it$15 uF$it$,
   $it$A$it$,
   $it$Correcto. Con capacitores iguales en serie la equivalente es el valor de uno dividido por la cantidad: $30/3 = 10$ uF. Siempre queda por debajo del mas chico.$it$,
   $it$Los sumaste. Esa es la regla del paralelo; en serie la capacitancia equivalente baja, no sube.$it$,
   $it$Poner tres en serie si cambia el resultado: la tension se reparte entre los tres y el conjunto guarda menos carga por volt.$it$,
   $it$Dividiste por dos y son tres capacitores. Con n iguales en serie, la equivalente es el valor de uno dividido por n.$it$,
   null, $it$capacitores/mas-capacitancia-en-serie$it$, $it$capacitores/mas-capacitancia-en-serie$it$, null),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.75), 140,
   $it$Un capacitor viene marcado «$100$ uF  $25$ V». ¿Que significa el segundo numero?$it$,
   $it$Que solo funciona conectado a $25$ V$it$,
   $it$Que es la tension maxima que soporta sin danarse$it$,
   $it$Que almacena $25$ V de carga$it$,
   $it$Que su capacitancia se midio con $25$ V aplicados$it$,
   $it$B$it$,
   $it$Funciona con cualquier tension por debajo de esa. El numero es un techo, no una condicion de uso.$it$,
   $it$Correcto. Es la tension de trabajo: el limite que el dielectrico aguanta. Se elige siempre con margen sobre la tension del circuito.$it$,
   $it$La carga no se mide en volts sino en coulomb, y ademas depende de a cuanta tension se lo conecte. Ese numero no dice cuanta carga tiene.$it$,
   $it$La capacitancia no depende de la tension aplicada: la fijan las placas y el dielectrico. Es la misma a $5$ V que a $20$ V.$it$,
   $it$capacitores/ignora-la-tension-de-trabajo$it$, null, $it$capacitancia/confunde-carga-con-capacitancia$it$, $it$capacitancia/cree-que-c-depende-de-la-tension-aplicada$it$),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.55), 150,
   $it$Se quiere reemplazar un capacitor de $100$ uF por dos capacitores iguales conectados en paralelo. ¿De cuanto tiene que ser cada uno?$it$,
   $it$200 uF$it$,
   $it$100 uF$it$,
   $it$50 uF$it$,
   $it$25 uF$it$,
   $it$C$it$,
   $it$En paralelo las capacitancias se suman, asi que dos de $200$ uF darian $400$ uF. Para llegar a $100$ hay que ir por debajo, no por encima.$it$,
   $it$Dos de $100$ uF en paralelo dan $200$ uF, el doble de lo que se busca.$it$,
   $it$Correcto. En paralelo se suman, asi que dos iguales tienen que valer la mitad cada uno: $50 + 50 = 100$ uF.$it$,
   $it$Dividiste por cuatro. Son dos capacitores, asi que a cada uno le toca la mitad.$it$,
   $it$capacitores/serie-y-paralelo-como-resistores$it$, null, null, null),
  ($it$electronica_capacitores$it$, $it$electronica/capacitores$it$,
   (-1.15), 160,
   $it$Un capacitor de $10$ uF y otro de $20$ uF estan conectados en serie. ¿Cual de los dos almacena mas carga?$it$,
   $it$El de $20$ uF, el doble$it$,
   $it$El de $10$ uF$it$,
   $it$No se puede saber sin conocer la tension de la fuente$it$,
   $it$Los dos la misma$it$,
   $it$D$it$,
   $it$Mas capacitancia significa mas carga solo si los dos tienen la misma tension, y en serie no la tienen: lo que comparten es la carga.$it$,
   $it$Tampoco. En serie ninguno de los dos guarda mas que el otro, porque por los dos paso exactamente la misma carga.$it$,
   $it$La tension de la fuente decide cuanta carga hay en total, pero no cambia el hecho de que en serie los dos guardan la misma.$it$,
   $it$Correcto. En serie hay un solo camino: la carga que sale de uno es la que llega al otro. Lo que se reparte distinto es la tension.$it$,
   $it$capacitancia/confunde-carga-con-capacitancia$it$, null, $it$capacitancia/cree-que-c-depende-de-la-tension-aplicada$it$, null)

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
--   select count(*) from public.questions where topic = 'electronica_capacitores';
--   -- esperado: 16 (más lo que ya hubiera)
--
--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.
--   select id from public.questions where topic = 'electronica_capacitores' and module_id is null;
--   -- 0 filas
--
--   -- Ningún distractor perdió su idea errónea en el join.
--   select id, question from public.questions q
--    where topic = 'electronica_capacitores'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null;
--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no
--
--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.
--   select correct_option, count(*) from public.questions
--    where topic = 'electronica_capacitores' group by 1 order by 1;
--
-- Reversión: delete from public.questions where topic = 'electronica_capacitores';
--            delete from public.misconceptions where slug in ('capacitores/serie-y-paralelo-como-resistores', 'capacitancia/confunde-carga-con-capacitancia', 'capacitancia/despeja-mal-c-igual-q-sobre-v', …);
