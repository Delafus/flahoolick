import { Metadata } from 'next'
import { Pagina, Hero, Cierre, CABECERAS, DESTACADA, Italica } from '@/components/minimal'
import { ShieldWheel } from '@/components/shield-wheel'
import { GRAFICOS_PRINCIPIOS } from '@/components/principios-graficos'

export const metadata: Metadata = {
  title: 'Sobre Flahoolick | Estrategia y contenido B2B',
  description: 'Somos un equipo senior de estrategia, creatividad, contenido y medios que ayuda a empresas B2B a convertir conocimiento en presencia y herramientas para ventas.',
}

const AZUL = CABECERAS.hielo.texto
const CELESTE = CABECERAS.hielo.fondo
const ROSA = '#FFDAED'

/** Fondo de borde a borde sin cambiar el ancho del contenido, con el azul noche como color del texto. */
const banda = (fondo: string): React.CSSProperties => ({
  backgroundColor: fondo, color: AZUL, ['--tinta' as string]: AZUL,
  boxShadow: `0 0 0 100vmax ${fondo}`, clipPath: 'inset(0 -100vmax)',
} as React.CSSProperties)

const CREEMOS = [
  { titulo: 'El valor se explica desde el cliente', texto: 'Las capacidades de una empresa importan cuando resuelven un problema concreto de sus clientes.' },
  { titulo: 'La claridad alinea a la organización', texto: 'Dirección, especialistas, marketing y ventas necesitan una comprensión compartida del valor que entrega la empresa. Cuando todos lo explican de la misma forma, el mercado lo entiende.' },
  { titulo: 'La presencia se construye durante todo el ciclo', texto: 'Las decisiones B2B toman meses. La comunicación ayuda a que una empresa sea conocida, recordada y considerada mientras sus futuros clientes investigan y forman criterio.' },
  { titulo: 'El criterio guía la tecnología', texto: 'Utilizamos inteligencia artificial para investigar, analizar y organizar conocimiento. La estrategia, las decisiones editoriales y la redacción final dependen de profesionales senior.' },
  { titulo: 'El trabajo queda instalado', texto: 'Creamos relatos, herramientas y sistemas de contenido que la organización puede utilizar, sostener y mejorar con el tiempo.' },
]

/** Lado del doblez de la esquina de las tarjetas, en px (el mismo recurso de las tarjetas de servicios). */
const DOBLEZ = 28

export default function SobreFlahoolick() {
  return (
    <Pagina>
      <Hero
        color="verde"
        visual={<ShieldWheel color="#000000" className="h-full w-full" />}
        titulo="Nacimos de una idea generosa."
        cursiva="una idea generosa."
        bajada={<>Del irlandés <em>flaithiúil</em>: generoso, espléndido, abundante. Flahoolick es un estudio de estrategia y contenido para empresas B2B con ciclos de decisión complejos.</>}
      />

      {/* Entrada: titular grande y la intro en dos columnas (el problema a la izquierda, lo que hacemos a la derecha). */}
      <section className="flex flex-col gap-10 py-16 md:gap-14 md:py-24" style={banda(CELESTE)}>
        <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '18ch' }}>
          El valor de tu empresa <Italica>merece una explicación clara.</Italica>
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-5">
            <p>En las empresas complejas, el conocimiento está repartido entre especialistas, áreas técnicas, equipos comerciales y dirección. Cada uno ve una parte del valor.</p>
            <p>El desafío está en conectar esas perspectivas y articular con claridad qué problemas resuelve la organización, para quién y qué valor crea para sus clientes.</p>
          </div>
          <div className="flex flex-col gap-5">
            <p>Trabajamos con las personas que conocen el negocio y convertimos lo que saben en una propuesta compartida que orienta cómo la empresa se posiciona, comunica y vende.</p>
            <p>Construimos la estrategia, el relato y el sistema de contenido para llevar esa propuesta al mercado y mantenerla presente durante todo el ciclo de decisión.</p>
          </div>
        </div>
      </section>

      {/* Frase destacada: la idea clave en grande, como una cita al medio de la página. */}
      <section className="flex justify-center py-16 text-center md:py-24" style={{ color: AZUL }}>
        <p className="text-[1.875rem] md:text-[3rem]"
          style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.01em', maxWidth: '24ch' }}>
          Encontramos los argumentos, experiencias y evidencias que explican ese valor.
        </p>
      </section>

      {/* Qué creemos: cinco tarjetas numeradas, cada una con un mini gráfico de la iconografía del sitio. */}
      <section className="flex flex-col gap-10 py-16 md:gap-14 md:py-24" style={banda(ROSA)}>
        <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          Qué <Italica>creemos.</Italica>
        </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {CREEMOS.map((c, i) => {
            const Grafico = GRAFICOS_PRINCIPIOS[i]
            return (
              <li key={c.titulo} className="group relative flex flex-col gap-5 p-8 md:p-10"
                style={{ backgroundColor: CELESTE, clipPath: `polygon(0 0, calc(100% - ${DOBLEZ}px) 0, 100% ${DOBLEZ}px, 100% 100%, 0 100%)` }}>
                <span aria-hidden className="absolute right-0 top-0"
                  style={{ width: DOBLEZ, height: DOBLEZ, backgroundColor: '#ffffff', clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
                <div className="flex items-start justify-between gap-4">
                  <Grafico />
                  <span className="label" style={{ opacity: 0.6 }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-[1.375rem] md:text-[1.5rem]" style={{ ...DESTACADA, lineHeight: 1.1, letterSpacing: '-0.03em' }}>{c.titulo}</h3>
                <p className="text-base" style={{ opacity: 0.85 }}>{c.texto}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <Cierre
        titulo="Generosidad también es hacer circular lo que uno sabe."
        texto="Ayudamos a que el conocimiento de una empresa encuentre una forma, una audiencia y una función en el mercado."
        cta="Agenda una llamada"
      />
    </Pagina>
  )
}
