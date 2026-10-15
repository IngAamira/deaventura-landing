import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { serializeJsonLd, organizationJsonLd } from "@/lib/jsonld";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  keywords: [
    "senderismo Medellín",
    "caminatas ecológicas",
    "cascadas cerca de Medellín",
    "turismo responsable Antioquia",
    "trekking Colombia",
    "salidas privadas naturaleza",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-CO"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="bg-papel text-tinta flex min-h-svh flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(organizationJsonLd()),
          }}
        />
        <a href="#contenido" className="skip-link">
          Saltar al contenido principal
        </a>
        <SiteHeader />
        <main id="contenido" className="flex-1 pb-24">
          {children}
        </main>
        <SiteFooter />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
