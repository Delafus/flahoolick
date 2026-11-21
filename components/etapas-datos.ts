/** Las tres etapas de la metodología. Cada una tiene su página en /metodologia/[slug] (como nobl.io/methodology/...).
    Alimenta esas páginas, el megamenú y la lista de etapas de /metodologia, para que nunca queden desincronizadas. */

export interface Etapa {
  slug: string
  numero: string
  nombre: string
  /** Una línea: va en el megamenú y en el módulo "Cómo trabajamos". Es la primera frase de `intro`. */
  resumen: string
  /** Texto de la etapa en la home (gráfico por scroll). */
  intro: string
  /** Titular y bajada del hero de la página de la etapa. */
  titular: string
  /** Remate del titular que va en cursiva (el final exacto de `titular`). */
  cursiva: string
  bajada: string
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
    intro: 'Entramos a tu negocio, hablamos con quienes lo conocen y revisamos lo que ya tienes. Identificamos qué problemas resuelves, qué te diferencia y qué clientes valoran más tu propuesta.',
    titular: 'Lo que te hace distinto ya existe. Solo hay que encontrarlo.',
    cursiva: 'Solo hay que encontrarlo.',
    bajada: 'Casi siempre está en lo que tu equipo dice todos los días, sin saber que es justo lo que convence.',
    texto: 'Revisamos tu oferta, tu mercado y cómo avanza hoy una venta. Entrevistamos a dirección, ventas y especialistas para entender qué problemas resuelves de verdad, qué saben ustedes que otros no y qué les cuesta explicar.',
    como: [
      { titulo: 'Conversaciones con quienes saben', texto: 'Entrevistas breves. Tus especialistas cuentan lo que saben en una conversación; no tienen que escribir nada.' },
      { titulo: 'Revisión de lo que ya tienes', texto: 'Presentaciones, propuestas, documentos y las preguntas que hoy reciben ventas y atención al cliente.' },
      { titulo: 'Diagnóstico de cinco días', texto: 'Revisamos cómo explica hoy tu equipo la empresa, qué responden ChatGPT y otros asistentes cuando alguien pregunta por tu categoría, y dónde están los vacíos.' },
    ],
    recibes: 'Un diagnóstico con lo que te distingue, las pruebas que lo respaldan y lo que hoy falta explicar.',
  },
  {
    slug: 'ordenamos',
    numero: '02',
    nombre: 'Ordenamos',
    resumen: 'Cruzamos lo que ofreces con lo que tu cliente necesita resolver.',
    intro: 'Cruzamos lo que ofreces con lo que tu cliente necesita resolver. Definimos a quién hablarle, con qué mensajes y sobre qué temas puede liderar tu empresa.',
    titular: 'Una propuesta de valor que toda la empresa cuenta igual.',
    cursiva: 'que toda la empresa cuenta igual.',
    bajada: 'Para que dirección, ventas y los especialistas digan lo mismo, primero hay que decidir qué decir y a quién.',
    texto: 'Con lo que encontramos, elegimos qué lugar puede ocupar tu empresa y qué idea ordena todo lo que dice. Después definimos los mensajes y las pruebas que comparten dirección, marketing, ventas y los equipos técnicos.',
    como: [
      { titulo: 'Value Proposition Canvas', texto: 'La herramienta de Strategyzer para cruzar lo que tu empresa ofrece con lo que cada segmento de clientes necesita resolver.' },
      { titulo: 'Segmentos', texto: 'Definimos a quién hablarle primero y descartamos los segmentos que no conviene perseguir.' },
      { titulo: 'Testing cards y learning cards', texto: 'Probamos la propuesta con clientes reales antes de convertirla en marca y contenido.' },
      { titulo: 'Mapa de mensajes', texto: 'Qué se dice, con qué prueba, a qué persona y en qué momento de la compra.' },
    ],
    recibes: 'Una propuesta de valor probada y un mapa de audiencias, mensajes y contenidos.',
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
    resumen: 'Transformamos la estrategia en contenidos y herramientas que tus clientes pueden encontrar, entender y recordar.',
    intro: 'Transformamos la estrategia en contenidos y herramientas que tus clientes pueden encontrar, entender y recordar. Organizamos su producción, distribución y evolución junto a marketing y ventas.',
    titular: 'Lo que sabes, trabajando cada semana frente a tu mercado.',
    cursiva: 'trabajando cada semana frente a tu mercado.',
    bajada: 'Contenido y herramientas que tus clientes encuentran cuando buscan y recuerdan cuando les toca comprar.',
    texto: 'La estrategia deja de ser un documento y pasa a ser trabajo de cada semana. Producimos y publicamos junto a marketing y ventas, y ajustamos según lo que responde el mercado.',
    como: [
      { titulo: 'Plan editorial', texto: 'Qué publicar, para quién y cuándo, a partir de las preguntas reales de tus clientes.' },
      { titulo: 'Herramientas comerciales', texto: 'Simuladores, diagnósticos, dossiers y asistentes que ayudan a ventas en cada conversación.' },
      { titulo: 'Canales y responsables', texto: 'Quién produce, dónde se publica y con qué cadencia.' },
      { titulo: 'Medición con marketing y ventas', texto: 'Qué genera atención, qué ayuda a explicar tu oferta y qué acerca una venta.' },
    ],
    recibes: 'Piezas publicadas cada mes, herramientas que tu equipo comercial usa y una revisión periódica de resultados.',
    cita: {
      texto: 'Uso los interactivos en cada conversación. Cuando llegamos a la reunión, el cliente ya entiende su situación y vamos directo a lo importante.',
      nombre: 'Andre Ibarra',
      cargo: 'Agente, Dunamis Broker · Valparaíso',
      retrato: '/casos/dunamis/retrato-andre-ibarra.jpg',
    },
  },
]

export function etapaPorSlug(slug: string) {
  return ETAPAS.find(e => e.slug === slug)
}
