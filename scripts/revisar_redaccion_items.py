#!/usr/bin/env python3
"""Octavo auditor: la REDACCIÓN de los ítems, no su estructura.

`verificar_items.py` comprueba que el banco **pueda entrar**: clave repartida,
una sola correcta, las cuatro explicaciones escritas, LaTeX con escape simple,
cobertura sin huecos. Todo eso es estructura.

Este script mira lo que queda, y que hasta ahora solo veía un humano releyendo:

  · el «Bonus» de la correcta (ADR-033) **no puede hablar de un error** — quien
    lo lee acertó, y decirle «te equivocaste» es el defecto más caro posible;
  · ningún distractor puede decir «Correcto»;
  · **la correcta no puede ser la más larga**, que es un atajo para acertar sin
    leer (familia de R-35);
  · dos alternativas con el mismo texto son un ítem sin respuesta única, aunque
    `correct_option` apunte a una sola;
  · las **convenciones de notación** del track (supabase/CONTENT.md): decimal
    con coma, y el vocabulario que el owner decidió.

⚠️ **Lo que este script NO puede hacer, y hay que decirlo:** no verifica que la
cuenta esté bien. Un ítem cuya alternativa correcta dice «alrededor de 50 ohm»
cuando el resultado es 20 pasa los ocho auditores. Eso lo encontró releer, y es
exactamente el defecto que apareció escribiendo el banco de electrónica el
2026-09-20. **La revisión humana sigue siendo el cuello de botella.**

Uso:
    python3 scripts/revisar_redaccion_items.py contenido/items/*.json
    python3 scripts/revisar_redaccion_items.py --track electronica contenido/items/electronica_*.json
"""
import json
import re
import sys
from pathlib import Path

LETRAS = ("A", "B", "C", "D")

# Vocabulario decidido por track (supabase/CONTENT.md §Convenciones de notación).
# Se comprueba solo donde hay una decisión escrita: inventar una para un track
# que no la tiene sería el auditor imponiendo criterio editorial.
VOCABULARIO = {
    "electronica": [
        (r"\bvoltaje\b", "«voltaje» → «tensión» (convención del track, CONTENT.md)"),
        (r"\bintensidad\b", "«intensidad» → «corriente» (convención del track, CONTENT.md)"),
    ],
}

# Un decimal con punto entre dígitos, fuera de LaTeX. La convención del banco es
# la coma (chilena, y la del DEMRE).
DECIMAL_CON_PUNTO = re.compile(r"(?<!\d\$)(?<![\w/.])\d+\.\d+(?![\w.])")


class Informe:
    def __init__(self):
        self.errores = []
        self.avisos = []

    def error(self, donde, msg):
        self.errores.append((donde, msg))

    def aviso(self, donde, msg):
        self.avisos.append((donde, msg))


def _sin_latex(texto):
    """El texto fuera de los `$…$`, que es donde aplican las convenciones de prosa."""
    return re.sub(r"\$[^$]*\$", " ", texto or "")


