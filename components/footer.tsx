import Link from 'next/link'
import { DISCIPLINAS } from './servicios-datos'
import { JERGA_VISIBLE } from './jerga-visible'

const FONDO = '#1C1C1C'
const TEXTO = '#ffffff'
const ENLACE = 'hover:opacity-50 transition-opacity'

const COLUMNAS: { titulo: string; enlaces: { label: string; href: string; externo?: boolean }[] }[] = [
  {
    titulo: 'Servicios',
    enlaces: DISCIPLINAS.map(d => ({ label: d.nombre, href: d.href })),
  },
  {
    titulo: 'Estudio',
    enlaces: [
      { label: 'Metodología', href: '/metodologia' },
      { label: 'Caso Dunamis', href: '/casos/dunamis' },
      { label: 'Sobre Flahoolick', href: '/sobre-flahoolick' },
      ...(JERGA_VISIBLE ? [{ label: 'JERGA', href: '/jerga' }] : []),
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    titulo: 'Contacto',
    enlaces: [
      { label: 'Agenda una llamada', href: '/#contacto' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/flahoolick', externo: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="page-px pt-24 pb-10 md:pt-32" style={{ backgroundColor: FONDO, color: TEXTO, fontFamily: 'var(--font-inter)' }}>
      <div className="mx-auto flex flex-col gap-20 md:gap-28" style={{ maxWidth: '72rem' }}>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-8" style={{ maxWidth: '34rem' }}>
            <p className="text-[1.75rem] md:text-[2.5rem]" style={{ fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
              Convertimos lo que tu empresa sabe en contenido y herramientas que venden.
            </p>
            <p>
              <Link href="/#contacto" className={`underline underline-offset-4 decoration-1 ${ENLACE}`}>
                Agenda una llamada de 30 minutos →
              </Link>
            </p>
          </div>
          <nav className="grid grid-cols-2 items-start gap-x-8 gap-y-12 text-base sm:grid-cols-3" aria-label="Pie de página">
            {COLUMNAS.map(c => (
              <div key={c.titulo} className="flex flex-col gap-3">
                <p style={{ opacity: 0.5 }}>{c.titulo}</p>
                {c.enlaces.map(l => (
                  <Link key={l.href} href={l.href} className={ENLACE}
                    {...(l.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-8">
          <div role="img" aria-label="Flahoolick" style={{
            width: '100%', aspectRatio: '744 / 184', backgroundColor: TEXTO,
            WebkitMask: 'url(/logo-flahoolick-hrztl.svg) center / contain no-repeat',
            mask: 'url(/logo-flahoolick-hrztl.svg) center / contain no-repeat',
          }} />
          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ opacity: 0.5 }}>
            <p>Estudio de estrategia y contenido para empresas B2B. Santiago, Chile.</p>
            <p className="flex gap-6">
              <Link href="/politica-de-privacidad" className={ENLACE}>Política de Privacidad</Link>
              <span>© 2026 Flahoolick</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
