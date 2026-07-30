-- Notifica a los inscritos activos cuando un cupo pasa a 'cancelled' (T-25, D-28/D-31).
-- Cancelación es manual (el admin la dispara desde el panel); este trigger solo
-- cubre el aviso, que hoy no existía — únicamente había trigger para "confirmado"
-- (confirm_slot_if_threshold en 001_mvp_schema.sql).

create or replace function public.notify_slot_cancelled()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  enrollee record;
begin
  if new.status = 'cancelled' and old.status is distinct from 'cancelled' then
    for enrollee in
      select user_id from public.enrollments
      where slot_id = new.id
        and status in ('pending', 'confirmed')
    loop
      insert into public.notifications (user_id, kind, message, meta)
      values (
        enrollee.user_id,
        'slot_cancelled',
        format('Tu grupo de estudio (%s) fue cancelado. Revisa Cupos para inscribirte en otro horario.',
               coalesce(new.title, new.theta_band)),
        jsonb_build_object('slot_id', new.id)
      );
    end loop;
  end if;

  return new;
end;
$$;

drop trigger if exists class_slots_notify_cancelled on public.class_slots;
create trigger class_slots_notify_cancelled
  after update of status on public.class_slots
  for each row execute function public.notify_slot_cancelled();
