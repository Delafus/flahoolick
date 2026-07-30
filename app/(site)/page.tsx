import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import { Marquee } from '@/components/marquee'
import Image from 'next/image'
import { ModuloCapacidadesMetodologia } from '@/components/modulo-capacidades-metodologia'
import { ModuloComoTrabajamos } from '@/components/modulo-como-trabajamos'
import { ModuloJerga } from '@/components/modulo-jerga'
import { TrappedDots } from '@/components/trapped-dots'
import { ScannerDots } from '@/components/scanner-dots'
import { CirculationDots } from '@/components/circulation-dots'
import { ScrollConnector } from '@/components/scroll-connector'
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
    imgSize: { width: 622, height: 622 },
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
            backgroundColor: '#083EA7',
            color: '#1FDE91',
          }}
        >
          <div className="max-container w-full text-center flex flex-col gap-6">
            <h1 className="text-hero scroll-hero-h1" style={{ color: '#1FDE91' }}>
              {s.h1}
            </h1>
            <p className="text-base md:text-2xl font-light max-w-2xl mx-auto leading-relaxed" style={{ color: '#1FDE91', opacity: 0.85 }}>
              {s.sub}
            </p>
            {s.img && (
              <>
                <div className="md:hidden"><ScrollConnector color="#1FDE91" height={90} thickness={1.5} dotSize={9} /></div>
                <div className="hidden md:block"><ScrollConnector color="#1FDE91" height={140} /></div>
                <div className="w-full max-w-[240px] md:max-w-[360px] mt-8 mb-8 md:mt-20 md:mb-20 mx-auto" style={{ position: 'relative' }}>
                  <Image src={s.img} alt="" width={s.imgSize.width} height={s.imgSize.height} style={{ width: '100%', height: 'auto' }} />
                  {i === 0 && <TrappedDots diameterPercent={44.8} dotColor="#083EA7" />}
                  {i === 1 && <ScannerDots viewBoxSize={s.imgSize.width} color="#1FDE91" />}
                  {i === 1 && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 174 14"
                      preserveAspectRatio="none"
                      style={{
                        position: 'absolute',
                        left: '53.592%',
                        top: '-1.639%',
                        width: '48.044%',
                        height: '3.866%',
                        pointerEvents: 'none',
                      }}
                    >
                      <path d="M173.153 13.4552H170.305V12.6367H172.266V0.818569H170.305V0H173.153V13.4552Z" fill="#1FDE91" />
                      <path d="M2.84794 12.6367V13.4552H0V0H2.84794V0.818569H0.886783V12.6367H2.84794Z" fill="#1FDE91" />
                    </svg>
                  )}
                  {i === 2 && <CirculationDots viewBoxSize={s.imgSize.width} color="#1FDE91" />}
                </div>
              </>
            )}
          </div>
          {i < SCROLLS.length - 1 && (
            <>
              <div className="md:hidden"><ScrollConnector color="#1FDE91" height={130} thickness={1.5} dotSize={9} /></div>
              <div className="hidden md:block"><ScrollConnector color="#1FDE91" height={200} /></div>
            </>
          )}
        </section>
      ))}

      {/* Conector que cruza el límite azul → verde, cambiando de color a la mitad */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #083EA7 50%, #1FDE91 50%)' }} />
        <div style={{ position: 'relative' }}>
          <ScrollConnector color="#1FDE91" colorTo="#083EA7" height={220} thickness={3} dotSize={16} />
        </div>
      </div>

      {/* PRESENTACIÓN — Somos FLAHOOLICK */}
      <section
        className="flex flex-col items-center text-center pt-16 md:pt-[300px]"
        style={{ backgroundColor: '#1FDE91', color: '#083EA7', paddingBottom: '6rem' }}
      >
        {/* Titular */}
        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)', marginBottom: '5rem' }}>
          <h2 className="text-hero" style={{ color: '#083EA7', fontFamily: 'var(--font-display)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            Somos FLAHOOLICK.<br />
            Convertimos conocimiento técnico en autoridad de mercado.
          </h2>
        </div>

        {/* Botón */}
        <Link
          href="/sobre-flahoolick"
          className="label px-8 py-4 hover:opacity-80 transition-opacity"
          style={{ backgroundColor: '#083EA7', color: '#1FDE91' }}
        >
          APRENDE SOBRE NOSOTROS
        </Link>
      </section>

      {/* Módulo Servicios — cómo trabajamos */}
      <ModuloComoTrabajamos />

      {/* Módulo Capacidades + Metodología */}
      <ModuloCapacidadesMetodologia />

      {/* EVIDENCIA — marcas, experiencia e industrias */}
      <section
        className="flex flex-col items-center text-center"
        style={{ backgroundColor: '#1FDE91', color: '#083EA7', padding: '6rem 0' }}
      >
        {/* Marcas que nos formaron */}
        <p className="label" style={{ color: '#083EA7', opacity: 0.6, marginBottom: '2rem', fontSize: '1rem' }}>Marcas que nos formaron</p>

        {/* Marquee */}
        <div style={{ width: '100%', overflow: 'hidden', marginBottom: '3rem' }}>
          <Marquee color="#083EA7" />
        </div>

        {/* Párrafo */}
        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)' }}>
          <p className="text-lead mx-auto" style={{ color: '#083EA7', opacity: 0.75, maxWidth: '52rem' }}>
            Tenemos más de 25 años de experiencia en grupos publicitarios y medios de comunicación globales que hoy ponemos al servicio de empresas B2B que necesitan ordenar, producir y hacer circular conocimiento complejo.
          </p>
        </div>

        {/* Divisoria con aire */}
        <div style={{ width: '100%', maxWidth: '80rem', padding: '0 var(--page-px)', margin: '4rem 0 3rem' }}>
          <hr style={{ borderColor: '#083EA7', borderTopWidth: '1px', opacity: 0.3 }} />
        </div>

        <p className="label" style={{ color: '#083EA7', opacity: 0.6, marginBottom: '2rem', fontSize: '1rem' }}>Con quién trabajamos</p>

        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
          {[
            'Tecnología', 'Servicios financieros', 'Ingeniería industrial',
            'Energía', 'Minería', 'Infraestructura', 'Logística', 'Salud',
            'Educación', 'Activos inmobiliarios', 'Manufactura',
            'Servicios profesionales', 'Sector público'
          ].map(tag => (
            <span key={tag} className="text-sm px-3 py-1.5"
              style={{ border: '1px solid #083EA7', color: '#083EA7', opacity: 0.7, borderRadius: '4px' }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Módulo JERGA */}
      <ModuloJerga />

      {/* Contacto */}
      <ContactForm bg="#ffffff" text="#000000" />
    </>
  )
}
