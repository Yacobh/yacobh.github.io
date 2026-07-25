-- Gestión de roles desde el panel de administración.
-- Ejecutar en Supabase SQL Editor (después de admin_rls.sql).
--
-- Contexto: la policy `profiles_update_own` de admin_rls.sql solo permite que
-- cada usuario se actualice a sí mismo Y sin cambiar su rol. Por eso el panel
-- no podía promover ni degradar a nadie: el UPDATE afectaba 0 filas.
--
-- Esta migración agrega una policy adicional (las policies permisivas se
-- combinan con OR) para que un admin pueda cambiar el rol de OTROS usuarios.

-- ---------------------------------------------------------------------------
-- RLS: un admin puede modificar perfiles ajenos
-- ---------------------------------------------------------------------------

-- La condición `id <> auth.uid()` es una salvaguarda deliberada: impide que un
-- admin se quite el rol a sí mismo y deje la instalación sin administradores.
-- Para traspasar el rol, primero se promueve a la otra cuenta.
drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
  on public.profiles for update
  to authenticated
  using (public.is_admin() and id <> auth.uid())
  with check (public.is_admin() and id <> auth.uid());

-- ---------------------------------------------------------------------------
-- Salvaguarda a nivel de datos: nunca quedarse sin admins
-- ---------------------------------------------------------------------------

create or replace function public.prevent_last_admin_removal()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  remaining int;
begin
  if old.role = 'admin' and new.role <> 'admin' then
    select count(*)::int into remaining
    from public.profiles
    where role = 'admin' and id <> old.id;

    if remaining = 0 then
      raise exception
        'No se puede quitar el último administrador (%). Promueve otra cuenta primero.',
        old.email;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_protect_last_admin on public.profiles;
create trigger profiles_protect_last_admin
  before update of role on public.profiles
  for each row execute function public.prevent_last_admin_removal();

-- ---------------------------------------------------------------------------
-- Índices para las métricas del resumen del panel
-- ---------------------------------------------------------------------------

-- El resumen cuenta tests por fecha y recursos por estado de publicación.
create index if not exists tests_created_at_idx
  on public.tests (created_at desc);

create index if not exists guestbook_is_approved_idx
  on public.guestbook (is_approved);
