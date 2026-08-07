import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'
import { ServicioScrollSteps } from '@/components/servicio-scroll-steps'
import { CasoAudioBrief } from '@/components/caso-audio-brief'
import { CasoImagenBrief } from '@/components/caso-imagen-brief'

export const metadata: Metadata = {
  title: 'FrecuenciA — Flahoolick',
  description: 'Tu negocio en la frecuencia exacta. Dossiers, simuladores, blogs y agentes conectados a tu base de datos, construidos con IA y publicados en semanas.',
}

const NEGRO = '#000000'
const VERDE = '#1FDE91'

const queResuelve = [
  'Tu conocimiento técnico vive en PDFs, WhatsApps y reuniones que nadie vuelve a leer.',
  'Tu equipo comercial repite lo mismo a cada prospecto en vez de mostrarlo.',
  'Tus herramientas de venta son PDFs estáticos, no experiencias que capturan leads.',
]

const productosDunamis = [
  { titulo: 'Dossier de servicios', href: 'https://servicios.dunamis.broker/' },
  { titulo: 'Simulador de valorización', href: 'https://valor.dunamis.broker/' },
  { titulo: 'Diagnóstico comprar/arrendar', href: 'https://decision.dunamis.broker/' },
  { titulo: 'Blog editorial (12 artículos)', href: 'https://www.dunamis.broker/blog' },
  { titulo: 'Agente Dee', href: 'https://dunamis.agency/' },
]

const niveles = [
  { numero: 'NIVEL 1', titulo: 'Dossier', desc: 'Un documento interactivo que reemplaza tus PDFs de ventas estáticos.' },
  { numero: 'NIVEL 2', titulo: 'Simulador', desc: 'Una herramienta con lógica y datos propios que califica y captura leads en vivo.' },
  { numero: 'NIVEL 3', titulo: 'Sistema editorial', desc: 'Un blog con voz propia y producción continua, integrado al resto.' },
  { numero: 'NIVEL 4', titulo: 'Agente', desc: 'Un asistente conectado a tu inventario o base de datos que conversa, filtra y agenda sin intervención humana.' },
]

const pasos = [
  { numero: '01', titulo: 'Encontramos', desc: 'Identificamos el conocimiento disperso en documentos, conversaciones y la cabeza de tu equipo.' },
  { numero: '02', titulo: 'Ordenamos', desc: 'Priorizamos qué debe convertirse en herramienta pública y qué puede esperar.' },
  { numero: '03', titulo: 'Construimos', desc: 'Diseñamos el dossier, el simulador o el sistema editorial con tu información real.' },
  { numero: '04', titulo: 'Publicamos', desc: 'Sacamos la herramienta al mercado, lista para que la use tu equipo comercial.' },
  { numero: '05', titulo: 'Medimos', desc: 'Revisamos uso, leads capturados y preguntas nuevas para mejorar el siguiente ciclo.' },
]

const TRANSCRIPCION_DUNAMIS = 'Oye... necesito que me ayudes con algo. Los agentes me están pidiendo hace semanas un dossier, algo que puedan mandarle al cliente apenas preguntan por comisiones, por plazos, todo eso. Ahora se los explican por WhatsApp, cada uno a su manera, y se pierde información, o queda mal explicado. No necesito nada... como muy elaborado. Algo simple, que se entienda rápido, que se vea profesional. Que un agente lo mande y el cliente quede tranquilo, no con más dudas. ¿Podemos armar algo así? Como para tenerlo listo esta semana si se puede.'

