-- T-134 · Que un diagnóstico abandonado deje rastro: la tabla `intentos`.
--
-- PARA QUÉ. Hoy el abandono es **invisible**. El único `insert` del diagnóstico
-- sale de `:test/complete` (`src/universo/events/test.cljs`), con el JSON
-- entero y una sola vez. Un estudiante que responde ocho ítems y cierra la
-- pestaña no deja **nada**: ni una fila, ni una respuesta, ni el ítem en el que
-- se fue. Eso rompe dos cosas a la vez:
--
--   1. **«Cuáles no lo hicieron»** no se puede responder. Es la mitad del
--      problema que abrió la épica E9, y es lo primero que pregunta un colegio
--      cuando se le muestra el mapa de errores de un curso (G-1).
--   2. **Sesga la calibración.** Los ítems que hacen abandonar desaparecen de
--      la muestra, justo los que más importan para estimar dificultad (G-2).
--      Es el mismo modo de sesgo que `067` acaba de cerrar por el otro lado:
--      correlacionado con la variable de interés, invisible en los promedios.
--
-- ── ⭐ POR QUÉ UNA TABLA NUEVA Y NO UNA COLUMNA EN `tests` (ADR-036) ─────────
-- La ficha de T-134 proponía como opción (a) insertar la fila en `tests` al
-- empezar y actualizarla al completar. Se descartó por dos razones medidas en
-- el propio repositorio, no por gusto:
--
--   · **`tests` es append-only desde el cliente y conviene que siga siéndolo.**
--     Sus únicas policies son `tests_insert_own` y `tests_select_own` (`023`):
--     hoy nadie puede reescribir un resultado ya rendido. La opción (a) obliga
--     a abrir una policy de UPDATE sobre la tabla que guarda la medición, y a
--     defenderla con un trigger. Es superficie nueva sobre el activo del
--     proyecto.
--   · **Al menos seis lectores de `tests` asumen «fila = medición terminada»**,
--     y los seis fallan en silencio si uno se olvida de filtrar:
--     `universo.access/best-theta-by-topic` (toma el **máximo** θ del historial:
--     un intento abandonado con un θ parcial inflado desbloquearía un topic que
--     el estudiante no ganó), el dashboard, `universo.profile`, los contadores
--     del panel, la vista `tests_sin_identidad` y
--     `queries/T-130_mapa_de_errores_de_un_curso.sql`. Es exactamente la clase
--     de omisión que este proyecto ya pagó dos veces (L-22, L-46).
--
-- Con una tabla aparte, `tests` no cambia de significado y esos seis lectores
-- siguen siendo correctos **sin tocar una línea**. El precio es que «quiénes no
-- terminaron» sale de una tabla distinta que «quiénes sí», y que T-133 hace un
-- join. Se paga con gusto.
--
-- ── QUÉ ES UNA FILA DE `intentos` ──────────────────────────────────────────
-- Una fila por **intento iniciado**, creada al abrir el diagnóstico y
-- reescrita entera después de cada respuesta. Al completar se le sella
-- `cerrado_en`. Entonces:
--
--     abandonado  ⇔  cerrado_en is null  y  hace rato que no se toca
--
-- **No hay estado 'abandonado' que alguien tenga que escribir**, y por eso no
-- hace falta ningún job de limpieza ni ninguna tarea programada: nadie puede
-- avisar que cerró la pestaña. El estado se *deriva*, con
-- `public.intento_abandonado()` más abajo, que es la única definición de la
-- regla del lado del servidor.
--
-- ── ⚠️ LA CLAVE `email` DEL JSONB: L-46 OTRA VEZ, ANTES DE QUE PASE ─────────
-- `tests.test` tiene una clave `email` en 348 de sus 350 filas, y eso obligó a
-- crear `tests_sin_identidad` el 2026-09-18 después de haberle dado lectura a
-- los roles del agente. El mapa `:test` de `app-db` —del que sale este
-- `parcial`— tiene esa misma clave.
--
-- Acá se corta de los dos lados: el cliente manda un `parcial` recortado (solo
-- respuestas, θ, historial y parada) **y** el trigger `intentos_sellar` le saca
-- `email` de todas formas. El cliente es UX; la base es el límite (CLAUDE.md
-- §7). Si mañana alguien escribe por el SQL Editor, o por PostgREST a mano, la
-- clave igual no entra.
--
-- ── POR QUÉ NO HAY NINGUNA VISTA SOBRE `intentos` ──────────────────────────
-- Sería lo natural para publicar «los abandonados», y es una trampa.
--
-- Una vista se ejecuta con los permisos de **su dueño**, no de quien consulta,
-- así que una vista sobre una tabla con RLS por `auth.uid()` **la saltea
-- entera**: cualquier usuario autenticado vería los intentos de todos. Desde
-- PG15 existe `with (security_invoker = true)` para evitarlo, y producción es
-- PG **17.6**, o sea que la herramienta está — pero es **opt-in y silenciosa**:
-- una vista a la que se le olvida esa cláusula no falla, no avisa, y publica
-- todo. Para una tabla con respuestas de estudiantes menores de edad, una regla
-- de privacidad que depende de que nadie olvide una cláusula no es una regla.
--
-- La regla vive entonces en una función (`intento_abandonado`) y las consultas
-- la llaman sobre la tabla, con su RLS puesta. (`tests_sin_identidad` sí es una
-- vista, pero al revés: existe para *restringir* a dos roles de servidor que no
-- pasan por PostgREST, y ahí que corra como su dueño es justo lo que se busca.)
--
-- Es **puramente aditiva**: una tabla nueva, una función, dos triggers, tres
-- policies, dos índices y una columna nullable en `tests`. No toca ninguna
-- policy existente y no modifica ninguna fila.
--
-- Orden de despliegue (R-39): **migración primero, bundle después.** El cliente
-- trae red propia igual —si la tabla no existe deja de latir en silencio y el
-- diagnóstico sigue funcionando— pero sin la migración no hay rastro ninguno.
--
-- ⚠️ **QUIÉN LA APLICA: el owner, no el agente.** Medido contra producción el
-- 2026-09-19 con el rol `claude_ddl` de ADR-040, tres sentencias de acá lo
-- exceden y las tres fallan:
--
--     alter table public.tests add column intento_id  → must be owner of table tests
--     references auth.users(id)                       → permission denied for schema auth
--     create or replace view tests_sin_identidad      → must be owner of view
--
-- No es un defecto del rol: es la línea que ADR-040 trazó a propósito entre
-- **agregar contenido** (reversible con un `delete`) y **cambiar la forma de la
-- base**. Esta migración es de las segundas.

