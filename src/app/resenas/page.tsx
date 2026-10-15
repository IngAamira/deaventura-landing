import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import ReviewsSection from "@/components/ReviewsSection";
import { BUSINESS, socialMetadata } from "@/lib/site";
import { RATING_SNAPSHOT, REVIEWS } from "@/lib/reviews";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const PAGE_DESCRIPTION =
  "Opiniones de personas que han caminado con DeAventura, transcritas de nuestra ficha de Google en Medellín. Enlace verificable al perfil.";

export const metadata: Metadata = {
  title: "Reseñas de nuestros clientes",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/resenas" },
  ...socialMetadata({
    title: "Reseñas de nuestros clientes | DeAventura",
    description: PAGE_DESCRIPTION,
    path: "/resenas",
  }),
};

const GENERAL_WA_URL = waLink(WA_MESSAGES.general);

export default function ReviewsPage() {
  return (
    <>
      <section className="border-arena-200 bg-papel-2 border-b">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Reseñas", path: "/resenas" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-bosque-900 text-4xl leading-tight font-semibold sm:text-5xl">
              Reseñas de nuestros clientes
            </h1>
            <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
              Publicamos las palabras de quienes nos han acompañado, tal como
              las escribieron en nuestra ficha de Google. Puedes verificar cada
              opinión en el perfil oficial.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="text-tinta-suave text-sm leading-relaxed">
          Valoración recopilada:{" "}
          <span className="text-bosque-800 font-semibold">
            {RATING_SNAPSHOT.ratingDisplay} ★ sobre 5 (
            {RATING_SNAPSHOT.reviewsCount} reseñas)
          </span>
          . {RATING_SNAPSHOT.source}.{" "}
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bosque-700 font-semibold underline-offset-4 hover:underline"
          >
            Ver el perfil de Google
          </a>
        </p>

        <div className="mt-10">
          <ReviewsSection reviews={REVIEWS} hideSummary />
        </div>

        <p className="text-tinta-suave mt-10 max-w-3xl text-sm leading-relaxed">
          Esta sección se mantiene de forma manual: no está sincronizada en vivo
          con Google y no usamos widgets de terceros. Si quieres ver el listado
          completo y actualizado, entra al perfil oficial desde el enlace
          anterior.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <CtaSection
          title="¿Te animas a vivir tu propia aventura?"
          description="Escríbenos y te contamos las próximas salidas grupales o armamos un plan privado para tu grupo."
          whatsappHref={GENERAL_WA_URL}
          whatsappLabel="Escribir por WhatsApp"
          secondaryHref="/experiencias"
          secondaryLabel="Ver experiencias"
        />
      </section>
    </>
  );
}
