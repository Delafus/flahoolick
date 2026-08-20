'use client'

import { useEffect, useRef } from 'react'
import { drawGlossySolid, type GlossySolidKind } from '@/components/canvas-glossy-solids'

interface Point3D {
  x: number
  y: number
  z: number
}

interface Solid3D extends Point3D {
  vx: number
  vy: number
  vz: number
  r: number
  kind: GlossySolidKind
  rotationX: number
  rotationY: number
  rotationZ: number
  spinX: number
  spinY: number
  spinZ: number
}

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
] as const

export function CollisionCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId = 0
    let width = 0
    let height = 0
    let half = 0
    let perspective = 0
    let angleX = 0
    let angleY = 0
    let rotationVelocityX = 0.005
    let rotationVelocityY = 0.01
    let dragging = false
    let pointerId: number | null = null
    let lastPointerX = 0
    let lastPointerY = 0
    let previousTime = performance.now()
    let solids: Solid3D[] = []
    let vertices: Point3D[] = []

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function setup() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const scale = Math.min(rect.width, rect.height) / 600

      width = rect.width
      height = rect.height
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      half = 120 * scale
      perspective = 400 * scale

      vertices = [
        { x: -half, y: -half, z: -half }, { x: half, y: -half, z: -half },
        { x: half, y: half, z: -half }, { x: -half, y: half, z: -half },
        { x: -half, y: -half, z: half }, { x: half, y: -half, z: half },
        { x: half, y: half, z: half }, { x: -half, y: half, z: half },
      ]

      solids = [
        {
          kind: 'cube', x: -40 * scale, y: -20 * scale, z: 10 * scale,
          vx: 2.2 * scale, vy: 1.7 * scale, vz: 1.9 * scale, r: 17 * scale,
          rotationX: 0.4, rotationY: 0.7, rotationZ: 0.15,
          spinX: 0.012, spinY: 0.018, spinZ: 0.008,
        },
        {
          kind: 'triangle', x: 40 * scale, y: 30 * scale, z: -20 * scale,
          vx: -1.8 * scale, vy: 2.1 * scale, vz: -1.5 * scale, r: 18 * scale,
          rotationX: -0.25, rotationY: 0.35, rotationZ: -0.15,
          spinX: -0.014, spinY: 0.011, spinZ: -0.01,
        },
      ]

      draw()
    }

    function rotate(point: Point3D): Point3D {
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)
      const y = point.y * cosX - point.z * sinX
      const zAfterX = point.z * cosX + point.y * sinX
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)

      return {
        x: point.x * cosY + zAfterX * sinY,
        y,
        z: zAfterX * cosY - point.x * sinY,
      }
    }

    function project(point: Point3D) {
      const factor = perspective / (perspective + point.z)
      return {
        x: point.x * factor + width / 2,
        y: point.y * factor + height / 2,
        z: point.z,
        factor,
      }
    }

    function updateSolids(step: number) {
      solids.forEach(solid => {
        solid.x += solid.vx * step
        solid.y += solid.vy * step
        solid.z += solid.vz * step
        solid.rotationX += solid.spinX * step
        solid.rotationY += solid.spinY * step
        solid.rotationZ += solid.spinZ * step

        if (solid.x - solid.r < -half || solid.x + solid.r > half) {
          solid.vx *= -1
          solid.x = Math.max(-half + solid.r, Math.min(half - solid.r, solid.x))
        }
        if (solid.y - solid.r < -half || solid.y + solid.r > half) {
          solid.vy *= -1
          solid.y = Math.max(-half + solid.r, Math.min(half - solid.r, solid.y))
        }
        if (solid.z - solid.r < -half || solid.z + solid.r > half) {
          solid.vz *= -1
          solid.z = Math.max(-half + solid.r, Math.min(half - solid.r, solid.z))
        }
      })

      const first = solids[0]
      const second = solids[1]
      const dx = second.x - first.x
      const dy = second.y - first.y
      const dz = second.z - first.z
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001
      const minimumDistance = first.r + second.r

      if (distance < minimumDistance) {
        const velocity = { x: first.vx, y: first.vy, z: first.vz }
        first.vx = second.vx
        first.vy = second.vy
        first.vz = second.vz
        second.vx = velocity.x
        second.vy = velocity.y
        second.vz = velocity.z

        const overlap = (minimumDistance - distance) / 2
        const separateX = (dx / distance) * overlap
        const separateY = (dy / distance) * overlap
        const separateZ = (dz / distance) * overlap
        first.x -= separateX
        first.y -= separateY
        first.z -= separateZ
        second.x += separateX
        second.y += separateY
        second.z += separateZ
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      const projectedVertices = vertices.map(vertex => project(rotate(vertex)))
      const renderItems: Array<
        | { type: 'line'; start: (typeof projectedVertices)[number]; end: (typeof projectedVertices)[number]; z: number }
        | {
          type: 'solid'; kind: GlossySolidKind; x: number; y: number; size: number; z: number
          rotationX: number; rotationY: number; rotationZ: number
        }
      > = []

      EDGES.forEach(([startIndex, endIndex]) => {
        const start = projectedVertices[startIndex]
        const end = projectedVertices[endIndex]
        renderItems.push({ type: 'line', start, end, z: (start.z + end.z) / 2 })
      })

      solids.forEach(solid => {
        const rotated = rotate(solid)
        const projected = project(rotated)
        renderItems.push({
          type: 'solid',
          kind: solid.kind,
          x: projected.x,
          y: projected.y,
          size: Math.max(0.1, solid.r * projected.factor),
          z: projected.z,
          rotationX: solid.rotationX + angleX,
          rotationY: solid.rotationY + angleY,
          rotationZ: solid.rotationZ,
        })
      })

      renderItems.sort((a, b) => b.z - a.z)

      renderItems.forEach(item => {
        if (item.type === 'line') {
          ctx!.beginPath()
          ctx!.moveTo(item.start.x, item.start.y)
          ctx!.lineTo(item.end.x, item.end.y)
          ctx!.strokeStyle = 'rgba(0, 0, 0, 0.25)'
          ctx!.lineWidth = 1
          ctx!.stroke()
          return
        }

        drawGlossySolid(ctx!, {
          kind: item.kind,
          x: item.x,
          y: item.y,
          size: item.size,
          rotationX: item.rotationX,
          rotationY: item.rotationY,
          rotationZ: item.rotationZ,
        })
      })
    }

    function animate(time: number) {
      const step = Math.min((time - previousTime) / (1000 / 60), 2)
      previousTime = time

      if (!dragging) {
        const friction = Math.pow(0.98, step)
        rotationVelocityX *= friction
        rotationVelocityY *= friction
        angleX += rotationVelocityX * step
        angleY += rotationVelocityY * step
      }

      updateSolids(step)
      draw()
      frameId = requestAnimationFrame(animate)
    }

    function onPointerDown(event: PointerEvent) {
      dragging = true
      pointerId = event.pointerId
      lastPointerX = event.clientX
      lastPointerY = event.clientY
      canvas!.setPointerCapture(event.pointerId)
      canvas!.style.cursor = 'grabbing'
    }

    function onPointerMove(event: PointerEvent) {
      if (!dragging || event.pointerId !== pointerId) return

      const deltaX = event.clientX - lastPointerX
      const deltaY = event.clientY - lastPointerY
      rotationVelocityY = deltaX * 0.005
      rotationVelocityX = -deltaY * 0.005
      angleY += rotationVelocityY
      angleX += rotationVelocityX
      lastPointerX = event.clientX
      lastPointerY = event.clientY
      draw()
    }

    function endDrag(event: PointerEvent) {
      if (event.pointerId !== pointerId) return
      dragging = false
      pointerId = null
      canvas!.style.cursor = 'grab'
    }

    setup()

    if (!reducedMotion) {
      frameId = requestAnimationFrame(animate)
      canvas.addEventListener('pointerdown', onPointerDown)
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerup', endDrag)
      canvas.addEventListener('pointercancel', endDrag)
    }

    window.addEventListener('resize', setup)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', setup)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', endDrag)
      canvas.removeEventListener('pointercancel', endDrag)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        cursor: 'grab',
        display: 'block',
        height: '100%',
        touchAction: 'pan-y',
        width: '100%',
      }}
    />
  )
}
