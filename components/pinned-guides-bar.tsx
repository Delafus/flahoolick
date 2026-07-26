import Image from 'next/image'
import Link from 'next/link'
import { guiasFijadas } from '@/sanity/lib/jerga'

export async function PinnedGuidesBar({ bg, text }: { bg: string; text: string }) {
  const guias = await guiasFijadas()

  const pillBorder = text === '#000000' || text === 'black' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)'
  const dividerColor = text === '#000000' || text === 'black' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)'

  return (
    <div className="page-px" style={{ backgroundColor: bg, color: text, borderTop: `2px solid ${text}`, borderBottom: `1px solid ${dividerColor}`, paddingTop: '64px' }}>
      <div className="max-container flex flex-wrap items-center justify-between gap-4" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Link href="/jerga" style={{ display: 'block', width: '150px' }}>
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
    </div>
  )
}
