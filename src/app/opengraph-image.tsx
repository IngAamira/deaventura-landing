import { ImageResponse } from "next/og";

export const alt =
  "DeAventura | Caminatas, senderismo y cascadas cerca de Medellín";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagen de Open Graph generada en build (sin dependencias externas ni
 * fotografías de terceros). Sustituir cuando el cliente entregue su marca
 * gráfica y fotografía propia.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0a2116",
        backgroundImage:
          "linear-gradient(135deg, #14432b 0%, #0a2116 55%, #1c5b64 130%)",
        padding: "72px",
        color: "#faf7f1",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
          <path d="M1.5 26.5 11 10.5l5 8.5 3.5-5.5 11 13H1.5Z" fill="#8ec9a6" />
          <path
            d="M20.5 6c1.9 2.3 3 4 3 5.4a3 3 0 1 1-6 0c0-1.4 1.1-3.1 3-5.4Z"
            fill="#2b7f8c"
          />
        </svg>
        <div style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1 }}>
          DeAventura
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          Senderismo y cascadas cerca de Medellín
        </div>
        <div style={{ fontSize: 30, color: "#d9ecdf", maxWidth: "820px" }}>
          Caminatas ecológicas, salidas grupales y planes privados en Antioquia
          y Colombia
        </div>
      </div>

      <div style={{ fontSize: 26, color: "#d9a377" }}>
        deaventura · Medellín, Antioquia
      </div>
    </div>,
    { ...size },
  );
}
