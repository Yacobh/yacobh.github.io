-- Columnas opcionales para contacto alternativo (teléfono/correo) cuando el
-- visitante no tiene sesión, capturadas por el nuevo panel de contacto
-- flotante — no se mezclan en `extra` (jsonb de metadata curada por el
-- sistema, ver 016), porque `extra` sigue siendo contexto del sistema, no
-- datos que el usuario tipea a mano.
--
-- IMPORTANTE antes de aplicar: verificar la policy INSERT vigente de
-- `contacto` (select * from pg_policies where tablename = 'contacto';). Si
-- está expresada con una lista explícita de columnas (`with check` por
-- columna, poco común en RLS pero posible vía grants), hay que ampliarla
-- aquí también. Si es `with check (true)` o no restringe por columna, no
-- requiere cambios.

alter table public.contacto
  add column if not exists telefono text,
  add column if not exists correo text;
