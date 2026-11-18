'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { VERDE } from './minimal'

/** Las tres etapas en la home con un gráfico de puntos que cambia con el scroll (versión simple, mientras llega el definitivo).
    Escritorio: gráfico fijo a la izquierda y etapas a la derecha; la etapa que está al centro de la pantalla manda.
    Teléfono: la sección queda fija en pantalla durante tres pantallas de scroll; arriba el gráfico a todo el ancho y abajo el texto
      de la etapa, que entra y sale con fade. Al subir, las etapas vuelven en orden inverso.
    Estados: 1 puntos dispersos con algunos hallazgos en verde; 2 los puntos se ordenan en grilla, en bloques de 2×2 que alternan verde y negro como un tablero;
    3 los puntos forman un círculo de anillos concéntricos; cada anillo gira en sentido contrario al anterior y a su propia velocidad,
      y los colores se intercalan desde afuera hacia adentro: negro, verde, negro, verde. */

export interface EtapaScroll {
  slug: string
  nombre: string
  texto: string
  recibes: string
}

const N = 64
const CENTRO = 150
const GRIS = '#403D37'
/** Alto del header fijo. */
const HEADER = 64

/** Pseudoaleatorio fijo, para que el servidor y el navegador dibujen lo mismo. */
function azar(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return Math.round((x - Math.floor(x)) * 1000) / 1000
}
const r1 = (n: number) => Math.round(n * 10) / 10

const DISPERSOS = Array.from({ length: N }, (_, i) => ({ x: r1(22 + azar(i + 1) * 256), y: r1(22 + azar(i + 101) * 256) }))
const GRILLA = Array.from({ length: N }, (_, i) => ({ x: 45 + (i % 8) * 30, y: 45 + Math.floor(i / 8) * 30 }))
const ANILLOS = [1, 6, 12, 18, 27]
const CIRCULO = (() => {
  const pos: { x: number; y: number }[] = []
  ANILLOS.forEach((cantidad, a) => {
    const radio = a * 27
    for (let k = 0; k < cantidad; k++) {
      const ang = (k / cantidad) * Math.PI * 2 + a * 0.4
      pos.push({ x: r1(CENTRO + radio * Math.cos(ang)), y: r1(CENTRO + radio * Math.sin(ang)) })
    }
  })
  return pos
})()

const POSICIONES = [DISPERSOS, GRILLA, CIRCULO]
/** Índices de los puntos de cada anillo, del centro hacia afuera. */
const RANGOS = ANILLOS.map((cantidad, a) => {
  const inicio = ANILLOS.slice(0, a).reduce((s, n) => s + n, 0)
  return Array.from({ length: cantidad }, (_, k) => inicio + k)
})
/** El anillo exterior gira en el sentido del reloj y cada uno hacia adentro, al revés del anterior.
    Cada anillo con su propia velocidad (segundos por vuelta, del centro hacia afuera). Las velocidades están elegidas para que
    la diferencia se vea en el recorrido de los puntos y no solo en los segundos: entre los dos anillos verdes, uno lento y uno rápido;
    entre los negros, igual. */
const DURACIONES = [60, 40, 12, 22, 120]
const giro = (a: number) => ({
  className: (ANILLOS.length - 1 - a) % 2 === 0 ? 'grafico-gira' : 'grafico-gira-inversa',
  duracion: `${DURACIONES[a]}s`,
})
const HALLAZGOS = new Set([3, 17, 26, 41, 50, 60])
/** Anillo (0 = centro) al que pertenece cada punto. */
const ANILLO_DE = ANILLOS.flatMap((cantidad, a) => Array.from({ length: cantidad }, () => a))
const verde = (estado: number, i: number) =>
  estado === 0 ? HALLAZGOS.has(i) : estado === 1 ? (Math.floor((i % 8) / 2) + Math.floor(i / 16)) % 2 === 1 : (ANILLOS.length - 1 - ANILLO_DE[i]) % 2 === 1

/** Movimiento permanente de cada punto, según el estado (el tercero ya se mueve con el giro de los anillos).
    Dispersos: cada punto flota a su ritmo y los hallazgos laten de vez en cuando.
    Grilla: una ola recorre los bloques de 2×2 en diagonal, encendiéndolos en secuencia. */
const vida = (estado: number, i: number) => {
  if (estado === 0) {
    const flota = `punto-flota ${r1(5 + azar(i + 201) * 4)}s ease-in-out -${r1(azar(i + 301) * 9)}s infinite`
    return HALLAZGOS.has(i) ? `${flota}, punto-late 4s ease-in-out -${r1(azar(i + 401) * 4)}s infinite` : flota
  }
  if (estado === 1) {
    const diagonal = Math.floor((i % 8) / 2) + Math.floor(i / 16)
    return `punto-ola 3.5s ease-in-out ${r1(diagonal * 0.25)}s infinite`
  }
  return undefined
}

