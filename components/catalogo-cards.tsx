interface CatalogoCardsProps {
  items: { titulo: string; desc: string }[]
  cols?: 2 | 3 | 4
}

/** Patrón "catálogo": grilla uniforme sin numerar, mismo peso visual para cada ítem. Card blanca flotante, siempre con texto oscuro, independiente del fondo de la sección. */
export function CatalogoCards({ items, cols = 3 }: CatalogoCardsProps) {
  const colClass = cols === 2 ? 'md:grid-cols-2' : cols === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
  return (
    <div className={`grid grid-cols-1 ${colClass} gap-6`}>
      {items.map(item => (
        <div key={item.titulo} className="flex flex-col gap-2 p-8"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
          }}>
          <h3 className="text-lg font-semibold" style={{ color: '#000000' }}>{item.titulo}</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#000000', opacity: 0.6 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
