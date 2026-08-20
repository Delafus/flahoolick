'use client'

import { useEffect, useRef } from 'react'

const COLS = 10
const ROWS = 10
/** Los 5 últimos círculos de la primera fila quedan verdes y estáticos (el 5% del mercado). */
const STATIC_GREEN = new Set([5, 6, 7, 8, 9])

interface PupilData {
  parent: HTMLDivElement
  element: HTMLDivElement
  currentX: number
  currentY: number
  targetX: number
  targetY: number
  /** Inercia individual de cada ojo. */
  speed: number
  /** Cuánto se desvía del cursor puro — más distracción, más "busca" en vez de mirar fijo. */
  distraccion: number
  /** Desfasa el vaivén de cada ojo para que no oscilen todos en sincronía. */
  offsetFase: number
}

/** La inercia de cada ojo, no un valor único: el primero reacciona casi al toque, cada uno
 *  siguiente un poco más lento, hasta el último — se nota como una ola en cadena. Además cada
 *  ojo tiene un factor aleatorio propio, así ninguno se mueve exactamente igual. */
const SPEED_MAX = 0.18
const SPEED_MIN = 0.012
const DISTRACCION_MIN = 0.12
const DISTRACCION_MAX = 0.55
/** Velocidad del vaivén errático (independiente de la velocidad de reacción al cursor). */
const WOBBLE_FREQ = 0.0015

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function EyeGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const eyes = Array.from(container.querySelectorAll<HTMLDivElement>('[data-eye]'))
    const data: PupilData[] = eyes.map((eye, i) => {
      const cascadeSpeed = SPEED_MAX - (i / Math.max(1, eyes.length - 1)) * (SPEED_MAX - SPEED_MIN)
      return {
        parent: eye,
        element: eye.querySelector<HTMLDivElement>('[data-pupil]')!,
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        // La ola en cadena se mantiene, pero cada ojo la vive a su propio ritmo.
        speed: cascadeSpeed * randomRange(0.8, 1.2),
        distraccion: randomRange(DISTRACCION_MIN, DISTRACCION_MAX),
        offsetFase: randomRange(0, Math.PI * 2),
      }
    })

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    function onMouseMove(evt: MouseEvent) {
      mouseX = evt.clientX
      mouseY = evt.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf = 0
    function animate(now: number) {
      data.forEach(d => {
        const rect = d.parent.getBoundingClientRect()
        const eyeX = rect.left + rect.width / 2
        const eyeY = rect.top + rect.height / 2

        const deltaX = mouseX - eyeX
        const deltaY = mouseY - eyeY
        const cursorAngle = Math.atan2(deltaY, deltaX)
        const distance = Math.hypot(deltaX, deltaY)

        // Mezcla el ángulo real del cursor con un vaivén errático propio de cada ojo —
        // buscan alternativas en vez de apuntar todos en perfecta sincronía al mouse.
        const wobble = Math.sin(now * WOBBLE_FREQ + d.offsetFase) * d.distraccion
        const angle = cursorAngle + wobble

        // El recorrido máximo de la pupila se escala con el tamaño real del ojo
        // (el original usaba 12px fijos, pensado para ojos de 40px).
        const maxDistance = rect.width * 0.3
        const currentMax = Math.min(distance * 0.1, maxDistance)

        d.targetX = Math.cos(angle) * currentMax
        d.targetY = Math.sin(angle) * currentMax

        d.currentX += (d.targetX - d.currentX) * d.speed
        d.currentY += (d.targetY - d.currentY) * d.speed

        d.element.style.transform = `translate(${d.currentX}px, ${d.currentY}px)`
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  const cells = Array.from({ length: ROWS * COLS }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gap: 'clamp(3px, 2.5%, 10px)',
        width: '100%',
        height: '100%',
      }}
    >
      {cells.map(i =>
        STATIC_GREEN.has(i) ? (
          <div key={i} style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#1FDE91' }} />
        ) : (
          <div
            key={i}
            data-eye
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0,0,0,0.1)',
              position: 'relative',
            }}
          >
            <div
              data-pupil
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '30%',
                height: '30%',
                marginTop: '-15%',
                marginLeft: '-15%',
                borderRadius: '50%',
                backgroundColor: '#000000',
                willChange: 'transform',
              }}
            />
          </div>
        ),
      )}
    </div>
  )
}
