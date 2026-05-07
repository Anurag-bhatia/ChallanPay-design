import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import { Copy, Check, Clock, CircleCheck, ArrowRight, X, Coins, FileWarning, Gavel } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { PageTransition } from '@/components/shared/PageTransition'
import { useTranslation } from '@/hooks/useTranslation'

interface Challan {
  id: string
  challanNumber: string
  amount: number
  violation: string
  date: string
  location: string
  type: 'online' | 'court'
  pendingSince: string
}

interface PaidChallan {
  id: string
  challanNumber: string
  amount: number
  violation: string
  date: string
  location: string
  type: 'online' | 'court'
  paidOn: string
}

const MOCK_CHALLANS: Challan[] = [
  { id: '1', challanNumber: 'UP40838230627114376', amount: 2000, violation: 'Over Speeding', date: '27 Jun 2023', location: 'NH-44, Gurgaon', type: 'online', pendingSince: '24 months' },
  { id: '2', challanNumber: 'DL01234567890123456', amount: 5000, violation: 'Red Light Violation', date: '15 Jul 2023', location: 'Ring Road, Delhi', type: 'court', pendingSince: '23 months' },
  { id: '3', challanNumber: 'HR26838230627114377', amount: 1000, violation: 'No Helmet', date: '03 Aug 2023', location: 'Sector 29, Gurgaon', type: 'online', pendingSince: '22 months' },
  { id: '4', challanNumber: 'DL08838230627114378', amount: 2500, violation: 'Wrong Parking', date: '11 Sep 2023', location: 'Connaught Place, Delhi', type: 'online', pendingSince: '20 months' },
  { id: '5', challanNumber: 'UP16838230627114379', amount: 10000, violation: 'Drunk Driving', date: '22 Oct 2023', location: 'Greater Noida Expressway', type: 'court', pendingSince: '19 months' },
  { id: '6', challanNumber: 'HR26838230627114380', amount: 1500, violation: 'Without Seatbelt', date: '05 Nov 2023', location: 'NH-8, Manesar', type: 'online', pendingSince: '18 months' },
]

const MOCK_PAID_CHALLANS: PaidChallan[] = [
  { id: 'p1', challanNumber: 'DL04838230512114300', amount: 1000, violation: 'No Parking', date: '10 Jan 2023', location: 'Karol Bagh, Delhi', type: 'online', paidOn: '15 Mar 2023' },
  { id: 'p2', challanNumber: 'UP32838230418114301', amount: 2000, violation: 'Signal Jump', date: '18 Feb 2023', location: 'Lucknow-Agra Expressway', type: 'online', paidOn: '22 Apr 2023' },
  { id: 'p3', challanNumber: 'HR06838230320114302', amount: 5000, violation: 'Driving without valid insurance', date: '20 Mar 2023', location: 'Sohna Road, Gurgaon', type: 'court', paidOn: '10 May 2023' },
  { id: 'p4', challanNumber: 'DL12838230225114303', amount: 1500, violation: 'Using mobile phone while driving', date: '25 Apr 2023', location: 'Dwarka, Delhi', type: 'online', paidOn: '30 Jun 2023' },
  { id: 'p5', challanNumber: 'UP80838230130114304', amount: 500, violation: 'No Helmet', date: '30 May 2023', location: 'Agra, UP', type: 'online', paidOn: '15 Jul 2023' },
  { id: 'p6', challanNumber: 'HR26838230605114305', amount: 10000, violation: 'Drunk Driving', date: '05 Jun 2023', location: 'MG Road, Gurgaon', type: 'court', paidOn: '20 Aug 2023' },
  { id: 'p7', challanNumber: 'DL09838230710114306', amount: 2500, violation: 'Overspeeding in school zone', date: '10 Jul 2023', location: 'Vasant Kunj, Delhi', type: 'online', paidOn: '05 Sep 2023' },
  { id: 'p8', challanNumber: 'UP16838230815114307', amount: 1000, violation: 'Without Seatbelt', date: '15 Aug 2023', location: 'Noida Expressway', type: 'online', paidOn: '01 Oct 2023' },
]

