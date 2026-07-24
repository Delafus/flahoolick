import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import {
  PIEZAS, porSlug, categoria, relacionadas,
  fechaLegible, ETIQUETA_TIPO, CTA_TIPO, type Bloque,
} from '@/content/jerga'

const CREMA = '#F9F0E2'
const NEGRO = '#000000'

export function generateStaticParams() {
  return PIEZAS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const pieza = porSlug(params.slug)
  if (!pieza) return { title: 'JERGA — Flahoolick' }
  return {
    title: `${pieza.titulo} — JERGA`,
    description: pieza.bajada,
  }
}

// ── Bloques de contenido ──────────────────────────────────────

function RenderBloque({ bloque }: { bloque: Bloque }) {
  switch (bloque.tipo) {
    case 'parrafo':
      return (
        <p style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', lineHeight: 1.75, opacity: 0.8, marginBottom: '1.5rem' }}>
          {bloque.texto}
        </p>
      )

    case 'subtitulo':
      return (
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 400,
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.015em',
          marginTop: '3.5rem',
          marginBottom: '1.5rem',
        }}>{bloque.texto}</h2>
      )

    case 'cita':
      return (
        <figure style={{ margin: '3rem 0', paddingLeft: '2rem', borderLeft: `2px solid ${NEGRO}` }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
          }}>{bloque.texto}</p>
          {bloque.autor && (
            <figcaption className="label" style={{ opacity: 0.45, marginTop: '1rem' }}>{bloque.autor}</figcaption>
          )}
        </figure>
      )

    case 'destacado':
      return (
        <div style={{ margin: '3rem 0', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', lineHeight: 1.5, fontWeight: 500 }}>
            {bloque.texto}
          </p>
        </div>
      )

    case 'lista':
      return (
        <ul style={{ margin: '0 0 2rem', padding: 0, listStyle: 'none' }}>
          {bloque.items.map(item => (
            <li key={item} style={{
              fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
              lineHeight: 1.7,
              opacity: 0.8,
              paddingLeft: '1.5rem',
              position: 'relative',
              marginBottom: '0.75rem',
            }}>
              <span style={{ position: 'absolute', left: 0, opacity: 0.4 }}>—</span>
              {item}
            </li>
          ))}
        </ul>
      )

    case 'imagen':
      return (
        <figure style={{ margin: '3rem 0' }}>
          <div style={{
            aspectRatio: bloque.ratio ?? '16/9',
            backgroundColor: 'rgba(0,0,0,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span className="label" style={{ opacity: 0.25 }}>Imagen</span>
          </div>
          {bloque.pie && (
            <figcaption className="text-sm" style={{ opacity: 0.5, marginTop: '0.75rem' }}>{bloque.pie}</figcaption>
          )}
        </figure>
      )

    case 'paso':
      return (
        <div style={{ margin: '2.5rem 0', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
          <div className="flex items-baseline gap-4 mb-3">
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              lineHeight: 1,
              opacity: 0.2,
            }}>{String(bloque.numero).padStart(2, '0')}</span>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
              lineHeight: 1.15,
            }}>{bloque.titulo}</h3>
          </div>
          <p style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', lineHeight: 1.75, opacity: 0.8 }}>
            {bloque.texto}
          </p>
        </div>
      )
  }
}

// ── Página ────────────────────────────────────────────────────

export default function PiezaPage({ params }: { params: { slug: string } }) {
  const pieza = porSlug(params.slug)
  if (!pieza) notFound()

  const cat = categoria(pieza.categoria)
  const otras = relacionadas(pieza)

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
            aspectRatio: '21/9',
            backgroundColor: 'rgba(0,0,0,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span className="label" style={{ opacity: 0.25 }}>Imagen de apertura</span>
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="page-px section-py" style={{ backgroundColor: CREMA, color: NEGRO }}>
        <div className="max-container">
          <article style={{ maxWidth: '720px' }}>
            {pieza.cuerpo.map((bloque, i) => (
              <RenderBloque key={i} bloque={bloque} />
            ))}
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
                <div style={{ aspectRatio: '3/2', backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="label" style={{ opacity: 0.2 }}>Imagen</span>
                </div>
                <p className="label" style={{ opacity: 0.4 }}>{categoria(p.categoria)?.nombre}</p>
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
