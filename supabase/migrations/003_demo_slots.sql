-- Cupos demo (opcional). Ajusta starts_at a fechas futuras reales.
-- Requiere 001_mvp_schema.sql.

insert into public.class_slots
  (theta_band, track, modality, starts_at, location_or_link, capacity, min_enrollments, status, title)
values
  ('basico', 'aritmetica', 'online',
   (now() + interval '7 days')::timestamptz,
   'https://meet.example.com/basico-aritmetica', 8, 3, 'open',
   'Grupo básico · Aritmética (online)'),
  ('basico', 'aritmetica', 'presencial',
   (now() + interval '10 days')::timestamptz,
   'Iquique — sala a confirmar', 6, 3, 'open',
   'Grupo básico · Aritmética (presencial)'),
  ('intermedio', 'algebra', 'online',
   (now() + interval '8 days')::timestamptz,
   'https://meet.example.com/intermedio-algebra', 8, 3, 'open',
   'Grupo intermedio · Álgebra (online)');
