import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre, FUENTE, CuerpoCeleste } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Estrategia y relato de marca B2B | Flahoolick',
  description: 'Definimos qué lugar puede ocupar tu empresa en su mercado y qué necesita escuchar cada persona que participa en la compra.',
}

const CONSTRUIMOS = [
  { titulo: 'Posicionamiento y propuesta de valor', texto: 'El lugar que tu empresa puede ocupar en su categoría y la idea que ordena todo lo que dice.' },
  { titulo: 'Inteligencia de audiencias', texto: 'Quién participa en la compra, qué necesita entender cada persona y qué pregunta en cada etapa de la venta.' },
  { titulo: 'Arquitectura de mensajes', texto: 'Qué se le dice a cada persona y con qué prueba, para que dirección, marketing y ventas digan lo mismo.' },
  { titulo: 'Estrategia editorial', texto: 'Los temas en que tu empresa sabe más que el resto y puede hablar con autoridad.' },
  { titulo: 'Narrativa de marca y liderazgo de opinión', texto: 'El tono, los elementos visuales y los puntos de vista que hacen reconocible a la empresa y a sus especialistas.' },
]

const CAMBIA = [
  { titulo: 'La empresa se vuelve más fácil de explicar', texto: 'Dirección, marketing y ventas la explican de la misma manera.' },
  { titulo: 'La marca deja de sonar como la competencia', texto: 'Dice algo que solo tu empresa puede sostener con pruebas.' },
  { titulo: 'Todo sale de la misma base', texto: 'El sitio, las propuestas y las presentaciones parten del mismo documento. Nadie tiene que reinventar el discurso.' },
]

export default function EstrategiaYRelatoDeMarca() {
  return (
    <Pagina>
      <Hero
        color="amarillo"
        eyebrow="01. Estrategia y relato de marca"
        titulo="Una historia que tu mercado puede entender y repetir."
        cursiva="puede entender y repetir."
        bajada="Definimos qué lugar puede ocupar tu empresa en su mercado y qué necesita escuchar cada persona que participa en la compra."
      />
      <CuerpoCeleste>
      <Bloque titulo="Ocupar un lugar exige elegirlo.">
        <p>Las empresas complejas suelen describirse con las mismas palabras: innovación, experiencia y compromiso.</p>
        <p>Posicionarse es elegir algo que puedes defender con pruebas y dejar de decir todo lo demás.</p>
      </Bloque>
      <Bloque titulo="Empezamos por el negocio y las preguntas del comprador.">
        <p>Entrevistamos a dirección, ventas y especialistas para entender por qué te eligen tus clientes. Después lo comparamos con lo que dice tu competencia y con lo que tu comprador busca y pregunta.</p>
        <p>Ahí aparece lo que tu empresa puede decir y la competencia no.</p>
      </Bloque>
      <Bloque titulo="Qué construimos.">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="Qué cambia.">
        <Items items={CAMBIA} />
      </Bloque>
      <Bloque titulo="Qué recibes.">
        <p className="text-[1.375rem] md:text-[1.625rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.3 }}>
          Una plataforma de marca con la posición, los mensajes, el tono y la identidad visual, lista para usar en el sitio, las propuestas, las licitaciones y las presentaciones.
        </p>
      </Bloque>
      <CasoEnlace titulo="Una identidad para dos públicos.">
        <p>Dunamis tenía una sola marca para dos negocios con clientes distintos. Mantuvimos el nombre y su origen inmobiliario, y les dimos a Agency y a Broker una identidad propia.</p>
      </CasoEnlace>
      </CuerpoCeleste>
      <Cierre />
    </Pagina>
  )
}
