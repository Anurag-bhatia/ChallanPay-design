import { useEffect, useMemo, useRef } from 'react'
import confetti from 'canvas-confetti'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Download, CheckCircle, Circle, Clock, FileText, CreditCard, MapPinCheck } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { Skeleton } from '@/components/shared/Skeleton'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePageState } from '@/hooks/usePageState'
import { useChallanStore } from '@/stores/challanStore'
import { useUserStore } from '@/stores/userStore'

const formatINR = (n: number) => n.toLocaleString('en-IN')

const formatDateTime = (d: Date) =>
  d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

interface TimelineStep {
  id: number
  title: string
  description: string
  date: string
  status: 'completed' | 'current' | 'pending'
  icon: typeof CheckCircle
}

export function PaymentCompletedPage() {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  const { t } = useTranslation()
  const lastTransactionId = useChallanStore((s) => s.lastTransactionId)
  const lastTransactionAmount = useChallanStore((s) => s.lastTransactionAmount)
  const lastTransactionChallanCount = useChallanStore((s) => s.lastTransactionChallanCount)
  const clearSelection = useChallanStore((s) => s.clearSelection)
  const userMobile = useUserStore((s) => s.userMobile)
  const vehicleNumber = useUserStore((s) => s.vehicleNumber)
  const { state: pageState } = usePageState()

  const subscriberId = useMemo(() => {
    if (userMobile) return `CP-${userMobile.slice(-6).padStart(6, '0')}`
    if (lastTransactionId) return `CP-${lastTransactionId.slice(-6)}`
    return '—'
  }, [userMobile, lastTransactionId])

  useEffect(() => {
    clearSelection()
  }, [clearSelection])

  // Capture the timestamp once at mount so timeline dates remain stable on re-render.
  const paidAtRef = useRef<Date>(new Date())
  const paidAt = paidAtRef.current
  const processingAt = useMemo(() => new Date(paidAt.getTime() + 60_000), [paidAt])
  const estimatedResolution = useMemo(() => new Date(paidAt.getTime() + 3 * 24 * 60 * 60 * 1000), [paidAt])

  const handleDownloadReceipt = () => {
    window.print()
  }

  const TIMELINE: TimelineStep[] = [
    { id: 1, title: t.paymentCompleted.paymentReceived, description: t.paymentCompleted.paymentReceivedDesc, date: formatDateTime(paidAt), status: 'completed', icon: CreditCard },
    { id: 2, title: t.paymentCompleted.processingStarted, description: t.paymentCompleted.processingStartedDesc, date: formatDateTime(processingAt), status: 'completed', icon: FileText },
    { id: 3, title: t.paymentCompleted.underReview, description: t.paymentCompleted.underReviewDesc, date: 'In Progress', status: 'current', icon: Clock },
    { id: 4, title: t.paymentCompleted.resolutionComplete, description: `${t.paymentCompleted.resolutionCompleteDesc} ${formatDate(estimatedResolution)}.`, date: '', status: 'pending', icon: CheckCircle },
  ]

  if (pageState === 'loading') {
    return (
      <PageTransition>
        <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 space-y-6">
            <Skeleton className="w-32 h-32 mx-auto rounded-full" />
            <div className="space-y-3 text-center">
              <Skeleton className="h-7 w-64 mx-auto" />
              <Skeleton className="h-4 w-72 mx-auto" />
            </div>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Skeleton className="h-12 flex-1 rounded-xl" />
              <Skeleton className="h-12 flex-1 rounded-xl" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-16 w-full rounded-xl" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
        {/* Success Section */}
        <div className="text-center space-y-6 bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8">
          {/* Success Animation */}
          <div className="w-32 h-32 mx-auto" aria-hidden="true">
            <DotLottieReact
              src="/lottie/Check.json"
              autoplay
              className="w-full h-full"
            />
          </div>

          {/* Success Message */}
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">
              {t.paymentCompleted.title}
            </h1>
            <p className="text-text-secondary mt-2">
              {t.paymentCompleted.subtitle}{' '}
              {lastTransactionAmount !== null && (
                <strong className="text-primary">₹{formatINR(lastTransactionAmount)}</strong>
              )}{' '}
              {t.paymentCompleted.processedSuccessfully}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-light">{t.paymentCompleted.transactionId}</span>
              <span className="font-mono text-text-primary font-medium">{lastTransactionId ?? '—'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-light">{t.paymentCompleted.date}</span>
              <span className="text-text-primary">{formatDate(paidAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-light">{t.paymentCompleted.statusLabel}</span>
              <span className="text-success font-medium">{t.paymentCompleted.confirmed}</span>
            </div>
          </div>

          {/* Subscriber Summary */}
          <div className="rounded-xl border border-border text-left px-4">
            <dl className="divide-y divide-border">
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-text-light">{t.paymentCompleted.subscriberId}</dt>
                <dd className="font-mono text-text-primary font-medium">{subscriberId}</dd>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-text-light">{t.paymentCompleted.vehicleNumberLabel}</dt>
                <dd className="font-mono text-text-primary font-medium">{vehicleNumber ?? '—'}</dd>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-text-light">{t.paymentCompleted.challansSubmitted}</dt>
                <dd className="text-text-primary font-medium">{lastTransactionChallanCount ?? '—'}</dd>
              </div>
              <div className="flex items-center justify-between py-3 text-sm">
                <dt className="text-text-light">{t.paymentCompleted.totalAmountPaid}</dt>
                <dd className="text-text-primary font-semibold">
                  {lastTransactionAmount !== null ? `₹${formatINR(lastTransactionAmount)}` : '—'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleDownloadReceipt}
              className="w-full min-h-11 py-3 bg-white border border-border text-text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t.paymentCompleted.downloadReceipt}
            </button>
            <Link
              to="/track-status"
              className="relative overflow-hidden w-full min-h-11 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
              <MapPinCheck className="w-5 h-5 relative" />
              <span className="relative">{t.header.trackMyChallans}</span>
            </Link>
          </div>
        </div>

        {/* Resolution Progress */}
        <div className="space-y-4 bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8">
          <div>
            <h2 className="font-display text-lg font-bold text-text-primary">{t.paymentCompleted.resolutionProgress}</h2>
            <p className="text-text-secondary text-sm mt-1">{t.paymentCompleted.trackStatus}</p>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {TIMELINE.map((step, i) => (
              <div key={step.id} className="relative flex gap-4">
                {i < TIMELINE.length - 1 && (
                  <div className={cn(
                    'absolute left-5 top-10 w-0.5 h-full',
                    step.status === 'completed' ? 'bg-success' : 'bg-border'
                  )} />
                )}
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10',
                  step.status === 'completed' && 'bg-success text-white',
                  step.status === 'current' && 'bg-primary text-white animate-pulse-scale',
                  step.status === 'pending' && 'bg-gray-100 text-text-light',
                )}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : step.status === 'current' ? (
                    <step.icon className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <p className={cn(
                    'font-display font-semibold text-sm',
                    step.status === 'pending' ? 'text-text-light' : 'text-text-primary'
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">{step.description}</p>
                  {step.date && <p className="text-xs text-text-light mt-1">{step.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
