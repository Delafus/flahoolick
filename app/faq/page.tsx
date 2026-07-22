'use client'

import { useState } from 'react'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import Link from 'next/link'

const FRESH = '#8FE8BB'
const NEGRO = '#000000'

const preguntas = [
  {
    q: '¿Qué hace exactamente Flahoolick?',
    a: 'Instalamos el sistema que convierte el conocimiento técnico y comercial de una empresa B2B en presencia de mercado continua. Trabajamos en tres frentes simultáneos: definimos el relato de marca, instalamos el sistema operativo de contenido y producimos los activos que construyen presencia antes de la decisión de compra. Todo bajo un mismo criterio estratégico y editorial.',
  },
  {
    q: '¿En qué se diferencia esto de contratar una agencia de contenido?',
    a: 'Una agencia de contenido produce. Flahoolick instala el sistema que decide qué producir y por qué. La diferencia es de orden: una agencia necesita que alguien le diga qué hacer. Nosotros llegamos antes — definimos la estrategia, capturamos el conocimiento existente, modelamos las audiencias y sus tensiones, y entonces producimos. El resultado tiene la firma de lo que tu empresa realmente sabe — algo que ninguna otra empresa de tu industria puede producir.',
  },
  {
    q: '¿Con qué tipo de empresas trabajan?',
    a: 'Con empresas B2B que tienen ciclos de venta de 6 a 18 meses y decisiones de compra que involucran a múltiples personas. Nuestros clientes típicos son empresas de entre 50 y 500 empleados donde el Gerente General o el Director Comercial tiene claro que el mercado los conoce menos de lo que deberían.',
  },
  {
    q: '¿Cómo es un engagement típico?',
    a: 'Empieza con un Diagnóstico de Visibilidad — cinco días de trabajo donde auditamos qué sabe tu empresa, cómo responden los modelos de IA cuando tu comprador busca en tu categoría y dónde están los vacíos más urgentes. Ese diagnóstico tiene valor propio. Si confirma que hay trabajo estructural por hacer, diseñamos el sistema completo. La mayoría de nuestros clientes trabajan con nosotros entre 6 y 18 meses en ciclos mensuales.',
  },
  {
    q: '¿Cuánto tiempo tarda en verse resultados?',
    a: 'Las primeras piezas de autoridad salen en las primeras tres semanas. El equipo comercial empieza a usar herramientas de cierre dentro del primer mes. La disponibilidad mental — que el mercado te recuerde cuando decida buscar — es un activo que se construye en ciclos de 12 a 24 meses. Ese horizonte de tiempo es la naturaleza del mercado B2B complejo.',
  },
  {
    q: '¿Qué necesito entregarles para empezar?',
    a: 'Menos de lo que crees. SENSOR está diseñado para extraer conocimiento de material que ya existe: manuales técnicos, propuestas anteriores, grabaciones de reuniones de ventas, fichas de producto. El 70% de la materia prima la sacamos de ahí. El 30% restante lo obtenemos con notas de voz de tus expertos. No necesitas redactar briefs ni liberar tiempo de tu equipo para reuniones de briefing.',
  },
  {
    q: '¿Qué es SENSOR?',
    a: 'SENSOR es el módulo de captura e inteligencia de conocimiento de Flahoolick. Conecta cuatro tipos de fuentes a la operación de tu empresa — documentación técnica, conversaciones comerciales, objeciones de mercado y señales en plataformas de IA — y procesa ese material para convertirlo en materia prima estratégica lista para trabajar.',
  },
  {
    q: '¿Qué es DECK?',
    a: 'DECK es el módulo de producción de presentaciones ejecutivas de Flahoolick. Tomas múltiples fuentes — documentos, datos, contexto estratégico — y producimos una presentación estructurada, visualmente consistente y lista para entregar. Diseñado para pitches de directorio, propuestas técnicas, decks comerciales y keynotes.',
  },
  {
    q: '¿Trabajan con empresas fuera de Chile?',
    a: 'Sí. Operamos en español para empresas en Chile y América Latina. Lo que importa es que la empresa tenga ciclos de decisión complejos y conocimiento técnico que el mercado todavía no ve.',
  },
  {
    q: '¿Tienen casos de referencia?',
    a: 'Sí. Por razones de confidencialidad, los casos que compartimos públicamente son anonimizados o requieren autorización del cliente. En una conversación podemos mostrarte los casos relevantes para tu industria con detalle. Algunas empresas con las que hemos trabajado: Claro Empresas, UNAB, Cajas de Chile, Diario Financiero, Consorcio Ciencia e Innovación 2030, Adidas.',
  },
  {
    q: '¿Cómo empezamos?',
    a: 'Con una llamada de 30 minutos. Sin presentaciones ni decks. Solo una conversación para entender tu situación y ver si tiene sentido seguir.',
  },
]

