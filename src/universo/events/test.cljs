(ns universo.events.test
  (:require
   [re-frame.core :as re-frame]
   [universo.access :as access]
   [universo.components.tetha :as tetha]
   [universo.irt.effort :as effort]
   [universo.irt.escape :as escape]
   [universo.irt.fluency :as fluency]
   [universo.irt.progress :as progress]
   [universo.motor :as motor]
   [universo.reintento :as reintento]
   [cljs.core.async :as async :refer [go <!]]
   [universo.db.crud :as crud]
   [universo.supabase :as sb]))

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Normaliza la pregunta
;; -----------------------------------------------------------------------------

;; El ítem llega desde el RPC `next_question` SIN :correct-option ni :errors
;; (ADR-015): la respuesta correcta y la explicación las entrega `score_answer`
;; recién después de que el estudiante elige. `module_slug`/`module_title` vienen
;; planos desde la función, no como join anidado `:modules`.
(defn normalize-question [q]
  {:id (:id q)
   :question (:question q)
   :options [{:value "A" :label (:option_a q)}
             {:value "B" :label (:option_b q)}
             {:value "C" :label (:option_c q)}
             {:value "D" :label (:option_d q)}]
   :difficulty (:difficulty q)
   :position (:order_index q)
   :topic (:topic q)
   :module-id (:module_id q)
   :module-slug (:module_slug q)})

;; -----------------------------------------------------------------------------
;; 🔹 FUNCIÓN AUXILIAR: Mapea label de UI → id de topic en Supabase
;; -----------------------------------------------------------------------------

(def topic-aliases
  {"Números"   "numbers_V1"
   "Numeros"   "numbers_V1"
   "números"   "numbers_V1"
   "numbers"   "numbers_V1"
   "numbers_V1" "numbers_V1"
   "Álgebra"   "algebra"
   "Algebra"   "algebra"
   "algebra"   "algebra"})

(defn resolve-topic
  "Normaliza el topic del test al identificador usado en Supabase."
  [topic]
  (or (get topic-aliases topic)
      topic
      "numbers_V1"))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Abre la selección de evaluaciones (topics desde Supabase)
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :test/open-selection
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:test :status] :select)
            (assoc-in [:test :topics-loading?] true)
            (assoc-in [:test :topics-error] nil)
            (assoc-in [:test :available-topics] [])
            (assoc-in [:test :feedback] nil))
    :dispatch [:test/load-topics]}))

;; test_configs es el catálogo autoritativo de "tests ofrecidos" (con active
;; para borradores) y quién puede iniciarlos se deriva del propio historial
;; de tests del usuario — no hay tabla de "accesos otorgados" (ver
;; universo.access y supabase/migrations/020, 021).
(re-frame/reg-fx
 :test/fetch-topics
 (fn [{:keys [user-id admin?]}]
   (go
     (let [configs-r (<! (crud/fetch-test-configs))
           history-r (if admin?
                       {:success true :data []}
                       (<! (crud/fetch-user-test-history user-id)))]
       (if (and (:success configs-r) (:success history-r))
         (re-frame/dispatch [:test/topics-loaded
                             {:configs (:data configs-r)
                              :history (:data history-r)
                              :admin? admin?}])
         (re-frame/dispatch [:test/topics-failed
                             (or (:error configs-r) (:error history-r)
                                 "No se pudieron cargar las evaluaciones")]))))))

(re-frame/reg-event-fx
 :test/load-topics
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:test :topics-loading?] true)
            (assoc-in [:test :topics-error] nil))
    :test/fetch-topics {:user-id (get-in db [:auth :user :id])
                        :admin? (get-in db [:auth :admin?])}}))

