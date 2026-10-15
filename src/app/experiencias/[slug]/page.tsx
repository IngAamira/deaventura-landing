import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import ExperienceCard from "@/components/ExperienceCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  EXPERIENCE_CATEGORIES,
  EXPERIENCES,
  PENDING_EXPERIENCE_FIELDS,
  getExperience,
  getRelatedExperiences,
} from "@/lib/experiences";
import { serializeJsonLd, touristTripJsonLd } from "@/lib/jsonld";
import { getAllPosts } from "@/lib/posts";
import { socialMetadata } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

type ExperiencePageProps = {
  params: Promise<{ slug: string }>;
};

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return EXPERIENCES.map((experience) => ({ slug: experience.slug }));
}

export async function generateMetadata({
  params,
}: ExperiencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) return {};

  return {
    title: `${experience.name} | Caminata cerca de Medellín`,
    description: experience.summary,
    alternates: { canonical: `/experiencias/${experience.slug}` },
    ...socialMetadata({
      title: `${experience.name} | DeAventura`,
      description: experience.summary,
      path: `/experiencias/${experience.slug}`,
      image: experience.image.src,
    }),
  };
}

export default async function ExperiencePage({ params }: ExperiencePageProps) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();

  const related = getRelatedExperiences(experience.slug, 3);
  const waUrl = waLink(WA_MESSAGES.availability(experience.name));

  // Artículos que mencionan esta experiencia en su frontmatter (enlazado interno).
  const relatedPosts = getAllPosts()
    .filter((post) => (post.relatedExperiences ?? []).includes(experience.slug))
    .slice(0, 2);

  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Experiencias", path: "/experiencias" },
    { name: experience.name, path: `/experiencias/${experience.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(touristTripJsonLd(experience)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <article>
        <header className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
            <div>
              <p className="text-tierra-700 text-sm font-semibold tracking-[0.18em] uppercase">
                {experience.region}
              </p>
              <h1 className="font-display text-bosque-900 mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
                {experience.name}
              </h1>
              <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
                {experience.summary}
              </p>

              <div className="rounded-card border-arena-200 shadow-card mt-7 border bg-white p-5 sm:p-6">
                <p className="text-bosque-900 text-sm font-semibold tracking-wide uppercase">
                  Precio
                </p>
                {experience.price ? (
                  <>
                    <p className="font-display text-bosque-800 mt-2 text-2xl font-semibold">
                      Desde {experience.price.from}
                    </p>
                    <p className="text-tinta-suave mt-2 text-sm leading-relaxed">
                      {experience.price.note}
                    </p>
                  </>
                ) : (
                  <p className="text-tinta-suave mt-2 leading-relaxed">
                    Precio a consultar. Varía según la fecha, el número de
                    participantes y el tipo de salida (grupal o privada).
                  </p>
                )}
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <WhatsAppButton href={waUrl} size="sm">
                    Consultar disponibilidad
                  </WhatsAppButton>
                  <Link
                    href="/salidas-privadas"
                    className="border-bosque-700 text-bosque-800 hover:bg-bosque-50 focus-visible:outline-bosque-700 inline-flex items-center justify-center rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors"
                  >
                    Salida privada
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-card shadow-card relative aspect-4/3 overflow-hidden">
              <Image
                src={experience.image.src}
                alt={experience.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr] lg:gap-14">
            <div>
              <h2 className="font-display text-bosque-900 text-2xl font-semibold">
                La experiencia
              </h2>
              <div className="text-tinta-suave mt-5 space-y-5 leading-relaxed">
                {experience.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <h2 className="font-display text-bosque-900 mt-12 text-2xl font-semibold">
                Lo que se puede esperar
              </h2>
              <ul className="mt-5 space-y-3">
                {experience.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-tinta-suave flex items-start gap-3 leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-bosque-500 mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-card border-arena-200 bg-papel-2 h-fit border p-6">
              <h2 className="font-display text-bosque-900 text-xl font-semibold">
                Detalles que confirmamos por WhatsApp
              </h2>
              <p className="text-tinta-suave mt-3 leading-relaxed">
                Preferimos no publicar datos que no estén verificados. Al
                escribirnos recibes la información exacta de esta ruta:
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {PENDING_EXPERIENCE_FIELDS.map((field) => (
                  <li
                    key={field}
                    className="text-tinta-suave flex items-start gap-3"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-tierra-300 mt-1 h-2 w-2 shrink-0 rounded-full"
                    />
                    {field}
                  </li>
                ))}
              </ul>
              <p className="text-tinta-suave mt-5 text-sm leading-relaxed">
                Categorías:{" "}
                {experience.categories
                  .map((category) => EXPERIENCE_CATEGORIES[category])
                  .join(" · ")}
              </p>
            </aside>
          </div>

          {relatedPosts.length > 0 ? (
            <section className="mt-16">
              <h2 className="font-display text-bosque-900 text-2xl font-semibold">
                Del blog sobre esta salida
              </h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2">
                {relatedPosts.map((post) => (
                  <li key={post.slug}>
                    <ArticleCard
                      post={post}
                      sizes="(max-width: 767px) 100vw, 50vw"
                    />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section className="mt-16">
              <h2 className="font-display text-bosque-900 text-2xl font-semibold">
                Otras experiencias
              </h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <ExperienceCard experience={item} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <CtaSection
          title={`¿Quieres participar en ${experience.name}?`}
          description="Escríbenos por WhatsApp: te confirmamos fechas disponibles, precio vigente y todo lo que necesitas saber antes de salir."
          whatsappHref={waUrl}
          whatsappLabel="Consultar por WhatsApp"
          secondaryHref="/experiencias"
          secondaryLabel="Ver todas las experiencias"
        />
      </section>
    </>
  );
}
