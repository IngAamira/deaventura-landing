import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // AVIF primero (§9), WebP como respaldo para navegadores sin AVIF.
    formats: ["image/avif", "image/webp"],
    // El hero usa quality 70 (foto de stock grande); el resto usa el 75.
    qualities: [70, 75],
    // Todas las fotos actuales son locales en /public/images. No se declaran
    // orígenes remotos: si se añade material externo, documentarlo aquí y en
    // public/images/SOURCES.md.
    remotePatterns: [],
  },
};

const withMDX = createMDX({
  options: {
    // En Turbopack los plugins se declaran por nombre (sin opciones no
    // serializables). remark-frontmatter elimina el bloque YAML del render;
    // los datos se leen con gray-matter en src/lib/posts.ts.
    remarkPlugins: ["remark-frontmatter"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
