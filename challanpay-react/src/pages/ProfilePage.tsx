import { useNavigate } from 'react-router'
import { User, Phone, Car, LogOut } from 'lucide-react'
import { PageTransition } from '@/components/shared/PageTransition'
import { useUserStore } from '@/stores/userStore'

export function ProfilePage() {
  const navigate = useNavigate()
  const { userName, userMobile, vehicleNumber, logout } = useUserStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-xl font-bold text-text-primary">
            {userName || 'Guest User'}
          </h1>
          {userMobile && (
            <p className="text-sm text-text-secondary mt-1">+91 {userMobile}</p>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-light">Full Name</p>
                <p className="text-sm font-medium text-text-primary">{userName || '—'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-light">Mobile Number</p>
                <p className="text-sm font-medium text-text-primary">{userMobile ? `+91 ${userMobile}` : '—'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-5 py-4">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Car className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-light">Vehicle Number</p>
                <p className="text-sm font-medium text-text-primary">{vehicleNumber || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </PageTransition>
  )
}
