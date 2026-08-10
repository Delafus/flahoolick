import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { ServicioCards } from '@/components/servicio-cards'
import { PulsoUnisono } from '@/components/pulso-unisono'

export const metadata: Metadata = { title: 'Marca y Relato — Flahoolick' }

const NEGRO = '#000000'

const palabrasComunes = ['Innovación.', 'Experiencia.', 'Tecnología.', 'Compromiso.', 'Excelencia.']

const problemas = [
  { titulo: 'Tu empresa cuesta explicar', desc: 'Ordenamos el negocio y construimos una historia que el mercado puede entender y repetir.' },
  { titulo: 'Tu marca se confunde con la categoría', desc: 'Definimos una posición, un lenguaje y unas señales capaces de distinguirla.' },
  { titulo: 'Cada equipo cuenta una historia distinta', desc: 'Creamos una arquitectura común para marketing, ventas, dirección y equipos técnicos.' },
  { titulo: 'La identidad pierde fuerza al aplicarse', desc: 'Diseñamos herramientas que permiten ejecutar la marca con claridad y consistencia.' },
]

const pasos = [
  { numero: '01', titulo: 'Posición', desc: 'Definimos el lugar que tu empresa quiere ocupar en la mente del mercado.' },
  { numero: '02', titulo: 'Relato', desc: 'Construimos la historia que organiza lo que haces, crees y prometes.' },
  { numero: '03', titulo: 'Voz', desc: 'Creamos un lenguaje reconocible para cada punto de contacto.' },
  { numero: '04', titulo: 'Identidad', desc: 'Diseñamos las señales visuales que vuelven tangible la estrategia.' },
]

const recibes = ['Sitios', 'Presentaciones', 'Campañas', 'Redes sociales', 'Ventas', 'Licitaciones', 'Comunicación interna', 'Experiencias digitales']

export default function MarcaYRelato() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Marca y Relato"
        headline={<FontMix bold="Una idea" italic=" que todo tu equipo cuenta igual." />}
        description="La idea central y la arquitectura de mensajes que unifica cómo tu empresa habla."
        heroBg="#F09DB6"
        heroText={NEGRO}
        illustrationNode={<PulsoUnisono />}
        ctaHref="#contacto"
        ctaLabel="Agenda una llamada →"
      >
        {/* Bloque de apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="Ocupar un lugar" italic=" exige definirlo." />
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lead opacity-80">Las empresas complejas suelen describirse con las mismas palabras.</p>
              <div className="flex flex-wrap gap-x-2">
                {palabrasComunes.map(p => (
                  <span key={p} className="text-base opacity-40">{p}</span>
                ))}
              </div>
              <p className="text-base leading-relaxed opacity-65">
                Encontramos la idea que tu empresa puede defender y la convertimos en una posición visible.
              </p>
            </div>
          </div>
        </BodySection>

        {/* Qué construimos — secuencia de pasos con scroll-reveal */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <p className="label opacity-40">Qué construimos</p>
            <ServicioCards items={pasos} color={NEGRO} />
          </div>
        </BodySection>

        {/* Qué resolvemos — título + 4 cards en 2 columnas (1 en mobile) */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <p className="label opacity-50">Qué resolvemos</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {problemas.map(p => (
                <div key={p.titulo} className="flex flex-col gap-3 p-8" style={{ backgroundColor: NEGRO }}>
                  <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{p.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Qué recibes — mockup del sistema de marca */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', opacity: 0.12, transform: 'rotate(-6deg) translate(14px, 10px)', borderRadius: '8px' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', opacity: 0.18, transform: 'rotate(3deg) translate(-8px, -6px)', borderRadius: '8px' }} />
              <div style={{
                position: 'absolute', inset: 0, backgroundColor: '#ffffff', borderRadius: '8px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem 2rem',
              }}>
                <p className="label" style={{ color: NEGRO, opacity: 0.5 }}>Sistema</p>
                <h3 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.05, color: NEGRO }}>
                  <FontMix bold="Marca y Relato" />
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
                <FontMix bold="Sistema" italic=" de marca" />
              </h2>
              <p className="text-base opacity-70">Una plataforma estratégica, verbal y visual preparada para funcionar en:</p>
              <div className="flex flex-col">
                {recibes.map(r => (
                  <p key={r} className="text-base py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>{r}</p>
                ))}
              </div>
            </div>
          </div>
        </BodySection>

        {/* Cierre — sin CTA repetido, el contacto está justo debajo */}
        <BodySection>
          <div className="flex flex-col items-center text-center gap-4" style={{ maxWidth: '40rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0 }}>
              <FontMix bold="Tu categoría ya tiene" italic=" voces." />
            </h2>
            <p className="text-lead opacity-70">Construyamos la que todos puedan reconocer.</p>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
