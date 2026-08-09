'use client'

import { useEffect, useRef, useState } from 'react'
import { GrillaProceso } from './grilla-proceso'

interface Paso {
  numero: string
  slug: string
  titulo: string
  parrafos: string[]
  recibe: string
}

const headingStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 400,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
} as const

/** Los 3 pasos de la metodología, con GrillaProceso sincronizada por scroll: cada paso visible activa su coreografía. */
export function MetodologiaPasos({ pasos }: { pasos: Paso[] }) {
  const [activo, setActivo] = useState(0)
  const [expandidos, setExpandidos] = useState<Set<number>>(new Set())
  const refs = useRef<(HTMLDivElement | null)[]>([])

  function toggleExpandido(i: number) {
    setExpandidos(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const idx = refs.current.findIndex(el => el === entry.target)
          if (idx !== -1) setActivo(idx)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="hidden md:block" style={{ position: 'sticky', top: '120px' }}>
        <div style={{ position: 'relative', aspectRatio: '1/1', width: '92%', margin: '0 auto' }}>
          <GrillaProceso abierto={activo} color="#000000" />
        </div>
      </div>
      <div className="flex flex-col">
        {pasos.map((p, i) => (
          <div key={p.numero}
            ref={el => { refs.current[i] = el }}
            id={`paso-${p.slug}`}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10"
            style={{ borderTop: '1px solid rgba(0,0,0,0.1)', scrollMarginTop: '90px' }}>
            <div className="md:col-span-4">
              <p className="label opacity-40">{p.numero}</p>
              <h3 style={{ ...headingStyle, fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', marginTop: '0.5rem' }}>{p.titulo}</h3>
            </div>
            <div className="md:col-span-8 flex flex-col gap-3">
              {p.parrafos[0] && (
                <p className="text-sm leading-relaxed opacity-65">{p.parrafos[0]}</p>
              )}
              {p.parrafos.length > 1 && expandidos.has(i) && (
                <>
                  {p.parrafos.slice(1).map(t => (
                    <p key={t} className="text-sm leading-relaxed opacity-65">{t}</p>
                  ))}
                </>
              )}
              {p.parrafos.length > 1 && (
                <button
                  type="button"
                  onClick={() => toggleExpandido(i)}
                  className="label opacity-45 hover:opacity-70 transition-opacity w-fit"
                  style={{ marginTop: '-0.25rem' }}>
                  {expandidos.has(i) ? 'Ver menos' : 'Ver más'}
                </button>
              )}
              <p className="text-sm mt-2">
                <span className="opacity-45">Recibes: </span>
                <span className="font-semibold">{p.recibe}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
