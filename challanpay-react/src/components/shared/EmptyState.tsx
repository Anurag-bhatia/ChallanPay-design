import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center text-center px-6 py-12 ' +
        (className ?? '')
      }
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-text-light" strokeWidth={1.75} />
      </div>
      <h3 className="font-display font-bold text-base text-text-primary mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-text-secondary max-w-sm mb-5">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 min-h-11 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
