import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

export function StatsSection() {
  const { t } = useTranslation()

  const stats = [
    { icon: '/images/Frame-1618873258.png', number: '30 Lakhs+', label: t.stats.vehiclesProtected },
    { icon: '/images/Frame-1618873259.png', number: '2.5 Lakhs+', label: t.stats.challansResolved },
    { icon: '/images/Frame-1618873261.png', number: '65,000+', label: t.stats.legalIncidentsResolved },
    { icon: '/images/Frame-1618873260.png', number: '₹75 Crore+', label: t.stats.savingsOnLegalFees },
    { icon: '/images/Frame-1618873259.png', number: '80,000+', label: t.stats.lawyersNetwork },
    { icon: '/images/Frame-1618873260.png', number: '99%', label: t.stats.successfulResolutions },
    { icon: '/images/Frame-1618873258.png', number: '98%', label: t.stats.pinCodesCovered },
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 sm:p-5 md:p-6 rounded-2xl bg-muted/50 border border-transparent">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={stat.icon}
                    alt={`${stat.label} Icon`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="font-body text-xs sm:text-sm text-text-secondary mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
