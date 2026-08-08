import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { GRUPOS_ACTIVOS, DISCIPLINAS } from '@/components/servicios-datos'

export const metadata: Metadata = {
  title: 'Servicios — Flahoolick',
  description: 'Estrategia, marca, producción y sistemas con IA para convertir conocimiento técnico en autoridad de mercado.',
}

export default function Servicios() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        headline={<FontMix bold="Tu empresa sabe" italic=" cosas que venden." />}
        description="Cuatro servicios que convierten ese conocimiento en presencia de mercado, herramientas comerciales y clientes que llegan informados."
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
        {/* Los cuatro servicios que sostienen la operación, cada uno con su propia página */}
        <BodySection title="Qué hacemos">
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.0 }}>
              <FontMix bold="Cuatro servicios," italic=" un mismo sistema." />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.1)' }}>
              {DISCIPLINAS.map(d => (
                <Link key={d.id} href={d.href}
                  className="group flex flex-col gap-3 p-8 hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: 'var(--section-body-bg)' }}>
                  <h3 className="text-base font-semibold">{d.nombre}</h3>
                  <p className="text-sm leading-relaxed opacity-65 flex-1">{d.desc}</p>
                  <span className="label opacity-40 group-hover:opacity-80 transition-opacity">Explorar →</span>
                </Link>
              ))}
            </div>
          </div>
        </BodySection>

        {/* 06 — Activos de la operación */}
        <BodySection title="Qué puede producir">
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.0 }}>
              <FontMix bold="Activos para construir" italic=" presencia y mover decisiones." />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {GRUPOS_ACTIVOS.map(grupo => (
                <div key={grupo.titulo} className="flex flex-col gap-3 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                  <h3 className="text-base font-semibold">{grupo.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{grupo.desc}</p>
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
              className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--section-dark-text)', color: 'var(--section-dark-bg)', borderRadius: '999px' }}>
              Agenda una llamada →
            </Link>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
