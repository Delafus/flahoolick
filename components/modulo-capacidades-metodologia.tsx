import Image from 'next/image'
import Link from 'next/link'
import { AcordeonSeccion } from './acordeon-seccion'
import { guiasFijadas } from '@/sanity/lib/jerga'

const NEGRO   = '#000000'
const BLANCO  = '#ffffff'

const acordeonItems = [
  {
    titulo: 'ESTRATEGIA Y RELATO',
    desc: 'Definimos la posición, las audiencias y el relato que la empresa necesita instalar en el mercado.',
    href: '/capacidades/estrategia-y-relato',
  },
  {
    titulo: 'SISTEMA DE CONTENIDO',
    desc: 'Diseñamos el playbook, los flujos y la cadencia que mantienen el conocimiento en circulación.',
    href: '/capacidades/sistema-de-contenido',
  },
  {
    titulo: 'ESTUDIO CREATIVO',
    desc: 'Producimos contenidos, herramientas comerciales y activos ejecutivos que construyen autoridad y apoyan tu venta.',
    href: '/capacidades/estudio-creativo',
  },
]

const footerCols = [
  {
    titulo: 'NUESTRO SISTEMA',
    desc: 'Cuatro capas convierten señales dispersas en una operación continua.',
    href: '/metodologia#como-funciona',
    cta: 'VER CÓMO FUNCIONA ›',
  },
  {
    titulo: 'IA Y CRITERIO',
    desc: 'La tecnología procesa a escala. El equipo senior dirige las decisiones.',
    href: '/metodologia/como-trabajamos-con-ia',
    cta: 'VER CÓMO TRABAJAMOS ›',
  },
  {
    titulo: 'LO QUE SE ACUMULA',
    desc: 'Cada ciclo deja conocimiento, criterios y activos disponibles para el siguiente.',
    href: '/metodologia#lo-que-acumula',
    cta: 'VER LO QUE CONSTRUYE ›',
  },
]

interface TarjetaJerga {
  img?: string
  alt: string
  titulo: string
  href: string
}

/** Portada de la guía. Tolera guías todavía sin imagen destacada. */
function PortadaGuia({ card }: { card: TarjetaJerga }) {
  if (!card.img) {
    return (
      <div style={{
        width: '100%',
        aspectRatio: '16/10',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '4px',
      }} />
    )
  }
  return (
    <img src={card.img} alt={card.alt}
      style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
  )
}

function ShieldIcon() {
  return (
    <Image src="/shield.svg" alt="" width={18} height={22}
      style={{
        filter: 'brightness(0) invert(1)',
        height: '22px', width: 'auto', flexShrink: 0,
      }}
    />
  )
}

