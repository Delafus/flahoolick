'use client'

import { useEffect, useRef, useState } from 'react'

/** Regla 95:5 en 100 puntos (10×10). Los 5 de la derecha de la primera fila llevan un $: ya te compran y están quietos.
    Los otros 95 son pupilas que miran: siguen el mouse (o el dedo en el teléfono) y, si nadie interactúa,
    cada pocos segundos miran a uno de los compradores. Se mueven con inercia, cada una a su ritmo y con un vaivén propio.
    Con "reducir movimiento", todo queda quieto.
    La caja toma el ancho de su contenedor (en la home, el de la línea de la fuente). Los puntos y los $ tienen tamaño fijo
    en píxeles: al haber más ancho, la grilla se separa en vez de crecer. */

const COLUMNAS = 10
/** Tamaños fijos, en píxeles de pantalla. */
const PUPILA = 1.8
const COMPRADOR = 9.6
const SIGNO = 12.5
/** Cuánto se corre una pupila hacia donde mira. */
const MIRADA = 6
/** Ancho de partida (antes de medir), cercano al de la línea de la fuente. */
const ANCHO_INICIAL = 290
/** Índices de los compradores: los 5 de la derecha de la primera fila (como en el diseño de Figma). */
const COMPRADORES = [5, 6, 7, 8, 9]
const ES_COMPRADOR = new Set(COMPRADORES)
const PAUSA_SIN_USO = 3000
const CADA_MIRADA_SOLA = 3500
/** Inercia: fracción del camino que recorre cada pupila por cuadro (la primera la más rápida, la última la más lenta). */
const VELOCIDAD_MAX = 0.18
const VELOCIDAD_MIN = 0.012
/** Vaivén propio de cada pupila: cuánto se desvía (radianes) y a qué ritmo. */
const DISTRACCION_MIN = 0.12
const DISTRACCION_MAX = 0.55
const VAIVEN = 0.0015

/** Grilla repartida en el ancho: los bordes de la caja coinciden con los puntos de las orillas
    (a la izquierda el borde de las pupilas, arriba y a la derecha el borde de los compradores). */
function grilla(ancho: number) {
  const x0 = PUPILA
  const y0 = COMPRADOR
  const paso = (ancho - PUPILA - COMPRADOR) / (COLUMNAS - 1)
  const puntos = Array.from({ length: COLUMNAS * COLUMNAS }, (_, i) => ({
    x: x0 + (i % COLUMNAS) * paso,
    y: y0 + Math.floor(i / COLUMNAS) * paso,
  }))
  return { puntos, alto: y0 + (COLUMNAS - 1) * paso + PUPILA }
}

export function Grafico955({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement | null>(null)
  const pupilas = useRef<(SVGCircleElement | null)[]>([])
  const [ancho, setAncho] = useState(ANCHO_INICIAL)
  const { puntos, alto } = grilla(ancho)
  /** Las posiciones vigentes, para el cálculo de las miradas sin reiniciar el efecto. */
  const vigentes = useRef(puntos)
  vigentes.current = puntos

  // Mide el ancho real para repartir la grilla.
  useEffect(() => {
    const el = svg.current
    if (!el) return
    const medir = () => { const w = el.getBoundingClientRect().width; if (w > 0) setAncho(Math.round(w * 10) / 10) }
    medir()
    const obs = new ResizeObserver(medir)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = svg.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let objetivo: { x: number; y: number } | null = null
    let ultimoUso = 0

    // Inercia como el EyeGrid original: cada cuadro, cada pupila recorre solo una fracción de lo que le falta.
    // La fracción (velocidad) va en cadena, de la primera pupila (rápida) a la última (lenta), con un azar propio:
    // el grupo se mueve como una ola y ninguna igual a otra. Encima, cada una tiene un vaivén suave y desfasado.
    const total = vigentes.current.length
    const estado = vigentes.current.map((_, k) => ({
      x: 0, y: 0,
      velocidad: (VELOCIDAD_MAX - (k / (total - 1)) * (VELOCIDAD_MAX - VELOCIDAD_MIN)) * (0.8 + Math.random() * 0.4),
      distraccion: DISTRACCION_MIN + Math.random() * (DISTRACCION_MAX - DISTRACCION_MIN),
      fase: Math.random() * Math.PI * 2,
    }))

    let cuadro = 0
    const animar = (ahora: number) => {
      cuadro = requestAnimationFrame(animar)
      if (!objetivo) return
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      pupilas.current.forEach((p, k) => {
        if (!p) return
        const e = estado[k]
        const punto = vigentes.current[k]
        const dx = objetivo!.x - (r.left + punto.x)
        const dy = objetivo!.y - (r.top + punto.y)
        const angulo = Math.atan2(dy, dx) + Math.sin(ahora * VAIVEN + e.fase) * e.distraccion
        const m = Math.min(Math.hypot(dx, dy) * 0.1, MIRADA)
        e.x += (Math.cos(angulo) * m - e.x) * e.velocidad
        e.y += (Math.sin(angulo) * m - e.y) * e.velocidad
        p.style.transform = `translate(${e.x}px, ${e.y}px)`
      })
    }
    cuadro = requestAnimationFrame(animar)

    const alMover = (x: number, y: number) => { ultimoUso = Date.now(); objetivo = { x, y } }
    const conMouse = (e: PointerEvent) => { if (e.pointerType === 'mouse') alMover(e.clientX, e.clientY) }
    const conDedo = (e: TouchEvent) => { const t = e.touches[0]; if (t) alMover(t.clientX, t.clientY) }

    // Sin interacción: todas miran a uno de los compradores, cada vez a uno distinto.
    let turno = 0
    const mirarComprador = () => {
      const r = el.getBoundingClientRect()
      const comprador = vigentes.current[COMPRADORES[turno++ % COMPRADORES.length]]
      objetivo = { x: r.left + comprador.x, y: r.top + comprador.y }
    }
    mirarComprador()
    const mirarSolas = setInterval(() => { if (Date.now() - ultimoUso >= PAUSA_SIN_USO) mirarComprador() }, CADA_MIRADA_SOLA)

    window.addEventListener('pointermove', conMouse, { passive: true })
    window.addEventListener('touchstart', conDedo, { passive: true })
    window.addEventListener('touchmove', conDedo, { passive: true })
    return () => {
      clearInterval(mirarSolas)
      cancelAnimationFrame(cuadro)
      window.removeEventListener('pointermove', conMouse)
      window.removeEventListener('touchstart', conDedo)
      window.removeEventListener('touchmove', conDedo)
    }
  }, [])

  return (
    <svg ref={svg} viewBox={`0 0 ${ancho} ${alto}`} className={className} overflow="visible" role="img"
      aria-label="Cien puntos: cinco con signo peso, que ya compran, y noventa y cinco que miran.">
      {puntos.map((p, i) => ES_COMPRADOR.has(i) ? (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={COMPRADOR} fill="currentColor" />
          <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill="#ffffff"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: SIGNO }}>$</text>
        </g>
      ) : (
        <circle key={i} ref={c => { pupilas.current[i] = c }} cx={p.x} cy={p.y} r={PUPILA} fill="currentColor" />
      ))}
    </svg>
  )
}
