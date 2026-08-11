import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import { FontMix } from '@/components/page-layout'
import { Marquee } from '@/components/marquee'
import { ModuloMetodologia } from '@/components/modulo-metodologia'
import { ModuloComoTrabajamos } from '@/components/modulo-como-trabajamos'
import { ModuloCasoDunamis } from '@/components/modulo-caso-dunamis'
import { ModuloJerga } from '@/components/modulo-jerga'
import { ScrollConnector } from '@/components/scroll-connector'
import { TrappedDots } from '@/components/trapped-dots'
import { EyeGrid } from '@/components/eye-grid'
import { FunnelDots } from '@/components/funnel-dots'
import Link from 'next/link'

interface Scroll {
  h1Base: string
  h1Emphasis: string
  breakBeforeEmphasis?: boolean
  /** Solo desktop: fuerza un salto de línea dentro del base, justo antes de esta palabra. */
  baseBreakBefore?: string
  /** Solo desktop: fuerza un salto de línea dentro del énfasis, justo después de esta palabra. */
  emphasisBreakAfter?: string
  sub: string
}

const SCROLLS: Scroll[] = [
  {
    h1Base: 'Tu empresa sabe demasiado ',
    h1Emphasis: 'para comunicar como cualquiera.',
    baseBreakBefore: 'demasiado',
    emphasisBreakAfter: 'comunicar',
    sub: 'Gran parte de ese conocimiento queda atrapado.',
  },
  {
    h1Base: 'Solo el 5% de tu mercado ',
    h1Emphasis: 'está listo para comprar hoy.',
    baseBreakBefore: 'mercado',
    emphasisBreakAfter: 'listo',
    sub: 'El 95% restante está formando opinión.',
  },
  {
    h1Base: 'Tu ventaja competitiva ',
    h1Emphasis: 'ya existe.',
    breakBeforeEmphasis: true,
    sub: 'Necesita un sistema que la ponga en circulación.',
  },
]

/** Corta el texto base en dos líneas (solo desktop) justo antes de la palabra indicada. */
function BaseText({ text, breakBefore }: { text: string; breakBefore?: string }) {
  if (!breakBefore) return <>{text}</>
  const cut = text.indexOf(breakBefore)
  return (
    <>
      {text.slice(0, cut)}
      <br className="hidden md:block" />
      {text.slice(cut)}
    </>
  )
}

