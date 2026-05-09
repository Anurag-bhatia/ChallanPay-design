import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, Copy, Check, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useTranslation } from '@/hooks/useTranslation'
import { STATUS_BADGE } from './mocks'
import type { TrackingChallan } from './types'

export function ChallanDetailView({ challan, onBack }: { challan: TrackingChallan; onBack: () => void }) {
  const { t } = useTranslation()
  const { copied, copy } = useCopyToClipboard()
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(new Set())

  const toggleEntry = (index: number) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-11 h-11 rounded-lg border border-border flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-secondary" />
        </button>
        <h2 className="font-display text-lg font-bold text-text-primary">{t.trackStatus.challanDetail}</h2>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Left — Resolution Timeline */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="font-display font-semibold text-sm text-text-primary mb-5">{t.trackStatus.resolutionTimeline}</h3>

          <div className="relative">
            {challan.timeline.length > 1 && (
              <div className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-primary/20" />
            )}

            <div className="space-y-6">
              {challan.timeline.map((entry, index) => (
                <div key={index} className="relative flex gap-4">
                  <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-[3px] border-primary/20 flex-shrink-0 mt-0.5" />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-text-light mb-0.5">{entry.date}</p>
                    <p className="text-sm font-medium text-text-primary">{entry.title}</p>

                    {entry.description && (
                      <>
                        <button
                          onClick={() => toggleEntry(index)}
                          className="flex items-center gap-1 mt-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {t.trackStatus.viewDetails}
                          <ChevronDown className={cn(
                            'w-3 h-3 transition-transform',
                            expandedEntries.has(index) && 'rotate-180'
                          )} />
                        </button>

                        <AnimatePresence>
                          {expandedEntries.has(index) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs text-text-secondary mt-2 leading-relaxed bg-gray-50 rounded-lg p-3">
                                {entry.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Challan Summary Card */}
        <div className="bg-white rounded-xl border border-border overflow-hidden lg:self-start">
          <div className="bg-primary px-5 py-4">
            <p className="text-xs text-white/70 mb-1">{t.trackStatus.challan}</p>
            <div className="flex items-center gap-2">
              <p className="font-display font-bold text-white text-sm truncate">
                {challan.challanNumber}
              </p>
              <button
                onClick={() => copy(challan.challanNumber)}
                aria-label="Copy challan number"
                className="flex-shrink-0 text-white/80 hover:text-white transition-colors flex items-center justify-center p-2.5 -m-2.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <p className="font-display text-xl font-bold text-text-primary">
              ₹{challan.amount.toFixed(2)}
            </p>
            {(() => {
              const StatusIcon = STATUS_BADGE[challan.status].icon
              return (
                <span className={cn(
                  'inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full',
                  STATUS_BADGE[challan.status].className
                )}>
                  <StatusIcon className="w-3 h-3" aria-hidden />
                  {challan.status === 'not-settled' ? t.trackStatus.notSettled : challan.status === 'in-progress' ? t.trackStatus.inProgress : challan.status === 'resolved' ? t.trackStatus.resolved : t.trackStatus.refund}
                </span>
              )
            })()}
          </div>

          <div className="px-5 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-light">{t.trackStatus.incidentId}</span>
              <span className="text-sm font-medium text-text-primary">{challan.incidentId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-light">{t.trackStatus.vehicleLabel}</span>
              <span className="text-sm font-medium text-text-primary">{challan.vehicleNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-light">{t.trackStatus.resolutionDate}</span>
              <span className="text-sm font-medium text-text-primary">{challan.resolutionDate}</span>
            </div>
          </div>

          <div className="px-5 pb-5">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-medium text-text-primary hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              {t.trackStatus.downloadReceipt}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
