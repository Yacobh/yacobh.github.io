(ns universo.events.router
  "History API: mantiene la URL sincronizada con `:ui/current-section` (T-05,
   ADR-026).

   El sentido de la información importa y es asimétrico:

   - **De la sección a la URL:** siempre, y en un solo punto —
     `:complete-navigation` (`universo.subs`), que es donde la navegación
     efectivamente ocurre después de pasar por el guard. Escribir la URL antes
     dejaría `/admin` en la barra de un usuario que el guard mandó al login.
   - **De la URL a la sección:** solo en dos momentos, `:router/init` (carga
     inicial) y `:router/popstate` (botón atrás/adelante), y siempre volviendo a
     pasar por `:navigate-to`. El botón atrás no puede ser una puerta trasera."
  (:require
   [re-frame.core :as re-frame]
   [universo.events.auth :as auth]
   [universo.router :as router]))

;; -----------------------------------------------------------------------------
;; Efectos: el único lugar del proyecto que toca window.history
;; -----------------------------------------------------------------------------

(defn- current-path []
  (.. js/window -location -pathname))

(re-frame/reg-fx
 :router/push
 (fn [path]
   ;; Navegar a la sección en la que ya se está (ej. "Mi plan" estando en /plan)
   ;; no debe apilar una entrada: el botón atrás tendría que apretarse dos veces
   ;; para volver de verdad.
   (when (and path (not= path (router/normalize-path (current-path))))
     (.pushState (.-history js/window) nil "" path))))

(re-frame/reg-fx
 :router/replace
 (fn [path]
   (when path
     (.replaceState (.-history js/window) nil "" path))))

(re-frame/reg-fx
 :router/listen
 (fn [_]
   (.addEventListener js/window "popstate"
                      (fn [_] (re-frame/dispatch [:router/popstate (current-path)])))))

;; -----------------------------------------------------------------------------
;; Eventos
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :router/init
 ;; Se despacha con `dispatch-sync` en `universo.core/init!` **antes** de
 ;; `:auth/init`: así el destino de un deep link protegido queda anotado antes
 ;; de que la sesión resuelva y pueda consumirlo.
 (fn [{:keys [db]} _]
   (let [{:keys [kind section path]} (router/entry (current-path)
                                                   auth/protected-sections)]
     (merge
      {:router/listen nil}
      (case kind
        :section {:db (assoc-in db [:ui :current-section] section)
                  ;; Normaliza lo que el usuario haya escrito (`/Plan/`,
                  ;; `/index.html`) sin agregar una entrada al historial.
                  :router/replace path}

        :pending {:db (-> db
                          (assoc-in [:router :pending] section)
                          ;; Mantiene el contenido invisible mientras auth
                          ;; resuelve, en vez de mostrar la landing por un
                          ;; instante y saltar a la sección pedida.
                          (assoc-in [:ui :transitioning] true))}

        :not-found {:db (assoc-in db [:ui :current-section] :not-found)})))))

(re-frame/reg-event-fx
 :router/popstate
 (fn [_ [_ path]]
   (let [section (router/path->section path)]
     ;; `:replace` y no `:push`: el navegador ya movió la entrada del historial.
     ;; Sirve además para corregir la URL si el guard desvía (atrás hasta /admin
     ;; después de cerrar sesión debe terminar mostrando /ingresar).
     {:dispatch [:navigate-to (or section :not-found) {:history :replace}]})))
