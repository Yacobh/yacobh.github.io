# HANDOFF

**Fecha del handoff: 2026-09-23** (SESSION-050). La versión anterior, del 2026-08-16, está en Git
(`dda5cb4`, en `main`). Entre las dos el proyecto pasó de «producto terminado, cero usuarios» a
**tres cursos reales en dos días**, y esta foto describe eso.

> Este documento existe para que **una persona o un agente de IA sin acceso al historial de
> conversaciones** pueda continuar el proyecto. Si solo puedes leer un archivo, lee este.
> Para el detalle de cada día, [[CURRENT_STATUS]]; para el modelo de negocio,
> [[TESIS_DE_CRECIMIENTO]].

---

## ⚠️ Antes de cualquier otra cosa

1. ✅ **`084` aplicada y verificada el 2026-09-25** (HTTP 401 como anon, `relacl` sin `anon`).
   Lo que sigue es histórico. ~~**Aplicar `084` (T-173, R-49).**~~ La vista `tests_sin_identidad`, creada el 2026-09-18 para el
   agente, heredó los privilegios por defecto de Supabase y **se lee con la anon key**: 635
   diagnósticos, sin correos pero con `user_id`, θ y respuestas de estudiantes en su mayoría
   menores. Es una línea en el SQL Editor, con la verificación al pie de la migración. La aplica el
   owner: el agente no es dueño de la vista.
2. **La rama `trabajo-autonomo-g2` no está mergeada.** Trae T-76, T-48, T-11, T-144, T-62 y T-33,
   el bundle compilado y las migraciones `084`–`086` (**las tres aplicadas** al 2026-09-25;
   verificado: la rama sigue 12 commits delante de `main` y de `origin/main`). Ver `sessions/SESSION-050.md`.

---

## Executive Summary

