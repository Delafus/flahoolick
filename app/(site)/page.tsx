import { Metadata } from 'next'
import { Marquee } from '@/components/marquee'
import { Pagina, Hero, Pantalla, Bloque, Boton, FUENTE, Cierre } from '@/components/minimal'
import { ETAPAS } from '@/components/etapas-datos'
import { EtapasScroll } from '@/components/etapas-scroll'
import { Capacidades } from '@/components/capacidades'

export const metadata: Metadata = {
  title: 'Flahoolick | Contenido B2B que convierte conocimiento en ventas',
  description: 'Convertimos el conocimiento de tu empresa en contenido y herramientas de venta para mercados B2B con ciclos largos. Santiago, Chile.',
}

const TITULO_SECCION = 'text-[1.75rem] md:text-[2.5rem]'
const ESTILO_TITULO_SECCION = { ...FUENTE, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.03em' }

export default function HomePage() {
  return (
    <Pagina>
        <Hero
          color="negro"
          titulo="Tu empresa sabe mucho. Haz que cuente."
          bajada="Transformamos el conocimiento de tu organización en autoridad de mercado, presencia de marca y herramientas comerciales."
        />

        <Pantalla centrado titulo="Solo el 5% de tu mercado está listo para comprar hoy.">
          <p>El 95% restante comprará en seis meses, un año o más. Cuando llegue ese momento, tu marca necesita estar entre las que el comprador conoce, recuerda y considera.</p>
          <p>Construimos disponibilidad mental durante todo ese tiempo.</p>
          <p className="text-base" style={{ opacity: 0.5 }}>Regla 95:5 · John Dawes, Ehrenberg-Bass Institute.</p>
        </Pantalla>

        <Pantalla titulo="Tu empresa sabe mucho más de lo que tu mercado conoce.">
          <p>Ese conocimiento está repartido entre personas, documentos, reuniones, presentaciones y equipos técnicos. Entramos a tu negocio, encontramos lo que tiene valor para tus clientes y lo transformamos en una fuente continua de comunicación, contenido y herramientas comerciales.</p>
        </Pantalla>

        {/* Metodología: a todo el ancho de la columna, con el gráfico de puntos que cambia con el scroll. */}
        <section className="flex flex-col gap-10 py-16 md:py-24" style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}>
          <div className="mx-auto flex flex-col items-center gap-6 text-center" style={{ maxWidth: '44rem' }}>
            <p className="label" style={{ opacity: 0.5 }}>Metodología</p>
            <h2 className={TITULO_SECCION} style={ESTILO_TITULO_SECCION}>Del conocimiento disperso a un sistema que trabaja.</h2>
            <p>En muchas empresas, cada persona explica el valor de la oferta a su manera. Partimos por ordenar ese conocimiento y convertirlo en una estrategia que toda la organización pueda activar.</p>
          </div>
          <EtapasScroll etapas={ETAPAS.map(e => ({ slug: e.slug, nombre: e.nombre, texto: e.intro, recibes: e.recibes }))}
            pie={<Boton href="/metodologia">Ver metodología</Boton>} />
        </section>

        <Bloque titulo="Historias de clientes.">
          <p className="label" style={{ opacity: 0.5 }}>Dunamis</p>
          <h3 className="text-[1.375rem] md:text-[1.625rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.3 }}>
            La conversación con el cliente empieza antes de la primera reunión.
          </h3>
          <p>Dunamis es una agencia de asesoría inmobiliaria. Convertimos lo que su equipo sabe del mercado en sitios, contenidos y herramientas donde sus clientes calculan, resuelven dudas y agendan la visita antes de hablar con un agente.</p>
          <Boton href="/clientes/dunamis">Conoce la historia de Dunamis</Boton>
        </Bloque>

        <Bloque titulo="Tres capacidades. Un sistema de contenido.">
          <p>Combinamos estrategia, creatividad y tecnología para convertir el conocimiento de tu empresa en presencia de mercado.</p>
          <Capacidades />
          <Boton href="#contacto">Agenda una llamada</Boton>
        </Bloque>

        {/* Quiénes somos: centrado, a diferencia de los bloques en dos columnas. */}
        <section className="mx-auto flex flex-col items-center gap-6 pt-16 pb-12 text-center md:pt-24" style={{ maxWidth: '48rem', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
          <h2 className={TITULO_SECCION} style={ESTILO_TITULO_SECCION}>
            Veinticinco años explicando lo complejo.
          </h2>
          <p>Venimos de medios de comunicación y grupos publicitarios globales. Somos profesionales de estrategia, periodismo, creatividad y comunicación.</p>
          <p>Hoy ponemos esa experiencia al servicio de empresas B2B que necesitan transformar su conocimiento en presencia de mercado.</p>
          <Boton href="/sobre-flahoolick">Sobre Flahoolick</Boton>
        </section>

        {/* Logos a todo el ancho de la pantalla, fuera de la columna. */}
        <div className="pb-16 text-center md:pb-24">
          <p className="text-base" style={{ opacity: 0.5 }}>Marcas que nos formaron</p>
          <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
            <Marquee color="#000000" excluir={['Dunamis']} />
          </div>
        </div>

        <Cierre />
    </Pagina>
  )
}
