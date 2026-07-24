// Bilingual content dictionary. EN is the default locale (/), ES lives at /es/.
// Copy is intentionally lean: experience-first landing, one SEO-dense FAQ block.

export type Lang = 'en' | 'es';

export const CONTACT = {
  phone: '+1 7862667459',
  phoneHref: 'tel:+17862667459',
  whatsappHref: 'https://wa.me/17862667459',
  formspree: 'https://formspree.io/f/xjkwvwoa',
  location: 'Concord, North Carolina',
} as const;

interface Dict {
  htmlTitle: string;
  metaDescription: string;
  nav: { services: string; how: string; why: string; pricing: string; reviews: string; faq: string; quote: string };
  hero: {
    eyebrow: string;
    title: string[]; // words for split animation
    sub: string;
    cta: string;
    ctaSecondary: string;
    stat: { value: string; label: string }[];
  };
  marquee: string[];
  services: { eyebrow: string; title: string; sub: string; items: { tag: string; name: string; desc: string }[] };
  how: { eyebrow: string; title: string; steps: { n: string; name: string; desc: string }[] };
  why: { eyebrow: string; title: string; items: { name: string; desc: string }[] };
  pricing: { eyebrow: string; title: string; sub: string; factors: { name: string; desc: string }[]; note: string };
  reviews: { eyebrow: string; title: string; sub: string; items: { name: string; text: string }[] };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  finalCta: { title: string; sub: string; cta: string; call: string };
  footer: { tagline: string; rights: string; nav: string };
  form: {
    heading: string;
    sub: string;
    steps: string[];
    routeFrom: string;
    routeTo: string;
    routePlaceholder: string;
    year: string;
    make: string;
    model: string;
    selectYear: string;
    selectMake: string;
    selectModel: string;
    enclosed: string;
    enclosedHint: string;
    runs: string;
    runsHint: string;
    yes: string;
    no: string;
    date: string;
    name: string;
    email: string;
    phone: string;
    prefer: string;
    preferWhatsapp: string;
    preferPhone: string;
    preferEmail: string;
    back: string;
    next: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    invalidEmail: string;
  };
}

