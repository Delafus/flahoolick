import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Cómo aprendemos — Flahoolick' }
const items = [
  { titulo: 'Medimos qué circula.', desc: 'Rastreamos qué piezas generan respuesta, cuáles usa el equipo de ventas y cuáles aceleran el ciclo de cierre.' },
  { titulo: 'Capturamos las objeciones nuevas.', desc: 'Cada mes recogemos los argumentos que frenan los negocios en la calle y los convertimos en materia prima para el siguiente ciclo.' },
  { titulo: 'Observamos la visibilidad en IA.', desc: 'Monitoreamos si los modelos de lenguaje empiezan a citar al cliente cuando un comprador busca en su categoría. Esa es la métrica de disponibilidad mental más relevante para el ciclo largo.' },
  { titulo: 'Documentamos el banco de evidencia.', desc: 'Todo el conocimiento producido queda estructurado, disponible para reutilizar y escalar. El activo crece con el tiempo.' },
]
export default function ComoAprendemos() {
  return (
    <>
      <PageColorSetter bg="var(--page-metodologia-bg)" text="var(--page-metodologia-text)" />
      <PageLayout eyebrow="El sistema mejora con cada ciclo." headline="Cómo aprendemos"
        description="Un sistema de contenido que no aprende es un calendario glorificado. El Sistema de Autoridad de Mercado mejora con cada interacción del mercado — objeciones nuevas, señales de performance, cambios en el comportamiento del comprador."
        heroBg="var(--page-metodologia-bg)" heroText="var(--page-metodologia-text)">
        <BodySection title="Cómo funciona el aprendizaje"><HowList items={items} /></BodySection>
        <BodySection title="Otras secciones">
          <CrossLinks links={[
            { title: 'Cómo funciona el sistema', desc: 'Cuatro capas. Un ciclo continuo.', href: '/metodologia/como-funciona-el-sistema' },
            { title: 'Cómo trabajamos con IA', desc: 'IA para capturar y modelar. Criterio para decidir.', href: '/metodologia/como-trabajamos-con-ia' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
