import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Users, TrendingUp, Shield, Zap, X, MessageCircle, CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const topEarners = [
  { name: 'Rajesh Kumar', earning: '₹8,570' },
  { name: 'Suresh Mehta', earning: '₹6,520' },
  { name: 'Prakash Sharma', earning: '₹5,354' },
]

const stats = [
  { icon: '/images/Frame-1618873258.png', number: '30 Lakhs+', label: 'Vehicles Secured' },
  { icon: '/images/Frame-1618873259.png', number: '2.5 Lakhs+', label: 'Challans Resolved' },
  { icon: '/images/Frame-1618873260.png', number: '₹75 Crore+', label: 'Legal Cost Savings' },
  { icon: '/images/Frame-1618873260.png', number: '99%', label: 'Success Rate' },
]

const howItWorks = [
  {
    icon: Users,
    title: 'Customer Scans QR',
    description: 'Customers scan your unique QR code to instantly check their vehicle challans.',
  },
  {
    icon: TrendingUp,
    title: 'Discover & Resolve Challans',
    description: 'The system identifies pending challans and enables quick, secure payment and resolution in one seamless flow.',
  },
  {
    icon: Shield,
    title: 'You Earn Fees',
    description: 'You earn a commission fee for every challan successfully checked and paid through your QR code.',
  },
]

const faqs = [
  {
    question: 'How do I become a Road Smart Partner?',
    answer: 'Simply fill out the registration form on this page or contact us via WhatsApp. Our team will guide you through the onboarding process and provide you with your unique referral code.',
  },
  {
    question: 'How does the partner program work?',
    answer: 'As a partner, you share your referral link with vehicle owners. When they use ChallanPay to resolve their challans through your link, you earn a commission on each successful resolution.',
  },
  {
    question: 'How much can I earn?',
    answer: 'Earnings depend on the number of successful referrals. Our top partners earn ₹5,000-₹10,000+ per month. There is no upper limit — the more referrals, the more you earn.',
  },
  {
    question: 'Can I manage multiple outlets or locations?',
    answer: 'Yes! You can manage referrals across multiple outlets or locations. Each location can have its own tracking code for detailed performance analytics.',
  },
  {
    question: 'When do I receive my commission?',
    answer: 'Commissions are processed weekly. Once a challan is successfully resolved, your commission is added to your balance and paid out every Monday.',
  },
  {
    question: 'How can I track my performance?',
    answer: 'You get access to a dedicated partner dashboard where you can track referrals, conversions, earnings, and payouts in real-time.',
  },
  {
    question: 'Is there a minimum payout amount?',
    answer: 'No, there is no minimum payout threshold. All earnings are transferred to your bank account during the weekly payout cycle.',
  },
  {
    question: 'Who can I contact for support?',
    answer: 'Our partner support team is available 24/7 on WhatsApp. You can also email us at support@challanpay.com for any queries.',
  },
]

/* ------------------------------------------------------------------ */
/*  Registration Form Modal                                            */
/* ------------------------------------------------------------------ */

function RegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', mobile: '', city: '', business: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build WhatsApp message with form data
    const msg = `Hi, I want to become a Road Smart Partner.\n\nName: ${form.name}\nMobile: ${form.mobile}\nCity: ${form.city}\nBusiness Type: ${form.business}`
    window.open(
      `https://wa.me/919599648108?text=${encodeURIComponent(msg)}`,
      '_blank',
    )
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setForm({ name: '', mobile: '', city: '', business: '' })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                    Registration Sent!
                  </h3>
                  <p className="font-body text-sm text-text-secondary">
                    We've opened WhatsApp with your details. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2.5 bg-primary text-white font-display font-semibold rounded-xl text-sm hover:bg-primary/90 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-bold text-text-primary mb-1">
                    Register as a Partner
                  </h3>
                  <p className="font-body text-sm text-text-secondary mb-6">
                    Fill in your details and we'll get you started
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="font-body text-sm font-medium text-text-primary mb-1 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-text-primary mb-1 block">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        placeholder="Enter your mobile number"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-text-primary mb-1 block">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Enter your city"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-text-primary mb-1 block">
                        Business Type
                      </label>
                      <select
                        required
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      >
                        <option value="">Select business type</option>
                        <option value="RTO Agent">RTO Agent</option>
                        <option value="Insurance Agent">Insurance Agent</option>
                        <option value="Car Dealer">Car Dealer</option>
                        <option value="Fleet Owner">Fleet Owner</option>
                        <option value="Garage/Workshop">Garage / Workshop</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-display font-semibold py-3.5 rounded-xl transition-colors text-sm mt-2"
                    >
                      Register Now
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function RoadSmartPartnersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeHowItWorks, setActiveHowItWorks] = useState(0)

  return (
    <PageTransition>
      {/* Registration Modal */}
      <RegistrationModal open={isFormOpen} onClose={() => setIsFormOpen(false)} />

      {/* ── Hero ── */}
      <section className="relative pt-20 md:pt-28 pb-20 md:pb-24 overflow-hidden bg-gradient-to-br from-[#f0fdfa] via-white to-[#ecfdf5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-text-primary mb-5 leading-tight">
                Become a Road Smart Partner
              </h1>
              <p className="font-body text-lg text-text-secondary mb-8 max-w-lg mx-auto">
                Join India's fastest-growing challan resolution network. Earn by helping vehicle owners resolve their traffic challans hassle-free.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsFormOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white font-display font-semibold py-4 px-20 rounded-xl transition-colors text-lg"
              >
                Register Now
              </motion.button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center gap-3 p-5 md:p-6 rounded-2xl bg-muted/50 h-full">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
                    <img src={s.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="font-display text-xl md:text-2xl font-bold text-primary">{s.number}</div>
                    <div className="font-body text-sm text-text-secondary mt-0.5">{s.label}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Partner with Us ── */}
      <section className="py-16 md:py-20 bg-[#f0f1f3]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                Why Partner with Us?
              </h2>
              <p className="font-body text-text-secondary mt-3 text-lg">
                Earn more, build trust, and add value without operational complexity.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Real-time Challans Discovery', description: 'Help customers instantly discover and resolve pending challans through our unified platform and no manual effort required.' },
              { title: 'Earn Revenue', description: 'Unlock a new passive revenue stream with automated commission payouts on every successful transaction and zero paperwork.' },
              { title: 'Build Trust', description: 'Strengthen customer relationships by helping them resolve compliance issues quickly and transparently every day.' },
              { title: 'Zero Setup Cost', description: 'Get started immediately with no setup fees, no technical integration and zero compliance burden.' },
              { title: 'Unique QR Code', description: 'Receive a unique QR code linked to your account making it easy for walk-in customers to check and clear challans instantly.' },
              { title: 'More Footfall', description: 'Encourage repeat visits and strengthen customer loyalty by offering a value-added service at your location.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 h-full">
                  <h3 className="font-display text-lg font-bold text-emerald-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 md:py-20 bg-[#f9fafb]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                How It Works
              </h2>
              <p className="font-body text-text-secondary mt-3 text-lg">
                Start earning in 3 simple steps
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left - Steps */}
            <div className="w-full lg:w-1/2 space-y-4">
              {howItWorks.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="rounded-2xl border border-border bg-white p-5 md:p-6">
                    <div className="flex items-start gap-4">
                      <span className="font-display text-sm font-bold rounded-full w-9 h-9 flex items-center justify-center bg-primary text-white flex-shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-display text-base md:text-lg font-semibold text-text-primary mb-1.5">
                          {step.title}
                        </h3>
                        <p className="font-body text-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right - Image */}
            <div className="w-full lg:w-1/2 flex items-center justify-center sticky top-24">
              <ScrollReveal direction="right">
                <div className="relative w-full max-w-lg mx-auto">
                  <img
                    src="/images/how-it-works-rsp.webp"
                    alt="How it works - Road Smart Partner"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner Dashboard Preview ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                Your Partner Dashboard
              </h2>
              <p className="font-body text-text-secondary mt-3 text-lg">
                Track your earnings, customers, and performance in real-time
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <img
                src="/images/partner-dashboard.png"
                alt="Partner Dashboard - Track earnings, customers onboarded, vehicles, and challans"
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 md:py-20 bg-bg-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Earning?
            </h2>
            <p className="font-body text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of partners who are already earning with ChallanPay. No investment required — just your network.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsFormOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white font-display font-semibold py-4 px-20 rounded-xl transition-colors text-lg"
            >
              Register Now
            </motion.button>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
                Frequently Asked Questions
              </h2>
              <p className="font-body text-text-secondary mt-3 text-lg">
                Everything you need to know about the partner program
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-display font-semibold text-sm text-text-primary pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 text-text-light flex-shrink-0 transition-transform',
                        openFaq === i && 'rotate-180',
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all',
                      openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
                    )}
                  >
                    <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