/** Corta el texto de énfasis en dos líneas (solo desktop) justo después de la palabra indicada. */
function EmphasisText({ text, breakAfter }: { text: string; breakAfter?: string }) {
  if (!breakAfter) return <>{text}</>
  const cut = text.indexOf(breakAfter) + breakAfter.length
  return (
    <>
      {text.slice(0, cut)}
      <br className="hidden md:block" />
      {text.slice(cut)}
    </>
  )
}

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
          className={`flex flex-col items-center page-px ${i === 2 ? 'justify-end' : 'justify-center'} ${i === 0 ? 'pt-32 md:pt-[220px]' : 'pt-24'}`}
          style={{
            minHeight: '100dvh',
            paddingBottom: i === 2 ? 0 : '2rem',
            backgroundColor: '#D8D8D7',
            color: '#000000',
          }}
        >
          <div className="max-container w-full text-center flex flex-col gap-6">
            <h1 className="text-hero scroll-hero-h1" style={{ color: '#000000' }}>
              <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: '1.04em', letterSpacing: '-0.03em' }}>
                <BaseText text={s.h1Base} breakBefore={s.baseBreakBefore} />
              </span>
              {s.breakBeforeEmphasis && <br className="hidden md:block" />}
              <span style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.04em' }}>
                <EmphasisText text={s.h1Emphasis} breakAfter={s.emphasisBreakAfter} />
              </span>
            </h1>
            <p className="text-base md:text-2xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#55524C', fontFamily: 'var(--font-bricolage)', fontWeight: 400 }}>
              {s.sub}
            </p>
            {i !== 2 && (
              <>
                <div className="md:hidden"><ScrollConnector color="#403D37" height={90} thickness={1.5} dotSize={9} dotShape="shield" /></div>
                <div className="hidden md:block"><ScrollConnector color="#403D37" height={140} dotShape="shield" /></div>
              </>
            )}

            {i === 0 ? (
              <div className="w-full max-w-[300px] md:max-w-[440px] mt-8 mb-8 md:mt-20 md:mb-20 mx-auto" style={{ position: 'relative', aspectRatio: '1' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: '#000000' }} />
                <TrappedDots diameterPercent={80} dotColor="#F1EEE7" />
              </div>
            ) : i === 1 ? (
              <div className="w-full max-w-[300px] md:max-w-[440px] mt-8 mb-8 md:mt-20 md:mb-20 mx-auto" style={{ position: 'relative', aspectRatio: '1' }}>
                <EyeGrid />
              </div>
            ) : (
              <div className="w-full max-w-[300px] md:max-w-[440px] mt-4 mx-auto" style={{ position: 'relative', height: 'clamp(320px, 45vh, 520px)' }}>
                <FunnelDots color="#403D37" />
              </div>
            )}
          </div>
          {i < SCROLLS.length - 1 && (
            <>
              <div className="md:hidden"><ScrollConnector color="#403D37" height={130} thickness={1.5} dotSize={9} dotShape="shield" /></div>
              <div className="hidden md:block"><ScrollConnector color="#403D37" height={200} dotShape="shield" /></div>
            </>
          )}
        </section>
      ))}

      {/* Transición gris → verde: el embudo de dots del hero 3 ya se difuminó justo antes
          de acá, esto es solo el cambio de color hacia el módulo Somos Flahoolick */}
      <div style={{ position: 'relative', height: '120px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #D8D8D7 50%, #1FDE91 50%)' }} />
      </div>

      {/* PRESENTACIÓN — Somos FLAHOOLICK */}
      <section
        className="flex flex-col items-center text-center pt-16 md:pt-[300px]"
        style={{ backgroundColor: '#1FDE91', color: '#000000', paddingBottom: '6rem' }}
      >
        {/* Titular */}
        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)', marginBottom: '5rem' }}>
          <h2 className="text-hero" style={{ color: '#000000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: '1.04em', letterSpacing: '-0.03em' }}>Somos FLAHOOLICK.</span><br />
            <span style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.04em' }}>Convertimos lo que sabes en autoridad de mercado.</span>
          </h2>
        </div>

        {/* Botón */}
        <Link
          href="/sobre-flahoolick"
          className="label pill-somos-flahoolick px-8 py-4"
          style={{ borderRadius: '999px' }}
        >
          APRENDE SOBRE NOSOTROS
        </Link>
      </section>

      {/* Caso Dunamis */}
      <ModuloCasoDunamis />

      {/* Módulo Servicios — en qué nos especializamos */}
      <ModuloComoTrabajamos />

      {/* EVIDENCIA — marcas, experiencia e industrias */}
      <section
        className="flex flex-col items-center text-center"
        style={{ backgroundColor: '#1FDE91', color: '#000000', padding: '6rem 0' }}
      >
        {/* Marcas que nos formaron */}
        <p className="label" style={{ color: '#000000', opacity: 0.6, marginBottom: '2rem', fontSize: '1rem', fontFamily: 'var(--font-bricolage)', fontWeight: 700, textTransform: 'none' }}>Marcas que nos formaron</p>

        {/* Marquee */}
        <div style={{ width: '100%', overflow: 'hidden', marginBottom: '3rem' }}>
          <Marquee color="#000000" />
        </div>

        {/* Párrafo */}
        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)' }}>
          <p className="text-lead mx-auto" style={{ color: '#000000', opacity: 0.75, maxWidth: '52rem' }}>
            Tenemos más de 25 años de experiencia en grupos publicitarios y medios de comunicación globales que hoy ponemos al servicio de empresas B2B que necesitan ordenar, producir y hacer circular conocimiento complejo.
          </p>
        </div>

        {/* Divisoria con aire */}
        <div style={{ width: '100%', maxWidth: '80rem', padding: '0 var(--page-px)', margin: '4rem 0 3rem' }}>
          <hr style={{ borderColor: '#000000', borderTopWidth: '1px', opacity: 0.3 }} />
        </div>

        <p className="label" style={{ color: '#000000', opacity: 0.6, marginBottom: '2rem', fontSize: '1rem', fontFamily: 'var(--font-bricolage)', fontWeight: 700, textTransform: 'none' }}>Con quién trabajamos</p>

        <div style={{ maxWidth: '80rem', width: '100%', padding: '0 var(--page-px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
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

      {/* Módulo Metodología */}
      <ModuloMetodologia />

      {/* Módulo JERGA */}
      <ModuloJerga />

      {/* Contacto */}
      <ContactForm bg="#403D37" text="#ffffff"
        headline={<FontMix bold="¿Empezamos" italic=" por una llamada?" />}
        note="30 minutos. Sin presentaciones ni decks de venta." />
    </>
  )
}
