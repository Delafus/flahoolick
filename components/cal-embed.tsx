'use client'

import { useEffect } from 'react'

/** Evento de Cal.com para agendar la conversación inicial. */
export const CAL_LINK = 'flahoolick/conversacion-inicial'
export const CORREO_CONTACTO = 'felipe@flahoolick.com'

const NS = 'conversacion'
const CONFIG = JSON.stringify({ layout: 'month_view', theme: 'light' })

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, CalFn>; q?: unknown[] }

/** Carga el calendario de Cal.com una vez y hace que todo enlace a «#contacto» lo abra encima de la página.
    Así cada botón «Agenda una llamada» del sitio abre el calendario sin tener que tocarlos uno por uno. */
export function CalEmbed() {
  useEffect(() => {
    const w = window as unknown as { Cal?: CalFn }
    if (!w.Cal) {
      // Snippet oficial de Cal.com, adaptado a TypeScript.
      const d = document
      const push = (a: CalFn, ar: unknown) => { (a.q = a.q || []).push(ar) }
      const cal: CalFn = function (...ar: unknown[]) {
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = 'https://app.cal.com/embed/embed.js'
          cal.loaded = true
        }
        if (ar[0] === 'init') {
          const api: CalFn = function (...a: unknown[]) { push(api, a) }
          const namespace = ar[1]
          if (typeof namespace === 'string') {
            cal.ns![namespace] = cal.ns![namespace] || api
            push(cal.ns![namespace], ar)
            push(cal, ['initNamespace', namespace])
          } else push(cal, ar)
          return
        }
        push(cal, ar)
      }
      w.Cal = cal
      cal('init', NS, { origin: 'https://app.cal.com' })
      cal.ns![NS]('ui', {
        theme: 'light',
        layout: 'month_view',
        hideEventTypeDetails: false,
        cssVarsPerTheme: { light: { 'cal-brand': '#000000' }, dark: { 'cal-brand': '#E1F2F0' } },
      })
    }

    // Disparador invisible: Cal.com abre el calendario al hacer clic en un elemento con data-cal-link.
    let gatillo = document.getElementById('cal-gatillo') as HTMLButtonElement | null
    if (!gatillo) {
      gatillo = document.createElement('button')
      gatillo.id = 'cal-gatillo'
      gatillo.type = 'button'
      gatillo.hidden = true
      gatillo.setAttribute('data-cal-link', CAL_LINK)
      gatillo.setAttribute('data-cal-namespace', NS)
      gatillo.setAttribute('data-cal-config', CONFIG)
      document.body.appendChild(gatillo)
    }

    const alClic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = (e.target as HTMLElement | null)?.closest('a')
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (!/(^|\/)#contacto$/.test(href)) return
      e.preventDefault()
      e.stopPropagation()
      gatillo!.click()
    }
    document.addEventListener('click', alClic, true)
    return () => document.removeEventListener('click', alClic, true)
  }, [])

  return null
}

/** Botón que abre el calendario. */
export function BotonAgenda({ children = 'Agenda una conversación', className, style }: { children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <button type="button" data-cal-link={CAL_LINK} data-cal-namespace={NS} data-cal-config={CONFIG} className={className} style={style}>
      {children}
    </button>
  )
}
