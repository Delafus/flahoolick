import Image from 'next/image'

interface CasoImagenBriefProps {
  /** Ruta de la imagen dentro de /public, ej. "/dee-chat.svg". */
  src: string
  alt: string
  numero?: string
  label?: string
  /** Texto que aparece sobre el print. */
  contextoTexto?: string
  /** Línea de resultado bajo el print. */
  resultadoTexto?: string
  color?: string
}

const NEGRO = '#000000'

/**
 * Tarjeta "print en vivo": mismo patrón visual que CasoAudioBrief (card
 * blanca flotante con sombra), pero con un screenshot real en vez de un
 * reproductor de audio.
 */
export function CasoImagenBrief({
  src,
  alt,
  numero = '02',
  label = 'AGENTE AUTOMATIZADO',
  contextoTexto,
  resultadoTexto,
  color = NEGRO,
}: CasoImagenBriefProps) {
  return (
    <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
      <div className="flex items-center gap-2 mb-4">
        <div style={{ width: '20px', height: '1px', backgroundColor: color, opacity: 0.4 }} />
        <p className="label" style={{ color, opacity: 0.5 }}>{label}</p>
      </div>

      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        {contextoTexto && (
          <div className="px-8 pt-8 pb-4">
            <p className="text-sm font-medium" style={{ color: NEGRO, opacity: 0.6 }}>
              <span className="label" style={{ opacity: 0.4, marginRight: '0.5rem' }}>{numero}</span>
              {contextoTexto}
            </p>
          </div>
        )}

        <div className="px-8 pb-6">
          <div style={{ position: 'relative', width: '100%', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
            <Image src={src} alt={alt} width={1200} height={900} style={{ width: '100%', height: 'auto', display: 'block' }} unoptimized />
          </div>
        </div>

        {resultadoTexto && (
          <div className="px-8 py-6" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FAFAF8' }}>
            <p className="text-sm" style={{ color: NEGRO, opacity: 0.65 }}>{resultadoTexto}</p>
          </div>
        )}
      </div>
    </div>
  )
}
