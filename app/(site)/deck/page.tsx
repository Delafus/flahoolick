import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags } from '@/components/page-layout'

export const metadata: Metadata = { title: 'DECK — Flahoolick' }

const proceso = [
  { titulo: 'Recibes el material.', desc: 'Nos entregas las fuentes: documentos, datos, contexto estratégico, referencias visuales. Puede ser una carpeta en Drive, un brief de una página o una conversación de 30 minutos.' },
  { titulo: 'Procesamos y estructuramos.', desc: 'Definimos el relato, jerarquizamos la información por audiencia y momento del ciclo, y construimos la arquitectura de slides antes de producir una sola página.' },
  { titulo: 'Producimos bajo un guideline consistente.', desc: 'Cada deck sale bajo el mismo criterio editorial y visual. La presentación refleja la identidad y el nivel de la empresa que la firma.' },
  { titulo: 'Entregamos listo para usar.', desc: 'El cliente recibe el deck en el formato que necesita — para directorio, pitch comercial, evento o propuesta técnica — listo para presentar.' },
]

const usos = ['Pitch de directorio','Propuesta técnica para licitación','Presentación de producto o servicio','Deck de habilitación comercial','Keynote para evento o conferencia','Informe ejecutivo con datos y análisis']

export default function DeckPage() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        headline="DECK"
        tagline="DELIVERING THE GOODS"
        description="Una presentación ejecutiva mal construida hace perder negocios que estaban ganados. DECK toma múltiples fuentes y produce una presentación estructurada, visualmente consistente y lista para entregar."
        heroBg="#000000"
        heroText="#ffffff"
      >
        <BodySection title="Cómo funciona"><HowList items={proceso} /></BodySection>
        <BodySection dark title="Para qué sirve DECK"><Tags items={usos} dark /></BodySection>
      </PageLayout>
    </>
  )
}
