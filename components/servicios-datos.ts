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
    desc: 'Mapeamos qué busca tu comprador y qué temas puede liderar tu empresa.',
    href: '/servicios/estrategia-de-contenido',
  },
  {
    id: 'marca-y-relato',
    nombre: 'Marca y relato',
    desc: 'Una idea central y mensajes que todo el equipo cuenta igual.',
    href: '/servicios/marca-y-relato',
  },
  {
    id: 'produccion-de-contenido',
    nombre: 'Producción de contenido',
    desc: 'Piezas de autoridad y herramientas de venta, en cadencia mensual.',
    href: '/servicios/produccion-de-contenido',
  },
  {
    id: 'sistemas-de-contenido-con-ia',
    nombre: 'Sistemas de contenido con IA',
    desc: 'Infraestructura que captura y distribuye conocimiento a escala, con criterio senior.',
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
