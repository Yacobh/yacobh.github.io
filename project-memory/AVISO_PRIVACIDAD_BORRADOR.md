# AVISO DE PRIVACIDAD — historial de la decisión (PUBLICADO)

> ✅ **Publicado el 2026-07-28** en `universo.components.privacidad` (enlazado desde el footer).
> El texto vivo está en ese componente — **ese archivo es la fuente de verdad**, no este. Este
> documento queda como registro de por qué se redactó así: lo revisó solo el owner, sin abogado
> (decisión explícita D-20, ver [[DECISIONS]]), dado el tamaño del proyecto. Ver [[OPEN_QUESTIONS]]
> Q-03 y [[RISKS]] R-06 para el estado de lo que aún falta (retención automática, migración `009`
> en producción, eliminar el dato de batería sin uso).

Última actualización: **2026-07-28**

---

## Por qué existe este borrador

Chile tiene una nueva ley de protección de datos personales, la **Ley 21.719** (publicada
13/12/2024), que entra en **plena vigencia el 1 de diciembre de 2026** — quedan ~4 meses desde hoy.
Reemplaza el marco antiguo (Ley 19.628) por uno más exigente, con una agencia reguladora
(Agencia de Protección de Datos Personales) y reglas específicas para menores de edad:

- **Menores de 14 años:** se requiere consentimiento de padres/tutores para **cualquier**
  tratamiento de datos.
- **14–15 años:** consentimiento de padres/tutores solo para **datos sensibles** (salud, biometría,
  etc. — no parece aplicar a respuestas de un diagnóstico de matemática); el resto de datos puede
  tratarse con otra base legal.
- **16 años o más:** reglas generales, igual que un adulto.

*(Fuente: búsqueda web 2026-07-28, no verificado contra el texto legal ni con asesoría profesional
— confirmar antes de construir cualquier flujo de edad sobre esto.)*

**Gap actual del producto:** el signup de Academia Integral (`universo.events.auth`) no pide fecha
de nacimiento ni edad. Hoy no hay forma de saber si un usuario tiene menos de 14 años. La mayoría
del público objetivo (estudiantes preparando la PAES, ~4° medio) tiene 17–18 años, pero nada impide
que alguien menor se registre.

**Decisión pendiente para el owner (no asumida aquí):** ¿se agrega un campo de edad/fecha de
nacimiento y un flujo de bloqueo o consentimiento parental para <14, o se acepta el riesgo dado que
el público real es casi todo ≥16? Ver pregunta al final de esta sección en el chat.

---

## Qué datos se recolectan hoy (según el código, `ARCHITECTURE.md` §7.4 y `SCHEMA.md`)

| Dato | Tabla | Para qué (inferido) |
|------|-------|----------------------|
| Email, contraseña (hash, vía Supabase Auth) | `auth.users` / `profiles` | Login, identidad de cuenta |
| Nombre | `profiles` | Personalización, cupos |
| Respuestas del diagnóstico, perfil θ, errores conceptuales | `student_profiles`, `tests` | El producto: plan de estudio |
| IP, ciudad, país, idioma, navegador, SO, nivel de batería | `visitor` | Analítica de visitas (no declarada al usuario) |
| Nombre, mensaje, email, teléfono (opcional) | `guestbook` | Testimonios públicos moderados |
| Nombre, email, mensaje | `contacto` | Formulario de contacto |
| Inscripción a cupo (banda, horario) | `enrollments`, `class_slots` | Formar grupos de estudio |

---

## Borrador de texto (para la página pública, cuando esté aprobado)

### Aviso de Privacidad — Academia Integral

*Última actualización: [fecha de publicación real]*

Academia Integral es un proyecto personal del profesor Jacobo Córdova. Este aviso explica qué datos
recolectamos cuando usas la plataforma, para qué los usamos y cómo puedes ejercer tus derechos.

**1. Qué datos recolectamos**
- **Cuenta:** tu correo y nombre, al registrarte.
- **Diagnóstico:** tus respuestas al test, el tiempo que tomas en cada pregunta y el perfil de
  habilidad (θ) y errores conceptuales que se calculan a partir de ellas.
