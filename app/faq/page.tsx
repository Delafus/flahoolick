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
    a: 'Instalamos el sistema que convierte el conocimiento técnico y comercial de una empresa B2B en presencia de mercado continua. Trabajamos en tres frentes simultáneos: definimos el relato de marca, instalamos el sistema operativo de contenido y producimos los activos que construyen presencia antes de la decisión de compra. El resultado es un flujo continuo de contenido con criterio, gobernanza y medición — que funciona mientras el equipo comercial está en la calle cerrando negocios.',
    link: { label: 'Explorar Capacidades →', href: '/capacidades' },
  },
  {
    q: '¿Qué tipo de problemas resuelven exactamente?',
    a: 'Trabajamos con empresas que enfrentan alguna de estas situaciones: el mercado no ve todo lo que la empresa sabe hacer; cada vendedor explica el servicio distinto; el contenido que producen no genera conversaciones comerciales reales; o llevan meses "trabajando en el marketing" sin que nada se acumule. Son empresas que ya tienen una ventaja real — el problema es que esa ventaja no está visible antes de que el comprador decida buscar.',
    link: { label: 'Ver nuestras Capacidades →', href: '/capacidades' },
  },
  {
    q: '¿En qué se diferencia esto de contratar una agencia de contenido?',
    a: 'Una agencia de contenido produce cuando alguien le dice qué hacer. Flahoolick llega antes — define la estrategia, captura el conocimiento existente, modela las audiencias y sus tensiones, y entonces produce. La diferencia es de orden: el resultado tiene la firma de lo que tu empresa realmente sabe, algo que ninguna otra empresa de tu industria puede reproducir. Eso es lo que construye autoridad de mercado real.',
    link: { label: 'Conocer nuestra Metodología →', href: '/metodologia' },
  },
  {
    q: '¿Con quién nos comparan?',
    a: 'Nos comparan con agencias de contenido, consultoras de marketing B2B y productoras de contenido especializado. La diferencia concreta es de arquitectura: esas opciones producen activos individuales. Flahoolick instala un sistema. El sistema captura conocimiento, lo modela con criterio editorial, lo produce y mide la respuesta del mercado para calibrar el ciclo siguiente. Con el tiempo, ese activo crece y se vuelve difícil de replicar.',
    link: { label: 'Cómo trabajamos con IA →', href: '/metodologia/como-trabajamos-con-ia' },
  },
  {
    q: '¿Con qué tipo de empresas trabajan?',
    a: 'Con empresas B2B que tienen ciclos de venta de 6 a 18 meses y decisiones de compra que involucran a múltiples personas. Nuestros clientes típicos son empresas de entre 50 y 500 empleados donde el Gerente General o el Director Comercial tiene claro que el mercado los conoce menos de lo que deberían. Sectores con más experiencia: tecnología B2B, servicios financieros especializados, ingeniería y servicios industriales, salud corporativa y educación ejecutiva.',
    link: null,
  },
  {
    q: '¿Quién dentro de mi empresa debería contratarnos?',
    a: 'Generalmente nos llama el Gerente General, el Director Comercial o el Director de Marketing cuando sienten que el mercado no refleja lo que la empresa realmente vale. En algunos casos también nos llama quien lidera ventas, porque nota que el equipo comercial tiene que explicar demasiado antes de generar interés real. El trabajo termina siendo transversal — estrategia, contenido y ventas operan sobre el mismo sistema.',
    link: { label: 'Conversemos →', href: '/#contacto' },
  },
  {
    q: '¿Cómo es un engagement típico?',
    a: 'Empieza con un Diagnóstico de Visibilidad — cinco días de trabajo donde auditamos qué sabe tu empresa, cómo responden los modelos de IA cuando tu comprador busca en tu categoría y dónde están los vacíos más urgentes. Ese diagnóstico tiene valor propio: te quedas con él independientemente de lo que decidas después. Si confirma que hay trabajo estructural por hacer, diseñamos el sistema completo. La mayoría de nuestros clientes trabajan con nosotros entre 6 y 18 meses en ciclos mensuales.',
    link: { label: 'Cómo funciona el sistema →', href: '/metodologia/como-funciona-el-sistema' },
  },
  {
    q: '¿Cuánto tiempo tarda en verse resultados?',
    a: 'Las primeras piezas de autoridad salen en las primeras tres semanas. El equipo comercial empieza a usar herramientas de cierre dentro del primer mes. La disponibilidad mental — que el mercado te recuerde cuando decida buscar — es un activo que se construye en ciclos de 12 a 24 meses. Ese horizonte de tiempo es la naturaleza del mercado B2B complejo. Las empresas que lo entienden son las que terminan siendo las que el mercado recuerda.',
    link: { label: 'Cómo aprendemos →', href: '/metodologia/como-aprendemos' },
  },
  {
    q: '¿Qué necesito entregarles para empezar?',
    a: 'Menos de lo que crees. SENSOR está diseñado para extraer conocimiento de material que ya existe: manuales técnicos, propuestas anteriores, grabaciones de reuniones de ventas, fichas de producto. El 70% de la materia prima la sacamos de ahí. El 30% restante lo obtenemos con notas de voz de 10 minutos de tus expertos. No necesitas redactar briefs ni liberar tiempo de tu equipo para reuniones de briefing.',
    link: { label: 'Conocer SENSOR →', href: '/sensor' },
  },
  {
    q: '¿Qué es SENSOR?',
    a: 'SENSOR es el módulo de captura e inteligencia de conocimiento de Flahoolick. Procesa documentación técnica, conversaciones comerciales, objeciones de mercado y señales en plataformas de IA para convertir ese material en materia prima estratégica lista para trabajar. No lo opera el cliente — lo opera el equipo de Flahoolick.',
    link: { label: 'Conocer SENSOR →', href: '/sensor' },
  },
  {
    q: '¿Qué es DECK?',
    a: 'DECK es el módulo de producción de presentaciones ejecutivas de Flahoolick. Tomas múltiples fuentes — documentos, datos, contexto estratégico — y producimos una presentación estructurada, visualmente consistente y lista para entregar. Diseñado para pitches de directorio, propuestas técnicas, decks comerciales y keynotes. Sin el resultado genérico que los generadores de IA producen en tres minutos.',
    link: { label: 'Conocer DECK →', href: '/deck' },
  },
  {
    q: '¿Tienen casos de referencia?',
    a: 'Sí. Por razones de confidencialidad, los casos que compartimos públicamente son anonimizados o requieren autorización del cliente. En una conversación podemos mostrarte los casos relevantes para tu industria con detalle. Algunas empresas con las que hemos trabajado: Claro Empresas, UNAB, Cajas de Chile, Diario Financiero, Consorcio Ciencia e Innovación 2030, Adidas.',
    link: { label: 'Conversemos →', href: '/#contacto' },
  },
  {
    q: '¿Trabajan con empresas fuera de Chile?',
    a: 'Sí. Operamos en español para empresas en Chile y América Latina. Lo que importa es que la empresa tenga ciclos de decisión complejos y conocimiento técnico que el mercado todavía no ve.',
    link: null,
  },
  {
    q: '¿Cómo empezamos?',
    a: 'Con una llamada de 30 minutos. Sin presentaciones ni decks de venta. Solo una conversación para entender tu situación y ver si tiene sentido seguir. Si el diagnóstico confirma que hay trabajo por hacer, te presentamos una propuesta en la semana siguiente.',
    link: { label: 'Agendar una llamada →', href: '/#contacto' },
  },
]

