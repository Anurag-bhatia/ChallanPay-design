import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { AppLayout } from '@/components/layout/AppLayout'

// Eagerly load the homepage (critical path)
import { HomePage } from '@/pages/HomePage'

// Lazy-load all other pages (bundle-dynamic-imports)
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const StatusPage = lazy(() => import('@/pages/StatusPage').then(m => ({ default: m.StatusPage })))
const PaymentPage = lazy(() => import('@/pages/PaymentPage').then(m => ({ default: m.PaymentPage })))
const PaymentCompletedPage = lazy(() => import('@/pages/PaymentCompletedPage').then(m => ({ default: m.PaymentCompletedPage })))
const ChallanDetailsPage = lazy(() => import('@/pages/ChallanDetailsPage').then(m => ({ default: m.ChallanDetailsPage })))
const LoadingPage = lazy(() => import('@/pages/LoadingPage').then(m => ({ default: m.LoadingPage })))
const BlogsPage = lazy(() => import('@/pages/BlogsPage').then(m => ({ default: m.BlogsPage })))
const NewsPage = lazy(() => import('@/pages/NewsPage').then(m => ({ default: m.NewsPage })))
const EventsPage = lazy(() => import('@/pages/EventsPage').then(m => ({ default: m.EventsPage })))
const FAQPage = lazy(() => import('@/pages/FAQPage').then(m => ({ default: m.FAQPage })))
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })))
const TermsPage = lazy(() => import('@/pages/TermsPage').then(m => ({ default: m.TermsPage })))
const RoadSmartPartnersPage = lazy(() => import('@/pages/RoadSmartPartnersPage').then(m => ({ default: m.RoadSmartPartnersPage })))
const TrackStatusPage = lazy(() => import('@/pages/TrackStatusPage').then(m => ({ default: m.TrackStatusPage })))

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'blogs', element: withSuspense(BlogsPage) },
      { path: 'news', element: withSuspense(NewsPage) },
      { path: 'events', element: withSuspense(EventsPage) },
      { path: 'faq', element: withSuspense(FAQPage) },
      { path: 'privacy-policy', element: withSuspense(PrivacyPolicyPage) },
      { path: 'terms', element: withSuspense(TermsPage) },
      { path: 'road-smart-partners', element: withSuspense(RoadSmartPartnersPage) },
      { path: 'track-status', element: withSuspense(TrackStatusPage) },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      { path: 'loading', element: withSuspense(LoadingPage) },
      { path: 'dashboard', element: withSuspense(DashboardPage) },
      { path: 'status', element: withSuspense(StatusPage) },
      { path: 'challan/:id', element: withSuspense(ChallanDetailsPage) },
      { path: 'payment', element: withSuspense(PaymentPage) },
      { path: 'payment/completed', element: withSuspense(PaymentCompletedPage) },
    ],
  },
])
