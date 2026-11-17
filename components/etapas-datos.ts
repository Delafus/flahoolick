/** Las tres etapas de la metodología. Cada una tiene su página en /metodologia/[slug] (como nobl.io/methodology/...).
    Alimenta esas páginas, el megamenú y la lista de etapas de /metodologia, para que nunca queden desincronizadas. */

export interface Etapa {
  slug: string
  numero: string
  nombre: string
  /** Una línea: va en el megamenú y como bajada del hero. */
  resumen: string
  /** Qué hacemos en esta etapa. */
  texto: string
  /** Cómo lo hacemos. */
  como: { titulo: string; texto: string }[]
  recibes: string
  /** Cita de cliente (opcional). */
  cita?: { texto: string; nombre: string; cargo: string; retrato?: string }
}

export const ETAPAS: Etapa[] = [
  {
    slug: 'encontramos',
    numero: '01',
    nombre: 'Encontramos',
    resumen: 'Entramos a tu negocio, hablamos con quienes lo conocen y revisamos lo que ya tienes.',
    texto: 'Entramos a tu negocio, revisamos la oferta, el mercado, las audiencias y el proceso comercial. Entrevistamos a dirección, ventas y especialistas para identificar qué problemas reales resuelves, cuál es el conocimiento que distingue a la empresa y dónde están las brechas que hoy dificultan explicarlo.',
    como: [
      { titulo: 'Conversaciones con quienes saben', texto: 'Entrevistas breves con dirección, ventas y especialistas. Aportan lo que saben en una conversación, sin convertirse en creadores de contenido.' },
      { titulo: 'Revisión de lo que ya tienes', texto: 'Documentos, presentaciones, reuniones, datos y las preguntas que hoy reciben ventas y atención.' },
      { titulo: 'Diagnóstico de cinco días', texto: 'Auditamos qué sabe tu empresa, cómo habla hoy tu equipo, cómo te muestran los modelos de IA cuando tu comprador busca y dónde están los vacíos.' },
    ],
    recibes: 'Un diagnóstico con hallazgos, prioridades y los argumentos y evidencias que hacen que un cliente te elija.',
  },
  {
    slug: 'ordenamos',
    numero: '02',
    nombre: 'Ordenamos',
    resumen: 'Cruzamos lo que ofreces con lo que tu cliente necesita resolver.',
    texto: 'Cruzamos lo que ofreces con lo que tu cliente necesita resolver. Elegimos qué lugar puede ocupar la empresa, qué idea debe organizar su relato y qué mensajes, argumentos y pruebas necesitan compartir dirección, marketing, ventas y los equipos técnicos.',
    como: [
      { titulo: 'Value Proposition Canvas', texto: 'La herramienta de Strategyzer para cruzar lo que tu empresa ofrece con lo que cada segmento de clientes necesita resolver.' },
      { titulo: 'Segmentos', texto: 'Definimos a quién hablarle primero y descartamos los segmentos que no conviene perseguir.' },
      { titulo: 'Testing cards y learning cards', texto: 'Ponemos a prueba la propuesta de valor antes de convertirla en marca y contenido.' },
      { titulo: 'Mapa de mensajes', texto: 'Los mensajes, argumentos y pruebas que toda la empresa cuenta igual, ordenados por audiencia y momento de decisión.' },
    ],
    recibes: 'Una propuesta de valor clara y un mapa de mensajes que toda la empresa cuenta igual, ordenado por audiencias y momentos de decisión.',
    cita: {
      texto: 'Estuvimos con una agencia de marketing que nunca logró articular nuestra propuesta de valor. Flahoolick la encontró en lo que nosotros mismos decíamos todos los días y hoy la vemos trabajando en cada canal.',
      nombre: 'Jessica Hupat',
      cargo: 'Founder, Dunamis',
      retrato: '/casos/dunamis/retrato-jessica-hupat.jpg',
    },
  },
  {
    slug: 'ponemos-en-circulacion',
    numero: '03',
    nombre: 'Ponemos en circulación',
    resumen: 'Lo convertimos en contenido y herramientas que tus clientes pueden encontrar, entender y recordar.',
    texto: 'Convertimos esa dirección en una operación concreta para que tus audiencias puedan encontrarte, entenderte y recordarte: definimos temas, contenidos, herramientas comerciales, formatos, canales, responsables y criterios de medición.',
    como: [
      { titulo: 'Plan editorial', texto: 'Qué publicar, para quién y cuándo, a partir de las preguntas reales de tus clientes.' },
      { titulo: 'Herramientas comerciales', texto: 'Simuladores, diagnósticos, dossiers y asistentes que ayudan a ventas en cada conversación.' },
      { titulo: 'Canales y responsables', texto: 'Quién produce, dónde se publica y con qué cadencia.' },
      { titulo: 'Medición con marketing y ventas', texto: 'Qué consigue atención, qué ayuda a explicar tu oferta y qué aporta al proceso comercial.' },
    ],
    recibes: 'Piezas publicadas y medidas junto a marketing y ventas, con una hoja de ruta para producir, evaluar y mejorar de forma continua.',
    cita: {
      texto: 'Uso los interactivos en cada conversación. Cuando llegamos a la reunión, el cliente ya entiende su situación y vamos directo a lo importante.',
      nombre: 'Ingrid Hupat',
      cargo: 'Agente, Dunamis Brokers · Valparaíso',
      retrato: '/casos/dunamis/retrato-ingrid-hupat.jpg',
    },
  },
]

export function etapaPorSlug(slug: string) {
  return ETAPAS.find(e => e.slug === slug)
}
