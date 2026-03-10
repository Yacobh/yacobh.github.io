(ns universo.components.resume)

;; ─────────────────────────────────────────
;; Sub-componentes de apoyo
;; ─────────────────────────────────────────

(defn section-title [label]
  [:div.flex.items-center.gap-3.mb-8
   [:div.w-8.h-px.bg-indigo-300]
   [:h2.text-xs.tracking-widest.uppercase.text-indigo-500.font-semibold label]
   [:div.flex-1.h-px.bg-gradient-to-r.from-indigo-100.to-transparent]])

(defn skill-pill [label]
  [:span.inline-block.text-xs.font-medium.bg-indigo-50.text-indigo-700.border.border-indigo-100
   {:class "px-3 py-1 rounded-full mr-2 mb-2"}
   label])

(defn timeline-entry [{:keys [role org period location description tags]}]
  [:div.relative.pl-8.pb-10
   ;; línea vertical
   [:div.absolute.left-0.top-2.bottom-0.w-px.bg-gradient-to-b.from-indigo-300.to-transparent]
   ;; punto
   [:div.absolute.left-0.top-2.w-2.h-2.rounded-full.bg-indigo-500.ring-4.ring-indigo-50
    {:style {:transform "translateX(-3.5px)"}}]

   [:div.flex.flex-col.sm:flex-row.sm:items-start.sm:justify-between.mb-1
    [:div
     [:h3.text-base.font-semibold.text-gray-900 role]
     [:p.text-sm.text-indigo-600.font-medium org]]
    [:div.text-right.mt-1.sm:mt-0
     [:span.text-xs.text-gray-400.block period]
     (when location [:span.text-xs.text-gray-400.block location])]]

   [:p.text-sm.text-gray-600.leading-relaxed.mt-2 description]

   (when tags
     [:div.mt-3
      (for [t tags] ^{:key t} [skill-pill t])])])


(defn edu-card [{:keys [degree institution period note]}]
  [:div.bg-white.rounded-2xl.border.border-gray-100.shadow-sm.p-5.hover:shadow-md.transition-shadow
   [:p.text-xs.text-indigo-400.uppercase.tracking-wider.font-medium.mb-1 period]
   [:h3.text-sm.font-semibold.text-gray-900.leading-snug degree]
   [:p.text-xs.text-gray-500.mt-1 institution]
   (when note [:p.text-xs.text-indigo-600.mt-2.font-medium note])])

(defn skill-group [{:keys [icon title items]}]
  [:div.bg-white.rounded-2xl.border.border-gray-100.shadow-sm.p-5
   [:div.flex.items-center.gap-2.mb-3
    [:span.text-lg icon]
    [:h3.text-sm.font-semibold.text-gray-700 title]]
   [:div.flex.flex-wrap
    (for [item items] ^{:key item} [skill-pill item])]])

;; ─────────────────────────────────────────
;; Sección HERO
;; ─────────────────────────────────────────

