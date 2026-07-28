'use client'

import { AcordeonSeccion } from './acordeon-seccion'

const NEGRO = '#000000'

const etapas = [
  {
    titulo: '01. DIAGNÓSTICO DE AUTORIDAD',
    desc: 'Identificamos qué sabe la empresa, qué necesita comprender el mercado y dónde existen oportunidades de autoridad.',
    href: '/servicios#diagnostico',
  },
  {
    titulo: '02. INSTALACIÓN DEL SISTEMA',
    desc: 'Definimos el relato, los territorios, el playbook, los flujos y la gobernanza editorial.',
    href: '/servicios#instalacion',
  },
  {
    titulo: '03. OPERACIÓN EDITORIAL',
    desc: 'Capturamos señales, producimos activos y recalibramos el sistema según la respuesta del mercado.',
    href: '/servicios#operacion',
  },
]

/**
 * Placeholder de la columna izquierda. Reacciona al acordeón para dejar
 * probado el enganche donde después va la animación de cada etapa.
 */
function PlaceholderEtapa({ abierto }: { abierto: number }) {
  const etapa = etapas[abierto]

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        border: '1px solid rgba(255,255,255,0.18)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          lineHeight: 1,
          color: '#ffffff',
          opacity: 0.9,
          transition: 'opacity 0.3s ease',
        }}
      >
        {etapa ? etapa.titulo.slice(0, 2) : '—'}
      </span>
      <span className="label" style={{ color: '#ffffff', opacity: 0.3, fontSize: '0.6rem' }}>
        Ilustración
      </span>
    </div>
  )
}

/**
 * Módulo de servicios en la home. Va justo después de la presentación
 * "Somos FLAHOOLICK" para que el visitante entienda qué se contrata antes
 * de explorar las capacidades que lo componen.
 */
export function ModuloComoTrabajamos() {
  return (
    <div style={{ backgroundColor: NEGRO }}>
      <AcordeonSeccion
        eyebrow="Cómo trabajamos"
        titulo="Instalamos y operamos el sistema que pone tu conocimiento en circulación."
        bajada="Trabajamos en tres etapas conectadas. Diagnosticamos el conocimiento disponible, instalamos el sistema editorial y mantenemos su operación en el tiempo."
        items={etapas}
        ctaLabel="VER MÁS"
        renderIllustration={abierto => <PlaceholderEtapa abierto={abierto} />}
      />
    </div>
  )
}
