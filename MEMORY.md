# MEMORY.md

Memoria operativa del proyecto entre sesiones. Representa el **estado real verificado** contra el código y la configuración.

Las reglas permanentes de ingeniería viven en `AGENTS.md`; las decisiones arquitectónicas y su justificación, en `docs/arquitectura.md`. Reglas de este archivo: mantenerlo breve, sin secretos, sin inventar datos, y eliminar lo obsoleto.

---

## 1. Identidad

**Cliente:** DeAventura — caminatas ecológicas, senderismo, trekking y turismo responsable en Medellín, Antioquia y Colombia.

**Objetivo del sitio:** posicionar páginas comerciales y artículos en buscadores, captar reservas por WhatsApp, mostrar servicios, salidas privadas, reseñas de Google y redes sociales.

**Fuentes de verdad del negocio:** `docs/Info.md` (alcance), `docs/Info-goole-maps.md` (ficha de Google: 5,0 ★ / 166 reseñas, dirección, teléfono, precio de referencia de "Ruta de las cascadas").

**Estado del proyecto:** `EN DESARROLLO — Fase 2 (web completa) implementada y validada; pendiente de datos del cliente, dominio y despliegue.`

**Rama principal:** `trunk` (remoto `origin/trunk` configurado). Los cambios de Fase 2 están **sin commitear**.

## 2. Estado actual

**Última actualización:** 2026-10-15

**Último trabajo realizado:** Fase 2 completa — landing, blog MDX, experiencias, salidas privadas, reseñas, contacto, SEO técnico y QA. Tras las validaciones se ejecutaron auditorías especializadas (SEO + frontend/a11y) y se aplicaron sus correcciones: tarjetas sociales propias por página (helper `socialMetadata`), protección de `NEXT_PUBLIC_SITE_URL` en producción, `og:image` en artículos/experiencias, FAQPage en `/contacto`, enlazado comercial ↔ blog vía `relatedExperiences`, NAP en E.164, `offers` de `TouristTrip` solo con precio verificado, categorías del blog `noindex` hasta ≥3 artículos, foco visible con contraste, targets ≥ 44 px, `lang="en"` en reseñas inglesas, AVIF + `sizes` corregidos, `priority` solo en el LCP real, y corrección de la categoría `cascadas` (antes vacía = 404 en prerender).

**Bloqueos:** ninguno técnico. Pendientes de decisión del cliente en §7.

**Validaciones ejecutadas (2026-10-15, todas superadas):** `npm run lint` ✓ · `npm run format:check` ✓ · `npm run build` ✓ (33 rutas: estáticas + partial prerender) · `npm run typecheck` ✓ (tras build).

**QA automatizado (2026-10-15, sobre `next start`):** script con jsdom + axe-core (WCAG 2.2 A/AA) + chequeos de JSON-LD parseable, H1 único, `alt` en imágenes, enlaces internos, imágenes `/_next/image`, `sitemap.xml`, `robots.txt` y página 404 propia: **0 hallazgos en 26 rutas**.

## 3. Stack (verificado contra package.json y build real)

| Área                                    | Tecnología                                                                        | Versión                                      |
| --------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------- |
| Framework                               | Next.js (App Router, `cacheComponents`)                                           | 16.4.1                                       |
| UI                                      | React                                                                             | 19.3.0                                       |
| Lenguaje                                | TypeScript (strict)                                                               | ^5 (resuelto en lockfile)                    |
| Estilos                                 | Tailwind CSS                                                                      | ^4 (CSS-first, via `@tailwindcss/turbopack`) |
| Blog                                    | MDX local (`@next/mdx` + `gray-matter` + `remark-frontmatter`)                    | ^4 / ^2 / ^10                                |
| Lint / format                           | ESLint + eslint-config-next + eslint-config-prettier / Prettier + plugin Tailwind | ^9 / ^3                                      |
| Runtime / gestor                        | Node.js v26.10.0 / npm 11.19.1                                                    | —                                            |
| Base de datos / backend / CMS / testing | `NO APLICA` en v1 (QA con jsdom + axe-core en `/tmp`, no instalado en el repo)    | —                                            |
| Despliegue / dominio                    | `PENDIENTE` (ver §7)                                                              | —                                            |

## 4. Estructura real

```text
src/app/            layout.tsx, page.tsx, opengraph-image.tsx, sitemap.ts, robots.ts,
                    not-found.tsx, experiencias/[slug]/, salidas-privadas/, blog/[slug]/,
                    blog/categoria/[categoria]/, resenas/, contacto/, politica-de-privacidad/
src/components/     BrandMark, WhatsAppButton, SiteHeader, SiteFooter, FloatingWhatsApp,
                    Hero, SectionHeading, ExperienceCard, ArticleCard, ReviewsSection,
                    FaqSection, CtaSection, Breadcrumbs, GallerySection, ContactForm
src/lib/            site.ts, whatsapp.ts, experiences.ts, reviews.ts, faq.ts, posts.ts, jsonld.ts
src/mdx-components.tsx   estilos .prose para MDX
content/posts/      5 artículos MDX con frontmatter validado (falla el build si es inválido)
public/images/      10 fotos de stock PROVISIONALES (+ SOURCES.md cuando exista)
docs/               Info.md, Info-goole-maps.md, arquitectura.md (§10-16: decisiones Fase 2)
.env.example        NEXT_PUBLIC_SITE_URL
```

