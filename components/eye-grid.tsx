'use client'

import { useEffect, useRef } from 'react'

const COLS = 10
const ROWS = 10
/** Los 5 últimos círculos de la primera fila quedan negros y estáticos (el 5% del mercado). */
const STATIC_BLACK = new Set([5, 6, 7, 8, 9])

interface PupilData {
  parent: HTMLDivElement
  element: HTMLDivElement
  currentX: number
  currentY: number
  targetX: number
  targetY: number
  speed: number
}

/** La inercia de cada ojo, no un valor único: el primero reacciona casi al toque, cada uno
 *  siguiente un poco más lento, hasta el último — se nota como una ola en cadena. */
const SPEED_MAX = 0.11
const SPEED_MIN = 0.035

export function EyeGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const eyes = Array.from(container.querySelectorAll<HTMLDivElement>('[data-eye]'))
    const data: PupilData[] = eyes.map((eye, i) => ({
      parent: eye,
      element: eye.querySelector<HTMLDivElement>('[data-pupil]')!,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      speed: SPEED_MAX - (i / Math.max(1, eyes.length - 1)) * (SPEED_MAX - SPEED_MIN),
    }))

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    function onMouseMove(evt: MouseEvent) {
      mouseX = evt.clientX
      mouseY = evt.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    let raf = 0
    function animate() {
      data.forEach(d => {
        const rect = d.parent.getBoundingClientRect()
        const eyeX = rect.left + rect.width / 2
        const eyeY = rect.top + rect.height / 2

        const deltaX = mouseX - eyeX
        const deltaY = mouseY - eyeY
        const angle = Math.atan2(deltaY, deltaX)
        const distance = Math.hypot(deltaX, deltaY)

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
    animate()

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
        STATIC_BLACK.has(i) ? (
          <div key={i} style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#000000' }} />
        ) : (
          <div
            key={i}
            data-eye
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: 'transparent',
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