(re-frame/reg-event-fx
 :test/topics-loaded
 (fn [{:keys [db]} [_ {:keys [configs history admin?]}]]
   (let [achieved (access/best-theta-by-topic history)
         unlocked (if admin?
                    (set (map :topic configs))
                    (access/unlocked-topics configs achieved))
         visible (filterv #(contains? unlocked (:topic %)) configs)
         config-by-topic (into {} (map (juxt :topic identity)) configs)
         disponibles (mapv :topic visible)
         ;; Un «rendir de nuevo» del tablero (`:test/retake`) deja acá el topic
         ;; que se quiere arrancar. No se puede arrancar antes: `:test/start`
         ;; exige que el topic esté en `available-topics`, y esa lista solo
         ;; existe después de esta consulta.
         pendiente (get-in db [:test :pending-start])
         db' (-> db
                 (assoc-in [:test :available-topics] disponibles)
                 (assoc-in [:test :configs] config-by-topic)
                 (assoc-in [:test :topics-loading?] false)
                 (assoc-in [:test :topics-error] nil)
                 (update :test dissoc :pending-start))]
     (cond
       (nil? pendiente)
       {:db db'}

       (or admin? (contains? (set disponibles) pendiente))
       {:db db' :dispatch [:test/start pendiente]}

       ;; El topic se desactivó o dejó de cumplir su prerequisito entre que se
       ;; rindió y hoy. Se deja el selector abierto con el motivo, en vez de
       ;; arrancar algo distinto de lo que se pidió o quedarse en blanco.
       :else
       {:db (assoc-in db' [:test :topics-error]
                      "Esa evaluación ya no está disponible. Elige otra de la lista.")}))))

(re-frame/reg-event-db
 :test/topics-failed
 (fn [db [_ message]]
   (-> db
       (assoc-in [:test :available-topics] [])
       (assoc-in [:test :topics-loading?] false)
       (assoc-in [:test :topics-error] message))))

(re-frame/reg-event-fx
 :test/retake
 (fn [{:keys [db]} [_ topic]]
   ;; «Rendir de nuevo» desde el tablero. No dispara `:test/start` directo
   ;; porque ese evento exige `available-topics`, que se llena recién con
   ;; `:test/load-topics`; se deja el topic pendiente y lo arranca
   ;; `:test/topics-loaded` cuando sabe si el usuario todavía puede rendirlo.
   {:db (assoc-in db [:test :pending-start] (resolve-topic topic))
    :dispatch-n [[:test/open-selection]
                 [:navigate-to :diagnostic-test]]}))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Inicia el test
;; -----------------------------------------------------------------------------
;; - Reinicia el estado del test (limpia preguntas, respuestas, theta, etc.)
;; - Define el tema (topic de Supabase)
;; - Dispara el evento para obtener la primera pregunta

(re-frame/reg-event-fx
 :test/start
 (fn [{:keys [db]} [_ topic]]
   (let [resolved (resolve-topic topic)
         admin? (get-in db [:auth :admin?])
         available (set (get-in db [:test :available-topics]))
         allowed? (or admin? (contains? available resolved))]
     (if-not allowed?
       ;; No es una fortificación RLS real (el estado de app-db es
       ;; manipulable vía devtools) — solo evita el caso honesto de un
       ;; usuario clickeando un topic que ya no ve en su selector.
       {:db (assoc-in db [:test :topics-error] "No tienes acceso a esta evaluación.")}
       (let [cfg (get-in db [:test :configs resolved])
             stop-config (if cfg
                          {:min-items (:min_items cfg)
                           :max-items (:max_items cfg)
                           :se-threshold (:se_threshold cfg)
                           :max-minutes (:max_minutes cfg)
                           ;; Si la columna todavía no existe en la base (028 sin
                           ;; aplicar) el campo llega nil y `effort` cae a su piso
                           ;; por defecto: el filtro funciona igual, solo deja de
                           ;; ser configurable por banco.
                           :min-response-seconds (:min_response_seconds cfg)
                           ;; Umbrales del eje de fluidez del banco (041). Se
                           ;; resuelven acá, con la config a la vista, y viajan
                           ;; con el test: así el perfil se construye con los
                           ;; cortes del banco que se rindió y no con los del
                           ;; banco que esté configurado el día que se lea.
                           :fluency-thresholds (fluency/thresholds-from-config cfg)
                           ;; Parámetros del modelo (048, ADR-034). Nulos —o la
                           ;; columna sin aplicar todavía— caen a los valores de
                           ;; `universo.motor`, igual que el resto de la config.
                           :guessing-c (:guessing_c cfg)
                           :prior-sd (:prior_sd cfg)}
                          progress/default-stop-config)]
         {:db (-> db
                  (assoc-in [:test :status] :questions)
                  (assoc-in [:test :topic] resolved)
                  (assoc-in [:test :responses] [])
                  (assoc-in [:test :questions] [])
                  (assoc-in [:test :feedback] nil)
                  (assoc-in [:test :prefetched-question] nil)
                  (assoc-in [:test :prefetching?] false)
                  (assoc-in [:test :start-time] (.now js/Date))
                  ;; θ de arranque: el de la evaluación si `046` está aplicada y
                  ;; alguien lo configuró; si no, el -1.0 de siempre. **No depende
                  ;; del estudiante a propósito** — es dónde abre el banco, no una
                  ;; estimación previa de quien lo rinde: el primer ítem servido es
                  ;; el más cercano a este valor.
                  (assoc-in [:test :theta] (let [t (:initial_theta cfg)]
                                             (if (number? t) (double t) -1.0)))
                  ;; El mismo θ, guardado aparte porque `:theta` se sobrescribe
                  ;; en cada respuesta: deshacer la primera (`universo.reintento`)
                  ;; necesita saber dónde abría el banco, y 0.0 —la media del
                  ;; prior— no es ese punto.
                  (assoc-in [:test :theta-initial] (let [t (:initial_theta cfg)]
                                                     (if (number? t) (double t) -1.0)))
                  (assoc-in [:test :theta-history] [])
                  ;; Un editor abierto no sobrevive a un test nuevo: apuntaría a
                  ;; un ítem que ya no está en pantalla.
                  (assoc-in [:test :editor] nil)
                  (assoc-in [:test :stop-reason] nil)
                  (assoc-in [:test :stop-config] stop-config)
                  (assoc-in [:test :escape-resources] nil)
                  (assoc-in [:test :current-question] nil))
          :dispatch [:test/fetch-next-question]})))))

;; -----------------------------------------------------------------------------
;; 🔹 EFECTO: Obtiene la siguiente pregunta desde Supabase
;; -----------------------------------------------------------------------------
;; mode :immediate → instala la pregunta (inicio del test)
;; mode :prefetch  → la guarda para al Continuar (mientras hay feedback)

;; Antes esto hacía un `select` directo sobre `questions` y descargaba TODA la
;; ventana de dificultad para elegir un ítem en el cliente — de paso trayendo
;; `correct_option` y las cuatro explicaciones. Ahora la selección ocurre en el
;; servidor y vuelve un solo ítem sin respuesta (ADR-015).
(defn- fetch-next
  "Siguiente ítem del topic más cercano a θ, aún no respondido.
   Devuelve el ítem normalizado, `nil` si el banco se agotó, o `:error`."
  [theta topic answered-ids]
  (go
    (let [result (<! (crud/next-question topic theta
                                         progress/selection-half-width
                                         progress/selection-half-width-wide
                                         answered-ids))]
      (if (:success result)
        (some-> (:data result) normalize-question)
        (do
          (js/console.error "❌ Error obteniendo pregunta:" result)
          :error)))))

(re-frame/reg-fx
 :test/fetch-next-question
 (fn [{:keys [db mode]}]
   (let [mode (or mode :immediate)]
     (go
       (let [theta (get-in db [:test :theta])
             topic (resolve-topic (get-in db [:test :topic]))
             answered-questions (get-in db [:test :questions])
             answered-ids (set (map :id answered-questions))
             ;; El ítem NO se elige con θ, se elige con el θ objetivo: si el
             ;; estudiante viene escapando, la selección retrocede un escalón por
             ;; cada escape seguido. θ no se toca — es la separación entre
             ;; estimar y mostrar de ADR-029 §3. Con cero escapes seguidos esto
             ;; devuelve θ tal cual y el comportamiento es el de siempre.
             target (escape/selection-theta theta
                                            (get-in db [:test :responses])
                                            progress/selection-half-width)
             next-q (<! (fetch-next target topic answered-ids))
             ;; Una sola línea con todo lo que hace falta para diagnosticar el
             ;; retroceso: si `objetivo` baja pero `dificultad-servida` no, el
             ;; problema no es la lógica sino que el banco de ese topic no tiene
             ;; ítems más fáciles (R-17: `difficulty` nunca se calibró).
             _ (js/console.log
                (str "[test] topic=" topic
                     " modo=" (name mode)
                     " θ=" (.toFixed (js/Number theta) 2)
                     " objetivo=" (.toFixed (js/Number target) 2)
                     " escapes-seguidos=" (escape/consecutive-escapes
                                           (get-in db [:test :responses]))
                     " dificultad-servida="
                     (if (map? next-q)
                       (str (:difficulty next-q))
                       (str next-q))))]
         (cond
           (= next-q :error)
           (when (= mode :prefetch)
             (re-frame/dispatch [:test/prefetch-exhausted]))

           next-q
           (if (= mode :prefetch)
             (re-frame/dispatch [:test/prefetch-ready next-q])
             (re-frame/dispatch [:test/add-question next-q]))

           :else
           (if (= mode :prefetch)
             (re-frame/dispatch [:test/prefetch-exhausted])
             (do
               (js/console.log "⚠️ No hay más preguntas, finalizando test")
               (re-frame/dispatch [:test/bank-exhausted])))))))))

;; -----------------------------------------------------------------------------
;; Prefetch: carga la siguiente pregunta en paralelo al feedback
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :test/prefetch-next
 (fn [{:keys [db]} _]
   {:db (-> db
            (assoc-in [:test :prefetching?] true)
            (assoc-in [:test :prefetched-question] nil))
    :test/fetch-next-question {:db db :mode :prefetch}}))

(defn- install-question
  "Añade la pregunta al test y la marca como actual."
  [db question]
  (let [next-index (inc (count (get-in db [:test :questions])))]
    (-> db
        (update-in [:test :questions] conj question)
        (assoc-in [:test :current-question] next-index)
        (assoc-in [:test :prefetched-question] nil)
        (assoc-in [:test :prefetching?] false))))

(re-frame/reg-event-db
 :test/prefetch-ready
 (fn [db [_ question]]
   (if (= (get-in db [:test :status]) :questions)
     ;; El usuario ya pulsó Continuar: mostrar de inmediato
     (install-question db question)
     ;; Aún en feedback: aparcar hasta Continuar
     (-> db
         (assoc-in [:test :prefetched-question] question)
         (assoc-in [:test :prefetching?] false)))))

(re-frame/reg-event-fx
 :test/bank-exhausted
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :stop-reason] :exhausted)
    :dispatch [:test/complete]}))

