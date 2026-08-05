import { Metadata } from 'next'
import Link from 'next/link'
import { PageColorSetter } from '@/components/page-color-setter'
import { ContactForm } from '@/components/contact-form'
import { ServicioScrollSteps } from '@/components/servicio-scroll-steps'
import { ServicioAcordeonIncluye } from '@/components/servicio-acordeon-incluye'

export const metadata: Metadata = { title: 'Estrategia de Contenido — Flahoolick' }

const ROSA = '#F09DB6'
const NEGRO = '#000000'

const problemas = [
  { titulo: 'Demasiados temas', desc: 'Definimos los territorios donde tu empresa puede hablar con autoridad.' },
  { titulo: 'Audiencias demasiado amplias', desc: 'Identificamos quién necesita escuchar qué durante cada momento de la decisión.' },
  { titulo: 'Contenido disperso', desc: 'Asignamos una función comercial y editorial a cada pieza.' },
  { titulo: 'El calendario gobierna', desc: 'Creamos prioridades, ritmos y criterios claros para decidir qué producir.' },
]

const pasos = [
  { numero: '01', titulo: 'Arquitectura', desc: 'Ordenamos mensajes, temas, audiencias, formatos y canales.' },
  { numero: '02', titulo: 'Recorrido', desc: 'Mapeamos las preguntas que aparecen durante el ciclo comercial.' },
  { numero: '03', titulo: 'Sistema', desc: 'Definimos cómo encontrar, producir, aprobar, distribuir y medir contenido.' },
  { numero: '04', titulo: 'Plan', desc: 'Convertimos la estrategia en un roadmap listo para ejecutar.' },
]

const categorias = [
  { titulo: 'Inteligencia', items: ['Auditoría de contenido', 'Análisis de brechas', 'Inteligencia de audiencias', 'Benchmark competitivo'] },
  { titulo: 'Arquitectura', items: ['Mapa del proceso de decisión', 'Arquitectura de mensajes', 'Pilares editoriales', 'Territorios temáticos'] },
  { titulo: 'Circulación', items: ['Plan de canales', 'SEO y visibilidad en buscadores con IA', 'Estrategia de distribución', 'Calendario editorial'] },
  { titulo: 'Medición', items: ['Roadmap de contenido', 'Indicadores', 'Modelo de medición', 'Criterios de optimización'] },
]

const recibes = ['Qué decir', 'A quién hablar', 'Qué producir', 'Dónde distribuir', 'Cómo medir', 'Cómo sostener la operación']

