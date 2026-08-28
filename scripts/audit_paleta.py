#!/usr/bin/env python3
"""Un color nuevo sale de la paleta, o el sitio deja de ser uno solo (ADR-033).

POR QUÉ EXISTE
--------------
El diagnóstico decía "correcto" con `bg-green-50` y "incorrecto" con `bg-red-50`:
verdes y rojos **de fábrica** de Tailwind, dentro de una pantalla construida con
la paleta Braun. El owner lo vio enseguida —"el verde no compagina con los
colores del tema"— y la pregunta que hizo es la que este script contesta:

    ¿cómo hacemos para acordarnos de que lo que entra tiene que mantener el
    estilo del sitio?

No se hace acordándose. Los otros tres auditores ya habían pasado por ese código
en verde: `audit_contraste.py` mira los pares que alguien **declaró**,
`audit_dark_theme.py` mira que cada clase tenga mapeo oscuro, `audit_movil.py`
mira tamaños. Ninguno pregunta si el color **pertenece al sistema**. Este sí.

CÓMO FUNCIONA — línea base con trinquete
----------------------------------------
Hay 190 usos de color de fábrica repartidos por la app, herencia de antes de
ADR-022. Fallar por todos ellos volvería el script ruido que nadie corre. En vez
de eso guarda una **línea base** por archivo y falla solo si:

  · aparece color de fábrica en un archivo que no lo tenía, o
  · un archivo supera su número.

O sea: la deuda vieja se ve y no molesta; la deuda nueva no entra. Cuando un
archivo baja, el script lo dice y pide bajar la línea base, para que el trinquete
no se pueda aflojar sin querer.

QUÉ NO CUENTA
-------------
  · `indigo-*`: está **remapeado a grafito** en `tailwind.config.js`. Es
    vocabulario heredado que ya renderiza neutro (ver la cabecera del config).
  · grises y neutros (`gray`, `slate`, `stone`, `zinc`, `neutral`, `white`,
    `black`): son la escala del sistema y los cubre `audit_dark_theme.py`.
  · las líneas de comentario, para poder documentar en el código lo que se sacó.

USO
---
    python3 scripts/audit_paleta.py            # sale 1 si entró color nuevo
    python3 scripts/audit_paleta.py --detalle  # además, dónde está cada uso
"""

import glob
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPONENTES = os.path.join(RAIZ, "src", "universo", "**", "*.cljs")

# Familias cromáticas de fábrica. `indigo` NO está: el config lo remapea a
# grafito, así que un `bg-indigo-600` heredado ya sale gris.
FABRICA = ("red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|"
           "violet|purple|fuchsia|pink|rose")
UTILIDAD = ("bg|text|border|ring|divide|placeholder|from|to|via|fill|stroke|"
            "outline|shadow|accent|caret|decoration")
PATRON = re.compile(rf"\b(?:{UTILIDAD})-(?:{FABRICA})-\d{{2,3}}(?:/\d+)?\b")

# Pantallas del embudo (mismo criterio que audit_movil.py): lo que ve un
# estudiante. Su deuda es la que más pesa, y por eso se lista primero.
EMBUDO = {
    "landing.cljs", "login.cljs", "diagnostic_test.cljs", "feedback_modal.cljs",
    "test_editor.cljs", "campos.cljs", "dashboard.cljs", "plan.cljs",
    "slots.cljs", "cuenta.cljs", "timeline.cljs", "guestbook.cljs",
    "contacto.cljs", "home.cljs", "ui.cljs", "irt_chart.cljs", "privacidad.cljs",
    "resume.cljs",
}

# Fuera del bundle: `universo.core` no los alcanza (misma lista que
# audit_dark_theme.py). No pueden romper nada que un usuario vea.
ARCHIVADOS = {
    "mathacademy.cljs", "improved_math_academy.cljs", "supabase_test.cljs",
    "tailwind.cljs", "jardin.cljs", "particulas.cljs", "physics.cljs",
    "voz.cljs", "animations.cljs", "battery.cljs", "test_subs.cljs", "user.cljs",
}

