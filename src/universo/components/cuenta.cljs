(ns universo.components.cuenta
  "Configuración de cuenta: editar nombre/teléfono propios y solicitar la
   eliminación de la cuenta. Sección aparte del tablero (no una tarjeta más
   dentro de dashboard), enlazada desde la navegación."
  (:require [re-frame.core :as re-frame]
            [reagent.core :as r]))

(defn- campo-nombre-telefono []
  (r/with-let [_ (re-frame/dispatch [:account/load-profile])
               full-name (r/atom "")
               phone (r/atom "")
               synced-from (r/atom nil)]
    (let [perfil @(re-frame/subscribe [:account/profile])
          cargando? @(re-frame/subscribe [:account/profile-loading?])
          estado @(re-frame/subscribe [:account/save-status])]
      ;; Sincroniza los campos locales una sola vez por cada perfil cargado del
      ;; servidor, sin pisar lo que el usuario esté escribiendo.
      (when (and perfil (not= @synced-from perfil))
        (reset! full-name (or (:full_name perfil) ""))
        (reset! phone (or (:phone perfil) ""))
        (reset! synced-from perfil))
      [:div.bg-white.rounded-xl.shadow-lg.p-6
       [:h3.text-lg.font-bold.text-gray-800.mb-4 "Tus datos"]
       (if cargando?
         [:p.text-sm.text-gray-500 "Cargando…"]
         [:form
          {:on-submit (fn [e]
                        (.preventDefault e)
                        (re-frame/dispatch [:account/save-profile
                                             {:full-name @full-name :phone @phone}]))}
          [:div.mb-4
           [:label.block.text-sm.font-medium.text-gray-700.mb-1 "Correo"]
           [:input {:type "email"
                    :value (or (:email perfil) "")
                    :disabled true
                    :class "w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-500"}]]

          [:div.mb-4
           [:label.block.text-sm.font-medium.text-gray-700.mb-1 "Nombre"]
           [:input {:type "text"
                    :value @full-name
                    :on-change #(reset! full-name (-> % .-target .-value))
                    :placeholder "Tu nombre completo"
                    :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}]]

          [:div.mb-6
           [:label.block.text-sm.font-medium.text-gray-700.mb-1 "Teléfono"]
           [:input {:type "tel"
                    :value @phone
                    :on-change #(reset! phone (-> % .-target .-value))
                    :placeholder "+56 9 1234 5678"
                    :class "w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}]]

          [:div.flex.items-center.gap-3
           [:button {:type "submit"
                     :disabled (= estado :saving)
                     :class (str "py-2 px-5 text-white font-semibold rounded-md transition-colors "
                                 (if (= estado :saving)
                                   "bg-gray-400 cursor-not-allowed"
                                   "bg-blue-600 hover:bg-blue-700"))}
            (if (= estado :saving) "Guardando…" "Guardar")]
           (case estado
             :saved [:span.text-sm.text-green-700 "Guardado."]
             :error [:span.text-sm.text-red-700 "No se pudo guardar. Intenta de nuevo."]
             nil)]])])))

(defn- eliminar-cuenta []
  (let [estado @(re-frame/subscribe [:account/deletion-request-status])]
    [:div.bg-white.rounded-xl.shadow-lg.p-6.mt-6.border.border-red-100
     [:h3.text-lg.font-bold.text-gray-800.mb-2 "Eliminar cuenta"]
     [:p.text-sm.text-gray-600.mb-4
      "¿Quieres eliminar tu cuenta y tus datos? Envía la solicitud y un administrador la "
      "procesará manualmente."]
     (case estado
       :sent
       [:p.text-sm.font-medium.text-green-700
        "Solicitud enviada. Un administrador la procesará y tu cuenta será eliminada."]

       :error
       [:p.text-sm.font-medium.text-red-700
        "No se pudo enviar la solicitud. Intenta de nuevo o escríbenos por el formulario de contacto."]

       [:button.text-sm.font-semibold.text-red-700.border.border-red-200.rounded-lg.px-4.py-2.hover:bg-red-50.transition
        {:type "button"
         :disabled (= estado :sending)
         :on-click (fn []
                     (when (js/confirm
                            (str "¿Solicitar la eliminación de tu cuenta? Un administrador la "
                                 "revisará y eliminará tus datos."))
                       (re-frame/dispatch [:account/request-deletion])))}
        (if (= estado :sending) "Enviando…" "Solicitar eliminación de mi cuenta")])]))

(defn cuenta-page []
  [:div {:class "py-8 px-4"}
   [:div {:class "max-w-2xl mx-auto"}
    [:h1.text-2xl.font-bold.text-gray-800.mb-6 "Configuración de cuenta"]
    [campo-nombre-telefono]
    [eliminar-cuenta]]])
