(ns universo.events.aula
  "Eventos del panel del aula: cargar una cohorte y leerla.

   Toda la aritmética vive en `universo.cohorte`, que es puro y testeable
   (ADR-009). Acá solo hay I/O y estado: elegir la ventana, pedir las filas y
   guardarlas. Ningún `reg-event-fx` calcula un porcentaje."
  (:require [cljs.core.async :refer [go <!]]
            [clojure.string :as str]
            [re-frame.core :as re-frame]
            [universo.cohorte :as cohorte]
            [universo.db.crud :as crud]))

;; -----------------------------------------------------------------------------
;; La ventana: de `datetime-local` a instante
;; -----------------------------------------------------------------------------

(def ^:private tope-de-filas
  "Salvaguarda del servidor. Una ventana de un año no debe poder tumbar la
   pestaña. Si la consulta vuelve con exactamente esta cantidad de filas, la
   pantalla lo dice en vez de mostrar un curso recortado en silencio."
  2000)

(defn local->iso
  "`\"2026-09-21T10:30\"` (lo que da `<input type=\"datetime-local\">`, en hora
   local y **sin zona**) → el instante ISO con zona que entiende PostgREST.

   `js/Date` interpreta un texto sin zona en la hora del navegador, que es
   justo lo que se quiere: el profesor escribe «10:30» pensando en el reloj de
   la sala, no en UTC."
  [s]
  (when-not (str/blank? (str s))
    (let [ms (.parse js/Date (str s))]
      (when-not (js/isNaN ms)
        (.toISOString (js/Date. ms))))))

(defn iso->local
  "El camino de vuelta, para rellenar el input. Recorta los segundos y la zona:
   `datetime-local` solo acepta `YYYY-MM-DDTHH:mm`."
  [ms]
  (when (number? ms)
    (let [d (js/Date. ms)
          pad (fn [n] (if (< n 10) (str "0" n) (str n)))]
      (str (.getFullYear d) "-" (pad (inc (.getMonth d))) "-" (pad (.getDate d))
           "T" (pad (.getHours d)) ":" (pad (.getMinutes d))))))

(defn ventana-por-defecto
  "La clase de hoy, de 08:00 a 13:00 en hora local.

   Un rango vacío obligaría a escribir dos fechas antes de ver nada; uno
   demasiado ancho traería el histórico entero. La mañana de hoy es la apuesta
   con más probabilidad de ser lo que el profesor quiere mirar."
  ([] (ventana-por-defecto (js/Date.)))
  ([ahora]
   (let [dia (js/Date. (.getFullYear ahora) (.getMonth ahora) (.getDate ahora))
         a-las (fn [h] (let [d (js/Date. (.getTime dia))]
                         (.setHours d h 0 0 0)
                         (iso->local (.getTime d))))]
     {:desde (a-las 8) :hasta (a-las 13)})))

;; -----------------------------------------------------------------------------
;; Eventos
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :aula/init
 (fn [{:keys [db]} _]
   ;; No pisa una ventana ya escrita: volver a la sección no debe borrar lo que
   ;; el profesor acababa de ajustar.
   {:db (cond-> db
          (nil? (get-in db [:aula :desde]))
          (update :aula merge (ventana-por-defecto))
          true
          (assoc-in [:aula :cohortes-cargando?] true))
    :fx/cargar-cohortes nil
    ;; Solo el admin puede leer `profiles` (RLS), y solo él necesita la lista
    ;; para asignarle una cohorte a alguien.
    :fx/cargar-profesores (boolean (get-in db [:auth :admin?]))}))

(re-frame/reg-fx
 :fx/cargar-profesores
 (fn [admin?]
   (when admin?
     (go
       (let [{:keys [success data]} (<! (crud/fetch-admin-profiles))]
         (when success
           (re-frame/dispatch [:aula/profesores-cargados data])))))))

(re-frame/reg-event-db
 :aula/profesores-cargados
 (fn [db [_ perfiles]]
   (assoc-in db [:aula :perfiles] (vec perfiles))))

;; -----------------------------------------------------------------------------
;; Las cohortes guardadas (`080`)
;; -----------------------------------------------------------------------------

(re-frame/reg-fx
 :fx/cargar-cohortes
 (fn [_]
   (go
     (let [{:keys [success data error sin-tabla?]} (<! (crud/fetch-cohortes))]
       (if success
         (re-frame/dispatch [:aula/cohortes-cargadas data sin-tabla?])
         (re-frame/dispatch [:aula/error error]))))))

(re-frame/reg-event-db
 :aula/cohortes-cargadas
 (fn [db [_ cohortes sin-tabla?]]
   (update db :aula merge {:cohortes (vec cohortes)
                           :cohortes-cargando? false
                           :sin-tabla? (boolean sin-tabla?)})))

