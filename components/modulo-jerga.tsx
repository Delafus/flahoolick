import Image from 'next/image'
import Link from 'next/link'

const AMARILLO = '#F6FD92'
const NEGRO    = '#000000'

export function ModuloJerga() {
  return (
    <section style={{ backgroundColor: AMARILLO, color: NEGRO }}>
      <div className="max-container page-px" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

        {/* ── HEADER: logo + tagline ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
          {/* Logo Jerga */}
          <div>
            <Image
              src="/logotipo-jerga.svg"
              alt="JERGA"
              width={280}
              height={160}
              style={{ width: '280px', height: 'auto' }}
              priority
            />
          </div>

          {/* Tagline */}
          <div className="flex items-start pt-4">
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              lineHeight: 1.4,
              color: NEGRO,
            }}>
              Ideas, guías y puntos de vista para convertir conocimiento técnico en autoridad de mercado.
            </p>
          </div>
        </div>

        {/* ── DOS CARDS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* Card 1 */}
          <div className="flex flex-col gap-6">
            <p className="label font-bold" style={{ color: NEGRO }}>PUNTO DE PARTIDA</p>
            <div style={{ aspectRatio: '4/3', backgroundColor: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ color: NEGRO, opacity: 0.3 }}>Imagen</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', lineHeight: 1.2, color: NEGRO }}>
                Qué sabe tu empresa que tu audiencia necesita entender
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: NEGRO, opacity: 0.7 }}>
                Una guía para detectar la distancia entre conocimiento interno y conversación de mercado.
              </p>
            </div>
            <Link href="/jerga" className="label inline-flex items-center gap-2 px-5 py-3 w-fit hover:opacity-80 transition-opacity"
              style={{ backgroundColor: NEGRO, color: AMARILLO }}>
              LEER ARTÍCULO →
            </Link>
          </div>

          {/* Separador vertical */}
          <div style={{ backgroundColor: NEGRO, opacity: 0.2, height: '100%', minHeight: '400px', width: '1px' }} />

          {/* Card 2 */}
          <div className="flex flex-col gap-6">
            <p className="label font-bold" style={{ color: NEGRO }}>METODOLOGÍA</p>
            <div style={{ aspectRatio: '4/3', backgroundColor: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ color: NEGRO, opacity: 0.3 }}>Imagen</span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', lineHeight: 1.2, color: NEGRO }}>
                Sistema de Circulación: de la señal al contenido
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: NEGRO, opacity: 0.7 }}>
                Cómo una idea nacida dentro de la empresa puede transformarse en contenido, argumentos y herramientas comerciales.
              </p>
            </div>
            <Link href="/jerga" className="label inline-flex items-center gap-2 px-5 py-3 w-fit hover:opacity-80 transition-opacity"
              style={{ backgroundColor: NEGRO, color: AMARILLO }}>
              LEER ARTÍCULO →
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
