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

function hexToRgb(hex: string) {
  const m = hex.replace('#', '')
  const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function CirculationDots({
  viewBoxSize = 622,
  points = DEFAULT_POINTS,
  color = '#F5FD92',
  speed = 0.05,
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

    const maxIndex = points.length - 1
    const targetRgb = hexToRgb(color)
    // La onda entra y sale de la fila fuera de rango (-2 → maxIndex+2) antes
    // de reiniciar, para que el barrido tenga "colchón" de entrada/salida en
    // vez de rebotar de golpe — la inercia que pide el sandbox de referencia.
    const entryBuffer = 2
    const exitBuffer = 2
    let wavePosition = -entryBuffer
    const waveWidth = 1.8

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      wavePosition += speed
      if (wavePosition > maxIndex + exitBuffer) wavePosition = -entryBuffer

      points.forEach((pt, index) => {
        const distance = Math.abs(index - wavePosition)
        if (distance >= waveWidth) return

        // Suavizado armónico (coseno) — transición de entrada/salida más
        // fluida que una rampa lineal.
        const intensity = Math.cos((distance / waveWidth) * (Math.PI / 2))

        const progressRatio = index / maxIndex
        const x = pt.cx * scale
        const y = pt.cy * scale
        // El radio no crece más allá del tamaño real del punto estático, para
        // que nunca se salga del recuadro de la imagen (el más grande toca el borde).
        const r = pt.r * scale

        // Transición de blanco (color de reposo del punto estático) a la
        // tonalidad de acento, a medida que la onda lo activa.
        const cr = Math.round(255 + (targetRgb.r - 255) * intensity)
        const cg = Math.round(255 + (targetRgb.g - 255) * intensity)
        const cb = Math.round(255 + (targetRgb.b - 255) * intensity)
        const fill = `rgb(${cr}, ${cg}, ${cb})`

        ctx!.beginPath()
        ctx!.shadowBlur = (4 + 8 * progressRatio) * intensity * scale
        ctx!.shadowColor = color
        ctx!.fillStyle = fill
        ctx!.arc(x, y, r, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.closePath()
        ctx!.shadowBlur = 0
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
