/**
 * Selección de reseñas de clientes, transcritas literalmente de la ficha de
 * Google de DeAventura (captura recopilada en `docs/Info-goole-maps.md`).
 *
 * REGLAS: no editar ni "mejorar" el texto original, no atribuir frases que la
 * persona no escribió y enlazar siempre el perfil para que sean verificables.
 *
 * PENDIENTE del cliente: confirmar permiso de uso de nombres y textos según su
 * política de privacidad, y decidir si se integra Google Places API (requiere
 * cuenta de facturación).
 */

export type Review = {
  author: string;
  text: string;
  rating: number;
  /** Contexto declarado en la reseña (para presentarla en la sección adecuada). */
  context?: "general" | "principiantes" | "privadas" | "internacional";
  /** Idioma del texto literal cuando no es español (WCAG 3.1.2). */
  lang?: "en";
};

/** Datos recopilados de la ficha de Google; pueden cambiar con el tiempo. */
export const RATING_SNAPSHOT = {
  ratingDisplay: "5,0",
  ratingValue: 5,
  reviewsCount: 166,
  source:
    "Ficha de Google de DEAVENTURA (datos recopilados; verifica el valor actual en el enlace)",
} as const;

export const REVIEWS: Review[] = [
  {
    author: "Karen Muriel",
    text: "Me parece un grupo muy bien organizado, con mucho acompañamiento en medio de las rutas y los guías están muy bien informados sobre los lugares que se visitan, acompañan los recorridos con historias y hechos relevantes de los lugares. Muy recomendados",
    rating: 5,
    context: "general",
  },
  {
    author: "Juan Diego Cardona Patiño",
    text: "Muy organizados, salidas a tiempo, el guia conoce muy bien las rutas, ademas de contarnos la historia de cada recorrido lo hace de una manera muy amena muy recomenda la agencia",
    rating: 5,
    context: "general",
  },
  {
    author: "Angie Morales",
    text: "Nos fue excelente! Sergio es un excelente guía, muy amable. Fue mi primer caminada y siempre fue muy paciente y servicial! Súper recomendado",
    rating: 5,
    context: "principiantes",
  },
  {
    author: "Alina Zea",
    text: "Excelente es salir con De Aventura, siempre están super pendientes del grupo, son muy cumplidos y responsables. Y lo mejor, aparte de hacer ejercicio, se aprende de historia, de plantas y de animales. Super recomendado.",
    rating: 5,
    context: "general",
  },
  {
    author: "Denny Sarmiento Arroyave",
    text: "Deaventura al 100% muchas gracias por la paciencia que tienen para personas que empiezan por primera vez a disfrutar de los excelentes y hermosos recorridos que tienen para disfrutar y deleitarse de lo bello que tenemos en Antioquia y Colombia.",
    rating: 5,
    context: "principiantes",
  },
  {
    author: "Sarah Nehrling",
    text: "A great day! I organized a private outing for friends, and Sergio and Hernan did a fantastic job of listening to what I wanted for this group outing, and then putting together and leading us through a thoroughly enjoyable adventure.",
    rating: 5,
    context: "privadas",
    lang: "en",
  },
  {
    author: "Andreas Obrist",
    text: "We had a great trip with Hernan to Cerro Bravo near Fredonia. Hernan organised everything very diligently and made sure participants knew exactly what to expect. I can highly recommend DeAventura!",
    rating: 5,
    context: "internacional",
    lang: "en",
  },
  {
    author: "Milena P. Correa",
    text: "Los guías son muy cordiales y cálidos, cuentan muchas historias por el camino lo qués bastante agradable. Además están en permanente comunicación desde antes del encuentro y hasta finalizar lo cua resaltó muchísimo.",
    rating: 5,
    context: "general",
  },
  {
    author: "Hugo Duque",
    text: "Excelente parche de senderismo conociendo cascadas naturales y unos charcos de maravilla acompañado de un excelente Guía",
    rating: 5,
    context: "general",
  },
  {
    author: "Beatriz Elena Duque Echeverri",
    text: "DEAVENTURA, súper excelente equipo, rutas maravillosas, profesionalismo y variedad. Los recomiendo ampliamente.",
    rating: 5,
    context: "general",
  },
];

export function getReviewsByContext(context: Review["context"]): Review[] {
  return REVIEWS.filter((review) => review.context === context);
}
