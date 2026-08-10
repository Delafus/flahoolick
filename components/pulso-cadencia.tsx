'use client'

import { useEffect, useRef } from 'react'

/**
 * Header de /servicios/produccion-de-contenido. Port fiel de
 * flahoolick-pulso-04-cadencia-transparente.html (entregado por Felipe) —
 * misma grilla, mismos tiempos, mismo dibujo. Dots negros, fondo transparente.
 */

const ROWS = 10
const COLS = 10
const LOOP_MS = 9600

// Proporciones de la matriz original de la home.
const SOURCE_SIZE = 622
const SOURCE_RADIUS = 1.82725
const SOURCE_STEP = 68.7
const SOURCE_FIRST_CENTER = 1.82725
const DOT_RGB = '0, 0, 0'

const CORE = [
  [4, 4], [4, 5],
  [5, 4], [5, 5],
]

// Cuatro líneas editoriales salen del mismo sistema con ritmos constantes.
const LANES = [
  [[4, 4], [3, 3], [2, 2], [1, 1], [0, 0]],
  [[4, 5], [3, 6], [2, 7], [1, 8], [0, 9]],
  [[5, 4], [6, 3], [7, 2], [8, 1], [9, 0]],
  [[5, 5], [6, 6], [7, 7], [8, 8], [9, 9]],
]

// Piezas publicadas: formatos distintos construidos con el mismo lenguaje.
const OUTPUTS = [
  [[0, 0], [0, 1], [1, 0], [1, 1]],
  [[0, 8], [0, 9], [1, 9], [2, 9]],
  [[7, 0], [8, 0], [9, 0], [9, 1]],
  [[8, 8], [8, 9], [9, 8], [9, 9]],
]

const BEATS = [0.08, 0.30, 0.52, 0.74]

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

function setMax(values: Float32Array, row: number, col: number, intensity: number) {
  const point = key(row, col)
  values[point] = Math.max(values[point], intensity)
}

function beatAt(loop: number, center: number, width = 0.022) {
  let distance = Math.abs(loop - center)
  distance = Math.min(distance, 1 - distance)
  return gaussian(distance, width * width)
}

function pulsePath(values: Float32Array, path: number[][], head: number, strength = 1) {
  path.forEach(([row, col], index) => {
    const primary = gaussian(head - index, 0.26)
    const tail = gaussian(head - index - 1.15, 0.68) * 0.24
    setMax(values, row, col, (primary + tail) * strength)
  })
}

function revealOutput(values: Float32Array, output: number[][], amount: number, beat: number, strength = 1) {
  output.forEach(([row, col], index) => {
    const delay = index * 0.07
    const reveal = smoothstep(amount * 1.28 - delay)
    setMax(values, row, col, reveal * (0.34 + beat * 0.66) * strength)
  })
}

function intensities(time: number) {
  const values = new Float32Array(ROWS * COLS)
  const loop = (time % LOOP_MS) / LOOP_MS

  // Presencia mínima de los 100 dots.
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const phase = time * 0.00082 + row * 0.47 + col * 0.59
      values[key(row, col)] = 0.034 + 0.011 * (0.5 + 0.5 * Math.sin(phase))
    }
  }

  // El núcleo sostiene un compás de cuatro tiempos durante todo el loop.
  const coreBeat = Math.max(...BEATS.map(center => beatAt(loop, center, 0.031)))
  const corePresence = 0.18 + coreBeat * 0.82

  CORE.forEach(([row, col], index) => {
    const microDelay = index * 0.005
    const delayedBeat = Math.max(
      ...BEATS.map(center => beatAt((loop - microDelay + 1) % 1, center, 0.031))
    )
    setMax(values, row, col, Math.max(corePresence * 0.76, delayedBeat))
  })

  // Cada beat crea una pieza y la envía por una ruta diferente.
  BEATS.forEach((center, index) => {
    let elapsed = loop - center
    if (elapsed < 0) elapsed += 1

    const travelWindow = 0.19
    if (elapsed < travelWindow) {
      const local = elapsed / travelWindow
      const head = smoothstep(local) * (LANES[index].length + 1.5) - 0.7
      const fade = 1 - smoothstep((local - 0.78) / 0.22)
      pulsePath(values, LANES[index], head, fade)
    }

    // La pieza permanece activa hasta que el ciclo completo vuelve a comenzar.
    const published = smoothstep(elapsed / 0.055)
    const expiry = 1 - smoothstep((elapsed - 0.70) / 0.20)
    const outputBeat = 0.18 + beatAt(loop, (center + 0.19) % 1, 0.040) * 0.82
    revealOutput(values, OUTPUTS[index], published, outputBeat, expiry)
  })

  // En el último tramo, todas las piezas trabajan juntas con pulsos escalonados.
  if (loop > 0.78) {
    const local = (loop - 0.78) / 0.22
    const ensemble = smoothstep(local / 0.18) * (1 - smoothstep((local - 0.73) / 0.27))

    OUTPUTS.forEach((output, index) => {
      const staggered = Math.pow(
        0.5 + 0.5 * Math.sin(local * Math.PI * 8 - index * Math.PI * 0.5),
        7,
      )
      revealOutput(values, output, 1, 0.28 + staggered * 0.72, ensemble)
    })
  }

  return values
}

export function PulsoCadencia() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const matrix = canvas.parentElement
    if (!matrix) return

    let cssSize = 360
    let deviceScale = 1
    let animationFrame = 0
    let startTime = performance.now()
    let visible = true

    function resize() {
      const bounds = matrix!.getBoundingClientRect()
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
          const radius = baseRadius * (1 + eased * 0.42)

          if (intensity > 0.2) {
            context!.save()
            context!.beginPath()
            context!.arc(x, y, radius * (2.3 + eased * 1.7), 0, Math.PI * 2)
            context!.fillStyle = `rgba(${DOT_RGB}, ${eased * 0.075})`
            context!.shadowColor = `rgba(${DOT_RGB}, ${eased * 0.34})`
            context!.shadowBlur = (4 + eased * 8) * scale
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
        draw(7200)
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
    ro.observe(matrix)

    function onVisibilityChange() {
      visible = !document.hidden
      if (visible) start()
      else cancelAnimationFrame(animationFrame)
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    reducedMotion.addEventListener('change', start)

    observer.observe(matrix)
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
