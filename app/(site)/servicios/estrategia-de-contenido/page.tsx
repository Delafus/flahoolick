import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre } from '@/components/minimal'
import { DotPattern } from '@/components/dot-pattern'

export const metadata: Metadata = {
  title: 'Estrategia de contenido B2B | Flahoolick',
  description: 'Diseñamos la lógica que conecta negocio, audiencias, temas, canales y momentos de decisión en empresas B2B.',
}

const CONSTRUIMOS = [
  { titulo: 'Territorios de autoridad', texto: 'Los temas donde la empresa reúne conocimiento, credenciales y una oportunidad real de desarrollar una voz propia.' },
  { titulo: 'Mapa de audiencias y decisiones', texto: 'Quién participa, qué necesita comprender y qué preguntas aparecen a lo largo de la oportunidad comercial.' },
  { titulo: 'Arquitectura editorial', texto: 'La relación entre temas, argumentos, pruebas y formatos para que cada contenido contribuya a una historia mayor.' },
  { titulo: 'Roadmap de 90 días', texto: 'Una secuencia priorizada de contenidos, canales, responsables e indicadores preparada para ejecutarse.' },
]

export default function EstrategiaDeContenido() {
  return (
    <Pagina>
      <Hero
        color="rosa"
        visual={<DotPattern pattern="mapa" color={'#000000'} accentColor={'#ffffff'} />}
        eyebrow="Estrategia de contenido"
        titulo="Un plan que dice qué publicar, para quién y cuándo."
        bajada="En cuatro a seis semanas recibes un playbook con territorios, audiencias, mensajes y roadmap."
        cta="Diseñemos la estrategia →"
      />
      <Bloque titulo="La frecuencia necesita dirección.">
        <p>La regularidad adquiere valor cuando ayuda al mercado a comprender mejor a tu empresa.</p>
        <p>Una estrategia asigna a cada contenido una audiencia, una pregunta y una función. Así, las piezas acumulan reconocimiento y ayudan a que la empresa ocupe una posición clara.</p>
      </Bloque>
      <Bloque titulo="Empezamos por el negocio y las preguntas del comprador.">
        <p>Estudiamos el modelo de negocio, el proceso comercial y las preguntas que el comprador necesita resolver. Luego contrastamos ese conocimiento con el mercado, la competencia, las búsquedas y las conversaciones que ya están ocurriendo.</p>
        <p>Elegimos las conversaciones que tu empresa merece liderar.</p>
      </Bloque>
      <Bloque titulo="Qué construimos">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="Partimos de lo que tu empresa ya sabe.">
        <p>Auditamos el contenido existente, revisamos el mercado y entrevistamos a las personas que concentran conocimiento técnico y comercial.</p>
        <p>Tomamos decisiones sobre audiencias, territorios, preguntas y canales. Después las convertimos en un playbook que marketing, ventas y los equipos técnicos pueden aplicar.</p>
      </Bloque>
      <Bloque titulo="Una estrategia lista para utilizar.">
        <p>Recibes un playbook aplicable que reúne la dirección editorial, las audiencias, los territorios, la arquitectura de contenidos, el roadmap inicial y los criterios para evaluar qué producir.</p>
        <p>Un proyecto típico toma entre cuatro y seis semanas, según el número de mercados, unidades de negocio y audiencias involucradas.</p>
      </Bloque>
      <CasoEnlace titulo="Dunamis ordenó su contenido desde las preguntas reales de sus clientes.">
        <p>De reuniones, catálogos y conversaciones con clientes salieron las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esas preguntas ordenaron todo el plan de contenido.</p>
      </CasoEnlace>
      <Cierre titulo="Tu empresa ya tiene conocimiento. Convirtámoslo en una posición editorial." cta="Construyamos la estrategia →" />
    </Pagina>
  )
}
