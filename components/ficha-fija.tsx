'use client'

import { useEffect, useRef } from 'react'

/** Columna lateral que sube con la página hasta que se ve completa su parte baja (el botón) y desde ahí queda fija.
    Si cabe entera en la pantalla, queda fija bajo el menú. Solo en escritorio (lg); en teléfono es una columna normal. */
export function FichaFija({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const MARGEN_ARRIBA = 100 // bajo el menú
    const MARGEN_ABAJO = 32

    const ajustar = () => {
      const alto = el.offsetHeight
      const top = Math.min(MARGEN_ARRIBA, window.innerHeight - alto - MARGEN_ABAJO)
      el.style.top = `${top}px`
    }
    ajustar()
    const ro = new ResizeObserver(ajustar)
    ro.observe(el)
    window.addEventListener('resize', ajustar)
    return () => { ro.disconnect(); window.removeEventListener('resize', ajustar) }
  }, [])

  return (
    <aside ref={ref} className="flex flex-col gap-8 self-start lg:sticky">
      {children}
    </aside>
  )
}
