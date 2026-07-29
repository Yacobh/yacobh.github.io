(ns universo.components.ui
  "Piezas de UI transversales, reusadas por varias páginas: spinner y el
   diálogo de confirmación global (ver universo.events.ui)."
  (:require [re-frame.core :as re-frame]))

(defn spinner
  "Círculo animado con role=status (accesible para lectores de pantalla).
   :size → :sm | :md (default) | :lg."
  ([] (spinner {}))
  ([{:keys [size] :or {size :md}}]
   [:div {:class (str "inline-block animate-spin rounded-full border-gray-200 "
                       (case size
                         :sm "h-5 w-5 border-2 border-t-indigo-600"
                         :lg "h-12 w-12 border-4 border-t-indigo-600"
                         "h-7 w-7 border-2 border-t-indigo-600"))
          :role "status"
          :aria-label "Cargando"}]))

(defn loading-block
  "Bloque centrado: spinner grande + texto opcional debajo. Para pantallas de
   carga que antes no mostraban nada."
  ([] (loading-block nil))
  ([label]
   [:div {:class "flex flex-col items-center justify-center gap-4 py-10 text-center"}
    [spinner {:size :lg}]
    (when label [:p {:class "text-gray-600"} label])]))

(defn confirm-dialog
  "Diálogo de confirmación global — se monta una sola vez (en home.cljs) y
   reacciona a [:confirm/ask {...}]. Reemplaza js/confirm nativo."
  []
  (let [{:keys [open? title message confirm-label variant]}
        @(re-frame/subscribe [:confirm/state])]
    (when open?
      [:div {:class "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
             :on-click #(re-frame/dispatch [:confirm/cancel])}
       [:div {:class "w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
              :role "dialog"
              :aria-modal true
              :on-click #(.stopPropagation %)}
        (when title
          [:h3 {:class "text-lg font-bold text-gray-900 mb-2"} title])
        [:p {:class "text-sm text-gray-700 mb-6"} message]
        [:div {:class "flex justify-end gap-3"}
         [:button {:type "button"
                   :class "rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                   :on-click #(re-frame/dispatch [:confirm/cancel])}
          "Cancelar"]
         [:button {:type "button"
                   :class (str "rounded-lg px-4 py-2 text-sm font-semibold text-white transition "
                               (if (= variant :danger)
                                 "bg-red-600 hover:bg-red-700"
                                 "bg-indigo-600 hover:bg-indigo-700"))
                   :on-click #(re-frame/dispatch [:confirm/accept])}
          (or confirm-label "Confirmar")]]]])))
