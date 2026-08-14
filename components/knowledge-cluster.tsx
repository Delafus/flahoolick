'use client'

import { useEffect, useRef } from 'react'

interface KnowledgeClusterProps {
  /** Diámetro del círculo madre (el borde nítido), como % del wrapper. */
  diameterPercent?: number
  color?: string
  /** Color de fondo detrás del círculo — debe calzar con el fondo real de
   *  la sección para que no se note ningún recuadro. */
  bgColor?: string
}

/** Tamaños de bolita como fracción del radio de la ventana — puerto directo
 *  de las proporciones del prototipo del usuario (16/26/44 sobre radio 150). */
const SIZE_FRACS = [16 / 150, 26 / 150, 44 / 150]
const MAX_DOTS = 48
const SPAWN_INTERVAL = 8

// Constantes de movimiento tuneadas para un canvas de referencia de 500px —
// se escalan según el tamaño real del contenedor para que el movimiento se
// sienta igual en el círculo chico de mobile y en el grande de desktop.
const REF_WIDTH = 500
const GRAVITY_REF = 0.42
const BOUNCE = 0.85
const FRICTION = 0.985

interface DotPhysics {
  x: number; y: number; vx: number; vy: number
  radius: number
  isFrozen: boolean
  stillFrames: number
  prevX: number; prevY: number
}

/** Bolitas que caen y se apilan dentro de una ventana circular — física real
 *  con gravedad, rebote y colisión, hasta asentarse (congelarse) cuando su
 *  desplazamiento por frame cae bajo el umbral. Puerto del prototipo canvas
 *  del usuario ("Conocimiento Atrapado"), adaptado a tamaño responsive. */
export function KnowledgeCluster({ diameterPercent = 64, color = '#000000', bgColor = '#D8D8D7' }: KnowledgeClusterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let scale = 1
    let windowRadius = 0
    let frameId: number
    let frame = 0
    let dots: DotPhysics[] = []

    function spawnDot() {
      const count = dots.length
      let sizeType: number
      if (count === 6 || count === 14 || count === 22) sizeType = 2
      else if (count % 2 === 0) sizeType = 1
      else sizeType = 0

      const radius = windowRadius * SIZE_FRACS[sizeType]
      const cx = width / 2
      const cy = height / 2
      dots.push({
        x: cx + (Math.random() - 0.5) * (windowRadius * 1.2),
        y: cy - windowRadius - 100 * scale,
        vx: (Math.random() - 0.5) * 4 * scale,
        vy: (Math.random() * 3 + 5) * scale,
        radius,
        isFrozen: false,
        stillFrames: 0,
        prevX: 0,
        prevY: 0,
      })
    }

    function updateDot(d: DotPhysics) {
      if (d.isFrozen) return
      d.vy += GRAVITY_REF * scale
      d.vx *= FRICTION
      d.vy *= FRICTION
      d.x += d.vx
      d.y += d.vy

      const distMoved = Math.hypot(d.x - d.prevX, d.y - d.prevY)
      d.prevX = d.x
      d.prevY = d.y

      if (distMoved < 0.35 * scale) {
        d.stillFrames++
        if (d.stillFrames > 10) {
          d.isFrozen = true
          d.vx = 0
          d.vy = 0
        }
      } else {
        d.stillFrames = 0
      }
    }

    function constrainToWindow(d: DotPhysics) {
      if (d.isFrozen) return
      const cx = width / 2
      const cy = height / 2
      const dx = d.x - cx
      const dy = d.y - cy
      const dist = Math.hypot(dx, dy)

      let maxDist = windowRadius - d.radius
      if (d.y < cy) maxDist = windowRadius + d.radius * 0.3

      if (dist > maxDist) {
        const nx = dx / dist
        const ny = dy / dist
        d.x = cx + nx * maxDist
        d.y = cy + ny * maxDist
        const dot = d.vx * nx + d.vy * ny
        if (dot > 0) {
          d.vx -= (1 + BOUNCE) * dot * nx
          d.vy -= (1 + BOUNCE) * dot * ny
        }
      }
    }

    function resolveCollisions() {
      for (let k = 0; k < 4; k++) {
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const d1 = dots[i]
            const d2 = dots[j]
            if (d1.isFrozen && d2.isFrozen) continue

            const dx = d2.x - d1.x
            const dy = d2.y - d1.y
            const dist = Math.hypot(dx, dy)
            const minDist = d1.radius + d2.radius

            if (dist < minDist && dist > 0) {
              const overlap = minDist - dist
              const nx = dx / dist
              const ny = dy / dist

              if (d1.isFrozen) {
                d2.x += nx * overlap * 0.3
                d2.y += ny * overlap * 0.3
                const p = nx * d2.vx + ny * d2.vy
                if (p < 0) {
                  d2.vx -= (1 + BOUNCE) * p * nx * 0.5
                  d2.vy -= (1 + BOUNCE) * p * ny * 0.5
                }
              } else if (d2.isFrozen) {
                d1.x -= nx * overlap * 0.3
                d1.y -= ny * overlap * 0.3
                const p = nx * d1.vx + ny * d1.vy
                if (p > 0) {
                  d1.vx -= (1 + BOUNCE) * p * nx * 0.5
                  d1.vy -= (1 + BOUNCE) * p * ny * 0.5
                }
              } else {
                d1.x -= nx * overlap * 0.3
                d1.y -= ny * overlap * 0.3
                d2.x += nx * overlap * 0.3
                d2.y += ny * overlap * 0.3

                const p = nx * (d1.vx - d2.vx) + ny * (d1.vy - d2.vy)
                if (p > 0) {
                  const impulse = p * BOUNCE
                  d1.vx -= impulse * nx * 0.5
                  d1.vy -= impulse * ny * 0.5
                  d2.vx += impulse * nx * 0.5
                  d2.vy += impulse * ny * 0.5
                }
              }
            }
          }
        }
        dots.forEach(constrainToWindow)
      }
    }

    function setup() {
      if (!canvas) return
      dots = []
      frame = 0
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      scale = width / REF_WIDTH
      windowRadius = width / 2 - 1
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      frame++
      ctx!.clearRect(0, 0, width, height)
      ctx!.fillStyle = bgColor
      ctx!.fillRect(0, 0, width, height)

      if (frame % SPAWN_INTERVAL === 0 && dots.length < MAX_DOTS) spawnDot()

      dots.forEach(updateDot)
      resolveCollisions()

      dots.forEach(d => {
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx!.fillStyle = color
        ctx!.fill()
      })

      frameId = requestAnimationFrame(draw)
    }

    setup()
    frameId = requestAnimationFrame(draw)

    const resizeObserver = new ResizeObserver(setup)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [color, bgColor])

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
      {/* Ventana circular — el clip lo hace este div (overflow:hidden +
          border-radius:50%), el canvas dibuja un cuadrado exacto adentro. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${diameterPercent}%`,
          aspectRatio: '1/1',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
      {/* Borde nítido, siempre por encima. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${diameterPercent}%`,
          aspectRatio: '1/1',
          transform: 'translate(-50%, -50%)',
          border: `1.2px solid ${color}`,
          borderRadius: '50%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
