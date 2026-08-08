type PatternName =
  | 'constelaciones'
  | 'mapa'
  | 'convergencia'
  | 'cadencia'
  | 'malla'
  | 'captura'
  | 'pieza'
  | 'ondas'
  | 'origen'

interface DotPatternProps {
  pattern: PatternName
  color?: string
  accentColor?: string
}

const SIZE = 300
const R = 2.6

function seeded(seed: number) {
  // PRNG determinístico (mulberry32) — mismo patrón en cada render, sin parpadeo en hidratación.
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function Dot({ x, y, r = R, color = '#000000', opacity = 1, still = false }: { x: number; y: number; r?: number; color?: string; opacity?: number; still?: boolean }) {
  if (still) return <circle cx={x} cy={y} r={r} fill={color} opacity={opacity} />
  // Respiración de opacidad + tamaño, amplitud grande a propósito para que se note de inmediato — mismas propiedades permitidas (alfa, radio), sin trazo.
  const dur = 1.8 + ((x * 7 + y * 13) % 21) / 10
  const delay = ((x * 3 + y * 11) % 28) / 10
  const lo = Math.max(0.05, opacity - 0.55)
  const hi = Math.min(1, opacity + 0.25)
  const rLo = r * 0.55
  const rHi = r * 1.7
  return (
    <circle cx={x} cy={y} r={r} fill={color} opacity={opacity}>
      <animate attributeName="opacity" values={`${opacity};${hi};${lo};${opacity}`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="r" values={`${r};${rHi};${rLo};${r}`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
  )
}

/** Puntos interpolados entre a y b — así se lee una "línea" sin dibujar una: son puntos por proximidad. */
function pointsAlong(a: { x: number; y: number }, b: { x: number; y: number }, count: number) {
  const pts: { x: number; y: number; t: number }[] = []
  for (let i = 0; i <= count; i++) {
    const t = i / count
    pts.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, t })
  }
  return pts
}

/** Ilustraciones estáticas del sistema de dots — una por página, cada una con su propio significado. Solo GrillaProceso (Metodología) está animada. */
export function DotPattern({ pattern, color = '#000000', accentColor = '#1FDE91' }: DotPatternProps) {
  const rnd = seeded(pattern.length * 97)

  const els: React.ReactNode[] = []

  if (pattern === 'constelaciones') {
    // 4 disciplinas = 4 mini-grillas separadas sobre el mismo campo, no scatter random.
    const centers = [
      { cx: 90, cy: 90 }, { cx: 210, cy: 90 },
      { cx: 90, cy: 210 }, { cx: 210, cy: 210 },
    ]
    const sub = 5
    const cell = 15
    centers.forEach((c, ci) => {
      const half = ((sub - 1) * cell) / 2
      for (let row = 0; row < sub; row++) {
        for (let col = 0; col < sub; col++) {
          if (rnd() < 0.35) continue // densidad ~65%, no la grilla completa
          const x = c.cx - half + col * cell
          const y = c.cy - half + row * cell
          els.push(<Dot key={`${ci}-${row}-${col}`} x={x} y={y} color={color} opacity={0.35 + rnd() * 0.5} />)
        }
      }
    })
  }

  if (pattern === 'mapa') {
    // Ruta con ramificaciones — la línea la lee el ojo por proximidad de puntos encendidos, ninguna se dibuja.
    const tronco = [
      { x: 40, y: 240 }, { x: 90, y: 210 }, { x: 130, y: 170 }, { x: 170, y: 150 }, { x: 230, y: 110 }, { x: 270, y: 70 },
    ]
    const rama1 = [{ x: 130, y: 170 }, { x: 110, y: 110 }, { x: 140, y: 60 }]
    const rama2 = [{ x: 230, y: 110 }, { x: 265, y: 160 }]
    const paths: { pts: typeof tronco; fade: boolean }[] = [
      { pts: tronco, fade: false },
      { pts: rama1, fade: true },
      { pts: rama2, fade: true },
    ]
    paths.forEach(({ pts, fade }, pi) => {
      for (let i = 0; i < pts.length - 1; i++) {
        const seg = pointsAlong(pts[i], pts[i + 1], 5)
        seg.forEach((p, si) => {
          if (si === 0 && i > 0) return // no duplicar el punto de unión
          const distFromStart = i + p.t
          const decay = fade ? Math.max(0.15, 1 - distFromStart / (pts.length - 1)) : 1
          els.push(<Dot key={`${pi}-${i}-${si}`} x={p.x} y={p.y} r={si === 0 || si === seg.length - 1 ? R : R * 0.7} color={color} opacity={0.75 * decay} />)
        })
      }
    })
  }

  if (pattern === 'convergencia') {
    // Puntos periféricos orbitando un punto central más grande.
    els.push(<Dot key="centro" x={SIZE / 2} y={SIZE / 2} r={8} color={color} opacity={0.9} />)
    const rings = [55, 85, 115]
    rings.forEach((radius, ri) => {
      const count = 6 + ri * 4
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + ri * 0.3
        els.push(<Dot key={`${ri}-${i}`} x={SIZE / 2 + Math.cos(a) * radius} y={SIZE / 2 + Math.sin(a) * radius} color={color} opacity={0.25 + rnd() * 0.35} />)
      }
    })
  }

  if (pattern === 'cadencia') {
    // Filas ordenadas de puntos saliendo por el borde derecho (algunas se cortan).
    const rows = 6
    const cols = 8
    const gap = 30
    const startX = 20
    const startY = 40
    for (let row = 0; row < rows; row++) {
      const offset = row % 2 === 0 ? 0 : gap / 2
      for (let col = 0; col < cols; col++) {
        const x = startX + offset + col * gap
        if (x > SIZE - 5) continue
        const fade = x > SIZE - 60 ? 1 - (x - (SIZE - 60)) / 60 : 1
        els.push(<Dot key={`${row}-${col}`} x={x} y={startY + row * gap} color={color} opacity={0.25 + fade * 0.4} />)
      }
    }
  }

  if (pattern === 'malla') {
    // Grilla 10x10 perfecta, con algunos puntos en verde Flahoolick.
    const grid = 10
    const pad = 24
    const step = (SIZE - pad * 2) / (grid - 1)
    const accentIdx = new Set<number>()
    while (accentIdx.size < 7) accentIdx.add(Math.floor(rnd() * grid * grid))
    let idx = 0
    for (let row = 0; row < grid; row++) {
      for (let col = 0; col < grid; col++) {
        const isAccent = accentIdx.has(idx)
        els.push(<Dot key={idx} x={pad + col * step} y={pad + row * step} color={isAccent ? accentColor : color} opacity={isAccent ? 0.9 : 0.3} />)
        idx++
      }
    }
  }

  if (pattern === 'captura') {
    // Puntos dispersos convergiendo hacia un colector — la trayectoria se lee por puntos intermedios, sin trazo.
    const colector = { x: SIZE - 60, y: SIZE / 2 }
    for (let i = 0; i < 14; i++) {
      const origen = { x: rnd() * (SIZE - 90), y: rnd() * SIZE }
      const seg = pointsAlong(origen, colector, 6)
      seg.forEach((p, si) => {
        const isSource = si === 0
        els.push(<Dot key={`${i}-${si}`} x={p.x} y={p.y} r={isSource ? 1.8 : 1.1} color={color} opacity={isSource ? 0.55 : 0.12 + p.t * 0.15} />)
      })
    }
    els.push(<Dot key="colector" x={colector.x} y={colector.y} r={7} color={color} opacity={0.9} />)
  }

  if (pattern === 'pieza') {
    // Puntos alineados formando un rectángulo 16:9.
    const w = 220
    const h = w * (9 / 16)
    const x0 = (SIZE - w) / 2
    const y0 = (SIZE - h) / 2
    const perSideTop = 10
    const perSideSide = 5
    for (let i = 0; i <= perSideTop; i++) {
      const x = x0 + (w / perSideTop) * i
      els.push(<Dot key={`t-${i}`} x={x} y={y0} color={color} opacity={0.6} />)
      els.push(<Dot key={`b-${i}`} x={x} y={y0 + h} color={color} opacity={0.6} />)
    }
    for (let i = 1; i < perSideSide; i++) {
      const y = y0 + (h / perSideSide) * i
      els.push(<Dot key={`l-${i}`} x={x0} y={y} color={color} opacity={0.6} />)
      els.push(<Dot key={`r-${i}`} x={x0 + w} y={y} color={color} opacity={0.6} />)
    }
  }

  if (pattern === 'ondas') {
    // Ondas concéntricas (dots a lo largo de circunferencias) desde 2-3 orígenes.
    const origenes = [{ x: 90, y: 150 }, { x: 210, y: 100 }, { x: 190, y: 220 }]
    origenes.forEach((o, oi) => {
      els.push(<Dot key={`o-${oi}`} x={o.x} y={o.y} r={3.4} color={color} opacity={0.9} />)
      const rings = [22, 42, 62]
      rings.forEach((radius, ri) => {
        const count = 10 + ri * 4
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2
          const x = o.x + Math.cos(a) * radius
          const y = o.y + Math.sin(a) * radius
          if (x < 0 || x > SIZE || y < 0 || y > SIZE) continue
          els.push(<Dot key={`${oi}-${ri}-${i}`} x={x} y={y} r={1.6} color={color} opacity={0.35 - ri * 0.08} />)
        }
      })
    })
  }

  if (pattern === 'origen') {
    // Un punto latiendo en la esquina de una grilla vacía. El pulso son los propios puntos de la grilla
    // modulando su alfa según su distancia al origen — igual técnica que grilla-proceso.tsx, sin trazo.
    const grid = 7
    const pad = 20
    const step = (SIZE - pad * 2) / (grid - 1)
    const originPt = { x: pad, y: pad }
    const maxDist = Math.hypot(SIZE - pad * 2, SIZE - pad * 2)
    for (let row = 0; row < grid; row++) {
      for (let col = 0; col < grid; col++) {
        const x = pad + col * step
        const y = pad + row * step
        const isOrigin = row === 0 && col === 0
        if (isOrigin) {
          els.push(<Dot key="origen" x={x} y={y} r={4} color={color} opacity={0.9} />)
          continue
        }
        const dist = Math.hypot(x - originPt.x, y - originPt.y)
        const delay = (dist / maxDist) * 2.2
        els.push(
          <circle key={`${row}-${col}`} cx={x} cy={y} r={1.6} fill={color} opacity={0.12}>
            <animate attributeName="opacity" values="0.12;0.5;0.12" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        )
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {els}
    </svg>
  )
}
