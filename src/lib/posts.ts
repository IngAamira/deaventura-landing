import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Acceso al contenido del blog (`content/posts/*.mdx`).
 *
 * El frontmatter se lee con gray-matter para los listados y metadatos; el
 * renderizado elimina el bloque YAML con `remark-frontmatter` (ver
 * next.config.ts). Si un archivo no tiene un frontmatter válido, el build falla
 * con un mensaje claro en lugar de publicar contenido roto.
 */

export const POST_CATEGORIES: Record<string, string> = {
  "caminatas-cercanas": "Caminatas cercanas",
  senderismo: "Senderismo",
  cascadas: "Cascadas y ríos",
  "turismo-responsable": "Turismo responsable",
  "medellin-antioquia": "Medellín y Antioquia",
  "planes-privados": "Planes privados",
};

export type PostCategory = keyof typeof POST_CATEGORIES;

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category: PostCategory;
  tags: string[];
  cover: { src: string; alt: string };
  readingMinutes: number;
  /** Slugs de experiencias a recomendar al final del artículo (opcional). */
  relatedExperiences?: string[];
};

export type PostCategoryFilter = {
  category: PostCategory;
  label: string;
  slug: string;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function requireString(
  data: Record<string, unknown>,
  key: string,
  file: string,
) {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Frontmatter inválido en "${file}": falta el campo "${key}" (texto no vacío).`,
    );
  }
  return value;
}

function requireDateString(
  data: Record<string, unknown>,
  key: string,
  file: string,
) {
  const value = requireString(data, key, file);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(
      `Frontmatter inválido en "${file}": "${key}" debe tener formato YYYY-MM-DD.`,
    );
  }
  return value;
}

function parseTags(data: Record<string, unknown>, file: string): string[] {
  const value = data.tags;
  if (value === undefined) return [];
  if (Array.isArray(value) && value.every((tag) => typeof tag === "string")) {
    return value;
  }
  throw new Error(
    `Frontmatter inválido en "${file}": "tags" debe ser una lista de textos.`,
  );
}

function parseRelatedExperiences(
  data: Record<string, unknown>,
  file: string,
): string[] | undefined {
  const value = data.relatedExperiences;
  if (value === undefined) return undefined;
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((slug) => typeof slug === "string")
  ) {
    return value;
  }
  throw new Error(
    `Frontmatter inválido en "${file}": "relatedExperiences" debe ser una lista de slugs de experiencias.`,
  );
}

function isPostCategory(value: string): value is PostCategory {
  return value in POST_CATEGORIES;
}

function parseCover(data: Record<string, unknown>, file: string) {
  const cover = data.cover;
  if (!isRecord(cover)) {
    throw new Error(
      `Frontmatter inválido en "${file}": falta el objeto "cover" con "src" y "alt".`,
    );
  }
  return {
    src: requireString(cover, "src", file),
    alt: requireString(cover, "alt", file),
  };
}

function readingMinutesOf(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parsePost(raw: string, slug: string): Post {
  const file = `content/posts/${slug}.mdx`;
  const { data, content } = matter(raw);

  if (!isRecord(data)) {
    throw new Error(`Frontmatter inválido en "${file}".`);
  }

  const category = requireString(data, "category", file);
  if (!isPostCategory(category)) {
    throw new Error(
      `Frontmatter inválido en "${file}": "category" debe ser una de: ${Object.keys(POST_CATEGORIES).join(", ")}.`,
    );
  }

  const updated =
    data.updated === undefined
      ? undefined
      : requireDateString(data, "updated", file);

  return {
    slug,
    title: requireString(data, "title", file),
    description: requireString(data, "description", file),
    date: requireDateString(data, "date", file),
    updated,
    author: requireString(data, "author", file),
    category,
    tags: parseTags(data, file),
    cover: parseCover(data, file),
    readingMinutes: readingMinutesOf(content),
    relatedExperiences: parseRelatedExperiences(data, file),
  };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): Post | undefined {
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;
  return parsePost(fs.readFileSync(filePath, "utf8"), slug);
}

function byNewest(a: Post, b: Post): number {
  return b.date.localeCompare(a.date);
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== undefined)
    .sort(byNewest);
}

export function getFeaturedPosts(count = 3): Post[] {
  return getAllPosts().slice(0, count);
}

export function getPostsByCategory(category: PostCategory): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(post: Post, count = 2): Post[] {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 1 : 0;
      const bScore = b.category === post.category ? 1 : 0;
      return bScore - aScore || byNewest(a, b);
    })
    .slice(0, count);
}

export function getUsedCategories(): PostCategoryFilter[] {
  const used = new Set(getAllPosts().map((post) => post.category));
  return Object.entries(POST_CATEGORIES)
    .filter(([slug]) => isPostCategory(slug) && used.has(slug))
    .map(([slug, label]) => {
      if (!isPostCategory(slug)) {
        throw new Error(`Categoría no reconocida: ${slug}`);
      }
      return { slug, label, category: slug };
    });
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
