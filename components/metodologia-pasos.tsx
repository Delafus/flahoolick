import { MicrogrillaMetodologia, type MicrogrillaKind } from './microgrilla-metodologia'

interface Paso {
  numero: string
  slug: string
  titulo: string
  texto: string
  resultado: string
  kind: MicrogrillaKind
}

/** Tres pasos como franjas horizontales independientes — cada una con su propia microgrilla 7x7. */
export function MetodologiaPasos({ pasos }: { pasos: Paso[] }) {
  return (
    <div className="flex flex-col">
      {pasos.map((p, i) => (
        <div key={p.numero}
          id={`paso-${p.slug}`}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center py-12"
          style={{
            borderTop: '1px solid rgba(0,0,0,0.15)',
            borderBottom: i === pasos.length - 1 ? '1px solid rgba(0,0,0,0.15)' : 'none',
            scrollMarginTop: '90px',
          }}>
          <div className="md:col-span-4 flex md:justify-center" style={{ width: 'clamp(96px, 24vw, 160px)' }}>
            <MicrogrillaMetodologia kind={p.kind} color="#000000" />
          </div>
          <div className="md:col-span-8 flex flex-col gap-3" style={{ maxWidth: '38rem' }}>
            <p className="label opacity-45">{p.numero}</p>
            <h2 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.0 }}>
              {p.titulo}
            </h2>
            <p className="text-base leading-relaxed opacity-70">{p.texto}</p>
            <div className="flex flex-col gap-2 mt-3 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>
              <p className="label opacity-40">Resultado</p>
              <p className="text-sm leading-relaxed opacity-60">{p.resultado}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
