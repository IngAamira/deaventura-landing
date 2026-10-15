import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import ReviewsSection from "@/components/ReviewsSection";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { EXPERIENCES } from "@/lib/experiences";
import { getReviewsByContext } from "@/lib/reviews";
import { socialMetadata } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const PAGE_DESCRIPTION =
  "Excursiones privadas de senderismo para familias, amigos, equipos de trabajo y visitantes internacionales en Medellín y Antioquia. Solicita tu cotización.";

export const metadata: Metadata = {
  title: "Salidas privadas y planes a la medida",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/salidas-privadas" },
  ...socialMetadata({
    title: "Salidas privadas y planes a la medida | DeAventura",
    description: PAGE_DESCRIPTION,
    path: "/salidas-privadas",
    image: "/images/grupo-excursionistas.jpg",
  }),
};

const PRIVATE_WA_URL = waLink(WA_MESSAGES.privateOuting);
const privateReviews = getReviewsByContext("privadas");

const PRIVATE_OPTIONS = [
  {
    title: "Familias",
    description:
      "Rutas adecuadas al ritmo del grupo, con acompañamiento cercano para personas de distintas edades.",
  },
  {
    title: "Amigos y grupos",
    description:
      "Una fecha, un destino y un plan armado para ustedes: sin depender de las fechas de las salidas abiertas.",
  },
  {
    title: "Equipos de trabajo",
    description:
      "Jornadas de naturaleza para convivir fuera de la oficina, con logística resuelta de principio a fin.",
  },
  {
    title: "Visitantes internacionales",
    description:
      "Salidas desde Medellín con guías que explican la historia y el paisaje; podemos acompañar en inglés según disponibilidad.",
  },
];

export default function PrivateToursPage() {
  return (
    <>
      <section className="border-arena-200 bg-papel-2 border-b">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Salidas privadas", path: "/salidas-privadas" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-bosque-900 text-4xl leading-tight font-semibold sm:text-5xl">
              Salidas privadas y planes a la medida
            </h1>
            <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
              Si prefieres no esperar a las salidas abiertas, armamos una
              experiencia para tu grupo: definimos juntos el destino, la fecha y
              el ritmo, y nos encargamos de la logística.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14">
          <div className="rounded-card shadow-card relative order-2 aspect-3/2 overflow-hidden lg:order-1">
            <Image
              src="/images/grupo-excursionistas.jpg"
              alt="Grupo de amigos caminando juntos por un sendero (imagen provisional de stock)"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Para tu grupo"
              title="¿Para quién organizamos la salida?"
            />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {PRIVATE_OPTIONS.map((option) => (
                <li
                  key={option.title}
                  className="rounded-card border-arena-200 shadow-card border bg-white p-6"
                >
                  <h3 className="font-display text-bosque-900 text-lg font-semibold">
                    {option.title}
                  </h3>
                  <p className="text-tinta-suave mt-2 text-sm leading-relaxed">
                    {option.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <SectionHeading
          eyebrow="Prepara tu salida"
          title="Ideas y guías para tu grupo"
          description="Antes de cotizar, estas lecturas te ayudan a decidir qué tipo de salida encaja mejor con tu grupo."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li>
            <Link
              href="/blog/como-organizar-salida-privada"
              className="rounded-card border-arena-200 shadow-card hover:shadow-float block border bg-white p-5 transition-shadow"
            >
              <span className="text-bosque-800 block font-semibold">
                Cómo organizar una salida privada
              </span>
              <span className="text-tinta-suave mt-1 block text-sm">
                Guía práctica para definir grupo, ruta y fechas.
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/experiencias/ruta-de-las-cascadas"
              className="rounded-card border-arena-200 shadow-card hover:shadow-float block border bg-white p-5 transition-shadow"
            >
              <span className="text-bosque-800 block font-semibold">
                Ruta de las cascadas
              </span>
              <span className="text-tinta-suave mt-1 block text-sm">
                Nuestra salida más pedida, adaptable a grupos privados.
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/experiencias/santa-elena-guarne"
              className="rounded-card border-arena-200 shadow-card hover:shadow-float block border bg-white p-5 transition-shadow"
            >
              <span className="text-bosque-800 block font-semibold">
                Travesía Santa Elena – Guarne
              </span>
              <span className="text-tinta-suave mt-1 block text-sm">
                Para grupos con experiencia que buscan jornada completa.
              </span>
            </Link>
          </li>
        </ul>
      </section>

      <section className="bg-papel-2">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Cotización"
                title="Cuéntanos qué necesitas"
                description="Al enviar el formulario se abre WhatsApp con tu solicitud lista para enviar. No guardamos tus datos en este sitio."
              />
              <div className="rounded-card border-arena-200 shadow-card mt-10 border bg-white p-6 sm:p-8">
                <ContactForm
                  experienceOptions={EXPERIENCES.map(
                    (experience) => experience.name,
                  )}
                  extraOptions={["Plan a la medida"]}
                />
              </div>
            </div>

            <aside className="space-y-8">
              <div className="rounded-card border-arena-200 shadow-card border bg-white p-6">
                <h2 className="font-display text-bosque-900 text-xl font-semibold">
                  ¿Prefieres hablar ahora?
                </h2>
                <p className="text-tinta-suave mt-3 leading-relaxed">
                  Escríbenos directo por WhatsApp y resolvemos la cotización en
                  el chat, sin formularios.
                </p>
                <div className="mt-5">
                  <WhatsAppButton href={PRIVATE_WA_URL} size="sm">
                    Cotizar por WhatsApp
                  </WhatsAppButton>
                </div>
              </div>

              <div className="rounded-card border-arena-200 shadow-card border bg-white p-6">
                <h2 className="font-display text-bosque-900 text-xl font-semibold">
                  ¿Cómo funciona?
                </h2>
                <ol className="text-tinta-suave mt-4 space-y-4 text-sm leading-relaxed">
                  <li>
                    <span className="text-bosque-800 font-semibold">
                      1. Nos cuentas tu plan.
                    </span>{" "}
                    Fechas tentativas, número de personas y tipo de paisaje que
                    buscan.
                  </li>
                  <li>
                    <span className="text-bosque-800 font-semibold">
                      2. Te proponemos la ruta.
                    </span>{" "}
                    Con duración, nivel de exigencia, punto de encuentro y qué
                    incluye.
                  </li>
                  <li>
                    <span className="text-bosque-800 font-semibold">
                      3. Confirmamos y salimos.
                    </span>{" "}
                    Se cierra la reserva por WhatsApp y te enviamos las
                    recomendaciones de la salida.
                  </li>
                </ol>
              </div>
            </aside>
          </div>

          {privateReviews.length > 0 ? (
            <div className="mt-16">
              <SectionHeading
                eyebrow="Grupos que ya salieron con nosotros"
                title="Reseñas de salidas privadas"
              />
              <div className="mt-8">
                <ReviewsSection reviews={privateReviews} hideSummary />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
