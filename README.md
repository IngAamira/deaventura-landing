# deaventura-landing

Sitio web de **DeAventura**: caminatas ecológicas, senderismo y turismo responsable en Medellín y Colombia.

Construido con **Next.js 16 (App Router) + React 19 + TypeScript estricto + Tailwind CSS v4 + MDX**. Fase 2 (web completa) implementada; datos operativos pendientes de confirmación del cliente (ver `MEMORY.md`).

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

## Variables de entorno

Solo hay una, documentada en `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: URL absoluta del sitio. Se usa en el canonical, el sitemap, Open Graph y JSON-LD. **PENDIENTE**: sustituir por el dominio definitivo cuando el cliente confirme el despliegue.

## Rutas

| Ruta                          | Contenido                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| `/`                           | Home: hero, presentación, experiencias, privadas, reseñas, galería, blog, FAQ, CTA |
| `/experiencias`               | Listado de experiencias y detalle de datos por confirmar                           |
| `/experiencias/[slug]`        | Detalle reutilizable de cada experiencia                                           |
| `/salidas-privadas`           | Planes privados + formulario que abre WhatsApp                                     |
| `/blog`                       | Listado de artículos y categorías                                                  |
| `/blog/[slug]`                | Artículo MDX                                                                       |
| `/blog/categoria/[categoria]` | Artículos por categoría                                                            |
| `/resenas`                    | Reseñas de Google (curadas, enlazables)                                            |
| `/contacto`                   | Canales de contacto y FAQ de reservas                                              |
| `/politica-de-privacidad`     | Borrador provisional de privacidad                                                 |
| `/sitemap.xml`, `/robots.txt` | Generados por Next.js                                                              |

## Contenido del blog (MDX)

Los artículos viven en `content/posts/*.mdx` con frontmatter YAML:

```yaml
---
title: "Título del artículo"
description: "Meta description y resumen de la tarjeta."
date: "2026-10-12"
author: "Equipo DeAventura"
category: "senderismo" # una de las claves de POST_CATEGORIES en src/lib/posts.ts
tags: ["etiqueta", "otra"]
cover:
  src: "/images/foto.jpg"
  alt: "Descripción accesible de la imagen"
---
```

Si falta un campo o el formato no es válido, **el build falla con un mensaje claro** (no se publica contenido roto). Las categorías disponibles se definen en `src/lib/posts.ts`.

## Imágenes

Las fotografías actuales son **provisionales de stock** (Unsplash/Pexels, licencia de uso libre): ver `public/images/SOURCES.md`. Sustituirlas por fotografía real del cliente es el pendiente de mayor impacto visual. El hero usa `priority`; el resto se carga diferido.

## Documentación

- `AGENTS.md` — reglas permanentes del proyecto (stack, convenciones, criterios de aceptación).
- `MEMORY.md` — estado real del proyecto, decisiones pendientes y siguiente paso.
- `docs/Info.md` — requisitos del cliente (fuente de verdad del alcance).
- `docs/Info-goole-maps.md` — datos exportados de la ficha de Google del cliente.
- `docs/arquitectura.md` — decisiones arquitectónicas (Fase 1 y Fase 2).

## Estructura

```text
src/app/          Rutas Next.js (App Router), sitemap, robots, OG image
src/components/   Componentes de presentación
src/lib/          Datos del negocio, utilidades y JSON-LD
content/posts/    Artículos MDX del blog
public/           Estáticos (images/ con material provisional y sus fuentes)
docs/             Documentación
.opencode/        Agentes y skills de OpenCode
```

## Licencia

Propietaria — DeAventura (ver `LICENSE`).
