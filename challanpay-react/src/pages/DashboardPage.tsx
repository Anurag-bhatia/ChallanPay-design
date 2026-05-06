import { useState } from 'react'
import { Link } from 'react-router'
import { Car, Plus, AlertCircle, ArrowRight, TrendingUp } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'
import { PageTransition } from '@/components/shared/PageTransition'
import { useTranslation } from '@/hooks/useTranslation'

interface Vehicle {
  id: string
  number: string
  model: string
  pendingChallans: number
  totalFine: number
}

const MOCK_VEHICLES: Vehicle[] = [
  { id: '1', number: 'DL 01 AB 1234', model: 'Hyundai Creta', pendingChallans: 6, totalFine: 22000 },
  { id: '2', number: 'HR 26 CD 5678', model: 'Maruti Swift', pendingChallans: 2, totalFine: 3500 },
]

export function DashboardPage() {
  const { t } = useTranslation()
  const { userName } = useUserStore()
  const [vehicles] = useState<Vehicle[]>(MOCK_VEHICLES)

  const totalPending = vehicles.reduce((sum, v) => sum + v.pendingChallans, 0)
  const totalFine = vehicles.reduce((sum, v) => sum + v.totalFine, 0)

  return (
    <PageTransition>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            {t.dashboard.greeting} {userName || 'User'} 👋
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            {t.dashboard.subtitle}
          </p>
        </div>

        {/* Stats Ticker */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 animate-slide-down">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900">
              <strong>{totalPending} {t.dashboard.pendingChallans}</strong> {t.dashboard.totalFineOf}{' '}
              <strong>₹{totalFine.toLocaleString('en-IN')}</strong>
            </p>
            <p className="text-xs text-blue-700 mt-0.5">{t.dashboard.payEarly}</p>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-text-primary">{t.dashboard.yourVehicles}</h2>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors">
              <Plus className="w-4 h-4" />
              {t.dashboard.addVehicle}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                to={`/status?vehicle=${vehicle.number.replace(/\s/g, '')}`}
                className="group bg-white rounded-2xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Car className="w-6 h-6 text-text-secondary" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-text-primary">{vehicle.number}</p>
                      <p className="text-sm text-text-light">{vehicle.model}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-light group-hover:text-primary transition-colors" />
                </div>

                {vehicle.pendingChallans > 0 && (
                  <div className="mt-4 flex items-center gap-2 bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <p className="text-xs text-destructive font-medium">
                      {vehicle.pendingChallans} {t.dashboard.pending} · ₹{vehicle.totalFine.toLocaleString('en-IN')}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
