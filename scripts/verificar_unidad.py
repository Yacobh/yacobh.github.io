#!/usr/bin/env python3
"""Verifica una unidad de contenido antes de que llegue a la base.

El séptimo auditor del repo. `verificar_items.py` mira los ítems de una tanda;
éste mira **la unidad entera**: módulo, banda, historia, prerrequisitos, ideas
erróneas, recursos y test_config, más los lugares del cliente que ninguna
migración toca.

Existe por un defecto concreto y medido (2026-09-17): el eje de probabilidad se
dio de alta con su migración perfecta, sus 102 ítems verificados y los seis
auditores en verde — y **nadie agregó sus seis slugs a
`universo.topics/module-slugs`**, que es un `def` literal en el cliente. La
cadena, verificada en el código:

    crud/question-select-cols trae module_id pero NO module_slug
      -> profile/module-slug-for cae a topics/module-slug-for
      -> "probabilidad" no está en el set -> nil
      -> déficit = "unknown/probabilidad"
      -> plan/resources-for-deficits no cruza -> {:kind :general}

Los 102 ítems no pueden producir un plan personalizado. Nada falló. Nada avisó.

El mismo modo de fallo, encontrado el 2026-09-18 **dentro del mapa que existe
para prevenirlo**: el mapa listaba `historical_blurb` y no las tres columnas que
`042` agregó para poder mostrarlo (`historical_year`, `historical_era`,
`historical_figure`). `timeline/milestones` descarta el módulo sin año, en
silencio, y la unidad nunca aparece en la línea del tiempo.

Uso:
    python3 scripts/verificar_unidad.py contenido/unidades/enteros.json
    python3 scripts/verificar_unidad.py contenido/unidades/*.json

Sale con código 1 si algo falla. Es un trinquete, igual que los `audit_*.py`.
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent

SLUG_MISCONCEPTION_RE = re.compile(r"^[a-z0-9]+([-/][a-z0-9]+)*$")  # check de 027
# Los slugs reales usan las dos convenciones y conviven desde `002`:
# `aritmetica/operaciones_fundamentales` (guion bajo) y
# `probabilidad/tendencia-central` (guion). Aceptar solo una da un falso
# positivo sobre módulos que ya están en producción.
SLUG_MODULO_RE = re.compile(r"^[a-z0-9]+(?:[-_][a-z0-9]+)*/[a-z0-9]+(?:[-_][a-z0-9]+)*$")
TIPOS_RECURSO = {"text", "video_url", "audio_url", "pdf_url", "exercise"}

THETA_MIN, THETA_MAX = -3.0, 3.0
ANCHO_TRAMO = 1.0
MIN_POR_TRAMO = 6

# Espejo de `universo.bands/product-tracks` (bands.cljs). Un track fuera de este
# set no recibe banda derivada, y por eso puede entrar SIN recompilar el bundle
# — siempre que todos sus módulos traigan banda explícita (CLAUDE.md §4).
PRODUCT_TRACKS = {"aritmetica", "algebra", "geometria", "probabilidad"}


class Informe:
    def __init__(self):
        self.errores = []
        self.avisos = []

    def error(self, donde, msg):
        self.errores.append((donde, msg))

    def aviso(self, donde, msg):
        self.avisos.append((donde, msg))

    @property
    def ok(self):
        return not self.errores


def _num(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool)


def _campos(d):
    """Las claves reales: las que empiezan con `_` son comentarios del molde."""
    return {k: v for k, v in d.items() if not k.startswith("_")}


# ---------------------------------------------------------------------------
# Lo que el cliente sabe. Se LEE del código, no se copia acá: un espejo escrito
# de memoria repite la suposición en vez de contradecirla (L-59).
# ---------------------------------------------------------------------------

def slugs_conocidos_por_el_cliente():
    """Los slugs del `def module-slugs` de src/universo/topics.cljs.

    Devuelve (set, ruta) o (None, ruta) si no se pudo leer — en cuyo caso el
    chequeo se degrada a aviso en vez de fallar: es mejor un auditor que avisa
    que no puede mirar, que uno que da verde por no haber mirado.
    """
    ruta = RAIZ / "src" / "universo" / "topics.cljs"
    try:
        texto = ruta.read_text(encoding="utf-8")
    except OSError:
        return None, ruta
    m = re.search(r"\(def\s+module-slugs\s*(.*?)\)\s*\n", texto, re.S)
    if not m:
        return None, ruta
    return set(re.findall(r'"([^"]+)"', m.group(1))), ruta


def tracks_del_check_sql():
    """Los tracks admitidos por `modules_track_check`, leídos de la última
    migración que lo (re)define."""
    mig = sorted((RAIZ / "supabase" / "migrations").glob("*.sql"))
    tracks, origen = None, None
    for ruta in mig:
        try:
            texto = ruta.read_text(encoding="utf-8")
        except OSError:
            continue
        for m in re.finditer(
            r"add\s+constraint\s+modules_track_check\s+check\s*\(\s*track\s+in\s*\(([^)]*)\)",
            texto, re.I | re.S,
        ):
            encontrados = set(re.findall(r"'([^']+)'", m.group(1)))
            if encontrados:
                tracks, origen = encontrados, ruta.name
    return tracks, origen


# Espejo del `case` de `universo.timeline/eras`, que a su vez es espejo del check
# de 042. Solo para nombrar la era esperada en el mensaje de error; el
# vocabulario y los cortes se LEEN del SQL, igual que los tracks.
_RANGO_RE = re.compile(
    r"historical_era\s*=\s*'([a-z]+)'\s*and\s*historical_year\s*"
    r"(?:<=\s*(-?\d+)|between\s*(-?\d+)\s*and\s*(-?\d+)|>=\s*(-?\d+))",
    re.I | re.S,
)


def eras_del_check_sql():
    """El vocabulario de `historical_era` y los cortes año ↔ era, leídos de la
    migración que los define (`042`).

    Se leen y no se copian por la misma razón que `tracks_del_check_sql`: un
    espejo escrito de memoria repite la suposición en vez de contradecirla
    (L-59). Los cortes son convenciones —lo dice la propia migración—, así que
    copiarlos acá sería fijarlos dos veces y que una de las dos envejezca.

    Devuelve `({era: (desde, hasta)}, origen)` con `None` en los extremos
    abiertos, o `(None, None)` si no se pudo leer.
    """
    mig = sorted((RAIZ / "supabase" / "migrations").glob("*.sql"))
    vocabulario, rangos, origen = None, {}, None
    for ruta in mig:
        try:
            texto = ruta.read_text(encoding="utf-8")
        except OSError:
            continue
        for m in re.finditer(
            r"add\s+constraint\s+modules_historical_era_valida\s+check\s*\((.*?)\)\s*;",
            texto, re.I | re.S,
        ):
            encontrados = set(re.findall(r"'([a-z]+)'", m.group(1)))
            if encontrados:
                vocabulario, origen = encontrados, ruta.name
        for m in re.finditer(
            r"add\s+constraint\s+modules_historical_era_coherente\s+check\s*\((.*?)\)\s*;",
            texto, re.I | re.S,
        ):
            encontrados = {}
            for era, hasta, desde_e, hasta_e, desde in _RANGO_RE.findall(m.group(1)):
                if hasta:
                    encontrados[era] = (None, int(hasta))
                elif desde_e and hasta_e:
                    encontrados[era] = (int(desde_e), int(hasta_e))
                elif desde:
                    encontrados[era] = (int(desde), None)
            if encontrados:
                rangos, origen = encontrados, ruta.name
    if vocabulario is None:
        return None, None
    # Una era admitida por el vocabulario y sin rango declarado queda abierta:
    # el check no la contradice, así que este auditor tampoco.
    return {e: rangos.get(e, (None, None)) for e in vocabulario}, origen


def era_esperada(year, eras):
    """La era que le corresponde a un año según los cortes leídos del SQL."""
    for era, (desde, hasta) in eras.items():
        if (desde is None or year >= desde) and (hasta is None or year <= hasta):
            return era
    return None


# ---------------------------------------------------------------------------
# Chequeos
# ---------------------------------------------------------------------------

def revisar_identidad(u, inf):
    slug = u.get("slug")
    if not slug or not isinstance(slug, str):
        inf.error("slug", "falta `slug`, y es la clave que usa todo lo demás")
        return
    if not SLUG_MODULO_RE.match(slug):
        inf.error("slug", f"«{slug}» no tiene forma `track/nombre` en minúsculas y sin acentos")
    if not u.get("title"):
        inf.error("title", "falta `title` (es `not null` en modules)")

    track = u.get("track")
    if not track:
        inf.error("track", "falta `track`")
    elif slug and "/" in slug and slug.split("/")[0] != track:
        inf.error("track", f"`track` = «{track}» no coincide con el prefijo del slug «{slug}»")

    if not isinstance(u.get("order_index"), int):
        inf.error("order_index", "falta `order_index` entero (dejá huecos de 10 en 10)")

    # A2 del mapa: el único lugar que falla ruidosamente, pero solo EN LA BASE.
    if track:
        admitidos, origen = tracks_del_check_sql()
        if admitidos is None:
            inf.aviso("track", "no se pudo leer `modules_track_check` de las migraciones")
        elif track not in admitidos:
            if u.get("track_nuevo"):
                inf.aviso(
                    "track",
                    f"track nuevo «{track}»: la migración DEBE dropear y recrear "
                    f"`modules_track_check` (hoy admite {sorted(admitidos)}, según {origen}) "
                    "— si no, el insert falla con 23514. Ver A2 del mapa",
                )
            else:
                inf.error(
                    "track",
                    f"«{track}» no está en `modules_track_check` ({origen}) y `track_nuevo` "
                    "es false. O es un track nuevo y hay que declararlo, o el track está mal escrito",
                )
        if u.get("track_nuevo") and track in PRODUCT_TRACKS:
            inf.aviso(
                "track",
                f"«{track}» está en `bands/product-tracks`: agregarlo MUEVE las bandas "
                "derivadas de los 26 módulos del producto. Con banda explícita en todos "
                "sus módulos, un track entra sin tocar ese `def` ni recompilar",
            )


def revisar_banda(u, inf):
    banda = _campos(u.get("banda") or {})
    lo, hi = banda.get("min"), banda.get("max")
    if not _num(lo) or not _num(hi):
        inf.error("banda", "falta `banda.min` / `banda.max`. SIEMPRE explícitas: sin ellas "
                           "la unidad cae en el reparto derivado y mueve las bandas de todas las demás (A3)")
        return None
    if lo < THETA_MIN or hi > THETA_MAX:
        inf.error("banda", f"[{lo}, {hi}] se sale de [{THETA_MIN}, {THETA_MAX}], que es donde vive θ")
    if lo >= hi:
        inf.error("banda", f"`min` ({lo}) debe ser menor que `max` ({hi})")
        return None

    ancho = hi - lo
    if ancho < 0.8:
        inf.aviso("banda", f"ancho {ancho:.2f} logits: muy angosta. Las bandas se solapan a "
                           "propósito, y una angosta deja huecos por donde el test no encuentra qué servir")
    if ancho > 3.0:
        inf.aviso("banda", f"ancho {ancho:.2f} logits: muy ancha. Pide {int(ancho * MIN_POR_TRAMO)} "
                           "ítems solo para cubrirla sin huecos")

    objetivo = u.get("items_objetivo")
    minimo = max(MIN_POR_TRAMO, int(round(ancho / ANCHO_TRAMO * MIN_POR_TRAMO)))
    if not isinstance(objetivo, int):
        inf.error("items_objetivo", f"falta `items_objetivo` (mínimo {minimo} para esta banda)")
    elif objetivo < minimo:
        inf.error(
            "items_objetivo",
            f"{objetivo} ítems para una banda de {ancho:.2f} logits deja tramos con menos de "
            f"{MIN_POR_TRAMO}: hacen falta ~{minimo}. Un tramo vacío es un test que para por :exhausted",
        )
    return banda


def revisar_historia(u, inf):
    """A10 del mapa: las cuatro columnas de `042`, y la línea del tiempo.

    Ninguna es `not null`, así que la unidad entra igual —y queda **fuera de la
    línea del tiempo sin que nada avise**. `timeline/milestones` lo dice en una
    línea: «Un módulo sin año queda fuera». Es el mismo modo de fallo que B1, y
    se escapó del mapa hasta el 2026-09-18: el mapa listaba `historical_blurb`
    y no las tres columnas que `042` agregó para poder mostrarlo.
    """
    if "historia" not in u:
        inf.error(
            "historia",
            "falta el bloque `historia`. Las cuatro columnas de `042` son nullable a "
            "propósito —inventarle una fecha a un módulo es peor que dejarlo fuera— pero "
            "la decisión SÍ es obligatoria. Sin año, `timeline/milestones` descarta la "
            "unidad y el estudiante nunca la ve en la línea del tiempo. Nada falla, nada avisa",
        )
        return

    h = _campos(u.get("historia") or {})
    year = h.get("year")
    era = h.get("era")
    blurb = (h.get("blurb") or "").strip()
    figure = (h.get("figure") or "").strip()

    if year is None:
        if not (h.get("sin_year_porque") or "").strip():
            inf.error(
                "historia.year",
                "`year` es null y no hay `sin_year_porque`. Quedar fuera de la línea del "
                "tiempo es válido —042 dejó la columna nullable justamente para eso—, pero "
                "tiene que ser una decisión dicha y no un campo que nadie llenó",
            )
        else:
            inf.aviso(
                "historia.year",
                "sin año: la unidad NO va a aparecer en la línea del tiempo del tablero. "
                "Está dicho, así que pasa",
            )
        if blurb:
            inf.aviso(
                "historia.blurb",
                "hay `blurb` pero no `year`: hoy el blurb solo se lee desde la línea del "
                "tiempo (`timeline/milestone-of`), así que no lo va a ver nadie",
            )
        return

    if not isinstance(year, int) or isinstance(year, bool):
        inf.error("historia.year", f"«{year}» no es un entero. Negativo = a.C. (042 eligió "
                                   "entero sobre `date` porque estas fechas no tienen día ni mes)")
        return
    if year == 0:
        inf.aviso("historia.year", "no existe el año 0 en la convención a.C./d.C.: "
                                   "el check del SQL lo acepta, pero probablemente sea un error")

    eras, origen = eras_del_check_sql()
    if eras is None:
        inf.aviso("historia.era", "no se pudo leer `modules_historical_era_valida` de las "
                                  "migraciones: verificá la era a mano contra 042")
    elif era is None:
        esperada = era_esperada(year, eras)
        inf.aviso(
            "historia.era",
            f"sin `era`. El cliente la deriva del año (`timeline/era-of` daría «{esperada}»), "
            "pero 042 la guarda a propósito: el criterio de corte vive en el dato, no en el "
            "código. Dejarla null mueve esa decisión al cliente",
        )
    elif era not in eras:
        inf.error(
            "historia.era",
            f"«{era}» no está en `modules_historical_era_valida` ({origen}, admite "
            f"{sorted(eras)}). El insert falla con 23514",
        )
    else:
        esperada = era_esperada(year, eras)
        if esperada and esperada != era:
            desde, hasta = eras[era]
            rango = f"[{desde if desde is not None else '…'}, {hasta if hasta is not None else '…'}]"
            inf.error(
                "historia.era",
                f"el año {year} no cae en «{era}» {rango}: le corresponde «{esperada}». "
                f"Lo impide `modules_historical_era_coherente` ({origen}) con un 23514",
            )

    if not blurb:
        inf.error(
            "historia.blurb",
            "hay `year` pero no `blurb`: la unidad entra a la línea del tiempo como un hito "
            "sin nada que contar. El blurb ES el contenido de la línea — 042 existe porque "
            "había 35 módulos con blurb escrito que nadie veía",
        )
    if not figure:
        inf.aviso(
            "historia.figure",
            "sin `figure`. Es la persona u obra a la que se atribuye el hito y se muestra "
            "al estudiante (comentario de la columna en 042); además es el lugar donde "
            "colgarían los personajes si se hace T-139",
        )


def revisar_camino(u, inf):
    slug = u.get("slug")
    prereqs = u.get("prerrequisitos") or []
    if not isinstance(prereqs, list):
        inf.error("prerrequisitos", "debe ser una lista")
        return
    if not prereqs:
        inf.aviso("prerrequisitos", "sin prerrequisitos: la unidad es una puerta de entrada. "
                                    "Si no lo es, el «no sé resolverlo» del estudiante no tiene a dónde ir (ADR-029)")

    vistos = set()
    for i, p in enumerate(prereqs):
        p = _campos(p if isinstance(p, dict) else {})
        donde = f"prerrequisitos[{i}]"
        ps = p.get("prerequisite_slug")
        if not ps:
            inf.error(donde, "falta `prerequisite_slug`")
            continue
        if not SLUG_MODULO_RE.match(ps):
            inf.error(donde, f"«{ps}» no tiene forma `track/nombre`")
        if ps == slug:
            inf.error(donde, "una unidad no es prerrequisito de sí misma (check de 045)")
        if ps in vistos:
            inf.error(donde, f"«{ps}» declarado dos veces")
        vistos.add(ps)

        fuerza = p.get("strength")
        if fuerza not in ("duro", "blando"):
            inf.error(donde, f"`strength` debe ser 'duro' o 'blando', no «{fuerza}». "
                             "Sin la distinción el grafo se vuelve una maraña donde todo depende de todo")
        if not (p.get("rationale") or "").strip():
            inf.error(donde, "falta `rationale`: es PARA EL PROFESOR, y es lo que evita "
                             "un grafo lleno de aristas que nadie recuerda haber decidido")

    habilita = u.get("habilita") or []
    if not isinstance(habilita, list):
        inf.error("habilita", "debe ser una lista")
        return
    if not habilita:
        inf.aviso("habilita", "no habilita ninguna unidad: es un callejón sin salida. "
                              "El alta casi siempre agrega DOS aristas, no una")
    # Ciclo corto: A exige B y a la vez dice que habilita a B.
    for h in habilita:
        if h in vistos:
            inf.error("habilita", f"«{h}» es prerrequisito de esta unidad Y está en `habilita`: "
                                  "es un ciclo. 045 impide A→A pero no A→B→A")
        if h == slug:
            inf.error("habilita", "no se habilita a sí misma")


def revisar_error_y_material(u, inf):
    mcs = u.get("misconceptions") or []
    if not isinstance(mcs, list):
        inf.error("misconceptions", "debe ser una lista")
        return
    if not mcs and not (u.get("misconceptions_preexistentes") or []):
        inf.error("misconceptions", "ninguna idea errónea: el mapa de errores no va a decir "
                                    "nada de esta unidad, y el mapa de errores ES el producto. "
                                    "Es el modo de fallo silencioso de 064")

    recursos = u.get("recursos") or []
    claves_recurso = set()
    for i, r in enumerate(recursos):
        r = _campos(r if isinstance(r, dict) else {})
        donde = f"recursos[{i}]"
        clave = r.get("clave")
        if not clave:
            inf.error(donde, "falta `clave` (interna del JSON, para que las misconceptions le apunten)")
        elif clave in claves_recurso:
            inf.error(donde, f"`clave` «{clave}» repetida")
        else:
            claves_recurso.add(clave)
        if r.get("type") not in TIPOS_RECURSO:
            inf.error(donde, f"`type` = «{r.get('type')}» no está en el CHECK de 001 ({sorted(TIPOS_RECURSO)})")
        if not (r.get("title") or "").strip():
            inf.error(donde, "falta `title` (es `not null`)")
        if r.get("published") is not True:
            inf.aviso(donde, "`published` no es true: la policy `resources_select_published` "
                             "lo esconde SIN AVISAR y nadie lo va a ver")

    slugs_mc = set()
    for i, mc in enumerate(mcs):
        mc = _campos(mc if isinstance(mc, dict) else {})
        donde = f"misconceptions[{i}]"
        s = mc.get("slug")
        if not s:
            inf.error(donde, "falta `slug`")
        else:
            if not SLUG_MISCONCEPTION_RE.match(s):
                inf.error(donde, f"«{s}» no cumple el check de 027 "
                                 "(minúsculas, dígitos, `-` o `/`, sin acentos ni espacios)")
            if s in slugs_mc:
                inf.error(donde, f"slug «{s}» repetido")
            slugs_mc.add(s)
        if not (mc.get("name") or "").strip():
            inf.error(donde, "falta `name` (prosa PARA EL PROFESOR — el estudiante lee questions.error_*)")
        desc = (mc.get("description") or "").strip()
        if not desc:
            inf.error(donde, "falta `description`: es el criterio de cuándo SÍ y cuándo NO, "
                             "y es lo único que impide un catálogo de duplicados con nombres distintos")
        elif " no " not in f" {desc.lower()} ":
            inf.aviso(donde, "la `description` no dice cuándo NO usarla. Los duplicados del "
                             "catálogo entran justo por ahí")

        refs = mc.get("recursos") or []
        if not refs:
            inf.error(donde, "sin recurso que la ataque: la capa 1 de «Mi plan» queda genérica "
                             "POR ESTRUCTURA, no por falta de contenido (A8, T-54)")
        for ref in refs:
            if ref not in claves_recurso:
                inf.error(donde, f"apunta al recurso «{ref}», que no está en `recursos`")

    huerfanos = claves_recurso - {r for mc in mcs for r in (_campos(mc).get("recursos") or [])}
    for h in sorted(huerfanos):
        inf.aviso("recursos", f"«{h}» no lo referencia ninguna idea errónea: va a llegar solo "
                              "por módulo, que es la capa genérica")


def revisar_test_config(u, inf):
    if "rendible" not in u:
        inf.error("rendible", "falta `rendible`. Decidido el 2026-09-17: toda unidad nueva nace "
                              "rendible (el eje queda de ubicador y el módulo es un test corto). "
                              "`false` es válido, pero tiene que ser una decisión dicha")
        return
    if not u.get("rendible"):
        inf.aviso("rendible",
                  "`false`: la unidad se rinde dentro del test de su eje. Es el estado heredado de "
                  "las 26 unidades de hoy, no el objetivo — el módulo rendible es lo decidido")
        if (u.get("test_config") or {}).get("topic"):
            inf.aviso("test_config", "`rendible` es false pero hay `topic`: se va a ignorar")
        return

    # Junta 1 del esquema: `next_question` filtra `where q.topic = p_topic` y NO
    # por módulo, así que hoy un test_configs de módulo serviría los ítems del
    # eje entero. No es un error del JSON: es una precondición de arquitectura.
    inf.aviso("rendible",
              "unidad rendible: `next_question` filtra por `topic` y NO por módulo, así que este "
              "test_config NO se puede aplicar hasta ADR-038 (ver las-tablas-y-su-sentido.md §5). "
              "Dejá la migración de test_configs escrita y SIN aplicar, anotada como ⏳ en SCHEMA.md. "
              "El resto de la unidad entra igual y sirve desde el primer día")

    tc = _campos(u.get("test_config") or {})
    if not tc.get("topic"):
        inf.error("test_config.topic", "unidad rendible sin `topic`: los ítems existen y NO LLEGAN "
                                       "A NADIE. Medido: 414 ítems inalcanzables hasta que 059 los creó (T-125)")
    if not tc.get("display_name"):
        inf.error("test_config.display_name", "falta: es lo que el estudiante ve en el selector (T-138)")

    mn, mx = tc.get("min_items"), tc.get("max_items")
    if not isinstance(mn, int) or mn <= 0:
        inf.error("test_config.min_items", "debe ser un entero > 0")
    if not isinstance(mx, int) or (isinstance(mn, int) and mx < mn):
        inf.error("test_config.max_items", "debe ser un entero >= min_items")

    se = tc.get("se_threshold")
    if _num(se) and se <= 0:
        inf.error("test_config.se_threshold", "debe ser > 0")
    elif _num(se) and _num(mx) and se < 0.7 and mx <= 12:
        inf.aviso("test_config.se_threshold",
                  f"{se} con max_items = {mx} NO SE DISPARA NUNCA: con el motor v2 el piso del SE "
                  f"es ~0,73 con 12 ítems, y {'peor' if mx < 12 else 'ese mismo'} con {mx}. "
                  "0 de 17 tests reales pararon por precisión (T-111, R-38)")

    if tc.get("prerequisite_topic") is None:
        inf.aviso("test_config.prerequisite_topic",
                  "null = diagnóstico ABIERTO A TODO EL MUNDO. Así entraron los ~14 bancos muertos "
                  "que hoy ensucian el selector: 16 de 40 tests el 2026-09-10 (T-122, T-143)")
    else:
        mt = tc.get("min_theta")
        if mt is None:
            inf.aviso("test_config.min_theta",
                      "null: basta HABER RENDIDO el prerrequisito, no haber alcanzado nada. "
                      "Es el estado de los cuatro ejes hoy. Que sea una decisión dicha, no un default heredado")
        elif not _num(mt) or not (THETA_MIN <= mt <= THETA_MAX):
            inf.error("test_config.min_theta", f"debe estar entre {THETA_MIN} y {THETA_MAX} (check de 020)")

    if tc.get("active") is not True:
        inf.aviso("test_config.active",
                  "false: solo lo ven los admin. `test_configs_select` (020) no admite un estado "
                  "intermedio — no hay «visible para este estudiante». Eso es T-129")


def revisar_cliente(u, inf):
    """B1 del mapa: el lugar por el que se cayó probabilidad."""
    slug = u.get("slug")
    if not slug:
        return
    conocidos, ruta = slugs_conocidos_por_el_cliente()
    rel = ruta.relative_to(RAIZ) if ruta.is_relative_to(RAIZ) else ruta
    if conocidos is None:
        inf.aviso("cliente", f"no se pudo leer `module-slugs` de {rel}: verificá B1 a mano")
        return
    if slug not in conocidos:
        inf.error(
            "cliente",
            f"«{slug}» NO está en `module-slugs` de {rel} ({len(conocidos)} slugs). "
            "Sin eso: question-select-cols no trae module_slug -> profile/module-slug-for "
            "devuelve nil -> el déficit sale como `unknown/<topic>` -> «Mi plan» NO PUEDE "
            "personalizarse. Es exactamente lo que le pasa hoy a los 102 ítems de probabilidad. "
            "Agregalo, corré `npx shadow-cljs release app` y commiteá public/js/app.js (ADR-003)",
        )


def revisar_justificacion(u, inf):
    j = _campos(u.get("justificacion") or {})
    hueco = (j.get("hueco_medido") or "").strip()
    if not hueco:
        inf.error("justificacion.hueco_medido",
                  "falta. La respuesta válida sale de una consulta, no de una intuición. "
                  "R-30 es el riesgo dominante del proyecto: más producto y cero clientes")
    elif len(hueco) < 25 or not re.search(r"\d", hueco):
        inf.aviso("justificacion.hueco_medido",
                  "no menciona ningún número: «para completar el eje» no es una justificación")
    if not (j.get("quien_revisa") or "").strip():
        inf.aviso("justificacion.quien_revisa",
                  "sin revisor: el cuello de botella es la revisión humana, no la redacción. "
                  "Ya hay 402 ítems activos sin revisar delante de estudiantes. Decilo en la entrega")

    for r in (u.get("reemplaza") or []):
        inf.aviso("reemplaza", f"«{r}»: la migración debe apagarlo con `active = false` en "
                               "questions Y en test_configs. NUNCA delete — el histórico de tests "
                               "es evidencia y universo.access lo usa para desbloquear")


def revisar_unidad(u, inf):
    u = _campos(u)
    revisar_identidad(u, inf)
    revisar_banda(u, inf)
    revisar_historia(u, inf)
    revisar_camino(u, inf)
    revisar_error_y_material(u, inf)
    revisar_test_config(u, inf)
    revisar_cliente(u, inf)
    revisar_justificacion(u, inf)

    for q in (u.get("preguntas_abiertas") or []):
        inf.aviso("preguntas_abiertas",
                  f"{q} — va a project-memory/OPEN_QUESTIONS.md con su Q- y se menciona en la entrega")


def main(rutas):
    fallo = False
    for arg in rutas:
        ruta = Path(arg)
        inf = Informe()
        try:
            datos = json.loads(ruta.read_text(encoding="utf-8"))
        except OSError as e:
            print(f"✗ {arg}: no se pudo leer ({e})")
            fallo = True
            continue
        except json.JSONDecodeError as e:
            print(f"✗ {arg}: JSON inválido ({e})")
            fallo = True
            continue

        revisar_unidad(datos, inf)

        nombre = datos.get("slug") or ruta.name
        if inf.ok:
            print(f"✓ {nombre} — {len(inf.avisos)} aviso(s)")
        else:
            print(f"✗ {nombre} — {len(inf.errores)} error(es), {len(inf.avisos)} aviso(s)")
            fallo = True
        for donde, msg in inf.errores:
            print(f"    ERROR  [{donde}] {msg}")
        for donde, msg in inf.avisos:
            print(f"    aviso  [{donde}] {msg}")
        print()

    if fallo:
        print("Hay errores. La unidad no entra hasta que estén corregidos.")
        print("Mapa completo: .claude/skills/unidad-de-contenido/referencias/mapa-de-la-unidad.md")
    return 1 if fallo else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(2)
    sys.exit(main(sys.argv[1:]))
