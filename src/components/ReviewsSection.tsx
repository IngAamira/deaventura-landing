import { BUSINESS } from "@/lib/site";
import { RATING_SNAPSHOT, type Review } from "@/lib/reviews";

type ReviewsSectionProps = {
  reviews: Review[];
  /** Oculta el resumen de valoración (p. ej. en la página de reseñas). */
  hideSummary?: boolean;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-tierra-600 inline-flex items-center gap-0.5">
      <span className="sr-only">{rating} de 5 estrellas</span>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Sección de reseñas: transcripciones literales de la ficha de Google, sin
 * sincronización en vivo (no se usa la API de Google Places). Enlace al perfil
 * para que cada opinión sea verificable.
 */
export default function ReviewsSection({
  reviews,
  hideSummary = false,
}: ReviewsSectionProps) {
  return (
    <div>
      {hideSummary ? null : (
        <div className="rounded-card border-arena-200 shadow-card flex flex-wrap items-center gap-4 border bg-white px-5 py-4">
          <span className="font-display text-bosque-900 text-3xl font-semibold">
            {RATING_SNAPSHOT.ratingDisplay}
          </span>
          <div>
            <Stars rating={RATING_SNAPSHOT.ratingValue} />
            <p className="text-tinta-suave mt-1 text-sm">
              {RATING_SNAPSHOT.reviewsCount} reseñas recopiladas en Google
            </p>
          </div>
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bosque-700 ml-auto text-sm font-semibold underline-offset-4 hover:underline"
          >
            Ver el perfil de Google
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </div>
      )}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <li
            key={`${review.author}-${review.text.slice(0, 24)}`}
            className="rounded-card border-arena-200 shadow-card flex flex-col border bg-white p-6"
          >
            <Stars rating={review.rating} />
            <blockquote className="text-tinta mt-4 text-[0.95rem] leading-relaxed">
              <p lang={review.lang}>“{review.text}”</p>
            </blockquote>
            <p className="text-bosque-800 mt-auto pt-4 text-sm font-semibold">
              {review.author}
              <span className="text-tinta-suave block font-normal">
                Reseña en Google
              </span>
            </p>
          </li>
        ))}
      </ul>

      <p className="text-tinta-suave mt-6 text-sm">
        Opiniones transcritas de la ficha de Google de DeAventura. La
        calificación y el número de reseñas pueden cambiar; verifica el valor
        actual en el perfil.
      </p>
    </div>
  );
}
