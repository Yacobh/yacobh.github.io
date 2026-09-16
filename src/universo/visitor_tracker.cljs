(ns universo.visitor-tracker
  (:require [cljs.core.async :refer [go <!]]
            [universo.ip :refer [fetch-ip-info]]
            [universo.db.crud :as db]
            [universo.fuente :as fuente]
            [re-frame.core :as re-frame]))

(defn visitor-saved? []
  (try
    (let [visitor-id (js/localStorage.getItem "visitor-id")]
      (when visitor-id
        (re-frame/dispatch [:set-visitor-id visitor-id]))
      (boolean visitor-id))
    (catch :default e
      (js/console.warn "⚠️ Error accediendo a localStorage" e)
      false)))

(defn save-visitor! [visitor]
  (go
    (let [result (<! (db/track-visitor! visitor))]
      (if (:success result)
        (let [id (:id result)]
          (js/console.log "✅ Visitor saved with ID:" id)
          (when id
            (js/localStorage.setItem "visitor-id" (str id))
            (re-frame/dispatch [:set-visitor-id id])))
        (js/console.error "❌ Error saving visitor:" result)))))


(defn start-tracking!
  "Registra la visita, una sola vez por navegador.

   `query` es la query string con la que se abrió el sitio; de ahí sale la
   etiqueta de campaña `?de=tarjeta` (T-135, migración `061`). Se recibe como
   argumento y no se lee acá de `js/window` **a propósito**: cuando esta función
   corre, `:router/init` ya normalizó la URL con `replaceState` y la query string
   no existe más. Quien la lee a tiempo es `universo.core/init!`.

   ⚠️ El `when-not` de abajo es el límite conocido de la atribución: se inserta
   solo la **primera** vez que un navegador entra, así que `fuente` responde «de
   dónde llegó quien nunca había entrado», no «de dónde llegó esta visita». Un
   conocido que ya visitó la página y después escanea la tarjeta no suma. Para
   una campaña que busca gente nueva es lo que se quiere, pero hay que decirlo
   antes de leer los números."
  ([] (start-tracking! nil))
  ([query]
   (when-not (visitor-saved?)
     (let [;; Se resuelve antes del `go`: dentro ya es tarde, y además así la
           ;; etiqueta no depende de que la consulta de IP demore.
           de (fuente/de-query query)]
       (go
         (let [res (<! (fetch-ip-info))]
           (when (:success res)
             (let [data (:data res)
                   visitor {:pais (:country_name data)
                            :ciudad (:city data)
                            :idioma (:languages data)
                            :timezone (:timezone data)
                            :fuente de}]
               (save-visitor! visitor)))))))))
