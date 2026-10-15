import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  POST_CATEGORIES,
  getUsedCategories,
  getPostsByCategory,
  type PostCategory,
} from "@/lib/posts";
import { socialMetadata } from "@/lib/site";

type CategoryPageProps = {
  params: Promise<{ categoria: string }>;
};

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getUsedCategories().map(({ slug }) => ({ categoria: slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoria } = await params;
  const label = POST_CATEGORIES[categoria as PostCategory];
  if (!label) return {};

  return {
    title: `Artículos de ${label}`,
    description: `Guías y consejos de ${label.toLowerCase()} publicados por DeAventura en su blog.`,
    alternates: { canonical: `/blog/categoria/${categoria}` },
    // noindex hasta que la categoría tenga suficientes artículos propios.
    robots: { index: false, follow: true },
    ...socialMetadata({
      title: `Artículos de ${label} | DeAventura`,
      description: `Guías y consejos de ${label.toLowerCase()} publicados por DeAventura en su blog.`,
      path: `/blog/categoria/${categoria}`,
    }),
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = await params;
  if (!(categoria in POST_CATEGORIES)) notFound();

  const label = POST_CATEGORIES[categoria as PostCategory];
  const posts = getPostsByCategory(categoria as PostCategory);
  if (posts.length === 0) notFound();

  return (
    <>
      <section className="border-arena-200 bg-papel-2 border-b">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: label, path: `/blog/categoria/${categoria}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-bosque-900 text-4xl leading-tight font-semibold sm:text-5xl">
              {label}
            </h1>
            <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
              {posts.length === 1
                ? "1 artículo en esta categoría."
                : `${posts.length} artículos en esta categoría.`}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="sr-only">Artículos de {label}</h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <ArticleCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
