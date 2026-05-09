import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { EmptyState } from '@/components/shared/EmptyState'
import { useTranslation } from '@/hooks/useTranslation'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface NewsItem {
  id: number
  publication: string
  logo: string
  title: string
  excerpt: string
  date: string
  year: number
}

const allNews: NewsItem[] = [
  {
    id: 1,
    publication: 'IdeaBaaz',
    logo: '/images/image-10.png',
    title: 'Lawyered Secures Rs 8.5 Crore All-Titan Deal on IdeaBaaz',
    excerpt: 'Legal-tech innovator receives unanimous backing from all IdeaBaaz Titans in landmark investment at Rs 120 crore valuation.',
    date: 'December 15, 2025',
    year: 2025,
  },
  {
    id: 2,
    publication: 'ThePrint',
    logo: '/images/image-11.png',
    title: "Wrong Traffic Challan? Why EV Owners Face an 'Uphill Battle'",
    excerpt: "Addresses the challenge of correcting erroneous e-challans in India's digitized traffic system and camera-based enforcement.",
    date: 'December 12, 2025',
    year: 2025,
  },
  {
    id: 3,
    publication: 'APN News',
    logo: '/images/image-92.png',
    title: "India's E-Challan Backlog Crisis",
    excerpt: 'Approximately 60% of fines tied up in courts with only 27.5% closure rate since 2019. Understanding the mounting backlog.',
    date: 'September 2025',
    year: 2025,
  },
  {
    id: 4,
    publication: 'SugerMint',
    logo: '/images/image-93.png',
    title: 'Revolutionizing On-Road Legal Support',
    excerpt: 'LOTS platform connecting users to 70,000+ lawyers for immediate traffic violation assistance, operating 24/7 across India.',
    date: 'March 15, 2025',
    year: 2025,
  },
  {
    id: 5,
    publication: 'YourStory',
    logo: '/images/image-10.png',
    title: 'ChallanPay Reaches 1.5 Lakh+ Resolutions',
    excerpt: 'Proud milestone in helping Indian citizens resolve traffic challans with 98% success rate and ₹53Cr+ savings on legal fees.',
    date: 'January 2026',
    year: 2026,
  },
  {
    id: 6,
    publication: 'ThePrint',
    logo: '/images/image-11.png',
    title: 'How Digital Enforcement Is Changing Indian Roads',
    excerpt: 'An in-depth look at how AI-powered traffic cameras and e-challans are transforming road safety enforcement across major Indian cities.',
    date: 'February 2026',
    year: 2026,
  },
  {
    id: 7,
    publication: 'APN News',
    logo: '/images/image-92.png',
    title: 'Traffic Fines Collection Crosses ₹10,000 Crore Mark',
    excerpt: 'India collects record traffic fines as digital enforcement expands to tier-2 and tier-3 cities. Understanding the implications for vehicle owners.',
    date: 'November 2025',
    year: 2025,
  },
  {
    id: 8,
    publication: 'IdeaBaaz',
    logo: '/images/image-10.png',
    title: 'Legal-Tech Startups See 3x Growth in 2025',
    excerpt: 'The legal-tech sector in India witnesses unprecedented growth driven by traffic challan digitization and consumer demand for online resolution.',
    date: 'October 2025',
    year: 2025,
  },
  {
    id: 9,
    publication: 'SugerMint',
    logo: '/images/image-93.png',
    title: 'ChallanPay Expands to 98% Pin Codes Nationwide',
    excerpt: 'With a network of 80,000+ lawyers, ChallanPay now covers virtually every pin code in India for traffic challan resolution services.',
    date: 'August 2025',
    year: 2025,
  },
]

const ITEMS_PER_PAGE = 6
const YEARS = [2026, 2025]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function NewsPage() {
  const { t } = useTranslation()
  const [activeYear, setActiveYear] = useState<number | null>(null)
  const [page, setPage] = useState(1)

  const featured = allNews.slice(0, 3)

  const filtered = activeYear
    ? allNews.filter((n) => n.year === activeYear)
    : allNews

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  const handleYearChange = (year: number | null) => {
    setActiveYear(year)
    setPage(1)
  }

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="relative pt-8 md:pt-12 pb-12 md:pb-16 overflow-hidden bg-bg-page">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ScrollReveal>
              <div className="pt-4 md:pt-8">
                <h1 className="font-display text-4xl md:text-5xl font-extrabold text-text-primary mb-4">
                  {t.news.heroTitle}
                </h1>
                <p className="font-body text-lg text-text-secondary max-w-lg">
                  {t.news.heroSubtitle}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <img
                src="/images/news-hero.png"
                alt="ChallanPay News"
                className="w-full max-w-md mx-auto md:ml-auto rounded-2xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Featured Stories ── */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-8">
              {t.news.featuredStories}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <article className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col">
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <img
                      src={item.logo}
                      alt={item.publication}
                      className="h-8 w-auto object-contain object-left mb-3 self-start"
                    />
                    <h3 className="font-display text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed flex-1 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="font-body text-xs text-text-light">{item.date}</span>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium cursor-pointer hover:gap-2 transition-all">
                        {t.news.readMore}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─�� All News ── */}
      <section className="py-14 md:py-18 bg-bg-page">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                {t.news.allNews}
              </h2>
              {/* Year Tabs */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleYearChange(null)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    activeYear === null
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border text-text-secondary hover:bg-gray-50',
                  )}
                >
                  {t.news.all}
                </button>
                {YEARS.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                      activeYear === year
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border text-text-secondary hover:bg-gray-50',
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* News Grid */}
          {paginated.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border">
              <EmptyState
                icon={Newspaper}
                title={activeYear ? `No news from ${activeYear}` : 'No news yet'}
                description={
                  activeYear
                    ? 'Try a different year or browse all news.'
                    : "We're working on new content. Check back soon."
                }
                action={activeYear ? { label: 'Show all news', onClick: () => handleYearChange(null) } : undefined}
              />
            </div>
          ) : (
          <div className="space-y-4">
            {paginated.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.06}>
                <article className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={item.logo}
                          alt={item.publication}
                          className="h-7 w-auto object-contain"
                        />
                        <span className="font-body text-xs text-text-light">{item.date}</span>
                      </div>
                      <h3 className="font-display text-base md:text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
                        {item.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium cursor-pointer hover:gap-2 transition-all mt-3 self-start">
                        {t.news.readMore}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 min-h-11 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.news.previous}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'w-11 h-11 rounded-lg text-sm font-medium transition-colors',
                    page === p
                      ? 'bg-primary text-white'
                      : 'border border-border text-text-secondary hover:bg-white',
                  )}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 min-h-11 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {t.news.next}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
