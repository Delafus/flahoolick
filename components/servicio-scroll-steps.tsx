'use client'

import { useEffect, useRef, useState } from 'react'

interface Paso {
  numero: string
  titulo: string
  desc: string
}

function StepNode({ paso, isLast, color }: { paso: Paso; isLast: boolean; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => { if (entries[0]?.isIntersecting) setActive(true) },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex-1 flex flex-col gap-5">
      <div className="flex items-center gap-0" style={{ height: '20px' }}>
        <div style={{
          width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
          border: `2px solid ${color}`,
          backgroundColor: active ? color : 'transparent',
          transform: active ? 'scale(1)' : 'scale(0.7)',
          transition: 'background-color 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
        {!isLast && (
          <div style={{ flex: 1, height: '2px', backgroundColor: 'rgba(0,0,0,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: color,
              transform: active ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.6s ease 0.2s',
            }} />
          </div>
        )}
      </div>
      <div style={{
        opacity: active ? 1 : 0.3,
        transform: active ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}>
        <p className="label opacity-40">{paso.numero}</p>
        <h3 className="text-lg font-semibold mt-2">{paso.titulo}</h3>
        <p className="text-sm leading-relaxed opacity-65 mt-2">{paso.desc}</p>
      </div>
    </div>
  )
}

/**
 * Secuencia de pasos conectados por una línea que se dibuja de izquierda a
 * derecha a medida que se scrollea — clip-path/scaleX en vez de solo opacidad,
 * para que el movimiento sea inconfundible.
 */
export function ServicioScrollSteps({ pasos, color = '#000000' }: { pasos: Paso[]; color?: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-4">
      {pasos.map((p, i) => (
        <StepNode key={p.numero} paso={p} isLast={i === pasos.length - 1} color={color} />
      ))}
    </div>
  )
}
