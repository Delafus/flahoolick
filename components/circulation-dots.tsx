'use client'

import { useEffect, useRef } from 'react'

interface CirculationDotsProps {
  viewBoxSize?: number
  points?: { cx: number; cy: number }[]
  baseRadius?: number
  color?: string
  speed?: number
  /** Suma pulsos que se propagan por toda la grilla 10x10, igual que el
   *  paso "Operación Editorial" de GrillaProceso — para el hero 3. */
  pulses?: boolean
}

// Coordenadas (en unidades del viewBox) de las 10 columnas/filas de la
// grilla 10x10 estática de dots-scroll-03.svg — misma escala que DEFAULT_POINTS.
const GRID_COLS = [1.827, 70.5303, 139.233, 207.936, 276.639, 345.342, 414.044, 482.747, 551.451, 620.173]
const GRID_SIZE = 10

const PULSO_CADA_MS = 620
const PULSO_VIDA_MS = 2200
const PULSO_ALCANCE = 9
const PULSO_GROSOR = 1.15

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

// Los 10 puntos de la diagonal (de la esquina inferior izquierda a la
// superior derecha) en la nueva grilla 10x10 de dots-scroll-03.svg. A
// diferencia de la versión anterior, acá todos los puntos son del mismo
// tamaño en el arte estático — el barrido es el que los hace crecer y
// cambiar de color, en un solo sentido, del más chico (sin crecimiento)
// al más grande (crecimiento máximo).
const DEFAULT_POINTS = [
  { cx: 1.827, cy: 620.154 },
  { cx: 70.5303, cy: 551.451 },
  { cx: 139.233, cy: 482.748 },
  { cx: 207.936, cy: 414.045 },
  { cx: 276.639, cy: 345.342 },
  { cx: 345.342, cy: 276.639 },
  { cx: 414.044, cy: 207.936 },
  { cx: 482.747, cy: 139.233 },
  { cx: 551.451, cy: 70.5301 },
  { cx: 620.173, cy: 1.827 },
]

