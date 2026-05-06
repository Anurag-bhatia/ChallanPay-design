import { useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  CircleCheck,
  Hourglass,
  AlertCircle,
  Search,
  User,
  Car,
  ChevronDown,
  ChevronRight,
  Shield,
  Copy,
  Check,
  Download,
  Plus,
  Info,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/stores/userStore'
import { mobileSchema, otpSchema, userNameSchema } from '@/lib/validators'
import { PageTransition } from '@/components/shared/PageTransition'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useTranslation } from '@/hooks/useTranslation'

// --- Types ---
type TrackingStatus = 'not-settled' | 'in-progress' | 'resolved' | 'refund'
type FilterTab = 'all' | 'in-progress' | 'resolved' | 'refund'
type SidebarTab = 'challan' | 'vehicle'
type LoginStep = 'details' | 'otp'

interface TimelineEntry {
  date: string
  title: string
  description?: string
}

interface TrackingChallan {
  id: string
  challanNumber: string
  status: TrackingStatus
  vehicleNumber: string
  incidentId: string
  amount: number
  resolutionDate: string
  timeline: TimelineEntry[]
}

interface VehicleInfo {
  vehicleNumber: string
  ownerName: string
  fatherName: string
  address: string
  vehicleType: string
  registrationDate: string
  makeModel: string
  vehicleTypeColor: string
  engineNumber: string
  chassisNumber: string
  pucExpiry: string
  insuranceExpiry: string
  rcExpiry: string
}

// --- Mock Data ---
const MOCK_CHALLANS: TrackingChallan[] = [
  {
    id: '1',
    challanNumber: 'UP4083823062711437',
    status: 'not-settled',
    vehicleNumber: 'UP32 GJ 4083',
    incidentId: 'IRN-4680065',
    amount: 0,
    resolutionDate: '20 Nov, 2024',
    timeline: [
      { date: '06 Nov, 02:22 PM', title: 'Challan Submitted', description: 'Your challan has been submitted for processing. Our team will review it shortly.' },
      { date: '06 Nov, 03:45 PM', title: 'Under Review', description: 'Challan is being reviewed by our resolution team.' },
      { date: '07 Nov, 10:00 AM', title: 'Documents Verified', description: 'All submitted documents have been verified successfully.' },
    ],
  },
  {
    id: '2',
    challanNumber: 'UP4083823062711438',
    status: 'not-settled',
    vehicleNumber: 'UP32 GJ 4083',
    incidentId: 'IRN-4679986',
    amount: 500,
    resolutionDate: '22 Nov, 2024',
    timeline: [
      { date: '05 Nov, 11:30 AM', title: 'Challan Submitted', description: 'Your challan has been submitted for processing.' },
      { date: '05 Nov, 04:00 PM', title: 'Payment Pending', description: 'Awaiting payment confirmation from the authority.' },
    ],
  },
  {
    id: '3',
    challanNumber: 'UP4083823062711439',
    status: 'in-progress',
    vehicleNumber: 'UP32 GJ 4083',
    incidentId: 'IRN-4679900',
    amount: 1000,
    resolutionDate: '25 Nov, 2024',
    timeline: [
      { date: '04 Nov, 09:15 AM', title: 'Challan Submitted', description: 'Your challan has been submitted for processing.' },
      { date: '04 Nov, 02:00 PM', title: 'Under Review', description: 'Challan is being reviewed by our resolution team.' },
      { date: '05 Nov, 11:00 AM', title: 'Resolution In Progress', description: 'Our team is actively working on resolving this challan with the traffic authority.' },
    ],
  },
  {
    id: '4',
    challanNumber: 'UP4083823062711440',
    status: 'in-progress',
    vehicleNumber: 'UP32 GJ 4083',
    incidentId: 'IRN-4679850',
    amount: 2000,
    resolutionDate: '28 Nov, 2024',
    timeline: [
      { date: '03 Nov, 10:00 AM', title: 'Challan Submitted', description: 'Your challan has been submitted for processing.' },
      { date: '03 Nov, 05:30 PM', title: 'Documents Requested', description: 'Additional documents requested for verification.' },
      { date: '04 Nov, 09:00 AM', title: 'Documents Uploaded', description: 'Documents have been uploaded and are pending review.' },
      { date: '05 Nov, 02:00 PM', title: 'Resolution In Progress', description: 'Resolution process initiated with traffic department.' },
    ],
  },
  {
    id: '5',
    challanNumber: 'UP4083823062711441',
    status: 'not-settled',
    vehicleNumber: 'UP32 GJ 4083',
    incidentId: 'IRN-4679801',
    amount: 0,
    resolutionDate: '30 Nov, 2024',
    timeline: [
      { date: '02 Nov, 08:45 AM', title: 'Challan Submitted', description: 'Your challan has been submitted for processing.' },
    ],
  },
  {
    id: '6',
    challanNumber: 'UP4083823062711442',
    status: 'not-settled',
    vehicleNumber: 'UP32 GJ 4083',
    incidentId: 'IRN-4679750',
    amount: 750,
    resolutionDate: '02 Dec, 2024',
    timeline: [
      { date: '01 Nov, 04:30 PM', title: 'Challan Submitted', description: 'Your challan has been submitted for processing.' },
      { date: '02 Nov, 10:00 AM', title: 'Under Review', description: 'Challan is being reviewed by our resolution team.' },
    ],
  },
]

