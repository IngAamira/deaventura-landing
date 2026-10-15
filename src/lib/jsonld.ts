import type { Experience } from "@/lib/experiences";
import type { FaqItem } from "@/lib/faq";
import type { Post } from "@/lib/posts";
import { BUSINESS, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Datos estructurados Schema.org.
 *
 * Reglas: solo datos visibles en la página y verificables en las fuentes del
 * negocio. NO se publican `Review` ni `AggregateRating` (Google no muestra
 * estrellas enriquecidas para entidades locales a partir de marcado de la
 * propia página, y hacerlo podría considerarse engañoso).
 */

type JsonLd = Record<string, unknown>;

/** Serializa evitando que el JSON cierre el script en el HTML. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    description:
      "Agencia de caminatas ecológicas, senderismo y turismo responsable en Medellín, Antioquia y Colombia.",
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${BUSINESS.address.street}, ${BUSINESS.address.locality}`,
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      addressCountry: "CO",
    },
    areaServed: [
      { "@type": "City", name: "Medellín" },
      { "@type": "AdministrativeArea", name: "Antioquia" },
      { "@type": "Country", name: "Colombia" },
    ],
    sameAs: [BUSINESS.instagramUrl, BUSINESS.beaconsUrl],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneE164,
      contactType: "reservas",
      availableLanguage: ["es"],
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: Post): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    image: [absoluteUrl(post.cover.src)],
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    inLanguage: "es-CO",
  };
}

export function faqJsonLD(faqs: FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function touristTripJsonLd(experience: Experience): JsonLd {
  const price = experience.price?.amount;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: experience.name,
    description: experience.summary,
    touristType: "Senderismo y turismo de naturaleza",
    url: absoluteUrl(`/experiencias/${experience.slug}`),
    image: absoluteUrl(experience.image.src),
    provider: organizationJsonLd(),
    ...(price !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "COP",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/experiencias/${experience.slug}`),
          },
        }
      : {}),
  };
}
