const logos = [
  { src: '/logo-grey.svg',    alt: 'Grey' },
  { src: '/logo-mccann.svg',  alt: 'McCann' },
  { src: '/logo-bbdo.svg',    alt: 'BBDO' },
  { src: '/logo-heineken.svg',alt: 'Heineken' },
  { src: '/logo-adidas.svg',  alt: 'Adidas' },
  { src: '/logo-claro.svg',   alt: 'Claro Empresas' },
  { src: '/logo-unab.svg',    alt: 'UNAB' },
  { src: '/logo-cajas.svg',   alt: 'Cajas de Chile' },
  { src: '/logo-df.svg',      alt: 'Diario Financiero' },
  { src: '/logo-lider.svg',   alt: 'Lider' },
  { src: '/logo-pg.svg',      alt: 'P&G' },
  { src: '/logo-dunamis.svg', alt: 'Dunamis' },
]

export function Marquee({ color = '#3B0B2C' }: { color?: string }) {
  const filter = color === '#3B0B2C'
    ? 'brightness(0) saturate(100%) invert(8%) sepia(40%) saturate(2000%) hue-rotate(280deg) brightness(40%)'
    : 'brightness(0) invert(1)'

  return (
    <div style={{ width: '100%', overflow: 'hidden', padding: '1.5rem 0' }}>
      <div className="animate-marquee" style={{ alignItems: 'center' }}>
        {[...logos, ...logos].map((logo, i) => (
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
                height: '56px',
                width: 'auto',
                maxWidth: '160px',
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
