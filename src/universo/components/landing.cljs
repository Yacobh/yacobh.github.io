(ns universo.components.landing
  "Landing pública orientada a conversión: explica el método, la modalidad y
   lleva al diagnóstico. Los testimonios son entradas reales del libro de
   visitas ya aprobadas por moderación."
  (:require
   [clojure.string]
   [re-frame.core :as re-frame]
   [reagent.core :as r]))

(defn- scroll-to!
  [element-id]
  (when-let [el (.getElementById js/document element-id)]
    (.scrollIntoView el #js {:behavior "smooth" :block "start"})))

;; -----------------------------------------------------------------------------
;; Contenido
;; -----------------------------------------------------------------------------

(def ^:private steps
  [{:n "1"
    :title "Diagnóstico adaptativo"
    :time "~20 min"
    :body "Respondes preguntas que se ajustan a tu nivel en tiempo real. No pierdes tiempo en lo que ya dominas ni te frustras con lo que aún no."}
   {:n "2"
    :title "Tu perfil real"
    :time "Inmediato"
    :body "Obtienes tu nivel estimado (θ) y, sobre todo, el detalle de los errores concretos que estás cometiendo: no una nota, un mapa."}
   {:n "3"
    :title "Plan de estudio"
    :time "Personalizado"
    :body "Un plan por módulos con la explicación de cada error y material de apoyo, ordenado por lo que más te conviene atacar primero."}
   {:n "4"
    :title "Grupo de estudio"
    :time "Online o presencial"
    :body "Te inscribes en un cupo con estudiantes de tu mismo nivel. El grupo se confirma al alcanzar el mínimo de inscritos y te avisamos."}])

(def ^:private pillars
  [{:icon "◎"
    :title "Mide lo que importa"
    :body "Usamos Teoría de Respuesta al Ítem (IRT), el mismo enfoque psicométrico de las pruebas estandarizadas. La dificultad se adapta a tus respuestas, así que la estimación de tu nivel es precisa con muchas menos preguntas."}
   {:icon "⌥"
    :title "Ataca la causa, no el síntoma"
    :body "Cada alternativa incorrecta está asociada a un error conceptual específico. En vez de decirte «te equivocaste», el plan te explica por qué te equivocaste y qué idea hay que corregir."}
   {:icon "≡"
    :title "Contenido con estructura"
    :body "Los módulos siguen una progresión clásica de aritmética, álgebra y geometría, así que cada tema se apoya en el anterior en lugar de saltar sin orden."}
   {:icon "◍"
    :title "Grupos por nivel"
    :body "Las clases se agrupan por banda de habilidad. Nadie queda atrás porque el resto va más rápido, y nadie se aburre esperando."}])

(def ^:private faqs
  [{:q "¿Cuánto cuesta?"
    :a "El diagnóstico, tu perfil y el plan de estudio no tienen costo. Es una iniciativa académica de la Universidad Arturo Prat junto al profesor Jacobo Córdova."}
   {:q "¿Qué necesito para empezar?"
    :a "Solo una cuenta con tu correo. El diagnóstico se hace desde el navegador, en computador o teléfono, y toma alrededor de 20 minutos."}
   {:q "¿Puedo usar calculadora en el diagnóstico?"
    :a "No. El diagnóstico busca reflejar tus habilidades tal como las usarás en la PAES, así que no debes usar calculadora ni ayudas externas. El tiempo de respuesta también se considera en la estimación."}
   {:q "¿Qué pasa si me va mal en el diagnóstico?"
    :a "No hay «mal». El diagnóstico no es una nota ni queda en ningún registro académico: es la herramienta que define tu punto de partida. Mientras más honesto sea el resultado, más útil será tu plan."}
   {:q "¿Las clases son online o presenciales?"
    :a "Ambas. Al publicar cupos indicamos la modalidad, el horario y el lugar o enlace. Los cupos presenciales se realizan en Iquique."}
   {:q "¿Por qué mi cupo dice «pendiente de confirmación»?"
    :a "Cada grupo necesita un mínimo de inscritos para funcionar. Cuando se alcanza ese mínimo, el cupo pasa a confirmado y recibes un aviso en la plataforma."}
   {:q "¿Puedo repetir el diagnóstico más adelante?"
    :a "Sí, y es recomendable. Repetirlo después de trabajar tu plan te muestra cómo se movió tu nivel y actualiza tus prioridades de estudio."}])

;; -----------------------------------------------------------------------------
;; Piezas reutilizables
;; -----------------------------------------------------------------------------

(defn- primary-cta
  [label & {:keys [full-width?]}]
  [:button
   {:type "button"
    :class (str "inline-flex items-center justify-center gap-2 rounded-full "
                "bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3.5 "
                "text-base font-semibold text-white shadow-lg shadow-indigo-600/25 "
                "transition hover:opacity-90 hover:shadow-xl "
                "focus:outline-none focus:ring-4 focus:ring-indigo-300 "
                (when full-width? "w-full sm:w-auto"))
    :on-click #(re-frame/dispatch [:landing/start])}
   label
   [:span {:aria-hidden "true"} "→"]])

(defn- section-heading
  [eyebrow title subtitle]
  [:div {:class "mx-auto max-w-2xl text-center"}
   [:p {:class "text-sm font-semibold uppercase tracking-wider text-indigo-600"} eyebrow]
   [:h2 {:class "mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900"} title]
   (when subtitle
     [:p {:class "mt-4 text-lg leading-relaxed text-gray-600"} subtitle])])

;; -----------------------------------------------------------------------------
;; Hero
;; -----------------------------------------------------------------------------

(defn- profile-preview
  "Muestra la salida real del producto (perfil θ + déficits) como demostración."
  []
  [:div {:class "relative"}
   [:div {:class "absolute -inset-4 rounded-3xl bg-gradient-to-tr from-indigo-200/60 to-purple-200/60 blur-2xl"
          :aria-hidden "true"}]
   [:div {:class "relative rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"}
    [:div {:class "flex items-center justify-between"}
     [:span {:class "text-xs font-semibold uppercase tracking-wider text-gray-400"}
      "Ejemplo de perfil"]
     [:span {:class "rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"}
      "Banda: básico"]]

    [:div {:class "mt-5"}
     [:div {:class "flex items-baseline gap-2"}
      [:span {:class "text-4xl font-bold text-gray-900"} "θ = 0,42"]
      [:span {:class "text-sm text-gray-500"} "nivel estimado"]]
     [:div {:class "mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-100"}
      [:div {:class "h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
             :style {:width "46%"}}]]
     [:div {:class "mt-1.5 flex justify-between text-xs text-gray-400"}
      [:span "inicial"] [:span "básico"] [:span "intermedio"] [:span "avanzado"]]]

    [:div {:class "mt-6"}
     [:p {:class "text-sm font-semibold text-gray-700"} "Qué corregir primero"]
     [:ul {:class "mt-3 space-y-2.5"}
      (for [[label pct] [["Fracciones y proporciones" "72%"]
                         ["Factorización" "54%"]
                         ["Ecuación de la recta" "38%"]]]
        ^{:key label}
        [:li {:class "flex items-center gap-3"}
         [:span {:class "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700"}
          "!"]
         [:span {:class "flex-1 text-sm text-gray-700"} label]
         [:span {:class "text-xs font-medium text-gray-400"} pct]])]]

    [:p {:class "mt-6 border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-400"}
     "Datos de demostración. Tu perfil se calcula con tus propias respuestas."]]])

(defn- hero []
  [:section {:class "relative overflow-hidden"}
   [:div {:class "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24"}
    [:div {:class "grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16"}

     ;; Columna de mensaje
     [:div
      [:div {:class "inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-indigo-700 backdrop-blur"}
       [:span {:class "h-1.5 w-1.5 rounded-full bg-green-500" :aria-hidden "true"}]
       "Iniciativa UNAP · Prof. Jacobo Córdova"]

      [:h1 {:class "mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"}
       "Prepara la PAES de Matemática"
       [:span {:class "block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"}
        "estudiando solo lo que te falta."]]

      [:p {:class "mt-6 max-w-xl text-lg leading-relaxed text-gray-600"}
       "Un diagnóstico adaptativo identifica exactamente qué errores estás cometiendo en Matemática 1. "
       "Con eso armamos tu plan de estudio y te ubicamos en un grupo de tu nivel, online o presencial."]

      [:div {:class "mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"}
       [primary-cta "Comenzar mi diagnóstico" :full-width? true]
       [:button
        {:type "button"
         :class (str "inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 "
                     "bg-white px-6 py-3.5 text-base font-semibold text-gray-700 transition "
                     "hover:border-gray-400 hover:bg-gray-50 "
                     "focus:outline-none focus:ring-4 focus:ring-gray-200")
         :on-click #(scroll-to! "como-funciona")}
        "Ver cómo funciona"]]

      [:dl {:class "mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4"}
       (for [[k v] [["Sin costo" "Iniciativa académica"]
                    ["~20 min" "Dura el diagnóstico"]
                    ["Online" "y presencial en Iquique"]
                    ["Método IRT" "Psicometría aplicada"]]]
         ^{:key k}
         [:div
          [:dt {:class "text-base font-semibold text-gray-900"} k]
          [:dd {:class "mt-0.5 text-sm text-gray-500"} v]])]]

     ;; Columna visual
     [:div {:class "lg:pl-4"}
      [profile-preview]]]]])

;; -----------------------------------------------------------------------------
;; Cómo funciona
;; -----------------------------------------------------------------------------

(defn- how-it-works []
  [:section {:id "como-funciona"
             :class "scroll-mt-20 bg-white py-20 sm:py-24"}
   [:div {:class "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}
    [section-heading
     "Cómo funciona"
     "Cuatro pasos, una sola tarde para empezar"
     "No hay que elegir curso ni adivinar por dónde partir. El recorrido se arma con tus resultados."]

    [:ol {:class "mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"}
     (for [{:keys [n title time body]} steps]
       ^{:key n}
       [:li {:class (str "relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 "
                         "transition hover:border-indigo-300 hover:shadow-lg")}
        [:span {:class "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-lg font-bold text-white"}
         n]
        [:h3 {:class "mt-5 text-lg font-semibold text-gray-900"} title]
        [:span {:class "mt-1 text-xs font-medium uppercase tracking-wide text-indigo-600"} time]
        [:p {:class "mt-3 text-sm leading-relaxed text-gray-600"} body]])]

    [:div {:class "mt-12 text-center"}
     [primary-cta "Empezar ahora"]]]])

;; -----------------------------------------------------------------------------
;; Por qué funciona
;; -----------------------------------------------------------------------------

(defn- why-it-works []
  [:section {:class "py-20 sm:py-24"}
   [:div {:class "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}
    [section-heading
     "El método"
     "Por qué esto no es otro banco de ensayos"
     "Hacer más ensayos no sirve si nadie te dice qué estás entendiendo mal. Eso es lo que resolvemos."]

    [:div {:class "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"}
     (for [{:keys [icon title body]} pillars]
       ^{:key title}
       [:div {:class "flex gap-5 rounded-2xl border border-gray-200 bg-white/70 p-6 backdrop-blur transition hover:bg-white hover:shadow-md"}
        [:span {:class "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl text-indigo-600"
                :aria-hidden "true"}
         icon]
        [:div
         [:h3 {:class "text-lg font-semibold text-gray-900"} title]
         [:p {:class "mt-2 text-sm leading-relaxed text-gray-600"} body]]])]]])

;; -----------------------------------------------------------------------------
;; Modalidades
;; -----------------------------------------------------------------------------

(defn- modality-card
  [{:keys [title tag body bullets highlight?]}]
  [:div {:class (str "flex flex-col rounded-2xl border p-7 "
                     (if highlight?
                       "border-indigo-300 bg-white shadow-xl ring-1 ring-indigo-100"
                       "border-gray-200 bg-white/70 backdrop-blur"))}
   [:div {:class "flex items-center justify-between gap-3"}
    [:h3 {:class "text-xl font-bold text-gray-900"} title]
    [:span {:class (str "rounded-full px-3 py-1 text-xs font-semibold "
                        (if highlight?
                          "bg-indigo-600 text-white"
                          "bg-gray-100 text-gray-600"))}
     tag]]
   [:p {:class "mt-3 text-sm leading-relaxed text-gray-600"} body]
   [:ul {:class "mt-6 flex-1 space-y-3"}
    (for [b bullets]
      ^{:key b}
      [:li {:class "flex items-start gap-2.5 text-sm text-gray-700"}
       [:span {:class "mt-0.5 text-indigo-600" :aria-hidden "true"} "✓"]
       [:span b]])]])

(defn- modalities []
  [:section {:class "bg-white py-20 sm:py-24"}
   [:div {:class "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}
    [section-heading
     "Modalidades"
     "Estudia donde te acomode"
     "Publicamos cupos por banda de nivel. Eliges el horario que te sirve y el grupo se confirma al llegar al mínimo de inscritos."]

    [:div {:class "mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2"}
     [modality-card
      {:title "Online"
       :tag "En vivo"
       :highlight? true
       :body "Clases sincrónicas por videollamada, con el enlace publicado en tu cupo."
       :bullets ["Sin traslados: te conectas desde donde estés"
                 "Mismo material y seguimiento que la modalidad presencial"
                 "Ideal si estás fuera de Iquique"]}]
     [modality-card
      {:title "Presencial"
       :tag "Iquique"
       :body "Sesiones cara a cara en el lugar indicado en cada cupo."
       :bullets ["Resolución de dudas en pizarra, en el momento"
                 "Grupos reducidos por banda de nivel"
                 "Buena opción si te cuesta mantener el ritmo solo"]}]]

    [:p {:class "mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500"}
     "Los cupos disponibles se muestran en tu plataforma una vez que completas el diagnóstico, "
     "filtrados según tu banda de nivel."]]])

;; -----------------------------------------------------------------------------
;; Testimonios (guestbook aprobado)
;; -----------------------------------------------------------------------------

(defn- initial
  [s]
  (let [t (clojure.string/trim (str s))]
    (if (seq t)
      (clojure.string/upper-case (subs t 0 1))
      "?")))

(defn- testimonial-card
  [{:keys [name message created_at]}]
  [:figure {:class "flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"}
   [:span {:class "text-3xl leading-none text-indigo-300" :aria-hidden "true"} "\u201C"]
   [:blockquote {:class "mt-2 flex-1 text-sm leading-relaxed text-gray-700"}
    message]
   [:figcaption {:class "mt-5 flex items-center gap-3 border-t border-gray-100 pt-4"}
    [:span {:class "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white"}
     (initial name)]
    [:div
     [:p {:class "text-sm font-semibold text-gray-900"} name]
     (when created_at
       [:p {:class "text-xs text-gray-400"}
        (try
          (.toLocaleDateString (js/Date. created_at) "es-CL"
                               #js {:year "numeric" :month "long"})
          (catch :default _ ""))])]]])

(defn- testimonials []
  (let [items @(re-frame/subscribe [:landing/testimonials])
        loading? @(re-frame/subscribe [:landing/testimonials-loading?])]
    ;; Sin mensajes aprobados no mostramos prueba social vacía.
    (when (or loading? (seq items))
      [:section {:class "py-20 sm:py-24"}
       [:div {:class "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}
        [section-heading
         "Testimonios"
         "Lo que dicen quienes ya pasaron por aquí"
         nil]
        (if loading?
          [:div {:class "mt-14 flex justify-center"}
           [:div {:class "h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-600"}]]
          [:div {:class "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"}
           (for [t items]
             ^{:key (:id t)}
             [testimonial-card t])])
        [:div {:class "mt-10 text-center"}
         [:button
          {:type "button"
           :class "text-sm font-semibold text-indigo-600 underline-offset-4 hover:text-indigo-800 hover:underline"
           :on-click #(re-frame/dispatch [:navigate-to :guestbook])}
          "Dejar tu mensaje en el libro de visitas →"]]]])))

;; -----------------------------------------------------------------------------
;; FAQ
;; -----------------------------------------------------------------------------

(defn- faq []
  (let [open @(re-frame/subscribe [:landing/faq-open])]
    [:section {:id "preguntas"
               :class "scroll-mt-20 bg-white py-20 sm:py-24"}
     [:div {:class "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"}
      [section-heading "Preguntas frecuentes" "Antes de empezar" nil]
      [:dl {:class "mt-12 divide-y divide-gray-200 border-t border-gray-200"}
       (map-indexed
        (fn [idx {:keys [q a]}]
          (let [open? (= open idx)]
            ^{:key q}
            [:div {:class "py-2"}
             [:dt
              [:button
               {:type "button"
                :aria-expanded (if open? "true" "false")
                :class (str "flex w-full items-start justify-between gap-4 py-4 text-left "
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded")
                :on-click #(re-frame/dispatch [:landing/toggle-faq idx])}
               [:span {:class "text-base font-semibold text-gray-900"} q]
               [:span {:class (str "mt-0.5 shrink-0 text-xl font-light text-indigo-600 transition-transform "
                                   (when open? "rotate-45"))
                       :aria-hidden "true"}
                "+"]]]
             (when open?
               [:dd {:class "pb-5 pr-8 text-sm leading-relaxed text-gray-600"} a])]))
        faqs)]]]))

;; -----------------------------------------------------------------------------
;; CTA final
;; -----------------------------------------------------------------------------

(defn- final-cta []
  [:section {:class "px-4 pb-20 sm:px-6 lg:px-8"}
   [:div {:class "mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 px-6 py-14 text-center shadow-2xl sm:px-14"}
    [:h2 {:class "text-3xl font-bold tracking-tight text-white sm:text-4xl"}
     "Descubre hoy qué te está frenando"]
    [:p {:class "mx-auto mt-4 max-w-xl text-lg leading-relaxed text-indigo-100"}
     "Veinte minutos de diagnóstico y sabrás exactamente en qué concentrar tu estudio. Sin costo y sin compromiso."]
    [:div {:class "mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"}
     [:button
      {:type "button"
       :class (str "inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 "
                   "text-base font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50 "
                   "focus:outline-none focus:ring-4 focus:ring-white/40 sm:w-auto")
       :on-click #(re-frame/dispatch [:landing/start])}
      "Comenzar mi diagnóstico"
      [:span {:aria-hidden "true"} "→"]]
     [:button
      {:type "button"
       :class (str "inline-flex w-full items-center justify-center rounded-full border border-white/40 px-8 py-3.5 "
                   "text-base font-semibold text-white transition hover:bg-white/10 "
                   "focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto")
       :on-click #(scroll-to! "preguntas")}
      "Tengo dudas"]]
    [:p {:class "mt-8 text-sm text-indigo-200"}
     "Iniciativa de la Universidad Arturo Prat junto al profesor "
     [:button
      {:type "button"
       :class "font-semibold text-white underline underline-offset-4 hover:text-indigo-100"
       :on-click #(re-frame/dispatch [:navigate-to :jacobocordova])}
      "Jacobo Córdova"]]]])

;; -----------------------------------------------------------------------------
;; Página
;; -----------------------------------------------------------------------------

(defn landing []
  (r/create-class
   {:display-name "landing"
    :component-did-mount
    (fn [_]
      (re-frame/dispatch [:landing/enter]))
    :reagent-render
    (fn []
      [:div
       [hero]
       [how-it-works]
       [why-it-works]
       [modalities]
       [testimonials]
       [faq]
       [final-cta]])}))
