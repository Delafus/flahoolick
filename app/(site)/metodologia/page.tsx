import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, Tags, FontMix } from '@/components/page-layout'

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
    titulo: 'Entendemos el negocio',
    parrafos: [
      'Revisamos la oferta, los objetivos, el mercado y el proceso comercial.',
      'Hablamos con las personas que conocen el negocio desde dentro.',
      'Analizamos sitios, presentaciones, documentos, reuniones, datos y materiales de venta.',
    ],
    recibe: 'un diagnóstico claro de la situación y las oportunidades.',
  },
  {
    numero: '02',
    titulo: 'Ordenamos lo que sabes',
    parrafos: [
      'Identificamos las ideas, argumentos, preguntas y pruebas que tienen valor para el mercado.',
      'Definimos qué necesita escuchar cada audiencia durante el proceso de decisión.',
      'Establecemos prioridades para evitar esfuerzos dispersos.',
    ],
    recibe: 'un mapa de audiencias, mensajes, temas y necesidades.',
  },
  {
    numero: '03',
    titulo: 'Construimos la respuesta',
    parrafos: [
      'Convertimos el conocimiento en una solución concreta.',
      'Puede ser una estrategia, una marca, una campaña, un sistema de contenido, una herramienta comercial o una plataforma con inteligencia artificial.',
      'Cada proyecto se diseña para resolver una necesidad específica.',
    ],
    recibe: 'piezas, herramientas y sistemas listos para usar.',
  },
  {
    numero: '04',
    titulo: 'Lo ponemos en circulación',
    parrafos: [
      'Publicamos, distribuimos y conectamos el trabajo con marketing, ventas y equipos técnicos.',
      'Medimos qué genera atención, qué ayuda a explicar y qué aporta al proceso comercial.',
      'Usamos esos aprendizajes para definir el siguiente movimiento.',
    ],
    recibe: 'un plan de distribución, medición y mejora.',
  },
]

const MATERIA_PRIMA = ['Especialistas', 'Documentos', 'Datos', 'Reuniones', 'Casos', 'Presentaciones', 'Preguntas de clientes', 'Objeciones comerciales', 'Experiencia acumulada']

const COMO_EMPEZAR = [
  { titulo: 'Diagnóstico', desc: 'Analizamos una necesidad concreta y definimos qué conviene hacer.' },
  { titulo: 'Proyecto', desc: 'Construimos una solución con alcance, entregables y fechas claras.' },
  { titulo: 'Programa continuo', desc: 'Trabajamos durante varios meses para producir, distribuir y mejorar el sistema.' },
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
        ctaLabel="Cuéntanos qué necesitas resolver →"
      >
        {/* Cuatro pasos. Una misma lógica. */}
        <BodySection title="Cuatro pasos. Una misma lógica.">
          <div id="como-trabajamos" className="flex flex-col" style={{ scrollMarginTop: '90px' }}>
            {PASOS.map(p => (
              <div key={p.numero} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
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

        {/* Trabajamos con lo que tu empresa ya tiene */}
        <BodySection dark title="Trabajamos con lo que tu empresa ya tiene">
          <div className="flex flex-col gap-8">
            <Tags items={MATERIA_PRIMA} dark />
            <p className="text-lead opacity-75" style={{ maxWidth: '42rem' }}>
              Encontramos el valor que vive dentro de la organización y lo convertimos en algo que el mercado puede encontrar, entender y recordar.
            </p>
          </div>
        </BodySection>

        {/* Cómo podemos empezar */}
        <BodySection title="Cómo podemos empezar">
          <div id="como-empezar" className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ scrollMarginTop: '90px' }}>
            {COMO_EMPEZAR.map(c => (
              <div key={c.titulo} className="flex flex-col gap-3 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                <h3 className="text-base font-semibold">{c.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-65">{c.desc}</p>
              </div>
            ))}
          </div>
        </BodySection>

        {/* Cierre — sin CTA repetido, el contacto está justo debajo */}
        <BodySection dark>
          <div className="flex flex-col items-center text-center gap-4" style={{ maxWidth: '42rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.0 }}>
              <FontMix bold="Tu empresa ya hizo" italic=" la parte difícil: aprender." />
            </h2>
            <p className="text-lead opacity-70">Ahora hagamos que ese conocimiento trabaje.</p>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
