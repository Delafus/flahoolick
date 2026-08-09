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
  /** 'shield' dibuja el escudo de Flahoolick en vez del punto circular, al mismo ancho que dotSize. */
  dotShape?: 'circle' | 'shield'
}

const SHIELD_W = 186.178
const SHIELD_H = 194.15
const SHIELD_D = 'M262,647.911C262,596.499 303.677,556.939 355.089,556.939C406.501,556.939 448.178,596.499 448.178,647.911L448.178,751.089L262,751.089L262,647.911Z'

export function ScrollConnector({
  color = '#ffffff',
  colorTo,
  height = 160,
  thickness = 2,
  dotSize = 13,
  dotShape = 'circle',
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

  const lineHeight = height * 0.78

  // La línea (78% del alto) y el punto van centrados como bloque dentro del
  // contenedor, así que el punto medio de la LÍNEA no coincide con el centro
  // real del contenedor (el punto ocupa espacio debajo). Cuando hay dos
  // colores, el corte debe calzar exactamente con el centro del contenedor
  // (ahí es donde el fondo rojo/amarillo se parte a la mitad detrás), no con
  // el 50% de la línea misma.
  const topOffset = (height - (lineHeight + dotSize)) / 2
  const splitPercent = ((height / 2 - topOffset) / lineHeight) * 100

  const lineBackground = colorTo
    ? `linear-gradient(to bottom, ${color} ${splitPercent}%, ${colorTo} ${splitPercent}%)`
    : color

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center" style={{ height: `${height}px` }}>
      <div
        style={{
          width: `${thickness}px`,
          height: `${lineHeight}px`,
          background: lineBackground,
          // El clip-path se anima en vez del alto, para que la línea se
          // "desenmascare" de arriba hacia abajo (como si el scroll la
          // fuera dibujando), en vez de crecer desde el centro.
          clipPath: visible ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: 'clip-path 1.1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      {dotShape === 'shield' ? (
        <svg
          width={dotSize}
          height={dotSize * (SHIELD_H / SHIELD_W)}
          viewBox={`0 0 ${SHIELD_W} ${SHIELD_H}`}
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.8s' }}
        >
          <path fill={colorTo ?? color} d={SHIELD_D} transform={`translate(0,${SHIELD_H}) scale(1,-1) translate(-262,-556.939)`} />
        </svg>
      ) : (
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
      )}
    </div>
  )
}
