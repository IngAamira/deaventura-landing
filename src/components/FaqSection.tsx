import type { FaqItem } from "@/lib/faq";

type FaqSectionProps = {
  items: FaqItem[];
};

/** Preguntas frecuentes con `<details>` nativo: accesible sin JavaScript. */
export default function FaqSection({ items }: FaqSectionProps) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-card border-arena-200 shadow-card open:shadow-float border bg-white p-5 sm:p-6"
        >
          <summary className="font-display text-bosque-900 flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="bg-bosque-50 text-bosque-700 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-open:rotate-45"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
          </summary>
          <p className="text-tinta-suave mt-4 leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
