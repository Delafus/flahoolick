import Link from 'next/link'
import { PageColorSetter } from './page-color-setter'
import { ContactForm } from './contact-form'

export const FUENTE = { fontFamily: 'var(--font-inter)', letterSpacing: '-0.02em' }
/** Letra destacada de los titulares grandes (heroes y portadas): Bricolage Grotesque 800. */
export const DESTACADA = { fontFamily: 'var(--font-bricolage)', fontWeight: 800 } as const
/** Segunda voz de los titulares, como en el footer: Instrument Serif en cursiva, dentro de un titular en Bricolage. */
export function Italica({ children }: { children: React.ReactNode }) {
  return <em style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400, letterSpacing: '-0.02em' }}>{children}</em>
}
/** Pone en cursiva el remate de un titular: `cursiva` es el final exacto del texto. */
function conCursiva(titulo: React.ReactNode, cursiva?: string) {
  if (!cursiva || typeof titulo !== 'string' || !titulo.endsWith(cursiva)) return titulo
  return <>{titulo.slice(0, -cursiva.length)}<Italica>{cursiva}</Italica></>
}
export const ENLACE = 'underline underline-offset-4 decoration-1 hover:opacity-50 transition-opacity'

/** Botón de contorno para llevar a otra página (en lugar de texto subrayado con flecha). Al pasar el cursor se rellena de negro. */
/** `claro`: versión blanca, para fondos negros. */
export function Boton({ href, children, claro }: { href: string; children: React.ReactNode; claro?: boolean }) {
  return <Link href={href} className={`${claro ? 'boton-contorno-claro' : 'boton-contorno'} label inline-flex w-fit items-center px-6 py-3`}>{children}</Link>
}

const ANCHO_TEXTO = '40rem'
const ANCHO_PAGINA = '80rem'

/** Verde de Flahoolick: el menta (#8FE8BB), que reemplazó al #1FDE91 el 2026-11-18. Solo como fondo con texto negro, o como acento sobre fondo oscuro: sobre blanco no se lee. */
export const VERDE = '#8FE8BB'

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
  /** Rosa claro con texto azul noche (2026-11-19; antes #EF9DB6 con texto negro). */
  rosa: { fondo: '#FFDAED', texto: '#1C1854' },
  amarillo: { fondo: '#F5FD92', texto: '#000000' },
  verde: { fondo: VERDE, texto: '#000000' },
  menta: { fondo: '#8FE8BB', texto: '#000000' },
  /** Prueba de color (2026-11-19): fondo hielo con texto azul noche, en el hero de la home y el bloque de metodología. */
  hielo: { fondo: '#E1F2F0', texto: '#1C1854' },
} as const
export type Cabecera = keyof typeof CABECERAS

const ANCHO_HERO = 'min(80rem, calc(100vw - 2 * var(--page-px)))'

export function Hero({ eyebrow, titulo, cursiva, bajada, cta = 'Agenda una llamada', nota, completo = false, color, visual, compacto = false }: {
  /** Línea pequeña sobre el titular. Puede ser una miga de pan con enlaces. */
  eyebrow?: React.ReactNode
  titulo: React.ReactNode
  /** Remate del titular en Instrument Serif cursiva (el final exacto de `titulo`). */
  cursiva?: string
  bajada?: React.ReactNode
  cta?: string | null
  nota?: string
  /** Ocupa toda la pantalla (portada). */
  completo?: boolean
  /** Hero grande de color, de borde a borde, con el texto centrado y `visual` debajo. */
  color?: Cabecera
  /** Imagen o ilustración del hero de color. */
  visual?: React.ReactNode
  /** Hero de color del alto de su contenido, sin ocupar la pantalla completa. */
  compacto?: boolean
}) {
  if (color) {
    const { fondo, texto } = CABECERAS[color]
    return (
      <section
        className="relative flex flex-col items-center justify-center gap-14 text-center"
        style={{
          left: '50%', transform: 'translateX(-50%)', width: ANCHO_HERO,
          minHeight: compacto ? undefined : '100dvh', paddingTop: 'calc(64px + 3.5rem)', paddingBottom: '4rem',
          backgroundColor: fondo, color: texto, boxShadow: `0 0 0 100vmax ${fondo}`, clipPath: 'inset(0 -100vmax)',
        }}
      >
        <PageColorSetter bg={fondo} text={texto} />
        <div className="flex flex-col items-center gap-8" style={{ maxWidth: '64rem' }}>
          {eyebrow && <p className="label">{eyebrow}</p>}
          <h1 style={{ ...DESTACADA, fontSize: 'clamp(2.75rem, 6.2vw, 6.5rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
            {conCursiva(titulo, cursiva)}
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
      <h1 className="text-[2.5rem] md:text-[3.75rem]" style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
        {conCursiva(titulo, cursiva)}
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

/** Sección con titular de portada (h2) para las portadas secundarias de la home. Su alto lo da el contenido, sin aire de sobra. */
/** `tinta` cambia el color del texto (y de lo que use currentColor, como el gráfico del 95:5). */
export function Pantalla({ titulo, cursiva, tono, tinta, centrado = false, children }: { titulo: React.ReactNode; cursiva?: string; tono?: Tono; tinta?: string; centrado?: boolean; children?: React.ReactNode }) {
  const centrar = centrado ? 'mx-auto' : ''
  return (
    <section className={`flex flex-col justify-center gap-8 py-16 md:py-24 ${centrado ? 'items-center text-center' : ''}`} style={{ ...banda(tono), ...(tinta ? { color: tinta } : {}) }}>
      <h2 className={`text-[2.5rem] md:text-[3.75rem] ${centrar}`} style={{ ...DESTACADA, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '22ch' }}>
        {conCursiva(titulo, cursiva)}
      </h2>
      <div className={`flex flex-col gap-8 ${centrar}`} style={{ maxWidth: ANCHO_TEXTO }}>{children}</div>
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
      <Boton href="/clientes/dunamis">Conoce la historia de Dunamis</Boton>
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

/** Crédito del Value Proposition Canvas, como pide Strategyzer: identificar la fuente completa (Strategyzer.com y Strategyzer AG).
    Va bajo cada mención de la herramienta, en el mismo estilo chico que la fuente de la regla 95:5. */
export function CreditoStrategyzer() {
  return (
    <p className="text-[0.8125rem]" style={{ opacity: 0.5, fontSize: '0.8125rem', lineHeight: 1.4 }}>
      Value Proposition Canvas · <a href="https://www.strategyzer.com" target="_blank" rel="noopener noreferrer"
        className="underline underline-offset-2 decoration-1">Strategyzer.com</a> / Strategyzer AG.
    </p>
  )
}
