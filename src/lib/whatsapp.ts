import { BUSINESS } from "@/lib/site";

/**
 * Enlaces de WhatsApp (`wa.me`) con el mensaje codificado.
 * No se envía ni se almacena ningún dato del visitante: el mensaje se abre en
 * la app de WhatsApp y lo envía la propia persona.
 */
export function waLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  general:
    "Hola DeAventura 👋 Vengo de su sitio web y quiero información sobre las caminatas y salidas disponibles. ¿Me pueden ayudar?",
  availability: (experienceName: string) =>
    `Hola DeAventura 👋 Vengo de su sitio web y me interesa la experiencia "${experienceName}". ¿Me comparten fechas disponibles, precio y qué incluye?`,
  privateOuting:
    "Hola DeAventura 👋 Vengo de su sitio web y quiero cotizar una salida privada para mi grupo/familia. Les comparto los detalles:",
  reservation:
    "Hola DeAventura 👋 Vengo de su sitio web y quiero reservar una salida. ¿Me confirman disponibilidad y pasos a seguir?",
} as const;
