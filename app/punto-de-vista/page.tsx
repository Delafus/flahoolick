import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'El Punto de Vista — Flahoolick',
  description: 'Artículos de Felipe de la Fuente sobre estrategia de contenido, marketing B2B y autoridad de mercado.',
}

const articulos = [
  {
    categoria: 'Estrategia B2B',
    titulo: 'Por qué el 95% de tu mercado no te está mirando hoy — y qué significa eso para tu empresa',
    bajada: 'El Profesor John Dawes documentó algo que cambia la manera de entender el problema. La mayoría de las estrategias de contenido están diseñadas para el 5% que ya está comprando.',
    href: '/punto-de-vista/95-5',
    fecha: 'Julio 2026',
  },
  {
    categoria: 'Atención y mercado',
    titulo: 'That is not your decision.',
    bajada: 'Cuando le das clic a publicar, hay una suposición que nunca se dice en voz alta: que producir y llegar son la misma cosa. El mercado responde como Ragnar Lothbrok. Todos los días.',
    href: '/punto-de-vista/that-is-not-your-decision',
    fecha: 'Julio 2026',
  },
  {
    categoria: 'Próximamente',
    titulo: 'Los Category Entry Points: cómo tu comprador decide antes de buscar',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '#',
    fecha: 'Próximamente',
  },
  {
    categoria: 'Próximamente',
    titulo: 'Por qué el hyper-targeting B2B está destruyendo tu marca',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '#',
    fecha: 'Próximamente',
  },
  {
    categoria: 'Próximamente',
    titulo: 'Mark Ritson tenía razón: el bothism no es cobardía, es rigor',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '#',
    fecha: 'Próximamente',
  },
  {
    categoria: 'Próximamente',
    titulo: 'Lo que tu empresa sabe y el mercado nunca ve',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    href: '#',
    fecha: 'Próximamente',
  },
]

export default function PuntoDeVistaPage() {
  return (
    <>
      <PageColorSetter bg="var(--page-sobre-bg)" text="var(--page-sobre-text)" />

      {/* Hero */}
      <section className="page-hero page-px"
        style={{ backgroundColor: 'var(--page-sobre-bg)', color: 'var(--page-sobre-text)' }}>
        <div className="max-container w-full flex flex-col gap-8">
          <p className="label opacity-40">Felipe de la Fuente</p>
          <h1 className="text-display" style={{ color: 'var(--page-sobre-text)' }}>
            El Punto de Vista
          </h1>
          <p className="text-lead max-w-xl opacity-60">
            Estrategia de contenido, marketing B2B y autoridad de mercado — desde 25 años de trabajo en el punto donde la estrategia, la creatividad y el negocio necesitan entenderse.
          </p>
        </div>
      </section>

      {/* Grid de artículos */}
      <section className="page-px section-py"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}>
        <div className="max-container flex flex-col gap-0">
          {articulos.map((art, i) => (
            <Link
              key={i}
              href={art.href}
              className={`group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 ${art.href === '#' ? 'pointer-events-none' : ''}`}
              style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}
            >
              {/* Meta — fecha + categoría */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <p className="label opacity-30">{art.fecha}</p>
                <p className="label opacity-50">{art.categoria}</p>
              </div>

              {/* Titular + bajada */}
              <div className="md:col-span-9 flex flex-col gap-4">
                <h2
                  className={`text-xl font-semibold leading-snug transition-opacity ${art.href !== '#' ? 'group-hover:opacity-60' : 'opacity-40'}`}
                >
                  {art.titulo}
                </h2>
                <p className="text-sm leading-relaxed opacity-55 max-w-2xl">{art.bajada}</p>
                {art.href !== '#' && (
                  <span className="label opacity-30 group-hover:opacity-70 transition-opacity mt-2">
                    Leer →
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
