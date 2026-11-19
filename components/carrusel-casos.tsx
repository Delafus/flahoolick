'use client'

import { useRef, useState, type ReactNode } from 'react'

/** Carrusel de casos en la home: un caso a la vez, con flechas a los lados y circulitos abajo (lleno el actual, vacíos los demás).
    En el teléfono también se desliza con el dedo. Los casos llegan armados desde la página (`casos`), así esto solo mueve. */
export function CarruselCasos({ casos, nombres }: { casos: ReactNode[]; nombres: string[] }) {
  const [actual, setActual] = useState(0)
  const inicioToque = useRef<number | null>(null)
  const total = casos.length
  const ir = (i: number) => setActual((i + total) % total)

  const flecha = (direccion: -1 | 1) => (
    <button type="button" onClick={() => ir(actual + direccion)}
      aria-label={direccion < 0 ? 'Caso anterior' : 'Caso siguiente'}
      className="flex h-10 w-10 shrink-0 items-center justify-center transition-opacity hover:opacity-60">
      {/* Flecha sin palo: solo la punta. */}
      <svg aria-hidden width="14" height="24" viewBox="0 0 14 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d={direccion < 0 ? 'M12 2 L2 12 L12 22' : 'M2 2 L12 12 L2 22'} />
      </svg>
    </button>
  )

  return (
    <div className="flex w-full flex-col items-center gap-6" role="region" aria-roledescription="carrusel" aria-label="Historias de clientes">
      <div className="flex w-full items-center justify-center gap-2 md:gap-6">
        <div className="hidden md:block">{flecha(-1)}</div>
        <div className="grid w-full overflow-hidden" style={{ maxWidth: '44rem' }}
          onTouchStart={e => { inicioToque.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            if (inicioToque.current === null) return
            const dx = e.changedTouches[0].clientX - inicioToque.current
            inicioToque.current = null
            if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1))
          }}>
          {casos.map((caso, i) => (
            <div key={nombres[i]} aria-hidden={i !== actual} aria-roledescription="diapositiva" aria-label={`${i + 1} de ${total}: ${nombres[i]}`}
              className="flex flex-col items-center"
              style={{
                gridArea: '1 / 1',
                opacity: i === actual ? 1 : 0,
                transform: `translateX(${(i - actual) * 8}%)`,
                transition: 'opacity 450ms ease, transform 450ms cubic-bezier(0.2, 0.7, 0.2, 1), visibility 450ms',
                pointerEvents: i === actual ? 'auto' : 'none',
                visibility: i === actual ? 'visible' : 'hidden',
              }}>
              {caso}
            </div>
          ))}
        </div>
        <div className="hidden md:block">{flecha(1)}</div>
      </div>
      {/* Teléfono: las flechas van abajo, a los lados de los circulitos. */}
      <div className="flex items-center gap-3">
        <div className="md:hidden">{flecha(-1)}</div>
        <div className="flex items-center gap-3">
          {casos.map((_, i) => (
            <button key={nombres[i]} type="button" onClick={() => ir(i)} aria-label={`Ver caso ${nombres[i]}`} aria-current={i === actual}
              className="h-2.5 w-2.5 rounded-full transition-colors"
              style={{ border: '1px solid #ffffff', backgroundColor: i === actual ? '#ffffff' : 'transparent' }} />
          ))}
        </div>
        <div className="md:hidden">{flecha(1)}</div>
      </div>
    </div>
  )
}
