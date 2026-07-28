'use client'

import { AcordeonSeccion } from './acordeon-seccion'
import { GrillaProceso } from './grilla-proceso'

const NEGRO = '#000000'

// Las descripciones son las mismas que usa el megamenú de Servicios, para
// que el visitante lea lo mismo venga de donde venga.
const etapas = [
  {
    titulo: '01. DIAGNÓSTICO DE AUTORIDAD',
    desc: 'Identificamos qué sabe tu empresa, qué necesita comprender el mercado y dónde puede construir autoridad.',
    href: '/servicios#diagnostico',
  },
  {
    titulo: '02. INSTALACIÓN DEL SISTEMA',
    desc: 'Diseñamos el relato, el playbook y los flujos que convierten conocimiento en una operación editorial.',
    href: '/servicios#instalacion',
  },
  {
    titulo: '03. OPERACIÓN EDITORIAL',
    desc: 'Capturamos señales, producimos activos y mantenemos el sistema activo durante todo el ciclo comercial.',
    href: '/servicios#operacion',
  },
]

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
        titulo="Instalamos el sistema que pone tu conocimiento en circulación."
        bajada="Trabajamos en tres etapas conectadas. Diagnosticamos el conocimiento disponible, instalamos el sistema editorial y mantenemos su operación en el tiempo."
        items={etapas}
        ctaLabel="VER MÁS"
        cta={{ label: 'EXPLORAR SERVICIOS ›', href: '/servicios' }}
        renderIllustration={abierto => <GrillaProceso abierto={abierto} />}
      />
    </div>
  )
}
