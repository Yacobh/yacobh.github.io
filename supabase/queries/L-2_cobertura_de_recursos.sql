-- Verificación del criterio **L-2** de "listo para promocionar"
-- ([[../../project-memory/PROJECT_BRIEF]] §6):
--
--     "Nadie termina el diagnóstico sin material que estudiar:
--      ≥1 recurso PUBLICADO en los 18 módulos."
--
-- ⚠ SOLO LECTURA. No crea, no modifica, no borra. Se pega en el SQL Editor de
-- Supabase y se corre de a un bloque.
--
-- PARA QUÉ: la migración `044` deja sus 18 recursos con `published = false` a
-- propósito (ADR-016: la IA redacta, **el profesor publica**). Aplicarla NO
-- cumple L-2 por sí sola -- un recurso sin publicar es invisible para el
-- estudiante, porque la policy `resources_select_published` filtra por
-- `published = true`. Estos bloques distinguen las tres cosas que es fácil
-- confundir: qué existe, qué está publicado, y qué le falta a L-2.

-- ============================================================
-- BLOQUE A -- ¿Llegó la migración 044?
-- ============================================================
-- ESPERADO: 18 filas en total, repartidas 3/4/3/4/4.
-- SI SALE 0 en algún módulo: la migración no se aplicó completa, o el slug del
-- módulo no coincide (el `insert ... select from modules where slug = ...` no
-- inserta nada y **no da error** -- ese es su modo de fallo silencioso).

select m.slug,
       count(r.id) as recursos_de_044
from public.modules m
left join public.resources r
  on r.module_id = m.id
 and r.title in (
   'Ángulos: cómo se miden y los pares que siempre aparecen',
   'Dos paralelas cortadas por una transversal',
   'Ángulos interiores de un polígono',
   'Los ángulos de un triángulo suman 180 grados',
   'Semejanza: misma forma, distinto tamaño',
   'Área del triángulo y cuál es la altura correcta',
   'Desigualdad triangular: cuándo tres medidas no forman un triángulo',
   'Perímetro y área del círculo: dónde va el radio',
   'Ángulo del centro y ángulo inscrito',
   'Sector circular y longitud de arco',
   'Áreas de los cuadriláteros, todas en una sola idea',
   'Figuras compuestas: sumar y restar en vez de buscar una fórmula',
   'Qué le pasa al área cuando cambian las medidas',
   'Unidades de área: el factor no es 100, es 10.000',
   'Prisma y cilindro: área basal por altura',
   'Pirámide y cono: exactamente un tercio',
   'Esfera: volumen y superficie',
   'Volumen y capacidad: de centímetros cúbicos a litros'
 )
where m.track = 'geometria'
group by m.slug
order by m.slug;

-- ============================================================
-- BLOQUE B -- El criterio L-2, módulo por módulo
-- ============================================================
-- ESPERADO al cerrar L-2: ninguna fila con estado '⛔ SIN MATERIAL'.
-- `sin_publicar` > 0 con `publicados` = 0 significa que el contenido ya está
-- en la base pero el estudiante todavía no lo ve: falta publicarlo desde
-- Admin → Recursos.

select m.track,
       m.slug,
       m.name,
       count(*) filter (where r.published)                as publicados,
       count(*) filter (where not r.published)            as sin_publicar,
       case
         when count(*) filter (where r.published) > 0 then '✅ ok'
         when count(*) filter (where not r.published) > 0 then '⏳ escrito, falta publicar'
         else '⛔ SIN MATERIAL'
       end as estado_L2
from public.modules m
left join public.resources r on r.module_id = m.id
group by m.track, m.slug, m.name
order by m.track, m.slug;

-- ============================================================
-- BLOQUE C -- El veredicto en una sola fila
-- ============================================================
-- ESPERADO al cerrar L-2: modulos_con_material = modulos_totales, y
-- veredicto = '✅ L-2 CUMPLIDO'.

with cobertura as (
  select m.id,
         count(*) filter (where r.published) > 0 as tiene_publicado
  from public.modules m
  left join public.resources r on r.module_id = m.id
  group by m.id
)
select count(*)                                    as modulos_totales,
       count(*) filter (where tiene_publicado)     as modulos_con_material,
       count(*) filter (where not tiene_publicado) as modulos_sin_material,
       case
         when count(*) filter (where not tiene_publicado) = 0
           then '✅ L-2 CUMPLIDO'
         else '⛔ L-2 pendiente'
       end as veredicto
from cobertura;

-- ============================================================
-- BLOQUE D -- Cola de revisión: qué falta publicar y en qué orden
-- ============================================================
-- Es la lista de trabajo para Admin → Recursos. `order_index` es el orden en
-- que el estudiante los verá dentro de su módulo.
--
-- ⚠ Publicar es una decisión **pedagógica** y humana (ADR-016). La auditoría
-- que acompaña a `044` verificó **72 cuentas, 0 fallas** -- eso dice que la
-- aritmética está bien, **no** que el texto enseñe bien.

select m.track, m.slug, r.order_index, r.title
from public.resources r
join public.modules m on m.id = r.module_id
where not r.published
order by m.track, m.slug, r.order_index;

-- ============================================================
-- BLOQUE E -- Control de que 044 no duplicó nada
-- ============================================================
-- La migración es idempotente (`where not exists` por título), pero si alguna
-- vez se edita un título y se re-ejecuta, aparecerían duplicados.
-- ESPERADO: 0 filas.

select m.slug, r.title, count(*) as veces
from public.resources r
join public.modules m on m.id = r.module_id
group by m.slug, r.title
having count(*) > 1
order by m.slug;
