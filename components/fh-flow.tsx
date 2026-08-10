'use client'

import { useEffect, useRef } from 'react'

/**
 * Motor de la home: una sola corriente de dots que atraviesa los 3 heroes
 * del scroll inicial. Port fiel del motor de
 * flahoolick-home-eje-central-scroll-v3.html (entregado por Felipe) —
 * misma física, mismos tiempos. Reemplaza la línea (ScrollConnector) y las
 * animaciones (TrappedDots / CirculationDots) que vivían dentro de cada hero.
 *
 * No usa selectores globales: mide únicamente dentro de su propio
 * contenedor padre, sobre los elementos marcados con .fh-flow__section y
 * .fh-flow__grid-zone.
 */

const ROWS = 10
const COLS = 10
const DOT_RGB = '64, 61, 55' // #403D37 — mismo tono que ScrollConnector/CirculationDots en esta página
const DISC_RGB = '8, 8, 8'
const DISC_PARTICLE_RGB = '241, 238, 231'
const TRAPPED_DISC_RADIUS_RATIO = 0.225

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function smooth(value: number) {
  const x = clamp(value)
  return x * x * (3 - 2 * x)
}

function range(value: number, start: number, end: number) {
  return smooth(clamp((value - start) / Math.max(0.0001, end - start)))
}

type Kind = 'trapped' | 'market' | 'circulation'

interface Stage {
  index: number
  kind: Kind
  left: number
  top: number
  size: number
  step: number
  radius: number
  centerX: number
  triggerStart: number
  triggerEnd: number
  /** Franja [sectionTop, copyEnd] — nunca se dibuja un dot del stream ahí: es donde vive el copy del hero. */
  sectionTop: number
  copyEnd: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  scale: number
}

function createParticles(): Particle[] {
  const seeds: [number, number, number, number][] = [
    [0.50, 0.19, 0.080, 0.116], [0.63, 0.23, -0.124, 0.084],
    [0.74, 0.34, -0.132, -0.076], [0.78, 0.50, -0.148, 0.052],
    [0.71, 0.64, -0.104, -0.120], [0.60, 0.75, 0.076, -0.140],
    [0.43, 0.78, 0.132, -0.092], [0.29, 0.68, 0.140, 0.076],
    [0.22, 0.52, 0.152, -0.036], [0.28, 0.36, 0.112, 0.124],
    [0.39, 0.26, -0.088, 0.144], [0.49, 0.40, 0.124, -0.104],
    [0.61, 0.45, -0.116, -0.096], [0.56, 0.59, -0.080, 0.132],
    [0.41, 0.61, 0.108, 0.116], [0.35, 0.47, 0.120, -0.128],
  ]
  return seeds.map(([x, y, vx, vy], index) => ({ x, y, vx, vy, scale: 1.10 + (index % 3) * 0.12 }))
}

function buildFormationPath() {
  const path: { row: number; col: number; virtual?: boolean }[] = [{ row: 0, col: 4.5, virtual: true }]
  for (let col = 4; col >= 0; col -= 1) path.push({ row: 0, col })
  for (let col = 1; col < COLS; col += 1) path.push({ row: 0, col })
  for (let row = 1; row < ROWS; row += 1) {
    if (row % 2 === 1) {
      for (let col = COLS - 1; col >= 0; col -= 1) path.push({ row, col })
    } else {
      for (let col = 0; col < COLS; col += 1) path.push({ row, col })
    }
  }
  return path
}

const FORMATION_PATH = buildFormationPath()

function firstRevealIndex(row: number, col: number) {
  return FORMATION_PATH.findIndex(p => !p.virtual && p.row === row && p.col === col)
}

// Cinco puntos contiguos: el 5% como bloque legible de 5 sobre 100.
const ACTIVE_FIVE: [number, number][] = [[4, 3], [4, 4], [4, 5], [4, 6], [4, 7]]

const ROUTES: [number, number][][] = [
  [[9, 0], [8, 0], [7, 0], [7, 1], [6, 1], [6, 2], [5, 2], [5, 3], [4, 3], [4, 4], [3, 4], [3, 5], [2, 5], [2, 6], [1, 6], [1, 7], [0, 7]],
  [[0, 2], [1, 2], [2, 2], [2, 3], [3, 3], [4, 3], [4, 4], [4, 5], [5, 5], [6, 5], [6, 6], [7, 6], [8, 6], [8, 7], [9, 7]],
  [[9, 9], [8, 9], [7, 9], [7, 8], [6, 8], [6, 7], [5, 7], [5, 6], [4, 6], [4, 5], [3, 5], [3, 4], [2, 4], [1, 4], [0, 4]],
]

