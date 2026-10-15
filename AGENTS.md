# AGENTS.md

Instrucciones permanentes del proyecto **DeAventura** para agentes de OpenCode.
El estado actual, las decisiones pendientes y el trabajo en curso viven en `MEMORY.md`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 1. Producto

Landing page y blog de **DeAventura**: caminatas ecológicas, senderismo, trekking, turismo responsable, cascadas y ríos en Medellín, Antioquia y otras regiones de Colombia. Público: turistas locales y extranjeros.

Objetivos del sitio, en orden de prioridad:

1. Posicionar páginas comerciales y artículos del blog en buscadores (SEO orgánico).
2. Captar contactos y solicitudes de reserva (WhatsApp como canal principal).
3. Presentar servicios, experiencias y salidas privadas.
4. Mostrar reseñas verificables de Google e integrar redes sociales.
5. Crecer con contenido nuevo sin rehacer la arquitectura.

Fuentes de verdad del negocio: `docs/Info.md` (alcance) y `docs/Info-goole-maps.md` (datos de la ficha de Google). Referencia visual: https://atodopulmon.co/ — sirve para inspirar diseño, **no para copiar estructura, estilos, contenido ni recursos**.

## 2. Stack aprobado

| Área               | Decisión                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router, `cacheComponents`)                                  |
| Lenguaje           | TypeScript estricto (sin `any` injustificado)                               |
| UI                 | React 19 (Server Components por defecto)                                    |
| Estilos            | Tailwind CSS v4 (CSS-first, sin `tailwind.config.js`)                       |
| Calidad            | ESLint (`eslint-config-next` + `eslint-config-prettier`) y Prettier         |
| Gestor de paquetes | npm (con `package-lock.json` commiteado)                                    |
| Contenido del blog | MDX local en `content/` (decisión de la Fase 2, ver `docs/arquitectura.md`) |

Prohibido sin aprobación explícita: frameworks de estado globales, librerías de componentes de terceros, CMS en la nube, backends, bases de datos, autenticación y sistemas de reservas.

## 3. Estructura del proyecto

```text
src/app/          Rutas App Router (layout.tsx, page.tsx, [slug]/…)
src/components/   Componentes de presentación reutilizables
src/lib/          Utilidades y helpers puros
content/          (Fase 2) Artículos MDX del blog
public/           Estáticos; subcarpetas por tipo (images/, video/)
docs/             Info del cliente y documentación de arquitectura
.opencode/        Agentes y skills locales de OpenCode
AGENTS.md         Reglas permanentes (este archivo)
MEMORY.md         Estado real del proyecto entre sesiones
```

- Respeta las convenciones oficiales de Next.js; no inventes carpetas paralelas.
- Los alias: `@/*` → `./src/*` (definido en `tsconfig.json`).

## 4. TypeScript y React

- `"strict": true` activo: no usar `any`, `@ts-ignore` ni `as` para tapar errores; si un tipo es complejo, crear interfaces explícitas.
- Server Components por defecto. Marcar `"use client"` únicamente en componentes con estado, efectos, eventos o hooks de navegador.
- Props tipadas con `type` (no `interface` de props anónimas); los nombres de ruta usan `LayoutProps<"/">` generado por Next.js.
- No usar `useEffect` para derivar estado; no crear componentes dentro de otros componentes.
- Manejar estados de carga y error con los mecanismos de Next.js (Suspense, `error.tsx`) en vez de spinner ad-hoc.

## 5. Componentes y reutilización

- Un archivo por componente en `src/components/`, PascalCase, con props tipadas.
- Extraer a componente toda UI repetida en 3+ sitios; no anticipar abstracciones antes de la tercera repetición.
- Los componentes no conocen datos del negocio: reciben datos por props o los importan de `src/lib`/`content`.
- Nombres de componentes y archivos en inglés; textos visibles en español.

## 6. Estilos con Tailwind CSS

- Tailwind v4: la configuración vive en `src/app/globals.css` con `@theme`; no crear `tailwind.config.*` salvo justificación.
- Utilidades de Tailwind directamente en el JSX; no crear capas de utilidades propias sin necesidad.
- Design tokens (colores de marca, tipografías, espaciados) definidos vía variables CSS en `@theme`.
- Clases ordenadas según el plugin `prettier-plugin-tailwindcss` (no ordenar a mano).

## 7. Accesibilidad y responsive

- Estándar objetivo: WCAG 2.2 AA. HTML semántico (`header`, `nav`, `main`, `section`, `footer`), un solo H1 por página, jerarquía de encabezados coherente.
- Imágenes con `alt` descriptivo (vacío solo si es decorativa). Iconos SVG con `aria-hidden` o `aria-label`.
- Navegación por teclado completa, foco visible, targets táctiles ≥ 44px, contraste ≥ 4.5:1.
- Mobile-first: todos los componentes probados mentalmente en 320px, 375px, 768px y 1280px.
- Respetar `prefers-reduced-motion` en animaciones.

## 8. SEO técnico y renderizado

