import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Sistemas de Contenido con IA — Flahoolick' }

const problemas = [
  { titulo: 'El conocimiento vive disperso.', desc: 'Instalamos sensores que capturan señales técnicas y comerciales antes de producir cualquier contenido.' },
  { titulo: 'Cada mes se empieza de cero.', desc: 'La IA prioriza y organiza la materia prima por audiencia, tensión y momento de compra.' },
  { titulo: 'Nadie sabe qué está pendiente.', desc: 'Un sistema de gobernanza define qué se produce, con qué frecuencia y quién aprueba.' },
  { titulo: 'La calidad depende de una persona.', desc: 'El criterio senior dirige el resultado final; la IA hace el trabajo de escala.' },
]

const pasos = [
  { titulo: 'Captura.', desc: 'Conectamos sensores a la operación técnica y comercial, para no inventar contenido desde cero.' },
  { titulo: 'Priorización con IA.', desc: 'Modelamos el conocimiento por audiencia, tensión y formato, a una escala que un equipo humano no puede sostener solo.' },
  { titulo: 'Distribución con criterio.', desc: 'Un editor senior revisa, ajusta y aprueba antes de que cualquier activo salga al mercado.' },
]

const incluye = [
  'Sistema de captura de señales', 'Priorización asistida por IA', 'Banco de conocimiento estructurado',
  'Playbook de producción', 'Roles y gobernanza editorial', 'Flujos de aprobación', 'Cadencia editorial', 'Marco de medición',
]

export default function SistemasDeContenidoConIA() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        tagline="Sistemas de Contenido con IA"
        headline="Instálale memoria a tu empresa."
        description="Creamos sistemas que capturan conocimiento, conectan señales y mantienen la operación editorial en movimiento."
        heroBg="#F09DB6"
        heroText="#000000"
      >
        <BodySection title="Qué resolvemos"><HowList items={problemas} /></BodySection>
        <BodySection dark title="Cómo lo hacemos"><HowList items={pasos} /></BodySection>
        <BodySection title="Qué incluye"><Tags items={incluye} /></BodySection>

        <BodySection dark title="Entregable">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Sistema Operativo de Contenido</h2>
              <p className="text-base leading-relaxed opacity-70">
                Un playbook aplicado que ordena cómo entra la información, cómo se prioriza con IA y cómo se convierte en activos para el mercado — sin perder el criterio humano en las decisiones finales.
              </p>
            </div>
            <a href="/metodologia/como-trabajamos-con-ia" className="label opacity-60 hover:opacity-100 transition-opacity w-fit">
              Cómo trabajamos con IA →
            </a>
          </div>
        </BodySection>

        <BodySection title="Otros servicios">
          <CrossLinks links={[
            { title: 'Estrategia de Contenido', desc: 'Definimos qué decir, a quién y con qué propósito.', href: '/servicios/estrategia-de-contenido' },
            { title: 'Producción de Contenido', desc: 'Transformamos conocimiento interno en activos para el mercado y ventas.', href: '/servicios/produccion-de-contenido' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
