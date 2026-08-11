import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Estrategia de Contenido — Flahoolick' }

const NEGRO = '#000000'

const construimos = [
  { numero: '01', titulo: 'Territorios de autoridad', desc: 'Definimos los temas donde tu empresa reúne conocimiento, credenciales y una oportunidad real de liderar la conversación.' },
  { numero: '02', titulo: 'Mapa de audiencias y decisiones', desc: 'Identificamos quién participa, qué necesita entender y qué preguntas aparecen durante el ciclo comercial.' },
  { numero: '03', titulo: 'Arquitectura de mensajes', desc: 'Ordenamos la promesa central, los argumentos técnicos y las pruebas que sostienen el relato.' },
  { numero: '04', titulo: 'Roadmap de contenido', desc: 'Priorizamos temas, formatos, canales y momentos de publicación para los próximos 90 días.' },
]

const comoLoHacemos = [
  { numero: '01', titulo: 'Leemos', texto: 'Auditamos el contenido existente, revisamos a la competencia y entrevistamos a quienes concentran conocimiento técnico y comercial.' },
  { numero: '02', titulo: 'Definimos', texto: 'Tomamos decisiones sobre audiencias, territorios, mensajes, canales y formatos.' },
  { numero: '03', titulo: 'Ordenamos', texto: 'Convertimos esas decisiones en una hoja de ruta que marketing, ventas y los equipos técnicos pueden aplicar.' },
]

const recibes = [
  'Audiencias y momentos de decisión.',
  'Territorios de autoridad.',
  'Arquitectura de mensajes.',
  'Argumentos y pruebas.',
  'Canales y formatos.',
  'Roadmap de 90 días.',
  'Indicadores de seguimiento.',
]

export default function EstrategiaDeContenido() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Estrategia de contenido"
        headline={<FontMix bold="Ponle cerebro" italic=" al calendario." />}
        description="Diseñamos la lógica que conecta objetivos, audiencias, temas, canales y momentos de decisión."
        heroBg="#F09DB6"
        heroText={NEGRO}
        ctaHref="#contacto"
        ctaLabel="Diseñemos la estrategia →"
        contact={{
          headline: <FontMix bold="Tu empresa ya tiene conocimiento." italic=" Démosle dirección." />,
          submitLabel: 'Agenda una conversación →',
        }}
      >
        {/* Apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="La frecuencia" italic=" necesita dirección." />
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lead opacity-80">
                Tu empresa produce artículos, presentaciones, casos, campañas y materiales de venta.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                La estrategia asigna a cada pieza una audiencia, una función y un momento.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                Así, el contenido acumula reconocimiento y construye una posición clara en el mercado.
              </p>
            </div>
          </div>
        </BodySection>

        {/* Qué construimos */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="Qué" italic=" construimos" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {construimos.map(item => (
                <div key={item.numero} className="flex flex-col gap-3">
                  <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{item.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Cómo lo hacemos */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="Partimos desde lo que" italic=" tu empresa ya sabe." />
            </h2>
            <div className="flex flex-col">
              {comoLoHacemos.map(p => (
                <div key={p.numero} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <h3 className="md:col-span-4" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)', lineHeight: 1.1 }}>
                    {p.numero} {p.titulo}
                  </h3>
                  <p className="md:col-span-8 text-sm leading-relaxed opacity-65">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Entrega — mockup del playbook + qué recibes */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto', border: '1px solid rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
            </div>
            <div className="flex flex-col gap-6">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
                <FontMix bold="Recibes una estrategia" italic=" lista para usar." />
              </h2>
              <p className="text-base opacity-70">Entregamos un playbook que reúne:</p>
              <div className="flex flex-col gap-2">
                {recibes.map(r => (
                  <p key={r} className="text-base" style={{ paddingLeft: '1.25rem', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>—</span>
                    {r}
                  </p>
                ))}
              </div>
              <p className="text-sm leading-relaxed opacity-60 mt-2">
                Un proyecto típico toma entre cuatro y seis semanas. El alcance considera mercados, unidades de negocio, audiencias y material disponible.
              </p>
            </div>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
