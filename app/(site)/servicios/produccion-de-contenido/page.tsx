import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, Tags, FontMix } from '@/components/page-layout'

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
      <PageColorSetter bg="#EF9DB6" text={NEGRO} />
      <PageLayout
        tagline="Producción de Contenido"
        headline={<FontMix bold="Piezas que construyen" italic=" presencia y cierran ventas." />}
        description="Contenido de autoridad y herramientas comerciales, producidos en cadencia."
        heroBg="#EF9DB6"
        heroText={NEGRO}
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
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
              <FontMix bold="Qué" italic=" resolvemos" />
            </h2>
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
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
              <FontMix bold="Qué" italic=" producimos" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {producimos.map(g => (
                <div key={g.titulo} className="flex flex-col gap-4 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                  <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{g.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{g.desc}</p>
                  <Tags items={g.items} />
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Qué recibes */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              className="hidden md:flex"
              style={{
                position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto',
                border: '1px solid rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span className="label" style={{ color: '#ffffff', opacity: 0.25 }}>Ilustración</span>
            </div>
            <div className="flex flex-col gap-6">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
                <FontMix bold="Un sistema de activos" italic=" en circulación" />
              </h2>
              <p className="text-base opacity-70">Contenido preparado para:</p>
              <ul className="flex flex-col gap-2 list-disc" style={{ paddingLeft: '1.25rem' }}>
                {recibes.map(r => (
                  <li key={r} className="text-base">{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </BodySection>

        {/* Cierre — mensaje de Flahoolick, verde de marca. Sin CTA repetido, el contacto está justo debajo */}
        <section className="page-px section-py" style={{ backgroundColor: '#1FDE91', color: NEGRO }}>
          <div className="max-container flex flex-col items-center text-center gap-4" style={{ maxWidth: '40rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0, color: NEGRO }}>
              <FontMix bold="El conocimiento inmóvil" italic=" pierde valor." />
            </h2>
            <p className="text-lead opacity-70" style={{ color: NEGRO }}>Pongamos el tuyo a recorrer el mercado.</p>
          </div>
        </section>
      </PageLayout>
    </>
  )
}