(re-frame/reg-event-fx
 :test/prefetch-exhausted
 (fn [{:keys [db]} _]
   (if (= (get-in db [:test :status]) :questions)
     {:db (-> db
              (assoc-in [:test :prefetching?] false)
              (assoc-in [:test :stop-reason] :exhausted))
      :dispatch [:test/complete]}
     {:db (-> db
              (assoc-in [:test :prefetched-question] :exhausted)
              (assoc-in [:test :prefetching?] false)
              (assoc-in [:test :stop-reason] :exhausted))})))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: El feedback se le muestra al usuario
;; -----------------------------------------------------------------------------

(re-frame/reg-event-db
 :test/show-feedback
 (fn [db [_ {:keys [question response]}]]
   (-> db
       (assoc-in [:test :feedback] {:question question
                                    :response response})
       ;; El editor en vivo (ADR-032) arranca cerrado en cada ítem. Es la única
       ;; garantía de que no queda abierto apuntando al ítem **anterior**: el
       ;; panel solo existe mientras hay feedback, así que entre una respuesta y
       ;; la siguiente puede quedar abierto sin que nadie lo vea.
       (assoc-in [:test :editor] nil)
       (assoc-in [:test :status] :feedback))))

;; -----------------------------------------------------------------------------
;; 🔹 Continuar: usa la pregunta prefetched si ya llegó
;; -----------------------------------------------------------------------------

