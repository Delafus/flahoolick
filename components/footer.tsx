'use client'

import Link from 'next/link'
import { JERGA_VISIBLE } from './jerga-visible'
import { CABECERAS } from './minimal'
import { ShieldWheel } from './shield-wheel'
import { usePageColor } from '@/context/page-color'

/** Footer en amarillo con todo en azul noche: logo y claim grande (Bricolage + Instrument Serif);
    debajo, enlaces en fila y una línea final. */

/** Firma de Flahoolick: amarillo limón con todo en azul noche (antes celeste; antes menta con negro). */
const FONDO_FIRMA = CABECERAS.amarillo.fondo
const TEXTO_FIRMA = CABECERAS.amarillo.texto
const TENUE_FIRMA = 'rgba(28, 24, 84, 0.6)'
const FILTRO_LOGO_FIRMA = 'brightness(0) saturate(100%) invert(23%) sepia(48%) saturate(6255%) hue-rotate(242deg) brightness(32%) contrast(98%)'
const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono), ui-monospace, monospace',
  fontSize: '13px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}

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

/** PRUEBA (2026-11-19): en la página de prueba de color (header rojo #F00000) el footer va en rojo con todo en blanco. */
const ROJO_PRUEBA = '#f00000'

export function Footer() {
  const { bg } = usePageColor()
  const rojo = bg.toLowerCase() === ROJO_PRUEBA
  const FONDO = rojo ? '#F00000' : FONDO_FIRMA
  const TEXTO = rojo ? '#FFFFFF' : TEXTO_FIRMA
  const TENUE = rojo ? 'rgba(255, 255, 255, 0.7)' : TENUE_FIRMA
  const filtroLogo = rojo ? 'brightness(0) invert(1)' : FILTRO_LOGO_FIRMA
  return (
    <footer className="page-px pt-16 pb-10 md:pt-20" style={{ backgroundColor: FONDO, color: TEXTO, fontFamily: 'var(--font-inter)' }}>
      <div className="mx-auto flex flex-col gap-14" style={{ maxWidth: '81rem' }}>
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
          {/* Logo y claim */}
          <div className="flex flex-col gap-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-flahoolick-hrztl.svg" alt="Flahoolick" style={{ height: '30px', width: 'auto', alignSelf: 'flex-start', filter: filtroLogo }} />
            <p style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.85rem)', lineHeight: 0.95, letterSpacing: '-0.03em', maxWidth: '12ch' }}>
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800 }}>Convertimos lo que sabes </span>
              <em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400 }}>en autoridad de mercado.</em>
            </p>
          </div>
          {/* Columna derecha: el sello girando (en el teléfono no va, para que el footer no crezca). */}
          <ShieldWheel color={TEXTO} className="hidden w-[16rem] md:block lg:w-[24rem]" />
        </div>

        <div className="flex flex-col gap-6">
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
