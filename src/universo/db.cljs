(ns universo.db)
(def default-db
  {:ui {:current-page :home
        :current-section :main}
   :visitor {:id 0
             :ciudad "Iquique"
             :pais "Chile"
             :idioma "es"
             :browser "Chrome"
             :os "Windows"}
   :test {:status :not-started
          :current-question nil
          :questions []
          :answers []
          :score 0
          :time-spent 0
          :start-time nil
          :end-time nil}
   })
