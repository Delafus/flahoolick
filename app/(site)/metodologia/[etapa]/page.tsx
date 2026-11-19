import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Pagina, Hero, Cierre, FUENTE, CreditoStrategyzer, CABECERAS, DESTACADA, Italica } from '@/components/minimal'
import { GraficoEtapas } from '@/components/etapas-scroll'

const TITULO = { ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' } as const
import { ETAPAS, etapaPorSlug } from '@/components/etapas-datos'
import { ModuloOtrasEtapas } from '@/components/modulo-otras-etapas'

/** Una página por etapa de la metodología, con la estructura de nobl.io/methodology/methodology-process:
    hero de color, qué hacemos, cómo, qué recibes, cita de cliente, las otras etapas y contacto. */

export function generateStaticParams() {
  return ETAPAS.map(e => ({ etapa: e.slug }))
}

export function generateMetadata({ params }: { params: { etapa: string } }): Metadata {
  const e = etapaPorSlug(params.etapa)
  if (!e) return {}
  return {
    title: `${e.nombre} | Metodología | Flahoolick`,
    description: e.resumen,
  }
}

export default function EtapaMetodologia({ params }: { params: { etapa: string } }) {
  const e = etapaPorSlug(params.etapa)
  if (!e) notFound()
  const otras = ETAPAS.filter(o => o.slug !== e.slug)

  return (
    <Pagina>
      <Hero
        color="amarillo"
        dosColumnas
        eyebrow={<>
          <Link href="/metodologia" className="underline-offset-4 decoration-1 hover:underline">Metodología</Link>
          <span aria-hidden="true" style={{ margin: '0 0.6em', opacity: 0.5 }}>/</span>
          {e.nombre}
        </>}
        titulo={e.titular}
        cursiva={e.cursiva}
        bajada={e.bajada}
        visual={<GraficoEtapas estado={ETAPAS.indexOf(e)} className="h-full w-full" />}
      />
      {/* Bajo el hero amarillo: celeste con texto azul noche, a todo el ancho. Títulos en Bricolage con remate en cursiva. */}
      <div className="flex flex-col gap-16 py-16 md:gap-24 md:py-24" style={{
        backgroundColor: CABECERAS.hielo.fondo, color: CABECERAS.hielo.texto, ['--tinta' as string]: CABECERAS.hielo.texto,
        boxShadow: `0 0 0 100vmax ${CABECERAS.hielo.fondo}`, clipPath: 'inset(0 -100vmax)',
      } as React.CSSProperties}>
        <section className="flex flex-col gap-6" style={{ maxWidth: '48rem' }}>
          <h2 className="text-[2.25rem] md:text-[3.25rem]" style={TITULO}>Qué <Italica>hacemos.</Italica></h2>
          <p className="text-[1.25rem] md:text-[1.375rem]" style={{ lineHeight: 1.45 }}>{e.texto}</p>
        </section>

        <section className="flex flex-col gap-10">
          <h2 className="text-[2.25rem] md:text-[3.25rem]" style={TITULO}>Cómo lo <Italica>hacemos.</Italica></h2>
          <ul className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2 md:gap-y-12">
            {e.como.map((c, i) => (
              <li key={c.titulo} className="flex flex-col gap-3">
                <h3 className="text-[1.5rem] md:text-[1.75rem]" style={{ ...DESTACADA, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                  {String(i + 1).padStart(2, '0')} {c.titulo}
                </h3>
                <p>{c.texto}</p>
              </li>
            ))}
          </ul>
          {e.como.some(c => c.titulo === 'Value Proposition Canvas') && <CreditoStrategyzer />}
        </section>

        <section className="flex flex-col gap-6" style={{ maxWidth: '48rem' }}>
          <h2 className="text-[2.25rem] md:text-[3.25rem]" style={TITULO}>Qué <Italica>recibes.</Italica></h2>
          <p className="text-[1.5rem] md:text-[2rem]" style={{ ...DESTACADA, lineHeight: 1.15, letterSpacing: '-0.02em' }}>{e.recibes}</p>
        </section>

        {e.cita && (
          <section className="flex flex-col gap-6">
            <h2 className="text-[2.25rem] md:text-[3.25rem]" style={TITULO}>En palabras <Italica>de un cliente.</Italica></h2>
            <figure className="flex flex-col gap-6 py-2 pl-6" style={{ borderLeft: '4px solid currentColor', maxWidth: '48rem' }}>
              <blockquote className="text-[1.25rem] md:text-[1.5rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.35 }}>
                {e.cita.texto}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {e.cita.retrato && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.cita.retrato} alt={`Retrato de ${e.cita.nombre}`}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                )}
                <span className="flex flex-col">
                  <span className="label">{e.cita.nombre}</span>
                  <span className="label" style={{ opacity: 0.6 }}>{e.cita.cargo}</span>
                </span>
              </figcaption>
            </figure>
          </section>
        )}
      </div>
      <ModuloOtrasEtapas tarjetas={[
        ...otras.map(o => ({ titulo: o.nombre, texto: o.resumen, href: `/metodologia/${o.slug}`, puntos: Number(o.numero) })),
        { titulo: 'La metodología completa', texto: 'Las tres etapas, los principios con que trabajamos y un caso real.', href: '/metodologia', puntos: 9 },
      ]} />
      <Cierre titulo="El conocimiento adquiere valor cuando encuentra una función en el mercado." cta="Agenda una llamada" />
    </Pagina>
  )
}
