'use client'

import { useState } from 'react'
import { FontMix } from './font-mix'

export function ContactForm({
  bg = 'var(--brand-depth)',
  text = 'var(--brand-chalk)',
  headline = <FontMix bold="Tu empresa ya" italic=" tiene el conocimiento." />,
  description = 'Construyamos el sistema que lo pone frente al mercado.',
  note,
  submitLabel = 'Agenda una llamada →',
}: {
  bg?: string
  text?: string
  headline?: React.ReactNode
  description?: string
  /** Línea corta y discreta bajo la bajada, ej. "Te propondremos un punto de entrada concreto." */
  note?: string
  submitLabel?: string
}) {
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setSent(true)
    setLoading(false)
  }

  return (
    <section
      id="contacto"
      className="page-px section-py"
      style={{ backgroundColor: bg, color: text, minHeight: '60dvh', scrollMarginTop: '80px' }}
    >
      <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <h2 className="text-headline" style={{ color: text, lineHeight: 0.92 }}>{headline}</h2>
          <p className="text-lead max-w-sm opacity-60">{description}</p>
          {note && <p className="text-sm opacity-45" style={{ maxWidth: '24rem' }}>{note}</p>}
        </div>

        {/* Right */}
        <div>
          {sent ? (
            <div className="flex flex-col gap-4 py-12">
              <p className="label opacity-40">Mensaje enviado</p>
              <p className="text-xl font-light">Nos pondremos en contacto pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'nombre',  label: 'Nombre' },
                  { id: 'empresa', label: 'Empresa' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label className="label opacity-50" htmlFor={f.id} style={{ color: text }}>{f.label}</label>
                    <input
                      id={f.id} name={f.id} type="text" required
                      className="w-full py-3 px-4 text-sm outline-none"
                      style={{ background: '#ffffff', border: 'none', color: '#000000' }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="label opacity-50" htmlFor="email" style={{ color: text }}>Email</label>
                <input
                  id="email" name="email" type="email" required
                  className="w-full py-3 px-4 text-sm outline-none"
                  style={{ background: '#ffffff', border: 'none', color: '#000000' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="label opacity-50" htmlFor="mensaje" style={{ color: text }}>Mensaje</label>
                <textarea
                  id="mensaje" name="mensaje" rows={4} required
                  className="w-full py-3 px-4 text-sm outline-none resize-none"
                  style={{ background: '#ffffff', border: 'none', color: '#000000' }}
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="btn-invert label mt-2 py-4 px-8 disabled:opacity-30 w-fit"
                style={{ '--btn-bg': text, '--btn-fg': bg, borderRadius: '999px' } as React.CSSProperties}
              >
                {loading ? 'Enviando...' : submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
