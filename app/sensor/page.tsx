import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { BodySection } from '@/components/page-layout'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'SENSOR — Flahoolick',
  description: 'El módulo de inteligencia de contenido de Flahoolick.',
}

const tipos = [
  {
    titulo: 'Documentación técnica',
    desc: 'Manuales de ingeniería, fichas de producto, propuestas pasadas, normativas, presentaciones internas. Todo lo que la empresa produjo y que hoy acumula polvo en carpetas compartidas.',
  },
  {
    titulo: 'Conversaciones comerciales',
    desc: 'Grabaciones de reuniones de venta, transcripciones de llamadas, notas de CRM. Lo que el equipo dice en la calle pero que nunca queda documentado.',
  },
  {
    titulo: 'Objeciones y feedback',
    desc: 'Lo que el mercado le dice al equipo de ventas mes a mes — las preguntas que se repiten, los miedos que frenan los negocios, los argumentos que cierran.',
  },
  {
    titulo: 'Señales de mercado',
    desc: 'Cómo responden los modelos de lenguaje cuando el comprador ideal busca soluciones en la categoría del cliente. Dónde aparece la empresa y dónde es invisible.',
  },
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
      <PageColorSetter bg="#3B0B2C" text="#ffffff" />

      {/* Hero */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: 'var(--page-sensor-bg)', color: 'var(--page-sensor-text)' }}
      >
        <div className="max-container w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          <div className="hidden md:flex aspect-square max-h-96 w-full items-center justify-center"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="label opacity-20" style={{ color: 'var(--page-sensor-text)' }}>Ilustración</p>
          </div>
          <div className="flex flex-col gap-8">
              El conocimiento ya existe. SENSOR lo captura.
            </p>
            <h1 className="text-display" style={{ color: 'var(--page-sensor-text)' }}>SENSOR</h1>
            <p className="text-lg font-light leading-relaxed max-w-md opacity-70"
              style={{ color: 'var(--page-sensor-text)' }}>
              La mayoría del conocimiento valioso de una empresa ya existe — en documentos, en grabaciones, en conversaciones comerciales que no dejan registro. SENSOR es el módulo con el que Flahoolick captura ese material, lo procesa con inteligencia artificial y lo convierte en la materia prima de todo el trabajo que viene después.
            </p>
            <Link href="/#contacto"
              className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
              style={{ color: 'var(--page-sensor-text)', borderColor: 'var(--page-sensor-text)' }}>
              Conversemos →
            </Link>
          </div>
        </div>
      </section>

      {/* Qué procesamos */}
      <BodySection title="Tipos de material que procesamos">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.08)' }}>
          {tipos.map((t, i) => (
            <div key={i} className="flex flex-col gap-4 p-10"
              style={{ backgroundColor: 'var(--section-body-bg)' }}>
              <p className="label opacity-25">{String(i+1).padStart(2,'0')}</p>
              <h3 className="text-base font-semibold">{t.titulo}</h3>
              <p className="text-sm leading-relaxed opacity-60">{t.desc}</p>
            </div>
          ))}
        </div>
      </BodySection>

      {/* Cómo funciona */}
      <BodySection title="Cómo funciona">
        <div className="flex flex-col">
          {[
            { titulo: 'El cliente comparte su material.', desc: 'Documentos, grabaciones, briefs, propuestas. Lo que tenga disponible — no hace falta preparar nada ni redactar briefs.' },
            { titulo: 'Flahoolick lo carga en el módulo.', desc: 'El equipo ingesta el material y lo procesa. El cliente no opera nada — ese trabajo lo hacemos nosotros.' },
            { titulo: 'SENSOR identifica qué tiene valor.', desc: 'El sistema encuentra qué temas tienen potencial de autoridad, para qué audiencia y en qué momento del ciclo de compra.' },
            { titulo: 'El equipo senior revisa y entrega.', desc: 'Flahoolick revisa el output, prioriza y entrega un mapa estructurado de oportunidades editoriales listo para trabajar.' },
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10"
              style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <p className="label opacity-25 md:col-span-1">{String(i+1).padStart(2,'0')}</p>
              <div className="md:col-span-11 flex flex-col md:flex-row gap-6">
                <h3 className="text-base font-semibold md:w-72 shrink-0">{item.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-60">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </BodySection>

      {/* Qué produce */}
      <section className="page-px py-16" style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}>
        <div className="max-container flex flex-col gap-8">
          <p className="label opacity-40">Qué produce</p>
          <div className="flex flex-wrap gap-3">
            {produce.map(p => (
              <span key={p} className="text-sm opacity-70 px-4 py-2"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
