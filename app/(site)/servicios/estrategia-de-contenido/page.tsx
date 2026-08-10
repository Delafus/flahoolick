import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { ServicioCards } from '@/components/servicio-cards'
import { DotGrid } from '@/components/dot-grid'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Estrategia de Contenido — Flahoolick' }

const NEGRO = '#000000'

const problemas = [
  { titulo: 'Publicas sobre demasiadas cosas', desc: 'Definimos los territorios donde tu empresa puede hablar con autoridad.' },
  { titulo: 'Intentas hablarle a todo el mercado', desc: 'Identificamos quién necesita escuchar qué durante cada momento de la decisión.' },
  { titulo: 'Produces piezas que trabajan por separado', desc: 'Asignamos una función comercial y editorial a cada contenido.' },
  { titulo: 'Decides la pauta desde la urgencia', desc: 'Creamos prioridades, ritmos y criterios claros para decidir qué producir.' },
]

const pasos = [
  { numero: '01', titulo: 'Arquitectura', desc: 'Ordenamos mensajes, temas, audiencias, formatos y canales.' },
  { numero: '02', titulo: 'Recorrido', desc: 'Mapeamos las preguntas que aparecen durante el ciclo comercial.' },
  { numero: '03', titulo: 'Sistema', desc: 'Definimos cómo encontrar, producir, aprobar, distribuir y medir contenido.' },
  { numero: '04', titulo: 'Plan', desc: 'Convertimos la estrategia en un roadmap listo para ejecutar.' },
]

const categorias = [
  { titulo: 'Inteligencia', items: ['Auditoría de contenido', 'Análisis de brechas', 'Inteligencia de audiencias', 'Benchmark competitivo'] },
  { titulo: 'Arquitectura', items: ['Mapa del proceso de decisión', 'Arquitectura de mensajes', 'Pilares editoriales', 'Territorios temáticos'] },
  { titulo: 'Circulación', items: ['Plan de canales', 'SEO y visibilidad en buscadores con IA', 'Estrategia de distribución', 'Calendario editorial'] },
  { titulo: 'Medición', items: ['Roadmap de contenido', 'Indicadores', 'Modelo de medición', 'Criterios de optimización'] },
]

const recibes = ['Qué decir', 'A quién hablar', 'Qué producir', 'Dónde distribuir', 'Cómo medir', 'Cómo sostener la operación']

const faqPagina = [
  {
    q: '¿Cómo trabajan con nuestro equipo interno?',
    a: 'Generalmente coordinamos con marketing, dirección comercial o dirección general. Capturamos el conocimiento con entrevistas breves y material que ya existe — no necesitas liberar tiempo del equipo para reuniones extensas de briefing.',
  },
  {
    q: '¿Cuánto tarda en verse resultados?',
    a: 'Las primeras piezas de autoridad salen en las primeras tres semanas. La disponibilidad de mercado — que te recuerden cuando decidan buscar — se construye en ciclos de 12 a 24 meses.',
  },
  {
    q: '¿Qué pasa si ya tenemos una estrategia hecha?',
    a: 'Partimos con el diagnóstico de cinco días: revisamos lo que ya tienen, identificamos qué funciona y dónde hay vacíos. Si la estrategia existente sigue siendo sólida, la usamos como base en vez de partir de cero.',
  },
]