function Acordeon({ q, a, link }: { q: string; a: string; link: { label: string; href: string } | null }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-start justify-between text-left group py-6 gap-6"
      >
        <span style={{
          fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
          fontWeight: 500,
          lineHeight: 1.3,
          transition: 'opacity 0.2s',
        }}
          className="group-hover:opacity-60 transition-opacity"
        >{q}</span>
        <span style={{
          fontSize: '1.4rem',
          lineHeight: 1,
          flexShrink: 0,
          marginTop: '2px',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? '800px' : '0px',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease, opacity 0.3s ease',
        opacity: open ? 1 : 0,
      }}>
        <div className="pb-8 flex flex-col gap-4">
          <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7, opacity: 0.65, maxWidth: '680px' }}>{a}</p>
          {link && (
            <Link href={link.href}
              className="label hover:opacity-60 transition-opacity"
              style={{ opacity: 0.5 }}>
              {link.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <PageColorSetter bg={FRESH} text={NEGRO} />

      {/* Hero — verde menta */}
      <section className="page-hero page-px" style={{ backgroundColor: FRESH, color: NEGRO }}>
        <div className="max-container w-full">
          {/* Mobile */}
          <div className="flex flex-col gap-6 md:hidden">
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(3.5rem, 10vw, 8rem)', lineHeight: 1.0, letterSpacing: '-0.02em', color: NEGRO }}>
              Las preguntas de siempre.
            </h1>
            <p className="label" style={{ color: NEGRO, opacity: 0.5 }}>Lo que más nos preguntan antes de trabajar juntos</p>
            <hr style={{ borderColor: NEGRO, borderTopWidth: '1px', opacity: 0.2 }} />
            <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.65, fontWeight: 300 }}>Si tu pregunta no está acá, escríbenos directo.</p>
          </div>
          {/* Desktop */}
          <div className="hidden md:grid items-end gap-0" style={{ gridTemplateColumns: '5fr 1px 6fr' }}>
            <div style={{ aspectRatio: '4/3', border: '1px solid rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '3rem' }}>
              <span className="label" style={{ color: NEGRO, opacity: 0.2 }}>Ilustración</span>
            </div>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.12)', height: '100%', width: '1px' }} />
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

      {/* Intro + acordeón — crema */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--brand-ground)', color: 'var(--brand-ink)' }}>
        <div className="max-container">
          {/* Intro estilo NOBL */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-16"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '2rem' }}>
            <div className="flex flex-col gap-1">
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', lineHeight: 1.2 }}>
                Preguntado y respondido
              </p>
              <p className="text-sm opacity-55">Las preguntas más frecuentes de clientes potenciales antes de empezar.</p>
            </div>
            <Link href="/#contacto"
              className="label inline-flex items-center gap-2 border px-5 py-3 w-fit hover:opacity-60 transition-opacity shrink-0"
              style={{ borderColor: 'rgba(0,0,0,0.3)' }}>
              Escríbenos →
            </Link>
          </div>

          {/* Acordeón */}
          <div className="max-w-4xl">
            {preguntas.map(p => (
              <Acordeon key={p.q} q={p.q} a={p.a} link={p.link} />
            ))}
            <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2rem', marginTop: '1rem' }}>
              <Link href="/#contacto" className="label opacity-50 hover:opacity-100 transition-opacity">
                Escríbenos →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
