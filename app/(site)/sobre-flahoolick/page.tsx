import { Metadata } from 'next'
import { Pagina, Hero, Bloque, Items, Cierre } from '@/components/minimal'
import { logos } from '@/components/marquee'

export const metadata: Metadata = {
  title: 'Sobre Flahoolick | Estrategia y contenido B2B',
  description: 'Somos un equipo senior de estrategia, creatividad, contenido y medios que ayuda a empresas B2B a convertir conocimiento en presencia y herramientas para ventas.',
}

const CREEMOS = [
  { titulo: 'La complejidad merece conservar su valor', texto: 'Nuestro trabajo es hacerla comprensible y preservar aquello que vuelve valiosa a la empresa.' },
  { titulo: 'La presencia se construye desde las primeras etapas', texto: 'Las decisiones B2B maduran durante meses. La comunicación trabaja mientras el comprador investiga y forma criterio.' },
  { titulo: 'El criterio guía la tecnología', texto: 'Utilizamos IA para investigar, ordenar y ejecutar. La estrategia, las decisiones editoriales y la redacción final dependen de profesionales senior.' },
  { titulo: 'El trabajo queda instalado', texto: 'Creamos relatos, herramientas y formas de trabajar que la organización puede utilizar, sostener y mejorar.' },
]

export default function SobreFlahoolick() {
  return (
    <Pagina>
      <Hero
        titulo="Nacimos de una idea generosa."
        bajada={<>Del irlandés <em>flaithiúil</em>: generoso, espléndido, abundante. Flahoolick es un estudio de estrategia y contenido para empresas B2B con ciclos de decisión complejos.</>}
      />
      <Bloque titulo="Las empresas saben mucho más de lo que consiguen poner en circulación.">
        <p>El conocimiento que distingue a una empresa compleja rara vez llega al mercado en todo su valor. Vive en reuniones de trabajo, manuales, propuestas y en la cabeza de expertos concentrados en resolver problemas.</p>
        <p>Flahoolick conecta ese conocimiento con la forma en que la empresa se presenta, se explica y vende.</p>
        <p>Entendemos el negocio, definimos una posición y construimos el sistema que permite a marca, contenido y ventas trabajar desde una misma dirección.</p>
      </Bloque>
      <Bloque titulo="Qué creemos">
        <Items items={CREEMOS} />
      </Bloque>
      <Bloque titulo="Cuatro profesionales senior.">
        <p>Venimos de medios de comunicación, grupos publicitarios globales, estrategia, creatividad y producción editorial. Hemos trabajado con compañías de distintas industrias y escalas, traduciendo problemas complejos en ideas, sistemas y piezas que las personas pueden utilizar.</p>
        <p>En Flahoolick ese oficio se concentra en construir presencia de marca para empresas con un valor rico, técnico y complejo.</p>
        <p className="text-base" style={{ opacity: 0.5 }}>Organizaciones en las que nuestro equipo ha trabajado</p>
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {logos.map(l => (
            <li key={l.alt}>
              <img src={l.src} alt={l.alt} style={{ height: '28px', width: 'auto', maxWidth: '110px', filter: 'brightness(0)', display: 'block' }} />
            </li>
          ))}
        </ul>
      </Bloque>
      <Cierre
        titulo="Generosidad también es hacer circular lo que uno sabe."
        texto="Ayudamos a que el conocimiento de una empresa encuentre una forma, una audiencia y una función en el mercado."
        cta="Conversemos →"
      />
    </Pagina>
  )
}
