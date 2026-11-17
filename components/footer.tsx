import Link from 'next/link'
import { logos } from './marquee'
import { JERGA_VISIBLE } from './jerga-visible'
import { VERDE } from './minimal'

/** Footer en la línea de superadd.org: fondo de marca profundo; a la izquierda logo y claim grande con una palabra
    destacada; a la derecha marcas con las que trabajamos en grilla; debajo, enlaces en fila y una línea final. */

const FONDO = '#3B0B2C'
const TEXTO = '#ffffff'
const TENUE = 'rgba(255, 255, 255, 0.6)'
const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono), ui-monospace, monospace',
  fontSize: '13px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}

/** Seis marcas para la grilla (las demás siguen en la home). */
const MARCAS = ['Grey', 'McCann', 'BBDO', 'Heineken', 'Adidas', 'P&G']
  .map(alt => logos.find(l => l.alt === alt))
  .filter((l): l is { src: string; alt: string } => Boolean(l))

const ENLACES: { label: string; href: string; externo?: boolean }[] = [
  { label: 'Servicios', href: '/servicios' },
  { label: 'Metodología', href: '/metodologia' },
  { label: 'Historias de clientes', href: '/clientes/dunamis' },
  { label: 'Sobre Flahoolick', href: '/sobre-flahoolick' },
  ...(JERGA_VISIBLE ? [{ label: 'JERGA', href: '/jerga' }] : []),
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '/#contacto' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/flahoolick', externo: true },
  { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
]

export function Footer() {
  return (
    <footer className="page-px pt-16 pb-10 md:pt-20" style={{ backgroundColor: FONDO, color: TEXTO, fontFamily: 'var(--font-inter)' }}>
      <div className="mx-auto flex flex-col gap-14" style={{ maxWidth: '81rem' }}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Logo y claim */}
          <div className="flex flex-col gap-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-flahoolick-hrztl.svg" alt="Flahoolick" style={{ height: '30px', width: 'auto', alignSelf: 'flex-start', filter: 'brightness(0) invert(1)' }} />
            <p style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.85rem)', lineHeight: 0.95, letterSpacing: '-0.03em', maxWidth: '12ch' }}>
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800 }}>Convertimos lo que sabes en </span>
              <em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400, color: VERDE }}>autoridad</em>
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800 }}> de mercado.</span>
            </p>
          </div>

          {/* Marcas */}
          <div className="flex flex-col gap-8">
            <p style={{ ...MONO, color: TENUE }}>Marcas con las que hemos trabajado</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
              {MARCAS.map(m => (
                <li key={m.alt} className="flex items-center" style={{ height: '56px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.alt} style={{ maxHeight: '44px', maxWidth: '130px', width: 'auto', height: 'auto', filter: 'brightness(0) invert(1)' }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.25)' }}>
          <nav aria-label="Pie de página" className="flex flex-wrap gap-x-6 gap-y-2" style={{ fontSize: '15px' }}>
            {ENLACES.map(l => (
              <Link key={l.href} href={l.href} className="underline-offset-4 decoration-1 hover:underline"
                {...(l.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between" style={{ color: TENUE }}>
            <p style={{ fontSize: '14px' }}>© 2026 Flahoolick · Estudio de estrategia y contenido B2B · Santiago, Chile</p>
            <p style={MONO}>flahoolick.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
