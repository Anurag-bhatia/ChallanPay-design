import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageTransition } from '@/components/shared/PageTransition'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { useTranslation } from '@/hooks/useTranslation'

interface FAQItem {
  question: string
  answer: string
}

export function FAQPage() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const FAQS: FAQItem[] = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
    { question: t.faq.q6, answer: t.faq.a6 },
    { question: t.faq.q7, answer: t.faq.a7 },
    { question: t.faq.q8, answer: t.faq.a8 },
  ]

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
              {t.faq.badge}
            </span>
            <h1 className="font-display text-3xl font-bold text-text-primary">
              {t.faq.title}
            </h1>
            <p className="text-text-secondary mt-2">
              {t.faq.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-display font-semibold text-sm text-text-primary pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className={cn(
                    'w-5 h-5 text-text-light flex-shrink-0 transition-transform',
                    openIndex === i && 'rotate-180'
                  )} />
                </button>
                <div className={cn(
                  'overflow-hidden transition-all',
                  openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                )}>
                  <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
