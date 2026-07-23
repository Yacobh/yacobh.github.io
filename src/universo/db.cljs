(ns universo.db)

(def default-db
  {:ui {:current-page :home
        :current-section :main
        :modal nil
        :transitioning false}

   ;; Sesión Supabase (rehidratada en :auth/init)
   :auth {:ready? false
          :user nil
          :redirect-after-login nil}

   :visitor {:id nil
             :email nil
             :ciudad nil
             :pais nil
             :idioma nil
             :browser nil
             :os nil
             :logged-in false}

   :dashboard {:user-id nil
               :level 0
               :frecuencia 0
               :tests 0}

   :test {:questions []
          :question-ids []
          ;; Log de respuestas. Cada respuesta es un mapa con los detalles.
          ;; Esto es crucial para los cálculos de IRT.
          :responses [] ; e.g., [{:question-id :q1 :selected-option 1 :correct? true :time-ms 5234}]

          :traits {:logical 0.0 :visual 0.0 :verbal 0.0 :exploratory 0.0} ;; Perfil psicométrico
          :score 0

          ;; Parámetros para Item Response Theory (IRT)
          :theta 0.0             ;; Habilidad estimada (θ). Arranque neutro; MAP + Δθ limitan saltos.
          :theta-history []     ;; Evolución del parámetro theta a lo largo del test.
          :stop-reason nil      ;; nil | :precision | :max-items | :exhausted
          :email ""
          :status :not-started
          :start-time nil
          :end-time nil
          :topic nil
          :current-question nil
          ;; Prefetch de la siguiente pregunta (mientras se muestra feedback)
          :prefetched-question nil ; nil | mapa-pregunta | :exhausted
          :prefetching? false
          ;; Catálogo de evaluaciones (topics distintos en questions)
          :available-topics []
          :topics-loading? false
          :topics-error nil}

   :bookings {:by-id {}        ;; id -> booking info
              :all-ids []}})   ;; to preserve insertion order
