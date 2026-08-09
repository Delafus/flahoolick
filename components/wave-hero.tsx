'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Hero de Metodología — única pieza del sitio fuera del sistema SVG 2D de
 * dot-grid.tsx / dot-pattern.tsx. Se justifica por ser el header de la
 * página más importante del método. Sigue leyéndose como "puntos": una
 * nube de partículas (THREE.Points), nunca una malla ni una superficie.
 * Referencia técnica: THREE.Points cuya posición Z ondula según
 * Math.sin(distancia_al_cursor - tiempo).
 */

const COLS = 46
const ROWS = 30
const SPACING = 0.26
const AMPLITUDE = 0.42
const WAVE_FREQ = 2.6
const WAVE_SPEED = 1.7

function construirGrilla() {
  const count = COLS * ROWS
  const positions = new Float32Array(count * 3)
  const base = new Float32Array(count * 3)
  let i = 0
  const anchoTotal = (COLS - 1) * SPACING
  const altoTotal = (ROWS - 1) * SPACING
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * SPACING - anchoTotal / 2
      const y = row * SPACING - altoTotal / 2
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = 0
      base[i * 3] = x
      base[i * 3 + 1] = y
      base[i * 3 + 2] = 0
      i++
    }
  }
  return { positions, base }
}

function soportaWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

/** Fallback estático — grilla plana quieta, sin Three.js, para reduced-motion o sin WebGL. */
function OlaEstatica() {
  const { base } = construirGrilla()
  const puntos: { x: number; y: number }[] = []
  for (let i = 0; i < base.length; i += 3) puntos.push({ x: base[i], y: base[i + 1] })
  const xs = puntos.map(p => p.x)
  const ys = puntos.map(p => p.y)
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  return (
    <svg viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`} style={{ width: '100%', height: '100%' }} aria-hidden="true">
      {puntos.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={SPACING * 0.16} fill="#ffffff" opacity={0.4} />
      ))}
    </svg>
  )
}

export function WaveHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [modoEstatico, setModoEstatico] = useState(false)

  useEffect(() => {
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (sinMovimiento || !soportaWebGL()) {
      setModoEstatico(true)
      return
    }

    const contenedorRef = containerRef.current
    if (!contenedorRef) return
    const contenedor: HTMLDivElement = contenedorRef

    let ancho = contenedor.clientWidth
    let alto = contenedor.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, ancho / Math.max(alto, 1), 0.1, 100)
    camera.position.set(0, -2.6, 4.6)
    camera.lookAt(0, 0.4, 0)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      setModoEstatico(true)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(ancho, alto)
    renderer.setClearColor(0x000000, 0)
    contenedor.appendChild(renderer.domElement)

    const { positions, base } = construirGrilla()
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.75,
    })
    const puntos = new THREE.Points(geometry, material)
    scene.add(puntos)

    const raycaster = new THREE.Raycaster()
    const plano = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const cursor = new THREE.Vector3(999, 999, 0) // fuera de la grilla — sin ola hasta el primer movimiento
    const cursorObjetivo = new THREE.Vector3(999, 999, 0)
    const puntoInterseccion = new THREE.Vector3()

    function onPointerMove(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera)
      if (raycaster.ray.intersectPlane(plano, puntoInterseccion)) {
        cursorObjetivo.copy(puntoInterseccion)
      }
    }
    function onPointerLeave() {
      cursorObjetivo.set(999, 999, 0)
    }

    let raf = 0
    let corriendo = false
    let visible = false
    const inicio = performance.now()

    function animar(now: number) {
      if (!corriendo) return
      const t = (now - inicio) * 0.001

      cursor.lerp(cursorObjetivo, 0.06)

      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const arr = posAttr.array as Float32Array
      const lejos = cursor.x > 500

      for (let i = 0; i < arr.length; i += 3) {
        const bx = base[i]
        const by = base[i + 1]
        if (lejos) {
          arr[i + 2] += (0 - arr[i + 2]) * 0.08
          continue
        }
        const dist = Math.hypot(bx - cursor.x, by - cursor.y)
        const decaimiento = Math.exp(-dist * 0.42)
        const z = AMPLITUDE * decaimiento * Math.sin(dist * WAVE_FREQ - t * WAVE_SPEED)
        arr[i + 2] += (z - arr[i + 2]) * 0.18
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animar)
    }

    function medir() {
      ancho = contenedor.clientWidth
      alto = contenedor.clientHeight
      if (ancho === 0 || alto === 0) return
      camera.aspect = ancho / alto
      camera.updateProjectionMatrix()
      renderer.setSize(ancho, alto)
    }

    medir()
    renderer.render(scene, camera)

    const ro = new ResizeObserver(() => {
      medir()
      if (!corriendo) renderer.render(scene, camera)
    })
    ro.observe(contenedor)

    const io = new IntersectionObserver(entradas => {
      visible = entradas[0]?.isIntersecting ?? false
      if (visible && !corriendo) {
        corriendo = true
        raf = requestAnimationFrame(animar)
      } else if (!visible && corriendo) {
        corriendo = false
        cancelAnimationFrame(raf)
      }
    }, { threshold: 0.01 })
    io.observe(contenedor)

    contenedor.addEventListener('pointermove', onPointerMove)
    contenedor.addEventListener('pointerleave', onPointerLeave)

    return () => {
      corriendo = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      contenedor.removeEventListener('pointermove', onPointerMove)
      contenedor.removeEventListener('pointerleave', onPointerLeave)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === contenedor) contenedor.removeChild(renderer.domElement)
    }
  }, [])

  if (modoEstatico) {
    return <OlaEstatica />
  }

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
