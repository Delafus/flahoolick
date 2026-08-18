export type JergaThemeName = 'rosa'

export interface JergaTheme {
  name: JergaThemeName
  className: string
  light: string
  dark: string
}

const THEMES: Record<JergaThemeName, JergaTheme> = {
  rosa: {
    name: 'rosa',
    className: 'tema-rosa',
    light: '#EF9DB6',
    dark: '#000000',
  },
}

export function getJergaTheme(value?: string): JergaTheme {
  if (value && value in THEMES) return THEMES[value as JergaThemeName]
  return THEMES.rosa
}
