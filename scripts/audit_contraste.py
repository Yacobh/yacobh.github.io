#!/usr/bin/env python3
"""Verifica el contraste WCAG de la paleta de marca (ADR-022).

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
GRAFITO = {
    "50": "#FAFAF8", "100": "#F2F0EB", "200": "#E7E4DD", "300": "#D3CFC6",
    "400": "#A8A49B", "500": "#7D7A72", "600": "#5C5A54", "700": "#423F3B",
    "800": "#2E2C29", "900": "#1D1D1B", "950": "#121211",
}
SENAL = {
    "50": "#FDF0E9", "100": "#FADCCB", "200": "#F5B99B", "300": "#F0956B",
    "400": "#EE7A45", "500": "#E85D0D", "600": "#C74C0A", "700": "#9E3C08",
    "800": "#762D06", "900": "#4E1E04",
}
PANEL = {
    "50": "#E4E4E1", "100": "#D6D6D2", "200": "#C5C5C1", "300": "#B5B4B0",
    "400": "#9E9E9A", "500": "#7A7A76", "600": "#565652", "700": "#3A3A37",
    "800": "#2B2B28", "900": "#1F1F1D", "950": "#151513",
}
LED = {"300": "#7BF2DA", "400": "#4CEBCC", "500": "#2EE6C5", "600": "#16C79A", "700": "#0E9E7A"}
BLANCO = "#FFFFFF"

# (descripción, frente, fondo, umbral)
# Umbral 3.0 = objeto gráfico o texto grande; 4.5 = texto normal.
PARES = [
    ("claro · texto principal",        GRAFITO["900"], GRAFITO["100"], 4.5),
    ("claro · texto secundario",       GRAFITO["600"], GRAFITO["100"], 4.5),
    ("claro · acción principal",       GRAFITO["900"], SENAL["500"],   4.5),
    ("claro · acción principal hover", BLANCO,         SENAL["600"],   4.5),
    ("claro · botón secundario",       BLANCO,         GRAFITO["800"], 4.5),
    ("claro · señal como texto",       SENAL["700"],   GRAFITO["100"], 4.5),
    ("claro · medalla (relleno)",      SENAL["500"],   GRAFITO["100"], 3.0),
    ("claro · borde funcional",        GRAFITO["500"], GRAFITO["100"], 3.0),
    ("claro · anillo de foco",         SENAL["600"],   GRAFITO["100"], 3.0),

    ("oscuro · texto principal",       GRAFITO["100"], GRAFITO["950"], 4.5),
    ("oscuro · texto en tarjeta",      GRAFITO["100"], GRAFITO["900"], 4.5),
    ("oscuro · texto secundario",      GRAFITO["400"], GRAFITO["950"], 4.5),
    ("oscuro · señal como texto",      SENAL["400"],   GRAFITO["950"], 4.5),
    ("oscuro · medalla (relleno)",     SENAL["500"],   GRAFITO["950"], 3.0),
    ("oscuro · anillo de foco",        SENAL["600"],   GRAFITO["950"], 3.0),
    ("oscuro · campo de formulario",   GRAFITO["50"],  GRAFITO["800"], 4.5),

    # Panel de instrumento (ADR-023). La regla que ordena todo esto: el LED
    # SOLO existe dentro de un alojamiento oscuro. Sobre el panel claro da 1.04
    # y sería invisible — por eso no hay ningún par "led sobre panel".
    ("panel · texto principal",        GRAFITO["900"], PANEL["300"],   4.5),
    ("panel · texto secundario",       GRAFITO["700"], PANEL["300"],   4.5),
    ("panel · etiqueta grabada",       PANEL["700"],   PANEL["300"],   4.5),
    ("panel · borde de control",       PANEL["600"],   PANEL["300"],   3.0),
    ("alojamiento · LED encendido",    LED["500"],     PANEL["700"],   3.0),
    ("alojamiento · LED oro",          LED["400"],     PANEL["700"],   3.0),
    ("alojamiento · LED bronce",       LED["700"],     PANEL["700"],   3.0),
    ("alojamiento · año descubierto",  LED["300"],     PANEL["700"],   4.5),
    ("alojamiento · año apagado",      PANEL["300"],   PANEL["700"],   4.5),
    ("panel oscuro · texto principal", GRAFITO["50"],  PANEL["800"],   4.5),
    ("panel oscuro · etiqueta",        PANEL["400"],   PANEL["800"],   4.5),
]

# Combinaciones prohibidas, documentadas para que nadie las reinvente.
PROHIBIDOS = [
    # La trampa del naranja Braun: el reflejo es poner texto blanco encima.
    # Reprueba AA. Con grafito-900 da 4.83, y además es lo que hacía Braun.
    ("blanco sobre el naranja de la señal", BLANCO, SENAL["500"]),
    # Por qué el LED necesita alojamiento y no se puede poner suelto:
    ("LED sobre el panel claro (sin alojamiento)", LED["500"], PANEL["300"]),
]


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
