(ns universo.components.plan
  (:require
   [re-frame.core :as re-frame]
   [reagent.core :as r]
   [universo.irt.fluency :as fluency]
   [universo.profile :as profile]
   [universo.components.math-render :as math]
   [universo.components.ui :as ui]))

(defn- empty-no-profile []
  [:div.bg-white.rounded-xl.shadow.p-5.sm:p-8.text-center.max-w-xl.mx-auto
   [:h2.text-xl.font-bold.text-gray-800.mb-2 "Aún no hay plan"]
   [:p.text-gray-600.mb-6
    "Completa un diagnóstico adaptativo para identificar tus déficits y recomendarte recursos."]
   [:button.bg-indigo-600.text-white.font-semibold.py-3.px-6.rounded-lg.hover:bg-indigo-700
    {:type "button"
     :on-click #(do
                  (re-frame/dispatch [:test/open-selection])
                  (re-frame/dispatch [:navigate-to :diagnostic-test]))}
    "Hacer diagnóstico"]])

(defn- layer0-card [m]
  [:div.border.border-amber-100.bg-amber-50.rounded-lg.p-4
   (when (:question-text m)
     [:p.text-sm.text-gray-800.mb-2 (math/latex (:question-text m))])
   (when (:selected m)
     [:p.text-xs.text-amber-800.mb-1 (str "Elegiste: " (:selected m))])
   (when (:explanation m)
     [:p.text-sm.text-gray-700 (math/latex (:explanation m))])
   (when (:module-slug m)
     [:p.text-xs.text-gray-500.mt-2 (:module-slug m)])])

(defn resource-card
  "Tarjeta de un recurso **tal como la ve el estudiante**.

   Pública a propósito: el editor de recursos del panel admin la reusa para su
   vista previa (`universo.components.admin/resource-form`). Duplicar el markup
   allá haría que las dos vistas se separen con el primer cambio, y una vista
   previa que no coincide con lo que se publica es peor que no tener ninguna:
   deja al autor corrigiendo un problema que no existe, o publicando uno que sí.
   Si esta función cambia, la vista previa cambia con ella."
  [r]
  [:div.border.border-gray-200.rounded-lg.p-4.bg-white
   [:div.flex.justify-between.gap-2.mb-1
    [:h4.font-semibold.text-gray-800 (or (:title r) "Recurso")]
    [:span.text-xs.text-indigo-600.uppercase (or (:type r) "")]]
   (when-let [ctx (or (:historical_context r) (:historical-context r))]
     [:p.text-xs.text-stone-500.italic.mb-2 ctx])
   (when (:body r)
     [:div.text-sm.text-gray-700.mb-2.whitespace-pre-wrap
      (math/latex (:body r))])
   (when-let [url (:media_url r)]
     [:a.text-sm.text-indigo-600.hover:underline
      {:href url :target "_blank" :rel "noopener noreferrer"}
      "Abrir recurso →"])
   (when-let [slug (or (:module_slug r) (get-in r [:modules :slug]))]
     [:p.text-xs.text-gray-400.mt-2 slug])])

(defn- fluency-grid
  "El 2×2 de θ × λ con la celda del estudiante encendida.

   Se dibuja el mapa completo y no solo la etiqueta a propósito: ver los otros
   tres cuadrantes es lo que le da sentido al propio. «Sabe pero le cuesta» no
   significa nada suelto; significa algo al lado de «consolidado»."
  [activo]
  (let [celda (fn [id etiqueta]
                [:div {:class (str "rounded-md px-2 py-3 text-center text-xs leading-tight transition "
                                   (if (= id activo)
                                     "bg-indigo-600 font-semibold text-white shadow-sm"
                                     "bg-gray-50 text-gray-400"))}
                 etiqueta])]
    [:div.shrink-0
     [:div {:class "grid grid-cols-2 gap-1.5" :style {:width "180px"}}
      [celda :rapido-sin-base "Rápido, sin base"]
      [celda :consolidado "Consolidado"]
      [celda :en-construccion "En construcción"]
      [celda :sabe-pero-lento "Sabe, pero le cuesta"]]
     [:div.mt-1.flex.justify-between {:style {:width "180px"}}
      [:span.text-xs.text-gray-400 "← menos nivel"]
      [:span.text-xs.text-gray-400 "más nivel →"]]]))

