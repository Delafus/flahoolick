import Link from 'next/link'

const NEGRO  = '#000000'
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
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            color: BLANCO,
            fontWeight: 400,
          }}>
            Cada ciclo deja un activo.
          </h2>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', lineHeight: 1.6, color: BLANCO, opacity: 0.85, fontWeight: 300 }}>
            Capturamos señales, priorizamos oportunidades, producimos activos y usamos la respuesta del mercado para mejorar el siguiente ciclo.
          </p>
          <Link href="/metodologia"
            className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
            style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
            EXPLORAR METODOLOGÍA ›
          </Link>
        </div>
      </div>
    </section>
  )
}