export default function FrecuenciaPage() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        tagline={<>Frecuenc<span style={{ color: VERDE }}>IA</span></>}
        headline="Tu negocio en la frecuencia exacta."
        description="Convertimos el conocimiento disperso de tu empresa en herramientas públicas que venden — todos los días, sin depender de que alguien lo explique de nuevo."
        heroBg="#000000"
        heroText="#ffffff"
        ctaHref="#contacto"
        ctaLabel="Agenda una demo de FrecuenciA →"
        contact={{
          submitLabel: 'Agenda tu demo de FrecuenciA →',
        }}
      >
        {/* Qué resuelve */}
        <BodySection dark title="Qué resuelve">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.15)' }}>
            {queResuelve.map(t => (
              <div key={t} className="flex flex-col gap-3 p-8" style={{ backgroundColor: NEGRO }}>
                <h3 className="text-base font-semibold leading-snug">{t}</h3>
              </div>
            ))}
          </div>
        </BodySection>

        {/* Caso en vivo: Dunamis */}
        <BodySection title="Caso en vivo: Dunamis">
          <div className="flex flex-col gap-10">
            <p className="text-center text-base opacity-60" style={{ maxWidth: '32rem', margin: '0 auto' }}>
              Esto es lo que recibimos. Sin guion, sin brief formal.
            </p>

            <CasoAudioBrief
              src="/audio/dunamis-brief.mp3"
              numero="01"
              label="EL PUNTO DE PARTIDA · AUDIO REAL"
              transcripcion={TRANSCRIPCION_DUNAMIS}
              color={NEGRO}
            />

            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-sm opacity-50">De esta conversación salió el sistema completo que ves abajo.</p>
              <Link
                href="https://servicios.dunamis.broker"
                target="_blank" rel="noopener noreferrer"
                className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                style={{ backgroundColor: NEGRO, color: '#ffffff' }}
              >
                Ver el dossier que generó →
              </Link>
            </div>

            <CasoImagenBrief
              src="/dee-chat.svg"
              alt="Conversación real con Dee, el agente de Dunamis Agency"
              numero="02"
              label="AGENTE AUTOMATIZADO · DUNAMIS AGENCY (CHICUREO)"
              contextoTexto="Dee conversa, entiende lo que el cliente busca y responde con propiedades reales de la base de datos. Sin formularios, sin menús."
              resultadoTexto="Cada conversación termina en una visita agendada o un dato de contacto capturado."
              color={NEGRO}
            />

            <div className="flex flex-col items-center gap-4 text-center">
              <Link
                href="https://dunamis.agency"
                target="_blank" rel="noopener noreferrer"
                className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                style={{ backgroundColor: NEGRO, color: '#ffffff' }}
              >
                Habla con Dee →
              </Link>
            </div>

            {/* Los 5 productos en vivo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px mt-4" style={{ background: 'rgba(0,0,0,0.1)' }}>
              {productosDunamis.map(p => (
                <Link key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 p-6 hover:opacity-70 transition-opacity"
                  style={{ backgroundColor: 'var(--section-body-bg)' }}>
                  <span className="text-sm font-semibold">{p.titulo}</span>
                  <span className="label opacity-40 group-hover:opacity-80 transition-opacity flex-shrink-0">Ver →</span>
                </Link>
              ))}
            </div>

            <p className="text-center text-sm opacity-45">El equipo de ventas de Dunamis lo usa a diario para cerrar clientes.</p>
          </div>
        </BodySection>

        {/* Cuatro niveles */}
        <BodySection dark title="Cuatro niveles">
          <div className="flex flex-col">
            {niveles.map(n => (
              <div key={n.titulo} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <p className="label opacity-40 md:col-span-3">{n.numero}</p>
                <h3 className="md:col-span-3" style={{
                  fontFamily: 'var(--font-display)', fontWeight: 400,
                  fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', lineHeight: 1.1,
                }}>{n.titulo}</h3>
                <p className="md:col-span-6 text-sm leading-relaxed opacity-65">{n.desc}</p>
              </div>
            ))}
          </div>
        </BodySection>

        {/* Cómo funciona */}
        <BodySection title="Cómo funciona">
          <ServicioScrollSteps pasos={pasos} color={NEGRO} />
        </BodySection>
      </PageLayout>
    </>
  )
}
