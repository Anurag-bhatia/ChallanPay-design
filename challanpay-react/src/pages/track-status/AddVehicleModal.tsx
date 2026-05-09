import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useModalA11y } from '@/hooks/useModalA11y'
import { useTranslation } from '@/hooks/useTranslation'

export function AddVehicleModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [error, setError] = useState('')

  useModalA11y(true, onClose)

  const handleSubmit = () => {
    if (!vehicleNumber.trim()) {
      setError('Please enter a vehicle number')
      return
    }
    if (vehicleNumber.trim().length < 4) {
      setError('Please enter a valid vehicle number')
      return
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="relative bg-white rounded-2xl border border-border p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-text-primary">{t.trackStatus.addVehicle}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="mb-5">
          <label htmlFor="ts-vehicle" className="block text-xs font-medium text-text-secondary mb-2">
            {t.trackStatus.vehicleNumber}
          </label>
          <input
            id="ts-vehicle"
            type="text"
            value={vehicleNumber}
            onChange={(e) => { setVehicleNumber(e.target.value.toUpperCase()); setError('') }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
            placeholder={t.trackStatus.vehiclePlaceholder}
            autoFocus
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'ts-vehicle-error' : undefined}
            className="w-full px-4 py-3.5 rounded-xl border border-border bg-gray-50 text-sm font-body text-text-primary placeholder:text-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
          {error && <p id="ts-vehicle-error" role="alert" className="text-xs text-red-500 mt-1.5">{error}</p>}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-text-secondary hover:bg-gray-50 transition-colors"
          >
            {t.trackStatus.cancel}
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            {t.trackStatus.addVehicle}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
