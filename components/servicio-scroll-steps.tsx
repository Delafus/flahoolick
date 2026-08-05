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
      { rootMargin: '0px 0px -15% 0px', threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex-1 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div style={{
          width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
          backgroundColor: active ? color : 'rgba(0,0,0,0.15)',
          transition: 'background-color 0.5s ease',
        }} />
        {!isLast && (
          <div style={{
            flex: 1, height: '1px',
            backgroundColor: active ? color : 'rgba(0,0,0,0.15)',
            transition: 'background-color 0.6s ease 0.15s',
          }} />
        )}
      </div>
      <div style={{
        opacity: active ? 1 : 0.35,
        transform: active ? 'translateY(0)' : 'translateY(10px)',
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
 * Secuencia de pasos conectados por una línea que se enciende a medida que
 * se scrollea — misma lógica de IntersectionObserver que ScrollConnector,
 * en vez de scroll-jacking horizontal real (frágil y mal soportado en mobile).
 */
export function ServicioScrollSteps({ pasos, color = '#000000' }: { pasos: Paso[]; color?: string }) {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-6">
      {pasos.map((p, i) => (
        <StepNode key={p.numero} paso={p} isLast={i === pasos.length - 1} color={color} />
      ))}
    </div>
  )
}
