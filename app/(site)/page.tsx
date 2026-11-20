import { Metadata } from 'next'
import { Marquee } from '@/components/marquee'
import { Pagina, Hero, Pantalla, Boton, FUENTE, DESTACADA, Italica, Cierre, CABECERAS, ESTILO_FUENTE } from '@/components/minimal'
import { ETAPAS } from '@/components/etapas-datos'
import { EtapasScroll } from '@/components/etapas-scroll'
import { CapacidadesTarjetas } from '@/components/capacidades'
import { Grafico955 } from '@/components/grafico-95-5'
import { CarruselCasos } from '@/components/carrusel-casos'
import { CASOS } from '@/components/casos-datos'



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
          color="amarillo"
          titulo={<>Tu empresa sabe mucho. <Italica>Haz que cuente.</Italica></>}
          /* Bajada anterior, guardada por si se vuelve a ella:
             "Transformamos el conocimiento de tu organización en autoridad de mercado, presencia de marca y herramientas comerciales." */
          bajada="Ayudamos a articular el valor que creas para tus clientes y convertirlo en una estrategia de marca, contenido y comunicación comercial."
        />

        <Pantalla centrado tinta={CABECERAS.hielo.texto} titulo="Solo el 5% de tu mercado está listo para comprar hoy." cursiva="está listo para comprar hoy.">
          <p>El 95% lo hará más adelante. Trabajamos para que tu marca esté presente cuando llegue ese momento.</p>
          {/* El gráfico va inclinado y quieto. La fuente va chueca abajo a la derecha, cerca del gráfico,
              con una flecha punteada que apunta al gráfico. */}
          <div className="relative mx-auto w-full pb-12" style={{ maxWidth: '19.75rem' }}>
            <div style={{ rotate: '-8deg' }}>
              <Grafico955 className="block w-full" />
            </div>
            <div className="absolute bottom-0 right-0 flex flex-col items-start md:-right-16" style={{ rotate: '-8deg' }}>
              <p className="whitespace-nowrap" style={ESTILO_FUENTE}>Regla 95:5 · John Dawes</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/flecha-curva.svg" alt="" aria-hidden className="-mt-0.5" style={{ width: '58px', height: 'auto', marginLeft: '-2.75rem' }} />
            </div>
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
        <section className="flex flex-col items-center py-7 text-center md:py-9"
          style={{ ...ANCHO_COMPLETO('#000000'), color: '#ffffff' }}>
          <CarruselCasos nombres={CASOS.map(c => c.nombre)} casos={CASOS.map(c => (
            <div key={c.nombre} className="flex flex-col items-center gap-3">
              <p className="label" style={{ opacity: 0.6 }}>Caso {c.nombre}</p>
              <h3 className="text-[1.375rem] md:text-[1.625rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.3 }}>{c.titulo}</h3>
              <p>{c.texto}</p>
              <Boton href={`/clientes/${c.slug}`} claro>Conoce la historia de {c.nombre}</Boton>
            </div>
          ))} />
        </section>

        {/* Servicios: titular y bajada centrados, y las tres capacidades en tres columnas sin cajas, en blanco. */}
        <section className="flex flex-col items-center gap-12 py-16 text-center md:py-24" style={{ ...ANCHO_COMPLETO('#ffffff'), color: CABECERAS.hielo.texto, ['--tinta' as string]: CABECERAS.hielo.texto } as React.CSSProperties}>
          <div className="flex flex-col items-center gap-6" style={{ maxWidth: '44rem' }}>
            <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' }}>Tres capacidades. <Italica>Un sistema de contenido.</Italica></h2>
            <p>Combinamos estrategia, creatividad y tecnología para convertir el conocimiento de tu empresa en presencia de mercado.</p>
          </div>
          <CapacidadesTarjetas />
          <Boton href="#contacto">Agenda una llamada</Boton>
        </section>

        {/* Quiénes somos: centrado, en celeste con texto azul noche a todo el ancho. */}
        <section className="flex flex-col items-center py-16 text-center md:py-24"
          style={{ ...ANCHO_COMPLETO(CABECERAS.hielo.fondo), color: CABECERAS.hielo.texto, ['--tinta' as string]: CABECERAS.hielo.texto } as React.CSSProperties}>
          <div className="mx-auto flex flex-col items-center gap-6" style={{ maxWidth: '48rem' }}>
          <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Veinticinco años <Italica>en el negocio de la atención.</Italica>
          </h2>
          <p>Venimos de grupos publicitarios globales, medios de comunicación y consultoría. Somos profesionales de estrategia, tecnología, creatividad y comunicación.</p>
          <p>Estamos al servicio de empresas B2B que necesitan transformar su conocimiento en presencia de mercado.</p>
          <Boton href="/sobre-flahoolick">Sobre Flahoolick</Boton>
          </div>
        </section>

        {/* Logos: una franja blanca apretada a todo el ancho, pegada al bloque celeste de arriba. "Marcas que nos formaron"
            va en una pestañita blanca centrada, de esquinas redondeadas, que sale del borde superior de la franja. */}
        <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ffffff' }}>
          <p className="absolute bottom-full left-1/2 -translate-x-1/2">
            <span className="inline-block whitespace-nowrap px-4 pt-1.5 pb-1 text-[0.8125rem]"
              style={{ backgroundColor: '#ffffff', color: 'rgba(0,0,0,0.55)', borderRadius: '12px 12px 0 0' }}>
              Marcas que nos formaron
            </span>
          </p>
          <Marquee color={CABECERAS.hielo.texto} excluir={['Dunamis']} />
        </div>

        <Cierre />
    </Pagina>
  )
}
