import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { FontMix } from '@/components/page-layout'
import { ContactForm } from '@/components/contact-form'
import { AudioBriefPlayer } from '@/components/audio-brief-player'

export const metadata: Metadata = {
  title: 'Caso Dunamis | Flahoolick',
  description: 'Marca, sitios, contenido, liderazgo de opinión y productos digitales para Dunamis, operador inmobiliario con dos verticales de negocio.',
}

const GRIS = '#D8D8D7'
const NEGRO = '#000000'
const BLANCO = '#ffffff'

const SERVICIOS = ['Marca y relato', 'Estrategia de contenido', 'Producción de contenido', 'IA para marketing y ventas']

/** Espacio reservado para una imagen del caso. Muestra el tamaño que hay que exportar. */
function Imagen({ ratio, tamano, nombre, oscuro = false }: { ratio: string; tamano: string; nombre: string; oscuro?: boolean }) {
  const color = oscuro ? BLANCO : NEGRO
  return (
    <div
      style={{
        aspectRatio: ratio,
        width: '100%',
        border: `1px solid ${oscuro ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        color,
      }}
    >
      <span className="label" style={{ opacity: 0.35 }}>{nombre}</span>
      <span className="label" style={{ opacity: 0.2 }}>{tamano}</span>
    </div>
  )
}

/** Bloque de texto de una sección: subtítulo que afirma algo + cuerpo. */
function Texto({ titulo, children, oscuro = false }: { titulo: React.ReactNode; children: React.ReactNode; oscuro?: boolean }) {
  return (
    <div className="flex flex-col gap-6" style={{ maxWidth: '46rem' }}>
      <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', lineHeight: 1.05, color: oscuro ? BLANCO : NEGRO }}>
        {titulo}
      </h2>
      <div className="text-lead flex flex-col gap-4" style={{ opacity: 0.75 }}>
        {children}
      </div>
    </div>
  )
}

function LinkExterno({ href, children, oscuro = false }: { href: string; children: React.ReactNode; oscuro?: boolean }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-70 transition-opacity"
      style={{ border: `1px solid ${oscuro ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'}`, color: oscuro ? BLANCO : NEGRO, borderRadius: '999px' }}
    >
      {children}
    </Link>
  )
}

export default function CasoDunamis() {
  return (
    <>
      <PageColorSetter bg={GRIS} text={NEGRO} />

      {/* Portada */}
      <section className="page-px pt-32 md:pt-[200px] pb-16 md:pb-24" style={{ backgroundColor: GRIS, color: NEGRO }}>
        <div className="max-container flex flex-col gap-10">
          <p className="label opacity-50">Caso · Dunamis</p>
          <h1 style={{ fontSize: 'clamp(2.75rem, 6vw, 6.5rem)', lineHeight: 0.95, maxWidth: '62rem' }}>
            <FontMix bold="Dos negocios inmobiliarios." italic=" Un solo sistema de marca y contenido." />
          </h1>
          <ul className="flex flex-wrap gap-2">
            {SERVICIOS.map(s => (
              <li key={s} className="label px-4 py-2" style={{ border: '1px solid rgba(0,0,0,0.25)', borderRadius: '999px' }}>{s}</li>
            ))}
          </ul>
          <Imagen ratio="16 / 9" tamano="2400 × 1350" nombre="Portada" />
        </div>
      </section>

      {/* Resumen */}
      <section className="page-px pb-16 md:pb-24" style={{ backgroundColor: GRIS, color: NEGRO }}>
        <div className="max-container">
          <div className="text-lead flex flex-col gap-4" style={{ maxWidth: '46rem' }}>
            <p>
              Dunamis es una empresa de servicios inmobiliarios con dos verticales: Dunamis Agency, corredora especializada en propiedades de alto valor en Chicureo, y Dunamis Brokers, que opera compraventa, arriendo y administración de activos de distinto tipo y escala.
            </p>
            <p>
              El conocimiento que diferencia a Dunamis estaba distribuido en reuniones, catálogos, conversaciones con clientes y en la experiencia de su equipo comercial. El trabajo comenzó por sistematizar ese conocimiento, para luego traducirlo en marca, sitios, contenido y herramientas.
            </p>
          </div>
        </div>
      </section>

      {/* Piezas */}
      <section className="page-px section-py" style={{ backgroundColor: GRIS, color: NEGRO, borderTop: '1px solid rgba(0,0,0,0.15)' }}>
        <div className="max-container flex flex-col gap-24 md:gap-32">

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Primero," italic=" sistematizar el conocimiento." />}>
              <p>
                Transcribimos reuniones con la dirección y el equipo comercial, analizamos los catálogos de propiedades y servicios, revisamos conversaciones con clientes y documentamos la experiencia de los agentes en terreno.
              </p>
              <p>
                A partir de ese material identificamos los puntos de entrada a la categoría (CEPs): las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esos CEPs orientan la planificación de contenido.
              </p>
            </Texto>
            <Imagen ratio="16 / 9" tamano="2400 × 1350" nombre="Del material a los CEPs" />
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Dos públicos," italic=" una identidad." />}>
              <p>
                Dunamis Agency se dirige a compradores de alto valor en una zona acotada; Dunamis Brokers, a un público amplio con activos de todos los tamaños. La identidad debía servir a ambas verticales con coherencia: logotipo, iconografía, paleta, moodboard y banco de imágenes.
              </p>
            </Texto>
            <Imagen ratio="16 / 9" tamano="2400 × 1350" nombre="Marca" />
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Dos sitios," italic=" cada uno con su audiencia." />}>
              <p>
                Desarrollamos dunamis.agency y dunamis.broker, ambos con gestor de contenidos para que el equipo publique propiedades y artículos de forma autónoma.
              </p>
            </Texto>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="dunamis.agency" />
              <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="dunamis.broker" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Dunamistas:" italic=" lo que el mercado no te va a explicar." />}>
              <p>
                Dunamistas es la plataforma editorial de Dunamis Brokers: artículos, contenido breve para Instagram y un glosario inmobiliario que incorpora un concepto nuevo cada semana.
              </p>
            </Texto>
            <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="Blog y glosario" />
            <div className="grid grid-cols-2 gap-6">
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="Instagram" />
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="Instagram" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Liderazgo de opinión" italic=" para la dirección de Dunamis." />}>
              <p>
                Contenido de posicionamiento para la fundadora en LinkedIn y participación en charlas y eventos del sector.
              </p>
            </Texto>
            <div className="grid grid-cols-2 gap-6">
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="LinkedIn" />
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="Charla o evento" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Herramientas que el inversionista usa" italic=" antes de contactar a un agente." />}>
              <p>
                Valor estima el valor de mercado de una propiedad a partir de la UF del día, el cap rate de la zona y la vacancia del trimestre. La Decisión es un diagnóstico de tres minutos para quien evalúa comprar o arrendar. Ambas herramientas cierran con una invitación a conversar con el equipo de Dunamis.
              </p>
            </Texto>

            {/* Ejemplo del recorrido completo: CEP → artículo → herramienta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.15)', borderBottom: '1px solid rgba(0,0,0,0.15)' }}>
              <div className="flex flex-col gap-5">
                <h3 style={{ fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)', lineHeight: 1.1 }}>
                  <FontMix bold="Del CEP" italic=" a la herramienta." />
                </h3>
                <p className="text-lead" style={{ opacity: 0.75 }}>
                  &ldquo;Cada precio es autobiográfico&rdquo; parte de una situación frecuente: el propietario que fija su precio por su historia con el activo y no por el mercado. El artículo desarrolla esa tensión y cierra con Valor, que contrasta ese número con la UF del día, el cap rate de la zona y la vacancia del trimestre.
                </p>
                <LinkExterno href="https://www.dunamis.broker/blog/cada-precio-es-autobiografico">Leer el artículo →</LinkExterno>
              </div>
              <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="Artículo + Valor" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center" style={{ aspectRatio: '3 / 2', backgroundColor: '#EFE9DD' }}>
                  <img src="/valor-calculadora.svg" alt="Simulador Valor de Dunamis Broker" style={{ width: '70%', height: 'auto' }} />
                </div>
                <LinkExterno href="https://valor.dunamis.broker/">Probar Valor →</LinkExterno>
              </div>
              <div className="flex flex-col gap-4">
                <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="La Decisión" />
                <LinkExterno href="https://decision.dunamis.broker/">Probar La Decisión →</LinkExterno>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* El pedido y el dossier */}
      <section className="page-px section-py" style={{ backgroundColor: NEGRO, color: BLANCO }}>
        <div className="max-container flex flex-col gap-24 md:gap-32">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Texto oscuro titulo={<FontMix bold="El requerimiento:" italic=" un PDF en Canva." />}>
              <p>
                El equipo comercial necesitaba material simple para enviar por WhatsApp o presentar en iPad durante reuniones y visitas: servicios, compraventa, valores y un resumen del stock. El objetivo era dejar de explicar todo desde cero en cada llamada.
              </p>
            </Texto>
            <div className="w-full mx-auto" style={{ maxWidth: '360px' }}>
              <AudioBriefPlayer src="/audio/dunamis-brief.mp3" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Texto oscuro titulo={<FontMix bold="La respuesta:" italic=" un dossier web." />}>
              <p>
                Servicios, honorarios y condiciones de cada uno, presentados con claridad. Se comparte con un enlace, funciona en celular y tablet, y se actualiza sin rehacer documentos.
              </p>
            </Texto>
            <Imagen oscuro ratio="16 / 9" tamano="2400 × 1350" nombre="Dossier de servicios" />
            <LinkExterno oscuro href="https://servicios.dunamis.broker/">Ver el dossier →</LinkExterno>
          </div>

          <div className="flex flex-col gap-10">
            <Texto oscuro titulo={<FontMix bold="Dee," italic=" asistente virtual de dunamis.agency." />}>
              <p>
                Dee está conectado a la base de propiedades y servicios de Dunamis. Responde consultas, presenta las propiedades publicadas según los criterios de cada usuario, agenda visitas y deriva el contacto a un agente.
              </p>
            </Texto>
            <Imagen oscuro ratio="3 / 2" tamano="2400 × 1600" nombre="Conversación con Dee" />
            <LinkExterno oscuro href="https://dunamis.agency">Habla con Dee →</LinkExterno>
          </div>

        </div>
      </section>

      <ContactForm bg="#403D37" text="#ffffff" />
    </>
  )
}
