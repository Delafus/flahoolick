import Image from 'next/image'
import Link from 'next/link'
import { guiasFijadas } from '@/sanity/lib/jerga'

export async function PinnedGuidesBar({ bg, text }: { bg: string; text: string }) {
  const guias = await guiasFijadas()

  const pillBorder = text === '#000000' || text === 'black' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)'
  const dividerColor = text === '#000000' || text === 'black' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)'

  const barInner = (
    <div className="max-container flex flex-wrap items-center justify-between gap-4" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      <Link href="/jerga" style={{ display: 'block', width: '230px' }}>
        <Image
          src="/logo-jerga-horizontal.svg"
          alt="JERGA"
          width={167}
          height={29}
          style={{ width: '100%', height: 'auto', filter: text === '#000000' || text === 'black' ? 'none' : 'invert(1)' }}
        />
      </Link>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/jerga"
          className="label px-4 py-2 hover:opacity-70 transition-opacity"
          style={{ border: `1px solid ${pillBorder}`, borderRadius: '999px' }}
        >
          Todas
        </Link>
        {guias.map(g => (
          <Link
            key={g.slug}
            href={`/jerga/${g.slug}`}
            className="label px-4 py-2 hover:opacity-70 transition-opacity"
            style={{ border: `1px solid ${pillBorder}`, borderRadius: '999px' }}
          >
            {g.etiquetaBarra || g.titulo}
          </Link>
        ))}
      </div>
    </div>
  )

  const barStyle = { backgroundColor: bg, color: text, borderTop: '3px solid #000000', borderBottom: `1px solid ${dividerColor}` }

  return (
    <>
      {/* Clon invisible: reserva el espacio en el flujo del documento mientras la barra real queda fixed. */}
      <div className="page-px" aria-hidden="true" style={{ ...barStyle, visibility: 'hidden', pointerEvents: 'none', marginTop: '64px' }}>
        {barInner}
      </div>
      <div className="page-px" style={{ ...barStyle, position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 40 }}>
        {barInner}
      </div>
    </>
  )
}
