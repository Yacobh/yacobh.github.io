-- Pruebas de RLS (T-11)
-- ===========================================================================
-- Cada bloque se hace pasar por un usuario (rol `authenticated` + `auth.uid()`
-- vía `request.jwt.claim.sub`, que es lo que lee el `auth.uid()` real) o por
-- `anon`, y afirma lo que ese usuario puede y no puede hacer. Un fallo aborta
-- con `raise exception` y el mensaje dice cuál invariante se rompió.
--
-- ⚠️ SOLO contra una base desechable: la que arma `scripts/reconstruir_esquema.sh`
-- (T-48). Inserta usuarios de prueba y todo corre dentro de una transacción que
-- termina en `rollback`, pero igual **nunca se corre contra producción**.
-- Lo corre `scripts/verificar_rls.sh`.
--
-- Qué se prueba, y por qué estas y no otras: son los invariantes que
-- CLAUDE.md §7 y AGENT_INSTRUCTIONS §3.7 piden verificar antes de tocar una
-- policy, más los tres objetos que abrieron riesgos en septiembre
-- (`cohortes` R-28, `intentos` ADR-036, `tests_sin_identidad` R-49).
-- ===========================================================================

\set ON_ERROR_STOP 1
begin;

-- ── Fixtures (como postgres) ────────────────────────────────────────────────
-- `on_auth_user_created` crea el perfil de cada uno.
insert into auth.users (id, email) values
  ('00000000-0000-0000-0000-00000000000a', 'estudiante-a@prueba'),
  ('00000000-0000-0000-0000-00000000000b', 'estudiante-b@prueba'),
  ('00000000-0000-0000-0000-0000000000ad', 'admin@prueba'),
  ('00000000-0000-0000-0000-0000000000ae', 'admin-2@prueba'),
  ('00000000-0000-0000-0000-0000000000bf', 'profesora@prueba');

-- Dos admins: con uno solo, el trigger del último admin tapa la prueba de la
-- policy de auto-degradación (se dispara antes que el `with check`).
update public.profiles set role = 'admin'    where id in ('00000000-0000-0000-0000-0000000000ad',
                                                           '00000000-0000-0000-0000-0000000000ae');
update public.profiles set role = 'profesor' where id = '00000000-0000-0000-0000-0000000000bf';

insert into public.tests (created_at, test, "email-user", user_id, topic, origin) values
  ('2026-09-21 10:30+00', '{}', 'estudiante-a@prueba', '00000000-0000-0000-0000-00000000000a', 'numeros', 'student'),
  ('2026-09-21 10:40+00', '{}', 'estudiante-b@prueba', '00000000-0000-0000-0000-00000000000b', 'numeros', 'student'),
  ('2026-09-22 10:40+00', '{}', 'estudiante-b@prueba', '00000000-0000-0000-0000-00000000000b', 'numeros', 'student');

-- La cohorte de la profesora cubre solo la mañana del 2026-09-21.
insert into public.cohortes (nombre, profesor_id, desde, hasta, creado_por) values
  ('3º medio', '00000000-0000-0000-0000-0000000000bf',
   '2026-09-21 10:00+00', '2026-09-21 12:00+00', '00000000-0000-0000-0000-0000000000ad');

create temporary table resultado (prueba text, estado text) on commit drop;
grant insert on resultado to anon, authenticated;

-- ── Estudiante A ────────────────────────────────────────────────────────────
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-00000000000a', true) \g /dev/null

do $$ begin
  if (select count(*) from public.tests) <> 1 then
    raise exception 'FALLA: el estudiante ve % filas de tests, debería ver solo la suya', (select count(*) from public.tests);
  end if;
  if (select count(*) from public.profiles) <> 1 then
    raise exception 'FALLA: el estudiante ve % perfiles, debería ver solo el suyo', (select count(*) from public.profiles);
  end if;
  if exists (select 1 from public.questions) then
    raise exception 'FALLA: el estudiante lee questions directo (ADR-015)';
  end if;
  if exists (select 1 from public.cohortes) then
    raise exception 'FALLA: el estudiante ve cohortes';
  end if;
  insert into resultado values ('estudiante: solo lo suyo en tests, profiles, questions, cohortes', 'ok');
end $$;

do $$ begin
  begin
    insert into public.questions (question, option_a, option_b, option_c, option_d, correct_option, topic)
    values ('x', 'a', 'b', 'c', 'd', 'A', 'numeros');
    raise exception 'FALLA: el estudiante insertó en questions';
  exception when insufficient_privilege then null;
  end;
  begin
    update public.profiles set role = 'admin' where id = auth.uid();
    raise exception 'FALLA: el estudiante se promovió a admin';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.tests (test, "email-user", user_id, topic)
    values ('{}', 'x', '00000000-0000-0000-0000-00000000000b', 'numeros');
    raise exception 'FALLA: el estudiante insertó un test a nombre de otro';
  exception when insufficient_privilege then null;
  end;
  insert into resultado values ('estudiante: no escribe questions, no se promueve, no firma por otro', 'ok');
