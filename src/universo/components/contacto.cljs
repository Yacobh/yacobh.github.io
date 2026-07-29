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
                          (re-frame/dispatch [:enviar-contacto @mensaje])
                          (reset! mensaje "")))}
           (if enviando? "Enviando..." "Enviar")]

          [:div {:aria-live "polite"}
           (cond
             (= estado :exito)
             [:p.text-green-400.text-sm.mt-1 "✅ Mensaje enviado con éxito."]

             (= estado :error)
             [:p.text-red-400.text-sm.mt-1 "❌ Error al enviar. Intenta nuevamente."])]]]))))
