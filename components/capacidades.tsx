import Link from 'next/link'
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

/** Las tres capacidades en la home: tres columnas sin cajas, como los principios de Sobre y metodología.
    Cada columna: un listón vertical junto al número y nombre en Bricolage, la explicación y viñetas chicas; lleva a su página. */
export function CapacidadesTarjetas() {
  return (
    <div className="grid w-full grid-cols-1 gap-10 text-left md:grid-cols-3 md:gap-12">
      {DISCIPLINAS.map(d => (
        <Link key={d.id} href={d.href} className="group flex flex-col gap-4">
          {/* Listón vertical corto a la izquierda del título, del alto del título. */}
          <h3 className="pl-4 text-[1.5rem] md:text-[1.75rem]"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', borderLeft: '4px solid currentColor' }}>
            {d.numero} {d.nombre}
          </h3>
          <p>{d.desc}</p>
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