(re-frame/reg-event-fx
 :test/continue
 (fn [{:keys [db]} _]
   (let [prefetched (get-in db [:test :prefetched-question])
         prefetching? (get-in db [:test :prefetching?])
         stop-reason (get-in db [:test :stop-reason])]
     (cond
       (some? stop-reason)
       {:db (-> db
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :prefetched-question] nil)
                (assoc-in [:test :prefetching?] false))
        :dispatch [:test/complete]}

       (= prefetched :exhausted)
       {:db (-> db
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :prefetched-question] nil)
                (assoc-in [:test :stop-reason] :exhausted))
        :dispatch [:test/complete]}

       (map? prefetched)
       {:db (-> (install-question db prefetched)
                (assoc-in [:test :status] :questions)
                (assoc-in [:test :feedback] nil))}

       prefetching?
       ;; Prefetch en vuelo: ir a questions; al llegar :test/prefetch-ready la instala
       {:db (-> db
                (assoc-in [:test :status] :questions)
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :current-question] nil))}

       :else
       ;; Sin prefetch (fallback): pedir ahora
       {:db (-> db
                (assoc-in [:test :status] :questions)
                (assoc-in [:test :feedback] nil)
                (assoc-in [:test :current-question] nil))
        :dispatch [:test/fetch-next-question]}))))

;; El acierto ya no se decide en el cliente: el ítem llega sin su respuesta y
;; `score_answer` corrige en el servidor (ADR-015). Por eso responder pasa a ser
;; asíncrono — `:test/answer` solo dispara el efecto, y `:test/answer-scored`
;; hace lo que antes hacía `:test/answer` de forma síncrona.
(re-frame/reg-fx
 :test/score-answer
 (fn [{:keys [question-id selected time-ms]}]
   (go
     (let [result (<! (crud/score-answer question-id selected))]
       (if (:success result)
         (let [{:keys [correcto correcta explicacion]} (:data result)]
           (re-frame/dispatch [:test/answer-scored
                               {:question-id question-id
                                :selected selected
                                :time-ms time-ms
                                :correct? (boolean correcto)
                                :correct-option correcta
                                :explanation explicacion}]))
         (re-frame/dispatch [:test/score-failed (:error result)]))))))

