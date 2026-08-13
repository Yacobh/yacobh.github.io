#!/usr/bin/env python3
"""Verifica el contraste WCAG de la paleta de marca (ADR-020).

POR QUÉ EXISTE
--------------
T-41 ("mejorar la paleta oscura") vivió meses sin poder cerrarse porque no
tenía criterio: "se ve mejor" no es verificable y no sobrevive a la siguiente
opinión. Esto le pone un número. Si un cambio de paleta baja un par por debajo
del umbral, el script lo dice antes de que lo vea un estudiante.

UMBRALES (WCAG 2.1)
-------------------
  4.5  AA  texto normal          ← el que se exige acá
  3.0  AA  texto grande (≥18.7px o ≥14px en negrita) y objetos gráficos
  7.0  AAA texto normal

QUÉ NO CUBRE
------------
Solo los pares de la paleta de marca, escritos a mano abajo. No inspecciona el
DOM ni descubre combinaciones nuevas: si se inventa un par nuevo en un
componente, hay que agregarlo a la lista. Es un contrato explícito, no un
análisis automático.

USO
---
    python3 scripts/audit_contraste.py     # sale 1 si algún par falla su umbral
"""

import sys

# Espejo de `tailwind.config.js`. Si cambia allá, cambia acá — igual que el
# espejo entre `universo.irt.fluency/default-thresholds` y la migración 041.
TINTA = {
    "50": "#F2F5FA", "100": "#E2E8F2", "200": "#C6D2E5", "300": "#9DB0D0",
    "400": "#6E87B4", "500": "#4C6699", "600": "#3A4F7A", "700": "#2A3B5C",
    "800": "#1B2A4A", "900": "#141F38", "950": "#0E1524",
}
ACENTO = {
    "50": "#FDF8F1", "100": "#F9EDDC", "200": "#F2D9B6", "300": "#E7BF87",
    "400": "#D9A25C", "500": "#C9873A", "600": "#A96C2C", "700": "#855224",
    "800": "#5F3B1B", "900": "#3E2712", "950": "#24160A",
}
PERGAMINO = {"50": "#FBF7F0", "100": "#F4EEE2", "200": "#EBE3D3", "300": "#DCD1BA"}
BLANCO = "#FFFFFF"

# (descripción, frente, fondo, umbral)
# Umbral 3.0 = objeto gráfico o texto grande; 4.5 = texto normal.
PARES = [
    ("claro · texto principal",        TINTA["800"],  PERGAMINO["100"], 4.5),
    ("claro · texto secundario",       TINTA["600"],  PERGAMINO["100"], 4.5),
    ("claro · botón de marca",         BLANCO,        TINTA["600"],     4.5),
    ("claro · botón hover",            BLANCO,        TINTA["700"],     4.5),
    ("claro · énfasis sobre tarjeta",  TINTA["700"],  BLANCO,           4.5),
    ("claro · acento como texto",      ACENTO["700"], PERGAMINO["100"], 4.5),
    ("claro · medalla (relleno)",      ACENTO["600"], PERGAMINO["100"], 3.0),

    ("oscuro · texto base",            TINTA["100"],  TINTA["950"],     4.5),
    ("oscuro · texto en tarjeta",      TINTA["100"],  TINTA["900"],     4.5),
    ("oscuro · texto suave",           TINTA["200"],  TINTA["900"],     4.5),
    ("oscuro · acento de marca",       TINTA["300"],  TINTA["900"],     4.5),
    ("oscuro · medalla (relleno)",     ACENTO["400"], TINTA["900"],     3.0),
    ("oscuro · medalla sobre página",  ACENTO["300"], TINTA["950"],     3.0),
    ("oscuro · campo de formulario",   TINTA["50"],   TINTA["800"],     4.5),
    ("oscuro · botón de marca",        BLANCO,        TINTA["600"],     4.5),
]

# Combinación prohibida, documentada como tal para que nadie la reinvente:
# el ocre medio sobre papel da 2.81 y no alcanza ni para objeto gráfico. En
# tema claro el acento se usa en 600 (relleno) o 700 (texto), nunca en 500.
PROHIBIDOS = [("acento-500 como texto sobre pergamino", ACENTO["500"], PERGAMINO["100"])]


def _lineal(canal):
    c = canal / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def luminancia(hexa):
    h = hexa.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * _lineal(r) + 0.7152 * _lineal(g) + 0.0722 * _lineal(b)


def contraste(frente, fondo):
    a, b = luminancia(frente), luminancia(fondo)
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)


def main():
    print(f"{'par':34} {'ratio':>6} {'exige':>6}   estado")
    print("-" * 62)
    fallas = []
    for nombre, frente, fondo, umbral in PARES:
        r = contraste(frente, fondo)
        ok = r >= umbral
        extra = " AAA" if r >= 7 else ""
        print(f"{nombre:34} {r:6.2f} {umbral:6.1f}   {'✓' if ok else '✗ FALLA'}{extra}")
        if not ok:
            fallas.append((nombre, r, umbral))

    print()
    for nombre, frente, fondo in PROHIBIDOS:
        r = contraste(frente, fondo)
        print(f"· prohibido a propósito: {nombre} = {r:.2f}")

    if fallas:
        print(f"\n✗ {len(fallas)} par(es) por debajo del umbral:")
        for nombre, r, umbral in fallas:
            print(f"    {nombre}: {r:.2f} < {umbral}")
        return 1

    print(f"\n✓ Los {len(PARES)} pares de la paleta cumplen su umbral WCAG.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
