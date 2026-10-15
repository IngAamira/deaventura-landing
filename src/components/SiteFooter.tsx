import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import { BUSINESS, NAV_ITEMS } from "@/lib/site";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const FOOTER_YEAR = new Date().getFullYear();
const GENERAL_WA_URL = waLink(WA_MESSAGES.general);
const ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.city}`;
const LINK_CLASS =
  "text-bosque-100/85 inline-flex min-h-11 items-center rounded underline-offset-4 hover:text-white hover:underline";
const EXTERNAL_SUFFIX = (
  <span className="sr-only">(se abre en una pestaña nueva)</span>
);

export default function SiteFooter() {
  return (
    <footer className="border-bosque-800/40 bg-bosque-950 text-bosque-100 border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <BrandMark textClassName="text-white" markSize={34} />
          <p className="text-bosque-100/85 mt-4 max-w-sm text-sm leading-relaxed">
            Caminatas ecológicas, senderismo y turismo responsable en Medellín,
            Antioquia y Colombia. Salidas grupales y privadas a cascadas, ríos y
            montañas.
          </p>
          <p className="text-bosque-100/70 mt-4 text-sm">
            Los precios, la disponibilidad y las condiciones de cada salida se
            confirman directamente con el equipo por WhatsApp.
          </p>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="font-display text-base font-semibold text-white">
            Explora
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={LINK_CLASS}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/politica-de-privacidad" className={LINK_CLASS}>
                Política de privacidad
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-base font-semibold text-white">
            Contacto
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={GENERAL_WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                WhatsApp: {BUSINESS.phoneDisplay}
                {EXTERNAL_SUFFIX}
              </a>
            </li>
            <li>
              <a href={`tel:${BUSINESS.phoneE164}`} className={LINK_CLASS}>
                Teléfono: {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li className="text-bosque-100/85">
              <address className="not-italic">{ADDRESS_LINE}</address>
            </li>
            <li>
              <a
                href={BUSINESS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                Ver ubicación en Google Maps
                {EXTERNAL_SUFFIX}
              </a>
            </li>
            <li>
              <a
                href={BUSINESS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK_CLASS}
              >
                Instagram
                {EXTERNAL_SUFFIX}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-bosque-800 border-t">
        <div className="text-bosque-100/70 mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {FOOTER_YEAR} DeAventura. Caminatas y turismo responsable.</p>
          <p>
            Hecho en Medellín · Contenido provisional pendiente de revisión del
            cliente
          </p>
        </div>
      </div>
    </footer>
  );
}
