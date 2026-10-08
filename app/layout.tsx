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
  title: 'Flahoolick | Estrategia y contenido para empresas B2B',
  description: 'Convertimos conocimiento empresarial en presencia de marca y capacidad comercial para compañías B2B con decisiones complejas.',
  openGraph: {
    title: 'Flahoolick',
    description: 'Convertimos conocimiento empresarial en presencia de marca y capacidad comercial para compañías B2B con decisiones complejas.',
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
