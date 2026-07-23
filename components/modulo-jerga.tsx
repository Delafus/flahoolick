import Image from 'next/image'
import Link from 'next/link'
import { todas, categoria, CTA_TIPO, type Pieza } from '@/content/jerga'

const AMARILLO = '#F6FD92'
const NEGRO    = '#000000'

function Card({ pieza }: { pieza: Pieza }) {
  return (
    <div className="w-full flex flex-col gap-6">
      <p className="label font-bold" style={{ color: NEGRO }}>
        {categoria(pieza.categoria)?.nombre.toUpperCase()}
      </p>
      <div style={{ aspectRatio: '4/3', backgroundColor: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <span className="label" style={{ color: NEGRO, opacity: 0.3 }}>Imagen</span>
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', lineHeight: 1.2, color: NEGRO }}>
          {pieza.titulo}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: NEGRO, opacity: 0.7 }}>
          {pieza.bajada}
        </p>
      </div>
      <Link href={`/jerga/${pieza.slug}`}
        className="label inline-flex items-center gap-2 px-5 py-3 w-fit hover:opacity-80 transition-opacity"
        style={{ backgroundColor: NEGRO, color: AMARILLO }}>
        {CTA_TIPO[pieza.tipo].toUpperCase()}
      </Link>
    </div>
  )
}

export function ModuloJerga() {
  const [primera, segunda] = todas().slice(0, 2)

  return (
    <section style={{ backgroundColor: AMARILLO, color: NEGRO }}>
      <div className="max-container page-px" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>

        {/* ── HEADER: logo + tagline ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <Link href="/jerga">
              <Image
                src="/logotipo-jerga.svg"
                alt="JERGA"
                width={280}
                height={160}
                style={{ width: '280px', height: 'auto' }}
                priority
              />
            </Link>
          </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          <div className="md:pr-12">
            {primera && <Card pieza={primera} />}
          </div>
          <div className="md:pl-12" style={{ position: 'relative' }}>
            <div className="hidden md:block" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', backgroundColor: NEGRO, opacity: 0.2 }} />
            {segunda && <Card pieza={segunda} />}
          </div>
        </div>

        {/* ── Ver todo ── */}
        <div className="mt-16 pt-8" style={{ borderTop: `1px solid rgba(0,0,0,0.2)` }}>
          <Link href="/jerga" className="label hover:opacity-60 transition-opacity" style={{ color: NEGRO }}>
            VER TODO JERGA →
          </Link>
        </div>

      </div>
    </section>
  )
}
