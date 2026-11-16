import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, CasoEnlace, Cierre } from '@/components/minimal'
import { DotPattern } from '@/components/dot-pattern'

export const metadata: Metadata = {
  title: 'Posicionamiento, marca y relato B2B | Flahoolick',
  description: 'Definimos la posición, la idea central y el sistema verbal y visual que permite explicar negocios B2B complejos.',
}

const CONSTRUIMOS = [
  { titulo: 'Posición', texto: 'El lugar que la empresa puede ocupar y defender en la mente del mercado.' },
  { titulo: 'Idea central', texto: 'La afirmación que organiza lo que la empresa hace, cree y promete.' },
  { titulo: 'Arquitectura de mensajes', texto: 'La relación entre promesa, argumentos, pruebas, audiencias y situaciones comerciales.' },
  { titulo: 'Voz e identidad', texto: 'El lenguaje y las señales visuales que vuelven reconocible la estrategia en cada punto de contacto.' },
]

const CAMBIA = [
  { titulo: 'La empresa se vuelve más fácil de explicar', texto: 'Dirección, marketing y ventas cuentan una historia que el mercado puede comprender y repetir.' },
  { titulo: 'La marca gana un lugar propio en la categoría', texto: 'La posición, el lenguaje y las señales expresan algo que la empresa puede sostener como propio.' },
  { titulo: 'Las herramientas comparten un punto de partida', texto: 'Sitios, propuestas, campañas y presentaciones se construyen desde una misma arquitectura.' },
]

export default function MarcaYRelato() {
  return (
    <Pagina>
      <Hero
        color="rosa"
        visual={<DotPattern pattern="convergencia" color={'#000000'} accentColor={'#ffffff'} />}
        eyebrow="Marca y relato"
        titulo="Una historia que tu mercado puede entender y repetir."
        bajada="Definimos la posición de tu empresa y los mensajes que todo el equipo cuenta igual."
      />
      <Bloque titulo="Ocupar un lugar exige elegirlo.">
        <p>Las empresas complejas suelen describirse con las mismas palabras: innovación, experiencia y compromiso.</p>
        <p>Una posición define qué valor puede defender la empresa, para quién importa y qué pruebas la vuelven creíble.</p>
      </Bloque>
      <Bloque titulo="Una marca sólida nace de comprender profundamente el negocio.">
        <p>Partimos de cómo la empresa crea valor, de las decisiones que la distinguen y de las razones por las que sus clientes la eligen. Desde ahí construimos una historia que el mercado puede comprender y que los equipos pueden aplicar.</p>
      </Bloque>
      <Bloque titulo="Qué construimos">
        <Items items={CONSTRUIMOS} />
      </Bloque>
      <Bloque titulo="Qué cambia">
        <Items items={CAMBIA} />
      </Bloque>
      <Bloque titulo="Una estrategia preparada para entrar en contacto con el mercado.">
        <p>Entregamos una plataforma estratégica, verbal y visual aplicable en comunicación corporativa, marketing, ventas, licitaciones y experiencias digitales.</p>
        <p>La entrega incluye las herramientas necesarias para llevar la estrategia a la práctica.</p>
      </Bloque>
      <CasoEnlace titulo="Una nueva identidad para dos públicos.">
        <p>De una marca inmobiliaria a dos verticales con públicos distintos. Conservamos el nombre y el vínculo con el mundo inmobiliario, y construimos una identidad capaz de dar personalidad propia a Agency y Broker.</p>
      </CasoEnlace>
      <Cierre titulo="Dale a tu empresa una posición que pueda demostrar." cta="Agenda una llamada" />
    </Pagina>
  )
}