/** Grilla que titila, evocando un calendario editorial en movimiento — sin JS, solo CSS. */
function HeroGridAnimada() {
  const total = 48
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '320px' }}>
      <style>{`
        @keyframes celda-pulso {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', width: '100%', height: '100%' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            aspectRatio: '1/1',
            backgroundColor: NEGRO,
            borderRadius: '3px',
            animation: `celda-pulso ${2.2 + (i % 5) * 0.35}s ease-in-out infinite`,
            animationDelay: `${(i % 13) * 0.18}s`,
          }} />
        ))}
      </div>
    </div>
  )
}

export default function EstrategiaDeContenido() {
  return (
    <>
      <PageColorSetter bg={ROSA} text={NEGRO} />

      {/* 01 — HERO, pantalla completa */}
      <section
        className="flex flex-col items-center justify-center page-px pt-24"
        style={{ minHeight: '100dvh', paddingBottom: '2rem', backgroundColor: ROSA, color: NEGRO }}
      >
        <div className="max-container w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex flex-col gap-6">
            <p className="label opacity-50">Estrategia de contenido</p>
            <h1 className="text-hero" style={{ color: NEGRO }}>Ponle cerebro al calendario.</h1>
            <p className="text-lead opacity-70" style={{ maxWidth: '32rem' }}>
              Diseñamos la lógica que conecta objetivos, audiencias, temas, canales y momentos de decisión.
            </p>
            <Link href="#contacto"
              className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit mt-2 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: NEGRO, color: ROSA }}>
              Conversemos →
            </Link>
          </div>
          <div className="hidden md:block md:col-span-5">
            <HeroGridAnimada />
          </div>
        </div>
      </section>

      {/* 02 — BLOQUE DE APERTURA */}
      <section className="page-px section-py" style={{ backgroundColor: ROSA, color: NEGRO }}>
        <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-12">
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            Tu empresa tiene ideas. Necesita dirección.
          </h2>
          <div className="flex flex-col gap-4">
            <p className="text-lead opacity-80">
              Cada pieza recibe una función. Cada canal recibe una razón. Cada esfuerzo empuja en la misma dirección.
            </p>
            <p className="text-base leading-relaxed opacity-65">
              El conocimiento aparece en reuniones, presentaciones, conversaciones comerciales, documentos y especialistas. Encontramos las ideas con valor, las ordenamos y definimos cómo ponerlas frente al mercado.
            </p>
          </div>
        </div>
      </section>

      {/* 03 — QUÉ RESOLVEMOS, 4 cards con hover */}
      <section className="page-px section-py" style={{ backgroundColor: '#ffffff', color: NEGRO }}>
        <div className="max-container flex flex-col gap-10">
          <p className="label opacity-40">Qué resolvemos</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(0,0,0,0.1)' }}>
            {problemas.map(p => (
              <div key={p.titulo} className="group flex flex-col gap-3 p-10 transition-colors duration-300 hover:bg-black/[0.03]"
                style={{ backgroundColor: '#ffffff' }}
              >
                <h3 className="text-xl font-semibold transition-transform duration-300 group-hover:translate-x-1">{p.titulo}</h3>
                <p className="text-sm leading-relaxed opacity-65">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — QUÉ CONSTRUIMOS, secuencia conectada que se activa al scrollear */}
      <section className="page-px section-py" style={{ backgroundColor: ROSA, color: NEGRO }}>
        <div className="max-container flex flex-col gap-12">
          <p className="label opacity-50">Qué construimos</p>
          <ServicioScrollSteps pasos={pasos} color={NEGRO} />
        </div>
      </section>

      {/* 05 — QUÉ INCLUYE, acordeón */}
      <section className="page-px section-py" style={{ backgroundColor: '#ffffff', color: NEGRO }}>
        <div className="max-container flex flex-col gap-10">
          <p className="label opacity-40">Qué incluye</p>
          <ServicioAcordeonIncluye categorias={categorias} color={NEGRO} />
        </div>
      </section>

      {/* 06 — QUÉ RECIBES, mockup del playbook */}
      <section className="page-px section-py" style={{ backgroundColor: ROSA, color: NEGRO }}>
        <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px', aspectRatio: '3/4', margin: '0 auto' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundColor: NEGRO, opacity: 0.5, transform: 'rotate(-6deg) translate(14px, 10px)', borderRadius: '8px' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: NEGRO, opacity: 0.75, transform: 'rotate(3deg) translate(-8px, -6px)', borderRadius: '8px' }} />
            <div style={{
              position: 'absolute', inset: 0, backgroundColor: NEGRO, borderRadius: '8px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem 2rem',
            }}>
              <p className="label" style={{ color: ROSA, opacity: 0.6 }}>Playbook</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.1, color: ROSA }}>
                Estrategia de Contenido
              </h3>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Playbook de estrategia de contenido
            </h2>
            <p className="text-base opacity-70">Un sistema operativo para decidir:</p>
            <div className="flex flex-col">
              {recibes.map(r => (
                <p key={r} className="text-base py-3" style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }}>{r}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07 — CIERRE, cambio de color */}
      <section className="flex flex-col items-center text-center page-px section-py" style={{ backgroundColor: NEGRO, color: ROSA }}>
        <div className="max-container flex flex-col items-center gap-6" style={{ maxWidth: '48rem' }}>
          <h2 className="text-hero" style={{ color: ROSA }}>El calendario empieza después.</h2>
          <p className="text-lead opacity-75">Primero construimos la lógica que le da sentido.</p>
          <Link href="#contacto"
            className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit mt-2 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: ROSA, color: NEGRO }}>
            Diseñemos tu estrategia →
          </Link>
        </div>
      </section>

      <ContactForm bg="#ffffff" text="#000000" />
    </>
  )
}
