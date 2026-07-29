'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ETAPAS } from './servicios-datos'

export function ServiciosEtapas() {
  // Cada etapa abre su propio detalle de proceso sin cerrar las demás.
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setAbiertos(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div>
      {ETAPAS.map((etapa, i) => (
        <section
          key={etapa.id}
          id={etapa.id}
          className="page-px section-py"
          style={{
            scrollMarginTop: '90px',
            borderTop: i > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
          }}
        >
          <div className="max-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

            {/* Izquierda — qué es y cómo se hace */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="label opacity-40">{etapa.numero} — {etapa.nombre}</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>
                {etapa.titular}
              </h2>
              <p className="text-lead opacity-70" style={{ maxWidth: '34rem' }}>{etapa.desc}</p>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)', marginTop: '1rem' }}>
                <button
                  onClick={() => toggle(etapa.id)}
                  aria-expanded={!!abiertos[etapa.id]}
                  className="w-full flex items-center justify-between py-5 text-left"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="label font-bold">{etapa.acordeon.titulo}</span>
                  <span style={{
                    fontSize: '1.2rem',
                    lineHeight: 1,
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                    transform: abiertos[etapa.id] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: abiertos[etapa.id] ? '400px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease, opacity 0.3s ease',
                  opacity: abiertos[etapa.id] ? 1 : 0,
                }}>
                  <p className="text-sm leading-relaxed opacity-70 pb-6" style={{ maxWidth: '34rem' }}>
                    {etapa.acordeon.contenido}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }} />
              </div>

              <Link
                href={`/servicios?servicio=${etapa.id}#contacto`}
                className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit mt-2 hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#000000', color: 'var(--brand-ground)' }}
              >
                {etapa.ctaLabel}
              </Link>
            </div>

            {/* Derecha — qué se lleva el cliente, como una sola unidad:
                primero el entregable principal y después lo que lo compone. */}
            <div className="md:col-span-5">
              <div className="flex flex-col gap-8 p-8"
                style={{ backgroundColor: '#000000', color: 'var(--brand-ground)' }}>
                <div className="flex flex-col gap-3">
                  <p className="label opacity-50">Entregable principal</p>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                    lineHeight: 1.15,
                  }}>
                    {etapa.destacado.titulo}
                  </p>
                  <p className="text-sm leading-relaxed opacity-65">{etapa.destacado.desc}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="label opacity-50">Qué incluye</p>
                  <ul className="flex flex-col">
                    {etapa.entregables.map(item => (
                      <li key={item} className="text-base py-3"
                        style={{ borderTop: '1px solid rgba(249,240,226,0.18)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {etapa.formatos && (
                  <div className="flex flex-col gap-3">
                    <p className="label opacity-50">Formatos que produce</p>
                    <div className="flex flex-wrap gap-2">
                      {etapa.formatos.map(f => (
                        <span key={f} className="text-sm px-3 py-1.5"
                          style={{ border: '1px solid rgba(249,240,226,0.3)', opacity: 0.8 }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