-- -----------------------------------------------------------------------------
-- 1. La tabla
-- -----------------------------------------------------------------------------
create table if not exists public.intentos (
  -- uuid y no bigserial **a propósito**: lo genera el cliente antes de que la
  -- fila exista, así puede seguir latiendo sobre el mismo id aunque la
  -- respuesta del insert se pierda en la red. Con un serial habría que leerlo
  -- de vuelta y un `insert().select()` es una ida y vuelta más en el peor
  -- momento, que es el arranque del test.
  id             uuid primary key default gen_random_uuid(),

  user_id        uuid not null references auth.users(id) on delete cascade,
  topic          text not null,

  -- Mismo significado y mismos valores que `tests.origin` (067). Lo escribe el
  -- trigger a partir de `public.is_admin()`; el cliente no lo manda y no lo
  -- puede falsificar. Sin esto, las corridas de depuración del owner —que desde
  -- ADR-032 son muchas— entrarían a la muestra de abandono como si fueran
  -- estudiantes que se fueron.
  origin         text not null default 'student',

  -- Con qué reglas se estimó el θ parcial (ADR-034). Mismo criterio que
  -- `tests.engine_version`: un θ solo significa algo junto a las reglas que lo
  -- produjeron, y un θ parcial todavía menos.
  engine_version integer,

  -- El rastro. Se reescribe **entero** en cada latido, no se acumula por
  -- parches: así deshacer una respuesta (`:test/reintentar-ultimo`, ADR-032)
  -- queda reflejado solo, sin ninguna operación de borrado.
  --
  -- Forma esperada (la arma `universo.rastro/parcial`):
  --   {"responses": [...], "theta": -0.8, "theta-history": [...],
  --    "stop-reason": null, "topic": "numeros", "stop-config": {...}}
  --
  -- **Deliberadamente NO incluye `questions`**: el enunciado completo de cada
  -- ítem servido pesa, y se reescribiría en cada una de las ~17 respuestas de
  -- un test. Lo que la calibración necesita son las respuestas, y cada una ya
  -- trae `question-id`, `difficulty`, `weight` y `module-slug`.
  parcial        jsonb not null default '{}'::jsonb,

  -- Denormalizado a propósito: `jsonb_array_length(parcial->'responses')` en un
  -- `where` no usa índice y la pregunta «cuántos respondieron al menos uno» es
  -- justo la que más se va a hacer.
  n_respuestas   integer not null default 0,

  iniciado_en    timestamptz not null default now(),

  -- Lo estampa el trigger, **nunca el cliente**: de este valor depende la
  -- definición de abandono, así que no puede venir de un reloj que el navegador
  -- controla.
  updated_at     timestamptz not null default now(),

  -- null = no terminó. **También lo estampa el trigger**, no el cliente: éste
  -- solo manda «ciérralo» poniendo cualquier valor no nulo y el servidor decide
  -- cuándo fue. Se escribe una sola vez y el trigger impide volver a abrirlo.
  cerrado_en     timestamptz,

  constraint intentos_origin_valido
    check (origin in ('student', 'admin_preview')),
  constraint intentos_n_respuestas_no_negativo
    check (n_respuestas >= 0),
  constraint intentos_engine_version_positiva
    check (engine_version is null or engine_version >= 1),
  -- Un intento no puede haberse cerrado antes de empezar. Barato, y atrapa un
  -- reloj de cliente corrido si alguna vez `cerrado_en` dejara de venir de now().
  constraint intentos_cierre_posterior
    check (cerrado_en is null or cerrado_en >= iniciado_en)
);

