import Link from 'next/link'
import { JERGA_VISIBLE } from './jerga-visible'

const LINKS = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Metodología', href: '/metodologia' },
  { label: 'Caso Dunamis', href: '/casos/dunamis' },
  { label: 'Sobre Flahoolick', href: '/sobre-flahoolick' },
  ...(JERGA_VISIBLE ? [{ label: 'JERGA', href: '/jerga' }] : []),
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '/#contacto' },
  { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/flahoolick' },
]

export function Footer() {
  return (
    <footer className="page-px py-16" style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'var(--font-inter)' }}>
      <div className="mx-auto flex flex-col gap-6 text-sm" style={{ maxWidth: '40rem' }}>
        <p>
          Estudio de estrategia y contenido para empresas B2B con ciclos de decisión complejos.
          <br />
          Conectamos negocio, posicionamiento, contenido y ventas.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="hover:opacity-50 transition-opacity">{l.label}</Link>
          ))}
        </nav>
        <p style={{ opacity: 0.5 }}>© 2026 Flahoolick. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
