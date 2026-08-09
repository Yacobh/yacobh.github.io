(ns universo.events.landing
  "Estado de la landing pública: testimonios (guestbook aprobado) y CTA principal."
  (:require
   [re-frame.core :as re-frame]
   [cljs.core.async :refer [go <!]]
   [universo.db.crud :as crud]))

;; -----------------------------------------------------------------------------
;; Suscripciones
;; -----------------------------------------------------------------------------

(re-frame/reg-sub
 :landing/testimonials
 (fn [db _]
   (get-in db [:landing :testimonials] [])))

(re-frame/reg-sub
 :landing/testimonials-loading?
 (fn [db _]
   (get-in db [:landing :loading?] false)))

(re-frame/reg-sub
 :landing/faq-open
 (fn [db _]
   (get-in db [:landing :faq-open])))

;; -----------------------------------------------------------------------------
;; Testimonios
;; -----------------------------------------------------------------------------

(re-frame/reg-fx
 :landing/fetch-testimonials
 (fn [_]
   (go
     (let [result (<! (crud/fetch-guestbook-entries))]
       (re-frame/dispatch [:landing/testimonials-loaded
                           (when (:success result) (:data result))])))))

(re-frame/reg-event-fx
 :landing/enter
 (fn [{:keys [db]} _]
   ;; Una sola carga por sesión: volver al inicio no vuelve a pegarle a Supabase.
   (if (get-in db [:landing :loaded?] false)
     {}
     {:db (assoc-in db [:landing :loading?] true)
      :landing/fetch-testimonials nil})))

(re-frame/reg-event-db
 :landing/testimonials-loaded
 (fn [db [_ rows]]
   (-> db
       (assoc-in [:landing :loading?] false)
       (assoc-in [:landing :loaded?] true)
       ;; Los testimonios son prueba social: solo mensajes con contenido real.
       (assoc-in [:landing :testimonials]
                 (->> (or rows [])
                      (filter #(and (seq (str (:message %)))
                                    (seq (str (:name %)))))
                      (take 6)
                      vec)))))

;; -----------------------------------------------------------------------------
;; FAQ (acordeón)
;; -----------------------------------------------------------------------------

(re-frame/reg-event-db
 :landing/toggle-faq
 (fn [db [_ idx]]
   (update-in db [:landing :faq-open] #(when-not (= % idx) idx))))

;; -----------------------------------------------------------------------------
;; CTA principal: lleva al diagnóstico si hay sesión, al login si no.
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :landing/start
 (fn [{:keys [db]} _]
   (if (get-in db [:auth :user])
     ;; Navegar no basta: hay que abrir la selección para que se cargue el
     ;; catálogo de evaluaciones (mismo par que ya usan dashboard/plan/cupos).
     {:dispatch-n [[:test/open-selection]
                   [:navigate-to :diagnostic-test]]}
     {:db (assoc-in db [:auth :redirect-after-login] :diagnostic-test)
      ;; Sin sesión no hay cuenta que iniciar: el CTA "Comenzar gratis" solo
      ;; tiene sentido como registro.
      :dispatch-n [[:auth/set-login-mode :register]
                   [:navigate-to :login]]})))
