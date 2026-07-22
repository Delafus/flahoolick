import Link from 'next/link'
import { ContactForm } from './contact-form'

interface PageLayoutProps {
  headline: string
  tagline?: string
  description?: string
  heroBg: string
  heroText: string
  ctaHref?: string
  children: React.ReactNode
}

export function PageLayout({
  headline,
  tagline,
  description,
  heroBg,
  heroText,
  children,
}: PageLayoutProps) {
  const isLight = heroText === '#000000' || heroText === 'black'
  const divColor = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'

  return (
    <>
      {/* ── HERO — estructura exacta de NOBL ── */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: heroBg, color: heroText }}
      >
        <div className="max-container w-full">

          {/* MOBILE — stack */}
          <div className="flex flex-col gap-6 md:hidden">
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 10vw, 11rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: heroText,
              wordBreak: 'break-word',
            }}>
              {headline}
            </h1>
            {tagline && (
              <>
                <p className="label" style={{ color: heroText, opacity: 0.6 }}>{tagline}</p>
                <hr style={{ borderColor: heroText, borderTopWidth: '1px', opacity: 0.2 }} />
              </>
            )}
            {description && (
              <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.7, color: heroText, fontWeight: 300 }}>
                {description}
              </p>
            )}
          </div>

          {/* DESKTOP — split: ilustración | divisor | texto */}
          <div className="hidden md:grid items-end"
            style={{ gridTemplateColumns: '5fr 1px 6fr', gap: 0 }}>

            {/* Ilustración */}
            <div style={{
              aspectRatio: '4/3',
              border: `1px solid ${divColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '3rem',
            }}>
              <span className="label" style={{ color: heroText, opacity: 0.2 }}>Ilustración</span>
            </div>

            {/* Divisor */}
            <div style={{ backgroundColor: divColor, height: '100%', width: '1px' }} />

            {/* Texto — igual a NOBL: H1 masivo → label → HR → descripción */}
            <div className="flex flex-col gap-6" style={{ paddingLeft: '3rem' }}>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(3.5rem, 8vw, 11rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.025em',
                color: heroText,
              }}>
                {headline}
              </h1>
              {tagline && (
                <p className="label" style={{ color: heroText, opacity: 0.6 }}>{tagline}</p>
              )}
              <hr style={{ borderColor: heroText, borderTopWidth: '1px', opacity: 0.2 }} />
              {description && (
                <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.3rem)', lineHeight: 1.65, opacity: 0.7, color: heroText, fontWeight: 300, maxWidth: '420px' }}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}>
        {children}
      </div>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}

/* Secciones reutilizables */
export function BodySection({ title, children, dark = false }: {
  title?: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <section className="page-px section-py"
      style={{
        backgroundColor: dark ? 'var(--section-dark-bg)' : 'var(--section-body-bg)',
        color: dark ? 'var(--section-dark-text)' : 'var(--section-body-text)',
      }}>
      <div className="max-container flex flex-col gap-12">
        {title && <p className="label opacity-40">{title}</p>}
        {children}
      </div>
    </section>
  )
}

export function HowList({ items }: { items: { titulo: string; desc: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10"
          style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          <p className="label opacity-25 md:col-span-1">{String(i + 1).padStart(2, '0')}</p>
          <div className="md:col-span-11 flex flex-col md:flex-row gap-6">
            <h3 className="text-base font-semibold md:w-72 shrink-0">{item.titulo}</h3>
            <p className="text-sm leading-relaxed opacity-60">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function Tags({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(t => (
        <span key={t} className="text-sm px-4 py-2"
          style={{ border: dark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)', opacity: 0.8 }}>
          {t}
        </span>
      ))}
    </div>
  )
}

export function CrossLinks({ links }: { links: { title: string; desc: string; href: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
      style={{ background: 'rgba(0,0,0,0.1)' }}>
      {links.map(l => (
        <Link key={l.href} href={l.href}
          className="flex flex-col gap-3 p-8 group hover:opacity-80 transition-opacity"
          style={{ backgroundColor: 'var(--section-body-bg)' }}>
          <h3 className="text-base font-semibold">{l.title}</h3>
          <p className="text-sm leading-relaxed opacity-55">{l.desc}</p>
          <span className="label opacity-35 group-hover:opacity-70 transition-opacity mt-2">Explorar →</span>
        </Link>
      ))}
    </div>
  )
}
