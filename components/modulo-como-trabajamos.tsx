'use client'

import { AcordeonSeccion } from './acordeon-seccion'
import { GrillaProceso } from './grilla-proceso'
import { DISCIPLINAS } from './servicios-datos'

const GRIS = '#D8D8D7'

// Mismo origen de datos que la sección "Qué hacemos" de /servicios, para que
// el visitante lea lo mismo venga de donde venga.
const disciplinas = DISCIPLINAS.map(d => ({
  titulo: d.nombre.toUpperCase(),
  desc: d.desc,
  href: d.href,
}))

/**
 * Módulo de servicios en la home. Va justo después de la presentación
 * "Somos FLAHOOLICK" para que el visitante entienda en qué se especializa
 * Flahoolick antes de explorar el servicio completo.
 */
export function ModuloComoTrabajamos() {
  return (
    <div style={{ backgroundColor: GRIS }}>
      <AcordeonSeccion
        eyebrow="En qué nos especializamos"
        titulo={<>
          <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: '1.04em', letterSpacing: '-0.03em' }}>Donde el contenido trabaja</span>
          <span style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.04em' }}> para el negocio</span>
        </>}
        bajada="Cuatro disciplinas trabajan juntas durante el diagnóstico, la instalación y la operación."
        items={disciplinas}
        ctaLabel="VER MÁS"
        renderIllustration={abierto => <GrillaProceso abierto={abierto} color="#000000" />}
        dark={false}
        bgColor={GRIS}
      />
    </div>
  )
}
