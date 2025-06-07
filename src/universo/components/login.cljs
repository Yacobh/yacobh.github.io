(ns universo.components.login
  (:require [reagent.core :as r]
            [universo.supabase :as sb]))

(defn login-form []
  (let [email (r/atom "")
        password (r/atom "")
        loading (r/atom false)
        error (r/atom nil)
        success (r/atom nil)]

    (fn []
      [:div.login-container
       [:h2 "Iniciar Sesión"]

       ;; Mensajes de éxito/error
       (when @success
         [:div.success-message @success])

       (when @error
         [:div.error-message @error])

       ;; Formulario
       [:form {:on-submit (fn [e]
                            (.preventDefault e)
                            (reset! loading true)
                            (reset! error nil)
                            (reset! success nil)

                            (-> (sb/sign-in @email @password)
                                (.then (fn [response]
                                         (reset! loading false)
                                         (if (.-error response)
                                           (reset! error (.. response -error -message))
                                           (do
                                             (reset! success "¡Login exitoso!")
                                             (js/console.log "Usuario:" (.-user (.-data response)))))))
                                (.catch (fn [err]
                                          (reset! loading false)
                                          (reset! error "Error de conexión")))))}

        ;; Campo Email
        [:div.form-group
         [:label "Email:"]
         [:input {:type "email"
                  :placeholder "tu@email.com"
                  :value @email
                  :on-change #(reset! email (.. % -target -value))
                  :required true
                  :disabled @loading}]]

        ;; Campo Password
        [:div.form-group
         [:label "Contraseña:"]
         [:input {:type "password"
                  :placeholder "Tu contraseña"
                  :value @password
                  :on-change #(reset! password (.. % -target -value))
                  :required true
                  :disabled @loading}]]

        ;; Botón Submit
        [:button {:type "submit"
                  :disabled @loading}
         (if @loading "Iniciando sesión..." "Iniciar Sesión")]]])))
