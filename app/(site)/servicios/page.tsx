import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'
import { ServiciosEtapas } from '@/components/servicios-etapas'

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
        {/* Bloque introductorio */}
        <BodySection title="Cómo trabajamos">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <h2 className="md:col-span-6" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Un sistema completo. Tres etapas de trabajo.
            </h2>
            <div className="md:col-span-6 flex flex-col gap-4">
              <p className="text-lead opacity-80">
                Cada servicio resuelve una necesidad concreta y deja una capacidad instalada.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                El diagnóstico define dónde existe una oportunidad de autoridad.
                La instalación organiza el relato, los procesos y la producción.
                La operación mantiene el conocimiento en circulación y alimenta el aprendizaje del sistema.
              </p>
            </div>
          </div>
        </BodySection>

        {/* Las tres etapas, con anclas y navegación interna */}
        <ServiciosEtapas />

        {/* Bloque de conexión */}
        <BodySection title="Una ruta continua">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <h2 className="md:col-span-6" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Cada etapa prepara la siguiente.
            </h2>
            <div className="md:col-span-6 flex flex-col gap-6">
              <p className="text-base leading-relaxed opacity-65">
                El diagnóstico encuentra la oportunidad.
                La instalación construye el sistema.
                La operación mantiene ese sistema activo.
              </p>
              <p className="text-lead" style={{ borderLeft: '2px solid currentColor', paddingLeft: '1.25rem' }}>
                Una empresa puede comenzar desde la etapa que corresponda a su nivel de madurez.
              </p>
            </div>
          </div>
        </BodySection>

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
