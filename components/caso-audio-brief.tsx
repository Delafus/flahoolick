'use client'

import { useEffect, useRef, useState } from 'react'

interface CasoAudioBriefProps {
  /** Ruta del archivo de audio dentro de /public, ej. "/audio/dunamis-brief.mp3". */
  src: string
  numero?: string
  label?: string
  /** Texto que aparece sobre el reproductor, antes de dar play. */
  antesTexto?: string
  transcripcion: string
  color?: string
}

const NEGRO = '#000000'
const BARRAS = 56

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/**
 * Tarjeta de "brief real": header + reproductor de audio con waveform real
 * (decodificado del archivo vía Web Audio API, no una imagen fija) + la
 * transcripción revelándose en proporción al avance de la reproducción,
 * simulando procesamiento en vivo.
 */
export function CasoAudioBrief({
  src,
  numero = '01',
  label = 'EL PUNTO DE PARTIDA · AUDIO REAL',
  antesTexto,
  transcripcion,
  color = NEGRO,
}: CasoAudioBriefProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [duracion, setDuracion] = useState(0)
  const [tiempoActual, setTiempoActual] = useState(0)
  const [peaks, setPeaks] = useState<number[]>(Array.from({ length: BARRAS }, () => 0.18))
  const [cargado, setCargado] = useState(false)

  const palabras = transcripcion.split(' ')
  const palabrasVisibles = Math.max(0, Math.min(palabras.length, Math.round(palabras.length * progreso)))

  useEffect(() => {
    let cancelado = false
    async function decodificar() {
      try {
        const AudioContextCtor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextCtor()
        const res = await fetch(src)
        if (!res.ok) throw new Error('audio no disponible')
        const buf = await res.arrayBuffer()
        const audioBuffer = await ctx.decodeAudioData(buf)
        const raw = audioBuffer.getChannelData(0)
        const blockSize = Math.max(1, Math.floor(raw.length / BARRAS))
        const out: number[] = []
        for (let i = 0; i < BARRAS; i++) {
          let suma = 0
          const inicio = i * blockSize
          for (let j = 0; j < blockSize; j++) suma += Math.abs(raw[inicio + j] ?? 0)
          out.push(suma / blockSize)
        }
        const max = Math.max(...out, 0.0001)
        if (!cancelado) setPeaks(out.map(v => Math.max(0.08, v / max)))
        ctx.close()
      } catch {
        // El archivo todavía no se subió a /public — deja barras planas de referencia.
      }
    }
    decodificar()
    return () => { cancelado = true }
  }, [src])

  const alternar = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) audio.pause()
    else audio.play().catch(() => setCargado(false))
  }

  const buscar = (clientX: number, target: HTMLElement) => {
    const audio = audioRef.current
    if (!audio || !duracion) return
    const rect = target.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duracion
    setProgreso(ratio)
    setTiempoActual(ratio * duracion)
  }

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
        {antesTexto && (
          <div className="px-8 pt-8 pb-4">
            <p className="text-sm font-medium" style={{ color: NEGRO, opacity: 0.6 }}>
              <span className="label" style={{ opacity: 0.4, marginRight: '0.5rem' }}>{numero}</span>
              {antesTexto}
            </p>
          </div>
        )}

        {/* Transcripción — se revela en proporción al avance del audio */}
        <div className="px-8 pb-6" style={{ minHeight: '96px' }}>
          <p className="text-lg leading-relaxed" style={{ color: NEGRO, fontFamily: 'var(--font-body)' }}>
            {palabras.slice(0, palabrasVisibles).join(' ')}
            {playing && palabrasVisibles < palabras.length && (
              <span style={{ opacity: 0.3 }}> …</span>
            )}
            {!playing && palabrasVisibles === 0 && (
              <span style={{ opacity: 0.3 }}>Dale play para escuchar y leer al mismo tiempo.</span>
            )}
          </p>
        </div>

        {/* Reproductor */}
        <div className="px-8 py-6" style={{ borderTop: '1px solid rgba(0,0,0,0.08)', backgroundColor: '#FAFAF8' }}>
          <div className="flex items-center gap-4">
            <button
              onClick={alternar}
              aria-label={playing ? 'Pausar' : 'Reproducir'}
              className="flex items-center justify-center hover:opacity-70 transition-opacity"
              style={{
                width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                backgroundColor: NEGRO, color: '#ffffff', border: 'none', cursor: 'pointer',
              }}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="1" y="0" width="4" height="14" /><rect x="9" y="0" width="4" height="14" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={{ marginLeft: '2px' }}><path d="M0 0L14 7L0 14V0Z" /></svg>
              )}
            </button>

            <div className="flex flex-col gap-1.5 flex-1">
              {/* Waveform */}
              <div
                onClick={e => buscar(e.clientX, e.currentTarget)}
                style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '32px', cursor: 'pointer' }}
              >
                {peaks.map((p, i) => {
                  const activo = i / BARRAS <= progreso
                  return (
                    <div key={i} style={{
                      flex: 1,
                      height: `${Math.max(10, p * 100)}%`,
                      backgroundColor: activo ? NEGRO : 'rgba(0,0,0,0.18)',
                      borderRadius: '1px',
                      transition: 'background-color 0.15s ease',
                    }} />
                  )
                })}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: NEGRO, opacity: 0.4, fontVariantNumeric: 'tabular-nums' }}>
                  {formatTime(tiempoActual)} / {formatTime(duracion)}
                </p>
                <p className="label" style={{ color: NEGRO, opacity: 0.3, fontSize: '0.6rem' }}>unedited</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={e => setDuracion(e.currentTarget.duration)}
        onCanPlay={() => setCargado(true)}
        onTimeUpdate={e => {
          const audio = e.currentTarget
          if (!audio.duration) return
          setTiempoActual(audio.currentTime)
          setProgreso(audio.currentTime / audio.duration)
        }}
      />
      {!cargado && (
        <p className="text-xs mt-3 text-center" style={{ color, opacity: 0.35 }}>
          {/* Visible solo mientras no exista el archivo en /public{src} */}
          Audio pendiente de cargar.
        </p>
      )}
    </div>
  )
}
