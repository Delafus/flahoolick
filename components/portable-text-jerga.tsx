import Image from 'next/image'
import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { JergaRecorridoCompra } from '@/components/jerga-recorrido-compra'

const NEGRO = '#000000'

function limpiarCierreDeItem(node: ReactNode): ReactNode {
  const items = Children.toArray(node)

  for (let index = items.length - 1; index >= 0; index -= 1) {
    const item = items[index]

    if (typeof item === 'string') {
      if (!item.trim()) continue
      items[index] = item.replace(/[;,.]\s*$/, '')
      break
    }

    if (isValidElement(item)) {
      const element = item as ReactElement<{ children?: ReactNode }>
      if (element.props.children == null) continue
      items[index] = cloneElement(element, undefined, limpiarCierreDeItem(element.props.children))
      break
    }
  }

  return items
}

function textoPlanoDelBloque(value: { children?: unknown[] }) {
  return value.children?.map(child => (
    typeof child === 'object' && child !== null && 'text' in child && typeof child.text === 'string'
      ? child.text
      : ''
  )).join('') ?? ''
}

const componentes: PortableTextComponents = {
  block: {
    normal: ({ children, value }) => {
      const mostrarRecorrido = textoPlanoDelBloque(value).startsWith(
        'La lista de proveedores suele comenzar a formarse antes del contacto comercial',
      )

      return (
        <>
          <p style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', lineHeight: 1.75, opacity: 0.8, marginBottom: '1.5rem' }}>
            {children}
          </p>
          {mostrarRecorrido && <JergaRecorridoCompra />}
        </>
      )
    },
    h2: ({ children, value }) => (
      <h2 id={value._key} className="jerga-guide-section-title" style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
        lineHeight: 1.1,
        letterSpacing: '-0.015em',
        marginTop: '3.5rem',
        marginBottom: '1.5rem',
        scrollMarginTop: '6rem',
      }}>{children}</h2>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="jerga-content-list">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li style={{
        fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
        lineHeight: 1.7,
        opacity: 0.8,
        marginBottom: '0.75rem',
      }}>
        {limpiarCierreDeItem(children)}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
        {children}
      </a>
    ),
  },
  types: {
    cita: ({ value }) => (
      <figure style={{ margin: '3rem 0', paddingLeft: '2rem', borderLeft: `2px solid ${NEGRO}` }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
        }}>{value.quote}</p>
        {value.autor && (
          <figcaption className="label" style={{ opacity: 0.45, marginTop: '1rem' }}>{value.autor}</figcaption>
        )}
      </figure>
    ),
    destacado: ({ value }) => (
      <div style={{ margin: '3rem 0', padding: '2rem', backgroundColor: 'rgba(0,0,0,0.05)' }}>
        <p style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', lineHeight: 1.5, fontWeight: 500 }}>
          {value.texto}
        </p>
      </div>
    ),
    paso: ({ value }) => (
      <div style={{ margin: '2.5rem 0', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
        <div className="flex items-baseline gap-4 mb-3">
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            lineHeight: 1,
            opacity: 0.2,
          }}>{String(value.numero).padStart(2, '0')}</span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(1.375rem, 2.2vw, 1.875rem)',
            lineHeight: 1.15,
          }}>{value.titulo}</h3>
        </div>
        <p style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', lineHeight: 1.75, opacity: 0.8 }}>
          {value.texto}
        </p>
      </div>
    ),
    imagenEnCuerpo: ({ value }) => (
      <figure style={{ margin: '3rem 0' }}>
        <div style={{ position: 'relative', aspectRatio: value.ratio ?? '16/9', backgroundColor: 'rgba(0,0,0,0.07)' }}>
          {value.image && (
            <Image
              src={urlFor(value.image).width(1600).url()}
              alt={value.alt ?? ''}
              fill
              className="jerga-duotone-image"
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
        {value.pie && (
          <figcaption className="text-sm" style={{ opacity: 0.5, marginTop: '0.75rem' }}>{value.pie}</figcaption>
        )}
      </figure>
    ),
  },
}

export function CuerpoJerga({ value }: { value: any[] }) {
  return <PortableText value={value} components={componentes} />
}
