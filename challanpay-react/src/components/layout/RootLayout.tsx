import { Outlet, useLocation, useNavigate } from 'react-router'
import { Search, MapPinCheck, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Header } from './Header'
import { Footer } from './Footer'
import { SkipToContent } from '@/components/shared/SkipToContent'
import { OfflineBanner } from '@/components/shared/OfflineBanner'

const BOTTOM_NAV_ITEMS = [
  { label: 'Check Challans', icon: Search, path: '/' },
  { label: 'Track Challans', icon: MapPinCheck, path: '/track-status' },
  { label: 'Profile', icon: UserRound, path: '/profile' },
]

const HIDE_BOTTOM_NAV = ['/road-smart-partners', '/blogs', '/news', '/faq', '/privacy-policy', '/terms']

export function RootLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const showBottomNav = !HIDE_BOTTOM_NAV.some(p => location.pathname.startsWith(p))

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <SkipToContent />
      <OfflineBanner />
      <Header />
      <main id="main" className={cn('flex-1 pt-16', showBottomNav ? 'pb-16 md:pb-0' : '')}>
        <Outlet />
      </main>
      <Footer />

      {/* Mobile Bottom Navbar */}
      {showBottomNav && (
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white rounded-t-2xl border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-bottom">
        <div className="flex items-stretch px-2">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex-1 flex flex-col items-center gap-1 py-3.5 transition-colors',
                  isActive ? 'text-primary' : 'text-text-light'
                )}
              >
                <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={cn('text-xs', isActive ? 'font-semibold' : 'font-medium')}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
      )}
    </div>
  )
}
