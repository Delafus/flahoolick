'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'

/** Las tres etapas en la home con un gráfico de puntos que cambia con el scroll (versión simple, mientras llega el definitivo).
    Escritorio: todo en una pantalla, gráfico a la izquierda y las tres etapas a la derecha; el mouse elige y, si nadie interactúa, avanza solo.
    Teléfono: la sección queda fija en pantalla durante tres pantallas de scroll; arriba el gráfico a todo el ancho y abajo el texto
      de la etapa, que entra y sale con fade. Al subir, las etapas vuelven en orden inverso.
    Las piezas son conocimiento, no personas (los círculos del 95:5 son el mercado): cuadrados negros, el conocimiento en bruto;
    triángulos de color, lo que tiene valor.
    Estados: 1 todo suelto y girado, con los triángulos entre medio; 2 una grilla ordenada como un índice, con un triángulo al inicio
    de cada fila; 3 el escudo de Flahoolick al centro y cinco aros de una sola figura cada uno (cuadrados y triángulos alternados),
    cada aro al revés del anterior y a su propia velocidad. */

export interface EtapaScroll {
  slug: string
  nombre: string
  texto: string
  recibes: string
}

const N = 64
const CENTRO = 150
const NEGRO = '#000000'
/** Rojo de los triángulos (conocimiento con valor): el único color fuerte del gráfico. A prueba, de la referencia del usuario. */
const ROJO = '#E8432E'
/** Alto del header fijo. */
const HEADER = 64
/** Escritorio: milisegundos entre etapas cuando nadie interactúa. */
const AVANCE_SOLO = 5000
/** Piezas: los primeros 16 índices son triángulos (conocimiento con valor), los otros 48 cuadrados (información en bruto). */
const TRIANGULOS = 16
const esTriangulo = (i: number) => i < TRIANGULOS
/** Medio lado del cuadrado y medio largo del triángulo, en unidades del dibujo (300): chicos, en la escala de las pupilas del 95:5. */
const CUADRADO = 1.3
const TRIANGULO = 2
/** Orientación de los triángulos en las etapas 2 y 3: siempre con la punta hacia arriba (la figura base apunta a la derecha). */
const ARRIBA = -90

/** Pseudoaleatorio fijo, para que el servidor y el navegador dibujen lo mismo. */
function azar(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return Math.round((x - Math.floor(x)) * 1000) / 1000
}
const r1 = (n: number) => Math.round(n * 10) / 10

/** Posición, orientación y, en la etapa 2, el centro de la escuadra (para girarla como unidad). */
interface Pieza { x: number; y: number; giro: number; escuadra?: { x: number; y: number; n: number } }

/** 1 Encontramos: cuatro bloques sueltos (personas, documentos, reuniones, equipos técnicos). Cada uno es una malla de 4×4
    algo desordenada, con 4 triángulos escondidos entre 12 cuadrados. */
const BLOQUES = [{ x: 88, y: 84 }, { x: 214, y: 96 }, { x: 82, y: 210 }, { x: 206, y: 216 }]
const DISPERSOS: Pieza[] = (() => {
  const pos: Pieza[] = new Array(N)
  BLOQUES.forEach((b, c) => {
    const piezas = [...Array.from({ length: 4 }, (_, k) => 4 * c + k), ...Array.from({ length: 12 }, (_, k) => TRIANGULOS + 12 * c + k)]
    // Reparte las 16 piezas del bloque en sus 16 casillas en un orden fijo pero mezclado.
    const casillas = Array.from({ length: 16 }, (_, k) => k).sort((a, b) => azar(a + 31 * c + 7) - azar(b + 31 * c + 7))
    piezas.forEach((i, k) => {
      const casilla = casillas[k]
      pos[i] = {
        x: r1(b.x - 21 + (casilla % 4) * 14 + (azar(i + 1) - 0.5) * 7),
        y: r1(b.y - 21 + Math.floor(casilla / 4) * 14 + (azar(i + 101) - 0.5) * 7),
        giro: Math.round((azar(i + 501) - 0.5) * 70),
      }
    })
  })
  return pos
})()

/** 2 Ordenamos: grilla pareja de 8×8 (mismo espacio entre todas las piezas), leída como 16 escuadras de 2×2;
    4 escuadras de triángulos (en un patrón regular) y 12 de cuadrados. Cada pocos segundos, cada escuadra gira 90° como unidad. */
const ESCUADRAS_TRIANGULO = [1, 7, 8, 14]
const PASO = 30
const ENTRE = 2 * PASO
const INICIO = CENTRO - (3 * ENTRE + PASO) / 2
const GRILLA: Pieza[] = (() => {
  const pos: Pieza[] = new Array(N)
  let t = 0
  let q = TRIANGULOS
  for (let n = 0; n < 16; n++) {
    const fila = Math.floor(n / 4)
    const columna = n % 4
    const triangulos = ESCUADRAS_TRIANGULO.includes(n)
    const x0 = INICIO + columna * ENTRE
    const y0 = INICIO + fila * ENTRE
    const centro = { x: x0 + PASO / 2, y: y0 + PASO / 2, n }
    for (let k = 0; k < 4; k++) {
      const i = triangulos ? t++ : q++
      pos[i] = { x: x0 + (k % 2) * PASO, y: y0 + Math.floor(k / 2) * PASO, giro: triangulos ? ARRIBA : 0, escuadra: centro }
    }
  }
  return pos
})()

