import { Metadata } from 'next'
import { PageColorSetter } from '@/components/page-color-setter'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Sobre Flahoolick',
  description: 'Nacimos de una idea generosa. Consultora de estrategia y contenido B2B, Santiago, Chile.',
}

const equipo = [
  {
    nombre: 'Felipe de la Fuente',
    cargo: 'Founder & Director Creativo',
    bio: 'Veinte años en medios, publicidad y estrategia de contenido. Grey, McCann, MRM, BBDO. Fundó el laboratorio de branded content de Grupo Copesa y La Tercera en 2015. Fundó Flahoolick para llevar ese criterio al mercado B2B complejo.',
  },
  {
    nombre: 'Jessica',
    cargo: 'Managing Director',
    bio: 'Bio pendiente.',
  },
  {
    nombre: 'Alexey',
    cargo: 'Director Técnico',
    bio: 'Ingeniero civil telemático, Universidad Técnica Federico Santa María. Motor técnico del Sistema de Autoridad de Mercado y responsable de la infraestructura que hace correr SENSOR.',
  },
  {
    nombre: 'Henry Cotta',
    cargo: 'Partner — Voz y Presencia Ejecutiva',
    bio: 'Psicólogo organizacional con más de 20 años de experiencia. Ex profesor universitario. Responsable del desarrollo de voz y presencia ejecutiva para CEOs y directivos.',
  },
]

const clientes = ['Claro Empresas', 'UNAB', 'Cajas de Chile', 'Diario Financiero', 'Consorcio Ciencia e Innovación 2030', 'Adidas']

export default function SobreFlahoolick() {
  return (
    <>
      <PageColorSetter bg="#F9F0E2" text="#000000" />

      {/* Hero — escudo + tagline */}
      <section
        className="page-hero flex flex-col justify-end px-6 md:px-10 pb-16 pt-32"
        style={{ backgroundColor: '#F9F0E2' }}
      >
        <div className="max-w-screen-xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
          {/* Escudo */}
          <div className="hidden md:flex items-center justify-center">
            <svg width="220" height="260" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 0L0 5.33333V16C0 24 6 30.6667 14 32C22 30.6667 28 24 28 16V5.33333L14 0Z" fill="#000000" />
            </svg>
          </div>
          <div className="flex flex-col gap-8">
            <p className="text-label text-negro/50">El nombre lo dice todo.</p>
            <h1 className="font-display text-display-lg text-negro leading-none">
              Nacimos de una idea generosa.
            </h1>
            <p className="text-xl text-negro/60 font-light leading-relaxed">
              Flahoolick es una consultora de estrategia y contenido para empresas B2B con ciclos de decisión complejos. Basados en Santiago, Chile.
            </p>
          </div>
        </div>
      </section>

      {/* El origen — Gossage */}
      <section className="bg-crema py-24 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-3">
            <p className="text-label text-negro/40">El origen</p>
          </div>
          <div className="md:col-span-9 flex flex-col gap-8">
            <p className="text-lg text-negro/80 font-light leading-relaxed">
              Howard Luck Gossage (San Francisco, 1917-1969) resolvió en vida el problema que el marketing de contenidos lleva cincuenta años intentando nombrar. Operaba desde una estación de bomberos reconvertida en North Beach — trece personas, nunca más — mientras Madison Avenue levantaba imperios de cuentas y de burocracia creativa. Gossage entendía algo que sus contemporáneos no podían procesar: la atención de una persona es soberana. El único camino hacia ella es merecerla. Su principio operativo era uno solo: <em>"Nobody reads ads. People read what interests them. Sometimes it's an ad."</em> Cada campaña que producía tenía un cupón de respuesta — diseñado para crear conversación con quien lo leía. Medía el feedback. Escribía el siguiente anuncio desde ahí. Lo que hoy llamamos content marketing, permission marketing y feedback loop, Gossage lo practicaba cuando esos términos no existían. Fue él quien introdujo a Marshall McLuhan ante el mundo corporativo y mediático, convirtiendo a un filósofo canadiense desconocido en la voz más citada sobre comunicación del siglo XX. Su salón en North Beach recibía a John Steinbeck, Buckminster Fuller, Ken Kesey, Tom Wolfe. Jeff Goodby y Rich Silverstein fundaron su agencia en 1982 con un anuncio que decía: <em>"Introducing a new ad agency founded by a guy who died 14 years ago."</em> Gossage murió a los 52 años de leucemia. Dejó una sola pregunta abierta, que es el título de su libro póstumo: <em>Is There Any Hope for Advertising?</em> La respuesta que él habría dado es la misma que da Flahoolick: sí, cuando la comunicación trata a la audiencia como el único destinatario que importa. La palabra que eligió para una campaña de whiskey irlandés — <em>flahoolick</em>, del gaélico <em>flaithiúil</em>: generoso, espléndido, abundante — era una declaración de principios sobre cómo debería funcionar la comunicación entre una marca y las personas que algún día podrían necesitarla.
            </p>
            <p className="text-lg font-semibold text-negro">
              Nosotros la convertimos en una forma de trabajar.
            </p>
          </div>
        </div>
      </section>

      {/* Por qué existimos */}
      <section className="bg-negro py-24 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-3">
            <p className="text-label text-white/40">Por qué existimos</p>
          </div>
          <div className="md:col-span-9">
            <p className="text-2xl text-white font-light leading-relaxed">
              El conocimiento que distingue a una empresa B2B compleja raramente llega al mercado en la forma que debería. Vive en reuniones que no dejan registro, en manuales que nadie lee y en la cabeza de los expertos que no tienen tiempo de escribir. Flahoolick existe para cambiar eso — instalando el sistema que convierte ese conocimiento en autoridad visible antes de la decisión de compra.
            </p>
          </div>
        </div>
      </section>

      {/* El equipo */}
      <section className="bg-crema py-24 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-16">
          <p className="text-label text-negro/40">El equipo</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-negro/10">
            {equipo.map(persona => (
              <div key={persona.nombre} className="bg-crema p-10 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-negro">{persona.nombre}</h3>
                  <p className="text-label text-negro/50 mt-1">{persona.cargo}</p>
                </div>
                <p className="text-sm text-negro/60 leading-relaxed">{persona.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Con quiénes hemos trabajado */}
      <section className="bg-crema py-16 px-6 md:px-10 border-t border-negro/10">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-8">
          <p className="text-label text-negro/40">Con quiénes hemos trabajado</p>
          <div className="flex flex-wrap gap-3">
            {clientes.map(c => (
              <span key={c} className="text-sm text-negro/60 border border-negro/20 px-4 py-2">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-negro py-16 px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-8">
          <p className="text-label text-white/40">Más sobre Flahoolick</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Capacidades', href: '/capacidades' },
              { label: 'Metodología', href: '/metodologia' },
              { label: 'SENSOR', href: '/sensor' },
              { label: 'DECK', href: '/deck' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors border border-white/10 px-4 py-3 text-center"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm bg="#3B0B2C" text="#ffffff" />
    </>
  )
}
