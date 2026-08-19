(ns universo.components.dashboard
  (:require [re-frame.core :as re-frame]
            [reagent.core :as r]
            [universo.components.irt-chart :as chart]
            [universo.components.timeline :as timeline]
            [universo.components.ui :as ui]
            [universo.history :as hist]))

(defn formatear-fecha
  "Formatea la fecha de created_at a formato legible"
  [fecha-str]
  (when fecha-str
    (let [fecha (js/Date. fecha-str)
          opciones #js {:year "numeric"
                       :month "long"
                       :day "numeric"
                       :hour "2-digit"
                       :minute "2-digit"}]
      (.toLocaleDateString fecha "es-ES" opciones))))

(defn tarjeta-estadistica
  "Una estadística. El número manda; todo lo demás se aparta.

   ADR-022: antes esta tarjeta tenía un emoji de 40px compitiendo con el dato y
   un borde de color a la izquierda que no significaba nada (cada tarjeta tenía
   el suyo, elegido por variedad). Los dos se fueron. Lo que queda es la
   jerarquía tipográfica, que es como Braun ordenaba un panel: etiqueta chica,
   valor grande, nota al pie."
  [titulo valor subtitulo]
  [:div {:class "placa bg-white rounded p-6"}
   [:p.text-xs.font-medium.text-gray-600.uppercase.tracking-widest titulo]
   [:p.text-4xl.font-light.tabular-nums.mt-3.text-gray-900 valor]
   (when subtitulo
     [:p.text-xs.text-gray-500.mt-2 subtitulo])])

(defn barra-progreso
  "Componente de barra de progreso"
  [porcentaje]
  (let [porcentaje-limitado (min porcentaje 100) ; Limitar a 100%
        color (cond
                (>= porcentaje 90) "bg-green-500"
                (>= porcentaje 70) "bg-blue-500"
                (>= porcentaje 50) "bg-yellow-500"
                :else "bg-red-500")]
    [:div.w-full.bg-gray-200.rounded-full.h-3.overflow-hidden
     [:div {:class (str "h-full rounded-full transition-all duration-500 " color)
            :style {:width (str porcentaje-limitado "%")}}]]))

(defn nivel-theta
  "Nivel del estudiante como escala de cuatro pasos.

   ADR-022: cuatro emojis (🎯🌱📈🚀) y cuatro colores distintos comunicaban que
   las bandas son categorías inconexas, cuando son **una escala ordenada**. Se
   dibuja como lo que es: cuatro marcas, llenas hasta donde llegó. El color no
   se usa para distinguir bandas —eso lo hace la posición— sino solo para
   señalar dónde está parado."
  [theta]
  (let [nivel (cond
                (>= theta 2.0) {:texto "Avanzado" :paso 4}
                (>= theta 1.0) {:texto "Intermedio" :paso 3}
                (>= theta 0.0) {:texto "Básico" :paso 2}
                :else {:texto "Inicial" :paso 1})]
    [:div.flex.items-center.gap-3
     ;; ADR-023: cuatro LEDs en un alojamiento hundido, como el indicador de
     ;; nivel de una mesa de audio. El alojamiento no es adorno — sobre el gris
     ;; del panel un LED da 1.04 de contraste y no se vería; dentro, 8.78.
     [:div.alojamiento.flex.items-center.gap-1.5.rounded.px-2.py-1.5
      {:role "img"
       :aria-label (str "Nivel " (:texto nivel) ", " (:paso nivel) " de 4")}
      (for [i (range 1 5)]
        ^{:key i}
        [:span {:class (str "block h-2 w-2 rounded-full led"
                            (when (<= i (:paso nivel)) " led--on"))}])]
     [:div
      [:p.text-base.font-medium.text-gray-900 (:texto nivel)]
      [:p.text-xs.tabular-nums.text-gray-500 (str "θ = " (js/Math.round (* theta 100)) "/100")]]]))

