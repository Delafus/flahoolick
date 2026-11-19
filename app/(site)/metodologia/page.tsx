import { Metadata } from 'next'
import { Pagina, Hero, Cierre, CreditoStrategyzer, CABECERAS, DESTACADA, Italica } from '@/components/minimal'
import { ETAPAS } from '@/components/etapas-datos'
import { EtapasScroll } from '@/components/etapas-scroll'

export const metadata: Metadata = {
  title: 'Metodología | Del conocimiento disperso a un sistema que trabaja | Flahoolick',
  description: 'Entendemos el negocio, definimos su posición y ponemos su conocimiento en circulación mediante contenido y herramientas para ventas.',
}

const AZUL = CABECERAS.hielo.texto
const CELESTE = CABECERAS.hielo.fondo

/** Cuerpo de la página: celeste de borde a borde con texto azul noche. */
const CUERPO = {
  backgroundColor: CELESTE, color: AZUL, ['--tinta' as string]: AZUL,
  boxShadow: `0 0 0 100vmax ${CELESTE}`, clipPath: 'inset(0 -100vmax)',
} as React.CSSProperties

const TITULO = { ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' } as const

/** Texto de cada etapa en esta página: más completo que el de la home. */
const TEXTOS = [
  'Entramos a tu negocio, revisamos la oferta, el mercado, las audiencias y el proceso comercial. Entrevistamos a dirección, ventas y especialistas para identificar qué problemas reales resuelves, qué conocimiento distingue a la empresa y dónde están las brechas que hoy dificultan explicarlo.',
  'Cruzamos lo que ofreces con lo que tu cliente necesita resolver. Elegimos qué lugar puede ocupar la empresa, qué idea debe organizar su relato y qué mensajes, argumentos y pruebas necesitan compartir dirección, marketing, ventas y los equipos técnicos.',
  'Convertimos esa dirección en una operación concreta para que tus audiencias puedan encontrarte, entenderte y recordarte: temas, contenidos, herramientas comerciales, formatos, canales, responsables y criterios de medición.',
]

const PRINCIPIOS = [
  { titulo: 'El negocio va primero', texto: 'Cada recomendación parte de entender cómo la empresa crea valor y por qué alguien debería elegirla.' },
  { titulo: 'El conocimiento interno aporta evidencia', texto: 'Buscamos experiencia, datos, decisiones y aprendizajes propios que la empresa puede afirmar con plena legitimidad.' },
  { titulo: 'Cada activo cumple un trabajo', texto: 'Su función puede ser descubrir un problema, explicar una solución, comparar alternativas, resolver una objeción o avanzar una venta.' },
  { titulo: 'Marketing y ventas comparten el relato', texto: 'Todo lo que el mercado encuentra y escucha construye la misma comprensión de la empresa.' },
  { titulo: 'El criterio guía la tecnología', texto: 'La IA amplía nuestra capacidad para investigar, ordenar y ejecutar. El juicio humano senior dirige las decisiones estratégicas y editoriales.' },
]

export default function Metodologia() {
  return (
    <Pagina>
      <Hero
        color="amarillo"
        compacto
        eyebrow="Metodología"
        titulo="Del conocimiento disperso a un sistema que trabaja."
        cursiva="a un sistema que trabaja."
        bajada="Entendemos cómo tu empresa crea valor, definimos la posición que puede defender y convertimos esa dirección en contenido y herramientas para el mercado."
      />

      <div style={CUERPO}>
        {/* Entrada: el problema y el punto de partida (el Value Proposition Canvas). */}
        <section className="flex flex-col gap-8 py-16 md:gap-10 md:py-24">
          <h2 className="text-[2.25rem] md:text-[3.25rem]" style={{ ...TITULO, maxWidth: '22ch' }}>
            Un buen vendedor quiere crear valor para su cliente. <Italica>Lo difícil es que diga lo mismo que el resto de su empresa.</Italica>
          </h2>
          <div className="flex flex-col gap-4" style={{ maxWidth: '44rem' }}>
            <p>Cada área ve una parte distinta del cliente, y gran parte de lo que la empresa sabe nunca se escribió. Por eso empezamos con el Value Proposition Canvas, de Strategyzer: cruzamos lo que tu empresa ofrece con lo que cada segmento de clientes necesita resolver. De ahí sale a quién hablarle primero, con qué mensaje y qué historias contar para que el mercado te recuerde antes de salir a comprar.</p>
            <CreditoStrategyzer />
          </div>
        </section>

        {/* Las tres etapas con el gráfico animado (el mismo de la home). */}
        <section className="flex flex-col gap-10 pb-16 md:pb-24">
          <h2 className="text-[2.25rem] md:text-[3.25rem]" style={TITULO}>
            Cómo lo llevamos <Italica>a la práctica.</Italica>
          </h2>
          <EtapasScroll etapas={ETAPAS.map((e, i) => ({ slug: e.slug, nombre: e.nombre, texto: TEXTOS[i], recibes: e.recibes }))} />
        </section>

        {/* Principios: numerados, sin cajas, en dos columnas en escritorio. */}
        <section className="flex flex-col gap-10 py-16 md:gap-14 md:py-24">
          <h2 className="text-[2.25rem] md:text-[3.25rem]" style={{ ...TITULO, maxWidth: '22ch' }}>
            Cinco principios para producir <Italica>comunicación con sustancia.</Italica>
          </h2>
          <ul className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2 md:gap-y-14">
            {PRINCIPIOS.map((p, i) => (
              <li key={p.titulo} className="flex flex-col gap-3">
                <h3 className="text-[1.5rem] md:text-[1.75rem]" style={{ ...DESTACADA, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                  {String(i + 1).padStart(2, '0')} {p.titulo}
                </h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Expertos. */}
        <section className="flex flex-col gap-4 pb-16 md:pb-24" style={{ maxWidth: '44rem' }}>
          <h2 className="text-[1.75rem] md:text-[2.25rem]" style={TITULO}>
            Tus expertos pueden <Italica>concentrarse en su trabajo.</Italica>
          </h2>
          <p>Capturamos lo que saben mediante entrevistas breves, conversaciones de trabajo, documentos existentes, reuniones, datos y preguntas comerciales. Transformamos esa materia prima conservando su precisión y su carácter.</p>
        </section>
      </div>

      <Cierre titulo="El conocimiento adquiere valor cuando encuentra una función en el mercado." cta="Agenda una llamada" />
    </Pagina>
  )
}
