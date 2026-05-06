import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Monitor, Scale, Gift, CheckCircle, ArrowLeft, X, Gavel, IdCard, ShieldAlert, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { useTranslation } from '@/hooks/useTranslation'

type ResolutionType = 'online' | 'court'

export function PaymentPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const RESOLUTION_TABS = [
    { id: 'online' as const, label: t.payment.payAndClose, icon: Monitor, description: t.payment.instantPayment, tags: [t.payment.instantBenefit, t.payment.fortyFiveDays] },
    { id: 'court' as const, label: t.payment.contestAndWait, icon: Scale, description: t.payment.legalRepresentation, tags: [t.payment.refundApplicable, t.payment.sixtyDays] },
  ]
  const [activeTab, setActiveTab] = useState<ResolutionType>('online')
  const [pledgeChecked, setPledgeChecked] = useState(false)
  const [showBackConfirm, setShowBackConfirm] = useState(false)

  const handlePledge = () => {
    setPledgeChecked(!pledgeChecked)
  }

  const handlePayment = () => {
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
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning header */}
            <div className="bg-gradient-to-b from-amber-50 via-amber-50/50 to-white pt-8 pb-3 px-6 text-center">
              <div className="text-5xl mb-3">⚖️</div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                {t.payment.challanPending}
              </h3>
              <p className="text-sm text-text-secondary">
                {t.payment.leavingMayLead}
              </p>
            </div>

            {/* Consequence list */}
            <div className="px-6 pt-2 pb-6">
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/80">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{t.payment.multipleCourtVisits}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/80">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <IdCard className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{t.payment.licenseSuspension}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/80">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">{t.payment.furtherLegalAction}</span>
                </div>
              </div>

              {/* Pay Now button */}
              <button
                onClick={() => setShowBackConfirm(false)}
                className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm shadow-sm"
              >
                {t.payment.continueToPay}
              </button>

              {/* Go Back link */}
              <button
                onClick={confirmBack}
                className="w-full py-3 text-text-secondary font-medium text-sm hover:text-text-primary transition-colors mt-1"
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
              className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors"
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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all',
                    activeTab === tab.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-white hover:border-primary/30'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary'
                  )}>
                    <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-text-primary">{tab.label}</p>
                    <p className="text-xs text-text-light mt-0.5">{tab.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
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
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                    activeTab === tab.id ? 'border-primary bg-primary' : 'border-gray-300'
                  )}>
                    {activeTab === tab.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
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
                {t.payment.challansSelected}
              </h3>

              {/* Trust banner */}
              <div className="flex items-center justify-between bg-cyan-50 rounded-lg px-3.5 py-2.5 mb-4">
                <span className="text-xs font-medium text-text-secondary">{t.payment.trustBanner}</span>
                <span className="text-xl">💰</span>
              </div>

              <hr className="border-border mb-4" />

              <div className="space-y-3.5">
                {/* Online Challan */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="font-medium text-text-primary">{`${t.payment.onlineChallan} (3)`}</span>
                    <span className="font-display font-bold text-text-primary">₹5,500</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-text-light">{t.payment.convenienceFee} <span className="text-text-light/70">(3 x 200)</span></span>
                    <span className="font-display font-bold text-text-primary">₹600</span>
                  </div>
                </div>

                {/* Court Challan */}
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="font-medium text-text-primary">{`${t.payment.courtChallan} (2)`}</span>
                    <span className="font-display font-bold text-text-primary">₹1,500</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-text-light">{t.payment.convenienceFee} <span className="text-text-light/70">(2 x 2000)</span></span>
                    <span className="font-display font-bold text-text-primary">₹4,000</span>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between text-[13px] mt-3.5">
                <span className="font-medium text-primary">{t.payment.totalAmount}</span>
                <span className="font-medium text-text-primary">₹11,600</span>
              </div>

              {/* Pledge Reward */}
              {pledgeChecked && (
                <div className="flex justify-between text-[13px] mt-3.5 bg-emerald-50 -mx-6 px-6 py-2.5">
                  <span className="font-semibold text-success">{t.payment.pledgeReward}</span>
                  <span className="font-semibold text-success">-₹1,000</span>
                </div>
              )}

              {/* Grand Total */}
              <hr className="border-border my-3.5" />
              <div className="flex justify-between items-baseline">
                <span className="font-display text-[15px] font-bold text-text-primary">{t.payment.grandTotal}</span>
                <span className="font-display text-lg font-bold text-text-primary">
                  ₹{pledgeChecked ? '10,600' : '11,600'}
                </span>
              </div>

              {/* Savings badge */}
              {pledgeChecked && (
                <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-3.5 py-2.5 mt-4">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  <span className="text-xs font-medium text-success">{t.payment.savedByPledging}</span>
                </div>
              )}

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
                    ₹{pledgeChecked ? '10,600' : '11,600'}
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
            <div className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-text-primary">{`${t.payment.onlineChallan} (3)`}</span>
                <span className="font-bold text-text-primary">₹5,500</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-light">{t.payment.convenienceFee} (3 x 200)</span>
                <span className="font-bold text-text-primary">₹600</span>
              </div>
            </div>

            {/* Court Challan */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-text-primary">{`${t.payment.courtChallan} (2)`}</span>
                <span className="font-bold text-text-primary">₹1,500</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-light">{t.payment.convenienceFee} (2 x 2000)</span>
                <span className="font-bold text-text-primary">₹4,000</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between text-xs mt-2">
              <span className="font-medium text-primary">{t.payment.totalAmount}</span>
              <span className="font-medium text-text-primary">₹11,600</span>
            </div>

            {pledgeChecked && (
              <div className="flex justify-between text-xs bg-emerald-50 -mx-4 px-4 py-2">
                <span className="font-semibold text-success">{t.payment.pledgeReward}</span>
                <span className="font-semibold text-success">-₹1,000</span>
              </div>
            )}

            <hr className="border-border" />
            <div className="flex justify-between items-baseline">
              <span className="font-display text-sm font-bold text-text-primary">{t.payment.grandTotal}</span>
              <span className="font-display text-base font-bold text-text-primary">
                ₹{pledgeChecked ? '10,600' : '11,600'}
              </span>
            </div>
          </div>
        </details>
      </div>
    </PageTransition>
  )
}
