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
  metadataBase: new URL('https://www.flahoolick.com'),
  title: 'Flahoolick | Contenido B2B que convierte conocimiento en ventas',
  description: 'Convertimos el conocimiento de tu empresa en contenido y herramientas de venta para mercados B2B con ciclos largos. Santiago, Chile.',
  openGraph: {
    title: 'Flahoolick',
    description: 'Convertimos el conocimiento de tu empresa en contenido y herramientas de venta para mercados B2B con ciclos largos.',
    url: 'https://www.flahoolick.com',
    siteName: 'Flahoolick',
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
