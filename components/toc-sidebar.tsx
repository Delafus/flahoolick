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
    <nav aria-label="Tabla de contenidos" style={{ position: 'sticky', top: 'calc(64px + 6rem)' }}>
      <p style={{
        fontFamily: 'var(--font-bricolage)',
        fontWeight: 800,
        fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
        lineHeight: 1.1,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        marginBottom: '2rem',
      }}>
        Tabla de contenidos
      </p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', borderLeft: '2px solid var(--jerga-line)' }}>
        {items.map(item => {
          const esActivo = item.id === activo
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                style={{
                  display: 'block',
                  padding: '0.9rem 1rem 0.9rem 1.5rem',
                  marginLeft: '-2px',
                  borderLeft: esActivo ? '6px solid var(--jerga-dark)' : '2px solid transparent',
                  fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
                  lineHeight: 1.35,
                  fontWeight: esActivo ? 600 : 400,
                  opacity: esActivo ? 1 : 0.48,
                  transition: 'opacity 0.2s ease, border-color 0.2s ease, font-weight 0.2s ease',
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
