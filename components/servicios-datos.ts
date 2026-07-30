/** Contenido de los tres servicios productizados.
    Vive fuera del componente para que la pagina (servidor) pueda leerlo:
    importarlo desde un modulo "use client" lo convierte en referencia de cliente. */

export interface Servicio {
  id: string
  numero: string
  nombre: string

  /** Tarjeta-resumen del módulo "Elige dónde empezar" — teaser, no repite la sección profunda. */
  tarjeta: {
    titulo: string
    /** Para qué tipo de empresa/situación es este servicio. */
    paraQuien: string
    entregable: string
    duracion: string
    ctaLabel: string
  }

  /** Sección profunda de cada servicio. */
  seccion: {
    eyebrow: string
    titulo: string
    introduccion: string
    resultado: string
    entregable: { titulo: string; desc: string }
    incluye: string[]
    plazo: { label: string; valor: string }
    ctaLabel: string
  }
}

export const SERVICIOS: Servicio[] = [
  {
    id: 'diagnostico',
    numero: '01',
    nombre: 'Diagnóstico de Autoridad',
    tarjeta: {
      titulo: 'Ordena qué merece llegar al mercado.',
      paraQuien: 'Para empresas con experiencia dispersa, múltiples audiencias y demasiados temas compitiendo por atención.',
      entregable: 'Mapa de Autoridad de Mercado',
      duracion: '2 a 4 semanas',
      ctaLabel: 'Explorar diagnóstico →',
    },
    seccion: {
      eyebrow: '01 — Diagnóstico de Autoridad',
      titulo: 'Decide qué merece llegar al mercado.',
      introduccion: 'Ordenamos las fuentes internas, las audiencias y las señales de la categoría para definir qué temas puede liderar la empresa.',
      resultado: 'Una agenda estratégica que establece qué comunicar, para quién, en qué momento y con qué evidencia.',
      entregable: {
        titulo: 'Mapa de Autoridad de Mercado',
        desc: 'Un documento de decisión que conecta la experiencia de la empresa con las preguntas y situaciones que movilizan a sus compradores.',
      },
      incluye: [
        'Mapa de conocimiento y evidencia.',
        'Audiencias y preguntas críticas.',
        'Puntos de entrada a la categoría.',
        'Territorios de autoridad.',
        'Brechas de visibilidad.',
        'Hoja de ruta priorizada.',
      ],
      plazo: { label: 'Duración', valor: '2 a 4 semanas.' },
      ctaLabel: 'Ordenar nuestras prioridades →',
    },
  },
  {
    id: 'instalacion',
    numero: '02',
    nombre: 'Instalación del Sistema',
    tarjeta: {
      titulo: 'Convierte la estrategia en una forma de trabajar.',
      paraQuien: 'Para equipos que necesitan conectar especialistas, marketing, ventas y producción bajo una operación común.',
      entregable: 'Sistema Operativo de Contenido',
      duracion: '6 a 10 semanas',
      ctaLabel: 'Explorar instalación →',
    },
    seccion: {
      eyebrow: '02 — Instalación del Sistema',
      titulo: 'Instala una forma sostenible de producir.',
      introduccion: 'Conectamos especialistas, marketing, ventas y producción bajo criterios, roles y flujos compartidos.',
      resultado: 'Una operación capaz de transformar prioridades estratégicas en contenido de manera continua.',
      entregable: {
        titulo: 'Sistema Operativo de Contenido',
        desc: 'Un playbook aplicado que ordena cómo entra la información, cómo se prioriza y cómo se convierte en activos para el mercado.',
      },
      incluye: [
        'Arquitectura de mensajes.',
        'Territorios y series editoriales.',
        'Sistema de captura.',
        'Playbook de producción.',
        'Roles y gobernanza.',
        'Flujos de aprobación.',
        'Cadencia editorial.',
        'Marco de medición.',
      ],
      plazo: { label: 'Duración', valor: '6 a 10 semanas.' },
      ctaLabel: 'Instalar nuestra operación →',
    },
  },
  {
    id: 'operacion',
    numero: '03',
    nombre: 'Operación Editorial',
    tarjeta: {
      titulo: 'Mantén el sistema produciendo.',
      paraQuien: 'Para empresas que necesitan una capacidad senior capaz de dirigir, producir y mejorar la agenda cada mes.',
      entregable: 'Operación editorial continua',
      duracion: 'Mensual',
      ctaLabel: 'Explorar operación →',
    },
    seccion: {
      eyebrow: '03 — Operación Editorial',
      titulo: 'Pon una capacidad senior a trabajar cada mes.',
      introduccion: 'Dirigimos la agenda, capturamos la experiencia del equipo y producimos los activos que necesita el negocio.',
      resultado: 'Una operación editorial activa, conectada con las prioridades comerciales y capaz de sostener el ritmo.',
      entregable: {
        titulo: 'Operación Editorial Activa',
        desc: 'Una capacidad continua para transformar conocimiento interno en presencia de mercado, autoridad y herramientas comerciales.',
      },
      incluye: [
        'Dirección editorial.',
        'Mesa de trabajo mensual.',
        'Captura con especialistas.',
        'Investigación y priorización.',
        'Redacción y edición.',
        'Producción creativa.',
        'Coordinación de publicación.',
        'Medición y ajuste.',
      ],
      plazo: { label: 'Modalidad', valor: 'Operación mensual.' },
      ctaLabel: 'Activar la operación →',
    },
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