export async function ModuloCapacidadesMetodologia() {
  // Las dos tarjetas salen de las guías que estén fijadas en Sanity, las
  // mismas que alimentan la barra de JERGA. Se controlan desde el CMS.
  const guias = await guiasFijadas()
  const tarjetasJerga: TarjetaJerga[] = guias.slice(0, 2).map(g => ({
    img: g.imagenDestacadaUrl,
    alt: g.imagenDestacadaAlt ?? g.titulo,
    titulo: g.titulo,
    href: `/jerga/${g.slug}`,
  }))

  return (
    <div style={{ backgroundColor: NEGRO }}>

      {/* ── SECCIÓN 1: CAPACIDADES ── */}
      <AcordeonSeccion
        eyebrow="En qué nos especializamos"
        titulo="Donde el contenido trabaja para el negocio"
        bajada="Tres capacidades trabajan juntas durante el diagnóstico, la instalación y la operación."
        illustration={{ src: '/iconos-industria.svg', alt: 'Íconos de industrias B2B' }}
        items={acordeonItems}
        ctaLabel="CÓMO LO HACEMOS"
      />

      {/* Divisoria */}
      <div className="page-px">
        <div className="max-container">
          <hr style={{ borderColor: BLANCO, borderTopWidth: '1px', opacity: 0.3 }} />
        </div>
      </div>

      {/* ── SECCIÓN 2: METODOLOGÍA ── */}
      <section className="page-px section-py">
        <div className="max-container">

          {/* Grid: columna izquierda larga + columna derecha sticky */}
          <div className="hidden md:grid gap-12 items-start"
            style={{ gridTemplateColumns: '10fr 3fr' }}>

            {/* Columna izquierda — scrollea libremente */}
            <div className="flex flex-col gap-8">
              <p className="label" style={{ color: BLANCO, opacity: 0.6 }}>Metodología</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: BLANCO,
                fontWeight: 400,
                overflowWrap: 'break-word',
                marginTop: '-0.5rem',
              }}>
                Cada ciclo deja un activo.
              </h2>

              <div className="flex flex-col gap-5" style={{ maxWidth: '560px' }}>
                <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', lineHeight: 1.6, color: BLANCO, opacity: 0.85, fontWeight: 300 }}>
                  Capturamos señales, priorizamos oportunidades, producimos activos y usamos la respuesta del mercado para mejorar el siguiente ciclo.
                </p>
                <Link href="/metodologia"
                  className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                  EXPLORAR METODOLOGÍA ›
                </Link>
              </div>

              {/* Tres cajitas — dentro de la columna izquierda, tras el contenido */}
              <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, marginTop: '3rem', paddingTop: '3rem' }}>
                <div className="grid grid-cols-3 gap-8">
                  {footerCols.map((col, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <ShieldIcon />
                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: BLANCO, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {col.titulo}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.7 }}>{col.desc}</p>
                      <Link href={col.href}
                        className="label inline-flex items-center gap-1 px-4 py-2 w-fit hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                        {col.cta}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna derecha — sticky */}
            <div style={{
              position: 'sticky',
              top: '80px',
              alignSelf: 'start',
              borderLeft: tarjetasJerga.length ? `1px solid rgba(255,255,255,0.2)` : 'none',
              paddingLeft: '2rem',
            }}>
              {tarjetasJerga.map((card, i) => (
                <div key={card.href}>
                  <Link href={card.href} className="group flex flex-col gap-3 py-6 hover:opacity-80 transition-opacity">
                    <PortadaGuia card={card} />
                    <p className="text-sm font-semibold" style={{ color: BLANCO }}>{card.titulo}</p>
                    <p className="label" style={{ color: BLANCO, opacity: 0.6, fontSize: '0.6rem' }}>PUNTO DE PARTIDA</p>
                  </Link>
                  {i === 0 && tarjetasJerga.length > 1 && (
                    <hr style={{ borderColor: 'rgba(255,255,255,0.15)', borderTopWidth: '1px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stack vertical */}
          <div className="flex flex-col gap-8 md:hidden">
            <p className="label" style={{ color: BLANCO, opacity: 0.6 }}>Metodología</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: BLANCO,
              fontWeight: 400,
              marginTop: '-1rem',
            }}>
              Cada ciclo deja un activo.
            </h2>
            <div className="flex flex-col gap-5">
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: BLANCO, opacity: 0.85, fontWeight: 300 }}>
                Capturamos señales, priorizamos oportunidades, producimos activos y usamos la respuesta del mercado para mejorar el siguiente ciclo.
              </p>
              <Link href="/metodologia"
                className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                EXPLORAR METODOLOGÍA ›
              </Link>
            </div>
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, paddingTop: '2rem' }}>
              {footerCols.map((col, i) => (
                <div key={i} className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-2">
                    <ShieldIcon />
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: BLANCO, textTransform: 'uppercase' }}>{col.titulo}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.7 }}>{col.desc}</p>
                  <Link href={col.href}
                    className="label inline-flex items-center gap-1 px-4 py-2 w-fit hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                    {col.cta}
                  </Link>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, paddingTop: '2rem' }} className="flex flex-col gap-8">
              {tarjetasJerga.map(card => (
                <Link key={card.href} href={card.href} className="group flex flex-col gap-3 hover:opacity-80 transition-opacity">
                  <PortadaGuia card={card} />
                  <p className="text-sm font-semibold" style={{ color: BLANCO }}>{card.titulo}</p>
                  <p className="label" style={{ color: BLANCO, opacity: 0.6, fontSize: '0.6rem' }}>PUNTO DE PARTIDA</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
