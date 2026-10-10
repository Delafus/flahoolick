import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { FontMix } from '@/components/page-layout'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Caso Dunamis | Flahoolick',
  description: 'Cómo sistematizamos el conocimiento de Dunamis y lo convertimos en identidad, sitios, contenido, herramientas digitales y un asistente virtual.',
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

/** Pendientes del caso: se muestran cuando lleguen los datos y la cita. */
const MOSTRAR_CIFRAS = false
const MOSTRAR_CITA = false

const CIFRAS: { valor: string; desc: string }[] = [
  { valor: '00', desc: 'Artículos publicados en Dunamistas' },
  { valor: '00', desc: 'Simulaciones completadas en Valor y La Decisión' },
  { valor: '00', desc: 'Visitas agendadas por Dee' },
]
const PERIODO_CIFRAS = 'Período por definir'
const CITA = { texto: 'Cita pendiente.', nombre: 'Nombre', cargo: 'Cargo, Dunamis' }

const RESUMEN = [
  { lead: 'La necesidad.', texto: 'Dunamis, operador inmobiliario con dos verticales, tenía su conocimiento repartido entre reuniones, catálogos y la experiencia de sus agentes. El equipo comercial lo explicaba desde cero en cada llamada.' },
  { lead: 'Lo que hicimos.', texto: 'Sistematizamos ese conocimiento y lo convertimos en una identidad, dos sitios, una plataforma editorial, tres herramientas digitales y un asistente virtual.' },
  { lead: 'Lo que cambió.', texto: 'Hoy el inversionista saca sus cuentas, resuelve sus dudas y agenda su visita antes de hablar con un agente.' },
]

