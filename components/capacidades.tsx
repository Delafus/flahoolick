import Link from 'next/link'
import { CABECERAS } from './minimal'
import { DISCIPLINAS } from './servicios-datos'

/** Las tres capacidades con su descripción y lo que incluye cada una. Cada capacidad completa lleva a su página. */
export function Capacidades() {
  return (
    <div className="flex flex-col gap-10">
      {DISCIPLINAS.map(d => (
        <Link key={d.id} href={d.href} className="group flex flex-col gap-3">
          {/* Número y nombre en Bricolage, como los títulos de etapa; el nombre se subraya al pasar el mouse (es un enlace). */}
          <h3 className="text-[1.375rem] md:text-[1.5rem]"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            {String(d.numero).padStart(2, '0')} <span className="underline-offset-4 decoration-2 group-hover:underline">{d.nombre}</span>
          </h3>
          <p>{d.desc}</p>
          <ul className="flex flex-col gap-1.5 text-base" style={{ opacity: 0.75 }}>
            {d.puntos.map(p => (
              <li key={p} className="flex items-baseline gap-2.5">
                <span aria-hidden className="shrink-0 rounded-full"
                  style={{ width: 5, height: 5, backgroundColor: 'currentColor', transform: 'translateY(-0.2em)' }} />
                {p}
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  )
}

/** Puntos que no van en las tarjetas de la home (sí en /servicios). */
const FUERA_DE_TARJETAS = ['Dossiers y casos de éxito.', 'Agentes de inteligencia artificial.']
/** Puntos que en las tarjetas de la home van más cortos (el liderazgo de opinión lo hacemos poco). */
const EN_TARJETAS: Record<string, string> = { 'Narrativa de marca y liderazgo de opinión.': 'Narrativa de marca.' }

/** Zigzag que separa la explicación de la lista: del color del fondo de la sección, de borde a borde de la tarjeta,
    como si el papel estuviera cortado con tijera de zigzag. */
const zigzag = (color: string) => `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='14' viewBox='0 0 22 14'%3E%3Cpath d='M0 12.5 L11 1.5 L22 12.5' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='3' stroke-linejoin='miter'/%3E%3C/svg%3E")`

/** Lado del doblez de la esquina superior derecha, en px. */
const DOBLEZ = 36

/** Las tres capacidades como tres tarjetas lado a lado (home), sin numeración. Cada tarjeta completa lleva a su página.
    Fondo celeste sobre el fondo de la sección, con la esquina de arriba doblada; la lista lleva viñetas chicas. */
/** `fondo` es el color de la sección: el zigzag lo usa para que parezca un corte del papel. */
export function CapacidadesTarjetas({ fondo = '#ffffff' }: { fondo?: string }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-3 md:gap-6">
      {DISCIPLINAS.map(d => (
        <Link key={d.id} href={d.href} className="group relative flex flex-col gap-5 p-8 transition-colors md:p-10"
          style={{ backgroundColor: CABECERAS.hielo.fondo, clipPath: `polygon(0 0, calc(100% - ${DOBLEZ}px) 0, 100% ${DOBLEZ}px, 100% 100%, 0 100%)` }}>
          {/* Doblez de la esquina: el corte deja ver el rosa y el triangulito blanco es la punta doblada del papel. */}
          <span aria-hidden className="absolute right-0 top-0"
            style={{ width: DOBLEZ, height: DOBLEZ, backgroundColor: '#ffffff', clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
          <h3 className="text-[1.5rem] md:text-[1.75rem]"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            {d.nombre}
          </h3>
          <p>{d.desc}</p>
          <div aria-hidden className="-mx-8 mt-auto md:-mx-10"
            style={{ height: 14, backgroundImage: zigzag(fondo), backgroundRepeat: 'repeat-x', backgroundSize: '22px 14px' }} />
          <ul className="flex flex-col gap-1.5 text-base" style={{ opacity: 0.75 }}>
            {d.puntos.filter(p => !FUERA_DE_TARJETAS.includes(p)).map(p => EN_TARJETAS[p] ?? p).map(p => (
              <li key={p} className="flex items-baseline gap-2.5">
                <span aria-hidden className="shrink-0 rounded-full"
                  style={{ width: 5, height: 5, backgroundColor: 'currentColor', transform: 'translateY(-0.2em)' }} />
                {p}
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  )
}
