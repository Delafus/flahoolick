'use client'

import { useState } from 'react'

interface Categoria {
  titulo: string
  items: string[]
}

/** Acordeón de ancho completo, una categoría abierta a la vez. */
export function ServicioAcordeonIncluye({ categorias, color = '#000000' }: { categorias: Categoria[]; color?: string }) {
  const [abierto, setAbierto] = useState(0)

  return (
    <div className="flex flex-col">
      {categorias.map((cat, i) => (
        <div key={cat.titulo} style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
          <button
            onClick={() => setAbierto(abierto === i ? -1 : i)}
            className="w-full flex items-center justify-between py-6 text-left"
            style={{ cursor: 'pointer' }}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(1.3rem, 2.4vw, 2rem)',
            }}>{cat.titulo}</span>
            <span style={{
              fontSize: '1.4rem',
              lineHeight: 1,
              color,
              transition: 'transform 0.3s ease',
              display: 'inline-block',
              transform: abierto === i ? 'rotate(45deg)' : 'rotate(0deg)',
            }}>+</span>
          </button>
          <div style={{
            maxHeight: abierto === i ? '260px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.35s ease, opacity 0.3s ease',
            opacity: abierto === i ? 1 : 0,
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pb-6">
              {cat.items.map(item => (
                <p key={item} className="text-sm opacity-70 py-2.5" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }} />
    </div>
  )
}