export default function CasoDunamis() {
  return (
    <>
      <PageColorSetter bg={GRIS} text={NEGRO} />

      {/* Portada */}
      <section className="page-px pt-32 md:pt-[200px] pb-16 md:pb-24" style={{ backgroundColor: GRIS, color: NEGRO }}>
        <div className="max-container flex flex-col gap-10">
          <p className="label opacity-50">Caso · Dunamis</p>
          <h1 style={{ fontSize: 'clamp(2.75rem, 6vw, 6.5rem)', lineHeight: 0.95, maxWidth: '62rem' }}>
            <FontMix bold="Lo que Dunamis sabía vivía en su equipo." italic=" Hoy está frente al mercado." />
          </h1>
          <ul className="flex flex-wrap gap-2">
            {SERVICIOS.map(s => (
              <li key={s} className="label px-4 py-2" style={{ border: '1px solid rgba(0,0,0,0.25)', borderRadius: '999px' }}>{s}</li>
            ))}
          </ul>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
            {RESUMEN.map(r => (
              <p key={r.lead} className="text-lead" style={{ opacity: 0.8 }}>
                <strong style={{ fontWeight: 800 }}>{r.lead}</strong> {r.texto}
              </p>
            ))}
          </div>
          <Imagen ratio="16 / 9" tamano="2400 × 1350" nombre="Portada" />
        </div>
      </section>

      {/* Relato */}
      <section className="page-px section-py" style={{ backgroundColor: GRIS, color: NEGRO, borderTop: '1px solid rgba(0,0,0,0.15)' }}>
        <div className="max-container flex flex-col gap-24 md:gap-32">

          <Texto titulo={<FontMix bold="Dunamis explicaba lo mismo desde cero en cada llamada." />}>
            <p>
              Dunamis opera con dos verticales: Dunamis Agency, corredora de propiedades de alto valor en Chicureo, y Dunamis Brokers, que gestiona compraventa, arriendo y administración de activos de distinto tipo y escala.
            </p>
            <p>
              Lo que diferencia a la empresa es lo que su equipo sabe del mercado. Ese conocimiento vivía en reuniones, catálogos, conversaciones con clientes y en la experiencia de cada agente. Cada llamada partía de cero.
            </p>
          </Texto>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Empezamos por escuchar lo que Dunamis ya sabía." />}>
              <p>
                Transcribimos reuniones con la dirección y el equipo comercial, analizamos los catálogos de propiedades y servicios, revisamos conversaciones con clientes y documentamos la experiencia de los agentes en terreno.
              </p>
              <p>
                De ese material salieron los puntos de entrada a la categoría (CEPs): las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esos CEPs ordenaron todo el plan de contenido.
              </p>
            </Texto>
            <Imagen ratio="16 / 9" tamano="2400 × 1350" nombre="Del material a los CEPs" />
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Una sola identidad aprendió a hablarle a dos públicos." />}>
              <p>
                Dunamis Agency conversa con compradores de alto valor en una zona acotada. Dunamis Brokers atiende a un público amplio, con activos de todos los tamaños. Diseñamos un sistema de identidad que sirve a ambas: logotipo, iconografía, paleta y banco de imágenes.
              </p>
            </Texto>
            <Imagen ratio="16 / 9" tamano="2400 × 1350" nombre="Marca" />
            <p className="text-lead" style={{ maxWidth: '46rem', opacity: 0.75 }}>
              Cada vertical recibió su sitio, dunamis.agency y dunamis.broker. Ambos tienen un gestor de contenidos que deja al equipo publicando propiedades y artículos por su cuenta.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="dunamis.agency" />
              <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="dunamis.broker" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="Dunamistas empezó a explicar lo que el mercado calla." />}>
              <p>
                Dunamistas es la plataforma editorial de Dunamis Brokers: artículos, contenido breve para Instagram y un glosario inmobiliario que suma un concepto nuevo cada semana.
              </p>
            </Texto>
            <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="Blog y glosario" />
            <div className="grid grid-cols-2 gap-6">
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="Instagram" />
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="Instagram" />
            </div>
            <p className="text-lead" style={{ maxWidth: '46rem', opacity: 0.75 }}>
              La fundadora lleva esas mismas ideas a LinkedIn y a charlas del sector, con su propia voz.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="LinkedIn" />
              <Imagen ratio="3 / 4" tamano="1200 × 1600" nombre="Charla o evento" />
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Texto titulo={<FontMix bold="El inversionista saca sus cuentas antes de hablar con un agente." />}>
              <p>
                Un punto de entrada frecuente: el propietario que fija su precio según su historia con el activo. El artículo &ldquo;Cada precio es autobiográfico&rdquo; desarrolla esa tensión y cierra con Valor, un simulador que estima el valor de mercado de una propiedad con la UF del día, el cap rate de la zona y la vacancia del trimestre.
              </p>
            </Texto>
            <LinkExterno href="https://www.dunamis.broker/blog/cada-precio-es-autobiografico">Leer el artículo →</LinkExterno>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="Artículo + Valor" />
              <div className="flex items-center justify-center" style={{ aspectRatio: '3 / 2', backgroundColor: '#EFE9DD' }}>
                <img src="/valor-calculadora.svg" alt="Simulador Valor de Dunamis Broker" style={{ width: '70%', height: 'auto' }} />
              </div>
            </div>
            <LinkExterno href="https://valor.dunamis.broker/">Probar Valor →</LinkExterno>
            <p className="text-lead" style={{ maxWidth: '46rem', opacity: 0.75 }}>
              La Decisión acompaña a quien evalúa comprar o arrendar con un diagnóstico de tres minutos. Ambas herramientas cierran con una invitación a conversar con el equipo de Dunamis.
            </p>
            <Imagen ratio="3 / 2" tamano="2400 × 1600" nombre="La Decisión" />
            <LinkExterno href="https://decision.dunamis.broker/">Probar La Decisión →</LinkExterno>
          </div>

        </div>
      </section>

      {/* Dossier y Dee */}
      <section className="page-px section-py" style={{ backgroundColor: NEGRO, color: BLANCO }}>
        <div className="max-container flex flex-col gap-24 md:gap-32">

          <div className="flex flex-col gap-10">
            <Texto oscuro titulo={<FontMix bold="El equipo comercial pidió un PDF en Canva." italic=" Recibió un dossier que se comparte con un enlace." />}>
              <p>
                Los agentes necesitaban material simple para enviar por WhatsApp o mostrar en iPad durante reuniones y visitas: servicios, honorarios, condiciones y un resumen del stock.
              </p>
              <p>
                Un PDF queda viejo cada vez que cambian el stock o los honorarios. Propusimos un dossier web: se comparte con un enlace, funciona en celular y tablet, y se actualiza una sola vez para todo el equipo.
              </p>
            </Texto>
            <Imagen oscuro ratio="16 / 9" tamano="2400 × 1350" nombre="Dossier de servicios" />
            <LinkExterno oscuro href="https://servicios.dunamis.broker/">Ver el dossier →</LinkExterno>
          </div>

          <div className="flex flex-col gap-10">
            <Texto oscuro titulo={<FontMix bold="Dee atiende, muestra propiedades y agenda la visita." />}>
              <p>
                Dee es el asistente virtual de dunamis.agency. Está conectado a la base de propiedades y servicios, responde consultas, presenta las propiedades publicadas que calzan con cada persona, agenda la visita y deriva el contacto a un agente.
              </p>
            </Texto>
            <Imagen oscuro ratio="3 / 2" tamano="2400 × 1600" nombre="Conversación con Dee" />
            <LinkExterno oscuro href="https://dunamis.agency">Habla con Dee →</LinkExterno>
          </div>

        </div>
      </section>

      {/* Resultado */}
      <section className="page-px section-py" style={{ backgroundColor: GRIS, color: NEGRO }}>
        <div className="max-container flex flex-col gap-16">
          <Texto titulo={<FontMix bold="Hoy Dunamis llega a la primera reunión con la conversación empezada." />}>
            <p>
              El conocimiento que antes dependía de quién contestaba la llamada ahora trabaja todos los días: en dos sitios, una plataforma editorial, dos simuladores, un dossier y un asistente.
            </p>
            <p>
              Los agentes abren el dossier con sus prospectos en reuniones y visitas. Quien usa Valor o La Decisión llega a conversar con sus números hechos.
            </p>
          </Texto>

          {MOSTRAR_CIFRAS && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,0,0,0.15)' }}>
                {CIFRAS.map(c => (
                  <div key={c.desc} className="flex flex-col gap-3 p-8" style={{ backgroundColor: GRIS }}>
                    <p style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.03em' }}>{c.valor}</p>
                    <p className="text-[15px] leading-relaxed opacity-65">{c.desc}</p>
                  </div>
                ))}
              </div>
              <p className="label opacity-40">{PERIODO_CIFRAS}</p>
            </div>
          )}

          {MOSTRAR_CITA && (
            <figure className="flex flex-col gap-6" style={{ maxWidth: '50rem' }}>
              <blockquote style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2 }}>
                &ldquo;{CITA.texto}&rdquo;
              </blockquote>
              <figcaption className="label opacity-60">{CITA.nombre} · {CITA.cargo}</figcaption>
            </figure>
          )}
        </div>
      </section>

      <ContactForm bg="#403D37" text="#ffffff" submitLabel="Agenda una llamada de 30 minutos →" />
    </>
  )
}
