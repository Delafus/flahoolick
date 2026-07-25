import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'

export const metadata: Metadata = { title: 'SENSOR — Flahoolick' }

const tipos = [
  { titulo: 'Documentación técnica', desc: 'Manuales de ingeniería, fichas de producto, propuestas pasadas, normativas, presentaciones internas. Todo lo que la empresa produjo y que hoy acumula polvo en carpetas compartidas.' },
  { titulo: 'Conversaciones comerciales', desc: 'Grabaciones de reuniones de venta, transcripciones de llamadas, notas de CRM. Lo que el equipo dice en la calle pero que nunca queda documentado.' },
  { titulo: 'Objeciones y feedback', desc: 'Lo que el mercado le dice al equipo de ventas mes a mes — las preguntas que se repiten, los miedos que frenan los negocios, los argumentos que cierran.' },
  { titulo: 'Señales de mercado', desc: 'Cómo responden los modelos de lenguaje cuando el comprador ideal busca soluciones en la categoría del cliente. Dónde aparece la empresa y dónde es invisible.' },
]

const genera = [
  { titulo: 'Mapa de conocimiento', desc: 'Ordena y jerarquiza los temas con mayor valor para la empresa y sus audiencias.' },
  { titulo: 'Puntos de entrada a la categoría', desc: 'Identifica las situaciones, necesidades y problemas que activan la categoría en la mente del comprador.' },
  { titulo: 'Brechas de visibilidad', desc: 'Detecta preguntas, temas y contextos de decisión donde la empresa tiene baja presencia.' },
  { titulo: 'Agenda editorial', desc: 'Prioriza oportunidades de contenido según audiencia, punto de entrada y momento del ciclo de compra.' },
  { titulo: 'Base de producción', desc: 'Estructura los hallazgos para alimentar contenidos, activos ejecutivos y herramientas comerciales.' },
]

export default function SensorPage() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        headline="INTELIGENCIA B2B"
        tagline="SENSOR SISTEMA DE ANALISIS"
        description="El valor estratégico de una empresa vive disperso en documentos, datos, grabaciones y conversaciones comerciales. SENSOR captura, organiza y analiza esas señales para definir qué temas puede liderar la empresa, en qué momentos debe aparecer y qué necesita producir."
        heroBg="#000000"
        heroText="#ffffff"
        illustration={{ src: '/sensor-cover.svg', alt: 'SENSOR — captura y modela el conocimiento de tu empresa', ratio: '1/1' }}
      >
        <BodySection title="Tipos de material que procesamos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.08)' }}>
            {tipos.map((t, i) => (
              <div key={i} className="flex flex-col gap-4 p-10" style={{ backgroundColor: 'var(--section-body-bg)' }}>
                <p className="label opacity-25">{String(i+1).padStart(2,'0')}</p>
                <h3 className="text-base font-semibold">{t.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-60">{t.desc}</p>
              </div>
            ))}
          </div>
        </BodySection>
        <BodySection dark title="Lo que genera SENSOR">
          <p className="text-lg font-light opacity-70 max-w-2xl">
            El sistema convierte fuentes internas y señales del mercado en una base priorizada para orientar la estrategia, el contenido y las herramientas comerciales.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {genera.map((g, i) => (
              <div key={i} className="flex flex-col gap-4 p-10" style={{ backgroundColor: 'var(--section-dark-bg)' }}>
                <p className="label opacity-25">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-base font-semibold">{g.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-60">{g.desc}</p>
              </div>
            ))}
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