(re-frame/reg-event-fx
 :test/answer
 (fn [{:keys [db]} [_ {:keys [question-id selected time-ms]}]]
   {:db (-> db
            (assoc-in [:test :scoring?] true)
            (assoc-in [:test :score-error] nil))
    :test/score-answer {:question-id question-id
                        :selected selected
                        :time-ms time-ms}}))

;; Si la corrección falla no se puede inventar un acierto: se avisa y se deja
;; al estudiante reintentar la misma pregunta, sin registrar respuesta ni mover θ.
(re-frame/reg-event-db
 :test/score-failed
 (fn [db [_ message]]
   (-> db
       (assoc-in [:test :scoring?] false)
       (assoc-in [:test :score-error]
                 (or message "No se pudo registrar tu respuesta. Inténtalo de nuevo.")))))

;; Registrar una respuesta —corregida por el servidor o un escape— es el mismo
;; trabajo: entra a `:responses`, se reestima θ, se evalúa la parada, se muestra
;; feedback y se prefetchea el siguiente ítem si el test sigue. Está factorizado
;; para que las dos vías no puedan divergir: si mañana cambia la regla de parada,
;; cambia para las dos a la vez.
(defn- register-response
  "fx de registrar `new-response` (ya pesada) sobre `db`."
  [db question new-response]
  (let [stop-config (get-in db [:test :stop-config] progress/default-stop-config)
        updated-db (update-in db [:test :responses] conj new-response)
        ;; ── Un escape NO reestima θ. Ni siquiera un poquito. ──────────────────
        ;; Peso 0.0 hace que la respuesta no aporte a la verosimilitud, pero eso
        ;; **no basta**: `calculate-theta` reestima el MAP completo y lo acerca a
        ;; su valor convergido en pasos de `max-theta-step`. Cuando todavía hay
        ;; poca evidencia real, el MAP *es* la media del prior (θ = 0), así que
        ;; cada escape empujaba θ 0,4 hacia 0 — **hacia arriba** si el estudiante
        ;; venía por debajo.
        ;;
        ;; Medido en producción el 2026-08-18 (test 296, seis escapes seguidos
        ;; sin ninguna respuesta real): θ caminó de -1,0 a 0,0 y las dificultades
        ;; servidas fueron -0,8 · -0,3 · 0,2 · 0,7 · 1,1 · 1,5. El test se le
        ;; ponía **más difícil** a quien acababa de declarar seis veces que no
        ;; entendía nada.
        ;;
        ;; Por eso θ se conserva tal cual: de una no-respuesta no se estima nada,
        ;; y «nada» incluye no dejar que el prior arrastre la estimación. Es lo
        ;; que ADR-029 §2 afirmaba y que el peso 0.0 solo garantizaba una vez que
        ;; el MAP ya había convergido.
        escape? (escape/freeze-theta? new-response)
        new-theta (if escape?
                    (double (or (get-in db [:test :theta]) 0.0))
                    (tetha/calculate-theta-auto (:test updated-db)))
        responses (get-in updated-db [:test :responses])
        start-time (get-in db [:test :start-time])
        elapsed-minutes (when start-time (/ (- (.now js/Date) start-time) 60000.0))
        reason (progress/stop-reason responses new-theta elapsed-minutes stop-config)
        db-with-theta (-> updated-db
                          (assoc-in [:test :theta] new-theta)
                          (update-in [:test :theta-history] conj new-theta)
                          (assoc-in [:test :stop-reason] reason)
                          (assoc-in [:test :scoring?] false)
                          (assoc-in [:test :score-error] nil)
                          (assoc-in [:test :prefetched-question] nil)
                          (assoc-in [:test :prefetching?] (nil? reason)))]
    (cond-> {:db db-with-theta
             :dispatch [:test/show-feedback {:question question
                                             :response new-response}]}
      (nil? reason)
      (assoc :test/fetch-next-question {:db db-with-theta :mode :prefetch}))))

