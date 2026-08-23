(ns universo.components.resume)

;; ─────────────────────────────────────────
;; Sub-componentes de apoyo
;; ─────────────────────────────────────────

(defn section-title [label]
  [:div.flex.items-center.gap-3.mb-8
   [:div.w-8.h-px.bg-indigo-300]
   [:h2.text-xs.tracking-widest.uppercase.text-indigo-600.font-semibold label]
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
     [:span.text-xs.text-gray-600.block period]
     (when location [:span.text-xs.text-gray-600.block location])]]

   [:p.text-sm.text-gray-600.leading-relaxed.mt-2 description]

   (when tags
     [:div.mt-3
      (for [t tags] ^{:key t} [skill-pill t])])])


(defn edu-card [{:keys [degree institution period note]}]
  [:div.bg-white.rounded-2xl.border.border-gray-100.shadow-sm.p-5.hover:shadow-md.transition-shadow
   [:p.text-xs.text-indigo-600.uppercase.tracking-wider.font-medium.mb-1 period]
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
     "Ingeniero Electrónico · Senior Software Engineer · Profesor de Ciencias"]

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

;; Marca de agua de Clojure detrás de la experiencia profesional.
;;
;; Son los paths del logotipo OFICIAL, tomados del SVG que aportó el owner
;; (Clojure_logo.svg, 256×256). Antes acá había una lambda dibujada a mano
;; dentro de un círculo, que no es la marca: la marca son dos espirales
;; entrelazadas, una azul y una verde.
;;
;; El primer path —el círculo blanco— NO es relleno prescindible: la lambda del
;; logo **no está dibujada**, es el hueco que dejan las dos espirales. Sin ese
;; blanco debajo no hay λ. Es literalmente el paradigma funcional en negativo,
;; y por eso se conserva aunque sobre una tarjeta blanca parezca no hacer nada.
;;
;; El SVG original no trae `viewBox` (solo width/height), así que se agrega:
;; sin él no escala y se recorta a 256px.
;;
;; Sobre la opacidad 0.22 — está medida, no elegida:
;;   · el peor caso en claro lo impone el azul #5881d8 → 5.35
;;   · el peor caso en oscuro lo impone el círculo BLANCO → 5.53
;;     (en oscuro el texto es claro, así que el blanco es lo que más molesta)
;; El techo absoluto para AA es 0.28; con 0.22 queda margen. La versión previa
;; usaba 0.55 y hundía las fechas a 3.54 en claro y 1.92 en oscuro.
(defn clojure-watermark
  [{:keys [size opacity]
    :or   {size 340 opacity 0.22}}]
  ;; Separado del borde: pegado a `right-0` la circunferencia queda al ras del
  ;; canto de la ventana y se lee como recortada aunque no lo esté.
  [:div.absolute.top-0.bottom-0.flex.items-center.pointer-events-none
   {:style {:opacity opacity :right "3rem"}
    :aria-hidden "true"}   ;; decorativo: no se anuncia al lector de pantalla
   [:svg {:xmlns   "http://www.w3.org/2000/svg"
          :width   size
          :height  size
          :viewBox "0 0 256 256"}
    [:path {:fill "#ffffff"
            :d "M 127.999,0 C 57.423,0 0,57.423 0,128.001 0,198.585 57.423,256.005 127.999,256.005 198.577,256.005 256,198.585 256,128.001 256,57.423 198.577,0 127.999,0"}]
    [:path {:fill "#91dc47"
            :d "m 123.318,130.303 c -1.15,2.492 -2.419,5.292 -3.733,8.272 -4.645,10.524 -9.789,23.33 -11.668,31.534 -0.675,2.922 -1.093,6.543 -1.085,10.558 0,1.588 0.085,3.257 0.22,4.957 6.567,2.413 13.66,3.74 21.067,3.753 6.743,-0.013 13.221,-1.127 19.284,-3.143 -1.425,-1.303 -2.785,-2.692 -4.023,-4.257 -8.22,-10.482 -12.806,-25.844 -20.062,-51.674"}]
    [:path {:fill "#91dc47"
            :d "m 92.97,78.225 c -15.699,11.064 -25.972,29.312 -26.011,49.992 0.039,20.371 10.003,38.383 25.307,49.493 3.754,-15.637 13.164,-29.955 27.275,-58.655 -0.838,-2.302 -1.793,-4.822 -2.862,-7.469 -3.909,-9.806 -9.551,-21.194 -14.586,-26.351 -2.567,-2.694 -5.682,-5.022 -9.123,-7.01"}]
    [:path {:fill "#63b132"
            :d "m 181.394,198.367 c -8.1,-1.015 -14.785,-2.24 -20.633,-4.303 -9.836,4.884 -20.913,7.643 -32.642,7.643 -40.584,0 -73.483,-32.894 -73.488,-73.49 0,-22.027 9.704,-41.773 25.056,-55.24 -4.106,-0.992 -8.388,-1.571 -12.762,-1.563 -21.562,0.203 -44.323,12.136 -53.799,44.363 -0.886,4.691 -0.675,8.238 -0.675,12.442 0,63.885 51.791,115.676 115.671,115.676 39.122,0 73.682,-19.439 94.611,-49.169 -11.32,2.821 -22.206,4.17 -31.528,4.199 -3.494,0 -6.774,-0.187 -9.811,-0.558"}]
    [:path {:fill "#90b4fe"
            :d "m 159.658,175.953 c 0.714,0.354 2.333,0.932 4.586,1.571 15.157,-11.127 25.007,-29.05 25.046,-49.307 l -0.006,0 c -0.057,-33.771 -27.386,-61.096 -61.165,-61.163 -6.714,0.013 -13.164,1.121 -19.203,3.122 12.419,14.156 18.391,34.386 24.168,56.515 0.003,0.01 0.008,0.018 0.01,0.026 0.011,0.018 1.848,6.145 5.002,14.274 3.132,8.118 7.594,18.168 12.46,25.492 3.195,4.908 6.709,8.435 9.102,9.47"}]
    [:path {:fill "#5881d8"
            :d "m 128.122,12.541 c -38.744,0 -73.016,19.073 -94.008,48.318 10.925,-6.842 22.08,-9.31 31.815,-9.222 13.446,0.039 24.017,4.208 29.089,7.06 1.225,0.706 2.388,1.466 3.527,2.247 9.05,-3.986 19.05,-6.215 29.574,-6.215 40.589,0.005 73.493,32.899 73.499,73.488 l -0.006,0 c 0,20.464 -8.37,38.967 -21.863,52.291 3.312,0.371 6.844,0.602 10.451,0.584 12.811,0.006 26.658,-2.821 37.039,-11.552 6.769,-5.702 12.44,-14.051 15.585,-26.569 0.615,-4.835 0.969,-9.75 0.969,-14.752 0,-63.882 -51.786,-115.678 -115.671,-115.678"}]]])

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

    ;; `bg-white` explícito. Estas tres secciones NO tenían fondo propio: caían
    ;; sobre el panel gris de la página, que no es la hoja blanca para la que se
    ;; escribió este CV. Medido antes del arreglo: la fecha daba 1.22 de
    ;; contraste, el cargo 3.32 y la descripción 3.64 — los tres reprobaban AA.
    ;;
    ;; `bg-white` es la pieza correcta y no `bg-panel-*` porque app.css YA la
    ;; mapea a grafito-900 en oscuro (ADR-012), así que la superficie queda bien
    ;; en los dos temas sin escribir un solo `dark:` acá. Esa es la razón de que
    ;; el CV deje de romperse en cada cambio de tema: el texto ya no depende de
    ;; qué color tenga la página debajo.
    [:div.bg-white.relative.overflow-hidden
     ;; Watermark en el ancho completo de la sección, no dentro de la columna:
     ;; así en escritorio queda en el margen, fuera de la columna de fechas.
     [clojure-watermark]
     [:div.relative
      {:class "max-w-4xl mx-auto px-6 py-16"}
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
       [:span.text-2xl "⚡"]
       [:h3.text-sm.font-semibold.text-gray-800 "Colegio Luis Cruz Martínez"]]
      [:p.text-xs.text-indigo-600.mb-2 "2026 · Iquique, Chile"]
      [:p.text-sm.text-gray-600
       "Profesor de Electrónica en educación media técnico-profesional."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "∫"]
       [:h3.text-sm.font-semibold.text-gray-800 "CPech — Preuniversitario"]]
      [:p.text-xs.text-indigo-600.mb-2 "2018 – 2026 · Iquique, Chile"]
      [:p.text-sm.text-gray-600
       "Profesor de Ciencias: Matemática y Física para preparación de la PAES."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "🎓"]
       [:h3.text-sm.font-semibold.text-gray-800 "Universidad Arturo Prat"]]
      [:p.text-xs.text-indigo-600.mb-2 "2024 – 2025 · Iquique, Chile"]
      [:p.text-sm.text-gray-600
       "Docente de Matemáticas Preuniversitario y diseño de plataforma digital de tutorías
        para la comunidad universitaria. Proyecto de Desarrollo Institucional UAP2393."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "🏛"]
       [:h3.text-sm.font-semibold.text-gray-800 "UNEXPO — Ayudante Docente"]]
      [:p.text-xs.text-indigo-600.mb-2 "2004 – 2008 · Venezuela"]
      [:p.text-sm.text-gray-600
       "Enseñanza de cálculo diferencial e integral a estudiantes de primer semestre de ingeniería.
        Sesiones prácticas, atención de dudas y refuerzo de contenidos fundamentales."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "📐"]
       [:h3.text-sm.font-semibold.text-gray-800 "Educación Media — Física"]]
      [:p.text-xs.text-indigo-600.mb-2 "2009 · Venezuela"]
      [:p.text-sm.text-gray-600
       "Mecánica clásica y electromagnetismo a nivel secundario. Planificación curricular
        y diseño de instrumentos de evaluación."]]

     [:div.bg-white.rounded-2xl.border.border-indigo-100.shadow-sm.p-6
      [:div.flex.items-center.gap-3.mb-3
       [:span.text-2xl "🌐"]
       [:h3.text-sm.font-semibold.text-gray-800 "Tutoría Online Internacional"]]
      [:p.text-xs.text-indigo-600.mb-2 "2015 – Presente"]
      [:p.text-sm.text-gray-600
       "Clases y asesorías en Matemáticas, Física, Electrónica y Programación para estudiantes
        universitarios de múltiples países, en español e inglés. Diagnóstico conceptual y pedagogía adaptativa."]]]]])


;; ─────────────────────────────────────────
;; Sección HABILIDADES
;; ─────────────────────────────────────────

(defn habilidades []
  ;; bg-white explícito: ver la nota en `experiencia`.
  [:div.bg-white
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
                           "Modelamiento matemático" "LaTeX"]}]]]])


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
  ;; bg-white explícito: ver la nota en `experiencia`.
  [:div.bg-white
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
        [:p.text-xs.text-gray-500.mt-1.leading-relaxed desc]]])]]])


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
  ;; Ancho completo. Hubo un momento en que esto fue `max-w-5xl` para dejar
  ;; margen a dos pilares decorativos; los pilares se quitaron y el ancho
  ;; reducido se fue con ellos, porque sin ellos era un marco sin función.
  ;;
  ;; `bg-panel-*` queda como color base de la página aunque cada sección traiga
  ;; el suyo: es la red de seguridad si alguna vez una queda transparente
  ;; —que es exactamente el fallo que tenían `experiencia`, `habilidades` y
  ;; `reconocimientos`, y que costó 52 textos por debajo de AA.
  [:div.font-sans.bg-panel-300.dark:bg-panel-800
   [hero]
   [stats]
   [experiencia]
   [docencia]
   [habilidades]
   [educacion]
   [reconocimientos]
   #_[intereses]])
