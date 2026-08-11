'use client'

import { useEffect, useRef } from 'react'

const TOTAL_DOTS = 10
const BASE_RADIUS_RATIO = 0.014 // relativo al ancho del canvas

interface Point { x: number; y: number }

interface DotPath {
  start: Point
  cp1: Point
  cp2: Point
  end: Point
  t: number
  speed: number
}

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function bezierPoint(t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point {
  const mt = 1 - t
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  }
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const num = parseInt(clean, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

/** 10 dots que bajan por líneas distintas y convergen en un embudo, difuminándose al llegar
 *  al final — puerto del prototipo canvas del usuario, adaptado a tamaño responsivo. */
export function FunnelDots({ color = '#403D37' }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rgb = hexToRgb(color)

    let width = 1
    let height = 1
    let dpr = 1
    let dots: DotPath[] = []
    let raf = 0

    function randomizeDot(index: number): DotPath {
      const startX = width * (0.1 + index * (0.8 / (TOTAL_DOTS - 1)))
      const endPoint = { x: width / 2, y: height * 0.94 }
      return {
        start: { x: startX, y: 0 },
        cp1: { x: startX, y: height * 0.5 },
        cp2: { x: width / 2, y: height * 0.74 },
        end: endPoint,
        t: randomRange(-1.5, 0),
        speed: randomRange(0.0025, 0.008),
      }
    }

    function setup() {
      const rect = canvas!.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = Array.from({ length: TOTAL_DOTS }, (_, i) => randomizeDot(i))
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      const baseRadius = Math.max(1.5, width * BASE_RADIUS_RATIO)

      dots.forEach((dot, i) => {
        // Línea guía sutil de fondo
        ctx!.beginPath()
        ctx!.moveTo(dot.start.x, dot.start.y)
        ctx!.bezierCurveTo(dot.cp1.x, dot.cp1.y, dot.cp2.x, dot.cp2.y, dot.end.x, dot.end.y)
        ctx!.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`
        ctx!.lineWidth = 1
        ctx!.stroke()

        dot.t += dot.speed
        if (dot.t > 1) dots[i] = randomizeDot(i)

        if (dot.t >= 0) {
          const pos = bezierPoint(dot.t, dot.start, dot.cp1, dot.cp2, dot.end)
          let opacity = 0.85
          let radius = baseRadius

          // En el último 20% del camino se funde y encoge hasta desaparecer.
          if (dot.t > 0.8) {
            const fade = (dot.t - 0.8) / 0.2
            opacity = 0.85 * (1 - fade)
            radius = baseRadius * (1 - fade)
          }

          if (radius > 0.3) {
            ctx!.beginPath()
            ctx!.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
            ctx!.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
            ctx!.fill()
          }
        }
      })

      raf = requestAnimationFrame(draw)
    }

    setup()
    draw()

    const resizeObserver = new ResizeObserver(setup)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  )
}
