import Link from 'next/link'

const NEGRO  = '#000000'
const BLANCO = '#ffffff'

const PRODUCTOS = [
  { titulo: 'SENSOR', desc: 'Captura y procesa el conocimiento técnico y comercial de tu empresa.', href: '/sensor' },
  { titulo: 'DECK',   desc: 'Convierte información compleja en presentaciones, propuestas y playbooks listos para usar.', href: '/deck' },
]

/** Módulo home para los dos productos de Flahoolick — antes solo accesibles desde el menú hamburguesa. */
export function ModuloProductos() {
  return (
    <section className="page-px section-py" style={{ backgroundColor: NEGRO }}>
      <div className="max-container flex flex-col gap-10">
        <p className="label" style={{ color: BLANCO, opacity: 0.6 }}>Productos</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
          {PRODUCTOS.map(p => (
            <Link key={p.href} href={p.href}
              className="flex flex-col gap-4 p-10 group hover:opacity-80 transition-opacity"
              style={{ backgroundColor: NEGRO }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: BLANCO,
              }}>{p.titulo}</p>
              <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.6 }}>{p.desc}</p>
              <span className="label group-hover:opacity-100 transition-opacity" style={{ color: BLANCO, opacity: 0.5, fontSize: '0.65rem' }}>Explorar →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
