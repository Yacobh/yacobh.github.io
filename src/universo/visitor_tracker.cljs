(ns universo.visitor-tracker
  (:require [cljs.core.async :refer [go <!]]
            [universo.ip :refer [fetch-ip-info]]
            [universo.db.crud :as db]
            [re-frame.core :as re-frame]))

(defn visitor-saved? []
  (try
    (let [visitor-id (js/localStorage.getItem "visitor-id")]
      (when (boolean visitor-id) (re-frame/dispatch [:set-visitor-id visitor-id])))
    (catch :default e
      (js/console.warn "⚠️ Error accediendo a localStorage" e)
      false)))

(defn save-visitor! [visitor]
  (go
    (let [result (<! (db/insert-data-table! visitor "visitor"))]
      (if (:success result)
        (do
          (js/console.log "✅ Visitor saved:" result)
          (let [id (-> result :data :id)]
            (js/console.log "id? " id)
            (when id
              (js/console.log "✅ Visitor saved with ID:" id)
              (js/localStorage.setItem "visitor-id" (str id))
              (re-frame/dispatch [:set-visitor-id id]))))
        (js/console.error "❌ Error saving visitor:" result)))))


(defn start-tracking! []
  (when-not (visitor-saved?)
   (go
     (let [res (<! (fetch-ip-info))]
       (when (:success res)
         (let [data (:data res)
               visitor {:pais (:country_name data)
                        :ciudad (:city data)
                        :idioma (:languages data)
                        :timezone (:timezone data)}]
           (save-visitor! visitor)))))))
