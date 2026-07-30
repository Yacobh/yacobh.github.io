-- Canal de contacto preferido del estudiante (T-36, D-29/D-30): email, notificación
-- in-app o WhatsApp. WhatsApp es un enlace `wa.me/<phone>` que el admin abre a mano
-- usando profiles.phone (migración 010) — sin integración de API, por decisión
-- explícita de simplicidad (D-30).

alter table public.profiles
  add column if not exists contact_preference text
    not null default 'email'
    check (contact_preference in ('email', 'notification', 'whatsapp'));
