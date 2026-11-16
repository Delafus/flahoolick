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
    desc: 'Decidimos qué necesita saber el mercado, qué puede liderar tu empresa y qué función debe cumplir cada contenido durante la decisión.',
    href: '/servicios/estrategia-de-contenido',
  },
  {
    id: 'marca-y-relato',
    nombre: 'Marca y relato',
    desc: 'Definimos una posición, una idea central y un lenguaje común para que dirección, marketing y ventas expliquen el mismo negocio.',
    href: '/servicios/marca-y-relato',
  },
  {
    id: 'produccion-de-contenido',
    nombre: 'Producción de contenido',
    desc: 'Convertimos conocimiento técnico en contenido de autoridad, activos de decisión y herramientas comerciales que circulan de forma continua.',
    href: '/servicios/produccion-de-contenido',
  },
  {
    id: 'ia-para-marketing-y-ventas',
    nombre: 'IA para marketing y ventas',
    desc: 'Construimos agentes y herramientas que utilizan el conocimiento de la empresa para investigar, responder, producir y ejecutar tareas concretas.',
    href: '/servicios/ia-para-marketing-y-ventas',
  },
]
