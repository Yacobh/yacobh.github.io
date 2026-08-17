#!/usr/bin/env python3
"""Audita los invariantes entre `index.html` y `404.html` (ADR-026, ADR-027).

POR QUÉ EXISTE
--------------
Producción sirve dos documentos HTML y no puede servir menos:

- `index.html` — la raíz. Lleva todo el SEO (meta, Open Graph, JSON-LD) porque
  es la única URL que responde 200.
- `404.html` — el fallback de GitHub Pages, que arranca la SPA en `/plan`,
  `/cupos` y el resto de las rutas del router. Va sin SEO y con `noindex`
  a propósito: se entrega con status HTTP 404.

O sea que **difieren por diseño**, y por eso no se pueden fusionar ni generar
uno del otro sin perder la razón por la que son dos (ADR-026).

Pero hay un subconjunto que **tiene que coincidir o el fallback se rompe en
silencio**: si alguien cambia la ruta del bundle, la versión de KaTeX o el
script que aplica el tema en `index.html` y se olvida de `404.html`, la raíz
sigue funcionando —que es lo que uno prueba— y todas las demás rutas quedan
cargando un archivo viejo, o parpadeando en claro antes de pintar oscuro.

Ese modo de fallo no es hipotético. `public/index.html` era una copia de
`index.html` y **divergió** —se le quedó atrás el `<noscript>`— sin que nadie
lo notara durante meses, exactamente porque en desarrollo se servía la copia y
nunca el original (T-12). ADR-027 eliminó esa copia; este script cubre el par
que queda, que sí es irreducible.

QUÉ MIRA
--------
1. **Script de tema idéntico** — es el que evita el flash de tema claro al
   recargar (ADR-012). Se compara normalizando la indentación, no byte a byte.
2. **Bundle, CSS y manifest resuelven al mismo archivo** — `index.html` usa
   rutas relativas (`./public/…`) y `404.html` absolutas (`/public/…`) porque
   se sirve desde cualquier profundidad de path; lo que se compara es el
   archivo destino, no el texto de la ruta.
3. **Misma versión de KaTeX por CDN** — dos versiones distintas de su CSS
   producen fórmulas que se ven distinto según la ruta por la que se entró.
4. **Mismo juego de favicons y manifest.**
5. **`404.html` lleva `noindex`** — responde 404; ofrecerlo a los buscadores no
   tiene sentido (ADR-026).
6. **Los archivos referenciados existen** en el árbol de trabajo.

QUÉ NO MIRA, A PROPÓSITO
------------------------
El SEO de `index.html` (JSON-LD, Open Graph, `<noscript>` de marketing). No
está en `404.html` y no debe estarlo. Si alguna vez aparece ahí, es un error
distinto: ver ADR-026 §Consecuencias.
"""

import os
import re
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(RAIZ, "index.html")
NOT_FOUND = os.path.join(RAIZ, "404.html")


def leer(ruta):
    with open(ruta, encoding="utf-8") as fh:
        return fh.read()


def resolver(href, doc_dir=RAIZ):
    """Ruta absoluta del archivo al que apunta un href, sea relativo o de raíz.

    `./public/js/app.js` (desde la raíz del repo) y `/public/js/app.js` (desde
    cualquier path del sitio) apuntan al mismo archivo: es eso lo que hay que
    comparar, no el literal.
    """
    if href.startswith("http://") or href.startswith("https://"):
        return href
    limpio = href.lstrip("/") if href.startswith("/") else href
    return os.path.normpath(os.path.join(doc_dir, limpio))


def mostrar(valor):
    """Versión legible de un valor de `assets`: rutas relativas al repo."""
    if isinstance(valor, tuple):
        return ", ".join(mostrar(v) for v in valor)
    texto = str(valor)
    if texto.startswith(RAIZ + os.sep):
        return os.path.relpath(texto, RAIZ)
    return texto


def script_de_tema(html):
    """El IIFE que aplica la clase `dark` antes del primer paint, normalizado."""
    bloques = re.findall(r"<script>(.*?)</script>", html, re.S)
    for bloque in bloques:
        if "localStorage" in bloque and "prefers-color-scheme" in bloque:
            # Se comparan tokens, no formato: la indentación difiere legítimamente.
            return re.sub(r"\s+", " ", bloque).strip()
    return None


