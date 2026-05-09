import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { EmptyState } from '@/components/shared/EmptyState'
import { useTranslation } from '@/hooks/useTranslation'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface BlogPost {
  id: number
  image: string
  title: string
  excerpt: string
  date: string
  author: string
}

const allBlogs: BlogPost[] = [
  {
    id: 1,
    image: '/images/blog-heading.webp',
    title: 'Lawyered Secures Rs 8.5 Crore All-Titan Deal on IdeaBaaz',
    excerpt: 'Legal-tech innovator receives unanimous backing from all IdeaBaaz Titans in landmark investment at Rs 120 crore valuation.',
    date: 'December 15, 2025',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 2,
    image: '/images/Blogs-img.png',
    title: "Wrong Traffic Challan? Why EV Owners Face an 'Uphill Battle'",
    excerpt: "Addresses the challenge of correcting erroneous e-challans in India's digitized traffic system and camera-based enforcement.",
    date: 'December 12, 2025',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 3,
    image: '/images/Blogs-img-1.png',
    title: "India's E-Challan Backlog Crisis Explained",
    excerpt: 'Approximately 60% of fines tied up in courts with only 27.5% closure rate since 2019. Understanding the mounting backlog.',
    date: 'November 28, 2025',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 4,
    image: '/images/blog-heading.webp',
    title: 'How LOTS Platform is Revolutionizing On-Road Legal Support',
    excerpt: 'LOTS platform connecting users to 70,000+ lawyers for immediate traffic violation assistance, operating 24/7 across India.',
    date: 'October 15, 2025',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 5,
    image: '/images/Blogs-img.png',
    title: 'New Traffic Rules for 2026: What You Need to Know',
    excerpt: 'Understanding the latest traffic regulations and how they affect your daily commute. Stay compliant and avoid unnecessary challans.',
    date: 'January 10, 2026',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 6,
    image: '/images/Blogs-img-1.png',
    title: '5 Ways to Avoid Common Traffic Challans',
    excerpt: 'Learn practical tips to stay safe on the road and avoid the most common traffic violations in India.',
    date: 'January 5, 2026',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 7,
    image: '/images/blog-heading.webp',
    title: 'GRAP Stage 4: Complete Guide for Vehicle Owners',
    excerpt: 'Everything you need to know about GRAP restrictions and how they affect your vehicle registration and daily commute.',
    date: 'December 28, 2025',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 8,
    image: '/images/Blogs-img.png',
    title: 'ChallanPay Reaches 1.5 Lakh+ Resolutions Milestone',
    excerpt: 'A proud milestone in helping Indian citizens resolve traffic challans with 98% success rate and ₹53Cr+ savings on legal fees.',
    date: 'September 2025',
    author: 'ChallanPay Team Editorial',
  },
  {
    id: 9,
    image: '/images/Blogs-img-1.png',
    title: 'Understanding Your Legal Rights During a Traffic Stop',
    excerpt: 'Know your rights when stopped by traffic police. A comprehensive guide to handling traffic violations and your legal options.',
    date: 'August 2025',
    author: 'ChallanPay Team Editorial',
  },
]

const ITEMS_PER_PAGE = 6

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BlogsPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)

  const featured = allBlogs[0]
  const rest = allBlogs.slice(1)
  const totalPages = Math.ceil(rest.length / ITEMS_PER_PAGE)
  const paginated = rest.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  const isEmpty = allBlogs.length === 0

  return (
    <PageTransition>
      {/* ── Hero ── */}
      <section className="relative pt-8 md:pt-12 pb-12 md:pb-16 overflow-hidden bg-bg-page">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <ScrollReveal>
              <div className="pt-4 md:pt-8">
                <h1 className="font-display text-4xl md:text-5xl font-extrabold text-text-primary mb-4">
                  {t.blogs.heroTitle}
                </h1>
                <p className="font-body text-lg text-text-secondary max-w-lg">
                  {t.blogs.heroSubtitle}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.15}>
              <img
                src="/images/blogs-hero.png"
                alt="ChallanPay Blogs"
                className="w-full max-w-md mx-auto md:ml-auto"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {isEmpty ? (
        <section className="py-14 md:py-18 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            <div className="bg-bg-page rounded-2xl border border-border">
              <EmptyState
                icon={FileText}
                title="No articles yet"
                description="We're working on new content. Check back soon for updates and insights."
              />
            </div>
          </div>
        </section>
      ) : (
      <>
      {/* ── Featured ── */}
      <section className="py-14 md:py-18 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <article className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover aspect-[16/10] md:aspect-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                    {t.blogs.featured}
                  </span>
                  <span className="font-body text-xs text-text-light mb-2">{featured.date}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="font-body text-text-secondary leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                  <span className="font-body text-xs text-text-light mb-4">
                    {t.blogs.by} {featured.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-primary font-display font-semibold text-sm cursor-pointer hover:gap-2.5 transition-all self-start">
                    {t.blogs.readArticle}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="py-14 md:py-18 bg-bg-page">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-8">
              {t.blogs.latestArticles}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((blog, i) => (
              <ScrollReveal key={blog.id} delay={i * 0.08}>
                <article className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <span className="font-body text-xs text-text-light mb-2">
                      {blog.date}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed flex-1 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium cursor-pointer hover:gap-2 transition-all mt-4 self-start">
                      {t.blogs.readMore}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 min-h-11 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {t.blogs.previous}
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
                {t.blogs.next}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
      </>
      )}
    </PageTransition>
  )
}
