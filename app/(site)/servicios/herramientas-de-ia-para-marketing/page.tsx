import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, CrossLinks, FontMix } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Herramientas de IA para marketing — Flahoolick' }

const NEGRO = '#000000'

const comoResolvemos = [
  'Diseñamos una herramienta alrededor de ese trabajo.',
  'La conectamos con las fuentes, reglas y criterios de tu organización.',
  'Tu equipo la incorpora a su operación cotidiana.',
]

const quePodemosConstruir = [
  { titulo: 'Paneles de inteligencia de audiencias', desc: 'Reúnen investigaciones, preguntas, perfiles y señales del mercado para orientar temas, mensajes y formatos.' },
  { titulo: 'Asistentes de conocimiento interno', desc: 'Encuentran y sintetizan información distribuida en documentos, entrevistas, manuales, presentaciones y repositorios.' },
  { titulo: 'Flujos de producción de contenido', desc: 'Transforman una fuente en briefs, borradores y versiones adaptadas a distintos canales y audiencias.' },
  { titulo: 'Revisores de marca y contenido', desc: 'Evalúan tono, mensajes, evidencia y criterios editoriales antes de que una pieza avance.' },
]

const comoLaConstruimos = [
  { titulo: 'Encontramos el caso de uso', desc: 'Identificamos una tarea frecuente que consume tiempo o limita la capacidad del equipo.' },
  { titulo: 'Definimos la lógica', desc: 'Ordenamos las fuentes, reglas, decisiones y resultados que debe considerar la herramienta.' },
  { titulo: 'Construimos la solución', desc: 'Diseñamos la interfaz, los flujos, las instrucciones y los puntos de revisión.' },
  { titulo: 'La dejamos funcionando', desc: 'Probamos la herramienta con tareas reales, ajustamos sus resultados y documentamos su uso.' },
]

const serviciosRelacionados = [
  { title: 'Estrategia de contenido', desc: 'Define audiencias, temas, mensajes, canales y momentos de decisión.', href: '/servicios/estrategia-de-contenido' },
  { title: 'Producción de contenido', desc: 'Convierte la estrategia y el conocimiento interno en piezas listas para circular.', href: '/servicios/produccion-de-contenido' },
]

export default function HerramientasDeIAParaMarketing() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Herramientas de IA"
        headline={<FontMix bold="Herramientas de IA" italic=" para marketing." />}
        description="Diseñamos e implementamos herramientas con IA para investigar audiencias, aprovechar el conocimiento interno y acelerar la producción de contenido."
        heroBg="#F09DB6"
        heroText={NEGRO}
        ctaHref="#contacto"
        ctaLabel="Cuéntanos qué quieres resolver →"
        contact={{
          headline: <FontMix bold="Empecemos por" italic=" un trabajo concreto." />,
          description: 'Cuéntanos qué tarea consume tiempo, dónde vive la información y qué resultado necesita tu equipo. Diseñaremos una primera herramienta alrededor de ese caso.',
          submitLabel: 'Cuéntanos tu idea →',
        }}
      >
        {/* Bloque de apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="La IA genera valor" italic=" cuando resuelve un trabajo concreto." />
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lead opacity-80">
                Cada equipo de marketing acumula tareas repetitivas, información dispersa y decisiones que dependen de encontrar el dato correcto.
              </p>
              <div className="flex flex-col gap-2 mt-2">
                {comoResolvemos.map(r => (
                  <p key={r} className="text-base opacity-60" style={{ paddingLeft: '1.25rem', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>—</span>
                    {r}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </BodySection>

        {/* Qué podemos construir — 4 cards planas, sin cards de IA */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
              <FontMix bold="Qué podemos" italic=" construir" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {quePodemosConstruir.map(p => (
                <div key={p.titulo} className="flex flex-row gap-4 p-8" style={{ backgroundColor: NEGRO }}>
                  <div style={{ height: 'calc(1.3em * 2)', width: 'calc(1.3em * 2)', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  <div className="flex flex-col gap-3">
                    <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{p.titulo}</h3>
                    <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Bloque destacado */}
        <BodySection>
          <div className="flex flex-col gap-6 items-center text-center mx-auto" style={{ maxWidth: '46rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.05 }}>
              <FontMix bold="La herramienta toma la forma" italic=" que el trabajo necesita." />
            </h2>
            <p className="text-lead opacity-75">
              Puede ser una aplicación web, un asistente privado, un panel de consulta o un flujo automatizado conectado a las herramientas que utiliza tu equipo.
            </p>
            <p className="text-base opacity-55">
              Cada solución se construye para un caso de uso específico.
            </p>
          </div>
        </BodySection>

        {/* Cómo la construimos */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
              <FontMix bold="Cómo" italic=" la construimos" />
            </h2>
            <HowList items={comoLaConstruimos} />
          </div>
        </BodySection>

        {/* Bloque de criterio */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="IA con criterio" italic=" incorporado." />
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lead opacity-80">
                Cada herramienta trabaja con fuentes definidas, reglas de marca y puntos de revisión. El equipo mantiene la decisión final sobre lo que investiga, produce y publica.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                Flahoolick combina estrategia, escritura, diseño y desarrollo para convertir ese criterio en una herramienta útil.
              </p>
            </div>
          </div>
        </BodySection>

        {/* Bloque breve */}
        <BodySection>
          <div className="flex flex-col gap-4" style={{ maxWidth: '42rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)', lineHeight: 1.15 }}>
              <FontMix bold="Un buen caso de uso combina" italic=" frecuencia, volumen y valor." />
            </h2>
            <p className="text-base leading-relaxed opacity-65">
              Suele aparecer en tareas que se repiten, dependen de muchas fuentes o exigen consistencia entre personas y canales.
            </p>
            <p className="text-base leading-relaxed opacity-65">
              Podemos comenzar con un proceso acotado y convertirlo en una primera herramienta funcional.
            </p>
          </div>
        </BodySection>

        {/* Módulo de servicios relacionados */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1 }} className="max-w-2xl">
              <FontMix bold="También podemos ayudarte" italic=" a construir el sistema que la alimenta." />
            </h2>
            <CrossLinks links={serviciosRelacionados} />
          </div>
        </BodySection>

      </PageLayout>
    </>
  )
}
