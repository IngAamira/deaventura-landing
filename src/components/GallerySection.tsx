import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
  /** Descripción corta del lugar o momento (opcional). */
  caption?: string;
};

type GallerySectionProps = {
  images: GalleryImage[];
};

/**
 * Galería visual. Rejilla editorial asimétrica; todas las imágenes excepto la
 * primera se cargan diferidas (`loading` diferido de `next/image` por defecto).
 */
export default function GallerySection({ images }: GallerySectionProps) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {images.map((image, index) => {
        const featured = index === 0;
        return (
          <figure
            key={image.src}
            className={`rounded-card relative overflow-hidden ${
              featured
                ? "col-span-2 aspect-3/2 lg:row-span-2 lg:aspect-auto lg:h-full"
                : "aspect-3/2"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                featured
                  ? "(max-width: 1023px) 100vw, 50vw"
                  : "(max-width: 1023px) 50vw, 25vw"
              }
              className="object-cover"
            />
            {image.caption ? (
              <figcaption className="from-bosque-950/85 absolute inset-x-0 bottom-0 bg-linear-to-t to-transparent p-4 text-sm text-white">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
    </div>
  );
}