comment on table public.intentos is
  'Un intento de diagnóstico **iniciado**, con su rastro parcial. Se crea al '
  'abrir el test y se reescribe tras cada respuesta; `cerrado_en` se sella al '
  'completar. Un intento con `cerrado_en is null` que hace rato que no se toca '
  'es un abandono — usar public.intento_abandonado(), que es la única '
  'definición de la regla. `tests` sigue siendo la tabla de mediciones '
  'TERMINADAS y no cambió de significado (ADR-036, T-134).';

comment on column public.intentos.parcial is
  'Rastro del intento: respuestas, θ, historial de θ, razón de parada y config '
  'de parada. NO trae los enunciados y NO trae ninguna clave `email`: el '
  'trigger intentos_sellar se la saca aunque alguien la mande (L-46).';

comment on column public.intentos.cerrado_en is
  'null = el intento no llegó a `:test/complete`. Nadie escribe «abandonado»: '
  'quien cierra la pestaña no avisa, así que el estado se deriva del tiempo '
  'sin latir. Se sella una sola vez; el trigger impide reabrirlo.';

-- -----------------------------------------------------------------------------
-- 2. La definición de abandono, en un solo lugar
-- -----------------------------------------------------------------------------
-- ⚠️ ESTA FUNCIÓN ES LA FUENTE DE VERDAD. `universo.rastro/abandonado?` es su
-- espejo en el cliente y tiene test propio, igual que la confirmación de cupo
-- se testea en `universo.slots.logic` documentando que manda el trigger SQL
-- (CLAUDE.md §8). Si la ventana cambia, cambia acá primero.
--
-- **Por qué dos horas.** El diagnóstico dura 5,8 minutos de mediana, medido
-- sobre corridas reales (SESSION-046, que refutó el supuesto de los 20). Dos
-- horas son ~20 veces esa mediana y más que cualquier `max_minutes` configurado
-- en `test_configs`: no existe la sesión lenta pero real que esta ventana
-- pueda clasificar mal. Es ancha a propósito — el error caro es decirle
-- «abandonó» a alguien que está pensando, no tardar en contarlo.
--
-- `stable` y no `immutable`: depende de now().
create or replace function public.intento_abandonado(
  p_cerrado_en timestamptz,
  p_updated_at timestamptz
)
returns boolean
language sql
stable
as $$
  select p_cerrado_en is null
     and p_updated_at < now() - interval '2 hours';
$$;

comment on function public.intento_abandonado(timestamptz, timestamptz) is
  'Única definición de «intento abandonado»: no se cerró y hace más de 2 horas '
  'que no late. Ventana ≈20× la duración mediana medida del diagnóstico. '
  'Espejo en el cliente: universo.rastro/abandonado? (ADR-036).';

