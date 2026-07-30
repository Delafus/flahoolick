'use client'

import { AcordeonSeccion } from './acordeon-seccion'
import { GrillaProceso } from './grilla-proceso'
import { SERVICIOS } from './servicios-datos'

const NEGRO = '#000000'

// Mismo origen de datos que /servicios y su megamenú, para que el visitante
// lea lo mismo venga de donde venga.
const etapas = SERVICIOS.map(s => ({
  titulo: `${s.numero}. ${s.nombre.toUpperCase()}`,
  desc: s.tarjeta.paraQuien,
  href: `/servicios#${s.id}`,
}))

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
        renderIllustration={abierto => <GrillaProceso abierto={abierto} />}
      />
    </div>
  )
}
