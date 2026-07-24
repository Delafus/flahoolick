'use client'

import { useEffect, useState } from 'react'
import type { TocItem } from '@/lib/toc'

export function TocSidebar({ items }: { items: TocItem[] }) {
  const [activo, setActivo] = useState<string | null>(items[0]?.id ?? null)

  useEffect(() => {
    const headings = items
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visibles = entries.filter(e => e.isIntersecting)
        if (visibles.length > 0) {
          setActivo(visibles[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )

    headings.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav aria-label="Tabla de contenidos" style={{ position: 'sticky', top: 'calc(64px + 3rem)' }}>
      <p className="label" style={{ opacity: 0.4, marginBottom: '1rem' }}>En esta guía</p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '1px solid rgba(0,0,0,0.15)' }}>
        {items.map(item => {
          const esActivo = item.id === activo
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                style={{
                  display: 'block',
                  paddingLeft: '1rem',
                  marginLeft: '-1px',
                  borderLeft: esActivo ? '2px solid #000000' : '1px solid transparent',
                  fontSize: '0.9rem',
                  lineHeight: 1.4,
                  opacity: esActivo ? 1 : 0.5,
                  transition: 'opacity 0.15s ease',
                }}
              >
                {item.texto}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
