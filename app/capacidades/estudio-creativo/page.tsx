import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Estudio Creativo — Flahoolick' }

const items = [
  { titulo: 'Producimos contenido de autoridad.', desc: 'Artículos de fondo, guías ejecutivas y puntos de vista técnicos que construyen disponibilidad mental en el 95% del mercado que hoy no está comprando.' },
  { titulo: 'Activamos los canales ejecutivos.', desc: 'Piezas de LinkedIn calibradas para el comprador B2B complejo, publicadas bajo el nombre de los voceros que tu mercado necesita escuchar.' },
  { titulo: 'Armamos herramientas comerciales.', desc: 'Casos de uso, comparativas técnicas y documentos de posicionamiento para el ciclo de cierre. Infraestructura de conversación.' },
  { titulo: 'Construimos presentaciones ejecutivas.', desc: 'Decks de propuesta, pitch de directorio y materiales de habilitación bajo un mismo criterio editorial y visual.' },
  { titulo: 'Mantenemos una biblioteca viva.', desc: 'Todo lo producido queda estructurado, etiquetado y disponible para reutilizar en el ciclo siguiente.' },
]

const entregables = ['Producción mensual de piezas de autoridad','Activos de LinkedIn para voceros ejecutivos','Casos de uso listos para el equipo comercial','Presentaciones ejecutivas bajo guideline consistente','Biblioteca de contenido acumulada y reutilizable']

export default function EstudioCreativo() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        tagline="La producción que construye presencia."
        headline="Estudio Creativo"
        description="La estrategia y el sistema definen qué decir. El Estudio Creativo lo produce. Es la capacidad de producción dedicada de Flahoolick — opera sobre la estrategia, conoce el mercado y entiende el ciclo de decisión del comprador de tu empresa."
        heroBg="var(--page-capacidades-bg)"
        heroText="var(--page-capacidades-text)"
      >
        <BodySection title="Cómo lo hacemos"><HowList items={items} /></BodySection>
        <BodySection dark title="Qué produces con esto"><Tags items={entregables} dark /></BodySection>
        <BodySection title="Otras capacidades">
          <CrossLinks links={[
            { title: 'Estrategia y Relato', desc: 'Definimos quién eres para el mercado que importa antes de producir una sola pieza.', href: '/capacidades/estrategia-y-relato' },
            { title: 'Sistema de Contenido', desc: 'Instalamos el flujo continuo que mantiene tu conocimiento en circulación mes a mes.', href: '/capacidades/sistema-de-contenido' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
