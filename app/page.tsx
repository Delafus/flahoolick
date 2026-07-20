'use client'

import { useRef } from 'react'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import { Marquee } from '@/components/marquee'
import Image from 'next/image'
import Link from 'next/link'

const SCROLLS = [
  {
    h1: 'Tu empresa sabe demasiado para comunicar como cualquiera.',
    sub: 'Gran parte de ese conocimiento nunca llega al mercado.',
  },
  {
    h1: 'El 95% de tu mercado no está buscando nada hoy.',
    sub: 'Cuando decida comprar, recordará a quien estuvo presente.',
  },
  {
    h1: 'Tu ventaja competitiva ya existe.',
    sub: 'El sistema que la pone en circulación, todavía no.',
  },
]

const LAYERS = [
  { name: 'Signal Capture',     desc: 'Capturamos las señales que viven en tu operación técnica y comercial.' },
  { name: 'Knowledge Modeling', desc: 'Convertimos conocimiento disperso en estructura de autoridad.' },
  { name: 'Authority Output',   desc: 'Producimos los activos que construyen presencia antes de la decisión de compra.' },
  { name: 'Feedback Loop',      desc: 'Calibramos el sistema con cada ciclo y cada señal del mercado.' },
]

const INDUSTRIES = [
  'Tecnología B2B', 'Servicios financieros especializados',
  'Ingeniería y servicios industriales', 'Salud corporativa',
  'Educación ejecutiva', 'Infraestructura y concesiones',
]

export default function HomePage() {
  return (
    <>
      <PageColorSetter bg="var(--page-home-bg)" text="var(--page-home-text)" />

      {/* Scroll sections — sin snap, scroll normal */}
      {SCROLLS.map((s, i) => (
        <section
          key={i}
          className="flex flex-col items-center justify-center page-px"
          style={{
            minHeight: '100dvh',
            backgroundColor: 'var(--brand-ink)',
            color: 'var(--brand-chalk)',
          }}
        >
          <div className="max-container w-full text-center flex flex-col gap-6">
            <h1 className="text-hero" style={{ color: 'var(--brand-chalk)' }}>
              {s.h1}
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-50 max-w-2xl mx-auto leading-relaxed">
              {s.sub}
            </p>
          </div>
        </section>
      ))}

      {/* MÓDULO SOMOS FLAHOOLICK — todo rosa */}
      <section
        className="flex flex-col items-center text-center"
        style={{ backgroundColor: '#F09DB6', color: '#3B0B2C', paddingBottom: '4rem' }}
      >
        {/* Titular */}
        <div className="max-container w-full page-px pt-20 pb-16">
          <h2 className="text-hero" style={{ color: '#3B0B2C', fontFamily: 'var(--font-display)' }}>
            Somos FLAHOOLICK.<br />
            Convertimos conocimiento técnico en autoridad de mercado.
          </h2>
        </div>

        {/* Divisoria con aire */}
        <div className="w-full" style={{ padding: '0 4rem' }}>
          <hr style={{ borderColor: '#3B0B2C', borderTopWidth: '1px', opacity: 0.3 }} />
        </div>

        {/* Marcas que nos formaron */}
        <div className="w-full pt-10 pb-6">
          <p className="label" style={{ color: '#3B0B2C', opacity: 0.6 }}>Marcas que nos formaron</p>
        </div>

        {/* Marquee ciruela sobre rosa */}
        <div className="w-full overflow-hidden">
          <Marquee color="#3B0B2C" />
        </div>

        {/* Párrafo */}
        <div className="max-container w-full page-px pt-10 pb-10">
          <p className="text-lead max-w-md mx-auto" style={{ color: '#3B0B2C', opacity: 0.75 }}>
            Tenemos más de 25 años de experiencia en grupos publicitarios y medios de comunicación globales que hoy ponemos al servicio de empresas B2B que necesitan ordenar, producir y hacer circular conocimiento complejo.
          </p>
        </div>

        {/* Botón — fondo ciruela, texto rosa */}
        <Link
          href="/sobre-flahoolick"
          className="label px-8 py-4 hover:opacity-80 transition-opacity"
          style={{ backgroundColor: '#3B0B2C', color: '#F09DB6' }}
        >
          APRENDE SOBRE NOSOTROS
        </Link>

        {/* Divisoria con aire */}
        <div className="w-full mt-16" style={{ padding: '0 4rem' }}>
          <hr style={{ borderColor: '#3B0B2C', borderTopWidth: '1px', opacity: 0.3 }} />
        </div>

        {/* Con quién trabajamos */}
        <div className="w-full pt-10 pb-6">
          <p className="label" style={{ color: '#3B0B2C', opacity: 0.6 }}>Con quién trabajamos</p>
        </div>

        {/* Tags industries */}
        <div className="max-container w-full page-px pb-16 flex flex-wrap justify-center gap-2">
          {[
            'Tecnología', 'Servicios financieros', 'Ingeniería industrial',
            'Energía', 'Minería', 'Infraestructura', 'Logística', 'Salud',
            'Educación', 'Activos inmobiliarios', 'Manufactura',
            'Servicios profesionales', 'Sector público'
          ].map(tag => (
            <span
              key={tag}
              className="text-sm px-3 py-1.5"
              style={{ border: '1px solid #3B0B2C', color: '#3B0B2C', opacity: 0.7, borderRadius: '4px' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* El sistema */}
      <section
        className="page-px section-py"
        style={{
          minHeight: '80dvh',
          backgroundColor: 'var(--brand-ink)',
          color: 'var(--brand-chalk)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="max-container w-full flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <p className="label opacity-40">El sistema</p>
            <h2 className="text-headline font-light">Cuatro capas. Un sistema continuo.</h2>
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
              Conversemos →
            </Link>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
