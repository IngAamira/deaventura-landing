import WhatsAppButton from "@/components/WhatsAppButton";
import { WA_MESSAGES, waLink } from "@/lib/whatsapp";

const FLOATING_WA_URL = waLink(WA_MESSAGES.general);

/**
 * Contacto rápido flotante. Fijo abajo a la derecha, con tamaño contenido y
 * separada del borde para no tapar contenido (el `main` reserva espacio).
 */
export default function FloatingWhatsApp() {
  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <WhatsAppButton href={FLOATING_WA_URL} className="shadow-float" size="sm">
        <span className="hidden sm:inline">Contacto rápido</span>
        <span className="sr-only sm:not-sr-only sm:hidden">WhatsApp</span>
      </WhatsAppButton>
    </div>
  );
}