const en: Dict = {
  htmlTitle: 'Deluxe Move Broker | Door-to-Door Car Shipping Across the U.S.',
  metaDescription:
    'Insured, door-to-door vehicle transport for daily drivers, classics and exotics. No payment up front. Get a free quote — Concord, NC.',
  nav: { services: 'Services', how: 'How it works', why: 'Why us', pricing: 'Pricing', reviews: 'Reviews', faq: 'FAQ', quote: 'Get a quote' },
  hero: {
    eyebrow: 'Nationwide vehicle transport',
    title: ['Ship', 'your', 'car', 'anywhere', 'in', 'the', 'U.S.'],
    sub: 'Insured carriers, door-to-door, and nothing to pay up front.',
    cta: 'Request a quote',
    ctaSecondary: 'WhatsApp us',
    stat: [
      { value: '10+', label: 'Years on the road' },
      { value: '$0', label: 'Up front' },
      { value: '48', label: 'States served' },
    ],
  },
  marquee: ['Classics', 'Exotics', 'Daily drivers', 'Enclosed', 'Open transport', 'Insured', 'Door-to-door', 'Storage'],
  services: {
    eyebrow: 'What we move',
    title: 'Three ways to move a vehicle',
    sub: 'From a weekend project to a garage full of exotics.',
    items: [
      { tag: '01', name: 'Enclosed Trailers', desc: 'Classics, exotics and race cars shipped fully enclosed, shielded from road and weather.' },
      { tag: '02', name: 'Open Trailers', desc: 'Any vehicle moved on open equipment — the cost-effective standard for daily drivers.' },
      { tag: '03', name: 'Local Transport & Storage', desc: 'Pickup and delivery in Concord, NC, plus secure storage and forklift service.' },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps to a booked move',
    steps: [
      { n: '01', name: 'Tell us the route', desc: 'Pickup, drop-off and your vehicle. Two minutes, no account.' },
      { n: '02', name: 'Get a real quote', desc: 'We match your move to insured carriers and send a clear price.' },
      { n: '03', name: 'Ship, pay on delivery', desc: 'Track your car door-to-door. Nothing to pay up front.' },
    ],
  },
  why: {
    eyebrow: 'Why choose us',
    title: 'The broker in your corner',
    items: [
      { name: 'Personal guidance', desc: 'A real person plans your move end to end.' },
      { name: 'No payment up front', desc: 'You commit when the price and carrier are right.' },
      { name: 'Insurance coverage', desc: 'Every mile runs on an insured, vetted carrier.' },
      { name: 'Expert support', desc: 'Over a decade coordinating moves nationwide.' },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'What shapes your price',
    sub: 'No flat rates — every move is quoted on what it actually takes.',
    factors: [
      { name: 'Size & weight', desc: 'Larger, heavier vehicles take more space on the trailer.' },
      { name: 'Vehicle condition', desc: 'Running vehicles load faster; inoperable ones need special handling.' },
      { name: 'Transport type', desc: 'Open is the economical standard; enclosed protects high-value cars.' },
    ],
    note: 'Your quote is free and comes with no obligation.',
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'Owners who trusted the move',
    sub: 'Over 10 years earning the keys.',
    items: [
      { name: 'John Hoekstra', text: 'Clear communication from quote to delivery. My car arrived exactly as promised.' },
      { name: 'Scott McCool', text: 'Handled my classic with real care. The enclosed option was worth every mile.' },
      { name: 'Marilyn Smith', text: 'No pressure, no up-front games — just an honest price and a smooth pickup.' },
      { name: 'Chris Donnelly', text: 'Booked, shipped and delivered across the country without a single headache.' },
    ],
  },
  faq: {
    eyebrow: 'Good to know',
    title: 'Questions, answered',
    items: [
      {
        q: 'How does door-to-door car shipping work?',
        a: 'You tell us the pickup and delivery locations and your vehicle details. We match your move to an insured carrier, send you a clear quote, and coordinate pickup as close to your door as the truck can safely reach. You track the vehicle in transit and there is nothing to pay up front — you settle once everything is confirmed.',
      },
      {
        q: 'Do I have to pay before my car ships?',
        a: 'No. Deluxe Move Broker never asks for payment up front. You commit only when the price and the assigned carrier are right for you, which keeps the whole process low-risk from the first quote.',
      },
      {
        q: 'Is my vehicle insured during transport?',
        a: 'Yes. Every move runs on a vetted, insured carrier, so your vehicle is covered for the length of the trip. If you are shipping a classic or exotic, our enclosed trailers add a further layer of protection from road debris and weather.',
      },
      {
        q: 'How much does it cost to ship a car?',
        a: 'There is no flat rate. Your price depends on the size and weight of the vehicle, whether it runs, the distance, and whether you choose open or enclosed transport. Request a quote and we will send a clear, no-obligation price for your exact move.',
      },
    ],
  },
  finalCta: {
    title: 'Ready to move your car?',
    sub: 'Get a free, no-obligation quote in minutes.',
    cta: 'Request a quote',
    call: 'Call +1 704-699-4001',
  },
  footer: { tagline: 'Insured, door-to-door vehicle transport.', rights: 'All rights reserved.', nav: 'Footer' },
  form: {
    heading: 'Request a quote',
    sub: 'Three quick steps. No account, no up-front payment.',
    steps: ['Route', 'Vehicle', 'Contact'],
    routeFrom: 'Pickup location',
    routeTo: 'Delivery location',
    routePlaceholder: 'City, State',
    year: 'Year',
    make: 'Make',
    model: 'Model',
    selectYear: 'Select year',
    selectMake: 'Select make',
    selectModel: 'Select model',
    enclosed: 'Enclosed transport?',
    enclosedHint: 'Recommended for classics and exotics.',
    runs: 'Does the vehicle run?',
    runsHint: 'Non-running vehicles need special handling.',
    yes: 'Yes',
    no: 'No',
    date: 'Estimated pickup date',
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    prefer: 'Preferred way to receive your quote',
    preferWhatsapp: 'WhatsApp',
    preferPhone: 'Phone call',
    preferEmail: 'Email',
    back: 'Back',
    next: 'Next',
    submit: 'Send request',
    sending: 'Sending…',
    success: 'Thanks — your request is in. We will reach out with your quote shortly.',
    error: 'Something went wrong. Please try again or WhatsApp us at +1 704-699-4001.',
    required: 'This field is required.',
    invalidEmail: 'Enter a valid email address.',
  },
};

const es: Dict = {
  htmlTitle: 'Deluxe Move Broker | Transporte de autos puerta a puerta en EE.UU.',
  metaDescription:
    'Transporte de vehículos asegurado y puerta a puerta para autos diarios, clásicos y exóticos. Sin pago por adelantado. Cotización gratis — Concord, NC.',
  nav: { services: 'Servicios', how: 'Cómo funciona', why: 'Por qué', pricing: 'Precios', reviews: 'Opiniones', faq: 'Preguntas', quote: 'Cotizar' },
  hero: {
    eyebrow: 'Transporte de vehículos en todo EE.UU.',
    title: ['Enviá', 'tu', 'auto', 'a', 'cualquier', 'punto', 'de', 'EE.UU.'],
    sub: 'Transportistas asegurados, puerta a puerta y sin pagar por adelantado.',
    cta: 'Pedir cotización',
    ctaSecondary: 'Escribinos',
    stat: [
      { value: '10+', label: 'Años en ruta' },
      { value: '$0', label: 'Por adelantado' },
      { value: '48', label: 'Estados cubiertos' },
    ],
  },
  marquee: ['Clásicos', 'Exóticos', 'Autos diarios', 'Cerrado', 'Abierto', 'Asegurado', 'Puerta a puerta', 'Almacenaje'],
  services: {
    eyebrow: 'Qué transportamos',
    title: 'Tres formas de mover un vehículo',
    sub: 'Desde un proyecto de fin de semana hasta un garaje lleno de exóticos.',
    items: [
      { tag: '01', name: 'Tráiler cerrado', desc: 'Clásicos, exóticos y autos de carrera en tráiler cerrado, a resguardo de la ruta y el clima.' },
      { tag: '02', name: 'Tráiler abierto', desc: 'Cualquier vehículo en equipo abierto: el estándar más económico para el día a día.' },
      { tag: '03', name: 'Transporte local y almacenaje', desc: 'Recogida y entrega en Concord, NC, más almacenamiento seguro y servicio de montacargas.' },
    ],
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Tres pasos hasta el envío',
    steps: [
      { n: '01', name: 'Contanos la ruta', desc: 'Origen, destino y tu vehículo. Dos minutos, sin cuenta.' },
      { n: '02', name: 'Recibí un precio real', desc: 'Asignamos transportistas asegurados y te enviamos un precio claro.' },
      { n: '03', name: 'Enviá y pagá al recibir', desc: 'Seguí tu auto puerta a puerta. Nada por adelantado.' },
    ],
  },
  why: {
    eyebrow: 'Por qué elegirnos',
    title: 'El bróker de tu lado',
    items: [
      { name: 'Asesoría personalizada', desc: 'Una persona real planifica tu envío de principio a fin.' },
      { name: 'Sin pago por adelantado', desc: 'Te comprometés cuando el precio y el transportista son los correctos.' },
      { name: 'Cobertura de seguro', desc: 'Cada kilómetro va con un transportista asegurado y verificado.' },
      { name: 'Soporte experto', desc: 'Más de una década coordinando envíos en todo el país.' },
    ],
  },
  pricing: {
    eyebrow: 'Precios',
    title: 'Qué define tu precio',
    sub: 'Sin tarifas planas: cada envío se cotiza por lo que realmente implica.',
    factors: [
      { name: 'Tamaño y peso', desc: 'Los vehículos más grandes y pesados ocupan más espacio en el tráiler.' },
      { name: 'Condición del vehículo', desc: 'Los que funcionan cargan más rápido; los inoperables requieren manejo especial.' },
      { name: 'Tipo de transporte', desc: 'El abierto es el estándar económico; el cerrado protege autos de alto valor.' },
    ],
    note: 'Tu cotización es gratis y sin compromiso.',
  },
  reviews: {
    eyebrow: 'Opiniones',
    title: 'Dueños que confiaron el envío',
    sub: 'Más de 10 años ganándonos las llaves.',
    items: [
      { name: 'John Hoekstra', text: 'Comunicación clara desde la cotización hasta la entrega. Mi auto llegó tal cual lo prometido.' },
      { name: 'Scott McCool', text: 'Trataron mi clásico con verdadero cuidado. La opción cerrada valió cada kilómetro.' },
      { name: 'Marilyn Smith', text: 'Sin presión ni juegos de pago por adelantado: solo un precio honesto y una recogida impecable.' },
      { name: 'Chris Donnelly', text: 'Reservado, enviado y entregado de costa a costa sin un solo dolor de cabeza.' },
    ],
  },
  faq: {
    eyebrow: 'Bueno saberlo',
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Cómo funciona el transporte de autos puerta a puerta?',
        a: 'Nos indicás el lugar de recogida y de entrega y los datos de tu vehículo. Asignamos un transportista asegurado, te enviamos una cotización clara y coordinamos la recogida lo más cerca de tu puerta que el camión pueda llegar de forma segura. Seguís el vehículo en tránsito y no hay nada que pagar por adelantado: abonás una vez que todo está confirmado.',
      },
      {
        q: '¿Tengo que pagar antes de que envíen mi auto?',
        a: 'No. Deluxe Move Broker nunca pide pago por adelantado. Te comprometés solo cuando el precio y el transportista asignado son los correctos para vos, lo que mantiene todo el proceso de bajo riesgo desde la primera cotización.',
      },
      {
        q: '¿Mi vehículo está asegurado durante el transporte?',
        a: 'Sí. Cada envío va con un transportista verificado y asegurado, así tu vehículo queda cubierto durante todo el viaje. Si enviás un clásico o exótico, nuestros tráileres cerrados suman una capa extra de protección contra escombros y clima.',
      },
      {
        q: '¿Cuánto cuesta enviar un auto?',
        a: 'No hay tarifa plana. Tu precio depende del tamaño y peso del vehículo, si funciona, la distancia y si elegís transporte abierto o cerrado. Pedí una cotización y te enviamos un precio claro y sin compromiso para tu envío exacto.',
      },
    ],
  },
  finalCta: {
    title: '¿Listo para mover tu auto?',
    sub: 'Cotización gratis y sin compromiso en minutos.',
    cta: 'Pedir cotización',
    call: 'Llamar +1 704-699-4001',
  },
  footer: { tagline: 'Transporte de vehículos asegurado, puerta a puerta.', rights: 'Todos los derechos reservados.', nav: 'Pie de página' },
  form: {
    heading: 'Pedir cotización',
    sub: 'Tres pasos rápidos. Sin cuenta, sin pago por adelantado.',
    steps: ['Ruta', 'Vehículo', 'Contacto'],
    routeFrom: 'Lugar de recogida',
    routeTo: 'Lugar de entrega',
    routePlaceholder: 'Ciudad, Estado',
    year: 'Año',
    make: 'Marca',
    model: 'Modelo',
    selectYear: 'Elegí año',
    selectMake: 'Elegí marca',
    selectModel: 'Elegí modelo',
    enclosed: '¿Transporte cerrado?',
    enclosedHint: 'Recomendado para clásicos y exóticos.',
    runs: '¿El vehículo funciona?',
    runsHint: 'Los que no funcionan requieren manejo especial.',
    yes: 'Sí',
    no: 'No',
    date: 'Fecha estimada de recogida',
    name: 'Nombre completo',
    email: 'Email',
    phone: 'Teléfono',
    prefer: 'Cómo preferís recibir tu cotización',
    preferWhatsapp: 'WhatsApp',
    preferPhone: 'Llamada',
    preferEmail: 'Email',
    back: 'Atrás',
    next: 'Siguiente',
    submit: 'Enviar solicitud',
    sending: 'Enviando…',
    success: 'Gracias, recibimos tu solicitud. Te contactaremos con tu cotización a la brevedad.',
    error: 'Algo salió mal. Probá de nuevo o escribinos por WhatsApp al +1 704-699-4001.',
    required: 'Este campo es obligatorio.',
    invalidEmail: 'Ingresá un email válido.',
  },
};

export const CONTENT: Record<Lang, Dict> = { en, es };
