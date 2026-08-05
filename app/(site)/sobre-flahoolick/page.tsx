import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import Image from 'next/image'
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

      {/* Meet the Founder */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}
      >
        <div className="max-container">

          {/* Desktop: split foto | divisor | texto — igual que los headers */}
          <div className="hidden md:grid items-start gap-0"
            style={{ gridTemplateColumns: '5fr 1px 6fr' }}>

            {/* Foto izquierda — sticky */}
            <div style={{ paddingRight: '3rem', alignSelf: 'stretch' }}>
              <div style={{ position: 'sticky', top: 'calc(64px + 3rem)' }}>
                <div style={{ aspectRatio: '4/5', maxHeight: '60vh', overflow: 'hidden' }}>
                  <Image
                    src="/foto-felipe.png"
                    alt="Felipe de la Fuente"
                    width={500}
                    height={625}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)', display: 'block' }}
                  />
                </div>
                <div className="mt-4">
                  <Link href="https://linkedin.com/in/felipedelafuente" target="_blank" rel="noopener noreferrer"
                    className="label opacity-40 hover:opacity-80 transition-opacity">
                    LinkedIn →
                  </Link>
                </div>
              </div>
            </div>

            {/* Divisor vertical */}
            <div style={{ backgroundColor: 'rgba(0,0,0,0.12)', width: '1px', alignSelf: 'stretch' }} />

            {/* Texto derecha */}
            <div className="flex flex-col gap-8" style={{ paddingLeft: '3rem' }}>
              {/* Header estilo Bud Caddell */}
              <div className="flex flex-col gap-2">
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(1.2rem, 2vw, 2rem)',
                  lineHeight: 1.2,
                }}>
                  Conoce a nuestro founder
                </p>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(2.5rem, 5vw, 7rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                }}>
                  Felipe de la Fuente
                </h2>
                <p className="label" style={{ opacity: 0.5 }}>Founder & CEO</p>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-5">
                <p className="text-lead opacity-75">
                  Durante más de 25 años he cruzado creatividad, estrategia y negocio. Comencé programando en Actionscript de Flash en Merlin Interactive Systems. Después dirigí creatividad digital en McCann MRM, GREY y FIEBRE/BBDO, con marcas y campañas a nivel latam.
                </p>
                <p className="text-lead opacity-75">
                  Luego fundé el laboratorio de contenidos de marca de La Tercera, dentro de Grupo Copesa. Ahí entendí el problema real: las empresas saben mucho y comunican poco. Su conocimiento queda disperso entre especialistas, decks, manuales y conversaciones internas — y su mercado recibe apenas una fracción de ese valor.
                </p>
                <p className="text-lead opacity-75">
                  En negocios B2B, donde las ventas tardan meses y el mercado necesita comprender, confiar y recordar, esa dispersión cuesta disponibilidad mental. Fundé Flahoolick para resolverlo. Tomamos el conocimiento técnico de una empresa, lo estructuramos alrededor de sus audiencias, y lo convertimos en un sistema continuo de comunicación — estrategia de marca, inteligencia de audiencias, operación editorial y ejecución creativa bajo una misma dirección.
                </p>
                <p className="text-lead opacity-75">
                  Usamos inteligencia artificial para investigar y modelar información a escala; el criterio, el relato y la redacción final dependen de juicio humano senior. Es la síntesis de haber visto por dentro cómo trabajan agencias, medios y grandes organizaciones — y de saber exactamente dónde se corta el hilo.
                </p>
              </div>

              <Link href="/jerga"
                className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
                style={{ color: 'var(--section-body-text)', borderColor: 'var(--section-body-text)' }}>
                Leer JERGA →
              </Link>
            </div>
          </div>

          {/* Mobile: stack */}
          <div className="flex flex-col gap-8 md:hidden">
            <div style={{ aspectRatio: '3/4', maxWidth: '280px', overflow: 'hidden' }}>
              <Image src="/foto-felipe.png" alt="Felipe de la Fuente" width={280} height={373}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)' }} />
            </div>
            <div className="flex flex-col gap-2">
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.2 }}>Conoce a nuestro founder</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
                Felipe de la Fuente
              </h2>
              <p className="label" style={{ opacity: 0.5 }}>Founder & CEO</p>
            </div>
            <div className="flex flex-col gap-5">
              {[
                'Durante más de 25 años he cruzado creatividad, estrategia y negocio. Comencé programando en Actionscript de Flash en Merlin Interactive Systems. Después dirigí creatividad digital en McCann MRM, GREY y FIEBRE/BBDO, con marcas y campañas a nivel latam.',
                'Luego fundé el laboratorio de contenidos de marca de La Tercera, dentro de Grupo Copesa. Ahí entendí el problema real: las empresas saben mucho y comunican poco. Su conocimiento queda disperso entre especialistas, decks, manuales y conversaciones internas — y su mercado recibe apenas una fracción de ese valor.',
                'Fundé Flahoolick para resolverlo. Tomamos el conocimiento técnico de una empresa, lo estructuramos alrededor de sus audiencias, y lo convertimos en un sistema continuo de comunicación — estrategia de marca, inteligencia de audiencias, operación editorial y ejecución creativa bajo una misma dirección.',
              ].map((p, i) => (
                <p key={i} className="text-lead opacity-75">{p}</p>
              ))}
            </div>
            <Link href="https://linkedin.com/in/felipedelafuente" target="_blank" rel="noopener noreferrer"
              className="label opacity-40 hover:opacity-80 transition-opacity">LinkedIn →</Link>
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
