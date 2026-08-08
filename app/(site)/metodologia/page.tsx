import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'

export const metadata: Metadata = {
  title: 'Metodología — Flahoolick',
  description: 'Entramos al negocio, encontramos lo que vale, lo convertimos en mensajes, contenidos y herramientas, y lo ponemos frente al mercado.',
}

const headingStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
} as const

const PASOS = [
  {
    numero: '01',
    slug: 'encontramos',
    titulo: 'Encontramos',
    parrafos: [
      'Revisamos la oferta, los objetivos, el mercado y el proceso comercial.',
      'Hablamos con las personas que conocen el negocio desde dentro.',
      'Analizamos sitios, presentaciones, documentos, reuniones, datos y materiales de venta.',
    ],
    recibe: 'un diagnóstico claro de la situación y las oportunidades.',
  },
  {
    numero: '02',
    slug: 'ordenamos',
    titulo: 'Ordenamos',
    parrafos: [
      'Identificamos las ideas, argumentos, preguntas y pruebas que tienen valor para el mercado.',
      'Definimos qué necesita escuchar cada audiencia durante el proceso de decisión.',
      'Establecemos prioridades para evitar esfuerzos dispersos.',
    ],
    recibe: 'un mapa de audiencias, mensajes, temas y necesidades.',
  },
  {
    numero: '03',
    slug: 'circulacion',
    titulo: 'Ponemos en circulación',
    parrafos: [
      'Convertimos ese orden en la solución concreta: una estrategia, una marca, un sistema de contenido, una herramienta comercial o una plataforma con inteligencia artificial.',
      'La publicamos, la distribuimos y la conectamos con marketing, ventas y equipos técnicos.',
      'Medimos qué genera atención, qué ayuda a explicar y qué aporta al proceso comercial, y usamos esos aprendizajes para seguir mejorando.',
    ],
    recibe: 'piezas, sistemas y herramientas en funcionamiento, con un plan de medición y mejora.',
  },
]

export default function Metodologia() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        tagline="Metodología"
        headline={<FontMix bold="Del conocimiento disperso" italic=" a un sistema que trabaja." />}
        description="Entramos al negocio, encontramos lo que vale, lo convertimos en mensajes, contenidos y herramientas, y lo ponemos frente al mercado."
        heroBg="#000000"
        heroText="#ffffff"
        ctaHref="#contacto"
        ctaLabel="Agenda una llamada →"
      >
        {/* Tres pasos. Una misma lógica. */}
        <BodySection title="Tres pasos. Una misma lógica.">
          <div id="como-trabajamos" className="flex flex-col" style={{ scrollMarginTop: '90px' }}>
            {PASOS.map(p => (
              <div key={p.numero} id={`paso-${p.slug}`} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', scrollMarginTop: '90px' }}>
                <div className="md:col-span-4">
                  <p className="label opacity-40">{p.numero}</p>
                  <h3 style={{ ...headingStyle, fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', marginTop: '0.5rem' }}>{p.titulo}</h3>
                </div>
                <div className="md:col-span-8 flex flex-col gap-3">
                  {p.parrafos.map(t => (
                    <p key={t} className="text-sm leading-relaxed opacity-65">{t}</p>
                  ))}
                  <p className="text-sm mt-2">
                    <span className="opacity-45">Recibes: </span>
                    <span className="font-semibold">{p.recibe}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
