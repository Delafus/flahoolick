import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, CrossLinks, FontMix } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Cómo trabajamos con IA — Flahoolick' }
const items = [
  { titulo: 'Ingestamos el conocimiento existente.', desc: 'SENSOR procesa PDFs técnicos, transcripciones de reuniones, propuestas y grabaciones de llamadas — sin pedirle tiempo al equipo del cliente.' },
  { titulo: 'Detectamos señales y patrones.', desc: 'Identificamos qué temas tienen mayor potencial de autoridad para el ICP del cliente y en qué momento del ciclo de decisión.' },
  { titulo: 'Monitoreamos la visibilidad en IA.', desc: 'Auditamos cómo responden ChatGPT, Perplexity y Claude cuando el comprador ideal busca soluciones en la categoría del cliente.' },
  { titulo: 'Validamos con criterio humano.', desc: 'La IA procesa. El equipo senior de Flahoolick revisa, prioriza y decide qué se produce. Ese orden es inamovible.' },
]
export default function ComoIA() {
  return (
    <>
      <PageColorSetter bg="#F5FD92" text="#000000" />
      <PageLayout tagline="IA para capturar y modelar. Criterio para decidir." headline={<FontMix bold="Cómo trabajamos" italic=" con IA" />}
        description="La inteligencia artificial procesa volúmenes de información que ningún equipo puede manejar manualmente. Flahoolick usa IA para capturar y modelar ese conocimiento a escala. El criterio editorial, la estrategia y la decisión de qué merece circular los define siempre el equipo senior."
        heroBg="var(--page-metodologia-bg)" heroText="var(--page-metodologia-text)">
        <BodySection title="Cómo lo hacemos"><HowList items={items} /></BodySection>
        <BodySection title="Otras secciones">
          <CrossLinks links={[
            { title: 'Tres pasos, una misma lógica', desc: 'Cómo encontramos, ordenamos y ponemos en circulación.', href: '/metodologia#como-trabajamos' },
            { title: 'Sistemas de Contenido con IA', desc: 'El servicio completo: memoria, conexiones, asistentes y producción continua.', href: '/servicios/sistemas-de-contenido-con-ia' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
