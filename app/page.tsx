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

      {/* Reveal — Somos Flahoolick */}
      <section
        className="flex flex-col items-center justify-center page-px text-center"
        style={{
          minHeight: '100dvh',
          backgroundColor: 'var(--brand-signal)',
          color: 'var(--brand-ink)',
        }}
      >
        <div className="max-container w-full flex flex-col items-center gap-10">
          <Image
            src="/shield-flahoolick.svg"
            alt="Flahoolick"
            width={80}
            height={100}
            style={{ filter: 'brightness(0)' }}
          />
          <h2 className="text-hero" style={{ color: 'var(--brand-ink)' }}>
            Somos Flahoolick.
          </h2>
          <p className="text-lead max-w-2xl opacity-70" style={{ color: 'var(--brand-ink)' }}>
            Instalamos el Sistema de Autoridad de Mercado para empresas B2B con ciclos de decisión complejos.
          </p>
          <Link
            href="/#contacto"
            className="label inline-flex items-center gap-2 border px-8 py-4 hover:opacity-60 transition-opacity"
            style={{ color: 'var(--brand-ink)', borderColor: 'var(--brand-ink)' }}
          >
            Conversemos →
          </Link>
        </div>
      </section>

      {/* Bloque ciruela — Todo empieza dentro */}
      <section
        className="flex flex-col items-center justify-center page-px text-center"
        style={{
          minHeight: '100dvh',
          backgroundColor: 'var(--brand-depth)',
          color: 'var(--brand-chalk)',
        }}
      >
        <div className="max-container w-full flex flex-col items-center gap-10">
          <p className="label opacity-50">Todo empieza dentro</p>
          <h2 className="text-display" style={{ color: 'var(--brand-chalk)' }}>
            El conocimiento ya existe.
            <br />
            Pongámoslo en circulación.
          </h2>
          <p className="text-lead max-w-xl opacity-60">
            Capturamos lo que saben tus equipos y lo convertimos en señales, contenido y herramientas para el mercado.
          </p>
          <Link
            href="/#contacto"
            className="label inline-flex items-center gap-2 border px-8 py-4 hover:opacity-60 transition-opacity"
            style={{ color: 'var(--brand-chalk)', borderColor: 'var(--brand-chalk)' }}
          >
            Conversemos →
          </Link>
          <div className="flex flex-col gap-3 mt-4">
            {['Señales reales', 'Sistema operativo', 'Producción continua'].map(item => (
              <p key={item} className="label opacity-50">✓ {item}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Credencial + Marquee */}
      <section
        className="flex flex-col justify-center"
        style={{
          minHeight: '80dvh',
          backgroundColor: 'var(--brand-ink)',
          color: 'var(--brand-chalk)',
        }}
      >
        <div className="max-container w-full page-px flex flex-col gap-8 py-16">
          <p className="label opacity-40">Marcas que nos formaron</p>
          <p className="text-lead max-w-2xl opacity-60">
            Nuestro equipo acumula más de 25 años de experiencia en grupos publicitarios y medios de comunicación globales. Ese oficio lo ejecutamos hoy en sistemas de contenido para empresas B2B complejas.
          </p>
        </div>
        <Marquee />
        <div
          className="max-container w-full page-px flex flex-col gap-5 py-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="label opacity-40">Industrias a las que servimos</p>
          <p className="text-lg font-light opacity-50 leading-relaxed">
            {INDUSTRIES.join(' · ')}
          </p>
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
