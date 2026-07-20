import Link from 'next/link'
import { ContactForm } from './contact-form'

interface PageLayoutProps {
  /* Hero */
  eyebrow?: string
  headline: string
  description?: string
  heroBg: string
  heroText: string
  ctaLabel?: string
  ctaHref?: string
  /* Contenido del cuerpo */
  children: React.ReactNode
}

export function PageLayout({
  eyebrow,
  headline,
  description,
  heroBg,
  heroText,
  ctaLabel = 'Conversemos →',
  ctaHref = '/#contacto',
  children,
}: PageLayoutProps) {
  const divColor = heroText.includes('chalk') || heroText === 'var(--brand-chalk)'
    ? 'rgba(255,255,255,0.15)'
    : 'rgba(0,0,0,0.12)'

  return (
    <>
      {/* ── HERO — NOBL split layout ──
          Izquierda: placeholder ilustración
          Línea divisoria
          Derecha: eyebrow + H1 + description + CTA */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: heroBg, color: heroText }}
      >
        <div className="max-container w-full grid grid-cols-12 gap-8 items-start">
          {/* Illustration placeholder — left 5 cols */}
          <div className="hidden md:flex col-span-5 items-center justify-center"
            style={{
              aspectRatio: '1/1',
              maxHeight: '420px',
              border: `1px solid ${divColor}`,
            }}>
            <span className="label opacity-20" style={{ color: heroText }}>Ilustración</span>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:flex col-span-1 justify-center self-stretch py-4">
            <div className="w-px h-full" style={{ backgroundColor: divColor }} />
          </div>

          {/* Text — right 6 cols */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-8">
            {eyebrow && (
              <p className="label opacity-50" style={{ color: heroText }}>{eyebrow}</p>
            )}
            <h1 className="text-display" style={{ color: heroText }}>{headline}</h1>
            {description && (
              <p className="text-lg font-light leading-relaxed max-w-md opacity-70"
                style={{ color: heroText }}>
                {description}
              </p>
            )}
            <Link
              href={ctaHref}
              className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
              style={{ color: heroText, borderColor: heroText }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ── BODY — siempre sobre crema ── */}
      <div style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}>
        {children}
      </div>

      {/* ── CONTACTO ── */}
      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}

/* ── SECCIÓN REUTILIZABLE dentro del cuerpo ── */
export function BodySection({ title, children, dark = false }: {
  title?: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <section
      className="page-px section-py"
      style={{
        backgroundColor: dark ? 'var(--section-dark-bg)' : 'var(--section-body-bg)',
        color: dark ? 'var(--section-dark-text)' : 'var(--section-body-text)',
      }}
    >
      <div className="max-container flex flex-col gap-12">
        {title && (
          <p className="label opacity-40" style={{ color: dark ? 'var(--brand-chalk)' : 'var(--brand-ink)' }}>
            {title}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

/* ── LISTA DE ITEMS tipo "Cómo lo hacemos" ── */
export function HowList({ items }: { items: { titulo: string; desc: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10"
          style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
        >
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

/* ── TAGS de entregables ── */
export function Tags({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map(t => (
        <span
          key={t}
          className="text-sm px-4 py-2"
          style={{
            border: dark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
            opacity: 0.8,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  )
}

/* ── GRID de cross-links a otras páginas ── */
export function CrossLinks({ links }: { links: { title: string; desc: string; href: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px"
      style={{ background: 'rgba(0,0,0,0.1)' }}>
      {links.map(l => (
        <Link
          key={l.href}
          href={l.href}
          className="flex flex-col gap-3 p-8 group hover:opacity-80 transition-opacity"
          style={{ backgroundColor: 'var(--section-body-bg)' }}
        >
          <h3 className="text-base font-semibold">{l.title}</h3>
          <p className="text-sm leading-relaxed opacity-55">{l.desc}</p>
          <span className="label opacity-35 group-hover:opacity-70 transition-opacity mt-2">
            Explorar →
          </span>
        </Link>
      ))}
    </div>
  )
}
