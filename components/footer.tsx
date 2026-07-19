import Link from 'next/link'

export function Footer() {
  const links = {
    servicios: [
      { label: 'Capacidades',  href: '/capacidades' },
      { label: 'Metodología',  href: '/metodologia' },
      { label: 'SENSOR',       href: '/sensor' },
      { label: 'DECK',         href: '/deck' },
    ],
    empresa: [
      { label: 'Sobre Flahoolick', href: '/sobre-flahoolick' },
      { label: 'FAQ',              href: '/faq' },
      { label: 'Contacto',         href: '/#contacto' },
    ],
  }

  return (
    <footer
      className="page-px py-16"
      style={{ backgroundColor: 'var(--brand-ink)', color: 'var(--brand-chalk)' }}
    >
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <svg width="18" height="21" viewBox="0 0 28 32" fill="none">
                <path d="M14 0L0 5.33333V16C0 24 6 30.6667 14 32C22 30.6667 28 24 28 16V5.33333L14 0Z"
                  fill="white" />
              </svg>
              <span className="label tracking-widest">FLAHOOLICK</span>
            </div>
            <p className="text-sm opacity-40 leading-relaxed">
              Consultora de estrategia y contenido B2B.<br />Santiago, Chile.
            </p>
          </div>

          {/* Servicios */}
          <div className="flex flex-col gap-3">
            <p className="label opacity-30 mb-1">Servicios</p>
            {links.servicios.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm opacity-50 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Empresa */}
          <div className="flex flex-col gap-3">
            <p className="label opacity-30 mb-1">Empresa</p>
            {links.empresa.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm opacity-50 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-sm opacity-25">© 2026 Flahoolick. Todos los derechos reservados.</p>
          <Link
            href="https://linkedin.com/company/flahoolick"
            target="_blank"
            rel="noopener noreferrer"
            className="label opacity-30 hover:opacity-70 transition-opacity"
          >
            LinkedIn →
          </Link>
        </div>
      </div>
    </footer>
  )
}
