(ns universo.components.tailwind)

(defn app []
  [:div.min-h-screen.bg-gray-100
   [:div.container.mx-auto.p-8
    [:h1.text-4xl.font-bold.text-center.text-blue-600
     "¡Tailwind CSS está funcionando!"]
    [:p.text-center.mt-4.text-gray-700
     "Si puedes ver los estilos, todo está configurado correctamente."]
    [:div.mt-8.flex.justify-center.gap-4
     [:button.bg-blue-500.text-white.px-4.py-2.rounded.hover:bg-blue-600
      "Botón de prueba"]
     [:button.bg-green-500.text-white.px-4.py-2.rounded.hover:bg-green-600
      "Otro botón"]]]])
