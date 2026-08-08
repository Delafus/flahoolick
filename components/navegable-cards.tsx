import Link from 'next/link'

interface NavegableItem {
  label: string
  titulo: string
  desc: string
  href: string
  ctaLabel?: string
}

/** Patrón "navegable": la card ES el link — label + título + desc + CTA, hover evidente en toda la superficie. */
export function NavegableCards({ items, cols = 3 }: { items: NavegableItem[]; cols?: 2 | 3 }) {
  const colClass = cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6`}>
      {items.map(item => {
        const external = item.href.startsWith('http')
        return (
          <Link key={item.href} href={item.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="group flex flex-col gap-2 p-8 hover:opacity-80 transition-opacity"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
            }}>
            <p className="label" style={{ color: '#000000', opacity: 0.4 }}>{item.label}</p>
            <h3 className="text-lg font-semibold" style={{ color: '#000000' }}>{item.titulo}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#000000', opacity: 0.6 }}>{item.desc}</p>
            <span className="label" style={{ color: '#000000', opacity: 0.4 }}>{item.ctaLabel ?? 'Ver →'}</span>
          </Link>
        )
      })}
    </div>
  )
}