(defn- fluency-card
  "Cómo estudia, no solo cuánto sabe. Eje 2 de VISION §3.3.

   Tres estados, no dos:
   - **con cuadrante** → el perfil y su acción;
   - **con datos pero insuficientes** → se dice cuántos faltan y por qué. Este
     estado nació de un caso real (3 aciertos de 10 en `mq_momento_angular`,
     2026-08-12): la primera versión escondía la tarjeta entera y dejaba sin
     enterarse justo a quien más lejos estaba del umbral;
   - **sin ningún dato de tiempo** → no se muestra nada, porque no hay nada que
     decir y el eje simplemente no aplica.

   ⚠ **Corrección 2026-08-18.** Ese tercer estado tenía un agujero que el escape
   (ADR-029) volvió fácil de alcanzar: con `n = 0` la tarjeta desaparecía
   **entera y en silencio**. Antes eso exigía no acertar ni una sola pregunta y
   era raro; ahora basta con declarar «no sé» varias veces, porque un escape es
   `:correct? false` y no aporta a `n`. Justo el caso que D-44 dice que hay que
   contar en vez de esconder — y peor, porque quien escapó **sabe que hizo algo**
   y ve una tarjeta menos sin explicación. Por eso `insuficiente?` ahora también
   se enciende cuando hubo escapes."
  [fluencia perfil escape]
  (let [n (or (:n fluencia) 0)
        escapes (or (:total escape) 0)
        ;; Sin cuadrante hay dos situaciones muy distintas, y confundirlas fue el
        ;; error de la primera versión: **no hay ningún dato de tiempo** (el eje
        ;; no aplica y no hay nada que decir) o **hay datos pero no alcanzan**
        ;; para una mediana confiable. Lo segundo sí hay que decirlo: esconder la
        ;; tarjeta dejaba sin enterarse justo a quien más lejos está del umbral.
        insuficiente? (and (nil? perfil) (or (pos? n) (pos? escapes)))]
    (when (or perfil insuficiente?)
      [:div.bg-white.rounded-xl.shadow.p-6
       [:div.flex.items-start.justify-between.gap-2.mb-1
        [:h2.text-lg.font-bold.text-gray-800 "Cómo estás resolviendo"]
        [:span.text-xs.text-gray-400.shrink-0 "Fluidez · λ"]]
       [:p.text-xs.text-gray-500.mb-4
        "Además de cuánto sabes, cuánto te cuesta llegar al resultado."]

       [:div.flex.flex-col.gap-5 {:class "sm:flex-row sm:items-start"}
        [fluency-grid (:id perfil)]

        (if insuficiente?
          [:div.min-w-0.flex-1
           [:p.font-semibold.text-gray-900 "Todavía no alcanza para ubicarte"]
           [:p.text-sm.text-gray-600.mt-1
            "La fluidez se mide solo sobre las preguntas que respondes "
            [:strong "bien"]
            ": una equivocada tarda lo mismo la sepas o no, así que su tiempo no "
            "dice nada. Por ahora hay "
            [:strong (str n (if (= 1 n) " respuesta correcta" " respuestas correctas"))]
            (str " con tiempo medido, y hacen falta " fluency/min-responses ".")]
           ;; Se nombra el escape explícitamente. Quien apretó «no sé» sabe que
           ;; hizo algo, y no decírselo le deja la impresión de que se perdió un
           ;; dato — cuando en realidad es la consecuencia esperada de no haber
           ;; respondido: no hay tiempo de resolución que medir.
           (when (pos? escapes)
             [:p.text-sm.text-gray-600.mt-2
              (str "Las " escapes (if (= 1 escapes) " vez que dijiste" " veces que dijiste")
                   " «no sé» tampoco cuentan acá, y está bien: no hay un tiempo de "
                   "resolución que medir si no llegaste a resolver.")])
           [:div.mt-3.rounded-lg.bg-amber-50.border.border-amber-100.p-3
            [:p.text-xs.font-semibold.uppercase.tracking-wide.text-amber-800.mb-1
             "Qué conviene hacer"]
            [:p.text-sm.text-amber-900
             (str "Nada especial por la fluidez: con este resultado, lo que manda "
                  "es el contenido. Vuelve acá cuando estés acertando más y este "
                  "eje va a tener algo que decirte.")]]]

          [:div.min-w-0.flex-1
           [:p.font-semibold.text-gray-900 (:titulo perfil)]
           [:p.text-sm.text-gray-600.mt-1 (:descripcion perfil)]
           [:div.mt-3.rounded-lg.bg-indigo-50.border.border-indigo-100.p-3
            [:p.text-xs.font-semibold.uppercase.tracking-wide.text-indigo-700.mb-1
             "Qué conviene hacer"]
            [:p.text-sm.text-indigo-900 (:accion perfil)]]])]

     ;; La medición, en letra chica y sin adornos. Es el número con el que se
     ;; puede discutir la etiqueta, así que tiene que estar a la vista.
     (when-let [t-rel (:t-rel fluencia)]
       [:p.text-xs.text-gray-400.mt-4
        (str "Medido sobre " (:n fluencia)
             (if (= 1 (:n fluencia)) " respuesta correcta" " respuestas correctas")
             ": tardaste "
             (.toFixed (js/Number t-rel) 1)
             " veces lo que toma leer cada enunciado.")])])))

