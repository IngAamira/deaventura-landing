# Arquitectura técnica — DeAventura

Documento de decisiones de la **Fase 1** (preparación del entorno). Las decisiones aquí registradas son las aprobadas; lo que aparece como `PENDIENTE` requiere decisión del cliente o de la Fase 2.

Fecha de decisión: octubre 2026. Versión de entorno verificada: Node.js v26.10.0, npm 11.19.1, OpenCode v2.0.24.

## 1. Contexto y criterios de decisión

Sitio comercial + blog para DeAventura (caminatas ecológicas en Medellín). Criterios, por orden de prioridad:

1. **SEO**: posicionar páginas comerciales y artículos en buscadores (criterio prioritario del cliente).
2. **Rendimiento móvil**: la web será visitada desde telófonos, muchas veces con conexión móvil desde el exterior.
3. **Mantenimiento por un desarrollador único** y coste operativo ~0.
4. Facilidad para publicar artículos con regularidad.
5. Escalabilidad futura (más experiencias, más rutas, posible multi-idioma).

Restricción explícita: sin backend, base de datos, autenticación, CMS externo ni sistema de reservas en la primera versión.

## 2. Framework: alternativas evaluadas

| Criterio | React + Vite (SPA) | **Next.js 16 (App Router)** | Astro |
|---|---|---|---|
| SEO / renderizado | HTML llega vacío desde JS; depende de prerender frágil | HTML estático nativo (SSG/ISR), metadata API, sitemap/robots incluidos | Excelente estático, pero ecosistema React menos directo |
| Rendimiento móvil | Bueno, pero todo el bundle es cliente | Server Components: JS cliente mínimo | Muy bueno |
| Complejidad | Mínima | Media (rutas, servidor) | Baja-media |
| Despliegue | Cualquier CDN estático | Vercel (nativo) o Node/estático en otras plataformas | Cualquier CDN |
| Coste | 0 | 0 (tier gratuito) | 0 |
| Mantenimiento individual | Fácil | Fácil con convenciones documentadas | Fácil |
| Publicar artículos | Hay que montar infraestructura a medida | MDX + `generateStaticParams` nativo | MDX nativo |
| Escalabilidad funcional | Limitada (todo cliente) | Alta (API routes, ISR, multi-idioma) | Media |

**Decisión: Next.js 16 (App Router) + React 19 + TypeScript estricto + Tailwind CSS v4.**
Motivo: es la única opción que resuelve el criterio prioritario (HTML real indexable + metadatos + sitemap) sin infraestructura extra, con el mismo coste que una SPA y manteniendo el rendimiento móvil. Astro se descarta por ahora por añadir un segundo paradigma de componentes sin necesidad; se puede reconsiderar si el blog crece y las páginas comerciales se estabilizan.

Generación estática por defecto (`cacheComponents` activo en `next.config.ts`). ISR y dynamic rendering solo si aparece un dato real que lo exija.

## 3. Contenido del blog

| Opción | Ventaja | Coste / riesgo | Decisión |
|---|---|---|---|
| **MDX local en `content/`** | Versionado en git, sin servicios, build estático | Editar = commit (o CMS headless después) | **Elegida para la Fase 2** |
| CMS git-based (Decap, Keystatic) | UI de edición para el cliente | Dependencia extra, complejidad inicial | Posible evolución, no ahora |
| CMS SaaS (Sanity, Contentful, Notion) | Edición no técnica | Coste/servicio externo, credenciales, lock-in | Descartada por ahora (restricción de alcance) |

## 4. Reseñas de Google

Requisito del cliente: mostrar reseñas verificables, con sección dedicada.

| Opción | Comentario | Estado |
|---|---|---|
| **Selección manual curada** desde la ficha de Google (datos en `docs/Info-goole-maps.md`) | Sin coste ni API; se publica como contenido estático verificable con enlace a la ficha | Recomendación técnica para v1 |
| Google Places API (nueva) | Oficial, pero limita el número de reseñas, requiere API key y cuenta de facturación | PENDIENTE de aprobación y credenciales |
| Widgets de terceros (Elfsight, Trustpilot…) | Rápidos, pero de pago, añaden JS de terceros (penaliza rendimiento) | Descartados salvo petición explícita |

## 5. Contacto, redes y medios

