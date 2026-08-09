(ns universo.db)

(def default-db
  {:ui {:current-page :home
        :current-section :main
        :modal nil
        :transitioning false}

   ;; :light | :dark — el valor real se decide en :theme/init (localStorage o
   ;; prefers-color-scheme); este default solo evita un nil antes de esa carga.
   :theme :light

   ;; Sesión Supabase (rehidratada en :auth/init)
   :auth {:ready? false
          :user nil
          :admin? false
          :role nil
          :redirect-after-login nil
          ;; Modo con el que debe abrir login-form la próxima vez que se monte
          ;; (nil | :register) — lo consume y limpia el propio componente, ver
          ;; :auth/set-login-mode / :auth/login-mode.
          :login-mode nil}

   :admin {:tab :overview
           ;; Estado por sección: evita que el spinner/error de una pestaña
           ;; contamine a las demás y permite cachear entre cambios de pestaña.
           ;; {:loading? bool :error str :loaded-at ms}
           :status {}
           :toast nil
           :overview nil
           :profiles []
           :users-query ""
           :users-page 0
           :deletion-requests []
           :tests []
           :tests-query ""
           :tests-page 0
           :guestbook []
           :guestbook-filter :pending
           :guestbook-counts {}
           :questions []
           :question-topics []
           :question-topic-filter nil
           :question-sort :default
           :question-editing? false
           :question-saving? false
           :question-draft nil
           :resources []
           :resources-module-filter ""
           :editing-resource nil
           :modules []
           :slots []
           :editing-slot nil
           :expanded-slot nil
           :rosters {}
           ;; Configuración de tests por topic (parada IRT + prerequisitos)
           :test-configs []
           :test-config-editing? false
           :test-config-saving? false
           :test-config-draft nil
           ;; {topic → cantidad de preguntas en el banco}, para no fijar una
           ;; regla de parada que el banco no pueda cumplir (T-40).
           :question-counts {}
           ;; true si Supabase recortó la respuesta y los conteos son un piso
           :question-counts-truncated? false}

   ;; Landing pública
   :landing {:testimonials []
             :loading? false
             :loaded? false
             :faq-open nil}

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

   :student-profile {:loading? false
                     :profile nil
                     :theta nil
                     :theta_band nil}

   :plan {:loading? false
          :resources []
          :error nil
          :deficit-slugs []}

   :slots {:loading? false
           :items []
           :enrollments []
           :error nil
           :message nil}

   :notifications {:items []}

   ;; Diálogo de confirmación global (reemplaza js/confirm nativo).
   ;; :variant → nil | :danger (paleta roja para acciones destructivas)
   :confirm {:open? false
             :title nil
             :message nil
             :confirm-label nil
             :variant nil
             :on-confirm nil}

   ;; Panel de contacto flotante — accesible sin importar la sección activa
   ;; (mismo patrón transversal que :confirm).
   :contacto {:panel-open? false}

   :account {:profile nil
             :profile-loading? false
             ;; :save-status → nil | :saving | :saved | :error
             :save-status nil
             ;; :deletion-request-status → nil | :sending | :sent | :error
             :deletion-request-status nil}

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
          ;; Catálogo de evaluaciones: test_configs filtrado por lo que el
          ;; usuario ya desbloqueó (universo.access/unlocked-topics).
          :available-topics []
          :topics-loading? false
          :topics-error nil
          ;; Config (min/max items, SE, tiempo) de todos los topics del
          ;; catálogo, indexada por topic — la usa :test/start para armar
          ;; :stop-config del topic elegido.
          :configs {}
          ;; Config de parada resuelta para el test en curso (nil hasta que
          ;; :test/start la arma desde :configs).
          :stop-config nil}

   :bookings {:by-id {}        ;; id -> booking info
              :all-ids []}})   ;; to preserve insertion order
