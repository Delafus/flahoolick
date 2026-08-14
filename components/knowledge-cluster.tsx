'use client'

import { useEffect, useRef } from 'react'

interface KnowledgeClusterProps {
  /** Diámetro del círculo madre (el borde nítido), como % del wrapper. */
  diameterPercent?: number
  color?: string
  /** Color de fondo detrás — debe calzar con el fondo real de la sección
   *  para que la capa líquida se funda sin dejar un recuadro visible. */
  bgColor?: string
}

interface NodoConfig { xFrac: number; yFrac: number; retardo: number; radioMaxFrac: number }

/** Nodos de "conocimiento" — posición y radio máximo como fracción del ancho
 *  del canvas, puerto directo de los valores del prototipo del usuario
 *  (originalmente sobre un canvas de 500px). */
const NODOS: NodoConfig[] = [
  { xFrac: -0.12, yFrac: -0.10, retardo: 20, radioMaxFrac: 0.22 },
  { xFrac: 0.14, yFrac: -0.06, retardo: 60, radioMaxFrac: 0.20 },
  { xFrac: -0.08, yFrac: 0.14, retardo: 110, radioMaxFrac: 0.26 },
  { xFrac: 0.10, yFrac: 0.12, retardo: 150, radioMaxFrac: 0.23 },
  { xFrac: -0.18, yFrac: -0.02, retardo: 200, radioMaxFrac: 0.18 },
  { xFrac: 0.02, yFrac: -0.18, retardo: 240, radioMaxFrac: 0.21 },
  { xFrac: 0, yFrac: 0, retardo: 300, radioMaxFrac: 0.42 }, // masa crítica central
]

interface ForcejeoConfig { angle: number; phase: number; speed: number; bulgeFrac: number }

/** Puntos donde la masa, ya atrapada, forcejea contra el borde — nunca
 *  logra salir (la ventana de recorte se lo impide), solo empuja y cede,
 *  en un ciclo continuo sin reinicio. */
const FORCEJEOS: ForcejeoConfig[] = [
  { angle: 0.3, phase: 0.0, speed: 0.007, bulgeFrac: 0.11 },
  { angle: 1.9, phase: 1.4, speed: 0.0055, bulgeFrac: 0.14 },
  { angle: 3.1, phase: 2.7, speed: 0.008, bulgeFrac: 0.09 },
  { angle: 4.4, phase: 4.0, speed: 0.006, bulgeFrac: 0.13 },
  { angle: 5.6, phase: 5.2, speed: 0.0065, bulgeFrac: 0.10 },
]

// Más chico que el borde de recorte (diameterPercent/2 ≈ 0.32) a propósito:
// deja margen para que el forcejeo empuje visiblemente contra el vidrio.
const RADIO_MADRE_FRAC = 0.26
const FASE_SATURACION_INICIO = 480

/** Estilo Yugo Nakamura: nodos que crecen y se funden como líquido (blur +
 *  contraste alto) hasta saturar el círculo madre por completo. A partir de
 *  ahí no colapsa ni reinicia — el conocimiento ya quedó atrapado, así que
 *  se queda forcejeando contra el borde para siempre, sin lograr salir.
 *  Puerto del prototipo canvas del usuario, con el final rediseñado. */
export function KnowledgeCluster({ diameterPercent = 64, color = '#000000', bgColor = '#D8D8D7' }: KnowledgeClusterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let frameId: number
    let fotograma = 0

    function setup() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      fotograma++
      const cx = width / 2
      const cy = height / 2
      const radioMadre = width * RADIO_MADRE_FRAC

      ctx!.fillStyle = bgColor
      ctx!.fillRect(0, 0, width, height)

      if (fotograma < FASE_SATURACION_INICIO) {
        // Fase 1: crecimiento orgánico y deformación progresiva de cada nodo.
        NODOS.forEach(n => {
          if (fotograma > n.retardo) {
            const tiempoVida = fotograma - n.retardo
            const progreso = Math.min(tiempoVida / 120, 1)
            const radioActual = width * n.radioMaxFrac * (1 - Math.pow(1 - progreso, 3))
            const x = cx + width * n.xFrac
            const y = cy + width * n.yFrac
            ctx!.beginPath()
            ctx!.arc(x, y, radioActual, 0, Math.PI * 2)
            ctx!.fillStyle = color
            ctx!.fill()
          }
        })
      } else {
        // Fase 2: ya atrapado — la masa base se queda sólida para siempre y
        // forcejea contra el borde en varios puntos (empuja, no logra salir,
        // cede, vuelve a empujar en otro punto). Sin reinicio.
        ctx!.beginPath()
        ctx!.arc(cx, cy, radioMadre, 0, Math.PI * 2)
        ctx!.fillStyle = color
        ctx!.fill()

        FORCEJEOS.forEach(f => {
          const pulso = (Math.sin(fotograma * f.speed + f.phase) + 1) / 2
          const bulgeRadius = width * f.bulgeFrac * pulso
          if (bulgeRadius < 0.5) return
          const edgeR = radioMadre * 0.88
          const x = cx + Math.cos(f.angle) * edgeR
          const y = cy + Math.sin(f.angle) * edgeR
          ctx!.beginPath()
          ctx!.arc(x, y, bulgeRadius, 0, Math.PI * 2)
          ctx!.fillStyle = color
          ctx!.fill()
        })
      }

      frameId = requestAnimationFrame(draw)
    }

    setup()
    frameId = requestAnimationFrame(draw)

    const resizeObserver = new ResizeObserver(setup)
    resizeObserver.observe(canvas)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [color, bgColor])

  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
      {/* Ventana de recorte — el círculo madre es una frontera real, nada de
          la masa líquida se dibuja fuera de ella. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${diameterPercent}%`,
          aspectRatio: '1/1',
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Capa líquida: blur + contraste alto funde los círculos entre sí.
            Va más grande que la ventana de recorte (equivalente al ancho
            completo del wrapper) para que el blur tenga margen y no se
            note su propio borde recto — solo se ve lo que cae dentro del
            círculo recortado. El contraste tan alto empuja el fondo a
            blanco puro (no calza con el gris real de la página) —
            mix-blend-mode:multiply lo vuelve invisible (blanco × cualquier
            color = ese mismo color) y deja pasar solo el negro. */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${10000 / diameterPercent}%`,
            aspectRatio: '1/1',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(10px) contrast(22)',
            mixBlendMode: 'multiply',
          }}
        >
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>
      {/* Círculo madre — línea nítida, siempre por encima de la masa líquida. */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${diameterPercent}%`,
          aspectRatio: '1/1',
          transform: 'translate(-50%, -50%)',
          border: `1.2px solid ${color}`,
          borderRadius: '50%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
