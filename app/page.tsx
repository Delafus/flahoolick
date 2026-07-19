'use client'

import { useRef, useState, useEffect } from 'react'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import Link from 'next/link'

/* ──────────────────────────────────────────────
   DATA
────────────────────────────────────────────── */
const SCROLLS = [
  {
    label: '01',
    h1: 'Tu empresa sabe demasiado para comunicar como cualquiera.',
    sub: 'Gran parte de ese conocimiento nunca llega al mercado.',
  },
  {
    label: '02',
    h1: 'El 95% de tu mercado no está buscando nada hoy.',
    sub: 'Cuando decida comprar, recordará a quien estuvo presente.',
  },
  {
    label: '03',
    h1: 'Tu ventaja competitiva ya existe.',
    sub: 'El sistema que la pone en circulación, todavía no.',
  },
]

const LAYERS = [
  { name: 'Signal Capture',    desc: 'Capturamos las señales que viven en tu operación técnica y comercial.' },
  { name: 'Knowledge Modeling', desc: 'Convertimos conocimiento disperso en estructura de autoridad.' },
  { name: 'Authority Output',  desc: 'Producimos los activos que construyen presencia antes de la decisión de compra.' },
  { name: 'Feedback Loop',     desc: 'Calibramos el sistema con cada ciclo y cada señal del mercado.' },
]

const INDUSTRIES = [
  'Tecnología B2B',
  'Servicios financieros especializados',
  'Ingeniería y servicios industriales',
  'Salud corporativa',
  'Educación ejecutiva',
  'Infraestructura y concesiones',
]

/* ──────────────────────────────────────────────
   HOME PAGE
────────────────────────────────────────────── */
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [section, setSection] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const sections = el.querySelectorAll('[data-idx]')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setSection(parseInt(e.target.getAttribute('data-idx') || '0'))
      }),
      { root: el, threshold: 0.55 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <PageColorSetter bg="var(--page-home-bg)" text="var(--page-home-text)" />

      {/* ── SCROLL CONTAINER ── */}
      <div ref={containerRef} className="snap-y-mandatory">

        {/* Scroll sections 1-3 */}
        {SCROLLS.map((s, i) => (
          <section
            key={i}
            data-idx={i}
            className="snap-start relative flex flex-col items-center justify-center page-px"
            style={{ backgroundColor: 'var(--brand-ink)', color: 'var(--brand-chalk)' }}
          >
            {/* Counter top-left */}
            <span className="label absolute top-20 left-[var(--page-px)] opacity-30">
              {s.label} / 03
            </span>

            {/* Main text — centered, NOBL-style */}
            <div className="max-container w-full text-center flex flex-col gap-6">
              <h1 className="text-hero" style={{ color: 'var(--brand-chalk)' }}>
                {s.h1}
              </h1>
              <p className="text-xl md:text-2xl font-light opacity-50 max-w-2xl mx-auto leading-relaxed">
                {s.sub}
              </p>
            </div>

            {/* Scroll pulse */}
            {i < 2 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <div className="w-px h-10 opacity-20" style={{ background: 'var(--brand-chalk)', animation: 'pulse 2s infinite' }} />
              </div>
            )}
          </section>
        ))}

        {/* ── REVEAL — Somos Flahoolick ── */}
        <section
          data-idx={3}
          className="snap-start flex flex-col items-center justify-center page-px text-center"
          style={{ backgroundColor: 'var(--brand-signal)', color: 'var(--brand-ink)' }}
        >
          <div className="max-container w-full flex flex-col items-center gap-10">
            <h2 className="text-hero" style={{ color: 'var(--brand-ink)' }}>
              Somos Flahoolick.
            </h2>
            <p className="text-xl md:text-2xl font-light opacity-70 max-w-2xl leading-relaxed">
              Instalamos el Sistema de Autoridad de Mercado para empresas B2B con ciclos de decisión complejos.
            </p>
            <Link
              href="/#contacto"
              className="label inline-flex items-center gap-2 border px-8 py-4 hover:opacity-60 transition-opacity"
              style={{ color: 'var(--brand-ink)', borderColor: 'var(--brand-ink)' }}
            >
              Activar el sistema →
            </Link>
          </div>
        </section>

        {/* ── CREDENCIAL + INDUSTRIAS ── */}
        <section
          data-idx={4}
          className="snap-start flex flex-col justify-center page-px"
          style={{ backgroundColor: 'var(--brand-ink)', color: 'var(--brand-chalk)' }}
        >
          <div className="max-container w-full flex flex-col gap-20">
            {/* Credencial */}
            <div className="flex flex-col gap-5 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="label opacity-40">Marcas que nos formaron</p>
              <p className="text-xl md:text-2xl font-light opacity-60 max-w-2xl leading-relaxed">
                Nuestro equipo acumula más de 25 años de experiencia en grupos publicitarios y medios de comunicación globales. Ese oficio lo ejecutamos hoy en sistemas de contenido para empresas B2B complejas.
              </p>
            </div>

            {/* Industrias */}
            <div className="flex flex-col gap-5"
              style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="label opacity-40">Industrias a las que servimos</p>
              <p className="text-lg font-light opacity-50 leading-relaxed">
                {INDUSTRIES.join(' · ')}
              </p>
            </div>
          </div>
        </section>

        {/* ── EL SISTEMA — 4 capas ── */}
        <section
          className="page-px section-py"
          style={{ backgroundColor: 'var(--brand-ink)', color: 'var(--brand-chalk)', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          <div className="max-container w-full flex flex-col gap-16">
            <div className="flex flex-col gap-3">
              <p className="label opacity-40">El sistema</p>
              <h2 className="text-headline font-light" style={{ color: 'var(--brand-chalk)' }}>
                Cuatro capas. Un sistema continuo.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {LAYERS.map((layer, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 py-8 pr-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <p className="label opacity-25">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-base font-medium">{layer.name}</h3>
                  <p className="text-sm leading-relaxed opacity-50">{layer.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '2rem' }}>
              <Link href="/#contacto" className="label opacity-50 hover:opacity-100 transition-opacity">
                Activar el sistema →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONTACTO ── */}
        <div className="snap-start" style={{ minHeight: '100vh' }}>
          <ContactForm
            bg="var(--brand-depth)"
            text="var(--brand-chalk)"
          />
        </div>
      </div>
    </>
  )
}
