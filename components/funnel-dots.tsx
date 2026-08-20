'use client'

import { useEffect, useRef } from 'react'
import { drawGlossySolid, type GlossySolidKind } from '@/components/canvas-glossy-solids'

const BASE_SIZE_RATIO = 0.014

interface Point {
  x: number
  y: number
}

interface RouteSpec {
  startX: number
  cp1X: number
  cp2X: number
  endX: number
  opacity: number
}

interface ShapePath {
  start: Point
  cp1: Point
  cp2: Point
  end: Point
  kind: GlossySolidKind
  t: number
  speed: number
  rotationX: number
  rotationY: number
  rotationZ: number
  spinX: number
  spinY: number
  spinZ: number
  lineOpacity: number
}

// Cuatro recorridos centrales se cruzan varias veces. Los tres exteriores
// acompañan el movimiento con curvas más serenas para conservar aire visual.
const ROUTES: RouteSpec[] = [
  { startX: 0.11, cp1X: 0.16, cp2X: 0.34, endX: 0.45, opacity: 0.11 },
  { startX: 0.27, cp1X: 0.60, cp2X: 0.22, endX: 0.48, opacity: 0.17 },
  { startX: 0.39, cp1X: 0.18, cp2X: 0.69, endX: 0.52, opacity: 0.14 },
  { startX: 0.51, cp1X: 0.79, cp2X: 0.31, endX: 0.47, opacity: 0.18 },
  { startX: 0.63, cp1X: 0.35, cp2X: 0.76, endX: 0.54, opacity: 0.15 },
  { startX: 0.77, cp1X: 0.76, cp2X: 0.63, endX: 0.55, opacity: 0.12 },
  { startX: 0.90, cp1X: 0.85, cp2X: 0.68, endX: 0.57, opacity: 0.10 },
]

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

/** Los sólidos del primer héroe reaparecen en circulación: siguen rutas curvas,
 *  cambian de dirección y convergen hacia la salida inferior. */
export function FunnelDots({ color = '#403D37' }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lineRgb = hexToRgb(color)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 1
    let height = 1
    let dpr = 1
    let shapes: ShapePath[] = []
    let frameId = 0
    let previousTime = performance.now()

    function createShape(index: number, staticPosition = false): ShapePath {
      const route = ROUTES[index]
      return {
        start: { x: width * route.startX, y: 0 },
        cp1: { x: width * route.cp1X, y: height * 0.29 },
        cp2: { x: width * route.cp2X, y: height * 0.66 },
        end: { x: width * route.endX, y: height * 0.95 },
        kind: index % 2 === 0 ? 'cube' : 'triangle',
        t: staticPosition ? 0.12 + index * 0.115 : randomRange(-1.35, -0.05),
        speed: randomRange(0.0028, 0.0062),
        rotationX: randomRange(-Math.PI, Math.PI),
        rotationY: randomRange(-Math.PI, Math.PI),
        rotationZ: randomRange(-Math.PI, Math.PI),
        spinX: randomRange(-0.018, 0.018),
        spinY: randomRange(-0.021, 0.021),
        spinZ: randomRange(-0.014, 0.014),
        lineOpacity: route.opacity,
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
      shapes = ROUTES.map((_, index) => createShape(index, reducedMotion))
      drawFrame(0, false)
    }

    function recycleShape(index: number) {
      const next = createShape(index)
      next.t = randomRange(-1.1, -0.15)
      shapes[index] = next
    }

    function drawFrame(step: number, advance: boolean) {
      ctx!.clearRect(0, 0, width, height)
      const baseSize = Math.max(2.5, width * BASE_SIZE_RATIO)

      shapes.forEach(shape => {
        ctx!.beginPath()
        ctx!.moveTo(shape.start.x, shape.start.y)
        ctx!.bezierCurveTo(shape.cp1.x, shape.cp1.y, shape.cp2.x, shape.cp2.y, shape.end.x, shape.end.y)
        ctx!.strokeStyle = `rgba(${lineRgb.r}, ${lineRgb.g}, ${lineRgb.b}, ${shape.lineOpacity})`
        ctx!.lineWidth = 1
        ctx!.stroke()
      })

      shapes.forEach((shape, index) => {
        if (advance) {
          shape.t += shape.speed * step
          shape.rotationX += shape.spinX * step
          shape.rotationY += shape.spinY * step
          shape.rotationZ += shape.spinZ * step
          if (shape.t > 1) recycleShape(index)
        }

        const activeShape = shapes[index]
        if (activeShape.t < 0 || activeShape.t > 1) return

        const position = bezierPoint(activeShape.t, activeShape.start, activeShape.cp1, activeShape.cp2, activeShape.end)
        const size = baseSize * (1 + activeShape.t * 0.55)
        let opacity = 0.92

        if (activeShape.t > 0.82) {
          opacity *= 1 - (activeShape.t - 0.82) / 0.18
        }

        drawGlossySolid(ctx!, {
          kind: activeShape.kind,
          x: position.x,
          y: position.y,
          size,
          rotationX: activeShape.rotationX,
          rotationY: activeShape.rotationY,
          rotationZ: activeShape.rotationZ,
          opacity: Math.max(0, opacity),
        })
      })
    }

    function animate(time: number) {
      const step = Math.min((time - previousTime) / (1000 / 60), 2)
      previousTime = time
      drawFrame(step, true)
      frameId = requestAnimationFrame(animate)
    }

    setup()
    if (!reducedMotion) frameId = requestAnimationFrame(animate)

    const resizeObserver = new ResizeObserver(setup)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(frameId)
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
