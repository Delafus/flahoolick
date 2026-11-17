import { Metadata } from 'next'
import Link from 'next/link'
import { Lienzo, Columna, Hero, Bloque, Cierre, ENLACE } from '@/components/minimal'
import { ResultadosClave, type Resultado } from '@/components/resultados-clave'

export const metadata: Metadata = {
  title: 'Dunamis | Historias de clientes | Flahoolick',
  description: 'Cómo sistematizamos el conocimiento de Dunamis y lo convertimos en identidad, sitios, contenido, herramientas digitales y un asistente virtual.',
}

const SERVICIOS = ['Marca y relato', 'Estrategia de contenido', 'Producción de contenido', 'IA para marketing y ventas']

const RESUMEN = [
  { lead: 'La necesidad.', texto: 'Dunamis, operador inmobiliario con dos verticales, tenía su conocimiento repartido entre reuniones, catálogos y la experiencia de sus agentes. El equipo comercial lo explicaba desde cero en cada llamada.' },
  { lead: 'Lo que hicimos.', texto: 'Sistematizamos ese conocimiento y lo convertimos en una identidad, dos sitios, una plataforma editorial, tres herramientas digitales y un asistente virtual.' },
  { lead: 'Lo que cambió.', texto: 'Hoy el inversionista saca sus cuentas, resuelve sus dudas y agenda su visita antes de hablar con un agente.' },
]

/** Hechos verificables del caso. Cuando lleguen las cifras medidas, se reemplazan aquí. */
const RESULTADOS: Resultado[] = [
  { valor: 'Antes', titulo: 'De hablar con un agente', texto: 'El inversionista saca sus cuentas, resuelve sus dudas y agenda su visita.' },
  { valor: '2', titulo: 'Sitios autónomos', texto: 'dunamis.agency y dunamis.broker, con un gestor para que el equipo publique propiedades y artículos por su cuenta.' },
  { valor: '3 min', titulo: 'Para orientar una decisión', texto: 'La Decisión acompaña a quien evalúa comprar o arrendar y cierra con una invitación a conversar con el equipo.' },
  { valor: '1 enlace', titulo: 'Para todo el equipo', texto: 'El dossier funciona en celular y tablet, y se actualiza una sola vez para todos los agentes.' },
]

/** Se muestra cuando llegue la cita con nombre y cargo. */
const CITA = { texto: '', nombre: '', cargo: '' }

