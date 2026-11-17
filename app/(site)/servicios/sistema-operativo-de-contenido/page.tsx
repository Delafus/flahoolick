import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Sistema operativo de contenido B2B | Flahoolick',
  description: 'Diseñamos la estructura que permite producir y distribuir contenido relevante de manera continua.',
}

const CONSTRUIMOS = [
  { titulo: 'Playbook de contenido', texto: 'La dirección editorial, las audiencias, los territorios y los criterios para decidir qué producir, para quién y con qué función.' },
  { titulo: 'Planificación editorial', texto: 'Una secuencia priorizada de contenidos, canales, responsables e indicadores, preparada para ejecutarse.' },
  { titulo: 'Flujos de trabajo', texto: 'Ciclos de planificación, captura, producción, distribución y revisión. Con cada ciclo aumenta el conocimiento acumulado y disminuye la necesidad de comenzar desde cero.' },
  { titulo: 'Producción de contenido especializado', texto: 'Una forma eficiente de trabajar con especialistas y convertir su experiencia en materiales claros y utilizables.' },
  { titulo: 'Distribución y medición', texto: 'Cada idea se adapta a los canales donde debe circular, y medimos qué consigue atención y qué aporta al proceso comercial.' },
]

export default function SistemaOperativoDeContenido() {
  return (
    <Pagina>
      <Hero
        color="rosa"
        eyebrow="02. Sistema operativo de contenido"
        titulo="Un plan que dice qué publicar, para quién y cuándo."
        bajada="Diseñamos la estructura que permite producir y distribuir contenido relevante de manera continua."
      />
      <Bloque titulo="La frecuencia necesita dirección.">
        <p>La regularidad adquiere valor cuando ayuda al mercado a comprender mejor a tu empresa.</p>
        <p>Un sistema asigna a cada contenido una audiencia, una pregunta y una función. Así, las piezas acumulan reconocimiento y ayudan a que la empresa ocupe una posición clara.</p>
      </Bloque>
      <Bloque titulo="Qué construimos.">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="Partimos de lo que tu empresa ya sabe.">
        <p>Auditamos el contenido existente, revisamos el mercado y entrevistamos a las personas que concentran conocimiento técnico y comercial.</p>
        <p>Tomamos decisiones sobre audiencias, territorios, preguntas y canales. Después las convertimos en un playbook que marketing, ventas y los equipos técnicos pueden aplicar.</p>
      </Bloque>
      <Bloque titulo="Una idea puede cumplir más de un trabajo.">
        <p>Una conversación con un experto puede convertirse en una guía, una presentación, una serie para LinkedIn, respuestas comerciales o una experiencia digital. Diseñamos el recorrido antes de producir las piezas.</p>
        <p>Elegimos cada formato según el trabajo que debe cumplir.</p>
      </Bloque>
      <CasoEnlace titulo="Dunamis ordenó su contenido desde las preguntas reales de sus clientes.">
        <p>De reuniones, catálogos y conversaciones con clientes salieron las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esas preguntas ordenaron todo el plan de contenido.</p>
      </CasoEnlace>
      <Cierre />
    </Pagina>
  )
}
