-- Contenido Baldor-aligned más rico (capa 1). Idempotente por título.
-- Tras aplicar: los módulos prioritarios tienen lectura + tip de práctica.

-- Ampliar blurbs históricos donde falten detalle
update public.modules
set historical_blurb = case slug
  when 'aritmetica/numeros' then
    'Los egipcios usaban hieroglíficos aditivos; los babilonios, base 60. El sistema posicional indo-arábigo hizo posible la aritmética moderna que practicas aquí.'
  when 'aritmetica/enteros' then
    'Los enteros formalizan cantidades con signo: deudas, temperaturas, desplazamientos. En PAES aparecen en contextos de valor absoluto y operaciones combinadas.'
  when 'aritmetica/fracciones' then
    'Medir tierras del Nilo exigió partir la unidad. Hoy las fracciones modelan razones, probabilidades y tasas; el error típico es operar numeradores sin común denominador.'
  when 'aritmetica/potencias' then
    'La notación aⁿ compacta productos repetidos (Descartes popularizó el exponente). Cuidado con (ab)ⁿ ≠ a·bⁿ y con signos en potencias pares/impares.'
  when 'algebra/ecuaciones' then
    'Al-Juarismi describió completar el cuadrado en palabras; Viète introdujo letras. Despejar es mantener equivalencia: lo que haces a un lado, al otro.'
  when 'algebra/expresiones' then
    'Simplificar es reconocer estructura. Productos notables y factor común reducen ruido antes de resolver ecuaciones o graficar.'
  when 'geometria/basica' then
    'Euclides axiomatizó punto, recta y plano. Medir longitudes y ángulos es el puente entre figura y número en la PAES.'
  when 'geometria/pitagoras' then
    'a²+b²=c² en triángulos rectángulos: de tablillas babilónicas a demostraciones euclidianas. Úsalo también a la inversa para detectar ángulo recto.'
  else historical_blurb
end
where slug in (
  'aritmetica/numeros','aritmetica/enteros','aritmetica/fracciones','aritmetica/potencias',
  'algebra/ecuaciones','algebra/expresiones','geometria/basica','geometria/pitagoras'
);

-- Recurso de práctica (exercise) por módulo prioritario
insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select
  m.id,
  'exercise',
  'Práctica guiada: ' || m.title,
  E'1. Relee el blurb histórico del módulo.\n'
  || E'2. Resuelve 3 ítems del diagnóstico en este tema sin calculadora.\n'
  || E'3. Anota la idea errónea de cada distractor que elegiste (capa 0 del plan).\n'
  || E'4. Vuelve a un cupo de tu banda cuando tengas al menos una duda concreta para la clase.',
  null,
  m.historical_blurb,
  2,
  true
from public.modules m
where m.slug in (
  'aritmetica/numeros','aritmetica/enteros','aritmetica/fracciones','aritmetica/potencias',
  'algebra/ecuaciones','algebra/expresiones','geometria/basica','geometria/pitagoras',
  'geometria/triangulos','algebra/sistemas'
)
and not exists (
  select 1 from public.resources r
  where r.module_id = m.id and r.title = 'Práctica guiada: ' || m.title
);

-- Tip de video (URL placeholder editable en Admin → Recursos)
insert into public.resources (module_id, type, title, body, media_url, historical_context, order_index, published)
select
  m.id,
  'video_url',
  'Video sugerido: ' || m.title,
  'Sustituye la URL en Admin → Recursos por tu lectura/grabación del módulo. Mientras tanto usa la capa 0 del plan (explicaciones del diagnóstico).',
  null,
  m.historical_blurb,
  3,
  false
from public.modules m
where m.slug in (
  'aritmetica/enteros','aritmetica/fracciones','algebra/ecuaciones','geometria/pitagoras'
)
and not exists (
  select 1 from public.resources r
  where r.module_id = m.id and r.title = 'Video sugerido: ' || m.title
);
