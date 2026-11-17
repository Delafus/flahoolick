import Link from 'next/link'
import { VERDE } from './minimal'
import { PageColorSetter } from './page-color-setter'
import { ContactForm } from './contact-form'

/** Plantilla de historias de clientes, calcada de sanity.io/customers (ej. /customers/tecovas):
    página negra; miga de pan, titular y portada con foto, logo y cifras; frase resumen;
    y debajo dos columnas: ficha fija con botón a la izquierda y relato con citas a la derecha.
    Toques Flahoolick: verde en la miga de pan, las cifras y el botón.
    Cada historia nueva llena estos componentes con sus datos; no se diseña otra página. */

const FONDO = '#000000'
const GRIS = 'rgb(185, 185, 185)'
const ANCHO = '72.5rem'
const BN = 'grayscale(1)'
const LOGO_BLANCO = 'brightness(0) invert(1)'

/** Letra monoespaciada en mayúsculas, como las etiquetas de Sanity. */
const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono), ui-monospace, monospace',
  fontSize: '13px',
  lineHeight: 1.3,
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
}
const SANS: React.CSSProperties = { fontFamily: 'var(--font-inter)' }

export interface Dato {
  /** Lo más grande: una cifra o una palabra ("5x", "3 min"). */
  valor: string
  etiqueta: string
}

export interface CampoFicha {
  nombre: string
  /** Los campos sin valores no se muestran. */
  valores: (string | { texto: string; href: string })[]
}

export interface Cita {
  texto: string
  nombre: string
  cargo?: string
  /** Ruta de la foto. Se muestra en blanco y negro. */
  retrato?: string
}

/** Fondo negro de borde a borde para toda la página. El header del sitio toma el mismo negro. */
export function PaginaCaso({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-px pb-24" style={{ backgroundColor: FONDO, color: '#ffffff', ...SANS, overflowX: 'clip' }}>
      <PageColorSetter bg={FONDO} text="#ffffff" />
      <div className="mx-auto" style={{ maxWidth: ANCHO }}>{children}</div>
    </div>
  )
}

/** Miga de pan ("Historias de clientes / Dunamis") y titular. */
export function EncabezadoCaso({ cliente, titulo }: { cliente: string; titulo: string }) {
  return (
    <header className="flex flex-col gap-6" style={{ paddingTop: 'calc(64px + 2.5rem)' }}>
      <p style={MONO}>
        <span style={{ color: VERDE }}>Historias de clientes</span>
        <span aria-hidden="true" style={{ color: GRIS, margin: '0 0.6em' }}>/</span>
        <span>{cliente}</span>
      </p>
      <h1 style={{ fontWeight: 400, fontSize: 'clamp(2.5rem, 4.2vw, 3.75rem)', lineHeight: 1, letterSpacing: '-0.04em' }}>
        {titulo}
      </h1>
    </header>
  )
}

/** Portada de 460 px de alto: foto en blanco y negro, logo del cliente arriba a la izquierda y hasta tres cifras abajo
    (en fila en escritorio, apiladas en teléfono). En escritorio usa la foto apaisada (`src`); en teléfono, la vertical (`srcMovil`). */
