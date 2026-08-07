/** Mezcla tipográfica estándar del sitio: lead bold en Bricolage + resto en Instrument Serif itálica. */
export function FontMix({ bold, italic }: { bold: React.ReactNode; italic?: React.ReactNode }) {
  return (
    <>
      <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: '1.04em', letterSpacing: '-0.03em' }}>{bold}</span>
      {italic && <span style={{ fontFamily: 'var(--font-instrument-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.04em' }}>{italic}</span>}
    </>
  )
}
