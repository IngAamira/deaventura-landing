import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";

type CtaSectionProps = {
  title: string;
  description: string;
  whatsappHref: string;
  whatsappLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

/** Bloque de conversión reutilizado al final de las páginas clave. */
export default function CtaSection({
  title,
  description,
  whatsappHref,
  whatsappLabel,
  secondaryHref,
  secondaryLabel,
}: CtaSectionProps) {
  return (
    <section className="rounded-card from-bosque-900 to-bosque-950 overflow-hidden bg-linear-to-br">
      <div className="px-6 py-14 sm:px-10 sm:py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl leading-tight font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          <p className="text-bosque-100/90 mt-4 text-lg leading-relaxed">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton href={whatsappHref}>{whatsappLabel}</WhatsAppButton>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-white"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
