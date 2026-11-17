import { Boton, VERDE } from './minimal'
import { FontMix } from './font-mix'

/** Módulo "Cómo trabajamos" al final de cada etapa de la metodología, en la línea del "How We Work" de nobl.io:
    franja crema de borde a borde, titular grande centrado y tres columnas con línea, ícono, título, texto y botón. */

const CREMA = '#F9F0E2'

export interface Tarjeta {
  titulo: string
  texto: string
  href: string
  /** Cantidad de puntos verdes del ícono (1, 2 o 3); 9 dibuja la grilla completa. */
  puntos: number
}

/** Ícono plano de puntos: una grilla de 3×3 con algunos puntos encendidos en verde. */
function IconoPuntos({ puntos }: { puntos: number }) {
  const celdas = Array.from({ length: 9 }, (_, i) => i)
  const encendido = (i: number) => (puntos >= 9 ? true : i < puntos)
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" style={{ flexShrink: 0 }}>
      {celdas.map(i => (
        <circle key={i} cx={3 + (i % 3) * 8} cy={3 + Math.floor(i / 3) * 8} r={2.6}
          fill={encendido(i) ? VERDE : 'rgba(0,0,0,0.18)'} />
      ))}
    </svg>
  )
}

export function ModuloOtrasEtapas({ tarjetas }: { tarjetas: Tarjeta[] }) {
  return (
    <section className="py-20 md:py-28"
      style={{ backgroundColor: CREMA, color: '#000000', boxShadow: `0 0 0 100vmax ${CREMA}`, clipPath: 'inset(0 -100vmax)' }}>
      <h2 className="text-center" style={{ fontSize: 'clamp(2.75rem, 6.5vw, 6rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
        <FontMix bold="Cómo " italic="trabajamos." />
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
        {tarjetas.map(t => (
          <div key={t.href} className="flex flex-col gap-6 pt-10" style={{ borderTop: '1px solid rgba(0,0,0,0.35)' }}>
            <div className="flex items-center gap-4">
              <IconoPuntos puntos={t.puntos} />
              <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.03em', textTransform: 'uppercase', lineHeight: 1.2 }}>
                {t.titulo}
              </h3>
            </div>
            <p className="flex-1" style={{ opacity: 0.7 }}>{t.texto}</p>
            <Boton href={t.href}>Conocer más</Boton>
          </div>
        ))}
      </div>
    </section>
  )
}
