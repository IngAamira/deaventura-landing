type BrandMarkProps = {
  /** Clase para la tipografía del logotipo (color y tamaño). */
  textClassName?: string;
  /** Tamaño del símbolo en píxeles. */
  markSize?: number;
};

/**
 * Marca de DeAventura mientras el cliente no entregue el logotipo oficial
 * (PENDIENTE). Símbolo de montaña + cascada, SVG inline, decorativo.
 */
export default function BrandMark({
  textClassName = "text-bosque-900",
  markSize = 30,
}: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={markSize}
        height={markSize}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M1.5 26.5 11 10.5l5 8.5 3.5-5.5 11 13H1.5Z"
          fill="var(--color-bosque-700)"
        />
        <path
          d="M11 10.5 16 19l-2.6 4.2L8.2 26 11 10.5Z"
          fill="#fff"
          opacity=".22"
        />
        <path
          d="M20.5 6c1.9 2.3 3 4 3 5.4a3 3 0 1 1-6 0c0-1.4 1.1-3.1 3-5.4Z"
          fill="var(--color-agua-500)"
        />
      </svg>
      <span
        className={`font-display text-xl leading-none font-semibold tracking-tight ${textClassName}`}
      >
        DeAventura
      </span>
    </span>
  );
}
