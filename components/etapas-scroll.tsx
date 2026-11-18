'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { VERDE } from './minimal'

/** Las tres etapas en la home con un gráfico de puntos que cambia con el scroll (versión simple, mientras llega el definitivo).
    Escritorio: todo en una pantalla, gráfico a la izquierda y las tres etapas a la derecha; el mouse elige y, si nadie interactúa, avanza solo.
    Teléfono: la sección queda fija en pantalla durante tres pantallas de scroll; arriba el gráfico a todo el ancho y abajo el texto
      de la etapa, que entra y sale con fade. Al subir, las etapas vuelven en orden inverso.
    Las piezas son conocimiento, no personas (los círculos del 95:5 son el mercado): cuadrados negros, el conocimiento en bruto;
    triángulos de color, lo que tiene valor.
    Estados: 1 todo suelto y girado, con los triángulos entre medio; 2 una grilla ordenada como un índice, con un triángulo al inicio
    de cada fila; 3 el escudo de Flahoolick al centro, los cuadrados en anillos que giran a su alrededor (cada uno al revés del anterior)
    y los 8 triángulos afuera, apuntando hacia afuera como las flechas del sello. */

export interface EtapaScroll {
  slug: string
  nombre: string
  texto: string
  recibes: string
}

const N = 64
const CENTRO = 150
const NEGRO = '#000000'
/** Alto del header fijo. */
const HEADER = 64
/** Escritorio: milisegundos entre etapas cuando nadie interactúa. */
const AVANCE_SOLO = 5000
/** Piezas: los primeros 8 índices son triángulos (lo que tiene valor), el resto cuadrados (el conocimiento en bruto). */
const TRIANGULOS = 8
const esTriangulo = (i: number) => i < TRIANGULOS
/** Medio lado del cuadrado y medio largo del triángulo, en unidades del dibujo (300). */
const CUADRADO = 1.5
const TRIANGULO = 2.4

/** Pseudoaleatorio fijo, para que el servidor y el navegador dibujen lo mismo. */
function azar(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return Math.round((x - Math.floor(x)) * 1000) / 1000
}
const r1 = (n: number) => Math.round(n * 10) / 10

interface Pieza { x: number; y: number; giro: number }

/** 1 Encontramos: todo suelto y girado al azar; los triángulos (hallazgos) entre medio. */
const DISPERSOS: Pieza[] = Array.from({ length: N }, (_, i) => ({
  x: r1(22 + azar(i + 1) * 256), y: r1(22 + azar(i + 101) * 256), giro: Math.round(azar(i + 501) * 360),
}))

/** 2 Ordenamos: grilla de 8×8 como un índice; los triángulos en la primera columna, apuntando a su fila. */
const GRILLA: Pieza[] = Array.from({ length: N }, (_, i) => {
  const fila = esTriangulo(i) ? i : Math.floor((i - TRIANGULOS) / 7)
  const columna = esTriangulo(i) ? 0 : 1 + ((i - TRIANGULOS) % 7)
  return { x: 45 + columna * 30, y: 45 + fila * 30, giro: 0 }
})

/** 3 Activamos: el escudo al centro, los cuadrados en anillos a su alrededor y los 8 triángulos afuera,
    apuntando hacia afuera como las flechas del sello. */
const ANILLOS = [
  { radio: 136, cantidad: TRIANGULOS, triangulos: true },
  { radio: 62, cantidad: 14, triangulos: false },
  { radio: 86, cantidad: 18, triangulos: false },
  { radio: 110, cantidad: 24, triangulos: false },
]
const CIRCULO: Pieza[] = (() => {
  const pos: Pieza[] = []
  ANILLOS.forEach((a, n) => {
    for (let k = 0; k < a.cantidad; k++) {
      const ang = (k / a.cantidad) * Math.PI * 2 + (a.triangulos ? -Math.PI / 2 : n * 0.4)
      const grados = Math.round((ang * 180) / Math.PI)
      pos.push({ x: r1(CENTRO + a.radio * Math.cos(ang)), y: r1(CENTRO + a.radio * Math.sin(ang)), giro: a.triangulos ? grados : grados + 90 })
    }
  })
  return pos
})()

const POSICIONES = [DISPERSOS, GRILLA, CIRCULO]
/** Índices de las piezas de cada anillo (el primero, los triángulos). */
const RANGOS = ANILLOS.map((a, n) => {
  const inicio = ANILLOS.slice(0, n).reduce((s, b) => s + b.cantidad, 0)
  return Array.from({ length: a.cantidad }, (_, k) => inicio + k)
})
/** Cada anillo gira al revés del anterior y a su propia velocidad (segundos por vuelta). Los triángulos, lentos. */
const DURACIONES = [90, 40, 22, 60]
const giro = (n: number) => ({ className: n % 2 === 0 ? 'grafico-gira' : 'grafico-gira-inversa', duracion: `${DURACIONES[n]}s` })

