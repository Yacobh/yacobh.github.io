#!/usr/bin/env python3
"""Audita la adaptación a teléfonos de las pantallas del estudiante.

POR QUÉ EXISTE
--------------
El proyecto ya tenía dos chequeos de color (`audit_dark_theme.py`,
`audit_contraste.py`) y **ninguno de tamaño**. Al revisar antes de mergear
aparecieron cuatro problemas que ninguno de los dos podía ver, y el peor estaba
justo en lo recién construido: los hitos de la línea del tiempo eran botones de
~34 px de alto alrededor de un punto de 10 px — la interacción principal de esa
función era la peor adaptada a un teléfono.

Vale la pena decir el sesgo que lo produjo: se diseña mirando una pantalla
grande. Nada avisa cuando algo no entra en 360 px, porque en el monitor entra.

QUÉ MIRA
--------
1. **Objetivos táctiles** menores a 44 px de alto (`py-1`, `py-1.5` sin
   `min-h`). Es el mínimo recomendado por WCAG 2.5.5; por debajo de 24 px se
   incumple además el criterio AA 2.5.8.
2. **Padding fijo grande** (`p-8` sin variante `sm:`): en 360 px se come 64 px
   de ancho útil, casi un quinto de la pantalla.
3. **Texto menor a 12 px** declarado con valor arbitrario (`text-[10px]`).
4. **Tablas sin contenedor scrollable**: desbordan el `body` y hacen que la
   página entera se mueva de lado.
5. **Anchos fijos en píxeles** mayores al ancho de un teléfono chico.

QUÉ NO MIRA
-----------
No abre un navegador ni mide el DOM: es análisis estático de clases. No ve
solapamientos, ni un `fixed` que tape contenido, ni si algo se lee **bien**.
Igual que con el contraste: sirve para decir cuándo algo está mal, no cuándo
está bien. Eso lo dice mirar el teléfono.

Solo audita las pantallas que ve un estudiante. El panel de administración se
usa desde un escritorio y se lista aparte, como contexto.

USO
---
    python3 scripts/audit_movil.py           # sale 1 si hay problemas en el embudo
    python3 scripts/audit_movil.py --admin   # incluye el panel de administración
"""

import glob
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTES = os.path.join(RAIZ, "src", "universo", "**", "*.cljs")

# Las pantallas del embudo: lo que ve un estudiante, casi siempre en el teléfono.
EMBUDO = {
    "landing.cljs", "login.cljs", "diagnostic_test.cljs", "feedback_modal.cljs",
    "dashboard.cljs", "plan.cljs", "slots.cljs", "cuenta.cljs", "timeline.cljs",
    "guestbook.cljs", "contacto.cljs", "home.cljs", "ui.cljs", "irt_chart.cljs",
    "privacidad.cljs",
}

ADMIN = {"admin.cljs", "admin_questions.cljs", "admin_test_configs.cljs"}

ANCHO_TELEFONO = 360


def revisar(texto):
    """Devuelve la lista de problemas de un archivo."""
    problemas = []

    # 1. Objetivo táctil: py-1/py-1.5/py-0.5 en un botón, sin min-h que lo salve.
    #
    # Se mira la ventana entera del botón y NO el primer literal de texto. La
    # primera versión hacía lo segundo y tenía un falso negativo silencioso:
    # en `[:button {:type "button" :class "..."}]` capturaba `"button"` —el
    # valor de :type— y daba por buenas todas las pantallas del panel de
    # administración, que usan justamente esa forma. Un chequeo que no
    # encuentra nada es indistinguible de uno que funciona; por eso este script
    # se prueba con casos conocidos antes de creerle.
    for m in re.finditer(r':button', texto):
        ventana = texto[m.start():m.start() + 400]
        # Cortar en el siguiente botón para no invadir el vecino.
        siguiente = ventana.find(":button", 7)
        if siguiente > 0:
            ventana = ventana[:siguiente]
        chico = re.search(r'\bpy-(?:0\.5|1|1\.5)\b', ventana)
        if chico and "min-h" not in ventana:
            problemas.append(("táctil", f"botón con {chico.group(0)} y sin min-h"))

    # 2. Padding fijo sin variante responsiva.
    for m in re.finditer(r'\bp-(8|10|12)\b', texto):
        # Si el mismo atributo trae una variante sm:, ya está resuelto.
        ventana = texto[max(0, m.start() - 120):m.start() + 60]
        if not re.search(r'sm:p-', ventana):
            problemas.append(("padding", f"p-{m.group(1)} sin variante sm:"))

    # 3. Texto diminuto.
    for m in set(re.findall(r'text-\[(\d+)px\]', texto)):
        if int(m) < 12:
            problemas.append(("texto", f"text-[{m}px] — ilegible en pantalla chica"))

    # 4. Tabla sin contenedor scrollable.
    for m in re.finditer(r'\[:table', texto):
        ctx = texto[max(0, m.start() - 400):m.start()]
        if "overflow-x-auto" not in ctx and "overflow-auto" not in ctx:
            problemas.append(("tabla", "tabla sin contenedor overflow-x-auto"))

    # 5. Ancho fijo mayor que un teléfono chico.
    for m in re.finditer(r'\b(?:w|min-w)-\[(\d+)px\]', texto):
        if int(m.group(1)) > ANCHO_TELEFONO:
            problemas.append(("ancho", f"{m.group(0)} — más ancho que {ANCHO_TELEFONO}px"))

    return problemas


def main():
    incluir_admin = "--admin" in sys.argv

    hallazgos = {}
    admin_hallazgos = {}
    for ruta in sorted(glob.glob(COMPONENTES, recursive=True)):
        nombre = os.path.basename(ruta)
        if nombre not in EMBUDO and nombre not in ADMIN:
            continue
        problemas = revisar(open(ruta, encoding="utf-8").read())
        if not problemas:
            continue
        if nombre in ADMIN:
            admin_hallazgos[nombre] = problemas
        else:
            hallazgos[nombre] = problemas

    print("Pantallas del estudiante auditadas:", len(EMBUDO))

    if admin_hallazgos:
        total = sum(len(v) for v in admin_hallazgos.values())
        print(f"\n○ Panel de administración ({total}) — informativo: se usa desde")
        print("  un escritorio, así que no bloquea. Vale arreglarlo igual algún día.")
        for archivo, problemas in sorted(admin_hallazgos.items()):
            for tipo, detalle in sorted(set(problemas))[:3]:
                print(f"    {archivo:26} [{tipo}] {detalle}")

    if hallazgos:
        total = sum(len(v) for v in hallazgos.values())
        print(f"\n✗ PROBLEMAS EN EL EMBUDO ({total}):")
        for archivo, problemas in sorted(hallazgos.items()):
            for tipo, detalle in sorted(set(problemas)):
                print(f"    {archivo:26} [{tipo}] {detalle}")
        print("\n  El embudo se usa desde el teléfono: acá sí bloquea.")
        return 1

    print("\n✓ Sin problemas de adaptación en las pantallas del estudiante.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