function Acordeon({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base font-medium group-hover:opacity-60 transition-opacity">{q}</span>
        <span style={{
          fontSize: '1.2rem',
          lineHeight: 1,
          flexShrink: 0,
          marginLeft: '1rem',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? '600px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.35s ease, opacity 0.3s ease',
        opacity: open ? 1 : 0,
      }}>
        <p className="text-sm leading-relaxed pb-6 max-w-2xl" style={{ opacity: 0.65 }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <PageColorSetter bg={FRESH} text={NEGRO} />

      {/* Hero — verde menta */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: FRESH, color: NEGRO }}
      >
        <div className="max-container w-full">

          {/* Mobile */}
          <div className="flex flex-col gap-6 md:hidden">
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(3.5rem, 10vw, 11rem)', lineHeight: 1.0, letterSpacing: '-0.02em', color: NEGRO }}>
              Las preguntas de siempre.
            </h1>
            <p className="label" style={{ color: NEGRO, opacity: 0.5 }}>Lo que más nos preguntan antes de trabajar juntos</p>
            <hr style={{ borderColor: NEGRO, borderTopWidth: '1px', opacity: 0.2 }} />
            <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.65, fontWeight: 300 }}>
              Si tu pregunta no está acá, escríbenos directo.
            </p>
          </div>

          {/* Desktop: split */}
          <div className="hidden md:grid items-end gap-0"
            style={{ gridTemplateColumns: '5fr 1px 6fr' }}>
            {/* Placeholder */}
            <div style={{ aspectRatio: '4/3', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '3rem' }}>
              <span className="label" style={{ color: NEGRO, opacity: 0.2 }}>Ilustración</span>
            </div>
            {/* Divisor */}
            <div style={{ backgroundColor: 'rgba(0,0,0,0.12)', height: '100%', width: '1px' }} />
            {/* Texto */}
            <div className="flex flex-col gap-6" style={{ paddingLeft: '3rem' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(3.5rem, 8vw, 11rem)', lineHeight: 1.0, letterSpacing: '-0.025em', color: NEGRO }}>
                Las preguntas de siempre.
              </h1>
              <p className="label" style={{ color: NEGRO, opacity: 0.5 }}>Lo que más nos preguntan antes de trabajar juntos</p>
              <hr style={{ borderColor: NEGRO, borderTopWidth: '1px', opacity: 0.2 }} />
              <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.3rem)', lineHeight: 1.65, opacity: 0.65, fontWeight: 300, maxWidth: '420px' }}>
                Si tu pregunta no está acá, escríbenos directo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Acordeón — crema */}
      <section className="page-px section-py"
        style={{ backgroundColor: 'var(--brand-ground)', color: 'var(--brand-ink)' }}>
        <div className="max-container max-w-3xl">
          {preguntas.map(p => (
            <Acordeon key={p.q} q={p.q} a={p.a} />
          ))}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2rem', marginTop: '1rem' }}>
            <Link href="/#contacto" className="label opacity-50 hover:opacity-100 transition-opacity">
              Escríbenos →
            </Link>
          </div>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
