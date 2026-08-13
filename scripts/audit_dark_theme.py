#!/usr/bin/env python3
"""Audita la cobertura del tema oscuro (ADR-012).

POR QUÉ EXISTE
--------------
El tema oscuro no se implementó anotando `dark:` en cada elemento, sino
remapeando en `src/css/app.css` el vocabulario de color que los componentes ya
usaban (ADR-012). Eso cubre ~15 componentes sin tocarlos, pero tiene un modo de
fallo silencioso que el propio ADR anticipó como riesgo:

    "Un componente nuevo usa una clase de color no mapeada y queda sin tema
     oscuro, sin aviso."

Sin aviso es la parte cara. Nadie compila mal, ningún test falla: simplemente
un texto queda negro sobre fondo oscuro y se descubre cuando un usuario lo ve.
Este script convierte ese riesgo en una comprobación que se puede correr.

QUÉ MIRA, Y QUÉ NO
------------------
Dos cosas, y la segunda se agregó porque un bug real se escapó por ahí:

1. **Texto oscuro sin mapear** (`text-*` de tono ≥ 600): queda negro sobre una
   superficie que sí se oscureció.
2. **Fondo claro sin mapear** (`bg-*` de tono ≤ 200): se queda claro en tema
   oscuro mientras el texto encima sí se mapea a casi blanco. Eso fue
   exactamente `bg-senal-50` en la pestaña Apariencia del panel — un durazno
   claro con letras blancas encima, ilegible (T-72). La versión anterior de
   este script no lo veía porque solo miraba el texto, y el texto estaba bien.

Los fondos saturados (`bg-indigo-600`, `bg-green-600`, los gradientes de marca)
se dejan intactos a propósito según ADR-012: ya contrastan bien sobre oscuro y
mapearlos sería el error contrario. Por eso el corte está en 200: por encima de
ese tono el fondo ya es medio u oscuro y se defiende solo.

LÍMITE CONOCIDO
---------------
Esto no puede ver el fallo por herencia: un elemento SIN ninguna clase de color
que hereda el negro del navegador. Ese caso se resuelve con la regla
`.dark body { color: ... }` de `app.css`, no con este audit — un análisis
estático de clases no encuentra lo que no está escrito. Si esa regla se borra,
el script sigue dando verde y la app vuelve a romperse: por eso la regla lleva
su propio comentario extenso en `app.css`.

USO
---
    python3 scripts/audit_dark_theme.py          # reporta y sale 1 si hay fallas
    python3 scripts/audit_dark_theme.py --todas  # incluye fondos y bordes (informativo)

Salida 0 = sin texto oscuro ni fondo claro sin mapear.
"""

import glob
import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(RAIZ, "src", "css", "app.css")
COMPONENTES = os.path.join(RAIZ, "src", "universo", "**", "*.cljs")

PALETA = (
    "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|"
    "teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose"
)

# Clases de color tal como aparecen escritas en el markup de Reagent, con sus
# variantes de estado. El `/\d+` final captura las opacidades (bg-white/70).
CLASE = re.compile(
    r"\b((?:hover:|focus:|focus-visible:|group-hover:)?"
    r"(?:text|bg|border|divide|ring|placeholder)-"
    r"(?:(?:" + PALETA + r")-\d{2,3}|black|white)"
    r"(?:/\d+)?)"
)

# Componentes fuera del bundle: no los alcanza `universo.core`, así que no
# pueden romper nada que un usuario vea. Se listan aparte en vez de ignorarlos
# en silencio, para que quede claro por qué no cuentan (ARCHITECTURE §2.6).
ARCHIVADOS = {
    "mathacademy.cljs",
    "improved_math_academy.cljs",
    "supabase_test.cljs",
    "tailwind.cljs",
    "jardin.cljs",
    "particulas.cljs",
    "physics.cljs",
    "voz.cljs",
    "animations.cljs",
    "battery.cljs",
    "test_subs.cljs",
    "user.cljs",
}


PSEUDOS = (":hover", ":focus-visible", ":focus", "::placeholder")


