import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  const links = {
    quehacemos: [
      { label: 'Servicios',    href: '/servicios' },
      { label: 'Metodología',  href: '/metodologia' },
    ],
    empresa: [
      { label: 'Sobre Flahoolick', href: '/sobre-flahoolick' },
      { label: 'JERGA',            href: '/jerga' },
      { label: 'FAQ',              href: '/faq' },
      { label: 'Contacto',         href: '/#contacto' },
      { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
    ],
  }

  return (
    <footer className="page-px py-16"
      style={{ backgroundColor: '#403D37', color: 'var(--brand-chalk)' }}>
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Logo horizontal */}
          <div className="flex flex-col gap-4 items-start">
            <div style={{ display: 'block', lineHeight: 0 }}>
              <Image
                src="/logo-flahoolick-hrztl.svg"
                alt="Flahoolick"
                width={200}
                height={56}
                style={{ filter: 'brightness(0) invert(1)', height: '36px', width: 'auto', display: 'block' }}
              />
            </div>
            <p className="text-sm opacity-40 leading-relaxed">
              Tu partner moderno en contenido B2B.<br />Convertimos lo que sabes en autoridad de mercado.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="label opacity-30 mb-1" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700 }}>Qué hacemos</p>
            {links.quehacemos.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm opacity-50 hover:opacity-100 transition-opacity">{l.label}</Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="label opacity-30 mb-1" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700 }}>Empresa</p>
            {links.empresa.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm opacity-50 hover:opacity-100 transition-opacity">{l.label}</Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-sm opacity-25">© 2026 Flahoolick. Todos los derechos reservados.</p>
          <Link href="https://linkedin.com/company/flahoolick" target="_blank" rel="noopener noreferrer"
            className="label opacity-30 hover:opacity-70 transition-opacity">LinkedIn →</Link>
        </div>
      </div>
    </footer>
  )
}