**Academia Integral** (<https://jacobocordova.com>) es una plataforma de diagnóstico adaptativo:
un estudiante rinde un test IRT de 4 a 20 ítems según el banco, obtiene su nivel (θ), los **errores conceptuales
concretos** que comete y un plan de estudio. Nació para la **PAES de Matemática 1** (Chile), y el
mismo motor ya corre tres tracks más, porque lo que lo ata a un temario es el contenido de
`modules`, `questions` y `resources`, no el código.

Es un **proyecto personal del profesor Jacobo Córdova**, que es owner, único desarrollador, autor
del contenido y operador. **Su raíz es su tesis de Ingeniería Electrónica (UNEXPO, 2010)**, y el
convenio con la UNAP (oct–nov 2025, terminado) fue un episodio de financiamiento, no el origen
([[RAIZ_SISTEMA_LLOVIZNA]], D-45). El copy público ya dice esto (D-53).

**Técnicamente:** SPA en ClojureScript + re-frame sobre GitHub Pages, con Supabase (PostgreSQL + Auth
+ RLS + Edge Functions) como único backend. No hay servidor propio: **toda la autorización es RLS**.

### ⭐ Lo que cambió desde agosto

- **El producto se usó en aulas reales.** El 2026-09-21 el owner lo aplicó a su 3º y su 4º medio de
  electrónica: **143 diagnósticos, 47 personas**. El 2026-09-22, un curso de matemática: **46
  diagnósticos, 28 estudiantes**, con una profesora asignada.
- **Existe la pantalla del profesor** (`/aula`, T-133) y el **rol `profesor`** en producción (`080`).
  Un curso es una **ventana de tiempo con nombre** (ADR-042), no una tabla de cursos: eso alcanzó
  para aislar en RLS lo que ve cada profesor sin modelar colegios (Q-36 sigue abierta para el día
  que haya dos).
- **El hallazgo con más valor comercial:** los dos cursos de electrónica comparten el error
  dominante, «sumaste las mantisas», en 8 de 24 y 9 de 21 estudiantes. Es la frase que T-82 dice
  que hay que poder decirle a un colegio, con datos propios.
- **El agente puede leer la base** (ADR-040): `claude_ro` de solo lectura, sin tablas con datos
  personales, y `claude_ddl` para migraciones **de contenido** cuando el owner lo pide.
- **La calibración ya existe** (T-76, 2026-09-23): el banco se puede estimar con respuestas reales,
  aunque todavía con muy poco dato por ítem.

### El modelo de negocio sigue siendo el del 2026-08-16

Cinco vectores ([[TESIS_DE_CRECIMIENTO]], ADR-025): **G-1** licencia B2B, **G-2** calibrar el banco,
**G-3** ingreso sin horas del fundador, **G-4** vender Δθ medido, **G-5** distribución medida. Orden:
G-2 y G-5 → G-1 → G-4 → G-3. Los números del plan (precio, mercado) siguen siendo **supuestos sin
validar** (A-31…A-35). **R-30 sigue siendo el riesgo dominante:** convertir el pivote en más
construcción de producto. Septiembre fue, por primera vez, uso real además de código.

> 🔴 **Q-43 abierta:** el owner enseña electrónica, no matemática, y los cursos reales fueron sobre
> todo de electrónica. Si la línea principal es PAES o es física/electricidad/electrónica no está
> decidido, y cambia qué contenido conviene escribir.

---

## Functional Scope

**Operativo:**

- Registro/login con email o **Google** (T-92, confirmado en producción el 2026-09-13).
- **Diagnóstico adaptativo** (motor v2, ADR-034: 1PL con azar fijo c = 0,25 y prior N(0, 2²)), con
  **escape «no sé»** (ADR-029), feedback al costado sin desmontar la pregunta (ADR-032), alternativas
  **barajadas** por ítem (ADR-030), y el intento en curso guardado en `intentos` (ADR-036), así que
  el abandono se puede contar.
- **Perfil de dos ejes:** θ y **fluidez λ** (ADR-019).
- **Mi plan**, **cupos** por banda, **tablero** con historial por evaluación y Δθ (D-60).
- **`/aula`** para el profesor: ideas erróneas del curso, acierto por módulo y por banco, intentos
  sucesivos, cuadrante velocidad × acierto, y el ítem más fallado con su explicación.
- **Panel admin** completo, con **editor en vivo** del ítem desde el propio test.
- **Tracks:** PAES (cuatro ejes con banco propio), `electrotecnia` (visible, ADR-035),
  `electronica` (5 módulos y 80 ítems, visible) y `cuantica` (aislado, `active = false`).
- **Medición de canal:** `/?de=etiqueta` queda en `visitor.fuente` (D-68).

**Excluido a propósito:** pagos (el precio está decidido, D-19/D-26, y falta el cobro),
multi-tenant por colegio (Q-36), app nativa, backend propio, estilos de aprendizaje (ADR-019).

---

## Technical Scope

```
Navegador: index.html → public/js/app.js → universo.core/init!
  re-frame: events/* → app-db → subs → components
  Lógica pura testeada (ADR-009): tetha · irt.{progress,effort,fluency,escape,calibracion}
      profile · topics · slots.logic · cohorte · intento · rastro · reintento · motor · tablas-md …
  I/O solo en universo.db.crud
        │ supabase-js con el JWT del usuario
        ▼
Supabase PostgreSQL — RLS es el único límite — is_admin() · tests_en_mi_cohorte()
  RPC: next_question · score_answer (el cliente no lee `questions`, ADR-015)
        ▼
Edge Function send-enrollment-emails → Resend
```

- **Tests:** `clj -M:test` → **291 tests / 3133 assertions / 0 failures** (2026-09-23, rama).
- **Ocho auditores** en `scripts/`: tema oscuro, contraste, móvil, HTML, paleta, ítems, unidad y
  redacción. ⚠️ **Ninguno comprueba que la cuenta de un ítem esté bien** (R-41): eso sigue siendo
  lectura humana.
- **Migraciones:** `001`…`083` aplicadas en producción. `084`, `085` y `086` escritas y verificadas,
  **sin aplicar**. Desde el 2026-09-23 existe **`000_baseline.sql`**: con él, `scripts/reconstruir_esquema.sh`
  reproduce el esquema de producción desde el repositorio (442 hechos de catálogo, iguales). El
  contenido no se reconstruye: unos 400 ítems solo existen en producción.
- **Verificación de RLS:** `scripts/verificar_rls.sh` (T-11), sobre el esquema reconstruido.
- **Deploy:** GitHub Pages sobre `main`. **Compilar y commitear `public/js/app.js` es el deploy**
  (ADR-003).
- **No hay:** staging (T-09), respaldo probado (T-07), monitoreo, analítica del embudo (T-20).

Detalle: [[ARCHITECTURE]] · [[TECH_STACK]] · `supabase/SCHEMA.md`.

---

## Current State

| Área | Estado |
|------|--------|
| Uso real | ✅ 3 cursos (2026-09-21 y 22), 75 estudiantes, 189 diagnósticos |
| Motor IRT | ✅ v2 en producción. 🔺 **R-48**: en `electronica`, el θ de quien no falla lo pone el techo del banco (`max(b) + 2`), no el estudiante |
| Calibración (G-2) | 🟡 pipeline hecho (T-76), 1.710 respuestas. Solo `electronica` y `diagnostico` tienen dato que pese; ningún banco está calibrado en el sentido de T-77 |
| Panel docente `/aula` | ✅ en producción y verificado contra SQL. 🟡 falta que entre una profesora real (T-79) |
| Rol `profesor` | ✅ `080` aplicada. ⚠️ No se entregan cuentas de profesor antes de cerrar F9 (R-28) |
| Seguridad | 🔺 **R-49** abierto hasta aplicar `084`; `085` (T-163) escrita |
| Esquema reproducible | ✅ `000_baseline` + reconstrucción verificada (T-48) |
| Banco `diagnostico` | 🟡 reparado (`081`–`083`) y con JSON para los auditores (T-171). Un solo ítem sobre 2 |
| Producto | 🔺 **T-153**: el owner lo encontró «genérico y no muy interesante». Requiere ADR-041 |
| Staging / respaldo / monitoreo | ⛔ |

---

## Pending Work

En orden. Lo marcado *owner* no lo puede hacer un agente.

| # | Qué | Tarea |
|---|-----|-------|
| 1 | Aplicar `084` — *owner* | T-173, R-49 |
| 2 | Revisar y mergear la rama; el bundle trae T-144 (el correo deja de entrar al jsonb de `tests`) y T-62 | SESSION-050 |
| 3 | Aplicar `085` — *owner* — y recorrer el funnel una vez | T-163 |
| 4 | Aplicar `086` (28 ítems duplicados) | T-106 |
| 5 | Verificar que la profesora entra a `/aula` y ve solo su cohorte — *owner* | T-79 |
| 6 | Abrir el rango de dificultad de `electronica` y escribir ítems sobre −1 | T-172, T-170 |
| 7 | Ítems de `diagnostico` en [2, 3] | T-171 |
| 8 | Escribir lo que se observó en los cursos — *owner* | T-131 |
| 9 | Decidir qué θ vale con varios intentos — *owner* | T-142, Q-46 |
| 10 | Validar precio y mercado con colegios — *owner* | T-80 |
| 11 | Respaldo probado y staging (el baseline ya permite armar staging) | T-07, T-09 |

Backlog completo: [[BACKLOG]].

---

## Known Risks

Los que importan hoy (lista completa en [[RISKS]]):

1. **R-49** · la vista del agente es legible con la anon key. **Alto hasta aplicar `084`.**
2. **R-30** · convertir el pivote en más código y seguir sin clientes.
3. **R-48** · casi la mitad de las mediciones de `electronica` no miden: el banco se acaba.
4. **R-47** · el reintento mide memoria: se repiten 2 de cada 3 ítems con la explicación ya vista.
5. **R-28** · datos de menores de un colegio: con clientes institucionales, F9 deja de ser buena
   práctica y pasa a ser requisito.
6. **R-01 / R-02** · bus factor 1, y se desarrolla contra producción sin staging.

---

## Open Questions

- 🔴 **Q-43** ¿La línea principal es PAES, o es física/electricidad/electrónica?
- 🔴 **Q-46** Con varios intentos del mismo estudiante, ¿cuál θ vale?
- 🟠 **Q-36** ¿Cómo se aísla por establecimiento? Hoy no hace falta: hay un solo profesor-owner.
- 🟠 **Q-51** ¿Cómo se marca el diagnóstico de una cuenta de prueba? Por eso el agente nunca ha
  recorrido el embudo con cuenta propia.

Lista completa y contradicciones vivas: [[OPEN_QUESTIONS]].

---

## Critical Decisions

Hay cuarenta ADR en `../adr/`, del 001 al 042 (el 037 y el 041 no existen; el 041 es la decisión
que pide T-153). Los que más cuestan de redescubrir:

| ADR | Decisión | Por qué importa saberlo |
|-----|----------|-------------------------|
| ADR-002 | Supabase como único backend, RLS como límite | No hay dónde poner un secreto ni lógica de servidor |
| ADR-003 | El bundle compilado va en Git | Compilar y commitear `app.js` **es** el deploy |
| ADR-009 | Reglas de negocio en namespaces puros | Toda regla nueva, con test, fuera de los handlers |
| ADR-010 | Project Memory First | Terminar incluye documentar |
| ADR-015 | El cliente no lee `questions` | El ítem viaja sin la respuesta; corrige el servidor |
| ADR-016 | IA solo en autoría, nunca en runtime | Sin API keys en el cliente, costo ≈ 0 |
| ADR-019 | Segundo eje = fluidez, no estilos de aprendizaje | El eje de estilos no tiene respaldo empírico |
| ADR-022 / 023 / 031 / 033 | Lenguaje Braun, panel de instrumento, plano de medida, estado con diodo | La paleta es cerrada; el color se verifica con auditores |
| ADR-025 | Cinco vectores de valor | Manda en negocio |
| ADR-026 / 027 | Router con history API; un solo `index.html` + `404.html` | Toda sección nueva va al router |
| ADR-029 | «No sé» como tercera categoría | Un escape no es un error conceptual |
| ADR-030 | Alternativas barajadas por ítem | La letra de la base no es la posición en pantalla |
| ADR-034 | Azar fijo, prior suelto, versión del motor | Si tocas el estimador, sube `universo.motor/version` |
| ADR-036 | El intento en curso vive en `intentos` | `tests` son mediciones terminadas |
| ADR-040 | El agente accede a la base con dos roles | `claude_ro` por defecto; `claude_ddl` solo a pedido |
| ADR-042 | Una cohorte es una ventana de tiempo | El aislamiento del profesor sin modelo de colegios |

Decisiones menores: [[DECISIONS]] §2 (la última, **D-76**, fija cómo se calibra).

---

## Immediate Next Steps

1. **Verificar la realidad:** `git status`, `git log --oneline -5`, `clj -M:test` (esperado en la
   rama: 291 / 3133 / 0) y `supabase/SCHEMA.md` para ver qué migraciones faltan.
2. **Leer `sessions/SESSION-050.md`**: explica qué trae la rama, qué quedó sin aplicar y en qué orden.
3. **No escribir más producto sin mirar T-153 y R-30.** Lo que más mueve el proyecto hoy son T-131
   (qué pasó en la sala), T-80 (hablar con colegios) y G-2 (más datos por ítem, que solo salen de
   más cursos).

**Antes de tocar código:** [[AGENT_INSTRUCTIONS]]. **Al terminar:**
`../prompts/session-close-memory-update.md`.

---

## Recommended Reading Order

1. `../CLAUDE.md` · 2. este archivo · 3. [[CURRENT_STATUS]] (los bloques fechados de arriba; las
secciones numeradas §1–§8 del final están congeladas en agosto) · 4. [[ARCHITECTURE]] ·
5. [[DECISIONS]] + el ADR que toque tu tarea · 6. [[AGENT_INSTRUCTIONS]] · 7. [[OPEN_QUESTIONS]].

Según la tarea: base de datos → `supabase/SCHEMA.md` + [[RISKS]] R-14, R-46, R-49; contenido → las
skills `unidad-de-contenido` y `banco-de-items`; calibración → `docs/calibracion/` + D-76; negocio
→ [[TESIS_DE_CRECIMIENTO]].

**Contexto histórico:** `../docs/historico/PROJECT_SUMMARY.md` (archivado el 2026-09-23, T-33) es la
documentación anterior a esta memoria. No gana nunca.

---

Relacionado: [[INDEX]] · [[CURRENT_STATUS]] · [[AGENT_INSTRUCTIONS]] · [[ARCHITECTURE]] · [[BACKLOG]]
