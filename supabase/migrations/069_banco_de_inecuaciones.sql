-- Los diez ítems del módulo de inecuaciones, que tampoco tenía ninguno
-- 10 ítems · topic `algebra` · 6 ideas erróneas nuevas
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
-- `algebra/inecuaciones` existe desde `031` (`order_index` 125, entre ecuaciones y sistemas) y tiene banda explícita desde `060` ([-1,7 · 0,0]), y hasta hoy **no tenía un solo ítem en el banco del eje**. Verificado contra producción el 2026-09-18: sus únicos 2 ítems vienen del topic `inecuaciones`, que está `active = false`, así que desde el diagnóstico de `algebra` el módulo es inalcanzable. Recursos e ideas erróneas propias: cero. Es el segundo de los dos módulos que `031` creó y nunca se llenaron. Medido el 2026-09-17 con la métrica M3 de la skill `unidad-de-contenido`.
--
-- El eje de esta tanda es UNA idea: multiplicar o dividir por un negativo da vuelta el signo de desigualdad. Es el único paso donde una inecuación deja de comportarse como una ecuación, y es donde se pierde casi todo el mundo. Cuatro de los diez ítems la atacan desde ángulos distintos.
--
-- Van bajo `topic = 'algebra'` —el banco del eje— y se distinguen por `module_id`: alcanzables HOY por el diagnóstico de álgebra, y mañana por el test de módulo de ADR-038 sin tocarlos.
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
    ($it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, $it$No da vuelta la desigualdad al multiplicar o dividir por un número negativo$it$, $it$Usar cuando el estudiante opera la inecuación como si fuera una ecuación y conserva el sentido del signo tras multiplicar o dividir ambos lados por un negativo. Es el error central del módulo. NO usar cuando el error es aritmético y el signo sí se invirtió.$it$, $it$algebra/inecuaciones$it$),
    ($it$inecuaciones/invierte-al-sumar-o-restar$it$, $it$Da vuelta la desigualdad al sumar o restar$it$, $it$Usar cuando el estudiante invierte el signo tras pasar un término sumando o restando, habiendo sobregeneralizado la regla del negativo. Es el error espejo del anterior y aparece justo después de enseñarla. NO usar si además hay un error de cálculo que domina.$it$, $it$algebra/inecuaciones$it$),
    ($it$inecuaciones/resuelve-como-igualdad$it$, $it$Trata la inecuación como una ecuación y entrega un solo valor$it$, $it$Usar cuando el estudiante resuelve correctamente pero informa el borde como si fuera la solución, en vez de un conjunto de valores. NO usar cuando el error está en el sentido del signo.$it$, $it$algebra/inecuaciones$it$),
    ($it$inecuaciones/confunde-estricto-con-inclusivo$it$, $it$Confunde el borde abierto con el cerrado$it$, $it$Usar cuando el estudiante incluye el extremo en una desigualdad estricta ($<$, $>$) o lo excluye en una inclusiva ($\leq$, $\geq$). NO usar cuando el error es el sentido de la desigualdad.$it$, $it$algebra/inecuaciones$it$),
    ($it$inecuaciones/lee-mal-el-sentido-en-la-recta$it$, $it$Lee la solución en el sentido contrario sobre la recta$it$, $it$Usar cuando el estudiante llega a la desigualdad correcta pero la representa o la interpreta hacia el lado equivocado de la recta numérica. NO usar si la desigualdad a la que llegó ya estaba invertida.$it$, $it$algebra/inecuaciones$it$),
    ($it$inecuaciones/traduce-al-reves-el-enunciado$it$, $it$Traduce el enunciado con la desigualdad al revés$it$, $it$Usar cuando el estudiante plantea $a > b$ donde el problema dice que $a$ no puede pasar de $b$, o equivalentes. Es un error de traducción, anterior a cualquier cálculo. NO usar para errores de resolución.$it$, $it$algebra/inecuaciones$it$)
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
  -- algebra/inecuaciones
  -- ===========================================================================
  ($it$algebra$it$::text, $it$algebra/inecuaciones$it$::text,
   (-1.7)::double precision, 10::int,
   $it$¿Cuál es la solución de $x + 4 < 9$?$it$::text,
   $it$$x > 5$$it$::text,
   $it$$x < 5$$it$::text,
   $it$$x < 13$$it$::text,
   $it$$x = 5$$it$::text,
   $it$B$it$::text,
   $it$Restaste bien el $4$ pero diste vuelta el signo. La desigualdad solo se invierte al multiplicar o dividir por un número negativo: sumar y restar no la afectan.$it$::text,
   $it$Correcto. Restando $4$ a los dos lados queda $x < 5$.$it$::text,
   $it$Sumaste el $4$ en vez de restarlo: $9+4=13$. El $4$ está sumando a la izquierda, así que pasa restando.$it$::text,
   $it$Resolviste el borde, que es $x = 5$, pero el problema pide una desigualdad: la solución no es un valor sino todos los menores que $5$.$it$::text,
   $it$inecuaciones/invierte-al-sumar-o-restar$it$::text, null::text, null::text, $it$inecuaciones/resuelve-como-igualdad$it$::text),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-1.5), 20,
   $it$¿Cuál es la solución de $3x \geq 12$?$it$,
   $it$$x \leq 4$$it$,
   $it$$x \geq 36$$it$,
   $it$$x \geq 4$$it$,
   $it$$x > 4$$it$,
   $it$C$it$,
   $it$Dividiste bien por $3$ pero invertiste el signo. El $3$ es positivo: la desigualdad solo se da vuelta cuando se divide por un negativo.$it$,
   $it$Multiplicaste por $3$ en vez de dividir. El $3$ está multiplicando a la $x$, así que pasa dividiendo: $12 : 3 = 4$.$it$,
   $it$Correcto. Dividiendo por $3$, que es positivo, el signo se conserva: $x \geq 4$.$it$,
   $it$El valor está bien pero dejaste afuera el $4$. El signo del enunciado es $\geq$, así que el $4$ también es solución.$it$,
   $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, null, null, $it$inecuaciones/confunde-estricto-con-inclusivo$it$),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-1.3), 30,
   $it$¿Cuál es la solución de $-2x > 8$?$it$,
   $it$$x < -4$$it$,
   $it$$x > -4$$it$,
   $it$$x > 4$$it$,
   $it$$x < 4$$it$,
   $it$A$it$,
   $it$Correcto. Al dividir los dos lados por $-2$, que es negativo, la desigualdad se da vuelta: $x < -4$.$it$,
   $it$Dividiste bien por $-2$ y llegaste al $-4$, pero dejaste el signo como estaba. Dividir por un número negativo invierte el sentido de la desigualdad.$it$,
   $it$Perdiste el signo del $-2$: $8 : (-2)$ es $-4$, no $4$. Y además esa división da vuelta la desigualdad.$it$,
   $it$Diste vuelta el signo, que es lo correcto, pero el cociente quedó positivo. $8$ dividido por $-2$ es $-4$.$it$,
   null, $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, null),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-1.1), 40,
   $it$¿Cuál es la solución de $5 - x \leq 2$?$it$,
   $it$$x \leq 3$$it$,
   $it$$x \geq 7$$it$,
   $it$$x \leq -3$$it$,
   $it$$x \geq 3$$it$,
   $it$D$it$,
   $it$Llegaste a $-x \leq -3$ y ahí soltaste el signo negativo de la $x$ sin dar vuelta la desigualdad. Multiplicar los dos lados por $-1$ invierte el sentido.$it$,
   $it$Sumaste el $5$ al $2$ en vez de restarlo. El $5$ está sumando en el lado izquierdo, así que pasa restando: $2 - 5 = -3$.$it$,
   $it$El signo de la desigualdad quedó sin invertir y además el $-3$ se arrastró al resultado. Al multiplicar $-x \leq -3$ por $-1$, los dos lados cambian de signo y el sentido también.$it$,
   $it$Correcto. $5 - x \leq 2$ da $-x \leq -3$, y al multiplicar por $-1$ la desigualdad se invierte: $x \geq 3$.$it$,
   $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, null, $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, null),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-0.9), 50,
   $it$¿Cuál de estos números **no** es solución de $x \leq -2$?$it$,
   $it$$-5$$it$,
   $it$$-2$$it$,
   $it$$0$$it$,
   $it$$-3$$it$,
   $it$C$it$,
   $it$$-5$ sí es solución: está a la izquierda de $-2$ en la recta, y por lo tanto es menor.$it$,
   $it$$-2$ sí es solución. El signo es $\leq$, así que el borde entra.$it$,
   $it$Correcto. $0$ es mayor que $-2$, así que no cumple $x \leq -2$. Es el único de los cuatro que queda a la derecha del borde.$it$,
   $it$$-3$ sí es solución: entre los negativos, el que tiene mayor valor absoluto es el menor, así que $-3 < -2$.$it$,
   $it$inecuaciones/lee-mal-el-sentido-en-la-recta$it$, $it$inecuaciones/confunde-estricto-con-inclusivo$it$, null, $it$inecuaciones/lee-mal-el-sentido-en-la-recta$it$),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-0.7), 60,
   $it$¿Cuál es la solución de $2x + 1 > x + 6$?$it$,
   $it$$x > 5$$it$,
   $it$$x > 7$$it$,
   $it$$x < 5$$it$,
   $it$$x > \dfrac{7}{3}$$it$,
   $it$A$it$,
   $it$Correcto. Restando $x$ a los dos lados queda $x + 1 > 6$, y restando $1$, $x > 5$.$it$,
   $it$Sumaste el $1$ en vez de restarlo: $6+1=7$. El $1$ está sumando a la izquierda, así que pasa restando.$it$,
   $it$El valor está bien pero el signo quedó al revés. Acá solo se restó $x$ y se restó $1$ a los dos lados: ninguna de las dos operaciones da vuelta la desigualdad.$it$,
   $it$Sumaste las $x$ de los dos lados en vez de restarlas, y quedó $3x > 7$. La $x$ de la derecha pasa restando al lado izquierdo: $2x - x = x$.$it$,
   null, null, $it$inecuaciones/invierte-al-sumar-o-restar$it$, null),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-0.5), 70,
   $it$Un ascensor admite como máximo $400$ kg. Si ya subieron $250$ kg de carga, ¿qué peso $p$ puede sumarse todavía?$it$,
   $it$$p \geq 150$$it$,
   $it$$p \leq 150$$it$,
   $it$$p \leq 650$$it$,
   $it$$p < 150$$it$,
   $it$B$it$,
   $it$El planteo quedó al revés. «Como máximo $400$ kg» significa que el total no puede pasar de $400$: $250 + p \leq 400$, de donde $p$ es a lo sumo $150$, no al menos $150$.$it$,
   $it$Correcto. $250 + p \leq 400$, y restando $250$ queda $p \leq 150$.$it$,
   $it$Sumaste los $250$ al máximo en vez de restarlos. Los $250$ kg ya están arriba: ocupan parte de los $400$, no se agregan a ellos.$it$,
   $it$El valor está bien, pero dejaste afuera los $150$ kg exactos. «Como máximo $400$» incluye el $400$, así que $p = 150$ todavía se puede subir.$it$,
   $it$inecuaciones/traduce-al-reves-el-enunciado$it$, null, null, $it$inecuaciones/confunde-estricto-con-inclusivo$it$),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-0.3), 80,
   $it$¿Cuál es la solución de $\dfrac{x}{-3} \leq 2$?$it$,
   $it$$x \leq -6$$it$,
   $it$$x \geq 6$$it$,
   $it$$x \leq 6$$it$,
   $it$$x \geq -6$$it$,
   $it$D$it$,
   $it$Multiplicaste bien por $-3$ pero no invertiste el signo. Multiplicar los dos lados por un número negativo da vuelta la desigualdad.$it$,
   $it$Invertiste la desigualdad, que es lo correcto, pero el resultado quedó positivo. $2$ multiplicado por $-3$ es $-6$.$it$,
   $it$Se perdió el signo del $-3$ y tampoco se invirtió la desigualdad. El divisor es $-3$, así que el producto $2 \times (-3)$ es $-6$.$it$,
   $it$Correcto. Multiplicando por $-3$, que es negativo, la desigualdad se invierte: $x \geq -6$.$it$,
   $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, null, $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, null),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-0.15), 90,
   $it$¿Cuál es el menor número entero que cumple $4x - 5 > 3$?$it$,
   $it$$2$$it$,
   $it$$3$$it$,
   $it$$1$$it$,
   $it$$-2$$it$,
   $it$B$it$,
   $it$Resolviste bien hasta $x > 2$, pero el $2$ no cumple: la desigualdad es estricta, así que el menor entero que la cumple es el que sigue.$it$,
   $it$Correcto. $4x > 8$ da $x > 2$, y como el $2$ no entra, el menor entero que cumple es $3$.$it$,
   $it$$1$ es menor que $2$, así que no cumple $x > 2$. La pregunta pide el menor entero que sí cumple, no cualquiera que sea chico.$it$,
   $it$Restaste el $5$ en vez de sumarlo al pasarlo: $3 - 5 = -2$. El $5$ está restando a la izquierda, así que pasa sumando: $3 + 5 = 8$.$it$,
   $it$inecuaciones/confunde-estricto-con-inclusivo$it$, null, $it$inecuaciones/lee-mal-el-sentido-en-la-recta$it$, null),
  ($it$algebra$it$, $it$algebra/inecuaciones$it$,
   (-0.05), 100,
   $it$¿Cuál es la solución de $3 - 2x \geq x + 9$?$it$,
   $it$$x \leq -2$$it$,
   $it$$x \leq 4$$it$,
   $it$$x \geq -2$$it$,
   $it$$x \geq 2$$it$,
   $it$A$it$,
   $it$Correcto. $3 - 2x \geq x + 9$ da $-3x \geq 6$, y al dividir por $-3$ la desigualdad se invierte: $x \leq -2$.$it$,
   $it$Restaste la $x$ del lado equivocado o no juntaste bien los términos. Pasando $x$ a la izquierda: $-2x - x = -3x$, y pasando el $3$ a la derecha: $9 - 3 = 6$.$it$,
   $it$Llegaste a $-3x \geq 6$ y dividiste por $-3$ sin dar vuelta la desigualdad. Dividir por un negativo invierte el sentido: queda $x \leq -2$.$it$,
   $it$El signo se invirtió al revés y además se perdió el negativo del cociente. $6$ dividido por $-3$ es $-2$, y la desigualdad queda $\leq$.$it$,
   null, null, $it$inecuaciones/no-invierte-al-multiplicar-por-negativo$it$, null)

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
--   select count(*) from public.questions where topic = 'algebra';
--   -- esperado: 10 (más lo que ya hubiera)
--
--   -- Ningún ítem sin módulo: delataría un module_slug mal escrito.
--   select id from public.questions where topic = 'algebra' and module_id is null;
--   -- 0 filas
--
--   -- Ningún distractor perdió su idea errónea en el join.
--   select id, question from public.questions q
--    where topic = 'algebra'
--      and misconception_a_id is null and misconception_b_id is null
--      and misconception_c_id is null and misconception_d_id is null;
--   -- revisar: un ítem sin ninguna catalogada puede ser legítimo, varios no
--
--   -- La clave repartida (R-35): ninguna letra debe pasar del 40 %.
--   select correct_option, count(*) from public.questions
--    where topic = 'algebra' group by 1 order by 1;
--
-- Reversión: delete from public.questions where topic = 'algebra';
--            delete from public.misconceptions where slug in ('inecuaciones/no-invierte-al-multiplicar-por-negativo', 'inecuaciones/invierte-al-sumar-o-restar', 'inecuaciones/resuelve-como-igualdad', …);
