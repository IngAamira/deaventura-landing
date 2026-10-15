import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import { getAllPosts, getUsedCategories } from "@/lib/posts";
import { socialMetadata } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const PAGE_DESCRIPTION =
  "Guías de caminatas cerca de Medellín, cascadas de Antioquia, consejos para principiantes en senderismo y claves para viajar con turismo responsable.";

export const metadata: Metadata = {
  title: "Blog de senderismo y naturaleza",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/blog" },
  ...socialMetadata({
    title: "Blog de senderismo y naturaleza | DeAventura",
    description: PAGE_DESCRIPTION,
    path: "/blog",
    image: "/images/sendero-bosque.jpg",
  }),
};

const GENERAL_WA_URL = waLink(WA_MESSAGES.general);

const posts = getAllPosts();
const categories = getUsedCategories();

export default function BlogPage() {
  return (
    <>
      <section className="border-arena-200 bg-papel-2 border-b">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-14 sm:px-6">
          <Breadcrumbs
            items={[
              { name: "Inicio", path: "/" },
              { name: "Blog", path: "/blog" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-bosque-900 text-4xl leading-tight font-semibold sm:text-5xl">
              Blog: guías para caminar Antioquia
            </h1>
            <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
              Consejos prácticos para empezar en el senderismo, ideas de rutas
              cerca de Medellín y claves para disfrutar cascadas y ríos con
              responsabilidad.
            </p>
          </div>

          {categories.length > 0 ? (
            <nav aria-label="Categorías del blog" className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/blog/categoria/${category.slug}`}
                      className="border-bosque-700/30 text-bosque-800 hover:bg-bosque-50 inline-flex min-h-11 items-center rounded-full border bg-white px-4 py-2 text-sm font-semibold transition-colors"
                    >
                      {category.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <h2 className="sr-only">Todos los artículos</h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <ArticleCard post={post} />
            </li>
          ))}
        </ul>
        <p className="text-tinta-suave mt-10 text-sm">
          Categorías disponibles:{" "}
          {categories.map((category) => category.label).join(" · ")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <CtaSection
          title="¿Aplicaste alguna recomendación?"
          description="Cuéntanos cuál caminata te interesa y te ayudamos a planearla: fechas, exigencia y qué llevar."
          whatsappHref={GENERAL_WA_URL}
          whatsappLabel="Consultar por WhatsApp"
          secondaryHref="/experiencias"
          secondaryLabel="Ver experiencias"
        />
      </section>
    </>
  );
}