(re-frame/reg-event-fx
 :aula/elegir-cohorte
 (fn [{:keys [db]} [_ {:keys [id desde hasta topic_prefijo]}]]
   ;; Elegir una cohorte **escribe la ventana** en vez de sustituirla por un id:
   ;; así el profesor ve exactamente qué intervalo está mirando y el resto de la
   ;; pantalla no necesita saber si vino de una cohorte o de dos campos.
   {:db (update db :aula merge
                {:cohorte-activa id
                 :desde (iso->local (cohorte/instante desde))
                 :hasta (iso->local (cohorte/instante hasta))
                 :topic-prefijo (or topic_prefijo "")
                 :banco nil
                 :error nil})
    :dispatch [:aula/cargar]}))

(re-frame/reg-event-db
 :aula/nueva-cohorte
 (fn [db [_ campo valor]]
   (if (nil? campo)
     (assoc-in db [:aula :nueva-cohorte] valor)
     (assoc-in db [:aula :nueva-cohorte campo] valor))))

(re-frame/reg-event-fx
 :aula/crear-cohorte
 (fn [{:keys [db]} _]
   (let [{:keys [nombre profesor-id topic-prefijo]} (get-in db [:aula :nueva-cohorte])
         {:keys [desde hasta]} (:aula db)
         desde-iso (local->iso desde)
         hasta-iso (local->iso hasta)
         yo (get-in db [:auth :user :id])]
     (cond
       (str/blank? (str nombre))
       {:db (assoc-in db [:aula :error] "La cohorte necesita un nombre.")}

       (str/blank? (str profesor-id))
       {:db (assoc-in db [:aula :error] "Elige a qué profesor pertenece.")}

       (or (nil? desde-iso) (nil? hasta-iso))
       {:db (assoc-in db [:aula :error] "Escribe las dos horas de la clase.")}

       :else
       {:db (assoc-in db [:aula :error] nil)
        :fx/crear-cohorte {:nombre (str/trim (str nombre))
                           :profesor-id profesor-id
                           :desde desde-iso
                           :hasta hasta-iso
                           :topic-prefijo topic-prefijo
                           :creado-por yo}}))))

(re-frame/reg-fx
 :fx/crear-cohorte
 (fn [datos]
   (go
     (let [{:keys [success error]} (<! (crud/insert-cohorte! datos))]
       (if success
         (do (re-frame/dispatch [:aula/nueva-cohorte nil nil])
             (re-frame/dispatch [:aula/recargar-cohortes]))
         (re-frame/dispatch [:aula/error error]))))))

(re-frame/reg-event-fx
 :aula/borrar-cohorte
 (fn [_ [_ id]]
   {:fx/borrar-cohorte id}))

(re-frame/reg-fx
 :fx/borrar-cohorte
 (fn [id]
   (go
     (let [{:keys [success error]} (<! (crud/delete-cohorte! id))]
       (if success
         (re-frame/dispatch [:aula/recargar-cohortes])
         (re-frame/dispatch [:aula/error error]))))))

(re-frame/reg-event-fx
 :aula/recargar-cohortes
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:aula :cohortes-cargando?] true)
    :fx/cargar-cohortes nil}))

(re-frame/reg-event-db
 :aula/set-campo
 (fn [db [_ campo valor]]
   (assoc-in db [:aula campo] valor)))

(re-frame/reg-event-fx
 :aula/cargar
 (fn [{:keys [db]} _]
   (let [{:keys [desde hasta]} (:aula db)
         desde-iso (local->iso desde)
         hasta-iso (local->iso hasta)]
     (cond
       (or (nil? desde-iso) (nil? hasta-iso))
       {:db (assoc-in db [:aula :error] "Escribe las dos horas de la clase.")}

       (>= (.parse js/Date desde-iso) (.parse js/Date hasta-iso))
       {:db (assoc-in db [:aula :error] "La hora de término va después de la de inicio.")}

       :else
       {:db (update db :aula merge {:loading? true :error nil})
        :fx/cargar-cohorte [desde-iso hasta-iso]}))))

(re-frame/reg-fx
 :fx/cargar-cohorte
 (fn [[desde-iso hasta-iso]]
   (go
     (let [{:keys [success data error]}
           (<! (crud/fetch-tests-en-ventana desde-iso hasta-iso tope-de-filas))]
       (if success
         (re-frame/dispatch [:aula/cargada data
                             {:desde desde-iso :hasta hasta-iso
                              :truncada? (>= (count data) tope-de-filas)}])
         (re-frame/dispatch [:aula/error error]))))))

