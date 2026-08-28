(ns universo.reintento
  "Deshacer la última respuesta de un test en curso y volver a servir ese ítem.

   Es el motor del «guardar y volver a servir» del editor en vivo: el profesor
   corrige la explicación o la dificultad de un ítem mientras rinde el
   diagnóstico y lo vuelve a pedir, como quien toca una variable y reinicia el
   programa. El programa, acá, es el propio flujo del test.

   Vive en un namespace puro y no dentro del `reg-event-db` porque es la única
   operación del test que **retrocede**: si se equivoca, deja θ, el historial y
   las respuestas desalineados, y a partir de ahí la estimación miente sin
   avisar. Una función pura se puede fijar con tests contra esa invariante
   (ADR-009)."
  (:require [universo.irt.progress :as progress]))

(defn puede-reintentar?
  "true si hay una respuesta que deshacer sobre un ítem que sigue a la vista."
  [test]
  (boolean (and (seq (:responses test))
                (seq (:questions test)))))

(defn- theta-previo
  "θ inmediatamente anterior a la respuesta que se deshace.

   `:theta-history` guarda un θ por respuesta registrada, así que después de
   podarlo el θ previo es su nuevo último elemento. Cuando lo que se deshace es
   la **primera** respuesta no queda ninguno, y hay que volver al θ de arranque
   del banco (`:theta-initial`, que `:test/start` copia de
   `test_configs.initial_theta`) — **no** a 0.0: 0.0 es la media del prior, no
   el punto donde abre este test, y usarlo movería el ítem servido sin que
   nadie lo pidiera (ver 046 y `events/test`)."
  [test historial-podado]
  (double (or (peek historial-podado)
              (:theta-initial test)
              0.0)))

(defn deshacer-ultima
  "Quita la última respuesta del `test` y lo deja mostrando de nuevo ese ítem.

   `parche` son los campos que el admin acaba de guardar sobre el ítem
   (`:question`, `:difficulty`, …) y se fusionan sobre la pregunta antes de
   volver a mostrarla: reintentar sin el parche volvería a servir la versión
   vieja y el viaje de ida y vuelta no habría probado nada.

   La pregunta **no** sale de `:questions`: se queda en su posición y
   `:current-question` vuelve a apuntarle. Sacarla la devolvería al pozo de
   candidatas de `next_question`, que podría entregar otra distinta — justo lo
   que este botón no quiere. El costo es que su `id` sigue en `answered-ids` y
   no se puede servir dos veces en el mismo test, que es lo correcto.

   `:stop-reason` se recalcula con la evidencia que queda: si el test acababa
   de parar por `:max-items`, deshacer devuelve un ítem de presupuesto y la
   parada tiene que desaparecer, o el «Continuar» siguiente cerraría el test
   con una respuesta menos de las que declara."
  ([test] (deshacer-ultima test nil))
  ([test parche]
   (if-not (puede-reintentar? test)
     test
     (let [responses  (vec (:responses test))
           questions  (vec (:questions test))
           historial  (vec (:theta-history test))
           responses' (pop responses)
           historial' (if (seq historial) (pop historial) historial)
           theta'     (theta-previo test historial')
           questions' (update questions (dec (count questions)) merge (or parche {}))
           stop-config (or (:stop-config test) progress/default-stop-config)]
       (assoc test
              :responses responses'
              :theta-history historial'
              :theta theta'
              :questions questions'
              :current-question (count questions')
              :stop-reason (progress/stop-reason responses' theta' nil stop-config)
              :status :questions
              :feedback nil
              ;; El prefetch en vuelo apuntaba al ítem *siguiente* al que se está
              ;; deshaciendo: ya no sirve. Se descarta y se vuelve a pedir cuando
              ;; la respuesta nueva entre por `register-response`.
              :prefetched-question nil
              :prefetching? false
              :escape-resources nil
              :scoring? false
              :score-error nil)))))
