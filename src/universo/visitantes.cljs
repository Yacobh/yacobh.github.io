(ns universo.visitantes
  "Agregación de la tabla `visitor` para el panel interno de métricas.

   ── Qué es esto y por qué no es «pulido del admin» ─────────────────────────
   Es el primer trozo de [[../../project-memory/BACKLOG]] **T-22** (panel interno
   de métricas), que pertenece a la fase **F10** y por lo tanto a **G-5** — el
   vector que [[../../project-memory/TESIS_DE_CRECIMIENTO]] llama *«la condición
   de existencia del negocio»* y que está en 0 %. Tres intentos históricos de
   este proyecto murieron en distribución, no en producto.

   ── Lo que esta tabla PUEDE y NO PUEDE responder ───────────────────────────
   `visitor` tiene siete columnas —`id`, `created_at`, `pais`, `ciudad`,
   `timezone`, `idioma`, `email`— y eso acota lo que es honesto afirmar:

   · **Sí responde:** cuánta gente nueva llegó, cuándo, y desde dónde.
   · **No responde de dónde vino** —qué canal la trajo— hasta que se aplique la
     migración `061`, que agrega `fuente` (la etiqueta `?de=tarjeta`). Es
     **T-135**, y es la columna que convierte «entraron 40 personas» en «12
     llegaron por la tarjeta QR». Sin ella no hay CAC por canal.
   · **No es una cuenta de visitas.** `visitor-tracker/start-tracking!` inserta
     **solo la primera vez** que un navegador entra (guarda de `localStorage`),
     así que cada fila es **un navegador nuevo**, no una sesión. Un conocido que
     vuelve no suma. Para una campaña que busca gente nueva es justo lo que se
     quiere, pero hay que decirlo antes de leer los números."
  (:require [clojure.string :as str]))

(defn- ms
  "Milisegundos de un `created_at`, o nil si no se puede leer."
  [fecha]
  (let [t (.getTime (js/Date. (str fecha)))]
    (when-not (js/isNaN t) t)))

(defn- fmt-dia
  "`YYYY-MM-DD` de un `js/Date`, leído en la zona de quien mira."
  [d]
  (let [p (fn [n] (if (< n 10) (str "0" n) (str n)))]
    (str (.getFullYear d) "-" (p (inc (.getMonth d))) "-" (p (.getDate d)))))

(defn dia-local
  "La fecha `YYYY-MM-DD` de una fila, **en la zona horaria de quien mira**.

   Se usa la local y no UTC a propósito: el owner mira esto desde Chile, y con
   UTC una visita de las 21:30 aparecería al día siguiente. Para contar «cuánta
   gente entró el día de la clase» eso importa."
  [fecha]
  (when-let [t (ms fecha)]
    (fmt-dia (js/Date. t))))

(defn- dia->fecha-local
  "`\"2026-09-12\"` → un `js/Date` en la **medianoche local** de ese día.

   ⚠️ No se puede usar `(js/Date. \"2026-09-12\")`: una cadena sin hora la
   interpreta el runtime como **medianoche UTC**, y al volver a leerla en hora
   local (Chile, UTC−3/−4) sale el día anterior. Mezclar las dos convenciones
   corría la serie entera un día — lo detectó el test antes de que se viera en
   pantalla."
  [dia]
  (let [[y m d] (map js/parseInt (str/split (str dia) #"-"))]
    (js/Date. y (dec m) d)))

(defn- dia-siguiente
  "El día siguiente, avanzando con `setDate` y no sumando 86.400.000 ms.

   Chile cambia la hora dos veces al año: en esos dos días el salto de 24 h
   aterriza en la hora equivocada y puede repetir o saltarse una fecha.
   `setDate` conoce el calendario; la aritmética de milisegundos, no."
  [d]
  (doto (js/Date. (.getTime d))
    (.setDate (inc (.getDate d)))))

(defn- etiqueta
  "El valor de una columna, o `\"(sin dato)\"`. Nunca devuelve nil ni cadena
   vacía: un ranking con una fila en blanco arriba no se puede leer."
  [v]
  (let [s (str/trim (str (or v "")))]
    (if (str/blank? s) "(sin dato)" s)))

(defn ranking
  "Conteo por valor de una columna, de más a menos.

   `(ranking filas :pais)` → `[{:valor \"Chile\" :n 40 :pct 87} …]`. El empate se
   desempata alfabéticamente para que dos cargas seguidas no cambien el orden —
   una lista que baila entre recargas parece un dato que cambia y no lo es."
  [filas k]
  (let [total (count filas)]
    (->> filas
         (map #(etiqueta (get % k)))
         frequencies
         (map (fn [[valor n]]
                {:valor valor
                 :n n
                 :pct (when (pos? total) (js/Math.round (* 100.0 (/ n total))))}))
         (sort-by (juxt (comp - :n) :valor))
         vec)))

(defn por-dia
  "Visitas por día, del más viejo al más nuevo, **sin huecos**.

   Los días sin ninguna visita se rellenan con 0 a propósito: una serie que
   salta del 8 al 14 de septiembre dibuja una línea que sugiere actividad
   continua donde hubo silencio. `dias` acota la ventana al final de la serie."
  ([filas] (por-dia filas nil))
  ([filas dias]
   (let [conteo (frequencies (keep #(dia-local (:created_at %)) filas))]
     (if (empty? conteo)
       []
       (let [fechas (sort (keys conteo))
             fin (dia->fecha-local (last fechas))
             ini (if dias
                   (doto (js/Date. (.getTime fin))
                     (.setDate (- (.getDate fin) (dec dias))))
                   (dia->fecha-local (first fechas)))]
         (loop [cur ini acc []]
           (if (> (.getTime cur) (.getTime fin))
             acc
             (let [k (fmt-dia cur)]
               (recur (dia-siguiente cur)
                      (conj acc {:dia k :n (get conteo k 0)}))))))))))

(defn en-los-ultimos
  "Filas de los últimos `dias` días contados desde **ahora**, no desde la última
   fila: si nadie entra en una semana, «últimos 7 días» tiene que dar 0, no
   devolver la semana de la última visita."
  [filas dias ahora-ms]
  (let [corte (- ahora-ms (* dias 86400000))]
    (vec (filter #(when-let [t (ms (:created_at %))] (>= t corte)) filas))))

(defn resumen
  "Los números de cabecera del panel."
  [filas ahora-ms]
  (let [fs (vec (or filas []))
        con-email (count (filter #(not (str/blank? (str (:email %)))) fs))]
    {:total (count fs)
     :ultimos-7 (count (en-los-ultimos fs 7 ahora-ms))
     :ultimos-30 (count (en-los-ultimos fs 30 ahora-ms))
     :paises (count (distinct (map #(etiqueta (:pais %)) fs)))
     :ciudades (count (distinct (map #(etiqueta (:ciudad %)) fs)))
     :con-email con-email
     ;; Qué fracción dejó correo. Es el único indicio de conversión que esta
     ;; tabla puede dar por sí sola, y aun así es débil: el correo lo escribe
     ;; el visitante en otra parte del sitio, no al entrar.
     :pct-con-email (when (pos? (count fs))
                      (js/Math.round (* 100.0 (/ con-email (count fs)))))}))

(defn hay-fuente?
  "true si las filas traen la columna `fuente` — o sea, si la migración `061`
   está aplicada. La vista la usa para mostrar el ranking de canal o, si no, el
   aviso de que esa pregunta todavía no se puede responder (T-135)."
  [filas]
  (boolean (some #(contains? % :fuente) filas)))
