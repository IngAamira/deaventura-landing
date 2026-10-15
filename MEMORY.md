# MEMORY.md

Memoria operativa del proyecto entre sesiones. Representa el **estado real verificado** contra el código y la configuración.

Las reglas permanentes de ingeniería viven en `AGENTS.md`; las decisiones arquitectónicas y su justificación, en `docs/arquitectura.md`. Reglas de este archivo: mantenerlo breve, sin secretos, sin inventar datos, y eliminar lo obsoleto.

---

## 1. Identidad

**Cliente:** DeAventura — caminatas ecológicas, senderismo, trekking y turismo responsable en Medellín, Antioquia y Colombia.

**Objetivo del sitio:** posicionar páginas comerciales y artículos en buscadores, captar reservas por WhatsApp, mostrar servicios, salidas privadas, reseñas de Google y redes sociales.

**Fuentes de verdad del negocio:** `docs/Info.md` (alcance), `docs/Info-goole-maps.md` (ficha de Google: 5,0 ★ / 166 reseñas, dirección, teléfono, precio de referencia de "Ruta de las cascadas").

**Estado del proyecto:** `EN DESARROLLO — Fase 1 (entorno) completada; la web no está construida.`

**Rama principal:** `trunk` (remoto `origin/trunk` configurado).

## 2. Estado actual

**Última actualización:** 2026-10-15

**Último trabajo realizado:** Fase 1 — auditoría del entorno, decisión de arquitectura, scaffold de Next.js 16 validado, configuración de OpenCode (agentes, skills, permisos) y documentación.

**Bloqueos:** ninguno técnico. Pendientes de decisión del cliente en §7.

**Validaciones ejecutadas (2026-10-15, todas superadas):** `npm run lint` ✓ · `npm run format:check` ✓ · `npm run build` ✓ (rutas `/` y `/_not-found` estáticas) · `npm run typecheck` ✓ (tras build).

## 3. Stack (verificado contra package.json y build real)

| Área                                    | Tecnología                                                                        | Versión                                      |
| --------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------- |
| Framework                               | Next.js (App Router, `cacheComponents`)                                           | 16.4.1                                       |
| UI                                      | React                                                                             | 19.3.0                                       |
| Lenguaje                                | TypeScript (strict)                                                               | ^5 (resuelto en lockfile)                    |
| Estilos                                 | Tailwind CSS                                                                      | ^4 (CSS-first, via `@tailwindcss/turbopack`) |
| Lint / format                           | ESLint + eslint-config-next + eslint-config-prettier / Prettier + plugin Tailwind | ^9 / ^3                                      |
| Runtime / gestor                        | Node.js v26.10.0 / npm 11.19.1                                                    | —                                            |
| Base de datos / backend / CMS / testing | `NO APLICA` en v1                                                                 | —                                            |
| Despliegue / dominio                    | `PENDIENTE` (ver §7)                                                              | —                                            |

## 4. Estructura real

```text
src/app/            layout.tsx, page.tsx (placeholder de create-next-app, en inglés)
src/components/     (creará la Fase 2)
src/lib/            (creará la Fase 2)
public/             SVGs del scaffold
docs/               Info.md, Info-goole-maps.md, arquitectura.md
.opencode/          agents/ (arquitecto, frontend, seo, qa), skills/ (4 skills)
opencode.jsonc      permisos y watcher locales
AGENTS.md           reglas permanentes (incluye bloque nextjs-agent-rules regenerado por next dev)
skills-lock.json    procedencia y hash de las skills instaladas
```

Comandos reales: `npm run dev | build | start | lint | typecheck | format | format:check`. `typecheck` requiere un `build` o `dev` previo (tipos generados por Next.js).

## 5. Decisiones consolidadas

1. **Next.js 16 App Router + TS + Tailwind v4** (no SPA con Vite): HTML estático indexable y metadata API nativas; comparativa completa en `docs/arquitectura.md`.
2. **Blog con MDX local en `content/`** en la Fase 2 (sin CMS externo por ahora).
3. **Reseñas de Google: selección manual curada** recomendada para v1; Places API queda `PENDIENTE` (requiere cuenta de facturación).
4. **Contacto por WhatsApp vía enlaces `wa.me`**: sin backend ni credenciales.
5. **npm** como gestor de paquetes (no pnpm/yarn/bun, no instalados en el entorno).

## 6. Entorno de agentes (OpenCode v2.0.24)

- Agentes: `.opencode/agents/{arquitecto,frontend,seo,qa}.md` — arquitecto y qa son solo lectura; frontend y seo pueden editar.
- Skills instaladas localmente (instrucciones externas revisadas, contenido Markdown sin ejecutables): `vercel-react-best-practices` (vercel-labs), `web-design-guidelines` (vercel-labs), `seo-audit` (coreyhaines31/marketingskills), `accessibility` (addyosmani/web-quality-skills). Procedencia en `skills-lock.json`; actualizar con `npx skills update`.
- Permisos en `opencode.jsonc`: `npm publish` denegado; `git push`, `git reset --hard` y `git clean` piden confirmación.

## 7. Decisiones y servicios pendientes (bloquean o condicionan la Fase 2)

| Pendiente                                | Tipo        | Detalle                                                                 |
| ---------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| Fotografía y vídeo propios               | Cliente     | Sin ellos no hay hero ni galería; deben incluir derechos de uso         |
| Reseñas de Google (vía)                  | Cliente     | Curado manual (recomendado) vs Places API (API key + facturación)       |
| Despliegue y dominio                     | Cliente     | Vercel (recomendado) / Netlify / Cloudflare Pages                       |
| Versión en inglés                        | Cliente/SEO | Afecta a hreflang y estrategia de contenidos                            |
| Número y precio exacto de salidas        | Cliente     | Solo hay precio de referencia ($33.000 Ruta de las cascadas) en `docs/` |
| Tests (unitarios/E2E), Lighthouse/axe CI | Técnico     | Evaluar en Fase 2 con UI real; no añadidos aún                          |
| `.env.example`                           | Técnico     | No creado: ninguna variable es necesaria en v1                          |

## 8. Riesgos conocidos

| Riesgo                                                             | Mitigación                                                                       |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| El bloque `nextjs-agent-rules` de AGENTS.md lo regenera `next dev` | Está commiteado tal cual; no eliminarlo de los diffs                             |
| Skills externas pueden desactualizarse o contradecir convenciones  | Tratadas como orientación; prevalecen AGENTS.md y docs oficiales (§15 AGENTS.md) |
| Contenido de cliente sin verificar (precios, datos de contacto)    | Solo usar datos de `docs/`; marcar `PENDIENTE` y preguntar                       |

## 9. Trabajo pendiente (siguiente fase)

**Fase 2 — construir la web (no iniciada):**

1. Diseño y estructura de rutas (home, servicios/experiencias, salidas privadas, blog, contacto).
2. Sistema de diseño: tokens de marca (colores, tipografía, espaciados) en `globals.css`.
3. Integrar MDX para el blog (`content/` + `generateStaticParams`).
4. Metadatos, `sitemap.ts`, `robots.ts`, JSON-LD, Google Reviews (sección), redes y WhatsApp.
5. Medios optimizados y validaciones finales (lint/build/typecheck + revisión a11y/rendimiento).

## 10. Discrepancias doc vs realidad

Ninguna tras la Fase 1. La plantilla generó `src/app/page.tsx` y `layout.tsx` con contenido placeholder en inglés: es temporal y se reemplazará en la Fase 2 (no confundir con el estado final del sitio).
