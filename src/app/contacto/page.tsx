import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import FaqSection from "@/components/FaqSection";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FAQS } from "@/lib/faq";
import { faqJsonLD, serializeJsonLd } from "@/lib/jsonld";
import { BUSINESS, socialMetadata } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const PAGE_DESCRIPTION =
  "Contacta a DeAventura por WhatsApp o teléfono, visita nuestra ubicación en El Poblado, Medellín, o síguenos en Instagram.";

export const metadata: Metadata = {
  title: "Contacto y reservas",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/contacto" },
  ...socialMetadata({
    title: "Contacto y reservas | DeAventura",
    description: PAGE_DESCRIPTION,
    path: "/contacto",
  }),
};

const GENERAL_WA_URL = waLink(WA_MESSAGES.general);
const ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.city}, ${BUSINESS.address.region}`;
const CONTACT_FAQS = FAQS.filter(
  (faq) =>
    faq.question.includes("reservo") ||
    faq.question.includes("punto de encuentro") ||
    faq.question.includes("privadas"),
);

const CHANNELS = [
  {
    title: "WhatsApp",
    description:
      "El canal más rápido para consultar fechas, precios y reservar.",
    href: GENERAL_WA_URL,
    label: BUSINESS.phoneDisplay,
    external: true,
  },
  {
    title: "Teléfono",
    description: "Si prefieres una llamada, escríbenos o llámanos directo.",
    href: `tel:${BUSINESS.phoneE164}`,
    label: BUSINESS.phoneDisplay,
    external: false,
  },
  {
    title: "Ubicación",
    description: ADDRESS_LINE,
    href: BUSINESS.googleMapsUrl,
    label: "Ver en Google Maps",
    external: true,
  },
  {
    title: "Instagram",
    description: "Fotos de las salidas y novedades de las próximas caminatas.",
    href: BUSINESS.instagramUrl,
    label: "@deaventuraal100",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqJsonLD(CONTACT_FAQS)),
        }}
      />

      <section className="border-arena-200 bg-papel-2 border-b">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Contacto", path: "/contacto" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-bosque-900 text-4xl leading-tight font-semibold sm:text-5xl">
              Contacto y reservas
            </h1>
            <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
              Reservamos y resolvemos dudas por WhatsApp. También puedes
              llamarnos o encontrarnos en El Poblado, Medellín.
            </p>
            <div className="mt-8">
              <WhatsAppButton href={GENERAL_WA_URL}>
                Escribir por WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <SectionHeading
          eyebrow="Canales"
          title="Elige cómo contactarnos"
          description="Los datos de contacto provienen de nuestra ficha de Google; confírmalos con el equipo si necesitas soporte urgente."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {CHANNELS.map((channel) => (
            <li
              key={channel.title}
              className="rounded-card border-arena-200 shadow-card border bg-white p-6"
            >
              <h2 className="font-display text-bosque-900 text-xl font-semibold">
                {channel.title}
              </h2>
              <p className="text-tinta-suave mt-2 leading-relaxed">
                {channel.description}
              </p>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="text-bosque-700 mt-4 inline-flex font-semibold underline-offset-4 hover:underline"
              >
                {channel.label}
                {channel.external ? (
                  <span className="sr-only">
                    {" "}
                    (se abre en una pestaña nueva)
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-papel-2">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <SectionHeading
            eyebrow="Dudas rápidas"
            title="Preguntas de contacto y reservas"
          />
          <FaqSection items={CONTACT_FAQS} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <CtaSection
          title="Listo para caminar"
          description="Cuéntanos cuántos son, qué fecha tienen en mente y qué tipo de paisaje buscan. Te respondemos con una propuesta."
          whatsappHref={GENERAL_WA_URL}
          whatsappLabel="Solicitar información"
          secondaryHref="/experiencias"
          secondaryLabel="Ver experiencias"
        />
      </section>
    </>
  );
}
