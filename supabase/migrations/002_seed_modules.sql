-- Seed Baldor-aligned modules + sample resources.
-- Safe to re-run (upsert by slug).

insert into public.modules (slug, title, track, order_index, historical_blurb)
values
  ('aritmetica/numeros', 'Números y sistemas de numeración', 'aritmetica', 10,
   'Desde los sistemas egipcio y babilónico hasta la notación posicional: contar fue el primer lenguaje matemático.'),
  ('aritmetica/enteros', 'Números enteros', 'aritmetica', 20,
   'Los enteros amplían los naturales para modelar deudas, temperaturas y direcciones opuestas.'),
  ('aritmetica/fracciones', 'Fracciones y racionales', 'aritmetica', 30,
   'Las fracciones nacieron de medir lo que no cabe en unidades enteras: tierras, pan, tiempo.'),
  ('aritmetica/potencias', 'Potencias y raíces', 'aritmetica', 40,
   'La notación exponencial compacta crecimientos y áreas; las raíces invierten ese proceso.'),
  ('aritmetica/proporciones', 'Razones y proporciones', 'aritmetica', 50,
   'La regla de tres y las proporciones fueron herramientas mercantiles y astronómicas clásicas.'),
  ('aritmetica/porcentajes', 'Porcentajes', 'aritmetica', 60,
   'El porcentaje traduce proporciones a una base de cien: útil en comercio e impuestos.'),
  ('algebra/expresiones', 'Expresiones algebraicas', 'algebra', 110,
   'El álgebra simbólica (Viète, Descartes) reemplazó recetas verbales por letras y operaciones.'),
  ('algebra/ecuaciones', 'Ecuaciones lineales', 'algebra', 120,
   'Resolver “lo desconocido” unifica problemas de balances, mezclas y trayectorias simples.'),
  ('algebra/sistemas', 'Sistemas de ecuaciones', 'algebra', 130,
   'Dos condiciones simultáneas: el cruce de rectas como solución geométrica del sistema.'),
  ('algebra/polinomios', 'Polinomios y factorización', 'algebra', 140,
   'Factorizar revela estructura: raíces, productos notables y simplificación de expresiones.'),
  ('algebra/funciones', 'Funciones lineales y cuadráticas', 'algebra', 150,
   'La función formaliza dependencia: de tablas babilónicas a la gráfica cartesiana.'),
  ('geometria/basica', 'Conceptos básicos y medidas', 'geometria', 210,
   'Punto, recta y plano: el lenguaje euclidiano para describir el espacio.'),
  ('geometria/angulos', 'Ángulos y paralelismo', 'geometria', 220,
   'Los postulados de Euclides sobre paralelas estructuran la geometría plana clásica.'),
  ('geometria/triangulos', 'Triángulos', 'geometria', 230,
   'El triángulo es la figura rígida elemental; criterios de congruencia y semejanza.'),
  ('geometria/circulo', 'Circunferencia y círculo', 'geometria', 240,
   'π aparece al relacionar diámetro y perímetro; herencia griega y mediciones prácticas.'),
  ('geometria/areas', 'Áreas y perímetros', 'geometria', 250,
   'Calcular áreas conecta geometría con agrimensura y arquitectura.'),
  ('geometria/volumenes', 'Volúmenes', 'geometria', 260,
   'De sólidos platónicos a fórmulas de prismas y cilindros para capacidad y material.'),
  ('geometria/pitagoras', 'Teorema de Pitágoras', 'geometria', 270,
   'Relación entre catetos e hipotenusa: puente entre geometría y cálculo numérico.')
on conflict (slug) do update
  set title = excluded.title,
      track = excluded.track,
      order_index = excluded.order_index,
      historical_blurb = excluded.historical_blurb;

-- Map existing question topics → modules (best-effort)
update public.questions q
set module_id = m.id
from public.modules m
where q.module_id is null
  and (
    (q.topic in ('numbers_V1', 'numeros', 'Números') and m.slug = 'aritmetica/numeros')
    or (q.topic in ('enteros') and m.slug = 'aritmetica/enteros')
    or (q.topic in ('fracciones') and m.slug = 'aritmetica/fracciones')
    or (q.topic in ('potencias') and m.slug = 'aritmetica/potencias')
    or (q.topic in ('algebra', 'Álgebra') and m.slug = 'algebra/ecuaciones')
    or (q.topic in ('geometria', 'Geometría') and m.slug = 'geometria/basica')
  );

-- Sample published resources (one per priority module)
insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select m.id, 'text', 'Lectura breve: ' || m.title,
       coalesce(m.historical_blurb, '') || E'\n\nPractica los ejercicios del diagnóstico y anota dónde te trabas.',
       null, m.historical_blurb, 1, true
from public.modules m
where m.slug in (
  'aritmetica/numeros', 'aritmetica/enteros', 'aritmetica/fracciones',
  'aritmetica/potencias', 'algebra/ecuaciones', 'geometria/basica',
  'geometria/pitagoras', 'algebra/expresiones'
)
and not exists (
  select 1 from public.resources r
  where r.module_id = m.id and r.title = 'Lectura breve: ' || m.title
);
