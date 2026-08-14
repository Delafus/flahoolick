'use client'

import { useEffect, useRef } from 'react'

interface KnowledgeClusterProps {
  /** Diámetro del radar, como % del ancho del wrapper cuadrado que lo envuelve. */
  diameterPercent?: number
  color?: string
}

/** Radar controlado por scroll: un disco sólido crece parejo desde el centro
 *  a medida que el círculo cruza el viewport, y se encoge si vuelves hacia
 *  arriba. El progreso se ata a la posición del propio círculo en pantalla,
 *  no al scroll de toda la página. */
export function KnowledgeCluster({ diameterPercent = 80, color = '#F1EEE7' }: KnowledgeClusterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0
    let radarRadius = 0
    let ticking = false

    function setup() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      centerX = width / 2
      centerY = height / 2
      radarRadius = width / 2
    }

    // 0 cuando el centro del círculo está en la base del viewport (recién
    // entrando), 1 cuando está en la parte superior (a punto de salir).
    function progresoScroll() {
      if (!canvas) return 0
      const rect = canvas.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const vh = window.innerHeight
      const raw = 1 - elementCenter / vh
      return Math.max(0, Math.min(1, raw))
    }

    function draw() {
      const progreso = progresoScroll()

      ctx!.clearRect(0, 0, width, height)

      // Borde del radar — grosor suficiente para que no pixele en los
      // 4 puntos cardinales (un stroke de 1px exacto genera ese artefacto).
      const borderWidth = Math.max(1.5, radarRadius * 0.012)
      ctx!.beginPath()
      ctx!.arc(centerX, centerY, radarRadius - borderWidth / 2, 0, Math.PI * 2)
      ctx!.lineWidth = borderWidth
      ctx!.strokeStyle = color
      ctx!.stroke()

      // Relleno progresivo: un disco sólido que crece parejo con el scroll,
      // sin huecos ni aros que "pasan" — a mayor progreso, más cubierto.
      const filledRadius = progreso * radarRadius
      if (filledRadius > 0.5) {
        ctx!.beginPath()
        ctx!.arc(centerX, centerY, Math.min(filledRadius, radarRadius), 0, Math.PI * 2)
        ctx!.fillStyle = color
        ctx!.fill()
      }

      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(draw)
      }
    }

    setup()
    draw()

    window.addEventListener('scroll', onScroll, { passive: true })

    const resizeObserver = new ResizeObserver(() => {
      setup()
      draw()
    })
    resizeObserver.observe(canvas)

    return () => {
      window.removeEventListener('scroll', onScroll)
      resizeObserver.disconnect()
    }
  }, [color])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${diameterPercent}%`,
        aspectRatio: '1/1',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
