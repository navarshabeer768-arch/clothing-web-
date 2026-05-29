'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface WishlistStore {
  productIds: string[]
  addItem: (productId: string) => void
  removeItem: (productId: string) => void
  toggleItem: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  getCount: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      addItem: (productId) => set((state) => ({ productIds: [...new Set([...state.productIds, productId])] })),
      removeItem: (productId) => set((state) => ({ productIds: state.productIds.filter((id) => id !== productId) })),
      toggleItem: (productId) => {
        get().isWishlisted(productId) ? get().removeItem(productId) : get().addItem(productId)
      },
      isWishlisted: (productId) => get().productIds.includes(productId),
      getCount: () => get().productIds.length,
    }),
    {
      name: 'luxe-wishlist',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage
        return { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      }),
    }
  )
)
