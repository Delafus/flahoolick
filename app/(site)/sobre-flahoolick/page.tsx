import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'
import { IdeaGenerosaLogo } from '@/components/idea-generosa-logo'

export const metadata: Metadata = {
  title: 'Sobre Flahoolick',
  description: 'Nacimos de una idea generosa. Partner de estrategia y contenido B2B, Santiago, Chile.',
}



export default function SobreFlahoolick() {
  return (
    <>
      <PageColorSetter bg="#1FDE91" text="#083EA7" />

      {/* Hero — layout partido en dos columnas, fondo verde Flahoolick */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: '#1FDE91', color: '#083EA7' }}
      >
        <div className="max-container w-full grid grid-cols-12 gap-8 items-start">

          {/* Izquierda — ilustración */}
          <div className="hidden md:flex col-span-5 items-center justify-center py-8">
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px', aspectRatio: '4/5' }}>
              <IdeaGenerosaLogo color="#083EA7" className="w-full h-full" />
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="hidden md:flex col-span-1 justify-center self-stretch py-4">
            <div className="w-px h-full" style={{ backgroundColor: 'rgba(8,62,167,0.2)' }} />
          </div>

          {/* Derecha — Titular + tagline + descripción */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-10 justify-center" style={{ minHeight: '610px' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 7vw, 9rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#083EA7',
            }}>
              Nacimos de una idea generosa.
            </h1>
            <hr style={{ borderColor: 'rgba(8,62,167,0.25)', borderTopWidth: '1px' }} />
            <p className="label opacity-60">Del irlandés flaithiúil: generoso, espléndido, abundante.</p>
            <p className="text-lead opacity-70">
              Flahoolick es un partner moderno de estrategia y contenido para empresas B2B con ciclos de decisión complejos. Basados en Santiago, Chile.
            </p>
          </div>

        </div>
      </section>

      {/* Por qué existimos — fondo negro */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}
      >
        <div className="max-container">

          {/* Mobile — apilado */}
          <div className="flex flex-col gap-10 md:hidden">
            <h2 className="text-display" style={{ color: '#F9F0E2' }}>Por qué existimos</h2>
            <p className="text-lead opacity-70" style={{ color: '#F9F0E2' }}>
              El conocimiento que distingue a una empresa B2B compleja raramente llega al mercado en la forma que debería. Vive en reuniones que no dejan registro, en manuales que nadie lee y en la cabeza de los expertos que no tienen tiempo de escribir. Flahoolick existe para cambiar eso — instalando el sistema que convierte ese conocimiento en autoridad visible antes de la decisión de compra.
            </p>
            <div style={{ aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
            </div>
          </div>

          {/* Desktop — texto izquierda | divisor | placeholder derecha */}
          <div className="hidden md:grid items-start gap-0" style={{ gridTemplateColumns: '6fr 1px 5fr' }}>
            <div className="flex flex-col gap-10" style={{ paddingRight: '3rem' }}>
              <h2 className="text-display" style={{ color: '#F9F0E2' }}>Por qué existimos</h2>
              <p className="text-lead opacity-70" style={{ color: '#F9F0E2' }}>
                El conocimiento que distingue a una empresa B2B compleja raramente llega al mercado en la forma que debería. Vive en reuniones que no dejan registro, en manuales que nadie lee y en la cabeza de los expertos que no tienen tiempo de escribir. Flahoolick existe para cambiar eso — instalando el sistema que convierte ese conocimiento en autoridad visible antes de la decisión de compra.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.18)', width: '1px', alignSelf: 'stretch' }} />

            <div style={{ paddingLeft: '3rem' }}>
              <div style={{ aspectRatio: '4/5', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Más sobre Flahoolick */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}
      >
        <div className="max-container flex flex-col gap-16">
          <h2 className="text-display">Más sobre Flahoolick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {[
              {
                titulo: 'SERVICIOS',
                desc: 'Los tres puntos de entrada a nuestro trabajo — diagnóstico, instalación y operación — y las disciplinas que los sostienen.',
                href: '/servicios',
                cta: 'Explorar →',
              },
              {
                titulo: 'METODOLOGÍA',
                desc: 'El cómo y el qué de nuestro trabajo — el sistema diseñado para ciclos de decisión complejos y refinado durante cientos de proyectos.',
                href: '/metodologia',
                cta: 'Explorar →',
              },
              {
                titulo: 'JERGA',
                desc: 'Lo aprendido en el trabajo — estrategia de contenido, marketing B2B y autoridad de mercado. Ideas para líderes que necesitan que el mercado los recuerde cuando decida comprar.',
                href: '/jerga',
                cta: 'Leer JERGA →',
              },
            ].map(card => (
              <div key={card.href} className="flex flex-col gap-8 p-10" style={{ backgroundColor: 'var(--section-dark-bg)' }}>
                <div className="flex flex-col gap-4 flex-1">
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.75rem, 2.6vw, 2.5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.015em',
                  }}>{card.titulo}</p>
                  <p className="text-sm leading-relaxed opacity-60">{card.desc}</p>
                </div>
                <Link href={card.href} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-60 transition-opacity w-fit" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>{card.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm bg="#ffffff" text="#000000" />
    </>
  )
}
