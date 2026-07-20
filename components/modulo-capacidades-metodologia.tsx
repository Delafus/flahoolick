'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CIRUELA = '#3B0B2C'
const ROSA = '#F09DB6'

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
  {
    img: '/card-95-5.svg',
    titulo: 'El 95% que no está comprando',
    label: 'PUNTO DE PARTIDA',
    href: '/jerga',
  },
  {
    img: '/card-idea-que-viaja.svg',
    titulo: 'Cómo viaja una idea',
    label: 'PUNTO DE PARTIDA',
    href: '/jerga',
  },
]

export function ModuloCapacidadesMetodologia() {
  const [abierto, setAbierto] = useState(0)

  return (
    <div style={{ backgroundColor: CIRUELA, color: ROSA }}>

      {/* ── SECCIÓN 1: CAPACIDADES ── */}
      <section className="page-px section-py">
        <div className="max-container flex flex-col gap-12">

          {/* Label + Titular */}
          <div className="flex flex-col gap-4">
            <p className="label" style={{ color: ROSA, opacity: 0.6 }}>En qué nos especializamos</p>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              lineHeight: 1.1,
              color: ROSA,
              fontWeight: 400,
            }}>
              Tu conocimiento ya existe,<br />pongámoslo en circulación
            </h2>
          </div>

          {/* Grid: ilustración + acordeón */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Ilustración */}
            <div>
              <Image
                src="/papeles-flahoolick.svg"
                alt="Flahoolick — conocimiento en circulación"
                width={500}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            {/* Acordeón */}
            <div className="flex flex-col">
              {acordeonItems.map((item, i) => (
                <div
                  key={i}
                  style={{ borderTop: `1px solid ${ROSA}`, opacity: 1 }}
                >
                  <button
                    onClick={() => setAbierto(abierto === i ? -1 : i)}
                    className="w-full flex items-center justify-between py-5 text-left"
                    style={{ color: ROSA }}
                  >
                    <span className="label font-bold" style={{ color: ROSA }}>{item.titulo}</span>
                    <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>
                      {abierto === i ? '−' : '+'}
                    </span>
                  </button>
                  {abierto === i && (
                    <div className="pb-6 flex flex-col gap-4">
                      <p className="text-sm leading-relaxed" style={{ color: ROSA, opacity: 0.8 }}>
                        {item.desc}
                      </p>
                      <Link
                        href={item.href}
                        className="label inline-flex items-center px-4 py-2.5 w-fit hover:opacity-70 transition-opacity"
                        style={{ border: `1px solid ${ROSA}`, color: ROSA, fontSize: '0.65rem' }}
                      >
                        CÓMO LO HACEMOS
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              {/* Línea final del acordeón */}
              <div style={{ borderTop: `1px solid ${ROSA}` }} />
            </div>
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
        <div className="max-container grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Izquierda */}
          <div className="flex flex-col gap-8">
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 6vw, 7rem)',
              lineHeight: 1.0,
              color: ROSA,
              fontWeight: 400,
            }}>
              Metodología
            </h2>
            <div className="flex flex-col gap-4">
              <p className="label" style={{ color: ROSA, opacity: 0.5 }}>El mercado forma opinión en silencio</p>
              <p className="text-lead" style={{ color: ROSA, opacity: 0.8 }}>
                La autoridad técnica se construye antes de la reunión comercial. Ocurre cuando una empresa logra transformar lo que sabe en ideas, argumentos y activos que circulan durante meses. Flahoolick convierte señales internas en presencia continua para mercados B2B complejos.
              </p>
            </div>
            <Link
              href="/metodologia"
              className="label inline-flex items-center px-6 py-3.5 w-fit hover:opacity-70 transition-opacity"
              style={{ border: `1px solid ${ROSA}`, color: ROSA, fontSize: '0.65rem' }}
            >
              EXPLORAR METODOLOGÍA
            </Link>
          </div>

          {/* Derecha — tarjetas JERGA */}
          <div className="flex flex-col gap-6">
            {tarjetasJerga.map((card, i) => (
              <Link key={i} href={card.href} className="group flex flex-col gap-3 hover:opacity-80 transition-opacity">
                <div className="overflow-hidden" style={{ borderRadius: '4px' }}>
                  <Image
                    src={card.img}
                    alt={card.titulo}
                    width={400}
                    height={220}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium" style={{ color: ROSA }}>{card.titulo}</p>
                  <p className="label" style={{ color: ROSA, opacity: 0.5 }}>{card.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divisoria */}
      <div className="page-px">
        <div className="max-container">
          <hr style={{ borderColor: ROSA, borderTopWidth: '1px', opacity: 0.3 }} />
        </div>
      </div>

      {/* ── FOOTER DE 3 COLUMNAS ── */}
      <section className="page-px section-py">
        <div className="max-container grid grid-cols-1 md:grid-cols-3 gap-12">
          {footerCols.map((col, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Ícono escudo */}
              <Image
                src="/logo-flahoolick-shield.svg"
                alt="Flahoolick"
                width={24}
                height={28}
                style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(500%) hue-rotate(300deg)', height: '24px', width: 'auto' }}
              />
              <p className="label font-bold" style={{ color: ROSA }}>{col.titulo}</p>
              <p className="text-sm leading-relaxed" style={{ color: ROSA, opacity: 0.7 }}>
                {col.desc}
              </p>
              <Link
                href={col.href}
                className="label hover:opacity-60 transition-opacity"
                style={{ color: ROSA, opacity: 0.5, fontSize: '0.65rem' }}
              >
                CONOCE MÁS &gt;
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
