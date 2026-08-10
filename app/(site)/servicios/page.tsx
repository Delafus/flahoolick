import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { GRUPOS_ACTIVOS } from '@/components/servicios-datos'

export const metadata: Metadata = {
  title: 'Servicios — Flahoolick',
  description: 'Estrategia, marca, producción y sistemas con IA para convertir conocimiento técnico en autoridad de mercado.',
}

const NEGRO = '#000000'
const BEIGE_BOTON = '#EADFC8'

/** Copys propios de este módulo — distintos de los blurbs cortos de DISCIPLINAS (usados en el megamenú). */
const QUE_HACEMOS = [
  {
    numero: '01',
    titulo: 'Estrategia de contenido',
    desc: 'Diseñamos la lógica que conecta objetivos, audiencias, temas, canales y momentos de decisión.',
    href: '/servicios/estrategia-de-contenido',
  },
  {
    numero: '02',
    titulo: 'Marca y relato',
    desc: 'Definimos una voz, un relato y un sistema visual reconocible para que tu empresa ocupe un lugar propio en su mercado.',
    href: '/servicios/marca-y-relato',
  },
  {
    numero: '03',
    titulo: 'Herramientas de IA para marketing',
    desc: 'Diseñamos e implementamos herramientas con IA para investigar audiencias, aprovechar el conocimiento interno y acelerar la producción de contenido.',
    href: '/servicios/sistemas-de-contenido-con-ia',
  },
  {
    numero: '04',
    titulo: 'Producción de contenido',
    desc: 'Transformamos conocimiento técnico en piezas editoriales, comerciales y creativas que mantienen activa la presencia de tu marca.',
    href: '/servicios/produccion-de-contenido',
  },
]

export default function Servicios() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        headline={<FontMix bold="Construye" italic=" autoridad." />}
        description="Diseñamos estrategia, identidad, sistemas con IA y contenido para mantener tu marca presente durante todo el ciclo de decisión B2B."
        heroBg="#000000"
        heroText="#ffffff"
        ctaHref="#contacto"
        ctaLabel="Agenda una llamada →"
        ctaNote="30 minutos. Sin presentaciones ni decks de venta."
        contact={{
          headline: <FontMix bold="Empecemos" italic=" por el diagnóstico." />,
          submitLabel: 'Agenda una llamada →',
        }}
      >
        {/* Qué hacemos — los cuatro servicios */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.0 }}>
              <FontMix bold="Qué" italic=" hacemos" />
            </h2>
            <div className="flex flex-col gap-4" style={{ maxWidth: '46rem' }}>
              <p className="text-base leading-relaxed opacity-70">
                El 95% de tu mercado comprará en seis meses, un año o después. Hoy investiga problemas, compara soluciones y forma criterio en buscadores, LinkedIn, medios y plataformas de IA. Cada respuesta útil fortalece la autoridad de la marca que la entrega.
              </p>
              <p className="text-base leading-relaxed opacity-70">
                Flahoolick convierte el conocimiento técnico de tu empresa en una presencia continua que construye autoridad durante todo ese proceso. Cuatro servicios, un mismo sistema.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.1)' }}>
              {QUE_HACEMOS.map(s => (
                <Link key={s.numero} href={s.href}
                  className="group flex flex-col gap-4 p-8"
                  style={{ backgroundColor: 'var(--section-body-bg)' }}>
                  <div style={{ height: '2.75rem', width: '2.75rem', border: '1px solid rgba(0,0,0,0.15)' }} />
                  <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{s.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65 flex-1">{s.desc}</p>
                  <span className="btn-invert label inline-flex items-center gap-2 px-4 py-2 w-fit"
                    style={{ '--btn-bg': BEIGE_BOTON, '--btn-fg': NEGRO, borderRadius: '999px' } as React.CSSProperties}>
                    Explorar →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Lo que podemos producir */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.0 }}>
                <FontMix bold="Lo que podemos" italic=" producir" />
              </h2>
              <p className="text-base opacity-60">Activos para construir presencia y mover decisiones.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GRUPOS_ACTIVOS.map(grupo => (
                <div key={grupo.titulo} className="flex flex-col gap-3 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                  <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{grupo.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{grupo.desc}</p>
                  <p className="text-sm opacity-45">{grupo.ejemplos}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Oferta de entrada */}
        <BodySection dark>
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex flex-col gap-3" style={{ maxWidth: '38rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.0 }}>
                <FontMix bold="Empezamos con un diagnóstico" italic=" de cinco días." />
              </h2>
              <p className="text-lead opacity-70">
                Auditamos qué sabe tu empresa, cómo te ven los modelos de IA cuando tu comprador busca, y dónde están los vacíos. Te quedas con el diagnóstico, decidas lo que decidas después.
              </p>
            </div>
            <Link href="#contacto"
              className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit"
              style={{ '--btn-bg': 'var(--section-dark-text)', '--btn-fg': 'var(--section-dark-bg)', borderRadius: '999px' } as React.CSSProperties}>
              Agenda una llamada →
            </Link>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
