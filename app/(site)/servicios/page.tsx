import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, Cierre } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Servicios de estrategia, marca, contenido e IA | Flahoolick',
  description: 'Conectamos negocio, posicionamiento, contenido y ventas para empresas B2B con ciclos de decisión complejos.',
}

const SERVICIOS = [
  {
    titulo: 'Marca y relato: articular tu propuesta de valor para que toda la empresa hable igual.',
    texto: 'Cruzamos lo que ofreces con lo que tu comprador necesita resolver. Definimos la propuesta de valor, la idea central, la voz, las señales visuales y un mapa de mensajes que permiten explicar el negocio de forma clara y consistente.',
    href: '/servicios/marca-y-relato',
  },
  {
    titulo: 'Estrategia de contenido: darle dirección a lo que publicas.',
    texto: 'Conectamos objetivos de negocio, audiencias, preguntas, temas y canales. El resultado es un playbook que permite decidir qué producir, para quién y con qué función.',
    href: '/servicios/estrategia-de-contenido',
  },
  {
    titulo: 'Producción de contenido: mantener el conocimiento en circulación.',
    texto: 'Creamos contenido de autoridad, activos para la decisión y herramientas de venta a partir de la experiencia real de los equipos.',
    href: '/servicios/produccion-de-contenido',
  },
  {
    titulo: 'IA para marketing y ventas: convertir tareas repetidas en sistemas útiles.',
    texto: 'Diseñamos agentes y aplicaciones entrenados con el conocimiento y las reglas de tu empresa para investigar, producir, responder y ejecutar procesos concretos sin perder el criterio ni la voz de tu marca.',
    href: '/servicios/ia-para-marketing-y-ventas',
  },
]

export default function Servicios() {
  return (
    <Pagina>
      <Hero
        eyebrow="Servicios"
        titulo="Cuatro servicios, un mismo sistema."
        bajada="Estrategia, marca, contenido e IA para que tu empresa esté presente durante todo el ciclo de decisión de tu comprador."
        cta="Agenda una llamada de 30 minutos →"
      />
      <Bloque titulo="La comunicación funciona mejor cuando parte de la misma lógica que el negocio.">
        <p>Entendemos la oferta, las audiencias, el proceso comercial y las pruebas que hacen creíble a la empresa. Cada proyecto reúne las capacidades que necesita para hacer visible su valor durante la decisión.</p>
      </Bloque>
      <Bloque titulo="Cuatro disciplinas. Un solo sistema.">
        <Items items={SERVICIOS} />
      </Bloque>
      <Bloque titulo="Empezamos con un diagnóstico de cinco días.">
        <p>Auditamos qué sabe tu empresa, cómo habla hoy tu equipo, cómo te muestran los modelos de IA cuando tu comprador busca y dónde están los vacíos.</p>
        <p>Te quedas con el diagnóstico, decidas lo que decidas después.</p>
      </Bloque>
      <Cierre titulo="Ordena lo que tu empresa sabe y conviértelo en ventaja comercial." cta="Agenda una llamada de 30 minutos →" />
    </Pagina>
  )
}