const MOCK_VEHICLES: VehicleInfo[] = [
  {
    vehicleNumber: 'UP32 GJ 4083',
    ownerName: 'Anurag Bhatia',
    fatherName: 'Rajesh Bhatia',
    address: '45, Sector 12, Noida, Uttar Pradesh - 201301',
    vehicleType: 'Car',
    registrationDate: '15 Mar 2020',
    makeModel: 'Hyundai Creta SX',
    vehicleTypeColor: 'White',
    engineNumber: 'G4NAHU456789',
    chassisNumber: 'MALC381CJKM12345',
    pucExpiry: '22 Dec 2025',
    insuranceExpiry: '14 Mar 2026',
    rcExpiry: '15 Mar 2035',
  },
  {
    vehicleNumber: 'DL01 AB 1234',
    ownerName: 'Anurag Bhatia',
    fatherName: 'Rajesh Bhatia',
    address: '45, Sector 12, Noida, Uttar Pradesh - 201301',
    vehicleType: 'Bike',
    registrationDate: '22 Jun 2019',
    makeModel: 'Royal Enfield Classic 350',
    vehicleTypeColor: 'Black',
    engineNumber: 'JBSBBH78901',
    chassisNumber: 'ME3J1AG11KC23456',
    pucExpiry: '10 Aug 2025',
    insuranceExpiry: '21 Jun 2026',
    rcExpiry: '22 Jun 2034',
  },
]

const STATUS_BADGE: Record<TrackingStatus, { label: string; className: string }> = {
  'not-settled': { label: 'NOT SETTLED', className: 'bg-gray-100 text-gray-600' },
  'in-progress': { label: 'IN PROGRESS', className: 'bg-amber-50 text-amber-600' },
  'resolved': { label: 'RESOLVED', className: 'bg-emerald-50 text-emerald-600' },
  'refund': { label: 'REFUND', className: 'bg-purple-50 text-purple-600' },
}

