import { Metadata } from 'next'
import {
  PaginaCaso, EncabezadoCaso, PortadaCaso, ResumenCaso, CuerpoCaso, SeccionCaso, ImagenesCaso, EnlaceCaso,
  CitaCaso, ResultadosCaso, CierreCaso, type Dato, type CampoFicha, type Cita,
} from '@/components/caso'

export const metadata: Metadata = {
  title: 'Dunamis | Historias de clientes | Flahoolick',
  description: 'Cómo sistematizamos el conocimiento de Dunamis y lo convertimos en identidad, sitios, contenido, herramientas digitales y un asistente virtual.',
}

const LOGO = { src: '/logo-dunamis.svg', alt: 'Dunamis' }

/** Hechos del proyecto. PENDIENTE: reemplazar por resultados medidos cuando Dunamis los entregue. */
const DATOS_PORTADA: Dato[] = [
  { valor: '2', etiqueta: 'sitios que el equipo actualiza por su cuenta' },
  { valor: '3 min', etiqueta: 'para orientar una decisión de compra o arriendo' },
  { valor: '1 enlace', etiqueta: 'mantiene al día el dossier de todo el equipo' },
]

const FICHA: CampoFicha[] = [
  { nombre: 'Industria', valores: ['Corretaje y gestión inmobiliaria'] },
  { nombre: 'Desafío', valores: ['El conocimiento del equipo vivía en reuniones, catálogos y la experiencia de cada agente. Cada llamada partía de cero.'] },
  { nombre: 'Servicios', valores: ['Marca y relato', 'Estrategia de contenido', 'Producción de contenido', 'IA para marketing y ventas'] },
  { nombre: 'Entregables', valores: ['Identidad para dos verticales', 'Dos sitios', 'Plataforma editorial Dunamistas', 'Simulador Valor', 'Diagnóstico La Decisión', 'Dossier comercial', 'Asistente virtual Dee'] },
  { nombre: 'Metodología', valores: ['Value Proposition Canvas (Strategyzer)', 'Testing cards', 'Learning cards'] },
  { nombre: 'Tecnología', valores: [
    { texto: 'Vercel', icono: '/iconos-tecnologia/vercel.svg' },
    { texto: 'Next.js', icono: '/iconos-tecnologia/nextdotjs.svg' },
    { texto: 'Supabase', icono: '/iconos-tecnologia/supabase.svg' },
    { texto: 'WhatsApp', icono: '/iconos-tecnologia/whatsapp.svg' },
    { texto: 'Claude Code', icono: '/iconos-tecnologia/claude.svg' },
    { texto: 'Figma', icono: '/iconos-tecnologia/figma.svg' },
    { texto: 'Midjourney', icono: '/iconos-tecnologia/imagen.svg' },
  ] },
  /** PENDIENTE: duración del proyecto. Sin valores, no se muestra. */
  { nombre: 'Duración', valores: [] },
  { nombre: 'Sitios', valores: [{ texto: 'dunamis.agency', href: 'https://dunamis.agency' }, { texto: 'dunamis.broker', href: 'https://www.dunamis.broker' }] },
]


/** Cita real de la fundadora. */
const CITA_FUNDADORA: Cita = {
  texto: 'Estuvimos con una agencia de marketing que nunca logró articular nuestra propuesta de valor. Flahoolick la encontró en lo que nosotros mismos decíamos todos los días y hoy la vemos trabajando en cada canal.',
  nombre: 'Jessica Hupat',
  cargo: 'Founder, Dunamis',
  retrato: '/casos/dunamis/retrato-jessica-hupat.jpg',
}

/** Cita de una agente, editada a partir de su testimonio. */
const CITA_AGENTE: Cita = {
  texto: 'Uso los interactivos en cada conversación. Cuando llegamos a la reunión, el cliente ya entiende su situación y vamos directo a lo importante.',
  nombre: 'Andre Ibarra',
  cargo: 'Agente, Dunamis Brokers · Valparaíso',
  retrato: '/casos/dunamis/retrato-andre-ibarra.jpg',
}

/** Cita validada por Francisco De La Fuente. PENDIENTE: retrato. */
const CITA_RELACIONES: Cita = {
  texto: 'La visita, la orden en PDF y la oferta de compra ya salen del sitio. Yo me concentro en atender bien a cada cliente, no en perseguir papeles.',
  nombre: 'Francisco De La Fuente',
  cargo: 'Relaciones con clientes, Dunamis Brokers',
}

/** Hechos verificables del caso. */
const RESULTADOS = [
  { valor: 'Antes', titulo: 'De hablar con un agente', texto: 'el inversionista saca sus cuentas, resuelve sus dudas y agenda su visita.' },
  { valor: '2', titulo: 'Sitios autónomos', texto: 'dunamis.agency y dunamis.broker, con un gestor para que el equipo publique propiedades y artículos por su cuenta.' },
  { valor: '3 min', titulo: 'Para orientar una decisión', texto: 'La Decisión acompaña a quien evalúa comprar o arrendar y cierra con una invitación a conversar con el equipo.' },
  { valor: '1 enlace', titulo: 'Para todo el equipo', texto: 'el dossier funciona en celular y tablet, y se actualiza una sola vez para todos los agentes.' },
]

