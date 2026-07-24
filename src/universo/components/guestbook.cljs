(ns universo.components.guestbook
  (:require [reagent.core :as r]
            [re-frame.core :as re-frame]
            [clojure.string :as str]
            [cljs.core.async :refer [go <!]]
            [universo.db.crud :as crud]))

(defn validate-form [form-data]
  (let [{:keys [name message email]} form-data]
    (cond-> {}
      (str/blank? name) (assoc :name "El nombre es requerido")
      (str/blank? message) (assoc :message "El mensaje es requerido")
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
  (str "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
       (if has-error? "border-red-500" "border-gray-300")))

(defn guestbook-entry [entry]
  [:div {:class "bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-blue-500"}
   [:div {:class "flex justify-between items-start mb-2"}
    [:h4 {:class "font-semibold text-gray-800"} (:name entry)]
    (when (:created_at entry)
      [:span {:class "text-sm text-gray-500"}
       (.toLocaleDateString (js/Date. (:created_at entry)) "es-ES")])]
   [:p {:class "text-gray-700 leading-relaxed"} (:message entry)]])

(defn guestbook-list [entries loading?]
  [:div {:class "guestbook-list"}
   [:h3 {:class "text-xl font-bold text-gray-800 mb-4 text-center"}
    "Mensajes publicados"]
   (cond
     loading?
     [:div {:class "text-center py-8"}
      [:div {:class "inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"}]]

     (empty? entries)
     [:div {:class "text-center py-8 text-gray-500"}
      [:p "Aún no hay mensajes publicados. ¡Sé el primero en firmar!"]]

     :else
     [:div
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
        loading-submit? (r/atom false)]
    (r/create-class
     {:display-name "guestbook-component"

      :component-did-mount
      (fn [_]
        (go
          (let [result (<! (crud/fetch-guestbook-entries))]
            (reset! loading-entries? false)
            (if (:success result)
              (reset! entries (or (:data result) []))
              (js/console.error "Error loading guestbook:" (:error result))))))

      :reagent-render
      (fn [_]
        (let [visitor-id @(re-frame/subscribe [:visitor-id])]
          [:div {:class "max-w-4xl mx-auto px-4 py-8"}
           [:div {:class "bg-white rounded-lg shadow-lg p-6 mb-8"}
            [:div {:class "text-center mb-6"}
             [:h2 {:class "text-2xl font-bold text-gray-800 mb-2"} "Libro de visitas"]
             [:p {:class "text-gray-600"}
              "Deja un saludo. Los mensajes se publican tras una breve revisión."]]

            (if @success?
              [:div {:class "text-center py-8"}
               [:div {:class "text-green-600 text-6xl mb-4"} "✓"]
               [:h3 {:class "text-xl font-semibold text-gray-800 mb-2"} "¡Gracias por firmar!"]
               [:p {:class "text-gray-600"}
                "Tu mensaje quedó pendiente de aprobación y aparecerá aquí cuando sea publicado."]
               [:button
                {:type "button"
                 :class "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                 :on-click (fn []
                             (reset! success? false)
                             (reset! submit-error nil)
                             (reset! form-data {:name "" :email "" :phone "" :message ""}))}
                "Agregar otro mensaje"]]

              [:form
               {:on-submit
                (fn [e]
                  (.preventDefault e)
                  (let [errs (validate-form @form-data)]
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
                              (reset! success? true)
                              (reset! submit-error
                                      (or (:error result)
                                          "No se pudo guardar el mensaje. Intenta de nuevo.")))))))))}

               (when @submit-error
                 [:div {:class "mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"}
                  @submit-error])

               [:div {:class "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"}
                [:div
                 [:label {:class "block text-sm font-medium text-gray-700 mb-1"} "Nombre *"]
                 [:input {:type "text"
                          :class (field-class (:name @errors))
                          :value (:name @form-data)
                          :on-change #(swap! form-data assoc :name (-> % .-target .-value))}]
                 (when (:name @errors)
                   [:p {:class "text-red-500 text-sm mt-1"} (:name @errors)])]
                [:div
                 [:label {:class "block text-sm font-medium text-gray-700 mb-1"} "Email (opcional)"]
                 [:input {:type "email"
                          :class (field-class (:email @errors))
                          :value (:email @form-data)
                          :on-change #(swap! form-data assoc :email (-> % .-target .-value))}]
                 (when (:email @errors)
                   [:p {:class "text-red-500 text-sm mt-1"} (:email @errors)])]]

               [:div {:class "mb-4"}
                [:label {:class "block text-sm font-medium text-gray-700 mb-1"} "Teléfono (opcional)"]
                [:input {:type "tel"
                         :class (field-class false)
                         :value (:phone @form-data)
                         :on-change #(swap! form-data assoc :phone (-> % .-target .-value))}]]

               [:div {:class "mb-6"}
                [:label {:class "block text-sm font-medium text-gray-700 mb-1"} "Mensaje *"]
                [:textarea {:class (str (field-class (:message @errors)) " h-24")
                            :value (:message @form-data)
                            :placeholder "Escribe aquí tu mensaje..."
                            :on-change #(swap! form-data assoc :message (-> % .-target .-value))}]
                (when (:message @errors)
                  [:p {:class "text-red-500 text-sm mt-1"} (:message @errors)])]

               [:div {:class "text-center"}
                [:button
                 {:type "submit"
                  :disabled @loading-submit?
                  :class "px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"}
                 (if @loading-submit? "Enviando..." "Firmar el libro de visitas")]]])]

           [guestbook-list @entries @loading-entries?]]))})))
