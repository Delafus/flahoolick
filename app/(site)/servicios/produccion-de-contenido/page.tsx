import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Producción de Contenido — Flahoolick' }

const producimos = [
  { titulo: 'Autoridad', items: ['Artículos', 'Opinión experta', 'Estudios', 'Informes', 'White papers', 'Guías'] },
  { titulo: 'Consideración', items: ['Casos de éxito', 'Páginas de solución', 'Comparativos', 'Videos explicativos', 'Webinars', 'Newsletters'] },
  { titulo: 'Venta', items: ['Presentaciones', 'One-pagers', 'Battlecards', 'Propuestas', 'Material para licitaciones'] },
  { titulo: 'Distribución', items: ['LinkedIn', 'Email', 'Campañas', 'Sitios web', 'Contenido audiovisual'] },
]

const pasos = [
  { titulo: 'Definimos la función.', desc: 'Cada pieza responde a una audiencia, una pregunta y un momento del proceso.' },
  { titulo: 'Extraemos el conocimiento.', desc: 'Trabajamos con especialistas, documentos, datos y equipos comerciales.' },
  { titulo: 'Construimos el contenido.', desc: 'Convertimos la información en una pieza clara, atractiva y útil.' },
  { titulo: 'Lo ponemos en circulación.', desc: 'Adaptamos cada activo a los canales, formatos y audiencias relevantes.' },
]

const operacion = ['Estrategia', 'Investigación', 'Entrevistas', 'Redacción', 'Diseño', 'Visualización de datos', 'Audiovisual', 'Desarrollo', 'Distribución']

export default function ProduccionDeContenido() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        tagline="Producción de Contenido"
        headline="Pon tu conocimiento en la calle."
        description="Transformamos experiencia técnica en historias, herramientas y piezas que circulan donde las decisiones toman forma."
        heroBg="#F09DB6"
        heroText="#000000"
      >
        <BodySection title="Qué producimos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {producimos.map(p => (
              <div key={p.titulo} className="flex flex-col gap-4 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
                <h3 className="text-lg font-semibold">{p.titulo}</h3>
                <Tags items={p.items} />
              </div>
            ))}
          </div>
        </BodySection>

        <BodySection dark title="Cómo trabajamos"><HowList items={pasos} /></BodySection>

        <BodySection title="Una operación completa"><Tags items={operacion} /></BodySection>

        <BodySection dark title="Entregable">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-xl font-semibold">Biblioteca de contenido activa</h2>
            <p className="text-base leading-relaxed opacity-70">
              Todo lo producido queda estructurado, etiquetado y disponible para reutilizar en el ciclo siguiente — el conocimiento no se pierde entre proyectos.
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