-- -----------------------------------------------------------------------------
-- 3. El origen, igual que en `067` y por las mismas razones
-- -----------------------------------------------------------------------------
-- `security definer` + `search_path` fijo, como `is_admin()` y `handle_new_user()`.
-- Sobrescribe siempre el valor entrante: no hay ningún caso en que el cliente
-- sepa mejor que la base quién está insertando.
create or replace function public.intentos_marcar_origen()
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

drop trigger if exists intentos_marcar_origen on public.intentos;
create trigger intentos_marcar_origen
  before insert on public.intentos
  for each row
  execute function public.intentos_marcar_origen();

-- -----------------------------------------------------------------------------
-- 4. El trigger que hace cumplir todo lo demás
-- -----------------------------------------------------------------------------
-- Tres trabajos que **no pueden** quedar del lado del cliente:
--
--   (a) sacar la clave `email` del jsonb, siempre, venga de donde venga;
--   (b) estampar `updated_at` **y `cerrado_en`** con el reloj del servidor,
--       porque de los dos depende la definición de abandono;
--   (c) congelar lo que no se puede cambiar después del insert —dueño, topic,
--       origen, fecha de inicio— e impedir reabrir un intento ya cerrado.
--
-- ⚠️ (b) empezó siendo solo `updated_at`, y la verificación contra PostgREST
-- encontró el agujero: con `cerrado_en` viniendo del cliente, **un navegador
-- con el reloj atrasado hace fallar el cierre** por el check
-- `intentos_cierre_posterior`, y el intento se queda abierto para siempre. O
-- sea que alguien que terminó su diagnóstico contaría como abandono, en la
-- única métrica que esta migración existe para producir. Ahora el cliente solo
-- manda la *intención* de cerrar —cualquier valor no nulo— y la hora la pone el
-- servidor. El check queda igual, pero ya no lo puede disparar un reloj ajeno.
--
-- (c) duplica a propósito lo que la policy `intentos_update_own` ya restringe
-- con su `using (... and cerrado_en is null)`: la policy protege contra el
-- cliente, el trigger protege también contra el SQL Editor y contra una policy
-- futura mal escrita.
create or replace function public.intentos_sellar()
returns trigger
language plpgsql
as $$
begin
  -- (a) Nunca, bajo ninguna vía, una identidad adentro del rastro.
  if new.parcial is null then
    new.parcial := '{}'::jsonb;
  end if;
  new.parcial := (new.parcial - 'email') - 'email-user';

  -- (b) El reloj es del servidor.
  new.updated_at := now();

  if tg_op = 'INSERT' then
    -- Un intento no nace cerrado. Si el cliente manda `cerrado_en`, se ignora.
    new.cerrado_en := null;
  end if;

  if tg_op = 'UPDATE' then
    -- «Ciérralo» es una intención, no una hora. El cliente manda cualquier
    -- valor no nulo y el servidor pone el suyo.
    if new.cerrado_en is not null and old.cerrado_en is null then
      new.cerrado_en := now();
    end if;

    -- (c) Lo inmutable, inmutable.
    new.id          := old.id;
    new.user_id     := old.user_id;
    new.topic       := old.topic;
    new.origin      := old.origin;
    new.iniciado_en := old.iniciado_en;

    -- Consecuencia aceptada, igual que la de `067`: corregir a mano un intento
    -- ya cerrado obliga a desactivar este trigger a propósito
    -- (`alter table public.intentos disable trigger intentos_sellar`). Es más
    -- caro que un `update`, y esa es la idea: que no pase por descuido.
    if old.cerrado_en is not null then
      raise exception
        'intento % ya está cerrado (%): un intento terminado no se reescribe',
        old.id, old.cerrado_en
        using errcode = '42501';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists intentos_sellar on public.intentos;
create trigger intentos_sellar
  before insert or update on public.intentos
  for each row
  execute function public.intentos_sellar();

-- -----------------------------------------------------------------------------
-- 5. RLS
-- -----------------------------------------------------------------------------
-- Tabla nueva ⇒ RLS y policies en la misma migración (CLAUDE.md §7.1).
alter table public.intentos enable row level security;

-- Cada quien crea sus propios intentos. `origin` lo pisa el trigger, así que
-- mandar 'admin_preview' desde el cliente no sirve de nada.
drop policy if exists "intentos_insert_own" on public.intentos;
create policy "intentos_insert_own"
  on public.intentos for insert
  to authenticated
  with check (user_id = auth.uid());

