# deaventura-landing

Sitio web de **DeAventura**: caminatas ecológicas, senderismo y turismo responsable en Medellín y Colombia.

Proyecto en preparación (Fase 1 completada): entorno de desarrollo configurado con **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**. La web aún no está construida.

## Requisitos

- Node.js ≥ 20 (verificado con v26.10.0)
- npm ≥ 11 (verificado con 11.19.1)

## Comandos

```bash
npm install            # instalar dependencias
npm run dev            # servidor de desarrollo (http://localhost:3000)
npm run build          # build de producción (requerido antes de typecheck)
npm run start          # servir el build de producción
npm run lint           # ESLint
npm run typecheck      # verificación de tipos (tsc --noEmit)
npm run format         # formatear con Prettier
npm run format:check   # comprobar formateo
```

Orden de validación antes de cerrar una tarea: `lint` → `format:check` → `build` → `typecheck`.

## Documentación

- `AGENTS.md` — reglas permanentes del proyecto (stack, convenciones, criterios de aceptación).
- `MEMORY.md` — estado real del proyecto, decisiones pendientes y siguiente paso.
- `docs/Info.md` — requisitos del cliente (fuente de verdad del alcance).
- `docs/Info-goole-maps.md` — datos exportados de la ficha de Google del cliente.
- `docs/arquitectura.md` — decisiones arquitectónicas de la Fase 1 y alternativas descartadas.

## Estructura

```text
src/app/          Rutas Next.js (App Router)
src/components/   Componentes de presentación
src/lib/          Utilidades
public/           Estáticos
docs/             Documentación
.opencode/        Agentes y skills de OpenCode
```

## Licencia

Propietaria — DeAventura (ver `LICENSE`).
