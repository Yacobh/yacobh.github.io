(ns universo.supabase
  (:require ["@supabase/supabase-js" :as supabase]
            [universo.router :as router]))

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
(defn- oauth-redirect-url
  "URL absoluta a la que Google devuelve al usuario tras el consentimiento.

   Es **fija**, no `window.location.href` como hasta 2026-08-17 (T-92): cada URL
   distinta que pueda salir de acá hay que declararla en la allowlist de Redirect
   URLs de Supabase Auth, y una que falte hace fallar el login en silencio. Con
   una sola, la allowlist tiene una sola entrada.

   Vuelve al **tablero** y no a `/`, apoyándose en el camino que ya existe: en
   GitHub Pages `/tablero` no es un archivo, así que lo sirve `404.html`, que
   arranca la misma aplicación (ADR-026, ADR-027). `:router/init` ve una sección
   protegida sin sesión todavía —la sesión del fragmento la resuelve
   `supabase-js` de forma asíncrona— y la deja en `[:router :pending]`; cuando
   `:auth/get-session` responde, `:auth/session-established` la consume y navega
   ahí con `:replace`. Es el mismo mecanismo de un deep link a `/plan` sin
   sesión (T-05), no uno nuevo.

   El path sale de la tabla del router y no escrito a mano, para que renombrar la
   ruta no deje esto apuntando a una URL muerta."
  []
  (str (.. js/window -location -origin)
       (or (router/section->path :dashboard) "/")))

(defn sign-in-with-google
  "Abre el consentimiento de Google. Redirige la pestaña: la promesa solo sirve
   para detectar el error de arranque (proveedor mal configurado, redirect no
   permitido); si todo va bien, el navegador ya se fue."
  []
  (-> supabase-client
      .-auth
      (.signInWithOAuth #js {:provider "google"
                             :options #js {:redirectTo (oauth-redirect-url)}})))

;; Logout
(defn sign-out []
  (-> supabase-client
      .-auth
      (.signOut)))

;; Obtener sesión actual (Promise → {data: {session}, error})
(defn get-session []
  (-> supabase-client
      .-auth
      .getSession))

(defn current-user-id
  "Promise → uuid string del usuario autenticado, o nil.
   Usa la sesión real del cliente (la que lleva el JWT en los requests)."
  []
  (-> (get-session)
      (.then (fn [response]
               (some-> response .-data .-session .-user .-id)))))




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
