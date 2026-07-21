import Image from 'next/image'

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
    <div className="w-full overflow-hidden py-6">
      <div className="animate-marquee items-center">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="mx-10 flex items-center justify-center shrink-0"
            style={{ height: '40px', width: '120px' }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain',
                filter,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