(re-frame/reg-event-db
 :aula/cargada
 (fn [db [_ tests {:keys [desde hasta truncada?]}]]
   (update db :aula merge {:tests (vec tests)
                           :loading? false
                           :error nil
                           :consultada {:desde desde :hasta hasta}
                           :truncada? truncada?
                           :item-abierto nil})))

(re-frame/reg-event-db
 :aula/error
 (fn [db [_ error]]
   (update db :aula merge {:loading? false :error (str error) :tests []})))

(re-frame/reg-event-db
 :aula/abrir-item
 (fn [db [_ question-id]]
   (assoc-in db [:aula :item-abierto]
             (when-not (= question-id (get-in db [:aula :item-abierto]))
               question-id))))

;; -----------------------------------------------------------------------------
;; Suscripciones
;; -----------------------------------------------------------------------------

(re-frame/reg-sub :aula/estado (fn [db _] (:aula db)))

;; A quién se le puede asignar una cohorte: profesores primero, porque es lo
;; normal, pero **sin ocultar al resto** — asignarle una a alguien que todavía
;; es `user` es válido y su efecto es nulo hasta que se le dé el rol.
(re-frame/reg-sub
 :aula/candidatos
 :<- [:aula/estado]
 (fn [{:keys [perfiles]} _]
   (->> perfiles
        (sort-by (juxt #(case (str (:role %)) "profesor" 0 "admin" 1 2)
                       #(str (:email %))))
        vec)))

(re-frame/reg-sub
 :aula/cohortes
 :<- [:aula/estado]
 (fn [{:keys [cohortes]} _] cohortes))

(re-frame/reg-sub
 :aula/cohorte
 :<- [:aula/estado]
 (fn [{:keys [tests topic-prefijo banco]} _]
   ;; La ventana ya la aplicó el servidor; acá quedan el banco elegido, el
   ;; prefijo y la guarda de `origin` (R-37), que el servidor no puede aplicar
   ;; sin duplicar la regla.
   (cohorte/de-la-cohorte {:topic-prefijo topic-prefijo :banco banco} tests)))

;; Los bancos presentes en la **ventana entera**, no en la selección: si
;; dependiera de la selección, elegir uno haría desaparecer los demás y no
;; habría forma de volver.
(re-frame/reg-sub
 :aula/bancos-disponibles
 :<- [:aula/estado]
 (fn [{:keys [tests]} _]
   (cohorte/por-banco (cohorte/de-la-cohorte {} tests))))

(re-frame/reg-sub
 :aula/resumen
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/resumen tests)))

(re-frame/reg-sub
 :aula/ideas-erroneas
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/ideas-erroneas tests)))

(re-frame/reg-sub
 :aula/descartadas
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/descartadas tests)))

(re-frame/reg-sub
 :aula/deficit
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/acierto-por-modulo tests)))

(re-frame/reg-sub
 :aula/items
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/items-fallados tests)))

(re-frame/reg-sub
 :aula/item-proyectado
 :<- [:aula/items]
 :<- [:aula/estado]
 (fn [[items {:keys [item-abierto]}] _]
   ;; Sin elección explícita se proyecta el más fallado, que es la pregunta con
   ;; la que se abre la clase siguiente.
   (or (first (filter #(= item-abierto (:question-id %)) items))
       (first (filter #(pos? (:estudiantes-que-fallaron %)) items)))))

(re-frame/reg-sub
 :aula/distribucion
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/distribucion-theta tests)))

(re-frame/reg-sub
 :aula/por-banco
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/por-banco tests)))

(re-frame/reg-sub
 :aula/ranking
 :<- [:aula/cohorte]
 :<- [:aula/estado]
 (fn [[tests {:keys [ranking-base ranking-orden]}] _]
   (cohorte/ranking tests {:base (or ranking-base :primeros)
                           :ordenar-por (or ranking-orden :acierto)})))

(re-frame/reg-sub
 :aula/progreso-intentos
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/progreso-por-intento tests)))

(re-frame/reg-sub
 :aula/repeticion
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/repeticion-entre-intentos tests)))

(re-frame/reg-sub
 :aula/delta-theta
 :<- [:aula/cohorte]
 (fn [tests _] (cohorte/delta-theta tests)))

(re-frame/reg-sub
 :aula/estudiantes
 :<- [:aula/cohorte]
 (fn [tests _]
   ;; Un renglón por persona y banco, con su último θ y las marcas que dicen
   ;; cuándo ese número es un tope alcanzado y no una estimación.
   (->> (cohorte/mediciones-de-theta tests)
        (sort-by :correo)
        vec)))
