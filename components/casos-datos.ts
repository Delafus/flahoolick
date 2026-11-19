/** Las historias de clientes publicadas, en orden. Alimentan el carrusel de la home y el módulo "Más historias"
    al final de cada caso, para que nunca queden desincronizados. Un caso nuevo se agrega aquí. */
export interface CasoResumen {
  slug: string
  nombre: string
  /** Titular corto del caso (el del carrusel de la home). */
  titulo: string
  /** Bajada del carrusel de la home. */
  texto: string
  /** Logo del cliente (se muestra en blanco). */
  logo: string
  /** Foto para la tarjeta de "Más historias". Sin foto, la tarjeta muestra el logo sobre gris. */
  imagen?: string
}

export const CASOS: CasoResumen[] = [
  {
    slug: 'dunamis',
    nombre: 'Dunamis',
    titulo: 'El cliente llega a la reunión con la tarea adelantada.',
    texto: 'Dunamis puso su conocimiento inmobiliario al alcance de sus clientes. Hoy pueden evaluar opciones, calcular valores y resolver dudas antes de conversar con un especialista.',
    logo: '/logo-dunamis.svg',
    imagen: '/casos/dunamis/portada-historia.jpg',
  },
  {
    slug: 'rameau',
    nombre: 'Rameau',
    titulo: 'Una plataforma lista que todavía no sabía a quién hablarle.',
    texto: 'Con Rameau trabajamos el Value Proposition Canvas y pusimos a prueba sus hipótesis con leads reales. Hoy saben qué relato necesita la plataforma y a quién de la organización le habla.',
    logo: '/logo-rameau.svg',
  },
]
