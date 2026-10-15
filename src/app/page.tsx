import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import CtaSection from "@/components/CtaSection";
import ExperienceCard from "@/components/ExperienceCard";
import FaqSection from "@/components/FaqSection";
import GallerySection, { type GalleryImage } from "@/components/GallerySection";
import Hero from "@/components/Hero";
import ReviewsSection from "@/components/ReviewsSection";
import SectionHeading from "@/components/SectionHeading";
import WhatsAppButton from "@/components/WhatsAppButton";
import { EXPERIENCES } from "@/lib/experiences";
import { FAQS } from "@/lib/faq";
import { faqJsonLD, serializeJsonLd } from "@/lib/jsonld";
import { getFeaturedPosts } from "@/lib/posts";
import { RATING_SNAPSHOT, REVIEWS } from "@/lib/reviews";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, socialMetadata } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "DeAventura | Caminatas, senderismo y cascadas cerca de Medellín",
  description:
    "Caminatas ecológicas y senderismo en Medellín y Antioquia: cascadas, ríos y montañas con guías que conocen el territorio. Salidas grupales y privadas.",
  alternates: { canonical: "/" },
  ...socialMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
    image: "/images/hero-cascada.jpg",
  }),
};

const GENERAL_WA_URL = waLink(WA_MESSAGES.general);

const BENEFITS = [
  {
    title: "Acompañamiento durante toda la ruta",
    description:
      "Los guías avanzan con el grupo, se adaptan al ritmo y están pendientes en cada tramo del recorrido.",
  },
  {
    title: "Organización y puntualidad",
    description:
      "Itinerarios preparados con antelación y salidas a tiempo, según describen nuestros participantes.",
  },
  {
    title: "Guías que conocen el territorio",
    description:
      "Historia, flora y fauna explicadas por personas que recorren estos caminos con frecuencia.",
  },
  {
    title: "Hechas para quien empieza",
    description:
      "Recibimos con paciencia a quienes hacen su primera caminata y explicamos qué esperar antes de salir.",
  },
  {
    title: "Grupos y planes privados",
    description:
      "Salidas abiertas para conocer gente y salidas privadas para familias, amigos o equipos de trabajo.",
  },
  {
    title: "Turismo responsable",
    description:
      "Cuidamos los senderos, el agua y la fauna: dejamos el lugar como lo encontramos.",
  },
  {
    title: "Nuevos lugares y nuevas personas",
    description:
      "Cada salida es una oportunidad de descubrir rincones de Antioquia y de conectar con otras personas.",
  },
  {
    title: "Experiencias memorables",
    description:
      "Cascadas, charcos, páramos y miradores: paisajes que se quedan en la memoria de quien los camina.",
  },
];

const GALLERY: GalleryImage[] = [
  {
    src: "/images/grupo-excursionistas.jpg",
    alt: "Grupo de excursionistas caminando por un sendero de montaña (imagen provisional de stock)",
    caption: "Salidas grupales desde Medellín",
  },
  {
    src: "/images/rio-piscina-natural.jpg",
    alt: "Piscina natural de agua cristalina entre rocas (imagen provisional de stock)",
  },
  {
    src: "/images/flora-detalle.jpg",
    alt: "Detalle de la vegetación del bosque húmedo (imagen provisional de stock)",
  },
  {
    src: "/images/grupo-cima.jpg",
    alt: "Personas contemplando la vista desde una cima (imagen provisional de stock)",
  },
  {
    src: "/images/camino-rural.jpg",
    alt: "Camino rural entre montañas verdes (imagen provisional de stock)",
  },
];

