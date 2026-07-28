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
      />
    </div>
  )
}
