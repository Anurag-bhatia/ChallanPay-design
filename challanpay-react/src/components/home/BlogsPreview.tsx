import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Link } from 'react-router'
import { useTranslation } from '@/hooks/useTranslation'

interface BlogPost {
  image: string
  date: string
  title: string
  excerpt: string
}

const blogs: BlogPost[] = [
  {
    image: '/images/blog-heading.webp',
    date: 'January 10, 2026',
    title: 'New Traffic Rules for 2026: What You Need to Know',
    excerpt:
      'Understanding the latest traffic regulations and how they affect your daily commute. Stay compliant and avoid unnecessary challans.',
  },
  {
    image: '/images/Blogs-img.png',
    date: 'January 5, 2026',
    title: '5 Ways to Avoid Common Traffic Challans',
    excerpt:
      'Learn practical tips to stay safe on the road and avoid the most common traffic violations in India.',
  },
  {
    image: '/images/Blogs-img-1.png',
    date: 'December 28, 2025',
    title: 'GRAP Stage 4: Complete Guide for Vehicle Owners',
    excerpt:
      'Everything you need to know about GRAP restrictions and how they affect your vehicle registration.',
  },
]

export function BlogsPreview() {
  const { t } = useTranslation()

  return (
    <section id="blogs" className="py-16 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {t.blogsPreview.title}
            </h2>
            <p className="font-body text-text-secondary mt-3 text-lg">
              {t.blogsPreview.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Blog Cards */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible sm:snap-none sm:pb-0 scrollbar-hide">
          {blogs.map((blog, index) => (
            <ScrollReveal key={index} delay={index * 0.1} className="min-w-[85%] snap-center sm:min-w-0">
              <article className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
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
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* View More */}
        <ScrollReveal>
          <div className="text-center mt-10">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 font-display font-semibold text-primary hover:text-primary-dark transition-colors text-base group"
            >
              {t.blogsPreview.viewMore}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
