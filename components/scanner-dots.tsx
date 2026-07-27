'use client'

import { useEffect, useRef } from 'react'

interface ScannerDotsProps {
  /** Ancho/alto del SVG original (viewBox cuadrado) sobre el que se calculan las posiciones. */
  viewBoxSize?: number
  /** Centros (en unidades del viewBox) de los puntos que viajan con el brillo, en orden. */
  points?: { cx: number; cy: number }[]
  /** Radio base de cada punto, en unidades del viewBox (debe calzar con el del SVG estático). */
  baseRadius?: number
  color?: string
  speed?: number
}

const DEFAULT_POINTS = [
  { cx: 345.5, cy: 17.5 },
  { cx: 413.5, cy: 17.5 },
  { cx: 482.5, cy: 17.5 },
  { cx: 551.5, cy: 17.5 },
  { cx: 620.5, cy: 17.5 },
]

export function ScannerDots({
  viewBoxSize = 638,
  points = DEFAULT_POINTS,
  baseRadius = 17.5,
  color = '#ffffff',
  speed = 0.03,
}: ScannerDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId: number
    let width = 0
    let height = 0
    let scale = 1

    // Estos 5 puntos ya tocan el borde superior exacto del recuadro en el
    // arte original (cy - r = 0) — al crecer, el círculo se corta contra ese
    // borde. Se le da al canvas un colchón extra por arriba (fuera del
    // recuadro de la imagen) para que el crecimiento tenga espacio real.
    const topPadding = 50

    function setup() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      scale = width / viewBoxSize
    }

    let time = 0

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      time += speed
      const scannerPosition = 2 + Math.sin(time) * 2

      points.forEach((pt, index) => {
        const distance = Math.abs(index - scannerPosition)
        const intensity = Math.max(0, 1 - distance * 1.2)

        if (intensity <= 0) return

        const x = pt.cx * scale
        const y = topPadding + pt.cy * scale
        // Curva lineal (sin smoothstep) y crecimiento marcado, tal como el
        // sandbox HTML5 de referencia: el punto casi triplica su tamaño
        // en el pico del barrido.
        const r = baseRadius * (1 + 1.667 * intensity) * scale

        ctx!.beginPath()
        ctx!.shadowBlur = (8 + 24 * intensity) * scale
        ctx!.shadowColor = color
        ctx!.fillStyle = color
        ctx!.globalAlpha = 0.4 + 0.6 * intensity
        ctx!.arc(x, y, r, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.closePath()
        ctx!.shadowBlur = 0
        ctx!.globalAlpha = 1
      })

      frameId = requestAnimationFrame(animate)
    }

    setup()
    animate()

    const onResize = () => setup()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
    }
  }, [viewBoxSize, points, baseRadius, color, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-50px',
        left: 0,
        right: 0,
        width: '100%',
        height: 'calc(100% + 50px)',
        pointerEvents: 'none',
      }}
    />
  )
}