export default function EstrategiaDeContenido() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Estrategia de Contenido"
        headline={<FontMix bold="El mapa" italic=" antes que las piezas." />}
        description="Definimos qué decir, a quién, cuándo y por qué canal — antes de producir nada."
        heroBg="#F09DB6"
        heroText={NEGRO}
        illustrationNode={<DotGrid behavior="cursor-magnetico" color={NEGRO} />}
        ctaHref="#contacto"
        ctaLabel="Agenda una llamada →"
        contact={{ headline: <FontMix bold="Empecemos" italic=" por el diagnóstico." /> }}
      >
        {/* Bloque de apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="Tu empresa tiene ideas." italic=" Necesita dirección." />
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-lead opacity-80">
                Cada pieza recibe una función. Cada canal recibe una razón. Cada esfuerzo empuja en la misma dirección.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                El conocimiento aparece en reuniones, presentaciones, conversaciones comerciales, documentos y especialistas. Encontramos las ideas con valor, las ordenamos y definimos cómo ponerlas frente al mercado.
              </p>
            </div>
          </div>
        </BodySection>

        {/* Qué construimos — secuencia de pasos con scroll-reveal */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <p className="label opacity-40">Qué construimos</p>
            <ServicioCards items={pasos} color={NEGRO} />
          </div>
        </BodySection>

        {/* Qué resolvemos — título + 4 cards en 2 columnas (1 en mobile) */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <p className="label opacity-50">Qué resolvemos</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {problemas.map(p => (
                <div key={p.titulo} className="flex flex-col gap-3 p-8" style={{ backgroundColor: NEGRO }}>
                  <h3 className="text-lg font-semibold">{p.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Qué incluye — lista visible en dos columnas, con CTA al costado */}
        <BodySection title="Qué incluye">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {categorias.map(c => (
                <div key={c.titulo} className="flex flex-col gap-3">
                  <h3 className="text-base font-semibold">{c.titulo}</h3>
                  <ul className="flex flex-col gap-1.5">
                    {c.items.map(item => (
                      <li key={item} className="text-sm leading-relaxed opacity-65">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 items-start" style={{ maxWidth: '18rem' }}>
              <p className="text-sm opacity-60">¿Necesitas algo específico de esta lista?</p>
              <Link href="#contacto"
                className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit"
                style={{ '--btn-bg': NEGRO, '--btn-fg': '#ffffff', borderRadius: '999px' } as React.CSSProperties}>
                Agenda una llamada →
              </Link>
            </div>
          </div>
        </BodySection>

        {/* Qué recibes — mockup del playbook */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', opacity: 0.12, transform: 'rotate(-6deg) translate(14px, 10px)', borderRadius: '8px' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ffffff', opacity: 0.18, transform: 'rotate(3deg) translate(-8px, -6px)', borderRadius: '8px' }} />
              <div style={{
                position: 'absolute', inset: 0, backgroundColor: '#ffffff', borderRadius: '8px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem 2rem',
              }}>
                <p className="label" style={{ color: NEGRO, opacity: 0.5 }}>Playbook</p>
                <h3 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.05, color: NEGRO }}>
                  <FontMix bold="Estrategia de Contenido" />
                </h3>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
                <FontMix bold="Playbook de" italic=" estrategia de contenido" />
              </h2>
              <p className="text-base opacity-70">Un sistema operativo para decidir:</p>
              <div className="flex flex-col">
                {recibes.map(r => (
                  <p key={r} className="text-base py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>{r}</p>
                ))}
              </div>
            </div>
          </div>
        </BodySection>

        {/* Cómo cobramos — precios con placeholder, Felipe entrega las cifras */}
        <BodySection title="Cómo cobramos">
          <div className="flex flex-col gap-8" style={{ maxWidth: '38rem' }}>
            <div className="flex flex-col gap-4">
              <p className="text-base leading-relaxed opacity-70">
                El diagnóstico de visibilidad tiene un valor fijo de <strong style={{ opacity: 1 }}>$[PRECIO] CLP</strong> y se entrega en cinco días hábiles. Te quedas con él, decidas lo que decidas después.
              </p>
              <p className="text-base leading-relaxed opacity-70">
                Los proyectos de estrategia son fee fijo con entregables definidos, desde <strong style={{ opacity: 1 }}>$[PRECIO] CLP</strong>.
              </p>
              <p className="text-base leading-relaxed opacity-70">
                Los programas continuos van por retainer mensual, según alcance y cadencia de producción.
              </p>
            </div>
            <Link href="#contacto"
              className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit"
              style={{ '--btn-bg': NEGRO, '--btn-fg': '#ffffff', borderRadius: '999px' } as React.CSSProperties}>
              Agenda una llamada →
            </Link>
          </div>
        </BodySection>

        {/* FAQ de la página — 3 preguntas, resuelven las objeciones de compra */}
        <BodySection dark title="Preguntas frecuentes">
          <div className="flex flex-col" style={{ maxWidth: '44rem' }}>
            {faqPagina.map(f => (
              <div key={f.q} className="flex flex-col gap-2 py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <h3 className="text-base font-semibold">{f.q}</h3>
                <p className="text-sm leading-relaxed opacity-65">{f.a}</p>
              </div>
            ))}
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