export function FhFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return
    const container = canvas.parentElement
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 1
    let height = 1
    let viewportHeight = 1
    let dpr = 1
    let scrollY = 0
    let stages: Stage[] = []
    let particles: Particle[] = createParticles()
    let lastFrame = performance.now()
    let raf = 0

    function drawDot(x: number, y: number, radius: number, alpha = 1, scale = 1, rgb = DOT_RGB) {
      if (alpha < 0.002) return
      context!.beginPath()
      context!.arc(x, y, Math.max(0.25, radius * scale), 0, Math.PI * 2)
      context!.fillStyle = `rgba(${rgb}, ${clamp(alpha)})`
      context!.fill()
    }

    function buildMetrics() {
      const sections = Array.from(container!.querySelectorAll<HTMLElement>('.fh-flow__section'))
      const zones = Array.from(container!.querySelectorAll<HTMLElement>('.fh-flow__grid-zone'))
      const copyEnds = Array.from(container!.querySelectorAll<HTMLElement>('.fh-flow__copy-end'))
      const containerRect = container!.getBoundingClientRect()

      width = Math.max(1, containerRect.width)
      height = Math.max(1, container!.scrollHeight)
      viewportHeight = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 1.6)

      canvas!.style.height = `${height}px`
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      context!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewportHeight)

      stages = zones.map((zone, index) => {
        const section = sections[index]
        const zoneRect = zone.getBoundingClientRect()
        const size = zoneRect.width
        const step = size / (COLS - 1)
        const radius = clamp(step * 0.058, 1.28, 2.2)
        const top = zoneRect.top - containerRect.top
        const left = zoneRect.left - containerRect.left

        const sectionRect = section?.getBoundingClientRect()
        const sectionTop = (sectionRect ? sectionRect.top : zoneRect.top) - containerRect.top
        const copyEndRect = copyEnds[index]?.getBoundingClientRect()
        const copyEnd = copyEndRect ? copyEndRect.bottom - containerRect.top : sectionTop

        const zoneDocTop = zoneRect.top + window.scrollY

        // El armado (grilla + efecto del círculo) debe terminar justo cuando la zona
        // queda centrada verticalmente en el viewport — no más abajo del scroll.
        const triggerEnd = clamp(zoneDocTop + size / 2 - viewportHeight * 0.5, 0, maxScroll)

        const kind: Kind = index === 0 ? 'trapped' : index === 1 ? 'market' : 'circulation'

        // triggerStart se completa en un segundo paso, encadenado al triggerEnd del stage
        // anterior — así nunca hay un tramo de scroll "muerto" entre el final de un hero
        // y el inicio del siguiente.
        return { index, kind, left, top, size, step, radius, centerX: left + size / 2, triggerStart: 0, triggerEnd, sectionTop, copyEnd }
      })

      stages.forEach((stage, i) => {
        stage.triggerStart = i === 0 ? 0 : stages[i - 1].triggerEnd
        stage.triggerEnd = Math.max(stage.triggerEnd, stage.triggerStart + 1)
      })
    }

    function stageProgress(stage: Stage) {
      if (reducedMotion.matches) return 1
      return range(scrollY, stage.triggerStart, stage.triggerEnd)
    }

    function drawStreamSegment(x: number, fromY: number, toY: number, radius: number, step: number, revealY: number, skipStart?: number, skipEnd?: number) {
      if (toY <= fromY) return
      const first = Math.ceil(fromY / step) * step
      for (let y = first; y <= toY + 0.1; y += step) {
        if (skipStart != null && skipEnd != null && y >= skipStart && y <= skipEnd) continue
        const distance = revealY - y
        const reveal = smooth(clamp(distance / Math.max(1, step) + 0.55))
        const head = Math.exp(-Math.pow(distance / Math.max(1, step), 2) / 2.4)
        drawDot(x, y, radius, reveal * (0.78 + head * 0.22), 1 + head * 0.16)
      }
    }

    function drawGridFormation(stage: Stage, progress: number) {
      const formation = range(progress, 0.42, 0.96)
      const total = FORMATION_PATH.length - 1
      const cursor = formation * total

      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const index = firstRevealIndex(row, col)
          const reveal = smooth(clamp(cursor - index + 0.42))
          const settled = 0.26
          drawDot(stage.left + col * stage.step, stage.top + row * stage.step, stage.radius, reveal * settled, 0.94)
        }
      }

      const headIndex = Math.min(FORMATION_PATH.length - 1, Math.max(0, Math.floor(cursor)))
      const head = FORMATION_PATH[headIndex]
      const headX = stage.left + head.col * stage.step
      const headY = stage.top + head.row * stage.step
      const headPresence = smooth(clamp(formation * total + 0.15))
      const headFade = 1 - range(formation, 0.965, 1)
      const settledAlpha = 0.26
      const headAlpha = headPresence * (settledAlpha + (1 - settledAlpha) * headFade)
      const headScale = 0.94 + (1.34 - 0.94) * headFade
      drawDot(headX, headY, stage.radius, headAlpha, headScale)

      return formation
    }

    function drawIncoming(stage: Stage, progress: number) {
      const previous = stages[stage.index - 1]
      const fromY = previous ? previous.top + previous.size : 0
      const toY = stage.top
      const incoming = range(progress, 0, 0.44)

      // El tramo [sectionTop, copyEnd] nunca dibuja (ahí vive el copy del hero). En vez
      // de repartir el avance de forma pareja sobre TODO fromY→toY (lo que hace que el
      // "head" pase la mayor parte del recorrido invisible, detrás del texto), el avance
      // se reparte solo entre los dos tramos visibles: antes del texto y después de él.
      // Así la línea es visible desde el instante en que arranca el stage, y el tramo
      // que conecta con el hero siguiente también queda visible (no se lo come el skip).
      const gapABegin = fromY
      const gapAEnd = clamp(stage.sectionTop, fromY, toY)
      const gapBBegin = clamp(stage.copyEnd, gapAEnd, toY)
      const gapBEnd = toY
      const gapALen = Math.max(0, gapAEnd - gapABegin)
      const gapBLen = Math.max(0, gapBEnd - gapBBegin)
      const visibleTotal = Math.max(1, gapALen + gapBLen)

      const traveled = incoming * visibleTotal
      const headY = traveled <= gapALen
        ? gapABegin + traveled
        : gapBBegin + (traveled - gapALen)

      drawStreamSegment(stage.centerX, fromY, toY, stage.radius, stage.step, headY, stage.sectionTop, stage.copyEnd)
    }

    function updateParticles(stage: Stage, deltaSeconds: number) {
      const center = 0.5
      const boundaryRadius = TRAPPED_DISC_RADIUS_RATIO

      particles.forEach(particle => {
        particle.x += particle.vx * deltaSeconds
        particle.y += particle.vy * deltaSeconds

        const particleRadius = (stage.radius * particle.scale) / stage.size
        const dx = particle.x - center
        const dy = particle.y - center
        const distance = Math.hypot(dx, dy) || 0.0001
        const limit = boundaryRadius - particleRadius

        if (distance > limit) {
          const nx = dx / distance
          const ny = dy / distance
          particle.x = center + nx * limit
          particle.y = center + ny * limit
          const vAlongNormal = particle.vx * nx + particle.vy * ny
          if (vAlongNormal > 0) {
            particle.vx -= 2 * vAlongNormal * nx
            particle.vy -= 2 * vAlongNormal * ny
          }
        }
      })

      for (let a = 0; a < particles.length; a += 1) {
        for (let b = a + 1; b < particles.length; b += 1) {
          const p1 = particles[a]
          const p2 = particles[b]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.hypot(dx, dy) || 0.0001
          const minDistance = ((stage.radius * (p1.scale + p2.scale)) / stage.size) * 1.08
          if (distance >= minDistance) continue

          const nx = dx / distance
          const ny = dy / distance
          const overlap = (minDistance - distance) * 0.5
          p1.x -= nx * overlap; p1.y -= ny * overlap
          p2.x += nx * overlap; p2.y += ny * overlap

          const relVel = (p2.vx - p1.vx) * nx + (p2.vy - p1.vy) * ny
          if (relVel < 0) {
            p1.vx += relVel * nx; p1.vy += relVel * ny
            p2.vx -= relVel * nx; p2.vy -= relVel * ny
          }
        }
      }
    }

    function buildDiscRevealPath(stage: Stage, formation: number) {
      const path = new Path2D()
      const cursor = formation * (FORMATION_PATH.length - 1)
      const bandHeight = stage.step * 1.08

      for (let row = 0; row < ROWS; row += 1) {
        const indices = Array.from({ length: COLS }, (_, col) => firstRevealIndex(row, col))
        const rowStart = Math.min(...indices)
        const rowEnd = Math.max(...indices)
        const rowReveal = smooth(clamp((cursor - rowStart) / Math.max(1, rowEnd - rowStart)))
        if (rowReveal <= 0) continue

        const y = stage.top + row * stage.step - bandHeight * 0.5
        const revealWidth = stage.size * rowReveal
        const travelsRight = row === 0 || row % 2 === 0
        const x = travelsRight ? stage.left : stage.left + stage.size - revealWidth
        path.rect(x, y, revealWidth, bandHeight)
      }
      return path
    }

    function drawTrapped(stage: Stage, formation: number, now: number, deltaSeconds: number) {
      if (formation < 0.002) return
      updateParticles(stage, Math.min(deltaSeconds, 0.03))

      const centerX = stage.centerX
      const centerY = stage.top + stage.size * 0.5
      const boundaryRadius = stage.size * TRAPPED_DISC_RADIUS_RATIO
      const revealPath = buildDiscRevealPath(stage, formation)

      context!.save()
      context!.beginPath()
      context!.arc(centerX, centerY, boundaryRadius, 0, Math.PI * 2)
      context!.clip()
      context!.fillStyle = `rgb(${DISC_RGB})`
      context!.fill(revealPath)
      context!.restore()

      context!.save()
      context!.beginPath()
      context!.arc(centerX, centerY, boundaryRadius - stage.radius * 1.6, 0, Math.PI * 2)
      context!.clip()
      context!.clip(revealPath)

      particles.forEach((particle, index) => {
        const x = stage.left + particle.x * stage.size
        const y = stage.top + particle.y * stage.size
        const flicker = 0.90 + 0.10 * Math.sin(now * 0.0018 + index * 0.67)
        drawDot(x, y, stage.radius, flicker, particle.scale * 1.12, DISC_PARTICLE_RGB)
      })

      context!.restore()
    }

    function drawMarket(stage: Stage, alpha: number, now: number) {
      if (alpha < 0.002) return
      const beat = 0.86 + 0.14 * Math.sin(now * 0.0012)
      ACTIVE_FIVE.forEach(([row, col]) => {
        drawDot(stage.left + col * stage.step, stage.top + row * stage.step, stage.radius, alpha * beat, 1.7 + beat * 0.22)
      })
    }

    function drawCirculation(stage: Stage, alpha: number, now: number) {
      if (alpha < 0.002) return
      ROUTES.forEach((route, routeIndex) => {
        const head = ((now * 0.00018 + routeIndex * 0.31) % 1) * (route.length + 5) - 2
        route.forEach(([row, col], index) => {
          const wave = Math.exp(-Math.pow(index - head, 2) / 3.4)
          drawDot(stage.left + col * stage.step, stage.top + row * stage.step, stage.radius, alpha * (0.08 + wave * 0.92), 1 + wave * 0.68)
        })
      })
    }

    function drawStage(stage: Stage, progress: number, now: number, deltaSeconds: number) {
      drawIncoming(stage, progress)
      const formation = drawGridFormation(stage, progress)
      const internalAlpha = range(formation, 0.94, 1)

      if (stage.kind === 'trapped') drawTrapped(stage, formation, now, deltaSeconds)
      else if (stage.kind === 'market') drawMarket(stage, internalAlpha, now)
      else drawCirculation(stage, internalAlpha, now)
    }

    function drawFinalTail(progress: number) {
      const stage = stages[stages.length - 1]
      if (!stage) return
      const tail = range(progress, 0.96, 1)
      const fromY = stage.top + stage.size
      const toY = Math.min(height, fromY + viewportHeight * 0.38)
      const headY = fromY + (toY - fromY) * tail
      drawStreamSegment(stage.centerX, fromY, toY, stage.radius, stage.step, headY)
    }

    function draw(now: number) {
      const deltaSeconds = (now - lastFrame) / 1000
      lastFrame = now
      context!.clearRect(0, 0, width, height)

      stages.forEach(stage => drawStage(stage, stageProgress(stage), now, deltaSeconds))
      if (stages.length) drawFinalTail(stageProgress(stages[stages.length - 1]))
    }

    function frame(now: number) {
      draw(now)
      raf = requestAnimationFrame(frame)
    }

    function updateScroll() {
      scrollY = Math.max(0, window.scrollY)
    }

    let resizeTimer = 0
    function queueResize() {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        buildMetrics()
        updateScroll()
        draw(performance.now())
      }, 100)
    }

    function onReducedMotionChange() {
      buildMetrics()
      draw(performance.now())
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', queueResize)
    reducedMotion.addEventListener('change', onReducedMotionChange)

    // El alto real del contenedor puede cambiar sin un 'resize' de window (fuentes que
    // terminan de cargar, la barra de direcciones del navegador móvil apareciendo o
    // escondiéndose y afectando 100dvh). Sin esto, canvas.style.height puede quedar
    // desactualizado y el canvas "sangra" sobre el contenido que viene después.
    const resizeObserver = new ResizeObserver(queueResize)
    resizeObserver.observe(container)

    buildMetrics()
    updateScroll()

    if (reducedMotion.matches) {
      draw(performance.now())
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', queueResize)
      reducedMotion.removeEventListener('change', onReducedMotionChange)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fh-flow__canvas"
      aria-hidden="true"
      style={{ position: 'absolute', zIndex: 1, inset: 0, display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
