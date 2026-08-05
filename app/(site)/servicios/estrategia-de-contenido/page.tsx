import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'
import { TrappedDots } from '@/components/trapped-dots'
import { ServicioScrollSteps } from '@/components/servicio-scroll-steps'
import { ServicioAcordeonIncluye } from '@/components/servicio-acordeon-incluye'

export const metadata: Metadata = { title: 'Estrategia de Contenido — Flahoolick' }

const NEGRO = '#000000'

const problemas = [
  { titulo: 'Publicas sobre demasiadas cosas', desc: 'Definimos los territorios donde tu empresa puede hablar con autoridad.' },
  { titulo: 'Intentas hablarle a todo el mercado', desc: 'Identificamos quién necesita escuchar qué durante cada momento de la decisión.' },
  { titulo: 'Produces piezas que trabajan por separado', desc: 'Asignamos una función comercial y editorial a cada contenido.' },
  { titulo: 'Decides la pauta desde la urgencia', desc: 'Creamos prioridades, ritmos y criterios claros para decidir qué producir.' },
]

const pasos = [
  { numero: '01', titulo: 'Arquitectura', desc: 'Ordenamos mensajes, temas, audiencias, formatos y canales.' },
  { numero: '02', titulo: 'Recorrido', desc: 'Mapeamos las preguntas que aparecen durante el ciclo comercial.' },
  { numero: '03', titulo: 'Sistema', desc: 'Definimos cómo encontrar, producir, aprobar, distribuir y medir contenido.' },
  { numero: '04', titulo: 'Plan', desc: 'Convertimos la estrategia en un roadmap listo para ejecutar.' },
]

const categorias = [
  { titulo: 'Inteligencia', items: ['Auditoría de contenido', 'Análisis de brechas', 'Inteligencia de audiencias', 'Benchmark competitivo'] },
  { titulo: 'Arquitectura', items: ['Mapa del proceso de decisión', 'Arquitectura de mensajes', 'Pilares editoriales', 'Territorios temáticos'] },
  { titulo: 'Circulación', items: ['Plan de canales', 'SEO y visibilidad en buscadores con IA', 'Estrategia de distribución', 'Calendario editorial'] },
  { titulo: 'Medición', items: ['Roadmap de contenido', 'Indicadores', 'Modelo de medición', 'Criterios de optimización'] },
]

const recibes = ['Qué decir', 'A quién hablar', 'Qué producir', 'Dónde distribuir', 'Cómo medir', 'Cómo sostener la operación']

export default function EstrategiaDeContenido() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Estrategia de Contenido"
        headline="Ponle cerebro al calendario."
        description="Diseñamos la lógica que conecta objetivos, audiencias, temas, canales y momentos de decisión."
        heroBg="#F09DB6"
        heroText={NEGRO}
        ctaHref="#contacto"
        ctaLabel="Conversemos →"
        illustrationNode={<TrappedDots diameterPercent={72} dotColor={NEGRO} />}
      >
        {/* Bloque de apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Tu empresa tiene ideas. Necesita dirección.
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lead opacity-80">
                Cada pieza recibe una función. Cada canal recibe una razón. Cada esfuerzo empuja en la misma dirección.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                El conocimiento aparece en reuniones, presentaciones, conversaciones comerciales, documentos y especialistas. Encontramos las ideas con valor, las ordenamos y definimos cómo ponerlas frente al mercado.
              </p>
            </div>
          </div>
        </BodySection>

        {/* Qué resolvemos — título + 4 cards en 2 columnas (1 en mobile) */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <p className="label opacity-50">Qué resolvemos</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {problemas.map(p => (
                <div key={p.titulo} className="flex flex-col gap-3 p-8" style={{ backgroundColor: NEGRO }}>
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Qué construimos — secuencia de pasos con scroll-reveal */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <p className="label opacity-40">Qué construimos</p>
            <ServicioScrollSteps pasos={pasos} color={NEGRO} />
          </div>
        </BodySection>

        {/* Qué incluye — acordeón, ancho contenido */}
        <BodySection title="Qué incluye">
          <div style={{ maxWidth: '52rem' }}>
            <ServicioAcordeonIncluye categorias={categorias} color={NEGRO} />
          </div>
        </BodySection>

        {/* Qué recibes — mockup del playbook */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', opacity: 0.12, transform: 'rotate(-6deg) translate(14px, 10px)', borderRadius: '8px' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', opacity: 0.18, transform: 'rotate(3deg) translate(-8px, -6px)', borderRadius: '8px' }} />
              <div style={{
                position: 'absolute', inset: 0, backgroundColor: '#ffffff', borderRadius: '8px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem 2rem',
              }}>
                <p className="label" style={{ color: NEGRO, opacity: 0.5 }}>Playbook</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1, color: NEGRO }}>
                  Estrategia de Contenido
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
              }}>
                Playbook de estrategia de contenido
              </h2>
              <p className="text-base opacity-70">Un sistema operativo para decidir:</p>
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
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              El calendario empieza después.
            </h2>
            <p className="text-lead opacity-70">Primero construimos la lógica que le da sentido.</p>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
