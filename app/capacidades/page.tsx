import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import { PageLayout, BodySection, CrossLinks } from '@/components/page-layout'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Capacidades — Flahoolick',
}

const caps = [
  { title: 'Estrategia y Relato',   desc: 'Definimos quién eres para el mercado que importa antes de producir una sola pieza.',    href: '/capacidades/estrategia-y-relato' },
  { title: 'Sistema de Contenido', desc: 'Instalamos el flujo continuo que mantiene tu conocimiento en circulación mes a mes.',   href: '/capacidades/sistema-de-contenido' },
  { title: 'Estudio Creativo',      desc: 'Producimos los activos que construyen presencia y habilitan el cierre comercial.',       href: '/capacidades/estudio-creativo' },
]

const industries = ['Tecnología B2B','Servicios financieros especializados','Ingeniería y servicios industriales','Salud corporativa','Educación ejecutiva','Infraestructura y concesiones']

export default function Capacidades() {
  return (
    <>
      <PageColorSetter bg="#F09DB6" text="#000000" />
      <PageLayout
        headline="SENIOR DRIVEN SKILLS"
        tagline="DELIVERING THE KNOWLEDGE"
        description="El conocimiento técnico de una empresa raramente llega al mercado en la forma que debería. Trabajamos en tres frentes para convertirlo en presencia real antes de la decisión de compra."
        heroBg="#F09DB6"
        heroText="#000000"
      >
        <BodySection title="Qué hacemos">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(0,0,0,0.1)' }}>
            {caps.map(c => (
              <Link key={c.href} href={c.href}
                className="flex flex-col gap-6 p-10 group hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--section-body-bg)' }}>
                <h2 className="text-xl font-medium">{c.title}</h2>
                <p className="text-sm leading-relaxed opacity-55 flex-1">{c.desc}</p>
                <span className="label opacity-35 group-hover:opacity-70 transition-opacity">Explorar →</span>
              </Link>
            ))}
          </div>
        </BodySection>

        <BodySection title="Industrias a las que servimos">
          <div className="flex flex-wrap gap-3">
            {industries.map(i => (
              <span key={i} className="text-sm px-4 py-2 opacity-70"
                style={{ border: '1px solid rgba(0,0,0,0.15)' }}>{i}</span>
            ))}
          </div>
        </BodySection>

        <BodySection dark>
          <div className="flex flex-col gap-6 max-w-xl">
            <p className="label opacity-40">Metodología</p>
            <h2 className="text-headline font-light">El sistema empieza antes de producir.</h2>
            <p className="text-lg font-light opacity-60 leading-relaxed">
              Antes de activar cualquiera de estas capacidades, capturamos lo que tu empresa ya sabe.
            </p>
            <Link href="/metodologia" className="label opacity-50 hover:opacity-100 transition-opacity">
              Explorar Metodología →
            </Link>
          </div>
        </BodySection>

        <BodySection title="Las herramientas que lo hacen posible">
          <CrossLinks links={[
            { title: 'SENSOR', desc: 'Captura y procesa el conocimiento técnico y comercial de tu empresa.', href: '/sensor' },
            { title: 'DECK',   desc: 'Produce presentaciones ejecutivas bajo un mismo criterio editorial y visual.', href: '/deck' },
          ]} />
        </BodySection>
      </PageLayout>
    </>
  )
}