- **WhatsApp**: enlaces `wa.me` directos con mensaje predefinido. Sin credenciales, sin backend. Aprobado.
- **Redes sociales**: enlaces/embeds oficiales; cargar embeds de Instagram/TikTok solo de forma diferida (penalizan rendimiento). Aprobado en principio, detalle en Fase 2.
- **Fotografía y vídeo**: alojamiento propio en `public/` (optimizados) + `next/image`; vídeos propios o embeds `youtube-nocookie` diferidos. Requiere que el cliente entregue los archivos.

## 6. Despliegue

`PENDIENTE` de decisión del cliente. Opciones evaluadas: Vercel (integración nativa con Next.js, tier gratuito), Netlify, Cloudflare Pages, VPS (más control, más mantenimiento). No se configura ninguna plataforma en esta fase.

## 7. Herramientas de calidad incorporadas

| Herramienta | Propósito | Comando |
|---|---|---|
| ESLint (`eslint-config-next` + `eslint-config-prettier`) | Reglas React/Next/a11y, sin conflicto con formateo | `npm run lint` |
| Prettier + `prettier-plugin-tailwindcss` | Formateo y orden de clases | `npm run format` / `format:check` |
| TypeScript (`tsc --noEmit`) | Verificación de tipos (requiere build/dev previo para tipos generados de Next.js) | `npm run typecheck` |
| Next.js build | Compilación + generación estática completa | `npm run build` |

No se incorporan en esta fase: framework de tests (sin código que testear todavía), Lighthouse CI ni axe (se evaluarán en la Fase 2 cuando exista UI real; el agente `qa` cubre la revisión manual inicial).

## 8. Entorno de agentes (OpenCode v2)

- `opencode.jsonc` local: permisos (bloquea `npm publish`, pide confirmación para `git push` y Git destructivo) e ignorados del watcher.
- Agentes en `.opencode/agents/`: `arquitecto` (solo lectura), `frontend` (implementación), `seo` (auditoría y contenido), `qa` (validación, solo lectura).
- Skills externas verificadas e instaladas localmente (origen en `skills-lock.json`): `vercel-react-best-practices` (Vercel), `web-design-guidelines` (Vercel), `seo-audit` (Corey Haines), `accessibility` (Addy Osmani / web-quality-skills). Contenido revisado antes de instalar; son instrucciones Markdown sin scripts ejecutables.

## 9. Pendientes que bloquean la Fase 2

1. Entrega de fotografía y vídeo por parte del cliente (con derechos de uso).
2. Decisión sobre reseñas: curado manual (recomendado) vs Places API (requiere cuenta de facturación de Google Cloud).
3. Plataforma de despliegue y dominio definitivo.
4. Definir si habrá versión en inglés (afecta a hreflang y estrategia de contenido).

---

# Decisiones de la Fase 2 (implementación)

Fecha: octubre de 2026. Decisiones tomadas con el usuario durante el desarrollo.

## 10. URL canónica y variables de entorno

- `NEXT_PUBLIC_SITE_URL` (única variable, documentada en `.env.example`) alimenta el canonical, el sitemap, Open Graph y JSON-LD. Sin ella se usa `http://localhost:3000`. **PENDIENTE**: dominio definitivo.
- No se ha publicado ningún identificador de Google Maps ni URL de reseñas no verificado: el enlace al perfil usa la búsqueda documentada de Google Maps hasta que el cliente confirme la URL directa.

## 11. Fotografía

- Decisión del usuario: **stock descargado a `public/images/`** (Unsplash/Pexels, licencia de uso libre) **más `remotePatterns` habilitados** para `images.unsplash.com` y `images.pexels.com` por si se hotlinkea material puntual.
- Todas las imágenes se presentan como provisionales (texto alternativo y avisos en la web). Fuente y licencia de cada archivo: `public/images/SOURCES.md`.
- El hero usa `next/image` con `priority` y `sizes="100vw"`; el resto se carga diferido. No hay video en v1 (pendiente de material del cliente).

## 12. Blog con MDX

