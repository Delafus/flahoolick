'use client'

import { useEffect, useRef } from 'react'

interface CirculationDotsProps {
  viewBoxSize?: number
  points?: { cx: number; cy: number; r: number }[]
  color?: string
  speed?: number
}

// Los 7 puntos grandes que ya forman la diagonal en dots-scroll-03.svg,
// de menor a mayor (del centro hacia la esquina superior derecha) — el
// barrido viaja del más chico al más grande, en un solo sentido.
const DEFAULT_POINTS = [
  { cx: 197.059, cy: 424.941, r: 10.74 },
  { cx: 262.168, cy: 359.832, r: 14.2 },
  { cx: 327.277, cy: 294.723, r: 16.97 },
  { cx: 392.386, cy: 229.613, r: 20.43 },
  { cx: 457.496, cy: 164.504, r: 23.9 },
  { cx: 522.605, cy: 99.395, r: 28.05 },
  { cx: 587.714, cy: 34.286, r: 34.286 },
]

export function CirculationDots({
  viewBoxSize = 622,
  points = DEFAULT_POINTS,
  color = '#EE3F4A',
  speed = 0.045,
}: CirculationDotsProps) {
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
    const maxIndex = points.length - 1
    // Pausa breve al final de cada pasada antes de reiniciar (en unidades de índice).
    const restPad = 1.2
    const cycleLength = maxIndex + restPad

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      time += speed
      // Barrido de un solo sentido, como el intermitente secuencial de un Audi:
      // avanza del índice 0 al último y vuelve a empezar de golpe, nunca retrocede.
      const travelPos = time % cycleLength

      points.forEach((pt, index) => {
        const distance = Math.abs(index - travelPos)
        const intensity = Math.max(0, 1 - distance * 0.9)
        if (intensity <= 0) return

        // smoothstep — crecimiento y apagado graduales, sin saltos de golpe.
        const eased = intensity * intensity * (3 - 2 * intensity)

        const x = pt.cx * scale
        const y = pt.cy * scale
        // El radio no crece más allá del tamaño real del punto estático, para
        // que nunca se salga del recuadro de la imagen (el más grande toca el borde).
        const r = pt.r * scale

        ctx!.beginPath()
        ctx!.shadowBlur = 18 * eased * scale
        ctx!.shadowColor = color
        ctx!.fillStyle = color
        ctx!.globalAlpha = eased
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
  }, [viewBoxSize, points, color, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
