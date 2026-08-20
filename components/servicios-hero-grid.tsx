export function ServiciosHeroGrid() {
  return (
    <div aria-hidden="true" style={{ height: '100%', position: 'relative', width: '100%' }}>
      <div
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.32) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.32) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          height: '190%',
          left: '50%',
          maskImage: 'radial-gradient(ellipse at center, #000 24%, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 24%, transparent 76%)',
          pointerEvents: 'none',
          position: 'absolute',
          top: '50%',
          transform: 'translate(-50%, -45%) perspective(700px) rotateX(68deg)',
          transformOrigin: 'center',
          width: '190%',
        }}
      />
    </div>
  )
}