end $$;

do $$ declare n int; begin
  update public.profiles set full_name = 'x' where id = '00000000-0000-0000-0000-00000000000b';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALLA: el estudiante modificó el perfil de otro'; end if;
  insert into resultado values ('estudiante: no modifica perfiles ajenos', 'ok');
end $$;

reset role;

-- ── Profesora: su cohorte y nada más (080, R-28) ───────────────────────────
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000bf', true) \g /dev/null

do $$ begin
  if (select count(*) from public.tests) <> 2 then
    raise exception 'FALLA: la profesora ve % tests; debería ver los 2 de su ventana', (select count(*) from public.tests);
  end if;
  if exists (select 1 from public.tests where created_at >= '2026-09-22') then
    raise exception 'FALLA: la profesora ve un test fuera de su ventana';
  end if;
  if (select count(*) from public.profiles) <> 1 then
    raise exception 'FALLA: la profesora ve perfiles ajenos';
  end if;
  begin
    insert into public.cohortes (nombre, profesor_id, desde, hasta, creado_por)
    values ('propia', auth.uid(), now(), now() + interval '1 year', auth.uid());
    raise exception 'FALLA: la profesora se creó su propia ventana';
  exception when insufficient_privilege then null;
  end;
  insert into resultado values ('profesora: ve su ventana, no la amplía', 'ok');
end $$;

reset role;

-- ── Admin ───────────────────────────────────────────────────────────────────
set local role authenticated;
select set_config('request.jwt.claim.sub', '00000000-0000-0000-0000-0000000000ad', true) \g /dev/null

do $$ begin
  if (select count(*) from public.tests) <> 3 then
    raise exception 'FALLA: el admin no ve todos los tests';
  end if;
  -- `profiles_update_own` exige que el rol no cambie; `profiles_update_admin`
  -- excluye la fila propia. Así que el auto-degrado choca con el `with check`.
  begin
    update public.profiles set role = 'user' where id = auth.uid();
    raise exception 'FALLA: el admin pudo degradarse a sí mismo';
  exception when insufficient_privilege then null;
  end;
  insert into resultado values ('admin: ve todo, no se degrada a sí mismo', 'ok');
end $$;

reset role;

-- ── Nunca queda el sistema sin admin (trigger, no policy) ───────────────────
-- Como postgres, que no pasa por RLS: se deja un solo admin y se intenta
-- quitarlo. Solo el trigger puede impedirlo.
update public.profiles set role = 'user' where id = '00000000-0000-0000-0000-0000000000ae';
do $$ begin
  begin
    update public.profiles set role = 'user' where id = '00000000-0000-0000-0000-0000000000ad';
    raise exception 'FALLA: se quitó el último admin';
  exception when raise_exception then
    if sqlerrm like 'FALLA%' then raise; end if;
  end;
  insert into resultado values ('sistema: el último admin no se puede quitar', 'ok');
end $$;

-- ── Anónimo (la anon key del bundle) ────────────────────────────────────────
set local role anon;
select set_config('request.jwt.claim.sub', '', true) \g /dev/null

do $$ begin
  if exists (select 1 from public.tests)    then raise exception 'FALLA: anon lee tests'; end if;
  if exists (select 1 from public.profiles) then raise exception 'FALLA: anon lee profiles'; end if;
  if exists (select 1 from public.visitor)  then raise exception 'FALLA: anon lee visitor'; end if;
  insert into resultado values ('anon: no lee tests, profiles ni visitor', 'ok');
exception when insufficient_privilege then
  insert into resultado values ('anon: no lee tests, profiles ni visitor', 'ok');
end $$;

do $$ begin
  begin
    perform 1 from public.tests_sin_identidad limit 1;
    raise exception 'FALLA: anon lee tests_sin_identidad (R-49; falta 084)';
  exception when insufficient_privilege then null;
  end;
  insert into resultado values ('anon: no lee la vista del agente (084)', 'ok');
end $$;

reset role;

-- ── Brechas conocidas: se informan, no se afirman ───────────────────────────
-- T-49: `class_slots_select_open` no filtra por banda. El estudiante ve los
-- cupos abiertos de todas las bandas y el filtro vive en el cliente
-- (`universo.slots.logic`). T-11 lo pedía como invariante, y hoy no lo es.
insert into resultado values ('estudiante: no ve cupos de otra banda', 'PENDIENTE (T-49: no está en la base)');

select estado || ' · ' || prueba from resultado order by estado desc, prueba;

rollback;
