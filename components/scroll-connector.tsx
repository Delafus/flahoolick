'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollConnectorProps {
  color?: string
  /** Si se pasa junto con color, la mitad superior de los dots usa `color` y la inferior `colorTo`. */
  colorTo?: string
  height?: number
  /** Diámetro de cada dot, en px. */
  dotSize?: number
  dotCount?: number
}

/** Columna de dots (mismo lenguaje visual que FhFlow) que conecta el eje central con el
 *  módulo verde: aparece en cascada de arriba hacia abajo y se va apagando hacia el final,
 *  como si se fundiera en el color del módulo que viene. Sin línea sólida ni escudo. */
export function ScrollConnector({
  color = '#ffffff',
  colorTo,
  height = 160,
  dotSize = 13,
  dotCount = 9,
}: ScrollConnectorProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) setVisible(true)
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const dots = Array.from({ length: dotCount }, (_, i) => i)
  // Curva pareja: nace chico (continúa el tamaño con que termina el stream de FhFlow),
  // crece a un pico moderado antes de la mitad, y se derrite hacia el verde — sin salto
  // ni meseta de círculos grandes.
  const peakAt = 0.32

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-between" style={{ height: `${height}px`, padding: `${dotSize / 2}px 0` }}>
      {dots.map(i => {
        const t = dotCount > 1 ? i / (dotCount - 1) : 0
        const dotColor = t < 0.5 ? color : (colorTo ?? color)
        const rise = Math.min(1, t / peakAt)
        const fall = Math.max(0, 1 - Math.max(0, t - peakAt) / (1 - peakAt))
        const curve = Math.min(rise, fall)
        const scale = 0.3 + curve * 0.7
        const opacity = 0.22 + curve * 0.78
        return (
          <div
            key={i}
            style={{
              width: `${dotSize * scale}px`,
              height: `${dotSize * scale}px`,
              borderRadius: '50%',
              backgroundColor: dotColor,
              opacity: visible ? opacity : 0,
              transition: `opacity 0.45s ease ${0.05 * i}s`,
            }}
          />
        )
      })}
    </div>
  )
}
