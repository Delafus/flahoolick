import Link from 'next/link'
import { FontMix } from './page-layout'
import { CasoImagenBrief } from './caso-imagen-brief'

const NEGRO = '#000000'
const BLANCO = '#ffffff'

/** Versión comprimida del caso Dunamis (el completo vive en /frecuencia) — prueba social temprana en el home. */
export function ModuloCasoDunamis() {
  return (
    <section className="page-px section-py" style={{ backgroundColor: NEGRO, color: BLANCO }}>
      <div className="max-container flex flex-col items-center text-center gap-10">
        <p className="label opacity-50">Caso real</p>

        <div className="flex flex-col gap-4" style={{ maxWidth: '46rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.05 }}>
            <FontMix bold="Dunamis nos mandó un audio de 8 minutos." italic=" Hoy un agente les agenda visitas solo." />
          </h2>
          <p className="text-lead opacity-70">
            De esa conversación salieron un dossier, un simulador, un blog y Dee — el agente que su equipo de ventas usa a diario.
          </p>
        </div>

        <CasoImagenBrief
          src="/dee-chat.svg"
          alt="Conversación real con Dee, el agente de Dunamis Agency"
          label="AGENTE AUTOMATIZADO · DUNAMIS AGENCY"
          resultadoTexto="Cada conversación termina en una visita agendada o un dato de contacto capturado."
          color={NEGRO}
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/frecuencia"
            className="btn-invert label inline-flex items-center gap-2 px-6 py-3.5 w-fit"
            style={{ '--btn-bg': BLANCO, '--btn-fg': NEGRO, borderRadius: '999px' } as React.CSSProperties}>
            Conoce FrecuenciA →
          </Link>
          <Link href="https://dunamis.agency" target="_blank" rel="noopener noreferrer"
            className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
            style={{ border: '1px solid rgba(255,255,255,0.3)', color: BLANCO, borderRadius: '999px' }}>
            Habla con Dee →
          </Link>
        </div>
      </div>
    </section>
  )
}