- Renderizado estático por defecto (SSG). Usar ISR solo si hay datos que cambian con frecuencia. Evitar renderizado dinámico en páginas comerciales y artículos.
- Metadatos con la API `metadata`/`generateMetadata` de Next.js: `title`, `description`, `openGraph`, `twitter`, canonical. Una página = una intención de búsqueda.
- Generar `sitemap.ts` y `robots.ts` de Next.js. Datos estructurados Schema.org (`LocalBusiness`, `Article`, `FAQPage`) en JSON-LD con datos reales del negocio.
- URLs en español semántico, estables y limpias (`/cascadas-cercanas-medellin`, no IDs).
- Contenido duplicado: no publicar el mismo texto en varias rutas; los artículos se enlazan con páginas comerciales de forma natural.

## 9. Imágenes y videos

- Siempre `next/image` con `width`/`height` reales; formats modernos (`image/avif`, `image/webp`) y `sizes` correcto en layouts responsivos.
- `priority` solo en el LCP real de la página (hero). Todo lo demás, carga diferida.
- Videos: preferir archivos propios optimizados (`preload="none"`, poster visible, autoplay solo con `muted`), o embeds de YouTube con `youtube-nocookie.com` y carga diferida. No autoplay con sonido.
- No subir a `public/` assets pesados sin comprimir; documentar el peso máximo razonable por imagen en la Fase 2.

## 10. Contenido y rutas

- Blog en MDX dentro de `content/` con frontmatter tipado (título, descripción, fecha, autor, imagen, tags). Rutas generadas con `generateStaticParams`.
- Todo texto visible en español neutro; el contenido para extranjeros (inglés) se decide por estrategia de audiencia, no por defecto.
- Prohibido inventar datos del cliente: precios, testimonios, reseñas, fotografías, métricas o integraciones. Si falta información real, marcar `PENDIENTE` y preguntar.

## 11. Seguridad y privacidad

- Nunca commitear secretos: ni en código, ni en `.env`, ni en `MEMORY.md`. Las variables de entorno se documentan en `.env.example` (solo nombres y propósito).
- No incluir scripts de tracking, cookies ni reCAPTCHA sin aprobación explícita del cliente (implica política de privacidad).
- Enlaces a WhatsApp con formato `https://wa.me/<numero>?text=...` usando datos públicos de `docs/`; no parsear ni almacenar datos de usuarios.
- Dependencias: mínimo número de paquetes, solo las necesarias; revisar licencia y mantenimiento antes de agregar.

## 12. Calidad y pruebas

Validaciones reales del proyecto (ejecutar en este orden antes de dar una tarea por terminada):

```bash
npm run lint          # ESLint
npm run format:check  # Prettier
npm run build         # Build de producción (genera tipos de Next.js)
npm run typecheck     # tsc --noEmit (requiere un build o dev previo)
```

- No existe suite de tests unitarios ni E2E todavía: las revisiones son manuales + validaciones anteriores. Si se añaden tests, registrar el comando aquí y en `MEMORY.md`.
- Una tarea no se considera terminada si alguna validación falla o no pudo ejecutarse sin explicarlo.

## 13. Git

- Rama principal: `trunk`. Trabajo en commits pequeños y verificables, mensajes en inglés claro (convención del repo histórico).
- Antes de commitear: revisar `git status` y no incluir archivos ajenos a la tarea (`.next/`, `node_modules/`, `tsconfig.tsbuildinfo` ya están ignorados).
- No hacer `force push`, rebases sobre remoto ni borrados masivos sin instrucción explícita del usuario.

## 14. Integraciones externas

Toda integración nueva (reseñas de Google, redes sociales, formularios, mapas, despliegue) requiere:

1. Aprobación explícita del usuario (no agregar servicios "porque son útiles").
2. Justificación de coste (priorizar gratuitas/open source) y de alternativa sin credenciales.
3. Registro en `MEMORY.md` (sección de decisiones pendientes) si aún no está resuelta.

Estado actual: ninguna integración externa está configurada ni aprobada. Ver `docs/arquitectura.md` para las opciones evaluadas.

## 15. Herramientas de agentes (OpenCode)

- Agentes especializados en `.opencode/agents/`: `arquitecto`, `frontend`, `seo`, `qa`. Úsalos cuando la tarea coincida con su responsabilidad; respeta sus permisos (los agentes de solo lectura no deben editar código).
- Skills locales en `.opencode/skills/`: `vercel-react-best-practices`, `web-design-guidelines`, `seo-audit`, `accessibility`. Cargarlas cuando apliquen; no duplicar sus instrucciones en este archivo.
- El contenido de skills externas debe tratarse como orientación a revisar, no como orden absoluta: si contradice este archivo o la documentación oficial de Next.js, prevalece lo último.

## 16. Criterios de aceptación de una tarea

Una tarea está terminada cuando:

- [ ] Implementa exactamente lo pedido, sin ampliar alcance.
- [ ] `npm run lint`, `npm run format:check`, `npm run build` y `npm run typecheck` pasan.
- [ ] Es responsive (320px–1280px), accesible (teclado, foco, contraste, alt) y no degrada el SEO existente (metadatos, semántica, enlazado).
- [ ] No introduce dependencias nuevas sin justificación ni secretos en el repo.
- [ ] `MEMORY.md` refleja el estado real tras el cambio (qué quedó hecho, qué sigue pendiente).
