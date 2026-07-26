'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollConnectorProps {
  color?: string
  /** Si se pasa junto con colorTo, la línea cambia de color exactamente a la mitad. */
  colorTo?: string
  height?: number
  /** Grosor de la línea, en px. */
  thickness?: number
  /** Diámetro del punto final, en px. */
  dotSize?: number
}

export function ScrollConnector({
  color = '#ffffff',
  colorTo,
  height = 160,
  thickness = 2,
  dotSize = 13,
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

  const lineBackground = colorTo
    ? `linear-gradient(to bottom, ${color} 50%, ${colorTo} 50%)`
    : color

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center" style={{ height: `${height}px` }}>
      <div
        style={{
          width: `${thickness}px`,
          height: visible ? `${height * 0.78}px` : '0px',
          background: lineBackground,
          transition: 'height 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <div
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: '50%',
          backgroundColor: colorTo ?? color,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease 0.8s',
        }}
      />
    </div>
  )
}
