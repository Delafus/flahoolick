import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, Cierre, CuerpoCeleste } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Estudio creativo e inteligencia artificial para marketing y ventas B2B | Flahoolick',
  description: 'Convertimos la estrategia en contenidos, experiencias y herramientas que apoyan marketing y ventas.',
}

const CONSTRUIMOS = [
  { titulo: 'Contenidos de autoridad', texto: 'Desarrollan las ideas y el conocimiento que el mercado puede llegar a asociar con la empresa. Artículos, estudios, guías, informes, opinión experta y newsletters.' },
  { titulo: 'Presentaciones y herramientas comerciales', texto: 'Ayudan a presentar, demostrar, defender y avanzar una oportunidad. Presentaciones, one-pagers, propuestas, simuladores, demos y materiales para licitaciones.' },
  { titulo: 'Dossiers y casos de éxito', texto: 'Ayudan a investigar una solución, comparar alternativas, comprender una propuesta y resolver objeciones.' },
  { titulo: 'Agentes de inteligencia artificial', texto: 'Atienden, hacen preguntas, califican oportunidades, resuelven consultas, agendan reuniones y derivan conversaciones al equipo, con el conocimiento de tu empresa.' },
  { titulo: 'Investigación y automatización para marketing y ventas', texto: 'Herramientas que reúnen investigación y señales del mercado, transforman conocimiento existente en borradores y adaptaciones, y revisan piezas según el tono y los mensajes de la marca.' },
]

const PROCESO = [
  { titulo: 'Definimos el trabajo', texto: 'Qué problema debe resolver, quién lo utiliza y cómo sabremos si funciona.' },
  { titulo: 'Incorporamos el conocimiento', texto: 'Fuentes, reglas, mensajes, límites y situaciones que debe comprender.' },
  { titulo: 'Construimos una versión funcional', texto: 'Una primera solución acotada que permite probar el valor en condiciones reales.' },
  { titulo: 'Medimos y ampliamos', texto: 'Revisamos desempeño, corregimos errores y agregamos capacidades respaldadas por evidencia.' },
]

export default function EstudioCreativoEInteligenciaArtificial() {
  return (
    <Pagina>
      <Hero
        color="amarillo"
        eyebrow="03. Estudio creativo e inteligencia artificial"
        titulo="Lo que saben tus especialistas, como contenido de valor."
        cursiva="como contenido de valor."
        bajada="Convertimos la estrategia en contenidos, experiencias y herramientas que apoyan marketing y ventas."
      />
      <CuerpoCeleste>
      <Bloque titulo="El conocimiento inmóvil pierde valor.">
        <p>Tu empresa acumula experiencia en reuniones, documentos, proyectos, datos y conversaciones comerciales. Una parte valiosa todavía espera llegar a quienes investigan, recomiendan y deciden.</p>
        <p>Encontramos ese conocimiento, conservamos su singularidad y le damos la forma que necesita para cumplir un trabajo en el mercado.</p>
      </Bloque>
      <Bloque titulo="Qué construimos.">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="La IA genera valor cuando resuelve un trabajo concreto.">
        <p>Empezamos por una tarea, una decisión o una fricción real. Definimos qué debe saber la herramienta, qué acciones puede ejecutar, cuándo necesita intervención humana y qué resultado debe producir.</p>
        <p>La conectamos con documentos, conversaciones, reglas comerciales, mensajes de marca y sistemas existentes. Así trabaja con el contexto propio de la empresa y produce respuestas pertinentes.</p>
      </Bloque>
      <Bloque titulo="Cómo lo hacemos.">
        <Items items={PROCESO} />
      </Bloque>
      </CuerpoCeleste>
      <Cierre />
    </Pagina>
  )
}
