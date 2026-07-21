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
    <Image src="/shield.svg" alt="" width={18} height={22}
      style={{
        filter: 'brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(300deg) brightness(1.1)',
        height: '22px', width: 'auto', flexShrink: 0,
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
          <p className="label" style={{ color: ROSA }}>En qué nos especializamos</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 7vw, 9rem)',
            lineHeight: 1.05,
            color: BLANCO,
            fontWeight: 400,
            textAlign: 'center',
          }}>
            Tu conocimiento ya existe,<br />pongámoslo en circulación.
          </h2>
        </div>

        <div style={{ height: '200px' }} />

        {/* Dos columnas iguales */}
        <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Ilustración */}
          <div>
            {/* Placeholder ilustración */}
            <div style={{
              aspectRatio: '5/4',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}>
              <span className="label" style={{ color: 'rgba(255,255,255,0.2)' }}>Ilustración</span>
            </div>
          </div>

          {/* Acordeón con animación */}
          <div className="flex flex-col">
            {acordeonItems.map((item, i) => (
              <div key={i} style={{ borderTop: `1px solid rgba(255,255,255,0.25)` }}>
                <button
                  onClick={() => setAbierto(abierto === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="label font-bold" style={{ color: BLANCO }}>{item.titulo}</span>
                  <span style={{
                    color: BLANCO,
                    fontSize: '1.2rem',
                    lineHeight: 1,
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                    transform: abierto === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>
                {/* Animación con max-height */}
                <div style={{
                  maxHeight: abierto === i ? '300px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease, opacity 0.3s ease',
                  opacity: abierto === i ? 1 : 0,
                }}>
                  <div className="pb-6 flex flex-col gap-4">
                    <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.8 }}>{item.desc}</p>
                    <Link href={item.href}
                      className="label inline-flex items-center px-4 py-2.5 w-fit hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: ROSA, color: CIRUELA, fontSize: '0.65rem' }}>
                      CÓMO LO HACEMOS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.25)` }} />
          </div>
        </div>
      </section>

      {/* Divisoria */}
      <div className="page-px">
        <div className="max-container">
          <hr style={{ borderColor: ROSA, borderTopWidth: '1px', opacity: 0.3 }} />
        </div>
      </div>

      {/* ── SECCIÓN 2: METODOLOGÍA ── */}
      <section className="page-px section-py">
        <div className="max-container">

          {/* Grid 12 col: texto 70% + cards 30% */}
          <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: '3rem', alignItems: 'start' }}>

            {/* Columna izquierda — texto */}
            <div className="flex flex-col gap-8">
              <h2 style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(5rem, 10vw, 12rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: BLANCO,
                fontWeight: 400,
              }}>
                Metodología
              </h2>

              <div className="flex flex-col gap-5" style={{ maxWidth: '560px' }}>
                <p className="label" style={{ color: ROSA }}>El mercado forma opinión en silencio</p>
                <p style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', lineHeight: 1.6, color: BLANCO, opacity: 0.85, fontWeight: 300 }}>
                  La autoridad técnica se construye antes de la reunión comercial. Ocurre cuando una empresa logra transformar lo que sabe en ideas, argumentos y activos que circulan durante meses. Flahoolick convierte señales internas en presencia continua para mercados B2B complejos.
                </p>
                <Link href="/metodologia"
                  className="label inline-flex items-center gap-2 px-6 py-3.5 w-fit hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: ROSA, color: CIRUELA, fontSize: '0.65rem', borderRadius: '999px' }}>
                  EXPLORAR METODOLOGÍA ›
                </Link>
              </div>
            </div>

            {/* Columna derecha — cards (con línea divisoria izquierda) */}
            <div className="flex flex-col gap-0" style={{ borderLeft: `1px solid rgba(255,255,255,0.2)`, paddingLeft: '2rem' }}>
              {tarjetasJerga.map((card, i) => (
                <div key={i}>
                  <Link href={card.href} className="group flex flex-col gap-3 py-6 hover:opacity-80 transition-opacity">
                    {/* Orden: Imagen → Título → Eyebrow */}
                    <Image src={card.img} alt={card.titulo}
                      width={300} height={180}
                      style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                    <p className="text-sm font-semibold" style={{ color: BLANCO }}>{card.titulo}</p>
                    <p className="label" style={{ color: ROSA, opacity: 0.6, fontSize: '0.6rem' }}>PUNTO DE PARTIDA</p>
                  </Link>
                  {i === 0 && (
                    <hr style={{ borderColor: 'rgba(255,255,255,0.15)', borderTopWidth: '1px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Divisoria blanca */}
          <hr style={{ borderColor: BLANCO, borderTopWidth: '1px', opacity: 0.2, marginTop: '5rem' }} />

          {/* Tres columnas footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {footerCols.map((col, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <ShieldIcon />
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, color: BLANCO, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {col.titulo}
                  </p>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: BLANCO, opacity: 0.7 }}>{col.desc}</p>
                <Link href={col.href}
                  className="label inline-flex items-center gap-1 px-5 py-2.5 w-fit hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: ROSA, color: CIRUELA, fontSize: '0.65rem', borderRadius: '999px' }}>
                  CONOCE MÁS ›
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
