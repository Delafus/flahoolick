import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, Cierre, CuerpoCeleste } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Estudio creativo e inteligencia artificial para marketing y ventas B2B | Flahoolick',
  description: 'Producimos el contenido, las piezas comerciales y las herramientas de IA que salen de tu estrategia, con lo que saben tus especialistas.',
}

const CONSTRUIMOS = [
  { titulo: 'Contenidos de autoridad', texto: 'Artículos, estudios, guías, informes y newsletters con las ideas que quieres que el mercado asocie a tu empresa.' },
  { titulo: 'Presentaciones y herramientas comerciales', texto: 'Presentaciones, one-pagers, propuestas, simuladores y material para licitaciones. Sirven para presentar, demostrar y defender una oportunidad.' },
  { titulo: 'Dossiers y casos de éxito', texto: 'Para que un comprador entienda la propuesta, la compare con otras y resuelva sus dudas sin esperar una reunión.' },
  { titulo: 'Agentes de inteligencia artificial', texto: 'Responden consultas, califican oportunidades, agendan reuniones y le pasan la conversación a tu equipo cuando corresponde. Trabajan con el conocimiento de tu empresa.' },
  { titulo: 'Investigación y automatización para marketing y ventas', texto: 'Herramientas que reúnen señales del mercado, convierten material existente en borradores y revisan piezas según el tono y los mensajes de la marca.' },
]

export default function EstudioCreativoEInteligenciaArtificial() {
  return (
    <Pagina>
      <Hero
        color="amarillo"
        eyebrow="03. Estudio creativo e inteligencia artificial"
        titulo="Lo que saben tus especialistas, puesto a trabajar."
        cursiva="puesto a trabajar."
        bajada="Producimos el contenido, las piezas comerciales y las herramientas de IA que salen de tu estrategia."
      />
      <CuerpoCeleste>
      <Bloque titulo="Lo que tu empresa sabe casi nunca sale de la empresa.">
        <p>Está en reuniones, propuestas antiguas, proyectos terminados y conversaciones con clientes. Quienes investigan y deciden la compra rara vez lo ven.</p>
        <p>Lo buscamos con tus especialistas, cuidamos que siga sonando a ellos y le damos la forma que cada trabajo necesita: un artículo, una propuesta o un asistente.</p>
      </Bloque>
      <Bloque titulo="Qué construimos.">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="La IA trabaja con lo que tu empresa tiene escrito.">
        <p>Los modelos de IA son los mismos para todas las empresas. El resultado cambia según lo que cada una sabe y dónde lo guarda.</p>
        <p>Si ese conocimiento vive en la cabeza de dos o tres personas, en reuniones sin registro o en carpetas que nadie abre, ningún agente puede usarlo. Por eso, antes de construir, lo capturamos con tus especialistas y lo dejamos escrito y ordenado.</p>
        <p>Ese material queda en tu empresa. Sirve para el contenido de hoy y para cualquier herramienta que construyas después.</p>
      </Bloque>
      <Bloque titulo="Cada herramienta parte de un trabajo concreto.">
        <p>Empezamos por una tarea o una fricción real de tu equipo. Definimos qué debe saber la herramienta, qué puede hacer sola y cuándo tiene que pasarle la conversación a una persona.</p>
        <p>Partimos con una versión acotada, la probamos en condiciones reales y la ampliamos según lo que funcione.</p>
      </Bloque>
      </CuerpoCeleste>
      <Cierre />
    </Pagina>
  )
}