(defn- current-question-by-id
  [db question-id]
  (some #(when (= (:id %) question-id) %) (get-in db [:test :questions])))

(re-frame/reg-event-fx
 :test/answer-scored
 (fn [{:keys [db]} [_ {:keys [question-id selected correct? correct-option
                              explanation time-ms]}]]
   (let [question (current-question-by-id db question-id)
         stop-config (get-in db [:test :stop-config] progress/default-stop-config)
         ;; El peso se fija acá, una sola vez, con el enunciado y el tiempo a la
         ;; vista, y viaja con la respuesta hasta `tests.test` (ADR-014 Fase 1).
         ;; Calcularlo después, en cada estimación, obligaría a tener el texto
         ;; del ítem disponible para siempre.
         new-response (effort/weigh-response
                       {:question-id question-id
                        :selected-option selected
                        :correct? correct?
                        :correct-option correct-option
                        :time-ms (or time-ms 0)
                        :difficulty (or (:difficulty question) 0.0)
                        :topic (or (:topic question) (get-in db [:test :topic]))
                        :module-id (:module-id question)
                        :module-slug (:module-slug question)
                        :selected-error explanation
                        :question-text (:question question)}
                       (:min-response-seconds stop-config))]
     (register-response db question new-response))))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: El estudiante declara que no sabe (escape)
;; -----------------------------------------------------------------------------
;; **No pasa por `score_answer`.** No hay alternativa elegida que corregir, y la
;; función del servidor rechaza cualquier cosa que no sea A–D (024): llamarla
;; sería pedirle que valide algo que no es una respuesta. Por eso el escape es
;; enteramente del cliente y **no necesita migración**.
;;
;; El escape no mueve θ: entra con peso 0.0 por la vía de ADR-014 (ver
;; `universo.irt.escape`). Que igual pase por `register-response` es a propósito
;; —cuenta para `max-items` y dispara el prefetch— así que escapar avanza el test
;; sin ensuciar la estimación.
(re-frame/reg-event-fx
 :test/escape
 (fn [{:keys [db]} [_ {:keys [question-id escape-kind time-ms]}]]
   (let [question (current-question-by-id db question-id)
         new-response (escape/escape-response
                       {:question-id question-id
                        :escape-kind escape-kind
                        :time-ms time-ms
                        :difficulty (or (:difficulty question) 0.0)
                        :topic (or (:topic question) (get-in db [:test :topic]))
                        :module-id (:module-id question)
                        :module-slug (:module-slug question)
                        :question-text (:question question)})]
     ;; `escape-response` devuelve nil si la clase no es una de las dos. No se
     ;; registra nada antes que fabricar una respuesta con `:escape nil`, que
     ;; contaría como error normal y movería θ sin que nadie lo pidiera.
     (if new-response
       (cond-> (register-response db question new-response)
         (escape/needs-resources? new-response)
         (-> (assoc-in [:db :test :escape-resources]
                       {:loading? true :items [] :module-slug (:module-slug question)})
             (assoc :test/fetch-escape-resources!
                    {:module-id (:module-id question)
                     :module-slug (:module-slug question)})))
       {:db db}))))

;; -----------------------------------------------------------------------------
;; 🔹 Material para el escape
;; -----------------------------------------------------------------------------
;; Decir «no sé» y recibir solo una frase amable es peor que no preguntar: el
;; estudiante declaró un hueco y hay que darle con qué taparlo.
;;
;; **Limitación conocida, y está dicha en la UI:** hoy se ofrece el material del
;; **mismo** módulo del ítem, no el del módulo *prerrequisito*, porque el grafo
;; de prerrequisitos todavía no está decidido ([[OPEN_QUESTIONS]] Q-38, T-98).
;; Para «no sé cómo resolverlo» lo correcto es el módulo anterior; esto es la
;; aproximación honesta que se puede dar sin inventar el grafo, y mejora sola en
;; cuanto exista — el punto de cambio es `escape/needs-resources?` y este efecto.

(re-frame/reg-fx
 :test/fetch-escape-resources!
 (fn [{:keys [module-id module-slug]}]
   (go
     (let [result (<! (crud/fetch-published-resources-for-module module-id))]
       (if (:success result)
         (re-frame/dispatch [:test/escape-resources-loaded
                             {:items (:data result) :module-slug module-slug}])
         ;; No se propaga como error de la pantalla: el test tiene que poder
         ;; seguir. Sin material, el modal dice que no hay y ofrece continuar.
         (re-frame/dispatch [:test/escape-resources-loaded
                             {:items [] :module-slug module-slug}]))))))

(re-frame/reg-event-db
 :test/escape-resources-loaded
 (fn [db [_ {:keys [items module-slug]}]]
   (assoc-in db [:test :escape-resources]
             {:loading? false
              :items (vec (or items []))
              :module-slug module-slug})))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Agrega la nueva pregunta al test
;; -----------------------------------------------------------------------------

(re-frame/reg-event-db
 :test/add-question
 (fn [db [_ question]]
   (install-question db question)))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: abre el questionario
;; -----------------------------------------------------------------------------
;; - cambia el estado a questions

(re-frame/reg-event-fx
 :test/question
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :status] :questions)}))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Abre los resultados
;; -----------------------------------------------------------------------------
;; - cambia el estado a results


