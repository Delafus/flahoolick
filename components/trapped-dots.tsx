'use client'

import { useEffect, useRef } from 'react'

interface TrappedDotsProps {
  /** Diámetro del círculo contenedor, como % del ancho del wrapper cuadrado que lo envuelve. */
  diameterPercent?: number
  dotCount?: number
  dotColor?: string
  /** Si se pasa, dibuja estos iconos (rutas SVG) en vez de puntos de color — cíclico si hay más dots que iconos. */
  icons?: string[]
  /** Lado del cuadrado de cada icono, en px. */
  iconSize?: number
  /** Multiplicador de velocidad. Los iconos necesitan ir más lento que los puntos para poder leerse. */
  speedFactor?: number
}

export function TrappedDots({ diameterPercent = 44.8, dotCount = 20, dotColor = '#EE3F4A', icons, iconSize = 26, speedFactor = 1 }: TrappedDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId: number
    let cancelled = false
    let width = 0
    let height = 0
    let containerRadius = 0
    let dotRadius = 3

    interface Dot { x: number; y: number; vx: number; vy: number; icon?: HTMLImageElement }
    let dots: Dot[] = []

    function setup(loadedIcons: HTMLImageElement[]) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      containerRadius = width / 2
      // Tamaño fijo para que se note bien, sin escalar con el contenedor.
      dotRadius = loadedIcons.length ? iconSize / 2 : 3

      dots = []
      for (let i = 0; i < dotCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = Math.random() * (containerRadius - dotRadius * 4)
        const speed = width * (3 / 160) * speedFactor
        const a2 = Math.random() * Math.PI * 2
        dots.push({
          x: width / 2 + Math.cos(angle) * r,
          y: height / 2 + Math.sin(angle) * r,
          vx: Math.cos(a2) * speed,
          vy: Math.sin(a2) * speed,
          icon: loadedIcons.length ? loadedIcons[i % loadedIcons.length] : undefined,
        })
      }
    }

    function handleCollisions() {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001
          const minDist = dotRadius * 2
          if (dist < minDist) {
            const overlap = minDist - dist
            const nx = dx / dist
            const ny = dy / dist
            a.x -= nx * (overlap / 2)
            a.y -= ny * (overlap / 2)
            b.x += nx * (overlap / 2)
            b.y += ny * (overlap / 2)
            const kx = a.vx - b.vx
            const ky = a.vy - b.vy
            const p = nx * kx + ny * ky
            a.vx -= p * nx
            a.vy -= p * ny
            b.vx += p * nx
            b.vy += p * ny
          }
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      handleCollisions()

      const cx = width / 2
      const cy = height / 2

      dots.forEach(dot => {
        dot.x += dot.vx
        dot.y += dot.vy

        const dx = dot.x - cx
        const dy = dot.y - cy
        const distanceToCenter = Math.sqrt(dx * dx + dy * dy)

        if (distanceToCenter + dotRadius > containerRadius) {
          const nx = dx / distanceToCenter
          const ny = dy / distanceToCenter
          dot.x = cx + nx * (containerRadius - dotRadius)
          dot.y = cy + ny * (containerRadius - dotRadius)
          const dotProduct = dot.vx * nx + dot.vy * ny
          dot.vx = dot.vx - 2 * dotProduct * nx
          dot.vy = dot.vy - 2 * dotProduct * ny
        }

        if (dot.icon) {
          ctx!.drawImage(dot.icon, dot.x - iconSize / 2, dot.y - iconSize / 2, iconSize, iconSize)
        } else {
          ctx!.beginPath()
          ctx!.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2)
          ctx!.fillStyle = dotColor
          ctx!.fill()
          ctx!.closePath()
        }
      })

      frameId = requestAnimationFrame(animate)
    }

    if (icons && icons.length) {
      Promise.all(
        icons.map(
          src =>
            new Promise<HTMLImageElement>(resolve => {
              const img = new Image()
              img.onload = () => resolve(img)
              img.src = src
            }),
        ),
      ).then(loadedIcons => {
        if (cancelled) return
        setup(loadedIcons)
        animate()
      })
    } else {
      setup([])
      animate()
    }

    const onResize = () => setup(dots.map(d => d.icon).filter((i): i is HTMLImageElement => !!i))
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
    }
  }, [dotCount, dotColor, icons, iconSize, speedFactor])

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
