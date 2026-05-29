'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

      addItem: (productId) => {
        set((state) => ({
          productIds: [...new Set([...state.productIds, productId])],
        }))
      },

      removeItem: (productId) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        }))
      },

      toggleItem: (productId) => {
        const { isWishlisted, addItem, removeItem } = get()
        if (isWishlisted(productId)) {
          removeItem(productId)
        } else {
          addItem(productId)
        }
      },

      isWishlisted: (productId) => {
        return get().productIds.includes(productId)
      },

      getCount: () => get().productIds.length,
    }),
    {
      name: 'luxe-wishlist',
    }
  )
)
