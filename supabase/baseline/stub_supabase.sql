-- Stub mínimo de lo que Supabase trae de fábrica y las migraciones dan por
-- supuesto. SOLO para reconstruir el esquema en un PostgreSQL vacío
-- (`scripts/reconstruir_esquema.sh`, T-48). No se aplica nunca en Supabase.
--
-- No imita Auth: `auth.uid()` lee un setting, que es lo que hace el de
-- Supabase por debajo (`request.jwt.claim.sub`).

do $$ declare r text; begin
  foreach r in array array['anon', 'authenticated', 'service_role'] loop
    if not exists (select 1 from pg_roles where rolname = r) then
      execute format('create role %I nologin', r);
    end if;
  end loop;
end $$;

create schema if not exists auth;

create table if not exists auth.users (
  id                 uuid primary key default gen_random_uuid(),
  email              text,
  raw_user_meta_data jsonb,
  created_at         timestamptz default now()
);

create or replace function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;

create or replace function auth.role() returns text language sql stable as $$
  select nullif(current_setting('request.jwt.claim.role', true), '')
$$;

create or replace function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
$$;

grant usage on schema auth to anon, authenticated, service_role;
grant usage on schema public to anon, authenticated, service_role;

-- Los privilegios por defecto de Supabase sobre `public` (R-46, T-163):
-- toda tabla, función y secuencia nueva nace concedida a los tres roles.
alter default privileges in schema public grant all on tables    to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
