import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Cierre, CuerpoCeleste } from '@/components/minimal'
import { Capacidades } from '@/components/capacidades'

export const metadata: Metadata = {
  title: 'Servicios de estrategia, contenido e IA para empresas B2B | Flahoolick',
  description: 'Combinamos estrategia, creatividad y tecnología para convertir el conocimiento de tu empresa en presencia de mercado.',
}

export default function Servicios() {
  return (
    <Pagina>
      <Hero
        color="rosa"
        eyebrow="Servicios"
        titulo="Tres capacidades. Un sistema de contenido."
        cursiva="Un sistema de contenido."
        bajada="Combinamos estrategia, creatividad y tecnología para convertir el conocimiento de tu empresa en presencia de mercado."
      />
      <CuerpoCeleste>
      <Bloque titulo="La comunicación funciona mejor cuando parte de la misma lógica que el negocio.">
        <p>Entendemos la oferta, las audiencias, el proceso comercial y las pruebas que hacen creíble a la empresa. Cada proyecto reúne las capacidades que necesita para hacer visible su valor durante la decisión.</p>
      </Bloque>
      <Bloque titulo="Qué hacemos.">
        <Capacidades />
      </Bloque>
      <Bloque titulo="Empezamos con un diagnóstico de cinco días.">
        <p>Auditamos qué sabe tu empresa, cómo habla hoy tu equipo, cómo te muestran los modelos de IA cuando tu comprador busca y dónde están los vacíos.</p>
        <p>Te quedas con el diagnóstico, decidas lo que decidas después.</p>
      </Bloque>
      </CuerpoCeleste>
      <Cierre />
    </Pagina>
  )
}
