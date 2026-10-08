import Link from 'next/link'
import { FontMix } from './page-layout'
import { AudioBriefPlayer } from './audio-brief-player'

const NEGRO = '#000000'
const BLANCO = '#ffffff'

/** Caso Dunamis — prueba social temprana en el home. */
export function ModuloCasoDunamis() {
  return (
    <section className="page-px section-py" style={{ backgroundColor: NEGRO, color: BLANCO }}>
      <div className="max-container flex flex-col items-center text-center gap-10">
        <p className="label opacity-50">Caso real</p>

        <div className="flex flex-col gap-4" style={{ maxWidth: '46rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.05 }}>
            <FontMix bold="Dunamis nos pidió" italic=" un PDF en Canva." />
          </h2>
          <p className="text-lead opacity-70">
            Hoy su equipo no explica nada desde cero.
          </p>
        </div>

        <div style={{ width: '100%', maxWidth: '300px' }}>
          <AudioBriefPlayer src="/audio/dunamis-brief.mp3" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/casos/dunamis"
            className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
            style={{ border: '1px solid rgba(255,255,255,0.3)', color: BLANCO, borderRadius: '999px' }}>
            Ver caso →
          </Link>
        </div>
      </div>
    </section>
  )
}
