/** Las tres capacidades de Flahoolick, cada una con su propia página bajo /servicios.
    Alimenta la home, la página /servicios y el megamenú, para que nunca queden desincronizados.
    Vive fuera de los componentes para que las páginas (servidor) puedan leerlo:
    importarlo desde un modulo "use client" lo convierte en referencia de cliente. */

export interface Disciplina {
  id: string
  numero: string
  nombre: string
  desc: string
  puntos: string[]
  href: string
}

export const DISCIPLINAS: Disciplina[] = [
  {
    id: 'estrategia-y-relato-de-marca',
    numero: '01',
    nombre: 'Estrategia y relato de marca',
    desc: 'Definimos qué lugar puede ocupar tu empresa en su mercado y qué necesita escuchar cada persona que participa en la compra.',
    puntos: [
      'Posicionamiento y propuesta de valor.',
      'Inteligencia de audiencias.',
      'Arquitectura de mensajes.',
      'Estrategia editorial.',
      'Narrativa de marca y liderazgo de opinión.',
    ],
    href: '/servicios/estrategia-y-relato-de-marca',
  },
  {
    id: 'sistema-operativo-de-contenido',
    numero: '02',
    nombre: 'Sistema operativo de contenido',
    desc: 'Organizamos qué publicar, para quién y cuándo, y cómo producirlo cada mes sin partir de cero.',
    puntos: [
      'Playbook de contenido.',
      'Planificación editorial.',
      'Flujos de trabajo.',
      'Producción de contenido especializado.',
      'Distribución y medición.',
    ],
    href: '/servicios/sistema-operativo-de-contenido',
  },
  {
    id: 'estudio-creativo-e-inteligencia-artificial',
    numero: '03',
    nombre: 'Estudio creativo e inteligencia artificial',
    desc: 'Producimos el contenido, las piezas comerciales y las herramientas de IA que salen de tu estrategia.',
    puntos: [
      'Contenidos de autoridad.',
      'Presentaciones y herramientas comerciales.',
      'Dossiers y casos de éxito.',
      'Agentes de inteligencia artificial.',
      'Investigación y automatización para marketing y ventas.',
    ],
    href: '/servicios/estudio-creativo-e-inteligencia-artificial',
  },
]
