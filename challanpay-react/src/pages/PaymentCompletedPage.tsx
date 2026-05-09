import { useEffect, useMemo, useRef } from 'react'
import confetti from 'canvas-confetti'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Download, CheckCircle, Circle, Clock, FileText, CreditCard, MapPinCheck } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useChallanStore } from '@/stores/challanStore'

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
  const clearSelection = useChallanStore((s) => s.clearSelection)

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
    { id: 4, title: t.paymentCompleted.resolutionComplete, description: t.paymentCompleted.resolutionCompleteDesc, date: `Estimated: ${formatDate(estimatedResolution)}`, status: 'pending', icon: CheckCircle },
  ]

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
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

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleDownloadReceipt}
              className="flex-1 min-h-11 py-3 bg-white border border-border text-text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t.paymentCompleted.downloadReceipt}
            </button>
            <Link
              to="/track-status"
              className="flex-1 min-h-11 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <MapPinCheck className="w-5 h-5" />
              {t.header.trackMyChallans}
            </Link>
          </div>
        </div>

        {/* Resolution Progress */}
        <div className="space-y-4 bg-white rounded-2xl border border-border shadow-sm p-6 md:p-8">
          <div>
            <h2 className="font-display text-lg font-bold text-text-primary">{t.paymentCompleted.resolutionProgress}</h2>
            <p className="text-text-secondary text-sm mt-1">{t.paymentCompleted.trackStatus}</p>
          </div>

          {/* Progress Summary */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{t.paymentCompleted.underReview}</p>
              <p className="text-xs text-text-secondary">{t.paymentCompleted.expectedCompletion}</p>
            </div>
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
                  <p className="text-xs text-text-light mt-1">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
