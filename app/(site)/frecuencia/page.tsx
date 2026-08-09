import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, FontMix } from '@/components/page-layout'
import { CatalogoCards } from '@/components/catalogo-cards'
import { NavegableCards } from '@/components/navegable-cards'
import { CasoAudioBrief } from '@/components/caso-audio-brief'
import { DotPattern } from '@/components/dot-pattern'

export const metadata: Metadata = {
  title: 'FrecuenciA — Flahoolick',
  description: 'Tu negocio en la frecuencia exacta. Dossiers, simuladores, blogs y agentes conectados a tu base de datos, construidos con IA y publicados en semanas.',
}

const NEGRO = '#000000'

const queResuelve = [
  { titulo: 'Conocimiento atrapado', desc: 'Vive en PDFs, WhatsApps y reuniones que nadie vuelve a leer.' },
  { titulo: 'Discurso que no escala', desc: 'Tu equipo repite lo mismo a cada prospecto, uno por uno.' },
  { titulo: 'Herramientas que no capturan', desc: 'PDFs estáticos en vez de experiencias que generan leads.' },
]

const productosDunamis = [
  { label: 'HERRAMIENTA', titulo: 'Dossier', desc: 'Reemplaza el PDF de ventas.', href: 'https://servicios.dunamis.broker/' },
  { label: 'HERRAMIENTA', titulo: 'Simulador', desc: 'Valoriza propiedades y captura leads.', href: 'https://valor.dunamis.broker/' },
  { label: 'HERRAMIENTA', titulo: 'Diagnóstico', desc: 'Comprar o arrendar, resuelto en minutos.', href: 'https://decision.dunamis.broker/' },
  { label: 'EDITORIAL', titulo: 'Blog', desc: '12 artículos con voz propia.', href: 'https://www.dunamis.broker/blog' },
  { label: 'AGENTE', titulo: 'Dee', desc: 'Conversa, filtra y agenda visitas.', href: 'https://dunamis.agency/' },
]

const niveles = [
  { numero: 'NIVEL 1', titulo: 'Dossier', desc: 'Un documento interactivo que reemplaza tus PDFs de ventas estáticos.' },
  { numero: 'NIVEL 2', titulo: 'Simulador', desc: 'Una herramienta con lógica y datos propios que califica y captura leads en vivo.' },
  { numero: 'NIVEL 3', titulo: 'Sistema editorial', desc: 'Un blog con voz propia y producción continua, integrado al resto.' },
  { numero: 'NIVEL 4', titulo: 'Agente', desc: 'Un asistente conectado a tu inventario o base de datos que conversa, filtra y agenda sin intervención humana.' },
]

const PASOS_LABELS = ['Encontramos', 'Ordenamos', 'Construimos', 'Publicamos', 'Medimos']

const TRANSCRIPCION_DUNAMIS = 'Oye... necesito que me ayudes con algo. Los agentes me están pidiendo hace semanas un dossier, algo que puedan mandarle al cliente apenas preguntan por comisiones, por plazos, todo eso. Ahora se los explican por WhatsApp, cada uno a su manera, y se pierde información, o queda mal explicado. No necesito nada... como muy elaborado. Algo simple, que se entienda rápido, que se vea profesional. Que un agente lo mande y el cliente quede tranquilo, no con más dudas. ¿Podemos armar algo así? Como para tenerlo listo esta semana si se puede.'

export default function FrecuenciaPage() {
  return (
    <>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <PageLayout
        tagline="FrecuenciA — construido con IA, publicado en semanas"
        headline={<FontMix bold="Herramientas públicas" italic=" que venden por ti." />}
        description="Convertimos el conocimiento de tu empresa en dossiers, simuladores, blogs y agentes conectados a tus datos."
        heroBg="#000000"
        heroText="#ffffff"
        ctaHref="#contacto"
        ctaLabel="Agenda una demo →"
        illustrationNode={<DotPattern pattern="ondas" color="#ffffff" />}
        contact={{
          headline: <FontMix bold="Agenda tu demo" italic=" de FrecuenciA." />,
          submitLabel: 'Agenda una demo →',
        }}
      >
        {/* Qué resuelve */}
        <BodySection dark title="Qué resuelve">
          <CatalogoCards items={queResuelve} cols={3} label="Dolor" />
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

            <p className="text-center text-sm opacity-50">De esta conversación salió el sistema completo.</p>

            <NavegableCards items={productosDunamis} cols={3} />

            <p className="text-center text-sm opacity-45">El equipo de ventas de Dunamis lo usa a diario para cerrar clientes.</p>

            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-base opacity-70">¿Quieres esto para tu empresa?</p>
              <Link href="#contacto"
                className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                style={{ backgroundColor: NEGRO, color: '#ffffff', borderRadius: '2px' }}>
                Agenda una demo →
              </Link>
            </div>
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

        {/* Cómo funciona — comprimido, el detalle completo vive en Metodología */}
        <BodySection title="Cómo funciona">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
              {PASOS_LABELS.map((p, i) => (
                <span key={p} className="flex items-center gap-3">
                  <span className="label" style={{ opacity: 0.7 }}>{p}</span>
                  {i < PASOS_LABELS.length - 1 && <span style={{ opacity: 0.3 }}>·</span>}
                </span>
              ))}
            </div>
            <Link href="/metodologia"
              className="label inline-flex items-center gap-2 mx-auto hover:opacity-60 transition-opacity"
              style={{ opacity: 0.6 }}>
              Así trabajamos →
            </Link>
          </div>
        </BodySection>
      </PageLayout>
    </>
  )
}
