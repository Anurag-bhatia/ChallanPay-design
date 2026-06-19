import { Phone } from 'lucide-react'

const SUPPORT_NUMBER = '+919988441033'

export function FloatingCallButton() {
  return (
    <a
      href={`tel:${SUPPORT_NUMBER}`}
      aria-label="Call ChallanPay support"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 inline-flex items-center gap-2 pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-3 sm:py-3.5 rounded-full bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/30 hover:bg-primary-dark hover:shadow-xl hover:shadow-primary/40 transition-all"
    >
      <span className="relative inline-flex items-center justify-center w-5 h-5">
        <span aria-hidden="true" className="absolute inline-flex w-full h-full rounded-full bg-white/40 animate-ping" />
        <Phone className="relative w-4 h-4" aria-hidden="true" />
      </span>
      <span>Call Us</span>
    </a>
  )
}
