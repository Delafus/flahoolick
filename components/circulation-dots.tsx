'use client'

import { useEffect, useRef } from 'react'

interface CirculationDotsProps {
  viewBoxSize?: number
  points?: { cx: number; cy: number }[]
  baseRadius?: number
  color?: string
  speed?: number
}

// Los 10 puntos de la diagonal (de la esquina inferior izquierda a la
// superior derecha) en la nueva grilla 10x10 de dots-scroll-03.svg. A
// diferencia de la versión anterior, acá todos los puntos son del mismo
// tamaño en el arte estático — el barrido es el que los hace crecer y
// cambiar de color, en un solo sentido, del más chico (sin crecimiento)
// al más grande (crecimiento máximo).
const DEFAULT_POINTS = [
  { cx: 1.732, cy: 587.714 },
  { cx: 66.841, cy: 522.605 },
  { cx: 131.95, cy: 457.495 },
  { cx: 197.059, cy: 392.386 },
  { cx: 262.168, cy: 327.278 },
  { cx: 327.278, cy: 262.168 },
  { cx: 392.386, cy: 197.059 },
  { cx: 457.495, cy: 131.95 },
  { cx: 522.605, cy: 66.841 },
  { cx: 587.714, cy: 1.732 },
]

function hexToRgb(hex: string) {
  const m = hex.replace('#', '')
  const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function CirculationDots({
  viewBoxSize = 590,
  points = DEFAULT_POINTS,
  baseRadius = 1.732,
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

    // El punto final de la diagonal (el que más crece) toca la esquina
    // superior derecha exacta del recuadro — se le da al canvas un colchón
    // extra hacia arriba y hacia la derecha para que el crecimiento tenga
    // espacio real sin cortarse contra el borde.
    const EXTRA = 30

    function setup() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      scale = (width - EXTRA) / viewBoxSize
    }

    const maxIndex = points.length - 1
    const targetRgb = hexToRgb(color)
    // La onda entra y sale de la fila fuera de rango (-2 → maxIndex+3) antes
    // de reiniciar, para que el barrido tenga "colchón" de entrada/salida en
    // vez de rebotar de golpe — la inercia que pide el sandbox de referencia.
    const entryBuffer = 2
    const exitBuffer = 3
    let wavePosition = -entryBuffer
    const waveWidth = 1.8

    // Crecimiento proporcional: el primer punto no crece nada, el último
    // llega a su tamaño máximo — igual que el sandbox de referencia.
    const maxTargetRadius = baseRadius * 7
    const totalGrowthAvailable = maxTargetRadius - baseRadius

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
        const y = EXTRA + pt.cy * scale

        const myMaxGrowth = totalGrowthAvailable * progressRatio
        const r = (baseRadius + myMaxGrowth * intensity) * scale

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
  }, [viewBoxSize, points, baseRadius, color, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-30px',
        left: 0,
        width: 'calc(100% + 30px)',
        height: 'calc(100% + 30px)',
        pointerEvents: 'none',
      }}
    />
  )
}
