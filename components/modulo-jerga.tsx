import Image from 'next/image'
import Link from 'next/link'
import { CTA_TIPO } from '@/content/jerga'
import { todas, categorias, type Pieza } from '@/sanity/lib/jerga'

const AZUL   = '#105E9C'
const BLANCO = '#ffffff'

function Card({ pieza, nombreCategoria }: { pieza: Pieza; nombreCategoria?: string }) {
  return (
    <div className="w-full flex flex-col gap-6">
      <p className="label font-bold" style={{ color: BLANCO }}>
        {nombreCategoria?.toUpperCase()}
      </p>
      <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: 'rgba(255,255,255,0.12)', display: pieza.imagenDestacadaUrl ? 'block' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {pieza.imagenDestacadaUrl ? (
          <Image src={pieza.imagenDestacadaUrl} alt={pieza.imagenDestacadaAlt ?? pieza.titulo} fill style={{ objectFit: 'cover' }} />
        ) : (
          <span className="label" style={{ color: BLANCO, opacity: 0.3 }}>Imagen</span>
        )}
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', lineHeight: 1.2, color: BLANCO }}>
          {pieza.titulo}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.7 }}>
          {pieza.bajada}
        </p>
      </div>
      <Link href={`/jerga/${pieza.slug}`}
        className="label inline-flex items-center gap-2 px-5 py-3 w-fit hover:opacity-80 transition-opacity"
        style={{ backgroundColor: BLANCO, color: AZUL, borderRadius: '999px' }}>
        {CTA_TIPO[pieza.tipo].toUpperCase()}
      </Link>
    </div>
  )
}

export async function ModuloJerga() {
  const [piezas, cats] = await Promise.all([todas(), categorias()])
  const [primera, segunda] = piezas.slice(0, 2)
  const nombreCategoria = (slug: string) => cats.find(c => c.slug === slug)?.nombre

  return (
    <section style={{ backgroundColor: AZUL, color: BLANCO, position: 'relative', overflow: 'hidden' }}>
      {/* Cuadrícula de plano de patente — sutil, solo arriba, se desvanece hacia abajo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '420px',
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          pointerEvents: 'none',
        }}
      />
      <div className="max-container page-px" style={{ paddingTop: 'clamp(5rem, 9vw, 10rem)', paddingBottom: '5rem', position: 'relative' }}>

        {/* ── HEADER: logo + tagline ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <Link href="/jerga">
              <Image
                src="/logotipo-jerga.svg"
                alt="JERGA"
                width={280}
                height={160}
                style={{ width: '280px', height: 'auto', filter: 'brightness(0) invert(1)' }}
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
              color: BLANCO,
            }}>
              Ideas, guías y puntos de vista para convertir conocimiento técnico en autoridad de mercado.
            </p>
          </div>
        </div>

        {/* ── DOS CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          <div className="md:pr-12">
            {primera && <Card pieza={primera} nombreCategoria={nombreCategoria(primera.categoria)} />}
          </div>
          <div className="md:pl-12" style={{ position: 'relative' }}>
            <div className="hidden md:block" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px', backgroundColor: BLANCO, opacity: 0.2 }} />
            {segunda && <Card pieza={segunda} nombreCategoria={nombreCategoria(segunda.categoria)} />}
          </div>
        </div>

        {/* ── Ver todo ── */}
        <div className="mt-16 pt-8" style={{ borderTop: `1px solid rgba(255,255,255,0.25)` }}>
          <Link href="/jerga" className="label hover:opacity-60 transition-opacity" style={{ color: BLANCO }}>
            VER TODO JERGA →
          </Link>
        </div>

      </div>
    </section>
  )
}
