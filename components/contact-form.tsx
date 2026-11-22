import { FontMix } from './font-mix'
import { BotonAgenda, CORREO_CONTACTO } from './cal-embed'

/** Módulo de contacto de todo el sitio (antes un formulario): botón que abre el calendario de Cal.com
    y el correo para quien prefiere escribir. Conserva el nombre y las props para no tocar cada página. */
export function ContactForm({
  bg = 'var(--brand-depth)',
  text = 'var(--brand-chalk)',
  headline = <FontMix bold="Tu empresa" italic=" tiene el conocimiento." />,
  description = 'Construyamos el sistema que lo pone frente al mercado. En 20 minutos vemos qué vende tu empresa, a quién y dónde se traba hoy la explicación.',
  note,
  submitLabel = 'Agenda una conversación',
}: {
  /** Ya no se usa: se mantiene para no romper llamadas antiguas. */
  minimal?: boolean
  bg?: string
  text?: string
  headline?: React.ReactNode
  description?: string
  /** Línea corta y discreta bajo la bajada. */
  note?: string
  submitLabel?: string
}) {
  return (
    <section id="contacto" className="page-px section-py" style={{ backgroundColor: bg, color: text, scrollMarginTop: '80px' }}>
      <div className="max-container grid grid-cols-1 items-end gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
          <h2 className="text-headline" style={{ color: text, lineHeight: 0.92 }}>{headline}</h2>
          <p className="text-lead max-w-md opacity-60">{description}</p>
          {note && <p className="text-sm opacity-45" style={{ maxWidth: '24rem' }}>{note}</p>}
        </div>
        <div className="flex flex-col items-start gap-4">
          <BotonAgenda className="btn-invert label px-8 py-4"
            style={{ '--btn-bg': text, '--btn-fg': bg, borderRadius: '999px' } as React.CSSProperties}>
            {submitLabel === 'Agenda una llamada' ? 'Agenda una conversación' : submitLabel}
          </BotonAgenda>
          <p className="text-sm" style={{ opacity: 0.7 }}>
            ¿Prefieres escribir?{' '}
            <a href={`mailto:${CORREO_CONTACTO}`} className="underline underline-offset-2">{CORREO_CONTACTO}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
