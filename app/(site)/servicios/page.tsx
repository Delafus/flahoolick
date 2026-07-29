import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'
import { ServiciosEtapas } from '@/components/servicios-etapas'
import { ETAPAS } from '@/components/servicios-datos'

export const metadata: Metadata = {
  title: 'Servicios — Flahoolick',
  description: 'Diagnosticamos lo que tu empresa sabe, instalamos el sistema que lo transforma en contenido y operamos su producción durante todo el ciclo comercial.',
}

export default function Servicios() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        tagline="Servicios"
        headline="Del conocimiento a una operación de contenido."
        description="Diagnosticamos lo que tu empresa sabe, instalamos el sistema que lo transforma en contenido y operamos su producción durante todo el ciclo comercial."
        heroBg="#000000"
        heroText="#ffffff"
        contact={{
          headline: 'Empecemos por entender dónde está tu empresa.',
          description: 'Cuéntanos qué necesita ordenar, instalar o activar tu organización. Definiremos el punto de entrada adecuado para comenzar.',
          submitLabel: 'Conversemos →',
          etapaField: true,
        }}
      >
        {/* Índice de orientación. Reemplaza al antiguo bloque introductorio,
            que repetía lo que ya dice el header, y hace de navegación interna:
            la pregunta que trae el lector es cuál de las tres etapas le toca. */}
        <BodySection title="Dónde empezar">
          <div className="flex flex-col gap-10">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              ¿En qué etapa estás?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
              style={{ background: 'rgba(0,0,0,0.12)' }}>
              {ETAPAS.map(etapa => (
                <a key={etapa.id} href={`#${etapa.id}`}
                  className="group flex flex-col gap-3 p-8 hover:opacity-70 transition-opacity"
                  style={{ backgroundColor: 'var(--section-body-bg)' }}>
                  <p className="label opacity-40">{etapa.numero}</p>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                    lineHeight: 1.15,
                  }}>
                    {etapa.nombre}
                  </p>
                  <p className="text-sm leading-relaxed opacity-65">{etapa.cuando}</p>
                  <span className="label opacity-35 group-hover:opacity-70 transition-opacity mt-2">
                    Ver detalle →
                  </span>
                </a>
              ))}
            </div>

            <p className="text-lead" style={{ borderLeft: '2px solid currentColor', paddingLeft: '1.25rem' }}>
              Una empresa puede comenzar desde la etapa que corresponda a su nivel de madurez.
            </p>
          </div>
        </BodySection>

        {/* Las tres etapas en detalle */}
        <ServiciosEtapas />

        {/* Bloque de metodología */}
        <BodySection dark title="El sistema por dentro">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <h2 className="md:col-span-6" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              El sistema aprende mientras trabaja.
            </h2>
            <div className="md:col-span-6 flex flex-col gap-6">
              <p className="text-base leading-relaxed opacity-70">
                SENSOR captura conocimiento y señales.
                El equipo estratégico interpreta y prioriza el material.
                El estudio lo convierte en activos.
                La respuesta del mercado alimenta el siguiente ciclo.
              </p>
              <Link href="/metodologia"
                className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
                style={{ color: 'var(--section-dark-text)', borderColor: 'var(--section-dark-text)' }}>
                Explorar metodología →
              </Link>
            </div>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
