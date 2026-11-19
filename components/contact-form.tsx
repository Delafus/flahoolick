'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FontMix } from './font-mix'

const CAMPOS_MINIMAL = [
  { id: 'nombre', label: 'Nombre', type: 'text', placeholder: '¿Cómo te llamas?' },
  { id: 'empresa', label: 'Empresa', type: 'text', placeholder: '¿Dónde trabajas?' },
  { id: 'email', label: 'Correo', type: 'email', placeholder: 'tu@empresa.com' },
]
/** Campos en caja: fondo blanco y borde negro, para que se note dónde escribir. Pensado para el módulo verde de contacto. */
const CAMPO_MINIMAL = 'w-full px-4 py-3 outline-none transition-shadow focus:shadow-[0_0_0_2px_#000]'
const CAMPO_MINIMAL_ESTILO = { backgroundColor: '#ffffff', color: '#000000', border: '1px solid #000000', borderRadius: 0 }

export function ContactForm({
  bg = 'var(--brand-depth)',
  text = 'var(--brand-chalk)',
  headline = <FontMix bold="Tu empresa" italic=" tiene el conocimiento." />,
  description = 'Construyamos el sistema que lo pone frente al mercado. Conversemos sobre cómo transformar ese conocimiento en una ventaja para tu negocio.',
  note,
  submitLabel = 'Agenda una llamada',
  minimal = false,
}: {
  /** Solo el formulario, sin titular ni fondo, con campos de línea simple. */
  minimal?: boolean
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
  const [error, setError]     = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('request failed')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (minimal) {
    return (
      <div id="contacto" className="pt-6" style={{ scrollMarginTop: '96px' }}>
        {sent ? (
          <div className="flex flex-col gap-2">
            <p style={{ fontWeight: 500 }}>Primer paso, listo.</p>
            <p>Te escribimos pronto para conversar sobre lo que tu organización sabe y el mercado todavía no conoce.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
            {CAMPOS_MINIMAL.map(c => (
              <div key={c.id} className={`flex flex-col gap-2 ${c.id === 'email' ? 'md:col-span-2' : ''}`}>
                <label htmlFor={c.id} className="label">{c.label}</label>
                <input id={c.id} name={c.id} type={c.type} required placeholder={c.placeholder}
                  className={CAMPO_MINIMAL} style={CAMPO_MINIMAL_ESTILO} />
              </div>
            ))}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="mensaje" className="label">El desafío</label>
              <textarea id="mensaje" name="mensaje" rows={4} required
                placeholder="Cuéntanos qué cuesta explicar, producir o vender."
                className={`${CAMPO_MINIMAL} resize-none`} style={CAMPO_MINIMAL_ESTILO} />
            </div>
            <button type="submit" disabled={loading}
              className="pill-somos-flahoolick label mt-2 w-fit px-7 py-4 disabled:opacity-40 md:col-span-2" style={{ borderRadius: '999px' }}>
              {loading ? 'Enviando...' : submitLabel}
            </button>
            {error && <p className="md:col-span-2">No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo.</p>}
            <p className="text-sm md:col-span-2" style={{ opacity: 0.7 }}>
              Usaremos tus datos únicamente para responder esta conversación. Consulta nuestra{' '}
              <Link href="/politica-de-privacidad" className="underline underline-offset-2">Política de Privacidad</Link>.
            </p>
          </form>
        )}
      </div>
    )
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
          <p className="text-lead max-w-md opacity-60">{description}</p>
          {note && <p className="text-sm opacity-45" style={{ maxWidth: '24rem' }}>{note}</p>}
        </div>

        {/* Right */}
        <div>
          {sent ? (
            <div className="flex flex-col gap-4 py-12">
              <p className="label opacity-60">Primer paso, listo.</p>
              <p className="text-xl font-light">Te escribimos pronto para conversar sobre lo que tu organización sabe y el mercado todavía no conoce.</p>
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
                      style={{ background: '#ffffff', border: 'none', color: '#1C1854' }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="label opacity-50" htmlFor="email" style={{ color: text }}>Email</label>
                <input
                  id="email" name="email" type="email" required
                  className="w-full py-3 px-4 text-sm outline-none"
                  style={{ background: '#ffffff', border: 'none', color: '#1C1854' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="label opacity-50" htmlFor="mensaje" style={{ color: text }}>Mensaje</label>
                <textarea
                  id="mensaje" name="mensaje" rows={4} required
                  className="w-full py-3 px-4 text-sm outline-none resize-none"
                  style={{ background: '#ffffff', border: 'none', color: '#1C1854' }}
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="btn-invert label mt-2 py-4 px-8 disabled:opacity-30 w-fit"
                style={{ '--btn-bg': text, '--btn-fg': bg, borderRadius: '999px' } as React.CSSProperties}
              >
                {loading ? 'Enviando...' : submitLabel}
              </button>
              {error && (
                <p className="text-sm" style={{ color: text, opacity: 0.7 }}>
                  No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