-- Latir es un UPDATE, y **solo mientras el intento está abierto**. Una vez
-- sellado `cerrado_en`, la fila deja de ser alcanzable por el `using`: el
-- rastro de un test terminado es tan inmutable como la fila de `tests` que lo
-- acompaña.
drop policy if exists "intentos_update_own" on public.intentos;
create policy "intentos_update_own"
  on public.intentos for update
  to authenticated
  using (user_id = auth.uid() and cerrado_en is null)
  with check (user_id = auth.uid());

-- Mismo criterio que `tests_select_own` (023).
drop policy if exists "intentos_select_own" on public.intentos;
create policy "intentos_select_own"
  on public.intentos for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- **No hay policy de DELETE, y es deliberado.** Un intento abandonado es el
-- dato; poder borrarlo desde el cliente lo volvería opcional. El borrado
-- legítimo —baja de cuenta— ya ocurre por el `on delete cascade` de `user_id`.

-- ── Los privilegios, explícitos ────────────────────────────────────────────
-- Ninguna migración de este proyecto había escrito un `grant` sobre una tabla:
-- todas se apoyan en las *default privileges* que Supabase deja puestas sobre
-- el esquema `public`, que conceden **todo** —incluido `delete`— a `anon` y a
-- `authenticated`. Funciona, pero deja la superficie real dependiendo de una
-- configuración que no está en este repositorio y que nadie versiona.
--
-- Acá se escribe. `revoke` primero para no heredar el `delete` del default, y
-- después los tres verbos que las policies de arriba sí contemplan. Así «no hay
-- policy de DELETE» y «no se puede borrar» dicen lo mismo aunque alguien cambie
-- las default privileges. `anon` no toca esta tabla: un intento sin sesión no
-- existe.
revoke all on public.intentos from anon, authenticated;
grant select, insert, update on public.intentos to authenticated;

-- -----------------------------------------------------------------------------
-- 6. Índices
-- -----------------------------------------------------------------------------
-- Las dos consultas que van a existir: «los abiertos, ordenados por cuán viejos
-- son» (índice parcial, la minoría) y «el historial de intentos de esta persona
-- en este banco».
create index if not exists intentos_abiertos_idx
  on public.intentos (updated_at) where cerrado_en is null;

create index if not exists intentos_user_topic_idx
  on public.intentos (user_id, topic);

-- -----------------------------------------------------------------------------
-- 7. El puente con `tests`
-- -----------------------------------------------------------------------------
-- Nullable y sin default: las 350 filas viejas no tienen intento y **no se les
-- inventa uno**. Un `tests.intento_id` nulo significa «rendido antes de esta
-- migración», que es la verdad.
--
-- La FK va de `tests` a `intentos` y no al revés porque el intento existe
-- primero: cuando se inserta el test, su intento ya está en la base.
alter table public.tests
  add column if not exists intento_id uuid;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'tests_intento_fk'
  ) then
    alter table public.tests
      add constraint tests_intento_fk
      foreign key (intento_id) references public.intentos(id) on delete set null;
  end if;
end
$$;

comment on column public.tests.intento_id is
  'El intento que produjo este test (ADR-036, T-134). Nulo en las filas '
  'anteriores a la migración 070 y en cualquier test guardado con la tabla '
  '`intentos` inalcanzable. Sirve para comparar el rastro parcial con el '
  'resultado final; NO es la forma de saber si alguien terminó — para eso está '
  '`intentos.cerrado_en`.';

-- -----------------------------------------------------------------------------
-- 8. La vista de los roles del agente aprende la columna nueva
-- -----------------------------------------------------------------------------
-- `tests_sin_identidad` (supabase/acceso_correccion_tests_pii.sql) enumera sus
-- columnas **una por una a propósito**, justo para que una columna nueva no se
-- cuele sola. El efecto lateral es que una columna nueva tampoco aparece sola
-- cuando sí corresponde, y eso se arregla acá, en el mismo commit que la crea.
-- `intento_id` es un uuid sin identidad adentro: se agrega al final, que es lo
-- único que `create or replace view` admite sin dropear.
--
-- Si la vista no existe (base desechable, entorno nuevo), esto la crea, que es
-- lo correcto.
create or replace view public.tests_sin_identidad as
select
  t.id,
  t.created_at,
  t.user_id,          -- uuid; `auth.users` le está cerrada a los dos roles
  t.topic,
  t.theta,
  t.engine_version,
  t.origin,
  (t.test::jsonb) - 'email' as test,
  t.intento_id
