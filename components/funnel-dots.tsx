'use client'

import { useEffect, useRef } from 'react'
import { drawGlossySolid, type GlossySolidKind } from '@/components/canvas-glossy-solids'

const VIEWBOX_WIDTH = 1324
const VIEWBOX_HEIGHT = 1882
const BASE_SIZE_RATIO = 0.014

// El archivo contiene nueve <path>, pero visualmente forman seis recorridos.
// Los segmentos que nacen a mitad de altura se unen aquí con su línea superior.
const MOTION_PATHS = [
  'M1.5041 3C1.50384 906.593 1.5 -104.721 1.5 730.65C1.5 847.198 1.49797 847.198 87.9971 847.198C140.186 847.198 164 847.198 207 847.198C250 847.198 246.75 870.65 246.75 943.65C246.75 979.65 246.75 999.65 246.75 1050.65V1826.5',
  'M246.653 51C246.653 280.09 246.651 280.09 333.042 280.09C385.166 280.09 408.951 280.09 451.897 280.09C494.843 280.09 491.597 326.187 491.597 469.678C491.597 540.441 491.597 579.753 491.597 680V1860',
  'M491.5 13C491.5 999.534 491.5 654.347 491.5 1860',
  'M735.5 13L735.803 873.65C735.803 1777.24 735.807 285.281 735.807 1120.65C735.807 1237.2 735.809 1237.2 649.31 1237.2C597.12 1237.2 573.307 1237.2 530.307 1237.2C487.307 1237.2 490.556 1260.65 490.556 1333.65C490.556 1369.65 490.556 1389.65 490.556 1440.65V1826.5',
  'M868.5 0C868.5 903.593 868.5 -236.371 868.5 599C868.5 715.548 889.002 715.548 974.5 715.548C1026.69 715.548 991 715.548 1034 715.548C1077 715.548 1073.75 739 1073.75 812C1073.75 848 1073.75 868 1073.75 919V1737.5',
  'M1076.5 13L1076.5 1058.65C1076.5 1962.24 1076.5 470.281 1076.5 1305.65C1076.5 1422.2 1076.5 1422.2 1163 1422.2C1215.19 1422.2 1239 1422.2 1282 1422.2C1325 1422.2 1321.75 1445.65 1321.75 1518.65C1321.75 1554.65 1321.75 1574.65 1321.75 1625.65V1881.65',
]

interface FallingSolid {
  pathIndex: number
  kind: GlossySolidKind
  t: number
  speed: number
  rotationX: number
  rotationY: number
  rotationZ: number
  spinX: number
  spinY: number
  spinZ: number
}

interface MotionPoint {
  x: number
  y: number
  distance: number
}

interface MotionGeometry {
  points: MotionPoint[]
  length: number
}

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function createDistributedPhases(count: number) {
  const phases = Array.from({ length: count }, (_, index) => (
    (index + 0.5) / count + randomRange(-0.035, 0.035)
  ))

  for (let index = phases.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = phases[index]
    phases[index] = phases[swapIndex]
    phases[swapIndex] = current
  }

  return phases
}

function buildDescendingGeometry(pathData: string): MotionGeometry {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', pathData)
  const sourceLength = path.getTotalLength()
  const points: MotionPoint[] = []
  let greatestY = Number.NEGATIVE_INFINITY
  let distance = 0

  for (let index = 0; index <= 1200; index += 1) {
    const point = path.getPointAtLength(sourceLength * (index / 1200))
    if (point.y < greatestY - 0.5) continue

    const y = Math.max(greatestY, point.y)
    const previous = points[points.length - 1]
    if (previous) {
      const segmentLength = Math.hypot(point.x - previous.x, y - previous.y)
      if (segmentLength < 0.05) continue
      distance += segmentLength
    }

    points.push({ x: point.x, y, distance })
    greatestY = y
  }

  return { points, length: distance }
}

function pointOnGeometry(geometry: MotionGeometry, progress: number) {
  const target = geometry.length * progress
  let low = 0
  let high = geometry.points.length - 1

  while (low < high) {
    const middle = Math.floor((low + high) / 2)
    if (geometry.points[middle].distance < target) low = middle + 1
    else high = middle
  }

  const next = geometry.points[low]
  const previous = geometry.points[Math.max(0, low - 1)]
  const segmentLength = next.distance - previous.distance
  const segmentProgress = segmentLength > 0 ? (target - previous.distance) / segmentLength : 0

  return {
    x: previous.x + (next.x - previous.x) * segmentProgress,
    y: previous.y + (next.y - previous.y) * segmentProgress,
  }
}

/** Usa las rutas exactas del SVG LINEAS-hero3 como guía para los sólidos. */
export function FunnelDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const geometries = MOTION_PATHS.map(buildDescendingGeometry)
    const initialPhases = createDistributedPhases(MOTION_PATHS.length)

    let width = 1
    let height = 1
    let scale = 1
    let offsetX = 0
    let offsetY = 0
    let frameId = 0
    let previousTime = performance.now()
    let solids: FallingSolid[] = []

    function createSolid(index: number, progress = initialPhases[index]): FallingSolid {
      const kind: GlossySolidKind = index % 2 === 0 ? 'cube' : 'triangle'

      return {
        pathIndex: index,
        kind,
        t: progress,
        speed: 0.0046,
        rotationX: kind === 'triangle' ? -0.35 : -0.5,
        rotationY: kind === 'triangle' ? 0.55 : 0.65,
        rotationZ: randomRange(-Math.PI, Math.PI),
        spinX: 0,
        spinY: 0,
        spinZ: randomRange(-0.012, 0.012),
      }
    }

    function setup() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      scale = Math.min(width / VIEWBOX_WIDTH, height / VIEWBOX_HEIGHT)
      offsetX = (width - VIEWBOX_WIDTH * scale) / 2
      offsetY = (height - VIEWBOX_HEIGHT * scale) / 2
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      solids = MOTION_PATHS.map((_, index) => createSolid(index))
      drawFrame(0, false)
    }

    function recycleSolid(index: number, overflow: number) {
      solids[index] = createSolid(index, overflow)
    }

    function drawFrame(step: number, advance: boolean) {
      ctx!.clearRect(0, 0, width, height)
      const baseSize = Math.max(2.75, width * BASE_SIZE_RATIO)

      solids.forEach((solid, index) => {
        if (advance) {
          solid.t += solid.speed * step
          solid.rotationX += solid.spinX * step
          solid.rotationY += solid.spinY * step
          solid.rotationZ += solid.spinZ * step
          if (solid.t > 1) recycleSolid(index, solid.t - 1)
        }

        const activeSolid = solids[index]

        const geometry = geometries[activeSolid.pathIndex]
        const point = pointOnGeometry(geometry, activeSolid.t)
        const x = offsetX + point.x * scale
        const y = offsetY + point.y * scale
        const size = activeSolid.kind === 'triangle' ? baseSize * 2.05 : baseSize * 1.65
        let opacity = 0.94

        if (activeSolid.t > 0.84) {
          opacity *= 1 - (activeSolid.t - 0.84) / 0.16
        }

        drawGlossySolid(ctx!, {
          kind: activeSolid.kind,
          x,
          y,
          size,
          rotationX: activeSolid.rotationX,
          rotationY: activeSolid.rotationY,
          rotationZ: activeSolid.rotationZ,
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
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        backgroundImage: "url('/lineas-hero3.svg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        inset: 0,
        position: 'absolute',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block', height: '100%', width: '100%' }} />
    </div>
  )
}
