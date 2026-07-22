'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePageColor } from '@/context/page-color'

const CAP_MENU = {
  tagline: 'Convertimos lo que tu empresa sabe en autoridad que el mercado reconoce.',
  ctaLabel: 'Explorar Capacidades', ctaHref: '/capacidades',
  items: [
    { title: 'Estrategia y Relato',   desc: 'Definimos quién eres para el mercado que importa antes de producir una sola pieza.',    href: '/capacidades/estrategia-y-relato' },
    { title: 'Sistema de Contenido', desc: 'Instalamos el flujo continuo que mantiene tu conocimiento en circulación mes a mes.',   href: '/capacidades/sistema-de-contenido' },
    { title: 'Estudio Creativo',      desc: 'Producimos los activos que construyen presencia y habilitan el cierre comercial.',       href: '/capacidades/estudio-creativo' },
  ],
}

const MET_MENU = {
  tagline: 'Del conocimiento disperso a un sistema que aprende.',
  ctaLabel: 'Explorar Metodología', ctaHref: '/metodologia',
  items: [
    { title: 'Cómo funciona el sistema', desc: 'Cuatro capas que convierten conocimiento disperso en presencia continua.',                          href: '/metodologia/como-funciona-el-sistema' },
    { title: 'Cómo trabajamos con IA',   desc: 'IA para capturar y modelar conocimiento a escala. El criterio lo define siempre el equipo senior.', href: '/metodologia/como-trabajamos-con-ia' },
    { title: 'Cómo aprendemos',          desc: 'Cada ciclo alimenta al siguiente. El sistema mejora con cada señal del mercado.',                    href: '/metodologia/como-aprendemos' },
  ],
}

type ActiveMenu = 'cap' | 'met' | null

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

  const isLight = text === '#000000' || text === 'black'
  const divColor = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'
  const logoFilter = isLight ? 'brightness(0)' : 'brightness(0) invert(1)'

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
          <Link href="/capacidades"
            className="label hover:opacity-60 transition-opacity"
            style={{ color: text, textDecoration: active === 'cap' ? 'underline' : 'none', textUnderlineOffset: '4px' }}
            onMouseEnter={() => setActive('cap')}
            onClick={() => setActive(null)}>
            Capacidades
          </Link>
          <Link href="/metodologia"
            className="label hover:opacity-60 transition-opacity"
            style={{ color: text, textDecoration: active === 'met' ? 'underline' : 'none', textUnderlineOffset: '4px' }}
            onMouseEnter={() => setActive('met')}
            onClick={() => setActive(null)}>
            Metodología
          </Link>
          <NavLink href="/sobre-flahoolick" color={text} onClick={() => setActive(null)}>
            Sobre Flahoolick
          </NavLink>
        </nav>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2"
          onClick={() => { setActive(null); setMobile(false) }}>
          <img
            src="/logo-flahoolick-hrztl.svg"
            alt="Flahoolick"
            style={{ filter: logoFilter, height: '28px', width: 'auto', maxWidth: '160px', display: 'block' }}
          />
        </Link>

        {/* Right nav */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink href="/jerga" color={text} onClick={() => setActive(null)}>JERGA</NavLink>
          <NavLink href="/sensor" color={text} onClick={() => setActive(null)}>SENSOR</NavLink>
          <NavLink href="/deck"   color={text} onClick={() => setActive(null)}>DECK</NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden label" style={{ color: text }}
          onClick={() => { setMobile(p => !p); setActive(null) }}
          aria-label="Menú">
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mega menu desktop */}
      <div
        className="hidden md:block w-full overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: active ? '520px' : '0px',
          opacity: active ? 1 : 0,
          backgroundColor: bg,
          borderTop: active ? `1px solid ${divColor}` : 'none',
        }}
      >
        {active === 'cap' && <MegaMenu menu={CAP_MENU} textColor={text} divColor={divColor} onClose={() => setActive(null)} />}
        {active === 'met' && <MegaMenu menu={MET_MENU} textColor={text} divColor={divColor} onClose={() => setActive(null)} />}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden page-px py-8 flex flex-col gap-8"
          style={{ backgroundColor: bg, color: text, borderTop: `1px solid ${divColor}` }}>
          {[CAP_MENU, MET_MENU].map(menu => (
            <div key={menu.ctaHref} className="flex flex-col gap-4">
              <Link href={menu.ctaHref} className="label opacity-50" style={{ color: text }}
                onClick={() => setMobile(false)}>{menu.ctaLabel}</Link>
              {menu.items.map(item => (
                <Link key={item.href} href={item.href}
                  className="text-sm font-medium hover:opacity-60 transition-opacity"
                  style={{ color: text }} onClick={() => setMobile(false)}>{item.title}</Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-3 pt-4" style={{ borderTop: `1px solid ${divColor}` }}>
            {[
              { label: 'Sobre Flahoolick', href: '/sobre-flahoolick' },
              { label: 'SENSOR', href: '/sensor' },
              { label: 'DECK',   href: '/deck' },
              { label: 'FAQ',    href: '/faq' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium hover:opacity-60"
                style={{ color: text }} onClick={() => setMobile(false)}>{l.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function MegaMenu({ menu, textColor, divColor, onClose }: {
  menu: typeof CAP_MENU; textColor: string; divColor: string; onClose: () => void
}) {
  return (
    <div className="page-px py-12 max-container w-full mx-auto grid grid-cols-12 gap-8">
      <div className="col-span-4 flex flex-col justify-between gap-12">
        <p className="text-2xl font-light leading-snug" style={{ color: textColor }}>{menu.tagline}</p>
        <Link href={menu.ctaHref} onClick={onClose}
          className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
          style={{ color: textColor, borderColor: textColor }}>
          {menu.ctaLabel} →
        </Link>
      </div>
      <div className="col-span-1 flex justify-center">
        <div className="w-px h-full" style={{ backgroundColor: divColor }} />
      </div>
      <div className="col-span-7 grid grid-cols-3 gap-8">
        {menu.items.map(item => (
          <Link key={item.href} href={item.href} onClick={onClose} className="group flex flex-col gap-3">
            <h3 className="label font-bold group-hover:opacity-60 transition-opacity" style={{ color: textColor }}>
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed opacity-60" style={{ color: textColor }}>{item.desc}</p>
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
