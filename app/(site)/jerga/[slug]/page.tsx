import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import NextImage from 'next/image'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import { CuerpoJerga } from '@/components/portable-text-jerga'
import { fechaLegible, ETIQUETA_TIPO, CTA_TIPO } from '@/content/jerga'
import { todas, porSlug, categoria, categorias, relacionadas } from '@/sanity/lib/jerga'

const CREMA = '#F9F0E2'
const NEGRO = '#000000'

export const revalidate = 60

export async function generateStaticParams() {
  const piezas = await todas()
  return piezas.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pieza = await porSlug(params.slug)
  if (!pieza) return { title: 'JERGA — Flahoolick' }
  return {
    title: `${pieza.titulo} — JERGA`,
    description: pieza.bajada,
  }
}

export default async function PiezaPage({ params }: { params: { slug: string } }) {
  const pieza = await porSlug(params.slug)
  if (!pieza) notFound()

  const [cat, otras, cats] = await Promise.all([
    categoria(pieza.categoria),
    relacionadas(pieza),
    categorias(),
  ])
  const nombreCategoria = (slug: string) => cats.find(c => c.slug === slug)?.nombre

  return (
    <>
      <PageColorSetter bg={CREMA} text={NEGRO} />

      {/* Cabecera */}
      <section className="page-px" style={{ backgroundColor: CREMA, color: NEGRO, paddingTop: 'calc(64px + 5rem)', paddingBottom: '3rem' }}>
        <div className="max-container">
          <div style={{ maxWidth: '900px' }}>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link href={`/jerga/categoria/${pieza.categoria}`}
                className="label px-4 py-2 hover:opacity-60 transition-opacity"
                style={{ backgroundColor: NEGRO, color: CREMA, borderRadius: '2px' }}>
                {cat?.nombre}
              </Link>
              <span className="label" style={{ opacity: 0.45 }}>{ETIQUETA_TIPO[pieza.tipo]}</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
              marginBottom: '2rem',
            }}>{pieza.titulo}</h1>

            <p style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)', lineHeight: 1.5, opacity: 0.65, marginBottom: '2.5rem' }}>
              {pieza.bajada}
            </p>

            <div className="flex flex-wrap items-center gap-6 label" style={{ opacity: 0.45, borderTop: '1px solid rgba(0,0,0,0.15)', paddingTop: '1.5rem' }}>
              <span>{pieza.autor}</span>
              <span>{fechaLegible(pieza.fecha)}</span>
              <span>{pieza.lectura} min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Imagen de apertura */}
      <section className="page-px" style={{ backgroundColor: CREMA }}>
        <div className="max-container">
          <div style={{
            position: 'relative',
            aspectRatio: '21/9',
            backgroundColor: 'rgba(0,0,0,0.07)',
            display: pieza.imagenDestacadaUrl ? 'block' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {pieza.imagenDestacadaUrl ? (
              <NextImage
                src={pieza.imagenDestacadaUrl}
                alt={pieza.imagenDestacadaAlt ?? pieza.titulo}
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <span className="label" style={{ opacity: 0.25 }}>Imagen de apertura</span>
            )}
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="page-px section-py" style={{ backgroundColor: CREMA, color: NEGRO }}>
        <div className="max-container">
          <article style={{ maxWidth: '720px' }}>
            <CuerpoJerga value={pieza.cuerpo} />
          </article>

          {/* Firma */}
          <div style={{ maxWidth: '720px', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.15)' }}>
            <p className="label" style={{ opacity: 0.45, marginBottom: '0.5rem' }}>Escrito por</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', lineHeight: 1.2 }}>{pieza.autor}</p>
          </div>
        </div>
      </section>

      {/* Relacionadas */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}>
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-headline">Seguir leyendo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otras.map(p => (
              <Link key={p.slug} href={`/jerga/${p.slug}`} className="group flex flex-col gap-4">
                <div style={{ position: 'relative', aspectRatio: '3/2', backgroundColor: 'rgba(255,255,255,0.06)', display: p.imagenDestacadaUrl ? 'block' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.imagenDestacadaUrl ? (
                    <NextImage src={p.imagenDestacadaUrl} alt={p.imagenDestacadaAlt ?? p.titulo} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className="label" style={{ opacity: 0.2 }}>Imagen</span>
                  )}
                </div>
                <p className="label" style={{ opacity: 0.4 }}>{nombreCategoria(p.categoria)}</p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
                  lineHeight: 1.15,
                }} className="group-hover:opacity-60 transition-opacity">{p.titulo}</h3>
                <span className="label" style={{ opacity: 0.3 }}>{CTA_TIPO[p.tipo]}</span>
              </Link>
            ))}
          </div>
          <Link href="/jerga" className="label hover:opacity-60 transition-opacity" style={{ opacity: 0.5 }}>
            ← Volver a JERGA
          </Link>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