(defn hero []
  [:div.relative.overflow-hidden
   {:class "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 px-6"}

   ;; fondo decorativo
   [:div.absolute.inset-0.opacity-10
    {:style {:background "radial-gradient(ellipse 60% 50% at 70% 40%, #6366f1 0%, transparent 70%),
                          radial-gradient(ellipse 40% 40% at 20% 70%, #818cf8 0%, transparent 60%)"}}]

   [:div.relative.max-w-4xl.mx-auto

    ;; etiqueta superior
    [:div.inline-flex.items-center.gap-2.bg-indigo-900.bg-opacity-60.border.border-indigo-700
     {:class "rounded-full px-4 py-1.5 mb-8"}
     [:div.w-2.h-2.rounded-full.bg-green-400.animate-pulse]
     [:span.text-xs.text-indigo-300.tracking-widest.uppercase "Perfil profesional"]]

    [:h1.font-bold.text-white.leading-none.mb-3
     {:class "text-4xl sm:text-5xl lg:text-6xl"}
     "Jacobo "
     [:span.text-transparent.bg-clip-text
      {:class "bg-gradient-to-r from-indigo-400 to-purple-400"}
      "Córdova"]]

    [:p.text-indigo-300.text-lg.mb-6.font-light
     "Ingeniero Electrónico · Senior Software Engineer · Docente"]

    [:p.text-slate-400.max-w-2xl.text-base.leading-relaxed.mb-8
     "Más de veinte años integrando electrónica, telecomunicaciones, sistemas distribuidos y docencia en ciencias exactas.
      Diseño sistemas de punta a punta: desde hardware embebido hasta plataformas cloud en producción."]

    ;; contacto / links
    [:div.flex.flex-wrap.gap-3
     [:a.inline-flex.items-center.gap-2.text-xs.bg-white.bg-opacity-10.text-indigo-200.border.border-indigo-700
      {:class "rounded-full px-4 py-2 hover:bg-opacity-20 transition-colors"
       :href  "mailto:jacobocordova@gmail.com"}
      [:span "✉"] "jacobocordova@gmail.com"]

     [:a.inline-flex.items-center.gap-2.text-xs.bg-white.bg-opacity-10.text-indigo-200.border.border-indigo-700
      {:class "rounded-full px-4 py-2 hover:bg-opacity-20 transition-colors"
       :href  "https://github.com/yacobh" :target "_blank"}
      [:span "⌥"] "github.com/yacobh"]

     [:a.inline-flex.items-center.gap-2.text-xs.bg-white.bg-opacity-10.text-indigo-200.border.border-indigo-700
      {:class "rounded-full px-4 py-2 hover:bg-opacity-20 transition-colors"
       :href  "https://linkedin.com/in/jacobocordova" :target "_blank"}
      [:span "◈"] "linkedin.com/in/jacobocordova"]

     [:span.inline-flex.items-center.gap-2.text-xs.bg-white.bg-opacity-10.text-indigo-200.border.border-indigo-700
      {:class "rounded-full px-4 py-2"}
      [:span "◎"] "Iquique, Chile"]]]])


;; ─────────────────────────────────────────
;; Sección ESTADÍSTICAS
;; ─────────────────────────────────────────

(defn stats []
  [:div.bg-indigo-600
   [:div.max-w-4xl.mx-auto.px-6.py-8
    [:div.grid.grid-cols-2.sm:grid-cols-4.gap-6
     (for [[n label] [["20+" "Años de trayectoria"]
                      ["3"   "Dominios integrados"]
                      ["∞"   "Estudiantes apoyados"]
                      ["M.Sc." "Computación Cuántica"]]]
       ^{:key label}
       [:div.text-center
        [:p.text-3xl.font-bold.text-white n]
        [:p.text-xs.text-indigo-200.mt-1.leading-tight label]])]]])


;; ─────────────────────────────────────────
;; Sección EXPERIENCIA
;; ─────────────────────────────────────────

;; SVG del logo de Clojure como watermark de fondo
(defn clojure-watermark
  [{:keys [size opacity]
    :or   {size 320 opacity 0.55}}]
  [:div.absolute.right-0.top-0.bottom-0.flex.items-center.pointer-events-none
   {:style {:opacity opacity}}
   [:svg {:xmlns   "http://www.w3.org/2000/svg"
          :width   size
          :height  size
          :viewBox "0 0 100 100"}

    [:defs
     [:linearGradient {:id "clj-gradient"
                       :x1 "0%" :y1 "0%"
                       :x2 "100%" :y2 "100%"}
      [:stop {:offset "0%"   :stop-color "#5881D8"}]
      [:stop {:offset "100%" :stop-color "#63B132"}]]]

    ;; Círculo con gradiente oficial
    [:circle {:cx "50" :cy "50" :r "48"
              :fill "url(#clj-gradient)"}]

    ;; Anillo blanco concéntrico en la mitad del radio
    [:circle {:cx           "50" :cy "50" :r "24"
              :fill         "none"
              :stroke       "white"
              :stroke-width "3"
              :opacity      "0.4"}]

    ;; Lambda centrada
    [:text {:x           "50"
            :y           "68"
            :text-anchor "middle"
            :font-family "Georgia, serif"
            :font-size   "58"
            :font-weight "bold"
            :fill        "white"}
     "λ"]]])
#_(defn clojure-watermark
  [{:keys [size opacity]
    :or   {size 320 opacity 0.5}}]
  [:div.absolute.right-0.top-0.bottom-0.flex.items-center.pointer-events-none
   {:style {:opacity opacity}}
   [:svg {:xmlns   "http://www.w3.org/2000/svg"
          :width   size
          :height  size
          :viewBox "0 0 100 100"}

    [:defs
     [:linearGradient {:id "clj-gradient"
                       :x1 "0%" :y1 "0%"
                       :x2 "100%" :y2 "100%"}
      [:stop {:offset "0%"   :stop-color "#5881D8"}]
      [:stop {:offset "100%" :stop-color "#63B132"}]]]

    ;; Círculo con gradiente oficial
    [:circle {:cx "50" :cy "50" :r "48"
              :fill "url(#clj-gradient)"}]

    ;; Lambda centrada
    [:text {:x           "50"
            :y           "68"
            :text-anchor "middle"
            :font-family "Georgia, serif"
            :font-size   "58"
            :font-weight "bold"
            :fill        "white"}
     "λ"]]])
#_(defn clojure-watermark
  [{:keys [size opacity]
    :or   {size 320 opacity 0.5}}]
  [:div.absolute.right-0.top-0.bottom-0.flex.items-center.pointer-events-none
   {:style {:opacity opacity}}
   [:span
    {:style {:font-size    (str size "px")
             :line-height  "1"
             :font-family  "Georgia, serif"
             :font-weight  "bold"
             :color        "#5F7FBF"
             :user-select  "none"
             :margin-right "-40px"}}
    "λ"]])

#_(defn clojure-watermark
  [{:keys [size opacity class]
    :or {size 340
         opacity 0.5
         class ""}}]
  [:div.absolute.right-0.top-0.bottom-0.flex.items-center.pointer-events-none
   {:class class
    :style {:opacity opacity}}
   [:svg {:xmlns   "http://www.w3.org/2000/svg"
          :viewBox "0 0 100 100"
          :width   size
          :height  size}

    ;; Gradiente oficial
    [:defs
     [:linearGradient {:id "clj-gradient"
                       :x1 "0%" :y1 "0%"
                       :x2 "100%" :y2 "100%"}
      [:stop {:offset "0%"  :stop-color "#5881D8"}]
      [:stop {:offset "100%" :stop-color "#63B132"}]]]

    ;; Círculo exterior
    [:circle {:cx "50" :cy "50" :r "46"
              :fill "none"
              :stroke "url(#clj-gradient)"
              :stroke-width "4"}]

    ;; Arco superior
    [:path {:d "M 50 18 A 32 32 0 0 1 82 50"
            :fill "none"
            :stroke "url(#clj-gradient)"
            :stroke-width "8"
            :stroke-linecap "round"}]

    ;; Arco inferior
    [:path {:d "M 50 82 A 32 32 0 0 1 18 50"
            :fill "none"
            :stroke "url(#clj-gradient)"
            :stroke-width "8"
            :stroke-linecap "round"}]]])

(defn experiencia []
  (let [jobs [{:role        "Senior Software Engineer"
               :org         "Guaranteed Rate"
               :period      "2023 – 2025"
               :location    "Remoto · Fintech"
               :description "Desarrollo de sistemas backend críticos en Clojure para una plataforma
                              fintech de alta escala. Trabajo en arquitecturas distribuidas, infraestructura
                              cloud en AWS y modernización de pipelines de integración y despliegue continuo."
               :tags        ["Clojure" "AWS EKS" "Terraform" "GitHub Actions" "IAM" "PostgreSQL"]}

              {:role        "Clojure Developer"
               :org         "Flexiana"
               :period      "2021 – 2023"
               :location    "Remoto · Internacional"
               :description "Desarrollo full-stack de aplicaciones web con Clojure y ClojureScript.
                              Integración de servicios externos (Calendly, LemonSqueezy, Minio, Framer).
                              Arquitecturas modulares, Re-frame, Reagent y colaboración ágil con equipos distribuidos."
               :tags        ["Clojure" "ClojureScript" "Re-frame" "Reagent" "Ring"]}

              {:role        "Backend Clojure Developer"
               :org         "Reify Health"
               :period      "2021"
               :location    "Remoto · HealthTech"
               :description "Microservicios de gestión documental para plataformas de investigación
                              clínica regulada. Almacenamiento seguro con AWS S3, control de accesos
                              con IAM y diseño orientado a confiabilidad e integridad de datos."
               :tags        ["Clojure" "AWS S3" "IAM" "Microservicios"]}

              {:role        "Ingeniero de I+D — Jefe de Proyectos"
               :org         "Electromining LTDA"
               :period      "2017 – 2021"
               :location    "Santiago, Chile"
               :description "Diseño y ejecución de sistema de mantenimiento predictivo para
                              maquinaria minera (DATAMINNING, financiado por CORFO). Hardware embebido
                              en C, adquisición de señales (voltaje, corriente, vibración, temperatura),
                              procesamiento de datos y gestión de proyectos de innovación tecnológica."
               :tags        ["C" "Microcontroladores" "CORFO" "Sistemas Embebidos" "Gestión de proyectos"]}

              {:role        "Ingeniero de Comunicaciones"
               :org         "COVETEL S.A."
               :period      "2011 – 2015"
               :location    "Venezuela"
               :description "Operación de sistemas de telecomunicaciones y transmisiones satelitales
                              en vivo. Configuración de equipos RF, radioenlaces, redes cableadas y
                              supervisión de infraestructura crítica."
               :tags        ["Telecomunicaciones" "Satelital" "Redes IP" "RF"]}

              {:role        "Tutor STEM Internacional"
               :org         "CourseHero · Chegg · Educatina"
               :period      "2015 – 2020"
               :location    "Remoto · Online"
               :description "Tutoría avanzada en Matemáticas, Física, Electrónica y Programación
                              para estudiantes universitarios de distintos países, en español e inglés.
                              Resolución de problemas de cálculo, álgebra, ecuaciones diferenciales y algoritmos."
               :tags        ["Matemáticas" "Física" "Python" "C" "LaTeX"]}]]

    [:div.relative.overflow-hidden
     {:class "max-w-4xl mx-auto px-6 py-16"}
     ;; Watermark Clojure al fondo derecho
     [clojure-watermark]
     ;; Contenido
     [:div.relative
      [section-title "Experiencia profesional"]
      (for [j jobs] ^{:key (:role j)} [timeline-entry j])]]))


;; ─────────────────────────────────────────
;; Sección DOCENCIA
;; ─────────────────────────────────────────

(defn docencia []
  [:div.bg-indigo-50
   [:div.max-w-4xl.mx-auto.px-6.py-16
    [section-title "Actividad docente"]

    [:div.grid.grid-cols-1.sm:grid-cols-2.gap-6

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "🎓"]
       [:h3.text-sm.font-semibold.text-gray-800 "Universidad Arturo Prat"]]
      [:p.text-xs.text-indigo-500.mb-2 "2024 – 2025 · Iquique, Chile"]
      [:p.text-sm.text-gray-600
       "Docente de Matemáticas Preuniversitario y diseño de plataforma digital de tutorías
        para la comunidad universitaria. Proyecto de Desarrollo Institucional UAP2393."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "🏛"]
       [:h3.text-sm.font-semibold.text-gray-800 "UNEXPO — Ayudante Docente"]]
      [:p.text-xs.text-indigo-500.mb-2 "2004 – 2008 · Venezuela"]
      [:p.text-sm.text-gray-600
       "Enseñanza de cálculo diferencial e integral a estudiantes de primer semestre de ingeniería.
        Sesiones prácticas, atención de dudas y refuerzo de contenidos fundamentales."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "📐"]
       [:h3.text-sm.font-semibold.text-gray-800 "Educación Media — Física"]]
      [:p.text-xs.text-indigo-500.mb-2 "2009 · Venezuela"]
      [:p.text-sm.text-gray-600
       "Mecánica clásica y electromagnetismo a nivel secundario. Planificación curricular
        y diseño de instrumentos de evaluación."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "🌐"]
       [:h3.text-sm.font-semibold.text-gray-800 "Tutoría Online Internacional"]]
      [:p.text-xs.text-indigo-500.mb-2 "2015 – Presente"]
      [:p.text-sm.text-gray-600
       "Clases y asesorías en Matemáticas, Física, Electrónica y Programación para estudiantes
        universitarios de múltiples países, en español e inglés. Diagnóstico conceptual y pedagogía adaptativa."]]]]])


;; ─────────────────────────────────────────
;; Sección HABILIDADES
;; ─────────────────────────────────────────

(defn habilidades []
  [:div.max-w-4xl.mx-auto.px-6.py-16
   [section-title "Competencias técnicas"]
   [:div.grid.grid-cols-1.sm:grid-cols-2.lg:grid-cols-3.gap-5
    [skill-group {:icon  "⚗️"
                  :title "Programación & Software"
                  :items ["Clojure" "ClojureScript" "Re-frame" "Reagent"
                          "Python" "JavaScript" "C" "C++" "Java"]}]

    [skill-group {:icon  "☁️"
                  :title "Cloud & DevOps"
                  :items ["AWS EKS/ECR/S3/IAM" "Docker" "Kubernetes"
                          "Terraform" "GitHub Actions" "CI/CD"]}]

    [skill-group {:icon  "🗄️"
                  :title "Bases de datos"
                  :items ["PostgreSQL" "SQLite" "Redis" "Supabase"]}]

    [skill-group {:icon  "⚡"
                  :title "Electrónica & Embebidos"
                  :items ["Circuitos analógicos/digitales" "Microcontroladores"
                          "Sensores y actuadores" "CCTV / RF" "Control AC-DC"]}]

    [skill-group {:icon  "📡"
                  :title "Telecomunicaciones"
                  :items ["Redes IP" "Radioenlaces" "Transmisión satelital"
                          "Protocolos de red" "Monitoreo de infraestructura"]}]

    [skill-group {:icon  "∫"
                  :title "Matemática & Física"
                  :items ["Cálculo diferencial e integral" "Álgebra lineal"
                          "Ecuaciones diferenciales" "Mecánica cuántica"
                          "Modelamiento matemático" "LaTeX"]}]]])


;; ─────────────────────────────────────────
;; Sección EDUCACIÓN
;; ─────────────────────────────────────────

(defn educacion []
  [:div.bg-slate-50
   [:div.max-w-4xl.mx-auto.px-6.py-16
    [section-title "Formación académica"]
    [:div.grid.grid-cols-1.sm:grid-cols-2.lg:grid-cols-3.gap-5
     [edu-card {:degree      "Máster en Computación Cuántica"
                :institution "Universidad Internacional de La Rioja (UNIR), España"
                :period      "En curso — 2026"
                :note        "Mecánica cuántica · Algoritmos cuánticos · Información cuántica"}]

     [edu-card {:degree      "Ingeniero Electrónico"
                :institution "UNEXPO — Venezuela · Revalidado en Chile"
                :period      "Título 2011"
                :note        "Índice académico > 7/9 · Ayudante Docente 4 años"}]

     [edu-card {:degree      "6.002x — Circuits and Electronics"
                :institution "MIT via edX (MITx)"
                :period      "2012"
                :note        "Calificación final: A"}]

     [edu-card {:degree      "6.002.2x — Circuits and Electronics 2"
                :institution "MIT via edX (MITx)"
                :period      "2019"
                :note        "Certificado Verificado"}]

     [edu-card {:degree      "Bachiller en Ciencias · Ing. Geológica (hasta 4° sem.)"
                :institution "Universidad de Oriente, Venezuela"
                :period      "2000 – 2003"
                :note        "Base en cálculo, física y análisis científico"}]

     [edu-card {:degree      "XVIII Olimpiada Venezolana de Química (CENAMEC)"
                :institution "Clasificación a certamen nacional"
                :period      "2000"
                :note        "Primer reconocimiento académico formal"}]]]])


;; ─────────────────────────────────────────
;; Sección RECONOCIMIENTOS
;; ─────────────────────────────────────────

(defn reconocimientos []
  [:div.max-w-4xl.mx-auto.px-6.py-16
   [section-title "Reconocimientos y validaciones"]
   [:div.grid.grid-cols-1.sm:grid-cols-2.gap-5
    (for [[icon label desc] [["🏅" "Proyectos CORFO financiados"
                              "Adjudicación y ejecución de fondos de innovación tecnológica con evaluación técnica externa."]
                             ["🎓" "Certificados MITx verificados"
                              "Cursos avanzados de electrónica del MIT con calificación A y certificado verificado."]
                             ["📜" "Título revalidado en Chile"
                              "Confirmación institucional de equivalencia del Ingeniero Electrónico para ejercer en Chile."]
                             ["🏆" "Olimpiadas Ciencias Básicas UNEXPO"
                              "2° y 3° lugar en Física y Matemática a nivel institucional (2005–2008)."]]]
      ^{:key label}
      [:div.flex.gap-4.bg-white.border.border-gray-100.rounded-2xl.shadow-sm.p-5.hover:shadow-md.transition-shadow
       [:span.text-2xl.mt-0.5 icon]
       [:div
        [:h3.text-sm.font-semibold.text-gray-800 label]
        [:p.text-xs.text-gray-500.mt-1.leading-relaxed desc]]])]])


;; ─────────────────────────────────────────
;; Sección INTERESES
;; ─────────────────────────────────────────

(defn intereses []
  [:div.bg-gradient-to-br.from-indigo-950.to-slate-900
   [:div.max-w-4xl.mx-auto.px-6.py-16
    [:div.flex.items-center.gap-3.mb-8
     [:div.w-8.h-px.bg-indigo-600]
     [:h2.text-xs.tracking-widest.uppercase.text-indigo-400.font-semibold "Intereses intelectuales"]
     [:div.flex-1.h-px.bg-gradient-to-r.from-indigo-800.to-transparent]]

    [:div.grid.grid-cols-1.sm:grid-cols-3.gap-6.text-center
     (for [[icon title desc] [["⚛️" "Computación Cuántica"
                               "Fundamentos de la mecánica cuántica, límites físicos del cómputo y algoritmos cuánticos."]
                              ["🧩" "Sistemas Complejos"
                               "Modelación de procesos reales, relación teoría-práctica e ingeniería de sistemas."]
                              ["📚" "Diseño del Aprendizaje"
                               "Sistemas educativos basados en retroalimentación, diagnóstico y personalización."]]]
       ^{:key title}
       [:div.px-4
        [:div.text-4xl.mb-3 icon]
        [:h3.text-sm.font-semibold.text-white.mb-2 title]
        [:p.text-xs.text-slate-400.leading-relaxed desc]])]]])


;; ─────────────────────────────────────────
;; Componente raíz exportado
;; ─────────────────────────────────────────

(defn jacobo []
  [:div.font-sans
   [hero]
   [stats]
   [experiencia]
   [docencia]
   [habilidades]
   [educacion]
   [reconocimientos]
   #_[intereses]])
