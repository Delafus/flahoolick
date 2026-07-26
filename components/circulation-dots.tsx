'use client'

import { useEffect, useRef } from 'react'

interface CirculationDotsProps {
  viewBoxSize?: number
  points?: { cx: number; cy: number; r: number }[]
  color?: string
  speed?: number
}

// Los 7 puntos grandes que ya forman la diagonal en dots-scroll-03.svg,
// de mayor a menor (de la esquina superior derecha hacia el centro).
const DEFAULT_POINTS = [
  { cx: 587.714, cy: 34.286, r: 34.286 },
  { cx: 522.605, cy: 99.395, r: 28.05 },
  { cx: 457.496, cy: 164.504, r: 23.9 },
  { cx: 392.386, cy: 229.613, r: 20.43 },
  { cx: 327.277, cy: 294.723, r: 16.97 },
  { cx: 262.168, cy: 359.832, r: 14.2 },
  { cx: 197.059, cy: 424.941, r: 10.74 },
]

export function CirculationDots({
  viewBoxSize = 622,
  points = DEFAULT_POINTS,
  color = '#EE3F4A',
  speed = 0.03,
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

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      time += speed
      // Recorre 0 → maxIndex → 0 en bucle, igual de suave que el escáner del hero 2.
      const travelPos = (maxIndex / 2) + Math.sin(time) * (maxIndex / 2)

      points.forEach((pt, index) => {
        const distance = Math.abs(index - travelPos)
        const intensity = Math.max(0, 1 - distance * 0.9)

        if (intensity <= 0) return

        const x = pt.cx * scale
        const y = pt.cy * scale
        const r = pt.r * scale * (1 + 0.12 * intensity)

        ctx!.beginPath()
        ctx!.shadowBlur = (6 + 18 * intensity) * scale
        ctx!.shadowColor = color
        ctx!.fillStyle = color
        ctx!.globalAlpha = 0.5 + 0.5 * intensity
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