from public.tests t;

comment on view public.tests_sin_identidad is
  'tests sin el email del estudiante (columna `email-user` ni la clave `email` del jsonb). Es la única forma en que claude_ro y claude_ddl ven el histórico. Ver supabase/acceso_correccion_tests_pii.sql y ADR-040.';

-- `grant` idempotente: si los roles no existen (base desechable), no se hace.
do $$
begin
  if exists (select 1 from pg_roles where rolname = 'claude_ro') then
    execute 'grant select on public.tests_sin_identidad to claude_ro';
  end if;
  if exists (select 1 from pg_roles where rolname = 'claude_ddl') then
    execute 'grant select on public.tests_sin_identidad to claude_ddl';
  end if;
end
$$;

-- ⚠️ **A los roles del agente NO se les da lectura sobre `intentos`**, y es una
-- decisión, no un olvido. Sin policy no hay acceso, que es el default seguro
-- (CLAUDE.md §7.1). `parcial` sale ya recortado y sin `email`, pero la lección
-- de L-46 es que eso se afirma *después* de mirar filas reales, no antes. Si
-- alguna vez hace falta, se agrega con su propia verificación, como se hizo con
-- `tests_sin_identidad`.

-- -----------------------------------------------------------------------------
-- Verificación (correr a mano después de aplicar; no es parte de la migración)
-- -----------------------------------------------------------------------------
-- -- (a) La tabla, sus tres policies y sus dos triggers existen.
-- select policyname, cmd from pg_policies
--  where tablename = 'intentos' order by policyname;
--   → intentos_insert_own INSERT · intentos_select_own SELECT · intentos_update_own UPDATE
--
-- select tgname from pg_trigger
--  where tgrelid = 'public.intentos'::regclass and not tgisinternal order by 1;
--   → intentos_marcar_origen · intentos_sellar
--
-- -- (b) Cuántos empezaron y cuántos terminaron, por banco.
-- select topic,
--        count(*)                                        as iniciados,
--        count(*) filter (where cerrado_en is not null)   as completados,
--        count(*) filter (where public.intento_abandonado(cerrado_en, updated_at))
--                                                        as abandonados,
--        round(avg(n_respuestas), 1)                      as respuestas_media
--   from public.intentos
--  where origin = 'student'
--  group by 1 order by 2 desc;
--
-- -- (c) ⭐ El ítem en el que se van: lo que T-134 existe para poder preguntar.
-- select r->>'question-id'          as item,
--        count(*)                   as veces_ultimo
--   from public.intentos i
--   cross join lateral (
--     select i.parcial->'responses'->-1 as r
--   ) u
--  where i.origin = 'student'
--    and public.intento_abandonado(i.cerrado_en, i.updated_at)
--    and jsonb_array_length(coalesce(i.parcial->'responses', '[]'::jsonb)) > 0
--  group by 1 order by 2 desc limit 20;
--
-- -- (d) Ninguna identidad adentro del rastro. Esperado: 0 | 0
-- select count(*) filter (where parcial ? 'email')        as con_clave_email,
--        count(*) filter (where parcial::text like '%@%') as con_arroba
--   from public.intentos;
--
-- -- (e) `tests` no cambió de significado: sigue teniendo solo terminados.
-- select count(*) from public.tests;     → el mismo número de antes de aplicar

-- -----------------------------------------------------------------------------
-- Reversión
-- -----------------------------------------------------------------------------
-- -- La vista vuelve a su forma de `acceso_correccion_tests_pii.sql` (sin
-- -- `intento_id`); hay que dropearla porque quitar una columna no es un replace.
-- drop view if exists public.tests_sin_identidad;
-- alter table public.tests drop constraint if exists tests_intento_fk;
-- alter table public.tests drop column if exists intento_id;
-- drop trigger if exists intentos_sellar on public.intentos;
-- drop trigger if exists intentos_marcar_origen on public.intentos;
-- drop function if exists public.intentos_sellar();
-- drop function if exists public.intentos_marcar_origen();
-- drop function if exists public.intento_abandonado(timestamptz, timestamptz);
-- drop table if exists public.intentos;
-- -- y volver a correr supabase/acceso_correccion_tests_pii.sql para recrear la vista.
