import Image from "next/image";
import Link from "next/link";
import { POST_CATEGORIES, formatDate, type Post } from "@/lib/posts";

type ArticleCardProps = {
  post: Post;
  /** Tamaño de imagen según el grid contenedor (§9). */
  sizes?: string;
};

/** Tarjeta de artículo para el blog, la home y los relacionados. */
export default function ArticleCard({
  post,
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
}: ArticleCardProps) {
  return (
    <article className="group rounded-card border-arena-200 shadow-card hover:shadow-float flex h-full flex-col overflow-hidden border bg-white transition-shadow">
      <Link
        href={`/blog/${post.slug}`}
        className="focus-visible:outline-bosque-700 flex h-full flex-col"
      >
        <div className="relative aspect-16/9 w-full overflow-hidden">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <p className="text-tierra-700 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-wide">
            <span className="bg-tierra-100 rounded-full px-3 py-1">
              {POST_CATEGORIES[post.category]}
            </span>
            <time dateTime={post.date} className="text-tinta-suave">
              {formatDate(post.date)}
            </time>
            <span className="text-tinta-suave">
              {post.readingMinutes} min de lectura
            </span>
          </p>
          <h3 className="font-display text-bosque-900 text-xl leading-snug font-semibold">
            {post.title}
          </h3>
          <p className="text-tinta-suave text-sm leading-relaxed">
            {post.description}
          </p>
          <span className="text-bosque-700 mt-auto pt-2 text-sm font-semibold underline-offset-4 group-hover:underline">
            Leer artículo
          </span>
        </div>
      </Link>
    </article>
  );
}
