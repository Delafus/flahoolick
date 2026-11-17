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
    desc: 'Definimos qué hace valiosa a tu empresa, cómo debe posicionarse y qué necesita escuchar cada audiencia.',
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
    desc: 'Diseñamos la estructura que permite producir y distribuir contenido relevante de manera continua.',
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
    desc: 'Convertimos la estrategia en contenidos, experiencias y herramientas que apoyan marketing y ventas.',
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
