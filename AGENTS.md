# AGENTS.md

## Proyecto

Landing page para el cliente **DeAventura** (caminatas ecológicas y turismo responsable, Medellín). Repositorio en fase inicial: **aún no existe código**. El stack tecnológico no está elegido.

- Requisitos reales del cliente: `docs/Info.md` (fuente de verdad del alcance funcional).
- Referencia visual acordada: https://atodopulmon.co/
- Estado actual, decisiones y pendientes: `MEMORY.md` (leerlo al inicio de cada tarea; actualizarlo al terminar).

## Reglas de trabajo

- **Comprender antes de modificar.** No implementar funcionalidades solo para "completar" documentación o memoria.
- **No inventar tecnologías ni datos.** Mientras una decisión no esté tomada, marcar `PENDIENTE`; no sustituir por defaults del framework o del agente.
- **El código real manda.** Ante discrepancia entre docs y código/configuración, verificar el estado real y corregir la documentación, no asumir que el doc es correcto.
- **No fabricar contenido.** Prohibido inventar clientes, testimonios, reseñas, métricas o integraciones. El sitio es para un cliente real: solo usar información verificable de `docs/`.
- **No commitear secretos.** Ni en código ni en `MEMORY.md`.
- **Cambios pequeños y verificables.** Evitar reescrituras masivas, refactors no solicitados y dependencias nuevas sin justificación.

## Convenciones del repo

- Rama principal: **`trunk`** (no `main`).
- Documentación e interfaz del proyecto en **español**.
- `.gitignore` ya contempla un frontend tipo Vite (`dist/`, `node_modules/`), pero el stack sigue siendo `PENDIENTE` hasta decidirlo explícitamente.
- No hay build, lint, test ni CI todavía. Cuando se añadan, registrar los comandos exactos en `MEMORY.md` (sección "Validación y calidad") y respetarlos en tareas posteriores.

## Flujo por tarea

1. Leer `MEMORY.md` para situarte (estado, decisiones, pendientes).
2. Verificar contra el repositorio lo que la memoria afirme.
3. Implementar en pasos pequeños.
4. Validar con los mecanismos que realmente existan (hoy: solo revisión manual).
5. Actualizar `MEMORY.md`: estado, trabajo realizado, siguiente paso; eliminar información obsoleta.
