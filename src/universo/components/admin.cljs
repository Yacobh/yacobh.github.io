(ns universo.components.admin
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]))

(defn- format-date [iso]
  (when iso
    (try
      (.toLocaleString (js/Date. iso) "es-CL")
      (catch :default _
        (str iso)))))

(defn- tab-btn [id label current]
  [:button
   {:type "button"
    :class (str "px-4 py-2 text-sm font-medium border-b-2 transition "
                (if (= id current)
                  "border-indigo-600 text-indigo-700"
                  "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"))
    :on-click #(re-frame/dispatch [:admin/set-tab id])}
   label])

(defn- users-panel []
  (let [rows @(re-frame/subscribe [:admin/profiles])]
    [:div.overflow-x-auto
     [:table.w-full.text-sm.text-left
      [:thead.bg-gray-50.text-gray-600
       [:tr
        [:th.px-3.py-2 "Email"]
        [:th.px-3.py-2 "Rol"]
        [:th.px-3.py-2 "Creado"]]]
      [:tbody.divide-y.divide-gray-100
       (if (seq rows)
         (for [p rows]
           ^{:key (:id p)}
           [:tr.hover:bg-gray-50
            [:td.px-3.py-2 (or (:email p) "—")]
            [:td.px-3.py-2
             [:span {:class (if (= (:role p) "admin")
                              "text-indigo-700 font-semibold"
                              "text-gray-700")}
              (or (:role p) "user")]]
            [:td.px-3.py-2.text-gray-500 (format-date (:created_at p))]])
         [:tr
          [:td.px-3.py-6.text-gray-400.text-center {:col-span 3}
           "Sin usuarios"]])]]]))

(defn- tests-panel []
  (let [rows @(re-frame/subscribe [:admin/tests])]
    [:div.overflow-x-auto
     [:table.w-full.text-sm.text-left
      [:thead.bg-gray-50.text-gray-600
       [:tr
        [:th.px-3.py-2 "Email"]
        [:th.px-3.py-2 "Fecha"]
        [:th.px-3.py-2 "Tema"]
        [:th.px-3.py-2 "θ"]
        [:th.px-3.py-2 "Score"]]]
      [:tbody.divide-y.divide-gray-100
       (if (seq rows)
         (for [t rows]
           ^{:key (:id t)}
           [:tr.hover:bg-gray-50
            [:td.px-3.py-2 (or (:email t) "—")]
            [:td.px-3.py-2.text-gray-500 (format-date (:fecha t))]
            [:td.px-3.py-2 (or (:tema t) "—")]
            [:td.px-3.py-2
             (if (:theta t)
               (.toFixed (js/Number (:theta t)) 2)
               "—")]
            [:td.px-3.py-2
             (str (or (:correctas t) 0) "/" (or (:total t) 0)
                  " (" (or (:porcentaje t) 0) "%)")]])
         [:tr
          [:td.px-3.py-6.text-gray-400.text-center {:col-span 5}
           "Sin tests"]])]]]))

(defn- guestbook-status [is-approved]
  (cond
    (true? is-approved) {:label "Aprobada" :class "text-green-700"}
    (false? is-approved) {:label "Papelera" :class "text-gray-500"}
    :else {:label "Pendiente" :class "text-amber-700"}))

(defn- guestbook-panel []
  (let [rows @(re-frame/subscribe [:admin/guestbook])
        filter @(re-frame/subscribe [:admin/guestbook-filter])]
    [:div.space-y-4
     [:div.flex.gap-2.flex-wrap
      (for [[mode label] [[:pending "Pendientes"]
                          [:approved "Aprobadas"]
                          [:trash "Papelera"]]]
        ^{:key mode}
        [:button
         {:type "button"
          :class (str "px-3 py-1.5 text-xs font-medium rounded-full transition "
                      (if (= mode filter)
                        "bg-indigo-600 text-white"
                        "bg-gray-100 text-gray-600 hover:bg-gray-200"))
          :on-click #(re-frame/dispatch [:admin/set-guestbook-filter mode])}
         label])]
     [:div.space-y-3
      (if (seq rows)
        (for [e rows]
          (let [st (guestbook-status (:is_approved e))
                pending? (nil? (:is_approved e))
                approved? (true? (:is_approved e))
                trash? (false? (:is_approved e))]
            ^{:key (:id e)}
            [:div.border.border-gray-200.rounded-lg.p-4.bg-white
             [:div.flex.flex-wrap.justify-between.gap-2.mb-2
              [:div
               [:span.font-semibold.text-gray-800 (or (:name e) "Anónimo")]
               (when (:email e)
                 [:span.text-sm.text-gray-500.ml-2 (:email e)])
               (when (:phone e)
                 [:span.text-sm.text-gray-500.ml-2 (:phone e)])]
              [:span.text-xs.text-gray-400 (format-date (:created_at e))]]
             [:p.text-gray-700.mb-3.whitespace-pre-wrap (or (:message e) "")]
             [:div.flex.items-center.gap-2.flex-wrap
              [:span.text-xs {:class (:class st)} (:label st)]
              (when (or pending? trash?)
                [:button.px-3.py-1.text-xs.font-medium.rounded.bg-green-600.text-white.hover:bg-green-700
                 {:type "button"
                  :on-click #(re-frame/dispatch [:admin/approve-guestbook (:id e)])}
                 "Aprobar"])
              (when (or pending? approved?)
                [:button.px-3.py-1.text-xs.font-medium.rounded.bg-gray-200.text-gray-700.hover:bg-gray-300
                 {:type "button"
                  :on-click #(re-frame/dispatch [:admin/reject-guestbook (:id e)])}
                 (if approved? "A papelera" "Rechazar")])
              (when trash?
                [:button.px-3.py-1.text-xs.font-medium.rounded.bg-amber-100.text-amber-800.hover:bg-amber-200
                 {:type "button"
                  :on-click #(re-frame/dispatch [:admin/restore-guestbook (:id e)])}
                 "Restaurar"])
              (when trash?
                [:button.px-3.py-1.text-xs.font-medium.rounded.bg-red-50.text-red-700.hover:bg-red-100
                 {:type "button"
                  :on-click (fn []
                              (when (js/confirm "¿Eliminar permanentemente esta entrada?")
                                (re-frame/dispatch [:admin/delete-guestbook (:id e)])))}
                 "Eliminar"])]]))
        [:p.text-gray-400.text-center.py-8
         (case filter
           :trash "La papelera está vacía"
           :approved "No hay entradas aprobadas"
           "No hay entradas pendientes")])]]))

(defn admin-panel []
  (r/create-class
   {:display-name "admin-panel"
    :component-did-mount
    (fn [_]
      (re-frame/dispatch [:admin/enter]))
    :reagent-render
    (fn []
      (let [tab @(re-frame/subscribe [:admin/tab])
            loading? @(re-frame/subscribe [:admin/loading?])
            error @(re-frame/subscribe [:admin/error])
            is-admin? @(re-frame/subscribe [:auth/admin?])
            role @(re-frame/subscribe [:auth/role])]
        [:div.max-w-5xl.mx-auto.px-4.py-8
         [:h1.text-2xl.font-bold.text-gray-900.mb-1 "Administración"]
         [:p.text-sm.text-gray-500.mb-6
          "Usuarios, tests y moderación del libro de visitas."]

         (cond
           (nil? role)
           [:p.text-gray-500 "Cargando permisos…"]

           (not is-admin?)
           [:p.text-amber-700 "No tienes permisos de administrador."]

           :else
           [:div
            [:div.flex.gap-1.border-b.border-gray-200.mb-6
             [tab-btn :users "Usuarios" tab]
             [tab-btn :tests "Tests" tab]
             [tab-btn :guestbook "Libro de visitas" tab]]

            (when error
              [:div.mb-4.rounded.bg-red-50.text-red-700.text-sm.px-3.py-2 error])

            (when loading?
              [:p.text-sm.text-gray-400.mb-3 "Cargando…"])

            (case tab
              :users [users-panel]
              :tests [tests-panel]
              :guestbook [guestbook-panel]
              [users-panel])])]))}))
