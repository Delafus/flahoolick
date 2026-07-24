import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection } from '@/components/page-layout'
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
      <PageColorSetter bg="#F5FD92" text="#000000" />
      <PageLayout
        headline="CONTENT IN LOOP"
        tagline="MAKING KNOWLEDGE VISIBLE"
        description="Flahoolick diseñó el Sistema de Autoridad de Mercado para el comprador B2B que toma decisiones complejas en ciclos largos."
        heroBg="#F5FD92"
        heroText="#000000"
      >
        <BodySection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,0,0,0.1)' }}>
            {subs.map(s => (
              <Link key={s.href} href={s.href}
                className="flex flex-col gap-6 p-10 group hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--section-body-bg)' }}>
                <h3 className="text-base font-medium">{s.title}</h3>
                <p className="text-sm leading-relaxed opacity-55 flex-1">{s.desc}</p>
                <span className="label opacity-35 group-hover:opacity-70 transition-opacity">Explorar →</span>
              </Link>
            ))}
          </div>
        </BodySection>

        <BodySection dark>
          <p className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl opacity-80">
            <strong className="font-semibold">Disponibilidad mental</strong> es la probabilidad de que tu empresa sea recordada cuando el comprador decida buscar. El Sistema de Autoridad de Mercado existe para construirla — ciclo a ciclo, señal a señal — antes de que esa búsqueda ocurra.
          </p>
        </BodySection>
      </PageLayout>
    </>
  )
}
