import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Flahoolick — Consultora de estrategia y contenido B2B',
  description: 'Instalamos el Sistema de Autoridad de Mercado para empresas B2B con ciclos de decisión complejos. Santiago, Chile.',
  openGraph: {
    title: 'Flahoolick',
    description: 'Instalamos el Sistema de Autoridad de Mercado para empresas B2B con ciclos de decisión complejos.',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
