-- Bloquea inscripciones que superen class_slots.capacity (T-03, Q-04).
-- Ejecutar después de 001_mvp_schema.sql.
--
-- 001 solo tiene un trigger AFTER INSERT/UPDATE (confirm_slot_if_threshold) que
-- confirma el cupo al llegar a min_enrollments, pero corre después del insert y
-- no rechaza nada: no había ningún control de capacidad en la base de datos, solo
-- en la UI (components/slots.cljs oculta el botón cuando active >= capacity, lo
-- cual no es un control de seguridad).

create or replace function public.enforce_slot_capacity()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  slot record;
  active_count int;
begin
  if new.status not in ('pending', 'confirmed') then
    return new;
  end if;

  select * into slot from public.class_slots where id = new.slot_id;

  if slot is null then
    raise exception 'Cupo no encontrado';
  end if;

  select count(*)::int into active_count
  from public.enrollments
  where slot_id = new.slot_id
    and status in ('pending', 'confirmed')
    and id is distinct from new.id;

  if active_count >= slot.capacity then
    raise exception 'Cupo lleno';
  end if;

  return new;
end;
$$;

drop trigger if exists enrollments_enforce_capacity on public.enrollments;
create trigger enrollments_enforce_capacity
  before insert or update of status on public.enrollments
  for each row execute function public.enforce_slot_capacity();
