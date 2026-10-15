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
