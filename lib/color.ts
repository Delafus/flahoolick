export function esClaro(hex: string): boolean {
  const limpio = hex.replace('#', '')
  const completo = limpio.length === 3
    ? limpio.split('').map(c => c + c).join('')
    : limpio
  const r = parseInt(completo.slice(0, 2), 16)
  const g = parseInt(completo.slice(2, 4), 16)
  const b = parseInt(completo.slice(4, 6), 16)
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminancia > 0.6
}