def assets(html):
    """{rol → archivo destino} de los recursos que ambos documentos comparten."""
    encontrados = {}

    # Se busca "la hoja de estilos" y "el script con src", no literalmente
    # app.css/app.js: si alguien renombra el artefacto en un documento y no en
    # el otro, eso tiene que reportarse como **discrepancia**, no como "falta".
    css = re.search(r'<link[^>]+href="([^"]+\.css)"[^>]*rel="stylesheet"'
                    r'|<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"', html)
    if css:
        encontrados["css"] = resolver(css.group(1) or css.group(2))

    js = re.search(r'<script[^>]+src="([^"]+\.js)"', html)
    if js:
        encontrados["bundle"] = resolver(js.group(1))

    manifest = re.search(r'<link[^>]+rel="manifest"[^>]+href="([^"]+)"', html)
    if manifest:
        encontrados["manifest"] = resolver(manifest.group(1))

    katex = re.search(r'katex@([0-9.]+)/dist/katex\.min\.css', html)
    if katex:
        encontrados["katex"] = katex.group(1)

    iconos = re.findall(r'<link[^>]+rel="[^"]*icon[^"]*"[^>]+href="([^"]+)"', html)
    if iconos:
        encontrados["iconos"] = tuple(sorted(resolver(i) for i in iconos))

    return encontrados


def main():
    for ruta in (INDEX, NOT_FOUND):
        if not os.path.exists(ruta):
            print(f"✗ Falta {os.path.relpath(ruta, RAIZ)}")
            return 1

    index = leer(INDEX)
    not_found = leer(NOT_FOUND)
    fallos = []

    # 1. Script de tema
    tema_index = script_de_tema(index)
    tema_404 = script_de_tema(not_found)
    if tema_index is None:
        fallos.append("index.html no tiene el script de tema (ADR-012)")
    elif tema_404 is None:
        fallos.append(
            "404.html no tiene el script de tema: las rutas del router "
            "parpadearían en claro antes de pintar oscuro (ADR-012)"
        )
    elif tema_index != tema_404:
        fallos.append(
            "el script de tema difiere entre index.html y 404.html — "
            "es espejo de universo.events.theme y debe ser el mismo"
        )

    # 2-4. Recursos compartidos
    a_index, a_404 = assets(index), assets(not_found)
    etiquetas = {
        "css": "la hoja de estilos",
        "bundle": "el bundle app.js",
        "manifest": "el manifest",
        "katex": "la versión de KaTeX del CDN",
        "iconos": "el juego de favicons",
    }
    for rol, etiqueta in etiquetas.items():
        if rol not in a_index:
            fallos.append(f"index.html no referencia {etiqueta}")
        elif rol not in a_404:
            fallos.append(f"404.html no referencia {etiqueta}")
        elif a_index[rol] != a_404[rol]:
            fallos.append(
                f"{etiqueta} no coincide:\n"
                f"      index.html → {mostrar(a_index[rol])}\n"
                f"      404.html   → {mostrar(a_404[rol])}"
            )

    # 5. noindex en el fallback
    if not re.search(r'<meta[^>]+name="robots"[^>]+noindex', not_found):
        fallos.append(
            "404.html no lleva `noindex`: se entrega con status HTTP 404 y no "
            "tiene sentido ofrecerlo a los buscadores (ADR-026)"
        )

    # 6. Los archivos referenciados existen
    for doc, mapa in (("index.html", a_index), ("404.html", a_404)):
        for rol, valor in mapa.items():
            rutas = valor if isinstance(valor, tuple) else (valor,)
            for ruta in rutas:
                if rol == "katex" or str(ruta).startswith("http"):
                    continue
                if not os.path.exists(ruta):
                    fallos.append(
                        f"{doc} referencia un archivo que no existe: "
                        f"{os.path.relpath(ruta, RAIZ)}"
                    )

    if fallos:
        print(f"✗ {len(fallos)} desincronización(es) entre index.html y 404.html:\n")
        for fallo in fallos:
            print(f"    · {fallo}")
        print(
            "\n  Los dos documentos difieren a propósito en el SEO (ADR-026), "
            "pero no en\n  el arranque: script de tema, bundle, CSS, KaTeX e "
            "iconos deben coincidir."
        )
        return 1

    print("✓ index.html y 404.html arrancan la aplicación igual.")
    print(f"    bundle   {os.path.relpath(a_index['bundle'], RAIZ)}")
    print(f"    css      {os.path.relpath(a_index['css'], RAIZ)}")
    print(f"    katex    {a_index['katex']}")
    print(f"    iconos   {len(a_index['iconos'])} archivos + manifest")
    return 0


if __name__ == "__main__":
    sys.exit(main())
