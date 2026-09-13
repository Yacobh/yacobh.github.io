(ns universo.components.admin-test-detail
  "Detalle de **un** intento de diagnóstico, dentro del panel de administración.

   ── Por qué es un módulo aparte ────────────────────────────────────────────
   `components/admin.cljs` ya es enorme y R-07 pide no seguir engordándolo. Este
   archivo sigue la misma receta que `admin_questions`, `admin_catalog`,
   `admin_misconceptions` y `admin_test_configs`: una pestaña, un archivo.

   ── De dónde sale el dato ──────────────────────────────────────────────────
   De ningún lado nuevo. `:admin/tests-loaded` ya recibía el JSON entero de
   `tests.test` y lo tiraba; ahora lo conserva en `:detalle`. **No hay consulta
   adicional, ni estado de carga, ni spinner**: abrir una fila es pura lectura de
   lo que ya está en memoria.

   ── El color ───────────────────────────────────────────────────────────────
   Nada de verdes ni rojos de fábrica (ADR-033): el estado de cada respuesta lo
   dice **un diodo dentro de su alojamiento**, igual que en el diagnóstico. Las
   superficies son `panel-*` y `grafito-*`, y lo único que lleva `alarma` es lo
   que de verdad está mal."
  (:require [clojure.string :as str]
            [re-frame.core :as re-frame]
            [universo.components.irt-chart :as irt-chart]
            [universo.components.math-render :as math]
            [universo.intento :as intento]))

;; -----------------------------------------------------------------------------
;; Piezas chicas
;; -----------------------------------------------------------------------------

(defn- num
  "Formatea un número con `d` decimales, o «—» si no hay dato. Existe para que
   ninguna celda muestre «null» ni un 0 que en realidad significa «no se midió»."
  ([v] (num v 2))
  ([v d]
   (if (number? v)
     (.toFixed (js/Number v) d)
     "—")))

(defn- dato
  "Una lectura del panel: leyenda grabada arriba, valor abajo."
  [etiqueta valor & [nota]]
  [:div {:class "min-w-0"}
   [:div {:class "grabado mb-1"} etiqueta]
   [:div {:class "font-mono text-sm text-gray-900 break-words"} valor]
   (when nota
     [:div {:class "mt-0.5 text-xs text-gray-600"} nota])])

(def ^:private estados
  "Cómo se dice cada categoría de respuesta. El texto importa tanto como el
   diodo: «no contó» tiene que ser legible sin interpretar un color."
  {:correcta               {:led "led--on"     :texto "correcta"}
   :correcta-desestimada   {:led "led--bronce" :texto "correcta · no contó"}
   :incorrecta             {:led "led--alarma" :texto "incorrecta"}
   :incorrecta-desestimada {:led ""            :texto "incorrecta · no contó"}
   :escape                 {:led ""            :texto "no sé"}})

(defn- diodo
  [categoria]
  (let [{:keys [led texto]} (get estados categoria {:led "" :texto "—"})]
    [:div {:class "flex items-center gap-2"}
     [:span {:class "alojamiento inline-flex h-3.5 w-3.5 items-center justify-center rounded-full"}
      [:span {:class (str "led h-2 w-2 rounded-full " led)}]]
     [:span {:class "whitespace-nowrap text-xs text-gray-700"} texto]]))

(defn- alternativa
  "La letra que se marcó frente a la correcta. En mayúscula porque en la pantalla
   del estudiante las alternativas se rotulan con letras, no con índices."
  [marcada correcta]
  (let [m (some-> marcada str str/upper-case not-empty)
        c (some-> correcta str str/upper-case not-empty)]
    [:span {:class "whitespace-nowrap font-mono text-sm"}
     [:span {:class (if (and m c (= m c)) "text-gray-900" "text-alarma-700")}
      (or m "—")]
     [:span {:class "text-gray-500"} " / "]
     [:span {:class "text-gray-700"} (or c "—")]]))

;; -----------------------------------------------------------------------------
;; Cabecera
;; -----------------------------------------------------------------------------

