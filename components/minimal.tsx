import Link from 'next/link'
import { PageColorSetter } from './page-color-setter'
import { ContactForm } from './contact-form'

export const FUENTE = { fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }
export const ENLACE = 'underline underline-offset-4 decoration-1 hover:opacity-50 transition-opacity'

const ANCHO_TEXTO = '40rem'
const ANCHO_PAGINA = '80rem'

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
    <div className="page-px text-lg leading-relaxed" style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'var(--font-inter)', overflowX: 'clip' }}>
      <PageColorSetter bg="#ffffff" text="#000000" />
      {children}
    </div>
  )
}

/** Columna de contenido. Angosta por defecto (lectura corrida). Con `ancha`, cada Bloque se abre en dos columnas
    en escritorio: titular a la izquierda y texto a la derecha (ver `.columna-ancha` en globals.css). */
export function Columna({ ancha = false, children }: { ancha?: boolean; children: React.ReactNode }) {
  return (
    <div className={`mx-auto flex flex-col ${ancha ? 'columna-ancha' : ''}`} style={{ maxWidth: ancha ? ANCHO_PAGINA : ANCHO_TEXTO }}>
      {children}
    </div>
  )
}

export function Pagina({ angosta = false, children }: { angosta?: boolean; children: React.ReactNode }) {
  return <Lienzo><Columna ancha={!angosta}>{children}</Columna></Lienzo>
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
  /** Hero grande de color, de borde a borde, con el texto centrado y `visual` debajo. */
  color?: Cabecera
  /** Imagen o ilustración del hero de color. */
  visual?: React.ReactNode
}) {
  if (color) {
    const { fondo, texto } = CABECERAS[color]
    return (
      <section
        className="relative flex flex-col items-center justify-center gap-14 text-center"
        style={{
          left: '50%', transform: 'translateX(-50%)', width: ANCHO_HERO,
          minHeight: '100dvh', paddingTop: 'calc(64px + 3.5rem)', paddingBottom: '4rem',
          backgroundColor: fondo, color: texto, boxShadow: `0 0 0 100vmax ${fondo}`, clipPath: 'inset(0 -100vmax)',
        }}
      >
        <PageColorSetter bg={fondo} text={texto} />
        <div className="flex flex-col items-center gap-8" style={{ maxWidth: '64rem' }}>
          {eyebrow && <p className="label">{eyebrow}</p>}
          <h1 style={{ ...FUENTE, fontWeight: 500, fontSize: 'clamp(2.75rem, 6.2vw, 6.5rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
            {titulo}
          </h1>
          {bajada && <p className="text-xl md:text-2xl" style={{ lineHeight: 1.35, maxWidth: '40rem' }}>{bajada}</p>}
          {cta && (
            <div className="flex flex-col items-center gap-3">
              <Link href="#contacto" className="btn-invert label inline-flex w-fit items-center px-7 py-4"
                style={{ '--btn-bg': texto, '--btn-fg': fondo, borderRadius: '999px' } as React.CSSProperties}>
                {cta}
              </Link>
              {nota && <span className="text-base" style={{ opacity: 0.7 }}>{nota}</span>}
            </div>
          )}
        </div>
        {/* La imagen, si la hay, va debajo del texto. */}
        {visual && <div className="w-full" style={{ maxWidth: '26rem', aspectRatio: '1 / 1' }}>{visual}</div>}
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
      <h2 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '22ch' }}>
        {titulo}
      </h2>
      <div className="flex flex-col gap-8" style={{ maxWidth: ANCHO_TEXTO }}>{children}</div>
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
    <section id={id} className="bloque flex flex-col gap-6 py-16 md:py-24" style={{ scrollMarginTop: '64px', ...banda(tono) }}>
      <div className="bloque-titulo flex flex-col gap-6">
        {visual}
        {etiqueta && <p className="label w-fit px-3 py-1.5" style={{ backgroundColor: '#000000', color: VERDE, borderRadius: '999px' }}>{etiqueta}</p>}
        <h2 className="text-[1.75rem] md:text-[2.25rem]" style={{ ...FUENTE, fontWeight: 500, lineHeight: 1.15 }}>
          {titulo}
        </h2>
      </div>
      <div className="bloque-cuerpo flex flex-col gap-6">{children}</div>
    </section>
  )
}

export interface Item {
  titulo: string
  texto: string
  /** Con enlace, el ítem completo es clicable; al pasar el cursor se subraya el título. Sin botón aparte. */
  href?: string
}

export function Items({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map(i => {
        const contenido = (
          <>
            <h3 className={i.href ? 'underline-offset-4 decoration-1 group-hover:underline' : undefined}
              style={{ ...FUENTE, fontWeight: 500, letterSpacing: 'normal', fontSize: 'inherit', lineHeight: 'inherit' }}>{i.titulo}</h3>
            <p>{i.texto}</p>
          </>
        )
        return i.href
          ? <Link key={i.titulo} href={i.href} className="group block">{contenido}</Link>
          : <div key={i.titulo}>{contenido}</div>
      })}
    </div>
  )
}

/** Lleva la historia de Dunamis a la página de cada servicio. */
export function CasoEnlace({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <Bloque titulo={titulo}>
      {children}
      <p><Link href="/clientes/dunamis" className={ENLACE}>Lee la historia de Dunamis →</Link></p>
    </Bloque>
  )
}

/** Módulo de contacto de todo el sitio: el de la versión anterior (gris cálido, titular mixto, campos blancos y botón blanco),
    a todo el ancho de la pantalla. Los textos de cada página ya no se usan aquí: el módulo es el mismo en todo el sitio. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Cierre(_props: { titulo?: string; texto?: string; cta?: string }) {
  return (
    <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
      <ContactForm bg="#403D37" text="#ffffff" submitLabel="Agenda una llamada" />
    </div>
  )
}
