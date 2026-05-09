import { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

const logos = [
  { src: '/images/91Trucks.png', alt: '91 Trucks' },
  { src: '/images/ALD.png', alt: 'ALD' },
  { src: '/images/CarInfo.png', alt: 'CARInfo' },
  { src: '/images/Cars24.png', alt: 'CARS24' },
  { src: '/images/Droom.png', alt: 'droom' },
  { src: '/images/OLX.png', alt: 'OLX' },
  { src: '/images/Park+.png', alt: 'Park+' },
  { src: '/images/Renewbuy.png', alt: 'Renewbuy' },
  { src: '/images/Spinny.png', alt: 'Spinny' },
]

export function TrustedLogosScroll() {
  const { t } = useTranslation()
  const [paused, setPaused] = useState(false)

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-10 md:mb-12">
        <ScrollReveal>
          <h3 className="font-display text-base md:text-lg font-semibold text-center text-text-primary">
            {t.trustedLogos.title}
          </h3>
        </ScrollReveal>
      </div>

      {/* Infinite scroll wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Pause/play control — visible on focus, also on hover for mouse users */}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play logo carousel' : 'Pause logo carousel'}
          aria-pressed={paused}
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-20 focus:w-11 focus:h-11 focus:bg-white focus:border focus:border-border focus:rounded-full focus:flex focus:items-center focus:justify-center focus:shadow-md focus:text-text-secondary"
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>

        {/* Scrolling track */}
        <div
          className="flex animate-scroll-left hover:[animation-play-state:paused]"
          style={paused ? { animationPlayState: 'paused' } : undefined}
        >
          {/* First set */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-8 md:px-12"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-6 md:h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center px-8 md:px-12"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-6 md:h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
