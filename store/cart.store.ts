'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, Product, ProductVariant } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  _hasHydrated: boolean
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setHasHydrated: (state: boolean) => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product_id === product.id && item.variant_id === (variant?.id ?? null)
          )
          if (existingIndex >= 0) {
            const updated = [...state.items]
            updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + quantity }
            return { items: updated, isOpen: true }
          }
          const newItem: CartItem = {
            id: Math.random().toString(36).slice(2),
            user_id: '',
            product_id: product.id,
            variant_id: variant?.id ?? null,
            quantity,
            added_at: new Date().toISOString(),
            product,
            variant,
          }
          return { items: [...state.items, newItem], isOpen: true }
        })
      },

      removeItem: (itemId) => set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) { get().removeItem(itemId); return }
        set((state) => ({ items: state.items.map((item) => item.id === itemId ? { ...item, quantity } : item) }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotal: () => get().items.reduce((total, item) => {
        const price = item.variant?.price ?? item.product?.base_price ?? 0
        return total + price * item.quantity
      }, 0),

      getItemCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'luxe-cart',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage
        return { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      }),
      onRehydrateStorage: () => (state) => { state?.setHasHydrated(true) },
      partialize: (state) => ({ items: state.items }),
    }
  )
)