def revisar_item(item, idx, track, inf):
    donde = f"ítem {idx + 1} (order_index {item.get('order_index', '?')})"
    correcta = str(item.get("correct", "")).strip().upper()
    opciones = item.get("options") or {}
    errores = item.get("errors") or {}

    # ── El Bonus de la correcta no habla de errores (ADR-033) ────────────────
    bonus = str(errores.get(correcta, ""))
    if bonus and not re.match(r"^\s*correcto\b", bonus, re.I):
        inf.error(donde, f"la explicación de la correcta ({correcta}) no empieza con «Correcto». "
                         f"Es el Bonus de ADR-033: confirma y cierra el razonamiento")
    for patron, que in ((r"\bte equivocaste\b", "«te equivocaste»"),
                        (r"\berror\b", "la palabra «error»"),
                        (r"\bmal\b", "«mal»")):
        if re.search(patron, bonus, re.I):
            inf.error(donde, f"el Bonus de la correcta ({correcta}) dice {que}. "
                             f"Quien lo lee ACERTÓ: el Bonus no habla de ningún error")

    # ── Ningún distractor se presenta como correcto ──────────────────────────
    for L in LETRAS:
        if L == correcta:
            continue
        if re.match(r"^\s*correcto\b", str(errores.get(L, "")), re.I):
            inf.error(donde, f"la explicación de {L} empieza con «Correcto» y {L} no es la correcta")

    # ── La correcta no puede ser la más larga ────────────────────────────────
    # El umbral no es «la más larga» a secas: con alternativas numéricas («5 V»
    # contra «12 V») eso da ruido puro, y con dos enunciados paralelos a
    # propósito —el par serie/paralelo cruzado— la diferencia de 8 caracteres no
    # es un atajo para nadie. Se avisa cuando la ventaja es **material**: al
    # menos 15 caracteres Y un 20 % más que la segunda.
    largos = {L: len(str(opciones.get(L, ""))) for L in LETRAS}
    if largos and correcta in largos:
        ordenados = sorted(largos.values())
        segunda = ordenados[-2] if len(ordenados) > 1 else 0
        ventaja = largos[correcta] - segunda
        if (largos[correcta] == ordenados[-1]
                and ventaja >= 15
                and segunda > 0
                and largos[correcta] >= segunda * 1.2):
            inf.aviso(donde, f"la alternativa correcta ({correcta}) es la más larga por un margen "
                             f"grande ({largos[correcta]} caracteres contra {segunda}). "
                             f"Un patrón de forma es un atajo para acertar sin leer (R-35)")

    # ── Dos alternativas con el mismo texto ──────────────────────────────────
    vistos = {}
    for L in LETRAS:
        txt = re.sub(r"\s+", " ", str(opciones.get(L, ""))).strip().lower()
        if txt and txt in vistos:
            inf.error(donde, f"las alternativas {vistos[txt]} y {L} dicen lo mismo: el ítem no "
                             f"tiene respuesta única aunque `correct` apunte a una sola")
        vistos[txt] = L

    # ── Convenciones de notación ─────────────────────────────────────────────
    textos = [("enunciado", item.get("question", ""))]
    textos += [(f"alternativa {L}", opciones.get(L, "")) for L in LETRAS]
    textos += [(f"explicación {L}", errores.get(L, "")) for L in LETRAS]

    for nombre, txt in textos:
        prosa = _sin_latex(str(txt))
        for patron, msg in VOCABULARIO.get(track, []):
            if re.search(patron, prosa, re.I):
                inf.error(donde, f"{nombre}: {msg}")
        hallado = DECIMAL_CON_PUNTO.findall(prosa)
        if hallado:
            inf.aviso(donde, f"{nombre}: decimal con punto ({', '.join(hallado[:3])}). "
                             f"La convención del banco es la coma")

    # ── El enunciado pregunta algo ───────────────────────────────────────────
    enunciado = str(item.get("question", "")).strip()
    if enunciado and "?" not in enunciado:
        inf.aviso(donde, "el enunciado no tiene signo de interrogación: revisá que esté "
                         "pidiendo algo y no solo describiendo")


def main(rutas, track=None):
    fallo = False
    total = 0
    for ruta in rutas:
        p = Path(ruta)
        datos = json.loads(p.read_text(encoding="utf-8"))
        inf = Informe()
        items = datos.get("items") or []
        total += len(items)
        t = track or str(datos.get("topic", "")).split("_")[0]
        for i, it in enumerate(items):
            revisar_item(it, i, t, inf)

        estado = "✗" if inf.errores else "✓"
        print(f"\n{estado} {p.name} · {len(items)} ítems · "
              f"{len(inf.errores)} error(es) · {len(inf.avisos)} aviso(s)")
        for donde, msg in inf.errores:
            print(f"    error  [{donde}] {msg}")
        for donde, msg in inf.avisos:
            print(f"    aviso  [{donde}] {msg}")
        if inf.errores:
            fallo = True

    print(f"\n{'✗' if fallo else '✓'} {total} ítems revisados.")
    print("⚠️  Este auditor NO verifica que la cuenta esté bien. Eso sigue siendo "
          "revisión humana.")
    return 1 if fallo else 0


if __name__ == "__main__":
    args = sys.argv[1:]
    track = None
    if "--track" in args:
        i = args.index("--track")
        track = args[i + 1]
        args = args[:i] + args[i + 2:]
    if not args:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(args, track))
