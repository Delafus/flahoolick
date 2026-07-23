import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, Tags } from '@/components/page-layout'

export const metadata: Metadata = { title: 'SENSOR — Flahoolick' }

const tipos = [
  { titulo: 'Documentación técnica', desc: 'Manuales de ingeniería, fichas de producto, propuestas pasadas, normativas, presentaciones internas. Todo lo que la empresa produjo y que hoy acumula polvo en carpetas compartidas.' },
  { titulo: 'Conversaciones comerciales', desc: 'Grabaciones de reuniones de venta, transcripciones de llamadas, notas de CRM. Lo que el equipo dice en la calle pero que nunca queda documentado.' },
  { titulo: 'Objeciones y feedback', desc: 'Lo que el mercado le dice al equipo de ventas mes a mes — las preguntas que se repiten, los miedos que frenan los negocios, los argumentos que cierran.' },
  { titulo: 'Señales de mercado', desc: 'Cómo responden los modelos de lenguaje cuando el comprador ideal busca soluciones en la categoría del cliente. Dónde aparece la empresa y dónde es invisible.' },
]

const produce = [
  'Mapa de conocimiento con valor de contenido jerarquizado',
  'Identificación de vacíos de visibilidad en plataformas de IA',
  'Oportunidades editoriales ordenadas por audiencia y momento de compra',
  'Materia prima estructurada lista para el ciclo de producción',
]

export default function SensorPage() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        headline="SENSOR"
        tagline="KNOWLEDGE CAPTURED"
        description="La mayoría del conocimiento valioso de una empresa ya existe — en documentos, en grabaciones, en conversaciones comerciales que no dejan registro. SENSOR es el módulo con el que Flahoolick captura ese material y lo convierte en materia prima estratégica."
        heroBg="#000000"
        heroText="#ffffff"
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
        <BodySection dark title="Qué produce SENSOR"><Tags items={produce} dark /></BodySection>
      </PageLayout>
    </>
  )
}
