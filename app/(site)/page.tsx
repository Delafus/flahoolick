import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import { Marquee } from '@/components/marquee'
import Image from 'next/image'
import { ModuloCapacidadesMetodologia } from '@/components/modulo-capacidades-metodologia'
import { ModuloJerga } from '@/components/modulo-jerga'
import Link from 'next/link'

const SCROLLS = [
  {
    h1: 'Tu empresa sabe demasiado para comunicar como cualquiera.',
    sub: 'Gran parte de ese conocimiento queda atrapado.',
    img: '/dots-scroll-01.svg',
    imgSize: { width: 622, height: 622 },
  },
  {
    h1: 'Solo el 5% de tu mercado está listo para comprar hoy.',
    sub: 'El 95% restante está formando opinión.',
    img: '/dots-scroll-02.svg',
    imgSize: { width: 638, height: 638 },
  },
  {
    h1: 'Tu ventaja competitiva ya existe.',
    sub: 'Necesita un sistema que la ponga en circulación.',
    img: '/dots-scroll-03.svg',
    imgSize: { width: 622, height: 622 },
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
      <PageColorSetter bg="#000000" text="#ffffff" />

      {/* Scroll sections — sin snap, scroll normal */}
      {SCROLLS.map((s, i) => (
        <section
          key={i}
          className={`flex flex-col items-center justify-center page-px pt-24 ${i === 0 ? 'md:pt-[220px]' : ''}`}
          style={{
            minHeight: '100dvh',
            paddingBottom: '2rem',
            backgroundColor: '#EE3F4A',
            color: 'var(--brand-chalk)',
          }}
        >
          <div className="max-container w-full text-center flex flex-col gap-6">
            <h1 className="text-hero scroll-hero-h1" style={{ color: 'var(--brand-chalk)' }}>
              {s.h1}
            </h1>
            <p className="text-base md:text-2xl font-light opacity-50 max-w-2xl mx-auto leading-relaxed">
              {s.sub}
            </p>
            {s.img && (
              <div className="w-full max-w-[240px] md:max-w-[360px]" style={{ marginTop: '196px', marginBottom: '220px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Image src={s.img} alt="" width={s.imgSize.width} height={s.imgSize.height} style={{ width: '100%', height: 'auto' }} />
              </div>
            )}
          </div>
        </section>
      ))}

      {/* MÓDULO SOMOS FLAHOOLICK — bloque 1: título + marquee + botón */}
      <section
        className="flex flex-col items-center text-center pt-16 md:pt-[300px]"
        style={{ backgroundColor: '#FBFE56', color: '#000000', paddingBottom: '6rem' }}
      >
        {/* Titular */}
        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)', marginBottom: '5rem' }}>
          <h2 className="text-hero" style={{ color: '#000000', fontFamily: 'var(--font-display)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Somos FLAHOOLICK.<br />
            Convertimos conocimiento técnico en autoridad de mercado.
          </h2>
        </div>

        {/* Divisoria con aire */}
        <div style={{ width: '100%', padding: '0 4rem', marginBottom: '3rem' }}>
          <hr style={{ borderColor: '#000000', borderTopWidth: '1px', opacity: 0.3 }} />
        </div>

        {/* Marcas que nos formaron */}
        <p className="label" style={{ color: '#000000', opacity: 0.6, marginBottom: '2rem', fontSize: '1rem' }}>Marcas que nos formaron</p>

        {/* Marquee */}
        <div style={{ width: '100%', overflow: 'hidden', marginBottom: '3rem' }}>
          <Marquee color="#000000" />
        </div>

        {/* Párrafo */}
        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)', marginBottom: '3rem' }}>
          <p className="text-lead mx-auto" style={{ color: '#000000', opacity: 0.75, maxWidth: '36rem' }}>
            Tenemos más de 25 años de experiencia en grupos publicitarios y medios de comunicación globales que hoy ponemos al servicio de empresas B2B que necesitan ordenar, producir y hacer circular conocimiento complejo.
          </p>
        </div>

        {/* Botón */}
        <Link
          href="/sobre-flahoolick"
          className="label px-8 py-4 hover:opacity-80 transition-opacity"
          style={{ backgroundColor: '#000000', color: '#FBFE56' }}
        >
          APRENDE SOBRE NOSOTROS
        </Link>
      </section>

      {/* MÓDULO SOMOS FLAHOOLICK — bloque 2: Con quién trabajamos, centrado */}
      <section
        className="flex flex-col items-center justify-center text-center"
        style={{ backgroundColor: '#FBFE56', color: '#000000', minHeight: '40vh', padding: '4rem var(--page-px)' }}
      >
        {/* Divisoria con aire */}
        <div style={{ width: '100%', maxWidth: '80rem', marginBottom: '3rem' }}>
          <hr style={{ borderColor: '#000000', borderTopWidth: '1px', opacity: 0.3 }} />
        </div>

        <p className="label" style={{ color: '#000000', opacity: 0.6, marginBottom: '2rem', fontSize: '1rem' }}>Con quién trabajamos</p>

        <div style={{ maxWidth: '80rem', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
          {[
            'Tecnología', 'Servicios financieros', 'Ingeniería industrial',
            'Energía', 'Minería', 'Infraestructura', 'Logística', 'Salud',
            'Educación', 'Activos inmobiliarios', 'Manufactura',
            'Servicios profesionales', 'Sector público'
          ].map(tag => (
            <span key={tag} className="text-sm px-3 py-1.5"
              style={{ border: '1px solid #000000', color: '#000000', opacity: 0.7, borderRadius: '4px' }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Módulo Capacidades + Metodología */}
      <ModuloCapacidadesMetodologia />

      {/* Módulo JERGA */}
      <ModuloJerga />

      {/* Contacto */}
      <ContactForm bg="#ffffff" text="#000000" />
    </>
  )
}
