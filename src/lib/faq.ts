export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Preguntas frecuentes redactadas con la información documentada del negocio.
 * No se afirman certificaciones ni promesas absolutas de seguridad.
 */
export const FAQS: FaqItem[] = [
  {
    question: "¿Cómo reservo una salida?",
    answer:
      "La reserva se gestiona directamente por WhatsApp con nuestro equipo. Escríbenos con la experiencia que te interesa, la fecha aproximada y el número de participantes, y te confirmamos disponibilidad y los pasos a seguir.",
  },
  {
    question: "¿Las salidas son grupales o también privadas?",
    answer:
      "Ambas. Publicamos salidas grupales regulares a las que puedes unirte, y organizamos salidas privadas para familias, amigos, equipos de trabajo o visitantes internacionales que prefieren un plan a la medida.",
  },
  {
    question: "Nunca he hecho senderismo, ¿puedo participar?",
    answer:
      "Sí. Recibimos con frecuencia a personas en su primera caminata y nuestros guías adaptan el acompañamiento al ritmo del grupo. Si estás empezando, cuéntanoslo al escribirnos y te orientamos sobre qué ruta se ajusta mejor a tu experiencia.",
  },
  {
    question: "¿Qué debo llevar a la salida?",
    answer:
      "Al confirmar tu reserva te enviamos las recomendaciones específicas de la ruta. Como orientación general: calzado cómodo que pueda mojarse, ropa por capas, agua, protector solar, repelente y algo de comida. Evita llevar valiosos y revisa la previsión del clima el día anterior.",
  },
  {
    question: "¿Dónde queda el punto de encuentro?",
    answer:
      "El punto de encuentro depende de la ruta y se confirma por WhatsApp antes de cada salida. Nuestra ubicación de referencia está en El Poblado, Medellín, y muchas salidas incluyen transporte desde la ciudad.",
  },
  {
    question: "¿Puedo ir con mi mascota?",
    answer:
      "Depende de la ruta y de las condiciones del día. Consúltanos antes de reservar y te confirmamos si la experiencia que te interesa admite animales.",
  },
  {
    question: "¿Qué es el turismo responsable en DeAventura?",
    answer:
      "Es la forma en que trabajamos cada salida: grupos que cuidan los senderos y el agua, respeto por la flora y la fauna, y guías que explican la historia y los ecosistemas de los lugares que visitamos para que la caminata deje más aprendizaje que huella.",
  },
];