(defn- cabecera
  [fila r]
  [:div {:class "placa mb-4 rounded-xl bg-panel-100 p-4"}
   [:div {:class "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"}
    [dato "θ estimado"
     [:span {:class (when (:theta-censurado? r) "text-alarma-700")}
      (num (:theta r))]
     ;; R-44: un θ en el borde del clamp no es una estimación, y decirlo acá es
     ;; más barato que descubrirlo comparando dos estudiantes que «sacaron lo
     ;; mismo».
     (when (:theta-censurado? r)
       "en el borde de la escala: el motor no pudo seguir, no es una medición")]
    [dato "Aciertos"
     (str (:aciertos r) " / " (:items r))
     (when (:porcentaje r) (str (:porcentaje r) " %"))]
    [dato "Contaron para θ"
     (str (:contadas r) " / " (:items r))
     (when (pos? (:aciertos-desestimados r))
       (str (:aciertos-desestimados r) " acierto(s) descartado(s) por veloz"))]
    [dato "Parada"
     (cond
       (:abandonado? r) "salió"
       (:stop-reason r) (str/replace (str (name (:stop-reason r))) "-" " ")
       :else "—")
     (when (:abandonado? r) "cerró con el botón; la fila sí quedó guardada")]
    [dato "Duración"
     (if (:duracion-min r) (str (num (:duracion-min r) 1) " min") "—")
     (when (:seg-por-item r) (str (num (:seg-por-item r) 0) " s por ítem"))]
    [dato "Motor"
     (str "v" (or (:engine-version r) "1"))
     ;; ADR-034: dos θ de versiones distintas no son comparables.
     (when (:origin r)
       (if (= "admin_preview" (:origin r))
         "corrida de depuración"
         "estudiante"))]]
   [:div {:class "mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-600"}
    [:span (str (:escapes r) " escape(s)")]
    [:span (str (:desestimadas r) " respuesta(s) sin esfuerzo válido")]
    [:span (str (:errores-con-idea r) " error(es) con idea errónea nombrada")]
    [:span {:class "text-gray-500"} (str "Tema: " (or (:tema fila) "—"))]]])

;; -----------------------------------------------------------------------------
;; La tabla de ítems
;; -----------------------------------------------------------------------------

(defn- fila-item
  [f]
  [:tr {:class "align-top"}
   [:td {:class "px-3 py-3 font-mono text-xs text-gray-500"} (:n f)]
   [:td {:class "px-3 py-3"} [diodo (:categoria f)]]
   [:td {:class "px-3 py-3 min-w-[16rem]"}
    [:div {:class "text-sm text-gray-900"}
     ;; El enunciado lleva LaTeX: se renderiza igual que en el test, no como
     ;; texto plano con los `$` a la vista.
     [math/latex (or (:enunciado f) "—")]]
    (when (:idea-erronea f)
      [:div {:class "mt-2 border-l-2 border-alarma-700 pl-3 text-sm text-gray-700"}
       [math/latex (:idea-erronea f)]])
    (when (:escape f)
      [:div {:class "mt-2 text-xs text-gray-600"}
       (if (= :enunciado (:escape f))
         "Declaró que no entendía el enunciado."
         "Declaró que no sabía resolverlo.")])]
   [:td {:class "px-3 py-3"} [alternativa (:marcada f) (:correcta f)]]
   [:td {:class "px-3 py-3 whitespace-nowrap text-xs text-gray-600"}
    (or (:modulo f) "—")]
   [:td {:class "px-3 py-3 whitespace-nowrap font-mono text-xs text-gray-600"}
    (num (:dificultad f))]
   [:td {:class "px-3 py-3 whitespace-nowrap font-mono text-xs text-gray-600"}
    (if (:segundos f) (str (num (:segundos f) 0) " s") "—")]])

(defn- tabla
  [fs]
  [:div {:class "overflow-x-auto rounded-xl border border-panel-500"}
   [:table {:class "w-full text-left text-sm"}
    [:thead {:class "bg-panel-200"}
     [:tr
      (for [h ["#" "Estado" "Ítem e idea errónea" "Marcó / era" "Módulo" "Dif." "Tiempo"]]
        ^{:key h}
        [:th {:scope "col" :class "grabado px-3 py-2"} h])]]
    [:tbody {:class "divide-y divide-panel-400 bg-panel-50"}
     (for [f fs]
       ^{:key (str (:n f) "-" (:question-id f))}
       [fila-item f])]]])

;; -----------------------------------------------------------------------------
;; Público
;; -----------------------------------------------------------------------------

(defn detalle-panel
  "El intento abierto. `fila` es el resumen que ya produce `:admin/tests-loaded`."
  [fila]
  (let [d (:detalle fila)
        r (intento/resumen (assoc d :theta (:theta fila)
                                    :duracion-min (:duracion-min fila)))
        fs (intento/filas (:responses d))
        puntos (intento/puntos-del-grafico d)]
    [:div
     [:div {:class "mb-4 flex flex-wrap items-center justify-between gap-3"}
      [:button
       {:type "button"
        :class (str "control rounded px-3 py-1.5 text-sm text-gray-900 "
                    "focus:outline-none focus:ring-2 focus:ring-senal-600")
        :on-click #(re-frame/dispatch [:admin/close-test])}
       "← Volver a la lista"]
      [:div {:class "min-w-0 text-right"}
       [:div {:class "truncate text-sm font-medium text-gray-900"}
        (or (:email fila) "—")]
       [:div {:class "text-xs text-gray-500"} (str "Intento #" (:id fila))]]]

     [cabecera fila r]

     (when (seq puntos)
       [:div {:class "mb-4"}
        [irt-chart/irt-progress-chart puntos (:stop-reason d)]])

     (if (seq fs)
       [tabla fs]
       [:div {:class "placa rounded-xl bg-panel-100 p-6 text-center text-sm text-gray-600"}
        "Este intento no guardó respuestas. Pasa con las filas anteriores a que se
         instrumentara el detalle; no es un error de esta pantalla."])]))
