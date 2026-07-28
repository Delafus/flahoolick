'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Etapa {
  id: string
  numero: string
  nombre: string
  titular: string
  desc: string
  entregables: string[]
  acordeon: { titulo: string; contenido: string }
  destacado: { titulo: string; desc: string }
  /** Solo Operación Editorial: formatos que produce, como tags. */
  formatos?: string[]
}

const ETAPAS: Etapa[] = [
  {
    id: 'diagnostico',
    numero: '01',
    nombre: 'Diagnóstico de Autoridad',
    titular: 'Encontramos el conocimiento que merece llegar al mercado.',
    desc: 'Analizamos el conocimiento disponible, las audiencias y las señales del mercado para identificar dónde puede construir autoridad la empresa.',
    entregables: [
      'Mapa de conocimiento.',
      'Mapa de audiencias y preguntas críticas.',
      'Territorios de autoridad.',
      'Hoja de ruta editorial priorizada.',
    ],
    acordeon: {
      titulo: 'Cómo realizamos el diagnóstico',
      contenido: 'Revisamos documentos, contenidos, propuestas y conversaciones comerciales. Entrevistamos a expertos internos. Analizamos preguntas, objeciones y señales del mercado. Jerarquizamos los hallazgos según su valor estratégico.',
    },
    destacado: {
      titulo: 'Mapa de Autoridad de Mercado',
      desc: 'Define qué conocimiento debe poner en circulación la empresa, para quién, con qué propósito y en qué orden.',
    },
  },
  {
    id: 'instalacion',
    numero: '02',
    nombre: 'Instalación del Sistema',
    titular: 'Convertimos la estrategia en una forma concreta de operar.',
    desc: 'Diseñamos el relato, los flujos y las reglas que permiten transformar conocimiento en una operación editorial continua.',
    entregables: [
      'Narrativa y arquitectura de mensajes.',
      'Territorios y series editoriales.',
      'Playbook de contenido.',
      'Flujos, gobernanza y marco de medición.',
    ],
    acordeon: {
      titulo: 'Qué instalamos',
      contenido: 'Definimos las audiencias, los principios editoriales, el sistema de captura, los formatos y los canales. Organizamos los roles, las aprobaciones, la cadencia y los indicadores que sostienen la operación.',
    },
    destacado: {
      titulo: 'Sistema Operativo de Contenido',
      desc: 'Un playbook aplicado para capturar, producir, distribuir y medir contenido con una lógica compartida.',
    },
  },
  {
    id: 'operacion',
    numero: '03',
    nombre: 'Operación Editorial',
    titular: 'Mantenemos el conocimiento en circulación.',
    desc: 'Operamos el sistema junto al equipo del cliente y transformamos conocimiento, señales y prioridades comerciales en activos útiles para el mercado.',
    entregables: [
      'Dirección editorial continua.',
      'Plan de trabajo y mesa editorial.',
      'Producción mensual de contenidos.',
      'Medición y recalibración del sistema.',
    ],
    acordeon: {
      titulo: 'Cómo operamos',
      contenido: 'Capturamos conocimiento con los expertos internos. Priorizamos temas y oportunidades. Investigamos, redactamos, editamos y producimos los activos. Revisamos su desempeño y actualizamos la agenda editorial.',
    },
    destacado: {
      titulo: 'Operación Editorial Activa',
      desc: 'Una capacidad continua para transformar conocimiento interno en presencia de mercado, autoridad y herramientas comerciales.',
    },
    formatos: [
      'Artículos', 'Guías', 'Reportes', 'Casos', 'LinkedIn', 'Newsletters',
      'Decks', 'One-pagers', 'Battlecards', 'Playbooks', 'Campañas B2B', 'Contenido para IA',
    ],
  },
]

export function ServiciosEtapas() {
  // El acordeón abierto se rastrea por id, para que cada etapa abra el suyo
  // sin cerrar los demás.
  const [abiertos, setAbiertos] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setAbiertos(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div>
      {/* Navegación interna — se pega bajo el header mientras se recorren las
          tres etapas y desaparece al salir de ellas. */}
      <div
        className="page-px"
        style={{
          position: 'sticky',
          top: '64px',
          zIndex: 30,
          backgroundColor: 'var(--section-body-bg)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <nav className="max-container flex items-center gap-6 md:gap-10 py-4 overflow-x-auto">
          {ETAPAS.map(e => (
            <a key={e.id} href={`#${e.id}`}
              className="label whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity"
              style={{ fontSize: '0.65rem' }}>
              {e.numero} · {e.nombre}
            </a>
          ))}
        </nav>
      </div>

      {ETAPAS.map((etapa, i) => (
        <section
          key={etapa.id}
          id={etapa.id}
          className="page-px section-py"
          style={{
            scrollMarginTop: '120px',
            borderTop: i > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none',
          }}
        >
          <div className="max-container grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

            {/* Izquierda — número, nombre, titular y descripción */}
            <div className="md:col-span-7 flex flex-col gap-6">
              <p className="label opacity-40">{etapa.numero} — {etapa.nombre}</p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>
                {etapa.titular}
              </h2>
              <p className="text-lead opacity-70" style={{ maxWidth: '34rem' }}>{etapa.desc}</p>

              {/* Acordeón con el detalle del proceso */}
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)', marginTop: '1rem' }}>
                <button
                  onClick={() => toggle(etapa.id)}
                  className="w-full flex items-center justify-between py-5 text-left"
                  style={{ cursor: 'pointer' }}
                >
                  <span className="label font-bold">{etapa.acordeon.titulo}</span>
                  <span style={{
                    fontSize: '1.2rem',
                    lineHeight: 1,
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                    transform: abiertos[etapa.id] ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: abiertos[etapa.id] ? '400px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.35s ease, opacity 0.3s ease',
                  opacity: abiertos[etapa.id] ? 1 : 0,
                }}>
                  <p className="text-sm leading-relaxed opacity-70 pb-6" style={{ maxWidth: '34rem' }}>
                    {etapa.acordeon.contenido}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.15)' }} />
              </div>

              <Link
                href={`/servicios?servicio=${etapa.id}#contacto`}
                className="label opacity-50 hover:opacity-100 transition-opacity w-fit"
                style={{ fontSize: '0.65rem' }}
              >
                Consultar por este servicio →
              </Link>
            </div>

            {/* Derecha — entregables y entregable principal */}
            <div className="md:col-span-5 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <p className="label opacity-40">Qué entregamos</p>
                <ul className="flex flex-col">
                  {etapa.entregables.map(item => (
                    <li key={item} className="text-base py-3"
                      style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Entregable principal destacado */}
              <div className="flex flex-col gap-3 p-8"
                style={{ backgroundColor: 'var(--section-dark-bg)', color: 'var(--section-dark-text)' }}>
                <p className="label opacity-50" style={{ fontSize: '0.6rem' }}>Entregable principal</p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                  lineHeight: 1.15,
                }}>
                  {etapa.destacado.titulo}
                </p>
                <p className="text-sm leading-relaxed opacity-70">{etapa.destacado.desc}</p>
              </div>

              {etapa.formatos && (
                <div className="flex flex-col gap-4">
                  <p className="label opacity-40">Formatos</p>
                  <div className="flex flex-wrap gap-2">
                    {etapa.formatos.map(f => (
                      <span key={f} className="text-sm px-3 py-1.5"
                        style={{ border: '1px solid rgba(0,0,0,0.2)', opacity: 0.75 }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
