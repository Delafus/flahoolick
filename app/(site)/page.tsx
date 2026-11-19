import { Metadata } from 'next'
import { Marquee } from '@/components/marquee'
import { Pagina, Hero, Pantalla, Boton, FUENTE, DESTACADA, Italica, Cierre, CABECERAS } from '@/components/minimal'
import { ETAPAS } from '@/components/etapas-datos'
import { EtapasScroll } from '@/components/etapas-scroll'
import { CapacidadesTarjetas } from '@/components/capacidades'
import { Grafico955 } from '@/components/grafico-95-5'
import { CarruselCasos } from '@/components/carrusel-casos'

/** Casos del carrusel de la home, en orden. */
const CASOS = [
  {
    nombre: 'Dunamis',
    titulo: 'El cliente llega a la reunión con la tarea adelantada.',
    texto: 'Dunamis puso su conocimiento inmobiliario al alcance de sus clientes. Hoy pueden evaluar opciones, calcular valores y resolver dudas antes de conversar con un especialista.',
    href: '/clientes/dunamis',
  },
  {
    nombre: 'Rameau',
    titulo: 'Una plataforma lista que todavía no sabía a quién hablarle.',
    texto: 'Con Rameau trabajamos el Value Proposition Canvas y pusimos a prueba sus hipótesis con leads reales. Hoy saben qué relato necesita la plataforma y a quién de la organización le habla.',
    href: '/clientes/rameau',
  },
]

export const metadata: Metadata = {
  title: 'Flahoolick | Contenido B2B que convierte conocimiento en ventas',
  description: 'Convertimos el conocimiento de tu empresa en contenido y herramientas de venta para mercados B2B con ciclos largos. Santiago, Chile.',
}

/** Fondo de color a todo el ancho de la pantalla para una sección que vive dentro de la columna. */
const ANCHO_COMPLETO = (color: string) => ({ backgroundColor: color, boxShadow: `0 0 0 100vmax ${color}`, clipPath: 'inset(0 -100vmax)' })

export default function HomePage() {
  return (
    <Pagina>
        <Hero
          color="hielo"
          titulo={<>Tu empresa sabe mucho. <Italica>Haz que cuente.</Italica></>}
          /* Bajada anterior, guardada por si se vuelve a ella:
             "Transformamos el conocimiento de tu organización en autoridad de mercado, presencia de marca y herramientas comerciales." */
          bajada="Ayudamos a articular el valor que creas para tus clientes y convertirlo en una estrategia de marca, contenido y comunicación comercial."
        />

        <Pantalla centrado titulo="Solo el 5% de tu mercado está listo para comprar hoy." cursiva="está listo para comprar hoy.">
          <p>El 95% lo hará más adelante. Trabajamos para que tu marca esté presente cuando llegue ese momento.</p>
          {/* Caja de puntos de ancho fijo (el que tenía con la fuente larga); la fuente va abajo, alineada a su borde derecho. */}
          <div className="mx-auto flex w-full flex-col gap-5" style={{ maxWidth: '19.75rem' }}>
            <Grafico955 className="block w-full" />
            <p className="text-right text-[0.8125rem]" style={{ opacity: 0.5 }}>Regla 95:5 · John Dawes</p>
          </div>
        </Pantalla>

        {/* Metodología: fondo amarillo a todo el ancho de la pantalla, con el gráfico de puntos que cambia con el scroll. */}
        <section className="flex flex-col gap-10 py-16 md:py-24" style={{ ...ANCHO_COMPLETO(CABECERAS.hielo.fondo), color: CABECERAS.hielo.texto, ['--tinta' as string]: CABECERAS.hielo.texto } as React.CSSProperties}>
          <div className="mx-auto flex flex-col items-center gap-6 text-center" style={{ maxWidth: '60rem' }}>
            <p className="label" style={{ opacity: 0.5 }}>Metodología</p>
            {/* Más ancho que el texto, para que en escritorio quede en dos líneas. */}
            <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em', textWrap: 'balance' }}>Del conocimiento disperso <Italica>a un sistema que trabaja.</Italica></h2>
            <p style={{ maxWidth: '44rem' }}>En muchas empresas, cada persona explica el valor de la oferta a su manera. Lo que saben está repartido entre personas, documentos, reuniones y equipos técnicos.</p>
          </div>
          <EtapasScroll etapas={ETAPAS.map(e => ({ slug: e.slug, nombre: e.nombre, texto: e.intro, recibes: e.recibes }))}
           
            pie={<Boton href="/metodologia">Ver metodología</Boton>} />
        </section>

        {/* Historias de clientes: un caso a la vez, con flechas y circulitos, en negro a todo el ancho de la pantalla. */}
        <section className="flex flex-col items-center py-16 text-center md:py-24"
          style={{ ...ANCHO_COMPLETO('#000000'), color: '#ffffff' }}>
          <CarruselCasos nombres={CASOS.map(c => c.nombre)} casos={CASOS.map(c => (
            <div key={c.nombre} className="flex flex-col items-center gap-6">
              <p className="label" style={{ opacity: 0.6 }}>Caso {c.nombre}</p>
              <h3 className="text-[1.375rem] md:text-[1.625rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.3 }}>{c.titulo}</h3>
              <p>{c.texto}</p>
              <Boton href={c.href} claro>Conoce la historia de {c.nombre}</Boton>
            </div>
          ))} />
        </section>

        {/* Servicios: titular y bajada centrados, y las tres capacidades como tarjetas, en rosa a todo el ancho. */}
        <section className="flex flex-col items-center gap-12 py-16 text-center md:py-24" style={ANCHO_COMPLETO(CABECERAS.rosa.fondo)}>
          <div className="flex flex-col items-center gap-6" style={{ maxWidth: '44rem' }}>
            <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' }}>Tres capacidades. <Italica>Un sistema de contenido.</Italica></h2>
            <p>Combinamos estrategia, creatividad y tecnología para convertir el conocimiento de tu empresa en presencia de mercado.</p>
          </div>
          <CapacidadesTarjetas />
          <Boton href="#contacto">Agenda una llamada</Boton>
        </section>

        {/* Quiénes somos: centrado, a diferencia de los bloques en dos columnas. */}
        <section className="mx-auto flex flex-col items-center gap-6 pt-16 pb-12 text-center md:pt-24" style={{ maxWidth: '48rem' }}>
          <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Veinticinco años <Italica>en el negocio de la atención.</Italica>
          </h2>
          <p>Venimos de medios de comunicación y grupos publicitarios globales. Somos profesionales de estrategia, periodismo, creatividad y comunicación.</p>
          <p>Hoy ponemos esa experiencia al servicio de empresas B2B que necesitan transformar su conocimiento en presencia de mercado.</p>
          <Boton href="/sobre-flahoolick">Sobre Flahoolick</Boton>
        </section>

        {/* Logos a todo el ancho de la pantalla, fuera de la columna. */}
        <div className="pt-12 pb-16 text-center md:pt-20 md:pb-24">
          <p className="text-base" style={{ opacity: 0.5 }}>Marcas que nos formaron</p>
          <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
            <Marquee color="#000000" excluir={['Dunamis']} />
          </div>
        </div>

        <Cierre />
    </Pagina>
  )
}