export default function HistoriaDunamis() {
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

        <SeccionCaso titulo="La solución: empezamos por escuchar lo que Dunamis ya sabía.">
          <p>Transcribimos reuniones con la dirección y el equipo comercial, analizamos los catálogos de propiedades y servicios, revisamos conversaciones con clientes y documentamos la experiencia de los agentes en terreno.</p>
          <p>De ese material salieron las situaciones y preguntas que llevan a una persona a considerar comprar, vender, arrendar o invertir. Esas preguntas ordenaron todo el plan de contenido.</p>
          <p>Con el equipo de Dunamis trabajamos el Value Proposition Canvas de Strategyzer completo. Definimos los segmentos a los que hablarle y descartamos otros, formulamos la propuesta de valor y la pusimos a prueba con testing cards y learning cards antes de convertirla en marca y contenido.</p>
        </SeccionCaso>
        <CitaCaso logo={LOGO} {...CITA_FUNDADORA} />

        <SeccionCaso titulo="Una nueva identidad para dos públicos.">
          <p>De una marca inmobiliaria a dos verticales con públicos distintos. Conservamos el nombre y el vínculo con el mundo inmobiliario, y construimos una identidad capaz de dar personalidad propia a Agency y Broker.</p>
          <ImagenesCaso items={[{ src: '/casos/dunamis/transicion.webp', alt: 'Transición de la marca Dunamis a sus dos verticales, Agency y Broker', ratio: '16 / 9' }]} />
        </SeccionCaso>

        <SeccionCaso titulo="Un mismo plan editorial para el blog, Instagram y un glosario semanal.">
          <p>Dunamistas es la plataforma editorial de Dunamis Brokers: artículos, contenido breve para Instagram y un glosario inmobiliario que suma un concepto nuevo cada semana. La fundadora lleva esas mismas ideas a LinkedIn y a charlas del sector, con su propia voz.</p>
          <ImagenesCaso items={[{ src: '/casos/dunamis/blog.webp', alt: 'Dunamistas, plataforma editorial de Dunamis Brokers', ratio: '3 / 2' }]} />
          <ImagenesCaso items={[
            { src: '/casos/dunamis/instagram-1.webp', alt: 'Contenido de Dunamistas para Instagram', ratio: '3 / 4' },
            { src: '/casos/dunamis/instagram-2.webp', alt: 'Contenido de Dunamistas para Instagram, segunda pieza', ratio: '3 / 4' },
          ]} />
        </SeccionCaso>

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
        <CitaCaso logo={LOGO} {...CITA_AGENTE} />

        <SeccionCaso titulo="El equipo comercial pidió un PDF en Canva. Recibió un dossier que se comparte con un enlace.">
          <p>Los agentes necesitaban material simple para enviar por WhatsApp o mostrar en iPad durante reuniones y visitas: servicios, honorarios, condiciones y un resumen del stock.</p>
          <p>Un PDF queda viejo cada vez que cambian el stock o los honorarios. Propusimos un dossier web: se comparte con un enlace, funciona en celular y tablet, y se actualiza una sola vez para todo el equipo.</p>
          <EnlaceCaso href="https://servicios.dunamis.broker/">Ver el dossier →</EnlaceCaso>
        </SeccionCaso>

        <SeccionCaso titulo="Dee atiende, muestra propiedades y agenda la visita.">
          <p>Dee es el asistente virtual de dunamis.agency. Está conectado a la base de propiedades y servicios, responde consultas, presenta las propiedades publicadas que calzan con cada persona, agenda la visita y deriva el contacto a un agente.</p>
          <EnlaceCaso href="https://dunamis.agency">Habla con Dee →</EnlaceCaso>
        </SeccionCaso>

        <SeccionCaso titulo="Del interés a la visita, sin pasos de más.">
          <p>Desde los sitios y los simuladores, el contacto abre directo el WhatsApp del agente.</p>
          <p>Quien quiere ver una propiedad agenda la visita en línea: recibe su orden de visita en PDF, y el sistema envía la confirmación por correo al cliente y al agente.</p>
          <p>Quien decide comprar completa un formulario y genera su Carta Oferta de Compra.</p>
        </SeccionCaso>
        <CitaCaso logo={LOGO} {...CITA_RELACIONES} />

        <ResultadosCaso titulo="Resultados: hoy Dunamis llega a la primera reunión con la conversación iniciada." items={RESULTADOS} />
      </CuerpoCaso>

      <CierreCaso titulo="Tu empresa ya tiene el conocimiento." />
    </PaginaCaso>
  )
}
