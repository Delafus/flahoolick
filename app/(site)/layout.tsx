import { PageColorProvider } from '@/context/page-color'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageColorProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </PageColorProvider>
  )
}
