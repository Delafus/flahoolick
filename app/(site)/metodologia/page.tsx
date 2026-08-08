import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { MetodologiaPasos } from '@/components/metodologia-pasos'
import { CatalogoCards } from '@/components/catalogo-cards'

export const metadata: Metadata = {
  title: 'Metodología — Flahoolick',
  description: 'Entramos al negocio, encontramos lo que vale, lo convertimos en mensajes, contenidos y herramientas, y lo ponemos frente al mercado.',
}

const PASOS = [
  {
    numero: '01',
    slug: 'encontramos',
    titulo: 'Encontramos',
    parrafos: [
      'Revisamos la oferta, los objetivos, el mercado y el proceso comercial.',
      'Hablamos con las personas que conocen el negocio desde dentro.',
      'Analizamos sitios, presentaciones, documentos, reuniones, datos y materiales de venta.',
    ],
    recibe: 'un diagnóstico claro de la situación y las oportunidades.',
  },
  {
    numero: '02',
    slug: 'ordenamos',
    titulo: 'Ordenamos',
    parrafos: [
      'Identificamos las ideas, argumentos, preguntas y pruebas que tienen valor para el mercado.',
      'Definimos qué necesita escuchar cada audiencia durante el proceso de decisión.',
      'Establecemos prioridades para evitar esfuerzos dispersos.',
    ],
    recibe: 'un mapa de audiencias, mensajes, temas y necesidades.',
  },
  {
    numero: '03',
    slug: 'circulacion',
    titulo: 'Ponemos en circulación',
    parrafos: [
      'Convertimos ese orden en la solución concreta: una estrategia, una marca, un sistema de contenido, una herramienta comercial o una plataforma con inteligencia artificial.',
      'La publicamos, la distribuimos y la conectamos con marketing, ventas y equipos técnicos.',
      'Medimos qué genera atención, qué ayuda a explicar y qué aporta al proceso comercial, y usamos esos aprendizajes para seguir mejorando.',
    ],
    recibe: 'piezas, sistemas y herramientas en funcionamiento, con un plan de medición y mejora.',
  },
]

const SENSOR_FUENTES = [
  { titulo: 'Documentación técnica', desc: 'Manuales, fichas de producto, propuestas y presentaciones que ya existen.' },
  { titulo: 'Conversaciones comerciales', desc: 'Grabaciones de reuniones, llamadas y notas de CRM.' },
  { titulo: 'Objeciones y feedback', desc: 'Las preguntas, miedos y argumentos que se repiten en cada venta.' },
  { titulo: 'Señales de mercado', desc: 'Cómo te ve la IA cuando tu comprador busca en tu categoría.' },
]

const SENSOR_GENERA = [
  { titulo: 'Mapa de conocimiento', desc: 'Ordena y jerarquiza los temas con mayor valor.' },
  { titulo: 'Puntos de entrada a la categoría', desc: 'Las situaciones que activan la necesidad en tu comprador.' },
  { titulo: 'Brechas de visibilidad', desc: 'Dónde tu empresa es invisible para el mercado.' },
  { titulo: 'Agenda editorial', desc: 'Prioridades de contenido según audiencia y momento de compra.' },
  { titulo: 'Base de producción', desc: 'Los hallazgos listos para alimentar contenido y herramientas.' },
]

const DECK_PRODUCE = [
  { titulo: 'Presentaciones ejecutivas', desc: 'Para directorios, comités y conversaciones de negocio.' },
  { titulo: 'Propuestas y licitaciones', desc: 'La solución, los argumentos y el valor de tu oferta.' },
  { titulo: 'Presentaciones comerciales', desc: 'Decks de producto o servicio para procesos de venta.' },
  { titulo: 'Battlecards', desc: 'Respuestas a objeciones y comparativos frente a la competencia.' },
  { titulo: 'Sales playbooks', desc: 'Mensajes, casos de uso y argumentos ordenados para vender.' },
  { titulo: 'One-pagers', desc: 'Una propuesta o caso completo en una sola página.' },
  { titulo: 'Keynotes', desc: 'Para eventos, conferencias y vocerías ejecutivas.' },
  { titulo: 'Informes ejecutivos', desc: 'Datos y hallazgos convertidos en una lectura clara.' },
]

export default function Metodologia() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        tagline="Metodología"
        headline={<FontMix bold="Del conocimiento disperso" italic=" a un sistema que trabaja." />}
        description="Entramos al negocio, encontramos lo que vale, lo convertimos en mensajes, contenidos y herramientas, y lo ponemos frente al mercado."
        heroBg="#000000"
        heroText="#ffffff"
        ctaHref="#contacto"
        ctaLabel="Agenda una llamada →"
      >
        {/* Tres pasos. Una misma lógica. — GrillaProceso sincronizada por scroll */}
        <BodySection title="Tres pasos. Una misma lógica.">
          <div id="como-trabajamos" style={{ scrollMarginTop: '90px' }}>
            <MetodologiaPasos pasos={PASOS} />
          </div>
        </BodySection>

        {/* CTA intermedio — el lector ya está convencido acá */}
        <BodySection dark>
          <div className="flex flex-col items-center text-center gap-6">
            <p className="text-lead opacity-75" style={{ maxWidth: '32rem' }}>
              30 minutos. Sin presentaciones ni decks de venta.
            </p>
            <a href="#contacto"
              className="label inline-flex items-center px-6 py-3.5 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: '999px' }}>
              Agenda una llamada →
            </a>
          </div>
        </BodySection>

        {/* SENSOR — módulo de captura */}
        <BodySection>
          <div id="sensor" className="flex flex-col gap-10" style={{ scrollMarginTop: '90px' }}>
            <div className="flex flex-col gap-4">
              <p className="label opacity-40">Módulo de captura</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
                <FontMix bold="SENSOR: la materia prima" italic=" sale de lo que ya tienes." />
              </h2>
              <p className="text-lead opacity-70" style={{ maxWidth: '42rem' }}>
                Manuales, propuestas, grabaciones de reuniones, notas de CRM. El 70% del contenido nace de material que ya existe; el resto, de notas de voz de 10 minutos de tus expertos.
              </p>
            </div>
            <CatalogoCards items={SENSOR_FUENTES} cols={4} />
            <CatalogoCards items={SENSOR_GENERA} cols={3} />
          </div>
        </BodySection>

        {/* DECK — módulo de producción */}
        <BodySection dark>
          <div id="deck" className="flex flex-col gap-10" style={{ scrollMarginTop: '90px' }}>
            <div className="flex flex-col gap-4">
              <p className="label opacity-50">Módulo de producción</p>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
                <FontMix bold="DECK: información compleja" italic=" convertida en piezas que deciden." />
              </h2>
              <p className="text-lead opacity-70" style={{ maxWidth: '42rem' }}>
                Presentaciones, propuestas, battlecards y playbooks con un mismo criterio editorial y visual.
              </p>
            </div>
            <CatalogoCards items={DECK_PRODUCE} cols={4} />
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
