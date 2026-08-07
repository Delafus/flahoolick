import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { TrappedDots } from '@/components/trapped-dots'
import { ServicioScrollSteps } from '@/components/servicio-scroll-steps'
import { ServicioCards } from '@/components/servicio-cards'
import { ServicioAcordeonIncluye } from '@/components/servicio-acordeon-incluye'

export const metadata: Metadata = { title: 'Sistemas de Contenido con IA — Flahoolick' }

const NEGRO = '#000000'

const olvidos = [
  'Una respuesta queda atrapada en una reunión.',
  'Una objeción desaparece dentro del CRM.',
  'Un especialista explica lo mismo por quinta vez.',
  'Un documento importante termina perdido en una carpeta.',
]

const problemas = [
  { titulo: 'El conocimiento depende de algunas personas', desc: 'Capturamos la experiencia que vive en especialistas, reuniones, documentos y conversaciones.' },
  { titulo: 'Tu equipo pierde tiempo buscando respuestas', desc: 'Organizamos las fuentes para encontrar información confiable con rapidez.' },
  { titulo: 'Cada contenido comienza desde cero', desc: 'Creamos flujos que recuperan, combinan y reutilizan el conocimiento existente.' },
  { titulo: 'La IA responde sin conocer tu empresa', desc: 'Conectamos los modelos con información propia, reglas claras y revisión experta.' },
]

const construimos = [
  { titulo: 'Memoria', desc: 'Reunimos y organizamos el conocimiento que la empresa necesita conservar y utilizar.' },
  { titulo: 'Conexiones', desc: 'Integramos documentos, reuniones, CRM, formularios y sistemas internos.' },
  { titulo: 'Asistentes', desc: 'Configuramos herramientas para investigar, responder, ordenar, redactar y reutilizar información.' },
  { titulo: 'Producción continua', desc: 'Diseñamos el flujo que conecta conocimiento interno, inteligencia artificial, revisión experta y distribución.' },
]

const pasos = [
  { numero: '01', titulo: 'Encontramos', desc: 'Identificamos dónde vive el conocimiento y cómo se genera.' },
  { numero: '02', titulo: 'Ordenamos', desc: 'Creamos categorías, fuentes confiables, reglas y permisos de acceso.' },
  { numero: '03', titulo: 'Conectamos', desc: 'Integramos herramientas, personas, procesos y modelos de inteligencia artificial.' },
  { numero: '04', titulo: 'Activamos', desc: 'Convertimos el conocimiento en respuestas, briefs, contenidos y herramientas comerciales.' },
  { numero: '05', titulo: 'Mejoramos', desc: 'Registramos preguntas, correcciones y señales para fortalecer el sistema.' },
]

const categorias = [
  { titulo: 'Conocimiento', items: ['Auditoría de fuentes', 'Mapa de conocimiento', 'Base documental', 'Taxonomía', 'Metadatos', 'Permisos de acceso'] },
  { titulo: 'Inteligencia artificial', items: ['Asistentes internos', 'Agentes de investigación', 'Agentes de contenido', 'Generación de briefs', 'Búsqueda semántica', 'Procesamiento de documentos'] },
  { titulo: 'Producción', items: ['Flujos de creación', 'Automatización de tareas', 'Reutilización de contenido', 'Procesos de aprobación', 'Integraciones', 'Documentación de trabajo'] },
  { titulo: 'Control', items: ['Fuentes verificables', 'Reglas de marca', 'Voz y tono', 'Revisión humana', 'Gobernanza', 'Medición de calidad'] },
]

const recibes = ['Encontrar información', 'Responder preguntas', 'Generar briefs', 'Crear contenido', 'Reutilizar activos', 'Mantener consistencia', 'Registrar aprendizajes', 'Acelerar la producción']

const formasDeTrabajo = [
  { titulo: 'Diagnóstico', desc: 'Identificamos fuentes, procesos, pérdidas de conocimiento y oportunidades de automatización.' },
  { titulo: 'Piloto', desc: 'Construimos un sistema acotado para un equipo, una fuente o un caso de uso.' },
  { titulo: 'Implementación', desc: 'Conectamos las fuentes, los asistentes y los flujos necesarios para trabajar.' },
  { titulo: 'Mejora continua', desc: 'Mantenemos, medimos y ampliamos las capacidades del sistema.' },
]

export default function SistemasDeContenidoConIA() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Sistemas de Contenido con IA"
        headline={<FontMix bold="Instálale memoria" italic=" a tu empresa." />}
        description="Diseñamos sistemas que capturan conocimiento, conectan señales y alimentan de forma continua a marketing, ventas y equipos técnicos."
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
              Tu empresa olvida cosas valiosas todos los días.
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {olvidos.map(o => (
                  <p key={o} className="text-base opacity-60">{o}</p>
                ))}
              </div>
              <p className="text-base leading-relaxed opacity-80 mt-2">
                Convertimos ese conocimiento disperso en información disponible, organizada y lista para trabajar.
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
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Qué construimos */}
        <BodySection title="Qué construimos">
          <ServicioCards items={construimos} color={NEGRO} />
        </BodySection>

        {/* Cómo funciona — secuencia de pasos con scroll-reveal */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <p className="label opacity-50">Cómo funciona</p>
            <ServicioScrollSteps pasos={pasos} color="#ffffff" />
          </div>
        </BodySection>

        {/* Qué incluye — acordeón, ancho contenido */}
        <BodySection title="Qué incluye">
          <div style={{ maxWidth: '52rem' }}>
            <ServicioAcordeonIncluye categorias={categorias} color={NEGRO} />
          </div>
        </BodySection>

        {/* Qué recibes — mockup del sistema */}
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
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: 1.1, color: NEGRO }}>
                  Sistemas de Contenido con IA
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
              }}>
                Un sistema de contenido con memoria
              </h2>
              <p className="text-base opacity-70">Una infraestructura preparada para:</p>
              <div className="flex flex-col">
                {recibes.map(r => (
                  <p key={r} className="text-base py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>{r}</p>
                ))}
              </div>
            </div>
          </div>
        </BodySection>

        {/* Formas de trabajo */}
        <BodySection title="Formas de trabajo">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {formasDeTrabajo.map(f => (
              <div key={f.titulo} className="flex flex-col gap-3 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                <h3 className="text-base font-semibold">{f.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-65">{f.desc}</p>
              </div>
            ))}
          </div>
        </BodySection>

        {/* Cierre — sin CTA repetido, el contacto está justo debajo */}
        <BodySection dark>
          <div className="flex flex-col items-center text-center gap-4" style={{ maxWidth: '40rem', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Tu empresa ya tiene inteligencia.
            </h2>
            <p className="text-lead opacity-70">Construyamos el sistema que la recuerda.</p>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
