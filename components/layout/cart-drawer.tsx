'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart.store'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const total = getTotal()
  const count = getItemCount()

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
            onClick={toggleCart}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-luxury-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-luxury-100">
              <div>
                <h2 className="text-sm font-medium tracking-widest uppercase">Your Bag</h2>
                {count > 0 && (
                  <p className="text-xs text-muted-foreground mt-0.5">{count} item{count !== 1 ? 's' : ''}</p>
                )}
              </div>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-luxury-50 rounded-sm transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag className="h-12 w-12 text-luxury-300 mb-4" />
                  <h3 className="text-lg font-light" style={{ fontFamily: 'var(--font-display)' }}>
                    Your bag is empty
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 mb-8">
                    Discover our exclusive collection
                  </p>
                  <button
                    onClick={toggleCart}
                    className="btn-luxury text-xs"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => {
                    const price = item.variant?.price ?? item.product?.base_price ?? 0
                    const image = item.product?.images?.[0]?.url ?? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-luxury-50 rounded-sm">
                          <Image
                            src={image}
                            alt={item.product?.name ?? ''}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/shop/${item.product?.slug}`}
                              onClick={toggleCart}
                              className="text-sm font-medium leading-tight hover:underline truncate block"
                            >
                              {item.product?.name}
                            </Link>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex-shrink-0 p-1 hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {item.variant && (
                            <p className="text-xs text-muted-foreground mt-0.5">{item.variant.name}</p>
                          )}

                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity */}
                            <div className="flex items-center border border-luxury-200">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 hover:bg-luxury-50 transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-xs font-medium tabular-nums min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 hover:bg-luxury-50 transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="text-sm font-medium">
                              {formatPrice(price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-luxury-100 px-6 py-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Actions */}
                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={toggleCart}
                    className="btn-luxury w-full text-center"
                  >
                    Checkout · {formatPrice(total)}
                  </Link>
                  <Link
                    href="/cart"
                    onClick={toggleCart}
                    className="btn-luxury-outline w-full text-center"
                  >
                    View Bag
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Secure Checkout</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Free Returns</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">SSL Encrypted</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
