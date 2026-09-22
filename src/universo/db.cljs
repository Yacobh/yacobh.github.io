(ns universo.db)

(def default-db
  {:ui {:current-page :home
        :current-section :main
        :modal nil
        :transitioning false}

   ;; Router de URL (T-05, ADR-026). :pending guarda la sección de un deep link
   ;; a una ruta protegida mientras `:auth/init` resuelve si hay sesión; la
   ;; consumen :auth/session-established y :auth/session-cleared. Fuera de ese
   ;; instante de arranque siempre es nil.
   :router {:pending nil}

   ;; :light | :dark — el valor real se decide en :theme/init (localStorage o
   ;; prefers-color-scheme); este default solo evita un nil antes de esa carga.
   :theme :light

   ;; Sesión Supabase (rehidratada en :auth/init)
   :auth {:ready? false
          :user nil
          :admin? false
          :role nil
          :redirect-after-login nil}

   ;; Panel del aula (T-133): el mapa de errores de un curso.
   ;;
   ;; La cohorte es una **ventana de tiempo con nombre**, no una tabla `cursos`
   ;; que no existe: un curso que rinde en la sala deja sus intentos contiguos.
   ;; `:desde`/`:hasta` son textos de `<input type="datetime-local">`, o sea
   ;; **hora local sin zona** — se convierten a instante al consultar, porque el
   ;; borde del día en UTC cae en otro lado (medido: un intento de las 21:34 de
   ;; Chile es del día siguiente en UTC).
   ;;
   ;; Estado de carga propio, no el de `:admin`: son dos pantallas distintas y
   ;; compartirlo haría que el spinner de una contaminara a la otra.
   :aula {:desde nil
          :hasta nil
          :topic-prefijo ""
          ;; `topic` exacto del banco elegido, o nil por todos. En una hora de
          ;; clase se rinden **varios** diagnósticos (el 2026-09-21 fueron seis
          ;; en la mañana), y θ de bancos distintos no es comparable: elegir uno
          ;; es lo que vuelve comparable la columna.
          :banco nil
          :tests []
          :loading? false
          :error nil
          :consultada nil          ;; la ventana que produjo `:tests`
          :truncada? false         ;; se alcanzó el tope del servidor
          :item-abierto nil        ;; id del ítem que se está proyectando
          ;; El ranking. `:primeros` es el default y no es cosmético: comparar
          ;; el último intento de cada uno premia a quien más veces repitió
          ;; (medido el 2026-09-21: los cinco primeros por acierto tenían 4, 4,
          ;; 4, 6 y **15** intentos, todos al 100 %).
          :ranking-base :primeros
          :ranking-orden :acierto
          ;; Las cohortes guardadas (`080`). `:sin-tabla?` es true cuando la
          ;; migración todavía no se aplicó: el aula sigue funcionando con la
          ;; ventana escrita a mano y lo dice, en vez de romperse (R-39).
          :cohortes []
          :cohortes-cargando? false
          :sin-tabla? false
          :cohorte-activa nil
          :nueva-cohorte nil
          :perfiles []}

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
           ;; Id del intento cuyo detalle se está mirando, o nil por la lista
           ;; (T-132). Se guarda el id y no la fila para que una recarga de
           ;; `:tests` no deje la vista mostrando una copia congelada.
           :test-abierto nil
           ;; Filas de `visitor` para el panel de métricas (T-22).
           :visitantes []
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
           ;; Edición rápida de dificultad desde la tabla (T-50), sin abrir el
           ;; editor completo: {question-id → valor-string sin guardar}
           :question-inline-edits {}
           :question-inline-saving? false
           :resources []
           :resources-module-filter ""
           :editing-resource nil
           ;; Borrador del formulario de recursos. Vive acá y no en un `r/atom`
           ;; del componente para que cambiar de pestaña no borre veinte minutos
           ;; de LaTeX escrito.
           :resource-draft nil
           :resource-saving? false
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

   ;; :resources son las filas crudas de recursos publicados; el cruce con los
   ;; déficits del perfil lo hace la suscripción :plan/resources (universo.plan).
   :plan {:loading? false
          :resources []
          ;; Respuestas del último test rendido. Solo alimentan el eje de
          ;; fluidez (ADR-019) cuando el perfil guardado no lo trae.
          :last-responses []
          ;; Cortes de fluidez del banco del último test (041). Se guardan
          ;; junto a las respuestas porque el recálculo necesita los dos.
          :fluency-thresholds nil
          :error nil}

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

          ;; ⚠ STUB MUERTO. Nada escribe ni lee esta clave: no hay función que
          ;; la calcule, ninguna vista que la muestre y ningún test que la
          ;; toque. Apuntaba al **Eje 3** de VISION §3.3 (canal visual /
          ;; auditivo / kinestésico), que ese mismo documento declara "fase
          ;; futura, sin diseño técnico".
          ;;
          ;; No se implementó, y ADR-019 explica por qué **no se va a
          ;; implementar así**: la hipótesis de los estilos de aprendizaje no
          ;; tiene respaldo empírico. El eje que sí se construyó es el **Eje 2**
          ;; (fluidez), en `universo.irt.fluency`.
          ;;
          ;; Se conserva la clave para no cambiar la forma de `app-db` sin
          ;; necesidad, pero **no la uses**: si algo la lee, está leyendo ceros.
          :traits {:logical 0.0 :visual 0.0 :verbal 0.0 :exploratory 0.0}
          :score 0

          ;; Parámetros para Item Response Theory (IRT)
          :theta 0.0             ;; Habilidad estimada (θ). Arranque neutro; MAP + Δθ limitan saltos.
          :theta-history []     ;; Evolución del parámetro theta a lo largo del test.
          :stop-reason nil      ;; nil | :precision | :max-items | :exhausted
          ;; Material que se le ofrece al estudiante cuando declara «no sé»
          ;; (ADR-029). nil hasta el primer escape del test.
          ;; {:loading? bool :items [...] :module-slug str}
          :escape-resources nil
          :email ""
          :status :not-started
          :start-time nil
          :end-time nil
          :topic nil
          :current-question nil
          ;; Prefetch de la siguiente pregunta (mientras se muestra feedback)
          :prefetched-question nil ; nil | mapa-pregunta | :exhausted
          :prefetching? false
          ;; Corrección en el servidor en curso (ADR-015): el ítem llega sin su
          ;; respuesta, así que responder es asíncrono y hay que bloquear las
          ;; alternativas mientras tanto.
          :scoring? false
          :score-error nil
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
          :stop-config nil

          ;; El rastro del intento en curso (070, ADR-036, T-134).
          ;; :id    → uuid generado por el cliente al empezar; nil fuera de un test.
          ;; :off?  → true cuando la tabla `intentos` no está alcanzable (070 sin
          ;;          aplicar, R-39). Se apaga **una vez y para toda la sesión**:
          ;;          el diagnóstico nunca se bloquea por no poder dejar rastro, y
          ;;          reintentar en cada respuesta solo llenaría la consola.
          :rastro {:id nil :off? false}}

   :bookings {:by-id {}        ;; id -> booking info
              :all-ids []}})   ;; to preserve insertion order
