(ns universo.components.slots
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [universo.profile :as profile]
   [universo.slots.logic :as logic]
   [universo.components.ui :as ui]))

(defn- format-dt [iso]
  (when iso
    (try
      (.toLocaleString (js/Date. iso) "es-CL")
      (catch :default _
        (str iso)))))

(defn- enrolled-ids [enrollments]
  (set (map :slot_id enrollments)))

(defn- enrollment-count [slot]
  (or (:active_enrollments slot)
      (:enrollment_count slot)
      (logic/active-enrollment-count (:enrollments slot))
      0))

(defn- slot-card [slot enrolled?]
  (let [active (enrollment-count slot)
        min-n (or (:min_enrollments slot) 3)
        cap (or (:capacity slot) 8)
        remaining (logic/remaining-to-confirm active min-n)
        confirmed? (= (:status slot) "confirmed")
        full? (logic/capacity-reached? active cap)]
    [:div.border.border-gray-200.rounded-lg.p-4.bg-white.space-y-2
     [:div.flex.flex-wrap.justify-between.gap-2
      [:h3.font-semibold.text-gray-900
       (or (:title slot)
           (str (profile/band-label (:theta_band slot)) " · "
                (if (= (:modality slot) "online") "Online" "Presencial")))]
      [:span.text-xs.font-medium.px-2.py-1.rounded-full
       {:class (if confirmed?
                 "bg-green-100 text-green-800"
                 "bg-amber-100 text-amber-800")}
       (if confirmed? "Confirmado" "Abierto")]]
     [:p.text-sm.text-gray-600 (format-dt (:starts_at slot))]
     (when (:location_or_link slot)
       [:p.text-sm.text-indigo-600.break-all (:location_or_link slot)])
     (when (:track slot)
       [:p.text-xs.text-gray-500 (str "Track: " (:track slot))])
     [:p.text-sm.text-gray-700
      (if confirmed?
        (str active " inscritos (mín. " min-n ", cupo " cap ")")
        (str "Faltan " remaining " para confirmar · " active "/" cap " cupos"))]
     (cond
       enrolled?
       [:p.text-sm.font-medium.text-green-700 "Ya estás inscrito"]

       full?
       [:p.text-sm.text-gray-500 "Cupo lleno"]

       :else
       [:button.bg-indigo-600.text-white.text-sm.font-semibold.py-2.px-4.rounded-lg.hover:bg-indigo-700.transition
        {:type "button"
         :on-click #(re-frame/dispatch [:slots/enroll (:id slot)])}
        "Inscribirme"])]))

(defn- my-groups [enrollments]
  [:div.bg-white.rounded-xl.shadow.p-6
   [:h2.text-lg.font-bold.text-gray-800.mb-3 "Mis grupos"]
   (if (seq enrollments)
     [:div.space-y-3
      (for [e enrollments]
        (let [slot (or (:class_slots e) {})]
          ^{:key (:id e)}
          [:div.border.border-gray-100.rounded-lg.p-3.text-sm
           [:div.flex.justify-between.gap-2
            [:span.font-medium
             (or (:title slot)
                 (profile/band-label (:theta_band slot)))]
            [:span {:class (if (= (:status e) "confirmed")
                             "text-green-700"
                             "text-amber-700")}
             (or (:status e) "")]]
           [:p.text-gray-600 (format-dt (:starts_at slot))]
           [:p.text-gray-500
            (if (= (:modality slot) "online") "Online" "Presencial")]]))]
     [:p.text-sm.text-gray-500 "Todavía no te has inscrito a ningún cupo."])])

(defn- slots-body []
  (let [band @(re-frame/subscribe [:slots/band])
        items @(re-frame/subscribe [:slots/items])
        enrollments @(re-frame/subscribe [:slots/my-enrollments])
        loading? @(re-frame/subscribe [:slots/loading?])
        error @(re-frame/subscribe [:slots/error])
        message @(re-frame/subscribe [:slots/message])
        enrolled (enrolled-ids enrollments)
        unread @(re-frame/subscribe [:notifications/unread])]
    [:div.py-8.px-4
     [:div.max-w-3xl.mx-auto.space-y-6
      [:div.bg-white.rounded-xl.shadow.p-6
       [:h1.text-2xl.font-bold.text-gray-900.mb-1 "Cupos para ti"]
       (if band
         [:p.text-sm.text-indigo-700
          (str "Mostrando cupos de banda " (profile/band-label band)
               ". Se confirman al llegar al mínimo de inscritos.")]
         [:p.text-sm.text-amber-700
          "Completa un diagnóstico para filtrar cupos por tu nivel."])]

      (when (seq unread)
        [:div.bg-green-50.border.border-green-200.rounded-lg.p-4
         [:div.flex.justify-between.gap-2.items-start
          [:div
           [:p.font-semibold.text-green-800.mb-1 "Notificaciones"]
           (for [n unread]
             ^{:key (:id n)}
             [:p.text-sm.text-green-900.mb-1 (:message n)])]
          [:button.text-xs.text-green-700.underline.hover:text-green-900.transition
           {:type "button"
            :on-click #(re-frame/dispatch [:notifications/dismiss])}
           "Marcar leídas"]]])

      (when message
        [:p.text-sm.text-green-700.bg-green-50.rounded.px-3.py-2 message])
      (when error
        [:p.text-sm.text-red-700.bg-red-50.rounded.px-3.py-2 error])

      (cond
        loading?
        [ui/loading-block "Cargando cupos…"]

        (nil? band)
        [:div.bg-white.rounded-xl.shadow.p-8.text-center
         [:p.text-gray-600.mb-4
          "Necesitas un perfil de diagnóstico para ver cupos de tu banda."]
         [:button.bg-indigo-600.text-white.font-semibold.py-2.px-5.rounded-lg
          {:type "button"
           :on-click #(do
                        (re-frame/dispatch [:test/open-selection])
                        (re-frame/dispatch [:navigate-to :diagnostic-test]))}
          "Hacer diagnóstico"]]

        (empty? items)
        [:div.bg-white.rounded-xl.shadow.p-8.text-center.space-y-3
         [:p.text-gray-800.font-medium
          "Todavía no hay cupos abiertos para tu banda."]
         [:p.text-sm.text-gray-600.max-w-md.mx-auto
          (str "Un cupo es un grupo de estudio -- online o presencial -- con estudiantes de tu mismo "
               "nivel. Se confirma recién cuando junta un mínimo de inscritos, para que nadie quede en "
               "un grupo demasiado chico. Publicamos cupos nuevos a medida que se arman en tu banda.")]
         [:button.bg-indigo-600.text-white.font-semibold.py-2.px-5.rounded-lg.hover:bg-indigo-700.transition
          {:type "button"
           :on-click #(re-frame/dispatch [:contacto/abrir-panel])}
          "Avisarme cuando haya cupo"]]

        :else
        [:div.space-y-3
         (for [s items]
           ^{:key (:id s)}
           [slot-card s (contains? enrolled (:id s))])])

      [my-groups enrollments]

      [:div.flex.flex-wrap.gap-3.justify-center
       [:button.bg-white.border.border-gray-300.text-gray-700.font-semibold.py-2.px-5.rounded-lg.hover:bg-gray-50
        {:type "button"
         :on-click #(re-frame/dispatch [:navigate-to :plan])}
        "Mi plan"]
       [:button.bg-white.border.border-gray-300.text-gray-700.font-semibold.py-2.px-5.rounded-lg.hover:bg-gray-50
        {:type "button"
         :on-click #(re-frame/dispatch [:navigate-to :dashboard])}
        "Tablero"]]]]))

(defn slots-panel []
  (r/create-class
   {:display-name "slots-panel"
    :component-did-mount
    (fn [_]
      (re-frame/dispatch [:slots/enter]))
    :reagent-render
    (fn []
      [slots-body])}))
