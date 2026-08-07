'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface AcordeonItem {
  titulo: string
  desc: string
  href: string
}

interface AcordeonSeccionProps {
  eyebrow: string
  titulo: React.ReactNode
  /** Párrafo opcional bajo el titular. */
  bajada?: string
  /** Si no se pasa, el acordeón ocupa una sola columna centrada. */
  illustration?: { src: string; alt: string }
  /**
   * Alternativa a `illustration` para contenido que reacciona al acordeón:
   * recibe el índice abierto (-1 si están todos cerrados). Pensado para
   * montar aquí una animación que cambie de estado según la etapa.
   */
  renderIllustration?: (abierto: number) => React.ReactNode
  items: AcordeonItem[]
  /** Texto del botón que aparece al abrir cada item. */
  ctaLabel: string
  /** Botón de la sección completa, bajo el acordeón. */
  cta?: { label: string; href: string }
  /** true (default) = fondo oscuro/texto claro. false = fondo claro/texto oscuro (el bg lo pone el wrapper). */
  dark?: boolean
  /** Color de fondo del wrapper — solo se usa para calzar el color de los botones invertidos. */
  bgColor?: string
}

/**
 * Sección negra con titular centrado + acordeón. Se usa tanto en el módulo
 * de servicios ("Cómo trabajamos") como en el de capacidades ("En qué nos
 * especializamos"), para que compartan exactamente el mismo diseño.
 */
export function AcordeonSeccion({
  eyebrow,
  titulo,
  bajada,
  illustration,
  renderIllustration,
  items,
  ctaLabel,
  cta,
  dark = true,
  bgColor,
}: AcordeonSeccionProps) {
  const [abierto, setAbierto] = useState(0)
  const texto = dark ? '#ffffff' : '#000000'
  const borde = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)'
  const botonBg = texto
  const botonTexto = bgColor ?? (dark ? '#000000' : '#ffffff')

  const acordeon = (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={i} style={{ borderTop: `1px solid ${borde}` }}>
          <button
            onClick={() => setAbierto(abierto === i ? -1 : i)}
            className="w-full flex items-center justify-between py-5 text-left"
            style={{ cursor: 'pointer' }}
          >
            <span className="label font-bold" style={{ color: texto, fontSize: '1rem', letterSpacing: '0.03em' }}>{item.titulo}</span>
            <span style={{
              color: texto,
              fontSize: '1.2rem',
              lineHeight: 1,
              transition: 'transform 0.3s ease',
              display: 'inline-block',
              transform: abierto === i ? 'rotate(45deg)' : 'rotate(0deg)',
            }}>+</span>
          </button>
          {/* Animación con max-height */}
          <div style={{
            maxHeight: abierto === i ? '300px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.35s ease, opacity 0.3s ease',
            opacity: abierto === i ? 1 : 0,
          }}>
            <div className="pb-6 flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: texto, opacity: 0.8 }}>{item.desc}</p>
              <Link href={item.href}
                className="label inline-flex items-center px-4 py-2.5 w-fit hover:opacity-80 transition-opacity"
                style={{ backgroundColor: botonBg, color: botonTexto, fontSize: '0.65rem', borderRadius: '999px' }}>
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      ))}
      {cta && (
        <>
          <div style={{ borderTop: `1px solid ${borde}` }} />
          <Link href={cta.href}
            className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit mt-8 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: botonBg, color: botonTexto, fontSize: '0.65rem', borderRadius: '999px' }}>
            {cta.label}
          </Link>
        </>
      )}
    </div>
  )

  return (
    <section className="page-px section-py">
      <div className="max-container flex flex-col items-center text-center gap-6">
        <p className="label" style={{ color: texto, fontSize: '1rem' }}>{eyebrow}</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.75rem, 7vw, 9rem)',
          lineHeight: 0.92,
          color: texto,
          fontWeight: 400,
          textAlign: 'center',
        }}>
          {titulo}
        </h2>
        {bajada && (
          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.35rem)',
            lineHeight: 1.6,
            color: texto,
            opacity: 0.75,
            fontWeight: 300,
            maxWidth: '46rem',
          }}>
            {bajada}
          </p>
        )}
      </div>

      <div className="h-16 md:h-[200px]" />

      {illustration || renderIllustration ? (
        <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Sticky solo para ilustraciones dinámicas (ej. GrillaProceso): así
              se ven mientras se scrollea el acordeón. Las ilustraciones
              estáticas (ej. iconos) no tienen fondo propio, así que sticky
              haría que el texto del acordeón se les pase por encima y se
              vuelva ilegible. */}
          <div style={renderIllustration ? { position: 'sticky', top: '80px' } : undefined}>
            <div className="w-[80%] md:w-[56%]" style={{ position: 'relative', aspectRatio: '1/1', margin: '0 auto' }}>
              {renderIllustration
                ? renderIllustration(abierto)
                : illustration && <Image src={illustration.src} alt={illustration.alt} fill style={{ objectFit: 'contain' }} />}
            </div>
          </div>
          {acordeon}
        </div>
      ) : (
        <div className="max-container">
          <div style={{ maxWidth: '52rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {acordeon}
          </div>
        </div>
      )}
    </section>
  )
}