type Filter = 'all' | 'online' | 'court'
type Tab = 'pending' | 'paid'

// Hoist constant arrays outside component (rerender-no-inline-components)
const FILTERS: Filter[] = ['all', 'online', 'court']

export function StatusPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const vehicle = searchParams.get('vehicle') || 'DL 01 AB 1234'
  const [activeTab, setActiveTab] = useState<Tab>('pending')
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [selectedIds, setSelectedIds] = useState<string[]>(MOCK_CHALLANS.map((c) => c.id))
  const { copy } = useCopyToClipboard()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [detailChallan, setDetailChallan] = useState<Challan | null>(null)
  const [showUnpaidWarning, setShowUnpaidWarning] = useState(false)

  const filteredChallans = useMemo(() => {
    if (activeFilter === 'all') return MOCK_CHALLANS
    return MOCK_CHALLANS.filter((c) => c.type === activeFilter)
  }, [activeFilter])

  // Use Set for O(1) lookups (js-set-map-lookups)
  const selectedIdsSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const totalAmount = useMemo(
    () => filteredChallans.filter((c) => selectedIdsSet.has(c.id)).reduce((sum, c) => sum + c.amount, 0),
    [selectedIdsSet, filteredChallans]
  )

  const isAllSelected = filteredChallans.length > 0 && filteredChallans.every((c) => selectedIdsSet.has(c.id))

  const toggleChallan = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredChallans.map((c) => c.id))
    }
  }

  const handleCopyChallan = async (challanNumber: string) => {
    await copy(challanNumber)
    setCopiedId(challanNumber)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleProceed = () => {
    if (selectedIds.length === 0) {
      toast.warning('Please select at least one challan to proceed')
      return
    }
    if (!isAllSelected) {
      setShowUnpaidWarning(true)
      return
    }
    navigate('/payment')
  }

  const handleContinueWithSelected = () => {
    setShowUnpaidWarning(false)
    navigate('/payment')
  }

  const handlePayAll = () => {
    setSelectedIds(filteredChallans.map((c) => c.id))
    setShowUnpaidWarning(false)
    navigate('/payment')
  }

  return (
    <PageTransition>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="md:sticky md:top-24 md:self-start md:min-h-[calc(100vh-7rem)] bg-white rounded-2xl border border-border p-3">
            <nav className="flex md:flex-col gap-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={cn(
                  'flex-1 md:flex-none flex items-center justify-between px-4 py-4 md:py-5 rounded-xl text-sm md:text-base font-semibold transition-all',
                  activeTab === 'pending'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-text-secondary hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5" />
                  <span className="hidden md:inline">{t.status.pendingChallans}</span>
                  <span className="md:hidden">{t.status.pending}</span>
                </div>
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">
                  {MOCK_CHALLANS.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('paid')}
                className={cn(
                  'flex-1 md:flex-none flex items-center justify-between px-4 py-4 md:py-5 rounded-xl text-sm md:text-base font-semibold transition-all',
                  activeTab === 'paid'
                    ? 'bg-success text-white'
                    : 'bg-white border border-border text-text-secondary hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-2.5">
                  <CircleCheck className="w-5 h-5" />
                  <span className="hidden md:inline">{t.status.paidChallans}</span>
                  <span className="md:hidden">{t.status.paid}</span>
                </div>
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">8</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Vehicle Info Card */}
            <div className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4">
              <img src="/images/BLACK-CAR.png" alt="Vehicle" className="w-20 h-14 object-contain" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-light">Hyundai Creta</p>
                <p className="font-display font-bold text-text-primary text-lg">{vehicle}</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-2.5 pl-1.5 pr-6 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold whitespace-nowrap">
                <img src="/images/govt-verified-badge.png" alt="" className="w-10 h-10" />
                Govt. Verified Data
              </span>
              <span className="sm:hidden inline-flex items-center justify-center" title="Govt. Verified Data">
                <img src="/images/govt-verified-badge.png" alt="Govt. Verified Data" className="w-11 h-11" />
              </span>
            </div>

            {activeTab === 'pending' ? (
              <>
                {/* Section Header + Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                    <h2 className="font-display font-bold text-lg text-text-primary">
                      {`${t.status.pendingChallans} (${filteredChallans.length})`}
                    </h2>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-text-secondary">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 rounded border-border text-primary accent-primary focus:ring-primary"
                      />
                      {t.status.selectAll}
                    </label>
                  </div>
                  <div className="flex gap-2">
                    {FILTERS.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                          'px-4 py-3 rounded-lg text-xs font-medium transition-colors capitalize',
                          activeFilter === filter
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                        )}
                      >
                        {filter === 'all'
                          ? `${t.status.all} (${MOCK_CHALLANS.length})`
                          : `${filter === 'online' ? t.status.onlineChallan : t.status.courtChallan} (${MOCK_CHALLANS.filter((c) => c.type === filter).length})`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Challan Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredChallans.map((challan) => (
                    <div
                      key={challan.id}
                      className={cn(
                        'bg-white rounded-xl border p-5 transition-all',
                        selectedIdsSet.has(challan.id)
                          ? 'border-primary shadow-sm'
                          : 'border-border hover:border-primary/30'
                      )}
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-text-light">#{challan.challanNumber.slice(0, 12)}...</span>
                          <button
                            onClick={() => handleCopyChallan(challan.challanNumber)}
                            className="text-text-light hover:text-primary transition-colors"
                            title="Copy challan number"
                          >
                            {copiedId === challan.challanNumber ? (
                              <Check className="w-3.5 h-3.5 text-success" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedIdsSet.has(challan.id)}
                          onChange={() => toggleChallan(challan.id)}
                          className="w-5 h-5 rounded border-border text-primary accent-primary focus:ring-primary cursor-pointer"
                        />
                      </div>

                      {/* Amount + Type badge */}
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-display text-xl font-bold text-text-primary">
                          ₹{challan.amount.toLocaleString('en-IN')}
                        </p>
                        <span className={cn(
                          'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full',
                          challan.type === 'online' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'
                        )}>
                          {challan.type === 'online' ? t.status.onlineChallan : t.status.courtChallan}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5 text-sm text-text-secondary">
                        <p className="line-clamp-3 leading-snug">{challan.violation}</p>
                        <p className="text-xs text-text-light">{challan.date} · {challan.location}</p>
                      </div>

                      {/* Pending since + View Details */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-red-500 font-medium">
                          {t.status.pendingSince} {challan.pendingSince}
                        </span>
                        <button
                          onClick={() => setDetailChallan(challan)}
                          className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {t.status.viewDetails}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Proceed Bar */}
                {selectedIds.length > 0 && (
              <div className="sticky bottom-16 -mx-4 sm:mx-0 md:fixed md:bottom-0 md:left-0 md:right-0 z-40 bg-white border-t border-border md:rounded-none rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] overflow-hidden animate-slide-down">
                {/* Pledge & Claim Rewards banner */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border-b border-amber-200">
                  <span className="text-sm font-semibold text-amber-700">{t.status.pledgeAndClaimRewards}</span>
                  <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <div className="px-4 py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-text-light">{t.status.totalAmountToPay}</p>
                    <p className="font-display text-lg font-bold text-text-primary">
                      ₹{totalAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    onClick={handleProceed}
                    className="flex-shrink-0 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-md text-sm"
                  >
                    {`${t.status.proceedToPay} >`}
                  </button>
                </div>
              </div>
            )}
              </>
            ) : (
              <>
                {/* Paid Challans Header */}
                <h2 className="font-display font-bold text-lg text-text-primary">
                  {`${t.status.paidChallans} (${MOCK_PAID_CHALLANS.length})`}
                </h2>

                {/* Paid Challan Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_PAID_CHALLANS.map((challan) => (
                    <div
                      key={challan.id}
                      className="bg-white rounded-xl border border-border p-5"
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-text-light">#{challan.challanNumber.slice(0, 12)}...</span>
                          <button
                            onClick={() => handleCopyChallan(challan.challanNumber)}
                            className="text-text-light hover:text-primary transition-colors"
                            title="Copy challan number"
                          >
                            {copiedId === challan.challanNumber ? (
                              <Check className="w-3.5 h-3.5 text-success" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
                          <CircleCheck className="w-3 h-3" />
                          {t.status.paid}
                        </span>
                      </div>

                      {/* Amount + Type badge */}
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-display text-xl font-bold text-text-primary">
                          ₹{challan.amount.toLocaleString('en-IN')}
                        </p>
                        <span className={cn(
                          'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full',
                          challan.type === 'online' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'
                        )}>
                          {challan.type === 'online' ? t.status.onlineChallan : t.status.courtChallan}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5 text-sm text-text-secondary">
                        <p className="line-clamp-3 leading-snug">{challan.violation}</p>
                        <p className="text-xs text-text-light">{challan.date} · {challan.location}</p>
                      </div>

                      {/* Paid on */}
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-success font-medium">
                          {t.status.paidOn} {challan.paidOn}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Challan Detail Modal */}
      {detailChallan && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setDetailChallan(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDetailChallan(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 md:p-8">
              <h3 className="font-display text-lg font-semibold text-text-secondary mb-1">{t.status.challanDetails}</h3>
              <p className="text-base font-bold text-text-primary font-mono mb-6">#{detailChallan.challanNumber}</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">{t.status.amount}</span>
                  <span className="font-display text-2xl font-bold text-text-primary">
                    ₹{detailChallan.amount.toLocaleString('en-IN')}
                  </span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-text-secondary flex-shrink-0">{t.status.violation}</span>
                  <span className="text-sm font-medium text-text-primary text-right">{detailChallan.violation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t.status.date}</span>
                  <span className="text-sm font-medium text-text-primary">{detailChallan.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t.status.location}</span>
                  <span className="text-sm font-medium text-text-primary">{detailChallan.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t.status.type}</span>
                  <span className={cn(
                    'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full',
                    detailChallan.type === 'online' ? 'bg-info/10 text-info' : 'bg-warning/10 text-warning'
                  )}>
                    {detailChallan.type === 'online' ? t.status.onlineChallan : t.status.courtChallan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">{t.status.statusLabel}</span>
                  <span className="text-xs text-red-500 font-medium">{t.status.pendingSince} {detailChallan.pendingSince}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Challan Details\n\nChallan No: #${detailChallan.challanNumber}\nAmount: ₹${detailChallan.amount.toLocaleString('en-IN')}\nViolation: ${detailChallan.violation}\nDate: ${detailChallan.date}\nLocation: ${detailChallan.location}\nType: ${detailChallan.type} Challan\nStatus: Pending since ${detailChallan.pendingSince}\n\nCheck & pay your challans on ChallanPay`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1fb855] text-white font-semibold rounded-xl transition-colors text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t.status.shareOnWhatsApp}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unpaid Challans Warning Modal */}
      {showUnpaidWarning && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowUnpaidWarning(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowUnpaidWarning(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Warning header */}
            <div className="bg-gradient-to-b from-amber-50 via-amber-50/50 to-white pt-8 pb-3 px-6 text-center">
              <div className="text-5xl mb-3">⚠️</div>
              <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                Some challans are still unpaid
              </h3>
              <p className="text-sm text-text-secondary">
                You've selected only a few challans while others remain pending.
              </p>
            </div>

            {/* Consequence list */}
            <div className="px-6 pt-2 pb-6">
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/80">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Coins className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Attract additional penalties</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/80">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <FileWarning className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Lead to legal notices</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50/80">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Gavel className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Require court appearance</span>
                </div>
              </div>

              {/* Pay All button */}
              <button
                onClick={handlePayAll}
                className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm shadow-sm"
              >
                Pay All Challans
              </button>

              {/* Continue with Selected link */}
              <button
                onClick={handleContinueWithSelected}
                className="w-full py-3 text-text-secondary font-medium text-sm hover:text-text-primary transition-colors mt-1"
              >
                Continue with Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  )
}
