export interface TocItem {
  id: string
  texto: string
}

export function extraerToc(cuerpo: any[]): TocItem[] {
  return cuerpo
    .filter(b => b._type === 'block' && b.style === 'h2')
    .map(b => ({
      id: b._key,
      texto: (b.children ?? []).map((c: any) => c.text).join(''),
    }))
    .filter(item => item.texto.trim().length > 0)
}
