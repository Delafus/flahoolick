import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Cómo funciona el sistema — Flahoolick' }
const items = [
  { titulo: 'Capturamos las señales.', desc: 'Signal Capture — conectamos a la operación técnica y comercial para extraer el conocimiento que ya existe: manuales, grabaciones, propuestas, objeciones.' },
  { titulo: 'Modelamos el conocimiento.', desc: 'Knowledge Modeling — ordenamos por audiencia, tensión, momento de decisión y formato de salida.' },
  { titulo: 'Producimos los activos.', desc: 'Authority Output — el Estudio Creativo convierte el conocimiento modelado en piezas publicables y herramientas de venta.' },
  { titulo: 'Medimos y recalibramos.', desc: 'Feedback Loop — cada mes revisamos qué circuló, qué generó respuesta y qué objeciones nuevas aparecieron en la calle.' },
]
export default function ComoFunciona() {
  return (
    <>
      <PageColorSetter bg="#F5FD92" text="#000000" />
      <PageLayout eyebrow="Cuatro capas. Un ciclo continuo." headline="Cómo funciona el sistema"
        description="El sistema no empieza con una hoja en blanco. Empieza con lo que tu empresa ya sabe. Capturamos esas señales, las modelamos con criterio, producimos activos de autoridad y medimos la respuesta del mercado. Cada ciclo alimenta al siguiente."
        heroBg="var(--page-metodologia-bg)" heroText="var(--page-metodologia-text)">
        <BodySection title="Cómo funciona"><HowList items={items} /></BodySection>
        <BodySection title="Otras secciones">
          <CrossLinks links={[
            { title: 'Cómo trabajamos con IA', desc: 'IA para capturar y modelar. Criterio para decidir.', href: '/metodologia/como-trabajamos-con-ia' },
            { title: 'Cómo aprendemos', desc: 'El sistema mejora con cada ciclo.', href: '/metodologia/como-aprendemos' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
