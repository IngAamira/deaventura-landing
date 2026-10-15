import type { MDXComponents } from "mdx/types";

/**
 * Componentes globales para el contenido MDX (`content/posts`).
 *
 * La tipografía base vive en `.prose` (src/app/globals.css). Aquí solo se
 * ajustan los elementos que necesitan comportamiento adicional: los enlaces
 * externos se abren en pestaña nueva con las protecciones correspondientes.
 */
const components: MDXComponents = {
  a: ({ children, href }) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
        {isExternal ? (
          <span className="sr-only">
            {" "}
            (enlace externo, se abre en una pestaña nueva)
          </span>
        ) : null}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
