import { Metadata } from 'next'
import Link from 'next/link'
import { Lienzo, Columna, Bloque, Cierre, ENLACE } from '@/components/minimal'
import { CabeceraCaso, EncabezadoCaso, PortadaCaso, FichaCaso, CitaCaso, type Dato, type CampoFicha, type Cita } from '@/components/caso'
import { ResultadosClave, type Resultado } from '@/components/resultados-clave'

/** BORRADOR con datos de ejemplo para revisar el formato en línea. No enlazado ni indexado.
    Cuando lleguen los datos reales, este contenido pasa a /clientes/dunamis y esta carpeta se borra. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Borrador · Dunamis | Historias de clientes | Flahoolick',
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

/** EJEMPLO, NO PUBLICAR: cifras inventadas para ver el formato. Reemplazar por resultados medidos de Dunamis. */
const DATOS_PORTADA: Dato[] = [
  { valor: '3x', etiqueta: 'más visitas agendadas al mes' },
  { valor: '40%', etiqueta: 'menos tiempo por primera llamada' },
  { valor: '1.200', etiqueta: 'simulaciones de Valor en 90 días' },
]

/** Foto de portada. Se muestra en blanco y negro. */
const FOTO_PORTADA = '/casos/dunamis/portada-historia.jpg'

const FICHA: CampoFicha[] = [
  { nombre: 'Industria', valores: ['Corretaje y gestión inmobiliaria'] },
  { nombre: 'Servicios', valores: SERVICIOS },
  { nombre: 'Entregables', valores: ['Identidad para dos verticales', 'Dos sitios', 'Plataforma editorial Dunamistas', 'Simulador Valor', 'Diagnóstico La Decisión', 'Dossier comercial', 'Asistente virtual Dee'] },
  /** PENDIENTE: duración del proyecto. */
  { nombre: 'Duración', valores: ['6 meses (ejemplo)'] },
  { nombre: 'Sitios', valores: [{ texto: 'dunamis.agency', href: 'https://dunamis.agency' }, { texto: 'dunamis.broker', href: 'https://www.dunamis.broker' }] },
]

/** PENDIENTE: las tres citas son textos de ejemplo para ver el formato. Reemplazar por citas reales con nombre, cargo y retrato.
    1: el problema · 2: la solución (destacada en verde) · 3: el resultado. */
const CITAS: [Cita, Cita, Cita] = [
  { texto: 'Ejemplo: cada agente explicaba Dunamis a su manera, y cada llamada partía de cero.', nombre: 'Nombre Apellido', cargo: 'Cargo · Dunamis' },
  { texto: 'Ejemplo: por primera vez lo que sabemos del mercado está escrito, ordenado y trabajando por nosotros.', nombre: 'Nombre Apellido', cargo: 'Cargo · Dunamis' },
  { texto: 'Ejemplo: hoy el cliente llega a la primera reunión con sus números hechos.', nombre: 'Nombre Apellido', cargo: 'Cargo · Dunamis' },
]

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

export default function BorradorDunamis() {
  return (
    <Lienzo>
      <CabeceraCaso>
        <EncabezadoCaso cliente="Dunamis" titulo="La conversación empieza antes de la primera reunión." />
        <PortadaCaso
          logo={{ src: '/logo-dunamis.svg', alt: 'Dunamis' }}
          imagen={FOTO_PORTADA ? { src: FOTO_PORTADA, alt: 'Corredora subiendo un cerro con Santiago de fondo', foco: '64% 50%' } : undefined}
          datos={DATOS_PORTADA}
        />
      </CabeceraCaso>
      <FichaCaso campos={FICHA}>
        {RESUMEN.map(r => (
          <p key={r.lead}><span style={{ fontWeight: 500 }}>{r.lead}</span> {r.texto}</p>
        ))}
      </FichaCaso>

      <div className="mx-auto" style={{ maxWidth: '72rem' }}>
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

      <Columna>
        <Bloque etiqueta="El problema" titulo="Dunamis explicaba lo mismo desde cero en cada llamada.">
          <p>Dunamis opera con dos verticales: Dunamis Agency, corredora de propiedades de alto valor en Chicureo, y Dunamis Brokers, que gestiona compraventa, arriendo y administración de activos de distinto tipo y escala.</p>
          <p>Lo que diferencia a la empresa es lo que su equipo sabe del mercado. Ese conocimiento vivía en reuniones, catálogos, conversaciones con clientes y en la experiencia de cada agente. Cada llamada partía de cero.</p>
          <CitaCaso {...CITAS[0]} />
        </Bloque>
        <Bloque etiqueta="La solución" titulo="Empezamos por escuchar lo que Dunamis ya sabía.">
          <p>Transcribimos reuniones con la dirección y el equipo comercial, analizamos los catálogos de propiedades y servicios, revisamos conversaciones con clientes y documentamos la experiencia de los agentes en terreno.</p>
          <p>De ese material salieron las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esas preguntas ordenaron todo el plan de contenido.</p>
        </Bloque>
        <CitaCaso destacada {...CITAS[1]} />
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
      </Columna>

      <ResultadosClave titulo="Resultados" items={RESULTADOS} />

      <Columna>
        <Bloque etiqueta="Lo que cambió" titulo="Hoy Dunamis llega a la primera reunión con la conversación empezada.">
          <p>El conocimiento que antes dependía de quién contestaba la llamada ahora trabaja todos los días: en dos sitios, una plataforma editorial, dos simuladores, un dossier y un asistente.</p>
          <p>Los agentes abren el dossier con sus prospectos en reuniones y visitas. Quien usa Valor o La Decisión llega a conversar con sus números hechos.</p>
          <CitaCaso {...CITAS[2]} />
        </Bloque>
        <Cierre titulo="Tu empresa ya tiene el conocimiento." texto="Construyamos el sistema que lo pone frente al mercado." cta="Agenda una llamada" />
      </Columna>
    </Lienzo>
  )
}
