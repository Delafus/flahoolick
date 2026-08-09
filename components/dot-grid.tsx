'use client'

import { useEffect, useRef } from 'react'

/**
 * Motor de ilustraciones de headers internos — mismo modelo que grilla-proceso.tsx:
 * población fija 10x10, todo punto vive en su casilla. Ninguna posición se calcula
 * en coordenadas continuas ni con trigonometría libre (ver regla-grilla-dots.md).
 */

const GRID = 10
const COUNT = GRID * GRID
const BASE_DIAMETER = 3
const BASE_ALPHA = 0.12

function hexToRgb(hex: string) {
  const m = hex.replace('#', '')
  const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutBack(t: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

interface Punto {
  x: number
  y: number
  row: number
  col: number
}

export type DotGridBehavior =
  | 'cascada-clusters'
  | 'cursor-magnetico'
  | 'morphing'
  | 'cascada-direccional'
  | 'respiracion-fijo'
  | 'ondas-concentricas'

interface DotGridProps {
  behavior: DotGridBehavior
  color?: string
  accentColor?: string
}

/* Clusters de 3x3 casillas contiguas en cada cuadrante — usados por 'cascada-clusters'. */
const CLUSTERS: [number, number][][] = [
  [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
  [[1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8], [3, 6], [3, 7], [3, 8]],
  [[6, 1], [6, 2], [6, 3], [7, 1], [7, 2], [7, 3], [8, 1], [8, 2], [8, 3]],
  [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8]],
]

/* Subconjunto activo para 'morphing' — disperso por toda la grilla. */
const MORPH_INDICES = [3, 7, 12, 16, 21, 25, 28, 32, 37, 41, 44, 48, 53, 57, 61, 65, 68, 72, 77, 81, 84, 88, 93, 97]

/* Casillas fijas en verde Flahoolick para 'respiracion-fijo' — no respiran. */
const FIJO_INDICES = [11, 18, 45, 54, 81, 88]

export function DotGrid({ behavior, color = '#000000', accentColor = '#1FDE91' }: DotGridProps) {
  const { r, g, b } = hexToRgb(color)
  const { r: ar, g: ag, b: ab } = hexToRgb(accentColor)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inicioRef = useRef(0)
  const disparadoRef = useRef(false)
  const punteroRef = useRef<{ x: number; y: number } | null>(null)
  const punteroSuaveRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const contenedor = canvas.parentElement
    if (!contenedor) return

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const disparaUnaVez = behavior === 'cascada-clusters' || behavior === 'ondas-concentricas'

    let ancho = 0
    let alto = 0
    let puntos: Punto[] = []
    let raf = 0
    let corriendo = false

    function construirGrilla() {
      const lado = Math.min(ancho, alto) * 0.86
      const izq = (ancho - lado) / 2
      const arr = (alto - lado) / 2
      const paso = lado / (GRID - 1)
      puntos = []
      for (let row = 0; row < GRID; row++) {
        for (let col = 0; col < GRID; col++) {
          puntos.push({ x: izq + col * paso, y: arr + row * paso, row, col })
        }
      }
    }

    function medir() {
      const rect = contenedor!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ancho = Math.max(1, rect.width)
      alto = Math.max(1, rect.height)
      canvas!.width = Math.round(ancho * dpr)
      canvas!.height = Math.round(alto * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      construirGrilla()
    }

    function punto(x: number, y: number, diametro: number, alpha: number, rgb = { r, g, b }) {
      if (alpha <= 0 || diametro <= 0) return
      ctx!.beginPath()
      ctx!.arc(x, y, diametro / 2, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${clamp01(alpha)})`
      ctx!.fill()
    }

    function grillaBase(alpha = BASE_ALPHA) {
      puntos.forEach(p => punto(p.x, p.y, BASE_DIAMETER, alpha))
    }

    /* Servicios — 4 clusters se encienden en secuencia y quedan encendidos. */
    function dibujarCascadaClusters(t: number) {
      grillaBase()
      const CLUSTER_STAGGER = 260
      const POP_MS = 520
      CLUSTERS.forEach((cluster, ci) => {
        cluster.forEach(([row, col], pi) => {
          const idx = row * GRID + col
          const p = puntos[idx]
          if (!p) return
          const delay = ci * CLUSTER_STAGGER + (pi % 3) * 60
          const local = clamp01((t - delay) / POP_MS)
          if (local <= 0) return
          const eased = easeOutBack(local)
          const diametro = BASE_DIAMETER + (5.2 - BASE_DIAMETER) * clamp01(eased)
          const alpha = BASE_ALPHA + (0.85 - BASE_ALPHA) * easeOutCubic(local)
          punto(p.x, p.y, diametro, alpha)
        })
      })
      const total = (CLUSTERS.length - 1) * CLUSTER_STAGGER + 120 + POP_MS
      if (t > total) disparadoRef.current = true
    }

    /* FrecuenciA — anillos concéntricos desde el centro, en secuencia, luego quietos. */
    function dibujarOndasConcentricas(t: number) {
      grillaBase()
      const centro = { row: 4.5, col: 4.5 }
      const RING_STAGGER = 190
      const POP_MS = 480
      let maxLocal = 0
      puntos.forEach(p => {
        const dist = Math.hypot(p.row - centro.row, p.col - centro.col)
        const ring = Math.round(dist)
        const delay = ring * RING_STAGGER
        const local = clamp01((t - delay) / POP_MS)
        maxLocal = Math.max(maxLocal, local)
        if (local <= 0) return
        const eased = easeOutBack(local)
        const diametro = BASE_DIAMETER + (4.6 - BASE_DIAMETER) * clamp01(eased)
        const alpha = BASE_ALPHA + (0.8 - BASE_ALPHA) * easeOutCubic(local)
        punto(p.x, p.y, diametro, alpha)
      })
      if (t > 7 * RING_STAGGER + POP_MS) disparadoRef.current = true
    }

    /* Estrategia de contenido — casillas cercanas al cursor aumentan radio/opacidad. */
    function dibujarCursorMagnetico() {
      grillaBase()
      const suave = punteroSuaveRef.current
      const objetivo = punteroRef.current
      if (objetivo) {
        if (!suave) punteroSuaveRef.current = { ...objetivo }
        else {
          suave.x += (objetivo.x - suave.x) * 0.18
          suave.y += (objetivo.y - suave.y) * 0.18
        }
      } else if (suave) {
        // Se aleja del último punto conocido hacia "ningún lado" — decae a la base.
        punteroSuaveRef.current = null
      }
      const p2 = punteroSuaveRef.current
      if (!p2) return
      const RADIO = Math.min(ancho, alto) * 0.32
      puntos.forEach(p => {
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
        const influencia = clamp01(1 - dist / RADIO)
        if (influencia <= 0) return
        const diametro = BASE_DIAMETER + influencia * 3.4
        const alpha = BASE_ALPHA + influencia * 0.72
        punto(p.x, p.y, diametro, alpha)
      })
    }

    /* Marca y relato — dispersos <-> convergen al centro, loop con pausas largas. */
    function dibujarMorphing(t: number) {
      grillaBase()
      const centro = { x: ancho / 2, y: alto / 2 }
      const T_TRANS = 1100
      const T_HOLD = 2600
      const periodo = T_TRANS * 2 + T_HOLD * 2
      const ciclo = t % periodo
      let progreso: number
      if (ciclo < T_HOLD) progreso = 0
      else if (ciclo < T_HOLD + T_TRANS) progreso = easeInOutCubic((ciclo - T_HOLD) / T_TRANS)
      else if (ciclo < T_HOLD + T_TRANS + T_HOLD) progreso = 1
      else progreso = 1 - easeInOutCubic((ciclo - T_HOLD - T_TRANS - T_HOLD) / T_TRANS)

      MORPH_INDICES.forEach(idx => {
        const p = puntos[idx]
        if (!p) return
        const x = p.x + (centro.x - p.x) * progreso * 0.82
        const y = p.y + (centro.y - p.y) * progreso * 0.82
        const diametro = 3.6 + progreso * 2.4
        const alpha = 0.45 + progreso * 0.4
        punto(x, y, diametro, alpha)
      })
    }

    /* Producción de contenido — ola continua cruzando la grilla de izquierda a derecha. */
    function dibujarCascadaDireccional(t: number) {
      const VELOCIDAD = 4.2 // columnas por segundo
      const ANCHO_OLA = 2.4
      const span = GRID + ANCHO_OLA * 2
      const olaCol = ((t * 0.001 * VELOCIDAD) % span) - ANCHO_OLA
      puntos.forEach(p => {
        const dist = Math.abs(p.col - olaCol)
        const cercania = clamp01(1 - dist / ANCHO_OLA)
        const brillo = Math.pow(cercania, 1.4)
        const diametro = BASE_DIAMETER + brillo * 2.6
        const alpha = BASE_ALPHA + brillo * 0.68
        punto(p.x, p.y, diametro, alpha)
      })
    }

    /* Sistemas de contenido con IA — respiración, con un grupo fijo en verde que no respira. */
    function dibujarRespiracionFijo(t: number) {
      const seg = t * 0.001
      puntos.forEach((p, idx) => {
        if (FIJO_INDICES.includes(idx)) {
          punto(p.x, p.y, 4.4, 0.85, { r: ar, g: ag, b: ab })
          return
        }
        const fase = (p.row * 0.7 + p.col * 1.3) % (Math.PI * 2)
        const vel = 0.55 + ((p.row + p.col) % 5) * 0.06
        const onda = 0.5 + 0.5 * Math.sin(seg * vel + fase)
        const diametro = BASE_DIAMETER + onda * 1.6
        const alpha = BASE_ALPHA + onda * 0.4
        punto(p.x, p.y, diametro, alpha)
      })
    }

    /* prefers-reduced-motion: un solo frame fijo por comportamiento, sin animar. */
    function dibujarEstatico() {
      switch (behavior) {
        case 'cascada-clusters':
          dibujarCascadaClusters(999999)
          break
        case 'ondas-concentricas':
          dibujarOndasConcentricas(999999)
          break
        case 'respiracion-fijo':
          grillaBase()
          FIJO_INDICES.forEach(idx => {
            const p = puntos[idx]
            if (p) punto(p.x, p.y, 4.4, 0.85, { r: ar, g: ag, b: ab })
          })
          break
        case 'morphing':
          grillaBase()
          MORPH_INDICES.forEach(idx => {
            const p = puntos[idx]
            if (p) punto(p.x, p.y, 3.6, 0.45)
          })
          break
        default:
          grillaBase()
      }
    }

    function dibujar(now: number) {
      ctx!.clearRect(0, 0, ancho, alto)
      const t = now - inicioRef.current

      if (sinMovimiento) {
        dibujarEstatico()
        return
      }

      switch (behavior) {
        case 'cascada-clusters': dibujarCascadaClusters(disparadoRef.current ? 999999 : t); break
        case 'ondas-concentricas': dibujarOndasConcentricas(disparadoRef.current ? 999999 : t); break
        case 'cursor-magnetico': dibujarCursorMagnetico(); break
        case 'morphing': dibujarMorphing(t); break
        case 'cascada-direccional': dibujarCascadaDireccional(t); break
        case 'respiracion-fijo': dibujarRespiracionFijo(t); break
      }
    }

    function bucle(now: number) {
      if (!corriendo) return
      dibujar(now)
      if (disparaUnaVez && disparadoRef.current) {
        corriendo = false
        return
      }
      raf = requestAnimationFrame(bucle)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      punteroRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onPointerLeave() {
      punteroRef.current = null
    }

    medir()
    inicioRef.current = performance.now()
    dibujar(performance.now())

    const ro = new ResizeObserver(() => {
      medir()
      dibujar(performance.now())
    })
    ro.observe(contenedor)

    const io = new IntersectionObserver(entradas => {
      const visible = entradas[0]?.isIntersecting ?? false
      if (visible && !corriendo && !sinMovimiento && (!disparaUnaVez || !disparadoRef.current)) {
        if (!inicioRef.current || disparaUnaVez) inicioRef.current = performance.now()
        corriendo = true
        raf = requestAnimationFrame(bucle)
      } else if (!visible && corriendo) {
        corriendo = false
        cancelAnimationFrame(raf)
      }
    }, { threshold: 0.15 })
    io.observe(contenedor)

    if (behavior === 'cursor-magnetico') {
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerleave', onPointerLeave)
    }

    return () => {
      corriendo = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      if (behavior === 'cursor-magnetico') {
        canvas.removeEventListener('pointermove', onPointerMove)
        canvas.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [behavior, r, g, b, ar, ag, ab])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
