import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, HowList, Tags, FontMix } from '@/components/page-layout'

export const metadata: Metadata = { title: 'Herramientas de IA para marketing y ventas — Flahoolick' }

const NEGRO = '#000000'

const aperturaTexto = [
  'En cada empresa existen tareas que consumen horas, procesos que dependen de información dispersa y oportunidades que necesitan seguimiento.',
  'Partimos desde ese trabajo. Entendemos cómo funciona, qué información necesita, qué decisiones involucra y qué resultado debería producir.',
  'Luego construimos una herramienta capaz de integrarse a la forma real en que trabaja tu equipo.',
]

const quePodemosConstruir = [
  {
    titulo: 'Agentes comerciales con IA',
    desc: 'Agentes capaces de conversar con prospectos y ejecutar una parte concreta del proceso comercial. Pueden contactar leads, responder consultas, hacer preguntas, calificar oportunidades, agendar reuniones, enviar información, activar pagos y realizar seguimiento.',
    bullets: [
      'Trabajan con los argumentos, reglas, audiencias y conocimiento comercial de tu empresa.',
      'Pueden operar por correo, teléfono y otros canales conectados al sistema.',
      'Cuando una conversación requiere criterio humano, derivan la oportunidad a una persona.',
    ],
  },
  {
    titulo: 'Inteligencia de audiencias',
    desc: 'Herramientas que reúnen investigación, datos, entrevistas, señales del mercado y conocimiento interno para ayudar a comprender mejor a clientes y prospectos. Permiten consultar audiencias, detectar necesidades, explorar objeciones y encontrar oportunidades para campañas, contenidos y propuestas comerciales.',
    bullets: [],
  },
  {
    titulo: 'Asistentes de conocimiento',
    desc: 'Sistemas que conectan documentos, presentaciones, manuales, investigaciones, reuniones y otras fuentes internas.',
    bullets: [
      'El equipo puede consultar ese conocimiento utilizando lenguaje natural.',
      'La información queda disponible para marketing, ventas y equipos técnicos en un mismo entorno.',
    ],
  },
  {
    titulo: 'Sistemas de producción de contenido',
    desc: 'Herramientas que convierten conocimiento existente en briefs, borradores, adaptaciones, estructuras y piezas para diferentes audiencias y canales. Pueden conectarse con fuentes internas, reglas editoriales y criterios de marca para acelerar procesos de producción recurrentes.',
    bullets: [],
  },
  {
    titulo: 'Sistemas de revisión',
    desc: 'Herramientas que analizan contenidos, presentaciones, campañas o materiales comerciales utilizando criterios definidos por la organización. Pueden revisar tono, mensajes, estructura, argumentos, consistencia de marca y otros parámetros específicos.',
    bullets: [],
  },
]

const agenteProceso = [
  'Un lead entra al sistema.',
  'El agente identifica quién es y reúne contexto disponible.',
  'Inicia la conversación.',
  'Hace las preguntas necesarias.',
  'Califica la oportunidad.',
  'Responde utilizando el conocimiento de la empresa.',
  'Agenda una reunión cuando corresponde.',
  'Puede enviar una propuesta o un link de pago.',
  'Hace seguimiento si la acción sigue pendiente.',
  'Registra cada interacción.',
  'Actualiza el estado de la oportunidad.',
  'Entrega la conversación a una persona cuando necesita intervención humana.',
]

const conocimientoTags = [
  'Oferta', 'Productos', 'Audiencias', 'Casos', 'Argumentos', 'Preguntas frecuentes',
  'Objeciones', 'Políticas comerciales', 'Documentos', 'Procesos', 'Reglas', 'Permisos',
  'Criterios de escalamiento',
]

const formasHerramienta = [
  'Puede ser un agente que habla con clientes.',
  'Una aplicación interna.',
  'Un asistente privado.',
  'Un panel de inteligencia.',
  'Una herramienta conectada al CRM.',
  'Un flujo automatizado.',
  'Un sistema que combina diferentes modelos y servicios de inteligencia artificial.',
  'Diseñamos la solución alrededor del trabajo que necesita resolver.',
]

const comoLaConstruimos = [
  { titulo: 'Encontramos el trabajo', desc: 'Identificamos una tarea frecuente, relevante y suficientemente definida. Entendemos quién la realiza, cuánto tiempo consume, qué información utiliza y qué resultado necesita producir.' },
  { titulo: 'Definimos cómo debe actuar', desc: 'Ordenamos conocimiento, fuentes, reglas, decisiones, permisos, conversaciones y puntos de control. También definimos qué puede resolver autónomamente y qué situaciones necesitan intervención humana.' },
  { titulo: 'Construimos la solución', desc: 'Diseñamos la herramienta, los agentes, las integraciones y la interfaz necesaria. Conectamos los servicios y plataformas que requiere el flujo.' },
  { titulo: 'La ponemos a trabajar', desc: 'Probamos la herramienta con situaciones reales. Observamos resultados. Ajustamos instrucciones, conocimiento y reglas. Documentamos su funcionamiento para que pueda operar dentro del equipo.' },
]

const criterioTexto = [
  'Cada herramienta trabaja con fuentes, reglas y permisos definidos.',
  'Un agente comercial conoce la oferta que representa.',
  'Un asistente interno conoce los documentos autorizados.',
  'Un sistema de contenido conoce la voz y los criterios de la marca.',
  'Un flujo automatizado conoce las condiciones necesarias para ejecutar una acción.',
  'El criterio forma parte del sistema desde su diseño.',
]

