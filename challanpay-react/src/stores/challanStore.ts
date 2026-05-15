import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ChallanItem {
  id: string
  challanNumber: string
  amount: number
  violation: string
  date: string
  location: string
  type: 'online' | 'court'
  pendingSince?: string
}

export const ONLINE_CONVENIENCE_FEE = 200
export const COURT_CONVENIENCE_FEE = 2000
export const PLEDGE_REWARD = 1000

interface ChallanState {
  challans: ChallanItem[]
  selectedChallanIds: string[]
  lastTransactionId: string | null
  lastTransactionAmount: number | null
  lastTransactionChallanCount: number | null
  pledgeConfettiShown: boolean
  activeTab: 'pending' | 'paid'
  setChallans: (challans: ChallanItem[]) => void
  toggleChallan: (id: string) => void
  selectAll: (ids: string[]) => void
  clearSelection: () => void
  setActiveTab: (tab: 'pending' | 'paid') => void
  recordTransaction: (id: string, amount: number, challanCount: number) => void
  markPledgeConfettiShown: () => void
}

export const useChallanStore = create<ChallanState>()(
  persist(
    (set) => ({
      challans: [],
      selectedChallanIds: [],
      lastTransactionId: null,
      lastTransactionAmount: null,
      lastTransactionChallanCount: null,
      pledgeConfettiShown: false,
      activeTab: 'pending',
      setChallans: (challans) => set({ challans }),
      toggleChallan: (id) =>
        set((state) => ({
          selectedChallanIds: state.selectedChallanIds.includes(id)
            ? state.selectedChallanIds.filter((cid) => cid !== id)
            : [...state.selectedChallanIds, id],
        })),
      selectAll: (ids) => set({ selectedChallanIds: ids }),
      clearSelection: () => set({ selectedChallanIds: [] }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      recordTransaction: (id, amount, challanCount) => set({ lastTransactionId: id, lastTransactionAmount: amount, lastTransactionChallanCount: challanCount }),
      markPledgeConfettiShown: () => set({ pledgeConfettiShown: true }),
    }),
    {
      name: 'challanpay-challans',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        challans: state.challans,
        selectedChallanIds: state.selectedChallanIds,
        lastTransactionId: state.lastTransactionId,
        lastTransactionAmount: state.lastTransactionAmount,
        lastTransactionChallanCount: state.lastTransactionChallanCount,
        pledgeConfettiShown: state.pledgeConfettiShown,
      }),
    }
  )
)
