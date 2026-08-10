'use client'

import { useEffect, useRef } from 'react'

/**
 * Header de /servicios/estrategia-de-contenido. Port fiel de
 * flahoolick-pulso-02-coordenadas-transparente.html (entregado por Felipe) —
 * misma grilla, mismos tiempos, mismo dibujo. Dots negros, fondo transparente
 * (pensado para el hero rosado).
 */

const ROWS = 10
const COLS = 10
const LOOP_MS = 9000

// Proporciones de la matriz de la home.
const SOURCE_SIZE = 622
const SOURCE_RADIUS = 1.82725
const SOURCE_STEP = 68.7
const SOURCE_FIRST_CENTER = 1.82725

const SCATTERED_SIGNALS = [
  [0, 2], [1, 7], [2, 4], [2, 9],
  [4, 1], [4, 6], [5, 3], [6, 8],
  [7, 0], [7, 5], [8, 2], [9, 7],
]

const ROUTES = [
  [
    [9, 0], [8, 0], [7, 0], [7, 1], [6, 1], [6, 2],
    [5, 2], [5, 3], [4, 3], [4, 4], [3, 4], [3, 5],
    [2, 5], [2, 6], [1, 6], [1, 7], [0, 7],
  ],
  [
    [9, 3], [8, 3], [7, 3], [7, 4], [6, 4], [5, 4],
    [4, 4], [4, 5], [4, 6], [3, 6], [3, 7], [2, 7],
    [2, 8], [1, 8], [0, 8],
  ],
  [
    [9, 1], [8, 1], [8, 2], [7, 2], [6, 2], [6, 3],
    [5, 3], [5, 4], [4, 4], [4, 5], [3, 5], [3, 6],
    [2, 6], [2, 7], [1, 7], [1, 8], [0, 8], [0, 9],
  ],
]

const SELECTED_ROUTE = ROUTES[2]
const TARGET = [0, 9]

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

function revealRoute(values: Float32Array, route: number[][], progress: number, intensity: number) {
  route.forEach(([row, col], index) => {
    const delay = index / route.length
    const reveal = smoothstep(progress * 1.42 - delay * 0.58)
    setMax(values, row, col, reveal * intensity)
  })
}

function pulseRoute(values: Float32Array, route: number[][], head: number, strength = 1) {
  route.forEach(([row, col], index) => {
    const pulse = gaussian(head - index, 1.15) * strength
    setMax(values, row, col, pulse)
  })
}

function intensities(time: number) {
  const values = new Float32Array(ROWS * COLS)
  const loop = (time % LOOP_MS) / LOOP_MS

  // Respiración mínima de la matriz completa.
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const phase = time * 0.0011 + row * 0.51 + col * 0.77
      values[key(row, col)] = 0.035 + 0.014 * (0.5 + 0.5 * Math.sin(phase))
    }
  }

  // 01 · Señales dispersas.
  if (loop < 0.22) {
    const local = loop / 0.22
    SCATTERED_SIGNALS.forEach(([row, col], index) => {
      const phase = local * Math.PI * 4 - index * 0.72
      const wake = smoothstep(local * 5 - index * 0.18)
      const blink = 0.22 + 0.78 * Math.pow(0.5 + 0.5 * Math.sin(phase), 4)
      setMax(values, row, col, wake * blink * 0.82)
    })
  }
  // 02 · El mapa revela rutas posibles.
  else if (loop < 0.48) {
    const local = (loop - 0.22) / 0.26
    ROUTES.forEach((route, routeIndex) => {
      const routeProgress = clamp(local * 1.2 - routeIndex * 0.08)
      revealRoute(values, route, routeProgress, 0.34 + routeIndex * 0.035)
    })

    SCATTERED_SIGNALS.forEach(([row, col]) => {
      setMax(values, row, col, 0.10 * (1 - smoothstep(local)))
    })
  }
  // 03 · Una ruta adquiere prioridad.
  else if (loop < 0.76) {
    const local = (loop - 0.48) / 0.28
    const commit = smoothstep(local / 0.3)

    ROUTES.slice(0, 2).forEach(route => {
      route.forEach(([row, col]) => {
        setMax(values, row, col, 0.21 * (1 - commit * 0.72))
      })
    })

    SELECTED_ROUTE.forEach(([row, col]) => {
      setMax(values, row, col, 0.22 + commit * 0.19)
    })

    const head = ((local * 2.05) % 1) * (SELECTED_ROUTE.length + 2) - 1
    pulseRoute(values, SELECTED_ROUTE, head, 1)

    if (local > 0.52) {
      const secondHead = ((local - 0.52) / 0.48) * (SELECTED_ROUTE.length + 2) - 1
      pulseRoute(values, SELECTED_ROUTE, secondHead, 0.92)
    }
  }
  // 04 · La dirección se propaga desde el punto elegido.
  else {
    const local = (loop - 0.76) / 0.24
    const routeFade = 1 - smoothstep((local - 0.56) / 0.44)

    SELECTED_ROUTE.forEach(([row, col]) => {
      setMax(values, row, col, 0.28 * routeFade)
    })

    const radius = smoothstep(local) * 18
    const finalFade = 1 - smoothstep((local - 0.78) / 0.22)

    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        const distance = Math.abs(row - TARGET[0]) + Math.abs(col - TARGET[1])
        const wave = gaussian(distance - radius, 0.62)
        const aligned = distance < radius ? 0.11 : 0
        setMax(values, row, col, (wave * 0.88 + aligned) * finalFade)
      }
    }

    const beacon = (0.56 + 0.44 * Math.sin(local * Math.PI * 6)) * finalFade
    setMax(values, TARGET[0], TARGET[1], beacon)
  }

  return values
}

export function PulsoCoordenadas() {
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
            context!.fillStyle = `rgba(0, 0, 0, ${eased * 0.075})`
            context!.shadowColor = `rgba(0, 0, 0, ${eased * 0.34})`
            context!.shadowBlur = (4 + eased * 8) * scale
            context!.fill()
            context!.restore()
          }

          const alpha = 0.20 + eased * 0.80
          context!.beginPath()
          context!.arc(x, y, radius, 0, Math.PI * 2)
          context!.fillStyle = `rgba(0, 0, 0, ${alpha})`
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
        draw(5350)
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
