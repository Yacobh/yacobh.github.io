-- 047 — Arreglar los escapes LaTeX dobles del banco de ítems
--
-- Hallazgo del 2026-08-19 (revisión de claves T-105): 76 ítems de `numbers_v1`
-- y `paes_m1` guardan los comandos LaTeX con la barra duplicada —`\\frac`,
-- `\\times`, `\\sqrt`, `20\\%`— porque se cargaron desde una fuente donde la
-- barra ya venía escapada. KaTeX recibe `\\frac` y no lo interpreta: el
-- estudiante ve la barra y el nombre del comando en crudo, igual que pasaba con
-- las alternativas sin delimitadores.
--
-- La regla es deliberadamente estrecha: se colapsa `\\` a `\` **solo** cuando
-- lo sigue una letra o un `%`, es decir cuando forma el nombre de un comando.
-- Un `\\` seguido de otra cosa es un salto de fila legítimo dentro de
-- `\begin{cases}`/`array`, y por eso el ítem 359 —el único con un entorno— se
-- excluye por id en vez de confiar en la expresión regular.
--
-- Ojo con las columnas: `questions` preexiste al esquema versionado (SCHEMA.md §«el esquema no
-- arranca en 001»), y **no tiene `explanation`**. Las columnas de texto son `question`,
-- `option_a..d` y `error_a..d`; el primer intento de esta migración incluyó `explanation` y falló
-- con 42703 en producción.
--
-- Se aplica a mano en el SQL Editor de Supabase, como el resto (CLAUDE.md §9).

begin;

update public.questions
set question    = regexp_replace(question,    '\\\\([a-zA-Z%])', '\\\1', 'g'),
    option_a    = regexp_replace(option_a,    '\\\\([a-zA-Z%])', '\\\1', 'g'),
    option_b    = regexp_replace(option_b,    '\\\\([a-zA-Z%])', '\\\1', 'g'),
    option_c    = regexp_replace(option_c,    '\\\\([a-zA-Z%])', '\\\1', 'g'),
    option_d    = regexp_replace(option_d,    '\\\\([a-zA-Z%])', '\\\1', 'g'),
    error_a     = regexp_replace(coalesce(error_a, ''),     '\\\\([a-zA-Z%])', '\\\1', 'g'),
    error_b     = regexp_replace(coalesce(error_b, ''),     '\\\\([a-zA-Z%])', '\\\1', 'g'),
    error_c     = regexp_replace(coalesce(error_c, ''),     '\\\\([a-zA-Z%])', '\\\1', 'g'),
    error_d     = regexp_replace(coalesce(error_d, ''),     '\\\\([a-zA-Z%])', '\\\1', 'g')
where topic in ('diagnostico', 'numbers_v1', 'paes_m1', 'polinomios')
  and id <> 359
  and (question    ~ '\\\\[a-zA-Z%]' or
       option_a    ~ '\\\\[a-zA-Z%]' or
       option_b    ~ '\\\\[a-zA-Z%]' or
       option_c    ~ '\\\\[a-zA-Z%]' or
       option_d    ~ '\\\\[a-zA-Z%]' or
       coalesce(error_a, '')     ~ '\\\\[a-zA-Z%]' or
       coalesce(error_b, '')     ~ '\\\\[a-zA-Z%]' or
       coalesce(error_c, '')     ~ '\\\\[a-zA-Z%]' or
       coalesce(error_d, '')     ~ '\\\\[a-zA-Z%]');

-- Los dos casos que la regla no cubre, a mano:
--   #299 escribe `\\$3.50` (la barra escapa un signo peso, no un comando).
--   #359 usa `\begin{cases}…\\\…\end{cases}`: tres barras donde van dos.
update public.questions
set question = '¿Cuántos centavos hay en $\$3.50$?'
where id = 299;

update public.questions
set question = 'Resuelve el sistema: $\begin{cases}2x+3y=12\\3x-2y=5\end{cases}$'
where id = 359;

commit;

-- Verificación: debe devolver 0 filas.
-- select id, topic, question from public.questions
-- where topic in ('diagnostico','numbers_v1','paes_m1','polinomios')
--   and (question ~ '\\\\[a-zA-Z%]' or option_a ~ '\\\\[a-zA-Z%]'
--        or option_b ~ '\\\\[a-zA-Z%]' or option_c ~ '\\\\[a-zA-Z%]'
--        or option_d ~ '\\\\[a-zA-Z%]');
