-- Corrige profiles.created_at: el backfill de admin_rls.sql (líneas 67-71) insertaba
-- perfiles sin created_at explícito, así que tomaban el default now() (fecha de
-- ejecución del script) en vez de la fecha real de registro en auth.users.
-- Ejecutar en Supabase SQL Editor.

-- 1) Backfill de datos: alinear profiles.created_at con auth.users.created_at.
update public.profiles p
set created_at = u.created_at
from auth.users u
where p.id = u.id
  and p.created_at is distinct from u.created_at;

-- 2) Evitar que vuelva a pasar: el trigger fija created_at desde auth.users
--    en vez de depender del default now() de la tabla.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, created_at)
  values (new.id, new.email, 'user', new.created_at)
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;
