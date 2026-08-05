import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Estrategia de Contenido — Flahoolick' }

const problemas = [
  { titulo: 'Mensajes dispersos.', desc: 'Ordenamos las ideas centrales de la empresa en una narrativa común.' },
  { titulo: 'Contenido sin dirección.', desc: 'Cada pieza recibe un propósito, una audiencia y una función dentro del ciclo comercial.' },
  { titulo: 'Conocimiento invisible.', desc: 'Convertimos la experiencia de especialistas, equipos técnicos y comerciales en temas útiles para el mercado.' },
  { titulo: 'Producción difícil de sostener.', desc: 'Instalamos un sistema editorial que ordena prioridades, formatos, responsables y ritmos de publicación.' },
]

const pasos = [
  { titulo: 'Diagnóstico.', desc: 'Analizamos el negocio, las audiencias, la competencia, los canales y el contenido existente. Identificamos brechas y oportunidades.' },
  { titulo: 'Arquitectura.', desc: 'Definimos el relato, los pilares editoriales, los temas y los momentos de contacto. Cada contenido recibe una función dentro del ciclo comercial.' },
  { titulo: 'Plan de acción.', desc: 'Construimos el roadmap, el calendario, la distribución y el modelo de medición. Tu equipo recibe una guía clara para producir, publicar y aprender.' },
]

const incluye = [
  'Auditoría y análisis de brechas', 'Investigación de audiencias', 'Mapa del proceso de decisión',
  'Análisis competitivo', 'Arquitectura de mensajes', 'Pilares editoriales',
  'SEO y visibilidad en buscadores con IA', 'Plan de distribución', 'Roadmap y calendario editorial', 'Modelo de medición',
]

export default function EstrategiaDeContenido() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        tagline="Estrategia de Contenido"
        headline="Ponle cerebro al calendario."
        description="Diseñamos la lógica que conecta objetivos, audiencias, temas, canales y momentos de decisión."
        heroBg="#F09DB6"
        heroText="#000000"
      >
        <BodySection title="Qué resolvemos"><HowList items={problemas} /></BodySection>
        <BodySection dark title="Cómo construimos la estrategia"><HowList items={pasos} /></BodySection>
        <BodySection title="Qué incluye"><Tags items={incluye} /></BodySection>
        <BodySection dark title="Entregable">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-xl font-semibold">Playbook de Estrategia de Contenido</h2>
            <p className="text-base leading-relaxed opacity-70">
              Un documento operativo con las audiencias prioritarias, los mensajes centrales, los territorios editoriales, los formatos recomendados, los canales de distribución, el calendario inicial y los indicadores de desempeño.
            </p>
          </div>
        </BodySection>
        <BodySection title="Otros servicios">
          <CrossLinks links={[
            { title: 'Marca y Relato', desc: 'Construimos una forma clara y propia de explicar tu empresa.', href: '/servicios/marca-y-relato' },
            { title: 'Sistemas de Contenido con IA', desc: 'Diseñamos la infraestructura que captura conocimiento y acelera la operación.', href: '/servicios/sistemas-de-contenido-con-ia' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
