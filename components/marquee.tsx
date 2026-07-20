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

interface MarqueeProps {
  invert?: boolean
}

export function Marquee({ invert = false }: MarqueeProps) {
  return (
    <div className="w-full overflow-hidden py-8" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="animate-marquee">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="mx-10 flex items-center justify-center shrink-0"
            style={{ height: '36px', width: '100px' }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={100}
              height={36}
              style={{
                objectFit: 'contain',
                filter: invert ? 'invert(0) brightness(0.4)' : 'invert(1) brightness(0.6)',
                maxHeight: '36px',
                width: 'auto',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
