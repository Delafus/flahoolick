import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, Tags, FontMix } from '@/components/page-layout'
import { PulsoCadencia } from '@/components/pulso-cadencia'

export const metadata: Metadata = { title: 'Producción de Contenido — Flahoolick' }

const NEGRO = '#000000'

const problemas = [
  { titulo: 'Tu conocimiento se queda dentro de la empresa', desc: 'Convertimos la experiencia de tus especialistas en contenido que el mercado puede encontrar y entender.' },
  { titulo: 'Publicas contenido que pasa de largo', desc: 'Encontramos las preguntas, historias y puntos de vista capaces de ganar atención.' },
  { titulo: 'Tu equipo comercial improvisa sus herramientas', desc: 'Creamos activos que ayudan a presentar, explicar y defender una solución.' },
  { titulo: 'Cada canal empieza desde cero', desc: 'Diseñamos piezas capaces de adaptarse, dividirse y circular en múltiples formatos.' },
]

const producimos = [
  { titulo: 'Autoridad', desc: 'Creamos contenido que demuestra experiencia y amplía la conversación.', items: ['Artículos', 'Opinión experta', 'Estudios', 'Informes', 'Guías', 'White papers', 'Newsletters'] },
  { titulo: 'Consideración', desc: 'Creamos contenido que ayuda a investigar, comparar y avanzar.', items: ['Casos de éxito', 'Páginas de solución', 'Comparativos', 'Videos explicativos', 'Webinars', 'Preguntas frecuentes', 'Experiencias interactivas'] },
  { titulo: 'Venta', desc: 'Creamos herramientas que ayudan a presentar, defender y cerrar oportunidades.', items: ['Presentaciones', 'One-pagers', 'Battlecards', 'Propuestas', 'Material para licitaciones', 'Demos', 'Herramientas comerciales'] },
  { titulo: 'Circulación', desc: 'Adaptamos cada idea para que viaje por el mercado.', items: ['LinkedIn', 'Email', 'Sitios web', 'Campañas', 'Video', 'Motion graphics', 'Medios propios', 'Paid media'] },
]

const recibes = ['Construir autoridad', 'Explicar soluciones', 'Responder preguntas', 'Apoyar a ventas', 'Alimentar campañas', 'Mantener presencia', 'Extender la vida de cada idea']

export default function ProduccionDeContenido() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Producción de Contenido"
        headline={<FontMix bold="Piezas que construyen" italic=" presencia y cierran ventas." />}
        description="Contenido de autoridad y herramientas comerciales, producidos en cadencia."
        heroBg="#F09DB6"
        heroText={NEGRO}
        illustrationNode={<PulsoCadencia />}
        ctaHref="#contacto"
        ctaLabel="Agenda una llamada →"
      >
        {/* Bloque de apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="Lo que sabes" italic=" necesita viajar." />
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lead opacity-80">
                Tu empresa acumula experiencia en reuniones, documentos, datos y conversaciones comerciales.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                Extraemos ese conocimiento. Le damos una forma clara, atractiva y útil. Lo ponemos frente a las personas que investigan, comparan, recomiendan y deciden.
              </p>
            </div>
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

        {/* Qué producimos — 4 grupos con tags */}
        <BodySection title="Qué producimos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {producimos.map(g => (
              <div key={g.titulo} className="flex flex-col gap-4 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                <h3 className="text-lg font-semibold">{g.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-65">{g.desc}</p>
                <Tags items={g.items} />
              </div>
            ))}
          </div>
        </BodySection>

        {/* Qué recibes — mockup del sistema de activos */}
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
                  <FontMix bold="Producción de Contenido" />
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
                <FontMix bold="Un sistema de activos" italic=" en circulación" />
              </h2>
              <p className="text-base opacity-70">Contenido preparado para:</p>
              <div className="flex flex-col">
                {recibes.map(r => (
                  <p key={r} className="text-base py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>{r}</p>
                ))}
              </div>
            </div>
          </div>
        </BodySection>

        {/* Cierre — sin CTA repetido, el contacto está justo debajo */}
        <BodySection dark>
          <div className="flex flex-col items-center text-center gap-4" style={{ maxWidth: '40rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0 }}>
              <FontMix bold="El conocimiento inmóvil" italic=" pierde valor." />
            </h2>
            <p className="text-lead opacity-70">Pongamos el tuyo a recorrer el mercado.</p>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