(defn plan-panel []
  (r/create-class
   {:display-name "plan-panel"
    :component-did-mount
    (fn [_]
      (re-frame/dispatch [:plan/enter]))
    :reagent-render
    (fn []
      (let [profile-map @(re-frame/subscribe [:student-profile])
            built (or (:profile profile-map) {})
            band (or (:theta_band profile-map) (:theta-band built))
            loading? @(re-frame/subscribe [:plan/loading?])
            layer0 @(re-frame/subscribe [:plan/layer0])
            deficits @(re-frame/subscribe [:plan/deficits])
            {resources :resources resources-kind :kind} @(re-frame/subscribe [:plan/resources])
            personalized? (= :personalized resources-kind)
            error @(re-frame/subscribe [:plan/error])
            has-profile? (or (number? (:theta profile-map))
                             (number? (:theta built))
                             (seq deficits)
                             (seq layer0))
            last-responses @(re-frame/subscribe [:plan/last-responses])
            ;; El perfil guardado trae `:fluency` solo si lo escribió una versión
            ;; posterior a ADR-019. Si no lo trae, se recalcula desde las
            ;; respuestas del último test, que ya guardaban tiempo y peso. Sin
            ;; este fallback el eje no existiría para nadie hasta que volviera a
            ;; rendir un diagnóstico.
            fluencia (let [guardada (:fluency built)]
                       (if (pos? (or (:n guardada) 0))
                         guardada
                         (fluency/classify
                          last-responses
                          @(re-frame/subscribe [:plan/fluency-thresholds]))))
            ;; Se recalcula el cuadrante en vez de leer `:fluency-profile` del
            ;; JSONB: los textos guardados podrían ser de una versión anterior
            ;; del catálogo de perfiles, y `profile-for` tolera que las bandas
            ;; lleguen como string tras el round-trip.
            fluency-profile (fluency/profile-for band (:band fluencia))]
        [:div.py-8.px-4
         [:div.max-w-3xl.mx-auto.space-y-6
          [:div.bg-white.rounded-xl.shadow.p-6
           [:h1.text-2xl.font-bold.text-gray-900.mb-1 "Mi plan"]
           [:p.text-sm.text-gray-500
            "Capa 0: explicaciones de tus errores. Capa 1: recursos Baldor por módulo."]
           (when band
             [:p.text-sm.text-indigo-700.mt-2
              (str "Banda de cupo: " (profile/band-label band)
                   (when (number? (or (:theta profile-map) (:theta built)))
                     (str " (θ = "
                          (.toFixed (js/Number (or (:theta profile-map) (:theta built))) 2)
                          ")")))])]

          (cond
            (and loading? (not has-profile?))
            [ui/loading-block "Cargando plan…"]

            (not has-profile?)
            [empty-no-profile]

            :else
            [:div.space-y-6
             ;; Va primero: responde «cómo estudiar», que condiciona la lectura
             ;; de todo lo que sigue («qué estudiar»).
             [fluency-card fluencia fluency-profile (:escape built)]

             (when (seq deficits)
               [:div.bg-white.rounded-xl.shadow.p-6
                [:h2.text-lg.font-bold.text-gray-800.mb-3 "Dónde necesitas ayuda"]
                [:ul.space-y-2
                 (for [d deficits]
                   ^{:key (:module-slug d)}
                   [:li.flex.justify-between.text-sm.border-b.border-gray-100.py-2
                    [:span.font-medium.text-gray-800 (:module-slug d)]
                    [:span.text-red-600
                     (str (:errors d) "/" (:total d) " errores")]])]])

             [:div.bg-white.rounded-xl.shadow.p-6
              [:h2.text-lg.font-bold.text-gray-800.mb-3 "Desde tu diagnóstico"]
              (if (seq layer0)
                [:div.space-y-3
                 (for [[i m] (map-indexed vector layer0)]
                   ^{:key (str "m-" i "-" (:question-id m))}
                   [layer0-card m])]
                [:p.text-sm.text-gray-500 "No hay misconceptions registradas en el último test."])]

             [:div.bg-white.rounded-xl.shadow.p-6
              [:h2.text-lg.font-bold.text-gray-800.mb-3
               (if personalized? "Recursos recomendados" "Material de estudio disponible")]
              (when error
                [:p.text-sm.text-red-600.mb-3 error])
              (if (seq resources)
                [:div.space-y-3
                 ;; Sin cruce con los déficits esto es la biblioteca, no un plan:
                 ;; se dice explícitamente en vez de presentarla como recomendación.
                 (when-not personalized?
                   [:p.text-sm.text-amber-800.bg-amber-50.border.border-amber-100.rounded-lg.p-3
                    (str "Todavía no podemos enlazar este material con los errores de tu "
                         "diagnóstico, así que te mostramos todo lo que hay publicado. Las "
                         "explicaciones de arriba sí son las tuyas.")])
                 (for [r resources]
                   ^{:key (:id r)}
                   [resource-card r])]
                [:p.text-sm.text-gray-500
                 (str "Estamos preparando el material de estudio para tus módulos. Mientras tanto, "
                      "las explicaciones de tus errores (arriba) ya te dicen exactamente qué repasar.")])]

             [:div.flex.flex-wrap.gap-3.justify-center
              [:button.bg-indigo-600.text-white.font-semibold.py-2.px-5.rounded-lg.hover:bg-indigo-700.transition
               {:type "button"
                :on-click #(re-frame/dispatch [:navigate-to :cupos])}
               "Ver cupos para mi nivel"]
              [:button.bg-white.border.border-gray-300.text-gray-700.font-semibold.py-2.px-5.rounded-lg.hover:bg-gray-50.transition
               {:type "button"
                :on-click #(re-frame/dispatch [:navigate-to :dashboard])}
               "Volver al tablero"]]])]]))}))
