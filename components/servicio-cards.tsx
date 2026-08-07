interface ServicioCardsProps {
  items: { numero?: string; titulo: string; desc: string }[]
  /** Color del punto y del texto del eyebrow. */
  color?: string
}

/** Grid de cards blancas — reemplaza a los timelines/listas con borde para contenido tipo "qué construimos". */
export function ServicioCards({ items, color = '#000000' }: ServicioCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div key={item.titulo} className="flex flex-col gap-4 p-8"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)',
          }}>
          <div className="flex items-center gap-2">
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
            <span className="label" style={{ color, opacity: 0.6 }}>PASO {item.numero ?? String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="text-xl font-semibold" style={{ color: '#000000' }}>{item.titulo}</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#000000', opacity: 0.6 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
