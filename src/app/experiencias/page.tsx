import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import ExperienceCard from "@/components/ExperienceCard";
import SectionHeading from "@/components/SectionHeading";
import { EXPERIENCES, PENDING_EXPERIENCE_FIELDS } from "@/lib/experiences";
import { getFeaturedPosts } from "@/lib/posts";
import { socialMetadata } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const PAGE_DESCRIPTION =
  "Caminatas ecológicas cerca de Medellín: ruta de cascadas, Chorro Blanco en Andes, Cerro Bravo en Fredonia, páramo de Belmira, Santa Elena – Guarne y El Retiro.";

export const metadata: Metadata = {
  title: "Experiencias de senderismo y cascadas",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/experiencias" },
  ...socialMetadata({
    title: "Experiencias de senderismo y cascadas | DeAventura",
    description: PAGE_DESCRIPTION,
    path: "/experiencias",
    image: "/images/cascada-2.jpg",
  }),
};

const GENERAL_WA_URL = waLink(WA_MESSAGES.general);
const PREP_POSTS = getFeaturedPosts(3);

export default function ExperiencesPage() {
  return (
    <>
      <section className="border-arena-200 bg-papel-2 border-b">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Experiencias", path: "/experiencias" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-bosque-900 text-4xl leading-tight font-semibold sm:text-5xl">
              Experiencias y caminatas
            </h1>
            <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
              Estas son algunas de las rutas que hemos recorrido con nuestros
              grupos en Antioquia: cascadas, montaña, bosque y páramo. Cada
              salida se organiza con fechas, grupos y condiciones confirmadas
              directamente por WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((experience) => (
            <li key={experience.slug}>
              <ExperienceCard experience={experience} />
            </li>
          ))}
        </ul>

        <div className="rounded-card border-arena-200 shadow-card mt-14 border bg-white p-6 sm:p-8">
          <SectionHeading
            title="¿Qué confirmamos contigo antes de salir?"
            description="Publicamos solo lo verificado. El detalle operativo de cada ruta lo confirmamos por WhatsApp en el momento de la reserva."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {PENDING_EXPERIENCE_FIELDS.map((field) => (
              <li
                key={field}
                className="text-tinta-suave flex items-start gap-3"
              >
                <span
                  aria-hidden="true"
                  className="bg-tierra-300 mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                />
                {field}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16">
        <SectionHeading
          eyebrow="Prepara tu salida"
          title="Guías del blog para elegir mejor"
          description="Consejos prácticos para preparar tu primera caminata, elegir equipo y organizar el día de la salida."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PREP_POSTS.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="rounded-card border-arena-200 shadow-card hover:shadow-float block border bg-white p-5 transition-shadow"
              >
                <span className="text-bosque-800 block font-semibold">
                  {post.title}
                </span>
                <span className="text-tinta-suave mt-1 block text-sm">
                  {post.description.slice(0, 90)}…
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <CtaSection
          title="¿Te interesa una de estas rutas?"
          description="Escríbenos y te confirmamos fechas disponibles, precio vigente y qué incluye cada salida."
          whatsappHref={GENERAL_WA_URL}
          whatsappLabel="Consultar disponibilidad"
          secondaryHref="/salidas-privadas"
          secondaryLabel="Prefiero un plan privado"
        />
      </section>
    </>
  );
}
