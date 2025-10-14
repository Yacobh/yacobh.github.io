(ns universo.components.contacto
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]))

(defn contacto-form []
  (let [mensaje (r/atom "")]
    (fn []
      (let [estado @(re-frame/subscribe [:contacto/estado])
            enviando? @(re-frame/subscribe [:contacto/enviando?])]
        [:div
         [:form.flex.flex-col.gap-2
          [:textarea.w-full.p-2.rounded.text-gray-800
           {:rows 2
            :placeholder "¿Tienes alguna pregunta o comentario?"
            :value @mensaje
            :on-change #(reset! mensaje (.. % -target -value))}]
          [:button.bg-blue-600.hover:bg-blue-700.text-white.py-1.rounded.transition
           {:on-click (fn [e]
                        (.preventDefault e)
                        (when-not enviando?
                          (re-frame/dispatch [:enviar-contacto @mensaje])
                          (reset! mensaje "")))}
           (if enviando? "Enviando..." "Enviar")]

          (cond
            (= estado :exito)
            [:p.text-green-400.text-sm.mt-1 "✅ Mensaje enviado con éxito."]

            (= estado :error)
            [:p.text-red-400.text-sm.mt-1 "❌ Error al enviar. Intenta nuevamente."])]]))))
