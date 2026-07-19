import Link from 'next/link'
import { ContactForm } from './contact-form'

interface InternalPageLayoutProps {
  // Hero
  eyebrow?: string
  headline: string
  description?: string
  heroBg: string
  heroText: string
  // CTA del hero
  ctaHref?: string
  ctaLabel?: string
  // Contenido
  children: React.ReactNode
  // Mostrar contacto al final
  showContact?: boolean
}

export function InternalPageLayout({
  eyebrow,
  headline,
  description,
  heroBg,
  heroText,
  ctaHref = '/#contacto',
  ctaLabel = 'Activar el sistema →',
  children,
  showContact = true,
}: InternalPageLayoutProps) {
  const borderColor = heroText === '#ffffff'
    ? 'rgba(255,255,255,0.2)'
    : 'rgba(0,0,0,0.2)'

  return (
    <div>
      {/* Hero — full screen height, color heredado de página */}
      <section
        className="min-h-screen flex flex-col justify-end px-6 md:px-10 pb-16 pt-32"
        style={{ backgroundColor: heroBg, color: heroText }}
      >
        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          {/* Imagen / placeholder */}
          <div
            className="hidden md:block aspect-square max-h-96 w-full rounded-sm"
            style={{
              backgroundColor: heroText === '#ffffff'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.06)',
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="h-full flex items-center justify-center">
              <p className="text-label" style={{ color: heroText, opacity: 0.3 }}>
                Ilustración
              </p>
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-8">
            {eyebrow && (
              <p className="text-label" style={{ color: heroText, opacity: 0.5 }}>
                {eyebrow}
              </p>
            )}
            <h1
              className="font-display text-display-lg leading-none"
              style={{ color: heroText }}
            >
              {headline}
            </h1>
            {description && (
              <p
                className="text-lg font-light leading-relaxed max-w-md"
                style={{ color: heroText, opacity: 0.7 }}
              >
                {description}
              </p>
            )}
            {ctaHref && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 text-label border px-6 py-3 w-fit hover:opacity-70 transition-opacity"
                style={{ borderColor: heroText, color: heroText }}
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Cuerpo — siempre en crema */}
      <div className="bg-crema text-negro">
        {children}
      </div>

      {/* Contacto */}
      {showContact && <ContactForm bg="#3B0B2C" text="#ffffff" />}
    </div>
  )
}
