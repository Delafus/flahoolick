import { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { Marquee } from '@/components/marquee'
import { Pagina, Hero, Pantalla, Bloque, Items, ENLACE } from '@/components/minimal'
import { DotPattern } from '@/components/dot-pattern'

export const metadata: Metadata = {
  title: 'Flahoolick | Contenido B2B que convierte conocimiento en ventas',
  description: 'Convertimos el conocimiento de tu empresa en contenido y herramientas de venta para mercados B2B con ciclos largos. Santiago, Chile.',
}

const CTA = 'Agenda una llamada de 30 minutos →'
const NOTA = 'Sin presentaciones ni decks de venta.'

const PASOS = [
  {
    titulo: '01 Encontramos',
    texto: 'Entramos a tu negocio, hablamos con quienes lo conocen y revisamos lo que ya tienes. Identificamos qué problemas reales resuelves y a qué clientes les importa más.',
    recibes: 'un diagnóstico con los argumentos y evidencias que hacen que un cliente te elija.',
  },
  {
    titulo: '02 Ordenamos',
    texto: 'Cruzamos lo que ofreces con lo que tu cliente necesita resolver. Definimos a quién hablarle, con qué mensaje y sobre qué temas.',
    recibes: 'una propuesta de valor y un mapa de mensajes que toda la empresa cuenta igual.',
  },
  {
    titulo: '03 Ponemos en circulación',
    texto: 'Lo convertimos en contenido y herramientas que tus clientes pueden encontrar, entender y recordar.',
    recibes: 'piezas publicadas, con resultados que revisamos junto a marketing y ventas.',
  },
]

const BENEFICIOS = [
  { titulo: 'Dirección', texto: 'El conocimiento que tu empresa acumuló durante años empieza a trabajar comercialmente.' },
  { titulo: 'Marketing', texto: 'Una fuente constante de temas relevantes para tu mercado.' },
  { titulo: 'Ventas', texto: 'Mejores argumentos y herramientas para cada conversación.' },
  { titulo: 'Especialistas', texto: 'Aportan lo que saben en una conversación. Nosotros lo convertimos en contenido.' },
]

const SERVICIOS = [
  { titulo: 'Marca y relato', texto: 'Una idea central y mensajes que todo el equipo cuenta igual.', href: '/servicios/marca-y-relato' },
  { titulo: 'Estrategia de contenido', texto: 'Qué busca tu comprador y qué temas puede liderar tu empresa.', href: '/servicios/estrategia-de-contenido' },
  { titulo: 'Producción de contenido', texto: 'Piezas de autoridad y herramientas de venta, en cadencia mensual.', href: '/servicios/produccion-de-contenido' },
  { titulo: 'IA para marketing y ventas', texto: 'Herramientas y agentes que investigan, automatizan y atienden.', href: '/servicios/ia-para-marketing-y-ventas' },
]

export default function HomePage() {
  return (
    <Pagina>
        <Hero
          color="negro"
          visual={<DotPattern pattern="malla" color="#ffffff" accentColor="#1FDE91" />}
          titulo="Convertimos lo que tu empresa sabe en contenido y herramientas que venden."
          bajada="Para empresas B2B con ventas largas y decisiones complejas."
          cta={CTA}
          nota={NOTA}
        />

        <Pantalla titulo="Solo el 5% de tu mercado está listo para comprar hoy.">
          <p>El 95% restante comprará en seis meses, un año o más. Cuando llegue ese día, elegirá a la empresa que ya conoce.</p>
          <p className="text-base">
            <span style={{ opacity: 0.5 }}>Fuente: John Dawes, Ehrenberg-Bass Institute.</span>{' '}
            <Link href="/jerga/john-dawes-y-su-regla-del-95-5" className={ENLACE}>Leer la guía de la regla 95:5 →</Link>
          </p>
        </Pantalla>

        <Pantalla titulo="Tu empresa sabe mucho más de lo que tu mercado conoce.">
          <p>Ese conocimiento está repartido entre personas, documentos, reuniones, presentaciones y equipos técnicos. Nosotros entramos ahí.</p>
        </Pantalla>

        <Bloque titulo="Cómo trabajamos.">
          <p>En la mayoría de las empresas, cada persona explica el valor de la oferta a su manera. Partimos por ordenar eso.</p>
          <div className="flex flex-col gap-6">
            {PASOS.map(p => (
              <div key={p.titulo}>
                <h3 style={{ fontWeight: 500 }}>{p.titulo}</h3>
                <p>{p.texto}</p>
                <p><span style={{ fontWeight: 500 }}>Recibes:</span> {p.recibes}</p>
              </div>
            ))}
          </div>
          <p><Link href="/metodologia" className={ENLACE}>Ver la metodología →</Link></p>
        </Bloque>

        <Bloque titulo="Para qué te sirve.">
          <Items items={BENEFICIOS} />
        </Bloque>

        <Bloque titulo="Los agentes de Dunamis llegan a la primera reunión con la conversación empezada.">
          <p>Una identidad, dos sitios, una plataforma editorial, tres herramientas y un asistente virtual.</p>
          <p><Link href="/casos/dunamis" className={ENLACE}>Ver el caso Dunamis →</Link></p>
        </Bloque>

        <Bloque titulo="Servicios.">
          <Items items={SERVICIOS} />
        </Bloque>

        <Bloque titulo="Somos FLAHOOLICK. Un equipo senior de medios y grupos publicitarios.">
          <p>Más de 25 años convirtiendo conocimiento complejo en contenido que el mercado entiende. Hoy trabajamos para empresas B2B desde Santiago, Chile.</p>
          <div>
            <p className="text-base" style={{ opacity: 0.5 }}>Marcas que nos formaron</p>
            <Marquee color="#000000" excluir={['Dunamis']} />
          </div>
          <p><Link href="/sobre-flahoolick" className={ENLACE}>Sobre Flahoolick →</Link></p>
        </Bloque>

        <Bloque titulo="Tú ya hiciste la parte difícil: aprender. Nosotros hacemos que ese conocimiento trabaje.">
          <ContactForm minimal submitLabel={CTA} />
          <p className="text-base" style={{ opacity: 0.5 }}>{NOTA}</p>
        </Bloque>
    </Pagina>
  )
}
