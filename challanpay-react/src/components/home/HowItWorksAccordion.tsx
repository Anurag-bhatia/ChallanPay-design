import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/useTranslation'

export function HowItWorksAccordion() {
  const [activeStep, setActiveStep] = useState(0)
  const { t } = useTranslation()

  const steps = [
    {
      number: '01',
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      image: '/images/A1.png',
    },
    {
      number: '02',
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      image: '/images/A2.png',
    },
    {
      number: '03',
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      image: '/images/A3.png',
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {t.howItWorks.title}
            </h2>
            <p className="font-body text-text-secondary mt-3 text-lg">
              {t.howItWorks.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left - Accordion */}
          <div className="w-full lg:w-1/2 space-y-3">
            {steps.map((step, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div
                  className={cn(
                    'rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden',
                    activeStep === index
                      ? 'border-primary bg-primary text-white shadow-md'
                      : 'border-border bg-white hover:border-primary/40 hover:shadow-sm'
                  )}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-5 md:p-6">
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          'font-display text-sm font-bold rounded-full w-9 h-9 flex items-center justify-center transition-colors',
                          activeStep === index
                            ? 'bg-white text-primary'
                            : 'bg-muted text-text-secondary'
                        )}
                      >
                        {step.number}
                      </span>
                      <h3 className={cn('font-display text-base md:text-lg font-semibold', activeStep === index ? 'text-white' : 'text-text-primary')}>
                        {step.title}
                      </h3>
                    </div>
                    <ArrowRight
                      className={cn(
                        'w-5 h-5 transition-transform duration-300 flex-shrink-0',
                        activeStep === index
                          ? 'text-white rotate-90'
                          : 'text-text-light'
                      )}
                    />
                  </div>

                  {/* Content */}
                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6">
                          <p className="font-body text-sm md:text-base text-white/90 leading-relaxed pl-13">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right - Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center sticky top-24">
            <ScrollReveal direction="right">
              <div className="relative w-full max-w-md mx-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src={steps[activeStep].image}
                    alt={steps[activeStep].title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-auto rounded-2xl"
                  />
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