const casoConcretoEjemplos = [
  'Un agente que califique y agende.',
  'Una herramienta que ordene conocimiento.',
  'Un sistema que acelere contenido.',
  'Un asistente que responda preguntas internas.',
  'Una tarea.',
  'Un resultado.',
  'Una herramienta trabajando.',
]

function Bullets({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map(item => (
        <p key={item} className="text-sm leading-relaxed" style={{ opacity: dark ? 0.65 : 0.65, paddingLeft: '1.25rem', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 0, opacity: 0.5 }}>—</span>
          {item}
        </p>
      ))}
    </div>
  )
}

export default function HerramientasDeIAParaMarketing() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text={NEGRO} />
      <PageLayout
        tagline="Herramientas de IA para marketing y ventas"
        headline={<FontMix bold="Pon la IA a trabajar" italic=" en tareas reales." />}
        description="Diseñamos e implementamos herramientas y agentes con IA para investigar, organizar conocimiento, automatizar tareas y ejecutar procesos de marketing y ventas."
        heroBg="#F09DB6"
        heroText={NEGRO}
        ctaHref="#contacto"
        ctaLabel="Cuéntanos qué quieres resolver →"
        contact={{
          submitLabel: 'Cuéntanos qué quieres resolver →',
        }}
      >
        {/* Bloque de apertura */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-6">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
                <FontMix bold="La IA genera valor" italic=" cuando resuelve un trabajo concreto." />
              </h2>
              <p className="text-base leading-relaxed opacity-65">
                Desde un agente que califica leads y agenda reuniones hasta una herramienta interna que convierte documentos dispersos en conocimiento disponible para todo el equipo.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {aperturaTexto.map((p, i) => (
                <p key={p} className={i === 0 ? 'text-lead opacity-80' : 'text-base leading-relaxed opacity-65'}>{p}</p>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Qué podemos construir — 5 bloques planos, sin cards de IA */}
        <BodySection dark>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
              <FontMix bold="Qué podemos" italic=" construir" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.15)' }}>
              {quePodemosConstruir.map(p => (
                <div key={p.titulo} className="flex flex-col gap-4 p-8" style={{ backgroundColor: NEGRO }}>
                  <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{p.titulo}</h3>
                  <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
                  {p.bullets.length > 0 && <Bullets items={p.bullets} dark />}
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Un agente puede hacerse cargo de todo el proceso */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', lineHeight: 1.05 }} className="max-w-3xl">
              <FontMix bold="Un agente puede hacerse cargo" italic=" de una parte completa del proceso comercial." />
            </h2>
            <div className="flex flex-col" style={{ maxWidth: '38rem' }}>
              {agenteProceso.map((paso, i) => (
                <div key={paso} className="flex flex-row gap-4 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <p className="label opacity-30" style={{ flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</p>
                  <p className="text-sm leading-relaxed opacity-70">{paso}</p>
                </div>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Cada agente aprende cómo funciona tu negocio */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
                <FontMix bold="Cada agente aprende" italic=" cómo funciona tu negocio." />
              </h2>
              <p className="text-base leading-relaxed opacity-65">
                Una herramienta genérica conoce una tarea. Una herramienta construida para tu empresa incorpora además tu forma de trabajar.
              </p>
            </div>
            <Tags items={conocimientoTags} dark />
          </div>
        </BodySection>

        {/* La herramienta toma la forma que el trabajo necesita */}
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="La herramienta toma la forma" italic=" que el trabajo necesita." />
            </h2>
            <Bullets items={formasHerramienta} />
          </div>
        </BodySection>

        {/* Cómo la construimos */}
        <BodySection>
          <div className="flex flex-col gap-10">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.0 }}>
              <FontMix bold="Cómo" italic=" la construimos" />
            </h2>
            <HowList items={comoLaConstruimos} />
          </div>
        </BodySection>

        {/* IA con criterio incorporado */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
              <FontMix bold="IA con criterio" italic=" incorporado." />
            </h2>
            <div className="flex flex-col gap-3">
              {criterioTexto.map(t => (
                <p key={t} className="text-base leading-relaxed opacity-65">{t}</p>
              ))}
            </div>
          </div>
        </BodySection>

        {/* Tecnología al servicio de una tarea */}
        <BodySection>
          <div className="flex flex-col gap-4" style={{ maxWidth: '42rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1 }}>
              <FontMix bold="Tecnología" italic=" al servicio de una tarea." />
            </h2>
            <p className="text-base leading-relaxed opacity-65">
              Trabajamos con modelos, plataformas y APIs existentes para construir la combinación adecuada para cada proyecto. La solución puede integrar inteligencia artificial, automatización, voz, correo, CRM, calendarios, bases de conocimiento, sistemas de pago y herramientas internas.
            </p>
            <p className="text-base leading-relaxed opacity-65">
              Elegimos la arquitectura según el problema, el volumen, el riesgo y el nivel de autonomía requerido.
            </p>
          </div>
        </BodySection>

        {/* Empecemos por un caso concreto */}
        <BodySection dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', lineHeight: 1.0 }}>
                <FontMix bold="Empecemos por" italic=" un caso concreto." />
              </h2>
              <p className="text-base leading-relaxed opacity-65">
                No necesitas transformar toda la empresa para comenzar. Podemos tomar un proceso específico y construir una primera solución funcional.
              </p>
            </div>
            <Bullets items={casoConcretoEjemplos} dark />
          </div>
        </BodySection>

      </PageLayout>
    </>
  )
}
