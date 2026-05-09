import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import confetti from 'canvas-confetti'
import { BadgeCheck, Monitor, Scale, Gift, ArrowLeft, X, ShieldAlert, ChevronDown, Info, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { useTranslation } from '@/hooks/useTranslation'
import { useModalA11y } from '@/hooks/useModalA11y'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import {
  useChallanStore,
  ONLINE_CONVENIENCE_FEE,
  COURT_CONVENIENCE_FEE,
  PLEDGE_REWARD,
} from '@/stores/challanStore'

type ResolutionType = 'online' | 'court'

const formatINR = (n: number) => n.toLocaleString('en-IN')

export function PaymentPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const challans = useChallanStore((s) => s.challans)
  const selectedChallanIds = useChallanStore((s) => s.selectedChallanIds)
  const recordTransaction = useChallanStore((s) => s.recordTransaction)
  const pledgeConfettiShown = useChallanStore((s) => s.pledgeConfettiShown)
  const markPledgeConfettiShown = useChallanStore((s) => s.markPledgeConfettiShown)

  const summary = useMemo(() => {
    const idSet = new Set(selectedChallanIds)
    const selected = challans.filter((c) => idSet.has(c.id))
    const online = selected.filter((c) => c.type === 'online')
    const court = selected.filter((c) => c.type === 'court')
    const onlineAmount = online.reduce((sum, c) => sum + c.amount, 0)
    const courtAmount = court.reduce((sum, c) => sum + c.amount, 0)
    const onlineFee = online.length * ONLINE_CONVENIENCE_FEE
    const courtFee = court.length * COURT_CONVENIENCE_FEE
    const subtotal = onlineAmount + courtAmount + onlineFee + courtFee
    return {
      onlineCount: online.length,
      courtCount: court.length,
      onlineAmount,
      courtAmount,
      onlineFee,
      courtFee,
      subtotal,
    }
  }, [challans, selectedChallanIds])

  const RESOLUTION_TABS = [
    { id: 'online' as const, label: t.payment.payAndClose, icon: BadgeCheck, description: t.payment.instantPayment, tags: [t.payment.instantBenefit, t.payment.fortyFiveDays], iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200' },
    { id: 'court' as const, label: t.payment.contestAndWait, icon: Scale, description: t.payment.legalRepresentation, tags: [t.payment.refundApplicable, t.payment.sixtyDays], iconBg: 'bg-amber-50 text-amber-600 border border-amber-200' },
  ]
  const [activeTab, setActiveTab] = useState<ResolutionType>('online')
  const [pledgeChecked, setPledgeChecked] = useState(false)
  const [showBackConfirm, setShowBackConfirm] = useState(false)
  const [showLegalChargesModal, setShowLegalChargesModal] = useState(false)
  const [resolutionInfo, setResolutionInfo] = useState<ResolutionType | null>(null)

  const grandTotal = pledgeChecked ? Math.max(0, summary.subtotal - PLEDGE_REWARD) : summary.subtotal
  const selectedCount = selectedChallanIds.length

  useModalA11y(resolutionInfo !== null, () => setResolutionInfo(null))
  useModalA11y(showLegalChargesModal, () => setShowLegalChargesModal(false))
  useModalA11y(showBackConfirm, () => setShowBackConfirm(false))

  const prefersReducedMotion = useReducedMotion()

  const handlePledge = () => {
    const next = !pledgeChecked
    setPledgeChecked(next)
    if (next && !prefersReducedMotion && !pledgeConfettiShown) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      markPledgeConfettiShown()
    }
  }

  const handlePayment = () => {
    const txnId = `TXN${Date.now()}`
    recordTransaction(txnId, grandTotal)
    navigate('/payment/completed')
  }

  const handleBack = () => {
    setShowBackConfirm(true)
  }

  const confirmBack = () => {
    setShowBackConfirm(false)
    navigate(-1)
  }

  return (
    <PageTransition>
      {/* Resolution Option Info Modal */}
      {resolutionInfo && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setResolutionInfo(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setResolutionInfo(null)}
              className="absolute top-2 right-2 z-10 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={cn(
              'pt-8 pb-4 px-6 text-left',
              resolutionInfo === 'online'
                ? 'bg-gradient-to-b from-cyan-50 via-cyan-50/40 to-white'
                : 'bg-gradient-to-b from-amber-50 via-amber-50/40 to-white'
            )}>
              <div className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center mb-3 border',
                resolutionInfo === 'online' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'
              )}>
                {resolutionInfo === 'online' ? <BadgeCheck className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                {resolutionInfo === 'online' ? t.payment.payAndCloseInfoTitle : t.payment.contestAndWaitInfoTitle}
              </h3>
              <p className="text-sm text-text-secondary">
                {resolutionInfo === 'online' ? t.payment.payAndCloseInfoDesc : t.payment.contestAndWaitInfoDesc}
              </p>
            </div>

            <div className="px-6 pt-3 pb-6">
              <p className="text-sm font-semibold text-text-primary mb-3">
                {t.payment.includedInService}
              </p>
              <div className="space-y-2.5 mb-5">
                {(resolutionInfo === 'online'
                  ? [
                      t.payment.payAndCloseBenefit1,
                      t.payment.payAndCloseBenefit2,
                      t.payment.payAndCloseBenefit3,
                      t.payment.payAndCloseBenefit4,
                    ]
                  : [
                      t.payment.lawyerSupport,
                      t.payment.courtDocumentation,
                      t.payment.representationCoordination,
                      t.payment.noPhysicalAppearance,
                    ]
                ).map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/70">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setResolutionInfo(null)}
                className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm shadow-sm"
              >
                {t.payment.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal Charges Info Modal */}
      {showLegalChargesModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowLegalChargesModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLegalChargesModal(false)}
              className="absolute top-2 right-2 z-10 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-b from-cyan-50 via-cyan-50/40 to-white pt-8 pb-4 px-6 text-left">
              <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                {t.payment.legalCharges}
              </h3>
              <p className="text-sm text-text-secondary">
                {t.payment.legalAssistanceDesc}
              </p>
            </div>

            <div className="px-6 pt-3 pb-6">
              <p className="text-sm font-semibold text-text-primary mb-3">
                {t.payment.includedInService}
              </p>
              <div className="space-y-2.5 mb-5">
                {[
                  t.payment.lawyerSupport,
                  t.payment.courtDocumentation,
                  t.payment.representationCoordination,
                  t.payment.noPhysicalAppearance,
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/70">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowLegalChargesModal(false)}
                className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm shadow-sm"
              >
                {t.payment.gotIt}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Confirmation Modal */}
      {showBackConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowBackConfirm(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowBackConfirm(false)}
              className="absolute top-2 right-2 z-10 w-11 h-11 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-b from-cyan-50 via-cyan-50/40 to-white pt-8 pb-3 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-emerald-600" strokeWidth={2.5} />
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                {t.payment.leaveBackTitle}
              </h3>
              <p className="text-sm text-text-secondary">
                {t.payment.leaveBackSubtitle}
              </p>
            </div>

            {/* Reassurance + soft nudges */}
            <div className="px-6 pt-2 pb-6">
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/70">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{t.payment.selectionSaved}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/70">
                  <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{t.payment.avoidLateFees}</span>
                </div>
              </div>

              {/* Pay Now button */}
              <button
                onClick={() => setShowBackConfirm(false)}
                className="w-full py-3.5 min-h-11 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm shadow-sm"
              >
                {t.payment.continueToPay}
              </button>

              {/* Go Back link */}
              <button
                onClick={confirmBack}
                className="w-full py-3 min-h-11 text-text-secondary font-medium text-sm hover:text-text-primary transition-colors mt-1"
              >
                {t.payment.goBack}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Mobile: Header outside grid */}
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-1">
            <button
              onClick={handleBack}
              aria-label="Back"
              className="w-11 h-11 rounded-full flex items-center justify-center text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-text-primary">{t.payment.chooseResolution}</h1>
          </div>
          <p className="text-text-secondary text-sm ml-11">{t.payment.selectHow}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-10">
          {/* Left: Resolution Options */}
          <div className="space-y-5">
            {/* Resolution Tabs */}
            <div className="space-y-4">
              {RESOLUTION_TABS.map((tab) => (
                <div
                  key={tab.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveTab(tab.id)
                    }
                  }}
                  className={cn(
                    'relative w-full flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer',
                    activeTab === tab.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-white hover:border-primary/30'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    tab.iconBg
                  )}>
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-display font-semibold text-sm text-text-primary">{tab.label}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setResolutionInfo(tab.id)
                        }}
                        aria-label={`More info about ${tab.label}`}
                        className="text-text-light hover:text-primary transition-colors flex items-center justify-center p-2.5 -m-2.5"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                      {tab.id === 'online' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                          <BadgeCheck className="w-3 h-3" aria-hidden />
                          {t.payment.recommended}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-light mt-0.5">{tab.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tab.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'text-[10px] font-medium px-2 py-0.5 rounded-full',
                            activeTab === tab.id
                              ? 'bg-white text-primary'
                              : 'bg-gray-100 text-text-secondary'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className={cn(
                    'w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                    activeTab === tab.id ? 'border-primary bg-primary' : 'border-gray-300'
                  )}>
                    {activeTab === tab.id && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </div>
                </div>
              ))}
            </div>

            {/* Pledge Section */}
            <div className="bg-white rounded-xl p-4 sm:p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pledgeChecked}
                  onChange={handlePledge}
                  className="w-6 h-6 rounded border-primary text-primary accent-primary focus:ring-primary mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="font-display font-semibold text-sm text-text-primary">
                    {t.payment.pledgeTitle}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {t.payment.pledgeDesc}
                  </p>
                </div>
              </label>

              {/* Reward Info */}
              <div className="mt-4 flex items-center gap-3 bg-amber-50 rounded-lg p-3 border border-amber-200">
                <Gift className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-700">{t.payment.rewardAmount}</p>
                  <p className="text-xs text-text-light">{t.payment.rewardApplied}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment Summary */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            {/* Mobile: fixed bottom bar summary; Desktop: full card */}
            <div className="hidden lg:block bg-white rounded-2xl border border-border shadow-sm p-6">
              <h3 className="font-display font-bold text-base text-text-primary mb-4">
                {`${selectedCount} ${selectedCount === 1 ? 'Challan' : 'Challans'} selected for settlement`}
              </h3>

              {/* Trust banner */}
              <div className="flex items-center justify-between bg-cyan-50 rounded-lg px-3.5 py-2.5 mb-4">
                <span className="text-xs font-medium text-text-secondary">{t.payment.trustBanner}</span>
                <span className="text-xl">💰</span>
              </div>

              <hr className="border-border mb-4" />

              <div className="space-y-3.5">
                {/* Online Challan */}
                {summary.onlineCount > 0 && (
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[13px]">
                      <span className="font-medium text-text-primary">{`${t.payment.onlineChallan} (${summary.onlineCount})`}</span>
                      <span className="font-display font-bold text-text-primary">₹{formatINR(summary.onlineAmount)}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-text-light inline-flex items-center gap-1">
                        {t.payment.convenienceFee} <span className="text-text-light/70">{`(${summary.onlineCount} x ${ONLINE_CONVENIENCE_FEE})`}</span>
                        <button
                          type="button"
                          onClick={() => setShowLegalChargesModal(true)}
                          aria-label={t.payment.legalCharges}
                          className="inline-flex items-center justify-center w-9 h-9 -m-2.5 rounded-full text-text-light/80 hover:text-primary transition-colors"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </span>
                      <span className="font-display font-bold text-text-primary">₹{formatINR(summary.onlineFee)}</span>
                    </div>
                  </div>
                )}

                {/* Court Challan */}
                {summary.courtCount > 0 && (
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[13px]">
                      <span className="font-medium text-text-primary">{`${t.payment.courtChallan} (${summary.courtCount})`}</span>
                      <span className="font-display font-bold text-text-primary">₹{formatINR(summary.courtAmount)}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-text-light inline-flex items-center gap-1">
                        {t.payment.convenienceFee} <span className="text-text-light/70">{`(${summary.courtCount} x ${COURT_CONVENIENCE_FEE})`}</span>
                        <button
                          type="button"
                          onClick={() => setShowLegalChargesModal(true)}
                          aria-label={t.payment.legalCharges}
                          className="inline-flex items-center justify-center w-9 h-9 -m-2.5 rounded-full text-text-light/80 hover:text-primary transition-colors"
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </span>
                      <span className="font-display font-bold text-text-primary">₹{formatINR(summary.courtFee)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pledge Reward */}
              {pledgeChecked && (
                <div className="flex justify-between text-[13px] mt-3.5 bg-emerald-50 -mx-6 px-6 py-2.5">
                  <span className="font-semibold text-success">{t.payment.pledgeReward}</span>
                  <span className="font-semibold text-success">-₹{formatINR(PLEDGE_REWARD)}</span>
                </div>
              )}

              {/* Grand Total */}
              <hr className="border-border my-3.5" />
              <div className="flex justify-between items-baseline">
                <span className="font-display text-[15px] font-bold text-text-primary">{t.payment.grandTotal}</span>
                <span className="font-display text-lg font-bold text-text-primary">
                  ₹{formatINR(grandTotal)}
                </span>
              </div>

              <button
                onClick={handlePayment}
                className="w-full mt-4 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                  {t.payment.proceedToPay}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </div>

            {/* Mobile: Sticky bottom payment bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 safe-bottom">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-text-light">{t.payment.grandTotal}</p>
                  <p className="font-display text-lg font-bold text-text-primary">
                    ₹{formatINR(grandTotal)}
                  </p>
                  {pledgeChecked && (
                    <p className="text-[10px] text-success font-medium">{t.payment.savedAmount}</p>
                  )}
                </div>
                <button
                  onClick={handlePayment}
                  className="flex-shrink-0 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md text-sm"
                >
                  {t.payment.proceedToPay}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Expandable summary drawer */}
        <details open className="lg:hidden mt-5 mb-20 bg-white rounded-xl border border-border overflow-hidden">
          <summary className="flex items-center justify-between p-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
            <span className="font-display font-bold text-sm text-text-primary">{t.payment.paymentSummary}</span>
            <ChevronDown className="w-5 h-5 text-text-light transition-transform [[open]>&]:rotate-180" />
          </summary>
          <div className="px-4 pb-4 space-y-3">
            {/* Trust banner */}
            <div className="flex items-center justify-between bg-cyan-50 rounded-lg px-3 py-2">
              <span className="text-[11px] font-medium text-text-secondary">{t.payment.trustBanner}</span>
              <span className="text-lg">💰</span>
            </div>

            <hr className="border-border" />

            {/* Online Challan */}
            {summary.onlineCount > 0 && (
              <div className="space-y-0.5">
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium text-text-primary">{`${t.payment.onlineChallan} (${summary.onlineCount})`}</span>
                  <span className="font-display font-bold text-text-primary">₹{formatINR(summary.onlineAmount)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-text-light inline-flex items-center gap-1">
                    {t.payment.convenienceFee} <span className="text-text-light/70">{`(${summary.onlineCount} x ${ONLINE_CONVENIENCE_FEE})`}</span>
                    <button
                      type="button"
                      onClick={() => setShowLegalChargesModal(true)}
                      aria-label={t.payment.legalCharges}
                      className="inline-flex items-center justify-center w-9 h-9 -m-2.5 rounded-full text-text-light/80 hover:text-primary transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </span>
                  <span className="font-display font-bold text-text-primary">₹{formatINR(summary.onlineFee)}</span>
                </div>
              </div>
            )}

            {/* Court Challan */}
            {summary.courtCount > 0 && (
              <div className="space-y-0.5">
                <div className="flex justify-between text-[13px]">
                  <span className="font-medium text-text-primary">{`${t.payment.courtChallan} (${summary.courtCount})`}</span>
                  <span className="font-display font-bold text-text-primary">₹{formatINR(summary.courtAmount)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-text-light inline-flex items-center gap-1">
                    {t.payment.convenienceFee} <span className="text-text-light/70">{`(${summary.courtCount} x ${COURT_CONVENIENCE_FEE})`}</span>
                    <button
                      type="button"
                      onClick={() => setShowLegalChargesModal(true)}
                      aria-label={t.payment.legalCharges}
                      className="inline-flex items-center justify-center w-9 h-9 -m-2.5 rounded-full text-text-light/80 hover:text-primary transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </span>
                  <span className="font-display font-bold text-text-primary">₹{formatINR(summary.courtFee)}</span>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between text-xs mt-2">
              <span className="font-medium text-primary">{t.payment.totalAmount}</span>
              <span className="font-medium text-text-primary">₹{formatINR(summary.subtotal)}</span>
            </div>

            {pledgeChecked && (
              <div className="flex justify-between text-xs bg-emerald-50 -mx-4 px-4 py-2">
                <span className="font-semibold text-success">{t.payment.pledgeReward}</span>
                <span className="font-semibold text-success">-₹{formatINR(PLEDGE_REWARD)}</span>
              </div>
            )}

            <hr className="border-border" />
            <div className="flex justify-between items-baseline">
              <span className="font-display text-sm font-bold text-text-primary">{t.payment.grandTotal}</span>
              <span className="font-display text-base font-bold text-text-primary">
                ₹{formatINR(grandTotal)}
              </span>
            </div>
          </div>
        </details>
      </div>
    </PageTransition>
  )
}
