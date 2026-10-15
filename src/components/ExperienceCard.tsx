import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/lib/experiences";

type ExperienceCardProps = {
  experience: Experience;
  /** Tamaño de imagen según el grid contenedor (§9). */
  sizes?: string;
};

/** Tarjeta de experiencia reutilizada en la home, el listado y las relacionadas. */
export default function ExperienceCard({
  experience,
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
}: ExperienceCardProps) {
  return (
    <article className="group rounded-card border-arena-200 shadow-card hover:shadow-float flex h-full flex-col overflow-hidden border bg-white transition-shadow">
      <Link
        href={`/experiencias/${experience.slug}`}
        className="focus-visible:outline-bosque-700 flex h-full flex-col"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src={experience.image.src}
            alt={experience.image.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <p className="text-tierra-700 text-xs font-semibold tracking-[0.14em] uppercase">
            {experience.region}
          </p>
          <h3 className="font-display text-bosque-900 text-xl leading-snug font-semibold">
            {experience.name}
          </h3>
          <p className="text-tinta-suave text-sm leading-relaxed">
            {experience.summary}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 pt-2">
            <span className="bg-bosque-50 text-bosque-800 rounded-full px-3 py-1 text-sm font-semibold">
              {experience.price
                ? `Desde ${experience.price.from}`
                : "Precio a consultar"}
            </span>
            <span className="text-bosque-700 text-sm font-semibold underline-offset-4 group-hover:underline">
              Ver detalle
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
