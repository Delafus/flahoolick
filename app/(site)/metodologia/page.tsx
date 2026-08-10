import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { MetodologiaPasos } from '@/components/metodologia-pasos'

export const metadata: Metadata = {
  title: 'Metodología — Flahoolick',
  description: 'Entramos al negocio, encontramos lo que vale, lo convertimos en mensajes, contenidos y herramientas, y lo ponemos frente al mercado.',
}

const PASOS = [
  {
    numero: '01',
    slug: 'encontramos',
    titulo: 'Encontramos',
    texto: 'Entramos al negocio. Revisamos la oferta, el mercado y el proceso comercial. Detectamos conocimiento valioso, oportunidades y brechas de comunicación.',
    resultado: 'Un diagnóstico con hallazgos, oportunidades y prioridades.',
    kind: 'find' as const,
  },
  {
    numero: '02',
    slug: 'ordenamos',
    titulo: 'Ordenamos',
    texto: 'Definimos las audiencias, los mensajes, los temas y las pruebas que tienen mayor valor para el mercado. Establecemos una dirección común para marketing, ventas y equipos técnicos.',
    resultado: 'Un mapa estratégico que orienta las decisiones y la producción.',
    kind: 'order' as const,
  },
  {
    numero: '03',
    slug: 'circulacion',
    titulo: 'Ponemos en circulación',
    texto: 'Convertimos el mapa en un sistema de trabajo. Definimos prioridades, responsables, formatos, canales y criterios de medición.',
    resultado: 'Una hoja de ruta preparada para producir, medir y mejorar.',
    kind: 'circulate' as const,
  },
]

export default function Metodologia() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        tagline="Metodología"
        headline={<FontMix bold="Del conocimiento disperso" italic=" a un sistema que trabaja." />}
        description="Encontramos lo que tu empresa sabe, lo ordenamos según su valor para el mercado y lo convertimos en un sistema capaz de construir presencia continua."
        heroBg="#000000"
        heroText="#ffffff"
        ctaHref="#contacto"
        ctaLabel="Conversemos →"
        contact={{
          description: 'Hagamos que el mercado lo encuentre, lo entienda y lo recuerde.',
          submitLabel: 'Conversemos →',
        }}
      >
        {/* Cómo trabajamos — tres pasos, cada uno en su propia franja */}
        <BodySection>
          <div id="como-trabajamos" className="flex flex-col gap-10" style={{ scrollMarginTop: '90px' }}>
            <div className="flex flex-col gap-3">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.0 }}>
                <FontMix bold="Tres pasos." italic=" Una misma lógica." />
              </h2>
              <p className="text-base opacity-70" style={{ maxWidth: '42rem' }}>
                Cada proyecto comienza dentro de la empresa. Ahí están el conocimiento, las pruebas y las ideas que pueden darle una posición propia en el mercado.
              </p>
            </div>
            <MetodologiaPasos pasos={PASOS} />
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
