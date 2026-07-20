import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Estrategia y Relato — Flahoolick' }

const items = [
  { titulo: 'Mapeamos a quién le hablas.', desc: 'Decisores, influenciadores y bloqueadores en el ciclo de compra. Entendemos quién compra, quién aprueba y quién puede frenar el negocio.' },
  { titulo: 'Identificamos tus territorios de autoridad.', desc: 'Los temas donde tu empresa tiene credencial real para hablar con peso y donde el mercado tiene preguntas sin respuesta.' },
  { titulo: 'Encontramos las tensiones que activan la búsqueda.', desc: 'Los momentos concretos en que tu comprador ideal empieza a necesitar lo que vendes.' },
  { titulo: 'Construimos la idea central.', desc: 'El núcleo narrativo que unifica cómo habla tu empresa al mercado, al equipo comercial y a todos los canales.' },
  { titulo: 'Diseñamos la arquitectura de mensajes.', desc: 'Lo que se dice, a quién, en qué momento del ciclo y bajo qué registro.' },
]

const entregables = ['Documento de narrativa de marca','Definición de ICP con perfil de decisión','Mapa de territorios de autoridad','Arquitectura de mensajes por audiencia','Tensiones editoriales para los próximos 6 meses']

export default function EstrategiaRelato() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        eyebrow="El relato primero."
        headline="Estrategia y Relato"
        description="Tu empresa tiene una ventaja real. El mercado no la ve porque nadie la ha traducido a un relato que permanezca. Estrategia y Relato define lo que tu empresa representa para el mercado que importa — antes de producir una sola pieza."
        heroBg="var(--page-capacidades-bg)"
        heroText="var(--page-capacidades-text)"
      >
        <BodySection title="Cómo lo hacemos"><HowList items={items} /></BodySection>
        <BodySection dark title="Qué produces con esto"><Tags items={entregables} dark /></BodySection>
        <BodySection title="Otras capacidades">
          <CrossLinks links={[
            { title: 'Sistema de Contenido', desc: 'Instalamos el flujo continuo que mantiene tu conocimiento en circulación mes a mes.', href: '/capacidades/sistema-de-contenido' },
            { title: 'Estudio Creativo', desc: 'Producimos los activos que construyen presencia y habilitan el cierre comercial.', href: '/capacidades/estudio-creativo' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
