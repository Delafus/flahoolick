'use client'

import { useEffect, useRef } from 'react'

const GRID = 10
const COUNT = GRID * GRID
const BASE_DIAMETER = 3.4
const BASE_ALPHA = 0.34
const ACTIVE_COUNT = 30

/** Entrada de los puntos activos en el paso 01. */
const ENTRADA_MS = 480
/** Desfase entre la salida de un punto y el siguiente en el paso 02. */
const STAGGER_MS = 14
/** Lo que tarda cada punto en llegar a su destino. */
const VIAJE_MS = 850
/** Encendido de la grilla completa, una vez que llegaron todos. */
const ENCENDIDO_MS = 550

function hexToRgb(hex: string) {
  const m = hex.replace('#', '')
  const n = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/* Paso 03 — pulsos que se propagan.
   Cada pulso nace en un punto al azar y se expande como una onda circular.
   Al convivir varios, nacidos en momentos y lugares distintos, nunca se
   forma un frente único: es lo que evita que se lea como una ola. */
/** Cada cuánto nace un pulso nuevo. */
const PULSO_CADA_MS = 620
/** Lo que tarda un pulso en cruzar la grilla y apagarse. */
const PULSO_VIDA_MS = 2200
/** Radio final del pulso, en casillas. */
const PULSO_ALCANCE = 9
/** Grosor del anillo, en casillas. */
const PULSO_GROSOR = 1.15

interface Punto {
  x: number
  y: number
  row: number
  col: number
}

interface Particula {
  fase: number
  fase2: number
  vel: number
  vel2: number
  mezcla: number
  nitidez: number
  diametroPico: number
  destino: number
  delay: number
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/** Sobrepasa el tamaño final y vuelve: "crecen y se achican a su tamaño". */
function easeOutBack(t: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function barajar<T>(arr: T[]) {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Reparte destinos sobre la grilla completa: cada punto activo se va a una
 * casilla distinta y ninguno se queda donde estaba. Sortear sobre las 100
 * casillas (y no solo entre los activos) es lo que hace que el movimiento
 * se lea como redistribución y no como un barajado entre los mismos.
 */
function repartirDestinos(origenes: number[]) {
  const todos = Array.from({ length: COUNT }, (_, i) => i)
  const destinos = barajar(todos).slice(0, origenes.length)

  for (let pasada = 0; pasada < 4; pasada++) {
    let limpio = true
    for (let i = 0; i < destinos.length; i++) {
      if (destinos[i] === origenes[i]) {
        const j = (i + 1) % destinos.length
        ;[destinos[i], destinos[j]] = [destinos[j], destinos[i]]
        limpio = false
      }
    }
    if (limpio) break
  }
  return destinos
}

interface GrillaProcesoProps {
  /** Índice del acordeón abierto: -1 cerrado, 0 diagnóstico, 1 instalación, 2 operación. */
  abierto: number
  /** Color de los puntos. Default blanco (fondo oscuro). */
  color?: string
}

export function GrillaProceso({ abierto, color = '#ffffff' }: GrillaProcesoProps) {
  const { r, g, b } = hexToRgb(color)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // El paso vive en un ref para que el bucle de dibujo lo lea sin reiniciarse.
  const pasoRef = useRef(abierto + 1)
  const inicioPasoRef = useRef(0)
  const activosRef = useRef<number[]>([])
  const particulasRef = useRef<Particula[]>([])
  const pulsosRef = useRef<{ origen: number; inicio: number }[]>([])
  const proximoPulsoRef = useRef(0)
  // Permite repintar al cambiar de etapa aunque el bucle esté detenido
  // (fuera de pantalla o con prefers-reduced-motion).
  const dibujarRef = useRef<((now: number) => void) | null>(null)

  // Cambio de etapa: reinicia el reloj del paso y, al entrar a diagnóstico,
  // sortea una selección nueva de puntos.
  useEffect(() => {
    const paso = abierto + 1
    pasoRef.current = paso
    inicioPasoRef.current = performance.now()

    if (paso === 1) {
      const activos = barajar(Array.from({ length: COUNT }, (_, i) => i)).slice(0, ACTIVE_COUNT)
      activosRef.current = activos
      particulasRef.current = activos.map(() => ({
        fase: Math.random() * Math.PI * 2,
        fase2: Math.random() * Math.PI * 2,
        vel: 4 + Math.random() * 5,
        vel2: 7 + Math.random() * 7,
        mezcla: 0.28 + Math.random() * 0.44,
        nitidez: 1.7 + Math.random() * 2.1,
        diametroPico: 5.8 + Math.random() * 2.2,
        destino: 0,
        delay: 0,
      }))
    }

    if (paso === 2) {
      // Si se abrió instalación sin pasar por diagnóstico, hay que sortear.
      if (!activosRef.current.length) {
        const activos = barajar(Array.from({ length: COUNT }, (_, i) => i)).slice(0, ACTIVE_COUNT)
        activosRef.current = activos
        particulasRef.current = activos.map(() => ({
          fase: Math.random() * Math.PI * 2,
          fase2: Math.random() * Math.PI * 2,
          vel: 4 + Math.random() * 5,
          vel2: 7 + Math.random() * 7,
          mezcla: 0.5,
          nitidez: 2,
          diametroPico: 5.8 + Math.random() * 2.2,
          destino: 0,
          delay: 0,
        }))
      }
      const destinos = repartirDestinos(activosRef.current)
      const orden = barajar(activosRef.current.map((_, i) => i))
      particulasRef.current.forEach((p, i) => {
        p.destino = destinos[i]
        p.delay = orden.indexOf(i) * STAGGER_MS
      })
    }

    if (paso === 3) {
      // Arranca con un par de pulsos ya en camino, para que la operación
      // se vea en marcha desde el primer segundo y no haya que esperar.
      pulsosRef.current = [
        { origen: Math.floor(Math.random() * COUNT), inicio: -900 },
        { origen: Math.floor(Math.random() * COUNT), inicio: -1650 },
      ]
      proximoPulsoRef.current = 0
    }

    dibujarRef.current?.(performance.now())
  }, [abierto])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const contenedor = canvas.parentElement
    if (!contenedor) return

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

    function punto(x: number, y: number, diametro: number, alpha: number) {
      if (alpha <= 0 || diametro <= 0) return
      ctx!.beginPath()
      ctx!.arc(x, y, diametro / 2, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(${r},${g},${b},${clamp01(alpha)})`
      ctx!.fill()
    }

    function grillaBase(alpha: number) {
      puntos.forEach(p => punto(p.x, p.y, BASE_DIAMETER, alpha))
    }

    function dibujarDiagnostico(t: number) {
      grillaBase(BASE_ALPHA)
      const entrada = clamp01(t / ENTRADA_MS)
      const seg = t * 0.001

      activosRef.current.forEach((indice, i) => {
        const p = particulasRef.current[i]
        const g = puntos[indice]
        if (!p || !g) return

        const ondaA = 0.5 + 0.5 * Math.sin(seg * p.vel + p.fase)
        const ondaB = 0.5 + 0.5 * Math.sin(seg * p.vel2 + p.fase2)
        const mezcla = ondaA * p.mezcla + ondaB * (1 - p.mezcla)
        const brillo = Math.pow(clamp01(mezcla), p.nitidez)

        const minimo = 4.4
        const objetivo = minimo + brillo * (p.diametroPico - minimo)
        // Crece con rebote desde el tamaño de la grilla hasta el suyo.
        const diametro = BASE_DIAMETER + (objetivo - BASE_DIAMETER) * easeOutBack(entrada)
        const alpha = BASE_ALPHA + (0.46 + brillo * 0.54 - BASE_ALPHA) * easeOutCubic(entrada)

        punto(g.x, g.y, diametro, alpha)
      })
    }

    function dibujarInstalacion(t: number) {
      const ultimaLlegada = (activosRef.current.length - 1) * STAGGER_MS + VIAJE_MS
      // La grilla se mantiene al 20% durante todo el viaje y solo sube
      // cuando ya llegaron todos los puntos.
      const encendido = clamp01((t - ultimaLlegada) / ENCENDIDO_MS)
      grillaBase(BASE_ALPHA + (1 - BASE_ALPHA) * easeOutCubic(encendido))

      activosRef.current.forEach((indice, i) => {
        const p = particulasRef.current[i]
        const desde = puntos[indice]
        const hacia = puntos[p?.destino ?? indice]
        if (!p || !desde || !hacia) return

        const local = clamp01((t - p.delay) / VIAJE_MS)
        if (local >= 1) return

        const avance = easeInOutCubic(local)
        const x = desde.x + (hacia.x - desde.x) * avance
        const y = desde.y + (hacia.y - desde.y) * avance

        // Al llegar se funde: toma el tamaño y la opacidad de la grilla base.
        const fundido = easeOutCubic(clamp01((local - 0.75) / 0.25))
        const diametro = p.diametroPico + (BASE_DIAMETER - p.diametroPico) * fundido
        const alpha = 1 + (BASE_ALPHA - 1) * fundido

        punto(x, y, diametro, alpha)
      })
    }

    function dibujarOperacion(t: number) {
      const pulsos = pulsosRef.current

      // Si el bucle estuvo detenido, no acumula pulsos atrasados.
      if (t - proximoPulsoRef.current > PULSO_VIDA_MS * 2) proximoPulsoRef.current = t

      // Nace un pulso nuevo cada tanto, en una casilla al azar.
      while (t > proximoPulsoRef.current) {
        pulsos.push({ origen: Math.floor(Math.random() * COUNT), inicio: proximoPulsoRef.current })
        proximoPulsoRef.current += PULSO_CADA_MS
      }
      while (pulsos.length && t - pulsos[0].inicio > PULSO_VIDA_MS) pulsos.shift()

      // Al venir de la instalación la grilla está encendida; se apaga en un
      // segundo hasta el estado de reposo, para no cortar de golpe.
      const reposo = BASE_ALPHA + (1 - BASE_ALPHA) * clamp01(1 - t / 900)

      puntos.forEach(g => {
        let brillo = 0

        for (const pulso of pulsos) {
          const edad = (t - pulso.inicio) / PULSO_VIDA_MS
          if (edad < 0 || edad > 1) continue
          const origen = puntos[pulso.origen]
          if (!origen) continue

          const distancia = Math.hypot(g.col - origen.col, g.row - origen.row)
          const radio = easeOutCubic(edad) * PULSO_ALCANCE
          const cercania = 1 - Math.abs(distancia - radio) / PULSO_GROSOR
          if (cercania <= 0) continue

          // El anillo pierde fuerza a medida que se aleja del origen.
          brillo = Math.max(brillo, cercania * (1 - edad))
        }

        const pico = Math.pow(clamp01(brillo), 1.5)
        punto(
          g.x,
          g.y,
          BASE_DIAMETER * (0.95 + pico * 0.45),
          Math.max(reposo, BASE_ALPHA + pico * (1 - BASE_ALPHA)),
        )
      })
    }

    function dibujar(now: number) {
      ctx!.clearRect(0, 0, ancho, alto)
      const t = now - inicioPasoRef.current

      switch (pasoRef.current) {
        case 1: dibujarDiagnostico(t); break
        case 2: dibujarInstalacion(t); break
        case 3: dibujarOperacion(t); break
        default: grillaBase(BASE_ALPHA)
      }
    }

    function bucle(now: number) {
      if (!corriendo) return
      dibujar(now)
      raf = requestAnimationFrame(bucle)
    }

    medir()
    dibujar(performance.now())
    dibujarRef.current = dibujar

    const ro = new ResizeObserver(() => {
      medir()
      dibujar(performance.now())
    })
    ro.observe(contenedor)

    // Solo anima mientras está en pantalla.
    const io = new IntersectionObserver(entradas => {
      const visible = entradas[0]?.isIntersecting ?? false
      if (visible && !corriendo && !sinMovimiento) {
        corriendo = true
        raf = requestAnimationFrame(bucle)
      } else if (!visible && corriendo) {
        corriendo = false
        cancelAnimationFrame(raf)
      }
    }, { threshold: 0.01 })
    io.observe(contenedor)

    return () => {
      corriendo = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      dibujarRef.current = null
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
