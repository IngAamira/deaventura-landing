import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const GENERAL_WA_URL = waLink(WA_MESSAGES.general);

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o cambió de dirección. Explora nuestras experiencias de senderismo o escríbenos por WhatsApp.",
  alternates: { canonical: null },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-tierra-700 text-sm font-semibold tracking-[0.18em] uppercase">
        Error 404
      </p>
      <h1 className="font-display text-bosque-900 mt-4 text-4xl leading-tight font-semibold sm:text-5xl">
        Esta ruta se nos perdió en el sendero
      </h1>
      <p className="text-tinta-suave mt-5 text-lg leading-relaxed">
        La página que buscas no existe o cambió de dirección. Prueba con las
        experiencias, el blog o escríbenos directo por WhatsApp.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="bg-bosque-700 hover:bg-bosque-800 inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition-colors"
        >
          Volver al inicio
        </Link>
        <WhatsAppButton href={GENERAL_WA_URL} variant="outline">
          Escribir por WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
