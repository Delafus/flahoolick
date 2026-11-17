import { Metadata } from 'next'
import {
  PaginaCaso, EncabezadoCaso, PortadaCaso, ResumenCaso, CuerpoCaso, SeccionCaso, ImagenesCaso, EnlaceCaso,
  CitaCaso, ResultadosCaso, CierreCaso, type Dato, type CampoFicha, type Cita,
} from '@/components/caso'

/** BORRADOR con datos de ejemplo para revisar el formato en línea. No enlazado ni indexado.
    Cuando lleguen los datos reales, este contenido pasa a /clientes/dunamis y esta carpeta se borra. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Borrador · Dunamis | Historias de clientes | Flahoolick',
  description: 'Cómo sistematizamos el conocimiento de Dunamis y lo convertimos en identidad, sitios, contenido, herramientas digitales y un asistente virtual.',
}

const LOGO = { src: '/logo-dunamis.svg', alt: 'Dunamis' }

/** EJEMPLO, NO PUBLICAR EN LA PÁGINA REAL: cifras inventadas para ver el formato. Reemplazar por resultados medidos de Dunamis. */
const DATOS_PORTADA: Dato[] = [
  { valor: '3x', etiqueta: 'más visitas agendadas al mes' },
  { valor: '40%', etiqueta: 'menos tiempo por primera llamada' },
  { valor: '1.200', etiqueta: 'simulaciones de Valor en 90 días' },
]

const FICHA: CampoFicha[] = [
  { nombre: 'Industria', valores: ['Corretaje y gestión inmobiliaria'] },
  { nombre: 'Desafío', valores: ['El conocimiento del equipo vivía en reuniones, catálogos y la experiencia de cada agente. Cada llamada partía de cero.'] },
  { nombre: 'Servicios', valores: ['Marca y relato', 'Estrategia de contenido', 'Producción de contenido', 'IA para marketing y ventas'] },
  { nombre: 'Entregables', valores: ['Identidad para dos verticales', 'Dos sitios', 'Plataforma editorial Dunamistas', 'Simulador Valor', 'Diagnóstico La Decisión', 'Dossier comercial', 'Asistente virtual Dee'] },
  { nombre: 'Tecnología', valores: [
    { texto: 'Vercel', icono: '/iconos-tecnologia/vercel.svg' },
    { texto: 'Next.js', icono: '/iconos-tecnologia/nextdotjs.svg' },
    { texto: 'Supabase', icono: '/iconos-tecnologia/supabase.svg' },
    { texto: 'WhatsApp', icono: '/iconos-tecnologia/whatsapp.svg' },
    { texto: 'Claude Code', icono: '/iconos-tecnologia/claude.svg' },
    { texto: 'Figma', icono: '/iconos-tecnologia/figma.svg' },
    { texto: 'Midjourney', icono: '/iconos-tecnologia/imagen.svg' },
  ] },
  { nombre: 'Duración', valores: ['6 meses (ejemplo)'] },
  { nombre: 'Sitios', valores: [{ texto: 'dunamis.agency', href: 'https://dunamis.agency' }, { texto: 'dunamis.broker', href: 'https://www.dunamis.broker' }] },
]

/** EJEMPLO: tres citas inventadas para ver el formato. Reemplazar por citas reales con nombre, cargo y retrato. */
/** Cita real de la fundadora. */
const CITA_FUNDADORA: Cita = {
  texto: 'Estuvimos con una agencia de marketing que nunca logró articular nuestra propuesta de valor. Flahoolick la encontró en lo que nosotros mismos decíamos todos los días y hoy la vemos trabajando en cada canal.',
  nombre: 'Jessica Hupat',
  cargo: 'Founder, Dunamis',
  retrato: '/casos/dunamis/retrato-jessica-hupat.jpg',
}

