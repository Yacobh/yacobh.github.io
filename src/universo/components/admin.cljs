(ns universo.components.admin
  "Panel de administración: resumen, usuarios, tests, preguntas, recursos, cupos y moderación."
  (:require
   [clojure.string :as str]
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [universo.components.admin-questions :as admin-q]
   [universo.components.admin-test-configs :as admin-tc]
   [universo.components.plan :as plan]
   [universo.components.ui :as ui]))

;; -----------------------------------------------------------------------------
;; Utilidades de formato
;; -----------------------------------------------------------------------------

(defn- format-date-time [iso]
  (when iso
    (try
      (.toLocaleString (js/Date. iso) "es-CL"
                       #js {:day "2-digit" :month "2-digit" :year "numeric"
                            :hour "2-digit" :minute "2-digit"})
      (catch :default _ (str iso)))))

(defn- visitor-context-label
  "Línea de contexto del visitante (país, ciudad, idioma, timezone) para el
   panel de moderación del guestbook. nil si no hay id_visitor enlazado
   (mensajes antiguos, o si el visitante no pudo geolocalizarse)."
  [visitor]
  (when visitor
    (let [partes (remove str/blank? [(:ciudad visitor) (:pais visitor)
                                      (:idioma visitor) (:timezone visitor)])]
      (when (seq partes)
        (str/join " · " partes)))))

