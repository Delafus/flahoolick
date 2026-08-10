'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePageColor } from '@/context/page-color'
import { DISCIPLINAS } from './servicios-datos'
import { MegamenuDots } from './megamenu-dots'

interface MegaMenuItem {
  title: string
  desc: string
  href: string
  /** Enlace visible dentro de la tarjeta. Si se omite, solo se muestra título y descripción. */
  linkLabel?: string
}

interface MegaMenuData {
  tagline: string
  ctaLabel: string
  ctaHref: string
  items: MegaMenuItem[]
}

// Las tarjetas del megamenú salen de la misma fuente que la página
// /servicios, para que nunca queden desincronizadas.
const SRV_MENU: MegaMenuData = {
  tagline: 'Estrategia, marca, producción y sistemas con IA para convertir conocimiento técnico en autoridad de mercado.',
  ctaLabel: 'Explorar servicios', ctaHref: '/servicios',
  items: DISCIPLINAS.map(d => ({
    title: d.nombre,
    desc: d.desc,
    href: d.href,
    linkLabel: 'Explorar →',
  })),
}

const MET_MENU: MegaMenuData = {
  tagline: 'Del conocimiento disperso a un sistema que trabaja — así operamos detrás de los cuatro servicios.',
  ctaLabel: 'Explorar Metodología', ctaHref: '/metodologia',
  items: [
    { title: 'Encontramos',            desc: 'Entramos al negocio y detectamos dónde está el valor.',           href: '/metodologia#paso-encontramos' },
    { title: 'Ordenamos',              desc: 'Convertimos eso en mensajes, temas y prioridades claras.',         href: '/metodologia#paso-ordenamos' },
    { title: 'Ponemos en circulación', desc: 'Construimos la pieza y la conectamos con el mercado.',             href: '/metodologia#paso-circulacion' },
    { title: 'SENSOR',                 desc: 'La materia prima sale de lo que tu empresa ya tiene.',              href: '/metodologia#sensor' },
    { title: 'DECK',                   desc: 'Información compleja convertida en piezas que deciden.',            href: '/metodologia#deck' },
  ],
}

type ActiveMenu = 'srv' | 'met' | null

const PANEL_BG = '#403D37'

const PANEL_MAIN = [
  { label: 'Servicios',   href: '/servicios' },
  { label: 'FrecuenciA',  href: '/frecuencia' },
  { label: 'Metodología', href: '/metodologia' },
  { label: 'JERGA',       href: '/jerga' },
]

const PANEL_SECONDARY = [
  { label: 'Sobre Flahoolick',      href: '/sobre-flahoolick' },
  { label: 'FAQ',                   href: '/faq' },
  { label: 'Contacto',              href: '/#contacto' },
  { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
]

export function Header() {
  const [active, setActive]     = useState<ActiveMenu>(null)
  const [mobileOpen, setMobile] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { bg, text } = usePageColor()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setActive(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setActive(null); setMobile(false) }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isDarkText = text === '#000000' || text === 'black'
  const isBlueText = text.toLowerCase() === '#083ea7'
  const divColor = isDarkText
    ? 'rgba(0,0,0,0.12)'
    : isBlueText
    ? 'rgba(8,62,167,0.2)'
    : 'rgba(255,255,255,0.12)'
  const logoFilter = isDarkText
    ? 'brightness(0)'
    : isBlueText
    // Calibrado con canvas ctx.filter contra el RGB real (8,62,167).
    ? 'brightness(0) saturate(100%) invert(15%) sepia(90%) saturate(3000%) hue-rotate(210deg) brightness(90%)'
    : 'brightness(0) invert(1)'

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: bg }}
      onMouseLeave={() => setActive(null)}
    >
      <div className="flex items-center justify-between page-px" style={{ height: '64px', color: text }}>

        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/servicios"
            className="label hover:opacity-60 transition-opacity"
            style={{ color: text, textDecoration: active === 'srv' ? 'underline' : 'none', textUnderlineOffset: '4px' }}
            onMouseEnter={() => setActive('srv')}
            onClick={() => setActive(null)}>
            Servicios
          </Link>
          <NavLink href="/frecuencia" color={text} onClick={() => setActive(null)}>FrecuenciA</NavLink>
        </nav>

        {/* Logo */}
        <Link href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2"
          onClick={() => { setActive(null); setMobile(false) }}>
          <img
            src="/logo-flahoolick-hrztl.svg"
            alt="Flahoolick"
            style={{ filter: logoFilter, height: '28px', width: 'auto', maxWidth: '160px', display: 'block' }}
          />
        </Link>

        {/* Right nav + CTA + hamburguesa */}
        <div className="flex items-center gap-10">
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/metodologia"
              className="label hover:opacity-60 transition-opacity"
              style={{ color: text, textDecoration: active === 'met' ? 'underline' : 'none', textUnderlineOffset: '4px' }}
              onMouseEnter={() => setActive('met')}
              onClick={() => setActive(null)}>
              Metodología
            </Link>
            <NavLink href="/jerga" color={text} onClick={() => setActive(null)}>JERGA</NavLink>
          </nav>
          <Link href="#contacto"
            className="btn-invert label hidden md:inline-flex items-center px-5 py-2.5"
            style={{ '--btn-bg': text, '--btn-fg': bg, borderRadius: '999px' } as React.CSSProperties}
            onClick={() => setActive(null)}>
            Agenda una llamada
          </Link>
          <button
            onClick={() => { setMobile(true); setActive(null) }}
            aria-label="Abrir menú"
            className="flex items-center hover:opacity-60 transition-opacity"
            style={{ color: text }}>
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden="true">
              <rect x="0" y="0"  width="24" height="1.5" fill="currentColor" />
              <rect x="0" y="6"  width="24" height="1.5" fill="currentColor" />
              <rect x="0" y="12" width="24" height="1.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mega menu desktop */}
      <div
        className="hidden md:block w-full overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: active ? '520px' : '0px',
          opacity: active ? 1 : 0,
          backgroundColor: bg,
          borderTop: active ? `1px solid ${divColor}` : 'none',
          position: 'relative',
        }}
      >
        <MegamenuDots color={text} active={active !== null} />
        {active === 'srv' && <MegaMenu menu={SRV_MENU} textColor={text} divColor={divColor} onClose={() => setActive(null)} />}
        {active === 'met' && <MegaMenu menu={MET_MENU} textColor={text} divColor={divColor} onClose={() => setActive(null)} />}
      </div>

      {/* Panel overlay */}
      <div
        className="fixed inset-0 transition-opacity duration-300"
        onClick={() => setMobile(false)}
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 h-screen w-full md:w-1/2 overflow-y-auto transition-transform duration-300 ease-out"
        style={{
          backgroundColor: PANEL_BG,
          color: '#ffffff',
          // Separa el panel de las páginas de fondo negro, donde si no se funde.
          borderLeft: '1px solid rgba(255,255,255,0.2)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="flex flex-col px-8 md:px-14 py-6">
          {/* Cabecera del panel */}
          <div className="flex items-center justify-between">
            <span className="label" style={{ opacity: 0.6 }}>MENÚ</span>
            <button
              onClick={() => setMobile(false)}
              aria-label="Cerrar menú"
              className="btn-invert label inline-flex items-center gap-3 px-5 py-3"
              style={{ '--btn-bg': '#ffffff', '--btn-fg': '#403D37', borderRadius: '999px' } as React.CSSProperties}>
              CERRAR ✕
            </button>
          </div>

          {/* Destinos principales */}
          <nav className="flex flex-col mt-8">
            {PANEL_MAIN.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobile(false)}
                className="hover:opacity-60 transition-opacity"
                style={{
                  fontFamily: 'var(--font-instrument-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  lineHeight: 1.05,
                  padding: '1.75rem 0',
                  borderTop: '1px solid rgba(255,255,255,0.2)',
                }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Links secundarios */}
          <nav className="flex flex-col gap-4 pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            {PANEL_SECONDARY.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobile(false)}
                className="text-base hover:opacity-60 transition-opacity w-fit">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </header>
  )
}

