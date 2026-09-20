-- Banco de electronica/leyes_de_kirchhoff: lo que entra sale, y lo que sube baja
-- 16 ítems · topic `electronica_kirchhoff` · 6 ideas erróneas nuevas
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
-- Quinto y ultimo banco del track `electronica` (071). 16 items para `electronica/leyes_de_kirchhoff`, banda [-1,8 · -0,6], y 6 ideas erroneas nuevas.
--
-- SOLO CONTINUA, UNA MALLA O UN NODO POR ITEM. Ningun item pide resolver un sistema de ecuaciones: eso es `electrotecnia/kirchhoff`, que existe y esta aplicado. Aca se trabaja la idea, que es la que falla: lo que entra a un nodo sale, y si volves al punto de partida subiste y bajaste lo mismo.
--
-- SENTIDO DE MALLA HORARIO, siempre. Es una de las convenciones cerradas en `supabase/CONTENT.md`, y la razon es diagnostica: con el sentido libre, un error de signo puede ser criterio del alumno y no se puede distinguir de un error. Fijandolo, el signo se vuelve diagnosticable -- que es de lo que vive `kirchhoff/signo-al-recorrer-la-malla`.
--
-- LOS DOS PARES DUALES SE SEPARAN A PROPOSITO. "La corriente se reparte en serie" y "la tension se reparte en paralelo" son ideas erroneas distintas y tienen entrada propia: un alumno suele cometer una y no la otra, y juntarlas perderia esa informacion.
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
    ($it$kirchhoff/signo-al-recorrer-la-malla$it$, $it$Pierde el signo al recorrer la malla$it$, $it$Usar cuando suma todas las caidas con el mismo signo sin atender al sentido del recorrido, o cuando suma dos fuentes que estan en oposicion. NO usar para el signo de la fuente segun por que borne se entra, que tiene entrada propia.$it$, $it$electronica/leyes_de_kirchhoff$it$),
    ($it$kirchhoff/corriente-se-reparte-en-serie$it$, $it$Cree que la corriente se divide entre los elementos en serie$it$, $it$Usar cuando afirma que por dos elementos en serie circulan corrientes distintas, o que la corriente se reparte entre ellos. NO usar para el caso dual de la tension en paralelo.$it$, $it$electronica/leyes_de_kirchhoff$it$),
    ($it$kirchhoff/fuente-siempre-positiva$it$, $it$Le da signo positivo a la fuente sin mirar por donde se la recorre$it$, $it$Usar cuando mantiene la tension de la fuente con signo positivo sea cual sea el borne por el que se entra al recorrerla. NO usar cuando el error esta en el signo de las caidas sobre los resistores.$it$, $it$electronica/leyes_de_kirchhoff$it$),
    ($it$kirchhoff/tension-se-reparte-en-paralelo$it$, $it$Cree que la tension se divide entre las ramas en paralelo$it$, $it$Usar cuando reparte la tension de la fuente entre dos ramas en paralelo. NO usar para el caso dual de la corriente en serie.$it$, $it$electronica/leyes_de_kirchhoff$it$),
    ($it$kirchhoff/nodo-sin-conservacion$it$, $it$La suma del nodo no cierra$it$, $it$Usar cuando suma todas las corrientes de un nodo con el mismo signo, o cuando el resultado no cumple que lo que entra sea igual a lo que sale. NO usar cuando el planteo es correcto y falla la aritmetica.$it$, $it$electronica/leyes_de_kirchhoff$it$),
    ($it$kirchhoff/confunde-nodo-con-malla$it$, $it$Aplica la ley equivocada de las dos$it$, $it$Usar cuando suma tensiones en un nodo o corrientes en una malla, o cuando atribuye a los elementos en serie la propiedad de los que estan en paralelo. NO usar cuando eligio bien la ley y se equivoco con el signo.$it$, $it$electronica/leyes_de_kirchhoff$it$)
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
  -- electronica/leyes_de_kirchhoff
  -- ===========================================================================
  ($it$electronica_kirchhoff$it$::text, $it$electronica/leyes_de_kirchhoff$it$::text,
   (-1.8)::double precision, 10::int,
   $it$A un nodo entran $3$ A. Del nodo salen dos ramas, y por una de ellas circula $1$ A. ¿Que corriente lleva la otra?$it$::text,
   $it$2 A$it$::text,
   $it$4 A$it$::text,
   $it$3 A$it$::text,
   $it$1 A$it$::text,
   $it$A$it$::text,
   $it$Correcto. Lo que entra tiene que salir: $3 = 1 + x$, asi que $x = 2$ A. La ley de nodos no es mas que conservacion de la carga.$it$::text,
   $it$Sumaste las dos corrientes conocidas. Una de ellas entra y la otra sale: no se suman, se restan.$it$::text,
   $it$Le diste a la segunda rama toda la corriente que entra, sin descontar el $1$ A que ya se fue por la primera.$it$::text,
   $it$Supusiste que las dos ramas llevan lo mismo. La corriente se reparte segun la resistencia de cada rama, no en partes iguales.$it$::text,
   null::text, $it$kirchhoff/nodo-sin-conservacion$it$::text, $it$kirchhoff/nodo-sin-conservacion$it$::text, null::text),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.7), 20,
   $it$Dos resistores estan conectados en serie. Por el primero circulan $0,5$ A. ¿Que corriente circula por el segundo?$it$,
   $it$0,25 A$it$,
   $it$0,5 A$it$,
   $it$1 A$it$,
   $it$Depende del valor de cada resistor$it$,
   $it$B$it$,
   $it$La corriente no se reparte en serie. En serie hay un solo camino, asi que toda la carga que pasa por el primero pasa tambien por el segundo.$it$,
   $it$Correcto. En serie la corriente es la misma en todos los elementos: hay un unico camino y la carga no se pierde por el medio.$it$,
   $it$La corriente no se duplica al pasar por el segundo resistor. Es la misma de punta a punta.$it$,
   $it$Los valores deciden cuanta corriente circula en total y cuanta tension cae en cada uno, pero no hacen que la corriente sea distinta en uno y en otro.$it$,
   $it$kirchhoff/corriente-se-reparte-en-serie$it$, null, null, $it$kirchhoff/corriente-se-reparte-en-serie$it$),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.6), 30,
   $it$Dos ramas estan conectadas en paralelo a una fuente de $12$ V. ¿Que tension hay en cada rama?$it$,
   $it$6 V en cada una$it$,
   $it$Depende de la resistencia de cada rama$it$,
   $it$12 V en cada una$it$,
   $it$24 V entre las dos$it$,
   $it$C$it$,
   $it$La tension no se reparte en paralelo. Las dos ramas estan conectadas a los mismos dos puntos, asi que las dos ven la fuente entera.$it$,
   $it$La resistencia de cada rama decide cuanta corriente circula por ella, no cuanta tension recibe. La tension la impone la fuente.$it$,
   $it$Correcto. En paralelo todos los elementos comparten los mismos dos nodos, asi que tienen la misma tension: los $12$ V de la fuente.$it$,
   $it$Conectar en paralelo no suma tensiones. La fuente sigue entregando $12$ V; lo que se suma son las corrientes de cada rama.$it$,
   $it$kirchhoff/tension-se-reparte-en-paralelo$it$, $it$kirchhoff/tension-se-reparte-en-paralelo$it$, null, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.5), 40,
   $it$En una malla con una fuente de $12$ V y dos resistores, sobre el primero caen $5$ V. ¿Cuanto cae sobre el segundo?$it$,
   $it$17 V$it$,
   $it$12 V$it$,
   $it$5 V$it$,
   $it$7 V$it$,
   $it$D$it$,
   $it$Sumaste la caida a la tension de la fuente. Al recorrer la malla la fuente sube y los resistores bajan: no van con el mismo signo.$it$,
   $it$Le diste al segundo resistor toda la tension de la fuente, sin descontar los $5$ V que ya cayeron en el primero.$it$,
   $it$Supusiste que los dos resistores caen lo mismo. Eso pasa solo si son iguales, y el enunciado no lo dice.$it$,
   $it$Correcto. Recorriendo la malla: $12 - 5 - x = 0$, asi que $x = 7$ V. Lo que sube la fuente lo bajan los resistores entre todos.$it$,
   $it$kirchhoff/signo-al-recorrer-la-malla$it$, $it$kirchhoff/signo-al-recorrer-la-malla$it$, null, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.4), 50,
   $it$En un nodo se quiere hallar una corriente desconocida. ¿Que hay que plantear?$it$,
   $it$Que la suma de las tensiones alrededor del nodo es cero$it$,
   $it$Que la corriente se reparte en partes iguales entre las ramas$it$,
   $it$Que la suma de las corrientes que entran es igual a la suma de las que salen$it$,
   $it$Que la suma de las tensiones a lo largo de la malla es cero$it$,
   $it$C$it$,
   $it$Esa es la idea de la ley de mallas, y ademas un nodo no tiene tensiones que recorrer: es un punto. En un nodo se trabaja con corrientes.$it$,
   $it$El reparto en partes iguales pasa solo si las ramas son identicas. Lo que siempre vale es que el total se conserva.$it$,
   $it$Correcto. Es la ley de nodos, y es conservacion de la carga: en un punto no se acumula ni desaparece corriente.$it$,
   $it$Esa es la ley de mallas, que se usa recorriendo un camino cerrado. Para un nodo corresponde la de corrientes.$it$,
   $it$kirchhoff/confunde-nodo-con-malla$it$, null, null, $it$kirchhoff/confunde-nodo-con-malla$it$),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.3), 60,
   $it$Recorriendo una malla en sentido horario se entra a la pila por el borne positivo y se sale por el negativo. ¿Con que signo entra su tension en la ecuacion?$it$,
   $it$Positiva, porque es la fuente y las fuentes suman$it$,
   $it$Negativa, porque en ese sentido se baja de potencial$it$,
   $it$Positiva, porque el recorrido es horario$it$,
   $it$No lleva signo: las fuentes no entran en la ecuacion de malla$it$,
   $it$B$it$,
   $it$El signo no depende de que sea una fuente, sino de por donde se la recorre. Entrando por el positivo y saliendo por el negativo se baja, igual que en un resistor.$it$,
   $it$Correcto. El signo lo decide el sentido del recorrido, no el tipo de componente: del positivo al negativo se baja de potencial, asi que entra restando.$it$,
   $it$El sentido horario es la convencion que fijamos para recorrer, pero no determina por si solo el signo de cada elemento: eso depende de como este conectado cada uno.$it$,
   $it$Sin la fuente la ecuacion de malla no cierra nunca: es justamente la que sube el potencial que los resistores bajan.$it$,
   $it$kirchhoff/fuente-siempre-positiva$it$, null, $it$kirchhoff/fuente-siempre-positiva$it$, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.15), 70,
   $it$A un nodo llegan $250$ mA por una rama y $150$ mA por otra. Del nodo sale una sola rama. ¿Que corriente lleva?$it$,
   $it$100 mA$it$,
   $it$200 mA$it$,
   $it$250 mA$it$,
   $it$400 mA$it$,
   $it$D$it$,
   $it$Restaste las dos corrientes. Las dos entran al nodo, asi que se suman; se restaria si una entrara y la otra saliera.$it$,
   $it$Promediaste las dos. La ley de nodos no promedia: suma lo que entra y lo iguala a lo que sale.$it$,
   $it$Tomaste solo la rama mas grande. Toda la corriente que llega tiene que irse por la unica salida.$it$,
   $it$Correcto. $250 + 150 = 400$ mA. Como hay una sola salida, se lleva todo lo que entro.$it$,
   $it$kirchhoff/nodo-sin-conservacion$it$, null, $it$kirchhoff/nodo-sin-conservacion$it$, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.05), 80,
   $it$Tres resistores iguales estan en serie con una fuente de $12$ V. ¿Que tension cae sobre cada uno?$it$,
   $it$4 V$it$,
   $it$12 V en cada uno$it$,
   $it$6 V$it$,
   $it$36 V$it$,
   $it$A$it$,
   $it$Correcto. En serie la tension se reparte, y si los tres son iguales les toca un tercio a cada uno: $12/3 = 4$ V. Las tres caidas suman los $12$ V de la fuente.$it$,
   $it$Eso pasaria si estuvieran en paralelo. En serie la tension se reparte entre los elementos; lo que es igual en serie es la corriente.$it$,
   $it$Repartiste entre dos y son tres. La suma de las caidas tiene que dar exactamente la tension de la fuente.$it$,
   $it$Multiplicaste por tres en vez de dividir. La suma de las tres caidas no puede superar lo que entrega la fuente.$it$,
   null, $it$kirchhoff/confunde-nodo-con-malla$it$, null, $it$kirchhoff/signo-al-recorrer-la-malla$it$),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-0.95), 90,
   $it$Una malla tiene dos pilas conectadas en oposicion, una de $12$ V y otra de $4$ V, y un unico resistor. ¿Que tension cae sobre el resistor?$it$,
   $it$16 V$it$,
   $it$8 V$it$,
   $it$12 V$it$,
   $it$4 V$it$,
   $it$B$it$,
   $it$Sumaste las dos pilas. Estan en oposicion: una sube el potencial y la otra lo baja, asi que se restan.$it$,
   $it$Correcto. $12 - 4 = 8$ V. En oposicion, la pila mas chica trabaja en contra de la mas grande y lo que queda para el resistor es la diferencia.$it$,
   $it$Ignoraste la segunda pila. Aunque este en contra, participa de la ecuacion de malla.$it$,
   $it$Te quedaste con la pila mas chica. La que manda es la diferencia entre las dos, no una de ellas.$it$,
   $it$kirchhoff/signo-al-recorrer-la-malla$it$, null, $it$kirchhoff/fuente-siempre-positiva$it$, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-0.85), 100,
   $it$De una fuente salen $600$ mA que se reparten en dos ramas en paralelo. Por una circulan $250$ mA. ¿Cuanto circula por la otra?$it$,
   $it$850 mA$it$,
   $it$300 mA$it$,
   $it$600 mA$it$,
   $it$350 mA$it$,
   $it$D$it$,
   $it$Sumaste en vez de restar. Las dos ramas salen del mismo nodo, asi que entre las dos tienen que dar los $600$ mA que entran.$it$,
   $it$Repartiste en partes iguales. Solo pasaria si las dos ramas tuvieran la misma resistencia, y el enunciado dice que una lleva $250$ mA.$it$,
   $it$Le diste a la segunda rama toda la corriente. Hay que descontar lo que ya se fue por la primera.$it$,
   $it$Correcto. $600 - 250 = 350$ mA. Lo que entra al nodo se reparte entre las salidas, y la suma de las dos ramas da el total.$it$,
   $it$kirchhoff/nodo-sin-conservacion$it$, null, $it$kirchhoff/nodo-sin-conservacion$it$, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-0.75), 110,
   $it$En un circuito con resistores en serie y en paralelo, ¿cual de estas afirmaciones es correcta?$it$,
   $it$Por los que estan en serie circula la misma corriente, y sobre los que estan en paralelo hay la misma tension$it$,
   $it$Por los que estan en serie hay la misma tension, y sobre los que estan en paralelo la misma corriente$it$,
   $it$En serie la corriente se reparte entre los resistores$it$,
   $it$En paralelo la tension se reparte entre las ramas$it$,
   $it$A$it$,
   $it$Correcto. Es el par que hay que tener memorizado: serie comparte corriente, paralelo comparte tension. Todo lo demas se deduce de ahi.$it$,
   $it$Estan cambiadas. En serie lo que se comparte es la corriente, porque hay un solo camino; en paralelo, la tension, porque comparten los dos nodos.$it$,
   $it$En serie hay un unico camino: toda la corriente pasa por todos. Lo que se reparte en serie es la tension.$it$,
   $it$En paralelo todas las ramas ven los mismos dos puntos, asi que tienen la misma tension. Lo que se reparte en paralelo es la corriente.$it$,
   null, $it$kirchhoff/confunde-nodo-con-malla$it$, $it$kirchhoff/corriente-se-reparte-en-serie$it$, $it$kirchhoff/tension-se-reparte-en-paralelo$it$),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-0.65), 120,
   $it$Una malla tiene una fuente de $10$ V y tres resistores. Sobre dos de ellos caen $2$ V y $3$ V. ¿Cuanto cae sobre el tercero?$it$,
   $it$15 V$it$,
   $it$10 V$it$,
   $it$5 V$it$,
   $it$3,33 V$it$,
   $it$C$it$,
   $it$Sumaste las tres tensiones como si todas subieran. La fuente sube y los resistores bajan: la suma de las caidas iguala a la fuente, no se le agrega.$it$,
   $it$Le diste al tercer resistor toda la tension de la fuente, sin descontar los $5$ V que ya cayeron en los otros dos.$it$,
   $it$Correcto. $10 - 2 - 3 - x = 0$, asi que $x = 5$ V. Al volver al punto de partida hay que haber bajado exactamente lo que se subio.$it$,
   $it$Repartiste la tension en tres partes iguales. Eso valdria solo si los tres resistores fueran iguales, y el enunciado dice que dos caen $2$ V y $3$ V.$it$,
   $it$kirchhoff/signo-al-recorrer-la-malla$it$, $it$kirchhoff/signo-al-recorrer-la-malla$it$, null, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.75), 130,
   $it$A un nodo entran $5$ A por una rama. Por otra salen $2$ A y por una tercera salen $1$ A. ¿Que ocurre en la cuarta rama?$it$,
   $it$Salen 2 A$it$,
   $it$Entran 2 A$it$,
   $it$Salen 8 A$it$,
   $it$Salen 3 A$it$,
   $it$A$it$,
   $it$Correcto. Entran $5$ y ya salieron $3$: por la cuarta tienen que salir los $2$ que faltan. Lo que entra a un nodo sale entero.$it$,
   $it$Si tambien entrara, al nodo estarian entrando $7$ A y saliendo $3$: sobrarian $4$ A acumulandose en un punto, que es justo lo que no puede pasar.$it$,
   $it$Sumaste todas las corrientes con el mismo signo. Las que entran y las que salen van con signos opuestos.$it$,
   $it$Restaste solo una de las dos salidas. Hay que descontar las dos: $5 - 2 - 1 = 2$.$it$,
   null, $it$kirchhoff/nodo-sin-conservacion$it$, $it$kirchhoff/nodo-sin-conservacion$it$, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.35), 140,
   $it$Tres lamparas iguales estan conectadas en serie. Si por la primera se miden $0,2$ A, ¿cuanto se mide en la tercera?$it$,
   $it$0,067 A$it$,
   $it$0,2 A$it$,
   $it$0,6 A$it$,
   $it$0 A$it$,
   $it$B$it$,
   $it$Dividiste por tres. La corriente no se reparte entre los elementos en serie: hay un solo camino y pasa entera por los tres.$it$,
   $it$Correcto. En serie la corriente es la misma en todos los puntos del circuito. Lo que si se reparte entre las tres lamparas es la tension.$it$,
   $it$Multiplicaste por tres. La corriente no se acumula al avanzar por el circuito.$it$,
   $it$Si no circulara corriente por la tercera, tampoco circularia por las otras dos: en serie o pasa por todas o no pasa por ninguna.$it$,
   $it$kirchhoff/corriente-se-reparte-en-serie$it$, null, $it$kirchhoff/corriente-se-reparte-en-serie$it$, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-1.1), 150,
   $it$Tres resistores estan conectados en paralelo a una fuente de $9$ V. ¿Que tension hay sobre el del medio?$it$,
   $it$3 V$it$,
   $it$Depende de su valor de resistencia$it$,
   $it$9 V$it$,
   $it$27 V$it$,
   $it$C$it$,
   $it$Repartiste la tension entre los tres. Eso pasa en serie; en paralelo los tres comparten los mismos dos nodos y ven la fuente entera.$it$,
   $it$Su resistencia decide cuanta corriente circula por el, no cuanta tension recibe. La tension la impone la fuente.$it$,
   $it$Correcto. En paralelo todos los elementos estan entre los mismos dos puntos, asi que los tres tienen los $9$ V de la fuente.$it$,
   $it$Conectar en paralelo no multiplica la tension. Lo que se suma entre las ramas son las corrientes.$it$,
   $it$kirchhoff/tension-se-reparte-en-paralelo$it$, $it$kirchhoff/tension-se-reparte-en-paralelo$it$, null, null),
  ($it$electronica_kirchhoff$it$, $it$electronica/leyes_de_kirchhoff$it$,
   (-0.7), 160,
   $it$Dos pilas de $6$ V estan en serie y conectadas en el mismo sentido, alimentando un unico resistor. ¿Que tension cae sobre el resistor?$it$,
   $it$6 V$it$,
   $it$3 V$it$,
   $it$0 V, porque una anula a la otra$it$,
   $it$12 V$it$,
   $it$D$it$,
   $it$Tomaste una sola pila. Las dos estan en el circuito y las dos empujan en el mismo sentido.$it$,
   $it$Repartiste la tension de una pila entre las dos. En serie y en el mismo sentido las tensiones se suman, no se dividen.$it$,
   $it$Se anularian si estuvieran enfrentadas. Conectadas en el mismo sentido se ayudan, y la malla ve la suma.$it$,
   $it$Correcto. $6 + 6 = 12$ V, y como hay un solo resistor toda esa tension cae sobre el.$it$,
   null, $it$kirchhoff/tension-se-reparte-en-paralelo$it$, $it$kirchhoff/signo-al-recorrer-la-malla$it$, null)

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
--   select count(*) from public.questions where topic = 'electronica_kirchhoff';
--   -- esperado: 16 (más lo que ya hubiera)
--
--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.
--   select id from public.questions where topic = 'electronica_kirchhoff' and module_id is null;
--   -- 0 filas
--
--   -- Ningún distractor perdió su idea errónea en el join.
--   select id, question from public.questions q
--    where topic = 'electronica_kirchhoff'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null;
--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no
--
--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.
--   select correct_option, count(*) from public.questions
--    where topic = 'electronica_kirchhoff' group by 1 order by 1;
--
-- Reversión: delete from public.questions where topic = 'electronica_kirchhoff';
--            delete from public.misconceptions where slug in ('kirchhoff/signo-al-recorrer-la-malla', 'kirchhoff/corriente-se-reparte-en-serie', 'kirchhoff/fuente-siempre-positiva', …);
