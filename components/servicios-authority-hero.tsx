'use client'

import { useEffect, useRef } from 'react'

const SPHERES = [
  { phase: 0.15 },
  { phase: 2.25 },
  { phase: 4.35 },
]

export function ServiciosAuthorityHero() {
  const sceneRef = useRef<SVGGElement>(null)
  const backSphereRefs = useRef<Array<SVGGElement | null>>([])
  const frontSphereRefs = useRef<Array<SVGGElement | null>>([])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId = 0
    const startTime = performance.now()

    function draw(time: number) {
      const elapsed = reducedMotion ? 0 : (time - startTime) / 1000
      const suspension = Math.sin(elapsed * 0.55) * 10
      scene!.setAttribute('transform', `translate(0 ${suspension.toFixed(2)})`)

      SPHERES.forEach((sphere, index) => {
        const angle = elapsed * 0.42 + sphere.phase
        const depth = Math.sin(angle)
        const x = 260 + Math.cos(angle) * 181
        const y = 218 + depth * 36
        const depthScale = 0.62 + (depth + 1) * 0.38
        const transform = `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${depthScale.toFixed(3)})`
        const isFront = depth >= 0
        const backSphere = backSphereRefs.current[index]
        const frontSphere = frontSphereRefs.current[index]

        if (backSphere) {
          backSphere.setAttribute('transform', transform)
          backSphere.style.opacity = isFront ? '0' : '1'
        }
        if (frontSphere) {
          frontSphere.setAttribute('transform', transform)
          frontSphere.style.opacity = isFront ? '1' : '0'
        }
      })

      if (!reducedMotion) frameId = requestAnimationFrame(draw)
    }

    draw(startTime)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const sphere = (index: number, layer: 'back' | 'front') => (
    <g
      key={`${layer}-${index}`}
      ref={node => {
        if (layer === 'back') backSphereRefs.current[index] = node
        else frontSphereRefs.current[index] = node
      }}
    >
      <circle cx="0" cy="0" r="27" fill="url(#authority-sphere-gradient)" />
    </g>
  )

  return (
    <div aria-hidden="true" style={{ height: '100%', position: 'relative', width: '100%' }}>
      {/* La malla permanece completamente fija. */}
      <div
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.32) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.32) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          height: '190%',
          left: '50%',
          maskImage: 'radial-gradient(ellipse at center, #000 24%, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 24%, transparent 76%)',
          pointerEvents: 'none',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -45%) perspective(700px) rotateX(68deg)',
          transformOrigin: 'center',
          width: '190%',
        }}
      />

      <svg
        viewBox="0 0 520 420"
        style={{ height: '100%', overflow: 'visible', position: 'relative', width: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id="authority-sphere-gradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(-10.8 -10.8) scale(37.8)"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="0.35" stopColor="#E0E0E0" />
            <stop offset="1" stopColor="#707070" />
          </radialGradient>
        </defs>

        <g ref={sceneRef}>
          {/* Mitad posterior: estas esferas pasan por detrás de la pirámide. */}
          <g>{SPHERES.map((_, index) => sphere(index, 'back'))}</g>

          {/* Pirámide original de Flahoolick, centrada sobre la malla. */}
          <g transform="translate(150 82) scale(0.85)">
            <path d="M129.92 0L0 178.639L129.92 243.599V0Z" fill="#1FDE91" />
            <path d="M129.919 0V243.599L259.839 178.639L129.919 0Z" fill="#15A067" />
            <path opacity="0.1" d="M0 178.64L129.92 243.6L259.839 178.64L129.92 146.16L0 178.64Z" fill="#000000" />
          </g>

          {/* Mitad frontal: estas esferas cruzan por delante de la pirámide. */}
          <g>{SPHERES.map((_, index) => sphere(index, 'front'))}</g>
        </g>
      </svg>
    </div>
  )
}