(re-frame/reg-event-fx
 :test/results
 (fn [{:keys [db]} _]
   {:db (assoc-in db [:test :status] :results)}))

;; -----------------------------------------------------------------------------
;; 🔹 EVENTO:
;; -----------------------------------------------------------------------------


(re-frame/reg-event-fx
 :test/fetch-next-question
 (fn [{:keys [db]} _]
   {:test/fetch-next-question {:db db :mode :immediate}}))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Guarda el test en Supabase
;; -----------------------------------------------------------------------------
;; Este evento usa el efecto :save-test definido abajo

(re-frame/reg-event-fx
 :save-test
 (fn [{:keys [db]} [_ data]]
   {:save-test {:data data
                :email (or (get data "email-user")
                           (:email-user data)
                           (get-in db [:visitor :email]))}}))

;; -----------------------------------------------------------------------------
;; 🔹 EFECTO: Guarda el test en Supabase
;; -----------------------------------------------------------------------------
;; Resuelve user_id desde la sesión JWT real y evita .select() post-insert
;; (sin policy SELECT, .insert().select() falla con error de RLS).

(re-frame/reg-fx
 :save-test
 (fn [{:keys [data email]}]
   (-> (sb/current-user-id)
       (.then
        (fn [session-uid]
          (go
            (let [app-uid (or (get data "user_id") (:user_id data))
                  uid (or session-uid app-uid)
                  email* (or email (get data "email-user") (:email-user data))
                  test-payload (or (get data "test") (:test data))
                  topic (or (get data "topic") (:topic data))
                  theta (or (get data "theta") (:theta data))
                  ;; Claves string = nombres exactos de columnas en Postgres.
                  ;; topic/theta van también como columnas propias (no solo
                  ;; dentro del JSON de "test") para poder calcular qué otros
                  ;; tests desbloquea este intento (universo.access).
                  row {"test" test-payload
                       "topic" topic
                       "theta" theta
                       ;; Con qué reglas se calculó ese θ (048, ADR-034). Sin
                       ;; esto, un cambio de motor vuelve incomparables dos
                       ;; filas idénticas y el Δθ de G-4 mediría el motor en vez
                       ;; del estudiante.
                       "engine_version" motor/version
                       "email-user" email*
                       "user_id" uid}]
              (if-not uid
                (js/console.error "Sin sesión Supabase; vuelve a iniciar sesión")
                (let [primero (<! (crud/insert-data-table! row "tests" {:returning? false}))
                      ;; Las migraciones de este proyecto se aplican **a mano**,
                      ;; así que el bundle puede llegar a producción antes que
                      ;; `048`. Si eso pasa, PostgREST rechaza el insert entero
                      ;; por una columna que no conoce y el diagnóstico recién
                      ;; rendido **se pierde**. Reintentar sin la columna: un θ
                      ;; sin versión se puede reconstruir mirando la fecha; una
                      ;; fila que nunca se guardó, no. Mismo criterio que
                      ;; `test-config-payload` con `initial_theta`, pero acá el
                      ;; costo de equivocarse lo paga el estudiante.
                      result (if (and (not (:success primero))
                                      (motor/falta-la-columna-de-version? (:error primero)))
                               (do
                                 (js/console.warn
                                  "La migración 048 no está aplicada: se guarda el test sin engine_version.")
                                 (<! (crud/insert-data-table!
                                      (dissoc row "engine_version") "tests" {:returning? false})))
                               primero)]
                  (if (:success result)
                    (when email*
                      (re-frame/dispatch [:dashboard/consultar email*]))
                    (js/console.error "Error al guardar test:" (clj->js (:error result))))))))))
       (.catch (fn [err]
                 (js/console.error "No se pudo leer la sesión:" err))))))


;; -----------------------------------------------------------------------------
;; 🔹 EVENTO: Finaliza el test
;; -----------------------------------------------------------------------------
;; - Cambia el estado a :completed
;; - Guarda los resultados; el dashboard se refresca al confirmar el save

