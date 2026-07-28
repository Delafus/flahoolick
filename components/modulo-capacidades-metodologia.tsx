'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AcordeonSeccion } from './acordeon-seccion'

const NEGRO   = '#000000'
const BLANCO  = '#ffffff'

const acordeonItems = [
  {
    titulo: 'ESTRATEGIA Y RELATO',
    desc: 'Definimos la posición, las audiencias y el relato que la empresa necesita instalar en el mercado.',
    href: '/capacidades/estrategia-y-relato',
  },
  {
    titulo: 'SISTEMA DE CONTENIDO',
    desc: 'Diseñamos el playbook, los flujos y la cadencia que mantienen el conocimiento en circulación.',
    href: '/capacidades/sistema-de-contenido',
  },
  {
    titulo: 'ESTUDIO CREATIVO',
    desc: 'Producimos contenidos, herramientas comerciales y activos ejecutivos que construyen autoridad y apoyan tu venta.',
    href: '/capacidades/estudio-creativo',
  },
]

const footerCols = [
  {
    titulo: 'NUESTRO PROCESO',
    desc: 'Capturamos lo que tu empresa ya sabe, lo estructuramos con criterio editorial y lo convertimos en presencia continua. Cuatro capas que trabajan en ciclo: señales, conocimiento, producción y aprendizaje.',
    href: '/metodologia/como-funciona-el-sistema',
  },
  {
    titulo: 'CÓMO MEDIMOS',
    desc: 'Seguimos temas, preguntas y objeciones que emergen en el ciclo comercial. Medimos tracción editorial, uso interno y visibilidad en plataformas de IA para calibrar cada ciclo siguiente.',
    href: '/metodologia/como-aprendemos',
  },
  {
    titulo: 'LA DIFERENCIA',
    desc: 'El punto de partida es una pregunta: qué sabe tu empresa que tu audiencia necesita entender. Esa respuesta, bien construida, es lo que separa la autoridad del ruido en mercados B2B complejos.',
    href: '/metodologia/como-trabajamos-con-ia',
  },
]

const tarjetasJerga = [
  { img: '/card-95-5.svg',           titulo: 'El 95% que no está comprando', href: '/jerga' },
  { img: '/card-idea-que-viaja.svg', titulo: 'Cómo viaja una idea',           href: '/jerga' },
]

function ShieldIcon() {
  return (
    <Image src="/shield.svg" alt="" width={18} height={22}
      style={{
        filter: 'brightness(0) invert(1)',
        height: '22px', width: 'auto', flexShrink: 0,
      }}
    />
  )
}