/** 3 Activamos: el escudo al centro y cinco aros alrededor, cada uno de una sola figura, alternando desde adentro:
    cuadrados, triángulos, cuadrados, triángulos, cuadrados. Los triángulos apuntan hacia afuera como las flechas del sello. */
const AROS: { radio: number; piezas: number[]; desfase: number }[] = (() => {
  const cua = (desde: number, cuantos: number) => Array.from({ length: cuantos }, (_, k) => TRIANGULOS + desde + k)
  const tri = (desde: number, cuantos: number) => Array.from({ length: cuantos }, (_, k) => desde + k)
  return [
    { radio: 46, piezas: cua(0, 10), desfase: 0 },
    { radio: 66, piezas: tri(0, 6), desfase: -Math.PI / 2 },
    { radio: 88, piezas: cua(10, 16), desfase: 0.2 },
    { radio: 110, piezas: tri(6, 10), desfase: -Math.PI / 2 + 0.3 },
    { radio: 132, piezas: cua(26, 22), desfase: 0.1 },
  ]
})()
const CIRCULO: Pieza[] = (() => {
  const pos: Pieza[] = new Array(N)
  AROS.forEach(a => a.piezas.forEach((i, k) => {
    const ang = (k / a.piezas.length) * Math.PI * 2 + a.desfase
    const grados = Math.round((ang * 180) / Math.PI)
    pos[i] = { x: r1(CENTRO + a.radio * Math.cos(ang)), y: r1(CENTRO + a.radio * Math.sin(ang)), giro: esTriangulo(i) ? ARRIBA : grados + 90 }
  }))
  return pos
})()

const POSICIONES = [DISPERSOS, GRILLA, CIRCULO]
/** Cada aro gira al revés del anterior y a una velocidad bien distinta de sus vecinos (segundos por vuelta, de adentro hacia afuera):
    así se lee que cada figura va por su lado. */
const DURACIONES = [20, 60, 32, 95, 48]
const giro = (n: number) => ({ className: n % 2 === 0 ? 'grafico-gira' : 'grafico-gira-inversa', duracion: `${DURACIONES[n]}s` })

/** Etapa 1: cada pieza flota a su ritmo, suave y sin latidos. */
const flota = (i: number) => `punto-flota ${r1(6 + azar(i + 201) * 5)}s ease-in-out -${r1(azar(i + 301) * 11)}s infinite`
/** Etapa 2: cada escuadra da cuartos de vuelta como unidad, en cadena por su número. */
const marcha = (n: number) => `escuadra-gira 14s cubic-bezier(0.65, 0, 0.35, 1) ${r1(n * 0.18)}s infinite`
/** Los triángulos de la escuadra giran al revés, al mismo ritmo: se trasladan con ella pero siguen apuntando hacia arriba. */
const contramarcha = (n: number) => `escuadra-contra 14s cubic-bezier(0.65, 0, 0.35, 1) ${r1(n * 0.18)}s infinite`

/** Escudo de Flahoolick (el mismo del sello), centrado y a escala del dibujo. */
const ESCUDO = 'M829.183 744.25C829.183 796.313 786.978 836.374 734.916 836.374C682.853 836.374 640.648 796.313 640.648 744.25V639.767H829.183V744.25Z'
const ESCALA_ESCUDO = 0.24

