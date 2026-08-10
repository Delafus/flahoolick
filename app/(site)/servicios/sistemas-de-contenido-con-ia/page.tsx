import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, FontMix } from '@/components/page-layout'
import { ServicioCards } from '@/components/servicio-cards'
import { DotGrid } from '@/components/dot-grid'

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

const comoUsamosIA = [
  { titulo: 'Ingestamos el conocimiento existente.', desc: 'Procesamos PDFs técnicos, transcripciones de reuniones, propuestas y grabaciones de llamadas — sin pedirle tiempo al equipo del cliente.' },
  { titulo: 'Detectamos señales y patrones.', desc: 'Identificamos qué temas tienen mayor potencial de autoridad para el ICP del cliente y en qué momento del ciclo de decisión.' },
  { titulo: 'Monitoreamos la visibilidad en IA.', desc: 'Auditamos cómo responden ChatGPT, Perplexity y Claude cuando el comprador ideal busca soluciones en la categoría del cliente.' },
  { titulo: 'Validamos con criterio humano.', desc: 'La IA procesa. El equipo senior de Flahoolick revisa, prioriza y decide qué se produce. Ese orden es inamovible.' },
]

export default function SistemasDeContenidoConIA() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Sistemas de Contenido con IA"
        headline={<FontMix bold="IA a escala." italic=" Criterio senior." />}
        description="La infraestructura que captura, prioriza y distribuye tu conocimiento todos los meses."
        heroBg="#F09DB6"
        heroText={NEGRO}
        illustrationNode={<DotGrid behavior="respiracion-fijo" color={NEGRO} />}
        ctaHref="#contacto"
        ctaLabel="Agenda una llamada →"
      >
        {/* Bloque de apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="Tu empresa olvida" italic=" cosas valiosas todos los días." />
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
                <div key={p.titulo} className="flex flex-row gap-4 p-8" style={{ backgroundColor: NEGRO }}>
                  <div style={{ height: 'calc(1.3em * 2)', width: 'calc(1.3em * 2)', border: '1px solid rgba(255,255,255,0.2)', flexShrink: 0 }} />
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-bricolage)' }}>{p.titulo}</h3>
                    <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Qué construimos */}
        <BodySection title="Qué construimos">
          <ServicioCards items={construimos} color={NEGRO} />
        </BodySection>

        {/* Cómo usamos la IA nosotros mismos */}
        <BodySection title="Así usamos la IA nosotros">
          <HowList items={comoUsamosIA} />
        </BodySection>

      </PageLayout>
    </>
  )
}
