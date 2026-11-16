import Link from 'next/link'
import { PageColorSetter } from './page-color-setter'
import { ContactForm } from './contact-form'

export const FUENTE = { fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }
export const ENLACE = 'underline underline-offset-4 decoration-1 hover:opacity-50 transition-opacity'

const ANCHO_TEXTO = '40rem'

/** Verde de Flahoolick. Solo como fondo con texto negro, o como acento sobre fondo oscuro: sobre blanco no se lee. */
export const VERDE = '#1FDE91'

/** Fondo verde de borde a borde sin cambiar el ancho del contenido. Regla: un módulo verde por página. */
const BANDA_VERDE: React.CSSProperties = {
  backgroundColor: VERDE,
  boxShadow: `0 0 0 100vmax ${VERDE}`,
  clipPath: 'inset(0 -100vmax)',
}

/** Fondo blanco y texto negro, sin columna: para páginas que mezclan texto e imágenes anchas. */
export function Lienzo({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-px text-lg leading-relaxed" style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'var(--font-inter)' }}>
      <PageColorSetter bg="#ffffff" text="#000000" />
      {children}
    </div>
  )
}

export function Columna({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex flex-col" style={{ maxWidth: ANCHO_TEXTO }}>{children}</div>
}

export function Pagina({ children }: { children: React.ReactNode }) {
  return <Lienzo><Columna>{children}</Columna></Lienzo>
}

export function Hero({ eyebrow, titulo, bajada, cta = 'Conversemos →', nota, completo = false, verde = false, visual }: {
  eyebrow?: string
  titulo: React.ReactNode
  bajada?: React.ReactNode
  cta?: string | null
  nota?: string
  /** Ocupa toda la pantalla (portada). */
  completo?: boolean
  /** Fondo verde de borde a borde. */
  verde?: boolean
  /** Ilustración sobre el titular, ej. el sello giratorio. */
  visual?: React.ReactNode
}) {
  return (
    <section className="flex flex-col justify-center gap-8" style={{ minHeight: completo ? '100dvh' : '75dvh', paddingTop: verde ? '128px' : '64px', paddingBottom: verde ? '64px' : undefined, ...(verde ? BANDA_VERDE : {}) }}>
      {visual}
      {eyebrow && <p className="text-base" style={{ opacity: 0.5 }}>{eyebrow}</p>}
      <h1 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
        {titulo}
      </h1>
      {bajada && <p>{bajada}</p>}
      {cta && (
        <p>
          <Link href="#contacto" className={ENLACE}>{cta}</Link>
          {nota && <span className="block text-base mt-2" style={{ opacity: 0.5 }}>{nota}</span>}
        </p>
      )}
    </section>
  )
}

/** Sección a pantalla completa con titular de portada (h2): para las portadas secundarias de la home. */
export function Pantalla({ titulo, verde = false, children }: { titulo: React.ReactNode; verde?: boolean; children?: React.ReactNode }) {
  return (
    <section className="flex flex-col justify-center gap-8 py-16" style={{ minHeight: '100dvh', ...(verde ? BANDA_VERDE : {}) }}>
      <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

export function Bloque({ titulo, id, etiqueta, verde = false, visual, children }: {
  titulo: React.ReactNode
  /** Ilustración sobre el titular. */
  visual?: React.ReactNode
  id?: string
  /** Fondo verde de borde a borde. */
  verde?: boolean
  /** Línea pequeña sobre el titular, ej. "El problema". */
  etiqueta?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex flex-col gap-6 py-16 md:py-24" style={{ scrollMarginTop: '64px', ...(verde ? BANDA_VERDE : {}) }}>
      {visual}
      {etiqueta && <p className="text-base" style={{ opacity: 0.5, marginBottom: '-0.75rem' }}>{etiqueta}</p>}
      <h2 className="text-[1.75rem] md:text-[2.25rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.15 }}>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

export interface Item {
  titulo: string
  texto: string
  href?: string
  cta?: string
}

export function Items({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map(i => (
        <div key={i.titulo}>
          <h3 style={{ ...FUENTE, fontWeight: 500, letterSpacing: 'normal', fontSize: 'inherit', lineHeight: 'inherit' }}>{i.titulo}</h3>
          <p>{i.texto}</p>
          {i.href && <p className="mt-2"><Link href={i.href} className={ENLACE}>{i.cta ?? 'Explorar →'}</Link></p>}
        </div>
      ))}
    </div>
  )
}

/** Lleva el caso Dunamis a la página de cada servicio. */
export function CasoEnlace({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <Bloque titulo={titulo}>
      {children}
      <p><Link href="/casos/dunamis" className={ENLACE}>Recorre el caso Dunamis →</Link></p>
    </Bloque>
  )
}

export function Cierre({ titulo, texto, cta }: { titulo: string; texto?: string; cta: string }) {
  return (
    <Bloque titulo={titulo}>
      {texto && <p>{texto}</p>}
      <ContactForm minimal submitLabel={cta} />
    </Bloque>
  )
}
