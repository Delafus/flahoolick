import Link from 'next/link'
import { FUENTE, GRIS } from './minimal'
import { DISCIPLINAS } from './servicios-datos'

/** Las tres capacidades con su descripción y lo que incluye cada una. Cada capacidad completa lleva a su página. */
export function Capacidades() {
  return (
    <div className="flex flex-col gap-10">
      {DISCIPLINAS.map(d => (
        <Link key={d.id} href={d.href} className="group flex flex-col gap-3">
          <h3 className="underline-offset-4 decoration-1 group-hover:underline"
            style={{ ...FUENTE, fontWeight: 500, letterSpacing: 'normal', fontSize: 'inherit', lineHeight: 'inherit' }}>
            {d.numero}. {d.nombre}
          </h3>
          <p>{d.desc}</p>
          <ul className="flex flex-col gap-1 pl-5" style={{ listStyleType: 'disc', opacity: 0.7 }}>
            {d.puntos.map(p => <li key={p}>{p}</li>)}
          </ul>
        </Link>
      ))}
    </div>
  )
}

/** Puntos que no van en las tarjetas de la home (sí en /servicios). */
const FUERA_DE_TARJETAS = ['Dossiers y casos de éxito.', 'Agentes de inteligencia artificial.']

/** Las tres capacidades como tres tarjetas lado a lado (home), sin numeración. Cada tarjeta completa lleva a su página. */
export function CapacidadesTarjetas() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 text-left md:grid-cols-3 md:gap-6">
      {DISCIPLINAS.map(d => (
        <Link key={d.id} href={d.href} className="group flex flex-col gap-5 p-8 transition-colors md:p-10"
          style={{ backgroundColor: GRIS }}>
          <h3 className="text-[1.5rem] underline-offset-4 decoration-1 group-hover:underline md:text-[1.75rem]"
            style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            {d.nombre}
          </h3>
          <p>{d.desc}</p>
          <ul className="mt-auto flex flex-col gap-1 pt-5 text-base" style={{ borderTop: '1px solid rgba(0,0,0,0.15)', opacity: 0.75 }}>
            {d.puntos.filter(p => !FUERA_DE_TARJETAS.includes(p)).map(p => <li key={p}>{p}</li>)}
          </ul>
        </Link>
      ))}
    </div>
  )
}
