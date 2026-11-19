import { Boton, CABECERAS } from './minimal'
import { FontMix } from './font-mix'

/** Módulo "Cómo trabajamos" al final de cada etapa de la metodología, en la línea del "How We Work" de nobl.io:
    franja azul noche de borde a borde, titular grande centrado y tres columnas con línea, título, texto y botón. */

/** Azul noche de fondo con texto celeste (los colores de marca, invertidos). */
const FONDO = CABECERAS.hielo.texto
const TEXTO = CABECERAS.hielo.fondo

export interface Tarjeta {
  titulo: string
  texto: string
  href: string
  /** Ya no se usa (era el ícono de puntos); se mantiene opcional para no romper quien lo pase. */
  puntos?: number
}

export function ModuloOtrasEtapas({ tarjetas }: { tarjetas: Tarjeta[] }) {
  return (
    <section className="py-20 md:py-28"
      style={{
        backgroundColor: FONDO, color: TEXTO, boxShadow: `0 0 0 100vmax ${FONDO}`, clipPath: 'inset(0 -100vmax)',
        ['--tinta' as string]: TEXTO, ['--papel' as string]: FONDO,
      } as React.CSSProperties}>
      <h2 className="text-center" style={{ fontSize: 'clamp(2.75rem, 6.5vw, 6rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
        <FontMix bold="Cómo " italic="trabajamos." />
      </h2>
      <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
        {tarjetas.map(t => (
          <div key={t.href} className="flex flex-col gap-6 pt-10" style={{ borderTop: '1px solid rgba(225, 242, 240, 0.35)' }}>
            {/* Título en la letra de los títulos de etapa de la home (Bricolage 800). */}
            <h3 className="text-[1.5rem]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              {t.titulo}
            </h3>
            <p className="flex-1" style={{ opacity: 0.7 }}>{t.texto}</p>
            <Boton href={t.href}>Conocer más</Boton>
          </div>
        ))}
      </div>
    </section>
  )
}
