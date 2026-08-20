'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface FloatingObject {
  mesh: THREE.Mesh
  baseY: number
  phase: number
  floatSpeed: number
  spinX: number
  spinY: number
}

export function ServiciosHero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const group = new THREE.Group()
    scene.add(group)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15

    const camera = new THREE.PerspectiveCamera(44, 4 / 3, 0.1, 100)
    camera.position.z = 11

    scene.add(new THREE.HemisphereLight(0xffffff, 0x202020, 1.45))
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2)
    keyLight.position.set(5, 6, 7)
    scene.add(keyLight)
    const rimLight = new THREE.DirectionalLight(0x1fde91, 1.4)
    rimLight.position.set(-5, -2, 4)
    scene.add(rimLight)

    const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.22, metalness: 0.08 })
    const greenMaterial = new THREE.MeshStandardMaterial({ color: 0x1fde91, roughness: 0.24, metalness: 0.08 })
    const pinkMaterial = new THREE.MeshStandardMaterial({ color: 0xef9db6, roughness: 0.24, metalness: 0.08 })

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.05, 32, 32), whiteMaterial)
    sphere.position.set(-2.15, 1.15, 0)

    const pyramid = new THREE.Mesh(new THREE.TetrahedronGeometry(1.3), greenMaterial)
    pyramid.position.set(2.05, 1.5, -0.75)

    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 1.85, 32), pinkMaterial)
    cylinder.position.set(2.35, -1.35, 0.65)
    cylinder.rotation.x = Math.PI / 4

    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), whiteMaterial)
    cube.position.set(-2.35, -1.3, 0.4)

    const objects: FloatingObject[] = [
      { mesh: sphere, baseY: sphere.position.y, phase: 0, floatSpeed: 0.85, spinX: 0.18, spinY: 0.26 },
      { mesh: pyramid, baseY: pyramid.position.y, phase: 1.4, floatSpeed: 0.72, spinX: 0.28, spinY: 0.34 },
      { mesh: cylinder, baseY: cylinder.position.y, phase: 2.8, floatSpeed: 0.78, spinX: 0.2, spinY: 0.16 },
      { mesh: cube, baseY: cube.position.y, phase: 4.2, floatSpeed: 0.68, spinX: 0.24, spinY: 0.3 },
    ]
    objects.forEach(object => group.add(object.mesh))

    let width = 1
    let height = 1
    let frameId = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let previousTime = performance.now()
    let elapsed = 0

    function resize() {
      const rect = container!.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }

    function onPointerMove(event: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5
      targetRotationY = normalizedX * 0.38
      targetRotationX = normalizedY * 0.24
    }

    function onPointerLeave() {
      targetRotationX = 0
      targetRotationY = 0
    }

    function draw(time: number) {
      const delta = Math.min((time - previousTime) / 1000, 0.05)
      previousTime = time
      elapsed += delta

      group.rotation.x += (targetRotationX - group.rotation.x) * 0.055
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.055

      objects.forEach(object => {
        object.mesh.rotation.x += object.spinX * delta
        object.mesh.rotation.y += object.spinY * delta
        object.mesh.position.y = object.baseY + Math.sin(elapsed * object.floatSpeed + object.phase) * 0.22
      })

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(draw)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    container.addEventListener('pointermove', onPointerMove)
    container.addEventListener('pointerleave', onPointerLeave)
    resize()

    if (reducedMotion) renderer.render(scene, camera)
    else frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerleave', onPointerLeave)
      objects.forEach(object => object.mesh.geometry.dispose())
      whiteMaterial.dispose()
      greenMaterial.dispose()
      pinkMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} aria-hidden="true" style={{ height: '100%', position: 'relative', width: '100%' }}>
      <div
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          height: '180%',
          left: '50%',
          maskImage: 'radial-gradient(ellipse at center, #000 14%, transparent 62%)',
          pointerEvents: 'none',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -45%) perspective(700px) rotateX(68deg)',
          transformOrigin: 'center',
          width: '180%',
        }}
      />
      <canvas ref={canvasRef} style={{ display: 'block', height: '100%', position: 'relative', width: '100%' }} />
    </div>
  )
}
