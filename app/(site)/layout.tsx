import { PageColorProvider } from '@/context/page-color'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CalEmbed } from '@/components/cal-embed'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageColorProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <CalEmbed />
    </PageColorProvider>
  )
}
