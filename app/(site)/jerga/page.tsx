import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import {
  CATEGORIAS, todas, porTipo, destacada, categoria,
  conteoPorCategoria, fechaLegible, ETIQUETA_TIPO, CTA_TIPO,
} from '@/content/jerga'

export const metadata: Metadata = {
  title: 'JERGA — Flahoolick',
  description: 'Estrategia de contenido, marketing B2B y autoridad de mercado. Lo que importa, dicho como hay que decirlo.',
}

const CHARTREUSE = '#F5FD92'
const NEGRO = '#000000'

export default function JergaPage() {
  const featured = destacada()
  const guias = porTipo('guia')
  const todasLasPiezas = todas()
  const recientes = todasLasPiezas.filter(p => p.slug !== featured?.slug).slice(0, 6)
  const conteos = conteoPorCategoria()

  return (
    <>
      <PageColorSetter bg={CHARTREUSE} text={NEGRO} />

      {/* ── Cabecera del medio ── */}
      <section className="page-px" style={{ backgroundColor: CHARTREUSE, color: NEGRO, paddingTop: 'calc(64px + 5rem)', paddingBottom: '4rem' }}>
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <Image src="/logotipo-jerga.svg" alt="JERGA" width={340} height={190}
                style={{ width: 'clamp(220px, 26vw, 340px)', height: 'auto' }} priority />
            </div>
            <div className="flex flex-col gap-8 md:pt-4">
              <p style={{
                fontFamily: 'var(--font-display)', fontStyle: 'italic',
                fontSize: 'clamp(1.25rem, 2.1vw, 1.75rem)', lineHeight: 1.35,
              }}>
                Ideas, guías y puntos de vista para convertir conocimiento técnico en autoridad de mercado.
              </p>
              <div className="flex flex-wrap gap-3">
                {CATEGORIAS.map(c => (
                  <Link key={c.slug} href={`/jerga/categoria/${c.slug}`}
                    className="label px-4 py-2 hover:opacity-60 transition-opacity"
                    style={{ border: '1px solid rgba(0,0,0,0.25)', borderRadius: '2px' }}>
                    {c.nombre}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Destacada ── */}
      {featured && (
        <section style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}>
          <div className="max-container page-px">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
              <div style={{ aspectRatio: '4/3', backgroundColor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="label" style={{ opacity: 0.2 }}>Imagen destacada</span>
              </div>
              <div className="flex flex-col justify-center gap-6 py-12 md:pl-16">
                <p className="label" style={{ opacity: 0.4 }}>Destacado · {categoria(featured.categoria)?.nombre}</p>
                <Link href={`/jerga/${featured.slug}`}>
                  <h2 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 400,
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em',
                  }} className="hover:opacity-60 transition-opacity">{featured.titulo}</h2>
                </Link>
                <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.6, opacity: 0.65 }}>{featured.bajada}</p>
                <div className="flex gap-6 label" style={{ opacity: 0.4 }}>
                  <span>{featured.autor}</span>
                  <span>{featured.lectura} min</span>
                </div>
                <Link href={`/jerga/${featured.slug}`}
                  className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-70 transition-opacity"
                  style={{ backgroundColor: '#ffffff', color: NEGRO, borderRadius: '2px' }}>
                  {CTA_TIPO[featured.tipo]}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Guías ── */}
      {guias.length > 0 && (
        <section className="page-px section-py" style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}>
          <div className="max-container flex flex-col gap-12">
            <div className="flex flex-col gap-3">
              <h2 className="text-display">Guías</h2>
              <p className="text-sm" style={{ opacity: 0.55, maxWidth: '520px' }}>
                Documentos largos para leer completos. Pensados para llevar a una conversación de comité.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,0,0,0.12)' }}>
              {guias.map(g => (
                <Link key={g.slug} href={`/jerga/${g.slug}`}
                  className="group flex flex-col gap-6 p-10"
                  style={{ backgroundColor: 'var(--section-body-bg)' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    lineHeight: 1, opacity: 0.18,
                  }}>{String(g.orden ?? 0).padStart(2, '0')}</span>
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="label" style={{ opacity: 0.4 }}>{categoria(g.categoria)?.nombre}</p>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 400,
                      fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.15,
                    }} className="group-hover:opacity-60 transition-opacity">{g.titulo}</h3>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>{g.bajada}</p>
                  </div>
                  <span className="label" style={{ opacity: 0.35 }}>{g.lectura} min · Leer guía →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recientes ── */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-display">Lo último</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recientes.map(p => (
              <Link key={p.slug} href={`/jerga/${p.slug}`} className="group flex flex-col gap-4">
                <div style={{ aspectRatio: '3/2', backgroundColor: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="label" style={{ opacity: 0.2 }}>Imagen</span>
                </div>
                <div className="flex items-center gap-4 label" style={{ opacity: 0.4 }}>
                  <span>{ETIQUETA_TIPO[p.tipo]}</span>
                  <span>{categoria(p.categoria)?.nombre}</span>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 400,
                  fontSize: 'clamp(1.25rem, 1.9vw, 1.625rem)', lineHeight: 1.15,
                }} className="group-hover:opacity-60 transition-opacity">{p.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>{p.bajada}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explorar por categoría ── */}
      <section className="page-px section-py" style={{ backgroundColor: CHARTREUSE, color: NEGRO }}>
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-display">Explorar por categoría</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.15)' }}>
            {conteos.map(({ categoria: c, total }) => (
              <Link key={c.slug} href={`/jerga/categoria/${c.slug}`}
                className="group flex flex-col gap-3 p-10"
                style={{ backgroundColor: CHARTREUSE }}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 400,
                    fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)', lineHeight: 1.1,
                  }} className="group-hover:opacity-60 transition-opacity">{c.nombre}</h3>
                  <span className="label shrink-0" style={{ opacity: 0.45 }}>{total}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.65, maxWidth: '420px' }}>{c.descripcion}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Archivo completo ── */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}>
        <div className="max-container flex flex-col gap-12">
          <div className="flex items-baseline gap-6">
            <h2 className="text-display">Todo</h2>
            <span className="label" style={{ opacity: 0.4 }}>{todasLasPiezas.length} publicaciones</span>
          </div>
          <div className="flex flex-col">
            {todasLasPiezas.map(p => (
              <Link key={p.slug} href={`/jerga/${p.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-7"
                style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="md:col-span-2 label flex items-center" style={{ opacity: 0.35 }}>
                  {fechaLegible(p.fecha).replace(' de ' + p.fecha.slice(0, 4), '')}
                </div>
                <div className="md:col-span-2 label flex items-center" style={{ opacity: 0.35 }}>
                  {categoria(p.categoria)?.nombre}
                </div>
                <div className="md:col-span-7 flex items-center">
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 400,
                    fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)', lineHeight: 1.2,
                  }} className="group-hover:opacity-60 transition-opacity">{p.titulo}</h3>
                </div>
                <div className="md:col-span-1 label flex items-center justify-end" style={{ opacity: 0.3 }}>
                  {p.lectura}′
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
