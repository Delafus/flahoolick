import Link from 'next/link'
import { SERVICIOS } from './servicios-datos'

/**
 * Las tres secciones profundas de servicio. Sin interactividad: cada una
 * muestra su contenido completo (introducción, resultado, entregable,
 * incluye, plazo y CTA), sin acordeón que oculte nada.
 */
export function ServiciosEtapas() {
  return (
    <div>
      {SERVICIOS.map((servicio, i) => (
        <section
          key={servicio.id}
          id={servicio.id}
          className="page-px section-py"
          style={{
            scrollMarginTop: '90px',
            borderTop: i > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
          }}
        >
          <div className="max-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

            {/* Izquierda — qué resuelve y qué produce */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="label opacity-40">{servicio.seccion.eyebrow}</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>
                {servicio.seccion.titulo}
              </h2>
              <p className="text-lead opacity-70" style={{ maxWidth: '34rem' }}>
                {servicio.seccion.introduccion}
              </p>
              <p className="text-base leading-relaxed opacity-65" style={{ maxWidth: '34rem' }}>
                {servicio.seccion.resultado}
              </p>

              <Link
                href={`/servicios?servicio=${servicio.id}#contacto`}
                className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit mt-2 hover:opacity-80 transition-opacity"
                style={{ backgroundColor: '#000000', color: 'var(--brand-ground)' }}
              >
                {servicio.seccion.ctaLabel}
              </Link>
            </div>

            {/* Derecha — el entregable, como una sola unidad */}
            <div className="md:col-span-5">
              <div className="flex flex-col gap-8 p-8"
                style={{ backgroundColor: '#000000', color: 'var(--brand-ground)' }}>
                <div className="flex flex-col gap-3">
                  <p className="label opacity-50">Entregable</p>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                    lineHeight: 1.15,
                  }}>
                    {servicio.seccion.entregable.titulo}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-65">{servicio.seccion.entregable.desc}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="label opacity-50">Incluye</h3>
                  <ul className="flex flex-col">
                    {servicio.seccion.incluye.map(item => (
                      <li key={item} className="text-base py-3"
                        style={{ borderTop: '1px solid rgba(249,240,226,0.18)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 pt-6"
                  style={{ borderTop: '1px solid rgba(249,240,226,0.18)' }}>
                  <p className="label opacity-50">{servicio.seccion.plazo.label}</p>
                  <p className="text-sm leading-relaxed opacity-75">{servicio.seccion.plazo.valor}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
