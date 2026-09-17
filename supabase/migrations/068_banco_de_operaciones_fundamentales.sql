-- Los ocho ítems del módulo que no tenía ninguno
-- 8 ítems · topic `numeros` · 8 ideas erróneas nuevas
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
-- `aritmetica/operaciones_fundamentales` existe desde `031` y tiene banda explícita desde `060` ([-2,7 · -1,3]), y hasta hoy tenía CERO ítems, cero recursos y cero ideas erróneas. La propia `031` lo anticipó: «los dos módulos nuevos nacen sin ningún recurso publicado». Medido el 2026-09-17 con la métrica M3 de la skill `unidad-de-contenido`: es uno de los tres únicos módulos del producto con hueco real, y el único cuyo hueco es el banco entero.
--
-- Por qué importa más que su tamaño: es el módulo del estudiante que todavía no automatizó sumar, restar, multiplicar y dividir por escrito, y es el piso real del eje de números. Con ADR-038 pasa a ser un test rendible, y sin ítems pararía en `:exhausted` en la primera pregunta.
--
-- Los ocho van bajo `topic = 'numeros'` —el banco del eje— y se distinguen por `module_id`. Así son alcanzables HOY por el diagnóstico de números, y mañana por el test de módulo de ADR-038 sin tocarlos.
--
-- ⚠️ `difficulty` es hipótesis autoral, no medición (R-17, G-2). ⚠️ Entran con verificación mecánica solamente, por decisión explícita del owner el 2026-09-17: quedan bajo R-41 junto a los otros 402.

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
    ($it$operaciones/no-lleva-en-la-suma$it$, $it$Suma columna por columna sin llevar$it$, $it$Usar cuando el estudiante suma cada columna por separado y escribe el resultado completo sin arrastrar la decena. NO usar para errores de alineación de cifras, que son de valor posicional.$it$, $it$aritmetica/operaciones_fundamentales$it$),
    ($it$operaciones/resta-la-cifra-menor-de-la-mayor$it$, $it$Resta siempre la cifra chica de la grande, columna por columna$it$, $it$Usar cuando el estudiante evita el préstamo invirtiendo la resta dentro de una columna ($3-7$ lo resuelve como $7-3$). Es el error de resta más frecuente y tiene nombre propio en la literatura (smaller-from-larger). NO usar para errores de signo con números negativos.$it$, $it$aritmetica/operaciones_fundamentales$it$),
    ($it$operaciones/no-corre-el-renglon-en-la-multiplicacion$it$, $it$No desplaza el segundo renglón al multiplicar por dos cifras$it$, $it$Usar cuando el estudiante multiplica bien por cada cifra pero suma los renglones sin correr el segundo un lugar a la izquierda. NO usar cuando el error está en una tabla de multiplicar mal recordada.$it$, $it$aritmetica/operaciones_fundamentales$it$),
    ($it$operaciones/ignora-el-cero-en-el-cociente$it$, $it$Se saltea el cero del cociente en la división$it$, $it$Usar cuando el estudiante omite escribir un 0 en el cociente al bajar una cifra que no alcanza para dividir, y el resultado le queda con una cifra de menos. NO usar para errores en el resto.$it$, $it$aritmetica/operaciones_fundamentales$it$),
    ($it$operaciones/orden-de-izquierda-a-derecha$it$, $it$Opera de izquierda a derecha ignorando la jerarquía$it$, $it$Usar cuando el estudiante resuelve una expresión combinada en el orden en que está escrita, sin dar precedencia a la multiplicación o la división sobre la suma y la resta. NO usar cuando el error es de signos dentro de un paréntesis.$it$, $it$aritmetica/operaciones_fundamentales$it$),
    ($it$operaciones/resta-no-es-conmutativa$it$, $it$Trata la resta y la división como si fueran conmutativas$it$, $it$Usar cuando el estudiante invierte los términos de una resta o una división completas ($a-b$ por $b-a$, $a:b$ por $b:a$) porque le resulta más cómodo. NO usar para la inversión dentro de una columna, que es `operaciones/resta-la-cifra-menor-de-la-mayor`.$it$, $it$aritmetica/operaciones_fundamentales$it$),
    ($it$operaciones/elige-la-operacion-equivocada$it$, $it$Resuelve con una operación distinta de la que pide el problema$it$, $it$Usar cuando el estudiante calcula bien pero con la operación que no es —suma donde había que multiplicar, resta donde había que dividir—, sea por leer mal el signo o por no interpretar el enunciado. NO usar cuando la operación es la correcta y el error está en el procedimiento.$it$, $it$aritmetica/operaciones_fundamentales$it$),
    ($it$operaciones/repite-un-factor-en-la-multiplicacion$it$, $it$Multiplica un dato por sí mismo en vez de usar los dos$it$, $it$Usar cuando el estudiante eleva al cuadrado uno de los dos datos del problema en lugar de multiplicarlos entre sí. NO usar cuando el error viene de una tabla mal recordada.$it$, $it$aritmetica/operaciones_fundamentales$it$)
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
  -- aritmetica/operaciones_fundamentales
  -- ===========================================================================
  ($it$numeros$it$::text, $it$aritmetica/operaciones_fundamentales$it$::text,
   (-2.7)::double precision, 10::int,
   $it$¿Cuál es el resultado de $28 + 45$?$it$::text,
   $it$$613$$it$::text,
   $it$$73$$it$::text,
   $it$$63$$it$::text,
   $it$$17$$it$::text,
   $it$B$it$::text,
   $it$Sumaste cada columna por separado y escribiste los dos resultados seguidos: $8+5=13$ y $2+4=6$, y quedó $613$. Cuando una columna pasa de $9$ hay que llevar la decena a la siguiente.$it$::text,
   $it$Correcto. $8+5=13$: queda $3$ y llevas $1$. Después $2+4+1=7$. El resultado es $73$.$it$::text,
   $it$Sumaste bien las unidades hasta el $13$ pero dejaste el $3$ y perdiste la decena que había que llevar. Esa decena se suma a la columna siguiente: $2+4+1=7$.$it$::text,
   $it$Restaste en vez de sumar: $45-28=17$. La operación pedida es una suma.$it$::text,
   $it$operaciones/no-lleva-en-la-suma$it$::text, null::text, $it$operaciones/no-lleva-en-la-suma$it$::text, $it$operaciones/elige-la-operacion-equivocada$it$::text),
  ($it$numeros$it$, $it$aritmetica/operaciones_fundamentales$it$,
   (-2.5), 20,
   $it$¿Cuál es el resultado de $52 - 37$?$it$,
   $it$$25$$it$,
   $it$$89$$it$,
   $it$$15$$it$,
   $it$$-15$$it$,
   $it$C$it$,
   $it$En la columna de las unidades hiciste $7-2=5$ en vez de $2-7$, y en las decenas $5-3=2$. Cuando la cifra de arriba es menor, no se da vuelta la resta: se pide prestado a la decena.$it$,
   $it$Sumaste en vez de restar: $52+37=89$.$it$,
   $it$Correcto. $2$ no alcanza para restar $7$, así que pides prestado: $12-7=5$, y en las decenas queda $4-3=1$. El resultado es $15$.$it$,
   $it$El resultado tiene el valor correcto pero el signo cambiado. $52$ es mayor que $37$, así que la diferencia es positiva.$it$,
   $it$operaciones/resta-la-cifra-menor-de-la-mayor$it$, null, null, null),
  ($it$numeros$it$, $it$aritmetica/operaciones_fundamentales$it$,
   (-2.3), 30,
   $it$Una caja trae $6$ paquetes y cada paquete trae $7$ galletas. ¿Cuántas galletas hay en la caja?$it$,
   $it$$13$$it$,
   $it$$49$$it$,
   $it$$36$$it$,
   $it$$42$$it$,
   $it$D$it$,
   $it$Sumaste $6+7$. Acá cada uno de los $6$ paquetes aporta $7$ galletas, así que hay que sumar $7$ seis veces, que es multiplicar.$it$,
   $it$Multiplicaste $7 \times 7$. Los paquetes son $6$, no $7$.$it$,
   $it$Multiplicaste $6 \times 6$. Uno de los factores es la cantidad de paquetes y el otro es lo que trae cada paquete: $6$ y $7$.$it$,
   $it$Correcto. $6$ paquetes de $7$ galletas son $6 \times 7 = 42$.$it$,
   $it$operaciones/elige-la-operacion-equivocada$it$, $it$operaciones/repite-un-factor-en-la-multiplicacion$it$, $it$operaciones/repite-un-factor-en-la-multiplicacion$it$, null),
  ($it$numeros$it$, $it$aritmetica/operaciones_fundamentales$it$,
   (-2.1), 40,
   $it$¿Cuál es el resultado de $34 \times 12$?$it$,
   $it$$408$$it$,
   $it$$102$$it$,
   $it$$115$$it$,
   $it$$46$$it$,
   $it$A$it$,
   $it$Correcto. $34 \times 2 = 68$ y $34 \times 10 = 340$. Sumando, $68 + 340 = 408$.$it$,
   $it$Multiplicaste solo por el $3$ de las decenas del segundo factor sin considerarlo como $30$, o te quedaste con un renglón. $12$ son $10$ más $2$, y hay que sumar los dos productos.$it$,
   $it$Los dos renglones están bien calculados pero se sumaron sin correr el segundo un lugar: $68$ y $34$ alineados en la misma columna dan $102$... y acá quedó $115$ por el mismo desplazamiento perdido. El segundo renglón es $34 \times 10 = 340$, no $34$.$it$,
   $it$Sumaste los dos números: $34 + 12 = 46$. La operación pedida es una multiplicación.$it$,
   null, $it$operaciones/no-corre-el-renglon-en-la-multiplicacion$it$, $it$operaciones/no-corre-el-renglon-en-la-multiplicacion$it$, null),
  ($it$numeros$it$, $it$aritmetica/operaciones_fundamentales$it$,
   (-1.9), 50,
   $it$¿Cuál es el resultado de $96 : 8$?$it$,
   $it$$88$$it$,
   $it$$11$$it$,
   $it$$12$$it$,
   $it$$104$$it$,
   $it$C$it$,
   $it$Restaste $96 - 8$. El signo $:$ indica una división, no una resta.$it$,
   $it$Te falta una unidad: $8 \times 11 = 88$, y sobran $8$, que alcanzan para una vez más. La comprobación de una división es multiplicar el cociente por el divisor y llegar al dividendo.$it$,
   $it$Correcto. $8 \times 12 = 96$, así que $96 : 8 = 12$.$it$,
   $it$Sumaste $96 + 8$. La operación pedida es una división.$it$,
   $it$operaciones/elige-la-operacion-equivocada$it$, null, null, $it$operaciones/elige-la-operacion-equivocada$it$),
  ($it$numeros$it$, $it$aritmetica/operaciones_fundamentales$it$,
   (-1.7), 60,
   $it$¿Cuál es el resultado de $618 : 6$?$it$,
   $it$$13$$it$,
   $it$$103$$it$,
   $it$$18$$it$,
   $it$$130$$it$,
   $it$B$it$,
   $it$Te saltaste el cero del medio. Al bajar el $1$, el $6$ no cabe en $1$: ahí va un $0$ en el cociente antes de bajar el $8$. Sin ese cero el resultado pierde una cifra entera.$it$,
   $it$Correcto. $6:6=1$; el $1$ no alcanza para dividir por $6$, así que va $0$ y se baja el $8$: $18:6=3$. El cociente es $103$.$it$,
   $it$Dividiste solo las cifras que sí alcanzaban y pegaste los resultados: $6:6=1$ y $18:6=3$ dan $13$, y acá quedó $18$. La posición de cada cifra del cociente importa tanto como su valor.$it$,
   $it$Las cifras son las correctas pero en el orden equivocado. El cociente se arma de izquierda a derecha a medida que se baja cada cifra: $1$, después $0$, después $3$.$it$,
   $it$operaciones/ignora-el-cero-en-el-cociente$it$, null, $it$operaciones/ignora-el-cero-en-el-cociente$it$, null),
  ($it$numeros$it$, $it$aritmetica/operaciones_fundamentales$it$,
   (-1.5), 70,
   $it$¿Cuál es el resultado de $5 + 3 \times 4$?$it$,
   $it$$32$$it$,
   $it$$12$$it$,
   $it$$27$$it$,
   $it$$17$$it$,
   $it$D$it$,
   $it$Resolviste de izquierda a derecha: primero $5+3=8$ y después $8 \times 4 = 32$. La multiplicación se resuelve antes que la suma, aunque esté escrita después.$it$,
   $it$Calculaste bien $3 \times 4 = 12$ y ahí te detuviste. Falta sumarle el $5$.$it$,
   $it$Multiplicaste el $5$ por algo que no corresponde. En $5 + 3 \times 4$ el $5$ solo participa de la suma: el producto es entre el $3$ y el $4$.$it$,
   $it$Correcto. Primero $3 \times 4 = 12$, y recién después $5 + 12 = 17$.$it$,
   $it$operaciones/orden-de-izquierda-a-derecha$it$, null, $it$operaciones/orden-de-izquierda-a-derecha$it$, null),
  ($it$numeros$it$, $it$aritmetica/operaciones_fundamentales$it$,
   (-1.4), 80,
   $it$En un curso hay $32$ estudiantes. Se reparten en grupos de $4$ y después cada grupo recibe $5$ hojas. ¿Cuántas hojas se reparten en total?$it$,
   $it$$40$$it$,
   $it$$160$$it$,
   $it$$8$$it$,
   $it$$37$$it$,
   $it$A$it$,
   $it$Correcto. $32 : 4 = 8$ grupos, y cada grupo recibe $5$ hojas: $8 \times 5 = 40$.$it$,
   $it$Multiplicaste $32 \times 5$, como si cada estudiante recibiera $5$ hojas. Las hojas se reparten por grupo, y los grupos son $8$, no $32$.$it$,
   $it$Llegaste a los $8$ grupos, que es el paso difícil, y ahí te detuviste. Falta el segundo paso: cada uno de esos $8$ grupos recibe $5$ hojas.$it$,
   $it$Sumaste $32 + 5$. Ninguna de las dos operaciones del problema es una suma: primero se divide para saber cuántos grupos hay y después se multiplica.$it$,
   null, $it$operaciones/resta-no-es-conmutativa$it$, null, null)

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
--   select count(*) from public.questions where topic = 'numeros';
--   -- esperado: 8 (más lo que ya hubiera)
--
--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.
--   select id from public.questions where topic = 'numeros' and module_id is null;
--   -- 0 filas
--
--   -- Ningún distractor perdió su idea errónea en el join.
--   select id, question from public.questions q
--    where topic = 'numeros'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null;
--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no
--
--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.
--   select correct_option, count(*) from public.questions
--    where topic = 'numeros' group by 1 order by 1;
--
-- Reversión: delete from public.questions where topic = 'numeros';
--            delete from public.misconceptions where slug in ('operaciones/no-lleva-en-la-suma', 'operaciones/resta-la-cifra-menor-de-la-mayor', 'operaciones/no-corre-el-renglon-en-la-multiplicacion', …);
