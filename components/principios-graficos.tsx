/** Mini gráficos planos para los principios de "Qué creemos" (Sobre Flahoolick), con la iconografía del sitio:
    dots = mercado (personas), cuadrados = información, triángulos = conocimiento con valor, escudo = el sistema.
    Todo en currentColor (azul noche) y el triángulo en rojo. Se mueven un poco al pasar el mouse por la tarjeta (`group`). */

const ROJO = '#FF1D00'
const LADO = 72
const ESCUDO = 'M829.183 744.25C829.183 796.313 786.978 836.374 734.916 836.374C682.853 836.374 640.648 796.313 640.648 744.25V639.767H829.183V744.25Z'

const triangulo = (x: number, y: number, t = 4) => `${x},${y - t} ${x - t * 0.95},${y + t * 0.8} ${x + t * 0.95},${y + t * 0.8}`

function Lienzo({ children }: { children: React.ReactNode }) {
  return <svg viewBox={`0 0 ${LADO} ${LADO}`} width={LADO} height={LADO} aria-hidden className="overflow-visible">{children}</svg>
}

/** 01 El valor se explica desde el cliente: el mercado en dots y uno de ellos, el cliente, destacado. */
function DesdeElCliente() {
  return (
    <Lienzo>
      {Array.from({ length: 25 }, (_, i) => {
        const x = 12 + (i % 5) * 12
        const y = 12 + Math.floor(i / 5) * 12
        return i === 12
          ? <g key={i}><circle cx={x} cy={y} r={4} fill="currentColor" /><circle cx={x} cy={y} r={7.5} fill="none" stroke="currentColor" strokeWidth={1}
              className="origin-center transition-transform duration-500 group-hover:scale-125" style={{ transformBox: 'fill-box' }} /></g>
          : <circle key={i} cx={x} cy={y} r={1.6} fill="currentColor" />
      })}
    </Lienzo>
  )
}

/** 02 La claridad alinea a la organización: cuadrados sueltos que, al pasar el mouse, se alinean en una grilla. */
function Alinea() {
  const giros = [25, -18, 40, -30, 12, -42, 33, -8, 20]
  const corrimientos = [[3, -4], [-4, 2], [2, 4], [-3, -3], [4, 1], [-2, 4], [3, 3], [-4, -2], [1, -4]]
  return (
    <Lienzo>
      {giros.map((g, i) => {
        const x = 18 + (i % 3) * 18
        const y = 18 + Math.floor(i / 3) * 18
        return (
          <rect key={i} x={x - 2.4} y={y - 2.4} width={4.8} height={4.8} fill="currentColor"
            className="transition-all duration-500 group-hover:![rotate:0deg] group-hover:![translate:0_0]"
            style={{ transformBox: 'fill-box', transformOrigin: 'center', rotate: `${g}deg`, translate: `${corrimientos[i][0]}px ${corrimientos[i][1]}px` }} />
        )
      })}
    </Lienzo>
  )
}

/** 03 La presencia se construye durante todo el ciclo: el mercado circulando alrededor del momento de compra ($). */
function Ciclo() {
  return (
    <Lienzo>
      <g className="principio-orbita" style={{ transformBox: 'view-box', transformOrigin: '36px 36px' }}>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2
          return <circle key={i} cx={36 + 26 * Math.cos(a)} cy={36 + 26 * Math.sin(a)} r={1.8} fill="currentColor" />
        })}
      </g>
      <circle cx={36} cy={36} r={9} fill="currentColor" />
      <text x={36} y={36} textAnchor="middle" dominantBaseline="central" fill="#ffffff"
        style={{ fontFamily: 'var(--font-inter)', fontSize: 11 }}>$</text>
    </Lienzo>
  )
}

/** 04 El criterio guía la tecnología: un triángulo (criterio) al frente de una grilla de cuadrados (lo que procesa la tecnología). */
function Criterio() {
  return (
    <Lienzo>
      <polygon points={triangulo(36, 14, 6)} fill={ROJO}
        className="transition-transform duration-500 group-hover:-translate-y-1" />
      {Array.from({ length: 12 }, (_, i) => {
        const x = 18 + (i % 4) * 12
        const y = 34 + Math.floor(i / 4) * 12
        return <rect key={i} x={x - 2.2} y={y - 2.2} width={4.4} height={4.4} fill="currentColor" />
      })}
    </Lienzo>
  )
}

/** 05 El trabajo queda instalado: el escudo con piezas a su alrededor, que giran despacio al pasar el mouse. */
function Instalado() {
  return (
    <Lienzo>
      <g className="principio-orbita" style={{ transformBox: 'view-box', transformOrigin: '36px 36px' }}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2
          const x = 36 + 27 * Math.cos(a)
          const y = 36 + 27 * Math.sin(a)
          return i % 2 === 0
            ? <polygon key={i} points={triangulo(x, y, 3)} fill={ROJO} />
            : <rect key={i} x={x - 2.2} y={y - 2.2} width={4.4} height={4.4} fill="currentColor" />
        })}
      </g>
      <path d={ESCUDO} fill="currentColor" transform="translate(36 36) scale(0.1) translate(-734.9 -738)" />
    </Lienzo>
  )
}

export const GRAFICOS_PRINCIPIOS = [DesdeElCliente, Alinea, Ciclo, Criterio, Instalado]