(defn tarjeta-ultimo-test
  "Tarjeta detallada del último test"
  [ultimo-test]
  (when ultimo-test
    (let [{:keys [tema fecha correctas total porcentaje completado? theta]} ultimo-test]
      [:div
       [:div.flex.items-center.justify-between.mb-4
        [:h3.text-xl.font-bold.text-gray-800 "Última Evaluación"]
        (when-not completado?
          [:span.bg-amber-100.text-amber-800.text-xs.font-semibold.px-3.py-1.rounded-full
           "En progreso"])]

       [:div.space-y-4
        ;; Tema
        [:div
         [:p.text-sm.text-gray-600.font-medium "Tema"]
         [:p.text-lg.font-bold.text-indigo-700 tema]]

        ;; Fecha
        [:div
         [:p.text-sm.text-gray-600.font-medium "Fecha"]
         [:p.text-sm.text-gray-700 (formatear-fecha fecha)]]

        ;; Resultado
        [:div
         [:div.flex.justify-between.items-center.mb-2
          [:p.text-sm.text-gray-600.font-medium "Resultado"]
          [:p {:class (str "text-lg font-bold "
                           (if (>= porcentaje 70) "text-green-600" "text-red-600"))}
           (str correctas "/" total " (" porcentaje "%)")]]
         [barra-progreso porcentaje]]

        ;; Nivel estimado
        (when theta
          [:div
           [:p.text-sm.text-gray-600.font-medium.mb-2 "Nivel estimado"]
           [nivel-theta theta]])]])))

(defn fila-historial
  "Fila compacta de una evaluación en el historial."
  [{:keys [tema fecha completado? correctas total porcentaje theta]}]
  [:div {:class "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-gray-100 last:border-0"}
   [:div
    [:p {:class "font-semibold text-gray-800"} (or tema "Sin tema")]
    [:p {:class "text-sm text-gray-500"} (formatear-fecha fecha)]]
   [:div {:class "flex flex-wrap items-center gap-3 text-sm"}
    [:span {:class (str "font-semibold "
                        (if (>= (or porcentaje 0) 70) "text-green-600" "text-red-600"))}
     (str correctas "/" total " (" porcentaje "%)")]
    (when theta
      [:span {:class "text-indigo-600"} (str "θ " theta)])
    [:span {:class (if completado?
                     "text-green-700 bg-green-50 px-2 py-0.5 rounded-full text-xs font-medium"
                     "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-xs font-medium")}
     (if completado? "Completado" "Incompleto")]]])