- **Uso del sitio:** dirección IP, ciudad/país aproximados, idioma, navegador, sistema operativo y
  nivel de batería del dispositivo, para entender cómo se usa la plataforma.
- **Contacto y libro de visitas:** lo que escribas en esos formularios (pueden incluir teléfono si
  lo entregas voluntariamente).
- **Inscripción a grupos:** la banda de nivel y el cupo al que te inscribes.

**2. Para qué los usamos**
- Calcular tu perfil de habilidad y generar tu plan de estudio.
- Ubicarte en un grupo de estudio de tu nivel y avisarte cuando se confirme.
- Responder tus mensajes de contacto y mostrar testimonios que apruebes publicar.
- Entender el uso general del sitio para mejorarlo.
- **No** vendemos tus datos a terceros ni los usamos con fines publicitarios.

**3. Con quién los compartimos**
Los datos se almacenan en Supabase (proveedor de base de datos e infraestructura) y, para los avisos
de confirmación de cupo, se envían por correo a través de Resend. Ninguno de estos proveedores tiene
autorización para usar tus datos con fines distintos a operar la plataforma.

**4. Cuánto tiempo los conservamos**
*(pendiente de decisión del owner — ver checklist abajo)*

**5. Tus derechos**
Puedes pedir acceso, corrección o eliminación de tus datos escribiendo a **[email de contacto]**.
Si eres menor de edad, tu padre, madre o tutor puede hacer esta solicitud en tu representación.

**6. Menores de edad**
*(pendiente de decisión del owner sobre el mecanismo — ver checklist abajo)*

---

## Checklist — respuestas del owner (2026-07-28) y qué se hizo con cada una

1. **Canal para solicitudes de acceso/borrado:** no un email dedicado — un flujo en la app. El
   usuario solicita la eliminación desde la sección propia "Configuración de cuenta"
   (`components/cuenta.cljs`, enlazada desde la navegación, no una tarjeta del tablero); eso
   inserta una `notifications` (`kind = 'account_deletion_request'`); el admin la ve como alerta
   en Admin → Usuarios (`components/admin.cljs`) y la marca atendida. El borrado real en
   `auth.users` sigue siendo manual en Supabase (requiere `service_role`, fuera del cliente por
   diseño). Ver migración `009_account_deletion_requests.sql`. Esa misma sección permite editar
   `full_name`/`phone` (migración `010_profile_name_phone.sql`).
2. **Retención:** 12 meses de inactividad → se borran los datos identificables; se conservan
   estadísticas ya anonimizadas de las respuestas (no vinculables a la persona) para calibrar el
   banco de preguntas. **Publicado en el texto, pero sin job que lo ejecute todavía** — ticket
   [[BACKLOG]] T-34.
3. **Mecanismo de edad:** declaración propia al registrarse ("tengo 14 años o más, o cuento con
   autorización de mi representante"), sin campo de fecha de nacimiento ni bloqueo duro. Cualquier
   caso especial se deriva al formulario de contacto. Implementado como checkbox obligatorio en
   `login.cljs` (D-21 en [[DECISIONS]]).
4. **Revisión:** el owner, sin abogado, por ahora (D-20). Se revisará con asesoría legal cuando el
   negocio crezca — riesgo aceptado explícitamente, no un olvido.
5. **Publicación técnica:** hecha — `universo.components.privacidad`, enlazado desde el footer
   (`home.cljs`), checkbox de aceptación en el registro (`login.cljs`).

## Qué queda pendiente (no de texto, de ejecución)

- Aplicar `009_account_deletion_requests.sql` en el proyecto Supabase real (las migraciones se
  aplican a mano, ver `supabase/SCHEMA.md`).
- Eliminar la recolección del nivel de batería en `visitor` (dato sin uso justificado).
- T-34: automatizar la retención a los 12 meses (hoy es solo una promesa en el texto público).
