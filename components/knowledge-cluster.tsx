'use client'

import { useEffect, useRef } from 'react'

interface KnowledgeClusterProps {
  /** Diámetro del radar, como % del ancho del wrapper cuadrado que lo envuelve. */
  diameterPercent?: number
  color?: string
}

/** Aros de radar naciendo del centro, expandiéndose y desvaneciéndose antes de
 *  llegar al borde — nunca "salen" del círculo negro. Sin relleno, solo trazo. */
export function KnowledgeCluster({ diameterPercent = 80, color = '#F1EEE7' }: KnowledgeClusterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId: number
    let width = 0
    let height = 0
    let containerRadius = 0

    interface Ring { start: number; duration: number }
    let rings: Ring[] = []
    const MAX_RINGS = 3

    function setup() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      containerRadius = width / 2
      rings = [{ start: 0, duration: 2600 }]
    }

    function animate(now: number) {
      ctx!.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2

      if (rings.length < MAX_RINGS && Math.random() < 0.02) {
        rings.push({ start: now, duration: 2200 + Math.random() * 1400 })
      }

      rings = rings.filter(r => now - r.start < r.duration)
      rings.forEach(r => {
        const progress = (now - r.start) / r.duration
        const radius = progress * containerRadius
        const opacity = (1 - progress) * 0.85
        if (opacity > 0.01 && radius > 0.5) {
          ctx!.beginPath()
          ctx!.arc(cx, cy, radius, 0, Math.PI * 2)
          ctx!.strokeStyle = color
          ctx!.lineWidth = 1.5
          ctx!.globalAlpha = opacity
          ctx!.stroke()
        }
      })
      ctx!.globalAlpha = 1
      frameId = requestAnimationFrame(animate)
    }

    setup()
    frameId = requestAnimationFrame((t0) => {
      rings = [{ start: t0, duration: 2600 }]
      animate(t0)
    })

    const onResize = () => setup()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
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
