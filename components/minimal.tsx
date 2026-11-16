import Link from 'next/link'
import { PageColorSetter } from './page-color-setter'
import { ContactForm } from './contact-form'

export const FUENTE = { fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }
export const ENLACE = 'underline underline-offset-4 decoration-1 hover:opacity-50 transition-opacity'

const ANCHO_TEXTO = '40rem'

/** Verde de Flahoolick. Solo como fondo con texto negro, o como acento sobre fondo oscuro: sobre blanco no se lee. */
export const VERDE = '#1FDE91'

export const NEGRO = '#1C1C1C'
export const GRIS = '#EFEFEF'

/** Color de fondo de un módulo. Sin tono, el módulo queda sobre blanco.
    Ritmo: blanco como base, negro para las ideas de peso, gris para listas, y verde solo para las secciones "Flahoolick". */
export type Tono = 'verde' | 'negro' | 'gris'

const TONOS: Record<Tono, { fondo: string; texto: string }> = {
  verde: { fondo: VERDE, texto: '#000000' },
  negro: { fondo: NEGRO, texto: '#ffffff' },
  gris: { fondo: GRIS, texto: '#000000' },
}

/** Fondo de borde a borde sin cambiar el ancho del contenido. */
function banda(tono?: Tono): React.CSSProperties {
  if (!tono) return {}
  const { fondo, texto } = TONOS[tono]
  return { backgroundColor: fondo, color: texto, boxShadow: `0 0 0 100vmax ${fondo}`, clipPath: 'inset(0 -100vmax)' }
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

/** Colores de cabecera: cada sección del sitio abre con un gran hero de su color y el resto de la página va en blanco.
    El header y el megamenú toman el mismo color. */
export const CABECERAS = {
  negro: { fondo: '#000000', texto: '#ffffff' },
  rosa: { fondo: '#EF9DB6', texto: '#000000' },
  amarillo: { fondo: '#F5FD92', texto: '#000000' },
  verde: { fondo: VERDE, texto: '#000000' },
  menta: { fondo: '#8FE8BB', texto: '#000000' },
} as const
export type Cabecera = keyof typeof CABECERAS

const ANCHO_HERO = 'min(80rem, calc(100vw - 2 * var(--page-px)))'

export function Hero({ eyebrow, titulo, bajada, cta = 'Agenda una llamada', nota, completo = false, color, visual }: {
  eyebrow?: string
  titulo: React.ReactNode
  bajada?: React.ReactNode
  cta?: string | null
  nota?: string
  /** Ocupa toda la pantalla (portada). */
  completo?: boolean
  /** Hero grande de color, de borde a borde, con el titular a la izquierda y `visual` a la derecha. */
  color?: Cabecera
  /** Imagen o ilustración del hero de color. */
  visual?: React.ReactNode
}) {
  if (color) {
    const { fondo, texto } = CABECERAS[color]
    return (
      <section
        className={`relative grid grid-cols-1 items-center gap-12 ${visual ? 'lg:grid-cols-2 lg:gap-16' : ''}`}
        style={{
          left: '50%', transform: 'translateX(-50%)', width: ANCHO_HERO,
          minHeight: '100dvh', paddingTop: 'calc(64px + 3.5rem)', paddingBottom: '4rem',
          backgroundColor: fondo, color: texto, boxShadow: `0 0 0 100vmax ${fondo}`, clipPath: 'inset(0 -100vmax)',
        }}
      >
        <PageColorSetter bg={fondo} text={texto} />
        <div className="flex flex-col gap-8" style={visual ? undefined : { maxWidth: '60rem' }}>
          {eyebrow && <p className="label">{eyebrow}</p>}
          <h1 style={{ ...FUENTE, fontWeight: 500, fontSize: 'clamp(2.75rem, 5.4vw, 5.5rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
            {titulo}
          </h1>
          {bajada && <p className="text-xl md:text-2xl" style={{ lineHeight: 1.35, maxWidth: '34rem' }}>{bajada}</p>}
          {cta && (
            <div className="flex flex-col gap-3">
              <Link href="#contacto" className="btn-invert label inline-flex w-fit items-center px-7 py-4"
                style={{ '--btn-bg': texto, '--btn-fg': fondo, borderRadius: '999px' } as React.CSSProperties}>
                {cta}
              </Link>
              {nota && <span className="text-base" style={{ opacity: 0.7 }}>{nota}</span>}
            </div>
          )}
        </div>
        {visual && (
          <div className="mx-auto w-full lg:mr-0" style={{ maxWidth: '34rem', aspectRatio: '1 / 1' }}>
            {visual}
          </div>
        )}
      </section>
    )
  }
  return (
    <section className="flex flex-col justify-center gap-8" style={{ minHeight: completo ? '100dvh' : '75dvh', paddingTop: '64px' }}>
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
export function Pantalla({ titulo, tono, children }: { titulo: React.ReactNode; tono?: Tono; children?: React.ReactNode }) {
  return (
    <section className="flex flex-col justify-center gap-8 py-16" style={{ minHeight: '100dvh', ...banda(tono) }}>
      <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

export function Bloque({ titulo, id, etiqueta, tono, visual, children }: {
  titulo: React.ReactNode
  /** Ilustración sobre el titular. */
  visual?: React.ReactNode
  id?: string
  tono?: Tono
  /** Línea pequeña sobre el titular, ej. "El problema". */
  etiqueta?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex flex-col gap-6 py-16 md:py-24" style={{ scrollMarginTop: '64px', ...banda(tono) }}>
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
