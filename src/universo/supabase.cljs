(ns universo.supabase
  (:require ["@supabase/supabase-js" :as supabase]))

;; Tokens anonimos de Supabase
(def supabase-url "https://jmnqklhxcdccvdhuuiji.supabase.co")
(def supabase-anon-key "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbnFrbGh4Y2RjY3ZkaHV1aWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3NDAwNDksImV4cCI6MjA2NDMxNjA0OX0.WXchV7eoj4pzb8W_N_msmLNwRGEjWoAMRYrBApdRvOo")

(def supabase-client
  (supabase/createClient supabase-url supabase-anon-key))

(js/console.log "🔌 Cliente Supabase creado:" supabase-client)

; Login con email/password
(defn sign-in [email password]
  (-> supabase-client
      .-auth
      (.signInWithPassword #js {:email email
                                :password password})))

;; Login con Google
(defn sign-in-with-google []
  (-> supabase-client
      .-auth
      (.signInWithOAuth #js {:provider "google"
                             :options #js {:redirectTo (.-href js/window.location)}})))

;; Logout
(defn sign-out []
  (-> supabase-client
      .-auth
      (.signOut)))

;; Obtener sesión actual
(defn get-session []
  (js/console.log "1. supabase object:" supabase)
  (js/console.log "2. supabase.auth:" (.-auth supabase-client))
  (js/console.log "3. auth methods:" (when (.-auth supabase-client)
                                       (js/Object.keys (.-auth supabase-client))))

  ;; Intentar llamar el método solo si existe
  (if-let [auth (.-auth supabase-client)]
    (if-let [get-session-fn (.-getSession auth)]
      (do
        (js/console.log "4. Calling getSession...")
        (.getSession auth))
      (js/console.error "getSession method not found!"))
    (js/console.error "auth property not found!")))




;; Escuchar cambios de autenticación
(defn on-auth-state-change [callback]
  (-> supabase-client
      .-auth
      (.onAuthStateChange callback)))

;; También necesitas agregar sign-up a tu supabase.cljs:
(defn sign-up [email password]
  (-> supabase-client
      .-auth
      (.signUp #js {:email email
                    :password password})))
