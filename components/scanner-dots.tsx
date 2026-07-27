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

// Las 5 últimas columnas de la primera fila (r===0, c>=5) en la nueva
// grilla 10x10 de dots-scroll-02.svg — todos del mismo tamaño chico en el
// arte estático, igual que en dots-scroll-03.svg.
const DEFAULT_POINTS = [
  { cx: 345.342, cy: 1.827 },
  { cx: 414.044, cy: 1.827 },
  { cx: 482.747, cy: 1.827 },
  { cx: 551.451, cy: 1.827 },
  { cx: 620.173, cy: 1.827 },
]

export function ScannerDots({
  viewBoxSize = 622,
  points = DEFAULT_POINTS,
  baseRadius = 1.827,
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

    // El primer punto toca el borde superior exacto del recuadro (cy - r = 0)
    // y el último toca también el borde derecho exacto (cx + r = viewBoxSize)
    // — al crecer, el círculo se corta contra esos bordes. Se le da al canvas
    // un colchón extra arriba y a la derecha para que el crecimiento tenga
    // espacio real. El ancho del canvas SÍ se agranda por ese colchón, así
    // que la escala debe descontarlo para no desalinear la grilla con la
    // imagen estática de abajo.
    const PAD = 20

    function setup() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      scale = Math.max(0, width - PAD) / viewBoxSize
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
        const y = PAD + pt.cy * scale
        // Curva lineal (sin smoothstep), igual que el sandbox de referencia:
        // el punto casi triplica su tamaño en el pico del barrido.
        const r = baseRadius * (1 + 1.667 * intensity) * scale

        ctx!.beginPath()
        ctx!.shadowBlur = (4 + 12 * intensity) * scale
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
        top: '-20px',
        left: 0,
        width: 'calc(100% + 20px)',
        height: 'calc(100% + 20px)',
        pointerEvents: 'none',
      }}
    />
  )
}
