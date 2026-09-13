-- T-110 · De dónde viene una fila de `tests`: la columna `origin`.
--
-- PARA QUÉ. Desde ADR-032 el owner depura un ítem **rindiéndolo**: abre el
-- diagnóstico, corrige la explicación del distractor y vuelve a servir la misma
-- pregunta. Cada una de esas corridas deja una fila en `tests` **indistinguible
-- de la de un estudiante real** —con el `user_id` de quien conoce la clave— y
-- **concentrada justo en los ítems que más se depuraron**.
--
-- Calibrar `difficulty` con eso adentro no produce un banco calibrado: produce
-- uno sesgado hacia la facilidad **en correlación con la variable de interés**,
-- que es la peor forma de sesgo porque no se nota mirando los promedios. Es
-- [[../project-memory/RISKS]] R-37, y es **precondición dura de G-2**.
--
-- Hasta hoy el único modo de separarlas era excluir por `user_id` a mano en cada
-- consulta —así lo hace `../queries/T-130_mapa_de_errores_de_un_curso.sql`—, lo
-- que significa que la regla vive en la memoria de quien escribe la consulta.
-- Esta migración la mueve a la base.
--
-- ⭐ POR QUÉ UN TRIGGER Y NO EL CLIENTE. La ficha de T-110 proponía escribir
-- `'admin_preview'` desde `:test/complete` cuando `:auth/admin?`. Un trigger es
-- mejor por tres razones concretas:
--
--   1. **No es falsificable.** `:auth/admin?` es estado de UI, y [[../../CLAUDE]]
--      §7 es explícito: los checks de UI son UX, el control real es SQL. Si el
--      origen lo escribe el cliente, cualquiera puede mandar `'admin_preview'` y
--      sacarse de la muestra de calibración.
--   2. **No necesita recompilar el bundle.** `public/js/app.js` está versionado
--      (ADR-003) y una migración que depende de un despliegue de cliente tiene
--      una ventana en la que los datos entran mal. Acá no hay ventana: desde el
--      instante en que se aplica, **toda** fila nueva queda marcada, la sirva el
--      bundle que la sirva.
--   3. **Reusa el único primitivo de autorización que el proyecto ya tiene**,
--      `public.is_admin()` (`../admin_rls.sql`), en vez de inventar un segundo
--      criterio que pueda desincronizarse del primero.
--
-- ⚠️ CONSECUENCIA ACEPTADA. Si el owner rinde un diagnóstico **en serio** —para
-- sí mismo, no para depurar—, esa fila igual queda como `'admin_preview'`. Se
-- acepta a propósito: para calibrar conviene excluir igual a quien escribió los
-- ítems y conoce las claves. Si alguna vez hace falta lo contrario, se corrige
-- esa fila con un `update` puntual, que es más barato que hacer el trigger
-- condicional y volver a abrir la puerta de la falsificación.
--
-- Es **puramente aditiva** y no toca ninguna policy: una columna, un check, un
-- backfill y un trigger `before insert`. El cliente **no cambia**.

-- -----------------------------------------------------------------------------
-- 1. La columna
-- -----------------------------------------------------------------------------
alter table public.tests
  add column if not exists origin text;

-- -----------------------------------------------------------------------------
-- 2. Backfill — escribir un dato que siempre fue verdad
-- -----------------------------------------------------------------------------
-- Mismo criterio que el backfill de `engine_version` en `048`: las filas
-- existentes **ya tienen** un origen, solo que nadie lo había anotado. Se deriva
-- del rol actual de quien las rindió.
--
-- Supuesto declarado: **hoy el único admin es el owner**, y nadie pasó de
-- estudiante a admin después de haber rendido. Si eso dejara de ser cierto,
-- este backfill marcaría como `admin_preview` corridas que fueron de estudiante.
-- Con un solo admin es exacto; queda escrito para que no se dé por obvio.
update public.tests t
   set origin = case
                  when exists (select 1
                                 from public.profiles p
                                where p.id = t.user_id
                                  and p.role = 'admin')
                  then 'admin_preview'
                  else 'student'
                end
 where t.origin is null;

-- -----------------------------------------------------------------------------
-- 3. Default, check y not null — en ese orden
-- -----------------------------------------------------------------------------
-- El check va **después** del backfill (lección de `048`: con filas todavía en
-- null, agregarlo primero falla).
alter table public.tests
  alter column origin set default 'student';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'tests_origin_valido'
  ) then
    alter table public.tests
      add constraint tests_origin_valido
      check (origin in ('student', 'admin_preview'));
  end if;
end
$$;

alter table public.tests
  alter column origin set not null;

comment on column public.tests.origin is
  'Quién produjo esta fila. ''student'' = una persona rindiendo de verdad. '
  '''admin_preview'' = una corrida de depuración de un admin (ADR-032), que NO '
  'debe entrar a la calibración del banco (R-37, T-110, G-2). Lo escribe el '
  'trigger tests_marcar_origen a partir de public.is_admin(): el cliente no lo '
  'envía y no lo puede falsificar. Toda consulta de calibración o de métricas '
  'de estudiantes filtra por origin = ''student''.';

-- -----------------------------------------------------------------------------
-- 4. El trigger que lo escribe
-- -----------------------------------------------------------------------------
-- `security definer` + `search_path` fijo, igual que `is_admin()` y que
-- `handle_new_user()` (`008`): el trigger corre con los permisos del dueño y no
-- depende del `search_path` de quien inserta.
--
-- Sobrescribe siempre el valor entrante, **incluso si viene uno**. Esa es la
-- propiedad que lo hace no falsificable, y es deliberada: no hay ningún caso en
-- que el cliente sepa mejor que la base quién está insertando.
create or replace function public.tests_marcar_origen()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.origin := case when public.is_admin() then 'admin_preview' else 'student' end;
  return new;
end;
$$;

drop trigger if exists tests_marcar_origen on public.tests;
create trigger tests_marcar_origen
  before insert on public.tests
  for each row
  execute function public.tests_marcar_origen();

-- -----------------------------------------------------------------------------
-- 5. Índice parcial
-- -----------------------------------------------------------------------------
-- Las consultas de calibración y del panel piden `origin = 'student'`, que va a
-- ser la gran mayoría de las filas; el índice útil es el de la minoría, para que
-- «muéstrame mis corridas de depuración» no recorra la tabla entera.
create index if not exists tests_origin_admin_idx
  on public.tests (origin) where origin = 'admin_preview';

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano después de aplicar; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- select origin, count(*) from public.tests group by 1 order by 2 desc;
--   → esperado: 'student' la mayoría, 'admin_preview' las corridas del owner.
--
-- select count(*) from public.tests where origin is null;   → esperado: 0
--
-- Después de rendir un diagnóstico como admin y otro como estudiante:
-- select id, "email-user", origin, created_at from public.tests
--  order by created_at desc limit 2;
--   → esperado: una fila de cada uno, con el origen correcto y **sin** que el
--     cliente haya enviado la columna.

-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
-- drop trigger if exists tests_marcar_origen on public.tests;
-- drop function if exists public.tests_marcar_origen();
-- drop index if exists tests_origin_admin_idx;
-- alter table public.tests drop constraint if exists tests_origin_valido;
-- alter table public.tests drop column if exists origin;