export function ModuloCapacidadesMetodologia() {
  return (
    <div style={{ backgroundColor: NEGRO }}>

      {/* ── SECCIÓN 1: CAPACIDADES ── */}
      <AcordeonSeccion
        eyebrow="En qué nos especializamos"
        titulo="Donde el contenido trabaja para el negocio"
        bajada="Tres capacidades trabajan juntas durante el diagnóstico, la instalación y la operación."
        illustration={{ src: '/iconos-industria.svg', alt: 'Íconos de industrias B2B' }}
        items={acordeonItems}
        ctaLabel="CÓMO LO HACEMOS"
      />

      {/* Divisoria */}
      <div className="page-px">
        <div className="max-container">
          <hr style={{ borderColor: BLANCO, borderTopWidth: '1px', opacity: 0.3 }} />
        </div>
      </div>

      {/* ── SECCIÓN 2: METODOLOGÍA ── */}
      <section className="page-px section-py">
        <div className="max-container">

          {/* Grid: columna izquierda larga + columna derecha sticky */}
          <div className="hidden md:grid gap-12 items-start"
            style={{ gridTemplateColumns: '10fr 3fr' }}>

            {/* Columna izquierda — scrollea libremente */}
            <div className="flex flex-col gap-8">
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 10vw, 12rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: BLANCO,
                fontWeight: 400,
                overflowWrap: 'break-word',
              }}>
                Metodología
              </h2>

              <div className="flex flex-col gap-5" style={{ maxWidth: '560px' }}>
                <p className="label" style={{ color: BLANCO }}>El mercado forma opinión en silencio</p>
                <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)', lineHeight: 1.6, color: BLANCO, opacity: 0.85, fontWeight: 300 }}>
                  La autoridad técnica se construye antes de la reunión comercial. Ocurre cuando una empresa logra transformar lo que sabe en ideas, argumentos y activos que circulan durante meses. Flahoolick convierte señales internas en presencia continua para mercados B2B complejos.
                </p>
                <Link href="/metodologia"
                  className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                  EXPLORAR METODOLOGÍA ›
                </Link>
              </div>

              {/* Tres cajitas — dentro de la columna izquierda, tras el contenido */}
              <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, marginTop: '3rem', paddingTop: '3rem' }}>
                <div className="grid grid-cols-3 gap-8">
                  {footerCols.map((col, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <ShieldIcon />
                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: BLANCO, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                          {col.titulo}
                        </p>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.7 }}>{col.desc}</p>
                      <Link href={col.href}
                        className="label inline-flex items-center gap-1 px-4 py-2 w-fit hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                        CONOCE MÁS ›
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna derecha — sticky */}
            <div style={{
              position: 'sticky',
              top: '80px',
              alignSelf: 'start',
              borderLeft: `1px solid rgba(255,255,255,0.2)`,
              paddingLeft: '2rem',
            }}>
              {tarjetasJerga.map((card, i) => (
                <div key={i}>
                  <Link href={card.href} className="group flex flex-col gap-3 py-6 hover:opacity-80 transition-opacity">
                    <img src={card.img} alt={card.titulo} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                    <p className="text-sm font-semibold" style={{ color: BLANCO }}>{card.titulo}</p>
                    <p className="label" style={{ color: BLANCO, opacity: 0.6, fontSize: '0.6rem' }}>PUNTO DE PARTIDA</p>
                  </Link>
                  {i === 0 && <hr style={{ borderColor: 'rgba(255,255,255,0.15)', borderTopWidth: '1px' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stack vertical */}
          <div className="flex flex-col gap-8 md:hidden">
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: BLANCO,
              fontWeight: 400,
            }}>
              Metodología
            </h2>
            <div className="flex flex-col gap-5">
              <p className="label" style={{ color: BLANCO }}>El mercado forma opinión en silencio</p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: BLANCO, opacity: 0.85, fontWeight: 300 }}>
                La autoridad técnica se construye antes de la reunión comercial. Ocurre cuando una empresa logra transformar lo que sabe en ideas, argumentos y activos que circulan durante meses. Flahoolick convierte señales internas en presencia continua para mercados B2B complejos.
              </p>
              <Link href="/metodologia"
                className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                EXPLORAR METODOLOGÍA ›
              </Link>
            </div>
            {tarjetasJerga.map((card, i) => (
              <Link key={i} href={card.href} className="group flex flex-col gap-3 hover:opacity-80 transition-opacity">
                <img src={card.img} alt={card.titulo} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                <p className="text-sm font-semibold" style={{ color: BLANCO }}>{card.titulo}</p>
                <p className="label" style={{ color: BLANCO, opacity: 0.6, fontSize: '0.6rem' }}>PUNTO DE PARTIDA</p>
              </Link>
            ))}
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, paddingTop: '2rem' }}>
              {footerCols.map((col, i) => (
                <div key={i} className="flex flex-col gap-3 mb-8">
                  <div className="flex items-center gap-2">
                    <ShieldIcon />
                    <p style={{ fontSize: '0.9rem', fontWeight: 700, color: BLANCO, textTransform: 'uppercase' }}>{col.titulo}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.7 }}>{col.desc}</p>
                  <Link href={col.href}
                    className="label inline-flex items-center gap-1 px-4 py-2 w-fit hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: BLANCO, color: NEGRO, fontSize: '0.65rem', borderRadius: '0' }}>
                    CONOCE MÁS ›
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
