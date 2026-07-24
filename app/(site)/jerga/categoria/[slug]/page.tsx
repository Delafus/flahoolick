import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import NextImage from 'next/image'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import { fechaLegible, ETIQUETA_TIPO, CTA_TIPO } from '@/content/jerga'
import { categoria, categorias, porCategoria } from '@/sanity/lib/jerga'

const CHARTREUSE = '#F5FD92'
const NEGRO = '#000000'

export const revalidate = 60

export async function generateStaticParams() {
  const cats = await categorias()
  return cats.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = await categoria(params.slug)
  if (!cat) return { title: 'JERGA — Flahoolick' }
  return { title: `${cat.nombre} — JERGA`, description: cat.descripcion }
}

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  const cat = await categoria(params.slug)
  if (!cat) notFound()

  const [piezas, cats] = await Promise.all([
    porCategoria(cat.slug),
    categorias(),
  ])

  return (
    <>
      <PageColorSetter bg={CHARTREUSE} text={NEGRO} />

      {/* Cabecera */}
      <section className="page-px" style={{ backgroundColor: CHARTREUSE, color: NEGRO, paddingTop: 'calc(64px + 5rem)', paddingBottom: '4rem' }}>
        <div className="max-container">
          <Link href="/jerga" className="label hover:opacity-60 transition-opacity" style={{ opacity: 0.5 }}>
            ← JERGA
          </Link>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            marginTop: '2rem',
          }}>{cat.nombre}</h1>
          <p style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.4rem)', lineHeight: 1.55, opacity: 0.7, maxWidth: '640px', marginTop: '1.5rem' }}>
            {cat.descripcion}
          </p>
          <p className="label" style={{ opacity: 0.45, marginTop: '2rem' }}>
            {piezas.length} {piezas.length === 1 ? 'publicación' : 'publicaciones'}
          </p>

          {/* Otras categorías */}
          <div className="flex flex-wrap gap-3 mt-10">
            {cats.map(c => (
              <Link key={c.slug} href={`/jerga/categoria/${c.slug}`}
                className="label px-4 py-2 hover:opacity-60 transition-opacity"
                style={c.slug === cat.slug
                  ? { backgroundColor: NEGRO, color: CHARTREUSE, borderRadius: '2px' }
                  : { border: '1px solid rgba(0,0,0,0.25)', borderRadius: '2px' }}>
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Listado */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}>
        <div className="max-container flex flex-col">
          {piezas.map(p => (
            <Link key={p.slug} href={`/jerga/${p.slug}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-10"
              style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}>
              <div className="md:col-span-4">
                <div style={{ position: 'relative', aspectRatio: '3/2', backgroundColor: 'rgba(0,0,0,0.07)', display: p.imagenDestacadaUrl ? 'block' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.imagenDestacadaUrl ? (
                    <NextImage src={p.imagenDestacadaUrl} alt={p.imagenDestacadaAlt ?? p.titulo} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className="label" style={{ opacity: 0.2 }}>Imagen</span>
                  )}
                </div>
              </div>
              <div className="md:col-span-8 flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-4 label" style={{ opacity: 0.45 }}>
                  <span>{ETIQUETA_TIPO[p.tipo]}</span>
                  <span>{fechaLegible(p.fecha)}</span>
                  <span>{p.lectura} min</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.015em',
                }} className="group-hover:opacity-60 transition-opacity">{p.titulo}</h2>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.6, maxWidth: '620px' }}>{p.bajada}</p>
                <span className="label" style={{ opacity: 0.35 }}>{CTA_TIPO[p.tipo]}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
