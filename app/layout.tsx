import type { Metadata } from 'next'
import { Inter, Instrument_Serif, Bricolage_Grotesque } from 'next/font/google'
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
  variable: '--font-instrument-serif',
  display: 'swap',
})

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Flahoolick — Partner de estrategia y contenido B2B',
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
    <html lang="es" className={`${inter.variable} ${instrumentSerif.variable} ${bricolageGrotesque.variable}`}>
      <body>{children}</body>
    </html>
  )
}
