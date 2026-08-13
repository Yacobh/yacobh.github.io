-- 043 · Apariencia por defecto del sitio, configurable desde el panel
--
-- PARA QUÉ
-- --------
-- Hasta ahora, el primer visitante veía el tema que dictara su sistema
-- operativo (`prefers-color-scheme`, ver ADR-012). Eso significa que la primera
-- impresión del producto —la que decide si alguien se queda— la elegía el
-- navegador y no el profesor.
--
-- Esta tabla le da esa decisión al owner. **No es un selector de paletas:** la
-- identidad es una sola (ADR-022, lenguaje Braun). Lo que se configura es qué
-- apariencia ve alguien que llega por primera vez.
--
-- POR QUÉ UNA TABLA Y NO UNA CONSTANTE
-- ------------------------------------
-- Una constante en ClojureScript exigiría recompilar y commitear el bundle
-- para cambiar un ajuste de presentación (ADR-003). La tabla lo vuelve un
-- cambio de un clic, que es lo que el owner pidió.
--
-- FORMA: UNA SOLA FILA
-- --------------------
-- `id` es un booleano fijado en `true` con un `check`. Es el idioma estándar
-- para una tabla de configuración global: hace **imposible** insertar una
-- segunda fila, en vez de confiar en que nadie lo haga. Sin esto, "la
-- configuración" sería la primera fila que devolviera el `select`, que es un
-- error que aparece meses después y cuesta encontrar.

create table if not exists public.site_settings (
  id boolean primary key default true,
  theme_default text not null default 'sistema',
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  constraint site_settings_una_sola_fila check (id),
  constraint site_settings_theme_valido
    check (theme_default in ('claro', 'oscuro', 'sistema'))
);

insert into public.site_settings (id, theme_default)
values (true, 'sistema')
on conflict (id) do nothing;

-- RLS EN LA MISMA MIGRACIÓN (regla 1 de CLAUDE.md §7: tabla nueva = policies
-- en el mismo archivo; sin policy no hay acceso).
alter table public.site_settings enable row level security;

-- Lectura pública **a propósito**: el visitante anónimo necesita saber qué
-- apariencia mostrar antes de autenticarse, que es justo el caso de uso. No hay
-- nada sensible acá — es la misma información que se deduce mirando la página.
drop policy if exists site_settings_select_todos on public.site_settings;
create policy site_settings_select_todos
  on public.site_settings for select
  using (true);

-- Escritura solo admin, con la misma función que el resto del esquema.
drop policy if exists site_settings_update_admin on public.site_settings;
create policy site_settings_update_admin
  on public.site_settings for update
  using (public.is_admin())
  with check (public.is_admin());

comment on table public.site_settings is
  'Configuración global del sitio, una sola fila. Ver ADR-022.';
comment on column public.site_settings.theme_default is
  'Apariencia que ve un visitante sin preferencia guardada: claro | oscuro | sistema. La elección local del visitante gana sobre esto.';

-- -----------------------------------------------------------------------------
-- Verificación
-- -----------------------------------------------------------------------------
--   select * from public.site_settings;              -- exactamente 1 fila
--
--   -- El check impide una segunda fila:
--   insert into public.site_settings (id) values (false);
--   -- ERROR: violates check constraint "site_settings_una_sola_fila"
--
--   -- Y un valor inventado:
--   update public.site_settings set theme_default = 'sepia';
--   -- ERROR: violates check constraint "site_settings_theme_valido"
--
--   -- RLS: un anónimo lee pero no escribe.
--   select count(*) from pg_policies
--    where tablename = 'site_settings';              -- 2
--
-- Reversión:
--   drop table if exists public.site_settings;