Comandos reales: `npm run dev | build | start | lint | typecheck | format | format:check`. `typecheck` requiere un `build` o `dev` previo (tipos generados por Next.js).

## 5. Decisiones consolidadas

1. **Next.js 16 App Router + TS + Tailwind v4** (no SPA con Vite): HTML estático indexable y metadata API nativas; comparativa completa en `docs/arquitectura.md`.
2. **Blog con MDX local en `content/`** (sin CMS externo); `generateStaticParams` + frontmatter validado.
3. **Reseñas de Google: selección manual curada** (transcripciones literales en `src/lib/reviews.ts`), sin `Review`/`AggregateRating` en JSON-LD (política Google) y con enlace a búsqueda verificable de Maps (sin place_id inventado). Places API queda `PENDIENTE`.
4. **Contacto por WhatsApp vía enlaces `wa.me`**: sin backend ni credenciales; el formulario de salidas privadas valida en cliente y abre WhatsApp.
5. **npm** como gestor de paquetes (no pnpm/yarn/bun, no instalados en el entorno).
6. **URL canónica por variable `NEXT_PUBLIC_SITE_URL`** (`.env.example`): sin dominio todavía, se resuelve al desplegar.
7. **Imágenes: stock descargado a `public/images/` como PROVISIONAL** (Pexels, licencia de uso comercial sin atribución; ver `public/images/SOURCES.md`) + `remotePatterns` habilitado; se sustituirán por fotos propias del cliente.
8. **i18n: solo español** por ahora; arquitectura preparada documentada en `docs/arquitectura.md` §15.
9. **`dynamicParams` incompatible con `cacheComponents`**: las rutas dinámicas usan `export const ensureStatic = "navigation"`.

## 6. Entorno de agentes (OpenCode v2.0.24)

- Agentes: `.opencode/agents/{arquitecto,frontend,seo,qa}.md` — arquitecto y qa son solo lectura; frontend y seo pueden editar.
- Skills instaladas localmente (instrucciones externas revisadas, contenido Markdown sin ejecutables): `vercel-react-best-practices` (vercel-labs), `web-design-guidelines` (vercel-labs), `seo-audit` (coreyhaines31/marketingskills), `accessibility` (addyosmani/web-quality-skills). Procedencia en `skills-lock.json`; actualizar con `npx skills update`.
- Permisos en `opencode.jsonc`: `npm publish` denegado; `git push`, `git reset --hard` y `git clean` piden confirmación.

## 7. Decisiones y servicios pendientes

| Pendiente                                  | Tipo        | Detalle                                                                                       |
| ------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------- |
| Fotografía y vídeo propios                 | Cliente     | Sustituir las 10 fotos de stock de `public/images/` (provisionales de Pexels, ver SOURCES.md) |
| Logo y paleta oficial                      | Cliente     | Hoy hay `BrandMark` tipográfico y paleta propuesta (bosque/tierra/agua/papel)                 |
| URL exacta del perfil de Google            | Cliente     | El enlace de reseñas apunta a una búsqueda de Maps, no al perfil                              |
| Dominio y despliegue                       | Cliente     | Vercel (recomendado) / Netlify / Cloudflare Pages; fijar `NEXT_PUBLIC_SITE_URL`               |
| Versión en inglés                          | Cliente/SEO | Afecta a hreflang y estrategia de contenidos                                                  |
| Precios, calendario y política de reservas | Cliente     | Marcados como "por confirmar" en `experiencias.ts`; no inventar                               |
| Permisos de testimonios                    | Cliente     | Confirmar autorización para publicar nombres/textos de reseñas                                |
| Tests (unitarios/E2E), Lighthouse CI       | Técnico     | Evaluar tras tener dominio y fotos reales                                                     |

## 8. Riesgos conocidos

| Riesgo                                                             | Mitigación                                                                                  |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| El bloque `nextjs-agent-rules` de AGENTS.md lo regenera `next dev` | Está commiteado tal cual; no eliminarlo de los diffs                                        |
| Skills externas pueden desactualizarse o contradecir convenciones  | Tratadas como orientación; prevalecen AGENTS.md y docs oficiales (§15 AGENTS.md)            |
| Contenido de cliente sin verificar (precios, datos de contacto)    | Solo usar datos de `docs/`; marcar `PENDIENTE` y preguntar                                  |
| Fotos de stock presentadas como si fueran de DeAventura            | Alt texts y avisos visibles de "imagen provisional"; sustituir al tener fotos propias       |
| 404 de rutas dinámicas sin JS (limitación de `cacheComponents`)    | Status 404 + `noindex` correctos; la UI 404 se pinta con JS. Ver `docs/arquitectura.md` §17 |

## 9. Trabajo pendiente (siguiente fase)

**Fase 3 — puesta en línea y contenido:**

1. Recibir del cliente: fotos propias, logo, precios/calendario, URL de Google, permisos de testimonios.
2. Sustituir medios provisionales y ajustar tokens de marca si hay paleta oficial.
3. Elegir hosting, configurar dominio y `NEXT_PUBLIC_SITE_URL` en producción.
4. Desplegar, verificar en Search Console (sitemap) y monitorizar indexación.
5. Evaluar tests automatizados y Lighthouse CI.

## 10. Discrepancias doc vs realidad

Ninguna tras la Fase 2. `README.md` y `docs/arquitectura.md` (§10-16) reflejan rutas, stack y decisiones implementados.
