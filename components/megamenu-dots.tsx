'use client'

import { useEffect, useRef } from 'react'

interface MegamenuDotsProps {
  /** Color base de los puntos — normalmente el mismo `text` del header, para que siempre contraste poco contra el fondo. */
  color?: string
  /** Solo anima mientras el megamenú está abierto. */
  active: boolean
}

const SPACING = 32
const DOT_RADIUS = 1.3
const MAX_ALPHA = 0.18

function hexToRgb(hex: string) {
  const m = hex.replace('#', '')
  const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/**
 * Paño de fondo del megamenú: una grilla de puntos que titila muy suave,
 * casi imperceptible. Mismo motivo visual de las grillas del resto del
 * sitio, pero acá solo de telón de fondo.
 */
export function MegamenuDots({ color = '#ffffff', active }: MegamenuDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    const contenedor = canvas?.parentElement
    if (!canvas || !contenedor) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rgb = hexToRgb(color)
    let frameId: number
    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let particulas: { fase: number; vel: number }[] = []

    function setup() {
      const rect = contenedor!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.max(1, Math.floor(width / SPACING))
      rows = Math.max(1, Math.floor(height / SPACING))
      particulas = Array.from({ length: cols * rows }, () => ({
        fase: Math.random() * Math.PI * 2,
        vel: 0.4 + Math.random() * 0.5,
      }))
    }

    function animate(now: number) {
      ctx!.clearRect(0, 0, width, height)
      const marginX = (width - (cols - 1) * SPACING) / 2
      const marginY = (height - (rows - 1) * SPACING) / 2
      const t = now * 0.001

      let i = 0
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = particulas[i++]
          const brillo = 0.5 + 0.5 * Math.sin(t * p.vel + p.fase)
          const x = marginX + col * SPACING
          const y = marginY + row * SPACING

          ctx!.beginPath()
          ctx!.arc(x, y, DOT_RADIUS, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${brillo * MAX_ALPHA})`
          ctx!.fill()
        }
      }

      frameId = requestAnimationFrame(animate)
    }

    setup()
    frameId = requestAnimationFrame(animate)

    const ro = new ResizeObserver(setup)
    ro.observe(contenedor)

    return () => {
      cancelAnimationFrame(frameId)
      ro.disconnect()
    }
  }, [color, active])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
