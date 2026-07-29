(ns universo.components.privacidad
  "Aviso de Privacidad público. Texto aprobado por el owner (sin revisión legal
   externa: ver checklist y decisiones en project-memory/OPEN_QUESTIONS.md Q-03
   y project-memory/AVISO_PRIVACIDAD_BORRADOR.md)."
  (:require [re-frame.core :as re-frame]))

(defn- ir-a-contacto!
  "El formulario de contacto vive en el footer, montado en todas las
   secciones — basta con hacer scroll, no hace falta navegar."
  []
  (when-let [el (.getElementById js/document "contacto")]
    (.scrollIntoView el #js {:behavior "smooth" :block "start"})))

(defn- seccion [titulo & body]
  [:section {:class "mb-8"}
   [:h2 {:class "text-lg font-bold text-gray-900 mb-2"} titulo]
   (into [:div {:class "text-sm leading-relaxed text-gray-700 space-y-2"}] body)])

(defn privacidad-page []
  [:div {:class "mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8"}
   [:button
    {:type "button"
     :class "mb-8 text-sm font-medium text-indigo-600 hover:text-indigo-800"
     :on-click #(re-frame/dispatch [:navigate-to :main])}
    "← Volver al inicio"]

   [:h1 {:class "text-3xl font-bold text-gray-900 mb-2"} "Aviso de Privacidad"]
   [:p {:class "text-sm text-gray-500 mb-10"} "Academia Integral · Última actualización: 28 de julio de 2026"]

   [seccion "Quiénes somos"
    [:p "Academia Integral es un proyecto personal del profesor Jacobo Córdova. Este aviso "
     "explica qué datos recolectamos cuando usas la plataforma, para qué los usamos y cómo "
     "puedes ejercer tus derechos sobre ellos."]]

   [seccion "Qué datos recolectamos"
    [:ul {:class "list-disc pl-5 space-y-1"}
     [:li [:span {:class "font-medium"} "Cuenta: "] "tu correo y nombre, al registrarte."]
     [:li [:span {:class "font-medium"} "Diagnóstico: "]
      "tus respuestas al test, el tiempo que tomas en cada pregunta, y el perfil de habilidad "
      "y los errores conceptuales que calculamos a partir de ellas."]
     [:li [:span {:class "font-medium"} "Uso del sitio: "]
      "dirección IP, ciudad/país aproximados, idioma, navegador y sistema operativo."]
     [:li [:span {:class "font-medium"} "Contacto y libro de visitas: "]
      "lo que escribas en esos formularios."]
     [:li [:span {:class "font-medium"} "Inscripción a grupos: "]
      "la banda de nivel y el cupo al que te inscribes."]]]

   [seccion "Para qué los usamos"
    [:ul {:class "list-disc pl-5 space-y-1"}
     [:li "Calcular tu perfil de habilidad y generar tu plan de estudio."]
     [:li "Ubicarte en un grupo de estudio de tu nivel y avisarte cuando se confirme."]
     [:li "Responder tus mensajes de contacto y mostrar testimonios que apruebes publicar."]
     [:li "Entender el uso general del sitio para mejorarlo."]]
    [:p {:class "font-medium"} "No vendemos tus datos a terceros ni los usamos con fines publicitarios."]]

   [seccion "Con quién los compartimos"
    [:p "Los datos se almacenan en Supabase (base de datos e infraestructura) y, para los "
     "avisos de confirmación de cupo, se envían por correo a través de Resend. Ninguno de "
     "estos proveedores está autorizado a usar tus datos con fines distintos a operar la "
     "plataforma."]]

   [seccion "Cuánto tiempo los conservamos"
    [:p "Si tu cuenta lleva más de 12 meses inactiva, eliminamos los datos que te identifican "
     "personalmente. Podemos conservar datos estadísticos de las respuestas al diagnóstico "
     "(por ejemplo, para calibrar la dificultad de las preguntas) una vez que ya no pueden "
     "vincularse contigo."]]

   [seccion "Menores de edad"
    [:p "Para crear una cuenta debes tener 14 años o más, o contar con la autorización de tu "
     "madre, padre o tutor. Si tienes dudas sobre esto, o necesitas ayuda para dar esa "
     "autorización, escríbenos por el formulario de contacto."]]

   [seccion "Tus derechos"
    [:p "Puedes pedir acceso o corrección de tus datos escribiéndonos por el "
     [:button {:type "button"
               :class "text-indigo-600 underline hover:text-indigo-800"
               :on-click ir-a-contacto!}
      "formulario de contacto"]
     " (en el pie de página). Para eliminar tu cuenta, usa el botón \"Solicitar eliminación de "
     "mi cuenta\" en Configuración de cuenta (en el menú, una vez que inicias sesión) — un "
     "administrador la procesará. Si eres menor de edad, tu madre, padre o tutor puede hacer "
     "cualquiera de estas solicitudes en tu representación."]]])