def clases_mapeadas(css):
    """Clases que `app.css` remapea bajo `.dark`.

    Dos detalles del formato de Tailwind que hay que deshacer para poder
    comparar contra el markup: la variante va escapada en el selector
    (`.hover\\:text-gray-900:hover`) y termina con la pseudo-clase real. Se
    quita la pseudo del final y se desescapan las barras.
    """
    mapeadas = set()
    for selector in re.findall(r"\.dark\s+\.([^\s,{]+)", css):
        for pseudo in PSEUDOS:
            if selector.endswith(pseudo):
                selector = selector[: -len(pseudo)]
                break
        mapeadas.add(selector.replace("\\", ""))
    return mapeadas


def tono(clase):
    """Número de tono de una clase de color, o None si no lo tiene."""
    m = re.search(r"-(\d{2,3})(?:/\d+)?$", clase)
    return int(m.group(1)) if m else None


def main():
    todas = "--todas" in sys.argv

    if not os.path.exists(CSS):
        print(f"✗ No encuentro {CSS}", file=sys.stderr)
        return 2

    mapeadas = clases_mapeadas(open(CSS, encoding="utf-8").read())

    usadas = {}
    for ruta in glob.glob(COMPONENTES, recursive=True):
        archivo = os.path.basename(ruta)
        contenido = open(ruta, encoding="utf-8").read()
        for clase in CLASE.findall(contenido):
            usadas.setdefault(clase, set()).add(archivo)

    faltantes = []
    for clase, archivos in usadas.items():
        if clase in mapeadas:
            continue
        base = clase.split(":")[-1]
        es_texto = base.startswith(("text-", "placeholder-"))
        # Qué cuenta como riesgo real: solo el texto OSCURO (tono ≥ 600) y el
        # negro. Un `text-indigo-200` sin mapear no es un bug — es texto claro
        # que vive sobre un fondo saturado que a propósito no cambia en modo
        # oscuro (el hero, la nav, el footer). Mapearlo rompería el contraste
        # en vez de arreglarlo, así que exigirlo convertiría este audit en
        # ruido, y un chequeo ruidoso se termina ignorando.
        es_fondo = base.startswith("bg-")
        t = tono(base)
        # Texto oscuro: se vuelve invisible sobre superficie oscura.
        riesgo_texto = es_texto and (base.endswith("-black") or (t is not None and t >= 600))
        # Fondo claro: se queda claro y el texto encima (que sí se mapea) queda
        # blanco sobre blanco. `bg-white` ya está mapeado; el peligro son los
        # tintes 50–200 de cualquier familia.
        riesgo_fondo = es_fondo and (t is not None and t <= 200)
        riesgo = riesgo_texto or riesgo_fondo
        if riesgo or todas:
            faltantes.append((clase, sorted(archivos), riesgo))

    activos = [f for f in faltantes if f[2] and not set(f[1]) <= ARCHIVADOS]
    archivados = [f for f in faltantes if f[2] and set(f[1]) <= ARCHIVADOS]

    print(f"Clases de color en componentes: {len(usadas)}")
    print(f"Clases mapeadas en app.css:     {len(mapeadas)}")

    if archivados:
        print(f"\n○ Sin mapear, pero solo en componentes fuera del bundle "
              f"({len(archivados)}):")
        for clase, archivos, _ in sorted(archivados):
            print(f"    {clase:32} {', '.join(archivos)}")

    if todas:
        otros = [f for f in faltantes if not f[2]]
        if otros:
            print(f"\n· Sin mapear y sin riesgo ({len(otros)}) — informativo. "
                  f"Fondos saturados y texto claro sobre ellos: ADR-012 los "
                  f"deja intactos a propósito:")
            for clase, archivos, _ in sorted(otros):
                print(f"    {clase:32} {', '.join(archivos[:4])}")

    if activos:
        print(f"\n✗ SIN MAPEAR en componentes alcanzables ({len(activos)}) — "
              f"texto oscuro (≥600) o fondo claro (≤200):")
        for clase, archivos, _ in sorted(activos):
            print(f"    {clase:32} {', '.join(archivos)}")
        print("\n  Agregar la regla en src/css/app.css (mapeo centralizado, "
              "no `dark:` suelto — ADR-012).")
        return 1

    print("\n✓ Sin texto oscuro ni fondo claro sin mapear en componentes alcanzables.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
