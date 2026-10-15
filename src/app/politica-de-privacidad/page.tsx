import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo se tratan tus datos en el sitio web de DeAventura: sin cookies de seguimiento y sin almacenamiento de formularios.",
  alternates: { canonical: "/politica-de-privacidad" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { name: "Inicio", path: "/" },
          { name: "Política de privacidad", path: "/politica-de-privacidad" },
        ]}
      />
      <h1 className="font-display text-bosque-900 mt-6 text-4xl leading-tight font-semibold">
        Política de privacidad
      </h1>
      <p className="rounded-card border-tierra-300 bg-tierra-100 text-tinta mt-6 border-2 p-5 text-sm leading-relaxed">
        <strong className="font-semibold">Borrador provisional.</strong> Este
        texto describe con exactitud el comportamiento técnico del sitio hoy,
        pero debe ser revisado por el cliente y su asesor jurídico antes de la
        publicación definitiva.
      </p>

      <div className="text-tinta-suave mt-8 space-y-6 leading-relaxed">
        <div>
          <h2 className="font-display text-bosque-900 text-xl font-semibold">
            Qué datos recopilamos
          </h2>
          <p className="mt-2">
            Este sitio no usa cookies de seguimiento, no incluye herramientas de
            analítica, publicidad ni reCAPTCHA, y no almacena información en
            servidores propios. Los formularios del sitio no envían datos a
            nuestros servidores: al enviarlos se abre WhatsApp con tu mensaje
            para que tú decidas si lo envías.
          </p>
        </div>

        <div>
          <h2 className="font-display text-bosque-900 text-xl font-semibold">
            Contacto y WhatsApp
          </h2>
          <p className="mt-2">
            Cuando escribes a {BUSINESS.name} por WhatsApp, tu mensaje y tus
            datos de contacto quedan en la conversación de WhatsApp, cuyas
            condiciones y política de privacidad aplican de forma independiente
            (meta plataformas). Usamos esa información únicamente para responder
            tu solicitud y organizar la salida que nos pidas.
          </p>
        </div>

        <div>
          <h2 className="font-display text-bosque-900 text-xl font-semibold">
            Contenido de terceros
          </h2>
          <p className="mt-2">
            El sitio enlaza a Google Maps, Google (ficha de reseñas) e
            Instagram. Esos sitios web gestionan sus propias políticas de datos;
            nosotros no cargamos sus scripts ni sus cookies en este sitio.
          </p>
        </div>

        <div>
          <h2 className="font-display text-bosque-900 text-xl font-semibold">
            Derechos
          </h2>
          <p className="mt-2">
            En Colombia, la Ley 1581 de 2012 y sus decretos regulan la
            protección de datos personales. Puedes solicitar información,
            corrección o supresión de los datos que nos hayas enviado
            escribiendo a nuestro WhatsApp ({BUSINESS.phoneDisplay}).
          </p>
        </div>

        <div>
          <h2 className="font-display text-bosque-900 text-xl font-semibold">
            Cambios a esta política
          </h2>
          <p className="mt-2">
            Actualizaremos este documento si el sitio incorpora nuevos servicios
            (por ejemplo, analítica o formularios con servidor). La fecha de la
            última revisión se mostrará aquí cuando se publique la versión
            definitiva.
          </p>
        </div>
      </div>
    </section>
  );
}
