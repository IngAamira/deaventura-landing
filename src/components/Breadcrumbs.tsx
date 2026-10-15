import Link from "next/link";
import { breadcrumbJsonLd, serializeJsonLd } from "@/lib/jsonld";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/** Miga de pan visible + `BreadcrumbList` en JSON-LD. */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbJsonLd(items)),
        }}
      />
      <nav aria-label="Miga de pan" className="text-tinta-suave text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {last ? (
                  <span
                    aria-current="page"
                    className="text-bosque-800 font-medium"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-bosque-800 inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                  >
                    {item.name}
                  </Link>
                )}
                {last ? null : (
                  <span aria-hidden="true" className="text-arena-400">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