export function PortadaCaso({ logo, imagen, datos }: {
  logo: { src: string; alt: string }
  imagen?: {
    src: string
    srcMovil?: string
    alt: string
    /** Qué parte de la foto se mantiene al recortar (CSS object-position, ej. '64% 50%'). */
    foco?: string
    focoMovil?: string
  }
  datos: Dato[]
}) {
  return (
    <section className="relative mt-8 overflow-hidden" style={{ height: '460px', backgroundColor: '#1C1C1C' }}>
      {imagen && (
        <>
          <picture>
            {imagen.srcMovil && <source media="(max-width: 767px)" srcSet={imagen.srcMovil} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagen.src} alt={imagen.alt} className="portada-caso-foto absolute inset-0 h-full w-full"
              style={{
                objectFit: 'cover', filter: BN,
                ['--foco' as string]: imagen.foco ?? '50% 50%',
                ['--foco-movil' as string]: imagen.focoMovil ?? imagen.foco ?? '50% 50%',
              } as React.CSSProperties} />
          </picture>
          {/* Oscurecido solo abajo, para que se lean las cifras. */}
          <div className="absolute inset-0" aria-hidden="true"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0.85) 100%)' }} />
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt={logo.alt} className="absolute left-6 top-6" style={{ width: '144px', height: 'auto', filter: LOGO_BLANCO }} />
      <ul className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 md:flex-row md:gap-16">
        {datos.slice(0, 3).map(d => (
          <li key={d.etiqueta} className="flex flex-col gap-1">
            <span style={{ fontSize: '38px', lineHeight: 1.1, letterSpacing: '-0.03em', color: VERDE }}>{d.valor}</span>
            <span style={{ ...MONO, color: GRIS }}>{d.etiqueta}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Frase resumen grande bajo la portada. */
export function ResumenCaso({ children }: { children: React.ReactNode }) {
  return <p className="mt-8" style={{ fontSize: '24px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{children}</p>
}

/** Dos columnas: ficha fija con botón a la izquierda (299 px) y relato a la derecha (621 px). En teléfono, la ficha va primero. */
export function CuerpoCaso({ ficha, children }: { ficha: CampoFicha[]; children: React.ReactNode }) {
  const visibles = ficha.filter(c => c.valores.length > 0)
  return (
    <article className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[299px_minmax(0,621px)] lg:gap-x-[41px]">
      <aside className="flex flex-col gap-8 self-start lg:sticky" style={{ top: '100px' }}>
        <dl className="flex flex-col gap-5 lg:pl-4">
          {visibles.map(c => (
            <div key={c.nombre} className="flex flex-col gap-2">
              <dt style={{ ...MONO, color: VERDE }}>{c.nombre}</dt>
              {c.valores.map(v => (
                <dd key={typeof v === 'string' ? v : v.href} style={{ ...MONO, textTransform: 'none', lineHeight: 1.5 }}>
                  {typeof v === 'string'
                    ? v
                    : <Link href={v.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-60">{v.texto}</Link>}
                </dd>
              ))}
            </div>
          ))}
        </dl>
        <Link href="#contacto" className="inline-flex w-fit items-center px-5 py-2.5 transition-opacity hover:opacity-80"
          style={{ ...MONO, backgroundColor: VERDE, color: '#000000', borderRadius: '999px' }}>
          Agenda una llamada
        </Link>
      </aside>
      <div className="flex flex-col">{children}</div>
    </article>
  )
}

/** Sección del relato: titular de 30 px y texto de 18 px. */
export function SeccionCaso({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5 pt-16 first:pt-0" style={{ fontSize: '18px', lineHeight: 1.35 }}>
      <h2 style={{ fontWeight: 400, fontSize: '30px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{titulo}</h2>
      {children}
    </section>
  )
}

/** Imagen dentro de la columna del relato. Con dos imágenes, van lado a lado. */
export function ImagenesCaso({ items }: { items: { src: string; alt: string; ratio: string }[] }) {
  return (
    <div className={`mt-8 grid gap-4 ${items.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {items.map(i => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i.src} src={i.src} alt={i.alt} style={{ aspectRatio: i.ratio, width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }} />
      ))}
    </div>
  )
}

export function EnlaceCaso({ href, children }: { href: string; children: React.ReactNode }) {
  return <p><Link href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-60">{children}</Link></p>
}

/** Cita con logo del cliente, texto y retrato en blanco y negro con nombre y cargo. No se muestra hasta tener texto y nombre. */
export function CitaCaso({ texto, nombre, cargo, retrato, logo }: Cita & { logo?: { src: string; alt: string } }) {
  if (!texto || !nombre) return null
  return (
    <figure className="my-12 flex flex-col gap-6 md:pl-24" style={{ fontSize: '18px', lineHeight: 1.35 }}>
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo.src} alt={logo.alt} style={{ width: '144px', height: 'auto', filter: LOGO_BLANCO }} />
      )}
      <blockquote>{texto}</blockquote>
      <figcaption className="flex items-center gap-3">
        {retrato ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={retrato} alt={`Retrato de ${nombre}`} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', filter: BN }} />
        ) : (
          <span aria-hidden="true" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#2A2A2A', flexShrink: 0 }} />
        )}
        <span className="flex flex-col">
          <span style={MONO}>{nombre}</span>
          {cargo && <span style={{ ...MONO, color: GRIS }}>{cargo}</span>}
        </span>
      </figcaption>
    </figure>
  )
}

/** Resultados como lista: "valor + título: texto", con la cifra en verde. */
export function ResultadosCaso({ titulo = 'Resultados', items }: {
  titulo?: string
  items: { valor: string; titulo: string; texto: string }[]
}) {
  return (
    <SeccionCaso titulo={titulo}>
      <ul className="flex list-disc flex-col gap-3 pl-5">
        {items.map(r => (
          <li key={r.titulo}>
            <span style={{ color: VERDE }}>{r.valor} {r.titulo.charAt(0).toLowerCase() + r.titulo.slice(1)}:</span> {r.texto}
          </li>
        ))}
      </ul>
    </SeccionCaso>
  )
}

/** Cierre con titular grande y formulario de contacto (ancla #contacto). */
export function CierreCaso({ titulo }: { titulo: string }) {
  return (
    <section className="mt-24 grid grid-cols-1 gap-10 pt-16 lg:grid-cols-[299px_minmax(0,621px)] lg:gap-x-[41px]"
      style={{ borderTop: `1px solid ${GRIS}` }}>
      <h2 style={{ fontWeight: 400, fontSize: 'clamp(2.25rem, 3.5vw, 3.125rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>{titulo}</h2>
      <ContactForm minimal submitLabel="Agenda una llamada" />
    </section>
  )
}
