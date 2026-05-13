import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

const partners = [
  { src: '/images/image-27.png', alt: 'Supporter 1' },
  { src: '/images/image-47.png', alt: 'Supporter 2' },
  { src: '/images/image-52.png', alt: 'Supporter 3' },
  { src: '/images/image-19.png', alt: 'Supporter 4' },
  { src: '/images/EntrepreneurIndia.webp', alt: 'Entrepreneur India' },
  { src: '/images/MSME.webp', alt: 'Ministry of MSME, Govt. of India' },
]

export function PartnersSection() {
  const { t } = useTranslation()

  const renderCard = (partner: typeof partners[number], key: string) => (
    <div
      key={key}
      className="flex items-center justify-center px-4 py-3 md:px-8 md:py-4 bg-white rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-[150px] sm:w-auto"
    >
      <img
        src={partner.src}
        alt={partner.alt}
        className="h-10 md:h-12 w-auto object-contain"
        role="presentation"
      />
    </div>
  )

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-center text-text-primary mb-10">
            {t.partners.title}
          </h3>
        </ScrollReveal>

        {/* Mobile: auto-scrolling marquee (pause on hover/touch) */}
        <div className="sm:hidden overflow-hidden -mx-4">
          <div className="flex gap-4 w-max animate-scroll-left hover:[animation-play-state:paused] [&:has(*:active)]:[animation-play-state:paused] px-4">
            {partners.map((p, i) => renderCard(p, `a-${i}`))}
            {partners.map((p, i) => renderCard(p, `b-${i}`))}
          </div>
        </div>

        {/* Tablet/Desktop: static grid */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              {renderCard(partner, `grid-${index}`)}
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
