import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre, FUENTE, CuerpoCeleste } from '@/components/minimal'

export const metadata: Metadata = {
  title: 'Estrategia y relato de marca B2B | Flahoolick',
  description: 'Definimos qué hace valiosa a tu empresa, cómo debe posicionarse y qué necesita escuchar cada audiencia.',
}

const CONSTRUIMOS = [
  { titulo: 'Posicionamiento y propuesta de valor', texto: 'El lugar que la empresa puede ocupar y defender en la mente del mercado, y la idea central que organiza lo que hace, cree y promete.' },
  { titulo: 'Inteligencia de audiencias', texto: 'Quién participa en la decisión, qué necesita comprender y qué preguntas aparecen a lo largo de la oportunidad comercial.' },
  { titulo: 'Arquitectura de mensajes', texto: 'La relación entre promesa, argumentos, pruebas, audiencias y situaciones comerciales.' },
  { titulo: 'Estrategia editorial', texto: 'Los temas donde la empresa reúne conocimiento, credenciales y una oportunidad real de desarrollar una voz propia.' },
  { titulo: 'Narrativa de marca y liderazgo de opinión', texto: 'El lenguaje, las señales visuales y los puntos de vista que vuelven reconocible a la empresa y a sus especialistas.' },
]

const CAMBIA = [
  { titulo: 'La empresa se vuelve más fácil de explicar', texto: 'Dirección, marketing y ventas cuentan una historia que el mercado puede comprender y repetir.' },
  { titulo: 'La marca gana un lugar propio en la categoría', texto: 'La posición, el lenguaje y las señales expresan algo que la empresa puede sostener como propio.' },
  { titulo: 'Las herramientas comparten un punto de partida', texto: 'Sitios, propuestas, campañas y presentaciones se construyen desde una misma arquitectura.' },
]

export default function EstrategiaYRelatoDeMarca() {
  return (
    <Pagina>
      <Hero
        color="amarillo"
        eyebrow="01. Estrategia y relato de marca"
        titulo="Una historia que tu mercado puede entender y repetir."
        cursiva="puede entender y repetir."
        bajada="Definimos qué hace valiosa a tu empresa, cómo debe posicionarse y qué necesita escuchar cada audiencia."
      />
      <CuerpoCeleste>
      <Bloque titulo="Ocupar un lugar exige elegirlo.">
        <p>Las empresas complejas suelen describirse con las mismas palabras: innovación, experiencia y compromiso.</p>
        <p>Una posición define qué valor puede defender la empresa, para quién importa y qué pruebas la vuelven creíble.</p>
      </Bloque>
      <Bloque titulo="Empezamos por el negocio y las preguntas del comprador.">
        <p>Partimos de cómo la empresa crea valor, de las decisiones que la distinguen y de las razones por las que sus clientes la eligen. Luego contrastamos ese conocimiento con el mercado, la competencia, las búsquedas y las conversaciones que ya están ocurriendo.</p>
        <p>Elegimos las conversaciones que tu empresa merece liderar.</p>
      </Bloque>
      <Bloque titulo="Qué construimos.">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="Qué cambia.">
        <Items items={CAMBIA} />
      </Bloque>
      <Bloque titulo="Qué recibes.">
        <p className="text-[1.375rem] md:text-[1.625rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.3 }}>
          Una plataforma estratégica, verbal y visual, aplicable en comunicación corporativa, marketing, ventas, licitaciones y experiencias digitales.
        </p>
      </Bloque>
      <CasoEnlace titulo="Una nueva identidad para dos públicos.">
        <p>De una marca inmobiliaria a dos verticales con públicos distintos. Conservamos el nombre y el vínculo con el mundo inmobiliario, y construimos una identidad capaz de dar personalidad propia a Agency y Broker.</p>
      </CasoEnlace>
      </CuerpoCeleste>
      <Cierre />
    </Pagina>
  )
}
