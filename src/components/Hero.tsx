import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

type HeroProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  highlight: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  note?: string;
};

/**
 * Hero principal. La imagen es el LCP: se carga con `priority` y `sizes` de
 * pantalla completa, sobre un fondo oscuro que garantiza contraste del texto.
 */
export default function Hero({
  imageSrc,
  imageAlt,
  title,
  highlight,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  note,
}: HeroProps) {
  return (
    <section className="bg-bosque-950 relative isolate flex min-h-[82svh] items-end overflow-hidden">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        quality={70}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="from-bosque-950 via-bosque-950/65 to-bosque-950/25 absolute inset-0 bg-linear-to-t"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-28 pb-16 sm:px-6 sm:pb-20">
        <p className="text-tierra-300 text-sm font-semibold tracking-[0.18em] uppercase">
          Medellín · Antioquia · Colombia
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl">
          {title} <span className="text-bosque-300">{highlight}</span>
        </h1>
        <p className="text-bosque-100/95 mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
          {description}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <WhatsAppButton href={primaryHref}>{primaryLabel}</WhatsAppButton>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-full border-2 border-white/75 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-white"
          >
            {secondaryLabel}
          </Link>
        </div>
        {note ? (
          <p className="text-bosque-100/80 mt-6 text-sm">{note}</p>
        ) : null}
      </div>
    </section>
  );
}