/** `acento` reemplaza el verde de marca cuando el fondo no le da contraste (por ejemplo, sobre amarillo). */
export function GraficoEtapas({ estado, className, acento = VERDE }: { estado: number; className?: string; acento?: string }) {
  return (
    <svg viewBox="0 0 300 300" className={className} role="img"
      aria-label={['Puntos dispersos, algunos destacados', 'Puntos ordenados en una grilla', 'Puntos reunidos dentro de un círculo'][estado]}>
      {RANGOS.map((indices, a) => {
        const g = giro(a)
        return (
          <g key={a} className={estado === 2 ? g.className : undefined}
            style={{ transformOrigin: `${CENTRO}px ${CENTRO}px`, animationDuration: g.duracion }}>
            {indices.map(i => {
              const p = POSICIONES[estado][i]
              return (
                <g key={i} className="grafico-punto" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                  <circle cx={0} cy={0} r={1.6} className="grafico-relleno"
                    style={{ fill: verde(estado, i) ? acento : GRIS, animation: vida(estado, i) }} />
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

/** Número de etapa (01, 02, 03), grande en Bricolage. */
function Numero({ i, className }: { i: number; className: string }) {
  return (
    <p aria-hidden className={className}
      style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
      {String(i + 1).padStart(2, '0')}
    </p>
  )
}

/** `pie` va al final de la columna de textos (por ejemplo, el botón a la metodología). */
export function EtapasScroll({ etapas, pie, acento }: { etapas: EtapaScroll[]; pie?: ReactNode; acento?: string }) {
  const [activa, setActiva] = useState(0)
  /** Avance (0 a 1) dentro de la pista del teléfono, para la línea bajo el header. */
  const [avance, setAvance] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const pista = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Escritorio: manda la etapa cuyo centro está más cerca del centro de la pantalla.
    let cuadro = 0
    const medir = () => {
      cuadro = 0
      // Teléfono: la etapa sale del avance dentro de la pista (tercio a tercio).
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        const el = pista.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const recorrido = r.height - (window.innerHeight - HEADER)
        const a = recorrido > 0 ? Math.min(1, Math.max(0, (HEADER - r.top) / recorrido)) : 0
        setAvance(a)
        setActiva(Math.min(etapas.length - 1, Math.floor(a * etapas.length)))
        return
      }
      const centro = window.innerHeight / 2
      let mejor = 0, distancia = Infinity
      refs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - centro)
        if (d < distancia) { distancia = d; mejor = i }
      })
      setActiva(mejor)
    }
    const alMover = () => { if (!cuadro) cuadro = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', alMover, { passive: true })
    window.addEventListener('resize', alMover)
    return () => { window.removeEventListener('scroll', alMover); window.removeEventListener('resize', alMover); cancelAnimationFrame(cuadro) }
  }, [etapas.length])

  return (
    <>
    {/* Teléfono */}
    <div className="lg:hidden">
      <div ref={pista} style={{ height: `${etapas.length * 100}svh` }}>
        <div className="sticky flex flex-col justify-center gap-5"
          style={{ top: HEADER, height: `calc(100svh - ${HEADER}px)` }}>
          {/* Línea de avance pegada bajo el header, a todo el ancho de la pantalla. */}
          <div aria-hidden className="absolute top-0" style={{ left: 'calc(50% - 50vw)', width: '100vw', height: 3 }}>
            <div style={{ height: '100%', width: `${avance * 100}%`, backgroundColor: '#000000' }} />
          </div>
          <div className="mx-auto w-full" style={{ maxWidth: 'min(100%, 34svh)' }}>
            <GraficoEtapas estado={activa} className="w-full" acento={acento} />
          </div>
          <div className="grid">
            {etapas.map((e, i) => (
              <div key={e.slug} aria-hidden={i !== activa} className="flex flex-col gap-3"
                style={{ gridArea: '1 / 1', opacity: i === activa ? 1 : 0, transition: 'opacity 500ms ease', pointerEvents: i === activa ? 'auto' : 'none' }}>
                <Numero i={i} className="text-[3rem]" />
                <h3 className="text-[1.75rem]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                  <Link href={`/metodologia/${e.slug}`} tabIndex={i === activa ? undefined : -1}>{e.nombre}</Link>
                </h3>
                <p>{e.texto}</p>
                <p><span style={{ fontWeight: 500 }}>Recibes:</span> {e.recibes.charAt(0).toLowerCase() + e.recibes.slice(1)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {pie && <div className="mt-10 flex justify-center">{pie}</div>}
    </div>

    {/* Escritorio */}
    <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20">
      <div className="hidden lg:block">
        <div className="sticky" style={{ top: 'calc(50vh - 13rem)' }}>
          <GraficoEtapas estado={activa} className="w-full" acento={acento} />
        </div>
      </div>
      <div className="flex flex-col">
        {etapas.map((e, i) => (
          <div key={e.slug} ref={el => { refs.current[i] = el }} data-indice={i}
            className="flex flex-col justify-center gap-4 py-10 lg:min-h-[70vh] lg:py-0">
            <Numero i={i} className="text-[4.5rem]" />
            <h3 className="text-[1.75rem] md:text-[2.25rem]" style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              <Link href={`/metodologia/${e.slug}`} className="underline-offset-4 decoration-1 hover:underline">{e.nombre}</Link>
            </h3>
            <p>{e.texto}</p>
            <p><span style={{ fontWeight: 500 }}>Recibes:</span> {e.recibes.charAt(0).toLowerCase() + e.recibes.slice(1)}</p>
            {i === etapas.length - 1 && pie && <div className="mt-6">{pie}</div>}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
