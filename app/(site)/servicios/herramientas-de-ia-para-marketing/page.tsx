import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Herramientas de IA para marketing y ventas — Flahoolick' }

const NEGRO = '#000000'

const agenteBullets = [
  'Responden llamadas.',
  'Contactan leads.',
  'Hacen preguntas y califican oportunidades.',
  'Resuelven consultas frecuentes.',
  'Agendan reuniones.',
  'Hacen seguimiento.',
  'Reactivan leads.',
  'Derivan conversaciones al equipo.',
]

const herramientas = [
  { titulo: 'Inteligencia de audiencias', desc: 'Sistemas que reúnen investigación, datos y señales del mercado para entender audiencias, explorar preguntas y detectar oportunidades.' },
  { titulo: 'Asistentes de conocimiento', desc: 'Herramientas que conectan documentos, presentaciones, reuniones y conocimiento interno para que los equipos puedan consultarlo y utilizarlo.' },
  { titulo: 'Producción de contenido', desc: 'Sistemas que convierten conocimiento existente en briefs, borradores, adaptaciones y materiales para diferentes audiencias y canales.' },
  { titulo: 'Revisión de marca y contenido', desc: 'Herramientas que revisan piezas según tono, mensajes, criterios editoriales y reglas definidas por la organización.' },
]

function Bullets({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map(item => (
        <li key={item} className="text-sm leading-relaxed flex items-start gap-3" style={{ opacity: dark ? 0.75 : 0.65 }}>
          <span aria-hidden="true" style={{ flexShrink: 0, opacity: 0.5, fontSize: '1.1em', lineHeight: 1.3 }}>•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function HerramientasDeIAParaMarketing() {
  return (
    <>
      <PageColorSetter bg="#EF9DB6" text={NEGRO} />
      <PageLayout
        tagline="Herramientas de IA para marketing y ventas"
        headline={<FontMix bold="IA que" italic=" trabaja." />}
        description="Diseñamos herramientas y agentes que investigan, organizan conocimiento, automatizan tareas y ejecutan procesos de marketing y ventas."
        heroBg="#EF9DB6"
        heroText={NEGRO}
        ctaHref="#contacto"
        ctaLabel="Cuéntanos qué quieres resolver →"
        contact={{
          submitLabel: 'Cuéntanos qué quieres resolver →',
        }}
      >
        {/* Bloque 02 — Idea */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="La IA genera valor" italic=" cuando resuelve un trabajo concreto." />
            </h2>
            <p className="text-base leading-relaxed opacity-65">
              Partimos por una tarea real de tu empresa. Definimos qué necesita saber, qué acciones puede ejecutar y qué resultado debe producir.
            </p>
          </div>
        </BodySection>

        {/* Bloque 03 — Producto destacado: Agentes de voz con IA */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <p className="label" style={{ opacity: 0.5 }}>Agentes de voz con IA</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col gap-4">
                <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.0 }}>
                  <FontMix bold="Pon un agente" italic=" al teléfono." />
                </h2>
                <p className="text-lead opacity-75">
                  Diseñamos agentes que atienden, llaman, califican, agendan y hacen seguimiento usando el conocimiento y las reglas de tu empresa.
                </p>
                <a href="#contacto"
                  className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit mt-2"
                  style={{ '--btn-bg': '#ffffff', '--btn-fg': NEGRO, borderRadius: '999px' } as React.CSSProperties}>
                  Quiero probar un agente →
                </a>
              </div>
              <Bullets items={agenteBullets} dark />
            </div>
          </div>
        </BodySection>

        {/* Bloque 04 — Herramientas para trabajos cotidianos */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }} className="max-w-2xl">
              <FontMix bold="Herramientas para trabajos" italic=" que tu equipo hace todos los días." />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {herramientas.map(h => (
                <div key={h.titulo} className="flex flex-col gap-3">
                  <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{h.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Bloque 05 — La forma que el trabajo necesita */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="La herramienta toma la forma" italic=" que el trabajo necesita." />
            </h2>
            <p className="text-base leading-relaxed opacity-65">
              Puede ser un agente de voz, un asistente privado, una aplicación interna, un panel de consulta o un flujo automatizado conectado a las herramientas que ya utiliza tu empresa.
            </p>
          </div>
        </BodySection>

        {/* Bloque 06 — Cierre */}
        <BodySection dark>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col gap-3" style={{ maxWidth: '38rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.0 }}>
                <FontMix bold="Empecemos" italic=" por una tarea." />
              </h2>
              <p className="text-lead opacity-70">
                Elegimos un trabajo concreto, incorporamos el conocimiento y las reglas necesarias y construimos una primera versión funcional.
              </p>
            </div>
            <a href="#contacto"
              className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit"
              style={{ '--btn-bg': 'var(--section-dark-text)', '--btn-fg': 'var(--section-dark-bg)', borderRadius: '999px' } as React.CSSProperties}>
              Cuéntanos qué quieres resolver →
            </a>
          </div>
        </BodySection>

      </PageLayout>
    </>
  )
}