(defn- fecha-corta
  "«12 ago» — para rotular los extremos del sparkline sin robarle ancho."
  [fecha-str]
  (when fecha-str
    (.toLocaleDateString (js/Date. fecha-str) "es-ES"
                         #js {:day "numeric" :month "short"})))

(defn- formatear-theta
  "θ con dos decimales. El tablero mostraba `0.06443610732100741` tal cual: un
   número con diecisiete decimales no comunica precisión, comunica que nadie lo
   miró."
  [v]
  (when (number? v) (.toFixed (double v) 2)))

(defn- delta-theta
  "Δθ con signo. Es lo único que este proyecto promete medir del progreso (G-4),
   así que se muestra con su signo explícito y sin adornos: `+0,42` es una
   afirmación, `0,42` es ambiguo."
  [delta]
  (when (number? delta)
    (let [txt (str (if (pos? delta) "+" "") (.toFixed (double delta) 2))]
      [:span {:class (str "text-sm font-medium tabular-nums "
                          (cond
                            (pos? delta) "text-green-700"
                            (neg? delta) "text-amber-700"
                            :else "text-gray-500"))}
       txt])))

(defn tarjeta-evaluacion
  "Una evaluación con todos sus intentos: cuántas veces, cómo evolucionó y un
   botón para volver a rendirla.

   Sustituye a la lista cronológica plana. El historial completo no se pierde:
   queda dentro del `<details>`, que es donde corresponde algo que se consulta
   de vez en cuando y no se lee de corrido."
  [{:keys [tema intentos completados puntos delta theta-ultimo theta-mejor
           ultima-fecha ultimo-porcentaje historial]}]
  [:div {:class "placa bg-white rounded p-4 sm:p-5"}
   [:div {:class "flex flex-wrap items-start justify-between gap-3"}
    [:div {:class "min-w-0"}
     [:p {:class "font-medium text-gray-900"} tema]
     [:p {:class "text-xs text-gray-500 mt-0.5"}
      (str intentos (if (= 1 intentos) " intento" " intentos")
           (when (not= intentos completados)
             (str " · " completados " completados"))
           " · última: " (formatear-fecha ultima-fecha))]]
    ;; `min-h-11` (44 px) no es decoración: este botón vive en el embudo del
    ;; estudiante, que se usa desde el teléfono, y es el mínimo de WCAG 2.5.5.
    ;; Lo pide `scripts/audit_movil.py`, que lo cazó apenas se escribió.
    [:button {:type "button"
              :class (str "control bg-panel-100 text-gray-900 text-sm font-medium "
                          "min-h-11 py-1.5 px-4 rounded hover:bg-panel-50 shrink-0")
              :on-click #(re-frame/dispatch [:test/retake tema])}
     "Rendir de nuevo"]]

   [:div {:class "flex flex-wrap items-end gap-x-8 gap-y-3 mt-4"}
    [:div
     [:p {:class "text-xs font-medium text-gray-600 uppercase tracking-widest"} "Nivel actual"]
     [:p {:class "text-3xl font-light text-gray-900 mt-1"}
      (or (formatear-theta theta-ultimo) "—")
      (when delta [:span {:class "ml-2"} [delta-theta delta]])]
     [:p {:class "text-xs text-gray-500 mt-1"}
      (if delta
        "θ y cambio desde el primer intento"
        "θ del único intento con nivel estimado")]]

    (when (seq puntos)
      [:div {:class "flex-1 min-w-48 max-w-xs"}
       [chart/theta-sparkline puntos]
       ;; El eje x es tiempo real, y sin estas dos fechas no se nota: dos
       ;; intentos del mismo día dibujan un tramo casi vertical que parece un
       ;; error del gráfico, cuando en realidad dice «rendiste dos veces
       ;; seguidas». Rotular los extremos convierte el desconcierto en lectura.
       (when (> (count puntos) 1)
         [:div {:class "flex justify-between text-xs text-gray-500 mt-1 px-1"}
          [:span (fecha-corta (:fecha (first puntos)))]
          [:span (fecha-corta (:fecha (last puntos)))]])])]

   [:p {:class "text-xs text-gray-500 mt-3"}
    (str "Mejor θ: " (or (formatear-theta theta-mejor) "—")
         (when ultimo-porcentaje (str " · último resultado: " ultimo-porcentaje " %")))]

   [:details {:class "mt-3"}
    [:summary {:class "cursor-pointer text-xs text-gray-600 hover:text-gray-900"}
     (if (= 1 intentos) "Ver el intento" (str "Ver los " intentos " intentos"))]
    [:div {:class "mt-2"}
     (for [row historial]
       ^{:key (:id row)}
       [fila-historial row])]]])

(defn- profile-block []
  (let [sp @(re-frame/subscribe [:student-profile])
        built (or (:profile sp) {})
        band (or (:theta_band sp) (:theta-band built))
        theta (or (:theta sp) (:theta built))
        deficits (take 4 (or (:deficits built) []))
        unread @(re-frame/subscribe [:notifications/unread])]
    [:div.placa.bg-white.rounded.p-6.mt-6.max-w-2xl.mx-auto
     [:h3.text-xl.font-bold.text-indigo-700.mb-3 "Perfil de aprendizaje"]
     (when (seq unread)
       [:div.mb-4.rounded-lg.bg-green-50.border.border-green-200.p-3
        [:p.text-sm.font-semibold.text-green-800.mb-1 "Tienes novedades de grupos"]
        (for [n (take 3 unread)]
          ^{:key (:id n)}
          [:p.text-sm.text-green-900 (:message n)])
        [:button.text-xs.text-green-700.underline.hover:text-green-900.transition.mt-1
         {:type "button"
          :on-click #(re-frame/dispatch [:notifications/dismiss])}
         "Marcar leídas"]])
     (if (or band (number? theta) (seq deficits))
       [:div.space-y-2
        (when (number? theta)
          [:p.text-sm.text-gray-700
           (str "θ = " (.toFixed (js/Number theta) 2)
                (when band (str " · banda " band)))])
        (if (seq deficits)
          [:ul.space-y-1
           (for [d deficits]
             ^{:key (:module-slug d)}
             [:li.text-sm.text-gray-700
              (str "• " (:module-slug d) " (" (:errors d) " errores)")])]
          [:p.text-sm.text-gray-500 "Sin déficits destacados en el último diagnóstico."])]
       [:div.text-center.py-2
        [:p.text-sm.text-gray-600.mb-3
         "Aún no hay perfil. Haz un diagnóstico para ver tu nivel y déficits."]
        [:button.bg-indigo-600.text-white.text-sm.font-semibold.py-2.px-4.rounded-lg
         {:type "button"
          :on-click #(do
                       (re-frame/dispatch [:test/open-selection])
                       (re-frame/dispatch [:navigate-to :diagnostic-test]))}
         "Comenzar diagnóstico"]])]))

(defn- enlace-configuracion-cuenta []
  [:div.placa.bg-white.rounded.p-6.mt-6.max-w-2xl.mx-auto.flex.items-center.justify-between
   [:div
    [:h3.text-lg.font-bold.text-gray-800 "Configuración de cuenta"]
    [:p.text-sm.text-gray-500 "Edita tu nombre y teléfono, o solicita eliminar tu cuenta."]]
   [:button.text-sm.font-semibold.text-indigo-700.border.border-indigo-200.rounded-lg.px-4.py-2.hover:bg-indigo-50.transition
    {:type "button"
     :on-click #(re-frame/dispatch [:navigate-to :cuenta])}
    "Ir a configuración →"]])

(defn dashboard []
  (r/with-let [_ (do (re-frame/dispatch [:dashboard/refresh])
                     (re-frame/dispatch [:profile/load])
                     (re-frame/dispatch [:notifications/load]))]
    (let [correo @(re-frame/subscribe [:visitor-email])
          cargando? @(re-frame/subscribe [:dashboard/cargando?])
          historial @(re-frame/subscribe [:dashboard/historial])
          tests-completados @(re-frame/subscribe [:dashboard/tests-completados])
          promedio @(re-frame/subscribe [:dashboard/promedio-nota])
          theta-promedio @(re-frame/subscribe [:dashboard/theta-promedio])
          ultimo (first historial)
          grupos (hist/group-attempts historial)
          {:keys [evaluaciones intentos con-progreso]} (hist/totals grupos)]

      ;; Reserva el alto de la línea del tiempo, que es `fixed`: sin eso taparía
      ;; el final del historial y el enlace a configuración. Menos en móvil,
      ;; donde la tira va compacta (sin años) — 160px sobre una pantalla de 667
      ;; era casi un cuarto del alto útil (T-73).
      [:div {:class "py-8 px-4 pb-28 sm:pb-40"}
       [:div {:class "max-w-6xl mx-auto"}

        ;; Header
        ;; ADR-022: la cabecera era una tarjeta blanca con sombra y un 📊 de
        ;; 48px. Ahora es un encabezado: título, quién sos, y una línea.
        [:div.border-b.border-gray-300.pb-5.mb-8
         [:h1.text-2xl.font-medium.tracking-tight.text-gray-900 "Tablero de aprendizaje"]
         [:p.text-sm.text-gray-600.mt-1 correo]]

        (if cargando?
          [:div.py-20
           [ui/loading-block]
           [:p.text-gray-600.mt-2.text-lg.text-center "Cargando tus datos..."]]

          [:div
           ;; Grid de estadísticas principales
           ;; «Evaluaciones» decía 44 cuando 44 era el número de **intentos**
           ;; sobre unas pocas evaluaciones. Las dos cosas son interesantes, pero
           ;; llamarle a una lo que es la otra hace creer que se abarcó mucho más
           ;; terreno del real.
           [:div.grid.grid-cols-1.sm:grid-cols-3.gap-4.mb-2
            [tarjeta-estadistica "Evaluaciones" evaluaciones
             (str intentos (if (= 1 intentos) " intento en total" " intentos en total")
                  " · " tests-completados " completados")]
            [tarjeta-estadistica "Con avance" con-progreso
             (if (pos? evaluaciones)
               (str "de " evaluaciones " subiste tu θ desde el primer intento")
               "Todavía sin comparación")]
            [tarjeta-estadistica "Promedio" (str promedio " %")
             (str "θ medio: " (.toFixed (/ (double theta-promedio) 100) 2))]]

           [profile-block]

           ;; Acciones rápidas
           ;; ADR-022: tres botones de tres colores distintos (índigo, blanco,
           ;; verde) hacían que ninguno fuera el principal. Ahora hay uno solo
           ;; con la señal —el que empieza una evaluación, que es a lo que vino
           ;; el estudiante— y los otros dos son neutros.
           [:div.flex.flex-row.flex-wrap.gap-3.mt-10
            [:button.control.bg-senal-400.text-grafito-900.font-medium.py-2.5.px-5.rounded.hover:bg-senal-300
             {:type "button"
              :on-click #(do
                           (re-frame/dispatch [:test/open-selection])
                           (re-frame/dispatch [:navigate-to :diagnostic-test]))}
             "Nueva evaluación"]
            [:button.control.bg-panel-100.text-gray-900.font-medium.py-2.5.px-5.rounded.hover:bg-panel-50
             {:type "button"
              :on-click #(re-frame/dispatch [:navigate-to :plan])}
             "Mi plan"]
            [:button.control.bg-panel-100.text-gray-900.font-medium.py-2.5.px-5.rounded.hover:bg-panel-50
             {:type "button"
              :on-click #(re-frame/dispatch [:navigate-to :cupos])}
             "Cupos / Grupos"]]

           ;; Último test (el más reciente por fecha/id)
           (when ultimo
             (let [{:keys [tema fecha completado? correctas total porcentaje nota theta
                           duracion-min promedio-seg-pregunta]} ultimo]
               [:div.placa.bg-white.rounded.p-5.sm:p-8.mt-6.max-w-2xl.mx-auto
                [:h3.text-xl.font-bold.text-indigo-700.mb-4 "Última evaluación"]
                [:div.grid.grid-cols-1.sm:grid-cols-2.gap-x-8.gap-y-2
                 [:div [:span.font-semibold "Tema: "] (str tema)]
                 [:div [:span.font-semibold "Fecha: "] (formatear-fecha fecha)]
                 [:div [:span.font-semibold "Completado: "] (if completado? "Sí" "No")]
                 [:div [:span.font-semibold "Correctas: "] (str correctas "/" total)]
                 [:div [:span.font-semibold "Porcentaje: "] (str porcentaje "%")]
                 [:div [:span.font-semibold "Nota: "]
                  (if (number? nota) (.toFixed (double nota) 1) (str nota))]
                 [:div [:span.font-semibold "Nivel final (θ): "]
                  (or (formatear-theta theta) "—")]
                 [:div [:span.font-semibold "Duración total: "] (if duracion-min (str duracion-min " min") "-")]
                 [:div [:span.font-semibold "Promedio por pregunta: "] (if promedio-seg-pregunta (str promedio-seg-pregunta " seg") "-")]]]))

           ;; Tus evaluaciones, agrupadas
           ;; Antes acá había una lista cronológica plana de los 44 intentos. Esa
           ;; lista responde «¿qué hice el martes?»; la pregunta del estudiante es
           ;; «¿en qué evaluaciones estoy y cómo voy en cada una?». Nada se perdió:
           ;; los intentos siguen, dentro de su evaluación.
           [:div.mt-10.max-w-3xl.mx-auto
            [:div.mb-3
             [:h3.text-lg.font-medium.text-gray-900 "Tus evaluaciones"]
             [:p.text-sm.text-gray-600.mt-0.5
              "Una tarjeta por evaluación, con todos tus intentos y cómo cambió tu nivel."]]
            (if (seq grupos)
              [:div.space-y-4
               (for [g grupos]
                 ^{:key (:clave g)}
                 [tarjeta-evaluacion g])]
              [:p.text-gray-500.text-sm "Aún no hay evaluaciones registradas."])
            ;; Sin esta línea, dos sparklines lado a lado invitan a comparar θ
            ;; entre bancos, y eso hoy no es válido: cada banco tiene su propia
            ;; calibración de `difficulty` y ninguna está validada (R-17, Q-05).
            (when (> (count grupos) 1)
              [:p.text-xs.text-gray-500.mt-4
               "Cada evaluación tiene su propia escala: θ se estima contra las preguntas de ese "
               "banco, así que los niveles de dos evaluaciones distintas no son comparables entre sí."])]

           [enlace-configuracion-cuenta]])]

       ;; Fuera del contenedor centrado a propósito: es una barra fija al
       ;; viewport, no una tarjeta más del tablero.
       [timeline/linea-del-tiempo]])))
