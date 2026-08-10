-- T-51 (continuación) · Backfill de `module_id` para los topics que `029`
-- dejó fuera.
--
-- ⚠ APLICAR DESPUÉS DE 029.
--
-- POR QUÉ EXISTE: la medición real posterior a `029` (2026-08-10) bajó los
-- ítems sin módulo de 199 a 156, pero mostró que 28 de los que quedaron **sí
-- eran mapeables** y habían fallado por dos motivos concretos:
--
--   1. El topic no se llama igual que el sufijo de su módulo, así que la regla
--      de coincidencia por sufijo de `029` no lo alcanzaba:
--      `sistemas_ecuaciones` → `algebra/sistemas`, `potenciacion` →
--      `aritmetica/potencias`, `numeros_relativos` → `aritmetica/enteros`
--      (Baldor llama "números relativos" a los enteros con signo).
--   2. El topic usa **espacios** en vez de guion bajo (`ecuaciones lineales`,
--      `expresiones algebraicas`, `suma de numeros enteros`), y
--      `normalize_topic()` **no** unifica espacios con guiones bajos — decisión
--      explícita de ADR-017 §Alternativas, tomada cuando todavía no había
--      evidencia de que existieran esos casos.
--
-- ESTA MIGRACIÓN NO CAMBIA ESA DECISIÓN. Solo agrega las equivalencias que
-- faltaban, incluidas las variantes con espacio **listadas una por una**.
-- Fusionar `ecuaciones lineales` con `ecuaciones_lineales` en un solo banco es
-- otra cosa: cambia qué ítems ve un test, la configuración de parada y el
-- historial de desbloqueos, y va aparte (T-51, pendiente de decisión).
--
-- Espejo de `universo.topics/explicit-topic->module-slug`: si se agrega una
-- equivalencia acá, va también allá en el mismo commit.
--
-- Aditiva e idempotente: solo toca filas con `module_id is null`.

with mapeo (topic, slug) as (
  values
    -- Nombre distinto al sufijo del módulo
    ('ecuaciones_simples',       'algebra/ecuaciones'),
    ('sistemas_ecuaciones',      'algebra/sistemas'),
    ('variables_coeficientes',   'algebra/expresiones'),
    ('operaciones_algebraicas',  'algebra/expresiones'),
    ('multiplicacion_monomios',  'algebra/expresiones'),
    ('notacion_algebraica',      'algebra/expresiones'),
    ('numeros_relativos',        'aritmetica/enteros'),
    ('potenciacion',             'aritmetica/potencias'),
    -- Variantes con espacio
    ('ecuaciones lineales',      'algebra/ecuaciones'),
    ('expresiones algebraicas',  'algebra/expresiones'),
    ('suma de numeros enteros',  'aritmetica/enteros')
)
update public.questions q
set module_id = m.id
from mapeo x
join public.modules m on m.slug = x.slug
where q.module_id is null
  and public.normalize_topic(q.topic) = x.topic;

-- -----------------------------------------------------------------------------
-- Lo que queda sin módulo a propósito, y por qué
-- -----------------------------------------------------------------------------
-- Después de esta migración deberían quedar **132** ítems sin `module_id`:
--
--   128  `diagnostico` (84) + `paes_m1` (44) — bancos MEZCLADOS. Asignarles un
--        módulo por su topic sería un dato falso con apariencia de dato bueno.
--        Necesitan clasificación por ítem, que es contenido (ADR-016), no SQL.
--
--     4  Ambigüedades reales que necesitan decisión del profesor, NO un
--        criterio inventado por quien escribe la migración:
--        · `inecuaciones` (2) — no hay módulo de inecuaciones entre los 18 de
--          `002`. O se mapea a `algebra/ecuaciones` aceptando que no es lo
--          mismo, o se crea el módulo.
--        · `ecuaciones cuadraticas` (1) — `algebra/funciones` es "Funciones
--          lineales y cuadráticas", pero una *ecuación* cuadrática no es una
--          *función* cuadrática. Cabe también en `algebra/ecuaciones`.
--        · `operaciones_fundamentales` (1) — en Baldor el término aparece tanto
--          en Aritmética como en Álgebra. Sin ver los ítems no se puede saber.
--
-- Verificación (correr después):
--
--   select topic, count(*) as sin_modulo
--     from public.questions
--    where module_id is null
--    group by topic
--    order by sin_modulo desc;
--
--   select count(*) filter (where module_id is null) as sin_modulo,
--          count(*) as total
--     from public.questions;
