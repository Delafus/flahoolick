import Link from 'next/link'
import { FUENTE, ENLACE, VERDE } from './minimal'
import { PageColorSetter } from './page-color-setter'

/** Plantilla de caso: encabezado, portada con datos encima, ficha y cita.
    Cada caso nuevo llena estos componentes con sus datos; no se diseña otra página. */

const ANCHO = '72rem'
const BN = 'grayscale(1)'
const LOGO_BLANCO = 'brightness(0) invert(1)'

export interface Dato {
  /** Lo más grande: una cifra o una palabra ("5x", "3 min"). */
  valor: string
  etiqueta: string
}

/** Franja negra de borde a borde con la ruta y el titular a la izquierda y la portada a la derecha (como sanity.io/customers).
    El header del sitio toma el mismo negro. En teléfono, la portada va debajo del titular. */
export function CabeceraCaso({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16 md:pb-24" style={{ backgroundColor: '#000000', color: '#ffffff', boxShadow: '0 0 0 100vmax #000000', clipPath: 'inset(0 -100vmax)' }}>
      <PageColorSetter bg="#000000" text="#ffffff" />
      <div className="mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
        style={{ maxWidth: ANCHO, paddingTop: 'clamp(7rem, 16vh, 10rem)' }}>
        {children}
      </div>
    </div>
  )
}

/** Ruta tipo migas de pan ("Historias de clientes / Dunamis") y titular. */
export function EncabezadoCaso({ cliente, titulo }: { cliente: string; titulo: string }) {
  return (
    <header className="flex flex-col gap-6">
      <p className="label">
        <span style={{ color: VERDE }}>Historias de clientes</span>
        <span aria-hidden="true" style={{ opacity: 0.4, margin: '0 0.6em' }}>/</span>
        <span>{cliente}</span>
      </p>
      <h1 style={{ ...FUENTE, fontWeight: 500, fontSize: 'clamp(2.5rem, 4.2vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
        {titulo}
      </h1>
    </header>
  )
}

/** Portada: logo del cliente en blanco arriba y hasta tres datos abajo, sobre una foto en blanco y negro.
    Sin `imagen` queda sobre gris oscuro, hasta que llegue la foto. */
export function PortadaCaso({ logo, imagen, datos }: {
  logo: { src: string; alt: string }
  /** `foco`: qué parte de la foto se mantiene al recortar, como en CSS object-position (ej. '62% 50%'). */
  imagen?: { src: string; alt: string; foco?: string }
  datos: Dato[]
}) {
  return (
    <section
      className="relative flex flex-col justify-between gap-16 overflow-hidden p-6 md:p-10 min-h-[30rem] md:min-h-[36rem]"
      style={{ backgroundColor: '#1C1C1C', color: '#ffffff' }}
    >
      {imagen && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagen.src} alt={imagen.alt} className="absolute inset-0 h-full w-full" style={{ objectFit: 'cover', objectPosition: imagen.foco ?? '50% 50%', filter: BN }} />
          {/* Oscurecido solo en la parte baja, para que se lean las cifras; arriba se ve la foto tal cual, como en sanity.io/customers. */}
          <div className="absolute inset-0" aria-hidden="true"
            style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.65) 72%, rgba(0,0,0,0.9) 100%)' }} />
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt={logo.alt} className="relative" style={{ height: 'clamp(36px, 4vw, 48px)', width: 'auto', maxWidth: '60%', alignSelf: 'flex-start', filter: LOGO_BLANCO }} />
      <ul className="relative flex flex-col gap-6">
        {datos.slice(0, 3).map(d => (
          <li key={d.etiqueta} className="flex flex-col gap-1">
            <span style={{ ...FUENTE, fontWeight: 500, fontSize: 'clamp(2.25rem, 3.4vw, 3.25rem)', lineHeight: 1, letterSpacing: '-0.03em', color: VERDE }}>{d.valor}</span>
            <span className="label" style={{ opacity: 0.85 }}>{d.etiqueta}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export interface CampoFicha {
  nombre: string
  /** Los campos sin valores no se muestran. */
  valores: (string | { texto: string; href: string })[]
}

/** Resumen del caso a la izquierda y ficha a la derecha. */
export function FichaCaso({ campos, children }: { campos: CampoFicha[]; children: React.ReactNode }) {
  const visibles = campos.filter(c => c.valores.length > 0)
  return (
    <section className="mx-auto grid grid-cols-1 gap-12 py-16 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-20 md:py-24" style={{ maxWidth: ANCHO }}>
      <div className="flex flex-col gap-6" style={{ maxWidth: '40rem' }}>{children}</div>
      <dl className="flex flex-col gap-6 text-base">
        {visibles.map(c => (
          <div key={c.nombre} className="flex flex-col gap-1">
            <dt style={{ opacity: 0.5 }}>{c.nombre}</dt>
            {c.valores.map(v => typeof v === 'string'
              ? <dd key={v}>{v}</dd>
              : <dd key={v.href}><Link href={v.href} target="_blank" rel="noopener noreferrer" className={ENLACE}>{v.texto}</Link></dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  )
}

export interface Cita {
  texto: string
  nombre: string
  cargo?: string
  /** Ruta de la foto. Se muestra en blanco y negro. */
  retrato?: string
}

/** Cita con retrato en blanco y negro. No se muestra hasta tener texto y nombre.
    `destacada`: franja verde de borde a borde con la cita en grande. Sin ella: barra verde a la izquierda. */
export function CitaCaso({ texto, nombre, cargo, retrato, destacada = false }: Cita & { destacada?: boolean }) {
  if (!texto || !nombre) return null
  const estilo: React.CSSProperties = destacada
    ? { backgroundColor: VERDE, color: '#000000', boxShadow: `0 0 0 100vmax ${VERDE}`, clipPath: 'inset(0 -100vmax)' }
    : { borderLeft: `4px solid ${VERDE}`, paddingLeft: '1.5rem' }
  return (
    <figure className={`flex flex-col gap-6 ${destacada ? 'my-8 py-16 md:py-24' : 'my-4 py-2'}`} style={estilo}>
      <blockquote
        className={destacada ? 'text-[1.75rem] md:text-[2.5rem]' : 'text-[1.375rem] md:text-[1.625rem]'}
        style={{ ...FUENTE, fontWeight: 500, lineHeight: destacada ? 1.15 : 1.3 }}>
        &ldquo;{texto}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-4 text-base">
        {retrato ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={retrato} alt={`Retrato de ${nombre}`} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', filter: BN }} />
        ) : (
          <span aria-hidden="true" style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.15)', flexShrink: 0 }} />
        )}
        <span>
          <span className="block" style={{ fontWeight: 500 }}>{nombre}</span>
          {cargo && <span className="block" style={{ opacity: 0.5 }}>{cargo}</span>}
        </span>
      </figcaption>
    </figure>
  )
}
