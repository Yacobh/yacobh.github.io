# Prompt: requisitos

Para definir, refinar o cuestionar un requisito antes de implementarlo.

---

## Prompt

```
Requisito a trabajar: <DESCRIPCIÓN>

Antes de responder:
1. Lee project-memory/REQUIREMENTS.md, PROJECT_BRIEF.md (alcance y exclusiones) y
   BUSINESS_CONTEXT.md.
2. Revisa OPEN_QUESTIONS.md y ASSUMPTIONS.md.
3. Verifica en DECISIONS.md si alguna decisión ya lo condiciona o lo excluye.

Entrega:

1. Enunciado del requisito con ID propuesto (RF-N.M o RNF-NN)
2. ¿Está dentro del alcance declarado? Si toca una exclusión, dilo y detente ahí.
3. Reglas de negocio que implica, y dónde deben vivir (namespace puro / SQL / ambos)
4. Casos de uso afectados
5. Criterios de aceptación verificables, incluidos los casos borde
6. Impacto: qué archivos, qué tablas, qué policies, qué documentación
7. Dependencias y precondiciones
8. Información que falta para poder implementarlo, como preguntas concretas

No implementes nada todavía.
Si el requisito contradice el copy público (landing / FAQ / JSON-LD), señálalo: el copy es
un requisito y hoy hay contradicciones registradas.
```

---

## Notas

### Reglas de este proyecto al escribir requisitos

1. **El copy público es un requisito.** La landing, la FAQ y el JSON-LD son promesas verificables. Hoy
   hay dos incumplidas: el tiempo de respuesta no influye en la estimación (X-01) y no hay histórico
   del diagnóstico (X-02). No añadas una tercera.
2. **Toda regla de negocio va a un namespace puro con test** (ADR-009). Si el requisito no se puede
   expresar como función de datos a datos, revisa si lo estás formulando bien.
3. **Si el requisito toca datos, toca RLS.** Ninguna funcionalidad nueva está completa sin sus policies.
4. **Si el requisito toca cupos o bandas, la regla puede estar duplicada** (cliente + SQL): hay que
   cambiar las dos (R-08).
5. **Exclusiones vigentes** (`PROJECT_BRIEF` §6): pagos, rol profesor, asistencia/notas/certificación,
   backend propio, app nativa, otras materias PAES, i18n. Un requisito que caiga ahí exige **decisión
   del owner y un ADR**, no una implementación.

### Criterios de aceptación: cómo se ven aquí

Malos: "el filtro funciona", "el diagnóstico es preciso".

Buenos (del estilo que ya usa `REQUIREMENTS.md` §6):

- θ = −0,01 ⇒ banda `inicial` (borde inferior).
- Estudiante sin banda ⇒ lista de cupos vacía con mensaje explicativo.
- Cupo con `min_enrollments = 3` y 2 activos ⇒ muestra "falta 1".
- Sin `RESEND_API_KEY` ⇒ la function responde 503 y la cola queda intacta.
- Un `user` que consulta el perfil de otro ⇒ 0 filas.

Un criterio de aceptación debe poder convertirse en un test o en un paso manual sin ambigüedad.

### Al terminar

Actualiza `REQUIREMENTS.md` con el requisito y su estado (✅ / 🟡 / ⚠️ / ⛔), y añade la tarea a
`BACKLOG.md` con sus criterios de terminado. Si aparecieron preguntas, van a `OPEN_QUESTIONS.md`.
