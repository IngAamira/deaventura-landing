import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { EXPERIENCES, getExperience } from "@/lib/experiences";
import { articleJsonLd, serializeJsonLd } from "@/lib/jsonld";
import {
  POST_CATEGORIES,
  formatDate,
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { socialMetadata } from "@/lib/site";
import { waLink } from "@/lib/whatsapp";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    ...socialMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      image: post.cover.src,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
    }),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { default: PostContent } = await import(`@content/posts/${slug}.mdx`);
  const relatedPosts = getRelatedPosts(post, 2);
  const frontmatterExperiences = (post.relatedExperiences ?? [])
    .map((experienceSlug) => getExperience(experienceSlug))
    .filter((experience) => experience !== undefined);
  const relatedExperiences =
    frontmatterExperiences.length > 0
      ? frontmatterExperiences
      : EXPERIENCES.slice(0, 2);
  const waUrl = waLink(
    `Hola DeAventura 👋 Leí su artículo "${post.title}" y me interesa participar en una salida. ¿Me comparten información?`,
  );

  const breadcrumbItems = [
    { name: "Inicio", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(articleJsonLd(post)),
        }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <article>
        <header className="mx-auto max-w-3xl px-4 pt-8 text-center">
          <p className="text-tierra-700 text-sm font-semibold tracking-[0.18em] uppercase">
            <Link
              href={`/blog/categoria/${post.category}`}
              className="hover:text-tierra-900 underline-offset-4 hover:underline"
            >
              {POST_CATEGORIES[post.category]}
            </Link>
          </p>
          <h1 className="font-display text-bosque-900 mt-4 text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
            {post.description}
          </p>
          <p className="text-tinta-suave mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
            <span className="text-bosque-800 font-semibold">{post.author}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated ? (
              <span>Actualizado: {formatDate(post.updated)}</span>
            ) : null}
            <span>{post.readingMinutes} min de lectura</span>
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-4xl px-4 sm:px-6">
          <div className="rounded-card shadow-card relative aspect-2/1 overflow-hidden">
            <Image
              src={post.cover.src}
              alt={post.cover.alt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="prose">
            <PostContent />
          </div>

          {post.tags.length > 0 ? (
            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Etiquetas">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-papel-2 text-tinta-suave rounded-full px-3 py-1 text-sm"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="rounded-card border-arena-200 bg-papel-2 mt-12 border p-6">
            <h2 className="font-display text-bosque-900 text-xl font-semibold">
              ¿Quieres vivirlo en persona?
            </h2>
            <p className="text-tinta-suave mt-3 leading-relaxed">
              Organizamos salidas grupales y privadas por estos paisajes.
              Escríbenos y te contamos las próximas fechas.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton href={waUrl} size="sm">
                Consultar por WhatsApp
              </WhatsAppButton>
              <Link
                href="/experiencias"
                className="border-bosque-700 text-bosque-800 hover:bg-bosque-50 focus-visible:outline-bosque-700 inline-flex min-h-11 items-center justify-center rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                Ver experiencias
              </Link>
            </div>
          </div>

          {relatedExperiences.length > 0 ? (
            <nav aria-label="Experiencias relacionadas" className="mt-12">
              <h2 className="font-display text-bosque-900 text-xl font-semibold">
                Experiencias relacionadas
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {relatedExperiences.map((experience) => (
                  <li key={experience.slug}>
                    <Link
                      href={`/experiencias/${experience.slug}`}
                      className="rounded-card border-arena-200 shadow-card hover:shadow-float block border bg-white p-5 transition-shadow"
                    >
                      <span className="text-bosque-800 block font-semibold">
                        {experience.name}
                      </span>
                      <span className="text-tinta-suave mt-1 block text-sm">
                        {experience.region}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="border-arena-200 bg-papel-2 border-t">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-bosque-900 text-2xl font-semibold">
              Artículos relacionados
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <ArticleCard
                    post={related}
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <CtaSection
          title="Tu próxima aventura empieza aquí"
          description="Escríbenos por WhatsApp y te ayudamos a elegir la ruta que mejor se ajusta a tu experiencia y a tus fechas."
          whatsappHref={waUrl}
          whatsappLabel="Hablar con un guía"
          secondaryHref="/blog"
          secondaryLabel="Más artículos"
        />
      </section>
    </>
  );
}
