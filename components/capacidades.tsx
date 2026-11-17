import Link from 'next/link'
import { FUENTE } from './minimal'
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
