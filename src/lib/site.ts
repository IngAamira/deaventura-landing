/**
 * Datos centrales del negocio y de la navegación.
 *
 * Fuentes: `docs/Info.md` y `docs/Info-goole-maps.md`. Todo dato marcado como
 * PENDIENTE debe confirmarse con el cliente antes de publicar el sitio.
 */

import type { Metadata } from "next";

export const SITE_NAME = "DeAventura";

/**
 * URL absoluta del sitio. Ver `.env.example`.
 *
 * PENDIENTE: dominio real. En local se usa `http://localhost:3000`; si alguien
 * configura `NEXT_PUBLIC_SITE_URL` apuntando a localhost en un build de
 * producción (p. ej. copiando `.env.example` tal cual), el build falla para
 * evitar canonicals y sitemap rotos.
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (
  process.env.NODE_ENV === "production" &&
  configuredUrl !== undefined &&
  /localhost|127\.0\.0\.1/.test(configuredUrl)
) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL no puede apuntar a localhost en producción: canonical, sitemap y OpenGraph quedarían mal. Configura el dominio real o elimina la variable para build locales.",
  );
}

export const SITE_URL = configuredUrl ?? "http://localhost:3000";

export const DEFAULT_TITLE =
  "DeAventura | Caminatas, senderismo y cascadas cerca de Medellín";
export const DEFAULT_DESCRIPTION =
  "Caminatas ecológicas, senderismo y turismo responsable en Medellín, Antioquia y Colombia. Salidas grupales y privadas a cascadas, ríos y montañas con guías que conocen el territorio.";

export const BUSINESS = {
  name: SITE_NAME,
  /** Categoría de la ficha de Google del cliente. */
  category: "Agencia de visitas turísticas",
  /** PENDIENTE de confirmación: tomado de la ficha de Google recopilada. */
  phoneDisplay: "+57 311 7800788",
  phoneE164: "+573117800788",
  whatsappNumber: "573117800788",
  /** PENDIENTE de confirmación: tomado de la ficha de Google recopilada. */
  address: {
    street: "Cra. 44 #19A-100",
    locality: "El Poblado",
    city: "Medellín",
    region: "Antioquia",
    country: "Colombia",
  },
  /**
   * Búsqueda verificable de la ficha en Google Maps. PENDIENTE: sustituir por
   * la URL directa del perfil cuando el cliente la confirme (no se publica un
   * identificador de lugar que no haya sido verificado).
   */
  googleMapsUrl:
    "https://www.maps.google.com/?q=DEAVENTURA%20Medell%C3%ADn%20Antioquia",
  /** PENDIENTE de confirmación: el handle aparece en reseñas del propio cliente. */
  instagramUrl: "https://www.instagram.com/deaventuraal100/",
  /** Perfil actual del negocio mientras se define el dominio definitivo. */
  beaconsUrl: "https://beacons.ai/deaventuraal100",
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram de DeAventura", href: BUSINESS.instagramUrl },
] as const;

export const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Experiencias", href: "/experiencias" },
  { label: "Salidas privadas", href: "/salidas-privadas" },
  { label: "Blog", href: "/blog" },
  { label: "Reseñas", href: "/resenas" },
  { label: "Contacto", href: "/contacto" },
] as const;

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

type SocialMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

/**
 * Metadatos sociales (OpenGraph + Twitter) por página.
 *
 * El objeto `openGraph` de una ruta sustituye por completo al del layout, así
 * que este helper siempre incluye `siteName`, `locale` e `images` para que
 * ninguna página comparta una tarjeta incompleta o la de la home.
 */
export function socialMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SocialMetadataInput): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absoluteUrl(path);
  const images = image
    ? [absoluteUrl(image)]
    : [absoluteUrl("/opengraph-image")];

  return {
    openGraph: {
      type,
      locale: "es_CO",
      siteName: SITE_NAME,
      url,
      title,
      description,
      images,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
