'use client'

import { useEffect, useRef } from 'react'

/**
 * Grilla pequeña (7x7) de cada franja de "Tres pasos" en Metodología. Port
 * fiel de flahoolick-metodologia-tres-microgrillas.html (entregado por
 * Felipe) — misma lógica find/order/circulate, mismos tiempos.
 */

const SIZE = 7
const LOOP_MS = 5600

const CLUSTERS = [
  [[0, 1], [1, 0], [1, 1], [2, 1]],
  [[2, 5], [3, 4], [3, 5], [3, 6]],
  [[5, 1], [5, 2], [6, 1], [6, 2]],
]

const ROWS = [1, 3, 5]

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function smooth(value: number) {
  const x = clamp(value)
  return x * x * (3 - 2 * x)
}

function gaussian(distance: number, spread = 0.75) {
  return Math.exp(-(distance * distance) / spread)
}

function key(row: number, col: number) {
  return row * SIZE + col
}

function baseline(values: Float32Array, time: number) {
  for (let row = 0; row < SIZE; row += 1) {
    for (let col = 0; col < SIZE; col += 1) {
      values[key(row, col)] = 0.075 + 0.018 * (0.5 + 0.5 * Math.sin(time * 0.001 + row * 0.7 + col * 0.5))
    }
  }
}

function find(values: Float32Array, progress: number) {
  CLUSTERS.forEach((cluster, clusterIndex) => {
    const start = 0.07 + clusterIndex * 0.17
    const wake = smooth((progress - start) / 0.15)
    const fade = 1 - smooth((progress - 0.80) / 0.18)
    cluster.forEach(([row, col], pointIndex) => {
      const pulse = 0.72 + 0.28 * Math.sin((progress * 3.2 - pointIndex * 0.08) * Math.PI * 2)
      values[key(row, col)] = Math.max(values[key(row, col)], wake * fade * pulse)
    })
  })
}

function order(values: Float32Array, progress: number) {
  ROWS.forEach((row, rowIndex) => {
    for (let col = 0; col < SIZE; col += 1) {
      const orderIndex = rowIndex * SIZE + col
      const reveal = smooth((progress * 1.38 - orderIndex / 26) / 0.24)
      const fade = 1 - smooth((progress - 0.86) / 0.13)
      values[key(row, col)] = Math.max(values[key(row, col)], reveal * fade * (0.62 + 0.06 * rowIndex))
    }
  })
}

function circulate(values: Float32Array, progress: number) {
  const fade = 1 - smooth((progress - 0.90) / 0.10)

  ROWS.forEach(row => {
    for (let col = 0; col < SIZE; col += 1) {
      values[key(row, col)] = Math.max(values[key(row, col)], 0.20 * fade)
    }
  })

  const head = progress * 10 - 1.2
  ROWS.forEach((row, rowIndex) => {
    for (let col = 0; col < SIZE; col += 1) {
      const delayedHead = head - rowIndex * 0.55
      const signal = gaussian(delayedHead - col, 0.62) * fade
      values[key(row, col)] = Math.max(values[key(row, col)], signal)
    }
  })
}

export type MicrogrillaKind = 'find' | 'order' | 'circulate'

export function MicrogrillaMetodologia({ kind, color = '#000000' }: { kind: MicrogrillaKind; color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const contenedor = canvas.parentElement
    if (!contenedor) return

    const m = color.replace('#', '')
    const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16)
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cssSize = 0
    let visible = true
    let raf = 0

    function resize() {
      const bounds = contenedor!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cssSize = Math.max(1, bounds.width)
      canvas!.width = Math.round(cssSize * dpr)
      canvas!.height = Math.round(cssSize * dpr)
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(time: number) {
      const values = new Float32Array(SIZE * SIZE)
      const progress = reducedMotion.matches ? 0.68 : (time % LOOP_MS) / LOOP_MS
      baseline(values, time)

      if (kind === 'find') find(values, progress)
      if (kind === 'order') order(values, progress)
      if (kind === 'circulate') circulate(values, progress)

      const padding = cssSize * 0.035
      const usable = cssSize - padding * 2
      const step = usable / (SIZE - 1)
      const radius = Math.max(1.3, cssSize * 0.0122)

      context!.clearRect(0, 0, cssSize, cssSize)

      for (let row = 0; row < SIZE; row += 1) {
        for (let col = 0; col < SIZE; col += 1) {
          const intensity = clamp(values[key(row, col)])
          const x = padding + col * step
          const y = padding + row * step
          const dotRadius = radius * (1 + smooth(intensity) * 0.22)

          context!.beginPath()
          context!.arc(x, y, dotRadius, 0, Math.PI * 2)
          context!.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.10 + intensity * 0.90})`
          context!.fill()
        }
      }
    }

    function frame(time: number) {
      if (visible) draw(time)
      if (!reducedMotion.matches) raf = requestAnimationFrame(frame)
    }

    resize()

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    }, { threshold: 0.05 })
    observer.observe(canvas)

    const ro = new ResizeObserver(resize)
    ro.observe(contenedor)

    if (reducedMotion.matches) {
      draw(performance.now())
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      ro.disconnect()
    }
  }, [kind, color])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', background: 'transparent' }} />
    </div>
  )
}
