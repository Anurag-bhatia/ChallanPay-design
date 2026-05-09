import { Outlet } from 'react-router'
import { Header } from './Header'
import { SkipToContent } from '@/components/shared/SkipToContent'
import { OfflineBanner } from '@/components/shared/OfflineBanner'

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-page">
      <SkipToContent />
      <OfflineBanner />
      <Header />
      <main id="main" className="flex-1 pt-20">
        <Outlet />
      </main>
    </div>
  )
}
