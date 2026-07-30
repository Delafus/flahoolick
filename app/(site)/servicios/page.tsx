import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'
import { ServiciosEtapas } from '@/components/servicios-etapas'
import { SERVICIOS, GRUPOS_ACTIVOS } from '@/components/servicios-datos'

export const metadata: Metadata = {
  title: 'Servicios — Flahoolick',
  description: 'Ordenamos qué debe llegar al mercado, instalamos la forma de producirlo o dirigimos la operación editorial mes a mes.',
}

export default function Servicios() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        tagline="Servicios"
        headline="Empieza donde tu operación se corta."
        description="Ordenamos qué debe llegar al mercado, instalamos la forma de producirlo o dirigimos la operación editorial mes a mes."
        heroBg="#000000"
        heroText="#ffffff"
        ctaHref="#contacto"
        ctaLabel="Hablemos →"
        contact={{
          headline: '¿Dónde se corta hoy tu operación?',
          description: 'Cuéntanos si necesitas ordenar prioridades, instalar el sistema o sostener la producción.',
          note: 'Te propondremos un punto de entrada concreto.',
          submitLabel: 'Hablemos →',
          etapaField: true,
        }}
      >
        {/* 02 — Tres puntos de entrada */}
        <BodySection title="Tres puntos de entrada">
          <div className="flex flex-col gap-10">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Elige dónde empezar.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
              style={{ background: 'rgba(0,0,0,0.12)' }}>
              {SERVICIOS.map(servicio => (
                <a key={servicio.id} href={`#${servicio.id}`}
                  className="group flex flex-col gap-4 p-8 hover:opacity-70 transition-opacity"
                  style={{ backgroundColor: 'var(--section-body-bg)' }}>
                  <p className="label opacity-40">{servicio.numero} — {servicio.nombre}</p>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                    lineHeight: 1.15,
                  }}>
                    {servicio.tarjeta.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-65">{servicio.tarjeta.paraQuien}</p>

                  <div className="flex flex-col gap-1 mt-2 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.12)' }}>
                    <p className="label opacity-40" style={{ fontSize: '0.6rem' }}>Recibes</p>
                    <p className="text-sm font-semibold">{servicio.tarjeta.entregable}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="label opacity-40" style={{ fontSize: '0.6rem' }}>Duración</p>
                    <p className="text-sm font-semibold">{servicio.tarjeta.duracion}</p>
                  </div>

                  <span className="label opacity-50 group-hover:opacity-90 transition-opacity mt-2">
                    {servicio.tarjeta.ctaLabel}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </BodySection>

        {/* 03, 04, 05 — Las tres secciones profundas */}
        <ServiciosEtapas />

        {/* 06 — Activos de la operación */}
        <BodySection title="Qué puede producir">
          <div className="flex flex-col gap-10">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Activos para construir presencia y mover decisiones.
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

        {/* 07 — Puente hacia Metodología: breve, sin repetir el método completo */}
        <BodySection dark title="Un mismo método">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}>
                Tres servicios. Un sistema común.
              </h2>
              <p className="text-base leading-relaxed opacity-70" style={{ maxWidth: '32rem' }}>
                Cada punto de entrada trabaja sobre el Sistema de Autoridad de Flahoolick.
              </p>
            </div>
            <Link href="/metodologia"
              className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
              style={{ color: 'var(--section-dark-text)', borderColor: 'var(--section-dark-text)' }}>
              Explorar metodología →
            </Link>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
