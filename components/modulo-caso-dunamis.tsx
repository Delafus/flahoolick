import Link from 'next/link'
import { FontMix } from './page-layout'

const NEGRO = '#000000'
const BLANCO = '#ffffff'

const HERRAMIENTAS = [
  { nombre: 'Valor', desc: 'Estima el valor de una propiedad con la UF del día', href: 'https://valor.dunamis.broker/', captura: null as string | null },
  { nombre: 'La Decisión', desc: 'Tres minutos para decidir entre comprar o arrendar', href: 'https://decision.dunamis.broker/', captura: null as string | null },
  { nombre: 'Dossier', desc: 'Servicios y honorarios en un solo enlace', href: 'https://servicios.dunamis.broker/', captura: null as string | null },
]

/** Caso Dunamis: prueba social temprana en el home, con las herramientas en vivo. */
export function ModuloCasoDunamis() {
  return (
    <section className="page-px section-py" style={{ backgroundColor: NEGRO, color: BLANCO }}>
      <div className="max-container flex flex-col items-center text-center gap-10">
        <p className="label opacity-50">Caso · Dunamis</p>

        <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.05, maxWidth: '50rem' }}>
          <FontMix bold="El conocimiento de Dunamis vivía en su equipo." italic=" Hoy funciona en el celular de sus clientes." />
        </h2>

        {/* Desktop: tres en fila. Mobile: carrusel horizontal con scroll. */}
        <div
          className="w-full flex md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-[var(--page-px)] px-[var(--page-px)] md:mx-auto md:px-0 pb-2"
          style={{ maxWidth: '58rem' }}
        >
          {HERRAMIENTAS.map(h => (
            <Link
              key={h.nombre}
              href={h.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 w-[68%] sm:w-[45%] md:w-auto snap-center flex flex-col items-center gap-5"
            >
              <div
                className="w-full transition-opacity group-hover:opacity-80"
                style={{ aspectRatio: '9 / 19.5', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.3)', padding: '6px', overflow: 'hidden' }}
              >
                {h.captura ? (
                  <img src={h.captura} alt={`${h.nombre}, herramienta de Dunamis Broker`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'calc(2rem - 6px)', display: 'block' }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ borderRadius: 'calc(2rem - 6px)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <span className="label" style={{ opacity: 0.25 }}>Captura</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="label">{h.nombre} ↗</p>
                <p className="text-[15px] leading-relaxed opacity-65">{h.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/casos/dunamis"
          className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
          style={{ border: '1px solid rgba(255,255,255,0.3)', color: BLANCO, borderRadius: '999px' }}>
          Recorre el caso Dunamis →
        </Link>
      </div>
    </section>
  )
}
