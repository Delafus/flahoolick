'use client'

import { useEffect, useRef, useState } from 'react'

// Todo en coordenadas del viewBox 490×455 de /audio-brief-dunamis.svg.
// Si se re-exporta el dibujo con la burbuja de audio en otro lugar, hay que
// ajustar estas posiciones.
const VB = '0 0 490 455'
const PLAY = { cx: 100, cy: 332.5, r: 15 }
// Barras de la onda: [x, y1, y2]
const BARS: [number, number, number][] = [
  [137, 326, 338], [141, 323, 341], [145, 323, 341], [149, 326, 338], [153, 328, 336],
  [157, 331, 333], [161, 326, 338], [165, 323, 341], [169, 323, 341], [173, 323, 341],
  [177, 323, 341], [181, 326, 338], [189, 323, 341], [193, 326, 338], [197, 326, 338],
  [201, 328, 336], [209, 328, 336], [213, 323, 341], [217, 323, 341], [221, 326, 338],
  [225, 328, 336], [229, 326, 338], [233, 326, 338], [237, 326, 338], [241, 328, 336],
  [249, 328, 336], [253, 325, 339], [257, 327, 337], [261, 329, 335], [265, 331, 333],
  [269, 331, 333], [273, 331, 333], [277, 331, 333],
]
const WAVE_X0 = 135
const WAVE_X1 = 279
// Contador del dibujo (texto negro bajo la onda)
const TIME = { x: 123, y: 347.5, w: 30, h: 11 }

const BUBBLE = '#FAFAFA'
const GRIS = '#6C747C'
const AZUL = '#007AFF'

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/** Ilustración del audio de Dunamis: el play del dibujo reproduce el audio real,
 *  la onda se pinta con el avance y se puede hacer clic en ella para saltar. */
export function AudioBriefPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrent(audio.currentTime)
    const onMeta = () => setDuration(audio.duration)
    const onPause = () => setPlaying(false)
    const onPlay = () => { setPlaying(true); setStarted(true) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onPause)
    audio.addEventListener('play', onPlay)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onPause)
      audio.removeEventListener('play', onPlay)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => setPlaying(false))
    else audio.pause()
  }

  const seek = (e: React.MouseEvent<SVGRectElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    const go = () => { audio.currentTime = p * audio.duration; setCurrent(audio.currentTime) }
    if (isFinite(audio.duration)) go()
    else audio.addEventListener('loadedmetadata', go, { once: true })
    if (audio.paused) audio.play().catch(() => setPlaying(false))
  }

  const progress = duration ? current / duration : 0
  const progressX = WAVE_X0 + progress * (WAVE_X1 - WAVE_X0)

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
      <img
        src="/audio-brief-dunamis.svg"
        alt="Audio de 8 minutos enviado por Dunamis por chat"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      <svg viewBox={VB} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* Onda: las barras ya reproducidas se pintan de azul encima del dibujo */}
        {started && BARS.filter(([x]) => x <= progressX).map(([x, y1, y2]) => (
          <line key={x} x1={x} y1={y1} x2={x} y2={y2} stroke={AZUL} strokeWidth={2} strokeLinecap="round" />
        ))}

        {/* Contador real en lugar del texto fijo del dibujo */}
        {started && (
          <>
            <rect x={TIME.x} y={TIME.y} width={TIME.w} height={TIME.h} fill={BUBBLE} />
            <text
              x={TIME.x + 1}
              y={TIME.y + TIME.h - 2}
              fontSize={11}
              fill="#000000"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
            >
              {formatTime(current)}
            </text>
          </>
        )}

        {/* Pausa: tapa el triángulo del dibujo con el fondo de la burbuja */}
        {playing && (
          <g>
            <circle cx={PLAY.cx} cy={PLAY.cy} r={PLAY.r} fill={BUBBLE} />
            <rect x={PLAY.cx - 7} y={PLAY.cy - 10} width={5} height={20} rx={1} fill={GRIS} />
            <rect x={PLAY.cx + 2} y={PLAY.cy - 10} width={5} height={20} rx={1} fill={GRIS} />
          </g>
        )}

        {/* Zonas clickeables */}
        <circle
          cx={PLAY.cx}
          cy={PLAY.cy}
          r={PLAY.r + 4}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={toggle}
          role="button"
          aria-label={playing ? 'Pausar audio de Dunamis' : 'Escuchar audio de Dunamis'}
        />
        <rect
          x={WAVE_X0}
          y={318}
          width={WAVE_X1 - WAVE_X0}
          height={28}
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={seek}
          aria-label="Saltar en el audio"
        />
      </svg>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  )
}
