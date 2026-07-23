import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import Image from 'next/image'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Sobre Flahoolick',
  description: 'Nacimos de una idea generosa. Consultora de estrategia y contenido B2B, Santiago, Chile.',
}

const clientes = ['Claro Empresas', 'UNAB', 'Cajas de Chile', 'Diario Financiero', 'Consorcio Ciencia e Innovación 2030', 'Adidas']

export default function SobreFlahoolick() {
  return (
    <>
      <PageColorSetter bg="#F9F0E2" text="#000000" />

      {/* Hero — exactamente como NOBL About: split layout, fondo crema */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: 'var(--page-sobre-bg)', color: 'var(--page-sobre-text)' }}
      >
        <div className="max-container w-full grid grid-cols-12 gap-8 items-start">

          {/* Izquierda — Logo shield grande */}
          <div className="hidden md:flex col-span-5 items-center justify-center py-8">
            <Image
              src="/logo-flahoolick-shield.svg"
              alt="Flahoolick"
              width={480}
              height={600}
              style={{ width: '100%', maxWidth: '480px', height: 'auto', filter: 'brightness(0)' }}
              priority
            />
          </div>

          {/* Divisor vertical */}
          <div className="hidden md:flex col-span-1 justify-center self-stretch py-4">
            <div className="w-px h-full" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} />
          </div>

          {/* Derecha — Titular + tagline + descripción */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-10 justify-center" style={{ minHeight: '610px' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 7vw, 9rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: 'var(--page-sobre-text)',
            }}>
              Nacimos de una idea generosa.
            </h1>
            <hr style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopWidth: '1px' }} />
            <p className="label opacity-60">Del irlandés flaithiúil: generoso, espléndido, abundante.</p>
            <p className="text-lead opacity-70">
              Flahoolick es una consultora de estrategia y contenido para empresas B2B con ciclos de decisión complejos. Basados en Santiago, Chile.
            </p>
          </div>

        </div>
      </section>

      {/* El origen — Gossage — fondo crema */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}
      >
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-display" style={{ color: 'var(--section-body-text)' }}>El origen</h2>
          <p className="text-lead opacity-80 max-w-4xl">
            Howard Luck Gossage (San Francisco, 1917-1969) resolvió en vida el problema que el marketing de contenidos lleva cincuenta años intentando nombrar. Operaba desde una estación de bomberos reconvertida en North Beach — trece personas, nunca más — mientras Madison Avenue levantaba imperios de cuentas y de burocracia creativa. Gossage entendía algo que sus contemporáneos no podían procesar: la atención de una persona es soberana. El único camino hacia ella es merecerla. Su principio operativo era uno solo:{' '}
            <mark style={{ backgroundColor: 'var(--brand-signal)', padding: '0 4px', fontStyle: 'italic' }}>
              "Nobody reads ads. People read what interests them. Sometimes it's an ad."
            </mark>{' '}
            Cada campaña que producía tenía un cupón de respuesta — diseñado para crear conversación con quien lo leía. Medía el feedback. Escribía el siguiente anuncio desde ahí. Lo que hoy llamamos content marketing, permission marketing y feedback loop, Gossage lo practicaba cuando esos términos no existían. Fue él quien introdujo a Marshall McLuhan ante el mundo corporativo y mediático, convirtiendo a un filósofo canadiense desconocido en la voz más citada sobre comunicación del siglo XX. Su salón en North Beach recibía a John Steinbeck, Buckminster Fuller, Ken Kesey, Tom Wolfe. Jeff Goodby y Rich Silverstein fundaron su agencia en 1982 con un anuncio que decía: <em>"Introducing a new ad agency founded by a guy who died 14 years ago."</em> Gossage murió a los 52 años de leucemia. Dejó una sola pregunta abierta, que es el título de su libro póstumo: <em>Is There Any Hope for Advertising?</em> La respuesta que él habría dado es la misma que da Flahoolick: sí, cuando la comunicación trata a la audiencia como el único destinatario que importa. La palabra que eligió para una campaña de whiskey irlandés — <em>flahoolick</em>, del gaélico <em>flaithiúil</em>: generoso, espléndido, abundante — era una declaración de principios sobre cómo debería funcionar la comunicación entre una marca y las personas que algún día podrían necesitarla.
          </p>
          <p className="text-xl font-semibold">Nosotros la convertimos en una forma de trabajar.</p>
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
            <h2 className="text-display" style={{ color: 'var(--section-dark-text)' }}>Por qué existimos</h2>
            <p className="text-lead opacity-70">
              El conocimiento que distingue a una empresa B2B compleja raramente llega al mercado en la forma que debería. Vive en reuniones que no dejan registro, en manuales que nadie lee y en la cabeza de los expertos que no tienen tiempo de escribir. Flahoolick existe para cambiar eso — instalando el sistema que convierte ese conocimiento en autoridad visible antes de la decisión de compra.
            </p>
            <div style={{ aspectRatio: '4/3', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="label" style={{ opacity: 0.25 }}>Ilustración</span>
            </div>
          </div>

          {/* Desktop — texto izquierda | divisor | placeholder derecha */}
          <div className="hidden md:grid items-start gap-0" style={{ gridTemplateColumns: '6fr 1px 5fr' }}>
            <div className="flex flex-col gap-10" style={{ paddingRight: '3rem' }}>
              <h2 className="text-display" style={{ color: 'var(--section-dark-text)' }}>Por qué existimos</h2>
              <p className="text-lead opacity-70">
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
            <div style={{ paddingRight: '3rem' }}>
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
                  Durante más de 25 años he trabajado en el punto donde la estrategia, la creatividad y el negocio necesitan entenderse. Comencé en el mundo digital cuando todavía se programaba en Flash. Después dirigí creatividad en agencias globales como McCann MRM, GREY y BBDO, trabajando con grandes marcas, equipos exigentes y problemas reales de negocio.
                </p>
                <p className="text-lead opacity-75">
                  Luego pasé al mundo de los medios. En La Tercera fundé un laboratorio de contenidos de marca. Ahí confirmé algo que venía observando desde hacía años: muchas empresas saben muchísimo y comunican muy poco. Su conocimiento queda disperso entre especialistas, presentaciones, propuestas comerciales, manuales, datos y conversaciones internas. Su mercado recibe apenas una fracción de todo ese valor.
                </p>
                <p className="text-lead opacity-75">
                  El problema se vuelve especialmente serio en empresas B2B. Sus soluciones requieren contexto. Sus ventas tardan meses. Sus compradores necesitan comprender, confiar y recordar. Durante ese tiempo, muchas compañías publican piezas aisladas, repiten mensajes genéricos y vuelven a empezar con cada campaña. Así se pierde conocimiento, consistencia y autoridad.
                </p>
                <p className="text-lead opacity-75">
                  Fundé Flahoolick para resolver esa brecha. Tomamos el conocimiento técnico de una empresa, lo estructuramos alrededor de sus audiencias y lo convertimos en un sistema continuo de comunicación. Unimos estrategia de marca, inteligencia de audiencias, operación editorial y ejecución creativa bajo una misma dirección.
                </p>
                <p className="text-lead opacity-75">
                  Usamos inteligencia artificial para investigar, minar y modelar información a escala. El criterio estratégico, el relato y la redacción final dependen de juicio humano senior.
                </p>
                <p className="text-lead opacity-75">
                  Flahoolick nace de toda esa experiencia acumulada. De haber visto cómo trabajan las agencias, los medios, los equipos comerciales y las grandes organizaciones. De entender dónde se corta el hilo. Y de saber cómo convertir conocimiento complejo en presencia de marca, autoridad de mercado y herramientas concretas para vender.
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
                'Durante más de 25 años he trabajado en el punto donde la estrategia, la creatividad y el negocio necesitan entenderse. Comencé en el mundo digital cuando todavía se programaba en Flash. Después dirigí creatividad en agencias globales como McCann MRM, GREY y BBDO, trabajando con grandes marcas, equipos exigentes y problemas reales de negocio.',
                'Luego pasé al mundo de los medios. En La Tercera fundé un laboratorio de contenidos de marca. Ahí confirmé algo que venía observando desde hacía años: muchas empresas saben muchísimo y comunican muy poco. Su conocimiento queda disperso entre especialistas, presentaciones, propuestas comerciales, manuales, datos y conversaciones internas. Su mercado recibe apenas una fracción de todo ese valor.',
                'Fundé Flahoolick para resolver esa brecha. Tomamos el conocimiento técnico de una empresa, lo estructuramos alrededor de sus audiencias y lo convertimos en un sistema continuo de comunicación.',
              ].map((p, i) => (
                <p key={i} className="text-lead opacity-75">{p}</p>
              ))}
            </div>
            <Link href="https://linkedin.com/in/felipedelafuente" target="_blank" rel="noopener noreferrer"
              className="label opacity-40 hover:opacity-80 transition-opacity">LinkedIn →</Link>
          </div>

        </div>
      </section>

      {/* Con quiénes hemos trabajado */}
      <section
        className="page-px py-16"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="max-container flex flex-col gap-8">
          <p className="label opacity-40">Con quiénes hemos trabajado</p>
          <div className="flex flex-wrap gap-3">
            {clientes.map(c => (
              <span key={c} className="text-sm opacity-60 px-4 py-2"
                style={{ border: '1px solid rgba(0,0,0,0.15)' }}>{c}</span>
            ))}
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
                titulo: 'CAPACIDADES',
                desc: 'Los tres frentes de nuestro trabajo — los contextos en los que operan nuestros clientes y las razones más frecuentes por las que una empresa B2B nos llama.',
                href: '/capacidades',
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
                <img
                  src="/shield.svg"
                  alt=""
                  aria-hidden="true"
                  style={{ height: '44px', width: 'auto', filter: 'brightness(0) invert(1)', display: 'block' }}
                />
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

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
