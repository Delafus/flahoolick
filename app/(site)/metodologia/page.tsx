import { Metadata } from 'next'
import { Pagina, Hero, Cierre, CreditoStrategyzer, CABECERAS, DESTACADA, Italica, ESTILO_FUENTE } from '@/components/minimal'
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

/** Cinco principios basados en evidencia (Ehrenberg-Bass, Binet y Field), adaptados a B2B. Sin cifras hasta verificarlas. */
const PRINCIPIOS = [
  { titulo: 'Al comprador no le importa tu marca.', texto: 'Le importan sus problemas. Cada mensaje parte de su situación, no de lo que la empresa quiere decir de sí misma.', fuente: 'Byron Sharp, How Brands Grow (2010).' },
  { titulo: 'Que te reconozcan antes de que te entiendan.', texto: 'Colores, formas, tono y personajes que se repiten en cada pieza. La distintividad hace que el mercado te identifique sin esfuerzo.', fuente: 'Jenni Romaniuk, Building Distinctive Brand Assets (2018).' },
  { titulo: 'Comunica para el 95% que todavía no compra.', texto: 'En B2B, solo el 5% del mercado está listo para comprar hoy. El resto decidirá más adelante y elegirá entre las marcas que recuerda.', fuente: 'John Dawes, Ehrenberg-Bass Institute y LinkedIn B2B Institute (2021).' },
  { titulo: 'Habla de lo que el negocio resuelve.', texto: 'Las razones de compra están en el producto, el servicio y las situaciones en que alguien necesita tu categoría, no en un propósito inventado.', fuente: 'Jenni Romaniuk, Category Entry Points; Peter Field, IPA.' },
  { titulo: 'Sé consistente por años, no por campañas.', texto: 'Las marcas se construyen con repetición. Cambiar el mensaje porque el equipo se aburrió borra lo que el mercado empezaba a recordar.', fuente: 'Les Binet y Peter Field, The Long and the Short of It (2013).' },
]

/** Charlas en que se basan los principios. */
const CHARLAS = [
  { texto: 'Byron Sharp: Busting myths about business growth', href: 'https://www.youtube.com/watch?v=JZ4TKKB28js' },
  { texto: 'Byron Sharp vs Mark Ritson: 5 big marketing truths we agree on', href: 'https://www.youtube.com/watch?v=6tCo3UP1pYQ' },
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

        {/* Bisagra: la propuesta de valor (lo que decir) y la distintividad (que te recuerden). */}
        <section className="flex flex-col gap-6 pt-16 md:pt-24" style={{ maxWidth: '52rem' }}>
          <h2 className="text-[2.25rem] md:text-[3.25rem]" style={TITULO}>
            La propuesta de valor te da algo que decir. <Italica>La distintividad hace que te recuerden.</Italica>
          </h2>
          <p style={{ maxWidth: '44rem' }}>Ordenamos lo que tu empresa ofrece con el Value Proposition Canvas. Para ponerlo en circulación, seguimos lo que dice la evidencia sobre cómo crecen las marcas.</p>
        </section>

        {/* Principios basados en evidencia: numerados, sin cajas, en dos columnas en escritorio, cada uno con su fuente. */}
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
                <p style={ESTILO_FUENTE}>{p.fuente}</p>
              </li>
            ))}
          </ul>
          <p style={ESTILO_FUENTE}>
            Basado en:{' '}
            {CHARLAS.map((c, i) => (
              <span key={c.href}>
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 decoration-1">{c.texto}</a>
                {i < CHARLAS.length - 1 ? ' · ' : '.'}
              </span>
            ))}
          </p>
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
