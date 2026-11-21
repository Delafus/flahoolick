import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Cierre, CuerpoCeleste } from '@/components/minimal'
import { Capacidades } from '@/components/capacidades'

export const metadata: Metadata = {
  title: 'Servicios de estrategia, contenido e IA para empresas B2B | Flahoolick',
  description: 'Definimos qué decir, organizamos cómo publicarlo y producimos las piezas y herramientas. Cada capacidad se puede contratar por separado.',
}

export default function Servicios() {
  return (
    <Pagina>
      <Hero
        color="amarillo"
        eyebrow="Servicios"
        titulo="Tres capacidades. Un sistema de contenido."
        cursiva="Un sistema de contenido."
        bajada="Definimos qué decir, organizamos cómo publicarlo y producimos las piezas y herramientas. Cada capacidad se puede contratar por separado."
      />
      <CuerpoCeleste>
      <Bloque titulo="Cada proyecto parte del negocio.">
        <p>Revisamos qué vendes, a quién, cómo avanza una venta y qué pruebas te hacen creíble. Con eso decidimos qué capacidades necesita el proyecto.</p>
      </Bloque>
      <Bloque titulo="Qué hacemos.">
        <Capacidades />
      </Bloque>
      <Bloque titulo="Empezamos con un diagnóstico de cinco días.">
        <p>Revisamos qué sabe tu empresa y cómo la explica hoy tu equipo. También vemos qué responden ChatGPT y otros asistentes cuando alguien pregunta por tu categoría, y dónde están los vacíos.</p>
        <p>Te quedas con el diagnóstico, decidas lo que decidas después.</p>
      </Bloque>
      </CuerpoCeleste>
      <Cierre />
    </Pagina>
  )
}
