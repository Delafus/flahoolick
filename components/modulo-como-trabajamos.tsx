import Link from 'next/link'
import { FontMix } from './page-layout'
import { DISCIPLINAS } from './servicios-datos'

const GRIS = '#D8D8D7'
const NEGRO = '#000000'

/**
 * Módulo de servicios en la home. Va justo después de la presentación
 * "Somos FLAHOOLICK" para que el visitante entienda en qué se especializa
 * Flahoolick antes de explorar el servicio completo.
 */
export function ModuloComoTrabajamos() {
  return (
    <section className="page-px section-py" style={{ backgroundColor: GRIS, color: NEGRO }}>
      <div className="max-container flex flex-col gap-12">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="label opacity-50">En qué nos especializamos</p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.0 }}>
            <FontMix bold="Cuatro disciplinas." italic=" Un sistema." />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.12)' }}>
          {DISCIPLINAS.map(d => (
            <Link key={d.id} href={d.href}
              className="group flex flex-col gap-3 p-8 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: GRIS }}>
              <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(1.375rem, 2vw, 1.75rem)', lineHeight: 1.1 }}>{d.nombre}</h3>
              <p className="text-sm leading-relaxed opacity-65 flex-1">{d.desc}</p>
              <span className="label opacity-40 group-hover:opacity-80 transition-opacity">Explorar →</span>
            </Link>
          ))}
        </div>

        <Link href="/servicios"
          className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit mx-auto"
          style={{ '--btn-bg': NEGRO, '--btn-fg': GRIS, borderRadius: '999px' } as React.CSSProperties}>
          Explorar servicios →
        </Link>
      </div>
    </section>
  )
}
