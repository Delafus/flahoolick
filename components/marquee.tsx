/** `escala` achica un logo que se ve más grande que el resto (1 = tamaño normal). */
export const logos: { src: string; alt: string; escala?: number }[] = [
  { src: '/logo-grey.svg',    alt: 'Grey', escala: 0.8 },
  { src: '/logo-mccann.svg',  alt: 'McCann', escala: 0.8 },
  { src: '/logo-bbdo.svg',    alt: 'BBDO', escala: 0.8 },
  { src: '/logo-heineken.svg',alt: 'Heineken' },
  { src: '/logo-adidas.svg',  alt: 'Adidas' },
  { src: '/logo-coca-cola.svg', alt: 'Coca-Cola' },
  { src: '/logo-claro.svg',   alt: 'Claro Empresas' },
  { src: '/logo-vtr.png',     alt: 'VTR' },
  { src: '/logo-unab.svg',    alt: 'UNAB' },
  { src: '/logo-cajas.svg',   alt: 'Cajas de Chile' },
  { src: '/logo-df.svg',      alt: 'Diario Financiero' },
  { src: '/logo-consorcio.svg', alt: 'Consorcio' },
  { src: '/logo-crediautos.png', alt: 'Crediautos' },
  { src: '/logo-lider.svg',   alt: 'Líder' },
  { src: '/logo-walmart.png', alt: 'Walmart' },
  { src: '/logo-oxxo.png',    alt: 'OXXO', escala: 0.8 },
  { src: '/logo-pg.svg',      alt: 'P&G', escala: 0.8 },
  { src: '/logo-pantene.png', alt: 'Pantene' },
  { src: '/logo-febreze.png', alt: 'Febreze' },
  { src: '/logo-dunamis.svg', alt: 'Dunamis' },
]

export function Marquee({ color = '#3B0B2C', excluir = [] }: { color?: string; /** Logos (por alt) que no se muestran. */ excluir?: string[] }) {
  const visibles = logos.filter(l => !excluir.includes(l.alt))
  const filter = color === '#3B0B2C'
    ? 'brightness(0) saturate(100%) invert(8%) sepia(40%) saturate(2000%) hue-rotate(280deg) brightness(40%)'
    : color === '#083EA7'
    // Calibrado con canvas ctx.filter contra el RGB real (8,62,167): da (0,66,160), diferencia imperceptible.
    ? 'brightness(0) saturate(100%) invert(15%) sepia(90%) saturate(3000%) hue-rotate(210deg) brightness(90%)'
    : color === '#000000'
    ? 'brightness(0) saturate(100%)'
    : 'brightness(0) invert(1)'

  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '0.875rem 0' }}>
      <div className="animate-marquee" style={{ alignItems: 'center' }}>
        {[...visibles, ...visibles].map((logo, i) => (
          <div
            key={i}
            style={{
              marginLeft: '3rem',
              marginRight: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '56px',
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.alt}
              style={{
                height: `${56 * (logo.escala ?? 1)}px`,
                width: 'auto',
                maxWidth: `${160 * (logo.escala ?? 1)}px`,
                objectFit: 'contain',
                display: 'block',
                filter,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
