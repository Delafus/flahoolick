import Link from 'next/link'

const NEGRO  = '#403D37'
const BLANCO = '#ffffff'

/**
 * Teaser corto de Metodología en el home — antes vivía junto al acordeón de
 * Capacidades (que ahora se fusionó dentro de /servicios) y con tarjetas de
 * JERGA. Se dejó solo el llamado a explorar el sistema completo.
 */
export function ModuloMetodologia() {
  return (
    <section className="page-px section-py" style={{ backgroundColor: NEGRO }}>
      <div className="max-container">
        <div className="flex flex-col gap-8" style={{ maxWidth: '48rem' }}>
          <p className="label" style={{ color: BLANCO, opacity: 0.6 }}>Metodología</p>
          <h2 style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            lineHeight: 0.92,
            color: BLANCO,
          }}>
            <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: '1.04em', letterSpacing: '-0.03em' }}>Del conocimiento disperso</span>
            <span style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.04em' }}> a un sistema que trabaja.</span>
          </h2>
          <Link href="/metodologia"
            className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit"
            style={{ '--btn-bg': BLANCO, '--btn-fg': NEGRO, borderRadius: '999px' } as React.CSSProperties}>
            Explorar metodología →
          </Link>
        </div>
      </div>
    </section>
  )
}
