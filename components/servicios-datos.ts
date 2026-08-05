/** Contenido de los cuatro servicios de Flahoolick.
    Vive fuera del componente para que la pagina (servidor) pueda leerlo:
    importarlo desde un modulo "use client" lo convierte en referencia de cliente. */

export interface Disciplina {
  id: string
  nombre: string
  desc: string
  href: string
}

/** Los cuatro servicios de Flahoolick, cada uno con su propia página bajo /servicios. */
export const DISCIPLINAS: Disciplina[] = [
  {
    id: 'estrategia-de-contenido',
    nombre: 'Estrategia de contenido',
    desc: 'Mapeamos audiencias, territorios de autoridad y las tensiones que activan la búsqueda de tu comprador.',
    href: '/servicios/estrategia-de-contenido',
  },
  {
    id: 'marca-y-relato',
    nombre: 'Marca y relato',
    desc: 'Construimos la idea central y la arquitectura de mensajes que unifican cómo tu empresa le habla al mercado.',
    href: '/servicios/marca-y-relato',
  },
  {
    id: 'produccion-de-contenido',
    nombre: 'Producción de contenido',
    desc: 'Producimos contenido de autoridad, activos ejecutivos y herramientas comerciales listas para el ciclo de cierre.',
    href: '/servicios/produccion-de-contenido',
  },
  {
    id: 'sistemas-de-contenido-con-ia',
    nombre: 'Sistemas de contenido con IA',
    desc: 'Diseñamos la infraestructura que captura, prioriza y distribuye conocimiento — con IA a escala y criterio senior.',
    href: '/servicios/sistemas-de-contenido-con-ia',
  },
]

/** Módulo "Qué puede producir" — activos agrupados por función, no como lista plana de formatos. */
export const GRUPOS_ACTIVOS = [
  {
    titulo: 'Autoridad de mercado',
    desc: 'Artículos, guías, reportes, casos, newsletters y series editoriales.',
  },
  {
    titulo: 'Habilitación comercial',
    desc: 'Decks, one-pagers, battlecards, sales playbooks y propuestas ejecutivas.',
  },
  {
    titulo: 'Distribución y descubrimiento',
    desc: 'LinkedIn, campañas B2B y contenido preparado para buscadores y plataformas de IA.',
  },
]
