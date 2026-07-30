import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'

export const metadata: Metadata = {
  title: 'Metodología — Flahoolick',
  description: 'El Sistema de Autoridad captura lo que la empresa sabe, lo conecta con situaciones reales de compra y utiliza la respuesta del mercado para orientar el siguiente ciclo.',
}

const CAPAS = [
  { numero: '01', titulo: 'Capturamos', desc: 'Reunimos documentación, conversaciones comerciales, objeciones, datos y señales de mercado.' },
  { numero: '02', titulo: 'Priorizamos', desc: 'Ordenamos cada hallazgo según audiencia, punto de entrada a la categoría, evidencia disponible y valor para el negocio.' },
  { numero: '03', titulo: 'Producimos', desc: 'Convertimos las prioridades en contenidos, herramientas comerciales y activos ejecutivos.' },
  { numero: '04', titulo: 'Recalibramos', desc: 'La respuesta del mercado, el uso del equipo comercial y las nuevas objeciones actualizan el siguiente ciclo.' },
]

const ACUMULA = [
  { titulo: 'Conocimiento estructurado', desc: 'Fuentes, experiencia y evidencia disponibles para reutilizar.' },
  { titulo: 'Comprensión de audiencias', desc: 'Preguntas, tensiones y puntos de entrada priorizados.' },
  { titulo: 'Capacidad editorial', desc: 'Criterios, flujos y formatos que aceleran la producción.' },
  { titulo: 'Inteligencia comercial', desc: 'Objeciones, argumentos y señales que actualizan el relato.' },
]

const headingStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
} as const

export default function Metodologia() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        headline="Cada ciclo deja un activo."
        description="El Sistema de Autoridad captura lo que la empresa sabe, lo conecta con situaciones reales de compra y utiliza la respuesta del mercado para orientar el siguiente ciclo."
        heroBg="#000000"
        heroText="#ffffff"
      >
        {/* 02 — Cómo funciona: cuatro capas, un ciclo continuo */}
        <BodySection title="Cómo funciona">
          <div id="como-funciona" className="flex flex-col gap-10" style={{ scrollMarginTop: '90px' }}>
            <div className="flex flex-col gap-4">
              <h2 style={{ ...headingStyle, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                Cuatro capas. Un ciclo continuo.
              </h2>
              <p className="text-lead opacity-70" style={{ maxWidth: '38rem' }}>
                Cada capa prepara la siguiente. El sistema conserva lo aprendido y lo incorpora al próximo ciclo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-px" style={{ background: 'rgba(0,0,0,0.12)' }}>
              {CAPAS.map(capa => (
                <div key={capa.numero} className="flex flex-col gap-3 p-8" style={{ backgroundColor: 'var(--section-body-bg)' }}>
                  <p className="label opacity-40">{capa.numero}</p>
                  <h3 className="text-base font-semibold">{capa.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{capa.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* 03 — Principio estratégico: disponibilidad mental */}
        <BodySection dark title="El principio">
          <div id="disponibilidad-mental" className="flex flex-col gap-10" style={{ scrollMarginTop: '90px' }}>
            <div className="flex flex-col gap-5" style={{ maxWidth: '44rem' }}>
              <h2 style={{ ...headingStyle, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                Estar presente cuando aparece la necesidad.
              </h2>
              <p className="text-lead opacity-80">
                La disponibilidad mental es la probabilidad de que una marca sea recordada en una situación de compra.
              </p>
              <p className="text-base leading-relaxed opacity-65">
                El sistema conecta a la empresa con las preguntas, problemas y contextos que activan su categoría en la memoria del comprador.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.15)', maxWidth: '38rem' }}>
              <p className="label opacity-50">Puntos de entrada a la categoría</p>
              <p className="text-sm leading-relaxed opacity-70">
                Los Category Entry Points identifican las situaciones que hacen relevante una categoría para el comprador. Flahoolick los utiliza para orientar audiencias, mensajes, territorios editoriales y momentos de distribución.
              </p>
            </div>
          </div>
        </BodySection>

        {/* 04 — IA y criterio humano: teaser, la página profunda sigue en /metodologia/como-trabajamos-con-ia */}
        <BodySection title="Cómo trabajamos con IA">
          <div id="ia-y-criterio" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12" style={{ scrollMarginTop: '90px' }}>
            <h2 className="md:col-span-6" style={{ ...headingStyle, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              La tecnología amplía la capacidad del sistema.
            </h2>
            <div className="md:col-span-6 flex flex-col gap-6">
              <p className="text-base leading-relaxed opacity-70">
                La IA procesa documentos, transcripciones, datos y señales a escala. El equipo senior formula las hipótesis, valida la evidencia, prioriza las oportunidades y firma la redacción final.
              </p>
              <Link href="/metodologia/como-trabajamos-con-ia"
                className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
                style={{ color: 'var(--section-body-text)', borderColor: 'var(--section-body-text)' }}>
                Explorar IA y criterio →
              </Link>
            </div>
          </div>
        </BodySection>

        {/* 05 — Lo que el sistema acumula */}
        <BodySection dark title="Lo que se acumula">
          <div id="lo-que-acumula" className="flex flex-col gap-10" style={{ scrollMarginTop: '90px' }}>
            <h2 style={{ ...headingStyle, fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
              El trabajo de hoy mejora el de mañana.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {ACUMULA.map(bloque => (
                <div key={bloque.titulo} className="flex flex-col gap-3 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                  <h3 className="text-base font-semibold">{bloque.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{bloque.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* 06 — Puente hacia Servicios: breve, sin volver a describir los tres servicios */}
        <BodySection title="Llevémoslo a la operación">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-3">
              <h2 style={{ ...headingStyle, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)' }}>
                El método sostiene tres formas de trabajar.
              </h2>
              <p className="text-base leading-relaxed opacity-70" style={{ maxWidth: '32rem' }}>
                Puedes ordenar tus prioridades, instalar la operación o activar una capacidad editorial continua.
              </p>
            </div>
            <Link href="/servicios"
              className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#000000', color: 'var(--brand-ground)' }}>
              Explorar Servicios →
            </Link>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
