import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Sistema de Contenido — Flahoolick' }

const items = [
  { titulo: 'Capturamos lo que ya existe.', desc: 'Conectamos sensores a tu operación técnica y comercial antes de inventar cualquier contenido.' },
  { titulo: 'Modelamos el conocimiento por audiencia.', desc: 'Ordenamos la materia prima por decisor, tensión, momento de compra y formato. El resultado es una estructura editorial con criterio.' },
  { titulo: 'Instalamos la cadencia y la gobernanza.', desc: 'Definimos qué se produce, con qué frecuencia, bajo qué criterio editorial y quién aprueba.' },
  { titulo: 'Ejecutamos la mesa editorial mensual.', desc: 'Cada mes revisamos qué circuló, qué generó respuesta y qué objeciones nuevas aparecieron en la calle.' },
  { titulo: 'Recalibramos con cada ciclo.', desc: 'El sistema aprende de la respuesta del mercado y mejora la priorización del mes siguiente.' },
]

const entregables = ['Sistema operativo de contenido documentado','Banco de señales técnicas y comerciales','Calendario editorial con criterio de priorización','Mesa editorial mensual de 60 minutos','Métricas de circulación y respuesta por pieza']

export default function SistemaContenido() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        eyebrow="Presencia que se acumula."
        headline="Sistema de Contenido"
        description="El contenido que no tiene sistema no acumula. Cada mes se empieza desde cero, el equipo improvisa temas y el mercado recibe señales inconsistentes. El Sistema de Contenido convierte el relato de tu empresa en un flujo continuo, gobernado y medible."
        heroBg="var(--page-capacidades-bg)"
        heroText="var(--page-capacidades-text)"
      >
        <BodySection title="Cómo lo hacemos"><HowList items={items} /></BodySection>
        <BodySection dark title="Qué produces con esto"><Tags items={entregables} dark /></BodySection>
        <BodySection title="Otras capacidades">
          <CrossLinks links={[
            { title: 'Estrategia y Relato', desc: 'Definimos quién eres para el mercado que importa antes de producir una sola pieza.', href: '/capacidades/estrategia-y-relato' },
            { title: 'Estudio Creativo', desc: 'Producimos los activos que construyen presencia y habilitan el cierre comercial.', href: '/capacidades/estudio-creativo' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
