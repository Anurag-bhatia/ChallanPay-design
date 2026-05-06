import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserStore } from '@/stores/userStore'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

export function HeroSection() {
  const [vehicleInput, setVehicleInput] = useState('')
  const { setVehicleNumber, openVerificationModal } = useUserStore()
  const { t } = useTranslation()

  const handleCheck = () => {
    if (!vehicleInput.trim()) return
    setVehicleNumber(vehicleInput.trim().toUpperCase())
    openVerificationModal()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheck()
    }
  }

  return (
    <section
      id="track"
      className="relative pt-6 md:pt-20 overflow-hidden bg-[#f9fafb]"
    >
      {/* Background illustration */}
      <div
        className="absolute inset-0 opacity-50 bg-contain bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/images/hero-illustration.png')", backgroundSize: '80%' }}
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-4 md:pt-12 pb-10 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 md:gap-12 items-start">
          {/* Left Column - Text */}
          <div className="text-center md:text-left pt-2 md:pt-8">
            {/* Heading */}
            <ScrollReveal>
              <h1 className="font-display text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-text-primary mb-6 leading-tight">
                {t.hero.title}
              </h1>
            </ScrollReveal>

            {/* Subtext */}
            <ScrollReveal delay={0.1}>
              <p className="font-body text-lg md:text-xl text-text-secondary mb-8 max-w-lg">
                {t.hero.subtitle}
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column - Challan Check Card */}
          <ScrollReveal direction="scale" delay={0.2}>
            <div className="bg-white rounded-3xl shadow-[0_2px_14px_rgba(0,0,0,0.06)] p-6 md:p-8 max-w-[420px] mx-auto w-full relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {t.hero.enterVehicleNumber}
                </h3>
                <span className="px-3 py-1 text-xs font-extrabold bg-[#C6FBEA] text-[#08714F] rounded-full uppercase tracking-wide animate-shimmer">
                  {t.hero.free}
                </span>
              </div>

              {/* Input group */}
              <div className="space-y-5">
                <div className="flex items-center bg-[#F7F8FA] border-2 border-[#E5E7EB] rounded-[14px] overflow-hidden focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(8,145,178,0.1)] transition-all">
                  <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-[#E5E7EB]">
                    <img
                      src="/images/flag.png"
                      alt="India Flag"
                      className="w-7 h-auto object-contain"
                    />
                  </div>
                  <input
                    type="text"
                    value={vehicleInput}
                    onChange={(e) => setVehicleInput(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    placeholder={t.hero.placeholder}
                    aria-label="Vehicle number"
                    className="flex-1 px-4 py-3.5 text-base font-body font-medium text-text-primary placeholder:text-[#9CA3AF] placeholder:normal-case outline-none bg-transparent uppercase tracking-wider"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheck}
                  className="w-full flex items-center justify-center gap-2 bg-[#EF4444] hover:bg-[#DC2626] text-white font-display font-semibold py-4 px-6 rounded-[14px] transition-colors text-base"
                >
                  {t.hero.checkChallans}
                </motion.button>

              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  )
}