// --- Challan Detail View ---
function ChallanDetailView({ challan, onBack }: { challan: TrackingChallan; onBack: () => void }) {
  const { t } = useTranslation()
  const { copied, copy } = useCopyToClipboard()
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(new Set())

  const toggleEntry = (index: number) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-text-secondary" />
        </button>
        <h2 className="font-display text-lg font-bold text-text-primary">{t.trackStatus.challanDetail}</h2>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left — Resolution Timeline */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-sm text-text-primary mb-5">{t.trackStatus.resolutionTimeline}</h3>

          <div className="relative">
            {/* Vertical connecting line */}
            {challan.timeline.length > 1 && (
              <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-primary/20" />
            )}

            <div className="space-y-6">
              {challan.timeline.map((entry, index) => (
                <div key={index} className="relative flex gap-4">
                  {/* Blue dot */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-[3px] border-primary/20 flex-shrink-0 mt-0.5" />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-light mb-0.5">{entry.date}</p>
                    <p className="text-sm font-medium text-text-primary">{entry.title}</p>

                    {entry.description && (
                      <>
                        <button
                          onClick={() => toggleEntry(index)}
                          className="flex items-center gap-1 mt-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {t.trackStatus.viewDetails}
                          <ChevronDown className={cn(
                            'w-3 h-3 transition-transform',
                            expandedEntries.has(index) && 'rotate-180'
                          )} />
                        </button>

                        <AnimatePresence>
                          {expandedEntries.has(index) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-text-secondary mt-2 leading-relaxed bg-gray-50 rounded-lg p-3">
                                {entry.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Challan Summary Card */}
        <div className="bg-white rounded-xl border border-border overflow-hidden lg:self-start">
          {/* Primary Header */}
          <div className="bg-primary px-5 py-4">
            <p className="text-xs text-white/70 mb-1">{t.trackStatus.challan}</p>
            <div className="flex items-center gap-2">
              <p className="font-display font-bold text-white text-sm truncate">
                {challan.challanNumber}
              </p>
              <button
                onClick={() => copy(challan.challanNumber)}
                className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Amount Row */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <p className="font-display text-xl font-bold text-text-primary">
              ₹{challan.amount.toFixed(2)}
            </p>
            <span className={cn(
              'text-[10px] font-bold uppercase px-2.5 py-1 rounded-full',
              STATUS_BADGE[challan.status].className
            )}>
              {challan.status === 'not-settled' ? t.trackStatus.notSettled : challan.status === 'in-progress' ? t.trackStatus.inProgress : challan.status === 'resolved' ? t.trackStatus.resolved : t.trackStatus.refund}
            </span>
          </div>

          {/* Info Rows */}
          <div className="px-5 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-light">{t.trackStatus.incidentId}</span>
              <span className="text-sm font-medium text-text-primary">{challan.incidentId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-light">{t.trackStatus.vehicleLabel}</span>
              <span className="text-sm font-medium text-text-primary">{challan.vehicleNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-light">{t.trackStatus.resolutionDate}</span>
              <span className="text-sm font-medium text-text-primary">{challan.resolutionDate}</span>
            </div>
          </div>

          {/* Download Button */}
          <div className="px-5 pb-5">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              {t.trackStatus.downloadReceipt}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// --- Add Vehicle Modal ---
function AddVehicleModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!vehicleNumber.trim()) {
      setError('Please enter a vehicle number')
      return
    }
    if (vehicleNumber.trim().length < 4) {
      setError('Please enter a valid vehicle number')
      return
    }
    // In production, this would make an API call
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="relative bg-white rounded-2xl border border-border p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-text-primary">{t.trackStatus.addVehicle}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-xs font-medium text-text-secondary mb-2">
            {t.trackStatus.vehicleNumber}
          </label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={(e) => { setVehicleNumber(e.target.value.toUpperCase()); setError('') }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
            placeholder={t.trackStatus.vehiclePlaceholder}
            autoFocus
            className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
          {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
          >
            {t.trackStatus.cancel}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {t.trackStatus.addVehicle}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// --- Login Section ---
function LoginSection({ onSuccess }: { onSuccess: (name: string, mobile: string) => void }) {
  const { t } = useTranslation()
  const [step, setStep] = useState<LoginStep>('details')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [otpDigits, setOtpDigits] = useState(['', '', '', ''])
  const [error, setError] = useState('')
  const [nameError, setNameError] = useState('')
  const [mobileError, setMobileError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const startResendTimer = () => {
    setResendTimer(30)
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
  }

  const handleDetailsSubmit = () => {
    let hasError = false
    const nameResult = userNameSchema.safeParse(name)
    if (!nameResult.success) {
      setNameError(nameResult.error.errors[0].message)
      hasError = true
    } else {
      setNameError('')
    }
    const mobileResult = mobileSchema.safeParse(mobile)
    if (!mobileResult.success) {
      setMobileError(mobileResult.error.errors[0].message)
      hasError = true
    } else {
      setMobileError('')
    }
    if (hasError) return
    setStep('otp')
    startResendTimer()
  }

  const handleOtpSubmitWithDigits = (digits: string[]) => {
    const combined = digits.join('')
    const result = otpSchema.safeParse(combined)
    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }
    setError('')
    onSuccess(name, mobile)
  }

  const handleOtpSubmit = () => handleOtpSubmitWithDigits(otpDigits)

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newDigits = [...otpDigits]
    if (value.length > 1) {
      const chars = value.slice(0, 4).split('')
      chars.forEach((c, i) => { newDigits[i] = c })
      setOtpDigits(newDigits)
      setError('')
      const focusIdx = Math.min(chars.length, 3)
      otpRefs.current[focusIdx]?.focus()
      if (chars.length === 4) setTimeout(() => handleOtpSubmitWithDigits(newDigits), 0)
      return
    }
    newDigits[index] = value
    setOtpDigits(newDigits)
    setError('')
    if (value && index < 3) otpRefs.current[index + 1]?.focus()
    if (value && newDigits.every(d => d !== '')) setTimeout(() => handleOtpSubmitWithDigits(newDigits), 0)
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
    if (e.key === 'Enter') { e.preventDefault(); handleOtpSubmit() }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (step === 'details') handleDetailsSubmit()
      else handleOtpSubmit()
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">

        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm"
            >
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                {t.trackStatus.loginTitle}
              </h2>
              <p className="font-body text-sm text-text-secondary mb-7">
                {t.trackStatus.loginSubtitle}
              </p>

              {/* Name input */}
              <div className="mb-5">
                <label className="block text-xs font-medium text-text-secondary mb-2 font-body">
                  {t.trackStatus.fullName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setNameError('') }}
                  onKeyDown={handleKeyDown}
                  placeholder={t.trackStatus.fullNamePlaceholder}
                  autoFocus
                  className="w-full px-4 py-4 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                {nameError && <p className="text-xs text-red-500 mt-1.5 font-body">{nameError}</p>}
              </div>

              {/* Mobile input */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-2 font-body">
                  {t.trackStatus.mobileNumber}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-body">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value.replace(/\D/g, '')); setMobileError('') }}
                    onKeyDown={handleKeyDown}
                    placeholder={t.trackStatus.mobilePlaceholder}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>
                {mobileError && <p className="text-xs text-red-500 mt-1.5 font-body">{mobileError}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDetailsSubmit}
                className="w-full mt-7 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-display font-semibold py-4 rounded-xl transition-colors text-sm"
              >
                {t.trackStatus.getOtp}
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <p className="text-[11px] text-text-light text-center mt-4 leading-relaxed">
                {t.trackStatus.termsText}{' '}
                <a href="/terms" className="text-primary underline underline-offset-2">{t.trackStatus.termsLink}</a>
                {' '}{t.trackStatus.and}{' '}
                <a href="/privacy-policy" className="text-primary underline underline-offset-2">{t.trackStatus.privacyLink}</a>
              </p>
            </motion.div>
          )}

          {step === 'otp' && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-sm"
            >
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                {t.trackStatus.verifyTitle}
              </h2>
              <p className="font-body text-sm text-text-secondary mb-7">
                {t.trackStatus.verifySubtitle} +91 {mobile}
              </p>

              <div className="flex gap-3 justify-center">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpDigits[i]}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    onPaste={(e) => {
                      e.preventDefault()
                      const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
                      if (pasted) handleOtpChange(i, pasted)
                    }}
                    autoFocus={i === 0}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-border bg-gray-50 text-center text-xl font-display font-bold text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                ))}
              </div>
              {error && <p className="text-xs text-red-500 text-center mt-3 font-body">{error}</p>}

              <div className="text-center mt-5">
                <p className="text-xs text-text-light">
                  {t.trackStatus.didNotReceive}{' '}
                  {resendTimer > 0 ? (
                    <span className="text-text-secondary font-medium">{t.trackStatus.resendIn} {resendTimer}s</span>
                  ) : (
                    <button
                      onClick={startResendTimer}
                      className="text-primary font-medium hover:underline"
                    >
                      {t.trackStatus.resendOtp}
                    </button>
                  )}
                </p>
              </div>

              <div className="flex gap-3 mt-7">
                <button
                  onClick={() => { setStep('details'); setOtpDigits(['', '', '', '']); setError('') }}
                  className="flex items-center justify-center gap-1.5 px-5 py-4 rounded-xl border border-border text-sm font-display font-semibold text-text-secondary hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.trackStatus.back}
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOtpSubmit}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-display font-semibold py-4 rounded-xl transition-colors text-sm"
                >
                  {t.trackStatus.submitOtp}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// --- Sidebar Tab Button ---
function SidebarTabButton({
  active,
  icon: Icon,
  label,
  tooltip,
  onClick,
}: {
  active: boolean
  icon: typeof FileText
  label: string
  tooltip: string
  onClick: () => void
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-1 md:flex-none flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all relative',
        active
          ? 'bg-primary text-white shadow-md border-l-4 border-l-primary/50 md:border-l-4'
          : 'bg-white border border-border text-text-secondary hover:bg-gray-50'
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="flex-1 text-left">{label}</span>
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Info className={cn('w-3.5 h-3.5', active ? 'text-white/60' : 'text-gray-400')} />
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-gray-900 text-white text-[10px] leading-relaxed rounded-lg shadow-lg z-50 pointer-events-none">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
          </div>
        )}
      </div>
    </button>
  )
}

// --- Dashboard Section ---
function DashboardSection() {
  const { t } = useTranslation()
  const { userName, userMobile } = useUserStore()
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('challan')
  const [filterTab, setFilterTab] = useState<FilterTab>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [faqOpen, setFaqOpen] = useState(false)
  const [selectedChallan, setSelectedChallan] = useState<TrackingChallan | null>(null)
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  const [expandedVehicleSections, setExpandedVehicleSections] = useState<Record<string, Set<string>>>({})

  const toggleVehicleSection = (vehicleNumber: string, section: string) => {
    setExpandedVehicleSections((prev) => {
      const current = prev[vehicleNumber] ?? new Set<string>()
      const next = new Set(current)
      if (next.has(section)) next.delete(section)
      else next.add(section)
      return { ...prev, [vehicleNumber]: next }
    })
  }

  const isVehicleSectionOpen = (vehicleNumber: string, section: string) =>
    expandedVehicleSections[vehicleNumber]?.has(section) ?? false

  const stats = useMemo(() => {
    const submitted = MOCK_CHALLANS.length
    const resolved = MOCK_CHALLANS.filter(c => c.status === 'resolved').length
    const inProgress = MOCK_CHALLANS.filter(c => c.status === 'in-progress' || c.status === 'not-settled').length
    const refund = MOCK_CHALLANS.filter(c => c.status === 'refund').length
    return { submitted, resolved, inProgress, refund }
  }, [])

  const filteredChallans = useMemo(() => {
    let result = MOCK_CHALLANS
    if (filterTab !== 'all') {
      result = result.filter(c => c.status === filterTab)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.challanNumber.toLowerCase().includes(q) ||
        c.vehicleNumber.toLowerCase().includes(q) ||
        c.incidentId.toLowerCase().includes(q)
      )
    }
    return result
  }, [filterTab, searchQuery])

  const STATS_CARDS = [
    { label: t.trackStatus.challansSubmitted, value: stats.submitted, icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { label: t.trackStatus.resolvedChallans, value: stats.resolved, icon: CircleCheck, color: 'bg-emerald-50 text-emerald-600' },
    { label: t.trackStatus.challansInProgress, value: stats.inProgress, icon: Hourglass, color: 'bg-red-50 text-red-500' },
    { label: t.trackStatus.refundChallans, value: stats.refund, icon: AlertCircle, color: 'bg-red-50 text-red-500' },
  ]

  const FILTER_TABS: { key: FilterTab; label: string }[] = [
    { key: 'all', label: t.trackStatus.allFilter },
    { key: 'in-progress', label: t.trackStatus.inProgressFilter },
    { key: 'resolved', label: t.trackStatus.resolvedFilter },
    { key: 'refund', label: t.trackStatus.refundFilter },
  ]

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-6 overflow-x-hidden">
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl border border-border p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-text-primary">
            {t.trackStatus.welcome} {userName}
          </h1>
          <p className="text-sm text-text-secondary">{t.trackStatus.mNo} {userMobile}</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="md:sticky md:top-24 md:self-start md:min-h-[calc(100vh-7rem)] bg-white rounded-2xl border border-border p-3">
          <nav className="flex md:flex-col gap-2">
            <SidebarTabButton
              active={sidebarTab === 'challan'}
              icon={FileText}
              label={t.trackStatus.challanInfo}
              tooltip={t.trackStatus.challanInfoTooltip}
              onClick={() => { setSidebarTab('challan'); setSelectedChallan(null) }}
            />
            <SidebarTabButton
              active={sidebarTab === 'vehicle'}
              icon={Car}
              label={t.trackStatus.vehicleInfo}
              tooltip={t.trackStatus.vehicleInfoTooltip}
              onClick={() => { setSidebarTab('vehicle'); setSelectedChallan(null) }}
            />
          </nav>
        </aside>

        {/* Content */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {sidebarTab === 'challan' ? (
              selectedChallan ? (
                <ChallanDetailView
                  key="detail"
                  challan={selectedChallan}
                  onBack={() => setSelectedChallan(null)}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS_CARDS.map((card) => (
                      <div key={card.label} className="bg-white rounded-xl border border-border p-4">
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center mb-3', card.color)}>
                          <card.icon className="w-5 h-5" />
                        </div>
                        <p className="font-display text-2xl font-bold text-text-primary">{card.value}</p>
                        <p className="text-xs text-text-secondary mt-1">{card.label}</p>
                      </div>
                    ))}
                  </div>


                  {/* Challans Information */}
                  <div className="mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <h2 className="font-display font-bold text-lg text-text-primary">
                        {t.trackStatus.challansInformation}
                      </h2>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder={t.trackStatus.searchChallan}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 pr-4 py-2.5 rounded-lg border border-border bg-gray-50 text-sm text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all w-full sm:w-56"
                        />
                      </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto">
                      {FILTER_TABS.map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setFilterTab(tab.key)}
                          className={cn(
                            'px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap',
                            filterTab === tab.key
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                          )}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Challan Cards Grid */}
                    {filteredChallans.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredChallans.map((challan) => (
                          <div
                            key={challan.id}
                            className="bg-white rounded-xl border border-border p-5 hover:border-primary/30 transition-all"
                          >
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <p className="font-display font-bold text-sm text-text-primary truncate">
                                {challan.challanNumber}
                              </p>
                              <span className={cn(
                                'flex-shrink-0 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full',
                                STATUS_BADGE[challan.status].className
                              )}>
                                {challan.status === 'not-settled' ? t.trackStatus.notSettled : challan.status === 'in-progress' ? t.trackStatus.inProgress : challan.status === 'resolved' ? t.trackStatus.resolved : t.trackStatus.refund}
                              </span>
                            </div>
                            <div className="space-y-1.5 text-sm text-text-secondary">
                              <p>{t.trackStatus.vehicle}: <span className="font-medium text-text-primary">{challan.vehicleNumber}</span></p>
                              <p>{t.trackStatus.incident}: <span className="font-medium text-text-primary">{challan.incidentId}</span></p>
                            </div>
                            <button
                              onClick={() => setSelectedChallan(challan)}
                              className="flex items-center gap-1 mt-4 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                              {t.trackStatus.viewDetails}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-xl border border-border p-8 text-center">
                        <p className="text-sm text-text-secondary">{t.trackStatus.noChallansFound}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            ) : (
              /* Vehicle Info Tab */
              <motion.div
                key="vehicle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg text-text-primary">
                    {t.trackStatus.vehicleDetails}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddVehicleModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    {t.trackStatus.addVehicle}
                  </motion.button>
                </div>

                {MOCK_VEHICLES.length > 0 ? (
                  MOCK_VEHICLES.map((vehicle) => {
                    const SECTIONS = [
                      {
                        id: 'owner',
                        label: 'Owner Details',
                        icon: User,
                        iconBg: 'bg-blue-50',
                        iconColor: 'text-blue-600',
                        rows: [
                          { label: 'Owner Name', value: vehicle.ownerName },
                          { label: 'Father Name', value: vehicle.fatherName },
                          { label: 'Address', value: vehicle.address },
                        ],
                      },
                      {
                        id: 'key',
                        label: 'Key Details',
                        icon: Shield,
                        iconBg: 'bg-amber-50',
                        iconColor: 'text-amber-600',
                        rows: [
                          { label: 'PUC Expiry', value: vehicle.pucExpiry },
                          { label: 'Insurance Expiry', value: vehicle.insuranceExpiry },
                          { label: 'RC Expiry', value: vehicle.rcExpiry },
                        ],
                      },
                      {
                        id: 'vehicle',
                        label: 'Vehicle Details',
                        icon: Car,
                        iconBg: 'bg-emerald-50',
                        iconColor: 'text-emerald-600',
                        rows: [
                          { label: 'Make & Model', value: vehicle.makeModel },
                          { label: 'Type / Color', value: `${vehicle.vehicleType} — ${vehicle.vehicleTypeColor}` },
                          { label: 'Engine No.', value: vehicle.engineNumber },
                          { label: 'Chassis No.', value: vehicle.chassisNumber },
                        ],
                      },
                    ] as const

                    return (
                      <div
                        key={vehicle.vehicleNumber}
                        className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                      >
                        {/* Header — license plate + context */}
                        <div className="bg-white px-5 py-5">
                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Car className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              {/* License plate badge */}
                              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border-2 border-gray-900 bg-white mb-2">
                                <span className="font-display font-bold text-[13px] text-gray-900 tracking-widest">
                                  {vehicle.vehicleNumber}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm text-text-secondary">{vehicle.makeModel}</p>
                                <span className="text-text-light">·</span>
                                <span className="text-xs font-medium text-text-light bg-gray-100 px-2 py-0.5 rounded-full">
                                  {vehicle.vehicleType}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Accordion Sections */}
                        <div>
                          {SECTIONS.map((section, idx) => {
                            const SectionIcon = section.icon
                            const isOpen = isVehicleSectionOpen(vehicle.vehicleNumber, section.id)
                            return (
                              <div key={section.id} className="border-t border-border">
                                <button
                                  onClick={() => toggleVehicleSection(vehicle.vehicleNumber, section.id)}
                                  className={cn(
                                    'w-full flex items-center gap-3 px-5 py-3.5 transition-colors',
                                    isOpen ? 'bg-gray-50/80' : 'hover:bg-gray-50/50'
                                  )}
                                >
                                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0', section.iconBg)}>
                                    <SectionIcon className={cn('w-3.5 h-3.5', section.iconColor)} />
                                  </div>
                                  <span className="flex-1 text-left text-sm font-medium text-text-primary">{section.label}</span>
                                  <ChevronRight className={cn(
                                    'w-4 h-4 text-text-light transition-transform duration-200',
                                    isOpen && 'rotate-90'
                                  )} />
                                </button>
                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mx-5 mb-4 rounded-xl bg-gray-50 border border-gray-100 divide-y divide-gray-100">
                                        {section.rows.map((row) => (
                                          <div key={row.label} className="px-4 py-3 flex items-baseline justify-between gap-4">
                                            <p className="text-xs text-text-light whitespace-nowrap">{row.label}</p>
                                            <p className="text-sm font-medium text-text-primary text-right">{row.value}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="bg-white rounded-xl border border-border p-8 text-center">
                    <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">{t.trackStatus.noVehicles}</p>
                    <p className="text-xs text-text-light mt-1">{t.trackStatus.addVehicleHint}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <AnimatePresence>
        {showAddVehicleModal && (
          <AddVehicleModal onClose={() => setShowAddVehicleModal(false)} />
        )}
      </AnimatePresence>
    </div>
    </div>
  )
}

// --- Main Page ---
export function TrackStatusPage() {
  const { userName, setUser } = useUserStore()
  const isLoggedIn = !!userName

  const handleLoginSuccess = (name: string, mobile: string) => {
    setUser(name, mobile)
  }

  return (
    <PageTransition>
      <div>
        {isLoggedIn ? (
          <DashboardSection />
        ) : (
          <LoginSection onSuccess={handleLoginSuccess} />
        )}
      </div>
    </PageTransition>
  )
}
