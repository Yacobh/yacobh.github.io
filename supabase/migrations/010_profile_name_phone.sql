-- Agrega nombre y teléfono al perfil propio, editables desde la nueva sección
-- "Configuración de cuenta". No hace falta policy nueva: profiles_update_own
-- (admin_rls.sql) ya permite que cada usuario actualice cualquier columna de
-- su propia fila, siempre que no cambie su `role`.

alter table public.profiles
  add column if not exists full_name text,
  add column if not exists phone text;
