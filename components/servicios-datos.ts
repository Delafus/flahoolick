/** Contenido de las tres etapas de servicio.
    Vive fuera del componente para que la pagina (servidor) pueda leerlo:
    importarlo desde un modulo "use client" lo convierte en referencia de cliente. */

export interface Etapa {
  id: string
  numero: string
  nombre: string
  /** Situación del lector que corresponde a esta etapa. Sirve para ubicarse. */
  cuando: string
  titular: string
  desc: string
  entregables: string[]
  acordeon: { titulo: string; contenido: string }
  destacado: { titulo: string; desc: string }
  /** Señal de alcance: cuánto compromete contratar esta etapa. */
  plazo: { label: string; valor: string }
  ctaLabel: string
  /** Solo Operación Editorial: formatos que produce, como tags. */
  formatos?: string[]
}

export const ETAPAS: Etapa[] = [
  {
    id: 'diagnostico',
    numero: '01',
    nombre: 'Diagnóstico de Autoridad',
    cuando: 'Si todavía no sabes qué conocimiento tienes ni por dónde partir.',
    titular: 'Encontramos el conocimiento que merece llegar al mercado.',
    desc: 'Analizamos el conocimiento disponible, las audiencias y las señales del mercado para identificar dónde puede construir autoridad la empresa.',
    entregables: [
      'Mapa de conocimiento.',
      'Mapa de audiencias y preguntas críticas.',
      'Territorios de autoridad.',
      'Hoja de ruta editorial priorizada.',
    ],
    acordeon: {
      titulo: 'Cómo realizamos el diagnóstico',
      contenido: 'Revisamos documentos, contenidos, propuestas y conversaciones comerciales. Entrevistamos a expertos internos. Analizamos preguntas, objeciones y señales del mercado. Jerarquizamos los hallazgos según su valor estratégico.',
    },
    destacado: {
      titulo: 'Mapa de autoridad de mercado',
      desc: 'Define qué conocimiento debe poner en circulación la empresa, para quién, con qué propósito y en qué orden.',
    },
    plazo: { label: 'Duración referencial', valor: '2 a 4 semanas.' },
    ctaLabel: 'Hablemos del diagnóstico →',
  },
  {
    id: 'instalacion',
    numero: '02',
    nombre: 'Instalación del Sistema',
    cuando: 'Si ya sabes qué decir, pero no tienes cómo producirlo de forma sostenida.',
    titular: 'Convertimos la estrategia en una forma concreta de operar.',
    desc: 'Diseñamos el relato, los flujos y las reglas que permiten transformar conocimiento en una operación editorial continua.',
    entregables: [
      'Narrativa y arquitectura de mensajes.',
      'Territorios y series editoriales.',
      'Playbook de contenido.',
      'Flujos, gobernanza y marco de medición.',
    ],
    acordeon: {
      titulo: 'Qué instalamos',
      contenido: 'Definimos las audiencias, los principios editoriales, el sistema de captura, los formatos y los canales. Organizamos los roles, las aprobaciones, la cadencia y los indicadores que sostienen la operación.',
    },
    destacado: {
      titulo: 'Sistema operativo de contenido',
      desc: 'Un playbook aplicado para capturar, producir, distribuir y medir contenido con una lógica compartida.',
    },
    plazo: { label: 'Duración referencial', valor: '6 a 10 semanas.' },
    ctaLabel: 'Hablemos de la instalación →',
  },
  {
    id: 'operacion',
    numero: '03',
    nombre: 'Operación Editorial',
    cuando: 'Si el sistema ya existe y necesitas mantenerlo produciendo.',
    titular: 'Mantenemos el conocimiento en circulación.',
    desc: 'Operamos el sistema junto al equipo del cliente y transformamos conocimiento, señales y prioridades comerciales en activos útiles para el mercado.',
    entregables: [
      'Dirección editorial continua.',
      'Plan de trabajo y mesa editorial.',
      'Producción mensual de contenidos.',
      'Medición y recalibración del sistema.',
    ],
    acordeon: {
      titulo: 'Cómo operamos',
      contenido: 'Capturamos conocimiento con los expertos internos. Priorizamos temas y oportunidades. Investigamos, redactamos, editamos y producimos los activos. Revisamos su desempeño y actualizamos la agenda editorial.',
    },
    destacado: {
      titulo: 'Operación editorial activa',
      desc: 'Una capacidad continua para transformar conocimiento interno en presencia de mercado, autoridad y herramientas comerciales.',
    },
    plazo: { label: 'Modalidad', valor: 'Operación mensual. El alcance se define según las audiencias, territorios, formatos y activos que necesita la empresa.' },
    ctaLabel: 'Hablemos de la operación →',
    formatos: [
      'Artículos', 'Guías', 'Reportes', 'Casos', 'LinkedIn', 'Newsletters',
      'Decks', 'One-pagers', 'Battlecards', 'Playbooks', 'Campañas B2B', 'Contenido para IA',
    ],
  },
]
