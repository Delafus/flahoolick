import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Pagina, Hero, Bloque, Items, Cierre, FUENTE } from '@/components/minimal'
import { ETAPAS, etapaPorSlug } from '@/components/etapas-datos'

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
        eyebrow={<>
          <Link href="/metodologia" className="underline-offset-4 decoration-1 hover:underline">Metodología</Link>
          <span aria-hidden="true" style={{ margin: '0 0.6em', opacity: 0.5 }}>/</span>
          {e.nombre}
        </>}
        titulo={`${e.nombre}.`}
        bajada={e.resumen}
      />
      <Bloque titulo="Qué hacemos.">
        <p>{e.texto}</p>
      </Bloque>
      <Bloque titulo="Cómo lo hacemos.">
        <Items items={e.como} />
      </Bloque>
      <Bloque titulo="Qué recibes.">
        <p className="text-[1.375rem] md:text-[1.625rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.3 }}>{e.recibes}</p>
      </Bloque>
      {e.cita && (
        <Bloque titulo="En palabras de un cliente.">
          <figure className="flex flex-col gap-6 py-2 pl-6" style={{ borderLeft: '4px solid #1FDE91' }}>
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
        </Bloque>
      )}
      <Bloque titulo="Las otras etapas.">
        <Items items={[
          ...otras.map(o => ({ titulo: `${o.numero} ${o.nombre}`, texto: o.resumen, href: `/metodologia/${o.slug}` })),
          { titulo: 'La metodología completa', texto: 'Las tres etapas, los principios con que trabajamos y un caso real.', href: '/metodologia' },
        ]} />
      </Bloque>
      <Cierre titulo="El conocimiento adquiere valor cuando encuentra una función en el mercado." cta="Agenda una llamada" />
    </Pagina>
  )
}
