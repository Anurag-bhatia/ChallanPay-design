import { Navigate } from 'react-router'
import { useChallanStore } from '@/stores/challanStore'

export function RequireSelection({ children }: { children: React.ReactNode }) {
  const selectedCount = useChallanStore((s) => s.selectedChallanIds.length)
  if (selectedCount === 0) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

export function RequireTransaction({ children }: { children: React.ReactNode }) {
  const lastTransactionId = useChallanStore((s) => s.lastTransactionId)
  if (!lastTransactionId) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
