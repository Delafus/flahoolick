'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CIRUELA = '#3B0B2C'
const ROSA    = '#F09DB6'
const BLANCO  = '#ffffff'

const acordeonItems = [
  {
    titulo: 'ESTRATEGIA Y RELATO',
    desc: 'Definimos quién eres para el mercado que importa antes de producir una sola pieza.',
    href: '/capacidades/estrategia-y-relato',
  },
  {
    titulo: 'SISTEMA DE CONTENIDO',
    desc: 'Instalamos el flujo continuo que mantiene tu conocimiento en circulación mes a mes.',
    href: '/capacidades/sistema-de-contenido',
  },
  {
    titulo: 'ESTUDIO CREATIVO',
    desc: 'Producimos los activos que construyen presencia y habilitan el cierre comercial.',
    href: '/capacidades/estudio-creativo',
  },
]

const footerCols = [
  {
    titulo: 'NUESTRO PROCESO',
    desc: 'Capturamos señales, interpretamos patrones, activamos contenido y aprendemos con el mercado.',
    href: '/metodologia/como-funciona-el-sistema',
  },
  {
    titulo: 'CÓMO MEDIMOS',
    desc: 'Seguimos temas, preguntas, objeciones, tracción editorial y uso comercial.',
    href: '/metodologia/como-aprendemos',
  },
  {
    titulo: 'LA DIFERENCIA',
    desc: 'El punto de partida es una pregunta: qué sabe tu empresa que tu audiencia necesita entender.',
    href: '/metodologia/como-trabajamos-con-ia',
  },
]

const tarjetasJerga = [
  { img: '/card-95-5.svg',           titulo: 'El 95% que no está comprando', href: '/jerga' },
  { img: '/card-idea-que-viaja.svg', titulo: 'Cómo viaja una idea',           href: '/jerga' },
]

function ShieldIcon() {
  return (
    <Image
      src="/shield.svg"
      alt=""
      width={16}
      height={20}
      style={{
        filter: 'brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(300deg) brightness(1.1)',
        height: '20px',
        width: 'auto',
        flexShrink: 0,
      }}
    />
  )
}

export function ModuloCapacidadesMetodologia() {
  const [abierto, setAbierto] = useState(0)

  return (
    <div style={{ backgroundColor: CIRUELA }}>

      {/* ── SECCIÓN 1: CAPACIDADES ── */}
      <section className="page-px section-py">
        <div className="max-container flex flex-col items-center text-center gap-6">

          {/* Eyebrow */}
          <p className="label" style={{ color: ROSA }}>En qué nos especializamos</p>

          {/* Titular — blanco, Instrument Serif, 2 líneas */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'normal',
            fontSize: 'clamp(2.5rem, 4.5vw, 5rem)',
            lineHeight: 1.1,
            color: BLANCO,
            fontWeight: 400,
            maxWidth: '700px',
            whiteSpace: 'nowrap',
          }}>
            Tu conocimiento ya existe, pongámoslo en circulación
          </h2>
        </div>

        {/* Espacio */}
        <div style={{ height: '200px' }} />

        {/* Dos columnas iguales */}
        <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda — ilustración */}
          <div>
            <Image
              src="/papeles-flahoolick.svg"
              alt="Conocimiento en circulación"
              width={500}
              height={400}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Columna derecha — acordeón */}
          <div className="flex flex-col">
            {acordeonItems.map((item, i) => (
              <div key={i} style={{ borderTop: `1px solid rgba(255,255,255,0.25)` }}>
                <button
                  onClick={() => setAbierto(abierto === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="label font-bold" style={{ color: BLANCO }}>{item.titulo}</span>
                  <span style={{ color: BLANCO, fontSize: '1.2rem', lineHeight: 1 }}>
                    {abierto === i ? '−' : '+'}
                  </span>
                </button>
                {abierto === i && (
                  <div className="pb-6 flex flex-col gap-4">
                    <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.8 }}>
                      {item.desc}
                    </p>
                    <Link
                      href={item.href}
                      className="label inline-flex items-center px-4 py-2.5 w-fit hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: ROSA, color: CIRUELA, fontSize: '0.65rem' }}
                    >
                      CÓMO LO HACEMOS
                    </Link>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.25)` }} />
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: METODOLOGÍA ── */}
      <section className="page-px section-py">
        <div className="max-container">

          {/* Fila superior: Metodología (67%) + cards (33%) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

            {/* Metodología — 2/3 */}
            <div className="md:col-span-2 flex flex-col gap-8">
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(4rem, 10vw, 12rem)',
                lineHeight: 0.95,
                color: BLANCO,
                fontWeight: 400,
              }}>
                Metodología
              </h2>

              <div className="flex flex-col gap-5" style={{ maxWidth: '560px' }}>
                <p className="label" style={{ color: ROSA }}>El mercado forma opinión en silencio</p>
                <p className="text-lead" style={{ color: BLANCO, opacity: 0.85 }}>
                  La autoridad técnica se construye antes de la reunión comercial. Ocurre cuando una empresa logra transformar lo que sabe en ideas, argumentos y activos que circulan durante meses. Flahoolick convierte señales internas en presencia continua para mercados B2B complejos.
                </p>
                <Link
                  href="/metodologia"
                  className="label inline-flex items-center px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: ROSA, color: CIRUELA, fontSize: '0.65rem', borderRadius: '999px' }}
                >
                  EXPLORAR METODOLOGÍA
                </Link>
              </div>
            </div>

            {/* Tarjetas JERGA — 1/3 */}
            <div className="flex flex-col gap-6">
              {tarjetasJerga.map((card, i) => (
                <Link key={i} href={card.href} className="group flex flex-col gap-3 hover:opacity-80 transition-opacity">
                  <Image
                    src={card.img}
                    alt={card.titulo}
                    width={300}
                    height={180}
                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                  />
                  <div>
                    <p className="text-sm font-medium" style={{ color: BLANCO }}>{card.titulo}</p>
                    <p className="label mt-1" style={{ color: ROSA, opacity: 0.6, fontSize: '0.6rem' }}>PUNTO DE PARTIDA</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Divisoria blanca */}
          <hr style={{ borderColor: BLANCO, borderTopWidth: '1px', opacity: 0.2, marginTop: '5rem' }} />

          {/* Tres columnas footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {footerCols.map((col, i) => (
              <div key={i} className="flex flex-col gap-3">
                {/* Shield + título en la misma línea */}
                <div className="flex items-center gap-3">
                  <ShieldIcon />
                  <p className="label font-bold" style={{ color: BLANCO }}>{col.titulo}</p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.7 }}>
                  {col.desc}
                </p>
                <Link
                  href={col.href}
                  className="label hover:opacity-80 transition-opacity"
                  style={{ color: ROSA, fontSize: '0.65rem' }}
                >
                  CONOCE MÁS &gt;
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
