import { FUENTE } from './minimal'

export interface Resultado {
  /** Lo más grande de la tarjeta: una cifra o una palabra ("5", "100%", "Antes"). */
  valor: string
  titulo: string
  texto: string
}

/** Módulo de resultados de un caso: una franja gris con hasta cuatro tarjetas. */
export function ResultadosClave({ titulo = 'Resultados clave', items }: { titulo?: string; items: Resultado[] }) {
  return (
    <section className="-mx-[var(--page-px)] px-[var(--page-px)] py-16 md:py-24" style={{ backgroundColor: '#EFEFEF' }}>
      <div className="mx-auto flex flex-col gap-10" style={{ maxWidth: '72rem' }}>
        <h2 className="text-[1.75rem] md:text-[2.25rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.15 }}>{titulo}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(r => (
            <div key={r.titulo} className="flex flex-col gap-4 p-8" style={{ backgroundColor: '#ffffff' }}>
              <p className="text-[2.75rem] md:text-[3.25rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em' }}>{r.valor}</p>
              <h3 style={{ ...FUENTE, fontWeight: 600, letterSpacing: 'normal', fontSize: '1.25rem', lineHeight: 1.25 }}>{r.titulo}</h3>
              <p className="text-base leading-relaxed">{r.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