/** Movimiento permanente de cada pieza, según el estado (el tercero ya se mueve con el giro de los anillos).
    Sueltas: cada pieza flota a su ritmo y los triángulos laten de vez en cuando.
    Grilla: una ola recorre las filas en diagonal. */
const vida = (estado: number, i: number) => {
  if (estado === 0) {
    const flota = `punto-flota ${r1(5 + azar(i + 201) * 4)}s ease-in-out -${r1(azar(i + 301) * 9)}s infinite`
    return esTriangulo(i) ? `${flota}, punto-late 4s ease-in-out -${r1(azar(i + 401) * 4)}s infinite` : flota
  }
  if (estado === 1) {
    const p = GRILLA[i]
    const diagonal = Math.round((p.x - 45) / 30) + Math.round((p.y - 45) / 30)
    return `punto-ola 3.5s ease-in-out ${r1(diagonal * 0.18)}s infinite`
  }
  return undefined
}

/** Escudo de Flahoolick (el mismo del sello), centrado y a escala del dibujo. */
const ESCUDO = 'M829.183 744.25C829.183 796.313 786.978 836.374 734.916 836.374C682.853 836.374 640.648 796.313 640.648 744.25V639.767H829.183V744.25Z'
const ESCALA_ESCUDO = 0.3

/** `acento` es el color de los triángulos (por defecto el verde de marca; sobre amarillo, uno con más contraste). */
export function GraficoEtapas({ estado, className, acento = VERDE }: { estado: number; className?: string; acento?: string }) {
  return (
    <svg viewBox="0 0 300 300" className={className} role="img"
      aria-label={[
        'Piezas sueltas y desordenadas; algunas, triángulos, destacan',
        'Las piezas ordenadas en una grilla, con los triángulos al inicio de cada fila',
        'Las piezas en anillos alrededor del escudo de Flahoolick, con los triángulos apuntando hacia afuera',
      ][estado]}>
      <path d={ESCUDO} fill={NEGRO}
        transform={`translate(${CENTRO} ${CENTRO}) scale(${ESCALA_ESCUDO}) translate(-734.9 -738)`}
        style={{ opacity: estado === 2 ? 1 : 0, transition: 'opacity 700ms ease' }} />
      {RANGOS.map((indices, n) => {
        const g = giro(n)
        return (
          <g key={n} className={estado === 2 ? g.className : undefined}
            style={{ transformOrigin: `${CENTRO}px ${CENTRO}px`, animationDuration: g.duracion }}>
            {indices.map(i => {
              const p = POSICIONES[estado][i]
              const estilo = { rotate: `${p.giro}deg`, transition: 'fill 600ms ease, rotate 900ms cubic-bezier(0.65, 0, 0.35, 1)', animation: vida(estado, i) }
              return (
                <g key={i} className="grafico-punto" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                  {esTriangulo(i) ? (
                    <polygon className="grafico-relleno" fill={acento} style={estilo}
                      points={`${TRIANGULO},0 ${-TRIANGULO * 0.8},${-TRIANGULO * 0.85} ${-TRIANGULO * 0.8},${TRIANGULO * 0.85}`} />
                  ) : (
                    <rect className="grafico-relleno" fill={NEGRO} style={estilo}
                      x={-CUADRADO} y={-CUADRADO} width={CUADRADO * 2} height={CUADRADO * 2} />
                  )}
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

/** Título de etapa: número y nombre en la misma línea y la misma letra (Bricolage 800). */
const TITULO = { fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' } as const
const numero = (i: number) => String(i + 1).padStart(2, '0')

/** `pie` va al final de la columna de textos (por ejemplo, el botón a la metodología). */
export function EtapasScroll({ etapas, pie, acento }: { etapas: EtapaScroll[]; pie?: ReactNode; acento?: string }) {
  const [activa, setActiva] = useState(0)
  /** Avance (0 a 1) dentro de la pista del teléfono, para la línea bajo el header. */
  const [avance, setAvance] = useState(0)
  /** Escritorio: etapa activa (por el mouse, el teclado o el avance solo) y si el usuario la está eligiendo. */
  const [elegida, setElegida] = useState(0)
  const [eligiendo, setEligiendo] = useState(false)
  const [visible, setVisible] = useState(false)
  const pista = useRef<HTMLDivElement | null>(null)
  const bloque = useRef<HTMLDivElement | null>(null)

  // Teléfono: la etapa sale del avance dentro de la pista (tercio a tercio).
  useEffect(() => {
    let cuadro = 0
    const medir = () => {
      cuadro = 0
      const el = pista.current
      if (!el || window.matchMedia('(min-width: 1024px)').matches) return
      const r = el.getBoundingClientRect()
      const recorrido = r.height - (window.innerHeight - HEADER)
      const a = recorrido > 0 ? Math.min(1, Math.max(0, (HEADER - r.top) / recorrido)) : 0
      setAvance(a)
      setActiva(Math.min(etapas.length - 1, Math.floor(a * etapas.length)))
    }
    const alMover = () => { if (!cuadro) cuadro = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', alMover, { passive: true })
    window.addEventListener('resize', alMover)
    return () => { window.removeEventListener('scroll', alMover); window.removeEventListener('resize', alMover); cancelAnimationFrame(cuadro) }
  }, [etapas.length])

  // Escritorio: el bloque avanza solo mientras está en pantalla y nadie lo está eligiendo.
  useEffect(() => {
    const el = bloque.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!visible || eligiendo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setElegida(i => (i + 1) % etapas.length), AVANCE_SOLO)
    return () => clearInterval(t)
  }, [visible, eligiendo, etapas.length])

  return (
    <>
    {/* Teléfono */}
    <div className="lg:hidden">
      <div ref={pista} style={{ height: `${etapas.length * 100}svh` }}>
        <div className="sticky flex flex-col justify-center gap-5"
          style={{ top: HEADER, height: `calc(100svh - ${HEADER}px)` }}>
          {/* Línea de avance pegada bajo el header, a todo el ancho de la pantalla. */}
          <div aria-hidden className="absolute top-0" style={{ left: 'calc(50% - 50vw)', width: '100vw', height: 3 }}>
            <div style={{ height: '100%', width: `${avance * 100}%`, backgroundColor: VERDE }} />
          </div>
          <div className="mx-auto w-full" style={{ maxWidth: 'min(100%, 34svh)' }}>
            <GraficoEtapas estado={activa} className="w-full" acento={acento} />
          </div>
          <div className="grid">
            {etapas.map((e, i) => (
              <div key={e.slug} aria-hidden={i !== activa} className="flex flex-col gap-3"
                style={{ gridArea: '1 / 1', opacity: i === activa ? 1 : 0, transition: 'opacity 500ms ease', pointerEvents: i === activa ? 'auto' : 'none' }}>
                <h3 className="text-[1.75rem]" style={TITULO}>
                  <Link href={`/metodologia/${e.slug}`} tabIndex={i === activa ? undefined : -1}>{numero(i)} {e.nombre}</Link>
                </h3>
                <p>{e.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {pie && <div className="mt-10 flex justify-center">{pie}</div>}
    </div>

    {/* Escritorio: las tres etapas en una pantalla; al pasar el mouse (o con tab) por una etapa, el gráfico cambia.
        Sin interacción, avanza solo. La etapa activa lleva el listón negro a la izquierda. */}
    <div ref={bloque} className="hidden items-center gap-16 lg:grid lg:grid-cols-[5fr_7fr]">
      <GraficoEtapas estado={elegida} className="w-full" acento={acento} />
      <div className="flex flex-col"
        onMouseEnter={() => setEligiendo(true)} onMouseLeave={() => setEligiendo(false)}
        onFocus={() => setEligiendo(true)} onBlur={() => setEligiendo(false)}>
        {etapas.map((e, i) => (
          <div key={e.slug} onMouseEnter={() => setElegida(i)} onFocus={() => setElegida(i)}
            className="relative flex flex-col gap-2 py-5 pl-7">
            {/* Listón de la etapa activa: solo del alto del texto, sin el aire de arriba y abajo. */}
            <span aria-hidden className="absolute left-0 top-5 bottom-5 w-1"
              style={{ backgroundColor: '#000000', opacity: i === elegida ? 1 : 0, transition: 'opacity 300ms ease' }} />
            <h3 className="text-[2rem]" style={TITULO}>
              <Link href={`/metodologia/${e.slug}`}>{numero(i)} {e.nombre}</Link>
            </h3>
            <p className="text-base">{e.texto}</p>
          </div>
        ))}
        {pie && <div className="mt-6 pl-7">{pie}</div>}
      </div>
    </div>
    </>
  )
}