const featuredExperiences = EXPERIENCES.slice(0, 3);
const featuredPosts = getFeaturedPosts(3);
const homeReviews = REVIEWS.slice(0, 3);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqJsonLD(FAQS)),
        }}
      />

      <Hero
        imageSrc="/images/hero-cascada.jpg"
        imageAlt="Cascada cayendo entre vegetación de bosque húmedo (imagen provisional de stock)"
        title="Senderismo y cascadas"
        highlight="cerca de Medellín"
        description="Conectamos contigo con la naturaleza a través de caminatas ecológicas por cascadas, ríos y montañas de Medellín, Antioquia y Colombia. Salidas grupales y privadas con guías que conocen el territorio."
        primaryHref={GENERAL_WA_URL}
        primaryLabel="Reservar por WhatsApp"
        secondaryHref="/experiencias"
        secondaryLabel="Ver experiencias"
        note={`Reseñas verificables en Google: ${RATING_SNAPSHOT.ratingDisplay} ★ con ${RATING_SNAPSHOT.reviewsCount} opiniones en la ficha de DEAVENTURA (datos recopilados).`}
      />

      {/* Presentación */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Caminatas ecológicas y turismo responsable"
              title="Te llevamos a descubrir los paisajes de Antioquia"
              description="DeAventura nació para acercar a las personas a la naturaleza: cascadas escondidas, ríos de agua fría, bosques de niebla y páramos a pocas horas de la ciudad."
            />
            <div className="text-tinta-suave mt-6 space-y-4 leading-relaxed">
              <p>
                Organizamos salidas de senderismo y trekking desde Medellín para
                grupos abiertos y para planes privados. En cada recorrido
                acompañamos el camino, cuidamos el entorno y compartimos la
                historia y los detalles de los lugares que visitamos.
              </p>
              <p>
                No importa si es tu primera caminata o si ya recorres la montaña
                hace años: preparamos la salida contigo y te decimos exactamente
                qué esperar.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton href={GENERAL_WA_URL}>
                Consultar próximas salidas
              </WhatsAppButton>
              <Link
                href="/salidas-privadas"
                className="border-bosque-700 text-bosque-800 hover:bg-bosque-50 focus-visible:outline-bosque-700 inline-flex items-center justify-center rounded-full border-2 px-6 py-3 font-semibold transition-colors"
              >
                Planes privados
              </Link>
            </div>
          </div>
          <div className="rounded-card shadow-card relative aspect-3/2 overflow-hidden">
            <Image
              src="/images/sendero-bosque.jpg"
              alt="Sendero que atraviesa un bosque de montaña (imagen provisional de stock)"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Experiencias destacadas */}
      <section className="bg-papel-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Experiencias"
              title="Salidas destacadas"
              description="Rutas de cascadas, montaña y bosque alrededor de Medellín. Los detalles operativos de cada salida se confirman por WhatsApp."
            />
            <Link
              href="/experiencias"
              className="text-bosque-700 font-semibold underline-offset-4 hover:underline"
            >
              Ver todas las experiencias
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredExperiences.map((experience) => (
              <li key={experience.slug}>
                <ExperienceCard experience={experience} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Salidas privadas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-card shadow-card relative order-2 aspect-3/2 overflow-hidden lg:order-1">
            <Image
              src="/images/grupo-cima.jpg"
              alt="Grupo disfrutando la vista desde un mirador de montaña (imagen provisional de stock)"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Salidas privadas"
              title="Un plan a la medida de tu grupo"
              description="Familias, amigos, equipos de trabajo o visitantes internacionales: diseñamos la salida según su experiencia, ritmo y fechas."
            />
            <p className="text-tinta-suave mt-6 leading-relaxed">
              Cuéntanos cuántos son, qué tipo de paisaje buscan y cuándo quieren
              salir; te proponemos una ruta, te explicamos qué implica y te
              enviamos la cotización. Así lo hicieron otros grupos, según su
              reseña en Google.
            </p>
            <div className="mt-8">
              <Link
                href="/salidas-privadas"
                className="bg-bosque-700 hover:bg-bosque-800 inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition-colors"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-bosque-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            tone="dark"
            eyebrow="Por qué caminar con nosotros"
            title="Diferencias que se sienten en el camino"
            description="Lo que más valoran quienes nos acompañan, según sus reseñas en Google."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit.title}
                className="rounded-card bg-bosque-900/60 p-6"
              >
                <span className="bg-bosque-800 text-bosque-300 flex h-10 w-10 items-center justify-center rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path d="M12 21c4.5-2.5 7-6 7-10.5C19 6 16 3 12 3S5 6 5 10.5C5 15 7.5 18.5 12 21Z" />
                    <path d="M12 21V9" />
                  </svg>
                </span>
                <h3 className="font-display mt-4 text-lg font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="text-bosque-100/85 mt-2 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reseñas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          eyebrow="Reseñas"
          title="Lo dicen quienes ya caminaron con nosotros"
          description="Opiniones recogidas en nuestra ficha de Google, publicadas tal como fueron escritas."
        />
        <div className="mt-10">
          <ReviewsSection reviews={homeReviews} />
        </div>
        <div className="mt-8">
          <Link
            href="/resenas"
            className="text-bosque-700 font-semibold underline-offset-4 hover:underline"
          >
            Ver más reseñas
          </Link>
        </div>
      </section>

      {/* Galería */}
      <section className="bg-papel-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Galería"
            title="Paisajes de nuestras caminatas"
            description="Bosque húmedo, ríos, cascadas y montañas del Oriente y el Occidente antioqueño."
          />
          <GallerySection images={GALLERY} />
          <p className="text-tinta-suave mt-6 text-sm">
            Imágenes provisionales de stock mientras el cliente entrega la
            fotografía propia de sus rutas.
          </p>
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Blog"
            title="Guías para planear tu próxima salida"
            description="Consejos de senderismo, ideas de rutas y claves para visitar la naturaleza de Antioquia responsablemente."
          />
          <Link
            href="/blog"
            className="text-bosque-700 font-semibold underline-offset-4 hover:underline"
          >
            Ver todos los artículos
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <li key={post.slug}>
              <ArticleCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-papel-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Antes de tu primera caminata"
            description="Lo que más nos preguntan por WhatsApp. Si tu duda no está aquí, escríbenos."
          />
          <FaqSection items={FAQS} />
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <CtaSection
          title="¿Nos vamos a caminar?"
          description="Escríbenos por WhatsApp y te contamos las próximas salidas, los precios vigentes y qué necesitas para participar."
          whatsappHref={GENERAL_WA_URL}
          whatsappLabel="Escribir por WhatsApp"
          secondaryHref="/experiencias"
          secondaryLabel="Explorar experiencias"
        />
      </section>
    </>
  );
}
