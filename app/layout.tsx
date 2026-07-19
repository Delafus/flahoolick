import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { PageColorProvider } from '@/context/page-color'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Flahoolick — Consultora de estrategia y contenido B2B',
  description: 'Instalamos el Sistema de Autoridad de Mercado para empresas B2B con ciclos de decisión complejos. Santiago, Chile.',
  keywords: 'estrategia de contenido, B2B, marketing, autoridad de mercado, Santiago, Chile',
  openGraph: {
    title: 'Flahoolick',
    description: 'Instalamos el Sistema de Autoridad de Mercado para empresas B2B con ciclos de decisión complejos.',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <PageColorProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </PageColorProvider>
      </body>
    </html>
  )
}
