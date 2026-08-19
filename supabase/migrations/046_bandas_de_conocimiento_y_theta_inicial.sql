-- Bandas de conocimiento por módulo, θ inicial por evaluación, y el eje de
-- probabilidad que a PAES M1 le faltaba.
--
-- Pedido del owner (2026-08-18). Es **puramente aditiva**: tres columnas
-- nullable y un check ampliado. Nada cambia de comportamiento mientras el
-- cliente no las use, y el cliente está escrito para funcionar igual si esta
-- migración no se aplicó (omite las columnas que no existen).
--
-- ── Qué es una «banda de conocimiento» ──────────────────────────────────────
-- El rango de dificultad IRT que le corresponde a un módulo dentro de la escala
-- θ ∈ [-3, 3]. La idea del owner: el primer contenido de la progresión vive
-- abajo del todo y cada contenido siguiente sube. Con bandas, la dificultad de
-- un ítem deja de ser un número suelto que alguien tipeó y pasa a estar acotada
-- por el lugar del contenido en la progresión.
--
-- ⚠️ **HONESTIDAD SOBRE LO QUE ESTO ES Y NO ES.** Una banda es una hipótesis
-- editorial, no una medición. Sigue siendo `difficulty` autoral: lo que gana el
-- banco es **coherencia** (hoy `polinomios` tiene 18 de 20 ítems dentro de 0,045
-- logits, o sea una constante con ruido), no validez psicométrica. La validez
-- solo puede venir de calibrar con respuestas reales — G-2 en
-- project-memory/TESIS_DE_CRECIMIENTO, RISKS R-17, OPEN_QUESTIONS Q-05. Cuando
-- se calibre, estas bandas son la hipótesis **contra la que se contrasta**, y
-- por eso conviene que estén escritas y versionadas en vez de vivir en la
-- cabeza de quien tipeó los números.
--
-- ── Por qué la banda va en `modules` y no en `test_configs` ─────────────────
-- Porque una banda describe un **contenido**, no una evaluación. El banco
-- `diagnostico` cruza varios contenidos (enteros, fracciones, ecuaciones,
-- factorización): si la banda viviera en el test, sus 84 ítems tendrían todos la
-- misma dificultad y el test adaptativo dejaría de poder discriminar dentro de
-- él, que es exactamente para lo que existe. `modules` ya tiene `order_index` y
-- `track`, o sea la progresión curricular: la banda se apoya en eso.

-- -----------------------------------------------------------------------------
-- 1. Bandas por módulo
-- -----------------------------------------------------------------------------
-- Nullable a propósito: `null` significa «usa la banda derivada del orden
-- curricular» (ver `universo.bands/default-bands`). Solo se escribe cuando el
-- autor quiere apartarse de esa derivación, y entonces queda registrado que fue
-- una decisión y no un default.
alter table public.modules
  add column if not exists band_min numeric,
  add column if not exists band_max numeric;

-- Una banda invertida (min > max) no es una banda; y fuera de [-3, 3] no existe
-- en la escala θ que usa el resto del sistema (`tetha/clamp-theta`).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'modules_band_coherente'
  ) then
    alter table public.modules
      add constraint modules_band_coherente
      check (
        (band_min is null and band_max is null)
        or (band_min is not null and band_max is not null
            and band_min <= band_max
            and band_min >= -3 and band_max <= 3)
      );
  end if;
end
$$;

-- -----------------------------------------------------------------------------
-- 2. θ inicial por evaluación
-- -----------------------------------------------------------------------------
-- Hasta ahora **todo** test arrancaba en θ = -1.0, un literal en
-- `events/test.cljs`. Eso tiene una consecuencia que no es obvia: el primer ítem
-- que se sirve es el más cercano a -1.0, así que la evaluación empieza donde
-- decidió el código y no donde tiene sentido para ese banco. Un diagnóstico
-- general y un banco de un contenido avanzado no deberían abrir en el mismo
-- punto.
--
-- `null` = usa el default del cliente (-1.0), que es el comportamiento actual.
alter table public.test_configs
  add column if not exists initial_theta numeric;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'test_configs_initial_theta_rango'
  ) then
    alter table public.test_configs
      add constraint test_configs_initial_theta_rango
      check (initial_theta is null or (initial_theta >= -3 and initial_theta <= 3));
  end if;
end
$$;

-- -----------------------------------------------------------------------------
-- 3. El eje que faltaba: probabilidad y estadística
-- -----------------------------------------------------------------------------
-- PAES M1 tiene **cuatro** ejes: Números, Álgebra y funciones, Geometría, y
-- Probabilidad y estadística. `001` creó el check de `track` con solo tres, así
-- que hasta hoy era imposible crear un módulo del cuarto eje — y, en efecto, el
-- banco no tiene un solo ítem de probabilidad. Se amplía el check con el mismo
-- procedimiento que usó `033` para agregar `cuantica`.
do $$
declare c record;
begin
  for c in
    select con.conname
      from pg_constraint con
      join pg_class rel on rel.oid = con.conrelid
      join pg_namespace ns on ns.oid = rel.relnamespace
     where ns.nspname = 'public'
       and rel.relname = 'modules'
       and con.contype = 'c'
       and pg_get_constraintdef(con.oid) ilike '%track%'
  loop
    execute format('alter table public.modules drop constraint %I', c.conname);
  end loop;
end
$$;

alter table public.modules
  add constraint modules_track_check
  check (track in ('aritmetica', 'algebra', 'geometria', 'probabilidad', 'cuantica'));

-- El mismo check existe en `resources.track` (001, línea 129). Si no se amplía,
-- un recurso del eje nuevo no se puede crear y el fallo aparece lejos de acá.
do $$
declare c record;
begin
  for c in
    select con.conname
      from pg_constraint con
      join pg_class rel on rel.oid = con.conrelid
      join pg_namespace ns on ns.oid = rel.relnamespace
     where ns.nspname = 'public'
       and rel.relname = 'resources'
       and con.contype = 'c'
       and pg_get_constraintdef(con.oid) ilike '%track%'
  loop
    execute format('alter table public.resources drop constraint %I', c.conname);
  end loop;
end
$$;

alter table public.resources
  add constraint resources_track_check
  check (track is null or track in ('aritmetica', 'algebra', 'geometria', 'probabilidad', 'cuantica'));

-- SIN SEED A PROPÓSITO. Los módulos del eje de probabilidad y los valores de
-- banda se crean desde el panel: son decisiones de contenido, y meterlas acá las
-- volvería invisibles y difíciles de corregir (misma razón que 027).
