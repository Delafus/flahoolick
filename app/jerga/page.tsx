import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'JERGA — Flahoolick',
  description: 'Estrategia de contenido, marketing B2B y autoridad de mercado. Lo que importa, dicho como hay que decirlo.',
}

const categorias = [
  'Estrategia B2B',
  'Disponibilidad Mental',
  'Marketing de Contenido',
  'El Criterio',
  'Sistemas de Contenido',
  'Ciclo de Compra',
]

const guias = [
  {
    num: '01',
    categoria: 'Estrategia B2B',
    titulo: 'Por qué el 95% de tu mercado no te está mirando hoy',
    href: '/el-criterio/95-5',
  },
  {
    num: '02',
    categoria: 'Disponibilidad Mental',
    titulo: 'La diferencia entre publicar contenido y construir disponibilidad mental',
    href: '#',
  },
  {
    num: '03',
    categoria: 'Sistemas de Contenido',
    titulo: 'Cómo construir un sistema de contenido que aprende con cada ciclo',
    href: '#',
  },
]

const destacado = {
  categoria: 'El Criterio',
  titulo: 'That is not your decision.',
  bajada: 'Cuando le das clic a publicar, hay una suposición que nunca se dice en voz alta: que producir y llegar son la misma cosa. El mercado responde como Ragnar Lothbrok. Todos los días. A todas las marcas. Sin excepción.',
  href: '/el-criterio/that-is-not-your-decision',
}

const tendencias = [
  {
    categoria: 'Estrategia B2B',
    titulo: 'Los Category Entry Points: cómo tu comprador decide antes de buscar',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    href: '#',
  },
  {
    categoria: 'Marketing de Contenido',
    titulo: 'Por qué el contenido genérico es la peor inversión de marketing B2B',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    href: '#',
  },
  {
    categoria: 'El Criterio',
    titulo: 'Mark Ritson tenía razón: bothism no es cobardía, es rigor',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    href: '#',
  },
  {
    categoria: 'Disponibilidad Mental',
    titulo: 'Qué pasa cuando una empresa B2B le habla al 5% y olvida al 95%',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    href: '#',
  },
  {
    categoria: 'Ciclo de Compra',
    titulo: 'Cómo Byron Sharp cambió lo que sabemos sobre el crecimiento de marcas',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    href: '#',
  },
  {
    categoria: 'Sistemas de Contenido',
    titulo: 'El banco de evidencia: cómo el conocimiento de tu empresa se convierte en activo',
    bajada: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    href: '#',
  },
]

const todosLosArticulos = [
  { categoria: 'El Criterio', titulo: 'Por qué el 95% de tu mercado no te está mirando hoy', href: '/el-criterio/95-5' },
  { categoria: 'El Criterio', titulo: 'That is not your decision.', href: '/el-criterio/that-is-not-your-decision' },
  { categoria: 'Estrategia B2B', titulo: 'Los Category Entry Points: cómo tu comprador decide antes de buscar', href: '#' },
  { categoria: 'Marketing de Contenido', titulo: 'Por qué el contenido genérico es la peor inversión de marketing B2B', href: '#' },
  { categoria: 'El Criterio', titulo: 'Mark Ritson tenía razón: bothism no es cobardía, es rigor', href: '#' },
  { categoria: 'Disponibilidad Mental', titulo: 'Qué pasa cuando una empresa B2B le habla al 5% y olvida al 95%', href: '#' },
  { categoria: 'Ciclo de Compra', titulo: 'Cómo Byron Sharp cambió lo que sabemos sobre el crecimiento de marcas', href: '#' },
  { categoria: 'Sistemas de Contenido', titulo: 'El banco de evidencia: cómo el conocimiento de tu empresa se convierte en activo', href: '#' },
  { categoria: 'Estrategia B2B', titulo: 'La regla de Ritson que nadie aplica en B2B latinoamericano', href: '#' },
  { categoria: 'Disponibilidad Mental', titulo: 'Howard Gossage lo dijo en 1965: la atención no se captura, se merece', href: '#' },
]

