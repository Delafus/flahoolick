import Link from 'next/link'
import { guiasFijadas } from '@/sanity/lib/jerga'

export async function PinnedGuidesBar({ bg, text }: { bg: string; text: string }) {
  const guias = await guiasFijadas()

  const pillBg = text === '#000000' || text === 'black' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)'
  const dividerColor = text === '#000000' || text === 'black' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)'

  return (
    <div className="page-px" style={{ backgroundColor: bg, color: text, borderBottom: `1px solid ${dividerColor}`, paddingTop: '64px' }}>
      <div className="max-container flex flex-wrap items-center justify-between gap-4" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <Link href="/jerga" className="label" style={{ opacity: 0.7 }}>
          JERGA — Guías
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/jerga"
            className="label px-4 py-2 hover:opacity-70 transition-opacity"
            style={{ backgroundColor: pillBg, borderRadius: '999px' }}
          >
            Todas
          </Link>
          {guias.map(g => (
            <Link
              key={g.slug}
              href={`/jerga/${g.slug}`}
              className="label px-4 py-2 hover:opacity-70 transition-opacity"
              style={{ backgroundColor: pillBg, borderRadius: '999px' }}
            >
              {g.etiquetaBarra || g.titulo}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
