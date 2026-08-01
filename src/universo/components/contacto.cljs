(ns universo.components.contacto
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]))

(defn contacto-form []
  (let [mensaje (r/atom "")]
    (fn []
      (let [estado @(re-frame/subscribe [:contacto/estado])
            enviando? @(re-frame/subscribe [:contacto/enviando?])
            visitor-email @(re-frame/subscribe [:visitor-email])]
        [:div
         [:form.flex.flex-col.gap-2
          [:label.sr-only {:for "contacto-mensaje"} "Tu mensaje"]
          [:textarea.w-full.p-2.rounded.text-gray-800
           {:id "contacto-mensaje"
            :rows 2
            :placeholder "¿Tienes alguna pregunta o comentario?"
            :value @mensaje
            :on-change #(reset! mensaje (.. % -target -value))}]
          [:button.bg-indigo-600.hover:bg-indigo-700.text-white.py-1.rounded.transition
           {:type "button"
            :on-click (fn [e]
                        (.preventDefault e)
                        (when-not enviando?
                          (re-frame/dispatch [:enviar-contacto {:mensaje @mensaje}])
                          (reset! mensaje "")))}
           (if enviando? "Enviando..." "Enviar")]

          [:div {:aria-live "polite"}
           (cond
             (= estado :exito)
             [:p.text-green-400.text-sm.mt-1 "✅ Mensaje enviado con éxito."]

             (= estado :error)
             [:p.text-red-400.text-sm.mt-1 "❌ Error al enviar. Intenta nuevamente."])]]]))))

;; -----------------------------------------------------------------------------
;; Panel de contacto flotante — accesible durante toda la navegación, no solo
;; en el footer. Se monta una sola vez en home.cljs, junto a ui/confirm-dialog.
;; -----------------------------------------------------------------------------

(defn contacto-fab
  "Botón fijo (toda sección) que abre el panel de contacto ampliado."
  []
  [:button
   {:type "button"
    :aria-label "Abrir panel de contacto"
    :class (str "fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center "
                "rounded-full bg-indigo-600 text-2xl text-white shadow-lg transition "
                "hover:bg-indigo-700 sm:h-14 sm:w-14")
    :on-click #(re-frame/dispatch [:contacto/abrir-panel])}
   "💬"])

(defn- contacto-form-ampliado
  "Formulario del panel flotante: mensaje siempre, más teléfono/correo
   opcionales y un CTA de cuenta gratis cuando no hay sesión — la cuenta es la
   vía preferida, los datos de contacto quedan como alternativa discreta."
  []
  (let [datos (r/atom {:mensaje "" :telefono "" :correo ""})]
    (fn []
      (let [estado @(re-frame/subscribe [:contacto/estado])
            enviando? @(re-frame/subscribe [:contacto/enviando?])
            logged-in? @(re-frame/subscribe [:auth/logged-in?])]
        [:form
         {:class "flex flex-col gap-3"
          :on-submit (fn [e]
                       (.preventDefault e)
                       (when-not enviando?
                         (re-frame/dispatch [:enviar-contacto @datos])
                         (reset! datos {:mensaje "" :telefono "" :correo ""})))}
         [:div
          [:label {:class "mb-1 block text-sm font-medium text-gray-700"
                   :for "contacto-panel-mensaje"}
           "Tu mensaje"]
          [:textarea
           {:id "contacto-panel-mensaje"
            :rows 3
            :required true
            :placeholder "¿Tienes alguna pregunta o comentario?"
            :class (str "w-full rounded-lg border border-gray-300 p-2 text-gray-800 "
                        "focus:outline-none focus:ring-2 focus:ring-indigo-500")
            :value (:mensaje @datos)
            :on-change #(swap! datos assoc :mensaje (.. % -target -value))}]]

         (when-not logged-in?
           [:div {:class "rounded-xl border border-indigo-100 bg-indigo-50 p-4"}
            [:p {:class "mb-2 text-sm font-semibold text-indigo-900"}
             "¿Quieres una respuesta más rápida?"]
            [:button
             {:type "button"
              :class (str "w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold "
                          "text-white transition hover:bg-indigo-700")
              :on-click (fn []
                          (re-frame/dispatch [:auth/set-login-mode :register])
                          (re-frame/dispatch [:navigate-to :login])
                          (re-frame/dispatch [:contacto/cerrar-panel]))}
             "Crear cuenta gratis"]
            [:p {:class "mb-1 mt-3 text-xs text-indigo-900"}
             "O déjanos un dato de contacto (opcional):"]
            [:div {:class "grid grid-cols-1 gap-2 sm:grid-cols-2"}
             [:input
              {:type "tel"
               :placeholder "Teléfono (opcional)"
               :class "rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800"
               :value (:telefono @datos)
               :on-change #(swap! datos assoc :telefono (.. % -target -value))}]
             [:input
              {:type "email"
               :placeholder "Correo (opcional)"
               :class "rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800"
               :value (:correo @datos)
               :on-change #(swap! datos assoc :correo (.. % -target -value))}]]])

         [:button
          {:type "submit"
           :disabled enviando?
           :class (str "rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white "
                       "transition hover:bg-indigo-700")}
          (if enviando? "Enviando..." "Enviar mensaje")]

         [:div {:aria-live "polite"}
          (cond
            (= estado :exito)
            [:p {:class "mt-1 text-sm text-green-600"} "✅ Mensaje enviado con éxito."]

            (= estado :error)
            [:p {:class "mt-1 text-sm text-red-600"} "❌ Error al enviar. Intenta nuevamente."])]]))))

(defn contacto-panel
  "Overlay global del panel de contacto — mismo lenguaje visual que
   ui/confirm-dialog. En móvil se comporta como hoja inferior (bottom sheet)
   para que el teclado no empuje el formulario fuera de la vista."
  []
  (let [abierto? @(re-frame/subscribe [:contacto/panel-open?])]
    (when abierto?
      [:div
       {:class (str "fixed inset-0 z-50 flex items-end justify-center bg-black/50 "
                    "backdrop-blur-sm sm:items-center sm:p-4")
        :on-click #(re-frame/dispatch [:contacto/cerrar-panel])}
       [:div
        {:class (str "max-h-[85vh] w-full max-w-md overflow-y-auto rounded-t-2xl "
                      "bg-white p-6 shadow-xl sm:rounded-2xl")
         :role "dialog"
         :aria-modal true
         :aria-label "Panel de contacto"
         :on-click #(.stopPropagation %)}
        [:div {:class "mb-4 flex items-center justify-between"}
         [:h3 {:class "text-lg font-bold text-gray-900"} "Contáctanos"]
         [:button
          {:type "button"
           :aria-label "Cerrar"
           :class "text-gray-400 transition hover:text-gray-600"
           :on-click #(re-frame/dispatch [:contacto/cerrar-panel])}
          "✕"]]
        [contacto-form-ampliado]]])))
