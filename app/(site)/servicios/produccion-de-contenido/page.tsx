import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Producción de contenido B2B y herramientas para ventas | Flahoolick',
  description: 'Convertimos conocimiento técnico en contenido de autoridad, activos de decisión y herramientas comerciales.',
}

const RESOLVEMOS = [
  { titulo: 'El conocimiento se queda dentro de la empresa', texto: 'Creamos una forma eficiente de trabajar con especialistas y convertir su experiencia en materiales claros y utilizables.' },
  { titulo: 'El contenido pasa de largo', texto: 'Encontramos preguntas, evidencias, historias y puntos de vista propios de la empresa.' },
  { titulo: 'Ventas necesita mejores herramientas', texto: 'Transformamos argumentos, pruebas y objeciones en activos que permiten explicar y defender mejor la oferta.' },
  { titulo: 'Los canales necesitan continuidad', texto: 'Diseñamos ideas capaces de adaptarse y circular conservando consistencia y profundidad.' },
]

const ACTIVOS = [
  { titulo: 'Contenido de autoridad', texto: 'Desarrolla las ideas y el conocimiento que el mercado puede llegar a asociar con la empresa. Artículos, estudios, guías, informes, opinión experta y newsletters.' },
  { titulo: 'Activos de decisión', texto: 'Ayudan a investigar una solución, comparar alternativas, comprender una propuesta y resolver objeciones. Casos, páginas de solución, comparativos, preguntas frecuentes, webinars y experiencias interactivas.' },
  { titulo: 'Herramientas comerciales', texto: 'Ayudan a presentar, demostrar, defender y avanzar una oportunidad. Presentaciones, one-pagers, propuestas, battlecards, demos y materiales para licitaciones.' },
]

export default function ProduccionDeContenido() {
  return (
    <Pagina>
      <Hero
        color="rosa"
        eyebrow="Producción de contenido"
        titulo="Lo que saben tus especialistas, como contenido de valor."
        bajada="Artículos, guías, casos y herramientas de venta, producidos por un equipo senior."
      />
      <Bloque titulo="El conocimiento inmóvil pierde valor.">
        <p>Tu empresa acumula experiencia en reuniones, documentos, proyectos, datos y conversaciones comerciales. Una parte valiosa todavía espera llegar a quienes investigan, recomiendan y deciden.</p>
        <p>Encontramos ese conocimiento, conservamos su singularidad y le damos la forma que necesita para cumplir un trabajo en el mercado.</p>
      </Bloque>
      <Bloque titulo="Qué resolvemos">
        <Items items={RESOLVEMOS} />
      </Bloque>
      <Bloque titulo="Tres tipos de activos">
        <Items items={ACTIVOS} />
      </Bloque>
      <Bloque titulo="Una idea puede cumplir más de un trabajo.">
        <p>Una conversación con un experto puede convertirse en una guía, una presentación, una serie para LinkedIn, respuestas comerciales o una experiencia digital. Diseñamos el recorrido antes de producir las piezas.</p>
        <p>Elegimos cada formato según el trabajo que debe cumplir.</p>
      </Bloque>
      <Bloque titulo="Un equipo editorial que aprende sobre tu negocio.">
        <p>Trabajamos en ciclos de planificación, captura, producción, distribución y revisión. Con cada ciclo aumenta el conocimiento acumulado, mejora la operación y disminuye la necesidad de comenzar desde cero.</p>
      </Bloque>
      <CasoEnlace titulo="El equipo comercial pidió un PDF en Canva. Recibió un dossier que se comparte con un enlace.">
        <p>Un PDF queda viejo cada vez que cambian el stock o los honorarios. El dossier web funciona en celular y tablet, y se actualiza una sola vez para todo el equipo.</p>
        <p>Para el mercado, Dunamistas reúne artículos, contenido breve para Instagram y un glosario inmobiliario que suma un concepto nuevo cada semana.</p>
      </CasoEnlace>
      <Cierre titulo="Hagamos trabajar mejor lo que tu empresa sabe." cta="Agenda una llamada" />
    </Pagina>
  )
}
