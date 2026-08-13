(ns universo.components.guestbook
  (:require [reagent.core :as r]
            [re-frame.core :as re-frame]
            [clojure.string :as str]
            [cljs.core.async :refer [go <!]]
            [universo.db.crud :as crud]
            [universo.components.ui :as ui]))

(defn validate-form [form-data logged-in?]
  (let [{:keys [name message email]} form-data]
    (cond-> {}
      (str/blank? name) (assoc :name "El nombre es requerido")
      (str/blank? message) (assoc :message "El mensaje es requerido")
      (and (not logged-in?) (str/blank? email))
      (assoc :email "Necesitamos un correo para avisarte cuando respondamos")
      (and (not (str/blank? email))
           (not (re-matches #".+@.+\..+" email)))
      (assoc :email "Email inválido"))))

(defn- blank->nil [s]
  (when-not (str/blank? s) s))

(defn- build-row [form-data visitor-id]
  (let [vid (when visitor-id
              (let [n (js/parseInt (str visitor-id) 10)]
                (when-not (js/isNaN n) n)))]
    (cond-> {"name" (str/trim (:name form-data))
             "message" (str/trim (:message form-data))
             "email" (blank->nil (:email form-data))
             "phone" (blank->nil (:phone form-data))
             ;; null = pendiente de moderación (no false)
             "is_approved" nil}
      vid (assoc "id_visitor" vid))))

(defn- field-class [has-error?]
  (str "w-full px-3 py-2.5 border rounded-lg shadow-sm transition "
       "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 "
       (if has-error? "border-red-400" "border-gray-300")))

(defn- initial-avatar [name]
  [:div {:class (str "flex h-9 w-9 shrink-0 items-center justify-center rounded-full "
                      "bg-indigo-100 text-sm font-semibold text-indigo-700")}
   (str/upper-case (subs (or (blank->nil name) "?") 0 1))])

(defn guestbook-entry [entry]
  [:div {:class "rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition hover:shadow-md"}
   [:div {:class "flex items-start gap-3"}
    [initial-avatar (:name entry)]
    [:div {:class "min-w-0 flex-1"}
     [:div {:class "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1"}
      [:h4 {:class "font-semibold text-gray-900"} (:name entry)]
      (when (:created_at entry)
        [:span {:class "text-xs text-gray-400"}
         (.toLocaleDateString (js/Date. (:created_at entry)) "es-ES")])]
     [:p {:class "mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700"}
      (:message entry)]]]])

(defn guestbook-list [entries loading? error on-retry]
  [:div {:class "guestbook-list"}
   [:h3 {:class "mb-4 text-lg font-bold text-gray-800"}
    "Mensajes de la comunidad"]
   (cond
     loading?
     [ui/loading-block]

     error
     [:div {:class "space-y-3 rounded-xl bg-white p-5 sm:p-8 text-center shadow-sm"}
      [:p {:class "text-red-600"} error]
      [:button {:type "button"
                :class "rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                :on-click on-retry}
       "Reintentar"]]

     (empty? entries)
     [:div {:class "rounded-xl bg-white p-5 sm:p-8 text-center text-gray-500 shadow-sm"}
      [:p "Aún no hay mensajes publicados. ¡Sé el primero en firmar!"]]

     :else
     [:div {:class "space-y-3"}
      (for [entry entries]
        ^{:key (:id entry)}
        [guestbook-entry entry])])])

(defn guestbook-component []
  (let [form-data (r/atom {:name "" :email "" :phone "" :message ""})
        errors (r/atom {})
        success? (r/atom false)
        submit-error (r/atom nil)
        entries (r/atom [])
        loading-entries? (r/atom true)
        entries-error (r/atom nil)
        loading-submit? (r/atom false)
        synced-email-from (r/atom nil)
        fetch-entries!
        (fn []
          (reset! loading-entries? true)
          (reset! entries-error nil)
          (go
            (let [result (<! (crud/fetch-guestbook-entries))]
              (reset! loading-entries? false)
              (if (:success result)
                (reset! entries (or (:data result) []))
                (reset! entries-error
                        (or (:error result)
                            "No se pudieron cargar los mensajes. Intenta de nuevo."))))))]
    (r/create-class
     {:display-name "guestbook-component"

      :component-did-mount
      (fn [_] (fetch-entries!))

      :reagent-render
      (fn [_]
        (let [visitor-id @(re-frame/subscribe [:visitor-id])
              user @(re-frame/subscribe [:auth/user])
              logged-in? (boolean user)]
          ;; Si hay sesión, el correo del formulario es el de la cuenta —se
          ;; sincroniza una sola vez por usuario, sin pisar mientras escribe.
          (when (and user (not= @synced-email-from (:id user)))
            (swap! form-data assoc :email (or (:email user) ""))
            (reset! synced-email-from (:id user)))

          [:div {:class "mx-auto max-w-6xl px-4 py-8"}
           [:div {:class "mb-8 text-center"}
            [:h2 {:class "text-2xl font-bold text-gray-800 sm:text-3xl"} "Libro de visitas"]
            [:p {:class "mx-auto mt-2 max-w-xl text-gray-600"}
             "Deja un saludo, una pregunta o una sugerencia. "
             "Leemos cada mensaje personalmente antes de publicarlo."]]

           [:div {:class "grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-start"}
            ;; Formulario
            [:div {:class "lg:sticky lg:top-20 lg:col-span-2"}
             [:div {:class "rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-100"}
              (if @success?
                [:div {:class "py-6 text-center"}
                 [:div {:class "mb-3 text-5xl"} "✓"]
                 [:h3 {:class "mb-2 text-lg font-semibold text-gray-800"} "¡Gracias por escribir!"]
                 [:p {:class "text-sm text-gray-600"}
                  "Tu mensaje quedó pendiente de revisión y aparecerá acá en cuanto lo aprobemos."]
                 [:button
                  {:type "button"
                   :class "mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                   :on-click (fn []
                               (reset! success? false)
                               (reset! submit-error nil)
                               (reset! form-data {:name "" :email (if logged-in? (:email @form-data) "")
                                                   :phone "" :message ""}))}
                  "Dejar otro mensaje"]]

                [:form
                 {:on-submit
                  (fn [e]
                    (.preventDefault e)
                    (let [errs (validate-form @form-data logged-in?)]
                      (if (seq errs)
                        (reset! errors errs)
                        (do
                          (reset! errors {})
                          (reset! submit-error nil)
                          (reset! loading-submit? true)
                          (go
                            (let [row (build-row @form-data visitor-id)
                                  result (<! (crud/insert-guestbook! row))]
                              (reset! loading-submit? false)
                              (if (:success result)
                                (do
                                  (reset! success? true)
                                  (fetch-entries!))
                                (reset! submit-error
                                        (or (:error result)
                                            "No se pudo guardar el mensaje. Intenta de nuevo.")))))))))}

                 [:h3 {:class "mb-4 text-lg font-bold text-gray-800"} "Escribe tu mensaje"]

                 (when @submit-error
                   [:div {:class "mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"}
                    @submit-error])

                 [:div {:class "mb-4"}
                  [:label {:class "mb-1 block text-sm font-medium text-gray-700"} "Nombre *"]
                  [:input {:type "text"
                           :class (field-class (:name @errors))
                           :value (:name @form-data)
                           :on-change #(swap! form-data assoc :name (-> % .-target .-value))}]
                  (when (:name @errors)
                    [:p {:class "mt-1 text-sm text-red-600"} (:name @errors)])]

                 [:div {:class "mb-4"}
                  [:label {:class "mb-1 block text-sm font-medium text-gray-700"}
                   (if logged-in? "Correo" "Correo *")]
                  [:input {:type "email"
                           :disabled logged-in?
                           :class (str (field-class (:email @errors))
                                       (when logged-in? " bg-gray-50 text-gray-500"))
                           :value (:email @form-data)
                           :placeholder (when-not logged-in? "para avisarte si respondemos")
                           :on-change #(swap! form-data assoc :email (-> % .-target .-value))}]
                  (when (:email @errors)
                    [:p {:class "mt-1 text-sm text-red-600"} (:email @errors)])
                  (when-not logged-in?
                    [:p {:class "mt-1 text-xs text-gray-400"}
                     "No lo publicamos. Solo lo usamos para responderte."])]

                 [:div {:class "mb-4"}
                  [:label {:class "mb-1 block text-sm font-medium text-gray-700"} "Teléfono (opcional)"]
                  [:input {:type "tel"
                           :class (field-class false)
                           :value (:phone @form-data)
                           :on-change #(swap! form-data assoc :phone (-> % .-target .-value))}]]

                 [:div {:class "mb-5"}
                  [:label {:class "mb-1 block text-sm font-medium text-gray-700"} "Mensaje *"]
                  [:textarea {:class (str (field-class (:message @errors)) " h-28")
                              :value (:message @form-data)
                              :placeholder "Escribe aquí tu mensaje..."
                              :on-change #(swap! form-data assoc :message (-> % .-target .-value))}]
                  (when (:message @errors)
                    [:p {:class "mt-1 text-sm text-red-600"} (:message @errors)])]

                 [:button
                  {:type "submit"
                   :disabled @loading-submit?
                   :class "w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"}
                  (if @loading-submit? "Enviando..." "Firmar el libro de visitas")]

                 [:p {:class "mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400"}
                  "🔒 Revisamos cada mensaje a mano antes de publicarlo."]])]]

            ;; Lista de mensajes
            [:div {:class "lg:col-span-3"}
             [guestbook-list @entries @loading-entries? @entries-error fetch-entries!]]]]))})))
