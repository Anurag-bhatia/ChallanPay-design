import { AlertCircle, RotateCw, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  icon?: LucideIcon
  title?: string
  description?: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export function ErrorState({
  icon: Icon = AlertCircle,
  title = "Something went wrong",
  description = "We couldn't load this right now. Check your connection and try again.",
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center text-center px-6 py-12',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-red-500" strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-bold text-base text-text-primary mb-1.5">{title}</h3>
      <p className="text-sm text-text-secondary max-w-sm mb-5">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 min-h-11 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm"
        >
          <RotateCw className="w-4 h-4" />
          {retryLabel}
        </button>
      )}
    </div>
  )
}
