import { Metadata } from 'next'
import { Pagina, Hero, Cierre } from '@/components/minimal'
import { DotPattern } from '@/components/dot-pattern'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes | Flahoolick',
  description: 'Cómo trabaja Flahoolick y cómo conecta estrategia, contenido, IA y ventas en empresas B2B.',
}

const PREGUNTAS = [
  { q: '¿Qué hace exactamente Flahoolick?', a: 'Ayudamos a empresas B2B a explicar mejor negocios complejos y a mantener ese conocimiento activo durante todo el ciclo comercial. Entendemos cómo funciona la empresa, definimos una posición y convertimos el conocimiento de sus equipos en estrategias, relatos, contenidos, herramientas para ventas y soluciones con IA.' },
  { q: '¿Qué tipo de empresa es Flahoolick?', a: 'Somos un estudio de estrategia y contenido. Reunimos pensamiento estratégico y capacidad de producción en un solo equipo. Conectamos la definición con su ejecución continua.' },
  { q: '¿Por qué necesitan entender nuestro negocio?', a: 'Porque una comunicación clara nace de hacer explícito el valor de la empresa. Revisamos la oferta, las audiencias, el proceso comercial, las razones por las que los clientes eligen y las pruebas que vuelven creíble a la organización.' },
  { q: '¿Quiénes participan en un proyecto?', a: 'Nuestros proyectos suelen involucrar a dirección, marketing, ventas y especialistas técnicos. Diseñamos una participación acotada y eficiente para conectar sus conocimientos.' },
  { q: '¿Con qué empresas trabajan?', a: 'Principalmente con empresas B2B que tienen ciclos de venta largos, varios participantes en la decisión y ofertas que requieren explicación o confianza técnica.' },
  { q: '¿En qué etapa podemos contratarlos?', a: 'Podemos comenzar desde una hoja en blanco, revisar una estrategia existente o trabajar sobre un sistema que ya está en marcha. El diagnóstico inicial permite identificar qué conviene conservar, definir, fortalecer o retirar.' },
  { q: '¿Podemos contratar un solo servicio?', a: 'Sí. Cada empresa contrata las capacidades que su desafío requiere. Cuando el problema atraviesa varias áreas, proponemos un sistema integrado.' },
  { q: '¿Cómo comienza un proyecto?', a: 'Comenzamos con una conversación de 30 minutos. Cuando existe encaje, proponemos un diagnóstico acotado para revisar el negocio, la comunicación actual, el proceso comercial y las principales brechas.' },
  { q: '¿Cuánto dura un proyecto?', a: 'Un diagnóstico inicial toma cinco días. Un proyecto de estrategia suele durar entre cuatro y seis semanas. La producción de contenido y la mejora de herramientas funcionan en ciclos continuos.' },
  { q: '¿Qué necesitan de nuestro equipo?', a: 'Acceso a dirección, ventas, especialistas y materiales relevantes. Capturamos el conocimiento mediante instancias breves, mientras tus expertos permanecen concentrados en su trabajo.' },
  { q: '¿Qué entregan?', a: 'Según el desafío, entregamos diagnósticos, playbooks estratégicos, plataformas de marca, roadmaps editoriales, contenido terminado, herramientas comerciales y soluciones funcionales con IA. Cada entrega desarrolla una capacidad acordada con el cliente.' },
  { q: '¿También producen el contenido?', a: 'Sí. Podemos entregar la estrategia para que la ejecute tu equipo o asumir la producción de manera continua. Elegimos cada formato según la función que debe cumplir.' },
  { q: '¿Cómo utilizan inteligencia artificial?', a: 'La utilizamos para investigar, analizar audiencias, ordenar conocimiento, acelerar procesos y construir herramientas que ejecutan tareas concretas. El criterio humano senior guía la estrategia, las decisiones editoriales y la redacción final.' },
  { q: '¿Construyen herramientas de IA a medida?', a: 'Sí. Desarrollamos agentes de voz, asistentes de conocimiento, sistemas de investigación, flujos de contenido y herramientas de revisión. Cada proyecto comienza con un trabajo concreto y una primera versión funcional.' },
  { q: '¿Cómo se mide el trabajo?', a: 'Definimos indicadores según la función del proyecto. Medimos la contribución del sistema a que la empresa sea encontrada, comprendida y considerada a lo largo de una venta compleja.' },
  { q: '¿Trabajan fuera de Chile?', a: 'Sí. Estamos en Santiago y trabajamos de forma remota con organizaciones de otros países. Las sesiones presenciales se acuerdan según ubicación y alcance.' },
  { q: '¿Cuánto cuesta trabajar con Flahoolick?', a: 'El valor depende del alcance, la cantidad de audiencias o unidades de negocio, la profundidad de la investigación y el nivel de producción requerido. Después de una primera conversación recomendamos el alcance más eficiente y entregamos una propuesta clara.' },
]

export default function FAQ() {
  return (
    <Pagina>
      <Hero
        color="menta"
        visual={<DotPattern pattern="origen" color={'#000000'} accentColor={'#ffffff'} />}
        eyebrow="Preguntas frecuentes"
        titulo="Lo que probablemente quieras saber antes de conversar."
        bajada="También puedes escribirnos directamente. Una conversación basta para empezar."
        cta="Escríbenos →"
      />
      <section className="flex flex-col py-16 md:py-24">
        {PREGUNTAS.map(p => (
          <details key={p.q} className="py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
            <summary className="cursor-pointer" style={{ fontWeight: 500 }}>{p.q}</summary>
            <p className="mt-3">{p.a}</p>
          </details>
        ))}
      </section>
      <Cierre titulo="¿Qué quieres poner sobre la mesa?" cta="Escríbenos →" />
    </Pagina>
  )
}
