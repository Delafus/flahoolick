import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Pagina, Bloque, Cierre, ENLACE } from '@/components/minimal'
import { CTA_TIPO } from '@/content/jerga'
import { JERGA_VISIBLE } from '@/components/jerga-visible'
import { todas, porTipo, destacada, categorias } from '@/sanity/lib/jerga'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'JERGA | Estrategia, contenido y decisiones B2B',
  description: 'Ideas, guías y herramientas de Flahoolick para convertir conocimiento complejo en presencia de marca y apoyo para ventas.',
  ...(JERGA_VISIBLE ? {} : { robots: { index: false } }),
}

export default async function JergaPage() {
  const [featured, guias, todasLasPiezas, cats] = await Promise.all([
    destacada(),
    porTipo('guia'),
    todas(),
    categorias(),
  ])
  const nombreCategoria = (slug: string) => cats.find(c => c.slug === slug)?.nombre

  return (
    <Pagina angosta>
      <section className="flex flex-col justify-center gap-8" style={{ minHeight: '75dvh', paddingTop: '64px' }}>
        <h1>
          <Image src="/logotipo-jerga.svg" alt="JERGA" width={340} height={190}
            style={{ width: 'clamp(180px, 22vw, 260px)', height: 'auto', filter: 'brightness(0)' }} priority />
        </h1>
        <p>Ideas, guías y herramientas para convertir conocimiento complejo en una ventaja visible.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {cats.map(c => (
            <li key={c.slug}><Link href={`/jerga/categoria/${c.slug}`} className={ENLACE}>{c.nombre}</Link></li>
          ))}
        </ul>
      </section>

      {featured && (
        <Bloque titulo={featured.titulo}>
          <p className="text-base" style={{ opacity: 0.5 }}>Destacado · {nombreCategoria(featured.categoria)}</p>
          <p>{featured.bajada}</p>
          <p><Link href={`/jerga/${featured.slug}`} className={ENLACE}>{CTA_TIPO[featured.tipo]}</Link></p>
        </Bloque>
      )}

      {guias.length > 0 && (
        <Bloque titulo="Guías">
          <p>Documentos para trabajar un problema completo y llevar mejores preguntas a una conversación de equipo.</p>
          <ul className="flex flex-col gap-4">
            {guias.map(g => (
              <li key={g.slug}><Link href={`/jerga/${g.slug}`} className={ENLACE}>{g.titulo}</Link></li>
            ))}
          </ul>
        </Bloque>
      )}

      <Bloque titulo="Todo">
        <ul className="flex flex-col gap-4">
          {todasLasPiezas.map(p => (
            <li key={p.slug}>
              <Link href={`/jerga/${p.slug}`} className={ENLACE}>{p.titulo}</Link>
              <span className="block text-base" style={{ opacity: 0.5 }}>{nombreCategoria(p.categoria)} · {p.lectura} min</span>
            </li>
          ))}
        </ul>
      </Bloque>

      <Cierre
        titulo="Tráenos el manual más técnico o el problema de comunicación más árido de tu empresa."
        texto="En 30 minutos podemos encontrar una primera forma de desarmarlo y convertirlo en una oportunidad de comunicación."
        cta="Pongámoslo sobre la mesa →"
      />
    </Pagina>
  )
}