const CITAS: [Cita, Cita, Cita] = [
  { texto: 'Ejemplo: cada agente explicaba Dunamis a su manera, y cada llamada partía de cero.', nombre: 'Nombre Apellido', cargo: 'Cargo' },
  { texto: 'Ejemplo: por primera vez lo que sabemos del mercado está escrito, ordenado y trabajando por nosotros.', nombre: 'Nombre Apellido', cargo: 'Cargo' },
  { texto: 'Ejemplo: hoy el cliente llega a la primera reunión con sus números hechos.', nombre: 'Nombre Apellido', cargo: 'Cargo' },
]

/** Hechos verificables del caso. */
const RESULTADOS = [
  { valor: 'Antes', titulo: 'De hablar con un agente', texto: 'el inversionista saca sus cuentas, resuelve sus dudas y agenda su visita.' },
  { valor: '2', titulo: 'Sitios autónomos', texto: 'dunamis.agency y dunamis.broker, con un gestor para que el equipo publique propiedades y artículos por su cuenta.' },
  { valor: '3 min', titulo: 'Para orientar una decisión', texto: 'La Decisión acompaña a quien evalúa comprar o arrendar y cierra con una invitación a conversar con el equipo.' },
  { valor: '1 enlace', titulo: 'Para todo el equipo', texto: 'el dossier funciona en celular y tablet, y se actualiza una sola vez para todos los agentes.' },
]