(defn- format-date [iso]
  (when iso
    (try
      (.toLocaleDateString (js/Date. iso) "es-CL"
                           #js {:day "2-digit" :month "short" :year "numeric"})
      (catch :default _ (str iso)))))

(defn- relative-time
  "«hace 3 min» para indicar la frescura de los datos cargados."
  [ms]
  (when ms
    (let [secs (js/Math.round (/ (- (.now js/Date) ms) 1000))]
      (cond
        (< secs 10) "recién"
        (< secs 60) (str "hace " secs " s")
        (< secs 3600) (str "hace " (js/Math.floor (/ secs 60)) " min")
        :else (str "hace " (js/Math.floor (/ secs 3600)) " h")))))

(defn- to-int
  "Parseo tolerante: devuelve nil si no es un entero válido."
  [v]
  (let [n (js/parseInt (str v) 10)]
    (when-not (js/isNaN n) n)))

(defn- iso-for-input
  "timestamptz → valor para <input type=datetime-local> en hora local."
  [iso]
  (when iso
    (try
      (let [d (js/Date. iso)
            pad #(if (< % 10) (str "0" %) (str %))]
        (str (.getFullYear d) "-" (pad (inc (.getMonth d))) "-" (pad (.getDate d))
             "T" (pad (.getHours d)) ":" (pad (.getMinutes d))))
      (catch :default _ nil))))

;; -----------------------------------------------------------------------------
;; Primitivas de UI
;; -----------------------------------------------------------------------------

(defn- btn
  [{:keys [variant on-click disabled? title]} label]
  [:button
   {:type "button"
    :title title
    :disabled (boolean disabled?)
    :on-click on-click
    :class (str "inline-flex items-center justify-center rounded-lg text-sm font-medium "
                "transition disabled:cursor-not-allowed disabled:opacity-50 "
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 "
                (case variant
                  :primary "bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500"
                  :danger "bg-red-50 px-3 py-1.5 text-red-700 hover:bg-red-100 focus-visible:ring-red-400"
                  :success "bg-green-600 px-3 py-1.5 text-white hover:bg-green-700 focus-visible:ring-green-500"
                  :ghost "px-3 py-1.5 text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-400"
                  "border border-gray-300 bg-white px-3 py-1.5 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-400"))}
   label])

(def ^:private input-class
  (str "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 "
       "placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none "
       "focus:ring-1 focus:ring-indigo-500"))

(defn- field
  [label & body]
  [:label {:class "block"}
   [:span {:class "mb-1 block text-xs font-medium text-gray-600"} label]
   (into [:<>] body)])

(defn- badge
  [tone label]
  [:span {:class (str "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium "
                      (case tone
                        :green "bg-green-100 text-green-800"
                        :amber "bg-amber-100 text-amber-800"
                        :red "bg-red-100 text-red-700"
                        :indigo "bg-indigo-100 text-indigo-700"
                        :gray "bg-gray-100 text-gray-600"
                        "bg-gray-100 text-gray-600"))}
   label])

(defn- empty-state
  [message]
  [:div {:class "rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center"}
   [:p {:class "text-sm text-gray-500"} message]])

(defn- spinner [] [ui/loading-block])

(defn- section-frame
  "Encabezado común: título, frescura de datos, botón de refresco y estados."
  [{:keys [section title description]} & body]
  (let [loading? @(re-frame/subscribe [:admin/section-loading? section])
        error @(re-frame/subscribe [:admin/section-error section])
        loaded-at @(re-frame/subscribe [:admin/section-loaded-at section])]
    [:div
     [:div {:class "mb-5 flex flex-wrap items-start justify-between gap-3"}
      [:div
       [:h2 {:class "text-lg font-semibold text-gray-900"} title]
       (when description
         [:p {:class "mt-0.5 text-sm text-gray-500"} description])]
      [:div {:class "flex items-center gap-3"}
       (when loaded-at
         [:span {:class "text-xs text-gray-400"}
          (str "Actualizado " (relative-time loaded-at))])
       [btn {:on-click #(re-frame/dispatch [:admin/refresh section])
             :disabled? loading?}
        (if loading? "Actualizando…" "Actualizar")]]]

     (when error
       [:div {:class "mb-4 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"}
        [:p {:class "text-sm text-red-700"} error]
        [btn {:variant :ghost
              :on-click #(re-frame/dispatch [:admin/refresh section])}
         "Reintentar"]])

     (cond
       (and loading? (not loaded-at)) [spinner]
       :else (into [:div] body))]))

(defn- toast-view []
  (when-let [{:keys [kind message]} @(re-frame/subscribe [:admin/toast])]
    [:div {:class "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4"
           :role "status"
           :aria-live "polite"}
     [:div {:class (str "flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg "
                        (if (= kind :error)
                          "bg-red-600 text-white"
                          "bg-gray-900 text-white"))}
      [:span {:aria-hidden "true"} (if (= kind :error) "!" "✓")]
      [:span {:class "text-sm font-medium"} message]
      [:button {:type "button"
                :class "ml-2 text-white/70 hover:text-white"
                :aria-label "Cerrar aviso"
                :on-click #(re-frame/dispatch [:admin/clear-toast nil])}
       "✕"]]]))

(defn- pagination
  [{:keys [page pages total on-page]}]
  (when (> pages 1)
    [:div {:class "mt-4 flex flex-wrap items-center justify-between gap-3"}
     [:p {:class "text-xs text-gray-500"}
      (str "Página " (inc page) " de " pages " · " total " registros")]
     [:div {:class "flex gap-2"}
      [btn {:on-click #(on-page (dec page)) :disabled? (zero? page)} "Anterior"]
      [btn {:on-click #(on-page (inc page)) :disabled? (>= (inc page) pages)} "Siguiente"]]]))

(defn- search-input
  [{:keys [value placeholder on-change]}]
  [:div {:class "relative max-w-sm"}
   [:input {:type "search"
            :class (str input-class " pl-9")
            :placeholder placeholder
            :value value
            :aria-label placeholder
            :on-change #(on-change (.. % -target -value))}]
   [:span {:class "pointer-events-none absolute left-3 top-2.5 text-gray-400"
           :aria-hidden "true"}
    "⌕"]])

;; -----------------------------------------------------------------------------
;; Resumen
;; -----------------------------------------------------------------------------

(defn- metric-card
  [{:keys [label value hint tone]}]
  [:div {:class "rounded-xl border border-gray-200 bg-white p-5"}
   [:p {:class "text-xs font-medium uppercase tracking-wide text-gray-500"} label]
   [:p {:class (str "mt-2 text-3xl font-bold "
                    (case tone
                      :amber "text-amber-600"
                      :indigo "text-indigo-600"
                      "text-gray-900"))}
    value]
   (when hint
     [:p {:class "mt-1 text-xs text-gray-500"} hint])])

(defn- slot-metrics
  "Deriva salud de cohortes desde los cupos ya cargados."
  [slots]
  (let [active (remove #(#{"cancelled" "completed"} (:status %)) slots)
        enrolled (fn [s] (count (remove #(= (:status %) "cancelled")
                                        (or (:enrollments s) []))))
        seats (reduce + 0 (map :capacity active))
        taken (reduce + 0 (map enrolled active))]
    {:open (count (filter #(= (:status %) "open") slots))
     :confirmed (count (filter #(= (:status %) "confirmed") slots))
     :enrolled taken
     :fill (if (pos? seats) (js/Math.round (* 100 (/ taken seats))) 0)
     :almost (->> active
                  (filter #(= (:status %) "open"))
                  (filter #(let [n (enrolled %)
                                 need (:min_enrollments %)]
                             (and (pos? n) (< n need))))
                  count)}))

(defn- band-distribution
  [bands]
  (let [order ["inicial" "basico" "intermedio" "avanzado"]
        total (reduce + 0 (vals bands))]
    [:div {:class "rounded-xl border border-gray-200 bg-white p-5"}
     [:h3 {:class "text-sm font-semibold text-gray-900"} "Estudiantes por banda"]
     (if (zero? total)
       [:p {:class "mt-3 text-sm text-gray-500"}
        "Todavía no hay diagnósticos con perfil calculado."]
       [:ul {:class "mt-4 space-y-3"}
        (for [b order
              :let [n (get bands b 0)
                    pct (if (pos? total) (js/Math.round (* 100 (/ n total))) 0)]]
          ^{:key b}
          [:li
           [:div {:class "flex justify-between text-xs text-gray-600"}
            [:span {:class "capitalize"} b]
            [:span (str n " · " pct "%")]]
           [:div {:class "mt-1 h-2 overflow-hidden rounded-full bg-gray-100"}
            [:div {:class "h-full rounded-full bg-indigo-500"
                   :style {:width (str (max pct 1) "%")}}]]])])]))

(defn- overview-panel []
  (let [data @(re-frame/subscribe [:admin/overview])]
    [section-frame
     {:section :overview
      :title "Resumen"
      :description "Estado general de la plataforma."}
     (if-not data
       [empty-state "Sin datos todavía."]
       (let [sm (slot-metrics (:slots data))]
         [:div {:class "space-y-6"}
          ;; Acciones que requieren atención
          (when (pos? (or (:guestbook-pending data) 0))
            [:div {:class "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"}
             [:p {:class "text-sm text-amber-900"}
              [:strong (:guestbook-pending data)]
              (if (= 1 (:guestbook-pending data))
                " mensaje espera moderación."
                " mensajes esperan moderación.")]
             [btn {:on-click #(re-frame/dispatch [:admin/set-tab :guestbook])}
              "Moderar ahora"]])

          (when (pos? (:almost sm))
            [:div {:class "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3"}
             [:p {:class "text-sm text-indigo-900"}
              [:strong (:almost sm)]
              " cupo(s) con inscritos pero aún sin alcanzar el mínimo para confirmarse."]
             [btn {:on-click #(re-frame/dispatch [:admin/set-tab :slots])}
              "Ver cupos"]])

          [:div {:class "grid grid-cols-2 gap-4 lg:grid-cols-4"}
           [metric-card {:label "Usuarios"
                         :value (:users data)
                         :hint (str (:admins data) " con rol admin")}]
           [metric-card {:label "Diagnósticos"
                         :value (:tests data)
                         :hint (str (:tests-7d data) " en los últimos 7 días")
                         :tone :indigo}]
           [metric-card {:label "Inscritos activos"
                         :value (:enrolled sm)
                         :hint (str (:fill sm) "% de los asientos publicados")}]
           [metric-card {:label "Pendientes de moderar"
                         :value (:guestbook-pending data)
                         :hint (str (:guestbook-approved data) " publicados")
                         :tone (if (pos? (or (:guestbook-pending data) 0)) :amber :gray)}]]

          [:div {:class "grid grid-cols-1 gap-4 lg:grid-cols-2"}
           [band-distribution (:bands data)]
           [:div {:class "rounded-xl border border-gray-200 bg-white p-5"}
            [:h3 {:class "text-sm font-semibold text-gray-900"} "Cupos y contenido"]
            [:dl {:class "mt-4 space-y-3 text-sm"}
             (for [[k v] [["Cupos abiertos" (:open sm)]
                          ["Cupos confirmados" (:confirmed sm)]
                          ["Recursos publicados"
                           (str (:resources-published data) " de " (:resources data))]]]
               ^{:key k}
               [:div {:class "flex justify-between border-b border-gray-100 pb-2 last:border-0"}
                [:dt {:class "text-gray-600"} k]
                [:dd {:class "font-semibold text-gray-900"} v]])]
            (when (and (pos? (or (:resources data) 0))
                       (zero? (or (:resources-published data) 0)))
              [:p {:class "mt-3 text-xs text-amber-700"}
               "Hay recursos creados pero ninguno publicado: los estudiantes no los ven."])]]]))]))

;; -----------------------------------------------------------------------------
;; Usuarios
;; -----------------------------------------------------------------------------

(defn- deletion-requests-alert []
  (let [requests @(re-frame/subscribe [:admin/deletion-requests])]
    (when (seq requests)
      [:div {:class "mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4"}
       [:p {:class "mb-2 text-sm font-semibold text-amber-900"}
        (str (count requests) " solicitud(es) de eliminación de cuenta pendiente(s)")]
       [:ul {:class "space-y-2"}
        (for [r requests]
          ^{:key (:id r)}
          [:li {:class "flex flex-col gap-1 rounded-lg bg-white px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"}
           [:span
            [:span {:class "font-medium text-gray-900"}
             (or (get-in r [:meta :email]) (:message r))]
            [:span {:class "ml-2 text-xs text-gray-500"} (format-date-time (:created_at r))]]
           [btn {:variant :success
                 :title "Marcar como atendida (esto no borra la cuenta: hazlo desde Supabase)"
                 :on-click #(re-frame/dispatch
                             [:confirm/ask
                              {:message "¿Marcar esta solicitud como atendida? Esto no elimina la cuenta: recuerda borrarla también en Supabase Auth."
                               :confirm-label "Marcar atendida"
                               :on-confirm [:admin/mark-deletion-attended (:id r)]}])}
            "Marcar atendida"]])]])))

(defn- users-panel []
  (let [{:keys [rows total page pages]} @(re-frame/subscribe [:admin/users-view])
        query @(re-frame/subscribe [:admin/users-query])
        me @(re-frame/subscribe [:auth/user])]
    [section-frame
     {:section :users
      :title "Usuarios"
      :description "Cuentas registradas y sus permisos."}
     [:div
      [deletion-requests-alert]
      [:div {:class "mb-4"}
       [search-input {:value query
                      :placeholder "Buscar por correo o rol"
                      :on-change #(re-frame/dispatch [:admin/set-users-query %])}]]

      (if-not (seq rows)
        [empty-state (if (str/blank? query)
                       "Sin usuarios registrados."
                       (str "Ningún usuario coincide con «" query "»."))]
        [:div
         [:div {:class "overflow-x-auto rounded-xl border border-gray-200"}
          [:table {:class "w-full text-left text-sm"}
           [:thead {:class "bg-gray-50 text-xs uppercase tracking-wide text-gray-500"}
            [:tr
             [:th {:scope "col" :class "px-4 py-3"} "Correo"]
             [:th {:scope "col" :class "px-4 py-3"} "Rol"]
             [:th {:scope "col" :class "px-4 py-3"} "Registrado"]
             [:th {:scope "col" :class "px-4 py-3 text-right"} "Acciones"]]]
           [:tbody {:class "divide-y divide-gray-100 bg-white"}
            (for [p rows]
              (let [self? (= (:id p) (:id me))
                    admin? (= (:role p) "admin")]
                ^{:key (:id p)}
                [:tr {:class "hover:bg-gray-50"}
                 [:td {:class "px-4 py-3 font-medium text-gray-900"}
                  (or (:email p) "—")
                  (when self?
                    [:span {:class "ml-2"} [badge :gray "tú"]])]
                 [:td {:class "px-4 py-3"}
                  (if admin?
                    [badge :indigo "admin"]
                    [badge :gray "user"])]
                 [:td {:class "px-4 py-3 text-gray-500"} (format-date (:created_at p))]
                 [:td {:class "px-4 py-3 text-right"}
                  (if self?
                    [:span {:class "text-xs text-gray-400"} "—"]
                    [btn {:variant (if admin? :default :ghost)
                          :title (if admin?
                                   "Quitar permisos de administrador"
                                   "Dar permisos de administrador")
                          :on-click
                          (fn []
                            (let [next-role (if admin? "user" "admin")]
                              (re-frame/dispatch
                               [:confirm/ask
                                {:message (str "¿Cambiar el rol de " (:email p)
                                               " a «" next-role "»?")
                                 :confirm-label "Cambiar rol"
                                 :on-confirm [:admin/set-role (:id p) next-role]}])))}
                     (if admin? "Quitar admin" "Hacer admin")])]]))]]]
         [pagination {:page page :pages pages :total total
                      :on-page #(re-frame/dispatch [:admin/set-users-page %])}]])]]))

;; -----------------------------------------------------------------------------
;; Tests
;; -----------------------------------------------------------------------------

(defn- score-bar
  [pct]
  (let [p (or pct 0)]
    [:div {:class "flex items-center gap-2"}
     [:div {:class "h-1.5 w-16 overflow-hidden rounded-full bg-gray-100"}
      [:div {:class (str "h-full rounded-full "
                         (cond
                           (>= p 70) "bg-green-500"
                           (>= p 40) "bg-amber-500"
                           :else "bg-red-400"))
             :style {:width (str (max p 2) "%")}}]]
     [:span {:class "text-xs text-gray-500"} (str p "%")]]))

(defn- tests-panel []
  (let [{:keys [rows total page pages]} @(re-frame/subscribe [:admin/tests-view])
        query @(re-frame/subscribe [:admin/tests-query])]
    [section-frame
     {:section :tests
      :title "Diagnósticos"
      :description "Resultados de los tests adaptativos, del más reciente al más antiguo."}
     [:div
      [:div {:class "mb-4"}
       [search-input {:value query
                      :placeholder "Buscar por correo o tema"
                      :on-change #(re-frame/dispatch [:admin/set-tests-query %])}]]

      (if-not (seq rows)
        [empty-state (if (str/blank? query)
                       "Todavía no hay diagnósticos rendidos."
                       (str "Ningún diagnóstico coincide con «" query "»."))]
        [:div
         [:div {:class "overflow-x-auto rounded-xl border border-gray-200"}
          [:table {:class "w-full text-left text-sm"}
           [:thead {:class "bg-gray-50 text-xs uppercase tracking-wide text-gray-500"}
            [:tr
             [:th {:scope "col" :class "px-4 py-3"} "Estudiante"]
             [:th {:scope "col" :class "px-4 py-3"} "Fecha"]
             [:th {:scope "col" :class "px-4 py-3"} "Tema"]
             [:th {:scope "col" :class "px-4 py-3"} "θ"]
             [:th {:scope "col" :class "px-4 py-3"} "Aciertos"]
             [:th {:scope "col" :class "px-4 py-3"} "Estado"]]]
           [:tbody {:class "divide-y divide-gray-100 bg-white"}
            (for [t rows]
              ^{:key (:id t)}
              [:tr {:class "hover:bg-gray-50"}
               [:td {:class "px-4 py-3 font-medium text-gray-900"} (or (:email t) "—")]
               [:td {:class "px-4 py-3 text-gray-500"} (format-date-time (:fecha t))]
               [:td {:class "px-4 py-3 text-gray-700"} (or (:tema t) "—")]
               [:td {:class "px-4 py-3 font-mono text-gray-900"}
                (if (:theta t)
                  (.toFixed (js/Number (:theta t)) 2)
                  "—")]
               [:td {:class "px-4 py-3"}
                [:div
                 [:span {:class "text-gray-700"}
                  (str (or (:correctas t) 0) "/" (or (:total t) 0))]
                 [score-bar (:porcentaje t)]]]
               [:td {:class "px-4 py-3"}
                (if (:completado? t)
                  [badge :green "completado"]
                  [badge :amber "incompleto"])]])]]]
         [pagination {:page page :pages pages :total total
                      :on-page #(re-frame/dispatch [:admin/set-tests-page %])}]])]]))

;; -----------------------------------------------------------------------------
;; Libro de visitas (moderación)
;; -----------------------------------------------------------------------------

(defn- guestbook-panel []
  (let [rows @(re-frame/subscribe [:admin/guestbook])
        mode @(re-frame/subscribe [:admin/guestbook-filter])
        counts @(re-frame/subscribe [:admin/guestbook-counts])]
    [section-frame
     {:section :guestbook
      :title "Libro de visitas"
      :description "Los mensajes aprobados se publican como testimonios en la portada."}
     [:div
      [:div {:class "mb-5 flex flex-wrap gap-2"}
       (for [[k label] [[:pending "Pendientes"]
                        [:approved "Aprobadas"]
                        [:trash "Papelera"]]]
         ^{:key k}
         [:button
          {:type "button"
           :aria-pressed (if (= k mode) "true" "false")
           :class (str "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition "
                       (if (= k mode)
                         "bg-indigo-600 text-white"
                         "bg-gray-100 text-gray-600 hover:bg-gray-200"))
           :on-click #(re-frame/dispatch [:admin/set-guestbook-filter k])}
          label
          (when-let [n (get counts k)]
            [:span {:class (str "rounded-full px-1.5 text-xs "
                                (if (= k mode) "bg-white/25" "bg-white"))}
             n])])]

      (if-not (seq rows)
        [empty-state (case mode
                       :trash "La papelera está vacía."
                       :approved "Todavía no hay mensajes aprobados."
                       "No hay mensajes pendientes. Todo al día.")]
        [:ul {:class "space-y-3"}
         (for [e rows]
           (let [approved? (true? (:is_approved e))
                 trash? (false? (:is_approved e))
                 pending? (nil? (:is_approved e))]
             ^{:key (:id e)}
             [:li {:class "rounded-xl border border-gray-200 bg-white p-5"}
              [:div {:class "mb-3 flex flex-wrap items-start justify-between gap-2"}
               [:div
                [:p {:class "font-semibold text-gray-900"} (or (:name e) "Anónimo")]
                [:p {:class "mt-0.5 space-x-3 text-xs text-gray-500"}
                 (when (:email e) [:span (:email e)])
                 (when (:phone e) [:span (:phone e)])]]
               [:div {:class "flex items-center gap-2"}
                (cond
                  approved? [badge :green "publicada"]
                  trash? [badge :gray "papelera"]
                  :else [badge :amber "pendiente"])
                [:span {:class "text-xs text-gray-400"} (format-date-time (:created_at e))]]]

              [:p {:class "whitespace-pre-wrap text-sm leading-relaxed text-gray-700"}
               (or (:message e) "")]

              (when-let [ctx (visitor-context-label (:visitor e))]
                [:p {:class "mt-2 text-xs text-gray-400"} "📍 " ctx])

              [:div {:class "mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4"}
               (when (or pending? trash?)
                 [btn {:variant :success
                       :on-click #(re-frame/dispatch [:admin/approve-guestbook (:id e)])}
                  "Publicar"])
               (when (or pending? approved?)
                 [btn {:on-click #(re-frame/dispatch [:admin/reject-guestbook (:id e)])}
                  (if approved? "Despublicar" "A la papelera")])
               (when trash?
                 [btn {:on-click #(re-frame/dispatch [:admin/restore-guestbook (:id e)])}
                  "Volver a pendientes"])
               (when trash?
                 [btn {:variant :danger
                       :on-click #(re-frame/dispatch
                                   [:confirm/ask
                                    {:message "¿Eliminar permanentemente esta entrada? No se puede deshacer."
                                     :confirm-label "Eliminar"
                                     :variant :danger
                                     :on-confirm [:admin/delete-guestbook (:id e)]}])}
                  "Eliminar"])]]))])]]))

(defn- contacto-contexto-line
  "Sección visitada y estado de sesión, del contexto curado que guarda
   events/contacto.cljs (ya no es el app-db completo, ver LESSONS_LEARNED)."
  [ctx]
  (when (map? ctx)
    (str "Sección: " (or (:seccion ctx) "—")
         (if (:logueado? ctx)
           (str " · con sesión" (when (:correo-cuenta ctx) (str " (" (:correo-cuenta ctx) ")")))
           " · sin sesión"))))

(defn- contacto-panel []
  (let [rows @(re-frame/subscribe [:admin/contacto])]
    [section-frame
     {:section :contacto
      :title "Mensajes de contacto"
      :description "Enviados desde el formulario del pie de página. Solo lectura."}
     (if-not (seq rows)
       [empty-state "No hay mensajes de contacto todavía."]
       [:ul {:class "space-y-3"}
        (for [e rows]
          ^{:key (:id e)}
          [:li {:class "rounded-xl border border-gray-200 bg-white p-5"}
           [:div {:class "mb-2 flex items-start justify-between gap-2"}
            [:span {:class "text-xs text-gray-400"} (format-date-time (:created_at e))]]
           [:p {:class "whitespace-pre-wrap text-sm leading-relaxed text-gray-700"}
            (or (:mensaje e) "")]
           (when (or (:telefono e) (:correo e))
             [:p {:class "mt-2 text-xs text-gray-500"}
              (when (:telefono e) (str "📞 " (:telefono e) "  "))
              (when (:correo e) (str "✉️ " (:correo e)))])
           (when-let [ctx-line (visitor-context-label (:visitor e))]
             [:p {:class "mt-2 text-xs text-gray-400"} "📍 " ctx-line])
           (when-let [line (contacto-contexto-line (:extra e))]
             [:p {:class "mt-1 text-xs text-gray-400"} line])])])]))

;; -----------------------------------------------------------------------------
;; Recursos
;; -----------------------------------------------------------------------------

(def ^:private resource-types
  [["text" "Texto / apuntes"]
   ["video_url" "Video"]
   ["audio_url" "Audio"]
   ["pdf_url" "PDF"]
   ["exercise" "Ejercicio"]])

(def ^:private blank-resource
  {:title "" :type "text" :module_id "" :body "" :media_url ""
   :historical_context "" :published true :order_index "1"})

(defn- resource-preview-pane
  "Panel derecho del editor: lo que el estudiante va a ver, en vivo.

   Renderiza con `plan/resource-card`, **la misma función** que dibuja el recurso
   en «Mi plan». No es una aproximación: si acá se ve bien y allá mal, es un bug
   de esa función, no del editor.

   Importante para el autor: el cuerpo pasa por `math/latex`, que entiende
   `$…$`, `$$…$$`, `**negrita**` y `*cursiva*` — pero **no** encabezados `##`,
   listas `-` ni tablas de Markdown, que se muestran tal cual se escriben. El
   `historical_context` se muestra como texto plano, sin LaTeX. Que eso se vea
   acá es justamente el punto."
  [{:keys [form modules]}]
  (let [{:keys [title type module_id body media_url historical_context published]} form
        slug (some (fn [m] (when (= (str (:id m)) (str module_id)) (:slug m))) modules)
        vacio? (and (str/blank? (str title))
                    (str/blank? (str body))
                    (str/blank? (str media_url)))]
    [:div {:class "lg:sticky lg:top-4 lg:self-start"}
     [:div {:class "mb-2 flex items-center justify-between gap-2"}
      [:span {:class "text-xs font-medium uppercase tracking-wide text-gray-500"}
       "Vista previa · lo que ve el estudiante"]
      (if published
        [badge :green "publicado"]
        [badge :amber "borrador"])]

     [:div {:class "rounded-xl border border-dashed border-indigo-200 bg-white/70 p-3"}
      (if vacio?
        [:p {:class "px-2 py-10 text-center text-sm text-gray-400"}
         "Escribe un título o contenido y aparecerá acá."]
        [plan/resource-card
         {:title (when (seq (str title)) title)
          :type type
          :body (when (seq (str body)) body)
          :media_url (when (seq (str media_url)) media_url)
          :historical_context (when (seq (str historical_context)) historical_context)
          :module_slug slug}])]

     (when-not published
       [:p {:class "mt-2 text-xs text-amber-700"}
        "Está en borrador: nadie lo ve todavía. Publícalo con la casilla de la izquierda."])

     [:details {:class "mt-3 text-xs text-gray-500"}
      [:summary {:class "cursor-pointer select-none hover:text-gray-700"}
       "Qué formato entiende el contenido"]
      [:ul {:class "mt-2 space-y-1 pl-4"}
       [:li "• " [:code "$x^2$"] " fórmula en línea · " [:code "$$x^2$$"] " fórmula centrada"]
       [:li "• " [:code "**negrita**"] " y " [:code "*cursiva*"]]
       [:li "• " [:code "\\$"] " para un signo peso literal (si no, rompe el parseo)"]
       [:li {:class "text-amber-700"}
        "• Los encabezados " [:code "##"] ", las listas " [:code "-"]
        " y las tablas de Markdown NO se renderizan: salen como texto."]]]]))

(defn- resource-payload
  "Fila lista para Supabase a partir del borrador. Claves string = columnas."
  [f]
  (cond-> {"title" (str/trim (str (:title f)))
           "type" (:type f)
           "module_id" (:module_id f)
           "body" (:body f)
           "media_url" (when (seq (str (:media_url f))) (:media_url f))
           "historical_context" (:historical_context f)
           "order_index" (or (to-int (:order_index f)) 0)
           "published" (boolean (:published f))}
    (:id f) (assoc "id" (:id f))))

(defn- resource-form
  "Crea o edita un recurso. `editing` viene del app-db al pulsar «Editar».

   El borrador vive en `app-db` (`:admin/resource-draft`), no en un `r/atom`
   local: antes, cambiar de pestaña y volver borraba lo escrito sin aviso, y
   escribir un recurso con LaTeX son veinte minutos. Es además la convención del
   proyecto para estado de UI por sección."
  []
  (let [synced (r/atom ::none)]
    (fn []
      (let [modules @(re-frame/subscribe [:admin/modules])
            editing @(re-frame/subscribe [:admin/editing-resource])
            draft @(re-frame/subscribe [:admin/resource-draft])
            saving? @(re-frame/subscribe [:admin/resource-saving?])
            editing-id (:id editing)]
        ;; Carga el borrador desde el recurso en edición. Solo al **cambiar** de
        ;; recurso: si se reconstruyera en cada render, escribir sería imposible.
        (when-not (= @synced editing-id)
          (reset! synced editing-id)
          (when editing
            (re-frame/dispatch
             [:admin/set-resource-draft
              (merge blank-resource
                     (-> editing
                         (select-keys [:id :title :type :module_id :body
                                       :media_url :historical_context :published])
                         (assoc :order_index (str (or (:order_index editing) 1)))))])))
        (let [form (or draft blank-resource)
              upd (fn [k v] (re-frame/dispatch [:admin/update-resource-draft k v]))
              {:keys [title module_id type]} form
              media-required? (not= type "text")
              errors (cond-> []
                       (str/blank? (str title)) (conj "El título es obligatorio.")
                       (str/blank? (str module_id)) (conj "Debes elegir un módulo.")
                       (and media-required? (str/blank? (str (:media_url form))))
                       (conj "Este tipo de recurso necesita una URL."))
              valid? (empty? errors)
              guardar! (fn []
                         (when (and valid? (not saving?))
                           (re-frame/dispatch
                            [:admin/save-resource (resource-payload form)])))
              ;; ⌘/Ctrl+Enter guarda, Esc descarta. Para un flujo que se repite
              ;; decenas de veces, dos atajos son la diferencia entre minutos y
              ;; horas. Van en el contenedor y no en cada campo: así funcionan
              ;; también desde el textarea, que es donde se pasa el tiempo.
              on-key (fn [e]
                       (cond
                         (and (= (.-key e) "Enter")
                              (or (.-metaKey e) (.-ctrlKey e)))
                         (do (.preventDefault e) (guardar!))

                         (= (.-key e) "Escape")
                         (do (.preventDefault e)
                             (reset! synced ::none)
                             (re-frame/dispatch [:admin/discard-resource-draft]))))]
          [:div {:class "rounded-xl border border-gray-200 bg-gray-50 p-5"
                 :on-key-down on-key}
           [:div {:class "mb-4 flex items-center justify-between gap-3"}
            [:h3 {:class "font-semibold text-gray-900"}
             (if editing-id "Editar recurso" "Nuevo recurso")]
            [:div {:class "flex items-center gap-3"}
             [:span {:class "hidden text-xs text-gray-500 sm:inline"}
              "⌘/Ctrl+Enter guarda · Esc descarta"]
             (when (or editing-id draft)
               [btn {:variant :ghost
                     :on-click (fn []
                                 (reset! synced ::none)
                                 (re-frame/dispatch [:admin/discard-resource-draft]))}
                (if editing-id "Cancelar edición" "Descartar borrador")])]]

           ;; Dos columnas desde `lg`: edición a la izquierda, vista previa viva
           ;; a la derecha. Por debajo de `lg` se apilan (la previa queda abajo),
           ;; porque lado a lado en un móvil deja dos columnas ilegibles.
           [:div {:class "grid grid-cols-1 gap-6 lg:grid-cols-2"}
            [:div
             [:div {:class "grid grid-cols-1 gap-4 sm:grid-cols-2"}
              [field "Título"
               [:input {:class input-class
                        :placeholder "Ej: Fracciones equivalentes"
                        :value (:title form)
                        :on-change #(upd :title (.. % -target -value))}]]
              [field "Tipo"
               [:select {:class input-class
                         :value (:type form)
                         :on-change #(upd :type (.. % -target -value))}
                (for [[v label] resource-types]
                  ^{:key v} [:option {:value v} label])]]
              [field "Módulo"
               [:select {:class input-class
                         :value (:module_id form)
                         :on-change #(upd :module_id (.. % -target -value))}
                [:option {:value ""} "Selecciona un módulo…"]
                (for [m modules]
                  ^{:key (:id m)}
                  [:option {:value (:id m)} (str (:slug m) " — " (:title m))])]]
              [field (str "URL del material" (when-not media-required? " (opcional)"))
               [:input {:class input-class
                        :type "url"
                        :placeholder "https://…"
                        :value (:media_url form)
                        :on-change #(upd :media_url (.. % -target -value))}]]
              [field "Orden"
               [:input {:class input-class
                        :type "number"
                        :min "0"
                        :value (:order_index form)
                        :on-change #(upd :order_index (.. % -target -value))}]]
              [field "Contexto histórico (opcional)"
               [:input {:class input-class
                        :placeholder "Dato o anécdota para enganchar"
                        :value (:historical_context form)
                        :on-change #(upd :historical_context (.. % -target -value))}]]]

             ;; Sin clase de alto: el `rows` manda. Monoespaciada porque acá se
             ;; escribe LaTeX, donde alinear `{}` y `\\` a ojo importa.
             [:div {:class "mt-4"}
              [field "Contenido (admite KaTeX)"
               [:textarea {:class (str input-class " font-mono leading-relaxed")
                           :rows 14
                           :placeholder "Explicación, pasos, ejemplos…"
                           :value (:body form)
                           :on-change #(upd :body (.. % -target -value))}]]]

             [:label {:class "mt-4 flex items-center gap-2 text-sm text-gray-700"}
              [:input {:type "checkbox"
                       :class "h-4 w-4 rounded border-gray-300 text-indigo-600"
                       :checked (boolean (:published form))
                       :on-change #(upd :published (.. % -target -checked))}]
              "Publicado (visible para estudiantes)"]]

            [resource-preview-pane {:form form :modules modules}]]

           (when (seq errors)
             [:ul {:class "mt-3 space-y-1"}
              (for [e errors]
                ^{:key e} [:li {:class "text-xs text-amber-700"} (str "• " e)])])

           [:div {:class "mt-5"}
            [btn {:variant :primary
                  :disabled? (or (not valid?) saving?)
                  :on-click guardar!}
             (cond
               saving? "Guardando…"
               editing-id "Guardar cambios"
               :else "Crear recurso")]]])))))

(defn- resources-panel []
  (let [rows @(re-frame/subscribe [:admin/resources-view])
        modules @(re-frame/subscribe [:admin/modules])
        module-filter @(re-frame/subscribe [:admin/resources-module-filter])]
    [section-frame
     {:section :resources
      :title "Recursos"
      :description "Material de apoyo que aparece en el plan de estudio de cada módulo."}
     [:div {:class "space-y-6"}
      [resource-form]

      [:div
       [:div {:class "mb-4 flex flex-wrap items-center justify-between gap-3"}
        [:div {:class "max-w-xs flex-1"}
         [field "Filtrar por módulo"
          [:select {:class input-class
                    :value module-filter
                    :on-change #(re-frame/dispatch
                                 [:admin/set-resources-module-filter (.. % -target -value)])}
           [:option {:value ""} "Todos los módulos"]
           (for [m modules]
             ^{:key (:id m)}
             [:option {:value (:id m)} (str (:slug m) " — " (:title m))])]]]
        [:p {:class "text-sm text-gray-500"} (str (count rows) " recurso(s)")]]

       (if-not (seq rows)
         [empty-state "No hay recursos con este filtro."]
         [:ul {:class "space-y-2"}
          (for [res rows]
            ^{:key (:id res)}
            [:li {:class "flex flex-wrap items-start justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4"}
             [:div {:class "min-w-0 flex-1"}
              [:div {:class "flex flex-wrap items-center gap-2"}
               [:p {:class "font-medium text-gray-900"} (:title res)]
               (if (:published res)
                 [badge :green "publicado"]
                 [badge :amber "borrador"])]
              [:p {:class "mt-1 text-xs text-gray-500"}
               (str (:type res)
                    (when-let [slug (get-in res [:modules :slug])] (str " · " slug))
                    " · orden " (or (:order_index res) 0))]
              (when-let [url (:media_url res)]
                [:a {:href url
                     :target "_blank"
                     :rel "noopener noreferrer"
                     :class "mt-1 inline-block truncate text-xs text-indigo-600 hover:underline"}
                 url])]
             [:div {:class "flex shrink-0 gap-2"}
              [btn {:on-click #(re-frame/dispatch [:admin/toggle-resource-published res])}
               (if (:published res) "Despublicar" "Publicar")]
              [btn {:on-click (fn []
                                (re-frame/dispatch [:admin/edit-resource res])
                                (.scrollTo js/window #js {:top 0 :behavior "smooth"}))}
               "Editar"]
              [btn {:title "Crear una copia sin publicar, lista para editar"
                    :on-click (fn []
                                (re-frame/dispatch [:admin/duplicate-resource res])
                                (.scrollTo js/window #js {:top 0 :behavior "smooth"}))}
               "Duplicar"]
              [btn {:variant :danger
                    :on-click #(re-frame/dispatch
                                [:confirm/ask
                                 {:message (str "¿Eliminar «" (:title res) "»?")
                                  :confirm-label "Eliminar"
                                  :variant :danger
                                  :on-confirm [:admin/delete-resource (:id res)]}])}
               "Eliminar"]]])])]]]))

;; -----------------------------------------------------------------------------
;; Cupos
;; -----------------------------------------------------------------------------

(def ^:private blank-slot
  {:title "" :theta_band "basico" :modality "online" :track ""
   :starts_at "" :location_or_link "" :capacity "8" :min_enrollments "3"})

(defn- slot-form []
  (let [form (r/atom blank-slot)
        synced (r/atom ::none)]
    (fn []
      (let [editing @(re-frame/subscribe [:admin/editing-slot])
            editing-id (:id editing)]
        (when-not (= @synced editing-id)
          (reset! synced editing-id)
          (reset! form (if editing
                         (merge blank-slot
                                {:id (:id editing)
                                 :title (or (:title editing) "")
                                 :theta_band (:theta_band editing)
                                 :modality (:modality editing)
                                 :track (or (:track editing) "")
                                 :starts_at (or (iso-for-input (:starts_at editing)) "")
                                 :location_or_link (or (:location_or_link editing) "")
                                 :capacity (str (:capacity editing))
                                 :min_enrollments (str (:min_enrollments editing))})
                         blank-slot)))
        (let [{:keys [starts_at capacity min_enrollments]} @form
              cap (to-int capacity)
              minimum (to-int min_enrollments)
              errors (cond-> []
                       (str/blank? (str starts_at))
                       (conj "Falta la fecha y hora de inicio.")

                       (or (nil? cap) (< cap 1))
                       (conj "La capacidad debe ser un número mayor que 0.")

                       (or (nil? minimum) (< minimum 1))
                       (conj "El mínimo de inscritos debe ser un número mayor que 0.")

                       (and cap minimum (> minimum cap))
                       (conj "El mínimo no puede superar la capacidad."))
              ;; Una fecha pasada no bloquea: hace falta poder corregir el lugar
              ;; o el enlace de un cupo que ya ocurrió.
              past? (and (seq (str starts_at))
                         (try (< (.getTime (js/Date. starts_at)) (.now js/Date))
                              (catch :default _ false)))
              valid? (empty? errors)]
          [:div {:class "rounded-xl border border-gray-200 bg-gray-50 p-5"}
           [:div {:class "mb-4 flex items-center justify-between"}
            [:h3 {:class "font-semibold text-gray-900"}
             (if editing-id "Editar cupo" "Nuevo cupo")]
            (when editing-id
              [btn {:variant :ghost
                    :on-click #(re-frame/dispatch [:admin/cancel-edit-slot])}
               "Cancelar edición"])]

           [:div {:class "grid grid-cols-1 gap-4 sm:grid-cols-2"}
            [field "Título (opcional)"
             [:input {:class input-class
                      :placeholder "Ej: Taller de álgebra — sábados"
                      :value (:title @form)
                      :on-change #(swap! form assoc :title (.. % -target -value))}]]
            [field "Banda de nivel"
             [:select {:class input-class
                       :value (:theta_band @form)
                       :on-change #(swap! form assoc :theta_band (.. % -target -value))}
              (for [b ["inicial" "basico" "intermedio" "avanzado"]]
                ^{:key b} [:option {:value b} b])]]
            [field "Modalidad"
             [:select {:class input-class
                       :value (:modality @form)
                       :on-change #(swap! form assoc :modality (.. % -target -value))}
              [:option {:value "online"} "Online"]
              [:option {:value "presencial"} "Presencial"]]]
            [field "Eje temático"
             [:select {:class input-class
                       :value (:track @form)
                       :on-change #(swap! form assoc :track (.. % -target -value))}
              [:option {:value ""} "Cualquiera"]
              (for [t ["aritmetica" "algebra" "geometria"]]
                ^{:key t} [:option {:value t} t])]]
            [field "Inicio"
             [:input {:class input-class
                      :type "datetime-local"
                      :value (:starts_at @form)
                      :on-change #(swap! form assoc :starts_at (.. % -target -value))}]]
            [field (if (= (:modality @form) "online") "Enlace de la videollamada" "Lugar")
             [:input {:class input-class
                      :placeholder (if (= (:modality @form) "online")
                                     "https://meet…"
                                     "Sala, dirección…")
                      :value (:location_or_link @form)
                      :on-change #(swap! form assoc :location_or_link (.. % -target -value))}]]
            [field "Capacidad"
             [:input {:class input-class
                      :type "number" :min "1"
                      :value (:capacity @form)
                      :on-change #(swap! form assoc :capacity (.. % -target -value))}]]
            [field "Mínimo para confirmar"
             [:input {:class input-class
                      :type "number" :min "1"
                      :value (:min_enrollments @form)
                      :on-change #(swap! form assoc :min_enrollments (.. % -target -value))}]]]

           (when (seq errors)
             [:ul {:class "mt-3 space-y-1"}
              (for [e errors]
                ^{:key e} [:li {:class "text-xs text-amber-700"} (str "• " e)])])

           (when (and past? valid?)
             [:p {:class "mt-3 text-xs text-gray-500"}
              "Aviso: la fecha de inicio está en el pasado."])

           [:div {:class "mt-5"}
            [btn {:variant :primary
                  :disabled? (not valid?)
                  :on-click
                  (fn []
                    (when valid?
                      (let [f @form
                            iso (try (.toISOString (js/Date. (:starts_at f)))
                                     (catch :default _ (:starts_at f)))]
                        (re-frame/dispatch
                         [:admin/save-slot
                          (cond-> {"title" (str/trim (str (:title f)))
                                   "theta_band" (:theta_band f)
                                   "modality" (:modality f)
                                   "track" (when (seq (str (:track f))) (:track f))
                                   "starts_at" iso
                                   "location_or_link" (:location_or_link f)
                                   "capacity" (to-int (:capacity f))
                                   "min_enrollments" (to-int (:min_enrollments f))}
                            (:id f) (assoc "id" (:id f))
                            (nil? (:id f)) (assoc "status" "open"))]))))}
             (if editing-id "Guardar cambios" "Publicar cupo")]]])))))

(defn- enrollment-count
  [slot]
  (count (remove #(= (:status %) "cancelled") (or (:enrollments slot) []))))

(defn- slot-status-badge
  [status]
  (case status
    "open" [badge :amber "abierto"]
    "confirmed" [badge :green "confirmado"]
    "cancelled" [badge :red "cancelado"]
    "completed" [badge :gray "finalizado"]
    [badge :gray (str status)]))

(defn- contacto-preferido-label
  [pref]
  (case pref
    "notification" "prefiere notificación en la plataforma"
    "whatsapp" "prefiere WhatsApp"
    "prefiere correo"))

(defn- wa-me-href
  [phone]
  (when (seq (str phone))
    (str "https://wa.me/" (str/replace (str phone) #"[^0-9]" ""))))

(defn- roster-view
  [slot-id]
  (let [{:keys [loading? error rows]} @(re-frame/subscribe [:admin/roster slot-id])]
    [:div {:class "mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4"}
     [:h4 {:class "mb-3 text-sm font-semibold text-gray-900"} "Inscritos"]
     (cond
       loading?
       [:p {:class "text-sm text-gray-500"} "Cargando inscritos…"]

       error
       [:p {:class "text-sm text-red-700"} error]

       (empty? rows)
       [:p {:class "text-sm text-gray-500"} "Nadie se ha inscrito en este cupo todavía."]

       :else
       [:ul {:class "divide-y divide-gray-200"}
        (for [e rows]
          ^{:key (:id e)}
          [:li {:class "flex flex-wrap items-center justify-between gap-2 py-2.5"}
           [:div
            [:p {:class "text-sm font-medium text-gray-900"}
             (or (:email e) (str "usuario " (subs (str (:user_id e)) 0 8)))]
            [:p {:class "text-xs text-gray-500"}
             (str "Inscrito " (format-date-time (:created_at e))
                  " · " (contacto-preferido-label (:contact_preference e)))]
            (when-let [href (and (= (:contact_preference e) "whatsapp") (wa-me-href (:phone e)))]
              [:a {:href href :target "_blank" :rel "noopener noreferrer"
                   :class "text-xs text-green-700 underline hover:text-green-900"}
               "Abrir WhatsApp"])]
           [:div {:class "flex items-center gap-2"}
            (case (:status e)
              "confirmed" [badge :green "confirmado"]
              "cancelled" [badge :red "cancelado"]
              [badge :amber "pendiente"])
            (if (= (:status e) "cancelled")
              [btn {:on-click #(re-frame/dispatch
                                [:admin/set-enrollment-status slot-id (:id e) "pending"])}
               "Reactivar"]
              [btn {:variant :danger
                    :on-click #(re-frame/dispatch
                                [:confirm/ask
                                 {:message "¿Cancelar la inscripción de este estudiante?"
                                  :confirm-label "Cancelar inscripción"
                                  :variant :danger
                                  :on-confirm [:admin/set-enrollment-status slot-id (:id e) "cancelled"]}])}
               "Cancelar"])]])])]))

(defn- slots-admin-panel []
  (let [rows @(re-frame/subscribe [:admin/slots])
        expanded @(re-frame/subscribe [:admin/expanded-slot])]
    [section-frame
     {:section :slots
      :title "Cupos"
      :description "Grupos de estudio publicados. Se confirman solos al alcanzar el mínimo de inscritos."}
     [:div {:class "space-y-6"}
      [slot-form]

      (if-not (seq rows)
        [empty-state "Aún no has publicado cupos."]
        [:ul {:class "space-y-3"}
         (for [s rows]
           (let [n (enrollment-count s)
                 cap (or (:capacity s) 0)
                 minimum (or (:min_enrollments s) 0)
                 pct (if (pos? cap) (js/Math.round (* 100 (/ n cap))) 0)
                 open? (= (:status s) "open")
                 expanded? (= expanded (:id s))]
             ^{:key (:id s)}
             [:li {:class "rounded-xl border border-gray-200 bg-white p-5"}
              [:div {:class "flex flex-wrap items-start justify-between gap-3"}
               [:div {:class "min-w-0"}
                [:div {:class "flex flex-wrap items-center gap-2"}
                 [:p {:class "font-semibold text-gray-900"}
                  (or (when (seq (str (:title s))) (:title s))
                      (str "Cupo " (:theta_band s)))]
                 [slot-status-badge (:status s)]
                 [badge :indigo (:modality s)]
                 [badge :gray (:theta_band s)]]
                [:p {:class "mt-1 text-sm text-gray-600"}
                 (format-date-time (:starts_at s))]
                (when-let [loc (:location_or_link s)]
                  (when (seq (str loc))
                    [:p {:class "mt-0.5 truncate text-xs text-gray-500"} loc]))]

               [:div {:class "text-right"}
                [:p {:class "text-sm font-semibold text-gray-900"}
                 (str n " / " cap)]
                [:p {:class "text-xs text-gray-500"} (str "mínimo " minimum)]]]

              ;; Progreso hacia el mínimo
              [:div {:class "mt-3"}
               [:div {:class "h-2 w-full overflow-hidden rounded-full bg-gray-100"}
                (when (pos? n)
                  [:div {:class (str "h-full rounded-full "
                                     (if (>= n minimum) "bg-green-500" "bg-amber-400"))
                         :style {:width (str (min 100 (max pct 3)) "%")}}])]
               [:p {:class "mt-1.5 text-xs text-gray-500"}
                (case (:status s)
                  "cancelled" "Cupo cancelado: ya no aparece para los estudiantes."
                  "completed" "Cupo finalizado."
                  "confirmed" (str "Confirmado con " n " inscrito(s).")
                  (cond
                    (>= n minimum) "Mínimo alcanzado: se confirmará automáticamente."
                    (zero? n) (str "Sin inscritos. Faltan " minimum " para confirmar.")
                    :else (str "Faltan " (- minimum n) " inscrito(s) para confirmar.")))]]

              [:div {:class "mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4"}
               [btn {:on-click #(re-frame/dispatch [:admin/toggle-roster (:id s)])}
                (if expanded? "Ocultar inscritos" (str "Ver inscritos (" n ")"))]
               [btn {:on-click (fn []
                                 (re-frame/dispatch [:admin/edit-slot s])
                                 (.scrollTo js/window #js {:top 0 :behavior "smooth"}))}
                "Editar"]
               (when open?
                 [btn {:variant :success
                       :title "Confirmar manualmente sin esperar el mínimo"
                       :on-click #(re-frame/dispatch
                                   [:confirm/ask
                                    {:message "¿Confirmar este cupo ahora?"
                                     :confirm-label "Confirmar"
                                     :on-confirm [:admin/set-slot-status (:id s) "confirmed"]}])}
                  "Confirmar"])
               (when (#{"open" "confirmed"} (:status s))
                 [btn {:on-click #(re-frame/dispatch
                                   [:confirm/ask
                                    {:message "¿Cancelar este cupo? Los inscritos dejarán de verlo."
                                     :confirm-label "Cancelar cupo"
                                     :variant :danger
                                     :on-confirm [:admin/set-slot-status (:id s) "cancelled"]}])}
                  "Cancelar cupo"])
               (when (= (:status s) "confirmed")
                 [btn {:on-click #(re-frame/dispatch [:admin/set-slot-status (:id s) "completed"])}
                  "Marcar finalizado"])
               [btn {:variant :danger
                     :title (when (pos? n) "Este cupo tiene inscritos")
                     :on-click #(re-frame/dispatch
                                 [:confirm/ask
                                  {:message (if (pos? n)
                                              (str "Este cupo tiene " n " inscrito(s). "
                                                   "Eliminarlo borrará también sus inscripciones. ¿Continuar?")
                                              "¿Eliminar este cupo?")
                                   :confirm-label "Eliminar"
                                   :variant :danger
                                   :on-confirm [:admin/delete-slot (:id s)]}])}
                "Eliminar"]]

              (when expanded?
                [roster-view (:id s)])]))])]]))

;; -----------------------------------------------------------------------------
;; Apariencia (ADR-022, migración 043)
;; -----------------------------------------------------------------------------

(def ^:private opciones-apariencia
  [["sistema" "Según el sistema del visitante"
    "Cada persona ve claro u oscuro según su configuración. Es lo que hacía el sitio antes de existir este ajuste."]
   ["claro" "Claro"
    "Todo el mundo entra en claro, sin importar su sistema."]
   ["oscuro" "Oscuro"
    "Todo el mundo entra en oscuro."]])

(defn- apariencia-panel []
  (r/with-let [_ (re-frame/dispatch [:admin/cargar-apariencia])]
    (let [actual @(re-frame/subscribe [:admin/apariencia])
          guardando? @(re-frame/subscribe [:admin/apariencia-guardando?])
          error @(re-frame/subscribe [:admin/apariencia-error])]
      [:section {:class "space-y-6"}
       [:div
        [:h2 {:class "text-lg font-medium text-gray-900"} "Apariencia del sitio"]
        [:p {:class "mt-1 text-sm text-gray-600 max-w-2xl"}
         "Define qué ve alguien que entra por primera vez. "
         [:strong "No cambia lo que ya eligió un visitante"]
         ": si usó el botón de sol/luna, su preferencia manda sobre esto — y así debe ser, "
         "es su pantalla."]]

       (when error
         [:div {:class "rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                :role "alert"}
          error])

       [:fieldset {:class "space-y-2"}
        [:legend {:class "sr-only"} "Apariencia por defecto"]
        (for [[valor titulo detalle] opciones-apariencia]
          ^{:key valor}
          [:label {:class (str "flex gap-3 rounded border p-4 cursor-pointer transition "
                               (if (= valor actual)
                                 "border-senal-600 bg-senal-50 dark:bg-senal-900"
                                 "border-panel-500 hover:border-panel-600"))}
           [:input {:type "radio"
                    :name "apariencia"
                    :value valor
                    :checked (= valor actual)
                    :disabled guardando?
                    :class "mt-1"
                    :on-change #(re-frame/dispatch [:admin/guardar-apariencia valor])}]
           [:span
            [:span {:class "block text-sm font-medium text-gray-900"} titulo]
            [:span {:class "block text-sm text-gray-600"} detalle]]])]

       (when guardando?
         [:p {:class "text-sm text-gray-500"} "Guardando…"])

       [:p {:class "text-xs text-gray-500 max-w-2xl"}
        "La paleta del sitio no se configura acá y no es un tema elegible: es la identidad del "
        "producto (lenguaje Braun, ADR-022). Lo que se elige es claro u oscuro."]])))

;; -----------------------------------------------------------------------------
;; Panel
;; -----------------------------------------------------------------------------

(def ^:private tabs
  [[:overview "Resumen"]
   [:users "Usuarios"]
   [:tests "Diagnósticos"]
   [:questions "Preguntas"]
   [:test-configs "Configuración de tests"]
   [:resources "Recursos"]
   [:slots "Cupos"]
   [:guestbook "Moderación"]
   [:contacto "Contacto"]
   [:apariencia "Apariencia"]])

(defn- tab-btn
  [id label current]
  (let [active? (= id current)
        pending @(re-frame/subscribe [:admin/guestbook-counts])
        n (when (= id :guestbook) (:pending pending))]
    [:button
     {:type "button"
      :aria-current (when active? "page")
      :class (str "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 "
                  "text-sm font-medium transition focus:outline-none "
                  "focus-visible:ring-2 focus-visible:ring-indigo-400 "
                  (if active?
                    "border-indigo-600 text-indigo-700"
                    "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800"))
      :on-click #(re-frame/dispatch [:admin/set-tab id])}
     label
     (when (and n (pos? n))
       [:span {:class "rounded-full bg-amber-100 px-1.5 text-xs font-semibold text-amber-800"}
        n])]))

(defn admin-panel []
  (r/create-class
   {:display-name "admin-panel"
    :component-did-mount
    (fn [_] (re-frame/dispatch [:admin/enter]))
    :reagent-render
    (fn []
      (let [tab @(re-frame/subscribe [:admin/tab])
            is-admin? @(re-frame/subscribe [:auth/admin?])
            role @(re-frame/subscribe [:auth/role])]
        [:div {:class "mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"}
         [:header {:class "mb-8"}
          [:h1 {:class "text-2xl font-bold text-gray-900"} "Administración"]
          [:p {:class "mt-1 text-sm text-gray-500"}
           "Usuarios, diagnósticos, contenido, cupos y moderación."]]

         (cond
           (nil? role)
           [:div {:class "rounded-xl border border-gray-200 bg-white px-6 py-10 text-center"}
            [:p {:class "text-sm text-gray-500"} "Verificando permisos…"]]

           (not is-admin?)
           [:div {:class "rounded-xl border border-amber-200 bg-amber-50 px-6 py-10 text-center"}
            [:p {:class "text-sm font-medium text-amber-900"}
             "No tienes permisos de administrador."]]

           :else
           [:div
            [:div {:class "mb-8 overflow-x-auto border-b border-gray-200"}
             [:nav {:class "flex gap-1" :aria-label "Secciones de administración"}
              (for [[id label] tabs]
                ^{:key id}
                [tab-btn id label tab])]]

            (case tab
              :overview [overview-panel]
              :users [users-panel]
              :tests [tests-panel]
              :questions [admin-q/questions-panel]
              :test-configs [admin-tc/test-configs-panel]
              :resources [resources-panel]
              :slots [slots-admin-panel]
              :guestbook [guestbook-panel]
              :contacto [contacto-panel]
              :apariencia [apariencia-panel]
              [overview-panel])])

         [toast-view]]))}))
