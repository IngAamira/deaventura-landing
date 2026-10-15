type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Tono: sobre fondo claro o sobre fondo oscuro. */
  tone?: "light" | "dark";
};

/** Encabezado estándar de secciones (H2). Un solo H1 por página: en el hero. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  const titleColor = tone === "dark" ? "text-white" : "text-bosque-900";
  const textColor = tone === "dark" ? "text-bosque-100/85" : "text-tinta-suave";
  const eyebrowColor = tone === "dark" ? "text-tierra-300" : "text-tierra-700";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p
          className={`text-sm font-semibold tracking-[0.18em] uppercase ${eyebrowColor}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display mt-3 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-lg leading-relaxed ${textColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
