'use client'

import { useEffect, useRef, useState } from 'react'

/** Regla 95:5 en 100 puntos (10×10). Los 5 de la derecha de la primera fila llevan un $: ya te compran y están quietos.
    Los otros 95 son pupilas que miran: siguen el mouse (o el dedo en el teléfono) y, si nadie interactúa,
    cada pocos segundos miran juntas a uno de los compradores; además, siempre hay algunas distraídas mirando a otro lado.
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
/** Cada cuánto algunas pupilas se distraen y miran a cualquier lado. */
const CADA_DISTRAIDA = 260
const DISTRAIDAS = 4

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
    let cuadro = 0
    let ultimoUso = 0
    /** El gráfico está (al menos en parte) en pantalla. */
    const visible = () => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight }

    // Cada pupila con su carácter: se desvía un poco del objetivo, mira más o menos lejos y reacciona a su propio ritmo.
    const caracter = vigentes.current.map(() => ({ desvio: (Math.random() - 0.5) * 0.7, fuerza: 0.7 + Math.random() * 0.45 }))
    pupilas.current.forEach(p => {
      if (p) p.style.transition = `transform ${Math.round(140 + Math.random() * 460)}ms cubic-bezier(0.3, 0.7, 0.2, 1) ${Math.round(Math.random() * 140)}ms`
    })
    const correr = (p: SVGCircleElement, angulo: number, m: number) => {
      p.style.transform = `translate(${Math.cos(angulo) * m}px, ${Math.sin(angulo) * m}px)`
    }

    // Corre cada pupila hacia el objetivo (coordenadas de pantalla).
    const mirar = () => {
      cuadro = 0
      if (!objetivo) return
      const r = el.getBoundingClientRect()
      pupilas.current.forEach((p, k) => {
        if (!p) return
        const punto = vigentes.current[k]
        const dx = objetivo!.x - (r.left + punto.x)
        const dy = objetivo!.y - (r.top + punto.y)
        const d = Math.hypot(dx, dy) || 1
        correr(p, Math.atan2(dy, dx) + caracter[k].desvio, Math.min(MIRADA, d / 3) * caracter[k].fuerza)
      })
    }

    // Siempre hay algunas distraídas mirando a otro lado, para que el grupo nunca se vea quieto.
    const distraerse = setInterval(() => {
      if (!visible()) return
      for (let n = 0; n < DISTRAIDAS; n++) {
        const p = pupilas.current[Math.floor(Math.random() * vigentes.current.length)]
        if (p) correr(p, Math.random() * Math.PI * 2, MIRADA * (0.5 + Math.random() * 0.5))
      }
    }, CADA_DISTRAIDA)
    const pedirCuadro = () => { if (!cuadro) cuadro = requestAnimationFrame(mirar) }

    const alMover = (x: number, y: number) => {
      ultimoUso = Date.now()
      objetivo = { x, y }
      if (visible()) pedirCuadro()
    }
    const conMouse = (e: PointerEvent) => { if (e.pointerType === 'mouse') alMover(e.clientX, e.clientY) }
    const conDedo = (e: TouchEvent) => { const t = e.touches[0]; if (t) alMover(t.clientX, t.clientY) }

    // Sin interacción: todas miran a uno de los compradores, cada vez a uno distinto.
    let turno = 0
    const mirarSolas = setInterval(() => {
      if (!visible() || Date.now() - ultimoUso < PAUSA_SIN_USO) return
      const r = el.getBoundingClientRect()
      const comprador = vigentes.current[COMPRADORES[turno++ % COMPRADORES.length]]
      objetivo = { x: r.left + comprador.x, y: r.top + comprador.y }
      pedirCuadro()
    }, CADA_MIRADA_SOLA)

    window.addEventListener('pointermove', conMouse, { passive: true })
    window.addEventListener('touchstart', conDedo, { passive: true })
    window.addEventListener('touchmove', conDedo, { passive: true })
    return () => {
      clearInterval(mirarSolas)
      clearInterval(distraerse)
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
          <circle cx={p.x} cy={p.y} r={COMPRADOR} fill="#000000" />
          <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill="#ffffff"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: SIGNO }}>$</text>
        </g>
      ) : (
        <circle key={i} ref={c => { pupilas.current[i] = c }} cx={p.x} cy={p.y} r={PUPILA} fill="#000000" />
      ))}
    </svg>
  )
}
