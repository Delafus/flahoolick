import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, FontMix } from '@/components/page-layout'

export const metadata: Metadata = { title: 'DECK — Flahoolick' }

const proceso = [
  { titulo: 'Reunimos las fuentes', desc: 'Recibimos documentos, datos, contexto estratégico, referencias visuales y conocimiento del equipo. El punto de partida puede ser una carpeta, un brief, una reunión o material producido anteriormente.' },
  { titulo: 'Construimos el relato', desc: 'Definimos el objetivo, la audiencia y la decisión que la pieza debe movilizar. Jerarquizamos la información y construimos una arquitectura narrativa clara.' },
  { titulo: 'Diseñamos el sistema', desc: 'Aplicamos un criterio editorial y visual consistente en todas las piezas. Cada activo refleja la identidad, el nivel técnico y la posición de la empresa.' },
  { titulo: 'Entregamos listo para activar', desc: 'Producimos cada pieza en el formato que requiere el equipo. El material queda preparado para presentar, compartir, adaptar y usar dentro del proceso comercial.' },
]

const produce = [
  { titulo: 'Presentaciones ejecutivas', desc: 'Decks para directorios, comités, reuniones estratégicas y conversaciones con líderes de negocio.' },
  { titulo: 'Propuestas y licitaciones', desc: 'Documentos que estructuran la solución, los argumentos, la evidencia y el valor de la oferta.' },
  { titulo: 'Presentaciones comerciales', desc: 'Decks de producto, servicio o solución diseñados para apoyar reuniones y procesos de venta.' },
  { titulo: 'Battlecards', desc: 'Herramientas breves para responder objeciones, comparar alternativas y fortalecer el discurso comercial.' },
  { titulo: 'Sales playbooks', desc: 'Guías que ordenan mensajes, audiencias, casos de uso, argumentos y momentos del proceso de venta.' },
  { titulo: 'One-pagers', desc: 'Piezas ejecutivas que concentran una propuesta, solución o caso en una sola página.' },
  { titulo: 'Keynotes', desc: 'Presentaciones para eventos, conferencias, lanzamientos y vocerías ejecutivas.' },
  { titulo: 'Informes ejecutivos', desc: 'Documentos que convierten datos, análisis y hallazgos en una lectura clara para la toma de decisiones.' },
]

export default function DeckPage() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        headline={<FontMix bold="Activos comerciales" />}
        tagline="ACTIVOS PARA DECIDIR"
        description="DECK convierte información compleja en herramientas comerciales y ejecutivas claras, consistentes y listas para usar. Construimos presentaciones, propuestas, battlecards, playbooks y piezas que ayudan a explicar valor, sostener argumentos y avanzar decisiones."
        heroBg="#000000"
        heroText="#ffffff"
        illustration={{ src: '/deck-cover.svg', alt: 'DECK — activos ejecutivos y comerciales listos para usar', ratio: '1/1' }}
      >
        <BodySection title="Cómo funciona"><HowList items={proceso} /></BodySection>
        <BodySection dark title="Lo que produce DECK">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {produce.map((p, i) => (
              <div key={i} className="flex flex-col gap-4 p-10" style={{ backgroundColor: 'var(--section-dark-bg)' }}>
                <p className="label opacity-25">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-base font-semibold">{p.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-60">{p.desc}</p>
              </div>
            ))}
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