function hexToRgb(hex: string) {
  const m = hex.replace('#', '')
  const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function CirculationDots({
  viewBoxSize = 622,
  points = DEFAULT_POINTS,
  baseRadius = 1.827,
  color = '#F5FD92',
  speed = 0.05,
  pulses = false,
}: CirculationDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let frameId: number
    let width = 0
    let height = 0
    let scale = 1

    // El punto final de la diagonal (el que más crece) toca la esquina
    // superior derecha exacta del recuadro — se le da al canvas un colchón
    // extra hacia arriba y hacia la derecha para que el crecimiento tenga
    // espacio real sin cortarse contra el borde.
    const EXTRA = 30

    function setup() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      scale = Math.max(0, width - EXTRA) / viewBoxSize
    }

    const maxIndex = points.length - 1
    const targetRgb = hexToRgb(color)
    // La onda entra y sale de la fila fuera de rango (-2 → maxIndex+3) antes
    // de reiniciar, para que el barrido tenga "colchón" de entrada/salida en
    // vez de rebotar de golpe — la inercia que pide el sandbox de referencia.
    const entryBuffer = 2
    const exitBuffer = 3
    let wavePosition = -entryBuffer
    let direction = 1
    const waveWidth = 1.8

    // Crecimiento proporcional: el primer punto no crece nada, el último
    // llega a su tamaño máximo — igual que el sandbox de referencia.
    const maxTargetRadius = baseRadius * 7
    const totalGrowthAvailable = maxTargetRadius - baseRadius

    // Pulsos de fondo (paso "Operación Editorial"): nacen en una celda al
    // azar de la grilla 10x10 y se expanden como un anillo hasta apagarse.
    const pulsos: { row: number; col: number; inicio: number }[] = []
    let proximoPulso = performance.now()

    function dibujarPulsos(now: number) {
      if (now - proximoPulso > PULSO_VIDA_MS * 2) proximoPulso = now
      while (now > proximoPulso) {
        pulsos.push({ row: Math.floor(Math.random() * GRID_SIZE), col: Math.floor(Math.random() * GRID_SIZE), inicio: proximoPulso })
        proximoPulso += PULSO_CADA_MS
      }
      while (pulsos.length && now - pulsos[0].inicio > PULSO_VIDA_MS) pulsos.shift()

      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          let brillo = 0
          for (const pulso of pulsos) {
            const edad = (now - pulso.inicio) / PULSO_VIDA_MS
            if (edad < 0 || edad > 1) continue
            const distancia = Math.hypot(col - pulso.col, row - pulso.row)
            const radio = easeOutCubic(edad) * PULSO_ALCANCE
            const cercania = 1 - Math.abs(distancia - radio) / PULSO_GROSOR
            if (cercania <= 0) continue
            brillo = Math.max(brillo, cercania * (1 - edad))
          }
          if (brillo <= 0.02) continue

          const pico = Math.pow(Math.max(0, Math.min(1, brillo)), 1.5)
          const x = GRID_COLS[col] * scale
          const y = EXTRA + GRID_COLS[row] * scale
          const r = baseRadius * (1 + 2.2 * pico) * scale

          const cr = Math.round(255 + (targetRgb.r - 255) * pico)
          const cg = Math.round(255 + (targetRgb.g - 255) * pico)
          const cb = Math.round(255 + (targetRgb.b - 255) * pico)

          ctx!.beginPath()
          ctx!.shadowBlur = 6 * pico * scale
          ctx!.shadowColor = color
          ctx!.fillStyle = `rgb(${cr}, ${cg}, ${cb})`
          ctx!.globalAlpha = 0.85 * pico
          ctx!.arc(x, y, r, 0, Math.PI * 2)
          ctx!.fill()
          ctx!.closePath()
          ctx!.shadowBlur = 0
          ctx!.globalAlpha = 1
        }
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height)

      wavePosition += speed * direction
      if (wavePosition > maxIndex + exitBuffer) {
        wavePosition = maxIndex + exitBuffer
        direction = -1
      } else if (wavePosition < -entryBuffer) {
        wavePosition = -entryBuffer
        direction = 1
      }

      points.forEach((pt, index) => {
        const distance = Math.abs(index - wavePosition)
        if (distance >= waveWidth) return

        // Suavizado armónico (coseno) — transición de entrada/salida más
        // fluida que una rampa lineal.
        const intensity = Math.cos((distance / waveWidth) * (Math.PI / 2))

        const progressRatio = index / maxIndex
        const x = pt.cx * scale
        const y = EXTRA + pt.cy * scale

        const myMaxGrowth = totalGrowthAvailable * progressRatio
        const r = (baseRadius + myMaxGrowth * intensity) * scale

        // Transición de blanco (color de reposo del punto estático) a la
        // tonalidad de acento, a medida que la onda lo activa.
        const cr = Math.round(255 + (targetRgb.r - 255) * intensity)
        const cg = Math.round(255 + (targetRgb.g - 255) * intensity)
        const cb = Math.round(255 + (targetRgb.b - 255) * intensity)
        const fill = `rgb(${cr}, ${cg}, ${cb})`

        ctx!.beginPath()
        ctx!.shadowBlur = (4 + 8 * progressRatio) * intensity * scale
        ctx!.shadowColor = color
        ctx!.fillStyle = fill
        ctx!.arc(x, y, r, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.closePath()
        ctx!.shadowBlur = 0
      })

      if (pulses) dibujarPulsos(performance.now())

      frameId = requestAnimationFrame(animate)
    }

    setup()
    animate()

    const onResize = () => setup()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', onResize)
    }
  }, [viewBoxSize, points, baseRadius, color, speed, pulses])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '-30px',
        left: 0,
        width: 'calc(100% + 30px)',
        height: 'calc(100% + 30px)',
        pointerEvents: 'none',
      }}
    />
  )
}