export default function BorradorDunamis() {
  return (
    <PaginaCaso>
      <EncabezadoCaso cliente="Dunamis" titulo="La conversación empieza antes de la primera reunión." />
      <PortadaCaso
        logo={LOGO}
        imagen={{
          src: '/casos/dunamis/portada-historia.jpg',
          srcMovil: '/casos/dunamis/portada-historia-movil.jpg',
          focoMovil: '64% 50%',
          alt: 'Corredora subiendo un cerro con Santiago de fondo',
        }}
        datos={DATOS_PORTADA}
      />
      <ResumenCaso>
        Dunamis convirtió lo que su equipo sabía del mercado en marca, contenido y herramientas digitales. Hoy sus potenciales clientes calculan, resuelven dudas y agendan la visita antes de hablar con un agente.
      </ResumenCaso>

      <CuerpoCaso ficha={FICHA}>
        <SeccionCaso titulo="El problema: Dunamis explicaba lo mismo desde cero en cada llamada.">
          <p>Dunamis opera con dos verticales: Dunamis Agency, corredora de propiedades de alto valor en Chicureo, y Dunamis Brokers, que gestiona compraventa, arriendo y administración de activos de distinto tipo y escala.</p>
          <p>Lo que diferencia a la empresa es lo que su equipo sabe del mercado. Ese conocimiento vivía en reuniones, catálogos, conversaciones con clientes y en la experiencia de cada agente. Cada llamada partía de cero.</p>
        </SeccionCaso>
        <CitaCaso logo={LOGO} {...CITAS[0]} />

        <SeccionCaso titulo="La solución: empezamos por escuchar lo que Dunamis ya sabía.">
          <p>Transcribimos reuniones con la dirección y el equipo comercial, analizamos los catálogos de propiedades y servicios, revisamos conversaciones con clientes y documentamos la experiencia de los agentes en terreno.</p>
          <p>De ese material salieron las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esas preguntas ordenaron todo el plan de contenido.</p>
        </SeccionCaso>
        <CitaCaso logo={LOGO} {...CITA_FUNDADORA} />

        <SeccionCaso titulo="Una nueva identidad para dos públicos.">
          <p>De una marca inmobiliaria a dos verticales con públicos distintos. Conservamos el nombre y el vínculo con el mundo inmobiliario, y construimos una identidad capaz de dar personalidad propia a Agency y Broker.</p>
          <ImagenesCaso items={[{ src: '/casos/dunamis/transicion.webp', alt: 'Transición de la marca Dunamis a sus dos verticales, Agency y Broker', ratio: '16 / 9' }]} />
        </SeccionCaso>

        <SeccionCaso titulo="Dunamistas empezó a explicar lo que el mercado calla.">
          <p>Dunamistas es la plataforma editorial de Dunamis Brokers: artículos, contenido breve para Instagram y un glosario inmobiliario que suma un concepto nuevo cada semana. La fundadora lleva esas mismas ideas a LinkedIn y a charlas del sector, con su propia voz.</p>
          <ImagenesCaso items={[{ src: '/casos/dunamis/blog.webp', alt: 'Dunamistas, plataforma editorial de Dunamis Brokers', ratio: '3 / 2' }]} />
          <ImagenesCaso items={[
            { src: '/casos/dunamis/instagram-1.webp', alt: 'Contenido de Dunamistas para Instagram', ratio: '3 / 4' },
            { src: '/casos/dunamis/instagram-2.webp', alt: 'Contenido de Dunamistas para Instagram, segunda pieza', ratio: '3 / 4' },
          ]} />
        </SeccionCaso>
        <CitaCaso logo={LOGO} {...CITAS[1]} />

        <SeccionCaso titulo="El inversionista saca sus cuentas antes de hablar con un agente.">
          <p>Un punto de entrada frecuente: el propietario que fija su precio según su historia con el activo. El artículo &ldquo;Cada precio es autobiográfico&rdquo; desarrolla esa tensión y cierra con Valor, un simulador que estima el valor de mercado de una propiedad con la UF del día, el cap rate de la zona y la vacancia del trimestre.</p>
          <EnlaceCaso href="https://www.dunamis.broker/blog/cada-precio-es-autobiografico">Leer el artículo →</EnlaceCaso>
          <EnlaceCaso href="https://valor.dunamis.broker/">Probar Valor →</EnlaceCaso>
          <ImagenesCaso items={[
            { src: '/casos/dunamis/articulo-valor.webp', alt: 'Artículo Cada precio es autobiográfico junto al simulador Valor', ratio: '3 / 2' },
            { src: '/casos/dunamis/valor.webp', alt: 'Simulador Valor de Dunamis Broker', ratio: '3 / 2' },
          ]} />
        </SeccionCaso>

        <SeccionCaso titulo="La Decisión ayuda a elegir entre comprar o arrendar.">
          <p>Acompaña a quien evalúa comprar o arrendar con un diagnóstico de tres minutos. Igual que Valor, cierra con una invitación a conversar con el equipo de Dunamis.</p>
          <EnlaceCaso href="https://decision.dunamis.broker/">Probar La Decisión →</EnlaceCaso>
          <ImagenesCaso items={[{ src: '/casos/dunamis/decision.webp', alt: 'Diagnóstico La Decisión de Dunamis Broker', ratio: '3 / 2' }]} />
        </SeccionCaso>

        <SeccionCaso titulo="El equipo comercial pidió un PDF en Canva. Recibió un dossier que se comparte con un enlace.">
          <p>Los agentes necesitaban material simple para enviar por WhatsApp o mostrar en iPad durante reuniones y visitas: servicios, honorarios, condiciones y un resumen del stock.</p>
          <p>Un PDF queda viejo cada vez que cambian el stock o los honorarios. Propusimos un dossier web: se comparte con un enlace, funciona en celular y tablet, y se actualiza una sola vez para todo el equipo.</p>
          <EnlaceCaso href="https://servicios.dunamis.broker/">Ver el dossier →</EnlaceCaso>
        </SeccionCaso>

        <SeccionCaso titulo="Dee atiende, muestra propiedades y agenda la visita.">
          <p>Dee es el asistente virtual de dunamis.agency. Está conectado a la base de propiedades y servicios, responde consultas, presenta las propiedades publicadas que calzan con cada persona, agenda la visita y deriva el contacto a un agente.</p>
          <EnlaceCaso href="https://dunamis.agency">Habla con Dee →</EnlaceCaso>
        </SeccionCaso>

        <ResultadosCaso titulo="Resultados: hoy Dunamis llega a la primera reunión con la conversación empezada." items={RESULTADOS} />
        <CitaCaso logo={LOGO} {...CITAS[2]} />
      </CuerpoCaso>

      <CierreCaso titulo="Tu empresa ya tiene el conocimiento." />
    </PaginaCaso>
  )
}
