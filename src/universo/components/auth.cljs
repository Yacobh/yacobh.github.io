(ns universo.components.auth
  (:require [reagent.core :as r]
            [universo.supabase :as sb]))

(defn auth-component []
  (let [;; Estado del formulario
        email (r/atom "")
        password (r/atom "")
        mode (r/atom :login) ; :login o :register

        ;; Estado de la app
        user (r/atom nil)
        loading (r/atom false)
        error (r/atom nil)
        message (r/atom nil)]

    ;; Verificar sesión al cargar
    (-> (sb/get-session)
        (.then (fn [res]
                 (when-let [session (.. res -data -session)]
                   (reset! user (.-user session))))))

    (fn []
      [:div.auth-container
       (if @user
         ;; Usuario logueado
         [:div.user-panel
          [:h2 "Bienvenido"]
          [:p "Email: " (.-email @user)]
          [:button {:on-click (fn []
                                (sb/sign-out)
                                (reset! user nil)
                                (reset! message "Sesión cerrada"))}
           "Cerrar Sesión"]]

         ;; Formulario de login/registro
         [:div.auth-form
          [:h2 (if (= @mode :login) "Iniciar Sesión" "Registrarse")]

          ;; Mensajes
          (when @error
            [:div.error @error])

          (when @message
            [:div.message @message])

          ;; Formulario
          [:form {:on-submit (fn [e]
                               (.preventDefault e)
                               (reset! loading true)
                               (reset! error nil)
                               (reset! message nil)

                               (let [auth-fn (if (= @mode :login)
                                               sb/sign-in
                                               sb/sign-up)]
                                 (-> (auth-fn @email @password)
                                     (.then (fn [res]
                                              (reset! loading false)
                                              (if (.-error res)
                                                (reset! error (.. res -error -message))
                                                (if (= @mode :login)
                                                  (reset! user (.. res -data -user))
                                                  (reset! message "¡Registro exitoso! Revisa tu email.")))))
                                     (.catch (fn [err]
                                               (reset! loading false)
                                               (reset! error "Error de conexión"))))))}

           [:input {:type "email"
                    :placeholder "Email"
                    :value @email
                    :on-change #(reset! email (.. % -target -value))
                    :required true}]

           [:input {:type "password"
                    :placeholder "Contraseña (mínimo 6 caracteres)"
                    :value @password
                    :on-change #(reset! password (.. % -target -value))
                    :required true
                    :min-length 6}]

           [:button {:type "submit"
                     :disabled @loading}
            (if @loading
              "Procesando..."
              (if (= @mode :login) "Iniciar Sesión" "Registrarse"))]]

          ;; Cambiar entre login y registro
          [:p.switch-mode
           (if (= @mode :login)
             [:span "¿No tienes cuenta? "
              [:a {:href "#"
                   :on-click (fn [e]
                               (.preventDefault e)
                               (reset! mode :register)
                               (reset! error nil))}
               "Regístrate"]]
             [:span "¿Ya tienes cuenta? "
              [:a {:href "#"
                   :on-click (fn [e]
                               (.preventDefault e)
                               (reset! mode :login)
                               (reset! error nil))}
               "Inicia sesión"]])]])])))
