'use client'

import { useEffect, useRef } from 'react'

/**
 * Header de /servicios. Port fiel de flahoolick-pulso-01-circulacion-blanco.html
 * (entregado por Felipe) — misma grilla, mismos tiempos, mismo dibujo. Solo cambia
 * el contenedor: de <div class="led-grid"> a un componente React montado en el
 * illustrationNode del hero.
 */

const ROWS = 10
const COLS = 10
const LOOP_MS = 8000

// Medidas de la grilla real de la home: SVG 622 x 622.
const SOURCE_SIZE = 622
const SOURCE_RADIUS = 1.82725
const SOURCE_STEP = 68.7
const SOURCE_FIRST_CENTER = 1.82725

const DOT_RGB = '255, 255, 255'

const RING = [
  [3, 3], [3, 4], [3, 5], [3, 6],
  [4, 6], [5, 6], [6, 6],
  [6, 5], [6, 4], [6, 3],
  [5, 3], [4, 3],
]

const SIGNAL_PATHS = [
  [[0, 1], [1, 1], [2, 1], [3, 1], [3, 2], [3, 3]],
  [[1, 9], [1, 8], [2, 8], [3, 8], [3, 7], [3, 6]],
  [[9, 8], [8, 8], [7, 8], [6, 8], [6, 7], [6, 6]],
  [[8, 0], [8, 1], [7, 1], [6, 1], [6, 2], [6, 3]],
]

const SPOKES = [
  [[2, 3], [1, 3], [0, 3]],
  [[3, 7], [3, 8], [3, 9]],
  [[7, 6], [8, 6], [9, 6]],
  [[6, 2], [6, 1], [6, 0]],
]

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function smoothstep(value: number) {
  const x = clamp(value)
  return x * x * (3 - 2 * x)
}

function gaussian(distance: number, spread: number) {
  return Math.exp(-(distance * distance) / spread)
}

function key(row: number, col: number) {
  return row * COLS + col
}

function intensities(time: number) {
  const values = new Float32Array(ROWS * COLS)
  const loop = (time % LOOP_MS) / LOOP_MS

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const phase = time * 0.0014 + row * 0.73 + col * 0.47
      values[key(row, col)] = 0.028 + 0.02 * (0.5 + 0.5 * Math.sin(phase))
    }
  }

  if (loop < 0.25) {
    const local = loop / 0.25
    SIGNAL_PATHS.forEach((path, pathIndex) => {
      const head = local * (path.length + 3) - pathIndex * 0.7
      path.forEach(([row, col], index) => {
        const pulse = gaussian(head - index - 0.2, 0.85)
        const point = key(row, col)
        values[point] = Math.max(values[point], pulse)
      })
    })
  } else if (loop < 0.46) {
    const local = (loop - 0.25) / 0.21
    RING.forEach(([row, col], index) => {
      const reveal = smoothstep(local * 1.35 - (index / RING.length) * 0.55)
      const point = key(row, col)
      values[point] = Math.max(values[point], 0.15 + reveal * 0.72)
    })
    ;[[3, 3], [3, 6], [6, 6], [6, 3]].forEach(([row, col]) => {
      const point = key(row, col)
      values[point] = Math.max(values[point], smoothstep(local))
    })
  } else if (loop < 0.79) {
    const local = (loop - 0.46) / 0.33

    RING.forEach(([row, col]) => {
      const point = key(row, col)
      values[point] = Math.max(values[point], 0.27)
    })
    ;[0, 0.5].forEach(offset => {
      const head = ((local * 2 + offset) % 1) * RING.length
      RING.forEach(([row, col], index) => {
        const rawDistance = Math.abs(index - head)
        const distance = Math.min(rawDistance, RING.length - rawDistance)
        const pulse = gaussian(distance, 1.45)
        const point = key(row, col)
        values[point] = Math.max(values[point], 0.32 + pulse * 0.68)
      })
    })

    const beat = (local * 4) % 1
    SPOKES.forEach((spoke, spokeIndex) => {
      const shifted = (beat - spokeIndex * 0.13 + 1) % 1
      const head = shifted * (spoke.length + 1)
      spoke.forEach(([row, col], index) => {
        const pulse = gaussian(head - index, 0.42) * 0.82
        const point = key(row, col)
        values[point] = Math.max(values[point], pulse)
      })
    })
  } else {
    const local = (loop - 0.79) / 0.21
    const radius = smoothstep(local) * 7.3
    const fade = 1 - smoothstep((local - 0.68) / 0.32)

    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const distance = Math.hypot(row - 4.5, col - 4.5)
        const wave = gaussian(distance - radius, 0.36)
        const inner = distance < radius ? 0.17 : 0
        const point = key(row, col)
        values[point] = Math.max(values[point], (wave + inner) * fade)
      }
    }
  }

  return values
}

export function PulsoCirculacion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const gridElement = canvas.parentElement
    if (!gridElement) return

    let cssSize = 360
    let deviceScale = 1
    let animationFrame = 0
    let startTime = performance.now()
    let visible = true

    function resize() {
      const bounds = gridElement!.getBoundingClientRect()
      cssSize = Math.max(1, bounds.width)
      deviceScale = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(cssSize * deviceScale)
      canvas!.height = Math.round(cssSize * deviceScale)
      context!.setTransform(deviceScale, 0, 0, deviceScale, 0, 0)
    }

    function draw(time: number) {
      const values = intensities(time)
      const scale = cssSize / SOURCE_SIZE
      const baseRadius = SOURCE_RADIUS * scale
      const step = SOURCE_STEP * scale
      const firstCenter = SOURCE_FIRST_CENTER * scale

      context!.clearRect(0, 0, cssSize, cssSize)

      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const intensity = clamp(values[key(row, col)])
          const eased = smoothstep(intensity)
          const x = firstCenter + col * step
          const y = firstCenter + row * step
          const radius = baseRadius * (1 + eased * 0.38)

          if (intensity > 0.12) {
            context!.save()
            context!.beginPath()
            context!.arc(x, y, radius * (2.8 + eased * 2.4), 0, Math.PI * 2)
            context!.fillStyle = `rgba(255, 255, 255, ${0.025 + eased * 0.09})`
            context!.shadowColor = `rgba(255, 255, 255, ${0.12 + eased * 0.36})`
            context!.shadowBlur = 7 * scale + eased * 11 * scale
            context!.fill()
            context!.restore()
          }

          context!.beginPath()
          context!.arc(x, y, radius, 0, Math.PI * 2)
          context!.fillStyle = `rgba(${DOT_RGB}, ${0.20 + eased * 0.80})`
          context!.fill()
        }
      }
    }

    function animate(now: number) {
      draw(now - startTime)
      if (visible) animationFrame = requestAnimationFrame(animate)
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    function start() {
      cancelAnimationFrame(animationFrame)
      if (reducedMotion.matches) {
        draw(3600)
        return
      }
      startTime = performance.now()
      animationFrame = requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden
      if (visible) start()
      else cancelAnimationFrame(animationFrame)
    }, { threshold: 0.05 })

    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now() - startTime)
    })
    ro.observe(gridElement)

    function onVisibilityChange() {
      visible = !document.hidden
      if (visible) start()
      else cancelAnimationFrame(animationFrame)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', start)

    observer.observe(gridElement)
    resize()
    start()

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      reducedMotion.removeEventListener('change', start)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
      <div style={{ width: '100%', aspectRatio: '1', position: 'relative' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </div>
  )
}
