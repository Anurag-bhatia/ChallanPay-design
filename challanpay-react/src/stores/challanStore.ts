import { create } from 'zustand'

interface Challan {
  id: string
  amount: number
}

interface ChallanState {
  selectedChallanIds: string[]
  totalAmount: number
  activeTab: 'pending' | 'paid'
  toggleChallan: (id: string, amount: number) => void
  selectAll: (challans: Challan[]) => void
  clearSelection: () => void
  setActiveTab: (tab: 'pending' | 'paid') => void
}

export const useChallanStore = create<ChallanState>((set) => ({
  selectedChallanIds: [],
  totalAmount: 0,
  activeTab: 'pending',
  toggleChallan: (id, amount) =>
    set((state) => {
      const isSelected = state.selectedChallanIds.includes(id)
      if (isSelected) {
        return {
          selectedChallanIds: state.selectedChallanIds.filter((cid) => cid !== id),
          totalAmount: state.totalAmount - amount,
        }
      }
      return {
        selectedChallanIds: [...state.selectedChallanIds, id],
        totalAmount: state.totalAmount + amount,
      }
    }),
  selectAll: (challans) =>
    set({
      selectedChallanIds: challans.map((c) => c.id),
      totalAmount: challans.reduce((sum, c) => sum + c.amount, 0),
    }),
  clearSelection: () => set({ selectedChallanIds: [], totalAmount: 0 }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
