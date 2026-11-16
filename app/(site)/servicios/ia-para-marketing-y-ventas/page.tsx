import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre } from '@/components/minimal'
import { DotPattern } from '@/components/dot-pattern'

export const metadata: Metadata = {
  title: 'Herramientas y agentes de IA para marketing y ventas | Flahoolick',
  description: 'Diseñamos herramientas de IA conectadas con el conocimiento y los procesos reales de empresas B2B.',
}

const APLICACIONES = [
  { titulo: 'Agentes de voz', texto: 'Atienden, llaman, hacen preguntas, califican oportunidades, resuelven consultas, agendan reuniones y derivan conversaciones al equipo.' },
  { titulo: 'Inteligencia de audiencias', texto: 'Reúne investigación, datos y señales del mercado para explorar preguntas, identificar patrones y detectar oportunidades.' },
  { titulo: 'Asistentes de conocimiento', texto: 'Permiten consultar y utilizar documentos, presentaciones, reuniones y experiencia interna desde un entorno privado.' },
  { titulo: 'Sistemas de contenido', texto: 'Transforman conocimiento existente en briefs, borradores, adaptaciones y materiales para distintas audiencias y canales.' },
  { titulo: 'Revisión de marca y contenido', texto: 'Evalúa piezas según el tono, los mensajes, las pruebas y los criterios editoriales definidos por la organización.' },
]

const PROCESO = [
  { titulo: '1. Definimos el trabajo', texto: 'Qué problema debe resolver, quién lo utiliza y cómo sabremos si funciona.' },
  { titulo: '2. Incorporamos el conocimiento', texto: 'Fuentes, reglas, mensajes, límites y situaciones que debe comprender.' },
  { titulo: '3. Construimos una versión funcional', texto: 'Una primera solución acotada que permite probar el valor en condiciones reales.' },
  { titulo: '4. Medimos y ampliamos', texto: 'Revisamos desempeño, corregimos errores y agregamos capacidades respaldadas por evidencia.' },
]

export default function HerramientasDeIAParaMarketing() {
  return (
    <Pagina>
      <Hero
        color="rosa"
        visual={<DotPattern pattern="ondas" color={'#000000'} accentColor={'#ffffff'} />}
        eyebrow="IA para marketing y ventas"
        titulo="IA que conoce el trabajo."
        bajada="Herramientas y agentes que atienden, califican, agendan y responden con el conocimiento de tu empresa."
        cta="Cuéntanos qué quieres resolver →"
      />
      <Bloque titulo="La IA genera valor cuando resuelve un trabajo concreto.">
        <p>Empezamos por una tarea, una decisión o una fricción real. Definimos qué debe saber la herramienta, qué acciones puede ejecutar, cuándo necesita intervención humana y qué resultado debe producir.</p>
      </Bloque>
      <Bloque titulo="La herramienta forma parte del negocio.">
        <p>La conectamos con documentos, conversaciones, reglas comerciales, mensajes de marca y sistemas existentes. Así trabaja con el contexto propio de la empresa y produce respuestas pertinentes.</p>
      </Bloque>
      <Bloque titulo="Aplicaciones">
        <Items items={APLICACIONES} />
      </Bloque>
      <CasoEnlace titulo="De lo que sabía un equipo a un asistente que agenda visitas.">
        <p>Dee es el asistente virtual de dunamis.agency. Está conectado a la base de propiedades y servicios, responde consultas, presenta las propiedades publicadas que calzan con cada persona, agenda la visita y deriva el contacto a un agente.</p>
      </CasoEnlace>
      <Bloque titulo="Cómo lo hacemos">
        <Items items={PROCESO} />
      </Bloque>
      <Cierre titulo="La mejor oportunidad para aplicar IA comienza con un trabajo concreto." cta="Cuéntanos cuál →" />
    </Pagina>
  )
}
