import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Link } from 'react-router'
import { useTranslation } from '@/hooks/useTranslation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface NewsItem {
  publication: string
  logo: string
  title: string
  excerpt: string
  date: string
}

const newsItems: NewsItem[] = [
  {
    publication: 'IdeaBaaz',
    logo: '/images/image-10.png',
    title: 'Lawyered Secures Rs 8.5 Crore All-Titan Deal on IdeaBaaz',
    excerpt:
      'Legal-tech innovator receives unanimous backing from all IdeaBaaz Titans in landmark investment at Rs 120 crore valuation.',
    date: 'December 15, 2025',
  },
  {
    publication: 'ThePrint',
    logo: '/images/image-11.png',
    title: "Wrong Traffic Challan? Why EV Owners Face an 'Uphill Battle'",
    excerpt:
      "Addresses the challenge of correcting erroneous e-challans in India's digitized traffic system and camera-based enforcement.",
    date: 'December 12, 2025',
  },
  {
    publication: 'APN News',
    logo: '/images/image-92.png',
    title: "India's E-Challan Backlog Crisis",
    excerpt:
      'Approximately 60% of fines tied up in courts with only 27.5% closure rate since 2019. Understanding the mounting backlog.',
    date: 'September 2025',
  },
  {
    publication: 'SugerMint',
    logo: '/images/image-93.png',
    title: 'Revolutionizing On-Road Legal Support',
    excerpt:
      'LOTS platform connecting users to 70,000+ lawyers for immediate traffic violation assistance, operating 24/7 across India.',
    date: 'March 15, 2025',
  },
  {
    publication: 'YourStory',
    logo: '/images/image-10.png',
    title: 'ChallanPay Reaches 1.5 Lakh+ Resolutions',
    excerpt:
      'Proud milestone in helping Indian citizens resolve traffic challans with 98% success rate and ₹53Cr+ savings on legal fees.',
    date: 'January 2026',
  },
]

function NewsCard({ item, readMoreLabel }: { item: NewsItem; readMoreLabel: string }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <img
          src={item.logo}
          alt={item.publication}
          className="h-6 w-auto object-contain object-left mb-3 self-start"
        />
        <h4 className="font-display text-base font-semibold text-text-primary mb-2 line-clamp-2">
          {item.title}
        </h4>
        <p className="font-body text-sm text-text-secondary line-clamp-3 flex-1">
          {item.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <span className="font-body text-xs text-text-light">
            {item.date}
          </span>
          <span className="inline-flex items-center gap-1 text-primary text-sm font-medium cursor-pointer hover:gap-2 transition-all">
            {readMoreLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

export function NewsPreview() {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const track = trackRef.current
    if (!track) return

    let rafId = 0
    let lastTime = performance.now()
    const speed = 50 // px/sec

    const tick = (time: number) => {
      const dt = time - lastTime
      lastTime = time
      if (!pausedRef.current && track.scrollWidth > track.clientWidth) {
        const half = track.scrollWidth / 2
        let next = track.scrollLeft + (speed * dt) / 1000
        if (next >= half) next -= half
        track.scrollLeft = next
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [prefersReducedMotion])

  const pause = () => {
    pausedRef.current = true
  }
  const resume = () => {
    pausedRef.current = false
  }

  return (
    <section className="py-16 md:py-20 bg-bg-dark overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              {t.newsPreview.title}
            </h2>
            <p className="font-body text-gray-400 mt-3 text-lg">
              {t.newsPreview.subtitle}
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Scrolling carousel — auto-scrolls, manual scroll/drag also works */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-6 md:w-16 bg-gradient-to-r from-bg-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 md:w-16 bg-gradient-to-l from-bg-dark to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex overflow-x-auto scrollbar-hide"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onTouchCancel={resume}
        >
          {newsItems.map((item, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-[78vw] max-w-[340px] md:w-[350px] md:max-w-none mx-3"
            >
              <NewsCard item={item} readMoreLabel={t.newsPreview.readMore} />
            </div>
          ))}
          {newsItems.map((item, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-[78vw] max-w-[340px] md:w-[350px] md:max-w-none mx-3"
            >
              <NewsCard item={item} readMoreLabel={t.newsPreview.readMore} />
            </div>
          ))}
        </div>
      </div>

      {/* View More Link */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mt-10">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 font-display font-semibold text-primary hover:text-primary-dark transition-colors text-base group"
            >
              {t.newsPreview.viewAll}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