(re-frame/reg-event-fx
 :test/complete
 (fn [{:keys [db]} _]
   (let [email-user (get-in db [:visitor :email])
         user-id    (or (get-in db [:auth :user :id])
                        (get-in db [:dashboard :user-id]))
         new-db     (-> db
                        (assoc-in [:test :status] :completed)
                        (assoc-in [:test :end-time] (.now js/Date)))
         test       (:test new-db)]
     {:db new-db
      :save-test {:data {"test" test
                         "topic" (:topic test)
                         "theta" (:theta test)
                         "email-user" email-user
                         "user_id" user-id}
                  :email email-user}
      ;; Perfil derivado; el usuario abre resultados desde la pantalla de cierre
      :dispatch [:profile/save-from-test]})))

(re-frame/reg-event-db
 :test/reintentar-ultimo
 ;; «Volver a servir este ítem»: deshace la última respuesta y vuelve a mostrar
 ;; la misma pregunta, ya con los cambios que el admin acaba de guardar. Es la
 ;; mitad del editor en vivo que toca el test (ADR-032); la otra mitad vive en
 ;; `universo.events.editor-vivo`.
 ;;
 ;; **Es seguro porque nada se persiste por ítem.** La fila de `tests` se escribe
 ;; entera en `:test/complete`, así que deshacer no deja rastro que corregir en la
 ;; base. Si algún día se guarda respuesta por respuesta, este evento deja de ser
 ;; solo estado local y necesita su propia migración.
 ;;
 ;; El `admin?` es UX y está para que un `dispatch` desde la consola no sea el
 ;; camino corto a rehacer un ítem: nada de esto atraviesa RLS.
 (fn [db [_ {:keys [parche]}]]
   (if (and (get-in db [:auth :admin?])
            (reintento/puede-reintentar? (:test db)))
     (-> db
         (update :test reintento/deshacer-ultima parche)
         ;; El panel se va con el feedback y el editor se iría con él: se cierra
         ;; explícitamente para que el ítem vuelva a la pantalla limpio.
         (assoc-in [:test :editor] nil))
     db)))

;; -----------------------------------------------------------------------------
;; 🔹 SUSCRIPCIONES
;; -----------------------------------------------------------------------------
;; - Para acceder fácilmente al estado del test desde los componentes UI

(re-frame/reg-sub :test/status (fn [db _] (get-in db [:test :status])))
(re-frame/reg-sub :test/feedback (fn [db _] (get-in db [:test :feedback])))
(re-frame/reg-sub :test/topic (fn [db _] (get-in db [:test :topic])))
(re-frame/reg-sub :test/theta (fn [db _] (get-in db [:test :theta])))
(re-frame/reg-sub :test/theta-history (fn [db _] (get-in db [:test :theta-history] [])))
(re-frame/reg-sub :test/stop-reason (fn [db _] (get-in db [:test :stop-reason])))
(re-frame/reg-sub :test/questions (fn [db _] (get-in db [:test :questions])))
(re-frame/reg-sub :test/answers (fn [db _] (get-in db [:test :responses])))
(re-frame/reg-sub :test/available-topics (fn [db _] (get-in db [:test :available-topics] [])))
(re-frame/reg-sub :test/configs (fn [db _] (get-in db [:test :configs] {})))
;; Corrección en curso en el servidor: bloquea las alternativas para no
;; registrar dos respuestas a la misma pregunta (ADR-015).
(re-frame/reg-sub :test/scoring? (fn [db _] (get-in db [:test :scoring?] false)))
(re-frame/reg-sub :test/puede-reintentar?
                  (fn [db _] (reintento/puede-reintentar? (:test db))))
(re-frame/reg-sub :test/score-error (fn [db _] (get-in db [:test :score-error])))
(re-frame/reg-sub :test/topics-loading? (fn [db _] (get-in db [:test :topics-loading?] false)))
(re-frame/reg-sub :test/topics-error (fn [db _] (get-in db [:test :topics-error])))
(re-frame/reg-sub :test/current-question
                  (fn [db _]
                    (let [qid (get-in db [:test :current-question])
                          questions (get-in db [:test :questions])]
                      (when (and qid (pos? qid))
                        (nth questions (dec qid) nil)))))

(re-frame/reg-sub
 :test/progress-points
 (fn [db _]
   (progress/progress-points
    (get-in db [:test :responses])
    (get-in db [:test :theta-history]))))

;; Escape: nil mientras no haya ninguno, para que la UI no muestre un contador en
;; cero al estudiante que no lo usó. Es la observación que pide T-90.
(re-frame/reg-sub
 :test/escape-summary
 (fn [db _]
   (escape/summary (get-in db [:test :responses]))))

(re-frame/reg-sub
 :test/escape-resources
 (fn [db _]
   (get-in db [:test :escape-resources])))
