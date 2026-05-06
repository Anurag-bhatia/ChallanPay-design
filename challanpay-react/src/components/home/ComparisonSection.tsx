import { Check, X } from 'lucide-react'
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
      <span className={cn('font-body text-sm', isHighlight ? 'font-semibold text-text-primary' : 'text-text-secondary')}>
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
        <span className={cn('font-body text-sm', isHighlight ? 'font-semibold text-text-primary' : 'text-text-secondary')}>
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
      feature: t.comparison.processingTime,
      challanpay: t.comparison.instant,
      traditional: t.comparison.daysToWeeks,
      others: t.comparison.oneTo3Days,
    },
    {
      feature: t.comparison.courtVisitRequired,
      challanpay: { icon: 'cross' },
      traditional: { icon: 'check' },
      others: { icon: 'check' },
    },
    {
      feature: t.comparison.legalSupport,
      challanpay: { icon: 'check', text: t.comparison.fullSupport },
      traditional: { icon: 'cross' },
      others: { icon: 'cross' },
    },
    {
      feature: t.comparison.whatsAppUpdates,
      challanpay: { icon: 'check', text: t.comparison.realTime },
      traditional: { icon: 'cross' },
      others: t.comparison.limited,
    },
    {
      feature: t.comparison.multipleChallanPayment,
      challanpay: { icon: 'check' },
      traditional: t.comparison.complexProcess,
      others: { icon: 'check' },
    },
    {
      feature: t.comparison.customerSupport,
      challanpay: t.comparison.available247,
      traditional: t.comparison.officeHoursOnly,
      others: t.comparison.limitedHours,
    },
    {
      feature: t.comparison.successRate,
      challanpay: '98%',
      traditional: '60-70%',
      others: '75-80%',
    },
    {
      feature: t.comparison.costSavings,
      challanpay: t.comparison.upTo5000,
      traditional: t.comparison.highLegalFees,
      others: t.comparison.moderateFees,
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-[#f3f4f6]">
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
          <div className="overflow-x-auto rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <table className="w-full min-w-[600px] bg-white" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ background: 'linear-gradient(135deg, #0891B2 0%, #004E89 100%)' }}>
                  <th className="text-left font-display font-bold text-white p-5 md:p-6 text-base w-[40%]">
                    {t.comparison.feature}
                  </th>
                  <th className="text-left font-display font-bold text-white p-5 md:p-6 text-base">
                    {t.comparison.challanpay}
                  </th>
                  <th className="text-left font-display font-bold text-white p-5 md:p-6 text-base">
                    {t.comparison.traditional}
                  </th>
                  <th className="text-left font-display font-bold text-white p-5 md:p-6 text-base">
                    {t.comparison.otherPlatforms}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'hover:bg-[#f3f4f6] transition-colors',
                      index < comparisonData.length - 1 && 'border-b border-border'
                    )}
                  >
                    <td className="p-4 md:p-5 font-body text-sm font-semibold text-text-primary">
                      {row.feature}
                    </td>
                    <td className="p-4 md:p-5 bg-primary/5">
                      <CellContent value={row.challanpay} isHighlight />
                    </td>
                    <td className="p-4 md:p-5">
                      <CellContent value={row.traditional} />
                    </td>
                    <td className="p-4 md:p-5">
                      <CellContent value={row.others} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
