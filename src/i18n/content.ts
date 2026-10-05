// Bilingual content dictionary. EN is the default locale (/), ES lives at /es/.
// Spanish uses neutral "tú" for the U.S. Hispanic audience.

export type Lang = 'en' | 'es';

export const SITE_URL = 'https://deluxemovebrokerllc.com';

export const CONTACT = {
  phone: '+1 (786) 266-7459',
  phoneHref: 'tel:+17862667459',
  whatsappNumber: '17862667459',
  email: 'deluxemovebroker@gmail.com',
  // Web3Forms (free: 250 submissions/mo). The key is public by design; it only routes to its inbox.
  formEndpoint: 'https://api.web3forms.com/submit',
  web3formsKey: 'fecadf07-ca5d-4df4-bfd1-78194ca1470e',
  location: 'Concord, North Carolina',
  // schema.org openingHours
  openingHours: 'Mo-Sa 08:00-20:00',
} as const;

/** wa.me link with a prefilled first message in the visitor's language. */
export const whatsappHref = (lang: Lang) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTENT[lang].whatsappText)}`;

/** Locale-aware path to the privacy policy. */
export const privacyHref = (lang: Lang) => (lang === 'es' ? '/es/privacidad/' : '/privacy/');

interface Dict {
  htmlTitle: string;
  metaDescription: string;
  whatsappText: string;
  hours: string;
  nav: { services: string; how: string; why: string; pricing: string; reviews: string; faq: string; quote: string; call: string };
  hero: {
    eyebrow: string;
    title: string[]; // last word is highlighted
    sub: string;
    cta: string;
    ctaSecondary: string;
    stat: { value: string; label: string }[];
  };
  trust: string[];
  services: { eyebrow: string; title: string; sub: string; items: { tag: string; name: string; desc: string }[] };
  how: { eyebrow: string; title: string; steps: { n: string; name: string; desc: string }[] };
  why: { eyebrow: string; title: string; items: { name: string; desc: string }[] };
  pricing: {
    eyebrow: string;
    title: string;
    sub: string;
    compare: { name: string; best: string; points: string[]; tag?: string }[];
    factorsTitle: string;
    factors: { name: string; desc: string }[];
    note: string;
  };
  reviews: { eyebrow: string; title: string; sub: string; items: { name: string; text: string }[]; imageAlt: string };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  quote: { eyebrow: string; title: string; sub: string; points: string[]; hoursLabel: string; or: string };
  footer: { tagline: string; rights: string; nav: string; contact: string; hoursLabel: string; privacy: string };
  form: {
    heading: string;
    sub: string;
    steps: string[];
    routeFrom: string;
    routeTo: string;
    routePlaceholder: string;
    zipHint: string;
    zipNotFound: string;
    zipPick: string;
    year: string;
    make: string;
    model: string;
    selectYear: string;
    selectMake: string;
    selectModel: string;
    otherVehicle: string;
    otherVehiclePlaceholder: string;
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
    successCta: string;
    again: string;
    error: string;
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    consent: string;
  };
  privacy: { title: string; description: string; updated: string; back: string; sections: { h: string; p: string }[] };
  notFound: { title: string; sub: string; cta: string };
}

const en: Dict = {
  htmlTitle: 'Deluxe Move Broker | Door-to-Door Car Shipping Across the U.S.',
  metaDescription:
    'Insured, door-to-door car shipping to all 50 states for daily drivers, classics and exotics. Open or enclosed trailers, nothing to pay up front. Free quote — Concord, NC.',
  whatsappText: 'Hi! I would like a quote to ship my vehicle.',
  hours: 'Mon–Sat, 8 AM – 8 PM ET',
  nav: { services: 'Services', how: 'How it works', why: 'Why us', pricing: 'Pricing', reviews: 'Reviews', faq: 'FAQ', quote: 'Get a quote', call: 'Call' },
  hero: {
    eyebrow: 'Nationwide vehicle transport',
    title: ['Ship', 'your', 'car', 'anywhere', 'in', 'the', 'U.S.'],
    sub: 'Insured carriers, door-to-door, and nothing to pay up front.',
    cta: 'Get my free quote',
    ctaSecondary: 'WhatsApp us',
    stat: [
      { value: '10+', label: 'Years on the road' },
      { value: '$0', label: 'Up front' },
      { value: '50', label: 'States served' },
    ],
  },
  trust: ['Insured carriers', 'No payment up front', 'All 50 states', 'Open & enclosed', 'English & Spanish'],
  services: {
    eyebrow: 'What we move',
    title: 'Three ways to move a vehicle',
    sub: 'From a daily driver to a garage full of classics and exotics.',
    items: [
      { tag: '01', name: 'Enclosed Trailers', desc: 'Classics, exotics and race cars shipped fully enclosed, shielded from road debris and weather.' },
      { tag: '02', name: 'Open Trailers', desc: 'Any vehicle moved on open carriers — the cost-effective standard for daily drivers.' },
      { tag: '03', name: 'Local Transport & Storage', desc: 'Pickup and delivery around Concord, NC, plus secure storage and forklift service.' },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps to a booked move',
    steps: [
      { n: '01', name: 'Tell us the route', desc: 'Pickup, drop-off and your vehicle. Two minutes, no account.' },
      { n: '02', name: 'Get a real quote', desc: 'We match your move to insured carriers and send a clear price.' },
      { n: '03', name: 'Ship, pay on delivery', desc: 'We coordinate pickup and keep you posted until your car arrives. Nothing up front.' },
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
    title: 'Open or enclosed?',
    sub: 'No flat rates — every move is quoted on what it actually takes.',
    compare: [
      {
        name: 'Open transport',
        best: 'Best for daily drivers, SUVs and trucks',
        points: ['Most economical option', 'More carriers, faster pickup', 'Same insurance coverage'],
      },
      {
        name: 'Enclosed transport',
        best: 'Best for classics, exotics and high-value cars',
        tag: 'Premium',
        points: ['Fully protected from weather and debris', 'Extra care loading and unloading', 'Ideal for low-clearance vehicles'],
      },
    ],
    factorsTitle: 'What shapes your price',
    factors: [
      { name: 'Distance & route', desc: 'Longer and less-traveled routes take more time on the road.' },
      { name: 'Size & condition', desc: 'Larger or non-running vehicles need more space or special handling.' },
      { name: 'Transport type', desc: 'Open is the economical standard; enclosed protects high-value cars.' },
    ],
    note: 'Your quote is free and comes with no obligation.',
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'Owners who trusted the move',
    sub: 'Over 10 years earning the keys.',
    imageAlt: 'Driver handing the keys to a customer next to his delivered car, with the car carrier behind',
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
        a: 'You tell us the pickup and delivery locations and your vehicle details. We match your move to an insured carrier, send you a clear quote, and coordinate pickup as close to your door as the truck can safely reach. We keep you posted along the way, and there is nothing to pay up front.',
      },
      {
        q: 'Do I have to pay before my car ships?',
        a: 'No. Deluxe Move Broker never asks for payment up front. You commit only when the price and the assigned carrier are right for you, which keeps the whole process low-risk from the first quote.',
      },
      {
        q: 'Is my vehicle insured during transport?',
        a: 'Yes. Every move runs on a vetted, insured carrier, so your vehicle is covered for the length of the trip. If you are shipping a classic or exotic, enclosed trailers add a further layer of protection from road debris and weather.',
      },
      {
        q: 'How much does it cost to ship a car?',
        a: 'There is no flat rate. Your price depends on the distance, the size and condition of the vehicle, and whether you choose open or enclosed transport. Request a quote and we will send a clear, no-obligation price for your exact move.',
      },
      {
        q: 'How long does shipping take?',
        a: 'It depends on the distance and route. Regional moves often take a few days, while coast-to-coast moves usually take one to two weeks. We confirm the pickup window and estimated delivery with your quote.',
      },
      {
        q: 'How should I prepare my car?',
        a: 'Remove personal belongings and toll tags, leave about a quarter tank of fuel, and take photos of the vehicle before pickup. Personal items are not covered by carrier insurance, so it is best to ship the car empty.',
      },
      {
        q: 'Can you ship a car that does not run?',
        a: 'Yes. Non-running vehicles need equipment that can winch them on and off the trailer, so just let us know in the quote form and we will plan the move accordingly.',
      },
      {
        q: 'What is the difference between a broker and a carrier?',
        a: 'A carrier owns the trucks; a broker finds the right carrier for your route. As your broker, we compare vetted, insured carriers, handle the coordination and stay your single point of contact from quote to delivery.',
      },
    ],
  },
  quote: {
    eyebrow: 'Free quote',
    title: 'Ready to move your car?',
    sub: 'Tell us about your move and get a clear, no-obligation price — usually the same day.',
    points: ['No payment up front', 'Insured, vetted carriers', 'Door-to-door in all 50 states', 'Personal guidance in English or Spanish'],
    hoursLabel: 'Hours',
    or: 'Prefer to talk?',
  },
  footer: {
    tagline: 'Insured, door-to-door vehicle transport.',
    rights: 'All rights reserved.',
    nav: 'Footer',
    contact: 'Contact',
    hoursLabel: 'Hours',
    privacy: 'Privacy policy',
  },
  form: {
    heading: 'Request a quote',
    sub: 'Three quick steps. No account, no up-front payment.',
    steps: ['Route', 'Vehicle', 'Contact'],
    routeFrom: 'Pickup location',
    routeTo: 'Delivery location',
    routePlaceholder: 'ZIP code or City, State',
    zipHint: 'Type a 5-digit ZIP code and we will fill in the city and state.',
    zipNotFound: 'We could not find that ZIP code. Check it or type the city and state.',
    zipPick: 'Pick the city for this ZIP code from the list.',
    year: 'Year',
    make: 'Make',
    model: 'Model',
    selectYear: 'Select year',
    selectMake: 'Select make',
    selectModel: 'Select model',
    otherVehicle: 'Make and model',
    otherVehiclePlaceholder: 'e.g. Ram 1500',
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
    successCta: 'Chat on WhatsApp',
    again: 'Send another request',
    error: 'Something went wrong. Please try again or WhatsApp us at +1 (786) 266-7459.',
    required: 'This field is required.',
    invalidEmail: 'Enter a valid email address.',
    invalidPhone: 'Enter a valid phone number.',
    consent: 'By sending this request you agree to be contacted about your quote by phone, WhatsApp or email.',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How Deluxe Move Broker LLC collects and uses the information you share when requesting a vehicle transport quote.',
    updated: 'Last updated: October 2026',
    back: 'Back to home',
    sections: [
      {
        h: 'Information we collect',
        p: 'When you request a quote we collect the details you enter in the form: pickup and delivery locations, vehicle information, estimated pickup date, your name, phone number, email and preferred contact method.',
      },
      {
        h: 'How we use it',
        p: 'We use this information only to prepare your quote, contact you about your move and coordinate the transport with the carrier assigned to it.',
      },
      {
        h: 'Who we share it with',
        p: 'We share the details needed to perform your move with the carrier that transports your vehicle. Form submissions are delivered to us through Web3Forms, our form provider, and ZIP codes typed in the form are looked up with Zippopotam.us to fill in the city and state (only the ZIP code is sent). We do not sell your personal information.',
      },
      {
        h: 'How long we keep it',
        p: 'We keep quote requests only as long as needed to serve you and meet our legal obligations, and then delete them.',
      },
      {
        h: 'Your choices',
        p: 'You can ask us at any time to access, correct or delete your information, or to stop contacting you, by writing to deluxemovebroker@gmail.com or calling +1 (786) 266-7459.',
      },
    ],
  },
  notFound: { title: 'Page not found', sub: 'The page you are looking for does not exist or has moved.', cta: 'Back to home' },
};

const es: Dict = {
  htmlTitle: 'Deluxe Move Broker | Transporte de autos puerta a puerta en EE.UU.',
  metaDescription:
    'Transporte de vehículos asegurado y puerta a puerta a los 50 estados, para autos diarios, clásicos y exóticos. Tráiler abierto o cerrado, sin pago por adelantado. Cotización gratis — Concord, NC.',
  whatsappText: '¡Hola! Quiero una cotización para enviar mi vehículo.',
  hours: 'Lun–sáb, 8 a. m. – 8 p. m. (hora del Este)',
  nav: { services: 'Servicios', how: 'Cómo funciona', why: 'Por qué', pricing: 'Precios', reviews: 'Opiniones', faq: 'Preguntas', quote: 'Cotizar', call: 'Llamar' },
  hero: {
    eyebrow: 'Transporte de vehículos en todo EE.UU.',
    title: ['Envía', 'tu', 'auto', 'a', 'cualquier', 'lugar', 'de', 'EE.UU.'],
    sub: 'Transportistas asegurados, puerta a puerta y sin pagar por adelantado.',
    cta: 'Quiero mi cotización gratis',
    ctaSecondary: 'Escríbenos',
    stat: [
      { value: '10+', label: 'Años en ruta' },
      { value: '$0', label: 'Por adelantado' },
      { value: '50', label: 'Estados cubiertos' },
    ],
  },
  trust: ['Transportistas asegurados', 'Sin pago por adelantado', 'Los 50 estados', 'Abierto y cerrado', 'Atención en español'],
  services: {
    eyebrow: 'Qué transportamos',
    title: 'Tres formas de mover un vehículo',
    sub: 'Desde tu auto de todos los días hasta un garaje lleno de clásicos y exóticos.',
    items: [
      { tag: '01', name: 'Tráiler cerrado', desc: 'Clásicos, exóticos y autos de carrera en tráiler cerrado, protegidos de la carretera y el clima.' },
      { tag: '02', name: 'Tráiler abierto', desc: 'Cualquier vehículo en transporte abierto: la opción más económica para el día a día.' },
      { tag: '03', name: 'Transporte local y almacenaje', desc: 'Recogida y entrega en el área de Concord, NC, más almacenamiento seguro y servicio de montacargas.' },
    ],
  },
  how: {
    eyebrow: 'Cómo funciona',
    title: 'Tres pasos para enviar tu auto',
    steps: [
      { n: '01', name: 'Cuéntanos la ruta', desc: 'Origen, destino y tu vehículo. Dos minutos, sin crear cuenta.' },
      { n: '02', name: 'Recibe un precio real', desc: 'Asignamos transportistas asegurados y te enviamos un precio claro.' },
      { n: '03', name: 'Envía y paga al recibir', desc: 'Coordinamos la recogida y te mantenemos al tanto hasta la entrega. Nada por adelantado.' },
    ],
  },
  why: {
    eyebrow: 'Por qué elegirnos',
    title: 'El bróker de tu lado',
    items: [
      { name: 'Asesoría personalizada', desc: 'Una persona real planifica tu envío de principio a fin.' },
      { name: 'Sin pago por adelantado', desc: 'Te comprometes cuando el precio y el transportista son los correctos.' },
      { name: 'Cobertura de seguro', desc: 'Cada milla va con un transportista asegurado y verificado.' },
      { name: 'Soporte experto', desc: 'Más de una década coordinando envíos en todo el país.' },
    ],
  },
  pricing: {
    eyebrow: 'Precios',
    title: '¿Abierto o cerrado?',
    sub: 'Sin tarifas fijas: cada envío se cotiza según lo que realmente implica.',
    compare: [
      {
        name: 'Transporte abierto',
        best: 'Ideal para autos diarios, SUVs y camionetas',
        points: ['La opción más económica', 'Más transportistas, recogida más rápida', 'La misma cobertura de seguro'],
      },
      {
        name: 'Transporte cerrado',
        best: 'Ideal para clásicos, exóticos y autos de alto valor',
        tag: 'Premium',
        points: ['Protección total contra clima y escombros', 'Cuidado extra al cargar y descargar', 'Perfecto para autos bajos'],
      },
    ],
    factorsTitle: 'Qué define tu precio',
    factors: [
      { name: 'Distancia y ruta', desc: 'Las rutas más largas o menos transitadas requieren más tiempo en carretera.' },
      { name: 'Tamaño y condición', desc: 'Los vehículos grandes o que no encienden necesitan más espacio o manejo especial.' },
      { name: 'Tipo de transporte', desc: 'El abierto es la opción económica; el cerrado protege autos de alto valor.' },
    ],
    note: 'Tu cotización es gratis y sin compromiso.',
  },
  reviews: {
    eyebrow: 'Opiniones',
    title: 'Dueños que confiaron su envío',
    sub: 'Más de 10 años ganándonos su confianza.',
    imageAlt: 'Conductor entregando las llaves a un cliente junto a su auto, con el camión portaautos detrás',
    items: [
      { name: 'John Hoekstra', text: 'Comunicación clara desde la cotización hasta la entrega. Mi auto llegó tal como lo prometieron.' },
      { name: 'Scott McCool', text: 'Trataron mi clásico con verdadero cuidado. El transporte cerrado valió cada milla.' },
      { name: 'Marilyn Smith', text: 'Sin presión ni cobros por adelantado: solo un precio honesto y una recogida impecable.' },
      { name: 'Chris Donnelly', text: 'Reservado, enviado y entregado de costa a costa sin un solo dolor de cabeza.' },
    ],
  },
  faq: {
    eyebrow: 'Bueno saberlo',
    title: 'Preguntas frecuentes',
    items: [
      {
        q: '¿Cómo funciona el transporte de autos puerta a puerta?',
        a: 'Nos indicas el lugar de recogida y de entrega y los datos de tu vehículo. Asignamos un transportista asegurado, te enviamos una cotización clara y coordinamos la recogida lo más cerca de tu puerta que el camión pueda llegar de forma segura. Te mantenemos informado durante el envío y no hay nada que pagar por adelantado.',
      },
      {
        q: '¿Tengo que pagar antes de que envíen mi auto?',
        a: 'No. Deluxe Move Broker nunca pide pago por adelantado. Te comprometes solo cuando el precio y el transportista asignado son los correctos para ti, lo que mantiene todo el proceso de bajo riesgo desde la primera cotización.',
      },
      {
        q: '¿Mi vehículo está asegurado durante el transporte?',
        a: 'Sí. Cada envío va con un transportista verificado y asegurado, así tu vehículo queda cubierto durante todo el viaje. Si envías un clásico o exótico, el tráiler cerrado suma una capa extra de protección contra escombros y clima.',
      },
      {
        q: '¿Cuánto cuesta enviar un auto?',
        a: 'No hay tarifa fija. Tu precio depende de la distancia, el tamaño y la condición del vehículo y de si eliges transporte abierto o cerrado. Pide una cotización y te enviamos un precio claro y sin compromiso para tu envío exacto.',
      },
      {
        q: '¿Cuánto tarda el envío?',
        a: 'Depende de la distancia y la ruta. Los envíos regionales suelen tardar unos días, y los de costa a costa normalmente entre una y dos semanas. Te confirmamos la ventana de recogida y la entrega estimada junto con tu cotización.',
      },
      {
        q: '¿Cómo preparo mi auto?',
        a: 'Retira tus objetos personales y los tags de peaje, deja alrededor de un cuarto de tanque de gasolina y toma fotos del vehículo antes de la recogida. Los objetos personales no están cubiertos por el seguro del transportista, así que lo mejor es enviar el auto vacío.',
      },
      {
        q: '¿Pueden enviar un auto que no enciende?',
        a: 'Sí. Los vehículos que no encienden necesitan equipo con winche para subirlos y bajarlos del tráiler, así que indícalo en el formulario y planificamos el envío según eso.',
      },
      {
        q: '¿Qué diferencia hay entre un bróker y un transportista?',
        a: 'El transportista es dueño de los camiones; el bróker encuentra el transportista adecuado para tu ruta. Como tu bróker, comparamos transportistas verificados y asegurados, coordinamos todo y somos tu único contacto desde la cotización hasta la entrega.',
      },
    ],
  },
  quote: {
    eyebrow: 'Cotización gratis',
    title: '¿Listo para mover tu auto?',
    sub: 'Cuéntanos sobre tu envío y recibe un precio claro y sin compromiso, normalmente el mismo día.',
    points: ['Sin pago por adelantado', 'Transportistas asegurados y verificados', 'Puerta a puerta en los 50 estados', 'Atención personalizada en español o inglés'],
    hoursLabel: 'Horario',
    or: '¿Prefieres hablar?',
  },
  footer: {
    tagline: 'Transporte de vehículos asegurado, puerta a puerta.',
    rights: 'Todos los derechos reservados.',
    nav: 'Pie de página',
    contact: 'Contacto',
    hoursLabel: 'Horario',
    privacy: 'Política de privacidad',
  },
  form: {
    heading: 'Pide tu cotización',
    sub: 'Tres pasos rápidos. Sin crear cuenta, sin pago por adelantado.',
    steps: ['Ruta', 'Vehículo', 'Contacto'],
    routeFrom: 'Lugar de recogida',
    routeTo: 'Lugar de entrega',
    routePlaceholder: 'Código postal o Ciudad, Estado',
    zipHint: 'Escribe un código postal de 5 dígitos y completamos la ciudad y el estado.',
    zipNotFound: 'No encontramos ese código postal. Revísalo o escribe la ciudad y el estado.',
    zipPick: 'Elige de la lista la ciudad de este código postal.',
    year: 'Año',
    make: 'Marca',
    model: 'Modelo',
    selectYear: 'Elige el año',
    selectMake: 'Elige la marca',
    selectModel: 'Elige el modelo',
    otherVehicle: 'Marca y modelo',
    otherVehiclePlaceholder: 'Ej.: Ram 1500',
    enclosed: '¿Transporte cerrado?',
    enclosedHint: 'Recomendado para clásicos y exóticos.',
    runs: '¿El vehículo enciende?',
    runsHint: 'Los que no encienden requieren manejo especial.',
    yes: 'Sí',
    no: 'No',
    date: 'Fecha estimada de recogida',
    name: 'Nombre completo',
    email: 'Email',
    phone: 'Teléfono',
    prefer: '¿Cómo prefieres recibir tu cotización?',
    preferWhatsapp: 'WhatsApp',
    preferPhone: 'Llamada',
    preferEmail: 'Email',
    back: 'Atrás',
    next: 'Siguiente',
    submit: 'Enviar solicitud',
    sending: 'Enviando…',
    success: 'Gracias, recibimos tu solicitud. Te contactaremos con tu cotización muy pronto.',
    successCta: 'Escríbenos por WhatsApp',
    again: 'Enviar otra solicitud',
    error: 'Algo salió mal. Intenta de nuevo o escríbenos por WhatsApp al +1 (786) 266-7459.',
    required: 'Este campo es obligatorio.',
    invalidEmail: 'Ingresa un email válido.',
    invalidPhone: 'Ingresa un teléfono válido.',
    consent: 'Al enviar esta solicitud aceptas que te contactemos sobre tu cotización por teléfono, WhatsApp o email.',
  },
  privacy: {
    title: 'Política de privacidad',
    description: 'Cómo Deluxe Move Broker LLC recopila y usa la información que compartes al pedir una cotización de transporte de vehículos.',
    updated: 'Última actualización: octubre de 2026',
    back: 'Volver al inicio',
    sections: [
      {
        h: 'Información que recopilamos',
        p: 'Cuando pides una cotización recopilamos los datos que ingresas en el formulario: lugares de recogida y entrega, información del vehículo, fecha estimada de recogida, tu nombre, teléfono, email y forma de contacto preferida.',
      },
      {
        h: 'Cómo la usamos',
        p: 'Usamos esta información solo para preparar tu cotización, contactarte sobre tu envío y coordinar el transporte con el transportista asignado.',
      },
      {
        h: 'Con quién la compartimos',
        p: 'Compartimos los datos necesarios para realizar tu envío con el transportista que mueve tu vehículo. Las solicitudes del formulario nos llegan a través de Web3Forms, nuestro proveedor de formularios, y los códigos postales que escribes se consultan en Zippopotam.us para completar la ciudad y el estado (solo se envía el código postal). No vendemos tu información personal.',
      },
      {
        h: 'Cuánto tiempo la guardamos',
        p: 'Guardamos las solicitudes solo el tiempo necesario para atenderte y cumplir nuestras obligaciones legales, y luego las eliminamos.',
      },
      {
        h: 'Tus opciones',
        p: 'Puedes pedirnos en cualquier momento acceder, corregir o eliminar tu información, o que dejemos de contactarte, escribiendo a deluxemovebroker@gmail.com o llamando al +1 (786) 266-7459.',
      },
    ],
  },
  notFound: { title: 'Página no encontrada', sub: 'La página que buscas no existe o cambió de lugar.', cta: 'Volver al inicio' },
};

export const CONTENT: Record<Lang, Dict> = { en, es };