function Imagenes({ columnas = 1, items }: { columnas?: 1 | 2; items: { src: string; alt: string; ratio: string }[] }) {
  return (
    <div className={`mx-auto grid gap-6 ${columnas === 2 ? 'grid-cols-2' : 'grid-cols-1'}`} style={{ maxWidth: '64rem' }}>
      {items.map(i => (
        <img key={i.src} src={i.src} alt={i.alt} style={{ aspectRatio: i.ratio, width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
      ))}
    </div>
  )
}

function Externo({ href, children }: { href: string; children: React.ReactNode }) {
  return <p><Link href={href} target="_blank" rel="noopener noreferrer" className={ENLACE}>{children}</Link></p>
}

export default function CasoDunamis() {
  return (
    <Lienzo>
      <Columna>
        <Hero
          eyebrow="Historias de clientes / Dunamis"
          titulo="Lo que Dunamis sabía vivía en su equipo. Hoy está frente al mercado."
          bajada={SERVICIOS.join(' · ')}
          cta={null}
        />
        <section className="flex flex-col gap-6 pb-16">
          {RESUMEN.map(r => (
            <p key={r.lead}><span style={{ fontWeight: 500 }}>{r.lead}</span> {r.texto}</p>
          ))}
        </section>
      </Columna>

      <div className="mx-auto pb-16 md:pb-24" style={{ maxWidth: '64rem' }}>
        <video
          src="/casos/dunamis/portada.mp4"
          poster="/casos/dunamis/portada.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Historia de Dunamis"
          style={{ aspectRatio: '16 / 9', width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <ResultadosClave items={RESULTADOS} />

      <Columna>
        <Bloque titulo="Dunamis explicaba lo mismo desde cero en cada llamada.">
          <p>Dunamis opera con dos verticales: Dunamis Agency, corredora de propiedades de alto valor en Chicureo, y Dunamis Brokers, que gestiona compraventa, arriendo y administración de activos de distinto tipo y escala.</p>
          <p>Lo que diferencia a la empresa es lo que su equipo sabe del mercado. Ese conocimiento vivía en reuniones, catálogos, conversaciones con clientes y en la experiencia de cada agente. Cada llamada partía de cero.</p>
        </Bloque>
        <Bloque titulo="Empezamos por escuchar lo que Dunamis ya sabía.">
          <p>Transcribimos reuniones con la dirección y el equipo comercial, analizamos los catálogos de propiedades y servicios, revisamos conversaciones con clientes y documentamos la experiencia de los agentes en terreno.</p>
          <p>De ese material salieron las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esas preguntas ordenaron todo el plan de contenido.</p>
        </Bloque>
        <Bloque titulo="Una nueva identidad para dos públicos.">
          <p>De una marca inmobiliaria a dos verticales con públicos distintos. Conservamos el nombre y el vínculo con el mundo inmobiliario, y construimos una identidad capaz de dar personalidad propia a Agency y Broker.</p>
        </Bloque>
      </Columna>
      <Imagenes items={[{ src: '/casos/dunamis/transicion.webp', alt: 'Transición de la marca Dunamis a sus dos verticales, Agency y Broker', ratio: '16 / 9' }]} />

      <Columna>
        <Bloque titulo="Dunamistas empezó a explicar lo que el mercado calla.">
          <p>Dunamistas es la plataforma editorial de Dunamis Brokers: artículos, contenido breve para Instagram y un glosario inmobiliario que suma un concepto nuevo cada semana. La fundadora lleva esas mismas ideas a LinkedIn y a charlas del sector, con su propia voz.</p>
        </Bloque>
      </Columna>
      <div className="flex flex-col gap-6">
        <Imagenes items={[{ src: '/casos/dunamis/blog.webp', alt: 'Dunamistas, plataforma editorial de Dunamis Brokers', ratio: '3 / 2' }]} />
        <Imagenes columnas={2} items={[
          { src: '/casos/dunamis/instagram-1.webp', alt: 'Contenido de Dunamistas para Instagram', ratio: '3 / 4' },
          { src: '/casos/dunamis/instagram-2.webp', alt: 'Contenido de Dunamistas para Instagram, segunda pieza', ratio: '3 / 4' },
        ]} />
      </div>

      <Columna>
        <Bloque titulo="El inversionista saca sus cuentas antes de hablar con un agente.">
          <p>Un punto de entrada frecuente: el propietario que fija su precio según su historia con el activo. El artículo &ldquo;Cada precio es autobiográfico&rdquo; desarrolla esa tensión y cierra con Valor, un simulador que estima el valor de mercado de una propiedad con la UF del día, el cap rate de la zona y la vacancia del trimestre.</p>
          <Externo href="https://www.dunamis.broker/blog/cada-precio-es-autobiografico">Leer el artículo →</Externo>
          <Externo href="https://valor.dunamis.broker/">Probar Valor →</Externo>
        </Bloque>
      </Columna>
      <Imagenes columnas={2} items={[
        { src: '/casos/dunamis/articulo-valor.webp', alt: 'Artículo Cada precio es autobiográfico junto al simulador Valor', ratio: '3 / 2' },
        { src: '/casos/dunamis/valor.webp', alt: 'Simulador Valor de Dunamis Broker', ratio: '3 / 2' },
      ]} />

      <Columna>
        <Bloque titulo="La Decisión ayuda a elegir entre comprar o arrendar.">
          <p>Acompaña a quien evalúa comprar o arrendar con un diagnóstico de tres minutos. Igual que Valor, cierra con una invitación a conversar con el equipo de Dunamis.</p>
          <Externo href="https://decision.dunamis.broker/">Probar La Decisión →</Externo>
        </Bloque>
      </Columna>
      <Imagenes items={[{ src: '/casos/dunamis/decision.webp', alt: 'Diagnóstico La Decisión de Dunamis Broker', ratio: '3 / 2' }]} />

      <Columna>
        <Bloque titulo="El equipo comercial pidió un PDF en Canva. Recibió un dossier que se comparte con un enlace.">
          <p>Los agentes necesitaban material simple para enviar por WhatsApp o mostrar en iPad durante reuniones y visitas: servicios, honorarios, condiciones y un resumen del stock.</p>
          <p>Un PDF queda viejo cada vez que cambian el stock o los honorarios. Propusimos un dossier web: se comparte con un enlace, funciona en celular y tablet, y se actualiza una sola vez para todo el equipo.</p>
          <Externo href="https://servicios.dunamis.broker/">Ver el dossier →</Externo>
        </Bloque>
        <Bloque titulo="Dee atiende, muestra propiedades y agenda la visita.">
          <p>Dee es el asistente virtual de dunamis.agency. Está conectado a la base de propiedades y servicios, responde consultas, presenta las propiedades publicadas que calzan con cada persona, agenda la visita y deriva el contacto a un agente.</p>
          <Externo href="https://dunamis.agency">Habla con Dee →</Externo>
        </Bloque>
        <Bloque titulo="Hoy Dunamis llega a la primera reunión con la conversación empezada.">
          <p>El conocimiento que antes dependía de quién contestaba la llamada ahora trabaja todos los días: en dos sitios, una plataforma editorial, dos simuladores, un dossier y un asistente.</p>
          <p>Los agentes abren el dossier con sus prospectos en reuniones y visitas. Quien usa Valor o La Decisión llega a conversar con sus números hechos.</p>
          {CITA.texto && (
            <figure className="flex flex-col gap-2">
              <blockquote>&ldquo;{CITA.texto}&rdquo;</blockquote>
              <figcaption className="text-base" style={{ opacity: 0.5 }}>{CITA.nombre} · {CITA.cargo}</figcaption>
            </figure>
          )}
        </Bloque>
        <Cierre titulo="Tu empresa ya tiene el conocimiento." texto="Construyamos el sistema que lo pone frente al mercado." cta="Agenda una llamada" />
      </Columna>
    </Lienzo>
  )
}
