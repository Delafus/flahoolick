import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = { title: 'Metodología — Flahoolick' }

const subs = [
  { title: 'Cómo funciona el sistema', desc: 'Cuatro capas que convierten conocimiento disperso en presencia continua.', href: '/metodologia/como-funciona-el-sistema' },
  { title: 'Cómo trabajamos con IA', desc: 'IA para capturar y modelar. El criterio lo define siempre el equipo senior.', href: '/metodologia/como-trabajamos-con-ia' },
  { title: 'Cómo aprendemos', desc: 'Cada ciclo alimenta al siguiente. El sistema mejora con cada señal del mercado.', href: '/metodologia/como-aprendemos' },
]

export default function Metodologia() {
  return (
    <>
      <PageColorSetter bg="var(--page-metodologia-bg)" text="var(--page-metodologia-text)" />

      {/* Hero */}
      <section className="page-hero flex items-end page-px pb-16 pt-24"
        style={{ backgroundColor: 'var(--page-metodologia-bg)', color: 'var(--page-metodologia-text)' }}>
        <div className="max-container w-full flex flex-col gap-8">
          <p className="label opacity-50">Del conocimiento al mercado.</p>
          <h1 className="text-display" style={{ color: 'var(--page-metodologia-text)' }}>
            El sistema empieza antes de producir.
          </h1>
          <p className="text-xl font-light opacity-60">Flahoolick diseñó el Sistema de Autoridad de Mercado para el comprador B2B que toma decisiones complejas en ciclos largos.</p>
        </div>
      </section>

      {/* Contexto */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}>
        <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <p className="label opacity-40">Diseñado para el ciclo largo.</p>
            <h2 className="text-headline font-light">El marketing de contenidos tradicional no fue diseñado para el B2B complejo.</h2>
          </div>
          <div className="flex flex-col gap-6 justify-center">
            <p className="text-lg font-light leading-relaxed opacity-70">
              La mayoría de los enfoques de contenido fueron construidos para ciclos cortos, decisiones simples y compradores que ya saben lo que quieren. Su comprador llega con una lista mental de las empresas que ha visto durante meses. El sistema que no construye esa presencia antes de la búsqueda llega tarde.
            </p>
            <Link href="/metodologia/como-aprendemos" className="label opacity-50 hover:opacity-100 transition-opacity">
              Por qué somos diferentes →
            </Link>
          </div>
        </div>
      </section>

      {/* Disponibilidad mental */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--section-emphasis-bg)', color: 'var(--section-emphasis-text)' }}>
        <div className="max-container max-w-3xl">
          <p className="text-xl md:text-2xl font-light leading-relaxed">
            <strong className="font-semibold">Disponibilidad mental</strong> es la probabilidad de que tu empresa sea recordada cuando el comprador decida buscar. El Sistema de Autoridad de Mercado existe para construirla — ciclo a ciclo, señal a señal — antes de que esa búsqueda ocurra.
          </p>
        </div>
      </section>

      {/* El sistema explicado */}
      <section className="page-px section-py" style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}>
        <div className="max-container flex flex-col gap-16">
          <div>
            <p className="label opacity-40">El sistema, explicado</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {subs.map(s => (
              <Link key={s.href} href={s.href}
                className="flex flex-col gap-6 p-10 group hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--section-dark-bg)' }}>
                <h3 className="text-base font-medium">{s.title}</h3>
                <p className="text-sm leading-relaxed opacity-50 flex-1">{s.desc}</p>
                <span className="label opacity-30 group-hover:opacity-70 transition-opacity">Explorar →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