- Dependencias añadidas (justificadas por la decisión de la Fase 1 §3): `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `remark-frontmatter`, más `gray-matter` para leer el frontmatter en los listados.
- `remark-frontmatter` elimina el bloque YAML del render; no se usa `remark-mdx-frontmatter` (los datos se leen por separado con `gray-matter` en `src/lib/posts.ts`, con validación que falla el build si el frontmatter es inválido).
- Artículos en `content/posts/*.mdx`; alias `@content/*` añadido a `tsconfig.json` para importarlos con rutas limpias.
- Tipografía del artículo con estilos propios (`.prose` en `globals.css`) sin el plugin `@tailwindcss/typography`: una dependencia menos.

## 13. Reseñas y confianza

- Curado manual (opción recomendada en la Fase 1): transcripciones literales en `src/lib/reviews.ts`, con enlace al perfil de Google para verificación y aviso de que no hay sincronización en vivo.
- **No se publica `Review` ni `AggregateRating`** en JSON-LD (políticas de Google para entidades locales). Sí `TravelAgency`, `BreadcrumbList`, `BlogPosting` y `FAQPage` con datos visibles en la página.

## 14. Formularios y conversión

- No hay backend: el formulario de `/salidas-privadas` valida en cliente y **abre WhatsApp con el mensaje compuesto** (`wa.me`). No se simula ningún envío ni se almacena ningún dato.
- Botón flotante de WhatsApp con espacio reservado en el `main` (`pb-24`) para no tapar contenido.

## 15. Internacionalización (pendiente)

- La v1 es solo en español (`lang="es-CO"`, metadatos en español). Arquitectura preparada: rutas y contenido sin prefijo de idioma, textos centralizados en `src/lib` y contenido en `content/`.
- Para añadir inglés: mover las páginas a `app/[locale]/...` (o añadir `app/en/...`), servir `content/en/posts/*.mdx`, traducir `src/lib/site.ts` y los textos de secciones, añadir `alternates.languages` (hreflang es/en) y mantener equivalencia 1:1 de URLs. No traducir contenido operativo sin validación del cliente.

## 16. Despliegue (pendiente)

- Sin cambios: sigue sin plataforma elegida. El sitio es 100 % estático (SSG) y funciona en Vercel/Netlify/Cloudflare Pages sin adaptaciones; solo hay que configurar `NEXT_PUBLIC_SITE_URL` en la plataforma.

## 17. QA de la Fase 2 y limitaciones conocidas

Verificaciones ejecutadas (2026-10-15): `lint`, `format:check`, `build`, `typecheck` y un QA automatizado sobre `next start` (jsdom + axe-core WCAG 2.2 A/AA en 26 rutas, JSON-LD parseable, H1 único, `alt`, enlaces internos, `/_next/image`, sitemap/robots y404 propia) sin hallazgos. Auditorías posteriores de SEO y frontend incorporaron correcciones: tarjetas sociales propias por página (helper `socialMetadata`), `NEXT_PUBLIC_SITE_URL` protegida contra localhost en producción, `og:image` en artículos y experiencias, FAQPage en `/contacto`, enlazado comercial ↔ blog (campo `relatedExperiences` en el frontmatter), NAP en E.164, `offers` de `TouristTrip` solo con precio verificado, categorías del blog `noindex` hasta tener ≥3 artículos, foco visible con contraste, targets ≥ 44 px, `lang="en"` en reseñas inglesas, AVIF + `sizes` corregidos y `priority` solo en el LCP real.

Limitaciones conocidas (comportamiento, no bugs):

- **Rutas dinámicas inexistentes sin JS**: `/blog/slug-inexistente` devuelve `404` + `noindex` correctos, pero el HTML es el shell de error y la página 404 propia se pinta con JavaScript. Es el comportamiento de Next 16 con `cacheComponents` + `ensureStatic` (no existe HTML prerenderizado para params no listados). Las rutas de primer nivel (`/xyz`) sí sirven la404 prerenderizada.
- **Categorías del blog en `noindex`** hasta que cada una tenga al menos tres artículos; se reactiva quitando `robots` en `src/app/blog/categoria/[categoria]/page.tsx` y reinsertándolas en `sitemap.ts`.
- **`publisher.logo` del `BlogPosting`** pendiente hasta que el cliente entregue logo (no se publica un asset que no existe).
- **Pendiente de refactor (deuda menor)**: extraer un componente `PageHeader` para la cabecera de sección repetida en seis páginas; el resto de duplicaciones detectadas ya se resolvieron (icono de WhatsApp compartido, enlaces del pie con clase común).