// Imagen placeholder component
function ImgPlaceholder({ aspect = '16/9' }: { aspect?: string }) {
  return (
    <div
      style={{
        aspectRatio: aspect,
        backgroundColor: 'rgba(0,0,0,0.08)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span className="label opacity-20">Imagen</span>
    </div>
  )
}

export default function JergaPage() {
  return (
    <>
      <PageColorSetter bg="var(--page-metodologia-bg)" text="var(--page-metodologia-text)" />

      {/* Hero — fondo chartreuse */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: 'var(--page-metodologia-bg)', color: 'var(--page-metodologia-text)' }}
      >
        <div className="max-container w-full flex flex-col gap-8">
          <p className="label opacity-50">Flahoolick</p>
          <h1 className="text-hero" style={{ color: 'var(--page-metodologia-text)' }}>JERGA</h1>
          <p className="text-lead max-w-xl opacity-70">
            Lo que importa sobre estrategia B2B, marketing de contenido y autoridad de mercado — dicho como hay que decirlo.
          </p>

          {/* Categorías */}
          <div className="flex flex-wrap gap-3 mt-4">
            {categorias.map(cat => (
              <span
                key={cat}
                className="label px-4 py-2 cursor-pointer hover:opacity-60 transition-opacity"
                style={{ border: '1px solid rgba(0,0,0,0.2)', color: 'var(--page-metodologia-text)' }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Guías destacadas */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}
      >
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-headline">Lecturas esenciales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,0,0,0.08)' }}>
            {guias.map(g => (
              <Link
                key={g.num}
                href={g.href}
                className={`flex flex-col gap-6 p-10 group ${g.href === '#' ? 'pointer-events-none' : ''}`}
                style={{ backgroundColor: 'var(--section-body-bg)' }}
              >
                <div className="flex flex-col gap-4">
                  <span className="text-display font-display opacity-10">{g.num}</span>
                  <p className="label opacity-40">{g.categoria}</p>
                  <h3 className="text-xl font-semibold leading-snug group-hover:opacity-60 transition-opacity">
                    {g.titulo}
                  </h3>
                </div>
                {g.href !== '#' && (
                  <span className="label opacity-30 group-hover:opacity-70 transition-opacity mt-auto">
                    Leer →
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Artículo destacado */}
      <section
        className="page-px py-0"
        style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}
      >
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Imagen */}
            <div style={{ aspectRatio: '1/1', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label opacity-20">Imagen destacada</span>
            </div>
            {/* Texto */}
            <div className="flex flex-col justify-center gap-8 p-12">
              <p className="label opacity-40">Artículo destacado</p>
              <p className="label opacity-50">{destacado.categoria}</p>
              <Link href={destacado.href}>
                <h2 className="text-headline hover:opacity-60 transition-opacity">{destacado.titulo}</h2>
              </Link>
              <p className="text-lead opacity-60">{destacado.bajada}</p>
              <Link
                href={destacado.href}
                className="label inline-flex items-center gap-2 border px-6 py-3 w-fit hover:opacity-60 transition-opacity"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Leer artículo →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tendencias */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}
      >
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-headline">Artículos recientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tendencias.map((art, i) => (
              <div key={i} className="flex flex-col gap-4">
                <ImgPlaceholder aspect="3/2" />
                <div className="flex flex-col gap-3">
                  <p className="label opacity-40">{art.categoria}</p>
                  <Link href={art.href}>
                    <h3 className="text-lg font-semibold leading-snug hover:opacity-60 transition-opacity">
                      {art.titulo}
                    </h3>
                  </Link>
                  <p className="text-sm leading-relaxed opacity-55">{art.bajada}</p>
                  {art.href !== '#' && (
                    <Link href={art.href} className="label opacity-30 hover:opacity-70 transition-opacity">
                      Leer →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por categoría */}
      <section
        className="page-px py-16"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)', borderTop: '1px solid rgba(0,0,0,0.1)' }}
      >
        <div className="max-container flex flex-col gap-8">
          <p className="label opacity-40">Explorar por categoría</p>
          <div className="flex flex-wrap gap-3">
            {categorias.map(cat => (
              <span
                key={cat}
                className="text-sm px-5 py-2.5 hover:opacity-60 transition-opacity cursor-pointer"
                style={{ border: '1px solid rgba(0,0,0,0.15)' }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Todos los artículos */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}
      >
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-headline">Todos los artículos</h2>
          <div className="flex flex-col">
            {todosLosArticulos.map((art, i) => (
              <Link
                key={i}
                href={art.href}
                className={`group grid grid-cols-1 md:grid-cols-12 gap-6 py-8 ${art.href === '#' ? 'pointer-events-none' : ''}`}
                style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="md:col-span-3">
                  <div style={{ aspectRatio: '3/2', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="label opacity-15">Imagen</span>
                  </div>
                </div>
                <div className="md:col-span-9 flex flex-col gap-3 justify-center">
                  <p className="label opacity-35">{art.categoria}</p>
                  <h3 className={`text-xl font-semibold leading-snug transition-opacity ${art.href !== '#' ? 'group-hover:opacity-60' : 'opacity-40'}`}>
                    {art.titulo}
                  </h3>
                  {art.href !== '#' && (
                    <span className="label opacity-25 group-hover:opacity-60 transition-opacity">Leer →</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
