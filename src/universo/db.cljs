(ns universo.db)

(def default-db
  {:ui {:current-page :home
        :current-section :main
        :modal nil}

   :visitor {:id 1
             :ciudad "Iquique"
             :pais "Chile"
             :idioma "es"
             :browser "Chrome"
             :os "Windows"
             :logged-in true}

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
          :theta 0.0            ;; Habilidad estimada del usuario (θ). El objetivo del modelo IRT es estimar este valor.
          :theta-history []     ;; Evolución del parámetro theta a lo largo del test.
          :email ""
          :status :not-started
          :start-time nil
          :end-time nil
          :topic "algebra"
          :current-question 0}

   :bookings {:by-id {}        ;; id -> booking info
              :all-ids []}})   ;; to preserve insertion order
