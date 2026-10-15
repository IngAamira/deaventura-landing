import type { MetadataRoute } from "next";
import { EXPERIENCES } from "@/lib/experiences";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/experiencias"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/salidas-privadas"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/resenas"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contacto"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const experienceRoutes: MetadataRoute.Sitemap = EXPERIENCES.map(
    (experience) => ({
      url: absoluteUrl(`/experiencias/${experience.slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Las páginas de categoría del blog son `noindex` hasta que cada una tenga
  // al menos tres artículos; no deben aparecer en el sitemap.
  return [...staticRoutes, ...experienceRoutes, ...postRoutes];
}
