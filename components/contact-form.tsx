'use client'

import { useState } from 'react'

export function ContactForm({ bg = 'var(--brand-depth)', text = 'var(--brand-chalk)' }: {
  bg?: string
  text?: string
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

  const border = `1px solid color-mix(in srgb, ${text} 20%, transparent)`
  const inputBg = `color-mix(in srgb, ${text} 5%, transparent)`

  return (
    <section
      id="contacto"
      className="page-px section-py"
      style={{ backgroundColor: bg, color: text, minHeight: '60vh' }}
    >
      <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <p className="label opacity-40">Contacto</p>
          <h2 className="text-headline" style={{ color: text }}>
            Hablemos.
          </h2>
          <p className="text-lg font-light opacity-60 max-w-sm leading-relaxed">
            El primer paso es una conversación de 30 minutos. Sin presentaciones ni decks de venta.
          </p>
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
                  { id: 'nombre',  label: 'Nombre',  type: 'text',  ph: 'Tu nombre' },
                  { id: 'empresa', label: 'Empresa', type: 'text',  ph: 'Tu empresa' },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label className="label opacity-50" htmlFor={f.id} style={{ color: text }}>{f.label}</label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required
                      placeholder={f.ph}
                      className="w-full py-3 px-4 text-sm outline-none focus:opacity-100"
                      style={{ background: inputBg, border, color: text }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label className="label opacity-50" htmlFor="email" style={{ color: text }}>Email</label>
                <input
                  id="email" name="email" type="email" required placeholder="tu@empresa.com"
                  className="w-full py-3 px-4 text-sm outline-none"
                  style={{ background: inputBg, border, color: text }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="label opacity-50" htmlFor="mensaje" style={{ color: text }}>Mensaje</label>
                <textarea
                  id="mensaje" name="mensaje" rows={4} required
                  placeholder="Cuéntanos sobre tu empresa y el desafío que enfrentas."
                  className="w-full py-3 px-4 text-sm outline-none resize-none"
                  style={{ background: inputBg, border, color: text }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="label mt-2 py-4 px-8 hover:opacity-70 disabled:opacity-30 transition-opacity w-fit"
                style={{ background: text, color: bg }}
              >
                {loading ? 'Enviando...' : 'Activar el sistema →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
