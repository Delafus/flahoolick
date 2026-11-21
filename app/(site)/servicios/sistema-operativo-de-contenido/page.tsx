import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre, CuerpoCeleste } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Sistema operativo de contenido B2B | Flahoolick',
  description: 'Organizamos qué publicar, para quién y cuándo, y cómo producirlo cada mes sin partir de cero.',
}

const CONSTRUIMOS = [
  { titulo: 'Playbook de contenido', texto: 'La dirección editorial, las audiencias, los temas y los criterios para decidir qué producir y para qué.' },
  { titulo: 'Planificación editorial', texto: 'Qué se publica, en qué canal, quién lo hace y cómo se mide, ordenado por prioridad.' },
  { titulo: 'Flujos de trabajo', texto: 'Un ciclo fijo para planificar, entrevistar, producir, publicar y revisar. Cada vuelta deja material que la siguiente reutiliza.' },
  { titulo: 'Producción de contenido especializado', texto: 'Entrevistas cortas con tus especialistas y un equipo que convierte lo que dicen en piezas claras, sin quitarles horas de trabajo.' },
  { titulo: 'Distribución y medición', texto: 'Adaptamos cada idea a los canales donde está tu comprador y medimos qué genera atención y qué ayuda a vender.' },
]

export default function SistemaOperativoDeContenido() {
  return (
    <Pagina>
      <Hero
        color="amarillo"
        eyebrow="02. Sistema operativo de contenido"
        titulo="Un plan que dice qué publicar, para quién y cuándo."
        cursiva="qué publicar, para quién y cuándo."
        bajada="Ordenamos la producción para que publicar cada mes no dependa de partir de cero ni de una sola persona."
      />
      <CuerpoCeleste>
      <Bloque titulo="Publicar seguido no sirve si cada pieza va por su lado.">
        <p>Muchas empresas publican con regularidad y el mercado igual no sabe bien qué hacen.</p>
        <p>Por eso a cada pieza le asignamos una audiencia, una pregunta que responde y un trabajo que cumplir. Así las piezas se suman y la empresa queda asociada a temas claros.</p>
      </Bloque>
      <Bloque titulo="Qué construimos.">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="Partimos de lo que tu empresa ya sabe.">
        <p>Auditamos el contenido existente, revisamos el mercado y entrevistamos a las personas que concentran conocimiento técnico y comercial.</p>
        <p>Con eso decidimos a quién hablarle, sobre qué temas y en qué canales, y lo dejamos en un playbook que tu equipo puede seguir por su cuenta.</p>
      </Bloque>
      <Bloque titulo="Una idea puede cumplir más de un trabajo.">
        <p>Una conversación con un experto puede convertirse en una guía, una presentación, una serie para LinkedIn, respuestas comerciales o una experiencia digital. Por eso decidimos el recorrido completo antes de producir la primera pieza.</p>
      </Bloque>
      <CasoEnlace titulo="Dunamis ordenó su contenido desde las preguntas reales de sus clientes.">
        <p>De reuniones, catálogos y conversaciones con clientes salieron las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esas preguntas ordenaron todo el plan de contenido.</p>
      </CasoEnlace>
      </CuerpoCeleste>
      <Cierre />
    </Pagina>
  )
}
