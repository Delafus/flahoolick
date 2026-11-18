'use client'

import { useEffect, useRef } from 'react'

/** Regla 95:5 en 100 puntos (10×10). Los 5 de la derecha de la primera fila llevan un $: ya te compran y están quietos.
    Los otros 95 son pupilas que miran: siguen el mouse (o el dedo en el teléfono) y, si nadie interactúa,
    cada pocos segundos miran juntas a uno de los compradores. Con "reducir movimiento", todo queda quieto.
    Tamaño contenido a propósito: el gráfico acompaña al texto, no lo tapa. */

const COLUMNAS = 10
const CELDA = 24
const LADO = COLUMNAS * CELDA
/** Índices de los compradores: los 5 de la derecha de la primera fila (como en el diseño de Figma). */
const COMPRADORES = [5, 6, 7, 8, 9]
const ES_COMPRADOR = new Set(COMPRADORES)
/** Cuánto se corre una pupila hacia donde mira (en unidades del dibujo). */
const MIRADA = 5.5
const PAUSA_SIN_USO = 3000
const CADA_MIRADA_SOLA = 3500
/** Cada cuánto algunas pupilas se distraen y miran a cualquier lado. */
const CADA_DISTRAIDA = 260
const DISTRAIDAS = 4

const PUNTOS = Array.from({ length: COLUMNAS * COLUMNAS }, (_, i) => ({
  x: CELDA / 2 + (i % COLUMNAS) * CELDA,
  y: CELDA / 2 + Math.floor(i / COLUMNAS) * CELDA,
}))

export function Grafico955({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement | null>(null)
  const pupilas = useRef<(SVGCircleElement | null)[]>([])

  useEffect(() => {
    const el = svg.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let objetivo: { x: number; y: number } | null = null
    let cuadro = 0
    let ultimoUso = 0
    /** El gráfico está (al menos en parte) en pantalla. */
    const visible = () => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight }

    // Cada pupila con su carácter: se desvía un poco del objetivo, mira más o menos lejos y reacciona a su propio ritmo.
    const caracter = PUNTOS.map(() => ({ desvio: (Math.random() - 0.5) * 0.7, fuerza: 0.7 + Math.random() * 0.45 }))
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
      const escala = r.width / LADO
      pupilas.current.forEach((p, k) => {
        if (!p) return
        const punto = PUNTOS[k]
        const dx = objetivo!.x - (r.left + punto.x * escala)
        const dy = objetivo!.y - (r.top + punto.y * escala)
        const d = Math.hypot(dx, dy) || 1
        correr(p, Math.atan2(dy, dx) + caracter[k].desvio, Math.min(MIRADA, d / (escala * 3)) * caracter[k].fuerza)
      })
    }

    // Siempre hay algunas distraídas mirando a otro lado, para que el grupo nunca se vea quieto.
    const distraerse = setInterval(() => {
      if (!visible()) return
      for (let n = 0; n < DISTRAIDAS; n++) {
        const k = Math.floor(Math.random() * PUNTOS.length)
        const p = pupilas.current[k]
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
      const escala = r.width / LADO
      const comprador = PUNTOS[COMPRADORES[turno++ % COMPRADORES.length]]
      objetivo = { x: r.left + comprador.x * escala, y: r.top + comprador.y * escala }
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
    <svg ref={svg} viewBox={`0 0 ${LADO} ${LADO}`} className={className} role="img"
      aria-label="Cien puntos: cinco con signo peso, que ya compran, y noventa y cinco que miran.">
      {PUNTOS.map((p, i) => ES_COMPRADOR.has(i) ? (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={8.5} fill="#000000" />
          <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fill="#ffffff"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 400, fontSize: 11 }}>$</text>
        </g>
      ) : (
        <circle key={i} ref={c => { pupilas.current[i] = c }} cx={p.x} cy={p.y} r={1.6} fill="#000000" />
      ))}
    </svg>
  )
}
