/**
 * Catálogo de experiencias.
 *
 * IMPORTANTE: los destinos listados provienen de las salidas documentadas del
 * negocio (ficha de Google en `docs/Info-goole-maps.md` y reseñas de clientes).
 * Los datos operativos (duración, distancia, desnivel, incluye, horarios y
 * fechas) NO están verificados: se muestran como "por confirmar" y nunca como
 * oferta cerrada. PENDIENTE del cliente: listado oficial, precios vigentes y
 * calendario.
 */

export type ExperienceCategory = "cascadas" | "montaña" | "bosque" | "páramo";

export type Experience = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  description: string[];
  categories: ExperienceCategory[];
  /** Único precio documentado (ficha de Google). Los demás: consultar. */
  price?: {
    from: string;
    note: string;
    /** Importe numérico en COP, solo cuando está verificado en la ficha de Google. */
    amount?: number;
  };
  image: { src: string; alt: string };
  highlights: string[];
};

export const EXPERIENCE_CATEGORIES: Record<ExperienceCategory, string> = {
  cascadas: "Cascadas y ríos",
  montaña: "Montaña",
  bosque: "Bosque",
  páramo: "Páramo",
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "ruta-de-las-cascadas",
    name: "Ruta de las cascadas",
    region: "Medellín y su zona rural, Antioquia",
    summary:
      "Nuestra salida más popular: un recorrido entre cascadas, charcos y bosque húmedo a pocos kilómetros de la ciudad.",
    description: [
      "La Ruta de las cascadas es la experiencia con la que más personas se acercan al senderismo con DeAventura. El recorrido transcurre por zonas de bosque húmedo y orillas de río, con paradas en cascadas y charcos naturales donde el grupo se detiene a descansar, fotografiar y escuchar a los guías.",
      "Como en todas nuestras salidas, los guías acompañan el trayecto contando la historia de los lugares, la flora y la fauna del territorio, y adaptando el ritmo al grupo. Es una opción habitual tanto para principiantes como para personas con más experiencia en caminatas.",
      "El precio publicado en nuestra ficha de Google es un valor de referencia; la disponibilidad, el punto de encuentro y lo que incluye la salida se confirman directamente con el equipo por WhatsApp.",
    ],
    categories: ["cascadas", "bosque"],
    price: {
      from: "$33.000 COP",
      amount: 33000,
      note: "Precio de referencia publicado en la ficha de Google de DeAventura. Puede variar; confírmalo por WhatsApp.",
    },
    image: {
      src: "/images/hero-cascada.jpg",
      alt: "Cascada cayendo entre vegetación tropical (fotografía provisional de stock)",
    },
    highlights: [
      "Cascadas y charcos naturales en el trayecto",
      "Guías que explican historia, flora y fauna",
      "Salidas grupales regulares desde Medellín",
    ],
  },
  {
    slug: "chorro-blanco-andes",
    name: "Chorro Blanco, Andes",
    region: "Andes, Antioquia",
    summary:
      "Caminata hasta una cascada en el municipio de Andes, en el occidente antioqueño.",
    description: [
      "Chorro Blanco es una de las cascadas que nuestros grupos han visitado en Andes, un municipio del occidente antioqueño conocido por su paisaje de montaña y sus ríos.",
      "La salida combina caminata por senderos de la zona con tiempo en el entorno de la cascada. Los participantes suelen describirla como una experiencia cercana a la naturaleza, con acompañamiento de guías durante todo el recorrido.",
      "La ruta exacta, la duración y las condiciones de acceso se confirman para cada salida; escríbenos por WhatsApp para conocer las próximas fechas.",
    ],
    categories: ["cascadas", "bosque"],
    image: {
      src: "/images/cascada-2.jpg",
      alt: "Salto de agua entre rocas y árboles (fotografía provisional de stock)",
    },
    highlights: [
      "Cascada en el municipio de Andes, Antioquia",
      "Salida de día completo desde Medellín",
      "Acompañamiento de guías durante el recorrido",
    ],
  },
  {
    slug: "cerro-bravo-fredonia",
    name: "Cerro Bravo, Fredonia",
    region: "Fredonia, Antioquia",
    summary:
      "Ascenso de montaña al Cerro Bravo, con paisajes del suroeste antioqueño.",
    description: [
      "El Cerro Bravo, en el municipio de Fredonia, es una de las metas de montaña que hemos recorrido con grupos. La experiencia incluye organización previa del itinerario, para que cada participante sepa con antelación qué esperar del recorrido.",
      "Las salidas a Cerro Bravo se arman con tiempo de anticipación y suelen incluir transporte desde Medellín; los detalles de logística se coordinan por WhatsApp con cada grupo.",
      "Es una caminata de exigencia mayor que las rutas de cascadas: si es tu primera aventura, consúltanos y te orientamos sobre preparación y equipamiento.",
    ],
    categories: ["montaña"],
    image: {
      src: "/images/montana-niebla.jpg",
      alt: "Pico de montaña entre la niebla al amanecer (fotografía provisional de stock)",
    },
    highlights: [
      "Meta de montaña en el suroeste antioqueño",
      "Itinerario organizado y explicado con antelación",
      "Salidas privadas disponibles para grupos",
    ],
  },
  {
    slug: "paramo-de-belmira",
    name: "Páramo de Belmira",
    region: "Belmira, norte de Antioquia",
    summary:
      "Jornada de día completo en el páramo de Belmira, al norte de Antioquia: alta montaña, clima frío y un ecosistema muy diferente al del bosque húmedo. Consulta fechas por WhatsApp.",
    description: [
      "El páramo de Belmira, en el norte de Antioquia, ofrece un paisaje de alta montaña con vegetación propia de ecosistemas fríos. Caminar aquí es distinto a una ruta de cascadas: otro clima, otra flora y otro ritmo.",
      "Las salidas a Belmira se programan como jornadas de día completo y son una buena opción para quienes ya han hecho caminatas y buscan variar de paisaje.",
      "Dado que el clima de alta montaña cambia rápido, la preparación se revisa con cada grupo antes de salir. Consulta fechas y recomendaciones por WhatsApp.",
    ],
    categories: ["páramo", "montaña"],
    image: {
      src: "/images/vista-panoramica.jpg",
      alt: "Paisaje de alta montaña con pastizales y montañas al fondo (fotografía provisional de stock)",
    },
    highlights: [
      "Ecosistema de páramo en el norte de Antioquia",
      "Jornada de día completo",
      "Ideal para quienes buscan variar de paisaje",
    ],
  },
  {
    slug: "santa-elena-guarne",
    name: "Santa Elena – Guarne",
    region: "Santa Elena y Guarne, Antioquia",
    summary:
      "Travesía entre el Oriente antioqueño, con bosque de niebla y cascadas frías.",
    description: [
      "La travesía de Santa Elena a Guarne recorre el oriente antioqueño por caminos entre bosque de niebla, con agua fresca y miradores naturales. Nuestros participantes la recuerdan por el paisaje y por esos detalles del recorrido, como un tinto caliente al salir de una cascada.",
      "Es una caminata de travesía: combina varios tipos de terreno y requiere un ritmo sostenido durante la jornada.",
      "Las fechas y el punto de encuentro se definen para cada salida. Escríbenos y te contamos cómo prepararte.",
    ],
    categories: ["bosque", "cascadas"],
    image: {
      src: "/images/sendero-bosque.jpg",
      alt: "Sendero que atraviesa un bosque de montaña (fotografía provisional de stock)",
    },
    highlights: [
      "Travesía entre dos municipios del Oriente",
      "Bosque de niebla y cascadas frías",
      "Jornada completa con guía acompañante",
    ],
  },
  {
    slug: "cerro-de-la-cruz-el-retiro",
    name: "Cerro de la Cruz, El Retiro",
    region: "El Retiro, Antioquia",
    summary:
      "Ascenso al Cerro de la Cruz en El Retiro, cerca de Medellín: senderos agradables y vistas abiertas sobre el Oriente antioqueño. Una salida ideal para empezar a caminar.",
    description: [
      "El Cerro de la Cruz, en El Retiro, es una caminata de ascenso por senderos agradables, tanto a la vista como para ejercitar la caminería, que termina en vistas abiertas sobre el paisaje del Oriente antioqueño.",
      "Es una opción frecuente para quienes inician en el senderismo y para grupos que quieren una salida cercana a Medellín con recompensa panorámica.",
      "Como en el resto de nuestras experiencias, el nivel de exigencia se explica antes de la salida y el grupo avanza acompañado por el guía.",
    ],
    categories: ["montaña", "bosque"],
    image: {
      src: "/images/camino-rural.jpg",
      alt: "Camino rural entre montañas cubiertas de vegetación (fotografía provisional de stock)",
    },
    highlights: [
      "Cerro de la Cruz en El Retiro, Antioquia",
      "Senderos de ascenso progresivo",
      "Cerca de Medellín: salida de día completo",
    ],
  },
];

export const PENDING_EXPERIENCE_FIELDS = [
  "Duración exacta de cada recorrido",
  "Distancia y desnivel acumulado",
  "Nivel de dificultad y requisitos físicos",
  "Qué incluye el precio (transporte, alimentación, guía, entradas)",
  "Calendario y fechas disponibles",
  "Política de reservas y cancelaciones",
] as const;

export function getExperience(slug: string): Experience | undefined {
  return EXPERIENCES.find((experience) => experience.slug === slug);
}

export function getRelatedExperiences(
  currentSlug: string,
  count = 2,
): Experience[] {
  return EXPERIENCES.filter(
    (experience) => experience.slug !== currentSlug,
  ).slice(0, count);
}
