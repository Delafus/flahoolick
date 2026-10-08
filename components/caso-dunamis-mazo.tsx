'use client'

import { useState, type ReactNode } from 'react'
import { AudioBriefPlayer } from './audio-brief-player'

const BLANCO = '#ffffff'

interface Carta {
  id: string
  etiqueta: string
  /** Dot verde que late junto a la etiqueta (solo para lo que es "en vivo"). */
  pulso?: boolean
  contenido: ReactNode
}

const CARTAS: Carta[] = [
  {
    id: 'audio',
    etiqueta: 'Fragmento real · sin editar',
    pulso: true,
    contenido: <AudioBriefPlayer src="/audio/dunamis-brief.mp3" />,
  },
  {
    id: 'calculadora',
    etiqueta: 'Calculadora de valor',
    contenido: (
      <img src="/valor-calculadora.svg" alt="Calculadora de valor construida para Dunamis" style={{ width: '100%', height: 'auto', display: 'block' }} />
    ),
  },
]

/** Mazo de naipes: la carta del frente es la activa; las de atrás asoman giradas
 *  y al hacer clic pasan adelante. */
export function CasoDunamisMazo() {
  const [orden, setOrden] = useState(CARTAS.map((_, i) => i))
  const frente = CARTAS[orden[0]]

  const traerAlFrente = (idx: number) =>
    setOrden(prev => [idx, ...prev.filter(i => i !== idx)])

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      <p className="label inline-flex items-center gap-2.5" style={{ color: BLANCO, opacity: 0.7 }}>
        {frente.pulso && (
          <span className="animate-dot-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1FDE91' }} />
        )}
        {frente.etiqueta}
      </p>

      <div style={{ position: 'relative', width: '100%', maxWidth: '300px', aspectRatio: '490 / 455' }}>
        {CARTAS.map((carta, idx) => {
          const pos = orden.indexOf(idx)
          const atras = pos > 0
          return (
            <div
              key={carta.id}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: CARTAS.length - pos,
                transform: atras ? `translate(${pos * 7}%, ${-pos * 4}%) rotate(${pos * 4}deg)` : 'none',
                transformOrigin: 'bottom center',
                transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: atras ? 'pointer' : 'default',
              }}
            >
              {carta.contenido}
              {/* Las cartas de atrás no reaccionan a su contenido: un clic las trae al frente */}
              {atras && (
                <button
                  type="button"
                  aria-label={`Ver ${carta.etiqueta}`}
                  onClick={() => traerAlFrente(idx)}
                  style={{ position: 'absolute', inset: 0, background: 'transparent', cursor: 'pointer' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
