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
  color = '#EE3F4A',
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

        const x = pt.cx * scale
        const y = pt.cy * scale
        const r = (baseRadius + baseRadius * 0.35 * intensity) * scale

        ctx!.beginPath()
        if (intensity > 0) {
          ctx!.shadowBlur = (4 + 16 * intensity) * scale
          ctx!.shadowColor = color
          ctx!.fillStyle = color
          ctx!.globalAlpha = 0.55 + 0.45 * intensity
        } else {
          ctx!.shadowBlur = 0
          ctx!.fillStyle = color
          ctx!.globalAlpha = 0
        }
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
