import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, Tags } from '@/components/page-layout'

export const metadata: Metadata = { title: 'SENSOR — Flahoolick' }
const sensores = [
  { titulo: 'Sensores comerciales.', desc: 'Conectamos a grabaciones de llamadas de venta, notas de CRM y registros de objeciones para capturar lo que el mercado le dice a tu equipo todos los días.' },
  { titulo: 'Sensores técnicos.', desc: 'Procesamos manuales de ingeniería, fichas de producto, propuestas técnicas, normativas y documentación interna que hoy acumula polvo en carpetas compartidas.' },
  { titulo: 'Sensores de mercado.', desc: 'Monitoreamos cómo responden ChatGPT, Perplexity y Claude cuando tu comprador ideal busca soluciones en tu categoría. Identificamos dónde tu empresa es invisible.' },
  { titulo: 'Sensores de contenido.', desc: 'Medimos qué piezas usa el equipo de ventas, cuáles generan respuesta en LinkedIn y cuáles aceleran el ciclo de cierre.' },
]
const produce = ['Diagnóstico de conocimiento interno','Mapa de señales técnicas y comerciales por audiencia','Identificación de vacíos de visibilidad en plataformas de IA','Materia prima estructurada lista para el ciclo editorial']

export default function SensorPage() {
  return (
    <>
      <PageColorSetter bg="var(--page-sensor-bg)" text="var(--page-sensor-text)" />
      <PageLayout eyebrow="Tu conocimiento, capturado." headline="SENSOR"
        description="Tu empresa genera conocimiento valioso todos los días. SENSOR es el módulo que lo captura, lo ordena y lo convierte en materia prima estratégica lista para trabajar."
        heroBg="var(--page-sensor-bg)" heroText="var(--page-sensor-text)"
        ctaLabel="Activar el sistema →">
        <BodySection title="Los cuatro sensores">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.1)' }}>
            {sensores.map((s, i) => (
              <div key={i} className="flex flex-col gap-4 p-10" style={{ backgroundColor: 'var(--section-body-bg)' }}>
                <p className="label opacity-25">{String(i+1).padStart(2,'0')}</p>
                <h3 className="text-base font-semibold">{s.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-60">{s.desc}</p>
              </div>
            ))}
          </div>
        </BodySection>
        <BodySection dark title="Qué produce SENSOR"><Tags items={produce} dark /></BodySection>
      </PageLayout>
    </>
  )
}
