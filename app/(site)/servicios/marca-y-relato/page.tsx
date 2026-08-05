import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, CrossLinks } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Marca y Relato — Flahoolick' }

const problemas = [
  { titulo: 'Una propuesta difícil de explicar.', desc: 'Ordenamos el negocio y construimos una forma clara de presentarlo.' },
  { titulo: 'Una marca parecida a la competencia.', desc: 'Definimos una posición, un lenguaje y una identidad reconocibles.' },
  { titulo: 'Mensajes distintos en cada área.', desc: 'Creamos una arquitectura común para marketing, ventas, dirección y equipos técnicos.' },
  { titulo: 'Una identidad difícil de aplicar.', desc: 'Diseñamos herramientas que permiten ejecutar la marca con consistencia.' },
]

const construimos = [
  {
    titulo: 'Estrategia de marca',
    desc: 'Definimos el lugar que la empresa quiere ocupar en el mercado.',
    incluye: ['Posicionamiento', 'Propuesta de valor', 'Audiencias prioritarias', 'Diferenciadores', 'Principios de marca'],
  },
  {
    titulo: 'Relato y mensajes',
    desc: 'Convertimos la estrategia en un lenguaje que la organización puede utilizar.',
    incluye: ['Relato corporativo', 'Arquitectura de mensajes', 'Claim y tagline', 'Pilares narrativos', 'Voz y tono'],
  },
  {
    titulo: 'Identidad visual',
    desc: 'Diseñamos un sistema visual capaz de expresar la personalidad y la estrategia de la marca.',
    incluye: ['Logotipo', 'Tipografías', 'Paleta cromática', 'Sistema gráfico', 'Aplicaciones digitales'],
  },
  {
    titulo: 'Sistema de implementación',
    desc: 'Preparamos los activos necesarios para activar la marca en cada punto de contacto.',
    incluye: ['Manual de marca', 'Plantillas corporativas', 'Material comercial', 'Sitio web', 'Kit de lanzamiento'],
  },
]

const pasos = [
  { titulo: 'Descubrimiento.', desc: 'Revisamos el negocio, el mercado, las audiencias y la identidad actual.' },
  { titulo: 'Posicionamiento.', desc: 'Definimos la posición, la propuesta de valor y los principios de marca.' },
  { titulo: 'Concepto.', desc: 'Creamos rutas verbales y visuales para expresar la estrategia.' },
  { titulo: 'Sistema.', desc: 'Desarrollamos los elementos de identidad, relato y aplicación.' },
  { titulo: 'Activación.', desc: 'Entregamos las herramientas y acompañamos su implementación.' },
]

export default function MarcaYRelato() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        tagline="Marca y Relato"
        headline="Firma tu categoría."
        description="Construimos una posición, una voz y una identidad que el mercado puede reconocer, recordar y elegir."
        heroBg="#F09DB6"
        heroText="#000000"
      >
        <BodySection title="Qué resolvemos"><HowList items={problemas} /></BodySection>

        <BodySection dark title="Qué construimos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {construimos.map(c => (
              <div key={c.titulo} className="flex flex-col gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <h3 className="text-lg font-semibold">{c.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-70">{c.desc}</p>
                <Tags items={c.incluye} dark />
              </div>
            ))}
          </div>
        </BodySection>

        <BodySection title="Cómo trabajamos"><HowList items={pasos} /></BodySection>

        <BodySection dark title="Entregable">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-xl font-semibold">Sistema de marca</h2>
            <p className="text-base leading-relaxed opacity-70">
              Una plataforma estratégica, verbal y visual lista para funcionar en todos los puntos de contacto. Tu equipo recibe criterios claros, activos listos y una forma común de representar a la empresa.
            </p>
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