# ── LÍNEA BASE ───────────────────────────────────────────────────────────────
# Medida el 2026-08-24, después de pasar el diagnóstico a la paleta (ADR-033).
# Un número solo puede BAJAR. Si sube, el script falla; si baja, avisa para que
# se corrija acá mismo. La deuda del embudo está registrada en BACKLOG T-100.
BASE = {
    "admin.cljs": 45,
    "improved_math_academy.cljs": 28,
    "dashboard.cljs": 22,
    "slots.cljs": 18,
    "admin_questions.cljs": 18,
    "mathacademy.cljs": 17,
    "admin_misconceptions.cljs": 17,
    "plan.cljs": 12,
    "diagnostic_test.cljs": 9,
    "cuenta.cljs": 9,
    "guestbook.cljs": 7,
    "tailwind.cljs": 5,
    "login.cljs": 4,
    "contacto.cljs": 4,
    "admin_test_configs.cljs": 4,
    "landing.cljs": 3,
    "admin_catalog.cljs": 3,
    "ui.cljs": 2,
    "resume.cljs": 2,
}


def usos(texto):
    """Ocurrencias de color de fábrica, ignorando líneas de comentario."""
    encontrados = []
    for n, linea in enumerate(texto.splitlines(), start=1):
        if linea.lstrip().startswith(";;"):
            continue
        for m in PATRON.findall(linea):
            encontrados.append((n, m))
    return encontrados


def categoria(nombre):
    if nombre in ARCHIVADOS:
        return "archivado"
    if nombre in EMBUDO:
        return "embudo"
    return "admin"


def main():
    detalle = "--detalle" in sys.argv
    actual = {}
    donde = {}
    for ruta in sorted(glob.glob(COMPONENTES, recursive=True)):
        nombre = os.path.basename(ruta)
        with open(ruta, encoding="utf-8") as f:
            hits = usos(f.read())
        if hits:
            actual[nombre] = len(hits)
            donde[nombre] = hits

    nuevos = []   # archivos que no tenían y ahora sí
    subidas = []  # archivos que superan su línea base
    bajadas = []  # archivos que mejoraron: hay que actualizar la base

    for nombre, n in sorted(actual.items(), key=lambda kv: -kv[1]):
        base = BASE.get(nombre)
        if base is None:
            nuevos.append((nombre, n))
        elif n > base:
            subidas.append((nombre, base, n))
        elif n < base:
            bajadas.append((nombre, base, n))

    total = sum(actual.values())
    por_cat = {"embudo": 0, "admin": 0, "archivado": 0}
    for nombre, n in actual.items():
        por_cat[categoria(nombre)] += n

    print(f"Usos de color fuera de la paleta: {total}")
    print(f"  · embudo (lo que ve un estudiante): {por_cat['embudo']}")
    print(f"  · panel de administración:          {por_cat['admin']}")
    print(f"  · fuera del bundle:                 {por_cat['archivado']}")

    if detalle:
        for nombre, hits in sorted(donde.items()):
            print(f"\n  {nombre} ({categoria(nombre)})")
            for n, clase in hits:
                print(f"    :{n}  {clase}")

    if bajadas:
        print("\n✓ Bajó la deuda — actualiza BASE en este archivo:")
        for nombre, base, n in bajadas:
            print(f"    \"{nombre}\": {n},   (antes {base})")

    if nuevos or subidas:
        print("\n✗ Entró color que no es de la paleta.")
        for nombre, n in nuevos:
            print(f"    {nombre}: {n} uso(s), y este archivo no tenía ninguno")
        for nombre, base, n in subidas:
            print(f"    {nombre}: {n} usos, la línea base es {base}")
        print("\n  La paleta del proyecto es grafito · senal · panel · led · alarma")
        print("  (tailwind.config.js). Para estado usa el diodo — `.led`/`.led--alarma`")
        print("  dentro de un `.alojamiento` — y para «algo está mal», `alarma-700`.")
        print("  Si de verdad hace falta un color nuevo: agrégalo al config, mapéalo")
        print("  en src/css/app.css y declara su par en scripts/audit_contraste.py.")
        return 1

    print("\n✓ Ningún color nuevo fuera de la paleta.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
