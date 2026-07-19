'use client'

import { useState } from 'react'
import { PageColorSetter } from '@/components/page-color-setter'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

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
    a: 'Con empresas B2B que tienen ciclos de venta de 6 a 18 meses y decisiones de compra que involucran a múltiples personas. Nuestros clientes típicos son empresas de entre 50 y 500 empleados donde el Gerente General o el Director Comercial tiene claro que el mercado los conoce menos de lo que deberían. Sectores con más experiencia: tecnología B2B, servicios financieros especializados, ingeniería y servicios industriales, salud corporativa y educación ejecutiva.',
  },
  {
    q: '¿Cómo es un engagement típico?',
    a: 'Empieza con un Diagnóstico de Visibilidad — cinco días de trabajo donde auditamos qué sabe tu empresa, cómo responden los modelos de IA cuando tu comprador busca en tu categoría y dónde están los vacíos más urgentes. Ese diagnóstico tiene valor propio: te quedas con él independientemente de lo que decidas después. Si el diagnóstico confirma que hay trabajo estructural por hacer, diseñamos el sistema completo. La mayoría de nuestros clientes trabajan con nosotros entre 6 y 18 meses en ciclos mensuales.',
  },
  {
    q: '¿Cuánto tiempo tarda en verse resultados?',
    a: 'Las primeras piezas de autoridad salen en las primeras tres semanas. El equipo comercial empieza a usar herramientas de cierre dentro del primer mes. La disponibilidad mental — que el mercado te recuerde cuando decida buscar — es un activo que se construye en ciclos de 12 a 24 meses. Ese horizonte de tiempo es la naturaleza del mercado B2B complejo. Las empresas que lo entienden son las que terminan siendo las que el mercado recuerda.',
  },
  {
    q: '¿Qué necesito entregarles para empezar?',
    a: 'Menos de lo que crees. SENSOR está diseñado para extraer conocimiento de material que ya existe: manuales técnicos, propuestas anteriores, grabaciones de reuniones de ventas, fichas de producto. El 70% de la materia prima la sacamos de ahí. El 30% restante lo obtenemos con notas de voz de 10 minutos de tus expertos. No necesitas redactar briefs. No necesitas liberar tiempo de tu equipo para reuniones de briefing.',
  },
  {
    q: '¿Qué es SENSOR?',
    a: 'SENSOR es el módulo de captura e inteligencia de conocimiento de Flahoolick. Conecta cuatro tipos de sensores a la operación de tu empresa — comerciales, técnicos, de mercado y de contenido — y procesa ese material para convertirlo en materia prima estratégica lista para trabajar. SENSOR no lo opera el cliente. Lo opera el equipo de Flahoolick.',
  },
  {
    q: '¿Qué es DECK?',
    a: 'DECK es el módulo de producción de presentaciones ejecutivas de Flahoolick. Tomas múltiples fuentes — documentos, datos, contexto estratégico — y producimos una presentación estructurada, visualmente consistente y lista para entregar. Diseñado para pitches de directorio, propuestas técnicas, decks comerciales y keynotes. Sin el resultado genérico que producen los generadores de IA en tres minutos.',
  },
  {
    q: '¿Trabajan con empresas fuera de Chile?',
    a: 'Sí. Operamos en español para empresas en Chile y América Latina. Lo que importa es que la empresa tenga ciclos de decisión complejos y conocimiento técnico que el mercado todavía no ve.',
  },
  {
    q: '¿Cuál es la inversión mínima para trabajar con Flahoolick?',
    a: 'El Diagnóstico de Visibilidad es el punto de entrada y tiene un costo fijo. No tomamos más de tres clientes en sistema completo simultáneamente para mantener el nivel de criterio senior que el trabajo requiere.',
  },
  {
    q: '¿Tienen casos de referencia?',
    a: 'Sí. Por razones de confidencialidad, los casos que compartimos públicamente son anonimizados o requieren autorización del cliente. En una conversación podemos mostrarte los casos relevantes para tu industria con detalle. Algunas empresas con las que hemos trabajado: Claro Empresas, UNAB, Cajas de Chile, Diario Financiero, Consorcio Ciencia e Innovación 2030, Adidas.',
  },
  {
    q: '¿Cómo empezamos?',
    a: 'Con una llamada de 30 minutos. Sin presentaciones ni decks de venta. Solo una conversación para entender tu situación y ver si tiene sentido seguir.',
  },
]

function Acordeon({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-negro/10">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-start justify-between gap-8 py-6 text-left group"
      >
        <span className="text-base font-medium text-negro group-hover:opacity-70 transition-opacity">
          {q}
        </span>
        <span className="text-negro/40 shrink-0 mt-1 text-xl leading-none">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="pb-8 pr-12">
          <p className="text-sm text-negro/60 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <PageColorSetter bg="#F9F0E2" text="#000000" />

      {/* Hero */}
      <section
        className="page-hero flex flex-col justify-end px-6 md:px-10 pb-16 pt-32"
        style={{ backgroundColor: '#F9F0E2' }}
      >
        <div className="max-w-screen-xl mx-auto w-full flex flex-col gap-6">
          <p className="text-label text-negro/50">Las que más nos hacen antes de trabajar juntos.</p>
          <h1 className="font-display text-display-lg text-negro leading-none">
            Preguntas frecuentes.
          </h1>
          <Link href="/#contacto" className="text-label text-negro/50 hover:text-negro transition-colors">
            Escríbenos →
          </Link>
        </div>
      </section>

      {/* FAQ acordeón */}
      <section className="bg-crema py-24 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl">
            {preguntas.map(p => (
              <Acordeon key={p.q} q={p.q} a={p.a} />
            ))}
            <div className="border-t border-negro/10 pt-8 mt-4">
              <Link href="/#contacto" className="text-label text-negro/50 hover:text-negro transition-colors">
                Escríbenos →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm bg="#3B0B2C" text="#ffffff" />
    </>
  )
}
