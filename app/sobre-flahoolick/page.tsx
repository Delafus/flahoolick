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

      {/* Hero — exactamente como NOBL About: split layout, fondo rosa */}
      <section
        className="page-hero page-px"
        style={{ backgroundColor: 'var(--page-capacidades-bg)', color: 'var(--page-capacidades-text)' }}
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
              color: 'var(--page-capacidades-text)',
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
        <div className="max-container flex flex-col gap-12">
          <h2 className="text-display" style={{ color: 'var(--section-dark-text)' }}>Por qué existimos</h2>
          <p className="text-lead max-w-4xl opacity-70">
            El conocimiento que distingue a una empresa B2B compleja raramente llega al mercado en la forma que debería. Vive en reuniones que no dejan registro, en manuales que nadie lee y en la cabeza de los expertos que no tienen tiempo de escribir. Flahoolick existe para cambiar eso — instalando el sistema que convierte ese conocimiento en autoridad visible antes de la decisión de compra.
          </p>
        </div>
      </section>

      {/* Meet the Founder — fondo crema */}
      <section
        className="page-px section-py"
        style={{ backgroundColor: 'var(--section-body-bg)', color: 'var(--section-body-text)' }}
      >
        <div className="max-container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            {/* Foto */}
            <div className="md:col-span-4">
              <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', maxWidth: '320px' }}>
                <Image
                  src="/foto-felipe.png"
                  alt="Felipe de la Fuente"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)' }}
                />
              </div>
              <div className="mt-4">
                <Link
                  href="https://linkedin.com/in/felipedelafuente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label opacity-40 hover:opacity-80 transition-opacity"
                >
                  LinkedIn →
                </Link>
              </div>
            </div>

            {/* Texto */}
            <div className="md:col-span-8 flex flex-col gap-8">
              <div>
                <p className="label opacity-40 mb-3">El Fundador</p>
                <h2 className="text-headline">Felipe de la Fuente</h2>
                <p className="label opacity-50 mt-2">Founder & Director Creativo</p>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-lead opacity-75">
                  Felipe de la Fuente lleva más de 25 años en el punto donde la estrategia, la creatividad y el negocio necesitan entenderse — y llegó ahí por la puerta que nadie usaba.
                </p>
                <p className="text-lead opacity-75">
                  En 1998, cuando lo digital significaba programar en Actionscript para Macromedia Flash, comenzó en Merlin Interactive Systems. Desde ahí construyó una trayectoria que lo llevó por McCann MRM, Multinet, Grey y BBDO — acumulando una visión de cómo las organizaciones grandes producen comunicación y dónde pierden el hilo. En 2015 llegó a Grupo Copesa, donde fundó el Laboratorio de Contenidos de Marca de La Tercera. Ahí descubrió algo que ninguna agencia le había mostrado con esa claridad: las empresas no necesitaban solo branded content. Necesitaban un sistema capaz de convertir lo que sabían en algo que el mercado pudiera recordar.
                </p>
                <p className="text-lead opacity-75">
                  El mismo patrón se repetía en cada organización que pasaba por el laboratorio. Las empresas con mayor conocimiento técnico tenían las mayores dificultades para comunicarlo. Sus mejores ideas vivían en la cabeza de sus especialistas, en propuestas que el mercado nunca leía, en documentos que acumulaban polvo en carpetas compartidas. Cada área producía piezas por separado. Cada campaña empezaba desde cero.
                </p>
                <p className="text-lead opacity-75">
                  En empresas B2B el problema era estructural. Sus decisiones de compra tardaban meses. Sus audiencias necesitaban comprender antes de confiar. Y el mercado recordaría, llegado el momento de comprar, a quienes habían estado presentes antes de que hubiera una razón para buscar.
                </p>
                <p className="text-lead opacity-75">Esa brecha se convirtió en su obsesión. Y en Flahoolick.</p>
              </div>
              <Link
                href="/jerga"
                className="label inline-flex items-center gap-2 border px-6 py-3.5 w-fit hover:opacity-60 transition-opacity"
                style={{ color: 'var(--section-body-text)', borderColor: 'var(--section-body-text)' }}
              >
                Leer JERGA →
              </Link>
            </div>
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
          <h2 className="text-headline">Más sobre Flahoolick</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <div className="flex flex-col gap-8 p-10" style={{ backgroundColor: 'var(--section-dark-bg)' }}>
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none"><rect x="0" y="0" width="8" height="8" fill="#F09DB6"/><rect x="10" y="0" width="8" height="8" fill="#F09DB6" opacity="0.5"/><rect x="20" y="0" width="8" height="8" fill="#F09DB6" opacity="0.25"/><rect x="0" y="12" width="8" height="8" fill="#F09DB6" opacity="0.5"/><rect x="10" y="12" width="8" height="8" fill="#F09DB6"/><rect x="20" y="12" width="8" height="8" fill="#F09DB6" opacity="0.5"/></svg>
              <div className="flex flex-col gap-4 flex-1">
                <p className="label font-bold">CAPACIDADES</p>
                <p className="text-sm leading-relaxed opacity-60">Los tres frentes de nuestro trabajo — los contextos en los que operan nuestros clientes y las razones más frecuentes por las que una empresa B2B nos llama.</p>
              </div>
              <Link href="/capacidades" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-60 transition-opacity w-fit" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>Explorar →</Link>
            </div>
            <div className="flex flex-col gap-8 p-10" style={{ backgroundColor: 'var(--section-dark-bg)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="10" y="0" width="8" height="8" fill="#F5FD92"/><rect x="0" y="10" width="8" height="8" fill="#F5FD92" opacity="0.5"/><rect x="10" y="10" width="8" height="8" fill="#F5FD92"/><rect x="20" y="10" width="8" height="8" fill="#F5FD92" opacity="0.5"/><rect x="5" y="20" width="8" height="8" fill="#F5FD92" opacity="0.35"/><rect x="15" y="20" width="8" height="8" fill="#F5FD92" opacity="0.35"/></svg>
              <div className="flex flex-col gap-4 flex-1">
                <p className="label font-bold">METODOLOGÍA</p>
                <p className="text-sm leading-relaxed opacity-60">El cómo y el qué de nuestro trabajo — el sistema diseñado para ciclos de decisión complejos y refinado durante cientos de proyectos.</p>
              </div>
              <Link href="/metodologia" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-60 transition-opacity w-fit" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>Explorar →</Link>
            </div>
            <div className="flex flex-col gap-8 p-10" style={{ backgroundColor: 'var(--section-dark-bg)' }}>
              <svg width="28" height="24" viewBox="0 0 28 24" fill="none"><rect x="0" y="0" width="18" height="4" fill="#F9F0E2"/><rect x="0" y="8" width="28" height="4" fill="#F9F0E2" opacity="0.5"/><rect x="0" y="16" width="12" height="4" fill="#F9F0E2" opacity="0.75"/></svg>
              <div className="flex flex-col gap-4 flex-1">
                <p className="label font-bold">JERGA</p>
                <p className="text-sm leading-relaxed opacity-60">Lo aprendido en el trabajo — estrategia de contenido, marketing B2B y autoridad de mercado. Ideas para líderes que necesitan que el mercado los recuerde cuando decida comprar.</p>
              </div>
              <Link href="/jerga" className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-60 transition-opacity w-fit" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>Leer JERGA →</Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm bg="var(--brand-depth)" text="var(--brand-chalk)" />
    </>
  )
}