function MegaMenu({ menu, textColor, divColor, onClose }: {
  menu: MegaMenuData; textColor: string; divColor: string; onClose: () => void
}) {
  return (
    <div className="page-px py-12 max-container w-full mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-4 flex flex-col justify-between gap-12">
        <p className="text-2xl font-light leading-snug" style={{ color: textColor }}>{menu.tagline}</p>
        <Link href={menu.ctaHref} onClick={onClose}
          className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit"
          style={{
            '--btn-bg': textColor,
            '--btn-fg': textColor.toLowerCase() === '#000000'
              ? '#ffffff'
              : textColor.toLowerCase() === '#083ea7'
              ? '#1FDE91'
              : '#000000',
            borderRadius: '999px',
          } as React.CSSProperties}>
          {menu.ctaLabel} →
        </Link>
      </div>
      <div className={`col-span-8 grid gap-8 ${menu.items.length > 3 ? 'grid-cols-2 gap-y-10' : 'grid-cols-3'}`}>
        {menu.items.map(item => (
          <Link key={item.href} href={item.href} onClick={onClose} className="group relative flex flex-col gap-3 pl-8">
            <span
              className="absolute left-0 top-0 bottom-0 w-px transition-opacity duration-200 opacity-100 group-hover:opacity-0"
              style={{ backgroundColor: divColor }}
            />
            <span
              className="absolute left-0 top-0 bottom-0 w-px transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: textColor }}
            />
            <h3 className="label font-bold group-hover:opacity-60 transition-opacity" style={{ color: textColor }}>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed opacity-60" style={{ color: textColor }}>{item.desc}</p>
            {item.linkLabel && (
              <span className="label transition-opacity"
                style={{ color: textColor, fontSize: '0.65rem' }}>
                {item.linkLabel}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

function NavBtn({ label, active, color, onClick, onMouseEnter }: {
  label: string; active: boolean; color: string; onClick: () => void; onMouseEnter: () => void
}) {
  return (
    <button onClick={onClick} onMouseEnter={onMouseEnter}
      className="label hover:opacity-60 transition-opacity"
      style={{ color, textDecoration: active ? 'underline' : 'none', textUnderlineOffset: '4px' }}>
      {label}
    </button>
  )
}

function NavLink({ href, color, onClick, children }: {
  href: string; color: string; onClick: () => void; children: React.ReactNode
}) {
  return (
    <Link href={href} onClick={onClick} className="label hover:opacity-60 transition-opacity"
      style={{ color }}>{children}</Link>
  )
}
