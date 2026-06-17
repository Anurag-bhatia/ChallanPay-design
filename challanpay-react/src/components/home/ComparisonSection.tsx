import { Check, X, ShieldCheck, Lock, Headphones, Clock } from 'lucide-react'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/hooks/useTranslation'

interface ComparisonRow {
  feature: string
  challanpay: string | { icon: 'check' | 'cross'; text?: string }
  traditional: string | { icon: 'check' | 'cross'; text?: string }
  others: string | { icon: 'check' | 'cross'; text?: string }
}

function CellContent({
  value,
  isHighlight,
}: {
  value: string | { icon: 'check' | 'cross'; text?: string }
  isHighlight?: boolean
}) {
  if (typeof value === 'string') {
    return (
      <span className={cn('font-body text-base', isHighlight ? 'font-normal text-text-primary' : 'text-text-secondary')}>
        {value}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      {value.icon === 'check' ? (
        <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
      ) : (
        <X className="w-5 h-5 text-red-500" strokeWidth={3} />
      )}
      {value.text && (
        <span className={cn('font-body text-base', isHighlight ? 'font-normal text-text-primary' : 'text-text-secondary')}>
          {value.text}
        </span>
      )}
    </span>
  )
}

export function ComparisonSection() {
  const { t } = useTranslation()

  const comparisonData: ComparisonRow[] = [
    {
      feature: t.comparison.onlineChallans,
      challanpay: { icon: 'check', text: 'Yes' },
      traditional: { icon: 'cross', text: 'No' },
      others: { icon: 'check', text: 'Yes' },
    },
    {
      feature: t.comparison.courtChallans,
      challanpay: { icon: 'check', text: 'Yes' },
      traditional: { icon: 'cross', text: 'No' },
      others: t.comparison.limited,
    },
    {
      feature: t.comparison.courtVisitRequired,
      challanpay: { icon: 'cross', text: 'No' },
      traditional: { icon: 'check', text: 'Yes' },
      others: { icon: 'check', text: 'Yes' },
    },
    {
      feature: t.comparison.legalSupport,
      challanpay: { icon: 'check', text: t.comparison.fullSupport },
      traditional: { icon: 'cross', text: 'No' },
      others: { icon: 'cross', text: 'No' },
    },
    {
      feature: t.comparison.whatsAppUpdates,
      challanpay: { icon: 'check', text: t.comparison.realTime },
      traditional: { icon: 'cross', text: 'No' },
      others: t.comparison.limited,
    },
    {
      feature: t.comparison.multipleChallanPayment,
      challanpay: { icon: 'check', text: 'Yes' },
      traditional: t.comparison.complexProcess,
      others: { icon: 'check', text: 'Yes' },
    },
    {
      feature: t.comparison.customerSupport,
      challanpay: t.comparison.available247,
      traditional: { icon: 'cross', text: 'No' },
      others: t.comparison.officeHoursOnly,
    },
    {
      feature: t.comparison.successRate,
      challanpay: '98%',
      traditional: '40-50%',
      others: '60-70%',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-bg-page">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              {t.comparison.title}
            </h2>
            <p className="font-body text-text-secondary mt-3 text-lg">
              {t.comparison.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Comparison Table */}
        <ScrollReveal direction="scale">
          <div
            className="overflow-x-auto rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            style={{
              background:
                'linear-gradient(135deg, #0891B2 0%, #004E89 100%) top center / 100% 84px no-repeat, white',
            }}
          >
            <table className="w-full min-w-[600px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th className="text-left font-display font-bold text-white p-5 md:p-6 text-base w-[34%]">
                    {t.comparison.feature}
                  </th>
                  <th
                    className="relative text-left font-display font-bold text-white pl-5 pr-14 py-5 md:pl-6 md:pr-16 md:py-6 text-base rounded-t-2xl border-x-2 border-t-2 border-primary shadow-[-10px_0_28px_-10px_rgba(8,145,178,0.35),10px_0_28px_-10px_rgba(8,145,178,0.35)]"
                    style={{ background: 'linear-gradient(180deg, #0EA5E9 0%, #0E7490 100%)' }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 36 36"
                      className="absolute top-1 right-2 md:top-2 md:right-3 w-10 h-10 md:w-14 md:h-14 drop-shadow-md"
                      aria-hidden="true"
                    >
                      <g>
                        <path fill="#f45170" d="M23.9 23.3V33c0 .8-.9 1.2-1.5.7L19 30.9s-.1 0-.1-.1c-.3-.2-.6-.3-.9-.3-.4 0-.7.1-1 .4l-3.4 2.9c-.6.5-1.5.1-1.5-.7v-9.7h11.8z" />
                        <path fill="#e93565" d="M23.9 23.3V33c0 .8-.9 1.2-1.5.7L19 30.9s-.1 0-.1-.1c-.3-.2-.6-.3-.9-.3v-7.2z" />
                        <path fill="#cc104a" d="M23.9 25.6v1.5c-.9.2-2-.1-2.8.1-1 .3-2 1.4-3.1 1.4s-2.1-1.1-3.1-1.4c-.9-.2-2 .1-2.8-.1v-1.5z" />
                        <path fill="#f9be48" d="M29.5 18c-.3 1.1.2 2.4-.3 3.4-.6 1-2 1.2-2.8 2s-1 2.2-2 2.8c-.9.5-2.3 0-3.4.3-1 .3-2 1.4-3.1 1.4s-2.1-1.1-3.1-1.4c-1.1-.3-2.4.2-3.4-.3-.9-.5-1.2-2-2-2.8s-2.2-1-2.8-2c-.5-.9 0-2.3-.3-3.4-.3-1-1.4-2-1.4-3.1s1.1-2.1 1.4-3.1c.3-1.1-.2-2.4.3-3.4.5-.9 2-1.2 2.8-2s1-2.2 2-2.8c.9-.5 2.3 0 3.4-.3 1-.3 2-1.4 3.1-1.4S20 3 21 3.3c1.1.3 2.4-.2 3.4.3.9.5 1.2 2 2 2.8s2.2 1 2.8 2c.5.9 0 2.3.3 3.4.3 1 1.4 2 1.4 3.1S29.8 17 29.5 18z" />
                        <path fill="#fff" d="M27.7 14.9c0 5.3-4.3 9.7-9.7 9.7-5.3 0-9.7-4.3-9.7-9.7 0-5.3 4.3-9.7 9.7-9.7 5.3 0 9.7 4.4 9.7 9.7z" opacity=".4" />
                        <path fill="#f3a250" d="M26.7 14.9c0 4.8-3.9 8.7-8.7 8.7s-8.7-3.9-8.7-8.7 3.9-8.7 8.7-8.7 8.7 3.9 8.7 8.7z" />
                        <path fill="#ef7b56" d="M26.7 15.5c-.3-4.6-4.1-8.2-8.7-8.2s-8.4 3.6-8.7 8.2C9 10.3 13.2 6.1 18 6.2c4.9.1 9 4 8.7 9.3z" />
                        <path fill="#ef7b56" d="m20.8 16.2.5 3.1c.1.5-.4.8-.8.6l-2.7-1.4c-.2-.1-.4-.1-.5 0l-2.7 1.4c-.4.2-.9-.1-.8-.6l.5-3.1c0-.2 0-.4-.2-.5l-2.2-2.2c-.3-.3-.2-.9.3-1l3.1-.5c.2 0 .3-.1.4-.3L17 9.1c.2-.4.8-.4 1 0l1.4 2.8c.1.2.2.3.4.3l3.1.5c.5.1.7.6.3 1l-2.2 2c-.1.2-.2.3-.2.5z" />
                        <path fill="#f9cf6b" d="m21.3 16.7.5 3.1c.1.5-.4.8-.8.6L18.3 19c-.2-.1-.4-.1-.5 0L15 20.4c-.4.2-.9-.1-.8-.6l.5-3.1c0-.2 0-.4-.2-.5L12.3 14c-.3-.3-.2-.9.3-1l3.1-.5c.2 0 .3-.1.4-.3l1.4-2.8c.2-.4.8-.4 1 0l1.4 2.8c.1.2.2.3.4.3l3.1.5c.5.1.7.6.3 1l-2.2 2.2c-.2.1-.2.3-.2.5z" />
                        <path fill="#fff" d="M12.9 14.1c-.3-.3-.1-.8.3-.9l2.7-.4c.2 0 .3-.1.4-.3l1.2-2.5c.2-.4.7-.4.9 0l1.2 2.5c.1.2.2.3.4.3l2.7.4c.4.1.6.6.3.9 0 0-1.7 1.9-5.2 1.9-2.6 0-4.9-1.9-4.9-1.9z" opacity=".5" />
                        <path fill="#fff" d="M17.2 12.7c-.5-.2.3-2.3.8-2.1.3.1-.2 2.3-.8 2.1z" opacity=".7" />
                        <path fill="#fff" d="M13.6 8.5c-.3 0-.5.2-.7.4.1.1 1.1.9 1 1s-1.1-.6-1.2-.7c-.1.2-.2.5-.1.7.3 2.5-.1 2.6-.6.1-.1-.3-.2-.5-.4-.7-.1.1-.9 1.1-1 1s.6-1.1.7-1.2c-.2-.1-.5-.1-.7-.1-2.6.2-2.7-.1-.1-.6.3-.1.5-.2.7-.4l-.1-.1c-1.4-1.1-1.2-1.2.2-.3h.1c.1-.2.2-.5.1-.7-.3-2.6.1-2.6.6-.1 0 .3.2.5.4.7l.1-.1c1.1-1.4 1.2-1.2.3.2v.1c.1.2.4.3.6.3 2.6-.3 2.6 0 .1.5z" />
                        <path fill="#fff" d="M13.6 30.1c0 1.4-.1 1.5-.3 1.5-.1 0-.3-.1-.3-1.5s.1-1.8.3-1.8.3.4.3 1.8z" opacity=".5" />
                      </g>
                    </svg>
                    {t.comparison.challanpay}
                  </th>
                  <th className="text-left font-display font-bold text-white py-5 md:py-6 pr-5 md:pr-6 pl-12 md:pl-16 text-base">
                    {t.comparison.traditional}
                  </th>
                  <th className="text-left font-display font-bold text-white p-5 md:p-6 text-base">
                    {t.comparison.otherPlatforms}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => {
                  const isLast = index === comparisonData.length - 1
                  return (
                    <tr
                      key={index}
                      className={cn(
                        'transition-colors',
                        !isLast && 'border-b border-border'
                      )}
                    >
                      <td className="px-4 py-3.5 md:px-5 md:py-4 bg-white font-body text-base font-semibold text-text-primary">
                        {row.feature}
                      </td>
                      <td
                        className={cn(
                          'px-4 py-3.5 md:px-5 md:py-4 bg-sky-50 border-x-2 border-primary shadow-[-10px_0_28px_-10px_rgba(8,145,178,0.25),10px_0_28px_-10px_rgba(8,145,178,0.25)]',
                          isLast && 'border-b-2 rounded-b-2xl'
                        )}
                      >
                        <CellContent value={row.challanpay} isHighlight />
                      </td>
                      <td className="py-3.5 md:py-4 pr-4 md:pr-5 pl-12 md:pl-16 bg-white">
                        <CellContent value={row.traditional} />
                      </td>
                      <td className="px-4 py-3.5 md:px-5 md:py-4 bg-white">
                        <CellContent value={row.others} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Trust pointers */}
        <ScrollReveal delay={0.1}>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: ShieldCheck, label: 'Trusted by 20L+ Users' },
              { icon: Lock, label: 'Secure & Encrypted Payments' },
              { icon: Headphones, label: 'Dedicated Legal Experts' },
              { icon: Clock, label: 'Faster Resolution, Less Hassle' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-border/60"
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={2.25} />
                </span>
                <span className="font-body text-sm md:text-base font-medium text-text-primary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
