'use client'

import { useEffect, useRef } from 'react'

/**
 * Header de /servicios/marca-y-relato. Port fiel de
 * flahoolick-pulso-03-unisono-transparente.html (entregado por Felipe) —
 * misma grilla, mismos tiempos, mismo dibujo. Dots negros, fondo transparente.
 */

const ROWS = 10
const COLS = 10
const LOOP_MS = 9200

// Proporciones de la matriz original de la home.
const SOURCE_SIZE = 622
const SOURCE_RADIUS = 1.82725
const SOURCE_STEP = 68.7
const SOURCE_FIRST_CENTER = 1.82725
const DOT_RGB = '0, 0, 0'

const VOICES = [
  { row: 1, speed: 1.12, phase: 0.08, direction: 1 },
  { row: 3, speed: 1.47, phase: 0.56, direction: -1 },
  { row: 6, speed: 0.88, phase: 0.31, direction: 1 },
  { row: 8, speed: 1.73, phase: 0.76, direction: -1 },
]

// Una firma central simétrica: las voces adquieren una forma reconocible.
const SIGNATURE = [
  [1, 4], [1, 5],
  [2, 3], [2, 6],
  [3, 2], [3, 4], [3, 5], [3, 7],
  [4, 1], [4, 3], [4, 6], [4, 8],
  [5, 1], [5, 3], [5, 6], [5, 8],
  [6, 2], [6, 4], [6, 5], [6, 7],
  [7, 3], [7, 6],
  [8, 4], [8, 5],
]

const CONVERGENCE_PATHS = [
  [[1, 0], [1, 1], [1, 2], [2, 2], [2, 3], [1, 3], [1, 4]],
  [[3, 9], [3, 8], [3, 7], [3, 6], [3, 5], [3, 4]],
  [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4]],
  [[8, 9], [8, 8], [8, 7], [7, 7], [7, 6], [8, 6], [8, 5]],
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

function setMax(values: Float32Array, row: number, col: number, intensity: number) {
  const point = key(row, col)
  values[point] = Math.max(values[point], intensity)
}

function travellingVoice(values: Float32Array, voice: typeof VOICES[number], progress: number, strength = 1) {
  const travel = (progress * voice.speed + voice.phase) % 1
  const head = voice.direction > 0
    ? travel * (COLS + 3) - 1.5
    : (1 - travel) * (COLS + 3) - 1.5

  for (let col = 0; col < COLS; col += 1) {
    const pulse = gaussian(head - col, 0.72) * strength
    const echo = gaussian(head - col - voice.direction * 2.25, 1.15) * 0.31
    setMax(values, voice.row, col, pulse + echo)
  }
}

function revealPath(values: Float32Array, path: number[][], progress: number, strength = 1) {
  path.forEach(([row, col], index) => {
    const delay = index / Math.max(1, path.length - 1)
    const reveal = smoothstep(progress * 1.45 - delay * 0.57)
    setMax(values, row, col, reveal * strength)
  })
}

function pulsePath(values: Float32Array, path: number[][], head: number, strength = 1) {
  path.forEach(([row, col], index) => {
    setMax(values, row, col, gaussian(head - index, 0.62) * strength)
  })
}

function intensities(time: number) {
  const values = new Float32Array(ROWS * COLS)
  const loop = (time % LOOP_MS) / LOOP_MS

  // Presencia mínima de los 100 dots.
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const phase = time * 0.0009 + row * 0.43 + col * 0.61
      values[key(row, col)] = 0.034 + 0.011 * (0.5 + 0.5 * Math.sin(phase))
    }
  }

  // 01 · Cuatro voces con cadencias independientes.
  if (loop < 0.27) {
    const local = loop / 0.27
    const entrance = smoothstep(local / 0.16)
    VOICES.forEach(voice => travellingVoice(values, voice, local, entrance))
  }
  // 02 · Las señales se escuchan y convergen.
  else if (loop < 0.52) {
    const local = (loop - 0.27) / 0.25
    const voiceFade = 1 - smoothstep(local / 0.62)

    VOICES.forEach(voice => travellingVoice(values, voice, local, voiceFade * 0.72))

    CONVERGENCE_PATHS.forEach((path, index) => {
      revealPath(values, path, clamp(local * 1.18 - index * 0.045), 0.28)
      const head = local * (path.length + 2) - 1 - index * 0.38
      pulsePath(values, path, head, 0.94)
    })
  }
  // 03 · Todas las voces comparten una firma.
  else if (loop < 0.79) {
    const local = (loop - 0.52) / 0.27
    const reveal = smoothstep(local / 0.24)
    const commonBeat = Math.pow(0.5 + 0.5 * Math.sin(local * Math.PI * 6 - Math.PI / 2), 7)

    SIGNATURE.forEach(([row, col], index) => {
      const sequence = smoothstep(reveal * 1.34 - (index / SIGNATURE.length) * 0.36)
      setMax(values, row, col, sequence * (0.31 + commonBeat * 0.69))
    })

    // Cuatro puntos de origen laten con la misma fase.
    ;[[1, 0], [3, 9], [6, 0], [8, 9]].forEach(([row, col]) => {
      setMax(values, row, col, reveal * (0.35 + commonBeat * 0.65))
    })
  }
  // 04 · Una sola voz se propaga por la matriz y regresa al silencio base.
  else {
    const local = (loop - 0.79) / 0.21
    const hold = 1 - smoothstep((local - 0.22) / 0.38)

    SIGNATURE.forEach(([row, col]) => {
      setMax(values, row, col, 0.38 * hold)
    })

    const radius = smoothstep(local) * 9.4
    const fade = 1 - smoothstep((local - 0.72) / 0.28)

    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const distance = Math.hypot(row - 4.5, col - 4.5)
        const wave = gaussian(distance - radius, 0.30)
        setMax(values, row, col, wave * 0.96 * fade)
      }
    }
  }

  return values
}

export function PulsoUnisono() {
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
        draw(6100)
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