export function GraficoEtapas({ estado, className }: { estado: number; className?: string }) {
  /** El escudo ya apareció alguna vez: desde ahí, al salir de la etapa 3, se va girando. */
  const [escudoVisto, setEscudoVisto] = useState(false)
  useEffect(() => { if (estado === 2) setEscudoVisto(true) }, [estado])
  return (
    <svg viewBox="0 0 300 300" className={className} role="img"
      aria-label={[
        'Piezas repartidas en cuatro bloques sueltos; entre los cuadrados, algunos triángulos',
        'Las piezas ordenadas en escuadras de cuatro, como una formación vista desde arriba',
        'Las piezas en aros alrededor del escudo de Flahoolick, con los triángulos apuntando hacia afuera',
      ][estado]}>
      {/* El escudo entra y sale girando como un disco de Euler (ver .escudo-euler en globals.css).
          Antes de la primera vez que aparece, queda oculto sin animar. */}
      <g className={`escudo-giro ${estado === 2 ? 'escudo-aparece' : escudoVisto ? 'escudo-desaparece' : 'escudo-oculto'}`}>
        <path d={ESCUDO} fill={NEGRO}
          transform={`translate(${CENTRO} ${CENTRO}) scale(${ESCALA_ESCUDO}) translate(-734.9 -738)`} />
      </g>
      {AROS.map((a, n) => {
        const g = giro(n)
        return (
          <g key={n} className={estado === 2 ? g.className : undefined}
            style={{ transformOrigin: `${CENTRO}px ${CENTRO}px`, animationDuration: g.duracion }}>
            {a.piezas.map(i => {
              const p = POSICIONES[estado][i]
              const e = p.escuadra
              const forma = {
                rotate: `${p.giro}deg`, transition: 'rotate 900ms cubic-bezier(0.65, 0, 0.35, 1)',
                animation: estado === 0 ? flota(i) : e && esTriangulo(i) ? contramarcha(e.n) : undefined,
              }
              // Etapa 3: los triángulos giran sobre sí mismos al revés de su aro y a su misma velocidad (traslación sin rotación).
              const contraAro = estado === 2 && esTriangulo(i)
                ? { className: n % 2 === 0 ? 'grafico-gira-inversa' : 'grafico-gira', style: { transformOrigin: '0px 0px', animationDuration: g.duracion } }
                : null
              return (
                <g key={i} className="grafico-punto" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                  <g className={contraAro?.className}
                    style={e ? { transformOrigin: `${r1(e.x - p.x)}px ${r1(e.y - p.y)}px`, animation: marcha(e.n) } : contraAro?.style}>
                    {esTriangulo(i) ? (
                      <polygon className="grafico-relleno" fill={ROJO} style={forma}
                        points={`${TRIANGULO},0 ${-TRIANGULO * 0.8},${-TRIANGULO * 0.85} ${-TRIANGULO * 0.8},${TRIANGULO * 0.85}`} />
                    ) : (
                      <rect className="grafico-relleno" fill={NEGRO} style={forma}
                        x={-CUADRADO} y={-CUADRADO} width={CUADRADO * 2} height={CUADRADO * 2} />
                    )}
                  </g>
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
export function EtapasScroll({ etapas, pie }: { etapas: EtapaScroll[]; pie?: ReactNode }) {
  /** Teléfono: etapa activa y la que acaba de salir (para la animación de cambio). -1 = ninguna todavía. */
  const [cambio, setCambio] = useState({ activa: 0, anterior: -1 })
  const activa = cambio.activa
  const textos = useRef<HTMLDivElement | null>(null)
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
      const nueva = Math.min(etapas.length - 1, Math.floor(a * etapas.length))
      setCambio(c => (c.activa === nueva ? c : { activa: nueva, anterior: c.activa }))
    }
    const alMover = () => { if (!cuadro) cuadro = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', alMover, { passive: true })
    window.addEventListener('resize', alMover)
    return () => { window.removeEventListener('scroll', alMover); window.removeEventListener('resize', alMover); cancelAnimationFrame(cuadro) }
  }, [etapas.length])

  // Teléfono: numera las filas de cada párrafo (por la altura de cada palabra) para que giren en cascada.
  useLayoutEffect(() => {
    const el = textos.current
    if (!el) return
    const numerar = () => el.querySelectorAll('p').forEach(p => {
      let fila = 0
      let alto: number | null = null
      p.querySelectorAll<HTMLElement>('.palabra').forEach(w => {
        if (alto !== null && w.offsetTop > alto + 2) fila++
        alto = w.offsetTop
        w.style.setProperty('--fila', String(fila + 1))
      })
    })
    numerar()
    window.addEventListener('resize', numerar)
    return () => window.removeEventListener('resize', numerar)
  }, [])

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
          {/* Barra de avance negra, separada del header por una franja de amarillo, a todo el ancho de la pantalla. */}
          <div aria-hidden className="absolute" style={{ top: 8, left: 'calc(50% - 50vw)', width: '100vw', height: 4 }}>
            <div style={{ height: '100%', width: `${avance * 100}%`, backgroundColor: '#000000' }} />
          </div>
          <div className="mx-auto w-full" style={{ maxWidth: 'min(100%, 34svh)' }}>
            <GraficoEtapas estado={activa} className="w-full" />
          </div>
          {/* Textos apilados. Al cambiar de etapa, el que sale gira hacia arriba sobre su eje horizontal y el que entra llega
              girando desde abajo: el título como un bloque y el párrafo fila por fila, en cascada (como las filas de un cubo Rubik). */}
          <div ref={textos} className="grid">
            {etapas.map((e, i) => (
              <div key={e.slug} aria-hidden={i !== activa} className="volteo flex flex-col gap-3"
                data-estado={i === activa ? (cambio.anterior === -1 ? 'quieto' : 'entra') : i === cambio.anterior ? 'sale' : 'oculto'}
                style={{ gridArea: '1 / 1', pointerEvents: i === activa ? 'auto' : 'none' }}>
                <h3 className="voltea text-[1.75rem]" style={TITULO}>
                  <Link href={`/metodologia/${e.slug}`} tabIndex={i === activa ? undefined : -1}>{numero(i)} {e.nombre}</Link>
                </h3>
                <p>{e.texto.split(' ').map((palabra, k) => <span key={k}><span className="voltea palabra">{palabra}</span> </span>)}</p>
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
      <GraficoEtapas estado={elegida} className="w-full" />
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
